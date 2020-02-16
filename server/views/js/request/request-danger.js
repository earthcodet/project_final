let _isUsed = false;
let _isIdCheckPersonal = "";
let arrInsert = [];
let fileImage = null;
let _isImageChange = false;
let newAdd = false;
let base64ImageSelect = "";
let imageSelectype = "";
let textChange = "";
let iconAlert = "";

let inPerson = {
  form_id: "",
  datepicker1: "",
  typeReq: "",
  place: "",
  typeUser: "",
  name: "",
  id: "",
  age: "",
  nationality: "",
  race: ""
};

let inAddress = {
  home_id: "-",
  moo: "",
  trxk: "",
  sxy: "",
  building: "",
  road: "",
  province_name: "",
  amphur_name: "",
  district_name: "",
  phone: "",
  fax: ""
};

let inWorkplace2 = {
  workplaceName: "",
  area: "",
  numPeople: "",
  typeWorkplace: "",
  machinery: "",
  wPlaceId: "",
  wMoo: "",
  wTrxk: "",
  wSxy: "",
  wBuilding: "",
  wRoad: "",
  wProvince: "",
  wDistrict: "",
  wSubdistrict: "",
  wPhone: "",
  wFax: ""
};

let inForm = {
  bNum: "",
  datepicker2: "",
  bFee: "",
  bFine: ""
};

let inOwner = {
  useOtherPlace: "",
  notuseOtherPlace: "",
  ownPrefix: "",
  ownName: "",
  ownSurname: "",
  ownAge: "",
  ownPhone: "",
  ownHomeId: "",
  ownMoo: "",
  ownTrxk: "",
  ownSxy: "",
  ownRoad: "",
  ownProvince: "",
  ownDistrict: "",
  ownSubdistrict: "",
  // ownDeedId: "",
  // ownDeedMoo: "",
  // ownDeedTrxk: "",
  // ownDeedSxy: "",
  // ownDeedRoad: "",
  // ownDeedProvince: "",
  // ownDeedDistrict: "",
  // ownDeedSubdistrict: "",
  uploadFilePdf: ""
};

let inFood = {
  foodTrain: "",
  foodNoTrain: "",
  foodBy: "",
  foodStart: "",
  foodEnd: ""
};

let inLastBox = {
  confirm: "",
  documentId: "",
  documenthHome: "",
  documentLegalEntity: "",
  documentSignature: "",
  documentSJ4: "",
  documentOther: "",
  other: "",
  documentName: "",
  documentName2: "",
  documentName3: "",
  position: ""
};

