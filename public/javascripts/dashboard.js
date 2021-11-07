const form = document.getElementById('dashboard_create');
const newpostBtn = document.getElementById('newpost_btn')
newpostBtn.addEventListener('click', ()=>{
	var newpost = document.getElementById('newpost');
	newpost.style.display = "block";
})

const TITLE_REQUIRED = "Please enter your title";
const CONTENT_REQUIRED = "Please enter your content";

window.addEventListener('DOMContentLoaded', (event) => {
	console.log('DOM fully loaded and parsed');
	var newpost = document.getElementById('newpost');
	newpost.style.display = "none";
});

form.addEventListener('submit', async (event)=>{
  event.preventDefault();
  
	let title = form.elements['title'].value;
	let content = form.elements['content'].value;

  let titleValid = hasValue(form.elements["title"], TITLE_REQUIRED);
	let passwordValid = hasValue(form.elements["content"], CONTENT_REQUIRED);

  if (!titleValid && !passwordValid) {
		alert("Please enter title and content");
		return true;
	}

	const response = await fetch('/api/dashboard/create', {
    method: 'POST',
    body: JSON.stringify({ title, content }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    alert('Successfully created a POST')
    document.location.replace('/');
  } else {
    alert('Failed to create a post');
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