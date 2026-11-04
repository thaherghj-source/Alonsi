// ==========================================
// 1. إعدادات اتصال MongoDB Atlas المحاكية
// ==========================================
const MONGO_CONFIG = {
    connectionString: "mongodb+srv://thaherghj_db_user:<db_password>@cluster0.3nmwwal.mongodb.net/",
    dbName: "school_system_db"
};

// ==========================================
// 2. قاعدة البيانات الرسمية للكادر المدرسي (الملاكات وتوزيع المباحث)
// ==========================================
const OFFICIAL_SCHOOL_STAFF = [
    { id: "146193", fullName: "طايل منير عايد نصراوين", role: "مدير المدرسة", major: "اللغة العربية وآدابها (ماجستير)", experience: "21 سنة", graduationYear: "2013", subject: "لا يدرس", classesTaught: [], username: "tayel_admin", password: "changeme123", certificates: ["قيادة مدرسية متقدمة"] },
    { id: "119829", fullName: "محمد عوض عبد القادر الخواجا", role: "مساعد مدير", major: "لغة عربية (دبلوم عالي)", experience: "25 سنة", graduationYear: "2011", subject: "لا يدرس", classesTaught: [], username: "mohammad_asst", password: "changeme123", certificates: ["القيادة التطويرية"] },
    { id: "197374", fullName: "امين اسامه امين حماد", role: "مرشد تربوي", major: "علم نفس (بكالوريوس)", experience: "11 سنة", graduationYear: "2015", subject: "لا يدرس", classesTaught: [], username: "amin_hammad", password: "changeme123", certificates: ["إرشاد نفسي وتوجيه سلوكي"] },
    { id: "207276", fullName: "ابراهيم سعدات خليل السعدي", role: "مساعد مرشد", major: "معلم صف (بكالوريوس)", experience: "8 سنوات", graduationYear: "2016", subject: "لا يدرس", classesTaught: [], username: "ibrahim_saadi", password: "changeme123", certificates: ["الدبلوم المهني في التربية"] },
    { id: "171956", fullName: "بهاء الدين علي عبد الحميد ابو قطام", role: "امين عهدة", major: "فيزياء (بكالوريوس)", experience: "10 سنوات", graduationYear: "2014", subject: "لا يدرس", classesTaught: [], username: "baha_admin", password: "changeme123", certificates: ["إدارة المستودعات والعهد"] },
    { id: "170004", fullName: "محمد احمد محمد الدعجة", role: "إداري", major: "جغرافيا (بكالوريوس)", experience: "9 سنوات", graduationYear: "2015", subject: "لا يدرس", classesTaught: [], username: "mohammad_daaja", password: "changeme123", certificates: ["إدارة إلكترونية"] },
    { id: "202260", fullName: "خالد عبدالله محمد البشير", role: "معلم", major: "شريعة فقه وأصوله", experience: "12 سنة", graduationYear: "2012", subject: "التربية الإسلامية", classesTaught: ["سادس أ", "سادس ب", "سادس ج", "سادس د", "سادس هـ", "سادس و"], username: "khaled_bashir", password: "changeme123", certificates: ["دورات التربية الإسلامية الحديثة"] },
    { id: "158461", fullName: "محمد عبدالفتاح طه خليل", role: "معلم", major: "علم الحاسوب", experience: "14 سنة", graduationYear: "2010", subject: "الحاسوب وتكنولوجيا المعلومات", classesTaught: ["تاسع أ", "ثامن أ", "ثامن ب", "ثامن ج", "ثامن د", "ثامن هـ", "ثامن و", "سابع ج", "سابع د", "سابع هـ", "سابع و"], username: "mohammad_khalil", password: "changeme123", certificates: ["رخصة آي سي دي إل", "برمجة ويب متقدمة"] }
];

let verifiedStaffMember = null;

