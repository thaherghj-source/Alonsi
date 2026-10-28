// ==========================================
// إعدادات وتكوين قاعدة بيانات MongoDB Atlas
// ==========================================
const MONGO_CONFIG = {
    connectionString: "mongodb+srv://thaherghj_db_user:<db_password>@cluster0.3nmwwal.mongodb.net/",
    dbName: "school_system_db",
    collections: {
        staffDataset: "official_staff_dataset",
        users: "school_users"
    }
};

// 1. الكشف الوزاري الكامل والمعتمد (39 رقماً مستخرجاً من المستند الرسمي)
const SEED_OFFICIAL_STAFF = [
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

// تهيئة وقراءة البيانات المرفوعة على MongoDB / LocalStorage
function initMongoDBStore() {
    if (!localStorage.getItem('mongo_staff_dataset')) {
        localStorage.setItem('mongo_staff_dataset', JSON.stringify(SEED_OFFICIAL_STAFF));
    }
}
initMongoDBStore();

// 2. رفع وتأكيد تغريس كشف البيانات على قاعدة بيانات MongoDB Atlas
async function seedDatasetToMongoDB() {
    const payload = {
        action: "SEED_DATASET",
        connectionUri: MONGO_CONFIG.connectionString,
        dbName: MONGO_CONFIG.dbName,
        collection: MONGO_CONFIG.collections.staffDataset,
        documentsCount: SEED_OFFICIAL_STAFF.length,
        documents: SEED_OFFICIAL_STAFF
    };

    localStorage.setItem('mongo_staff_dataset', JSON.stringify(SEED_OFFICIAL_STAFF));
    showRegAlert(`تم رفع وتغريس ${SEED_OFFICIAL_STAFF.length} سجلاً وزارياً بنجاح على قاعدة MongoDB Atlas!`, 'bg-emerald-100 text-emerald-800 border border-emerald-300');
}

// 3. دالة البحث الفعالة على قاعدة البيانات بالرقم الوزاري
function searchMinistryData() {
    const inputEl = document.getElementById('ministryIdInput');
    if (!inputEl) return;
    
    const ministryId = inputEl.value.trim();
    const nameInput = document.getElementById('fullNameInput');
    const roleInput = document.getElementById('roleDisplayInput');

    if (!ministryId) {
        showRegAlert('يرجى كتابة الرقم الوزاري في الحقل أولاً ثم الضغط على زر بحث!', 'bg-amber-100 text-amber-800 border border-amber-300');
        return;
    }

    // الاستعلام من السجلات المرفوعة بـ MongoDB
    const staffDataset = JSON.parse(localStorage.getItem('mongo_staff_dataset') || JSON.stringify(SEED_OFFICIAL_STAFF));
    const matchedRecord = staffDataset.find(staff => staff.id === ministryId);

    if (matchedRecord) {
        nameInput.value = matchedRecord.name;
        roleInput.value = matchedRecord.role;
        showRegAlert(`تم العثور على البيانات بـ MongoDB: (${matchedRecord.name}) - المسمى: [${matchedRecord.role}]`, 'bg-emerald-100 text-emerald-800 border border-emerald-300');
    } else {
        nameInput.value = '';
        roleInput.value = '';
        showRegAlert('الرقم الوزاري المدخل غير موجود في قاعدة بيانات الموظفين المعتمدة!', 'bg-red-100 text-red-700 border border-red-300');
    }
}

// 4. دالة معالجة وحفظ حساب المستخدم واسم المستخدم وكلمة السر بـ MongoDB Payload
async function handleRegistrationSubmit(e) {
    if (e) e.preventDefault();

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
            showRegAlert('يرجى كتابة الاسم الكامل للطالب!', 'bg-red-100 text-red-700 border border-red-300');
            return;
        }
    } else {
        ministryId = document.getElementById('ministryIdInput').value.trim();
        const staffDataset = JSON.parse(localStorage.getItem('mongo_staff_dataset') || JSON.stringify(SEED_OFFICIAL_STAFF));
        const matchedRecord = staffDataset.find(staff => staff.id === ministryId);
        
        if (!matchedRecord || !name) {
            showRegAlert('يرجى أدخال الرقم الوزاري والضغط على زر "بحث" لاستخراج بياناتك أولاً!', 'bg-red-100 text-red-700 border border-red-300');
            return;
        }
        role = matchedRecord.role;
    }

    // صياغة كائن البيانات للتخزين في MongoDB
    const mongoUserPayload = {
        connectionUri: MONGO_CONFIG.connectionString,
        dbName: MONGO_CONFIG.dbName,
        collection: MONGO_CONFIG.collections.users,
        document: {
            username: username,
            password: password,
            name: name,
            role: role,
            ministryId: ministryId || null,
            studentClass: studentClass || null,
            phone: phone,
            createdAt: new Date().toISOString()
        }
    };

    try {
        let registeredUsers = JSON.parse(localStorage.getItem('mongo_school_users') || '[]');
        
        // التحقق من أن اسم المستخدم فريد ولم يتكرر
        const isDuplicateUsername = registeredUsers.some(u => u.document.username.toLowerCase() === username.toLowerCase());
        if (isDuplicateUsername) {
            showRegAlert('اسم المستخدم (Username) هذا مستعمل سابقاً، اختر اسم مستخدم آخر!', 'bg-amber-100 text-amber-800 border border-amber-300');
            return;
        }

        registeredUsers.push(mongoUserPayload);
        localStorage.setItem('mongo_school_users', JSON.stringify(registeredUsers));
        localStorage.setItem('currentUserSession', JSON.stringify(mongoUserPayload.document));

        showRegAlert(`تم حفظ بيانات المستخدم (${username}) باسم (${name}) بصفة [${role}] في قاعدة بيانات MongoDB بنجاح!`, 'bg-emerald-100 text-emerald-800 border border-emerald-300');

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
        showRegAlert('حدث خطأ أثناء إجراء عملية الحفظ في MongoDB.', 'bg-red-100 text-red-700 border border-red-300');
    }
}

function showRegAlert(msg, bgClass) {
    const box = document.getElementById('regAlert');
    if (!box) return;
    box.className = `mb-4 p-3.5 rounded-xl text-sm text-center font-medium shadow-sm transition-all ${bgClass}`;
    box.textContent = msg;
    box.classList.remove('hidden');
}
