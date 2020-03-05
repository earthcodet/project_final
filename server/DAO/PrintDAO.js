var mysql = require('mysql');
var con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'web_database',
    timeout: 0
});
con.timeout = 0;
class PrintDAO {
    getViewImage(id, year) {
        return new Promise((resolve, reject) => {
            let query = `SELECT `
            query = query + `request_type.REQUEST_TYPE_NAME,`
            query = query + `request.REQUEST_IMAGE_NAME,`
            query = query + `request.REQUEST_TOTAL_IMAGE,`
            query = query + `personal.PERSONAL_TITLE,`
            query = query + `personal.PERSONAL_TYPE,`
            query = query + `personal.PERSONAL_NAME,`
            query = query + `personal.PERSONAL_SURNAME,`
            query = query + `address.ADDRESS_HOME_NUMBER,`
            query = query + `address.ADDRESS_MOO,`
            query = query + `address.ADDRESS_TRXK,`
            query = query + `address.ADDRESS_SXY,`
            query = query + `address.ADDRESS_BUILDING,`
            query = query + `address.ADDRESS_ROAD,`
            query = query + `address.DISTRICT_NAME,`
            query = query + `address.AMPHUR_NAME,`
            query = query + `address.PROVINCE_NAME`
            query = query + ` FROM`
            query = query + ` request `
            query = query + `JOIN personal ON request.PERSONAL_ID_OWNER = personal.PERSONAL_ID`
            query = query + ` JOIN address ON personal.ADDRESS_ID = address.ADDRESS_ID`
            query = query + ` JOIN request_type ON request.REQUEST_TYPE_ID = request_type.REQUEST_TYPE_ID`
            query = query + ` WHERE request.REQUEST_NO = '${id}' AND request.REQUEST_YEAR = '${year}'`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err)
                    return resolve(err)
                }
                return resolve(result)
            })
        })
    }
}
module.exports = PrintDAO