const { getParenStack } = require("../../src/lexer/getParenStack.js");

describe("getParenStack", () => {
    it("should return an array of captures", () => {
        expect(getParenStack("(Do)(Re)(Mi)")).toEqual(["(Do)", "(Re)", "(Mi)"]);
    });
});
