window.addEventListener('DOMContentLoaded', () => {
  let alreadyAddingComment = false;
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
      form.id = 'form1'
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

      if (alreadyAddingComment) {
        var elem = document.getElementById('form1');
        elem.parentNode.removeChild(elem);
        // document.getElementById('form1').style.display='none';
        alreadyAddingComment = false;
        return;
      }

      alreadyAddingComment = true;
      form.style.display = 'block';
      row.appendChild(form);

      button.addEventListener('click', async (e) => {
        e.preventDefault();

        alreadyAddingComment = false;
        form.style.display = 'none';

        console.log(e.target + ' is clicked')
        var blogId = row.getAttribute("data-blogid");
        
        console.log('input value : ' + input.value);
        var comment = input.value
        console.log('user : ' + 'temp-username');
        var username = 'temp-username'
        if (comment == '' || username == '' || blogId =='' || username == undefined){
          alert('HTML Error - or - please enter comment - and .. refresh the page')
          return;
        }
        const response = await fetch('/api/dashboard/createcomment', {
          method: 'POST',
          body: JSON.stringify({
            comment, username, blogId
          }),
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
          alert('Successfully created a comment')
          document.location.replace('/');
        } else {
          alert('Failed to create a comment');
        }
      });
    })}
});
