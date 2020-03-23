var mysql = require('mysql')
var con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: "web_database",
    timeout: 0
})
//con.timeout = 0;
class PersonalDAO {
    getMaxIdProsonal() {
        return new Promise((resolve, reject) => {
            let query = `SELECT MAX(PERSONAL_ID) As 'maxId' FROM personal`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err.code)
                }
                return resolve(result)
            })
        })
    }
    getPersonalByPersonalId(personalId) {
        console.log(personalId)
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM personal WHERE PERSONAL_ID='${personalId}'`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err)
                }
                return resolve(result)
            })
        })
    }
    getPersonalId(personalId) {
        return new Promise((resolve, reject) => {
            let query = `SELECT PERSONAL_PERSONAL_ID As pId FROM personal WHERE PERSONAL_PERSONAL_ID='${personalId}'`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err.code)
                }
                if (result.length === 0) {
                    console.log(`DAO status => ${false}`)
                    return resolve(false)
                } else {
                    console.log(`DAO status => ${true}`)
                    return resolve(true)
                }
            })
        })
    }
    getPersonalAssistantById(personalId) {
        return new Promise((resolve, reject) => {
            let query = `SELECT PERSONAL_TITLE,PERSONAL_NAME,PERSONAL_SURNAME,PERSONAL_PERSONAL_ID FROM personal WHERE PERSONAL_ID='${personalId}'`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err.code)
                }
                if (result.length === 0) {
                    return resolve(result)
                } else {
                    return resolve(result)
                }
            })
        })
    }
    insertPersonal(personal) {
        console.log(personal)
            personal.is_deleted = 'N'
            return new Promise((resolve, reject) => {
                let list_value = [
                    personal.id,
                    personal.address_id,
                    personal.title,
                    personal.type,
                    personal.name,
                    personal.surname,
                    personal.nationality,
                    personal.race,
                    personal.birthday,
                    personal.personal_id,
                    personal.card_issued,
                    personal.card_expipe,
                    personal.phone,
                    personal.fax,
                    personal.update,
                    personal.is_deleted,
                    personal.username + ``
                ]
                //1
                let column = 'PERSONAL_ID, '
                column = column + 'ADDRESS_ID, '
                column = column + 'PERSONAL_TITLE, '
                column = column + 'PERSONAL_TYPE, '
                column = column + 'PERSONAL_NAME, '
                column = column + 'PERSONAL_SURNAME, '
                column = column + 'PERSONAL_NATIONALITY, '
                column = column + 'PERSONAL_RACE, '
                column = column + 'PERSONAL_BIRTHDAY, '
                column = column + 'PERSONAL_PERSONAL_ID, '
                column = column + 'PERSONAL_CARD_ISSUED, '
                column = column + 'PERSONAL_CARD_EXPIRE, '
                column = column + 'PERSONAL_PHONE, '
                column = column + 'PERSONAL_FAX, '
                column = column + 'PERSONAL_UPDATE, '
                column = column + 'PERSONAL_IS_DELETED, '
                column = column + 'USER_UPDATE '
                let query = `INSERT INTO personal(${column}) VALUES (?)`
                con.query(query,[list_value], function (err, result) {
                    if (err) {
                        console.log(err)
                        return resolve(err.code)
                    }
                    return resolve(`true`)
                })
            })
        }
    updatePersonal(personal) {
        return new Promise((resolve, reject) => {
            // value = value + `PERSONAL_PERSONAL_ID='${personal.personal_id}',`
            let text = `UPDATE personal SET ? WHERE PERSONAL_ID='${personal.id}'`
            let query = text
            ,
            values = {
                PERSONAL_TITLE: personal.title,
                PERSONAL_NAME:personal.name,
                PERSONAL_SURNAME:personal.surname,
                PERSONAL_NATIONALITY:personal.nationality,
                PERSONAL_RACE:personal.race,
                PERSONAL_BIRTHDAY:personal.birthday,
                PERSONAL_CARD_ISSUED:personal.card_issued,
                PERSONAL_CARD_EXPIRE:personal.card_expipe,
                PERSONAL_PHONE:personal.phone,
                PERSONAL_FAX:personal.fax,
                PERSONAL_UPDATE:personal.update,
                USER_UPDATE:personal.username +``

            }
            con.query(query,values, function (err, result) {
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
    updatePersonalRequest(personal) {
        return new Promise((resolve, reject) => {
            let text = `UPDATE personal SET ? WHERE PERSONAL_ID='${personal.id}'`
            let query = text
            ,
            values = {
                PERSONAL_TITLE: personal.title,
                PERSONAL_NAME:personal.name,
                PERSONAL_SURNAME:personal.surname,
                PERSONAL_NATIONALITY:personal.nationality,
                PERSONAL_RACE:personal.race,
                PERSONAL_PHONE:personal.phone,
                PERSONAL_FAX:personal.fax,
                PERSONAL_UPDATE:personal.update,
                USER_UPDATE:personal.username +``
            }
            con.query(query,values, function (err, result) {
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
    updateStatusPersonal(personal) {
        return new Promise((resolve, reject) => {
            let text = `UPDATE personal SET ? WHERE PERSONAL_ID='${personal.id}'`
            let query = text
            ,
            values = {
                PERSONAL_UPDATE:personal.fax,
                PERSONAL_IS_DELETED:personal.update,
                USER_UPDATE:personal.username +``
            }
            con.query(query,values, function (err, result) {
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
    getPersonal(id, name, surname) {
        return new Promise((resolve, reject) => {
            // let value = 'PERSONAL_TITLE,PERSONAL_NAME,PERSONAL_SURNAME,PERSONAL_PERSONAL_ID,ADDRESS_ID'
            let value = '*'
            let condition = ''
            if(id === '' && name === '' && surname === ''){
                condition = ''
            }else if(surname === ''){
                condition = `WHERE PERSONAL_PERSONAL_ID LIKE "%${id}%" AND PERSONAL_NAME LIKE "%${name}%" `
            }else{
                condition = `WHERE PERSONAL_PERSONAL_ID LIKE "%${id}%" AND PERSONAL_NAME LIKE "%${name}%" AND PERSONAL_SURNAME LIKE "%${surname}%"`
            }
            
            let query = `SELECT ${value} FROM personal ${condition}`
            console.log(query)
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err.code)
                } else {
                    return resolve(result)
                }
            })
        })
    }
    getPersonalStatusN(id, name, surname) {
        return new Promise((resolve, reject) => {
            // let value = 'PERSONAL_TITLE,PERSONAL_NAME,PERSONAL_SURNAME,PERSONAL_PERSONAL_ID,ADDRESS_ID'
            let value = '*'
            let condition = ''
            if(id === '' && name === '' && surname === ''){
                condition = "WHERE PERSONAL_IS_DELETED = 'N'"
            }else if(surname === ''){
                condition = `WHERE PERSONAL_PERSONAL_ID LIKE "%${id}%" AND PERSONAL_NAME LIKE "%${name}%" AND PERSONAL_IS_DELETED = 'N'`
            }else{
                condition = `WHERE PERSONAL_PERSONAL_ID LIKE '%${id}%' AND PERSONAL_NAME LIKE '%${name}%' AND PERSONAL_SURNAME LIKE '%${surname}%' AND PERSONAL_IS_DELETED = 'N'`
            }
            
            let query = `SELECT ${value} FROM personal ${condition}`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err.code)
                } else {
                    return resolve(result)
                }
            })
        })
    }
}


module.exports = PersonalDAO