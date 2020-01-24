//Search name by id
//SERVICE 

// function loadAddress(){
//     getProvice()
//     getAmphur()
//     getDistrict()
// }

function getProviceIdByName(Name) {
    for (let i = 0; i < province.length; i++) {
        if (province[i].PROVINCE_NAME === Name)
            return province[i].PROVINCE_ID
    }
}

function getAmphureIdByName(Name) {
    for (let i = 0; i < amphur.length; i++) {
        if (amphur[i].AMPHUR_NAME === Name)
            return amphur[i].AMPHUR_ID
    }
}

function getDistrictIdByName(Name) {
    for (let i = 0; i < district.length; i++) {
        if (district[i].DISTRICT_NAME === Name)
            return district[i].DISTRICT_ID
    }
}