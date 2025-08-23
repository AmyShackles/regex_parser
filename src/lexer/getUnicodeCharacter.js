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


function getControlCharacter(codepoint) {
    switch (codepoint) {
        case 0:
            return "NUL";
        case 1:
            return "startOfHeading";
        case 2:
            return "startOfText";
        case 3:
            return "endOfText";
        case 4:
            return "endOfTransmit";
        case 5:
            return "enquiry";
        case 6:
            return "acknowledge";
        case 7:
            return "bell";
        case 8:
            return "backspace";
        case 9:
            return "horizontalTab";
        case 10:
            return "lineFeed";
        case 11:
            return "verticalTab";
        case 12:
            return "formFeed";
        case 13:
            return "carriageReturn";
        case 14:
            return "shiftOut";
        case 15:
            return "shiftIn";
        case 16:
            return "dataLineEscape";
        case 17:
            return "deviceControl1";
        case 18:
            return "deviceControl2";
        case 19:
            return "deviceControl3";
        case 20:
            return "deviceControl4";
        case 21:
            return "negativeAcknowledge";
        case 22:
            return "synchronousIdle";
        case 23:
            return "endOfTransmitBlock";
        case 24:
            return "cancel";
        case 25:
            return "endOfMedium";
        case 26:
            return "substitute";
        case 27:
            return "escape";
        case 28:
            return "fileSeparator";
        case 29:
            return "groupSeparator";
        case 30:
            return "recordSeparator";
        case 31:
            return "unitSeparator";
        default:
            throw new Error("Invalid control character");
    }
}

module.exports = { getCharacter, getControlCharacter, getRegexForUnicode, getUnicodeCharacter };
