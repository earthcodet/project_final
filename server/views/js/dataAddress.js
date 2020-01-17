let provice = [];
let amphur = [];
let district = [];

function getProvice() {
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

function start(){
    getProvice()
    getAmphur()
    getDistrict()
}
start()