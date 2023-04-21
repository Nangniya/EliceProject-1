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
  });
});

// 상품관리 -> 상품 리스트 생성, 상품 추가, 상품 수정, 상품 삭제
// 주문관리 -> 진행된 주문 리스트 생성,  주문 수정
// 카테고리관리 -> 카테고리 추가, 수정, 삭제

// ****************************************************************************************
//* 상품관리 js로직
// 상품조회 : 상품관리 누르면 상품리스트 표 나옴

async function getProductList() {
  const productData = await fetch(
    'http://localhost:8000/api/products').then((res) => res.json());
  const productListContainer = document.querySelector('#productList');
  for(let i= 0; i < productData.length; i++){
    const element = 
  `<div class="product-list-content">
  <div class="product-category">${productData[i].category}</div>
  <div class="product-name">${productData[i].name}</div>
  <div class="product-price">${productData[i].price}</div>
  <div class="product-image">
    <img src=${productData.image} alt="${productData.name} 사진" width="70"/>
  </div>  
  <div class-"product-quantity">${productData[i].quantity}</div>
  <div class-"product-manufacture">${productData[i].manufacture}</div>
  <div class-"product-quantity">${productData[i].content}</div>
  <div class="product-btns">
    <button id="product-delete-btn-${productData[i].id}">삭제</button>
    <button id="product-modify-btn">수정</button>
  </div>
  </div>`;
    productListContainer.insertAdjacentHTML('beforeend', element);
    // 삭제 버튼에 이벤트 리스너 부여
    const deleteBtn = document.querySelector(`#product-delete-btn-${productData[i].id}`);
    deleteBtn.addEventListener('click', (e) => {
      const productId = e.target.id.split('-').pop(); // id 속성에서 productId 추출
      deleteProduct(productId);
    });
    // 수정 버튼에 이벤트 리스너 부여
    const modifyBtn = document.querySelector(`#product-modify-btn-${productData[i].id}`);
    modifyBtn.addEventListener('click', (e) => {
      const productId = e.target.id.split('-').pop(); // id 속성에서 productId 추출
      modifyProduct(productId);
    })

  }

}
// 상품 삭제
// 삭제 버튼 클릭했을 때 상품 삭제시키는 함수
async function deleteProduct(productId) {
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
    } else {
      console.error('상품 삭제 실패:', response.status);
    }
  } catch (error) {
    console.error('상품 삭제 실패:', error);
  }
}

// 상품 수정
// 수정 버튼 클릭했을 때 상품 수정 모달창 띄우기
async function modifyProduct(productId) {
  const modifyModalWrapper = document.getElementById('product-modify-modal-wrapper');
  modifyModalWrapper.style.display = flex;
  // 카테고리값 받아와서 select의 option 값으로 넣기
  const modalCategory = document.querySelector('#product-modify-modal-categoryInput');
  const categories = await fetch('http://localhost:8000/api/categories').then(
    (res) => res.json(),
  ); //get요청으로 카테고리 받아오기
  categories.forEach((category) => {
    modalCategory.innerHTML += `
      <option>${category.name}</option>
    `;
  });

  modifyProduct2(productId); // input 값에 현재 데이터 정보 채워넣기

  document.getElementById('modal-product-modify-btn').addEventListener('click', modifyProduct3(productId));
  document.getElementById('modal-cancel-btn').addEventListener('click', (e) => {
    e.preventDefault();
    modifyModalWrapper.style.display = "none";
  })
}
// input 값에 현재 데이터 정보 채워넣는 함수
async function modifyProduct2(productId){
  const data = await fetch(`http://localhost:8000/api/products/id/${productId}`).then((res) => res.json());

  const name = document.querySelector('#product-modify-modal-nameInput');
  const quantity = document.querySelector('#product-modify-modal-quantityInput');
  const manufacture = document.querySelector('#product-modify-modal-manufactureInput');
  const price = document.querySelector('#product-modify-modal-priceInput');
  const content = document.querySelector('#product-modify-modal-contentInput');
  const category = document.querySelector('#product-modify-modal-categoryInput');

  const inputArray = [name, quantity, manufacture, price, content, category];
  inputArray.forEach((prop) => {prop.value = data.prop});
}

