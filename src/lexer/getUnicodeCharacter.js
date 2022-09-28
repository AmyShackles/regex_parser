const { getControlCharacter } = require("./getUnicode");

const getCharacter = (codepoint) => {
    try {
        return String.fromCodePoint(codepoint);
    } catch {
        return "";
    }
};
const getUnicodeCharacter = (hex, nextIndex, type) => {
    if (!isNaN(`0x${hex}`)) {
        const codepoint = parseInt(hex, 16);
        if (codepoint < 32) {
            const value  = getControlCharacter(codepoint);
            return {
                nextIndex,
                token: {
                    quantifier: "exactlyOne", 
                    regex: getRegexForUnicode(type, hex),
                    type: "controlCharacter",
                    value,
                }
            };
        }
        const value = getCharacter(codepoint);
        if (value)
            return {
                nextIndex,
                token: {
                    quantifier: "exactlyOne",
                    regex: getRegexForUnicode(type, hex),
                    type,
                    value,
                }
            };
    }
    return null;
};

const getRegexForUnicode = (type, hex) => {
    switch (type) {
        case "unicodeExtended":
            return `\\u{${hex}}`;
        case "unicode":
            return `\\u${hex}`;
        case "hexadecimal":
            return  `\\x${hex}`;
        default:
            throw new Error("This function is only configured to work with unicode and hex");
    }
};

module.exports = { getCharacter, getRegexForUnicode, getUnicodeCharacter };
