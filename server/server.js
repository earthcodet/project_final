const express = require('express')
const bodyParser = require("body-parser")
const cors = require('cors')
const fileUpload = require('express-fileupload')
const session = require('express-session')
const path = require('path');
const service = require('./Service/webService')
const webService = new service()
const router = express.Router();
const {
  PORT = 5000,
  NODE_ENV = 'development'
} = process.env
const IN_PROD = NODE_ENV === 'production'
const redirectLogin = (req, res, next) => {
  if (!req.session.username) {
    res.redirect('/login')
  } else {
    next()
  }
}
const redirectHome = (req, res, next) => {
  if (req.session.username) {
    res.redirect('/')
  } else {
    next()
  }
}

const app = express();
app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(fileUpload())

app.use(session({
  name: 'sid',
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: IN_PROD,
    sameSite: true,
    httpOnly: true
  }
}))
app.get('/get/username/login', (req, res) => {
  if(req.session.username != undefined){
    res.json(true)
  }else{
    res.json(false)
  }
})


app.get('/user/:username/:password', (req, res) => {
  webService.getUser(req.params.username, req.params.password).then((data) => {
    if (data.length != 0) {
      req.session.username = req.params.username
      console.log('Username and Password correct')
      console.log(`username => ${req.session.username}`)
      res.redirect('/')
    } else {
      res.json(data)
    }
  })
})
router.get('/logout', redirectLogin, function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      res.negotiate(err)
    }
    res.redirect('./')
  })
});

router.get('/login', redirectHome, function (req, res) {
  res.sendFile(path.join(__dirname + '/views/html/utilities/login.html'));
});

router.get('/', redirectLogin, function (req, res) {
  console.log(req.session.username)
  res.sendFile(path.join(__dirname + '/views/html/utilities/index.html'));
});



//ทำให้ css กับ js ใช้ได้
app.use(express.static(__dirname + '/views'));

app.use('/', router);
app.get("/get/provice", (req, res) => {
  webService.getProvince().then(data => {
    if (data != null) {
      res.json(data);
    } else {
      res.sendStatus(404);
    }
  });
});
app.get("/get/amphur", (req, res) => {
  webService.getAmphur().then(data => {
    if (data != null) {
      res.json(data);
    } else {
      res.sendStatus(404);
    }
  });
});
app.get("/get/district", (req, res) => {
  webService.getDistrict().then(data => {
    if (data != null) {
      res.json(data);
    } else {
      res.sendStatus(404);
    }
  });
});
app.get('/get/image/:personalId', (req, res) => {
  webService.getImageByPersonalId(req.params.personalId).then((data) => {
    if (data != null) {
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})
app.get('/get/personalId/:personalId', (req, res) => {
  webService.getPersonalId(req.params.personalId).then((data) => {
    console.log(`servar status => ${data}`)
    if (data != null) {
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})
app.post('/insert/personal', (req, res) => {
  var obj = JSON.parse(req.body.personal);
  if (req.files != null) {
    var datafile = req.files.image.data
    obj[2].data = datafile
  }
  webService.personalStep(obj[0], obj[1], obj[2], req.session.username).then((data) => {
    console.log(data)
    res.json(data)
  })
})
app.post('/update/status/delete', (req, res) => {
  webService.updateStatusDelete(req.body.personal, req.session.username).then((data) => {
    console.log(`return update-status-delete => ${data}`)
    res.json(data)
  })
})
app.get('/search/personal/:id/:name/:surname', (req, res) => {
  //id/name/surname
  if (req.params.id === 'none') {
    req.params.id = ''
  }
  if (req.params.name === 'none') {
    req.params.name = ''
  }
  if (req.params.surname === 'none') {
    req.params.surname = ''
  }
  webService.searchOperator(req.params.id, req.params.name, req.params.surname).then((data) => {
    console.log(`servar status => ${data}`)
    if (data != null) {
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})
let dataTest = {
  'id': '',
  'home_number': 'test',
  'moo': 'test',
  'trxk': 'test',
  'sxy': 'test',
  'building': 'test',
  'road': 'test',
  'district_name': 'test',
  'amphur_name': 'test',
  'province_name': 'test'
}
let personalTest = {
  'id': '',
  'address_id': 'test',
  'title': 'นาย',
  'type': 'บุคคลธรรมดา',
  'name': 'ทดสอบ',
  'surname': 'หาบัค',
  'nationality': 'ไทย',
  'race': 'ไทย',
  'birthday': '24/04/2541',
  'personal_id': '0124455781255',
  'card_issued': '10/01/2545',
  'card_expipe': '10/01/2563',
  'phone': '0625478965',
  'fax': '213546987'
}
// webService.insertStep(personalTest, dataTest)
app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});