const mongoose = require('mongoose');

// تعريف هيكل الجدول (Schema)
const scheduleSchema = new mongoose.Schema({
    teacherName: { type: String, required: true, unique: true },
    schedule: [
        {
            day: String,
            c1: String,
            c2: String,
            c3: String,
            c4: String,
            c5: String,
            c6: String,
            c7: String
        }
    ]
});

// تصدير النموذج ليتم استخدامه في باقي الملفات
module.exports = mongoose.model('TeacherSchedule', scheduleSchema);
