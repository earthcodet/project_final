

function checkLogin(){
    hideAlert()
    var username = document.getElementById('username').value
    var password = document.getElementById('password').value

    getUser(username, password).then((data) =>{
        console.log(data)
        if(data.length == 0){
            showAlert()
        }
        else{

            setSession(data[0].user_id)
        }



    })

    
    // if(username == '' && password == ''){
    //     window.location.href = "./index.html";
    // }else{
    //     showAlert()
    // }
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
        axios.post(`http://localhost:3000/session/${userId}`).then((result) => {
            resolve(result.data);
        })
    })
}