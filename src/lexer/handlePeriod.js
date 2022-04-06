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
        };
    }
    return {
        quantifier: "exactlyOne",
        regex: ".",
        type: "dot",
    };
};

module.exports = { handlePeriod };
