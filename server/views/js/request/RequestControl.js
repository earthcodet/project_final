let search_id = ''
let search_name = ''
let search_surname = ''
var data = false
var deleteData = false
var addNew = false
let personal_change = false
function addPage() {

    resetStyleIdDeleteRequest()
    resetRequestData()
    personal_change = false
    addNew = true
    deleteData = false
    data = false
    disableFunction()
    disableMenuAll()
    enableMenu('saveMenu')
    var id = document.getElementById('id')
    if (id != null) {
        id.style.textDecoration = ''
    }
    resetFunction()
    if (document.getElementById('ownerDistrict') != undefined) {
        resetAddressThreeAddress()
    } else {
        resetTwoAddress()
    }
    document.getElementById('documentName3').innerHTML = ''
    document.getElementById('position').value = ''
    setLisetUserAlderManToUi(alderman_list)
    document.getElementById('delete_request').style.display = 'none'

    document.getElementById('print_document_image').style.display = 'none'
    document.getElementById('print_document_allow').style.display = 'none'
    document.getElementById('btn_sc_op').disabled = false
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
                    if (preInsert() === true) {
                        insertRequest().then((data) => {
                            if (data.land_id != undefined) {
                                setRequestDataUpdateReturn(data)
                                resolve();
                            } else {
                                setRequestDataReturn(data)
                                document.getElementById('form_id').value = `${requestData.no}/${requestData.year}`
                                if (document.getElementById('uploadFilePdf') != undefined) {
                                    document.getElementById('uploadFilePdf').value = ''
                                }
                                if (document.getElementById('status_upload_file') != undefined) {
                                    if (filesPdf != null) {
                                        document.getElementById('status_upload_file').style.display = ''
                                    } else {
                                        document.getElementById('status_upload_file').style.display = 'none'
                                    }
                                }
                                resolve();
                            }
                        })
                    }
                }, 1000);
            });
        }
    })
        .then((result) => {
            if (result.value) {
                Swal.fire({
                    html: "บันทึกสำเร็จ",
                    icon: "success",
                    confirmButtonColor: "#009688"
                }).then((result) => {
                    disableMenuAll()
                    if (window.location.href.split('?').length === 1) {
                        disableMenuAll()
                        location.replace(window.location.href + '?id=' + requestData.no + '' + requestData.year)
                    } else {
                        let temp_html = window.location.href.split('?')
                        location.replace(temp_html[0] + '?id=' + requestData.no + '' + requestData.year)

                    }
                })
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
function editPage() {
    if (!deleteData) {
        addNew = true
        image_changed = false
        file = null
        disableMenuAll()
        enableMenu('saveMenu')
        disableFunction()
        enableMenu('deleteMenu')
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
                        canclePopup('Y', 'cancel')
                        //function ใน operator 
                        // changeStatusDeleteRequest('Y').then((statusDelete) => {
                        //     let temp_status = requestData.is_deleted
                        //     requestData.is_deleted = 'Y'
                        //     if (statusDelete) {
                        //         resolve();
                        //     } else {
                        //         requestData.is_deleted = temp_status
                        //         Swal.fire({
                        //             html: "เกิดข้อผิดพลาดกับระบบ",
                        //             icon: "error",
                        //             confirmButtonColor: "#009688"
                        //         });
                        //     }
                        // })
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
                    setIdDeleteRequest(requestData.is_deleted)
                    disableMenuAll()
                    enableMenu('addMenu')
                    enableMenu('editMenu')
                    enableMenu('restoreMenu')
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
                    if (document.getElementById('typeReForm') != undefined) {
                        resetInputRequired();
                    } else {
                        resetInputRequired2();
                    }
                    if (data === false) {
                        //resetInputUI()
                        addNew = false
                        disableMenuAll()
                        enableMenu('addMenu')
                        enableFunction()
                        resetStyleIdDeleteRequest()
                        resetFunction()
                        document.getElementById('print_document_image').style.display = 'none'
                        document.getElementById('print_document_allow').style.display = 'none'
                    } else {
                        //resetFunction()
                        document.getElementById('print_document_image').style.display = ''
                        if (requestData.status === 'active') {
                            document.getElementById('print_document_allow').style.display = ''
                        } else {
                            document.getElementById('print_document_allow').style.display = 'none'
                        }
                        resetStyleIdDeleteRequest()
                        setDataView()
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
function canclePopup(status, type_status) {

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
                        let text_delete_temp = document.getElementById('cancleTextPopup').value.trim()
                        changeStatusDeleteRequest(status, text_delete_temp, type_status).then((statusDelete) => {
                            let temp_status = requestData.is_deleted
                            requestData.is_deleted = 'Y'
                            if (statusDelete) {
                                resolve();
                            } else {
                                requestData.is_deleted = temp_status
                                Swal.fire({
                                    html: "เกิดข้อผิดพลาดกับระบบ",
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
            })
                .then((result) => {
                    disableMenuAll()
                    if (window.location.href.split('?').length === 1) {
                        disableMenuAll()
                        location.replace(window.location.href + '?id=' + requestData.no + '' + requestData.year)
                    } else {
                        let temp_html = window.location.href.split('?')
                        location.replace(temp_html[0] + '?id=' + requestData.no + '' + requestData.year)

                    }
                })
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
    });
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
                    // canclePopup('N', 're_status')
                    changeStatusDeleteRequest('N', '', 're_status').then((statusDelete) => {
                        let temp_status = requestData.is_deleted
                        requestData.is_deleted = 'Y'
                        if (statusDelete) {
                            resolve();
                        } else {
                            requestData.is_deleted = temp_status
                            Swal.fire({
                                html: "เกิดข้อผิดพลาดกับระบบ",
                                icon: "error",
                                confirmButtonColor: "#009688"
                            });
                        }
                    })
                    // changeStatusDeleteRequest('N').then((statusDelete) => {
                    //     let temp_status = requestData.is_deleted
                    //     requestData.is_deleted = 'N'
                    //     if (statusDelete) {
                    //         resolve();
                    //     } else {
                    //         requestData.is_deleted = temp_status
                    //         Swal.fire({
                    //             html: "เกิดข้อผิดพลาดกับระบบ",
                    //             icon: "error",
                    //             confirmButtonColor: "#009688"
                    //         });
                    //     }
                    // })
                }, 100);
            })
        }
    }).then((result) => {
        if (result.value) {
            Swal.fire({
                html: "ผู้ประกอบการนี้กลับอยู่ในสถานะปกติแล้ว",
                icon: "success",
                confirmButtonColor: "#009688"
            }).then((result) => {
                disableMenuAll()
                if (window.location.href.split('?').length === 1) {
                    disableMenuAll()
                    location.replace(window.location.href + '?id=' + requestData.no + '' + requestData.year)
                } else {
                    let temp_html = window.location.href.split('?')
                    location.replace(temp_html[0] + '?id=' + requestData.no + '' + requestData.year)

                }
            })
            // resetStyleIdDeleteRequest()
            // deleteData = false
            // data = true
            // disableMenuAll()
            // enableMenu('addMenu')
            // enableMenu('editMenu')
            // enableMenu('deleteMenu')
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            // Swal.fire("บันทึกล้มเหลว");
        }
    });

}
function changeStatusMenuData(status, status_delete) {
    console.log('dsda')
    console.log(status)
    console.log(status_delete)
    if (status_delete === 'Y') {
        if (status === 'wait' || status === 'approval' || status === 'active') {
            data = true
            addNew = false
            disableMenuAll()
            enableMenu('addMenu')
            // enableMenu('editMenu')
            // enableMenu('deleteMenu')
            enableFunction()
        } else {
            if (status === '') {
                addNew = true
                deleteData = false
                data = false
                disableFunction()
                disableMenuAll()
                enableMenu('saveMenu')
            } else {
                data = true
                addNew = false
                disableMenuAll()
                enableMenu('addMenu')
                enableFunction()
            }
        }
        enableMenu('restoreMenu')
    } else {
        if (status === 'wait' || status === 'approval' || status === 'active') {
            data = true
            addNew = false
            disableMenuAll()
            enableMenu('addMenu')
            enableMenu('editMenu')
            enableMenu('deleteMenu')
            enableFunction()
        } else {
            if (status === '') {
                addNew = true
                deleteData = false
                data = false
                disableFunction()
                disableMenuAll()
                enableMenu('saveMenu')
            } else {
                data = true
                addNew = false
                disableMenuAll()
                enableMenu('addMenu')
                enableFunction()
            }
        }
    }

}
function changeStatusDeleteRequest(status, text, type_status) {
    let requestDataDelete = {}
    requestDataDelete.id = requestData.no
    requestDataDelete.year = requestData.year
    requestDataDelete.status = status // status_delete
    
    requestDataDelete.func_status = type_status // type function 
    if (type_status === 'cancel') {
        requestDataDelete.b_status = requestData.status // status now
        requestDataDelete.text_delete = text // logic delete
    } else {
        requestDataDelete.b_status = requestData.status_before // status now
        requestDataDelete.text_delete = '' // logic delete
    }
    console.log(`changeStatusDeleteRequest => `)
    console.log(requestDataDelete)
    return new Promise(function (resolve, reject) {
        axios.post(`http://localhost:5000/update/request/status/delete`, { 'requestData': requestDataDelete }).then((result) => {
            console.log(`changeStatusDeleteRequest = ${result.data}`)
            return resolve(result.data);
        })
    })
}
//Search Operator 
function searchPersonal(typeSearch) {
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
                    createResultSearch(result.data, typeSearch)
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
function createResultSearch(data, typeSearch) {
    var tbl = document.getElementById("resultItems");
    if (tbl.getElementsByTagName("tbody")[0] != null || tbl.getElementsByTagName("tbody")[0] != undefined) {
        tbl.removeChild(tbl.getElementsByTagName("tbody")[0])
    }
    var tblBody = document.createElement('tbody')
    for (var i = 0; i < data.length; i++) {
        // creates a table row
        var row = document.createElement("tr");
        //row index = this.rowIndex
        row.onclick = function () { showItem(data[this.rowIndex - 1], typeSearch) }

        for (var j = 0; j < 4; j++) {
            var cell = document.createElement("td");
            if (j === 0) {
                var cellText = document.createTextNode(data[i].PERSONAL_NAME);
            } else if (j === 1) {
                let textJ1 = data[i].PERSONAL_SURNAME === null ? '' : data[i].PERSONAL_SURNAME
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
        searchPersonal(type)
        return false;
    }
}
function searchOparator(typeSearch) {
    // new list ค่าใหม่   
    search_name = ''
    search_surname = ''
    search_id = ''
    let swal_html = `<div >
        <div class="display-center" onkeypress="return runScript(event,'${typeSearch}')">
                    <h5 style="font-size: 100%;">
                        ชื่อ :
                        <input type="text" id="popSearchName" style="width: 18%;">
                        นามสกุล :
                        <input type="text" id="popSearchSurname" style="width: 18%;" >
                        เลขบัตรประจำตัว :
                        <input type="text" id="popSearchId" style="width: 18%;" >
                        <button type="button" style="width: auto;height: auto;"
                        class="btn btn-secondary is-color" onClick="searchPersonal('${typeSearch}')">
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
function showItem(arrayResult, type) {
    setDataOperator(arrayResult, type)
    personal_change = true
    Swal.close()
}

function printImg() {
    if (addNew === false) {
        if (requestData.no != undefined && requestData.year != undefined) {
            if (requestData.no === '') {
                window.open(`../utilities/viewImg.html`, '_blank');
            } else {
                if (requestData.no != '') {
                    window.open(`../utilities/viewImg.html?id=${requestData.no}${requestData.year}`, '_blank');
                } else {
                    let requsetId = getUrlVars()
                    if (requsetId.id != undefined) {
                        let requsetNo = requsetId.id.slice(0, 6)
                        let requestYear = requsetId.id.slice(6, 10)
                        window.open(`../utilities/viewImg.html?id=${requsetNo}${requestYear}`, '_blank');
                    }
                }
            }
        }
    } else {
        insertPage()
    }


}
function printDocument() {
    if (data === true) {
        if (requestData.no != undefined && requestData.year != undefined) {
            if (requestData.no === '') {
                window.open(getFormPrint(requestData.menu) + `?id_no=${requestData.no}&id_year=${requestData.year}`, '_blank');
            } else {
                if (requestData.no != '') {
                    window.open(getFormPrint(requestData.menu) + `?id_no=${requestData.no}&id_year=${requestData.year}`, '_blank');
                } else {
                    let requsetId = getUrlVars()
                    if (requsetId.id != undefined) {
                        let requsetNo = requsetId.id.slice(0, 6)
                        let requestYear = requsetId.id.slice(6, 10)
                        window.open(getFormPrint(requestData.menu) + `?id_no=${requsetNo}&id_year=${requestYear}`, '_blank');
                    }
                }
            }
        }
    } else {
        insertPage()
    }
}
function getFormPrint(menu) {
    switch (menu) {
        case 'หนังสือรับรองการแจ้งจัดตั้งสถานที่สะสมอาหาร'://F
            return '../view/view_area_less_correct.html'
        case 'หนังสือรับรองการแจ้งจัดตั้งสถานที่จำหน่ายอาหาร': //E
            return '../view/view_area_less_sell.html'
        case 'กิจการที่เป็นอันตรายต่อสุขภาพ': //H
            return '../view/view_health_dander.html'
        case 'ใบอนุญาตให้ใช้สถานที่เป็นตลาดเอกชน': //G
            return '../view/view_market.html'
        case 'ใบอนุญาตจำหน่ายสินค้าในที่หรือทางสาธารณะ'://A
            return '../view/view_public_sell.html'
        case 'ใบอนุญาตเร่ขายสินค้าในที่หรือทางสาธารณะ'://B
            return '../view/view_public.html'
        case 'กิจการฌาปณสถาน':
            return '../view/view_crematory.html'
        default:
            return '../view/view_area_more_correct.html'
    }
}
function resetStyleIdDeleteRequest() {
    var id = document.getElementById('form_id')
    if (id != undefined || id != null) {
        id.style.textDecoration = ''
    }
}
function setIdDeleteRequest(status) {
    var id = document.getElementById('form_id')
    if (id != null) {
        if (status === 'Y') {
            id.style.textDecoration = 'line-through'
        } else {
            id.style.textDecoration = ''
        }
    }
}