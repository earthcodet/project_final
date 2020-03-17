function getRequestED(status) {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/get/type/request/exp/less/${status}`).then((result) => {
            resolve(result.data);
        })
    })
}
const month22 = [
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
function createTable(status, data) {
    console.log(data)
    var tbl = document.getElementById(status + '_table_date');
    if (tbl.getElementsByTagName("tbody")[0] != null || tbl.getElementsByTagName("tbody")[0] != undefined) {
        tbl.removeChild(tbl.getElementsByTagName("tbody")[0])
    }
    var tblBody = document.createElement('tbody')
    for (var i = 0; i < data.length; i++) {
        // creates a table row
        var row = document.createElement("tr");
        row.onclick = function () { onOpenRequest(data[i].R_NO, data[i].R_YEAR) };
        for (var j = 0; j < 7; j++) {
            console.log(j)
            var cell = document.createElement("td");
            if (j === 0) {
                var cellText = document.createTextNode(`${data[i].R_NO}/${data[i].R_YEAR}`);
            } else if (j === 1) {
                var cellText = document.createTextNode(data[i].REQUEST_MENU);
            } else if (j === 2) {
                var cellText = document.createTextNode(data[i].REQUEST_TYPE_NAME);
            } else if (j === 3) {
                // name owner
                let titel_t = data[i].PERSONAL_TITLE === null ? '' : data[i].PERSONAL_TITLE
                let name_t = data[i].PERSONAL_NAME === null ? '' : data[i].PERSONAL_NAME
                let surname_t = data[i].PERSONAL_SURNAME === null ? '' : data[i].PERSONAL_SURNAME
                let text = `${titel_t} ${name_t} ${surname_t}`
                var cellText = document.createTextNode(text);

            } else if (j === 4) {
                //end start
                if (data[i].DATE_ISSUED != null && data[i].DATE_ISSUED != '') {
                    let temp_date = data[i].DATE_ISSUED + ''
                    //02-01-2563
                    let temp_array = temp_date.split('-')
                    let temp_montn = parseInt(temp_array[1])

                    let text = `${parseInt(temp_array[0])} ${month22[temp_montn - 1]} ${temp_array[2]}`
                    var cellText = document.createTextNode(text);
                } else {
                    var cellText = document.createTextNode('-');
                }
            } else if (j === 5) {
                //end date
                if (data[i].DATE_EXP != null && data[i].DATE_EXP != '') {
                    let temp_date = data[i].DATE_EXP + ''
                    //02-01-2563
                    let temp_array = temp_date.split('-')
                    let temp_montn = parseInt(temp_array[1])

                    let text = `${parseInt(temp_array[0])} ${month22[temp_montn - 1]} ${temp_array[2]}`
                    var cellText = document.createTextNode(text);
                } else {
                    var cellText = document.createTextNode('-');
                }
            } else {
                    let daysBetween = data[i].COUNT_DATE_EXPIRE
                    if (daysBetween < 0) {
                        text = 'หมดอายุ'
                    } else {
                        text = 'เหลืออีก ' + daysBetween + ' วัน'
                    }
                    var cellText = document.createTextNode(text);
            }
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        tblBody.appendChild(row);
    }
    console.log(tblBody)
    tbl.appendChild(tblBody);
}
function displayTableRequest(status) {
    getRequestED(status).then((data) => {
        console.log(data)
        createTable(status, data)
    })
}

function onClickStatustab(status, event, id) {
    displayTableRequest(status)
    openCity(event, id)
}
function onOpenRequest(id_no, id_year) {
    // connection
    console.log(`id_no ${id_no} / id_year ${id_year}`)
}
document.getElementById('cbd').click()
