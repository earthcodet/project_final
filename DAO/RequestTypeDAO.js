var mysql = require('mysql')
var con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: "web_database",
    timeout: 0
})
//con.timeout = 0;
class RequestTypeDAO {
    update(request) {
        return new Promise((resolve, reject) => {
            let query = `UPDATE request_type SET ? WHERE REQUEST_TYPE_ID = ${request.id}`
            let list_value = {
                REQUEST_TYPE_NAME: request.name,
                REQUEST_TYPE_MENU: request.type
            }
            con.query(query, list_value, function (err, result) {
                if (err) {
                    console.log(err)
                    return resolve(err.code)
                }
                return resolve(true)
            })
        })
    }
    insert(request) {
        return new Promise((resolve, reject) => {
            let column = `REQUEST_TYPE_NAME, REQUEST_TYPE_MENU`
            let query = `INSERT INTO request_type(${column}) VALUES (?)`
            let list_value = [
                request.name,
                request.type
            ]
            con.query(query, [list_value], function (err, result) {
                if (err) {
                    console.log(err)
                    return resolve(err.code)
                }
                return resolve(true)
            })
        })
    }
    getRequestBymenuName(name) {
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM request_type WHERE REQUEST_TYPE_NAME = '${name}'`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err)
                    return resolve(err.code)
                }
                return resolve(result)
            })
        })
    }
    getRequestTypeById(id) {
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM request_type WHERE REQUEST_TYPE_ID=${id}`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err.code)
                    return resolve(err.code)
                }
                return resolve(result)
            })
        })
    }
    getRequestTypeByType(type) {
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM request_type WHERE REQUEST_TYPE_MENU	='${type}'`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err.code)
                    return resolve(err.code)
                }
                return resolve(result)
            })
        })
    }
    get() {
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