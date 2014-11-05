// Load in dependencies
var fs = require('fs');
var vm = require('vm');

// Define test utilities
var testUtils = {
  vm: {
    open: function (filepath) {
      before(function openVmFn () {
        // Load our file into the VM
        var script = fs.readFileSync(filepath, 'utf8');
        this.vmContext = {};
        vm.runInNewContext(script, this.vmContext);
      });
      after(function cleanup () {
        // Clean up the vm
        delete this.vmContext;
      });
    },
    run: function (expression) {

    }
  }
};

// Define our tests
describe('ecma-scopes\' lexical scopes:', function () {
  // TODO: Load from JSON, convert to dash-case, and load file
  // TODO: Then iterate in a `forEach` loop
  describe('a "' + 'Function' + '"', function () {
    testUtils.vm.open(__dirname + '/test-files/lexical-function.js');
    // test

    it('is a lexical scope', function () {
      console.log(this.vmContext);
    });
  });
});
