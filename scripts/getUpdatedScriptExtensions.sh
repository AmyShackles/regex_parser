#!/bin/zsh

curl https://www.unicode.org/Public/UCD/latest/ucd/ScriptExtensions.txt | awk 'BEGIN {OFS="\t"}($1!="#" && $1!="\
" &&$4=="#") {print $1, $3}
($1!="#" && $1!="\
" &&$4!="#" &&$5=="#") {print $1, $3, $4}
($1!="#" && $1!="\
" &&$4!="#" &&$5!="#" &&$6=="#") {print $1, $3, $4, $5}
($1!="#" && $1!="\
" &&$4!="#" &&$5!="#" &&$6!="#" &&$7=="#") {print $1, $3, $4, $5, $6}
($1!="#" && $1!="\
" &&$4!="#" &&$5!="#" &&$6!="#" &&$7!="#" &&$8=="#") {print $1, $3, $4, $5, $6, $7}
($1!="#" && $1!="\
" &&$4!="#" &&$5!="#" &&$6!="#" &&$7!="#" &&$8!="#" &&$9=="#") {print $1, $3, $4, $5, $6, $7, $8}
($1!="#" && $1!="\
" &&$4!="#" &&$5!="#" &&$6!="#" &&$7!="#" &&$8!="#" &&$9!="#" &&$10=="#") {print $1, $3, $4, $5, $6, $7, $8, $9}
($1!="#" && $1!="\
" &&$4!="#" &&$5!="#" &&$6!="#" &&$7!="#" &&$8!="#" &&$9!="#" &&$10!="#" &&$11=="#") {print $1, $3, $4, $5, $6, $7, $8, $9, $10}
($1!="#" && $1!="\
" &&$4!="#" &&$5!="#" &&$6!="#" &&$7!="#" &&$8!="#" &&$9!="#" &&$10!="#" &&$11!="#" &&$12=="#") {print $1, $3, $4, $5, $6, $7, $8, $9, $10, $11}
($1!="#" && $1!="\
" &&$4!="#" &&$5!="#" &&$6!="#" &&$7!="#" &&$8!="#" &&$9!="#" &&$10!="#" &&$11!="#" &&$12!="#" &&$13=="#") {print $1, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12}
($1!="#" && $1!="\
" &&$4!="#" &&$5!="#" &&$6!="#" &&$7!="#" &&$8!="#" &&$9!="#" &&$10!="#" &&$11!="#" &&$12!="#" &&$13!="#" &&$14=="#") {print $1, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13}

