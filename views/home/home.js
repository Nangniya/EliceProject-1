const serchbtn = document.querySelector('#search');
const basketbtn = document.querySelector('#basket');
const loginbtn = document.querySelector('#login');
const mypage = document.querySelector('#mypage');
const categorybtn = document.querySelector('#categorybtn');
const category = document.querySelector('#myCategory');

categorybtn.addEventListener('click', function () {
  category.classList.toggle('show');
  fetch('/api/categories')
    .then((response) => response.json())
    .then((data) => {
      var itemsHtml = '';
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        itemsHtml += `<button class="category-item">${data[i].name}</button>
          `;
      }

      document.querySelector('.items').innerHTML = itemsHtml;
    })
    .catch((error) => console.error(error));
});
