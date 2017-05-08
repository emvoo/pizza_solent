window.addEventListener('DOMContentLoaded', gallery, false);

function gallery(){
	var images			= document.querySelectorAll('#gallery img');
	var click_btn			= document.getElementsByClassName('click_btn');
	var gallery_overlay		= document.getElementById('gallery_overlay');
	var close_button		= document.getElementsByClassName('close_button')[0];
	var gallery_main_image	= document.getElementsByClassName('gallery_main_image')[0];
	var images_list			= document.getElementsByClassName('images_list')[0];
	var gallery_overlay		= document.getElementById('gallery_overlay');
	
	
	
	for(var i = 0; i < images.length; i++){
		images[i].addEventListener('mouseenter', function(){
			var entered_image = this;
			darken_images(images, entered_image, click_btn);
		}, false);
		
		images[i].addEventListener('mouseleave', function(){
			restoreImages(images);
		}, false);
		
		click_btn[i].addEventListener('mouseenter', function(){
			var entered_click_btn = this;
			keepDarken(entered_click_btn, images);
		}, false);
		
		click_btn[i].addEventListener('mouseleave', function(){
			restoreImages(images);
		}, false);
		
		images[i].addEventListener('click', function(){
			images_list.innerHTML = '';
			enlargeImage(this, gallery_overlay, gallery_main_image, images,images_list);
		}, false);
	}

	close_button.addEventListener('click', function(){
		gallery_overlay.removeAttribute('class');
		setTimeout(function(){
			gallery_overlay.style.zIndex = -1;
		}, 1000);
	}, false);
	

}

function darken_images(images, entered_image, click_btn){
	for(var i = 0; i < images.length; i++){
		if(images[i] ===entered_image){
			click_btn[i].setAttribute('class', 'click_btn click_btn_full');
		}
		else {
			images[i].setAttribute('class', 'darken');
		}
	}
}

function restoreImages(images){
	for(var i = 0; i < images.length; i++){
		images[i].removeAttribute('class');
		images[i].nextElementSibling.setAttribute('class', 'click_btn');
	}
}

function enlargeImage(clicked_image, gallery_overlay, gallery_main_image, images,images_list){
	var clicked_image_src = clicked_image.getAttribute('src');
	gallery_overlay.style.zIndex = 1;
	gallery_overlay.setAttribute('class', 'show_gallery_overlay');
	
	gallery_main_image.children[0].setAttribute('src', clicked_image_src);
	for(var i = 0; i < images.length; i++){
		if(images[i] !== clicked_image){
			var img = createIMG();
			img.setAttribute('src', images[i].getAttribute('src'));
			img.setAttribute('alt', 'image');
			images_list.appendChild(img);
		}
	}
	
	for(var i = 0; i < images_list.children.length; i++){
		images_list.children[i].addEventListener('click', function(){
			// get clicked image
			var clicked_image = this;
			// swap main image with clicked thumbnail
			swapImages(clicked_image, gallery_main_image, images_list);
		}, false);
	}
	
//	var coordinates = clicked_image.getBoundingClientRect();
//	var top = coordinates.top;
//	var left = coordinates.left;
//	console.log(clicked_image_src);
//	console.log(r.top);
//	console.log(r.right);
//	console.log(r.bottom);
//	console.log(r.left);
	

}

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
	var gallery_main_image_src = gallery_main_image.children[0].getAttribute('src');
	
	// check what item in thumbnail_list was clicked and remove it from array
	var pos_in_thumbnails_list = thumbnails_list.indexOf(clicked_image_src);
	
	// remove clicked element from thumbnails_list array
	thumbnails_list.splice(pos_in_thumbnails_list, 1);
	
	// set gallery_main_image src as clicked_image src
	gallery_main_image.children[0].setAttribute('src', clicked_image_src);
	
	// add gallery_main_image_src to thumbnails_list
	thumbnails_list.push(gallery_main_image_src);
	
	// replace all src's in images_list
	for(var i = 0; i < images_list.children.length; i++){
		images_list.children[i].setAttribute('src', thumbnails_list[i]);
	}
}

function createIMG(){
	var img = document.createElement('IMG');
	return img;
}

function keepDarken(entered_click_btn, images){
	var image = entered_click_btn.previousElementSibling;
	entered_click_btn.setAttribute('class', 'click_btn click_btn_full');
	for(var i = 0; i < images.length; i++){
		if(images[i]  !== image){
			images[i].setAttribute('class', 'darken');
		}
	}
}