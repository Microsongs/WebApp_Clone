// 익스프레스 모듈을 가져옴
const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
// express 변수에 있는 express함수를 호출 -> application객체를 리턴받음
let app = express();
// body-parser의 사용 -> POST방식으로 들어오는 방식으로 받아줌
app.use(bodyParser.urlencoded({extended:false }));

// 템플릿 줄바꿈
app.locals.pretty = true;

//앱에 설정 -> views들은 views에 두겠다
app.set('views','./views');
// view 엔진으로 jade파일을 사용할 것이다
app.set('view engine','jade');

//topic/new로 들어갔을 때 아래를 실행
app.get('/topic/new',(req,res)=>{
    res.render('new');
})

//topic으로 들어오는 post를 반응
app.post('/topic',(req,res)=>{
    let title = req.body.title;
    let description = req.body.description;
    // 제목과 본문의 내용을 data라는 디렉토리에 파일을 저장
    // 복잡한 테크닉을 사용하지 않기 위한 방법이므로 실제 개발에서는 사용 X
    // 파일을 제어하기 위해서는 fs(file system)을 사용
    // writeFile을 존재하지 않는 디렉토리에 실행하면 error -> 인자의 값으로 오류가 전달되어 오류가 있다면 if의 err이 실행됨
    fs.writeFile('./data/' + title, description, (err)=>{
        // 에러가 있을 경우
        if(err){
            // 500 -> 내부 서버상 오류
            // console에는 상세한 정보가 나타남 -> 사요자에게는 서버 에러가 있었음을 나타냄
            // 사용자에게 상세한 에러를 보여주면 겁에 질리게 만들 수 있다 + 해킹의 빌미가 될 수 있다
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.send('Success');
    })
})

// app을 listen하여 포트와 이 앱의 포트에 연결되면 콜백 함수가 호출되며 연결되었다는 사항을 알려줌
app.listen(3000,()=>{
    console.log('Conntected, 3000 port!');
})

