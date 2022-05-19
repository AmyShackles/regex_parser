const { handleRange } = require("../../src/lexer/handleRange");

describe("handleRange", () => {
    test("should handle minimum quantifier", () => {
        const lastElement = {
            quantifier: "exactlyOne",
            regex: "i",
            type: "literal",
            value: "i"
        };
        const betweenBraces = "3,";
        const index = 2;
        const expectedIndex = index + betweenBraces.length + 1;
        const expectedToken = {
            quantifier: "exactlyOne",
            regex: `{${betweenBraces}}`,
            type: "range",
            value: "atLeast3"
        };
        expect(handleRange(lastElement, betweenBraces, index)).toEqual({index: expectedIndex, token: expectedToken});
        expect(lastElement.quantifier).toEqual("atLeast3");
    });
});
