const purchaseBtn = document.querySelector('.moveTopurchase'); //결제하기 버튼
const nameInput = document.querySelector('.productname');
const priceInput = document.querySelector('.cartprice');
// localstorage에 값 저장
const cartTempData = [
  { name: 'Elice Chair - BEIGE', price: 20000 },
  { name: 'Elice Desk - WHITE', price: 30000 },
  { name: 'Elice Sofa - WHITE', price: 40000 },
  { name: 'Elice Mirror', price: 10000 },
];
const cartSaveData = JSON.stringify(cartTempData);
localStorage.setItem('cart', cartSaveData);

const cartData = JSON.parse(localStorage.getItem('cart'));
console.log(cartData[0]);

function rendering() {
  nameInput.innerHTML = `${cartData[0].name}`;
  priceInput.innerHTML = `${cartData[0].price}` + ' 원';
}
//결제하기 버튼
purchaseBtn.addEventListener('click', function () {
  if (purchaseBtn.innerText[0] === '0' || purchaseBtn.value[0] === '0') {
    alert('상품을 선택하세요.');
    return;
  }

  localStorage.setItem('storeName', 'items');
  localStorage.setItem('keys', getCheckboxValue());
  location.href = '/order';
  return;
});

rendering();
