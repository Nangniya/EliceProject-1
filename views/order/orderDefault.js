const btnOrderCreateCancel = document.querySelector('#btnOrderCreateCancel');
const btnOrderDetailCancel = document.querySelector('#btnOrderDetailCancel');
const btnOrderConfirm = document.querySelector('#btnOrderConfirm');
const btnMoveCart = document.querySelector('#btnMoveCart');
const btnMoveOrderList = document.querySelector('#btnMoveOrderList');
const btnAddressInfo = document.querySelector('#btnAddressInfo');

const btnGroupOrderCreate = document.querySelector('.order-create');
const btnGroupOrderDetail = document.querySelector('.order-detail');

let urlSearch = "";
let urlOrderId = "";

urlSearch = new URLSearchParams(location.search);
urlOrderId = urlSearch.get('orderId');

if(urlOrderId !== null && urlOrderId !== undefined) {
    // null 및 undefined가 아닌 경우 실행되는 로직 - 주문상세페이지
    btnGroupOrderCreate.style.display = "none";
    btnGroupOrderDetail.style.display = "block";
} else {
    // null 및 undefined인 경우 실행되는 로직 - 주문/결제페이지
    btnGroupOrderCreate.style.display = "block";
    btnGroupOrderDetail.style.display = "none";
}

btnOrderCreateCancel.addEventListener('click', function() {
    window.location.href = "../index.html";
});

btnOrderDetailCancel.addEventListener('click', function() {
    window.location.href = "../index.html";
});

btnMoveCart.addEventListener('click', function() {
    window.location.href = "../cart";
});

btnMoveOrderList.addEventListener('click', function() {
    window.location.href = "../order/orderList.html";
});

btnOrderConfirm.addEventListener('click', function() {

    const confirmMsg = "결제하시겠습니까?";

    if (confirm (confirmMsg)) {
        alert('주문이 완료되었습니다.');
        window.location.href = "./orderConfirm.html";
    }
});

btnMoveCart.addEventListener('click', function() {
    //장바구니로 돌아가기
    window.location.href = "../cart/";
});

btnAddressInfo.addEventListener('click', function() {
    //주소록 목록이 띄워지면 좋겠는데 우선은 이걸로 한다
    window.open("/delivery/addressInfo.html"
    , "addressInfo", "top=250, left=400, width=650, height=350, toolbar=no, menubar=no, scrollbars=yes, resizeable=no");
});


async function getUser(){
    const res = await fetch('http://localhost:8000/api/users',{
        headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    if(!res.ok) {
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


// 주문자 정보 가져오기
// function getCurrentUser () {
//     fetch('http://localhost:8000/api/users')
//     .then((response) => response.json())
//     .then((data) => {
        
//         // console.log(data);
//         let name = data.name;
//         let email = data.email;
//         let address = data.address;
//         let phoneNum = data.phoneNum;

//         document.getElementById('user-info-content-name') = name;
//         document.getElementById('user-info-content-email') = email;
//         document.getElementById('user-info-content-address') = address;
//         document.getElementById('user-info-content-phoneNum') = phoneNum;

//     });
    
// }

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


function getUserOrderList () {

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

            console.log(data[i]);
            
            let orderId = data[i]._id;
            let userId = data[i].userId;
            let deliveryStatus = data[i].deliveryStatus;
            let createAt = data[i].createdAt;
            let price = data[i].price;
            // let quantity = data[i].quantity;
            let orderedProducts = data[i];                  //주문한 품목들

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


getUser();
getUserOrderList();

