var fileImage = null;
let delete_image = false
let user = {
    id: '',
    username: '',
    password: '',
    title: '',
    name: '',
    surname: '',
    type_user: '',
    position: '',
    position_type: '',
    is_default: '',
    status: ''
}
let data_nayo_image = false
let image_list = null
let typeFile = ''
function displayImageBox() {
    let text = document.getElementById('position').value
    if (text === 'นายก') {
        document.getElementById('box_image').style.display = ''
    } else {
        fileImage = null
        typeFile = ''
        delete_image = false
        document.getElementById('box_image').style.display = 'none'
    }
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
    let type_start = 1
    if (value_t.id != undefined) {
        getComData(value_t.id).then((raw_data) => {
            if (raw_data.length != 0) {
                setData(raw_data[0])
                setUI()
                if (user.position_type === 'นายก') {
                    getImage(user.id).then((data_image) => {
                        if(data_image.length != 0){
                            data_nayo_image = true
                            image_list = data_image[0]
                            createImageFormURL()
                            document.getElementById('box_image').style.display = ''
                        }
                    })
                }
            }
        })
    }
}
function createImageFormURL(){
    if(image_list != null){
        let img = document.getElementById('operatorImage')
        if(image_list.S_IMAGE_DATA != null){
            img.src = `data:image/${image_list.S_IMAGE_TYPE};base64,${image_list.S_IMAGE_DATA}`
        }else{
            img.src = `../../img/userProfile.png`
        }
        
    }
}
function setData(data) {
    //checkImage
    user.id = data.USER_ID
    user.username = data.USER_USERNAME === null ? '' : data.USER_USERNAME
    user.password = data.USER_PASSWORD === null ? '' : data.USER_PASSWORD
    user.title = data.USER_TITLE
    user.name = data.USER_NAME
    user.surname = data.USER_SURNAME
    user.type_user = data.USER_TYPE_USER
    user.position = data.USER_POSITION === null ? '' : data.USER_POSITION
    user.position_type = data.USER_POSITION_TYPE
    user.is_default = data.USER_IS_DEFAULT === null ? 'N' : 'Y'
    user.status = data.USER_STATUS
}
function setUI() {
    document.getElementById('username').value = user.username
    document.getElementById('password').value = user.password
    document.getElementById('title').value = user.title
    document.getElementById('name').value = user.name
    document.getElementById('surname').value = user.surname
    document.getElementById('position').value = user.position_type
    document.getElementById('type_user').value = user.type_user
    document.getElementById('position_detail').value = user.position
    document.getElementById('defalut').value = user.is_default
    // createImageFormURL()
}
function getImage(id) {
    return new Promise((resolve, reject) => {
        // console.log('image')
        axios.get(`http://localhost:5000/get/image/nayo/user/${id}`).then((result) => {
            // console.log(result.data)
            return resolve(result.data);
        })
    })
}
function getComData(id) {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/get/user/id/${id}`).then((result) => {
            list_data = result.data
            return resolve(result.data);
        })
    })
}
function uploadImage(event) {
    delete_image = false
    var cancelButton = document.getElementById("cancelImage");
    var target = event.target || event.srcElement;
    var imagefile = document.querySelector("#uploadFile");
    var file = document
        .getElementById("uploadFile")
        .value.split("\\")
        .pop()
        .split(".");
    fileImage = imagefile.files[0];
    typeFile = file[1];
    // inImage.type = typeImg;
    var selectedFile = event.target.files[0];
    var reader = new FileReader();
    var img = document.getElementById("operatorImage");

    reader.onload = function (event) {
        // inImage.data = event.target.result
        img.src = event.target.result;
        img.alt = "operator";
        var BASE64_MARKER = ';base64,';
        var base64Index = event.target.result.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
        var base64 = event.target.result.substring(base64Index);
        base64ImageSelect = base64
        console.log(base64ImageSelect)
    };
    reader.readAsDataURL(selectedFile);

}
function deleteImageOne() {
    fileImage = null;
    delete_image = true
    typeFile = ''
    document.getElementById("uploadFile").value = "";
    var img = document.getElementById("operatorImage");
    img.src = "../../img/userProfile.png";
}
function buttonImage() {
    document.getElementById("uploadFile").click();
}
function createGroupData() {
    // user.id = ''
    user.username = setNull(document.getElementById('username').value.trim())
    user.password = setNull(document.getElementById('password').value.trim())
    user.title = document.getElementById('title').value.trim()
    user.name = document.getElementById('name').value.trim()
    user.surname = document.getElementById('surname').value.trim()
    user.type_user = document.getElementById('type_user').value.trim()
    user.position_type = document.getElementById('position').value
    user.position = setNull(document.getElementById('position_detail').value)
    user.is_default = document.getElementById('defalut').value === 'Y' ? 'Y' : null
    user.status = 'N'
}
function setNull(value) {
    if (value === '' || value === '-') {
        return null
    } else {
        return value
    }
}
function createArrayInsert() {
    let arrayItem = []
    arrayItem.push(user) // request 0
    let object = {
        name: '',
        type: '',
        data: ''
    }

    object = {
        name: '',
        type: typeFile,
        data: ''
    }
    if (delete_image) {
        object.name = 'delete_image'
    }
    arrayItem.push(object)
    return arrayItem
}
function insertData() {
    createGroupData()
    let item = createArrayInsert()
    return new Promise((resolve, reject) => {
        var formData = new FormData();
        if (fileImage != null) {
            formData.append('files', fileImage);
        }
        formData.append("gropData", JSON.stringify(item));
        selectImageFile = 0
        axios.post("http://localhost:5000/insert/user", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(data => {
                console.log(data.data)
                return resolve(data.data);
            });

    });
}
function insertPage() {
    if (checkInputInsert()) {
        if ((document.getElementById('box_image').style.display === '' && fileImage != null)|| data_nayo_image) {
            insertData().then((data) => {
                if (data.status) {
                    console.log(data)
                    Swal.fire({
                        html: "บันทึกสำเร็จ",
                        icon: "success",
                        confirmButtonColor: "#009688"
                    }).then((values) => {
                        if (data.id != 'update') {
                            let temp_html = window.location.href.split('?')
                            location.replace(temp_html[0] + '?id=' + data.id)
                        } else {
                            let temp_html = window.location.href.split('?')
                            location.replace(temp_html[0] + '?id=' + user.id)
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
                html: `<a>กรุณาเลือกภาพก่อน</a>` ,
                icon: "error",
                confirmButtonColor: "#009688"
            })
        }

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
    let c_1 = document.getElementById('title').value.trim().length === 0
    let c_2 = document.getElementById('name').value.trim().length === 0
    let c_3 = document.getElementById('surname').value.trim().length === 0
    setAlertInput(c_1, c_2, c_3)
    if (c_1 || c_2 || c_3) {
        return false
    } else {
        return true
    }
}
function resetAlertInput() {
    document.getElementById('title').classList.remove("alertInput");
    document.getElementById('name').classList.remove("alertInput");
    document.getElementById('surname').classList.remove("alertInput");
}
function setAlertInput(c_1, c_2, c_3) {
    if (c_1 === true) {
        document.getElementById("title").classList.add("alertInput");
    }
    if (c_2 === true) {
        document.getElementById("name").classList.add("alertInput");
    }
    if (c_3 === true) {
        document.getElementById("surname").classList.add("alertInput");
    }
}
startForm()