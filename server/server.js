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
    res.json(req.session.userType)
  } else {
    res.json(false)
  }
})

app.get('/user/:username/:password', (req, res) => {
  webService.getUser(req.params.username, req.params.password).then((data) => {
    if (data.length != 0) {
      req.session.username = req.params.username
      req.session.userType = data[0].USER_TYPE_USER
      console.log('Username and Password correct')
      console.log(`username => ${req.session.username}`)
      res.redirect('/')
    } else {
      res.json(data)
    }
  })
})
app.get('/get/user/all', (req, res) => {
  webService.getUserAll().then((data) => {
    res.json(data)
  })
})
app.post('/user/update/status/delete/', (req, res) => {
  //userItem
  webService.updateStatusDeleteUser(req.body.userItem.id,req.body.userItem.status,req.session.username).then((data) => {
    res.json(data)
  })
})
//Request type 
//get ALL
app.get('/requesttype/get/all', (req, res) => {
  webService.getRequestType().then((data) => {
    res.json(data)
  })
})
app.get('/requesttype/get/id/:id', (req, res) => {
  webService.getRequestTypeById(req.params.id).then((data) => {
    res.json(data)
  })
})
app.get('/requesttype/get/name/:id', (req, res) => {
  webService.getRequestBymenuName(req.params.id).then((data) => {
    res.json(data)
  })
})

