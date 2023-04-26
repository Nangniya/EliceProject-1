// import { addCommas } from "/useful-functions.js";

let cartItemList = document.querySelector('#cart-item-list');
let cartDetailList = localStorage.getItem('cart');
let cartList = [JSON.parse(cartDetailList)];
// const cartTempData = [
//   { name: '엘리스 의자 - BEIGE', price: 20000, manufacture: '집꾸미기' },
//   { name: '엘리스 책상 - WHITE', price: 30000, manufacture: '러브홈' },
//   { name: '엘비스 소파 - WHITE', price: 40000, manufacture: '마이홈' },
//   { name: '알렉스 거울', price: 10000, manufacture: '집플러스' },
// ];

// 로컬스토리지에 있는 장바구니 리스트 화면에 출력
function addCartItemList(cartList) {
  let cartListContent = '';
  console.log('cartList: ', cartList);
  if (cartList !== null && cartList.length !== 0) {
    for (let i = 0; i < cartList.length; i++) {
      cartListContent += ` 
                <li class="cart-item">
                    <div class="cart-item-column">
                    <div class="img-container">
                        <a href="/products/detail?id=${cartList[i].productId}" >
                          <img class="cart-img" src="${
                            cartList[i].image
                          }" alt="상품이미지">
                        </a>
                    </div>
                    </div>
                    
                    <div class="cart-item-column item-info-left"> 
                    <p class="work-name">${cartList[i].name}</p>
                    <p>${cartList[i].category}</p>
                    </div>
                    <div class="cart-item-column item-info-right">
                    <button class="item-delete-btn" type="button"><i class="fa-solid fa-trash-can" id=${
                      cartList[i].productId
                    }></i></button>
                    <p class="work-price">${parseInt(cartList[i].price)} 원</p>
                    </div>
                </li>`;
      document.querySelector('.cart-total-price').innerHTML = `${parseInt(
        totalPrice(cartList),
      )}원`;
      document.querySelector(
        '.all-item-order-btn',
      ).innerHTML = `총 ${totalCount(cartList)}건 주문 계속하기`;
    }
  } else {
    cartListContent += '장바구니에 담긴 상품이 없습니다.';
    document.querySelector('.cart-total').style.display = 'none';
    for (const btn of document.querySelectorAll('.buttons-container')) {
      btn.style.display = 'none';
    }
  }
  cartItemList.innerHTML = cartListContent;
}
addCartItemList(cartList);

// cart-total-price와 all-item-order-btn 합계 변경
function totalPrice(cartList) {
  return cartList.reduce((sum, cur) => sum + cur.price, 0);
}

function totalCount(cartList) {
  return cartList.length;
}

// 개별 cart list 삭제
const itemDeleteBtns = document.querySelectorAll('.item-delete-btn');

function itemDelete(e) {
  if (window.confirm('선택하신 상품을 장바구니에서 삭제하시겠습니까?')) {
    const newCartList = JSON.parse(localStorage.getItem('cart')).filter(
      (elem) => {
        return elem.productId !== e.target.id;
      },
    );
    localStorage.setItem('cart', JSON.stringify(newCartList));
    addCartItemList(newCartList);
  }
}

for (const btn of itemDeleteBtns) {
  btn.addEventListener('click', itemDelete);
}

// 전체 cart list 삭제
const allDeleteBtn = document.querySelector('.all-item-delete-btn');

function allDelete() {
  console.log(localStorage.getItem('cart'));
  if (window.confirm('전체 상품을 장바구니에서 삭제하시겠습니까?')) {
    localStorage.removeItem('cart');
    addCartItemList([]);
    window.location.reload();
  }
}

allDeleteBtn.addEventListener('click', allDelete);

// 주문하기 btn
const buyAllBtn = document.querySelector('.all-item-order-btn');

function buyAllItem() {
  const buyList = JSON.parse(localStorage.getItem('cart'));
  localStorage.setItem('buy-cart', JSON.stringify(buyList));

  // 로그인을 하지 않은 경우
  const token = localStorage.getItem('token');
  if (!token) {
    alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
    window.location.replace('/login');
    return;
  }
  alert('상품주문 페이지로 이동합니다.');
  window.location.replace('/order');
}

buyAllBtn.addEventListener('click', buyAllItem);
