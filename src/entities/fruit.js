/* Enity for a wall block */

require(['src/entities/base/BaseEntity'], function() {
  Fruit = BaseEntity.extend({
    defaults: {
      'color': '#FF0000',
      'posX' : 0,
      'posY' : 0,
                  'number' : 1
      },
      initialize: function(){
        var model = this;
        var entity = Crafty.e("2D, DOM, Collision, Text, Fruit"); 
        entity
              .attr({w: gameContainer.conf.get('gridSize'), h: gameContainer.conf.get('gridSize'), x: model.get('posX'), y: model.get('posY'), z: 500})
                          
              .bind('EnterFrame', function(e){

              })
        .onHit("Snake", function () {
          this.destroy();
        })
        .bind("LevelRestart", function () {
          this.destroy();
        })
              .setName('Fruit')
              .textColor("#FFFFFF")
              .textFont({size: gameContainer.conf.get('gridSize') * 1.7 + "px"})
              .textFont({family: 'EGA'})
              .unselectable()
              .text(() => { return "" + model.get('number')});
              //Crafty.canvas.context.font = '10px Open Sans bold';
        
        model.set({'entity' : entity });
      }
  });
});
