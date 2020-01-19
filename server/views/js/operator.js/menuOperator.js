var data = false
var deleteData = false
var addNew = false
function exitTEST() {
    Swal.fire({
        title: "สำนักงานเทศบาล",
        html: "ต้องการออกจากระบบหรือไม่",
        showCancelButton: true,
        customClass: 'swal-height',
        confirmButtonColor: "#009688",
        confirmButtonText: "ใช่",
        cancelButtonText: "ไม่ใช่",
        cancelButtonColor: '#dc3545',
        closeOnConfirm: false,
        closeOnCancel: false
    })
        .then((result) => {
            if (result.value) {
                document.getElementById('exitMenu').classList.add('disableds')
                logout()
            }
        });
}
function logout() {
    location.replace("/logout")
}

function addTEST() {
    addNew = true
    deleteData = false
    data = false
    disFunction()
    disableMenuAll()
    enableMenu('saveMenu')
    var id = document.getElementById('id')
    if (id != null) {
        id.style.textDecoration = ''
    }
    resetFunction()
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
        customClass: 'swal-height',
        confirmButtonColor: "#009688",
        confirmButtonText: "ใช่",
        cancelButtonText: "ไม่ใช่",
        cancelButtonColor: '#dc3545',
        closeOnConfirm: false,
        closeOnCancel: false,
        showLoaderOnConfirm: true,
        imageUrl: '../../img/img1.jpg',
        imageWidth: 'auto',
        imageHeight: '100%',
        imageAlt: 'Custom image',
        preConfirm: function() {
            return new Promise(function(resolve, reject) {
              setTimeout(function() {
                preInsert()
                insertToDatabase().then((data) => {
                    if (data) {
                        resolve();
                    }
                })
              }, 1000);
            });
          }
    }).then((result) => {
        if (result.value) {
            Swal.fire({
                html: "บันทึกสำเร็จ",
                icon: "success",
                confirmButtonColor: "#009688"
            });
            data = true
            addNew = false
            disableMenuAll()
            enableMenu('addMenu')
            enableMenu('editMenu')
            enableMenu('deleteMenu')
            enableFunction()
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            // Swal.fire("บันทึกล้มเหลว");
        }});
}

function editTEST() {
    if (!deleteData) {
        addNew = true
        console.log(addNew)
        disableMenuAll()
        enableMenu('saveMenu')
        disableFunction()
    } else {
        Swal.fire({
            title: "สำนักงานเทศบาล",
            html: "ข้อมูลอยู่ในสถานะลบแล้ว",
            confirmButtonColor: "#009688",
            closeOnConfirm: false,
            icon: 'warning'
        })
    }
}
function setIdDelete() {
    var id = document.getElementById('id')
    if (id != null) {
        if (id.style.textDecoration == '') {
            id.style.textDecoration = 'line-through'
        } else {
            id.style.textDecoration = ''
        }
    }
}
function deleteTEST() {
    Swal.fire({
        title: "สำนักงานเทศบาล",
        html: "ต้องการลบหรือไม่",
        icon: 'warning',
        showCancelButton: true,
        customClass: 'swal-height',
        // width: '30%',
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
                    html: "ลบสำเร็จ",
                    icon: "success",
                    confirmButtonColor: "#009688"
                });
                deleteData = true
                setIdDelete()
                disableMenuAll()
                enableMenu('addMenu')
                enableMenu('editMenu')
                enableMenu('restoreMenu')
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // Swal.fire("บันทึกล้มเหลว");
            }
        });

}

function restoreTEST() {
    deleteData = false
    setIdDelete()
    disableMenuAll()
    enableMenu('addMenu')
    enableMenu('editMenu')
    enableMenu('deleteMenu')
}

