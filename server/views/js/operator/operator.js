let _isUsed = false;
let _isIdCheckPersonal = "";
let arrInsert = [];
let fileImage = null;
let _isImageChange = false
let newAdd = false
let base64ImageSelect = ''
let imageSelectype = ''
let textChange = ''
let iconAlert = ''
let inAddress = {
    id: "",
    home_number: "-",
    moo: '',
    trxk: '',
    sxy: '',
    building: '',
    road: '',
    district_name: "",
    amphur_name: "",
    province_name: ""
};

let inPersonal = {
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
    inPersonal = {
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
        home_number: "-",
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
    iconAlert = ''
    textChange = ''
    console.log('run setDataUI')
    console.log(data)
    console.log(data.PERSONAL_TYPE === 'บุคคลธรรมดา')
    inAddress.id = data.AID.ADDRESS_ID
    inPersonal.id = data.PERSONAL_ID

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
        document.getElementById('sxy').value = data.AID.ADDRESS_SXY === undefined || data.AID.ADDRESS_SXY === null ? '' : data.AID.ADDRESS_SXY
        document.getElementById('building').value = data.AID.ADDRESS_BUILDING === undefined || data.AID.ADDRESS_BUILDING === null ? '' : data.AID.ADDRESS_BUILDING
        document.getElementById('road').value = data.AID.ADDRESS_ROAD === undefined || data.AID.ADDRESS_ROAD === null ? '' : data.AID.ADDRESS_ROAD
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
        document.getElementById('title').value = data.PERSONAL_TITLE === undefined || data.PERSONAL_TITLE === null ? '' : data.PERSONAL_TITLE
        document.getElementById('nameUser').value = data.PERSONAL_NAME
        document.getElementById('surnameUser').value = data.PERSONAL_SURNAME === undefined || data.PERSONAL_SURNAME === null ? '' : data.PERSONAL_SURNAME
        document.getElementById('nationality').value = data.PERSONAL_NATIONALITY === undefined || data.PERSONAL_NATIONALITY === null ? '' : data.PERSONAL_NATIONALITY
        document.getElementById('race').value = data.PERSONAL_RACE === undefined || data.PERSONAL_RACE === null ? '' : data.PERSONAL_RACE
        document.getElementById('datepicker3').value = data.PERSONAL_BIRTHDAY === undefined || data.PERSONAL_BIRTHDAY === null ? '' : data.PERSONAL_BIRTHDAY
        document.getElementById('id').value = data.PERSONAL_PERSONAL_ID
        document.getElementById('datepicker1').value = data.PERSONAL_CARD_ISSUED
        document.getElementById('datepicker2').value = data.PERSONAL_CARD_EXPIRE === undefined || data.PERSONAL_CARD_EXPIRE === null ? '' : data.PERSONAL_CARD_EXPIRE
        document.getElementById('phone').value = data.PERSONAL_PHONE
        document.getElementById('fax').value = data.PERSONAL_FAX === undefined || data.PERSONAL_FAX === null ? '' : data.PERSONAL_FAX
        document.getElementById('last-update').value = data.PERSONAL_UPDATE

        if (data.image != undefined) {
            console.log(data.image)
            let img = document.getElementById('operatorImage')
            if (data.image.IMAGE_DATA != null && data.image.IMAGE_DATA != undefined) {
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
function inputRequired() {
    let type_user = document.getElementById('typeUser').value
    if (type_user === 'บุคคลธรรมดา') {
        let checkno1 = document.getElementById('nameUser').value.trim().length === 0
        let checkno2 = document.getElementById('surnameUser').value.trim().length === 0
        let checkno3 = document.getElementById('datepicker2').value.trim().length === 0
        let checkno4 = document.getElementById('datepicker1').value.trim().length === 0
        let checkno5 = document.getElementById('id').value.trim().length === 0
        let checkno6 = document.getElementById('datepicker3').value.trim().length === 0
        let checkno7 = document.getElementById('phone').value.trim().length === 0
        if (checkno1) {
            document.getElementById('nameUser').classList.add('alertInput')
        }
        if (checkno2) {
            document.getElementById('surnameUser').classList.add('alertInput')
        }
        if (checkno3) {
            document.getElementById('datepicker2').classList.add('alertInput')
        }
        if (checkno4) {
            document.getElementById('datepicker1').classList.add('alertInput')
        }
        if (checkno5) {
            document.getElementById('id').classList.add('alertInput')
        }
        if (checkno6) {
            document.getElementById('datepicker3').classList.add('alertInput')
        }
        if (checkno7) {
            document.getElementById('phone').classList.add('alertInput')
        }
        if (checkno1 || checkno2 || checkno3 || checkno4 || checkno5 || checkno6 || checkno7) {
            return false
        } else {
            return true
        }
    } else {
        let checkno1e = document.getElementById('company-nameUser').value.trim().length === 0
        let checkno2e = document.getElementById('company-id').value.trim().length === 0
        let checkno3e = document.getElementById('datepicker4').value.trim().length === 0
        let checkno4e = document.getElementById('company-phone').value.trim().length === 0
        if (checkno1e) {
            document.getElementById('company-nameUser').classList.add('alertInput')
        }
        if (checkno2e) {
            document.getElementById('company-id').classList.add('alertInput')
        }
        if (checkno3e) {
            document.getElementById('datepicker4').classList.add('alertInput')
        }
        if (checkno4e) {
            document.getElementById('company-phone').classList.add('alertInput')
        }
        if (checkno1e || checkno2e || checkno3e || checkno4e) {
            return false
        } else {
            return true
        }
    }
}
function resetInputRequired() {
    document.getElementById('nameUser').classList.remove('alertInput')
    document.getElementById('surnameUser').classList.remove('alertInput')
    document.getElementById('datepicker2').classList.remove('alertInput')
    document.getElementById('datepicker1').classList.remove('alertInput')
    document.getElementById('id').classList.remove('alertInput')
    document.getElementById('datepicker3').classList.remove('alertInput')
    document.getElementById('phone').classList.remove('alertInput')
    document.getElementById('company-nameUser').classList.remove('alertInput')
    document.getElementById('company-id').classList.remove('alertInput')
    document.getElementById('datepicker4').classList.remove('alertInput')
    document.getElementById('company-phone').classList.remove('alertInput')
}
function preInsert() {
    resetInputRequired()
    let check_id_user = document.getElementById('id').value
    let type_user = document.getElementById("typeUser").value
    let check_id_company = document.getElementById('company-id').value
    let check_input = inputRequired()
    if (check_input) {
        if (check_id_user.trim().length === 13 && type_user === 'บุคคลธรรมดา' || check_id_company.trim().length === 13 && type_user === 'นิติบุคคล') {
            if (!_isUsed) {
                if (formatPhone(document.getElementById('phone').value.trim()) || formatPhone(document.getElementById('company-phone').value.trim())) {
                    if (document.getElementById("typeUser").value === 'บุคคลธรรมดา') {
                        //address
                        console.log(`preinsert บุคคลธรรมดา`)
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
                        inPersonal.title = document.getElementById("title").value;
                        inPersonal.type = document.getElementById("typeUser").value;
                        inPersonal.name = document.getElementById("nameUser").value;
                        inPersonal.surname = document.getElementById("surnameUser").value;
                        inPersonal.nationality = document.getElementById("nationality").value;
                        inPersonal.race = document.getElementById("race").value;
                        inPersonal.birthday = document.getElementById("datepicker3").value;
                        inPersonal.personal_id = document.getElementById("id").value;
                        inPersonal.card_issued = document.getElementById("datepicker1").value;
                        inPersonal.card_expipe = document.getElementById("datepicker2").value;

                        inPersonal.phone = document.getElementById("phone").value;
                        inPersonal.fax = document.getElementById("fax").value;
                        arrInsert.push(inPersonal);
                        arrInsert.push(inAddress);
                        console.log(`_isImageChange ${_isImageChange} === false (${_isImageChange === false}) 
                        && newAdd ${newAdd} === false (${newAdd === false})`)
                        if (_isImageChange === false && newAdd === false) {
                            inImage.name = 'NO_UPlOAD'
                            arrInsert.push(inImage);
                        } else {
                            arrInsert.push(inImage);
                        }

                        console.log(arrInsert);
                        console.log(fileImage);
                        return true;
                    } else {
                        console.log(`preinsert นิติบุคคล`)
                        // นิติบุคคล
                        let ch  = document.getElementById('company-homeId')
                        inAddress.home_number = ch.value === null ||  ch.value.trim().length === 0 || ch.value === undefined ? '-' : ch.value
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
                        inPersonal.type = document.getElementById("typeUser").value;
                        inPersonal.surname = ''
                        inPersonal.name = document.getElementById("company-nameUser").value;
                        inPersonal.personal_id = document.getElementById("company-id").value;
                        inPersonal.card_issued = document.getElementById("datepicker4").value;

                        inPersonal.phone = document.getElementById("company-phone").value;
                        inPersonal.fax = document.getElementById("company-fax").value;
                        inImage.name = 'NO_UPlOAD'
                        arrInsert.push(inPersonal);
                        arrInsert.push(inAddress);
                        arrInsert.push(inImage);
                        return true
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
                    document.getElementById('company-phone').classList.add('alertInput')
                    document.getElementById('phone').classList.add('alertInput')
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
                document.getElementById('id').classList.add('alertInput')
                document.getElementById('company-id').classList.add('alertInput')
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
            document.getElementById('id').classList.add('alertInput')
            document.getElementById('company-id').classList.add('alertInput')
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
function checkId(value, type) {
    if (value.length != 13) {
        _isCheckPersonalId = false;
    }
    if (value.length === 13) {
        if (type === 'PERSONAL') {
            console.log(`Tid =`+_isIdCheckPersonal)
            console.log(`Qid =`+value)
            if (_isIdCheckPersonal != value) {
                let tcp = value.split('')
                console.log(tcp)
                let sum_no1 = (parseInt(tcp[0]) * 13) + (parseInt(tcp[1]) * 12) + (parseInt(tcp[2]) * 11) + (parseInt(tcp[3]) * 10)
                sum_no1 = sum_no1 + (parseInt(tcp[4]) * 9) + (parseInt(tcp[5]) * 8) + (parseInt(tcp[6]) * 7) + (parseInt(tcp[7]) * 6)
                sum_no1 = sum_no1 + (parseInt(tcp[8]) * 5) + (parseInt(tcp[9]) * 4) + (parseInt(tcp[10]) * 3) + (parseInt(tcp[11]) * 2)
                sum_no1 = sum_no1 % 11
                console.log(sum_no1)
                let sum_no2 = (11 - sum_no1) % 10
                let checkIdIndex13 = parseInt(tcp[12]) === sum_no2
                console.log(`parseInt(tcp[12])`+parseInt(tcp[12]))
                console.log(`sum_no2`+sum_no1)
                _isIdCheckPersonal = value
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
                            _isCheckPersonalId = value
                            _isUsed = false;
                            textChange = 'เลขประจำตัวผู้ประกอบการนี้สามารถใช้ได้'
                            iconAlert = 'success'

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
                            iconAlert = 'error'
                            textChange = 'เลขประจำตัวผู้ประกอบการนี้มีในระบบแล้ว'
                            document.getElementById('id').classList.add('alertInput')
                            document.getElementById('company-id').classList.add('alertInput')
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
                    iconAlert = 'error'
                    textChange = 'หมายเลขประจำตัวประชาชนไม่ถูกต้อง'
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
                console.log(`personal id not change`)
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
                        _isCheckPersonalId = value
                        _isUsed = false;
                        iconAlert = 'success'
                        textChange = 'เลขประจำตัวผู้ประกอบการนี้สามารถใช้ได้'

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
                        iconAlert = 'error'
                        textChange = 'เลขประจำตัวผู้ประกอบการนี้มีในระบบแล้ว'
                        document.getElementById('id').classList.add('alertInput')
                        document.getElementById('company-id').classList.add('alertInput')
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
                console.log(`personal id not change`)
            }
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
    imageSelectype = typeImg
    var selectedFile = event.target.files[0];
    var reader = new FileReader();
    var img = document.getElementById("operatorImage");

    reader.onload = function (event) {
        img.src = event.target.result;
        img.alt = "operator";
        var BASE64_MARKER = ';base64,';
        var base64Index = event.target.result.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
        var base64 = event.target.result.substring(base64Index);
        base64ImageSelect = base64
        console.log(base64ImageSelect)
    };
    reader.readAsDataURL(selectedFile);

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
        console.log(arrInsert)
        axios.post("http://localhost:5000/insert/personal", formData, {
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
    resetInputRequired()
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