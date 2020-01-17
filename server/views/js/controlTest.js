var data = false
var deleteData = false
var addNew = false
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
            document.getElementById('exitMenu').classList.add('disableds')
                logout()
            }
        });
}
function logout(){
    location.replace("/logout")
}

function addTEST() {
    addNew = true
    deleteData = false
    data = false
    disFunction()
    disableMenuAll()
    enableMenu('saveMenu')
    var id = document.getElementById('id')
    if(id != null){
            id.style.textDecoration = ''
    }
    resetFunction() 
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
                addNew = false
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
function printImg(){
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
                }) .then((result1)=>{
                    data = true
                    disableMenuAll()
                    enableMenu('addMenu')
                    enableMenu('editMenu')
                    enableMenu('deleteMenu')
                    enableFunction()
                    window.open('../utilities/viewImg.html','popup','width=1100,height=570');
                })
                
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // Swal.fire("บันทึกล้มเหลว");
            }
        });
   
}
function testSearchOparator(){
    var swal_html = `<div >
    <div class="display-center">
                <h5 style="font-size: 100%;">
                    ชื่อ :
                    <input type="text" id="username" style="width: 18%;">
                    นามสกุล :
                    <input type="text" id="userlastname" style="width: 18%;" >
                    เลขบัตรประจำตัว :
                    <input type="text" id="userid" style="width: 18%;" >
                    <button type="button" style="width: auto;height: auto;"
                    class="btn btn-secondary is-color" >
                       
                            <i class="fa fa-search"></i> 
                            ค้นหา
                       
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
            <tr onclick="onSelectUser()">
                <td>นายสมหมาย</td>
                <td>จงรัก</td>
                <td>169 ถนน ลงหาดบางแสน ตำบลแสนสุข อำเภอเมืองชลบุรี ชลบุรี 20131</td>
                <td>1011122111111</td>
            </tr>
            <tr onclick="onSelectUser()">
                <td>นายสมหมาย</td>
                <td>จงรัก</td>
                <td>169 ถนน ลงหาดบางแสน ตำบลแสนสุข อำเภอเมืองชลบุรี ชลบุรี 20131</td>
                <td>1011122111111</td>
            </tr>
            <tr onclick="onSelectUser()">
                <td>นายสมหมาย</td>
                <td>จงรัก</td>
                <td>169 ถนน ลงหาดบางแสน ตำบลแสนสุข อำเภอเมืองชลบุรี ชลบุรี 20131</td>
                <td>1011122111111</td>
            </tr>
            <tr onclick="onSelectUser()">
                <td>นายสมหมาย</td>
                <td>จงรัก</td>
                <td>169 ถนน ลงหาดบางแสน ตำบลแสนสุข อำเภอเมืองชลบุรี ชลบุรี 20131</td>
                <td>1011122111111</td>
            </tr>
            <tr onclick="onSelectUser()">
                <td>นายสมหมาย</td>
                <td>จงรัก</td>
                <td>169 ถนน ลงหาดบางแสน ตำบลแสนสุข อำเภอเมืองชลบุรี ชลบุรี 20131</td>
                <td>1011122111111</td>
            </tr>
            <tr onclick="onSelectUser()">
                <td>นายสมหมาย</td>
                <td>จงรัก</td>
                <td>169 ถนน ลงหาดบางแสน ตำบลแสนสุข อำเภอเมืองชลบุรี ชลบุรี 20131</td>
                <td>1011122111111</td>
            </tr>
            <tr onclick="onSelectUser()">
                <td>นายสมหมาย</td>
                <td>จงรัก</td>
                <td>169 ถนน ลงหาดบางแสน ตำบลแสนสุข อำเภอเมืองชลบุรี ชลบุรี 20131</td>
                <td>1011122111111</td>
            </tr>
            <tr onclick="onSelectUser()">
                <td>นายสมหมาย</td>
                <td>จงรัก</td>
                <td>169 ถนน ลงหาดบางแสน ตำบลแสนสุข อำเภอเมืองชลบุรี ชลบุรี 20131</td>
                <td>1011122111111</td>
            </tr>
            <tr onclick="onSelectUser()">
                <td>นายสมหมาย</td>
                <td>จงรัก</td>
                <td>169 ถนน ลงหาดบางแสน ตำบลแสนสุข อำเภอเมืองชลบุรี ชลบุรี 20131</td>
                <td>1011122111111</td>
            </tr>
            
            <tr onclick="onSelectUser()">
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
        showConfirmButton: false,
        closeOnConfirm: false,
        closeOnCancel: false
    });  
}
function searchOparator(){
    console.log(addNew)
    if(addNew){
        insertTEST()
    }else{
        var swal_html = `<div >
        <div class="display-center">
                    <h5 style="font-size: 100%;">
                        ชื่อ :
                        <input type="text" id="username" style="width: 18%;">
                        นามสกุล :
                        <input type="text" id="userlastname" style="width: 18%;" >
                        เลขบัตรประจำตัว :
                        <input type="text" id="userid" style="width: 18%;" >
                        <button type="button" style="width: auto;height: auto;"
                        class="btn btn-secondary is-color" >
                           
                                <i class="fa fa-search"></i> 
                                ค้นหา
                           
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
                <tr ">
                    <td>นายสมหมาย</td>
                    <td>จงรัก</td>
                    <td>169 ถนน ลงหาดบางแสน ตำบลแสนสุข อำเภอเมืองชลบุรี ชลบุรี 20131</td>
                    <td>1011122111111</td>
                </tr>
                <tr ">
                    <td>นายสมหมาย</td>
                    <td>จงรัก</td>
                    <td>169 ถนน ลงหาดบางแสน ตำบลแสนสุข อำเภอเมืองชลบุรี ชลบุรี 20131</td>
                    <td>1011122111111</td>
                </tr>
                <tr ">
                    <td>นายสมหมาย</td>
                    <td>จงรัก</td>
                    <td>169 ถนน ลงหาดบางแสน ตำบลแสนสุข อำเภอเมืองชลบุรี ชลบุรี 20131</td>
                    <td>1011122111111</td>
                </tr>
                <tr ">
                    <td>นายสมหมาย</td>
                    <td>จงรัก</td>
                    <td>169 ถนน ลงหาดบางแสน ตำบลแสนสุข อำเภอเมืองชลบุรี ชลบุรี 20131</td>
                    <td>1011122111111</td>
                </tr>
                <tr ">
                    <td>นายสมหมาย</td>
                    <td>จงรัก</td>
                    <td>169 ถนน ลงหาดบางแสน ตำบลแสนสุข อำเภอเมืองชลบุรี ชลบุรี 20131</td>
                    <td>1011122111111</td>
                </tr>
                <tr ">
                    <td>นายสมหมาย</td>
                    <td>จงรัก</td>
                    <td>169 ถนน ลงหาดบางแสน ตำบลแสนสุข อำเภอเมืองชลบุรี ชลบุรี 20131</td>
                    <td>1011122111111</td>
                </tr>
                <tr ">
                    <td>นายสมหมาย</td>
                    <td>จงรัก</td>
                    <td>169 ถนน ลงหาดบางแสน ตำบลแสนสุข อำเภอเมืองชลบุรี ชลบุรี 20131</td>
                    <td>1011122111111</td>
                </tr>
                <tr ">
                    <td>นายสมหมาย</td>
                    <td>จงรัก</td>
                    <td>169 ถนน ลงหาดบางแสน ตำบลแสนสุข อำเภอเมืองชลบุรี ชลบุรี 20131</td>
                    <td>1011122111111</td>
                </tr>
                <tr ">
                    <td>นายสมหมาย</td>
                    <td>จงรัก</td>
                    <td>169 ถนน ลงหาดบางแสน ตำบลแสนสุข อำเภอเมืองชลบุรี ชลบุรี 20131</td>
                    <td>1011122111111</td>
                </tr>
                
                <tr ">
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
            showConfirmButton: false,
            closeOnConfirm: false,
            closeOnCancel: false
        });  
    }
    
}
function onSelectUser(){
    Swal.close()
    document.getElementById('typeUser').value = listDataTest.userType
    document.getElementById('province').value = listDataTest.userProvince
    document.getElementById('district').value = listDataTest.userSA
    document.getElementById('subdistrict').value = listDataTest.userA
    document.getElementById('name').value = listDataTest.userName
    document.getElementById('id').value =listDataTest.userId
    document.getElementById('age').value =listDataTest.userAge
    document.getElementById('nationalityList1').value =listDataTest.userN1
    document.getElementById('nationalityList2').value =listDataTest.userN2
    document.getElementById('homeId').value =listDataTest.userHomeId
    document.getElementById('moo').value =listDataTest.userMoo
    document.getElementById('trxk').value =listDataTest.userTrxk
    document.getElementById('sxy').value ='sss'
    document.getElementById('building').value =listDataTest.userBuilding
    document.getElementById('road').value =listDataTest.userRoad
    document.getElementById('phone').value =listDataTest.userPhone
    document.getElementById('fax').value =listDataTest.userFax
}
function searchUsername() {
    document.getElementById('')
}
function editTEST() {
    if (!deleteData) {  
        addNew = true
        console.log(addNew)
        disableMenuAll()
        enableMenu('saveMenu')
        disableFunction()
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
 function setIdDelete(){
    var id = document.getElementById('id')
    if(id != null){
        if(id.style.textDecoration == ''){
            id.style.textDecoration = 'line-through'
        }else{
            id.style.textDecoration = ''
        }
    }
 }
function deleteTEST() {
    deleteData = true
    setIdDelete()
    disableMenuAll()
    enableMenu('addMenu')
    enableMenu('editMenu')
    enableMenu('restoreMenu')
}

function restoreTEST() {
    deleteData = false
    setIdDelete()
    disableMenuAll()
    enableMenu('addMenu')
    enableMenu('editMenu')
    enableMenu('deleteMenu')
}

