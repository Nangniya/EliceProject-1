const btnOrderConfirm = document.querySelector('#btnOrderConfirm'); //결제하기버튼
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
function getUserOrderListsample6_execDaumPostcode() {
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
<<<<<<< HEAD
getUserOrderList(urlOrderId);
=======
>>>>>>> c5b59cac34fc58334ab4b35e9527579f44a2bae5

let data = localStorage.getItem('buy-cart'); // 로컬스토리지에서 받아오는 value 값 받아오기
const json = JSON.parse(data); //  JSON 형식이라서 객체로 받아오려면 JSON.parse 써야함

const orderDetail = document.querySelector('#order-detail-content-container'); //주문상세태그

let sum = 0; // 결제상세에서 총 금액 0원시작
const promises = [];

for (let i = 0; i < json.length; i++) {
  const promise = fetch(`/api/products/id/${json[i].id}`)
    .then((response) => response.json())
    .then((data) => {
      const price = parseInt(data.price);
      const sales = json[i].sales;
      const subtotal = price * sales;
      sum += subtotal;

      orderDetail.innerHTML += `
        <div class="orderDetail"> 
        <img class="imageUrl" src="/media/${data.imgUrl[0]}">
        <div>상품명 : ${data.name}</div>  
        <div>가격 : ${data.price}</div>  
        <div>수량 : ${json[i].sales}</div>
        </div> 
      `;
    });

  promises.push(promise);
}

Promise.all(promises).then(() => {
  const payContainer = document.querySelector('#pay-info-content-container'); //결제상세 태그
  payContainer.innerHTML += `
<div>총가격:${sum}원</div>
`;
});

btnOrderConfirm.addEventListener('click', function () {
  const confirmMsg = '결제하시겠습니까?';
<<<<<<< HEAD
});
=======

  if (confirm(confirmMsg)) {
    alert('주문이 완료되었습니다.!');
    window.location.href = './orderConfirm.html';
  }



});


>>>>>>> c5b59cac34fc58334ab4b35e9527579f44a2bae5
