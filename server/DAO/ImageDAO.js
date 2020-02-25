var mysql = require('mysql')
var con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: "web_database",
    timeout: 0
})
// con.timeout = 0;
class ImageDAO {
    insertImage(image) {
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
                    console.log(err)
                }
                return resolve(result)
            })
        })
    }
    updateImage(image) {
        return new Promise((resolve, reject) => {
            let text = 'UPDATE `image` SET ? WHERE IMAGE_NAME = '
            text = text + `'${image.name}'`
            let query = text
                ,
                values = {
                    IMAGE_TYPE: image.type,
                    IMAGE_DATA: image.data
                }
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
    getImageByPersonalId(id) {
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM image WHERE IMAGE_NAME = '${id}'`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err)
                }
                console.log(result)
                if (result.length != 0 && result[0].IMAGE_DATA != null) {
                    console.log(result[0].IMAGE_DATA)
                    result[0].IMAGE_DATA = Buffer.from(result[0].IMAGE_DATA, 'binary').toString('base64');
                } else {
                    result[0].IMAGE_DATA = null
                }
                return resolve(result)
            })
        })
    }
    insertImageEstablishment(image) {
        return new Promise((resolve, reject) => {
            var sql = "INSERT INTO image_establishment(E_IMAGE_NAME, E_IMAGE_TYPE, E_IMAGE_DATA) VALUES ?";
            var values = [];
            for (let i = 0; i < image.length; i++) {
                values.push([image[i].name, image[i].type, image[i].data])
            }
            con.query(sql, [values], function (err, result) {
                if (err) {
                    console.log(err)
                }
                if (result != undefined || result != null) {
                    return resolve(true)
                } else {
                    return resolve(false)
                }
            })
        })
    }
    deleteImageEstablishment(id) {
        return new Promise((resolve, reject) => {
            let query = "DELETE FROM `image_establishment` WHERE E_IMAGE_NAME LIKE " + "'%" + id + "%'"
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err)
                }
                if (result != undefined || result != null) {
                    return resolve(true)
                } else {
                    return resolve(false)
                }
            })
        })
    }
    getImageEstablishmentByImage(id) {
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM image_establishment WHERE E_IMAGE_NAME LIKE '%${id}%'`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err)
                }
                for(let i = 0 ; i< result.length ; i++){
                        result[i].E_IMAGE_DATA_BASE64 = Buffer.from(result[i].E_IMAGE_DATA, 'binary').toString('base64');
                }
                return resolve(result)
            })
        })
    }
}

module.exports = ImageDAO