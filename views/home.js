const serchbtn = document.querySelector('#search');
const basketbtn = document.querySelector('#basket');
const loginbtn = document.querySelector('#login');
const mypage = document.querySelector('#mypage');
const category = document.querySelector('#myCategory');

if (localStorage.getItem('token')) {
  console.log("있다");
} else console.log('없다');


window.onload = function () {
  category.classList.toggle('show');
  fetch('/api/categories')
    .then((response) => response.json())
    .then((data) => {
      var itemsHtml = '';
      for (var i = 0; i < data.length; i++) {
        itemsHtml += `
        <button type="button" class="btn btn-warning category-title">${data[i].name}</button>
          `;
      }

      document.querySelector('.items').innerHTML += itemsHtml;
    })
    .catch((error) => console.error(error));


  fetch('/api/products/recent')
    .then((response) => response.json())
    .then((data) => {
      var itemsHtml = '';
      for (var i = 0; i < data.length; i++) {
        itemsHtml += `<button class="category-item">${data[i].name}</button>
          `;
      }

      document.querySelector('.new-item-conatiner').innerHTML = itemsHtml;
    });

  fetch('/api/products')
    .then((response) => response.json())
    .then((data) => {
      var itemsHtml = '';
      for (var i = 0; i < 9; i++) {
        itemsHtml += `<button class="category-item">${data[i].name}</button>
          `;
      }

      document.querySelector('.best-item-conatiner').innerHTML = itemsHtml;
    });
};
