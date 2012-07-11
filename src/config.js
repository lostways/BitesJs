Config = Backbone.Model.extend({
    defaults: {
        'renderType' : 'Canvas',
		'mapWidth' : 400,
		'mapHeight' : 400,
		'gridSize' : 16
    },
    initialize: function() {
       if(gameContainer.env === 'dev') {
			require.config({
				urlArgs: "bust=" + (new Date()).getTime()
			});
		}
    },
    
});