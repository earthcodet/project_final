
//อนุญาต
function approvalPopup() {
    let html_display = `
    <div style = 'text-align:left; display:block' >
    <br>
    <label class = 'topic' > ชื่อผู้อนุญาต </label> 
    <br>
    <input list='list-name' id="app_name" class='tabOne' style="width:95%" maxlength="150" >
        <datalist id="list-name">
            <option value="นาง น้ำส้ม ซีบีอี"></option>
            <option value="นาย บัว สีน้ำเงิน"></option>
        </datalist>
    </input>
    <br> 
    <div class='center'>
        <label id='app_name_alert' class='alert tabOne' >ช่องนี้เว้นว่างไม่ได้</label>
    </div>
    <br>
    <label>วันที่อนุญาต</label>
    <br>
    <input type="text" id="datepicker5" placeholder=""  class='tabOne' style="width: 95%" readonly>
    <br> 
    <div class='center'>
        <label id='datepicker5_alert' class='alert tabOne' >ช่องนี้เว้นว่างไม่ได้</label>
    </div>

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
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    resolve();
                }, 1000);
            });
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
        <label id='cancleTextPopup_alert' class='alert tabOne' >ช่องนี้เว้นว่างไม่ได้</label>
    </div>

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
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    resolve();
                }, 1000);
            });
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
    <input list='list-name' id="app_name" class='tabOne' style="width:95%" maxlength="150" >
        <datalist id="list-name">
            <option value="นาง น้ำส้ม ซีบีอี"></option>
            <option value="นาย บัว สีน้ำเงิน"></option>
        </datalist>
    </input>
    <br> 
    <div class='center'>
        <label id='app_name_alert' class='alert tabOne' >ช่องนี้เว้นว่างไม่ได้</label>
    </div>
    <br>
    <label class = 'topic' > เหตุผลที่ยกเลิก </label> 
    <br>
    <br>
    <textarea id='canText' class='tabOne' row='10' style='width:95%;' ></textarea>
    <br> 
    <div class='center'>
        <label id='canText_alert' class='alert tabOne' >ช่องนี้เว้นว่างไม่ได้</label>
    </div>
    <br>
    <label>วันที่อนุญาต</label>
    <br>
    <input type="text" id="datepicker6" placeholder=""  class='tabOne' style="width: 95%" readonly>
    <br> 
    <div class='center'>
        <label id='datepicker6_alert' class='alert tabOne' >ช่องนี้เว้นว่างไม่ได้</label>
    </div>
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
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    resolve();
                }, 1000);
            });
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
<div style = 'text-align:left; display:block' >
<br>
    <label class = 'topic' style='font-size:1.5vw'> ชำระเงิน </label> 
    <br>
    <br>
    <div class='row'>
        <div class='col'>
            <a class = 'topic'> ใบเสร็จเล่มที่  </a> 
            <input type='number' id="pay_book" class='tabOne' style="margin-left:2.1vw;width:50%" maxlength="150" ></input>
            <div class='center' >
                <a id = 'pay_book_alert' class='tabTwo alert'>ช่องนี้เว้นว่างไม่ได้</a>
            </div>
            <br>
            <a class = 'topic'> ค่าธรรมเนียม  </a> 
            <input type='number' id="pay_fee" class='tabOne' style="margin-left:1.9vw;width:50%" maxlength="150" ></input>
            <div class='center' >
                <a id = 'pay_fee_alert' class='tabTwo alert'>ช่องนี้เว้นว่างไม่ได้</a>
            </div>
            <br> 
            <a class = 'topic'> ออกให้เมื่อวันที่  </a> 
            <input  id="datepicker7" class='tabOne' style="width:50%" maxlength="150" ></input>
            <div class='center' >
                <a id = 'datepicker7_alert' class='tabTwo alert'>ช่องนี้เว้นว่างไม่ได้</a>
            </div>
        </div>
        <div class='col'>
            <a class = 'topic'> เลขที่  </a> 
            <input  id="pay_order_no" class='tabOne' style="width:50%;margin-left:1.9vw" maxlength="150" ></input>
            <div class='center' >
                <a id = 'pay_order_no_alert' class='tabOne alert'>ช่องนี้เว้นว่างไม่ได้</a>
            </div>
            <br>
            <a class = 'topic'> ค่าปรับ  </a> 
            <input type='number' id="pay_fine" class='tabOne' style="width:50%" maxlength="150" ></input>
            <div class='center' >
                <a id = 'pay_fine_alert' class='tabOne alert'>ช่องนี้เว้นว่างไม่ได้</a>
            </div>
        </div>
    </div>
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
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    resolve();
                }, 1000);
            });
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
<div style = 'text-align:left; display:block' >
<br>
    <label class = 'per_topic' style='font-size:1.5vw'> ต่อใบอนุญาติ เลขที่ A0001/2563 </label> 
    <br>
    <br>
    <div class='row'>
        <div class='col'>
            <a class = 'topic'> ใบเสร็จเล่มที่  </a> 
            <input type='number' id="per_pay_book" class='tabOne' style="margin-left:2.1vw;width:50%" maxlength="150" ></input>
            <div class='center' >
                <a id = 'per_pay_book_alert' class='tabTwo alert'>ช่องนี้เว้นว่างไม่ได้</a>
            </div>
            <br>
            <a class = 'topic'> ค่าธรรมเนียม  </a> 
            <input type='number' id="per_pay_fee" class='tabOne' style="margin-left:1.9vw;width:50%" maxlength="150" ></input>
            <div class='center' >
                <a id = 'per_pay_fee_alert' class='tabTwo alert'>ช่องนี้เว้นว่างไม่ได้</a>
            </div>
            <br> 
            <a class = 'topic'> ออกให้เมื่อวันที่  </a> 
            <input  id="datepicker8" class='tabOne' style="width:50%" maxlength="150" ></input>
            <div class='center' >
                <a id = 'datepicker8_alert' class='tabTwo alert'>ช่องนี้เว้นว่างไม่ได้</a>
            </div>
        </div>
        <div class='col'>
            <a class = 'topic'> เลขที่  </a> 
            <input  id="per_pay_order_no" class='tabOne' style="width:50%;margin-left:1.9vw" maxlength="150" ></input>
            <div class='center' >
                <a id = 'per_pay_order_no_alert' class='tabOne alert'>ช่องนี้เว้นว่างไม่ได้</a>
            </div>
            <br>
            <a class = 'topic'> ค่าปรับ  </a> 
            <input  type='number' id="per_pay_fine" class='tabOne' style="width:50%" maxlength="150" ></input>
            <div class='center' >
                <a id = 'per_pay_fine_alert' class='tabOne alert'>ช่องนี้เว้นว่างไม่ได้</a>
            </div>
        </div>
    </div>
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
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    resolve();
                }, 1000);
            });
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
    <div class='center'>
        <label id='app_name_alert' class='alert tabOne' >ช่องนี้เว้นว่างไม่ได้</label>
    </div>
    
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
            let attr = document.getElementById('add_name')
            if (attr.value === 'ใบอนุญาตจำหน่ายสินค้าในที่หรือทางสาธารณะ') {
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
                console.log(`page -->`)
            }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
    });
}
//detail
function detailPopup() {

}
let gropData = {
    'temp_event': undefined

}
function resetActiveRightClick() {
    console.log(` resert => ${gropData.temp_event != undefined}`)
    if (gropData.temp_event != undefined) {
        gropData.temp_event.style.background = ''
        gropData.temp_event = undefined
    }
}

$(function () {
    $.contextMenu({
        selector: '.detail-menu',
        callback: function (key, options) {
            if (key === 'detail') {

            }
        },
        items: {
            "detail": { name: "ดูรายละเอียด" }
        }
    });
    //ปกติ
    $.contextMenu({
        selector: '.available-menu',
        callback: function (key, options) {
            console.log(this[0].rowIndex)
            console.log(this)
            // if (gropData.temp_event === undefined) {
            //     gropData.temp_event = event.path[1]
                
            // }
            // else {
            //     gropData.temp_event.style.background = ''
            //     gropData.temp_event = event.path[1]
            // }
            // console.log(event)
            // event.path[1].style.background = '#a59c9c'
            if (key === "transfer") {
                Swal.fire({
                    title: "โอนใบอนุญาต",
                    html: `Hello, wor`,
                    width: '80%',
                    customClass: 'swal-height',
                    showConfirmButton: false,
                    closeOnConfirm: false,
                    closeOnCancel: false
                });
                console.log(key + "Yes")
            } else {

                console.log(key + "No")
            }

            console.log(key)
            // window.console && console.log(m) || alert(m); 
        },
        items: {
            "sep2": "---------",
            "per": { name: "ต่อใบอนุญาต" },
            "transfer": { name: "โอนใบอนุญาต" },
            "add": { name: "เพิ่มใบอนุญาต" },
            "detail": { name: "ดูรายละเอียด" },
            "delete": { name: "ยกเลิก" },
            "sep1": "---------"

        }
    });
    //อนุมัติ
    $.contextMenu({
        selector: '.approval-menu',
        callback: function (key, options) {
        },
        items: {
            "pay": { name: "ชำระเงินแล้ว" },
            "cancel-status": { name: "ยกเลิกสถานะ" },
            "detail": { name: "ดูรายละเอียด" },
            "delete": { name: "ยกเลิก" }

        }
    });
    //โอน
    $.contextMenu({
        selector: '.transfer-menu',
        callback: function (key, options) {
        },
        items: {
            "detail": { name: "ดูรายละเอียด" }

        }
    });
    //ยกเลิก
    $.contextMenu({
        selector: '.cancel-menu',
        callback: function (key, options) {
        },
        items: {
            "detail": { name: "ดูรายละเอียด" },
            "delete": { name: "ยกเลิก" }

        }
    });
    //รออนุมัติ
    $.contextMenu({
        selector: '.wait-menu',
        callback: function (key, options) {
        },
        items: {
            "approval": { name: "อนุมัติ" },
            "not-approval": { name: "ไม่อนุมัติ" },
            "detail": { name: "ดูรายละเอียด" },
            "delete": { name: "ยกเลิก" }

        }
    });
    //หมดอายุ
    $.contextMenu({
        selector: '.expire-menu',
        callback: function (key, options) {
        },
        items: {
            "detail": { name: "ดูรายละเอียด" }

        }
    });

});