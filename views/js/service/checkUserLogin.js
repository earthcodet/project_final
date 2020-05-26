function checkUserlogin(){
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/get/username/login`).then((result) => {

            if(result.data === 'A'){
                document.getElementById('adminna').style.display = ''
            }
            if(!result.data){
                window.location.href = '/login'
            }
        })
    })
}
//ต้องแยกไฟล์เพราะ มันจะรัน function checkLogin ตอนแรก
checkUserlogin()