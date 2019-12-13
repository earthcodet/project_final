var express = require('express');
const port = 5000;
const WebDAO = require("./DAO/WebDAO");
const WebDAOObj = new WebDAO();
const cors = require('cors')
var app = express();
app.use(cors())
// app.use(session({
// 	secret: 'secret',
// 	resave: true,
// 	saveUninitialized: true
// }));


// app.get("/get", (req, res) => {
//     WebDAOObj.get().then(data => {
//       if (data != null) {
//         res.json(data);
//         console.log("result :")
//         console.log(data[0].formId)
//       } else {
//         res.sendStatus(404);
//       }
//     });
//   });
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
  // app.get("/get/amphur/:proviceId", (req, res) => {
  //   WebDAOObj.getAmphur(req.params.proviceId).then(data => {
  //     if (data != null) {
  //       res.json(data);
  //     } else {
  //       res.sendStatus(404);
  //     }
  //   });
  // });
  // app.get("/get/district/:proviceId/:amphurId", (req, res) => {
  //   WebDAOObj.getDistrict(req.params.proviceId,req.params.amphurId).then(data => {
  //     if (data != null) {
  //       res.json(data);
  //     } else {
  //       res.sendStatus(404);
  //     }
  //   });
  // });

// app.post("/insert", (req, res) => {
//     WebDAOObj.getAmphur(req.body.formData).then(data => {
//       console.log(req.body.formData)
//       res.json(data);
    
//     });
//   });
//   console.log("pass")
//   app.post("/update", (req, res) => {
//     WebDAOObj.update(req.body.formDatas).then(data => {
//       res.json(data);
    
//     });
//   });

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