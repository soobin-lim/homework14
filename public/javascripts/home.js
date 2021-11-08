
window.addEventListener('DOMContentLoaded', () => {
  var allA = document.querySelectorAll("div[id='main'] a");
  for (a of allA) {
    a.className = 'menu_links text-light'
    a.onmouseover = ""
    a.style = "cursor: pointer;"
    a.style.textDecoration = 'none'
    a.addEventListener('click', (e) => {
      console.log(e.target.parentElement.parentElement);
      var row = e.target.parentElement.parentElement;
      var form = document.createElement('form')
      form.className = 'border border-3'
      var label = document.createElement('label')
      label.className = 'container-fluid p-0 text-dark m-1'
      label.innerHTML = 'Comment'
      var input = document.createElement('input')
      input.className = 'container-fluid m-1'
      var button = document.createElement('button')
      button.className = 'container-fluid m-1 bg-dark text-light'
      button.innerHTML = 'Submit'
      form.appendChild(label);
      form.appendChild(input);
      form.appendChild(button);
      row.appendChild(form);
     

      button.addEventListener('click', async (e) => {
        e.preventDefault();
        console.log(e.target + ' is clicked')
        var blogId = row.getAttribute("data-blogid");

        var date = '2021-11-07'
        console.log('input value : ' + input.value);
        var comment = input.value
        console.log('user : ' + 'temp-username');
        var username = 'temp-username'

        const response = await fetch('/api/dashboard/createcomment', {
          method: 'POST',
          body: JSON.stringify({ date, comment, username, blogId }),
          headers: { 'Content-Type': 'application/json' },
        });
      
        if (response.ok) {
          alert('Successfully created a comment')
          document.location.replace('/');
        } else {
          alert('Failed to create a comment');
        }

      });
    })
  }

});
