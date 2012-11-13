/* Enity for a wall block */

Fruit = BaseEntity.extend({
	defaults: {
		'color': '#FF0000',
		'posX' : 0,
		'posY' : 0,
                'number' : 1
    },
    initialize: function(){
    	var model = this;
    	var entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Collision, Color, Fruit"); 
    	entity
            .attr({w: gameContainer.conf.get('gridSize'), h: gameContainer.conf.get('gridSize'), x: model.get('posX'), y: model.get('posY'), z: 500})
			.color(model.get('color'))
                        
            .bind('EnterFrame', function(e){

            })
			.onHit("Snake", function () {
				this.destroy();
			})
			.bind("LevelRestart", function () {
				this.destroy();
			})
            .setName('Fruit');
            //.textColor("#FFFFFF")
            //.textFont({size: gameContainer.conf.get('gridSize') + "px"})
            //.text("" + model.get('number'));
            //Crafty.canvas.context.font = '10px Open Sans bold';
			
    	model.set({'entity' : entity });
    }
});
