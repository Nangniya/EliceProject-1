getUser();
// user 정보 받는 함수
async function getUser() {
  const res = await fetch('/api/users', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  if (!res.ok) {
    const errorContent = await res.json();
    const { reason } = errorContent;

    throw new Error(reason);
  }
  const userData = await res.json();
  console.log(userData);

  let name = document.getElementById('member-name');
  let email = document.getElementById('member-email');
  let address = document.getElementById('member-address');
  let phoneNumber = document.getElementById('member-number');

  name.innerHTML = userData.data.name;
  email.innerHTML = userData.data.email;
  address.innerHTML = userData.data.address;
  phoneNumber.innerHTML = userData.data.phoneNumber;

  // 수정에 현재 값 채워넣기
  const nameInput = document.getElementById('member-name-edit');
  const emailInput = document.getElementById('member-email-edit');
  const addressInput = document.getElementById('member-address-edit');
  const phoneNumberInput = document.getElementById('member-number-edit');

  nameInput.value = userData.data.name;
  emailInput.innerHTML = userData.data.email;
  addressInput.value = userData.data.address;
  phoneNumberInput.value = userData.data.phoneNumber;

  const userId = userData.data.id;
  // 수정에 이벤트리스너 부여
  document
    .querySelector('#modify-user-btn')
    .addEventListener('click', () => modifyUser(userId));
  // 탈퇴에 이벤트리스너 부여
  document
    .querySelector('#delete-user-btn')
    .addEventListener('click', () => deleteUser(userId));
}

async function modifyUser(userId) {
  const nameInput = document.getElementById('member-name-edit');
  const addressInput = document.getElementById('member-address-edit');
  const phoneNumberInput = document.getElementById('member-number-edit');

  const name = nameInput.value;
  const address = addressInput.value;
  const phoneNumber = phoneNumberInput.value;

  console.log(name, address, phoneNumber);
  try {
    const response = await fetch(`/api/users/updateUser/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, address, phoneNumber }),
    });
    if (response.ok) {
      alert('회원 수정 성공');
      getUser();
    } else {
      console.error('회원 수정 실패:', response.status);
      alert('회원 수정 실패:' + response.status);
    }
  } catch (error) {
    console.error('회원 수정 실패:', error);
    alert('회원 수정 실패:' + error);
  }
}

async function deleteUser(userId) {
  if (confirm('탈퇴하시겠습니까?')) {
    try {
      const response = await fetch(`/api/users/deleteUser/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('탈퇴 되었습니다.');
        localStorage.removeItem('token');
        window.location.href = '/';
      } else {
        console.error('탈퇴 실패:', response.status);
        alert('탈퇴실패:' + response.status);
      }
    } catch (error) {
      console.error('탈퇴 삭제 실패:', error);
      alert('탈퇴 실패:' + error);
    }
  }
}
