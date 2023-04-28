/** 화면 요소 선언 */
const btnOrderConfirm = document.querySelector('#btnOrderConfirm');
const btnMoveCart = document.querySelector('#btnMoveCart');
const btnMoveOrderList = document.querySelector('#btnMoveOrderList');

const btnGroupOrderCreate = document.querySelector('.order-create');
const btnGroupOrderDetail = document.querySelector('.order-detail');

/** URL의 orderId 가져오기 - orderId 유무에 따라 페이지 변경 */
const urlParams = new URL(location.href).searchParams;
const urlOrderId = urlParams.get('orderId');

if (urlOrderId !== null && urlOrderId !== undefined) {
  // null 및 undefined가 아닌 경우 실행되는 로직 - 주문상세페이지
  btnGroupOrderCreate.style.display = 'none';
  btnGroupOrderDetail.style.display = 'block';
} else {
  // null 및 undefined인 경우 실행되는 로직 - 주문/결제페이지
  btnGroupOrderCreate.style.display = 'block';
  btnGroupOrderDetail.style.display = 'none';
}

/** 금액 천단위 콤마 변환 함수 */
function priceToString(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/** 화면 버튼 이벤트 */
btnOrderCreateCancel.addEventListener('click', function () {
  window.location.href = '../index.html';
});

btnOrderDetailCancel.addEventListener('click', function () {
  window.location.href = '../index.html';
});

btnMoveCart.addEventListener('click', function () {
  window.location.href = '../cart';
});

btnMoveOrderList.addEventListener('click', function () {
  // window.location.href = '../order/orderList.html';
  window.location.href = '../order/index.html';
});

btnMoveCart.addEventListener('click', function () {
  //장바구니로 돌아가기
  window.location.href = '../cart/';
});

async function getUser() {
  const res = await fetch('/api/users', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  if (!res.ok) {
    const errorContent = await res.json();
    const { reason } = errorContent;

    throw new Error(reason);
  }

  const data = await res.json();

  document.getElementById(
    'user-info-content-name',
  ).innerHTML = `주문자   :    ${data.data.name}`;
  document.getElementById(
    'user-info-content-email',
  ).innerHTML = `이메일 : ${data.data.email}`;
  document.getElementById(
    'user-info-content-address',
  ).innerHTML = `주소 : ${data.data.address}`;
  document.getElementById(
    'user-info-content-phoneNumber',
  ).innerHTML = `휴대전화 : ${data.data.phoneNumber}`;

  return {
    userId: data.data.id,
    userName: data.data.name,
    email: data.data.email,
    address: data.data.address,
    phoneNum: data.data.phoneNumber,
  };
}
async function getUserData() {
  try {
    const data = await getUser();
    currentUser = data.userId;
    // 이후 currentUser 변수 사용 가능
    console.log(currentUser);
  } catch (error) {
    console.error(error);
  }
}

getUser();
currentUser = getUserData();

/** 배송지 정보 설정 */
const addressContentWrapper = document.getElementById(
  'address-content-select-wrapper-phone',
);

const phonePrefixNumList = ['', '02', '051', '053', '032', '062', '010'];

window.addEventListener('load', () => {
  phonePrefixNumList.forEach((number) => {
    const selectOption = document.createElement('option');
    selectOption.innerHTML = number;
    addressContentWrapper.append(selectOption);
  });
});

const addressContentMessage = document.getElementById(
  'address-content-select-wrapper-message',
);

const deliveryMessageList = [
  '배송 요청사항 없음',
  '배송 전 연락 부탁드립니다.',
  '부재시 경비실(관리실)에 맡겨주세요.',
  '파손 위험이 있으니 조심히 배달하여 주세요. 감사합니다.',
];

window.addEventListener('load', () => {
  deliveryMessageList.forEach((number) => {
    const selectOptionDeliveryMessage = document.createElement('option');
    selectOptionDeliveryMessage.innerHTML = number;
    addressContentMessage.append(selectOptionDeliveryMessage);
  });
});

/** 주문상세 */
const data = localStorage.getItem('buy-cart'); // 로컬스토리지에서 받아오는 value 값 받아오기
const json = JSON.parse(data); //  JSON 형식이라서 객체로 받아오려면 JSON.parse 써야함
console.log(json);

const orderDetail = document.querySelector('#order-detail-content-container'); //주문상세태그
// let html = '';

let cartSum = 0;
let cartProductName = '';
let cartProductElePrice = 0;
let cartProductEleQty = 0;
let cartProductEleSupplyPrice = 0;

for (let i = 0; i < json.length; i++) {
  cartProductName = json[i].name;
  cartProductElePrice = parseInt(json[i].price.split(' ')[0]);
  cartProductEleQty = parseInt(json[i].sales);
  cartProductEleSupplyPrice = cartProductElePrice * cartProductEleQty;

  cartSum = cartProductEleSupplyPrice + cartSum;

  orderDetail.innerHTML += `<div class="order-detail-content">
    <ul>
      <li id="productImage"><img src="productImage01.jpg" /></li>
      <li>
        <div>
          <ul>
            <li id="productName">상품명: ${cartProductName}</li>
            <li id="price">가격: ${priceToString(cartProductElePrice)}원</li>
            <li id="quantity">수량: ${priceToString(cartProductEleQty)}개</li>
            <li id="supplyPrice">합계: ${priceToString(
              cartProductEleSupplyPrice,
            )}원</li>
          </ul>
        </div>
      </li>
    </ul>
  </div>`;
}

/** 결제상세 */
const payContainer = document.querySelector('#pay-info-content-container'); //결제상세 태그
// payContainer.innerHTML += `<div>총가격:${cartSum}</div>`;
payContainer.innerHTML += `<div>
                                결제금액: <span id="sumSupplyPrice"></span>${priceToString(
                                  cartSum,
                                )}원
                            </div>`;

/** 결제하기 */
btnOrderConfirm.addEventListener('click', function () {
  let inputReceiver = document.getElementById('inputReceiver').value;
  let inputPhoneNum1 = document.getElementById(
    'address-content-select-wrapper-phone',
  ).value;
  let inputPhoneNum2 = document.getElementById('inputPhoneNum2').value;
  let inputPhoneNum3 = document.getElementById('inputPhoneNum3').value;
  let sample6_postcode = document.getElementById('sample6_postcode').value;
  let sample6_address = document.getElementById('sample6_address').value;
  let sample6_detailAddress = document.getElementById(
    'sample6_detailAddress',
  ).value;
  let deliveryMessage = document.getElementById(
    'address-content-select-wrapper-message',
  ).value;

  inputAddress =
    sample6_address +
    ' ' +
    sample6_detailAddress +
    '(' +
    sample6_postcode +
    ')';
  const inputPhoneNum = inputPhoneNum1 + inputPhoneNum2 + inputPhoneNum3;
  const cartIdArray = json.map((arg) => {
    return arg.id;
  });

  fetch('/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: currentUser,
      address: inputAddress,
      phoneNum: inputPhoneNum,
      receiver: inputReceiver,
      deliveryMessage: deliveryMessage,
      orderedProducts: cartIdArray,
      price: cartSum,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      fetch(`/api/users/addOrder/${data.userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: data._id,
        }),
      });

      localStorage.removeItem('buy-cart');
      window.location.href = '/';
    });
});

getUser(); //사용자 정보