app.post('/requesttype/insert', (req, res) => {
  //userItem
  webService.insertRequestTypeStep(req.body.requestItem).then((data) => {
    res.json(data)
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
app.get('/get/notification/request/', (req, res) => {
  webService.getNotificationExp30Day().then((data) => {
    if (data.RE_EXP != undefined) {
      req.session.data_exp_count = data.RE_EXP
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})
//notification
app.get('/get/session/re_exp', (req, res) => {
  res.json(req.session.data_exp_count)
})
//nDada
app.get('/get/type/request/exp/less/:date', (req, res) => {
  webService.getDateRequestLess(req.params.date).then((data) => {
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
app.get('/get/personal/assistant/:personalId', (req, res) => {
  webService.getPersonalAssistantByPersonalId(req.params.personalId).then((data) => {
    if (data != null) {
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})
//
app.get('/search/request/page', (req, res) => {
  console.log('get request  ')
  var obj = JSON.parse(req.query.r_s);
  // console.log(obj)
  webService.searchRequestByItem(obj).then((data) => {
    if (data != null) {
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})
app.get('/get/requestType', (req, res) => {
  webService.getRequestType().then((data) => {
    if (data != null) {
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})
app.get('/get/requestType/:type', (req, res) => {
  console.log(req.params.type)
  webService.getRequestTypeByType(req.params.type).then((data) => {
    if (data != null) {
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})
app.post('/insert/personal', (req, res) => {
  try {
    var obj = JSON.parse(req.body.personal);
    console.log(req.files === null)
    console.log(req.files === undefined)
    if (req.files != null) {
      var datafile = req.files.image.data
      obj[2].data = datafile
    } else {
      obj[2].data = null
    }

    webService.InsertPersonalStep(obj[0], obj[1], obj[2], req.session.username).then((data) => {
      console.log(`server : function InsertPersonalStep return = ${data}`)
      res.json(data)
    })
  }
  catch (error) {
    console.error(error);
  }


})
app.post('/insert/user', (req, res) => {
  console.log('server user = '+ req.session.username)
  try {
    var obj = JSON.parse(req.body.gropData);
    var datafile = undefined
    if (req.files != null) {
      obj[1].data = req.files.files.data
    } else {
      if(obj[1].name === 'delete_image'){
        obj[1].name = ''
        obj[1].data = null
      }else{
        obj[1] = datafile
      }
    }
    console.log('server user = '+ req.session.username)
    webService.InsertUserStep(obj[0], obj[1], req.session.username).then((data) => {
      res.json(data)
    })
  }
  catch (error) {
    console.log(error)
    res.json('server error')
  }
})

app.post('/update/status/delete', (req, res) => {
  webService.updateStatusDelete(req.body.personal, req.session.username).then((data) => {
    console.log(`server : function updateStatusDelete return = ${data}`)
    res.json(data)
  })
})
app.post('/update/request/status/', (req, res) => {
  webService.updateRequestStatus(req.body.requestData, req.session.username).then((data) => {
    console.log(`server : function updateStatusDelete return = ${data}`)
    res.json(data)
  })
})
app.post('/update/requestExtra/status/', (req, res) => {
  webService.cancleStatusRequestExtra(req.body.requestData, req.session.username).then((data) => {
    console.log(`server : function updateStatusDelete return = ${data}`)
    res.json(data)
  })
})
app.get('/search/personal/:id/:name/:surname/all', (req, res) => {
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

app.get('/search/personal/:id/:name/:surname/', (req, res) => {
  if (req.params.id === 'none') {
    req.params.id = ''
  }
  if (req.params.name === 'none') {
    req.params.name = ''
  }
  if (req.params.surname === 'none') {
    req.params.surname = ''
  }
  webService.searchOperatorDisplay(req.params.id, req.params.name, req.params.surname).then((data) => {
    console.log(`servar : function searchOperator return = ${data}`)
    res.json(data)
  })
})
app.post('/insert/request', (req, res) => {
  var obj = JSON.parse(req.body.gropData);
  if (req.files != null) {
    if (req.files.files != null) {
      obj[6].data = req.files.files.data
    } else {
      obj[6].data = null
    }
  } else {
    obj[6].data = null
  }
  for (let i = 0; i < obj[9].length; i++) {
    let image
    i === 0 ? image = req.files.files0 : ''
    i === 1 ? image = req.files.files1 : ''
    i === 2 ? image = req.files.files2 : ''
    i === 3 ? image = req.files.files3 : ''
    i === 4 ? image = req.files.files4 : ''
    i === 5 ? image = req.files.files5 : ''
    i === 6 ? image = req.files.files6 : ''
    i === 7 ? image = req.files.files7 : ''
    if (obj[9][i].type === '') {
      obj[9][i].name = i + 1
      obj[9][i].type = image.mimetype.slice(6, image.mimetype.length)
      obj[9][i].data = image.data
    } else {
      obj[9][i].name = i + 1
      obj[9][i].data = image.data
    }
  }
  webService.InsertRequestStep(obj[0], obj[1], obj[2], obj[3], obj[4], obj[5], obj[6], obj[7], obj[8], req.session.username, obj[9]).then((data) => {
    res.json(data);
  })
})
app.post('/insert/complaint', (req, res) => {
  // console.log(req)
  console.log('Doing')
  var obj = JSON.parse(req.body.gropData);
  for (let i = 0; i < obj[1].length; i++) {
    let image
    i === 0 ? image = req.files.files0 : ''
    i === 1 ? image = req.files.files1 : ''
    i === 2 ? image = req.files.files2 : ''
    i === 3 ? image = req.files.files3 : ''
    i === 4 ? image = req.files.files4 : ''
    i === 5 ? image = req.files.files5 : ''
    i === 6 ? image = req.files.files6 : ''
    i === 7 ? image = req.files.files7 : ''
    if (obj[1][i].type === '') {
      obj[1][i].name = i + 1
      obj[1][i].type = image.mimetype.slice(6, image.mimetype.length)
      obj[1][i].data = image.data
    } else {
      obj[1][i].name = i + 1
      obj[1][i].data = image.data
    }
  }

  webService.insertComplaintStep(obj[0],obj[1], req.session.username).then((data) => {
    console.log(`status server return ${data}`)
    res.json(data);
  })
})
app.post('/insert/request/renew', (req, res) => {
  webService.insertRequestRenew(req.body.renew_data, req.session.username).then((data) => {
    res.json(data);
  })
})
app.post('/insert/request/transfer', (req, res) => {
  webService.createTransferRequest(req.body.transfer, req.session.username).then((data) => {
    res.json(data);
  })
})
app.get('/get/request/transfer/:no/:year', (req, res) => {
  webService.getRequestAndPersonal(req.params.no, req.params.year).then((data) => {
    res.json(data)
  })
})
app.get('/get/request/:no/:year', (req, res) => {
  webService.getRequestByIdAndYear(req.params.no, req.params.year).then((data) => {
    res.json(data)
  })
})
app.get('/get/image/comlaint/:id', (req, res) => {
  webService.getImageComlaint(req.params.id).then((data) => {
    res.json(data)
  })
})
app.get('/get/cmplaint/id/:no/:year', (req, res) => {
  webService.getComplaintById(req.params.no, req.params.year).then((data) => {
    res.json(data)
  })
})
app.get('/get/owner/duplication/transfer/:no/:year/:pid', (req, res) => {
  console.log(` search ${req.params.no} ${req.params.year} ${req.params.pid}`)
  webService.getOwnerDuplication(req.params.no, req.params.year, req.params.pid).then((data) => {
    res.json(data)
  })
})
app.get('/get/image/request/:imageName', (req, res) => {
  webService.getImageEstablishmentByImageRequest(req.params.imageName).then((data) => {
    res.json(data)
  })
})
app.get('/get/list/complaint/id/:p_id', (req, res) => {
  webService.getComplaintByPersonalId(req.params.p_id).then((data) => {
    res.json(data)
  })
})
app.get('/get/personal/profile/:id', (req, res) => {
  console.log('get data personal Id')
  webService.getPersonalById(req.params.id).then((data) => {
    res.json(data)
  })
})
app.get('/get/requestTypeById/:id', (req, res) => {
  webService.getRequestTypeById(req.params.id).then((data) => {
    console.log(date.REQUEST_DATE_SUBMISSION)
    res.json(data)
  })
})
app.get('/get/view/renew/:id/:year', (req, res) => {
  webService.getViewRenewRequestByIdAndYear(req.params.id, req.params.year).then((data) => {

    res.json(data)
  })
})
app.get('/get/view/allow/:id/:year', (req, res) => {
  webService.getViewAllowRequestByIdAndYear(req.params.id, req.params.year).then((data) => {

    res.json(data)
  })
})
app.get('/get/view/report/sum/:m/:year', (req, res) => {
  console.log(req.params.m)
  console.log(req.params.year)
  webService.getReportSum(req.params.m, req.params.year).then((data) => {

    res.json(data)
  })
})

app.get('/get/view/report/:id/:date_start/:date_end', (req, res) => {
  webService.getReportByDateAndRtID(req.params.id, req.params.date_start , req.params.date_end).then((data) => {
    res.json(data)
  })
})
app.get('/get/image/nayo/view/:id', (req, res) => {
  webService.getImageNayo(req.params.id).then((data) => {
    res.json(data)
  })
})
app.get('/get/image/nayo/user/:id', (req, res) => {
  webService.getImageNayoUser(req.params.id).then((data) => {
    res.json(data)
  })
})

app.get('/get/request/renew/:type/:personal_id', (req, res) => {
  webService.getRquestRenew(webService.getRequestTypeMenu(req.params.type), req.params.personal_id).then((data) => {
    res.json(data)
  })
})
app.get('/search/request/transfer/pid/:personal_id', (req, res) => {
  console.log(req.params.personal_id)
  webService.getRquestTransfer(req.params.personal_id).then((data) => {
    res.json(data)
  })
})
app.get('/get/request/renew/id/:no/:year', (req, res) => {
  webService.getRquestRenewByRequestId(req.params.no, req.params.year).then((data) => {
    res.json(data)
  })
})
console.log()
app.get('/get/viewImage/:id/:year', (req, res) => {
  webService.getViewImageRequestByIdAndYear(req.params.id, req.params.year).then((request_viewImage) => {
    res.json(request_viewImage)
  })
})
app.get('/get/user/:type', (req, res) => {
  let type_name = req.params.type
  if (type_name === 'money') {
    type_name = 'การเงิน'
  }
  if (type_name === 'president') {
    type_name = 'นายก'
  }
  if (type_name === 'information') {
    type_name = 'ทะเบียน'
  }
  webService.getStaffฺByType(type_name).then((data) => {
    res.json(data)
  })
})
app.get('/get/users/:type1/:type2', (req, res) => {
  let type_name = req.params.type1
  let type_name2 = req.params.type2
  if (type_name === 'money') {
    type_name = 'การเงิน'
  }
  if (type_name === 'president') {
    type_name = 'นายก'
  }
  if (type_name === 'information') {
    type_name = 'ทะเบียน'
  }
  if (type_name2 === 'money') {
    type_name2 = 'การเงิน'
  }
  if (type_name2 === 'president') {
    type_name2 = 'นายก'
  }
  if (type_name2 === 'information') {
    type_name2 = 'ทะเบียน'
  }
  webService.getStaffฺByTypes(type_name, type_name2).then((data) => {
    res.json(data)
  })
})
app.get('/get/user/id/:userId', (req, res) => {
  webService.getStaffฺById(req.params.userId).then((data) => {
    res.json(data)
  })
})
app.get('/get/request/profile/:pid/:eid', (req, res) => {
  webService.getRequestProfileByPIDAndEID(req.params.pid, req.params.eid).then((data) => {
    res.json(data)
  })
})
app.get('/get/request/owner/:personal_id/:type', (req, res) => {
  let type_type = req.params.type
  let type_id = req.params.personal_id
  webService.getRequestByTpyeAndOwnerId(type_type, type_id).then((data) => {
    res.json(data)
  })
})
app.get('/get/request/owner/:personal_id/:type/assistant', (req, res) => {
  let type_type = req.params.type
  let type_id = req.params.personal_id
  webService.getRequestByTpyeAndOwnerIdAssistant(type_type, type_id).then((data) => {
    res.json(data)
  })
})

app.post('/update/request/status/delete', (req, res) => {
  var obj = req.body.requestData
  webService.updateRequestStatusDelete(obj, req.session.username).then((data) => {
    res.json(data);
  })
})
webService.getNewId('ADDRESS').then((data) =>{
  console.log(data)
})
//ทำให้ css กับ js ใช้ได้
app.use(express.static(__dirname + '/views'));
app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});