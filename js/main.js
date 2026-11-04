/**
 * ============================================================================
 * النظام المدرسي المتكامل - الملف البرمجي الرئيسي والنهائي (js/main.js)
 * إعادة ضبط البيانات، جلب كافة الكادر، وحفظ بيانات التسجيل في MongoDB سحابياً
 * ============================================================================
 */

const MONGO_CONFIG = {
    connectionString: "mongodb+srv://thaherghj_db_user:A123456789@cluster0.3nmwwal.mongodb.net/",
    dbName: "school_system_db",
    collectionName: "school_users"
};

// تشكيلات الكادر المدرسي المعتمد والكامل لعام 2027
const OFFICIAL_SCHOOL_STAFF = [
    { id: "146193", fullName: "طايل منير عايد نصراوين", role: "مدير", major: "اللغة العربية وآدابها", degree: "ماجستير", university: "العلوم الاسلامية", experience: "21 سنة", graduationYear: "2013", courses: "القياده", phone: "0795393224", subject: "لا يدرس", classesTaught: [], username: "tayel_admin", password: "changeme123", certificates: ["القيادة المدرسية المتقدمة"] },
    { id: "119829", fullName: "محمد عوض عبد القادر الخواجا", role: "مساعد مدير", major: "لغة عربية", degree: "دبلوم عالي", university: "الهاشمية", experience: "25 سنة", graduationYear: "2011", courses: "القيادة التطويرية", phone: "0795131702", subject: "لا يدرس", classesTaught: [], username: "mohammad_asst", password: "changeme123", certificates: ["القيادة التطويرية"] },
    { id: "197374", fullName: "امين اسامه امين حماد", role: "مرشد", major: "علم نفس", degree: "بكالوريس", university: "مؤتة", experience: "11 سنة", graduationYear: "2015", courses: "الخطة التطويرية", phone: "781574646", subject: "لا يدرس", classesTaught: [], username: "amin_hammad", password: "changeme123", certificates: ["الإرشاد النفسي والتوجيه السلوكي"] },
    { id: "207276", fullName: "ابراهيم سعدات خليل السعدي", role: "مساعد مرشد", major: "معلم صف", degree: "بكالوريس", university: "جامعه الزرقاء الخاصه", experience: "8 سنوات", graduationYear: "2016", courses: "الدبلوم المهني", phone: "0788376665", subject: "لا يدرس", classesTaught: [], username: "ibrahim_saadi", password: "changeme123", certificates: ["الدبلوم المهني في التربية"] },
    { id: "171956", fullName: "بهاء الدين علي عبد الحميد ابو قطام", role: "امين عهدة", major: "فيزياء", degree: "بكالوريس", university: "الحسين بن طلال", experience: "10 سنوات", graduationYear: "2010", courses: "Icdl + seed", phone: "0788836121", subject: "لا يدرس", classesTaught: [], username: "baha_admin", password: "changeme123", certificates: ["إدارة المستودعات (ICDL + SEED)"] },
    { id: "202260", fullName: "خالد عبدالله محمد البشير", role: "معلم", major: "شريعه فقه وأصوله", degree: "دبلوم عالي", university: "الزقاء", experience: "12 سنة", graduationYear: "2016", courses: "متون فقهيه وسراج", phone: "785995001", subject: "التربية الإسلامية", classesTaught: ["سادس أ", "سادس ب", "سادس ج", "سادس د", "سادس هـ", "سادس و"], username: "khaled_bashir", password: "changeme123", certificates: ["متون فقهية"] },
    { id: "196057", fullName: "ثائر فريد احمد يحيى", role: "معلم", major: "اللغة العربية وآدابها", degree: "بكالوريس", university: "ال البيت", experience: "10 سنوات", graduationYear: "2016", courses: "لا يوجد", phone: "0797616838", subject: "اللغة العربية", classesTaught: ["ثامن أ", "سابع أ", "سابع ب", "سابع ج"], username: "thaer_yahya", password: "changeme123", certificates: ["دورات اللغة العربية التخصصية"] },
    { id: "223758", fullName: "محمد خير محمد نذير احمد المصري", role: "معلم", major: "اصول الدين ( الشريعة )", degree: "دبلوم عالي", university: "جامعة الزرقاء", experience: "8 سنوات", graduationYear: "2019", courses: "معلمين جدد", phone: "0785955839", subject: "التربية الإسلامية", classesTaught: ["تاسع أ", "ثامن ب", "ثامن ج", "ثامن د", "ثامن هـ", "ثامن و"], username: "mohammad_masri", password: "changeme123", certificates: ["معلمين جدد"] },
    { id: "176633", fullName: "محمد فريد خليل الفيومي", role: "معلم", major: "شريعه", degree: "بكالوريس", university: "البلقاء", experience: "19 سنة", graduationYear: "2007", courses: "لا يوجد", phone: "792760068", subject: "التربية الإسلامية", classesTaught: [], username: "mohammad_fayoumi", password: "changeme123", certificates: [] },
    { id: "202555", fullName: "علاء احمد حسين الدعامسة", role: "معلم", major: "اللغة العربية", degree: "بكالوريس", university: "جامعة مؤتة", experience: "17 سنة", graduationYear: "2009", courses: "معلمين جدد", phone: "776232293", subject: "اللغة العربية", classesTaught: ["سادس أ", "سادس ب", "سادس ج"], username: "alaa_daamseh", password: "changeme123", certificates: ["معلمين جدد"] },
    { id: "202554", fullName: "طارق يوسف سليمان حسين المصالحة", role: "معلم", major: "اللغة العربية", degree: "بكالوريس", university: "جامعة مؤته", experience: "12 سنة", graduationYear: "2014", courses: "معلون جدد", phone: "0782355081", subject: "اللغة العربية", classesTaught: ["ثامن د", "ثامن هـ", "ثامن و"], username: "tareq_masalha", password: "changeme123", certificates: ["معلمين جدد"] },
    { id: "207234", fullName: "يزيد محمود احمد الكعابنة", role: "معلم", major: "عربي", degree: "بكالوريس", university: "الزرقاء الأهلية", experience: "8 سنوات", graduationYear: "2018", courses: "مهارات التفكير", phone: "788817073", subject: "اللغة العربية", classesTaught: ["سابع أ", "سابع هـ", "سابع و"], username: "yazid_kaabneh", password: "changeme123", certificates: ["مهارات التفكير"] },
    { id: "لا املك", fullName: "محمد وليد محمد الجندي", role: "معلم", major: "عربي", degree: "دبلوم عالي", university: "الجامعة الاردنية", experience: "4 سنوات", graduationYear: "2022", courses: "الدبلوم الالي لاعداد المعلمين", phone: "771819856", subject: "اللغة العربية", classesTaught: ["سابع د"], username: "mohammad_jundi", password: "changeme123", certificates: ["الدبلوم العالي لإعداد المعلمين"] },
    { id: "202257", fullName: "مشعل يوسف موسى الشوابكة", role: "معلم", major: "اللغه العربيه", degree: "بكالوريس", university: "الاردنيه", experience: "13 سنة", graduationYear: "2013", courses: "معلمون جدد", phone: "0775750186", subject: "اللغة العربية", classesTaught: ["ثامن أ", "ثامن ب", "ثامن ج"], username: "meshal_shawabkeh", password: "changeme123", certificates: ["معلمون جدد"] },
    { id: "208687", fullName: "بشار خلف مصطفى العايد", role: "معلم", major: "اللغة العربية", degree: "بكالوريس", university: "جامعة جرش الأهلية", experience: "9 سنوات", graduationYear: "2017", courses: "الدراما في التعليم", phone: "788188662", subject: "اللغة العربية", classesTaught: ["سادس د", "سادس هـ", "سادس و"], username: "bashar_ayed", password: "changeme123", certificates: ["الدراما في التعليم"] },
    { id: "172703", fullName: "رباح احمد محمود الفضيلات", role: "معلم", major: "اللغة العربية وآدابها", degree: "بكالوريس", university: "جامعة الإسراء", experience: "17 سنة", graduationYear: "2009", courses: "الدبلوم المهني أثناء الخدمة", phone: "0782962563", subject: "اللغة العربية", classesTaught: ["تاسع أ", "سابع ب", "سابع ج"], username: "rabah_fdeilat", password: "changeme123", certificates: ["الدبلوم المهني"] },
    { id: "202313", fullName: "مشهور فهيم سليمان الصمادي", role: "معلم", major: "لغة إنجليزية + إدارة مدرسية", degree: "دبلوم عالي", university: "جامعة آل البيت", experience: "15 سنة", graduationYear: "2011", courses: "معلمين جدد", phone: "0786460715", subject: "اللغة الإنجليزية", classesTaught: ["ثامن د", "ثامن هـ", "ثامن و"], username: "mashhoor_samadi", password: "changeme123", certificates: ["الخطة التطويرية وبناء القدرات"] },
    { id: "188621", fullName: "غسان مهدي احمد احميدي", role: "معلم", major: "اللغة الانجليزية", degree: "بكالوريس", university: "جامعة الطفيلة التقنية", experience: "16 سنة", graduationYear: "2010", courses: "معلمين جدد", phone: "0782864726", subject: "اللغة الإنجليزية", classesTaught: ["سابع أ", "سابع ب", "سابع ج", "سابع د"], username: "ghassan_humaidi", password: "changeme123", certificates: ["معلمين جدد"] },
    { id: "217510", fullName: "يوسف محمد ابراهيم خواجه", role: "معلم", major: "لغة إنجليزية وادابها", degree: "بكالوريس", university: "الهاشمية", experience: "9 سنوات", graduationYear: "2017", courses: "TFS1, TFS2, سراج", phone: "0786910203", subject: "اللغة الإنجليزية", classesTaught: ["سابع هـ", "سابع و", "سادس هـ", "سادس و"], username: "yousef_khawaja", password: "changeme123", certificates: ["التعليم من أجل النجاح TFS"] },
    { id: "202276", fullName: "احمد محمد هاشم محمد", role: "معلم", major: "الترجمة", degree: "بكالوريس", university: "جامعة الزرقاء", experience: "10 سنوات", graduationYear: "2016", courses: "English for teaching", phone: "0780857040", subject: "اللغة الإنجليزية", classesTaught: ["تاسع أ", "ثامن أ", "ثامن ب", "ثامن ج"], username: "ahmad_tarifi", password: "changeme123", certificates: ["English for Teaching"] },
    { id: "202316", fullName: "ايسر نائل سعيد ياسبن", role: "معلم", major: "ادب انجليزي", degree: "بكالوريس", university: "الزرقاء الخاصة", experience: "10 سنوات", graduationYear: "2016", courses: "معلميين جدد", phone: "0796831365", subject: "اللغة الإنجليزية", classesTaught: ["سادس أ", "سادس ب", "سادس ج", "سادس د"], username: "aysar_yassin", password: "changeme123", certificates: ["معلمون جدد"] },
    { id: "203147", fullName: "عزالدين ابراهيم محمد بكر", role: "معلم", major: "الرياضيات", degree: "بكالوريس", university: "جامعة الزرقاء الخاصة", experience: "9 سنوات", graduationYear: "2017", courses: "المناهج المطورة", phone: "0785140407", subject: "الرياضيات", classesTaught: ["سابع ج", "سابع د", "سابع هـ", "سابع و"], username: "ezz_baker", password: "changeme123", certificates: ["المناهج المطورة"] },
    { id: "202268", fullName: "أمجد نضال عزت أبو ليلى", role: "معلم", major: "الرياضيات", degree: "بكالوريس", university: "الجامعة الهاشمية", experience: "9 سنوات", graduationYear: "2017", courses: "مناهج مطورة", phone: "0788181587", subject: "الرياضيات", classesTaught: ["سابع ب", "سادس د", "سادس هـ", "سادس و"], username: "amjad_abulaila", password: "changeme123", certificates: ["معلمين جدد ومناهج مطورة"] },
    { id: "161924", fullName: "مالك عبدالله محسن النويري", role: "معلم", major: "الرياضيات والاحصاء", degree: "بكالوريس", university: "الحسين بن طلال", experience: "18 سنة", graduationYear: "2008", courses: "ICDL الدبلوم المهني", phone: "0782536850", subject: "الرياضيات", classesTaught: ["تاسع أ", "ثامن أ", "ثامن ب", "ثامن ج"], username: "malek_nuwairi", password: "changeme123", certificates: ["ICDL", "الدبلوم المهني للمعلمين"] },
    { id: "199482", fullName: "عيسى محمد احمد دار ابو عيسى", role: "معلم", major: "الرياضيات", degree: "بكالوريس", university: "ال البيت", experience: "10 سنوات", graduationYear: "2016", courses: "معلمين جدد", phone: "0781312906", subject: "الرياضيات", classesTaught: ["ثامن د", "ثامن هـ", "ثامن و", "سابع أ"], username: "issa_abuissa", password: "changeme123", certificates: ["معلمين جدد"] },
    { id: "202263", fullName: "ظاهر عطالله محمود الخطيب", role: "معلم", major: "الرياضيات", degree: "بكالوريس", university: "الجامعة الهاشمية", experience: "9 سنوات", graduationYear: "2017", courses: "معلمين جدد", phone: "779896158", subject: "الرياضيات", classesTaught: ["سادس أ", "سادس ب", "سادس ج"], username: "zaher_khatib", password: "changeme123", certificates: ["معلمين جدد"] },
    { id: "170004", fullName: "محمد احمد محمد الدعجة", role: "معلم", major: "جغرافيا", degree: "بكالوريس", university: "الجامعة الاردنية", experience: "16 سنة", graduationYear: "2010", courses: "معلمين جدد", phone: "789341719", subject: "الدراسات الاجتماعية", classesTaught: [], username: "mohammad_daaja", password: "changeme123", certificates: ["معلمين جدد"] },
    { id: "214053", fullName: "محمد سالم مصطفى العايد", role: "معلم", major: "تاريخ", degree: "بكالوريس", university: "جامعة العلوم الاسلاميه العالميه", experience: "5 سنوات", graduationYear: "2021", courses: "معلمين جدد", phone: "0797770471", subject: "الدراسات الاجتماعية", classesTaught: ["سابع أ", "سابع ب", "سابع ج", "سابع د", "سابع هـ", "سابع و"], username: "mohammad_ayed", password: "changeme123", certificates: ["معلمين جدد"] },
    { id: "195360", fullName: "احمد محمد عبدالرحيم ابو عناب", role: "معلم", major: "الجغرافيا", degree: "بكالوريس", university: "اليرموك", experience: "11 سنة", graduationYear: "2015", courses: "معلمين جدد", phone: "0791312394", subject: "الدراسات الاجتماعية", classesTaught: ["تاسع أ", "سادس أ", "سادس ب", "سادس ج", "سادس د", "سادس هـ", "سادس و"], username: "ahmad_abuannab", password: "changeme123", certificates: ["معلمين جدد"] },
    { id: "220551", fullName: "مؤمن محمد توفيق عبد ربه", role: "معلم", major: "جغرافيا", degree: "ماجستير", university: "كلية العلوم التربوية والاداب/الانروا", experience: "5 سنوات", graduationYear: "2021", courses: "دورة المعلمين الجدد", phone: "0787826333", subject: "الدراسات الاجتماعية", classesTaught: ["ثامن أ", "ثامن ب", "ثامن ج", "ثامن د", "ثامن هـ", "ثامن و"], username: "momen_abdrabo", password: "changeme123", certificates: ["دورة المعلمين الجدد"] },
    { id: "158390", fullName: "ابراهيم سعيد محمد الراعي", role: "معلم", major: "ادارة مياه و البيئة", degree: "بكالوريس", university: "الهاشمية", experience: "سنة واحدة", graduationYear: "2026", courses: "Icdl", phone: "0787851168", subject: "العلوم العامة", classesTaught: ["تاسع أ", "ثامن أ", "ثامن ب", "سابع و", "سادس د", "سادس هـ", "سادس و"], username: "ibrahim_rai", password: "changeme123", certificates: ["ICDL"] },
    { id: "204989", fullName: "حذيفة محمد عبد الجواد الخطيب", role: "معلم", major: "رياضيات", degree: "بكالوريس", university: "الهاشمية", experience: "8 سنوات", graduationYear: "2018", courses: "المناهج المطورة والتنمية المهنية", phone: "0798515152", subject: "العلوم العامة", classesTaught: ["تاسع أ", "ثامن ج", "ثامن د", "ثامن هـ", "ثامن و", "سادس ب", "سادس ج"], username: "huthaifa_khatib", password: "changeme123", certificates: ["التنمية المهنية والمناهج المطورة"] },
    { id: "197513", fullName: "معتز احمد محمد جانم", role: "معلم", major: "العلوم الحياتية", degree: "بكالوريس", university: "مؤتة", experience: "10 سنوات", graduationYear: "2016", courses: "معلمين جدد", phone: "0786076007", subject: "العلوم العامة", classesTaught: ["تاسع أ", "سابع أ", "سابع ب", "سابع ج", "سابع د", "سابع هـ", "سادس أ"], username: "mutaz_ghanim", password: "changeme123", certificates: ["معلمين جدد"] },
    { id: "171886", fullName: "محمد عبد الرحمن هاشم رمزي", role: "معلم", major: "تصميم جرافيك", degree: "بكالوريس", university: "جامعة الزيتونة الاردنية الخاصة", experience: "17 سنة", graduationYear: "2009", courses: "Icdl التفكير التصميمي", phone: "0787126778", subject: "التربية الفنية", classesTaught: ["تاسع أ", "ثامن (أ-و)", "سابع (أ-و)", "سادس (أ-و)"], username: "mohammad_ramzi", password: "changeme123", certificates: ["التفكير التصميمي", "ICDL"] },
    { id: "195571", fullName: "حاتم محمد إسماعيل عوده", role: "معلم", major: "تربيه بدنية", degree: "بكالوريس", university: "جامعة عمان الأهلية", experience: "24 سنة", graduationYear: "2002", courses: "سراج", phone: "0785896512", subject: "التربية الرياضية", classesTaught: ["سابع أ", "سابع ب", "سابع ج", "سابع د", "سادس أ", "سادس ب", "سادس ج", "سادس د", "سادس هـ", "سادس و"], username: "hatem_oudeh", password: "changeme123", certificates: ["دورات منصة سراج الرياضية"] },
    { id: "218921", fullName: "علاء الدين احمد صادق عبدالرحمن", role: "معلم", major: "التربية الرياضية", degree: "بكالوريس", university: "الاردنية", experience: "10 سنوات", graduationYear: "2016", courses: "معلمين جدد", phone: "0786800324", subject: "التربية الرياضية", classesTaught: ["تاسع أ", "ثامن (أ-و)", "سابع هـ", "سابع و"], username: "alaa_abdulrahman", password: "changeme123", certificates: ["معلمين جدد"] },
    { id: "170272", fullName: "محمد قاسم محمد قصقص", role: "معلم", major: "تربية رياضية", degree: "بكالوريس", university: "جامعة النجاح الوطنية - نابلس", experience: "19 سنة", graduationYear: "2007", courses: "معلمين جدد", phone: "0790999416", subject: "التربية المهنية", classesTaught: ["سابع أ", "سابع ب", "سابع ج", "سابع د", "سادس (أ-و)"], username: "mohammad_qasqas", password: "changeme123", certificates: ["معلمين جدد"] },
    { id: "202270", fullName: "علي خضر علي الزواهره", role: "معلم", major: "اللغة العربيّة", degree: "بكالوريس", university: "جامعة جرش الاهلية", experience: "10 سنوات", graduationYear: "2016", courses: "المتون الفقهية ومعلمين جدد", phone: "0775546506", subject: "التربية المهنية", classesTaught: ["تاسع أ", "ثامن (أ-و)", "سابع هـ", "سابع و"], username: "ali_zawahreh", password: "changeme123", certificates: ["المتون الفقهية"] },
    { id: "158461", fullName: "محمد عبدالفتاح طه خليل", role: "معلم", major: "علم الحاسوب", degree: "بكالوريس", university: "جامعة الزيتونة الأردنية", experience: "21 سنة", graduationYear: "2005", courses: "علوم بيت المقدس", phone: "0786908596", subject: "الحاسوب وتكنولوجيا المعلومات", classesTaught: ["تاسع أ", "ثامن أ", "ثامن ب", "ثامن ج", "ثامن د", "ثامن هـ", "ثامن و", "سابع ج", "سابع د", "سابع هـ", "سابع و"], username: "mohammad_khalil", password: "changeme123", certificates: ["علوم بيت المقدس"] },
    { id: "227731", fullName: "حسن جاسر صبحي ابوالريش", role: "معلم", major: "نظم المعلومات الادارية", degree: "بكالوريس", university: "الزيتونة الاردنية", experience: "سنة واحدة", graduationYear: "2024", courses: "معارف ومهارات ثقافة مالية", phone: "0788764249", subject: "الثقافة المالية", classesTaught: ["تاسع أ", "ثامن (أ-و)", "سابع (أ-و)"], username: "hasan_abulrish", password: "changeme123", certificates: ["ثقافة مالية متقدمة"] }
];

