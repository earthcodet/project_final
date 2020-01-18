const PersonalDAO = require('../DAO/PersonalDAO')
const PersonalDAOObj = new PersonalDAO()
class service {
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
            switch (this.digit(num)) {
                case 10:
                    if (num < 10) {
                        newId = `00000${num}`
                    } else {
                        newId = `0000${num}`
                    }
                    break;
                case 100:
                    newId = `000${num}`
                    break;
                case 1000:
                    newId = `00${num}`
                    break;
                case 10000:
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
            switch (this.digit(num)) {
                case 10:
                    if (num < 10) {
                        newId = `000000${num}`
                    } else {
                        newId = `00000${num}`
                    }
                    break;
                case 100:
                    newId = `0000${num}`
                    break;
                case 1000:
                    newId = `000${num}`
                    break;
                case 10000:
                    newId = `00${num}`
                    break;
                case 10000:
                    newId = `0${num}`
                    break;
                default:
                    newId = num
                    break
            }
            return sight + newId
        }
    }
    getNewId(type) {
        if (type === 'PERSONAL') {
            return new Promise((resolve, reject) => {
                PersonalDAOObj.getMaxIdProsonal().then((data) => {
                    let maxId = data[0].maxId
                    let peronalId = this.newId(maxId, 'PERSONAL')
                    // console.log(peronalId)
                    return resolve(peronalId)
                })
            })
        } else {
            return new Promise((resolve, reject) => {
                PersonalDAOObj.getMaxIdAddress().then((data) => {
                    let maxId = data[0].maxId
                    let addressId = this.newId(maxId, 'ADDRESS')
                    return resolve(addressId)
                })
            })
        }
    }
    insertAddress(personal, address) {
        return new Promise((resolve, reject) => {
            PersonalDAOObj.insertAddress(address).then((data) => {
                if (data == 'true') {
                    console.log(`ID new is use => ${address.id}`)
                    personal.address_id = address.id
                    loopInsertPersonal(personal)
                    return resolve(true)
                } else {
                    /* Duplicate Key : ER_DUP_ENTRY */
                    return resolve(false)
                }
            })
        })
    }
    insertPersonal(personal) {
        return new Promise((resolve, reject) => {
            PersonalDAOObj.insertPersonal(personal).then((data) => {
                if (data == 'true') {
                    return resolve(true)
                } else {
                    /* Duplicate Key : ER_DUP_ENTRY */
                    return resolve(false)
                }
            })
        })
    }
    loopInsertPersonal(personal) {
        this.getNewId('PERSONAL').then((id) => {
            personal.id = id
            this.insertPersonal(personal).then((data) => {
                if (data) {
                    console.log('personal insert !!')
                } else {
                    this.loopInsertPersonal(personal)
                }
            })
        })
    }
    loopInsertAddress(address, stop) {
        this.getNewId('ADDRESS').then((id) => {
            if (stop === 5) {
                address.id = id
            }
            this.insertAddress(address).then((data) => {
                if (data) {
                    console.log('address insert !!')
                } else {
                    console.log(`stop => ${stop}`)
                    this.loopInsertAddress(address,stop+1)
                }
            })
        })
    }
    insertStep(address) {
        address.id = 'ADD0000002'
        let id = this.loopInsertAddress(address,0)
    }
}

module.exports = service