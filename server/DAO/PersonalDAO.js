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
        personal.is_deleted = 'N'
        return new Promise((resolve, reject) => {
            let value = `'${personal.id}', '${personal.address_id}', ${personal.title}, `
            value = value + `'${personal.type}', '${personal.name}', ${personal.surname}, `
            value = value + `${personal.nationality}, ${personal.race}, ${personal.birthday}, `
            value = value + `'${personal.personal_id}', '${personal.card_issued}', ${personal.card_expipe}, `
            value = value + `'${personal.phone}',${personal.fax},'${personal.update}',`
            value = value + `'${personal.is_deleted}','${personal.username}'`
            let column = 'PERSONAL_ID, ADDRESS_ID, PERSONAL_TITLE, PERSONAL_TYPE, PERSONAL_NAME, PERSONAL_SURNAME, PERSONAL_NATIONALITY, PERSONAL_RACE, PERSONAL_BIRTHDAY, PERSONAL_PERSONAL_ID, PERSONAL_CARD_ISSUED, PERSONAL_CARD_EXPIRE, PERSONAL_PHONE, PERSONAL_FAX, PERSONAL_UPDATE, PERSONAL_IS_DELETED, USER_UPDATE'
            let query = `INSERT INTO personal(${column}) VALUES (${value})`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err.code)
                    return resolve(err.code)
                }
                return resolve(`true`)
            })
        })
    }
    updatePersonal(personal) {
        return new Promise((resolve, reject) => {
            let value = `PERSONAL_TITLE = ${personal.title},`
            value = value + `PERSONAL_NAME='${personal.name}',PERSONAL_SURNAME=${personal.surname},`
            value = value + `PERSONAL_NATIONALITY=${personal.nationality},PERSONAL_RACE=${personal.race},`
            value = value + `PERSONAL_BIRTHDAY=${personal.birthday},`
            // value = value + `PERSONAL_PERSONAL_ID='${personal.personal_id}',`
            value = value + `PERSONAL_CARD_ISSUED='${personal.card_issued}',PERSONAL_CARD_EXPIRE=${personal.card_expipe},`
            value = value + `PERSONAL_PHONE='${personal.phone}',PERSONAL_FAX=${personal.fax},`
            value = value + `PERSONAL_UPDATE='${personal.update}',`
            value = value + `USER_UPDATE='${personal.username}'`
            let query = `UPDATE personal SET ${value} WHERE PERSONAL_ID='${personal.id}'`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err.code)
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
            let value = `PERSONAL_TITLE = ${personal.title},`
            value = value + `PERSONAL_NAME='${personal.name}',PERSONAL_SURNAME=${personal.surname},`
            value = value + `PERSONAL_NATIONALITY=${personal.nationality},PERSONAL_RACE=${personal.race},`
            value = value + `PERSONAL_PHONE='${personal.phone}',PERSONAL_FAX=${personal.fax},`
            value = value + `PERSONAL_UPDATE='${personal.update}',`
            value = value + `USER_UPDATE='${personal.username}'`
            let query = `UPDATE personal SET ${value} WHERE PERSONAL_ID='${personal.id}'`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err.code)
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
            let value = `PERSONAL_UPDATE='${personal.update}',`
            value = value + `PERSONAL_IS_DELETED='${personal.is_deleted}',`
            value = value + `USER_UPDATE='${personal.username}'`
            let query = `UPDATE personal SET ${value} WHERE PERSONAL_ID='${personal.id}'`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err.code)
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
            let condition = `PERSONAL_PERSONAL_ID LIKE '%${id}%' AND PERSONAL_NAME LIKE '%${name}%' AND PERSONAL_SURNAME LIKE '%${surname}%'`
            let query = `SELECT ${value} FROM personal WHERE ${condition}`
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
            let condition = `PERSONAL_PERSONAL_ID LIKE '%${id}%' AND PERSONAL_NAME LIKE '%${name}%' AND PERSONAL_SURNAME LIKE '%${surname}%' AND PERSONAL_IS_DELETED = 'N'`
            let query = `SELECT ${value} FROM personal WHERE ${condition}`
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