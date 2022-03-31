const { getUnicode, getCharacter, getControlCharacter } = require("../src/utils/getUnicode.js");

const unicodeChar = "Ӹ";
const unicodeCodepoint = 1272;

describe("getCharacter", () => {
    test("should return the right character given a codepoint", () => {
        expect(getCharacter(unicodeCodepoint)).toEqual(unicodeChar);
    });
});
describe("getUnicode", () => {
    describe("unicodeFlagSet", () => {
        test("should return the correct token if extended unicode passed in", () => {
            expect(getUnicode("{12352}", 0, true)).toEqual({
                nextIndex: 7,
                token: {
                    quantifier: "exactlyOne",
                    regex: "\\u{12352}",
                    type: "unicodeCharacter",
                    value: "𒍒",
                }
            });
            expect(getUnicode("what\\u{04F8}abracadabra", 6, true)).toEqual({
                nextIndex: 12,
                token: {
                    quantifier: "exactlyOne",
                    regex: "\\u{04F8}",
                    type: "unicodeCharacter",
                    value: unicodeChar,
                }
            });
        }); 
    });
});
describe("getControlCharacter", () => {
    test("should return the next index and token for control characters", () => {
        expect(getControlCharacter(31)).toEqual("unitSeparator");
    });
});
