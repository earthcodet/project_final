var mysql = require('mysql')
var con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'web_database',
    timeout: 0
})
// con.timeout = 0;
class LoginDAO {
    getUser(username, password) {
        return new Promise((resolve, reject) => {
            con.query(`SELECT * FROM user WHERE USER_USERNAME='${username}' AND USER_PASSWORD = '${password}'`, function (err, result) {
                if (err) {
                    throw err
                }
                return resolve(result)
            })
        })
    }
    getUserByUserId(user_id) {
        return new Promise((resolve, reject) => {
            con.query(`SELECT * FROM user WHERE USER_ID='${user_id}'`, function (err, result) {
                if (err) {
                    throw err
                }
                return resolve(result)
            })
        })
    }
    getStaffฺByType(value) {
        return new Promise((resolve, reject) => {
            con.query(`SELECT * FROM user WHERE USER_POSITION_TYPE ='${value}' ORDER By USER_IS_DEFAULT DESC`, function (err, result) {
                if (err) {
                    throw err
                }
                return resolve(result)
            })
        })
    }
    getStaffฺByTypes(value1, value2) {
        return new Promise((resolve, reject) => {
            con.query(`SELECT * FROM user WHERE USER_POSITION_TYPE ='${value1}' OR USER_POSITION_TYPE ='${value2}' ORDER By USER_IS_DEFAULT DESC`, function (err, result) {
                if (err) {
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
                    console.log(err)
                    
                }
                return resolve(result)
            })
        })
    }
    insertUser(user) {
        user.status = 'N'
        return new Promise((resolve, reject) => {
            let column = 'USER_ID,USER_USERNAME,USER_PASSWORD,USER_TITLE,USER_NAME,USER_SURNAME,USER_TYPE_USER,'
            column = column + ` USER_POSITION, USER_POSITION_TYPE,USER_IS_DEFAULT,USER_STATUS,USER_LAST_UPDATE,USER_UPDATE`
            
            let query = `INSERT INTO user(${column}) VALUES (?)`
            let value_list = [
                user.id,
                user.username,
                user.password,
                user.title,
                user.name,
                user.surname,
                user.type_user,
                user.position,
                user.position_type,
                user.is_default,
                user.status,
                user.last_update,
                user.update+''
            ]
            con.query(query, [value_list], function (err, result) {
                if (err) {
                    console.log(err)
                    return resolve(false)
                }
                return resolve(true)
            })
        })
    }
    updateStaff(user) {
        return new Promise((resolve, reject) => {
            let value = {
                USER_ID : user.id,
                USER_USERNAME : user.username,
                USER_PASSWORD : user.password,
                USER_TITLE : user.title,
                USER_NAME : user.name,
                USER_SURNAME : user.surname,
                USER_TYPE_USER : user.type_user,
                USER_POSITION : user.position,
                USER_POSITION_TYPE : user.position_type,
                USER_IS_DEFAULT : user.is_default,
                USER_STATUS : user.status,
                USER_LAST_UPDATE : user.last_update,
                USER_UPDATE : user.update +''
            }

            let query = `UPDATE user SET ? WHERE USER_ID = '${user.id}'`

            con.query(query,value, function (err, result) {
                if (err) {
                    console.log(err)
                    return resolve(err.code)
                }
                if (result.affectedRows === 1) {
                    return resolve(true)
                } else {
                    return resolve(false)
                }
            })
        })
    }
    updateStatus(type){
        return new Promise((resolve, reject) => {
            let query = `UPDATE user SET USER_IS_DEFAULT = NULL WHERE USER_POSITION_TYPE = '${type}'`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err)
                    return resolve(err.code)
                }else{
                    return resolve(true)
                }
            })
        })
    }
}
module.exports = LoginDAO