// Load our dependencies
var fs = require('fs');
var vm = require('vm');
var astw = require('astw');
var esprima = require('esprima-fb');

// Define unrunnable scopes (e.g. arrow functions)
exports.unrunnableScopes = [
  'ArrowFunctionExpression',
  'ForOfStatement'
];

// Define script utilities
exports.loadScript = function (filepath) {
  before(function loadScriptFn () {
    // Load our script and parse its AST
    this.script = fs.readFileSync(filepath, 'utf8');
    this.ast = esprima.parse(this.script);
    this.walker = astw(this.ast);
  });
  after(function cleanup () {
    // Clean up the script and AST
    delete this.script;
    delete this.ast;
    delete this.walker;
  });
};

exports.runVm = function () {
  before(function openVmFn () {
    // Load our file into the VM
    this.vm = {};
    vm.runInNewContext(this.script, this.vm);
  });
  after(function cleanup () {
    // Clean up the vm
    delete this.vm;
  });
};

exports.load = function (filepath, type) {
  exports.loadScript(filepath);
  if (exports.unrunnableScopes.indexOf(type) === -1) {
    exports.runVm();
  }
};
