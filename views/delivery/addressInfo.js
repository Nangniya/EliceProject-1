const addressContentWrapper = document.getElementById(
  'address-content-select-wrapper',
);

const phonePrefixNumList = ['02', '051', '053', '032', '062', '010'];

window.addEventListener('load', () => {
  phonePrefixNumList.forEach((number) => {
    const selectOption = document.createElement('option');
    selectOption.innerHTML = number;
    addressContentWrapper.append(selectOption);
  });
});

const btnCancel = document.querySelector('#btnCancel');
const btnSave = document.querySelector('#btnSave');
const btnAddressInfoSet = document.querySelector('#addressInfoSetting');

btnCancel.addEventListener('click', function () {
  window.location = document.referrer;
});

btnSave.addEventListener('click', function () {
  alert('저장되었습니다.');
});

btnAddressInfoSet.addEventListener('click', function () {
  // 배송지 정보 설정하는 새 창 띄우기
  alert('새창 띄우기');
});
