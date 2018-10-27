'use strict';

describe('Controller: OpengameCtrl', function () {

  // load the controller's module
  beforeEach(module('mlbLiveGameApp'));

  var OpengameCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OpengameCtrl = $controller('OpengameCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(OpengameCtrl.awesomeThings.length).toBe(3);
  });
});
