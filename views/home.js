const searchbtn = document.querySelector('.searchbtn');
const searchinput = document.querySelector('.searchinput');

const basketbtn = document.querySelector('#basket');
const loginbtn = document.querySelector('#login');
const mypage = document.querySelector('#mypage');
const category = document.querySelector('#myCategory');

if (localStorage.getItem('token')) {
  console.log('있다');
} else console.log('없다');

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
      // console.log(event.target.innerText);
      let testhtml = '';
      fetch('/api/products')
        .then((response) => response.json())
        .then((data) => {
          for (let i = 0; i < data.length; i++) {
            // console.log(data[i].category);
            if (event.target.innerText == data[i].category) {
              testhtml += `<div>
              <p class="item-title">상품명 : ${data[i].name}<p>
              <p class="item-price">가격 : ${data[i].price}<p>
              </div>
            `;
            }
          }
          if (testhtml) {
            document.querySelector('.test').innerHTML = testhtml;
          } else
            document.querySelector(
              '.test',
            ).innerHTML = `<p class="item-title">해당 카테고리 상품없음<p>`;
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

// 아이템 검색

searchbtn.addEventListener('click', function (e) {
  e.defaultPrevented;
  fetch('/api/products')
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        if (searchinput.value == data[i].name) {
          alert('상품 있음 해당상품페이지로 이동');
          return;
        }
      }
      alert('상품이 없슴!');
    });
});
