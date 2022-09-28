const { getPatternAndFlags } = require("../../src/lexer/index");
const { handleEscapes } = require("../../src/lexer/handleEscapes.js");

describe("handleEscapes", () => {
    it("should handle backspace", () => {
        const testRegex = /[\b]/gs;
        const { flags, pattern } = getPatternAndFlags(testRegex);
        const currentChar = pattern[2];
        const nextChar = pattern[3];
        const index = 2;
        const unicodeMode = flags.includes("u");
        expect(
            handleEscapes({
                currentChar,
                inCharacterSet: true,
                index,
                nextChar,
                pattern,
                unicodeMode,
            })
        ).toEqual({
            index: index + 1,
            token: {
                quantifier: "exactlyOne",
                regex: "[\\b]",
                type: "controlCharacter",
                value: "backspace",
            },
        });
    });
    it("should handle wordBoundary", () => {
        const testRegex = /\b/gs;
        const { flags, pattern } = getPatternAndFlags(testRegex);
        const currentChar = pattern[1];
        const nextChar = pattern[2];
        const index = 1;
        const unicodeMode = flags.includes("u");
        expect(
            handleEscapes({
                currentChar,
                inCharacterSet: false,
                index,
                nextChar,
                pattern,
                unicodeMode,
            })
        ).toEqual({
            index: index + 1,
            token: {
                quantifier: "exactlyOne",
                regex: "\\b",
                type: "assertion",
                value: "wordBoundary",
            },
        });
    });
    it("should handle nonWordBoundary", () => {
        const testRegex = /\B/gs;
        const { flags, pattern } = getPatternAndFlags(testRegex);
        const currentChar = pattern[1];
        const nextChar = pattern[2];
        const index = 1;
        const unicodeMode = flags.includes("u");
        expect(
            handleEscapes({
                currentChar,
                inCharacterSet: false,
                index,
                nextChar,
                pattern,
                unicodeMode,
            })
        ).toEqual({
            index: index + 1,
            token: {
                quantifier: "exactlyOne",
                regex: "\\B",
                type: "assertion",
                value: "nonWordBoundary",
            },
        });
    });
    it("should handle digit", () => {
        const testRegex = /\d/gs;
        const { flags, pattern } = getPatternAndFlags(testRegex);
        const currentChar = pattern[1];
        const nextChar = pattern[2];
        const index = 1;
        const unicodeMode = flags.includes("u");
        expect(
            handleEscapes({
                currentChar,
                inCharacterSet: false,
                index,
                nextChar,
                pattern,
                unicodeMode,
            })
        ).toEqual({
            index: index + 1,
            token: {
                quantifier: "exactlyOne",
                regex: "\\d",
                type: "characterClass",
                value: "digit",
            },
        });
    });
    it("should handle nonDigit", () => {
        const testRegex = /\D/gs;
        const { flags, pattern } = getPatternAndFlags(testRegex);
        const currentChar = pattern[1];
        const nextChar = pattern[2];
        const index = 1;
        const unicodeMode = flags.includes("u");
        expect(
            handleEscapes({
                currentChar,
                inCharacterSet: false,
                index,
                nextChar,
                pattern,
                unicodeMode,
            })
        ).toEqual({
            index: index + 1,
            token: {
                quantifier: "exactlyOne",
                regex: "\\D",
                type: "characterClass",
                value: "nonDigit",
            },
        });
    });
    it("should handle word", () => {
        const testRegex = /\w/gs;
        const { flags, pattern } = getPatternAndFlags(testRegex);
        const currentChar = pattern[1];
        const nextChar = pattern[2];
        const index = 1;
        const unicodeMode = flags.includes("u");
        expect(
            handleEscapes({
                currentChar,
                inCharacterSet: false,
                index,
                nextChar,
                pattern,
                unicodeMode,
            })
        ).toEqual({
            index: index + 1,
            token: {
                quantifier: "exactlyOne",
                regex: "\\w",
                type: "characterClass",
                value: "word",
            },
        });
    });
    it("should handle nonWord", () => {
        const testRegex = /\W/gs;
        const { flags, pattern } = getPatternAndFlags(testRegex);
        const currentChar = pattern[1];
        const nextChar = pattern[2];
        const index = 1;
        const unicodeMode = flags.includes("u");
        expect(
            handleEscapes({
                currentChar,
                inCharacterSet: false,
                index,
                nextChar,
                pattern,
                unicodeMode,
            })
        ).toEqual({
            index: index + 1,
            token: {
                quantifier: "exactlyOne",
                regex: "\\W",
                type: "characterClass",
                value: "nonWord",
            },
        });
    });
    it("should handle whiteSpace", () => {
        const testRegex = /\s/gs;
        const { flags, pattern } = getPatternAndFlags(testRegex);
        const currentChar = pattern[1];
        const nextChar = pattern[2];
        const index = 1;
        const unicodeMode = flags.includes("u");
        expect(
            handleEscapes({
                currentChar,
                inCharacterSet: false,
                index,
                nextChar,
                pattern,
                unicodeMode,
            })
        ).toEqual({
            index: index + 1,
            token: {
                quantifier: "exactlyOne",
                regex: "\\s",
                type: "characterClass",
                value: "whiteSpace",
            },
        });
    });
    it("should handle nonWhiteSpace", () => {
        const testRegex = /\S/gs;
        const { flags, pattern } = getPatternAndFlags(testRegex);
        const currentChar = pattern[1];
        const nextChar = pattern[2];
        const index = 1;
        const unicodeMode = flags.includes("u");
        expect(
            handleEscapes({
                currentChar,
                inCharacterSet: false,
                index,
                nextChar,
                pattern,
                unicodeMode,
            })
        ).toEqual({
            index: index + 1,
            token: {
                quantifier: "exactlyOne",
                regex: "\\S",
                type: "characterClass",
                value: "nonWhiteSpace",
            },
        });
    });
    it("should handle horizontalTab", () => {
        const testRegex = /\t/gs;
        const { flags, pattern } = getPatternAndFlags(testRegex);
        const currentChar = pattern[1];
        const nextChar = pattern[2];
        const index = 1;
        const unicodeMode = flags.includes("u");
        expect(
            handleEscapes({
                currentChar,
                inCharacterSet: false,
                index,
                nextChar,
                pattern,
                unicodeMode,
            })
        ).toEqual({
            index: index + 1,
            token: {
                quantifier: "exactlyOne",
                regex: "\\t",
                type: "characterClass",
                value: "horizontalTab",
            },
        });
    });
    it("should handle carriageReturn", () => {
        const testRegex = /\r/gs;
        const { flags, pattern } = getPatternAndFlags(testRegex);
        const currentChar = pattern[1];
        const nextChar = pattern[2];
        const index = 1;
        const unicodeMode = flags.includes("u");
        expect(
            handleEscapes({
                currentChar,
                inCharacterSet: false,
                index,
                nextChar,
                pattern,
                unicodeMode,
            })
        ).toEqual({
            index: index + 1,
            token: {
                quantifier: "exactlyOne",
                regex: "\\r",
                type: "characterClass",
                value: "carriageReturn",
            },
        });
    });
    it("should handle linefeed", () => {
        const testRegex = /\n/gs;
        const { flags, pattern } = getPatternAndFlags(testRegex);
        const currentChar = pattern[1];
        const nextChar = pattern[2];
        const index = 1;
        const unicodeMode = flags.includes("u");
        expect(
            handleEscapes({
                currentChar,
                inCharacterSet: true,
                index,
                nextChar,
                pattern,
                unicodeMode,
            })
        ).toEqual({
            index: index + 1,
            token: {
                quantifier: "exactlyOne",
                regex: "\\n",
                type: "characterClass",
                value: "linefeed",
            },
        });
    });
    it("should handle verticalTab", () => {
        const testRegex = /\v/gs;
        const { flags, pattern } = getPatternAndFlags(testRegex);
        const currentChar = pattern[1];
        const nextChar = pattern[2];
        const index = 1;
        const unicodeMode = flags.includes("u");
        expect(
            handleEscapes({
                currentChar,
                inCharacterSet: true,
                index,
                nextChar,
                pattern,
                unicodeMode,
            })
        ).toEqual({
            index: index + 1,
            token: {
                quantifier: "exactlyOne",
                regex: "\\v",
                type: "characterClass",
                value: "verticalTab",
            },
        });
    });
    it("should handle formFeed", () => {
        const testRegex = /\f/gs;
        const { flags, pattern } = getPatternAndFlags(testRegex);
        const currentChar = pattern[1];
        const nextChar = pattern[2];
        const index = 1;
        const unicodeMode = flags.includes("u");
        expect(
            handleEscapes({
                currentChar,
                inCharacterSet: true,
                index,
                nextChar,
                pattern,
                unicodeMode,
            })
        ).toEqual({
            index: index + 1,
            token: {
                quantifier: "exactlyOne",
                regex: "\\f",
                type: "characterClass",
                value: "formFeed",
            },
        });
    });
    it("should handle nulCharacter", () => {
        const testRegex = /\0/gs;
        const { flags, pattern } = getPatternAndFlags(testRegex);
        const currentChar = pattern[1];
        const nextChar = pattern[2];
        const index = 1;
        const unicodeMode = flags.includes("u");
        expect(
            handleEscapes({
                currentChar,
                inCharacterSet: true,
                index,
                nextChar,
                pattern,
                unicodeMode,
            })
        ).toEqual({
            index: index + 1,
            token: {
                quantifier: "exactlyOne",
                regex: "\\0",
                type: "characterClass",
                value: "nulCharacter",
            },
        });
    });
    it("should handle control characters", () => {
        const testRegex = /\cA/gs;
        const { flags, pattern } = getPatternAndFlags(testRegex);
        const currentChar = pattern[1];
        const nextChar = pattern[2];
        const index = 1;
        const unicodeMode = flags.includes("u");
        expect(
            handleEscapes({
                currentChar,
                inCharacterSet: false,
                index,
                nextChar,
                pattern,
                unicodeMode,
            })
        ).toEqual({
            index: index + 2,
            token: {
                quantifier: "exactlyOne",
                regex: "\\cA",
                type: "controlCharacter",
                value: "startOfHeading",
            },
        });
    });
    it("should handle unicode", () => {
        const testRegex = /\u{12352}/gsu;
        const { flags, pattern } = getPatternAndFlags(testRegex);
        const currentChar = pattern[1];
        const nextChar = pattern[2];
        const index = 1;
        const unicodeMode = flags.includes("u");
        expect(
            handleEscapes({
                currentChar,
                inCharacterSet: false,
                index,
                nextChar,
                pattern,
                unicodeMode,
            })
        ).toEqual({
            index: index + 8,
            token: {
                quantifier: "exactlyOne",
                regex: "\\u{12352}",
                type: "unicodeExtended",
                value: "𒍒",
            },
        });
    });
    it("should treat everything else as an escaped character", () => {
        // eslint-disable-next-line no-useless-escape
        const testRegex = /\z/gs;
        const { flags, pattern } = getPatternAndFlags(testRegex);
        const currentChar = pattern[1];
        const nextChar = pattern[2];
        const index = 1;
        const unicodeMode = flags.includes("u");
        expect(
            handleEscapes({
                currentChar,
                inCharacterSet: false,
                index,
                nextChar,
                pattern,
                unicodeMode,
            })
        ).toEqual({
            index: index + 1,
            token: {
                quantifier: "exactlyOne",
                regex: `\\${pattern[index]}`,
                type: "element",
                value: pattern[index],
            },
        });
    });
});
