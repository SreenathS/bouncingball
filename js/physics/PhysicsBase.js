/*
	Project : bouncing-ball
	PhysicsBase : A container for other physical objects.
*/

(function(){

	// --- Private static constants ---
	var CLASS_ATTRIBUTE = "phyclass";
	var RENDER_INTERVAL = 1000/60;
	var NAME_PREFIX = "Phy"+Math.round(Math.random()*10000);

	// --- Private static functions ---
	function setupChildren( base, baseElement ){

		var children = [];
		var childElements = baseElement.getElementsByTagName('*'); //W3C

		for( var index=0, length=childElements.length; index<length; index++ ){

			var child = childElements[index];

			var className = child.getAttribute(CLASS_ATTRIBUTE);
			var childClass = Phy.shapes[className];

			if( childClass ) children.push( new childClass( child, base ) );

		}

		return children;

	}

	function getChildHash( children ){
		var idHash = {};
		var id, child;
		
		for( var index=0, length=children.length; index<length; index++ ){
			child = children[index].htmlElement;
			id = child.getAttribute("id");
			if( !id ){
				id = (NAME_PREFIX+index);
				child.setAttribute(id);
			}
			idHash[id] = children[index];
		}

		return idHash;
	}

	function render( baseElement, children ){
		// Render code
	}

	// The Class
	var Phy = function( element ){

		// --- Private variables ---
		var _children = setupChildren( this, element );
		var _childHash = getChildHash( _children );
		var _timerId = null;

		this.htmlElement = element;

		// --- Private functions ---
		function callRender(){
			render( element, _children );
		}

		// --- Public functions ---
		// Start if not running.
		this.start = function(){
			if( _timerId ) return false;
			_timerId = setInterval( callRender,RENDER_INTERVAL );//Make use of requestAnimationFrame
			return true;
		};

		// Stop if running.
		this.stop = function stop(){
			if( !_timerId ) return false;
			clearInterval(_timerId);
			_timerId = null;
			return true;
		};

		this.getChildById = function(id){
			return _childHash[id];
		};

		// Destroys this instance
		this.dispose = function(){
			stop();
			// Loop through and destroy the children, and destroy public functions
			element =
			_children =
			_childHash =
			_timerId = null;
		};

	};
	Phy.shapes={}; // All the shapes must be registered here.
	Phy.controllers={}; // All the shapes must be registered here.

	window.PhysicsBase = 
	window.Phy = Phy;

})();