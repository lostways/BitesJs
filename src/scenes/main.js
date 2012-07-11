Crafty.scene("main", function() {

	var elements = [
        "src/entities/wall.js",
		"src/entities/body.js",
		"src/entities/snake.js",
		"src/levels/level.js",
		"src/levels/maps.js",
		"src/interfaces/scorebox.js",
	];
	
	//when everything is loaded, run the main scene
	require(elements, function() {	   

		//load map
		
		gameMap = new Maps();
		currentLevel = gameMap.loadMap('level1');
		
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
		
		//sc['wall1'] = new Wall();
		sc['player1'] = new Snake();
		infc['scorePlayer1'] = new Scorebox({name: sc['player1'].get('name'),score: sc['player1'].get('score'),lives: sc['player1'].get('lives')});
	});

});
