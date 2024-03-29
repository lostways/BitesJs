window.onload = function() {
        
    var version = null,
    	today = new Date();
	
	// Fix for cache
    if(gameContainer.env == 'dev') {
		version = today.getDay()+"_"+ today.getHours() +"_"+today.getSeconds();
	} else {
		version = gameContainer.gameVersion;
	};
    
	
	
	require([
	         "src/config.js?v="+version+"",
	], function() {
	
		// Load config
		gameContainer['conf'] = new Config({});
		
		//start Crafty
		Crafty.init(
      gameContainer.conf.get('stageWidth'),
      gameContainer.conf.get('stageHeight'),
      document.getElementById('game')
    );
	
				
		//the loading screen - that will be display while assets loaded
		Crafty.scene("loading", function() {
            // clear scene and interface
            sc = []; infc = [];   

			var loadingText = Crafty.e("2D, DOM, Text")
					.attr({w: 500, h: 20, x: ((Crafty.viewport.width) / 2), y: (Crafty.viewport.height / 2), z: 2})
					.text('Loading...')
					.css({	
						'font-size' : '20px', 
						'font-family': 'EGA',
						'color' : '#FFF'	
					});
		
			// load takes an array of assets and a callback when complete
			Crafty.load({}, function() {

				// array with local components
                var elements = [
                  "src/entities/base/BaseEntity.js",
                  "src/entities/world.js",
                  "src/levels/maps.js",
                  "src/levels/level.js",
                  "src/interfaces/infobox.js",
                  "src/interfaces/scorebox.js",
                  "src/scenes/main.js",
	    		];

    			//when everything is loaded, run the main scene
    			require(elements, function() {	   
            //sleep for 3 seconds
            setTimeout(function() {
              loadingText.destroy();
              if (gameContainer.scene != undefined) {
                Crafty.scene(gameContainer.scene);
              }
            }, 3000);
    			});
    		},
			function(e) {
				loadingText.text('Loading ('+(e.percent.toFixed(0))+'%)');
			});
		});
		
		//automatically play the loading scene
		Crafty.scene("loading");
	});
};
