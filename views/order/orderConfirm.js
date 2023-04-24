
const btnOrderDetail = document.getElementById("btnOrderDetail");

btnOrderDetail.addEventListener('click', function() {

    window.location.href = "/orderDefault.html";
    //파라미터?를 던져주든지해서 주문상세로 넘어가게끔? 하면 좋겠는데(orderDefault.html 화면 활용)
});


let temp_html = ``;

temp_html = `<div class="main__profile">
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
                        <h4>주문번호: 202304182251-01</h4>&nbsp;&nbsp;
                        <button id="btnOrderDetail">주문상세</button>
                    </div>
                    <div class="middle">
                        <ul>
                        <li><b>주문일자</b> 2023-04-18</li>
                        <li><b>배송</b> 준비중</li>
                        <li><b>결제금액</b> 280,000원</b></li>
                        </ul>
                    </div>
                </div>
            </div>`;

// document.getElementById('order-content-box-wrapper').append(temp_html);

