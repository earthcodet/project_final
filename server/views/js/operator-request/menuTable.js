
// อนุญาต
function approvalPopup(){
    let html_display = `
    <div style = 'text-align:left; display:block' >
        <label class = 'topic' > ชื่อผู้อนุญาต </label> 
        <br>
        <input list='list-name' id="app_name" class='tabOne' style="width:30vw;" maxlength="150" >
            <datalist id="list-name">
                <option value="นาง น้ำส้ม ซีบีอี"></option>
                <option value="นาย บัว สีน้ำเงิน"></option>
            </datalist>
        </input>
        <br> 
        <div class='center'>
            <label class='alert tabOne' >ช่องนี้เว้นว่างไม่ได้</label>
        </div>
        <br>
        <label>วันที่อนุญาต</label>
        <br>
        <input type="text" id="datepicker5" placeholder=""  class='tabOne' style="width: 30vw" readonly>
        <br> 
        <div class='center'>
            <label class='alert tabOne' >ช่องนี้เว้นว่างไม่ได้</label>
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
        closeOnCancel: false
    })
}
let html_display = `
<div style = 'text-align:left; display:block' >
    <label class = 'topic' > ชื่อผู้อนุญาต </label> 
    <br>
    <input list='list-name' id="app_name" class='tabOne' style="width:30vw;" maxlength="150" >
        <datalist id="list-name">
            <option value="นาง น้ำส้ม ซีบีอี"></option>
            <option value="นาย บัว สีน้ำเงิน"></option>
        </datalist>
    </input>
    <br> 
    <div class='center'>
        <label class='alert tabOne' >ช่องนี้เว้นว่างไม่ได้</label>
    </div>
    <br>
    <label>วันที่อนุญาต</label>
    <br>
    <input type="text" id="datepicker5" placeholder=""  class='tabOne' style="width: 30vw" readonly>
    <br> 
    <div class='center'>
        <label class='alert tabOne' >ช่องนี้เว้นว่างไม่ได้</label>
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
    closeOnCancel: false
})









$(function () {
    $.contextMenu({
        selector: '.detail-menu',
        callback: function (key, options) {
        },
        items: {
            "detail": { name: "ดูรายละเอียด" }
        }
    });
    //ปกติ
    $.contextMenu({
        selector: '.available-menu',
        callback: function (key, options) {
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

    $('.context-menu-one').on('click', function (e) {
        console.log('clicked', this);
    })
});