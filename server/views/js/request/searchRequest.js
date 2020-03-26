let objectSearch = {
  name_s: '',
  surname_s: '',
  datepicker1: '',//วันที่ยื่น
  r_no: '',// Id
  r_year: '',// year
  personal_id: '',
  datepicker2: '', // date_expire
  type_request: '', // ประเภทใบอนุญาต
  type_product: '',
  e_name: '',
  homeId: '',
  moo: '',
  trxk: '',
  sxy: '',
  bA: '',//อาคาร
  road: '',
  province: '',//จังหวัด
  district: '', // อำเภอ
  subdistrict: '', //ตำบล
  typeSearch: 1
}
const numToMonth = {
  1: 'มกราคม',
  2: 'กุมภาพันธ์',
  3: 'มีนาคม',
  4: 'เมษายน',
  5: 'พฤษภาคม',
  6: 'มิถุนายน',
  7: 'กรกฎาคม',
  8: 'สิงหาคม',
  9: 'กันยายน',
  10: 'ตุลาคม',
  11: 'พฤศจิกายน',
  12: 'ธันวาคม'
}
// เซ็ตค่าเตรียมพร้อมสำหรับค้นหา
function setObjectSearch() {
  objectSearch.name_s = '',
    objectSearch.surname_s = ''
  objectSearch.datepicker1 = ''//วันที่ยื่น
  objectSearch.r_no = ''// Id
  objectSearch.r_year = ''// year
  objectSearch.personal_id = ''
  objectSearch.datepicker2 = '' // date_expire
  objectSearch.type_request = '' // ประเภทใบอนุญาต
  objectSearch.type_product = ''
  objectSearch.e_name = ''
  objectSearch.homeId = ''
  objectSearch.moo = ''
  objectSearch.trxk = ''
  objectSearch.sxy = ''
  objectSearch.bA = ''//อาคาร
  objectSearch.road = ''
  objectSearch.province = ''//จังหวัด
  objectSearch.district = '' // อำเภอ
  objectSearch.subdistrict = '' //ตำบล


  objectSearch.name_s = document.getElementById('name_s').value
  objectSearch.surname_s = document.getElementById('surname_s').value
  objectSearch.datepicker1 = document.getElementById('datepicker1').value
  objectSearch.r_no = document.getElementById('r_no').value
  objectSearch.r_year = document.getElementById('r_year').value
  objectSearch.personal_id = document.getElementById('personal_id').value
  objectSearch.datepicker2 = document.getElementById('datepicker2').value
  objectSearch.type_request = document.getElementById('type_request').value
  objectSearch.type_product = document.getElementById('type_product').value
  objectSearch.e_name = document.getElementById('e_name').value
  objectSearch.homeId = document.getElementById('homeId').value
  objectSearch.moo = document.getElementById('moo').value
  objectSearch.trxk = document.getElementById('trxk').value
  objectSearch.sxy = document.getElementById('sxy').value
  objectSearch.bA = document.getElementById('bA').value
  objectSearch.road = document.getElementById('road').value

  let provinceValue = parseInt(document.getElementById(`province`).value);
  let amphurValue = parseInt(document.getElementById(`district`).value);
  let districtValue = parseInt(document.getElementById(`subdistrict`).value);

  objectSearch.subdistrict = district[districtValue - 1] === undefined ? '' : district[districtValue - 1].DISTRICT_NAME;
  objectSearch.district = amphur[amphurValue - 1].AMPHUR_NAME;
  objectSearch.province = province[provinceValue - 1].PROVINCE_NAME;

  if (objectSearch.datepicker1 === '' && objectSearch.datepicker1.split('-').length != 3) {
    objectSearch.datepicker1 = ''
  } else {
    let d = objectSearch.datepicker1.split('-')[0]
    let m = objectSearch.datepicker1.split('-')[1]
    let y = parseInt(objectSearch.datepicker1.split('-')[2]) - 543
    objectSearch.datepicker1 = `${y}-${m}-${d}`
  }

  if (objectSearch.datepicker2 === '' && objectSearch.datepicker2.split('-').length != 3) {
    objectSearch.datepicker2 = ''
  } else {
    let d = objectSearch.datepicker2.split('-')[0]
    let m = objectSearch.datepicker2.split('-')[1]
    let y = parseInt(objectSearch.datepicker2.split('-')[2]) - 543
    objectSearch.datepicker2 = `${y}-${m}-${d}`
  }

}
// เปิดช่องค้นหา
function selectItem(id) {
  resetUI()
  var idInt = parseInt(id);
  switch (idInt) {
    case 1:
      objectSearch.typeSearch = 1
      enableForm("searchUser");
      break;
    case 2:
      objectSearch.typeSearch = 2
      enableForm("searchDate");
      break;
    case 3:
      objectSearch.typeSearch = 3
      enableForm("searchId");
      break;
    case 4:
      objectSearch.typeSearch = 4
      enableForm("searchPerID");
      break;
    case 5:
      objectSearch.typeSearch = 5
      enableForm("searchDateEx");
      break;
    case 6:
      objectSearch.typeSearch = 6
      enableForm("searchType");
      break;
    case 7:
      objectSearch.typeSearch = 7
      enableForm("searchTypeBuidding");
      break;
    case 8:
      objectSearch.typeSearch = 8
      enableForm("searchAddress");
      break;
    case 9:
      objectSearch.typeSearch = 9
      enableForm("searchPlace");
      break;
  }
}
//เปิด form
function enableForm(id) {
  disableForm();
  document.getElementById(id).classList.remove("displaynone");
}
//ปิด form
function disableForm() {
  document.getElementById("searchUser").classList.add("displaynone");
  document.getElementById("searchDate").classList.add("displaynone");
  document.getElementById("searchId").classList.add("displaynone");
  document.getElementById("searchPerID").classList.add("displaynone");
  document.getElementById("searchDateEx").classList.add("displaynone");
  document.getElementById("searchType").classList.add("displaynone");
  document.getElementById("searchTypeBuidding").classList.add("displaynone");
  document.getElementById("searchAddress").classList.add("displaynone");
  document.getElementById("searchPlace").classList.add("displaynone");
}
// reset input 
function resetUI() {
  document.getElementById('name_s').value = ''
  document.getElementById('surname_s').value = ''
  document.getElementById('datepicker1').value = ''
  document.getElementById('r_no').value = ''
  document.getElementById('r_year').value = ''
  document.getElementById('personal_id').value = ''
  document.getElementById('datepicker2').value = ''
  document.getElementById('type_request').value = ''
  document.getElementById('type_request').value = ''
  document.getElementById('e_name').value = ''
  document.getElementById('homeId').value = ''
  document.getElementById('moo').value = ''
  document.getElementById('trxk').value = ''
  document.getElementById('bA').value = ''
  // document.getElementById('province').value = ''
  // document.getElementById('district').value = ''
  // document.getElementById('subdistrict').value = ''
}
function searchRequestPage() {
  return new Promise((resolve, reject) => {
    setObjectSearch()
    console.log('sreach')
    axios.get(`http://localhost:5000/search/request/page`, { params: { r_s: objectSearch } }).then((result) => {
      createResultSearch(result.data)
      console.log(result.data)
      return resolve(result.data);
    })
  })
}

