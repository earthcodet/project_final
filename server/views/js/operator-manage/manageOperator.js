let inAddress = {
    id: "",
    home_number: "-",
    moo: '',
    trxk: '',
    sxy: '',
    building: '',
    road: '',
    district_name: "",
    amphur_name: "",
    province_name: ""
};
let requestDataList = []
let reportDataList = []
let inPersonal = {
    id: "",
    address_id: "",
    title: "",
    type: "",
    name: "",
    surname: "",
    nationality: '',
    race: '',
    birthday: '',
    personal_id: "",
    card_issued: "",
    card_expipe: '',
    phone: "",
    fax: ''
};
let tSearchName = ''
let tSearchSurname = ''
let tSearchId = ''
let tempPersonal = {}
let _operatorData = {}
let now_status = 'active'
let now_personal = ''
let inRequest = {
    status: '',
    status_before: '',
    last_update: '',
    user_update: '',
    date_approve: '',
    staff_id_approve: '',
    receipt_fine: '',
    receipt_fee: '',
    receipt_total: '',
    receipt_date: '',
    receipt_fine_year_2: '',
    receipt_fee_year_2: '',
    receipt_total_year_2: '',
    receipt_date_year_2: '',
    receipt_fine_year_3: '',
    receipt_fee_year_3: '',
    receipt_total_year_3: '',
    receipt_date_year_3: '',
    staff_id_money: '',
    date_issued: '',
    date_expired: '',
    delete_logic: '',
    is_deleted: '',
    no: '',
    year: '',
    menu: '',
    establishment_id: '',
    establishment_name: '',
    last_update: ''
}
let inComplaint = {
    id: '',
    year: '',
    type: '',
    date_submission: '',
    request_no: '',
    request_year: ''
}
const numToMonth = {
    1: 'มกราคม',
    2: 'กุมภาพันธ์',
    3: 'มีนาคม',
    4: 'เมษายน',
    5: 'พฤษภาคม',
    6: 'มิถุนายน',
    7: 'กรกฎาคม',
    8: 'สิงหาคม',
    9: 'กันยายน',
    10: 'ตุลาคม',
    11: 'พฤศจิกายน',
    12: 'ธันวาคม'
}
function resetParameter() {
    arrInsert = [];
    inPersonal = {
        id: "",
        address_id: "",
        title: "",
        type: "",
        name: "",
        surname: "",
        nationality: '',
        race: '',
        birthday: '',
        personal_id: "",
        card_issued: "",
        card_expipe: '',
        phone: "",
        fax: ''
    };
    inAddress = {
        id: "",
        home_number: "-",
        moo: '',
        trxk: '',
        sxy: '',
        building: '',
        road: '',
        district_name: "",
        amphur_name: "",
        province_name: ""
    };
}
function setDataUI(data) {
    inPersonal.id = data.PERSONAL_ID
    document.getElementById('report_open').disabled = false
    if (data.PERSONAL_TYPE === 'บุคคลธรรมดา') {
        document.getElementById('title_shot_personal_id').innerText = 'เลขประจำตัว : '
        let title_shot_item = data.PERSONAL_TITLE === undefined || data.PERSONAL_TITLE === null ? '' : data.PERSONAL_TITLE
        let name_shot_item = data.PERSONAL_NAME
        let surname_shot_item = data.PERSONAL_SURNAME === undefined || data.PERSONAL_SURNAME === null ? '' : data.PERSONAL_SURNAME
        document.getElementById('shot_name').value = `${title_shot_item} ${name_shot_item} ${surname_shot_item}`
        document.getElementById('shot_personal_id').value = data.PERSONAL_PERSONAL_ID
        //address
        document.getElementById('homeId').value = data.AID.ADDRESS_HOME_NUMBER
        document.getElementById('moo').value = data.AID.ADDRESS_MOO === undefined || data.AID.ADDRESS_MOO === null ? '' : data.AID.ADDRESS_MOO
        document.getElementById('trxk').value = data.AID.ADDRESS_TRXK === undefined || data.AID.ADDRESS_TRXK === null ? '' : data.AID.ADDRESS_TRXK
        document.getElementById('sxy').value = data.AID.ADDRESS_SXY === undefined || data.AID.ADDRESS_SXY === null ? '' : data.AID.ADDRESS_SXY
        document.getElementById('building').value = data.AID.ADDRESS_BUILDING === undefined || data.AID.ADDRESS_BUILDING === null ? '' : data.AID.ADDRESS_BUILDING
        document.getElementById('road').value = data.AID.ADDRESS_ROAD === undefined || data.AID.ADDRESS_ROAD === null ? '' : data.AID.ADDRESS_ROAD
        //ค่าที่ส่งกลับมาอาจเป็น text ต้องการที่เป็น int
        //get id by name [ตั้งตัวแปรเพราะจะทำให้โปรแกรมไม่ต้อง loop เยอะๆ]
        let provinceId = parseInt(getProviceIdByName(data.AID.PROVINCE_NAME))
        let amphurId = parseInt(getAmphureIdByName(data.AID.AMPHUR_NAME, provinceId))
        let districtId = parseInt(getDistrictIdByName(data.AID.DISTRICT_NAME, amphurId))

        //แสดงค่าจังหวัดที่มาจาก ฐานข้อมูล (จังหวัด) ตาม id
        document.getElementById(`province`).value = provinceId

        //ตั้งค่ารายชื่อ อำเภอ, ตำบล ตามจังหวัดที่เลือกลงให้ list input ตาม id
        amphurSelect(parseInt(provinceId)) // list อำเภอทั้งหมดตาม province Id
        districtSelect(parseInt(amphurId)) // list ตำบลทั้งหมดตาม ampur_Id

        //แสดงค่าจังหวัดที่มาจาก ฐานข้อมูล (อำเภอ , ตำบล) ตาม id
        document.getElementById(`district`).value = amphurId
        if (districtId === '' || districtId === undefined) {
            document.getElementById(`subdistrict`).innerHTML = ''
        } else {
            // document.getElementById(`subdistrict`).value = districtId
        }
        console.log(document.getElementById(`subdistrict`))
        // document.getElementById(`subdistrict`).value = districtId
        //prsonal 
        document.getElementById('title').value = data.PERSONAL_TITLE === undefined || data.PERSONAL_TITLE === null ? '' : data.PERSONAL_TITLE
        document.getElementById('nameUser').value = data.PERSONAL_NAME
        document.getElementById('surnameUser').value = data.PERSONAL_SURNAME === undefined || data.PERSONAL_SURNAME === null ? '' : data.PERSONAL_SURNAME
        document.getElementById('nationality').value = data.PERSONAL_NATIONALITY === undefined || data.PERSONAL_NATIONALITY === null ? '' : data.PERSONAL_NATIONALITY
        document.getElementById('race').value = data.PERSONAL_RACE === undefined || data.PERSONAL_RACE === null ? '' : data.PERSONAL_RACE
        document.getElementById('datepicker3').value = data.PERSONAL_BIRTHDAY === undefined || data.PERSONAL_BIRTHDAY === null ? '-' : data.PERSONAL_BIRTHDAY

        document.getElementById('id').value = data.PERSONAL_PERSONAL_ID
        document.getElementById('datepicker1').value = data.PERSONAL_CARD_ISSUED === undefined ? '-' : data.PERSONAL_CARD_ISSUED
        document.getElementById('datepicker2').value = data.PERSONAL_CARD_EXPIRE === undefined || data.PERSONAL_CARD_EXPIRE === null ? '-' : data.PERSONAL_CARD_EXPIRE
        data.PERSONAL_CARD_EXPIRE === undefined ? radioLife() : ''
        data.PERSONAL_CARD_EXPIRE === undefined ? radioLife() : ''
        let phone_t = data.PERSONAL_PHONE.split('/')
        document.getElementById('phone_more').disabled = false
        if (phone_t[1] != '') {
            document.getElementById('phone').value = phone_t[0]
            // document.getElementById('phone_more').disabled = false
            document.getElementById('phone_more').value = phone_t[1]
        } else {
            document.getElementById('phone').value = phone_t[0]
            // document.getElementById('phone_more').disabled = true
            document.getElementById('phone_more').value = phone_t[1]
        }
        console.log(`phone_t`)
        console.log(phone_t)
        if (phone_t[0] === '-') {
            document.getElementById('phone_more').disabled = true
        } else {
            document.getElementById('phone_more').disabled = false
        }
        document.getElementById('fax').value = data.PERSONAL_FAX === undefined || data.PERSONAL_FAX === null ? '' : data.PERSONAL_FAX
        document.getElementById('last-update').value = data.PERSONAL_UPDATE

        if (data.image != undefined) {
            console.log(data.image)
            let img = document.getElementById('operatorImage')
            let img_shot = document.getElementById('operatorImage_shot')
            if (data.image.IMAGE_DATA != null && data.image.IMAGE_DATA != undefined) {
                img.src = `data:image/${data.image.IMAGE_TYPE};base64,` + data.image.IMAGE_DATA
                img_shot.src = `data:image/${data.image.IMAGE_TYPE};base64,` + data.image.IMAGE_DATA
            } else {
                img.src = `../../img/userProfile.png`
                img_shot.src = `../../img/userProfile.png`
            }

        }
    } else {
        document.getElementById('title_shot_personal_id').innerText = 'เลขทะเบียน : '
        document.getElementById('operatorImage_shot').src = '../../img/town.png'
        document.getElementById('shot_name').value = data.PERSONAL_NAME
        document.getElementById('shot_personal_id').value = data.PERSONAL_PERSONAL_ID

        document.getElementById('company-nameUser').value = data.PERSONAL_NAME
        document.getElementById('company-id').value = data.PERSONAL_PERSONAL_ID
        document.getElementById('datepicker4').value = data.PERSONAL_CARD_ISSUED === undefined ? '-' : data.PERSONAL_CARD_ISSUED
        let phone_t = data.PERSONAL_PHONE.split('/')
        console.log(`phone_t`)
        console.log(phone_t)
        document.getElementById('company-phone-more').disabled = false
        if (phone_t[1] != '') {
            document.getElementById('company-phone').value = phone_t[0]
            document.getElementById('company-phone-more').disabled = false
            document.getElementById('company-phone-more').value = phone_t[1]
        } else {
            document.getElementById('company-phone').value = phone_t[0]
            document.getElementById('company-phone-more').disabled = true
            document.getElementById('company-phone-more').value = phone_t[1]
        }
        if (phone_t[0] === '-') {
            document.getElementById('company-phone-more').disabled = true
        } else {
            document.getElementById('company-phone-more').disabled = false
        }
        document.getElementById('company-fax').value = data.PERSONAL_FAX === undefined || data.PERSONAL_FAX === null ? '' : data.PERSONAL_FAX

        document.getElementById('company-homeId').value = data.AID.ADDRESS_HOME_NUMBER
        document.getElementById('company-moo').value = data.AID.ADDRESS_MOO === undefined || data.AID.ADDRESS_MOO === null ? '' : data.AID.ADDRESS_MOO
        document.getElementById('company-trxk').value = data.AID.ADDRESS_TRXK === undefined || data.AID.ADDRESS_TRXK === null ? '' : data.AID.ADDRESS_TRXK
        document.getElementById('company-sxy').value = data.AID.ADDRESS_SXY === undefined || data.AID.ADDRESS_SXY === null ? '' : data.AID.ADDRESS_SXY
        document.getElementById('company-building').value = data.AID.ADDRESS_BUILDING === undefined || data.AID.ADDRESS_BUILDING === null ? '' : data.AID.ADDRESS_BUILDING
        document.getElementById('company-road').value = data.AID.ADDRESS_ROAD === undefined || data.AID.ADDRESS_ROAD === null ? '' : data.AID.ADDRESS_ROAD
        //ค่าที่ส่งกลับมาอาจเป็น text ต้องการที่เป็น int
        //get id by name [ตั้งตัวแปรเพราะจะทำให้โปรแกรมไม่ต้อง loop เยอะๆ]
        let provinceId = parseInt(getProviceIdByName(data.AID.PROVINCE_NAME))
        let amphurId = parseInt(getAmphureIdByName(data.AID.AMPHUR_NAME, provinceId))
        let districtId = parseInt(getDistrictIdByName(data.AID.DISTRICT_NAME, amphurId))

        //แสดงค่าจังหวัดที่มาจาก ฐานข้อมูล (จังหวัด) ตาม id
        document.getElementById(`wProvince`).value = provinceId

        //ตั้งค่ารายชื่อ อำเภอ, ตำบล ตามจังหวัดที่เลือกลงให้ list input ตาม id
        wamphurSelect(parseInt(provinceId)) // list อำเภอทั้งหมดตาม province Id
        wdistrictSelect(parseInt(amphurId)) // list ตำบลทั้งหมดตาม ampur_Id

        //แสดงค่าจังหวัดที่มาจาก ฐานข้อมูล (อำเภอ , ตำบล) ตาม id
        document.getElementById(`wDistrict`).value = amphurId
        if (districtId === '' || districtId === undefined) {
            document.getElementById(`wSubdistrict`).innerHTML = ''
        } else {
            document.getElementById(`wSubdistrict`).value = districtId
        }
        document.getElementById('company-last-update').value = data.PERSONAL_UPDATE
    }
}
function changeOption(value) {
    if (value === "นิติบุคคล") {
        document.getElementById("perTy2").style.display = "";
        document.getElementById("perTy1").style.display = "none";
        document.getElementById("operatorImage").src = "../../img/town.png";
        document.getElementById("imgText").style.display = "none";
        document.getElementById("imgButton").style.display = "none";
        document.getElementById('typeUser').value = `นิติบุคคล`
    } else {
        document.getElementById("perTy2").style.display = "none";
        document.getElementById("perTy1").style.display = "";
        document.getElementById("imgText").style.display = "";
        document.getElementById("operatorImage").src = "../../img/userProfile.png";
        document.getElementById("imgButton").style.display = "";

    }
}
function resetStyleIdDelete() {
    var id = document.getElementById('id')
    if (id != undefined || id != null) {
        id.style.textDecoration = ''
    }
    var company_id = document.getElementById('company-id')
    if (company_id != undefined || company_id != null) {
        company_id.style.textDecoration = ''
    }
    var shot_id = document.getElementById('shot_personal_id')
    if (shot_id != undefined || shot_id != null) {
        shot_id.style.textDecoration = ''
    }
}
function resetImageDefault() {
    document.getElementById('uploadFile').value = ''
    var img = document.getElementById('operatorImage')
    img.src = '../../img/userProfile.png'
}
function setIdDelete(type) {
    if (type === 'บุคคลธรรมดา') {
        var id = document.getElementById('id')

        if (id != null) {
            if (id.style.textDecoration === '') {
                id.style.textDecoration = 'line-through'
            } else {
                id.style.textDecoration = ''
            }
        }
    } else {
        var company_id = document.getElementById('company-id')
        if (company_id != null) {
            if (company_id.style.textDecoration === '') {
                company_id.style.textDecoration = 'line-through'
            } else {
                company_id.style.textDecoration = ''
            }
        }
    }
    var shot_id = document.getElementById('shot_personal_id')
    if (shot_id.style.textDecoration === '') {
        shot_id.style.textDecoration = 'line-through'
    } else {
        shot_id.style.textDecoration = ''
    }
}
function searchPersonal() {
    let id = document.getElementById('popSearchId').value.trim()
    let name = document.getElementById('popSearchName').value.trim()
    let surname = document.getElementById('popSearchSurname').value.trim()

    //เพราะมันส่งค่าช่องว่าไปไม่ได้ ตย. abc.com/// <-error
    if (id.length === 0) {
        id = 'none'
    }
    if (name.length === 0) {
        name = 'none'
    }
    if (surname.length === 0) {
        surname = 'none'
    }
    //ไม่ให้ค้นหา คำค้นหาเดิม
    if (tSearchId != id || tSearchName != name || tSearchSurname != surname) {
        return new Promise((resolve, reject) => {
            tSearchName = name
            tSearchId = id
            tSearchSurname = surname
            console.log('Searching')
            axios.get(`http://localhost:5000/search/personal/${id}/${name}/${surname}/all`).then((result) => {
                if (result.data != 'Not found') {
                    createResultSearch(result.data)
                    errorSearch('', 'HIDE')

                    return resolve(result.data);
                } else {
                    errorSearch('not found', 'SHOW')
                    var tbl = document.getElementById("resultItems");
                    if (tbl.getElementsByTagName("tbody")[0] != null || tbl.getElementsByTagName("tbody")[0] != undefined) {
                        tbl.removeChild(tbl.getElementsByTagName("tbody")[0])
                    }
                }
            })
        })
    } else {
        console.log(`Search query doesn't change`)
        errorSearch(`query doesn't change`, 'SHOW')
    }

}
function onClickRadio() {
    if (document.getElementById('datepicker2').disabled === true) {
        document.getElementById('datepicker2').disabled = false
        document.getElementById('life-id').checked = false
    } else {
        document.getElementById('datepicker2').disabled = true
        document.getElementById('life-id').checked = true
        document.getElementById('datepicker2').value = ''
    }
}
function radioLife() {
    document.getElementById('datepicker2').value = ''
    document.getElementById('datepicker2').disabled = true
    document.getElementById('life-id').checked = true
    document.getElementById('datepicker2').value = ''
}
function errorSearch(texterror, action) {
    let error = document.getElementById('error_search')
    error.classList.toggle('animation')
    if (action === 'SHOW') {
        error.style.display = ''
        if (texterror === 'not found') {
            error.innerText = 'ค้นหารายชื่อผู้ประกอบการไม่พบ'
        } else {
            error.innerText = 'คำค้นหาไม่มีการเปลี่ยนแปลง'
        }
    } else {
        error.style.display = 'none'
    }
}
function getImageByPeronalId(type, id) {
    return new Promise((resolve, reject) => {
        if (type === 'บุคคลธรรมดา') {
            axios.get(`http://localhost:5000/get/image/${id}`).then((result) => {
                console.log(result.data[0])
                return resolve(result.data[0]);
            })
        } else {
            return resolve(false)
        }
    })
}
function showItem(dataOperator) {
    document.getElementById('datepicker2').disabled = false
    document.getElementById('life-id').checked = false
    document.getElementById('datepicker2').value = ''
    tempPersonal = dataOperator
    resetParameter()
    resetStyleIdDelete()
    now_personal = dataOperator.PERSONAL_ID
    if (now_status != 'ban' && now_status != 'report') {
        displayTableRequest()
        displayTableRequestAssistant()
    } else {
        displayReportTable()
    }

    changeOption(dataOperator.PERSONAL_TYPE.trim())
    if (dataOperator.PERSONAL_TYPE === 'บุคคลธรรมดา') {
        getImageByPeronalId(dataOperator.PERSONAL_TYPE, dataOperator.PERSONAL_ID).then((result) => {
            if (result != false || result != null) {
                dataOperator.image = result
                setDataUI(dataOperator)
            } else {
                setDataUI(dataOperator)
            }
        })
    } else {
        setDataUI(dataOperator)
    }
    // static operator 
    _operatorData = dataOperator

    if (dataOperator.PERSONAL_IS_DELETED === 'Y') {
        setIdDelete(dataOperator.PERSONAL_TYPE) // ทำให้ id เป็นขีด

    } else {
        resetStyleIdDelete()    //เอา style ลบออก
    }
    Swal.close()
}
function createResultSearch(data) {
    var tbl = document.getElementById("resultItems");
    if (tbl.getElementsByTagName("tbody")[0] != null || tbl.getElementsByTagName("tbody")[0] != undefined) {
        tbl.removeChild(tbl.getElementsByTagName("tbody")[0])
    }
    var tblBody = document.createElement('tbody')
    for (var i = 0; i < data.length; i++) {
        // creates a table row
        var row = document.createElement("tr");
        //row index = this.rowIndex
        row.onclick = function () { showItem(data[this.rowIndex - 1]) }

        for (var j = 0; j < 4; j++) {
            var cell = document.createElement("td");
            if (j === 0) {
                var cellText = document.createTextNode(data[i].PERSONAL_NAME);
            } else if (j === 1) {
                let textJ1 = data[i].PERSONAL_SURNAME === null ? '' : data[i].PERSONAL_SURNAME
                var cellText = document.createTextNode(textJ1);
            } else if (j === 2) {
                let AddressText = ''
                AddressText = AddressText + `บ้านเลขที่ ${data[i].AID.ADDRESS_HOME_NUMBER} `
                AddressText = AddressText + `หมู่ ${data[i].AID.ADDRESS_MOO === null ? '-' : data[i].AID.ADDRESS_MOO} `
                AddressText = AddressText + `ตรอก ${data[i].AID.ADDRESS_TRXK === null ? '-' : data[i].AID.ADDRESS_TRXK} `
                AddressText = AddressText + `ซอย ${data[i].AID.ADDRESS_SXY === null ? '-' : data[i].AID.ADDRESS_SXY} `
                AddressText = AddressText + `อาคาร ${data[i].AID.ADDRESS_BUILDING === null ? '-' : data[i].AID.ADDRESS_BUILDING} `
                AddressText = AddressText + `ถนน ${data[i].AID.ADDRESS_ROAD === null ? '-' : data[i].AID.ADDRESS_ROAD} `
                AddressText = AddressText + `ตำบล ${data[i].AID.DISTRICT_NAME === null ? '-' : data[i].AID.DISTRICT_NAME} `
                AddressText = AddressText + `อำเภอ ${data[i].AID.AMPHUR_NAME === null ? '-' : data[i].AID.AMPHUR_NAME}`
                AddressText = AddressText + `จังหวัด ${data[i].AID.PROVINCE_NAME === null ? '-' : data[i].AID.PROVINCE_NAME}`
                var cellText = document.createTextNode(AddressText);
            } else {
                var cellText = document.createTextNode(data[i].PERSONAL_PERSONAL_ID);
            }

            cell.appendChild(cellText);
            if (j === 3 && data[i].PERSONAL_IS_DELETED === 'Y') {
                cell.style.textDecoration = 'line-through'
            }
            row.appendChild(cell);
        }
        tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
}
function runScript(e) {
    if (e.keyCode == 13) {
        searchPersonal()
        return false;
    }
}
function searchOparator() {
    tSearchName = ''
    tSearchSurname = ''
    tSearchId = ''
    var swal_html = `<div >
        <div class="display-center" onkeypress="return runScript(event)">
                    <h5 style="font-size: 100%;">
                        ชื่อ :
                        <input type="text" id="popSearchName" style="width: 18%;">
                        นามสกุล :
                        <input type="text" id="popSearchSurname" style="width: 18%;" >
                        เลขบัตรประจำตัว :
                        <input type="text" id="popSearchId" style="width: 18%;" >
                        <button type="button" style="width: auto;height: auto;"
                        class="btn btn-secondary is-color" onClick='searchPersonal()'>
                                <i class="fa fa-search"></i> 
                                ค้นหา
                           
                        </button>
                        <br>
                        <font id='error_search' style='display:none'class='alert'> ค้นหาไม่พบ </font>
                    </h5>   
                    
                </div>
        <div class="search-popup-height">
            <table id='resultItems' class="table tablesearch table-hover cursor-pointer">
                <thead>
                  <tr class="is-color ">
                    <th>ชื่อ</th>
                    <th>นามสกุล</th>
                    <th>ที่อยู่</th>
                    <th>เลขบัตรประจำตัว</th>
                  </tr>
                </thead>
              </table>
        </div>
    </div>`

    Swal.fire({
        title: "ค้นหารายชื่อผู้ประกอบการ",
        html: swal_html,
        width: '80%',
        customClass: 'swal-height',
        showConfirmButton: false,
        closeOnConfirm: false,
        closeOnCancel: false
    });
}
function changeStatusNow(status) {
    now_status = status
}
function onClickStatustab(status, event, id) {
    now_status = status
    if (now_status != '' && now_personal != '') {
        if (now_status != 'ban' && now_status != 'report') {
            displayTableRequest()
            displayTableRequestAssistant()
        } else {
            displayReportTable()
        }

    }
    openCity(event, id)
}
//swicth display data
function swicthDisplay() {
    let check = document.getElementById('shot_detail_data').style.display === 'none'
    if (check) {
        document.getElementById('shot_detail_data').style.display = ''
        document.getElementById('full_detail_data').style.display = 'none'
        document.getElementById('show_item').style.display = ''
        document.getElementById('hide_item').style.display = 'none'
    } else {
        document.getElementById('shot_detail_data').style.display = 'none'
        document.getElementById('full_detail_data').style.display = ''
        document.getElementById('show_item').style.display = 'none'
        document.getElementById('hide_item').style.display = ''
    }
}
function getRequestByPersonalIdAndStatus(personal_id) {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/get/request/owner/${personal_id}/${now_status}`).then((result) => {
            requestDataList = result.data
            resolve(result.data);
        })
    })
}
function getTableReport(personal_id) {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/get/list/complaint/id/${personal_id}`).then((result) => {
            reportDataList = result.data
            console.log(reportDataList)
            resolve(result.data);
        })
    })
}
function getRequestByPersonalIdAndStatusAssistant(personal_id) {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/get/request/owner/${personal_id}/${now_status}/assistant`).then((result) => {
            resolve(result.data);
        })
    })
}
function displayTableRequest() {
    getRequestByPersonalIdAndStatus(now_personal).then((data) => {
        console.log(requestDataList)
        createTableRequest(data)
    })
}
function displayReportTable() {
    getTableReport(now_personal).then((data) => {
        console.log(requestDataList)
        createTableReport(data)
    })
}
function displayTableRequestAssistant() {
    if (now_status != 'transfer') {
        getRequestByPersonalIdAndStatusAssistant(now_personal).then((data) => {
            console.log(requestDataList)
            createTableRequestAssistant(data)
        })
    }
}
function createTableRequestAssistant(data) {
    console.log(data)
    if (now_status != 'transfer') {
        var tbl = document.getElementById(now_status + '_assistant_table');
        if (tbl.getElementsByTagName("tbody")[0] != null || tbl.getElementsByTagName("tbody")[0] != undefined) {
            tbl.removeChild(tbl.getElementsByTagName("tbody")[0])
        }
        var tblBody = document.createElement('tbody')
        // style="height: 17vw;  text-align: center;"
        tblBody.style.height = '17vw'
        tblBody.style.textAlign = 'center'
        for (var i = 0; i < data.length; i++) {
            // creates a table row
            var row = document.createElement("tr");
            row.oncontextmenu = 'markList(this)'
            row.onmouseover = "resetActiveRightClick()"
            row.classList.add('expire-menu')
            //row index = this.rowIndex
            // row.onclick = function () { showItem(data[this.rowIndex - 1]) }

            for (var j = 0; j < 7; j++) {
                console.log(j)
                var cell = document.createElement("td");
                if (j === 0) {
                    //year
                    let temp_date = data[i].REQUEST_DATE_SUBMISSION + ''
                    //02-01-2563
                    let temp_array = temp_date.split('-')
                    let year = temp_array[2].trim()
                    var cellText = document.createTextNode(year);
                } else if (j === 1) {
                    //menu
                    var cellText = document.createTextNode(data[i].REQUEST_MENU);
                } else if (j === 2) {
                    //order
                    var cellText = document.createTextNode(`${data[i].REQUEST_NO}/${data[i].REQUEST_YEAR}`);
                } else if (j === 3) {
                    // name owner
                    let titel_t = data[i].PERSONAL_TITLE === null ? '' : data[i].PERSONAL_TITLE
                    let name_t = data[i].PERSONAL_NAME === null ? '' : data[i].PERSONAL_NAME
                    let surname_t = data[i].PERSONAL_SURNAME === null ? '' : data[i].PERSONAL_SURNAME
                    let text = `${titel_t} ${name_t} ${surname_t}`
                    var cellText = document.createTextNode(text);

                } else if (j === 4) {
                    //end start
                    if (data[i].REQUEST_DATE_ISSUED != null && data[i].REQUEST_DATE_ISSUED != '' && data[i].REQUEST_STATUS != 'approval' && data[i].REQUEST_STATUS != 'wait') {
                        let temp_date = data[i].REQUEST_DATE_ISSUED + ''
                        //02-01-2563
                        let temp_array = temp_date.split('-')
                        let temp_montn = parseInt(temp_array[1])

                        let text = `${parseInt(temp_array[0])} ${numToMonth[temp_montn]} ${temp_array[2]}`
                        var cellText = document.createTextNode(text);
                    } else {
                        var cellText = document.createTextNode('-');
                    }
                } else if (j === 5) {
                    //end date
                    if (data[i].REQUEST_DATE_EXPIRED != null && data[i].REQUEST_DATE_EXPIRED != '' && data[i].REQUEST_STATUS != 'approval' && data[i].REQUEST_STATUS != 'wait') {
                        let temp_date = data[i].REQUEST_DATE_EXPIRED + ''
                        //02-01-2563
                        let temp_array = temp_date.split('-')
                        let temp_montn = parseInt(temp_array[1])

                        let text = `${parseInt(temp_array[0])} ${numToMonth[temp_montn]} ${temp_array[2]}`
                        var cellText = document.createTextNode(text);
                    } else {
                        var cellText = document.createTextNode('-');
                    }
                } else {
                    // date exp count
                    if (now_status === 'expire') {
                        var cellText = document.createTextNode('หมดอายุแล้ว');
                    } else if (now_status === 'cancel') {
                        var cellText = document.createTextNode('ยกเลิกแล้ว');
                    } else {
                        if (data[i].REQUEST_DATE_EXPIRED != null && data[i].REQUEST_STATUS != 'approval' && data[i].REQUEST_STATUS != 'wait') {
                            let daysBetween = data[i].COUNT_DATE_EXPIRE
                            if (daysBetween < 0) {
                                text = 'หมดอายุ'
                            } else {
                                text = 'เหลืออีก ' + daysBetween + ' วัน'
                            }

                            var cellText = document.createTextNode(text);
                        } else {
                            var cellText = document.createTextNode('-');
                        }
                    }
                }
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            tblBody.appendChild(row);
        }
        console.log(tblBody)
        tbl.appendChild(tblBody);
    }
}
function setPageReport(index) {
    setDataItemReport(index)
    viewPageReport('setId')
}
function createTableReport(data) {
    console.log(data)
    var tbl = document.getElementById(getTableIdTableByStatus(now_status));
    if (tbl.getElementsByTagName("tbody")[0] != null || tbl.getElementsByTagName("tbody")[0] != undefined) {
        tbl.removeChild(tbl.getElementsByTagName("tbody")[0])
    }
    var tblBody = document.createElement('tbody')
    // style="height: 17vw;  text-align: center;"
    tblBody.style.height = '17vw'
    tblBody.style.textAlign = 'center'
    for (var i = 0; i < data.length; i++) {
        // creates a table row
        var row = document.createElement("tr");
        row.onclick = function () {
            setPageReport(reportDataList[this.rowIndex - 1])
        }
        if (now_status != 'ban') {
            if (data[i].COMPLAINT_DATE_END === null) {
                for (var j = 0; j < 3; j++) {
                    var cell = document.createElement("td");
                    if (j === 0) {
                        var cellText = document.createTextNode(data[i].COMPLAINT_ID);
                    } else if (j === 1) {
                        var cellText = document.createTextNode(data[i].COMPLAINT_TYPE);
                    } else {
                        let temp_date = data[i].COMPLAINT_DATE_SUBMISSION + ''
                        //02-01-2563
                        let temp_array = temp_date.split('-')
                        let temp_montn = parseInt(temp_array[1])

                        let text = `${parseInt(temp_array[0])} ${numToMonth[temp_montn]} ${temp_array[2]}`
                        var cellText = document.createTextNode(text);
                    }
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                }
            }
        } else {
            if (data[i].COMPLAINT_DATE_END != null) {
                for (var j = 0; j < 4; j++) {
                    var cell = document.createElement("td");
                    if (j === 0) {
                        var cellText = document.createTextNode(data[i].COMPLAINT_ID);
                    } else if (j === 1) {
                        var cellText = document.createTextNode(`${data[i].REQUEST_NO}/${data[i].REQUEST_YEAR}`);
                    } else if (j === 2) {
                        let temp_date = data[i].COMPLAINT_DATE_START + ''
                        //02-01-2563
                        let temp_array = temp_date.split('-')
                        let temp_montn = parseInt(temp_array[1])

                        let text = `${parseInt(temp_array[0])} ${numToMonth[temp_montn]} ${temp_array[2]}`
                        var cellText = document.createTextNode(text);
                    } else {
                        let temp_date = data[i].COMPLAINT_DATE_END + ''
                        //02-01-2563
                        let temp_array = temp_date.split('-')
                        let temp_montn = parseInt(temp_array[1])

                        let text = `${parseInt(temp_array[0])} ${numToMonth[temp_montn]} ${temp_array[2]}`
                        var cellText = document.createTextNode(text);
                    }
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                }
            }
        }
        tblBody.appendChild(row);
    }
    console.log(tblBody)
    tbl.appendChild(tblBody);
}
function createTableRequest(data) {
    console.log(data)
    var tbl = document.getElementById(getTableIdTableByStatus(now_status));
    if (tbl.getElementsByTagName("tbody")[0] != null || tbl.getElementsByTagName("tbody")[0] != undefined) {
        tbl.removeChild(tbl.getElementsByTagName("tbody")[0])
    }
    var tblBody = document.createElement('tbody')
    // style="height: 17vw;  text-align: center;"
    tblBody.style.height = '17vw'
    tblBody.style.textAlign = 'center'
    for (var i = 0; i < data.length; i++) {
        // creates a table row
        var row = document.createElement("tr");
        row.oncontextmenu = 'markList(this)'
        row.onmouseover = "resetActiveRightClick()"
        if (now_status === 'active') {
            if (data[i].REQUEST_MENU != 'หนังสือรับรองการแจ้งจัดตั้งสถานที่จำหน่ายอาหาร' && data[i].REQUEST_MENU != 'หนังสือรับรองการแจ้งจัดตั้งสถานที่สะสมอาหาร') {
                row.classList.add(now_status + '-menu')
            } else {
                row.classList.add(now_status + '-menu-extra')
            }
        } else {
            row.classList.add(now_status + '-menu')
        }


        //row index = this.rowIndex
        // row.onclick = function () { showItem(data[this.rowIndex - 1]) }

        for (var j = 0; j < 6; j++) {
            console.log(j)
            var cell = document.createElement("td");
            if (j === 0) {
                //year
                let temp_date = data[i].REQUEST_DATE_SUBMISSION + ''
                //02-01-2563
                let temp_array = temp_date.split('-')
                let year = temp_array[2].trim()
                var cellText = document.createTextNode(year);
            } else if (j === 1) {
                //menu
                var cellText = document.createTextNode(data[i].REQUEST_MENU);
            } else if (j === 2) {
                //order
                var cellText = document.createTextNode(`${data[i].REQUEST_NO}/${data[i].REQUEST_YEAR}`);
            } else if (j === 3) {
                if (data[i].REQUEST_DATE_ISSUED != null && data[i].REQUEST_DATE_ISSUED != '' && data[i].REQUEST_STATUS != 'approval' && data[i].REQUEST_STATUS != 'wait') {
                    let temp_date = data[i].REQUEST_DATE_ISSUED + ''
                    //02-01-2563
                    let temp_array = temp_date.split('-')
                    let temp_montn = parseInt(temp_array[1])
                    let text = `${parseInt(temp_array[0])} ${numToMonth[temp_montn]} ${temp_array[2]}`
                    var cellText = document.createTextNode(text);
                } else {
                    var cellText = document.createTextNode('-');
                }
            } else if (j === 4) {
                //end date
                if (data[i].REQUEST_DATE_EXPIRED != null && data[i].REQUEST_DATE_EXPIRED != '' && data[i].REQUEST_STATUS != 'approval' && data[i].REQUEST_STATUS != 'wait') {
                    let temp_date = data[i].REQUEST_DATE_EXPIRED + ''
                    //02-01-2563
                    let temp_array = temp_date.split('-')
                    let temp_montn = parseInt(temp_array[1])

                    let text = `${parseInt(temp_array[0])} ${numToMonth[temp_montn]} ${temp_array[2]}`
                    var cellText = document.createTextNode(text);
                } else {
                    var cellText = document.createTextNode('-');
                }
            } else {
                // date exp count
                if (now_status === 'expire') {
                    var cellText = document.createTextNode('หมดอายุแล้ว');
                } else if (now_status === 'cancel') {
                    var cellText = document.createTextNode('ยกเลิกแล้ว');
                } else {
                    if (data[i].REQUEST_DATE_EXPIRED != null && data[i].REQUEST_STATUS != 'approval' && data[i].REQUEST_STATUS != 'wait') {
                        let daysBetween = data[i].COUNT_DATE_EXPIRE
                        if (daysBetween < 0) {
                            text = 'หมดอายุ'
                        } else {
                            text = 'เหลืออีก ' + daysBetween + ' วัน'
                        }
                        var cellText = document.createTextNode(text);
                    } else {
                        var cellText = document.createTextNode('-');
                    }
                }
            }
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        tblBody.appendChild(row);
    }
    console.log(tblBody)
    tbl.appendChild(tblBody);
}
function getTableIdTableByStatus(status) {
    switch (status) {
        case 'wait':
            return 'wait_table'
        case 'approval':
            return 'approval_table'
        case 'active':
            return 'active_table'
        case 'transfer':
            return 'transfer_table'
        case 'expire':
            return 'date_exp_table'
        case 'ban':
            return 'ban_table'
        case 'report':
            return 'report_table'
        default: //cancel
            return 'cancel_table'
    }
}
function setDataItem(data) {
    inRequest.status = checkNullReturn(data.REQUEST_STATUS)
    inRequest.status_before = checkNullReturn(data.REQUEST_STATUS_BEFORE)
    inRequest.last_update = checkNullReturn(data.REQUEST_LAST_UPDATE)
    inRequest.user_update = checkNullReturn(data.REQUEST_USER_UPDATE)
    inRequest.date_approve = checkNullReturn(data.REQUEST_DATE_APPROVE)
    inRequest.staff_id_approve = checkNullReturn(data.STAFF_ID_APPROVE)
    inRequest.receipt_fine = checkNullReturn(data.REQUEST_RECEIPT_FINE)
    inRequest.receipt_fee = checkNullReturn(data.REQUEST_RECEIPT_FEE)
    inRequest.receipt_total = checkNullReturn(data.REQUEST_RECEIPT_TOTAL)
    inRequest.receipt_date = checkNullReturn(data.REQUEST_RECEIPT_DATE)
    inRequest.receipt_fine_year_2 = checkNullReturn(data.REQUEST_RECEIPT_FINE_YEAR_2)
    inRequest.receipt_fee_year_2 = checkNullReturn(data.REQUEST_RECEIPT_FEE_YEAR_2)
    inRequest.receipt_total_year_2 = checkNullReturn(data.REQUEST_RECEIPT_TOTAL_YEAR_2)
    inRequest.receipt_date_year_2 = checkNullReturn(data.REQUEST_RECEIPT_DATE_YEAR_2)
    inRequest.receipt_fine_year_3 = checkNullReturn(data.REQUEST_RECEIPT_FINE_YEAR_3)
    inRequest.receipt_fee_year_3 = checkNullReturn(data.REQUEST_RECEIPT_FEE_YEAR_3)
    inRequest.receipt_total_year_3 = checkNullReturn(data.REQUEST_RECEIPT_TOTAL_YEAR_3)
    inRequest.receipt_date_year_3 = checkNullReturn(data.REQUEST_RECEIPT_DATE_YEAR_3)
    inRequest.staff_id_money = checkNullReturn(data.STAFF_ID_MONEY)
    inRequest.date_issued = checkNullReturn(data.REQUEST_DATE_ISSUED)
    inRequest.date_expired = checkNullReturn(data.REQUEST_DATE_EXPIRED)
    inRequest.delete_logic = checkNullReturn(data.REQUEST_DELETE_LOGIC)
    inRequest.is_deleted = checkNullReturn(data.REQUEST_IS_DELETED)
    inRequest.no = checkNullReturn(data.REQUEST_NO)
    inRequest.year = checkNullReturn(data.REQUEST_YEAR)
    inRequest.menu = data.REQUEST_MENU
    inRequest.establishment_id = data.ESTABLISHMENT_ID
    inRequest.establishment_name = data.ESTABLISHMENT_NAME === null || data.ESTABLISHMENT_NAME === undefined ? 'ไม่มีชื่อร้าน' : data.ESTABLISHMENT_NAME
    inRequest.date_exp_count = data.COUNT_DATE_EXPIRE
}
function setDataItemReport(data) {
    inComplaint.id = checkNullReturn(data.COMPLAINT_ID)
    inComplaint.year = checkNullReturn(data.COMPLAINT_YEAR)
    inComplaint.type = checkNullReturn(data.COMPLAINT_TYPE)
    inComplaint.date_submission = checkNullReturn(data.COMPLAINT_DATE_SUBMISSION)
    inComplaint.request_no = checkNullReturn(data.REQUEST_NO)
    inComplaint.request_year = checkNullReturn(data.REQUEST_YEAR)
}
function checkNullReturn(item) {
    let temp = item === null ? '' : item
    return temp
}
function openPageReport() {
    window.open('../utilities/petition.html?id=' + inPersonal.id, '_blank');
}
function viewPageReport(id, id_menu, id_request) {
    console.log(this)
    if (id === undefined) {
        id = `''`
        window.open('../utilities/petition.html?id=' + id_menu + '&r_id=' + id_request, '_blank');
    } else {
        window.open('../utilities/petition.html?com_id=' + inComplaint.id + '&com_year=' + inComplaint.year, '_blank');
    }
}