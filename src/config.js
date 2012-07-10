Config = Backbone.Model.extend({
    defaults: {
        'renderType' : 'Canvas',
		'mapWidth' : 400,
		'mapHeight' : 400
    },
    initialize: function() {
       if(gameContainer.env === 'dev') {
			require.config({
				urlArgs: "bust=" + (new Date()).getTime()
			});
		}
    },
    
});