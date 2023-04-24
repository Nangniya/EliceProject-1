const btnOrderCancel = document.querySelector('#btnOrderCancel');
const btnOrderConfirm = document.querySelector('#btnOrderConfirm');
const btnMoveCart = document.querySelector('#btnMoveCart');
const btnAddressInfo = document.querySelector('#btnAddressInfo');

btnOrderCancel.addEventListener('click', function () {
  //홈 화면으로 돌아가기
  window.location.href = '../index.html';
});

btnOrderConfirm.addEventListener('click', function () {
  alert('주문이 완료되었습니다.');
  window.location.href = './orderConfirm.html';
});

btnMoveCart.addEventListener('click', function () {
  //장바구니로 돌아가기
  window.location.href = '../cart/';
});

btnAddressInfo.addEventListener('click', function () {
  //주소록 목록이 띄워지면 좋겠는데 우선은 이걸로 한다
  window.open(
    '/delivery/addressInfo.html',
    'addressInfo',
    'top=250, left=400, width=750, height=500, toolbar=no, menubar=no, scrollbars=yes, resizeable=no',
  );
});
