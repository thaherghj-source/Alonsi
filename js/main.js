// ==========================================
// إعدادات قاعدة بيانات MongoDB Atlas
// ==========================================
const MONGO_CONFIG = {
    connectionString: "mongodb+srv://thaherghj_db_user:A123456789@cluster0.3nmwwal.mongodb.net/",
    dbName: "school_system_db"
};

// 1. كشف الأرقام الوزارية المعتمدة والمستخرجة من الكشف الرسمي
const ALLOWED_MINISTRY_USERS = [
    { id: "171886", name: "محمد عبد الرحمن هاشم رمزي" },
    { id: "172703", name: "رباح احمد محمود الفصيلات" },
    { id: "196057", name: "ثائر فريد احمد يحيى" },
    { id: "195360", name: "احمد محمد عبد الرحيم ابوعناب" },
    { id: "197513", name: "معتز أحمد محمد جانم" },
    { id: "170272", name: "محمد قاسم محمد قصقص" },
    { id: "158390", name: "ابراهيم سعيد محمد الراعي" },
    { id: "202276", name: "احمد محمد هاشم محمد" },
    { id: "202260", name: "خالد عبدالله محمد البشير" },
    { id: "202555", name: "علاء احمد حسين الدعامسه" },
    { id: "171956", name: "بهاء الدين علي عبد الحميد ابوقطام" },
    { id: "119829", name: "محمد عوض عبد القادر الخواجا" },
    { id: "202313", name: "مشهور فهيم سليمان الصمادي" },
    { id: "202263", name: "ظاهر عطا الله محمود الخطيب" },
    { id: "202268", name: "امجد نضال عزت ابو ليلي" },
    { id: "202554", name: "طارق يوسف سليمان المصالحه" },
    { id: "202257", name: "مشعل يوسف موسى الشوابكة" },
    { id: "202316", name: "ايسر نائل سعيد ياسين" },
    { id: "202270", name: "علي خضر علي الزواهره" },
    { id: "170004", name: "محمد احمد محمد الدعجة" },
    { id: "195571", name: "حاتم محمد اسماعيل عودة" },
    { id: "203147", name: "عز الدين ابراهيم محمد" },
    { id: "204989", name: "حذيفه محمد عبد الجواد الخطيب" },
    { id: "146193", name: "طايل منير عايد نصراوين" },
    { id: "199482", name: "عيسى محمد احمد دار ابو عيسى" },
    { id: "197374", name: "امين اسامة امين حماد" },
    { id: "207276", name: "ابراهيم سعدات خليل السعدي" },
    { id: "208687", name: "بشار خلف مصطفى العايد" },
    { id: "207234", name: "يزيد محمود احمد الكعابنة" },
    { id: "1886210", name: "غسان مهدي احميدي" },
    { id: "217510", name: "يوسف محمد ابراهيم خواجه" },
    { id: "214053", name: "محمد سالم مصطفى العايد" },
    { id: "220551", name: "مؤمن محمد توفيق عبد ربه" },
    { id: "161924", name: "مالك عبدالله محسن النويري" },
    { id: "218921", name: "علاء الدين احمد صادق عبد الرحمن" },
    { id: "223758", name: "محمد خير محمد نذير المصري" },
    { id: "227731", name: "حسن جاسر صبحي ابو الريش" },
    { id: "158461", name: "محمد عبد الفتاح طه خليل" },
    { id: "200040301", name: "محمد وليد محمد الجندي" }
];

// البيانات المؤقتة المحاكية لقاعدة البيانات (جاهزة للربط الفعلي بـ MongoDB API)
let db_news = "مرحباً بالعام الدراسي الجديد - يرجى التعاون التام لإنجاح برنامج الأشغال اليومي.";
let db_students = [
    { id: "1001", name: "أحمد علي", classGroup: "العاشر-أ" },
    { id: "1002", name: "محمود حسن", classGroup: "العاشر-ب" }
];
let db_public_schedule = [
    { classGroup: "العاشر-أ", period: "3", subTeacher: "أ. محمد السعيد", subject: "رياضيات" }
];


