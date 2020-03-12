var mysql = require('mysql')
var con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: "web_database",
    timeout: 0
})
//con.timeout = 0;
class EstablishmentDAO {
    getMaxId() {
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
    insert(em) {
        return new Promise((resolve, reject) => {
            let column = `ESTABLISHMENT_ID, ADDRESS_ID, PERSONAL_ID, ESTABLISHMENT_IS_LAND_OWNED, `
            //column = column + `ESTABLISHMENT_TYPE, ESTABLISHMENT_NAME, ESTABLISHMENT_MACHINE_SIZE, ESTABLISHMENT_AREA_SIZE, `
            column = column + `ESTABLISHMENT_NAME, ESTABLISHMENT_MACHINE_SIZE, ESTABLISHMENT_AREA_SIZE, `
            column = column + `ESTABLISHMENT_WORKER, ESTABLISHMENT_PHONE, ESTABLISHMENT_FAX, ESTABLISHMENT_GROUND`
            // let values = `'${em.id}', '${em.address_id}', '${em.perosonal_id}', ${em.is_land_owned}, ${em.type}, ${em.name}, `
            let values = `'${em.id}', '${em.address_id}', '${em.perosonal_id}', ${em.is_land_owned}, `
            em.name === '' || em.name === 'NULL' ? values = values + `'NULL', ` : values = values +`"${em.name}", `
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
    get(id) {
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM establishment WHERE ESTABLISHMENT_ID='${id}'`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err.code)
                    return resolve(err.code)
                }
                return resolve(result[0])
            })
        })
    }
    getDuplication(em, address) {
        let values = `establishment.ESTABLISHMENT_NAME `
        em.name === 'NULL' || em.name === '' ? values = values + 'IS NULL ' : values = values + `= "${em.name}" `
        values = values + `AND address.ADDRESS_HOME_NUMBER = '${address.home_number}' `
        address.moo === '' || address.moo === 'NULL' ? values = values + `AND address.ADDRESS_MOO IS NULL ` : values = values + `AND address.ADDRESS_MOO = ${address.moo} `
        address.trxk === '' || address.trxk === 'NULL' ? values = values + `AND address.ADDRESS_TRXK IS NULL ` : values = values + `AND address.ADDRESS_TRXK = ${address.trxk} `
        address.sxy === '' || address.sxy === 'NULL' ? values = values + `AND address.ADDRESS_SXY IS NULL ` : values = values + `AND address.ADDRESS_SXY = ${address.sxy} `
        address.building === '' || address.building === 'NULL' ? values = values + `AND address.ADDRESS_BUILDING IS NULL ` : values = values + `AND address.ADDRESS_BUILDING = ${address.building} `
        address.road === '' || address.road === 'NULL' ? values = values + `AND address.ADDRESS_ROAD IS NULL ` : values = values + `AND address.ADDRESS_ROAD = ${address.road} `
        values = values + ` AND address.DISTRICT_NAME = '${address.district_name}' `
        values = values + ` AND address.AMPHUR_NAME = '${address.amphur_name}' `
        values = values + ` AND address.PROVINCE_NAME = '${address.province_name}'`
        //em.type === '' || em.type === 'NULL' ? values = values + ` AND establishment.ESTABLISHMENT_TYPE IS NULL` : values = values + ` AND establishment.ESTABLISHMENT_TYPE = ${em.type}`
        values = values + ` AND establishment.ESTABLISHMENT_IS_LAND_OWNED = ${em.is_land_owned}`
        values = values + ` AND establishment.ESTABLISHMENT_MACHINE_SIZE = ${em.machine_size} `
        values = values + ` AND establishment.ESTABLISHMENT_AREA_SIZE = ${em.area_size} `
        values = values + ` AND establishment.ESTABLISHMENT_WORKER = ${em.worker} `
        values = values + ` AND establishment.ESTABLISHMENT_PHONE = '${em.phone}' `

        em.fax === '' || em.fax === 'NULL' ? values = values + ` AND establishment.ESTABLISHMENT_FAX IS NULL` : values = values + ` AND establishment.ESTABLISHMENT_FAX = ${em.fax}`
        em.grond === '' || em.grond === 'NULL' ? values = values + ` AND establishment.ESTABLISHMENT_GROUND IS NULL ` : values = values + ` AND establishment.ESTABLISHMENT_GROUND = ${em.grond} `
        values = values + `AND establishment.PERSONAL_ID = '${em.perosonal_id_st}' `
        // em.subcategory === '' || em.subcategory === 'NULL' ? values = values + ` AND request.REQUEST_SUBCATEGORY IS NULL` : values = values + ` AND request.REQUEST_SUBCATEGORY = ${em.subcategory}`
        // em.product_type === '' || em.product_type === 'NULL' ? values = values + ` AND request.REQUEST_PRODUCT_TYPE IS NULL` : values = values + ` AND request.REQUEST_PRODUCT_TYPE = ${em.product_type}`

        console.log(values)
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM establishment JOIN address ON establishment.ADDRESS_ID = address.ADDRESS_ID WHERE ${values}`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err)
                    return resolve(err)
                }
                console.log(`-------- duplication establishment --------`)
                console.log(result)
                console.log(`-------- E duplication establishment --------`)
                return resolve(result)
            })
        })
    }
    update(em) {
        return new Promise((resolve, reject) => {
            console.log(em)
            let value = `ESTABLISHMENT_IS_LAND_OWNED = ${em.is_land_owned}, `
            // value = value + `ESTABLISHMENT_TYPE=${em.type},ESTABLISHMENT_NAME=${em.name},`
            em.name === '' || em.name === 'NULL' ? value = value + `ESTABLISHMENT_NAME='NULL',` : value = value + `ESTABLISHMENT_NAME="${em.name}",`
            // value = value + `ESTABLISHMENT_NAME=${em.name},`
            value = value + `ESTABLISHMENT_MACHINE_SIZE=${em.machine_size},ESTABLISHMENT_AREA_SIZE=${em.area_size},`
            value = value + `ESTABLISHMENT_WORKER=${em.worker},`
            value = value + `ESTABLISHMENT_PHONE='${em.phone}',ESTABLISHMENT_FAX=${em.fax},`
            value = value + `ESTABLISHMENT_GROUND=${em.grond}`
            let query = `UPDATE establishment SET ${value} WHERE ESTABLISHMENT_ID='${em.id}'`
            con.query(query, function (err, result) {
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
    updateUseLand(id, use_land) {
        return new Promise((resolve, reject) => {
            let value = `ESTABLISHMENT_IS_LAND_OWNED = ${use_land}`
            let query = `UPDATE establishment SET ${value} WHERE ESTABLISHMENT_ID='${id}'`
            con.query(query, function (err, result) {
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
    updateGround(id, ground) {
        return new Promise((resolve, reject) => {
            let value = `ESTABLISHMENT_GROUND = ${ground}`
            let query = `UPDATE establishment SET ${value} WHERE ESTABLISHMENT_ID='${id}'`
            con.query(query, function (err, result) {
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
}
module.exports = EstablishmentDAO