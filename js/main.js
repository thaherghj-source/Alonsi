// بيانات الاتصال الخاصة بقاعدة بيانات MongoDB Atlas
const MONGO_CONFIG = {
    connectionString: "mongodb+srv://thaherghj_db_user:A123456789@cluster0.3nmwwal.mongodb.net/",
    dbName: "school_system_db"
};

// كشف الكادر المدرسي المعتمد رسمياً (مرفق بالكامل مع الأرقام والرتب)
const OFFICIAL_STAFF_DATABASE = [
    { id: "146193", name: "طايل منير عايد نصراوين", role: "مدير المدرسة" },
    { id: "119829", name: "محمد عوض عبد القادر الخواجا", role: "مساعد المدير" },
    { id: "171956", name: "بهاء الدين علي عبد الحميد ابوقطام", role: "إداري" },
    { id: "170004", name: "محمد احمد محمد الدعجة", role: "إداري" },
    { id: "197374", name: "امين اسامة امين حماد", role: "إداري" },
    { id: "207276", name: "ابراهيم سعدات خليل السعدي", role: "إداري" },
    { id: "171886", name: "محمد عبد الرحمن هاشم رمزي", role: "معلم" },
    { id: "172703", name: "رباح احمد محمود الفصيلات", role: "معلم" },
    { id: "196057", name: "ثائر فريد احمد يحيى", role: "معلم" },
    { id: "195360", name: "احمد محمد عبد الرحيم ابوعناب", role: "معلم" },
    { id: "197513", name: "معتز أحمد محمد جانم", role: "معلم" },
    { id: "170272", name: "محمد قاسم محمد قصقص", role: "معلم" },
    { id: "158390", name: "ابراهيم سعيد محمد الراعي", role: "معلم" },
    { id: "202276", name: "احمد محمد هاشم محمد", role: "معلم" },
    { id: "202260", name: "خالد عبدالله محمد البشير", role: "معلم" },
    { id: "202555", name: "علاء احمد حسين الدعامسه", role: "معلم" },
    { id: "202313", name: "مشهور فهيم سليمان الصمادي", role: "معلم" },
    { id: "202263", name: "ظاهر عطا الله محمود الخطيب", role: "معلم" },
    { id: "202268", name: "امجد نضال عزت ابو ليلي", role: "معلم" },
    { id: "202554", name: "طارق يوسف سليمان المصالحه", role: "معلم" },
    { id: "202257", name: "مشعل يوسف موسى الشوابكة", role: "معلم" },
    { id: "202316", name: "ايسر نائل سعيد ياسين", role: "معلم" },
    { id: "202270", name: "علي خضر علي الزواهره", role: "معلم" },
    { id: "195571", name: "حاتم محمد اسماعيل عودة", role: "معلم" },
    { id: "203147", name: "عز الدين ابراهيم محمد", role: "معلم" },
    { id: "204989", name: "حذيفه محمد عبد الجواد الخطيب", role: "معلم" },
    { id: "199482", name: "عيسى محمد احمد دار ابو عيسى", role: "معلم" },
    { id: "208687", name: "بشار خلف مصطفى العايد", role: "معلم" },
    { id: "207234", name: "يزيد محمود احمد الكعابنة", role: "معلم" },
    { id: "1886210", name: "غسان مهدي احميدي", role: "معلم" },
    { id: "217510", name: "يوسف محمد ابراهيم خواجه", role: "معلم" },
    { id: "214053", name: "محمد سالم مصطفى العايد", role: "معلم" },
    { id: "220551", name: "مؤمن محمد توفيق عبد ربه", role: "معلم" },
    { id: "161924", name: "مالك عبدالله محسن النويري", role: "معلم" },
    { id: "218921", name: "علاء الدين احمد صادق عبد الرحمن", role: "معلم" },
    { id: "223758", name: "محمد خير محمد نذير المصري", role: "معلم" },
    { id: "227731", name: "حسن جاسر صبحي ابو الريش", role: "معلم" },
    { id: "158461", name: "محمد عبد الفتاح طه خليل", role: "معلم" },
    { id: "200040301", name: "محمد وليد محمد الجندي", role: "معلم" }
];

// 1. تعبئة القائمة المنسدلة لأسماء الكادر برمجياً
function populateStaffDropdown() {
    const select = document.getElementById('staffNameSelect');
    if (!select) return;

    select.innerHTML = '<option value="">-- اختر الاسم من القائمة --</option>';
    OFFICIAL_STAFF_DATABASE.forEach(staff => {
        const option = document.createElement('option');
        option.value = staff.id;
        option.textContent = staff.name;
        select.appendChild(option);
    });
}

// 2. التنقل بين قسم الكادر المالي وقسم الطلاب
function switchRegistrationSection() {
    const section = document.getElementById('sectionSelect').value;
    const staffSection = document.getElementById('staffSection');
    const studentSection = document.getElementById('studentSection');

    if (section === 'student') {
        staffSection.classList.add('hidden');
        studentSection.classList.remove('hidden');
    } else {
        staffSection.classList.remove('hidden');
        studentSection.classList.add('hidden');
    }
}

