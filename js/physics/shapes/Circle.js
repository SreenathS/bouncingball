/*
	Project : bouncing-ball
	Circle : Physical 2D representation of the ball.
	Dependency : PhysicsBase.js
*/

(function(){

	// Ideally, most of these functionalities must be in a super class named 'Shape'. Scoping out for the time being.
	var Circle = function( element, base ){

		// --- Private variables ---
		var _controllers = {};

		// --- Public functions ---
		this.htmlElement = element;
		this.base = base;
		
		this.getPos = function(){
			var style = window.getComputedStyle(element);
			return { x:parseInt(style.getPropertyValue('left')), y:parseInt(style.getPropertyValue('top')) };
		};

		this.setPos = _.isIE ? function( pos ){
			element.style.left = pos.x,
			element.style.top = pos.y;
		} : function( pos ){
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