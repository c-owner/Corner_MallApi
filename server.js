const models = require('./models');
const multer = require('multer');
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/');
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        },
    })
});
const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(express.json()); // json 형식의 데이터를 처리할 수 있게 설정하는 코드
app.use(cors()); // 브라우저의 CORS 이슈를 막기 위해 사용하는 코드
//파일 처리 업로드 처리
app.use('/uploads', express.static('uploads'));

// 리스트
app.get('/products', (req, res) => {
    // findAll 은 Product에 해당되는 테이블을 모두 가져온다.
    models.Product.findAll({
        //    전체 레코드를 전부다 조회하기 때문에 오랜시간이 걸릴 수 있어서 findAll에 limit 조건을 걸어야한다.
        //    ex ) 페이지네이션 처리
        //     limit: 10,
        // -----정렬 방식 order , DESC = 내림차순. (시간이 최신순인게 항상 최근게시물로 올라오는 방식)
        order: [['createdAt', 'DESC']],
        // attributes 는 어떤 컬럼을 가져올 것인가. 필요한 컬럼 데이터만 가져올 수 있다.
        attributes: ['id', 'name', 'price', 'seller', 'createdAt', "imageUrl"],

    }).then((result) => {
        console.log("Products : ", result);
        res.send({
            products: result
        });
    }).catch((error) => {
        console.error(error);
        res.status(400).send("서버에 오류가 발생하여 조회를 할 수 없습니다.");
    });
});

// 생성
app.post('/products', (req, res) => {
    const body = req.body;
    const {name, description, price, seller, imageUrl} = body;
    if (!name || !description || !price || !seller || !imageUrl) {
        res.status(400).send("모든 필드를 입력해주세요");
        return;
    }
    // DB에 Data처리 작업속도가 느릴 수 있기 때문에 비동기처리
    models.Product.create({
        name, description, price, seller, imageUrl
    }).then((result) => {
        console.log('상품 생성 결과 : ', result);
        res.send({
            result
        });
    }).catch((error) => {
        console.error(error);
        res.status(400).send('상품 업로드에 문제가 발생하였습니다.');
    });
});

// 상세
app.get('/products/:id', function (req, res) {
    const params = req.params; // ' { id : 값 } ' 형태로 들어온다.
    const {id} = params; // ES6 Destructuring
    models.Product.findOne({
        where: {
            id: id
        }
    }).then((result) => {
        console.log("PRODUCT : ", result)
        res.send({
            product: result
        })
    }).catch((error) => {
        console.error(error);
        res.status(400).send("상품 조회 에러가 발생하였습니다.")
    });
})

// 파일 upload api
app.post('/image', upload.single('image'), (req, res) => {
    const file = req.file;
    console.log(file);
    // 다양한 req.file 의 파일 정보중 file.path 값을 넣는다.
    res.send({
        imageUrl: file.path
    })
});

// 세팅한 app 실행
app.listen(port, () => {
    console.log('Corner Mall Server On.');
    models.sequelize
        .sync().then(() => {
        console.log('🌱DB 연결 성공');
    }).catch(function (err) {
        console.error(err);
        console.log('❗️DB 연결 에러');
        process.exit();
    });
});
