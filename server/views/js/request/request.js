function inputRequired() {
  let checkno2 =
    document.getElementById("datepicker1").value.trim().length === 0;
  let checkno3 = document.getElementById("typeReq").value.trim().length === 0;
  let checkno5 = document.getElementById("name").value.trim().length === 0;
  let checkno6 = document.getElementById("id").value.trim().length === 0;
  // let checkno7 = document.getElementById("age").value.trim().length === 0;
  // let checkno8 =
  //   document.getElementById("nationality").value.trim().length === 0;
  // let checkno9 = document.getElementById("race").value.trim().length === 0;
  let checkno10 = document.getElementById("home_id").value.trim().length === 0;
  let checkno1001 = document.getElementById("moo").value.trim().length === 0;
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
  // let checkno36 = document.getElementById("documentName2").value.trim().length === 0;

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
  // if (checkno7) {
  //   document.getElementById("age").classList.add("alertInput");
  // }
  // if (checkno8) {
  //   document.getElementById("nationality").classList.add("alertInput");
  // }
  // if (checkno9) {
  //   document.getElementById("race").classList.add("alertInput");
  // }
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
  // if (checkno36) {
  //   document.getElementById("documentName2").classList.add("alertInput");
  // }

  if (
    checkno2 ||
    checkno3 ||
    checkno5 ||
    checkno6 ||
    // checkno7 ||
    // checkno8 ||
    // checkno9 ||
    checkno10 ||
    checkno1001 ||
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
  // document.getElementById("age").classList.remove("alertInput");
  // document.getElementById("nationality").classList.remove("alertInput");
  // document.getElementById("race").classList.remove("alertInput");
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
  // document.getElementById("documentName2").classList.remove("alertInput");

  document.getElementById("foodBy").classList.remove("alertInput");
  document.getElementById("datepicker5").classList.remove("alertInput");
  document.getElementById("datepicker6").classList.remove("alertInput");
}
function inputRequired2() {
  let checkno2 =
    document.getElementById("datepicker1").value.trim().length === 0;
  let checkno3 = document.getElementById("typeReq").value.trim().length === 0;
  let checkno5 = document.getElementById("name").value.trim().length === 0;
  let checkno6 = document.getElementById("id").value.trim().length === 0;
  // let checkno7 = document.getElementById("age").value.trim().length === 0;
  // let checkno8 =
  //   document.getElementById("nationality").value.trim().length === 0;
  // let checkno9 = document.getElementById("race").value.trim().length === 0;
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
  // let checkno35 =document.getElementById("documentName").value.trim().length === 0;
  // let checkno36 =document.getElementById("documentName2").value.trim().length === 0;

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
  // if (checkno7) {
  //   document.getElementById("age").classList.add("alertInput");
  // }
  // if (checkno8) {
  //   document.getElementById("nationality").classList.add("alertInput");
  // }
  // if (checkno9) {
  //   document.getElementById("race").classList.add("alertInput");
  // }
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
  // if (checkno35) {document.getElementById("documentName").classList.add("alertInput");}
  // if (checkno36) {document.getElementById("documentName2").classList.add("alertInput");}

  if (
    checkno2 ||
    checkno3 ||
    checkno5 ||
    checkno6 ||
    // checkno7 ||
    // checkno8 ||
    // checkno9 ||
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
    checkno21
    //  ||
    // checkno35
    // ||checkno36
  ) {
    return false;
  } else {
    return true;
  }
}
function resetInputRequired2() {
  document.getElementById("datepicker1").classList.remove("alertInput");
  document.getElementById("typeReq").classList.remove("alertInput");
  document.getElementById("name").classList.remove("alertInput");
  document.getElementById("id").classList.remove("alertInput");
  // document.getElementById("age").classList.remove("alertInput");
  // document.getElementById("nationality").classList.remove("alertInput");
  // document.getElementById("race").classList.remove("alertInput");
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
  // document.getElementById("documentName").classList.remove("alertInput");
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
  let check_input = false
  if(document.getElementById('typeReForm') != undefined){
    resetInputRequired();
    check_input= inputRequired();
  }else{
    resetInputRequired2();
    check_input= inputRequired2();
  }
  let check_input_food = false
  let check_food = false
  if (document.getElementById("foodTrain") != undefined) {
    check_food = document.getElementById("foodTrain").checked;
    check_input_food = foodRequired();
  }
  let check_input_owner = false
  let check_owner = false
  if (document.getElementById('useOtherPlace') != undefined) {
    check_owner = document.getElementById("useOtherPlace").checked;
    check_input_owner = ownerRequire();
  }

  if (check_input) {
    if (check_food) {
      if (check_input_food) {
        if (check_owner) {
          if (check_input_owner) {
            if(getRequestTypeId(document.getElementById('typeReq').value.trim()) != undefined){
              return true;
            }else{
              Swal.fire({
                title: "ประเภทคำขอไม่ถูกต้อง",
                width: "30%",
                showConfirmButton: true,
                closeOnConfirm: false,
                closeOnCancel: false,
                confirmButtonColor: "#009688",
                icon: "error"
              });
              document.getElementById("typeReq").classList.add("alertInput");
            }
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
          if(getRequestTypeId(document.getElementById('typeReq').value.trim()) != undefined){
            return true;
          }else{
            Swal.fire({
              title: "ประเภทคำขอไม่ถูกต้อง",
              width: "30%",
              showConfirmButton: true,
              closeOnConfirm: false,
              closeOnCancel: false,
              confirmButtonColor: "#009688",
              icon: "error"
            });
            document.getElementById("typeReq").classList.add("alertInput");
          }
        }
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
    }

    if (check_owner) {
      if (check_input_owner) {
        if (check_food) {
          if (check_input_food) {
            if(getRequestTypeId(document.getElementById('typeReq').value.trim()) != undefined){
              return true;
            }else{
              Swal.fire({
                title: "ประเภทคำขอไม่ถูกต้อง",
                width: "30%",
                showConfirmButton: true,
                closeOnConfirm: false,
                closeOnCancel: false,
                confirmButtonColor: "#009688",
                icon: "error"
              });
              document.getElementById("typeReq").classList.add("alertInput");
            }
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
          if(getRequestTypeId(document.getElementById('typeReq').value.trim()) != undefined){
            return true;
          }else{
            Swal.fire({
              title: "ประเภทคำขอไม่ถูกต้อง",
              width: "30%",
              showConfirmButton: true,
              closeOnConfirm: false,
              closeOnCancel: false,
              confirmButtonColor: "#009688",
              icon: "error"
            });
            document.getElementById("typeReq").classList.add("alertInput");
          }
        }
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
      if(getRequestTypeId(document.getElementById('typeReq').value.trim()) != undefined){
        return true;
      }else{
        Swal.fire({
          title: "ประเภทคำขอไม่ถูกต้อง",
          width: "30%",
          showConfirmButton: true,
          closeOnConfirm: false,
          closeOnCancel: false,
          confirmButtonColor: "#009688",
          icon: "error"
        });
        document.getElementById("typeReq").classList.add("alertInput");
      }
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
    return false
  }
}
