'use strict';

describe('Controller: TodaysgamesCtrl', function () {

  // load the controller's module
  beforeEach(module('mlbLiveGameApp'));

  var TodaysgamesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TodaysgamesCtrl = $controller('TodaysgamesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TodaysgamesCtrl.awesomeThings.length).toBe(3);
  });
});
