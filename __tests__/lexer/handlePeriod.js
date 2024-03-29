const { handlePeriod } = require("../../src/lexer/handlePeriod.js");
const { dotRegex, findInstancesInCharacterArray } = require("../../src/lexer/index.js"); 



describe("handlePeriod", () => {
    test("should return a literal period if in a character set", () => {
        const testRegex = /[.]/;
        const regexString = testRegex.toString();
        const dots = findInstancesInCharacterArray(dotRegex, regexString);
        expect(handlePeriod(false, regexString.indexOf("."), dots)).toEqual({
            quantifier: "exactlyOne",
            regex: ".",
            type: "literal",
            value: ".",
        });
    });
    test("should return a dot if s flag is false", () => {
        const testRegex = /./;
        const regexString = testRegex.toString();
        const dots = findInstancesInCharacterArray(dotRegex, regexString);
        expect(handlePeriod(false, regexString.indexOf("."), dots)).toEqual({
            quantifier: "exactlyOne",
            regex: ".",
            type: "dot",
            value: "character (not including line breaks)"
        });
    });
    test("should return a dotAll if s flag is true", () => {
        const testRegex = /./s;
        const regexString = testRegex.toString();
        const dots = findInstancesInCharacterArray(dotRegex, regexString);
        expect(handlePeriod(true, regexString.indexOf("."), dots)).toEqual({
            quantifier: "exactlyOne",
            regex: ".",
            type: "dotAll",
            value: "character (including line breaks)"
        });
    });
});
