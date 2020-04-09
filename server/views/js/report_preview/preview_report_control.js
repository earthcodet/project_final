let list_request_type = []
function showprint() {
    let text_url = `../report/report_crematory_preveiw.html`
    let text_value = document.getElementById('type_search').value.trim()
    let text_menu = document.getElementById('type_menu').value
    let text_id = ''
    for (let i = 0; i < list_request_type.length; i++) {
        if (text_value === list_request_type[i].REQUEST_TYPE_NAME && list_request_type[i].REQUEST_TYPE_MENU === text_menu) {
            text_id = list_request_type[i].REQUEST_TYPE_ID
            break;
        }
    }
    if (text_id === '') {
        Swal.fire({
            html: "ประเภทไม่ถูกต้อง",
            icon: "error",
            confirmButtonColor: "#009688"
        })
    } else {
        let date_start = document.getElementById('datepicker1').value.trim()
        let date_end = document.getElementById('datepicker2').value.trim()
        if (date_start.length === 0 || date_end.length === 0) {
            Swal.fire({
                html: "กรุณาเลือกวันที่",
                icon: "error",
                confirmButtonColor: "#009688"
            })
        } else {
            text_url = `${text_url}?r_id=${text_id}&date_start=${formatToGetDate(date_start)}&date_end=${formatToGetDate(date_end)}&menu=${text_menu}`
            window.open(text_url, '_blank');
        }
    }
}

function formatToGetDate(value) {
    //Start Ex dd-mm-yyyy
    let temp_date_start = value
    let temp_array = value.split('-')
    let d = temp_array[0]
    let m = temp_array[1]
    let y = parseInt(temp_array[2]) - 543
    //End Ex yyyy-mm-dd
    return `${y}-${m}-${d}`
}
function startfrom() {
    getRequestType().then((data_test) => {
        addRequestTypeToDatalist()
    })
}

function getRequestType() {
    return new Promise((resolve, reject) => {
        list_request_type = []
        axios.get(`http://localhost:5000/requesttype/get/all`).then((result) => {
            list_request_type = result.data
            resolve(result.data);
        })
    })
}

function addRequestTypeToDatalist() {
    const list = document.getElementById('brow')
    for (let i = 0; i < list_request_type.length; i++) {
        let option = document.createElement('option');
        option.value = list_request_type[i].REQUEST_TYPE_NAME
        if (list_request_type[i].REQUEST_TYPE_MENU != 'ใบอนุญาตจำหน่ายสินค้าในที่หรือทางสาธารณะ') {
            option.disabled = true
        }
        list.appendChild(option);
    }
}
function checkRequestType(type, id) {
    if (list_request_type[id].REQUEST_TYPE_MENU === type) {
        return true
    }

}
function searchFilter(value) {
    var select, i, lengths;
    select = document.getElementById('brow');
    lengths = select.options.length;
    console.log(lengths)
    document.getElementById('type_search').value = ''
    for (i = 0; i < lengths; i++) {
        let t_option = select.options[i]
        if (checkRequestType(value, i) != undefined) {
            t_option.disabled = false;
        } else {
            t_option.disabled = true
        }
    }
}
startfrom()