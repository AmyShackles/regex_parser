const { getUnicodeCharacter } = require("./getUnicodeCharacter");

const getUnicode = (regexString, index, unicodeFlagSet) => {
    let hex, nextIndex;
    // The \u{hhhh} format is only valid when unicodeFlag is set
    // Else, the 'u' is parsed as an escaped 'u' character
    if (unicodeFlagSet && regexString[index] === "{") {
        const closingBraceIndex = regexString.indexOf("}", index + 1);
        hex = regexString.slice(index + 1, closingBraceIndex);
        nextIndex = closingBraceIndex + 1;
        return getUnicodeCharacter(hex, nextIndex, "unicodeExtended");
    } else if (!unicodeFlagSet && regexString[index] === "{") {
        throw new Error(
            "Invalid use of extended unicode outside of unicode mode"
        );
    }
    hex = regexString.slice(index, index + 5);
    nextIndex = index + 5;
    const unicodeCharacter = getUnicodeCharacter(hex, nextIndex, "unicode");
    if (unicodeCharacter) 
        return unicodeCharacter;
    return {
        nextIndex: ++index,
        token: {
            quantifier: "exactlyOne",
            regex: "\\u",
            type: "literal",
            value: "u",
        },
    };
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

module.exports = { getControlCharacter, getUnicode };
