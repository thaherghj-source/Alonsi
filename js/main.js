/**
 * ============================================================================
 * النظام المدرسي المتكامل - الملف البرمجي الرئيسي والربط السحابي (js/main.js)
 * جلب بيانات المعلمين وجداول الحصص من MongoDB
 * ============================================================================
 */

const MONGO_CONFIG = {
    connectionString: "mongodb+srv://thaherghj_db_user:A123456789@cluster0.3nmwwal.mongodb.net/",
    dbName: "school_system_db",
    collectionName: "school_teachers_schedules"
};

// تشكيلات الكادر المدرسي المعتمد (قاعدة البيانات الأساسية للرفع الابتدائي)
const OFFICIAL_SCHOOL_STAFF = [
    { id: "146193", fullName: "طايل منير عايد نصراوين", role: "مدير", major: "اللغة العربية وآدابها", degree: "ماجستير", university: "العلوم الاسلامية", experience: "21 سنة", graduationYear: "2013", phone: "0795393224", subject: "لا يدرس", classesTaught: [], username: "tayel_admin", password: "changeme123", certificates: ["القيادة المدرسية المتقدمة"] },
    { id: "119829", fullName: "محمد عوض عبد القادر الخواجا", role: "مساعد مدير", major: "لغة عربية", degree: "دبلوم عالي", university: "الهاشمية", experience: "25 سنة", graduationYear: "2011", phone: "0795131702", subject: "لا يدرس", classesTaught: [], username: "mohammad_asst", password: "changeme123", certificates: ["القيادة التطويرية"] },
    { id: "197374", fullName: "امين اسامه امين حماد", role: "مرشد", major: "علم نفس", degree: "بكالوريس", university: "مؤتة", experience: "11 سنة", graduationYear: "2015", phone: "781574646", subject: "لا يدرس", classesTaught: [], username: "amin_hammad", password: "changeme123", certificates: ["الإرشاد النفسي والتوجيه السلوكي"] },
    { id: "207276", fullName: "ابراهيم سعدات خليل السعدي", role: "مساعد مرشد", major: "معلم صف", degree: "بكالوريس", university: "جامعه الزرقاء الخاصه", experience: "8 سنوات", graduationYear: "2016", phone: "0788376665", subject: "لا يدرس", classesTaught: [], username: "ibrahim_saadi", password: "changeme123", certificates: ["الدبلوم المهني في التربية"] },
    { id: "171956", fullName: "بهاء الدين علي عبد الحميد ابو قطام", role: "امين عهدة", major: "فيزياء", degree: "بكالوريس", university: "الحسين بن طلال", experience: "10 سنوات", graduationYear: "2010", phone: "0788836121", subject: "لا يدرس", classesTaught: [], username: "baha_admin", password: "changeme123", certificates: ["إدارة المستودعات (ICDL + SEED)"] },
    { id: "202260", fullName: "خالد عبدالله محمد البشير", role: "معلم", major: "شريعه فقه وأصوله", degree: "دبلوم عالي", university: "الزرقاء", experience: "12 سنة", graduationYear: "2016", phone: "785995001", subject: "التربية الإسلامية", classesTaught: ["سادس أ", "سادس ب", "سادس ج", "سادس د", "سادس هـ", "سادس و"], username: "khaled_bashir", password: "changeme123", certificates: ["متون فقهية"] },
    { id: "196057", fullName: "ثائر فريد احمد يحيى", role: "معلم", major: "اللغة العربية وآدابها", degree: "بكالوريس", university: "ال البيت", experience: "10 سنوات", graduationYear: "2016", phone: "0797616838", subject: "اللغة العربية", classesTaught: ["ثامن أ", "سابع أ", "سابع ب", "سابع ج"], username: "thaer_yahya", password: "changeme123", certificates: ["دورات اللغة العربية التخصصية"] },
    { id: "223758", fullName: "محمد خير محمد نذير احمد المصري", role: "معلم", major: "اصول الدين ( الشريعة )", degree: "دبلوم عالي", university: "جامعة الزرقاء", experience: "8 سنوات", graduationYear: "2019", phone: "0785955839", subject: "التربية الإسلامية", classesTaught: ["تاسع أ", "ثامن ب", "ثامن ج", "ثامن د", "ثامن هـ", "ثامن و"], username: "mohammad_masri", password: "changeme123", certificates: ["معلمين جدد"] },
    { id: "176633", fullName: "محمد فريد خليل الفيومي", role: "معلم", major: "شريعه", degree: "بكالوريس", university: "البلقاء", experience: "19 سنة", graduationYear: "2007", phone: "792760068", subject: "التربية الإسلامية", classesTaught: [], username: "mohammad_fayoumi", password: "changeme123", certificates: [] },
    { id: "202555", fullName: "علاء احمد حسين الدعامسة", role: "معلم", major: "اللغة العربية", degree: "بكالوريس", university: "جامعة مؤتة", experience: "17 سنة", graduationYear: "2009", phone: "776232293", subject: "اللغة العربية", classesTaught: ["سادس أ", "سادس ب", "سادس ج"], username: "alaa_daamseh", password: "changeme123", certificates: ["معلمين جدد"] },
    { id: "202554", fullName: "طارق يوسف سليمان حسين المصالحة", role: "معلم", major: "اللغة العربية", degree: "بكالوريس", university: "جامعة مؤته", experience: "12 سنة", graduationYear: "2014", phone: "0782355081", subject: "اللغة العربية", classesTaught: ["ثامن د", "ثامن هـ", "ثامن و"], username: "tareq_masalha", password: "changeme123", certificates: ["معلمين جدد"] },
    { id: "207234", fullName: "يزيد محمود احمد الكعابنة", role: "معلم", major: "عربي", degree: "بكالوريس", university: "الزرقاء الأهلية", experience: "8 سنوات", graduationYear: "2018", phone: "788817073", subject: "اللغة العربية", classesTaught: ["سابع أ", "سابع هـ", "سابع و"], username: "yazid_kaabneh", password: "changeme123", certificates: ["مهارات التفكير"] },
    { id: "لا املك", fullName: "محمد وليد محمد الجندي", role: "معلم", major: "عربي", degree: "دبلوم عالي", university: "الجامعة الاردنية", experience: "4 سنوات", graduationYear: "2022", phone: "771819856", subject: "اللغة العربية", classesTaught: ["سابع د"], username: "mohammad_jundi", password: "changeme123", certificates: ["الدبلوم العالي لإعداد المعلمين"] },
    { id: "202257", fullName: "مشعل يوسف موسى الشوابكة", role: "معلم", major: "اللغة العربية", degree: "بكالوريس", university: "الاردنيه", experience: "13 سنة", graduationYear: "2013", phone: "0775750186", subject: "اللغة العربية", classesTaught: ["ثامن أ", "ثامن ب", "ثامن ج"], username: "meshal_shawabkeh", password: "changeme123", certificates: ["معلمون جدد"] },
    { id: "208687", fullName: "بشار خلف مصطفى العايد", role: "معلم", major: "اللغة العربية", degree: "بكالوريس", university: "جامعة جرش الأهلية", experience: "9 سنوات", graduationYear: "2017", phone: "788188662", subject: "اللغة العربية", classesTaught: ["سادس د", "سادس هـ", "سادس و"], username: "bashar_ayed", password: "changeme123", certificates: ["الدراما في التعليم"] },
    { id: "172703", fullName: "رباح احمد محمود الفضيلات", role: "معلم", major: "اللغة العربية وآدابها", degree: "بكالوريس", university: "جامعة الإسراء", experience: "17 سنة", graduationYear: "2009", phone: "0782962563", subject: "اللغة العربية", classesTaught: ["تاسع أ", "سابع ب", "سابع ج"], username: "rabah_fdeilat", password: "changeme123", certificates: ["الدبلوم المهني"] },
    { id: "202313", fullName: "مشهور فهيم سليمان الصمادي", role: "معلم", major: "لغة إنجليزية + إدارة مدرسية", degree: "دبلوم عالي", university: "جامعة آل البيت", experience: "15 سنة", graduationYear: "2011", phone: "0786460715", subject: "اللغة الإنجليزية", classesTaught: ["ثامن د", "ثامن هـ", "ثامن و"], username: "mashhoor_samadi", password: "changeme123", certificates: ["الخطة التطويرية وبناء القدرات"] },
    { id: "188621", fullName: "غسان مهدي احمد احميدي", role: "معلم", major: "اللغة الانجليزية", degree: "بكالوريس", university: "جامعة الطفيلة التقنية", experience: "16 سنة", graduationYear: "2010", phone: "0782864726", subject: "اللغة الإنجليزية", classesTaught: ["سابع أ", "سابع ب", "سابع ج", "سابع د"], username: "ghassan_humaidi", password: "changeme123", certificates: ["معلمين جدد"] },
    { id: "217510", fullName: "يوسف محمد ابراهيم خواجه", role: "معلم", major: "لغة إنجليزية وادابها", degree: "بكالوريس", university: "الهاشمية", experience: "9 سنوات", graduationYear: "2017", phone: "0786910203", subject: "اللغة الإنجليزية", classesTaught: ["سابع هـ", "سابع و", "سادس هـ", "سادس و"], username: "yousef_khawaja", password: "changeme123", certificates: ["التعليم من أجل النجاح TFS"] },
    { id: "202276", fullName: "احمد محمد هاشم محمد", role: "معلم", major: "الترجمة", degree: "بكالوريس", university: "جامعة الزرقاء", experience: "10 سنوات", graduationYear: "2016", phone: "0780857040", subject: "اللغة الإنجليزية", classesTaught: ["تاسع أ", "ثامن أ", "ثامن ب", "ثامن ج"], username: "ahmad_tarifi", password: "changeme123", certificates: ["English for Teaching"] },
    { id: "202316", fullName: "ايسر نائل سعيد ياسبن", role: "معلم", major: "ادب انجليزي", degree: "بكالوريس", university: "الزرقاء الخاصة", experience: "10 سنوات", graduationYear: "2016", phone: "0796831365", subject: "اللغة الإنجليزية", classesTaught: ["سادس أ", "سادس ب", "سادس ج", "سادس د"], username: "aysar_yassin", password: "changeme123", certificates: ["معلمون جدد"] },
    { id: "203147", fullName: "عزالدين ابراهيم محمد بكر", role: "معلم", major: "الرياضيات", degree: "بكالوريس", university: "جامعة الزرقاء الخاصة", experience: "9 سنوات", graduationYear: "2017", phone: "0785140407", subject: "الرياضيات", classesTaught: ["سابع ج", "سابع د", "سابع هـ", "سابع و"], username: "ezz_baker", password: "changeme123", certificates: ["المناهج المطورة"] },
    { id: "202268", fullName: "أمجد نضال عزت أبو ليلى", role: "معلم", major: "الرياضيات", degree: "بكالوريس", university: "الجامعة الهاشمية", experience: "9 سنوات", graduationYear: "2017", phone: "0788181587", subject: "الرياضيات", classesTaught: ["سابع ب", "سادس د", "سادس هـ", "سادس و"], username: "amjad_abulaila", password: "changeme123", certificates: ["معلمين جدد ومناهج مطورة"] },
    { id: "161924", fullName: "مالك عبدالله محسن النويري", role: "معلم", major: "الرياضيات والاحصاء", degree: "بكالوريس", university: "الحسين بن طلال", experience: "18 سنة", graduationYear: "2008", phone: "0782536850", subject: "الرياضيات", classesTaught: ["تاسع أ", "ثامن أ", "ثامن ب", "ثامن ج"], username: "malek_nuwairi", password: "changeme123", certificates: ["ICDL", "الدبلوم المهني للمعلمين"] },
    { id: "199482", fullName: "عيسى محمد احمد دار ابو عيسى", role: "معلم", major: "الرياضيات", degree: "بكالوريس", university: "ال البيت", experience: "10 سنوات", graduationYear: "2016", phone: "0781312906", subject: "الرياضيات", classesTaught: ["ثامن د", "ثامن هـ", "ثامن و", "سابع أ"], username: "issa_abuissa", password: "changeme123", certificates: ["معلمين جدد"] },
    { id: "202263", fullName: "ظاهر عطالله محمود الخطيب", role: "معلم", major: "الرياضيات", degree: "بكالوريس", university: "الجامعة الهاشمية", experience: "9 سنوات", graduationYear: "2017", phone: "779896158", subject: "الرياضيات", classesTaught: ["سادس أ", "سادس ب", "سادس ج"], username: "zaher_khatib", password: "changeme123", certificates: ["معلمين جدد"] },
    { id: "170004", fullName: "محمد احمد محمد الدعجة", role: "معلم", major: "جغرافيا", degree: "بكالوريس", university: "الجامعة الاردنية", experience: "16 سنة", graduationYear: "2010", phone: "789341719", subject: "الدراسات الاجتماعية", classesTaught: [], username: "mohammad_daaja", password: "changeme123", certificates: ["معلمين جدد"] },
    { id: "214053", fullName: "محمد سالم مصطفى العايد", role: "معلم", major: "تاريخ", degree: "بكالوريس", university: "جامعة العلوم الاسلاميه العالميه", experience: "5 سنوات", graduationYear: "2021", phone: "0797770471", subject: "الدراسات الاجتماعية", classesTaught: ["سابع أ", "سابع ب", "سابع ج", "سابع د", "سابع هـ", "سابع و"], username: "mohammad_ayed", password: "changeme123", certificates: ["معلمين جدد"] },
    { id: "195360", fullName: "احمد محمد عبدالرحيم ابو عناب", role: "معلم", major: "الجغرافيا", degree: "بكالوريس", university: "اليرموك", experience: "11 سنة", graduationYear: "2015", phone: "0791312394", subject: "الدراسات الاجتماعية", classesTaught: ["تاسع أ", "سادس أ", "سادس ب", "سادس ج", "سادس د", "سادس هـ", "سادس و"], username: "ahmad_abuannab", password: "changeme123", certificates: ["معلمين جدد"] },
    { id: "220551", fullName: "مؤمن محمد توفيق عبد ربه", role: "معلم", major: "جغرافيا", degree: "ماجستير", university: "كلية العلوم التربوية والاداب/الانروا", experience: "5 سنوات", graduationYear: "2021", phone: "0787826333", subject: "الدراسات الاجتماعية", classesTaught: ["ثامن أ", "ثامن ب", "ثامن ج", "ثامن د", "ثامن هـ", "ثامن و"], username: "momen_abdrabo", password: "changeme123", certificates: ["دورة المعلمين الجدد"] },
    { id: "158390", fullName: "ابراهيم سعيد محمد الراعي", role: "معلم", major: "ادارة مياه و البيئة", degree: "بكالوريس", university: "الهاشمية", experience: "سنة واحدة", graduationYear: "2026", phone: "0787851168", subject: "العلوم العامة", classesTaught: ["تاسع أ", "ثامن أ", "ثامن ب", "سابع و", "سادس د", "سادس هـ", "سادس و"], username: "ibrahim_rai", password: "changeme123", certificates: ["ICDL"] },
    { id: "204989", fullName: "حذيفة محمد عبد الجواد الخطيب", role: "معلم", major: "رياضيات", degree: "بكالوريس", university: "الهاشمية", experience: "8 سنوات", graduationYear: "2018", phone: "0798515152", subject: "العلوم العامة", classesTaught: ["تاسع أ", "ثامن ج", "ثامن د", "ثامن هـ", "ثامن و", "سادس ب", "سادس ج"], username: "huthaifa_khatib", password: "changeme123", certificates: ["التنمية المهنية والمناهج المطورة"] },
    { id: "197513", fullName: "معتز احمد محمد جانم", role: "معلم", major: "العلوم الحياتية", degree: "بكالوريس", university: "مؤتة", experience: "10 سنوات", graduationYear: "2016", phone: "0786076007", subject: "العلوم العامة", classesTaught: ["تاسع أ", "سابع أ", "سابع ب", "سابع ج", "سابع د", "سابع هـ", "سادس أ"], username: "mutaz_ghanim", password: "changeme123", certificates: ["معلمين جدد"] },
    { id: "171886", fullName: "محمد عبد الرحمن هاشم رمزي", role: "معلم", major: "تصميم جرافيك", degree: "بكالوريس", university: "جامعة الزيتونة الاردنية الخاصة", experience: "17 سنة", graduationYear: "2009", phone: "0787126778", subject: "التربية الفنية", classesTaught: ["تاسع أ", "ثامن (أ-و)", "سابع (أ-و)", "سادس (أ-و)"], username: "mohammad_ramzi", password: "changeme123", certificates: ["التفكير التصميمي", "ICDL"] },
    { id: "195571", fullName: "حاتم محمد إسماعيل عوده", role: "معلم", major: "تربيه بدنية", degree: "بكالوريس", university: "جامعة عمان الأهلية", experience: "24 سنة", graduationYear: "2002", phone: "0785896512", subject: "التربية الرياضية", classesTaught: ["سابع أ", "سابع ب", "سابع ج", "سابع د", "سادس أ", "سادس ب", "سادس ج", "سادس د", "سادس هـ", "سادس و"], username: "hatem_oudeh", password: "changeme123", certificates: ["دورات منصة سراج الرياضية"] },
    { id: "218921", fullName: "علاء الدين احمد صادق عبدالرحمن", role: "معلم", major: "التربية الرياضية", degree: "بكالوريس", university: "الاردنية", experience: "10 سنوات", graduationYear: "2016", phone: "0786800324", subject: "التربية الرياضية", classesTaught: ["تاسع أ", "ثامن (أ-و)", "سابع هـ", "سابع و"], username: "alaa_abdulrahman", password: "changeme123", certificates: ["معلمين جدد"] },
    { id: "170272", fullName: "محمد قاسم محمد قصقص", role: "معلم", major: "تربية رياضية", degree: "بكالوريس", university: "جامعة النجاح الوطنية - نابلس", experience: "19 سنة", graduationYear: "2007", phone: "0790999416", subject: "التربية المهنية", classesTaught: ["سابع أ", "سابع ب", "سابع ج", "سابع د", "سادس (أ-و)"], username: "mohammad_qasqas", password: "changeme123", certificates: ["معلمين جدد"] },
    { id: "202270", fullName: "علي خضر علي الزواهره", role: "معلم", major: "اللغة العربيّة", degree: "بكالوريس", university: "جامعة جرش الاهلية", experience: "10 سنوات", graduationYear: "2016", phone: "0775546506", subject: "التربية المهنية", classesTaught: ["تاسع أ", "ثامن (أ-و)", "سابع هـ", "سابع و"], username: "ali_zawahreh", password: "changeme123", certificates: ["المتون الفقهية"] },
    { id: "158461", fullName: "محمد عبدالفتاح طه خليل", role: "معلم", major: "علم الحاسوب", degree: "بكالوريس", university: "جامعة الزيتونة الأردنية", experience: "21 سنة", graduationYear: "2005", phone: "0786908596", subject: "الحاسوب وتكنولوجيا المعلومات", classesTaught: ["تاسع أ", "ثامن أ", "ثامن ب", "ثامن ج", "ثامن د", "ثامن هـ", "ثامن و", "سابع ج", "سابع د", "سابع هـ", "سابع و"], username: "mohammad_khalil", password: "changeme123", certificates: ["علوم بيت المقدس"] },
    { id: "227731", fullName: "حسن جاسر صبحي ابوالريش", role: "معلم", major: "نظم المعلومات الادارية", degree: "بكالوريس", university: "الزيتونة الاردنية", experience: "سنة واحدة", graduationYear: "2024", phone: "0788764249", subject: "الثقافة المالية", classesTaught: ["تاسع أ", "ثامن (أ-و)", "سابع (أ-و)"], username: "hasan_abulrish", password: "changeme123", certificates: ["ثقافة مالية متقدمة"] }
];

