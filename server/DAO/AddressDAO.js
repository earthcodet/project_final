var mysql = require('mysql');
var con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'web_database'
});
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
    getAddressByAddressId(aid){
        return new Promise((resolve, reject) => {
            con.query(`SELECT * FROM address WHERE ADDRESS_ID='${aid}'`, function (err, rows) {
                if (err) {
                    throw err;
                }
                return resolve(rows);
            });
        });
    }
    insertAddress(address){
        return new Promise((resolve, reject) => {
            let value  = `'${address.id}', '${address.home_number}', ${address.moo}, ${address.trxk}, ${address.sxy}, ${address.building}, ${address.road}, '${address.district_name}', '${address.amphur_name}', '${address.province_name}'`
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
}
module.exports = AddressDAO;