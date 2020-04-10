var data = false
var deleteData = false
var addNew = false
let tSearchName = ''
let tSearchSurname = ''
let tSearchId = ''
let tempData = {}
let new_document = false
let edit_document = false
function resetStyleIdDelete() {
    var id = document.getElementById('id')
    if (id != undefined || id != null) {
        id.style.textDecoration = ''
    }
    var company_id = document.getElementById('company-id')
    if (company_id != undefined || company_id != null) {
        company_id.style.textDecoration = ''
    }
}
function addPage() {
    // window.onbeforeunload = function() {
    //     return 'You have unsaved changes!';
    // }
    check_id_new = false
    new_document = true
    inImage.name = ''
    resetTwoAddress()
    addNew = true
    deleteData = false
    data = false
    disableFunction()
    disableMenuAll()
    enableMenu('saveMenu')
    enableMenu('deleteMenu')
    resetStyleIdDelete()
    resetFunction()
    resetImageDefault()
    resetParameter()
    newAddress()
    tempData = {}
    newAdd = true
    _isImageChange = false
    console.log(`addPage === ${_isImageChange}`)
    changeOption(`บุคคลธรรมดา`)
    document.getElementById('id').disabled = false
    document.getElementById('company-id').disabled = false
    document.getElementById('typeUser').disabled = false
    imageSelectype = ''
    base64ImageSelect = ''
    fileImage = null
    inImage.type = null
    inImage.data = null
    textChange = ''
    iconAlert = ''
    document.getElementById('phone_more').disabled = false
    document.getElementById('company-phone-more').disabled = false
}

