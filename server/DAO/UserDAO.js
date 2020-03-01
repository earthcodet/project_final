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
            con.query(`SELECT * FROM user WHERE USER_USERNAME='${username}' AND USER_PASSWORD = '${password}'`, function (err,result){
                if(err) {
                    throw err
                }
                return resolve(result)
            })
        })
    }
    getUserByUserId(user_id){
        return new Promise((resolve, reject) =>{
            con.query(`SELECT * FROM user WHERE USER_ID='${user_id}'`, function (err,result){
                if(err) {
                    throw err
                }
                return resolve(result)
            })
        })
    }
    getStaffฺByType(value){
        return new Promise((resolve, reject) =>{
            con.query(`SELECT * FROM user WHERE USER_POSITION_TYPE ='${value}' ORDER By USER_IS_DEFAULT DESC`, function (err,result){
                if(err) {
                    throw err
                }
                return resolve(result)
            })
        })
    }
    getMaxIdUser() {
        return new Promise((resolve, reject) => {
            let query = `SELECT MAX(USER_ID) As 'maxId' FROM user`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err.code)
                }
                return resolve(result)
            })
        })
    }
    insertUser(user){
        user.status = 'N'
        return new Promise((resolve, reject) => {
            let value  =`'${user.id}', ${user.username}, ${user.password}, '${user.title}', '${user.name}', '${user.surname}', '${user.type_user}', `
            value = value + `'${user_position}', ${user.is_default}, '${user.status}'`
            let column = 'USER_ID, USER_USERNAME, USER_PASSWORD, USER_TITLE, USER_NAME, USER_SURNAME, USER_TYPE_USER, '
            column = column + 'USER_POSITION, USER_IS_DEFAULT, USER_STATUS'
            let query = `INSERT INTO user(${column}) VALUES (${value})`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err.code)
                }
                return resolve(`true`)
            })
        })
    }
    updateStaff(staff){
        return new Promise((resolve, reject) => {
            let value  =`TRAIN_ISSUED='${train.date_issued}', TRAIN_DATE_ISSUED='${train.issuse}', TRAIN_DATE_EXP='${train.date_exp}'`
            let query = `UPDATE train SET ${value} WHERE TRAIN_ID = '${train.id}'`
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
}
module.exports = LoginDAO