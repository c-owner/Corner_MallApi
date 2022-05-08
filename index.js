var http = require('http'); // node 내장 모듈 불러옴
var hostname = 'corner-mac.kro.kr'; // localhost와 동일
var port = 8080;

const server = http.createServer(function (req, res) {
    const path = req.url;
    const method = req.method;
    if (path === '/products') {
        if (method === 'GET') {
            res.writeHead(200, {'Content-Type': 'application/json'});
            const products = JSON.stringify([{
                name: '농구공',
                price: 5000,
            }]);
            res.end(products);
        } else if (method === 'POST') {
            res.end("생성되었습니다.");
        }
    } else {
        res.end("Good Bye");
    }
});

server.listen(port, hostname);

console.log('corner-market server on! http://' + hostname + ':' + port);

// node.js에서는 한글을 처리할 때 깨져보이는 경우도 있고, POST 요청에 응답을 할 때도 파일이나 복잡한 객체 값을 넣는 작업을 할 땐
// node.js 만으로 복잡한 응답처리 할 수록 한계가 있다.
// 이러한 문제들을 손쉽게 처리하도록 나온게 Express 라는 Framework이다.
// Node.js에서는 서버 개발할 때 Express Framework를 사용하는 편이다.
