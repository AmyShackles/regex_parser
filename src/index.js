const { getControlChar } = require("./utils/getControlChar.js");
const { getUnicode } = require("./utils/getUnicode.js");
const { handlePeriod } = require("./utils/handlePeriod.js");

const last = (stack) => stack[stack.length - 1];

const getPatternAndFlags = (regex) => {
    const regexString = regex.toString();
    const [{groups: { flags, pattern } }] = [...regexString.matchAll(/\/(?<pattern>.*)\/(?<flags>g?i?m?s?u?)/g)];

    return { flags, pattern };
};

const findInstancesInCharacterArray = (regex, string) => {
    return [...string.matchAll(regex)].map((match) => match.index);
};
const dotRegex = /(?<=[^\\]\[[^\]]*)\.(?=.*\])/g;
const backspaceRegex = /(?<=[^\\]?\[[^\]]*\\)(b).*?\]/g;


function parse(regex) {
    const { pattern: re, flags } = getPatternAndFlags(regex);
    const stack = [[]];

    /*
        Searches the entire string for instances of an escaped b
        that occur after an opening bracked ([) and before a closed
        bracket (]) and matches the b
        Then returns an array of indexes where that b matches
        This is because a \b in a character class [] is a backspace
    */
    const backspaces = findInstancesInCharacterArray(backspaceRegex, re);

    /* 
        Searches the entire string for instances of a period in a character
        set because a period in a character set does not need to be escaped
        and is treated as a literal period
    */
    const dots = findInstancesInCharacterArray(dotRegex, re);

    let i = 0;
    while (i < re.length) {
        const next = re[i];

        switch (next) {
            case "\\": {
                if (i + 1 >= re.length) {
                    throw new Error(`Bad escape character at index ${i}`);
                }
                const escapedChar = re[i + 1];
                switch (escapedChar) {
                    case "b":
                        {
                            if (backspaces.includes(i + 1)) {
                                last(stack).push({
                                    quantifier: "exactlyOne",
                                    regex: "[\\b]",
                                    type: "controlCharacter",
                                    value: "backspace",
                                });
                            } else {
                                last(stack).push({
                                    quantifier: "exactlyOne",
                                    regex: "\\b",
                                    type: "assertion",
                                    value: "wordBoundary",
                                });
                            }
                        }
                        i += 2;
                        break;
                    case "B":
                        {
                            last(stack).push({
                                quantifier: "exactlyOne",
                                regex: "\\B",
                                type: "assertion",
                                value: "nonWordBoundary",
                            });
                        }
                        i += 2;
                        break;
                    case "d":
                        last(stack).push({
                            quantifier: "exactlyOne",
                            regex: "\\d",
                            type: "characterClass",
                            value: "digit",
                        });
                        i += 2;
                        break;
                        case "D":
                            last(stack).push({
                                quantifier: "exactlyOne",
                                regex: "\\D",
                                type: "characterClass",
                                value: "nonDigit",
                        });
                        i += 2;
                        break;
                    case "w":
                        last(stack).push({
                            quantifier: "exactlyOne",
                            regex: "\\w",
                            type: "characterClass",
                            value: "word",
                        });
                        i += 2;
                        break;
                    case "W":
                        last(stack).push({
                            quantifier: "exactlyOne",
                            regex: "\\W",
                            type: "characterClass",
                            value: "nonWord",
                        });
                        i += 2;
                        break;
                    case "s":
                        last(stack).push({
                            quantifier: "exactlyOne",
                            regex: "\\s",
                            type: "characterClass",
                            value: "whiteSpace",
                        });
                        i += 2;
                        break;
                    case "S":
                        last(stack).push({
                            quantifier: "exacltyOne",
                            regex: "\\S",
                            type: "characterClass",
                            value: "nonWhiteSpace",
                        });
                        i += 2;
                        break;
                    case "t":
                        last(stack).push({
                            quantifier: "exacltyOne",
                            regex: "\\t",
                            type: "characterClass",
                            value: "horizontalTab",
                        });
                        i += 2;
                        break;
                    case "r":
                        last(stack).push({
                            quantifier: "exacltyOne",
                            regex: "\\r",
                            type: "characterClass",
                            value: "carriageReturn",
                        });
                        i += 2;
                        break;
                    case "n":
                        last(stack).push({
                            quantifier: "exacltyOne",
                            regex: "\\n",
                            type: "characterClass",
                            value: "linefeed",
                        });
                        i += 2;
                        break;
                    case "v":
                        last(stack).push({
                            quantifier: "exacltyOne",
                            regex: "\\v",
                            type: "characterClass",
                            value: "verticalTab",
                        });
                        i += 2;
                        break;
                    case "f":
                        last(stack).push({
                            quantifier: "exacltyOne",
                            regex: "\\f",
                            type: "characterClass",
                            value: "formFeed",
                        });
                        i += 2;
                        break;
                    case "0":
                        last(stack).push({
                            quantifier: "exacltyOne",
                            regex: "\\0",
                            type: "characterClass",
                            value: "nulCharacter",
                        });
                        i += 2;
                        break;
                    case "c": {
                        const nextChar = re[i + 2];
                        const controlChar = getControlChar(nextChar);
                        if (Array.isArray(controlChar)) {
                            last(stack).push(...controlChar);
                        } else {
                            last(stack).push(controlChar);
                        }
                        i += 3;
                        break;
                    }
                    case "u": {
                        const currentIndex = i + 2;
                        const { nextIndex, token } = getUnicode(re, currentIndex, flags.includes("u"));
                        last(stack).push(token);
                        i = nextIndex;
                        break;
                    }
                    // If there isn't a special rule about the escaped
                    // character, treat it like a literal
                    default:
                        last(stack).push({
                            quantifier: "exactlyOne",
                            regex: `\\${re[i + 1]}`,
                            type: "element",
                            value: re[i + 1],
                        });
                        i += 2;
                }
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
                const nextCharacter = re[i + 1];
                if (nextCharacter === "?") {
                    switch (re[i + 2]) {
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
                            const nextVal = re[i + 3];
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
                const nextCharacter = re[i + 1];
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
            // TODO: Add non-greedy logic
            case "*": {
                const lastElement = last(last(stack));
                if (!lastElement || lastElement.quantifier !== "exactlyOne") {
                    throw new Error(
                        "Quantifier must follow an unquantified element"
                    );
                }
                lastElement.quantifier = "zeroOrMore";
                lastElement.regex += "*";
                i++;
                break;
            }
            case "?": {
                const lastElement = last(last(stack));
                if (!lastElement || lastElement.quantifier !== "exactlyOne") {
                    throw new Error(
                        "Quantifier must follow an unquantified element"
                    );
                }
                lastElement.quantifier = "zeroOrOne";
                lastElement.regex += "?";
                i++;
                break;
            }
            case "+": {
                const lastElement = last(last(stack));
                if (!lastElement || lastElement.quantifier !== "exactlyOne") {
                    throw new Error(
                        "Quantifier must follow an unquantified element"
                    );
                }
                lastElement.quantifier = "oneOrMore";
                lastElement.regex += "+";
                i++;
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
