//รอ ไปแยก
let filesPdf = null
let selectImageFile = 0
let maxImageFile = 8
let image_changed = false

//  check ว่ามีการอัพโหลดไฟล์หรือเปล่า
let file_is_uploaded = false

// function checkPhoneInput(tagId) {
//     var text = document.getElementById(tagId).value
//     text = text.replace(/(\d{3})(\d{7})/, "$1-$2");
//     document.getElementById(tagId).value = text
// }
var totalFiles = [];
function handleFileSelect(evt) {
    var files = evt.target.files;
    for (var i = 0, f; f = files[i]; i++) {
        if (!f.type.match('image.*')) {
            continue;
        }
        if (selectImageFile < maxImageFile) {
            image_changed = true
            console.log(`image_change ${image_changed}`)
            totalFiles.push(f)
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

                    document.getElementById('outputImage').insertBefore(span, null);
                };
            })(f);
            reader.readAsDataURL(f);
            selectImageFile = selectImageFile + 1
        }
    }
}
function pdfFile(evt) {
    filesPdf = evt.target.files[0];
    file_is_uploaded = true
}
function deleteImage() {
    image_changed = true
    var index = Array.from(document.getElementById('outputImage').children).indexOf(event.target.parentNode.parentNode)
    document.querySelector("#outputImage").removeChild(document.querySelectorAll('#outputImage span')[index]);
    totalFiles.splice(index, 1);
    document.getElementById('uploadFile').value = ''
    selectImageFile = selectImageFile - 1
}
function deleteImageAllRequest() {
    if (document.getElementById('outputImage') != undefined) {
        console.log('delete image all')
        document.getElementById('outputImage').textContent = ''
        totalFiles = []
        document.getElementById('uploadFile').value = ''
        selectImageFile = 0
    }
}
function inputNumberOnly(value, id) {
    console.log(`This is inputNumberOnly ${value} ${id}`)
    let temp_value = ''
    let temp_value_array = value.split('')
    console.log(temp_value_array)
    for (let i = 0; i < temp_value_array.length; i++) {
        console.log(`!isNaN(temp_value_array[${i}]) =>(${temp_value_array[i]}) {${!isNaN(temp_value_array[i])}}`)
        if (!isNaN(temp_value_array[i])) {
            console.log('item ' + i + '   ')
            temp_value = temp_value + temp_value_array[i]
        }
    }
    document.getElementById(id).value = temp_value
}
const month = {
    'มกราคม': 1,
    'กุมภาพันธ์': 2,
    'มีนาคม': 3,
    'เมษายน': 4,
    'พฤษภาคม': 5,
    'มิถุนายน': 6,
    'กรกฎาคม': 7,
    'สิงหาคม': 8,
    'กันยายน': 9,
    'ตุลาคม': 10,
    'พฤศจิกายน': 11,
    'ธันวาคม': 12
}
// sortTable //
function sortTable(n, id, type) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById(id);

    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            console.log(table.rows[i])
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (type === "date" && x != '-') {
                var tempdateX = x.innerHTML.split(' ')
                var tempdateY = y.innerHTML.split(' ')
                var dayX, dayY, monthX, monthY, yearX, yearY
                dayX = tempdateX[0]
                dayY = tempdateY[0]
                monthX = tempdateX[1]
                monthY = tempdateY[1]
                yearX = tempdateX[2]
                yearY = tempdateY[2]
                if (dir === "asc") {
                    if (yearX > yearY) {
                        shouldSwitch = true;
                        break;
                    } else if (yearX == yearY && month[monthX] > month[monthY]) {
                        shouldSwitch = true;
                        break;
                    } else if (yearX == yearY && month[monthX] == month[monthY] && dayX > dayY) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (yearX < yearY) {
                        shouldSwitch = true;
                        break;
                    } else if (yearX == yearY && month[monthX] < month[monthY]) {
                        shouldSwitch = true;
                        break;
                    } else if (yearX == yearY && month[monthX] == month[monthY] && dayX < dayY) {
                        shouldSwitch = true;
                        break;
                    }
                }
            } else if (type === "dateExp" && x != '-') {
                var tempX = x.innerHTML.split(' ')
                var tempY = y.innerHTML.split(' ')
                var dateX, dateY
                dateX = tempX[0]
                dateY = tempY[0]
                if (dir == "asc") {
                    if (dateX != 'หมดอายุ' && dateY != 'หมดอายุ') {
                        if (parseInt(dateX) > parseInt(dateY)) {
                            shouldSwitch = true;
                            break;
                        }
                    } else if (parseInt(tempX[1]) > parseInt(tempY[1])) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (dateX != 'หมดอายุ' && dateY != 'หมดอายุ') {
                        if (parseInt(dateX) < parseInt(dateY)) {
                            shouldSwitch = true;
                            break;
                        }
                    } else if (parseInt(tempX[1]) < parseInt(tempY[1])) {
                        shouldSwitch = true;
                        break;
                    }
                }
            } else {
                if (dir == "asc") {
                    if (x.innerHTML > y.innerHTML) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (x.innerHTML < y.innerHTML) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

// check phone //
function checkPhone(value, id, new_id) {

    let tempCheck = value.split("")
    if (tempCheck[0] === '-') {
        document.getElementById(id).value = '-'
        console.log('Item')
        if (new_id != undefined) {
            if (document.getElementById(new_id) != undefined) {
                document.getElementById(new_id).value = ''
                document.getElementById(new_id).disabled = true
            }
        }
    } else {
        if (new_id != undefined) {
            if (document.getElementById(new_id) != undefined) {
                document.getElementById(new_id).disabled = false
            }
        }

    }
    if (tempCheck[0] != '0' && tempCheck != '-') {
        document.getElementById(id).value = ''
    }
    for (let i = 1; i < tempCheck.length; i++) {
        if (i <= 10) {
            if (tempCheck[0] === '0') {
                if (tempCheck[1] === '0') {
                    document.getElementById(id).value = '0'
                }
                if (tempCheck[i] === '-') {
                    document.getElementById(id).value = value.slice(0, value.length - 1)
                }
            }
        }else{
            document.getElementById(id).value = value.slice(0, 10)
        }
    }
}

function formatPhone(value) {
    if ((value.length === 1 && value === '-') || (value.slice(0, 1) === '0' && value.slice(1, 2) != 0 && (value.length === 10 || value.length === 9) && !isNaN(value))) {
        return true
    } else {
        return false
    }
}

// format oderId //
function checkOrderNo(value, id) {
    let tempCheck = value.split("")
    // format_example = 0000007/63  length = 10
    let formatCheck = ''
    for (let i = 0; i < tempCheck.length; i++) {

        if (i === 7) {
            if (tempCheck[7] === '/') {
                formatCheck = formatCheck + tempCheck[i]
            }
        } else {
            if (!isNaN(tempCheck[i])) {
                formatCheck = formatCheck + tempCheck[i]
            }
        }
    }
    document.getElementById(id).value = formatCheck
}
//format date input 
function formatDate(value, id) {
    let tempCheck = value.split("")
    // format_example = 22-05-2549  length = 10 //01 2 34 5 6789
    let formatCheck = ''
    for (let i = 0; i < tempCheck.length; i++) {
        if (tempCheck[0] === '-') {
            formatCheck = '-'
        } else {
            if (i === 0) {
                if (tempCheck[0] != 0 && tempCheck[0] != 1 && tempCheck[0] != 2 && tempCheck[0] != 3) {
                    formatCheck = formatCheck
                } else {
                    formatCheck = formatCheck + tempCheck[0]
                }
            }
            else if (i === 1) {
                if (!isNaN(tempCheck[1]) && tempCheck[0] != 3) {
                    formatCheck = formatCheck + tempCheck[1] + '-'
                } else {
                    if (!isNaN(tempCheck[1])) {
                        if (tempCheck[0] == 3 && tempCheck[1] != 1 && tempCheck[0] == 3 && tempCheck[1] != 0) {
                            formatCheck = formatCheck
                        } else {
                            formatCheck = formatCheck + tempCheck[1] + '-'
                        }
                    }
                }
            }
            else if (i === 2 && tempCheck[2] != '-') {
                formatCheck = formatCheck + '-'
            }
            else if (i === 3) {
                if (tempCheck[3] != 0 && tempCheck[3] != 1) {
                    formatCheck = formatCheck
                } else {
                    formatCheck = formatCheck + tempCheck[3]
                }
            }
            else if (i === 4) {
                if (!isNaN(tempCheck[4])) {
                    if (tempCheck[3] == 1 && tempCheck[4] != 0 && tempCheck[3] == 1 && tempCheck[4] != 1 && tempCheck[3] == 1 && tempCheck[4] != 2) {
                        formatCheck = formatCheck
                    } else {
                        formatCheck = formatCheck + tempCheck[4] + '-'
                    }

                }
            }
            else if (i === 5 && tempCheck[5] != '-') {
                formatCheck = formatCheck + '-'
            }
            else if (i === 6) {
                if (!isNaN(tempCheck[6])) {
                    if (tempCheck[6] == 2) {
                        formatCheck = formatCheck + tempCheck[6]
                    }
                }
            }
            else if (i === 7) {
                if (!isNaN(tempCheck[7])) {
                    if (tempCheck[7] == 5 || tempCheck[7] == 4) {
                        formatCheck = formatCheck + tempCheck[7]
                    }
                }
            } else {
                if (!isNaN(tempCheck[i])) {
                    formatCheck = formatCheck + tempCheck[i]
                }
            }
        }

    }
    document.getElementById(id).value = formatCheck
}
// logout system//
function exitPage() {
    Swal.fire({
        title: "สำนักงานเทศบาล",
        html: "ต้องการออกจากระบบหรือไม่",
        showCancelButton: true,
        customClass: 'swal-height',
        confirmButtonColor: "#009688",
        confirmButtonText: "ใช่",
        cancelButtonText: "ไม่ใช่",
        cancelButtonColor: '#dc3545',
        closeOnConfirm: false,
        closeOnCancel: false
    })
        .then((result) => {
            if (result.value) {
                document.getElementById('exitMenu').classList.add('disableds')
                logout()
            }
        });
}
function logout() {
    location.replace("/logout")
}

// top menu //
function disableMenuAll() {
    document.getElementById('addMenu').classList.add('disableds')
    document.getElementById('saveMenu').classList.add('disableds')
    document.getElementById('editMenu').classList.add('disableds')
    document.getElementById('restoreMenu').classList.add('disableds')
    document.getElementById('deleteMenu').classList.add('disableds')
}
function enableMenu(id) {
    document.getElementById(id).classList.remove('disableds')
}

// set form disable //

function enableFunction() {
    document.getElementById("disable").disabled = true;
}
function disableFunction() {
    document.getElementById("disable").disabled = false;
}

// reset form 
function resetFunction() {
    document.getElementById("form").reset();
}

// food train 
function enFood() {
    document.getElementById("disableFood").disabled = false;
}
function disFood() {
    document.getElementById("disableFood").disabled = true;
}

// move to request page by type
function toRequest(value, id) {
    id = id.split('/')
    id = id[0] + id[1]
    let type = ''

    if (value.path != undefined) {
        type = value.path[0].textContent
    } else {
        type = value
    }

    switch (type) {
        case 'กิจการฌาปณสถาน':
            window.open('../request/request_crematory.html?id=' + id, '_blank');
            break;
        case 'กิจการที่เป็นอันตรายต่อสุขภาพ':
            window.open('../request/request_health_danger.html?id=' + id, '_blank');
            break;
        case 'ใบอนุญาตให้ใช้สถานที่เป็นตลาดเอกชน':
            window.open('../request/request_market.html?id=' + id, '_blank');
            break;
        case 'หนังสือรับรองการแจ้งจัดตั้งสถานที่สะสมอาหาร':
            window.open('../request/request_area_less_correct.html?id=' + id, '_blank');
            break;
        case 'หนังสือรับรองการแจ้งจัดตั้งสถานที่จำหน่ายอาหาร':
            window.open('../request/request_area_less_sell.html?id=' + id, '_blank');
            break;
        case 'ใบอนุญาตจัดตั้งสถานที่สะสมอาหาร':
            window.open('../request/request_area_more_correct.html?id=' + id, '_blank');
            break;
        case 'ใบอนุญาตจัดตั้งสถานที่จำหน่ายอาหาร':
            window.open('../request/request_area_more_sell.html?id=' + id, '_blank');
            break;
        case 'ใบอนุญาตเร่ขายสินค้าในที่หรือทางสาธารณะ':
            window.open('../request/request_public_hawk.html?id=' + id, '_blank');
            break;
        default:
            //ใบอนุญาตจำหน่ายสินค้าในที่หรือทางสาธารณะ
            window.open('../request/request_public_sell.html?id=' + id, '_blank');
            break;
    }
}
function toPerRequest(value, id) {
    id = id.split('/')
    switch (value) {
        case 'กิจการฌาปณสถาน':
            window.open('../renew/renew_crematory.html' + '?id_no=' + id[0] + '&id_year=' + id[1], '_blank');
            break;
        case 'กิจการที่เป็นอันตรายต่อสุขภาพ':
            window.open('../renew/renew_health_danger.html' + '?id_no=' + id[0] + '&id_year=' + id[1], '_blank');
            break;
        case 'ใบอนุญาตให้ใช้สถานที่เป็นตลาดเอกชน':
            window.open('../renew/renew_market.html' + '?id_no=' + id[0] + '&id_year=' + id[1], '_blank');
            break;
        case 'หนังสือรับรองการแจ้งจัดตั้งสถานที่สะสมอาหาร':
            window.open('../renew/renew_area_less_correct.html' + '?id_no=' + id[0] + '&id_year=' + id[1], '_blank');
            break;
        case 'หนังสือรับรองการแจ้งจัดตั้งสถานที่จำหน่ายอาหาร':
            window.open('../renew/renew_area_less_sell.html' + '?id_no=' + id[0] + '&id_year=' + id[1], '_blank');
            break;
        case 'ใบอนุญาตจัดตั้งสถานที่สะสมอาหาร':
            window.open('../renew/renew_area_more_correct.html' + '?id_no=' + id[0] + '&id_year=' + id[1], '_blank');
            break;
        case 'ใบอนุญาตจัดตั้งสถานที่จำหน่ายอาหาร':
            window.open('../renew/renew_area_more_sell.html' + '?id_no=' + id[0] + '&id_year=' + id[1], '_blank');
            break;
        case 'ใบอนุญาตเร่ขายสินค้าในที่หรือทางสาธารณะ':
            window.open('../renew/renew_public_hawk.html' + '?id_no=' + id[0] + '&id_year=' + id[1], '_blank');
            break;
        default:
            //ใบอนุญาตจำหน่ายสินค้าในที่หรือทางสาธารณะ
            window.open('../renew/renew_public_sell.html' + '?id_no=' + id[0] + '&id_year=' + id[1], '_blank');
            break;
    }
}
function toRequestAdd(value, p_id, e_id) {
    switch (value) {
        case 'กิจการฌาปณสถาน':
            window.open('../request/request_crematory.html?p_id=' + p_id + '&e_id=' + e_id, '_blank');
            break;
        case 'กิจการที่เป็นอันตรายต่อสุขภาพ':
            window.open('../request/request_health_danger.html?p_id=' + p_id + '&e_id=' + e_id, '_blank');
            break;
        case 'ใบอนุญาตให้ใช้สถานที่เป็นตลาดเอกชน':
            window.open('../request/request_market.html?p_id=' + p_id + '&e_id=' + e_id, '_blank');
            break;
        case 'หนังสือรับรองการแจ้งจัดตั้งสถานที่สะสมอาหาร':
            window.open('../request/request_area_less_correct.html?p_id=' + p_id + '&e_id=' + e_id, '_blank');
            break;
        case 'หนังสือรับรองการแจ้งจัดตั้งสถานที่จำหน่ายอาหาร':
            window.open('../request/request_area_less_sell.html?p_id=' + p_id + '&e_id=' + e_id, '_blank');
            break;
        case 'ใบอนุญาตจัดตั้งสถานที่สะสมอาหาร':
            window.open('../request/request_area_more_correct.html?p_id=' + p_id + '&e_id=' + e_id, '_blank');
            break;
        case 'ใบอนุญาตจัดตั้งสถานที่จำหน่ายอาหาร':
            window.open('../request/request_area_more_sell.html?p_id=' + p_id + '&e_id=' + e_id, '_blank');
            break;
        case 'ใบอนุญาตเร่ขายสินค้าในที่หรือทางสาธารณะ':
            window.open('../request/request_public_hawk.html?p_id=' + p_id + '&e_id=' + e_id, '_blank');
            break;
        default:
            window.open('../request/request_public_sell.html?p_id=' + p_id + '&e_id=' + e_id, '_blank');
            break;
    }
}
//check  object isEmpty
function isEmpty(arg) {
    for (var item in arg) {
        return false;
    }
    return true;
}

function getDateExp(type, date) {
    let date_return = {
        date_issuse: '',
        date_exp: ''
    }
    date_return.date_issuse = date + ''
    //25-05-2563
    date = date.split('-')
    let day = parseInt(date[0])
    let month = parseInt(date[1])
    let year = parseInt(date[2])
    if (type === 'หนังสือรับรองการแจ้งจัดตั้งสถานที่สะสมอาหาร' || type === 'หนังสือรับรองการแจ้งจัดตั้งสถานที่จำหน่ายอาหาร') {
        // 3 year - 1 day
        date_return.date_exp = `${day - 1}-${month}-${year + 3}`
        return date_return
    } else if (type === 'ใบอนุญาตจำหน่ายสินค้าในที่หรือทางสาธารณะ' || type === 'ใบอนุญาตเร่ขายสินค้าในที่หรือทางสาธารณะ') {
        //31 Dec Year +1
        date_return.date_exp = `31-12-${year + 1}`
        return date_return
    } else {
        // 1 Year - 1 day
        date_return.date_exp = `${day - 1}-${month}-${year + 1}`
        return date_return
    }
}
