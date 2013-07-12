/*
	Project : bouncing-ball
	Circle : Physical 2D representation of the ball.
	Dependency : PhysicsBase.js
*/

(function(){

	// Not the best place
	function getPosition( element ){

		var left, top;
		if( window.getComputedStyle ){
			var style = window.getComputedStyle(element);
			left = style.getPropertyValue('left');
			top = style.getPropertyValue('left');
		}
		else{
			left = element.currentStyle.left;
			top = element.currentStyle.top;
		}

		return { x:parseInt(left), y:parseInt(top) };

	}

	// Ideally, most of these functionalities must be in a super class named 'Shape'. Scoping out for the time being.
	var Circle = function( element, base ){

		// --- Private variables ---
		var _controllers = {};
		var _pos = getPosition( element );

		// --- Public functions ---
		this.htmlElement = element; // Must be made private
		this.base = base;
		
		this.getPos = function(){ return {x:_pos.x, y:_pos.y}; };

		this.setPos = _.isIE ? function( pos ){
			_pos = pos;
			element.style.left = pos.x,
			element.style.top = pos.y;
		} : function( pos ){
			_pos = pos;
			element.style.left = pos.x+"px",
			element.style.top = pos.y+"px";
		};

		this.addController = function( ControllerClass ){
			var controller = new ControllerClass( this );
			_controllers[ controller.name ] = controller;
		};

		// Destroys this instance
		this.dispose = function(){
			this.htmlElement =
			this.base =
			element =
			base =
			_controllers = null;
		};

	};

	Phy.shapes.Circle = Circle;

})();