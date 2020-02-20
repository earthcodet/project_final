let raw_data = {}
function setImage() {
    for (let i = 0; i < 8; i++) {
        document.getElementById('image_' + i).src = `../../img/white.jpg`
    }
    if (raw_data.IMAGE_REVIEW.length < 5) {
        document.getElementById('pageTwo').style.display = 'none'
        for (let i = 0; i < raw_data.IMAGE_REVIEW.length; i++) {
            document.getElementById('image_' + i).src = `data:image/${raw_data.IMAGE_REVIEW[i].E_IMAGE_TYPE};base64,${raw_data.IMAGE_REVIEW[i].E_IMAGE_DATA}`
        }
    } else {
        document.getElementById('pageTwo').style.display = ''
        for (let i = 0; i < raw_data.IMAGE_REVIEW.length; i++) {
            document.getElementById('image_' + i).src = `data:image/${raw_data.IMAGE_REVIEW[i].E_IMAGE_TYPE};base64,${raw_data.IMAGE_REVIEW[i].E_IMAGE_DATA}`
        }
    }
}

function setDocumentTitle() {
    if (raw_data.IMAGE_REVIEW.length < 5) {
        getRequestType(raw_data.REQUEST_TYPE_ID)
        document.getElementById('pageTwo').style.display = 'none'
        document.getElementById('nameOperator').innerText = getName(raw_data.gropDataOperator)
        document.getElementById('addressOperator').innerText = getAddress(raw_data.gropDataOperator)
    } else {
        getRequestType(raw_data.REQUEST_TYPE_ID)
        document.getElementById('nameOperator').innerText = getName(raw_data.gropDataOperator)
        document.getElementById('addressOperator').innerText = getAddress(raw_data.gropDataOperator)
        document.getElementById('nameOperator_2').innerText = getName(raw_data.gropDataOperator)
        document.getElementById('addressOperator_2').innerText = getAddress(raw_data.gropDataOperator)
        document.getElementById('pageTwo').style.display = ''
    }
}
function startForm() {
    getView().then((check_data) => {
        console.log(raw_data)
        if(check_data) {
            setDocumentTitle()
            setImage()
        }
    })
}
function getName(raw_datas) {
    let item = {
        title: '',
        surnme: '',
        name: ''
    }
    if(raw_datas.PERSONAL_TYPE === 'บุคคลธรรมดา'){
        item.title = raw_datas.PERSONAL_TITLE === null ? 'นาย / นาง / นางสาว ' : raw_datas.PERSONAL_TITLE
    }else {
        item.title = raw_datas.PERSONAL_TITLE === null ? '' : raw_datas.PERSONAL_TITLE
    }
    
    item.surname = raw_datas.PERSONAL_SURNAME === null || raw_datas.PERSONAL_SURNAME === undefined ? '' : raw_datas.PERSONAL_SURNAME
    item.name = raw_datas.PERSONAL_NAME
    return `ชื่อ ${item.title} ${item.name} ${item.surname}`
}
function getAddress(data) {
    let item = {
        is_address_changed: false,
        id: "",
        home_number: "",
        moo: '',
        trxk: '',
        sxy: '',
        building: '',
        road: '',
        district_name: "",
        amphur_name: "",
        province_name: ""
    };
    item.id = data.AID.ADDRESS_ID
    item.home_number = data.AID.ADDRESS_HOME_NUMBER === null ? '-' : data.AID.ADDRESS_HOME_NUMBER
    item.moo = data.AID.ADDRESS_MOO === null ? '-' : data.AID.ADDRESS_MOO
    item.trxk = data.AID.ADDRESS_TRXK === null ? '-' : data.AID.ADDRESS_TRXK
    item.sxy = data.AID.ADDRESS_SXY === null ? '-' : data.AID.ADDRESS_SXY
    item.building = data.AID.ADDRESS_BUILDING === null ? '-' : data.AID.ADDRESS_BUILDING
    item.road = data.AID.ADDRESS_ROAD === null ? '-' : data.AID.ADDRESS_ROAD
    item.district_name = data.AID.DISTRICT_NAME
    item.amphur_name = data.AID.AMPHUR_NAME
    item.province_name = data.AID.PROVINCE_NAME
    return `ที่อยู่ บ้านเลขที่ ${item.home_number} หมู่ ${item.moo} ตรอก ${item.trxk} ซอย ${item.sxy} อาคาร ${item.building} ถนน ${item.road} ตำบล ${item.district_name} อำเภอ ${item.amphur_name} จังหวัด ${item.province_name}`
}
//ประกอบกิจการประเภท
function getRequestType(id) {
    getRequestDataById(id).then((request) => {
        console.log(`work`)
        let temp = `ประกอบกิจการประเภท ${request.REQUEST_TYPE_NAME}`
        document.getElementById('requestType').innerText = temp
        document.getElementById('requestType_2').innerText = temp
    })
}
function getRequestDataById(id) {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/get/requestTypeById/${id}`).then((result) => {
            return resolve(result.data);
        })
    })
}


function getView() {
    let requsetId = getUrlVars()
    if (requsetId.id != undefined) {
        let requsetNo = requsetId.id.slice(0, 6)
        let requestYear = requsetId.id.slice(6, 10)
        return new Promise((resolve, reject) => {
            getRequestData(requsetNo, requestYear).then((data) => {
                if (data != '') {
                    raw_data = data
                    return resolve(true)
                } else {
                    return resolve(false)
                }
            })
        })
    }
}

function getRequestData(no, year) {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/get/request/${no}/${year}`).then((result) => {
            return resolve(result.data);
        })
    })
}
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}
startForm()