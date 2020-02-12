let files
function pdfFile(evt) {
    files = evt.target.files[0];
    console.log(files)
}
function insertE() {
    return new Promise((resolve, reject) => {
        console.log("insertToDatabase");
        var formData = new FormData();
        formData.append('files', files);
        axios.post("http://localhost:5000/insert/request", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(data => {
                return resolve(data.data);
            });
    });
}