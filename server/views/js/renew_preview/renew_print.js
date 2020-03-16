function getRequestDataRenew(no, year) {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/get/view/renew/${no}/${year}`).then((result) => {
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
        getRequestDataRenew(requestId.id_no, requestId.id_year).then((data) => {
            console.log(data)
            if (data.length != 0) {
                if (data[0].PERSONAL_ID_ASSISTANT != null) {
                    searchPersonalById(PERSONAL_ID_ASSISTANT).then((data_op) => {
                        console.log(data_op)
                        setData(data[0], data_op, requestId.id_no.slice(0, 1))
                    })
                } else {
                    setData(data[0], undefined, requestId.id_no.slice(0, 1))
                }
                displayForm()
            }
            displayForm()
        })
    }
}
function displayForm() {
    console.log('dsads')
    document.getElementById('box_no_1').style.display = ''
    document.getElementById('box_no_2').style.display = 'none'
}
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
function setData(rd, op, sc) {
    let date_now_temp = new Date().toISOString().slice(0,10).split('-')
    let year = parseInt(date_now_temp[0]) + 543
    let month_num = parseInt(date_now_temp[1])-1
    let day = parseInt(date_now_temp[2])
    let newForm_date = `วันที่ ${day} เดือน ${month[month_num]} พ.ศ. ${year}`
        // 
    if (sc === 'E' || sc === 'F') {
        // preview_copy.html
        document.getElementById('request_title').innerText = 'คำขอต่อ' + checkNull(rd.REQUEST_MENU)
    } else if (sc === 'A' || sc === 'B') {
        // preview_copy_3.html สาธาณะ
        document.getElementById('request_title').innerText = 'แบบคำขอต่อ' + checkNull(rd.REQUEST_MENU)
    } else {
        // preview_copy_2.html
        document.getElementById('request_title').innerText = '[/] '+checkNull(rd.REQUEST_MENU)
    }

    document.getElementById('request_date_now').innerText = newForm_date
    if (rd.PERSONAL_TYPE === "บุคคลธรรมดา") {
        document.getElementById('user_type_1').checked = true
    } else {
        document.getElementById('user_type_2').checked = true
    }
    document.getElementById('fax')
    document.getElementById('user_fullname').innerText = getFullName(rd)
    document.getElementById('user_age').innerText = checkNull(rd.PERSONAL_AGE)
    document.getElementById('nationality').innerText = checkNull(rd.PERSONAL_NATIONALITY)
    document.getElementById('personal_id').innerText = checkNull(rd.PERSONAL_PERSONAL_ID)
    document.getElementById('homeId').innerText = checkNull(rd.PERSONAL_ADDRESS_HOME_NUMBER)
    document.getElementById('trxk').innerText = checkNull(rd.PERSONAL_ADDRESS_TRXK)
    document.getElementById('sxy').innerText = checkNull(rd.PERSONAL_ADDRESS_SXY)
    document.getElementById('road').innerText = checkNull(rd.PERSONAL_ADDRESS_ROAD)
    document.getElementById('moo').innerText = checkNull(rd.PERSONAL_ADDRESS_MOO)
    document.getElementById('sub_district').innerText = checkNull(rd.PERSONAL_DISTRICT_NAME)
    document.getElementById('district').innerText = checkNull(rd.PERSONAL_AMPHUR_NAME)
    document.getElementById('province').innerText = checkNull(rd.PERSONAL_ROVINCE_NAME)
    document.getElementById('phone').innerText = displayPhone(rd.PERSONAL_PHONE)
    if (document.getElementById('fax') != undefined) {
        document.getElementById('fax').innerText = displayFax(rd.PERSONAL_FAX)
    }


    document.getElementById('name_user_duplication').innerText = getFullName(rd)

    if (document.getElementById('request_type') != undefined) {
        document.getElementById('request_type').innerText = checkNull(rd.REQUEST_TYPE_NAME)
    }
    if (document.getElementById('e_name') != undefined) {
        document.getElementById('e_name').innerText = checkNull(rd.ESTABLISHMENT_NAME)
        document.getElementById('e_homeId').innerText = checkNull(rd.E_ADDRESS_HOME_NUMBER)
        document.getElementById('e_trxk').innerText = checkNull(rd.E_ADDRESS_TRXK)
        document.getElementById('e_sxy').innerText = checkNull(rd.E_ADDRESS_SXY)
        document.getElementById('e_road').innerText = checkNull(rd.E_ADDRESS_ROAD)
        document.getElementById('e_moo').innerText = checkNull(rd.E_ADDRESS_MOO)
        document.getElementById('e_sub_district').innerText = checkNull(rd.E_DISTRICT_NAME)
        document.getElementById('e_district').innerText = checkNull(rd.E_AMPHUR_NAME)
        document.getElementById('e_province').innerText = checkNull(rd.E_PROVINCE_NAME)
        document.getElementById('e_phone').innerText = displayPhone(rd.ESTABLISHMENT_PHONE)
        document.getElementById('e_size').innerText = checkNull(rd.ESTABLISHMENT_AREA_SIZE)
    }
    if (document.getElementById('product_type') != undefined) {
        document.getElementById('product_type').innerText = checkNull(rd.REQUEST_PRODUCT_TYPE)
        document.getElementById('e_ground').innerText = checkNull(rd.ESTABLISHMENT_GROUND)
        document.getElementById('a_user_full_name').innerText = getFullName(op)
    }

    if (document.getElementById('e_trxk_sxy') != undefined) {
        document.getElementById('e_trxk_sxy').innerText = checkNull(rd.E_ADDRESS_SXY)
    }
    if (document.getElementById('e_type') != undefined) {
        if (rd.REQUEST_MENU === 'หนังสือรับรองการแจ้งจัดตั้งสถานที่สะสมอาหาร') {
            document.getElementById('e_type').innerText = 'สะสมอาหาร'
        } else {
            document.getElementById('e_type').innerText = 'จำหน่ายอาหาร'
        }
    }

}
function displayFax(fax) {
    if (fax === null) {
        return '-'
    } else {
        return fax.slice(0, 3) + '-' + fax.slice(3, fax.length)
    }

}
function searchPersonalById(id) {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/get/personal/assistant/${id}`).then((result) => {
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
    } else {
        return p[0].slice(0, 3) + '-' + p[0].slice(3, p[0].length) + ' ต่อ ' + p[1]
    }
}
getDataView()