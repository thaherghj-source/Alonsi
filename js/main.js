// إعدادات الربط بقاعدة بيانات MongoDB Atlas
const MONGO_CONFIG = {
    connectionString: "mongodb+srv://thaherghj_db_user:<db_password>@cluster0.3nmwwal.mongodb.net/",
    dbName: "school_system_db"
};

// قاعدة بيانات الكادر المدرسي المعتمدة (متضمنة الأرقام الوزارية، التخصصات، والصفوف المسندة)
const OFFICIAL_STAFF_DATABASE = [
    { id: "146193", fullName: "طايل منير عايد نصراوين", role: "مدير المدرسة", major: "اللغة العربية وآدابها (ماجستير)", subject: "لا يدرس", classesTaught: [] },
    { id: "119829", fullName: "محمد عوض عبد القادر الخواجا", role: "مساعد مدير", major: "لغة عربية (دبلوم عالي)", subject: "لا يدرس", classesTaught: [] },
    { id: "197374", fullName: "امين اسامه امين حماد", role: "مرشد تربوي", major: "علم نفس (بكالوريوس)", subject: "لا يدرس", classesTaught: [] },
    { id: "207276", fullName: "ابراهيم سعدات خليل السعدي", role: "مساعد مرشد", major: "معلم صف (بكالوريوس)", subject: "لا يدرس", classesTaught: [] },
    { id: "171956", fullName: "بهاء الدين علي عبد الحميد ابو قطام", role: "امين عهدة", major: "فيزياء (بكالوريوس)", subject: "لا يدرس", classesTaught: [] },
    { id: "170004", fullName: "محمد احمد محمد الدعجة", role: "إداري", major: "جغرافيا (بكالوريوس)", subject: "لا يدرس", classesTaught: [] },
    { id: "202260", fullName: "خالد عبدالله محمد البشير", role: "معلم", major: "شريعة فقه وأصوله", subject: "التربية الإسلامية", classesTaught: ["سادس أ", "سادس ب", "سادس ج", "سادس د", "سادس هـ", "سادس و"] },
    { id: "196057", fullName: "ثائر فريد احمد يحيى", role: "معلم", major: "اللغة العربية وآدابها", subject: "التربية الإسلامية", classesTaught: ["ثامن أ", "سابع أ", "سابع ب", "سابع ج", "سابع د", "سابع هـ", "سابع و"] },
    { id: "223758", fullName: "محمد خير محمد نذير احمد المصري", role: "معلم", major: "أصول الدين (الشريعة)", subject: "التربية الإسلامية", classesTaught: ["تاسع أ", "ثامن ب", "ثامن ج", "ثامن د", "ثامن هـ", "ثامن و"] },
    { id: "202555", fullName: "علاء احمد حسين الدعامسة", role: "معلم", major: "اللغة العربية", subject: "اللغة العربية", classesTaught: ["سادس أ", "سادس ب", "سادس ج"] },
    { id: "202554", fullName: "طارق يوسف سليمان حسين المصالحة", role: "معلم", major: "اللغة العربية", subject: "اللغة العربية", classesTaught: ["ثامن د", "ثامن هـ", "ثامن و"] },
    { id: "207234", fullName: "يزيد محمود احمد الكعابنة", role: "معلم", major: "اللغة العربية", subject: "اللغة العربية", classesTaught: ["سابع أ", "سابع هـ", "سابع و"] },
    { id: "200040301", fullName: "محمد وليد محمد الجندي", role: "معلم", major: "اللغة العربية", subject: "اللغة العربية", classesTaught: ["سابع د"] },
    { id: "202257", fullName: "مشعل يوسف موسى الشوابكة", role: "معلم", major: "اللغة العربية", subject: "اللغة العربية", classesTaught: ["ثامن أ", "ثامن ب", "ثامن ج"] },
    { id: "208687", fullName: "بشار خلف مصطفى العايد", role: "معلم", major: "اللغة العربية", subject: "اللغة العربية", classesTaught: ["سادس د", "سادس هـ", "سادس و"] },
    { id: "172703", fullName: "رباح احمد محمود الفضيلات", role: "معلم", major: "اللغة العربية وآدابها", subject: "اللغة العربية", classesTaught: ["تاسع أ", "سابع ب", "سابع ج"] },
    { id: "202313", fullName: "مشهور فهيم سليمان الصمادي", role: "معلم", major: "لغة إنجليزية + إدارة", subject: "اللغة الإنجليزية", classesTaught: ["ثامن د", "ثامن هـ", "ثامن و"] },
    { id: "188621", fullName: "غسان مهدي احمد احميدي", role: "معلم", major: "اللغة الانجليزية", subject: "اللغة الإنجليزية", classesTaught: ["سابع أ", "سابع ب", "سابع ج", "سابع د"] },
    { id: "217510", fullName: "يوسف محمد ابراهيم خواجه", role: "معلم", major: "لغة إنجليزية وآدابها", subject: "اللغة الإنجليزية", classesTaught: ["سابع هـ", "سابع و", "سادس هـ", "سادس و"] },
    { id: "202316", fullName: "ايسر نائل سعيد ياسين", role: "معلم", major: "أدب إنجليزي", subject: "اللغة الإنجليزية", classesTaught: ["سادس أ", "سادس ب", "سادس ج", "سادس د"] },
    { id: "202276", fullName: "احمد محمد هاشم محمد (الطريفي)", role: "معلم", major: "الترجمة", subject: "اللغة الإنجليزية", classesTaught: ["تاسع أ", "ثامن أ", "ثامن ب", "ثامن ج"] },
    { id: "203147", fullName: "عزالدين ابراهيم محمد بكر", role: "معلم", major: "الرياضيات", subject: "الرياضيات", classesTaught: ["سابع ج", "سابع د", "سابع هـ", "سابع و"] },
    { id: "202268", fullName: "أمجد نضال عزت أبو ليلى", role: "معلم", major: "الرياضيات", subject: "الرياضيات", classesTaught: ["سابع ب", "سادس د", "سادس هـ", "سادس و"] },
    { id: "161924", fullName: "مالك عبدالله محسن النويري", role: "معلم", major: "الرياضيات والإحصاء", subject: "الرياضيات", classesTaught: ["تاسع أ", "ثامن أ", "ثامن ب", "ثامن ج"] },
    { id: "199482", fullName: "عيسى محمد احمد دار ابو عيسى", role: "معلم", major: "الرياضيات", subject: "الرياضيات", classesTaught: ["ثامن د", "ثامن هـ", "ثامن و", "سابع أ"] },
    { id: "202263", fullName: "ظاهر عطالله محمود الخطيب", role: "معلم", major: "الرياضيات", subject: "الرياضيات", classesTaught: ["سادس أ", "سادس ب", "سادس ج"] },
    { id: "158390", fullName: "ابراهيم سعيد محمد الراعي", role: "معلم", major: "إدارة المياه والبيئة", subject: "العلوم العامة", classesTaught: ["تاسع أ", "ثامن أ", "ثامن ب", "سابع و", "سادس د", "سادس هـ", "سادس و"] },
    { id: "204989", fullName: "حذيفة محمد عبد الجواد الخطيب", role: "معلم", major: "الرياضيات", subject: "العلوم العامة", classesTaught: ["تاسع أ", "ثامن ج", "ثامن د", "ثامن هـ", "ثامن و", "سادس ب", "سادس ج"] },
    { id: "197513", fullName: "معتز احمد محمد جانم", role: "معلم", major: "العلوم الحياتية", subject: "العلوم العامة", classesTaught: ["تاسع أ", "سابع أ", "سابع ب", "سابع ج", "سابع د", "سابع هـ", "سادس أ"] },
    { id: "214053", fullName: "محمد سالم مصطفى العايد", role: "معلم", major: "التاريخ", subject: "الدراسات الاجتماعية", classesTaught: ["سابع أ", "سابع ب", "سابع ج", "سابع د", "سابع هـ", "سابع و"] },
    { id: "195360", fullName: "احمد محمد عبدالرحيم ابو عناب", role: "معلم", major: "الجغرافيا", subject: "الدراسات الاجتماعية", classesTaught: ["تاسع أ", "سادس أ", "سادس ب", "سادس ج", "سادس د", "سادس هـ", "سادس و"] },
    { id: "220551", fullName: "مؤمن محمد توفيق عبد ربه", role: "معلم", major: "الجغرافيا (ماجستير)", subject: "الدراسات الاجتماعية", classesTaught: ["ثامن أ", "ثامن ب", "ثامن ج", "ثامن د", "ثامن هـ", "ثامن و"] },
    { id: "158461", fullName: "محمد عبدالفتاح طه خليل", role: "معلم", major: "علم الحاسوب", subject: "الحاسوب", classesTaught: ["تاسع أ", "ثامن أ", "ثامن ب", "ثامن ج", "ثامن د", "ثامن هـ", "ثامن و", "سابع ج", "سابع د", "سابع هـ", "سابع و"] },
    { id: "171886", fullName: "محمد عبد الرحمن هاشم رمزي", role: "معلم", major: "تصميم جرافيك", subject: "التربية الفنية", classesTaught: ["تاسع أ", "ثامن (أ-و)", "سابع (أ-و)", "سادس (أ-و)"] },
    { id: "195571", fullName: "حاتم محمد إسماعيل عوده", role: "معلم", major: "تربية بدنية", subject: "التربية الرياضية", classesTaught: ["سابع أ", "سابع ب", "سابع ج", "سابع د", "سادس أ", "سادس ب", "سادس ج", "سادس د", "سادس هـ", "سادس و"] },
    { id: "218921", fullName: "علاء الدين احمد صادق عبدالرحمن", role: "معلم", major: "التربية الرياضية", subject: "التربية الرياضية", classesTaught: ["تاسع أ", "ثامن (أ-و)", "سابع هـ", "سابع و"] },
    { id: "170272", fullName: "محمد قاسم محمد قصقص", role: "معلم", major: "تربية بدنية", subject: "التربية المهنية", classesTaught: ["سابع أ", "سابع ب", "سابع ج", "سابع د", "سادس (أ-و)"] },
    { id: "202270", fullName: "علي خضر علي الزواهره", role: "معلم", major: "اللغة العربيّة", subject: "التربية المهنية", classesTaught: ["تاسع أ", "ثامن (أ-و)", "سابع هـ", "سابع و"] },
    { id: "227731", fullName: "حسن جاسر صبحي ابوالريش", role: "معلم", major: "نظم المعلومات الإدارية", subject: "الثقافة المالية", classesTaught: ["تاسع أ", "ثامن (أ-و)", "سابع (أ-و)"] }
];

