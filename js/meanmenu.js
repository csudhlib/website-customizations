/*!
* jQuery meanMenu v2.0.8
* @Copyright (C) 2012-2014 Chris Wharton @ MeanThemes (https://github.com/meanthemes/meanMenu)
*
* Modifications by Zacharry Williams (https://github.com/cooldudezach)
*
*/
/*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* THIS SOFTWARE AND DOCUMENTATION IS PROVIDED "AS IS," AND COPYRIGHT
* HOLDERS MAKE NO REPRESENTATIONS OR WARRANTIES, EXPRESS OR IMPLIED,
* INCLUDING BUT NOT LIMITED TO, WARRANTIES OF MERCHANTABILITY OR
* FITNESS FOR ANY PARTICULAR PURPOSE OR THAT THE USE OF THE SOFTWARE
* OR DOCUMENTATION WILL NOT INFRINGE ANY THIRD PARTY PATENTS,
* COPYRIGHTS, TRADEMARKS OR OTHER RIGHTS.COPYRIGHT HOLDERS WILL NOT
* BE LIABLE FOR ANY DIRECT, INDIRECT, SPECIAL OR CONSEQUENTIAL
* DAMAGES ARISING OUT OF ANY USE OF THE SOFTWARE OR DOCUMENTATION.
*
* You should have received a copy of the GNU General Public License
* along with this program. If not, see <http://gnu.org/licenses/>.
*
* Find more information at http://www.meanthemes.com/plugins/meanmenu/
*/


