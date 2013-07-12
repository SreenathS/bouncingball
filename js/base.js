/*
	Project : bouncing-ball
	A generic base for with all the utility code.
*/

(function(){

	var base = function(id){ return document.getElementById(id); };

	base.isIE = window.attachEvent!=null;
	base.isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) || (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.platform)));

	base.addListener = function( element, type, eventListener ){
		if( element.addEventListener ) element.addEventListener( type, eventListener, false );
		else if( element.attachEvent ){

			if( type.indexOf("mouse")!=-1 ) eventListener._IEEventInjectionClosure = function(event){ // Fixing IE
				event = event||window.event;
				if( !event.pageX ){
					var body = document.body;
					event.pageX = event.clientX + (event.scrollLeft || body.scrollLeft || 0);
					event.pageY = event.clientY + (event.scrollTop || body.scrollTop || 0);
				}
				event.which = event.button;
				eventListener(event);
			};
			else eventListener._IEEventInjectionClosure = function(event){ eventListener(event||window.event); };
			
			element.attachEvent( "on" + type, eventListener._IEEventInjectionClosure );	
		}
	};

	base.removeListener = function( element, type, eventListener ){
		if( element.removeEventListener ) element.removeEventListener( type, eventListener, false );
		else if( element.detachEvent ){
			element.detachEvent( "on" + type, eventListener._IEEventInjectionClosure );
			eventListener._IEEventInjectionClosure = null;
		}
	};

	base.onLoad = function( listener ){
		function onLoadClosure(event){
			listener(event);
			base.removeListener( window, "load", onLoadClosure);
			listener=null;
		}
		base.addListener( window, "load", onLoadClosure);
	};

	window._ = base;

})();