// ==========================================
// 3. دالة التحقق الفعلي من الرقم الوزاري للكادر
// ==========================================
function verifyStaffFromMongo() {
    const ministryInput = document.getElementById('ministryIdInput');
    if (!ministryInput) return;
    
    const inputId = ministryInput.value.trim();
    const card = document.getElementById('staffInfoCard');
    
    if (!inputId) {
        showRegisterAlert('يرجى كتابة الرقم الوزاري في الحقل المخصص أولاً!', 'bg-amber-100 text-amber-800 border border-amber-300');
        return;
    }

    const found = OFFICIAL_SCHOOL_STAFF.find(s => s.id === inputId);

    if (found) {
        verifiedStaffMember = found;
        document.getElementById('resFullName').textContent = found.fullName;
        document.getElementById('resRole').textContent = found.role;
        document.getElementById('resMajor').textContent = found.major;
        document.getElementById('resSubject').textContent = found.subject;
        document.getElementById('resClasses').textContent = found.classesTaught.join(', ') || 'لا يوجد';
        
        card.classList.remove('hidden');
        showRegisterAlert(`تم التحقق بنجاح من بيانات الموظف: (${found.fullName}) - المسمى: (${found.role})`, 'bg-emerald-100 text-emerald-800 border border-emerald-300');
    } else {
        verifiedStaffMember = null;
        if (card) card.classList.add('hidden');
        showRegisterAlert('عذراً، الرقم الوزاري غير مدرج في تشكيلات الكادر المعتمد!', 'bg-red-100 text-red-700 border border-red-300');
    }
}

// ==========================================
// 4. معالجة التسجيل مع شروط التحقق التامة والتوجيه الصحيح
// ==========================================
async function handleRegistrationSubmit(e) {
    e.preventDefault();

    const activeTabInput = document.getElementById('activeRegisterTab');
    const currentTab = activeTabInput ? activeTabInput.value : 'staff';
    
    const phoneInput = document.getElementById('regPhoneInput');
    const usernameInput = document.getElementById('regUsernameInput');
    const passwordInput = document.getElementById('regPasswordInput');

    const phone = phoneInput ? phoneInput.value.trim() : '';
    const username = usernameInput ? usernameInput.value.trim() : '';
    const password = passwordInput ? passwordInput.value : '';

    if (!phone) {
        showRegisterAlert('خطأ: رقم الهاتف إجباري ولا يمكن إتمام التسجيل بدونه.', 'bg-red-100 text-red-700 border border-red-300');
        return;
    }

    let mongoDocumentPayload = {};

    if (currentTab === 'staff') {
        const ministryInput = document.getElementById('ministryIdInput');
        const ministryId = ministryInput ? ministryInput.value.trim() : '';

        if (!ministryId) {
            showRegisterAlert('خطأ: الرقم الوزاري إجباري للكادر! يرجى إدخال الرقم والضغط على "تحقق".', 'bg-red-100 text-red-700 border border-red-300');
            return;
        }

        if (!verifiedStaffMember || verifiedStaffMember.id !== ministryId) {
            showRegisterAlert('خطأ: يجب الضغط على زر (تحقق) وتأكيد الرقم الوزاري قبل إتمام التسجيل!', 'bg-amber-100 text-amber-800 border border-amber-300');
            return;
        }

        mongoDocumentPayload = {
            collection: "school_users",
            connectionUri: MONGO_CONFIG.connectionString,
            document: {
                username: username,
                password: password,
                ministryId: verifiedStaffMember.id,
                fullName: verifiedStaffMember.fullName,
                role: verifiedStaffMember.role,
                major: verifiedStaffMember.major,
                subject: verifiedStaffMember.subject,
                classesTaught: verifiedStaffMember.classesTaught,
                experience: verifiedStaffMember.experience,
                graduationYear: verifiedStaffMember.graduationYear,
                certificates: verifiedStaffMember.certificates || [],
                phone: phone,
                registeredAt: new Date().toISOString()
            }
        };

    } else {
        const parentNameInput = document.getElementById('parentFullNameInput');
        const parentName = parentNameInput ? parentNameInput.value.trim() : '';
        const gradeSelect = document.getElementById('parentStudentGrade');
        const sectionSelect = document.getElementById('parentStudentSection');

        const grade = gradeSelect ? gradeSelect.value : '';
        const section = sectionSelect ? sectionSelect.value : '';

        if (!parentName) {
            showRegisterAlert('خطأ: يرجى إدخال اسم الطالب أو ولي الأمر الكامل!', 'bg-red-100 text-red-700 border border-red-300');
            return;
        }

        if (!grade) {
            showRegisterAlert('خطأ: الصف الدراسي إجباري لأولياء الأمور والطلاب!', 'bg-red-100 text-red-700 border border-red-300');
            return;
        }

        if (!section) {
            showRegisterAlert('خطأ: الشعبة الدراسية إجبارية لأولياء الأمور والطلاب!', 'bg-red-100 text-red-700 border border-red-300');
            return;
        }

        mongoDocumentPayload = {
            collection: "school_users",
            connectionUri: MONGO_CONFIG.connectionString,
            document: {
                username: username,
                password: password,
                fullName: parentName,
                role: "طالب / ولي أمر",
                studentClass: `${grade} - ${section}`,
                phone: phone,
                registeredAt: new Date().toISOString()
            }
        };
    }

    try {
        let storedUsers = JSON.parse(localStorage.getItem('mongo_school_users') || '[]');
        if (storedUsers.length === 0) {
            storedUsers = OFFICIAL_SCHOOL_STAFF.map(staff => ({ document: staff }));
        }

        const usernameExists = storedUsers.some(u => u.document.username === username);
        if (usernameExists) {
            showRegisterAlert('اسم المستخدم هذا محجوز مسبقاً، يرجى اختيار اسم مستخدم آخر.', 'bg-amber-100 text-amber-800 border border-amber-300');
            return;
        }

        storedUsers.push(mongoDocumentPayload);
        localStorage.setItem('mongo_school_users', JSON.stringify(storedUsers));
        localStorage.setItem('currentUserSession', JSON.stringify(mongoDocumentPayload.document));

        showRegisterAlert(`تم تسجيل الحساب وتخزين البيانات بنجاح لـ (${username})! جاري التوجيه...`, 'bg-emerald-100 text-emerald-800 border border-emerald-300');

        setTimeout(() => {
            redirectBasedOnRole(mongoDocumentPayload.document.role);
        }, 1200);

    } catch (err) {
        showRegisterAlert('حدث خطأ أثناء حفظ البيانات.', 'bg-red-100 text-red-700 border border-red-300');
    }
}

