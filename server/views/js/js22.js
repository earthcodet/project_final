/* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
var dropdown = document.getElementsByClassName("dropdown-btn");
var i;
for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function () {
    if (!this.classList.contains('select-active')) {
      this.classList.toggle("active");
    }
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}

// ผู้สัมผัสอาหาร
function show_food(id) {
  var radio = document.getElementById("food").checked;
  if (id == 1) {
    document.getElementById("boxFood").style.display = "";
  }
  else if (id == 2) {
    document.getElementById("boxFood").style.display = "none";
  }
}
// เจ้าของที่
function show_spirits(id) {
  var radio = document.getElementById("spirits").checked;
  if (id == 1) {
    document.getElementById("boxSpirits").style.display = "";
  }
  else if (id == 2) {
    document.getElementById("boxSpirits").style.display = "none";
  }
}
// เจ้าของที่
function show_confirm(id) {
  var radio = document.getElementById("confirm").checked;
  if (id == 2) {
    document.getElementById("boxConfirm").style.display = "";
  }
  else if (id == 1) {
    document.getElementById("boxConfirm").style.display = "none";
  }
}


$(document).ready(function () {
  var max_fields = 10;
  var wrapper = $(".container1");
  var add_button = $(".add_form_field");

  var x = 1;
  $(add_button).click(function (e) {
    e.preventDefault();
    if (x < max_fields) {
      x++;
      $(wrapper).append('<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input style="width: 30%;" type="text" name="mytext[]"/> <button type="button" class="btn btn-outline-secondary delete">ลบ</button></div>'); //add input box
    } else {
      alert('You Reached the limits')
    }
  });

  $(wrapper).on("click", ".delete", function (e) {
    e.preventDefault();
    $(this).parent('div').remove();
    x--;
  })
});

function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}
// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();


if($.contextMenu != undefined || $.contextMenu != null){
  $(function () {
    $.contextMenu({
      selector: '.context-menu-one',
      callback: function (key, options) {
        var m = "clicked: " + key;
        console.log(key)
        // window.console && console.log(m) || alert(m); 
      },
      items: {
        "sep2": "---------",
        "edit": { name: "Edit" },
        "cut": { name: "Cut" },
        copy: { name: "Copy" },
        "paste": { name: "Paste" },
        "delete": { name: "Delete" },
        "sep1": "---------"
  
      }
    });
  
    $('.context-menu-one').on('click', function (e) {
      console.log('clicked', this);
    })
  });
}