(function ($) {
	"use strict";
		$.fn.meanmenu = function (options) {
				var defaults = {
						meanMenuTarget: jQuery(this), // Target the current HTML markup you wish to replace
						meanMenuContainer: 'body', // Choose where meanmenu will be placed within the HTML
						// meanMenuContainer: 'body', // Choose where meanmenu will be placed within the HTML
						meanMenuClose: "X", // single character you want to represent the close menu button
						meanMenuCloseSize: "18px", // set font size of close button
						meanMenuOpen: "<span /><span /><span />", // text/markup you want when menu is closed
						meanRevealPosition: "right", // left right or center positions
						meanRevealPositionDistance: "0", // Tweak the position of the menu
						meanLogoTarget: '', // Target the HTML markup of the logo you wish to replace
						meanLogoSrc: '', // Source of the Logo, overrides src from meanLogoTarget but still hides meanLogoTarget if provided
						meanLogoURL: '', // Target the HTML markup of the logo you wish to replace
						meanLogoPosition: "right", // left right or center positions
						meanLogoPositionDistance: "0", // Tweak the position of the menu
						meanAdditionalListElements: [{target: '', id: '', class: '', content: '', contentTarget: '', position: ''}], // Additional list elements to add / create
						meanAdditionalListElementsEnable: false, // enable additional list elements
						meanAdditionalTargetsHide: [{target: '', display: ''}], // Target the HTML markup of the additional links you wish to replace
						meanRevealColour: "", // override CSS colours for the reveal background
						meanScreenWidth: "480", // set the screen width you want meanmenu to kick in at
						meanNavPush: "", // set a height here in px, em or % if you want to budge your layout now the navigation is missing.
						meanShowChildren: true, // true to show children in the menu, false to hide them
						meanExpandableChildren: true, // true to allow expand/collapse children
						meanExpand: "+", // single character you want to represent the expand for ULs
						meanContract: "-", // single character you want to represent the contract for ULs
						meanRemoveAttrs: false, // true to remove classes and IDs, false to keep them
						onePage: false, // set to true for one page sites
						meanDisplay: "block", // override display method for table cell based layouts e.g. table-cell
						removeElements: "" // set to hide page elements
				};
				options = $.extend(defaults, options);

				// get browser width
				var currentWidth = window.innerWidth || document.documentElement.clientWidth;

				return this.each(function () {
						var meanMenu = options.meanMenuTarget;
						var meanContainer = options.meanMenuContainer;
						var meanMenuClose = options.meanMenuClose;
						var meanMenuCloseSize = options.meanMenuCloseSize;
						var meanMenuOpen = options.meanMenuOpen;
						var meanRevealPosition = options.meanRevealPosition;
						var meanRevealPositionDistance = options.meanRevealPositionDistance;
						var meanLogoTarget = options.meanLogoTarget;
						var meanLogoURL = options.meanLogoURL;
						var meanLogoSrc = options.meanLogoSrc;
						var meanLogoPosition = options.meanLogoPosition;
						var meanLogoPositionDistance = options.meanLogoPositionDistance;
						var meanAdditionalListElements = options.meanAdditionalListElements;
						var meanAdditionalListElementsEnable = options.meanAdditionalListElementsEnable;
						var meanAdditionalTargetsHide = options.meanAdditionalTargetsHide;
						var meanRevealColour = options.meanRevealColour;
						var meanScreenWidth = options.meanScreenWidth;
						var meanNavPush = options.meanNavPush;
						var meanRevealClass = ".meanmenu-reveal.meanmenu-bar";
						var meanShowChildren = options.meanShowChildren;
						var meanExpandableChildren = options.meanExpandableChildren;
						var meanExpand = options.meanExpand;
						var meanContract = options.meanContract;
						var meanRemoveAttrs = options.meanRemoveAttrs;
						var onePage = options.onePage;
						var meanDisplay = options.meanDisplay;
						var removeElements = options.removeElements;

						// detect known mobile/tablet usage
						var isMobile = false;
						if ( (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/Android/i)) || (navigator.userAgent.match(/Blackberry/i)) || (navigator.userAgent.match(/Windows Phone/i)) ) {
								isMobile = true;
						}

						if ( (navigator.userAgent.match(/MSIE 8/i)) || (navigator.userAgent.match(/MSIE 7/i)) ) {
							// add scrollbar for IE7 & 8 to stop breaking resize function on small content sites
								jQuery('html').css("overflow-y" , "scroll");
						}

						var meanRevealPos = "";
						var meanLogoPos = "";
						var meanCentered = function() {
							if (meanRevealPosition === "center") {
								var newWidthReveal = window.innerWidth || document.documentElement.clientWidth;
								var meanCenterReveal = ( (newWidthReveal/2)-22 )+"px";
								meanRevealPos = "left:" + meanCenterReveal + ";right:auto;";

								if (!isMobile) {
									jQuery('.meanmenu-reveal').css("left",meanCenterReveal);
								} else {
									jQuery('.meanmenu-reveal').animate({
											left: meanCenterReveal
									});
								}
							}
							// LOGO MOD
							if (meanLogoPosition === "center") {
								var newWidthLogo = window.innerWidth || document.documentElement.clientWidth;
								var meanCenterLogo = ( (newWidthLogo/2)-22 )+"px";
								meanRevealPos = "left:" + meanCenterLogo + ";right:auto;";

								if (!isMobile) {
									jQuery('.meanmenu-reveal').css("left",meanCenterLogo);
								} else {
									jQuery('.meanmenu-reveal').animate({
											left: meanCenterLogo
									});
								}
							}
						};

						var menuOn = false;
						var meanMenuExist = false;


						if (meanRevealPosition === "right") {
								meanRevealPos = "right:" + meanRevealPositionDistance + ";left:auto;";
						}
						if (meanRevealPosition === "left") {
								meanRevealPos = "left:" + meanRevealPositionDistance + ";right:auto;";
						}

						if (meanLogoPosition === "right") {
								meanLogoPos = "right:" + meanLogoPositionDistance + ";left:auto;";
						}
						if (meanLogoPosition === "left") {
								meanLogoPos = "left:" + meanLogoPositionDistance + ";right:auto;";
						}
						// run center function
						meanCentered();

						// set all styles for mean-reveal
						var $navreveal = "";

						var meanInner = function() {
								// get last class name
								if (jQuery($navreveal).is(".meanmenu-reveal.meanclose")) {
										$navreveal.html(meanMenuClose);
								} else {
										$navreveal.html(meanMenuOpen);
								}
						};

						// re-instate original nav (and call this on window.width functions)
						var meanOriginal = function() {
							jQuery('.mean-bar,.mean-push,.mean-overlay').remove();
							jQuery(meanContainer).removeClass("mean-container");
							jQuery(meanMenu).css('display', meanDisplay);
							jQuery(meanLogoTarget).css('display', meanDisplay);
							for(var i = 0; i < meanAdditionalTargetsHide.length; i++) {
								jQuery(meanAdditionalTargetsHide[i].target).css('display', meanAdditionalTargetsHide[i].display);
							}
							menuOn = false;
							meanMenuExist = false;
							jQuery(removeElements).removeClass('mean-remove');
						};

						// navigation reveal
						var showMeanMenu = function() {
								var meanStylesReveal = "background:"+meanRevealColour+";color:"+meanRevealColour+";"+meanRevealPos;
								var meanStylesLogoContainer = "padding:5px;text-indent:0;"+meanLogoPos;
								if (currentWidth <= meanScreenWidth) {
								jQuery(removeElements).addClass('mean-remove');
									meanMenuExist = true;
									// add class to body so we don't need to worry about media queries here, all CSS is wrapped in '.mean-container'
									jQuery(meanContainer).addClass("mean-container");
									var meanLogoTargetSrc = jQuery(meanLogoTarget).attr('src');
									if(meanLogoSrc != "") meanLogoTargetSrc = meanLogoSrc;
									var meanLogoTargetContents = "";
									if(meanLogoTarget != "") {
										meanLogoTargetContents = '<a href="'+meanLogoURL+'" class="meanmenu-reveal meanmenu-logo" style="'+meanStylesLogoContainer+'"><img src="'+meanLogoTargetSrc+'" style=""></a>';
									}
									jQuery('.mean-container').prepend('<div class="mean-bar">'+meanLogoTargetContents+'<a href="#nav" class="meanmenu-reveal meanmenu-bar" style="'+meanStylesReveal+'">Show Navigation</a><nav class="mean-nav"></nav></div>');

									// push meanMenu navigation into .mean-nav
									var meanMenuContents = jQuery(meanMenu).html();
									jQuery('.mean-nav').html(meanMenuContents);
									if(meanAdditionalListElementsEnable === true) {
										for(var i = 0; i < meanAdditionalListElements.length; i++) {
											var hasTarget = false;
											var hasContent = false;
											var hasContentTarget = false;
											var listElement = '';
											
											if (typeof meanAdditionalListElements[i].target !== 'undefined') {
												if(meanAdditionalListElements[i].target !== undefined || meanAdditionalListElements[i].target !== null) {
													hasTarget = true;
												}
											}
											
											if (typeof meanAdditionalListElements[i].content !== 'undefined') {
												if(meanAdditionalListElements[i].content !== undefined || meanAdditionalListElements[i].content !== null) {
													hasContent = true;
												}
											}
											
											if (typeof meanAdditionalListElements[i].contentTarget !== 'undefined') {
												if(meanAdditionalListElements[i].contentTarget !== undefined || meanAdditionalListElements[i].contentTarget !== null) {
													hasContentTarget = true;
												}
											}
											
											if(hasTarget === true) {
												listElement = jQuery(meanAdditionalListElements[i].target).html();
											} else if(hasContentTarget === true) {
												listElement = '<li>'+jQuery(meanAdditionalListElements[i].contentTarget).prop('outerHTML')+'</li>';
											} else if(hasContent === true) {
												listElement = '<li>'+meanAdditionalListElements[i].content+'</li>';
											} else {
												continue;
											} 
											
											if (typeof meanAdditionalListElements[i].position !== 'undefined') {
												if(meanAdditionalListElements[i].position === 'start') {
													jQuery('.mean-nav ul:first').prepend(listElement);
												} else {
													jQuery('.mean-nav ul:first').append(listElement);
												}
											}
										}
									}

									// remove all classes from EVERYTHING inside meanmenu nav
									if(meanRemoveAttrs) {
										jQuery('nav.mean-nav ul, nav.mean-nav ul *').each(function() {
											// First check if this has mean-remove class
											if (jQuery(this).is('.mean-remove')) {
												jQuery(this).attr('class', 'mean-remove');
											} else {
												jQuery(this).removeAttr("class");
											}
											jQuery(this).removeAttr("id");
										});
									}

									// overlay div for meanmenu
									jQuery(meanMenu).before('<div class="mean-overlay mean-overlay-hidden"></div>');
									
									// push in a holder div (this can be used if removal of nav is causing layout issues)
									jQuery(meanMenu).before('<div class="mean-push" />');
									jQuery('.mean-push').css("margin-top",meanNavPush);

									// hide current navigation and reveal mean nav link
									for(var i = 0; i < meanAdditionalTargetsHide.length; i++) {
										jQuery(meanAdditionalTargetsHide[i].target).hide();
									}
									jQuery(meanLogoTarget).hide();
									jQuery(meanMenu).hide();
									jQuery(".meanmenu-reveal").show();

									// turn 'X' on or off
									jQuery(meanRevealClass).html(meanMenuOpen);
									$navreveal = jQuery(meanRevealClass);

									// hide mean-nav ul
									jQuery('.mean-nav ul').hide();

									// hide sub nav
									if(meanShowChildren) {
											// allow expandable sub nav(s)
											if(meanExpandableChildren){
												jQuery('.mean-nav ul ul').each(function() {
														if(jQuery(this).children().length){
																jQuery(this,'li:first').parent().append('<a class="mean-expand" href="#" style="font-size: '+ meanMenuCloseSize +'">'+ meanExpand +'</a>');
														}
												});
												jQuery('.mean-expand').on("click",function(e){
														e.preventDefault();
															if (jQuery(this).hasClass("mean-clicked")) {
																	jQuery(this).text(meanExpand);
																jQuery(this).prev('ul').slideUp(300, function(){});
														} else {
																jQuery(this).text(meanContract);
																jQuery(this).prev('ul').slideDown(300, function(){});
														}
														jQuery(this).toggleClass("mean-clicked");
												});
											} else {
													jQuery('.mean-nav ul ul').show();
											}
									} else {
											jQuery('.mean-nav ul ul').hide();
									}

									// add last class to tidy up borders
									jQuery('.mean-nav ul li').last().addClass('mean-last');
									$navreveal.removeClass("meanclose");
									jQuery(".mean-overlay").addClass("mean-overlay-hidden");
									jQuery(".mean-overlay").click(function(e){toggleNav(e)});
									jQuery($navreveal).click(function(e){toggleNav(e)});
									
									function toggleNav(e){
										e.preventDefault();
										if( menuOn === false ) {
												$navreveal.css("text-align", "center");
												$navreveal.css("text-indent", "0");
												$navreveal.css("font-size", meanMenuCloseSize);
												jQuery('.mean-nav ul:first').slideDown();
												menuOn = true;
										} else {
											jQuery('.mean-nav ul:first').slideUp();
											menuOn = false;
										}
											$navreveal.toggleClass("meanclose");
											jQuery(".mean-overlay").toggleClass("mean-overlay-hidden");
											meanInner();
											jQuery(removeElements).addClass('mean-remove');
									}

									// for one page websites, reset all variables...
									if ( onePage ) {
										jQuery('.mean-nav ul > li > a:first-child').click(function (event) {
											if(jQuery(this).hasClass("preventSlide") == false) {
												jQuery('.mean-nav ul:first').slideUp();
												menuOn = false;
												jQuery($navreveal).toggleClass("meanclose").html(meanMenuOpen);
												jQuery(".mean-overlay").toggleClass("mean-overlay-hidden");
											} else {
												event.preventDefault();
												jQuery(this).parent().children('.mean-expand:first').click();
											}
										});
									}
							} else {
								meanOriginal();
							}
						};

						if (!isMobile) {
								// reset menu on resize above meanScreenWidth
								jQuery(window).resize(function () {
										currentWidth = window.innerWidth || document.documentElement.clientWidth;
										if (currentWidth > meanScreenWidth) {
												meanOriginal();
										} else {
											meanOriginal();
										}
										if (currentWidth <= meanScreenWidth) {
												showMeanMenu();
												meanCentered();
										} else {
											meanOriginal();
										}
								});
						}

					jQuery(window).resize(function () {
								// get browser width
								currentWidth = window.innerWidth || document.documentElement.clientWidth;

								if (!isMobile) {
										meanOriginal();
										if (currentWidth <= meanScreenWidth) {
												showMeanMenu();
												meanCentered();
										}
								} else {
										meanCentered();
										if (currentWidth <= meanScreenWidth) {
												if (meanMenuExist === false) {
														showMeanMenu();
												}
										} else {
												meanOriginal();
										}
								}
						});

					// run main menuMenu function on load
					showMeanMenu();
				});
		};
})(jQuery);
