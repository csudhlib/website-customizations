$( document ).ready(function() {
	/* begin dropdown navigation scripting */
		// move sub navigation to top of page
		$('<div id="meanMenuContainer" class=""></div>').insertAfter($('#header'));
		$("#nav").empty().removeClass().css("z-index", "9");
		$("#nav").append($(".subnav"));

		// fix the current nav item always showing
		$(".current").removeClass( "current" ).addClass( "currentFix" );

		// add a Library link at the beginning; padding is for the navigation fix
		var sitename = $(".nav-title ul li:first").text().trim();
		var sitebaseurl = window.location.pathname.split('/')[1];
		$(".subnav .sf-menu").prepend('<li class="nav-level-3 nav-entry-1 list-position-1"><a href="//www.csudh.edu/' + sitebaseurl + '/" title="' + sitename + '" class="navfirst">' + sitename + '</a></li>');

		// remove original side navigation
		$("#sectionnav").remove();

		// add dropdown arrows to menu items with submenus
		$( ".subnav .sf-menu li:has(ul) > a" ).append( '<span class="has-child"></span>' );

		// prevent clicking on the dropdown arrows so touch users can open submenus
		$('.has-child').click(function(event) { event.preventDefault(); });
	/* end dropdown navigation scripting */

	/* begin main content area fixes */
		// fix the main content area to use the full page
		$(".perc-region.span_2_of_3").removeClass( "span_2_of_3" ).addClass( "span_3_of_3" );
	/* end main content area fixes */

	/* begin manipulation of links at the top right of the page */
		// remove the links at the top of the page
		$("#audiencenav").children().remove();

		// add new links to the top of the page
		if(sitebaseurl != "library") {
			$("#audiencenav").append('<li><a href="//www.csudh.edu/library/index" title="Library">Library</a></li>');
		}
		$("#audiencenav").append('<li><a href="https://csudh-primo.hosted.exlibrisgroup.com/primo-explore/account?vid=01CALS_UDH" title="My Library Account">My Library Account</a></li>');
		$("#audiencenav").append('<li><a href="https://toro.csudh.edu/" title="BlackBoard">BlackBoard</a></li>');
		$("#audiencenav").append('<li><a href="https://my.csudh.edu/" title="MyCSUDH">MyCSUDH</a></li>');
		$("#audiencenav").append('<li><a href="//www.csudh.edu/library/about/feedback/index" title="Feedback">Feedback</a></li>');
	/* end manipulation of links at the top right of the page */
});
