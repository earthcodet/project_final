let newDocument = true
let requestType = []
let userMoney = ''
let listAlderMan = []
function checkView(typeForm) {
    let requestId = getUrlVars()
    console.log(requestId)
    if (requestId.id_no != undefined && requestId.id_year != undefined) {
        let requsetNo = requestId.id_no
        let requestYear = requestId.id_year
        console.log(`typeForm ${typeForm}`)
        if (typeForm != undefined) {
            let sight = getSightFormType(typeForm)
            let checkSight = requsetNo.slice(0, 1) === sight ? true : false
            console.log(`sight ${sight}`)
            console.log(`checkSight = ${checkSight} > ${requsetNo.slice(0, 1)} === ${sight} > ${requsetNo.slice(0, 1) === sight}`)
            console.log(checkSight)
            if (checkSight) {
                getRequestDataRenew(requsetNo, requestYear).then((raw_data) => {
                    if (raw_data.length != 0) {
                        console.log(raw_data)
                        setRequestData(raw_data[0])
                        setDataOperator(raw_data[0].GropDataProsonal)
                        setOperatorAddressData(raw_data[0].GropDataProsonal)
                        setAddressEstablishmentData(raw_data[0])
                        setEstablishmentData(raw_data[0])
                        if (raw_data[0].PERSONAL_ID_ASSISTANT != null) {
                            searchPersonalById(raw_data[0].PERSONAL_ID_ASSISTANT).then((data_assistant) => {
                                if (data_assistant.PERSONAL_NAME != undefined) {
                                    setassistantOperatorData(data_assistant)
                                    console.log(`requestData`)
                                    console.log(requestData)
                                    console.log(`establishmentData`)
                                    console.log(establishmentData)
                                    console.log(`addressEstablishmentData`)
                                    console.log(addressEstablishmentData)
                                    console.log(`operatorAddressData`)
                                    console.log(operatorAddressData)
                                    console.log(`operatorData`)
                                    console.log(operatorData)
                                    console.log(`assistantOperatorData`)
                                    console.log(assistantOperatorData)
                                    setDataView()
                                } else {
                                    console.log(`requestData`)
                                    console.log(requestData)
                                    console.log(`establishmentData`)
                                    console.log(establishmentData)
                                    console.log(`addressEstablishmentData`)
                                    console.log(addressEstablishmentData)
                                    console.log(`operatorAddressData`)
                                    console.log(operatorAddressData)
                                    console.log(`operatorData`)
                                    console.log(operatorData)
                                    console.log(`assistantOperatorData`)
                                    console.log(assistantOperatorData)
                                    setDataView()
                                }
                            })
                        } else {
                            console.log(`requestData`)
                            console.log(requestData)
                            console.log(`establishmentData`)
                            console.log(establishmentData)
                            console.log(`addressEstablishmentData`)
                            console.log(addressEstablishmentData)
                            console.log(`operatorAddressData`)
                            console.log(operatorAddressData)
                            console.log(`operatorData`)
                            console.log(operatorData)
                            console.log(`assistantOperatorData`)
                            console.log(assistantOperatorData)
                            setDataView()
                        }
                    }
                })
            }
        }
    }
}
// setDataView
function setDataView() {
    if (operatorData.id != '') {
        //เจ้าของเดิม
        document.getElementById("typeUser").value = operatorData.type
        document.getElementById("id").value = operatorData.personal_id
        document.getElementById("name").value = `${operatorData.title} ${operatorData.name} ${operatorData.surname}`
        document.getElementById("age").value = operatorData.birthday === '-' ? '-' : parseInt(getAge(operatorData.birthday))
        document.getElementById("nationality").value = operatorData.nationality
        document.getElementById("race").value = operatorData.race
        // document.getElementById("age").disabled = operatorData.type != 'บุคคลธรรมดา' ? true : false
        document.getElementById("home_id").value = operatorAddressData.home_number
        document.getElementById("moo").value = operatorAddressData.moo
        document.getElementById("trxk").value = operatorAddressData.trxk
        document.getElementById("sxy").value = operatorAddressData.sxy
        document.getElementById("building").value = operatorAddressData.building
        document.getElementById("road").value = operatorAddressData.road
        let provinceId = parseInt(getProviceIdByName(operatorAddressData.province_name))
        let amphurId = parseInt(getAmphureIdByName(operatorAddressData.amphur_name, provinceId))
        let districtId = parseInt(getDistrictIdByName(operatorAddressData.district_name, amphurId))
        document.getElementById(`province`).value = provinceId
        amphurSelect(parseInt(provinceId))
        districtSelect(parseInt(amphurId))

        document.getElementById(`district`).value = amphurId
        if (districtId === undefined || districtId === '') {
            document.getElementById(`subdistrict`).innerHTML = ''
        } else {
            document.getElementById(`subdistrict`).value = districtId
        }
        let cut_phone = operatorData.phone.split('/')
        if (cut_phone[1] === '') {
            document.getElementById("phone").value = cut_phone[0]
            document.getElementById('phone_more').value = ''
            document.getElementById('phone_more').disabled = true
        } else {
            document.getElementById("phone").value = cut_phone[0]
            document.getElementById('phone_more').disabled = true
            document.getElementById('phone_more').value = cut_phone[1]
        }
        document.getElementById("fax").value = operatorData.fax
    }
    //  เจ้าของใหม่
    if (operatorDataN.id != '') {
        document.getElementById("ntypeUser").value = operatorDataN.type
        document.getElementById("nid").value = operatorDataN.personal_id
        document.getElementById("nname").value = `${operatorDataN.title} ${operatorDataN.name} ${operatorDataN.surname}`
        document.getElementById("nage").value = operatorDataN.birthday === '-' ? '-' : parseInt(getAge(operatorDataN.birthday))
        document.getElementById("nnationality").value = operatorDataN.nationality
        document.getElementById("nrace").value = operatorDataN.race
        // document.getElementById("nage").disabled = operatorDataN.type != 'บุคคลธรรมดา' ? true : false
        document.getElementById("nhome_id").value = operatorAddressDataN.home_number
        document.getElementById("nmoo").value = operatorAddressDataN.moo
        document.getElementById("ntrxk").value = operatorAddressDataN.trxk
        document.getElementById("nsxy").value = operatorAddressDataN.sxy
        document.getElementById("nbuilding").value = operatorAddressDataN.building
        document.getElementById("nroad").value = operatorAddressDataN.road
        let provinceIds = parseInt(getProviceIdByName(operatorAddressDataN.province_name))
        let amphurIds = parseInt(getAmphureIdByName(operatorAddressDataN.amphur_name, provinceIds))
        let districtIds = parseInt(getDistrictIdByName(operatorAddressDataN.district_name, amphurIds))
        document.getElementById(`wProvince`).value = provinceIds
        wamphurSelect(parseInt(provinceIds))
        wdistrictSelect(parseInt(amphurIds))

        document.getElementById(`wDistrict`).value = amphurIds
        if (districtIds === undefined || districtIds === '') {
            document.getElementById(`wSubdistrict`).innerHTML = ''
        } else {
            document.getElementById(`wSubdistrict`).value = districtIds
        }
        let cut_phones = operatorDataN.phone.split('/')
        if (cut_phones[1] === '') {
            document.getElementById("nphone").value = cut_phones[0]
            document.getElementById('nphone_more').value = ''
            document.getElementById('nphone_more').disabled = true
        } else {
            document.getElementById("nphone").value = cut_phones[0]
            document.getElementById('nphone_more').disabled = true
            document.getElementById('nphone_more').value = cut_phones[1]
        }
        document.getElementById("nfax").value = operatorDataN.fax
    }
    if (requestData.no != '') {
        document.getElementById('form_old_id').value = `${requestData.no}/${requestData.year}`
        document.getElementById('use_request_id').innerText = `${requestData.no}/${requestData.year}`
        document.getElementById('use_request_type').innerText = `${requestData.menu}`
    } else {
        document.getElementById('form_old_id').value = ''
        document.getElementById('use_request_id').innerText = ''
        document.getElementById('use_request_type').innerText = ''
    }
}
function setDataOparatorToUi(raw_data, type) {
    if (type === 'OLD') {
        setDataOperator(raw_data)
        setOperatorAddressData(raw_data)
    } else {
        setDataOperatorN(raw_data)
        setOperatorAddressDataN(raw_data)
    }
    setDataView()
}
function checkformatReturn(value) {
    let temp = ''
    value === null || value === 'NULL' ? temp = '' : temp = value
    return temp
}

