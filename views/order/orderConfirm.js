<<<<<<< HEAD
const btnOrderDetail = document.getElementById('btnOrderDetail');

btnOrderDetail.addEventListener('click', function () {
  window.location.href = '/orderDefault.html';
  //파라미터?를 던져주든지해서 주문상세로 넘어가게끔? 하면 좋겠는데(orderDefault.html 화면 활용)
});
=======
// user 정보 받기



// 장바구니에서 결제 선택한 localStorage 정보 가져오기
if (localStorage.getItem('token')) {
    console.log('있다');
} else console.log('없다');


function priceToString(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// 현재 주문한 내역 정보 받기
function getUserOrderList () {

    fetch('http://localhost:8000/api/orders')
    // fetch('http://localhost:8000/api/orders/getByOrderId')       //이거로 쓰는게 맞는데 우선 orders API 로 받아온다
    .then((response) => response.json())
    .then((data) => {
    
        // console.log(data);
        console.log(data[0]);
        // console.log(data[0].userId);
        // console.log(data[0]._id);
        // console.log(data[0].deliveryStatus);
        // console.log(data[0].createdAt);
        // console.log(data[0].price);

    
        let orderId = data[0]._id;
        let userId = data[0].userId;
        let deliveryStatus = data[0].deliveryStatus;
        let createAt = data[0].createdAt;
        let price = data[0].price;
        
        let orderDate = createAt.substr(0, 10);
    
        price = priceToString(price);

        let temp_html = '';
    
        temp_html += `<div class="main__profile">
                        <div class="main__avata">
                            <img
                                width="150px"
                                height="150px"
                                src="./productImage01.jpg"
                                alt="productImage"
                            />
                        </div>
                        <div class="main__header">
                            <div class="top">
                                <h4>주문번호: ${orderId}</h4>&nbsp;&nbsp;
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
                    </div>`
    
        const btnOrderDetail = document.getElementById("btnOrderDetail");
        document.getElementById('order-content-box').innerHTML = temp_html;
    
        btnOrderDetail.addEventListener('click', function() {
    
            alert('aaa');
            // window.location.href = "/orderDefault.html";
            window.location.href = "/orderDefault.html?id=" + orderId;
            //파라미터?를 던져주든지해서 주문상세로 넘어가게끔? 하면 좋겠는데(orderDefault.html 화면 활용)
        });
    
    });

}

getUserOrderList();
>>>>>>> d57e7837b753a549a32609a27b5bb16bb088ed80
