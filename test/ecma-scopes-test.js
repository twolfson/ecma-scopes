// Load in dependencies
var fs = require('fs');
var vm = require('vm');
var expect = require('chai').expect;

// Define test utilities
var testUtils = {
  openVm: function (filepath) {
    before(function openVmFn () {
      // Load our file into the VM
      var script = fs.readFileSync(filepath, 'utf8');
      this.vm = {};
      vm.runInNewContext(script, this.vm);
    });
    after(function cleanup () {
      // Clean up the vm
      delete this.vm;
    });
  }
};

// Define our tests
describe('ecma-scopes\' lexical scopes:', function () {
  // TODO: Load from JSON, convert to dash-case, and load file
  // TODO: Then iterate in a `forEach` loop
  describe('a "' + 'Function' + '"', function () {
    testUtils.openVm(__dirname + '/test-files/lexical-function.js');

    it('is a lexical scope', function () {
      expect(this.vm.hasOwnProperty('lexical')).to.equal(false);
    });
  });
});
