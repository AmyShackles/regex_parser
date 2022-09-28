## Regex Rules

#### Reference:
- `h`: refers to a hexadecimal value
- `X`: refers to a character between A and Z
- <sup>*</sup>: only if `unicode` flag is set

#### Outside a character set
- Characters that need to be escaped to be matched literally are: `[` `\` `^` `$` `.` `|` `?` `*` `+` `(` `)`
- `|` character means alternation and acts like a boolean OR between the expresison before it and the expression after
- Valid character classes:
    - `\x` - backreference
    - `\b` - word boundary
    - `\B` - non-word boundary
    - `\f` - form feed
    - `\n` - linefeed
    - `\r` - carriage return
    - `\t` - horizontal tab
    - `\v` - vertical tab
    - `\d` - adds all digits
    - `\D` - adds all nondigits
    - `\s` - adds all whitespace
    - `\S` - adds all non-whitespace
    - `\w` - adds all word characters
    - `\W` - adds all non-word characters
    - `\0` - null character
    - `\cX` - caret notation
    - `\k<name>` - named backreference
    - `\xhh` - character with code `hh`
    - `\uhhhh` - character with value `hhhh`
    - `\u{hhhh}` - character with value `hhhh` *<sup>*</sup>*
    -  `\u{hhhhh}` - character with value `hhhhh`*<sup>*</sup>*
    - `\p{UnicodePropertyValue}` - character matching property value
*<sup>*</sup>*
    - `\p{UnicodePropertyName=UnicodePropertyValue}` - character with property name equaling property value *<sup>*</sup>*
    - `\P{UnicodePropertyValue}` - character _**not**_ matching property value *<sup>*</sup>*
    - `\P{UnicodePropertyName=UnicodePropertyValue}`character _**not**_ with property name equaling property value *<sup>*</sup>*

#### Inside a character set
- `^` has a special meaning at the start of a character set (negation)
- Characters that need to be escaped are: `]` `^` `-` `\`
- Characters that do not need to be escaped in character sets that usually do: 
    - `[`
    - `$`
    - `.`
    - `|`
    - `*`
    - `+`
    - `?`
    - `(`
    - `)`
- Character sets are not supported
- Alternations are not supported
- Quantifiers are not supported
- Parentheses do not have special meaning
- Backreferences are not supported
- A hyphen between two tokens that each specify a single character represents a range of characters if the first character has a character code less than the second character
- Valid character classes
    - `\b` - backspace
    - `\f` - form feed
    - `\n` - linefeed
    - `\r` - carriage return
    - `\t` - horizontal tab
    - `\v` - vertical tab
    - `\d` - adds all digits
    - `\D` - adds all nondigits
    - `\s` - adds all whitespace
    - `\S` - adds all non-whitespace
    - `\w` - adds all word characters
    - `\W` - adds all non-word characters
    - `\0` - null character
    - `\cX` - caret notation
    - `\xhh` - character with code `hh`
    - `\uhhhh` - character with value `hhhh`
    - `\u{hhhh}` - character with value `hhhh` *<sup>*</sup>*
    -  `\u{hhhhh}` - character with value `hhhhh`*<sup>*</sup>*
    - `\p{UnicodePropertyValue}` - character matching property value
*<sup>*</sup>*
    - `\p{UnicodePropertyName=UnicodePropertyValue}` - character with property name equaling property value *<sup>*</sup>*
    - `\P{UnicodePropertyValue}` - character _**not**_ matching property value *<sup>*</sup>*
    - `\P{UnicodePropertyName=UnicodePropertyValue}`character _**not**_ with property name equaling property value *<sup>*</sup>*