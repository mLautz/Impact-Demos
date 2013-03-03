ig.module('game.entities.gridMover')
.requires('impact.entity')
.defines(function(){
	
	EntityGridMover = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/64char.png', 64, 64),
		size: {x: 64, y:64},
		moving: false,
		smoothTransition: true,
		center: null,
		moveDuration: 0.3,
		moveTimer: null,

		init: function(x, y, settings){
			this.parent(x, y, settings);
			this.addAnim('idle', 1, [0]);
			this.currentAnim = this.anims.idle;

			ig.input.bind(ig.KEY.MOUSE1, 'click');
			this.center = {x: this.pos.x + this.size.x/2, y: this.pos.y + this.size.y/2};
			if(this.smoothTransition){
				this.moveTimer = new ig.Timer();
			}
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

					if(angle == 0){
						this.moveRight();
					}else if(angle == 1){
						this.moveUp();
					}else if(angle == 2){
						this.moveLeft();
					}else if(angle == 3){
						this.moveDown();
					}
					
					if(!this.smoothTransition){
						this.center = {x: this.pos.x + this.size.x/2, y: this.pos.y + this.size.y/2};
					}
					
					if(this.smoothTransition){
						this.moving = true;
						this.moveTimer.reset();
					}
				}
			}else if(this.moveTimer.delta() > this.moveDuration){
				this.moving = false;
				this.pos = this.nextPos;
				this.center = {x: this.pos.x + this.size.x/2, y: this.pos.y + this.size.y/2};
			}else{
				var moveDelta = this.moveTimer.delta()/this.moveDuration;
				this.pos.x = this.prevPos.x + ((this.nextPos.x - this.prevPos.x) * moveDelta);
				this.pos.y = this.prevPos.y + ((this.nextPos.y - this.prevPos.y) * moveDelta);
			}

			this.parent();
		},

		moveRight: function(){
			if(!this.smoothTransition){
				this.pos.x += this.size.x;
			}else{
				this.prevPos = {x: this.pos.x, y: this.pos.y};
				this.nextPos = {x: this.pos.x + this.size.x, y: this.pos.y};
			}
		},

		moveLeft: function(){
			if(!this.smoothTransition){
				this.pos.x -= this.size.x;
			}else{
				this.prevPos = {x: this.pos.x, y: this.pos.y};
				this.nextPos = {x: this.pos.x - this.size.x, y: this.pos.y};
			}
		},

		moveUp: function(){
			if(!this.smoothTransition){
				this.pos.y -= this.size.y;
			}else{
				this.prevPos = {x: this.pos.x, y: this.pos.y};
				this.nextPos = {x: this.pos.x, y: this.pos.y - this.size.y};
			}
		},

		moveDown: function(){
			if(!this.smoothTransition){
				this.pos.y += this.size.y;
			}else{
				this.prevPos = {x: this.pos.x, y: this.pos.y};
				this.nextPos = {x: this.pos.x, y: this.pos.y + this.size.y};
			}
		},
	});
});