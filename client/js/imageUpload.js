var totalFiles = [];
function handleFileSelect(evt) {
    var files = evt.target.files;
    for (var i = 0, f; f = files[i]; i++) {
      if (!f.type.match('image.*')) {
        continue;
      }
      totalFiles.push(f)
      var reader = new FileReader();
      reader.onload = (function(theFile) {
        return function(e) {
          var span = document.createElement('span');
          
          // span.innerHTML = '<div> <img width=300 height=300 class="thumb" src="', e.target.result,
          //   '" title="', escape(theFile.name), '"/>', "<button onclick='deleteImage()'>delete</button>",'</div>'
          
          span.innerHTML = ['<div class="column" style="width: 25%;height: 310px; "> <img width=100% height=270px class="thumb" src="', e.target.result,
          '" title="', escape(theFile.name), '"/>'
          , "<button class='deletebutton'"+
          "onclick='deleteImage()' >ลบรูปภาพนี้</button>","</div>"].join('');

          document.getElementById('outputImage').insertBefore(span, null);
        };
      })(f);
      reader.readAsDataURL(f);
    }
  }
function deleteImage() { 
  var index = Array.from(document.getElementById('outputImage').children).indexOf(event.target.parentNode.parentNode)
  console.log(document.getElementById('outputImage'))
  console.log(event.target.parentNode.parentNode)
  console.log(index)
  	document.querySelector("#outputImage").removeChild( document.querySelectorAll('#outputImage span')[index]);
    totalFiles.splice(index, 1);
    console.log(totalFiles)
}