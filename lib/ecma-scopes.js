// Good starting point
// https://github.com/Constellation/esutils/blob/1.1.4/lib/ast.js#L64-L88
// Docs https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API
// Output syntax keys https://github.com/facebook/esprima/blob/7001.0001.0000-dev-harmony-fb/esprima.js#L127-L212
module.exports = {
  // https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API#Functions
  "lexical": [
    "FunctionDeclaration", // function a() {}
    "FunctionExpression", // var a = function () {}
    // DEV: In `esprima-fb`, `ArrowExpression` is `ArrowFunctionExpression`
    "ArrowFunctionExpression" // var a = () =>
  ],
  "block": [
    // TODO: Upon completion, double check VariableDeclaration
    "BlockStatement",
    "ForStatement",
    "ForInStatement",
    // "ForOfStatement",
    // "SwitchCase",
    // TODO: Do we want the block or the entire expression? `ComprehensionExpression`
    // TODO: If we want `ComprehensionExpression`, then also support `GeneratorExpression`
    // "ComprehensionBlock"
  ]
};

