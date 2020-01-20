const PersonalDAO = require('../DAO/PersonalDAO')
const PersonalDAOObj = new PersonalDAO()
const ImageDAO = require('../DAO/ImageDAO')
const ImageDAOObj = new ImageDAO()
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
                    if (data[0].maxId === null) {
                        let peronalId = "P000001"
                        console.log('getNewId >' + peronalId)
                        return resolve(peronalId)
                    } else {
                        let maxId = data[0].maxId
                        let peronalId = this.newId(maxId, 'PERSONAL')
                        console.log('getNewId >' + peronalId)
                        return resolve(peronalId)
                    }
                })
            })
        } else {
            return new Promise((resolve, reject) => {
                PersonalDAOObj.getMaxIdAddress().then((data) => {
                    if (data[0].maxId === null) {
                        let addressId = 'ADD0000001'
                        console.log('getNewId >' + addressId)
                        return resolve(addressId)
                    } else {
                        let maxId = data[0].maxId
                        let addressId = this.newId(maxId, 'ADDRESS')
                        console.log('getNewId >' + addressId)
                        return resolve(addressId)
                    }
                })
            })
        }
    }
    getPersonalId(id) {
        return new Promise((resolve, reject) => {
            PersonalDAOObj.getPersonalId(id).then((data) => {
                console.log(`service status => ${data}`)
                if (data) {
                    return resolve(true)
                } else {
                    return resolve(false)
                }

            })
        })
    }
    insertAddress(address) {
        return new Promise((resolve, reject) => {
            PersonalDAOObj.insertAddress(address).then((data) => {
                if (data == 'true') {
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
    loopInsertPersonal(personal, imageFile) {
        return new Promise((resolve, reject) => {
            this.getNewId('PERSONAL').then((id) => {
                personal.id = id
                this.insertPersonal(personal).then((data) => {
                    if (data) {
                        console.log(`loopInsertPersonal > personal insert !! ${data}`)
                        imageFile.name = personal.id
                        this.insertImage(imageFile).then((data) => {
                            console.log(`loopInsertPersonal >image insert !! ${data}`)
                            if (data) {
                                return resolve(true)
                            } else {
                                return resolve(false)
                            }
                        })
                    } else {
                        this.loopInsertPersonal(personal)
                    }
                })
            })
        })
    }
    loopInsertAddress(personal, address, imageFile) {
        return new Promise((resolve, reject) => {
            this.getNewId('ADDRESS').then((id) => {
                address.id = id
                this.insertAddress(address).then((data) => {
                    if (data) {
                        personal.address_id = address.id
                        this.loopInsertPersonal(personal, imageFile).then((data) => {
                            if (data) {
                                return resolve(true)
                            } else {
                                return resolve(false)
                            }
                        })
                        console.log(`loopInsertAddress => address insert !! ${data}`)
                    } else {
                        this.loopInsertAddress(address)
                    }
                })
            })
        })
    }

    formatData(type, date) {
        if (type === 'TO-INSERT') {
            //16/01/2020
            let temp = date.split('/')
            let day = temp[0]
            let month = temp[1]
            let year = temp[2]
            let format = `${year}-${month}-${day}` //2020-01-16
            return format
        }
        if (type === 'TO-DISPLAY') {
            //2563-01-16
            let temp = date.split('-')
            let day = temp[0]
            let month = temp[1]
            let year = temp[2]
            let format = `${day}-${month}-${year}` //16/01/2563
            return format
        }
    }
    getImageByPersonalId(name) {
        return new Promise((resolve, reject) => {
            ImageDAOObj.getImageByImage(name).then((data) => {
                return resolve(data)
            })
        })
    }
    insertImage(image) {
        return new Promise((resolve, reject) => {
            ImageDAOObj.insertImage(image).then((data) => {
                return resolve(true)
            })
        })
    }
    insertStep(personal, address, image) {
        var datetime = new Date();
        console.log(datetime.toISOString().slice(0, 10));
        let dateForUpdate = datetime.toISOString().slice(0, 10)
        personal.birthday = this.formatData('TO-INSERT', personal.birthday)
        personal.card_issued = this.formatData('TO-INSERT', personal.card_issued)
        personal.card_expipe = this.formatData('TO-INSERT', personal.card_expipe)
        personal.update = dateForUpdate
        return new Promise((resolve, reject) => {
            this.loopInsertAddress(personal, address, image).then((data) => {
                if (data) {
                    console.log(`main > ${data}`)
                    return resolve(true)
                } else {
                    return resolve(false)
                }
            })
        })
    }
}

module.exports = service