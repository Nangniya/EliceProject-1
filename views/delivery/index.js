/*
const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000)
*/

const testApiButton = document.getElementById('test-api-button');

testApiButton.addEventListener("click", async() => {

  let fetchResult;
  fetchResult = await fetch("http://localhost:8000", {
    method: "post",
    //body: JSON.stringify({ postId: 1, postName: "impost"}),
    body: JSON.stringify({ postId: 1, postName: "impost"}),
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  if (fetchResult.ok) {
    const data = await fetchResult.json();
    console.log("통신 성공", data);
    } else {
      console.log("통신 실패");
    }
    
    console.log({fetchResult});
    
});


/*
// 요소(element), input 혹은 상수
const emailInput = document.querySelector('#emailInput');
const passwordInput = document.querySelector('#passwordInput');
const submitButton = document.querySelector('#submitButton');

// 로그인 진행
async function handleSubmit(e) {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  // 잘 입력했는지 확인
  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 4;

  if (!isEmailValid || !isPasswordValid) {
    return alert(
      '비밀번호가 4글자 이상인지, 이메일 형태가 맞는지 확인해 주세요.',
    );
  }
  */