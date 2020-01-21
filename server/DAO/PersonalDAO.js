var mysql = require('mysql')
var con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: "web_database"
})

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
    getMaxIdAddress() {
        return new Promise((resolve, reject) => {
            let query = `SELECT MAX(ADDRESS_ID) As 'maxId' FROM address`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err.code)
                }
                return resolve(result)
            })
        })
    }
    getPersonalId(personalId){
        return new Promise((resolve, reject) => {
            let query = `SELECT PERSONAL_PERSONAL_ID As pId FROM personal WHERE PERSONAL_PERSONAL_ID='${personalId}'`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err.code)
                }
                if(result.length === 0){
                    console.log(`DAO status => ${false}`)
                    return resolve(false)
                }else{
                    console.log(`DAO status => ${true}`)
                    return resolve(true)
                }
            })
        })
    }
    insertAddress(address){
        return new Promise((resolve, reject) => {
            let value  = `'${address.id}', '${address.home_number}', '${address.moo}', '${address.trxk}', '${address.sxy}', '${address.building}', '${address.road}', '${address.district_name}', '${address.amphur_name}', '${address.province_name}'`
            let column = 'ADDRESS_ID, ADDRESS_HOME_NUMBER, ADDRESS_MOO, ADDRESS_TRXK, ADDRESS_SXY, ADDRESS_BUILDING, ADDRESS_ROAD, DISTRICT_NAME, AMPHUR_NAME, PROVINCE_NAME'
            let query = `INSERT INTO address(${column}) VALUES (${value})`
            con.query(query, function (err, result) {
                if (err) {
                    return resolve(err.code)
                }
                return resolve(`true`)
            })
        })
    }
    insertPersonal(personal){
        personal.is_deleted = 'NO'
        return new Promise((resolve, reject) => {
            let value  = `'${personal.id}', '${personal.address_id}', '${personal.title}', '${personal.type}', '${personal.name}', '${personal.surname}', '${personal.nationality}', '${personal.race}', '${personal.birthday}', '${personal.personal_id}', '${personal.card_issued}', '${personal.card_expipe}', '${personal.phone}','${personal.fax}','${personal.update}','${personal.is_deleted}'`
            let column = 'PERSONAL_ID, ADDRESS_ID, PERSONAL_TITLE, PERSONAL_TYPE, PERSONAL_NAME, PERSONAL_SURNAME, PERSONAL_NATIONALITY, PERSONAL_RACE, PERSONAL_BIRTHDAY, PERSONAL_PERSONAL_ID, PERSONAL_CARD_ISSUED, PERSONAL_CARD_EXPIRE, PERSONAL_PHONE, PERSONAL_FAX, PERSONAL_UPDATE, PERSONAL_IS_DELETED'
            let query = `INSERT INTO personal(${column}) VALUES (${value})`
            con.query(query, function (err, result) {
                if (err) {
                    return resolve(err.code)
                }
                return resolve(`true`)
            })
        })
    }
    getPersonal(id,name,surname){
        return new Promise((resolve, reject) => {
            let value = 'PERSONAL_TITLE,PERSONAL_NAME,PERSONAL_SURNAME,PERSONAL_PERSONAL_ID,ADDRESS_ID'
            let condition = `PERSONAL_PERSONAL_ID LIKE '%${id}%' AND PERSONAL_NAME LIKE '%${name}%' AND PERSONAL_SURNAME LIKE '%${surname}%'`
            let query = `SELECT ${value} FROM personal WHERE ${condition}`
            con.query(query, function (err, result) {
                console.log(result)
                if (err) {
                    console.log(err.code)
                }else{
                    return resolve(result)
                }
            })
        })
    }
}   


module.exports = PersonalDAO