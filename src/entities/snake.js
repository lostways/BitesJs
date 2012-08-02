/* Enity for a Snake*/

Snake = BaseEntity.extend({
	defaults: {
		'color': '#FFFF55',
		'bodySize': 0,
		'name' : 'Sammy',
		'lives' : 5,
		'score' : 0,
		'nextGrowAmount' : 4,
		'eatenThisLevel': 0, //number of fruits this snake has eaten this level
		'alive' : true,
		'playable' : false, //is the snake in play or being paused and/or initialized
		'startX': 0,
		'startY': 0,
		'startDir' : {x:0, y:0}
    },
	//entity: {},
	body: [],
    initialize: function(){
    	var model = this;
    	var currDirection = model.get('startDir');
		var changingDirections = false;
		var entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Collision, Color, Keyboard, Snake, Scorebox");
		//model.set({'body': []});
		
    	entity
            .attr({w: gameContainer.conf.get('gridSize'), h: gameContainer.conf.get('gridSize'), z: 500})
			.color(model.get('color'))
			.bind('KeyDown', function () {
				
				if(changingDirections !== true && model.get('playable') === true) {	//if we are not currently in between snake moves
					
					if(this.isDown('A') || this.isDown('LEFT_ARROW') && currDirection.x !== 1 && currDirection.x !== -1) {
						this.trigger('NewDirection', {x: -1, y: 0});
					} else 
					if(this.isDown('S') || this.isDown('DOWN_ARROW')  && currDirection.y !== -1 && currDirection.y !== 1) {
						this.trigger('NewDirection', {x: 0, y: 1});
					} else 
					if(this.isDown('D')  || this.isDown('RIGHT_ARROW')  && currDirection.x !== -1 && currDirection.x !== 1) {
						this.trigger('NewDirection', {x: 1, y: 0});
					} else 
					if(this.isDown('W')  || this.isDown('UP_ARROW')  && currDirection.y !== 1 && currDirection.y !== -1) {
						this.trigger('NewDirection', {x: 0, y: -1});
					}
				
				}
				if(this.isDown('R')) {
					model.grow();
				}
			})
			.bind('EnterFrame', function(e){
			
				 if(Crafty.frame() % 4 === 0 && model.get("playable") === true) { //SLOW DOWN
				 
				
					var orgX = this.x;
					var orgY = this.y;
					
					if (currDirection.x < 0) {
						this.x = this.x - gameContainer.conf.get('gridSize');
					} 
					if (currDirection.x > 0) {
						this.x = this.x + gameContainer.conf.get('gridSize');
					} 
					if (currDirection.y < 0) {
						this.y = this.y - gameContainer.conf.get('gridSize');
					} 
					if (currDirection.y > 0) {
						this.y = this.y + gameContainer.conf.get('gridSize');
					}
					
					//trigger moved event
					if(this.x !== orgX || this.y !== orgY) {
						this.trigger('Moved', { x: orgX, y: orgY});
						
					}
					
					//we are nolonger moving so it's ok to change directions
					changingDirections = false;
				}
            })
			.bind("NewDirection",
				function (direction) {
					currDirection = direction;
					changingDirections = true;
					//console.log(currDirection);
				})
            .bind('Moved', function(from) {
				if(hitByFruit = this.hit('Fruit')) {
					//console.log(hitByFruit);
					model.set({'eatenThisLevel': model.get('eatenThisLevel') + 1});
					model.set({'score': model.get('score') + (model.get('eatenThisLevel') * 100)});
					if(model.get('eatenThisLevel') < theWorld.get('maxEaten')) {
						theWorld.placeFruit();
						model.grow(model.get('nextGrowAmount'));
						model.set({'nextGrowAmount': model.get('nextGrowAmount') + 4});
					} else {
						Crafty.trigger('PauseSnakes');
						Crafty.trigger('NextLevel');
					}
				}

				if(model.get('playable') === true) {		
					if(hitArray = this.hit('Solid')){
						console.log(hitArray); 
						this.attr({x: from.x, y:from.y});
						model.set({'lives': model.get('lives') - 1});
						if (model.get('lives') > 0) {
							Crafty.trigger("PauseSnakes");
							infobox = new Infobox({'text': model.get('name') + " Dies! Push Space! --->", 'actionToTrigger': 'LevelRestart'});
							currDirection = {x:0, y:0};
						} else {
							Crafty.trigger("PauseSnakes");
							infobox = new Infobox({'text': "Game Over, Push Space", 'actionToTrigger': 'EndGame'});
						}
						//theWorld.died(this);
					} else { 
							//move body parts	
							model.moveBody(from);	
					}
				}
			})
			.bind("LevelRestart", function () {
				//model.reset();
			})
			.bind("PauseSnakes", function () {
				if (model.get('playable') === true) {
					model.set({'playable': false});
				} else {
					model.set({'playable': true});
				}
			})
            .setName('Snake');
			
    	model.set({'entity' : entity });
		
		//reset and create body
		this.reset();
		
    },
	moveBody: function (from) {
		var oldX = 0;
		var oldY = 0;
		for (i = 0; i < this.get('bodySize'); i++) {
			if(i === 0) {
				var prevX = from.x;
				var prevY = from.y;
				//prevDirection = currDirection;
			} else {
				//prevDirection = model.get('body')[i - 1].get('currDirection');
			}							
			if(typeof this.get('body')[i] !== 'object') { //if this is a new body piece
					this.get('body')[i] = new Body({'posX': prevX, 'posY': prevY});
					oldX = prevX;
					oldY = prevY;
			} else {
				//move body part		
				oldX = this.get('body')[i].get('entity').x;
				oldY = this.get('body')[i].get('entity').y;
				this.get('body')[i].get('entity').x = prevX;
				this.get('body')[i].get('entity').y = prevY;
			}
			prevX = oldX;
			prevY = oldY;
		}
	
	},
	//grow function
	grow: function (amount) {
		var amount = typeof amount !== 'undefined' ? amount : 1;
		this.set({'bodySize': this.get('bodySize') + amount});
	},
	reset: function () {
		//this.set({'playable': false});
		this.get('entity').attr({x: this.get('startX'), y: this.get('startY')});
		this.get('entity').trigger("NewDirection", this.get('startDir'));
		//destory old body
		//if(typeof Crafty("Body") !== 'undefined') (Crafty("Body").destroy());
		var bodyArray = [];
		//bodyArray[0] = new Body();
		//bodyArray[0].get('entity').attr({x: this.get('entity').x + (this.get('startDir').x * gameContainer.conf.get('gridSize')),
		//								 y: this.get('entity').y + (this.get('startDir').y * gameContainer.conf.get('gridSize'))}); 
		//bodyArray[1].get('entity').attr({x: this.get('entity').x - gameContainer.conf.get('gridSize') * 2, 
		//								y: this.get('entity').y});
		this.set({'body': []});
		this.set({'bodySize': 1});
		this.set({'nextGrowAmount' : this.defaults.nextGrowAmount});
		this.set({'eatenThisLevel' : this.defaults.eatenThisLevel});
		//this.moveBody({x: this.get('startX'), y: this.get('startY')});
		
	}
});
