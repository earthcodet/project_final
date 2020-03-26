var mysql = require('mysql');
var con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'web_database',
    timeout: 0
});
//con.timeout = 0;
class PrintDAO {
    getViewImage(id, year) {
        return new Promise((resolve, reject) => {
            let query = `SELECT `
            query = query + `request_type.REQUEST_TYPE_NAME,`
            query = query + `request.REQUEST_IMAGE_NAME,`
            query = query + `request.REQUEST_TOTAL_IMAGE,`
            query = query + `request.REQUEST_MENU,`
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
            query = query + ` JOIN establishment ON establishment.ESTABLISHMENT_ID = request.ESTABLISHMENT_ID`
            query = query + ` JOIN address ON establishment.ADDRESS_ID = address.ADDRESS_ID`
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
    getViewRenew(id, year) {
        return new Promise((resolve, reject) => {
            let query = `SELECT `
            query = query + `request.REQUEST_PRODUCT_TYPE, `
            query = query + `request.REQUEST_MENU,`
            query = query + `personal.PERSONAL_TYPE,`
            query = query + `personal.PERSONAL_TITLE, `
            query = query + `personal.PERSONAL_NAME, `
            query = query + `personal.PERSONAL_SURNAME, `
            query = query + `FLOOR( DATEDIFF( NOW(), personal.PERSONAL_BIRTHDAY ) / 365 ) As PERSONAL_AGE, `
            query = query + `PERSONAL_NATIONALITY, `
            query = query + `PERSONAL_RACE, `
            query = query + `PERSONAL_PERSONAL_ID, `
            query = query + `PERSONAL_PHONE, `
            query = query + `PERSONAL_FAX, `
            query = query + `request_type.REQUEST_TYPE_ID As RT_ID, `
            query = query + `request_type.REQUEST_TYPE_NAME, `
            query = query + `request.PERSONAL_ID_ASSISTANT, `
            query = query + `establishment.ESTABLISHMENT_AREA_SIZE, `
            query = query + `personal_address.ADDRESS_ID As PERSONAL_ADDRESS_ID, `
            query = query + `personal_address.ADDRESS_HOME_NUMBER As PERSONAL_ADDRESS_HOME_NUMBER, `
            query = query + `personal_address.ADDRESS_MOO As PERSONAL_ADDRESS_MOO, `
            query = query + `personal_address.ADDRESS_TRXK As PERSONAL_ADDRESS_TRXK, `
            query = query + `personal_address.ADDRESS_SXY As PERSONAL_ADDRESS_SXY, `
            query = query + `personal_address.ADDRESS_BUILDING As PERSONAL_ADDRESS_BUILDING, `
            query = query + `personal_address.ADDRESS_ROAD As PERSONAL_ADDRESS_ROAD, `
            query = query + `personal_address.DISTRICT_NAME As PERSONAL_DISTRICT_NAME, `
            query = query + `personal_address.AMPHUR_NAME As PERSONAL_AMPHUR_NAME, `
            query = query + `personal_address.PROVINCE_NAME As PERSONAL_ROVINCE_NAME, `
            query = query + `establishment.ESTABLISHMENT_NAME, `
            query = query + `establishment.ESTABLISHMENT_GROUND, `
            query = query + `establishment.ESTABLISHMENT_PHONE, `
            query = query + `e_address.ADDRESS_ID As E_ADDRESS_ID, `
            query = query + `e_address.ADDRESS_HOME_NUMBER As E_ADDRESS_HOME_NUMBER, `
            query = query + `e_address.ADDRESS_MOO As E_ADDRESS_MOO, `
            query = query + `e_address.ADDRESS_TRXK As E_ADDRESS_TRXK, `
            query = query + `e_address.ADDRESS_SXY As E_ADDRESS_SXY, `
            query = query + `e_address.ADDRESS_BUILDING As E_ADDRESS_BUILDING, `
            query = query + `e_address.ADDRESS_ROAD As E_ADDRESS_ROAD, `
            query = query + `e_address.DISTRICT_NAME As E_DISTRICT_NAME, `
            query = query + `e_address.AMPHUR_NAME As E_AMPHUR_NAME, `
            query = query + `e_address.PROVINCE_NAME As E_PROVINCE_NAME `
            query = query + ` FROM`
            query = query + ` request `
            query = query + ` JOIN establishment ON establishment.ESTABLISHMENT_ID = request.ESTABLISHMENT_ID`
            query = query + ` JOIN address As e_address ON establishment.ADDRESS_ID = e_address.ADDRESS_ID`
            query = query + ` JOIN personal ON personal.PERSONAL_ID = request.PERSONAL_ID_OWNER`
            query = query + ` JOIN address As personal_address ON personal_address.ADDRESS_ID = personal.ADDRESS_ID`
            query = query + ` JOIN request_type ON request_type.REQUEST_TYPE_ID = request.REQUEST_TYPE_ID `
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
    getViewAllow(id, year) {
        return new Promise((resolve, reject) => {
            let query = `SELECT `
            query = query + `request.REQUEST_PRODUCT_TYPE, `
            query = query + `request.REQUEST_NO, `
            query = query + `request.STAFF_ID_ALDERMAN, `
            query = query + `request.REQUEST_RECEIPT_FEE As R_FEE, `
            query = query + `request.REQUEST_DATE_ISSUED As DATE_ISSUED, `
            query = query + `request.REQUEST_DATE_EXPIRED As DATE_EXP, `
            query = query + `request.REQUEST_CONDITION_NO_1 As R_C_1, `
            query = query + `request.REQUEST_CONDITION_NO_2 As R_C_2, `
            query = query + `request.REQUEST_CONDITION_NO_3 As R_C_3, `
            query = query + `request.REQUEST_CONDITION_NO_4 As R_C_4, `
            query = query + `request.PERSONAL_ID_OWNER As P_ID, `
            query = query + `request.PERSONAL_ID_ASSISTANT As PA_ID, `
            query = query + `request.REQUEST_DATE_SUBMISSION As DATE_SUM, `
            query = query + `request.REQUEST_YEAR, `
            query = query + `request.REQUEST_MENU,`
            query = query + `personal.PERSONAL_TYPE,`
            query = query + `personal.PERSONAL_TITLE, `
            query = query + `personal.PERSONAL_NAME, `
            query = query + `personal.PERSONAL_SURNAME, `
            query = query + `FLOOR( DATEDIFF( NOW(), personal.PERSONAL_BIRTHDAY ) / 365 ) As PERSONAL_AGE, `
            query = query + `PERSONAL_NATIONALITY, `
            query = query + `PERSONAL_RACE, `
            query = query + `PERSONAL_PERSONAL_ID, `
            query = query + `PERSONAL_PHONE, `
            query = query + `PERSONAL_FAX, `
            query = query + `request_type.REQUEST_TYPE_NAME, `
            query = query + `request.PERSONAL_ID_ASSISTANT, `
            query = query + `establishment.ESTABLISHMENT_AREA_SIZE, `
            query = query + `establishment.ESTABLISHMENT_MACHINE_SIZE, `
            query = query + `establishment.ESTABLISHMENT_WORKER, `
            
            query = query + `personal_address.ADDRESS_ID As PERSONAL_ADDRESS_ID, `
            query = query + `personal_address.ADDRESS_HOME_NUMBER As PERSONAL_ADDRESS_HOME_NUMBER, `
            query = query + `personal_address.ADDRESS_MOO As PERSONAL_ADDRESS_MOO, `
            query = query + `personal_address.ADDRESS_TRXK As PERSONAL_ADDRESS_TRXK, `
            query = query + `personal_address.ADDRESS_SXY As PERSONAL_ADDRESS_SXY, `
            query = query + `personal_address.ADDRESS_BUILDING As PERSONAL_ADDRESS_BUILDING, `
            query = query + `personal_address.ADDRESS_ROAD As PERSONAL_ADDRESS_ROAD, `
            query = query + `personal_address.DISTRICT_NAME As PERSONAL_DISTRICT_NAME, `
            query = query + `personal_address.AMPHUR_NAME As PERSONAL_AMPHUR_NAME, `
            query = query + `personal_address.PROVINCE_NAME As PERSONAL_ROVINCE_NAME, `
            query = query + `establishment.ESTABLISHMENT_NAME, `
            query = query + `establishment.ESTABLISHMENT_GROUND, `
            query = query + `establishment.ESTABLISHMENT_PHONE, `
            query = query + `establishment.ESTABLISHMENT_FAX, `
            query = query + `e_address.ADDRESS_ID As E_ADDRESS_ID, `
            query = query + `e_address.ADDRESS_HOME_NUMBER As E_ADDRESS_HOME_NUMBER, `
            query = query + `e_address.ADDRESS_MOO As E_ADDRESS_MOO, `
            query = query + `e_address.ADDRESS_TRXK As E_ADDRESS_TRXK, `
            query = query + `e_address.ADDRESS_SXY As E_ADDRESS_SXY, `
            query = query + `e_address.ADDRESS_BUILDING As E_ADDRESS_BUILDING, `
            query = query + `e_address.ADDRESS_ROAD As E_ADDRESS_ROAD, `
            query = query + `e_address.DISTRICT_NAME As E_DISTRICT_NAME, `
            query = query + `e_address.AMPHUR_NAME As E_AMPHUR_NAME, `

            query = query + `money_user.USER_TITLE As M_TITLE, `
            query = query + `money_user.USER_NAME As M_NAME, `
            query = query + `money_user.USER_SURNAME As M_SURNAME, `

            query = query + `alder_man.USER_TITLE As A_TITLE, `
            query = query + `alder_man.USER_NAME As A_NAME, `
            query = query + `alder_man.USER_SURNAME As A_SURNAME, `
            query = query + `alder_man.USER_POSITION As A_POSITION, `

            query = query + `e_address.PROVINCE_NAME As E_PROVINCE_NAME `
            query = query + ` FROM`
            query = query + ` request `
            query = query + ` JOIN user As money_user ON money_user.USER_ID  = request.STAFF_ID_MONEY`
            query = query + ` JOIN user As alder_man ON alder_man.USER_ID  = request.STAFF_ID_ALDERMAN`
            query = query + ` JOIN establishment ON establishment.ESTABLISHMENT_ID = request.ESTABLISHMENT_ID`
            query = query + ` JOIN address As e_address ON establishment.ADDRESS_ID = e_address.ADDRESS_ID`
            query = query + ` JOIN personal ON personal.PERSONAL_ID = request.PERSONAL_ID_OWNER`
            query = query + ` JOIN address As personal_address ON personal_address.ADDRESS_ID = personal.ADDRESS_ID`
            query = query + ` JOIN request_type ON request_type.REQUEST_TYPE_ID = request.REQUEST_TYPE_ID `
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
    getViewReport(id_type , date_start, date_end){
        return new Promise((resolve, reject) => {
            let query = `SELECT `
            query = query + `p_data.PERSONAL_TITLE As P_TITLE,`
            query = query + `p_data.PERSONAL_NAME As P_NAME,`
            query = query + `p_data.PERSONAL_SURNAME As P_SURNAME,`
            query = query + `r_data.REQUEST_DATE_ISSUED As R_ISSUED,`
            query = query + `r_data.REQUEST_DATE_EXPIRED As R_EXPIRED,`
            query = query + `rt_data.REQUEST_TYPE_NAME As RT_NAME,`
            query = query + `r_data.REQUEST_RECEIPT_TOTAL  As R_TO_Y1,`
            query = query + `r_data.REQUEST_RECEIPT_TOTAL_YEAR_2  As R_TO_Y2,`
            query = query + `r_data.REQUEST_RECEIPT_TOTAL_YEAR_3  As R_TO_Y3,`
            query = query + `e_data.ESTABLISHMENT_NAME As E_NAME,`
            query = query + `a_data.ADDRESS_HOME_NUMBER As A_HOME,`
            query = query + `a_data.ADDRESS_MOO As A_MOO,`
            query = query + `a_data.ADDRESS_SXY As A_SXY,`
            query = query + `a_data.ADDRESS_ROAD As A_ROAD,`
            query = query + `a_data.DISTRICT_NAME As A_DISTRICT,`
            query = query + `a_data.AMPHUR_NAME As A_AMPHUR,`
            query = query + `a_data.PROVINCE_NAME As A_PROVINCE,`
            query = query + `e_data.ESTABLISHMENT_PHONE As E_PHONE `
            query = query + `FROM `
            query = query + `request As r_data `
            query = query + `JOIN establishment As e_data ON e_data.ESTABLISHMENT_ID = r_data.ESTABLISHMENT_ID `
            query = query + `JOIN address As a_data ON a_data.ADDRESS_ID = e_data.ADDRESS_ID `
            query = query + `JOIN request_type As rt_data On rt_data.REQUEST_TYPE_ID = r_data.REQUEST_TYPE_ID `
            query = query + `JOIN personal As p_data ON p_data.PERSONAL_ID = r_data.PERSONAL_ID_OWNER `
            query = query + `WHERE `
            query = query + `rt_data.REQUEST_TYPE_ID  = ${id_type} AND `
            query = query + `r_data.REQUEST_DATE_EXPIRED BETWEEN `
            query = query + `'${date_start}' AND '${date_end}'`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err)
                    return resolve(err)
                }
                return resolve(result)
            })
        })
    }
    getReport(m , y){
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM report WHERE REPORT_MONTH = ${m} AND REPORT_YEAR =${y}`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err)
                    return resolve(err)
                }
                return resolve(result)
            })
        })
    }
    getReportT(m , y){
        return new Promise((resolve, reject) => {
            let query = `SELECT REPORT_E_OT,REPORT_E_M FROM report WHERE REPORT_MONTH = ${m} AND REPORT_YEAR =${y}`
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