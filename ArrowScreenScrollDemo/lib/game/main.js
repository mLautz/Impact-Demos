ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',

	'plugins.map-size',

	'game.levels.scrollDemoLevel'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	
	
	init: function() {
		// Initialize your game here; bind keys etc.
		ig.input.bind(ig.KEY.UP_ARROW, 'up');
		ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
		ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
		ig.input.bind(ig.KEY.LEFT_ARROW, 'left');

		this.loadLevel(LevelScrollDemoLevel);

		this.rightBorder = ig.game.backgroundMaps[0].pxWidth - ig.system.width;
		this.bottomBorder = ig.game.backgroundMaps[0].pxHeight - ig.system.height;

		this.screen.x = ig.system.width / 2;
		this.screen.y = ig.system.height / 2;
	},
	
	update: function() {

		if(ig.input.state('left') && !this.screen.x<=0){
		    if(this.screen.x > 30){
		        this.screen.x -= 30;
		    }else{
		        this.screen.x = 0;
		    }
		}

		if(ig.input.state('right')){
		    if(this.screen.x < this.rightBorder - 30){
		        this.screen.x += 30;
		    }
		    else{
		        this.screen.x = this.rightBorder;
		    }
		}

		if(ig.input.state('up') && !this.screen.y<=0){
		    if(this.screen.y > 30){
		        this.screen.y -= 30;
		    }else{
		        this.screen.y = 0;
		    }
		}

		if(ig.input.state('down')){
		    if(this.screen.y < this.bottomBorder - 30){
		        this.screen.y += 30;
		    }
		    else{
		        this.screen.y = this.bottomBorder;
		    }
		}

		this.parent();
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 320, 240, 2 );

});