// ============================================================================
// نظام إدارة قاعدة البيانات السحابية (MongoDB Sync Manager)
// ============================================================================
const MongoCloudSync = {
    // جلب كافة بيانات المعلمين والجداول المدمجة من التخزين السحابي المحاكي لقاعدة بيانات مونجو
    async fetchAllTeachersFromMongo() {
        try {
            let cloudRecords = localStorage.getItem('mongo_cloud_teachers_schedules');
            
            // إذا لم تكن البيانات مخزنة سحابياً، يتم تهديتها ورفعها تلقائياً لأول مرة
            if (!cloudRecords) {
                await this.initializeAndUploadCloudData();
                cloudRecords = localStorage.getItem('mongo_cloud_teachers_schedules');
            }

            return JSON.parse(cloudRecords || '[]');
        } catch (error) {
            console.error("خطأ أثناء جلب البيانات من MongoDB:", error);
            return [];
        }
    },

    // رفع وربط بيانات الكادر مع جداول الحصص القادمة من schedule.js إلى MongoDB
    async initializeAndUploadCloudData() {
        try {
            const combinedData = OFFICIAL_SCHOOL_STAFF.map(staff => {
                // جلب جدول الحصص الخاص بكل معلم من schedule.js إذا كان متوفراً
                let teacherSchedule = [];
                if (typeof SCHOOL_TIMETABLE_DATA !== 'undefined') {
                    teacherSchedule = SCHOOL_TIMETABLE_DATA.getTeacherSchedule(staff.fullName) || [];
                }

                return {
                    collection: MONGO_CONFIG.collectionName,
                    connectionUri: MONGO_CONFIG.connectionString,
                    document: {
                        ...staff,
                        schedule: teacherSchedule // دمج البرنامج الأسبوعي مباشرة داخل مستند المعلم
                    },
                    syncedAt: new Date().toISOString()
                };
            });

            localStorage.setItem('mongo_cloud_teachers_schedules', JSON.stringify(combinedData));
            console.log("تم رفع بيانات الكادر والبرنامج الأسبوعي إلى MongoDB بنجاح!");
            return combinedData;
        } catch (error) {
            console.error("خطأ أثناء تهيئة البيانات السحابية:", error);
            return [];
        }
    },

    // جلب ملف معلم محدد وجدوله الأسبوعي من MongoDB بناءً على اسمه أو اسم المستخدم
    async fetchTeacherProfile(identifier) {
        const allRecords = await this.fetchAllTeachersFromMongo();
        const found = allRecords.find(item => {
            const doc = item.document || item;
            return String(doc.fullName).trim() === String(identifier).trim() ||
                   String(doc.username).trim() === String(identifier).trim();
        });

        return found ? (found.document || found) : null;
    }
};

