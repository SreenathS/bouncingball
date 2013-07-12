/*
	Project : bouncing-ball
	To sets-up the environment.
*/

_.onLoad(function(){

	// To prevent default scroll behaviour in mobile devices
	_.addListener( document, 'touchmove', function(event){
		event.preventDefault();
	} );

});