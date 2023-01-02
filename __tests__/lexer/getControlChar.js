const { getControlChar } = require("../../src/lexer/getControlChar.js");

describe("getControlChar", () => {
    test("should return the appropriate control character", () => {
        expect(getControlChar("a")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\ca",
            type: "controlCharacter",
            value: "startOfHeading"
        });
        expect(getControlChar("A")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\cA",
            type: "controlCharacter",
            value: "startOfHeading"
        });
        expect(getControlChar("b")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\cb",
            type: "controlCharacter",
            value: "startOfText"
        });
        expect(getControlChar("B")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\cB",
            type: "controlCharacter",
            value: "startOfText"
        });
        expect(getControlChar("c")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\cc",
            type: "controlCharacter",
            value: "endOfText"
        });
        expect(getControlChar("C")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\cC",
            type: "controlCharacter",
            value: "endOfText"
        });
        expect(getControlChar("d")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\cd",
            type: "controlCharacter",
            value: "endOfTransmit"
        });
        expect(getControlChar("D")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\cD",
            type: "controlCharacter",
            value: "endOfTransmit"
        });
        expect(getControlChar("e")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\ce",
            type: "controlCharacter",
            value: "enquiry"
        });
        expect(getControlChar("E")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\cE",
            type: "controlCharacter",
            value: "enquiry"
        });
        expect(getControlChar("f")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\cf",
            type: "controlCharacter",
            value: "acknowledge"
        });
        expect(getControlChar("F")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\cF",
            type: "controlCharacter",
            value: "acknowledge"
        });
        expect(getControlChar("g")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\cg",
            type: "controlCharacter",
            value: "bell"
        });
        expect(getControlChar("G")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\cG",
            type: "controlCharacter",
            value: "bell"
        });
        expect(getControlChar("h")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\ch",
            type: "controlCharacter",
            value: "backspace"
        });
        expect(getControlChar("H")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\cH",
            type: "controlCharacter",
            value: "backspace"
        });
        expect(getControlChar("i")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\ci",
            type: "controlCharacter",
            value: "horizontalTab"
        });
        expect(getControlChar("I")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\cI",
            type: "controlCharacter",
            value: "horizontalTab"
        });
        expect(getControlChar("j")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\cj",
            type: "controlCharacter",
            value: "lineFeed"
        });
        expect(getControlChar("J")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\cJ",
            type: "controlCharacter",
            value: "lineFeed"
        });
        expect(getControlChar("k")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\ck",
            type: "controlCharacter",
            value: "verticalTab"
        });
        expect(getControlChar("K")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\cK",
            type: "controlCharacter",
            value: "verticalTab"
        });
        expect(getControlChar("l")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\cl",
            type: "controlCharacter",
            value: "formFeed"
        });
        expect(getControlChar("L")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\cL",
            type: "controlCharacter",
            value: "formFeed"
        });
        expect(getControlChar("m")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\cm",
            type: "controlCharacter",
            value: "carriageReturn"
        });
        expect(getControlChar("M")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\cM",
            type: "controlCharacter",
            value: "carriageReturn"
        });
        expect(getControlChar("n")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\cn",
            type: "controlCharacter",
            value: "shiftOut"
        });
        expect(getControlChar("N")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\cN",
            type: "controlCharacter",
            value: "shiftOut"
        });
        expect(getControlChar("o")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\co",
            type: "controlCharacter",
            value: "shiftIn"
        });
        expect(getControlChar("O")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\cO",
            type: "controlCharacter",
            value: "shiftIn"
        });
        expect(getControlChar("p")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\cp",
            type: "controlCharacter",
            value: "dataLineEscape"
        });
        expect(getControlChar("P")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\cP",
            type: "controlCharacter",
            value: "dataLineEscape"
        });
        expect(getControlChar("q")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\cq",
            type: "controlCharacter",
            value: "deviceControl1"
        });
        expect(getControlChar("Q")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\cQ",
            type: "controlCharacter",
            value: "deviceControl1"
        });
        expect(getControlChar("r")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\cr",
            type: "controlCharacter",
            value: "deviceControl2"
        });
        expect(getControlChar("R")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\cR",
            type: "controlCharacter",
            value: "deviceControl2"
        });
        expect(getControlChar("s")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\cs",
            type: "controlCharacter",
            value: "deviceControl3"
        });
        expect(getControlChar("S")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\cS",
            type: "controlCharacter",
            value: "deviceControl3"
        });
        expect(getControlChar("t")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\ct",
            type: "controlCharacter",
            value: "deviceControl4"
        });
        expect(getControlChar("T")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\cT",
            type: "controlCharacter",
            value: "deviceControl4"
        });
        expect(getControlChar("u")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\cu",
            type: "controlCharacter",
            value: "negativeAcknowledge"
        });
        expect(getControlChar("U")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\cU",
            type: "controlCharacter",
            value: "negativeAcknowledge"
        });
        expect(getControlChar("v")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\cv",
            type: "controlCharacter",
            value: "synchronousIdle"
        });
        expect(getControlChar("V")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\cV",
            type: "controlCharacter",
            value: "synchronousIdle"
        });
        expect(getControlChar("w")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\cw",
            type: "controlCharacter",
            value: "endOfTransmitBlock"
        });
        expect(getControlChar("W")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\cW",
            type: "controlCharacter",
            value: "endOfTransmitBlock"
        });
        expect(getControlChar("x")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\cx",
            type: "controlCharacter",
            value: "cancel"
        });
        expect(getControlChar("X")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\cX",
            type: "controlCharacter",
            value: "cancel"
        });
        expect(getControlChar("y")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\cy",
            type: "controlCharacter",
            value: "endOfMedium"
        });
        expect(getControlChar("Y")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\cY",
            type: "controlCharacter",
            value: "endOfMedium"
        });
        expect(getControlChar("z")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\cz",
            type: "controlCharacter",
            value: "substitute"
        });
        expect(getControlChar("Z")).toEqual({
            quantifier: "exactlyOne",
            regex: "\\cZ",
            type: "controlCharacter",
            value: "substitute"
        });
    });
    test("should return values as literals if not control character", () => {
        expect(getControlChar("7")).toEqual(
            [
                {
                    quantifier: "exactlyOne",
                    regex: "\\",
                    type: "literal",
                    value: "\\",
                },
                {
                    quantifier: "exactlyOne",
                    regex: "\\",
                    type: "literal",
                    value: "\\",
                },
                {
                    quantifier: "exactlyOne",
                    regex: "c",
                    type: "literal",
                    value: "c",
                }
            ]
        );
    });
});
