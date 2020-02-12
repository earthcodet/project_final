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
}
module.exports = LandDAO