/* Enity for the World 

Holds game states

*/

World = BaseEntity.extend({
	 defaults: {
        'currentLevel': null,
		'maxEaten': 9,
		'numPlayers': 1
    },
    initialize: function(){
    	var model = this;
    	var entity = Crafty.e();
    	entity
            .bind('EnterFrame', function(e){
				model.updateScores();
            })
            .setName('World');
    	model.set({'entity' : entity });
		
		this.displayMap('level1');
		this.placeFruit();
		this.placeSnake();
		this.updateScores();
    },
	displayMap: function (level) {
		//load map
		
		gameMap = new Maps();
		currentLevel = gameMap.loadMap(level);
		
		//loop through the grid
		for (var i = 0; i < currentLevel.get('height'); i++) {
			for (var j = 0; j < currentLevel.get('width'); j++) {
				//is this a wall element
				//console.log(levelOneMapArray[j][i]);
				if(currentLevel.get('map')[i][j] === 1) {
					sc['wall' + i + j] = new Wall();
					sc['wall' + i + j].get('entity').attr({x: j * gameContainer.conf.get('gridSize'), y: (i + 3) * gameContainer.conf.get('gridSize')});
				} else {
					//if not a wall
				}
			} //end for j
		} //end for i
		
		this.set({'currentLevel': currentLevel});
	},
	placeFruit: function () {
		//place fruit
		do {	
			var fruitX = Crafty.math.randomInt(1, this.get('currentLevel').get('width') - 1);
			var fruitY = Crafty.math.randomInt(4, this.get('currentLevel').get('height') - 1);
		} while (this.get('currentLevel').get('map')[fruitY][fruitX] === 1)
		
		sc['fruit'] = new Fruit({'posX':fruitX * gameContainer.conf.get('gridSize'), 'posY':fruitY * gameContainer.conf.get('gridSize')});
	},
	placeSnake: function() {
		var startX = this.get('currentLevel').get('startCol') * gameContainer.conf.get('gridSize');
		var startY = this.get('currentLevel').get('startRow') * gameContainer.conf.get('gridSize');
		console.log(this.get('startX') + " " + this.get('startY'));
		sc['player1'] = new Snake({'startX': startX, 'startY': startY});
		infc['scorePlayer1'] = new Scorebox({'name': sc['player1'].get('name')});
	},
	updateScores: function () {
		infc['scorePlayer1'].set({'score' : sc['player1'].get('score'),'lives' : sc['player1'].get('lives')});
	},
	//died: function(playerObj) {
	//	//var playerObj = sc[playerObjName];
	//	var oldPlayerLives = playerObj.model.get('lives');
	//	var oldPlayerScore = playerObj.model.get('score');
	//	var oldPlayerScore = playerObj.model.get('name');
	//	
	//	//destory the player and all body element
	//	
	//	//destroy head and body
	//	for (i in playerObj.model.get('body')) {
	//		playerObj.model.get('body')[i].get('entity').destroy();
	//	}
	//	playerObj.model.get('entity').destroy();
	//	
	//	if (playerObj.model.get('lives') > 1) {
	//		playerObj.model.set({'lives': sc[playerObjName].get('lives') - 1});
	//	}
	//		
	//}

});