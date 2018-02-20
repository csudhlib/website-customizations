/**
* JavaScript Get URL Parameter
* 
* Found at https://www.kevinleary.net/javascript-get-url-parameters/
* Modified to add @param array; fixed window.location search bug;
* 
* @param String prop The specific URL parameter you want to retreive the value for
* @param String array Whether or not to return the list of props as an array or a string
* @return String|Object If prop is provided a string value is returned, otherwise an object of all properties is returned
*/
function getUrlParams(prop, array) {
	var params = {};
	var search = window.location.href.indexOf('?') > 0 ? decodeURIComponent(window.location.href.slice(window.location.href.indexOf('?') + 1)) : '';
	var definitions = search.split('&');

	definitions.forEach(function(val, key) {
		var parts = val.split('=', 2);
		params[parts[0]] = parts[1];
	});

	return (!array) ? search : (prop && prop in params) ? params[prop] : params;
}

function doCORSRequest(options, printResult) {
	var x = new XMLHttpRequest();
	x.open(options.method, 'https://' + options.url);
	x.onload = x.onerror = function() {
		printResult((x.responseText || ''));
	};
	if (/^POST/i.test(options.method)) {
		x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	}
	x.send(options.data);
}

function getPageAppend(url, target) {
	var form_data = getUrlParams(null, false);
	var form_url = url + form_data;
	doCORSRequest({
		method: 'POST',
		url: form_url,
		data: form_data
	}, function printResult(result) {
		target.append(result);
	});
}

/*
 * To utilize this file, call getPageAppend('url-to-get', 'target to add content to') within $(document).ready()
 * ex: getPageAppend('library.csudh.edu/als/alsget2.php?', $('#als-result'));
*/