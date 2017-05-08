// set event listener right after page content loads
window.addEventListener('DOMContentLoaded', button, false);

// function to initiate all events on page
function button(){
	// list of all required varaibles
	var to_top_btn = document.getElementById('to_top_btn');
	
	window.addEventListener('scroll', function(){
		// check scroll position
		if(window.scrollY > 400){
			to_top_btn.setAttribute('class', 'show_button');
		}
		else {
			to_top_btn.removeAttribute('class');
		}
	}, false);
	
	to_top_btn.addEventListener('click', function(){
		var position = window.scrollY;
		var id = setInterval(scrollToTop, 1);
		function scrollToTop(){
			if(position < 10){
				clearInterval(id);
				window.scrollTo(0, 0);
			}
			else {
				position -= 5;
				window.scrollTo(0, position);
			}
		}
	}, false);
}