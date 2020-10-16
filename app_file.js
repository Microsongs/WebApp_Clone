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
    fs.readdir('data',(err,files)=>{
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('new',{topics:files});
    });
})

//topic으로 들어오는 get반응
app.get(['/topic','/topic/:id'], (req,res)=>{
    // topic 페이지로 들어오면 글 목록이 화면에 표시되도록 구현
    // topic에 글 목록을 띄우기 위해 디렉토리를 불러옴
    fs.readdir('data',(err, files)=>{
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        var id = req.params.id;
        console.log("id : " + id);
        if(id){
            // topic:id로 접근하였을 경우에만 실행 -> 이 부분은 id값이 있을 경우
            fs.readFile('data/'+id,'utf8',(err,data)=>{
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                res.render('view',{topics:files, title:id, description:data});
            });
        }
        else{
            // id값이 없을 경우 실행
            // 첫인자 : 템플릿 파일 이름 2번쨰인자 -> 담을 인자를 객체 안에 담아서 전달
            res.render('view',{topics:files, title:'Welcome', description:'Hello, JavaScript for Server'});
        }
    })
})

/*
// 본문 읽기
app.get('/topic/:id', (req,res)=>{
    // 바뀔 수 있는 정보 -> :id
    let id = req.params.id;

    // 목록을 가져온다.
    fs.readdir('data',(err, files)=>{
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        // 첫인자 : 템플릿 파일 이름 2번쨰인자 -> 담을 인자를 객체 안에 담아서 전달
        // 데이터를 읽어옴
        fs.readFile('data/'+id,'utf8',(err,data)=>{
            if(err){
                console.log(err);
                res.status(500).send('Internal Server Error');
            }
            res.render('view',{topics:files, title:id, description:data});
        });
    })
})
*/

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
        res.redirect('/topic/' + title);
    })
})

// app을 listen하여 포트와 이 앱의 포트에 연결되면 콜백 함수가 호출되며 연결되었다는 사항을 알려줌
app.listen(3000,()=>{
    console.log('Conntected, 3000 port!');
})

