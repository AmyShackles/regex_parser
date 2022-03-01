const range = (start, stop, step) =>
    Array.from(
        { length: (stop - start) / step + 1 },
        (_, i) => start + i * step
    );

function getRangeFromString(string) {
    if (string.match(/\.\./)) {
        const [, start, stop] = string.match(/(\w+)\.\.(\w+)/);
        return range(parseInt(start, 16), parseInt(stop, 16), 1).map((a) =>
            a.toString(16).padStart(4, "0").toUpperCase()
        );
    }
    return string;
}

function getRangeFromArray([start, stop]) {
    return range(parseInt(start, 16), parseInt(stop, 16), 1).map((a) =>
        a.toString(16).padStart(4, "0").toUpperCase()
    );
}

function sortObject(obj) {
    const collator = new Intl.Collator(undefined, {
        numeric: true,
        sensitivity: "base",
    });

    return Object.keys(obj)
        .sort(collator.compare)
        .reduce(function (result, key) {
            result[key] = obj[key];
            return result;
        }, {});
}

function getScriptExtensions(ex) {
    let script_extensions = {};
    Object.entries(ex).forEach(([key, value]) => {
        let codepoints;
        if (key.match(/\.\./)) codepoints = getRangeFromString(key);
        for (const se of value) {
            if (script_extensions[se]) {
                if (codepoints) script_extensions[se].push(...codepoints);
                else script_extensions[se].push(key);
                script_extensions[se].sort(
                    (a, b) => parseInt(a, 16) - parseInt(b, 16)
                );
            } else {
                if (codepoints) script_extensions[se] = [...codepoints];
                else script_extensions[se] = [key];
            }
        }
    });
    return sortObject(script_extensions);
}

function getScripts(scriptObj) {
    let scripts = {};
    Object.entries(scriptObj).forEach(([key, value]) => {
        let currentArr = [];
        for (const val of value) {
            if (Array.isArray(val)) {
                currentArr.push(...getRangeFromArray(val));
            } else {
                currentArr.push(val);
            }
        }
        scripts[key] = currentArr;
    });
    return sortObject(scripts);
}

module.exports = { getScriptExtensions, getScripts };
