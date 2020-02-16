let newDocument = true
// set data form database 
function setDataOperator(raw_data, type) {
    setOperatorData(raw_data)
    setOperatorAddressData(raw_data)
    console.log(operatorData)
    console.log(operatorAddressData)
    if (type === 'OPERATOR') {
        document.getElementById("typeUser").value = operatorData.type
        document.getElementById("id").value = operatorData.personal_id
        document.getElementById("name").value = `${operatorData.title} ${operatorData.name} ${operatorData.surname}`
        document.getElementById("age").value = operatorData.birthday === '' ? '' : parseInt(getAge(operatorData.birthday))
        document.getElementById("nationality").value = operatorData.nationality
        document.getElementById("nationality").readOnly = operatorData.type === 'บุคคลธรรมดา' ? false : true
        document.getElementById("nationality").disabled = operatorData.type != 'บุคคลธรรมดา' ? true : false
        document.getElementById("race").value = operatorData.race
        document.getElementById("race").readOnly = operatorData.type === 'บุคคลธรรมดา' ? false : true
        document.getElementById("race").disabled = operatorData.type != 'บุคคลธรรมดา' ? true : false
        document.getElementById("age").disabled = operatorData.type != 'บุคคลธรรมดา' ? true : false
        //address
        document.getElementById("home_id").value = operatorAddressData.home_number
        document.getElementById("moo").value = operatorAddressData.moo
        document.getElementById("trxk").value = operatorAddressData.trxk
        document.getElementById("sxy").value = operatorAddressData.sxy
        document.getElementById("building").value = operatorAddressData.building
        document.getElementById("road").value = operatorAddressData.road

        let provinceId = parseInt(getProviceIdByName(operatorAddressData.province_name))
        let amphurId = parseInt(getAmphureIdByName(operatorAddressData.amphur_name, provinceId))
        let districtId = parseInt(getDistrictIdByName(operatorAddressData.district_name, amphurId))

        //แสดงค่าจังหวัดที่มาจาก ฐานข้อมูล (จังหวัด) ตาม id
        document.getElementById(`province`).value = provinceId

        //ตั้งค่ารายชื่อ อำเภอ, ตำบล ตามจังหวัดที่เลือกลงให้ list input ตาม id
        amphurSelect(parseInt(provinceId)) // list อำเภอทั้งหมดตาม province Id
        districtSelect(parseInt(amphurId)) // list ตำบลทั้งหมดตาม ampur_Id

        //แสดงค่าจังหวัดที่มาจาก ฐานข้อมูล (อำเภอ , ตำบล) ตาม id
        document.getElementById(`district`).value = amphurId
        document.getElementById(`subdistrict`).value = districtId

        document.getElementById("phone").value = operatorData.phone
        document.getElementById("fax").value = operatorData.fax


    } else {
        setassistantOperatorData(raw_data)
        if (document.getElementById("person2_name") != undefined)
            document.getElementById("person2_name").value = `${assistantOperatorData.title} ${assistantOperatorData.name} ${assistantOperatorData.surname}`
        if (document.getElementById("person2_id") != undefined)
            document.getElementById("person2_id").value = assistantOperatorData.personal_id
    }
}


