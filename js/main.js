// ==========================================
// إعدادات اتصال MongoDB Atlas المحاكية
// ==========================================
const MONGO_CONFIG = {
    connectionString: "mongodb+srv://thaherghj_db_user:<db_password>@cluster0.3nmwwal.mongodb.net/",
    dbName: "school_system_db"
};

// ==========================================
// قاعدة البيانات الرسمية للكادر المدرسي (مستخرجة من ملفات الملاكات وتوزيع المباحث)
// ==========================================
const OFFICIAL_SCHOOL_STAFF = [
    { id: "146193", fullName: "طايل منير عايد نصراوين", role: "مدير المدرسة", major: "اللغة العربية وآدابها (ماجستير)", experience: "21 سنة", graduationYear: "2013", subject: "لا يدرس", classesTaught: [], username: "tayel_admin", password: "changeme123", certificates: ["قيادة مدرسية متقدمة"] },
    { id: "119829", fullName: "محمد عوض عبد القادر الخواجا", role: "مساعد مدير", major: "لغة عربية (دبلوم عالي)", experience: "25 سنة", graduationYear: "2011", subject: "لا يدرس", classesTaught: [], username: "mohammad_asst", password: "changeme123", certificates: ["القيادة التطويرية"] },
    { id: "197374", fullName: "امين اسامه امين حماد", role: "مرشد تربوي", major: "علم نفس (بكالوريوس)", experience: "11 سنة", graduationYear: "2015", subject: "لا يدرس", classesTaught: [], username: "amin_hammad", password: "changeme123", certificates: ["إرشاد نفسي وتوجيه سلوكي"] },
    { id: "207276", fullName: "ابراهيم سعدات خليل السعدي", role: "مساعد مرشد", major: "معلم صف (بكالوريوس)", experience: "8 سنوات", graduationYear: "2016", subject: "لا يدرس", classesTaught: [], username: "ibrahim_saadi", password: "changeme123", certificates: ["الدبلوم المهني في التربية"] },
    { id: "171956", fullName: "بهاء الدين علي عبد الحميد ابو قطام", role: "امين عهدة", major: "فيزياء (بكالوريوس)", experience: "10 سنوات", graduationYear: "2014", subject: "لا يدرس", classesTaught: [], username: "baha_admin", password: "changeme123", certificates: ["إدارة المستودعات والعهد"] },
    { id: "202260", fullName: "خالد عبدالله محمد البشير", role: "معلم", major: "شريعة فقه وأصوله", experience: "12 سنة", graduationYear: "2012", subject: "التربية الإسلامية", classesTaught: ["سادس أ", "سادس ب", "سادس ج", "سادس د", "سادس هـ", "سادس و"], username: "khaled_bashir", password: "changeme123", certificates: ["دورات التربية الإسلامية الحديثة"] },
    { id: "158461", fullName: "محمد عبدالفتاح طه خليل", role: "معلم", major: "علم الحاسوب", experience: "14 سنة", graduationYear: "2010", subject: "الحاسوب وتكنولوجيا المعلومات", classesTaught: ["تاسع أ", "ثامن أ", "ثامن ب", "ثامن ج", "ثامن د", "ثامن هـ", "ثامن و", "سابع ج", "سابع د", "سابع هـ", "سابع و"], username: "mohammad_khalil", password: "changeme123", certificates: ["رخصة آي سي دي إل", "برمجة ويب متقدمة"] }
];

// ==========================================
// إدارة تسجيل الدخول وتوجيه المستخدمين
// ==========================================
function handleDatabaseLogin(e) {
    e.preventDefault();
    const u = document.getElementById('loginUsername').value.trim();
    const p = document.getElementById('loginPassword').value;

    let users = JSON.parse(localStorage.getItem('mongo_school_users') || '[]');
    if (users.length === 0) {
        users = OFFICIAL_SCHOOL_STAFF.map(staff => ({ document: staff }));
        localStorage.setItem('mongo_school_users', JSON.stringify(users));
    }

    const found = users.find(x => x.document.username === u && x.document.password === p);
    if (found) {
        const data = found.document;
        localStorage.setItem('currentUserSession', JSON.stringify(data));

        const role = data.role;
        if (role === 'مدير المدرسة') {
            window.location.href = 'admin.html';
        } else if (role === 'مساعد مدير') {
            window.location.href = 'assistant-admin.html';
        } else if (role === 'مرشد تربوي' || role === 'مساعد مرشد') {
            window.location.href = 'counselor.html';
        } else if (role === 'امين عهدة') {
            window.location.href = 'storekeeper.html';
        } else {
            window.location.href = 'teacher.html';
        }
    } else {
        alert('اسم المستخدم أو كلمة السر غير صحيحة!');
    }
}

