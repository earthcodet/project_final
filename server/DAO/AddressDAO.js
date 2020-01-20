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
}
module.exports = AddressDAO;