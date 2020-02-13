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
                    console.log(err.code)
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
}
module.exports = FileDAO