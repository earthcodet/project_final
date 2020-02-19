var mysql = require('mysql')
var con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: "web_database",
    timeout: 0
})
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
            let values = `'${land.id}', '${land.address_id}', '${land.title}', '${land.name}', '${land.surname}', ${land.birthday}, `
            values = values + `'${land.phone}'`
            let query = `INSERT INTO land(${column}) VALUES (${values})`
            con.query(query, function (err, result) {
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
}
module.exports = LandDAO