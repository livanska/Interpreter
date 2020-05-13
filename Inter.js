function lexer(input)
{
    var tokens = [], c, i = 0;
    var input = document.getElementById("code").value;
    var advance = function () { return c = input[++i]; };
    var addToken = function (type, value) {
  tokens.push({
    type: type,
    value: value
 });
};
while (i < input.length) {
  c = input[i];
  if (isWhiteSpace(c)) advance();
  else if (isKeyword(c)) {
    addToken("operator", c);
    advance();}
else if (isDigit(c)) {
        var num = c;
        while (isDigit(advance())) num += c;
        if (c === ".") {
          do num += c; while (isDigit(advance()));
        }
        num = parseFloat(num);
        if (!isFinite(num)) throw "Number is too large or too small for a 64-bit double.";
        addToken("number", num);
      }
      else if (isIdentifier(c)) {
        var idn = c;
        while (isIdentifier(advance())) idn += c;
        addToken("keyword", idn);
        
      }
      else throw "Unrecognized token."; 
  }
  addToken("(end)");
  console.log(tokens)
}
var isKeyword = function (c) { return /[+\-*\/\^%=(),]/.test(c); },
  isDigit = function (c) { return /[0-9]/.test(c); },
  isWhiteSpace = function (c) { return /\s/.test(c); },
  isIdentifier = function (c) 
   { return typeof c === "string" && !isKeyword(c) && !isDigit(c) && !isWhiteSpace(c); };
   