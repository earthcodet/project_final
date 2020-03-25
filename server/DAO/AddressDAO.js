var mysql = require('mysql');
var con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'web_database',
    timeout: 0
});
//con.timeout = 0;
class AddressDAO {
    getProvince() {
        return new Promise((resolve, reject) => {
            con.query('SELECT * FROM province', function (err, rows) {
                if (err) {
                    throw err;
                }

                return resolve(rows);
            });
        });
    }
    getAmphur() {
        return new Promise((resolve, reject) => {
            con.query('SELECT * FROM amphur', function (err, rows) {
                if (err) {
                    throw err;
                }

                return resolve(rows);
            });
        });
    }
    getDistrict() {
        return new Promise((resolve, reject) => {
            con.query('SELECT * FROM district', function (err, rows) {
                if (err) {
                    throw err;
                }

                return resolve(rows);
            });
        });
    }
    getAddressByAddressId(aid) {
        return new Promise((resolve, reject) => {
            con.query(`SELECT * FROM address WHERE ADDRESS_ID='${aid}'`, function (err, rows) {
                if (err) {
                    throw err;
                }
                return resolve(rows);
            });
        });
    }
    insertAddress(address) {
        return new Promise((resolve, reject) => {
            let column = 'ADDRESS_ID, ADDRESS_HOME_NUMBER, ADDRESS_MOO, ADDRESS_TRXK, ADDRESS_SXY, ADDRESS_BUILDING, ADDRESS_ROAD, DISTRICT_NAME, AMPHUR_NAME, PROVINCE_NAME'
            let query = `INSERT INTO address(${column}) VALUES (?)`
            let list_value = [
                address.id,
                address.home_number,
                address.moo,
                address.trxk,
                address.sxy,
                address.building,
                address.road,
                address.district_name,
                address.amphur_name,
                address.province_name
            ]
            con.query(query,[list_value], function (err, result) {
                if (err) {
                    console.log(err)
                    return resolve(err.code)
                }
                return resolve(`true`)
            })
        })
    }
    updateAddress(address) {
        return new Promise((resolve, reject) => {
            let text = `UPDATE address SET ? WHERE ADDRESS_ID='${address.id}'`
            let query = text
            ,
            values = {
                ADDRESS_HOME_NUMBER: address.home_number,
                ADDRESS_MOO:address.moo,
                ADDRESS_TRXK:address.trxk,
                ADDRESS_SXY:address.sxy,
                ADDRESS_BUILDING:address.building,
                ADDRESS_ROAD:address.road,
                DISTRICT_NAME:address.district_name,
                AMPHUR_NAME:address.amphur_name,
                PROVINCE_NAME:address.province_name
            }
            con.query(query,values, function (err, result) {
                if (err) {
                    console.log(`DAO message : updateAddress error ${err.code}`)
                    console.log(err)
                }
                if (result.affectedRows === 1) {
                    return resolve(true)
                } else {
                    console.log(`DAO message : updateAddress result.affectedRows != 1`)
                    console.log(address)
                    console.log(result)
                    return resolve(false)
                }
            })
        })
    }
    getMaxIdAddress() {
        return new Promise((resolve, reject) => {
            let query = `SELECT MAX(ADDRESS_ID) As 'maxId' FROM address`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err)
                }
                return resolve(result)
            })
        })
    }
}



module.exports = AddressDAO;