//set data full raw data
function setRequestData(raw_data) {

    requestData.no = raw_data.REQUEST_NO
    requestData.year = raw_data.REQUEST_YEAR
    requestData.menu = raw_data.REQUEST_TYPE_NAME
    raw_request_data = {
        REQUEST_NO: raw_data.REQUEST_NO,
        REQUEST_YEAR: raw_data.REQUEST_YEAR,
        PERSONAL_ID_OWNER: raw_data.PERSONAL_ID_OWNER,
        REQUEST_TYPE_ID: raw_data.REQUEST_TYPE_ID,
        STAFF_ID_ALDERMAN: raw_data.STAFF_ID_ALDERMAN,
        ESTABLISHMENT_ID: raw_data.ESTABLISHMENT_ID,
        STAFF_ID_MONEY: raw_data.STAFF_ID_MONEY,
        REFERENCE_ID: raw_data.REFERENCE_ID,
        TRAIN_ID: raw_data.TRAIN_ID,
        PERSONAL_ID_ASSISTANT: raw_data.PERSONAL_ID_ASSISTANT,
        STAFF_ID_APPROVE: raw_data.STAFF_ID_APPROVE,
        ESTABLISHMENT_IS_LAND_OWNED: raw_data.ESTABLISHMENT_IS_LAND_OWNED,
        ESTABLISHMENT_ADDRESS_ID: raw_data.ESTABLISHMENT_ADDRESS_ID,
        REQUEST_MENU: raw_data.REQUEST_MENU,
        REQUEST_DATE_SUBMISSION: raw_data.REQUEST_DATE_SUBMISSION,
        REQUEST_DATE_APPROVE: raw_data.REQUEST_DATE_APPROVE,
        REQUEST_DOC_NO1: raw_data.REQUEST_DOC_NO1,
        REQUEST_DOC_NO2: raw_data.REQUEST_DOC_NO2,
        REQUEST_DOC_NO3: raw_data.REQUEST_DOC_NO3,
        REQUEST_DOC_NO4: raw_data.REQUEST_DOC_NO4,
        REQUEST_DOC_NO5: raw_data.REQUEST_DOC_NO5,
        REQUEST_DOC_NO6: raw_data.REQUEST_DOC_NO6,
        REQUEST_SUBCATEGORY: raw_data.REQUEST_SUBCATEGORY,
        REQUEST_PRODUCT_TYPE: raw_data.REQUEST_PRODUCT_TYPE,
        REQUEST_SELL_START: raw_data.REQUEST_SELL_START,
        REQUEST_SELL_END: raw_data.REQUEST_SELL_END,
        REQUEST_SELL_ALLOW: raw_data.REQUEST_SELL_ALLOW,
        REQUEST_RECEIPT_FINE: raw_data.REQUEST_RECEIPT_FINE,
        REQUEST_RECEIPT_FEE: raw_data.REQUEST_RECEIPT_FEE,
        REQUEST_RECEIPT_TOTAL: raw_data.REQUEST_RECEIPT_TOTAL,
        REQUEST_RECEIPT_FINE_YEAR_2: raw_data.REQUEST_RECEIPT_FINE_YEAR_2,
        REQUEST_RECEIPT_FEE_YEAR_2: raw_data.REQUEST_RECEIPT_FEE_YEAR_2,
        REQUEST_RECEIPT_TOTAL_YEAR_2: raw_data.REQUEST_RECEIPT_TOTAL_YEAR_2,
        REQUEST_RECEIPT_DATE_YEAR_2: raw_data.REQUEST_RECEIPT_DATE_YEAR_2,
        REQUEST_RECEIPT_FINE_YEAR_3: raw_data.REQUEST_RECEIPT_FINE_YEAR_3,
        REQUEST_RECEIPT_FEE_YEAR_3: raw_data.REQUEST_RECEIPT_FEE_YEAR_3,
        REQUEST_RECEIPT_TOTAL_YEAR_3: raw_data.REQUEST_RECEIPT_TOTAL_YEAR_3,
        REQUEST_RECEIPT_FINE_TRANSFER: raw_data.REQUEST_RECEIPT_FINE_TRANSFER,
        REQUEST_RECEIPT_DATE_TRANSFER: raw_data.REQUEST_RECEIPT_DATE_TRANSFER,
        REQUEST_RECEIPT_DATE_YEAR_3: raw_data.REQUEST_RECEIPT_DATE_YEAR_3,
        REQUEST_RECEIPT_DATE: raw_data.REQUEST_RECEIPT_DATE,
        REQUEST_DATE_ISSUED: raw_data.REQUEST_DATE_ISSUED,
        REQUEST_DATE_EXPIRED: raw_data.REQUEST_DATE_EXPIRED,
        REQUEST_CONDITION_NO_1: raw_data.REQUEST_CONDITION_NO_1,
        REQUEST_CONDITION_NO_2: raw_data.REQUEST_CONDITION_NO_2,
        REQUEST_CONDITION_NO_3: raw_data.REQUEST_CONDITION_NO_3,
        REQUEST_CONDITION_NO_4: raw_data.REQUEST_CONDITION_NO_4,
        REQUEST_IMAGE_NAME: raw_data.REQUEST_IMAGE_NAME,
        REQUEST_TOTAL_IMAGE: raw_data.REQUEST_TOTAL_IMAGE,
        REQUEST_STATUS: raw_data.REQUEST_STATUS,
        REQUEST_STATUS_BEFORE: raw_data.REQUEST_STATUS_BEFORE,
        REQUEST_DELETE_LOGIC: raw_data.REQUEST_DELETE_LOGIC,
        REQUEST_IS_DELETED: raw_data.REQUEST_IS_DELETED
    }
    console.log(raw_request_data)
    setDataView()
}
function setDataOperator(raw_data) {
    resetRequest()
    operatorData.id = raw_data.PERSONAL_ID
    operatorData.address_id = raw_data.ADDRESS_ID
    operatorData.title = raw_data.PERSONAL_TITLE === null ? '' : raw_data.PERSONAL_TITLE
    operatorData.type = raw_data.PERSONAL_TYPE
    operatorData.name = raw_data.PERSONAL_NAME
    operatorData.surname = raw_data.PERSONAL_SURNAME === null || raw_data.PERSONAL_SURNAME === undefined ? '' : raw_data.PERSONAL_SURNAME
    operatorData.nationality = raw_data.PERSONAL_NATIONALITY === null ? '' : raw_data.PERSONAL_NATIONALITY
    operatorData.race = raw_data.PERSONAL_RACE === null ? '' : raw_data.PERSONAL_RACE
    operatorData.birthday = raw_data.PERSONAL_BIRTHDAY === null || raw_data.PERSONAL_BIRTHDAY === undefined ? '-' : raw_data.PERSONAL_BIRTHDAY
    operatorData.personal_id = raw_data.PERSONAL_PERSONAL_ID
    operatorData.card_issued = raw_data.PERSONAL_CARD_ISSUED === '0000-00-00' || raw_data.PERSONAL_CARD_ISSUED === undefined ? '-' : raw_data.PERSONAL_CARD_ISSUED
    operatorData.card_expipe = raw_data.PERSONAL_CARD_EXPIRE === undefined || raw_data.PERSONAL_CARD_EXPIRE === null ? '-' : raw_data.PERSONAL_CARD_EXPIRE
    operatorData.phone = raw_data.PERSONAL_PHONE
    operatorData.fax = raw_data.PERSONAL_FAX === null ? '' : raw_data.PERSONAL_FAX
}
function setOperatorAddressData(raw_data) {
    operatorAddressData.home_number = raw_data.AID.ADDRESS_HOME_NUMBER === null ? '' : raw_data.AID.ADDRESS_HOME_NUMBER
    operatorAddressData.moo = raw_data.AID.ADDRESS_MOO === null ? '' : raw_data.AID.ADDRESS_MOO
    operatorAddressData.trxk = raw_data.AID.ADDRESS_TRXK === null ? '' : raw_data.AID.ADDRESS_TRXK
    operatorAddressData.sxy = raw_data.AID.ADDRESS_SXY === null ? '' : raw_data.AID.ADDRESS_SXY
    operatorAddressData.building = raw_data.AID.ADDRESS_BUILDING === null ? '' : raw_data.AID.ADDRESS_BUILDING
    operatorAddressData.road = raw_data.AID.ADDRESS_ROAD === null ? '' : raw_data.AID.ADDRESS_ROAD
    operatorAddressData.district_name = raw_data.AID.DISTRICT_NAME
    operatorAddressData.amphur_name = raw_data.AID.AMPHUR_NAME
    operatorAddressData.province_name = raw_data.AID.PROVINCE_NAME
}
function setDataOperatorN(raw_data) {
    operatorDataN.id = raw_data.PERSONAL_ID
    operatorDataN.address_id = raw_data.ADDRESS_ID
    operatorDataN.title = raw_data.PERSONAL_TITLE === null ? '' : raw_data.PERSONAL_TITLE
    operatorDataN.type = raw_data.PERSONAL_TYPE
    operatorDataN.name = raw_data.PERSONAL_NAME
    operatorDataN.surname = raw_data.PERSONAL_SURNAME === null || raw_data.PERSONAL_SURNAME === undefined ? '' : raw_data.PERSONAL_SURNAME
    operatorDataN.nationality = raw_data.PERSONAL_NATIONALITY === null ? '' : raw_data.PERSONAL_NATIONALITY
    operatorDataN.race = raw_data.PERSONAL_RACE === null ? '' : raw_data.PERSONAL_RACE
    operatorDataN.birthday = raw_data.PERSONAL_BIRTHDAY === null || raw_data.PERSONAL_BIRTHDAY === undefined ? '-' : raw_data.PERSONAL_BIRTHDAY
    operatorDataN.personal_id = raw_data.PERSONAL_PERSONAL_ID
    operatorDataN.card_issued = raw_data.PERSONAL_CARD_ISSUED === '0000-00-00' || raw_data.PERSONAL_CARD_ISSUED === undefined ? '-' : raw_data.PERSONAL_CARD_ISSUED
    operatorDataN.card_expipe = raw_data.PERSONAL_CARD_EXPIRE === undefined || raw_data.PERSONAL_CARD_EXPIRE === null ? '-' : raw_data.PERSONAL_CARD_EXPIRE
    operatorDataN.phone = raw_data.PERSONAL_PHONE
    operatorDataN.fax = raw_data.PERSONAL_FAX === null ? '' : raw_data.PERSONAL_FAX
}
function setOperatorAddressDataN(raw_data) {
    operatorAddressDataN.home_number = raw_data.AID.ADDRESS_HOME_NUMBER === null ? '' : raw_data.AID.ADDRESS_HOME_NUMBER
    operatorAddressDataN.moo = raw_data.AID.ADDRESS_MOO === null ? '' : raw_data.AID.ADDRESS_MOO
    operatorAddressDataN.trxk = raw_data.AID.ADDRESS_TRXK === null ? '' : raw_data.AID.ADDRESS_TRXK
    operatorAddressDataN.sxy = raw_data.AID.ADDRESS_SXY === null ? '' : raw_data.AID.ADDRESS_SXY
    operatorAddressDataN.building = raw_data.AID.ADDRESS_BUILDING === null ? '' : raw_data.AID.ADDRESS_BUILDING
    operatorAddressDataN.road = raw_data.AID.ADDRESS_ROAD === null ? '' : raw_data.AID.ADDRESS_ROAD
    operatorAddressDataN.district_name = raw_data.AID.DISTRICT_NAME
    operatorAddressDataN.amphur_name = raw_data.AID.AMPHUR_NAME
    operatorAddressDataN.province_name = raw_data.AID.PROVINCE_NAME
}
// getAge
function getAge(date) {
    let now = new Date().toISOString().slice(0, 10) // 2020-02-16
    let year_now = parseInt(now.slice(0, 4)) + 543
    let month_now = parseInt(now.slice(5, 7))
    let day_now = parseInt(now.slice(8, 10))
    // date "08-02-2563" OR 1998-04-22T17:00:00.000Z
    console.log(`date ${date}`)
    let day_b = parseInt(date.slice(8, 9))
    let month_b = parseInt(date.slice(5, 7))
    let year_b = parseInt(date.slice(0, 4)) > 1800 && parseInt(date.slice(0, 4)) < 2200 ? parseInt(date.slice(0, 4)) + 543 : parseInt(date.slice(0, 4))
    let age
    if (year_b < 100) {
        day_b = parseInt(date.slice(0, 2))
        month_b = parseInt(date.slice(3, 5))
        year_b = parseInt(date.slice(6, 10)) > 1800 && parseInt(date.slice(6, 10)) < 2200 ? parseInt(date.slice(6, 10)) + 543 : parseInt(date.slice(6, 10))
    }
    console.log(`year_b ${year_b}`)
    console.log(`year_now ${year_now}`)
    if (month_b === month_now && day_b === day_now) {
        return age = year_now - year_b
    } else if (month_now === month_b) {
        if (day_now > day_b) {
            return age = year_now - year_b
        } else {
            return age = year_now - year_b - 1
        }
    } else if (month_now > month_b) {
        return age = year_now - year_b
    } else {
        return age = year_now - year_b - 1
    }

}
// set data change
function createTransferData() {
    raw_request_data.old_owner = operatorData.id
    raw_request_data.sub_date_transfer = document.getElementById('datepicker1').value.trim()
    let new_price = parseFloat(document.getElementById('fine_transfer').value.trim())
    raw_request_data.REQUEST_RECEIPT_FINE_TRANSFER = parseFloat(raw_request_data.REQUEST_RECEIPT_FINE_TRANSFER) + new_price
    raw_request_data.REQUEST_RECEIPT_DATE_TRANSFER = document.getElementById('datepicker2').value.trim()
    raw_request_data.PERSONAL_ID_OWNER = operatorDataN.id
}


//prepare InsertData
function createArrayInsertTransfer() {
    let arrayItem = []
    arrayItem.push(raw_request_data) // request 0
    return arrayItem
}
function getDuplicationOwner() {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/get/owner/duplication/transfer/${requestData.no}/${requestData.year}/${operatorDataN.id}`).then((result) => {
            return resolve(result.data);
        })
    })
}
function insertRequestTransfer() {
    createTransferData()
    let item = createArrayInsertTransfer()
    console.log(`--- data to return ---`)
    console.log(item[0])
    console.log(`--- End to return ---`)
    return new Promise((resolve, reject) => {
        axios.post("http://localhost:5000/insert/request/transfer", { 'transfer': item[0] }).then(data => {
            console.log(data.data)
            return resolve(data.data);
        });
        // return resolve(true)
    });

}
function getRequestDataTransfer(no, year) {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/get/request/renew/id/${no}/${year}`).then((result) => {
            return resolve(result.data);
        })
    })
}

//get requestId form url
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}
//create print 
//get sight
function getSightFormType(type) {
    let sightT = ''
    console.log(`getSightFormType => ` + type)
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
function loadingData() {
    runForm().then(() => {
        //
    })
}