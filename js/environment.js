/*
	Project : bouncing-ball
	To sets-up the environment.
*/

_.onLoad(function(){

	// Setup the UI
	var phy = new PhysicsBase(_("base"));
	var ball = phy.getChildById("ball");
	ball.addController( Phy.controllers.DragController );

	ball.setPos({x:window.innerWidth/2, y:window.innerHeight/2});

	// To prevent default scroll behaviour in mobile devices
	_.addListener( document, 'touchmove', function(event){
		event.preventDefault();
	} );

});