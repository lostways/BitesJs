/* Enity for a Snake*/

Snake = BaseEntity.extend({
	defaults: {
		'color': 'blue',
		'bodySize': 0
    },
	//entity: {},
	body: [],
    initialize: function(){
    	var model = this;
    	var currDirection = {x:0, y:0};
		var entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Collision, Color, Keyboard");
		//model.set({'body': []});
		
    	entity
            .attr({w: gameContainer.conf.get('gridSize'), h: gameContainer.conf.get('gridSize'), x: 100, y: 20})
			.color(model.get('color'))
			.bind('KeyDown', function () {
				if(this.isDown('A') || this.isDown('LEFT_ARROW')) {
					this.trigger('NewDirection', {x: -1, y: 0});
				}else
				if(this.isDown('S') || this.isDown('DOWN_ARROW')) {
					this.trigger('NewDirection', {x: 0, y: 1});
				}else
				if(this.isDown('D')  || this.isDown('RIGHT_ARROW')) {
					this.trigger('NewDirection', {x: 1, y: 0});
				}else
				if(this.isDown('W')  || this.isDown('UP_ARROW')) {
					this.trigger('NewDirection', {x: 0, y: -1});
				}
				
				if(this.isDown('R')) {
					model.grow();
				}
			})
			.bind('EnterFrame', function(e){
				if (Crafty.frame() % 10 !== 0) {return;} //SLOW DOWN
				
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
				
            })
			.bind("NewDirection",
				function (direction) {
					currDirection = direction;
					//console.log(currDirection);
				})
            .bind('Moved', function(from) {
				if(this.hit('Solid')){
				//console.log(hitArray); 
				this.attr({x: from.x, y:from.y});
				} else {
					//move body parts
					var oldX = 0;
					var oldY = 0;
					for (i = 0; i < model.get('bodySize'); i++) {
						if(i === 0) {
							var prevX = from.x;
							var prevY = from.y;
							//prevDirection = currDirection;
						} else {
							//prevDirection = model.get('body')[i - 1].get('currDirection');
						}
						
						if(typeof model.get('body')[i] !== 'object') { //if this is a new body piece
								model.get('body')[i] = new Body();
						}
						//move body part		
						oldX = model.get('body')[i].get('entity').x;
						oldY = model.get('body')[i].get('entity').y;
						model.get('body')[i].get('entity').x = prevX;
						model.get('body')[i].get('entity').y = prevY;
						
						prevX = oldX;
						prevY = oldY;
						
							
					}
				}
				
			})
            .setName('Snake');
			
    	model.set({'entity' : entity });
		
		//create body
		var bodyArray = [];
		bodyArray[0] = new Body();
		bodyArray[1] = new Body();
		bodyArray[0].get('entity').attr({x: this.get('entity').x - gameContainer.conf.get('gridSize'), y: this.get('entity').y}); 
		bodyArray[1].get('entity').attr({x: this.get('entity').x - gameContainer.conf.get('gridSize') * 2, y: this.get('entity').y});
		
		model.set({'body': bodyArray});
		model.set({'bodySize': model.get('body').length});
    },
	grow: function (amount) {
		var amount = typeof amount !== 'undefined' ? amount : 1;
		this.set({'bodySize': this.get('bodySize') + amount});
	} 
});