var mysql = require('mysql')
var con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: "web_database"
})

class ImageDAO {
    insertImage(image) {
        console.log(image)
        return new Promise((resolve, reject) => {
            var query = "INSERT INTO `image` SET ?"
                ,
                values = {
                    IMAGE_NAME: image.name,
                    IMAGE_TYPE: image.type,
                    IMAGE_DATA: image.data
                };
            con.query(query, values, function (err, result) {
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