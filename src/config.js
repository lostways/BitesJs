Config = Backbone.Model.extend({
    defaults: {
        'renderType' : 'Canvas',
		'stageWidth' : 800,
		'stageHeight' : 500,
		'gridSize' : 10,
		'gridWidth' : 50,
		'gridHeight' : 80
    },
    initialize: function() {
       if(gameContainer.env === 'dev') {
			require.config({
				urlArgs: "bust=" + (new Date()).getTime()
			});
		}
    },
    
});