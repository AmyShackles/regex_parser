const getControlChar = (controlChar) => {
    switch (controlChar) {
        case "a":
        case "A":
            return {
                quantifier: "exactlyOne",
                regex: `\\c${controlChar}`,
                type: "controlCharacter",
                value: "startOfHeading",
            };
        case "b":
        case "B":
            return {
                quantifier: "exactlyOne",
                regex: `\\c${controlChar}`,
                type: "controlCharacter",
                value: "startOfText",
            };
        case "c":
        case "C":
            return {
                quantifier: "exactlyOne",
                regex: `\\c${controlChar}`,
                type: "controlCharacter",
                value: "endOfText",
            };
        case "d":
        case "D":
            return {
                quantifier: "exactlyOne",
                regex: `\\c${controlChar}`,
                type: "controlCharacter",
                value: "endOfTransmit",
            };
        case "e":
        case "E":
            return {
                quantifier: "exactlyOne",
                regex: `\\c${controlChar}`,
                type: "controlCharacter",
                value: "enquiry",
            };
        case "f":
        case "F":
            return {
                quantifier: "exactlyOne",
                regex: `\\c${controlChar}`,
                type: "controlCharacter",
                value: "acknowledge",
            };
        case "g":
        case "G":
            return {
                quantifier: "exactlyOne",
                regex: `\\c${controlChar}`,
                type: "controlCharacter",
                value: "bell",
            };
        case "h":
        case "H":
            return {
                quantifier: "exactlyOne",
                regex: `\\c${controlChar}`,
                type: "controlCharacter",
                value: "backspace",
            };
        case "i":
        case "I":
            return {
                quantifier: "exactlyOne",
                regex: `\\c${controlChar}`,
                type: "controlCharacter",
                value: "horizontalTab",
            };
        case "j":
        case "J":
            return {
                quantifier: "exactlyOne",
                regex: `\\c${controlChar}`,
                type: "controlCharacter",
                value: "lineFeed",
            };
        case "k":
        case "K":
            return {
                quantifier: "exactlyOne",
                regex: `\\c${controlChar}`,
                type: "controlCharacter",
                value: "verticalTab",
            };
        case "l":
        case "L":
            return {
                quantifier: "exactlyOne",
                regex: `\\c${controlChar}`,
                type: "controlCharacter",
                value: "formFeed",
            };
        case "m":
        case "M":
            return {
                quantifier: "exactlyOne",
                regex: `\\c${controlChar}`,
                type: "controlCharacter",
                value: "carriageReturn",
            };
        case "n":
        case "N":
            return {
                quantifier: "exactlyOne",
                regex: `\\c${controlChar}`,
                type: "controlCharacter",
                value: "shiftOut",
            };
        case "o":
        case "O":
            return {
                quantifier: "exactlyOne",
                regex: `\\c${controlChar}`,
                type: "controlCharacter",
                value: "shiftIn",
            };
        case "p":
        case "P":
            return {
                quantifier: "exactlyOne",
                regex: `\\c${controlChar}`,
                type: "controlCharacter",
                value: "dataLineEscape",
            };
        case "q":
        case "Q":
            return {
                quantifier: "exactlyOne",
                regex: `\\c${controlChar}`,
                type: "controlCharacter",
                value: "deviceControl1",
            };
        case "r":
        case "R":
            return {
                quantifier: "exactlyOne",
                regex: `\\c${controlChar}`,
                type: "controlCharacter",
                value: "deviceControl2",
            };
        case "s":
        case "S":
            return {
                quantifier: "exactlyOne",
                regex: `\\c${controlChar}`,
                type: "controlCharacter",
                value: "deviceControl3",
            };
        case "t":
        case "T":
            return {
                quantifier: "exactlyOne",
                regex: `\\c${controlChar}`,
                type: "controlCharacter",
                value: "deviceControl4",
            };
        case "u":
        case "U":
            return {
                quantifier: "exactlyOne",
                regex: `\\c${controlChar}`,
                type: "controlCharacter",
                value: "negativeAcknowledge",
            };
        case "v":
        case "V":
            return {
                quantifier: "exactlyOne",
                regex: `\\c${controlChar}`,
                type: "controlCharacter",
                value: "synchronousIdle",
            };
        case "w":
        case "W":
            return {
                quantifier: "exactlyOne",
                regex: `\\c${controlChar}`,
                type: "controlCharacter",
                value: "endOfTransmitBlock",
            };
        case "x":
        case "X":
            return {
                quantifier: "exactlyOne",
                regex: `\\c${controlChar}`,
                type: "controlCharacter",
                value: "cancel",
            };
        case "y":
        case "Y":
            return {
                quantifier: "exactlyOne",
                regex: `\\c${controlChar}`,
                type: "controlCharacter",
                value: "endOfMedium",
            };
        case "z":
        case "Z":
            return {
                quantifier: "exactlyOne",
                regex: `\\c${controlChar}`,
                type: "controlCharacter",
                value: "substitute",
            };
        // Control characters only include
        // \ca - \cz (case insensitive)
        // So if the value after c is anything else,
        // Match a backslash and c literally
        default: {
            return (
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
                    },
                ]
            );
        }
    }
};

module.exports = { getControlChar };