function checkPhone(value, id) {
  console.log(value);
  let tempCheck = value.split("");
  console.log(tempCheck.length);
  console.log(value.length);
  if (tempCheck[0] === "-") {
    document.getElementById(id).value = "-";
  }
  if (tempCheck[0] != "0" && tempCheck != "-") {
    document.getElementById(id).value = "";
  }
  for (let i = 1; i < tempCheck.length; i++) {
    if (tempCheck[0] === "0") {
      if (tempCheck[1] === "0") {
        document.getElementById(id).value = "0";
      }
      if (tempCheck[i] === "-") {
        document.getElementById(id).value = value.slice(0, value.length - 1);
      }
    }
  }
}
function formatPhone(value) {
  if (
    (value.length === 1 && value === "-") ||
    (value.slice(0, 1) === "0" &&
      value.slice(1, 2) != 0 &&
      value.length === 10 &&
      !isNaN(value))
  ) {
    console.log(`format number`);
    return true;
  } else {
    return false;
  }
}
function checkId(value, type) {
  if (value.length != 13) {
    _isCheckPersonalId = false;
  }
  if (value.length === 13) {
    if (type === "PERSON") {
      console.log(`Tid =` + _isIdCheckPersonal);
      console.log(`Qid =` + value);
      if (_isIdCheckPersonal != value) {
        let tcp = value.split("");
        console.log(tcp);
        let sum_no1 =
          parseInt(tcp[0]) * 13 +
          parseInt(tcp[1]) * 12 +
          parseInt(tcp[2]) * 11 +
          parseInt(tcp[3]) * 10;
        sum_no1 =
          sum_no1 +
          parseInt(tcp[4]) * 9 +
          parseInt(tcp[5]) * 8 +
          parseInt(tcp[6]) * 7 +
          parseInt(tcp[7]) * 6;
        sum_no1 =
          sum_no1 +
          parseInt(tcp[8]) * 5 +
          parseInt(tcp[9]) * 4 +
          parseInt(tcp[10]) * 3 +
          parseInt(tcp[11]) * 2;
        sum_no1 = sum_no1 % 11;
        console.log(sum_no1);
        let sum_no2 = (11 - sum_no1) % 10;
        let checkIdIndex13 = parseInt(tcp[12]) === sum_no2;
        console.log(`parseInt(tcp[12])` + parseInt(tcp[12]));
        console.log(`sum_no2` + sum_no1);
        _isIdCheckPersonal = value;
        if (checkIdIndex13) {
          duplicateId(value).then(data => {
            if (!data) {
              Swal.fire({
                title: "เลขประจำตัวผู้ประกอบการนี้สามารถใช้ได้",
                width: "30%",
                showConfirmButton: true,
                closeOnConfirm: false,
                closeOnCancel: false,
                confirmButtonColor: "#009688",
                icon: "success"
              });
              _isCheckPersonalId = value;
              _isUsed = false;
              textChange = "เลขประจำตัวผู้ประกอบการนี้สามารถใช้ได้";
              iconAlert = "success";
            } else {
              Swal.fire({
                title: "เลขประจำตัวผู้ประกอบการนี้มีในระบบแล้ว",
                width: "30%",
                showConfirmButton: true,
                closeOnConfirm: false,
                closeOnCancel: false,
                confirmButtonColor: "#009688",
                icon: "error"
              });
              _isUsed = true;
              iconAlert = "error";
              textChange = "เลขประจำตัวผู้ประกอบการนี้มีในระบบแล้ว";
              document.getElementById("id").classList.add("alertInput");
              document.getElementById("company-id").classList.add("alertInput");
            }
            console.log(_isUsed);
          });
        } else {
          Swal.fire({
            title: `หมายเลขประจำตัวประชาชนไม่ถูกต้อง`,
            width: "30%",
            showConfirmButton: true,
            closeOnConfirm: false,
            closeOnCancel: false,
            confirmButtonColor: "#009688",
            icon: "error"
          });
          iconAlert = "error";
          textChange = "หมายเลขประจำตัวประชาชนไม่ถูกต้อง";
        }
      } else {
        Swal.fire({
          title: textChange,
          width: "30%",
          showConfirmButton: true,
          closeOnConfirm: false,
          closeOnCancel: false,
          confirmButtonColor: "#009688",
          icon: iconAlert
        });
        console.log(`personal id not change`);
      }
    } else {
      if (_isIdCheckPersonal != value) {
        duplicateId(value).then(data => {
          if (!data) {
            Swal.fire({
              title: "เลขประจำตัวผู้ประกอบการนี้สามารถใช้ได้",
              width: "30%",
              showConfirmButton: true,
              closeOnConfirm: false,
              closeOnCancel: false,
              confirmButtonColor: "#009688",
              icon: "success"
            });
            _isCheckPersonalId = value;
            _isUsed = false;
            iconAlert = "success";
            textChange = "เลขประจำตัวผู้ประกอบการนี้สามารถใช้ได้";
          } else {
            Swal.fire({
              title: "เลขประจำตัวผู้ประกอบการนี้มีในระบบแล้ว",
              width: "30%",
              showConfirmButton: true,
              closeOnConfirm: false,
              closeOnCancel: false,
              confirmButtonColor: "#009688",
              icon: "error"
            });
            _isUsed = true;
            iconAlert = "error";
            textChange = "เลขประจำตัวผู้ประกอบการนี้มีในระบบแล้ว";
            document.getElementById("id").classList.add("alertInput");
            document.getElementById("company-id").classList.add("alertInput");
          }
          console.log(_isUsed);
        });
      } else {
        Swal.fire({
          title: textChange,
          width: "30%",
          showConfirmButton: true,
          closeOnConfirm: false,
          closeOnCancel: false,
          confirmButtonColor: "#009688",
          icon: iconAlert
        });
        console.log(`personal id not change`);
      }
    }
  } else {
    return false;
  }
}
function resetParameter() {
  arrInsert = [];
  inPerson = {
    form_id: "",
    datepicker1: "",
    typeReq: "",
    place: "",
    typeUser: "",
    name: "",
    id: "",
    age: "",
    nationality: "",
    race: ""
  };

  inAddress = {
    home_id: "-",
    moo: "",
    trxk: "",
    sxy: "",
    building: "",
    road: "",
    province_name: "",
    amphur_name: "",
    district_name: "",
    phone: "",
    fax: ""
  };

  inWorkplace2 = {
    workplaceName: "",
    area: "",
    numPeople: "",
    typeWorkplace: "",
    machinery: "",
    wPlaceId: "",
    wMoo: "",
    wTrxk: "",
    wSxy: "",
    wBuilding: "",
    wRoad: "",
    wProvince: "",
    wDistrict: "",
    wSubdistrict: "",
    wPhone: "",
    wFax: ""
  };

  inForm = {
    bNum: "",
    datepicker2: "",
    bFee: "",
    bFine: ""
  };

  inOwner = {
    useOtherPlace: "",
    notuseOtherPlace: "",
    ownPrefix: "",
    ownName: "",
    ownSurname: "",
    ownAge: "",
    ownPhone: "",
    ownHomeId: "",
    ownMoo: "",
    ownTrxk: "",
    ownSxy: "",
    ownRoad: "",
    ownProvince: "",
    ownDistrict: "",
    ownSubdistrict: "",
    uploadFilePdf: ""
  };

  inFood = {
    foodTrain: "",
    foodNoTrain: "",
    foodBy: "",
    foodStart: "",
    foodEnd: ""
  };

  inLastBox = {
    confirm: "",
    documentId: "",
    documenthHome: "",
    documentLegalEntity: "",
    documentSignature: "",
    documentSJ4: "",
    documentOther: "",
    other: "",
    documentName: "",
    documentName2: "",
    documentName3: "",
    position: ""
  };
}
function inputRequired() {
  let checkno2 =
    document.getElementById("datepicker1").value.trim().length === 0;
  let checkno3 = document.getElementById("typeReq").value.trim().length === 0;
  let checkno5 = document.getElementById("name").value.trim().length === 0;
  let checkno6 = document.getElementById("id").value.trim().length === 0;
  let checkno7 = document.getElementById("age").value.trim().length === 0;
  let checkno8 =
    document.getElementById("nationality").value.trim().length === 0;
  let checkno9 = document.getElementById("race").value.trim().length === 0;
  let checkno10 = document.getElementById("home_id").value.trim().length === 0;
  let checkno1001 = document.getElementById("moo").value.trim().length === 0;
  let checkno11 = document.getElementById("province").value.trim().length === 0;
  let checkno12 = document.getElementById("district").value.trim().length === 0;
  let checkno13 =
    document.getElementById("subdistrict").value.trim().length === 0;
  let checkno14 = document.getElementById("phone").value.trim().length === 0;
  let checkno16 = document.getElementById("wPlaceId").value.trim().length === 0;
  let checkno17 = document.getElementById("wMoo").value.trim().length === 0;
  let checkno18 =
    document.getElementById("wProvince").value.trim().length === 0;
  let checkno19 =
    document.getElementById("wDistrict").value.trim().length === 0;
  let checkno20 =
    document.getElementById("wSubdistrict").value.trim().length === 0;
  let checkno21 = document.getElementById("wPhone").value.trim().length === 0;
  let checkno35 =
    document.getElementById("documentName").value.trim().length === 0;
  // let checkno36 =
    // document.getElementById("documentName2").value.trim().length === 0;

  if (checkno2) {
    document.getElementById("datepicker1").classList.add("alertInput");
  }
  if (checkno3) {
    document.getElementById("typeReq").classList.add("alertInput");
  }
  if (checkno5) {
    document.getElementById("name").classList.add("alertInput");
  }
  if (checkno6) {
    document.getElementById("id").classList.add("alertInput");
  }
  if (checkno7) {
    document.getElementById("age").classList.add("alertInput");
  }
  if (checkno8) {
    document.getElementById("nationality").classList.add("alertInput");
  }
  if (checkno9) {
    document.getElementById("race").classList.add("alertInput");
  }
  if (checkno10) {
    document.getElementById("home_id").classList.add("alertInput");
  }
  if (checkno1001) {
    document.getElementById("moo").classList.add("alertInput");
  }
  if (checkno11) {
    document.getElementById("province").classList.add("alertInput");
  }
  if (checkno12) {
    document.getElementById("district").classList.add("alertInput");
  }
  if (checkno13) {
    document.getElementById("subdistrict").classList.add("alertInput");
  }
  if (checkno14) {
    document.getElementById("phone").classList.add("alertInput");
  }
  if (checkno16) {
    document.getElementById("wPlaceId").classList.add("alertInput");
  }
  if (checkno17) {
    document.getElementById("wMoo").classList.add("alertInput");
  }
  if (checkno18) {
    document.getElementById("wProvince").classList.add("alertInput");
  }
  if (checkno19) {
    document.getElementById("wDistrict").classList.add("alertInput");
  }
  if (checkno20) {
    document.getElementById("wSubdistrict").classList.add("alertInput");
  }
  if (checkno21) {
    document.getElementById("wPhone").classList.add("alertInput");
  }
  if (checkno35) {
    document.getElementById("documentName").classList.add("alertInput");
  }
  // if (checkno36) {
  //   document.getElementById("documentName2").classList.add("alertInput");
  // }

  if (
    checkno2 ||
    checkno3 ||
    checkno5 ||
    checkno6 ||
    checkno7 ||
    checkno8 ||
    checkno9 ||
    checkno10 ||
    checkno1001 ||
    checkno11 ||
    checkno12 ||
    checkno13 ||
    checkno14 ||
    checkno16 ||
    checkno17 ||
    checkno18 ||
    checkno19 ||
    checkno20 ||
    checkno21 ||
    checkno35 
    // ||
    // checkno36
  ) {
    return false;
  } else {
    return true;
  }
}
function resetInputRequired() {
  document.getElementById("datepicker1").classList.remove("alertInput");
  document.getElementById("typeReq").classList.remove("alertInput");
  document.getElementById("name").classList.remove("alertInput");
  document.getElementById("id").classList.remove("alertInput");
  document.getElementById("age").classList.remove("alertInput");
  document.getElementById("nationality").classList.remove("alertInput");
  document.getElementById("race").classList.remove("alertInput");
  document.getElementById("home_id").classList.remove("alertInput");
  document.getElementById("moo").classList.remove("alertInput");
  document.getElementById("province").classList.remove("alertInput");
  document.getElementById("district").classList.remove("alertInput");
  document.getElementById("subdistrict").classList.remove("alertInput");
  document.getElementById("phone").classList.remove("alertInput");
  document.getElementById("wPlaceId").classList.remove("alertInput");
  document.getElementById("wMoo").classList.remove("alertInput");
  document.getElementById("wProvince").classList.remove("alertInput");
  document.getElementById("wDistrict").classList.remove("alertInput");
  document.getElementById("wSubdistrict").classList.remove("alertInput");
  document.getElementById("wPhone").classList.remove("alertInput");
  document.getElementById("documentName").classList.remove("alertInput");
  // document.getElementById("documentName2").classList.remove("alertInput");

  document.getElementById("ownName").classList.remove("alertInput");
  document.getElementById("ownSurname").classList.remove("alertInput");
  document.getElementById("ownPhone").classList.remove("alertInput");
  document.getElementById("ownHomeId").classList.remove("alertInput");
  document.getElementById("ownMoo").classList.remove("alertInput");
  document.getElementById("ownerProvince").classList.remove("alertInput");
  document.getElementById("ownerDistrict").classList.remove("alertInput");
  document.getElementById("ownerSubdistrict").classList.remove("alertInput");
}

