// Load in dependencies
var expect = require('chai').expect;
var ecmaScopes = require('../');
var astUtils = require('./utils/ast');
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
        // Find closest identifier to `root`
        var node = this.node = astUtils.findFirst(this.ast, {
          type: 'Identifier',
          name: 'lexical'
        });

        // If there was a match
        var parents = this.parents = [];
        if (node) {
          // Walk its parents until we resolve a function
          var parent = node.parent;
          while (parent) {
            // Save the parent node
            parents.push(parent);

            // If the parent is our scope type, stop
            if (parent.type === type) {
              return;
            }

            // Resolve the next parent
            parent = parent.parent;
          }
        }
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
