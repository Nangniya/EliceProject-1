const urlParam = window.location.search;
const param = urlParam.replace('?', '').split(/[=?&]/)[1];
const render = async () => {
  const orderData = await fetch(`/api/orders/getByOrderId/${param}`).then(
    (response) => response.json(),
  );
  const productsIds = orderData.orderedProducts;

  for (let i = 0; i < productsIds.length; i++) {
    const productData = await fetch(
      `/api/products/id/${productsIds[i].productId}`,
    ).then((res) => res.json());

    const mainWrapper = document.getElementById('main');
    const element = `<div class="reviewBox">
    <div>상품 이름 : ${productData.name}</div>
      <div class="rating">
        <input type="radio" id="star5" name="rating" value="5" /><label
          for="star5"
          ><img src="./star_FILL0_wght400_GRAD0_opsz48.png" alt="start"
        /></label>
        <input type="radio" id="star4" name="rating" value="4" /><label
          for="star4"
          ><img src="./star_FILL0_wght400_GRAD0_opsz48.png" alt="start"
        /></label>
        <input type="radio" id="star3" name="rating" value="3" /><label
          for="star3"
          ><img src="./star_FILL0_wght400_GRAD0_opsz48.png" alt="start"
        /></label>
        <input type="radio" id="star2" name="rating" value="2" /><label
          for="star2"
          ><img src="./star_FILL0_wght400_GRAD0_opsz48.png" alt="start"
        /></label>
        <input type="radio" id="star1" name="rating" value="1" /><label
          for="star1"
          ><img src="./star_FILL0_wght400_GRAD0_opsz48.png" alt="start"
        /></label>
      </div>
      <div>리뷰:<input id="review" /></div>
      <div id="decideOrder">구매확정하기</div>
    </div>`;
    mainWrapper.insertAdjacentHTML('afterbegin', element);

    function getRating() {
      var rating = 0;
      var elements = document.getElementsByName('rating');
      for (var i = 0; i < elements.length; i++) {
        if (elements[i].checked) {
          rating = elements[i].value;
          break;
        }
      }
      return rating;
    }
    document.getElementById('decideOrder').addEventListener('click', () => {
      const review = document.getElementById('review').value;
      console.log(review);
      console.log(getRating());
    });
  }
};
render();