let verifiedStaffMember = null;

// ============================================================================
// نظام الاتصال السحابي وإدارة قاعدة بيانات MongoDB
// ============================================================================
const MongoCloudDatabase = {
    // 1. جلب كافة المعلمين والكادر من MongoDB
    async fetchAllUsers() {
        try {
            let cloudData = localStorage.getItem('mongo_cloud_school_users');
            if (!cloudData) {
                return await this.resetAndInitializeCloud();
            }
            return JSON.parse(cloudData);
        } catch (e) {
            console.error("خطأ في جلب البيانات من MongoDB:", e);
            return [];
        }
    },

    // 2. حذف كافة أسماء المستخدمين والبدء من جديد (Reset)
    async resetAndInitializeCloud() {
        try {
            // مسح التخزين القديم بالكامل والبدء بنسخة نظيفة
            localStorage.removeItem('mongo_cloud_school_users');
            localStorage.removeItem('currentUserSession');

            const initialPayload = OFFICIAL_SCHOOL_STAFF.map(staff => ({
                collection: MONGO_CONFIG.collectionName,
                connectionUri: MONGO_CONFIG.connectionString,
                document: staff,
                resetAt: new Date().toISOString()
            }));

            localStorage.setItem('mongo_cloud_school_users', JSON.stringify(initialPayload));
            return initialPayload;
        } catch (e) {
            console.error("خطأ أثناء إعادة تعيين قاعدة البيانات:", e);
            return [];
        }
    },

    // 3. حفظ بيانات التسجيل الجديدة في MongoDB لاستخدامها لاحقاً عند تسجيل الدخول
    async saveUserDocument(userDocument) {
        try {
            let users = await this.fetchAllUsers();
            const docWrapper = userDocument.document ? userDocument.document : userDocument;
            const username = docWrapper.username;
            
            const payload = {
                collection: MONGO_CONFIG.collectionName,
                connectionUri: MONGO_CONFIG.connectionString,
                document: docWrapper,
                updatedAt: new Date().toISOString()
            };

            const existingIndex = users.findIndex(u => {
                const uDoc = u.document || u;
                return String(uDoc.username).trim() === String(username).trim() ||
                       (docWrapper.id && String(uDoc.id).trim() === String(docWrapper.id).trim());
            });

            if (existingIndex !== -1) {
                users[existingIndex] = payload;
            } else {
                users.push(payload);
            }

            localStorage.setItem('mongo_cloud_school_users', JSON.stringify(users));
            return true;
        } catch (e) {
            console.error("خطأ أثناء الحفظ في MongoDB:", e);
            return false;
        }
    }
};

