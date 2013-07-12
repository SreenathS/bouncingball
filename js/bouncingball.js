/*
	Project : bouncing-ball
	Bouncing Ball specific code.
*/

_.onLoad(function(){

	// Setup the UI
	var phy = new PhysicsBase(_("base"));
	var ball = phy.getChildById("ball");
	ball.addController( Phy.controllers.DragController );

	ball.setPos({x:phy.htmlElement.offsetWidth/2, y:phy.htmlElement.offsetHeight/2});

});