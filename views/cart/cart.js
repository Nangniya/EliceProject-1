// import { addCommas } from "/useful-functions.js";

let cartItemList = document.querySelector('#cart-item-list');
let cartList = [JSON.parse(localStorage.getItem('cart'))];

let a;

const test = document.querySelector('.test');
// 로컬스토리지에 있는 장바구니 리스트 화면에 출력
function addCartItemList(cartList) {
  let cartListContent = '';
  console.log('cartList: ', cartList);

  if (cartList !== null && cartList.length !== 0) {
    for (let i = 0; i < cartList[0].length; i++) {
      fetch(`http://api/products/id/${cartList[0][i].id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

        });

      cartListContent += ` 
                <li class="cart-item">
                    <div class="cart-item-column">
                    <div class="img-container">
                          <img class="cart-img" src="${cartList[0][i].image
        }" alt="상품이미지">
                        </a>
                    </div>
                    </div>
                    
                    <div class="cart-item-column item-info-left"> 
                    <p class="work-name">${cartList[0][i].name}</p>
                    <p>${cartList[0][i].category}</p>
                    </div>
                    <div>
                    <button class="minus-button" type="button"><p id=${cartList[0][i].id
        }>-</p></button>
                    </div>
                      <p class="salesCount">${cartList[0][i].sales}</p>
                    <div>
                    <button class="plus-button" type="button"><p id=${cartList[0][i].id
        }>+</p></button>
                    </div>
                    <div class="cart-item-column item-info-right">
                    <button class="item-delete-btn" type="button"><i class="fa-solid fa-trash-can" id=${cartList[0][i].id
        }></i></button>
                    <p class="work-price">${parseInt(cartList[0][i].price) * cartList[0][i].sales
        }원</p>
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
  return cartList[0].reduce(
    (sum, cur) => sum + parseInt(cur.price) * cur.sales,
    0,
  );
}

function totalCount(cartList) {
  return cartList[0].length;
}

// 개별 cart list 삭제
const itemDeleteBtns = document.querySelectorAll('.item-delete-btn');

function itemDelete(e) {
  if (window.confirm('선택하신 상품을 장바구니에서 삭제하시겠습니까?')) {
    const newCartList = JSON.parse(localStorage.getItem('cart'));
    for (let i = 0; i < newCartList.length; i++) {
      if (newCartList[i].id == e.target.id) {
        newCartList.splice(newCartList[i], 1);
      }
    }
    console.log(newCartList);
    // newCartList.filter((elem) => {
    //   return elem.id !== e.target.id;
    // });

    localStorage.setItem('cart', JSON.stringify(newCartList));
    addCartItemList(newCartList);

    window.location.reload();
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

const plusBtn = document.querySelector('.plus-button');
plusBtn.addEventListener('click', (e) => {
  let cartList = JSON.parse(localStorage.getItem('cart'));
  console.log(cartList[0]);
  for (let i = 0; i < cartList.length; i++) {
    if (cartList[i].id == e.target.id) {
      // cartList[0][i].sales = cartList[0][i].sales + 1;
      if (window.confirm('해당 상품의 개수를 추가하시겠습니까?')) {
        console.log('suc');
        cartList[i].sales = parseInt(cartList[i].sales) + 1;
        console.log(cartList);

        window.location.reload();
      }
    }
  }
  localStorage.setItem('cart', JSON.stringify(cartList));
});

const minusBtn = document.querySelector('.minus-button');
minusBtn.addEventListener('click', (e) => {
  let cartList = JSON.parse(localStorage.getItem('cart'));
  for (let i = 0; i < cartList.length; i++) {
    if (cartList[i].id == e.target.id) {
      // cartList[0][i].sales = cartList[0][i].sales + 1;
      if (window.confirm('해당 상품의 개수를 줄이시겠습니까?')) {
        console.log('suc');
        cartList[i].sales = parseInt(cartList[i].sales) - 1;
        console.log(cartList);

        window.location.reload();
      }
    }
  }
  localStorage.setItem('cart', JSON.stringify(cartList));
});
