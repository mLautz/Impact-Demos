ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',

	'game.levels.testLevel'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	
	
	init: function() {
		// Initialize your game here; bind keys etc.
		this.loadLevel(LevelTestLevel);
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		// Add your own, additional update code here
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
	}
});

if(!ig.ua.mobile){
	ig.main( '#canvas', MyGame, 60, 512, 768, 1);
}else{
	ig.main('#canvas', MyGame, 60, 512, 768, 2);
}

});
