const handleKleeneStar = (lastElement, nextChar, index) => {
    if (!lastElement || lastElement.quantifier !== "exactlyOne") {
        throw new Error(
            "Quantifier must follow an unquantified element"
        );
    }
    lastElement.quantifier = "zeroOrMore";
    lastElement.regex += "*";
    index++;
    if (nextChar === "?") {
        lastElement.quantifier += "-lazy";
        lastElement.regex += "?";
        index++;
    }
    return index;
};

module.exports = { handleKleeneStar };
