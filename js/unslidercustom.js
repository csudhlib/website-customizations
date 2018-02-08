/* begin unslider initialization */
	$( document ).ready(function() {
		// if a slide is marked as important, it will become the default index and wait longer before proceeding
		// note: if there is more than one slide with the important class, the first of them will be the default slide
		if($('li.important').index() >= 0) {
			var newdelay = 100000;
			var newindex = $("li.important").index();
		} else {
			var newdelay = 10000;
			var newindex = Math.floor((Math.random() * $('.fading-slider').find('li').length));
		}
		$('.fading-slider').unslider({
			animation: 'fade',
			autoplay: true,
			delay: newdelay,
			index: newindex,
			arrows: {
				// start: '<a class="unslider-arrow start fa fa-play"></a>',
				// stop: '<a class="unslider-arrow stop fa fa-pause"></a>',
				prev: '<a class="unslider-arrow prev fa fa-chevron-left"></a>',
				next: '<a class="unslider-arrow next fa fa-chevron-right"></a>'
			}
		});
		
		// remove the slide header if empty
		$('.fading-slider .textHeader').each(function(index) {
			if($(this).html() === '<span>&nbsp;</span>')
				$(this).remove();
		});
		
		// remove the slide text if empty
		$('.fading-slider .textBody').each(function(index) {
			if($(this).html() === '<span>&nbsp;</span>')
				$(this).remove();
			else $(this).find('span').append(' <span style="margin-left: calc(25px * ' + ($('.fading-slider').find('li').length + 2) + ')"></span>');
		});
	});
/* end unslider initialization */