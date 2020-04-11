let raw_data = {}
function setImage() {
    console.log(raw_data)
    for (let i = 0; i < 8; i++) {
        document.getElementById('image_' + i).src = `../../img/white.jpg`
    }
    if (raw_data.IMAGE_REVIEW.length < 5) {
        document.getElementById('number_view').innerText = 'หน้าที่ 1 / 1'
        document.getElementById('pageTwo').style.display = 'none'
        for (let i = 0; i < raw_data.IMAGE_REVIEW.length; i++) {
            document.getElementById('image_' + i).src = `data:image/${raw_data.IMAGE_REVIEW[i].E_IMAGE_TYPE};base64,${raw_data.IMAGE_REVIEW[i].E_IMAGE_DATA_BASE64}`
        }
    } else {
        document.getElementById('number_view').innerText = 'หน้าที่ 1 / 2'
        document.getElementById('pageTwo').style.display = ''
        for (let i = 0; i < raw_data.IMAGE_REVIEW.length; i++) {
            document.getElementById('image_' + i).src = `data:image/${raw_data.IMAGE_REVIEW[i].E_IMAGE_TYPE};base64,${raw_data.IMAGE_REVIEW[i].E_IMAGE_DATA_BASE64}`
        }
    }
}
function showViewImage(){
    document.getElementById('box_no_1').style.display = ''
    document.getElementById('box_no_2').style.display = 'none'
}
function setDocumentTitle() {
    if (raw_data.IMAGE_REVIEW.length < 5) {
        document.getElementById('Topic_no1').innerText = 'แบบตรวจสถานประกอบการ ' + raw_data.REQUEST_MENU
        document.getElementById('requestType').innerText = `ประกอบกิจการประเภท ${raw_data.REQUEST_TYPE_NAME}`
        document.getElementById('pageTwo').style.display = 'none'
        document.getElementById('nameOperator').innerText = getName(raw_data)
        document.getElementById('addressOperator').innerText = getAddress(raw_data)
    } else {
        document.getElementById('Topic_no1').innerText =  'แบบตรวจสถานประกอบการ ' +raw_data.REQUEST_MENU
        document.getElementById('Topic_no2').innerText =  'แบบตรวจสถานประกอบการ ' +raw_data.REQUEST_MENU
        document.getElementById('requestType').innerText = `ประกอบกิจการประเภท ${raw_data.REQUEST_TYPE_NAME}`
        document.getElementById('requestType_2').innerText = `ประกอบกิจการประเภท ${raw_data.REQUEST_TYPE_NAME}`
        document.getElementById('nameOperator').innerText = getName(raw_data)
        document.getElementById('addressOperator').innerText = getAddress(raw_data)
        document.getElementById('nameOperator_2').innerText = getName(raw_data)
        document.getElementById('addressOperator_2').innerText = getAddress(raw_data)
        document.getElementById('pageTwo').style.display = ''
    }
}
function startForm() {
    getView().then((check_data) => {
        if(check_data) {
            setDocumentTitle()
            setImage()
            showViewImage()
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
    item.id = data.ADDRESS_ID
    item.home_number = data.ADDRESS_HOME_NUMBER === null ? '-' : data.ADDRESS_HOME_NUMBER
    item.moo = data.ADDRESS_MOO === null ? '-' : data.ADDRESS_MOO
    item.trxk = data.ADDRESS_TRXK === null ? '-' : data.ADDRESS_TRXK
    item.sxy = data.ADDRESS_SXY === null ? '-' : data.ADDRESS_SXY
    item.building = data.ADDRESS_BUILDING === null ? '-' : data.ADDRESS_BUILDING
    item.road = data.ADDRESS_ROAD === null ? '-' : data.ADDRESS_ROAD
    item.district_name = data.DISTRICT_NAME
    item.amphur_name = data.AMPHUR_NAME
    item.province_name = data.PROVINCE_NAME
    return `ที่อยู่ บ้านเลขที่ ${item.home_number} หมู่ ${item.moo} ตรอก ${item.trxk} ซอย ${item.sxy} อาคาร ${item.building} ถนน ${item.road} ตำบล ${item.district_name} อำเภอ ${item.amphur_name} จังหวัด ${item.province_name}`
}
function getView() {
    let requsetId = getUrlVars()
    if (requsetId.id != undefined) {
        let requsetNo = requsetId.id.slice(0, 6)
        let requestYear = requsetId.id.slice(6, 10)
        return new Promise((resolve, reject) => {
            getRequestData(requsetNo, requestYear).then((data) => {
                if (data.length != 0) {
                    raw_data = data[0]
                    
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
        axios.get(`http://localhost:5000/get/viewImage/${no}/${year}`).then((result) => {
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