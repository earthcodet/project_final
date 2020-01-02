var data = false
var deleteData = false
// function createItem(lastname){
//     document.getElementById('resultNotFound').classList.add('display-none')
//     let arrayResult = searchItem(lastname)
//     if(arrayResult.length != 0){
//             var tbl = document.getElementById('resultItem')
//             var tbdy = document.createElement('tbody');
//             for (var i = 0; i < 3; i++) {
//               var tr = document.createElement('tr');
//               for (var j = 0; j < 2; j++) {
//                 if (i == 2 && j == 1) {
//                   break
//                 } else {
//                   var td = document.createElement('td');
//                   td.appendChild(document.createTextNode('\u0020'))
//                   i == 1 && j == 1 ? td.setAttribute('rowSpan', '2') : null;
//                   tr.appendChild(td)
//                 }
//               }
//               tbdy.appendChild(tr);
//             }
//             tbl.appendChild(tbdy);
//     }else{
//         document.getElementById('resultItem').classList.add('display-none')
//         document.getElementById('resultNotFound').classList.remove('display-none')
//     }
// }



function exitTEST() {
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
    Swal.fire({
        title: "สำนักงานเทศบาล",
        html: "ต้องการบันทึกหรือไม่",
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
                Swal.fire({
                    html: "บันทึกสำเร็จ",
                    icon: "success",
                    confirmButtonColor: "#009688"
                });
                data = true
                disableMenuAll()
                enableMenu('addMenu')
                enableMenu('editMenu')
                enableMenu('deleteMenu')
                enableFunction()
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // Swal.fire("บันทึกล้มเหลว");
            }
        });
}



function testSearchOparator(){
    var swal_html = `  <div >
    <div class="display-center">
        <h5>
            ชื่อ :
            <input type="text" id="username" >
            นามสกุล :
            <input type="text" id="userlastname" >
            เลขบัตรประจำตัว :
            <input type="text" id="userid" >
            <button type="button" 
            class="btn btn-secondary is-color>
                <h5> 
                    <i class="fa fa-search"></i> 
                    ค้นหา
                </h5>
            </button>
        </h5>
    </div>
    <div class="search-popup-height">
        <table id='resultItem' class="table tablesearch table-hover cursor-pointer">
            <thead>
              <tr class="is-color ">
                <th>ชื่อ</th>
                <th>นามสกุล</th>
                <th>ที่อยู่</th>
                <th>เลขบัตรประจำตัว</th>
              </tr>
            </thead>
            <tbody>
            <tr>
                <td>นายสมหมาย</td>
                <td>จงรัก</td>
                <td>169 ถนน ลงหาดบางแสน ตำบลแสนสุข อำเภอเมืองชลบุรี ชลบุรี 20131</td>
                <td>1011122111111</td>
            </tr>
            <tr>
                <td>นายสมหมาย</td>
                <td>จงรัก</td>
                <td>169 ถนน ลงหาดบางแสน ตำบลแสนสุข อำเภอเมืองชลบุรี ชลบุรี 20131</td>
                <td>1011122111111</td>
            </tr>
            <tr>
                <td>นายสมหมาย</td>
                <td>จงรัก</td>
                <td>169 ถนน ลงหาดบางแสน ตำบลแสนสุข อำเภอเมืองชลบุรี ชลบุรี 20131</td>
                <td>1011122111111</td>
            </tr>
            <tr>
                <td>นายสมหมาย</td>
                <td>จงรัก</td>
                <td>169 ถนน ลงหาดบางแสน ตำบลแสนสุข อำเภอเมืองชลบุรี ชลบุรี 20131</td>
                <td>1011122111111</td>
            </tr>
            <tr>
                <td>นายสมหมาย</td>
                <td>จงรัก</td>
                <td>169 ถนน ลงหาดบางแสน ตำบลแสนสุข อำเภอเมืองชลบุรี ชลบุรี 20131</td>
                <td>1011122111111</td>
            </tr>
            <tr>
                <td>นายสมหมาย</td>
                <td>จงรัก</td>
                <td>169 ถนน ลงหาดบางแสน ตำบลแสนสุข อำเภอเมืองชลบุรี ชลบุรี 20131</td>
                <td>1011122111111</td>
            </tr>
            <tr>
                <td>นายสมหมาย</td>
                <td>จงรัก</td>
                <td>169 ถนน ลงหาดบางแสน ตำบลแสนสุข อำเภอเมืองชลบุรี ชลบุรี 20131</td>
                <td>1011122111111</td>
            </tr>
            <tr>
                <td>นายสมหมาย</td>
                <td>จงรัก</td>
                <td>169 ถนน ลงหาดบางแสน ตำบลแสนสุข อำเภอเมืองชลบุรี ชลบุรี 20131</td>
                <td>1011122111111</td>
            </tr>
            <tr>
                <td>นายสมหมาย</td>
                <td>จงรัก</td>
                <td>169 ถนน ลงหาดบางแสน ตำบลแสนสุข อำเภอเมืองชลบุรี ชลบุรี 20131</td>
                <td>1011122111111</td>
            </tr>
            
            <tr>
                <td>นายสมหมาย</td>
                <td>จงรัก</td>
                <td>169 ถนน ลงหาดบางแสน ตำบลแสนสุข อำเภอเมืองชลบุรี ชลบุรี 20131</td>
                <td>1011122111111</td>
            </tr>
            </tbody>
          </table>
    </div>
</div>`

    Swal.fire({
        title: "ค้นหารายชื่อผู้ประกอบการ",
        html: swal_html,
        width: '80%',
        customClass: 'swal-height',
        showCancelButton: false,
        showConfirmButton: false
    });
}
function searchUsername() {
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
            icon: 'warning'
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

