/* begin landing page mods */
$( document ).ready(function() {
	// grabbing and moving the parent allows the areas to be edited in CM1 more easily
	$("#background-wrapper div div").append($(".backgroundreplacement").parent());
	$("#landingmessage-wrapper div:first").prepend($(".landingmessageheader").parent());
});
/* end landing page mods */