var data = false;
var deleteData = false;
var addNew = false;
let tSearchName = "";
let tSearchSurname = "";
let tSearchId = "";
let tempData = {};
function exitPage() {
  Swal.fire({
    title: "สำนักงานเทศบาล",
    html: "ต้องการออกจากระบบหรือไม่",
    showCancelButton: true,
    customClass: "swal-height",
    confirmButtonColor: "#009688",
    confirmButtonText: "ใช่",
    cancelButtonText: "ไม่ใช่",
    cancelButtonColor: "#dc3545",
    closeOnConfirm: false,
    closeOnCancel: false
  }).then(result => {
    if (result.value) {
      document.getElementById("exitMenu").classList.add("disableds");
      logout();
    }
  });
}

function logout() {
  location.replace("/logout");
}
function resetStyleIdDelete() {
  var id = document.getElementById("id");
  if (id != undefined || id != null) {
    id.style.textDecoration = "";
  }
  var company_id = document.getElementById("company-id");
  if (company_id != undefined || company_id != null) {
    company_id.style.textDecoration = "";
  }
}
function addPage() {
  window.onbeforeunload = function() {
    return "You have unsaved changes!";
  };
  addNew = true;
  deleteData = false;
  data = false;
  disableFunction();
  disableMenuAll();
  enableMenu("saveMenu");
  enableMenu("deleteMenu");
  resetStyleIdDelete();
  resetFunction();
  resetParameter();
  // newAddress()
  tempData = {};
  newAdd = true;
  // _isImageChange = false
  // changeOption(`บุคคลธรรมดา`)
  document.getElementById("id").disabled = false;
  // imageSelectype = ''
  // base64ImageSelect = ''
  // fileImage = null
  // inImage.type = null
  // inImage.data = null
  textChange = "";
  iconAlert = "";
}

function disableMenuAll() {
  document.getElementById("addMenu").classList.add("disableds");
  document.getElementById("saveMenu").classList.add("disableds");
  document.getElementById("editMenu").classList.add("disableds");
  document.getElementById("restoreMenu").classList.add("disableds");
  document.getElementById("deleteMenu").classList.add("disableds");
}

function enableMenu(id) {
  document.getElementById(id).classList.remove("disableds");
}

