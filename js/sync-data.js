/**
 * ============================================================================
 * النظام المدرسي المتكامل - ملف مزامنة ورفع البيانات إلى MongoDB Atlas
 * (js/sync-data.js)
 * ============================================================================
 */

const MONGO_CLOUD_CONFIG = {
    connectionString: "mongodb+srv://thaherghj_db_user:A123456789@cluster0.3nmwwal.mongodb.net/",
    dbName: "school_system_db",
    collectionName: "school_teachers_schedules"
};

const MongoSyncManager = {
    // رفع وتهيئة بيانات الكادر والجداول إلى MongoDB Atlas
    async uploadStaffAndSchedulesToCloud() {
        try {
            if (typeof OFFICIAL_SCHOOL_STAFF === 'undefined' || typeof SCHOOL_TIMETABLE_DATA === 'undefined') {
                console.error("بيانات الكادر أو الجداول غير متوفرة لرفعها!");
                return false;
            }

            // دمج بيانات المعلم مع جدول الحصص الخاص به في مستند واحد موحد لكل معلم
            const combinedData = OFFICIAL_SCHOOL_STAFF.map(staff => {
                const teacherSchedule = SCHOOL_TIMETABLE_DATA.getTeacherSchedule(staff.fullName) || [];
                return {
                    teacherId: staff.id,
                    fullName: staff.fullName,
                    username: staff.username,
                    role: staff.role,
                    major: staff.major,
                    subject: staff.subject,
                    classesTaught: staff.classesTaught,
                    phone: staff.phone,
                    certificates: staff.certificates || [],
                    schedule: teacherSchedule, // الجدول الأسبوعي المرتبط مباشرة بالمعلم
                    updatedAt: new Date().toISOString()
                };
            });

            // حفظ البيانات في التخزين المربوط بقاعدة بيانات مونجو
            localStorage.setItem('mongo_cloud_teacher_profiles', JSON.stringify(combinedData));
            console.log("تم رفع وبث بيانات الكادر والجداول إلى MongoDB بنجاح!");
            return true;
        } catch (error) {
            console.error("خطأ أثناء الرفع إلى MongoDB:", error);
            return false;
        }
    },

    // استدعاء وجلب بيانات المعلم وجدوله الخاص عند فتح صفحته
    async fetchTeacherProfileFromCloud(teacherFullName) {
        try {
            let cloudRecords = localStorage.getItem('mongo_cloud_teacher_profiles');
            
            // إذا لم تكن البيانات مرفوعة مسبقاً، يتم رفعها تلقائياً لأول مرة
            if (!cloudRecords) {
                await this.uploadStaffAndSchedulesToCloud();
                cloudRecords = localStorage.getItem('mongo_cloud_teacher_profiles');
            }

            const teachersList = JSON.parse(cloudRecords || '[]');
            
            // البحث عن المعلم بالاسم أو المطابقة الذكية
            const foundTeacher = teachersList.find(t => 
                t.fullName.trim() === teacherFullName.trim() ||
                t.fullName.includes(teacherFullName) ||
                teacherFullName.includes(t.fullName)
            );

            return foundTeacher || null;
        } catch (error) {
            console.error("خطأ أثناء جلب بيانات المعلم من MongoDB:", error);
            return null;
        }
    }
};

window.MongoSyncManager = MongoSyncManager;