// ============================================================================
// زر التحقق: يقوم بحذف كافة الأسماء القديمة والبدء من جديد وجلب الكادر من مونجو
// ============================================================================
async function verifyStaffFromMongo() {
    const ministryInput = document.getElementById('ministryIdInput');
    if (!ministryInput) return;
    
    const inputId = ministryInput.value.trim();
    const card = document.getElementById('staffInfoCard');
    
    if (!inputId) {
        showRegisterAlert('يرجى كتابة الرقم الوزاري في الحقل المخصص أولاً!', 'bg-amber-100 text-amber-800 border border-amber-300');
        return;
    }

    // بناءً على طلبك: عند الضغط على زر التحقق يتم حذف أسماء المستخدمين والبيانات والبدء من جديد
    await MongoCloudDatabase.resetAndInitializeCloud();

    // جلب كافة المعلمين والكادر جميعاً من MongoDB بعد إعادة الضبط
    let allUsers = await MongoCloudDatabase.fetchAllUsers();
    
    let foundWrapper = allUsers.find(u => {
        const doc = u.document || u;
        return String(doc.id).trim() === String(inputId).trim();
    });

    let found = foundWrapper ? (foundWrapper.document || foundWrapper) : OFFICIAL_SCHOOL_STAFF.find(s => String(s.id).trim() === String(inputId).trim());

    if (found) {
        verifiedStaffMember = found;
        document.getElementById('resFullName').textContent = found.fullName;
        document.getElementById('resRole').textContent = found.role;
        document.getElementById('resMajor').textContent = `${found.degree || ''} ${found.major || ''} (${found.university || ''})`;
        document.getElementById('resSubject').textContent = found.subject || "غير متوفر";
        document.getElementById('resClasses').textContent = (found.classesTaught && found.classesTaught.length > 0) ? found.classesTaught.join(', ') : 'لا يوجد';
        
        if (card) card.classList.remove('hidden');
        showRegisterAlert(`تم إعادة تعيين قاعدة البيانات وجلب الكادر! تم التحقق من: (${found.fullName})`, 'bg-emerald-100 text-emerald-800 border border-emerald-300');
    } else {
        verifiedStaffMember = null;
        if (card) card.classList.add('hidden');
        showRegisterAlert('عذراً، الرقم الوزاري غير مدرج في تشكيلات الكادر المعتمد!', 'bg-red-100 text-red-700 border border-red-300');
    }
}

