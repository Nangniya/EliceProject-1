const navMenus = document.getElementsByClassName('nav-menu');
const menuContentSection = document.getElementById('menu-content-wrapper');

// 각 관리 버튼 누르면 각 관리 화면 띄워줌
const renderMenuContent = (id) => {
  const otherMenuContents = document.querySelectorAll('div[id*=-menu-content]');
  Array.from(otherMenuContents).forEach((menuContent) => {
    menuContent.style.display = 'none';
  });
  document.getElementById(`${id}-menu-content`).style.display = 'block';
};

Array.from(navMenus).forEach((menuElem) => {
  menuElem.addEventListener('click', () => {
    const menuId = menuElem.getAttribute('id');
    renderMenuContent(menuId);

    //상품관리 버튼인 경우
    if (menuId === 'product') {
      getProductList(); // getProductList 함수 실행
      const addProductBtn = document.getElementById('add-product-btn');
      addProductBtn.addEventListener('click', loadModal); //상품추가 버튼에 이벤트리스너 달기
    }

    //카테고리관리 버튼인 경우
    if (menuId === 'category') {
      getCategoryList(); //getCategoryList 함수 실행
      const addCategoryBtn = document.getElementById('add-category-btn');
      addCategoryBtn.addEventListener('click', loadCategoryModal); //카테고리추가 버튼에 이벤트리스너 달기
    }

    //주문관리 버튼인 경우
    if (menuId === 'order') {
      getOrderList(); //getCategoryList 함수 실행
    }
  });
});

// 상품관리 -> 상품 리스트 생성, 상품 추가, 상품 수정, 상품 삭제
// 주문관리 -> 진행된 주문 리스트 생성,  주문 수정
// 카테고리관리 -> 카테고리 추가, 수정, 삭제

// ****************************************************************************************
//* 상품관리 js로직
// 상품조회 : 상품관리 누르면 상품리스트 표 나옴

async function getProductList() {
  const productData = await fetch('http://localhost:8000/api/products').then(
    (res) => res.json(),
  );
  const productListContainer = document.querySelector('#productList');
  //리스트 있을 경우 초기화
  productListContainer.innerHTML = '';
  for (let i = 0; i < productData.length; i++) {
    const element = `<div class="product-list-content">
  <div class="product-category">${productData[i].category}</div>
  <div class="product-name">${productData[i].name}</div>
  <div class="product-price">${productData[i].price}</div>
  <div class="product-image" id="product-image-${productData[i]._id}">
  </div>  
  <div class-"product-quantity">${productData[i].quantity}</div>
  <div class-"product-manufacture">${productData[i].manufacture}</div>
  <div class-"product-quantity">${productData[i].content}</div>
  <div class="product-btns">
    <button id="product-delete-btn-${productData[i]._id}">삭제</button>
    <button id="product-modify-btn-${productData[i]._id}">수정</button>
  </div>
  </div>`;
    productListContainer.insertAdjacentHTML('beforeend', element);
    if (!productData[i].imgUrl.length) {
      const imageBox = document.querySelector(
        `#product-image-${productData[i]._id}`,
      );
      imageBox.innerHTML = `<button id="img-add-btn-${productData[i]._id}">이미지 추가</button>`;
      const imgBtn = document.querySelector(
        `#img-add-btn-${productData[i]._id}`,
      );
      imgBtn.addEventListener('click', () => uploadImg(productData[i]._id));
    } else {
      // 이미지가 있는 경우, 이미지를 img 태그의 src 속성 값으로 사용
      const imageBox = document.querySelector(
        `#product-image-${productData[i]._id}`,
      );
      console.log(productData[i].imgUrl[0]);
      imageBox.innerHTML = `<img src=${productData[i].imgUrl[0]} alt="${productData[i].name} 사진" width="70"/>`;
    }
    // 삭제 버튼에 이벤트 리스너 부여
    const deleteBtn = document.querySelector(
      `#product-delete-btn-${productData[i]._id}`,
    );
    deleteBtn.addEventListener('click', (e) => {
      const productId = e.target.id.split('-').pop(); // id 속성에서 productId 추출
      deleteProduct(productId);
    });
    // 수정 버튼에 이벤트 리스너 부여
    const modifyBtn = document.querySelector(
      `#product-modify-btn-${productData[i]._id}`,
    );
    modifyBtn.addEventListener('click', (e) => {
      const productId = e.target.id.split('-').pop(); // id 속성에서 productId 추출
      console.log(productId);
      modifyProduct(productId);
    });
  }
}
// 이미지 업로드폼 띄우기
async function uploadImg(productId) {
  const imgUploadForm = document.getElementById('img-upload-form-wrapper');
  imgUploadForm.style.display = 'flex';
  const imgUpload = document.getElementById('img-upload-input');
  const imagePreview = document.getElementById('imagePreview');

  imgUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      imagePreview.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });
  const submitBtn = document.getElementById('img-submit-btn');
  submitBtn.addEventListener('click', () => {
    uploadImg2(productId);
  });
  const cancelBtn = document.getElementById('img-cancle-btn');
  cancelBtn.addEventListener(
    'click',
    () => (imgUploadForm.style.display = 'none'),
  );
}

