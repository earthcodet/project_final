
let newDocument = true
let requestType = []
let userMoney = ''
let listAlderMan = []
function printDocumentRenew() {
    let html_display = `
    <div style = 'text-align:left; display:block' >
    <a>เลือกวันที่ที่ต้องการพิมพ์ใบอนุญาต</a>
    <br>
    <input type="text" id="datepicker5" placeholder=""   style="width: 95%" maxlength="10">
    <br> 
    <div class='center'>
        <label id='datepicker5_alert' class='alert tabOne' style='display:none' >ช่องนี้เว้นว่างไม่ได้</label>
    </div>
    </div>
`
    Swal.fire({
        html: html_display,
        width: '35%',
        customClass: 'swal-height',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "ใช่",
        cancelButtonText: "ไม่ใช่",
        confirmButtonColor: "#009688",
        cancelButtonColor: '#dc3545',
        closeOnConfirm: false,
        closeOnCancel: false,
        showLoaderOnConfirm: true,
        preConfirm: function () {
            let date_text = document.getElementById('datepicker5')
            let datepicker5_alert = document.getElementById('datepicker5_alert')
            date_text.classList.remove('alertInput')
            datepicker5_alert.style.display = 'none'
            if (date_text.value.trim().length === 0) {
                if (date_text.value.trim().length === 0) {
                    date_text.classList.add('alertInput')
                    datepicker5_alert.style.display = ''
                }
                Swal.showValidationMessage(
                    `ข้อมูลไม่ครบ`
                )
            } else {
                return new Promise(function (resolve, reject) {
                    resolve()
                })
            }
        }
    }).then((result) => {
        if (result.value) {
            printDocRenew(document.getElementById('datepicker5').value)
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
    });
    // กรณีใช้แบบ input
    $("#datepicker5").datetimepicker({
        timepicker: false,
        format: "d-m-Y", // กำหนดรูปแบบวันที่ ที่ใช้ เป็น 00-00-0000
        lang: "th", // ต้องกำหนดเสมอถ้าใช้ภาษาไทย และ เป็นปี พ.ศ.
        onSelectDate: function (dp, $input) {
            var yearT = new Date(dp).getFullYear();
            var yearTH = yearT + 543;
            var fulldate = $input.val();
            var fulldateTH = fulldate.replace(yearT, yearTH);
            $input.val(fulldateTH);
        }
    });
    // กรณีใช้กับ input ต้องกำหนดส่วนนี้ด้วยเสมอ เพื่อปรับปีให้เป็น ค.ศ. ก่อนแสดงปฏิทิน
    $('#datepicker5').keyup(function () {
        formatDate(this.value, 'datepicker5')
    });
}
function printDocRenew(date) {
    let requestId = getUrlVars()
    let id = []
    let sc = ''
    if (requestId.id_no != undefined & requestId.idyear != undefined) {
        sc = requestId.id_no.slice(0, 1)
        id.push(requestId.id_no)
        id.push(requestId.id_year)
    } else {
        sc = requestData.no.slice(0, 1)
        id.push(requestData.no)
        id.push(requestData.year)
    }


    date = date.split('-')
    let year = parseInt(date[2]) - 543
    let month = date[1]
    let day = date[0]
    let temp_date = `${year}-${month}-${day}`
    if (sc === 'E' || sc === 'F') {
        // preview_copy.html
        window.open('../central/preview_copy.html' + '?id_no=' + id[0] + '&id_year=' + id[1] + '&date=' + temp_date, '_blank');
    } else if (sc === 'A' || sc === 'B') {
        // preview_copy_3.html
        window.open('../central/preview_copy_3.html' + '?id_no=' + id[0] + '&id_year=' + id[1] + '&date=' + temp_date, '_blank');
    } else {
        // preview_copy_2.html
        window.open('../central/preview_copy_2.html' + '?id_no=' + id[0] + '&id_year=' + id[1] + '&date=' + temp_date, '_blank');
    }
}
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
                                    document.getElementById('print_document_renew').style.display = ''
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
                                    document.getElementById('print_document_renew').style.display = ''
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
                            document.getElementById('print_document_renew').style.display = ''
                        }
                    }
                })
            }
        }
    }
}
// setDataView
function setDataView() {
    document.getElementById('documentName2').readOnly = true
    if (document.getElementById('print_new_doc') != undefined) {
        document.getElementById('print_new_doc').style.display = 'none'
    }
    if (document.getElementById('bFeeY2') != undefined) {
        if (requestData.receipt_date_year_2 === '') {
            document.getElementById('datepicker10').value = requestData.receipt_date_year_2
            document.getElementById('bFeeY2').value = requestData.receipt_fee_year_2 === 0 ? '' : requestData.receipt_fee_year_2
            document.getElementById('bFineY2').value = requestData.receipt_fine_year_2 === 0 ? '' : requestData.receipt_fine_year_2
        } else {
            document.getElementById('datepicker10').value = requestData.receipt_date_year_2
            document.getElementById('bFeeY2').value = requestData.receipt_fee_year_2
            document.getElementById('bFineY2').value = requestData.receipt_fine_year_2
        }

        if (requestData.receipt_date_year_3 === '') {
            document.getElementById('datepicker11').value = requestData.receipt_date_year_3
            document.getElementById('bFeeY3').value = requestData.receipt_fee_year_3 === 0 ? '' : requestData.receipt_fee_year_3
            document.getElementById('bFineY3').value = requestData.receipt_fine_year_3 === 0 ? '' : requestData.receipt_fine_year_3
        } else {
            document.getElementById('datepicker11').value = requestData.receipt_date_year_3
            document.getElementById('bFeeY3').value = requestData.receipt_fee_year_3
            document.getElementById('bFineY3').value = requestData.receipt_fine_year_3
        }
    }
    if (requestData.receipt_date === '') {
        document.getElementById('datepicker2').value = requestData.receipt_date
        document.getElementById('bFee').value = requestData.receipt_fee === 0 ? '' : requestData.receipt_fee
        document.getElementById('bFine').value = requestData.receipt_fine === 0 ? '' : requestData.receipt_fine
    } else {
        document.getElementById('datepicker2').value = requestData.receipt_date
        document.getElementById('bFee').value = requestData.receipt_fee
        document.getElementById('bFine').value = requestData.receipt_fine
    }
    if (document.getElementById('print_new_doc') != undefined) {
        document.getElementById('print_new_doc').style.display = ''
    }
    document.getElementById('form_id').value = `${requestData.no}/${requestData.year}`
    document.getElementById('datepicker1').value = requestData.date_submission
    document.getElementById('typeReq').value = requestData.request_type_name
    document.getElementById("typeUser").value = operatorData.type
    document.getElementById("id").value = operatorData.personal_id
    document.getElementById("name").value = `${operatorData.title} ${operatorData.name} ${operatorData.surname}`
    document.getElementById("documentName").value = `${operatorData.title} ${operatorData.name} ${operatorData.surname}`
    document.getElementById("age").value = operatorData.birthday === '-' ? '-' : parseInt(getAge(operatorData.birthday))
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
    if (districtId === undefined || districtId === '') {
        document.getElementById(`subdistrict`).innerHTML = ''
    } else {
        document.getElementById(`subdistrict`).value = districtId
    }
    let cut_phone = operatorData.phone.split('/')
    if (cut_phone[1] === '') {
        document.getElementById("phone").value = cut_phone[0]
        document.getElementById('phone_more').value = ''
        document.getElementById('phone_more').disabled = false
    } else {
        document.getElementById("phone").value = cut_phone[0]
        document.getElementById('phone_more').disabled = false
        document.getElementById('phone_more').value = cut_phone[1]
    }
    document.getElementById("fax").value = operatorData.fax

    //Date request exp 
    document.getElementById('request_date_issued').value = requestData.date_issued
    document.getElementById('request_date_exp').value = requestData.date_expired

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
    console.log(`districtIdE ${districtIdE === undefined || districtIdE === ''}   ${districtIdE}`)
    if (districtIdE === undefined || districtIdE === '') {
        document.getElementById(`wSubdistrict`).innerHTML = ''
    } else {
        document.getElementById(`wSubdistrict`).value = districtIdE
    }
    let cut_phone_no3 = establishmentData.phone.split('/')
    if (cut_phone_no3[1] === '') {
        document.getElementById("wPhone").value = cut_phone_no3[0]
        document.getElementById('wPhone_more').value = ''
        document.getElementById('wPhone_more').disabled = false
    } else {
        document.getElementById("wPhone").value = cut_phone_no3[0]
        document.getElementById('wPhone_more').disabled = false
        document.getElementById('wPhone_more').value = cut_phone_no3[1]
    }
    document.getElementById("wFax").value = establishmentData.fax

    document.getElementById('workplaceName').value = establishmentData.name

    if (document.getElementById("person2_name") != undefined) {
        document.getElementById("person2_name").value = `${assistantOperatorData.title} ${assistantOperatorData.name} ${assistantOperatorData.surname}`
        document.getElementById("person2_id").value = assistantOperatorData.personal_id
        document.getElementById('wLocation').value = establishmentData.grond

        document.getElementById('typeReForm').value = requestData.subcategory
        document.getElementById('typeProduct').value = requestData.product_type
        document.getElementById('timeStart').value = requestData.sell_start
        document.getElementById('timeEnd').value = requestData.sell_end


    } else {
        if (document.getElementById('typeWorkplace') != undefined) {
            document.getElementById('typeWorkplace').value = requestData.product_type
        }
    }
    if (document.getElementById('machinery') != undefined) {
        document.getElementById('machinery').value = establishmentData.machine_size
    }
    if (document.getElementById('area') != undefined) {
        document.getElementById('area').value = establishmentData.area_size
    }
    if (document.getElementById('numPeople') != undefined) {
        document.getElementById('numPeople').value = establishmentData.worker
    }
    changeStatusMenuData() // RequestControl.js < switch menu to data === true
}
function setDataRequest(requestData_raw, ownerData_raw, assistantData_raw) {
    setRequestData(requestData_raw)
    setDataOperator(ownerData_raw)
    setOperatorAddressData(ownerData_raw)
    setAddressEstablishmentData(requestData_raw)
    setEstablishmentData(requestData_raw)
    if (assistantData_raw != undefined)
        setassistantOperatorData(assistantData_raw)

    console.log(requestData)
    console.log(establishmentData)
    console.log(addressEstablishmentData)
    console.log(operatorData)
    console.log(operatorAddressData)
    console.log(assistantOperatorData)


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
    requestData.personal_id_owner = raw_data.PERSONAL_ID_OWNER
    requestData.request_type_id = raw_data.REQUEST_TYPE_ID
    requestData.request_type_name = raw_data.REQUEST_TYPE_NAME
    requestData.staff_id_alderman = raw_data.STAFF_ID_ALDERMAN
    requestData.establishment_id = raw_data.ESTABLISHMENT_ID
    requestData.staff_id_money = raw_data.STAFF_ID_MONEY === null ? '' : raw_data.STAFF_ID_MONEY
    requestData.personal_id_assistant = raw_data.PERSONAL_ID_ASSISTANT === null ? '' : raw_data.PERSONAL_ID_ASSISTANT
    requestData.staff_id_approve = raw_data.STAFF_ID_APPROVE === null ? '' : raw_data.STAFF_ID_APPROVE
    requestData.establishment_is_land_owned = raw_data.E_DATA_LAND === null ? '' : raw_data.E_DATA_LAND
    requestData.establishment_address_id = raw_data.E_DATA_ADDRESS === null ? '' : raw_data.E_DATA_ADDRESS
    requestData.menu = raw_data.REQUEST_MENU
    requestData.date_submission = raw_data.REQUEST_DATE_SUBMISSION
    requestData.date_approve = raw_data.REQUEST_DATE_APPROVE === null ? '' : raw_data.REQUEST_DATE_APPROVE
    requestData.reference_id = raw_data.REFERENCE_ID === null ? 'NO' : raw_data.REFERENCE_ID
    requestData.train_id = raw_data.TRAIN_ID === null ? 'NO' : raw_data.TRAIN_ID
    requestData.doc_no1 = 'N'
    requestData.doc_no2 = 'N'
    requestData.doc_no3 = 'N'
    requestData.doc_no4 = 'N'
    requestData.doc_no5 = 'N'
    requestData.doc_no6 = 'N'
    requestData.subcategory = raw_data.REQUEST_SUBCATEGORY === null ? '' : raw_data.REQUEST_SUBCATEGORY
    requestData.product_type = raw_data.REQUEST_PRODUCT_TYPE === null ? '' : raw_data.REQUEST_PRODUCT_TYPE
    requestData.sell_start = raw_data.REQUEST_SELL_START === null ? '' : raw_data.REQUEST_SELL_START
    requestData.sell_end = raw_data.REQUEST_SELL_END === null ? '' : raw_data.REQUEST_SELL_END
    requestData.sell_allow = raw_data.REQUEST_SELL_ALLOW
    //year 1
    requestData.receipt_fine = raw_data.REQUEST_RECEIPT_FINE === null ? '' : raw_data.REQUEST_RECEIPT_FINE
    requestData.receipt_fee = raw_data.REQUEST_RECEIPT_FEE === null ? '' : raw_data.REQUEST_RECEIPT_FEE
    requestData.receipt_total = raw_data.REQUEST_RECEIPT_TOTAL === null ? '' : raw_data.REQUEST_RECEIPT_TOTAL
    requestData.receipt_date = raw_data.REQUEST_RECEIPT_DATE === null ? '' : raw_data.REQUEST_RECEIPT_DATE
    //year 2
    requestData.receipt_fine_year_2 = raw_data.REQUEST_RECEIPT_FINE_YEAR_2 === null ? '' : raw_data.REQUEST_RECEIPT_FINE_YEAR_2
    requestData.receipt_fee_year_2 = raw_data.REQUEST_RECEIPT_FEE_YEAR_2 === null ? '' : raw_data.REQUEST_RECEIPT_FEE_YEAR_2
    requestData.receipt_total_year_2 = raw_data.REQUEST_RECEIPT_TOTAL_YEAR_2 === null ? '' : raw_data.REQUEST_RECEIPT_TOTAL_YEAR_2
    requestData.receipt_date_year_2 = raw_data.REQUEST_RECEIPT_DATE_YEAR_2 === null ? '' : raw_data.REQUEST_RECEIPT_DATE_YEAR_2
    //year 3
    requestData.receipt_fine_year_3 = raw_data.REQUEST_RECEIPT_FINE_YEAR_3 === null ? '' : raw_data.REQUEST_RECEIPT_FINE_YEAR_3
    requestData.receipt_fee_year_3 = raw_data.REQUEST_RECEIPT_FEE_YEAR_3 === null ? '' : raw_data.REQUEST_RECEIPT_FEE_YEAR_3
    requestData.receipt_total_year_3 = raw_data.REQUEST_RECEIPT_TOTAL_YEAR_3 === null ? '' : raw_data.REQUEST_RECEIPT_TOTAL_YEAR_3
    requestData.receipt_date_year_3 = raw_data.REQUEST_RECEIPT_DATE_YEAR_3 === null ? '' : raw_data.REQUEST_RECEIPT_DATE_YEAR_3

    requestData.date_issued = raw_data.REQUEST_DATE_ISSUED === null ? '' : raw_data.REQUEST_DATE_ISSUED
    requestData.date_expired = raw_data.REQUEST_DATE_EXPIRED === null ? '' : raw_data.REQUEST_DATE_EXPIRED
    requestData.condition_no_1 = raw_data.REQUEST_CONDITION_NO_1 === null ? '' : raw_data.REQUEST_CONDITION_NO_1
    requestData.condition_no_2 = raw_data.REQUEST_CONDITION_NO_2 === null ? '' : raw_data.REQUEST_CONDITION_NO_2
    requestData.condition_no_3 = raw_data.REQUEST_CONDITION_NO_3 === null ? '' : raw_data.REQUEST_CONDITION_NO_3
    requestData.condition_no_4 = raw_data.REQUEST_CONDITION_NO_4 === null ? '' : raw_data.REQUEST_CONDITION_NO_4
    requestData.image_name = raw_data.REQUEST_IMAGE_NAME === null ? '' : raw_data.REQUEST_IMAGE_NAME
    requestData.total_image = raw_data.REQUEST_TOTAL_IMAGE
    requestData.status = 'wait'
    requestData.status_before = 'wait'

    requestData.delete_logic = ''
    requestData.is_deleted = 'N'

    requestData.last_update = raw_data.REQUEST_LAST_UPDATE
    // requestData.username: 'ADMIN'

}
function setDataOperator(raw_data) {
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
function setassistantOperatorData(raw_data) {
    assistantOperatorData.title = raw_data.PERSONAL_TITLE === null ? '' : raw_data.PERSONAL_TITLE
    assistantOperatorData.name = raw_data.PERSONAL_NAME
    assistantOperatorData.surname = raw_data.PERSONAL_SURNAME === null || raw_data.PERSONAL_SURNAME === undefined ? '' : raw_data.PERSONAL_SURNAME
    assistantOperatorData.personal_id = raw_data.PERSONAL_PERSONAL_ID
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
function setAddressEstablishmentData(raw_data) {
    // addressEstablishmentData.id = raw_data.E
    addressEstablishmentData.home_number = raw_data.ADDRESS_HOME_NUMBER
    addressEstablishmentData.moo = raw_data.ADDRESS_MOO === null ? '' : raw_data.ADDRESS_MOO
    addressEstablishmentData.trxk = raw_data.ADDRESS_TRXK === null ? '' : raw_data.ADDRESS_TRXK
    addressEstablishmentData.sxy = raw_data.ADDRESS_SXY === null ? '' : raw_data.ADDRESS_SXY
    addressEstablishmentData.building = raw_data.ADDRESS_BUILDING === null ? '' : raw_data.ADDRESS_BUILDING
    addressEstablishmentData.road = raw_data.ADDRESS_ROAD === null ? '' : raw_data.ADDRESS_ROAD
    addressEstablishmentData.district_name = raw_data.DISTRICT_NAME
    addressEstablishmentData.amphur_name = raw_data.AMPHUR_NAME
    addressEstablishmentData.province_name = raw_data.PROVINCE_NAME
}
function setEstablishmentData(raw_data) {
    // establishmentData.type = raw_data.ESTABLISHMENT_TYPE === null ? '' : raw_data.ESTABLISHMENT_TYPE
    establishmentData.name = raw_data.ESTABLISHMENT_NAME === null ? '' : raw_data.ESTABLISHMENT_NAME
    establishmentData.is_land_owned = raw_data.ESTABLISHMENT_IS_LAND_OWNED === null ? '' : raw_data.ESTABLISHMENT_IS_LAND_OWNED
    establishmentData.machine_size = raw_data.ESTABLISHMENT_MACHINE_SIZE === null ? 0 : raw_data.ESTABLISHMENT_MACHINE_SIZE
    establishmentData.area_size = raw_data.ESTABLISHMENT_AREA_SIZE === null ? 0 : raw_data.ESTABLISHMENT_AREA_SIZE
    establishmentData.worker = raw_data.ESTABLISHMENT_WORKER === null ? 0 : raw_data.ESTABLISHMENT_WORKER
    establishmentData.phone = raw_data.ESTABLISHMENT_PHONE
    establishmentData.fax = raw_data.ESTABLISHMENT_FAX === null ? '' : raw_data.ESTABLISHMENT_FAX
    establishmentData.grond = raw_data.ESTABLISHMENT_GROUND === null ? '' : raw_data.ESTABLISHMENT_GROUND
}
// set data change
function createRenewData() {
    resetRequestMoney(requestData)
    requestData.receipt_data = document.getElementById('datepicker3').value.trim()
    requestData.receipt_fine = document.getElementById('renew_fine').value.trim()
    requestData.receipt_fee = document.getElementById('renew_fee').value.trim()
    requestData.date_submission = document.getElementById('datepicker4').value.trim()
    requestData.year = parseInt(new Date().toISOString().slice(0, 4)) + 543
    requestData.date_issued = document.getElementById('datepicker3').value.trim()
    let dateNew_t_n = requestData.date_expired.split('-')
    console.log(`date expire = ???>?>?>>?`)
    console.log(dateNew_t_n)
    console.log(requestData.menu)
    if (requestData.menu === 'หนังสือรับรองการแจ้งจัดตั้งสถานที่สะสมอาหาร' || requestData.menu === 'หนังสือรับรองการแจ้งจัดตั้งสถานที่จำหน่ายอาหาร') {

        let day = dateNew_t_n[0]
        let month = dateNew_t_n[1]
        let year = parseInt(dateNew_t_n[2]) + 3
        if (day === '29' && month === '02' && year % 4 === 0) {
            requestData.date_expired = `01-03-${year}`
        } else {
            requestData.date_expired = `${day}-${month}-${year}`
        }
        console.log(`date expire condition 1 ${requestData.date_expired}`)
    } else if (requestData.menu === 'ใบอนุญาตจำหน่ายสินค้าในที่หรือทางสาธารณะ' || requestData.menu === 'ใบอนุญาตเร่ขายสินค้าในที่หรือทางสาธารณะ') {
        let year = parseInt(dateNew_t_n[2]) + 1
        requestData.date_expired = `31-12-${year}`
        console.log(`date expire condition 2  ${requestData.date_expired}`)
    } else {
        let day = dateNew_t_n[0]
        let month = dateNew_t_n[1]
        let year = parseInt(dateNew_t_n[2]) + 1
        if (day === '29' && month === '02' && year % 4 === 0) {
            requestData.date_expired = `01-03-${year}`
        } else {
            requestData.date_expired = `${day}-${month}-${year}`
        }
        console.log(`date expire condition 3 ${requestData.date_expired}`)
    }

    requestData.doc_no1 = document.getElementById('documentId').checked === true ? 'Y' : 'N'
    requestData.doc_no2 = document.getElementById('documenthHome').checked === true ? 'Y' : 'N'
    requestData.doc_no3 = document.getElementById('documentLegalEntity').checked === true ? 'Y' : 'N'
    requestData.doc_no4 = document.getElementById('documentSignature').checked === true ? 'Y' : 'N'
    requestData.doc_no5 = document.getElementById('documentSJ4').checked === true ? 'Y' : 'N'
    requestData.doc_no6 = document.getElementById('documentOther').checked === true ? document.getElementById('other').value.trim() : 'N'
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
//prepare InsertData
function createArrayInsertRenew() {
    let arrayItem = []
    arrayItem.push(requestData) // request 0
    return arrayItem
}
function insertRequestRenew() {
    createRenewData()
    let item = createArrayInsertRenew()
    console.log(`--- data to return ---`)
    console.log(item[0])
    console.log(`--- End to return ---`)
    return new Promise((resolve, reject) => {
        axios.post("http://localhost:5000/insert/request/renew", { 'renew_data': item[0] }).then(data => {
            console.log(data.data)
            return resolve(data.data);
        });
        // return resolve(true)
    });
}
function getRequestDataRenew(no, year) {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/get/request/renew/id/${no}/${year}`).then((result) => {
            return resolve(result.data);
        })
    })
}
function getPositionAlderman(userId) {
    for (let i = 0; i < listAlderMan.length; i++) {
        if (listAlderMan[i].USER_ID === userId) {
            return listAlderMan[i].USER_POSITION
        }
    }
}
function setLisetUserAlderManToUi(list_user) {
    console.log(list_user)
    if (list_user.length != 0) {
        listAlderMan = []
        for (let i = 0; i < list_user.length; i++) {
            if (list_user[i].USER_POSITION_TYPE != 'การเงิน') {
                if (document.getElementById('position').value.trim() === '') {
                    requestData.staff_id_alderman = list_user[i].USER_ID
                    document.getElementById('position').value = list_user[i].USER_POSITION
                }
                var select = document.getElementById("documentName3");
                var option = document.createElement("option");
                let item = list_user[i]
                option.text = `${item.USER_TITLE} ${item.USER_NAME} ${item.USER_SURNAME}`
                option.value = list_user[i].USER_ID;
                listAlderMan.push(list_user[i])
                select.onchange = function () { changePositionAlderman(this.value) };
                select.add(option);
            }
        }


    }
}
function changePositionAlderman(userId) {
    document.getElementById('position').value = getPositionAlderman(userId)
    requestData.staff_id_alderman = document.getElementById('documentName3').value
}
//get user
function getUser() {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/get/users/money/president`).then((result) => {
            return resolve(result.data);
        })
    })
}
function setLisetUserMoneyToUi(list_user) {
    console.log(list_user)
    if (list_user.length != 0) {
        for (let i = 0; i < list_user.length; i++) {
            if (list_user[i].USER_POSITION_TYPE === 'การเงิน') {
                var select = document.getElementById("documentName2");
                var option = document.createElement("option");
                let item = list_user[i]
                option.text = `${item.USER_TITLE} ${item.USER_NAME} ${item.USER_SURNAME}`
                option.value = list_user[i].USER_ID;
                select.onchange = function () { requestData.staff_id_money = this.value };
                select.add(option);
            }
        }
        requestData.staff_id_money = document.getElementById("documentName2").value
    }
}
function displayUser() {
    getUser().then((list_user) => {
        setLisetUserMoneyToUi(list_user)
        setLisetUserAlderManToUi(list_user)
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
function printRequest() {
    //  Print Document
}
function resetOptionitem(id, length) {
    console.log(`resetOptionitem ${id}`)
    var select = document.getElementById(id);
    console.log(`length ${length}`)
    for (i = 0, c = 0; i < length; i++) {
        select.options[c] = null;
        console.log(`select.options[${c}] ${select.options[c]}`)
    }
}
function getPositionById(id) {
    for (let i = 0; i < alderman_list.length; i++) {
        if (id === alderman_list[i].USER_ID) {
            return alderman_list[i].USER_POSITION
        }
    }
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
function loadingData(type) {
    runForm().then((data) => {
        displayUser()
        setTypeMenu(type)
        checkView(type)
    })
}