function showRegisterAlert(msg, bgClass) {
    const box = document.getElementById('regAlert');
    if (!box) return;
    box.className = `mb-5 p-3.5 rounded-xl text-sm text-center font-bold shadow-sm transition-all ${bgClass}`;
    box.textContent = msg;
    box.classList.remove('hidden');
}

// ==========================================
// 5. دالة تسجيل الدخول الموحدة وتوجيه كل مستصفح لصفحته المخصصة بدقة
// ==========================================
function handleDatabaseLogin(e) {
    e.preventDefault();

    const usernameInput = document.getElementById('loginUsername').value.trim();
    const passwordInput = document.getElementById('loginPassword').value;

    let storedUsers = JSON.parse(localStorage.getItem('mongo_school_users') || '[]');
    if (storedUsers.length === 0) {
        storedUsers = OFFICIAL_SCHOOL_STAFF.map(staff => ({ document: staff }));
        localStorage.setItem('mongo_school_users', JSON.stringify(storedUsers));
    }

    const matchedUserWrapper = storedUsers.find(u => 
        u.document && 
        u.document.username === usernameInput && 
        u.document.password === passwordInput
    );

    if (matchedUserWrapper) {
        const userData = matchedUserWrapper.document;
        localStorage.setItem('currentUserSession', JSON.stringify(userData));

        showLoginAlert(`مرحباً بك يا ${userData.fullName} (${userData.role})! جاري نقلك لصفحتك...`, 'bg-emerald-100 text-emerald-800 border border-emerald-300');

        setTimeout(() => {
            redirectBasedOnRole(userData.role);
        }, 1000);

    } else {
        showLoginAlert('عذراً، اسم المستخدم أو كلمة السر غير صحيحة!', 'bg-red-100 text-red-700 border border-red-300');
    }
}

// دالة التوجيه الذكي حسب المسمى الوظيفي
function redirectBasedOnRole(role) {
    if (role === 'مدير المدرسة') {
        window.location.href = 'admin.html';
    } else if (role === 'مساعد مدير') {
        window.location.href = 'assistant-admin.html';
    } else if (role === 'مرشد تربوي' || role === 'مساعد مرشد') {
        window.location.href = 'counselor.html';
    } else if (role === 'امين عهدة') {
        window.location.href = 'storekeeper.html';
    } else if (role === 'معلم' || role === 'إداري') {
        window.location.href = 'teacher.html';
    } else {
        window.location.href = 'student-dashboard.html';
    }
}

function showLoginAlert(msg, bgClass) {
    const box = document.getElementById('loginAlert');
    if (!box) return;
    box.className = `mb-5 p-3.5 rounded-xl text-sm text-center font-bold shadow-sm transition-all ${bgClass}`;
    box.textContent = msg;
    box.classList.remove('hidden');
}

// تسجيل الخروج
function logout() {
    localStorage.removeItem('currentUserSession');
    window.location.href = 'login.html';
}

// ==========================================
// 6. لوحة المعلم والبيانات الشخصية والشهادات
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

    alert('تمت إضافة الدورة/الشهادة بنجاح!');
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

// تحميل اللوحات العامة للمسؤولين
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
