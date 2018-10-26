'use strict';

describe('Service: todaysGames', function () {

  // load the service's module
  beforeEach(module('mlbLiveGameApp'));

  // instantiate service
  var todaysGames;
  beforeEach(inject(function (_todaysGames_) {
    todaysGames = _todaysGames_;
  }));

  it('should do something', function () {
    expect(!!todaysGames).toBe(true);
  });

});