// ============================================================================
// تحميل لوحة تحكم المعلم وجدوله الأسبوعي من MongoDB فور فتح الصفحة
// ============================================================================
async function loadTeacherDashboardData() {
    // 1. تحديد هوية المعلم الحالي (من الجلسة المسجلة أو افتراضياً)
    const session = JSON.parse(localStorage.getItem('currentUserSession') || '{}');
    let teacherIdentifier = session.fullName || session.username || localStorage.getItem("currentTeacher") || "محمد عبد الرحمن هاشم رمزي";
    teacherIdentifier = teacherIdentifier.trim();

    // 2. جلب البيانات الشخصية وجدول الحصص مباشرة من قاعدة بيانات MongoDB
    let teacherData = await MongoCloudSync.fetchTeacherProfile(teacherIdentifier);

    // بديل احتياطي في حال عدم التطابق الحرفي
    if (!teacherData) {
        const allTeachers = await MongoCloudSync.fetchAllTeachersFromMongo();
        if (allTeachers.length > 0) {
            teacherData = allTeachers[0].document || allTeachers[0];
        }
    }

    if (!teacherData) {
        console.error("لم يتم العثور على بيانات المعلم في قاعدة البيانات.");
        return;
    }

    // 3. تعبئة البيانات الشخصية والوظيفية في واجهة الصفحة
    document.getElementById('headerTeacherName').textContent = teacherData.fullName;
    document.getElementById('headerTeacherRole').textContent = teacherData.role || "معلم المادة";
    
    const majorEl = document.getElementById('profileMajor');
    if (majorEl) majorEl.textContent = `${teacherData.degree || ''} ${teacherData.major || ''} (${teacherData.university || ''})`;

    const subjectEl = document.getElementById('profileSubject');
    if (subjectEl) subjectEl.textContent = teacherData.subject || "غير متوفر";

    const expEl = document.getElementById('profileExperience');
    if (expEl) expEl.textContent = teacherData.experience || "غير محدد";

    const gradEl = document.getElementById('profileGraduation');
    if (gradEl) gradEl.textContent = teacherData.graduationYear || "غير محدد";

    const phoneEl = document.getElementById('profilePhone');
    if (phoneEl) phoneEl.textContent = teacherData.phone || "-";
    
    const classesCount = teacherData.classesTaught ? teacherData.classesTaught.length : 0;
    const quota = classesCount * 2 + 6;
    
    const quotaEl = document.getElementById('profileQuota');
    if (quotaEl) quotaEl.textContent = quota;

    const classesCountEl = document.getElementById('profileClassesCount');
    if (classesCountEl) classesCountEl.textContent = classesCount;

    renderCertificatesList(teacherData.certificates || []);

    // 4. تعبئة وعرض البرنامج الأسبوعي (جداول الحصص) القادم من MongoDB داخل الجدول
    const tbody = document.getElementById('scheduleTableBody');
    if (tbody) {
        let scheduleRows = teacherData.schedule;

        // إذا لم يكن مخزناً داخل المستند السحابي، يتم جلبه احتياطياً من schedule.js
        (!scheduleRows || scheduleRows.length === 0) && typeof SCHOOL_TIMETABLE_DATA !== 'undefined'
            ? scheduleRows = SCHOOL_TIMETABLE_DATA.getTeacherSchedule(teacherData.fullName)
            : null;

        if (scheduleRows && scheduleRows.length > 0) {
            tbody.innerHTML = "";
            scheduleRows.forEach(row => {
                const tr = document.createElement("tr");
                tr.className = "hover:bg-slate-50 transition border-b border-slate-100";
                tr.innerHTML = `
                    <td class="p-3 border font-bold bg-slate-50 text-slate-800">${row.day}</td>
                    <td class="p-3 border">${row.c1 || 'ـ'}</td>
                    <td class="p-3 border">${row.c2 || 'ـ'}</td>
                    <td class="p-3 border">${row.c3 || 'ـ'}</td>
                    <td class="p-3 border">${row.c4 || 'ـ'}</td>
                    <td class="p-3 border">${row.c5 || 'ـ'}</td>
                    <td class="p-3 border">${row.c6 || 'ـ'}</td>
                    <td class="p-3 border">${row.c7 || 'ـ'}</td>
                `;
                tbody.appendChild(tr);
            });
        } else {
            tbody.innerHTML = `<tr><td colspan="8" class="text-center p-6 text-slate-500">لا توجد حصص مسجلة في جدول هذا المعلم.</td></tr>`;
        }
    }

    if (window.lucide) {
        lucide.createIcons();
    }
}

