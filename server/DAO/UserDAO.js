var mysql = require('mysql')
var con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password:'',
    database:'web_database'
})

class LoginDAO {
    getUser(username , password){
        return new Promise((resolve, reject) =>{
            let myQuery = `SELECT * FROM user WHERE user_username =${username} AND user_password = ${password}`
            con.query(`SELECT * FROM user WHERE user_username='${username}' AND user_password = '${password}'`, function (err,result){
                if(err) {
                    throw err
                }
                return resolve(result)
            })
        })
    }
}
module.exports = LoginDAO