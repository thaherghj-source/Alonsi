// مسار لجلب جدول معلم محدد بناءً على اسمه
app.get('/api/schedule/:teacherName', async (req, res) => {
    try {
        const teacherName = decodeURIComponent(req.params.teacherName);
        const teacherRecord = await TeacherSchedule.findOne({ teacherName: teacherName });
        
        if (!teacherRecord) {
            return res.status(404).json({ error: 'المعلم غير موجود في قاعدة البيانات' });
        }

        res.status(200).json(teacherRecord);
    } catch (err) {
        console.error("خطأ في جلب جدول المعلم:", err);
        res.status(500).json({ error: 'خطأ في الخادم الداخلي' });
    }
});

// مسار التحقق من تسجيل الدخول (Login API مبسط)
app.post('/api/login', async (req, res) => {
    try {
        const { teacherName, password } = req.body;
        
        // يمكنك مطابقة كلمة المرور مع المخزنة في قاعدة البيانات أو النظام
        // كمثال افتراضي: إذا وجدنا اسم المعلم نعتبر الدخول صحيحاً (يمكنك ربطه بجدول كلمات المرور)
        const teacher = await TeacherSchedule.findOne({ teacherName: teacherName });
        
        if (teacher) {
            res.status(200).json({ message: 'تم تسجيل الدخول بنجاح', teacherName: teacher.teacherName });
        } else {
            res.status(401).json({ error: 'اسم المعلم غير متطابق مع السجلات' });
        }
    } catch (err) {
        res.status(500).json({ error: 'خطأ في عملية التحقق' });
    }
});
