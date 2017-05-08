// date in top right corner

// set event listener when page has loaded, once loaded run setClock function
window.addEventListener("DOMContentLoaded", setClock, false);

// define setClock function
function setClock(){
	// define month names as javascript supports numbers (0-11, 0 being January and 11 being December) as months
	var monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	
	// set date field variable
	var dateField = document.getElementById('date');
	// get current date/time and assign it to date variable
	setInterval(function(){
		var date = new Date();
		// get current day, month (as number), year, hour and minute
		var day = date.getDate();
		var monthIndex = date.getMonth();
		var month = monthNames[monthIndex];
		var year = date.getFullYear();
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var seconds = date.getSeconds();
		// in case minutes/hours are less than 10 (0-9 -> 1 digit long) add 0 followed by mite/hour
		if(seconds < 10){
			seconds = '0' + seconds;
		}
		
		if(minutes < 10){
			minutes = '0' + minutes;
		}

		if(hours < 10){
			hours = '0' + hours;
		}
	
		// insert current day/time to element with id 'date'
		dateField.innerHTML = (day + ' ' + month + ' ' + year + ', ' + hours + ':' + minutes + ':' + seconds);
	}, 1000);
	
}
