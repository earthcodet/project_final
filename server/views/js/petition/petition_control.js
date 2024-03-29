let search_id = ''
let search_name = ''
let search_surname = ''
var data = false
var deleteData = false
var addNew = false
let personal_change = false
function addPage() {
    addNew = true
    deleteData = false
    data = false
    disableFunction()
    disableMenuAll()
    enableMenu('saveMenu')
    let temp_value = document.getElementById('request_id_report').value
    resetFunction()
    document.getElementById('request_id_report').value = temp_value
    if (document.getElementById('block_no1').style.display === 'none') {
        document.getElementById('block_no1').style.display = 'none'
        document.getElementById('button_block_1').style.display = 'none'
        document.getElementById('block_no2').style.display = ''
        document.getElementById('button_block_2').style.display = ''
    } else {
        document.getElementById('block_no1').style.display = ''
        document.getElementById('button_block_1').style.display = ''
        document.getElementById('block_no2').style.display = 'none'
        document.getElementById('button_block_2').style.display = 'none'
    }
    totalFiles_report = []
    resetP()
    document.getElementById('c_id').disabled = false
    document.getElementById('btn_name').disabled = false
    deleteImageAll()
    displayBlock(1)
    document.getElementById('request_id_report').value = ''
    document.getElementById('datepicker4').value = ''
    document.getElementById('datepicker3').value = ''
}
function insertPage() {
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
        imageUrl: '../../img/img1.jpg',
        imageWidth: 'auto',
        imageHeight: '100%',
        imageAlt: 'Custom image',
        showLoaderOnConfirm: true,
        preConfirm: function () {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    console.log('check input')
                    if (checkInputInsert() === true) {
                        if (document.getElementById('c_id').value.trim().length != 3) {
                            Swal.fire({
                                html: "เลขที่ใบคำร้องต้องมี 3 หลัก",
                                icon: "error",
                                confirmButtonColor: "#009688"
                            });
                        } else {
                            console.log('check input = true')
                            insertData(type).then((data) => {
                                if (data) {
                                    resolve();
                                } else {
                                    if (!data) {
                                        Swal.fire({
                                            html: "เลขที่ใบคำร้อง มีในระบบแล้ว",
                                            icon: "error",
                                            confirmButtonColor: "#009688"
                                        });
                                    } else {
                                        Swal.fire({
                                            html: "เกิดข้อผิดพลาดทางเซิพเวอร์",
                                            icon: "error",
                                            confirmButtonColor: "#009688"
                                        });
                                    }

                                }
                            })
                        }
                    } else {
                        console.log('check input = false')
                        Swal.fire({
                            html: "ไม่สามารถเว้นว่างได้",
                            icon: "error",
                            confirmButtonColor: "#009688"
                        });
                    }
                }), 1000
            });
        }
    })
        .then((result) => {
            if (result.value) {
                Swal.fire({
                    html: "บันทึกสำเร็จ",
                    icon: "success",
                    confirmButtonColor: "#009688"
                }).then((result_data) => {
                    if (window.location.href.split('?').length === 1) {
                        disableMenuAll()
                        location.replace(window.location.href + '?com_id=' + p_data.id + '&com_year=' + p_data.year)
                    } else {
                        let temp_html = window.location.href.split('?')
                        location.replace(temp_html[0] + '?com_id=' + p_data.id + '&com_year=' + p_data.year)

                    }
                })

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // Swal.fire("บันทึกล้มเหลว");
            }
        });
}

