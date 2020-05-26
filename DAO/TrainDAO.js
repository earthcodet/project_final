var mysql = require('mysql');
var con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'web_database',
    timeout: 0
});
//con.timeout = 0;
class TrainDAO {
    getTrianDuplication(train){
        return new Promise((resolve, reject) =>{
            con.query(`SELECT * FROM train WHERE TRAIN_ISSUED='${train.issuse}' AND TRAIN_DATE_EXP='${train.date_exp}' AND TRAIN_DATE_ISSUED = '${train.date_issued}'`, function (err,result){
                if(err) {
                    throw err
                }
                return resolve(result)
            })
        })
    }
    getTrian(train_id){
        return new Promise((resolve, reject) =>{
            con.query(`SELECT * FROM train WHERE TRAIN_ID='${train_id}'`, function (err,result){
                if(err) {
                    throw err
                }
                return resolve(result)
            })
        })
    }
    getMaxIdTrian() {
        return new Promise((resolve, reject) => {
            let query = `SELECT MAX(TRAIN_ID) As 'maxId' FROM train`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err.code)
                }
                return resolve(result)
            })
        })
    }
    insertTrian(train){
        return new Promise((resolve, reject) => {
            let column = 'TRAIN_ID, TRAIN_ISSUED, TRAIN_DATE_EXP, TRAIN_DATE_ISSUED'
            let query = `INSERT INTO train(${column}) VALUES (?)`
            let list_value =  [
                train.id,
                train.issuse,
                train.date_exp, 
                train.date_issued
            ]
            con.query(query,[list_value], function (err, result) {
                if (err) {
                    console.log(err.code)
                }
                return resolve(`true`)
            })
        })
    }
    updateTrian(train){
        return new Promise((resolve, reject) => {
            let query = `UPDATE train SET ? WHERE TRAIN_ID = '${train.id}'`
            let values = {
                TRAIN_ISSUED:train.date_issued, 
                RAIN_DATE_ISSUED:train.issuse,
                TRAIN_DATE_EXP:train.date_exp
            }
            con.query(query,values, function (err, result) {
                if (err) {
                    console.log(err.code)
                    return resolve(err.code)
                }
                if(result.affectedRows === 1){
                    return resolve(true)
                }else{
                    return resolve(false)
                }
            })
        })
    }
}
module.exports = TrainDAO