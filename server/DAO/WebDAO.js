var mysql = require('mysql');
var con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'database'
});
// var arrObj = []
// arrObj.formId = '1705'
// arrObj.date = '24/17/2019'
// arrObj.formType = 'a'
// arrObj.place = 'a'
// arrObj.typeUser = 'a'
// arrObj.name = 'a'
// arrObj.age = 10
// arrObj.nationality = 'a'
// arrObj.race = 'a'
// arrObj.homeId = 'a'
// arrObj.moo = 10
// arrObj.trxk = 'a'
// arrObj.sxy = 'a'
// arrObj.building = 'a'
// arrObj.road = 'a'
// arrObj.province = 'a'
// arrObj.district = 'a'
// arrObj.subdistrict = 'a'
// arrObj.phone = 'a'
// arrObj.fax = 'a'
// arrObj.workplaceName = 'a'
// arrObj.area = 10
// arrObj.numPeople = 10
// arrObj.wHomeId = 'a'
// arrObj.wMoo = 10
// arrObj.wTrxk = 'a'
// arrObj.wSxy = 'a'
// arrObj.wBuilding = 'a'
// arrObj.wRoad = 'a'
// arrObj.wProvince = 'b'
// arrObj.wDistrict = 'b'
// arrObj.wSubdistrict = 'b'
// arrObj.wPhone = 'b'
// arrObj.wFax = 'b'
// arrObj.purposeType = 'b'
// arrObj.documentId = 1
// arrObj.documenthHome = 1
// arrObj.documentLegalEntity = 1
// arrObj.documentSignature = 1
// arrObj.documentSJ4 = 1
// arrObj.documentOther = 1
// arrObj.documentName = 'a'
// var test = []
class WebDAO {
    // insert() {
    //     return new Promise((resolve, reject) => {
    //         con.connect(function (err) {
    //             if (err) throw err;
    //             var sql = "INSERT INTO form (formId, date,formType,place,typeUser,name,age,nationality,race,homeId,moo,trxk,sxy,building,road,province,district,subdistrict,phone,fax,workplaceName,area,numPeople,wHomeId,wMoo,wTrxk,wSxy,wBuilding,wRoad,wProvince,wDistrict,wSubdistrict,wPhone,wFax,purposeType,documentId,documenthHome,documentLegalEntity,documentSignature,documentSJ4,documentOther,documentName) VALUES ('"
    //             + arrObj.formId + "', "+ "'" + arrObj.date + "', " + "'" + arrObj.formType + "', "+ "'" + arrObj.place + "', "+ "'" + arrObj.typeUser + "', "+ "'" + arrObj.name + "', "
    //             + arrObj.age + ", "+ "'" + arrObj.nationality + "', "+ "'" + arrObj.race + "', "+ "'" + arrObj.homeId + "', "+ arrObj.moo + ", "+ "'" + arrObj.trxk + "', "+ "'" 
    //             + arrObj.sxy + "', "+ "'" + arrObj.building + "', "+ "'" + arrObj.road + "', "+ "'" + arrObj.province + "', "+ "'" + arrObj.district + "', "+ "'" + arrObj.subdistrict + "', "
    //             + "'" + arrObj.phone + "', "+ "'" + arrObj.fax + "', "+ "'" + arrObj.workplaceName + "', "+ arrObj.area + ", "+ arrObj.numPeople + ", "+ "'" + arrObj.wHomeId + "', "+ arrObj.wMoo + ", "
    //             + "'" + arrObj.wTrxk + "', "+ "'" + arrObj.wSxy + "', "+ "'" + arrObj.wBuilding + "', "+ "'" + arrObj.wRoad + "', "+ "'" + arrObj.wProvince + "', "+ "'" + arrObj.wDistrict + "', "
    //             + "'" + arrObj.wSubdistrict + "', "+ "'" + arrObj.wPhone + "', "+ "'" + arrObj.wFax + "', "+ "'" + arrObj.purposeType + "', "+ arrObj.documentId + ", "+ arrObj.documenthHome + ", "
    //             + arrObj.documentLegalEntity + ", "+ arrObj.documentSignature + ", "+ arrObj.documentSJ4 + ", "+ arrObj.documentOther + ", "+ "'" + arrObj.documentName+ "')";
    //             con.query(sql, function (err, result) {
    //                 if (err) throw err;
    //                 console.log("1 record inserted");
    //                 return resolve(true);
    //             });
    //         });
    //     });
    // }
    // get() {
    //     return new Promise((resolve, reject) => {
    //         con.query('SELECT * FROM form', function (err, rows) {
    //             if (err) {
    //                 throw err;
    //             }
                
