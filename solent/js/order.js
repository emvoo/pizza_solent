window.addEventListener("DOMContentLoaded", order, false);

function order(){
	
	// all variables defined
	var pizza_container	= document.getElementsByClassName('pizza_container');
	var basket			= document.getElementById('basket');
	var basket_btn		= document.getElementById('basket_btn');
	var add_to_order_btn	= document.getElementsByName('add_to_order')[0];
	var order_items		= document.getElementsByClassName('order_item');
	var total_box		= document.getElementById('total_box');
	var total			= document.getElementById('total');
	
	var inputs			= document.getElementsByTagName('input');
	var update		= document.getElementById('update');
	var to_top_btn		= document.getElementById('to_top_btn');
	var error			= document.querySelector('.error');
	
	var pizza			= document.getElementsByName('pizza');
	var base			= document.getElementsByName('base');
	var topping		= document.getElementsByName('topping');
	var fieldsets		= document.getElementsByTagName('fieldset');
	var subtotals		= document.getElementsByClassName('subtotal');
	
	// check if cookie is set (should be set in pizza page in case 'order' button was clicked and redirected here)
	if(document.cookie !== ''){
		// if cookie is set, read its data and based on that data select pizza from previous page
		var cookie = document.cookie;
		var pizza_name = cookie.split('=')[1].replace(' ', '_');
		for(var i = 0; i < pizza.length; i++){
			if(pizza[i].value === pizza_name){
				pizza[i].checked = true;
				var price = pizza[i].nextElementSibling.nextElementSibling.innerHTML;
				update.innerHTML = price;
				update.setAttribute('class', 'show_price');
			}
		}
		// remove cookie as wont be needed any longer
		document.cookie = "pizza_name=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
	}

	// update and show auto updated price field (based on click)
	for(var i = 0; i < 17; i++){
		inputs[i].addEventListener('click', function(){
			// each time product is selected/clicked set reset temp_value (it is value of all selected input fields)
			var temp_value = 0;
			var fieldset = document.getElementById(this.getAttribute('name'));
			if(fieldset.hasAttribute('style')){
				fieldset.removeAttribute('style');
				error.removeAttribute('style');
			}
			// iterate through all inputs (products only)
			for(var j = 0; j < 17; j++){
				// chceck if input is selected/checked
				if(inputs[j].checked === true){
					// add  and store prices of all selected inputs to temp_value variable
					temp_value += parseFloat(inputs[j].nextElementSibling.nextElementSibling.innerHTML);
				}
			}
			// call for function responsilble for updating update_field
			update_field(update, temp_value);
			
		}, false);
	}
	
	// set eventListener for all product image to show product description
	for(var i = 0; i < pizza_container.length; i++){
		// set img variable containg image element of each pizza_containers field
		var img = pizza_container[i].getElementsByTagName('img')[0];
		
		// set event listener for all pizza images when mouse is over an image
		img.addEventListener('mouseenter',  function(){
			// get entered by mouse element
			var element = this;
			// call function that shows description of element
			setTimeout(function(){showDescription(element);}, 10);
		}, false);
		// set event listener for all pizza images when mouse is not above image anymore
		img.parentElement.addEventListener('mouseleave', function(){
			// get entered by mouse element
			var element = this;
			// call function to hide product description
			setTimeout(function(){hideDescription(element);}, 300);
		}, false);
	}
	
	// set event Listener to slide basket in/out
	basket_btn.addEventListener('click', function(){
		slideBasket(basket, to_top_btn);
	}, false);
	
	// set event listener on addToOrder button
	add_to_order_btn.addEventListener('click', function(){
		// when clicked call for addToOrderFunction which gathers all necessary data and adds them to basket
		addToOrder(total_box, total, pizza, base, topping, order_items, fieldsets, basket, subtotals, error, to_top_btn);
		// iterate through order items and set event listener for every order item in cart
		for(var i = 0; i < order_items.length; i++){
			order_items[i].addEventListener('click', function(event){
				// get clicked position relative to order_item
				var position = event.offsetX;
				var order_item = this;
				// once order item cancel button clicked remove this particular item from basket
				removeOrderItem(position, order_item, order_items, subtotals, total);
			}, false);
		}
	}, false);
	
	total_box.addEventListener('mouseover', function(){
		
		if(basket.getAttribute === 'slidein'){
//			basket.setAttribute('class', 'slideout');
			slideBasket(basket, to_top_btn);
		}
	}, false);
	
	total_box.addEventListener('mouseleave', function(){
//		basket.setAttribute('class', 'slidein');
		slideBasket(basket, to_top_btn);
	}, false);
}

