Crafty.scene("main", function() {

	var elements = [
        "src/entities/wall.js",
		"src/entities/snake.js",
		"src/levels/maps.js",
        /*"src/interfaces/info.js" */
	];
	
	//when everything is loaded, run the main scene
	require(elements, function() {	   
		/*sc['ufo'] = new Ufo(); */
		//load map
		
		levelOneMap = new Maps();
		levelOneMap.loadMap('level1');
		levelOneMapArray = levelOneMap.get('mapArray');
		
		//loop through the grid
		for (var i = 0; i < 24; i++) {
			for (var j = 0; j < 24; j++) {
				//is this a wall element
				console.log(levelOneMapArray[j][i]);
				if(levelOneMapArray[j][i] === 1) {
					sc['wall' + i + j] = new Wall();
					sc['wall' + i + j].get('entity').attr({x: i * 16, y: j * 16});
				} else {
					//if not a wall
				}
			} //end for j
		} //end for i
		
		//sc['wall1'] = new Wall();
		sc['player1'] = new Snake();
		//infc['info'] = new Info();
	});

});