// تسجيل الخروج
function logout() {
    localStorage.removeItem('currentUserSession');
    window.location.href = 'login.html';
}

// ==========================================
// لوحة المعلم والبيانات الشخصية والشهادات
// ==========================================
function loadTeacherDashboardData() {
    const session = JSON.parse(localStorage.getItem('currentUserSession') || '{}');
    if (!session.username) {
        window.location.href = 'login.html';
        return;
    }

    document.getElementById('headerTeacherName').textContent = session.fullName;
    document.getElementById('headerTeacherRole').textContent = session.role;
    document.getElementById('profileMajor').textContent = session.major || "غير متوفر";
    document.getElementById('profileSubject').textContent = session.subject || "غير متوفر";
    document.getElementById('profileExperience').textContent = session.experience || "غير محدد";
    document.getElementById('profileGraduation').textContent = session.graduationYear || "غير محدد";
    document.getElementById('profilePhone').textContent = session.phone || "غير محدد";
    
    const classesCount = session.classesTaught ? session.classesTaught.length : 0;
    const quota = classesCount * 2 + 6;
    document.getElementById('profileQuota').textContent = quota;
    document.getElementById('profileClassesCount').textContent = classesCount;

    renderCertificatesList(session.certificates || []);
    renderTeacherSchedule(session.subject || "المادة");
}

function renderCertificatesList(certs) {
    const container = document.getElementById('certificatesContainer');
    if (!container) return;
    if (certs.length === 0) {
        container.innerHTML = `<p class="text-xs text-slate-400">لا توجد دورات مضافة حالياً.</p>`;
        return;
    }
    container.innerHTML = certs.map(c => `
        <span class="px-3 py-1.5 bg-indigo-50 text-indigo-800 rounded-xl text-xs font-bold border border-indigo-200 inline-flex items-center gap-1.5 shadow-sm">
            <i data-lucide="award" class="w-3.5 h-3.5 text-yellow-500"></i> ${c}
        </span>
    `).join('');
    if (window.lucide) lucide.createIcons();
}

function handleAddCertificate(e) {
    e.preventDefault();
    const certInput = document.getElementById('newCertificateInput');
    const newCert = certInput.value.trim();
    if (!newCert) return;

    let session = JSON.parse(localStorage.getItem('currentUserSession') || '{}');
    if (!session.certificates) session.certificates = [];
    session.certificates.push(newCert);

    localStorage.setItem('currentUserSession', JSON.stringify(session));

    let allUsers = JSON.parse(localStorage.getItem('mongo_school_users') || '[]');
    const idx = allUsers.findIndex(u => u.document.username === session.username);
    if (idx !== -1) {
        allUsers[idx].document.certificates = session.certificates;
        localStorage.setItem('mongo_school_users', JSON.stringify(allUsers));
    }

    alert('تمت إضافة الدورة/الشهادة بنجاح وتحديثها في النظام!');
    window.location.href = 'teacher.html';
}

function renderTeacherSchedule(subjectName) {
    const tbody = document.getElementById('teacherWeeklyScheduleBody');
    if (!tbody) return;

    const days = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"];
    tbody.innerHTML = days.map(day => `
        <tr class="hover:bg-slate-50 transition">
            <td class="p-3.5 font-bold bg-indigo-50/50 text-indigo-950 border">${day}</td>
            <td class="p-3.5 border text-center"><span class="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-lg font-bold text-xs">${subjectName}</span></td>
            <td class="p-3.5 border text-center"><span class="text-slate-400 text-xs">حصة حرة / إشراف</span></td>
            <td class="p-3.5 border text-center"><span class="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-lg font-bold text-xs">${subjectName}</span></td>
            <td class="p-3.5 border text-center"><span class="text-slate-400 text-xs">نشاط مدرسي</span></td>
            <td class="p-3.5 border text-center"><span class="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-lg font-bold text-xs">${subjectName}</span></td>
            <td class="p-3.5 border text-center"><span class="text-slate-400 text-xs">استراحة</span></td>
            <td class="p-3.5 border text-center"><span class="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-lg font-bold text-xs">${subjectName}</span></td>
        </tr>
    `).join('');
}

// تحميل بيانات اللوحات الأخرى للمسؤولين
function loadGenericDashboard() {
    const session = JSON.parse(localStorage.getItem('currentUserSession') || '{}');
    if (!session.username) {
        window.location.href = 'login.html';
        return;
    }
    const nameEl = document.getElementById('userNameDisplay');
    const roleEl = document.getElementById('userRoleDisplay');
    if (nameEl) nameEl.textContent = session.fullName;
    if (roleEl) roleEl.textContent = session.role;
}
