var mysql = require('mysql');
var con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'database'
});
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