function runScript(e) {
  if (e.keyCode == 13) {
    searchRequestPage()
    return false;
  }
}
function newURL(item) {
  //.cell[2].innerText.split('/')
  let t_id = item.path[1].cells[2].innerText
  let t_type = item.path[1].cells[0].innerText
  console.log(t_type)
  toRequest(t_type, t_id)
}
function createResultSearch(data) {
  var tbl = document.getElementById("requestTable");
  if (tbl.getElementsByTagName("tbody")[0] != null || tbl.getElementsByTagName("tbody")[0] != undefined) {
    tbl.removeChild(tbl.getElementsByTagName("tbody")[0])
  }
  var tblBody = document.createElement('tbody')
  for (var i = 0; i < data.length; i++) {
    // creates a table row
    var row = document.createElement("tr");
    //row index = this.rowIndex
    row.onclick = function () { newURL(event) }

    for (var j = 0; j < 10; j++) {
      var cell = document.createElement("td");
      if (j === 0) {
        var cellText = document.createTextNode(data[i].R_MENU);
      } else if (j === 1) {
        var cellText = document.createTextNode(data[i].R_TYPE);
      } else if (j === 2) {
        let t_id = `${data[i].R_NO}/${data[i].R_YEAR}`
        var cellText = document.createTextNode(t_id);
      } else if (j === 3) {
        let te_name = data[i].E_NAME === null ? '-' : data[i].E_NAME
        var cellText = document.createTextNode(te_name);
      } else if (j === 4) {
        let t_title = data[i].P_TITLE
        let t_name = data[i].P_NAME
        let t_surname = data[i].P_SURNAME
        let t_full = t_title + ' ' + t_name + ' ' + t_surname
        var cellText = document.createTextNode(t_full);
      } else if (j === 5) {
        var cellText = document.createTextNode(data[i].P_ID);
      } else if (j === 6) {
        let AddressText = ''
        AddressText = AddressText + `บ้านเลขที่ ${data[i].A_H} `
        AddressText = AddressText + `หมู่ ${data[i].A_M === null ? '-' : data[i].A_M} `
        AddressText = AddressText + `ตรอก ${data[i].A_T === null ? '-' : data[i].A_T} `
        AddressText = AddressText + `ซอย ${data[i].A_S === null ? '-' : data[i].A_S} `
        AddressText = AddressText + `อาคาร ${data[i].A_B === null ? '-' : data[i].A_B} `
        AddressText = AddressText + `ถนน ${data[i].A_R === null ? '-' : data[i].A_R} `
        AddressText = AddressText + `ตำบล ${data[i].A_D === null ? '-' : data[i].A_D} `
        AddressText = AddressText + `อำเภอ ${data[i].A_A === null ? '-' : data[i].A_A}`
        AddressText = AddressText + `จังหวัด ${data[i].A_P === null ? '-' : data[i].A_P}`
        var cellText = document.createTextNode(AddressText);
      } else if (j === 7) {
        if( data[i].REQUEST_DATE_ISSUED != null){
        let temp_date = data[i].REQUEST_DATE_ISSUED + ''
        //02-01-2563
        let temp_array = temp_date.split('-')
        let temp_montn = parseInt(temp_array[1])
        let text = `${parseInt(temp_array[0])} ${numToMonth[temp_montn]} ${temp_array[2]}`
        var cellText = document.createTextNode(text); 
      }else{
        var cellText = document.createTextNode('-'); 
      }
        
      } else if (j === 8) {
        if (data[i].REQUEST_DATE_EXPIRED != null) {
          let temp_date = data[i].REQUEST_DATE_EXPIRED + ''
          //02-01-2563
          let temp_array = temp_date.split('-')
          let temp_montn = parseInt(temp_array[1])
          let text = `${parseInt(temp_array[0])} ${numToMonth[temp_montn]} ${temp_array[2]}`
          var cellText = document.createTextNode(text);
        }else{
          var cellText = document.createTextNode('-');
        }

      } else {
        let text = ''
        let status_delete = data[i].R_STATUS_DELETE
        let status_request = data[i].R_STATUS
        if (status_delete === 'Y') {
          text = 'ลบข้อมูล'
        } else {
          switch (status_request) {
            case 'ban':
              text = 'พักใบอนุญาต'
              break;
            case 'wait':
              text = 'รออนุมัติ'
              break;
            case 'active':
              text = 'ปกติ'
              break;
            case 'cancel':
              text = 'ยกเลิก'
              break;
            case 'transfer':
              text = 'โอน'
              break;
            default:
              //expire
              text = 'หมดอายุ'
              break;
          }
        }
        var cellText = document.createTextNode(text);
      }

      cell.appendChild(cellText);
      // if (j === 3 && data[i].PERSONAL_IS_DELETED === 'Y') {
      //   cell.style.textDecoration = 'line-through'
      // }
      row.appendChild(cell);
    }
    tblBody.appendChild(row);
  }
  tbl.appendChild(tblBody);
}

function getRequestType() {
  return new Promise((resolve, reject) => {
    axios.get(`http://localhost:5000/get/requestType/`).then((result) => {
      resolve(result.data);
    })
  })
}
function setRequsetTypes() {
  getRequestType().then((data_test) => {
    addRequestTypeToDatalist(data_test)
  })
}
function addRequestTypeToDatalist(data_test) {
  console.log(data_test)
  const list = document.getElementById('r_type')
  for (let i = 0; i < data_test.length; i++) {
    let option = document.createElement('option');
    option.value = data_test[i].REQUEST_TYPE_NAME
    list.appendChild(option);
  }
}
setRequsetTypes()