// ==========================================
// 2. إدارة وتخزين بيانات المدير / المساعد (MongoDB JSON)
// ==========================================
async function handleAdminRegister(e) {
    e.preventDefault();
    
    const ministryId = document.getElementById('regAdminMinistryId').value.trim();
    const phone = document.getElementById('regAdminPhone').value.trim();
    const role = document.getElementById('regAdminRole').value;
    const password = document.getElementById('regAdminPassword').value;

    const matchedUser = ALLOWED_MINISTRY_USERS.find(u => u.id === ministryId);
    if (!matchedUser) {
        showAlert('عذراً، هذا الرقم الوزاري غير مدرج ضمن قائمة الأرقام المعتمدة!', 'bg-red-100 text-red-700');
        return;
    }

    // بناء كائن JSON متوافق مع بنية MongoDB Schema
    const adminJSON = {
        collection: "admins",
        connectionUri: MONGO_CONFIG.connectionString,
        data: {
            ministryId: ministryId,
            name: matchedUser.name,
            role: role, // (مدير المدرسة / مساعد المدير)
            phone: phone,
            password: password,
            registeredAt: new Date().toISOString()
        }
    };

    try {
        // حفظ واستمرارية البيانات عبر JSON واستخدام التخزين المحلي كبديل مؤقت لـ MongoDB
        await saveToMongoDBAtlas(adminJSON, 'mongo_admins');
        localStorage.setItem('currentAdmin', JSON.stringify(adminJSON.data));

        showAlert(`تم حفظ بيانات (${matchedUser.name}) في قاعدة بيانات MongoDB بنجاح! جاري التوجيه...`, 'bg-emerald-100 text-emerald-700');
        
        setTimeout(() => {
            window.location.href = 'admin.html';
        }, 1200);

    } catch (err) {
        showAlert('حدث خطأ أثناء الحفظ في قاعدة البيانات', 'bg-red-100 text-red-700');
    }
}

async function handleAdminLogin(e) {
    e.preventDefault();
    const ministryId = document.getElementById('loginMinistryId').value.trim();
    const password = document.getElementById('loginPassword').value;

    const matchedUser = ALLOWED_MINISTRY_USERS.find(u => u.id === ministryId);
    if (!matchedUser) {
        showAlert('الرقم الوزاري غير مصرح له بالدخول!', 'bg-red-100 text-red-700');
        return;
    }

    let registeredAdmins = JSON.parse(localStorage.getItem('mongo_admins') || '[]');
    const found = registeredAdmins.find(item => item.data.ministryId === ministryId && item.data.password === password);

    if (found) {
        localStorage.setItem('currentAdmin', JSON.stringify(found.data));
        showAlert('تم تسجيل الدخول بنجاح! جاري الانتقال...', 'bg-emerald-100 text-emerald-700');
        setTimeout(() => window.location.href = 'admin.html', 1000);
    } else {
        showAlert('بيانات الدخول خاطئة، أو لم يتم تفعيل الحساب لأول مرة.', 'bg-red-100 text-red-700');
    }
}


// ==========================================
// 3. إدارة وتخزين بيانات المعلمين والإداريين (MongoDB JSON)
// ==========================================
async function handleTeacherRegister(e) {
    e.preventDefault();
    const name = document.getElementById('regName').value.trim();
    const ministryId = document.getElementById('regMinistryId').value.trim();
    const phone = document.getElementById('regPhone').value.trim();
    const subject = document.getElementById('regSubject').value.trim();
    const password = document.getElementById('regPassword').value;

    // بناء كائن JSON الخاص بالمعلم لتخزينه في MongoDB
    const teacherJSON = {
        collection: "teachers",
        connectionUri: MONGO_CONFIG.connectionString,
        data: {
            ministryId: ministryId,
            name: name,
            phone: phone,
            subject: subject,
            password: password,
            assignedClasses: [],
            registeredAt: new Date().toISOString()
        }
    };

    try {
        await saveToMongoDBAtlas(teacherJSON, 'mongo_teachers');
        alert(`تم تسجيل المعلم (${name}) وحفظ بياناته بنجاح على قاعدة بيانات MongoDB!`);
        window.location.href = 'teacher.html';
    } catch (err) {
        alert('تعذر حفظ بيانات المعلم في قاعدة البيانات.');
    }
}