async function uploadImg2(productId) {
  const imgUpload = document.getElementById('img-upload-input');
  console.log(productId);
  // FormData 객체 생성
  const formData = new FormData();
  formData.append('image', imgUpload.files[0]);

  try {
    // POST 요청 보내기
    const response = await fetch(`http://localhost:8000/api/products/upload/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data' 
      },
      body: {image: formData}
    });

    if (response.ok) {
      // 성공적으로 응답 받은 경우 처리
      alert('이미지 추가 성공');
      location.reload();
    } else {
      // 오류 응답 처리
      console.error('이미지 추가 실패', response.status);
      alert('이미지 추가 실패' + response.status);
    }
  } catch (error) {
    // 예외 처리
    console.error('이미지 추가 실패', error);
    alert('이미지 추가 실패' + error);
  }
}
// 상품 삭제
// 삭제 버튼 클릭했을 때 상품 삭제시키는 함수
async function deleteProduct(productId) {
  if (confirm('상품을 삭제하시겠습니까?')) {
    try {
      const response = await fetch(
        `http://localhost:8000/api/products/id/${productId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.ok) {
        alert('상품 삭제 완료');
        location.reload();
      } else {
        console.error('상품 삭제 실패:', response.status);
        alert('상품 삭제 실패:'+ response.status);
      }
    } catch (error) {
      console.error('상품 삭제 실패:', error);
      alert('상품 삭제 실패:'+ error);
    }
  }
}
// 상품 수정
// 수정 버튼 클릭했을 때 상품 수정 모달창 띄우기
async function modifyProduct(productId) {
  const modifyModalWrapper = document.getElementById(
    'product-modify-modal-wrapper',
  );
  modifyModalWrapper.style.display = 'flex';

  // 카테고리값 받아와서 select의 option 값으로 넣기
  const modalCategory = document.querySelector(
    '#product-modify-modal-categoryInput',
  );
  const categories = await fetch('http://localhost:8000/api/categories').then(
    (res) => res.json(),
  );
  // 목록 있을 경우 초기화
  modalCategory.innerHTML = '';
  categories.forEach((category) => {
    modalCategory.innerHTML += `<option>${category.name}</option>`;
  });

  modifyProduct2(productId); // input 값에 현재 데이터 정보 채워넣기

  document
    .getElementById('modal-product-modify-btn')
    .addEventListener('click', (productId) => modifyProduct3(productId));
  document
    .getElementById('modify-product-cancel-btn')
    .addEventListener('click', (e) => {
      e.preventDefault();
      modifyModalWrapper.style.display = 'none';
    });
}

