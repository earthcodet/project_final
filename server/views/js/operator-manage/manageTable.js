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
function canclePopup() {

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
                        inRequest.delete_logic = document.getElementById('cancleTextPopup').value
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
function payPopup() {
    let html_display = `
<div >
<br>
    <label class = 'topic' style='font-size:1.5vw'> ชำระเงิน </label> 
    <br>
    <br>
        <a class='topic' style="margin-left: 0.5vw;"> ค่าธรรมเนียม  <font color="red">*</font></a>
        <input type='text' id="pay_fee" class='tabOne' style="margin-left:1vw;width:8vw" maxlength="5"
        onkeyup="inputNumberOnly(this.value, 'pay_fee')"></input><br>
        <a id='pay_fee_alert' class='tabTwo alert'  style='display:none'>ช่องนี้เว้นว่างไม่ได้</a>
        <br>
        <a class='topic' style="margin-left: 3vw;"> ค่าปรับ  <font color="red">*</font></a>
        <input type='text' id="pay_fine" class='tabOne' style="margin-left:1vw;width:8vw" maxlength="5"
        onkeyup="inputNumberOnly(this.value, 'pay_fine')"></input><br>
        <a id='pay_fine_alert' class='tabTwo alert'  style='display:none'>ช่องนี้เว้นว่างไม่ได้</a>
        <br>
        <a class='topic' style="margin-left: 0.3vw;"> ออกให้เมื่อวันที่ <font color="red">*</font></a>
        <input type='text' id="datepicker7" class='tabOne' style="margin-left:0.5vw;width:8vw" maxlength="10" ></input><br>
        <a id='datepicker7_alert' class='tabTwo alert'  style='display:none'>ช่องนี้เว้นว่างไม่ได้</a>
        <br>
        <a class='topic' style="margin-left: 0.3vw;"> ชื่อพนักงานผู้รับเงิน <font color="red">*</font></a>
        <select id="app_name_money" class='tabOne' style="margin-left:0.5vw;width:  14vw   " ; maxlength="150" ></select>
        <br>
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
                            let object = getDateExp(inRequest.menu, document.getElementById('datepicker7').value)
                            inRequest.date_expired = object.date_exp
                            inRequest.date_issued = object.date_issuse
                            //จะเช็คต่อว่า ปัจุจบัน ต้องเพิ่มเงินไปที่ช่องไหน
                            let temp = inRequest.date_expired.split('-')
                            let year = parseInt(temp[2])
                            let year_now = parseInt(new Date().toISOString().slice(0, 10).split('-')[0])
                            //ใบอนุญาต เหลืออีก 3 ปี บันทึกลงช่องที่ 1
                            if (year - year_now === 3) {
                                inRequest.receipt_date = document.getElementById('datepicker7').value
                                inRequest.receipt_fine = document.getElementById('pay_fine').value
                                inRequest.receipt_fee = document.getElementById('pay_fee').value
                                inRequest.status_before = inRequest.status
                                inRequest.status = 'active'
                            } else if (year - year_now === 2) {
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
function transferPopup() {
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
            window.location.href = '03.html'
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
                            break;
                        case 'cancel':
                            inRequest.status = inRequest.status_before
                            break;
                        default:
                            //'ban'
                            inRequest.status = 'active'
                            break;

                    }
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
let controlPage = {
    'tr_select': undefined
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
            if (inRequest.is_deleted === 'Y' && key != 'detail') {
                statusRequestDelete()
            } else {
                if (tempPersonal.PERSONAL_IS_DELETED === 'Y' && key != 'detail') {
                    statusDelete()
                } else {
                    switch (key) {
                        case 'per':
                            // perPopup(type)
                            toPerRequest(type, id)
                            break;
                        case 'transfer':
                            transferPopup()
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
            }

        },
        items: {
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
            if (inRequest.is_deleted === 'Y' && key != 'detail') {
                statusRequestDelete()
            } else {
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
            }

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
            if (inRequest.is_deleted === 'Y' && key != 'detail') {
                statusRequestDelete()
            } else {
                if (tempPersonal.PERSONAL_IS_DELETED === 'Y' && key != 'detail') {
                    statusDelete()
                } else {
                    toRequest(type, id)
                }
            }

        },
        items: {
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
            if (inRequest.is_deleted === 'Y' && key != 'detail') {
                statusRequestDelete()
            } else {
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
            }


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
            if (inRequest.is_deleted === 'Y' && key != 'detail') {
                statusRequestDelete()
            } else {
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
            }

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
            if (inRequest.is_deleted === 'Y' && key != 'detail') {
                statusRequestDelete()
            } else {
                if (tempPersonal.PERSONAL_IS_DELETED === 'Y' && key != 'detail') {
                    statusDelete()
                } else {
                    toRequest(type, id)
                }
            }

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
function getUserInformation(type) {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/get/user/${type}`).then((result) => {
            return resolve(result.data);
        })
    })
}
function setLisetUserInformationToUi(list_user, id) {
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
    }
}
function displayUserInformation(id, type) {
    getUserInformation(type).then((list_user) => {
        console.log(`'get'`)
        setLisetUserInformationToUi(list_user, id)
    })
}
