// express를 실행할 경우 두 가지 약속을 정해둔 것
const express = require('express');
let app = express();
// jade의 소스를 pretty하게 변경하는 소스
app.locals.pretty = true;

// app에 템플릿 엔진을 사용한다고 알려줌
app.set('view engine','jade');
// 템플릿 파일은 views에 넣음
app.set('views','./views');

app.use(express.static('public'));

// form에 접속하였을 경우
app.get('/form',(req,res)=>{
    res.render('form.jade');
})
// form에서 정보를 받는 것
app.get('/form_receiver',(req,res)=>{
    let title = req.query.title;
    let description = req.query.description;
    res.send(title+','+description);
})

app.get('/topics',(req,res)=>{
    // id에 따라 다른 정보를 나타내기 위해 배열에 정보를 담는다.
    let topics = [
        'JavaScript is...',
        'Nodejs is...',
        'Express is...'
    ];
    // a태그를 id에 따라 설정
    let output = `
    <a href="/topics?id=0">JavaScript</a><br>
    <a href="/topics?id=1">Nodejs</a><br>
    <a href="/topics?id=2">Express</a><br><br>
    ${topics[req.query.id]}
    `;
    res.send(output);
})

// 요청 : req(request) 첫번째 매개변수의 값
// request의 queryString의 id값을 호출 방법 -> req.query.id
// :id로 뒤에 오는 값을 일단 id로 잡아준다.
app.get('/topic/:id',(req,res)=>{
    // id에 따라 다른 정보를 나타내기 위해 배열에 정보를 담는다.
    let topics = [
        'JavaScript is...',
        'Nodejs is...',
        'Express is...'
    ];
    // a태그를 id에 따라 설정
    let str = `
    <a href="/topic/0">JavaScript</a><br>
    <a href="/topic/1">Nodejs</a><br>
    <a href="/topic/2">Express</a><br><br>
    `;
    // topics[req.query.id]를 하면 id의 값에 따라 적절한 데이터가 나타남
    // :id로 잡힌 것은 params로 잡는다
    let output = str + topics[req.params.id];
    res.send(output);
})
app.get('/topic/:id/:mode',(req,res)=>{
    res.send(req.params.id+","+req.params.mode);
})

app.get('/param/:module_id/:topic_id',(req,res)=>{
    res.json(req.params);
})

// /template에 소스코드를 가져와서 웹페이지를 만드는 랜더링을 사용
app.get('/template',(req,res)=>{
    // temp라는 페이지를 rendering해서 전송한다.
    res.render('temp',{time:Date(), title:'Jade'});
})

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



// nodeJs에서 직접 웹서버를 만들었던 것 처럼 3000번 포트를 listen하게 함
app.listen(3000, ()=>{
    console.log('Connected:3000 port!');
});
