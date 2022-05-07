const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(express.json()); // json 형식의 데이터를 처리할 수 있게 설정하는 코드
app.use(cors()); // 브라우저의 CORS 이슈를 막기 위해 사용하는 코드

app.get('/products', (req, res) => {
    res.send('업로드 된 상품입니다.');
});

app.post('/products', (req, res) => {
    res.send('상품이 등록되었습니다.');
});

// 세팅한 app 실행
app.listen(port, () => {
    console.log('Corner Mall Server On.');
});
