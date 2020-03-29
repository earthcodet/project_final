let newDocument = true
let requestType = []
let userMoney = ''
let userAlderman = ''
let temp_alderman_list = []
function checkView(typeForm) {
    let requestId = getUrlVars()
    console.log(requestId)
    if (requestId.id != undefined) {
        let requsetNo = requestId.id.slice(0, 6)
        let requestYear = requestId.id.slice(6, 10)
        console.log(`typeForm ${typeForm}`)
        if (typeForm != undefined) {
            let sight = getSightFormType(typeForm)
            let checkSight = requsetNo.slice(0, 1) === sight ? true : false
            console.log(`sight ${sight}`)
            console.log(`checkSight = ${checkSight} > ${requsetNo.slice(0, 1)} === ${sight} > ${requsetNo.slice(0, 1) === sight}`)
            console.log(checkSight)
            if (checkSight) {
                getRequestData(requsetNo, requestYear).then((raw_data) => {
                    //displayUserAlderman()
                    console.log(raw_data)
                    if (raw_data != '') {
                        document.getElementById('btn_sc_op').disabled = true
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
                        // imageDisplayFormDatabase = raw_data.IMAGE_REVIEW
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
                        console.log(referenceData)
                        console.log(`trianData`)
                        console.log(trianData)
                        console.log(`operatorAddressData`)
                        console.log(operatorAddressData)
                        console.log(`operatorData`)
                        console.log(operatorData)
                        console.log(`assistantOperatorData`)
                        console.log(assistantOperatorData)
                        setDataView()
                        if (requestData.no != '') {
                            if (requestData.status === 'active') {
                                document.getElementById('print_document_allow').style.display = ''
                            }
                            document.getElementById('print_document_image').style.display = ''
                        } else {
                            document.getElementById('print_document_image').style.display = 'none'
                            document.getElementById('print_document_allow').style.display = 'none'
                        }

                        if (raw_data.REQUEST_IMAGE_NAME != null && raw_data.REQUEST_IMAGE_NAME != undefined) {
                            console.log('get image ' + raw_data.REQUEST_IMAGE_NAME)
                            getImageRequestByImageName(raw_data.REQUEST_IMAGE_NAME).then((image_get) => {
                                imageDisplayFormDatabase = image_get
                                createImage(imageDisplayFormDatabase)
                            })
                        }
                    }
                })
            }
        }
    }
    if (requestId.p_id != undefined && requestId.e_id != undefined) {
        if (requestId.p_id.length === 7 && requestId.e_id.length === 7) {
            getPersonalDataAndEstablishment(requestId.p_id, requestId.e_id).then((raw_data) => {
                // displayUserAlderman()
                console.log(raw_data)
                if (raw_data[0] != false && raw_data[1] != false) {
                    document.getElementById('btn_sc_op').disabled = true
                    setOperatorData(raw_data[0])
                    setOperatorAddressData(raw_data[0])
                    let temp = {
                        ESTABLISHMENT_DATA: raw_data[1]
                    }
                    setEstablishmentData(temp)
                    let temp_address = {
                        ESTABLISHMENT_DATA: raw_data[1]

                    }
                    setAddressOwnerLandData(temp_address)
                    setLandData(temp_address)
                    setAddressEstablishmentData(temp_address)
                    setDataProfile()
                }
            })
        }
    }
}
function deletePersonalTwo() {
    deleteAssistant()
    document.getElementById('person2_name').value = ''
    document.getElementById('person2_id').value = ''
    document.getElementById('personal2_delete').style.display = 'none'
}
//check format 
function checkFormatMoneyId(value) {
    return value
}
function setDataProfile() {
    document.getElementById('documentName2').readOnly = true
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

    if (document.getElementById("wLocation") != undefined) {
        document.getElementById('wLocation').value = establishmentData.grond

    } else {
        if (document.getElementById('typeWorkplace') != undefined) {
            document.getElementById('typeWorkplace').value = requestData.product_type
            // document.getElementById('typeWorkplace').value = establishmentData.type
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
    //ใช้อาคารสถานที่ประกอบการของผู้อื่น
    if (document.getElementById('useOtherPlace') != undefined) {
        if (establishmentData.is_land_owned === 'NO' && requestData.establishment_is_land_owned === '') {
            document.getElementById('boxOwner').style.display = 'none'
            document.getElementById('notuseOtherPlace').checked = true
            document.getElementById('useOtherPlace').checked = false
        } else {
            // get New Data Address
            document.getElementById('boxOwner').style.display = ''
            document.getElementById('ownPrefix').value = landData.title
            document.getElementById('ownName').value = landData.name
            document.getElementById('ownSurname').value = landData.surname
            //วันเกิด
            document.getElementById('datepicker9').value = landData.birthday
            let cut_phone_no4 = landData.phone.split('/')
            if (cut_phone_no4[1] === '') {
                document.getElementById("ownPhone").value = cut_phone_no4[0]
                document.getElementById('ownPhone_more').value = ''
                document.getElementById('ownPhone_more').disabled = false
            } else {
                document.getElementById("ownPhone").value = cut_phone_no4[0]
                document.getElementById('ownPhone_more').disabled = false
                document.getElementById('ownPhone_more').value = cut_phone_no4[1]
            }
            document.getElementById('ownHomeId').value = addressOwnerLandData.home_number
            document.getElementById('ownMoo').value = addressOwnerLandData.moo
            document.getElementById('ownTrxk').value = addressOwnerLandData.trxk
            document.getElementById('ownSxy').value = addressOwnerLandData.sxy
            document.getElementById('ownRoad').value = addressOwnerLandData.road

            let provinceIdEL = parseInt(getProviceIdByName(addressOwnerLandData.province_name))
            let amphurIdEL = parseInt(getAmphureIdByName(addressOwnerLandData.amphur_name, provinceIdEL))
            let districtIdEL = parseInt(getDistrictIdByName(addressOwnerLandData.district_name, amphurIdEL))
            document.getElementById(`ownerProvince`).value = provinceIdEL
            onwerAmphurSelect(parseInt(provinceIdEL))
            onwerDistrictSelect(parseInt(amphurIdEL))
            document.getElementById(`ownerDistrict`).value = amphurIdEL
            if (districtIdEL === '' || districtIdEL === undefined) {
                document.getElementById(`ownerSubdistrict`).innerHTML = ''
            } else {
                document.getElementById(`ownerSubdistrict`).value = districtIdEL
            }
            if (landData.status_upload_file) {
                document.getElementById('status_upload_file').style.display = ''
            } else {
                document.getElementById('status_upload_file').style.display = 'none'
            }
            document.getElementById('notuseOtherPlace').checked = false
            document.getElementById('useOtherPlace').checked = true
        }
    }
    changeStatusMenuData(requestData.status, requestData.is_deleted) // RequestControl.js < switch menu to data === true
}
// setDataView
function setDataView() {
    setIdDeleteRequest(requestData.is_deleted)
    document.getElementById('documentName2').readOnly = true
    // IMAGE
    if (imageDisplayFormDatabase.length != 0) {
        createImage(imageDisplayFormDatabase)
    }
    console.log('requestData.status ' + requestData.status)
    // if (requestData.status === 'approval' || requestData.status === 'active') {
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
    console.log('requestData.staff_id_money')
    console.log(requestData.staff_id_money)
    console.log(requestData.staff_id_money === '')
    if (requestData.staff_id_money === '') {
        resetOptionitem('documentName2', size_money_list)
        console.log(document.getElementById('documentName2'))
    } else {
        displayUserMoney(requestData.staff_id_money)
    }
    console.log(requestData.staff_id_alderman)
    console.log(documentName3)
    document.getElementById('documentName3').value = requestData.staff_id_alderman
    document.getElementById('position').value = getPositionById(requestData.staff_id_alderman)
    // }

    if (requestData.status === 'cancel') {
        document.getElementById('delete_request').style.display = ''
        document.getElementById('delete_date').value = requestData.last_update
        document.getElementById('delete_detail').value = requestData.delete_logic
    } else {
        document.getElementById('delete_request').style.display = 'none'
    }

    document.getElementById('form_id').value = `${requestData.no}/${requestData.year}`
    document.getElementById('datepicker1').value = requestData.date_submission
    document.getElementById('typeReq').value = getRequestTypeValue(requestData.request_type_id)
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
    document.getElementById('reference_title').value = referenceData.title
    document.getElementById('reference_name').value = referenceData.name
    document.getElementById('reference_surname').value = referenceData.surname
    document.getElementById('reference_status').value = referenceData.status
    let cut_phone_no2 = referenceData.phone.split('/')
    if (cut_phone_no2[1] === '') {
        document.getElementById("reference_phone").value = cut_phone_no2[0]
        document.getElementById('reference_phone_more').value = ''
        document.getElementById('reference_phone_more').disabled = false
    } else {
        document.getElementById("reference_phone").value = cut_phone_no2[0]
        document.getElementById('reference_phone_more').disabled = false
        document.getElementById('reference_phone_more').value = cut_phone_no2[1] === undefined ? '' : cut_phone_no2[1]
    }

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
        if (assistantOperatorData.id != '') {
            document.getElementById('personal2_delete').style.display = ''
        } else {
            document.getElementById('personal2_delete').style.display = 'none'
        }


        document.getElementById('typeReForm').value = requestData.subcategory
        document.getElementById('typeProduct').value = requestData.product_type
        document.getElementById('timeStart').value = requestData.sell_start
        document.getElementById('timeEnd').value = requestData.sell_end


    } else {
        if (document.getElementById('typeWorkplace') != undefined) {
            document.getElementById('typeWorkplace').value = requestData.product_type
            // document.getElementById('typeWorkplace').value = establishmentData.type
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
    if (document.getElementById('con_no1') != undefined) {
        document.getElementById('con_no1').value = requestData.condition_no_1
        document.getElementById('con_no2').value = requestData.condition_no_2
        document.getElementById('con_no3').value = requestData.condition_no_3
        document.getElementById('con_no4').value = requestData.condition_no_4
    }
    //ใช้อาคารสถานที่ประกอบการของผู้อื่น
    if (document.getElementById('useOtherPlace') != undefined) {
        if (establishmentData.is_land_owned === 'NO' && requestData.establishment_is_land_owned === '') {
            document.getElementById('boxOwner').style.display = 'none'
            document.getElementById('notuseOtherPlace').checked = true
            document.getElementById('useOtherPlace').checked = false
        } else {
            // get New Data Address
            document.getElementById('boxOwner').style.display = ''
            document.getElementById('ownPrefix').value = landData.title
            document.getElementById('ownName').value = landData.name
            document.getElementById('ownSurname').value = landData.surname
            //วันเกิด
            document.getElementById('datepicker9').value = landData.birthday
            let cut_phone_no4 = landData.phone.split('/')
            if (cut_phone_no4[1] === '') {
                document.getElementById("ownPhone").value = cut_phone_no4[0]
                document.getElementById('ownPhone_more').value = ''
                document.getElementById('ownPhone_more').disabled = false
            } else {
                document.getElementById("ownPhone").value = cut_phone_no4[0]
                document.getElementById('ownPhone_more').disabled = false
                document.getElementById('ownPhone_more').value = cut_phone_no4[1]
            }
            document.getElementById('ownHomeId').value = addressOwnerLandData.home_number
            document.getElementById('ownMoo').value = addressOwnerLandData.moo
            document.getElementById('ownTrxk').value = addressOwnerLandData.trxk
            document.getElementById('ownSxy').value = addressOwnerLandData.sxy
            document.getElementById('ownRoad').value = addressOwnerLandData.road

            let provinceIdEL = parseInt(getProviceIdByName(addressOwnerLandData.province_name))
            let amphurIdEL = parseInt(getAmphureIdByName(addressOwnerLandData.amphur_name, provinceIdEL))
            let districtIdEL = parseInt(getDistrictIdByName(addressOwnerLandData.district_name, amphurIdEL))
            document.getElementById(`ownerProvince`).value = provinceIdEL
            onwerAmphurSelect(parseInt(provinceIdEL))
            onwerDistrictSelect(parseInt(amphurIdEL))
            document.getElementById(`ownerDistrict`).value = amphurIdEL
            if (districtIdEL === '' || districtIdEL === undefined) {
                document.getElementById(`ownerSubdistrict`).innerHTML = ''
            } else {
                document.getElementById(`ownerSubdistrict`).value = districtIdEL
            }
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

    changeStatusMenuData(requestData.status, requestData.is_deleted) // RequestControl.js < switch menu to data === true
}
// set data form database 
function setDataOperator(raw_data, type) {
    operatorData.is_personal_changed = true
    operatorAddressData.is_address_changed = true
    if (type === 'OPERATOR') {
        setOperatorData(raw_data)
        setOperatorAddressData(raw_data)
        requestData.personal_id_owner = raw_data.PERSONAL_ID
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
        if (districtId === undefined || districtId === '') {
            document.getElementById(`subdistrict`).innerHTML = ''
        } else {
            document.getElementById(`subdistrict`).value = districtId
        }
        let cut_phone_no5 = operatorData.phone.split('/')
        if (cut_phone_no5[1] === '') {
            document.getElementById("phone").value = cut_phone_no5[0]
            document.getElementById('phone_more').value = ''
            document.getElementById('phone_more').disabled = false
        } else {
            document.getElementById("phone").value = cut_phone_no5[0]
            document.getElementById('phone_more').disabled = false
            document.getElementById('phone_more').value = cut_phone_no5[1]
        }
        document.getElementById("fax").value = operatorData.fax


    } else {
        setassistantOperatorData(raw_data)
        if (document.getElementById("person2_name") != undefined)
            document.getElementById("person2_name").value = `${assistantOperatorData.title} ${assistantOperatorData.name} ${assistantOperatorData.surname}`
        if (document.getElementById("person2_id") != undefined)
            document.getElementById("person2_id").value = assistantOperatorData.personal_id

        document.getElementById('personal2_delete').style.display = ''
    }
}
function checkformatReturn(value) {
    let temp = ''
    value === null || value === 'NULL' ? temp = '' : temp = value
    return temp
}
//set data return form update
function setRequestDataUpdateReturn(raw_data) {
    console.log(raw_data)
    trianData.id = raw_data.train_id === '' ? trianData.id : raw_data.train_id
    referenceData.id = raw_data.reference_id === '' ? referenceData.id : raw_data.reference_id
    landData.id = raw_data.land_id === '' ? landData.id : raw_data.land_id
    requestData.establishment_is_land_owned = checkformatReturn(raw_data.address_land_id)
    establishmentData.id = checkformatReturn(raw_data.establishment_id)
    requestData.establishment_id = checkformatReturn(raw_data.establishment_id)
    console.log('-o-<>-o-')
    console.log(establishmentData)
}
//set data return form insert
function setRequestDataReturn(raw_data) {
    requestData.no = raw_data.no
    requestData.year = raw_data.year
    requestData.establishment_id = checkformatReturn(raw_data.establishment_is_land_owned)
    requestData.establishment_is_land_owned = checkformatReturn(raw_data.establishment_is_land_owned)
    // requestData.establishment_address_id = checkformatReturn(raw_data.establishment_address_id)
    requestData.train_id = checkformatReturn(raw_data.train_id) === '' ? 'NO' : 'YES'
    requestData.reference_id = checkformatReturn(raw_data.reference_id) === '' ? 'NO' : 'YES'
    requestData.image_name = raw_data.image_name

    establishmentData.address_id = checkformatReturn(raw_data.establishment_is_land_owned)
    landData.address_id = checkformatReturn(raw_data.land_address_establishment)
    addressOwnerLandData.id = checkformatReturn(raw_data.establishment_is_land_owned)
    trianData.id = checkformatReturn(raw_data.train_id)
    referenceData.id = checkformatReturn(raw_data.reference_id)
    landData.id = requestData.establishment_is_land_owned
    addressEstablishmentData.id = establishmentData.address_id
    // establishmentData.id = requestData.establishment_id
    requestData.status = raw_data.status
    console.log(`landData`)
    console.log(landData)
    console.log(`referecneData`)
    console.log(referenceData)
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
    requestData.status = raw_data.REQUEST_STATUS
    requestData.status_before = raw_data.REQUEST_STATUS_BEFORE

    requestData.delete_logic = raw_data.REQUEST_DELETE_LOGIC === null ? '' : raw_data.REQUEST_DELETE_LOGIC
    requestData.is_deleted = raw_data.REQUEST_IS_DELETED

    requestData.last_update = raw_data.REQUEST_LAST_UPDATE
    // requestData.username: 'ADMIN'

}
function setEstablishmentData(raw_data) {
    if (raw_data.ESTABLISHMENT_DATA.ESTABLISHMENT_ID != undefined) {
        establishmentData.id = raw_data.ESTABLISHMENT_ID
        establishmentData.address_id = raw_data.ESTABLISHMENT_DATA.ADDRESS_ID
        establishmentData.perosonal_id = raw_data.ESTABLISHMENT_DATA.PERSONAL_ID
        // establishmentData.type = raw_data.ESTABLISHMENT_DATA.ESTABLISHMENT_TYPE === null ? '' : raw_data.ESTABLISHMENT_DATA.ESTABLISHMENT_TYPE
        establishmentData.name = raw_data.ESTABLISHMENT_DATA.ESTABLISHMENT_NAME === null ? '' : raw_data.ESTABLISHMENT_DATA.ESTABLISHMENT_NAME
        establishmentData.is_land_owned = raw_data.ESTABLISHMENT_DATA.ESTABLISHMENT_IS_LAND_OWNED === null ? 'NO' : 'YES'
        establishmentData.machine_size = raw_data.ESTABLISHMENT_DATA.ESTABLISHMENT_MACHINE_SIZE === null ? 0 : raw_data.ESTABLISHMENT_DATA.ESTABLISHMENT_MACHINE_SIZE
        establishmentData.area_size = raw_data.ESTABLISHMENT_DATA.ESTABLISHMENT_AREA_SIZE === null ? 0 : raw_data.ESTABLISHMENT_DATA.ESTABLISHMENT_AREA_SIZE
        establishmentData.worker = raw_data.ESTABLISHMENT_DATA.ESTABLISHMENT_WORKER === null ? 0 : raw_data.ESTABLISHMENT_DATA.ESTABLISHMENT_WORKER
        establishmentData.phone = raw_data.ESTABLISHMENT_DATA.ESTABLISHMENT_PHONE
        establishmentData.fax = raw_data.ESTABLISHMENT_DATA.ESTABLISHMENT_FAX === null ? '' : raw_data.ESTABLISHMENT_DATA.ESTABLISHMENT_FAX
        establishmentData.grond = raw_data.ESTABLISHMENT_DATA.ESTABLISHMENT_GROUND === null ? '' : raw_data.ESTABLISHMENT_DATA.ESTABLISHMENT_GROUND
    }
}
function setAddressEstablishmentData(raw_data) {
    if (raw_data.ESTABLISHMENT_DATA.ADDRESS != undefined) {
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
}
function setAddressOwnerLandData(raw_data) {
    if (raw_data.ESTABLISHMENT_DATA.LAND != null) {
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
    if (raw_data.ESTABLISHMENT_DATA.LAND != undefined) {
        landData.id = raw_data.ESTABLISHMENT_DATA.LAND.LAND_ID
        landData.address_id = raw_data.ESTABLISHMENT_DATA.LAND.ADDRESS_ID
        landData.title = raw_data.ESTABLISHMENT_DATA.LAND.LAND_TITLE
        landData.name = raw_data.ESTABLISHMENT_DATA.LAND.LAND_NAME
        landData.surname = raw_data.ESTABLISHMENT_DATA.LAND.LAND_SURNAME
        if (raw_data.ESTABLISHMENT_DATA.LAND.LAND_BIRTHDA === null) {
            landData.birthday = ''
        }
        else if (raw_data.ESTABLISHMENT_DATA.LAND.LAND_BIRTHDAY === '0000-00-00') {
            landData.birthday = '-'
        }
        else {
            landData.birthday = raw_data.ESTABLISHMENT_DATA.LAND.LAND_BIRTHDAY
        }
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
        referenceData.id = raw_data.REFERENCE_DATA.REFERENCE_ID
        referenceData.title = raw_data.REFERENCE_DATA.REFERENCE_TITLE
        referenceData.name = raw_data.REFERENCE_DATA.REFERENCE_NAME
        referenceData.surname = raw_data.REFERENCE_DATA.REFERENCE_SURNAME
        referenceData.status = raw_data.REFERENCE_DATA.REFERENCE_STATUS
        referenceData.phone = raw_data.REFERENCE_DATA.REFERENCE_PHONE
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
    operatorData.birthday = raw_data.PERSONAL_BIRTHDAY === null || raw_data.PERSONAL_BIRTHDAY === undefined ? '-' : raw_data.PERSONAL_BIRTHDAY
    operatorData.personal_id = raw_data.PERSONAL_PERSONAL_ID
    operatorData.card_issued = raw_data.PERSONAL_CARD_ISSUED === '0000-00-00' || raw_data.PERSONAL_CARD_ISSUED === undefined ? '-' : raw_data.PERSONAL_CARD_ISSUED
    operatorData.card_expipe = raw_data.PERSONAL_CARD_EXPIRE === undefined || raw_data.PERSONAL_CARD_EXPIRE === null ? '-' : raw_data.PERSONAL_CARD_EXPIRE
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
    let pt_check = `${document.getElementById('phone').value}/${document.getElementById('phone_more').value}`
    operatorData.is_personal_changed = false
    operatorAddressData.is_address_changed = false
    requestData.staff_id_alderman = userAlderman
    if (operatorData.nationality != document.getElementById('nationality').value.trim()
        || operatorData.race != document.getElementById('race').value.trim() ||
        operatorData.phone != pt_check ||
        operatorData.fax != document.getElementById('fax').value.trim()) {

        operatorData.is_personal_changed = true
        operatorData.nationality = document.getElementById('nationality').value
        operatorData.race = document.getElementById('race').value
        operatorData.phone = pt_check
        operatorData.fax = document.getElementById('fax').value
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

        operatorAddressData.district_name = district[districtValue - 1] === undefined ? '' : district[districtValue - 1].DISTRICT_NAME;
        console.log(operatorAddressData.district_name)
        operatorAddressData.amphur_name = amphur[amphurValue - 1].AMPHUR_NAME;
        operatorAddressData.province_name = province[provinceValue - 1].PROVINCE_NAME;
    }
    if (requestData.no === '') {
        requestData.no = ''
        requestData.year = parseInt(new Date().toISOString().slice(0, 4)) + 543
        requestData.personal_id_owner = operatorData.id
        //create Database
        requestData.request_type_id = getRequestTypeId(document.getElementById('typeReq').value.trim())


        // -- - - 
        requestData.reference_id = document.getElementById('reference_name').value.trim().length != 0 ? 'YES' : 'NO'
        if (requestData.reference_id === 'YES') {
            referenceData.title = document.getElementById('reference_title').value.trim()
            referenceData.name = document.getElementById('reference_name').value.trim()
            referenceData.surname = document.getElementById('reference_surname').value.trim()
            referenceData.status = document.getElementById('reference_status').value.trim()
            referenceData.phone = `${document.getElementById('reference_phone').value.trim()}/${document.getElementById('reference_phone_more').value.trim()}`
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
            requestData.product_type = document.getElementById('typeWorkplace').value.trim()
            // establishmentData.type = document.getElementById('typeWorkplace').value.trim()
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
        let wPhone_t = `${document.getElementById('wPhone').value.trim()}/${document.getElementById('wPhone_more').value.trim()}`
        establishmentData.phone = wPhone_t
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

        addressEstablishmentData.district_name = district[districtValue - 1] === undefined ? '' : district[districtValue - 1].DISTRICT_NAME;
        addressEstablishmentData.amphur_name = amphur[amphurValue - 1].AMPHUR_NAME;
        addressEstablishmentData.province_name = province[provinceValue - 1].PROVINCE_NAME;

        if (document.getElementById('ownPrefix') != undefined) {
            landData.title = document.getElementById('ownPrefix').value.trim()
            landData.name = document.getElementById('ownName').value.trim()
            landData.surname = document.getElementById('ownSurname').value.trim()
            landData.birthday = document.getElementById('datepicker9').value.trim()
            let ownPhone_more = `${document.getElementById('ownPhone').value.trim()}/${document.getElementById('ownPhone_more').value.trim()}`
            landData.phone = ownPhone_more
            addressOwnerLandData.home_number = document.getElementById('ownHomeId').value.trim()
            addressOwnerLandData.moo = document.getElementById('ownMoo').value.trim()
            addressOwnerLandData.trxk = document.getElementById('ownTrxk').value.trim()
            addressOwnerLandData.sxy = document.getElementById('ownSxy').value.trim()
            addressOwnerLandData.road = document.getElementById('ownRoad').value.trim()

            let provinceValue = parseInt(document.getElementById(`ownerProvince`).value);
            let amphurValue = parseInt(document.getElementById(`ownerDistrict`).value);
            let districtValue = parseInt(document.getElementById(`ownerSubdistrict`).value);

            addressOwnerLandData.district_name = district[districtValue - 1] === undefined ? '' : district[districtValue - 1].DISTRICT_NAME;
            addressOwnerLandData.amphur_name = amphur[amphurValue - 1].AMPHUR_NAME;
            addressOwnerLandData.province_name = province[provinceValue - 1].PROVINCE_NAME;
        }


    } else {
        requestData.is_request_changed = false
        requestData.image_is_changed = false
        establishmentData.is_establishment_changed = false
        establishmentData.is_land_owned = false
        landData.is_land_changed = false
        landData.file_upload_changed = false
        referenceData.is_reference_changed = false
        trianData.is_trian_changed = false
        operatorAddressData.is_address_changed = false
        operatorData.is_personal_changed = false
        assistantOperatorData.is_assistant_changed = false
        addressOwnerLandData.is_address_owner_changed = false
        operatorData.is_personal_changed = false
        operatorAddressData.is_address_changed = false
        let requestData_change = dataChange('requestData')
        let establishmentData_change = dataChange('establishmentData')
        let addressEstablishmentData_change = dataChange('addressEstablishmentData')
        let trianData_change = dataChange('trianData')
        let referenceData_change = dataChange('referenceData')
        let landData_change = dataChange('landData')
        let addressOwnerLandData_change = dataChange('addressOwnerLandData')

        operatorData.is_personal_changed = true
        operatorAddressData.is_address_changed = true

        if (requestData_change) {
            setDataUpdate('requestData')
            requestData.is_request_changed = true
            if (requestData.status === 'approval') {
                requestData.status_before = 'approval'
                requestData.status = 'active'
            }

        }
        if (establishmentData_change) {
            console.log(establishmentData_change)
            setDataUpdate('establishmentData')
            establishmentData.is_establishment_changed = true
        }
        if (addressEstablishmentData_change) {
            setDataUpdate('addressEstablishmentData')
            addressEstablishmentData.is_address_establishment_changed = true
        }
        if (trianData_change) {
            setDataUpdate('trianData')
            trianData.is_trian_changed = true
        }
        if (referenceData_change) {
            setDataUpdate('referenceData')
            referenceData.is_reference_changed = true
        }
        if (landData_change) {
            setDataUpdate('landData')
            landData.is_land_changed = true
            landData.file_upload_changed = file_is_uploaded
        }
        if (addressOwnerLandData_change) {
            setDataUpdate('addressOwnerLandData')
            addressOwnerLandData.is_address_owner_changed = true
        }
        if (document.getElementById('useOtherPlace') != undefined) {
            if ((requestData.establishment_id === '' && document.getElementById('useOtherPlace').checked != false) ||
                requestData.establishment_id != '' && document.getElementById('useOtherPlace').checked != true) {
                requestData.is_request_changed = true
                establishmentData.is_establishment_changed = true
                setDataUpdate('requestData')
                setDataUpdate('establishmentData')
            }
        }
        // reset Utilities.js
        file_is_uploaded = false
        image_changed = false
        //requestControl
        personal_change = false
    }
}
function dataChange(type) {
    let status_data_change = false
    if (type === 'requestData') {

        let referecne_id_t = document.getElementById('reference_name').value.trim().length != 0 ? 'YES' : 'NO'
        let assistant_t = assistantOperatorData.id != '' ? assistantOperatorData.id : ''
        let doc_no_1_t = document.getElementById('documentId').checked === true ? 'Y' : 'N'
        let doc_no_2_t = document.getElementById('documenthHome').checked === true ? 'Y' : 'N'
        let doc_no_3_t = document.getElementById('documentLegalEntity').checked === true ? 'Y' : 'N'
        let doc_no_4_t = document.getElementById('documentSignature').checked === true ? 'Y' : 'N'
        let doc_no_5_t = document.getElementById('documentSJ4').checked === true ? 'Y' : 'N'
        let doc_no_6_t = document.getElementById('documentOther').checked === true ? document.getElementById('other').value : 'N'
        let train_id_t = 'NO'
        if (document.getElementById('foodTrain') != undefined) {
            train_id_t = document.getElementById('foodTrain').checked === true ? 'YES' : 'NO'
        }
        let sell_allow_t = 'N'
        if (document.getElementById('useSpirits') != undefined) {
            sell_allow_t = document.getElementById('useSpirits').checked === true ? 'Y' : 'N'
        }

        console.log(`1check image = ${requestData.image_is_changed}`)
        console.log(`2check image = ${image_changed}`)
        if (requestData.image_is_changed != image_changed ||
            requestData.request_type_id != getRequestTypeId(document.getElementById('typeReq').value.trim()) ||
            requestData.reference_id != referecne_id_t ||
            requestData.total_image != totalFiles.length ||
            requestData.personal_id_assistant != assistant_t ||
            requestData.date_submission != document.getElementById('datepicker1').value ||
            requestData.doc_no1 != doc_no_1_t ||
            requestData.doc_no2 != doc_no_2_t ||
            requestData.doc_no3 != doc_no_3_t ||
            requestData.doc_no4 != doc_no_4_t ||
            requestData.doc_no5 != doc_no_5_t ||
            requestData.doc_no6 != doc_no_6_t ||
            personal_change != false ||
            requestData.staff_id_alderman != userAlderman ||
            requestData.staff_id_money != userMoney
        ) {
            status_data_change = true
        } else {
            if (document.getElementById('foodTrain') != undefined) {
                if (requestData.train_id != train_id_t) {
                    status_data_change = true
                }
            }
            if (document.getElementById('typeWorkplace') != undefined) {
                establishmentData.type = document.getElementById('typeWorkplace').value.trim()
            } else {
                establishmentData.type = ''
            }

            if (document.getElementById('typeReForm') != undefined) {
                if (requestData.subcategory != document.getElementById('typeReForm').value ||
                    requestData.product_type != document.getElementById('typeProduct').value.trim() ||
                    requestData.sell_start != document.getElementById('timeStart').value ||
                    requestData.sell_end != document.getElementById('timeEnd').value) {
                    status_data_change = true
                }
            }
            if (document.getElementById('typeWorkplace') != undefined) {
                if (requestData.product_type != document.getElementById('typeWorkplace').value.trim()) {
                    status_data_change = true
                    console.log(`sdsda2`)
                }
            }
            if (document.getElementById('useSpirits') != undefined) {
                if (requestData.sell_allow != sell_allow_t) {
                    status_data_change = true
                }
            } if (document.getElementById('con_no1') != undefined) {
                if (requestData.condition_no_1 != document.getElementById('con_no1').value.trim() ||
                    requestData.condition_no_2 != document.getElementById('con_no2').value.trim() ||
                    requestData.condition_no_3 != document.getElementById('con_no3').value.trim() ||
                    requestData.condition_no_4 != document.getElementById('con_no4').value.trim()) {
                    status_data_change = true
                }
            }
            if (document.getElementById('foodBy') != undefined) {
                if (trianData.issuse != document.getElementById('foodBy').value.trim() ||
                    trianData.date_exp != document.getElementById('datepicker5').value ||
                    trianData.date_issued != document.getElementById('datepicker6').value) {
                    status_data_change = true
                }
            }
            if (referenceData.title != document.getElementById('reference_title').value.trim() ||
                referenceData.name != document.getElementById('reference_name').value.trim() ||
                referenceData.surname != document.getElementById('reference_surname').value.trim() ||
                referenceData.status != document.getElementById('reference_status').value.trim() ||
                referenceData.phone != document.getElementById('reference_phone').value) {
                status_data_change = true
            }
            if (document.getElementById('bFeeY2') != undefined) {
                let date_y_2 = document.getElementById('datepicker10').value.trim()
                let fee_y_2 = document.getElementById('bFeeY2').value === '' ? 0 : document.getElementById('bFeeY2').value
                let fine_y_2 = document.getElementById('bFineY2').value === '' ? 0 : document.getElementById('bFineY2').value
                let date_y_3 = document.getElementById('datepicker11').value.trim()
                let fee_y_3 = document.getElementById('bFeeY3').value === '' ? 0 : document.getElementById('bFeeY3').value
                let fine_y_3 = document.getElementById('bFineY3').value === '' ? 0 : document.getElementById('bFineY3').value
                if (requestData.receipt_fine_year_2 == fee_y_2 ||
                    requestData.receipt_fee_year_2 == fine_y_2 ||
                    requestData.receipt_date_year_2 === date_y_2 ||
                    requestData.receipt_fine_year_3 == fine_y_3 ||
                    requestData.receipt_fee_year_3 == fee_y_3 ||
                    requestData.receipt_date_year_3 === date_y_3) {
                    status_data_change = true
                }
            }
            let date_y_1 = document.getElementById('datepicker2').value.trim()
            let fee_y_1 = document.getElementById('bFee').value === 0 ? 0 : document.getElementById('bFee').value
            let fine_y_1 = document.getElementById('bFine').value === 0 ? 0 : document.getElementById('bFine').value

            if (requestData.receipt_fine == fine_y_1 ||
                requestData.receipt_fee == fee_y_1 ||
                requestData.receipt_date === date_y_1) {
                status_data_change = true
            }

        }
    }
    if (type === 'establishmentData') {
        if (establishmentData.perosonal_id != operatorData.id ||
            establishmentData.name != document.getElementById('workplaceName').value.trim() ||
            establishmentData.phone != `${document.getElementById('wPhone').value.trim()}/${document.getElementById('wPhone_more').value.trim()}` ||
            establishmentData.fax != document.getElementById('wFax').value.trim()) {
            console.log(`1`)
            status_data_change = true
        } else {
            // if (document.getElementById('typeWorkplace') != undefined) {
            //     if (establishmentData.type != document.getElementById('typeWorkplace').value.trim()) {
            //         status_data_change = true
            //         console.log(`2`)
            //     }
            // }
            if (document.getElementById('machinery') != undefined) {
                if (establishmentData.machine_size != document.getElementById('machinery').value.trim()) {
                    status_data_change = true
                    console.log(`3`)
                }
            }
            if (document.getElementById('area') != undefined) {
                if (establishmentData.area_size != document.getElementById('area').value) {
                    status_data_change = true
                    console.log(`4 establishmentData.area_size ${establishmentData.area_size} != document.getElementById('area').value ${document.getElementById('area').value}`)
                }
            }
            if (document.getElementById('numPeople') != undefined) {
                if (establishmentData.worker != document.getElementById('numPeople').value) {
                    status_data_change = true
                    console.log(`5 establishmentData.worker ${establishmentData.worker} and document.getElementById('numPeople').value ${document.getElementById('numPeople').value}`)
                }
            }
            if (document.getElementById('wLocation') != undefined) {
                if (establishmentData.grond != document.getElementById('wLocation').value) {
                    status_data_change = true
                    console.log(`6 establishmentData.grond ${establishmentData.grond} and document.getElementById('wLocation').value ${document.getElementById('wLocation').value}`)
                }
            }
            if (document.getElementById('useOtherPlace') != undefined) {
                console.log(establishmentData)
                console.log(establishmentData.is_land_owned)
                let establishment_is_land_owned_t = document.getElementById('useOtherPlace').checked === true ? true : false
                console.log(establishmentData.is_land_owned)
                console.log(establishment_is_land_owned_t)
                console.log(establishmentData.is_land_owned != establishment_is_land_owned_t)
                if (establishmentData.is_land_owned != establishment_is_land_owned_t) {
                    status_data_change = true
                    console.log(`7 establishmentData.is_land_owned ${establishmentData.is_land_owned} === establishment_is_land_owned_t ${establishment_is_land_owned_t}`)
                }
            }
        }
    }
    if (type === 'addressEstablishmentData') {
        let provinceValue = parseInt(document.getElementById(`wProvince`).value);
        let amphurValue = parseInt(document.getElementById(`wDistrict`).value);
        let districtValue = parseInt(document.getElementById(`wSubdistrict`).value);
        let district_name_t = district[districtValue - 1] === undefined ? '' : district[districtValue - 1].DISTRICT_NAME;
        let amphur_name_t = amphur[amphurValue - 1].AMPHUR_NAME;
        let province_name_t = province[provinceValue - 1].PROVINCE_NAME;

        if (addressEstablishmentData.home_number != document.getElementById('wPlaceId').value.trim() ||
            addressEstablishmentData.moo != document.getElementById('wMoo').value.trim() ||
            addressEstablishmentData.trxk != document.getElementById('wTrxk').value.trim() ||
            addressEstablishmentData.sxy != document.getElementById('wSxy').value.trim() ||
            addressEstablishmentData.building != document.getElementById('wBuilding').value.trim() ||
            addressEstablishmentData.road != document.getElementById('wRoad').value.trim() ||
            addressEstablishmentData.district_name != district_name_t ||
            addressEstablishmentData.amphur_name != amphur_name_t ||
            addressEstablishmentData.province_name != province_name_t) {
            status_data_change = true
        }
    }
    if (type === 'trianData') {
        if (document.getElementById('foodBy') != undefined) {
            if (trianData.issuse != document.getElementById('foodBy').value.trim() ||
                trianData.date_exp != document.getElementById('datepicker5').value ||
                trianData.date_issued != document.getElementById('datepicker6').value) {
                status_data_change = true
            }
        }
    }
    if (type === 'referenceData') {
        if (referenceData.title != document.getElementById('reference_title').value.trim() ||
            referenceData.name != document.getElementById('reference_name').value.trim() ||
            referenceData.surname != document.getElementById('reference_surname').value.trim() ||
            referenceData.status != document.getElementById('reference_status').value.trim() ||
            referenceData.phone != `${document.getElementById('reference_phone').value}/${document.getElementById('reference_phone_more').value}`) {
            status_data_change = true
        }
    }
    if (type === 'landData') {
        if (document.getElementById('useOtherPlace') != undefined) {
            if (document.getElementById('useOtherPlace').checked === true) {
                if (landData.title != document.getElementById('ownPrefix').value.trim() ||
                    landData.name != document.getElementById('ownName').value.trim() ||
                    landData.surname != document.getElementById('ownSurname').value.trim() ||
                    landData.birthday != document.getElementById('datepicker9').value.trim() ||
                    landData.phone != `${document.getElementById('ownPhone').value.trim()}/${document.getElementById('ownPhone_more').value.trim()}` ||
                    landData.file_upload_changed != file_is_uploaded
                ) {
                    status_data_change = true
                }
            }
        }
    }
    if (type === 'addressOwnerLandData') {
        if (document.getElementById('useOtherPlace') != undefined) {
            if (document.getElementById('useOtherPlace').checked === true) {
                let provinceValue = parseInt(document.getElementById(`ownerProvince`).value);
                let amphurValue = parseInt(document.getElementById(`ownerDistrict`).value);
                let districtValue = parseInt(document.getElementById(`ownerSubdistrict`).value);

                let provinceValue_name_t = province[provinceValue - 1].PROVINCE_NAME
                let amphurValue_name_t = amphur[amphurValue - 1].AMPHUR_NAME;
                let districtValue_name_t = district[districtValue - 1] === undefined ? '' : district[districtValue - 1].DISTRICT_NAME;

                if (addressOwnerLandData.home_number != document.getElementById('ownHomeId').value.trim() ||
                    addressOwnerLandData.moo != document.getElementById('ownMoo').value.trim() ||
                    addressOwnerLandData.trxk != document.getElementById('ownTrxk').value.trim() ||
                    addressOwnerLandData.sxy != document.getElementById('ownSxy').value.trim() ||
                    addressOwnerLandData.road != document.getElementById('ownRoad').value.trim() ||
                    addressOwnerLandData.district_name != districtValue_name_t ||
                    addressOwnerLandData.amphur_name != amphurValue_name_t ||
                    addressOwnerLandData.province_name != provinceValue_name_t) {
                    status_data_change = true
                }
            }
        }
    }
    return status_data_change
}
function setDataUpdate(type) {

    if (type === 'requestData') {
        requestData.personal_id_owner = operatorData.id
        requestData.request_type_id = getRequestTypeId(document.getElementById('typeReq').value.trim())
        requestData.reference_id = document.getElementById('reference_name').value.trim().length != 0 ? 'YES' : 'NO'

        if (document.getElementById('foodTrain') != undefined) {
            requestData.train_id = document.getElementById('foodTrain').checked === true ? 'YES' : 'NO'
        }
        requestData.personal_id_assistant = assistantOperatorData.id != '' ? assistantOperatorData.id : ''
        requestData.image_is_changed = image_changed //ตัวแปรอยู่ใน utilities.js
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
        if (document.getElementById('typeWorkplace') != undefined) {
            requestData.product_type = document.getElementById('typeWorkplace').value.trim()
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
        requestData.staff_id_alderman = userAlderman
        requestData.total_image = totalFiles.length
    }
    if (type === 'establishmentData') {
        establishmentData.perosonal_id = operatorData.id
        if (document.getElementById('useOtherPlace') != undefined) {
            establishmentData.is_land_owned = document.getElementById('useOtherPlace').checked === true ? 'YES' : 'NO'
        } else {
            establishmentData.is_land_owned = 'NO'
        }
        if (document.getElementById('typeWorkplace') != undefined) {
            requestData.product_type = document.getElementById('typeWorkplace').value.trim()
            // establishmentData.type = document.getElementById('typeWorkplace').value.trim()
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
        establishmentData.phone = `${document.getElementById('wPhone').value.trim()}/${document.getElementById('wPhone_more').value.trim()}`
        establishmentData.fax = document.getElementById('wFax').value.trim()

        if (document.getElementById('wLocation') != undefined) {
            establishmentData.grond = document.getElementById('wLocation').value.trim()
        }
    }
    if (type === 'addressEstablishmentData') {
        addressEstablishmentData.home_number = document.getElementById('wPlaceId').value.trim()
        addressEstablishmentData.moo = document.getElementById('wMoo').value.trim()
        addressEstablishmentData.trxk = document.getElementById('wTrxk').value.trim()
        addressEstablishmentData.sxy = document.getElementById('wSxy').value.trim()
        addressEstablishmentData.building = document.getElementById('wBuilding').value.trim()
        addressEstablishmentData.road = document.getElementById('wRoad').value.trim()

        let provinceValue = parseInt(document.getElementById(`wProvince`).value);
        let amphurValue = parseInt(document.getElementById(`wDistrict`).value);
        let districtValue = parseInt(document.getElementById(`wSubdistrict`).value);
        console.log(`dis no = ` + districtValue)
        addressEstablishmentData.district_name = district[districtValue - 1] === undefined ? '' : district[districtValue - 1].DISTRICT_NAME;
        addressEstablishmentData.amphur_name = amphur[amphurValue - 1].AMPHUR_NAME;
        addressEstablishmentData.province_name = province[provinceValue - 1].PROVINCE_NAME;
    }
    if (type === 'trianData') {
        if (document.getElementById('foodTrain') != undefined) {
            if (requestData.train_id === 'YES') {
                trianData.issuse = document.getElementById('foodBy').value.trim()
                trianData.date_exp = document.getElementById('datepicker5').value
                trianData.date_issued = document.getElementById('datepicker6').value
            }
        }
    }
    if (type === 'referenceData') {
        if (requestData.reference_id === 'YES') {
            referenceData.title = document.getElementById('reference_title').value.trim()
            referenceData.name = document.getElementById('reference_name').value.trim()
            referenceData.surname = document.getElementById('reference_surname').value.trim()
            referenceData.status = document.getElementById('reference_status').value.trim()
            referenceData.phone = `${document.getElementById('reference_phone').value}/${document.getElementById('reference_phone_more').value}`
        }
    }
    if (type === 'landData') {
        if (document.getElementById('ownPrefix') != undefined) {
            landData.title = document.getElementById('ownPrefix').value.trim()
            landData.name = document.getElementById('ownName').value.trim()
            landData.surname = document.getElementById('ownSurname').value.trim()
            landData.birthday = document.getElementById('datepicker9').value.trim()
            landData.phone = `${document.getElementById('ownPhone').value.trim()}/${document.getElementById('ownPhone_more').value.trim()}`
        }
    }
    if (type === 'addressOwnerLandData') {
        if (document.getElementById('ownPrefix') != undefined) {
            addressOwnerLandData.home_number = document.getElementById('ownHomeId').value.trim()
            addressOwnerLandData.moo = document.getElementById('ownMoo').value.trim()
            addressOwnerLandData.trxk = document.getElementById('ownTrxk').value.trim()
            addressOwnerLandData.sxy = document.getElementById('ownSxy').value.trim()
            addressOwnerLandData.road = document.getElementById('ownRoad').value.trim()

            let provinceValue = parseInt(document.getElementById(`ownerProvince`).value);
            let amphurValue = parseInt(document.getElementById(`ownerDistrict`).value);
            let districtValue = parseInt(document.getElementById(`ownerSubdistrict`).value);

            addressOwnerLandData.district_name = district[districtValue - 1] === undefined ? '' : district[districtValue - 1].DISTRICT_NAME;
            addressOwnerLandData.amphur_name = amphur[amphurValue - 1].AMPHUR_NAME;
            addressOwnerLandData.province_name = province[provinceValue - 1].PROVINCE_NAME;
        }
    }
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
    arrayItem.push(referenceData) // reference 7
    arrayItem.push(trianData) // train 8
    let object = {
        name: '',
        type: '',
        data: ''
    }
    let imageData = []
    console.log(totalFiles)
    if (requestData.image_is_changed) {
        console.log(`imageData`)
        for (let i = 0; i < totalFiles.length; i++) {
            console.log(i)
            if (totalFiles[i].E_IMAGE_TYPE != undefined) {
                object.type = totalFiles[i].E_IMAGE_TYPE
            }
            imageData.push(object)
            object = {
                name: '',
                type: '',
                data: ''
            }
        }
    }
    arrayItem.push(imageData) // image 9
    console.log(imageData)
    return arrayItem
}
function insertRequest() {
    createGroupData()
    let item = createArrayInsert()
    console.log(item)
    return new Promise((resolve, reject) => {
        console.log("insertToDatabase");
        var formData = new FormData();
        if (landData.file_upload_changed) {
            formData.append('files', filesPdf);
        }
        if (requestData.no === '') {
            formData.append('files', filesPdf);
        }

        if (requestData.image_is_changed) {
            for (var i = 0; i < totalFiles.length; i++) {
                if (totalFiles[i].E_IMAGE_DATA === undefined) {
                    let image = totalFiles[i];
                    formData.append('files' + i, image);
                } else {
                    formData.append("files" + i, base64toBlob(totalFiles[i].E_IMAGE_DATA_BASE64, `image/${totalFiles[i].E_IMAGE_TYPE}`));
                }
            }
        }
        formData.append("gropData", JSON.stringify(item));
        filesPdf = null
        // totalFiles = []
        selectImageFile = 0
        axios.post("http://localhost:5000/insert/request", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(data => {
                console.log(data.data)
                return resolve(data.data);
            });
        // return resolve(true);

    });
}
function getRequestData(no, year) {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/get/request/${no}/${year}`).then((result) => {

            return resolve(result.data);
        })
    })
}
function getPersonalDataAndEstablishment(p_id, e_id) {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/get/request/profile/${p_id}/${e_id}`).then((result) => {
            return resolve(result.data);
        })
    })
}
function getPresident() {
    alderman_list = []
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/get/user/president`).then((result) => {
            for (let i = 0; i < result.data.length; i++) {
                alderman_list.push(result.data[i])
            }
            return resolve(result.data);
        })
    })
}

function setLisetUserAlderManToUi(list_user) {
    console.log(list_user)
    if (list_user.length != 0) {
        userAlderman = list_user[0].USER_ID
        requestData.staff_id_alderman = list_user[0].USER_ID
        if (list_user[0].USER_POSITION === null) {
            document.getElementById('position').value = 'นายกเทศมนตรี'
        } else {
            document.getElementById('position').value = list_user[0].USER_POSITION
        }

        for (let i = 0; i < list_user.length; i++) {
            temp_alderman_list.push(list_user[i])
            var select = document.getElementById("documentName3");
            var option = document.createElement("option");
            let item = list_user[i]
            option.text = `${item.USER_TITLE} ${item.USER_NAME} ${item.USER_SURNAME}`
            option.value = list_user[i].USER_ID;
            select.onchange = function () { changePositionAlderman(this.value) };
            select.add(option);
        }
    }
}

function getPositionAlderman(userId) {
    for (let i = 0; i < temp_alderman_list.length; i++) {
        if (temp_alderman_list[i].USER_ID === userId) {
            return temp_alderman_list[i].USER_POSITION
        }
    }
}
function changePositionAlderman(userId) {
    userAlderman = userId
    let item = getPositionAlderman(userId)
    if (item === null) {
        document.getElementById('position').value = 'นายกเทศมนตรี'
    } else {
        document.getElementById('position').value = item
    }
}
function displayUserAlderman() {
    getPresident().then((list_user) => {
        setLisetUserAlderManToUi(list_user)
    })
}
//get staff money 
function getUserMoney(id) {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/get/user/id/${id}`).then((result) => {
            size_money_list = result.data.length
            return resolve(result.data);
        })
    })
}
function setLisetUserMoneyToUi(list_user) {
    console.log(list_user)
    if (list_user.length != 0) {
        for (let i = 0; i < list_user.length; i++) {
            var select = document.getElementById("documentName2");
            var option = document.createElement("option");
            let item = list_user[i]
            option.text = `${item.USER_TITLE} ${item.USER_NAME} ${item.USER_SURNAME}`
            option.value = list_user[i].USER_ID;

            select.onchange = function () { userMoney = this.value };
            select.add(option);

        }
    }
}
function displayUserMoney(id) {
    getUserMoney(id).then((list_user) => {
        setLisetUserMoneyToUi(list_user)
    })
}
//get request type 
function getRequestType(type) {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/get/requestType/${type}`).then((result) => {
            for (let i = 0; i < result.data.length; i++) {
                requestType.push(result.data[i])
            }
            resolve(result.data);
        })
    })
}
function getImageRequestByImageName(image_name) {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/get/image/request/${image_name}`).then((result) => {
            resolve(result.data);
        })
    })
}
function setRequsetType(type) {
    runForm().then((data) => {
        document.getElementById('documentName3').disabled = false
        getRequestType(type).then((data_test) => {
            addRequestTypeToDatalist()
        })
        checkView(type)
        displayUserAlderman()
    })
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
    console.log(image)
    totalFiles = []
    for (let i = 0; i < image.length; i++) {
        console.log(`image i = ${i}`)
        totalFiles.push(image[i])
        selectImageFile = selectImageFile + 1
        console.log(image[i])
        var span = document.createElement('span');
        span.innerHTML =
            [
                `<div class="col" style="width: 25%; height: 100%; ">
    <img 
    width=100% 
    height=85% 
    src="`
                , `data:image/${image[i].E_IMAGE_TYPE};base64,${image[i].E_IMAGE_DATA_BASE64}`,
                '" title="', escape(image[i].E_IMAGE_NAME), '"/>'
                , "<br><button type='button' class='delete image'" +
                "onclick='deleteImage()' >ลบรูปภาพนี้</button>", "</div>"
            ].join('');

        document.getElementById('outputImage').insertBefore(span, null);
    }
    console.log(totalFiles)
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

//base64Toblob
function base64toBlob(base64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 1024;
    var byteCharacters = atob(base64Data);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        var begin = sliceIndex * sliceSize;
        var end = Math.min(begin + sliceSize, bytesLength);

        var bytes = new Array(end - begin);
        for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
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