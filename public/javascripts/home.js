
window.addEventListener('DOMContentLoaded', () => {

  var allA = document.querySelectorAll("div[id='main'] a");
  for (a of allA) {
    a.className = 'menu_links text-light'
    a.onmouseover="" 
    a.style="cursor: pointer;"
    a.style.textDecoration = 'none'
    a.addEventListener('click', (e) => {
      
      console.log(e.target);
      // var targetDiv = 
      console.log(e.target.parentElement.parentElement);
      var div = document.createElement('div')

    })
  }

});
