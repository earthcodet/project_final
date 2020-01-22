function checkUserlogin(){
    console.log(`1`)
    return new Promise((resolve, reject) => {
        console.log(`2`)
        axios.get(`http://localhost:5000/get/username/login`).then((result) => {
            console.log(result.data)
            if(!result.data){
                window.location.href = '/login'
            }
        })
    })
}

checkUserlogin()