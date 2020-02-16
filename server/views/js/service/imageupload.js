let selectImageFile = 0
let fileImage = []
var totalFiles = [];
let files
let filePdf = {
    name: '',
    data: ''
  }
let testInsertRequest = {
    is_request_changed:false,
    no: '',
    year: parseInt(new Date().toISOString().slice(0, 4)) + 543,
    personal_id_owner: 'P000001',
    request_type_id: 15,
    staff_id_alderman: 'S0001',
    establishment_id: '',
    staff_id_money: 'S0001',
    reference_id: 'YES',
    train_id: 'YES',
    personal_id_assistant: '',
    staff_id_approve: 'S0001', // '' and '-' => 'NULL'
    establishment_is_land_owned:'',
    establishment_address_id:'',
    image_is_changed : false,
    menu: 'ใบอนุญาตจัดตั้งสถานที่จำหน่ายอาหาร',
    date_submission: '30-05-2563',
    date_approve: '30-05-2563',
    doc_no1: 'N',
    doc_no2: 'N',
    doc_no3: 'Y',
    doc_no4: 'Y',
    doc_no5: 'Y',
    doc_no6: 'Y',
    subcategory: '',
    product_type: '',
    sell_start: '13:48:00.000',
    sell_end: '13:48:00.000',
    sell_allow: 'Y',
    receipt_order: '15-05-2562',
    receipt_fine: 300,
    receipt_fee: 60.5,
    receipt_total: '',
    //
    receipt_date: '30-05-2563',
    date_issued: '30-05-2563',
    date_expired: '30-05-2563',
    //
    condition_no_1: '',
    condition_no_2: '',
    condition_no_3: '',
    condition_no_4: '',
    image_name: '',
    total_image: 0,
    status: '',
    delete_logic: '',
    is_deleted: '',
    last_update: '20-05-2563',
    username: 'ADMIN'
  
  }
  let testE = {
    is_establishment_changed:true,
    id: '',
    address_id: 'SAVE',
    perosonal_id: 'P000001',
    is_land_owned: 'NO',
    type: '',
    name: 'Aร้านไอติมอร่อยมาก',
    machine_size: 90,
    area_size: 500.55,
    worker: 100,
    phone: '-',
    fax: '',
    grond: ''
  }
  let address = {
    is_address_establishment_changed:true,
    id: "",
    home_number: '88/99',
    moo: '5',
    trxk: '55สถานประกอบการ',
    sxy: 'สถานประกอบการ',
    building: '',
    road: '',
    district_name: 'สอง',
    amphur_name: 'หนึ่ง',
    province_name: 'กรุงเทพ'
  }
  let address2 = {
    is_address_owner_changed:false,
    id: "",
    home_number: '147/292',
    moo: '3',
    trxk: 'เจ้าของที่ดิน',
    sxy: 'เจ้าของที่ดิน',
    building: 'เจ้าของที่ดิน',
    road: 'เจ้าของที่ดิน',
    district_name: 'สอง',
    amphur_name: 'หนึ่ง',
    province_name: 'กรุงเทพ'
  }
  let land = {
    is_land_changed:false,
    id: "",
    address_id: "",
    title: 'นาย',
    name: 'ซี',
    surname: 'บี',
    birthday: "20-05-2563",
    phone: "-",
  }
  let referecneData = {
    id: '',
    title: 'นางสาว',
    name: 'ซูซี่',
    surname: 'มานัด',
    status: 'พี่',
    phone: '0657214578'
  }
  let trianData = {
    id: '',
    issuse: 'สำนักงานเทศบาล',
    date_exp: '02-05-2562',
    date_issued: '02-05-2563'
  }
  let inAddress = {
    is_address_changed:false,
    id: "ADD0000001",
    home_number: "147/525",
    moo: '99',
    trxk: '',
    sxy: '',
    building: '',
    road: '',
    district_name: "ห้วยกะปิ",
    amphur_name: "เมืองชลบุรี",
    province_name: "ชลบุรี"
};
let inPersonal = {
    is_personal_changed:false,
    id: "P000001",
    address_id: "",
    title: "นางสาว",
    type: "บุคคลธรรมดา",
    name: "เขมนิจ",
    surname: "จามิกรณ์",
    nationality: 'ลาว',
    race: 'ไทย',
    birthday: '31-01-2546',
    personal_id: "1254233652124",
    card_issued: "04-02-2560",
    card_expipe: '',
    phone: "0616588521",
    fax: ''
};
function handleFileSelect(evt) {
    var files = evt.target.files;
    for (var i = 0, f; f = files[i]; i++) {
        if (!f.type.match('image.*')) {
            continue;
        }
        if (selectImageFile < 8) {
            totalFiles.push(f)
            var reader = new FileReader();
            reader.onload = (function (theFile) {
                return function (e) {
                    var span = document.createElement('span');
                    span.innerHTML =
                        [
                            `<div class="col" style="width: 25%; height: 50%; ">
                <img 
                width=100% 
                height=85% 
                src="`
                            , e.target.result,
                            '" title="', escape(theFile.name), '"/>'
                            , "<br><button type='button' class='delete image'" +
                            "onclick='deleteImage()' >ลบรูปภาพนี้</button>", "</div>"
                        ].join('');

                    document.getElementById('outputImage').insertBefore(span, null);
                };
            })(f);
            reader.readAsDataURL(f);
            selectImageFile = selectImageFile + 1
          
        }
        console.log(totalFiles)
    }
}
function deleteImage() {
    var index = Array.from(document.getElementById('outputImage').children).indexOf(event.target.parentNode.parentNode)
    document.querySelector("#outputImage").removeChild(document.querySelectorAll('#outputImage span')[index]);
    totalFiles.splice(index, 1);
    document.getElementById('uploadFile').value = ''
    selectImageFile = selectImageFile - 1
    console.log(totalFiles)
}
function searchImage(){

}
function insetImage() {
    return new Promise((resolve, reject) => {
        console.log("insertToDatabase");
        var formData = new FormData();
        for( var i = 0; i < totalFiles.length; i++ ){
            let file = totalFiles[i];
            console.log(file);
            formData.append('files'+i, file);
        }
        formData.append('maxSizeImage', totalFiles.length)
        axios.post("http://localhost:5000/insert/request", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(data => {
                return resolve(data.data);
            });
    });
}


function pdfFile(evt) {
    files = evt.target.files[0];
    console.log(files)
}
function preInsert(){
    let arrayItem = []
    // request, personal, Edata, address, land, addressOwner, file, reference, train
    //personal เป็น  array  index ที่ 0 เป็น personal , index ที่ 1 เป็น address 
    let personalArray =[]
    personalArray.push(inPersonal)
    personalArray.push(inAddress)

    arrayItem.push(testInsertRequest) // request 0
    arrayItem.push(personalArray) // personal 1 
    arrayItem.push(testE) // Edata 2 
    arrayItem.push(address) // address 3
    arrayItem.push(land) // land 4
    arrayItem.push(address2) // addressOwner 5
    arrayItem.push(filePdf) // file 6
    arrayItem.push(referecneData) // reference 7
    arrayItem.push(trianData) // train 8
    let object = {

        name: '',
        type: '',
        data: ''
      }
      let = imageData = []
      for(let i = 0 ; i < totalFiles.length ; i++){
        imageData.push(object)
      }
      arrayItem.push(imageData)
    return arrayItem
}
function insertE() {
    return new Promise((resolve, reject) => {
        console.log("insertToDatabase");
        var formData = new FormData();
        formData.append('files', files);
       
        for( var i = 0; i < totalFiles.length; i++ ){
            let file = totalFiles[i];
            console.log(file);
            formData.append('files'+i, file);
        }
        formData.append("gropData", JSON.stringify(preInsert()));
        axios.post("http://localhost:5000/insert/request", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(data => {
                return resolve(data.data);
            });
    });
}