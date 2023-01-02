const { getControlChar } = require("./getControlChar");
const { getUnicode } = require("./getUnicode");
const { getHexadecimal } = require("./getHexadecimal");
const { getOctal } = require("./getOctal");
const { getParenStack } = require("./getParenStack");

const handleEscapes = ({
    currentChar,
    index,
    nextChar,
    pattern,
    unicodeMode,
    inCharacterSet,
}) => {
    const captureRegex = /^(?<capture_group>(?:(?<named_capture>\(\?<.*?>.*?\))|(?<capture>\([^?][^:]?.*?\))))$/;
    const captureList = getParenStack(pattern).filter((group) => captureRegex.test(group)
    );
    const numberOfBackreferences = captureList.length;

    switch (currentChar) {
        case "b": {
            if (inCharacterSet) {
                return {
                    index: index + 1,
                    token: {
                        quantifier: "exactlyOne",
                        regex: "[\\b]",
                        type: "controlCharacter",
                        value: "backspace",
                    },
                };
            }
            return {
                index: index + 1,
                token: {
                    quantifier: "exactlyOne",
                    regex: "\\b",
                    type: "assertion",
                    value: "wordBoundary",
                },
            };
        }
        case "B":
            if (inCharacterSet) {
                return {
                    index: index + 1,
                    token: {
                        quantifier: "exactlyOne",
                        regex: "\\B",
                        type: "literal",
                        value: "B",
                    },
                };
            }
            return {
                index: index + 1,
                token: {
                    quantifier: "exactlyOne",
                    regex: "\\B",
                    type: "assertion",
                    value: "nonWordBoundary",
                },
            };
        case "d":
            return {
                index: index + 1,
                token: {
                    quantifier: "exactlyOne",
                    regex: "\\d",
                    type: "characterClass",
                    value: "digit",
                },
            };
        case "D":
            return {
                index: index + 1,
                token: {
                    quantifier: "exactlyOne",
                    regex: "\\D",
                    type: "characterClass",
                    value: "nonDigit",
                },
            };
        case "w":
            return {
                index: index + 1,
                token: {
                    quantifier: "exactlyOne",
                    regex: "\\w",
                    type: "characterClass",
                    value: "word",
                },
            };
        case "W":
            return {
                index: index + 1,
                token: {
                    quantifier: "exactlyOne",
                    regex: "\\W",
                    type: "characterClass",
                    value: "nonWord",
                },
            };
        case "s":
            return {
                index: index + 1,
                token: {
                    quantifier: "exactlyOne",
                    regex: "\\s",
                    type: "characterClass",
                    value: "whiteSpace",
                },
            };
        case "S":
            return {
                index: index + 1,
                token: {
                    quantifier: "exactlyOne",
                    regex: "\\S",
                    type: "characterClass",
                    value: "nonWhiteSpace",
                },
            };
        case "t":
            return {
                index: index + 1,
                token: {
                    quantifier: "exactlyOne",
                    regex: "\\t",
                    type: "characterClass",
                    value: "horizontalTab",
                },
            };
        case "r":
            return {
                index: index + 1,
                token: {
                    quantifier: "exactlyOne",
                    regex: "\\r",
                    type: "characterClass",
                    value: "carriageReturn",
                },
            };
        case "n":
            return {
                index: index + 1,
                token: {
                    quantifier: "exactlyOne",
                    regex: "\\n",
                    type: "characterClass",
                    value: "linefeed",
                },
            };
        case "v":
            return {
                index: index + 1,
                token: {
                    quantifier: "exactlyOne",
                    regex: "\\v",
                    type: "characterClass",
                    value: "verticalTab",
                },
            };
        case "f":
            return {
                index: index + 1,
                token: {
                    quantifier: "exactlyOne",
                    regex: "\\f",
                    type: "characterClass",
                    value: "formFeed",
                },
            };
        case "c": {
            if (Array.isArray(getControlChar(nextChar))) {
                return {
                    index: index + 1,
                    token: getControlChar(nextChar),
                };
            }
            return {
                index: index + 2,
                token: getControlChar(nextChar),
            };
        }
        case "u": {
            const currentIndex = index + 1;
            const { nextIndex, token } = getUnicode(
                pattern,
                currentIndex,
                unicodeMode
            );
            return {
                index: nextIndex,
                token,
            };
        }
        case "x": {
            const currentIndex = index + 1;
            const { nextIndex, token } = getHexadecimal(pattern, currentIndex);
            return {
                index: nextIndex,
                token,
            };
        }
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7": {
            const { nextIndex, token } = getOctal(
                captureList,
                numberOfBackreferences,
                pattern,
                index,
                unicodeMode,
                inCharacterSet
            );
            return {
                index: nextIndex,
                token,
            };
        }

        default:
            return {
                index: index + 1,
                token: {
                    quantifier: "exactlyOne",
                    regex: `\\${pattern[index]}`,
                    type: "element",
                    value: pattern[index],
                },
            };
    }
};

module.exports = { handleEscapes };
