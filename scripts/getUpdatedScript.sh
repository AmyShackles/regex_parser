#!/bin/zsh

curl https://www.unicode.org/Public/UCD/latest/ucd/Scripts.txt | awk 'BEGIN {OFS="\t"}($1!="#" && $1!="\
") {print $1, $3} ($2=="Total"){gsub(/#/, "\/\/", $1); print $1, $5}' > ../src/utils/scripts.js

# After running this script, update ../utils/scripts.js by:

# Find/replace to move the name of the script to the comment line with the total Find: \t(\w+)\n\/\/\t(\d+) Replace: \n//\t$2 $1

# Find/replace to remove script names from every other line. Find: (?<=\w)\t\w+ Replace: ``

# Find/replace to surround each script's codepoints with an object key set to the name of the script.  Find: ((^.*\n)+?)(\/\/\t\d+ (\w+)) Replace: $4: [\n$1],\n$3,\n

# Find/replace to turn ranges into an array with the first codepoint as the first element and last codepoint as second.   Find: ((\w+)\.\.(\w+)) Replace: ["$2", "$3"],

# Find/replace to convert individual codepoints to strings Find: ^(\w+)$ Replace: "$1",

# Add const fs = require("fs") to top of file
# Add const { getScripts } = require("./scriptHelpers.js") to top of file

# Add ```const scripts = `module.exports = { scripts: \n\t${JSON.stringify(
#     getScripts(scriptObj),
#     undefined,
#     2
# )}\n}`;

# fs.writeFileSync(`./real_scripts.js`, scripts, { flag: "a" });
# ``` to end of file
# Run file with node scripts.js
# Copy contents of real_scripts.js and replace contents of ../src/utils/scripts.js with it