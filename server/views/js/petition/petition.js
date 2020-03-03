let object_id = {
    pid : undefined ,
    rid : undefined,
    rid_no : '',
    rid_year : ''
}
let selectImageFile_report = 0
let maxImageFile_report = 8
var totalFiles_report = [];

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

function startForm(){
    let temp_id = getUrlVars()
    var vars = {};
    if(temp_id.id != undefined){
        let gg = temp_id.id.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
            vars[key] = value;
        });
        object_id = {
            pid : temp_id.id.slice(0,7) ,
            rid : vars.r_id
        }
    }
    
   
    console.log(object_id)
    if(object_id.rid === undefined){
        document.getElementById('block_no1').style.display = ''
        document.getElementById('button_block_2').style.display = 'none'
    }else{
        object_id.rid_no = object_id.rid.slice(0,6),
        object_id.rid_year = object_id.rid.slice(6,10)
        document.getElementById('button_block_1').style.display = 'none'
        document.getElementById('button_block_2').style.display = ''
        document.getElementById('block_no1').style.display = 'none'
        document.getElementById('block_no2').style.display = ''
        setRequestId()
    }
}
function setRequestId(){
    document.getElementById('request_id_report').value = `${object_id.rid_no}/${object_id.rid_year}`
}

function handleImageSelect(evt) {
    var files = evt.target.files;
    for (var i = 0, f; f = files[i]; i++) {
        if (!f.type.match('image.*')) {
            continue;
        }
        if (selectImageFile_report < maxImageFile_report) {
            totalFiles_report.push(f)
            var reader = new FileReader();
            reader.onload = (function (theFile) {
                return function (e) {
                    var span = document.createElement('span');
                    span.innerHTML =
                        [
                            `<div class="col" style="width: 25%; height: 100%; ">
                <img 
                width=100% 
                height=85% 
                src="`
                            , e.target.result,
                            '" title="', escape(theFile.name), '"/>'
                            , "<br><button type='button' class='delete image'" +
                            "onclick='deleteImage()' >ลบรูปภาพนี้</button>", "</div>"
                        ].join('');

                    document.getElementById('outputImage_report').insertBefore(span, null);
                };
            })(f);
            reader.readAsDataURL(f);
            selectImageFile_report = selectImageFile_report + 1
        }
    }
}
function deleteImage() {
    var index = Array.from(document.getElementById('outputImage_report').children).indexOf(event.target.parentNode.parentNode)
    document.querySelector("#outputImage_report").removeChild(document.querySelectorAll('#outputImage_report span')[index]);
    totalFiles_report.splice(index, 1);
    document.getElementById('uploadFile').value = ''
    selectImageFile_report = selectImageFile_report - 1
}