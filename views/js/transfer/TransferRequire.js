function inputRequired() {
    let checkno1 = document.getElementById("datepicker2").value.trim().length === 0;
    let checkno2 = document.getElementById("datepicker1").value.trim().length === 0;
    let checkno3 = document.getElementById("fine_transfer").value.trim().length === 0;

    if (checkno1) { document.getElementById("datepicker2").classList.add("alertInput"); }
    if (checkno2) { document.getElementById("datepicker1").classList.add("alertInput"); }
    if (checkno3) { document.getElementById("fine_transfer").classList.add("alertInput"); }

    if (checkno1 || checkno2 || checkno3 ) {
        return false;
    } else {
        return true;
    }
}

function resetInputRequired() {
    document.getElementById("datepicker2").classList.remove("alertInput");
    document.getElementById("datepicker1").classList.remove("alertInput");
    document.getElementById("fine_transfer").classList.remove("alertInput");
}
function preInsert() {
    let check_input = false
    resetInputRequired();
    check_input = inputRequired();
    if (check_input) {
        if(operatorData.id != ''){
            if(operatorDataN.id != ''){
                if(requestData.no != ''){
                    return true
                }else{
                    Swal.fire({
                        title: "กรุณาเลือกใบอนุญาตที่ต้องการโอน",
                        width: "30%",
                        showConfirmButton: true,
                        closeOnConfirm: false,
                        closeOnCancel: false,
                        confirmButtonColor: "#009688",
                        icon: "error"
                    });
                    return false
                }
            }else{
                Swal.fire({
                    title: "กรุณาเลือกผู้ที่ต้องการโอนใบอนุญาตให้",
                    width: "30%",
                    showConfirmButton: true,
                    closeOnConfirm: false,
                    closeOnCancel: false,
                    confirmButtonColor: "#009688",
                    icon: "error"
                });
                return false
            }
        }else{
            Swal.fire({
                title: "กรุณาเลือกเจ้าของใบอนุญาต",
                width: "30%",
                showConfirmButton: true,
                closeOnConfirm: false,
                closeOnCancel: false,
                confirmButtonColor: "#009688",
                icon: "error"
            });
            return false
        }
       
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