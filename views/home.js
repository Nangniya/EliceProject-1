fetch('/api/categories')
  .then((response) => response.json())
  .then((data) => {
    let itemsHtml = '';
    for (let i = 0; i < data.length; i++) {
      itemsHtml += `
        <button type="button" class="btn btn-warning category_title">${data[i].name}</button>
          `;
    }

    document.querySelector('.items').innerHTML += itemsHtml;

    function handleButtonClick(event) {
      let testhtml = '';
      fetch('/api/products')
        .then((response) => response.json())
        .then((data) => {
          for (let i = 0; i < data.length; i++) {
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
    let itemsHtml = '';
    for (let i = 0; i < data.length; i++) {
      itemsHtml += `<div class=${data[i].name}>
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
    let itemsHtml = '';
    for (let i = 0; i < data.length; i++) {
      itemsHtml += `<div id=${data[i]._id}>
            <p class="item-title">상품명 : ${data[i].name}<p>
            <p class="item-price">가격 : ${data[i].price}<p>
            </div>
          `;
    }
    document.querySelector('.best-item-conatiner').innerHTML = itemsHtml;
    for (let i = 0; i < data.length; i++) {
      document
        .getElementById(`${data[i]._id}`)
        .addEventListener('click', () => {
          window.location.href = `/detail/?id=${data[i]._id}`;
        });
    }
  });
