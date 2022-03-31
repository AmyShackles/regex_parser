const { getOctal } = require("../src/utils/getOctal.js");
const { getParenStack} = require("../src/utils/getParenStack");
const { getPatternAndFlags } = require("../src/index.js");

describe("getOctal", () => {
    it("should handle nul characters", () => {
        const testRegex = /\0/gs;
        const { flags, pattern } = getPatternAndFlags(testRegex);
  
        const captureRegex = /^(?<capture_group>(?:(?<named_capture>\(\?<.*?>.*?\))|(?<capture>\([^?][^:]?.*?\))))$/;
        const captureList = getParenStack(pattern).filter((group) => captureRegex.test(group));
        const numberOfBackreferences = captureList.length;
        expect(getOctal(captureList, numberOfBackreferences, pattern, 1, flags.includes("u"))).toEqual({
            nextIndex: 2,
            token: { 
                quantifier: "exactlyOne",
                regex: "\\0",
                type: "characterClass",
                value: "nulCharacter",
            }
        });
    });
    it("should handle backreferences", () => {
        const testRegex = /(Do)\1/;
        const { flags, pattern } = getPatternAndFlags(testRegex);
        const captureRegex = /^(?<capture_group>(?:(?<named_capture>\(\?<.*?>.*?\))|(?<capture>\([^?][^:]?.*?\))))$/;
        const captureList = getParenStack(pattern).filter((group) => captureRegex.test(group));
        const numberOfBackreferences = captureList.length;
        expect(getOctal(captureList, numberOfBackreferences, pattern, 5, flags.includes("u"))).toEqual({
            nextIndex: 6,
            token: {
                quantifier: "exactlyOne",
                regex: "\\1",
                type: "backreference",
                value: `repeat capture of ${captureList[0]}`
            }
        });
    });
    it("should throw an error in unicode mode", () => {
        const testRegex = /\1/;
        const pattern = testRegex.toString();
        const captureRegex = /^(?<capture_group>(?:(?<named_capture>\(\?<.*?>.*?\))|(?<capture>\([^?][^:]?.*?\))))$/;
        const captureList = getParenStack(pattern).filter((group) => captureRegex.test(group));
        const numberOfBackreferences = captureList.length;
        function testError() {
            getOctal(captureList, numberOfBackreferences, pattern, 1, true);
        }
        expect(testError).toThrowError(new Error("Octal escapes are not valid in unicode mode"));
    });
    it("should handle control character octals", () => {
        const testRegex = /\12/;
        const { flags, pattern } = getPatternAndFlags(testRegex);
        const captureRegex = /^(?<capture_group>(?:(?<named_capture>\(\?<.*?>.*?\))|(?<capture>\([^?][^:]?.*?\))))$/;
        const captureList = getParenStack(pattern).filter((group) => captureRegex.test(group));
        const numberOfBackreferences = captureList.length;
        expect(getOctal(captureList, numberOfBackreferences, pattern, 1, flags.includes("u"))).toEqual({
            nextIndex: 3,
            token: {
                quantifier: "exactlyOne",
                regex: "\\12",
                type: "controlCharacter",
                value: "lineFeed"
            }
        });
    });
    it("should handle non-control character octals", () => {
        const testRegex = /\77/;
        const { flags, pattern } = getPatternAndFlags(testRegex);
        const captureRegex = /^(?<capture_group>(?:(?<named_capture>\(\?<.*?>.*?\))|(?<capture>\([^?][^:]?.*?\))))$/;
        const captureList = getParenStack(pattern).filter((group) => captureRegex.test(group));
        const numberOfBackreferences = captureList.length;
        expect(getOctal(captureList, numberOfBackreferences, pattern, 1, flags.includes("u"))).toEqual({
            nextIndex: 3,
            token: {
                quantifier: "exactlyOne",
                regex: "\\77",
                type: "octal",
                value: "?"
            }
        });
    });
});
