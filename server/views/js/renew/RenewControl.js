let search_id = ''
let search_name = ''
let search_surname = ''
var data = false
let _type_menu = ''
let Item_data_operator = []

function switchRequestType(text) {
    switch (text) {
        case 'ใบอนุญาตจำหน่ายสินค้าในที่หรือทางสาธารณะ':
            return 0
        case 'ใบอนุญาตเร่ขายสินค้าในที่หรือทางสาธารณะ':
            return 1
        case 'ใบอนุญาตจัดตั้งสถานที่จำหน่ายอาหาร':
            return 2
        case 'ใบอนุญาตจัดตั้งสถานที่สะสมอาหาร':
            return 3
        case 'หนังสือรับรองการแจ้งจัดตั้งสถานที่จำหน่ายอาหาร':
            return 4
        case 'หนังสือรับรองการแจ้งจัดตั้งสถานที่สะสมอาหาร':
            return 5
        case 'ใบอนุญาตให้ใช้สถานที่เป็นตลาดเอกชน':
            return 6
        case 'กิจการที่เป็นอันตรายต่อสุขภาพ':
            return 7
        default: //กิจการฌาปณสถาน
            return 8
    }
}
function setTypeMenu(menu) {
    _type_menu = menu
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
                    }
                    else if (new_document === true) {
                        let temp_html = window.location.href.split('?')
                        location.replace(temp_html[0] + '?id=' + requestData.no + '' + requestData.year)
                    } else {
                        data = true
                        enableMenu('addMenu')
                        enableMenu('editMenu')
                        enableMenu('deleteMenu')
                        enableFunction()
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
    Swal.fire({
        title: "สำนักงานเทศบาล",
        html: "ข้อมูลอยู่ในสถานะลบแล้ว",
        confirmButtonColor: "#009688",
        closeOnConfirm: false,
        icon: 'warning'
    })
}
function changeStatusMenuData() {
    addNew = true
    deleteData = false
    data = false
    disableFunction()
    disableMenuAll()
    enableMenu('saveMenu')
}
//Search Request
function searchRequestByPersonalIdAndStatusActive(id) {
    return new Promise((resolve, reject) => {
        console.log('Searching')
        axios.get(`http://localhost:5000/get/request/renew/${switchRequestType(_type_menu)}/${id}`).then((result) => {
            if (result.data.length != 0) {
                createResultSearchRequestRenew(result.data)
                errorSearch('', 'HIDE', "Renew")
                return resolve(result.data);
            } else {
                console.log()
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
function errorSearch(texterror, action, renew) {
    let error = document.getElementById('error_search')
    if (renew != undefined) {
        error = document.getElementById('error_search_request')
    }
    error.classList.toggle('animation')
    if (action === 'SHOW') {
        error.style.display = ''
        if (texterror === 'not found') {
            if (renew != undefined) {
                error.innerText = 'ค้นใบอนุญาตไม่พบ'
            }else{
                error.innerText = 'ค้นหารายชื่อผู้ประกอบการไม่พบ'
            }
           
        } else {
            error.innerText = 'คำค้นหาไม่มีการเปลี่ยนแปลง'
        }
    } else {
        error.style.display = 'none'
    }
}
function createResultSearchRequestRenew(data, typeSearch) {
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
function runScript(e) {
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
        <div >
            <button  type='button' class = 'fa fa-arrow-right style = 'background-color: gray ; color: white;' onClick="searchRequestRenew('p','n','1619900312611','P000001')">  </button>
        </div>  
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
        title: `ค้นหารายชื่อผู้ประกอบการ`,
        html: swal_html,
        width: '80%',
        customClass: 'swal-height',
        showConfirmButton: false,
        closeOnConfirm: false,
        closeOnCancel: false
    });
}
function searchRequestRenew(name, surname, personal_id, id) {
    // new list ค่าใหม่   
    let swal_html = `<div >
        <div >
            <button  type='button' class = 'fa fa-arrow-left'  style = 'background-color: #009688 ; color: white;' onClick='searchOparator()'>  ย้อนกลับ</button>
        </div>  
            <h5 style="font-size: 100%;">
                        ชื่อ :
                        <input type="text" id="popSearchName_request" style="width: 18%;"  value='${name}'disabled>
                        นามสกุล :
                        <input type="text" id="popSearchSurname_request" style="width: 18%;"  value = '${surname}' disabled >
                        เลขบัตรประจำตัว :
                        <input type="text" id="popSearchId_request" style="width: 18%;"  value ='   ${personal_id}' disabled >
                       
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
    searchRequestByPersonalIdAndStatusActive(id)
}
function showItem(arrayResult) {
    Item_data_operator = []
    Item_data_operator.push(arrayResult)
    searchRequestRenew(
        Item_data_operator[0].PERSONAL_NAME,
        Item_data_operator[0].PERSONAL_SURNAME,
        Item_data_operator[0].PERSONAL_PERSONAL_ID,
        Item_data_operator[0].PERSONAL_ID)

    //Swal.close()
}

function printImg(no, year) {

    if (data === true) {
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
    if (requestData.no != undefined && requestData.year != undefined) {
        if (requestData.no === '') {
            window.open(getFormPrint(requestData.menu) + `?id=${requestData.no}${requestData.year}`, '_blank');
        } else {
            if (requestData.no != '') {
                window.open(getFormPrint(requestData.menu) + `?id=${requestData.no}${requestData.year}`, '_blank');
            } else {
                let requsetId = getUrlVars()
                if (requsetId.id != undefined) {
                    let requsetNo = requsetId.id.slice(0, 6)
                    let requestYear = requsetId.id.slice(6, 10)
                    window.open(getFormPrint(requestData.menu) + `?id=${requsetNo}${requestYear}`, '_blank');
                }
            }
        }
    }
}
function getFormPrint(menu) {
    switch (menu) {
        case 'หนังสือรับรองการแจ้งจัดตั้งสถานที่สะสมอาหาร':
            return '../view/view_area_less_correct.html'
        case 'หนังสือรับรองการแจ้งจัดตั้งสถานที่จำหน่ายอาหาร':
            return '../view/view_area_less_sell.html'
        case 'กิจการที่เป็นอันตรายต่อสุขภาพ':
            return '../view/view_health_dander.html'
        case 'ใบอนุญาตให้ใช้สถานที่เป็นตลาดเอกชน':
            return '../view/view_market.html'
        case 'ใบอนุญาตจำหน่ายสินค้าในที่หรือทางสาธารณะ':
            return '../view/view_public.html'
        case 'ใบอนุญาตเร่ขายสินค้าในที่หรือทางสาธารณะ':
            return '../view/view_public.html'
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