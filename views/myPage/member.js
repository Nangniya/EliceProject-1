fetch('http://localhost:8000/api/users', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data.data);
    const memberForm = `<ul>
              <li>
                <div class="member-name-text">이름</div>
                <div class="member-name">${data.data.name}</div>
              </li>
              <li>
                <div class="member-email-text">이메일</div>
                <div class="member-email">${data.data.email}</div>
              </li>
              <li>
                <div class="member-address-text">주소</div>
                <div class="member-address">${data.data.address}</div>
              </li>
              <li>
                <div class="member-number-text">번호</div>
                <div class="member-number">${data.data.phoneNumber}</div>
              </li>
            </ul>`;
    document.getElementById('memberForm').innerHTML = memberForm;
  })
  .catch((error) => {
    // Handle the error
    console.error(error);
  });
