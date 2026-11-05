/**
 * ============================================================================
 * النظام المدرسي المتكامل - ملف إدارة جداول الحصص والبرنامج الأسبوعي (js/schedule.js)
 * مرتبط مع قاعدة بيانات MongoDB عبر REST API
 * ============================================================================
 */

// دالة مساعدة لإنشاء جدول فارغ للإداريين ومن لا يدرسون الحصص الصفية
function createAdministrativeSchedule() {
    const days = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"];
    return days.map(day => ({
        day: day,
        c1: "ـ", c2: "ـ", c3: "ـ", c4: "ـ", c5: "ـ", c6: "ـ", c7: "ـ"
    }));
}

// كائن البيانات الأساسي (سيتم تحديثه ديناميكياً من MongoDB)
const SCHOOL_TIMETABLE_DATA = {
    days: ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"],
    periodsCount: 7,
    teacherSchedules: {}
};

/**
 * دالة غير متزامنة لجلب الجداول مباشرة من قاعدة بيانات MongoDB عبر خادم الـ API
 */
async function loadSchedulesFromMongoDB() {
    try {
        // استبدل '/api/schedules' برابط الـ Endpoint الفعلي في خادم Node.js الخاص بك
        const response = await fetch('/api/schedules');
        
        if (!response.ok) {
            throw new Error('فشل في استرجاع البيانات من الخادم');
        }

        const data = await response.json();
        
        // تحويل البيانات القادمة من قاعدة البيانات إلى التنسيق المطلوب في الكود
        data.forEach(item => {
            SCHOOL_TIMETABLE_DATA.teacherSchedules[item.teacherName] = item.schedule;
        });

        console.log("تم تحميل جداول المعلمين بنجاح من MongoDB ✅");
        
        // إطلاق حدث لتنبيه الواجهة بأن البيانات أصبحت جاهزة (اختياري)
        document.dispatchEvent(new CustomEvent('schedulesLoaded', { detail: SCHOOL_TIMETABLE_DATA }));

    } catch (error) {
        console.warn("تعذر الاتصال بقاعدة البيانات، يتم استخدام البيانات المحلية الافتراضية:", error.message);
    }
}

// استدعاء دالة الجلب عند تحميل الملف
loadSchedulesFromMongoDB();
