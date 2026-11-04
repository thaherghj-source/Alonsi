const { MongoClient } = require('mongodb');

// رابط الاتصال المعتمد بقاعدة بيانات MongoDB Atlas
const uri = "mongodb+srv://thaherghj_db_user:YOUR_PASSWORD@cluster0.3nmwwal.mongodb.net/?retryWrites=true&w=majority";
const dbName = "school_system_db";
const collectionName = "school_users";

// قاعدة البيانات الكاملة للكادر المدرسي المعتمد (الملكات والتشكيلات والجدول)
const officialStaffData = [
    { ministryId: "146193", fullName: "طايل منير عايد نصراوين", role: "مدير المدرسة", major: "اللغة العربية وآدابها (ماجستير)", subject: "لا يدرس", classesTaught: [], username: "tayel_admin", password: "changeme123" },
    { ministryId: "119829", fullName: "محمد عوض عبد القادر الخواجا", role: "مساعد مدير", major: "لغة عربية (دبلوم عالي)", subject: "لا يدرس", classesTaught: [], username: "mohammad_asst", password: "changeme123" },
    { ministryId: "197374", fullName: "امين اسامه امين حماد", role: "مرشد تربوي", major: "علم نفس (بكالوريوس)", subject: "لا يدرس", classesTaught: [], username: "amin_hammad", password: "changeme123" },
    { ministryId: "207276", fullName: "ابراهيم سعدات خليل السعدي", role: "مساعد مرشد", major: "معلم صف (بكالوريوس)", subject: "لا يدرس", classesTaught: [], username: "ibrahim_saadi", password: "changeme123" },
    { ministryId: "171956", fullName: "بهاء الدين علي عبد الحميد ابو قطام", role: "امين عهدة", major: "فيزياء (بكالوريوس)", subject: "لا يدرس", classesTaught: [], username: "baha_admin", password: "changeme123" },
    { ministryId: "170004", fullName: "محمد احمد محمد الدعجة", role: "إداري", major: "جغرافيا (بكالوريوس)", subject: "لا يدرس", classesTaught: [], username: "mohammad_daaja", password: "changeme123" },
    { ministryId: "202260", fullName: "خالد عبدالله محمد البشير", role: "معلم", major: "شريعة فقه وأصوله", subject: "التربية الإسلامية", classesTaught: ["سادس أ", "سادس ب", "سادس ج", "سادس د", "سادس هـ", "سادس و"], username: "khaled_bashir", password: "changeme123" },
    { ministryId: "196057", fullName: "ثائر فريد احمد يحيى", role: "معلم", major: "اللغة العربية وآدابها", subject: "التربية الإسلامية", classesTaught: ["ثامن أ", "سابع أ", "سابع ب", "سابع ج", "سابع د", "سابع هـ", "سابع و"], username: "thaer_yahya", password: "changeme123" },
    { ministryId: "223758", fullName: "محمد خير محمد نذير احمد المصري", role: "معلم", major: "أصول الدين (الشريعة)", subject: "التربية الإسلامية", classesTaught: ["تاسع أ", "ثامن ب", "ثامن ج", "ثامن د", "ثامن هـ", "ثامن و"], username: "mohammad_masri", password: "changeme123" },
    { ministryId: "202555", fullName: "علاء احمد حسين الدعامسة", role: "معلم", major: "اللغة العربية", subject: "اللغة العربية", classesTaught: ["سادس أ", "سادس ب", "سادس ج"], username: "alaa_daamseh", password: "changeme123" },
    { ministryId: "202554", fullName: "طارق يوسف سليمان حسين المصالحة", role: "معلم", major: "اللغة العربية", subject: "اللغة العربية", classesTaught: ["ثامن د", "ثامن هـ", "ثامن و"], username: "tareq_masalha", password: "changeme123" },
    { ministryId: "207234", fullName: "يزيد محمود احمد الكعابنة", role: "معلم", major: "اللغة العربية", subject: "اللغة العربية", classesTaught: ["سابع أ", "سابع هـ", "سابع و"], username: "yazid_kaabneh", password: "changeme123" },
    { ministryId: "200040301", fullName: "محمد وليد محمد الجندي", role: "معلم", major: "اللغة العربية", subject: "اللغة العربية", classesTaught: ["سابع د"], username: "mohammad_jundi", password: "changeme123" },
    { ministryId: "202257", fullName: "مشعل يوسف موسى الشوابكة", role: "معلم", major: "اللغة العربية", subject: "اللغة العربية", classesTaught: ["ثامن أ", "ثامن ب", "ثامن ج"], username: "meshal_shawabkeh", password: "changeme123" },
    { ministryId: "208687", fullName: "بشار خلف مصطفى العايد", role: "معلم", major: "اللغة العربية", subject: "اللغة العربية", classesTaught: ["سادس د", "سادس هـ", "سادس و"], username: "bashar_ayed", password: "changeme123" },
    { ministryId: "172703", fullName: "رباح احمد محمود الفضيلات", role: "معلم", major: "اللغة العربية وآدابها", subject: "اللغة العربية", classesTaught: ["تاسع أ", "سابع ب", "سابع ج"], username: "rabah_fdeilat", password: "changeme123" },
    { ministryId: "202313", fullName: "مشهور فهيم سليمان الصمادي", role: "معلم", major: "لغة إنجليزية + إدارة", subject: "اللغة الإنجليزية", classesTaught: ["ثامن د", "ثامن هـ", "ثامن و"], username: "mashhoor_samadi", password: "changeme123" },
    { ministryId: "188621", fullName: "غسان مهدي احمد احميدي", role: "معلم", major: "اللغة الانجليزية", subject: "اللغة الإنجليزية", classesTaught: ["سابع أ", "سابع ب", "سابع ج", "سابع د"], username: "ghassan_humaidi", password: "changeme123" },
    { ministryId: "217510", fullName: "يوسف محمد ابراهيم خواجه", role: "معلم", major: "لغة إنجليزية وآدابها", subject: "اللغة الإنجليزية", classesTaught: ["سابع هـ", "سابع و", "سادس هـ", "سادس و"], username: "yousef_khawaja", password: "changeme123" },
    { ministryId: "202316", fullName: "ايسر نائل سعيد ياسين", role: "معلم", major: "أدب إنجليزي", subject: "اللغة الإنجليزية", classesTaught: ["سادس أ", "سادس ب", "سادس ج", "سادس د"], username: "aysar_yassin", password: "changeme123" },
    { ministryId: "202276", fullName: "احمد محمد هاشم محمد (الطريفي)", role: "معلم", major: "الترجمة", subject: "اللغة الإنجليزية", classesTaught: ["تاسع أ", "ثامن أ", "ثامن ب", "ثامن ج"], username: "ahmad_tarifi", password: "changeme123" },
    { ministryId: "203147", fullName: "عزالدين ابراهيم محمد بكر", role: "معلم", major: "الرياضيات", subject: "الرياضيات", classesTaught: ["سابع ج", "سابع د", "سابع هـ", "سابع و"], username: "ezz_baker", password: "changeme123" },
    { ministryId: "202268", fullName: "أمجد نضال عزت أبو ليلى", role: "معلم", major: "الرياضيات", subject: "الرياضيات", classesTaught: ["سابع ب", "سادس د", "سادس هـ", "سادس و"], username: "amjad_abulaila", password: "changeme123" },
    { ministryId: "161924", fullName: "مالك عبدالله محسن النويري", role: "معلم", major: "الرياضيات والإحصاء", subject: "الرياضيات", classesTaught: ["تاسع أ", "ثامن أ", "ثامن ب", "ثامن ج"], username: "malek_nuwairi", password: "changeme123" },
    { ministryId: "199482", fullName: "عيسى محمد احمد دار ابو عيسى", role: "معلم", major: "الرياضيات", subject: "الرياضيات", classesTaught: ["ثامن د", "ثامن هـ", "ثامن و", "سابع أ"], username: "issa_abuissa", password: "changeme123" },
    { ministryId: "202263", fullName: "ظاهر عطالله محمود الخطيب", role: "معلم", major: "الرياضيات", subject: "الرياضيات", classesTaught: ["سادس أ", "سادس ب", "سادس ج"], username: "zaher_khatib", password: "changeme123" },
    { ministryId: "158390", fullName: "ابراهيم سعيد محمد الراعي", role: "معلم", major: "إدارة المياه والبيئة", subject: "العلوم العامة", classesTaught: ["تاسع أ", "ثامن أ", "ثامن ب", "سابع و", "سادس د", "سادس هـ", "سادس و"], username: "ibrahim_rai", password: "changeme123" },
    { ministryId: "204989", fullName: "حذيفة محمد عبد الجواد الخطيب", role: "معلم", major: "الرياضيات", subject: "العلوم العامة", classesTaught: ["تاسع أ", "ثامن ج", "ثامن د", "ثامن هـ", "ثامن و", "سادس ب", "سادس ج"], username: "huthaifa_khatib", password: "changeme123" },
    { ministryId: "197513", fullName: "معتز احمد محمد جانم", role: "معلم", major: "العلوم الحياتية", subject: "العلوم العامة", classesTaught: ["تاسع أ", "سابع أ", "سابع ب", "سابع ج", "سابع د", "سابع هـ", "سادس أ"], username: "mutaz_ghanim", password: "changeme123" },
    { ministryId: "214053", fullName: "محمد سالم مصطفى العايد", role: "معلم", major: "التاريخ", subject: "الدراسات الاجتماعية", classesTaught: ["سابع أ", "سابع ب", "سابع ج", "سابع د", "سابع هـ", "سابع و"], username: "mohammad_ayed", password: "changeme123" },
    { ministryId: "195360", fullName: "احمد محمد عبدالرحيم ابو عناب", role: "معلم", major: "الجغرافيا", subject: "الدراسات الاجتماعية", classesTaught: ["تاسع أ", "سادس أ", "سادس ب", "سادس ج", "سادس د", "سادس هـ", "سادس و"], username: "ahmad_abuannab", password: "changeme123" },
    { ministryId: "220551", fullName: "مؤمن محمد توفيق عبد ربه", role: "معلم", major: "الجغرافيا (ماجستير)", subject: "الدراسات الاجتماعية", classesTaught: ["ثامن أ", "ثامن ب", "ثامن ج", "ثامن د", "ثامن هـ", "ثامن و"], username: "momen_abdrabo", password: "changeme123" },
    { ministryId: "158461", fullName: "محمد عبدالفتاح طه خليل", role: "معلم", major: "علم الحاسوب", subject: "الحاسوب", classesTaught: ["تاسع أ", "ثامن أ", "ثامن ب", "ثامن ج", "ثامن د", "ثامن هـ", "ثامن و", "سابع ج", "سابع د", "سابع هـ", "سابع و"], username: "mohammad_khalil", password: "changeme123" },
    { ministryId: "171886", fullName: "محمد عبد الرحمن هاشم رمزي", role: "معلم", major: "تصميم جرافيك", subject: "التربية الفنية", classesTaught: ["تاسع أ", "ثامن (أ-و)", "سابع (أ-و)", "سادس (أ-و)"], username: "mohammad_ramzi", password: "changeme123" },
    { ministryId: "195571", fullName: "حاتم محمد إسماعيل عوده", role: "معلم", major: "تربية بدنية", subject: "التربية الرياضية", classesTaught: ["سابع أ", "سابع ب", "سابع ج", "سابع د", "سادس أ", "سادس ب", "سادس ج", "سادس د", "سادس هـ", "سادس و"], username: "hatem_oudeh", password: "changeme123" },
    { ministryId: "218921", fullName: "علاء الدين احمد صادق عبدالرحمن", role: "معلم", major: "التربية الرياضية", subject: "التربية الرياضية", classesTaught: ["تاسع أ", "ثامن (أ-و)", "سابع هـ", "سابع و"], username: "alaa_abdulrahman", password: "changeme123" },
    { ministryId: "170272", fullName: "محمد قاسم محمد قصقص", role: "معلم", major: "تربية بدنية", subject: "التربية المهنية", classesTaught: ["سابع أ", "سابع ب", "سابع ج", "سابع د", "سادس (أ-و)"], username: "mohammad_qasqas", password: "changeme123" },
    { ministryId: "202270", fullName: "علي خضر علي الزواهره", role: "معلم", major: "اللغة العربيّة", subject: "التربية المهنية", classesTaught: ["تاسع أ", "ثامن (أ-و)", "سابع هـ", "سابع و"], username: "ali_zawahreh", password: "changeme123" },
    { ministryId: "227731", fullName: "حسن جاسر صبحي ابوالريش", role: "معلم", major: "نظم المعلومات الإدارية", subject: "الثقافة المالية", classesTaught: ["تاسع أ", "ثامن (أ-و)", "سابع (أ-و)"], username: "hasan_abulrish", password: "changeme123" }
];

async function uploadDataToMongo() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log("تم الاتصال بنجاح بـ MongoDB Atlas!");

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // إضافة حقل تاريخ الإنشاء لكل سجل
        const documentsToInsert = officialStaffData.map(item => ({
            ...item,
            createdAt: new Date()
        }));

        // إدراج البيانات دفعة واحدة
        const result = await collection.insertMany(documentsToInsert);
        console.log(`تم بنجاح رفع وتخزين ${result.insertedCount} مستنداً في قاعدة البيانات!`);

    } catch (error) {
        console.error("حدث خطأ أثناء رفع البيانات:", error);
    } finally {
        await client.close();
    }
}

uploadDataToMongo();
