const PersonalDAO = require('../DAO/PersonalDAO')
const PersonalDAOObj = new PersonalDAO()
const ImageDAO = require('../DAO/ImageDAO')
const ImageDAOObj = new ImageDAO()
const AddressDAO = require('../DAO/AddressDAO')
const AddressDAOObj = new AddressDAO
const LoginDAO = require('../DAO/UserDAO')
const LoginDAOObj = new LoginDAO()

class service {
    getProvince() {
        return new Promise((resolve, reject) => {
            AddressDAOObj.getProvince().then((data) => {
                return resolve(data)
            })
        })
    }
    getAmphur() {
        return new Promise((resolve, reject) => {
            AddressDAOObj.getAmphur().then((data) => {
                return resolve(data)
            })
        })
    }
    getDistrict() {
        return new Promise((resolve, reject) => {
            AddressDAOObj.getDistrict().then((data) => {
                return resolve(data)
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
                AddressDAOObj.getMaxIdAddress().then((data) => {
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
    getPersonal(id, name, surname) {
        return new Promise((resolve, reject) => {
            PersonalDAOObj.getPersonal(id, name, surname).then((data) => {
                return resolve(data)

            })
        })
    }
    searchOperator(id, name, surname) {
        return new Promise((resolve, reject) => {
            this.getPersonal(id, name, surname).then((data) => {
                for (let i = 0; i < data.length; i++) {
                    this.getAddressByAddressId(data[i].ADDRESS_ID).then((result) => {
                        data[i].AID = result[0]
                        if (i === data.length - 1) {
                            return resolve(data)
                        }
                    })
                }
            })
        })
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
    getAddressByAddressId(id) {
        return new Promise((resolve, reject) => {
            AddressDAOObj.getAddressByAddressId(id).then((data) => {
                console.log(`address === null ${data[0].ADDRESS_TRXK === null}`)
                console.log(data[0].ADDRESS_TRXK)
                if (data[0].ADDRESS_MOO === null) {
                    data[0].ADDRESS_MOO = '-'
                }
                if (data[0].ADDRESS_TRXK === null) {
                    data[0].ADDRESS_TRXK = '-'
                }
                if (data[0].ADDRESS_SXY === null) {
                    data[0].ADDRESS_SXY = '-'
                }
                if (data[0].ADDRESS_BUILDING === null) {
                    data[0].ADDRESS_BUILDING = '-'
                }
                if (data[0].ADDRESS_ROAD === null) {
                    data[0].ADDRESS_ROAD = '-'
                }
                console.log(data[0].ADDRESS_TRXK)
                return resolve(data)
            })
        })
    }
    insertAddress(address) {
        return new Promise((resolve, reject) => {
            AddressDAOObj.insertAddress(address).then((data) => {
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
            //16-01-2563
            if (date != null) {
                let temp = date.split('-')
                let day = temp[0]
                let month = temp[1]
                let year = temp[2]
                let format = `${year}-${month}-${day}` //2020-01-16
                return format
            }
            return date
        }
        if (type === 'TO-DISPLAY') {
            //2563-01-04T17:00:00.000Z
            if (date != null) {
                let realdate = date.substring(0, 10);
                let temp = realdate.split('-')
                let day = temp[2]
                let month = temp[1]
                let year = temp[0]
                let format = `${day}-${month}-${year}` //16-01-2563
                return format
            }
            return date
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
    formatInsert(type, data) {
        if (type === 'PERSONAL') {
            if (data.nationality === '') {
                data.nationality = 'NULL'
            } else {
                data.nationality = `'${data.nationality}'`
            }

            if (data.race === '') {
                data.race = null
            } else {
                data.race = `'${data.race}'`
            }

            if (data.birthday.length === 0) {
                data.birthday = `NULL`
            }

            if (data.card_expipe.length === 0) {
                data.card_expipe = `NULL`
            }

            if (data.fax === '') {
                data.fax = 'NULL'
            } else {
                data.fax = `'${data.fax}'`
            }

            return data
        } else {

            if (data.moo === '') {
                data.moo = 'NULL'
            } else {
                data.moo = `'${data.moo}'`
            }

            if (data.trxk === '') {
                data.trxk = 'NULL'
            } else {
                data.trxk = `'${data.trxk}'`
            }

            if (data.sxy === '') {
                data.sxy = 'NULL'
            } else {
                data.sxy = `'${data.sxy}'`
            }

            if (data.building === '') {
                data.building = 'NULL'
            } else {
                data.building = `'${data.building}'`
            }

            if (data.road === '') {
                data.road = 'NULL'
            } else {
                data.road = `'${data.road}'`
            }

            return data
        }
    }
    insertStep(personal, address, image, username) {
        console.log(personal)
        console.log(address)

        //checknull

        var datetime = new Date();
        let dateForUpdate = datetime.toISOString().slice(0, 10)
        if (personal.birthday.length != 0) {
            personal.birthday = this.formatData('TO-INSERT', personal.birthday)
            personal.birthday = `'${personal.birthday}'`
        }

        if (personal.card_expipe.length != 0) {
            personal.card_expipe = this.formatData('TO-INSERT', personal.card_expipe)
            personal.card_expipe = `'${personal.card_expipe}'`
        }

        personal.card_issued = this.formatData('TO-INSERT', personal.card_issued)

        personal.update = dateForUpdate
        personal.username = username
        let newpersonal = this.formatInsert('PERSONAL', personal)
        let newaddress = this.formatInsert('ADDRESS', address)
        console.log(newaddress)
        console.log(newpersonal)
        return new Promise((resolve, reject) => {
            this.loopInsertAddress(newpersonal, newaddress, image).then((data) => {
                if (data) {
                    console.log(`main > ${data}`)
                    return resolve(true)
                } else {
                    return resolve(false)
                }
            })
            // return resolve(true)
        })
    }
    getUser(username, password) {
        return new Promise((resolve, reject) => {
            LoginDAOObj.getUser(username, password).then((data) => {
                return resolve(data)
            })
        })
    }
}

module.exports = service