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
    getMaxId(type, year){
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
    insert(request){
        request.status = 'wait'
        request.status_before = 'wait'
        request.is_deleted = 'N'
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
            column = column + `REQUEST_LAST_UPDATE, REQUEST_USER_UPDATE ,REQUEST_STATUS_BEFORE` //${request.establishment_is_land_owned}

            let values = `'${request.no}','${request.year }', '${request.personal_id_owner }', '${request.request_type_id }', '${request.staff_id_alderman }', ` 
            values = values +  `'${request.establishment_id }', ${request.staff_id_money }, ${request.reference_id}, ${request.train_id}, `
            values = values +  `${request.personal_id_assistant }, ${request.staff_id_approve }, ${request.establishment_is_land_owned},${request.establishment_address_id}, '${request.menu }', '${request.date_submission }', `
            values = values +  `${request.date_approve }, '${request.doc_no1}', '${request.doc_no2}', '${request.doc_no3}', `
            values = values +  `'${request.doc_no4}', '${request.doc_no5}', '${request.doc_no6}', ${request.subcategory}, `
            values = values +  `${request.product_type }, ${request.sell_start }, ${request.sell_end}, '${request.sell_allow}', `
            values = values +  `${request.date_issued}, ${request.date_expired }, ${request.condition_no_1}, `
            values = values +  `${request.condition_no_2}, ${request.condition_no_3}, ${request.condition_no_4}, ${request.image_name }, `
            values = values +  `'${request.total_image }', '${request.status }', ${request.delete_logic }, '${request.is_deleted }', `
            values = values +  `'${request.last_update }', '${request.user_update }', '${request.status_before}' `
            let query = `INSERT INTO request(${column}) VALUES (${values})`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err) 
                    return resolve(err.code)
                }
                return resolve(`true`)
            })
        })
    }
    getRequestById(id,year){
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
    getRequestByTpyeAndOwnerId(type,Owner){
        console.log(type)
        console.log(Owner)
        return new Promise((resolve, reject) => {  
            let query = `SELECT * FROM request WHERE REQUEST_STATUS='${type}' AND PERSONAL_ID_OWNER='${Owner}'`
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
    update(request){
        console.log(`-------- DATABASE -------`)
        console.log(request)
        console.log(`-------- DATABASE -------`)
        return new Promise((resolve, reject) => {
            let column = `PERSONAL_ID_OWNER='${request.personal_id_owner}', REQUEST_TYPE_ID='${request.request_type_id}', STAFF_ID_ALDERMAN='${request.staff_id_alderman}', ESTABLISHMENT_ID='${request.establishment_id}', `
            column = column + `STAFF_ID_MONEY=${request.staff_id_money}, REFERENCE_ID=${request.reference_id}, TRAIN_ID=${request.train_id}, PERSONAL_ID_ASSISTANT=${request.personal_id_assistant }, STAFF_ID_APPROVE=${request.staff_id_approve }, REQUEST_MENU='${request.menu }', `
            column = column + `REQUEST_DATE_SUBMISSION='${request.date_submission }', REQUEST_DATE_APPROVE=${request.date_approve }, REQUEST_DOC_NO1='${request.doc_no1}', REQUEST_DOC_NO2='${request.doc_no2}', REQUEST_DOC_NO3='${request.doc_no3}', `
            column = column + `REQUEST_DOC_NO4='${request.doc_no4}', REQUEST_DOC_NO5='${request.doc_no5}', REQUEST_DOC_NO6='${request.doc_no6}', REQUEST_SUBCATEGORY=${request.subcategory}, REQUEST_PRODUCT_TYPE=${request.product_type },` 
            column = column + `REQUEST_SELL_START=${request.sell_start }, REQUEST_SELL_END=${request.sell_end}, REQUEST_SELL_ALLOW='${request.sell_allow}', REQUEST_RECEIPT_FINE=${request.receipt_fine }, `
            column = column + `REQUEST_RECEIPT_FEE=${request.receipt_fee}, REQUEST_RECEIPT_TOTAL=${request.receipt_total}, REQUEST_RECEIPT_DATE=${request.receipt_date }, REQUEST_DATE_ISSUED=${request.date_issued }, REQUEST_DATE_EXPIRED=${request.date_expired }, `
            column = column + `REQUEST_CONDITION_NO_1=${request.condition_no_1}, REQUEST_CONDITION_NO_2=${request.condition_no_2}, REQUEST_CONDITION_NO_3=${request.condition_no_3}, REQUEST_CONDITION_NO_4=${request.condition_no_4}, `
            column = column + `REQUEST_IMAGE_NAME=${request.image_name }, REQUEST_TOTAL_IMAGE='${request.total_image }', REQUEST_STATUS='${request.status }', REQUEST_DELETE_LOGIC=${request.delete_logic }, REQUEST_IS_DELETED='${request.is_deleted }', `
            column = column + `REQUEST_LAST_UPDATE='${request.last_update }', REQUEST_USER_UPDATE='${request.user_update }' , `
            column = column + `REQUEST_STATUS_BEFORE='${request.status_before}', REQUEST_STATUS='${request.status}', `
            //year 1
            column = column + `REQUEST_RECEIPT_FINE=${request.receipt_fine }, REQUEST_RECEIPT_FEE=${request.receipt_fee}, `
            column = column + `REQUEST_RECEIPT_TOTAL=${request.receipt_total}, REQUEST_RECEIPT_DATE=${request.receipt_date }, `
            //year 2 
            column = column + `REQUEST_RECEIPT_FINE_YEAR_2=${request.receipt_fine_year_2 }, REQUEST_RECEIPT_FEE_YEAR_2=${request.receipt_fee_year_2}, `
            column = column + `REQUEST_RECEIPT_TOTAL_YEAR_2=${request.receipt_total_year_2}, REQUEST_RECEIPT_DATE_YEAR_2=${request.receipt_date_year_2 }, `
            //year 3
            column = column + `REQUEST_RECEIPT_FINE_YEAR_3=${request.receipt_fine_year_3 }, REQUEST_RECEIPT_FEE_YEAR_3=${request.receipt_fee_year_3}, `
            column = column + `REQUEST_RECEIPT_TOTAL_YEAR_3=${request.receipt_total_year_3}, REQUEST_RECEIPT_DATE_YEAR_3=${request.receipt_date_year_3 }`

            let query = `UPDATE request SET ${column} WHERE REQUEST_NO='${request.no}' AND REQUEST_YEAR='${request.year}'`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err) 
                    return resolve(err.code)
                }
                return resolve(`true`)
            })
        })
    }
    updateStatus(request){
        return new Promise((resolve, reject) => {
            let column = `REQUEST_STATUS='${request.status}',REQUEST_STATUS_BEFORE ='${request.status_before}',`
            column = column + `REQUEST_LAST_UPDATE='${request.last_update}',REQUEST_USER_UPDATE='${request.user_update}',`
            column = column + `REQUEST_DATE_APPROVE=${request.date_approve}, STAFF_ID_APPROVE = ${request.staff_id_approve},`
             //year 1
             column = column + `REQUEST_RECEIPT_FINE=${request.receipt_fine }, REQUEST_RECEIPT_FEE=${request.receipt_fee}, `
             column = column + `REQUEST_RECEIPT_TOTAL=${request.receipt_total}, REQUEST_RECEIPT_DATE=${request.receipt_date }, `
             //year 2 
             column = column + `REQUEST_RECEIPT_FINE_YEAR_2=${request.receipt_fine_year_2 }, REQUEST_RECEIPT_FEE_YEAR_2=${request.receipt_fee_year_2}, `
             column = column + `REQUEST_RECEIPT_TOTAL_YEAR_2=${request.receipt_total_year_2}, REQUEST_RECEIPT_DATE_YEAR_2=${request.receipt_date_year_2 }, `
             //year 3
             column = column + `REQUEST_RECEIPT_FINE_YEAR_3=${request.receipt_fine_year_3 }, REQUEST_RECEIPT_FEE_YEAR_3=${request.receipt_fee_year_3}, `
             column = column + `REQUEST_RECEIPT_TOTAL_YEAR_3=${request.receipt_total_year_3}, REQUEST_RECEIPT_DATE_YEAR_3=${request.receipt_date_year_3 },`
 
            column = column + `STAFF_ID_MONEY=${request.staff_id_money},REQUEST_DATE_ISSUED=${request.date_issued},REQUEST_DATE_EXPIRED=${request.date_expired},`
            column = column + `REQUEST_DELETE_LOGIC =${request.delete_logic},REQUEST_IS_DELETED='${request.is_deleted}'`
          
            let query = `UPDATE request SET ${column} WHERE REQUEST_NO='${request.no}' AND REQUEST_YEAR='${request.year}'`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err) 
                    return resolve(err.code)
                }
                return resolve(`true`)
            })
        })
    }
    updateStatusDelete(status,id,year){
        return new Promise((resolve, reject) => {
            let column = `REQUEST_IS_DELETED='${status}'`
            let query = `UPDATE request SET ${column} WHERE REQUEST_NO='${id}' AND REQUEST_YEAR='${year}'`
            con.query(query, function (err, result) {
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