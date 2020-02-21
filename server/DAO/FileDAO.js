var mysql = require('mysql')
var con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: "web_database",
    timeout: 0
})
class FileDAO {
    insert(file) {
        return new Promise((resolve, reject) => {
            var query = "INSERT INTO `file` SET ?"
                ,
                values = {
                    File_name: file.name,
                    File_data: file.data
                };
            con.query(query, values, function (err, result) {
                if (err) {
                    console.log(err)
                }
                console.log(result)
                // if (result.affectedRows === 1) {
                //     return resolve(true)
                // } else {
                //     return resolve(false)
                // }

                return resolve(true)
            })
        })
    }
    update(file) {
        return new Promise((resolve, reject) => {
            let text = 'UPDATE `file` SET ? WHERE File_name = '
            text = text + `'${file.name}'`
            let query = text
                ,
                values = {
                    File_name: file.name,
                    File_data: file.data
                };
            con.query(query, values, function (err, result) {
                if (err) {
                    console.log(err)
                }
                if (result.affectedRows === 1) {
                    return resolve(true)
                } else {
                    return resolve(false)
                }

            })
        })
    }
    getfile(id) {
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM file WHERE File_name = '${id}'`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err)
                }
                if (result.length != 0 && result[0].File_data != null) {
                    return resolve(true)
                } else {
                    return resolve(false)
                }

            })
        })
    }
    getfileByid(id) {
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM file WHERE File_name = '${id}'`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err)
                }
                if (result.length != 0 ) {
                    return resolve(true)
                } else {
                    return resolve(false)
                }

            })
        })
    }
}
module.exports = FileDAO