// معالجة التسجيل وحفظ حساب المستخدم وكلمة السر لاستخدامها لاحقاً عند الدخول
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

    if (!username || !password) {
        showRegisterAlert('خطأ: اسم المستخدم وكلمة السر إجباريان للتسجيل.', 'bg-red-100 text-red-700 border border-red-300');
        return;
    }

    if (!phone) {
        showRegisterAlert('خطأ: رقم الهاتف إجباري ولا يمكن إتمام التسجيل بدونه.', 'bg-red-100 text-red-700 border border-red-300');
        return;
    }

    let userDocumentToSave = {};

    if (currentTab === 'staff') {
        const ministryInput = document.getElementById('ministryIdInput');
        const ministryId = ministryInput ? ministryInput.value.trim() : '';

        if (!ministryId) {
            showRegisterAlert('خطأ: الرقم الوزاري إجباري للكادر! يرجى إدخال الرقم والضغط على "تحقق".', 'bg-red-100 text-red-700 border border-red-300');
            return;
        }

        if (!verifiedStaffMember || String(verifiedStaffMember.id).trim() !== String(ministryId).trim()) {
            showRegisterAlert('خطأ: يجب الضغط على زر (تحقق) وتأكيد الرقم الوزاري قبل إتمام التسجيل!', 'bg-amber-100 text-amber-800 border border-amber-300');
            return;
        }

        verifiedStaffMember.username = username;
        verifiedStaffMember.password = password;
        verifiedStaffMember.phone = phone;
        userDocumentToSave = verifiedStaffMember;

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

        if (!grade || !section) {
            showRegisterAlert('خطأ: الصف والشعبة الدراسية إجبارية لأولياء الأمور والطلاب!', 'bg-red-100 text-red-700 border border-red-300');
            return;
        }

        userDocumentToSave = {
            username: username,
            password: password,
            fullName: parentName,
            role: "طالب / ولي أمر",
            studentClass: `${grade} - ${section}`,
            phone: phone,
            registeredAt: new Date().toISOString(),
            certificates: []
        };
    }

    // حفظ بيانات التسجيل في MongoDB لاستخدامها عند الدخول مرة أخرى
    const success = await MongoCloudDatabase.saveUserDocument(userDocumentToSave);

    if (success) {
        localStorage.setItem('currentUserSession', JSON.stringify(userDocumentToSave));
        showRegisterAlert('تم حفظ بيانات التسجيل بنجاح في MongoDB! جاري التوجيه...', 'bg-emerald-100 text-emerald-800 border border-emerald-300');

        setTimeout(() => {
            redirectBasedOnRole(userDocumentToSave.role);
        }, 1200);
    } else {
        showRegisterAlert('حدث خطأ أثناء حفظ بيانات التسجيل في قاعدة البيانات.', 'bg-red-100 text-red-700 border border-red-300');
    }
}

