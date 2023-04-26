// const searchbtn = document.querySelector('.searchbtn');
// const searchinput = document.querySelector('.searchinput');

const basketbtn = document.querySelector('#basket');
const loginbtn = document.querySelector('#login');
const mypage = document.querySelector('#mypage');
const category = document.querySelector('#myCategory');

if (localStorage.getItem('token')) {
  console.log('로그인되어있음');
} else console.log('로그인되어있지않음');

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

    function handleButtonClick(event) {
      let testhtml = '';
      fetch(`/api/products/category/${event.target.innerText}`)
        .then((response) => response.json())
        .then((data) => {
          for (let i = 0; i < data.length; i++) {
            testhtml += `<div class="item">
              <p class="item-title">상품명 : ${data[i].name}<p>
              <p class="item-price">가격 : ${data[i].price}<p>
              </div>
            `;
            console.log(data[i]);
          }
          if (testhtml) {
            document.querySelector('.test').innerHTML = testhtml;
          } else
            document.querySelector('.test').innerHTML = `<div class="item">
            <p class="item-title">상품없음<p>
            </div>`;
        });
    }
    document.querySelectorAll('.category_title').forEach((button) => {
      button.addEventListener('click', handleButtonClick);
    });
  })

  .catch((error) => console.error(error));

fetch('/api/products/recent')
  .then((response) => response.json())
  .then((data) => {
    var itemsHtml = '';
    for (var i = 0; i < data.length; i++) {
      itemsHtml += `<div class="item new-item" id=${data[i]._id}>
            <p class="item-title">상품명 : ${data[i].name}<p>
            <p class="item-price">가격 : ${data[i].price}<p>
            </div>
          `;
    }
    document.querySelector('.new-item-conatiner').innerHTML = itemsHtml;
    function newitemClick(event) {
      console.log(event.target);
      console.log(event);
      window.location.href = `http://localhost:8000/detail?id=${event.target.id}`;
    }
    document.querySelectorAll('.new-item').forEach((button) => {
      button.addEventListener('click', newitemClick);
    });
  });

fetch('/api/products')
  .then((response) => response.json())
  .then((data) => {
    var itemsHtml = '';
    for (var i = 0; i < data.length; i++) {
      itemsHtml += `<div class="item" id=${data[i]._id}>
            <p class="item-title">상품명 : ${data[i].name}<p>
            <p class="item-price">가격 : ${data[i].price}<p>
            </div>
          `;
    }
    document.querySelector('.best-item-conatiner').innerHTML = itemsHtml;
    function newitemClick(event) {
      window.location.href = `http://localhost:8000/detail?id=${event.target.id}`;
    }
    document.querySelectorAll('.item').forEach((button) => {
      button.addEventListener('click', newitemClick);
    });
  });