// 3. التفاعل عند اختيار اسم من قائمة الكادر المنسدلة
function onStaffNameSelectChange() {
    const selectedId = document.getElementById('staffNameSelect').value;
    const ministryGroup = document.getElementById('ministryCheckGroup');
    const roleGroup = document.getElementById('staffRoleDisplayGroup');
    const roleInput = document.getElementById('staffRoleInput');

    if (selectedId) {
        const found = OFFICIAL_STAFF_DATABASE.find(s => s.id === selectedId);
        if (found) {
            roleInput.value = found.role;
            ministryGroup.classList.remove('hidden');
            roleGroup.classList.remove('hidden');
        }
    } else {
        ministryGroup.classList.add('hidden');
        roleGroup.classList.add('hidden');
    }
}

// 4. معالجة وحفظ البيانات وصياغة كائن JSON المخصص لرفع MongoDB Atlas
async function handleRegistrationSubmit(e) {
    e.preventDefault();

    const section = document.getElementById('sectionSelect').value;
    const phone = document.getElementById('phoneInput').value.trim();
    const username = document.getElementById('usernameInput').value.trim();
    const password = document.getElementById('passwordInput').value;

    let fullName = "";
    let role = "";
    let ministryId = "";
    let studentClass = "";

    if (section === 'staff') {
        const staffSelectId = document.getElementById('staffNameSelect').value;
        const enteredMinistryId = document.getElementById('staffMinistryInput').value.trim();

        if (!staffSelectId) {
            showRegAlert('يرجى اختيار اسمك من قائمة الكادر المدرسي أولاً!', 'bg-amber-100 text-amber-800 border border-amber-300');
            return;
        }

        const matchedStaff = OFFICIAL_STAFF_DATABASE.find(s => s.id === staffSelectId);

        // مطابقة الرقم الوزاري المُدخل مع الرقم الوزاري المسجل للاسم
        if (!enteredMinistryId || enteredMinistryId !== matchedStaff.id) {
            showRegAlert(`الرقم الوزاري غير مطابق للاسم المحدد (${matchedStaff.name})! يرجى التأكد من الرقم.`, 'bg-red-100 text-red-700 border border-red-300');
            return;
        }

        fullName = matchedStaff.name;
        role = matchedStaff.role;
        ministryId = matchedStaff.id;

    } else {
        // قسم الطلاب وأولياء الأمور
        fullName = document.getElementById('studentFullNameInput').value.trim();
        const grade = document.getElementById('studentGradeSelect').value;
        const sec = document.getElementById('studentSectionSelect').value;

        if (!fullName) {
            showRegAlert('يرجى كتابة الاسم الكامل للطالب/ولي الأمر!', 'bg-amber-100 text-amber-800 border border-amber-300');
            return;
        }

        role = "طالب";
        studentClass = `${grade} - ${sec}`;
    }

    // بناء كائن JSON متوافق مع بنية MongoDB Atlas
    const mongoDocumentPayload = {
        collection: "school_users",
        connectionUri: MONGO_CONFIG.connectionString,
        document: {
            username: username,
            password: password,
            fullName: fullName,
            role: role, // التصنيف (مدير المدرسة / مساعد المدير / إداري / معلم / طالب)
            ministryId: ministryId || null,
            studentClass: studentClass || null,
            phone: phone,
            createdAt: new Date().toISOString()
        }
    };

    try {
        let storedUsers = JSON.parse(localStorage.getItem('mongo_school_users') || '[]');

        // التحقق من أن اسم المستخدم فريد ولم يتكرر
        const isUsernameTaken = storedUsers.some(u => u.document.username === username);
        if (isUsernameTaken) {
            showRegAlert('اسم المستخدم محجوز مسبقاً! يرجى اختيار اسم مستخدم آخر.', 'bg-amber-100 text-amber-800 border border-amber-300');
            return;
        }

        storedUsers.push(mongoDocumentPayload);
        localStorage.setItem('mongo_school_users', JSON.stringify(storedUsers));
        localStorage.setItem('currentUserSession', JSON.stringify(mongoDocumentPayload.document));

        showRegAlert(`تم تسجيل الحساب بنجاح وتجهيز بيانات (${fullName}) بصفة [${role}] لحفظها في MongoDB!`, 'bg-emerald-100 text-emerald-800 border border-emerald-300');

        setTimeout(() => {
            if (role === 'مدير المدرسة' || role === 'مساعد المدير' || role === 'إداري') {
                window.location.href = 'admin.html';
            } else if (role === 'معلم') {
                window.location.href = 'teacher.html';
            } else {
                window.location.href = 'student-dashboard.html';
            }
        }, 1500);

    } catch (err) {
        showRegAlert('حدث خطأ أثناء حفظ البيانات.', 'bg-red-100 text-red-700 border border-red-300');
    }
}

function showRegAlert(msg, bgClass) {
    const box = document.getElementById('regAlert');
    if (!box) return;
    box.className = `mb-5 p-3.5 rounded-xl text-sm text-center font-bold shadow-sm transition-all ${bgClass}`;
    box.textContent = msg;
    box.classList.remove('hidden');
}
