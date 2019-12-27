var data = false
var deleteData = false
let listUsername =[
    {   
        username:'สมพงค์',
        lastname:'ท้องป่อง',
        address:'169 ถนน ลงหาดบางแสน ตำบลแสนสุข อำเภอเมืองชลบุรี ชลบุรี 20131',
        id:'1234567891233' 
    },
    {   
        username:'สมัคร',
        lastname:'ปกป้องแดนไกล',
        address:'169 ถนน ลงหาดบางแสน ตำบลแสนสุข อำเภอเมืองชลบุรี ชลบุรี 20131',
        id:'1234567895123' 
    }
]
function searchItem(lastname){
    
    var resultName = []
    for(let i =0; i<listUsername.length; i++){
        if(listUsername[i].lastname.indexOf(lastname)){
            resultName.push(listUsername[i])
        }
    }
    return resultName
}

function createItem(lastname){
    console.log('passs')
    document.getElementById('resultNotFound').classList.add('display-none')

    let arrayResult = searchItem(lastname)
    if(arrayResult.length != 0){
        console.log(arrayResult)
            var tbl = document.getElementById('resultItem')
            var tbdy = document.createElement('tbody');
            for (var i = 0; i < 3; i++) {
              var tr = document.createElement('tr');
              for (var j = 0; j < 2; j++) {
                if (i == 2 && j == 1) {
                  break
                } else {
                  var td = document.createElement('td');
                  td.appendChild(document.createTextNode('\u0020'))
                  i == 1 && j == 1 ? td.setAttribute('rowSpan', '2') : null;
                  tr.appendChild(td)
                }
              }
              tbdy.appendChild(tr);
            }
            tbl.appendChild(tbdy);
    }else{
        document.getElementById('resultItem').classList.add('display-none')
        document.getElementById('resultNotFound').classList.remove('display-none')
    }
}



function exitTEST(menu){
    Swal.fire({
        title: "สำนักงานเทศบาล",
        html: "ต้องการออกจากระบบหรือไม่",
        showCancelButton: true,
        confirmButtonColor: "#009688",
        confirmButtonText: "ใช่",
        cancelButtonText: "ไม่ใช่",
        cancelButtonColor: '#dc3545',
        closeOnConfirm: false,
        closeOnCancel: false
    })
        .then((result) => {
            if (result.value) {
                window.location.href = "../utilities/login.html"
            } 
        });
}
function addTEST() {
    deleteData = false
    data = false
    disFunction()
    disableMenuAll()
    enableMenu('saveMenu')
}
function disableMenuAll() {
    document.getElementById('addMenu').classList.add('disableds')
    document.getElementById('saveMenu').classList.add('disableds')
    document.getElementById('editMenu').classList.add('disableds')
    document.getElementById('restoreMenu').classList.add('disableds')
    document.getElementById('deleteMenu').classList.add('disableds')
}

function enableMenu(id) {
    document.getElementById(id).classList.remove('disableds')
}

function insertTEST() {
    // Swal.fire({
    //     title: "สำนักงานเทศบาล",
    //     html: "ต้องการบันทึกหรือไม่",
    //     showCancelButton: true,
    //     confirmButtonColor: "#009688",
    //     confirmButtonText: "ใช่",
    //     cancelButtonText: "ไม่ใช่",
    //     cancelButtonColor: '#dc3545',
    //     closeOnConfirm: false,
    //     closeOnCancel: false
    // })
    //     .then((result) => {
    //         if (result.value) {
    //             Swal.fire({
    //                 html: "บันทึกสำเร็จ",
    //                 icon: "success",
    //                 confirmButtonColor: "#009688"
    //             });
    //             data = true
    //             disableMenuAll()
    //             enableMenu('addMenu')
    //             enableMenu('editMenu')
    //             enableMenu('deleteMenu')
    //             enableFunction()
    //         } else if (result.dismiss === Swal.DismissReason.cancel) {
    //             // Swal.fire("บันทึกล้มเหลว");
    //         }
    //     });

    var swal_html = `  <div >
    <div class="display-center ">
        <h5>
            ชื่อ :
            <input type="text" id="username" >
            นามสกุล :
            <input type="text" id="userlastname" >
            เลขบัตรประจำตัว :
            <input type="text" id="userid" >
            <button type="button" class="btn btn-secondary is-color"  onclick="searchItem(document.getElementById('userlastname').value)">
                <h5> 
                    <i class="fa fa-search"></i> 
                    ค้นหา
                </h5>
            </button>
        </h5>
    </div>
    <div>
        <table id='resultItem' class="table table-hover cursor-pointer border-black">
            <thead>
              <tr class="is-color ">
                <th scope="col">ชื่อ</th>
                <th scope="col">นามสกุล</th>
                <th scope="col">ที่อยู่</th>
                <th scope="col">เลขบัตรประจำตัว</th>
              </tr>
            </thead>
            <tbody>
        
            </tbody>
          </table>
    </div>
    <div id="resultNotFound" class="display-none display-center">
        <h1> ค้นหาไม่พบ </h1>
    </div>
</div>`
    
    Swal.fire({
        title:"Good Job!", 
        html: swal_html,
        width: '80%',
        showCancelButton: false, 
        showConfirmButton: false
    });
}

function searchUsername(){
    document.getElementById('')
}
function editTEST() {
    if (!deleteData) {
        disableMenuAll()
        enableMenu('saveMenu')
        disFunction()
    } else {
        Swal.fire({
            title: "สำนักงานเทศบาล",
            html: "ข้อมูลอยู่ในสถานะลบแล้ว",
            confirmButtonColor: "#009688",
            closeOnConfirm: false,
            icon:'warning'
        })
    }
}

function deleteTEST() {
    deleteData = true
    disableMenuAll()
    enableMenu('addMenu')
    enableMenu('editMenu')
    enableMenu('restoreMenu')
}

function restoreTEST() {
    deleteData = false
    disableMenuAll()
    enableMenu('addMenu')
    enableMenu('editMenu')
    enableMenu('deleteMenu')
}

