function openReport() {
    let tempNow = new Date().toISOString().slice(0, 7)
    let t_a = tempNow.split('-')
    let year = parseInt(t_a[0]) + 543
    let mon = parseInt(t_a[1])

    let s_mon = parseInt(document.getElementById('mon').value)
    let s_year = parseInt(document.getElementById('year').value)

    if (s_year > year) {
        Swal.fire({
            html: "ไม่สามารถเลือกวันที่เกินวันที่ปัจจุบันได้",
            icon: "error",
            confirmButtonColor: "#009688"
        })
    } else if (s_mon > mon) {
        Swal.fire({
            html: "ไม่สามารถเลือกวันที่เกินวันที่ปัจจุบันได้",
            icon: "error",
            confirmButtonColor: "#009688"
        })
    } else {
        if (s_mon === mon && s_year === year) {
            Swal.fire({
                html: "ไม่สามารถเลือกเดือนปัจจุบันได้ หากยังไม่สิ้นเดือน",
                icon: "error",
                confirmButtonColor: "#009688"
            })
        } else {
            let text_url = `../report/report_summary_preview.html`
            text_url = `${text_url}?m_id=${s_mon}&y_id=${s_year}`
            window.open(text_url, '_blank');
        }
    }
}
document.getElementById('mon').value = parseInt(new Date().toISOString().slice(5, 7)) - 1
document.getElementById('year').value = parseInt(new Date().toISOString().slice(0, 4)) + 543