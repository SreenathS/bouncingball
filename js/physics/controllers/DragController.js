/*
	Project : bouncing-ball
	DragController : Controlleg dragging of a shape, and ensures working of the same across all platforms.
	Note : Must be inherited from an abstract controller class in ideal case. Scoping out for the time being.
*/

(function(){

	var DragController = function( shape ){

		// --- Private variables ---
		var _dragStartPos = null;
		var _tmpPos = { x:0, y:0 };
		var _shapeStartPos = null;

		// --- Public variables ---
		this.name = DragController.NAME;

		// --- Private functions ---
		function onMouseDrag( event ){
			if( event.which!=1 ) stopDrag(); // Yup only in browsers who supports which
			else{
				_tmpPos.x = event.pageX-_dragStartPos.x+_shapeStartPos.x,
				_tmpPos.y = event.pageY-_dragStartPos.y+_shapeStartPos.y;

				shape.setPos( _tmpPos );
			}
		}

		function startDrag( event ){
			_shapeStartPos = shape.getPos();
			_dragStartPos = { x: event.pageX, y: event.pageY };
			_.addListener( shape.base.htmlElement, "mousemove", onMouseDrag );
		}

		function stopDrag( event ){
			_.removeListener( shape.base.htmlElement, "mousemove", onMouseDrag );
			_.removeListener( shape.base.htmlElement, "touchmove", onTouchDrag );
			_dragStartPos = null;
		}

		_.addListener( shape.htmlElement, "mousedown", startDrag );
		_.addListener( shape.htmlElement, "mouseup", stopDrag );
		_.addListener( shape.base.htmlElement, "mouseup", stopDrag );

		function onTouchDrag( event ){
			var touch = event.touches[0];
			_tmpPos.x = touch.pageX-_dragStartPos.x+_shapeStartPos.x,
			_tmpPos.y = touch.pageY-_dragStartPos.y+_shapeStartPos.y;

			shape.setPos( _tmpPos );
		}

		function touchDrag( event ){
			_shapeStartPos = shape.getPos();
			var touch = event.touches[0];
			_dragStartPos = { x: touch.pageX, y: touch.pageY };
			_.addListener( shape.base.htmlElement, "touchmove", onTouchDrag );
		}

		_.addListener( shape.htmlElement, "touchstart", touchDrag );
		_.addListener( shape.htmlElement, "touchend", stopDrag );
		_.addListener( shape.base.htmlElement, "touchend", stopDrag );

		// Destroys this instance
		this.dispose = function(){
			stopDrag();
			shape =
			_dragStartPos =
			_dragDelta = null;
		};

	};
	DragController.NAME = "DragController";

	Phy.controllers.DragController = DragController;

})();