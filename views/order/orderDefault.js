const btnOrderConfirm = document.querySelector('#btnOrderConfirm');
const btnMoveCart = document.querySelector('#btnMoveCart');
const btnMoveOrderList = document.querySelector('#btnMoveOrderList');
const btnAddressInfo = document.querySelector('#btnAddressInfo');

const btnGroupOrderCreate = document.querySelector('.order-create');
const btnGroupOrderDetail = document.querySelector('.order-detail');

// URL의 orderId 가져오기
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

//주문자 정보 가져오기
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
  let name = data.data.name;
  let email = data.data.email;
  let address = data.data.address;
  let phone = data.data.phoneNumber;

  document.getElementById(
    'user-info-content-name',
  ).innerHTML = `주문자   :    ${name}`;
  document.getElementById(
    'user-info-content-email',
  ).innerHTML = `이메일 : ${email}`;
  document.getElementById(
    'user-info-content-address',
  ).innerHTML = `주소 : ${address}`;
  document.getElementById(
    'user-info-content-phoneNumber',
  ).innerHTML = `휴대전화 : ${phone}`;
}

function priceToString(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

//상품정보 가져오기
function getProductInfo(productId) {
  fetch(`http://localhost:8000/api/products/${productId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      let productInfo = {};

      for (let i = 0; i < data.length; i++) {
        if (data[i]._id === productId) {
          productInfo = {
            productIdPick: data[i]._id,
            category: data[i].category,
            name: data[i].name,
            price: data[i].price,
            imgUrl: data[i].imgUrl[0],
            content: data[i].content,
          };
          break;
        }
      }

      return productInfo;
    });
}

function getUserOrderList(urlOrderId) {
  if (urlOrderId == null || urlOrderId == undefined) {
    // alert("주문 / 결제페이지입니다.");
    // return 0;
  } else {
    fetch('http://localhost:8000/api/orders/getByOrderId/' + urlOrderId)
      .then((response) => response.json())
      .then((data) => {
        // let orderId = urlOrderId;
        let userId = '';
        let address = '';
        let deliveryStatus = '';
        let deliveryMessage = '';
        let createAt = '';
        let price = '';
        let orderedProducts = {};

        orderId = data._id;
        userId = data.userId;
        address = data.address;
        deliveryStatus = data.deliveryStatus;
        deliveryMessage = data.deliveryMessage;
        createAt = data.createdAt;
        price = data.price;
        orderedProducts = data.orderedProducts;

        let orderedProductList = [];

        for (let i = 0; i < orderedProducts.length; i++) {
          // console.log(orderedProducts[i].productId);
          orderedProductList.push(getProductInfo(orderedProducts[i].productId));
        }
      });
  }
}

/** 배송지 정보 */
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
  });
}

getUser();
getUserOrderList(urlOrderId);

let data = localStorage.getItem('buy-cart'); // 로컬스토리지에서 받아오는 value 값 받아오기
const json = JSON.parse(data); //  JSON 형식이라서 객체로 받아오려면 JSON.parse 써야함

let sum = 0; //결제상세에서 총 금액 0원시작

const orderDetail = document.querySelector('#order-detail-content-container'); //주문상세태그
let html = '';

for (let i = 0; i < json.length; i++) {
  sum += parseInt(json[i].price); //가격 합산
  orderDetail.innerHTML += `
<div>상품명:${json[i].name}   가격:${json[i].price}  수량${json[i].sales}개</div>
`;
}
const payContainer = document.querySelector('#pay-info-content-container'); //결제상세 태그
payContainer.innerHTML += `
<div>총가격:${sum}</div>
`;

fetch('http://localhost:8000/api/orders', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    userId: currentUser,
    address: address,
    phoneNum: phoneNum,
    receiver: userName,
    deliveryMessage: deliveryMessage,
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
  .then((data) => console.log(data));
