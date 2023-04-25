const itemcategory = document.querySelector('.category');
const item_name = document.querySelector('.itemName');
const item_price = document.querySelector('.price');
const cartBtn = document.querySelector('.moveTocart');
const buyNowBtn = document.querySelector('.buyNow');
const details = document.querySelector('#details');
const plusBtn = document.querySelector('.plus');
const minusBtn = document.querySelector('.minus');
const salesCount = document.querySelector('.salesCount');

const DetailTempData = [
  {
    category: 'Chairs',
    name: '엘리스 의자 - BEIGE',
    price: 20000,
    details:
      '엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙엘리스트랙',
  },
];

const DetailSaveData = JSON.stringify(DetailTempData);
localStorage.setItem('detail', DetailSaveData);
const urlParam = window.location.search;
const param = urlParam.replace('?', '').split(/[=?&]/)[1];
fetch(`http://localhost:8000/api/products/id/${param}`)
  .then((response) => response.json())
  .then((data) => {
    function rendering() {
      itemcategory.innerHTML = `${data.category}`;
      item_name.innerHTML = `${data.name}`;
      item_price.innerHTML = `${data.price}` + ' 원';
      details.innerHTML = `${data.details}`;
    }
    rendering();
  });

function saveData(salseCount, storeName) {
  if (window.indexedDB) {
    const databaseName = 'cart';
    const version = 1;
    const request = indexedDB.open(databaseName, version);

    const data = {
      name: item_name.innerHTML,
      category: itemcategory.innerHTML,
      price: item_price.innerHTML,
      sales: salesCount.innerText,
    };
    console.log(data);
    request.onupgradeneeded = function () {
      //장바구니용 objectStore
      request.result.createObjectStore('items', { autoIncrement: true });
      //바로구매용 objectStore
      request.result.createObjectStore('nowBuy', { keyPath: 'id' });
    };

    request.onsuccess = function () {
      localStorage.setItem('storeName', storeName);
      const objStore = request.result
        .transaction(`${storeName}`, 'readwrite')
        .objectStore(`${storeName}`);

      if (storeName == 'items') {
        isExist(data, objStore);
      } else {
        objStore.add(data);
      }
    };
    request.onerror = function (event) {
      alert(event.target.errorCode);
    };
  }
}

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

//장바구니 담기
cartBtn.addEventListener('click', function () {
  saveData(salesCount, 'items');
  const moveTocart = confirm(
    '상품이 장바구니에 담겼습니다.\n장바구니로 이동하시겠습니까?',
  );
  if (moveTocart === true) {
    window.location.href = '/cart';
  }
});

buyNowBtn.addEventListener('click', function () {
  // if (localStorage.getItem("loggedIn") === "true") {
  const buyNow = confirm('바로 구매하시겠습니까?');
  if (buyNow === true) {
    // saveData(salesCount, 'nowBuy');
    // localStorage.setItem('keys', localStorage.getItem('itemDetail'));
    window.location.href = '/order/orderDefault.html';
    return;
  }
  return;
  // }
  //   alert('로그인을 먼저 해주세요.');
});
