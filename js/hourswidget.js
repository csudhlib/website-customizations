/* begin hours widget */
	// create hours script
	$( document ).ready(function() {
		var s=document.createElement('script');
		s.src='//api3.libcal.com/api_hours_today.php?iid=1095&format=json&callback=displayLibraryTodayHours';
		document.body.appendChild(s);
	});

	// create hours table
	function displayLibraryTodayHours(data){
		$( document ).ready(function() {
			if($('.todayHoursWidget').length) {
				$('.todayHoursWidget').each(function() {
					$(this).empty();
					obj = JSON.parse(JSON.stringify(data));
					var container = $('<div></div>');
					var table = $('<table></table>');
					// var caption = $('<h1></h1>').html('<a href="//www.csudh.edu/library/info/hours/index" target="_blank">Today\'s Hours</a>');
					// container.append(caption);
					for(var i = 0, len = obj.locations.length; i < len; i++) {
						var row = $('<tr></tr>');
						var rowHeader = $('<td></td>').addClass('hoursHeader').text(obj.locations[i].name);
						var rowBody = $('<td></td>').addClass('hoursBody');
						var rowBodyDiv = $('<div></div>').addClass('hoursDiv');
						
						if(obj.locations[i].times.status != "open") {
							rowBodyDiv.html('Closed');
						} else {
							rowBodyDiv.html(obj.locations[i].times.hours[0].from + ' - ' + obj.locations[i].times.hours[0].to);
						}
						
						rowBody.append(rowBodyDiv);
						row.append(rowHeader);
						row.append(rowBody);
						table.append(row);
						container.append(table);

					}
					$(this).append(container);
				});
			}
		});
	}
/* end hours widget */