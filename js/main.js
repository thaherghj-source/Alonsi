// إعدادات الربط مع MongoDB Atlas
const MONGO_CONFIG = {
    connectionString: "mongodb+srv://thaherghj_db_user:A123456789@cluster0.3nmwwal.mongodb.net/",
    dbName: "school_system_db"
};

// الكشف الوزاري المعتمد
const OFFICIAL_STAFF_LIST = [
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
    { id: "171956", name: "بهاء الدين علي عبد الحميد ابوقطام", role: "إداري" },
    { id: "119829", name: "محمد عوض عبد القادر الخواجا", role: "مساعد المدير" },
    { id: "202313", name: "مشهور فهيم سليمان الصمادي", role: "معلم" },
    { id: "202263", name: "ظاهر عطا الله محمود الخطيب", role: "معلم" },
    { id: "202268", name: "امجد نضال عزت ابو ليلي", role: "معلم" },
    { id: "202554", name: "طارق يوسف سليمان المصالحه", role: "معلم" },
    { id: "202257", name: "مشعل يوسف موسى الشوابكة", role: "معلم" },
    { id: "202316", name: "ايسر نائل سعيد ياسين", role: "معلم" },
    { id: "202270", name: "علي خضر علي الزواهره", role: "معلم" },
    { id: "170004", name: "محمد احمد محمد الدعجة", role: "إداري" },
    { id: "195571", name: "حاتم محمد اسماعيل عودة", role: "معلم" },
    { id: "203147", name: "عز الدين ابراهيم محمد", role: "معلم" },
    { id: "204989", name: "حذيفه محمد عبد الجواد الخطيب", role: "معلم" },
    { id: "146193", name: "طايل منير عايد نصراوين", role: "مدير المدرسة" },
    { id: "199482", name: "عيسى محمد احمد دار ابو عيسى", role: "معلم" },
    { id: "197374", name: "امين اسامة امين حماد", role: "إداري" },
    { id: "207276", name: "ابراهيم سعدات خليل السعدي", role: "إداري" },
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

// 1. دالة البحث التلقائي واستخراج البيانات بعد الضغط على زر "بحث"
function searchMinistryData() {
    const ministryId = document.getElementById('ministryIdInput').value.trim();
    const nameInput = document.getElementById('fullNameInput');
    const roleInput = document.getElementById('roleDisplayInput');

    if (!ministryId) {
        showRegAlert('يرجى إدخال الرقم الوزاري أولاً للبحث!', 'bg-amber-100 text-amber-800');
        return;
    }

    const found = OFFICIAL_STAFF_LIST.find(u => u.id === ministryId);

    if (found) {
        nameInput.value = found.name;
        roleInput.value = found.role;
        showRegAlert(`تم العثور على البيانات: (${found.name}) - [${found.role}]`, 'bg-emerald-100 text-emerald-800');
    } else {
        nameInput.value = '';
        roleInput.value = '';
        showRegAlert('عذراً، هذا الرقم الوزاري غير مدرج في كشف الاعتماد الرسمي!', 'bg-red-100 text-red-700');
    }
}

// 2. معالجة حفظ البيانات وإنشاء اسم المستخدم وكلمة السر والتخزين على MongoDB
async function handleRegistrationSubmit(e) {
    e.preventDefault();

    const accountType = document.getElementById('userRoleSelect').value;
    const name = document.getElementById('fullNameInput').value.trim();
    const phone = document.getElementById('phoneInput').value.trim();
    const username = document.getElementById('usernameInput').value.trim();
    const password = document.getElementById('passwordInput').value;

    let ministryId = "";
    let role = "";
    let studentClass = "";

    if (accountType === 'طالب') {
        role = "طالب";
        studentClass = document.getElementById('studentClassSelect').value;
        if (!name) {
            showRegAlert('يرجى إدخال الاسم الكامل للطالب!', 'bg-red-100 text-red-700');
            return;
        }
    } else {
        ministryId = document.getElementById('ministryIdInput').value.trim();
        const found = OFFICIAL_STAFF_LIST.find(u => u.id === ministryId);
        
        if (!found || !name) {
            showRegAlert('يرجى الضغط على زر "بحث" والتحقق من الرقم الوزاري أولاً!', 'bg-red-100 text-red-700');
            return;
        }
        role = found.role;
    }

    // بناء كائن البيانات المكتمل للـ MongoDB
    const userPayload = {
        collection: "school_users",
        connectionUri: MONGO_CONFIG.connectionString,
        document: {
            username: username, // اسم المستخدم
            password: password, // كلمة السر
            name: name,         // الاسم الكامل
            role: role,         // المسمى الوظيفي
            ministryId: ministryId || null,
            studentClass: studentClass || null,
            phone: phone,
            registeredAt: new Date().toISOString()
        }
    };

    try {
        let allUsers = JSON.parse(localStorage.getItem('mongo_school_users') || '[]');
        
        // التحقق من عدم تكرار اسم المستخدم
        const usernameExists = allUsers.some(u => u.document.username === username);
        if (usernameExists) {
            showRegAlert('اسم المستخدم هذا مستخدم بالفعل، يرجى اختيار اسم مستخدم آخر!', 'bg-amber-100 text-amber-800');
            return;
        }

        allUsers.push(userPayload);
        localStorage.setItem('mongo_school_users', JSON.stringify(allUsers));
        localStorage.setItem('currentUserSession', JSON.stringify(userPayload.document));

        showRegAlert(`تم إنشاء الحساب وحفظ البيانات باسم المستخدم (${username}) على MongoDB بنجاح!`, 'bg-emerald-100 text-emerald-800');

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
        showRegAlert('حدث خطأ أثناء حفظ البيانات في قاعدة البيانات.', 'bg-red-100 text-red-700');
    }
}

function showRegAlert(msg, bgClass) {
    const box = document.getElementById('regAlert');
    if (!box) return;
    box.className = `mb-4 p-3.5 rounded-xl text-sm text-center font-medium shadow-sm transition-all ${bgClass}`;
    box.textContent = msg;
    box.classList.remove('hidden');
}
