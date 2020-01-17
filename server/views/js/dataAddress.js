let province = [];
let amphur = [];
let district = [];

function getProvince() {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/get/provice/').then((result) => {
            resolve(result.data);
            for (let i = 0; i < result.data.length; i++) {
                provice.push(result.data[i])
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
                district.push(result.data[i])
            }
            resolve(result.data);
        })
    })
}

//Search name by id
function getProvinceNameByProvinceId(provinceID){
    for(let i = 0; i < provice.length ; i++){
        if(provinceID === province[i].PROVINCE_ID){
                return province[i].PROVINCE_NAME
        }
    }
}

function getAmphurNameByAmphurId(amphurID){
    for(let i = 0; i < amphur.length ; i++){
        if(amphurID === amphur[i].AMPHUR_ID){
            return amphur[i].AMPHUR_NAME
        }
    }
}
function getDistrictNameByDistrictId(districtID){
    for(let i = 0; i < district.length ; i++){
        if(districtID === district[i].DISTRICT_ID){
            return district[i].DISTRICT_NAME
        }
    }
}
//Search list by id
function getAmphurByProvinceId(provinceID){
    let tempArray = []
    for(let i = 0; i < amphur.length ; i++){
        if(provinceID === amphur[i].PROVINCE_ID){
            tempArray.push(amphur[i])
        }
    }
    return tempArray
}

function getDistriceByAmphurIdAndProvinceId(provinceId , amphurId){
    let tempArray = []
    for(let i = 0 ; i < district.length ; i ++){
        if(provinceId === district[i].PROVINCE_ID && amphurId === district[i].AMPHUR_ID){
               tempArray.push(district[i])
            }
    }
    return tempArray
}

function loadAddress(){
    getProvice()
    getAmphur()
    getDistrict()
}
