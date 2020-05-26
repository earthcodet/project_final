var mysql = require('mysql')
var con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: "web_database",
    timeout: 0
})
class ComplaintDAO {
    insert(p_data) {
        let date_year = parseInt(new Date().toISOString().slice(0, 4)) + 543 + ""
        // let year_insert = date_year.slice(2, 4)
        p_data.id
        // p_data.year = year_insert
        p_data.year
        p_data.personal_id
        p_data.request_id
        p_data.request_year
        p_data.date_submission
        p_data.type
        p_data.status
        p_data.date_start
        p_data.date_end
        p_data.total_image
        p_data.is_deleted = 'N'
        return new Promise((resolve, reject) => {
            let column =`COMPLAINT_ID ,COMPLAINT_YEAR,PERSONAL_ID,REQUEST_NO,REQUEST_YEAR,COMPLAINT_DATE_SUBMISSION,COMPLAINT_TYPE,COMPLAINT_STATUS,COMPLAINT_DATE_START,COMPLAINT_DATE_END,COMPLAINT_TOTAL_IMAGE,COMPLAINT_IS_DELETED`

            let list_value = [
                p_data.id,
                p_data.year,
                p_data.personal_id,
                p_data.request_id,  //null
                p_data.request_year, //null
                p_data.date_submission,
                p_data.type,//null
                p_data.status,//null
                p_data.date_start,//null
                p_data.date_end,//null
                p_data.total_image,
                p_data.is_deleted
            ]
            let text = `INSERT INTO complaint(${column}) VALUES (?)`
            con.query(text, [list_value], function (err, result) {
                if (err) {
                    console.log(err)
                    return resolve(err.code)
                }
                return resolve(`true`)
            })
        })
    }
    update(p_data) {
        return new Promise((resolve, reject) => {
            let text = `UPDATE complaint SET ? WHERE COMPLAINT_ID = '${p_data.id}' AND COMPLAINT_YEAR =  '${p_data.year}'`
            let query = text,
                values = {
                    PERSONAL_ID : p_data.personal_id,
                    REQUEST_NO : p_data.request_id,
                    REQUEST_YEAR : p_data.request_year,
                    COMPLAINT_DATE_SUBMISSION : p_data.date_submission,
                    COMPLAINT_TYPE : p_data.type,
                    COMPLAINT_STATUS : p_data.status,
                    COMPLAINT_DATE_START : p_data.date_start,
                    COMPLAINT_DATE_END : p_data.date_end,
                    COMPLAINT_TOTAL_IMAGE : p_data.total_image,
                    COMPLAINT_IS_DELETED : p_data.is_deleted
                }
                console.log(query)
            con.query(query, values, function (err, result) {
                if (err) {
                    console.log(err)
                    return resolve(err.code)
                }
                console.log(result)
                if (result.affectedRows === 1) {
                    return resolve(true)
                } else {
                    return resolve(false)
                }
            })
        })
    }
    getById(id,year) {
        return new Promise((resolve, reject) => {
            con.query('SELECT * FROM complaint JOIN personal ON personal.PERSONAL_ID = complaint.PERSONAL_ID WHERE COMPLAINT_ID ="'+id+'" AND COMPLAINT_YEAR ="'+year+'"', function (err, rows) {
                if (err) {
                    console.log(err)
                    throw err;
                }
                return resolve(rows);
            });
        });
    }
    getDuplicationId(id, year){
        return new Promise((resolve, reject) => { 
            con.query('SELECT * FROM complaint WHERE COMPLAINT_ID ="'+id+'"'+" AND COMPLAINT_YEAR = '"+`${year}`+"' AND COMPLAINT_IS_DELETED = 'Y'", function (err, rows) {
                if (err) {
                    console.log(err)
                    throw err;
                }
                if(rows.length != 0){
                    return resolve(true);
                }else{
                    return resolve(false);
                }
                
            });
        });
    }
    getByPersonalId(p_id) {
        return new Promise((resolve, reject) => {
            let column = ``
            column = column + `COMPLAINT_ID, COMPLAINT_YEAR, COMPLAINT_TYPE, COMPLAINT_DATE_SUBMISSION,REQUEST_NO, REQUEST_YEAR, COMPLAINT_DATE_START, COMPLAINT_DATE_END `
            con.query('SELECT '+column+' FROM complaint WHERE PERSONAL_ID ="'+p_id+'"'+`AND COMPLAINT_IS_DELETED = 'N'`, function (err, rows) {
                if (err) {
                    console.log(err)
                    throw err;
                }
                return resolve(rows);
            });
        });
    }
}


module.exports = ComplaintDAO