const PersonalDAO = require('../DAO/PersonalDAO')
const PersonalDAOObj = new PersonalDAO()
const ImageDAO = require('../DAO/ImageDAO')
const ImageDAOObj = new ImageDAO()
const AddressDAO = require('../DAO/AddressDAO')
const AddressDAOObj = new AddressDAO()
const LoginDAO = require('../DAO/UserDAO')
const LoginDAOObj = new LoginDAO()
const ReferenceDAO = require('../DAO/ReferenceDAO')
const ReferenceDAOObj = new ReferenceDAO()
const TrainDAO = require('../DAO/TrainDAO')
const TrainDAOObj = new TrainDAO()

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
                        if (num > 10 && num < 100) {
                            newId = `0000${num}`
                        } else {
                            newId = `000${num}`
                        }
                        break;
                    case 1000:
                        if (num > 100 && num < 1000) {
                            newId = `000${num}`
                        } else {
                            newId = `00${num}`
                        }
                        break;
                    case 10000:
                        if (num > 1000 && num < 10000) {
                            newId = `00${num}`
                        } else {
                            newId = `0${num}`
                        }
                        break;
                    case 100000:
                        if (num > 10000 && num < 100000) {
                            newId = `0${num}`
                        } else {
                            newId = `${num}`
                        }
                        break;
                    default:
                        newId = num
                        break
                }
                return resolve(sight + newId)
            }
            if (typeId === 'ADDRESS') {
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
                        if (num > 10 && num < 100) {
                            newId = `00000${num}`
                        } else {
                            newId = `0000${num}`
                        }
                        break;
                    case 1000:
                        if (num > 100 && num < 1000) {
                            newId = `0000${num}`
                        } else {
                            newId = `00${num}`
                        }
                        break;
                    case 10000:
                        if (num > 1000 && num < 10000) {
                            newId = `000${num}`
                        } else {
                            newId = `00${num}`
                        }
                        break;
                    case 100000:
                        if (num > 10000 && num < 100000) {
                            newId = `00${num}`
                        } else {
                            newId = `0${num}`
                        }
                        break;
                    case 1000000:
                        if (num > 100000 && num < 1000000) {
                            newId = `0${num}`
                        } else {
                            newId = `${num}`
                        }
                        break;
                    default:
                        newId = num
                        break
                }
                return resolve(sight + newId)
            }
            if (typeId === 'ESTABLISHMENT') {
                //format E000001 
                let sight = 'E'
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
                        if (num > 10 && num < 100) {
                            newId = `0000${num}`
                        } else {
                            newId = `000${num}`
                        }
                        break;
                    case 1000:
                        if (num > 100 && num < 1000) {
                            newId = `000${num}`
                        } else {
                            newId = `00${num}`
                        }
                        break;
                    case 10000:
                        if (num > 1000 && num < 10000) {
                            newId = `00${num}`
                        } else {
                            newId = `0${num}`
                        }
                        break;
                    default:
                        if (num > 10000 && num < 100000) {
                            newId = `0${num}`
                        } else {
                            newId = `${num}`
                        }
                        break
                }
                return resolve(sight + newId)
            }
            if (typeId === 'REQUEST') {
                //format A00001
                let sight = oldId.slice(0, oldId.length - (oldId.length - 1))
                let num = parseInt(oldId.slice(1))
                num += 1
                let newId = ''
                
                switch (this.digit(num)) {
                    case 10:
                        if (num < 10) {
                            newId = `0000${num}`
                        } else {
                            newId = `000${num}`
                        }
                        break;
                    case 100:
                        if (num > 10 && num < 100) {
                            newId = `000${num}`
                        } else {
                            newId = `00${num}`
                        }
                        break;
                    case 1000:
                        if (num > 100 && num < 1000) {
                            newId = `00${num}`
                        } else {
                            newId = `0${num}`
                        }
                        break;
                    case 10000:
                        if (num > 1000 && num < 10000) {
                            newId = `0${num}`
                        } else {
                            newId = `${num}`
                        }
                        break;
                    default:
                        newId = `${num}`
                        break
                }
                return resolve(sight + newId)
            }
            if (typeId === 'TRAIN') {
                //format FT000001
                let sight = 'FT'
                let num = parseInt(oldId.slice(2))
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
                        if (num > 10 && num < 100) {
                            newId = `0000${num}`
                        } else {
                            newId = `000${num}`
                        }
                        break;
                    case 1000:
                        if (num > 100 && num < 1000) {
                            newId = `000${num}`
                        } else {
                            newId = `00${num}`
                        }
                        break;
                    case 10000:
                        if (num > 1000 && num < 10000) {
                            newId = `00${num}`
                        } else {
                            newId = `0${num}`
                        }
                        break;
                    default:
                        if (num > 10000 && num < 100000) {
                            newId = `0${num}`
                        } else {
                            newId = `${num}`
                        }
                        break
                }
                return resolve(sight + newId)
            }
            if (typeId === 'REFERENCE') {
                //format RF00001
                let sight = 'RF'
                let num = parseInt(oldId.slice(2))
                num += 1
                let newId = ''
                
                switch (this.digit(num)) {
                    case 10:
                        if (num < 10) {
                            newId = `0000${num}`
                        } else {
                            newId = `000${num}`
                        }
                        break;
                    case 100:
                        if (num > 10 && num < 100) {
                            newId = `000${num}`
                        } else {
                            newId = `00${num}`
                        }
                        break;
                    case 1000:
                        if (num > 100 && num < 1000) {
                            newId = `00${num}`
                        } else {
                            newId = `0${num}`
                        }
                        break;
                    default:
                        if (num > 1000 && num < 10000) {
                            newId = `0${num}`
                        } else {
                            newId = `${num}`
                        }
                        break
                }
                return resolve(sight + newId)
            }
            if (typeId === 'USER') {
                //format S0001
                let sight = 'S'
                let num = parseInt(oldId.slice(1))
                num += 1
                let newId = ''
                
                switch (this.digit(num)) {
                    case 10:
                        if (num < 10) {
                            newId = `000${num}`
                        } else {
                            newId = `00${num}`
                        }
                        break;
                    case 100:
                        if (num > 10 && num < 100) {
                            newId = `00${num}`
                        } else {
                            newId = `0${num}`
                        }
                        break;
                    default:
                        if (num > 100 && num < 1000) {
                            newId = `0${num}`
                        } else {
                            newId = `${num}`
                        }
                        break;
                }
                return resolve(sight + newId)
            }
            if (typeId === 'LAND') {
                //format LE000001
                let sight = 'LE'
                let num = parseInt(oldId.slice(2))
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
                        if (num > 10 && num < 100) {
                            newId = `0000${num}`
                        } else {
                            newId = `000${num}`
                        }
                        break;
                    case 1000:
                        if (num > 100 && num < 1000) {
                            newId = `000${num}`
                        } else {
                            newId = `00${num}`
                        }
                        break;
                    case 10000:
                        if (num > 1000 && num < 10000) {
                            newId = `00${num}`
                        } else {
                            newId = `0${num}`
                        }
                        break;
                    default:
                        if (num > 10000 && num < 100000) {
                            newId = `0${num}`
                        } else {
                            newId = `${num}`
                        }
                        break
                }
                return resolve(sight + newId)
            }
        })
    }
    getSightFormType(type) {
        let sightT = ''
        switch (type) {
            case 'ใบอนุญาตจำหน่ายสินค้าในที่หรือทางสาธารณะ':
                sightT = 'A'
                break;
            case 'ใบอนุญาตเร่ขายสินค้าในที่หรือทางสาธารณะ':
                sightT = 'B'
                break;
            case 'ใบอนุญาตจัดตั้งสถานที่จำหน่ายอาหาร':
                sightT = 'C'
                break;
            case 'ใบอนุญาตจัดจัดตั้งสถานที่สะสมอาหาร':
                sightT = 'D'
                break;
            case 'หนังสือรับรองการแจ้งจัดตั้งสถานที่จำหน่ายอาหาร':
                sightT = 'E'
                break;
            case 'หนังสือรับรองการแจ้งจัดตั้งสถานที่สะสมอาหาร':
                sightT = 'F'
                break;
            case 'ใบอนุญาตให้ใช้สถานที่เป็นตลาดเอกชน':
                sightT = 'G'
                break;
            case 'กิจการที่เป็นอันตรายต่อสุขภาพ':
                sightT = 'H'
                break;
            default:
                //กิจการฌาปณสถาน
                sightT = 'I'
                break;
        }
        return sightT
    }
    getNewId(type) {
        if (type === 'PERSONAL') {
            return new Promise((resolve, reject) => {
                PersonalDAOObj.getMaxIdProsonal().then((data) => {
                    if (data[0].maxId === null) {
                        console.log('getNewId : P000001')
                        return resolve("P000001")
                    } else {
                        this.newId(data[0].maxId, 'PERSONAL').then((peronalId) => {
                            console.log('getNewId : ' + peronalId)
                            return resolve(peronalId)
                        })
                    }
                })
            })
        } 
        if (type === 'ADDRESS') {
            return new Promise((resolve, reject) => {
                AddressDAOObj.getMaxIdAddress().then((data) => {
                    if (data[0].maxId === null) {
                        console.log('getNewId : ADD0000001')
                        return resolve('ADD0000001')
                    } else {
                        this.newId(data[0].maxId, 'ADDRESS').then((addressId) => {
                            console.log('getNewId : ' + addressId)
                            return resolve(addressId)
                        })
                    }
                })
            })
        }
        if( type === 'REFERENCE'){
            return new Promise((resolve, reject) => {
                ReferenceDAOObj.getMaxIdReference().then((data) => {
                    if (data[0].maxId === null) {
                        console.log('getNewId : RF00001')
                        return resolve('RF00001')
                    } else {
                        this.newId(data[0].maxId, 'REFERENCE').then((referenceId) => {
                            console.log('getNewId : ' + referenceId)
                            return resolve(referenceId)
                        })
                    }
                })
            })
        }
        if( type === 'TRIAN'){
            return new Promise((resolve, reject) => {
                TrainDAOObj.getMaxIdTrian().then((data) => {
                    console.log(data)
                    if (data[0].maxId === null) {
                        console.log('getNewId : FT000001')
                        return resolve('FT000001')
                    } else {
                        this.newId(data[0].maxId, 'TRAIN').then((trainId) => {
                            console.log('getNewId : ' + trainId)
                            return resolve(trainId)
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
                if (data.length != 0) {
                    for (let i = 0; i < data.length; i++) {
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

                        if (i == data.length - 1) {
                            return resolve(data)
                        }
                    }
                } else {
                    return resolve('Not found')
                }

            })
        })
    }
    searchOperator(id, name, surname) {
        return new Promise((resolve, reject) => {
            this.getPersonal(id, name, surname).then((data) => {
                console.log('searchOpator : complete')
                if (data != 'Not found') {
                    for (let i = 0; i < data.length; i++) {
                        this.getAddressByAddressId(data[i].ADDRESS_ID).then((result) => {
                            data[i].AID = result[0]
                            if (i === data.length - 1) {
                                return resolve(data)
                            }
                        })
                    }
                } else {
                    return resolve(`Not found`)
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
                console.log(`search : getAddress  complete`)
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
    insertReference(reference) {
        if(reference != null){
            return new Promise((resolve, reject) => {
                ReferenceDAOObj.getReference(reference).then((referenceData) => {
                    if(referenceData.length != 0){
                        return resolve(referenceData[0])
                    }else{
                        ReferenceDAOObj.insertReference(reference).then((data) => {
                            if (data == 'true') {
                                return resolve('true')
                            } else {
                                /* Duplicate Key : ER_DUP_ENTRY */
                                return resolve('false')
                            }
                        })
                    }
                })
                
            })
        }
    }
    loopInsertReference(reference) {
        return new Promise((resolve, reject) => {
            this.getNewId('REFERENCE').then((id) => {
                reference.id = id
                this.insertReference(reference).then((data) => {
                    // console.log(`Data =>${data}`)
                    // console.log(data)
                    if (data.length != 0 ) {
                        console.log(data)
                        console.log(`Insert : reference complete`)
                        if(data === 'true'){
                            let referenceResult = {
                                REFERENCE_ID:id,
                                REFERENCE_TITLE: reference.title,
                                REFERENCE_NAME: reference.name,
                                REFERENCE_SURNAME: reference.surname,
                                REFERENCE_STATUS: reference.status,
                                REFERENCE_PHONE: reference.phone
                            }
                            return resolve(referenceResult)
                        }else{
                            return resolve(data)
                        }
                        
                    } else {
                        this.loopInsertReference(reference)
                    }
                })
            })
        })
    }

    loopInsertTrain(train) {
        return new Promise((resolve, reject) => {
            this.getNewId('REFERENCE').then((id) => {
                reference.id = id
                this.insertReference(reference).then((data) => {
                    // console.log(`Data =>${data}`)
                    // console.log(data)
                    if (data.length != 0 ) {
                        console.log(data)
                        console.log(`Insert : reference complete`)
                        if(data === 'true'){
                            let referenceResult = {
                                REFERENCE_ID:id,
                                REFERENCE_TITLE: reference.title,
                                REFERENCE_NAME: reference.name,
                                REFERENCE_SURNAME: reference.surname,
                                REFERENCE_STATUS: reference.status,
                                REFERENCE_PHONE: reference.phone
                            }
                            return resolve(referenceResult)
                        }else{
                            return resolve(data)
                        }
                        
                    } else {
                        this.loopInsertReference(reference)
                    }
                })
            })
        })
    }
    loopInsertPersonal(personal, imageFile) {
        return new Promise((resolve, reject) => {
            this.getNewId('PERSONAL').then((id) => {
                personal.id = id
                this.insertPersonal(personal).then((data) => {
                    if (data) {
                        console.log(`Insert : personal complete`)
                        if (personal.title === 'บุคคลธรรมดา') {
                            imageFile.name = personal.id
                        }
                        if (imageFile.name != 'NO_UPlOAD') {
                            imageFile.name = personal.id
                            this.insertImage(imageFile).then((data) => {
                                console.log(`Insert : image complete`)
                                if (data) {
                                    return resolve(personal.id)
                                } else {
                                    return resolve('')
                                }
                            })
                        } else {
                            console.log(`Insert : image null complete`)
                            return resolve(personal.id)
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
                        console.log(`Insert : address complete`)
                        personal.address_id = address.id
                        this.loopInsertPersonal(personal, imageFile).then((data) => {
                            if (data.length != 0) {
                                let returnTemp = {
                                    'pid': personal.id,
                                    'aid': address.id
                                }
                                return resolve(returnTemp)
                            } else {
                                return resolve(``)
                            }
                        })
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
                let year = parseInt(temp[2]) - 543
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
                let year = parseInt(temp[0]) + 543
                let format = `${day}-${month}-${year}` //16-01-2563
                return format
            }
            return date
        }
    }
    getImageByPersonalId(name) {
        return new Promise((resolve, reject) => {
            console.log(`image : getImageByPersonalId ( ${name} ) complete`)
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
            data.home_number === '' ? data.home_number = '-' : data.home_number = data.home_number
            data.moo === '' || data.moo === '-' ? data.moo = 'NULL' : data.moo = `'${data.moo}'`
            data.trxk === '' || data.trxk === '-' ? data.trxk = 'NULL' : data.trxk = `'${data.trxk}'`
            data.sxy === '' || data.sxy === '-' ? data.sxy = 'NULL' : data.sxy = `'${data.sxy}'`
            data.building === '' || data.building === '-' ? data.building = 'NULL' : data.building = `'${data.building}'`
            data.road === '' || data.road === '-' ? data.road = 'NULL' : data.road = `'${data.road}'`
            return data
        }
    }
    updateAddress(address) {
        return new Promise((resolve, reject) => {
            AddressDAOObj.updateAddress(address).then((data) => {
                if (data) {
                    console.log('function updateAddress : complete')
                    return resolve(true)
                } else {
                    console.log('function updateAddress : somthing wrog')
                    console.log(data)
                    return resolve(false)
                }
            })
        })
    }
    updatePersonal(personal) {
        return new Promise((resolve, reject) => {
            PersonalDAOObj.updatePersonal(personal).then((data) => {
                if (data) {
                    return resolve(true)
                } else {
                    return resolve(false)
                }
            })
        })
    }
    updateImage(image) {
        return new Promise((resolve, reject) => {
            ImageDAOObj.updateImage(image).then((data) => {
                if (data) {
                    return resolve(true)
                } else {
                    return resolve(false)
                }
            })
        })
    }
    updateStatusDelete(personal, username) {
        var datetime = new Date();
        let dateForUpdate = datetime.toISOString().slice(0, 10)
        personal.update = dateForUpdate
        personal.username = username

        return new Promise((resolve, reject) => {
            PersonalDAOObj.updateStatusPersonal(personal).then((data) => {
                if (data) {
                    return resolve(true)
                } else {
                    return resolve(false)
                }
            })
        })
    }
    personalStep(personal, address, image, username) {

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
        // console.log(newaddress)
        return new Promise((resolve, reject) => {
            console.log('Check function Insert Or Update')
            if (newaddress.id.length != 0 || newpersonal.id.length != 0) {
                //Update
                console.log(`function : Update`)
                this.updateAddress(newaddress).then((updateAddressStatus) => {
                    if (updateAddressStatus) {
                        console.log(`update : address complete`)
                        this.updatePersonal(newpersonal).then((updatePersonalStatus) => {
                            if (updatePersonalStatus) {
                                console.log(`update : personal complete`)
                                if (image.name != 'NO_UPlOAD') {
                                    image.name = newpersonal.id
                                    this.updateImage(image).then((data) => {
                                        if (data) {
                                            console.log(`update : image complete`)
                                            let returnTempUpdate = {
                                                'pid': newpersonal.id,
                                                'aid': newaddress.id
                                            }
                                            return resolve(returnTempUpdate)
                                        } else {
                                            console.log(`somthing wrog : updateImage`)
                                            return resolve('')
                                        }
                                    })
                                } else {
                                    let returnTempUpdate = {
                                        'pid': newpersonal.id,
                                        'aid': newaddress.id
                                    }
                                    console.log(`not updated : The picture is does't change`)
                                    return resolve(returnTempUpdate)
                                }
                            } else {
                                console.log(`something wrong : function updatePersonal()`)
                                return resolve(newpersonal.id)
                            }
                        })
                    }
                })
            } else {
                //New
                console.log(`function : Insert`)
                this.loopInsertAddress(newpersonal, newaddress, image).then((data) => {
                    if (data) {
                        return resolve(data)
                    } else {
                        return resolve('')
                    }
                })
            }

            //return resolve(true)
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