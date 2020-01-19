function uploadImage(event) {
    var cancelButton = document.getElementById('cancelImage')
    var target = event.target || event.srcElement;
    console.log(target, "changed.");
    console.log(event);
    if (target.value.length == 0) {
        console.log("Suspect Cancel was hit, no files selected.");
        if (0 == target.files.length) {
            console.log('im delete image')
            cancelButton.onclick();
        }
    } else {
        var selectedFile = event.target.files[0];
        var reader = new FileReader();
        var img = document.getElementById('operatorImage')
        console.log(selectedFile)
        reader.onload = function (event) {
            img.src = event.target.result;
            img.alt = 'operator'
            // img.width = 100%;
            // img.height = auto
        };
        reader.readAsDataURL(selectedFile)
    }
}
function deleteImageOne() {
    document.getElementById('uploadFile').value = ''
    var img = document.getElementById('operatorImage')
    img.src = '../../img/userProfile.png'
    // img.width = 200
    // img.height = 200
}
function buttonImage() {
    document.getElementById('uploadFile').click()
}