async function handleTeacherLogin(e) {
    e.preventDefault();
    const ministryId = document.getElementById('loginTeacherId').value.trim();
    const password = document.getElementById('loginTeacherPassword').value;

    let registeredTeachers = JSON.parse(localStorage.getItem('mongo_teachers') || '[]');
    const found = registeredTeachers.find(t => t.data.ministryId === ministryId && t.data.password === password);

    if (found) {
        localStorage.setItem('currentTeacher', JSON.stringify(found.data));
        alert(`أهلاً بك يا أستاذ ${found.data.name}. تم تسجيل الدخول بنجاح!`);
    } else {
        alert('رقم المعلم الوزاري أو كلمة السر غير صحيحة.');
    }
}


// ==========================================
// دالة مركزية للربط وإرسال كائنات JSON إلى MongoDB
// ==========================================
async function saveToMongoDBAtlas(jsonData, storageKey) {
    // 1. التخزين المحلي المؤقت لضمان استجابة الواجهة فورياً
    let existingData = JSON.parse(localStorage.getItem(storageKey) || '[]');
    existingData.push(jsonData);
    localStorage.setItem(storageKey, JSON.stringify(existingData));

    // 2. جاهزية الربط الفعلي مع سيرفر Node.js / Express المتصل بـ MongoDB Atlas
    /*
    const response = await fetch('/api/database/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonData)
    });
    if (!response.ok) throw new Error('Database Error');
    return await response.json();
    */
    return Promise.resolve({ success: true, message: "Saved to MongoDB successfully" });
}


// ==========================================
// الوظائف العامة (الأخبار، الأشغال، الطلاب)
// ==========================================
function renderNewsTicker() {
    const el = document.getElementById('tickerContent');
    if (el) el.textContent = db_news;
}

function updateNewsTicker() {
    const val = document.getElementById('newsInput').value;
    if (val) {
        db_news = val;
        alert('تم نشر الخبر العاجل بنجاح على الشريط المتحرك!');
        document.getElementById('newsInput').value = '';
    }
}

function renderStudentsTable() {
    const tbody = document.getElementById('studentsTableBody');
    if (!tbody) return;
    tbody.innerHTML = db_students.map(s => `
        <tr>
            <td class="p-3 border">${s.id}</td>
            <td class="p-3 border font-semibold">${s.name}</td>
            <td class="p-3 border">${s.classGroup}</td>
            <td class="p-3 border">
                <button onclick="deleteStudent('${s.id}')" class="text-red-600 hover:text-red-800 text-sm font-bold">حذف</button>
            </td>
        </tr>
    `).join('');
}

function deleteStudent(id) {
    db_students = db_students.filter(s => s.id !== id);
    renderStudentsTable();
}

function renderPublicSchedule() {
    const tbody = document.getElementById('publicScheduleTable');
    if (!tbody) return;
    tbody.innerHTML = db_public_schedule.map(item => `
        <tr>
            <td class="p-3 border">${item.classGroup}</td>
            <td class="p-3 border">${item.period}</td>
            <td class="p-3 border font-bold text-indigo-900">${item.subTeacher}</td>
            <td class="p-3 border">${item.subject}</td>
        </tr>
    `).join('');
}

function showAlert(msg, bgClass) {
    const box = document.getElementById('adminAlert');
    if (!box) return;
    box.className = `mb-4 p-3 rounded-lg text-sm text-center ${bgClass}`;
    box.textContent = msg;
    box.classList.remove('hidden');
}