// function to update auto showing/hiding order amount
function update_field(update, temp_value){
	// insert data to this field
	update.innerHTML = temp_value.toFixed(2);
	// add class responsible for showing element
	update.setAttribute('class', 'show_price');
	// after 700ms hide element
	setTimeout(function(){
		update.removeAttribute('class');
	}, 700);
	// return to calling function
	return;
}

// function to remove item from basket
function removeOrderItem(position, order_item, order_items, subtotals, total){
	// get parent of clicked element
	var parent = order_item.parentElement;
	// if clicked position is in range(13, 30) remove order item
	if(position > 13 && position < 30){
		// if only one element in basket remove it and insert empty basket info
		if(order_items.length === 1){
			parent.removeChild(order_item);
			total.style.display = 'none';
			var p = document.createElement('P');
			p.setAttribute('id', 'empty_basket');
			var text = document.createTextNode('Nothing in your basket yet!');
			p.appendChild(text);
			parent.insertBefore(p, total);
		}
		// if more elements just remove clicked one
		else {
			parent.removeChild(order_item);
		}
	}
	
	calculateTotal(subtotals, total);
	// return to calling function
	return;
}

// function to show item description
function showDescription(element){
	// set class of element to animate growing image
	element.setAttribute('class', 'zoomin');
	// set its index to 0 
	element.style.zIndex = '0';
	// set description element index to 1 to aapear above the picture after 200ms
	setTimeout(function(){
		element.previousElementSibling.style.zIndex = '1';
	}, 200);
}

// function to hide item description
function hideDescription(element){
	// set img variable to store image of element
	var img = element.children[1];
	// set class to animate moving away from image
	img.setAttribute('class', 'zoomout');
	// set description of element index to 0 so it appears below picture after 500ms
	setTimeout(function(){
		img.previousElementSibling.style.zIndex = '0';
	}, 500);
	// remove any styles set by showDescription function
	img.removeAttribute('style');
}

// function to slide basket out manually/autmaticly
function slideBasket(basket, to_top_btn){
	// if basket has no class or class=slidein set its class to slideout to slide basket out
	if(basket.getAttribute('class') === null || basket.getAttribute('class') === 'slidein'){
		basket.setAttribute('class', 'slideout');
		to_top_btn.style.right = '340px';
	}
	// in any other case set class to slidein to slide basket in
	else {
		basket.setAttribute('class', 'slidein');
		to_top_btn.removeAttribute('style');
	}
}

// function responsible for getting all data needed to insert into cart
function addToOrder(total_box, total, pizza, base, topping, order_items, fieldsets, basket, subtotals, error, to_top_btn){
	// stop form from executing
	event.preventDefault();
	
	// check if all required form elements are checked
	var requiredFields = [pizza, base, topping];
	for(var i = 0; i < requiredFields.length; i++){
		var field_name = validateRequiredFields(requiredFields[i]);
		var fieldset = document.getElementById(field_name);
		
		// if they are not display message to the user and stop function from further executing
		if(validateRequiredFields(requiredFields[i]) !== true){
			console.log(fieldset);
			fieldset.style.boxShadow = '0 0 30px 5px rgb(255,0,0)';
			error.innerHTML = field_name;
			error.style.display = 'block';
			window.scrollTo(0, 275);
			return;
		}
//		else {
//			fieldsets[i].removeAttribute('style');
//			error.style.display = 'none';
//		}
	}
	
	// remove empty basket message first, if exists
	if(total_box.children[1].id === 'empty_basket'){
		total_box.removeChild(total_box.children[1]);	
	}
	
	// create variable with created div class="order_item" with child element div
	var insert = createOrderItem();
	// insert field as new order item in basket
	total_box.insertBefore(insert, total);
	
	// number of order items div elements needed to insert to last existing order_item
	var length = order_items.length-1;
	
	// define div (first child of order_item)
	var insert_to = order_items[length].children[0];
	for(var i = 0; i < pizza.length; i++){
		if(pizza[i].checked === true){
			var img = pizza[i].parentElement.parentElement.previousElementSibling.children[1];
			var rect = img.getBoundingClientRect();
		}
	}
	// get all selected products and insert them to basket
	getSelectedProducts(fieldsets, insert_to);
	// calculate subtotal/order_item
	calculateSubtotal(subtotals);
	// display total block
	total.style.display = 'block';
	// calculate total based on subtotals
	calculateTotal(subtotals, total);
	
	// slide basket out
	slideBasket(basket, to_top_btn);
		
	// slide basket in after 5s
	setTimeout(function(){slideBasket(basket, to_top_btn);}, 5000);
}

// function to create order_item field in cart
function createOrderItem(){
	// create div with order_item class
	var div_order_item = createDiv();
	addClassToDiv(div_order_item, 'order_item');

	// create div inside the one above
	var div = createDiv();
	div_order_item.appendChild(div);
	
	// return created field to caller
	return div_order_item;
}

