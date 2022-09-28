const { getControlCharacter } = require("./getUnicode.js");
const { getCharacter } = require("./getUnicodeCharacter");

const getOctal = (
    captureList,
    numberOfBackreferences,
    regex,
    index,
    unicodeMode
) => {
    const regexString = regex.slice(index);
    const number = getNumber(regexString);
    const length = number.length;
    const octalNumber = parseInt(number, 8);
    if (number === "0")
        return {
            nextIndex: index + 1,
            token: {
                quantifier: "exactlyOne",
                regex: "\\0",
                type: "characterClass",
                value: "nulCharacter",
            },
        };
    if (number <= numberOfBackreferences) {
        return {
            nextIndex: index + length,
            token: {
                quantifier: "exactlyOne",
                regex: `\\${number}`,
                type: "backreference",
                value: `repeat capture of ${captureList[Number(number) - 1]}`,
            },
        };
    }
    if (unicodeMode) {
        throw new Error("Octal escapes are not valid in unicode mode");
    }
    if (octalNumber < 32) {
        const value = getControlCharacter(octalNumber);
        return {
            nextIndex: index + length,
            token: {
                quantifier: "exactlyOne",
                regex: `\\${number}`,
                type: "controlCharacter",
                value,
            },
        };
    }
    const unicode = getCharacter(octalNumber);
    if (unicode)
        return {
            nextIndex: index + length,
            token: {
                quantifier: "exactlyOne",
                regex: `\\${number}`,
                type: "octal",
                value: unicode,
            },
        };
    throw new Error("Invalid octal");
};

const getNumber = (regexString) => {
    if (/[0-3]/.test(regexString[0])) {
        if (/[0-7]/.test(regexString[1])) {
            if (/[0-7]/.test(regexString[2])) {
                return regexString.slice(0, 3);
            }
            return regexString.slice(0, 2);
        }
    } else if (/[4-7]/.test(regexString[0])) {
        if (/[1-7]/.test(regexString[1])) {
            return regexString.slice(0, 2);
        }
    }
    return regexString.slice(0, 1);
};

module.exports = { getOctal };
