//แก้ไขจำนวนเงิน
let sc_y = 2
let list_history = []
function editPayPopup() {
    let html_display = `
    <br>
    <label class = 'topic' style='font-size:1.5vw'> แก้ไขจำนวนเงิน</label> 
    <div style ='display:block; text-align:left;margin-left:4.5vw'>
    <br>
        <button type='button' id='btn_y2' onclick='setPayY(2)'> ปีที่ 2 </button>
        <button type='button' id='btn_y3' onclick='setPayY(3)' > ปีที่ 3 </button>
        
        <br>
        <a class='topic' style="margin-left: 0.5vw;"> ค่าธรรมเนียม  <font color="red">*</font></a>
        <input type='text' id="pay_fee" class='tabOne' style="margin-left:2.5vw;width:16vw" maxlength="5" 
        value = '${inRequest.receipt_fee_year_2}'
        onkeyup="inputNumberOnly(this.value, 'pay_fee')"></input><br>
        <a id='pay_fee_alert' class='tabTwo alert' style='display:none;margin-left:14vw'>ช่องนี้เว้นว่างไม่ได้</a>
        <br>
        <a class='topic' style="margin-left: 3vw;"> ค่าปรับ  <font color="red">*</font></a>
        <input type='text' id="pay_fine" class='tabOne' style="margin-left:2.5vw;width:16vw" maxlength="5"
        value = '${inRequest.receipt_fine_year_2}'
        onkeyup="inputNumberOnly(this.value, 'pay_fine')"></input><br>
        <a id='pay_fine_alert' class='tabTwo alert'  style='display:none;margin-left:14vw'>ช่องนี้เว้นว่างไม่ได้</a>
        <br>
        <a class='topic' style="margin-left: 0.3vw;"> ออกให้เมื่อวันที่ <font color="red">*</font></a>
        <input type='text' id="datepicker7" class='tabOne' 
        value = '${inRequest.receipt_date_year_2}'
        style="margin-left:2.2vw;width:16vw" maxlength="10" ></input><br>
        <a id='datepicker7_alert' class='tabTwo alert'  style='display:none;margin-left:14vw'>ช่องนี้เว้นว่างไม่ได้</a>
        <br>
        <a class='topic' style="margin-left: 0.3vw;"> ชื่อพนักงานผู้รับเงิน <font color="red">*</font></a>
        <select id="app_name_money" class='tabOne' style="margin-left:0.5vw;width:  16vw   " ; maxlength="150" ></select>
        <br>
        
        <br>    
    </div>
`
    Swal.fire({
        html: html_display,
        width: '40%',
        customClass: 'swal-height',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "ใช่",
        cancelButtonText: "ไม่ใช่",
        confirmButtonColor: "#009688",
        cancelButtonColor: '#dc3545',
        closeOnConfirm: false,
        closeOnCancel: false,
        showLoaderOnConfirm: true,
        preConfirm: function () {
            let pay_fee = document.getElementById('pay_fee')
            let pay_fee_alert = document.getElementById('pay_fee_alert')

            let pay_fine = document.getElementById('pay_fine')
            let pay_fine_alert = document.getElementById('pay_fine_alert')

            let datepicker7 = document.getElementById('datepicker7')
            let datepicker7_alert = document.getElementById('datepicker7_alert')

            //เซตให้มันกลับเป็น style แบบเดิมก่อน
            pay_fee.classList.remove('alertInput')
            pay_fine.classList.remove('alertInput')
            datepicker7.classList.remove('alertInput')

            pay_fee_alert.style.display = 'none'
            pay_fine_alert.style.display = 'none'
            datepicker7_alert.style.display = 'none'

            if (pay_fee.value.trim().length === 0 || pay_fine.value.trim().length === 0 || datepicker7.value.trim().length === 0) {
                if (pay_fee.value.trim().length === 0) {
                    pay_fee.classList.add('alertInput')
                    pay_fee_alert.style.display = ''
                }
                if (pay_fine.value.trim().length === 0) {
                    pay_fine.classList.add('alertInput')
                    pay_fine_alert.style.display = ''
                }
                if (datepicker7.value.trim().length === 0) {
                    datepicker7.classList.add('alertInput')
                    datepicker7_alert.style.display = ''
                }
                Swal.showValidationMessage(
                    `ข้อมูลไม่ครบ`
                )
            } else {
                return new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        inRequest.staff_id_money = document.getElementById('app_name_money').value
                        if (inRequest.date_expired != '') {
                            if (sc_y === 2) {
                                //ปี 2
                                inRequest.receipt_date_year_2 = document.getElementById('datepicker7').value
                                inRequest.receipt_fine_year_2 = document.getElementById('pay_fine').value
                                inRequest.receipt_fee_year_2 = document.getElementById('pay_fee').value
                                inRequest.status_before = inRequest.status
                                inRequest.status = 'active'
                            } else {
                                //ปี 3
                                inRequest.receipt_date_year_3 = document.getElementById('datepicker7').value
                                inRequest.receipt_fine_year_3 = document.getElementById('pay_fine').value
                                inRequest.receipt_fee_year_3 = document.getElementById('pay_fee').value
                                inRequest.status_before = inRequest.status
                                inRequest.status = 'active'
                            }
                            updateRequest().then((data) => {
                                if (data) {
                                    resolve();
                                } else {
                                    Swal.fire({
                                        html: "<h2>เกิดข้อผิดพลาด</h2>",
                                        icon: "error",
                                        confirmButtonColor: "#009688"
                                    });
                                }
                            })
                        } else {
                            //มาครั้งแรก แบบไม่มีวันหมดอายุ ''
                            inRequest.receipt_date = document.getElementById('datepicker7').value
                            inRequest.receipt_fine = document.getElementById('pay_fine').value
                            inRequest.receipt_fee = document.getElementById('pay_fee').value
                            inRequest.status_before = inRequest.status
                            inRequest.status = 'active'
                            let object = getDateExp(inRequest.menu, document.getElementById('datepicker7').value)
                            inRequest.date_expired = object.date_exp
                            inRequest.date_issued = object.date_issuse
                            updateRequest().then((data) => {
                                if (data) {
                                    resolve();
                                } else {
                                    Swal.fire({
                                        html: "<h2>เกิดข้อผิดพลาด</h2>",
                                        icon: "error",
                                        confirmButtonColor: "#009688"
                                    });
                                }
                            })
                        }
                    }, 100);
                });
            }
        }
    }).then((result) => {
        if (result.value) {
            Swal.fire({
                html: "<h2>บันทึกสำเร็จ</h2>",
                icon: "success",
                confirmButtonColor: "#009688"
            });
            displayTableRequest()
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
    });
    // กรณีใช้แบบ input
    $("#datepicker7").datetimepicker({
        timepicker: false,
        format: "d-m-Y", // กำหนดรูปแบบวันที่ ที่ใช้ เป็น 00-00-0000
        lang: "th", // ต้องกำหนดเสมอถ้าใช้ภาษาไทย และ เป็นปี พ.ศ.
        onSelectDate: function (dp, $input) {
            var yearT = new Date(dp).getFullYear();
            var yearTH = yearT + 543;
            var fulldate = $input.val();
            var fulldateTH = fulldate.replace(yearT, yearTH);
            $input.val(fulldateTH);
        }
    });
    // กรณีใช้กับ input ต้องกำหนดส่วนนี้ด้วยเสมอ เพื่อปรับปีให้เป็น ค.ศ. ก่อนแสดงปฏิทิน
    $('#datepicker7').keyup(function () {
        formatDate(this.value, 'datepicker7')
    });
    displayUserInformation('app_name_money', 'money', inRequest.staff_id_money)
    if (inRequest.receipt_date_year_3 === '') {
        document.getElementById('btn_y3').disabled = true
    }
}
function setPayY(Y) {
    if (Y === 2) {
        sc_y = 2
        document.getElementById('pay_fee').value = inRequest.receipt_fee_year_2
        document.getElementById('pay_fine').value = inRequest.receipt_fine_year_2
        document.getElementById('datepicker7').value = inRequest.receipt_date_year_2
        document.getElementById('app_name_money').value = inRequest.staff_id_money
    } else {
        sc_y = 3
        document.getElementById('pay_fee').value = inRequest.receipt_fee_year_3
        document.getElementById('pay_fine').value = inRequest.receipt_fine_year_3
        document.getElementById('datepicker7').value = inRequest.receipt_date_year_3
        document.getElementById('app_name_money').value = inRequest.staff_id_money
    }
}
function checkEditYear() {
    if (inRequest.receipt_date_year_2 != '') {
        editPayPopup()
    } else {
        notEditPay()
    }
}
function checkPay() {
    let a_date = parseInt(new Date().toISOString().slice(0, 4)) + 543
    // let a_date = parseInt('2564')
    let sum_year = a_date - parseInt(inRequest.date_issued.split('-')[2])
    if (sum_year === 0) {
        noPay()
    } else {
        payPopup('ex')
    }
}
//ดูประวัติการโอนใบ
function historyRequest() {
    var swal_html = `<div >
        <div class="display-center">
                </div>
        <div class="search-popup-height">
            <table id='table_transfer_history' class="table tablesearch table-hover cursor-pointer">
                <thead>
                  <tr class="is-color ">
                    <th>ประเภทใบอนุญาต</th>
                    <th>เลขที่คำขอใหม่</th>
                    <th>เลขที่ใบอนุญาตเดิม</th>
                    <th>วันที่เริ่ม</th>
                    <th>วันที่หมดอายุ</th>
                    <th>สถานนะ</th>
                  </tr>
                </thead>
              </table>
        </div>
    </div>`

    Swal.fire({
        title: `ประวัติโอนใบอนุญาต ของเลขที่ใบอนุญาต ${inRequest.no}/${inRequest.year}`,
        html: swal_html,
        width: '80%',
        customClass: 'swal-height',
        showConfirmButton: false,
        closeOnConfirm: false,
        closeOnCancel: false
    });
    displayTableHistory()

}
function getHistoryRequest() {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/get/request/history/transfer/${inRequest.no}/${inRequest.year}`).then((result) => {
            list_history = result.data
            resolve(result.data);
        })
    })
}
function displayTableHistory() {
    getHistoryRequest().then((data) => {
        createHistoryRequest(data)
    })
}
function createHistoryRequest(data) {
    var tbl = document.getElementById('table_transfer_history');
    if (tbl.getElementsByTagName("tbody")[0] != null || tbl.getElementsByTagName("tbody")[0] != undefined) {
        tbl.removeChild(tbl.getElementsByTagName("tbody")[0])
    }
    var tblBody = document.createElement('tbody')
    for (var i = 0; i < data.length; i++) {
        var row = document.createElement("tr");
        row.style.fontSize = '0.95vw'
        // row.onclick = function () { showItem(data[this.rowIndex - 1]) }
        for (var j = 0; j < 6; j++) {
            console.log(j)
            var cell = document.createElement("td");
            if (j === 0) {
                let text = ''
                let array = ['หนังสือรับรองการแจ้งจัดตั้งสถานที่จำหน่ายอาหาร', 'หนังสือรับรองการแจ้งจัดตั้งสถานที่สะสมอาหาร']
                // index 0 = E
                if (data[i].REQUEST_NO.slice(0, 1) === 'E') {
                    text = array[0]
                } else {
                    text = array[1]
                }
                var cellText = document.createTextNode(text);
            } else if (j === 1) {
                //เลขที่คำขอใหม่
                var cellText = document.createTextNode(`${data[i].REQUEST_NO}/${data[i].REQUEST_YEAR}`);
            } else if (j === 2) {
                //เลขที่ใบอนุญาตเดิม
                if (i === 0) {
                    var cellText = document.createTextNode(`${data[i].REQUEST_NO_OLD}/${data[i].REQUEST_YEAR_OLD}`);
                } else {
                    var cellText = document.createTextNode(`${data[i - 1].REQUEST_NO}/${data[i - 1].REQUEST_YEAR}`);
                }

            } else if (j === 3) {
                //วันที่เริ่ม
                if (data[i].TRANSFER_DATE != null) {
                    let temp_date = data[i].TRANSFER_DATE + ''
                    //02-01-2563
                    let temp_array = temp_date.split('-')
                    let temp_montn = parseInt(temp_array[1])

                    let text = `${parseInt(temp_array[0])} ${numToMonth[temp_montn]} ${temp_array[2]}`
                    var cellText = document.createTextNode(text);
                } else {
                    var cellText = document.createTextNode('-');
                }

            } else if (j === 4) {
                //วันที่หมดอายุ
                if (data[i].TRANSFER_DATE_EXP != null) {
                    let temp_date = data[i].TRANSFER_DATE_EXP + ''
                    //02-01-2563
                    let temp_array = temp_date.split('-')
                    let temp_montn = parseInt(temp_array[1])

                    let text = `${parseInt(temp_array[0])} ${numToMonth[temp_montn]} ${temp_array[2]}`
                    var cellText = document.createTextNode(text);
                } else {
                    var cellText = document.createTextNode('-');
                }
            } else {
                //สถานนะ
                if (data[i].DATE_COUNT != null) {
                    let daysBetween = data[i].DATE_COUNT
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
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);

}
//ไม่สามารถชำระเงินล่วงหน้าได้
function noPay() {
    Swal.fire({
        html: 'ไม่สามารถชำระเงินล่วงหน้าได้',
        width: '30%',
        customClass: 'swal-height',
        icon: 'warning',
        confirmButtonColor: "#009688"
    })
}
function notEditPay() {
    Swal.fire({
        html: 'ไม่สามารถแก้ไขได้เนื่องจากไม่มีข้อมูลจำนวนเงิน',
        width: '30%',
        customClass: 'swal-height',
        icon: 'warning',
        confirmButtonColor: "#009688"
    })
}
//อนุญาต
function approvalPopup() {
    let html_display = `
    <div style = 'text-align:left; display:block' >
    <br>
    <label class = 'topic' > ชื่อผู้อนุญาต <label class='alert''>*</label> </label> 
    <br>
    <select id="app_name" class='tabOne' style="width:95%" maxlength="150" >
    </select>
    <br> 
    <div class='center'>
        <label id='app_name_alert' class='alert tabOne' style='display:none'>ช่องนี้เว้นว่างไม่ได้</label>
    </div>
    <br>
    <label>วันที่อนุญาต <label class='alert''>*</label></label>
    <br>
    <input type="text" id="datepicker5" placeholder=""  class='tabOne' style="width: 95%" maxlength="10">
    <br> 
    <div class='center'>
        <label id='datepicker5_alert' class='alert tabOne' style='display:none' >ช่องนี้เว้นว่างไม่ได้</label>
    </div>
    <br>
</div>
`
    Swal.fire({
        html: html_display,
        width: '35%',
        customClass: 'swal-height',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "ใช่",
        cancelButtonText: "ไม่ใช่",
        confirmButtonColor: "#009688",
        cancelButtonColor: '#dc3545',
        closeOnConfirm: false,
        closeOnCancel: false,
        showLoaderOnConfirm: true,
        preConfirm: function () {
            let app_name_text = document.getElementById('app_name')
            let date_text = document.getElementById('datepicker5')
            let app_name_alert = document.getElementById('app_name_alert')
            let datepicker5_alert = document.getElementById('datepicker5_alert')
            app_name_text.classList.remove('alertInput')
            date_text.classList.remove('alertInput')
            app_name_alert.style.display = 'none'
            datepicker5_alert.style.display = 'none'
            if (date_text.value.trim().length === 0 || app_name_text.value.trim().length === 0) {



                if (date_text.value.trim().length === 0) {
                    date_text.classList.add('alertInput')
                    datepicker5_alert.style.display = ''
                }
                if (app_name_text.value.trim().length === 0) {
                    app_name_text.classList.add('alertInput')
                    app_name_alert.style.display = ''
                }
                Swal.showValidationMessage(
                    `ข้อมูลไม่ครบ`
                )
            } else {
                return new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        inRequest.staff_id_approve = document.getElementById('app_name').value
                        inRequest.date_approve = document.getElementById('datepicker5').value
                        inRequest.status_before = inRequest.status
                        inRequest.status = 'approval'
                        updateRequest().then((data) => {
                            if (data) {
                                resolve();
                            } else {
                                Swal.fire({
                                    html: "<h2>เกิดข้อผิดพลาด</h2>",
                                    icon: "error",
                                    confirmButtonColor: "#009688"
                                });
                            }
                        })
                    }), 100;
                })
            }
        }

    }).then((result) => {
        if (result.value) {
            Swal.fire({
                html: "<h2>บันทึกสำเร็จ</h2>",
                icon: "success",
                confirmButtonColor: "#009688"
            });
            displayTableRequest()
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
    });
    // กรณีใช้แบบ input
    $("#datepicker5").datetimepicker({
        timepicker: false,
        format: "d-m-Y", // กำหนดรูปแบบวันที่ ที่ใช้ เป็น 00-00-0000
        lang: "th", // ต้องกำหนดเสมอถ้าใช้ภาษาไทย และ เป็นปี พ.ศ.
        onSelectDate: function (dp, $input) {
            var yearT = new Date(dp).getFullYear();
            var yearTH = yearT + 543;
            var fulldate = $input.val();
            var fulldateTH = fulldate.replace(yearT, yearTH);
            $input.val(fulldateTH);
        }
    });
    // กรณีใช้กับ input ต้องกำหนดส่วนนี้ด้วยเสมอ เพื่อปรับปีให้เป็น ค.ศ. ก่อนแสดงปฏิทิน
    $('#datepicker5').keyup(function () {
        formatDate(this.value, 'datepicker5')
    });
    displayUserInformation('app_name', 'information')
}
//ยกเลิก
function canclePopup(type) {

    let html_display = `
<div style = 'text-align:left; display:block' >
<br>
    <label class = 'topic' > เหตุผลที่ยกเลิก </label> 
    <br>
    <br>
    <textarea id='cancleTextPopup' class='tabOne' row='10' style='width:95%;' ></textarea>
    <br> 
    <div class='center'>
        <label id='cancleTextPopup_alert' class='alert tabOne' style='display:none' >ช่องนี้เว้นว่างไม่ได้</label>
    </div>
    <br>
</div>
`
    Swal.fire({
        html: html_display,
        width: '35%',
        customClass: 'swal-height',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "ใช่",
        cancelButtonText: "ไม่ใช่",
        confirmButtonColor: "#009688",
        cancelButtonColor: '#dc3545',
        closeOnConfirm: false,
        closeOnCancel: false,
        showLoaderOnConfirm: true,
        preConfirm: function () {
            let cancleTextPopup_text = document.getElementById('cancleTextPopup')
            let cancleTextPopup_alert_text = document.getElementById('cancleTextPopup_alert')

            cancleTextPopup_text.classList.remove('alertInput')
            cancleTextPopup_alert_text.style.display = 'none'
            if (cancleTextPopup_text.value.trim().length == 0) {
                cancleTextPopup_text.classList.add('alertInput')
                cancleTextPopup_alert_text.style.display = ''
                Swal.showValidationMessage(
                    `ข้อมูลไม่ครบ`
                )
            } else {
                return new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        if (type != 'Extra') {
                            inRequest.delete_logic = document.getElementById('cancleTextPopup').value
                            inRequest.status_before = inRequest.status
                            inRequest.status = 'cancel'
                            inRequest.is_deleted = 'Y'
                            updateRequest().then((data) => {
                                if (data) {
                                    resolve();
                                } else {
                                    Swal.fire({
                                        html: "<h2>เกิดข้อผิดพลาด</h2>",
                                        icon: "error",
                                        confirmButtonColor: "#009688"
                                    });
                                }
                            })
                        } else {
                            updateRequestExtra().then((data) => {
                                if (data) {
                                    resolve();
                                } else {
                                    Swal.fire({
                                        html: "<h2>เกิดข้อผิดพลาด</h2>",
                                        icon: "error",
                                        confirmButtonColor: "#009688"
                                    });
                                }
                            })
                        }
                    }, 100);
                });
            }
        }
    }).then((result) => {
        if (result.value) {
            Swal.fire({
                html: "<h2>บันทึกสำเร็จ</h2>",
                icon: "success",
                confirmButtonColor: "#009688"
            });
            displayTableRequest()
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
    });
}
//ไม่อนุมัติ
function notApprovalPopup() {
    let html_display = `
<div style = 'text-align:left; display:block' >
<br>
    <label class = 'topic' > เหตุผลที่ไม่อนุมัติ </label> 
    <br>
    <br>
    <textarea id='non_cancle_Text' class='tabOne' row='10' style='width:95%;' ></textarea>
    <br> 
    <div class='center'>
        <label id='non_cancle_alert' class='alert tabOne' style='display:none' >ช่องนี้เว้นว่างไม่ได้</label>
    </div>
    <br>
    <div class='center'>
        <label id='datepicker6_alert' class='alert tabOne' style='display:none' >ช่องนี้เว้นว่างไม่ได้</label>
    </div>
    <br>
</div>
`
    Swal.fire({
        html: html_display,
        width: '35%',
        customClass: 'swal-height',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "ใช่",
        cancelButtonText: "ไม่ใช่",
        confirmButtonColor: "#009688",
        cancelButtonColor: '#dc3545',
        closeOnConfirm: false,
        closeOnCancel: false,
        showLoaderOnConfirm: true,
        preConfirm: function () {
            let non_cancle_Text = document.getElementById('non_cancle_Text')
            let non_cancle_alert = document.getElementById('non_cancle_alert')

            //เซตให้มันกลับเป็น style แบบเดิมก่อน
            non_cancle_Text.classList.remove('alertInput')
            non_cancle_alert.style.display = 'none'

            if (non_cancle_Text.value.trim().length === 0) {
                if (non_cancle_Text.value.trim().length === 0) {
                    non_cancle_Text.classList.add('alertInput')
                    non_cancle_alert.style.display = ''
                }
                Swal.showValidationMessage(
                    `ข้อมูลไม่ครบ`
                )
            } else {
                return new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        inRequest.delete_logic = document.getElementById('non_cancle_Text').value
                        inRequest.status_before = inRequest.status
                        inRequest.status = 'cancel'
                        updateRequest().then((data) => {
                            if (data) {
                                resolve();
                            } else {
                                Swal.fire({
                                    html: "<h2>เกิดข้อผิดพลาด</h2>",
                                    icon: "error",
                                    confirmButtonColor: "#009688"
                                });
                            }
                        })
                    }, 100);
                });
            }
        }
    }).then((result) => {
        if (result.value) {
            Swal.fire({
                html: "<h2>บันทึกสำเร็จ</h2>",
                icon: "success",
                confirmButtonColor: "#009688"
            });
            displayTableRequest()
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
    });
    // กรณีใช้แบบ input
    $("#datepicker6").datetimepicker({
        timepicker: false,
        format: "d-m-Y", // กำหนดรูปแบบวันที่ ที่ใช้ เป็น 00-00-0000
        lang: "th", // ต้องกำหนดเสมอถ้าใช้ภาษาไทย และ เป็นปี พ.ศ.
        onSelectDate: function (dp, $input) {
            var yearT = new Date(dp).getFullYear();
            var yearTH = yearT + 543;
            var fulldate = $input.val();
            var fulldateTH = fulldate.replace(yearT, yearTH);
            $input.val(fulldateTH);
        }
    });
    $('#datepicker6').keyup(function () {
        formatDate(this.value, 'datepicker6')
    });
}
//ชำระเงิน
function payPopup(status_pay) {
    let html_display = ''
    html_display = `
    <br>
    <label class = 'topic' style='font-size:1.5vw'> ชำระเงิน </label> 
    <div style ='display:block; text-align:left;margin-left:4.5vw'>
        <br>
        <br>
        <a class='topic' style="margin-left: 0.5vw;"> ค่าธรรมเนียม  <font color="red">*</font></a>
        <input type='text' id="pay_fee" class='tabOne' style="margin-left:2.5vw;width:16vw" maxlength="5"
        onkeyup="inputNumberOnly(this.value, 'pay_fee')"></input><br>
        <a id='pay_fee_alert' class='tabTwo alert' style='display:none;margin-left:14vw'>ช่องนี้เว้นว่างไม่ได้</a>
        <br>
        <a class='topic' style="margin-left: 3vw;"> ค่าปรับ  <font color="red">*</font></a>
        <input type='text' id="pay_fine" class='tabOne' style="margin-left:2.5vw;width:16vw" maxlength="5"
        onkeyup="inputNumberOnly(this.value, 'pay_fine')"></input><br>
        <a id='pay_fine_alert' class='tabTwo alert'  style='display:none;margin-left:14vw'>ช่องนี้เว้นว่างไม่ได้</a>
        <br>
        <a class='topic' style="margin-left: 0.3vw;"> ออกให้เมื่อวันที่ <font color="red">*</font></a>
        <input type='text' id="datepicker7" class='tabOne' style="margin-left:2.2vw;width:16vw" maxlength="10" ></input><br>
        <a id='datepicker7_alert' class='tabTwo alert'  style='display:none;margin-left:14vw'>ช่องนี้เว้นว่างไม่ได้</a>
        <br>
        <a class='topic' style="margin-left: 0.3vw;"> ชื่อพนักงานผู้รับเงิน <font color="red">*</font></a>
        <select id="app_name_money" class='tabOne' style="margin-left:0.5vw;width:  16vw   " ; maxlength="150" ></select>
        <br>
        <br>    
    </div>
`
    Swal.fire({
        html: html_display,
        width: '40%',
        customClass: 'swal-height',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "ใช่",
        cancelButtonText: "ไม่ใช่",
        confirmButtonColor: "#009688",
        cancelButtonColor: '#dc3545',
        closeOnConfirm: false,
        closeOnCancel: false,
        showLoaderOnConfirm: true,
        preConfirm: function () {
            let pay_fee = document.getElementById('pay_fee')
            let pay_fee_alert = document.getElementById('pay_fee_alert')

            let pay_fine = document.getElementById('pay_fine')
            let pay_fine_alert = document.getElementById('pay_fine_alert')

            let datepicker7 = document.getElementById('datepicker7')
            let datepicker7_alert = document.getElementById('datepicker7_alert')

            //เซตให้มันกลับเป็น style แบบเดิมก่อน
            pay_fee.classList.remove('alertInput')
            pay_fine.classList.remove('alertInput')
            datepicker7.classList.remove('alertInput')

            pay_fee_alert.style.display = 'none'
            pay_fine_alert.style.display = 'none'
            datepicker7_alert.style.display = 'none'

            if (pay_fee.value.trim().length === 0 || pay_fine.value.trim().length === 0 || datepicker7.value.trim().length === 0) {
                if (pay_fee.value.trim().length === 0) {
                    pay_fee.classList.add('alertInput')
                    pay_fee_alert.style.display = ''
                }
                if (pay_fine.value.trim().length === 0) {
                    pay_fine.classList.add('alertInput')
                    pay_fine_alert.style.display = ''
                }
                if (datepicker7.value.trim().length === 0) {
                    datepicker7.classList.add('alertInput')
                    datepicker7_alert.style.display = ''
                }
                Swal.showValidationMessage(
                    `ข้อมูลไม่ครบ`
                )
            } else {
                return new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        inRequest.staff_id_money = document.getElementById('app_name_money').value
                        if (inRequest.date_expired != '') {
                            if (status_pay != 'ex') {
                                let object = getDateExp(inRequest.menu, document.getElementById('datepicker7').value)
                                inRequest.date_expired = object.date_exp
                                inRequest.date_issued = object.date_issuse
                            }
                            //จะเช็คต่อว่า ปัจุจบัน ต้องเพิ่มเงินไปที่ช่องไหน
                            let temp = inRequest.date_expired.split('-')
                            let year = parseInt(temp[2])
                            let year_now = parseInt(new Date().toISOString().slice(0, 10).split('-')[0]) + 543
                            // year_now = 2564
                            console.log(`year_now - year = ${year - year_now}`)
                            // let year_now = parseInt('2564')
                            //ใบอนุญาต เหลืออีก 3 ปี บันทึกลงช่องที่ 1
                            if(status_pay === 'ex'){
                                if (year - year_now === 2) {
                                    inRequest.receipt_date = document.getElementById('datepicker7').value
                                    inRequest.receipt_fine = document.getElementById('pay_fine').value
                                    inRequest.receipt_fee = document.getElementById('pay_fee').value
                                    inRequest.status_before = inRequest.status
                                    inRequest.status = 'active'
                                } else if (year - year_now === 1) {
                                    //ใบอนุญาต เหลืออีก 2 ปี บันทึกลงช่องที่ 2
                                    inRequest.receipt_date_year_2 = document.getElementById('datepicker7').value
                                    inRequest.receipt_fine_year_2 = document.getElementById('pay_fine').value
                                    inRequest.receipt_fee_year_2 = document.getElementById('pay_fee').value
                                    inRequest.status_before = inRequest.status
                                    inRequest.status = 'active'
                                } else {
                                    //ใบอนุญาต เหลืออีก 1 ปี หรือ 0 ปี บันทึกลงช่องที่ 3
                                    inRequest.receipt_date_year_3 = document.getElementById('datepicker7').value
                                    inRequest.receipt_fine_year_3 = document.getElementById('pay_fine').value
                                    inRequest.receipt_fee_year_3 = document.getElementById('pay_fee').value
                                    inRequest.status_before = inRequest.status
                                    inRequest.status = 'active'
                                }
                            }else{
                                inRequest.receipt_date_year_3 = document.getElementById('datepicker7').value
                                    inRequest.receipt_fine_year_3 = document.getElementById('pay_fine').value
                                    inRequest.receipt_fee_year_3 = document.getElementById('pay_fee').value
                                    inRequest.status_before = inRequest.status
                                    inRequest.status = 'active'
                            }
                            
                            updateRequest().then((data) => {
                                if (data) {
                                    resolve();
                                } else {
                                    Swal.fire({
                                        html: "<h2>เกิดข้อผิดพลาด</h2>",
                                        icon: "error",
                                        confirmButtonColor: "#009688"
                                    });
                                }
                            })
                        } else {
                            //มาครั้งแรก แบบไม่มีวันหมดอายุ ''
                            inRequest.receipt_date = document.getElementById('datepicker7').value
                            inRequest.receipt_fine = document.getElementById('pay_fine').value
                            inRequest.receipt_fee = document.getElementById('pay_fee').value
                            inRequest.status_before = inRequest.status
                            inRequest.status = 'active'
                            let object = getDateExp(inRequest.menu, document.getElementById('datepicker7').value)
                            inRequest.date_expired = object.date_exp
                            inRequest.date_issued = object.date_issuse
                            updateRequest().then((data) => {
                                if (data) {
                                    resolve();
                                } else {
                                    Swal.fire({
                                        html: "<h2>เกิดข้อผิดพลาด</h2>",
                                        icon: "error",
                                        confirmButtonColor: "#009688"
                                    });
                                }
                            })
                        }
                    }, 100);
                });
            }
        }
    }).then((result) => {
        if (result.value) {
            Swal.fire({
                html: "<h2>บันทึกสำเร็จ</h2>",
                icon: "success",
                confirmButtonColor: "#009688"
            });
            displayTableRequest()
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
    });
    // กรณีใช้แบบ input
    $("#datepicker7").datetimepicker({
        timepicker: false,
        format: "d-m-Y", // กำหนดรูปแบบวันที่ ที่ใช้ เป็น 00-00-0000
        lang: "th", // ต้องกำหนดเสมอถ้าใช้ภาษาไทย และ เป็นปี พ.ศ.
        onSelectDate: function (dp, $input) {
            var yearT = new Date(dp).getFullYear();
            var yearTH = yearT + 543;
            var fulldate = $input.val();
            var fulldateTH = fulldate.replace(yearT, yearTH);
            $input.val(fulldateTH);
        }
    });
    // กรณีใช้กับ input ต้องกำหนดส่วนนี้ด้วยเสมอ เพื่อปรับปีให้เป็น ค.ศ. ก่อนแสดงปฏิทิน
    $('#datepicker7').keyup(function () {
        formatDate(this.value, 'datepicker7')
    });
    displayUserInformation('app_name_money', 'money')
}
//โอนใบอนุญาติ *
function transferPopup(id) {
    Swal.fire({
        title: 'ต้องการโอนใบอนุญาตหรือไม่',
        width: '40%',
        customClass: 'swal-height',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "ใช่",
        cancelButtonText: "ไม่ใช่",
        confirmButtonColor: "#009688",
        cancelButtonColor: '#dc3545',
        closeOnConfirm: false,
        closeOnCancel: false,
        showLoaderOnConfirm: true,
        imageUrl: '../../img/img1.jpg',
        imageWidth: 'auto',
        imageHeight: '100%',
        imageAlt: 'Custom image',
        preConfirm: function () {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    resolve();
                }, 100);
            });
        }
    }).then((result) => {
        if (result.value) {
            id = id.split('/')
            window.open('03.html' + '?id_no=' + id[0] + '&id_year=' + id[1], '_blank');
            Swal.close()
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
    });
}
//ยกเลิกสถานะ 
function cancelStatus() {
    Swal.fire({
        title: 'ต้องการยกเลิกใบอนุญาตหรือไม่',
        width: '40%',
        customClass: 'swal-height',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "ใช่",
        cancelButtonText: "ไม่ใช่",
        confirmButtonColor: "#009688",
        cancelButtonColor: '#dc3545',
        closeOnConfirm: false,
        closeOnCancel: false,
        showLoaderOnConfirm: true,
        imageUrl: '../../img/img1.jpg',
        imageWidth: 'auto',
        imageHeight: '100%',
        imageAlt: 'Custom image',
        preConfirm: function () {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    switch (inRequest.status) {
                        case 'wait':
                            inRequest.status = 'wait'
                            break;
                        case 'approval':
                            inRequest.date_approve = ''
                            inRequest.status = 'wait'
                            break;
                        case 'active':
                            inRequest.status = 'approval'
                            inRequest.date_issued = ''
                            inRequest.date_expired = ''
                            //year 1
                            inRequest.receipt_date = ''
                            inRequest.receipt_fee = ''
                            inRequest.receipt_fine = ''
                            //year2
                            inRequest.receipt_date_year_2 = ''
                            inRequest.receipt_fee_year_2 = ''
                            inRequest.receipt_fine_year_2 = ''
                            //year 3
                            inRequest.receipt_date_year_3 = ''
                            inRequest.receipt_fee_year_3 = ''
                            inRequest.receipt_fine_year_3 = ''
                            //delete logic 
                            inRequest.delete_logic = ''
                            break;
                        case 'cancel':
                            inRequest.status = inRequest.status_before
                            break;
                        default:
                            //'ban'
                            inRequest.status = 'active'
                            break;

                    }
                    //add Status is_delete
                    inRequest.delete_logic = ''
                    inRequest.is_deleted = 'N'
                    // inRequest.status = inRequest.status_before
                    updateRequest().then((data) => {
                        if (data) {
                            resolve();
                        } else {
                            Swal.fire({
                                html: "<h2>เกิดข้อผิดพลาด</h2>",
                                icon: "error",
                                confirmButtonColor: "#009688"
                            });
                        }
                    })
                }, 100);
            });
        }
    }).then((result) => {
        if (result.value) {
            Swal.fire({
                title: 'ยกเลิกสำเร็จ',
                icon: 'success',
                confirmButtonColor: "#009688"
            })
            displayTableRequest()
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
    });
}
//เพิ่มใบอนุญาต 
function addPopup() {
    console.log(event)
    let html_display = `
    <div style = 'text-align:left; display:block;margin-left:2vw' >
    <br>
    <a class = 'topics'  > เพิ่มใบอนุญาต  </a> 
    <br>
    <a class = 'topics tabOne' style='font-size:1.3vw'> สถานประกอบการ : ${inRequest.establishment_id}  </a> 
    <br>
    <a class = 'topics tabOne' style='font-size:1.3vw'> ชื่อสถานประกอบการ : ${inRequest.establishment_name}  </a> 
    <br>
    <br>    
    <a class = 'topics '>ประเภทที่ต้องการเพิ่มใบอนุญาต </a> 
    <br>
    
    <select id="add_type_menu" class='tabOne' style="width:85%" maxlength="150" >
            <option value="ใบอนุญาตจำหน่ายสินค้าในที่หรือทางสาธารณะ">ใบอนุญาตจำหน่ายสินค้าในที่หรือทางสาธารณะ</option>
            <option value="ใบอนุญาตเร่ขายสินค้าในที่หรือทางสาธารณะ">ใบอนุญาตเร่ขายสินค้าในที่หรือทางสาธารณะ</option>
            <option value="ใบอนุญาตจัดตั้งสถานที่จำหน่ายอาหาร">ใบอนุญาตจัดตั้งสถานที่จำหน่ายอาหาร</option>
            <option value="ใบอนุญาตจัดจัดตั้งสถานที่สะสมอาหาร">ใบอนุญาตจัดจัดตั้งสถานที่สะสมอาหาร</option>
            <option value="หนังสือรับรองการแจ้งจัดตั้งสถานที่จำหน่ายอาหาร">หนังสือรับรองการแจ้งจัดตั้งสถานที่จำหน่ายอาหาร</option>
            <option value="หนังสือรับรองการแจ้งจัดตั้งสถานที่สะสมอาหาร">หนังสือรับรองการแจ้งจัดตั้งสถานที่สะสมอาหาร</option>
            <option value="ใบอนุญาตให้ใช้สถานที่เป็นตลาดเอกชน">ใบอนุญาตให้ใช้สถานที่เป็นตลาดเอกชน</option>
            <option value="กิจการที่เป็นอันตรายต่อสุขภาพ">กิจการที่เป็นอันตรายต่อสุขภาพ</option>
            <option value="กิจการฌาปณสถาน">กิจการฌาปณสถาน</option>
    </select>
    <br> 
    
    </div>
    `
    Swal.fire({
        html: html_display,
        width: '30%',
        customClass: 'swal-height',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "ใช่",
        cancelButtonText: "ไม่ใช่",
        confirmButtonColor: "#009688",
        cancelButtonColor: '#dc3545',
        closeOnConfirm: false,
        closeOnCancel: false,
        showLoaderOnConfirm: true,
        preConfirm: function () {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    resolve();
                }, 100);
            });
        }
    }).then((result) => {
        if (result.value) {
            let type = document.getElementById('add_type_menu').value
            toRequestAdd(type, inPersonal.id, inRequest.establishment_id)
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
    });
}
//สถานะลบแล้ว
function statusDelete() {
    Swal.fire({
        html: 'ผู้ประกอบการนี้อยู่ในสถานะยกเลิก',
        width: '30%',
        customClass: 'swal-height',
        icon: 'warning',
        confirmButtonColor: "#009688"
    })
}
//สถานะลบแล้วคำขอ
function statusRequestDelete() {
    Swal.fire({
        html: 'ใบคำขอนี้อยู่ในสถานะยกเลิก',
        width: '30%',
        customClass: 'swal-height',
        icon: 'warning',
        confirmButtonColor: "#009688"
    })
}
function statusDontPay() {
    Swal.fire({
        html: 'ไม่สามารถชำระเงินได้เนื่องจากใบอนุญาตมีอายุเหลือปีสุดท้าย',
        width: '30%',
        customClass: 'swal-height',
        icon: 'warning',
        confirmButtonColor: "#009688"
    })
}
function notChangeStatus() {
    Swal.fire({
        html: 'ไม่สามารถยกเลิกสถานะใบนี้ได้ เนื่องจากใบนี้ผ่านการโอนมา',
        width: '30%',
        customClass: 'swal-height',
        icon: 'warning',
        confirmButtonColor: "#009688"
    })
}
function toPerRequestError() {
    Swal.fire({
        html: 'ไม่ต่ออายุได้เนื่องจากใบอนุญาตยังมีอายุมากกว่า 90 วัน',
        width: '30%',
        customClass: 'swal-height',
        icon: 'warning',
        confirmButtonColor: "#009688"
    })
}
let controlPage = {
    'tr_select': undefined
}

function checkBackStatus() {
    getDuplicationOwner().then((data_check) => {
        if (data_check) {
            notChangeStatus()
        } else {
            cancelStatus()
        }
    })
}
function getDuplicationOwner() {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/get/owner/duplication/transfer/${inRequest.no}/${inRequest.year}/${inPersonal.id}`).then((result) => {
            return resolve(result.data);
        })
    })
}
function resetActiveRightClick() {
    if (controlPage.tr_select != undefined) {
        controlPage.tr_select.style.background = ''
    }
}
function markList(event) {
    if (controlPage.tr_select === undefined) {
        controlPage.tr_select = event
        event.style.background = '#a59c9c'
    } else {
        controlPage.tr_select.style.background = ''
        controlPage.tr_select = event
        event.style.background = '#a59c9c'
    }
}


