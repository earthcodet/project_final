let m_t = ['ม.ค', 'ก.พ', 'มี.ค', 'เม.ย', 'พ.ค', 'มิ.ย', 'ก.ค', 'ส.ค', 'ก.ย', 'ต.ค', 'พ.ย', 'ธ.ค']
let m_full_name = {
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
            console.log(data, item.m_id, item.y_id)
            setUI(data, item.m_id, item.y_id)
        })
    }
}
function setUI(data, m, y) {
    document.getElementById('ta_m').innerText = m_t[m - 1] + ' ' + (y + 543)
    document.getElementById('mon_report').innerText = m_full_name[m]
    document.getElementById('year_report_title').innerText = y + 543
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
    let sum_row = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    for (var i = 0; i <= data.length; i++) {
        var row = document.createElement("tr");
        let e_ot_t = 0
        let e_m_t = 0
        let r_ot_t = 0
        let r_m_t = 0


        //คาดว่าจะมีคนจ่าย
        let sum_e = 0
        //คนจ่ายจริง
        let sum_r = 0
        if (i != data.length) {
            for (var j = 0; j < 12; j++) {
                var cell = document.createElement("td");
                if (j === 0) {
                    var cellText = document.createTextNode(i + 1);
                } else if (j === 1) {
                    var cellText = document.createTextNode(topic[i]);
                } else if (j === 2) {
                    let temp = data[i].REPORT_E_OT === null ? 0 : data[i].REPORT_E_OT
                    sum_row[j - 2] = sum_row[j - 2] + parseInt(temp)
                    var cellText = document.createTextNode(temp);
                } else if (j === 3) {
                    if (i === 0 || i === 2 || i === 4) {
                        cell.rowSpan = 2
                        cell.classList.add('align-middle')
                        let temp = data[i].REPORT_E_M === null ? 0 : data[i].REPORT_E_M
                        let temp2 = data[i + 1].REPORT_E_M === null ? 0 : data[i + 1].REPORT_E_M
                        let temp_total = parseFloat(temp) + parseFloat(temp2)
                        sum_e = temp_total
                        sum_row[j - 2] = sum_row[j - 2] + parseFloat(temp_total)
                        var cellText = document.createTextNode(addCommas(temp_total));
                    } else {
                        let temp = data[i].REPORT_E_M === null ? 0 : data[i].REPORT_E_M
                        sum_e = parseFloat(temp)
                        if (i != 1 && i != 3 && i != 5) {
                            sum_row[j - 2] = sum_row[j - 2] + parseFloat(temp)
                        }
                        var cellText = document.createTextNode(addCommas(temp));
                    }

                } else if (j === 4) {
                    let temp = data[i].W_OT === null ? 0 : data[i].W_OT
                    sum_row[j - 2] = sum_row[j - 2] + parseInt(temp)
                    var cellText = document.createTextNode(addCommas(temp));
                } else if (j === 5) {
                    let temp = data[i].W_M === null ? 0 : data[i].W_M
                    sum_row[j - 2] = sum_row[j - 2] + parseFloat(temp)
                    var cellText = document.createTextNode(addCommas(temp));
                } else if (j === 6) {
                    //real ot
                    let temp = data[i].REPORT_R_OT === null ? 0 : data[i].REPORT_R_OT
                    sum_row[j - 2] = sum_row[j - 2] + parseInt(temp)
                    var cellText = document.createTextNode(addCommas(temp));
                } else if (j === 7) {
                    //real money
                    let temp = data[i].REPORT_R_M === null ? 0 : data[i].REPORT_R_M
                    sum_row[j - 2] = sum_row[j - 2] + parseFloat(temp)
                    var cellText = document.createTextNode(addCommas(temp));
                } else if (j === 8) {
                    //sum ot
                    let temp_o = data[i].W_OT === null ? 0 : data[i].W_OT
                    let temp2_o = data[i].REPORT_R_OT === null ? 0 : data[i].REPORT_R_OT
                    let temp_total_ot = parseInt(temp_o) + parseInt(temp2_o)
                    sum_row[j - 2] = sum_row[j - 2] + parseInt(temp_total_ot)
                    var cellText = document.createTextNode(addCommas(temp_total_ot));
                } else if (j === 9) {
                    let temp_m = data[i].W_M === null ? 0 : data[i].W_M
                    let temp2_m = data[i].REPORT_R_M === null ? 0 : data[i].REPORT_R_M
                    let temp_total_m = parseFloat(temp_m) + parseFloat(temp2_m)
                    sum_r = temp_total_m
                    if (i === 0 || i === 2 || i === 4) {
                        let temp_m2 = data[i + 1].W_M === null ? 0 : data[i + 1].W_M
                        let temp2_m2 = data[i + 1].REPORT_R_M === null ? 0 : data[i + 1].REPORT_R_M
                        let temp_total_m2 = parseFloat(temp_m2) + parseFloat(temp2_m2)
                        sum_r = sum_r + temp_total_m2
                    }
                    sum_row[j - 2] = sum_row[j - 2] + parseFloat(temp_total_m)


                    var cellText = document.createTextNode(addCommas(temp_total_m));
                } else if (j === 10) {
                    if (i === 0 || i === 2 || i === 4) {
                        cell.rowSpan = 2
                        cell.classList.add('align-middle')
                        let temp_money = sum_r - sum_e
                        if (temp_money > -1) {
                            var cellText = document.createTextNode('+');
                        } else {
                            var cellText = document.createTextNode('-');
                        }

                    } else {
                        let temp_money = sum_r - sum_e
                        if (temp_money > -1) {
                            var cellText = document.createTextNode('+');
                        } else {
                            var cellText = document.createTextNode('-');
                        }
                    }

                } else {
                    if (i === 0 || i === 2 || i === 4) {
                        cell.rowSpan = 2
                        cell.classList.add('align-middle')
                        let temp_money = sum_r - sum_e
                        if (temp_money > -1) {
                            var cellText = document.createTextNode(addCommas(temp_money));
                        } else {
                            temp_money = temp_money * -1
                            var cellText = document.createTextNode(addCommas(temp_money));
                        }
                    } else {
                        let temp_money = sum_r - sum_e
                        if (temp_money > -1) {
                            var cellText = document.createTextNode(addCommas(temp_money));
                        } else {
                            temp_money = temp_money * -1
                            var cellText = document.createTextNode(addCommas(temp_money));
                        }
                    }
                    if (i != 1 && i != 3 && i != 4) {
                        let temp_money = sum_r - sum_e
                        sum_row[j - 3] = sum_row[j - 3] + temp_money
                    }
                }
                cell.classList.add('align-middle')
                if (j != 1) {
                    cell.style.textAlign = 'center'
                }

                cell.appendChild(cellText);
                if (i === 1 || i === 3 || i === 5) {
                    if (j != 3 && j != 10 && j != 11) {
                        row.appendChild(cell);
                    }
                } else {
                    row.appendChild(cell);
                }

            }
        } else {
            for (var j = 0; j < 12; j++) {
                var cell = document.createElement("td");
                if (j === 0) {
                    cell.colSpan = 2
                    var cellText = document.createTextNode('รวมทั้งสิ้น');
                } else if (j === 2) {
                    var cellText = document.createTextNode(addCommas(sum_row[j - 2]));;
                } else if (j === 3) {
                    var cellText = document.createTextNode(addCommas(sum_row[j - 2]));

                } else if (j === 4) {
                    var cellText = document.createTextNode(addCommas(sum_row[j - 2]));
                } else if (j === 5) {
                    var cellText = document.createTextNode(addCommas(sum_row[j - 2]));
                } else if (j === 6) {
                    var cellText = document.createTextNode(addCommas(sum_row[j - 2]));
                } else if (j === 7) {
                    var cellText = document.createTextNode(addCommas(sum_row[j - 2]));
                } else if (j === 8) {
                    var cellText = document.createTextNode(addCommas(sum_row[j - 2]));
                } else if (j === 9) {
                    var cellText = document.createTextNode(addCommas(sum_row[j - 2]));
                } else if (j === 10) {
                    if (sum_row[j - 2] > -1) {
                        var cellText = document.createTextNode('+');
                    } else {
                        var cellText = document.createTextNode('-');
                    }

                } else {
                    var cellText = document.createTextNode(addCommas(sum_row[j - 3]));
                }
                cell.classList.add('align-middle')
                if (j != 1) {
                    cell.style.textAlign = 'center'
                }

                cell.appendChild(cellText);
                if (j != 1) {
                    row.appendChild(cell);
                }
            }
            document.getElementById('year_report').innerText = y + 543
            document.getElementById('total_op').innerText = addCommas(sum_row[6])
            document.getElementById('total_money').innerText = addCommas(sum_row[7])
        }

        tblBody.appendChild(row);

    }
    tbl.appendChild(tblBody);

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