function editPage() {
    p_data.status_insert = 'UPDATE'
    addNew = true
    file = null
    disableMenuAll()
    enableMenu('saveMenu')
    disableFunction()
    enableMenu('deleteMenu')
}
function deletePage() {
    if (addNew === false) {
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
            closeOnCancel: false,
            showLoaderOnConfirm: true,
            preConfirm: function () {
                return new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        p_data.status_insert = 'UPDATE'
                        p_data.is_deleted = 'Y'
                        insertData().then((data) => {
                            if (data) {
                                resolve();
                            } else {
                                console.log(data)
                                Swal.fire({
                                    html: "เกิดข้อผิดพลาดทางเซิพเวอร์",
                                    icon: "error",
                                    confirmButtonColor: "#009688"
                                });
                            }
                        })
                    }, 100);
                })
            }
        })
            .then((result) => {
                if (result.value) {
                    Swal.fire({
                        html: "ลบสำเร็จ",
                        icon: "success",
                        confirmButtonColor: "#009688"
                    });
                    // function update
                    p_data.status_insert = 'NEW'
                    deleteData = true
                    document.getElementById('c_id').style.textDecoration = 'line-through'
                    disableMenuAll()
                    resetAlertInput()

                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    // Swal.fire("บันทึกล้มเหลว");
                }
            });
    } else {
        Swal.fire({
            title: "สำนักงานเทศบาล",
            html: "ต้องการยกเลิกหรือไม่",
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
                        html: "ยกเลิกสำเร็จ",
                        icon: "success",
                        confirmButtonColor: "#009688"
                    });
                    p_data.status_insert = 'NEW'
                    resetAlertInput()
                    if (data === false) {
                        addNew = false
                        disableMenuAll()
                        enableMenu('addMenu')
                        enableFunction()
                        resetFunction()
                    } else {
                        setUIDataCom(type)
                        disableMenuAll()
                        addNew = false
                        enableMenu('addMenu')
                        enableMenu('editMenu')
                        enableMenu('deleteMenu')
                        enableFunction()
                    }
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    // Swal.fire("บันทึกล้มเหลว");
                }
            });
    }
}
// Data is true
function changeStatusMenuData() {
    data = true
    addNew = false
    disableMenuAll()
    enableMenu('addMenu')
    enableMenu('editMenu')
    enableMenu('deleteMenu')
    enableFunction()

}
function changeSaveMenu() {
    addNew = true
    disableFunction()
    disableMenuAll()
    enableMenu('saveMenu')
    enableMenu('deleteMenu')
}
//Search Operator 
function searchPersonal() {
    let id = document.getElementById('popSearchId').value.trim()
    let name = document.getElementById('popSearchName').value.trim()
    let surname = document.getElementById('popSearchSurname').value.trim()
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
    if (search_id != id || search_name != name || search_surname != surname) {
        return new Promise((resolve, reject) => {
            search_name = name
            search_id = id
            search_surname = surname
            console.log('Searching')
            axios.get(`http://localhost:5000/search/personal/${id}/${name}/${surname}`).then((result) => {
                if (result.data != 'Not found') {
                    createResultSearch(result.data)
                    errorSearch('', 'HIDE')

                    return resolve(result.data);
                } else {
                    errorSearch('not found', 'SHOW')
                    var tbl = document.getElementById("resultItems");
                    if (tbl.getElementsByTagName("tbody")[0] != null || tbl.getElementsByTagName("tbody")[0] != undefined) {
                        tbl.removeChild(tbl.getElementsByTagName("tbody")[0])
                    }

                }
            })
        })
    } else {
        console.log(`Search query doesn't change`)
        errorSearch(`query doesn't change`, 'SHOW')
    }

}
function errorSearch(texterror, action) {
    let error = document.getElementById('error_search')
    error.classList.toggle('animation')
    if (action === 'SHOW') {
        error.style.display = ''
        if (texterror === 'not found') {
            error.innerText = 'ค้นหารายชื่อผู้ประกอบการไม่พบ'
        } else {
            error.innerText = 'คำค้นหาไม่มีการเปลี่ยนแปลง'
        }
    } else {
        error.style.display = 'none'
    }
}
function createResultSearch(data) {
    var tbl = document.getElementById("resultItems");
    if (tbl.getElementsByTagName("tbody")[0] != null || tbl.getElementsByTagName("tbody")[0] != undefined) {
        tbl.removeChild(tbl.getElementsByTagName("tbody")[0])
    }
    var tblBody = document.createElement('tbody')
    for (var i = 0; i < data.length; i++) {
        // creates a table row
        var row = document.createElement("tr");
        //row index = this.rowIndex
        row.onclick = function () { showItem(data[this.rowIndex - 1]) }

        for (var j = 0; j < 4; j++) {
            var cell = document.createElement("td");
            if (j === 0) {
                var cellText = document.createTextNode(data[i].PERSONAL_NAME);
            } else if (j === 1) {
                var cellText = document.createTextNode(data[i].PERSONAL_SURNAME);
            } else if (j === 2) {
                let AddressText = ''
                AddressText = AddressText + `บ้านเลขที่ ${data[i].AID.ADDRESS_HOME_NUMBER} `
                AddressText = AddressText + `หมู่ ${data[i].AID.ADDRESS_MOO === null ? '-' : data[i].AID.ADDRESS_MOO} `
                AddressText = AddressText + `ตรอก ${data[i].AID.ADDRESS_TRXK === null ? '-' : data[i].AID.ADDRESS_TRXK} `
                AddressText = AddressText + `ซอย ${data[i].AID.ADDRESS_SXY === null ? '-' : data[i].AID.ADDRESS_SXY} `
                AddressText = AddressText + `อาคาร ${data[i].AID.ADDRESS_BUILDING === null ? '-' : data[i].AID.ADDRESS_BUILDING} `
                AddressText = AddressText + `ถนน ${data[i].AID.ADDRESS_ROAD === null ? '-' : data[i].AID.ADDRESS_ROAD} `
                AddressText = AddressText + `ตำบล ${data[i].AID.DISTRICT_NAME === null ? '-' : data[i].AID.DISTRICT_NAME} `
                AddressText = AddressText + `อำเภอ ${data[i].AID.AMPHUR_NAME === null ? '-' : data[i].AID.AMPHUR_NAME}`
                AddressText = AddressText + `จังหวัด ${data[i].AID.PROVINCE_NAME === null ? '-' : data[i].AID.PROVINCE_NAME}`
                var cellText = document.createTextNode(AddressText);
            } else {
                var cellText = document.createTextNode(data[i].PERSONAL_PERSONAL_ID);
            }

            cell.appendChild(cellText);
            if (j === 3 && data[i].PERSONAL_IS_DELETED === 'Y') {
                cell.style.textDecoration = 'line-through'
            }

            row.appendChild(cell);
        }
        tblBody.appendChild(row);
    }


    tbl.appendChild(tblBody);
}
function runScript(e, type) {
    if (e.keyCode == 13) {
        searchPersonal()
        return false;
    }
}
function searchOparator() {
    // new list ค่าใหม่   
    search_name = ''
    search_surname = ''
    search_id = ''
    let swal_html = `<div >
        <div class="display-center" onkeypress="return runScript(event)">
                    <h5 style="font-size: 100%;">
                        ชื่อ :
                        <input type="text" id="popSearchName" style="width: 18%;">
                        นามสกุล :
                        <input type="text" id="popSearchSurname" style="width: 18%;" >
                        เลขบัตรประจำตัว :
                        <input type="text" id="popSearchId" style="width: 18%;" >
                        <button type="button" style="width: auto;height: auto;"
                        class="btn btn-secondary is-color" onClick="searchPersonal()">
                                <i class="fa fa-search"></i> 
                                ค้นหา
                           
                        </button>
                        <br>
                        <font id='error_search' style='display:none'class='alert'> ค้นหาไม่พบ </font>
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
function showItem(arrayResult) {
    // setDataOperator(arrayResult)
    setOPcom(arrayResult)
    Swal.close()
}