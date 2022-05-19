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
        return {
            index: index + betweenBraces.length + 1,
            token: {
                quantifier: "exactlyOne",
                regex: `{${betweenBraces}}`,
                type: "range",
                value: `${min}to${max}`
            }
        };
    } else if (isNumeric(min) && max === "") {
        lastElement.quantifier = `atLeast${min}`;
        return {
            index: index + betweenBraces.length + 1,
            token: {
                quantifier: "exactlyOne",
                regex: `{${betweenBraces}}`,
                type: "range",
                value: `atLeast${min}`
            }
        };
    } else if (isNumeric(min) && max === undefined) {
        lastElement.quantifier = `exactly${min}`;
        return {
            index: index + betweenBraces.length + 1,
            token: {
                quantifier: "exactlyOne",
                regex: `{${betweenBraces}}`,
                type: "range",
                value: `exactly${min}`
            }
        };
    }
};

/*
function parseRange(min, max) {

    if (isNumeric(min) && isNumeric(max)) {
        return `${min} to ${max}`
    } else if (isNumeric(min) && max === '') {
        return `at least ${min}`
    } else if (isNumeric(min) && max === undefined) {
        return `exactly ${min}`
    } else {
        throw new Error("Invalid range");
    }
}
*/

module.exports = {handleRange};
