let arrInsert = []
let fileImage
let inAddress = {
    'id': 'test',
    'home_number': '',
    'moo': '',
    'trxk': '',
    'sxy': '',
    'building': '',
    'road': '',
    'district_name': '',
    'amphur_name': '',
    'province_name': ''
}
let inPeronal = {
    'id': '',
    'address_id': 'test',
    'title': '',
    'type': '',
    'name': '',
    'surname': '',
    'nationality': '',
    'race': '',
    'birthday': '',
    'personal_id': '',
    'card_issued': '',
    'card_expipe': '',
    'phone': '',
    'fax': ''
}
let inImage = {
    'id': '',
    'type': '',
    'data': ''
}
function preInsert() {
    //address
    inAddress.home_number = document.getElementById('homeId').value
    inAddress.moo = document.getElementById('moo').value
    inAddress.trxk = document.getElementById('trxk').value
    inAddress.sxy = document.getElementById('sxy').value
    inAddress.building = document.getElementById('building').value
    inAddress.road = document.getElementById('road').value
    inAddress.district_name = document.getElementById('subdistrict').value
    inAddress.amphur_name = document.getElementById('district').value
    inAddress.province_name = document.getElementById('province').value
    //prsonal
    inPeronal.title = document.getElementById('title').value
    inPeronal.type = document.getElementById('typeUser').value
    inPeronal.name = document.getElementById('nameUser').value
    inPeronal.surname = document.getElementById('surnameUser').value
    inPeronal.nationality = document.getElementById('nationality').value
    inPeronal.race = document.getElementById('race').value
    inPeronal.birthday = document.getElementById('datepicker3').value
    inPeronal.birthday = document.getElementById('id').value
    inPeronal.card_issued = document.getElementById('datepicker1').value
    inPeronal.card_expipe = document.getElementById('datepicker2').value
    inPeronal.phone = document.getElementById('phone').value
    inPeronal.fax = document.getElementById('fax').value
    arrInsert.push(inPeronal)
    arrInsert.push(inAddress)
    arrInsert.push(inImage)

    console.log(arrInsert)
    console.log(fileImage)
}

function uploadImage(event) {
    var cancelButton = document.getElementById('cancelImage')
    var target = event.target || event.srcElement;
    var imagefile = document.querySelector('#uploadFile');
    var file = document.getElementById('uploadFile').value.split('\\').pop().split('.')
    fileImage = imagefile.files[0]
    let typeImg = file[1]
    inImage.type = typeImg
    if (target.value.length == 0) {
        console.log("Suspect Cancel was hit, no files selected.");
        if (0 == target.files.length) {
            console.log('im delete image')
            cancelButton.onclick();
        }
    } else {
        var selectedFile = event.target.files[0];
        var reader = new FileReader();
        var img = document.getElementById('operatorImage')
        reader.onload = function (event) {
            img.src = event.target.result;
            img.alt = 'operator'
            // img.width = 100%;
            // img.height = auto
        };
        reader.readAsDataURL(selectedFile)
    }
}
function deleteImageOne() {
    document.getElementById('uploadFile').value = ''
    var img = document.getElementById('operatorImage')
    img.src = '../../img/userProfile.png'
}
function buttonImage() {
    document.getElementById('uploadFile').click()
}


function insertToDatabase() {
    return new Promise((resolve, reject) => {
        console.log('insertToDatabase')
        var formData = new FormData();
        formData.append("image", fileImage);
        formData.append("personal", JSON.stringify(arrInsert));
        axios.post('http://localhost:5000/insert/personal', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((data) =>{
            return resolve(data.data)
        })
    })
}