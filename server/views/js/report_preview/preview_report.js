let total_money = 0
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}
function start() {
    let item = getUrlVars()
    if (item.r_id != undefined && item.date_start != undefined && item.date_end != undefined) {
        getDataReport(item.r_id, item.date_start, item.date_end).then((raw_data) => {
            console.log(raw_data)
            setUI(raw_data)
        })
    }
}
function setUI(data) {
    var tbl = document.getElementById('table');
    if (tbl.getElementsByTagName("tbody")[0] != null || tbl.getElementsByTagName("tbody")[0] != undefined) {
        tbl.removeChild(tbl.getElementsByTagName("tbody")[0])
    }
    var tblBody = document.createElement('tbody')
    for (var i = 0; i < data.length; i++) {
        var row = document.createElement("tr");
        for (var j = 0; j < 9; j++) {
            var cell = document.createElement("td");
            if (j === 0) {
                var cellText = document.createTextNode(i + 1);
            } else if (j === 1) {
                let t_title = data[i].P_TITLE === null ? '' : data[i].P_TITLE
                let t_name = data[i].P_NAME
                let t_surname = data[i].P_SURNAME === null ? '' : data[i].P_SURNAME
                var cellText = document.createTextNode(`${t_title} ${t_name} ${t_surname}`);
            } else if (j === 2) {
                let temp_date = data[i].R_ISSUED + ''
                let temp_array = temp_date.split('-')
                let text = `${temp_array[0]}/${temp_array[1]}/${temp_array[2]}`
                var cellText = document.createTextNode(text);
            } else if (j === 3) {
                let temp_date = data[i].R_EXPIRED + ''
                let temp_array = temp_date.split('-')
                let text = `${temp_array[0]}/${temp_array[1]}/${temp_array[2]}`
                var cellText = document.createTextNode(text);
            } else if (j === 4) {
                let text = data[i].RT_NAME
                var cellText = document.createTextNode(text);
            } else if (j === 5) {
                let total_year1 = parseInt(data[i].R_TO_Y1)
                let total_year2 = parseInt(data[i].R_TO_Y2)
                let total_year3 = parseInt(data[i].R_TO_Y3)
                let text = total_year1 + total_year2 + total_year3
                total_money = total_money + text
                var cellText = document.createTextNode(addCommas(text));
            } else if (j === 6) {
                let text = data[i].E_NAME === null ? '-' : data[i].E_NAME
                var cellText = document.createTextNode(text);
            } else if (j === 7) {
                let home = data[i].A_HOME === null ? '' : data[i].A_HOME
                let moo = data[i].A_MOO === null ? '-' : data[i].A_MOO
                let sxy = data[i].A_SXY === null ? '-' : data[i].A_SXY
                let road = data[i].A_ROAD === null ? '-' : data[i].A_ROAD
                let district = data[i].A_DISTRICT
                let amphur = data[i].A_AMPHUR
                let provinc = data[i].A_PROVINCE
                let text = ` ${home} หมู่ที่${moo} ซ.${sxy} ถนน${road} ต.${district} อ.${amphur} จ.${provinc}`
                var cellText = document.createTextNode(text);
            } else {
                let temp_date = data[i].E_PHONE + ''
                let temp_array = temp_date.split('/')
                let text = ''
                if (temp_array[1] === '') {
                    text = `${temp_array[0]}`
                } else {
                    text = `${temp_array[0]} ต่อ ${temp_array[1]}`
                }
                var cellText = document.createTextNode(text);
            }
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
    document.getElementById('sum_report').innerText = addCommas(total_money)
}
function getDataReport(id, date_start, date_end) {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/get/view/report/${id}/${date_start}/${date_end}`).then((result) => {
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