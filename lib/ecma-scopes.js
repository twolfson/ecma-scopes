// Good starting point
// https://github.com/Constellation/esutils/blob/1.1.4/lib/ast.js#L64-L88
// Docs https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API
module.exports = {
  // https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API#Functions
  "lexical": [
    // TODO: Should `Program` be lexical scoping?
    "FunctionDeclaration", // function a() {}
    "FunctionExpression", // var a = function () {}
    // TODO: What do we do about the documented ArrowExpression?
    "ArrowFunctionExpression", // var a = () ->
    // "SequenceExpression", // var a = () =>
    // TODO: Does this cover `GeneratorExpression`?
    // TODO: Does this cover `GraphExpression`?
  ],
  "block": [
    // TODO: What about statements without braces?
    "BlockStatement",
    // TODO: Can a `let` exist inside of an `if`?
    // TODO: If not, then we should limit this to `Expression`
    // "IfStatement",
    // TODO: Do labels have block scoping?
    // "LabeledStatement",
    // TODO: Verify `with` isn't lexical
    // "WithStatement",
    // TODO: Can a `let` exist inside of a `switch`?
    // TODO: If not, then we should limit this to `Expression`
    // TODO: What about those "unnested" vars they mention
    // "SwitchStatement"
    "TryStatement",
    // TODO: Don't forget about catch and finally
    // TODO: Can a `let` exist inside of an `while`?
    // TODO: If not, then we should limit this to `Statement` (body)
    "WhileStatement",
    // Yep, `init` can contain a `VariableDeclaration`
    // TODO: I wonder if it can contain both a `let` and a `var`
    "DoWhileStatement",
    "ForStatement",
    "ForInStatement",
    "ForOfStatement",
    "SwitchCase",
    "CatchClause",
    // TODO: I am not sure entirely what this is...
    "ComprehensionBlock"
  ]
};
