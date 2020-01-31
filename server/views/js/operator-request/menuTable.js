
function checkOrderNo(value, id) {
    let tempCheck = value.split("")
    // 00/2563 7ตัว
    console.log(tempCheck)
    let formatCheck = ''
    for (let i = 0; i < tempCheck.length; i++) {

        if (i === 2) {
            if (tempCheck[2] === '/') {
                formatCheck = formatCheck + tempCheck[2]
                //     console.log(value.slice(0, value.length-1))
                // document.getElementById(id).value = value.slice(0, value.length-1) + '/'
            } else {
                formatCheck = formatCheck + '/'
            }

        } else {
            if (!isNaN(tempCheck[i])) {
                formatCheck = formatCheck + tempCheck[i]
            }
        }
    }
    document.getElementById(id).value = formatCheck
}
//อนุญาต
function approvalPopup() {
    let html_display = `
    <div style = 'text-align:left; display:block' >
    <br>
    <label class = 'topic' > ชื่อผู้อนุญาต <label class='alert''>*</label> </label> 
    <br>
    <input list='list-name' id="app_name" class='tabOne' style="width:95%" maxlength="150" >
        <datalist id="list-name">
            <option value="นาง น้ำส้ม ซีบีอี"></option>
            <option value="นาย บัว สีน้ำเงิน"></option>
        </datalist>
    </input>
    <br> 
    <div class='center'>
        <label id='app_name_alert' class='alert tabOne' style='display:none'>ช่องนี้เว้นว่างไม่ได้</label>
    </div>
    <br>
    <label>วันที่อนุญาต <label class='alert''>*</label></label>
    <br>
    <input type="text" id="datepicker5" placeholder=""  class='tabOne' style="width: 95%" readonly>
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
                    console.log('date')
                }
                if (app_name_text.value.trim().length === 0) {
                    app_name_text.classList.add('alertInput')
                    app_name_alert.style.display = ''
                    console.log('app_name_text')
                }
                Swal.showValidationMessage(
                    `ข้อมูลไม่ครบ`
                )
            } else {
                return new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        resolve();
                    })
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
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
    });
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
                        resolve();
                    }, 1000);
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
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
    });
}

//ไม่อนุมัติ
function notApprovalPopup() {
    let html_display = `
<div style = 'text-align:left; display:block' >
<br>
    <label class = 'topic' > ชื่อผู้อนุญาต </label> 
    <br>
    <input list='list-name' id="not_app_name" class='tabOne' style="width:95%" maxlength="150" >
        <datalist id="list-name">
            <option value="นาง น้ำส้ม ซีบีอี"></option>
            <option value="นาย บัว สีน้ำเงิน"></option>
        </datalist>
    </input>
    <br> 
    <div class='center'>
        <label id='not_app_name_alert' class='alert tabOne' style='display:none' >ช่องนี้เว้นว่างไม่ได้</label>
    </div>
    <br>
    <label class = 'topic' > เหตุผลที่ยกเลิก </label> 
    <br>
    <br>
    <textarea id='non_cancle_Text' class='tabOne' row='10' style='width:95%;' ></textarea>
    <br> 
    <div class='center'>
        <label id='non_cancle_alert' class='alert tabOne' style='display:none' >ช่องนี้เว้นว่างไม่ได้</label>
    </div>
    <br>
    <label>วันที่อนุญาต</label>
    <br>
    <input type="text" id="datepicker6" placeholder=""  class='tabOne' style="width: 95%" readonly>
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
            let not_app_name_text = document.getElementById('not_app_name')
            let not_app_name_alert = document.getElementById('not_app_name_alert')

            let non_cancle_Text = document.getElementById('non_cancle_Text')
            let non_cancle_alert = document.getElementById('non_cancle_alert')

            let datepicker6 = document.getElementById('datepicker6')
            let datepicker6_alert = document.getElementById('datepicker6_alert')

            //เซตให้มันกลับเป็น style แบบเดิมก่อน
            not_app_name_text.classList.remove('alertInput')
            datepicker6.classList.remove('alertInput')
            non_cancle_Text.classList.remove('alertInput')
            not_app_name_alert.style.display = 'none'
            non_cancle_alert.style.display = 'none'
            datepicker6_alert.style.display = 'none'

            if (not_app_name_text.value.trim().length === 0 || non_cancle_Text.value.trim().length === 0 || datepicker6.value.trim().length === 0) {
                if (not_app_name_text.value.trim().length === 0) {
                    not_app_name_text.classList.add('alertInput')
                    not_app_name_alert.style.display = ''
                }
                if (non_cancle_Text.value.trim().length === 0) {
                    non_cancle_Text.classList.add('alertInput')
                    non_cancle_alert.style.display = ''
                }
                if (datepicker6.value.trim().length === 0) {
                    datepicker6.classList.add('alertInput')
                    datepicker6_alert.style.display = ''
                }

                Swal.showValidationMessage(
                    `ข้อมูลไม่ครบ`
                )
            } else {
                return new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        resolve();
                    }, 1000);
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
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
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
        <a class='topic' style="margin-left: 0.65vw;"> ใบเสร็จเล่มที่ </a>
        <input type='number' id="pay_book" class='tabOne' style="margin-left:1vw;width:8vw" maxlength="150"></input><br>
        <a id='pay_book_alert' class='tabTwo alert'  style='display:none'>ช่องนี้เว้นว่างไม่ได้</a>
        <br>
        <a class='topic' style="margin-left: 3.7vw;"> เลขที่ </a>
        <input type='text' id="pay_order_no"class='tabOne' style="width:8vw; margin-left:1vw" maxlength="7"onkeyup='checkOrderNo(this.value, "pay_order_no")'</input>
        <br>
        <a id='pay_order_no_alert' class='tabTwo alert'  style='display:none'>ช่องนี้เว้นว่างไม่ได้</a>
        <br>
        <a class='topic' style="margin-left: 0.5vw;"> ค่าธรรมเนียม </a>
        <input type='number' id="pay_fee" class='tabOne' style="margin-left:1vw;width:8vw" maxlength="150"></input><br>
        <a id='pay_fee_alert' class='tabTwo alert'  style='display:none'>ช่องนี้เว้นว่างไม่ได้</a>
        <br>
        <a class='topic' style="margin-left: 3vw;"> ค่าปรับ </a>
        <input type='number' id="pay_fine" class='tabOne' style="margin-left:1vw;width:8vw" maxlength="150"></input><br>
        <a id='pay_fine_alert' class='tabTwo alert'  style='display:none'>ช่องนี้เว้นว่างไม่ได้</a>
        <br>
        <a class='topic' style="margin-left: 0.3vw;"> ออกให้เมื่อวันที่ </a>
        <input id="datepicker7" class='tabOne' style="margin-left:0.5vw;width:8vw" maxlength="150" readonly></input><br>
        <a id='datepicker7_alert' class='tabTwo alert'  style='display:none'>ช่องนี้เว้นว่างไม่ได้</a>
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
            let pay_book = document.getElementById('pay_book')
            let pay_book_alert = document.getElementById('pay_book_alert')

            let pay_order_no = document.getElementById('pay_order_no')
            let pay_order_no_alert = document.getElementById('pay_order_no_alert')

            let pay_fee = document.getElementById('pay_fee')
            let pay_fee_alert = document.getElementById('pay_fee_alert')

            let pay_fine = document.getElementById('pay_fine')
            let pay_fine_alert = document.getElementById('pay_fine_alert')

            let datepicker7 = document.getElementById('datepicker7')
            let datepicker7_alert = document.getElementById('datepicker7_alert')

            //เซตให้มันกลับเป็น style แบบเดิมก่อน
            pay_book.classList.remove('alertInput')
            pay_order_no.classList.remove('alertInput')
            pay_fee.classList.remove('alertInput')
            pay_fine.classList.remove('alertInput')
            datepicker7.classList.remove('alertInput')

            pay_book_alert.style.display = 'none'
            pay_order_no_alert.innerText = 'ช่องนี้เว้นว่างไม่ได้'
            pay_order_no_alert.style.display = 'none'
            pay_fee_alert.style.display = 'none'
            pay_fine_alert.style.display = 'none'
            datepicker7_alert.style.display = 'none'

            if (pay_book.value.trim().length === 0 || pay_order_no.value.trim().length != 7 || pay_fee.value.trim().length === 0 || pay_fine.value.trim().length === 0 || datepicker7.value.trim().length === 0) {
                if (pay_book.value.trim().length === 0) {
                    pay_book.classList.add('alertInput')
                    pay_book_alert.style.display = ''
                }
                if (pay_order_no.value.trim().length === 0) {
                    pay_order_no.classList.add('alertInput')
                    pay_order_no_alert.style.display = ''
                }
                if (pay_order_no.value.trim().length != 7 && pay_order_no.value.trim().length > 0) {
                    pay_order_no.classList.add('alertInput')
                    pay_order_no_alert.style.display = ''
                    pay_order_no_alert.innerText = 'รูปแบบเลขที่ไม่ถูกต้อง ตัวอย่าง 01/2563'
                }
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
                        resolve();
                    }, 1000);
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
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
    });

}
//ต่อใบอนุญาต
function perPopup() {
    let html_display = `
<div >
<br>
    <label class = 'per_topic' style='font-size:1.5vw'> ต่อใบอนุญาติ เลขที่ A0001/2563 </label> 
    <br>
    <br>
        <a class='topic' style="margin-left: 0.65vw;"> ใบเสร็จเล่มที่ </a>
        <input type='number' id="per_pay_book" class='tabOne' style="margin-left:1vw;width:8vw" maxlength="150"></input><br>
        <a id='per_pay_book_alert' class='tabTwo alert' style='display:none'>ช่องนี้เว้นว่างไม่ได้</a>
        <br>
        <a class='topic' style="margin-left: 3.7vw;"> เลขที่ </a>
        <input id="per_pay_order_no" class='tabOne' style="width:8vw;margin-left:1vw" maxlength="7" onkeyup='checkOrderNo(this.value, "per_pay_order_no")'></input><br>
        <a id='per_pay_order_no_alert' class='tabTwo alert' style='display:none'>ช่องนี้เว้นว่างไม่ได้</a>
        <br>
        <a class='topic' style="margin-left: 0.5vw;"> ค่าธรรมเนียม </a>
        <input type='number' id="per_pay_fee" class='tabOne' style="margin-left:1vw;width:8vw" maxlength="150"></input><br>
        <a id='per_pay_fee_alert' class='tabTwo alert' style='display:none'>ช่องนี้เว้นว่างไม่ได้</a>
        <br>
        <a class='topic' style="margin-left: 3vw;"> ค่าปรับ </a>
        <input type='number' id="per_pay_fine" class='tabOne' style="margin-left:1vw;width:8vw" maxlength="150"></input><br>
        <a id='per_pay_fine_alert' class='tabTwo alert' style='display:none'>ช่องนี้เว้นว่างไม่ได้</a>
        <br>
        <a class='topic' style="margin-left: 0.3vw;"> ออกให้เมื่อวันที่ </a>
        <input id="datepicker8" class='tabOne' style="margin-left:0.5vw;width:8vw" maxlength="150" readonly></input><br>
        <a id='datepicker8_alert' class='tabTwo alert' style='display:none'>ช่องนี้เว้นว่างไม่ได้</a>
        <br>
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
            let per_pay_book = document.getElementById('per_pay_book')
            let per_pay_book_alert = document.getElementById('per_pay_book_alert')

            let per_pay_order_no = document.getElementById('per_pay_order_no')
            let per_pay_order_no_alert = document.getElementById('per_pay_order_no_alert')

            let per_pay_fee = document.getElementById('per_pay_fee')
            let per_pay_fee_alert = document.getElementById('per_pay_fee_alert')

            let per_pay_fine = document.getElementById('per_pay_fine')
            let per_pay_fine_alert = document.getElementById('per_pay_fine_alert')

            let datepicker8 = document.getElementById('datepicker8')
            let datepicker8_alert = document.getElementById('datepicker8_alert')

            //เซตให้มันกลับเป็น style แบบเดิมก่อน
            per_pay_book.classList.remove('alertInput')
            per_pay_order_no.classList.remove('alertInput')
            per_pay_fee.classList.remove('alertInput')
            per_pay_fine.classList.remove('alertInput')
            datepicker8.classList.remove('alertInput')

            per_pay_book_alert.style.display = 'none'
            per_pay_order_no_alert.style.display = 'none'
            per_pay_order_no_alert.innerText = 'ช่องนี้เว้นว่างไม่ได้'
            per_pay_fee_alert.style.display = 'none'
            per_pay_fine_alert.style.display = 'none'
            datepicker8_alert.style.display = 'none'

            if (per_pay_book.value.trim().length === 0 || per_pay_order_no.value.trim().length != 7 || per_pay_fee.value.trim().length === 0 || per_pay_fine.value.trim().length === 0 || datepicker8.value.trim().length === 0) {
                if (per_pay_book.value.trim().length === 0) {
                    per_pay_book.classList.add('alertInput')
                    per_pay_book_alert.style.display = ''
                }
                if (per_pay_order_no.value.trim().length === 0) {
                    per_pay_order_no.classList.add('alertInput')
                    per_pay_order_no_alert.style.display = ''
                }
                if (per_pay_order_no.value.trim().length != 7 && per_pay_order_no.value.trim().length > 0) {
                    per_pay_order_no.classList.add('alertInput')
                    per_pay_order_no_alert.style.display = ''
                    per_pay_order_no_alert.innerText = 'รูปแบบเลขที่ไม่ถูกต้อง ตัวอย่าง 01/2563'
                }
                if (per_pay_fee.value.trim().length === 0) {
                    per_pay_fee.classList.add('alertInput')
                    per_pay_fee_alert.style.display = ''
                }
                if (per_pay_fine.value.trim().length === 0) {
                    per_pay_fine.classList.add('alertInput')
                    per_pay_fine_alert.style.display = ''
                }
                if (datepicker8.value.trim().length === 0) {
                    datepicker8.classList.add('alertInput')
                    datepicker8_alert.style.display = ''
                }
                Swal.showValidationMessage(
                    `ข้อมูลไม่ครบ`
                )
            } else {
                return new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        resolve();
                    }, 1000);
                });
            }
        }
    }).then((result) => {
        if (result.value) {
            let html_commit = `
        <div>
            <a id='success_new_id'>เลขที่ใหม่ : A0001/2563</a><br>
            <a id='success_date_issue'>วันที่เริ่มใบ : 25-05-2563 </a><br>
            <a id='success_date_expired'>วันที่หมดอายุ : 25-05-2564 </a>
        </div>
        `
            Swal.fire({
                html: html_commit,
                icon: "success",
                confirmButtonColor: "#009688"
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
    });
}
//โอนใบอนุญาติ
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
                }, 1000);
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
        icon:'warning',
        preConfirm: function () {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    resolve();
                }, 1000);
            });
        }
    }).then((result) => {
        if (result.value) {
            Swal.fire({
                title: 'ยกเลิกสำเร็จ',
                icon:'success'
            })
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
    });
}
//เพิ่มใบอนุญาต
function addPopup(type_menu) {
    console.log(event)
    let html_display = `
    <div style = 'text-align:left; display:block;margin-left:2vw' >
    <br>
    <a class = 'topics'  > เพิ่มใบอนุญาต  </a> 
    <br>
    <a class = 'topics tabOne' style='font-size:1.3vw'> สถานประกอบการ : E000001  </a> 
    <br>
    <a class = 'topics tabOne' style='font-size:1.3vw'> ชื่อสถานประกอบการ : ร้านขายน้ำอ้อย  </a> 
    <br>
    <br>    
    <a class = 'topics '>ประเภทที่ต้องการเพิ่มใบอนุญาต </a> 
    <br>
    
    <select id="add_name" class='tabOne' style="width:85%" maxlength="150" >
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
                }, 1000);
            });
        }
    }).then((result) => {
        if (result.value) {
            let attr = document.getElementById('add_name').value
            if (attr === type_menu) {
                Swal.fire({
                    title: 'มีใบอนุญาตฉบับนี้แล้ว',
                    width: '35%',
                    customClass: 'swal-height',
                    showConfirmButton: true,
                    confirmButtonText: "ตกลง",
                    confirmButtonColor: "#009688",
                    closeOnConfirm: false,
                    icon: "error"
                })
            } else {
                openPage(attr)
                console.log(`page -->`)
            }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
    });
}
let gropData = {
    'temp_event': undefined

}

