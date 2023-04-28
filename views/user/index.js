getUser(); //user 정보 받기

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
  const userId = userData.data.id;
  getUserOrderList(userId);
}

// 현재 주문한 내역 정보 받기
async function getUserOrderList(userId) {
  const data = await fetch(`/api/orders/getByuserId/${userId}`).then((res) =>
    res.json(),
  );

  const orderListWrapper = document.querySelector('.mypage-content');
  for (let i = 0; i < data.length; i++) {
    const element = `
        <div class="main__profile">
            <div class="main__header">
                <div class="top">
                    <h4>주문번호: ${data[i]._id}</h4>&nbsp;&nbsp;
                </div>
                <div class="middle">
                    <ul>
                        <li><b>주문일자</b>: ${data[i].createdAt.slice(
                          0,
                          7,
                        )}</li>
                        <li><b>주문 상태</b>: ${
                          data[i].deliveryStatus
                        }<div id="${data[i]._id}" ></div></li>
                        <li><b>결제금액</b>: ${data[i].price}원</b></li>
                    </ul>
                </div>
            </div>
        </div>`;
    orderListWrapper.insertAdjacentHTML('afterbegin', element);

    console.log(data[i].deliveryStatus);
    if (data[i].deliveryStatus == '배송 완료') {
      const decide = document.getElementById(data[i]._id);
      decide.innerHTML = `<a href="/review?id=${data[i]._id}">구매확정</a>`;
    } else if (data[i].deliveryStatus == '구매 확정 완료') {
    } else {
      const decide = document.getElementById(data[i]._id);
      decide.innerHTML = '주문취소';
      decide.addEventListener('click', () => {
        fetch(`/api/orders/id/${data[i]._id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        })
          .then((res) => res.json())
          .then(() => window.location.reload());
      });
    }
  }
}
