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
        sameSite:true,
        httpOnly:true
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
    req.session.userId = req.params.userId
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



//ทำให้ css กับ js ใช้ได้
app.use(express.static(__dirname + '/views'));

app.use('/', router);
app.listen(PORT, () => console.log(
    `https://localhost:${PORT}`
));
