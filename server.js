const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(express.json()); // json 형식의 데이터를 처리할 수 있게 설정하는 코드
app.use(cors()); // 브라우저의 CORS 이슈를 막기 위해 사용하는 코드

// 리스트
app.get('/products', (req, res) => {
    const query = req.query;
    console.log('Query : ', query);
    res.send({
        "products": [
            {
                "id": 1,
                "name": "농구공",
                "price": 100000,
                "seller": "조던",
                "imageUrl": "images/products/basketball1.jpeg"
            },
            {
                "id": 2,
                "name": "축구공",
                "price": 50000,
                "seller": "메시",
                "imageUrl": "images/products/soccerball1.jpg"
            },
            {
                "id": 3,
                "name": "키보드",
                "price": 10000,
                "seller": "그랩",
                "imageUrl": "images/products/keyboard1.jpg"
            }
        ]
    });
});

// 생성
app.post('/products', (req, res) => {
    const body = req.body;
    res.send({
        body,
    });
});

// 상세
app.get('/products/:id', function (req, res) {
    const params = req.params; // ' { id : 값 } ' 형태로 들어온다.
    const {id} = params; // ES6 Destructuring
    res.send(`id 는 ${id}입니다.`);
})

// 세팅한 app 실행
app.listen(port, () => {
    console.log('Corner Mall Server On.');
});
