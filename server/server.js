const express = require('express')
const bodyParser = require("body-parser")
const cors = require('cors')
const fileUpload = require('express-fileupload')
const port = 5000
//DAO
const WebDAO = require("./DAO/WebDAO")
const LoginDAO = require('./DAO/UserDAO')
const LoginDAOObj = new LoginDAO()
const WebDAOObj = new WebDAO();
const service = require('./Service/webService')
const webService = new service()

var app = express();
app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(fileUpload())


app.get('/user/:username/:password', (req, res) => {
  LoginDAOObj.getUser(req.params.username, req.params.password).then((data) => {
    if (data != null) {
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})
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
app.get('/get/image/:prsonalId', (req, res) =>{
  webService.getImageByPersonalId(req.params.personalId).then((data) =>{
    if(data != null){
      res.json(data)
    }else {
      res.sendStatus(404)
    }
  })
})
app.get('/get/personalId/:personalId', (req, res) =>{
  webService.getPersonalId(req.params.personalId).then((data) =>{
    console.log(`servar status => ${data}`)
    if(data != null){
      res.json(data)
    }else {
      res.sendStatus(404)
    }
  })
})
app.post('/insert/personal', (req, res) =>{
  var obj = JSON.parse(req.body.personal); 
  if(req.files != null){
    var datafile = req.files.image.data
    obj[2].data = datafile
  }
  webService.insertStep(obj[0],obj[1], obj[2]).then((data) =>{
    console.log(data)
    res.json(data)
  })
})
app.get('/search/personal/:id/:name/:surname', (req, res) =>{
  //id/name/surname
  if(req.params.id === 'none'){
    req.params.id = ''
  }
  if(req.params.name === 'none'){
    req.params.name = ''
  }
  if(req.params.surname === 'none'){
    req.params.surname = ''
  }
  webService.getPersonal(req.params.id  , req.params.name, req.params.surname).then((data) =>{
    console.log(`servar status => ${data}`)
    if(data != null){
      res.json(data)
    }else {
      res.sendStatus(404)
    }
  })
})
app.get('/search/address/:addressId', (req, res) =>{
  webService.getAddressByAddressId(req.params.addressId).then((data) =>{
    console.log(`servar status => ${data}`)
    if(data != null){
      res.json(data)
    }else {
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
  'id':'',
  'address_id':'test',
  'title':'นาย',
  'type':'บุคคลธรรมดา',
  'name':'ทดสอบ',
  'surname':'หาบัค',
  'nationality':'ไทย',
  'race':'ไทย',
  'birthday':'24/04/2541',
  'personal_id':'0124455781255',
  'card_issued':'10/01/2545',
  'card_expipe':'10/01/2563',
  'phone':'0625478965',
  'fax':'213546987'
}
// webService.insertStep(personalTest, dataTest)
app.listen(port, () => {
  console.log(`App listening on ${port}`);
});