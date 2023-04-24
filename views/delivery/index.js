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