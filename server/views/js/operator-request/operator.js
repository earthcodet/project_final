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
function changeOption(value) {
    if (value === "นิติบุคคล") {
        document.getElementById("perTy2").style.display = "";
        document.getElementById("perTy1").style.display = "none";
        document.getElementById("operatorImage").src = "../../img/town.png";
        document.getElementById("imgText").style.display = "none";
        document.getElementById("imgButton").style.display = "none";
        document.getElementById('typeUser').value = `นิติบุคคล`
    } else {
        document.getElementById("perTy2").style.display = "none";
        document.getElementById("perTy1").style.display = "";
        document.getElementById("imgText").style.display = "";
        document.getElementById("operatorImage").src = "../../img/userProfile.png";
        document.getElementById("imgButton").style.display = "";

    }
}


  

