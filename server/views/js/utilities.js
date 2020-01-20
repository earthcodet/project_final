let month = {
    'มกราคม': 1,
    'กุมภาพันธ์': 2,
    'เดือนมีนาคม': 3,
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
let selectImageFile = 0
let maxImageFile = 4
let imageDisplay = 0
function checkPhoneInput(tagId) {
    var text = document.getElementById(tagId).value
    text = text.replace(/(\d{3})(\d{7})/, "$1-$2");
    document.getElementById(tagId).value = text
}
var totalFiles = [];
function handleFileSelect(evt) {
    var files = evt.target.files;
    for (var i = 0, f; f = files[i] ; i++) {
        if (!f.type.match('image.*')) {
            continue;
        }
        if (selectImageFile < maxImageFile) {
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
function deleteImage() {
    var index = Array.from(document.getElementById('outputImage').children).indexOf(event.target.parentNode.parentNode)
    document.querySelector("#outputImage").removeChild(document.querySelectorAll('#outputImage span')[index]);
    totalFiles.splice(index, 1);
    document.getElementById('uploadFile').value = ''
    selectImageFile = selectImageFile - 1
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
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
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (type = "date") {
                var tempdateX = x.innerHTML.split(' ')
                var tempdateY = y.innerHTML.split(' ')
                var dayX, dayY, monthX, monthY, yearX, yearY
                dayX = tempdateX[0]
                dayY = tempdateY[0]
                monthX = tempdateX[1]
                monthY = tempdateY[1]
                yearX = tempdateX[2]
                yearY = tempdateY[2]
                if (dir == "asc") {
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
            } else if (type = "dateExp") {
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
                    } else if (dateX > dateY) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (dateX != 'หมดอายุ' && dateY != 'หมดอายุ') {
                        if (parseInt(dateX) < parseInt(dateY)) {
                            shouldSwitch = true;
                            break;
                        }
                    } else if (dateX < dateY) {
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


function toRequest(value) {
    let type = value.path[0].textContent
    switch (type) {
        case 'ใบอนุญาตจำหน่ายสินค้าในที่หรือทาง':
            window.location.href = "../request/request_public_sell.html";
            break;
        case 'ใบอนุญาตเร่ขายสินค้าในที่หรือทางสาธารณะ':
            window.location.href = "../request/request_public_hawk.html";
            break;
        case 'ใบอนุญาตจัดตั้งสถานที่จำหน่ายอาหาร':
            window.location.href = "../request/request_area_more_sell.html";
            break;
        case 'ใบอนุญาตจัดจัดตั้งสถานที่สะสมอาหาร':
            window.location.href = "../request/request_area_more_correct.html";
            break;
        case 'หนังสือรับรองการแจ้งจัดตั้งสถานที่จำหน่าย':
            window.location.href = "../request/request_area_less_sell.html";
            break;
        case 'หนังสือรับรองการแจ้งจัดตั้งสถานที่สะสมอาหาร':
            window.location.href = "../request/request_area_less_correct.html";
            break;
        case 'ใบอนุญาตให้ใช้สถานที่เป็นตลาดเอกชน':
            window.location.href = "../request/request_market.html";
            break;
        case 'กิจการที่เป็นอันตรายต่อสุขภาพ':
            window.location.href = "../request/request_health_danger.html";
            break;
        default:
            window.location.href = "../request/request_crematory.html";
    }
}
