/* Enity for a wall block */
require(['src/entities/base/BaseEntity'], function() {
  Wall = BaseEntity.extend({
    defaults: {
      'color': '#FF5555'
      },
      initialize: function(){
        var model = this;
        var entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Collision, Color, Solid, Wall");

        entity
              .attr({w: gameContainer.conf.get('gridSize'), h: gameContainer.conf.get('gridSize'), z: 200})
        .color(model.get('color'))
              .bind('EnterFrame', function(e){

              })
              .bind('Click', function(){
                  
              })
              .setName('Wall');
        
        model.set({'entity' : entity });
      }
  });
});
