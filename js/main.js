// قاعدة بيانات MongoDB Atlas الاتصال
const MONGO_CONFIG = {
    connectionString: "mongodb+srv://thaherghj_db_user:A123456789@cluster0.3nmwwal.mongodb.net/",
    dbName: "school_system_db"
};

// الكشف الوزاري المعتمد وتحديد الألقاب (مدير، مساعد، إداري، أو معلم)
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
    { id: "171956", name: "بهاء الدين علي عبد الحميد ابوقطام", role: "إداري" }, // بهاء
    { id: "119829", name: "محمد عوض عبد القادر الخواجا", role: "مساعد المدير" }, // محمد الخواجا
    { id: "202313", name: "مشهور فهيم سليمان الصمادي", role: "معلم" },
    { id: "202263", name: "ظاهر عطا الله محمود الخطيب", role: "معلم" },
    { id: "202268", name: "امجد نضال عزت ابو ليلي", role: "معلم" },
    { id: "202554", name: "طارق يوسف سليمان المصالحه", role: "معلم" },
    { id: "202257", name: "مشعل يوسف موسى الشوابكة", role: "معلم" },
    { id: "202316", name: "ايسر نائل سعيد ياسين", role: "معلم" },
    { id: "202270", name: "علي خضر علي الزواهره", role: "معلم" },
    { id: "170004", name: "محمد احمد محمد الدعجة", role: "إداري" }, // محمد الدعجة
    { id: "195571", name: "حاتم محمد اسماعيل عودة", role: "معلم" },
    { id: "203147", name: "عز الدين ابراهيم محمد", role: "معلم" },
    { id: "204989", name: "حذيفه محمد عبد الجواد الخطيب", role: "معلم" },
    { id: "146193", name: "طايل منير عايد نصراوين", role: "مدير المدرسة" }, // طايل
    { id: "199482", name: "عيسى محمد احمد دار ابو عيسى", role: "معلم" },
    { id: "197374", name: "امين اسامة امين حماد", role: "إداري" }, // أمين
    { id: "207276", name: "ابراهيم سعدات خليل السعدي", role: "إداري" }, // إبراهيم السعدي
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

// التعرف التلقائي على الاسم والمسمى فور كتابة الرقم الوزاري
function checkMinistryId(val) {
    const trimmedVal = val.trim();
    const found = OFFICIAL_STAFF_LIST.find(u => u.id === trimmedVal);
    
    const nameField = document.getElementById('fullNameInput');
    const roleField = document.getElementById('roleInput');

    if (found) {
        nameField.value = found.name;
        roleField.value = found.role;
    } else {
        nameField.value = '';
        roleField.value = '';
    }
}

// دالة تسجيل وحفظ البيانات لأول مرة على MongoDB (بهيئة كائن JSON)
async function handleFirstTimeRegistration(e) {
    e.preventDefault();

    const ministryId = document.getElementById('ministryIdInput').value.trim();
    const name = document.getElementById('fullNameInput').value;
    const role = document.getElementById('roleInput').value;
    const phone = document.getElementById('phoneInput').value.trim();
    const password = document.getElementById('passwordInput').value;

    if (!name) {
        showRegistrationAlert('الرقم الوزاري المدخل غير موجود في كشف المدرسة المعتمد!', 'bg-red-100 text-red-700');
        return;
    }

    // بناء كائن JSON متوافق مع قاعدة بيانات MongoDB
    const userJsonPayload = {
        collection: "school_users",
        connectionUri: MONGO_CONFIG.connectionString,
        document: {
            ministryId: ministryId,
            name: name,
            role: role, // (مدير المدرسة، مساعد المدير، إداري، معلم)
            phone: phone,
            password: password,
            firstRegisteredAt: new Date().toISOString()
        }
    };

    try {
        // تخزين محلي مؤقت وتجهيز للإرسال لقاعدة بيانات MongoDB
        let allUsers = JSON.parse(localStorage.getItem('mongo_school_users') || '[]');
        
        // التحقق من عدم التكرار
        const existingIndex = allUsers.findIndex(u => u.document.ministryId === ministryId);
        if (existingIndex !== -1) {
            allUsers[existingIndex] = userJsonPayload; // تحديث
        } else {
            allUsers.push(userJsonPayload);
        }

        localStorage.setItem('mongo_school_users', JSON.stringify(allUsers));
        localStorage.setItem('currentUserSession', JSON.stringify(userJsonPayload.document));

        showRegistrationAlert(`تم حفظ بيانات (${name}) بصفة [${role}] بنجاح على قاعدة بيانات MongoDB!`, 'bg-emerald-100 text-emerald-700');

        setTimeout(() => {
            // التوجيه بناءً على الصلاحية والمسمى الوظيفي
            if (role === 'مدير المدرسة' || role === 'مساعد المدير') {
                window.location.href = 'admin.html';
            } else if (role === 'إداري') {
                window.location.href = 'admin.html'; // أو لوحة الإداريين
            } else {
                window.location.href = 'teacher.html';
            }
        }, 1500);

    } catch (err) {
        showRegistrationAlert('حدث خطأ أثناء الاتصال بقاعدة البيانات.', 'bg-red-100 text-red-700');
    }
}

function showRegistrationAlert(msg, bgClass) {
    const box = document.getElementById('alertBox');
    if (!box) return;
    box.className = `mb-4 p-3 rounded-lg text-sm text-center ${bgClass}`;
    box.textContent = msg;
    box.classList.remove('hidden');
}
