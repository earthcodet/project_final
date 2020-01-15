function selectItem(id) {
  var idInt = parseInt(id);
  console.log(typeof idInt);
  switch (idInt) {
    case 1:
      enableForm("searchUser");
      break;
    case 2:
      enableForm("searchDate");
      break;
    case 3:
      enableForm("searchId");
      break;
    case 4:
      enableForm("searchPerID");
      break;
    case 5:
      enableForm("searchDateEx");
      break;
    case 6:
      enableForm("searchType");
      break;
    case 7:
      enableForm("searchTypeBuidding");
      break;
    case 8:
      enableForm("searchAddress");
      break;
    case 9:
      enableForm("searchPlace");
      break;
  }
}
function enableForm(id) {
  disableForm();
  document.getElementById(id).classList.remove("displaynone");
}
function disableForm() {
  document.getElementById("searchUser").classList.add("displaynone");
  document.getElementById("searchDate").classList.add("displaynone");
  document.getElementById("searchId").classList.add("displaynone");
  document.getElementById("searchPerID").classList.add("displaynone");
  document.getElementById("searchDateEx").classList.add("displaynone");
  document.getElementById("searchType").classList.add("displaynone");
  document.getElementById("searchTypeBuidding").classList.add("displaynone");
  document.getElementById("searchAddress").classList.add("displaynone");
  document.getElementById("searchPlace").classList.add("displaynone");
}
