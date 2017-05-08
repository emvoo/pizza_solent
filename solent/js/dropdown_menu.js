// dropdown menu

// set event listener for dropdown menu
window.addEventListener("DOMContentLoaded", setDropdownMenu, false);

// define function called by event listener
function setDropdownMenu(){
	// define all/most required variables
	var dropdown = document.getElementById('dropdown-menu');
	var menu = dropdown.previousElementSibling;
	var ul = document.getElementsByTagName('ul')[0];
	var li_order = document.getElementsByTagName('li')[6];
	var nav = document.getElementsByTagName('nav')[0];
	
	// set event listener when mouse is over menu item
	menu.addEventListener('mouseenter', function(){
		// run below function when event occured
		showMenu(dropdown, nav);
	}, false);
	
	// set event listener when mouse eneters dropdown menu
	dropdown.addEventListener('mouseenter', function(){
		// run below function when event occured
		showMenu(dropdown, nav);
	}, false);
	
	// set event listener when mouse enters order item in menu
	li_order.addEventListener('mouseenter', function(){
		// run below function when event occured
		hideMenu(dropdown);
	}, false);
	
	// set event listener when mouse leaves menu item in menu
	menu.addEventListener('mouseleave', function(){
		// run below function when event occured
		keepMenu(dropdown);
	}, false);
	
	// set event listener when mouse leaves dropdown element
	dropdown.addEventListener('mouseleave', function(){
		// run below function when event occured
		hideMenu(dropdown);
	}, false);
	
	// set event listener when mouse leaves menu
	ul.addEventListener('mouseleave', function(){
		// run below function when event occured
		hideMenu(dropdown);
	}, false);
}

// function to show dropdown menu
function showMenu(dropdown, nav){
	var left = nav.offsetLeft+"px";
	dropdown.className = 'drop';
	dropdown.style.left = left;
	dropdown.style.display = 'block';
}

// function to keep menu open/dropped
function keepMenu(dropdown){
	dropdown.style.display = 'block';
}

// function to hide menu
function hideMenu(dropdown){
	setTimeout(function(){
		dropdown.removeAttribute('class');
		dropdown.className = 'hide';
	}, 200);
}