function getMinMax(string) {
    const [min, max] = string.split(",");
    return { max, min };
}
const isNumeric = (num) => (typeof(num) === "number" || typeof(num) === "string" && num.trim() !== "") && !isNaN(num);

const handleRange = (lastElement, betweenBraces, index) => {
    if (!lastElement || lastElement.quantifier !== "exactlyOne") {
        throw new Error(
            "Range must follow an unquantified element"
        );
    }
    const { min, max } = getMinMax(betweenBraces);
    if (!isNumeric(min)) {
        return {
            index: index + 1,
            token: {
                quantifier: "exactlyOne",
                regex: "{",
                type: "literal",
                value: "{"
            }
        };
    } else if (isNumeric(min) && isNumeric(max)) {
        lastElement.quantifier = `${min}to${max}`;
        lastElement.regex += `{${betweenBraces}}`;
        lastElement.value = `"${lastElement.value}" repeated at least ${min} times and no more than ${max} times`;
        return {index: index + betweenBraces.length + 1, };
    } else if (isNumeric(min) && max === "") {
        lastElement.quantifier = `atLeast${min}`;
        lastElement.regex += `{${betweenBraces}}`;
        lastElement.value = `"${lastElement.value}" repeated at least ${min} times`;
        return {index: index + betweenBraces.length + 1, };
    } else if (isNumeric(min) && max === undefined) {
        lastElement.quantifier = `exactly${min}`;
        lastElement.regex += `{${betweenBraces}}`;
        lastElement.value = `"${lastElement.value.repeat(min)}"`;
        return {index: index + betweenBraces.length + 1, };
    }
};

module.exports = {handleRange};