function ownerRequire() {
  let owner1 = document.getElementById("ownName").value.trim().length === 0;
  let owner2 = document.getElementById("ownSurname").value.trim().length === 0;
  let owner3 = document.getElementById("ownPhone").value.trim().length === 0;
  let owner4 = document.getElementById("ownHomeId").value.trim().length === 0;
  let owner5 = document.getElementById("ownMoo").value.trim().length === 0;
  let owner6 =
    document.getElementById("ownerProvince").value.trim().length === 0;
  let owner7 =
    document.getElementById("ownerDistrict").value.trim().length === 0;
  let owner8 =
    document.getElementById("ownerSubdistrict").value.trim().length === 0;

  if (owner1) {
    document.getElementById("ownName").classList.add("alertInput");
  }
  if (owner2) {
    document.getElementById("ownSurname").classList.add("alertInput");
  }
  if (owner3) {
    document.getElementById("ownPhone").classList.add("alertInput");
  }
  if (owner4) {
    document.getElementById("ownHomeId").classList.add("alertInput");
  }
  if (owner5) {
    document.getElementById("ownMoo").classList.add("alertInput");
  }
  if (owner6) {
    document.getElementById("ownerProvince").classList.add("alertInput");
  }
  if (owner7) {
    document.getElementById("ownerDistrict").classList.add("alertInput");
  }
  if (owner8) {
    document.getElementById("ownerSubdistrict").classList.add("alertInput");
  }

  if (
    owner1 ||
    owner2 ||
    owner3 ||
    owner4 ||
    owner5 ||
    owner6 ||
    owner7 ||
    owner8
  ) {
    return false;
  } else {
    return true;
  }
}

