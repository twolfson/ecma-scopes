// Load in dependencies
var esprima = require('esprima-fb');

// We used SpiderMonkey documentation and `esprima-fb's` code for references
//   https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API
//   https://github.com/facebook/esprima/blob/7001.0001.0000-dev-harmony-fb/esprima.js#L127-L212
module.exports = {
  // https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API#Functions
  lexical: [
    esprima.Syntax.FunctionDeclaration, // function a() {}
    esprima.Syntax.FunctionExpression, // var a = function () {}
    // DEV: In `esprima-fb`, `ArrowExpression` is `ArrowFunctionExpression`
    esprima.Syntax.ArrowFunctionExpression // var a = () =>
  ],
  // https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API#Statements
  block: [
    esprima.Syntax.BlockStatement, // { /* code goes here */ }
    esprima.Syntax.ForStatement, // for (let i = 0; i < 10; i++) ;
    esprima.Syntax.ForInStatement, // for (let key in obj) ;
    esprima.Syntax.ForOfStatement, // for (let val in arr) ;
    // DEV: We aren't sure that this is `block` scope but we aren't sure what to call it...
    esprima.Syntax.ComprehensionBlock // [val for (val of arr)]
  ]
};
