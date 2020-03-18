var mysql = require('mysql')
var con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: "web_database",
    timeout: 0
})
//con.timeout = 0;
class LandDAO {
    getMaxId(){
        return new Promise((resolve, reject) => {
            let query = `SELECT MAX(LAND_ID) As 'maxId' FROM land`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err.code) 
                }
                return resolve(result)
            })
        })
    }
    insert(land){
        return new Promise((resolve, reject) => {
            let column = `LAND_ID, ADDRESS_ID, LAND_TITLE, LAND_NAME, LAND_SURNAME, LAND_BIRTHDAY, LAND_PHONE`
            let text = `INSERT INTO land(${column}) VALUES (?)`
            let list_value = [
                land.id,
                land.address_id,
                land.title,
                land.name,
                land.surname,
                land.birthday,
                land.phone
            ]
            con.query(query,[list_value], function (err, result) {
                if (err) {
                    console.log(err.code) 
                    return resolve(err.code)
                }
                return resolve(`true`)
            })
        })
    }
    get(id){
        return new Promise((resolve, reject) => {  
            let query = `SELECT * FROM land WHERE LAND_ID='${id}'`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err) 
                    return resolve(err.code)
                }
                return resolve(result[0])
            })
        }) 
    }
    getDuplicate(land){
            return new Promise((resolve, reject) => {
                let value = `LAND_TITLE = '${land.title}'AND LAND_NAME = '${land.name}'AND LAND_SURNAME = '${land.surname}'`
                let query = `SELECT * FROM land WHERE ${value}`
                con.query(query, function (err, result) {
                    if (err) {
                        console.log(err)
                        return resolve(err.code)
                    }
                    return resolve(result[0])
                })
            })
    }
    updateLand(land){
        return new Promise((resolve, reject) => {
            let text = `UPDATE land SET ? WHERE LAND_ID = '${land.id}'`
            let query = text,
            values ={
                ADDRESS_ID:land.address_id,
                LAND_TITLE:land.title,
                LAND_NAME:land.name,
                LAND_SURNAME:land.surname,
                LAND_BIRTHDAY:land.birthday,
                LAND_PHONE:land.phone
                            
            }
            con.query(query,values, function (err, result) {
                if (err) {
                    console.log(err)
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
module.exports = LandDAO