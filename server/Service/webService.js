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
        return new Promise((resolve, reject) => {
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
                return resolve(sight + newId)
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
                return resolve(sight + newId)
            }
        })
    }
    getNewId(type) {
        if (type === 'PERSONAL') {
            return new Promise((resolve, reject) => {
                PersonalDAOObj.getMaxIdProsonal().then((data) => {
                    if (data[0].maxId === null) {
                        console.log('getNewId > P000001')
                        return resolve("P000001")
                    } else {
                        this.newId(data[0].maxId, 'PERSONAL').then((peronalId) => {
                            console.log('getNewId > ' + peronalId)
                            return resolve(peronalId)
                        })
                    }
                })
            })
        } else {
            return new Promise((resolve, reject) => {
                AddressDAOObj.getMaxIdAddress().then((data) => {
                    if (data[0].maxId === null) {
                        console.log('getNewId > ADD0000001')
                        return resolve('ADD0000001')
                    } else {
                        this.newId(data[0].maxId, 'ADDRESS').then((addressId) => {
                            console.log('getNewId >' + addressId)
                            return resolve(addressId)
                        })
                    }
                })
            })
        }
    }
    getPersonal(id, name, surname) {
        return new Promise((resolve, reject) => {
            PersonalDAOObj.getPersonal(id, name, surname).then((data) => {
                let date = '0000-00-00'
                for(let i = 0 ; i < data.length ; i++){
                    if (data[i].PERSONAL_BIRTHDAY === null) {
                        data[i].PERSONAL_BIRTHDAY = undefined
                    } else {
                        date = data[i].PERSONAL_BIRTHDAY.toISOString().slice(0, 10)
                        data[i].PERSONAL_BIRTHDAY = this.formatData('TO-DISPLAY', date)
                    }
                    if (data[i].PERSONAL_CARD_ISSUED === null) {
                        data[i].PERSONAL_CARD_ISSUED = undefined
                    } else {
                        date = data[i].PERSONAL_CARD_ISSUED.toISOString().slice(0, 10)
                        data[i].PERSONAL_CARD_ISSUED = this.formatData('TO-DISPLAY', date)
                    }
                    if (data[i].PERSONAL_CARD_EXPIRE === null) {
                        data[i].PERSONAL_CARD_EXPIRE = undefined
                    } else {
                        date = data[i].PERSONAL_CARD_EXPIRE.toISOString().slice(0, 10)
                        data[i].PERSONAL_CARD_EXPIRE = this.formatData('TO-DISPLAY', date)
                    }
                        date = data[i].PERSONAL_UPDATE.toISOString().slice(0, 10)
                        data[i].PERSONAL_UPDATE = this.formatData('TO-DISPLAY', date)
                    
                    //USER_UPDATE

                    if(i == data.length - 1 ){
                        return resolve(data)
                    }
                }
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
                        if(imageFile.id != 'NO_UPlOAD') {
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
                        }else{
                            return resolve(true)
                        }
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
            ImageDAOObj.getImageByPersonalId(name).then((data) => {
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
            data.surname = '' ? data.surname = 'NULL' : data.surname = `'${data.surname}'`
            data.title === '' ? data.title = 'NULL' : data.title = `'${data.title}'`
            data.phone === '' ? data.phone = '-' : data.phone = data.phone
            data.nationality === '' ? data.nationality = 'NULL' : data.nationality = `'${data.nationality}'`
            data.race === '' ? data.race = 'NULL' : data.race = data.race = `'${data.race}'`
            data.birthday.length === 0 ? data.birthday = 'NULL' : data.birthday = data.birthday
            data.card_expipe.length === 0 ? data.card_expipe = 'NULL' : data.card_expipe = data.card_expipe
            data.fax === '' ? data.fax = 'NULL' : data.fax = `'${data.fax}'`
            data.surname === '' ? data.surname = 'NULL' : `'${data.surname}'`
            return data
        } else {
            data.moo === '' ? data.moo = 'NULL' : data.moo = `'${data.moo}'`
            data.trxk === '' ? data.trxk = 'NULL' : data.trxk = `'${data.trxk}'`
            data.sxy === '' ? data.sxy = 'NULL' : data.sxy = `'${data.sxy}'`
            data.building === '' ? data.building = 'NULL' : data.building = `'${data.building}'`
            data.road === '' ? data.road = 'NULL' : data.road = `'${data.road}'`
            return data
        }
    }
    insertStep(personal, address, image, username) {

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
            // this.loopInsertAddress(newpersonal, newaddress, image).then((data) => {
            //     if (data) {
            //         console.log(`main > ${data}`)
            //         return resolve(true)
            //     } else {
            //         return resolve(false)
            //     }
            // })
            return resolve(true)
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