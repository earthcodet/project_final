function set_cal(ele) {
  //function สร้างตัวเลือกปฎิทิน
  $(ele).datepicker({
    onSelect: date_text => {
      let arr = date_text.split("/");
      let new_date =
        arr[0] + "/" + arr[1] + "/" + (parseInt(arr[2]) + 543).toString();
      $(ele).val(new_date);
      $(ele).css("color", "");
    },
    beforeShow: () => {
      if ($(ele).val() != "") {
        let arr = $(ele)
          .val()
          .split("/");
        let new_date =
          arr[0] + "/" + arr[1] + "/" + (parseInt(arr[2]) - 543).toString();
        $(ele).val(new_date);
      }

      $(ele).css("color", "white");
    },
    onClose: () => {
      $(ele).css("color", "");

      if ($(ele).val() != "") {
        let arr = $(ele)
          .val()
          .split("/");
        if (parseInt(arr[2]) < 2500) {
          let new_date =
            arr[0] + "/" + arr[1] + "/" + (parseInt(arr[2]) + 543).toString();
          $(ele).val(new_date);
        }
      }
    },
    dateFormat: "dd/mm/yy", //กำหนดรูปแบบวันที่เป็น วัน/เดือน/ปี
    changeMonth: true, //กำหนดให้เลือกเดือนได้
    changeYear: true, //กำหนดให้เลือกปีได้
    showOtherMonths: true //กำหนดให้แสดงวันของเดือนก่อนหน้าได้
  });
}

$(document).ready(function() {
  //เรียก function set_cal เมื่อเปิดหน้าเว็บ โดยส่ง object element ที่มี id เป็น datepicker เป็นพารามิเตอร์
  set_cal($("#datepicker1"));
  set_cal($("#datepicker2"));
  set_cal($("#datepicker3"));
  set_cal($("#datepicker4"));
});