function insertPage() {
  let _redyToInsert = preInsert();
  if (_redyToInsert) {
    Swal.fire({
      title: "สำนักงานเทศบาล",
      html: "ต้องการบันทึกหรือไม่",
      showCancelButton: true,
      customClass: "swal-height",
      confirmButtonColor: "#009688",
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่ใช่",
      cancelButtonColor: "#dc3545",
      closeOnConfirm: false,
      closeOnCancel: false,
      showLoaderOnConfirm: true,
      imageUrl: "../../img/img1.jpg",
      imageWidth: "auto",
      imageHeight: "100%",
      imageAlt: "Custom image",
      preConfirm: function() {
        return new Promise(function(resolve, reject) {
          setTimeout(function() {
            //function ใน operator
            console.log(arrInsert);
            insertToDatabase().then(insert => {
              arrInsert = [];
              console.log(`insert return =`);
              console.log(insert);
              inPerson.id = insert.pid;
              inAddress.id = insert.aid;
              inPerson2.id = insert.p2id;
              inWorkplace2.id = insert.wid;
              inForm.id = insert.fid;
              inFood.id = insert.foid;
              inLastBox.id = insert.lid;
              console.log(`inPerson`);
              console.log(inPerson);
              console.log(`tempData`);
              console.log(tempData);

              tempData.REQUEST_NO = inPerson.form_id;
              tempData.REQUEST_DATE_SUBMISSION = inPerson.datepicker1;
              tempData.REQUEST_MENU = inPerson.typeReq;
              tempData.REQUEST_WRITE = inPerson.place;
              tempData.PERSONAL_TYPE = inPerson.typeUser;
              //   tempData. = inPerson.name;
              tempData.PERSONAL_PERSONAL_ID = inPerson.id;
              //   tempData. = inPerson.age;
              tempData.PERSONAL_NATIONALITY = inPerson.nationality;
              tempData.PERSONAL_RACE = inPerson.race;

              tempData.AID = {
                'ADDRESS_HOME_NUMBER': inAddress.home_id,
                'ADDRESS_MOO':inAddress.moo,
                'ADDRESS_TRXK':inAddress.trxk,
                'ADDRESS_SXY':inAddress.sxy,
                'ADDRESS_BUILDING':inAddress.building,
                'ADDRESS_ROAD':inAddress.road,
                'PROVINCE_NAME': inAddress.province_name,
                'AMPHUR_NAME': inAddress.amphur_name,
                'DISTRICT_NAME': inAddress.district_name,
                'PERSONAL_PHONE':inAddress.phone,
                'PERSONAL_FAX':inAddress.fax
              };
              
              tempData.WID = {
                'ESTABLISHMENT_NAME':inWorkplace2.workplaceName,
                'ESTABLISHMENT_AREA_SIZE':inWorkplace2.area,
                'ESTABLISHMENT_WORKER':inWorkplace2.numPeople,
                'ESTABLISHMENT_TYPE':inWorkplace2.typeWorkplace,
                'ESTABLISHMENT_MACHINE_SIZE':inWorkplace2.machinery,
                'ADDRESS_HOME_NUMBER': inWorkplace2.wPlaceId,
                'ADDRESS_MOO':inWorkplace2.moo,
                'ADDRESS_TRXK':inWorkplace2.trxk,
                'ADDRESS_SXY':inWorkplace2.sxy,
                'ADDRESS_BUILDING':inWorkplace2.building,
                'ADDRESS_ROAD':inWorkplace2.road,
                'PROVINCE_NAME': inWorkplace2.wProvince,
                'AMPHUR_NAME': inWorkplace2.wDistrict,
                'DISTRICT_NAME': inWorkplace2.wSubdistrict,
                'ESTABLISHMENT_PHONE': inWorkplace2.wPhone,
                'ESTABLISHMENT_FAX': inWorkplace2.wFax
              };

              tempData.REQUEST_RECEIPT_ORDER=inForm.bNum
              tempData.REQUEST_RECEIPT_DATE=inForm.datepicker2
              tempData.REQUEST_RECEIPT_FEE=inForm.bFee
              tempData.REQUEST_RECEIPT_FINE=inForm.bFine

              tempData.LAND_TITLE=inOwner.ownPrefix
              tempData.LAND_NAME=inOwner.ownName
              tempData.LAND_SURNAME=inOwner.ownSurname
              tempData.LAND_BIRTHDAY=inOwner.ownAge
              tempData.LAND_PHONE=inOwner.ownPhone
              tempData.ADDRESS_HOME_NUMBER=inOwner.ownHomeId
              tempData.ADDRESS_MOO=inOwner.ownMoo
              tempData.ADDRESS_TRXK=inOwner.ownTrxk
              tempData.ADDRESS_SXY=inOwner.ownSxy
              tempData.ADDRESS_ROAD=inOwner.ownRoad
              tempData.PROVINCE_NAME=inOwner.ownProvince
              tempData.AMPHUR_NAME=inOwner.ownDistrict
              tempData.DISTRICT_NAME=inOwner.ownSubdistrict
              tempData.ADDRESS_HOME_NUMBER=inOwner.ownDeedId
              tempData.ADDRESS_MOO=inOwner.ownDeedMoo
              tempData.ADDRESS_TRXK=inOwner.ownDeedTrxk
              tempData.ADDRESS_SXY=inOwner.ownDeedSxy
              tempData.ADDRESS_ROAD=inOwner.ownDeedRoad
              tempData.PROVINCE_NAME=inOwner.ownDeedProvince
              tempData.AMPHUR_NAME=inOwner.ownDeedDistrict
              tempData.DISTRICT_NAME=inOwner.ownDeedSubdistrict

              tempData.TRAIN_ISSUED = inFood.foodBy;
              tempData.TRAIN_DATE_ISSUED = inFood.foodStart;
              tempData.TRAIN_DATE_EXP = inFood.foodEnd;

              tempData.REQUEST_DOC_NO1 = inLastBox.documentId;
              tempData.REQUEST_DOC_NO2 = inLastBox.documenthHome;
              tempData.REQUEST_DOC_NO3 = inLastBox.documentLegalEntity;
              tempData.REQUEST_DOC_NO4 = inLastBox.documentSignature;
              tempData.REQUEST_DOC_NO5 = inLastBox.documentSJ4;
              tempData.REQUEST_DOC_NO6 = inLastBox.documentOther;

              console.log(tempData);
              if (insert.length != 0) {
                resolve();
              }
            });
          }, 1000);
        });
      }
    }).then(result => {
      if (result.value) {
        Swal.fire({
          html: "<h2>บันทึกสำเร็จ</h2>",
          icon: "success",
          confirmButtonColor: "#009688"
        });
        data = true;
        addNew = false;
        imageSelectype = "";
        base64ImageSelect = "";
        disableMenuAll();
        enableMenu("addMenu");
        enableMenu("editMenu");
        enableMenu("deleteMenu");
        enableFunction();
        // set Date in Last update
        var datetime = new Date();
        let dateForUpdate = datetime.toISOString().slice(0, 10);
        let temp = dateForUpdate.split("-");
        let day = temp[2];
        let month = temp[1];
        let year = parseInt(temp[0]) + 543;
        let format = `${day}-${month}-${year}`;
        document.getElementById("last-update").value = format;
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          icon: "success",
          html: "<h2>ยกเลิกสำเร็จ</h2>",
          confirmButtonColor: "#009688"
        });
        if (data === false) {
          resetInputUI();
          addNew = false;
          disableMenuAll();
          enableMenu("addMenu");
          enableFunction();
          resetStyleIdDelete();
          resetFunction();
        }
        if (isEmpty(tempData) === false && data === true) {
          resetFunction();
          setDataUI(tempData);
          disableMenuAll();
          addNew = false;
          enableMenu("addMenu");
          enableMenu("editMenu");
          enableMenu("deleteMenu");
          enableFunction();
        }
      }
    });
    window.onbeforeunload = null;
  }
}
function editPage() {
  if (!deleteData) {
    window.onbeforeunload = function() {
      return "You have unsaved changes!";
    };
    addNew = true;
    _isImageChange = false;
    disableMenuAll();
    enableMenu("saveMenu");
    disableFunction();
    enableMenu("deleteMenu");
    //tempData
  } else {
    Swal.fire({
      title: "สำนักงานเทศบาล",
      html: "ข้อมูลอยู่ในสถานะลบแล้ว",
      confirmButtonColor: "#009688",
      closeOnConfirm: false,
      icon: "warning"
    });
  }
}
function setIdDelete(type) {
  if (type === "บุคคลธรรมดา") {
    var id = document.getElementById("id");

    if (id != null) {
      if (id.style.textDecoration === "") {
        id.style.textDecoration = "line-through";
      } else {
        id.style.textDecoration = "";
      }
    }
  } else {
    var company_id = document.getElementById("company-id");
    if (company_id != null) {
      if (company_id.style.textDecoration === "") {
        company_id.style.textDecoration = "line-through";
      } else {
        company_id.style.textDecoration = "";
      }
    }
  }
}
function changeStatusDelete(status) {
  let personalDelete = {};
  personalDelete.id = tempData.PERSONAL_ID;
  personalDelete.is_deleted = status;
  console.log(`changeStatusDelete => `);
  console.log(personalDelete);
  return new Promise(function(resolve, reject) {
    axios
      .post(`http://localhost:5000/update/status/delete/`, {
        personal: personalDelete
      })
      .then(result => {
        console.log(`changeStatusDelete = ${result.data}`);
        return resolve(result.data);
      });
  });
}

