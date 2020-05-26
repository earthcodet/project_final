function inputRequired() {
  let checkno2 = document.getElementById("datepicker1").value.trim().length === 0;
  let checkno3 = document.getElementById("typeReq").value.trim().length === 0;
  let checkno5 = document.getElementById("name").value.trim().length === 0;
  let checkno6 = document.getElementById("id").value.trim().length === 0;
  let checkno10 = document.getElementById("home_id").value.trim().length === 0;
  let checkno11 = document.getElementById("province").value.trim().length === 0;
  let checkno12 = document.getElementById("district").value.trim().length === 0;
  let checkno14 = document.getElementById("phone").value.trim().length === 0;
  let checkno15 = document.getElementById("wLocation").value.trim().length === 0;
  let checkno16 = document.getElementById("wPlaceId").value.trim().length === 0;
  let checkno18 = document.getElementById("wProvince").value.trim().length === 0;
  let checkno19 = document.getElementById("wDistrict").value.trim().length === 0;
  let checkno21 = document.getElementById("wPhone").value.trim().length === 0;
  let checkno28 = document.getElementById("typeProduct").value.trim().length === 0;
  let checkno35 = document.getElementById("documentName").value.trim().length === 0;

  if (checkno2) { document.getElementById("datepicker1").classList.add("alertInput"); }
  if (checkno3) { document.getElementById("typeReq").classList.add("alertInput"); }
  if (checkno5) { document.getElementById("name").classList.add("alertInput"); }
  if (checkno6) { document.getElementById("id").classList.add("alertInput"); }
  if (checkno10) { document.getElementById("home_id").classList.add("alertInput"); }
  if (checkno11) { document.getElementById("province").classList.add("alertInput"); }
  if (checkno12) { document.getElementById("district").classList.add("alertInput"); }
  if (checkno14) { document.getElementById("phone").classList.add("alertInput"); }
  if (checkno15) { document.getElementById("wLocation").classList.add("alertInput"); }
  if (checkno16) { document.getElementById("wPlaceId").classList.add("alertInput"); }
  if (checkno18) { document.getElementById("wProvince").classList.add("alertInput"); }
  if (checkno19) { document.getElementById("wDistrict").classList.add("alertInput"); }
  if (checkno21) { document.getElementById("wPhone").classList.add("alertInput"); }
  if (checkno28) { document.getElementById("typeProduct").classList.add("alertInput"); }
  if (checkno35) { document.getElementById("documentName").classList.add("alertInput"); }

  if (
    checkno2 ||
    checkno3 ||
    checkno5 ||
    checkno6 ||
    checkno10 ||
    checkno11 ||
    checkno12 ||
    checkno14 ||
    checkno15 ||
    checkno16 ||
    checkno18 ||
    checkno19 ||
    checkno21 ||
    checkno28 ||
    checkno35
  ) {
    return false;
  } else {
    return true;
  }
}

