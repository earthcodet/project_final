let provice = [];
let amphur = [];
let district = [];

let addressProvice = [];
let addressAmphur = [];
let addressDistrict = [];

let buiddingProvice = [];
let buiddingAmphur   =[];
let buiddingDistrict =[];

var aProviceId = 1;
var wProviceId = 1;

function getProvice() {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/get/provice/').then((result) => {
            resolve(result.data);
            for (let i = 0; i < result.data.length; i++) {
                provice.push(result.data[i])
            }
            console.log(result.data)
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
            console.log(result.data)
            resolve(result.data);
        })
    })
}
function getDistrict() {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/get/district/').then((result) => {
            resolve(result.data);
            for (let i = 0; i < result.data.length; i++) {
                district.push(result.data[i])
            }
            console.log(result.data)
            resolve(result.data);
        })
    })
}
function removeAlloption(id) {
    console.log(id)
    var select = document.getElementById(id);
    var length = select.options.length;
    for (i = 0, c = 0; i < length; i++) {
        select.options[c] = null;
    }
}
//Address Buidding 

function wdistrictSelect(amphurId) {
    buiddingDistrict =[]
   
    for(let i = 0 ; i< district.length ; i++){
        if(district[i].AMPHUR_ID == amphurId && district[i].PROVINCE_ID == wProviceId){
            buiddingDistrict.push(district[i])
        }
    }
    removeAlloption('wSubdistrict')
    for (let i = 0; i < buiddingDistrict.length; i++) {
        var select = document.getElementById("wSubdistrict");
        var option = document.createElement("option");
        option.text = buiddingDistrict[i].DISTRICT_NAME;
        option.value = buiddingDistrict[i].DISTRICT_NAME;
        select.add(option);
    }
   
}
function wamphurSelect(proviceId) {
    buiddingAmphur =[]
    wProviceId = proviceId
    for(let i = 0 ; i< amphur.length ; i++){
        if(amphur[i].PROVINCE_ID == proviceId){
            buiddingAmphur.push(amphur[i])
        }
    }
    removeAlloption('wDistrict')
    for (let i = 0; i < buiddingAmphur.length; i++) {
        var select = document.getElementById("wDistrict");
        var option = document.createElement("option");
        option.text = buiddingAmphur[i].AMPHUR_NAME;
        option.value = buiddingAmphur[i].AMPHUR_ID;
        select.onchange = function () { wdistrictSelect(document.getElementById('wDistrict').value) };
        select.add(option);
    }
   
}
function wchageProvice(proviceId){
    wamphurSelect(proviceId)
    wdistrictSelect(buiddingAmphur[0].AMPHUR_ID)
}
function wcreateSelectProvice(data) {
    for (let i = 0; i < data.length; i++) {
        var select = document.getElementById("wProvince");
        var option = document.createElement("option");
        option.text = data[i].PROVINCE_NAME;
        option.value = data[i].PROVINCE_ID;

        select.onchange = function () { wchageProvice(document.getElementById('wProvince').value) };
        select.add(option);
    }
}


//Address
function districtSelect(amphurId) {
    addressDistrict =[]
   
    for(let i = 0 ; i< district.length ; i++){
        if(district[i].AMPHUR_ID == amphurId && district[i].PROVINCE_ID == aProviceId){
            addressDistrict.push(district[i])
        }
    }
    removeAlloption('subdistrict')
    for (let i = 0; i < addressDistrict.length; i++) {
        var select = document.getElementById("subdistrict");
        var option = document.createElement("option");
        option.text = addressDistrict[i].DISTRICT_NAME;
        option.value = addressDistrict[i].DISTRICT_NAME;
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
        option.text = addressAmphur[i].AMPHUR_NAME;
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
        option.text = data[i].PROVINCE_NAME;
        option.value = data[i].PROVINCE_ID;

        select.onchange = function () { chageProvice(document.getElementById('province').value) };
        select.add(option);
    }
}
function runForm() {
    getProvice().then((data) => {
        createSelectProvice(data)
        wcreateSelectProvice(data)

        getAmphur().then((data) =>{
            amphurSelect(1)
            wamphurSelect(1)
            getDistrict().then((districtTemp) =>{
                districtSelect(addressAmphur[0].AMPHUR_ID)
                wdistrictSelect(buiddingAmphur[0].AMPHUR_ID)
            })
        })
       
    })
   
}
function printDiv(printDivName) {
    const currentPage = document.body.innerHTML

    document.body.innerHTML = document.getElementById(printDivName).innerHTML;

    window.print();

    document.body.innerHTML = currentPage;
}

