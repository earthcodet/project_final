let newDocument = true
let requestType = []
function checkView(typeForm) {
    let requsetId = getUrlVars()
    console.log(requsetId.id)

    if (requsetId.id != undefined) {
        let requsetNo = requsetId.id.slice(0, 6)
        let requestYear = requsetId.id.slice(6, 10)
        console.log(`typeForm ${typeForm}`)
        if (typeForm != undefined) {
            let sight = getSightFormType(typeForm)
            let checkSight = requsetNo.slice(0, 1) === sight ? true : false
            console.log(`sight ${sight}`)
            console.log(`checkSight = ${checkSight} > ${requsetNo.slice(0, 1)} === ${sight} > ${requsetNo.slice(0, 1) === sight}`)
           console.log(checkSight)
            if (checkSight) {
                getRequestData(requsetNo, requestYear).then((raw_data) => {
                    console.log(raw_data)
                    if (raw_data != '') {
                        console.log(`raw_data`)
                        console.log(raw_data)
                        setRequestData(raw_data)
                        setEstablishmentData(raw_data)
                        setAddressEstablishmentData(raw_data)
                        setAddressOwnerLandData(raw_data)
                        setLandData(raw_data)
                        setReferecneData(raw_data)
                        setTrianData(raw_data)
                        setOperatorAddressData(raw_data.gropDataOperator)
                        setOperatorData(raw_data.gropDataOperator)
                        imageDisplayFormDatabase = raw_data.IMAGE_REVIEW
                        if (raw_data.gropDataAssistant != undefined) {
                            setassistantOperatorData(raw_data.gropDataAssistant)
                        }
                        console.log(`requestData`)
                        console.log(requestData)
                        console.log(`establishmentData`)
                        console.log(establishmentData)
                        console.log(`addressEstablishmentData`)
                        console.log(addressEstablishmentData)
                        console.log(`addressOwnerLandData`)
                        console.log(addressOwnerLandData)
                        console.log(`landData`)
                        console.log(landData)
                        console.log(`referecneData`)
                        console.log(referecneData)
                        console.log(`trianData`)
                        console.log(trianData)
                        console.log(`operatorAddressData`)
                        console.log(operatorAddressData)
                        console.log(`operatorData`)
                        console.log(operatorData)
                        console.log(`assistantOperatorData`)
                        console.log(assistantOperatorData)
                        setDataView()
                        changeStatusMenuData()
                    }
                })
            }
        }
    }
}
// setDataView
function setDataView() {
    createImage(imageDisplayFormDatabase)
    document.getElementById('form_id').value = `${requestData.no}/${requestData.year}`
    document.getElementById('datepicker1').value = requestData.date_submission
    document.getElementById('typeReq').value = getRequestTypeValue(requestData.request_type_id)
    document.getElementById("typeUser").value = operatorData.type
    document.getElementById("id").value = operatorData.personal_id
    document.getElementById("name").value = `${operatorData.title} ${operatorData.name} ${operatorData.surname}`
    document.getElementById("documentName").value = `${operatorData.title} ${operatorData.name} ${operatorData.surname}`
    document.getElementById("age").value = operatorData.birthday === '' ? '' : parseInt(getAge(operatorData.birthday))
    document.getElementById("nationality").value = operatorData.nationality
    document.getElementById("nationality").readOnly = operatorData.type === 'บุคคลธรรมดา' ? false : true
    document.getElementById("nationality").disabled = operatorData.type != 'บุคคลธรรมดา' ? true : false
    document.getElementById("race").value = operatorData.race
    document.getElementById("race").readOnly = operatorData.type === 'บุคคลธรรมดา' ? false : true
    document.getElementById("race").disabled = operatorData.type != 'บุคคลธรรมดา' ? true : false
    document.getElementById("age").disabled = operatorData.type != 'บุคคลธรรมดา' ? true : false
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
    document.getElementById(`subdistrict`).value = districtId
    document.getElementById("phone").value = operatorData.phone
    document.getElementById("fax").value = operatorData.fax
    document.getElementById('reference_title').value = referecneData.title
    document.getElementById('reference_name').value = referecneData.name
    document.getElementById('reference_surname').value = referecneData.surname
    document.getElementById('reference_status').value = referecneData.status
    document.getElementById('reference_phone').value = referecneData.phone

    //Date request exp 
    document.getElementById('request_date_issued').value = requestData.date_issued
    document.getElementById('request_date_exp').value = requestData.date_expired

    //Document
    document.getElementById('documentId').checked = requestData.doc_no1 === 'N' ? false : true
    document.getElementById('documenthHome').checked = requestData.doc_no2 === 'N' ? false : true
    document.getElementById('documentLegalEntity').checked = requestData.doc_no3 === 'N' ? false : true
    document.getElementById('documentSignature').checked = requestData.doc_no4 === 'N' ? false : true
    document.getElementById('documentSJ4').checked = requestData.doc_no5 === 'N' ? false : true
    document.getElementById('documentOther').checked = requestData.doc_no6 === 'N' ? false : true
    document.getElementById('other').value = document.getElementById('documentOther').checked === true ? requestData.doc_no6 : ''

    //ที่อยู่สถานประกอบการ
    document.getElementById("wPlaceId").value = addressEstablishmentData.home_number
    document.getElementById("wMoo").value = addressEstablishmentData.moo
    document.getElementById("wTrxk").value = addressEstablishmentData.trxk
    document.getElementById("wSxy").value = addressEstablishmentData.sxy
    document.getElementById("wBuilding").value = addressEstablishmentData.building
    document.getElementById("wRoad").value = addressEstablishmentData.road
    let provinceIdE = parseInt(getProviceIdByName(addressEstablishmentData.province_name))
    let amphurIdE = parseInt(getAmphureIdByName(addressEstablishmentData.amphur_name, provinceIdE))
    let districtIdE = parseInt(getDistrictIdByName(addressEstablishmentData.district_name, amphurIdE))
    document.getElementById(`wProvince`).value = provinceIdE
    wamphurSelect(parseInt(provinceIdE))
    wdistrictSelect(parseInt(amphurIdE))
    document.getElementById(`wDistrict`).value = amphurIdE
    document.getElementById(`wSubdistrict`).value = districtIdE
    document.getElementById("wPhone").value = establishmentData.phone
    document.getElementById("wFax").value = establishmentData.fax

    document.getElementById('workplaceName').value = establishmentData.name

    //เงิน
    if (requestData.receipt_date != '') {
        document.getElementById('bNum').value = requestData.rereceipt_order
        document.getElementById('datepicker2').value = requestData.receipt_date
        document.getElementById('bFee').value = requestData.receipt_fee
        document.getElementById('bFine').value = requestData.receipt_fine
    }

    if (document.getElementById("person2_name") != undefined) {
        document.getElementById("person2_name").value = `${assistantOperatorData.title} ${assistantOperatorData.name} ${assistantOperatorData.surname}`
        document.getElementById("person2_id").value = assistantOperatorData.personal_id
        document.getElementById('wLocation').value = establishmentData.grond


        document.getElementById('typeReForm').value = requestData.subcategory
        document.getElementById('typeProduct').value = requestData.product_type
        document.getElementById('timeStart').value = requestData.sell_start
        document.getElementById('timeEnd').value = requestData.sell_end


    } else {
        document.getElementById('typeWorkplace').value = establishmentData.type
    }
    if (document.getElementById('machinery' != undefined)) {
        document.getElementById('machinery').value = requestData.machine_size
        document.getElementById('area').value = requestData.area_size
        document.getElementById('numPeople').value = requestData.worker
    }
    if (document.getElementById('con_no1') != undefined) {
        document.getElementById('con_no1').value = requestData.condition_no_1
        document.getElementById('con_no2').value = requestData.condition_no_2
        document.getElementById('con_no3').value = requestData.condition_no_3
        document.getElementById('con_no4').value = requestData.condition_no_4
    }
    //ใช้อาคารสถานที่ประกอบการของผู้อื่น
    if (document.getElementById('useOtherPlace') != undefined) {
        if (requestData.establishment_is_land_owned === '') {
            document.getElementById('boxOwner').style.display = 'none'
            document.getElementById('notuseOtherPlace').checked = true
            document.getElementById('useOtherPlace').checked = false
        } else {
            document.getElementById('boxOwner').style.display = ''
            document.getElementById('ownPrefix').value = landData.title
            document.getElementById('ownName').value = landData.name
            document.getElementById('ownSurname').value = landData.surname
            //วันเกิด
            document.getElementById('datepicker9').value = landData.birthday
            document.getElementById('ownPhone').value = landData.phone

            document.getElementById('ownHomeId').value = addressOwnerLandData.home_number
            document.getElementById('ownMoo').value = addressOwnerLandData.moo
            document.getElementById('ownTrxk').value = addressOwnerLandData.trxk
            document.getElementById('ownSxy').value = addressOwnerLandData.sxy
            document.getElementById('ownRoad').value = addressOwnerLandData.road

            let provinceIdEL = parseInt(getProviceIdByName(addressEstablishmentData.province_name))
            let amphurIdEL = parseInt(getAmphureIdByName(addressEstablishmentData.amphur_name, provinceIdEL))
            let districtIdEL = parseInt(getDistrictIdByName(addressEstablishmentData.district_name, amphurIdEL))
            document.getElementById(`ownerProvince`).value = provinceIdEL
            onwerAmphurSelect(parseInt(provinceIdEL))
            onwerDistrictSelect(parseInt(amphurIdEL))
            document.getElementById(`ownerDistrict`).value = amphurIdEL
            document.getElementById(`ownerSubdistrict`).value = districtIdEL

            if (landData.status_upload_file) {
                document.getElementById('status_upload_file').style.display = ''
            } else {
                document.getElementById('status_upload_file').style.display = 'none'
            }
            document.getElementById('notuseOtherPlace').checked = false
            document.getElementById('useOtherPlace').checked = true
        }
    }
    //ใบอนุญาตจำหน่ายสุรา
    if (document.getElementById('useSpirits') != undefined) {
        if (requestData.sell_allow === 'N') {
            document.getElementById('notuseSpirits').checked = true
            document.getElementById('useSpirits').checked = false
        } else {
            document.getElementById('notuseSpirits').checked = false
            document.getElementById('useSpirits').checked = true
        }
    }
    //ใบอบรมผู้สัมผัสอาหาร
    if (document.getElementById('foodTrain') != undefined) {
        if (requestData.train_id === 'NO') {
            document.getElementById('boxFood').style.display = 'none'
            document.getElementById('foodNoTrain').checked = true
            document.getElementById('foodTrain').checked = false
        } else {
            document.getElementById('boxFood').style.display = ''
            document.getElementById('foodNoTrain').checked = false
            document.getElementById('foodTrain').checked = true

            document.getElementById('foodBy').value = trianData.issuse
            document.getElementById('datepicker5').value = trianData.date_exp
            document.getElementById('datepicker6').value = trianData.date_issued
        }
    }
    // document.getElementById('typeReq').value = 

}
// set data form database 
function setDataOperator(raw_data, type) {
    setOperatorData(raw_data)
    setOperatorAddressData(raw_data)
    if (type === 'OPERATOR') {
        document.getElementById("typeUser").value = operatorData.type
        document.getElementById("id").value = operatorData.personal_id
        document.getElementById("name").value = `${operatorData.title} ${operatorData.name} ${operatorData.surname}`
        document.getElementById("documentName").value = `${operatorData.title} ${operatorData.name} ${operatorData.surname}`
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
function checkformatReturn(value) {
    let temp = ''
    value === null || value === 'NULL' ? temp = '' : temp = value
    return temp
}
//set data return form insert
function setRequestDataReturn(raw_data) {
    requestData.no = raw_data.no
    requestData.year = raw_data.year
    requestData.establishment_id = checkformatReturn(raw_data.establishment_is_land_owned)
    requestData.establishment_is_land_owned = checkformatReturn(raw_data.establishment_is_land_owned)
    requestData.establishment_address_id = checkformatReturn(raw_data.establishment_address_id)
    requestData.train_id = checkformatReturn(raw_data.train_id) === '' ? 'NO' : 'YES'
    requestData.reference_id = checkformatReturn(raw_data.reference_id) === '' ? 'NO' : 'YES'
    requestData.image_name = raw_data.image_name

    establishmentData.address_id = checkformatReturn(raw_data.establishment_is_land_owned)
    landData.address_id = checkformatReturn(raw_data.land_address_establishment)
    addressOwnerLandData.id = checkformatReturn(raw_data.establishment_is_land_owned)
    trianData.id = checkformatReturn(raw_data.train_id)
    referecneData.id = checkformatReturn(raw_data.reference_id)
    landData.id = requestData.establishment_is_land_owned
    addressEstablishmentData.id = establishmentData.address_id
    establishmentData.id = requestData.establishment_id
    requestData.status = raw_data.status
    console.log(`landData`)
    console.log(landData)
    console.log(`referecneData`)
    console.log(referecneData)
    console.log(`trianData`)
    console.log(trianData)
    console.log(`establishmentData`)
    console.log(establishmentData)
    console.log(`addressEstablishmentData`)
    console.log(addressEstablishmentData)
    console.log(`addressOwnerLandData`)
    console.log(addressOwnerLandData)
    console.log(`requestData`)
    console.log(requestData)
    console.log(`raw_data`)
    console.log(raw_data)
}

//set data full raw data
function setRequestData(raw_data) {
    requestData.no = raw_data.REQUEST_NO
    requestData.year = raw_data.REQUEST_YEAR
    requestData.personal_id_owner = raw_data.PERSONAL_ID_OWNER
    requestData.request_type_id = raw_data.REQUEST_TYPE_ID
    requestData.staff_id_alderman = raw_data.STAFF_ID_ALDERMAN
    requestData.establishment_id = raw_data.ESTABLISHMENT_ID
    requestData.staff_id_money = raw_data.STAFF_ID_MONEY === null ? '' : raw_data.STAFF_ID_MONEY
    requestData.personal_id_assistant = raw_data.PERSONAL_ID_ASSISTANT === null ? '' : raw_data.PERSONAL_ID_ASSISTANT
    requestData.staff_id_approve = raw_data.STAFF_ID_APPROVE === null ? '' : raw_data.STAFF_ID_APPROVE
    requestData.establishment_is_land_owned = raw_data.ESTABLISHMENT_IS_LAND_OWNED === null ? '' : raw_data.ESTABLISHMENT_IS_LAND_OWNED
    requestData.establishment_address_id = raw_data.ESTABLISHMENT_ADDRESS_ID === null ? '' : raw_data.ESTABLISHMENT_ADDRESS_ID
    requestData.menu = raw_data.REQUEST_MENU
    requestData.date_submission = raw_data.REQUEST_DATE_SUBMISSION
    requestData.date_approve = raw_data.REQUEST_DATE_APPROVE === null ? '' : raw_data.REQUEST_DATE_APPROVE
    requestData.reference_id = raw_data.REFERENCE_ID === null ? 'NO' : 'YES'
    requestData.train_id = raw_data.TRAIN_ID === null ? 'NO' : 'YES'
    requestData.doc_no1 = raw_data.REQUEST_DOC_NO1
    requestData.doc_no2 = raw_data.REQUEST_DOC_NO2
    requestData.doc_no3 = raw_data.REQUEST_DOC_NO3
    requestData.doc_no4 = raw_data.REQUEST_DOC_NO4
    requestData.doc_no5 = raw_data.REQUEST_DOC_NO5
    requestData.doc_no6 = raw_data.REQUEST_DOC_NO6
    requestData.subcategory = raw_data.REQUEST_SUBCATEGORY === null ? '' : raw_data.REQUEST_SUBCATEGORY
    requestData.product_type = raw_data.REQUEST_PRODUCT_TYPE === null ? '' : raw_data.REQUEST_PRODUCT_TYPE
    requestData.sell_start = raw_data.REQUEST_SELL_START === null ? '' : raw_data.REQUEST_SELL_START
    requestData.sell_end = raw_data.REQUEST_SELL_END === null ? '' : raw_data.REQUEST_SELL_END
    requestData.sell_allow = raw_data.REQUEST_SELL_ALLOW
    requestData.receipt_order = raw_data.REQUEST_RECEIPT_ORDER === null ? '' : raw_data.REQUEST_RECEIPT_ORDER
    requestData.receipt_fine = raw_data.REQUEST_RECEIPT_FINE === null ? '' : raw_data.REQUEST_RECEIPT_FINE
    requestData.receipt_fee = raw_data.REQUEST_RECEIPT_FEE === null ? '' : raw_data.REQUEST_RECEIPT_FEE
    requestData.receipt_total = raw_data.REQUEST_RECEIPT_TOTAL === null ? '' : raw_data.REQUEST_RECEIPT_TOTAL
    requestData.receipt_date = raw_data.REQUEST_RECEIPT_DATE === null ? '' : raw_data.REQUEST_RECEIPT_DATE
    requestData.date_issued = raw_data.REQUEST_DATE_ISSUED === null ? '' : raw_data.REQUEST_DATE_ISSUED
    requestData.date_expired = raw_data.REQUEST_DATE_EXPIRED === null ? '' : raw_data.REQUEST_DATE_EXPIRED
    requestData.condition_no_1 = raw_data.REQUEST_CONDITION_NO_1 === null ? '' : raw_data.REQUEST_CONDITION_NO_1
    requestData.condition_no_2 = raw_data.REQUEST_CONDITION_NO_2 === null ? '' : raw_data.REQUEST_CONDITION_NO_2
    requestData.condition_no_3 = raw_data.REQUEST_CONDITION_NO_3 === null ? '' : raw_data.REQUEST_CONDITION_NO_3
    requestData.condition_no_4 = raw_data.REQUEST_CONDITION_NO_4 === null ? '' : raw_data.REQUEST_CONDITION_NO_4
    requestData.image_name = raw_data.REQUEST_IMAGE_NAME === null ? '' : raw_data.REQUEST_IMAGE_NAME
    requestData.total_image = raw_data.REQUEST_TOTAL_IMAGE
    requestData.status = raw_data.REQUEST_STATUS
    requestData.delete_logic = raw_data.REQUEST_DELETE_LOGIC === null ? '' : raw_data.REQUEST_DELETE_LOGIC
    requestData.is_deleted = raw_data.REQUEST_IS_DELETED
    // requestData.last_update: '20-05-2563',
    // requestData.username: 'ADMIN'

}
function setEstablishmentData(raw_data) {
    establishmentData.id = raw_data.ESTABLISHMENT_DATA.ESTABLISHMENT_ID
    establishmentData.address_id = raw_data.ESTABLISHMENT_DATA.ADDRESS_ID
    establishmentData.perosonal_id = raw_data.ESTABLISHMENT_DATA.PERSONAL_ID
    establishmentData.type = raw_data.ESTABLISHMENT_DATA.ESTABLISHMENT_TYPE === null ? '' : raw_data.ESTABLISHMENT_DATA.ESTABLISHMENT_TYPE
    establishmentData.name = raw_data.ESTABLISHMENT_DATA.ESTABLISHMENT_NAME === null ? '' : raw_data.ESTABLISHMENT_DATA.ESTABLISHMENT_NAME
    establishmentData.is_land_owned = raw_data.ESTABLISHMENT_IS_LAND_OWNED === null ? 'NO' : 'YES'
    establishmentData.machine_size = raw_data.ESTABLISHMENT_DATA.ESTABLISHMENT_MACHINE_SIZE === null ? 0 : raw_data.ESTABLISHMENT_DATA.ESTABLISHMENT_MACHINE_SIZE
    establishmentData.area_size = raw_data.ESTABLISHMENT_DATA.ESTABLISHMENT_AREA_SIZE === null ? 0 : raw_data.ESTABLISHMENT_DATA.ESTABLISHMENT_AREA_SIZE
    establishmentData.worker = raw_data.ESTABLISHMENT_DATA.ESTABLISHMENT_WORKER === null ? 0 : raw_data.ESTABLISHMENT_DATA.ESTABLISHMENT_WORKER
    establishmentData.phone = raw_data.ESTABLISHMENT_DATA.ESTABLISHMENT_PHONE
    establishmentData.fax = raw_data.ESTABLISHMENT_DATA.ESTABLISHMENT_FAX === null ? '' : raw_data.ESTABLISHMENT_DATA.ESTABLISHMENT_FAX
    establishmentData.grond = raw_data.ESTABLISHMENT_DATA.ESTABLISHMENT_GROUND === null ? '' : raw_data.ESTABLISHMENT_DATA.ESTABLISHMENT_GROUND
}
function setAddressEstablishmentData(raw_data) {
    addressEstablishmentData.id = raw_data.ESTABLISHMENT_DATA.ADDRESS.ADDRESS_ID
    addressEstablishmentData.home_number = raw_data.ESTABLISHMENT_DATA.ADDRESS.ADDRESS_HOME_NUMBER
    addressEstablishmentData.moo = raw_data.ESTABLISHMENT_DATA.ADDRESS.ADDRESS_MOO === null ? '' : raw_data.ESTABLISHMENT_DATA.ADDRESS.ADDRESS_MOO
    addressEstablishmentData.trxk = raw_data.ESTABLISHMENT_DATA.ADDRESS.ADDRESS_TRXK === null ? '' : raw_data.ESTABLISHMENT_DATA.ADDRESS.ADDRESS_TRXK
    addressEstablishmentData.sxy = raw_data.ESTABLISHMENT_DATA.ADDRESS.ADDRESS_SXY === null ? '' : raw_data.ESTABLISHMENT_DATA.ADDRESS.ADDRESS_SXY
    addressEstablishmentData.building = raw_data.ESTABLISHMENT_DATA.ADDRESS.ADDRESS_BUILDING === null ? '' : raw_data.ESTABLISHMENT_DATA.ADDRESS.ADDRESS_BUILDING
    addressEstablishmentData.road = raw_data.ESTABLISHMENT_DATA.ADDRESS.ADDRESS_ROAD === null ? '' : raw_data.ESTABLISHMENT_DATA.ADDRESS.ADDRESS_ROAD
    addressEstablishmentData.district_name = raw_data.ESTABLISHMENT_DATA.ADDRESS.DISTRICT_NAME
    addressEstablishmentData.amphur_name = raw_data.ESTABLISHMENT_DATA.ADDRESS.AMPHUR_NAME
    addressEstablishmentData.province_name = raw_data.ESTABLISHMENT_DATA.ADDRESS.PROVINCE_NAME
}
function setAddressOwnerLandData(raw_data) {
    if (raw_data.ESTABLISHMENT_DATA.ESTABLISHMENT_IS_LAND_OWNED != null) {
        addressOwnerLandData.id = raw_data.ESTABLISHMENT_DATA.LAND.ADDRESS.ADDRESS_ID
        addressOwnerLandData.home_number = raw_data.ESTABLISHMENT_DATA.LAND.ADDRESS.ADDRESS_HOME_NUMBER
        addressOwnerLandData.moo = raw_data.ESTABLISHMENT_DATA.LAND.ADDRESS.ADDRESS_MOO === null ? '' : raw_data.ESTABLISHMENT_DATA.LAND.ADDRESS.ADDRESS_MOO
        addressOwnerLandData.trxk = raw_data.ESTABLISHMENT_DATA.LAND.ADDRESS.ADDRESS_TRXK === null ? '' : raw_data.ESTABLISHMENT_DATA.LAND.ADDRESS.ADDRESS_TRXK
        addressOwnerLandData.sxy = raw_data.ESTABLISHMENT_DATA.LAND.ADDRESS.ADDRESS_SXY === null ? '' : raw_data.ESTABLISHMENT_DATA.LAND.ADDRESS.ADDRESS_SXY
        addressOwnerLandData.building = raw_data.ESTABLISHMENT_DATA.LAND.ADDRESS.ADDRESS_BUILDING === null ? '' : raw_data.ESTABLISHMENT_DATA.LAND.ADDRESS.ADDRESS_BUILDING
        addressOwnerLandData.road = raw_data.ESTABLISHMENT_DATA.LAND.ADDRESS.ADDRESS_ROAD === null ? '' : raw_data.ESTABLISHMENT_DATA.LAND.ADDRESS.ADDRESS_ROAD
        addressOwnerLandData.district_name = raw_data.ESTABLISHMENT_DATA.LAND.ADDRESS.DISTRICT_NAME
        addressOwnerLandData.amphur_name = raw_data.ESTABLISHMENT_DATA.LAND.ADDRESS.AMPHUR_NAME
        addressOwnerLandData.province_name = raw_data.ESTABLISHMENT_DATA.LAND.ADDRESS.PROVINCE_NAME
    }
}
function setLandData(raw_data) {
    //ADDRESS
    if (raw_data.ESTABLISHMENT_DATA.ESTABLISHMENT_IS_LAND_OWNED != undefined) {
        landData.id = raw_data.ESTABLISHMENT_DATA.ESTABLISHMENT_IS_LAND_OWNED
        landData.address_id = raw_data.ESTABLISHMENT_DATA.LAND.ADDRESS_ID
        landData.title = raw_data.ESTABLISHMENT_DATA.LAND.LAND_TITLE
        landData.name = raw_data.ESTABLISHMENT_DATA.LAND.LAND_NAME
        landData.surname = raw_data.ESTABLISHMENT_DATA.LAND.LAND_SURNAME
        landData.birthday = raw_data.ESTABLISHMENT_DATA.LAND.LAND_BIRTHDAY === null ? '' : raw_data.ESTABLISHMENT_DATA.LAND.LAND_BIRTHDAY
        landData.phone = raw_data.ESTABLISHMENT_DATA.LAND.LAND_PHONE

        if (raw_data.ESTABLISHMENT_DATA.LAND.UPLOADFILE != undefined) {
            landData.status_upload_file = raw_data.ESTABLISHMENT_DATA.LAND.UPLOADFILE
        } else {
            landData.status_upload_file = false
        }

    }

}
function setReferecneData(raw_data) {
    if (raw_data.REFERENCE_DATA != undefined) {
        referecneData.id = raw_data.REFERENCE_DATA.REFERENCE_ID
        referecneData.title = raw_data.REFERENCE_DATA.REFERENCE_TITLE
        referecneData.name = raw_data.REFERENCE_DATA.REFERENCE_NAME
        referecneData.surname = raw_data.REFERENCE_DATA.REFERENCE_SURNAME
        referecneData.status = raw_data.REFERENCE_DATA.REFERENCE_SURNAME
        referecneData.phone = raw_data.REFERENCE_DATA.REFERENCE_PHONE
    }


}
function setTrianData(raw_data) {
    if (raw_data.TRAIN_DATA != undefined) {
        trianData.id = raw_data.TRAIN_DATA.TRAIN_ID
        trianData.issuse = raw_data.TRAIN_DATA.TRAIN_ISSUED
        trianData.date_exp = raw_data.TRAIN_DATA.TRAIN_DATE_EXP
        trianData.date_issued = raw_data.TRAIN_DATA.TRAIN_DATE_ISSUED
    }
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

        let provinceValue = parseInt(document.getElementById(`province`).value);
        let amphurValue = parseInt(document.getElementById(`district`).value);
        let districtValue = parseInt(document.getElementById(`subdistrict`).value);

        operatorAddressData.district_name = district[districtValue - 1].DISTRICT_NAME;
        operatorAddressData.amphur_name = amphur[amphurValue - 1].AMPHUR_NAME;
        operatorAddressData.province_name = province[provinceValue - 1].PROVINCE_NAME;
    }
    if (newDocument) {
        requestData.no = ''
        requestData.year = parseInt(new Date().toISOString().slice(0, 4)) + 543
        requestData.personal_id_owner = operatorData.id
        //create Database
        requestData.request_type_id = getRequestTypeId(document.getElementById('typeReq').value.trim())


        // -- - - 
        requestData.reference_id = document.getElementById('reference_name').value.trim().length != 0 ? 'YES' : 'NO'
        if (requestData.reference_id === 'YES') {
            referecneData.title = document.getElementById('reference_title').value.trim()
            referecneData.name = document.getElementById('reference_name').value.trim()
            referecneData.surname = document.getElementById('reference_surname').value.trim()
            referecneData.status = document.getElementById('reference_status').value.trim()
            referecneData.phone = document.getElementById('reference_phone').value
        }

        if (document.getElementById('foodTrain') != undefined) {
            requestData.train_id = document.getElementById('foodTrain').checked === true ? 'YES' : 'NO'
            if (requestData.train_id === 'YES') {
                trianData.issuse = document.getElementById('foodBy').value.trim()
                trianData.date_exp = document.getElementById('datepicker5').value
                trianData.date_issued = document.getElementById('datepicker6').value
            }
        }

        requestData.personal_id_assistant = assistantOperatorData.id != '' ? assistantOperatorData.id : ''

        requestData.image_is_changed = image_changed //ตัวแปรอยู่ใน utilities.js

        let menu = window.location.href.toString().slice(35, window.location.href.toString().length)
        menu = menu.replace(/[?&]+([^=&]+)=([^&]*)/gi, "");
        console.log(`request.menu => ${menu}`)
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
                requestData.menu = `ใบอนุญาตจัดตั้งสถานที่สะสมอาหาร`
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
            requestData.condition_no_1 = document.getElementById('con_no1').value.trim()
        }
        if (document.getElementById('con_no2') != undefined) {
            requestData.condition_no_2 = document.getElementById('con_no2').value.trim()
        }
        if (document.getElementById('con_no3') != undefined) {
            requestData.condition_no_3 = document.getElementById('con_no3').value.trim()
        }
        if (document.getElementById('con_no4') != undefined) {
            requestData.condition_no_4 = document.getElementById('con_no4').value.trim()
        }
        requestData.image_name = ''
        requestData.total_image = totalFiles.length
        // requestData.status =   '' //ไม่ให้เซ็ตเอง

        //สถานประกอบการ

        establishmentData.perosonal_id = operatorData.id
        if (document.getElementById('useOtherPlace') != undefined) {
            establishmentData.is_land_owned = document.getElementById('useOtherPlace').checked === true ? 'YES' : 'NO'
        } else {
            establishmentData.is_land_owned = 'NO'
        }
        if (document.getElementById('typeWorkplace') != undefined) {
            establishmentData.type = document.getElementById('typeWorkplace').value.trim()
        }

        establishmentData.name = document.getElementById('workplaceName').value.trim()
        if (document.getElementById('machinery') != undefined) {
            establishmentData.machine_size = document.getElementById('machinery').value.trim()
        }
        if (document.getElementById('area') != undefined) {
            establishmentData.area_size = document.getElementById('area').value.trim()
        }
        if (document.getElementById('numPeople') != undefined) {
            establishmentData.worker = document.getElementById('numPeople').value.trim()
        }
        establishmentData.phone = document.getElementById('wPhone').value.trim()
        establishmentData.fax = document.getElementById('wFax').value.trim()

        if (document.getElementById('wLocation') != undefined) {
            establishmentData.grond = document.getElementById('wLocation').value.trim()
        }

        addressEstablishmentData.home_number = document.getElementById('wPlaceId').value.trim()
        addressEstablishmentData.moo = document.getElementById('wMoo').value.trim()
        addressEstablishmentData.trxk = document.getElementById('wTrxk').value.trim()
        addressEstablishmentData.sxy = document.getElementById('wSxy').value.trim()
        addressEstablishmentData.building = document.getElementById('wBuilding').value.trim()
        addressEstablishmentData.road = document.getElementById('wRoad').value.trim()

        let provinceValue = parseInt(document.getElementById(`wProvince`).value);
        let amphurValue = parseInt(document.getElementById(`wDistrict`).value);
        let districtValue = parseInt(document.getElementById(`wSubdistrict`).value);

        addressEstablishmentData.district_name = district[districtValue - 1].DISTRICT_NAME;
        addressEstablishmentData.amphur_name = amphur[amphurValue - 1].AMPHUR_NAME;
        addressEstablishmentData.province_name = province[provinceValue - 1].PROVINCE_NAME;

        if (document.getElementById('ownPrefix') != undefined) {
            landData.title = document.getElementById('ownPrefix').value.trim()
            landData.name = document.getElementById('ownName').value.trim()
            landData.surname = document.getElementById('ownSurname').value.trim()
            landData.birthday = document.getElementById('datepicker9').value.trim()
            landData.phone = document.getElementById('ownPhone').value.trim()
            addressOwnerLandData.home_number = document.getElementById('ownHomeId').value.trim()
            addressOwnerLandData.moo = document.getElementById('ownMoo').value.trim()
            addressOwnerLandData.trxk = document.getElementById('ownTrxk').value.trim()
            addressOwnerLandData.sxy = document.getElementById('ownSxy').value.trim()
            addressOwnerLandData.road = document.getElementById('ownRoad').value.trim()

            let provinceValue = parseInt(document.getElementById(`ownerProvince`).value);
            let amphurValue = parseInt(document.getElementById(`ownerDistrict`).value);
            let districtValue = parseInt(document.getElementById(`ownerSubdistrict`).value);

            addressOwnerLandData.district_name = district[districtValue - 1].DISTRICT_NAME;
            addressOwnerLandData.amphur_name = amphur[amphurValue - 1].AMPHUR_NAME;
            addressOwnerLandData.province_name = province[provinceValue - 1].PROVINCE_NAME;
        }


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
    console.log(date)
    let now = new Date().toISOString().slice(0, 10) // 2020-02-16
    let year_now = parseInt(now.slice(0, 4)) + 543
    let month_now = parseInt(now.slice(5, 7))
    let day_now = parseInt(now.slice(8, 10))
    // date "08-02-2563" 1998-04-22T17:00:00.000Z
    let day_b = parseInt(date.slice(8, 9))
    let month_b = parseInt(date.slice(5, 7))
    let year_b = parseInt(date.slice(0, 4)) > 1800  && parseInt(date.slice(0, 4)) < 2200 ? parseInt(date.slice(0, 4)) + 543 : parseInt(date.slice(0, 4))
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
    arrayItem.push(imageData) // image 9
    return arrayItem
}
function insertRequest() {
    createGroupData()
    return new Promise((resolve, reject) => {
        console.log("insertToDatabase");
        var formData = new FormData();
        formData.append('files', files);

        for (var i = 0; i < totalFiles.length; i++) {
            let file = totalFiles[i];
            console.log(file);
            formData.append('files' + i, file);
        }
        formData.append("gropData", JSON.stringify(createArrayInsert()));
        axios.post("http://localhost:5000/insert/request", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(data => {
                return resolve(data.data);
            });
    });
}

function getRequestData(no, year) {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/get/request/${no}/${year}`).then((result) => {
            return resolve(result.data);
        })
    })
}
//get request type 
function getRequestType(type) {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/get/requestType/${type}`).then((result) => {
            resolve(result.data);
            for (let i = 0; i < result.data.length; i++) {
                requestType.push(result.data[i])
            }
            resolve(result.data);
        })
    })
}

