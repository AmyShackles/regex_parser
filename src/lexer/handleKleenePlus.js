const handleKleenePlus = (lastElement, nextChar, index) => {
    if (!lastElement || lastElement.quantifier !== "exactlyOne") {
        throw new Error(
            `Quantifier must follow an unquantified element, but last element was ${JSON.stringify(lastElement, null, 2)} at index ${index}\n`
        );
    }
    lastElement.quantifier = "oneOrMore";
    lastElement.regex += "+";
    index++;
    if (nextChar === "?") {
        lastElement.quantifier += "-lazy";
        lastElement.regex += "?";
        index++;
    }
    return index;
};

module.exports = { handleKleenePlus };
