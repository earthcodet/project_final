var express = require('express')
const port = 5000
const WebDAO = require("./DAO/WebDAO")
const LoginDAO = require('./DAO/UserDAO')
const PersonalDAO = require('./DAO/PersonalDAO')
const PersonalDAOObj = new PersonalDAO()
const LoginDAOObj = new LoginDAO()
const WebDAOObj = new WebDAO();


//Service
const service = require('./Service/webService')
const webService = new service()
const cors = require('cors')
var app = express();
app.use(cors())
app.get('/user/:username/:password', (req, res) => {
  console.log(req.params.username)
  console.log(req.params.password)
  LoginDAOObj.getUser(req.params.username, req.params.password).then((data) => {
    if (data != null) {
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  })
})
app.get("/get/provice", (req, res) => {
  WebDAOObj.getProvince().then(data => {
    if (data != null) {
      res.json(data);
    } else {
      res.sendStatus(404);
    }
  });
});
app.get("/get/amphur", (req, res) => {
  WebDAOObj.getAmphur().then(data => {
    if (data != null) {
      res.json(data);
    } else {
      res.sendStatus(404);
    }
  });
});
app.get("/get/district", (req, res) => {
  WebDAOObj.getDistrict().then(data => {
    if (data != null) {
      res.json(data);
    } else {
      res.sendStatus(404);
    }
  });
});
app.get('/mytest/v1', (req, res) => {
  webService.getNewId('ADDRESS').then((data) => {
    if (data != null) {
      res.json(data);
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
  'buildind': 'test',
  'road': 'test',
  'district_name': 'test',
  'amphur_name': 'test',
  'province_name': 'test'
}
//format yyyy-mm-dd
let personalTest = {}
personalTest.id = ''
personalTest.address_id = ''
personalTest.title = ''
personalTest.type = ''
personalTest.name = ''
personalTest.surname = ''
personalTest.nationality = ''
personalTest.race = ''
personalTest.birthday = ''
personalTest.personal_id = ''
personalTest.card_issued = ''
personalTest.card_expipe = ''
personalTest.phone = ''
personalTest.fax = ''
personalTest.update = ''

// webService.insertStep(dataTest)
app.listen(port, () => {
  console.log(`App listening on ${port}`);
});