// set event listener 
window.addEventListener("DOMContentLoaded", setSlider, false);

// autostart slider when page loads
window.addEventListener("DOMContentLoaded", startSlider, false);

// define function for event listener when page loads
function setSlider(){
	
	var slider		= document.getElementById('slider');
	var right_arrow = slider.children[5];
	var left_arrow = slider.children[0];
	
	right_arrow.addEventListener('click', loadNext, false);

	left_arrow.addEventListener('click', loadPrevious, false);

	slider.addEventListener('mouseenter', stopSlider, false);
	slider.addEventListener('mouseleave', startSlider, false);
}

// function to load next image
function loadNext(event){
	var slider		= document.getElementById('slider');
	var images	= slider.querySelectorAll('#slider > img');
	for(var i = 0; i < images.length; i++){
		if(images[i].getAttribute('class') === 'visible'){
			images[i].removeAttribute('class');
			if(i === images.length-1){
				images[0].setAttribute('class', 'visible');
			}
			else {
				images[i+1].setAttribute('class', 'visible');
			}
			break;
		}
	}
}

// function to load previous image
function loadPrevious(event){
	var slider		= document.getElementById('slider');
	var images	= slider.querySelectorAll('#slider > img');
	for(var i = 0; i < images.length; i++){
		if(images[i].getAttribute('class') === 'visible'){
			images[i].removeAttribute('class');
			if(i === 0){
				images[images.length-1].setAttribute('class', 'visible');
			}
			else {
				images[i-1].setAttribute('class', 'visible');
			}
			break;
		}
	}
}

// interval variable set null when page loads
var intervalId = null;

// function to autostart slider setting how often to change image
function startSlider(){
	intervalId = setInterval(loadNext, 3500);
}

// function to stop carousel/sliding images
function stopSlider(){
	window.clearInterval(intervalId);
}