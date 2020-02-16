

// สำหรับ จ/อ/ต ช่องที่หนึ่ง
let addressProviceLand = [];
let addressAmphurLand = [];
let addressDistrictLand = [];

//สำหรับเก็บจังหวัดที่เลือกไว้
let buiddingProviceLand = [];
let buiddingAmphurLand = [];
let buiddingDistrictLand = [];

//ตัวแปรเอาไว้ชี้ว่าเลือกจังหวัดอะไรไว้
var landProviceId = 1;
var landProviceId = 1;

//id number 1 = owner
//id number 2 = land

//Address Buidding 

function landDistrictSelect(amphurId) {
    buiddingDistrictLand = []

    for (let i = 0; i < district.length; i++) {
        if (district[i].AMPHUR_ID == amphurId && district[i].PROVINCE_ID == landProviceId) {
            buiddingDistrictLand.push(district[i])
        }
    }
    removeAlloption('landSubdistrict')
    for (let i = 0; i < buiddingDistrictLand.length; i++) {
        var select = document.getElementById("landSubdistrict");
        var option = document.createElement("option");
        option.text = buiddingDistrictLand[i].DISTRICT_NAME;
        option.value = buiddingDistrictLand[i].DISTRICT_ID;
        select.add(option);
    }

}
function landAmphurSelect(proviceId) {
    buiddingAmphurLand = []
    landProviceId = proviceId
    for (let i = 0; i < amphur.length; i++) {
        if (amphur[i].PROVINCE_ID == proviceId) {
            buiddingAmphurLand.push(amphur[i])
        }
    }
    removeAlloption('landDistrict')
    for (let i = 0; i < buiddingAmphurLand.length; i++) {
        var select = document.getElementById("landDistrict");
        var option = document.createElement("option");
        option.text = buiddingAmphurLand[i].AMPHUR_NAME;
        option.value = buiddingAmphurLand[i].AMPHUR_ID;
        select.onchange = function () { landDistrictSelect(select.value) };
        select.add(option);
    }

}
function landChageProvice(proviceId) {
    landAmphurSelect(proviceId)
    landDistrictSelect(buiddingAmphurLand[0].AMPHUR_ID)
}
function landCreateSelectProvice(data) {
    for (let i = 0; i < data.length; i++) {
        var select = document.getElementById("landProvince");
        var option = document.createElement("option");
        option.text = data[i].PROVINCE_NAME;
        option.value = data[i].PROVINCE_ID;

        select.onchange = function () { landChageProvice(select.value) };
        select.add(option);
    }
}


//Address
function onwerDistrictSelect(amphurId) {
    addressDistrictLand = []

    for (let i = 0; i < district.length; i++) {
        if (district[i].AMPHUR_ID == amphurId && district[i].PROVINCE_ID == landProviceId) {
            addressDistrictLand.push(district[i])
        }
    }
    removeAlloption('ownerSubdistrict')
    for (let i = 0; i < addressDistrictLand.length; i++) {
        var select = document.getElementById("ownerSubdistrict");
        var option = document.createElement("option");
        option.text = addressDistrictLand[i].DISTRICT_NAME;
        option.value = addressDistrictLand[i].DISTRICT_ID;
        select.add(option);
    }

}
function onwerAmphurSelect(proviceId) {
    addressAmphurLand = []
    landProviceId = proviceId
    for (let i = 0; i < amphur.length; i++) {
        if (amphur[i].PROVINCE_ID == proviceId) {
            addressAmphurLand.push(amphur[i])
        }
    }
    removeAlloption('ownerDistrict')
    for (let i = 0; i < addressAmphurLand.length; i++) {
        var select = document.getElementById("ownerDistrict");
        var option = document.createElement("option");
        option.text = addressAmphurLand[i].AMPHUR_NAME;
        option.value = addressAmphurLand[i].AMPHUR_ID;
        select.onchange = function () { onwerDistrictSelect(select.value) };
        select.add(option);
    }

}
function onwerChageProvice(proviceId) {
    onwerAmphurSelect(proviceId)
    onwerDistrictSelect(addressAmphurLand[0].AMPHUR_ID)
}
function onwerCreateSelectProvice(data) {
    for (let i = 0; i < data.length; i++) {
        var select = document.getElementById("ownerProvince");
        var option = document.createElement("option");
        option.text = data[i].PROVINCE_NAME;
        option.value = data[i].PROVINCE_ID;

        select.onchange = function () { onwerChageProvice(select.value) };
        select.add(option);
    }
}


//ฟังชันเริ่มต้น
function openLand() {
    onwerCreateSelectProvice(province)
    // landCreateSelectProvice(province)
    onwerAmphurSelect(1)
    // landAmphurSelect(1)
    onwerDistrictSelect(addressAmphurLand[0].AMPHUR_ID)
    // landDistrictSelect(buiddingAmphurLand[0].AMPHUR_ID)





}
