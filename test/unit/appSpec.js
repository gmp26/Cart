/* jasmine specs for controllers go here */

describe('MemoryNRICH', function() {

  beforeEach(module('app'));

  describe('GameCtrl', function(){
    var gameCtrl, scope;

    beforeEach(inject(function($controller, $rootScope){
      scope = $rootScope.$new();
      gameCtrl = $controller('GameCtrl', {$scope: scope});
    }));


    it('should publish the game model', function() {
      expect(scope.game).toBeDefined();
    });
  });


  describe('game', function(){
    var game;


    beforeEach(inject(function(_game_){
      game = _game_;
    }));


    it('should create a game with 8 tile pairs', function() {
      expect(game.unmatchedPairs).toBe(8);
    });
  });

  
  describe('gameCard directive', function() {
	
	beforeEach(module('getpath'));
	
    it('should render a card using divs and bind it to a tile', inject(function($compile, $rootScope, contentPath) {
      var tile = new Tile('sampleTile'),
          element;

      $rootScope.tileModel = tile;
      element = $compile('<game-card tile="tileModel"></game-card>')($rootScope);
      $rootScope.$apply();

      expect(element.find('div').find('div').find('img').eq(1).attr('src')).
          toBe(contentPath+'/sampleTile.png');
    }));
  });

});