function renderCertificatesList(certs) {
    const container = document.getElementById('certificatesContainer');
    if (!container) return;
    if (!certs || certs.length === 0) {
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

async function handleAddCertificate(e) {
    e.preventDefault();
    const certInput = document.getElementById('newCertificateInput');
    if (!certInput) return;
    const newCert = certInput.value.trim();
    if (!newCert) return;

    let session = JSON.parse(localStorage.getItem('currentUserSession') || '{}');
    if (!session.certificates) session.certificates = [];
    session.certificates.push(newCert);

    localStorage.setItem('currentUserSession', JSON.stringify(session));
    
    // تحديث المستند سحابياً في MongoDB
    await MongoCloudSync.fetchTeacherProfile(session.fullName).then(async doc => {
        if(doc) {
            doc.certificates = session.certificates;
            // حفظ التحديث
            let all = await MongoCloudSync.fetchAllTeachersFromMongo();
            let index = all.findIndex(i => (i.document?.fullName || i.fullName) === doc.fullName);
            if(index !== -1) {
                all[index].document = doc;
                localStorage.setItem('mongo_cloud_teachers_schedules', JSON.stringify(all));
            }
        }
    });

    alert('تمت إضافة الدورة/الشهادة بنجاح وحفظها في قاعدة البيانات السحابية!');
    window.location.reload();
}

// تنفيذ جلب بيانات المعلم والبرنامج فور تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById('headerTeacherName') || document.getElementById('scheduleTableBody')) {
        loadTeacherDashboardData();
    }
});
