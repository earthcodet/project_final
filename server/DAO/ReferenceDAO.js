var mysql = require('mysql')
var con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: "web_database"
})

class ReferenceDAO {
    getMaxIdReference() {
        return new Promise((resolve, reject) => {
            let query = `SELECT MAX(REFERENCE_ID) As 'maxId' FROM reference`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err.code) 
                }
                return resolve(result)
            })
        })
    }
    insertReference(reference){
        return new Promise((resolve, reject) => {
            let value  =`'${reference.id}', '${reference.title}', '${reference.name}', '${reference.surname}', '${reference.status}', '${reference.phone}'`
            let column = 'REFERENCE_ID, REFERENCE_TITLE, REFERENCE_NAME, REFERENCE_SURNAME, REFERENCE_STATUS, REFERENCE_PHONE'
            let query = `INSERT INTO reference(${column}) VALUES (${value})`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err.code)
                    return resolve(err.code)
                }
                return resolve(`true`)
            })
        })
    }   
    updateReference(reference){
        return new Promise((resolve, reject) => {
            let value  =`REFERENCE_TITLE='${reference.title}', REFERENCE_NAME='${reference.name}', REFERENCE_SURNAME='${reference.surname}', REFERENCE_STATUS='${reference.status}', REFERENCE_PHONE='${reference.phone}'`
            let query = `UPDATE reference SET ${value} WHERE REFERENCE_ID = '${reference.id}'`
            con.query(query, function (err, result) {
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
    getReference(reference){
        return new Promise((resolve, reject) => {
            let value = '*'
            let condition = `REFERENCE_NAME = '${reference.name}' AND REFERENCE_SURNAME = '${reference.surname}'`
            let query = `SELECT ${value} FROM reference WHERE ${condition}`
            con.query(query, function (err, result) {   
                if (err) {
                    console.log('this')
                    console.log(err.code)
                }else{
                    return resolve(result)
                }
            })
        })
    }
    getReferenceById(reference_id){
        return new Promise((resolve, reject) =>{
            con.query(`SELECT * FROM reference WHERE REFERENCE_ID='${reference_id}'`, function (err,result){
                if(err) {
                    throw err
                }
                return resolve(result)
            })
        })
    }
    
}   


module.exports = ReferenceDAO