ig.module('game.entities.gridMover')
.requires('impact.entity')
.defines(function(){
	
	EntityGridMover = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/64char.png', 64, 64),
		size: {x: 64, y:64},
		moving: false,
		smoothTransition: false,
		center: null,

		init: function(x, y, settings){
			this.parent(x, y, settings);
			this.addAnim('idle', 1, [0]);
			this.currentAnim = this.anims.idle;

			ig.input.bind(ig.KEY.MOUSE1, 'click');
			this.center = {x: this.pos.x + this.size.x/2, y: this.pos.y + this.size.y/2};
		},

		update: function(){
			//check if moving (for smooth transitions)
			if(!this.moving){
				//check for click outside the box
				if(ig.input.pressed('click')
					&& ((ig.input.mouse.x < this.pos.x || ig.input.mouse.x > this.pos.x + this.size.x)
					|| (ig.input.mouse.y < this.pos.y || ig.input.mouse.y > this.pos.y + this.size.y)))
				{
					//calculate angle (result is in radians)
					var angle = Math.atan2(-(ig.input.mouse.y - this.center.y),(ig.input.mouse.x - this.center.x));
					if(angle < 0){
						angle += 2*Math.PI;
					}
					//convert to degrees and offset by 45
					angle = (angle * 180/Math.PI + 45)%360;
					

					//select a movement function based on click direction
					angle = Math.floor(angle/90);

					console.log("Angle = "+angle);

					if(angle == 0){
						this.moveRight();
					}else if(angle == 1){
						this.moveUp();
					}else if(angle == 2){
						this.moveLeft();
					}else if(angle == 3){
						this.moveDown();
					}
					
					this.center = {x: this.pos.x + this.size.x/2, y: this.pos.y + this.size.y/2};
				}
			}

			this.parent();
		},

		moveRight: function(){
			this.pos.x += this.size.x;
		},

		moveLeft: function(){
			this.pos.x -= this.size.x;
		},

		moveUp: function(){
			this.pos.y -= this.size.y;
		},

		moveDown: function(){
			this.pos.y += this.size.y;
		},
	});
});