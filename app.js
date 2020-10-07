// express를 실행할 경우 두 가지 약속을 정해둔 것
const express = require('express');
let app = express();

// nodeJs에서 직접 웹서버를 만들었던 것 처럼 3000번 포트를 listen하게 함
app.listen(3000, ()=>{
    console.log('Connected:3000 port!');
});
app.use(express.static('public'));

// 홈페이지에 접속했을 때 홈페이지에 접속했다는 것을 나타낸다.
// 접속할 경우 get/post 방식을 사용, url을 직접 치는 방식은 get방식
// 아래 방식은 get방식 중 home으로 접속하였을 경우 function으로 전달한 인자를 실행하도록 되어있다.

// 라우터 : 길을 찾는다 -> 어떤 요청이 들어왔을 떄 길을 찾을 수 있도록 해주는 라우터의 역할 : get
app.get('/',(req, res)=>{
    // 응답은 2번째 인자인 res로 send해준다.
    res.send('<h1>Hello homepage</h1>');
});

app.get('/login',(req,res)=>{
    res.send('login please');
})

app.get('/route',(req,res)=>{
    res.send('Hello Router, <img src="/4.jpg">');
})

app.get('/dynamic',(req, res)=>{
    let lis = '';
    for(let i=0; i<5; i++){
        lis = lis + '<li>coding</li>';
    }
    let output = `
    <!DOCTYPE html>
    <html>
        <head>
            <title></title>
        </head>
        <body>
            <h1>Hello, Dynamic!</h1>
            ${lis}
        </body>
    </html>
    `;
    res.send(output);
})

