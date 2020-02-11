let _isUsed = false;
let _isIdCheckPersonal = "";
let arrInsert = [];
let fileImage = null;
let _isImageChange = false;
let newAdd = false;
// let base64ImageSelect = "";
// let imageSelectype = "";
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

let inPerson2 = {
  person2_name: "",
  person2_id: ""
};

let inWorkplace = {
  wLocation: "",
  workplaceName: "",
  wPlaceId: "-",
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
  bFine: "",

  typeReForm: "",
  typeProduct: "",
  timeStart: "",
  timeEnd: "",
  formNote: "",
  dateFormStart: "",
  dateFormEnd: ""
};

let inFood = {
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

  inPerson2 = {
    person2_name: "",
    person2_id: ""
  };

  inWorkplace = {
    wLocation: "",
    workplaceName: "",
    wPlaceId: "-",
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
    bFine: "",

    typeReForm: "",
    typeProduct: "",
    timeStart: "",
    timeEnd: "",
    formNote: "",
    dateFormStart: "",
    dateFormEnd: ""
  };

  inFood = {
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
    documentName2: "",
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
  let checkno101 = document.getElementById("moo").value.trim().length === 0;
  let checkno11 = document.getElementById("province").value.trim().length === 0;
  let checkno12 = document.getElementById("district").value.trim().length === 0;
  let checkno13 =
    document.getElementById("subdistrict").value.trim().length === 0;
  let checkno14 = document.getElementById("phone").value.trim().length === 0;
  let checkno15 =
    document.getElementById("wLocation").value.trim().length === 0;
  let checkno16 = document.getElementById("wPlaceId").value.trim().length === 0;
  let checkno17 = document.getElementById("wMoo").value.trim().length === 0;
  let checkno18 =
    document.getElementById("wProvince").value.trim().length === 0;
  let checkno19 =
    document.getElementById("wDistrict").value.trim().length === 0;
  let checkno20 =
    document.getElementById("wSubdistrict").value.trim().length === 0;
  let checkno21 = document.getElementById("wPhone").value.trim().length === 0;
  let checkno28 =
    document.getElementById("typeProduct").value.trim().length === 0;
  let checkno35 =
    document.getElementById("documentName").value.trim().length === 0;
  let checkno36 =
    document.getElementById("documentName2").value.trim().length === 0;

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
  if (checkno101) {
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
  if (checkno15) {
    document.getElementById("wLocation").classList.add("alertInput");
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
  if (checkno28) {
    document.getElementById("typeProduct").classList.add("alertInput");
  }
  if (checkno35) {
    document.getElementById("documentName").classList.add("alertInput");
  }
  if (checkno36) {
    document.getElementById("documentName2").classList.add("alertInput");
  }

  if (
    checkno2 ||
    checkno3 ||
    checkno5 ||
    checkno6 ||
    checkno7 ||
    checkno8 ||
    checkno9 ||
    checkno10 ||
    checkno101 ||
    checkno11 ||
    checkno12 ||
    checkno13 ||
    checkno14 ||
    checkno15 ||
    checkno16 ||
    checkno17 ||
    checkno18 ||
    checkno19 ||
    checkno20 ||
    checkno21 ||
    checkno28 ||
    checkno35 ||
    checkno36
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
  document.getElementById("wLocation").classList.remove("alertInput");
  document.getElementById("wPlaceId").classList.remove("alertInput");
  document.getElementById("wMoo").classList.remove("alertInput");
  document.getElementById("wProvince").classList.remove("alertInput");
  document.getElementById("wDistrict").classList.remove("alertInput");
  document.getElementById("wSubdistrict").classList.remove("alertInput");
  document.getElementById("wPhone").classList.remove("alertInput");
  document.getElementById("typeProduct").classList.remove("alertInput");
  document.getElementById("documentName").classList.remove("alertInput");
  document.getElementById("documentName2").classList.remove("alertInput");

  document.getElementById("foodBy").classList.remove("alertInput");
  document.getElementById("datepicker5").classList.remove("alertInput");
  document.getElementById("datepicker6").classList.remove("alertInput");
}

function foodRequired() {
  let checkfood1 = document.getElementById("foodBy").value.trim().length === 0;
  let checkfood2 =
    document.getElementById("datepicker5").value.trim().length === 0;
  let checkfood3 =
    document.getElementById("datepicker6").value.trim().length === 0;

  if (checkfood1) {
    document.getElementById("foodBy").classList.add("alertInput");
  }
  if (checkfood2) {
    document.getElementById("datepicker5").classList.add("alertInput");
  }
  if (checkfood3) {
    document.getElementById("datepicker6").classList.add("alertInput");
  }

  if (checkfood1 || checkfood2 || checkfood3) {
    return false;
  } else {
    return true;
  }
}

function preInsert() {
  resetInputRequired();
  let check_id_user = document.getElementById("id").value;
  let check_input = inputRequired();
  let check_input_food = foodRequired();
  let check_food = document.getElementById("foodTrain").checked;
  if (check_input) {
    if (check_id_user.trim().length === 13) {
      if (!_isUsed) {
        if (formatPhone(document.getElementById("phone").value.trim())) {
          if (check_food === true) {
            if (check_input_food) {
              inPerson.form_id = document.getElementById("form_id").value;
              inPerson.datepicker1 = document.getElementById(
                "datepicker1"
              ).value;
              inPerson.typeReq = document.getElementById("typeReq").value;
              inPerson.place = document.getElementById("place").value;
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

              inPerson2.person2_name = document.getElementById(
                "person2_name"
              ).value;
              inPerson2.person2_id = document.getElementById(
                "person2_id"
              ).value;

              inWorkplace.wLocation = document.getElementById(
                "wLocation"
              ).value;
              inWorkplace.workplaceName = document.getElementById(
                "workplaceName"
              ).value;
              inWorkplace.wPlaceId = document.getElementById("wPlaceId").value;
              inWorkplace.wMoo = document.getElementById("wMoo").value;
              inWorkplace.wTrxk = document.getElementById("wTrxk").value;
              inWorkplace.wSxy = document.getElementById("wSxy").value;
              inWorkplace.wBuilding = document.getElementById(
                "wBuilding"
              ).value;
              inWorkplace.wRoad = document.getElementById("wRoad").value;
              let provinceValue2 = parseInt(
                document.getElementById(`wProvince`).value
              );
              let amphurValue2 = parseInt(
                document.getElementById(`wDistrict`).value
              );
              let districtValue2 = parseInt(
                document.getElementById(`wSubdistrict`).value
              );
              inWorkplace.wSubdistrict =
                district[districtValue2 - 1].DISTRICT_NAME;
              inWorkplace.wDistrict = amphur[amphurValue2 - 1].AMPHUR_NAME;
              inWorkplace.wProvince =
                province[provinceValue2 - 1].PROVINCE_NAME;
              inWorkplace.wPhone = document.getElementById("wPhone").value;
              inWorkplace.wFax = document.getElementById("wFax").value;

              inForm.bNum = document.getElementById("bNum").value;
              inForm.datepicker2 = document.getElementById("datepicker2").value;
              inForm.bFee = document.getElementById("bFee").value;
              inForm.bFine = document.getElementById("bFine").value;
              inForm.typeReForm = document.getElementById("typeReForm").value;
              inForm.typeProduct = document.getElementById("typeProduct").value;
              inForm.dateStart = document.getElementById("timeStart").value;
              inForm.dateEnd = document.getElementById("timeEnd").value;
              inForm.dateFormStart = document.getElementById(
                "request_date_issued"
              ).value;
              inForm.dateFormEnd = document.getElementById(
                "request_date_date"
              ).value;

              inFood.foodBy = document.getElementById("foodBy").value;
              inFood.foodStart = document.getElementById("datepicker5").value;
              inFood.foodEnd = document.getElementById("datepicker6").value;

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
              arrInsert.push(inPerson2);
              arrInsert.push(inWorkplace);
              arrInsert.push(inForm);
              arrInsert.push(inFood);
              arrInsert.push(inLastBox);
              console.log(arrInsert);
              return true;
            } else {
              Swal.fire({
                title: "กรุณากรอกข้อมูลใบอบรมผู้สัมผัสอาหาร",
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
