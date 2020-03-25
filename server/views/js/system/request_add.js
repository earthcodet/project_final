
let menu = {
    id: '',
    menu: '',
    name: ''
}
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

function startForm() {
    let temp_id = getUrlVars()
    getView(temp_id)
}

function getView(value_t) {
    console.log('value')
    console.log(value_t)
    if (value_t.id != undefined) {
        getComData(value_t.id).then((raw_data) => {
            if (raw_data.length != 0) {
                setData(raw_data[0])
                setUI()

            }
        })
    }
}
function setData(data) {
    console.log(data)
    menu.id = data.REQUEST_TYPE_ID
    menu.type = data.REQUEST_TYPE_MENU === null ? '' : data.REQUEST_TYPE_MENU
    menu.name = data.REQUEST_TYPE_NAME === null ? '' : data.REQUEST_TYPE_NAME
}
function setUI() {
    document.getElementById('menu_type').value = menu.type
    document.getElementById('menu_name').value = menu.name
    document.getElementById('topic').innerText = 'อัพเดทข้อมูล'
    document.getElementById('head_topic').innerText = 'อัพเดทข้อมูล'
    
}
function getComData(id) {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/requesttype/get/id/${id}`).then((result) => {
            return resolve(result.data);
        })
    })
}
function getIdbyName(id) {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/requesttype/get/name/${menu.name}`).then((result) => {
            return resolve(result.data);
        })
    })
}

function createGroupData() {
    menu.type = document.getElementById('menu_type').value.trim()
    menu.name = document.getElementById('menu_name').value.trim()
}
function insertData() {
    createGroupData()
    return new Promise((resolve, reject) => {
        axios.post("http://localhost:5000/requesttype/insert", { 'requestItem': menu })
            .then(data => {
                console.log(data.data)
                return resolve(data.data);
            });

    });
}
function insertPage() {
    if (checkInputInsert()) {
        insertData().then((data) => {
            if (data) {
                Swal.fire({
                    html: "บันทึกสำเร็จ",
                    icon: "success",
                    confirmButtonColor: "#009688"
                }).then((values) => {
                    if (menu.id != '') {
                        let temp_html = window.location.href.split('?')
                        location.replace(temp_html[0] + '?id=' + menu.id)
                    } else {
                        getIdbyName(menu.name).then((data_Id) => {
                            if (data_Id.length != 0) {
                                let temp_html = window.location.href.split('?')
                                location.replace(temp_html[0] + '?id=' + data_Id[0].REQUEST_TYPE_ID)
                            }else{
                                let temp_html = window.location.href.split('?')
                                location.replace(temp_html[0])
                            }
                        })

                    }

                })
            } else {
                Swal.fire({
                    html: `<a>เกิดข้อผิดพลาด</a> 
                                <br> <a>${data.id}</a>`,
                    icon: "error",
                    confirmButtonColor: "#009688"
                })
            }
        })


    } else {
        Swal.fire({
            html: `ไม่สามารถเว้นช่องว่างได้`,
            icon: "error",
            confirmButtonColor: "#009688"
        })
    }


}
function checkInputInsert() {
    resetAlertInput()
    //zone 1
    let c_1 = document.getElementById('menu_type').value.trim().length === 0
    let c_2 = document.getElementById('menu_name').value.trim().length === 0
    setAlertInput(c_1, c_2)
    if (c_1 || c_2) {
        return false
    } else {
        return true
    }
}
function resetAlertInput() {
    document.getElementById('menu_type').classList.remove("alertInput");
    document.getElementById('menu_name').classList.remove("alertInput");
}
function setAlertInput(c_1, c_2) {
    if (c_1 === true) {
        document.getElementById("menu_type").classList.add("alertInput");
    }
    if (c_2 === true) {
        document.getElementById("menu_name").classList.add("alertInput");
    }
}
startForm()