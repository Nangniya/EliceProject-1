/** 화면 요소 선언 */
const btnOrderConfirm = document.querySelector('#btnOrderConfirm');
const btnMoveCart = document.querySelector('#btnMoveCart');
const btnMoveOrderList = document.querySelector('#btnMoveOrderList');
const btnAddressInfo = document.querySelector('#btnAddressInfo');

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

/** 주문자 정보 가져오기 */
let currentUser = '';

let userName = '';
let address = '';
let email = '';
let phoneNum = '';
let receiver = '';
let deliveryMessage = '';

async function getUser() {
  const res = await fetch('http://localhost:8000/api/users', {
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
  // console.log(data);

  userName = data.data.name;
  email = data.data.email;
  address = data.data.address;
  phoneNum = data.data.phoneNumber;

  currentUser = data.data.id;
  // console.log(currentUser);

  document.getElementById(
    'user-info-content-name',
  ).innerHTML = `주문자   :    ${userName}`;
  document.getElementById(
    'user-info-content-email',
  ).innerHTML = `이메일 : ${email}`;
  document.getElementById(
    'user-info-content-address',
  ).innerHTML = `주소 : ${address}`;
  document.getElementById(
    'user-info-content-phoneNumber',
  ).innerHTML = `휴대전화 : ${phoneNum}`;

  return {
    userId: data.data.id,
    userName: data.data.name,
    email: data.data.email,
    address: data.data.address,
    phoneNum: data.data.phoneNumber,
  };
}
const dataCh = getUser();
console.log(dataCh);
console.log(dataCh);
console.log(dataCh.userId);

console.log('aa');

/** POST 로 보낼 데이터 작성 */
console.log(currentUser);
console.log(address);
console.log(phoneNum);
console.log(userName);
console.log(deliveryMessage);

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

/** 다음 주소 API  */
function sample6_execDaumPostcode() {
  new daum.Postcode({
    oncomplete: function (data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      // 각 주소의 노출 규칙에 따라 주소를 조합한다.
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
      var addr = ''; // 주소 변수
      var extraAddr = ''; // 참고항목 변수

      //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === 'R') {
        // 사용자가 도로명 주소를 선택했을 경우
        addr = data.roadAddress;
      } else {
        // 사용자가 지번 주소를 선택했을 경우(J)
        addr = data.jibunAddress;
      }

      // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
      if (data.userSelectedType === 'R') {
        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraAddr +=
            extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
        }
        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if (extraAddr !== '') {
          extraAddr = ' (' + extraAddr + ')';
        }
        // 조합된 참고항목을 해당 필드에 넣는다. --> 없어서 주석처리
        // document.getElementById("sample6_extraAddress").value = extraAddr;
      } else {
        //--> 없어서 주석처리
        // document.getElementById("sample6_extraAddress").value = '';
      }

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      document.getElementById('sample6_postcode').value = data.zonecode;
      document.getElementById('sample6_address').value = addr;
      // 커서를 상세주소 필드로 이동한다.
      document.getElementById('sample6_detailAddress').focus();
    },
  }).open();
}

/** 주문상세 */
let data = localStorage.getItem('buy-cart'); // 로컬스토리지에서 받아오는 value 값 받아오기
const json = JSON.parse(data); //  JSON 형식이라서 객체로 받아오려면 JSON.parse 써야함

let sum = 0; //결제상세에서 총 금액 0원시작

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

  console.log(cartProductName);
  console.log(cartProductElePrice);
  console.log(cartProductEleQty);
  console.log(cartProductEleSupplyPrice);
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
  const confirmMsg = '결제하시겠습니까?';

  fetch('http://localhost:8000/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: '643e1ada43da3cb65097f989',
      address: '대전 가양동',
      phoneNum: '010-0000-0000',
      receiver: 'kim',
      deliveryMessage: 'safe please',
      orderedProducts: [
        {
          productId: '643e4d7dcd5d39e480d32032',
          quantity: 10,
        },
      ],
      price: 10000,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data._id);
      console.log(data.userId);

      fetch(`/api/users/addOrder/${data.userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId: data._id }),
      }).then((res) => res.json());
    });

  if (confirm(confirmMsg)) {
  } else {
    alert('관리자에게 문의하세요');
  }
});

/** 금액 천단위 콤마 변환 함수 */
function priceToString(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// /** 상품정보 가져오기 */
// function getProductInfo(productId) {
//   fetch('http://localhost:8000/api/products')
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);

//       let productInfo = {};

//       for (let i = 0; i < data.length; i++) {
//         if (data[i]._id === productId) {
//           productInfo = {
//             productIdPick: data[i]._id,
//             category: data[i].category,
//             name: data[i].name,
//             price: data[i].price,
//             imgUrl: data[i].imgUrl[0],
//             content: data[i].content,
//           };
//           break;
//         }
//       }

//       return productInfo;
//     });
// }

// /** 주문정보 가져오기 */
// function getUserOrderList(urlOrderId) {
//   if (urlOrderId == null || urlOrderId == undefined) {
//     // alert("주문 / 결제페이지입니다.");
//     // return 0;
//   } else {
//     fetch('http://localhost:8000/api/orders/getByOrderId/' + urlOrderId)
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);

//         // let orderId = urlOrderId;
//         let userId = '';
//         let address = '';
//         let deliveryStatus = '';
//         let deliveryMessage = '';
//         let createAt = '';
//         let price = '';
//         let orderedProducts = {};

//         orderId = data._id;
//         userId = data.userId;
//         address = data.address;
//         deliveryStatus = data.deliveryStatus;
//         deliveryMessage = data.deliveryMessage;
//         createAt = data.createdAt;
//         price = data.price;
//         orderedProducts = data.orderedProducts;

//         let orderedProductList = [];

//         for (let i = 0; i < orderedProducts.length; i++) {
//           // console.log(orderedProducts[i].productId);
//           orderedProductList.push(getProductInfo(orderedProducts[i].productId));
//         }
//       });
//   }
// }

/** orderDefault 함수 실행 */
getUser(); //사용자 정보
// // getUserOrderList();
// // getProductInfo();

// getUserOrderList(urlOrderId);   //주문번호에 따른 주문정보 불러오기
