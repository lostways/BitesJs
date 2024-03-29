/* Enity for the World 

Holds game states

*/
require([
  'src/levels/maps.js',
  'src/levels/level.js',
  'src/entities/base/BaseEntity.js',
  'src/entities/floor.js',
  'src/entities/wall.js',
  'src/entities/snake.js',
  'src/entities/fruit.js',
  'src/entities/body.js',
  'src/interfaces/scorebox.js',
  'src/interfaces/infobox.js',
], function() {


  World = BaseEntity.extend({
     defaults: {
          'currentLevel': null,
      'maxEaten': 9,
      'numPlayers': 1,
      'currentLevelNum': 1,
      'maxLevels' : 10,
                  'state' : null
      },
      initialize: function(){
        var model = this;
      
        var entity = Crafty.e("Keyboard, World");
        entity
              .bind('EnterFrame', function(e){
          model.updateScores();
              })
        .bind('KeyDown', function() {
          if(this.isDown('SPACE')) {
                                          if (model.get("state") == "PLAYING") {
                                              Crafty.trigger('PauseSnakes');
                                              infobox = new Infobox({'text': "Game Paused ... Push Space",  "actionToTrigger" : "PauseSnakes"});
                                              //Crafty.pause(); //must fix pause timer bug in Crafty before we can pause the game
                                          }
                                  }
          if(this.isDown('L')) {
            Crafty.trigger('PauseSnakes');
            Crafty.trigger('NextLevel');
            //this.trigger('NextLevel');
          }
        })
        .bind('LevelRestart', function () {
          model.startLevel( function () {
            infobox = new Infobox({'text': "Level " +  model.get('currentLevel').get('name') + " Push Space",  "actionToTrigger" : "PauseSnakes"});
          });
          
        })
        .bind('NextLevel', function () {
          model.set({'currentLevelNum' : model.get('currentLevelNum') + 1});
                                  if(model.get('currentLevelNum') > model.get('maxLevels')) {
                                      Crafty.trigger("WonTheGame");
                                  } else { 
                                      Crafty.trigger("LevelRestart");
                                  }
        })
        .bind('EndGame', function () {
          model.endGame();
        })
                          .bind('WonTheGame', function () {
                              Crafty("Snake").destroy();
                              Crafty("Body").destroy();
                              Crafty("Fruit").destroy();
                              infobox = new Infobox({'text': "YOU WON ALL THE THINGS!!!!!1!!!", "actionToTrigger" : "EndGame"});
                              
                          })
                          .bind('PauseSnakes', function () {
                              if(model.get('state') == "PLAYING") {
                                  model.set({'state' : "PAUSED"});
                              } else {
                                  model.set({'state' : "PLAYING"});
                              }
                              
                          })
              .setName('World');
        model.set({'entity' : entity });
          
      //Crafty.trigger('LevelRestart');
      //Crafty.trigger("PauseSnakes");
      model.startLevel(function () {
          //Crafty("World").trigger('LevelRestart');
          infobox = new Infobox({'text': "Level " +  model.get('currentLevel').get('name') + " Push Space", "actionToTrigger" : "PauseSnakes"});
      });
      //Crafty.pause();
      
      },
    endGame: function () {
      //Crafty("Wall").destroy();
      //Crafty("Floor").destroy();
      //Crafty("Snake").destory();
      //Crafty("Fruit").destroy();
      //Crafty("Body").destroy();
      //delete sc['player1'];
      //delete infc['scorePlayer1'];
      //delete sc['floor'];
      //this.get('entity').destory();
      //this.set({'currentLevelNum' : 1});
      //Crafty.trigger('LevelRestart');
      //Stop Crafty
                  Crafty.stop();
                  //reload the page to cleanly restart the game
                  window.location.reload()
    },
    startLevel: function (callback) {
      var levelName = 'level' + this.get('currentLevelNum'); 
      console.log(levelName);
      this.loadMap(levelName,this.displayMap);
      this.placeFruit(1);
      this.placeSnake();
      this.updateScores();

      if(typeof callback === 'function') {
        callback();
      }
      
    },
    loadMap: function (level,callback) {
      //load map
      
      gameMap = new Maps();
      currentLevel = gameMap.loadMap(level);
      this.set({'currentLevel': currentLevel});
      
      if(typeof callback === 'function') {callback(currentLevel);};
      
    },
    displayMap: function (currentLevel) {
      //display floor
      sc['floor'] = new Floor({'width': currentLevel.get('width') * gameContainer.conf.get('gridSize'), 
                  'height': currentLevel.get('height') * gameContainer.conf.get('gridSize'),
                  'posX' : 0,
                  'posY' : 30});
      //destory previous walls
      Crafty("Wall").destroy();
      
      //loop through the grid
      for (var i = 0; i < currentLevel.get('height'); i++) {
        for (var j = 0; j < currentLevel.get('width'); j++) {
          //is this a wall element
          //console.log(levelOneMapArray[j][i]);
          if(currentLevel.get('map')[i][j] === 1) {
            sc['wall' + i + j] = new Wall();
            sc['wall' + i + j].get('entity').attr({x: j * gameContainer.conf.get('gridSize'), y: (i + 3) * gameContainer.conf.get('gridSize')});
          } else {
            //if not a wall, its a floor so do nothing
            //sc['floor' + i + j] = new Floor();
            //sc['floor' + i + j].get('entity').attr({x: j * gameContainer.conf.get('gridSize'), y: (i + 3) * gameContainer.conf.get('gridSize')});
          }
        } //end for j
      } //end for i
      
      
    },
    placeFruit: function (fruitNumber) {
      //place fruit
      do {	
        var fruitX = Crafty.math.randomInt(1, this.get('currentLevel').get('width') - 1);
        var fruitY = Crafty.math.randomInt(4, this.get('currentLevel').get('height') - 1);
      } while (this.get('currentLevel').get('map')[fruitY][fruitX] === 1)
      
      sc['fruit'] = new Fruit({'posX':fruitX * gameContainer.conf.get('gridSize'), 'posY':(fruitY + 3) * gameContainer.conf.get('gridSize'), 'number':fruitNumber});
    },
    placeSnake: function() {
      var startX = this.get('currentLevel').get('startCol') * gameContainer.conf.get('gridSize');
      var startY = this.get('currentLevel').get('startRow') * gameContainer.conf.get('gridSize');
      var startDir = this.get('currentLevel').get('startDir');
      //console.log(this.get('startX') + " " + this.get('startY'));
      if(typeof sc['player1'] !== 'object') {
        sc['player1'] = new Snake({'startX': startX, 'startY': startY, 'startDir' : startDir});
      } else {
        sc['player1'].set({'startX': startX, 'startY': startY, 'startDir' : startDir});
        sc['player1'].reset();
      }
      if(typeof infc['scorePlayer1'] !== 'object') { 
        infc['scorePlayer1'] = new Scorebox({'name': sc['player1'].get('name')});
      }
    },
    updateScores: function () {
      infc['scorePlayer1'].set({'score' : sc['player1'].get('score'),'lives' : sc['player1'].get('lives')});
    },

  });
});