function insertPage() {
   
    let _redyToInsert = preInsert()
    if (_redyToInsert) { 
        addNew = false
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
                        //function ใน operator 
                        console.log(arrInsert)
                        insertToDatabase().then((insert) => {
                            edit_document = false
                            data = true
                            arrInsert = []
                            console.log(`insert return =`)
                            console.log(insert)
                            inPersonal.id = insert.pid
                            inAddress.id = insert.aid
                            console.log(`inPersonal`)
                            console.log(inPersonal)
                            console.log(`tempDATA`)
                            console.log(tempData)
                            tempData.PERSONAL_TYPE =  inPersonal.type
                            tempData.PERSONAL_TITLE = inPersonal.title
                            tempData.PERSONAL_NAME = inPersonal.name
                            tempData.PERSONAL_SURNAME = inPersonal.surname
                            tempData.PERSONAL_NATIONALITY = inPersonal.nationality
                            tempData.PERSONAL_RACE = inPersonal.race
                            tempData.PERSONAL_BIRTHDAY = inPersonal.birthday  
                            tempData.PERSONAL_PERSONAL_ID = inPersonal.personal_id
                            tempData.PERSONAL_CARD_ISSUED = inPersonal.card_issued
                            tempData.PERSONAL_CARD_EXPIRE = inPersonal.card_expipe
                            tempData.PERSONAL_PHONE = inPersonal.phone
                            tempData.PERSONAL_FAX = inPersonal.fax
                            tempData.AID = {
                                'ADDRESS_HOME_NUMBER':inAddress.home_number,
                                'ADDRESS_MOO':inAddress.moo,
                                'ADDRESS_TRXK':inAddress.trxk,
                                'ADDRESS_SXY':inAddress.sxy,
                                'ADDRESS_BUILDING':inAddress.building,
                                'ADDRESS_ROAD':inAddress.road,
                                'DISTRICT_NAME':inAddress.district_name,
                                'AMPHUR_NAME':inAddress.amphur_name,
                                'PROVINCE_NAME':inAddress.province_name
                            }

                            tempData.PERSONAL_ID = insert.pid
                            tempData.AID.ADDRESS_ID = insert.aid
                            console.log(inImage)
                            if (inPersonal.type === 'บุคคลธรรมดา' && inImage.name != 'NO_UPlOAD') {
                                let imageTemp = {
                                    'IMAGE_NAME': insert.pid,
                                    'IMAGE_TYPE': imageSelectype,
                                    'IMAGE_DATA': base64ImageSelect
                                }
                                tempData.image = imageTemp
                            }
                            if(inPersonal.type === 'บุคคลธรรมดา' && inImage.name === 'NO_UPlOAD'){
                                console.log(`insert.pid`)
                                console.log(insert.pid)
                                let imageTemp = {
                                    'IMAGE_NAME': insert.pid === undefined ? inPersonal.id : insert.pid,
                                    'IMAGE_TYPE': inImage.type,
                                    'IMAGE_DATA': base64ImageSelect
                                }
                                inImage.name = insert.pid === undefined ? inPersonal.id : insert.pid
                                tempData.image = imageTemp
                            }
                            arrInsert = []
                            inImage.data = base64ImageSelect
                            base64ImageSelect = ''
                            console.log(tempData)
                            console.log('insert // Update return')
                            console.log(insert)
                            console.log(insert.length)
                            _deleteImage = false
                            new_document = false
                            check_id_new = false
                            if (insert.length != 0) {
                                resolve();
                            }
                        })
                    }, 100);
                });
            }
        }).then((result) => {
            if (result.value) {
                Swal.fire({
                    html: "<h2>บันทึกสำเร็จ</h2>",
                    icon: "success",
                    confirmButtonColor: "#009688"
                });
                data = true
                addNew = false
                imageSelectype = ''
                base64ImageSelect = ''
                disableMenuAll()
                enableMenu('addMenu')
                enableMenu('editMenu')
                enableMenu('deleteMenu')
                enableFunction()
                // set Date in Last update
                var datetime = new Date();
                let dateForUpdate = datetime.toISOString().slice(0, 10)
                let temp = dateForUpdate.split('-')
                let day = temp[2]
                let month = temp[1]
                let year = parseInt(temp[0]) + 543
                let format = `${day}-${month}-${year}`
                if(inPersonal.type === 'บุคคลธรรมดา'){
                    document.getElementById('last-update').value = format
                }else{
                    document.getElementById('company-last-update').value = format
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
               
            }
        });
       // window.onbeforeunload = null
    }

}
function resetImageDefault() {
    //ตัวแปรอยู่ใน operator 
    fileImage = null
    inImage.type = null
    document.getElementById('uploadFile').value = ''
    var img = document.getElementById('operatorImage')
    img.src = '../../img/userProfile.png'
}
function editPage() {
   
    if (!deleteData) {
        // window.onbeforeunload = function() {
        //     return 'You have unsaved changes!';
        // }
        edit_document = true
        addNew = true
        _isImageChange = false
        console.log(`editPage === ${_isImageChange}`)
        disableMenuAll()
        enableMenu('saveMenu')
        disableFunction()
        enableMenu('deleteMenu')
        //tempData
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
function setIdDelete(type) {
    if (type === 'บุคคลธรรมดา') {
        var id = document.getElementById('id')

        if (id != null) {
            if (id.style.textDecoration === '') {
                id.style.textDecoration = 'line-through'
            } else {
                id.style.textDecoration = ''
            }
        }
    } else {
        var company_id = document.getElementById('company-id')
        if (company_id != null) {
            if (company_id.style.textDecoration === '') {
                company_id.style.textDecoration = 'line-through'
            } else {
                company_id.style.textDecoration = ''
            }
        }
    }
}
function changeStatusDelete(status) {
    let personalDelete = {}
    personalDelete.id = inPersonal.id
    personalDelete.is_deleted = status
    console.log(`changeStatusDelete => `)
    console.log(personalDelete)
    return new Promise(function (resolve, reject) {
        axios.post(`http://localhost:5000/update/status/delete/`, { 'personal': personalDelete }).then((result) => {
            console.log(`changeStatusDelete = ${result.data}`)
            return resolve(result.data);
        })
    })
}

function deletePage() {
    
    if (document.getElementById('saveMenu').classList.contains('disableds')) {
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
                        //function ใน operator 
                        changeStatusDelete('Y').then((statusDelete) => {
                            tempData.is_deleted = 'Y'
                            console.log(`statusDelete = ${statusDelete}`)
                            if (statusDelete) {
                                resolve();
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
                    deleteData = true
                    setIdDelete(inPersonal.type)
                    disableMenuAll()
                    enableMenu('addMenu')
                    enableMenu('editMenu')
                    enableMenu('restoreMenu')

                    resetInputRequired()
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
                    resetInputRequired()
                    // window.onbeforeunload = null
                    if (data === false) {
                        console.log('new delete no data')
                        resetInputUI()
                        addNew = false
                        disableMenuAll()
                        enableMenu('addMenu')
                        enableFunction()
                        resetStyleIdDelete()
                        resetFunction()
                        resetImageDefault()
                    }
                    // console.log(isEmpty(tempData))
                    // console.log(tempData)
                    // console.log(data)
                    if (isEmpty(tempData) === false && data === true) {
                        console.log('have data delelte')
                        document.getElementById('datepicker2').disabled = false 
                        document.getElementById('life-id').checked = false
                        document.getElementById('datepicker2').value = ''
                        resetFunction()
                        setDataUI(tempData)
                        disableMenuAll()
                        
                        //  let imageTemp = {
                        //             'IMAGE_NAME': inPersonal.id,
                        //             'IMAGE_TYPE': inImage.type,
                        //             'IMAGE_DATA': base64ImageSelect
                        //         }
                        //         tempData.image = imageTemp
                        // console.log(imageTemp)
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

function isEmpty(arg) {
    for (var item in arg) {
        return false;
    }
    return true;
}
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
    if (tSearchId != id || tSearchName != name || tSearchSurname != surname) {
        return new Promise((resolve, reject) => {
            tSearchName = name
            tSearchId = id
            tSearchSurname = surname
            console.log('Searching')
            axios.get(`http://localhost:5000/search/personal/${id}/${name}/${surname}/all`).then((result) => {
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
                    console.log(result.data)

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
function getImageByPeronalId(type, id) {
    return new Promise((resolve, reject) => {
        if (type === 'บุคคลธรรมดา') {
            axios.get(`http://localhost:5000/get/image/${id}`).then((result) => {
                console.log(result.data[0])
                return resolve(result.data[0]);
            })
        } else {
            return resolve(false)
        }
    })
}
function showItem(arrayResult) {
    resetParameter()
    resetStyleIdDelete()
    console.log(arrayResult)
    changeOption(arrayResult.PERSONAL_TYPE.trim())
    if (arrayResult.PERSONAL_TYPE === 'บุคคลธรรมดา') {
        getImageByPeronalId(arrayResult.PERSONAL_TYPE, arrayResult.PERSONAL_ID).then((result) => {
            console.log(`pid = ${arrayResult.PERSONAL_ID}`)
            console.log(result)
            if (result != false || result != null) {
                arrayResult.image = result
                setDataUI(arrayResult)
            } else {
                setDataUI(arrayResult)
            }
            tempData = arrayResult
        })
    } else {
        setDataUI(arrayResult)
        tempData = arrayResult
    }
    console.log(arrayResult.PERSONAL_IS_DELETED === 'Y')
    if (arrayResult.PERSONAL_IS_DELETED === 'Y') {
        console.log('Y')
        resetInputRequired()
        //แสดง menu - กลุ่มมีข้อมูลที่ลบแล้ว
        deleteData = true
        disableMenuAll()
        enableMenu('addMenu')
        enableMenu('editMenu')
        enableMenu('restoreMenu')
        //เช็คว่าข้อมูลอยู่ในสถานะลบหรือเปล่า
        setIdDelete(arrayResult.PERSONAL_TYPE) // ทำให้ id เป็นขีด
        deleteData = true // status ว่าข้อมูลนั้นอยู่ในสถานะลบ
    } else {
        //แสดง menu - กลุ่มมีข้อมูลที่ไม่ได้ลบ
        data = true
        addNew = false
        disableMenuAll()
        enableMenu('addMenu')
        enableMenu('editMenu')
        enableMenu('deleteMenu')
        enableFunction()

        deleteData = false // status ว่าข้อมูลนั้นไม่ได้อยู่ในสถานะลบ
        resetStyleIdDelete()    //เอา style ลบออก
    }
    Swal.close()
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
                let textJ1 = data[i].PERSONAL_SURNAME === null ? '' :data[i].PERSONAL_SURNAME
                var cellText = document.createTextNode(textJ1);
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
            if( j === 3 && data[i].PERSONAL_IS_DELETED === 'Y'){
                cell.style.textDecoration = 'line-through'
            }
            
            row.appendChild(cell);
        }
        tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
}
function runScript(e) {
    if (e.keyCode == 13) {
        searchPersonal()
        return false;
    }
}
function searchOparator() {
    console.log(addNew)
    if (addNew) {
        insertPage()
    } else {
        // new list ค่าใหม่   
        tSearchName = ''
        tSearchSurname = ''
        tSearchId = ''
        var swal_html = `<div >
        <div class="display-center" onkeypress="return runScript(event)">
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

}
function restorePage() {
    //function Update delete 
    Swal.fire({
        title: "สำนักงานเทศบาล",
        html: "ต้องการยกเลิกสถาะลบหรือไม่",
        icon: 'warning',
        showCancelButton: true,
        customClass: 'swal-height',
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
                    //function ใน operator 
                    changeStatusDelete('N').then((statusDelete) => {
                        tempData.is_deleted = 'N'
                        console.log(`statusDelete = ${statusDelete}`)
                        if (statusDelete) {
                            resolve();
                        }
                    })
                }, 100);
            })
        }
    }).then((result) => {
        if (result.value) {
            Swal.fire({
                html: "ผู้ประกอบการนี้กลับอยู่ในสถานะปกติแล้ว",
                icon: "success",
                confirmButtonColor: "#009688"
            });
            resetStyleIdDelete()
            deleteData = false
            data = true
            disableMenuAll()
            enableMenu('addMenu')
            enableMenu('editMenu')
            enableMenu('deleteMenu')
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            // Swal.fire("บันทึกล้มเหลว");
        }
    });



}