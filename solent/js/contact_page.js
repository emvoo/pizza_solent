// set event listener when content of the pahe has loaded
window.addEventListener('DOMContentLoaded', run, false);

// function called by event listener when content of the page finished loading
function run(){
	// define all inputs
	var inputs = document.querySelectorAll('input[type="text"]');
	// define submit button
	var submit = document.getElementsByName('send')[0];
	// iterate throught each input element but not phone number
	// as it is optional for customer to put in which seem to be crazy
	// to get order from someone who dont want to
	// provide phone number lol ;)
	for(var i = 0; i < inputs.length; i++){
		if(i !== 3){
			// set event listener for every one of the but 3rd
			inputs[i].addEventListener('blur', function(){
				// run validate function to check for errors in input field
				validate(this);
			}, false);
		}
	}
	
	// set event listener to run form validations 
	submit.addEventListener('click', function(){
		event.preventDefault();
		anotherValidate(inputs);
		var errors = document.getElementsByClassName('invalid-error');
		if(errors.length === 0){
			this.form.submit(); 
		}
	}, false);
}

// function to validate correctness of data entered
function validate(input){
	// if input's name attribute is email 
	if(input.getAttribute('name') === 'email'){
		// split data enetered on @
		var elements = input.value.split('@');
		// if there are exactly 2 elements (email address must have 1@ only)
		if(elements.length === 2){
			// if there is a .  in the after @ part
			if(elements[1].split('.').length > 1){
				// if there is any character between @ and . and email address doesnt end at .
				if(elements[1].split('.')[0] !== '' && elements[1].split('.')[1] !== ''){
					// then display tick
					input.parentElement.setAttribute('class', 'valid');
					if(input.previousElementSibling !== null){
						var parent = input.parentElement;
						parent.removeChild(parent.children[0]);
					}
				}
				// otherwise display cross
				else {
					input.parentElement.setAttribute('class', 'invalid');
					
				}
			}
			// if there isnt display red cross
			else {
				input.parentElement.setAttribute('class', 'invalid');
			}
		}
		// if there isnt @ display red cross
		else {
			input.parentElement.setAttribute('class', 'invalid');
		}
	}
	// if input isnt empty display green tick
	else if(input.value !== ''){
		input.parentElement.setAttribute('class', 'valid');
		if(input.previousElementSibling !== null){
			var parent = input.parentElement;
			parent.removeChild(parent.children[0]);
		}
	}
	// red cross otherwise
	else {
		input.parentElement.setAttribute('class', 'invalid');
	}
}

function anotherValidate(inputs){
	for(var i = 0; i < inputs.length; i++){
		var parent = inputs[i].parentElement;
		if(inputs[i].previousElementSibling !== null){
			parent.removeChild(parent.children[0]);
		}
		
		if(i !== 3){
			if(i === 2){
				var array = inputs[i].value.split('@');
				if(array.length === 2){
					if(array[0] === '' || array[1] === ''){
						addErrorMessage(inputs[i], parent);
					}
					else {
						var array2 = array[1].split('.');
						if(array2[array2.length-1] === '.' || array2[array2.length-1] === '' || array2[0] === ''){
							addErrorMessage(inputs[i], parent);
						}
					}
				}
				else{
					addErrorMessage(inputs[i], parent);
				}
			}
			else {
				if(inputs[i].value === ''){
					addErrorMessage(inputs[i], parent);
				}
			}
		}
	}
}

function addErrorMessage(input, parent){
	if(input.previousElementSibling === null){
		var span = document.createElement('SPAN');
		span.setAttribute('class', 'invalid-error');
		var text = document.createTextNode('Error: Please review your data entered.');
		span.appendChild(text);
		parent.insertBefore(span, input);
	}
	return;
}