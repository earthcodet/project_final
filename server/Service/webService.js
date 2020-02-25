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
const EstablishmentDAO = require('../DAO/EstablishmentDAO')
const EstablishmentDAOObj = new EstablishmentDAO()
const LandDAO = require('../DAO/LandDAO')
const LandDAOObj = new LandDAO()
const FileDAO = require('../DAO/FileDAO')
const FileDAOObj = new FileDAO()
const RequestTypeDAO = require('../DAO/RequestTypeDAO')
const RequestTypeDAOObj = new RequestTypeDAO()
const RequestDAO = require('../DAO/RequestDAO')
const RequestDAOObj = new RequestDAO()
const TransferDAO = require('../DAO/TransferDAO')
const TransferDAOObj = new TransferDAO()
const PrintDAO = require('../DAO/PrintDAO')
const PrintDAOObj = new PrintDAO()

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
            case 'ใบอนุญาตจัดตั้งสถานที่สะสมอาหาร':
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
    getNewId(type, menu) {
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
        if (type === 'REFERENCE') {
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
        if (type === 'TRIAN') {
            return new Promise((resolve, reject) => {
                TrainDAOObj.getMaxIdTrian().then((data) => {
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
        if (type === 'ESTABLISHMENT') {
            return new Promise((resolve, reject) => {
                EstablishmentDAOObj.getMaxId().then((data) => {
                    if (data[0].maxId === null) {
                        console.log('getNewId : E000001')
                        return resolve('E000001')
                    } else {
                        this.newId(data[0].maxId, 'ESTABLISHMENT').then((EstablishmentId) => {
                            console.log('getNewId : ' + EstablishmentId)
                            return resolve(EstablishmentId)
                        })
                    }
                })
            })
        }
        if (type === 'LAND') {
            return new Promise((resolve, reject) => {
                LandDAOObj.getMaxId().then((data) => {
                    if (data[0].maxId === null) {
                        console.log('getNewId : LE000001')
                        return resolve('LE000001')
                    } else {
                        this.newId(data[0].maxId, 'LAND').then((landId) => {
                            console.log('getNewId : ' + landId)
                            return resolve(landId)
                        })
                    }
                })
            })
        }
        if (type === 'REQUEST') {
            return new Promise((resolve, reject) => {
                let year = parseInt(new Date().toISOString().slice(0, 4)) + 543
                let sight = this.getSightFormType(menu)
                RequestDAOObj.getMaxId(sight, year).then((data) => {
                    if (data[0].maxId === null) {
                        //#00001
                        console.log(`getNewId : ${sight}00001`)
                        return resolve(`${sight}00001`)
                    } else {
                        this.newId(data[0].maxId, 'REQUEST').then((RequestId) => {
                            console.log('getNewId : ' + RequestId)
                            return resolve(RequestId)
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
                            data[i].PERSONAL_BIRTHDAY = this.formatDate('TO-DISPLAY', date)
                        }
                        if (data[i].PERSONAL_CARD_ISSUED === null) {
                            data[i].PERSONAL_CARD_ISSUED = undefined
                        } else {
                            date = data[i].PERSONAL_CARD_ISSUED.toISOString().slice(0, 10)
                            data[i].PERSONAL_CARD_ISSUED = this.formatDate('TO-DISPLAY', date)
                        }
                        if (data[i].PERSONAL_CARD_EXPIRE === null) {
                            data[i].PERSONAL_CARD_EXPIRE = undefined
                        } else {
                            date = data[i].PERSONAL_CARD_EXPIRE.toISOString().slice(0, 10)
                            data[i].PERSONAL_CARD_EXPIRE = this.formatDate('TO-DISPLAY', date)
                        }
                        date = data[i].PERSONAL_UPDATE.toISOString().slice(0, 10)
                        data[i].PERSONAL_UPDATE = this.formatDate('TO-DISPLAY', date)

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
    getPersonalById(id) {
        return new Promise((resolve, reject) => {
            PersonalDAOObj.getPersonalByPersonalId(id).then((result) => {
                return resolve(result)
            })
        })
    }
    getPersonalAndAddressById(id) {
        // เจอแบบ 100 % ID มาจากคำขอ
        return new Promise((resolve, reject) => {
            PersonalDAOObj.getPersonalByPersonalId(id).then((result) => {
                this.getAddressByAddressId(result[0].ADDRESS_ID).then((address_data) => {
                    result[0].AID = address_data[0]
                    return resolve(result)
                })
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
        return new Promise((resolve, reject) => {
            ReferenceDAOObj.getReference(reference).then((referenceData) => {
                if (referenceData.length != 0) {
                    return resolve(referenceData[0])
                } else {
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
    loopInsertReference(reference) {
        return new Promise((resolve, reject) => {
            this.getNewId('REFERENCE').then((id) => {
                reference.id = id
                this.insertReference(reference).then((data) => {
                    if (data.length != 0) {
                        console.log(`Insert : reference complete`)
                        if (data === 'true') {
                            let referenceResult = {
                                REFERENCE_ID: id,
                                REFERENCE_TITLE: reference.title,
                                REFERENCE_NAME: reference.name,
                                REFERENCE_SURNAME: reference.surname,
                                REFERENCE_STATUS: reference.status,
                                REFERENCE_PHONE: reference.phone
                            }
                            return resolve(referenceResult)
                        } else {
                            return resolve(data)
                        }

                    } else {
                        this.loopInsertReference(reference)
                    }
                })
            })
        })
    }
    getReferenceByReferenceId(id) {
        return new Promise((resolve, reject) => {
            ReferenceDAOObj.getReferenceById(id).then((getReferenceData) => {
                return resolve(getReferenceData)
            })
        })
    }
    getTrainByTrainId(id) {
        return new Promise((resolve, reject) => {
            TrainDAOObj.getTrian(id).then((trainData) => {
                console.log(trainData[0] != undefined)
                if (trainData[0] != undefined) {
                    trainData[0].TRAIN_DATE_EXP = this.formatDate('TO-DISPLAY', trainData[0].TRAIN_DATE_EXP.toISOString().slice(0, 10))
                    trainData[0].TRAIN_DATE_ISSUED = this.formatDate('TO-DISPLAY', trainData[0].TRAIN_DATE_ISSUED.toISOString().slice(0, 10))
                }
                return resolve(trainData)
            })
        })
    }
    insertTrain(train) {
        return new Promise((resolve, reject) => {
            TrainDAOObj.getTrianDuplication(train).then((trainData) => {
                if (trainData.length != 0) {
                    trainData[0].TRAIN_DATE_EXP = this.formatDate('TO-DISPLAY', trainData[0].TRAIN_DATE_EXP.toISOString().slice(0, 10))
                    trainData[0].TRAIN_DATE_ISSUED = this.formatDate('TO-DISPLAY', trainData[0].TRAIN_DATE_ISSUED.toISOString().slice(0, 10))
                    return resolve(trainData[0])
                } else {
                    TrainDAOObj.insertTrian(train).then((data) => {
                        if (data == 'true') {
                            return resolve('true')
                        } else {
                            /* Duplicate Key : ER_DUP_ENTRY */
                            console.log(`ERROR INSERT TRAIN : ${data}`)
                            return resolve('false')
                        }
                    })
                }
            })
        })
    }
    loopInsertTrain(train) {
        //Mian InsertTrain
        return new Promise((resolve, reject) => {
            this.getNewId('TRIAN').then((id) => {
                train.id = id
                train.date_exp = this.formatDate('TO-INSERT', train.date_exp)
                train.date_issued = this.formatDate('TO-INSERT', train.date_issued)
                this.insertTrain(train).then((data) => {
                    if (data.length != 0) {
                        console.log(`Insert : train complete`)
                        if (data === 'true') {
                            let trainResult = {
                                TRAIN_ID: train.id,
                                TRAIN_ISSUED: train.issuse,
                                TRAIN_DATE_EXP: this.formatDate('TO-DISPLAY', train.date_exp),
                                TRAIN_DATE_ISSUED: this.formatDate('TO-DISPLAY', train.date_issued)
                            }
                            return resolve(trainResult)
                        } else {
                            return resolve(data)
                        }

                    } else {
                        this.loopInsertTrain(train)
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
    createIdImage(item, MASK) {
        for (let i = 1; i <= item.length; i++) {
            item[i - 1].name = `${MASK}-0${i}`
        }
        return item
    }
    insertImageEstablishments(image, id) {
        let newImage = this.createIdImage(image, id)
        return new Promise((resolve, reject) => {
            ImageDAOObj.deleteImageEstablishment(id).then((data) => {
                if (data) {
                    ImageDAOObj.insertImageEstablishment(newImage).then((result) => {
                        return resolve(result)
                    })
                }
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
    formatDate(type, date) {
        if (type === 'TO-INSERT') {
            //16-01-2563
            if (date != null) {
                let temp = date.split('-')
                let day = temp[0]
                let month = temp[1]
                let year = parseInt(temp[2]) > 2300 ? temp[2] - 543 : temp[2]
                let format = `${year}-${month}-${day}` //2020-01-16
                return format
            }
            return date
        }
        if (type === 'TO-DISPLAY') {
            //2020-05-29T17:00:00.000Z
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
    formatTime(ttime) {
        //13:48:00.000
        if (ttime != null) {
            let format = ttime.slice(0, 8) //15:10:14
            return format
        }
        return ttime
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
            data.nationality === '' || data.nationality === '-' ? data.nationality = 'NULL' : data.nationality = `'${data.nationality}'`
            data.race === '' || data.race === '-' ? data.race = 'NULL' : data.race = data.race = `'${data.race}'`
            data.birthday.length === 0 ? data.birthday = 'NULL' : data.birthday = data.birthday
            data.card_expipe.length === 0 ? data.card_expipe = 'NULL' : data.card_expipe = data.card_expipe
            data.fax === '' || data.fax === '-' ? data.fax = 'NULL' : data.fax = `'${data.fax}'`
            data.surname === '' ? data.surname = 'NULL' : `'${data.surname}'`
            return data
        }
        if (type === 'ADDRESS') {
            data.home_number === '' ? data.home_number = '-' : data.home_number = data.home_number
            data.moo === '' || data.moo === '-' ? data.moo = 'NULL' : data.moo = `'${data.moo}'`
            data.trxk === '' || data.trxk === '-' ? data.trxk = 'NULL' : data.trxk = `'${data.trxk}'`
            data.sxy === '' || data.sxy === '-' ? data.sxy = 'NULL' : data.sxy = `'${data.sxy}'`
            data.building === '' || data.building === '-' ? data.building = 'NULL' : data.building = `'${data.building}'`
            data.road === '' || data.road === '-' ? data.road = 'NULL' : data.road = `'${data.road}'`
            return data
        }

        if (type === 'ESTABLISHMENT') {
            data.reference_id = data.reference_id === '' ? 'NULL' : 'YES'
            data.train_id = data.train_id === '' || data.train_id === 'NO' ? 'NULL' : 'YES'
            data.is_land_owned === 'NO' ? data.is_land_owned = 'NULL' : data.is_land_owned = `'${data.is_land_owned}'`
            data.type === '' ? data.type = 'NULL' : data.type = `'${data.type}'`
            data.name === '' ? data.name = 'NULL' : data.name = `'${data.name}'`

            data.machine_size === '' ? data.machine_size = 0 : ''
            data.area_size === '' ? data.area_size = 0 : ''
            data.worker === '' ? data.worker = 0 : ''

            data.fax === '' || data.fax === '-' ? data.fax = 'NULL' : data.fax = `'${data.fax}'`
            data.grond === '' ? data.grond = 'NULL' : data.grond = `'${data.grond}'`
            return data
        }
        if (type === 'LAND') {
            data.birthday === '' ? data.birthday = 'NULL' : data.birthday = `'${this.formatDate("TO-INSERT", data.birthday)}'`
            return data
        }
        if (type === 'REQUEST') {
            //Time Database 15:10:14
            //Time Web 13:48:00.000
            //Time  = time.slice(0,8)
            data.staff_id_money = data.staff_id_money === '-' || data.staff_id_money === '' ? 'NULL' : `'${data.staff_id_money}'`
            data.reference_id = data.reference_id === '-' || data.reference_id === '' || data.reference_id === 'NO' ? 'NULL' : `'${data.reference_id}'`
            data.train_id = data.train_id === '-' || data.train_id === '' || data.train_id === 'NO' ? 'NULL' : `'${data.train_id}'`
            data.personal_id_assistant = data.personal_id_assistant === '-' || data.personal_id_assistant === '' ? 'NULL' : `'${data.personal_id_assistant}'`
            data.staff_id_approve = data.staff_id_approve === '-' || data.staff_id_approve === '' ? 'NULL' : `'${data.staff_id_approve}'`
            data.date_submission = this.formatDate('TO-INSERT', data.date_submission)
            data.date_approve = data.date_approve === '-' || data.date_approve === '' ? 'NULL' : `'${this.formatDate('TO-INSERT', data.date_approve)}'`
            data.subcategory = data.subcategory === '-' || data.subcategory === '' ? 'NULL' : `'${data.subcategory}'`
            data.product_type = data.product_type === '-' || data.product_type === '' ? 'NULL' : `'${data.product_type}'`
            data.sell_start = data.sell_start === '-' || data.sell_start === '' ? 'NULL' : `'${this.formatTime(data.sell_start)}'`
            data.sell_end = data.sell_end === '-' || data.sell_end === '' ? 'NULL' : `'${this.formatTime(data.sell_end)}'`
            data.receipt_order = data.receipt_order === '-' || data.receipt_order === '' ? 'NULL' : `'${data.receipt_order}'`

            if (data.receipt_fine != '' && data.receipt_fine != '-') {
                if (data.receipt_fee != '' && data.receipt_fee != '-') {
                    data.receipt_total = parseFloat(data.receipt_fine) + parseFloat(data.receipt_fee)
                } else {
                    data.receipt_total = parseFloat(data.receipt_fine)
                }
            } else {
                data.receipt_total = 0
            }
            data.receipt_fine = data.receipt_fine === '-' || data.receipt_fine === '' ? 'NULL' : data.receipt_fine
            data.receipt_fee = data.receipt_fee === '-' || data.receipt_fee === '' ? 'NULL' : data.receipt_fee
            data.receipt_date = data.receipt_date === '-' || data.receipt_date === '' ? 'NULL' : `'${this.formatDate('TO-INSERT', data.receipt_date)}'`
            data.date_issued = data.date_issued === '-' || data.date_issued === '' ? 'NULL' : `'${this.formatDate('TO-INSERT', data.date_issued)}'`
            data.date_expired = data.date_expired === '-' || data.date_expired === '' ? 'NULL' : `'${this.formatDate('TO-INSERT', data.date_expired)}'`

            data.condition_no_1 = data.condition_no_1 === '-' || data.condition_no_1 === '' ? 'NULL' : `'${data.condition_no_1}'`
            data.condition_no_2 = data.condition_no_2 === '-' || data.condition_no_2 === '' ? 'NULL' : `'${data.condition_no_2}'`
            data.condition_no_3 = data.condition_no_3 === '-' || data.condition_no_3 === '' ? 'NULL' : `'${data.condition_no_3}'`
            data.condition_no_4 = data.condition_no_4 === '-' || data.condition_no_4 === '' ? 'NULL' : `'${data.condition_no_4}'`

            data.image_name = data.image_name === '-' || data.image_name === '' ? 'NULL' : `'${data.image_name}'`
            data.delete_logic = data.delete_logic === '-' || data.delete_logic === '' ? 'NULL' : `'${data.delete_logic}'`
            return data
        }
    }
    loopInsertEstablishment(Edata) {
        return new Promise((resolve, reject) => {
            this.getNewId('ESTABLISHMENT').then((newId) => {
                Edata.id = newId
                EstablishmentDAOObj.insert(Edata).then((data) => {
                    if (data === 'true') {
                        console.log('function insertEstablishment : complete')
                        return resolve(Edata)
                    } else {
                        // key duplication 
                        this.loopInsertEstablishment(Edata)
                    }
                })
            })
        })
    }
    insertAddressOne(address) {
        return new Promise((resolve, reject) => {
            this.getNewId('ADDRESS').then((id) => {
                address.id = id
                this.insertAddress(address).then((data) => {
                    if (data) {
                        console.log(`Insert : address complete`)
                        let result = {
                            check: true,
                            id: address.id
                        }
                        return resolve(result)
                    } else {
                        this.insertAddressOne(address)
                    }
                })
            })
        })
    }
    insertEstablishment(Edata, address, land, addressOwner, file) {
        //Main personal set 
        let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
        let new_address = this.formatInsert('ADDRESS', address)
        let new_addressOwner = this.formatInsert('ADDRESS', addressOwner)
        let new_land = this.formatInsert('LAND', land)
        return new Promise((resolve, reject) => {
            EstablishmentDAOObj.getDuplication(Edata, address).then((establishmentData) => {
                if (establishmentData.length != 0) {
                    new_edata.id = establishmentData[0].ESTABLISHMENT_ID
                    new_edata.address_id = establishmentData[0].ADDRESS_ID
                    //use_land
                    if (new_edata.grond != 'NULL') {
                        EstablishmentDAOObj.updateGround(new_edata.id, new_edata.grond)
                    }
                    if (new_edata.is_land_owned != 'NULL') {
                        this.insertLand(new_land, new_addressOwner).then((land_id) => {
                            new_edata.is_land_owned = `'${land_id.id}'`
                            new_edata.land_used = land_id.id
                            new_edata.land_address_owner = land_id.address
                            file.name = land_id.id
                            this.insertFile(file).then((resultFile) => {
                                if (resultFile.status) {
                                    //NEW LAND 
                                    if(land.type === 'duplication' && new_edata.is_land_owned === `'${establishmentData[0].ESTABLISHMENT_ID}'`){
                                        return resolve(new_edata)
                                    }else{
                                        EstablishmentDAOObj.updateUseLand(establishmentData[0].ESTABLISHMENT_ID, new_edata.is_land_owned).then((data_update_success) => {
                                            if (data_update_success) {
                                                return resolve(new_edata)
                                            } else {
                                                console.log('error update UseLand Establishment')
                                                return resolve(new_edata)
                                            }
                                        })
                                    }
                                }
                            })
                        })
                    } else {
                        if (establishmentData[0].ESTABLISHMENT_IS_LAND_OWNED === null) {
                            new_edata.is_land_owned = null
                            new_edata.land_used = null
                            new_edata.land_address_owner = null
                            return resolve(new_edata)
                        } else {
                            //establishmentData[0].ESTABLISHMENT_IS_LAND_OWNED != null
                            new_edata.is_land_owned = null
                            new_edata.land_used = null
                            new_edata.land_address_owner = null
                            EstablishmentDAOObj.updateUseLand(establishmentData[0].ESTABLISHMENT_ID, new_edata.is_land_owned).then((data_update_success) => {
                                if (data_update_success) {
                                    return resolve(new_edata)
                                } else {
                                    console.log('error update UseLand Establishment')
                                    return resolve(new_edata)
                                }
                            })
                        }
                    }
                } else {
                    this.insertAddressOne(new_address).then((resultaddress) => {
                        if (resultaddress.check) {
                            new_edata.address_id = resultaddress.id
                            if (new_edata.is_land_owned != 'NULL') {
                                this.insertLand(new_land, new_addressOwner).then((land_id) => {
                                    new_edata.is_land_owned = `'${land_id.id}'`
                                    new_edata.land_used = land_id.id
                                    new_edata.land_address_owner = land_id.address
                                    file.name = land_id.id
                                    this.insertFile(file).then((resultFile) => {
                                        if (resultFile.status) {

                                            this.loopInsertEstablishment(new_edata).then((result) => {
                                                return resolve(result)
                                            })
                                        }
                                    })
                                })
                            } else {
                                this.loopInsertEstablishment(new_edata).then((result) => {
                                    return resolve(result)
                                })
                            }
                        }
                    })
                }
            })

        })
    }
    getEstablishment(id) {
        return new Promise((resolve, reject) => {
            EstablishmentDAOObj.get(id).then((e_data) => {
                if (e_data != undefined) {
                    this.getAddressByAddressId(e_data.ADDRESS_ID).then((e_address_data) => {
                        e_data.ADDRESS = e_address_data[0]
                        if (e_data.ESTABLISHMENT_IS_LAND_OWNED != null) {
                            LandDAOObj.get(e_data.ESTABLISHMENT_IS_LAND_OWNED).then((land_data) => {
                                if (land_data.LAND_BIRTHDAY != null) {
                                    land_data.LAND_BIRTHDAY = this.formatDate('TO-DISPLAY', land_data.LAND_BIRTHDAY.toISOString())
                                } else {
                                    land_data.LAND_BIRTHDAY = ''
                                }
                                this.getAddressByAddressId(land_data.ADDRESS_ID).then((land_address_data) => {
                                    FileDAOObj.getfile(land_data.LAND_ID).then((data) => {
                                        land_data.UPLOADFILE = data
                                        land_data.ADDRESS = land_address_data[0]
                                        e_data.LAND = land_data
                                        return resolve(e_data)
                                    })

                                })

                                // this.getAddressByAddressId(land_data.ADDRESS_ID)
                            })
                        } else {
                            return resolve(e_data)
                        }
                    })
                } else {
                    return resolve(false)
                }
            })
        })
    }
    insertLand(land, address) {
        return new Promise((resolve, reject) => {
            LandDAOObj.getDuplicate(land).then((land_data) => {
                console.log(land_data)
                if (land_data != undefined) {
                    let object = {
                        'id': land_data.LAND_ID,
                        'address': land_data.ADDRESS_ID
                    }
                    return resolve(object)
                } else {
                    this.insertAddressOne(address).then((addressResult) => {
                        if (addressResult.check) {
                            land.address_id = addressResult.id
                            this.loopInsertLand(land).then((data) => {
                                if (data.check) {
                                    let object = {
                                        'id': data.id,
                                        'address': land.address_id
                                    }
                                    return resolve(object)
                                }
                            })
                        }
                    })
                }
            })
        })
    }
    insertFile(file) {
        return new Promise((resolve, reject) => {
            FileDAOObj.getfileByid(file.name).then((file_data) => {
                if (file_data) {
                    FileDAOObj.update(file).then((item) => {
                        let object = {
                            status : item,
                            type : 'duplication'
                        }
                        return resolve(object)
                    })
                } else {
                    FileDAOObj.insert(file).then((fileResult) => {
                        if (fileResult) {
                            let object = {
                                status : fileResult,
                                type : 'insert'
                            }
                            return resolve(object)
                        }
                    })
                }
            })
        })
    }
    loopInsertLand(land) {
        return new Promise((resolve, reject) => {
            this.getNewId('LAND').then((id) => {
                land.id = id
                LandDAOObj.insert(land).then((data) => {
                    if (data === 'true') {
                        console.log('function loopInsertLand : complete')
                        let resultReturn = {
                            check: true,
                            id: land.id
                        }
                        return resolve(resultReturn)
                    } else {
                        console.log('function loopInsertLand : something wrog')
                        this.loopInsertLand(land)
                    }
                })
            })
        })
    }
    updateAddress(address) {
        return new Promise((resolve, reject) => {
            AddressDAOObj.updateAddress(address).then((data) => {
                if (data) {
                    console.log('function updateAddress : complete')
                    return resolve(true)
                } else {
                    console.log('function updateAddress : something wrog')
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
    InsertPersonalStep(personal, address, image, username) {

        //checknull

        var datetime = new Date();
        let dateForUpdate = datetime.toISOString().slice(0, 10)
        if (personal.birthday.length != 0) {
            personal.birthday = this.formatDate('TO-INSERT', personal.birthday)
            personal.birthday = `'${personal.birthday}'`
        }

        if (personal.card_expipe.length != 0) {
            personal.card_expipe = this.formatDate('TO-INSERT', personal.card_expipe)
            personal.card_expipe = `'${personal.card_expipe}'`
        }

        personal.card_issued = this.formatDate('TO-INSERT', personal.card_issued)

        personal.update = dateForUpdate
        personal.username = username
        let newpersonal = this.formatInsert('PERSONAL', personal)
        let newaddress = this.formatInsert('ADDRESS', address)
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
    getViewImageRequestByIdAndYear(id, year) {
        return new Promise((resolve, reject) => {
            PrintDAOObj.getViewImage(id, year).then((viewData_data) => {
                ImageDAOObj.getImageEstablishmentByImage(viewData_data[0].REQUEST_IMAGE_NAME).then((imageDatas) => {
                    console.log(imageDatas.length)
                    viewData_data[0].IMAGE_REVIEW = imageDatas
                    return resolve(viewData_data)
                })
            })
        })
    }
    getRequestByIdAndYear(id, year) {
        console.log(`getRequestByIdAndYear id = ${id}/${year}`)
        return new Promise((resolve, reject) => {
            RequestDAOObj.getRequestById(id, year).then((data) => {
                if (data != undefined) {
                    this.getPersonalAndAddressById(data.PERSONAL_ID_OWNER).then((personal_operator_data) => {
                        data.gropDataOperator = personal_operator_data[0]
                        if (data.PERSONAL_ID_ASSISTANT != null) {
                            this.getPersonalById(data.PERSONAL_ID_ASSISTANT).then((personal_assistant_data) => {
                                data.gropDataAssistant = personal_assistant_data[0]
                                data.REQUEST_DATE_SUBMISSION = data.REQUEST_DATE_SUBMISSION != null ? this.formatDate("TO-DISPLAY", data.REQUEST_DATE_SUBMISSION.toISOString()) : data.REQUEST_DATE_SUBMISSION
                                data.REQUEST_DATE_APPROVE = data.REQUEST_DATE_APPROVE != null ? this.formatDate("TO-DISPLAY", data.REQUEST_DATE_APPROVE.toISOString()) : data.REQUEST_DATE_APPROVE
                                data.REQUEST_RECEIPT_DATE = data.REQUEST_RECEIPT_DATE != null ? this.formatDate("TO-DISPLAY", data.REQUEST_RECEIPT_DATE.toISOString()) : data.REQUEST_RECEIPT_DATE
                                data.REQUEST_DATE_ISSUED = data.REQUEST_DATE_ISSUED != null ? this.formatDate("TO-DISPLAY", data.REQUEST_DATE_ISSUED.toISOString()) : data.REQUEST_DATE_ISSUED
                                data.REQUEST_DATE_EXPIRED = data.REQUEST_DATE_EXPIRED != null ? this.formatDate("TO-DISPLAY", data.REQUEST_DATE_EXPIRED.toISOString()) : data.REQUEST_DATE_EXPIRED
                                data.REQUEST_LAST_UPDATE = data.REQUEST_LAST_UPDATE != null ? this.formatDate("TO-DISPLAY", data.REQUEST_LAST_UPDATE.toISOString()) : data.REQUEST_LAST_UPDATE
                                this.getEstablishment(data.ESTABLISHMENT_ID).then((dataEstablishment) => {
                                    data.ESTABLISHMENT_DATA = dataEstablishment
                                    if (data.TRAIN_ID != null) {
                                        this.getTrainByTrainId(data.TRAIN_ID).then((dataTrain) => {
                                            data.TRAIN_DATA = dataTrain[0]
                                            if (data.REFERENCE_ID != null) {
                                                this.getReferenceByReferenceId(data.REFERENCE_ID).then((dataReference) => {
                                                    data.REFERENCE_DATA = dataReference[0]
                                                    ImageDAOObj.getImageEstablishmentByImage(data.REQUEST_IMAGE_NAME).then((imageDatas) => {
                                                        data.IMAGE_REVIEW = imageDatas
                                                        return resolve(data)
                                                    })
                                                })
                                            } else {
                                                ImageDAOObj.getImageEstablishmentByImage(data.REQUEST_IMAGE_NAME).then((imageDatas) => {
                                                    data.IMAGE_REVIEW = imageDatas
                                                    return resolve(data)
                                                })
                                            }
                                        })
                                    } else {
                                        if (data.REFERENCE_ID != null) {
                                            this.getReferenceByReferenceId(data.REFERENCE_ID).then((dataReference) => {
                                                data.REFERENCE_DATA = dataReference[0]
                                                ImageDAOObj.getImageEstablishmentByImage(data.REQUEST_IMAGE_NAME).then((imageDatas) => {
                                                    data.IMAGE_REVIEW = imageDatas
                                                    return resolve(data)
                                                })
                                            })
                                        } else {
                                            ImageDAOObj.getImageEstablishmentByImage(data.REQUEST_IMAGE_NAME).then((imageDatas) => {
                                                data.IMAGE_REVIEW = imageDatas
                                                return resolve(data)
                                            })
                                        }
                                    }
                                })
                            })
                        } else {
                            data.gropDataAssistant = undefined
                            data.REQUEST_DATE_SUBMISSION = data.REQUEST_DATE_SUBMISSION != null ? this.formatDate("TO-DISPLAY", data.REQUEST_DATE_SUBMISSION.toISOString()) : data.REQUEST_DATE_SUBMISSION
                            data.REQUEST_DATE_APPROVE = data.REQUEST_DATE_APPROVE != null ? this.formatDate("TO-DISPLAY", data.REQUEST_DATE_APPROVE.toISOString()) : data.REQUEST_DATE_APPROVE
                            data.REQUEST_RECEIPT_DATE = data.REQUEST_RECEIPT_DATE != null ? this.formatDate("TO-DISPLAY", data.REQUEST_RECEIPT_DATE.toISOString()) : data.REQUEST_RECEIPT_DATE
                            data.REQUEST_DATE_ISSUED = data.REQUEST_DATE_ISSUED != null ? this.formatDate("TO-DISPLAY", data.REQUEST_DATE_ISSUED.toISOString()) : data.REQUEST_DATE_ISSUED
                            data.REQUEST_DATE_EXPIRED = data.REQUEST_DATE_EXPIRED != null ? this.formatDate("TO-DISPLAY", data.REQUEST_DATE_EXPIRED.toISOString()) : data.REQUEST_DATE_EXPIRED
                            data.REQUEST_LAST_UPDATE = data.REQUEST_LAST_UPDATE != null ? this.formatDate("TO-DISPLAY", data.REQUEST_LAST_UPDATE.toISOString()) : data.REQUEST_LAST_UPDATE
                            this.getEstablishment(data.ESTABLISHMENT_ID).then((dataEstablishment) => {
                                data.ESTABLISHMENT_DATA = dataEstablishment
                                if (data.TRAIN_ID != null) {
                                    this.getTrainByTrainId(data.TRAIN_ID).then((dataTrain) => {
                                        data.TRAIN_DATA = dataTrain[0]
                                        if (data.REFERENCE_ID != null) {
                                            this.getReferenceByReferenceId(data.REFERENCE_ID).then((dataReference) => {
                                                data.REFERENCE_DATA = dataReference[0]
                                                ImageDAOObj.getImageEstablishmentByImage(data.REQUEST_IMAGE_NAME).then((imageDatas) => {
                                                    data.IMAGE_REVIEW = imageDatas
                                                    return resolve(data)
                                                })
                                            })
                                        } else {
                                            ImageDAOObj.getImageEstablishmentByImage(data.REQUEST_IMAGE_NAME).then((imageDatas) => {
                                                data.IMAGE_REVIEW = imageDatas
                                                return resolve(data)
                                            })
                                        }
                                    })
                                } else {
                                    if (data.REFERENCE_ID != null) {
                                        this.getReferenceByReferenceId(data.REFERENCE_ID).then((dataReference) => {
                                            data.REFERENCE_DATA = dataReference[0]
                                            ImageDAOObj.getImageEstablishmentByImage(data.REQUEST_IMAGE_NAME).then((imageDatas) => {
                                                data.IMAGE_REVIEW = imageDatas
                                                return resolve(data)
                                            })
                                        })
                                    } else {
                                        ImageDAOObj.getImageEstablishmentByImage(data.REQUEST_IMAGE_NAME).then((imageDatas) => {
                                            data.IMAGE_REVIEW = imageDatas
                                            return resolve(data)
                                        })
                                    }
                                }
                            })
                        }
                    })
                } else {
                    return resolve(undefined)
                }

            })
        })
    }
    updateRequestStatus(status, id, year) {
        return new Promise((resolve, reject) => {
            RequestDAOObj.updateStatus(status, id, year).then((data) => {
                if (data === `true`) {
                    return resolve(true)
                } else {
                    return resolve(false)
                }
            })
        })
    }
    updateRequestStatusDelete(status, id, year) {
        return new Promise((resolve, reject) => {
            RequestDAOObj.updateStatusDelete(status, id, year).then((data) => {
                if (data === `true`) {
                    return resolve(true)
                } else {
                    return resolve(false)
                }
            })
        })
    }
    updateRequest(request) {
        let new_request = this.formatInsert('REQUEST', request)
        return new Promise((resolve, reject) => {
            RequestDAOObj.update(new_request).then((data) => {
                if (data === `true`) {
                    return resolve(true)
                } else {
                    return resolve(false)
                }
            })
        })
    }
    getRequestByTpyeAndOwnerId(type, Owner) {
        return new Promise((resolve, reject) => {
            RequestDAOObj.getRequestByTpyeAndOwnerId(type, Owner).then((data) => {
                if (data.length != 0) {
                    for (let i = 0; i < data.length; i++) {
                        data[i].REQUEST_DATE_SUBMISSION = data[i].REQUEST_DATE_SUBMISSION != null ? this.formatDate("TO-DISPLAY", data[i].REQUEST_DATE_SUBMISSION.toISOString()) : data[i].REQUEST_DATE_SUBMISSION
                        data[i].REQUEST_DATE_APPROVE = data[i].REQUEST_DATE_APPROVE != null ? this.formatDate("TO-DISPLAY", data[i].REQUEST_DATE_APPROVE.toISOString()) : data[i].REQUEST_DATE_APPROVE
                        data[i].REQUEST_RECEIPT_DATE = data[i].REQUEST_RECEIPT_DATE != null ? this.formatDate("TO-DISPLAY", data[i].REQUEST_RECEIPT_DATE.toISOString()) : data[i].REQUEST_RECEIPT_DATE
                        data[i].REQUEST_DATE_ISSUED = data[i].REQUEST_DATE_ISSUED != null ? this.formatDate("TO-DISPLAY", data[i].REQUEST_DATE_ISSUED.toISOString()) : data[i].REQUEST_DATE_ISSUED
                        data[i].REQUEST_DATE_EXPIRED = data[i].REQUEST_DATE_EXPIRED != null ? this.formatDate("TO-DISPLAY", data[i].REQUEST_DATE_EXPIRED.toISOString()) : data[i].REQUEST_DATE_EXPIRED
                        data[i].REQUEST_LAST_UPDATE = data[i].REQUEST_LAST_UPDATE != null ? this.formatDate("TO-DISPLAY", data[i].REQUEST_LAST_UPDATE.toISOString()) : data[i].REQUEST_LAST_UPDATE
                    }
                }
                return resolve(data)
            })
        })
    }

    InsertRequestStep(request, personal, Edata, address, land, addressOwner, file, reference, train, username, image) {
        //ets = Edata, address, land, addressOwner, file
        console.log(Edata)
        var datetime = new Date();
        let dateForUpdate = datetime.toISOString().slice(0, 10)
        request.last_update = dateForUpdate
        // console.log(personal)

        if (personal[0].is_personal_changed) {
            var datetime = new Date();
            let dateForUpdate = datetime.toISOString().slice(0, 10)
            if (personal[0].birthday.length != 0) {
                personal[0].birthday = this.formatDate('TO-INSERT', personal[0].birthday)
                personal[0].birthday = `'${personal[0].birthday}'`
            }

            if (personal[0].card_expipe.length != 0) {
                personal[0].card_expipe = this.formatDate('TO-INSERT', personal[0].card_expipe)
                personal[0].card_expipe = `'${personal[0].card_expipe}'`
            }

            personal[0].card_issued = this.formatDate('TO-INSERT', personal[0].card_issued)

            personal[0].update = dateForUpdate
            personal[0].username = username
            let newpersonal = this.formatInsert('PERSONAL', personal[0])
            console.log(`InsertRequestStep : Update Personal`)
            this.updatePersonal(newpersonal).then((updatePersonalStatus) => {
                //update
                console.log(updatePersonalStatus)
            })
        }
        if (personal[1].is_address_changed) {
            let newaddress = this.formatInsert('ADDRESS', personal[1])
            this.updateAddress(newaddress).then((updateAddressStatus) => {
                console.log(updateAddressStatus)
            })
        }
        // if (request.no != '') {
        //     //Update !!
        //     return new Promise((resolve, reject) => {
        //         Edata = this.formatInsert('ESTABLISHMENT', Edata)
        //         address = this.formatInsert('ADDRESS', address)
        //         addressOwner = this.formatInsert('ADDRESS', addressOwner)
        //         land = this.formatInsert('LAND', land)
        //         if (Edata.is_establishment_changed != true) {
        //             EstablishmentDAOObj.update()
        //         }
        //     })
        // } else {
        //insert !!
        return new Promise((resolve, reject) => {
            console.log('InsertRequestStep : loading')
            this.insertEstablishment(Edata, address, land, addressOwner, file).then((data) => {
                request.establishment_id = data.id
                request.land_address_establishment = data.address_id
                request.establishment_is_land_owned = data.land_used === null || data.land_used === undefined ? 'NULL' : `'${data.land_used}'`
                request.establishment_address_id = data.land_address_owner === null || data.land_address_owner === undefined ? 'NULL' : `'${data.land_address_owner}'`
                request.status = 'wait'
                if (request.reference_id === 'YES') {
                    this.loopInsertReference(reference).then((result) => {
                        request.reference_id = result.REFERENCE_ID

                        if (request.train_id === 'YES') {
                            this.loopInsertTrain(train).then((trainData) => {
                                request.train_id = trainData.TRAIN_ID
                                let new_request = this.formatInsert('REQUEST', request)
                                this.loopInsertRequest(new_request, image).then((requestData) => {
                                    return resolve(requestData)
                                })
                            })
                        } else {
                            let new_request = this.formatInsert('REQUEST', request)
                            this.loopInsertRequest(new_request, image).then((requestData) => {
                                return resolve(requestData)
                            })
                        }
                    })
                } else {
                    if (request.train_id === 'YES') {
                        this.loopInsertTrain(train).then((trainData) => {
                            request.train_id = trainData.TRAIN_ID
                            let new_request = this.formatInsert('REQUEST', request)
                            this.loopInsertRequest(new_request, image).then((requestData) => {
                                return resolve(requestData)
                            })
                        })
                    } else {
                        let new_request = this.formatInsert('REQUEST', request)
                        this.loopInsertRequest(new_request, image).then((requestData) => {
                            return resolve(requestData)
                        })
                    }
                }
                //insertImageEstablishments(image, id)
            })
        })
        // }
    }
    loopInsertRequest(request, image) {
        return new Promise((resolve, reject) => {
            this.getNewId('REQUEST', request.menu).then((id) => {
                request.no = id
                request.image_name = `'${request.no}${request.year}'`
                RequestDAOObj.insert(request).then((data) => {
                    if (data === 'true') {
                        request.no = id
                        console.log(`Insert : request complete`)
                        console.log(request.image_name)
                        console.log(image != undefined)
                        console.log(image)
                        if (image != undefined) {
                            if (image.length != 0) {
                                console.log(image != undefined)
                                this.insertImageEstablishments(image, `${request.no}${request.year}`).then((result_image) => {
                                    if (result_image) {
                                        return resolve(request)
                                    }
                                })
                            } else {
                                return resolve(request)
                            }
                        } else {
                            return resolve(request)
                        }
                    }
                    else {
                        this.loopInsertRequest(request, image)
                    }
                })
            })
        })
    }

    getUser(username, password) {
        return new Promise((resolve, reject) => {
            LoginDAOObj.getUser(username, password).then((data) => {
                return resolve(data)
            })
        })
    }
    //Request type
    insertRequestType(request) {
        return new Promise((resolve, reject) => {
            RequestTypeDAOObj.insert(request).then((data) => {
                // console.log(`== insert || insertRequestType ==`)
                return resolve(true)
            })
        })
    }
    getRequestTypeById(id) {
        return new Promise((resolve, reject) => {
            RequestTypeDAOObj.getRequestTypeById(id).then((data) => {
                return resolve(data)
            })
        })
    }
    getRequestTypeByType(type) {
        return new Promise((resolve, reject) => {
            RequestTypeDAOObj.getRequestTypeByType(type).then((data) => {
                return resolve(data)
            })
        })
    }
    getRequestType() {
        return new Promise((resolve, reject) => {
            RequestTypeDAOObj.get().then((data) => {
                return resolve(data)
            })
        })
    }

    // update use land
    updateLandEstablishment(id, status) {
        let IdStatus = status === '' || status === null ? status = 'NULL' : status = `'${status}'`
        return new Promise((resolve, reject) => {
            EstablishmentDAOObj.updateUseLand(id, IdStatus).then((data) => {
                return resolve(true)
            })
        })
    }
}

module.exports = service