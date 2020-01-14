const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

router.get('/', function (req, res) {
    console.log(path.__dirname)
    res.sendFile(path.join(__dirname + '/views/html/utilities/login.html'));
});

// เมนูคำขอ
router.get('/request/01', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/html/request/request_public_sell.html'));
});
router.get('/request/02', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/html/request/request_public_hawk.html'));
});
router.get('/request/03', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/html/request/request_area_more_sell.html'));
});
router.get('/request/04', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/html/request/request_area_more_correct.html'));
});
router.get('/request/05', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/html/request/request_area_less_sell.html'));
});
router.get('/request/06', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/html/request/request_area_less_correct.html'));
});
router.get('/request/07', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/html/request/request_market.html'));
});
router.get('/request/08', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/html/request/request_health_danger.html'));
});
router.get('/request/09', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/html/request/request_crematory.html'));
});
router.get('/request/search', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/html/request/searchRequest.html'));
});

//เมนูส่วนกลาง
router.get('/operator/01', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/html/central/operator.html'));
});
router.get('/operator/02', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/html/central/02.html'));
});
router.get('/operator/03', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/html/central/03.html'));
});

//เมนูรายงาน
router.get('/report/01', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/html/report/report_crematory.html'));
});
router.get('/report/02', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/html/report/report_crematory.html'));
});

//เมนูแจ้งเตือน
router.get('/notfication', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/html/notfication/request.html'));
});


//ทำให้ css กับ js ใช้ได้
app.use(express.static(__dirname + '/views'));

app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');