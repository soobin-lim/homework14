window.addEventListener('DOMContentLoaded', (event) => {
	const form = document.getElementById('dashboard_create');
	const newpostBtn = document.getElementById('newpost_btn')

	newpostBtn.addEventListener('click', () => {
		var newpost = document.getElementById('newpost');
		newpost.style.display = "block";

		var updateanddeleteDiv = document.getElementById('updateanddelete')
		updateanddeleteDiv.style.display = 'none'

		var mainElement = document.getElementById('main');
		mainElement.style.display = 'none'

	})

	const TITLE_REQUIRED = "Please enter your title";
	const CONTENT_REQUIRED = "Please enter your content";


	console.log('DOM fully loaded and parsed');
	var newpost = document.getElementById('newpost');
	newpost.style.display = "none";


	form.addEventListener('submit', async (event) => {
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

	// adding update function

	var mainElement = document.getElementById('main');
	mainElement.style.display = 'block'
	var allA = document.querySelectorAll("div[id='main'] a");

	var updateanddeleteDiv = document.getElementById('updateanddelete')
	updateanddeleteDiv.style.display = 'none'
	for (a of allA) {
		a.className = 'menu_links text-light'
		a.onmouseover = ""
		a.style = "cursor: pointer;"
		a.style.textDecoration = 'none'

		a.addEventListener('click', async (e) => {

			var rowElement = e.target.parentElement.parentElement;
			var blogId = rowElement.getAttribute('data-blogid');

			console.log(blogId);

			// const getTerms = async () => {
			// 	const result = await fetch('/api/terms', {
			// 		method: 'GET',
			// 	});
			// 	const json = await result.json();
			// 	return json;
			// };

			// why this address working good?   - not using http://localhost:3000/

			var blogData = await fetch('/api/blog/byid/' + blogId, {
				method: 'GET',		// here can't I have head ? I guess
			});
			const json = await blogData.json();
			blogData = json;

			console.log(blogData);
			var blogTitle = blogData.title;
			var blogContent = blogData.content;
			console.log(blogTitle, blogContent, "good")
			mainElement.style.display = 'none'
			updateanddeleteDiv.style.display = 'block'
			console.log(e.target.parentElement.parentElement);
			// var row = e.target.parentElement.parentElement;
			var updateAndDeleteForm = document.createElement('div')
			var form = document.createElement('form')
			form.className = 'border border-3'
			var label = document.createElement('label')
			label.className = 'container-fluid p-0 text-dark m-1'
			label.innerHTML = 'Title'
			var input = document.createElement('input')
			input.className = 'container-fluid p-0 m-0'
			input.value = blogTitle;
			var label2 = document.createElement('label')
			label2.className = 'container-fluid p-0 text-dark m-1'
			label2.innerHTML = 'Content'
			var input2 = document.createElement('input')
			input2.className = 'container-fluid p-0 m-0'
			input2.value = blogContent;
			var updateButton = document.createElement('button')
			updateButton.className = 'container-fluid m-0 mt-3 bg-dark text-light'
			updateButton.innerHTML = 'Update Post'
			var deleteButton = document.createElement('button')
			deleteButton.className = 'container-fluid m-0 mt-3 mb-3 bg-dark text-light'
			deleteButton.innerHTML = 'Delete'

			form.appendChild(label);
			form.appendChild(input);
			form.appendChild(label2);

			form.appendChild(input2);

			form.appendChild(updateButton);
			form.appendChild(deleteButton);

			updateAndDeleteForm.appendChild(form);
			updateanddeleteDiv.appendChild(updateAndDeleteForm)

			deleteButton.addEventListener('click', async (e) => {
				e.preventDefault();
				const response = await fetch('/api/blog/' + blogId, {
					method: 'DELETE',
				});
				if (response.ok) {
					alert('Successfully deleted a blog')
					document.location.replace('/');
				} else {
					alert('Failed to delete a comment');
				}
			});

			updateButton.addEventListener('click', async (e) => {
				e.preventDefault();
				console.log(e.target + ' is clicked')
				var blogId = rowElement.getAttribute("data-blogid");

				var date = '2021-11-07'
				console.log('title : ' + input.value)
				var title = input.value;
				console.log('content : ' + input2.value);
				var content = input2.value
				console.log('user : ' + 'temp-username');
				var username = 'temp-username'

				const response = await fetch('/api/blog/', {
					method: 'PUT',
					body: JSON.stringify({ date, title, content, blogId }),
					headers: { 'Content-Type': 'application/json' },
				});

				if (response.ok) {
					alert('Successfully updated a blog')
					document.location.replace('/');
				} else {
					alert('Failed to create a comment');
				}

			});
		})
	}


});