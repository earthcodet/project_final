$(function() {
  if($.datetimepicker != undefined){
    $.datetimepicker.setLocale("th"); // ต้องกำหนดเสมอถ้าใช้ภาษาไทย และ เป็นปี พ.ศ.
  
  // กรณีใช้แบบ inline
  /*  $("#datepicker4").datetimepicker({
      timepicker:false,
      format:'d-m-Y',  // กำหนดรูปแบบวันที่ ที่ใช้ เป็น 00-00-0000            
      lang:'th',  // ต้องกำหนดเสมอถ้าใช้ภาษาไทย และ เป็นปี พ.ศ.
      inline:true  
  });    */

  // กรณีใช้แบบ input
  $("#datepicker1").datetimepicker({
    timepicker: false,
    format: "d-m-Y", // กำหนดรูปแบบวันที่ ที่ใช้ เป็น 00-00-0000
    lang: "th", // ต้องกำหนดเสมอถ้าใช้ภาษาไทย และ เป็นปี พ.ศ.
    onSelectDate: function(dp, $input) {
      var yearT = new Date(dp).getFullYear();
      // if()
      var yearTH = yearT + 543;
      var fulldate = $input.val();
      var fulldateTH = fulldate.replace(yearT, yearTH);
      $input.val(fulldateTH);
    }
  });
  $('#datepicker1').keyup(function() {
    formatDate(this.value , 'datepicker1')
  });
  // กรณีใช้แบบ input
  $("#datepicker2").datetimepicker({
    timepicker: false,
    format: "d-m-Y", // กำหนดรูปแบบวันที่ ที่ใช้ เป็น 00-00-0000
    lang: "th", // ต้องกำหนดเสมอถ้าใช้ภาษาไทย และ เป็นปี พ.ศ.
    onSelectDate: function(dp, $input) {
      var yearT = new Date(dp).getFullYear();
      var yearTH = yearT + 543;
      var fulldate = $input.val();
      var fulldateTH = fulldate.replace(yearT, yearTH);
      $input.val(fulldateTH);
    }
  });
  $('#datepicker2').keyup(function() {
    formatDate(this.value , 'datepicker2')
  });
  // กรณีใช้แบบ input
  $("#datepicker3").datetimepicker({
    timepicker: false,
    format: "d-m-Y", // กำหนดรูปแบบวันที่ ที่ใช้ เป็น 00-00-0000
    lang: "th", // ต้องกำหนดเสมอถ้าใช้ภาษาไทย และ เป็นปี พ.ศ.
    onSelectDate: function(dp, $input) {
      var yearT = new Date(dp).getFullYear();
      var yearTH = yearT + 543;
      var fulldate = $input.val();
      var fulldateTH = fulldate.replace(yearT, yearTH);
      $input.val(fulldateTH);
    }
  });
  $('#datepicker3').keyup(function() {
    formatDate(this.value , 'datepicker3')
  });
  // กรณีใช้แบบ input
  $("#datepicker4").datetimepicker({
    timepicker: false,
    format: "d-m-Y", // กำหนดรูปแบบวันที่ ที่ใช้ เป็น 00-00-0000
    lang: "th", // ต้องกำหนดเสมอถ้าใช้ภาษาไทย และ เป็นปี พ.ศ.
    onSelectDate: function(dp, $input) {
      var yearT = new Date(dp).getFullYear();
      var yearTH = yearT + 543;
      var fulldate = $input.val();
      var fulldateTH = fulldate.replace(yearT, yearTH);
      $input.val(fulldateTH);
    }
  });
  $('#datepicker4').keyup(function() {
    formatDate(this.value , 'datepicker4')
  });
  // กรณีใช้แบบ input
  $("#datepicker5").datetimepicker({
    timepicker: false,
    format: "d-m-Y", // กำหนดรูปแบบวันที่ ที่ใช้ เป็น 00-00-0000
    lang: "th", // ต้องกำหนดเสมอถ้าใช้ภาษาไทย และ เป็นปี พ.ศ.
    onSelectDate: function(dp, $input) {
      var yearT = new Date(dp).getFullYear();
      var yearTH = yearT + 543;
      var fulldate = $input.val();
      var fulldateTH = fulldate.replace(yearT, yearTH);
      $input.val(fulldateTH);
    }
  });
  $('#datepicker5').keyup(function() {
    formatDate(this.value , 'datepicker5')
  });
  // กรณีใช้แบบ input
  $("#datepicker6").datetimepicker({
    timepicker: false,
    format: "d-m-Y", // กำหนดรูปแบบวันที่ ที่ใช้ เป็น 00-00-0000
    lang: "th", // ต้องกำหนดเสมอถ้าใช้ภาษาไทย และ เป็นปี พ.ศ.
    onSelectDate: function(dp, $input) {
      var yearT = new Date(dp).getFullYear();
      var yearTH = yearT + 543;
      var fulldate = $input.val();
      var fulldateTH = fulldate.replace(yearT, yearTH);
      $input.val(fulldateTH);
    }
  });
  $('#datepicker6').keyup(function() {
    formatDate(this.value , 'datepicker6')
  });
  // กรณีใช้แบบ input
  $("#datepicker7").datetimepicker({
    timepicker: false,
    format: "d-m-Y", // กำหนดรูปแบบวันที่ ที่ใช้ เป็น 00-00-0000
    lang: "th", // ต้องกำหนดเสมอถ้าใช้ภาษาไทย และ เป็นปี พ.ศ.
    onSelectDate: function(dp, $input) {
      var yearT = new Date(dp).getFullYear();
      var yearTH = yearT + 543;
      var fulldate = $input.val();
      var fulldateTH = fulldate.replace(yearT, yearTH);
      $input.val(fulldateTH);
    }
  });
  $('#datepicker7').keyup(function() {
    formatDate(this.value , 'datepicker7')
  });
  // กรณีใช้แบบ input
  $("#datepicker8").datetimepicker({
    timepicker: false,
    format: "d-m-Y", // กำหนดรูปแบบวันที่ ที่ใช้ เป็น 00-00-0000
    lang: "th", // ต้องกำหนดเสมอถ้าใช้ภาษาไทย และ เป็นปี พ.ศ.
    onSelectDate: function(dp, $input) {
      var yearT = new Date(dp).getFullYear();
      var yearTH = yearT + 543;
      var fulldate = $input.val();
      var fulldateTH = fulldate.replace(yearT, yearTH);
      $input.val(fulldateTH);
    }
  });
  $('#datepicker8').keyup(function() {
    formatDate(this.value , 'datepicker8')
  });

  $("#datepicker9").datetimepicker({
    timepicker: false,
    format: "d-m-Y", // กำหนดรูปแบบวันที่ ที่ใช้ เป็น 00-00-0000
    lang: "th", // ต้องกำหนดเสมอถ้าใช้ภาษาไทย และ เป็นปี พ.ศ.
    onSelectDate: function(dp, $input) {
      var yearT = new Date(dp).getFullYear();
      var yearTH = yearT + 543;
      var fulldate = $input.val();
      var fulldateTH = fulldate.replace(yearT, yearTH);
      $input.val(fulldateTH);
    }
  });
  $('#datepicker9').keyup(function() {
    formatDate(this.value , 'datepicker9')
  });
  $("#datepicker10").datetimepicker({
    timepicker: false,
    format: "d-m-Y", // กำหนดรูปแบบวันที่ ที่ใช้ เป็น 00-00-0000
    lang: "th", // ต้องกำหนดเสมอถ้าใช้ภาษาไทย และ เป็นปี พ.ศ.
    onSelectDate: function(dp, $input) {
      var yearT = new Date(dp).getFullYear();
      var yearTH = yearT + 543;
      var fulldate = $input.val();
      var fulldateTH = fulldate.replace(yearT, yearTH);
      $input.val(fulldateTH);
    }
  });
  $('#datepicker10').keyup(function() {
    formatDate(this.value , 'datepicker10')
  });
  $("#datepicker11").datetimepicker({
    timepicker: false,
    format: "d-m-Y", // กำหนดรูปแบบวันที่ ที่ใช้ เป็น 00-00-0000
    lang: "th", // ต้องกำหนดเสมอถ้าใช้ภาษาไทย และ เป็นปี พ.ศ.
    onSelectDate: function(dp, $input) {
      var yearT = new Date(dp).getFullYear();
      var yearTH = yearT + 543;
      var fulldate = $input.val();
      var fulldateTH = fulldate.replace(yearT, yearTH);
      $input.val(fulldateTH);
    }
  });
  $('#datepicker11').keyup(function() {
    formatDate(this.value , 'datepicker11')
  });
  // กรณีใช้กับ input ต้องกำหนดส่วนนี้ด้วยเสมอ เพื่อปรับปีให้เป็น ค.ศ. ก่อนแสดงปฏิทิน
  // $("#datepicker8").on("mouseenter mouseleave", function(e) {
  //   var dateValue = $(this).val();
  //   if (dateValue != "") {
  //     var arr_date = dateValue.split("-"); // ถ้าใช้ตัวแบ่งรูปแบบอื่น ให้เปลี่ยนเป็นตามรูปแบบนั้น
  //     // ในที่นี้อยู่ในรูปแบบ 00-00-0000 เป็น d-m-Y  แบ่งด่วย - ดังนั้น ตัวแปรที่เป็นปี จะอยู่ใน array
  //     //  ตัวที่สอง arr_date[2] โดยเริ่มนับจาก 0
  //     if (e.type == "mouseenter") {
  //       var yearT = arr_date[2] - 543;
  //     }
  //     if (e.type == "mouseleave") {
  //       var yearT = parseInt(arr_date[2]) + 543;
  //     }
  //     dateValue = dateValue.replace(arr_date[2], yearT);
  //     $(this).val(dateValue);
  //   }
  // });

  }
});