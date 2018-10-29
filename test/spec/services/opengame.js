'use strict';

describe('Service: openGame', function () {

  // load the service's module
  beforeEach(module('mlbLiveGameApp'));

  // instantiate service
  var openGame;
  beforeEach(inject(function (_openGame_) {
    openGame = _openGame_;
  }));

  it('should do something', function () {
    expect(!!openGame).toBe(true);
  });

});
