const form = document.getElementById('signup');
const name1 = form.elements['username'];
const password1 = form.elements['password'];


// console.log(form)
// console.log(name1)
// console.log(password1)



const NAME_REQUIRED = "Please enter your name";
const PASSWORD_REQUIRED = "Please enter your password";
const PASSWORD_INVALID = "Please enter a correct password";

form.addEventListener('submit', async (event)=>{
  event.preventDefault();
  
	let username = name1.value;
	let password = password1.value;
	// console.log(username, password)

  let nameValid = hasValue(form.elements["username"], NAME_REQUIRED);
	let passwordValid = validatePassword(form.elements["password"], PASSWORD_REQUIRED, PASSWORD_INVALID);

  if (nameValid && passwordValid) {
		alert("Name and Password Validation");
		return true;
	}

  const response = await fetch('/api/users/signup', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    alert('Successfully signed up')
    document.location.replace('/');
  } else {
    alert('Failed to sign up');
  }
});

// show a message with a type of the input
function showMessage(input, message, type) {
	// get the small element and set the message
	const msg = input.parentNode.querySelector("small");
	msg.innerText = message;
	// update the class for the input
	input.className = type ? "success" : "error";
	return type;
}

function showError(input, message) {
	return showMessage(input, message, false);
}

function showSuccess(input) {
	return showMessage(input, "", true);
}

function hasValue(input, message) {
	if (input.value.trim() === "") {
		return showError(input, message);
	}
	return showSuccess(input);
}

function validatePassword(input, requiredMsg, invalidMsg) {
	// check if the value is not empty
	if (!hasValue(input, requiredMsg)) {
		console.log("password doesn't have value")
		return true;
	}
	// validate email format
	const emailRegex =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	const email = input.value.trim();
	if (!emailRegex.test(email)) {
		// return showError(input, invalidMsg);
		return false;
	}
	return false;
}