function disFunction() {
  document.getElementById("disable").disabled = false;
  
  // reset
  console.log(document.getElementById("form"))
  document.getElementById("form").reset();
}

function enableFunction() {
  document.getElementById("disable").disabled = true;
}

// function resetFunction() {
// }

function enFood() {
  document.getElementById("disableFood").disabled = false;
}

function disFood() {
  document.getElementById("disableFood").disabled = true;
}