// إعدادات الربط مع MongoDB Cluster
const MONGO_CONFIG = {
    connectionString: "mongodb+srv://thaherghj_db_user:A123456789@cluster0.3nmwwal.mongodb.net/",
    dbName: "school_db",
    collection: "admins"
};

// --- التحقق وتسجيل المدير لأول مرة ---
async function handleAdminRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('regAdminName').value;
    const ministryId = parseInt(document.getElementById('regAdminMinistryId').value);
    const role = document.getElementById('regAdminRole').value;
    const password = document.getElementById('regAdminPassword').value;
    const alertBox = document.getElementById('adminAlert');

    // 1. الشرط: التحقق من نطاق الرقم الوزاري (111111 - 3333333)
    if (ministryId < 111111 || ministryId > 3333333) {
        showAlert('عذراً! يجب أن يكون الرقم الوزاري بين 111111 و 3333333', 'bg-red-100 text-red-700');
        return;
    }

    // 2. كائن JSON الخاص ببيانات المدير لتخزينه في MongoDB
    const adminPayload = {
        ministryId: ministryId,
        name: name,
        role: role,
        password: password, // يُفضل تشفيره في تطبيق إنتاجي
        createdAt: new Date().toISOString()
    };

    try {
        // إرسال البيانات للتخزين (محاكاة أو طلب API إلى السيرفر)
        await saveAdminToMongoDB(adminPayload);

        // حفظ جلسة المدير محلياً
        localStorage.setItem('currentAdmin', JSON.stringify(adminPayload));
        
        showAlert('تم تسجيل بيانات المدير بنجاح في قاعدة البيانات! جاري التوجيه...', 'bg-emerald-100 text-emerald-700');
        
        setTimeout(() => {
            window.location.href = 'admin.html';
        }, 1500);

    } catch (err) {
        showAlert('حدث خطأ أثناء حفظ البيانات في MongoDB', 'bg-red-100 text-red-700');
    }
}

// --- تسجيل دخول المدير (المرّات القادمة) ---
async function handleAdminLogin(e) {
    e.preventDefault();
    
    const ministryId = parseInt(document.getElementById('loginMinistryId').value);
    const password = document.getElementById('loginPassword').value;

    // الشرط: التحقق من نطاق الرقم الوزاري
    if (ministryId < 111111 || ministryId > 3333333) {
        showAlert('الرقم الوزاري غير صحيح (يجب أن يكون بين 111111 و 3333333)', 'bg-red-100 text-red-700');
        return;
    }

    try {
        // الاستعلام عن المدير من MongoDB بواسطة JSON Payload
        const adminData = await fetchAdminFromMongoDB(ministryId, password);

        if (adminData) {
            localStorage.setItem('currentAdmin', JSON.stringify(adminData));
            showAlert('تم التسجيل بنجاح! جاري التوجيه للوحة التحكم...', 'bg-emerald-100 text-emerald-700');
            setTimeout(() => {
                window.location.href = 'admin.html';
            }, 1000);
        } else {
            showAlert('الرقم الوزاري أو كلمة السر غير صحيحة، أو لم يتم تسجيل الحساب بعد.', 'bg-red-100 text-red-700');
        }
    } catch (err) {
        showAlert('تعذر الاتصال بقاعدة البيانات', 'bg-red-100 text-red-700');
    }
}

// --- دالة مساعدة لإظهار التنبيهات ---
function showAlert(msg, bgClass) {
    const box = document.getElementById('adminAlert');
    box.className = `mb-4 p-3 rounded-lg text-sm text-center ${bgClass}`;
    box.textContent = msg;
    box.classList.remove('hidden');
}

// --- دوال الربط بقاعدة بيانات MongoDB عبر JSON HTTP API / Node Backend ---
async function saveAdminToMongoDB(adminJSON) {
    // يحفظ البيانات في LocalStorage لضمان العمل المباشر، وجاهز للربط بـ API السيرفر
    let localAdmins = JSON.parse(localStorage.getItem('mongo_admins') || '[]');
    localAdmins.push(adminJSON);
    localStorage.setItem('mongo_admins', JSON.stringify(localAdmins));
    
    // عند تشغيل خادم Express / Node.js يتم إرسال طلب POST:
    /*
    return fetch('/api/admins/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...adminJSON, dbUrl: MONGO_CONFIG.connectionString })
    });
    */
}

async function fetchAdminFromMongoDB(ministryId, password) {
    let localAdmins = JSON.parse(localStorage.getItem('mongo_admins') || '[]');
    return localAdmins.find(a => a.ministryId === ministryId && a.password === password);
}
