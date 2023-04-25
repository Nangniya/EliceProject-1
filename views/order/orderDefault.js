const btnOrderCancel = document.querySelector('#btnOrderCancel');
const btnOrderConfirm = document.querySelector('#btnOrderConfirm');
const btnMoveCart = document.querySelector('#btnMoveCart');
const btnAddressInfo = document.querySelector('#btnAddressInfo');

const btnGroupOrderCreate = document.querySelector('.order-create');
const btnGroupOrderDetail = document.querySelector('.order-detail');

let urlSearch = '';
let urlOrderId = '';

urlSearch = new URLSearchParams(location.search);
urlOrderId = urlSearch.get('orderId');

if (urlOrderId !== null && urlOrderId !== undefined) {
  // null 및 undefined가 아닌 경우 실행되는 로직 - 주문상세페이지
  btnGroupOrderCreate.style.display = 'none';
  btnGroupOrderDetail.style.display = 'block';
} else {
  // null 및 undefined인 경우 실행되는 로직 - 주문/결제페이지
  btnGroupOrderCreate.style.display = 'block';
  btnGroupOrderDetail.style.display = 'none';
}

btnOrderCancel.addEventListener('click', function () {
  //홈 화면으로 돌아가기
  window.location.href = '../index.html';
});

btnOrderConfirm.addEventListener('click', function () {
  const confirmMsg = '결제하시겠습니까?';

  if (confirm(confirmMsg)) {
    alert('주문이 완료되었습니다.');
    window.location.href = './orderConfirm.html';
  }
});

btnMoveCart.addEventListener('click', function () {
  //장바구니로 돌아가기
  window.location.href = '../cart/';
});

btnAddressInfo.addEventListener('click', function () {
  //주소록 목록이 띄워지면 좋겠는데 우선은 이걸로 한다
  window.open(
    '/delivery/addressInfo.html',
    'addressInfo',
    'top=250, left=400, width=750, height=500, toolbar=no, menubar=no, scrollbars=yes, resizeable=no',
  );
});

//주문자 정보 가져오기
function getCurrentUser() {
  fetch('http://localhost:8000/api/users')
    .then((response) => response.json())
    .then((data) => {
      const name = document.getElementById('user-info-content-name');
      const email = document.getElementById('user-info-content-email');
      const address = document.getElementById('user-info-content-address');
      const phoneNum = document.getElementById('user-info-content-phoneNum');
    });
}

//단가 콤마 반영
function priceToString(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

//상품 정보 가져오기
function getProductInfo() {
  fetch('http://localhost:8000/api/products')
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

function getUserOrderList() {
  fetch('http://localhost:8000/api/orders')
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        console.log(data[i]);

        let orderId = data[i]._id;
        let userId = data[i].userId;
        let deliveryStatus = data[i].deliveryStatus;
        let createAt = data[i].createdAt;
        let price = data[i].price;
        let quantity = data[i].quantity;
        let supplyPrice = data[i].price * quantity; //공급가
        let orderDate = createAt.substr(0, 10);

        let temp_html = '';

        temp_html += `<div class="order-detail-content">
                            <ul>
                                <li id="productImage"><img src="${productImage}" /></li>
                                <li id="productName">케로케로케로피 페이스 쿠션</li>
                                |
                                <li id="quantity">${quantity}개</li>
                                |
                                <li id="price">${price}원</li>
                                |
                                <li id="supplyPrice">${supplyPrice}원</li>
                            </ul>
                            </div>`;
      }
    });
}

getCurrentUser();
getUserOrderList();
