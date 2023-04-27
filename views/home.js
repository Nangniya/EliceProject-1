const basketbtn = document.querySelector('#basket');
const loginbtn = document.querySelector('#login');
const mypage = document.querySelector('#mypage');
const category = document.querySelector('#myCategory');

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
            testhtml += `<div class="item" id=${data[i]._id}>
            <img id=${data[i]._id} src="/media/${data[i].imgUrl[0]}" alt="..." />
              <p class="item-title">상품명 : ${data[i].name}<p>
              <p class="item-price">가격 : ${data[i].price}<p>
              </div>
            `;
          }
          if (testhtml) {
            document.querySelector('.test').innerHTML = testhtml;
          } else
            document.querySelector('.test').innerHTML = `
            <p class="item-title">상품없음<p>
            `;
          function newitemClick(event) {
            window.location.href = `detail?id=${event.target.id}`;
          }
          document.querySelectorAll('.item').forEach((button) => {
            button.addEventListener('click', newitemClick);
          });
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
      <img id=${data[i]._id} src="/media/${data[i].imgUrl[0]}" alt="..." />
            <div class="item-title">상품명 : ${data[i].name}</div>
            <div class="item-price">가격 : ${data[i].price}</div>
            </div>
          `;
    }
    document.querySelector('.new-item-conatiner').innerHTML = itemsHtml;
    function newitemClick(event) {
      console.log(event.target);
      console.log(event);
      window.location.href = `/detail?id=${event.target.id}`;
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
            <img id=${data[i]._id} src="/media/${data[i].imgUrl[0]}"  alt="..." />
            <div class="item-title">상품명 : ${data[i].name}</div>
            <div class="item-price">가격 : ${data[i].price}</div>
            </div>
          `;
    }
    document.querySelector('.best-item-conatiner').innerHTML = itemsHtml;
    function newitemClick(event) {
      window.location.href = `/detail?id=${event.target.id}`;
    }
    document.querySelectorAll('.item').forEach((button) => {
      button.addEventListener('click', newitemClick);
    });
  });
