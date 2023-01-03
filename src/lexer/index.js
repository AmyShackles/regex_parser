const { handlePeriod } = require("./handlePeriod.js");
const { handleEscapes } = require("./handleEscapes.js");
const { handleRange } = require("./handleRange");
const { handleQuantifiers } = require("./handleQuantifiers");

const last = (stack) => stack[stack.length - 1];

const getPatternAndFlags = (regex) => {
    const { flags, source } = new RegExp(regex);

    return { flags, pattern: source };
};

const findInstancesInCharacterArray = (regex, string) => {
    return [...string.matchAll(regex)].map((match) => match.index);
};
const dotRegex = /(?<=[^\\]\[[^\]]*)\.(?=.*\])|(?:\\)\./g;

function tokenize(regex) {
    const { pattern, flags } = getPatternAndFlags(regex);
    const stack = [];
    /* 
        Searches the entire string for instances of a period in a character
        set because a period in a character set does not need to be escaped
        and is treated as a literal period
    */
    const dots = findInstancesInCharacterArray(dotRegex, pattern);
    const characterSetStack = [];
    
    let i = 0;
    while (i < pattern.length) {
        const inCharacterSet = characterSetStack.length > 0;
        const next = pattern[i];
        switch (next) {
            case "\\": {
                if (i + 1 >= pattern.length) {
                    throw new Error(`Bad escape character at index ${i}`);
                }
                i++;
                const currentChar = pattern[i];
                const nextChar = pattern[i + 1];
                const unicodeMode = flags.includes("u");
                const { index, token } = handleEscapes({
                    currentChar,
                    inCharacterSet,
                    index: i,
                    nextChar,
                    pattern,
                    unicodeMode,
                });
                if (Array.isArray(token)) {
                    last(stack).push(...token);
                } else {
                    last(stack).push(token);
                }
                i = index;
                break;
            }
            case "|": {
                if (inCharacterSet) {
                    last(stack).push({
                        quantifier: "exactlyOne",
                        regex: "|",
                        type: "literal",
                        value: "|"
                    });
            
                } else {
                    last(stack).push({
                        quantifier: "exactlyOne",
                        regex: "|",
                        type: "alternation",
                        value: " OR "
                    });
                }
                i++;
                break;
            }
            case "-": {
                const lastElement = last(last(stack));
                const nextElement = pattern[i + 1];
                if (inCharacterSet && lastElement < nextElement) {
                        lastElement.regex += `-${nextElement}`;
                        lastElement.value = `character between ${lastElement} and ${nextElement}`;
                        i+= 2;
                        break;
                    }
                last(stack).push({
                    quantifier: "exactlyOne",
                    regex: "-",
                    type: "literal",
                    value: "-"
                });
                i++;
                break;
            }
            /* 
                Placing the . case after the escape 
                Means we don't have to test the case of
                an escaped period
            */
            case ".": {
                if (inCharacterSet) {
                    last(stack).push({
                        quantifier: "exactlyOne",
                        regex: ".",
                        type: "literal",
                        value: "."
                    });
                    i++;
                    break;
                }
                const period = handlePeriod(flags.includes("s"), i, dots);
                last(stack).push(period);
                i++;
                continue;
            }
            case "(": {
                if (inCharacterSet) {
                    last(stack).push({
                        quantifier: "exactlyOne",
                        regex: "(",
                        type: "literal",
                        value: "("
                    });
                    i++;
                    break;
                }
                const nextCharacter = pattern[i + 1];
                if (nextCharacter === "?") {
                    switch (pattern[i + 2]) {
                        case "=": {
                            stack.push([
                                {
                                    quantifier: "exactlyOne",
                                    regex: "(?=",
                                    type: "positiveLookahead",
                                },
                            ]);
                            i += 3;
                            break;
                        }
                        case "!": {
                            stack.push([
                                {
                                    quantifier: "exactlyOne",
                                    regex: "(?!",
                                    type: "negativeLookeahead",
                                },
                            ]);
                            i += 3;
                            break;
                        }
                        case ":": {
                            stack.push([
                                {
                                    quantifier: "exactlyOne",
                                    regex: "(?:",
                                    type: "nonCapturingGroup",
                                },
                            ]);
                            i += 3;
                            break;
                        }
                        case "<": {
                            const nextVal = pattern[i + 3];
                            if (nextVal === "=") {
                                stack.push([
                                    {
                                        quantifier: "exactlyOne",
                                        regex: "(?<=",
                                        type: "positiveLookbehind",
                                    },
                                ]);
                                i += 4;
                                break;
                            } else if (nextVal === "!") {
                                stack.push([
                                    {
                                        quantifier: "exactlyOne",
                                        regex: "(?<!",
                                        type: "negativeLookbehind",
                                    },
                                ]);
                                i += 4;
                                break;
                            }
                        }
                    }
                    break;
                }
                stack.push([
                    {
                        quantifier: "exactlyOne",
                        regex: "(",
                        type: "capturingGroup",
                    },
                ]);
                i++;
                break;
            }
            case ")": {
                if (inCharacterSet) {
                    last(stack).push({
                        quantifier: "exactlyOne",
                        regex: ")",
                        type: "literal",
                        value: ")"
                    });
                    i++;
                    break;
                }
                if (stack.length < 1) {
                    throw new Error(`No group to close at index ${i}`);
                }
                const states = stack.pop();
                const label = states.shift();
                if (stack.length === 0) {
                    stack.push([
                        {
                            quantifier: label.quantifier,
                            regex: `${label.regex}${states
                                .map((s) => s.regex)
                                .join("")})`,
                            type: label.type,
                            value: states,
                        },
                    ]);
                } else {
                    last(stack).push({
                        quantifier: label.quantifier,
                        regex: `${label.regex}${states
                            .map((s) => s.regex)
                            .join("")})`,
                        type: label.type,
                        value: states,
                    });
                }
                i++;
                break;
            }
            case "{": {
                if (inCharacterSet) {
                    last(stack).push({
                        quantifier: "exactlyOne",
                        regex: "{",
                        type: "literal",
                        value: "{"
                    });
                    i++;
                    break;
                }
                const closingBrace = pattern.indexOf("}", i + 1);
                const betweenBraces = pattern.slice(i + 1, closingBrace);
                const lastElement = last(last(stack));
                const range = handleRange(
                    lastElement,
                    betweenBraces,
                    i + 1
                );
                if (range.token) {
                    last(stack).push(range.token);
                }
                i = range.index;
                break;
            }
            case "[": {
                if (inCharacterSet) {
                    last(stack).push({
                        quantifier: "exactlyOne",
                        regex: "[",
                        type: "literal",
                        value: "["
                    });
                    i++;
                    break;
                }
                characterSetStack.push(i);
                const nextCharacter = pattern[i + 1];
                if (nextCharacter === "^") {
                    stack.push([
                        {
                            quantifier: "exactlyOne",
                            regex: "[^",
                            type: "negativeCharacterSet",
                        },
                    ]);
                    i += 2;
                    break;
                } else {
                    stack.push([
                        {
                            quantifier: "exactlyOne",
                            regex: "[",
                            type: "characterSet",
                        },
                    ]);
                }
                i++;
                break;
            }
            case "]": {
                characterSetStack.pop();
                if (stack.length < 1) {
                    throw new Error(`No set to close at index ${i}`);
                }
                const states = stack.pop();
                const label = states.shift();
                if (stack.length === 0) {
                    stack.push([
                        {
                            quantifier: label.quantifier,
                            regex: `${label.regex}${states
                                .map((s) => s.regex)
                                .join("")}]`,
                            type: label.type,
                            value: states,
                        },
                    ]);
                } else {
                    last(stack).push({
                        quantifier: label.quantifier,
                        regex: `${label.regex}${states
                            .map((s) => s.regex)
                            .join("")}]`,
                        type: label.type,
                        value: states,
                    });
                }
                i++;
                break;
            }
            case "*": {
                if (characterSetStack.length > 0) {
                    last(stack).push({
                        quantifier: "exactlyOne",
                        regex: "*",
                        type: "literal",
                        value: "*",
                    });
                    i++;
                } else {
                    const lastElement = last(last(stack));
                    const nextChar = pattern[i + 1];
                    i = handleQuantifiers("*", lastElement, nextChar, i);
                }
                break;
            }
            case "/": {
                if (characterSetStack.length > 0) {
                    last(stack).push({
                        quantifier: "exactlyOne",
                        regex: "/",
                        type: "literal",
                        value: "/",
                    });
                } else {
                    last(stack).push({
                        quantifier: "exactlyOne",
                        regex: next,
                        type: "literal",
                        value: next,
                    });
                }
                i++;
                break;
            }
            case "?": {
                if (characterSetStack.length > 0) {
                    last(stack).push({
                        quantifier: "exactlyOne",
                        regex: "?",
                        type: "literal",
                        value: "?",
                    });
                    i++;
                } else {
                    const lastElement = last(last(stack));
                    const nextChar = pattern[i + 1];
                    i = handleQuantifiers("?", lastElement, nextChar, i);
                }
                break;
            }
            case "+": {
                if (characterSetStack.length > 0) {
                    last(stack).push({
                        quantifier: "exactlyOne",
                        regex: "+",
                        type: "literal",
                        value: "+",
                    });
                    i++;
                } else {
                    const lastElement = last(last(stack));
                    const nextChar = pattern[i + 1];
                    i = handleQuantifiers("+", lastElement, nextChar, i);
                }
                break;
            }
            default: {
                last(stack).push({
                    quantifier: "exactlyOne",
                    regex: next,
                    type: "literal",
                    value: next,
                });
                i++;
                break;
            }
        }
    }
    if (stack.length !== 1) {
        throw new Error("Unmatched groups in regular expression");
    }
    return stack[0];
}

module.exports = {
    dotRegex,
    findInstancesInCharacterArray,
    getPatternAndFlags,
    tokenize,
};