function resetActiveRightClick() {
    console.log(` resert => ${gropData.temp_event != undefined}`)
    if (gropData.temp_event != undefined) {
        gropData.temp_event.style.background = ''
    }
}
function markList(event) {
    if (gropData.temp_event === undefined) {
        gropData.temp_event = event
        event.style.background = '#a59c9c'
    } else {
        gropData.temp_event.style.background = ''
        gropData.temp_event = event
        event.style.background = '#a59c9c'
    }
}
function openPage(type) {
    
    switch (type) {
        case 'กิจการฌาปณสถาน':
            window.location.href = '../request/request_crematory.html'
            break;
        case 'กิจการที่เป็นอันตรายต่อสุขภาพ':
            window.location.href = '../request/request_health_danger.html'
            break;
        case 'ใบอนุญาตให้ใช้สถานที่เป็นตลาดเอกชน':
            window.location.href = '../request/request_market.html'
            break;
        case 'หนังสือรับรองการแจ้งจัดตั้งสถานที่สะสมอาหาร':
            window.location.href = '../request/request_area_less_correct.html'
            break;
        case 'หนังสือรับรองการแจ้งจัดตั้งสถานที่จำหน่ายอาหาร':
            window.location.href = '../request/request_area_less_sell.html'
            break;
        case 'ใบอนุญาตจัดจัดตั้งสถานที่สะสมอาหาร':
            window.location.href = '../request/request_area_more_correct.html'
            break;
        case 'ใบอนุญาตจัดตั้งสถานที่จำหน่ายอาหาร':
            window.location.href = '../request/request_area_more_sell.html'
            break;
        case 'ใบอนุญาตเร่ขายสินค้าในที่หรือทางสาธารณะ':
            window.location.href = '../request/request_public_hawk.html'
            break;
        default:
            //ใบอนุญาตจำหน่ายสินค้าในที่หรือทางสาธารณะ
            window.location.href = '../request/request_public_sell.html'
            break;
    }
}
$(function () {
    $.contextMenu({
        selector: '.detail-menu',

        callback: function (key, options) {
            let type = this[0].cells[1].innerText.trim()
            if (key === 'detail') {
                openPage(type)
            }
        },
        items: {
            "detail": { name: "ดูรายละเอียด" }
        },
        autoHide: true
    });
    //ปกติ
    $.contextMenu(
        {
            selector: '.available-menu',
            autoHide: true,
            callback: function (key, options) {
                let type = this[0].cells[1].innerText.trim()
                let indexData = this[0].rowIndex
                switch (key) {
                    case 'per':
                        perPopup()
                        break;
                    case 'transfer':
                        transferPopup()
                        break;
                    case 'add':
                        addPopup(type)
                        break;
                    case 'delete':
                        canclePopup()
                        break;
                    default:
                        openPage(type)
                        break;
                }
                console.log(key)
                // window.console && console.log(m) || alert(m); 
            },
            items: {
                "per": { name: "ต่อใบอนุญาต" },
                "transfer": { name: "โอนใบอนุญาต" },
                "add": { name: "เพิ่มใบอนุญาต" },
                "detail": { name: "ดูรายละเอียด" },
                "delete": { name: "ยกเลิก" }

            }
        });
    //อนุมัติ
    $.contextMenu({
        selector: '.approval-menu',

        callback: function (key, options) {
            let type = this[0].cells[1].innerText.trim()
            let indexData = this[0].rowIndex
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
                    openPage(type)
                    break;
            }
        },
        items: {
            "pay": { name: "ชำระเงินแล้ว" },
            "cancel-status": { name: "ยกเลิกสถานะ" },
            "detail": { name: "ดูรายละเอียด" },
            "delete": { name: "ยกเลิก" }

        },
        autoHide: true
    });
    //โอน
    $.contextMenu({
        selector: '.transfer-menu',

        callback: function (key, options) {
            let type = this[0].cells[1].innerText.trim()
            if (key === 'detail') {
                openPage(type)
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
            if (key === 'detail') {
                openPage(type)
            }
            if (key === 'delete') {
                canclePopup(type)
            }
        },
        items: {
            "detail": { name: "ดูรายละเอียด" },
            "delete": { name: "ยกเลิก" }

        },
        autoHide: true
    });
    //รออนุมัติ
    $.contextMenu({
        selector: '.wait-menu',

        callback: function (key, options) {
            let type = this[0].cells[1].innerText.trim()
            let indexData = this[0].rowIndex
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
                    openPage(type)
                    break;
            }
        },
        items: {
            "approval": { name: "อนุมัติ" },
            "not-approval": { name: "ไม่อนุมัติ" },
            "detail": { name: "ดูรายละเอียด" },
            "delete": { name: "ยกเลิก" }

        },
        autoHide: true
    });
    //หมดอายุ
    $.contextMenu({
        selector: '.expire-menu',

        callback: function (key, options) {
            let type = this[0].cells[1].innerText.trim()
            if (key === 'detail') {
                openPage(type)
            }
        },
        items: {
            "detail": { name: "ดูรายละเอียด" }

        },
        autoHide: true
    });

});