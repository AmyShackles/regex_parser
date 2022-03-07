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

    const dots = findInstancesInCharacterArray(dotRegex, re);

    let i = 0;
    while (i < re.length) {
        const next = re[i];

        switch (next) {
            case ".": {
                if (dots.includes(next)) {
                    last(stack).push({
                        quantifier: "exactlyOne",
                        regex: ".",
                        type: "literal",
                        value: ".",
                    });
                } else if (flags.includes("s")) {
                    last(stack).push({
                        quantifier: "exactlyOne",
                        regex: ".",
                        type: "dotAll",
                    });
                } else {
                    last(stack).push({
                        quantifier: "exactlyOne",
                        regex: ".",
                        type: "dot",
                    });
                }
                i++;
                continue;
            }
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
                        break;
                    case "d":
                        last(stack).push({
                            quantifier: "exactlyOne",
                            regex: "\\d",
                            type: "characterClass",
                            value: "digit",
                        });
                        break;
                        case "D":
                            last(stack).push({
                                quantifier: "exactlyOne",
                                regex: "\\D",
                                type: "characterClass",
                                value: "nonDigit",
                        });
                        break;
                    case "w":
                        last(stack).push({
                            quantifier: "exactlyOne",
                            regex: "\\w",
                            type: "characterClass",
                            value: "word",
                        });
                        break;
                    case "W":
                        last(stack).push({
                            quantifier: "exactlyOne",
                            regex: "\\W",
                            type: "characterClass",
                            value: "nonWord",
                        });
                        break;
                    case "s":
                        last(stack).push({
                            quantifier: "exactlyOne",
                            regex: "\\s",
                            type: "characterClass",
                            value: "whiteSpace",
                        });
                        break;
                    case "S":
                        last(stack).push({
                            quantifier: "exacltyOne",
                            regex: "\\S",
                            type: "characterClass",
                            value: "nonWhiteSpace",
                        });
                        break;
                    case "t":
                        last(stack).push({
                            quantifier: "exacltyOne",
                            regex: "\\t",
                            type: "characterClass",
                            value: "horizontalTab",
                        });
                        break;
                    case "r":
                        last(stack).push({
                            quantifier: "exacltyOne",
                            regex: "\\r",
                            type: "characterClass",
                            value: "carriageReturn",
                        });
                        break;
                    case "n":
                        last(stack).push({
                            quantifier: "exacltyOne",
                            regex: "\\n",
                            type: "characterClass",
                            value: "linefeed",
                        });
                        break;
                    case "v":
                        last(stack).push({
                            quantifier: "exacltyOne",
                            regex: "\\v",
                            type: "characterClass",
                            value: "verticalTab",
                        });
                        break;
                    case "f":
                        last(stack).push({
                            quantifier: "exacltyOne",
                            regex: "\\f",
                            type: "characterClass",
                            value: "formFeed",
                        });
                        break;
                    case "0":
                        last(stack).push({
                            quantifier: "exacltyOne",
                            regex: "\\0",
                            type: "characterClass",
                            value: "nulCharacter",
                        });
                        break;
                    case "c":
                        {
                            const controlChar = re[i + 2];
                            switch (controlChar) {
                                case "a":
                                case "A":
                                    last(stack).push({
                                        quantifier: "exactlyOne",
                                        regex: `\\c${controlChar}`,
                                        type: "controlCharacter",
                                        value: "startOfHeading",
                                    });
                                    break;
                                case "b":
                                case "B":
                                    last(stack).push({
                                        quantifier: "exactlyOne",
                                        regex: `\\c${controlChar}`,
                                        type: "controlCharacter",
                                        value: "startOfText",
                                    });
                                    break;
                                case "c":
                                case "C":
                                    last(stack).push({
                                        quantifier: "exactlyOne",
                                        regex: `\\c${controlChar}`,
                                        type: "controlCharacter",
                                        value: "endOfText",
                                    });
                                    break;
                                case "d":
                                case "D":
                                    last(stack).push({
                                        quantifier: "exactlyOne",
                                        regex: `\\c${controlChar}`,
                                        type: "controlCharacter",
                                        value: "endOfTransmit",
                                    });
                                    break;
                                case "e":
                                case "E":
                                    last(stack).push({
                                        quantifier: "exactlyOne",
                                        regex: `\\c${controlChar}`,
                                        type: "controlCharacter",
                                        value: "enquiry",
                                    });
                                    break;
                                case "f":
                                case "F":
                                    last(stack).push({
                                        quantifier: "exactlyOne",
                                        regex: `\\c${controlChar}`,
                                        type: "controlCharacter",
                                        value: "acknowledge",
                                    });
                                    break;
                                case "g":
                                case "G":
                                    last(stack).push({
                                        quantifier: "exactlyOne",
                                        regex: `\\c${controlChar}`,
                                        type: "controlCharacter",
                                        value: "bell",
                                    });
                                    continue;
                                case "h":
                                case "H":
                                    last(stack).push({
                                        quantifier: "exactlyOne",
                                        regex: `\\c${controlChar}`,
                                        type: "controlCharacter",
                                        value: "backspace",
                                    });
                                    break;
                                case "i":
                                case "I":
                                    last(stack).push({
                                        quantifier: "exactlyOne",
                                        regex: `\\c${controlChar}`,
                                        type: "controlCharacter",
                                        value: "horizontalTab",
                                    });
                                    break;
                                case "j":
                                case "J":
                                    last(stack).push({
                                        quantifier: "exactlyOne",
                                        regex: `\\c${controlChar}`,
                                        type: "controlCharacter",
                                        value: "lineFeed",
                                    });
                                    break;
                                case "k":
                                case "K":
                                    last(stack).push({
                                        quantifier: "exactlyOne",
                                        regex: `\\c${controlChar}`,
                                        type: "controlCharacter",
                                        value: "verticalTab",
                                    });
                                    break;
                                case "l":
                                case "L":
                                    last(stack).push({
                                        quantifier: "exactlyOne",
                                        regex: `\\c${controlChar}`,
                                        type: "controlCharacter",
                                        value: "formFeed",
                                    });
                                    break;
                                case "m":
                                case "M":
                                    last(stack).push({
                                        quantifier: "exactlyOne",
                                        regex: `\\c${controlChar}`,
                                        type: "controlCharacter",
                                        value: "carriageReturn",
                                    });
                                    break;
                                case "n":
                                case "N":
                                    last(stack).push({
                                        quantifier: "exactlyOne",
                                        regex: `\\c${controlChar}`,
                                        type: "controlCharacter",
                                        value: "shiftOut",
                                    });
                                    break;
                                case "o":
                                case "O":
                                    last(stack).push({
                                        quantifier: "exactlyOne",
                                        regex: `\\c${controlChar}`,
                                        type: "controlCharacter",
                                        value: "shiftIn",
                                    });
                                    break;
                                case "p":
                                case "P":
                                    last(stack).push({
                                        quantifier: "exactlyOne",
                                        regex: `\\c${controlChar}`,
                                        type: "controlCharacter",
                                        value: "dataLineEscape",
                                    });
                                    break;
                                case "q":
                                case "Q":
                                    last(stack).push({
                                        quantifier: "exactlyOne",
                                        regex: `\\c${controlChar}`,
                                        type: "controlCharacter",
                                        value: "deviceControl1",
                                    });
                                    break;
                                case "r":
                                case "R":
                                    last(stack).push({
                                        quantifier: "exactlyOne",
                                        regex: `\\c${controlChar}`,
                                        type: "controlCharacter",
                                        value: "deviceControl2",
                                    });
                                    break;
                                case "s":
                                case "S":
                                    last(stack).push({
                                        quantifier: "exactlyOne",
                                        regex: `\\c${controlChar}`,
                                        type: "controlCharacter",
                                        value: "deviceControl3",
                                    });
                                    break;
                                case "t":
                                case "T":
                                    last(stack).push({
                                        quantifier: "exactlyOne",
                                        regex: `\\c${controlChar}`,
                                        type: "controlCharacter",
                                        value: "deviceControl4",
                                    });
                                    break;
                                case "u":
                                case "U":
                                    last(stack).push({
                                        quantifier: "exactlyOne",
                                        regex: `\\c${controlChar}`,
                                        type: "controlCharacter",
                                        value: "negativeAcknowledge",
                                    });
                                    break;
                                case "v":
                                case "V":
                                    last(stack).push({
                                        quantifier: "exactlyOne",
                                        regex: `\\c${controlChar}`,
                                        type: "controlCharacter",
                                        value: "synchronousIdle",
                                    });
                                    break;
                                case "w":
                                case "W":
                                    last(stack).push({
                                        quantifier: "exactlyOne",
                                        regex: `\\c${controlChar}`,
                                        type: "controlCharacter",
                                        value: "endOfTransmitBlock",
                                    });
                                    break;
                                case "x":
                                case "X":
                                    last(stack).push({
                                        quantifier: "exactlyOne",
                                        regex: `\\c${controlChar}`,
                                        type: "controlCharacter",
                                        value: "cancel",
                                    });
                                    break;
                                case "y":
                                case "Y":
                                    last(stack).push({
                                        quantifier: "exactlyOne",
                                        regex: `\\c${controlChar}`,
                                        type: "controlCharacter",
                                        value: "endOfMedium",
                                    });
                                    break;
                                case "z":
                                case "Z":
                                    last(stack).push({
                                        quantifier: "exactlyOne",
                                        regex: `\\c${controlChar}`,
                                        type: "controlCharacter",
                                        value: "substitute",
                                    });
                                    break;
                                // Control characters only include
                                // \ca - \cz (case insensitive)
                                // So if the value after c is anything else,
                                // Match literally
                                default:
                                    last(stack).push(
                                        {
                                            quantifier: "exactlyOne",
                                            regex: "\\",
                                            type: "element",
                                            value: "\\",
                                        },
                                        {
                                            quantifier: "exactlyOne",
                                            regex: "c",
                                            type: "element",
                                            value: "c",
                                        },
                                        {
                                            quantifier: "exactlyOne",
                                            regex: controlChar,
                                            type: "element",
                                            value: controlChar,
                                        }
                                    );
                                    break;
                            }
                        }
                        i += 3;
                        break;
                    // If there isn't a special rule about the escaped
                    // character, treat it like a literal
                    default:
                        last(stack).push({
                            quantifier: "exactlyOne",
                            regex: `\\${re[i + 1]}`,
                            type: "element",
                            value: re[i + 1],
                        });
                }
                i += 2;
                break;
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
            // TODO: Add logic for negative character sets
            case "[":
                stack.push([
                    {
                        quantifier: "exactlyOne",
                        regex: "[",
                        type: "characterSet",
                    },
                ]);
                i++;
                break;
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