($1!="#" && $1!="\
" &&$4!="#" &&$5!="#" &&$6!="#" &&$7!="#" &&$8!="#" &&$9!="#" &&$10!="#" &&$11!="#" &&$12!="#" &&$13!="#" &&$14!="#" &&$15=="#") {print $1, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14}
($1!="#" && $1!="\
" &&$4!="#" &&$5!="#" &&$6!="#" &&$7!="#" &&$8!="#" &&$9!="#" &&$10!="#" &&$11!="#" &&$12!="#" &&$13!="#" &&$14!="#" &&$15!="#" &&$16=="#") {print $1, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15}
($1!="#" && $1!="\
" &&$4!="#" &&$5!="#" &&$6!="#" &&$7!="#" &&$8!="#" &&$9!="#" &&$10!="#" &&$11!="#" &&$12!="#" &&$13!="#" &&$14!="#" &&$15!="#" &&$16!="#" &&$17=="#") {print $1, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16}
($1!="#" && $1!="\
" &&$4!="#" &&$5!="#" &&$6!="#" &&$7!="#" &&$8!="#" &&$9!="#" &&$10!="#" &&$11!="#" &&$12!="#" &&$13!="#" &&$14!="#" &&$15!="#" &&$16!="#" &&$17!="#" &&$18=="#") {print $1, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17}
($1!="#" && $1!="\
" &&$4!="#" &&$5!="#" &&$6!="#" &&$7!="#" &&$8!="#" &&$9!="#" &&$10!="#" &&$11!="#" &&$12!="#" &&$13!="#" &&$14!="#" &&$15!="#" &&$16!="#" &&$17!="#" &&$18!="#" &&$19=="#") {print $1, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18}
($1!="#" && $1!="\
" &&$4!="#" &&$5!="#" &&$6!="#" &&$7!="#" &&$8!="#" &&$9!="#" &&$10!="#" &&$11!="#" &&$12!="#" &&$13!="#" &&$14!="#" &&$15!="#" &&$16!="#" &&$17!="#" &&$18!="#" &&$19!="#" &&$20=="#") {print $1, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19}
($1!="#" && $1!="\
" &&$4!="#" &&$5!="#" &&$6!="#" &&$7!="#" &&$8!="#" &&$9!="#" &&$10!="#" &&$11!="#" &&$12!="#" &&$13!="#" &&$14!="#" &&$15!="#" &&$16!="#" &&$17!="#" &&$18!="#" &&$19!="#" &&$20!="#" &&$21=="#") {print $1, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20}
($1!="#" && $1!="\
" &&$4!="#" &&$5!="#" &&$6!="#" &&$7!="#" &&$8!="#" &&$9!="#" &&$10!="#" &&$11!="#" &&$12!="#" &&$13!="#" &&$14!="#" &&$15!="#" &&$16!="#" &&$17!="#" &&$18!="#" &&$19!="#" &&$20!="#" &&$21!="#" &&$22=="#") {print $1, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21}
($1!="#" && $1!="\
" &&$4!="#" &&$5!="#" &&$6!="#" &&$7!="#" &&$8!="#" &&$9!="#" &&$10!="#" &&$11!="#" &&$12!="#" &&$13!="#" &&$14!="#" &&$15!="#" &&$16!="#" &&$17!="#" &&$18!="#" &&$19!="#" &&$20!="#" &&$21!="#" &&$22!="#" &&$23=="#") {print $1, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22}
($1!="#" && $1!="\
" &&$4!="#" &&$5!="#" &&$6!="#" &&$7!="#" &&$8!="#" &&$9!="#" &&$10!="#" &&$11!="#" &&$12!="#" &&$13!="#" &&$14!="#" &&$15!="#" &&$16!="#" &&$17!="#" &&$18!="#" &&$19!="#" &&$20!="#" &&$21!="#" &&$22!="#" &&$23!="#" &&$24=="#") {print $1, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23}
($1!="#" && $1!="\
" &&$4!="#" &&$5!="#" &&$6!="#" &&$7!="#" &&$8!="#" &&$9!="#" &&$10!="#" &&$11!="#" &&$12!="#" &&$13!="#" &&$14!="#" &&$15!="#" &&$16!="#" &&$17!="#" &&$18!="#" &&$19!="#" &&$20!="#" &&$21!="#" &&$22!="#" &&$23!="#" &&$24!="#" &&$25=="#") {print $1, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24}
($1!="#" && $1!="\
" &&$4!="#" &&$5!="#" &&$6!="#" &&$7!="#" &&$8!="#" &&$9!="#" &&$10!="#" &&$11!="#" &&$12!="#" &&$13!="#" &&$14!="#" &&$15!="#" &&$16!="#" &&$17!="#" &&$18!="#" &&$19!="#" &&$20!="#" &&$21!="#" &&$22!="#" &&$23!="#" &&$24!="#" &&$25!="#" &&$26=="#") {print $1, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25}
($2=="Total"){gsub(/#/, "\/\/", $1); print $1, $5}' > ../src/utils/scriptExtensions.js

# After running this script, update ../utils/scriptExtensions.js by:

# Find ^([\w.]+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)
# Replace "$1": ["$2", "$3", "$4", "$5", "$6", "$7", "$8", "$9", "$10", "$11", "$12", "$13", "$14", "$15", "$16", "$17", "$18", "$19", "$20", "$21", "$22"],\n}

# Find ^([\w.]+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)
# Replace "$1": ["$2", "$3", "$4", "$5", "$6", "$7", "$8", "$9", "$10", "$11", "$12", "$13", "$14", "$15", "$16", "$17", "$18", "$19", "$20", "$21" ],

# Find ^([\w.]+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)
# Replace "$1": ["$2", "$3", "$4", "$5", "$6", "$7", "$8", "$9", "$10", "$11", "$12", "$13", "$14", "$15" ],

# Find ^([\w.]+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)
# Replace "$1": ["$2", "$3", "$4", "$5", "$6", "$7", "$8", "$9", "$10", "$11", "$12", "$13", "$14" ],

# Find ^([\w.]+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)
# Replace "$1": ["$2", "$3", "$4", "$5", "$6", "$7", "$8", "$9", "$10", "$11", "$12", "$13" ],

# Find ^([\w.]+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)
# Replace "$1": ["$2", "$3", "$4", "$5", "$6", "$7", "$8", "$9", "$10", "$11", "$12" ],

# Find ^([\w.]+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)
# Replace "$1": ["$2", "$3", "$4", "$5", "$6", "$7", "$8", "$9", "$10" ],

# Find ^([\w.]+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)
# Replace "$1": ["$2", "$3", "$4", "$5", "$6", "$7", "$8", "$9" ],

# Find ^([\w.]+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)
# Replace "$1": ["$2", "$3", "$4", "$5", "$6", "$7", "$8" ],

# Find ^([\w.]+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)
# Replace "$1": ["$2", "$3", "$4", "$5", "$6", "$7" ],

# Find ^([\w.]+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)
# Replace "$1": ["$2", "$3", "$4", "$5", "$6" ],

# Find ^([\w.]+)\t(\w+)\t(\w+)\t(\w+)\t(\w+)
# Replace "$1": ["$2", "$3", "$4", "$5" ],

# Find ^([\w.]+)\t(\w+)\t(\w+)\t(\w+)
# Replace 




# Find (?<!//\s\d?)([\w.]+)
# Replace "$1",
# Note: This will overgeneralize, so we're going to need to fix some things

# Find \t
# Replace (one space)

# Find ^("[\w.]+"),((?: "\w+",)+)
# Replace  $1: [ $2 ],

# Add "const ex = {" to start of file
# Add "}" to end of file
# Now you have an object!

# Add `const { getScriptExtensions } = require("./scriptHelpers")` to the top of the file
# Add ```const scriptExtensions = `module.exports = { scriptExtensions: \n\t${JSON.stringify(
#     getScriptExtensions(scriptObj),
#     undefined,
#     2
# )}\n}`;

# fs.writeFileSync(`./realScriptExtensions.js`, scriptExtensions, { flag: "a" });
# ``` to end of file
# Run the file using `node ../src/utils/scriptExtensions.js`
# Copy contents of realScriptExtensions.js and replace contents of ../src/utils/scriptExtensions.js with it