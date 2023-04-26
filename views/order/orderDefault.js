const btnOrderConfirm = document.querySelector('#btnOrderConfirm');
const btnMoveCart = document.querySelector('#btnMoveCart');
const btnMoveOrderList = document.querySelector('#btnMoveOrderList');
const btnAddressInfo = document.querySelector('#btnAddressInfo');

const btnGroupOrderCreate = document.querySelector('.order-create');
const btnGroupOrderDetail = document.querySelector('.order-detail');


// urlSearch = new URLSearchParams(window.location.search);
// url = window.location.href;
// console.log(url);

const urlParams = new URL(location.href).searchParams;
// console.log(urlParams);
const urlOrderId = urlParams.get('orderId');
// console.log(urlOrderId);

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
  console.log(data);
  // console.log(data.data.name);
  // console.log(data.data.email);

  let name = data.data.name;
  let email = data.data.email;

  document.getElementById('user-info-content-name').innerHTML = name;
  document.getElementById('user-info-content-email').innerHTML = email;
}


//단가 콤마 반영
function priceToString(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


// 상품 정보 가져오기
// function getProductInfo(productId) {

//     fetch('http://localhost:8000/api/products')
//     .then((response) => response.json())
//     .then((product) => {
//         // console.log(product);
//         // console.log(product[0]);
//         // console.log(product[1]);

//         console.log(product[0].productId);
//         console.log(product[0].name);
//         console.log(product[0].price);
//         console.log(product[0].imgUrl);
//         console.log(product[0].content);
//     });

// // }

function getUserOrderList() {
  fetch('http://localhost:8000/api/orders')
    //fetch('http://localhost:8000/api/orders/getByOrderId')
    .then((response) => response.json())
    .then((data) => {

      console.log(data);

      // console.log(data[0]);
      // console.log(data[0].orderedProducts);
      // console.log(data[0].orderedProducts[0].productId);
      // console.log(data[0].orderedProducts[0].quantity);

      for (let i = 0; i < data.length; i++) {
        // console.log(data[i]);

        let orderId = data[i]._id;
        let userId = data[i].userId;
        let deliveryStatus = data[i].deliveryStatus;
        let createAt = data[i].createdAt;
        let price = data[i].price;
        // let quantity = data[i].quantity;
        let orderedProducts = data[i]; //주문한 품목들

        // //주문번호에 따른 상품목록
        // for (let j = 0; j < data.length; j++) {

        //     console.log(data[i].orderedProducts[j]);
        //     console.log(data[i].orderedProducts[j].productId);      //왜 안되지?
        //     console.log(data[i].orderedProducts[j].quantity);
        // }

        // let supplyPrice = data[i].price * quantity;     //공급가
        // let orderDate = createAt.substr(0, 10);

        // let temp_html = '';

        // temp_html += `<div class="order-detail-content">
        //                 <ul>
        //                     <li id="productImage"><img src="${productImage}" /></li>
        //                     <li id="productName">${productName}</li>
        //                     |
        //                     <li id="quantity">${quantity}개</li>
        //                     |
        //                     <li id="price">${price}원</li>
        //                     |
        //                     <li id="supplyPrice">${supplyPrice}원</li>
        //                 </ul>
        //             </div>`;
      }
    });
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


const deliveryMessageList = ['배송 요청사항 없음', '배송 전 연락 부탁드립니다.', '부재시 경비실(관리실)에 맡겨주세요.', '파손 위험이 있으니 조심히 배달하여 주세요. 감사합니다.'];

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
      if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
        addr = data.roadAddress;
      } else { // 사용자가 지번 주소를 선택했을 경우(J)
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
          extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
        }
        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if (extraAddr !== '') {
          extraAddr = ' (' + extraAddr + ')';
        }
        // 조합된 참고항목을 해당 필드에 넣는다. --> 없어서 주석처리
        // document.getElementById("sample6_extraAddress").value = extraAddr;

      } else {    //--> 없어서 주석처리
        // document.getElementById("sample6_extraAddress").value = '';
      }

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      document.getElementById('sample6_postcode').value = data.zonecode;
      document.getElementById("sample6_address").value = addr;
      // 커서를 상세주소 필드로 이동한다.
      document.getElementById("sample6_detailAddress").focus();
    }
  }).open();
}

getUser();
getUserOrderList();



