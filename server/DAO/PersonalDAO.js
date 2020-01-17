var mysql = require('mysql')
var con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: "web_database"
})

class PersonalDAO {
    getMaxIdProsonal() {
        return new Promise((resolve, reject) => {
            let query = `SELECT MAX(PERSONAL_ID) FROM 'personal'`
            con.query(query, function (err, result) {
                if (err) {
                    throw err
                }
                return resolve(result)
            })
        })
    }
    getMaxIdAddress() {
        return new Promise((resolve, reject) => {
            let query = `SELECT MAX(ADDRESS_ID) FROM 'address'`
            con.query(query, function (err, result) {
                if (err) {
                    throw err
                }
                return resolve(result)
            })
        })
    }
    digit(v) {
        return Math.pow(10, Math.ceil(Math.log10(v)));
    }
    newId(oldId, typeId) {
        if (typeId === 'PERSONAL') {
            // format = P000001
            let sight = 'P'
            let num = parseInt(oldId.slice(1))
            num += 1
            let newId = ''

            switch (num) {
                case num < 10:
                    newId = `00000${num}`
                    break
                case roundup(num) === 10 && num > 9:
                    newId = `0000${num}`
                    break;
                case roundup(num) === 100:
                    newId = `000${num}`
                    break;
                case roundup(num) === 1000:
                    newId = `00${num}`
                    break;
                case roundup(num) === 10000:
                    newId = `0${num}`
                    break;
                default:
                    newId = num
                    break
            }
            return sight + newId
        } else {
            //ADDRESS
            //format ADD0000001
            //100 000 0
            //0 000 001
            let sight = 'ADD'
            let num = parseInt(oldId.slice(3))
            num += 1
            let newId = ''

            switch (num) {
                case num < 10:
                    newId = `000000${num}`
                    break
                case roundup(num) === 10 && num > 9:
                    newId = `00000${num}`
                    break;
                case roundup(num) === 100:
                    newId = `0000${num}`
                    break;
                case roundup(num) === 1000:
                    newId = `000${num}`
                    break;
                case roundup(num) === 10000:
                    newId = `00${num}`
                    break;
                case roundup(num) === 10000:
                    newId = `0${num}`
                    break;
                default:
                    newId = num
                    break
            }
            return sight + newId
        }
    }
}


module.exports = PersonalDAO