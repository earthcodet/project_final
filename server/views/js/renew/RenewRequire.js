function inputRequired() {
    let checkno1 = document.getElementById("datepicker4").value.trim().length === 0;
    let checkno2 = document.getElementById("datepicker3").value.trim().length === 0;
    let checkno3 = document.getElementById("renew_fee").value.trim().length === 0;
    let checkno4 = document.getElementById("renew_fine").value.trim().length === 0;

    if (checkno1) { document.getElementById("datepicker4").classList.add("alertInput"); }
    if (checkno2) { document.getElementById("datepicker3").classList.add("alertInput"); }
    if (checkno3) { document.getElementById("renew_fee").classList.add("alertInput"); }
    if (checkno4) { document.getElementById("renew_fine").classList.add("alertInput"); }

    if (checkno1 || checkno2 || checkno3 || checkno4) {
        return false;
    } else {
        return true;
    }
}

function resetInputRequired() {
    document.getElementById("datepicker4").classList.remove("alertInput");
    document.getElementById("datepicker3").classList.remove("alertInput");
    document.getElementById("renew_fee").classList.remove("alertInput");
    document.getElementById("renew_fine").classList.remove("alertInput");
}
function preInsert() {
    let check_input = false
    resetInputRequired();
    check_input = inputRequired();
    if (check_input) {
        return true
    } else {
        Swal.fire({
            title: "กรุณากรอกข้อมูลให้ครบ",
            width: "30%",
            showConfirmButton: true,
            closeOnConfirm: false,
            closeOnCancel: false,
            confirmButtonColor: "#009688",
            icon: "error"
        });
        return false
    }
}