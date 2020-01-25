let _isUsed = false;
let _isIdCheckPersonal = "";
let arrInsert = [];
let fileImage = null;
let _isImageChange = false
let inAddress = {
    id: "",
    home_number: "",
    moo: '',
    trxk: '',
    sxy: '',
    building: '',
    road: '',
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
    nationality: '',
    race: '',
    birthday: '',
    personal_id: "",
    card_issued: "",
    card_expipe: '',
    phone: "",
    fax: ''
};

let inImage = {
    type: null,
    data: null
};

function resetParameter() {
    arrInsert = [];
    inPeronal = {
        id: "",
        address_id: "",
        title: "",
        type: "",
        name: "",
        surname: "",
        nationality: '',
        race: '',
        birthday: '',
        personal_id: "",
        card_issued: "",
        card_expipe: '',
        phone: "",
        fax: ''
    };
    inAddress = {
        id: "",
        home_number: "",
        moo: '',
        trxk: '',
        sxy: '',
        building: '',
        road: '',
        district_name: "",
        amphur_name: "",
        province_name: ""
    };
}
function setDataUI(data) {
    console.log('run setDataUI')
    console.log(data)
    console.log(data.PERSONAL_TYPE === 'บุคคลธรรมดา')
    inAddress.id = data.AID.ADDRESS_ID
    inPeronal.id = data.PERSONAL_ID
    document.getElementById('company-id').disabled = true
    document.getElementById('id').disabled = true
    document.getElementById('typeUser').value = data.PERSONAL_TYPE
    document.getElementById('typeUser').disabled = true
    console.log(data.PERSONAL_TYPE)
    if (data.PERSONAL_TYPE === 'บุคคลธรรมดา') {
        //address
        document.getElementById('homeId').value = data.AID.ADDRESS_HOME_NUMBER
        document.getElementById('moo').value = data.AID.ADDRESS_MOO === undefined || data.AID.ADDRESS_MOO === null ? '' : data.AID.ADDRESS_MOO
        document.getElementById('trxk').value = data.AID.ADDRESS_TRXK === undefined || data.AID.ADDRESS_TRXK === null ? '' : data.AID.ADDRESS_TRXK
        document.getElementById('sxy').value = data.AID.ADDRESS_SXY === undefined || data.AID.ADDRESS_SXY ===null  ? '' : data.AID.ADDRESS_SXY
        document.getElementById('building').value = data.AID.ADDRESS_BUILDING === undefined || data.AID.ADDRESS_BUILDING ===null ? '' : data.AID.ADDRESS_BUILDING
        document.getElementById('road').value = data.AID.ADDRESS_ROAD === undefined || data.AID.ADDRESS_ROAD ===  null ? '' : data.AID.ADDRESS_ROAD
        //ค่าที่ส่งกลับมาอาจเป็น text ต้องการที่เป็น int
        //get id by name [ตั้งตัวแปรเพราะจะทำให้โปรแกรมไม่ต้อง loop เยอะๆ]
        let provinceId = parseInt(getProviceIdByName(data.AID.PROVINCE_NAME))
        let amphurId = parseInt(getAmphureIdByName(data.AID.AMPHUR_NAME, provinceId))
        let districtId = parseInt(getDistrictIdByName(data.AID.DISTRICT_NAME, amphurId))

        //แสดงค่าจังหวัดที่มาจาก ฐานข้อมูล (จังหวัด) ตาม id
        document.getElementById(`province`).value = provinceId

        //ตั้งค่ารายชื่อ อำเภอ, ตำบล ตามจังหวัดที่เลือกลงให้ list input ตาม id
        amphurSelect(parseInt(provinceId)) // list อำเภอทั้งหมดตาม province Id
        districtSelect(parseInt(amphurId)) // list ตำบลทั้งหมดตาม ampur_Id

        //แสดงค่าจังหวัดที่มาจาก ฐานข้อมูล (อำเภอ , ตำบล) ตาม id
        document.getElementById(`district`).value = amphurId
        document.getElementById(`subdistrict`).value = districtId

        //prsonal 
        document.getElementById('title').value = data.PERSONAL_TITLE === undefined  || data.PERSONAL_TITLE === null ? '' : data.PERSONAL_TITLE
        document.getElementById('nameUser').value = data.PERSONAL_NAME
        document.getElementById('surnameUser').value = data.PERSONAL_SURNAME === undefined || data.PERSONAL_SURNAME ===null ? '' : data.PERSONAL_SURNAME
        document.getElementById('nationality').value = data.PERSONAL_NATIONALITY === undefined || data.PERSONAL_NATIONALITY === null ? '' : data.PERSONAL_NATIONALITY
        document.getElementById('race').value = data.PERSONAL_RACE === undefined || data.PERSONAL_RACE === null ? '' : data.PERSONAL_RACE
        document.getElementById('datepicker3').value = data.PERSONAL_BIRTHDAY === undefined || data.PERSONAL_BIRTHDAY ===  null ? '' : data.PERSONAL_BIRTHDAY
        document.getElementById('id').value = data.PERSONAL_PERSONAL_ID
        document.getElementById('datepicker1').value = data.PERSONAL_CARD_ISSUED
        document.getElementById('datepicker2').value = data.PERSONAL_CARD_EXPIRE === undefined || data.PERSONAL_CARD_EXPIRE === null ? '' : data.PERSONAL_CARD_EXPIRE
        document.getElementById('phone').value = data.PERSONAL_PHONE
        document.getElementById('fax').value = data.PERSONAL_FAX === undefined || data.PERSONAL_FAX === null ? '' : data.PERSONAL_FAX
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
        inImage.name = 'NO_UPlOAD'
        document.getElementById('company-nameUser').value = data.PERSONAL_NAME
        document.getElementById('company-id').value = data.PERSONAL_PERSONAL_ID
        document.getElementById('datepicker4').value = data.PERSONAL_CARD_ISSUED
        document.getElementById('company-phone').value = data.PERSONAL_PHONE
        document.getElementById('company-fax').value = data.PERSONAL_FAX === undefined || data.PERSONAL_FAX === null ? '' : data.PERSONAL_FAX

        document.getElementById('company-homeId').value = data.AID.ADDRESS_HOME_NUMBER
        document.getElementById('company-moo').value = data.AID.ADDRESS_MOO === undefined || data.AID.ADDRESS_MOO === null ? '' : data.AID.ADDRESS_MOO
        document.getElementById('company-trxk').value = data.AID.ADDRESS_TRXK === undefined || data.AID.ADDRESS_TRXK === null ? '' : data.AID.ADDRESS_TRXK
        document.getElementById('company-sxy').value = data.AID.ADDRESS_SXY === undefined || data.AID.ADDRESS_SXY === null ? '' : data.AID.ADDRESS_SXY
        document.getElementById('company-building').value = data.AID.ADDRESS_BUILDING === undefined || data.AID.ADDRESS_BUILDING === null ? '' : data.AID.ADDRESS_BUILDING
        document.getElementById('company-road').value = data.AID.ADDRESS_ROAD === undefined || data.AID.ADDRESS_ROAD === null ? '' : data.AID.ADDRESS_ROAD
        //ค่าที่ส่งกลับมาอาจเป็น text ต้องการที่เป็น int
        //get id by name [ตั้งตัวแปรเพราะจะทำให้โปรแกรมไม่ต้อง loop เยอะๆ]
        let provinceId = parseInt(getProviceIdByName(data.AID.PROVINCE_NAME))
        let amphurId = parseInt(getAmphureIdByName(data.AID.AMPHUR_NAME, provinceId))
        let districtId = parseInt(getDistrictIdByName(data.AID.DISTRICT_NAME, amphurId))

        //แสดงค่าจังหวัดที่มาจาก ฐานข้อมูล (จังหวัด) ตาม id
        document.getElementById(`wProvince`).value = provinceId

        //ตั้งค่ารายชื่อ อำเภอ, ตำบล ตามจังหวัดที่เลือกลงให้ list input ตาม id
        wamphurSelect(parseInt(provinceId)) // list อำเภอทั้งหมดตาม province Id
        wdistrictSelect(parseInt(amphurId)) // list ตำบลทั้งหมดตาม ampur_Id

        //แสดงค่าจังหวัดที่มาจาก ฐานข้อมูล (อำเภอ , ตำบล) ตาม id
        document.getElementById(`wDistrict`).value = amphurId
        document.getElementById(`wSubdistrict`).value = districtId

        document.getElementById('company-last-update').value = data.PERSONAL_UPDATE

    }


}
function preInsert() {
    let check_id_user = document.getElementById('id').value
    let type_user = document.getElementById("typeUser").value
    let check_id_company = document.getElementById('company-id').value
    // console.log(`_isUsed = ${_isUsed}`)
    // console.log(`check no 1 : ${check_id_user.trim().length === 13} and ${type_user === 'บุคคลธรรมดา'}  = ${check_id_user.trim().length === 13 && type_user === 'บุคคลธรรมดา'}`)
    // console.log(`check no 2 : ${check_id_company.trim().length === 13} and ${type_user === 'นิติบุคคล'}  = ${check_id_company.trim().length === 13 && type_user === 'นิติบุคคล'}`)
    if (check_id_user.trim().length === 13 && type_user === 'บุคคลธรรมดา' || check_id_company.trim().length === 13 && type_user === 'นิติบุคคล') {
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
                //personal
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
                if(_isImageChange === false){
                    inImage.name = 'NO_UPlOAD'
                    arrInsert.push(inImage);
                }else{
                    arrInsert.push(inImage);
                }

                console.log(arrInsert);
                console.log(fileImage);
                return true;
            } else {
                // นิติบุคคล
                inAddress.home_number = document.getElementById('company-homeId').value
                inAddress.moo = document.getElementById('company-moo').value
                inAddress.trxk = document.getElementById('company-trxk').value
                inAddress.sxy = document.getElementById('company-sxy').value
                inAddress.building = document.getElementById('company-building').value
                inAddress.road = document.getElementById('company-road').value

                let provinceValue = parseInt(document.getElementById(`wProvince`).value);
                let amphurValue = parseInt(document.getElementById(`wDistrict`).value);
                let districtValue = parseInt(document.getElementById(`wSubdistrict`).value);
                inAddress.district_name = district[districtValue - 1].DISTRICT_NAME;
                inAddress.amphur_name = amphur[amphurValue - 1].AMPHUR_NAME;
                inAddress.province_name = province[provinceValue - 1].PROVINCE_NAME;
                //personal
                inPeronal.type = document.getElementById("typeUser").value;
                inPeronal.name = document.getElementById("company-nameUser").value;
                inPeronal.personal_id = document.getElementById("company-id").value;
                inPeronal.card_issued = document.getElementById("datepicker4").value;

                inPeronal.phone = document.getElementById("company-phone").value;
                inPeronal.fax = document.getElementById("company-fax").value;
                inImage.name = 'NO_UPlOAD'
                arrInsert.push(inPeronal);
                arrInsert.push(inAddress);
                arrInsert.push(inImage);
                return true
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
    // console.log(`value = ${value} and value.length = ${value.length} and _isCheckPersonalId = ${_isIdCheckPersonal}`)
    if (value.length === 13) {
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
                    _isCheckPersonalId = value
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
                console.log(_isUsed);
            });
        } else {
            console.log(`personal id not change`)
        }
    } else {
        return false;
    }
}

function resetInputUI() {
    if (document.getElementById('typeUser').value === "นิติบุคคล") {
        changeOption("บุคคลธรรมดา")
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
    _isImageChange = true
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
    _isImageChange = true
    inImage.data = null
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

function changeOption(value) {
    _isIdCheckPersonal = false
    _isUsed = false

    if (value === "นิติบุคคล") {
        document.getElementById("perTy2").style.display = "";
        document.getElementById("perTy1").style.display = "none";
        document.getElementById("operatorImage").src = "../../img/town.png";
        document.getElementById("imgText").style.display = "none";
        document.getElementById("imgButton").style.display = "none";
        resetFunction()
        fileImage = null
        document.getElementById('typeUser').value = `นิติบุคคล`
    } else {
        document.getElementById("perTy2").style.display = "none";
        document.getElementById("perTy1").style.display = "";
        document.getElementById("imgText").style.display = "";
        document.getElementById("operatorImage").src = "../../img/userProfile.png";
        document.getElementById("imgButton").style.display = "";
        resetFunction()

    }
}
