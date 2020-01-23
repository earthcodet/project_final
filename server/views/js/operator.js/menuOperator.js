var data = false
var deleteData = false
var addNew = false
let tSearchName = ''
let tSearchSurname = ''
let tSearchId = ''
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
    let _redyToInsert = preInsert()

    if (_redyToInsert) {
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
            preConfirm: function () {
                return new Promise(function (resolve, reject) {
                    setTimeout(function () {
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
                var datetime = new Date();
                let dateForUpdate = datetime.toISOString().slice(0, 10)
                let temp = dateForUpdate.split('-')
                let day = temp[2]
                let month = temp[1]
                let year = temp[0]
                let format = `${day}-${month}-${year}`
                document.getElementById('last-update').value = format
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // Swal.fire("บันทึกล้มเหลว");
            }
        });
    }

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
function searchPersonal() {
    console.log('run')
    let id = document.getElementById('popSearchId').value.trim()
    let name = document.getElementById('popSearchName').value.trim()
    let surname = document.getElementById('popSearchSurname').value.trim()
    console.log(`X id = ${id} , name = ${name} , surname = ${surname}`)
    if (id.length === 0) {
        id = 'none'
    }
    if (name.length === 0) {
        name = 'none'
    }
    if (surname.length === 0) {
        surname = 'none'
    }
    //ไม่ให้ค้นหา คำค้นหาเดิม
    if (tSearchId != id || tSearchName != name || tSearchSurname != surname) {
        return new Promise((resolve, reject) => {
            tSearchName = name
            tSearchId = id  
            tSearchSurname = surname


            console.log('Searching')
            axios.get(`http://localhost:5000/search/personal/${id}/${name}/${surname}`).then((result) => {
                console.log(result.data)
                createResultSearch(result.data)
                return resolve(result.data);
            })
        })
    } else {
        console.log(`list search item not change`)
    }
}
function createResultSearch(data) {
    var tbl = document.getElementById("resultItems");
    // tbl.removeChild(tbl.getElementsByTagName("tbody")[0])
    if (tbl.getElementsByTagName("tbody")[0] != null || tbl.getElementsByTagName("tbody")[0] != undefined) {
        tbl.removeChild(tbl.getElementsByTagName("tbody")[0])
    }
    // document.getElementsByTagName('tbody')[0].parentNode.removeChild( document.getElementsByTagName('tbody')[0]);
    var tblBody = document.createElement('tbody')
    // creating all cells
    for (var i = 0; i < data.length; i++) {
        // creates a table row
        var row = document.createElement("tr");

        for (var j = 0; j < 4; j++) {

            var cell = document.createElement("td");
            if (j === 0) {
                var cellText = document.createTextNode(data[i].PERSONAL_NAME);
            } else if (j === 1) {
                var cellText = document.createTextNode(data[i].PERSONAL_SURNAME);
            } else if (j === 2) {
                var cellText = document.createTextNode(data[i].AID);
            } else {
                var cellText = document.createTextNode(data[i].PERSONAL_PERSONAL_ID);
            }
            cell.appendChild(cellText);
            row.appendChild(cell);
        }

        // add the row to the end of the table body
        tblBody.appendChild(row);
    }

    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    /*
    <tr ">
                        <td>นายสมหมาย</td>
                        <td>จงรัก</td>
                        <td>169 ถนน ลงหาดบางแสน ตำบลแสนสุข อำเภอเมืองชลบุรี ชลบุรี 20131</td>
                        <td>1011122111111</td>
                    </tr>
    */
}

function searchOparator() {
    console.log(addNew)
    if (addNew) {
        insertTEST()
    } else {
        var swal_html = `<div >
        <div class="display-center">
                    <h5 style="font-size: 100%;">
                        ชื่อ :
                        <input type="text" id="popSearchName" style="width: 18%;">
                        นามสกุล :
                        <input type="text" id="popSearchSurname" style="width: 18%;" >
                        เลขบัตรประจำตัว :
                        <input type="text" id="popSearchId" style="width: 18%;" >
                        <button type="button" style="width: auto;height: auto;"
                        class="btn btn-secondary is-color" onClick='searchPersonal()'>
    
                                <i class="fa fa-search"></i> 
                                ค้นหา
                           
                        </button>
                    </h5>
                </div>
        <div class="search-popup-height">
            <table id='resultItems' class="table tablesearch table-hover cursor-pointer">
                <thead>
                  <tr class="is-color ">
                    <th>ชื่อ</th>
                    <th>นามสกุล</th>
                    <th>ที่อยู่</th>
                    <th>เลขบัตรประจำตัว</th>
                  </tr>
                </thead>
              </table>
        </div>
    </div>`

        Swal.fire({
            title: "ค้นหารายชื่อผู้ประกอบการ",
            html: swal_html,
            width: '80%',
            customClass: 'swal-height',
            showConfirmButton: false,
            closeOnConfirm: false,
            closeOnCancel: false
        });
    }

}
function restoreTEST() {
    deleteData = false
    setIdDelete()
    disableMenuAll()
    enableMenu('addMenu')
    enableMenu('editMenu')
    enableMenu('deleteMenu')
}

