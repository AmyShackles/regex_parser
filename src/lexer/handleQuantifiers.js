const handleQuantifiers = (quantifier, lastElement, nextChar, index) => {
    if (!lastElement || lastElement.quantifier !== "exactlyOne") {
        throw new Error(
            `Quantifier must follow an unquantified element, but last element was ${JSON.stringify(lastElement, null, 2)} at index ${index}\n`
        );
    }
    if (quantifier === "*") {
        lastElement.quantifier = "zeroOrMore";
        lastElement.regex += "*";
    } else if (quantifier === "+") {
        lastElement.quantifier = "oneOrMore";
        lastElement.regex += "+";
    } else if (quantifier === "?") {
        lastElement.quantifier = "zeroOrOne";
        lastElement.regex += "?";
    }
    index++;
    if (nextChar === "?") {
        lastElement.quantifier += "-lazy";
        lastElement.regex += "?";
        index++;
    }
    return index;
};

module.exports = { handleQuantifiers };
