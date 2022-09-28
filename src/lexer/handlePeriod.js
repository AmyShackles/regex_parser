const handlePeriod = (dotAll, index, literalDots) => {
    if (literalDots.includes(index)) {
        return {
            quantifier: "exactlyOne",
            regex: ".",
            type: "literal",
            value: ".",
        
        };
    };
    if (dotAll) {
        return {
            quantifier: "exactlyOne",
            regex: ".",
            type: "dotAll",
            value: "character (including line breaks)"
        };
    }
    return {
        quantifier: "exactlyOne",
        regex: ".",
        type: "dot",
        value: "character (not including line breaks)"
    };
};

module.exports = { handlePeriod };
