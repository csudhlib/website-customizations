/* <!-- Piwik --> */
var sites = ["padding", "www.csudh.edu/library", "csudh-primo.hosted.exlibrisgroup.com", "library.csudh.edu", "libguides.csudh.edu", "csudh.libanswers.com", "csudh.libcal.com", "csudh-illiad-oclc-org.libproxy.csudh.edu"];
var currentSite = window.location.hostname == "www.csudh.edu" ? window.location.hostname + "/" + window.location.pathname.split('/')[1] : window.location.hostname;
console.log('matomo: currentsite: ' + currentSite);
console.log('matomo: sites.indexOf(currentSite): ' + sites.indexOf(currentSite));
if(sites.indexOf(currentSite) > 0) {
	console.log('matomo: success for ' + currentSite);
	var _paq = _paq || [];
	/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
	_paq.push(["setDomains", sites]);
	_paq.push(["enableCrossDomainLinking"]);
	_paq.push(["setDoNotTrack", true]);
	_paq.push(['trackPageView']);
	_paq.push(['enableLinkTracking']);
	(function() {
		var u="//library.csudh.edu/analytics/";
		_paq.push(['setTrackerUrl', u+'piwik.php']);
		var siteID = sites.indexOf(currentSite) > 0 ? sites.indexOf(currentSite): window.location.hostname;
		_paq.push(['setSiteId', siteID]);
		var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
		g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
	})();
	/* This noscript can be placed in the HTML to enable image tracking for users with javascript disabled.
	<noscript><p><img src="//library.csudh.edu/analytics/piwik.php?idsite=1&rec=1" style="border:0;" alt="" /></p></noscript>
	<!-- End Piwik Code -->
	*/
}