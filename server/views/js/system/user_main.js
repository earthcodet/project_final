let list_user = []
function start() {
    console.log('hello world')
    getUser().then((raw_data) => {
        console.log(raw_data)
        createTabl(raw_data)
    })
}
function createTabl(data) {
    console.log(data)
    var tbl = document.getElementById('list_user');
    if (tbl.getElementsByTagName("tbody")[0] != null || tbl.getElementsByTagName("tbody")[0] != undefined) {
        tbl.removeChild(tbl.getElementsByTagName("tbody")[0])
    }
    var tblBody = document.createElement('tbody')
    // style="height: 17vw;  text-align: center;"
    for (var i = 0; i < data.length; i++) {
        // creates a table row
        var row = document.createElement("tr");
        for (var j = 0; j < 3; j++) {
            console.log(j)
            var cell = document.createElement("td");
            if (j === 0) {
                let t_tiele = data[i].USER_TITLE === null ? '' : data[i].USER_TITLE
                let t_name = data[i].USER_NAME === null ? '' : data[i].USER_NAME
                let t_surname = data[i].USER_SURNAME === null ? '' : data[i].USER_SURNAME
                var cellText = document.createTextNode(`${t_tiele} ${t_name} ${t_surname}`);
                cell.appendChild(cellText);
                if (data[i].USER_STATUS === 'Y') {
                    cell.style.textDecoration = 'line-through'
                }
            } else if (j === 1) {
                //menu
                let user_type = data[i].USER_TYPE_USER
                let text = user_type === 'A' ? 'Admin' : 'User'
                var cellText = document.createTextNode(text);
                cell.appendChild(cellText);
                if (data[i].USER_STATUS === 'Y') {
                    cell.style.textDecoration = 'line-through'
                }
            } else {
                var btn = document.createElement('button');
                btn.type = "button";
                btn.innerText = 'แก้ไข';

                var btn2 = document.createElement('button');
                btn2.type = "button";
                btn2.innerText = 'แก้ไข';
                if (data[i].USER_STATUS === 'Y') {
                    cell.innerHTML = `
                <button type='button' onclick='openAddUser("EDIT","${i}")' disabled>แก้ไข</button>
                &emsp;
                <button type='button' onclick='changeStatusUser("DELETE","${i}")' disabled>ลบ</button>
                &emsp;
                <button type='button' onclick='changeStatusUser("RE_STATUS","${i}")'>เรียกคืน</button>`

                } else {
                    cell.innerHTML = `
                <button type='button' onclick='openAddUser("EDIT","${i}")'>แก้ไข</button>
                &emsp;
                <button type='button' onclick='changeStatusUser("DELETE","${i}")'>ลบ</button>
                &emsp;
                <button type='button' onclick='changeStatusUser("RE_STATUS","${i}")'>เรียกคืน</button>`

                }

            }

            row.appendChild(cell);
        }
        tblBody.appendChild(row);
    }
    console.log(tblBody)
    tbl.appendChild(tblBody);
}
function getUser() {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/get/user/all`).then((result) => {
            list_user = result.data
            return resolve(result.data);
        })
    })
}

function changeStatus(r_status, r_id) {
    return new Promise((resolve, reject) => {
        var formData = new FormData();
        let object = {
            id: r_id,
            status: r_status,
        }
        axios.post("http://localhost:5000/user/update/status/delete/", { 'userItem': object })
            .then(data => {
                console.log(data.data)
                return resolve(data.data);
            });

    });
}
start()

function changeStatusUser(type, value) {
    console.log(list_user[value])
    let id_user = list_user[value].USER_ID
    let id_type = type === 'DELETE' ? 'Y' : 'N'
    changeStatus(id_type, id_user).then((data_status) => {
        if (data_status) {
            Swal.fire({
                html: "อัพเดทสถานะสำเร็จ",
                icon: "success",
                confirmButtonColor: "#009688"
            }).then((data) =>{
                start() 
            })
        } else {
            Swal.fire({
                html: "เกิดข้อผิดพลาด",
                icon: "error",
                confirmButtonColor: "#009688"
            }).then((data_status)=>{
                start() 
            })
        }

    })
}
function openAddUser(type, index) {
    if (type === 'NEW') {
        window.open('../system/systemAddUser.html', '_blank');
    } else {
        window.open('../system/systemAddUser.html?id=' + list_user[index].USER_ID, '_blank');
    }
}

function searchFilter(value) {
    var  filter, table, tr, td, i, textValue;
    filter = value.trim()

    table = document.getElementById('list_user');
    tr = table.getElementsByTagName("tr");

    for (i = 1; i < tr.length; i++) {
        td = tr[i].cells[0];
        textValue = td.textContent || td.innerText;
        textValue = textValue + ''
        textValue = textValue.trim()
        if (textValue.indexOf(filter) > -1) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
}