function preInsert() {
  resetInputRequired();
  let check_id_user = document.getElementById("id").value;
  let check_input = inputRequired();
  let check_input_owner = ownerRequire();
  let check_owner = document.getElementById("useOtherPlace").checked;
  if (check_input) {
    if (check_id_user.trim().length === 13) {
      if (!_isUsed) {
        if (formatPhone(document.getElementById("phone").value.trim())) {
          if (check_owner === true) {
            if (check_input_owner) {
              inPerson.form_id = document.getElementById("form_id").value;
              inPerson.datepicker1 = document.getElementById(
                "datepicker1"
              ).value;
              inPerson.typeReq = document.getElementById("typeReq").value;
              inPerson.typeUser = document.getElementById("typeUser").value;
              inPerson.name = document.getElementById("name").value;
              inPerson.id = document.getElementById("id").value;
              inPerson.age = document.getElementById("age").value;
              inPerson.nationality = document.getElementById(
                "nationality"
              ).value;
              inPerson.race = document.getElementById("race").value;

              inAddress.home_id = document.getElementById("home_id").value;
              inAddress.moo = document.getElementById("moo").value;
              inAddress.trxk = document.getElementById("trxk").value;
              inAddress.sxy = document.getElementById("sxy").value;
              inAddress.building = document.getElementById("building").value;
              inAddress.road = document.getElementById("road").value;
              let provinceValue = parseInt(
                document.getElementById(`province`).value
              );
              let amphurValue = parseInt(
                document.getElementById(`district`).value
              );
              let districtValue = parseInt(
                document.getElementById(`subdistrict`).value
              );
              inAddress.district_name =
                district[districtValue - 1].DISTRICT_NAME;
              inAddress.amphur_name = amphur[amphurValue - 1].AMPHUR_NAME;
              inAddress.province_name =
                province[provinceValue - 1].PROVINCE_NAME;
              inAddress.phone = document.getElementById("phone").value;
              inAddress.fax = document.getElementById("fax").value;

              inWorkplace2.workplaceName = document.getElementById("workplaceName").value;
              inWorkplace2.area = document.getElementById("area").value;
              inWorkplace2.numPeople = document.getElementById("numPeople").value;
              inWorkplace2.typeWorkplace = document.getElementById("typeWorkplace").value;
              inWorkplace2.wPlaceId = document.getElementById("wPlaceId").value;
              inWorkplace2.wMoo = document.getElementById("wMoo").value;
              inWorkplace2.wTrxk = document.getElementById("wTrxk").value;
              inWorkplace2.wSxy = document.getElementById("wSxy").value;
              inWorkplace2.wBuilding = document.getElementById(
                "wBuilding"
              ).value;
              inWorkplace2.wRoad = document.getElementById("wRoad").value;
              let provinceValue2 = parseInt(
                document.getElementById(`wProvince`).value
              );
              let amphurValue2 = parseInt(
                document.getElementById(`wDistrict`).value
              );
              let districtValue2 = parseInt(
                document.getElementById(`wSubdistrict`).value
              );
              inWorkplace2.wSubdistrict =
                district[districtValue2 - 1].DISTRICT_NAME;
              inWorkplace2.wDistrict = amphur[amphurValue2 - 1].AMPHUR_NAME;
              inWorkplace2.wProvince =
                province[provinceValue2 - 1].PROVINCE_NAME;
              inWorkplace2.wPhone = document.getElementById("wPhone").value;
              inWorkplace2.wFax = document.getElementById("wFax").value;

              inForm.bNum = document.getElementById("bNum").value;
              inForm.datepicker2 = document.getElementById("datepicker2").value;
              inForm.bFee = document.getElementById("bFee").value;
              inForm.bFine = document.getElementById("bFine").value;

              inOwner.ownPrefix = document.getElementById("ownPrefix").value;
              inOwner.ownName = document.getElementById("ownName").value;
              inOwner.ownSurname = document.getElementById("ownSurname").value;
              inOwner.ownAge = document.getElementById("ownAge");
              inOwner.ownPhone = document.getElementById("ownPhone").value;
              inOwner.ownHomeId = document.getElementById("ownHomeId").value;
              inOwner.ownMoo = document.getElementById("ownMoo").value;
              inOwner.ownTrxk = document.getElementById("ownTrxk").value;
              inOwner.ownSxy = document.getElementById("ownSxy").value;
              inOwner.ownRoad = document.getElementById("ownRoad").value;
              let provinceValue3 = parseInt(
                document.getElementById(`ownerProvince`).value
              );
              let amphurValue3 = parseInt(
                document.getElementById(`ownerDistrict`).value
              );
              let districtValue3 = parseInt(
                document.getElementById(`ownerSubdistrict`).value
              );
              inOwner.ownSubdistrict =
                district[districtValue3 - 1].DISTRICT_NAME;
              inOwner.ownDistrict = amphur[amphurValue3 - 1].AMPHUR_NAME;
              inOwner.ownProvince =
                province[provinceValue3 - 1].PROVINCE_NAME;
              inOwner.uploadFilePdf = document.getElementById(
                "uploadFilePdf"
              ).value;

              inLastBox.confirm = document.getElementById("confirm").value;
              inLastBox.documentId = document.getElementById(
                "documentId"
              ).value;
              inLastBox.documenthHome = document.getElementById(
                "documenthHome"
              ).value;
              inLastBox.documentLegalEntity = document.getElementById(
                "documentLegalEntity"
              ).value;
              inLastBox.documentSignature = document.getElementById(
                "documentSignature"
              ).value;
              inLastBox.documentSJ4 = document.getElementById(
                "documentSJ4"
              ).value;
              inLastBox.documentOther = document.getElementById(
                "documentOther"
              ).value;
              inLastBox.other = document.getElementById("other").value;
              inLastBox.documentName = document.getElementById(
                "documentName"
              ).value;
              inLastBox.documentName2 = document.getElementById(
                "documentName2"
              ).value;
              inLastBox.documentName2 = document.getElementById(
                "documentName3"
              ).value;
              inLastBox.position = document.getElementById("position").value;

              arrInsert.push(inPerson);
              arrInsert.push(inAddress);
              arrInsert.push(inWorkplace2);
              arrInsert.push(inForm);
              arrInsert.push(inOwner);
              arrInsert.push(inLastBox);
              console.log(arrInsert);
              return true;
            } else {
              Swal.fire({
                title: "กรุณากรอกข้อมูลเจ้าของสถานที่",
                width: "30%",
                showConfirmButton: true,
                closeOnConfirm: false,
                closeOnCancel: false,
                confirmButtonColor: "#009688",
                icon: "error"
              });
            }
          } else {
            return true;
          }
        } else {
          Swal.fire({
            title: "รูปแบบหมายเลขโทรศัพท์ไม่ถูกต้อง",
            width: "30%",
            showConfirmButton: true,
            closeOnConfirm: false,
            closeOnCancel: false,
            confirmButtonColor: "#009688",
            icon: "error"
          });
          document.getElementById("phone").classList.add("alertInput");
        }
      } else {
        Swal.fire({
          title: "เลขประจำตัวผู้ประกอบการนี้มีในระบบแล้ว",
          width: "30%",
          showConfirmButton: true,
          closeOnConfirm: false,
          closeOnCancel: false,
          confirmButtonColor: "#009688",
          icon: "error"
        });
        document.getElementById("id").classList.add("alertInput");
      }
    } else {
      Swal.fire({
        title: "กรุณาใส่เลขประจำตัวให้ครบ 13 หลัก",
        width: "30%",
        showConfirmButton: true,
        closeOnConfirm: false,
        closeOnCancel: false,
        confirmButtonColor: "#009688",
        icon: "error"
      });
      document.getElementById("id").classList.add("alertInput");
      return false;
    }
  } else {
    Swal.fire({
      title: "กรุณากรอกข้อมูลให้ครบ",
      width: "30%",
      showConfirmButton: true,
      closeOnConfirm: false,
      closeOnCancel: false,
      confirmButtonColor: "#009688",
      icon: "error"
    });
  }
}
