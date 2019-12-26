var data = false
var deleteData = false

function exitTEST(menu){
    Swal.fire({
        title: "สำนักงานเทศบาล",
        html: "ต้องการออกจากระบบหรือไม่",
        showCancelButton: true,
        confirmButtonColor: "#009688",
        confirmButtonText: "ใช่",
        cancelButtonText: "ไม่ใช่",
        cancelButtonColor: '#dc3545',
        closeOnConfirm: false,
        closeOnCancel: false
    })
        .then((result) => {
            if (result.value) {
              if(menu == 'report' ||menu =='central')
                window.location.href = "../login.html"
                else
                window.location.href = "./login.html"
            } 
        });
}
function addTEST() {
    deleteData = false
    data = false
    disFunction()
    disableMenuAll()
    enableMenu('saveMenu')
}
function disableMenuAll() {
    document.getElementById('addMenu').classList.add('disableds')
    document.getElementById('saveMenu').classList.add('disableds')
    document.getElementById('editMenu').classList.add('disableds')
    document.getElementById('restoreMenu').classList.add('disableds')
    document.getElementById('deleteMenu').classList.add('disableds')
}

function enableMenu(id) {
    document.getElementById(id).classList.remove('disableds')
}

function insertTEST() {
    Swal.fire({
        title: "สำนักงานเทศบาล",
        html: "ต้องการบันทึกหรือไม่",
        showCancelButton: true,
        confirmButtonColor: "#009688",
        confirmButtonText: "ใช่",
        cancelButtonText: "ไม่ใช่",
        cancelButtonColor: '#dc3545',
        closeOnConfirm: false,
        closeOnCancel: false
    })
        .then((result) => {
            if (result.value) {
                Swal.fire({
                    html: "บันทึกสำเร็จ",
                    icon: "success",
                    confirmButtonColor: "#009688"
                });
                data = true
                disableMenuAll()
                enableMenu('addMenu')
                enableMenu('editMenu')
                enableMenu('deleteMenu')
                enableFunction()
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // Swal.fire("บันทึกล้มเหลว");
            }
        });
}
function editTEST() {
    if (!deleteData) {
        disableMenuAll()
        enableMenu('saveMenu')
        disFunction()
    } else {
        Swal.fire({
            title: "สำนักงานเทศบาล",
            html: "ข้อมูลอยู่ในสถานะลบแล้ว",
            confirmButtonColor: "#009688",
            closeOnConfirm: false,
            icon:'warning'
        })
    }
}

function deleteTEST() {
    deleteData = true
    disableMenuAll()
    enableMenu('addMenu')
    enableMenu('editMenu')
    enableMenu('restoreMenu')
}

function restoreTEST() {
    deleteData = false
    disableMenuAll()
    enableMenu('addMenu')
    enableMenu('editMenu')
    enableMenu('deleteMenu')
}

