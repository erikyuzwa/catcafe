var DESERT_FALLING = {
	milkShake: [35, 36, 37, 38, 39],
	coffee: [43, 44, 45, 46, 47],
	cake: [59, 60, 61, 62, 63],
	puddin: [52, 53, 54, 55, 56, 57]
};

module.exports = {
	kitchenCounter: 0,
	init: function(catCafe){
		this.catCafe = catCafe;
		this.sprite = catCafe.game.add.sprite(40, 140, 'tileset', 0, catCafe.entitiesGroup);
		this.sprite.anchor.setTo(0.5, 1);
		catCafe.game.physics.arcade.enable(this.sprite);
		this.sprite.body.collideWorldBounds = true;
		this.sprite.body.setSize(14, 7, 9, 25);
		this.sprite.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7], 8, true);
		this.sprite.animations.add('scared', [8, 9, 10], 8, false);
		
		this.binSprite = catCafe.game.add.sprite(0, 0, 'tileset', 16, catCafe.entitiesGroup);
		this.binSprite.animations.add('walk', [16, 17, 18, 19, 18, 17], 8, true);
		this.binSprite.anchor.setTo(0.4, 1.0);
		this.binSprite.visible = true;

		this.milkShakeSprite = catCafe.game.add.sprite(0, 0, 'tileset', 32, catCafe.entitiesGroup);
		this.milkShakeSprite.animations.add('walk', [32, 33], 4, true);
		this.milkShakeSprite.anchor.setTo(0.15, 0.85);
		this.milkShakeSprite.visible = false;
		
		this.coffeeSprite = catCafe.game.add.sprite(0, 0, 'tileset', 40, catCafe.entitiesGroup);
		this.coffeeSprite.animations.add('walk', [40, 41, 42], 4, true);
		this.coffeeSprite.anchor.setTo(0.1, 0.85);
		this.coffeeSprite.visible = false;

		this.cakeSprite = catCafe.game.add.sprite(0, 0, 'tileset', 58, catCafe.entitiesGroup);
		this.cakeSprite.animations.add('walk', [58], 4, true);
		this.cakeSprite.anchor.setTo(0.1, 0.85);
		this.cakeSprite.visible = false;

		this.puddinSprite = catCafe.game.add.sprite(0, 0, 'tileset', 48, catCafe.entitiesGroup);
		this.puddinSprite.animations.add('walk', [48, 49, 50, 51], 4, true);
		this.puddinSprite.anchor.setTo(0.1, 0.85);
		this.puddinSprite.visible = false;

		this.sprite.addChild(this.binSprite);
		this.sprite.addChild(this.milkShakeSprite);
		this.sprite.addChild(this.coffeeSprite);
		this.sprite.addChild(this.puddinSprite);
		this.sprite.addChild(this.cakeSprite);

		this.cursors = catCafe.game.input.keyboard.createCursorKeys();
	},
	pickMilkShake: function(){
		this.milkShakeSprite.visible = true;
		this.coffeeSprite.visible = false;
		this.binSprite.visible = true;
		this.cakeSprite.visible = false;
		this.puddinSprite.visible = false;
		this.currentFood = 'milkShake';
	},
	pickCoffee: function(){
		this.coffeeSprite.visible = true;
		this.milkShakeSprite.visible = false;
		this.cakeSprite.visible = false;
		this.puddinSprite.visible = false;
		this.binSprite.visible = true;
		this.currentFood = 'coffee';
	},
	pickCake: function(){
		this.cakeSprite.visible = true;
		this.coffeeSprite.visible = false;
		this.milkShakeSprite.visible = false;
		this.puddinSprite.visible = false;
		this.binSprite.visible = true;
		this.currentFood = 'cake';
	},
	pickPuddin: function(){
		this.cakeSprite.visible = false;
		this.coffeeSprite.visible = false;
		this.puddinSprite.visible = true;
		this.milkShakeSprite.visible = false;
		this.binSprite.visible = true;
		this.currentFood = 'puddin';
	},
	pickNone: function(){
		this.cakeSprite.visible = false;
		this.coffeeSprite.visible = false;
		this.milkShakeSprite.visible = false;
		this.puddinSprite.visible = false;
		this.currentFood = false;
	},
	dropFood: function(){
		this.cakeSprite.visible = false;
		this.coffeeSprite.visible = false;
		this.binSprite.visible = false;
		this.milkShakeSprite.visible = false;
		this.puddinSprite.visible = false;
		var fallSprite = this.catCafe.game.add.sprite(this.sprite.x, this.sprite.y, 'tileset', DESERT_FALLING[this.currentFood][0], this.catCafe.backgroundGroup);
		fallSprite.anchor.setTo(0.1, 0.9);
		if (this._flipped)
			fallSprite.scale.x *= -1;
		fallSprite.animations.add('fall', DESERT_FALLING[this.currentFood], 4, false);
		fallSprite.animations.play('fall');
		this.sprite.animations.play('scared');
		this.scared = true;
		this.catCafe.game.time.events.add(1000, this.recoverMovement, this);
		this.currentFood = false;
		this.catCafe.resetFoodSprite();
		this.catCafe.reduceHearts();
	},
	recoverMovement: function(){
		this.scared = false;
	},
	deliverFood: function(){
		this.cakeSprite.visible = false;
		this.coffeeSprite.visible = false;
		this.binSprite.visible = false;
		this.milkShakeSprite.visible = false;
		this.puddinSprite.visible = false;
		this.currentFood = false;
		this.catCafe.resetFoodSprite();
		this.catCafe.increaseScore();
	},
	_flipSprite: function(){
		this._flipped = !this._flipped;
		this.sprite.scale.x *= -1;
	},
	update: function(){
		if (this.dead || this.scared){
			return;
		}
		this.sprite.body.drag.x = 0;
		this.sprite.body.drag.y = 0;
		var idle = true;
		if (this.cursors.left.isDown) {
			idle = false;
	        this.sprite.body.velocity.x = -60;
	        if (!this._flipped){
	        	this._flipSprite();
	        }
	    } else if (this.cursors.right.isDown) {
	    	idle = false;
	        this.sprite.body.velocity.x = 60;
	        if (this._flipped){
	        	this._flipSprite();
	        }
	    } else {
	    	this.sprite.body.velocity.x = 0;
	    }
		
	    if (this.cursors.up.isDown) {
	    	idle = false;
	        this.sprite.body.velocity.y = -40;
	    } else if (this.cursors.down.isDown) {
	    	idle = false;
	    	this.sprite.body.velocity.y = 40;
	    } else {
	    	this.sprite.body.velocity.y = 0;
	    }
	    if (idle){
	    	this.sprite.frame = 0;
	    	this.sprite.animations.stop();
	    	this.milkShakeSprite.animations.stop();
	    	this.coffeeSprite.animations.stop();
	    	this.binSprite.animations.stop();
	    	this.binSprite.frame = 16;
	    	this.puddinSprite.animations.stop();
	    	this.cakeSprite.animations.stop();
	    } else {
	    	this.sprite.animations.play('walk');
	    	this.milkShakeSprite.animations.play('walk');
	    	this.coffeeSprite.animations.play('walk');
	    	this.binSprite.animations.play('walk');
	    	this.puddinSprite.animations.play('walk');
	    	this.cakeSprite.animations.play('walk');
	    }
		
	},
	kill: function(){
		this.dead = true;
		this.sprite.frame = 0;
		this.sprite.body.velocity.x = 0;
		this.sprite.body.velocity.y = 0;
    	this.sprite.animations.stop();
	    	
	}
}