// input 값에 현재 데이터 정보 채워넣는 함수
async function modifyProduct2(productId) {
  const data = await fetch(
    `http://localhost:8000/api/products/id/${productId}`,
  ).then((res) => res.json());
  console.log(data);

  // input 태그들
  const name = document.querySelector('#product-modify-modal-nameInput');
  const quantity = document.querySelector(
    '#product-modify-modal-quantityInput',
  );
  const manufacture = document.querySelector(
    '#product-modify-modal-manufactureInput',
  );
  const price = document.querySelector('#product-modify-modal-priceInput');
  const content = document.querySelector('#product-modify-modal-contentInput');
  const category = document.querySelector(
    '#product-modify-modal-categoryInput',
  );

  // input 값에 현재 데이터 값 채우기
  name.value = data.name;
  quantity.value = data.quantity;
  manufacture.value = data.manufacture;
  price.value = data.price;
  content.value = data.content;
  category.value = data.category;
}

// PATCH로 상품수정 요청하는 함수
async function modifyProduct3(productId) {
  const nameInput = document.querySelector('#product-modify-modal-nameInput');
  const quantityInput = document.querySelector(
    '#product-modify-modal-quantityInput',
  );
  const manufactureInput = document.querySelector(
    '#product-modify-modal-manufactureInput',
  );
  const priceInput = document.querySelector('#product-modify-modal-priceInput');
  const contentInput = document.querySelector(
    '#product-modify-modal-contentInput',
  );
  const categoryInput = document.querySelector(
    '#product-modify-modal-categoryInput',
  );

  // 입력값
  const name = nameInput.value;
  const quantity = quantityInput.value;
  const manufacture = manufactureInput.value;
  const price = priceInput.value;
  const content = contentInput.value;
  const category = categoryInput.value;

  try {
    const response = await fetch(
      `http://localhost:8000/api/products/id/${productId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          quantity: quantity * 1,
          manufacture,
          category,
          price: price * 1,
          content,
        }),
      },
    );
    if (response.ok) {
      alert('상품 수정 성공');
      location.reload();
    } else {
      console.error('상품 수정 실패:', response.status);
      alert('상품 수정 실패:'+ response.status);
    }
  } catch (error) {
    console.error('상품 수정 실패:', error);
    alert('상품 수정 실패:'+ error);
  }
}

// 상품 추가
// 추가 form 모달창 띄우기
async function loadModal() {
  const modalWrapper = document.getElementById('modal-wrapper');
  modalWrapper.style.display = 'flex';

  //get요청으로 카테고리 받아오기
  const modalCategory = document.querySelector('#modal-categoryInput');
  const categories = await fetch('http://localhost:8000/api/categories').then(
    (res) => res.json(),
  ); 

  // 카테고리 목록 있을 경우 초기화
  modalCategory.innerHTML = '';
  // 카테고리 리스트 받아와서 select의 option 값으로 넣기
  categories.forEach((category) => {
    modalCategory.innerHTML += `
      <option>${category.name}</option>
    `;
  });

  document
    .getElementById('modal-product-add-btn')
    .addEventListener('click', addProduct);
  document.getElementById('modal-cancel-btn').addEventListener('click', (e) => {
    e.preventDefault();
    modalWrapper.style.display = 'none';
  });
}

async function addProduct(e) {
  e.preventDefault();
  const nameInput = document.querySelector('#modal-nameInput');
  const quantityInput = document.querySelector('#modal-quantityInput');
  const manufactureInput = document.querySelector('#modal-manufactureInput');
  const priceInput = document.querySelector('#modal-priceInput');
  const contentInput = document.querySelector('#modal-contentInput');
  const categoryInput = document.querySelector('#modal-categoryInput');

  // 입력값
  const name = nameInput.value;
  const quantity = quantityInput.value;
  const manufacture = manufactureInput.value;
  const price = priceInput.value;
  const content = contentInput.value;
  const category = categoryInput.value;

  // POST 요청으로 상품 추가
  try {
    const response = await fetch('http://localhost:8000/api/products/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        quantity: quantity * 1,
        manufacture,
        category,
        price: price * 1,
        content,
      }),
    });
    if (response.ok) {
      alert('상품 추가 성공');
      location.reload();
    } else {
      console.error('상품 추가 실패:', response.status);
      alert('상품 추가 실패:'+ response.status);
    }
  } catch (error) {
    console.error('상품 추가 실패:', error);
    alert('상품 추가 실패:'+ error);
  }
}

// ****************************************************************************************
//* 주문관리 js로직

// 전체 주문 조회
async function getOrderList() {
  const orderData = await fetch('http://localhost:8000/api/orders').then(
    (res) => res.json(),
  );
  const orderListContainer = document.querySelector('#orderList');
  //리스트 있으면 초기화
  orderListContainer.innerHTML = '';
  for (let i = 0; i < orderData.length; i++) {
    console.log(orderData[i]);
    const element = `<div class="order-list-content">
  <div class="order-id">${orderData[i]._id}</div>
  <div class="order-date">${orderData[i].updatedAt.slice(0, 7)}</div>
  <div class="order-receiver">${orderData[i].receiver}</div>
  <div class-"order-message">${orderData[i].deliveryMessage}</div>
  <div class-"order-address">${orderData[i].address}</div>
  <div class-"order-status">
    <select class="order-status-selector" id='order-status-${orderData[i]._id}'>
      <option>주문 진행 중</option>
      <option>배송 준비 중</option>
      <option>배송 중</option>
      <option>배송 완료</option>
    </select>
  </div>
    <button class="order-delete-btn" id="order-delete-btn-${
      orderData[i]._id
    }">삭제</button>
  </div>`;
    orderListContainer.insertAdjacentHTML('beforeend', element);

    const deliveryStatus = document.getElementById(
      `order-status-${orderData[i]._id}`,
    );
    deliveryStatus.value = orderData[i].deliveryStatus;
    // 주문 삭제 이벤트 리스너 부여
    const deleteBtn = document.querySelector(
      `#order-delete-btn-${orderData[i]._id}`,
    );
    deleteBtn.addEventListener('click', () => deleteOrder(orderData[i]._id));
    // 주문 수정 이벤트 리스너 부여
    const selector = document.getElementById(
      `order-status-${orderData[i]._id}`,
    );
    selector.addEventListener('change', () => modifyOrder(orderData[i]._id));
  }
}
async function deleteOrder(orderId) {
  if (confirm('주문을 삭제하시겠습니까?')) {
    try {
      const response = await fetch(
        `http://localhost:8000/api/orders/id/${orderId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.ok) {
        alert('주문 삭제 완료');
        location.reload();
      } else {
        console.error('주문 삭제 실패:', response.status);
        alert('주문 삭제 실패:'+ response.status);
      }
    } catch (error) {
      console.error('주문 삭제 실패:', error);
      alert('주문 삭제 실패:'+ error);
    }
  }
}

// 주문 수정
async function modifyOrder(orderId) {
  console.log(orderId);
  const orderStatus = document.getElementById(`order-status-${orderId}`);
  const deliveryStatus = orderStatus.value;
  try {
    const response = await fetch(
      `http://localhost:8000/api/orders/delivery/${orderId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ deliveryStatus }),
      },
    );
    if (response.ok) {
      alert('주문 수정 성공');
      location.reload();
    } else {
      console.error('주문 수정 실패:', response.status);
      alert('주문 수정 실패:'+ response.status);
    }
  } catch (error) {
    console.error('주문 수정 실패:', error);
    alert('주문 수정 실패:'+ error);
  }
}

