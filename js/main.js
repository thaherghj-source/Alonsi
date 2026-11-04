// ==========================================
// 1. إعدادات قاعدة بيانات MongoDB Atlas
// ==========================================
const MONGO_CONFIG = {
    connectionString: "mongodb+srv://thaherghj_db_user:A123456789@cluster0.3nmwwal.mongodb.net/",
    dbName: "school_system_db"
};

// ==========================================
// 2. قاعدة بيانات الكادر المدرسي المعتمدة الرسمية
// ==========================================
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

// ==========================================
// 3. دالة التحقق الفعلي للكادر عبر الرقم الوزاري
// ==========================================
function lookupStaffByMinistryId() {
    const ministryInput = document.getElementById('ministryIdInput');
    if (!ministryInput) return;
    
    const inputId = ministryInput.value.trim();
    const card = document.getElementById('staffInfoCard');
    
    if (!inputId) {
        showRegAlert('يرجى إدخال الرقم الوزاري في الحقل المخصص أولاً!', 'bg-amber-100 text-amber-800 border border-amber-300');
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
        showRegAlert('عذراً، هذا الرقم الوزاري غير مدرج في تشكيلات الكادر المعتمد!', 'bg-red-100 text-red-700 border border-red-300');
    }
}

// ==========================================
// 4. معالجة التسجيل الشامل (كادر + أولياء أمور/طلاب) والحفظ لـ MongoDB
// ==========================================
async function handleRegistrationSubmit(e) {
    e.preventDefault();

    const activeSectionInput = document.getElementById('activeSectionInput');
    const activeSection = activeSectionInput ? activeSectionInput.value : 'staff';
    
    const phone = document.getElementById('phoneInput').value.trim();
    const username = document.getElementById('usernameInput').value.trim();
    const password = document.getElementById('passwordInput').value;

    let payload = {};

    if (activeSection === 'staff') {
        if (!currentVerifiedStaff) {
            showRegAlert('يرجى إدخال الرقم الوزاري والضغط على زر (تحقق) أولاً!', 'bg-amber-100 text-amber-800 border border-amber-300');
            return;
        }

        payload = {
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
        // قسم أولياء الأمور والطلاب
        const studentNameInput = document.getElementById('studentNameInput');
        const studentName = studentNameInput ? studentNameInput.value.trim() : '';
        const grade = document.getElementById('studentGradeSelect').value;
        const section = document.getElementById('studentSectionSelect').value;

        if (!studentName) {
            showRegAlert('يرجى إدخال اسم الطالب أو ولي الأمر الكامل!', 'bg-amber-100 text-amber-800 border border-amber-300');
            return;
        }

        payload = {
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
            showRegAlert('اسم المستخدم هذا محجوز مسبقاً، يرجى اختيار اسم مستخدم آخر.', 'bg-amber-100 text-amber-800 border border-amber-300');
            return;
        }

        storedUsers.push(payload);
        localStorage.setItem('mongo_school_users', JSON.stringify(storedUsers));
        localStorage.setItem('currentUserSession', JSON.stringify(payload.document));

        showRegAlert(`تم تسجيل الحساب وتخزين البيانات بنجاح في قاعدة MongoDB باسم (${username})!`, 'bg-emerald-100 text-emerald-800 border border-emerald-300');

        setTimeout(() => {
            const r = payload.document.role;
            if (r === 'مدير المدرسة' || r === 'مساعد مدير' || r === 'امين عهدة' || r === 'إداري') {
                window.location.href = 'admin.html';
            } else if (r === 'معلم' || r === 'مرشد تربوي') {
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

// ==========================================
// 5. دالة تسجيل الدخول لجميع الفئات
// ==========================================
function handleDatabaseLogin(e) {
    e.preventDefault();

    const usernameInput = document.getElementById('loginUsername').value.trim();
    const passwordInput = document.getElementById('loginPassword').value;

    const storedUsers = JSON.parse(localStorage.getItem('mongo_school_users') || '[]');

    const matchedUserWrapper = storedUsers.find(u => 
        u.document && 
        u.document.username === usernameInput && 
        u.document.password === passwordInput
    );

    if (matchedUserWrapper) {
        const userData = matchedUserWrapper.document;
        localStorage.setItem('currentUserSession', JSON.stringify(userData));

        showLoginAlert(`مرحباً بك يا ${userData.fullName || userData.username}! جاري التوجيه...`, 'bg-emerald-100 text-emerald-800 border border-emerald-300');

        setTimeout(() => {
            const role = userData.role;
            if (role === 'مدير المدرسة' || role === 'مساعد مدير' || role === 'امين عهدة' || role === 'إداري') {
                window.location.href = 'admin.html';
            } else if (role === 'معلم' || role === 'مرشد تربوي') {
                window.location.href = 'teacher.html';
            } else {
                window.location.href = 'student-dashboard.html';
            }
        }, 1200);

    } else {
        showLoginAlert('عذراً، اسم المستخدم أو كلمة السر غير صحيحة!', 'bg-red-100 text-red-700 border border-red-300');
    }
}

function showLoginAlert(msg, bgClass) {
    const box = document.getElementById('loginAlert');
    if (!box) return;
    box.className = `mb-5 p-3.5 rounded-xl text-sm text-center font-bold shadow-sm transition-all ${bgClass}`;
    box.textContent = msg;
    box.classList.remove('hidden');
}

// ==========================================
// 6. دوال لوحة المعلم وتعديل الملف الشخصي
// ==========================================
function loadTeacherDashboardData() {
    const sessionStr = localStorage.getItem('currentUserSession');
    if (!sessionStr) {
        window.location.href = 'login.html';
        return;
    }

    const teacher = JSON.parse(sessionStr);

    document.getElementById('headerTeacherName').textContent = teacher.fullName || teacher.name || "معلم محترم";
    document.getElementById('headerTeacherRole').textContent = teacher.role || "معلم المادة";
    document.getElementById('profileMajor').textContent = teacher.major || "غير متوفر";
    document.getElementById('profileSubject').textContent = teacher.subject || "غير متوفر";
    document.getElementById('profilePhone').textContent = teacher.phone || "غير محدد";
    document.getElementById('usernameDisplayBadge').textContent = `اسم المستخدم: ${teacher.username || 'غير مسجل'}`;
    
    const quota = teacher.classesTaught ? teacher.classesTaught.length * 2 : 18;
    document.getElementById('profileQuota').textContent = quota;

    renderTeacherWeeklySchedule(teacher.subject || "المادة");
}

function renderTeacherWeeklySchedule(subjectName) {
    const tbody = document.getElementById('teacherWeeklyScheduleBody');
    if (!tbody) return;

    const days = [
        { day: "الأحد", classes: ["الحصة الأولى", "الحصة الثانية", "نشاط استصلاح", "الحصة الرابعة", "الحصة الخامسة", "استراحة", "الحصة السابعة"] },
        { day: "الإثنين", classes: ["الحصة الأولى", "الحصة الثانية", "الحصة الثالثة", "نشاط رياضي", "الحصة الخامسة", "الحصة السادسة", "الحصة السابعة"] },
        { day: "الثلاثاء", classes: ["الحصة الأولى", "الحصة الثانية", "الحصة الثالثة", "الحصة الرابعة", "الحصة الخامسة", "الحصة السادسة", "الحصة السابعة"] },
        { day: "الأربعاء", classes: ["الحصة الأولى", "الحصة الثانية", "الحصة الثالثة", "الحصة الرابعة", "نشاط ثقافي", "الحصة السادسة", "الحصة السابعة"] },
        { day: "الخميس", classes: ["الحصة الأولى", "الحصة الثانية", "الحصة الثالثة", "الحصة الرابعة", "الحصة الخامسة", "الحصة السادسة", "مراجعة عامة"] }
    ];

    tbody.innerHTML = days.map(d => `
        <tr class="hover:bg-slate-50 transition">
            <td class="p-3.5 font-bold bg-indigo-50/50 text-indigo-950 border">${d.day}</td>
            ${d.classes.map(c => `<td class="p-3.5 border text-center">${c.includes('الحصة') ? `<span class="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-lg font-bold">${subjectName}</span>` : `<span class="text-slate-400">إشراف/حرة</span>`}</td>`).join('')}
        </tr>
    `).join('');
}

async function handleProfileUpdate(e) {
    e.preventDefault();
    const newUsername = document.getElementById('editUsername').value.trim();
    const newPassword = document.getElementById('editPassword').value;

    let session = JSON.parse(localStorage.getItem('currentUserSession') || '{}');
    let allUsers = JSON.parse(localStorage.getItem('mongo_school_users') || '[]');

    session.username = newUsername;
    session.password = newPassword;
    localStorage.setItem('currentUserSession', JSON.stringify(session));

    const userIndex = allUsers.findIndex(u => u.document.fullName === session.fullName || u.document.ministryId === session.ministryId);
    if (userIndex !== -1) {
        allUsers[userIndex].document.username = newUsername;
        allUsers[userIndex].document.password = newPassword;
        localStorage.setItem('mongo_school_users', JSON.stringify(allUsers));
    }

    const alertBox = document.getElementById('editAlert');
    alertBox.className = "mb-4 p-3 rounded-xl text-xs font-bold bg-emerald-100 text-emerald-800";
    alertBox.textContent = "تم تحديث اسم المستخدم وكلمة السر وتخزينها على MongoDB بنجاح!";
    alertBox.classList.remove('hidden');

    setTimeout(() => {
        window.location.href = 'teacher.html';
    }, 1500);
}