let currentVerifiedStaff = null;

// دالة البحث التلقائي واستخراج البيانات عبر الرقم الوزاري للكادر
function lookupStaffByMinistryId() {
    const inputId = document.getElementById('ministryIdInput').value.trim();
    const card = document.getElementById('staffInfoCard');
    
    if (!inputId) {
        showRegAlert('يرجى إدخال الرقم الوزاري أولاً!', 'bg-amber-100 text-amber-800 border border-amber-300');
        return;
    }

    const found = OFFICIAL_STAFF_DATABASE.find(s => s.id === inputId);

    if (found) {
        currentVerifiedStaff = found;
        document.getElementById('resFullName').textContent = found.fullName;
        document.getElementById('resRole').textContent = found.role;
        document.getElementById('resMajor').textContent = found.major;
        document.getElementById('resSubject').textContent = found.subject;
        document.getElementById('resClasses').textContent = found.classesTaught.join(', ') || 'لا يوجد';
        
        card.classList.remove('hidden');
        showRegAlert(`تم التحقق بنجاح من بيانات الموظف: (${found.fullName})`, 'bg-emerald-100 text-emerald-800 border border-emerald-300');
    } else {
        currentVerifiedStaff = null;
        card.classList.add('hidden');
        showRegAlert('عذراً، الرقم الوزاري غير مدرج في الكشف الرسمي المعتمد!', 'bg-red-100 text-red-700 border border-red-300');
    }
}

