const { handleKleenePlus } = require("../src/utils/handleKleenePlus.js");

describe("handleKleenePlus", () => {
    test("should throw an error if lastElement has a quantity other than 'exactlyOne'", () => {
        const lastElement = {
            quantifier: "zeroOrMore",
            regex: "i*",
            type: "literal",
            value: "i"
        };
        const nextChar = ".";
        function testError () {
            handleKleenePlus(lastElement, nextChar, 0);
        }
        expect(testError).toThrowError(new Error("Quantifier must follow an unquantified element"));
        expect(lastElement.quantifier).toEqual("zeroOrMore");
        expect(lastElement.regex).toEqual("i*");
    });
    test("should return the new index if greedy", () => {
        const lastElement = {
            quantifier: "exactlyOne",
            regex: "i",
            type: "literal",
            value: "i"
        };
        const nextChar = ".";
        expect(handleKleenePlus(lastElement, nextChar, 0)).toEqual(1);
        expect(lastElement.quantifier).toEqual("oneOrMore");
        expect(lastElement.regex).toEqual("i+");
    });
    test("should return the new index if lazy", () => {
        const lastElement = {
            quantifier: "exactlyOne",
            regex: "i",
            type: "literal",
            value: "i"
        };
        const nextChar = "?";
        expect(handleKleenePlus(lastElement, nextChar, 0)).toEqual(2);
        expect(lastElement.quantifier).toEqual("oneOrMore-lazy");
        expect(lastElement.regex).toEqual("i+?");
    });
});
