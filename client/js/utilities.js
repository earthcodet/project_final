function checkPhoneInput(tagId) {
    var text = document.getElementById(tagId).value
    text = text.replace(/(\d{3})(\d{7})/, "$1-$2");
    document.getElementById(tagId).value = text
}
var totalFiles = [];
function handleFileSelect(evt) {
    console.log('aaa')
    var files = evt.target.files;
    for (var i = 0, f; f = files[i]; i++) {
        if (!f.type.match('image.*')) {
            continue;
        }
        totalFiles.push(f)
        var reader = new FileReader();
        reader.onload = (function (theFile) {
            return function (e) {
                var span = document.createElement('span');
                span.innerHTML =
                    [
                        `<div class="column" style="width: 25%; height: 310px; ">
                <img 
                width=100% 
                height=270px 
                src="`
                        , e.target.result,
                        '" title="', escape(theFile.name), '"/>'
                        , "<button class='deletebutton'" +
                        "onclick='deleteImage()' >ลบรูปภาพนี้</button>", "</div>"
                    ].join('');

                document.getElementById('outputImage').insertBefore(span, null);
            };
        })(f);
        reader.readAsDataURL(f);
    }
}
function deleteImage() {
    var index = Array.from(document.getElementById('outputImage').children).indexOf(event.target.parentNode.parentNode)
    document.querySelector("#outputImage").removeChild(document.querySelectorAll('#outputImage span')[index]);
    totalFiles.splice(index, 1);
    document.getElementById('uploadFile').value = ''
}
function uploadImage(event) {
    var cancelButton = document.getElementById('cancelImage')
    var target = event.target || event.srcElement;
    console.log(target, "changed.");
    console.log(event);
    if (target.value.length == 0) {
        console.log("Suspect Cancel was hit, no files selected.");
        if (0 == target.files.length) {
            console.log('im delete image')
            cancelButton.onclick();
        }
    } else {
        var selectedFile = event.target.files[0];
        var reader = new FileReader();
        var img = document.getElementById('operatorImage')
        console.log(selectedFile)
        reader.onload = function (event) {
            img.src = event.target.result;
            img.alt = 'operator'
            img.width = 200
            img.height = 200
        };
        reader.readAsDataURL(selectedFile)
    }
}
function deleteImageOne() {
    document.getElementById('uploadFile').value = ''
    var img = document.getElementById('operatorImage')
    img.src = '../../img/userProfile.png'
    img.width = 200
    img.height = 200
}
function buttonImage() {
    document.getElementById('uploadFile').click()
}
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
// sortTable //
function sortTable(n, id) {
    console.log(`run function sorttable`)
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
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
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
