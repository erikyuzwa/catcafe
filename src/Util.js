var Util = {
	distance: function(x1, y1, x2, y2){
		return Math.sqrt( (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) );	
	},
	randomSign: function(){
		return Math.floor(Math.random() * 3) - 1;
	},
	rand: function(low, hi){
		return Math.floor(Math.random() * (hi - low + 1)) + low;
	},
	randomElementOf: function(array){
		return array[Util.rand(0, array.length-1)];
	},
	noop: function(){
		return true;
	}
}

module.exports = Util;