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
    });
  });

// 상품관리 -> 상품 리스트 생성, 상품 추가, 상품 수정, 상품 삭제
// 주문관리 -> 진행된 주문 리스트 생성,  주문 수정
// 카테고리관리 -> 카테고리 추가, 수정, 삭제

//* 상품관리 js로직
// 상품조회
document
  .getElementById("get-product-button")
  .addEventListener("click", getProductList);
async function getProductList() {

    const productList = document.getElementById("productList");
    const productElem = document.createElement("div");
    productElem.innerHTML = `
        <table class="productTabel table is-striped"> 
          <thead>
            <tr>
              <th id="itemsCategory">카테고리</th>
              <th id="itemsName">이름</th>
              <th id="itemsPrice">가격</th>
              <th id="itemsImg">이미지</th>
            </tr>
          </thead>
          <tbody id="itemsBody">
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
  const itemsBody = document.querySelector("#itemsBody");
  for (let i = 0; i < productListData.data.length; i++) {
    const product = productListData.data[i];
    // 한 행 생성
    const itemsBody_row = document.createElement("tr");
    itemsBody_row.id = product._id;

    // 행 안에 이름,카테고리,가격,이미지,생성날짜,판매량 추가
    itemsBody_row.innerHTML = `
    <td>${product.category}</td>
    <td>${product.name}</td>
    <td>${product.price}</td>
    <td>
      <img src=${product.image} alt="${product.name} 사진" width="70"/>
    </td>
    `;

    itemsBody.appendChild(itemsBody_row);
  }

  // 상품 삭제 버튼
  // delItem();
  // 상품 수정 버튼
  // modifyItem();
}




//* 주문관리 js로직

//* 카테고리 관리 js로직
