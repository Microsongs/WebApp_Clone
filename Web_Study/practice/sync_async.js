// 파일 시스템용 모듈
const fs = require('fs');

// Sync
console.log(1);
const data = fs.readFileSync('data.txt', {encoding:'utf-8'});
console.log(data);

// Async
console.log(2);
fs.readFile('data.txt',{encoding:'utf-8'},(err,data)=>{
    console.log(3);
    console.log(data);
});
console.log(4);