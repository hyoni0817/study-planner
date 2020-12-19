const express = require('express'); //서버를 구성해주는 프레임워크

const app = express(); //express를 불러와서 실행을 해주면 app이라는 객체가 생김.

app.get('/', (req, res) => { //프론트에서 / 서버에 요청을 하면 res.send를 통해 응답을 함.
    res.send('hello, server');
});

app.get('/about', (req, res) => {
    res.send('Hello, about');
})

app.listen(3065, () => {
    console.log('server is running on http://localhost:8080');
});