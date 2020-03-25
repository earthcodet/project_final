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
            } else if (j === 1) {
                //menu
                let user_type = data[i].USER_TYPE_USER
                let text = user_type === 'A' ? 'Admin' : 'User'
                var cellText = document.createTextNode(text);
                cell.appendChild(cellText);
            } else {
                var btn = document.createElement('button');
                btn.type = "button";
                btn.innerText = 'แก้ไข';

                var btn2 = document.createElement('button');
                btn2.type = "button";
                btn2.innerText = 'แก้ไข';
                // btn.onclick = (function (entry) { return function () { chooseUser(entry); } })(entry);
                cell.innerHTML = `<button type='button'>แก้ไข</button>&emsp;<button type='button'>ลบ</button>&emsp;<button type='button'>เรียกคืน</button>`
                // cell.appendChild(btn);
                // cell.appendChild(btn2);
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
        formData.append("gropData", object);
        axios.post("http://localhost:5000/user/update/status/delete/", formData)
            .then(data => {
                console.log(data.data)
                return resolve(data.data);
            });

    });
}
start()