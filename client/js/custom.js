$().ready(function () {

    // validate the comment form when it is submitted
   

    // validate signup form on keyup and submit
    $("#signupForm").validate({
        rules: {
            numPeople:{
                required:true,
                number:true
            },
            agree: "required"
        },
        messages: {
            name: {
                required: "กรุณาใส่ชื่อ - สกุล",
                maxlength: "ไม่เกิน 50 อักษร"
            },
            username: {
                required: "กรุณาใส่ชื่อผู้ใช้งาน",
                rangelength: "ไม่ต่ำกว่า 6 และไม่เกิน 10 ตัวอักษร"
            },
            password: {
                required: "กรุณาใส่ชื่อรหัสผ่าน",
                minlength: "ไม่ต่ำกว่า 8 ตัวอักษร"
            },
            confirm_password: {
                required: "กรุณาใส่ชื่อรหัสผ่าน",
                minlength: "ไม่ต่ำกว่า 8 ตัวอักษร",
                equalTo: "ให้เหมือนกับรหัสผ่าน"
            },
             email: {
                required: "กรุณาใส่ Email",
                email: "กรุณาตรวจสอบความถูกต้อง"
            },
            bd: {
                required: "กรุณาใส่วันเดือนปีเกิด",
                date:"กรุณาตรวจสอบความถูกต้อง"
            },
            url: {
                required: "กรุณาใส่ URL",
                url:"เช่น http://www.google.com"
            },
            tel_num:{
                required:"กรุณาใส่หมายเลขโทรศัพท์",
                number:"กรุณาใส่เฉพาะหมายเลขเท่านั้น"
            },
            fax_num:{
                number:"กรุณาใส่เฉพาะหมายเลขเท่านั้น"
            },
            credit_card: {
                required: "กรุณาใส่หมายเลขบัตรเครดิต",
                creditcard:"กรุณาตรวจสอบความถูกต้อง"
            },
            agree: "Please accept our policy"
        }
    });

});