// ****************************************************************************************
//* 카테고리 관리 js로직

// 카테고리 조회
async function getCategoryList() {
  const categoryData = await fetch('http://localhost:8000/api/categories').then(
    (res) => res.json(),
  );
  console.log(categoryData);
  const categoryListContainer = document.querySelector(
    '#categoryList',
  );
  // 리스트 있으면 초기화
  categoryListContainer.innerHTML = '';
  for (let i = 0; i < categoryData.length; i++) {
    const element = `<div class="category-list-content">
  <div class="category-id">${categoryData[i]._id}</div>
  <div class="category-name">${categoryData[i].name}</div>
  <div class-"category-quantity">${categoryData[i].quantity}</div>
  <div class="category-btns">
    <button id="category-delete-btn-${categoryData[i]._id}">삭제</button>
    <button id="category-modify-btn-${categoryData[i]._id}">수정</button>
  </div>
  </div>`;
    categoryListContainer.insertAdjacentHTML('beforeend', element);

    const deleteBtn = document.querySelector(
      `#category-delete-btn-${categoryData[i]._id}`,
    );
    deleteBtn.addEventListener('click', (e) => {
      const categoryId = e.target.id.split('-').pop(); // id 속성에서 categoryId 추출
      deleteCategory(categoryId);
    });

    const modifyBtn = document.querySelector(
      `#category-modify-btn-${categoryData[i]._id}`,
    );
    modifyBtn.addEventListener('click', (e) => {
      const categoryId = e.target.id.split('-').pop(); // id 속성에서 categoryId 추출
      modifyCategory(categoryId);
    });
  }
}
// 카테고리 삭제 함수
async function deleteCategory(categoryId) {
  if (confirm('카테고리를 삭제하시겠습니까?')) {
    try {
      const response = await fetch(
        `http://localhost:8000/api/categories/id/${categoryId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.ok) {
        alert('카테고리 삭제 완료');
        location.reload();
      } else {
        console.error('카테고리 삭제 실패:', response.status);
        alert('카테고리 삭제 실패:'+ response.status);
      }
    } catch (error) {
      console.error('카테고리 삭제 실패:', error);
      alert('카테고리 삭제 실패:'+ error);
    }
  }
}
// 카테고리 추가 모달창 띄우기
function loadCategoryModal() {
  const categoryModalWrapper = document.getElementById(
    'category-modal-wrapper',
  );
  categoryModalWrapper.style.display = 'flex';
  document
    .getElementById('modal-category-add-btn')
    .addEventListener('click', addCategory);
  document
    .getElementById('category-add-cancel-btn')
    .addEventListener('click', (e) => {
      e.preventDefault();
      categoryModalWrapper.style.display = 'none';
    });
}
// 카테고리 추가
async function addCategory(e) {
  e.preventDefault();
  const categoryNameInput = document.querySelector('#category-modal-nameInput');
  const name = categoryNameInput.value;
  // POST 요청으로 카테고리 추가
  try {
    const response = await fetch(
      'http://localhost:8000/api/categories/createCategory',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      },
    );
    if (response.ok) {
      alert('카테고리 추가 성공');
      location.reload();
    } else {
      console.error('카테고리 추가 실패:', response.status);
      alert('카테고리 추가 실패:'+ response.status);
    }
  } catch (error) {
    console.error('카테고리 추가 실패:', error);
    alert('카테고리 추가 실패:'+ error);
  }
}
// 카테고리 수정
// 카테고리 수정 모달창 띄우기
async function modifyCategory(categoryId) {
  const categoryModalWrapper = document.getElementById(
    'category-modify-modal-wrapper',
  );
  categoryModalWrapper.style.display = 'flex';

  document
    .getElementById('modal-category-modify-btn')
    .addEventListener('click', (categoryId) => modifyCategory2(categoryId));
  document
    .getElementById('category-modify-cancel-btn')
    .addEventListener('click', (e) => {
      e.preventDefault();
      categoryModalWrapper.style.display = 'none';
    });
  // 현재 카테고리 이름을 input값에 넣기
  const categoryData = await fetch(
    `http://localhost:8000/api/categories/id/${categoryId}`,
  ).then((res) => res.json());
  document.querySelector('#modify-category-modal-nameInput').value =
    categoryData.name;
}

// PATCH로 카테고리 수정 요청
async function modifyCategory2(categoryId) {
  const categoryName = document.querySelector(
    '#modify-category-modal-nameInput',
  );
  const name = categoryName.value;
  try {
    const response = await fetch(
      `http://localhost:8000/api/categories/id/${categoryId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      },
    );
    if (response.ok) {
      alert('카테고리 수정 성공');
      location.reload();
    } else {
      console.error('카테고리 수정 실패:', response.status);
      alert('카테고리 수정 실패:'+ response.status);
    }
  } catch (error) {
    console.error('카테고리 수정 실패:', error);
    alert('카테고리 수정 실패:'+ error);
  }
}
