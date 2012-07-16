/* Enity for a floor block */

Floor = BaseEntity.extend({
	defaults: {
		'color': 'blue',
		'width': 0,
		'height' : 0,
		'posX' : 0,
		'posY' : 0,
    },
    initialize: function(){
    	var model = this;
    	var entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Color");

    	entity
            .attr({w: model.get('width'), 
					h: model.get('height'),
					x: model.get('posX'),
					y: model.get('posY'),
					z: 100})
			.color(model.get('color'))
            .bind('EnterFrame', function(e){

            })
            .setName('Floor');
			
    	model.set({'entity' : entity });
    }
});