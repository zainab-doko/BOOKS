document.addEventListener("DOMContentLoaded", function () {
  

  // إضافة مستمع الحدث لكل زر راديو
  document.querySelectorAll('input[type="radio"][name="radio-group"]').forEach(radio => {
    radio.addEventListener('click', function () {
      showDataInMessage(this);
    });
  });

  function enableButton() {
    document.getElementById("showForm").disabled = false;
  }

  // تمكين زر الإرسال عند اختيار كتاب
  document.querySelectorAll('input[type="radio"][name="radio-group"]').forEach(radio => {
    radio.addEventListener('change', enableButton);
  });

  const checkboxes = document.getElementsByName('showd');

  // إظهار/إخفاء التفاصيل عند تحديد مربع الاختيار
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('change', (event) => {
      const checkbox = event.target;
      const nextRow = checkbox.parentElement.parentElement.nextElementSibling;

      if (checkbox.checked) {
        nextRow.style.display = 'table-row';
      } else {
        nextRow.style.display = 'none';
      }
    });
  }

  // عرض النموذج عند النقر على زر متابعة
  function toggleForm() {
    var form = document.getElementById("myForm");
    if (form.style.display === "none" || form.style.display === "") {
      form.style.display = "block";
    } else {
      form.style.display = "none";
    }
  }

  // التحقق من الحقول وإظهار تفاصيل الكتاب
  function validateForm() {
    var email = document.getElementById("email").value;
    var number_s = document.getElementById("number_s").value;
    var date1 = document.getElementById("date1").value;
    var phone = document.getElementById("phonenumber").value;
    var username = document.getElementById("myUsername").value;

    // التحقق من تعبئة الحقول الإلزامية
    if (number_s == "") {
      alert("يرجى ملء جميع الحقول الإلزامية");
      return false;
    }
    var usernamePattern = /^[\u0600-\u06FF\s]*$/;
    if (!usernamePattern.test(username)) {
      alert("الرجاء إدخال الاسم باللغة العربية بدون أرقام أو رموز");
      return false;
    }
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$|^$/;
    if (!emailPattern.test(email)) {
      alert("يرجى إدخال عنوان بريد إلكتروني صالح");
      return false;
    }

    var numberPattern = /^(0[1-9]|1[0-5])[0-9]{9}$/;
    if (!numberPattern.test(number_s)) {
      alert("يرجى إدخال رقم وطني صالح بين 01 و 15");
      return false;
    }

    var datePattern = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$|^$/;
    if (!datePattern.test(date1)) {
      alert("يرجى إدخال تاريخ ميلاد صالح بتنسيق MM/DD/YYYY");
      return false;
    }

    var phonePattern = /((0)(93|94|95|96|98|99)([0-9]{7}))|((0)(92|95|96|97)([0-9]{7}))|^$/;
    if (!phonePattern.test(phone)) {
      alert("يرجى إدخال رقم هاتف صالح مع رمز البلد (مثال: 0931234567)");
      return false;
    }

    // عرض تفاصيل الكتاب الذي تم اختياره
    const selectedBook = document.querySelector('input[type="radio"][name="radio-group"]:checked');
    if (selectedBook) {
      const row = selectedBook.closest('tr');
      const bookDetails = `تفاصيل الكتاب المختار:\n` +
        `ISBN: ${row.cells[0].textContent}\n` +
        `العنوان: ${row.cells[1].textContent}\n` +
        `السعر: ${row.cells[2].textContent}`;
      alert(bookDetails); // عرض نافذة تحتوي على تفاصيل الكتاب
    } else {
      alert("يرجى اختيار كتاب قبل الإرسال");
      return false;
    }

    return true; // العملية نجحت
  }

  // تخزين بيانات الكتاب في رسالة
  var message = "";
  function showDataInMessage(radioElement) {
    var row = radioElement.closest('tr');
    message = 'الكتاب: ' + row.cells[0].textContent + ', ' +
      'تفاصيل: ' + row.cells[1].textContent + ', ' +
      'السعر: ' + row.cells[2].textContent;
  }

  // إضافة الدوال إلى النافذة لتكون متاحة في HTML
  window.validateForm = validateForm;
  window.toggleForm = toggleForm;
});
