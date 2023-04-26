window.onload = function () {
  let memberName = document.getElementById('member-name');
  let memberAge = document.getElementById('member-age');

  let memberGender = document.getElementById('member-gender');
  let memberEmail = document.getElementById('member-email');
  let memberAddress = document.getElementById('member-address');

  let memberNumber = document.getElementById('member-number');

  let memberNameEdit = document.getElementById('member-name-edit');
  let memberAgeEdit = document.getElementById('member-age-edit');

  let memberGenderData = document.getElementById('member-gender-data');

  let memberEmailEdit = document.getElementById('member-email-edit');

  let memberAddressEdit = document.getElementById('member-address-edit');

  let memberNumberEdit = document.getElementById('member-number-edit');

  fetch('http://localhost:8000/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },

    method: 'GET',
  })
    .then((response) => {
      // Handle the response

      return response.json();
    })
    .then((data1) => {
      console.log(data1.data);

      memberName.innerHTML = data1.data.name;

      memberEmail.innerHTML = data1.data.email;

      memberNameEdit.value = data1.data.name;

      memberEmailEdit.innerHTML = data1.data.email;

      memberAddress.innerHTML = data1.data.address;

      memberAddressEdit.value = data1.data.address;

      memberNumber.innerHTML = data1.data.phoneNumber;

      memberNumberEdit.value = data1.data.phoneNumber;
    })
    .catch((error) => {
      // Handle the error
      console.error(error);
    });
};