// دالة إرسال وتخزين البيانات وتجهيز ملف JSON لـ MongoDB
async function handleRegistrationSubmit(e) {
    e.preventDefault();

    const roleCategory = document.getElementById('userRoleCategory').value;
    const phone = document.getElementById('phoneInput').value.trim();
    const username = document.getElementById('usernameInput').value.trim();
    const password = document.getElementById('passwordInput').value;

    let finalPayload = {};

    if (roleCategory === 'staff') {
        if (!currentVerifiedStaff) {
            showRegAlert('يرجى إدخال الرقم الوزاري والضغط على (تحقق) أولاً!', 'bg-amber-100 text-amber-800 border border-amber-300');
            return;
        }

        finalPayload = {
            collection: "school_users",
            connectionUri: MONGO_CONFIG.connectionString,
            document: {
                username: username,
                password: password,
                ministryId: currentVerifiedStaff.id,
                fullName: currentVerifiedStaff.fullName,
                role: currentVerifiedStaff.role,
                major: currentVerifiedStaff.major,
                subject: currentVerifiedStaff.subject,
                classesTaught: currentVerifiedStaff.classesTaught,
                phone: phone,
                registeredAt: new Date().toISOString()
            }
        };

    } else {
        const studentName = document.getElementById('studentNameInput').value.trim();
        const grade = document.getElementById('studentGradeSelect').value;
        const section = document.getElementById('studentSectionSelect').value;

        if (!studentName) {
            showRegAlert('يرجى إدخال اسم الطالب الكامل!', 'bg-amber-100 text-amber-800 border border-amber-300');
            return;
        }

        finalPayload = {
            collection: "school_users",
            connectionUri: MONGO_CONFIG.connectionString,
            document: {
                username: username,
                password: password,
                fullName: studentName,
                role: "طالب",
                studentClass: `${grade} - ${section}`,
                phone: phone,
                registeredAt: new Date().toISOString()
            }
        };
    }

    try {
        let storedUsers = JSON.parse(localStorage.getItem('mongo_school_users') || '[]');

        const exists = storedUsers.some(u => u.document.username === username);
        if (exists) {
            showRegAlert('اسم المستخدم مستخدم مسبقاً، يرجى اختيار اسم آخر!', 'bg-amber-100 text-amber-800 border border-amber-300');
            return;
        }

        storedUsers.push(finalPayload);
        localStorage.setItem('mongo_school_users', JSON.stringify(storedUsers));
        localStorage.setItem('currentUserSession', JSON.stringify(finalPayload.document));

        showRegAlert(`تم تسجيل وتخزين البيانات بنجاح في قاعدة MongoDB باسم المستخدم (${username})!`, 'bg-emerald-100 text-emerald-800 border border-emerald-300');

        setTimeout(() => {
            const r = finalPayload.document.role;
            if (r === 'مدير المدرسة' || r === 'مساعد مدير' || r === 'امين عهدة' || r === 'إداري') {
                window.location.href = 'admin.html';
            } else if (r === 'معلم' || r === 'مرشد تربوي') {
                window.location.href = 'teacher.html';
            } else {
                window.location.href = 'student-dashboard.html';
            }
        }, 1500);

    } catch (err) {
        showRegAlert('حدث خطأ أثناء الاتصال أو الحفظ.', 'bg-red-100 text-red-700 border border-red-300');
    }
}

function showRegAlert(msg, bgClass) {
    const box = document.getElementById('regAlert');
    if (!box) return;
    box.className = `mb-5 p-3.5 rounded-xl text-sm text-center font-bold shadow-sm transition-all ${bgClass}`;
    box.textContent = msg;
    box.classList.remove('hidden');
}
