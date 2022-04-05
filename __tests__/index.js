const {
    backspaceRegex,
    dotRegex,
    findInstancesInCharacterArray,
    getPatternAndFlags,
    parse,
} = require("../src/index.js");

const testRegex = /[a\bc](?<=a)\c23((a)\cA)+.*(?=5)[\b]/gs;
const regexString = testRegex.toString();

// /* eslint-disable */
const reg = /(?<=a)[123][^abc][.].+? {2}\u{12532}\cA (?=5)/gsu;

describe("findInstancesInCharacterArray", () => {
    test("should be able to find all instances of backspace characters", () => {
        expect(
            findInstancesInCharacterArray(backspaceRegex, regexString)
        ).toEqual([4, 35]);
    });
    test("should be able to find all instances of . in character sets", () => {
        expect(findInstancesInCharacterArray(dotRegex, regexString)).toEqual(
            []
        );
    });
});
describe("getPatternsAndFlags", () => {
    test("should return the correct pattern", () => {
        const lastForwardSlash = regexString.lastIndexOf("/");
        expect(getPatternAndFlags(testRegex).pattern).toEqual(
            regexString.slice(1, lastForwardSlash)
        );
    });
    test("should return the correct flags, in order", () => {
        expect(getPatternAndFlags(testRegex).flags).toEqual("gs");
    });
});
describe("parse", () => {
    test("should return an array", () => {
        expect(Array.isArray(parse(testRegex))).toEqual(true);
    });
    test("sanity check to ensure I'm not breaking things", () => {
        expect(JSON.stringify(parse(reg), null, 2)).toEqual(JSON.stringify([
            {
                quantifier: "exactlyOne",
                regex: "(?<=a)",
                type: "positiveLookbehind",
                value: [
                    {
                        quantifier: "exactlyOne",
                        regex: "a",
                        type: "literal",
                        value: "a",
                    },
                ],
            },
            {
                quantifier: "exactlyOne",
                regex: "[123]",
                type: "characterSet",
                value: [
                    {
                        quantifier: "exactlyOne",
                        regex: "1",
                        type: "literal",
                        value: "1",
                    },
                    {
                        quantifier: "exactlyOne",
                        regex: "2",
                        type: "literal",
                        value: "2",
                    },
                    {
                        quantifier: "exactlyOne",
                        regex: "3",
                        type: "literal",
                        value: "3",
                    },
                ],
            },
            {
                quantifier: "exactlyOne",
                regex: "[^abc]",
                type: "negativeCharacterSet",
                value: [
                    {
                        quantifier: "exactlyOne",
                        regex: "a",
                        type: "literal",
                        value: "a",
                    },
                    {
                        quantifier: "exactlyOne",
                        regex: "b",
                        type: "literal",
                        value: "b",
                    },
                    {
                        quantifier: "exactlyOne",
                        regex: "c",
                        type: "literal",
                        value: "c",
                    },
                ],
            },
            {
                quantifier: "exactlyOne",
                regex: "[.]",
                type: "characterSet",
                value: [
                    {
                        quantifier: "exactlyOne",
                        regex: ".",
                        type: "literal",
                        value: ".",
                    },
                ],
            },
            {
                quantifier: "oneOrMore-lazy",
                regex: ".+?",
                type: "dotAll",
            },
            {
                quantifier: "exactlyOne",
                regex: " ",
                type: "literal",
                value: " ",
            },
            {
                quantifier: "exactlyOne",
                regex: "{",
                type: "literal",
                value: "{",
            },
            {
                quantifier: "exactlyOne",
                regex: "2",
                type: "literal",
                value: "2",
            },
            {
                quantifier: "exactlyOne",
                regex: "}",
                type: "literal",
                value: "}",
            },
            {
                quantifier: "exactlyOne",
                regex: "\\u{12532}",
                type: "unicodeExtended",
                value: "𒔲",
            },
            {
                quantifier: "exactlyOne",
                regex: "\\cA",
                type: "controlCharacter",
                value: "startOfHeading"

            },
            {
                quantifier: "exactlyOne",
                regex: " ",
                type: "literal",
                value: " ",
            },
            {
                quantifier: "exactlyOne",
                regex: "(?=5)",
                type: "positiveLookahead",
                value: [
                    {
                        quantifier: "exactlyOne",
                        regex: "5",
                        type: "literal",
                        value: "5",
                    },
                ],
            },
        ], null, 2));
    });
});