function ClikeMe(){
    document.getElementById('aformId').innerHTML = document.getElementById('formId').value
    document.getElementById('adate').innerHTML = document.getElementById('date').value
    document.getElementById('aformTyae').innerHTML = document.getElementById('formType').value
    document.getElementById('atext').innerHTML = document.getElementById('place').value

    var checked1 = document.getElementById('typeUser1').checked
    var checked2 = document.getElementById('typeUser2').checked
    console.log(checked1 +"  "+ checked2)
    var documentFormType = 'ยังไม่ได้เลือก'
    if(checked1&&checked2==false){
        var documentFormType = 'บุคคลธรรมดา' 
    }else if(checked2&&checked1==false){
        var documentFormType = 'นิติบุคคล' 
    }else{
        alert("เลือกๆๆ")
    }
    document.getElementById('atypeUser').innerHTML = documentFormType

    document.getElementById('aid').innerHTML = document.getElementById('id').value
    document.getElementById('aage').innerHTML = document.getElementById('age').value
    document.getElementById('anationality').innerHTML = document.getElementById('nationality').value
    document.getElementById('arace').innerHTML = document.getElementById('race').value
    document.getElementById('ahomeId').innerHTML = document.getElementById('homeId').value
    
    document.getElementById('amoo').innerHTML = document.getElementById('moo').value
    document.getElementById('atrxk').innerHTML = document.getElementById('trxk').value
    document.getElementById('asxy').innerHTML = document.getElementById('sxy').value
    document.getElementById('abuilding').innerHTML = document.getElementById('building').value
    document.getElementById('aroad').innerHTML = document.getElementById('road').value

    document.getElementById('aprovince').innerHTML = getProviceName(document.getElementById('province').value)
    document.getElementById('adistrict').innerHTML = getAmphurName(document.getElementById('district').value)
    document.getElementById('asubdistrict').innerHTML = document.getElementById('subdistrict').value
    document.getElementById('aphone').innerHTML = document.getElementById('phone').value
    document.getElementById('afax').innerHTML = document.getElementById('fax').value

    document.getElementById('aworkplaceName').innerHTML = document.getElementById('workplaceName').value
    document.getElementById('aarea').innerHTML = document.getElementById('area').value
    document.getElementById('anumPeople').innerHTML = document.getElementById('numPeople').value
    document.getElementById('awHomeId').innerHTML = document.getElementById('wHomeId').value
    document.getElementById('awMoo').innerHTML = document.getElementById('wMoo').value

    document.getElementById('awTrxk').innerHTML = document.getElementById('wTrxk').value
    document.getElementById('awSxy').innerHTML = document.getElementById('wSxy').value
    document.getElementById('awBuilding').innerHTML = document.getElementById('wBuilding').value
    document.getElementById('awRoad').innerHTML = document.getElementById('wRoad').value
    document.getElementById('awProvince').innerHTML = getProviceName(document.getElementById('wProvince').value)

    document.getElementById('awDistrict').innerHTML = getAmphurName(document.getElementById('wDistrict').value)
    document.getElementById('awSubdistrict').innerHTML = document.getElementById('wSubdistrict').value
    document.getElementById('awPhone').innerHTML = document.getElementById('wPhone').value
    document.getElementById('awFax').innerHTML = document.getElementById('wFax').value
   
    printDiv('classview2')
}
function getProviceName(proviceId){
    for(let i = 0 ; i < provice.length ; i++){
        if(provice[i].PROVINCE_ID == proviceId){
            return provice[i].PROVINCE_NAME
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
runForm()