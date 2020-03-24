var mysql = require('mysql')
var con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: "web_database",
    timeout: 0
})
//con.timeout = 0;
class RequestDAO {
    getMaxId(type, year) {
        return new Promise((resolve, reject) => {
            let query = `SELECT MAX(REQUEST_NO) As 'maxId' FROM request WHERE REQUEST_NO LIKE '%${type}%' AND REQUEST_YEAR ='${year}'`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err.code)
                }
                return resolve(result)
            })
        })
    }
    insert(request) {
        request.status = 'wait'
        request.status_before = 'wait'
        request.is_deleted = 'N'
        console.log(request.date_issued)
        return new Promise((resolve, reject) => {
            let column = `REQUEST_NO, REQUEST_YEAR, PERSONAL_ID_OWNER, REQUEST_TYPE_ID, STAFF_ID_ALDERMAN, ESTABLISHMENT_ID, `
            column = column + `STAFF_ID_MONEY, REFERENCE_ID, TRAIN_ID, PERSONAL_ID_ASSISTANT, STAFF_ID_APPROVE, ESTABLISHMENT_IS_LAND_OWNED,ESTABLISHMENT_ADDRESS_ID , REQUEST_MENU, `
            column = column + `REQUEST_DATE_SUBMISSION, REQUEST_DATE_APPROVE, REQUEST_DOC_NO1, REQUEST_DOC_NO2, REQUEST_DOC_NO3, `
            column = column + `REQUEST_DOC_NO4, REQUEST_DOC_NO5, REQUEST_DOC_NO6, REQUEST_SUBCATEGORY, REQUEST_PRODUCT_TYPE,`
            column = column + `REQUEST_SELL_START, REQUEST_SELL_END, REQUEST_SELL_ALLOW, `
            column = column + `REQUEST_DATE_ISSUED, REQUEST_DATE_EXPIRED, `
            column = column + `REQUEST_CONDITION_NO_1, REQUEST_CONDITION_NO_2, REQUEST_CONDITION_NO_3, REQUEST_CONDITION_NO_4, `
            column = column + `REQUEST_IMAGE_NAME, REQUEST_TOTAL_IMAGE, REQUEST_STATUS, REQUEST_DELETE_LOGIC, REQUEST_IS_DELETED, `
            column = column + `REQUEST_LAST_UPDATE, REQUEST_USER_UPDATE ,REQUEST_STATUS_BEFORE`
            let query = `INSERT INTO request(${column}) VALUES (?)`

            let list_value = [
                request.no,
                request.year,
                request.personal_id_owner,
                request.request_type_id,
                request.staff_id_alderman,
                request.establishment_id,
                request.staff_id_money,
                request.reference_id,
                request.train_id,
                request.personal_id_assistant,
                request.staff_id_approve,
                request.establishment_is_land_owned,
                request.establishment_address_id,
                request.menu,
                request.date_submission,
                request.date_approve,
                request.doc_no1,
                request.doc_no2,
                request.doc_no3,
                request.doc_no4,
                request.doc_no5,
                request.doc_no6,
                request.subcategory,
                request.product_type,
                request.sell_start,
                request.sell_end,
                request.sell_allow,
                request.date_issued,
                request.date_expired,
                request.condition_no_1,
                request.condition_no_2,
                request.condition_no_3,
                request.condition_no_4,
                request.image_name,
                request.total_image,
                request.status,
                request.delete_logic,
                request.is_deleted,
                request.last_update,
                request.user_update,
                request.status_before
            ]
            con.query(query, [list_value], function (err, result) {
                if (err) {
                    console.log(err)
                    return resolve(err.code)
                }
                return resolve(`true`)
            })
        })
    }
    insertRenew(request) {
        request.status = 'active'
        request.status_before = 'active'
        request.is_deleted = 'N'
        return new Promise((resolve, reject) => {
            let column = `REQUEST_NO, REQUEST_YEAR, PERSONAL_ID_OWNER, REQUEST_TYPE_ID, STAFF_ID_ALDERMAN, ESTABLISHMENT_ID, `
            column = column + `STAFF_ID_MONEY, REFERENCE_ID, TRAIN_ID, PERSONAL_ID_ASSISTANT, STAFF_ID_APPROVE, ESTABLISHMENT_IS_LAND_OWNED,ESTABLISHMENT_ADDRESS_ID , REQUEST_MENU, `
            column = column + `REQUEST_DATE_SUBMISSION, REQUEST_DATE_APPROVE, REQUEST_DOC_NO1, REQUEST_DOC_NO2, REQUEST_DOC_NO3, `
            column = column + `REQUEST_DOC_NO4, REQUEST_DOC_NO5, REQUEST_DOC_NO6, REQUEST_SUBCATEGORY, REQUEST_PRODUCT_TYPE,`
            column = column + `REQUEST_SELL_START, REQUEST_SELL_END, REQUEST_SELL_ALLOW, `
            column = column + `REQUEST_DATE_ISSUED, REQUEST_DATE_EXPIRED, `
            column = column + `REQUEST_CONDITION_NO_1, REQUEST_CONDITION_NO_2, REQUEST_CONDITION_NO_3, REQUEST_CONDITION_NO_4, `
            column = column + `REQUEST_IMAGE_NAME, REQUEST_TOTAL_IMAGE, REQUEST_STATUS, REQUEST_DELETE_LOGIC, REQUEST_IS_DELETED, `
            column = column + `REQUEST_LAST_UPDATE, REQUEST_USER_UPDATE ,REQUEST_STATUS_BEFORE,`
            column = column + `REQUEST_RECEIPT_FINE, REQUEST_RECEIPT_FEE, REQUEST_RECEIPT_DATE`
            let list_value = [
                request.no,
                request.year,
                request.personal_id_owner,
                request.request_type_id,
                request.staff_id_alderman,
                request.establishment_id,
                request.staff_id_money,
                request.reference_id,
                request.train_id,
                request.personal_id_assistant,
                request.staff_id_approve,
                request.establishment_is_land_owned,
                request.establishment_address_id,
                request.menu,
                request.date_submission,
                request.date_approve,
                request.doc_no1,
                request.doc_no2,
                request.doc_no3,
                request.doc_no4,
                request.doc_no5,
                request.doc_no6,
                request.subcategory,
                request.product_type,
                request.sell_start,
                request.sell_end,
                request.sell_allow,
                request.date_issued,
                request.date_expired,
                request.condition_no_1,
                request.condition_no_2,
                request.condition_no_3,
                request.condition_no_4,
                request.image_name,
                request.total_image,
                request.status,
                null,
                request.is_deleted,
                request.last_update,
                request.user_update + '',
                request.status_before,
                request.receipt_fine,
                request.receipt_fee,
                request.receipt_date
            ]

            let query = `INSERT INTO request(${column}) VALUES (?)`
            con.query(query, [list_value], function (err, result) {
                if (err) {
                    console.log(err)
                    return resolve(err.code)
                }
                return resolve(`true`)
            })
        })
    }
    insertDuplication(request) {
        console.log(request.date_issued)
        return new Promise((resolve, reject) => {
            let column = ''
            column = column + `REQUEST_NO, REQUEST_YEAR, PERSONAL_ID_OWNER, REQUEST_TYPE_ID,`
            column = column + `STAFF_ID_ALDERMAN, ESTABLISHMENT_ID,STAFF_ID_MONEY, REFERENCE_ID,`
            column = column + `TRAIN_ID, PERSONAL_ID_ASSISTANT,STAFF_ID_APPROVE, ESTABLISHMENT_ADDRESS_ID,`
            column = column + `ESTABLISHMENT_IS_LAND_OWNED, REQUEST_MENU,REQUEST_DATE_SUBMISSION, REQUEST_DATE_APPROVE,`
            column = column + `REQUEST_DOC_NO1, REQUEST_DOC_NO2,REQUEST_DOC_NO3, REQUEST_DOC_NO4,`
            column = column + `REQUEST_DOC_NO5, REQUEST_DOC_NO6,REQUEST_SUBCATEGORY, REQUEST_PRODUCT_TYPE,`
            column = column + `REQUEST_SELL_START , REQUEST_SELL_END, REQUEST_SELL_ALLOW,`
            column = column + `REQUEST_RECEIPT_FINE,REQUEST_RECEIPT_FEE, REQUEST_RECEIPT_TOTAL,`
            column = column + `REQUEST_RECEIPT_DATE,`
            column = column + `REQUEST_RECEIPT_FINE_YEAR_2, REQUEST_RECEIPT_FEE_YEAR_2, REQUEST_RECEIPT_TOTAL_YEAR_2,`
            column = column + `REQUEST_RECEIPT_DATE_YEAR_2,`
            column = column + `REQUEST_RECEIPT_FINE_YEAR_3, REQUEST_RECEIPT_FEE_YEAR_3, REQUEST_RECEIPT_TOTAL_YEAR_3,`
            column = column + `REQUEST_RECEIPT_DATE_YEAR_3, REQUEST_DATE_ISSUED, REQUEST_DATE_EXPIRED,`
            column = column + `REQUEST_CONDITION_NO_1,  REQUEST_CONDITION_NO_2,  REQUEST_CONDITION_NO_3,`
            column = column + `REQUEST_CONDITION_NO_4, REQUEST_IMAGE_NAME, REQUEST_TOTAL_IMAGE,`
            column = column + `REQUEST_STATUS, REQUEST_DELETE_LOGIC, REQUEST_IS_DELETED, REQUEST_STATUS_BEFORE,`
            column = column + `REQUEST_LAST_UPDATE, REQUEST_USER_UPDATE , REQUEST_RECEIPT_FINE_TRANSFER ,REQUEST_RECEIPT_DATE_TRANSFER`

            let values = [
                request.REQUEST_NO,
                request.REQUEST_YEAR,
                request.PERSONAL_ID_OWNER,
                request.REQUEST_TYPE_ID,
                request.STAFF_ID_ALDERMAN,
                request.ESTABLISHMENT_ID,
                request.STAFF_ID_MONEY,
                request.REFERENCE_ID,
                request.TRAIN_ID,
                request.PERSONAL_ID_ASSISTANT,
                request.STAFF_ID_APPROVE,
                request.ESTABLISHMENT_ADDRESS_ID,
                request.ESTABLISHMENT_IS_LAND_OWNED,
                request.REQUEST_MENU,
                request.REQUEST_DATE_SUBMISSION,
                request.REQUEST_DATE_APPROVE,
                request.REQUEST_DOC_NO1,
                request.REQUEST_DOC_NO2,
                request.REQUEST_DOC_NO3,
                request.REQUEST_DOC_NO4,
                request.REQUEST_DOC_NO5,
                request.REQUEST_DOC_NO6,
                request.REQUEST_SUBCATEGORY,
                request.REQUEST_PRODUCT_TYPE,
                request.REQUEST_SELL_START,
                request.REQUEST_SELL_END,
                request.REQUEST_SELL_ALLOW,
                request.REQUEST_RECEIPT_FINE,
                request.REQUEST_RECEIPT_FEE,
                request.REQUEST_RECEIPT_TOTAL,
                request.REQUEST_RECEIPT_DATE,
                request.REQUEST_RECEIPT_FINE_YEAR_2,
                request.REQUEST_RECEIPT_FEE_YEAR_2,
                request.REQUEST_RECEIPT_TOTAL_YEAR_2,
                request.REQUEST_RECEIPT_DATE_YEAR_2,
                request.REQUEST_RECEIPT_FINE_YEAR_3,
                request.REQUEST_RECEIPT_FEE_YEAR_3,
                request.REQUEST_RECEIPT_TOTAL_YEAR_3,
                request.REQUEST_RECEIPT_DATE_YEAR_3,
                request.REQUEST_DATE_ISSUED,
                request.REQUEST_DATE_EXPIRED,
                request.REQUEST_CONDITION_NO_1,
                request.REQUEST_CONDITION_NO_2,
                request.REQUEST_CONDITION_NO_3,
                request.REQUEST_CONDITION_NO_4,
                request.REQUEST_IMAGE_NAME,
                request.REQUEST_TOTAL_IMAGE,
                request.REQUEST_STATUS,
                request.REQUEST_DELETE_LOGIC,
                request.REQUEST_IS_DELETED,
                request.REQUEST_STATUS_BEFORE,
                request.REQUEST_LAST_UPDATE,
                request.REQUEST_USER_UPDATE,
                request.REQUEST_RECEIPT_FINE_TRANSFER,
                request.REQUEST_RECEIPT_DATE_TRANSFER
            ]
            let query = `INSERT INTO request(${column}) VALUES (?)`
            con.query(query, [values], function (err, result) {
                if (err) {
                    console.log(err)
                    return resolve(err.code)
                }
                return resolve(`true`)
            })
        })
    }
    getRequestById(id, year) {
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM request WHERE REQUEST_NO='${id}' AND REQUEST_YEAR='${year}'`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err.code)
                    return resolve(err.code)
                }
                return resolve(result[0])
            })
        })
    }
    getCountRequestExp30Day() {
        return new Promise((resolve, reject) => {
            let query = `SELECT COUNT(REQUEST_NO) As RE_EXP FROM request WHERE DATEDIFF(request.REQUEST_DATE_EXPIRED, NOW()) <= 30 AND DATEDIFF(request.REQUEST_DATE_EXPIRED, NOW()) > -1 AND REQUEST_STATUS = 'active'`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err.code)
                    return resolve(err.code)
                }
                return resolve(result[0])
            })
        })
    }
    getCountRequestExpTable(status, more) {
        return new Promise((resolve, reject) => {
            let column = `request.REQUEST_NO As R_NO, `
            column = column + `request.REQUEST_YEAR As R_YEAR, `
            column = column + `request.REQUEST_MENU, `
            column = column + `request_type.REQUEST_TYPE_NAME, `
            column = column + `personal.PERSONAL_TITLE, `
            column = column + `personal.PERSONAL_NAME, `
            column = column + `personal.PERSONAL_SURNAME, `
            column = column + `request.REQUEST_DATE_ISSUED As DATE_ISSUED, `
            column = column + `DATEDIFF(request.REQUEST_DATE_EXPIRED, NOW()) As COUNT_DATE_EXPIRE, `

            column = column + `request.REQUEST_DATE_EXPIRED As DATE_EXP `

            let joinTable = `JOIN request_type ON request_type.REQUEST_TYPE_ID = request.REQUEST_TYPE_ID `
            joinTable = joinTable + `JOIN personal ON personal.PERSONAL_ID = request.PERSONAL_ID_OWNER `
            let conditiion = ``
            if (status === 30) {
                conditiion = `DATEDIFF(request.REQUEST_DATE_EXPIRED, NOW()) <= ${status} AND DATEDIFF(request.REQUEST_DATE_EXPIRED, NOW()) >= 0 AND REQUEST_STATUS = 'active'`
            }
            if (status === 90) {
                conditiion = `DATEDIFF(request.REQUEST_DATE_EXPIRED, NOW()) > -90 AND DATEDIFF(request.REQUEST_DATE_EXPIRED, NOW()) < -30 AND REQUEST_STATUS = 'expire'`
            }
            if (more === true) {
                conditiion = `DATEDIFF(request.REQUEST_DATE_EXPIRED, NOW()) < -90 AND REQUEST_STATUS = 'expire'`
            }
            let query = `SELECT ${column} FROM request ${joinTable} WHERE ${conditiion}`
            console.log(query)
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err)
                    return resolve(err.code)
                }
                return resolve(result)
            })
        })
    }
    getRequestByReNew(type, personal_id) {
        return new Promise((resolve, reject) => {
            let joinTable = `JOIN establishment ON request.ESTABLISHMENT_ID = establishment.ESTABLISHMENT_ID `
            joinTable = joinTable + `JOIN request_type ON request.REQUEST_TYPE_ID = request_type.REQUEST_TYPE_ID `
            joinTable = joinTable + `JOIN address ON address.ADDRESS_ID = establishment.ADDRESS_ID `
            let query = `SELECT * FROM request ${joinTable} WHERE request.PERSONAL_ID_OWNER='${personal_id}' AND request.REQUEST_MENU='${type}' AND request.REQUEST_STATUS = 'active' AND request.REQUEST_IS_DELETED = 'N' AND DATEDIFF(request.REQUEST_DATE_EXPIRED,NOW()) <=90`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err.code)
                    return resolve(err.code)
                }
                return resolve(result)
            })
        })
    }
    getRequestAndPersonal(r_no, r_year) {
        return new Promise((resolve, reject) => {
            let joinTable = `JOIN personal ON personal.PERSONAL_ID = request.PERSONAL_ID_OWNER `
            joinTable = joinTable + `JOIN address ON personal.ADDRESS_ID = address.ADDRESS_ID `
            joinTable = joinTable + `JOIN request_type ON request.REQUEST_TYPE_ID = request_type.REQUEST_TYPE_ID `
            let condition = `REQUEST_NO = '${r_no}' AND REQUEST_YEAR = '${r_year}' AND `
            condition = condition + `REQUEST_STATUS = 'active' `
            condition = condition + `AND (request.REQUEST_MENU = 'หนังสือรับรองการแจ้งจัดตั้งสถานที่สะสมอาหาร' `
            condition = condition + `OR request.REQUEST_MENU = 'หนังสือรับรองการแจ้งจัดตั้งสถานที่จำหน่ายอาหาร')`
            let query = `SELECT * FROM request ${joinTable} WHERE ${condition}`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err)
                    return resolve(err.code)
                }
                return resolve(result)
            })
        })
    }
    getRequestTransfer(personal_id) {
        return new Promise((resolve, reject) => {
            let joinTable = `JOIN establishment ON request.ESTABLISHMENT_ID = establishment.ESTABLISHMENT_ID `
            joinTable = joinTable + `JOIN request_type ON request.REQUEST_TYPE_ID = request_type.REQUEST_TYPE_ID `
            joinTable = joinTable + `JOIN address ON address.ADDRESS_ID = establishment.ADDRESS_ID `
            let query = `SELECT * FROM request ${joinTable} WHERE request.PERSONAL_ID_OWNER = '${personal_id}' `
            query = query + `AND request.REQUEST_STATUS = 'active' AND request.REQUEST_IS_DELETED = 'N' `
            query = query + `AND ( request.REQUEST_MENU = 'หนังสือรับรองการแจ้งจัดตั้งสถานที่สะสมอาหาร' `
            query = query + `OR request.REQUEST_MENU = 'หนังสือรับรองการแจ้งจัดตั้งสถานที่จำหน่ายอาหาร')`
            console.log(query)
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err.code)
                    return resolve(err.code)
                }
                return resolve(result)
            })
        })
    }
    getRequestByReNewByRequestId(no, year) {
        return new Promise((resolve, reject) => {
            let joinTable = `JOIN establishment ON request.ESTABLISHMENT_ID = establishment.ESTABLISHMENT_ID `
            joinTable = joinTable + `JOIN request_type ON request.REQUEST_TYPE_ID = request_type.REQUEST_TYPE_ID `
            joinTable = joinTable + `JOIN address ON address.ADDRESS_ID = establishment.ADDRESS_ID `
            let query = `SELECT *,establishment.ESTABLISHMENT_IS_LAND_OWNED As E_DATA_LAND,establishment.ADDRESS_ID As E_DATA_ADDRESS FROM request ${joinTable} WHERE request.REQUEST_NO='${no}' AND request.REQUEST_YEAR='${year}' AND DATEDIFF(request.REQUEST_DATE_EXPIRED, NOW()) <= 90`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err)
                    return resolve(err.code)
                }
                return resolve(result)
            })
        })
    }
    getRequestByTpyeAndOwnerId(type, Owner) {
        return new Promise((resolve, reject) => {
            let query = `SELECT *,DATEDIFF(REQUEST_DATE_EXPIRED, NOW()) As  COUNT_DATE_EXPIRE FROM request JOIN establishment ON request.ESTABLISHMENT_ID = establishment.ESTABLISHMENT_ID WHERE REQUEST_STATUS='${type}' AND PERSONAL_ID_OWNER='${Owner}'`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err.code)
                    return resolve(err.code)
                }
                return resolve(result)
            })
        })
    }
    getRequestByTpyeAndOwnerIdAssistant(type, Owner) {
        return new Promise((resolve, reject) => {
            let query = `SELECT *,DATEDIFF(REQUEST_DATE_EXPIRED, NOW()) As  COUNT_DATE_EXPIRE FROM request JOIN personal ON request.PERSONAL_ID_OWNER = personal.PERSONAL_ID WHERE REQUEST_STATUS='${type}' AND PERSONAL_ID_ASSISTANT='${Owner}'`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err.code)
                    return resolve(err.code)
                }
                return resolve(result)
            })
        })
    }
    searchPangeRequest(item) {
        return new Promise((resolve, reject) => {
            let value = ``
            if (item.typeSearch === 1) {
                //personal name and personal surname
                value = value + `personal.PERSONAL_NAME LIKE "%${item.name_s}%" `
                value = value + `AND personal.PERSONAL_SURNAME LIKE "%${item.surname_s}%"`
            }
            if (item.typeSearch === 2) {
                //date sub
                value = value + `request.REQUEST_DATE_ISSUED = '${item.datepicker1}'`
            }
            if (item.typeSearch === 3) {
                //request Id
                value = value + `request.REQUEST_NO LIKE "%${item.r_no}%" `
                value = value + `AND request.REQUEST_YEAR LIKE "%${item.r_year}%" `
            }
            if (item.typeSearch === 4) {
                //personal Id
                value = value + `personal.PERSONAL_PERSONAL_ID LIKE "%${item.personal_id}%" `
            }
            if (item.typeSearch === 5) {
                //หมดอายุ
                value = value + `request.REQUEST_DATE_EXPIRED = '${item.datepicker2}' `
            }
            if (item.typeSearch === 6) {
                //ใบอนุญาต
                value = value + `request.REQUEST_MENU LIKE "%${item.type_request}%" `
            }
            if (item.typeSearch === 7) {
                //ประเภทใบอนุญาต
                value = value + `request_type.REQUEST_TYPE_NAME LIKE "%${item.type_product}%" `
            }
            if (item.typeSearch === 8) {
                //ที่อยู่
                value = value + `address.ADDRESS_HOME_NUMBER LIKE "%${item.homeId}%" `
                if (item.moo != '') {
                    value = value + `AND address.ADDRESS_MOO LIKE "%${item.moo}%" `
                }
                if (item.trxk != '') {
                    value = value + `AND address.ADDRESS_TRXK LIKE "%${item.trxk}%" `
                }
                if (item.sxy != '') {
                    value = value + `AND address.ADDRESS_SXY LIKE "%${item.sxy}%" `
                }
                if (item.bA != '') {
                    value = value + `AND address.ADDRESS_BUILDING LIKE "%${item.bA}%" `
                }
                if (item.road != '') {
                    value = value + `AND address.ADDRESS_ROAD LIKE "%${item.road}%" `
                }
                value = value + `AND address.DISTRICT_NAME LIKE "%${item.subdistrict}%" `
                value = value + `AND address.AMPHUR_NAME LIKE "%${item.district}%" `
                value = value + `AND address.PROVINCE_NAME LIKE "%${item.province}%" `
            }
            if (item.typeSearch === 9) {
                //ชื่อสถานประกอบการ
                if (item.e_name != '') {
                    value = value + `establishment.ESTABLISHMENT_NAME LIKE "%${item.e_name}%" `
                }else{
                    value = value + `1`
                } 

            }



            let column = `request.REQUEST_MENU As R_MENU, `
            column = column + `request_type.REQUEST_TYPE_NAME As R_TYPE, `
            column = column + `request.REQUEST_NO As R_NO, `
            column = column + `request.REQUEST_YEAR As R_YEAR, `

            column = column + `request.REQUEST_STATUS As R_STATUS, `
            column = column + `request.REQUEST_IS_DELETED As R_STATUS_DELETE, `

            column = column + `establishment.ESTABLISHMENT_NAME As E_NAME, `
            column = column + `personal.PERSONAL_TITLE As P_TITLE, `
            column = column + `personal.PERSONAL_NAME As P_NAME, `
            column = column + `personal.PERSONAL_SURNAME As P_SURNAME, `
            column = column + `personal.PERSONAL_PERSONAL_ID As P_ID, `

            column = column + `request.REQUEST_DATE_ISSUED, `
            column = column + `request.REQUEST_DATE_EXPIRED, `

            column = column + `address.ADDRESS_HOME_NUMBER As A_H, `
            column = column + `address.ADDRESS_MOO As A_M, `
            column = column + `address.ADDRESS_TRXK  As A_T, `
            column = column + `address.ADDRESS_SXY As A_S, `
            column = column + `address.ADDRESS_BUILDING As A_B, `
            column = column + `address.ADDRESS_ROAD  As A_R, `
            column = column + `address.DISTRICT_NAME As A_D, `
            column = column + `address.AMPHUR_NAME  As A_A, `
            column = column + `address.PROVINCE_NAME As A_P`
            let joinTable = `JOIN personal ON personal.PERSONAL_ID = request.PERSONAL_ID_OWNER `
            joinTable = joinTable + `JOIN establishment ON establishment.ESTABLISHMENT_ID  = request.ESTABLISHMENT_ID ` //e
            joinTable = joinTable + `JOIN address ON address.ADDRESS_ID = establishment.ADDRESS_ID ` //ea
            joinTable = joinTable + `JOIN request_type ON request_type.REQUEST_TYPE_ID = request.REQUEST_TYPE_ID`
            let query = `SELECT ${column} FROM request ${joinTable} WHERE ${value}`
            console.log(value)
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err.code)
                    return resolve(err.code)
                }
                return resolve(result)
            })
        })
    }

    //UPDATE personal SET ${value} WHERE PERSONAL_ID='${personal.id}'\
    update(request) {
        console.log(`-------- DATABASE -------`)
        console.log(request)
        console.log(`-------- DATABASE -------`)
        return new Promise((resolve, reject) => {
            let query = `UPDATE request SET ? WHERE REQUEST_NO='${request.no}' AND REQUEST_YEAR='${request.year}'`
                , values = {
                    PERSONAL_ID_OWNER: request.personal_id_owner,
                    REQUEST_TYPE_ID: request.request_type_id,
                    STAFF_ID_ALDERMAN: request.staff_id_alderman,
                    ESTABLISHMENT_ID: request.establishment_id,
                    STAFF_ID_MONEY: request.staff_id_money,
                    REFERENCE_ID: request.reference_id,
                    TRAIN_ID: request.train_id,
                    PERSONAL_ID_ASSISTANT: request.personal_id_assistant,
                    STAFF_ID_APPROVE: request.staff_id_approve,
                    REQUEST_MENU: request.menu,
                    REQUEST_DATE_SUBMISSION: request.date_submission,
                    REQUEST_DATE_APPROVE: request.date_approve,
                    REQUEST_DOC_NO1: request.doc_no1,
                    REQUEST_DOC_NO2: request.doc_no2,
                    REQUEST_DOC_NO3: request.doc_no3,
                    REQUEST_DOC_NO4: request.doc_no4,
                    REQUEST_DOC_NO5: request.doc_no5,
                    REQUEST_DOC_NO6: request.doc_no6,
                    REQUEST_SUBCATEGORY: request.subcategory,
                    REQUEST_PRODUCT_TYPE: request.product_type,
                    REQUEST_SELL_START: request.sell_start,
                    REQUEST_SELL_END: request.sell_end,
                    REQUEST_SELL_ALLOW: request.sell_allow,
                    REQUEST_RECEIPT_FINE: request.receipt_fine,
                    REQUEST_RECEIPT_FEE: request.receipt_fee,
                    REQUEST_RECEIPT_TOTAL: request.receipt_total,
                    REQUEST_RECEIPT_DATE: request.receipt_date,
                    REQUEST_DATE_ISSUED: request.date_issued,
                    REQUEST_DATE_EXPIRED: request.date_expired,
                    REQUEST_CONDITION_NO_1: request.condition_no_1,
                    REQUEST_CONDITION_NO_2: request.condition_no_2,
                    REQUEST_CONDITION_NO_3: request.condition_no_3,
                    REQUEST_CONDITION_NO_4: request.condition_no_4,
                    REQUEST_IMAGE_NAME: request.image_name,
                    REQUEST_TOTAL_IMAGE: request.total_image,
                    REQUEST_STATUS: request.status,
                    REQUEST_DELETE_LOGIC: request.delete_logic,
                    REQUEST_IS_DELETED: request.is_deleted,
                    REQUEST_LAST_UPDATE: request.last_update,
                    REQUEST_USER_UPDATE: request.user_update + ``,
                    REQUEST_STATUS_BEFORE: request.status_before,
                    REQUEST_STATUS: request.status,
                    ESTABLISHMENT_IS_LAND_OWNED: request.establishment_is_land_owned,
                    ESTABLISHMENT_ADDRESS_ID: request.establishment_address_id,
                    REQUEST_RECEIPT_FINE: request.receipt_fine,
                    REQUEST_RECEIPT_FEE: request.receipt_fee,
                    REQUEST_RECEIPT_TOTAL: request.receipt_total,
                    REQUEST_RECEIPT_DATE: request.receipt_date,
                    REQUEST_RECEIPT_FINE_YEAR_2: request.receipt_fine_year_2,
                    REQUEST_RECEIPT_FEE_YEAR_2: request.receipt_fee_year_2,
                    REQUEST_RECEIPT_TOTAL_YEAR_2: request.receipt_total_year_2,
                    REQUEST_RECEIPT_DATE_YEAR_2: request.receipt_date_year_2,
                    REQUEST_RECEIPT_FINE_YEAR_3: request.receipt_fine_year_3,
                    REQUEST_RECEIPT_FEE_YEAR_3: request.receipt_fee_year_3,
                    REQUEST_RECEIPT_TOTAL_YEAR_3: request.receipt_total_year_3,
                    REQUEST_RECEIPT_DATE_YEAR_3: request.receipt_date_year_3
                }
            con.query(query, values, function (err, result) {
                if (err) {
                    console.log(err)
                    return resolve(err.code)
                }
                console.log('UPDATE request sucess ')
                console.log(query)
                return resolve(`true`)
            })
        })
    }
    updateStatus(request) {
        return new Promise((resolve, reject) => {
            let query = `UPDATE request SET ? WHERE REQUEST_NO='${request.no}' AND REQUEST_YEAR='${request.year}'`
                , values = {
                    REQUEST_STATUS: request.status,
                    REQUEST_STATUS_BEFORE: request.status_before,
                    REQUEST_LAST_UPDATE: request.last_update,
                    REQUEST_USER_UPDATE: request.user_update + ``,
                    REQUEST_DATE_APPROVE: request.date_approve,
                    STAFF_ID_APPROVE: request.staff_id_approve,
                    REQUEST_RECEIPT_FINE: request.receipt_fine,
                    REQUEST_RECEIPT_FEE: request.receipt_fee,
                    REQUEST_RECEIPT_TOTAL: request.receipt_total,
                    REQUEST_RECEIPT_DATE: request.receipt_date,
                    REQUEST_RECEIPT_FINE_YEAR_2: request.receipt_fine_year_2,
                    REQUEST_RECEIPT_FEE_YEAR_2: request.receipt_fee_year_2,
                    REQUEST_RECEIPT_TOTAL_YEAR_2: request.receipt_total_year_2,
                    REQUEST_RECEIPT_DATE_YEAR_2: request.receipt_date_year_2,
                    REQUEST_RECEIPT_FINE_YEAR_3: request.receipt_fine_year_3,
                    REQUEST_RECEIPT_FEE_YEAR_3: request.receipt_fee_year_3,
                    REQUEST_RECEIPT_TOTAL_YEAR_3: request.receipt_total_year_3,
                    REQUEST_RECEIPT_DATE_YEAR_3: request.receipt_date_year_3,
                    STAFF_ID_MONEY: request.staff_id_money,
                    REQUEST_DATE_ISSUED: request.date_issued,
                    REQUEST_DATE_EXPIRED: request.date_expired,
                    REQUEST_DELETE_LOGIC: request.delete_logic,
                    REQUEST_IS_DELETED: request.is_delete
                }
            con.query(query, values, function (err, result) {
                if (err) {
                    console.log(err)
                    return resolve(err.code)
                }
                console.log(`Update id = ${request.no}/${request.year} status = ${request.status}`)
                return resolve(`true`)
            })
        })
    }
        updateStatusOnly(no, year, user, last_update, status, status_before) {
        return new Promise((resolve, reject) => {
            let query = `UPDATE request SET ? WHERE REQUEST_NO='${no}' AND REQUEST_YEAR='${year}'`
            let values = {}
            if (status_before != undefined) {
                values = {
                    REQUEST_STATUS: status,
                    REQUEST_LAST_UPDATE: last_update,
                    REQUEST_USER_UPDATE: user + ``,
                    REQUEST_STATUS_BEFORE: status_before
                }
            } else {
                values = {
                    REQUEST_STATUS: status,
                    REQUEST_LAST_UPDATE: last_update,
                    REQUEST_USER_UPDATE: user + ``
                }
            }
            con.query(query, values, function (err, result) {
                if (err) {
                    console.log(err)
                    return resolve(err.code)
                }
                console.log(`Update status request id = ${no}/${year} status = ${status}`)
                return resolve(`true`)
            })
        })
    }
    updateStatusDelete(object) {
        return new Promise((resolve, reject) => {
            let query = `UPDATE request SET ? WHERE REQUEST_NO='${object.id}' AND REQUEST_YEAR='${object.year}'`
            let values = {
                REQUEST_IS_DELETED: object.status,
                REQUEST_USER_UPDATE: object.username + ``,
                REQUEST_LAST_UPDATE: object.last_update
            }
            con.query(query, values, function (err, result) {
                if (err) {
                    console.log(err.code)
                    return resolve(err.code)
                }
                return resolve(`true`)
            })
        })
    }
}
module.exports = RequestDAO