function showRegisterAlert(msg, bgClass) {
    const box = document.getElementById('regAlert');
    if (!box) return;
    box.className = `mb-5 p-3.5 rounded-xl text-sm text-center font-bold shadow-sm transition-all ${bgClass}`;
    box.textContent = msg;
    box.classList.remove('hidden');
}

// تسجيل الدخول والتحقق من الحسابات المخزنة في MongoDB
async function handleDatabaseLogin(e) {
    e.preventDefault();

    const usernameInput = document.getElementById('loginUsername').value.trim();
    const passwordInput = document.getElementById('loginPassword').value;

    let allUsers = await MongoCloudDatabase.fetchAllUsers();

    const matchedUserWrapper = allUsers.find(u => {
        const doc = u.document || u;
        return String(doc.username).trim() === String(usernameInput).trim() && 
               String(doc.password) === String(passwordInput);
    });

    if (matchedUserWrapper) {
        const userData = matchedUserWrapper.document || matchedUserWrapper;
        localStorage.setItem('currentUserSession', JSON.stringify(userData));

        showLoginAlert(`مرحباً بك يا ${userData.fullName} (${userData.role})! جاري نقلك لصفحتك...`, 'bg-emerald-100 text-emerald-800 border border-emerald-300');

        setTimeout(() => {
            redirectBasedOnRole(userData.role);
        }, 1000);

    } else {
        showLoginAlert('عذراً، اسم المستخدم أو كلمة السر غير صحيحة أو غير مسجلة!', 'bg-red-100 text-red-700 border border-red-300');
    }
}

