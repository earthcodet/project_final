function checkLogin(){
    hideAlert()
    var username = document.getElementById('username').value
    var password = document.getElementById('password').value

    if(username == '' && password == ''){
        window.location.href = "./index.html";
    }else{
        showAlert()
    }
}




function showAlert(){
    document.getElementById('alertLogin').classList.remove('hide')
}

function hideAlert(){
    document.getElementById('alertLogin').classList.add('hide')
}