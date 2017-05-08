
window.addEventListener('DOMContentLoaded', begin, false);

function begin(){
	// define variables
	var main				= document.getElementsByClassName('main')[0];
	var main_img			= main.children[0];
	var overlay_small		= main.getElementsByClassName('overlay_small')[0];
	var miniatures_container	= document.getElementsByClassName('miniature')[0];
	var miniatures			=  miniatures_container.querySelectorAll('.miniature > img');
	
	var overlay			= document.getElementById('overlay');
	var gallery_main_image	= document.getElementsByClassName('gallery_main_image')[0].children[0];
	var images_list			= document.getElementsByClassName('images_list')[0];
	var close_button		= document.getElementsByClassName('close_button')[0].children[0];
	var button				= document.getElementsByTagName('button')[0];
	var pizza_name			= document.getElementsByTagName('h1')[0].innerHTML.toLowerCase();
	
	// set event listeners
	main_img.addEventListener('mouseenter', function(){
		showZoomButton(overlay_small);
	}, false);
	
	main_img.addEventListener('mouseout', function(){
		hideZoomButton(overlay_small);
	}, false);
	
	overlay_small.addEventListener('mouseover', function(){
		showZoomButton(overlay_small);
	}, false);
	
	overlay_small.addEventListener('mouseout', function(){
		hideZoomButton(overlay_small);
	}, false);
	
	overlay_small.addEventListener('click', function(){
		// define clicked image
		var current_image = this.previousElementSibling;
		// if number of images is bigger than 0
		if(images_list.children.length > 0){
			// clear images from overlay
			clearImagesList(images_list);
		}
		// display overlay with clicked image as main image and rest in thumbnails list
		displayOverlay(overlay, current_image, gallery_main_image, images_list, miniatures);
		
		// iterate through images in thumbnails list in overlay
		for(var i = 0; i < images_list.children.length; i++){
			// and set event listener for every image in lower list
			images_list.children[i].addEventListener('click', function(){
				// get clicked image
				var clicked_image = this;
				// swap main image with clicked thumbnail
				swapImages(clicked_image, gallery_main_image, images_list);
			}, false);
		}
		
	}, false);
	
	close_button.addEventListener('click', function(){
		closeOverlay(overlay);
	}, false);
	
	// set event listener for click event on all miniature pictures (not overlay but main pizza page)
	for(var i = 0; i < miniatures.length; i++){
		miniatures[i].addEventListener('click', function(){
			var clicked_img_src = this.getAttribute('src');
			makeMainImage(clicked_img_src, main_img, miniatures_container, miniatures);
		}, false);
	}
	
	button.addEventListener('click', function(){
		order(pizza_name);
	}, false);
}

function showZoomButton(overlay_small){
	overlay_small.setAttribute('class', 'overlay_small show');
}

function hideZoomButton(overlay_small){
	overlay_small.setAttribute('class', 'overlay_small');
}

function makeMainImage(clicked_img_src, main_img){
//	console.log(clicked_img_src);
	// save main image actual src attribute
	var main_image_src = main_img.getAttribute('src');
	
	// replace it with clicked image src
	main_img.setAttribute('src', clicked_img_src);
}

// function to remove images from overlay
function clearImagesList(images_list){
	var length = images_list.children.length;
	for(var j = length-1; j > -1; j--){
		images_list.removeChild(images_list.children[j]);
	}
}

// function to display overlay wih product images
function displayOverlay(overlay, current_image, gallery_main_image, images_list, miniatures){
	overlay.setAttribute('class', 'show_overlay');
	var current_image_src = current_image.getAttribute('src');
	gallery_main_image.setAttribute('src', current_image_src);
	
	for(var i = 0; i < miniatures.length; i++){
		var src = miniatures[i].getAttribute('src');
		if(src !== current_image_src){
			var img = createIMG();
			img = setSRC(img, src);
			addIMG(images_list, img);
		}
	}
}

function closeOverlay(overlay){
	overlay.removeAttribute('class');
}

// function to create image element
function createIMG(){
	var img = document.createElement('IMG');
	img.setAttribute('alt', 'image');
	return img;
}

// function to set source file for image placeholder
function setSRC(img, src){
	img.setAttribute('src', src);
	return img;
}

// function to insert image to DOM
function addIMG(images_list, img){
	images_list.appendChild(img);
}

// function to rotate images (main product page/ not overlay)
function swapImages(clicked_image, gallery_main_image, images_list){
	// get list of current thumbnails
	var thumbnails_list = [];
	// iterate through every thumbnail to get src's
	for(var i = 0; i < images_list.children.length; i++){
		thumbnails_list.push(images_list.children[i].getAttribute('src'));
	}
	
	// get clicked image src
	var clicked_image_src = clicked_image.getAttribute('src');
	// get src of gallery_main_image
	var gallery_main_image_src = gallery_main_image.getAttribute('src');
	
	// check what item in thumbnail_list was clicked and remove it from array
	var pos_in_thumbnails_list = thumbnails_list.indexOf(clicked_image_src);
	
	// remove clicked element from thumbnails_list array
	thumbnails_list.splice(pos_in_thumbnails_list, 1);
	
	// set gallery_main_image src as clicked_image src
	gallery_main_image.setAttribute('src', clicked_image_src);
	
	// add gallery_main_image_src to thumbnails_list
	thumbnails_list.push(gallery_main_image_src);
	
	// replace all src's in images_list
	for(var i = 0; i < images_list.children.length; i++){
		images_list.children[i].setAttribute('src', thumbnails_list[i]);
	}
}

// function to order this particular pizza and to redirect to order page
function order(pizza_name){
	document.cookie = 'pizza_name='+pizza_name+';';
	window.location = 'order.html';
}