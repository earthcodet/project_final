let list_data = []
let selectImageFile_report = 0
let maxImageFile_report = 8
var totalFiles_report = [];
let type = getUrlVars().id === undefined ? 1 : 2
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

function startForm() {
    let temp_id = getUrlVars()
    getView(temp_id)
}

function getView(value_t) {
    let type_start = 1
    if (value_t.com_id != undefined && value_t.com_year != undefined) {
        getComData(value_t.com_id, value_t.com_year).then((raw_data) => {
            if (raw_data.length != 0) {
                setPDATA(raw_data[0], 1)
                if (p_data.request_id != '') {
                    type_start = 2// form สอง
                    type = 2
                } else {
                    type_start = 1 // form แรก
                    type = 1
                }
                displayBlock(type_start, 1)
                setUIDataCom(type_start, 1)
                if (p_data.total_image != 0) {
                    getImage(p_data.id).then((data_image) => {
                        list_image = data_image
                        console.log('set 1')
                        setUIDataCom(type_start, 2)
                    })
                }
            }
        })
    }
    if (value_t.id != undefined && value_t.r_id != undefined) {
        let r_no = value_t.r_id.slice(0, 6)
        let r_year = value_t.r_id.slice(6, value_t.r_id.length)
        setCOMProfile(value_t.id, r_no, r_year)
        getPersonal(p_data.personal_id).then((data_profile) => {
            if (data_profile.length != 0) {
                displayBlock(2)
                setPDATA(data_profile[0], 2)
                setUIDataCom(2)
            }
        })
    }
    if (value_t.id != undefined && value_t.r_id === undefined) {
        console.log('working')
        console.log(p_data.personal_id)
        p_data.personal_id = value_t.id

        getPersonal(p_data.personal_id).then((data_profile) => {
            if (data_profile.length != 0) {
                displayBlock(1)
                setPDATA(data_profile[0], 2)
                setUIDataCom(3)
                document.getElementById('c_id').disabled = false
            }
        })
    }
}

