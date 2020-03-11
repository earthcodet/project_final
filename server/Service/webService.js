const PersonalDAO = require('../DAO/PersonalDAO')
const PersonalDAOObj = new PersonalDAO()
const ImageDAO = require('../DAO/ImageDAO')
const ImageDAOObj = new ImageDAO()
const AddressDAO = require('../DAO/AddressDAO')
const AddressDAOObj = new AddressDAO()
const UserDAO = require('../DAO/UserDAO')
const UserDAOObj = new UserDAO()
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
const type_request_menu = {
    0:'ใบอนุญาตจำหน่ายสินค้าในที่หรือทางสาธารณะ',
    1:'ใบอนุญาตเร่ขายสินค้าในที่หรือทางสาธารณะ',
    2:'ใบอนุญาตจัดตั้งสถานที่จำหน่ายอาหาร',
    3:'ใบอนุญาตจัดตั้งสถานที่สะสมอาหาร',
    4:'หนังสือรับรองการแจ้งจัดตั้งสถานที่จำหน่ายอาหาร',
    5:'หนังสือรับรองการแจ้งจัดตั้งสถานที่สะสมอาหาร',
    6:'ใบอนุญาตให้ใช้สถานที่เป็นตลาดเอกชน',
    7:'กิจการที่เป็นอันตรายต่อสุขภาพ',
    8:'กิจการฌาปณสถาน'
}
class service {
    getRequestTypeMenu(num){
        return type_request_menu[num]
    }
    getStaffฺByType(type) {
        return new Promise((resolve, reject) => {
            UserDAOObj.getStaffฺByType(type).then((data) => {
                return resolve(data)
            })
        })
    }
    getStaffฺByTypes(type1, type2) {
        return new Promise((resolve, reject) => {
            UserDAOObj.getStaffฺByTypes(type1, type2).then((data) => {
                return resolve(data)
            })
        })
    }
    getStaffฺById(userId) {
        return new Promise((resolve, reject) => {
            UserDAOObj.getUserByUserId(userId).then((data) => {
                return resolve(data)
            })
        })
    }
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
        if (type === 'USER') {
            return new Promise((resolve, reject) => {
                UserDAOObj.getMaxIdUser().then((data) => {
                    if (data[0].maxId === null) {
                        console.log('getNewId : S0001')
                        return resolve("S0001")
                    } else {
                        this.newId(data[0].maxId, 'USER').then((userId) => {
                            console.log('getNewId : ' + userId)
                            return resolve(userId)
                        })
                    }
                })
            })
        }
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
                            data[i].PERSONAL_BIRTHDAY = this.formatDate('TO-DISPLAY', data[i].PERSONAL_BIRTHDAY + '')
                        }
                        console.log(`Data [${i}] => ${data[i].PERSONAL_CARD_ISSUED}`)
                        if (data[i].PERSONAL_CARD_ISSUED === null || data[i].PERSONAL_CARD_ISSUED === '0000-00-00') {
                            data[i].PERSONAL_CARD_ISSUED = undefined
                        } else {
                            data[i].PERSONAL_CARD_ISSUED = this.formatDate('TO-DISPLAY', data[i].PERSONAL_CARD_ISSUED + '')
                        }
                        if (data[i].PERSONAL_CARD_EXPIRE === null) {
                            data[i].PERSONAL_CARD_EXPIRE = undefined
                        } else {
                            data[i].PERSONAL_CARD_EXPIRE = this.formatDate('TO-DISPLAY', data[i].PERSONAL_CARD_EXPIRE + '')
                        }
                        data[i].PERSONAL_UPDATE = this.formatDate('TO-DISPLAY', data[i].PERSONAL_UPDATE + '')

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
    getPersonalDisplay(id, name, surname) {
        return new Promise((resolve, reject) => {
            PersonalDAOObj.getPersonalStatusN(id, name, surname).then((data) => {
                let date = '0000-00-00'
                if (data.length != 0) {
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].PERSONAL_BIRTHDAY === null) {
                            data[i].PERSONAL_BIRTHDAY = undefined
                        } else {
                            data[i].PERSONAL_BIRTHDAY = this.formatDate('TO-DISPLAY', data[i].PERSONAL_BIRTHDAY + '')
                        }
                        console.log(`Data [${i}] => ${data[i].PERSONAL_CARD_ISSUED}`)
                        if (data[i].PERSONAL_CARD_ISSUED === null || data[i].PERSONAL_CARD_ISSUED === '0000-00-00') {
                            data[i].PERSONAL_CARD_ISSUED = undefined
                        } else {
                            data[i].PERSONAL_CARD_ISSUED = this.formatDate('TO-DISPLAY', data[i].PERSONAL_CARD_ISSUED + '')
                        }
                        if (data[i].PERSONAL_CARD_EXPIRE === null) {
                            data[i].PERSONAL_CARD_EXPIRE = undefined
                        } else {
                            data[i].PERSONAL_CARD_EXPIRE = this.formatDate('TO-DISPLAY', data[i].PERSONAL_CARD_EXPIRE + '')
                        }
                        data[i].PERSONAL_UPDATE = this.formatDate('TO-DISPLAY', data[i].PERSONAL_UPDATE + '')

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
                if (result[0] != undefined) {
                    if (result[0].PERSONAL_BIRTHDAY === null) {
                        result[0].PERSONAL_BIRTHDAY = undefined
                    } else {
                        result[0].PERSONAL_BIRTHDAY = this.formatDate('TO-DISPLAY', result[0].PERSONAL_BIRTHDAY + '')
                    }
                    if (result[0].PERSONAL_CARD_ISSUED === null || result[0].PERSONAL_CARD_ISSUED === '0000-00-00') {
                        result[0].PERSONAL_CARD_ISSUED = undefined
                    } else {
                        result[0].PERSONAL_CARD_ISSUED = this.formatDate('TO-DISPLAY', result[0].PERSONAL_CARD_ISSUED + '')
                    }
                    if (result[0].PERSONAL_CARD_EXPIRE === null) {
                        result[0].PERSONAL_CARD_EXPIRE = undefined
                    } else {
                        result[0].PERSONAL_CARD_EXPIRE = this.formatDate('TO-DISPLAY', result[0].PERSONAL_CARD_EXPIRE + '')
                    }
                    result[0].PERSONAL_UPDATE = this.formatDate('TO-DISPLAY', result[0].PERSONAL_UPDATE + '')

                    this.getAddressByAddressId(result[0].ADDRESS_ID).then((address_data) => {
                        result[0].AID = address_data[0]
                        return resolve(result)
                    })
                } else {
                    return resolve(false)
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
    searchOperatorDisplay(id, name, surname) {
        return new Promise((resolve, reject) => {
            this.getPersonalDisplay(id, name, surname).then((data) => {
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
    getPersonalAssistantByPersonalId(id){
        return new Promise((resolve, reject) => {
            PersonalDAOObj.getPersonalAssistantById(id).then((data) => {
                if (data.length != 0) {
                    return resolve(data[0])
                } else {
                    return resolve(data)
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
    referenceUpdateStep(reference) {
        return new Promise((resolve, reject) => {
            ReferenceDAOObj.getReference(reference).then((referenceData) => {
                if (referenceData.length != 0) {
                    reference.id = referenceData[0].REFERENCE_ID
                    ReferenceDAOObj.updateReference(reference).then((reference_update) => {
                        return resolve(referenceData[0])
                    })
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
    loopUpdateReference(reference) {
        return new Promise((resolve, reject) => {
            this.getNewId('REFERENCE').then((id) => {
                reference.id = id
                this.referenceUpdateStep(reference).then((data) => {
                    if (data.length != 0) {
                        console.log(`Update : reference complete`)
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
                        this.loopUpdateReference(reference)
                    }
                })
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
                    trainData[0].TRAIN_DATE_EXP = this.formatDate('TO-DISPLAY', trainData[0].TRAIN_DATE_EXP + '')
                    trainData[0].TRAIN_DATE_ISSUED = this.formatDate('TO-DISPLAY', trainData[0].TRAIN_DATE_ISSUED + '')
                }
                return resolve(trainData)
            })
        })
    }
    loopUpdateTrain(train) {
        //Mian InsertTrain
        return new Promise((resolve, reject) => {
            this.getNewId('TRIAN').then((id) => {
                train.id = id
                train.date_exp = this.formatDate('TO-INSERT', train.date_exp)
                train.date_issued = this.formatDate('TO-INSERT', train.date_issued)
                this.trainUpdateStep(train).then((data) => {
                    if (data.length != 0) {
                        console.log(`Insert : train complete`)
                        if (data === 'true') {
                            let trainResult = {
                                TRAIN_ID: train.id,
                                // MARK VVV
                                // TRAIN_ISSUED: train.issuse,
                                // TRAIN_DATE_EXP: this.formatDate('TO-DISPLAY', train.date_exp),
                                // TRAIN_DATE_ISSUED: this.formatDate('TO-DISPLAY', train.date_issued)
                            }
                            return resolve(trainResult)
                        } else {
                            return resolve(data[0])
                        }

                    } else {
                        this.loopUpdateTrain(train)
                    }
                })
            })
        })
    }
    trainUpdateStep(train) {
        return new Promise((resolve, reject) => {
            TrainDAOObj.getTrianDuplication(train).then((trainData) => {
                if (trainData.length != 0) {
                    train.id = trainData[0].TRAIN_ID
                    TrainDAOObj.updateTrian(train).then((trainData_update) => {
                        return resolve(trainData[0])
                    })
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
    insertTrain(train) {
        return new Promise((resolve, reject) => {
            TrainDAOObj.getTrianDuplication(train).then((trainData) => {
                if (trainData.length != 0) {
                    trainData[0].TRAIN_DATE_EXP = this.formatDate('TO-DISPLAY', trainData[0].TRAIN_DATE_EXP + '')
                    trainData[0].TRAIN_DATE_ISSUED = this.formatDate('TO-DISPLAY', trainData[0].TRAIN_DATE_ISSUED + '')
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
                                // MASK VVV
                                // TRAIN_ISSUED: train.issuse,
                                // TRAIN_DATE_EXP: this.formatDate('TO-DISPLAY', train.date_exp),
                                // TRAIN_DATE_ISSUED: this.formatDate('TO-DISPLAY', train.date_issued)
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
                // Wed Feb 05 2020 00:00:00 GMT+0700
                let realdate = date.split(' ')
                let day = realdate[2]
                let month = realdate[1]
                let year = parseInt(realdate[3]) + 543
                switch (month) {
                    case 'Jan':
                        month = '01'
                        break;
                    case 'Feb':
                        month = '02'
                        break;
                    case 'Mar':
                        month = '03'
                        break;
                    case 'Apr':
                        month = '04'
                        break;
                    case 'May':
                        month = '05'
                        break;
                    case 'Jun':
                        month = '06'
                        break;
                    case 'Jul':
                        month = '07'
                        break;
                    case 'Aug':
                        month = '08'
                        break;
                    case 'Sep':
                        month = '09'
                        break;
                    case 'Oct':
                        month = '10'
                        break;
                    case 'Nov':
                        month = '11'
                        break;
                    default:
                        //Dec
                        month = '12'
                        break;
                }
                let format = `${day}-${month}-${year}` //16-01-2563
                return format

            }
            console.log(`2 date`)
            console.log(date)
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
        let new_data = data
        if (type === 'PERSONAL') {
            new_data.surname = '' ? new_data.surname = 'NULL' : new_data.surname = `'${new_data.surname}'`
            new_data.title === '' ? new_data.title = 'NULL' : new_data.title = `'${new_data.title}'`
            new_data.phone === '/' ? new_data.phone = '-/' : new_data.phone = new_data.phone
            new_data.nationality = new_data.nationality === '' || new_data.nationality === '-' ? 'NULL' : `'${new_data.nationality}'`
            new_data.race === '' || new_data.race === '-' ? new_data.race = 'NULL' : new_data.race = `'${new_data.race}'`
            new_data.birthday = new_data.birthday.length === 0 || new_data.birthday.split('-').length != 3 ? new_data.birthday = 'NULL' : `'${this.formatDate('TO-INSERT', new_data.birthday)}'`
            new_data.card_expipe = new_data.card_expipe.length === 0 || new_data.card_expipe.split('-').length != 3 ? new_data.card_expipe = 'NULL' : `'${this.formatDate('TO-INSERT', new_data.card_expipe)}'`
            new_data.fax === '' || new_data.fax === '-' ? new_data.fax = 'NULL' : new_data.fax = `'${new_data.fax}'`
            new_data.surname === '' ? new_data.surname = 'NULL' : `'${new_data.surname}'`
            new_data.card_issued = new_data.card_issued === undefined || (new_data.card_issued != undefined ? new_data.card_issued.length === 0 : false) || new_data.card_issued.split('-').length != 3 ? '-' : this.formatDate('TO-INSERT', new_data.card_issued)
            return new_data
        }
        if (type === 'ADDRESS') {
            new_data.home_number === '' ? new_data.home_number = '-' : new_data.home_number = new_data.home_number
            new_data.moo === '' || new_data.moo === '-' ? new_data.moo = 'NULL' : new_data.moo = `'${new_data.moo}'`
            new_data.trxk === '' || new_data.trxk === '-' ? new_data.trxk = 'NULL' : new_data.trxk = `'${new_data.trxk}'`
            new_data.sxy === '' || new_data.sxy === '-' ? new_data.sxy = 'NULL' : new_data.sxy = `'${new_data.sxy}'`
            new_data.building === '' || new_data.building === '-' ? new_data.building = 'NULL' : new_data.building = `'${new_data.building}'`
            new_data.road === '' || new_data.road === '-' ? new_data.road = 'NULL' : new_data.road = `'${new_data.road}'`
            return new_data
        }
        if (type === 'ESTABLISHMENT') {
            new_data.reference_id = new_data.reference_id === '' ? 'NULL' : 'YES'
            new_data.train_id = new_data.train_id === '' || new_data.train_id === 'NO' ? 'NULL' : 'YES'
            new_data.is_land_owned === 'NO' ? new_data.is_land_owned = 'NULL' : new_data.is_land_owned = `'${new_data.is_land_owned}'`
            new_data.type === '' ? new_data.type = 'NULL' : new_data.type = `'${new_data.type}'`
            new_data.name === '' ? new_data.name = 'NULL' : new_data.name = `'${new_data.name}'`

            new_data.machine_size === '' ? new_data.machine_size = 0 : ''
            new_data.area_size === '' ? new_data.area_size = 0 : ''
            new_data.worker === '' ? new_data.worker = 0 : ''

            new_data.fax === '' || new_data.fax === '-' ? new_data.fax = 'NULL' : new_data.fax = `'${new_data.fax}'`
            new_data.grond === '' ? new_data.grond = 'NULL' : new_data.grond = `'${new_data.grond}'`
            return new_data
        }
        if (type === 'LAND') {
            new_data.birthday === '' ? new_data.birthday = 'NULL' : new_data.birthday = `'${this.formatDate("TO-INSERT", new_data.birthday)}'`
            return new_data
        }
        if (type === 'REQUEST') {
            //Time Database 15:10:14
            //Time Web 13:48:00.000
            //Time  = time.slice(0,8)
            new_data.staff_id_money = new_data.staff_id_money === '-' || new_data.staff_id_money === '' ? 'NULL' : `'${new_data.staff_id_money}'`
            new_data.reference_id = new_data.reference_id === '-' || new_data.reference_id === '' || new_data.reference_id === 'NO' ? 'NULL' : `'${new_data.reference_id}'`
            new_data.train_id = new_data.train_id === '-' || new_data.train_id === '' || new_data.train_id === 'NO' ? 'NULL' : `'${new_data.train_id}'`
            new_data.personal_id_assistant = new_data.personal_id_assistant === '-' || new_data.personal_id_assistant === '' ? 'NULL' : `'${new_data.personal_id_assistant}'`
            new_data.staff_id_approve = new_data.staff_id_approve === '-' || new_data.staff_id_approve === '' ? 'NULL' : `'${new_data.staff_id_approve}'`
            new_data.date_submission = this.formatDate('TO-INSERT', new_data.date_submission)
            new_data.date_approve = new_data.date_approve === '-' || new_data.date_approve === '' ? 'NULL' : `'${this.formatDate('TO-INSERT', new_data.date_approve)}'`
            new_data.subcategory = new_data.subcategory === '-' || new_data.subcategory === '' ? 'NULL' : `'${new_data.subcategory}'`
            new_data.product_type = new_data.product_type === '-' || new_data.product_type === '' ? 'NULL' : `'${new_data.product_type}'`
            new_data.sell_start = new_data.sell_start === '-' || new_data.sell_start === '' ? 'NULL' : `'${this.formatTime(new_data.sell_start)}'`
            new_data.sell_end = new_data.sell_end === '-' || new_data.sell_end === '' ? 'NULL' : `'${this.formatTime(new_data.sell_end)}'`


            //Year No 1
            if (new_data.receipt_fine != '' && new_data.receipt_fine != '-') {
                if (new_data.receipt_fee != '' && new_data.receipt_fee != '-') {
                    new_data.receipt_total = parseFloat(new_data.receipt_fine) + parseFloat(new_data.receipt_fee)
                } else {
                    new_data.receipt_total = parseFloat(new_data.receipt_fine)
                }
            } else {
                new_data.receipt_total = 0
            }
            new_data.receipt_fine = new_data.receipt_fine === '-' || new_data.receipt_fine === '' ? 'NULL' : new_data.receipt_fine
            new_data.receipt_fee = new_data.receipt_fee === '-' || new_data.receipt_fee === '' ? 'NULL' : new_data.receipt_fee
            new_data.receipt_date = new_data.receipt_date === '-' || new_data.receipt_date === '' ? 'NULL' : `'${this.formatDate('TO-INSERT', new_data.receipt_date)}'`

            //Year No 2
            if (new_data.receipt_fine_year_2 != '' && new_data.receipt_fine_year_2 != '-') {
                if (new_data.receipt_fee_year_2 != '' && new_data.receipt_fee_year_2 != '-') {
                    new_data.receipt_total_year_2 = parseFloat(new_data.receipt_fine_year_2) + parseFloat(new_data.receipt_fee_year_2)
                } else {
                    new_data.receipt_total_year_2 = parseFloat(new_data.receipt_fine_year_2)
                }
            } else {
                new_data.receipt_total_year_2 = 0
            }
            new_data.receipt_fine_year_2 = new_data.receipt_fine_year_2 === '-' || new_data.receipt_fine_year_2 === '' ? 'NULL' : new_data.receipt_fine_year_2
            new_data.receipt_fee_year_2 = new_data.receipt_fee_year_2 === '-' || new_data.receipt_fee_year_2 === '' ? 'NULL' : new_data.receipt_fee_year_2
            new_data.receipt_date_year_2 = new_data.receipt_date_year_2 === '-' || new_data.receipt_date_year_2 === '' ? 'NULL' : `'${this.formatDate('TO-INSERT', new_data.receipt_date_year_2)}'`

            //Year No 3
            if (new_data.receipt_fine_year_3 != '' && new_data.receipt_fine_year_3 != '-') {
                if (new_data.receipt_fee_year_3 != '' && new_data.receipt_fee_year_3 != '-') {
                    new_data.receipt_total_year_3 = parseFloat(new_data.receipt_fine_year_3) + parseFloat(new_data.receipt_fee_year_3)
                } else {
                    new_data.receipt_total_year_3 = parseFloat(new_data.receipt_fine_year_3)
                }
            } else {
                new_data.receipt_total_year_3 = 0
            }
            console.log(` new_data.receipt_fine_year_3 ${new_data.receipt_fine_year_3}`)
            new_data.receipt_fine_year_3 = new_data.receipt_fine_year_3 === '-' || new_data.receipt_fine_year_3 === '' || new_data.receipt_fine_year_3 === undefined ? 'NULL' : new_data.receipt_fine_year_3
            new_data.receipt_fee_year_3 = new_data.receipt_fee_year_3 === '-' || new_data.receipt_fee_year_3 === '' || new_data.receipt_fee_year_3 === undefined ? 'NULL' : new_data.receipt_fee_year_3
            new_data.receipt_date_year_3 = new_data.receipt_date_year_3 === '-' || new_data.receipt_date_year_3 === '' || new_data.receipt_date_year_3 === undefined ? 'NULL' : `'${this.formatDate('TO-INSERT', new_data.receipt_date_year_3)}'`



            new_data.date_issued = new_data.date_issued === '-' || new_data.date_issued === '' ? 'NULL' : `'${this.formatDate('TO-INSERT', new_data.date_issued)}'`
            new_data.date_expired = new_data.date_expired === '-' || new_data.date_expired === '' ? 'NULL' : `'${this.formatDate('TO-INSERT', new_data.date_expired)}'`

            new_data.condition_no_1 = new_data.condition_no_1 === '-' || new_data.condition_no_1 === '' ? 'NULL' : `'${new_data.condition_no_1}'`
            new_data.condition_no_2 = new_data.condition_no_2 === '-' || new_data.condition_no_2 === '' ? 'NULL' : `'${new_data.condition_no_2}'`
            new_data.condition_no_3 = new_data.condition_no_3 === '-' || new_data.condition_no_3 === '' ? 'NULL' : `'${new_data.condition_no_3}'`
            new_data.condition_no_4 = new_data.condition_no_4 === '-' || new_data.condition_no_4 === '' ? 'NULL' : `'${new_data.condition_no_4}'`

            new_data.image_name = new_data.image_name === '-' || new_data.image_name === '' ? 'NULL' : `'${new_data.image_name}'`
            new_data.delete_logic = new_data.delete_logic === '-' || new_data.delete_logic === '' ? 'NULL' : `'${new_data.delete_logic}'`
            console.log('$$$$$$$$$$$$$$ --- format Insert -- $$$$$$$$$$$$$$$$')
            console.log(new_data)
            console.log('$$$$$$$$$$$$$$ --- format Insert -- $$$$$$$$$$$$$$$$')
            return new_data
        }
        if (type === 'USER') {
            new_data.username = new_data.username === '' || new_data.username === '-' ? 'NULL' : `'${new_data.username}'`
            new_data.password = new_data.password === '' || new_data.password === '-' ? 'NULL' : `'${new_data.password}'`
            new_data.is_default = new_data.is_default === '' || new_data.is_default === '-' ? 'NULL' : `'${new_data.is_default}'`
            return new_data
        }
        if (type === 'REQUEST_UPDATE_STATUS') {
            let item = new_data.date_approve
            new_data.date_approve = item === '' ? 'NULL' : `'${this.formatDate('TO-INSERT', item)}'`

            item = new_data.staff_id_approve
            new_data.staff_id_approve = item === '' ? 'NULL' : `'${item}'`

            item = new_data.receipt_order
            new_data.receipt_order = item === '' ? 'NULL' : item

            item = new_data.receipt_order_year
            new_data.receipt_order_year = item === '' ? 'NULL' : item

            if (new_data.receipt_fine != '' && new_data.receipt_fine != '-') {
                if (new_data.receipt_fee != '' && new_data.receipt_fee != '-') {
                    new_data.receipt_total = parseFloat(new_data.receipt_fine) + parseFloat(new_data.receipt_fee)
                } else {
                    new_data.receipt_total = parseFloat(new_data.receipt_fine)
                }
            } else {
                new_data.receipt_total = 0
            }
            item = new_data.receipt_fine
            new_data.receipt_fine = item === '' ? 'NULL' : item

            item = new_data.receipt_fee
            new_data.receipt_fee = item === '' ? 'NULL' : item

            item = new_data.receipt_date
            new_data.receipt_date = item === '' ? 'NULL' : `'${this.formatDate('TO-INSERT', item)}'`

            item = new_data.receipt_order_year_2
            new_data.receipt_order_year_2 = item === '' ? 'NULL' : item

            item = new_data.receipt_order_year_year_2
            new_data.receipt_order_year_year_2 = item === '' ? 'NULL' : item

            if (new_data.receipt_fine_year_2 != '' && new_data.receipt_fine_year_2 != '-') {
                if (new_data.receipt_fee_year_2 != '' && new_data.receipt_fee_year_2 != '-') {
                    new_data.receipt_total_year_2 = parseFloat(new_data.receipt_fine_year_2) + parseFloat(new_data.receipt_fee_year_2)
                } else {
                    new_data.receipt_total_year_2 = parseFloat(new_data.receipt_fine_year_2)
                }
            } else {
                new_data.receipt_total_year_2 = 0
            }
            item = new_data.receipt_fine_year_2
            new_data.receipt_fine_year_2 = item === '' ? 'NULL' : item

            item = new_data.receipt_fee_year_2
            new_data.receipt_fee_year_2 = item === '' ? 'NULL' : item

            item = new_data.receipt_date_year_2
            new_data.receipt_date_year_2 = item = item === '' ? 'NULL' : `'${this.formatDate('TO-INSERT', item)}'`

            item = new_data.receipt_order_year_3
            new_data.receipt_order_year_3 = item === '' ? 'NULL' : item

            item = new_data.receipt_order_year_year_3
            new_data.receipt_order_year_year_3 = item === '' ? 'NULL' : item

            if (new_data.receipt_fine_year_3 != '' && new_data.receipt_fine_year_3 != '-') {
                if (new_data.receipt_fee_year_3 != '' && new_data.receipt_fee_year_3 != '-') {
                    new_data.receipt_total_year_3 = parseFloat(new_data.receipt_fine_year_3) + parseFloat(new_data.receipt_fee_year_3)
                } else {
                    new_data.receipt_total_year_3 = parseFloat(new_data.receipt_fine_year_3)
                }
            } else {
                new_data.receipt_total_year_3 = 0
            }

            item = new_data.receipt_fine_year_3
            new_data.receipt_fine_year_3 = item === '' ? 'NULL' : item

            item = new_data.receipt_fee_year_3
            new_data.receipt_fee_year_3 = item === '' ? 'NULL' : item

            item = new_data.receipt_date_year_3
            new_data.receipt_date_year_3 = item === '' ? 'NULL' : `'${this.formatDate('TO-INSERT', item)}'`

            item = new_data.staff_id_money
            new_data.staff_id_money = item === '' ? 'NULL' : `'${item}'`

            item = new_data.date_issued
            new_data.date_issued = item === '' ? 'NULL' : `'${this.formatDate('TO-INSERT', item)}'`

            item = new_data.date_expired
            new_data.date_expired = item === '' ? 'NULL' : `'${this.formatDate('TO-INSERT', item)}'`

            item = new_data.delete_logic
            new_data.delete_logic = item === '' ? 'NULL' : `'${item}'`
            return new_data
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
        console.log('address+++  ')
        console.log(address)
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
    getRquestRenew(type, personal_id) {
        console.log(`type is ${type}`)
        console.log(`personal_id is ${personal_id}`)
        return new Promise((resolve, reject) => {
            RequestDAOObj.getRequestByReNew(type, personal_id).then((data) => {
                for(let i = 0 ; i < data.length ; i++){
                    data[i].REQUEST_DATE_APPROVE = data[i].REQUEST_DATE_APPROVE != null ? this.formatDate("TO-DISPLAY", data[i].REQUEST_DATE_APPROVE + '') : data[i].REQUEST_DATE_APPROVE
                    data[i].REQUEST_DATE_SUBMISSION = data[i].REQUEST_DATE_SUBMISSION != null ? this.formatDate("TO-DISPLAY", data[i].REQUEST_DATE_SUBMISSION + '') : data[i].REQUEST_DATE_SUBMISSION
                    data[i].REQUEST_RECEIPT_DATE = data[i].REQUEST_RECEIPT_DATE != null ? this.formatDate("TO-DISPLAY", data[i].REQUEST_RECEIPT_DATE + '') : data[i].REQUEST_RECEIPT_DATE
                    data[i].REQUEST_RECEIPT_DATE_YEAR_2 = data[i].REQUEST_RECEIPT_DATE_YEAR_2 != null ? this.formatDate("TO-DISPLAY", data[i].REQUEST_RECEIPT_DATE_YEAR_2 + '') : data[i].REQUEST_RECEIPT_DATE_YEAR_2
                    data[i].REQUEST_RECEIPT_DATE_YEAR_3 = data[i].REQUEST_RECEIPT_DATE_YEAR_3 != null ? this.formatDate("TO-DISPLAY", data[i].REQUEST_RECEIPT_DATE_YEAR_3 + '') : data[i].REQUEST_RECEIPT_DATE_YEAR_3
                    data[i].REQUEST_DATE_ISSUED = data[i].REQUEST_DATE_ISSUED != null ? this.formatDate("TO-DISPLAY", data[i].REQUEST_DATE_ISSUED + '') : data[i].REQUEST_DATE_ISSUED
                    data[i].REQUEST_DATE_EXPIRED = data[i].REQUEST_DATE_EXPIRED != null ? this.formatDate("TO-DISPLAY", data[i].REQUEST_DATE_EXPIRED + '') : data[i].REQUEST_DATE_EXPIRED
                }
                console.log(data)
                return resolve(data)
            })
        })
    }
    getRquestRenewByRequestId(r_no, r_year) {
        console.log(`get Request Renew id = ${r_no} , year =  ${r_year}`)
        return new Promise((resolve, reject) => {
            RequestDAOObj.getRequestByReNewByRequestId(r_no, r_year).then((data) => {
                console.log(data)
                for(let i = 0 ; i < data.length ; i++){
                    data[i].REQUEST_DATE_APPROVE = data[i].REQUEST_DATE_APPROVE != null ? this.formatDate("TO-DISPLAY", data[i].REQUEST_DATE_APPROVE + '') : data[i].REQUEST_DATE_APPROVE
                    data[i].REQUEST_DATE_SUBMISSION = data[i].REQUEST_DATE_SUBMISSION != null ? this.formatDate("TO-DISPLAY", data[i].REQUEST_DATE_SUBMISSION + '') : data[i].REQUEST_DATE_SUBMISSION
                    data[i].REQUEST_RECEIPT_DATE = data[i].REQUEST_RECEIPT_DATE != null ? this.formatDate("TO-DISPLAY", data[i].REQUEST_RECEIPT_DATE + '') : data[i].REQUEST_RECEIPT_DATE
                    data[i].REQUEST_RECEIPT_DATE_YEAR_2 = data[i].REQUEST_RECEIPT_DATE_YEAR_2 != null ? this.formatDate("TO-DISPLAY", data[i].REQUEST_RECEIPT_DATE_YEAR_2 + '') : data[i].REQUEST_RECEIPT_DATE_YEAR_2
                    data[i].REQUEST_RECEIPT_DATE_YEAR_3 = data[i].REQUEST_RECEIPT_DATE_YEAR_3 != null ? this.formatDate("TO-DISPLAY", data[i].REQUEST_RECEIPT_DATE_YEAR_3 + '') : data[i].REQUEST_RECEIPT_DATE_YEAR_3
                    data[i].REQUEST_DATE_ISSUED = data[i].REQUEST_DATE_ISSUED != null ? this.formatDate("TO-DISPLAY", data[i].REQUEST_DATE_ISSUED + '') : data[i].REQUEST_DATE_ISSUED
                    data[i].REQUEST_DATE_EXPIRED = data[i].REQUEST_DATE_EXPIRED != null ? this.formatDate("TO-DISPLAY", data[i].REQUEST_DATE_EXPIRED + '') : data[i].REQUEST_DATE_EXPIRED
                    this.getPersonalAndAddressById(data[i].PERSONAL_ID_OWNER).then((o_data) => {
                        data[i].GropDataProsonal = o_data[0]
                        if(i === data.length -1){
                            return resolve(data)
                        }
                    })
                }
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
                                    if (land.type === 'duplication' && new_edata.is_land_owned === `'${establishmentData[0].ESTABLISHMENT_ID}'`) {
                                        return resolve(new_edata)
                                    } else {
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
    updateEstablishmentAndCheckDuplication(Edata, address){
        let item = []
        item.push(address)
        item[0] = this.formatInsert('ADDRESS',item[0])
        return new Promise((resolve, reject) => {
            EstablishmentDAOObj.getDuplication(Edata, item[0]).then((establishmentData) => {
                if (establishmentData.length === 0) {
                    EstablishmentDAOObj.update(Edata).then((data) =>{
                        return resolve(data)
                    })
                }else{
                    return resolve(establishmentData[0].ESTABLISHMENT_ID)
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
                                    land_data.LAND_BIRTHDAY = this.formatDate('TO-DISPLAY', land_data.LAND_BIRTHDAY + '')
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
    loopUpdateLand(land, address) {
        return new Promise((resolve, reject) => {
            this.getNewId('LAND').then((id) => {
                land.id = id
                this.landUpdateStep(land, address).then((data) => {
                    if (data.id != undefined) {
                        console.log('Update Land : complete')
                        return resolve(data)
                    } else {
                        this.loopUpdateLand(land)
                    }
                })
            })
        })
    }
    landUpdateStep(land, address) {
        return new Promise((resolve, reject) => {
            LandDAOObj.getDuplicate(land).then((land_data) => {
                console.log(land_data)
                if (land_data != undefined) {
                    let object = {
                        'id': land_data.LAND_ID,
                        'address': land_data.ADDRESS_ID,
                        'status_insert_address': true
                    }
                    land.id = land_data.LAND_ID
                    LandDAOObj.updateLand(land).then((train_update_status) => {
                        if (train_update_status) {
                            return resolve(object)
                        }
                    })
                } else {
                    console.log('address =cxcxlzkc;xlzc')
                    address = this.formatInsert('ADDRESS', address)
                    console.log(address)
                    this.insertAddressOne(address).then((addressResult) => {
                        console.log(addressResult)
                        if (addressResult.check) {
                            land.address_id = addressResult.id
                            land = this.formatInsert("LAND", land)
                            this.loopInsertLand(land).then((data) => {
                                if (data.check) {
                                    let object = {
                                        'id': data.id,
                                        'address': land.address_id,
                                        'status_insert_address': true
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
        console.log('--INSERT FILE--')
        console.log(file)
        console.log('--INSERT FILE--')
        return new Promise((resolve, reject) => {
            FileDAOObj.getfileByid(file.name).then((file_data) => {
                if (file_data) {
                    FileDAOObj.update(file).then((item) => {
                        let object = {
                            status: item,
                            type: 'duplication'
                        }
                        return resolve(object)
                    })
                } else {
                    FileDAOObj.insert(file).then((fileResult) => {
                        if (fileResult) {
                            let object = {
                                status: fileResult,
                                type: 'insert'
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
    updatePersonalRequest(personal) {
        return new Promise((resolve, reject) => {
            PersonalDAOObj.updatePersonalRequest(personal).then((data) => {
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
        // if (personal.birthday.length != 0 && personal != '-') {
        //     personal.birthday = this.formatDate('TO-INSERT', personal.birthday)
        //     personal.birthday = `'${personal.birthday}'`
        // }

        // if (personal.card_expipe.length != 0) {
        //     personal.card_expipe = this.formatDate('TO-INSERT', personal.card_expipe)
        //     personal.card_expipe = `'${personal.card_expipe}'`
        // }

        // personal.card_issued = this.formatDate('TO-INSERT', personal.card_issued)

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
    getRequestProfileByPIDAndEID(p_id, e_id) {
        let temp_array_return = []
        return new Promise((resolve, reject) => {
            this.getPersonalAndAddressById(p_id).then((personal_operator_data) => {
                temp_array_return.push(personal_operator_data[0])
                this.getEstablishment(e_id).then((dataEstablishment) => {
                    temp_array_return.push(dataEstablishment)
                    return resolve(temp_array_return)
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
                                console.log(`B ${data.REQUEST_DATE_SUBMISSION.toISOString()}`)
                                data.REQUEST_DATE_SUBMISSION = data.REQUEST_DATE_SUBMISSION != null ? this.formatDate("TO-DISPLAY", data.REQUEST_DATE_SUBMISSION + '') : data.REQUEST_DATE_SUBMISSION
                                // this.test(data.REQUEST_DATE_SUBMISSION + '')
                                console.log(`A ${typeof (data.REQUEST_DATE_SUBMISSION + '')}`)
                                data.REQUEST_DATE_APPROVE = data.REQUEST_DATE_APPROVE != null ? this.formatDate("TO-DISPLAY", data.REQUEST_DATE_APPROVE + '') : data.REQUEST_DATE_APPROVE
                                data.REQUEST_RECEIPT_DATE = data.REQUEST_RECEIPT_DATE != null ? this.formatDate("TO-DISPLAY", data.REQUEST_RECEIPT_DATE + '') : data.REQUEST_RECEIPT_DATE
                                data.REQUEST_DATE_ISSUED = data.REQUEST_DATE_ISSUED != null ? this.formatDate("TO-DISPLAY", data.REQUEST_DATE_ISSUED + '') : data.REQUEST_DATE_ISSUED
                                data.REQUEST_DATE_EXPIRED = data.REQUEST_DATE_EXPIRED != null ? this.formatDate("TO-DISPLAY", data.REQUEST_DATE_EXPIRED + '') : data.REQUEST_DATE_EXPIRED
                                data.REQUEST_LAST_UPDATE = data.REQUEST_LAST_UPDATE != null ? this.formatDate("TO-DISPLAY", data.REQUEST_LAST_UPDATE + '') : data.REQUEST_LAST_UPDATE
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
                            data.REQUEST_DATE_SUBMISSION = data.REQUEST_DATE_SUBMISSION != null ? this.formatDate("TO-DISPLAY", data.REQUEST_DATE_SUBMISSION + '') : data.REQUEST_DATE_SUBMISSION
                            data.REQUEST_DATE_APPROVE = data.REQUEST_DATE_APPROVE != null ? this.formatDate("TO-DISPLAY", data.REQUEST_DATE_APPROVE + '') : data.REQUEST_DATE_APPROVE
                            data.REQUEST_RECEIPT_DATE = data.REQUEST_RECEIPT_DATE != null ? this.formatDate("TO-DISPLAY", data.REQUEST_RECEIPT_DATE + '') : data.REQUEST_RECEIPT_DATE
                            data.REQUEST_DATE_ISSUED = data.REQUEST_DATE_ISSUED != null ? this.formatDate("TO-DISPLAY", data.REQUEST_DATE_ISSUED + '') : data.REQUEST_DATE_ISSUED
                            data.REQUEST_DATE_EXPIRED = data.REQUEST_DATE_EXPIRED != null ? this.formatDate("TO-DISPLAY", data.REQUEST_DATE_EXPIRED + '') : data.REQUEST_DATE_EXPIRED
                            data.REQUEST_LAST_UPDATE = data.REQUEST_LAST_UPDATE != null ? this.formatDate("TO-DISPLAY", data.REQUEST_LAST_UPDATE + '') : data.REQUEST_LAST_UPDATE
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
    updateRequestStatus(request, username) {
        var datetime = new Date();
        let dateForUpdate = datetime.toISOString().slice(0, 10)
        request.last_update = dateForUpdate
        request.user_update = username
        let new_request = this.formatInsert('REQUEST_UPDATE_STATUS', request)
        return new Promise((resolve, reject) => {
            RequestDAOObj.updateStatus(new_request).then((data) => {
                if (data === `true`) {
                    return resolve(true)
                } else {
                    return resolve(false)
                }
            })
        })
    }
    updateRequestStatusDelete(request, user) {
        let object = {
            username: user,
            status: request.status,
            id: request.id,
            year: request.year,
            last_update: ''
        }
        var datetime = new Date();
        let dateForUpdate = datetime.toISOString().slice(0, 10)
        object.last_update = dateForUpdate
        return new Promise((resolve, reject) => {
            RequestDAOObj.updateStatusDelete(object).then((data) => {
                if (data === `true`) {
                    return resolve(true)
                } else {
                    return resolve(false)
                }
            })
        })
    }
    updateRequest(request) {
        console.log('---- Request Update ----')
        console.log(request)
        request.image_name = `${request.no}${request.year}`
        console.log('E---- Request Update ----')
        return new Promise((resolve, reject) => {
            RequestDAOObj.update(this.formatInsert('REQUEST', request)).then((data) => {
                if (data === `true`) {
                    return resolve(true)
                } else {
                    return resolve(false)
                }
            })
        })
    }
    getRequestByTpyeAndOwnerId(type, Owner) {
        console.log('get')
        return new Promise((resolve, reject) => {
            RequestDAOObj.getRequestByTpyeAndOwnerId(type, Owner).then((data) => {
                if (data.length != 0) {
                    for (let i = 0; i < data.length; i++) {
                        data[i].REQUEST_DATE_SUBMISSION = data[i].REQUEST_DATE_SUBMISSION != null ? this.formatDate("TO-DISPLAY", data[i].REQUEST_DATE_SUBMISSION + '') : data[i].REQUEST_DATE_SUBMISSION
                        data[i].REQUEST_DATE_APPROVE = data[i].REQUEST_DATE_APPROVE != null ? this.formatDate("TO-DISPLAY", data[i].REQUEST_DATE_APPROVE + '') : data[i].REQUEST_DATE_APPROVE
                        data[i].REQUEST_RECEIPT_DATE = data[i].REQUEST_RECEIPT_DATE != null ? this.formatDate("TO-DISPLAY", data[i].REQUEST_RECEIPT_DATE + '') : data[i].REQUEST_RECEIPT_DATE
                        data[i].REQUEST_DATE_ISSUED = data[i].REQUEST_DATE_ISSUED != null ? this.formatDate("TO-DISPLAY", data[i].REQUEST_DATE_ISSUED + '') : data[i].REQUEST_DATE_ISSUED
                        data[i].REQUEST_DATE_EXPIRED = data[i].REQUEST_DATE_EXPIRED != null ? this.formatDate("TO-DISPLAY", data[i].REQUEST_DATE_EXPIRED + '') : data[i].REQUEST_DATE_EXPIRED
                        data[i].REQUEST_LAST_UPDATE = data[i].REQUEST_LAST_UPDATE != null ? this.formatDate("TO-DISPLAY", data[i].REQUEST_LAST_UPDATE + '') : data[i].REQUEST_LAST_UPDATE
                    }
                }
                return resolve(data)
            })
        })
    }
    getRequestByTpyeAndOwnerIdAssistant(type, Owner) {
        console.log('get')
        return new Promise((resolve, reject) => {
            RequestDAOObj.getRequestByTpyeAndOwnerIdAssistant(type, Owner).then((data) => {
                if (data.length != 0) {
                    for (let i = 0; i < data.length; i++) {
                        data[i].REQUEST_DATE_SUBMISSION = data[i].REQUEST_DATE_SUBMISSION != null ? this.formatDate("TO-DISPLAY", data[i].REQUEST_DATE_SUBMISSION + '') : data[i].REQUEST_DATE_SUBMISSION
                        data[i].REQUEST_DATE_APPROVE = data[i].REQUEST_DATE_APPROVE != null ? this.formatDate("TO-DISPLAY", data[i].REQUEST_DATE_APPROVE + '') : data[i].REQUEST_DATE_APPROVE
                        data[i].REQUEST_RECEIPT_DATE = data[i].REQUEST_RECEIPT_DATE != null ? this.formatDate("TO-DISPLAY", data[i].REQUEST_RECEIPT_DATE + '') : data[i].REQUEST_RECEIPT_DATE
                        data[i].REQUEST_DATE_ISSUED = data[i].REQUEST_DATE_ISSUED != null ? this.formatDate("TO-DISPLAY", data[i].REQUEST_DATE_ISSUED + '') : data[i].REQUEST_DATE_ISSUED
                        data[i].REQUEST_DATE_EXPIRED = data[i].REQUEST_DATE_EXPIRED != null ? this.formatDate("TO-DISPLAY", data[i].REQUEST_DATE_EXPIRED + '') : data[i].REQUEST_DATE_EXPIRED
                        data[i].REQUEST_LAST_UPDATE = data[i].REQUEST_LAST_UPDATE != null ? this.formatDate("TO-DISPLAY", data[i].REQUEST_LAST_UPDATE + '') : data[i].REQUEST_LAST_UPDATE
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
        request.user_update = username
        // console.log(personal)

        if (personal[0].is_personal_changed) {
            request.personal_id_owner = personal[0].id
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
            this.updatePersonalRequest(newpersonal).then((updatePersonalStatus) => {
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
        if (request.no != '') {
            Edata.perosonal_id_st = personal[0].id
            //Update !!
            let item_return = {
                train_id: '',
                reference_id: '',
                land_id: '',
                address_land_id: '',
                establishment_id:''
            }
            return new Promise((resolve, reject) => {
                if (request.is_request_changed) {
                    if (request.image_is_changed) {
                        this.insertImageEstablishments(image, request.image_name)
                    }
                    if (request.reference_id === 'YES') {
                        if (reference.is_reference_changed) {
                            this.loopUpdateReference(reference).then((result) => {
                                console.log('1.reference.is_reference_changed')
                                console.log(result)
                                request.reference_id = result.REFERENCE_ID
                                item_return.reference_id = result.REFERENCE_ID
                                if (request.train_id === 'YES') {
                                    // มีสิทธิ์ เป็น Insert
                                    if (train.is_trian_changed) {
                                        this.loopUpdateTrain(train).then((result) => {
                                            console.log('1.reference.is_reference_changed 2.train.is_trian_changed')
                                            console.log(result)
                                            request.train_id = result.TRAIN_ID
                                            item_return.train_id = result.TRAIN_ID
                                            //UPDATE 
                                            if (Edata.is_establishment_changed) {
                                                if (Edata.is_land_owned === 'YES') {
                                                    if (land.is_land_changed) {
                                                        if (addressOwner.is_address_owner_changed) {
                                                            this.loopUpdateLand(land, addressOwner).then((land_data_update) => {
                                                                item_return.land_id = land_data_update.id
                                                                item_return.address_land_id = land_data_update.address
                                                                if (land_data_update.address === addressOwner.id) {
                                                                    console.log('GGGGGGGGG  - 1')
                                                                    this.updateAddress(this.formatInsert('ADDRESS', addressOwner))
                                                                }
                                                                Edata.is_land_owned = land_data_update.id
                                                                request.establishment_address_id = land_data_update.address
                                                                request.establishment_is_land_owned = land_data_update.id
                                                                request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                                                request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                                                console.log('7_update_request')
                                                                this.updateRequest(request)
                                                                console.log(`land.file_upload_changed ${land.file_upload_changed === true} ${land.file_upload_changed}`)
                                                                if (land.file_upload_changed) {
                                                                    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!! UPLOAD !!!!!!!!!!!!!!!')
                                                                    file.name = item_return.land_id
                                                                    this.insertFile(file)
                                                                }
                                                                let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                                                this.updateEstablishmentAndCheckDuplication(new_edata,address)
                                                            })
                                                        } else {
                                                            this.loopUpdateLand(land, addressOwner).then((land_data_update) => {
                                                                item_return.land_id = land_data_update.id
                                                                item_return.address = land_data_update.address

                                                                Edata.is_land_owned = land_data_update.id
                                                                request.establishment_address_id = land_data_update.address
                                                                request.establishment_is_land_owned = land_data_update.id
                                                                request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                                                request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                                                
                                                                
                                                                console.log(`land.file_upload_changed ${land.file_upload_changed === true} ${land.file_upload_changed}`)
                                                                if (land.file_upload_changed) {
                                                                    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!! UPLOAD !!!!!!!!!!!!!!!')
                                                                    file.name = item_return.land_id
                                                                    this.insertFile(file)
                                                                }
                                                                let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                                                this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                                                    if(est_id != true && est_id != false){
                                                                        request.establishment_id = est_id
                                                                        console.log('8_update_request')
                                                                        this.updateRequest(request)
                                                                    }else{
                                                                        console.log('8_update_request-02')
                                                                        this.updateRequest(request)
                                                                    }
                                                                })
                                                            })
                                                        }
                                                    } else {
                                                        Edata.is_land_owned = land.id
                                                        let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                                        
                                                        request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                                        request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                                        
            
                                                        this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                                            if(est_id != true && est_id != false){
                                                                request.establishment_id = est_id
                                                                console.log('9_update_request')
                                                                this.updateRequest(request)
                                                            }else{
                                                                console.log('9_update_request-02')
                                                                this.updateRequest(request)
                                                            }
                                                        })
                                                    }
                                                } else {
                                                    let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                                    request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                                    request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                                    this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                                        if(est_id != true && est_id != false){
                                                            request.establishment_id = est_id
                                                            console.log('#1')
                                                            this.updateRequest(request)
                                                        }else{
                                                            console.log('#1-02')
                                                            this.updateRequest(request)
                                                        }
                                                    })
                                                }

                                            } else {
                                                request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                                request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                                console.log('#2')
                                                this.updateRequest(request)
                                            }

                                        })
                                    } else {
                                        request.train_id = train.id
                                        item_return.train_id = train.id
                                        console.log('1.reference.is_reference_changed 2.train.is_trian_changed = false')
                                        console.log(request.train_id)
                                        //UPDATE
                                        if (Edata.is_establishment_changed) {
                                            if (Edata.is_land_owned === 'YES') {
                                                if (land.is_land_changed) {
                                                    if (addressOwner.is_address_owner_changed) {
                                                        this.loopUpdateLand(land, addressOwner).then((land_data_update) => {
                                                            item_return.land_id = land_data_update.id
                                                            item_return.address_land_id = land_data_update.address
                                                            if (land_data_update.address === addressOwner.id) {
                                                                console.log('GGGGGGGGG  - 2')
                                                                this.updateAddress(this.formatInsert('ADDRESS', addressOwner))
                                                            }
                                                            Edata.is_land_owned = land_data_update.id
                                                            request.establishment_address_id = land_data_update.address
                                                            request.establishment_is_land_owned = land_data_update.id
                                                            request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                                            request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                                          
                                                            console.log(`land.file_upload_changed ${land.file_upload_changed === true} ${land.file_upload_changed}`)
                                                            if (land.file_upload_changed) {
                                                                console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!! UPLOAD !!!!!!!!!!!!!!!')
                                                                file.name = item_return.land_id
                                                                this.insertFile(file)
                                                            }
                                                            let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                                            this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                                                if(est_id != true && est_id != false){
                                                                    request.establishment_id = est_id
                                                                    console.log('#3')
                                                                    this.updateRequest(request)
                                                                }else{
                                                                    console.log('#3-02')
                                                                    this.updateRequest(request)
                                                                }
                                                            })
                                                        })
                                                    } else {
                                                        this.loopUpdateLand(land, addressOwner).then((land_data_update) => {
                                                            item_return.land_id = land_data_update.id
                                                            item_return.address = land_data_update.address

                                                            Edata.is_land_owned = land_data_update.id
                                                            request.establishment_address_id = land_data_update.address
                                                            request.establishment_is_land_owned = land_data_update.id
                                                            request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                                            request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                                            console.log('#4')
                                                            console.log(`land.file_upload_changed ${land.file_upload_changed === true} ${land.file_upload_changed}`)
                                                            if (land.file_upload_changed) {
                                                                console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!! UPLOAD !!!!!!!!!!!!!!!')
                                                                file.name = item_return.land_id
                                                                this.insertFile(file)
                                                            }
                                                            let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                                            this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                                                if(est_id != true && est_id != false){
                                                                    request.establishment_id = est_id
                                                                    console.log('#1')
                                                                    this.updateRequest(request)
                                                                }else{
                                                                    console.log('#1-02')
                                                                    this.updateRequest(request)
                                                                }
                                                            })
                                                        })
                                                    }
                                                } else {
                                                    Edata.is_land_owned = land.id
                                                    let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                                    request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                                    request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                                    console.log('#5')
                                                    this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                                        if(est_id != true && est_id != false){
                                                            request.establishment_id = est_id
                                                            console.log('#1')
                                                            this.updateRequest(request)
                                                        }else{
                                                            console.log('#1-02')
                                                            this.updateRequest(request)
                                                        }
                                                    })
                                                }
                                            } else {
                                                let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                                request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                                request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                                console.log('#6')
                                                this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                                    if(est_id != true && est_id != false){
                                                        request.establishment_id = est_id
                                                        console.log('#1')
                                                        this.updateRequest(request)
                                                    }else{
                                                        console.log('#1-02')
                                                        this.updateRequest(request)
                                                    }
                                                })
                                            }

                                        } else {
                                            request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                            request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                            console.log('#7')
                                            this.updateRequest(request)
                                        }
                                    }
                                } else {
                                    item_return.train_id = ''
                                    console.log('1.reference.is_reference_changed 2.request.is_trian_changed === NO ')
                                    console.log(request.reference_id)
                                    if (Edata.is_establishment_changed) {
                                        if (Edata.is_land_owned === 'YES') {
                                            if (land.is_land_changed) {
                                                if (addressOwner.is_address_owner_changed) {
                                                    this.loopUpdateLand(land, addressOwner).then((land_data_update) => {
                                                        item_return.land_id = land_data_update.id
                                                        item_return.address_land_id = land_data_update.address
                                                        if (land_data_update.address === addressOwner.id) {
                                                            console.log('GGGGGGGGG  - 3')
                                                            this.updateAddress(this.formatInsert('ADDRESS', addressOwner))
                                                        }
                                                        Edata.is_land_owned = land_data_update.id
                                                        request.establishment_address_id = land_data_update.address
                                                        request.establishment_is_land_owned = land_data_update.id
                                                        request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                                        request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                                        console.log('#8')
                                                     
                                                        console.log(`land.file_upload_changed ${land.file_upload_changed === true} ${land.file_upload_changed}`)
                                                        if (land.file_upload_changed) {
                                                            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!! UPLOAD !!!!!!!!!!!!!!!')
                                                            file.name = item_return.land_id
                                                            this.insertFile(file)
                                                        }
                                                        let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                                        this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                                            if(est_id != true && est_id != false){
                                                                request.establishment_id = est_id
                                                                console.log('#1')
                                                                this.updateRequest(request)
                                                            }else{
                                                                console.log('#1-02')
                                                                this.updateRequest(request)
                                                            }
                                                        })
                                                    })
                                                } else {
                                                    this.loopUpdateLand(land, addressOwner).then((land_data_update) => {
                                                        item_return.land_id = land_data_update.id
                                                        item_return.address = land_data_update.address

                                                        Edata.is_land_owned = land_data_update.id
                                                        request.establishment_address_id = land_data_update.address
                                                        request.establishment_is_land_owned = land_data_update.id
                                                        request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                                        request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                                        console.log('#9')
                                                        console.log(`land.file_upload_changed ${land.file_upload_changed === true} ${land.file_upload_changed}`)
                                                        if (land.file_upload_changed) {
                                                            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!! UPLOAD !!!!!!!!!!!!!!!')
                                                            file.name = item_return.land_id
                                                            this.insertFile(file)
                                                        }
                                                        let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                                        this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                                            if(est_id != true && est_id != false){
                                                                request.establishment_id = est_id
                                                                console.log('#1')
                                                                this.updateRequest(request)
                                                            }else{
                                                                console.log('#1-02')
                                                                this.updateRequest(request)
                                                            }
                                                        })
                                                    })
                                                }
                                            } else {
                                                Edata.is_land_owned = land.id
                                                let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                               
                                                request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                                request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                                console.log('#10')
                                                this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                                    if(est_id != true && est_id != false){
                                                        request.establishment_id = est_id
                                                        console.log('#1')
                                                        this.updateRequest(request)
                                                    }else{
                                                        console.log('#1-02')
                                                        this.updateRequest(request)
                                                    }
                                                })
                                            }
                                        } else {
                                            let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                            request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                            request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                            console.log('#11')
                                            this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                                if(est_id != true && est_id != false){
                                                    request.establishment_id = est_id
                                                    console.log('#1')
                                                    this.updateRequest(request)
                                                }else{
                                                    console.log('#1-02')
                                                    this.updateRequest(request)
                                                }
                                            })
                                        }

                                    } else {
                                        request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                        request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                        console.log('#12')
                                        this.updateRequest(request)
                                    }
                                }
                            })
                        } else {
                            request.reference_id = reference.id
                            item_return.reference_id = reference.id
                            if (request.train_id === 'YES') {
                                if (train.is_trian_changed) {
                                    this.loopUpdateTrain(train).then((result) => {
                                        request.train_id = result.TRAIN_ID
                                        item_return.train_id = result.TRAIN_ID
                                        if (Edata.is_establishment_changed) {
                                            if (Edata.is_land_owned === 'YES') {
                                                if (land.is_land_changed) {
                                                    if (addressOwner.is_address_owner_changed) {
                                                        this.loopUpdateLand(land, addressOwner).then((land_data_update) => {
                                                            item_return.land_id = land_data_update.id
                                                            item_return.address_land_id = land_data_update.address
                                                            if (land_data_update.address === addressOwner.id) {
                                                                console.log('GGGGGGGGG  - 4')
                                                                this.updateAddress(this.formatInsert('ADDRESS', addressOwner))
                                                            }
                                                            Edata.is_land_owned = land_data_update.id
                                                            request.establishment_address_id = land_data_update.address
                                                            request.establishment_is_land_owned = land_data_update.id
                                                            request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                                            request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                                            console.log('#13')
                                                           

                                                            if (land.file_upload_changed) {
                                                                file.name = item_return.land_id
                                                                this.insertFile(file)
                                                            }
                                                            let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                                            this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                                                if(est_id != true && est_id != false){
                                                                    request.establishment_id = est_id
                                                                    console.log('#1')
                                                                    this.updateRequest(request)
                                                                }else{
                                                                    console.log('#1-02')
                                                                    this.updateRequest(request)
                                                                }
                                                            })
                                                        })
                                                    } else {
                                                        this.loopUpdateLand(land, addressOwner).then((land_data_update) => {
                                                            item_return.land_id = land_data_update.id
                                                            item_return.address = land_data_update.address

                                                            Edata.is_land_owned = land_data_update.id
                                                            request.establishment_address_id = land_data_update.address
                                                            request.establishment_is_land_owned = land_data_update.id
                                                            request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                                            request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                                            console.log('#14')
                                                            console.log(`land.file_upload_changed ${land.file_upload_changed === true} ${land.file_upload_changed}`)
                                                            if (land.file_upload_changed) {
                                                                console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!! UPLOAD !!!!!!!!!!!!!!!')
                                                                file.name = item_return.land_id
                                                                this.insertFile(file)
                                                            }
                                                            let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                                            this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                                                if(est_id != true && est_id != false){
                                                                    request.establishment_id = est_id
                                                                    console.log('#1')
                                                                    this.updateRequest(request)
                                                                }else{
                                                                    console.log('#1-02')
                                                                    this.updateRequest(request)
                                                                }
                                                            })
                                                        })
                                                    }
                                                } else {
                                                    Edata.is_land_owned = land.id
                                                    let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                                    request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                                    request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                                    console.log('#15')
                                                    this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                                        if(est_id != true && est_id != false){
                                                            request.establishment_id = est_id
                                                            console.log('#1')
                                                            this.updateRequest(request)
                                                        }else{
                                                            console.log('#1-02')
                                                            this.updateRequest(request)
                                                        }
                                                    })
                                                }
                                            } else {
                                                let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                                request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                                request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                                console.log('#15')
                                                this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                                    if(est_id != true && est_id != false){
                                                        request.establishment_id = est_id
                                                        console.log('#1')
                                                        this.updateRequest(request)
                                                    }else{
                                                        console.log('#1-02')
                                                        this.updateRequest(request)
                                                    }
                                                })
                                            }
                                        } else {
                                            request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                            request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                            console.log('#15')
                                            this.updateRequest(request)
                                        }
                                    })
                                } else {
                                    request.train_id = train.id
                                    item_return.train_id = train.id
                                    if (Edata.is_establishment_changed) {
                                        if (Edata.is_land_owned === 'YES') {
                                            if (land.is_land_changed) {
                                                if (addressOwner.is_address_owner_changed) {
                                                    this.loopUpdateLand(land, addressOwner).then((land_data_update) => {
                                                        item_return.land_id = land_data_update.id
                                                        item_return.address_land_id = land_data_update.address
                                                        if (land_data_update.address === addressOwner.id) {
                                                            console.log('GGGGGGGGG  - 4')
                                                            this.updateAddress(this.formatInsert('ADDRESS', addressOwner))
                                                        }
                                                        Edata.is_land_owned = land_data_update.id
                                                        request.establishment_address_id = land_data_update.address
                                                        request.establishment_is_land_owned = land_data_update.id
                                                        request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                                        request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                                        console.log('#13')

                                                        if (land.file_upload_changed) {
                                                            file.name = item_return.land_id
                                                            this.insertFile(file)
                                                        }
                                                        let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                                        this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                                            if(est_id != true && est_id != false){
                                                                request.establishment_id = est_id
                                                                console.log('#1')
                                                                this.updateRequest(request)
                                                            }else{
                                                                console.log('#1-02')
                                                                this.updateRequest(request)
                                                            }
                                                        })
                                                    })
                                                } else {
                                                    this.loopUpdateLand(land, addressOwner).then((land_data_update) => {
                                                        item_return.land_id = land_data_update.id
                                                        item_return.address = land_data_update.address

                                                        Edata.is_land_owned = land_data_update.id
                                                        request.establishment_address_id = land_data_update.address
                                                        request.establishment_is_land_owned = land_data_update.id
                                                        request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                                        request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                                        console.log('#14')
                                                        console.log(`land.file_upload_changed ${land.file_upload_changed === true} ${land.file_upload_changed}`)
                                                        if (land.file_upload_changed) {
                                                            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!! UPLOAD !!!!!!!!!!!!!!!')
                                                            file.name = item_return.land_id
                                                            this.insertFile(file)
                                                        }
                                                        let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                                        this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                                            if(est_id != true && est_id != false){
                                                                request.establishment_id = est_id
                                                                console.log('#1')
                                                                this.updateRequest(request)
                                                            }else{
                                                                console.log('#1-02')
                                                                this.updateRequest(request)
                                                            }
                                                        })
                                                    })
                                                }
                                            } else {
                                                Edata.is_land_owned = land.id
                                                let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                                request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                                request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                                console.log('#15')
                                                this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                                    if(est_id != true && est_id != false){
                                                        request.establishment_id = est_id
                                                        console.log('#1')
                                                        this.updateRequest(request)
                                                    }else{
                                                        console.log('#1-02')
                                                        this.updateRequest(request)
                                                    }
                                                })
                                            }
                                        } else {
                                            let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                            request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                            request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                            console.log('#15')
                                            this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                                if(est_id != true && est_id != false){
                                                    request.establishment_id = est_id
                                                    console.log('#1')
                                                    this.updateRequest(request)
                                                }else{
                                                    console.log('#1-02')
                                                    this.updateRequest(request)
                                                }
                                            })
                                        }
                                    } else {
                                        request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                        request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                        console.log('#15')
                                        this.updateRequest(request)
                                    }
                                }
                            } else {
                                if (Edata.is_establishment_changed) {
                                    if (Edata.is_land_owned === 'YES') {
                                        if (land.is_land_changed) {
                                            if (addressOwner.is_address_owner_changed) {
                                                this.loopUpdateLand(land, addressOwner).then((land_data_update) => {
                                                    item_return.land_id = land_data_update.id
                                                    item_return.address_land_id = land_data_update.address
                                                    if (land_data_update.address === addressOwner.id) {
                                                        console.log('GGGGGGGGG  - 4')
                                                        this.updateAddress(this.formatInsert('ADDRESS', addressOwner))
                                                    }
                                                    Edata.is_land_owned = land_data_update.id
                                                    request.establishment_address_id = land_data_update.address
                                                    request.establishment_is_land_owned = land_data_update.id
                                                    request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                                    request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                                    console.log('#13')

                                                    if (land.file_upload_changed) {
                                                        file.name = item_return.land_id
                                                        this.insertFile(file)
                                                    }
                                                    let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                                    this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                                        if(est_id != true && est_id != false){
                                                            request.establishment_id = est_id
                                                            console.log('#1')
                                                            this.updateRequest(request)
                                                        }else{
                                                            console.log('#1-02')
                                                            this.updateRequest(request)
                                                        }
                                                    })
                                                })
                                            } else {
                                                this.loopUpdateLand(land, addressOwner).then((land_data_update) => {
                                                    item_return.land_id = land_data_update.id
                                                    item_return.address = land_data_update.address

                                                    Edata.is_land_owned = land_data_update.id
                                                    request.establishment_address_id = land_data_update.address
                                                    request.establishment_is_land_owned = land_data_update.id
                                                    request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                                    request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                                    console.log('#14')
                                                    console.log(`land.file_upload_changed ${land.file_upload_changed === true} ${land.file_upload_changed}`)
                                                    if (land.file_upload_changed) {
                                                        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!! UPLOAD !!!!!!!!!!!!!!!')
                                                        file.name = item_return.land_id
                                                        this.insertFile(file)
                                                    }
                                                    let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                                    this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                                        if(est_id != true && est_id != false){
                                                            request.establishment_id = est_id
                                                            console.log('#1')
                                                            this.updateRequest(request)
                                                        }else{
                                                            console.log('#1-02')
                                                            this.updateRequest(request)
                                                        }
                                                    })
                                                })
                                            }
                                        } else {
                                            Edata.is_land_owned = land.id
                                            let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                            request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                            request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                            console.log('#15')
                                            this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                                if(est_id != true && est_id != false){
                                                    request.establishment_id = est_id
                                                    console.log('#1')
                                                    this.updateRequest(request)
                                                }else{
                                                    console.log('#1-02')
                                                    this.updateRequest(request)
                                                }
                                            })
                                        }
                                    } else {
                                        let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                        request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                        request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                        console.log('#15')
                                        this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                            if(est_id != true && est_id != false){
                                                request.establishment_id = est_id
                                                console.log('#1')
                                                this.updateRequest(request)
                                            }else{
                                                console.log('#1-02')
                                                this.updateRequest(request)
                                            }
                                        })
                                    }
                                } else {
                                    request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                    request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                    console.log('#15')
                                    this.updateRequest(request)
                                }
                            }
                        }
                    }
                    else if (request.train_id === 'YES') {
                        if (train.is_trian_changed) {
                            this.loopUpdateTrain(train).then((result) => {
                                console.log('1.train.is_trian_changed')
                                console.log(result)
                                request.train_id = result.TRAIN_ID
                                item_return.train_id = result.TRAIN_ID
                                if (request.reference_id === 'YES') {
                                    if (reference.is_reference_changed) {
                                        this.loopUpdateReference(reference).then((result) => {
                                            request.reference_id = result.REFERENCE_ID
                                            item_return.reference_id = result.REFERENCE_ID
                                            //UPDATE
                                            console.log('1.train.is_trian_changed 2.reference.is_reference_changed')
                                            console.log(result)
                                            if (Edata.is_establishment_changed) {
                                                if (Edata.is_land_owned === 'YES') {
                                                    if (land.is_land_changed) {
                                                        if (addressOwner.is_address_owner_changed) {
                                                            this.loopUpdateLand(land, addressOwner).then((land_data_update) => {
                                                                item_return.land_id = land_data_update.id
                                                                item_return.address_land_id = land_data_update.address
                                                                if (land_data_update.address === addressOwner.id) {
                                                                    console.log('GGGGGGGGG  - 4')
                                                                    this.updateAddress(this.formatInsert('ADDRESS', addressOwner))
                                                                }
                                                                Edata.is_land_owned = land_data_update.id
                                                                request.establishment_address_id = land_data_update.address
                                                                request.establishment_is_land_owned = land_data_update.id
                                                                request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                                                request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                                                console.log('#13')
                                                                console.log(`land.file_upload_changed ${land.file_upload_changed === true} ${land.file_upload_changed}`)
                                                                if (land.file_upload_changed) {
                                                                    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!! UPLOAD !!!!!!!!!!!!!!!')
                                                                    file.name = item_return.land_id
                                                                    this.insertFile(file)
                                                                }
                                                                let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                                                this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                                                    if(est_id != true && est_id != false){
                                                                        request.establishment_id = est_id
                                                                        console.log('#1')
                                                                        this.updateRequest(request)
                                                                    }else{
                                                                        console.log('#1-02')
                                                                        this.updateRequest(request)
                                                                    }
                                                                })
                                                            })
                                                        } else {
                                                            this.loopUpdateLand(land, addressOwner).then((land_data_update) => {
                                                                item_return.land_id = land_data_update.id
                                                                item_return.address = land_data_update.address

                                                                Edata.is_land_owned = land_data_update.id
                                                                request.establishment_address_id = land_data_update.address
                                                                request.establishment_is_land_owned = land_data_update.id
                                                                request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                                                request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                                                console.log('#14')
                                                                console.log(`land.file_upload_changed ${land.file_upload_changed === true} ${land.file_upload_changed}`)
                                                                if (land.file_upload_changed) {
                                                                    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!! UPLOAD !!!!!!!!!!!!!!!')
                                                                    file.name = item_return.land_id
                                                                    this.insertFile(file)
                                                                }
                                                                let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                                                this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                                                    if(est_id != true && est_id != false){
                                                                        request.establishment_id = est_id
                                                                        console.log('#1')
                                                                        this.updateRequest(request)
                                                                    }else{
                                                                        console.log('#1-02')
                                                                        this.updateRequest(request)
                                                                    }
                                                                })
                                                            })
                                                        }

                                                    } else {
                                                        Edata.is_land_owned = land.id
                                                        let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                                        this.updateEstablishmentAndCheckDuplication(new_edata,address)
                                                    }
                                                } else {
                                                    let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                                    this.updateEstablishmentAndCheckDuplication(new_edata,address)
                                                }

                                            } else {
                                                request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                                request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                                console.log('#15')
                                                this.updateRequest(request)
                                            }
                                        })
                                    } else {
                                        request.reference_id = reference.id
                                        item_return.reference_id = reference.id
                                        console.log('1.train.is_trian_changed 2.reference.is_reference_changed = false')
                                        console.log(request.reference_id)
                                        if (Edata.is_establishment_changed) {
                                            if (Edata.is_land_owned === 'YES') {
                                                if (land.is_land_changed) {
                                                    if (addressOwner.is_address_owner_changed) {
                                                        this.loopUpdateLand(land, addressOwner).then((land_data_update) => {
                                                            item_return.land_id = land_data_update.id
                                                            item_return.address_land_id = land_data_update.address
                                                            if (land_data_update.address === addressOwner.id) {
                                                                console.log('GGGGGGGGG  - 5')
                                                                this.updateAddress(this.formatInsert('ADDRESS', addressOwner))
                                                            }
                                                            Edata.is_land_owned = land_data_update.id
                                                            request.establishment_address_id = land_data_update.address
                                                            request.establishment_is_land_owned = land_data_update.id
                                                            request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                                            request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                                            console.log('#16')
                                                            console.log(`land.file_upload_changed ${land.file_upload_changed === true} ${land.file_upload_changed}`)
                                                            if (land.file_upload_changed) {
                                                                console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!! UPLOAD !!!!!!!!!!!!!!!')
                                                                file.name = item_return.land_id
                                                                this.insertFile(file)
                                                            }
                                                            let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                                            this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                                                if(est_id != true && est_id != false){
                                                                    request.establishment_id = est_id
                                                                    console.log('#1')
                                                                    this.updateRequest(request)
                                                                }else{
                                                                    console.log('#1-02')
                                                                    this.updateRequest(request)
                                                                }
                                                            })
                                                        })
                                                    } else {
                                                        this.loopUpdateLand(land, addressOwner).then((land_data_update) => {
                                                            item_return.land_id = land_data_update.id
                                                            item_return.address = land_data_update.address

                                                            Edata.is_land_owned = land_data_update.id
                                                            request.establishment_address_id = land_data_update.address
                                                            request.establishment_is_land_owned = land_data_update.id
                                                            request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                                            request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                                            console.log('#17')
                                                            console.log(`land.file_upload_changed ${land.file_upload_changed === true} ${land.file_upload_changed}`)
                                                            if (land.file_upload_changed) {
                                                                console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!! UPLOAD !!!!!!!!!!!!!!!')
                                                                file.name = item_return.land_id
                                                                this.insertFile(file)
                                                            }
                                                            let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                                            this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                                                if(est_id != true && est_id != false){
                                                                    request.establishment_id = est_id
                                                                    console.log('#1')
                                                                    this.updateRequest(request)
                                                                }else{
                                                                    console.log('#1-02')
                                                                    this.updateRequest(request)
                                                                }
                                                            })
                                                        })
                                                    }
                                                } else {
                                                    Edata.is_land_owned = land.id
                                                    let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                                    request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                                    request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                                    console.log('#18')
                                                    this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                                        if(est_id != true && est_id != false){
                                                            request.establishment_id = est_id
                                                            console.log('#1')
                                                            this.updateRequest(request)
                                                        }else{
                                                            console.log('#1-02')
                                                            this.updateRequest(request)
                                                        }
                                                    })
                                                }
                                            } else {
                                                let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                                request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                                request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                                console.log('#19')
                                                this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                                    if(est_id != true && est_id != false){
                                                        request.establishment_id = est_id
                                                        console.log('#1')
                                                        this.updateRequest(request)
                                                    }else{
                                                        console.log('#1-02')
                                                        this.updateRequest(request)
                                                    }
                                                })
                                            }

                                        } else {
                                            request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                            request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                            console.log('#20')
                                            this.updateRequest(request)
                                        }
                                    }
                                } else {
                                    //request.reference_id = reference.id
                                    item_return.reference_id = ''
                                    if (Edata.is_establishment_changed) {
                                        if (Edata.is_land_owned === 'YES') {
                                            if (land.is_land_changed) {
                                                if (addressOwner.is_address_owner_changed) {
                                                    this.loopUpdateLand(land, addressOwner).then((land_data_update) => {
                                                        item_return.land_id = land_data_update.id
                                                        item_return.address_land_id = land_data_update.address
                                                        if (land_data_update.address === addressOwner.id) {
                                                            console.log('GGGGGGGGG  - 6')
                                                            this.updateAddress(this.formatInsert('ADDRESS', addressOwner))
                                                        }
                                                        Edata.is_land_owned = land_data_update.id
                                                        request.establishment_address_id = land_data_update.address
                                                        request.establishment_is_land_owned = land_data_update.id
                                                        request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                                        request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                                        console.log('#21')
                                                        console.log(`land.file_upload_changed ${land.file_upload_changed === true} ${land.file_upload_changed}`)
                                                        if (land.file_upload_changed) {
                                                            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!! UPLOAD !!!!!!!!!!!!!!!')
                                                            file.name = item_return.land_id
                                                            this.insertFile(file)
                                                        }
                                                        let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                                        this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                                            if(est_id != true && est_id != false){
                                                                request.establishment_id = est_id
                                                                console.log('#1')
                                                                this.updateRequest(request)
                                                            }else{
                                                                console.log('#1-02')
                                                                this.updateRequest(request)
                                                            }
                                                        })
                                                    })
                                                } else {
                                                    this.loopUpdateLand(land, addressOwner).then((land_data_update) => {
                                                        item_return.land_id = land_data_update.id
                                                        item_return.address = land_data_update.address

                                                        Edata.is_land_owned = land_data_update.id
                                                        request.establishment_address_id = land_data_update.address
                                                        request.establishment_is_land_owned = land_data_update.id
                                                        request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                                        request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                                        console.log('#22')
                                                        console.log(`land.file_upload_changed ${land.file_upload_changed === true} ${land.file_upload_changed}`)
                                                        if (land.file_upload_changed) {
                                                            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!! UPLOAD !!!!!!!!!!!!!!!')
                                                            file.name = item_return.land_id
                                                            this.insertFile(file)
                                                        }
                                                        let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                                        this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                                            if(est_id != true && est_id != false){
                                                                request.establishment_id = est_id
                                                                console.log('#1')
                                                                this.updateRequest(request)
                                                            }else{
                                                                console.log('#1-02')
                                                                this.updateRequest(request)
                                                            }
                                                        })
                                                    })
                                                }
                                            } else {
                                                Edata.is_land_owned = land.id
                                                let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                                request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                                request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                                console.log('#23')
                                                this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                                    if(est_id != true && est_id != false){
                                                        request.establishment_id = est_id
                                                        console.log('#1')
                                                        this.updateRequest(request)
                                                    }else{
                                                        console.log('#1-02')
                                                        this.updateRequest(request)
                                                    }
                                                })
                                            }
                                        } else {
                                            let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                            request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                            request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                            console.log('#24')
                                            this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                                if(est_id != true && est_id != false){
                                                    request.establishment_id = est_id
                                                    console.log('#1')
                                                    this.updateRequest(request)
                                                }else{
                                                    console.log('#1-02')
                                                    this.updateRequest(request)
                                                }
                                            })
                                        }

                                    } else {
                                        request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                        request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                        console.log('#25')
                                        this.updateRequest(request)
                                    }

                                }
                            })
                        } else {
                            request.train_id = train.id
                            item_return.train_id = train.id
                            if (request.reference_id === 'YES') {
                                if (reference.is_reference_changed) {
                                    this.loopUpdateReference(reference).then((result) => {
                                        console.log('1.reference.is_reference_changed')
                                        console.log(result)
                                        request.reference_id = result.REFERENCE_ID
                                        item_return.reference_id = result.REFERENCE_ID
                                        if (Edata.is_establishment_changed) {
                                            if (Edata.is_land_owned === 'YES') {
                                                if (land.is_land_changed) {
                                                    if (addressOwner.is_address_owner_changed) {
                                                        this.loopUpdateLand(land, addressOwner).then((land_data_update) => {
                                                            item_return.land_id = land_data_update.id
                                                            item_return.address_land_id = land_data_update.address
                                                            if (land_data_update.address === addressOwner.id) {
                                                                console.log('GGGGGGGGG  - 1')
                                                                this.updateAddress(this.formatInsert('ADDRESS', addressOwner))
                                                            }
                                                            Edata.is_land_owned = land_data_update.id
                                                            request.establishment_address_id = land_data_update.address
                                                            request.establishment_is_land_owned = land_data_update.id
                                                            request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                                            request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                                            console.log('1_update_request')
                                                            console.log(`land.file_upload_changed ${land.file_upload_changed === true} ${land.file_upload_changed}`)
                                                            if (land.file_upload_changed) {
                                                                console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!! UPLOAD !!!!!!!!!!!!!!!')
                                                                file.name = item_return.land_id
                                                                this.insertFile(file)
                                                            }
                                                            let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                                            this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                                                if(est_id != true && est_id != false){
                                                                    request.establishment_id = est_id
                                                                    console.log('#1')
                                                                    this.updateRequest(request)
                                                                }else{
                                                                    console.log('#1-02')
                                                                    this.updateRequest(request)
                                                                }
                                                            })
                                                        })
                                                    } else {
                                                        this.loopUpdateLand(land, addressOwner).then((land_data_update) => {
                                                            item_return.land_id = land_data_update.id
                                                            item_return.address = land_data_update.address

                                                            Edata.is_land_owned = land_data_update.id
                                                            request.establishment_address_id = land_data_update.address
                                                            request.establishment_is_land_owned = land_data_update.id
                                                            request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                                            request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                                            console.log('2_update_request')
                                                            console.log(`land.file_upload_changed ${land.file_upload_changed === true} ${land.file_upload_changed}`)
                                                            if (land.file_upload_changed) {
                                                                console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!! UPLOAD !!!!!!!!!!!!!!!')
                                                                file.name = item_return.land_id
                                                                this.insertFile(file)
                                                            }
                                                            let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                                            this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                                                if(est_id != true && est_id != false){
                                                                    request.establishment_id = est_id
                                                                    console.log('#1')
                                                                    this.updateRequest(request)
                                                                }else{
                                                                    console.log('#1-02')
                                                                    this.updateRequest(request)
                                                                }
                                                            })
                                                        })
                                                    }
                                                } else {
                                                    Edata.is_land_owned = land.id
                                                    let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                                    request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                                    request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                                    console.log('3_update_request')
                                                    this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                                        if(est_id != true && est_id != false){
                                                            request.establishment_id = est_id
                                                            console.log('#1')
                                                            this.updateRequest(request)
                                                        }else{
                                                            console.log('#1-02')
                                                            this.updateRequest(request)
                                                        }
                                                    })
                                                }
                                            } else {
                                                let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                                request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                                request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                                console.log('#1')
                                                this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                                    if(est_id != true && est_id != false){
                                                        request.establishment_id = est_id
                                                        console.log('#1')
                                                        this.updateRequest(request)
                                                    }else{
                                                        console.log('#1-02')
                                                        this.updateRequest(request)
                                                    }
                                                })
                                            }

                                        } else {
                                            request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                            request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                            console.log('4_update_request')
                                            this.updateRequest(request)
                                        }
                                    })
                                } else {
                                    request.reference_id = reference.id
                                    item_return.reference_id = reference.id
                                    if (Edata.is_establishment_changed) {
                                        if (Edata.is_land_owned === 'YES') {
                                            if (land.is_land_changed) {
                                                if (addressOwner.is_address_owner_changed) {
                                                    this.loopUpdateLand(land, addressOwner).then((land_data_update) => {
                                                        item_return.land_id = land_data_update.id
                                                        item_return.address_land_id = land_data_update.address
                                                        if (land_data_update.address === addressOwner.id) {
                                                            console.log('GGGGGGGGG  - 4')
                                                            this.updateAddress(this.formatInsert('ADDRESS', addressOwner))
                                                        }
                                                        Edata.is_land_owned = land_data_update.id
                                                        request.establishment_address_id = land_data_update.address
                                                        request.establishment_is_land_owned = land_data_update.id
                                                        request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                                        request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                                        console.log('#13')

                                                        if (land.file_upload_changed) {
                                                            file.name = item_return.land_id
                                                            this.insertFile(file)
                                                        }
                                                        let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                                        this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                                            if(est_id != true && est_id != false){
                                                                request.establishment_id = est_id
                                                                console.log('#1')
                                                                this.updateRequest(request)
                                                            }else{
                                                                console.log('#1-02')
                                                                this.updateRequest(request)
                                                            }
                                                        })
                                                    })
                                                } else {
                                                    this.loopUpdateLand(land, addressOwner).then((land_data_update) => {
                                                        item_return.land_id = land_data_update.id
                                                        item_return.address = land_data_update.address

                                                        Edata.is_land_owned = land_data_update.id
                                                        request.establishment_address_id = land_data_update.address
                                                        request.establishment_is_land_owned = land_data_update.id
                                                        request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                                        request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                                        console.log('#14')
                                                        console.log(`land.file_upload_changed ${land.file_upload_changed === true} ${land.file_upload_changed}`)
                                                        if (land.file_upload_changed) {
                                                            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!! UPLOAD !!!!!!!!!!!!!!!')
                                                            file.name = item_return.land_id
                                                            this.insertFile(file)
                                                        }
                                                        let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                                        this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                                            if(est_id != true && est_id != false){
                                                                request.establishment_id = est_id
                                                                console.log('#1')
                                                                this.updateRequest(request)
                                                            }else{
                                                                console.log('#1-02')
                                                                this.updateRequest(request)
                                                            }
                                                        })
                                                    })
                                                }
                                            } else {
                                                Edata.is_land_owned = land.id
                                                let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                                request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                                request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                                console.log('#15')
                                                this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                                    if(est_id != true && est_id != false){
                                                        request.establishment_id = est_id
                                                        console.log('#1')
                                                        this.updateRequest(request)
                                                    }else{
                                                        console.log('#1-02')
                                                        this.updateRequest(request)
                                                    }
                                                })
                                            }
                                        } else {
                                            let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                            request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                            request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                            console.log('#15')
                                            this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                                if(est_id != true && est_id != false){
                                                    request.establishment_id = est_id
                                                    console.log('#1')
                                                    this.updateRequest(request)
                                                }else{
                                                    console.log('#1-02')
                                                    this.updateRequest(request)
                                                }
                                            })
                                        }
                                    } else {
                                        request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                        request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                        console.log('#15')
                                        this.updateRequest(request)
                                    }
                                }
                            } else {
                                if (Edata.is_establishment_changed) {
                                    if (Edata.is_land_owned === 'YES') {
                                        if (land.is_land_changed) {
                                            if (addressOwner.is_address_owner_changed) {
                                                this.loopUpdateLand(land, addressOwner).then((land_data_update) => {
                                                    item_return.land_id = land_data_update.id
                                                    item_return.address_land_id = land_data_update.address
                                                    if (land_data_update.address === addressOwner.id) {
                                                        console.log('GGGGGGGGG  - 1')
                                                        this.updateAddress(this.formatInsert('ADDRESS', addressOwner))
                                                    }
                                                    Edata.is_land_owned = land_data_update.id
                                                    request.establishment_address_id = land_data_update.address
                                                    request.establishment_is_land_owned = land_data_update.id
                                                    request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                                    request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                                    console.log('1_update_request')
                                                    console.log(`land.file_upload_changed ${land.file_upload_changed === true} ${land.file_upload_changed}`)
                                                    if (land.file_upload_changed) {
                                                        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!! UPLOAD !!!!!!!!!!!!!!!')
                                                        file.name = item_return.land_id
                                                        this.insertFile(file)
                                                    }
                                                    let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                                    this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                                        if(est_id != true && est_id != false){
                                                            request.establishment_id = est_id
                                                            console.log('#1')
                                                            this.updateRequest(request)
                                                        }else{
                                                            console.log('#1-02')
                                                            this.updateRequest(request)
                                                        }
                                                    })
                                                })
                                            } else {
                                                this.loopUpdateLand(land, addressOwner).then((land_data_update) => {
                                                    item_return.land_id = land_data_update.id
                                                    item_return.address = land_data_update.address

                                                    Edata.is_land_owned = land_data_update.id
                                                    request.establishment_address_id = land_data_update.address
                                                    request.establishment_is_land_owned = land_data_update.id
                                                    request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                                    request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                                    console.log('2_update_request')
                                                    console.log(`land.file_upload_changed ${land.file_upload_changed === true} ${land.file_upload_changed}`)
                                                    if (land.file_upload_changed) {
                                                        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!! UPLOAD !!!!!!!!!!!!!!!')
                                                        file.name = item_return.land_id
                                                        this.insertFile(file)
                                                    }
                                                    let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                                    this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                                        if(est_id != true && est_id != false){
                                                            request.establishment_id = est_id
                                                            console.log('#1')
                                                            this.updateRequest(request)
                                                        }else{
                                                            console.log('#1-02')
                                                            this.updateRequest(request)
                                                        }
                                                    })
                                                })
                                            }
                                        } else {
                                            Edata.is_land_owned = land.id
                                            let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                            request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                            request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                            console.log('3_update_request')
                                            this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                                if(est_id != true && est_id != false){
                                                    request.establishment_id = est_id
                                                    console.log('#1')
                                                    this.updateRequest(request)
                                                }else{
                                                    console.log('#1-02')
                                                    this.updateRequest(request)
                                                }
                                            })
                                        }
                                    } else {
                                        let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                        request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                        request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                        console.log('#1')
                                        this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                            if(est_id != true && est_id != false){
                                                request.establishment_id = est_id
                                                console.log('#1')
                                                this.updateRequest(request)
                                            }else{
                                                console.log('#1-02')
                                                this.updateRequest(request)
                                            }
                                        })
                                    }

                                } else {
                                    request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                    request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                    console.log('4_update_request')
                                    this.updateRequest(request)
                                }
                            }
                        }
                    } else {
                        if (request.train_id != 'YES' && request.reference_id != 'YES') {
                            //// Update request !!!!!!!!!!!  format Insert 
                            if (Edata.is_establishment_changed) {
                                if (Edata.is_land_owned === 'YES') {
                                    if (land.is_land_changed) {
                                        if (addressOwner.is_address_owner_changed) {
                                            this.loopUpdateLand(land, addressOwner).then((land_data_update) => {
                                                item_return.land_id = land_data_update.id
                                                item_return.address_land_id = land_data_update.address
                                                if (land_data_update.address === addressOwner.id) {
                                                    console.log('GGGGGGGGG  - 7')
                                                    this.updateAddress(this.formatInsert('ADDRESS', addressOwner))
                                                }
                                                Edata.is_land_owned = land_data_update.id
                                                request.establishment_address_id = land_data_update.address
                                                request.establishment_is_land_owned = land_data_update.id
                                                request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                                request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                                console.log('#26')
                                                console.log(`land.file_upload_changed ${land.file_upload_changed === true} ${land.file_upload_changed}`)
                                                if (land.file_upload_changed) {
                                                    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!! UPLOAD !!!!!!!!!!!!!!!')
                                                    file.name = item_return.land_id
                                                    this.insertFile(file)
                                                }
                                                let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                                this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                                    if(est_id != true && est_id != false){
                                                        request.establishment_id = est_id
                                                        console.log('#1')
                                                        this.updateRequest(request)
                                                    }else{
                                                        console.log('#1-02')
                                                        this.updateRequest(request)
                                                    }
                                                })
                                            })
                                        } else {
                                            this.loopUpdateLand(land, addressOwner).then((land_data_update) => {
                                                item_return.land_id = land_data_update.id
                                                item_return.address = land_data_update.address

                                                Edata.is_land_owned = land_data_update.id
                                                request.establishment_address_id = land_data_update.address
                                                request.establishment_is_land_owned = land_data_update.id
                                                request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                                request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                                console.log('#27')
                                                console.log(`land.file_upload_changed ${land.file_upload_changed === true} ${land.file_upload_changed}`)
                                                if (land.file_upload_changed) {
                                                    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!! UPLOAD !!!!!!!!!!!!!!!')
                                                    file.name = item_return.land_id
                                                    this.insertFile(file)
                                                }
                                                let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                                this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                                    if(est_id != true && est_id != false){
                                                        request.establishment_id = est_id
                                                        console.log('#1')
                                                        this.updateRequest(request)
                                                    }else{
                                                        console.log('#1-02')
                                                        this.updateRequest(request)
                                                    }
                                                })
                                            })
                                        }
                                    } else {
                                        Edata.is_land_owned = land.id
                                        let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                        request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                        request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                        console.log('#28')
                                        this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                            if(est_id != true && est_id != false){
                                                request.establishment_id = est_id
                                                console.log('#1')
                                                this.updateRequest(request)
                                            }else{
                                                console.log('#1-02')
                                                this.updateRequest(request)
                                            }
                                        })
                                    }
                                } else {
                                    let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                    request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                    request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                    console.log('#29')
                                    this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                        if(est_id != true && est_id != false){
                                            request.establishment_id = est_id
                                            console.log('#1')
                                            this.updateRequest(request)
                                        }else{
                                            console.log('#1-02')
                                            this.updateRequest(request)
                                        }
                                    })
                                }

                            } else {
                                request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                console.log('#30')
                                this.updateRequest(request)
                            }
                        }
                    }

                }
                if (Edata.is_establishment_changed && request.is_request_changed === false) {
                    if (Edata.is_land_owned === 'YES') {
                        if (land.is_land_changed) {
                            if (addressOwner.is_address_owner_changed) {
                                this.loopUpdateLand(land, addressOwner).then((land_data_update) => {
                                    item_return.land_id = land_data_update.id
                                    item_return.address_land_id = land_data_update.address
                                    if (land_data_update.address === addressOwner.id && land_data_update.status_insert_address === false) {
                                        console.log('GGGGGGGGG  - 8')
                                        this.updateAddress(this.formatInsert('ADDRESS', addressOwner))
                                    }
                                    Edata.is_land_owned = land_data_update.id
                                    request.establishment_address_id = land_data_update.address
                                    request.establishment_is_land_owned = land_data_update.id
                                    request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                    request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                    console.log('#31')
                                    console.log(`land.file_upload_changed ${land.file_upload_changed === true} ${land.file_upload_changed}`)
                                    if (land.file_upload_changed) {
                                        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!! UPLOAD !!!!!!!!!!!!!!!')
                                        file.name = item_return.land_id
                                        this.insertFile(file)
                                    }
                                    let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                    this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                        if(est_id != true && est_id != false){
                                            request.establishment_id = est_id
                                            console.log('#1')
                                            this.updateRequest(request)
                                        }else{
                                            console.log('#1-02')
                                            this.updateRequest(request)
                                        }
                                    })
                                })
                            } else {
                                this.loopUpdateLand(land, addressOwner).then((land_data_update) => {
                                    item_return.land_id = land_data_update.id
                                    item_return.address = land_data_update.address

                                    Edata.is_land_owned = land_data_update.id
                                    request.establishment_address_id = land_data_update.address
                                    request.establishment_is_land_owned = land_data_update.id
                                    request.establishment_is_land_owned = request.establishment_is_land_owned === '' ? 'NULL' : `'${request.establishment_is_land_owned}'`
                                    request.establishment_address_id = request.establishment_address_id === '' ? 'NULL' : `'${request.establishment_address_id}'`
                                    console.log('#32')
                                    console.log(`land.file_upload_changed ${land.file_upload_changed === true} ${land.file_upload_changed}`)
                                    if (land.file_upload_changed) {
                                        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!! UPLOAD !!!!!!!!!!!!!!!')
                                        file.name = item_return.land_id
                                        this.insertFile(file)
                                    }
                                    let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                                    this.updateEstablishmentAndCheckDuplication(new_edata,address).then((est_id) =>{
                                        if(est_id != true && est_id != false){
                                            request.establishment_id = est_id
                                            console.log('#1')
                                            this.updateRequest(request)
                                        }else{
                                            console.log('#1-02')
                                            this.updateRequest(request)
                                        }
                                    })
                                })
                            }

                        } else {
                            Edata.is_land_owned = land.id
                            let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                            this.updateEstablishmentAndCheckDuplication(new_edata,address)
                        }
                    } else {
                        let new_edata = this.formatInsert('ESTABLISHMENT', Edata)
                        this.updateEstablishmentAndCheckDuplication(new_edata,address)
                    }

                }
                if (address.is_address_establishment_changed) {
                    console.log('UPDATETETEAFEASDSADSCCZXCSDKALSKD:LASKD:LKASD:LKAS:LDK')
                    let newaddress = this.formatInsert('ADDRESS', address)
                    this.updateAddress(newaddress)
                }
                if (addressOwner.is_address_owner_changed && Edata.is_establishment_changed && land.is_land_changed === false) {
                    this.updateAddress(this.formatInsert('ADDRESS', addressOwner))
                }
                // && Edata.is_establishment_changed && land.is_land_changed === false
                return resolve(item_return)

            })
        } else {
            //insert !!
            return new Promise((resolve, reject) => {
                console.log('InsertRequestStep : loading')
                Edata.perosonal_id_st = request.personal_id_owner
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
                })
            })
        }
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
            UserDAOObj.getUser(username, password).then((data) => {
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