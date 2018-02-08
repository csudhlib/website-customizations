/* begin initialize mobile menu */
jQuery(document).ready(function () {
	if(jQuery('#nav').length) {
		jQuery('#nav').meanmenu({
			meanAdditionalTargetsHide: [{
				target: 'prm-topbar #header',
				display: 'table'
			}],
			meanAdditionalLinksPosition: true,
			meanAdditionalLinksTarget: '#audiencenav',
			meanLogoTarget: '#logo img',
			meanLogoSrc: '//www.csudh.edu/Assets/CSUDH-Sites/Brand/docs/csudh_logo_White.png',
			meanLogoURL: '//www.csudh.edu',
			meanLogoPosition: 'left',
			meanMenuContainer: 'prm-topbar',
			meanScreenWidth: "980"
		});
	}
});
/* begin initialize mobile menu */
