const serchbtn = document.querySelector('#search');
const basketbtn = document.querySelector('#basket');
const loginbtn = document.querySelector('#logout');

const btn1 = document.querySelector('.button1');
const btn2 = document.querySelector('.button2');
const btn3 = document.querySelector('.button3');
const slide = document.querySelector('.slider-container');

btn1.addEventListener('click', function () {
  slide.style.transform = 'translate(0vw)';
});
btn2.addEventListener('click', function () {
  slide.style.transform = 'translate(-100vw)';
});
btn3.addEventListener('click', function () {
  slide.style.transform = 'translate(-200vw)';
});

async function fetchText() {
  let response = await fetch('http://localhost:8000/api/products/recent');

  console.log(response.status); // 200
  console.log(response); // 200
  console.log(response.body); // 200
  console.log(response.statusText); // OK

  if (response.status === 200) {
    let data = await response.text();
    // handle data
  }
}
serchbtn.addEventListener('click', fetchText);
