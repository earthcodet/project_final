function checkPhoneInput(tagId) {
    var text = document.getElementById(tagId).value
    text = text.replace(/(\d{3})(\d{7})/, "$1-$2");
    document.getElementById(tagId).value = text
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
function validate(evt) {
    var theEvent = evt || window.event;

    // Handle paste
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
        // Handle key press
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}


var totalFiles = [];
function handleFileSelect(evt) {
    console.log('aaa')
    var files = evt.target.files;
    for (var i = 0, f; f = files[i]; i++) {
        if (!f.type.match('image.*')) {
            continue;
        }
        totalFiles.push(f)
        var reader = new FileReader();
        reader.onload = (function (theFile) {
            return function (e) {
                var span = document.createElement('span');
                span.innerHTML = ['<div class="column" style="width: 25%;height: 310px; "> <img width=100% height=270px class="thumb" src="', e.target.result,
                    '" title="', escape(theFile.name), '"/>'
                    , "<button class='deletebutton'" +
                    "onclick='deleteImage()' >ลบรูปภาพนี้</button>", "</div>"].join('');

                document.getElementById('outputImage').insertBefore(span, null);
            };
        })(f);
        reader.readAsDataURL(f);
    }
}
function deleteImage() {
    var index = Array.from(document.getElementById('outputImage').children).indexOf(event.target.parentNode.parentNode)
    document.querySelector("#outputImage").removeChild(document.querySelectorAll('#outputImage span')[index]);
    var fileDelete = totalFiles[index]
    totalFiles.splice(index, 1);
    document.getElementById('uploadFile').value = ''
    // for (var i = 0, f; f = files[i]; i++) {
    //     if (!f.type.match('image.*')) {
    //         continue;
    //     }
    // }
}
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
            img.width = 200
            img.height = 200
            console.log(img.src)
        };
        reader.readAsDataURL(selectedFile)
    }
}
function deleteImageOne() {
    document.getElementById('uploadFile').value = ''
    var img = document.getElementById('operatorImage')
    img.src = '../../img/userProfile.png'
    img.width = 200
    img.height = 200
    console.log(img.src)
}

function buttonImage() {
    document.getElementById('uploadFile').click()
}
