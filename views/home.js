const serchbtn = document.querySelector('#search');
const basketbtn = document.querySelector('#basket');
const loginbtn = document.querySelector('#login');
const mypage = document.querySelector('#mypage');
const category = document.querySelector('#myCategory');

if (localStorage.getItem('token')) {
  console.log("있다");
} else console.log('없다');

// async function getCategories() {
//   try {
//     const response = await fetch('/api/categories');
//     const data = await response.json();

//     var itemsHtml = '';
//     for (var i = 0; i < data.length; i++) {
//       itemsHtml += `
//         <button type="button" class="btn btn-warning category_title">${data[i].name}</button>
//       `;
//     }

//     document.querySelector('.items').innerHTML += itemsHtml;
//   } catch (error) {
//     console.error(error);
//   }
// }

// getCategories();

fetch('/api/categories')
  .then((response) => response.json())
  .then((data) => {
    var itemsHtml = '';
    for (var i = 0; i < data.length; i++) {
      itemsHtml += `
        <button type="button" class="btn btn-warning category_title">${data[i].name}</button>
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
      itemsHtml += `<div>
            <p class="item-title">상품명 : ${data[i].name}<p>
            <p class="item-price">가격 : ${data[i].price}<p>
            </div>
          `;
    }

    document.querySelector('.new-item-conatiner').innerHTML = itemsHtml;
  });

fetch('/api/products')
  .then((response) => response.json())
  .then((data) => {
    // console.log(data);
    var itemsHtml = '';
    for (var i = 0; i < data.length; i++) {
      itemsHtml += `<div>
            <p class="item-title">상품명 : ${data[i].name}<p>
            <p class="item-price">가격 : ${data[i].price}<p>
            </div>
          `;
    }

    document.querySelector('.best-item-conatiner').innerHTML = itemsHtml;
  });

function handleButtonClick(event) {
  console.log('asdf');
}

document.querySelectorAll('.category_title').forEach((button) => {
  button.addEventListener('click', handleButtonClick);
});
