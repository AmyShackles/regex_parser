/* eslint-disable */
const { getCharacter, getRegexForUnicode, getUnicodeCharacter } = require("../src/utils/getUnicodeCharacter");

const unicodeChar = "Ӹ";
const unicodeCodepoint = 1272;

describe("getCharacter", () => {
    test("should return the right character given a codepoint", () => {
        expect(getCharacter(unicodeCodepoint)).toEqual(unicodeChar);
    });
});
describe("getUnicodeCharacter", () => {
    test("should return the appropriate response for hexadecimal", () => {
        expect(getUnicodeCharacter("01", 5, "hexadecimal")).toEqual({
            nextIndex: 5,
            token: {
                quantifier: "exactlyOne",
            regex: "\\x01",
            type: "controlCharacter",
            value: "startOfHeading"
            }
        })
    });
    test("should return the appropriate response for unicode", () => {
        expect(getUnicodeCharacter("1234", 12, "unicode")).toEqual({
            nextIndex: 12,
            token: {
                quantifier: "exactlyOne",
            regex: "\\u1234",
            type: "unicode",
            value: "ሴ"
            }
        })
    });
    test("should return the appropriate response for unicodeExtended", () => {
        expect(getUnicodeCharacter("12352", 17, "unicodeExtended")).toEqual({
            nextIndex: 17,
            token: {
                quantifier: "exactlyOne",
            regex: "\\u{12352}",
            type: "unicodeExtended",
            value: "𒍒"
            }
        })
    });
});
describe("getRegexForUnicode", () => {
    test("should return the appropriate response for hexadecimal", () => {
        expect(getRegexForUnicode("hexadecimal", "12")).toEqual("\\x12")
    });
    test("should return the appropriate response for unicode", () => {
        expect(getRegexForUnicode("unicode", "0012")).toEqual("\\u0012");
    });
    test("should return the appropriate response for unicodeExtended", () => {
        expect(getRegexForUnicode("unicodeExtended", "0012")).toEqual("\\u{0012}")
    });
});