$(function () {
    //ปกติ
    $.contextMenu({
        selector: '.active-menu',
        autoHide: true,
        callback: function (key, options) {
            let type = this[0].cells[1].innerText.trim()
            let id = this[0].cells[2].innerText.trim()
            let indexData = this[0].rowIndex - 1
            console.log(`this`)
            console.log(this)
            setDataItem(requestDataList[indexData])
            // if (inRequest.is_deleted === 'Y' && key != 'detail') {
            //     statusRequestDelete()
            // } else {
            if (tempPersonal.PERSONAL_IS_DELETED === 'Y' && key != 'detail') {
                statusDelete()
            } else {
                switch (key) {
                    case 'per':
                        if (inRequest.date_exp_count > 90) {
                            toPerRequestError()
                        } else {
                            toPerRequest(type, id)
                        }
                        break;
                    case 'add':
                        addPopup()
                        break;
                    case 'detail':
                        toRequest(type, id)
                        break;
                    case 'cancle_status':
                        cancelStatus()
                        break;
                    case 'stop':
                        viewPageReport(undefined, inPersonal.id, `${inRequest.no}${inRequest.year}`)
                        break;
                    default:
                        canclePopup()
                        break;
                }
            }
            // }

        },
        items: {
            "per": { name: "ต่อใบอนุญาต" },
            "add": { name: "เพิ่มใบอนุญาต" },
            "detail": { name: "ดูรายละเอียด" },
            "cancle_status": { name: "ยกเลิกสถานะ" },
            "stop": { name: "พักใบอนุญาต" },
            "delete": { name: "ยกเลิกใบอนุญาต" }

        }
    });
    //ปกติ-เฉพาะ พวก หนังสือ
    $.contextMenu({
        selector: '.active-menu-extra',
        autoHide: true,
        callback: function (key, options) {
            let type = this[0].cells[1].innerText.trim()
            let id = this[0].cells[2].innerText.trim()
            let indexData = this[0].rowIndex - 1
            console.log(`this`)
            console.log(this)
            setDataItem(requestDataList[indexData])
            // if (inRequest.is_deleted === 'Y' && key != 'detail') {
            //     statusRequestDelete()
            // } else {
            if (tempPersonal.PERSONAL_IS_DELETED === 'Y' && key != 'detail') {
                statusDelete()
            } else {
                switch (key) {
                    case 'per':
                        if (inRequest.date_exp_count > 90) {
                            toPerRequestError()
                        } else {
                            toPerRequest(type, id)
                        }
                        break;
                    case 'transfer':
                        transferPopup(id)
                        break;
                    case 'add':
                        addPopup()
                        break;
                    case 'detail':
                        toRequest(type, id)
                        break;
                    case 'cancle_status':
                        checkBackStatus()
                        break;
                    case 'pay':
                        let temp = inRequest.date_expired.split('-')
                        let year = parseInt(temp[2])
                        let year_now = parseInt(new Date().toISOString().slice(0, 10).split('-')[0]) + 543
                        if (year_now === year) {
                            statusDontPay()
                        } else {
                            checkPay()
                        }
                        break;
                    case 'stop':
                        viewPageReport(undefined, inPersonal.id, `${inRequest.no}${inRequest.year}`)
                        break;
                    case 'editPay':
                        checkEditYear()
                        break;
                    default:
                        canclePopup('Extra')
                        break;
                }
            }
            // }

        },
        items: {
            "pay": { name: "ชำระเงิน" },
            "editPay": { name: "แก้ไขชำระเงิน" },
            "per": { name: "ต่อใบอนุญาต" },
            "transfer": { name: "โอนใบอนุญาต" },
            "add": { name: "เพิ่มใบอนุญาต" },
            "detail": { name: "ดูรายละเอียด" },
            "cancle_status": { name: "ยกเลิกสถานะ" },
            "stop": { name: "พักใบอนุญาต" },
            "delete": { name: "ยกเลิกใบอนุญาต" }

        }
    });
    //อนุมัติ
    $.contextMenu({
        selector: '.approval-menu',

        callback: function (key, options) {
            let type = this[0].cells[1].innerText.trim()
            let id = this[0].cells[2].innerText.trim()
            let indexData = this[0].rowIndex - 1
            setDataItem(requestDataList[indexData])
            // if (inRequest.is_deleted === 'Y' && key != 'detail') {
            //     statusRequestDelete()
            // } else {
            if (tempPersonal.PERSONAL_IS_DELETED === 'Y' && key != 'detail') {
                statusDelete()
            } else {
                switch (key) {
                    case 'pay':
                        payPopup()
                        break;
                    case 'delete':
                        canclePopup()
                        break;
                    case 'cancel-status':
                        cancelStatus()
                        break;
                    default:
                        toRequest(type, id)
                        break;
                }
            }
            // }

        },
        items: {
            "pay": { name: "ชำระเงินแล้ว" },
            "cancel-status": { name: "ยกเลิกสถานะ" },
            "detail": { name: "ดูรายละเอียด" },
            "delete": { name: "ยกเลิกใบอนุญาต" }

        },
        autoHide: true
    });
    //โอน
    $.contextMenu({
        selector: '.transfer-menu',

        callback: function (key, options) {
            let type = this[0].cells[1].innerText.trim()
            let id = this[0].cells[2].innerText.trim()
            let indexData = this[0].rowIndex - 1
            setDataItem(requestDataList[indexData])
            // if (inRequest.is_deleted === 'Y' && key != 'detail') {
            //     statusRequestDelete()
            // } else {
            if (tempPersonal.PERSONAL_IS_DELETED === 'Y' && key != 'detail') {
                statusDelete()
            } else {
                if (key === 'detail') {
                    toRequest(type, id)
                } else {
                    historyRequest()
                }

            }
            // }

        },
        items: {
            "history": { name: 'ดูประวัติการโอนใบอนุญาต' },
            "detail": { name: "ดูรายละเอียด" }

        },
        autoHide: true
    });
    //ยกเลิก
    $.contextMenu({
        selector: '.cancel-menu',

        callback: function (key, options) {
            let type = this[0].cells[1].innerText.trim()
            let id = this[0].cells[2].innerText.trim()
            let indexData = this[0].rowIndex - 1
            setDataItem(requestDataList[indexData])
            // if (inRequest.is_deleted === 'Y' && key != 'detail') {
            //     statusRequestDelete()
            // } else {
            if (tempPersonal.PERSONAL_IS_DELETED === 'Y' && key != 'detail') {
                statusDelete()
            } else {
                if (key === 'detail') {
                    toRequest(type, id)
                }
                if (key === 'cancel-status') {
                    cancelStatus()
                }
            }
            // }


        },
        items: {
            "detail": { name: "ดูรายละเอียด" },
            "cancel-status": { name: "ยกเลิกสถานะ" }
        },
        autoHide: true
    });
    //รออนุมัติ
    $.contextMenu({
        selector: '.wait-menu',

        callback: function (key, options) {
            let type = this[0].cells[1].innerText.trim()
            let id = this[0].cells[2].innerText.trim()
            let indexData = this[0].rowIndex - 1
            console.log(indexData)
            setDataItem(requestDataList[indexData])
            // if (inRequest.is_deleted === 'Y' && key != 'detail') {
            //     statusRequestDelete()
            // } else {
            if (tempPersonal.PERSONAL_IS_DELETED === 'Y' && key != 'detail') {
                statusDelete()
            } else {
                switch (key) {
                    case 'approval':
                        approvalPopup()
                        break;
                    case 'not-approval':
                        notApprovalPopup(type)
                        break;
                    case 'delete':
                        canclePopup()
                        break;
                    default:
                        toRequest(type, id)
                        break;
                }
            }
            // }

        },
        items: {
            "approval": { name: "อนุมัติ" },
            "not-approval": { name: "ไม่อนุมัติ" },
            "detail": { name: "ดูรายละเอียด" },
            "delete": { name: "ยกเลิกใบอนุญาต" }

        },
        autoHide: true
    });
    //หมดอายุ
    $.contextMenu({
        selector: '.expire-menu',

        callback: function (key, options) {
            let id = this[0].cells[2].innerText.trim()
            let type = this[0].cells[1].innerText.trim()
            // if (inRequest.is_deleted === 'Y' && key != 'detail') {
            //     statusRequestDelete()
            // } else {
            if (tempPersonal.PERSONAL_IS_DELETED === 'Y' && key != 'detail') {
                statusDelete()
            } else {
                toRequest(type, id)
            }
            // }

        },
        items: {
            "detail": { name: "ดูรายละเอียด" }

        },
        autoHide: true
    });
});
function updateRequest() {
    return new Promise((resolve, reject) => {
        axios.post(`http://localhost:5000/update/request/status`, { 'requestData': inRequest }).then((result) => {
            return resolve(result.data);
        })
    })
}
function updateRequestExtra() {
    return new Promise((resolve, reject) => {
        axios.post(`http://localhost:5000/update/requestExtra/status/`, { 'requestData': inRequest }).then((result) => {
            return resolve(result.data);
        })
    })
}
function getUserInformation(type) {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/get/user/${type}`).then((result) => {
            return resolve(result.data);
        })
    })
}
function setLisetUserInformationToUi(list_user, id, owner_id) {
    if (list_user.length != 0) {
        document.getElementById(id).innerHTML = ''
        for (let i = 0; i < list_user.length; i++) {
            var select = document.getElementById(id);
            var option = document.createElement("option");
            let item = list_user[i]
            option.text = `${item.USER_TITLE} ${item.USER_NAME} ${item.USER_SURNAME}`
            option.value = list_user[i].USER_ID;

            select.onchange = function () { userMoney = this.value };
            select.add(option);
        }
        if (owner_id != undefined) {
            document.getElementById(id).value = owner_id
        }
    }
}
function displayUserInformation(id, type, ownerId) {
    getUserInformation(type).then((list_user) => {
        console.log(`'get'`)
        setLisetUserInformationToUi(list_user, id, ownerId)
    })
}
