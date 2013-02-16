ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font'
)
.defines(function(){

MyGame = ig.Game.extend({
	// Load fonts
	smallFont: new ig.Font('media/04b03.font.png'),
	largeFont: new ig.Font('media/largeFont.font.png'),

	//char blinking config
	blinkTimer: null,
	blinkDuration: 0.4,
	blinkChar: false,
	
	//maximum string size
	stringLimit: 3,
	
	init: function() {
		this.initialsStr = "";
	    this.charIndex = 0;
	    this.blinkTimer = new ig.Timer();

	    ig.input.bind(ig.KEY.UP_ARROW, 'up');
	    ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
	    ig.input.bind(ig.KEY.SPACE, 'space');
		ig.input.bind(ig.KEY.BACKSPACE, 'back');
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		//Alternate whether to show or hide the current character
		if(this.blinkTimer.delta() > this.blinkDuration){
			this.blinkTimer.reset();
			this.blinkChar = !this.blinkChar;
		}
		//call the initials handling function
		this.userInitials();
	},

	//function to handle key inputs and string building
	userInitials: function(){
	if(this.initialsStr.length < this.stringLimit){
	    if(ig.input.pressed('up')){
	    	//increase the current character, wrap around if needed
	         if(this.charIndex >= 25){
	             this.charIndex = 0;
	         }else{
	             this.charIndex++;
	         }

	         this.blinkTimer.reset();
	         this.blinkChar = true;
	    }

	    if(ig.input.pressed('down')){
	    	//decrease the current character, wrap around if neded
	         if(this.charIndex <= 0){
	             this.charIndex = 25;
	         }else{
	             this.charIndex--;
	         }
	         
	         this.blinkTimer.reset();
	         this.blinkChar = true;
	    }

	    if(ig.input.pressed('space')){
	        //convert the index value (0-25) to a capital letter. 'A' = 65
	        this.initialsStr += String.fromCharCode(65 + this.charIndex);
	        
	        this.blinkTimer.reset();
	        this.blinkChar = true;
	    }
	}

	if(this.initialsStr.length > 0){
		if(ig.input.pressed('back')){
			//remove the previous character
			this.initialsStr = this.initialsStr.substring(0,this.initialsStr.length-1);
			
			this.blinkTimer.reset();
			this.blinkChar = false;
		}
	}

	//create a temp string to display to the screen
	//this allows modification of the printed string without...
	//affecting the string of initials
    this.drawStr = this.initialsStr;
    if(this.drawStr.length < this.stringLimit){
    	if(this.blinkChar){
    		//add current character to the end of the string if showing
    		this.drawStr+=String.fromCharCode(65 + this.charIndex);
    	}

    	//fill the remaining character slots with underscores
    	for(i = this.drawStr.length-1; i < this.stringLimit - 1; i++){
    		this.drawStr += '_';
    	}
    }
    
    x = ig.system.width/2;
    y = ig.system.height/2 - this.largeFont.height/2;
    this.smallFont.draw('Enter your initials:', x, ig.system.height/2 - (2 * this.largeFont.height), ig.Font.ALIGN.CENTER);
    this.largeFont.draw(this.drawStr, x, y, ig.Font.ALIGN.CENTER);
    this.smallFont.draw('Up/Down arrow to change characters.', x, ig.system.height - this.smallFont.height*3, ig.Font.ALIGN.CENTER);
    this.smallFont.draw('Space to select. Backspace to revert selection.', x, ig.system.height - this.smallFont.height*2, ig.Font.ALIGN.CENTER);
}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 320, 240, 2 );

});
