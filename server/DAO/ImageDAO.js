var mysql = require('mysql')
var con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: "web_database"
})

class ImageDAO {
    insertImage(image) {
        return new Promise((resolve, reject) => {
            let clounm = `IMAGE_NAME, IMAGE_TYPE, IMAGE_DATA`
            let value  = `'${image.name}', '${image.type}', '${image.data}'`
            let query = `INSERT INTO image(${clounm}) VALUES (${value})`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err.code) 
                }
                return resolve(result)
            })
        })
    }
    getImageByImage(name){
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM image WHERE IMAGE_NAME='${name}'`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err.code) 
                }
                return resolve(result)
            })
        })
    }
}

module.exports = ImageDAO