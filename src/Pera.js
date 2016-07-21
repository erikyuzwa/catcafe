module.exports = {
	init: function(catCafe){
		this.sprite = catCafe.game.add.sprite(40, 140, 'tileset', 0, catCafe.mainGroup);
		this.sprite.anchor.setTo(0.5, 1);
		catCafe.game.physics.arcade.enable(this.sprite);
		this.sprite.body.collideWorldBounds = true;
		this.sprite.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7], 8, true);
		this.cursors = catCafe.game.input.keyboard.createCursorKeys();
	},
	update: function(){
		var idle = true;
		//this.target = this.catCafe.getClosestEntity();	
		if (this.cursors.left.isDown) {
			idle = false;
	        this.sprite.body.velocity.x = -40;
	    } else if (this.cursors.right.isDown) {
	    	idle = false;
	        this.sprite.body.velocity.x = 40;
	    } else {
	    	this.sprite.body.velocity.x = 0;
	    }
		
	    if (this.cursors.up.isDown) {
	    	idle = false;
	        this.sprite.body.velocity.y = -20;
	    } else if (this.cursors.down.isDown) {
	    	idle = false;
	    	this.sprite.body.velocity.y = 20;
	    } else {
	    	this.sprite.body.velocity.y = 0;
	    }
	    if (idle){
	    	this.sprite.frame = 0;
	    	this.sprite.animations.stop();
	    } else {
	    	this.sprite.animations.play('walk');
	    }
		
	}
}