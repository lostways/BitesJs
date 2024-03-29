/* Enity for a body block */

require(['src/entities/base/BaseEntity'], function() {
  Body = BaseEntity.extend({
    defaults: {
      'color': '#FFFF55',
      'posX': 0,
      'posY': 0,
      },
      initialize: function(){
        var model = this;
        var entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Collision, Color, Body, Solid");
      
        entity
              .attr({w: gameContainer.conf.get('gridSize'), h: gameContainer.conf.get('gridSize'), x: model.get('posX'), y: model.get('posY'), z: 500})
        .color(model.get('color'))
              .bind('EnterFrame', function(e){
          
              })
              .bind('Click', function(){
                  
              })
        .bind("LevelRestart", function () {
          this.destroy();
        })
              .setName('Body');
        
        model.set({'entity' : entity });
      //model.set({'currDirection' : {x: 0, y: 0}});
      }
  });
});
