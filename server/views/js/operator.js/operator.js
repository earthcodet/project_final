let _isUsed = false;
let _isIdCheckPersonal = "";
let arrInsert = [];
let fileImage;
let inAddress = {
    id: "test",
    home_number: "",
    moo: null,
    trxk: null,
    sxy: null,
    building: null,
    road: null,
    district_name: "",
    amphur_name: "",
    province_name: ""
};
let inPeronal = {
    id: "",
    address_id: "",
    title: "",
    type: "",
    name: "",
    surname: "",
    nationality: null,
    race: null,
    birthday: null,
    personal_id: "",
    card_issued: "",
    card_expipe: null,
    phone: "",
    fax: null
};
let inImage = {
    id: "",
    type: null,
    data: null
};

let SEprovince = [];
let SEamphur = [];
let SEdistrict = [];
function resetConstro(){

}
// function changeDis
function setDataUI(data) {
    if (data.PERSONAL_TYPE != 'นิติบุคคล') {
        //address
        document.getElementById('homeId').value = data.AID.ADDRESS_HOME_NUMBER
        document.getElementById('moo').value = data.AID.ADDRESS_MOO === undefined ? '-' : data.AID.ADDRESS_MOO
        document.getElementById('trxk').value = data.AID.ADDRESS_TRXK === undefined ? '-' : data.AID.ADDRESS_TRXK
        document.getElementById('sxy').value = data.AID.ADDRESS_SXY === undefined ? '-' : data.AID.ADDRESS_SXY
        document.getElementById('building').value = data.AID.ADDRESS_BUILDING === undefined ? '-' : data.AID.ADDRESS_BUILDING
        document.getElementById('road').value = data.AID.ADDRESS_ROAD === undefined ? '-' : data.AID.ADDRESS_ROAD
        //ค่าที่ส่งกลับมาอาจเป็น text ต้องการที่เป็น int
        document.getElementById(`province`).value = parseInt(getProviceIdByName(data.AID.PROVINCE_NAME))
        amphurSelect(parseInt(getProviceIdByName(data.AID.PROVINCE_NAME)))
        districtSelect(parseInt(getAmphureIdByName(data.AID.AMPHUR_NAME)))
        console.log(addressAmphur)
        document.getElementById(`district`).value = parseInt(getAmphureIdByName(data.AID.AMPHUR_NAME))
        document.getElementById(`subdistrict`).value = parseInt(getDistrictIdByName(data.AID.DISTRICT_NAME))
        //prsonal
        document.getElementById('title').value = data.PERSONAL_TITLE === undefined ? '' : data.PERSONAL_TITLE
        document.getElementById('typeUser').value = data.PERSONAL_TYPE
        document.getElementById('typeUser').disabled = true
        // ('disabled', true)
        document.getElementById('nameUser').value = data.PERSONAL_NAME
        document.getElementById('surnameUser').value = data.PERSONAL_SURNAME === undefined ? '' : data.PERSONAL_SURNAME
        document.getElementById('nationality').value = data.PERSONAL_NATIONALITY === undefined ? '' : data.PERSONAL_NATIONALITY
        document.getElementById('race').value = data.PERSONAL_RACE === undefined ? '' : data.PERSONAL_RACE
        document.getElementById('datepicker3').value = data.PERSONAL_BIRTHDAY === undefined ? '00-00-0000' : data.PERSONAL_BIRTHDAY
        document.getElementById('id').value = data.PERSONAL_PERSONAL_ID
        document.getElementById('datepicker1').value = data.PERSONAL_CARD_ISSUED
        document.getElementById('datepicker2').value = data.PERSONAL_CARD_EXPIRE === undefined ? '00-00-0000' : data.PERSONAL_CARD_EXPIRE
        document.getElementById('phone').value = data.PERSONAL_PHONE
        document.getElementById('fax').value = data.PERSONAL_FAX === undefined || data.PERSONAL_FAX === '' ? '-' : data.PERSONAL_FAX
        document.getElementById('last-update').value = data.PERSONAL_UPDATE

        if (data.image != undefined) {
            console.log(data.image)
            let img = document.getElementById('operatorImage')
            if (data.image.IMAGE_TYPE != null) {
                img.src = `data:image/${data.image.IMAGE_TYPE};base64,` + data.image.IMAGE_DATA
            } else {
                img.src = `../../img/userProfile.png`
            }

            inImage.type = data.image.IMAGE_TYPE
            inImage.data = data.image.IMAGE_DATA
        }
    } else {

    }


}
function preInsert() {
    if (document.getElementById('id').value.trim() != '' && document.getElementById('id').value.trim().length === 13) {
        if (_isUsed === false) {

            if (document.getElementById("typeUser").value === 'บุคคลธรรมดา') {
                //address
                inAddress.home_number = document.getElementById('homeId').value
                inAddress.moo = document.getElementById('moo').value
                inAddress.trxk = document.getElementById('trxk').value
                inAddress.sxy = document.getElementById('sxy').value
                inAddress.building = document.getElementById('building').value
                inAddress.road = document.getElementById('road').value

                let provinceValue = parseInt(document.getElementById(`province`).value);
                let amphurValue = parseInt(document.getElementById(`district`).value);
                let districtValue = parseInt(
                    document.getElementById(`subdistrict`).value
                );
                inAddress.district_name = district[districtValue - 1].DISTRICT_NAME;
                inAddress.amphur_name = amphur[amphurValue - 1].AMPHUR_NAME;
                inAddress.province_name = province[provinceValue - 1].PROVINCE_NAME;
                //prsonal
                inPeronal.title = document.getElementById("title").value;
                inPeronal.type = document.getElementById("typeUser").value;
                inPeronal.name = document.getElementById("nameUser").value;
                inPeronal.surname = document.getElementById("surnameUser").value;
                inPeronal.nationality = document.getElementById("nationality").value;
                inPeronal.race = document.getElementById("race").value;
                inPeronal.birthday = document.getElementById("datepicker3").value;
                inPeronal.personal_id = document.getElementById("id").value;
                inPeronal.card_issued = document.getElementById("datepicker1").value;
                inPeronal.card_expipe = document.getElementById("datepicker2").value;

                inPeronal.phone = document.getElementById("phone").value;
                inPeronal.fax = document.getElementById("fax").value;
                arrInsert.push(inPeronal);
                arrInsert.push(inAddress);
                arrInsert.push(inImage);

                console.log(arrInsert);
                console.log(fileImage);
                return true;
            } else {
                // นิติบุคคล

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
        return false;
    }
}
function duplicateId(personalId) {
    _isIdCheckPersonal = personalId;
    return new Promise((resolve, reject) => {
        axios
            .get("http://localhost:5000/get/personalId/" + personalId)
            .then(data => {
                return resolve(data.data);
            });
    });
}
function checkId(value) {
    if (value.length != 13) {
        _isCheckPersonalId = false;
    }
    if (value.length === 13) {
        if (_isIdCheckPersonal != value) {
            duplicateId(value).then(data => {
                console.log(data);
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
                    _isUsed = false;
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
                }
            });
        }
    } else {
        return false;
    }
}

function resetInputUI() {
    if (document.getElementById('typeUser').value != "นิติบุคคล") {
        document.getElementById("perTy2").style.display = "none";
        document.getElementById("perTy1").style.display = "";
        document.getElementById("imgText").style.display = "";
        document.getElementById("operatorImage").src = "../../img/userProfile.png";
        document.getElementById("imgButton").style.display = "";
        document.getElementById('typeUser').value = 'บุคคลธรรมดา'
    }

}
function uploadImage(event) {
    var cancelButton = document.getElementById("cancelImage");
    var target = event.target || event.srcElement;
    var imagefile = document.querySelector("#uploadFile");
    var file = document
        .getElementById("uploadFile")
        .value.split("\\")
        .pop()
        .split(".");
    fileImage = imagefile.files[0];
    let typeImg = file[1];
    inImage.type = typeImg;
    if (target.value.length == 0) {
        console.log("Suspect Cancel was hit, no files selected.");
        if (0 == target.files.length) {
            console.log("im delete image");
            cancelButton.onclick();
        }
    } else {
        var selectedFile = event.target.files[0];
        var reader = new FileReader();
        var img = document.getElementById("operatorImage");
        reader.onload = function (event) {
            img.src = event.target.result;
            img.alt = "operator";
            // img.width = 100%;
            // img.height = auto
        };
        reader.readAsDataURL(selectedFile);
    }
}
function deleteImageOne() {
    fileImage = null;
    inImage.type = null;
    document.getElementById("uploadFile").value = "";
    var img = document.getElementById("operatorImage");
    img.src = "../../img/userProfile.png";
}
function buttonImage() {
    document.getElementById("uploadFile").click();
}
function insertToDatabase() {
    return new Promise((resolve, reject) => {
        console.log("insertToDatabase");
        var formData = new FormData();
        formData.append("image", fileImage);
        formData.append("personal", JSON.stringify(arrInsert));
        axios
            .post("http://localhost:5000/insert/personal", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(data => {
                return resolve(data.data);
            });
    });
}
// value  ของที่อยู่มันจะเท่ากับ value - 1 index ของ array address
/*
let provinceValue = parseInt(document.getElementById(`province`).value)
    let amphurValue = parseInt(document.getElementById(`district`).value)
    let districtValue = parseInt(document.getElementById(`subdistrict`).value)
*/

function changeOption(value) {
    console.log(value === "นิติบุคคล");
    if (value === "นิติบุคคล") {
        document.getElementById("perTy2").style.display = "";
        document.getElementById("perTy1").style.display = "none";
        document.getElementById("operatorImage").src = "../../img/town.png";
        document.getElementById("imgText").style.display = "none";
        document.getElementById("imgButton").style.display = "none";
    } else {
        document.getElementById("perTy2").style.display = "none";
        document.getElementById("perTy1").style.display = "";
        document.getElementById("imgText").style.display = "";
        document.getElementById("operatorImage").src = "../../img/userProfile.png";
        document.getElementById("imgButton").style.display = "";
    }
}
