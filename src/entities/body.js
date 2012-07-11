/* Enity for a wall block */

Body = BaseEntity.extend({
	defaults: {
		'color': 'green'
    },
    initialize: function(){
    	var model = this;
    	var entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Collision, Color, Body");
		
    	entity
            .attr({w: gameContainer.conf.get('gridSize'), h: gameContainer.conf.get('gridSize')})
			.color(model.get('color'))
            .bind('EnterFrame', function(e){
				
            })
            .bind('Click', function(){
                
            })
            .setName('Body');
			
    	model.set({'entity' : entity });
		model.set({'currDirection' : {x: 0, y: 0}});
    }
});