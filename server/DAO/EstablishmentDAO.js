var mysql = require('mysql')
var con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: "web_database",
    timeout: 0
})
class EstablishmentDAO {
    getMaxId(){
        return new Promise((resolve, reject) => {
            let query = `SELECT MAX(ESTABLISHMENT_ID) As 'maxId' FROM establishment`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err.code) 
                }
                return resolve(result)
            })
        })
    }
    insert(em){
        return new Promise((resolve, reject) => {

            let column = `ESTABLISHMENT_ID, ADDRESS_ID, PERSONAL_ID, ESTABLISHMENT_IS_LAND_OWNED, `
            column = column + `ESTABLISHMENT_TYPE, ESTABLISHMENT_NAME, ESTABLISHMENT_MACHINE_SIZE, ESTABLISHMENT_AREA_SIZE, `
            column = column + `ESTABLISHMENT_WORKER, ESTABLISHMENT_PHONE, ESTABLISHMENT_FAX, ESTABLISHMENT_GROUND`
            let values = `'${em.id}', '${em.address_id}', '${em.perosonal_id}', ${em.is_land_owned}, ${em.type}, ${em.name}, `
            values = values + `${em.machine_size}, ${em.area_size}, ${em.worker}, '${em.phone}', ${em.fax}, ${em.grond}`
            let query = `INSERT INTO establishment(${column}) VALUES (${values})`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err.code) 
                    return resolve(err.code)
                }
                return resolve(`true`)
            })
        })
    }
}
module.exports = EstablishmentDAO