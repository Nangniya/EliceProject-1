const itemcategory = document.querySelector('.category');
const item_name = document.querySelector('.itemName');
const item_price = document.querySelector('.price');
const cartBtn = document.querySelector('.moveTocart');
const buyNowBtn = document.querySelector('.buyNow');
const details = document.querySelector('#details');
const plusBtn = document.querySelector('.plus');
const minusBtn = document.querySelector('.minus');
const salesCount = document.querySelector('.salesCount');
const imgUrl = document.querySelector('.imgUrl');

const urlParam = window.location.search;
const param = urlParam.replace('?', '').split(/[=?&]/)[1];


fetch(`http://localhost:8000/api/products/id/${param}`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    imgUrl.innerHTML = `
    <img class="imageUrl" src="/media/${data.imgUrl[0]}">
    `;
    function rendering() {
      itemcategory.innerHTML = `${data.category}`;
      item_name.innerHTML = `${data.name}`;
      item_price.innerHTML = `${data.price}` + ' 원';
      details.innerHTML = `${data.details}`;
    }
    rendering();
  });

plusBtn.addEventListener('click', () => {
  if (parseInt(salesCount.innerText) >= 10) {
    alert('최대 구매 수량은 10개 입니다.');
    return;
  } else {
    salesCount.innerText = parseInt(salesCount.innerText) + 1;
  }
});

minusBtn.addEventListener('click', () => {
  if (parseInt(salesCount.innerText) <= 1) {
    alert('최소 구매 수량은 1개 입니다.');
    return;
  } else {
    salesCount.innerText = parseInt(salesCount.innerText) - 1;
  }
});
let cartArray = [];
//장바구니 담기
cartBtn.addEventListener('click', () => {
  const data = {
    id: param,
    sales: parseInt(salesCount.innerText),
  };

  if (localStorage.getItem('cart') == null) {
    localStorage.setItem('cart', JSON.stringify([data]));
  } else {
    const cartList = JSON.parse(localStorage.getItem('cart'));
    const sIdx = cartList.findIndex((obj) => obj.id === data.id) + 1;
    // console.log(data);
    // console.log(sIdx);
    if (sIdx) {
      cartList[sIdx - 1].sales = cartList[sIdx - 1].sales * 1 + data.sales;
    } else {
      cartList.push(data);
    }
    localStorage.setItem('cart', JSON.stringify(cartList));
  }
  const moveTocart = confirm(
    '상품이 장바구니에 담겼습니다.\n장바구니로 이동하시겠습니까?',
  );
  if (moveTocart === true) {
    window.location.href = '/cart';
  }
});

buyNowBtn.addEventListener('click', function () {
  const data = {
    name: item_name.innerHTML,
    category: itemcategory.innerHTML,
    price: item_price.innerHTML,
    sales: salesCount.innerText,
  };
  const buyNow = confirm('바로 구매하시겠습니까?');
  if (buyNow === true) {
    localStorage.setItem('buy-cart', JSON.stringify([data]));
    window.location.href = '/order/detail.html';
  }
});