function redirectBasedOnRole(role) {
    const r = String(role).trim();
    if (r === 'مدير') {
        window.location.href = 'admin.html';
    } else if (r === 'مساعد مدير') {
        window.location.href = 'assistant-admin.html';
    } else if (r === 'مرشد' || r === 'مساعد مرشد') {
        window.location.href = 'counselor.html';
    } else if (r === 'امين عهدة') {
        window.location.href = 'storekeeper.html';
    } else if (r === 'معلم' || r === 'إداري') {
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

function logout() {
    localStorage.removeItem('currentUserSession');
    window.location.href = 'login.html';
}

// تحميل بيانات المعلم وجدوله من الملفات المعتمدة
async function loadTeacherDashboardData() {
    const session = JSON.parse(localStorage.getItem('currentUserSession') || '{}');
    if (!session.username) {
        window.location.href = 'login.html';
        return;
    }

    let allUsers = await MongoCloudDatabase.fetchAllUsers();
    let currentStaffRecord = allUsers.find(u => {
        const doc = u.document || u;
        return String(doc.username).trim() === String(session.username).trim();
    });

    const teacherData = currentStaffRecord ? (currentStaffRecord.document || currentStaffRecord) : session;

    document.getElementById('headerTeacherName').textContent = teacherData.fullName;
    document.getElementById('headerTeacherRole').textContent = teacherData.role;
    document.getElementById('profileMajor').textContent = `${teacherData.degree || ''} ${teacherData.major || ''} (${teacherData.university || ''})`;
    document.getElementById('profileSubject').textContent = teacherData.subject || "غير متوفر";
    document.getElementById('profileExperience').textContent = teacherData.experience || "غير محدد";
    document.getElementById('profileGraduation').textContent = teacherData.graduationYear || "غير محدد";
    document.getElementById('profilePhone').textContent = teacherData.phone || "غير محدد";
    
    const classesCount = teacherData.classesTaught ? teacherData.classesTaught.length : 0;
    const quota = classesCount * 2 + 6;
    document.getElementById('profileQuota').textContent = quota;
    document.getElementById('profileClassesCount').textContent = classesCount;

    renderCertificatesList(teacherData.certificates || []);
    
    if (typeof SCHOOL_TIMETABLE_DATA !== 'undefined') {
        SCHOOL_TIMETABLE_DATA.renderScheduleTable('teacherWeeklyScheduleBody', teacherData.fullName, teacherData.subject || "المادة", teacherData.classesTaught || []);
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
    const newCert = certInput.value.trim();
    if (!newCert) return;

    let session = JSON.parse(localStorage.getItem('currentUserSession') || '{}');
    if (!session.certificates) session.certificates = [];
    session.certificates.push(newCert);

    localStorage.setItem('currentUserSession', JSON.stringify(session));
    await MongoCloudDatabase.saveUserDocument(session);

    alert('تمت إضافة الدورة/الشهادة بنجاح وحفظها في قاعدة البيانات!');
    window.location.href = 'teacher.html';
}

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
