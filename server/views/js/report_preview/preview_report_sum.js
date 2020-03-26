function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}
function start() {
    let item = getUrlVars()
    if (item.m_id != undefined && item.y_id != undefined) {
        item.y_id = parseInt(item.y_id) - 543
        getDataReport(item.m_id, item.y_id).then((data) => {
            console.log(data)
            setUI(data)
        })
    }
}
function setUI(data) {
    let topic = [
        'ใบอนุญาตจัดตั้งสถานที่จำหน่ายอาหาร  (สอ.4)',
        'ใบอนุญาตจัดจัดตั้งสถานที่สะสมอาหาร  (สอ.5)',
        'หนังสือรับรองการแจ้งจัดตั้งสถานที่จำหน่ายอาหาร  (สอ.6)',
        'หนังสือรับรองการแจ้งจัดตั้งสถานที่สะสมอาหาร  (สอ.7)',
        'ใบอนุญาตจำหน่ายสินค้าในที่หรือทางสาธารณะ  (สณ.2)',
        'ใบอนุญาตเร่ขายสินค้าในที่หรือทางสาธารณะ  (สณ.5)',
        'ใบอนุญาตประกอบกิจการค้าที่เป็นอันตรายต่อสุขภาพ  (อภ.2)',
        'ใบอนุญาติจัดตั้งตลาดเอกชน  (ตล.3)',
        'ใบอนุญาติจัดตั้งสุสานและฌาปณสถาน']
    var tbl = document.getElementById('table');
    if (tbl.getElementsByTagName("tbody")[0] != null || tbl.getElementsByTagName("tbody")[0] != undefined) {
        tbl.removeChild(tbl.getElementsByTagName("tbody")[0])
    }
    var tblBody = document.createElement('tbody')
    for (var i = 0; i < data.length; i++) {
        var row = document.createElement("tr");
        for (var j = 0; j < 12; j++) {
            var cell = document.createElement("td");
            if(j === 0){
                var cellText = document.createTextNode(i+1);
            }else if(j===1){
                var cellText = document.createTextNode(topic[i]);
            }else if(j === 2) {
                var cellText = document.createTextNode(i+1);
            }else if(j === 3) {
                var cellText = document.createTextNode(i+1);
            }else if(j === 4) {
                var cellText = document.createTextNode(i+1);
            }else if(j === 5) {
                var cellText = document.createTextNode(i+1);
            }else if(j === 6) {
                var cellText = document.createTextNode(i+1);
            }else if(j === 7) {
                var cellText = document.createTextNode(i+1);
            }else if(j === 8) {
                var cellText = document.createTextNode(i+1);
            }else if(j === 9) {
                var cellText = document.createTextNode(i+1);
            }else if(j === 10) {
                var cellText = document.createTextNode(i+1);
            }else{
                var cellText = document.createTextNode(i+1);
            }
                
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
    // document.getElementById('sum_report').innerText = addCommas(total_money)
}
function getDataReport(m, y) {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/get/view/report/sum/${m}/${y}`).then((result) => {
            return resolve(result.data);
        })
    })
}
function addCommas(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}
start() 