// function to create div element
function createDiv(){
	var div = document.createElement('DIV');
	return div;
}


// function to create span element
function createSpan(){
	var span = document.createElement('SPAN');
	return span;
}

// function to create div with class clear (to clear floats)
function createClearDiv(){
	var div = document.createElement('DIV');
	div.setAttribute('class', 'clear');
	return div;
}

// function to add any class to div
function addClassToDiv(div, class_name){
	div.setAttribute('class', class_name);
	return div;
}

// function to add class to span element
function addClassToSpanName(span){
	span.setAttribute('class', 'left product_name');
	return span;
}

// function to add class to span element
function addClassToSpanPrice(span){
	span.setAttribute('class', 'right product_price');
	return span;
}

// function to validate if all required elements has been selected
function validateRequiredFields(elements){
	// variable to check how many inputs has been selected
	var checked = 0;
	for(var i = 0; i < elements.length; i++){
		if(elements[i].checked === true){
			checked++;
		}
	}
	
	// if checked is 0 return name of not checked required element
	if(checked === 0){
		return elements[0].getAttribute('name');
	}
	// otherwise return true and keepn going
	else {
		return true;
	}
}

// function to add prices of all items in order_item
function calculateSubtotal(subtotals){
	// get number of subtotals
	var length = subtotals.length;
	// get last existing subtotal
	var last_subtotal = subtotals[length-1];
	// get all prices for this subtotal
	var products_prices = last_subtotal.parentElement.getElementsByClassName('product_price');
	// create variable to store subtotal
	var subtotal = 0;
	// iterate through all prices
	for(var i = 0; i < products_prices.length; i++){
		var temp = parseFloat(products_prices[i].innerHTML);
		subtotal += temp;
	}
	// insert calculated values to subtotal field
	last_subtotal.innerHTML = subtotal.toFixed(2);
}

// function to gather all subtotals and add them together
function calculateTotal(subtotals, total){
	// define variable to store total value
	var total_value = 0;
	// iterate through subtotals
	for(var i = 0; i < subtotals.length; i++){
		var temp = parseFloat(subtotals[i].innerHTML);
		total_value += temp;
	}
	
	// insert total_value to total field
	total.innerHTML = total_value.toFixed(2);
}

// function to get all products that were selected/checked in the process
function getSelectedProducts(fieldsets, insert_to){
	// iterate through every but last fieldsets
	for(var i = 0; i < fieldsets.length-1; i++){
		// define list of inputs of specific fieldset
		var inputs = fieldsets[i].getElementsByTagName('input');
		// iterate through all inputs in specific fieldset
		for(var j = 0; j < inputs.length; j++){
			// check if any of inputs is selected/checked
			if(inputs[j].checked === true){
				// get input name - to be used as class for newly created element
				var input_name		= inputs[j].getAttribute('name');
				// get product name
				var product_name	= inputs[j].nextElementSibling.innerHTML;
				// get product price
				var product_price	= inputs[j].nextElementSibling.nextElementSibling.innerHTML;
				// create HTML elements to be inserted to insert_to
				// size of  pizza will be inserted to pizza field next to pizza name
				if(input_name === 'base'){
					var pizza_elements = document.getElementsByClassName('pizza');
					var last_pizza_element = pizza_elements[pizza_elements.length-1];
					last_pizza_element.children[0].innerHTML += ' ' + product_name;
					var existing_price = last_pizza_element.children[1].innerHTML;
					var existing_price_number = parseFloat(existing_price);
					var calculated = existing_price_number + parseFloat(product_price);
					last_pizza_element.children[1].innerHTML = calculated.toFixed(2);
				}
				// otherwise create new elements
				else {
					// create section for each suborder item
					var div = createDiv();
					addClassToDiv(div, input_name);
					// create span for product_name
					var span_name = createSpan();
					addClassToSpanName(span_name);
					// create and append product name to span_name
					var span_product_name = document.createTextNode(product_name);
					span_name.appendChild(span_product_name);
					
					// create span for product_price
					var span_price = createSpan();
					addClassToSpanPrice(span_price);
					// create and append product_price to span_price
					var span_product_price = document.createTextNode(product_price);
					span_price.appendChild(span_product_price);
					
					// append spans to specific div
					div.appendChild(span_name);
					div.appendChild(span_price);
					
					insert_to.appendChild(div);
				}
			}
		}
	}
	
	// create and insert subtotal
	var subtotal = createDiv();
	addClassToDiv(subtotal, 'subtotal');
	insert_to.appendChild(subtotal);
	
	// insert float clearing element
	insert_to.appendChild(createClearDiv());
	
	// there's a need to reset form after order has been placed
	var form = document.getElementById('choices').children[1];
	// clear the form and wait for another order
	form.reset();
}