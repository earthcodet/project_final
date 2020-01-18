const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const session = require('express-session')

const {
    PORT = 3000,
    NODE_ENV = 'development'
} = process.env
const IN_PROD = NODE_ENV === 'production'
app.use(session({
    name:'sid',
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure : IN_PROD,
        sameSite:true
    }
  }))

const redirectLogin = (req, res, next) => {
    if(!req.session.userId){
        res.redirect('/login')
    }else{
        next()
    }
}

const redirectHome = (req, res, next) => {
    if(req.session.userId){
        res.redirect('/')
    }else{
        next()
    }
}
app.get("/session/:userId", (req, res) => {
    console.log(`TOT`)
    console.log(req.session.userId)
    req.session.userId = req.params.userId
    console.log(req.session.userId)
    console.log(req.params.userId)
    res.redirect('/')
    return true
});

router.get('/logout', redirectLogin, function (req, res) {
    req.session.destroy(function(err){
        if (err){
            res.negotiate(err)
        }
        res.redirect('./')
    })
});

router.get('/login', redirectHome, function (req, res) {
    res.sendFile(path.join(__dirname + '/views/html/utilities/login.html'));
});

router.get('/',redirectLogin, function (req, res) {
    console.log(req.session.userId)
    res.sendFile(path.join(__dirname + '/views/html/utilities/index.html'));
});

// เมนูคำขอ
router.get('/request/01', redirectLogin, function (req, res) {
    res.sendFile(path.join(__dirname + '/views/html/request/request_public_sell.html'));
});
router.get('/request/02', redirectLogin, function (req, res) {
    res.sendFile(path.join(__dirname + '/views/html/request/request_public_hawk.html'));
});
router.get('/request/03', redirectLogin, function (req, res) {
    res.sendFile(path.join(__dirname + '/views/html/request/request_area_more_sell.html'));
});
router.get('/request/04', redirectLogin, function (req, res) {
    res.sendFile(path.join(__dirname + '/views/html/request/request_area_more_correct.html'));
});
router.get('/request/05', redirectLogin, function (req, res) {
    res.sendFile(path.join(__dirname + '/views/html/request/request_area_less_sell.html'));
});
router.get('/request/06', redirectLogin, function (req, res) {
    res.sendFile(path.join(__dirname + '/views/html/request/request_area_less_correct.html'));
});
router.get('/request/07', redirectLogin, function (req, res) {
    res.sendFile(path.join(__dirname + '/views/html/request/request_market.html'));
});
router.get('/request/08', redirectLogin, function (req, res) {
    res.sendFile(path.join(__dirname + '/views/html/request/request_health_danger.html'));
});
router.get('/request/09', redirectLogin, function (req, res) {
    res.sendFile(path.join(__dirname + '/views/html/request/request_crematory.html'));
});
router.get('/request/search', redirectLogin, function (req, res) {
    res.sendFile(path.join(__dirname + '/views/html/request/searchRequest.html'));
});

//เมนูส่วนกลาง
router.get('/operator/01', redirectLogin, function (req, res) {
    res.sendFile(path.join(__dirname + '/views/html/central/operator.html'));
});
router.get('/operator/02', redirectLogin, function (req, res) {
    res.sendFile(path.join(__dirname + '/views/html/central/02.html'));
});
router.get('/operator/03', redirectLogin, function (req, res) {
    res.sendFile(path.join(__dirname + '/views/html/central/03.html'));
});

//เมนูรายงาน
router.get('/report/01', redirectLogin, function (req, res) {
    res.sendFile(path.join(__dirname + '/views/html/report/report_crematory.html'));
});
router.get('/report/02', redirectLogin, function (req, res) {
    res.sendFile(path.join(__dirname + '/views/html/report/report_summary.html'));
});

//เมนูแจ้งเตือน
router.get('/notfication', redirectLogin, function (req, res) {
    res.sendFile(path.join(__dirname + '/views/html/notfication/request.html'));
});

//ทำให้ css กับ js ใช้ได้
app.use(express.static(__dirname + '/views'));

app.use('/', router);
app.listen(PORT, () => console.log(
    `https://localhost:${PORT}`
));
