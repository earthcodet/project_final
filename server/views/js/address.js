let province = [];
let amphur = [];
let district = [];

// สำหรับ จ/อ/ต ช่องที่หนึ่ง
let addressProvice = [];
let addressAmphur = [];
let addressDistrict = [];

//สำหรับเก็บจังหวัดที่เลือกไว้
var aProviceId = 1
var wProviceId = 1;

function getProvice() {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/get/provice/').then((result) => {
            resolve(result.data);
            for (let i = 0; i < result.data.length; i++) {
                result.data[i].PROVINCE_NAME = result.data[i].PROVINCE_NAME.trim()
                province.push(result.data[i])
            }
            resolve(result.data);
        })
    })
}
function getAmphur() {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/get/amphur/').then((result) => {
            resolve(result.data);
            for (let i = 0; i < result.data.length; i++) {
                result.data[i].AMPHUR_NAME = result.data[i].AMPHUR_NAME.trim()
                amphur.push(result.data[i])
            }
            resolve(result.data);
        })
    })
}
function getDistrict() {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/get/district/').then((result) => {
            for (let i = 0; i < result.data.length; i++) {
                result.data[i].DISTRICT_NAME = result.data[i].DISTRICT_NAME.trim()
                district.push(result.data[i])
            }
            resolve(result.data);
        })
    })
}

function removeAlloption(id) {
    var select = document.getElementById(id);
    var length = select.options.length;
    for (i = 0, c = 0; i < length; i++) {
        select.options[c] = null;
    }
}

//Address
function districtSelect(amphurId) {
    addressDistrict =[]

    for(let i = 0 ; i< district.length ; i++){
        if(district[i].AMPHUR_ID == amphurId && district[i].PROVINCE_ID == document.getElementById('province').value){
            addressDistrict.push(district[i])
        }
    }
    removeAlloption('subdistrict')
    for (let i = 0; i < addressDistrict.length; i++) {
        var select = document.getElementById("subdistrict");
        var option = document.createElement("option");
        option.text = addressDistrict[i].DISTRICT_NAME.trim();
        option.value = addressDistrict[i].DISTRICT_ID;
        select.add(option);
    }
   
}
function amphurSelect(proviceId) {
    addressAmphur =[]
    aProviceId = proviceId
    for(let i = 0 ; i< amphur.length ; i++){
        if(amphur[i].PROVINCE_ID == proviceId){
            addressAmphur.push(amphur[i])
        }
    }
    removeAlloption('district')
    for (let i = 0; i < addressAmphur.length; i++) {
        var select = document.getElementById("district");
        var option = document.createElement("option");
        option.text = addressAmphur[i].AMPHUR_NAME.trim();
        option.value = addressAmphur[i].AMPHUR_ID;
        select.onchange = function () { districtSelect(document.getElementById('district').value) };
        select.add(option);
    }
   
}
function chageProvice(proviceId){
    amphurSelect(proviceId)
    districtSelect(addressAmphur[0].AMPHUR_ID)
}
function createSelectProvice(data) {
    for (let i = 0; i < data.length; i++) {
        var select = document.getElementById("province");
        var option = document.createElement("option");
        option.text = data[i].PROVINCE_NAME.trim();
        option.value = data[i].PROVINCE_ID;
        select.onchange = function () { chageProvice(document.getElementById('province').value) };
        select.add(option);
    }
}
function runForm() {
    getProvice().then((data) => {
        createSelectProvice(data)
         getAmphur().then((data) =>{
           amphurSelect(1)
            getDistrict().then((districtTemp) =>{
                districtSelect(addressAmphur[0].AMPHUR_ID)
            })
        })
    })
}

function getProviceName(proviceId){
    for(let i = 0 ; i < province.length ; i++){
        if(province[i].PROVINCE_ID == proviceId){
            return province[i].PROVINCE_NAME
        }
    }
}

function getAmphurName(amphurId){
    for(let i = 0 ; i < amphur.length ; i++){
        if(amphur[i].AMPHUR_ID == amphurId){
            return amphur[i].AMPHUR_NAME
        }
    }
}

function getProviceIdByName(Name) {
    for (let i = 0; i < province.length; i++) {
        if (province[i].PROVINCE_NAME === Name)
            return province[i].PROVINCE_ID
    }
}

function getAmphureIdByName(Name) {
    for (let i = 0; i < amphur.length; i++) {

        if (addressAmphur[i].AMPHUR_NAME === Name)
            return addressAmphur[i].AMPHUR_ID
    }
}

function getDistrictIdByName(Name) {
    for (let i = 0; i < district.length; i++) {
        if (addressDistrict[i].DISTRICT_NAME === Name)
            return addressDistrict[i].DISTRICT_ID
    }
}

runForm()