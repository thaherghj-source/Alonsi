/**
 * ============================================================================
 * النظام المدرسي المتكامل - ملف الخادم الرئيسي (server.js)
 * متوافق مع Node.js, Express, و MongoDB Atlas
 * ============================================================================
 */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TeacherSchedule = require('./models/TeacherSchedule'); // استدعاء نموذج جدول الحصص

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // إذا كانت ملفات Frontend (HTML, CSS, JS) في مجلد public

// 🔗 رابط الاتصال بقاعدة بيانات MongoDB الخاص بك
// تذكير: استبدل <db_password> بكلمة المرور الحقيقية، وحدد اسم قاعدة البيانات (مثال: schoolDB) قبل علامة الاستفهام
const MONGO_URI = "mongodb+srv://thaherghj_db_user:A123456789@cluster0.3nmwwal.mongodb.net/schoolDB?retryWrites=true&w=majority";

// الاتصال بقاعدة البيانات
mongoose.connect(MONGO_URI)
  .then(() => {
      console.log("تم الاتصال بنجاح بقاعدة بيانات MongoDB Atlas 🚀");
  })
  .catch((err) => {
      console.error("فشل الاتصال بقاعدة البيانات ❌:", err.message);
  });

// ==========================================
// مسارات الـ API (Endpoints)
// ==========================================

// 1. مسار لجلب كافة جداول المعلمين والإداريين
app.get('/api/schedules', async (req, res) => {
    try {
        const schedules = await TeacherSchedule.find({});
        res.status(200).json(schedules);
    } catch (err) {
        console.error("خطأ أثناء جلب الجداول:", err);
        res.status(500).json({ error: 'حدث خطأ في الخادم أثناء جلب البيانات' });
    }
});

// 2. مسار لإضافة أو تحديث جدول معلم معين (مفيد لو لوحة التحكم تتطلب حفظ التعديلات)
app.post('/api/schedules', async (req, res) => {
    try {
        const { teacherName, schedule } = req.body;
        
        // البحث عن المعلم وتحديث جدوله، أو إنشاؤه إذا لم يكن موجوداً (Upsert)
        const updatedSchedule = await TeacherSchedule.findOneAndUpdate(
            { teacherName: teacherName },
            { schedule: schedule },
            { new: true, upsert: true }
        );

        res.status(200).json({ 
            message: 'تم حفظ الجدول بنجاح ✅', 
            data: updatedSchedule 
        });
    } catch (err) {
        console.error("خطأ أثناء حفظ الجدول:", err);
        res.status(500).json({ error: 'حدث خطأ أثناء حفظ البيانات' });
    }
});

// تشغيل الخادم
app.listen(PORT, () => {
    console.log(`الخادم يعمل حالياً على المنفذ: http://localhost:${PORT} 🌐`);
});
