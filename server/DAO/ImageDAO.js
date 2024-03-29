var mysql = require('mysql')
var con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: "web_database",
    timeout: 0
})
//con.timeout = 0;
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
        console.log("update Image #image")
        console.log(image)
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
                if (result.length != 0 && result[0].IMAGE_DATA != null) {
                    if (result[0] != undefined) {
                        result[0].IMAGE_DATA = Buffer.from(result[0].IMAGE_DATA, 'binary').toString('base64');
                    }
                } else {
                    if (result[0] != undefined) {
                        result[0].IMAGE_DATA = null
                    }
                }
                return resolve(result)
            })
        })
    }
    //user
    insertImageUser(image) {
        return new Promise((resolve, reject) => {
            var query = "INSERT INTO `user_image` SET ?"
                ,
                values = {
                    S_IMAGE_NAME : image.name,
                    S_IMAGE_TYPE: image.type,
                    S_IMAGE_DATA: image.data
                };
            con.query(query, values, function (err, result) {
                if (err) {
                    console.log(err)
                }
                return resolve(result)
            })
        })
    }
    updateImageUser(image) {
        console.log("update Image #image")
        console.log(image)
        return new Promise((resolve, reject) => {
            let text = 'UPDATE `user_image` SET ? WHERE S_IMAGE_NAME = '
            text = text + `'${image.name}'`
            let query = text
                ,
                values = {
                    S_IMAGE_TYPE: image.type,
                    S_IMAGE_DATA: image.data
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
    getImageUser(id) {
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM user_image WHERE S_IMAGE_NAME = '${id}'`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err)
                }
                if (result.length != 0 && result[0].S_IMAGE_DATA != null) {
                    if (result[0] != undefined) {
                        result[0].S_IMAGE_DATA = Buffer.from(result[0].S_IMAGE_DATA, 'binary').toString('base64');
                    }
                } else {
                    if (result[0] != undefined) {
                        result[0].S_IMAGE_DATA = null
                    }
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
                for (let i = 0; i < result.length; i++) {
                    result[i].E_IMAGE_DATA_BASE64 = Buffer.from(result[i].E_IMAGE_DATA, 'binary').toString('base64');
                }
                return resolve(result)
            })
        })
    }
    getImageUserNayo(n_id) {
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM user_image WHERE S_IMAGE_NAME = '${n_id}'`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err)
                }
                if (result.length != 0) {
                    if (result[0].S_IMAGE_DATA != undefined) {
                        result[0].S_IMAGE_DATA = Buffer.from(result[0].S_IMAGE_DATA, 'binary').toString('base64');
                    }
                    return resolve(result)
                } else {
                    return resolve(result)
                }
            })
        })
    }
    insertImageComplaint(image) {
        return new Promise((resolve, reject) => {
            var sql = "INSERT INTO complaint_image(COMPLAINT_IMAGE_NAME , COMPLAINT_IMAGE_TYPE, COMPLAINT_IMAGE_DATA) VALUES ?";
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
    deleteImageComplaint(id) {
        return new Promise((resolve, reject) => {
            let query = "DELETE FROM `complaint_image` WHERE COMPLAINT_IMAGE_NAME LIKE " + "'%" + id + "%'"
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
    getImageComplaintByImage(id) {
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM complaint_image WHERE COMPLAINT_IMAGE_NAME LIKE '%${id}%'`
            con.query(query, function (err, result) {
                if (err) {
                    console.log(err)
                }
                for (let i = 0; i < result.length; i++) {
                    result[i].COMPLAINT_IMAGE_DATA_BASE64 = Buffer.from(result[i].COMPLAINT_IMAGE_DATA, 'binary').toString('base64');
                }
                return resolve(result)
            })
        })
    }
}

module.exports = ImageDAO