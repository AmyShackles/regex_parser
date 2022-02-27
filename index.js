const last = (stack) => stack[stack.length - 1];

function parse(re) {
    const stack = [[]];
    let i = 0;
    while (i < re.length) {
        const next = re[i];

        switch (next) {
            case ".": {
                last(stack).push({
                    type: "wildcard",
                    quantifier: "exactlyOne",
                });
                i++;
                continue;
            }
            case "\\": {
                if (i + 1 >= re.length) {
                    throw new Error(`Bad escape character at index ${i}`);
                }
                const escaped = re[i + 1];
                switch (escaped) {
                    case "b": {
                        let backspaceRegex = /(?<=\[[^\]]*\\)b(?=.*\])/g;
                        const backspaces = [...re.matchAll(backspaceRegex)].map(
                            (m) => m.index
                        );
                        if (backspaces.includes(i + 1)) {
                            last(stack).push({
                                type: "controlCharacter",
                                value: "backspace",
                                quantifier: "exactlyOne",
                            });
                        } else {
                            last(stack).push({
                                type: "assertion",
                                value: "wordBoundary",
                                quantifier: "exactlyOne",
                            });
                        }
                    }
                    case "B": {
                        last(stack).push({
                            type: "assertion",
                            value: "nonWordBoundary",
                            quantifier: "exactlyOne",
                        });
                    }
                    case "d":
                        last(stack).push({
                            type: "characterClass",
                            value: "digit",
                            quantifier: "exactlyOne",
                        });
                    case "D":
                        last(stack).push({
                            type: "characterClass",
                            value: "nonDigit",
                            quantifier: "exactlyOne",
                        });
                    case "w":
                        last(stack).push({
                            type: "characterClass",
                            value: "word",
                            quantifier: "exactlyOne",
                        });
                    case "W":
                        last(stack).push({
                            type: "characterClass",
                            value: "nonWord",
                            quantifier: "exactlyOne",
                        });
                    case "s":
                        last(stack).push({
                            type: "characterClass",
                            value: "whiteSpace",
                            quantifier: "exactlyOne",
                        });
                    case "S":
                        last(stack).push({
                            type: "characterClass",
                            value: "nonWhiteSpace",
                            quantifier: "exacltyOne",
                        });
                    case "t":
                        last(stack).push({
                            type: "characterClass",
                            value: "horizontalTab",
                            quantifier: "exacltyOne",
                        });
                    case "r":
                        last(stack).push({
                            type: "characterClass",
                            value: "carriageReturn",
                            quantifier: "exacltyOne",
                        });
                    case "n":
                        last(stack).push({
                            type: "characterClass",
                            value: "linefeed",
                            quantifier: "exacltyOne",
                        });
                    case "v":
                        last(stack).push({
                            type: "characterClass",
                            value: "verticalTab",
                            quantifier: "exacltyOne",
                        });
                    case "f":
                        last(stack).push({
                            type: "characterClass",
                            value: "formFeed",
                            quantifier: "exacltyOne",
                        });
                    case "0":
                        last(stack).push({
                            type: "characterClass",
                            value: "nulCharacter",
                            quantifier: "exacltyOne",
                        });
                    case "c":
                        const controlChar = re[i + 2];
                        switch (controlChar) {
                            case "a":
                            case "A":
                                last(stack).push({
                                    type: "controlCharacter",
                                    value: "startOfHeading",
                                    quantifier: "exactlyOne",
                                });
                                i += 3;
                                continue;
                            case "b":
                            case "B":
                                last(stack).push({
                                    type: "controlCharacter",
                                    value: "startOfText",
                                    quantifier: "exactlyOne",
                                });
                                i += 3;
                                continue;
                            case "c":
                            case "C":
                                last(stack).push({
                                    type: "controlCharacter",
                                    value: "endOfText",
                                    quantifier: "exactlyOne",
                                });
                                i += 3;
                                continue;
                            case "d":
                            case "D":
                                last(stack).push({
                                    type: "controlCharacter",
                                    value: "endOfTransmit",
                                    quantifier: "exactlyOne",
                                });
                                i += 3;
                                continue;
                            case "e":
                            case "E":
                                last(stack).push({
                                    type: "controlCharacter",
                                    value: "enquiry",
                                    quantifier: "exactlyOne",
                                });
                                i += 3;
                                continue;
                            case "f":
                            case "F":
                                last(stack).push({
                                    type: "controlCharacter",
                                    value: "acknowledge",
                                    quantifier: "exactlyOne",
                                });
                                i += 3;
                                continue;
                            case "g":
                            case "G":
                                last(stack).push({
                                    type: "controlCharacter",
                                    value: "bell",
                                    quantifier: "exactlyOne",
                                });
                                i += 3;
                                continue;
                            case "h":
                            case "H":
                                last(stack).push({
                                    type: "controlCharacter",
                                    value: "backspace",
                                    quantifier: "exactlyOne",
                                });
                                i += 3;
                                continue;
                            case "i":
                            case "I":
                                last(stack).push({
                                    type: "controlCharacter",
                                    value: "horizontalTab",
                                    quantifier: "exactlyOne",
                                });
                                i += 3;
                                continue;
                            case "j":
                            case "J":
                                last(stack).push({
                                    type: "controlCharacter",
                                    value: "lineFeed",
                                    quantifier: "exactlyOne",
                                });
                                i += 3;
                                continue;
                            case "k":
                            case "K":
                                last(stack).push({
                                    type: "controlCharacter",
                                    value: "verticalTab",
                                    quantifier: "exactlyOne",
                                });
                                i += 3;
                                continue;
                            case "l":
                            case "L":
                                last(stack).push({
                                    type: "controlCharacter",
                                    value: "formFeed",
                                    quantifier: "exactlyOne",
                                });
                                i += 3;
                                continue;
                            case "m":
                            case "M":
                                last(stack).push({
                                    type: "controlCharacter",
                                    value: "carriageReturn",
                                    quantifier: "exactlyOne",
                                });
                                i += 3;
                                continue;
                            case "n":
                            case "N":
                                last(stack).push({
                                    type: "controlCharacter",
                                    value: "shiftOut",
                                    quantifier: "exactlyOne",
                                });
                                i += 3;
                                continue;
                            case "o":
                            case "O":
                                last(stack).push({
                                    type: "controlCharacter",
                                    value: "shiftIn",
                                    quantifier: "exactlyOne",
                                });
                                i += 3;
                                continue;
                            case "p":
                            case "P":
                                last(stack).push({
                                    type: "controlCharacter",
                                    value: "dataLineEscape",
                                    quantifier: "exactlyOne",
                                });
                                i += 3;
                                continue;
                            case "q":
                            case "Q":
                                last(stack).push({
                                    type: "controlCharacter",
                                    value: "deviceControl1",
                                    quantifier: "exactlyOne",
                                });
                                i += 3;
                                continue;
                            case "r":
                            case "R":
                                last(stack).push({
                                    type: "controlCharacter",
                                    value: "deviceControl2",
                                    quantifier: "exactlyOne",
                                });
                                i += 3;
                                continue;
                            case "s":
                            case "S":
                                last(stack).push({
                                    type: "controlCharacter",
                                    value: "deviceControl3",
                                    quantifier: "exactlyOne",
                                });
                                i += 3;
                                continue;
                            case "t":
                            case "T":
                                last(stack).push({
                                    type: "controlCharacter",
                                    value: "deviceControl4",
                                    quantifier: "exactlyOne",
                                });
                                i += 3;
                                continue;
                            case "u":
                            case "U":
                                last(stack).push({
                                    type: "controlCharacter",
                                    value: "negativeAcknowledge",
                                    quantifier: "exactlyOne",
                                });
                                i += 3;
                                continue;
                            case "v":
                            case "V":
                                last(stack).push({
                                    type: "controlCharacter",
                                    value: "synchronousIdle",
                                    quantifier: "exactlyOne",
                                });
                                i += 3;
                                continue;
                            case "w":
                            case "W":
                                last(stack).push({
                                    type: "controlCharacter",
                                    value: "endOfTransmitBlock",
                                    quantifier: "exactlyOne",
                                });
                                i += 3;
                                continue;
                            case "x":
                            case "X":
                                last(stack).push({
                                    type: "controlCharacter",
                                    value: "cancel",
                                    quantifier: "exactlyOne",
                                });
                                i += 3;
                                continue;
                            case "y":
                            case "Y":
                                last(stack).push({
                                    type: "controlCharacter",
                                    value: "endOfMedium",
                                    quantifier: "exactlyOne",
                                });
                                i += 3;
                                continue;
                            case "z":
                            case "Z":
                                last(stack).push({
                                    type: "controlCharacter",
                                    value: "substitute",
                                    quantifier: "exactlyOne",
                                });
                                i += 3;
                                continue;
                            default:
                                last(stack).push(
                                    {
                                        type: "element",
                                        value: "\\",
                                        quantifier: "exactlyOne",
                                    },
                                    {
                                        type: "element",
                                        value: "c",
                                        quantifier: "exactlyOne",
                                    },
                                    {
                                        type: "element",
                                        value: controlChar,
                                        quantifier: "exactlyOne",
                                    }
                                );
                                i += 3;
                                continue;
                        }
                    default:
                        last(stack).push({
                            type: "element",
                            value: re[i + 1],
                            quantifier: "exactlyOne",
                        });
                }
                i += 2;
                continue;
            }
            case "(": {
                const nextCharacter = re[i + 1];
                if (nextCharacter === "?") {
                    switch (re[i + 2]) {
                        case "=":
                            stack.push([
                                {
                                    type: "positiveLookahead",
                                    quantifier: "exactlyOne",
                                },
                            ]);
                            i += 3;
                            continue;
                        case "!":
                            stack.push([
                                {
                                    type: "negativeLookeahead",
                                    quantifier: "exactlyOne",
                                },
                            ]);
                            i += 3;
                            continue;
                        case ":":
                            stack.push([
                                {
                                    type: "nonCapturingGroup",
                                    quantifier: "exactlyOne",
                                },
                            ]);
                            i += 3;
                            continue;
                        case "<":
                            const nextVal = re[i + 3];
                            if (nextVal === "=") {
                                stack.push([
                                    {
                                        type: "positiveLookbehind",
                                        quantifier: "exactlyOne",
                                    },
                                ]);
                                i += 4;
                                continue;
                            } else if (nextVal === "!") {
                                stack.push([
                                    {
                                        type: "negativeLookbehind",
                                        quantifier: "exactlyOne",
                                    },
                                ]);
                                i += 4;
                                continue;
                            }
                    }
                }
                stack.push([
                    {
                        type: "capturingGroup",
                        quantifier: "exactlyOne",
                    },
                ]);
                i++;
                continue;
            }
            case ")": {
                if (stack.length <= 1) {
                    throw new Error(`No group to close at index ${i}`);
                }
                const states = stack.pop();
                const label = states.shift();
                last(stack).push({
                    type: label.type,
                    value: states,
                    quantifier: label.quantifier,
                });
                i++;
                continue;
            }
            case "[":
                stack.push([
                    {
                        type: "characterSet",
                        quantifier: "exactlyOne",
                    },
                ]);
                i++;
                continue;
            case "]": {
                if (stack.length <= 1) {
                    throw new Error(`No set to close at index ${i}`);
                }
                const value = stack.pop();
                const label = value.shift();
                last(stack).push({
                    type: label.type,
                    value,
                    quantifier: label.quantifier,
                });
                i++;
                continue;
            }
            case "*": {
                const lastElement = last(last(stack));
                if (!lastElement || lastElement.quantifier !== "exactlyOne") {
                    throw new Error(
                        "Quantifier must follow an unquantified element"
                    );
                }
                lastElement.quantifier = "zeroOrMore";
                i++;
                continue;
            }
            case "?": {
                const lastElement = last(last(stack));
                if (!lastElement || lastElement.quantifier !== "exactlyOne") {
                    throw new Error(
                        "Quantifier must follow an unquantified element"
                    );
                }
                lastElement.quantifier = "zeroOrOne";
                i++;
                continue;
            }
            case "+": {
                const lastElement = last(last(stack));
                if (!lastElement || lastElement.quantifier !== "exactlyOne") {
                    throw new Error(
                        "Quantifier must follow an unquantified element"
                    );
                }
                lastElement.quantifier = "oneOrMore";
                i++;
                continue;
            }
            default:
                last(stack).push({
                    type: "element",
                    value: next,
                    quantifier: "exactlyOne",
                });
                i++;
                continue;
        }
    }
    if (stack.length !== 1) {
        throw new Error("Unmatched groups in regular expression");
    }
    return stack[0];
}

const states = parse("[abc](?<=a)\\c23((a)\\cA)+.*(?=5)");
function parseString(key, value) {
    if (typeof value === "string") return value;
    return;
}
console.log(JSON.stringify(states, null, 2));
