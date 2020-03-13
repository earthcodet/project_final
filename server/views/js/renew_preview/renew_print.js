function getRequestDataRenew(no, year) {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/get/request/renew/id/${no}/${year}`).then((result) => {
            return resolve(result.data);
        })
    })
}