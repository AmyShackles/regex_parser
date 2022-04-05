const { getHexadecimal } = require("../src/utils/getHexadecimal");

describe("getHexadecimal", () => {
    test("returns a literal if invalid", () => {
        expect(getHexadecimal("\\xb", 2)).toEqual({
            nextIndex: 3,
            token: {
                quantifier: "exactlyOne",
                regex: "\\x",
                type: "literal",
                value: "x"
            }
        });
    });
});
