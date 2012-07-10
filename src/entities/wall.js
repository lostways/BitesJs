/* Enity for a wall block */

Wall = BaseEntity.extend({
	defaults: {
		'color': 'orange'
    },
    initialize: function(){
    	var model = this;
    	var entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Collision, Color, Solid");

    	entity
            .attr({w: 16, h: 16})
			.color(model.get('color'))
            .bind('EnterFrame', function(e){

            })
            .bind('Click', function(){
                
            })
            .setName('Wall');
			
    	model.set({'entity' : entity });
    }
});