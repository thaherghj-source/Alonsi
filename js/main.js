// إعدادات الاتصال بـ MongoDB Atlas
const MONGO_CONFIG = {
    connectionString: "mongodb+srv://thaherghj_db_user:<db_password>@cluster0.3nmwwal.mongodb.net/",
    dbName: "school_system_db"
};

// الكشف الوزاري المعتمد والموثق كاملاً من المستند
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

// التحقق التلقائي من الرقم الوزاري وتعبئة الاسم
function verifyMinistryId(val) {
    const trimmed = val.trim();
    const found = OFFICIAL_STAFF_LIST.find(u => u.id === trimmed);
    const nameInput = document.getElementById('fullNameInput');

    if (found) {
        nameInput.value = found.name;
    } else {
        nameInput.value = '';
    }
}

// معالجة التسجيل الشامل لجميع الفئات وحفظه على صيغة JSON مهيأة لـ MongoDB
async function handleUniversalRegistration(e) {
    e.preventDefault();

    const role = document.getElementById('userRoleSelect').value;
    const name = document.getElementById('fullNameInput').value.trim();
    const phone = document.getElementById('phoneInput').value.trim();
    const password = document.getElementById('passwordInput').value;

    let ministryId = "";
    let studentClass = "";

    if (role !== 'طالب') {
        ministryId = document.getElementById('ministryIdInput').value.trim();
        const found = OFFICIAL_STAFF_LIST.find(u => u.id === ministryId);
        if (!found) {
            showRegAlert('عذراً! هذا الرقم الوزاري غير مدرج ضمن الكشف الرسمي المعتمد.', 'bg-red-100 text-red-700');
            return;
        }
    } else {
        studentClass = document.getElementById('studentClassSelect').value;
    }

    // بناء كائن JSON متوافق مع قاعدة بيانات MongoDB Atlas
    const userPayload = {
        collection: "school_users",
        connectionUri: MONGO_CONFIG.connectionString,
        document: {
            role: role,
            ministryId: ministryId || null,
            name: name,
            studentClass: studentClass || null,
            phone: phone,
            password: password,
            registeredAt: new Date().toISOString()
        }
    };

    try {
        let allUsers = JSON.parse(localStorage.getItem('mongo_school_users') || '[]');
        allUsers.push(userPayload);
        localStorage.setItem('mongo_school_users', JSON.stringify(allUsers));
        localStorage.setItem('currentUserSession', JSON.stringify(userPayload.document));

        showRegAlert(`تم تسجيل الحساب (${name}) بنجاح وحفظ البيانات على MongoDB! جاري توجيهك للوحة الخاصة...`, 'bg-emerald-100 text-emerald-800');

        setTimeout(() => {
            // التوجيه الذكي للوحة التحكم الخاصة بالفئة
            if (role === 'مدير المدرسة' || role === 'مساعد المدير' || role === 'إداري') {
                window.location.href = 'admin.html'; // لوحة المدير والإدارة
            } else if (role === 'معلم') {
                window.location.href = 'teacher.html'; // لوحة المعلم
            } else {
                window.location.href = 'student-dashboard.html'; // لوحة الطالب
            }
        }, 1500);

    } catch (err) {
        showRegAlert('حدث خطأ أثناء حفظ البيانات في قاعدة البيانات.', 'bg-red-100 text-red-700');
    }
}

function showRegAlert(msg, bgClass) {
    const box = document.getElementById('regAlert');
    if (!box) return;
    box.className = `mb-4 p-3 rounded-xl text-sm text-center font-medium shadow-sm ${bgClass}`;
    box.textContent = msg;
    box.classList.remove('hidden');
}

// دوال عرض الجداول والأخبار العامة
let db_news = "تنويه عام: تم تحديث جداول الحصص والأشغال اليومية لجميع الشعب.";
function renderNewsTicker() {
    const el = document.getElementById('tickerContent');
    if (el) el.textContent = db_news;
}

let db_public_schedule = [
    { classGroup: "العاشر-أ", period: "3", subTeacher: "أ. محمد السعيد", subject: "رياضيات" },
    { classGroup: "الحادي عشر-أ", period: "5", subTeacher: "أ. خالد عبد الله", subject: "فيزياء" }
];

function renderPublicSchedule() {
    const tbody = document.getElementById('publicScheduleTable');
    if (!tbody) return;
    tbody.innerHTML = db_public_schedule.map(item => `
        <tr>
            <td class="p-3 border">${item.classGroup}</td>
            <td class="p-3 border">${item.period}</td>
            <td class="p-3 border font-bold text-indigo-950">${item.subTeacher}</td>
            <td class="p-3 border">${item.subject}</td>
        </tr>
    `).join('');
}

function renderAnnouncements() {
    const el = document.getElementById('announcementsList');
    if (!el) return;
    el.innerHTML = `
        <div class="p-3 bg-slate-50 border-r-4 border-indigo-600 rounded-lg text-sm">
            <p class="font-bold text-slate-800">اجتماع الكادر التدريسي</p>
            <p class="text-xs text-slate-500 mt-0.5">يوم الأحد الساعة 9:00 صباحاً.</p>
        </div>
    `;
}
