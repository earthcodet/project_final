function SearchLocation() {
    var swal_html = `<div >
    <div class="display-center">
                <h5 style="font-size: 100%;">
                    ชื่อสถานที่จำหน่ายสินค้า :
                    <input type="text" id="location" style="width: 50%;">
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
                <th></th>
              </tr>
            </thead>
            <tbody>
            <tr onclick="onSelectUser()">
                <td>เขตปลอดร่มเตียงที่ 1</td>
            </tr>
            <tr onclick="onSelectUser()">
                <td>เขตปลอดร่มเตียงที่ 2</td>
            </tr>
            <tr onclick="onSelectUser()">
                <td>เขตปลอดร่มเตียงที่ 3</td>
            </tr>
            <tr onclick="onSelectUser()">
                <td>เขตปลอดร่มเตียงที่ 4</td>
            </tr>
            <tr onclick="onSelectUser()">
                <td>เขตปลอดร่มเตียงที่ 5</td>
            </tr>
            <tr onclick="onSelectUser()">
                <td>เขตปลอดร่มเตียงที่ 6</td>
            </tr>
            <tr onclick="onSelectUser()">
                <td>เขตปลอดร่มเตียงที่ 7</td>
            </tr>
            <tr onclick="onSelectUser()">
                <td>เขตปลอดร่มเตียงที่ 8</td>
            </tr>
            <tr onclick="onSelectUser()">
                <td>เขตปลอดร่มเตียงที่ 9</td>
            </tr>
            <tr onclick="onSelectUser()">
                <td>เขตปลอดร่มเตียงที่ 10</td>
            </tr>
            <tr onclick="onSelectUser()">
                <td>เขตปลอดร่มเตียงที่ 11</td>
            </tr>
            </tbody>
          </table>
    </div>
</div>`

    Swal.fire({
        title: "ค้นหาสถานที่จำหน่ายสินค้า",
        html: swal_html,
        width: '50%',
        customClass: 'swal-height',
        showConfirmButton: false,
        closeOnConfirm: false,
        closeOnCancel: false
    });
}
function testSearchOparator() {
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
function searchOparator() {
    console.log(addNew)
    if (addNew) {
        insertTEST()
    } else {
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
            showConfirmButton: false,
            closeOnConfirm: false,
            closeOnCancel: false
        });
    }

}
function searchOparatorFor02() {
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