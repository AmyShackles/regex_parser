const getUnicode = (regexString, index, unicodeFlagSet) => {
    let codepoint, hex, unicode;
    // The \u{hhhh} format is only valid when unicodeFlag is set
    // Else, the 'u' is parsed as an escaped 'u' character
    if (unicodeFlagSet && regexString[index] === "{") {
        const closingBraceIndex = regexString.indexOf("}", index + 1);
        if (closingBraceIndex === index + 6) {
            hex = regexString.slice(index + 1, index + 6);
            if (!isNaN(`0x${hex}`)) {
                codepoint = parseInt(hex, 16);
                unicode = getCharacter(codepoint);
                if (unicode) return {
                    nextIndex: index + 7,
                    token: {
                        quantifier: "exactlyOne",
                        regex: `\\u{${hex}}`,
                        type: "unicodeCharacter",
                        value: unicode,
                    }
                };
            }
            return {
                nextIndex: index,
                token: {
                    quantifier: "exactlyOne",
                    regex: "\\u",
                    type: "literal",
                    value: "u",
                }
            };
        } else if (closingBraceIndex === index + 5) {
            hex = regexString.slice(index + 1, index + 5);
            if (!isNaN(`0x${hex}`)) {
                codepoint = parseInt(hex, 16);
                unicode = getCharacter(codepoint);
                if (unicode) return {
                    nextIndex: index + 6,
                    token: {
                    quantifier: "exactlyOne",
                    regex: `\\u{${hex}}`,
                    type: "unicodeCharacter",
                    value: unicode
                    },
                };
            }
            return {
                nextIndex: index,
                token: {
                    quantifier: "exactlyOne",
                    regex: "\\u",
                    type: "literal",
                    value: "u",
                }
            };
        }
    }
    return {
        nextIndex: index,
        token: {
            quantifier: "exactlyOne",
            regex: "\\u",
            type: "literal",
            value: "u",
        }
    };
};

const getCharacter = (codepoint) => {
    try {
        return String.fromCodePoint(codepoint);
    } catch {
        return "";
    }
};

module.exports = { getCharacter, getUnicode };
