/*
	Project : bouncing-ball
	A generic base for with all the utility code.
*/

(function(){

	var base = function(id){ return document.getElementById(id); };

	base.addListener = function( element, type, eventListener ){
		if( element.addEventListener ) element.addEventListener( type, eventListener, false );
		else if( element.attachEvent ) element.attachEvent( "on" + type, eventListener );
	};

	base.onLoad = (function(){

		var handlers = [];

		// Conserving existing onload if any, is scoped out.
		window.onload = function(e){
			e = e||window.event;
			for( var index in handlers ) handlers[index](e);
		};

		return function( handler ){
			handlers.push( handler );
		};

	})();

	window._ = base;

})();