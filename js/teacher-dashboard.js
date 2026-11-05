/**
 * ============================================================================
 * النظام المدرسي المتكامل - جلب جدول المعلم المسجل دخوله تلقائياً
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", async () => {
    // 1. جلب اسم المعلم المخزن بعد تسجيل الدخول
    const currentTeacherName = localStorage.getItem("loggedInTeacher");

    if (!currentTeacherName) {
        alert("الرجاء تسجيل الدخول أولاً!");
        window.location.href = "login.html"; // العودة لصفحة الدخول إذا لم يكن مسجلاً
        return;
    }

    // عرض اسم المعلم في الواجهة
    const nameDisplay = document.getElementById("teacher-name-display");
    if (nameDisplay) {
        nameDisplay.textContent = currentTeacherName;
    }

    // 2. جلب جدول هذا المعلم تحديداً من MongoDB
    await fetchSpecificTeacherSchedule(currentTeacherName);
});

async function fetchSpecificTeacherSchedule(teacherName) {
    const tableBody = document.getElementById("teacher-schedule-body");
    
    if (!tableBody) return;

    tableBody.innerHTML = `<tr><td colspan="8" style="text-align: center;">جاري جلب جدولك الخاص من قاعدة البيانات... ⏳</td></tr>`;

    try {
        // طلب الجدول الخاص بهذا المعلم فقط عبر الـ API
        const response = await fetch(`/api/schedule/${encodeURIComponent(teacherName)}`);
        
        if (!response.ok) {
            throw new Error("تعذر استرجاع الجدول من الخادم");
        }

        const teacherData = await response.json();

        if (teacherData && teacherData.schedule) {
            renderScheduleTable(teacherData.schedule);
        } else {
            tableBody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: red;">لا يوجد جدول مسجل لهذا المعلم حالياً.</td></tr>`;
        }

    } catch (error) {
        console.error("خطأ في الجلب:", error);
        tableBody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: red;">حدث خطأ أثناء الاتصال بقاعدة البيانات.</td></tr>`;
    }
}

function renderScheduleTable(scheduleArray) {
    const tableBody = document.getElementById("teacher-schedule-body");
    tableBody.innerHTML = "";

    scheduleArray.forEach(row => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>${row.day}</strong></td>
            <td>${row.c1 || "ـ"}</td>
            <td>${row.c2 || "ـ"}</td>
            <td>${row.c3 || "ـ"}</td>
            <td>${row.c4 || "ـ"}</td>
            <td>${row.c5 || "ـ"}</td>
            <td>${row.c6 || "ـ"}</td>
            <td>${row.c7 || "ـ"}</td>
        `;
        tableBody.appendChild(tr);
    });
}
