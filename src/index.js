const { handlePeriod } = require("./utils/handlePeriod.js");
const { handleKleenePlus } = require("./utils/handleKleenePlus.js");
const { handleKleeneStar } = require("./utils/handleKleeneStar.js");
const { handleOptional } = require("./utils/handleOptional.js");
const { handleEscapes } = require("./utils/handleEscapes.js");

const last = (stack) => stack[stack.length - 1];

const getPatternAndFlags = (regex) => {
    const regexString = regex.toString();
    const [{groups: { flags, pattern } }] = [...regexString.matchAll(/\/(?<pattern>.*?)\/(?<flags>g?i?m?s?u?)/g)];

    return { flags, pattern };
};

const findInstancesInCharacterArray = (regex, string) => {
    return [...string.matchAll(regex)].map((match) => match.index);
};
const dotRegex = /(?<=[^\\]\[[^\]]*)\.(?=.*\])/g;
const backspaceRegex = /(?<=[^\\]?\[[^\]]*\\)(b).*?\]/g;

function parse(regex) {
    const { pattern, flags } = getPatternAndFlags(regex);
    const stack = [[]];

    /*
        Searches the entire string for instances of an escaped b
        that occur after an opening bracked ([) and before a closed
        bracket (]) and matches the b
        Then returns an array of indexes where that b matches
        This is because a \b in a character class [] is a backspace
    */
    const backspaces = findInstancesInCharacterArray(backspaceRegex, pattern);

    /* 
        Searches the entire string for instances of a period in a character
        set because a period in a character set does not need to be escaped
        and is treated as a literal period
    */
    const dots = findInstancesInCharacterArray(dotRegex, pattern);

    let i = 0;
    while (i < pattern.length) {
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
                const { index, token } = handleEscapes({backspaces, currentChar, index: i, nextChar, pattern, unicodeMode});
                if (Array.isArray(token)) {
                    last(stack).push(...token);
                } else {
                    last(stack).push(token);
                }
                i = index;
                break;
            }
            /* 
                Placing the . case after the escape 
                Means we don't have to test the case of
                an escaped period
            */
            case ".": {
                const period = handlePeriod(flags.includes("s"), i, dots);
                last(stack).push(period);
                i++;
                continue;
            }
            case "(": {
                const nextCharacter = pattern[i + 1];
                if (nextCharacter === "?") {
                    switch (pattern[i + 2]) {
                        case "=":
                            stack.push([
                                {
                                    quantifier: "exactlyOne",
                                    regex: "(?=",
                                    type: "positiveLookahead",
                                },
                            ]);
                            i += 3;
                            break;
                        case "!":
                            stack.push([
                                {
                                    quantifier: "exactlyOne",
                                    regex: "(?!",
                                    type: "negativeLookeahead",
                                },
                            ]);
                            i += 3;
                            break;
                        case ":":
                            stack.push([
                                {
                                    quantifier: "exactlyOne",
                                    regex: "(?:",
                                    type: "nonCapturingGroup",
                                },
                            ]);
                            i += 3;
                            break;
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
                if (stack.length <= 1) {
                    throw new Error(`No group to close at index ${i}`);
                }
                const states = stack.pop();
                const label = states.shift();
                last(stack).push({
                    quantifier: label.quantifier,
                    regex: `${label.regex}${states
                        .map((s) => s.regex)
                        .join("")})`,
                    type: label.type,
                    value: states,
                });
                i++;
                break;
            }
            case "[": {
                const nextCharacter = pattern[i + 1];
                if (nextCharacter === "^") {
                    stack.push([
                        {
                            quantifier: "exactlyOne",
                            regex: "[^",
                            type: "negativeCharacterSet",
                        },
                    ]);
                    i+=2;
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
                if (stack.length <= 1) {
                    throw new Error(`No set to close at index ${i}`);
                }
                const states = stack.pop();
                const label = states.shift();
                last(stack).push({
                    quantifier: label.quantifier,
                    regex: `${label.regex}${states
                        .map((s) => s.regex)
                        .join("")}]`,
                    type: label.type,
                    value: states,
                });
                i++;
                break;
            }
            case "*": {
                const lastElement = last(last(stack));
                const nextChar = pattern[i + 1];

                i = handleKleeneStar(lastElement, nextChar, i);
                break;
            }
            case "?": {
                const lastElement = last(last(stack));
                const nextChar = pattern[i + 1];

                i = handleOptional(lastElement, nextChar, i);
                break;
            }
            case "+": {
                const lastElement = last(last(stack));
                const nextChar = pattern[i + 1];

                i = handleKleenePlus(lastElement, nextChar, i);
                break;
            }
            default:
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
    if (stack.length !== 1) {
        throw new Error("Unmatched groups in regular expression");
    }
    return stack[0];
}


module.exports = {
    backspaceRegex,
    dotRegex,
    findInstancesInCharacterArray,
    getPatternAndFlags,
    parse,
};
