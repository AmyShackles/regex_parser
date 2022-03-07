const {
    backspaceRegex,
    dotRegex,
    findInstancesInCharacterArray,
    getPatternAndFlags,
    parse,
} = require("../src/index.js");

const testRegex = /[a\bc](?<=a)\c23((a)\cA)+.*(?=5)[\b]/sg;
const regexString = testRegex.toString();


describe("findInstancesInCharacterArray", () => {
    test("should be able to find all instances of backspace characters", () => {
        expect(findInstancesInCharacterArray(backspaceRegex, regexString))
        .toEqual([4, 35]);
    });
    test("should be able to find all instances of . in character sets", () => {
        expect(findInstancesInCharacterArray(dotRegex, regexString))
        .toEqual([]);
    });
});
describe("getPatternsAndFlags", () => {
    test("should return the correct pattern", () => {
        const lastForwardSlash = regexString.lastIndexOf("/");
        expect(getPatternAndFlags(testRegex).pattern).toEqual(regexString.slice(1, lastForwardSlash));
    });
    test("should return the correct flags, in order", () => {
        expect(getPatternAndFlags(testRegex).flags).toEqual("gs");
    });
});
describe("parse", () => {
    test("should return an array", () => {
        expect(Array.isArray(parse(testRegex))).toEqual(true);
    });
});
