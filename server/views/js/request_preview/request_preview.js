const month = [
    'มกราคม',
    'กุมภาพันธ์',
    'มีนาคม',
    'เมษายน',
    'พฤษภาคม',
    'มิถุนายน',
    'กรกฎาคม',
    'สิงหาคม',
    'กันยายน',
    'ตุลาคม',
    'พฤศจิกายน',
    'ธันวาคม'
]
function getRequestData(no, year) {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/get/view/allow/${no}/${year}`).then((result) => {
            return resolve(result.data);
        })
    })
}
function getImagePersonal(p_id) {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/get/image/${p_id}/`).then((result) => {
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
function getDataView() {
    let requestId = getUrlVars()
    console.log(requestId)
    if (requestId.id_no != undefined && requestId.id_year != undefined) {
        getRequestData(requestId.id_no, requestId.id_year).then((data) => {
            if (data.length != 0) {
                setSN(requestId.id_no.slice(0, 1))
                if (data[0].STAFF_ID_ALDERMAN != null) {
                    getImageNayo(data[0].STAFF_ID_ALDERMAN).then((data_image) => {
                        console.log(data_image)
                        createImagetoUI(data_image)
                        if (requestId.id_no.slice(0, 1) === 'A' || requestId.id_no.slice(0, 1) === 'B') {
                            getImagePersonal(data[0].P_ID).then((data_imge_owner) => {
                                createImageABToUI(data_imge_owner, 'OWNER')
                                if (data[0].PA_ID != null) {
                                    getImagePersonal(data[0].PA_ID).then((data_imge_owner_A) => {
                                        createImageABToUI(data_imge_owner_A, 'A')
                                        searchPersonalById(data[0].PA_ID).then((data_aa) => {
                                            setNameAA(data_aa)
                                            checkViewSight(requestId.id_no.slice(0, 1), data[0])
                                        })
                                    })
                                } else {
                                    checkViewSight(requestId.id_no.slice(0, 1), data[0])
                                }
                            })
                        } else {
                            checkViewSight(requestId.id_no.slice(0, 1), data[0])
                        }
                    })
                }
            }
        })
    }
}
function createImagetoUI(image) {
    if (image.length != 0) {
        document.getElementById('s_nayo').src = `data:image/${image[0].S_IMAGE_TYPE};base64,${image[0].S_IMAGE_DATA}`
    }
}
function setNameAA(item) {
    if (item.PERSONAL_TITLE != undefined) {
        document.getElementById('nameA').innerText = `${item.PERSONAL_TITLE} ${item.PERSONAL_NAME}`
        document.getElementById('surnameA').innerText = item.PERSONAL_SURNAME
    }
}
function createImageABToUI(image, type) {
    if (type === 'OWNER') {
        if (image.length === 0) {
            document.getElementById('image_owner').src = `../../img/userProfile.png`
        } else {
            document.getElementById('image_owner').src = `data:image/${image[0].IMAGE_TYPE};base64,${image[0].IMAGE_DATA}`
        }
    } else {
        if (image.length === 0) {
            document.getElementById('image_a').src = `../../img/userProfile.png`
        } else {
            document.getElementById('image_a').src = `data:image/${image[0].IMAGE_TYPE};base64,${image[0].IMAGE_DATA}`
        }
    }
}
function displayForm() {
    console.log('dsads')
    document.getElementById('box_no_1').style.display = ''
    document.getElementById('box_no_2').style.display = 'none'
}
function checkViewSight(id, raw_data) {
    if (id === 'C' || id === 'D' || id === 'E' || id === 'F') {
        //set no 1
        setData(1, raw_data)
    } else if (id === 'H') {
        //set no 2
        setData(2, raw_data)
    } else if (id === 'G') {
        //set no 3
        setData(3, raw_data)
    } else if (id === 'I') {
        setData(5, raw_data)
    } else {
        //สาธาณะ //set no 4
        setData(4, raw_data)
    }
}
function setSN(id) {
    if (id === 'A') {
        document.getElementById('sn_no').innerText = 'แบบ สณ.๒'
    }
    if (id === 'B') {
        document.getElementById('sn_no').innerText = 'แบบ สณ.๕'
    }
    if (id === 'C') {
        document.getElementById('sn_no').innerText = 'แบบ สอ.๔'
    }
    if (id === 'D') {
        document.getElementById('sn_no').innerText = 'แบบ สอ.๕'
    }
    if (id === 'E') {
        document.getElementById('sn_no').innerText = 'แบบ สอ.๖'
    }
    if (id === 'F') {
        document.getElementById('sn_no').innerText = 'แบบ สอ.๗'
    }
    if (id === 'G') {
        document.getElementById('sn_no').innerText = 'แบบ ตล.๓'
    }
    if (id === 'H') {
        document.getElementById('sn_no').innerText = 'แบบ อภ.๒'
    }
}
function setData(type, raw_data) {
    if (type === 1) {
        if (document.getElementById('t_topic') != undefined) {
            document.getElementById('t_topic').innerText = checkNull(raw_data.REQUEST_MENU)
        }
        document.getElementById('number').innerText = `${raw_data.REQUEST_NO}/${raw_data.REQUEST_YEAR}`
        if (raw_data.PERSONAL_TYPE === 'บุคคลธรรมดา') {
            document.getElementById('typeName1').checked = true
        } else {
            document.getElementById('typeName2').checked = true
        }
        document.getElementById('name').innerText = getFullName(raw_data)
        document.getElementById('age').innerText = checkNull(raw_data.PERSONAL_AGE)
        document.getElementById('nationality').innerText = checkNull(raw_data.PERSONAL_NATIONALITY)
        document.getElementById('nameId').innerText = checkNull(raw_data.PERSONAL_PERSONAL_ID)
        document.getElementById('homeId').innerText = checkNull(raw_data.PERSONAL_ADDRESS_HOME_NUMBER)
        document.getElementById('trxk').innerText = checkNull(raw_data.PERSONAL_ADDRESS_TRXK)
        document.getElementById('sxy').innerText = checkNull(raw_data.PERSONAL_ADDRESS_SXY)
        document.getElementById('road').innerText = checkNull(raw_data.PERSONAL_ADDRESS_ROAD)

        document.getElementById('moo').innerText = checkNull(raw_data.PERSONAL_ADDRESS_MOO)
        document.getElementById('subdistrict').innerText = checkNull(raw_data.PERSONAL_DISTRICT_NAME)
        document.getElementById('district').innerText = checkNull(raw_data.PERSONAL_AMPHUR_NAME)
        document.getElementById('province').innerText = checkNull(raw_data.PERSONAL_ROVINCE_NAME)
        document.getElementById('phone').innerText = displayPhone(raw_data.PERSONAL_PHONE)
        // document.getElementById('fax').innerText = displayFax(raw_data.PERSONAL_FAX)
        document.getElementById('category').innerText = checkNull(raw_data.REQUEST_PRODUCT_TYPE)
        document.getElementById('nameShop').innerText = checkNull(raw_data.ESTABLISHMENT_NAME)
        let text_cut = raw_data.REQUEST_TYPE_NAME
        let s1_text_cut = text_cut.split('สถานที่สะสมอาหาร')
        let s2_text_cut = text_cut.split('สถานที่จำหน่ายอาหาร')
        if (s1_text_cut.length != 1) {
            document.getElementById('area').innerText = s1_text_cut[1]
        }
        if (s2_text_cut.length != 1) {
            document.getElementById('area').innerText = s2_text_cut[1]
        }


        document.getElementById('homeIdS').innerText = checkNull(raw_data.E_ADDRESS_HOME_NUMBER)

        document.getElementById('trxkS').innerText = checkNull(raw_data.E_ADDRESS_TRXK)
        document.getElementById('roadS').innerText = checkNull(raw_data.E_ADDRESS_ROAD)
        document.getElementById('mooS').innerText = checkNull(raw_data.E_ADDRESS_MOO)
        document.getElementById('phoneS').innerText = displayPhone(raw_data.ESTABLISHMENT_PHONE)
        document.getElementById('fee').innerText = checkNull(raw_data.R_FEE)
        document.getElementById('note42').innerText = checkNullCondition(raw_data.R_C_1)
        document.getElementById('note43').innerText = checkNullCondition(raw_data.R_C_2)
        document.getElementById('note44').innerText = checkNullCondition(raw_data.R_C_3)
        document.getElementById('note45').innerText = checkNullCondition(raw_data.R_C_4)
        //Start Date
        document.getElementById('day2').innerText = dateFormat(raw_data.DATE_ISSUED)[0]
        document.getElementById('month2').innerText = dateFormat(raw_data.DATE_ISSUED)[1]
        document.getElementById('year2').innerText = dateFormat(raw_data.DATE_ISSUED)[2]
        //End Date
        document.getElementById('day3').innerText = dateFormat(raw_data.DATE_EXP)[0]
        document.getElementById('month3').innerText = dateFormat(raw_data.DATE_EXP)[1]
        document.getElementById('year3').innerText = dateFormat(raw_data.DATE_EXP)[2]
    }
    if (type === 2) {
        document.getElementById('number').innerText = `${raw_data.REQUEST_NO}/${raw_data.REQUEST_YEAR}`
        if (raw_data.PERSONAL_TYPE === 'บุคคลธรรมดา') {
            document.getElementById('typeName1').checked = true
        } else {
            document.getElementById('typeName2').checked = true
        }
        document.getElementById('name').innerText = getFullName(raw_data)
        document.getElementById('age').innerText = checkNull(raw_data.PERSONAL_AGE)
        document.getElementById('nationality').innerText = checkNull(raw_data.PERSONAL_NATIONALITY)
        document.getElementById('nameId').innerText = checkNull(raw_data.PERSONAL_PERSONAL_ID)
        document.getElementById('homeId').innerText = checkNull(raw_data.PERSONAL_ADDRESS_HOME_NUMBER)
        document.getElementById('trxk').innerText = checkNull(raw_data.PERSONAL_ADDRESS_TRXK)
        document.getElementById('sxy').innerText = checkNull(raw_data.PERSONAL_ADDRESS_SXY)
        document.getElementById('road').innerText = checkNull(raw_data.PERSONAL_ADDRESS_ROAD)
        document.getElementById('moo').innerText = checkNull(raw_data.PERSONAL_ADDRESS_MOO)
        document.getElementById('subdistrict').innerText = checkNull(raw_data.PERSONAL_DISTRICT_NAME)
        document.getElementById('district').innerText = checkNull(raw_data.PERSONAL_AMPHUR_NAME)
        document.getElementById('province').innerText = checkNull(raw_data.PERSONAL_ROVINCE_NAME)
        document.getElementById('phone').innerText = displayPhone(raw_data.PERSONAL_PHONE)
        document.getElementById('fax').innerText = displayFax(raw_data.PERSONAL_FAX)
        document.getElementById('category').innerText = checkNull(raw_data.REQUEST_TYPE_NAME)
        document.getElementById('no').innerText = cutNoRequestType(raw_data.REQUEST_TYPE_NAME)
        document.getElementById('fee').innerText = checkNull(raw_data.R_FEE)
        document.getElementById('day').innerText = dateFormat(raw_data.DATE_SUM)[0]
        document.getElementById('month').innerText = dateFormat(raw_data.DATE_SUM)[1]
        document.getElementById('year').innerText = dateFormat(raw_data.DATE_SUM)[2]
        document.getElementById('nameShop').innerText = checkNull(raw_data.ESTABLISHMENT_NAME)
        document.getElementById('area').innerText = checkNull(raw_data.ESTABLISHMENT_AREA_SIZE)
        document.getElementById('power').innerText = checkNull(raw_data.ESTABLISHMENT_MACHINE_SIZE)
        document.getElementById('people').innerText = checkNull(raw_data.ESTABLISHMENT_WORKER)
        document.getElementById('homeIdS').innerText = checkNull(raw_data.E_ADDRESS_HOME_NUMBER)
        document.getElementById('trxkS').innerText = checkNull(raw_data.E_ADDRESS_TRXK)
        document.getElementById('roadS').innerText = checkNull(raw_data.E_ADDRESS_ROAD)
        document.getElementById('mooS').innerText = checkNull(raw_data.E_ADDRESS_MOO)
        document.getElementById('subdistrictS').innerText = checkNull(raw_data.E_DISTRICT_NAME)
        document.getElementById('districtS').innerText = checkNull(raw_data.E_AMPHUR_NAME)
        document.getElementById('provinceS').innerText = checkNull(raw_data.E_PROVINCE_NAME)
        document.getElementById('phoneS').innerText = displayPhone(raw_data.ESTABLISHMENT_PHONE)
        document.getElementById('faxS').innerText = displayFax(raw_data.ESTABLISHMENT_FAX)
        document.getElementById('note1').innerText = checkNullCondition(raw_data.R_C_1)
        document.getElementById('note2').innerText = checkNullCondition(raw_data.R_C_2)
        document.getElementById('note3').innerText = checkNullCondition(raw_data.R_C_3)
        document.getElementById('note4').innerText = checkNullCondition(raw_data.R_C_4)
        //Start date
        document.getElementById('day2').innerText = dateFormat(raw_data.DATE_ISSUED)[0]
        document.getElementById('month2').innerText = dateFormat(raw_data.DATE_ISSUED)[1]
        document.getElementById('year2').innerText = dateFormat(raw_data.DATE_ISSUED)[2]
        //Exp date
        document.getElementById('day3').innerText = dateFormat(raw_data.DATE_EXP)[0]
        document.getElementById('month3').innerText = dateFormat(raw_data.DATE_EXP)[1]
        document.getElementById('year3').innerText = dateFormat(raw_data.DATE_EXP)[2]
    }
    if (type === 3) {
        document.getElementById('number').innerText = `${raw_data.REQUEST_NO}/${raw_data.REQUEST_YEAR}`
        document.getElementById('name').innerText = getFullName(raw_data)
        document.getElementById('age').innerText = checkNull(raw_data.PERSONAL_AGE)
        document.getElementById('nationality').innerText = checkNull(raw_data.PERSONAL_NATIONALITY)
        document.getElementById('nationality2').innerText = checkNull(raw_data.PERSONAL_RACE)
        document.getElementById('homeId').innerText = checkNull(raw_data.PERSONAL_ADDRESS_HOME_NUMBER)
        document.getElementById('trxk').innerText = checkNull(raw_data.PERSONAL_ADDRESS_TRXK)
        document.getElementById('sxy').innerText = checkNull(raw_data.PERSONAL_ADDRESS_SXY)
        document.getElementById('road').innerText = checkNull(raw_data.PERSONAL_ADDRESS_ROAD)
        document.getElementById('moo').innerText = checkNull(raw_data.PERSONAL_ADDRESS_MOO)
        document.getElementById('subdistrict').innerText = checkNull(raw_data.PERSONAL_DISTRICT_NAME)
        document.getElementById('district').innerText = checkNull(raw_data.PERSONAL_AMPHUR_NAME)
        document.getElementById('province').innerText = checkNull(raw_data.PERSONAL_ROVINCE_NAME)
        document.getElementById('market').innerText = checkNull(raw_data.ESTABLISHMENT_NAME)
        document.getElementById('area').innerText = checkNull(raw_data.ESTABLISHMENT_AREA_SIZE)

        document.getElementById('homeIdS').innerText = checkNull(raw_data.E_ADDRESS_HOME_NUMBER)
        document.getElementById('roadS').innerText = checkNull(raw_data.E_ADDRESS_ROAD)
        document.getElementById('subdistrictS').innerText = checkNull(raw_data.E_DISTRICT_NAME)
        document.getElementById('districtS').innerText = checkNull(raw_data.E_AMPHUR_NAME)
        document.getElementById('provinceS').innerText = checkNull(raw_data.E_PROVINCE_NAME)
        document.getElementById('fee').innerText = checkNull(raw_data.R_FEE)
        //Start date
        document.getElementById('day2').innerText = dateFormat(raw_data.DATE_ISSUED)[0]
        document.getElementById('month2').innerText = dateFormat(raw_data.DATE_ISSUED)[1]
        document.getElementById('year2').innerText = dateFormat(raw_data.DATE_ISSUED)[2]
        //Exp date
        document.getElementById('day3').innerText = dateFormat(raw_data.DATE_EXP)[0]
        document.getElementById('month3').innerText = dateFormat(raw_data.DATE_EXP)[1]
        document.getElementById('year3').innerText = dateFormat(raw_data.DATE_EXP)[2]
    }
    if (type === 4) {
        document.getElementById('number').innerText = `${raw_data.REQUEST_NO}/${raw_data.REQUEST_YEAR}`
        let title_t_n = raw_data.PERSONAL_TITLE === null ? '' : raw_data.PERSONAL_TITLE
        document.getElementById('name').innerText = `${title_t_n} ${raw_data.PERSONAL_NAME}`
        document.getElementById('surname').innerText = raw_data.PERSONAL_SURNAME
        document.getElementById('nameSurn').innerText = getFullName(raw_data)

        document.getElementById('age').innerText = checkNull(raw_data.PERSONAL_AGE)
        document.getElementById('nationality').innerText = checkNull(raw_data.PERSONAL_NATIONALITY)

        document.getElementById('homeId').innerText = checkNull(raw_data.PERSONAL_ADDRESS_HOME_NUMBER)
        document.getElementById('trxk').innerText = checkNull(raw_data.PERSONAL_ADDRESS_TRXK)
        document.getElementById('sxy').innerText = checkNull(raw_data.PERSONAL_ADDRESS_SXY)
        document.getElementById('road').innerText = checkNull(raw_data.PERSONAL_ADDRESS_ROAD)
        document.getElementById('moo').innerText = checkNull(raw_data.PERSONAL_ADDRESS_MOO)
        document.getElementById('subdistrict').innerText = checkNull(raw_data.PERSONAL_DISTRICT_NAME)
        document.getElementById('district').innerText = checkNull(raw_data.PERSONAL_AMPHUR_NAME)
        document.getElementById('province').innerText = checkNull(raw_data.PERSONAL_ROVINCE_NAME)
        document.getElementById('phone').innerText = displayPhone(raw_data.PERSONAL_PHONE)

        document.getElementById('typeProduct').innerText = checkNull(raw_data.REQUEST_PRODUCT_TYPE)
        document.getElementById('location').innerText = checkNull(raw_data.ESTABLISHMENT_GROUND)
        //
        if (document.getElementById('trxkS') != undefined) {
            document.getElementById('trxkS').innerText = checkNull(raw_data.E_ADDRESS_TRXK)
            document.getElementById('roadS').innerText = checkNull(raw_data.E_ADDRESS_ROAD)
            document.getElementById('mooS').innerText = checkNull(raw_data.E_ADDRESS_MOO)
            document.getElementById('subdistrictS').innerText = checkNull(raw_data.E_DISTRICT_NAME)
            document.getElementById('districtS').innerText = checkNull(raw_data.E_AMPHUR_NAME)
            document.getElementById('provinceS').innerText = checkNull(raw_data.E_PROVINCE_NAME)
        }
        //
        document.getElementById('fee').innerText = checkNull(raw_data.R_FEE)

        document.getElementById('note1').innerText = checkNullCondition(raw_data.R_C_1)
        document.getElementById('note2').innerText = checkNullCondition(raw_data.R_C_2)
        document.getElementById('note3').innerText = checkNullCondition(raw_data.R_C_3)
        document.getElementById('note4').innerText = checkNullCondition(raw_data.R_C_4)
        //Start date
        document.getElementById('day2').innerText = dateFormat(raw_data.DATE_ISSUED)[0]
        document.getElementById('month2').innerText = dateFormat(raw_data.DATE_ISSUED)[1]
        document.getElementById('year2').innerText = dateFormat(raw_data.DATE_ISSUED)[2]
        //Exp date
        document.getElementById('day3').innerText = dateFormat(raw_data.DATE_EXP)[0]
        document.getElementById('month3').innerText = dateFormat(raw_data.DATE_EXP)[1]
        document.getElementById('year3').innerText = dateFormat(raw_data.DATE_EXP)[2]

    }
    if (type === 5) {
        if (document.getElementById('t_topic') != undefined) {
            let text = ''
            if( raw_data.RT_ID === 13){
                text = 'ใบอนุญาตจัดตั้งสุสาน และฌาปณกิจสถาน'
            }else{
                text = 'ใบอนุญาตดำเนินการสุสานและฌาปณกิจสถาน'
            }
            document.getElementById('t_topic').innerText = text
        }
        document.getElementById('number').innerText = `${raw_data.REQUEST_NO}/${raw_data.REQUEST_YEAR}`
        document.getElementById('no').innerText = raw_data.RT_ID === 13 ? '6' :  '7'
        document.getElementById('name').innerText = getFullName(raw_data)
        document.getElementById('age').innerText = checkNull(raw_data.PERSONAL_AGE)
        document.getElementById('nationality').innerText = checkNull(raw_data.PERSONAL_NATIONALITY)
        document.getElementById('nameId').innerText = checkNull(raw_data.PERSONAL_PERSONAL_ID)
        document.getElementById('homeId').innerText = checkNull(raw_data.PERSONAL_ADDRESS_HOME_NUMBER)
        document.getElementById('trxk').innerText = checkNull(raw_data.PERSONAL_ADDRESS_TRXK)
        document.getElementById('sxy').innerText = checkNull(raw_data.PERSONAL_ADDRESS_SXY)
        document.getElementById('road').innerText = checkNull(raw_data.PERSONAL_ADDRESS_ROAD)
        document.getElementById('moo').innerText = checkNull(raw_data.PERSONAL_ADDRESS_MOO)
        document.getElementById('subdistrict').innerText = checkNull(raw_data.PERSONAL_DISTRICT_NAME)
        document.getElementById('district').innerText = checkNull(raw_data.PERSONAL_AMPHUR_NAME)
        document.getElementById('province').innerText = checkNull(raw_data.PERSONAL_ROVINCE_NAME)
        document.getElementById('phone').innerText = displayPhone(raw_data.PERSONAL_PHONE)
        document.getElementById('homeIdS').innerText = checkNull(raw_data.E_ADDRESS_HOME_NUMBER)
        document.getElementById('sxyS').innerText = checkNull(raw_data.E_ADDRESS_TRXK)
        document.getElementById('roadS').innerText = checkNull(raw_data.E_ADDRESS_ROAD)
        document.getElementById('mooS').innerText = checkNull(raw_data.E_ADDRESS_MOO)
        document.getElementById('subdistrictS').innerText = checkNull(raw_data.E_DISTRICT_NAME)
        document.getElementById('districtS').innerText = checkNull(raw_data.E_AMPHUR_NAME)
        document.getElementById('provinceS').innerText = checkNull(raw_data.E_PROVINCE_NAME)
        //Start Date
        document.getElementById('day2').innerText = dateFormat(raw_data.DATE_ISSUED)[0]
        document.getElementById('month2').innerText = dateFormat(raw_data.DATE_ISSUED)[1]
        document.getElementById('year2').innerText = dateFormat(raw_data.DATE_ISSUED)[2]
        //End Date
        document.getElementById('day3').innerText = dateFormat(raw_data.DATE_EXP)[0]
        document.getElementById('month3').innerText = dateFormat(raw_data.DATE_EXP)[1]
        document.getElementById('year3').innerText = dateFormat(raw_data.DATE_EXP)[2]

    }
    //การเงิน
    if (document.getElementById('name_money') != undefined) {
        document.getElementById('name_money').innerText = `${raw_data.M_TITLE} ${raw_data.M_NAME} ${raw_data.M_SURNAME}`
    }
    //นายก
    if (document.getElementById('name_nayo') != undefined) {
        document.getElementById('name_nayo').innerText = `${raw_data.A_TITLE} ${raw_data.A_NAME} ${raw_data.A_SURNAME}`
        document.getElementById('position_nayo').innerText = checkNullCondition(raw_data.A_POSITION)
    }
}
function dateFormat(raw_data) {
    let temp_i = raw_data.split('-')
    console.log(temp_i)
    let day_t_i = parseInt(temp_i[0])
    let month_t_i = parseInt(temp_i[1]) - 1
    let year_t_i = parseInt(temp_i[2])
    let c_t = []
    c_t.push(day_t_i)
    c_t.push(month[month_t_i])
    c_t.push(year_t_i)
    return c_t
}
function displayFax(fax) {
    if (fax === null) {
        return '-'
    } else {
        return fax.slice(0, 3) + '-' + fax.slice(3, fax.length)
    }

}
function cutNoRequestType(type) {
    let no1 = type.slice(0, 1)
    let no2 = type.slice(0, 2)
    let no3 = type.slice(0, 3)
    if (!isNaN(no3)) {
        return no3
    } else if (!isNaN(no2)) {
        return no2
    } else {
        //no1
        return no1
    }
}
function searchPersonalById(id) {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/get/personal/assistant/${id}`).then((result) => {
            return resolve(result.data);
        })
    })
}
function getImageNayo(id) {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/get/image/nayo/view/${id}`).then((result) => {
            return resolve(result.data);
        })
    })
}
function checkNull(a) {
    if (a === null) {
        return '-'
    } else {
        return a
    }
}
function checkNullCondition(a) {
    if (a === null) {
        return ''
    } else {
        return a
    }
}
function getFullName(rd) {
    let tnt = rd.PERSONAL_TITLE === null ? '' : rd.PERSONAL_TITLE
    let nt = rd.PERSONAL_NAME === null ? '' : rd.PERSONAL_NAME
    let snt = rd.PERSONAL_SURNAME === null ? '' : rd.PERSONAL_SURNAME
    return tnt + ' ' + nt + ' ' + snt
}
function displayPhone(p) {
    p = p.split('/')
    if (p[0] === '-') {
        return '-'
    } else if (p[1] === '') {
        return p[0].slice(0, 3) + '-' + p[0].slice(3, p[0].length)
    } else {
        return p[0].slice(0, 3) + '-' + p[0].slice(3, p[0].length) + ' ต่อ ' + p[1]
    }
}
getDataView()