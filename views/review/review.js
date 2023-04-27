const urlParam = window.location.search;
const param = urlParam.replace('?', '').split(/[=?&]/)[1];

fetch(`/api/products/id/${param}`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    imgUrl.innerHTML = `
    <img class="imageUrl" src="/media/${data.imgUrl[0]}">
    `;
    function rendering() {
      itemcategory.innerHTML = `${data.category}`;
      item_name.innerHTML = `${data.name}`;
      item_price.innerHTML = `${data.price}` + ' 원';
      details.innerHTML = `${data.details}`;
    }
    rendering();
  });
