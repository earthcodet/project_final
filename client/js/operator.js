var temp = false
var add = false
var insert = true
function addNewPage() {
    disFunction()
    add = true
    document.getElementById('saveMenu').classList.remove('disableds')
    document.getElementById('addMenu').classList.add('disableds')
}

function deleteDisable() {
    //addMenu
    //editMenu
    //saveMenu
    //restoreMenu
    //deleteMenu

    document.getElementById('addMenu').classList.add('disableds')
    document.getElementById('saveMenu').classList.add('disableds')
    document.getElementById('editMenu').classList.remove('disableds')
    document.getElementById('restoreMenu').classList.remove('disableds')
    document.getElementById('deleteMenu').classList.remove('disableds')
}

function insertTEST() {
    var a = confirm("ต้องการบันทึกหรือไม่")
    if (a) {
        deleteDisable()
        enableFunction()
    }
}