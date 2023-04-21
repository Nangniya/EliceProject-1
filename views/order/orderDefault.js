
const btnOrderCancel = document.querySelector('#btnOrderCancel');
const btnOrderConfirm = document.querySelector('#btnOrderConfirm');
const btnMoveCart = document.querySelector('#btnMoveCart');

btnOrderCancel.addEventListener('click', function() {
    //홈 화면으로 돌아가기
    window.location.href = "/";
});

btnOrderConfirm.addEventListener('click', function() {
    alert('주문이 완료되었습니다.');
});

btnMoveCart.addEventListener('click', function() {
    //장바구니로 돌아가기
    window.location.href = "../cart/";
});
