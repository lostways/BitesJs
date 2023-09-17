Scorebox = BaseEntity.extend({
	defaults: {
		'score' : 0,
		'lives' : 0,
		'name' : '',
		//'cName' : 'Player1'
    },
    initialize: function(){
    	var model = this;
    	var entity = Crafty.e("2D, DOM, Text");
		
    	entity
            .attr({x: 0, y: 0, z: 1, w: gameContainer.conf.get('stageWidth'), h: 30})
            //.text(infoText)
            //.textColor('#FFF')
            //.textFont({'size' : '20px', 'family': 'Arial'})
        .css({'font-size' : '25px', 'font-family': 'EGA','text-align': 'right','background-color' : 'blue','color' : '#FFF', 'line-height': '30px', 'padding': '0px', 'margin': '0px'})
            .bind('Click', function(){
                                
            })
      .unselectable()
			.bind('EnterFrame', function() {
				var infoText = model.get('name').toUpperCase() + "-->&nbsp&nbspLives: " + model.get('lives') + "&nbsp&nbsp&nbsp&nbsp&nbsp" +  model.get('score');
				this.text(infoText);
			})

    	model.set({'entity' : entity });
    }
});
