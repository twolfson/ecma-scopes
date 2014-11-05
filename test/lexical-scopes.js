// Load in dependencies
var expect = require('chai').expect;
var ecmaScopes = require('../');
var scriptUtils = require('./utils/script');

// Define our tests
describe('ecma-scopes\' lexical scopes:', function () {
  ecmaScopes.lexical = ecmaScopes.lexical.slice(-1);
  ecmaScopes.lexical.forEach(function testLexicalCase (type, typeIndex) {
    describe('a/an "' + type + '"', function () {
      // Resolve and load our scope file
      // e.g. `test-files/lexical-FunctionDeclaration.js`
      var filepath = __dirname + '/test-files/lexical-' + type + '.js';
      scriptUtils.load(filepath, type);

      // Collect the parents for analysis within the lexical scope
      before(function collectParents () {
        // TODO: Is there a cleaner way to do this?
        // Find closest identifier to `root`
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

      if (scriptUtils.unrunnableScopes.indexOf(type) === -1) {
        it('is a lexical scope', function () {
          expect(this.vm).to.not.have.ownProperty('lexical');
        });
      }

      it('contains `lexical` inside of a "' + type + '"', function () {
        var container = this.parents[this.parents.length - 1];
        expect(this.parents).to.not.have.length(0);
        expect(container.type).to.equal(type);
      });

      // TODO: For `block` scoping, we need a clarifier for lexical and other block scopes
      it('does not contain `lexical` inside of other lexical scopes', function () {
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
