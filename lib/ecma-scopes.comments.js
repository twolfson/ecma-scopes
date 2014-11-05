// We used SpiderMonkey documentation and `esprima-fb's` code for references
//   https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API
//   https://github.com/facebook/esprima/blob/7001.0001.0000-dev-harmony-fb/esprima.js#L127-L212
module.exports = {
  // https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API#Functions
  "lexical": [
    "FunctionDeclaration", // function a() {}
    "FunctionExpression", // var a = function () {}
    // DEV: In `esprima-fb`, `ArrowExpression` is `ArrowFunctionExpression`
    "ArrowFunctionExpression" // var a = () =>
  ],
  // https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API#Statements
  "block": [
    "BlockStatement", // { /* code goes here */ }
    "ForStatement", // for (let i = 0; i < 10; i++) ;
    "ForInStatement", // for (let key in obj) ;
    "ForOfStatement", // for (let val in arr) ;
    // DEV: We aren't sure that this is `block` scope but we aren't sure what to call it...
    "ComprehensionBlock" // [val for (val of arr)]
  ]
};

