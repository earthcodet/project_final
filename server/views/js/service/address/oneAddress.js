//list จังหวัดทั้งหมด
let province = [];
let amphur = [];
let district = [];

// สำหรับ จ/อ/ต ช่องที่หนึ่ง
let addressProvice = [];
let addressAmphur = [];
let addressDistrict = [];

var aProviceId = 1;
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
    addressDistrict = []

    for (let i = 0; i < district.length; i++) {
        if (district[i].AMPHUR_ID == amphurId && district[i].PROVINCE_ID == aProviceId) {
            addressDistrict.push(district[i])
        }
    }
    removeAlloption('subdistrict')
    for (let i = 0; i < addressDistrict.length; i++) {
        var select = document.getElementById("subdistrict");
        var option = document.createElement("option");
        option.text = addressDistrict[i].DISTRICT_NAME;
        option.value = addressDistrict[i].DISTRICT_ID;
        select.add(option);
    }

}
function amphurSelect(proviceId) {
    addressAmphur = []
    aProviceId = proviceId
    for (let i = 0; i < amphur.length; i++) {
        if (amphur[i].PROVINCE_ID == proviceId) {
            addressAmphur.push(amphur[i])
        }
    }
    removeAlloption('district')
    for (let i = 0; i < addressAmphur.length; i++) {
        var select = document.getElementById("district");
        var option = document.createElement("option");
        option.text = addressAmphur[i].AMPHUR_NAME;
        option.value = addressAmphur[i].AMPHUR_ID;
        select.onchange = function () { districtSelect(select.value) };
        select.add(option);
    }

}
function chageProvice(proviceId) {
    amphurSelect(proviceId)
    districtSelect(addressAmphur[0].AMPHUR_ID)
}
function createSelectProvice(data) {
    for (let i = 0; i < data.length; i++) {
        var select = document.getElementById("province");
        var option = document.createElement("option");
        option.text = data[i].PROVINCE_NAME;
        option.value = data[i].PROVINCE_ID;

        select.onchange = function () { chageProvice(select.value) };
        select.add(option);
    }
}


//ฟังชันเริ่มต้น
function runForm() {
    return new Promise((resolve, reject) => {
        getProvice().then((data) => {
            createSelectProvice(data)
            getAmphur().then((data) => {
                amphurSelect(1)
                getDistrict().then((districtTemp) => {
                    districtSelect(addressAmphur[0].AMPHUR_ID)
                    return resolve(true)
                })
            })
        })
    })
}


function newAddress() {
    createSelectProvice(province)
    amphurSelect(1)
    districtSelect(addressAmphur[0].AMPHUR_ID)
}
function getProviceIdByName(province_name) {
    for (let i = 0; i < province.length; i++) {
        if (province[i].PROVINCE_NAME === province_name)
            return province[i].PROVINCE_ID
    }
}

function getAmphureIdByName(amphur_name, province_id) {
    // console.log(amphur)
    console.log(`A -> amphur_name = ${amphur_name} and provine_id = ${province_id}`)
    for (let i = 0; i < amphur.length; i++) {
        if (amphur[i].AMPHUR_NAME === amphur_name && amphur[i].PROVINCE_ID === province_id)
            return amphur[i].AMPHUR_ID
    }
}

function getDistrictIdByName(district_name, amphur_id) {
    console.log(`D -> district_name = ${district_name} and amphur_id = ${amphur_id}`)
    for (let i = 0; i < district.length; i++) {
        if (district[i].DISTRICT_NAME === district_name && district[i].AMPHUR_ID === amphur_id) {
            return district[i].DISTRICT_ID
        }
    }
}
runForm() 