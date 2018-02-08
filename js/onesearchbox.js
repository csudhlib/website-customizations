function searchPrimo() {
	$("#primoJournalsQuery").attr("value", $("#primoJournalsQueryPadding").attr("value") + $("#query").attr("value").replace(/[,]/g, " "));
	$("#primoQuery").attr("value", $("#primoQueryPadding").attr("value") + $("#query").attr("value").replace(/[,]/g, " "));
	$("form[name=searchForm]").submit();
}

function primoScopeSwitch(scope) {
	if($(scope).attr("value") == "csudh") {
		$("form[name=searchForm]").attr("action", "http://www.google.com/cse");
		$("#query").attr("placeholder", "Search all of csudh.edu");
		$("#primoQueryPadding").attr("value", "");
	} else {
		$("form[name=searchForm]").attr("action", "https://csudh-primo.hosted.exlibrisgroup.com/primo-explore/search");
		switch($(scope).attr("value")) {
			case "jsearch_slot":
				$("form[name=searchForm]").attr("action", "https://csudh-primo.hosted.exlibrisgroup.com/primo-explore/jsearch");
				$("#primoScope").attr("value", "EVERYTHING");
				$("#query").attr("placeholder", "Search Journals and Magazines A-Z");
				break;

			case "articles":
				$("#primoScope").attr("value", "articles");
				$("#query").attr("placeholder", "Search databases and peer reviewed journals");
				break;

			case "books_local":
				$("#primoScope").attr("value", "01CALS_UDH");
				$("#query").attr("placeholder", "Search items found here in the library");
				break;

			case "books_csu":
				$("#primoScope").attr("value", "01CALS");
				$("#query").attr("placeholder", "Find items from all CSU libraries");
				break;

			case "course_reserves":
				$("#primoScope").attr("value", "01CALS_UDH_CR");
				$("#query").attr("placeholder", "Search Course Reserves found here in the library");
				break;

			case "everything":
			default:
				$("#primoScope").attr("value", "EVERYTHING");
				$("#query").attr("placeholder", "Discover books, articles, videos, and more");
		}
		$("#primoTab").attr("value", $(scope).attr("value"));
		$("#primoQueryPadding").attr("value", "any,contains,");
	}
}

// move the onesearch box and header, this is only for the home page
$( document ).ready(function() {
	if($("#titlewrapper").length)
		$("#titlewrapper").insertBefore("#contentspacing");
});