    //             return resolve(rows);
    //         });
    //     });
    // }
    getProvince(){
        return new Promise((resolve, reject) => {
            con.query('SELECT * FROM province', function (err, rows) {
                if (err) {
                    throw err;
                }
                
                return resolve(rows);
            });
        }); 
    }
    getAmphur(){
        return new Promise((resolve, reject) => {
            con.query('SELECT * FROM amphur', function (err, rows) {
                if (err) {
                    throw err;
                }
                
                return resolve(rows);
            });
        }); 
    }
    getDistrict(){
        return new Promise((resolve, reject) => {
            con.query('SELECT * FROM district', function (err, rows) {
                if (err) {
                    throw err;
                }
                
                return resolve(rows);
            });
        }); 
    }
    // getAmphur(province_id){
    //     return new Promise((resolve, reject) => {
    //         con.query('SELECT * FROM amphur WHERE PROVINCE_ID = '+province_id, function (err, rows) {
    //             if (err) {
    //                 throw err;
    //             }
    //             return resolve(rows);
    //         });
    //     }); 
    // }

    // getDistrict(province_id,amphur_id){
    //     return new Promise((resolve, reject) => {
    //         con.query('SELECT * FROM district WHERE PROVINCE_ID = '+province_id+' AND AMPHUR_ID = '+amphur_id, function (err, rows) {
    //             if (err) {
    //                 throw err;
    //             }
    //             return resolve(rows);
    //         });
    //     }); 
    // }
    // update(arrObj){
    //     return new Promise((resolve, reject) => {
    //     con.connect(function(err) {
    //         if (err) throw err;
    //         var sql = "DELETE FROM form WHERE formId = '"+arrObj.formId+"'";
    //         con.query(sql, function (err, result) {
    //           if (err) throw err;
    //           console.log("Number of records deleted: " + result.affectedRows);
    //           var sql = "INSERT INTO form (formId, date,formType,place,typeUser,name,age,nationality,race,homeId,moo,trxk,sxy,building,road,province,district,subdistrict,phone,fax,workplaceName,area,numPeople,wHomeId,wMoo,wTrxk,wSxy,wBuilding,wRoad,wProvince,wDistrict,wSubdistrict,wPhone,wFax,purposeType,documentId,documenthHome,documentLegalEntity,documentSignature,documentSJ4,documentOther,documentName) VALUES ('"
    //           + arrObj.formId + "', "+ "'" + arrObj.date + "', " + "'" + arrObj.formType + "', "+ "'" + arrObj.place + "', "+ "'" + arrObj.typeUser + "', "+ "'" + arrObj.name + "', "
    //           + arrObj.age + ", "+ "'" + arrObj.nationality + "', "+ "'" + arrObj.race + "', "+ "'" + arrObj.homeId + "', "+ arrObj.moo + ", "+ "'" + arrObj.trxk + "', "+ "'" 
    //           + arrObj.sxy + "', "+ "'" + arrObj.building + "', "+ "'" + arrObj.road + "', "+ "'" + arrObj.province + "', "+ "'" + arrObj.district + "', "+ "'" + arrObj.subdistrict + "', "
    //           + "'" + arrObj.phone + "', "+ "'" + arrObj.fax + "', "+ "'" + arrObj.workplaceName + "', "+ arrObj.area + ", "+ arrObj.numPeople + ", "+ "'" + arrObj.wHomeId + "', "+ arrObj.wMoo + ", "
    //           + "'" + arrObj.wTrxk + "', "+ "'" + arrObj.wSxy + "', "+ "'" + arrObj.wBuilding + "', "+ "'" + arrObj.wRoad + "', "+ "'" + arrObj.wProvince + "', "+ "'" + arrObj.wDistrict + "', "
    //           + "'" + arrObj.wSubdistrict + "', "+ "'" + arrObj.wPhone + "', "+ "'" + arrObj.wFax + "', "+ "'" + arrObj.purposeType + "', "+ arrObj.documentId + ", "+ arrObj.documenthHome + ", "
    //           + arrObj.documentLegalEntity + ", "+ arrObj.documentSignature + ", "+ arrObj.documentSJ4 + ", "+ arrObj.documentOther + ", "+ "'" + arrObj.documentName+ "')";
    //             con.query(sql, function (err, result) {
    //                 if (err) throw err;
    //                 console.log("1 record inserted");
    //                 return resolve(true);
    //             });
    //         });
    //       });
    //     });
    // }
}
module.exports = WebDAO;