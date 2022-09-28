const { getUnicodeCharacter } = require("./getUnicodeCharacter");

const getHexadecimal = (pattern, index) => {
    if (pattern.length > index + 2) {
        const hex = pattern.slice(index, index + 2);
        const nextIndex = index + 2;
        const unicodeCharacter = getUnicodeCharacter(
            hex,
            nextIndex,
            "hexadecimal"
        );
        if (unicodeCharacter) return unicodeCharacter;
    }
    return {
        nextIndex: ++index,
        token: {
            quantifier: "exactlyOne",
            regex: "\\x",
            type: "literal",
            value: "x",
        },
    };
};

module.exports = { getHexadecimal };
