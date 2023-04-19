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
document
  .getElementById("get-product-button")
  .addEventListener("click", getProductList);
async function getProductList() {
    console.log("상품조회 api 전송");
    const productListData = await fetch(
      "http://localhost:8000/api/products"
    ).then((res) => res.json());

    const productList = document.getElementById("productList");
    productListData.data.forEach((product) => {
      const productElem = document.createElement("div");
      productElem.innerHTML = `${product.name}${product.image}${product.price}<button id="product-delete-btn">삭제</button>`;
      productList.append(productElem);  
    });
}


//* 주문관리 js로직

//* 카테고리 관리 js로직
