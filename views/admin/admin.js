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

      if (menuId === "product-management") { // 상품관리 버튼인 경우
        getProductList(); // getProductList 함수 실행
      }
    });
  });

// 상품관리 -> 상품 리스트 생성, 상품 추가, 상품 수정, 상품 삭제
// 주문관리 -> 진행된 주문 리스트 생성,  주문 수정
// 카테고리관리 -> 카테고리 추가, 수정, 삭제

//* 상품관리 js로직
// 상품조회
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
    makeProductList();
}
// 상품 데이터 받아오기
async function makeProductList() {
    console.log("상품조회 api 전송");
    const productListData = await fetch(
      "http://localhost:8000/api/products"
    ).then((res) => res.json());
    // 리스트가 들어갈 표의 body
  const productBody = document.querySelector("#productBody");
  for (let i = 0; i < productListData.data.length; i++) {
    const product = productListData.data[i];
    // 한 행 생성
    const productBody_row = document.createElement("tr");
    productBody_row.id = product._id;

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
      deleteProduct(product._id); // 해당 상품 ID를 인자로 상품 삭제 함수 호출
    });

    productBody.appendChild(productBody_row);
  }
  // 상품 수정 버튼
  // modifyProduct();
}

async function deleteProduct(productId) {
  try {
    const response = await fetch(`http://localhost:8000/api/products/${productId}`, {
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


//* 주문관리 js로직

//* 카테고리 관리 js로직
