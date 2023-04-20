const navMenus = document.getElementsByClassName("nav-menu");
const menuContentSection = document.getElementById("menu-content-wrapper");

// 각 관리 버튼 누르면 각 관리 화면 띄워줌
const renderMenuContent = (id) => {
    const otherMenuContents = document.querySelectorAll("div[id*=-menu-content]");
    Array.from(otherMenuContents).forEach((menuContent) => {
      menuContent.style.display = "none";
    });
    document.getElementById(`${id}-menu-content`).style.display = "block";
  };
  
Array.from(navMenus).forEach((menuElem) => {
  menuElem.addEventListener("click", () => {
    const menuId = menuElem.getAttribute("id");
    renderMenuContent(menuId);

    //상품관리 버튼인 경우
    if (menuId === "product") {
      getProductList(); // getProductList 함수 실행
      const addProductBtn = document.getElementById('add-product-btn');
      addProductBtn.addEventListener('click', loadModal); //상품추가 버튼에 이벤트리스너 달기
    }
  });
});

// 상품관리 -> 상품 리스트 생성, 상품 추가, 상품 수정, 상품 삭제
// 주문관리 -> 진행된 주문 리스트 생성,  주문 수정
// 카테고리관리 -> 카테고리 추가, 수정, 삭제

//* 상품관리 js로직
// 상품조회 : 상품관리 누르면 상품리스트 표 나옴
async function getProductList() {
    const productList = document.getElementById("productList");
    const productElem = document.createElement("div");
    productElem.innerHTML = `
        <table class="productTabel table is-striped"> 
          <thead>
            <tr>
              <th id="productCategory">카테고리</th>
              <th id="productName">이름</th>
              <th id="productPrice">가격</th>
              <th id="productImg">이미지</th>
            </tr>
          </thead>
          <tbody id="productBody">
          </tbody>
        </table>
      `;
    productList.append(productElem);
    makeProductList(); // 상품 데이터 받아와서 띄워주는 함수
}
// 상품 데이터 받아오기
async function makeProductList() {
    console.log("상품조회 api 전송");
    const productListData = await fetch(
      "http://localhost:8000/api/products"
    ).then((res) => res.json());
    // 리스트가 들어갈 표의 body
  const productBody = document.querySelector("#productBody");
  for (let i = 0; i < productListData.length; i++) {
    const product = productListData[i];
    // 한 행 생성
    const productBody_row = document.createElement("tr");
    productBody_row.id = product.id; //행의 HTML id = 상품의 id로 지정

    // 행 안에 카테고리,이름,가격,이미지 추가
    productBody_row.innerHTML = `
      <td>${product.category}</td>
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td>
        <img src=${product.image} alt="${product.name} 사진" width="70"/>
      </td>
      <td>
        <button class="deleteBtn">삭제</button>
      </td>
    `;
    // 삭제 버튼 클릭 이벤트 리스너 추가
    const deleteBtn = productBody_row.querySelector(".deleteBtn");
    deleteBtn.addEventListener("click", () => {
      // 삭제 버튼 클릭 시 상품 삭제 로직 추가
      deleteProduct(product.id); // 해당 상품의 id를 인자로 상품 삭제 함수 호출
    });

    productBody.appendChild(productBody_row);
  }
  // 상품 수정 버튼
  // modifyProduct();
}

// 상품 삭제
// 삭제 버튼 클릭했을 때 상품 삭제시키는 함수
async function deleteProduct(productId) {
  try {
    const response = await fetch(`http://localhost:8000/api/products/id/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (response.ok) {
      // 삭제 성공 시 프론트엔드에서도 해당 상품 삭제
      const productRow = document.getElementById(productId);
      if (productRow) {
        productRow.remove();
      }
    } else {
      console.error("상품 삭제 실패:", response.status);
    }
  } catch (error) {
    console.error("상품 삭제 실패:", error);
  }
}

// 상품 추가
// 추가 form 모달창 띄우기
async function loadModal() {
  const modalWrapper = document.getElementById('modal-wrapper');
  modalWrapper.style.display = "flex";
  // 카테고리값 받아와서 select의 option 값으로 넣기
  const modalCategory = document.querySelector("#modal-categoryInput");
  const categories = await fetch("http://localhost:8000/api/products/category")
  .then((res) => res.json()); //get요청으로 카테고리 받아오기

  categories.forEach((category) => {
    modalCategory.innerHTML += `
      <option>${category.name}</option>
    `;
  });

  document.getElementById('modal-product-add-btn').addEventListener('click', addProduct);  
}

async function addProduct(e){
  e.preventDefault();
  const nameInput = document.querySelector('#modal-nameInput');
  const quantityInput = document.querySelector('#modal-quantityInput');
  const manufactureInput = document.querySelector('#modal-manufactureInput');
  const priceInput = document.querySelector('#modal-priceInput');
  const contentInput = document.querySelector('#modal-contentInput');
  const categoryInput = document.querySelector('#modal-categoryInput')

  // 입력값
  const name = nameInput.value;
  const quantity =  quantityInput.value;
  const manufacture = manufactureInput.value;
  const price = priceInput.value;
  const content = contentInput.value;
  const category = categoryInput.value;

  // POST 요청으로 상품 추가
  try {const response = await fetch('http://localhost:8000/api/products/create',{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name, quantity, manufacture, price, content, category
    })
  });
    if (response.ok){
      alert('추가 성공');
    } else {
      console.error("상품 추가 실패:", response.status);
    }
  } catch (error) {
    console.error("상품 추가 실패:", error);
  }

}
//* 주문관리 js로직

//* 카테고리 관리 js로직