//set data full raw data
function setRequestData(raw_data) {
}
function setEstablishmentData(raw_data) {
}
function setAddressEstablishmentData(raw_data) {
}
function setAddressOwnerLandData(raw_data) {
}
function setLandData(raw_data) {
}
function setReferecneData(raw_data) {
}
function setTrianData(raw_data) {
}
function setOperatorAddressData(raw_data) {
    operatorAddressData.id = raw_data.AID.ADDRESS_ID
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
function setOperatorData(raw_data) {
    operatorData.id = raw_data.PERSONAL_ID
    operatorData.address_id = raw_data.ADDRESS_ID
    operatorData.title = raw_data.PERSONAL_TITLE === null ? '' : raw_data.PERSONAL_TITLE
    operatorData.type = raw_data.PERSONAL_TYPE
    operatorData.name = raw_data.PERSONAL_NAME
    operatorData.surname = raw_data.PERSONAL_SURNAME === null || raw_data.PERSONAL_SURNAME === undefined ? '' : raw_data.PERSONAL_SURNAME
    operatorData.nationality = raw_data.PERSONAL_NATIONALITY === null ? '' : raw_data.PERSONAL_NATIONALITY
    operatorData.race = raw_data.PERSONAL_RACE === null ? '' : raw_data.PERSONAL_RACE
    operatorData.birthday = raw_data.PERSONAL_BIRTHDAY === null || raw_data.PERSONAL_BIRTHDAY === undefined ? '' : raw_data.PERSONAL_BIRTHDAY
    operatorData.personal_id = raw_data.PERSONAL_PERSONAL_ID
    operatorData.card_issued = raw_data.PERSONAL_CARD_ISSUED
    operatorData.card_expipe = raw_data.PERSONAL_CARD_EXPIRE === undefined || raw_data.PERSONAL_CARD_EXPIRE === null ? '' : raw_data.PERSONAL_CARD_EXPIRE
    operatorData.phone = raw_data.PERSONAL_PHONE
    operatorData.fax = raw_data.PERSONAL_FAX === null ? '' : raw_data.PERSONAL_FAX
}
function setassistantOperatorData(raw_data) {
    console.log(`dsadasdsad`)
    console.log(raw_data)
    assistantOperatorData.id = raw_data.PERSONAL_ID
    assistantOperatorData.title = raw_data.PERSONAL_TITLE === null ? '' : raw_data.PERSONAL_TITLE
    assistantOperatorData.name = raw_data.PERSONAL_NAME
    assistantOperatorData.surname = raw_data.PERSONAL_SURNAME === null || raw_data.PERSONAL_SURNAME === undefined ? '' : raw_data.PERSONAL_SURNAME
    assistantOperatorData.personal_id = raw_data.PERSONAL_PERSONAL_ID
}
// set data change
function createGroupData() {
    // set 
    if (operatorData.nationality != document.getElementById('nationality').value
        || operatorData.race != document.getElementById('race').value) {

        operatorData.is_personal_changed = true
        operatorData.nationality = document.getElementById('nationality').value
        operatorData.race = document.getElementById('race').value
    }

    if (operatorAddressData.home_number != document.getElementById('home_id').value ||
        operatorAddressData.moo != document.getElementById('moo').value ||
        operatorAddressData.trxk != document.getElementById('trxk').value ||
        operatorAddressData.sxy != document.getElementById('sxy').value ||
        operatorAddressData.building != document.getElementById('building').value ||
        operatorAddressData.road != document.getElementById('road').value ||
        operatorAddressData.district_name != document.getElementById('subdistrict').value ||
        operatorAddressData.amphur_name != document.getElementById('district').value ||
        operatorAddressData.province_name != document.getElementById('province').value) {

        operatorAddressData.is_address_changed = true

        operatorAddressData.home_number = document.getElementById('home_id').value
        operatorAddressData.moo = document.getElementById('moo').value
        operatorAddressData.trxk = document.getElementById('trxk').value
        operatorAddressData.sxy = document.getElementById('sxy').value
        operatorAddressData.building = document.getElementById('building').value
        operatorAddressData.road = document.getElementById('road').value
        operatorAddressData.district_name = document.getElementById('subdistrict').value
        operatorAddressData.amphur_name = document.getElementById('district').value
        operatorAddressData.province_name = document.getElementById('province').value
    }
    if (newDocument) {
        requestData.no = ''
        requestData.year = parseInt(new Date().toISOString().slice(0, 4)) + 543
        requestData.personal_id_owner = operatorData.id
        //create Database
        requestData.request_type_id = 1


        // -- - - 
        requestData.reference_id = document.getElementById('reference_name').value.trim().length != 0 ? 'YES' : 'NO'
        if (requestData.reference_id === 'YES') {
            referecneData.title = document.getElementById('reference_title').value.trim()
            referecneData.name = document.getElementById('reference_name').value.trim()
            referecneData.surname = document.getElementById('reference_surname').value.trim()
            referecneData.status = document.getElementById('reference_status').value.trim()
            referecneData.phone = document.getElementById('reference_phone').value
        }


        requestData.train_id = document.getElementById('foodTrain').checked === true ? 'YES' : 'NO'
        if (requestData.train_id === 'YES') {
            trianData.issuse = document.getElementById('foodBy').value.trim()
            trianData.date_exp = document.getElementById('datepicker5').value
            trianData.date_issued = document.getElementById('datepicker6').value
        }
        //Index xxxxxxxxxxxxxxxx
        requestData.personal_id_assistant = assistantOperatorData.id != '' ? assistantOperatorData.id : ''

        requestData.image_is_changed = image_changed //ตัวแปรอยู่ใน utilities.js

        let menu = window.location.href.toString().slice(35, window.location.href.toString().length)
        switch (menu) {
            case 'request_public_sell.html':
                requestData.menu = `ใบอนุญาตจำหน่ายสินค้าในที่หรือทางสาธารณะ`
                break;
            case 'request_public_hawk.html':
                requestData.menu = `ใบอนุญาตเร่ขายสินค้าในที่หรือทางสาธารณะ`
                break;
            case 'request_area_more_sell.html':
                requestData.menu = `ใบอนุญาตจัดตั้งสถานที่จำหน่ายอาหาร`
                break;
            case 'request_area_more_correct.html':
                requestData.menu = `ใบอนุญาตจัดจัดตั้งสถานที่สะสมอาหาร`
                break;
            case 'request_area_less_sell.html':
                requestData.menu = `หนังสือรับรองการแจ้งจัดตั้งสถานที่จำหน่ายอาหาร`
                break;
            case 'request_area_less_correct.html':
                requestData.menu = `หนังสือรับรองการแจ้งจัดตั้งสถานที่สะสมอาหาร`
                break;
            case 'request_market.html':
                requestData.menu = `ใบอนุญาตให้ใช้สถานที่เป็นตลาดเอกชน`
                break;
            case 'request_health_danger.html':
                requestData.menu = `กิจการที่เป็นอันตรายต่อสุขภาพ`
                break;
            default:
                //request_crematory.html
                requestData.menu = `กิจการฌาปณสถาน`
                break;
        }
        requestData.date_submission = document.getElementById('datepicker1').value

        requestData.doc_no1 = document.getElementById('documentId').checked === true ? 'Y' : 'N'
        requestData.doc_no2 = document.getElementById('documenthHome').checked === true ? 'Y' : 'N'
        requestData.doc_no3 = document.getElementById('documentLegalEntity').checked === true ? 'Y' : 'N'
        requestData.doc_no4 = document.getElementById('documentSignature').checked === true ? 'Y' : 'N'
        requestData.doc_no5 = document.getElementById('documentSJ4').checked === true ? 'Y' : 'N'
        requestData.doc_no6 = document.getElementById('documentOther').checked === true ? document.getElementById('other').value : 'N'
        if (document.getElementById('typeReForm') != undefined) {
            requestData.subcategory = document.getElementById('typeReForm').value
        } else {
            requestData.subcategory = ''
        }
        if (document.getElementById('typeProduct') != undefined) {
            requestData.product_type = document.getElementById('typeProduct').value.trim()
        }
        if (document.getElementById('timeStart') != undefined) {
            requestData.sell_start = document.getElementById('timeStart').value
        }
        if (document.getElementById('timeEnd') != undefined) {
            requestData.sell_end = document.getElementById('timeEnd').value
        }

        if (document.getElementById('useSpirits') != undefined) {
            requestData.sell_allow = document.getElementById('useSpirits').checked === true ? 'Y' : 'N'
        }
        //
        if (document.getElementById('con_no1') != undefined) {
            requestData.condition_no_1 = ''
        }
        if (document.getElementById('con_no2') != undefined) {
            requestData.condition_no_2 = ''
        }
        if (document.getElementById('con_no3') != undefined) {
            requestData.condition_no_3 = ''
        }
        if (document.getElementById('con_no4') != undefined) {
            requestData.condition_no_4 = ''
        }
        requestData.image_name = ''
        requestData.total_image = totalFiles.length
        // requestData.status =   '' //ไม่ให้เซ็ตเอง


    } else {
        // มีข้อมูลแล้ว
        /*
        requestData.is_request_changed = false
            requestData.no =   ''
            requestData.year =   parseInt(new Date().toISOString().slice(0, 4)) + 543
            requestData.personal_id_owner =   'P000001'
            requestData.request_type_id =   15
            requestData.staff_id_alderman =   'S0001'
            requestData.establishment_id =   ''
            requestData.staff_id_money =   'S0001'
            requestData.reference_id =   'YES'
            requestData.train_id =   'YES'
            requestData.personal_id_assistant =   ''
            requestData.staff_id_approve =   'S0001' // '' and '-' => 'NULL'
            requestData.establishment_is_land_owned =   ''
            requestData.establishment_address_id =   ''
            requestData.image_is_changed =   false
            requestData.menu =   'ใบอนุญาตจัดตั้งสถานที่จำหน่ายอาหาร'
            requestData.date_submission =   '30-05-2563'
            requestData.date_approve =   '30-05-2563'
            requestData.doc_no1 =   'N'
            requestData.doc_no2 =   'N'
            requestData.doc_no3 =   'Y'
            requestData.doc_no4 =   'Y'
            requestData.doc_no5 =   'Y'
            requestData.doc_no6 =   'Y'
            requestData.subcategory =   ''
            requestData.product_type =   ''
            requestData.sell_start =   '13 =  48 =  00.000'
            requestData.sell_end =   '13 =  48 =  00.000'
            requestData.sell_allow =   'Y'
            requestData.receipt_order =   '15-05-2562'
            requestData.receipt_fine =   300
            requestData.receipt_fee =   60.5
            requestData.receipt_total =   ''
            //
            requestData.receipt_date =   '30-05-2563'
            requestData.date_issued =   '30-05-2563'
            requestData.date_expired =   '30-05-2563'
            //
            requestData.condition_no_1 =   ''
            requestData.condition_no_2 =   ''
            requestData.condition_no_3 =   ''
            requestData.condition_no_4 =   ''
            requestData.image_name =   ''
            requestData.total_image =   0
            requestData.status =   ''
            requestData.delete_logic =   ''
            requestData.is_deleted =   ''
            requestData.last_update =   '20-05-2563'
            requestData.username =   'ADMIN'
            */
    }
}


// getAge
function getAge(date) {
    let now = new Date().toISOString().slice(0, 10) // 2020-02-16
    let year_now = parseInt(now.slice(0, 4)) + 543
    let month_now = parseInt(now.slice(5, 7))
    let day_now = parseInt(now.slice(8, 10))
    // date "08-02-2563"
    let day_b = parseInt(date.slice(0, 2))
    let month_b = parseInt(date.slice(3, 5))
    let year_b = parseInt(date.slice(6, 10))
    let age
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
//prepare InsertData
function createArrayInsert() {
    let arrayItem = []
    // request, personal, Edata, address, land, addressOwner, file, reference, train
    //personal เป็น  array  index ที่ 0 เป็น personal , index ที่ 1 เป็น address 
    let personalArray = []
    personalArray.push(operatorData)
    personalArray.push(operatorAddressData)

    arrayItem.push(requestData) // request 0
    arrayItem.push(personalArray) // personal 1 
    arrayItem.push(establishmentData) // Edata 2 
    arrayItem.push(addressEstablishmentData) // address 3
    arrayItem.push(landData) // land 4
    arrayItem.push(addressOwnerLandData) // addressOwner 5
    arrayItem.push(filePdf) // file 6
    arrayItem.push(referecneData) // reference 7
    arrayItem.push(trianData) // train 8
    let object = {
        name: '',
        type: '',
        data: ''
    }
    let = imageData = []
    for (let i = 0; i < totalFiles.length; i++) {
        imageData.push(object)
    }
    arrayItem.push(imageData)
    return arrayItem
}