function deletePage() {
  if (addNew === false) {
    Swal.fire({
      title: "สำนักงานเทศบาล",
      html: "ต้องการลบหรือไม่",
      icon: "warning",
      showCancelButton: true,
      customClass: "swal-height",
      // width: '30%',
      confirmButtonColor: "#009688",
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่ใช่",
      cancelButtonColor: "#dc3545",
      closeOnConfirm: false,
      closeOnCancel: false,
      showLoaderOnConfirm: true,
      preConfirm: function() {
        return new Promise(function(resolve, reject) {
          setTimeout(function() {
            //function ใน operator
            changeStatusDelete("YES").then(statusDelete => {
              tempData.is_deleted = "YES";
              console.log(`statusDelete = ${statusDelete}`);
              if (statusDelete) {
                resolve();
              }
            });
          }, 1000);
        });
      }
    }).then(result => {
      if (result.value) {
        Swal.fire({
          html: "ลบสำเร็จ",
          icon: "success",
          confirmButtonColor: "#009688"
        });
        // function update
        deleteData = true;
        setIdDelete(tempData.PERSONAL_TYPE);
        disableMenuAll();
        enableMenu("addMenu");
        enableMenu("editMenu");
        enableMenu("restoreMenu");

        resetInputRequired();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Swal.fire("บันทึกล้มเหลว");
      }
    });
  } else {
    Swal.fire({
      title: "สำนักงานเทศบาล",
      html: "ต้องการยกเลิกหรือไม่",
      icon: "warning",
      showCancelButton: true,
      customClass: "swal-height",
      // width: '30%',
      confirmButtonColor: "#009688",
      confirmButtonText: "ใช่",

      cancelButtonText: "ไม่ใช่",
      cancelButtonColor: "#dc3545",
      closeOnConfirm: false,
      closeOnCancel: false
    }).then(result => {
      if (result.value) {
        Swal.fire({
          html: "ยกเลิกสำเร็จ",
          icon: "success",
          confirmButtonColor: "#009688"
        });
        resetInputRequired();
        window.onbeforeunload = null;
        if (data === false) {
          // resetInputUI()
          addNew = false;
          disableMenuAll();
          enableMenu("addMenu");
          enableFunction();
          // resetStyleIdDelete()
          resetFunction();
          // resetImageDefault()
        }
        console.log(isEmpty(tempData));
        console.log(tempData);
        if (isEmpty(tempData) === false && data === true) {
          resetFunction();
          setDataUI(tempData);
          disableMenuAll();
          addNew = false;
          enableMenu("addMenu");
          enableMenu("editMenu");
          enableMenu("deleteMenu");
          enableFunction();
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
  let id = document.getElementById("popSearchId").value.trim();
  let name = document.getElementById("popSearchName").value.trim();
  let surname = document.getElementById("popSearchSurname").value.trim();
  if (id.length === 0) {
    id = "none";
  }
  if (name.length === 0) {
    name = "none";
  }
  if (surname.length === 0) {
    surname = "none";
  }
  //ไม่ให้ค้นหา คำค้นหาเดิม
  if (tSearchId != id || tSearchName != name || tSearchSurname != surname) {
    return new Promise((resolve, reject) => {
      tSearchName = name;
      tSearchId = id;
      tSearchSurname = surname;
      console.log("Searching");
      axios
        .get(`http://localhost:5000/search/personal/${id}/${name}/${surname}`)
        .then(result => {
          if (result.data != "Not found") {
            createResultSearch(result.data);
            errorSearch("", "HIDE");

            return resolve(result.data);
          } else {
            errorSearch("not found", "SHOW");
            var tbl = document.getElementById("resultItems");
            if (
              tbl.getElementsByTagName("tbody")[0] != null ||
              tbl.getElementsByTagName("tbody")[0] != undefined
            ) {
              tbl.removeChild(tbl.getElementsByTagName("tbody")[0]);
            }
            console.log(result.data);
          }
        });
    });
  } else {
    console.log(`Search query doesn't change`);
    errorSearch(`query doesn't change`, "SHOW");
  }
}
function errorSearch(texterror, action) {
  let error = document.getElementById("error_search");
  error.classList.toggle("animation");
  if (action === "SHOW") {
    error.style.display = "";
    if (texterror === "not found") {
      error.innerText = "ค้นหารายชื่อผู้ประกอบการไม่พบ";
    } else {
      error.innerText = "คำค้นหาไม่มีการเปลี่ยนแปลง";
    }
  } else {
    error.style.display = "none";
  }
}
function getImageByPeronalId(type, id) {
  return new Promise((resolve, reject) => {
    if (type === "บุคคลธรรมดา") {
      axios.get(`http://localhost:5000/get/image/${id}`).then(result => {
        console.log(result.data[0]);
        return resolve(result.data[0]);
      });
    } else {
      return resolve(false);
    }
  });
}
function showItem(arrayResult) {
  resetParameter();
  resetStyleIdDelete();
  console.log(arrayResult);
  changeOption(arrayResult.PERSONAL_TYPE.trim());
  if (arrayResult.PERSONAL_TYPE === "บุคคลธรรมดา") {
    getImageByPeronalId(
      arrayResult.PERSONAL_TYPE,
      arrayResult.PERSONAL_ID
    ).then(result => {
      console.log(`pid = ${arrayResult.PERSONAL_ID}`);
      console.log(result);
      if (result != false || result != null) {
        arrayResult.image = result;
        setDataUI(arrayResult);
      } else {
        setDataUI(arrayResult);
      }
      tempData = arrayResult;
    });
  } else {
    setDataUI(arrayResult);
    tempData = arrayResult;
  }
  console.log(arrayResult.PERSONAL_IS_DELETED === "YES");
  if (arrayResult.PERSONAL_IS_DELETED === "YES") {
    console.log("YES");
    resetInputRequired();
    //แสดง menu - กลุ่มมีข้อมูลที่ลบแล้ว
    deleteData = true;
    disableMenuAll();
    enableMenu("addMenu");
    enableMenu("editMenu");
    enableMenu("restoreMenu");
    //เช็คว่าข้อมูลอยู่ในสถานะลบหรือเปล่า
    setIdDelete(arrayResult.PERSONAL_TYPE); // ทำให้ id เป็นขีด
    deleteData = true; // status ว่าข้อมูลนั้นอยู่ในสถานะลบ
  } else {
    //แสดง menu - กลุ่มมีข้อมูลที่ไม่ได้ลบ
    data = true;
    addNew = false;
    disableMenuAll();
    enableMenu("addMenu");
    enableMenu("editMenu");
    enableMenu("deleteMenu");
    enableFunction();

    deleteData = false; // status ว่าข้อมูลนั้นไม่ได้อยู่ในสถานะลบ
    resetStyleIdDelete(); //เอา style ลบออก
  }
  Swal.close();
}
function createResultSearch(data) {
  var tbl = document.getElementById("resultItems");
  if (
    tbl.getElementsByTagName("tbody")[0] != null ||
    tbl.getElementsByTagName("tbody")[0] != undefined
  ) {
    tbl.removeChild(tbl.getElementsByTagName("tbody")[0]);
  }
  var tblBody = document.createElement("tbody");
  for (var i = 0; i < data.length; i++) {
    // creates a table row
    var row = document.createElement("tr");
    //row index = this.rowIndex
    row.onclick = function() {
      showItem(data[this.rowIndex - 1]);
    };

    for (var j = 0; j < 4; j++) {
      var cell = document.createElement("td");
      if (j === 0) {
        var cellText = document.createTextNode(data[i].PERSONAL_NAME);
      } else if (j === 1) {
        var cellText = document.createTextNode(data[i].PERSONAL_SURNAME);
      } else if (j === 2) {
        let AddressText = "";
        AddressText =
          AddressText + `บ้านเลขที่ ${data[i].AID.ADDRESS_HOME_NUMBER} `;
        AddressText =
          AddressText +
          `หมู่ ${
            data[i].AID.ADDRESS_MOO === null ? "-" : data[i].AID.ADDRESS_MOO
          } `;
        AddressText =
          AddressText +
          `ตรอก ${
            data[i].AID.ADDRESS_TRXK === null ? "-" : data[i].AID.ADDRESS_TRXK
          } `;
        AddressText =
          AddressText +
          `ซอย ${
            data[i].AID.ADDRESS_SXY === null ? "-" : data[i].AID.ADDRESS_SXY
          } `;
        AddressText =
          AddressText +
          `อาคาร ${
            data[i].AID.ADDRESS_BUILDING === null
              ? "-"
              : data[i].AID.ADDRESS_BUILDING
          } `;
        AddressText =
          AddressText +
          `ถนน ${
            data[i].AID.ADDRESS_ROAD === null ? "-" : data[i].AID.ADDRESS_ROAD
          } `;
        AddressText =
          AddressText +
          `ตำบล ${
            data[i].AID.DISTRICT_NAME === null ? "-" : data[i].AID.DISTRICT_NAME
          } `;
        AddressText =
          AddressText +
          `อำเภอ ${
            data[i].AID.AMPHUR_NAME === null ? "-" : data[i].AID.AMPHUR_NAME
          }`;
        AddressText =
          AddressText +
          `จังหวัด ${
            data[i].AID.PROVINCE_NAME === null ? "-" : data[i].AID.PROVINCE_NAME
          }`;
        var cellText = document.createTextNode(AddressText);
      } else {
        var cellText = document.createTextNode(data[i].PERSONAL_PERSONAL_ID);
      }

      cell.appendChild(cellText);
      row.appendChild(cell);
    }
    tblBody.appendChild(row);
  }
  tbl.appendChild(tblBody);
}
function runScript(e) {
  if (e.keyCode == 13) {
    searchPersonal();
    return false;
  }
}
function testSearchOparator() {
  var swal_html = `<div style="font-family: 'Sarabun';" >
    <div class="display-center">
                <h5 style="font-size: 100%;">
                    ชื่อ :
                    <input type="text" id="username" style="width: 18%;">
                    นามสกุล :
                    <input type="text" id="userlastname" style="width: 18%;" >
                    เลขบัตรประจำตัว :
                    <input type="text" id="userid" style="width: 18%;" >
                    <button type="button" style="width: auto;height: auto;"
                    class="btn btn-secondary is-color" >
                       
                            <i class="fa fa-search"></i> 
                            ค้นหา
                       
                    </button>
                </h5>
            </div>
    <div class="search-popup-height">
        <table id='resultItem' class="table tablesearch table-hover cursor-pointer">
            <thead>
              <tr class="is-color ">
                <th>ชื่อ</th>
                <th>นามสกุล</th>
                <th>ที่อยู่</th>
                <th>เลขบัตรประจำตัว</th>
              </tr>
            </thead>
            <tbody>
            <tr onclick="onSelectUser()">
                <td>นายสมหมาย</td>
                <td>จงรัก</td>
                <td>169 ถนน ลงหาดบางแสน ตำบลแสนสุข อำเภอเมืองชลบุรี ชลบุรี 20131</td>
                <td>1011122111111</td>
            </tr>
            <tr onclick="onSelectUser()">
                <td>นายสมหมาย</td>
                <td>จงรัก</td>
                <td>169 ถนน ลงหาดบางแสน ตำบลแสนสุข อำเภอเมืองชลบุรี ชลบุรี 20131</td>
                <td>1011122111111</td>
            </tr>
            <tr onclick="onSelectUser()">
                <td>นายสมหมาย</td>
                <td>จงรัก</td>
                <td>169 ถนน ลงหาดบางแสน ตำบลแสนสุข อำเภอเมืองชลบุรี ชลบุรี 20131</td>
                <td>1011122111111</td>
            </tr>
            <tr onclick="onSelectUser()">
                <td>นายสมหมาย</td>
                <td>จงรัก</td>
                <td>169 ถนน ลงหาดบางแสน ตำบลแสนสุข อำเภอเมืองชลบุรี ชลบุรี 20131</td>
                <td>1011122111111</td>
            </tr>
            <tr onclick="onSelectUser()">
                <td>นายสมหมาย</td>
                <td>จงรัก</td>
                <td>169 ถนน ลงหาดบางแสน ตำบลแสนสุข อำเภอเมืองชลบุรี ชลบุรี 20131</td>
                <td>1011122111111</td>
            </tr>
            <tr onclick="onSelectUser()">
                <td>นายสมหมาย</td>
                <td>จงรัก</td>
                <td>169 ถนน ลงหาดบางแสน ตำบลแสนสุข อำเภอเมืองชลบุรี ชลบุรี 20131</td>
                <td>1011122111111</td>
            </tr>
            <tr onclick="onSelectUser()">
                <td>นายสมหมาย</td>
                <td>จงรัก</td>
                <td>169 ถนน ลงหาดบางแสน ตำบลแสนสุข อำเภอเมืองชลบุรี ชลบุรี 20131</td>
                <td>1011122111111</td>
            </tr>
            <tr onclick="onSelectUser()">
                <td>นายสมหมาย</td>
                <td>จงรัก</td>
                <td>169 ถนน ลงหาดบางแสน ตำบลแสนสุข อำเภอเมืองชลบุรี ชลบุรี 20131</td>
                <td>1011122111111</td>
            </tr>
            <tr onclick="onSelectUser()">
                <td>นายสมหมาย</td>
                <td>จงรัก</td>
                <td>169 ถนน ลงหาดบางแสน ตำบลแสนสุข อำเภอเมืองชลบุรี ชลบุรี 20131</td>
                <td>1011122111111</td>
            </tr>
            
            <tr onclick="onSelectUser()">
                <td>นายสมหมาย</td>
                <td>จงรัก</td>
                <td>169 ถนน ลงหาดบางแสน ตำบลแสนสุข อำเภอเมืองชลบุรี ชลบุรี 20131</td>
                <td>1011122111111</td>
            </tr>
            </tbody>
          </table>
    </div>
</div>`;

  Swal.fire({
    title: "ค้นหารายชื่อผู้ประกอบการ",
    html: swal_html,
    width: "80%",
    customClass: "swal-height",
    showConfirmButton: false,
    closeOnConfirm: false,
    closeOnCancel: false
  });
}
function restorePage() {
  //function Update delete
  Swal.fire({
    title: "สำนักงานเทศบาล",
    html: "ต้องการยกเลิกสถาะลบหรือไม่",
    icon: "warning",
    showCancelButton: true,
    customClass: "swal-height",
    confirmButtonColor: "#009688",
    confirmButtonText: "ใช่",
    cancelButtonText: "ไม่ใช่",
    cancelButtonColor: "#dc3545",
    closeOnConfirm: false,
    closeOnCancel: false,
    showLoaderOnConfirm: true,
    preConfirm: function() {
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          //function ใน operator
          changeStatusDelete("NO").then(statusDelete => {
            tempData.is_deleted = "NO";
            console.log(`statusDelete = ${statusDelete}`);
            if (statusDelete) {
              resolve();
            }
          });
        }, 1000);
      });
    }
  }).then(result => {
    if (result.value) {
      Swal.fire({
        html: "ผู้ประกอบการนี้กลับอยู่ในสถานะปกติแล้ว",
        icon: "success",
        confirmButtonColor: "#009688"
      });
      resetStyleIdDelete();
      deleteData = false;
      disableMenuAll();
      enableMenu("addMenu");
      enableMenu("editMenu");
      enableMenu("deleteMenu");
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // Swal.fire("บันทึกล้มเหลว");
    }
  });
}