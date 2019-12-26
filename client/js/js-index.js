// Open and close the sidebar on medium and small screens
function w3_open() {
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("myOverlay").style.display = "block";
}

function w3_close() {
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("myOverlay").style.display = "none";
}

// Change style of top container on scroll
window.onscroll = function() {
  myFunction();
};
function myFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document
      .getElementById("myTop")
      .classList.add("w3-card-4", "w3-animate-opacity");
    document.getElementById("myIntro").classList.add("w3-show-inline-block");
  } else {
    document.getElementById("myIntro").classList.remove("w3-show-inline-block");
    document
      .getElementById("myTop")
      .classList.remove("w3-card-4", "w3-animate-opacity");
  }
}

// Dropdowns1
function myAccordion(id) {
  var x = document.getElementById(id);
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
    x.previousElementSibling.className += " w3-theme";
  } else {
    x.className = x.className.replace("w3-show", "");
    x.previousElementSibling.className = x.previousElementSibling.className.replace(
      " w3-theme",
      ""
    );
  }
}
function myAccordion11(id) {
  var x = document.getElementById(id);
  // if (x.className.indexOf("w3-show") == -1) {
  //   x.className += " w3-show";
  //   x.previousElementSibling.className += " w3-theme";
  // } else {
  //   x.className = x.className.replace("w3-show", "");
  //   x.previousElementSibling.className = x.previousElementSibling.className.replace(
  //     " w3-theme",
  //     ""
  //   );
  // }
}

// Dropdowns2
function myAccordion2(id) {
  var x = document.getElementById(id);
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
    x.previousElementSibling.className += " w3-theme";
  } else {
    x.className = x.className.replace("w3-show", "");
    x.previousElementSibling.className = x.previousElementSibling.className.replace(
      " w3-theme",
      ""
    );
  }
}
// Dropdowns3
function myAccordion3(id) {
  var x = document.getElementById(id);
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
    x.previousElementSibling.className += " w3-theme";
  } else {
    x.className = x.className.replace("w3-show", "");
    x.previousElementSibling.className = x.previousElementSibling.className.replace(
      " w3-theme",
      ""
    );
  }
}
// Dropdowns4
function myAccordion4(id) {
  var x = document.getElementById(id);
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
    x.previousElementSibling.className += " w3-theme";
  } else {
    x.className = x.className.replace("w3-show", "");
    x.previousElementSibling.className = x.previousElementSibling.className.replace(
      " w3-theme",
      ""
    );
  }
}
// Dropdowns5
function myAccordion5(id) {
  var x = document.getElementById(id);
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
    x.previousElementSibling.className += " w3-theme";
  } else {
    x.className = x.className.replace("w3-show", "");
    x.previousElementSibling.className = x.previousElementSibling.className.replace(
      " w3-theme",
      ""
    );
  }
}
// Dropdowns6
function myAccordion6(id) {
  var x = document.getElementById(id);
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
    x.previousElementSibling.className += " w3-theme";
  } else {
    x.className = x.className.replace("w3-show", "");
    x.previousElementSibling.className = x.previousElementSibling.className.replace(
      " w3-theme",
      ""
    );
  }
}
// Dropdowns7
function myAccordion7(id) {
  var x = document.getElementById(id);
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
    x.previousElementSibling.className += " w3-theme";
  } else {
    x.className = x.className.replace("w3-show", "");
    x.previousElementSibling.className = x.previousElementSibling.className.replace(
      " w3-theme",
      ""
    );
  }
}

function showtext() {
  var qq = document.getElementById("deed").value;
  if (qq == "01") {
    document.getElementById("Demo").style.display = "block";
  } else {
    document.getElementById("Demo").style.display = "none";
  }
}

// ผู้สัมผัสอาหาร
$(document).ready(function(){
  $(".boxFood").hide();
});

function showTxtFood(){
  $(".boxFood").show();
}

function dontShowTxtFood(){
  $(".boxFood").hide();
}