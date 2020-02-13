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
  if (req.session.username != undefined) {
    res.json(true)
  } else {
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
  res.sendFile(path.join(__dirname + '/views/html/utilities/index.html'));
});





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
    if (data != null) {
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})
app.post('/insert/personal', (req, res) => {

  var obj = JSON.parse(req.body.personal);
  console.log(req.files === null)
  console.log(req.files === undefined)
  if (req.files != null) {
    var datafile = req.files.image.data
    obj[2].data = datafile
  } else {
    obj[2].data = null
  }
  console.log(req.files)
  webService.InsertPersonalStep(obj[0], obj[1], obj[2], req.session.username).then((data) => {
    console.log(`server : function InsertPersonalStep return = ${data}`)
    res.json(data)
  })
})
app.post('/update/status/delete', (req, res) => {
  webService.updateStatusDelete(req.body.personal, req.session.username).then((data) => {
    console.log(`server : function updateStatusDelete return = ${data}`)
    res.json(data)
  })
})
app.get('/search/personal/:id/:name/:surname', (req, res) => {
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
    console.log(`servar : function searchOperator return = ${data}`)
    res.json(data)
  })
})
// Test Data referecne
let referecneData = {
  id: '',
  title: 'นาย',
  name: 'แชมป์',
  surname: 'แชมป์',
  status: 'น้อง',
  phone: '0616577015'
}
let trianData = {
  id: '',
  issuse: 'สำนักงานเทศบาล',
  date_exp: '02-05-2541',
  date_issued: '02-05-2563'
}
let MASK = 'R000012562'
let eop = {

}
app.post('/insert/requestss', (req, res) => {
  let size = parseInt(req.body.maxSizeImage)
  let formatInsertImage = []
  let object = {
    name: '',
    type: '',
    data: ''
  }
  for (let i = 1; i <= size; i++) {
    let files
    i === 1 ? files = req.files.files0 : ''
    i === 2 ? files = req.files.files1 : ''
    i === 3 ? files = req.files.files2 : ''
    i === 4 ? files = req.files.files3 : ''
    i === 5 ? files = req.files.files4 : ''
    i === 6 ? files = req.files.files5 : ''
    i === 7 ? files = req.files.files6 : ''
    i === 8 ? files = req.files.files7 : ''
    object.name = i
    object.type = files.mimetype.slice(6, files.mimetype.length)
    object.data = files.data
    formatInsertImage.push(object)
    object = {
      name: '',
      type: '',
      data: ''
    }
  }
  console.log(formatInsertImage)
  webService.insertImageEstablishments(formatInsertImage, MASK).then((data) => {
    console.log(data)
  })
})
//insertEstablishment
// let testE = {
//   id: '',
//   address_id: 'SAVE',
//   perosonal_id: 'P000001',
//   is_land_owned: 'NO',
//   type: '',
//   name: '',
//   machine_size: 15,
//   area_size: 15.5,
//   worker: 77.5,
//   phone: '-',
//   fax: '',
//   grond: ''
// }
// let address = {
//   id: "",
//   home_number: 'test',
//   moo: 'test',
//   trxk: 'test',
//   sxy: '',
//   building: '',
//   road: '',
//   district_name: 'test',
//   amphur_name: 'test',
//   province_name: 'test'
// }
// let address2 = {
//   id: "",
//   home_number: 'test',
//   moo: 'test',
//   trxk: 'test',
//   sxy: 'test',
//   building: 'test',
//   road: 'test',
//   district_name: 'test',
//   amphur_name: 'test',
//   province_name: 'test'
// }
// let land = {
//   id: "",
//   address_id: "",
//   title: 'test',
//   name: 'test',
//   surname: 'test',
//   birthday: "",
//   phone: "-",
// }
app.post('/insert/request', (req, res) => {
  
  var obj = JSON.parse(req.body.gropData);
  obj[6].data = req.files != null ? req.files.files.data :  ''
  // console.log(obj)
  //InsertRequestStep(request, personal, Edata, address, land, addressOwner, file, reference, train)
  //ets = Edata, address, land, addressOwner, file
  webService.InsertRequestStep(obj[0],obj[1],obj[2],obj[3],obj[4],obj[5],obj[6],obj[7],obj[8]).then((data) => {
    console.log(data)
  })
})


// let mid = 'E000001'
// webService.getEstablishment(mid).then((tt) =>{
//   console.log(tt)
// }))

// let testInsertRequest = {
//   no: 'C00001',
//   year: '2563',
//   personal_id_owner: 'P000001',
//   request_type_id: 15,
//   staff_id_alderman: 'S0001',
//   establishment_id: '',
//   staff_id_money: 'S0001',
//   reference_id: 'RF00001',
//   train_id: 'YES',
//   personal_id_assistant: '',
//   staff_id_approve: 'S0001',
//   menu: 'ใบอนุญาตจัดตั้งสถานที่จำหน่ายอาหาร',
//   date_submission: '30-05-2563',
//   date_approve: '30-05-2563',
//   doc_no1: 'N',
//   doc_no2: 'N',
//   doc_no3: 'x',
//   doc_no4: 'x',
//   doc_no5: 'x',
//   doc_no6: 'x',
//   subcategory: '',
//   product_type: '',
//   sell_start: '13:48:00.000',
//   sell_end: '13:48:00.000',
//   sell_allow: 'N',
//   receipt_order: '',
//   receipt_fine: 10,
//   receipt_fee: 15.5,
//   receipt_total: '',
//   //
//   receipt_date: '30-05-2563',
//   date_issued: '30-05-2563',
//   date_expired: '30-05-2563',
//   //
//   condition_no_1: '',
//   condition_no_2: '',
//   condition_no_3: '',
//   condition_no_4: '',
//   image_name: '',
//   total_image: 0,
//   status: '',
//   delete_logic: '',
//   is_deleted: '',
//   last_update: '20-05-2563',
//   user_update: 'ADMIN'

// }
// webService.InsertRequestStep(testInsertRequest).then((data) =>{
//   console.log(data)
// })
// webService.updateRequestStatus('approval','C00003', `2563`).then((data) =>{
//   console.log(data)
// })
// webService.getRequestByTpyeAndOwnerId('wait','P000001').then((data) =>{
//     console.log(data.length)
//   })
// webService.updateRequest(testInsertRequest).then((data) => {
//   console.log(data)
// })
// webService.getRequestByIdAndYear('C00001', `2563`).then((data) =>{
//   console.log(data)
// })
//ทำให้ css กับ js ใช้ได้
app.use(express.static(__dirname + '/views'));
app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});