// PATCH로 상품수정 요청하는 함수
async function modifyProduct3(productId) {
  const nameInput = document.querySelector('#product-modify-modal-nameInput');
  const quantityInput = document.querySelector('#product-modify-modal-quantityInput');
  const manufactureInput = document.querySelector('#product-modify-modal-manufactureInput');
  const priceInput = document.querySelector('#product-modify-modal-priceInput');
  const contentInput = document.querySelector('#product-modify-modal-contentInput');
  const categoryInput = document.querySelector('#product-modify-modal-categoryInput');

  // 입력값
  const name = nameInput.value;
  const quantity = quantityInput.value;
  const manufacture = manufactureInput.value;
  const price = priceInput.value;
  const content = contentInput.value;
  const category = categoryInput.value;

  try {
    const response = await fetch(`http://localhost:8000/api/products/id/${productId}`, {
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
    });
    if (response.ok) {
      alert('수정 성공');
    } else {
      console.error('상품 수정 실패:', response.status);
    }
  } catch (error) {
    console.error('상품 수정 실패:', error);
  }

}

// 상품 추가
// 추가 form 모달창 띄우기
async function loadModal() {
  const modalWrapper = document.getElementById('modal-wrapper');
  modalWrapper.style.display = 'flex';
  // 카테고리값 받아와서 select의 option 값으로 넣기
  const modalCategory = document.querySelector('#modal-categoryInput');
  const categories = await fetch('http://localhost:8000/api/categories').then(
    (res) => res.json(),
  ); //get요청으로 카테고리 받아오기
  categories.forEach((category) => {
    modalCategory.innerHTML += `
      <option>${category.name}</option>
    `;
  });

  document.getElementById('modal-product-add-btn').addEventListener('click', addProduct);
  document.getElementById('modal-cancel-btn').addEventListener('click', (e) => {
    e.preventDefault();
    modalWrapper.style.display = "none";
  })  
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
      alert('추가 성공');
    } else {
      console.error('상품 추가 실패:', response.status);
    }
  } catch (error) {
    console.error('상품 추가 실패:', error);
  }
}

// ****************************************************************************************
//* 주문관리 js로직


// ****************************************************************************************
//* 카테고리 관리 js로직

// 카테고리 조회
async function getCategoryList() {
  const categoryData = await fetch(
    'http://localhost:8000/api/categories').then((res) => res.json());
  const categoryListContainer = document.querySelector('#category-menu-content');
  for(let i= 0; i < categoryData.length; i++){
    const element = 
  `<div class="category-list-content">
  <div class="category-id">${categoryData[i].id}</div>
  <div class="category-name">${categoryData[i].name}</div>
  <div class-"category-quantity">${categoryData[i].quantity}</div>
  <div class="category-btns">
    <button id="category-delete-btn-${categoryData[i].id}">삭제</button>
    <button id="category-modify-btn">수정</button>
  </div>
  </div>`;
    categoryListContainer.insertAdjacentHTML('beforeend', element);
    const deleteBtn = document.querySelector(`#category-delete-btn-${categoryData[i].id}`);
    deleteBtn.addEventListener('click', (e) => {
      const categoryId = e.target.id.split('-').pop(); // id 속성에서 categoryId 추출
      deleteCategory(categoryId);
    });
  }

}
// 카테고리 삭제 함수
async function deleteCategory(categoryId) {
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
    } else {
      console.error('카테고리 삭제 실패:', response.status);
    }
  } catch (error) {
    console.error('카테고리 삭제 실패:', error);
  }
}
// 카테고리 추가 모달창 띄우기
function loadCategoryModal() {
  const categoryModalWrapper = document.getElementById('category-modal-wrapper');
  categoryModalWrapper.style.display = 'flex';
  document.getElementById('modal-category-add-btn').addEventListener('click', addCategory);
  document.getElementById('modal-cancel-btn').addEventListener('click', (e) => {
    e.preventDefault();
    categoryModalWrapper.style.display = "none";
  })
}
// 카테고리 추가
async function addCategory(e){
  e.preventDefault();
  const categoryNameInput = document.querySelector('#category-modal-nameInput');
  const name = categoryNameInput.value;
  // POST 요청으로 카테고리 추가
  try {
    const response = await fetch('http://localhost:8000/api/categories/createCategory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    if (response.ok) {
      alert('카테고리 추가 성공');
    } else {
      console.error('카테고리 추가 실패:', response.status);
    }
  } catch (error) {
    console.error('카테고리 추가 실패:', error);
  }
}