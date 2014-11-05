// Load in dependencies
var fs = require('fs');
var vm = require('vm');
var astw = require('astw');
var expect = require('chai').expect;

// Define test utilities
var testUtils = {
  loadScript: function (filepath) {
    before(function loadScriptFn () {
      // Load our script and parse its AST
      this.script = fs.readFileSync(filepath, 'utf8');
      this.ast = esprima.parse(this.script);
    });
    before(function openVmFn () {
      // Load our file into the VM
      this.vm = {};
      vm.runInNewContext(this.script, this.vm);
    });
    after(function cleanup () {
      // Clean up the script and vm
      delete this.script;
      delete this.ast;
      delete this.vm;
    });
  }
};

// Define our tests
describe('ecma-scopes\' lexical scopes:', function () {
  // TODO: Load from JSON, convert to dash-case, and load file
  // TODO: Then iterate in a `forEach` loop
  describe('a "' + 'Function' + '"', function () {
    testUtils.loadScript(__dirname + '/test-files/lexical-function.js');

    it('is a lexical scope', function () {
      expect(this.vm.hasOwnProperty('lexical')).to.equal(false);
    });

    it('contains `lexical` inside of a "Function"', function () {

    });

    // TODO: For `block` scoping, we need a clarifier for lexical and other block scopes
    it.skip('does not contain `lexical` inside of other lexical scopes', function () {

    });
  });
});