function resetDateRequired() {
  if (document.getElementById('datepicker1') != undefined) {
    document.getElementById("datepicker1").classList.remove("alertInput");
  }
  if (document.getElementById('datepicker2') != undefined) {
    document.getElementById("datepicker2").classList.remove("alertInput");
  }
  if (document.getElementById('datepicker5') != undefined) {
    document.getElementById("datepicker5").classList.remove("alertInput");
  }
  if (document.getElementById('datepicker6') != undefined) {
    document.getElementById("datepicker6").classList.remove("alertInput");
  }
  if (document.getElementById('datepicker9') != undefined) {
    document.getElementById("datepicker9").classList.remove("alertInput");
  }
  if (document.getElementById('datepicker10') != undefined) {
    document.getElementById("datepicker10").classList.remove("alertInput");
  }
  if (document.getElementById('datepicker11') != undefined) {
    document.getElementById("datepicker11").classList.remove("alertInput");
  }
}
function resetInputRequired() {
  document.getElementById("datepicker1").classList.remove("alertInput");
  document.getElementById("typeReq").classList.remove("alertInput");
  document.getElementById("name").classList.remove("alertInput");
  document.getElementById("id").classList.remove("alertInput");
  document.getElementById("home_id").classList.remove("alertInput");
  document.getElementById("province").classList.remove("alertInput");
  document.getElementById("district").classList.remove("alertInput");
  document.getElementById("phone").classList.remove("alertInput");
  document.getElementById("wLocation").classList.remove("alertInput");
  document.getElementById("wPlaceId").classList.remove("alertInput");
  document.getElementById("wProvince").classList.remove("alertInput");
  document.getElementById("wDistrict").classList.remove("alertInput");
  document.getElementById("wPhone").classList.remove("alertInput");
  document.getElementById("typeProduct").classList.remove("alertInput");
  document.getElementById("documentName").classList.remove("alertInput");
  document.getElementById("foodBy").classList.remove("alertInput");
  document.getElementById("datepicker5").classList.remove("alertInput");
  document.getElementById("datepicker6").classList.remove("alertInput");
}
function inputRequired2() {
  let checkno2 = document.getElementById("datepicker1").value.trim().length === 0;
  let checkno3 = document.getElementById("typeReq").value.trim().length === 0;
  let checkno5 = document.getElementById("name").value.trim().length === 0;
  let checkno6 = document.getElementById("id").value.trim().length === 0;
  let checkno10 = document.getElementById("home_id").value.trim().length === 0;
  let checkno11 = document.getElementById("province").value.trim().length === 0;
  let checkno12 = document.getElementById("district").value.trim().length === 0;
  let checkno14 = document.getElementById("phone").value.trim().length === 0;
  let checkno16 = document.getElementById("wPlaceId").value.trim().length === 0;
  let checkno18 = document.getElementById("wProvince").value.trim().length === 0;
  let checkno19 = document.getElementById("wDistrict").value.trim().length === 0;
  let checkno21 = document.getElementById("wPhone").value.trim().length === 0;

  if (checkno2) { document.getElementById("datepicker1").classList.add("alertInput"); }
  if (checkno3) { document.getElementById("typeReq").classList.add("alertInput"); }
  if (checkno5) { document.getElementById("name").classList.add("alertInput"); }
  if (checkno6) { document.getElementById("id").classList.add("alertInput"); }
  if (checkno10) { document.getElementById("home_id").classList.add("alertInput"); }
  if (checkno11) { document.getElementById("province").classList.add("alertInput"); }
  if (checkno12) { document.getElementById("district").classList.add("alertInput"); }
  if (checkno14) { document.getElementById("phone").classList.add("alertInput"); }
  if (checkno16) { document.getElementById("wPlaceId").classList.add("alertInput"); }
  if (checkno18) { document.getElementById("wProvince").classList.add("alertInput"); }
  if (checkno19) { document.getElementById("wDistrict").classList.add("alertInput"); }
  if (checkno21) { document.getElementById("wPhone").classList.add("alertInput"); }

  if (
    checkno2 ||
    checkno3 ||
    checkno5 ||
    checkno6 ||
    checkno10 ||
    checkno11 ||
    checkno12 ||
    checkno14 ||
    checkno16 ||
    checkno18 ||
    checkno19 ||
    checkno21
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
  document.getElementById("home_id").classList.remove("alertInput");
  document.getElementById("province").classList.remove("alertInput");
  document.getElementById("district").classList.remove("alertInput");
  document.getElementById("phone").classList.remove("alertInput");
  document.getElementById("wPlaceId").classList.remove("alertInput");
  document.getElementById("wProvince").classList.remove("alertInput");
  document.getElementById("wDistrict").classList.remove("alertInput");
  document.getElementById("wPhone").classList.remove("alertInput");
  document.getElementById("ownName").classList.remove("alertInput");
  document.getElementById("ownSurname").classList.remove("alertInput");
  document.getElementById("ownPhone").classList.remove("alertInput");
  document.getElementById("ownHomeId").classList.remove("alertInput");
  document.getElementById("ownerProvince").classList.remove("alertInput");
  document.getElementById("ownerDistrict").classList.remove("alertInput");
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
  let owner6 =
    document.getElementById("ownerProvince").value.trim().length === 0;
  let owner7 =
    document.getElementById("ownerDistrict").value.trim().length === 0;

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
  if (owner6) {
    document.getElementById("ownerProvince").classList.add("alertInput");
  }
  if (owner7) {
    document.getElementById("ownerDistrict").classList.add("alertInput");
  }

  if (
    owner1 ||
    owner2 ||
    owner3 ||
    owner4 ||
    owner6 ||
    owner7
  ) {
    return false;
  } else {
    return true;
  }
}
// function getDateInputCheck() {
//   let temp = []
//   if (document.getElementById('datepicker1') != undefined) {
//     temp.push(document.getElementById("datepicker1").value.trim())
//     temp.push('datepicker1')
//   }
//   if (document.getElementById('datepicker2') != undefined) {
//     temp.push(document.getElementById("datepicker2").value.trim())
//     temp.push('datepicker2')
//   }
//   if (document.getElementById('datepicker5') != undefined) {
//     temp.push(document.getElementById("datepicker5").value.trim())
//     temp.push('datepicker5')
//   }
//   if (document.getElementById('datepicker6') != undefined) {
//     temp.push(document.getElementById("datepicker6").value.trim())
//     temp.push('datepicker6')
//   }
//   if (document.getElementById('datepicker9') != undefined) {
//     temp.push(document.getElementById("datepicker9").value.trim())
//     temp.push('datepicker9')
//   }
//   if (document.getElementById('datepicker10') != undefined) {
//     temp.push(document.getElementById("datepicker10").value.trim())
//     temp.push('datepicker10')
//   }
//   if (document.getElementById('datepicker11') != undefined) {
//     temp.push(document.getElementById("datepicker11").value.trim())
//     temp.push('datepicker11')
//   }
//   return temp
// }
// function checkDateInputCorrect() {
//   let temp_date = getDateInputCheck()
//   for (i = 0; i < temp_date.length; i = i + 2) {
//     let correct_date = checkDateFormatCorrect(temp_date[i])
//     if (!correct_date) {
//       let temp = [false , temp_date[i+1]]
//       return temp
//     }
//   }
//   let temp = [true , 'date']
//   return temp
// }
function preInsert() {
  resetDateRequired()
  let check_input = false
  if (document.getElementById('typeReForm') != undefined) {
    resetInputRequired();
    console.log('input Required')
    check_input = inputRequired();

  } else {
    resetInputRequired2();
    console.log('input Required 2')
    check_input = inputRequired2();

  }
  let check_input_food = false
  let check_food = false
  if (document.getElementById("foodTrain") != undefined) {
    check_food = document.getElementById("foodTrain").checked;
    if (check_food) {
      check_input_food = foodRequired();
      if (check_input === true && check_input_food === true) {
        check_input = true
      } else {
        check_input = false
      }
    }
  }
  let check_input_owner = false
  let check_owner = false
  if (document.getElementById('useOtherPlace') != undefined) {
    check_owner = document.getElementById("useOtherPlace").checked;
    if (check_owner) {
      check_input_owner = ownerRequire();
      if (check_input === true && check_input_owner === true) {
        check_input = true
      } else {
        check_input = false
      }
    }
  }
  console.log(`check_input`)
  console.log(check_input)


  /*
  date 7 
    datepicker1
    datepicker2
    datepicker5
    datepicker6
    datepicker9
    datepicker10
    datepicker11
   */
  // let temp_check_date = checkDateInputCorrect()
  // if (temp_check_date[0]) {
    if (check_input) {
      if (check_food) {
        if (check_input_food) {
          if (check_owner) {
            if (check_input_owner) {
              if (getRequestTypeId(document.getElementById('typeReq').value.trim()) != undefined) {
                return true;
              } else {
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
            if (getRequestTypeId(document.getElementById('typeReq').value.trim()) != undefined) {
              return true;
            } else {
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
      } if (check_owner) {
        if (check_input_owner) {
          if (check_food) {
            if (check_input_food) {
              if (getRequestTypeId(document.getElementById('typeReq').value.trim()) != undefined) {
                return true;
              } else {
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
            if (getRequestTypeId(document.getElementById('typeReq').value.trim()) != undefined) {
              return true;
            } else {
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
        if (getRequestTypeId(document.getElementById('typeReq').value.trim()) != undefined) {
          return true;
        } else {
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
        return false
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
  // }else{
  //   Swal.fire({
  //     title: "รูปแบบวันที่ไม่ถูกต้อง",
  //     width: "30%",
  //     showConfirmButton: true,
  //     closeOnConfirm: false,
  //     closeOnCancel: false,
  //     confirmButtonColor: "#009688",
  //     icon: "error"
  //   });
  //   document.getElementById(temp_check_date[1]).classList.add("alertInput");
  // }

}
