// user 정보 받기



// 장바구니에서 결제 선택한 localStorage 정보 가져오기
// if (localStorage.getItem('token')) {
//     console.log('있다');
// } else console.log('없다');


function priceToString(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


// 장바구니 -> 주문/결제 -> 주문완료로 넘어온 주문정보(주문번호) 값 받기
// let orderId = "";



// 현재 주문한 내역 정보 받기  --> 사용자 정보가 현재 주문한 내역으로 들어가야 됌
function getUserOrderList () {

    fetch('http://localhost:8000/api/orders')
    // fetch('http://localhost:8000/api/orders/getByOrderId')       //이거로 쓰는게 맞는데 우선 orders API 로 받아온다
    .then((response) => response.json())
    .then((data) => {
    
        console.log(data);
        // console.log(data[0]);
        // console.log(data[0].userId);
        // console.log(data[0]._id);
        // console.log(data[0].deliveryStatus);
        // console.log(data[0].createdAt);
        // console.log(data[0].price);

        let userId = data[0].userId;
        let orderId = data[0]._id;
        orderId = data[0]._id;
        let deliveryStatus = data[0].deliveryStatus;
        let createAt = data[0].createdAt;
        let price = data[0].price;
        
        let orderDate = createAt.substr(0, 10);
    
        price = priceToString(price);
        
        let temp_html = '';
            
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
                                <h4>주문번호</h4>&nbsp;
                                <div>${orderId}</div>&nbsp;&nbsp;&nbsp;&nbsp;
                                <button id="btnOrderDetail">주문상세</button>
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
    
        const btnOrderDetail = document.getElementById("btnOrderDetail");
        btnOrderDetail.addEventListener('click', function() {

            // console.log(orderId);
            window.location.href = "/order/orderDefault.html?orderId=" + orderId;

        });

    });
}


getUserOrderList();