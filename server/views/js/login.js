let loading = false

function checkLogin(){
    
    if(!loading){
        console.log(`loading`)
        hideAlert()
        var username = document.getElementById('username').value.trim()
        var password = document.getElementById('password').value.trim()
        if(username.length === 0 || password.length === 0){
            showAlert()
        }else{
            loading = !loading
            buttonLoading()
            getUser(username, password).then((data) =>{
                if(data.length == 0){
                    showAlert()
                    setTimeout(function(){
                        buttonLoading()
                        loading = !loading
                    }, 500);
                }
                else{
                    console.log(data)
                    // ทำ address เป็น static

                    setSession(data[0].user_id).then((data) => {
                        window.location.href ='/'
                    })
                }
            })
        }
    }else{
        console.log(`wait`)
    }
    
}
function buttonLoading(){
    var load = document.getElementById('loadBtn')
    var text = document.getElementById('textBtn')
    var button = document.getElementById('loginBtn')
    if(text.innerHTML === 'เข้าสู่ระบบ'){
        load.style.display = ''
        button.classList.add("disableds")
        text.innerHTML = 'กำลังโหลด'
    }else{
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
function showAlert(){
    document.getElementById('alertLogin').classList.remove('hide')
}

function hideAlert(){
    document.getElementById('alertLogin').classList.add('hide')
}

function getUser(username, password) {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/user/${username}/${password}`).then((result) => {
            resolve(result.data);
        })
    })
}

function setSession(userId){
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:3000/session/${userId}`).then((data) =>{
            resolve(data)
        })
    })
}