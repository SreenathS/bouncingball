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
	var Circle = function( element, base, radious ){

		// --- Private variables ---
		var _controllers = {};
		var _pos = getPosition( element );
		var _radius = radious || parseInt(element.getAttribute("phyradious")) || element.offsetWidth/2;
		var thisC = this;

		// --- Public variables ---
		this.name = Circle.NAME;
		this.htmlElement = element; // Must be made private
		this.base = base;
		
		this.lazyPosX = 0, this.lazyPosY = 0;
		this.vX = 2, this.vY = 3;
		this.radius = _radius;

		this.lazyColliders = {}; // A collection of all colliders
		
		// --- Public functions ---

		// --- Variable Pool for colliders ---
			var dX, dY, hyp;
			var nX, nY;
			var centerX, centerY;
			var vector;
		// --- Variable Pool for colliders ---

		// --- For circle to circle collision ---
		this.lazyColliders[Circle.NAME] = function( thatC ){
			
			dX = thatC.lazyPosX - thisC.lazyPosX, dY = thatC.lazyPosY - thisC.lazyPosY;
			hyp = Math.sqrt(dX * dX + dY * dY); // Distance between the center positions of circles

			if (hyp < (thatC.radius + _radius)) {

				nX = dX / hyp, nY = dY / hyp; // Collision normal

				centerX = (thisC.lazyPosX + thatC.lazyPosX) * .5; // Point of gravity of collision
				centerY = (thisC.lazyPosY + thatC.lazyPosY) * .5;

				// Rebound the circles
				thisC.lazyPosX = centerX - nX * _radius, thisC.lazyPosY = centerY - nY * _radius;
				thatC.lazyPosX = centerX + nX * thatC.radius, thatC.lazyPosY = centerY + nY * thatC.radius;

				vector = ((thisC.vX - thatC.vX) * nX) + ((thisC.vY - thatC.vY) * nY);
				dX = vector * nX, dY = vector * nY;

				thisC.vX -= dX, thisC.vY -= dY;
				thatC.vX += dX, thatC.vY += dY;

			}

		};

		this.getPos = function(){ return {x:_pos.x, y:_pos.y}; }; // Cloning pos, Hence!

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
			var controller = new ControllerClass( thisC );
			_controllers[ controller.name ] = controller;
		};

		this.draw = function(){
			thisC.setPos({
				x: thisC.lazyPosX,
				y: thisC.lazyPosY
			});
		};

		// Moves the shape based on velocity and do a bound check & rebound if required.
		this.lazyMoveInBound = function( bound, timeFactor ){

			thisC.lazyPosX = _pos.x + thisC.vX * timeFactor,
			thisC.lazyPosY = _pos.y + thisC.vY * timeFactor;

			if (thisC.lazyPosX < _radius) thisC.lazyPosX = _radius, thisC.vX *= -1;
			else if (thisC.lazyPosX > bound.width-_radius) thisC.lazyPosX = bound.width-_radius, thisC.vX *= -1;

			if (thisC.lazyPosY < _radius) thisC.lazyPosY = _radius, thisC.vY *= -1;
			else if (thisC.lazyPosY > bound.height-_radius) thisC.lazyPosY = bound.height-_radius, thisC.vY *= -1;

		};

		// Destroys this instance
		this.dispose = function(){
			thisC.htmlElement =
			thisC.base =
			element =
			base =
			_controllers = null;
		};

	};
	Circle.NAME = "Shape:Circle";

	Phy.shapes.Circle = Circle;

})();