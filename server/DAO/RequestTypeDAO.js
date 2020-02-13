var mysql = require('mysql')
var con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: "web_database",
    timeout: 0
})
class RequestTypeDAO {
    insert(request){
        return new Promise((resolve, reject) => {
            let column = `REQUEST_TYPE_ID, REQUEST_TYPE_NAME, REQUEST_TYPE_MENU`
            let values = `'${request.id}', '${request.name}', '${request.menu}'`
            let query = `INSERT INTO request_type(${column}) VALUES (${values})`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err.code) 
                    return resolve(err.code)
                }
                return resolve(`true`)
            })
        })
    }
    getRequestTypeById(id){
        return new Promise((resolve, reject) => {  
            let query = `SELECT * FROM request_type WHERE REQUEST_TYPE_ID='${id}'`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err.code) 
                    return resolve(err.code)
                }
                return resolve(result[0])
            })
        }) 
    }
    get(){
        return new Promise((resolve, reject) => {  
            let query = `SELECT * FROM request_type`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err.code) 
                    return resolve(err.code)
                }
                return resolve(result)
            })
        }) 
    }
}
module.exports = RequestTypeDAO