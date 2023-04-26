<<<<<<< HEAD
getUser(); //user 정보 받기

// user 정보 받는 함수
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
  const userData = await res.json();
  const userId = userData.data.id;
  getUserOrderList(userId);
}

// 현재 주문한 내역 정보 받기
async function getUserOrderList(userId) {
  console.log(userId);
  const data = await fetch(
    `http://localhost:8000/api/orders/getByuserId/${userId}`,
  ).then((res) => res.json());
  const orderListWrapper = document.getElementById('order-content-box-wrapper');
  for (let i = 0; i < data.length; i++) {
    const element = `
        <div class="main__profile">
            <div class="main__header">
                <div class="top">
                    <h4>주문번호: ${data[i]._id}</h4>&nbsp;&nbsp;
                </div>
                <div class="middle">
                    <ul>
                        <li><b>주문일자</b>: ${data[i].updatedAt.slice(
                          0,
                          7,
                        )}</li>
                        <li><b>주문 상태</b>: ${data[i].deliveryStatus}</li>
                        <li><b>결제금액</b>: ${data[i].price}원</b></li>
                    </ul>
                </div>
            </div>
        </div>`;
    orderListWrapper.insertAdjacentHTML('afterbegin', element);
    const orderDetail = document.getElementById(
      `btnOrderDetail-${data[i]._id}`,
    );
    orderDetail.addEventListener('click', () => getOrderDetail(data[i]._id));
  }
}

function getOrderDetail(orderId) {
  console.log(orderId);
  // 해당 주문 상세 페이지로 이동하는 함수
}
=======

const orderContentBoxWrapper = document.getElementById('order-content-box-wrapper')

// user 정보 받기



// 장바구니에서 결제 선택한 localStorage 정보 가져오기
// if (localStorage.getItem('token')) {
//     console.log('있다');
// } else console.log('없다');

function priceToString(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// 현재 주문한 내역 정보 받기
function getUserOrderList () {

    fetch('http://localhost:8000/api/orders')
    .then((response) => response.json())
    .then((data) => {
    
        // console.log(data[0]);
        // console.log(data.length);
        
        let temp_html = '';

        let btnOrderDetail = [];
        // let orderIdArray = [];
        let orderIdArray = [];
        
        for (let i = 0; i < data.length; i++) {

            // console.log(data[i]);
            
            let orderId = data[i]._id;
            let userId = data[i].userId;
            let deliveryStatus = data[i].deliveryStatus;
            let createAt = data[i].createdAt;
            let price = data[i].price;
            
            let orderDate = createAt.substr(0, 10);
            // console.log(orderDate[i]); 

            price = priceToString(price);
            
            temp_html += `<div class="order-content-box">
                            <div class="order-content-box-image">
                                <img
                                    width="150px"
                                    height="150px"
                                    src="./productImage01.jpg"
                                    alt="productImage"
                                />
                            </div>
                            <div class="order-content-box-header">
                                <div class="top">
                                    <input type="hidden" name="txtOrderIdNum" id="orderId${i}" value="${orderId}">
                                    <h4>주문번호</h4>&nbsp;
                                    <div>${orderId}</div>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <button id="btnOrderDetail${i}" value="btnOrderDetail${i}">주문상세</button>
                                </div>
                                <div class="middle">
                                    <ul>
                                    <li><b>주문일자</b> ${orderDate}</li>
                                    <li><b>배송</b> ${deliveryStatus}</li>
                                    <li><b>결제금액</b> ${price}원</b></li>
                                    </ul>
                                </div>
                            </div>
                        </div>`;
    
            document.getElementById('order-content-box-wrapper').innerHTML = temp_html;

        }

        // console.log(btnOrderDetail);
        // console.log(orderIdArray);

        for(let j = 0; j < data.length; j++) {

            btnOrderDetail[j] = document.getElementById("btnOrderDetail" + j);
            orderIdArray[j] = document.getElementById("orderId" + j).value;

            console.log(btnOrderDetail);
            console.log(orderIdArray);

            btnOrderDetail[j].addEventListener('click', function() {
                window.location.href = "/order/orderDefault.html?orderId=" + orderIdArray[j];
            });
            
        }
    });
}
                
getUserOrderList();
>>>>>>> ea7bb6150f20c62baf9a781daa7dd6edbe5afed9
