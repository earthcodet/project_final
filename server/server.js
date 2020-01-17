var express = require('express')
const port = 5000
const WebDAO = require("./DAO/WebDAO")
const LoginDAO = require('./DAO/UserDAO')
const LoginDAOObj = new LoginDAO()
const WebDAOObj = new WebDAO();
const cors = require('cors')
var app = express();
app.use(cors())
app.get('/user/:username/:password', (req, res) =>{
  console.log(req.params.username)
  console.log(req.params.password)
  LoginDAOObj.getUser(req.params.username,req.params.password).then((data) =>{
    if(data != null){
      res.json(data)
    }else{
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

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});

// var username = 'userTest01'
// var password =  'p123456'
// con.query('SELECT * FROM user WHERE userId = ? AND password = ?', [username, password], function(error, results) {
//     console.log(results)
//     if (results.length > 0) {
//        console.log('correct Username and password')
//     } else {
//         response.send('Incorrect Username and/or Password!');
//     }			
// });