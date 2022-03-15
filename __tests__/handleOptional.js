const { handleOptional } = require("../src/utils/handleOptional.js");

describe("handleOptional", () => {
    test("should throw an error if lastElement has a quantity other than 'exactlyOne'", () => {
        const lastElement = {
            quantifier: "oneOrMore",
            regex: "i+",
            type: "literal",
            value: "i"
        };
        const nextChar = ".";
        function testError () {
            handleOptional(lastElement, nextChar, 0);
        }
        expect(testError).toThrowError(new Error("Quantifier must follow an unquantified element"));
        expect(lastElement.quantifier).toEqual("oneOrMore");
        expect(lastElement.regex).toEqual("i+");
    });
    test("should return the new index if greedy", () => {
        const lastElement = {
            quantifier: "exactlyOne",
            regex: "i",
            type: "literal",
            value: "i"
        };
        const nextChar = ".";
        expect(handleOptional(lastElement, nextChar, 0)).toEqual(1);
        expect(lastElement.quantifier).toEqual("zeroOrOne");
        expect(lastElement.regex).toEqual("i?");
    });
    test("should return the new index if lazy", () => {
        const lastElement = {
            quantifier: "exactlyOne",
            regex: "i",
            type: "literal",
            value: "i"
        };
        const nextChar = "?";
        expect(handleOptional(lastElement, nextChar, 0)).toEqual(2);
        expect(lastElement.quantifier).toEqual("zeroOrOne-lazy");
        expect(lastElement.regex).toEqual("i??");
    });
});
