let list_request = []
function start() {
    console.log('hello world')
    getRequestType().then((raw_data) => {
        console.log(raw_data)
        createTabl(raw_data)
    })
}
function createTabl(data) {
    console.log(data)
    var tbl = document.getElementById('list_request');
    if (tbl.getElementsByTagName("tbody")[0] != null || tbl.getElementsByTagName("tbody")[0] != undefined) {
        tbl.removeChild(tbl.getElementsByTagName("tbody")[0])
    }
    var tblBody = document.createElement('tbody')
    // style="height: 17vw;  text-align: center;"
    for (var i = 0; i < data.length; i++) {
        // creates a table row
        var row = document.createElement("tr");
        row.style.textAlign ='center'
        for (var j = 0; j < 3; j++) {
            console.log(j)
            var cell = document.createElement("td");
            if (j === 0) {
                let text = data[i].REQUEST_TYPE_MENU
                var cellText = document.createTextNode(text);
                cell.appendChild(cellText);
            } else if (j === 1) {
                let text = data[i].REQUEST_TYPE_NAME
                var cellText = document.createTextNode(text);
                cell.appendChild(cellText);
            } else {
                cell.innerHTML = `<button type='button' onclick='openAddUser("EDIT","${i}")'>แก้ไข</button>`
            }

            row.appendChild(cell);
        }
        tblBody.appendChild(row);
    }
    console.log(tblBody)
    tbl.appendChild(tblBody);
}
function getRequestType() {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/requesttype/get/all`).then((result) => {
            list_request = result.data
            return resolve(result.data);
        })
    })
}
start()
function openAddUser(type, index) {
    if (type === 'NEW') {
        window.open('../system/systemAddType.html', '_blank');
    } else {
        window.open('../system/systemAddType.html?id=' + list_request[index].REQUEST_TYPE_ID, '_blank');
    }
}

function searchFilter(value) {
    var filter, table, tr, td, i, textValue;
    filter = value.trim()

    table = document.getElementById('list_request');
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