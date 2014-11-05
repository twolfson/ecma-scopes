function main() {
  var lexical = 'hello';
}
if (typeof lexical !== 'undefined') {
  throw new Error('"Function" is not lexical');
}