function setRequsetType(type) {
    getRequestType(type).then((data_test) => {
        addRequestTypeToDatalist()
    })
    checkView(type)
}
function addRequestTypeToDatalist() {
    const list = document.getElementById('brow')
    for (let i = 0; i < requestType.length; i++) {
        let option = document.createElement('option');
        option.value = requestType[i].REQUEST_TYPE_NAME
        list.appendChild(option);
    }
}

function getRequestTypeId(type) {
    for (let i = 0; i < requestType.length; i++) {
        if (requestType[i].REQUEST_TYPE_NAME === type) {
            return requestType[i].REQUEST_TYPE_ID
        }
    }
}
function getRequestTypeValue(value) {
    for (let i = 0; i < requestType.length; i++) {
        if (requestType[i].REQUEST_TYPE_ID === value) {
            return requestType[i].REQUEST_TYPE_NAME
        }
    }
}

//get requestId form url
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}
function createImage(image) {
    deleteImageAllRequest()
    for (let i = 0; i < image.length; i++) {
        console.log(image[i])
        var span = document.createElement('span');
        span.innerHTML =
            [
                `<div class="col" style="width: 25%; height: 100%; ">
    <img 
    width=100% 
    height=85% 
    src="`
                , `data:image/${image[i].E_IMAGE_TYPE};base64,${image[i].E_IMAGE_DATA}`,
                '" title="', escape(image[i].E_IMAGE_NAME), '"/>'
                , "<br><button type='button' class='delete image'" +
                "onclick='deleteImage()' >ลบรูปภาพนี้</button>", "</div>"
            ].join('');

        document.getElementById('outputImage').insertBefore(span, null);
    }
}

//create print 
function printRequest() {
    //
}

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