function setPDATA(data, type) {
    if (type === 1) {
        let t_ttile = data.PERSONAL_TITLE
        let t_name = data.PERSONAL_NAME
        let t_surname = data.PERSONAL_SURNAME
        name_user = `${t_ttile} ${t_name} ${t_surname}`
        p_data = {
            id: data.COMPLAINT_ID,
            year: data.COMPLAINT_YEAR,
            personal_id: data.PERSONAL_ID,
            request_id: data.REQUEST_NO === null ? '' : data.REQUEST_NO,
            request_year: data.REQUEST_YEAR === null ? '' : data.REQUEST_YEAR,
            date_submission: data.COMPLAINT_DATE_SUBMISSION,
            type: data.COMPLAINT_TYPE === null ? '' : data.COMPLAINT_TYPE,
            status: data.COMPLAINT_STATUS === null ? '' : data.COMPLAINT_STATUS,
            date_start: data.COMPLAINT_DATE_START === null ? '' : data.COMPLAINT_DATE_START,
            date_end: data.COMPLAINT_DATE_END === null ? '' : data.COMPLAINT_DATE_END,
            total_image: data.COMPLAINT_TOTAL_IMAGE,
            is_deleted: data.COMPLAINT_IS_DELETED,
            status_insert: 'NEW'
        }
    } else {
        //type
        console.log(data)
        let t_ttile = data.PERSONAL_TITLE
        let t_name = data.PERSONAL_NAME
        let t_surname = data.PERSONAL_SURNAME
        name_user = `${t_ttile} ${t_name} ${t_surname}`
    }
}
function displayBlock(type) {
    if (type === 1) {
        document.getElementById('block_no1').style.display = ''
        document.getElementById('button_block_2').style.display = 'none'
        document.getElementById('block_no1').style.display = ''
        document.getElementById('block_no2').style.display = 'none'
    } else {
        document.getElementById('button_block_1').style.display = 'none'
        document.getElementById('button_block_2').style.display = ''
        document.getElementById('block_no1').style.display = 'none'
        document.getElementById('block_no2').style.display = ''
        // setRequestId()
    }
}
function setUIDataCom(type, type_step) {

    if (type_step === 1) {
        disableMenuAll()
        document.getElementById('c_id').value = p_data.id
        document.getElementById('c_id').disabled = true
        document.getElementById('btn_name').disabled = true
        document.getElementById('datepicker2').value = p_data.date_submission
        document.getElementById('full_name_op').value = name_user
        if (type === 1) {
            let id = ['t_1', 't_2', 't_3', 't_4', 't_5', 't_6', 't_7', 't_8']
            let name = ['สุขลักษณะด้านอาหาร', 'กลิ่น', 'สารเคมี', 'ขยะมูลฝอย/สิ่งปฏิกูล', 'เสียงดัง', 'แสง รังสี', 'ควัน เถ้า เขม่า ฝุ่นละออง']
            for (let i = 0; i < name.length; i++) {
                console.log(`1. ${p_data.type}`)
                console.log(`1. ${name[i]}`)
                if (p_data.type === name[i]) {
                    let id_s = id[i]
                    if (document.getElementById(id_s) != undefined) {
                        document.getElementById(id_s).checked = true
                    }
                    break;
                } else {
                    if (i === name.length - 1) {
                        if (p_data.type != 'ไม่มีประเภท') {
                            document.getElementById('t_8').checked = true
                            document.getElementById('t_e').value = p_data.type
                        }
                    }
                }
            }
            if (p_data.status === 'Y') {
                document.getElementById('w_2').checked = true
            }
            if (p_data.status === 'N') {
                //p_data.status === 'N'
                document.getElementById('w_1').checked = true
            }
        } else {
            document.getElementById('request_id_report').value = `${p_data.request_id}/${p_data.request_year}`
            document.getElementById('datepicker4').value = p_data.date_start
            document.getElementById('datepicker3').value = p_data.date_end
            document.getElementById('c_id').disabled = false
           
        }
        if (p_data.total_image === 0) {
            if (p_data.is_deleted === 'Y') {
                disableMenuAll()
            }
            if (p_data.is_deleted === 'N') {
                changeStatusMenuData()
            }
        }

    } else if (type_step === 2) {
        if (list_image.length != 0) {
            createImages(list_image).then((data_image_status) => {
                if (p_data.is_deleted === 'Y') {
                    disableMenuAll()
                }
                if (p_data.is_deleted === 'N') {
                    changeStatusMenuData()
                }
            })
        }

    } else {
        document.getElementById('c_id').value = p_data.id
        document.getElementById('c_id').disabled = true
        document.getElementById('btn_name').disabled = true
        document.getElementById('datepicker2').value = p_data.date_submission
        document.getElementById('full_name_op').value = name_user
        if (type === 1) {
            let id = ['t_1', 't_2', 't_3', 't_4', 't_5', 't_6', 't_7', 't_8']
            let name = ['สุขลักษณะด้านอาหาร', 'กลิ่น', 'สารเคมี', 'ขยะมูลฝอย/สิ่งปฏิกูล', 'เสียงดัง', 'แสง รังสี', 'ควัน เถ้า เขม่า ฝุ่นละออง']
            for (let i = 0; i < name.length; i++) {
                console.log(`1. ${p_data.type}`)
                console.log(`1. ${name[i]}`)
                if (p_data.type === name[i]) {
                    let id_s = id[i]
                    if (document.getElementById(id_s) != undefined) {
                        document.getElementById(id_s).checked = true
                    }
                    break;
                } else {
                    if (i === name.length - 1) {
                        if (p_data.type != 'ไม่มีประเภท') {
                            document.getElementById('t_8').checked = true
                            document.getElementById('t_e').value = p_data.type
                        }
                    }
                }
            }
            if (p_data.status === 'Y') {
                document.getElementById('w_2').checked = true
            }
            if (p_data.status === 'N') {
                //p_data.status === 'N'
                document.getElementById('w_1').checked = true
            }
        }
        if (type === 2) {
            document.getElementById('request_id_report').value = `${p_data.request_id}/${p_data.request_year}`
            document.getElementById('datepicker4').value = p_data.date_start
            document.getElementById('datepicker3').value = p_data.date_end
            document.getElementById('c_id').disabled = false
            changeSaveMenu()
        }
        if (type === 3) {
            changeSaveMenu()
        }
        if (list_image.length != 0) {
            createImages(list_image)
        }
        if (p_data.is_deleted === 'Y') {
            disableMenuAll()
        }
        if (p_data.is_deleted === 'N') {
            changeStatusMenuData()
        }
    }
}
function getPersonal(id) {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/get/personal/profile/${id}`).then((result) => {
            return resolve(result.data);
        })
    })
}
function getImage(id) {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/get/image/comlaint/${id}`).then((result) => {
            return resolve(result.data);
        })
    })
}
function getComData(id, year) {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/get/cmplaint/id/${id}/${year}`).then((result) => {
            list_data = result.data
            return resolve(result.data);
        })
    })
}
function setCOMProfile(p_id, r_no, r_year) {
    p_data.request_id = r_no
    p_data.request_year = r_year
    p_data.personal_id = p_id
    document.getElementById('request_id_report').value = `${r_no}/${r_year}`
}
function imageSelect(evt) {
    var files = evt.target.files;
    for (var i = 0, f; f = files[i]; i++) {
        if (!f.type.match('image.*')) {
            continue;
        }
        if (selectImageFile_report < maxImageFile_report) {
            totalFiles_report.push(f)
            var reader = new FileReader();
            reader.onload = (function (theFile) {
                return function (e) {
                    var span = document.createElement('span');
                    span.innerHTML =
                        [
                            `<div class="col" style="width: 25%; height: 100%; ">
                <img 
                width=100% 
                height=85% 
                src="`
                            , e.target.result,
                            '" title="', escape(theFile.name), '"/>'
                            , "<br><button type='button' class='delete image'" +
                            "onclick='deleteImage()' >ลบรูปภาพนี้</button>", "</div>"
                        ].join('');

                    document.getElementById('outputImage_report').insertBefore(span, null);
                };
            })(f);
            reader.readAsDataURL(f);
            selectImageFile_report = selectImageFile_report + 1
        }
    }
}
function deleteImage() {
    var index = Array.from(document.getElementById('outputImage_report').children).indexOf(event.target.parentNode.parentNode)
    document.querySelector("#outputImage_report").removeChild(document.querySelectorAll('#outputImage_report span')[index]);
    totalFiles_report.splice(index, 1);
    document.getElementById('uploadFile').value = ''
    selectImageFile_report = selectImageFile_report - 1
}
function setOPcom(data) {
    p_data.personal_id = data.PERSONAL_ID
    let t_ttile = data.PERSONAL_TITLE === null ? '' : data.PERSONAL_TITLE
    let t_name = data.PERSONAL_NAME
    let t_surname = data.PERSONAL_SURNAME === null ? '' : data.PERSONAL_SURNAME
    let t_fullname = `${t_ttile} ${t_name} ${t_surname}`
    document.getElementById('full_name_op').value = t_fullname
}
function openInpustEst() {
    console.log('aaa')
    console.log(document.getElementById('t_8').checked)
    if (document.getElementById('t_8').checked === true) {
        document.getElementById('t_e').value = ''
        document.getElementById('t_e').disabled = false
    } else {
        document.getElementById('t_e').value = ''
        document.getElementById('t_e').disabled = true
    }

}
function createGroupData() {
    p_data.id = document.getElementById('c_id').value.trim()
    let temp_text = document.getElementById('request_id_report').value
    let new_temp = temp_text.split('/')
    if (new_temp.length != 1) {
        p_data.request_id = new_temp[0]
        p_data.request_year = new_temp[1]
    }
    p_data.date_submission = document.getElementById('datepicker2').value.trim()
    p_data.type = getValueType()
    let w_c_1 = document.getElementById('w_1').checked 
    let w_c_2 = document.getElementById('w_2').checked 
    if(w_c_1){
        p_data.status = 'N'
    }else if(w_c_2){
        p_data.status = 'N'
    }else{
        p_data.status = 'M'
    }
    p_data.date_start = document.getElementById('datepicker4').value.trim()
    p_data.date_end = document.getElementById('datepicker3').value.trim()
    p_data.total_image = totalFiles_report.length
}
function getValueType() {
    let id = ['t_1', 't_2', 't_3', 't_4', 't_5', 't_6', 't_7', 't_8']
    let name = ['สุขลักษณะด้านอาหาร', 'กลิ่น', 'สารเคมี', 'ขยะมูลฝอย/สิ่งปฏิกูล', 'เสียงดัง', 'แสง รังสี', 'ควัน เถ้า เขม่า ฝุ่นละออง']
    for (let i = 0; i < id.length; i++) {
        let check = document.getElementById(id[i]).checked
        if (i != 7) {
            if (check) {
                return name[i]
            }
        } else {
            if (check) {
                return document.getElementById('t_e').value.trim()
            } else {
                return 'ไม่มีประเภท'
            }
        }
    }
}
function createArrayInsert() {
    let arrayItem = []
    arrayItem.push(p_data) // request 0
    let object = {
        name: '',
        type: '',
        data: ''
    }
    let imageData = []
    for (let i = 0; i < totalFiles_report.length; i++) {
        if (totalFiles_report[i].COMPLAINT_IMAGE_TYPE != undefined) {
            object.type = totalFiles_report[i].COMPLAINT_IMAGE_TYPE
        }
        imageData.push(object)
        object = {
            name: '',
            type: '',
            data: ''
        }
    }
    arrayItem.push(imageData)
    return arrayItem
}
function insertData() {
    createGroupData()
    let item = createArrayInsert()
    console.log(item)
    return new Promise((resolve, reject) => {
        var formData = new FormData();
        for (var i = 0; i < totalFiles_report.length; i++) {
            if (totalFiles_report[i].COMPLAINT_IMAGE_DATA === undefined) {
                let image = totalFiles_report[i];
                formData.append('files' + i, image);
            } else {
                formData.append("files" + i, base64toBlob(totalFiles_report[i].COMPLAINT_IMAGE_DATA_BASE64, `image/${totalFiles_report[i].COMPLAINT_IMAGE_TYPE}`));
            }
        }
        formData.append("gropData", JSON.stringify(item));
        selectImageFile = 0
        axios.post("http://localhost:5000/insert/complaint", formData, {
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
function checkInputInsert(type) {
    resetAlertInput()

    //zone 1
    let c_1 = document.getElementById('c_id').value.trim().length === 0
    let c_2 = document.getElementById('datepicker2').value.trim().length === 0
    let c_3 = document.getElementById('full_name_op').value.trim().length === 0

    if (type === 1) {
        let c_4 = document.getElementById('datepicker4').value.trim().length === 0
        let c_5 = document.getElementById('datepicker3').value.trim().length === 0
        setAlertInput(c_1, c_2, c_3, c_4, c_5)

        if (c_1 || c_2 || c_3 || c_4 || c_5) {
            return false
        } else {
            return true
        }
    } else {
        console.log(c_1)
        console.log(c_2)
        console.log(c_3)
        setAlertInput(c_1, c_2, c_3)
        if (c_1 || c_2 || c_3) {
            return false
        } else {
            return true
        }
    }


}
function resetAlertInput() {
    document.getElementById('c_id').classList.remove("alertInput");
    document.getElementById('datepicker2').classList.remove("alertInput");
    document.getElementById('full_name_op').classList.remove("alertInput");
    document.getElementById('datepicker4').classList.remove("alertInput");
    document.getElementById('datepicker3').classList.remove("alertInput");
}
function setAlertInput(c_1, c_2, c_3, c_4, c_5) {
    if (c_1 === true) {
        document.getElementById("c_id").classList.add("alertInput");
    }
    if (c_2 === true) {
        document.getElementById("datepicker2").classList.add("alertInput");
    }
    if (c_3 === true) {
        document.getElementById("full_name_op").classList.add("alertInput");
    }
    if (c_4 === true) {
        document.getElementById("datepicker4").classList.add("alertInput");
    }
    if (c_5 === true) {
        document.getElementById("datepicker3").classList.add("alertInput");
    }
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
//IMAGE
function createImages(image) {
    return new Promise((resolve, reject) => {
        deleteImageAll()
        totalFiles_report = []
        for (let i = 0; i < image.length; i++) {
            console.log(`image i = ${i}`)
            totalFiles_report.push(image[i])
            selectImageFile_report = selectImageFile_report + 1
            var span = document.createElement('span');
            span.innerHTML =
                [
                    `<div class="col" style="width: 25%; height: 100%; ">
    <img 
    width=100% 
    height=85% 
    src="`
                    , `data:image/${image[i].COMPLAINT_IMAGE_TYPE};base64,${image[i].COMPLAINT_IMAGE_DATA_BASE64}`,
                    '" title="', escape(image[i].COMPLAINT_IMAGE_NAME), '"/>'
                    , "<br><button type='button' class='delete image'" +
                    "onclick='deleteImage()' >ลบรูปภาพนี้</button>", "</div>"
                ].join('');

            document.getElementById('outputImage_report').insertBefore(span, null);
        }
        console.log(totalFiles_report)
        return resolve(true)
    })
}
function deleteImageAll() {
    if (document.getElementById('outputImage_report') != undefined) {
        console.log('delete image all')
        document.getElementById('outputImage_report').textContent = ''
        totalFiles_report = []
        document.getElementById('uploadFile').value = ''
        selectImageFile_report = 0
    }
}
startForm()