// Load in dependencies
var fs = require('fs');
var vm = require('vm');
var astw = require('astw');
var expect = require('chai').expect;
var ecmaScopes = require('../');

// TODO: Rename this file to lexical tests

// Define test utilities
var testUtils = {
  loadScript: function (filepath) {
    before(function loadScriptFn () {
      // Load our script and parse its AST
      this.script = fs.readFileSync(filepath, 'utf8');
      this.walker = astw(this.script);
    });
    before(function openVmFn () {
      // Load our file into the VM
      this.vm = {};
      vm.runInNewContext(this.script, this.vm);
    });
    after(function cleanup () {
      // Clean up the script and vm
      delete this.script;
      delete this.walker;
      delete this.vm;
    });
  }
};

// Define our tests
describe('ecma-scopes\' lexical scopes:', function () {
  // TODO: Load from JSON, convert to dash-case, and load file
  // TODO: Then iterate in a `forEach` loop
  ecmaScopes.lexical.forEach(function testLexicalCase (type, typeIndex) {
    describe('a "' + type + '"', function () {
      // Resolve and load our scope file
      // e.g. `test-files/lexical-FunctionDeclaration.js`
      var filepath = __dirname + '/test-files/lexical-' + type + '.js';
      testUtils.loadScript(filepath);

      // Collect the parents for analysis within the lexical scope
      before(function collectParents () {
        // TODO: Is there a cleaner way to do this?
        var parents = this.parents = [];
        this.walker(function evaluateNode (node) {
          // If we have already hit our lexical container, stop
          if (parents.length !== 0) {
            return;
          }

          // If the node is an Identifier and `lexical`
          if (node.type === 'Identifier' && node.name === 'lexical') {
            // Walk its parents until we resolve a function
            node = node.parent;
            while (node) {
              // Save the parent node
              parents.push(node);

              // If the node is our type, stop
              if (node.type === type) {
                return;
              }

              // Resolve the next parent node
              node = node.parent;
            }
          }
        });
      });

      it('is a lexical scope', function () {
        expect(this.vm).to.not.have.ownProperty('lexical');
      });

      it('contains `lexical` inside of a "' + type + '"', function () {
        var container = this.parents[this.parents.length - 1];
        expect(container.type).to.equal(type);
      });

      // TODO: For `block` scoping, we need a clarifier for lexical and other block scopes
      it('does not contain `lexical` inside of other lexical scopes', function () {
        // TODO: We need our JSON to be done for this to work
        // Collect the other lexical scopes
        var otherLexicalScopes = ecmaScopes.lexical.slice();
        otherLexicalScopes.splice(typeIndex, 1);

        // Verify each of the nodes is not in there
        this.parents.forEach(function assertNotOtherLexical (parent) {
          expect(parent.type).to.not.equal(undefined);
          expect(otherLexicalScopes).to.not.contain(parent.type);
        });
      });
    });
  });
});
