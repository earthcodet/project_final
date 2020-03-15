let search_id = ''
let search_name = ''
let search_surname = ''
function searchPersonal(type) {
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
                    createResultSearch(result.data, type)
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
function errorSearch(texterror, action, renew) {
    let error = ''
    if (renew != undefined) {
        error = document.getElementById('error_search_request')
    } else {
        error = document.getElementById('error_search')
    }
    error.classList.toggle('animation')
    if (action === 'SHOW') {
        error.style.display = ''
        if (texterror === 'not found') {
            if (renew != undefined) {
                error.innerText = 'ค้นใบอนุญาตไม่พบ'
            } else {
                error.innerText = 'ค้นหารายชื่อผู้ประกอบการไม่พบ'
            }

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
        searchPersonal(type)
        return false;
    }
}
function searchOparator(type) {
    // new list ค่าใหม่   
    search_name = ''
    search_surname = ''
    search_id = ''
    let temp_topic = 'ค้นหารายชื่อผู้ประกอบการ เจ้าของเดิม'
    if (type === 'NEW') {
        temp_topic = 'ค้นหารายชื่อผู้ประกอบการ เจ้าของใหม่'
    }
    let swal_html = `<div >
        <div class="display-center" onkeypress="return runScript(event ,'${type}')"> 
            <h5 style="font-size: 100%;">
                        ชื่อ :
                        <input type="text" id="popSearchName" style="width: 18%;">
                        นามสกุล :
                        <input type="text" id="popSearchSurname" style="width: 18%;" >
                        เลขบัตรประจำตัว :
                        <input type="text" id="popSearchId" style="width: 18%;" >
                        <button type="button" style="width: auto;height: auto;"
                        class="btn btn-secondary is-color" onClick="searchPersonal('${type}')">
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
        title: temp_topic,
        html: swal_html,
        width: '80%',
        customClass: 'swal-height',
        showConfirmButton: false,
        closeOnConfirm: false,
        closeOnCancel: false
    });
}
function showItem(arrayResult, type) {
    if(operatorData.id != ''){
        if(operatorData.id === arrayResult.PERSONAL_ID && type === 'NEW'){
            Swal.fire({
                title: '<a style="font-size:2vw">ไม่สามารถเลือกผู้ประกอบการซ้ำได้</a>',
                width: '40vw',
                customClass: 'swal-height',
                showConfirmButton: true,
                closeOnConfirm: false,
                closeOnCancel: false,
                icon: 'info',
                confirmButtonColor: "#009688"
            });
        }else{
            setDataOparatorToUi(arrayResult, type)
            Swal.close()  
        }
    }else{
        setDataOparatorToUi(arrayResult, type)
        Swal.close()
    }
}
function onClickRequest() {
    if (operatorData.id === '') {
        Swal.fire({
            title: '<a style="font-size:2vw">กรุณาเลือกผู้ประกอบการก่อน</a>',
            width: '30vw',
            customClass: 'swal-height',
            showConfirmButton: true,
            closeOnConfirm: false,
            closeOnCancel: false,
            icon: 'info',
            confirmButtonColor: "#009688"
        });
    } else {
        searchRequestTransfer()
    }
}
function onClickNewOperator() {
    if (requestData.no === '') {
        Swal.fire({
            title: '<a style="font-size:2vw">กรุณาเลือกใบอนุญาตที่ต้องการโอนก่อน</a>',
            width: '30vw',
            customClass: 'swal-height',
            showConfirmButton: true,
            closeOnConfirm: false,
            closeOnCancel: false,
            icon: 'info',
            confirmButtonColor: "#009688"
        });
    } else {
        searchOparator('NEW')
    }
}
function searchRequestTransfer() {
    // new list ค่าใหม่   
    let swal_html = `<div >
            <h5 style="font-size: 100%;">
                        ชื่อ :
                        <input type="text" id="popSearchName_request" style="width: 18%;"  value='${operatorData.name}'disabled>
                        นามสกุล :
                        <input type="text" id="popSearchSurname_request" style="width: 18%;"  value = '${operatorData.surname}' disabled >
                        เลขบัตรประจำตัว :
                        <input type="text" id="popSearchId_request" style="width: 18%;"  value ='   ${operatorData.id}' disabled >
                       
                        <br>
                        <font id='error_search_request' style='display:none'class='alert'> ค้นหาไม่พบ </font>
                    </h5>   
                    
                </div>
        <div class="search-popup-height">
            <table id='resultItems_request' class="table tablesearch table-hover cursor-pointer">
                <thead>
                  <tr class="is-color ">
                    <th>เลขที่ใบอนุญาต</th>
                    <th>ประเภทใบอนุญาต</th>
                    <th>ชื่อสถานประกอบการ</th>
                    <th>กลุ่มบริเวณ</th>
                    <th>ที่อยู่</th>
                    <th>วันที่เริ่มใบอนุญาต</th>
                    <th>วันที่สิ้นสุดใบใบอนุญาต</th>
                  </tr>
                </thead>
              </table>
        </div>
    </div>`
    Swal.fire({
        title: `ค้นหาใบอนญาต`,
        html: swal_html,
        width: '80%',
        customClass: 'swal-height',
        showConfirmButton: false,
        closeOnConfirm: false,
        closeOnCancel: false
    });
    searchRequestByPersonalId(operatorData.id)
}
function searchRequestByPersonalId(id) {
    return new Promise((resolve, reject) => {
        console.log('Searching')
        axios.get(`http://localhost:5000/get/request/transfer/search/${id}`).then((result) => {
            if (result.data.length != 0) {
                createResultSearchRequestTransfer(result.data)
                errorSearch('', 'HIDE', "Renew")
                return resolve(result.data);
            } else {
                errorSearch('not found', 'SHOW', 'Renew')
                var tbl = document.getElementById("resultItems_request");
                if (tbl.getElementsByTagName("tbody")[0] != null || tbl.getElementsByTagName("tbody")[0] != undefined) {
                    tbl.removeChild(tbl.getElementsByTagName("tbody")[0])
                }
                return resolve(result.data);
            }
        })
    })
}
function createResultSearchRequestTransfer(data) {
    var tbl = document.getElementById("resultItems_request");
    if (tbl.getElementsByTagName("tbody")[0] != null || tbl.getElementsByTagName("tbody")[0] != undefined) {
        tbl.removeChild(tbl.getElementsByTagName("tbody")[0])
    }
    var tblBody = document.createElement('tbody')
    for (var i = 0; i < data.length; i++) {
        // creates a table row
        var row = document.createElement("tr");
        //row index = this.rowIndex
        row.onclick = function () { showItemRequest(data[this.rowIndex - 1]) }
        row.style.fontSize = '0.9vw'
        for (var j = 0; j < 7; j++) {
            var cell = document.createElement("td");
            if (j === 0) {
                var cellText = document.createTextNode(`${data[i].REQUEST_NO}/${data[i].REQUEST_YEAR}`);
            } else if (j === 1) {
                var cellText = document.createTextNode(data[i].REQUEST_TYPE_MENU);
            } else if (j === 2) {
                let text = data[i].ESTABLISHMENT_NAME === null ? '-' : data[i].ESTABLISHMENT_NAME
                var cellText = document.createTextNode(text);
            } else if (j === 3) {
                let text = data[i].ESTABLISHMENT_GROUND === null ? '-' : data[i].ESTABLISHMENT_GROUND
                var cellText = document.createTextNode(text);
            } else if (j === 4) {
                let AddressText = ''
                AddressText = AddressText + `บ้านเลขที่ ${data[i].ADDRESS_HOME_NUMBER} `
                AddressText = AddressText + `หมู่ ${data[i].ADDRESS_MOO === null ? '-' : data[i].ADDRESS_MOO} `
                AddressText = AddressText + `ตรอก ${data[i].ADDRESS_TRXK === null ? '-' : data[i].ADDRESS_TRXK} `
                AddressText = AddressText + `ซอย ${data[i].ADDRESS_SXY === null ? '-' : data[i].ADDRESS_SXY} `
                AddressText = AddressText + `อาคาร ${data[i].ADDRESS_BUILDING === null ? '-' : data[i].ADDRESS_BUILDING} `
                AddressText = AddressText + `ถนน ${data[i].ADDRESS_ROAD === null ? '-' : data[i].ADDRESS_ROAD} `
                AddressText = AddressText + `ตำบล ${data[i].DISTRICT_NAME === null ? '-' : data[i].DISTRICT_NAME} `
                AddressText = AddressText + `อำเภอ ${data[i].AMPHUR_NAME === null ? '-' : data[i].AMPHUR_NAME}`
                AddressText = AddressText + `จังหวัด ${data[i].PROVINCE_NAME === null ? '-' : data[i].PROVINCE_NAME}`
                var cellText = document.createTextNode(AddressText);
                cellText
            } else if (j === 5) {
                var cellText = document.createTextNode(data[i].REQUEST_DATE_ISSUED);
            } else {
                var cellText = document.createTextNode(data[i].REQUEST_DATE_EXPIRED);
            }
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        tblBody.appendChild(row);
    }


    tbl.appendChild(tblBody);
}
function showItemRequest(item) {
    setRequestData(item)
    Swal.close()
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
        imageUrl: '../../img/img1.jpg',
        imageWidth: 'auto',
        imageHeight: '100%',
        imageAlt: 'Custom image',
        showLoaderOnConfirm: true,
        preConfirm: function () {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    if (preInsert() === true) {
                        getDuplicationOwner().then((data_check) => {
                            if (data_check) {
                                Swal.fire({
                                    title: '<a style="font-size:2vw">ผู้ประกอบการนี้เป็นเคยเจ้าของใบนี้แล้ว</a>',
                                    width: '30vw',
                                    customClass: 'swal-height',
                                    showConfirmButton: true,
                                    closeOnConfirm: false,
                                    closeOnCancel: false,
                                    icon: 'error',
                                    confirmButtonColor: "#009688"
                                });
                            } else {
                                insertRequestTransfer().then((data) => {
                                    if (data != 'error') {
                                        requestData.no = data
                                        resolve();
                                    } else {
                                        Swal.fire({
                                            html: "เกิดข้อผิดพลาด",
                                            icon: "error",
                                            confirmButtonColor: "#009688"
                                        })
                                    }
                                })
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
                    html: `บันทึกสำเร็จ เลขที่ใบอนุญาตใหม่คือ ${requestData.no}/${requestData.year}`,
                    icon: "success",
                    confirmButtonColor: "#009688"
                }).then((result) => {
                    let temp_html = window.location.href.split('?')
                    location.replace(temp_html[0])
                })
            } else if (result.dismiss === Swal.DismissReason.cancel) {
            }
        });
}