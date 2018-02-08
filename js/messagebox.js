if($('#alertcontainer').length) {
	$.get("//cm1.csudh.edu/Assets/CSUDH-Sites/Library/alerts/alert.txt", function(data) {
		data = jQuery.parseJSON(data);
		var nowTime = new Date().getTime();
		if (nowTime > new Date(data.showTime).getTime() && nowTime < new Date(data.hideTime).getTime()) {
			var latestAffectedStartTime = 28800000;
			var latestAffectedEndTime = 28800000; //not used for now
			var latestMessage = "";
			for (var i = 0; i < data.messages.length; i++) {
				if(new Date(data.messages[i].affectedStartTime).getTime() > latestAffectedStartTime) {
					latestAffectedStartTime = new Date(data.messages[i].affectedStartTime).getTime();
					latestAffectedEndTime = new Date(data.messages[i].affectedEndTime).getTime();
					latestMessage = data.messages[i].message;
				}
			}

			if(latestAffectedStartTime > 0) {
				$('#alertcontainer').empty();
				$('#alertcontainer').append($('<h1>'+data.title+'</h1>'));
				$('#alertcontainer').append($('<h2>As of '+new Date(latestAffectedStartTime).toLocaleTimeString('en-US')+' - '+new Date(latestAffectedStartTime).toLocaleDateString('en-US')+'</h2>'));
				$('#alertcontainer').append($('<h2>'+latestMessage+'</h2>'));
				$('#alertcontainer').attr('aria-hidden', 'false').show();
			}
		} else {
			$('#alertcontainer').attr('aria-hidden', 'true').hide();
		}

	});
} else {
	$( document ).ready(function() {
		var nowtime = new Date().getTime();
		var starttime1 = new Date($('#starttime').val()).getTime();
		var endtime1 = new Date($('#endtime').val()).getTime();

		if (nowtime > starttime1 && nowtime < endtime1) {
			$('#hideme').attr('aria-hidden', 'false').show();
		} else {
			$('#hideme').attr('aria-hidden', 'true').hide();
		}
	});
}
