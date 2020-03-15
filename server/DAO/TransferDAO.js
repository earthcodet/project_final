var mysql = require('mysql')
var con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: "web_database",
    timeout: 0
})
class TransferDAO {
    insertTranfer(tranfer) {
        tranfer.available = 'Y'
        tranfer.table_is_default = 'Y'
        return new Promise((resolve, reject) => {
            //TRANSFER_ID
            let column =      `REQUEST_NO,  REQUEST_YEAR, `
            column = column + `PERSONAL_ID, TRANSFER_DATE_EXP, `
            column = column + `REQUEST_NO_OLD, REQUEST_YEAR_OLD, `
            column = column + `TRANSFER_IS_DEFAULT, TRANSFER_AVAILABLE, `
            column = column + `TRANSFER_DATE, TRANSFER_USER_UPDATE,TRANSFER_LAST_UPDATE,REQUEST_OWNER`

            let values =`'${tranfer.request_id}','${tranfer.request_year}', `
            values = values + `'${tranfer.personal_id}',${tranfer.date_exp}, `
            values = values + `'${tranfer.request_no_old}', '${tranfer.request_year_old}', `
            values = values + `'${tranfer.table_is_default}','${tranfer.available}', `
            values = values + `'${tranfer.date}','${tranfer.user_update}','${tranfer.last_update}', '${tranfer.request_owner}'`

            let query = `INSERT INTO transfer(${column}) VALUES (${values})`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err)
                    return resolve(err.code)
                }
                return resolve(true)
            })
        })
    }
    updateDefaultTranfer(no,year){
        return new Promise((resolve, reject) => {
            let query = `UPDATE transfer SET TRANSFER_IS_DEFAULT = 'N' WHERE REQUEST_NO_OLD = '${no}' AND REQUEST_YEAR_OLD = '${year}'`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err)
                    return resolve(err.code)
                }
                return resolve(true)
            })
        })
    }
    getOldId(no,year){
        return new Promise((resolve, reject) => {
            let query = `SELECT REQUEST_NO_OLD,REQUEST_YEAR_OLD,REQUEST_OWNER FROM transfer WHERE REQUEST_NO = '${no}' AND  REQUEST_YEAR = '${year}' AND TRANSFER_AVAILABLE = 'Y'`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err)
                    return resolve(err.code)
                }
                return resolve(result)
            })
        })
    }
    getOwnerDuplication(no,year,p_id){
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM transfer WHERE REQUEST_NO = '${no}' AND  REQUEST_YEAR = '${year}' AND TRANSFER_AVAILABLE = 'Y' AND (PERSONAL_ID='${p_id}' OR REQUEST_OWNER='${p_id}')`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err)
                    return resolve(err.code)
                }
                if(result.length != 0){
                    //มีคนซ้ำ
                    return resolve(true)
                }else{
                    //มีไม่มีคนซื้อ
                    return resolve(false)
                }
            })
        })
    }
}
module.exports = TransferDAO