let loading = false
let tusername = ''
let tpassword = ''
function checkLogin() {

    if (!loading) {
        console.log(`loading`)
        hideAlert()
        var username = document.getElementById('username').value.trim()
        var password = document.getElementById('password').value.trim()
        if (tusername != username || tpassword != password) {
            if (username.length === 0 || password.length === 0) {
                showAlert()
            } else {
                tusername = username
                tpassword = password
                loading = !loading
                buttonLoading()
                getUser(username, password).then((data) => {
                    console.log(data)
                    if (data.length == 0) {
                        showAlert()
                        setTimeout(function () {
                            buttonLoading()
                            loading = !loading
                        }, 500);
                        console.log(`password is incorrect`)
                    }
                    else {
                        window.location.href = '/'
                    }
                })
            }
        }else{
            showAlert()
            console.log('username and password not change')
        }
    } else {
        console.log(`wait`)
    }

}
function buttonLoading() {
    var load = document.getElementById('loadBtn')
    var text = document.getElementById('textBtn')
    var button = document.getElementById('loginBtn')
    if (text.innerHTML === 'เข้าสู่ระบบ') {
        load.style.display = ''
        button.classList.add("disableds")
        text.innerHTML = 'กำลังโหลด'
    } else {
        button.classList.remove("disableds")
        load.style.display = 'none'
        text.innerHTML = 'เข้าสู่ระบบ'
    }
}
function runScript(e) {
    if (e.keyCode == 13) {
        checkLogin()
        return false;
    }
}
function showAlert() {
    document.getElementById('alertLogin').classList.remove('hide')
}

function hideAlert() {
    document.getElementById('alertLogin').classList.add('hide')
}

function getUser(username, password) {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/user/${username}/${password}`).then((result) => {
            resolve(result.data);
        })
    })
}