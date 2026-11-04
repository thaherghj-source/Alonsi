/**
 * ============================================================================
 * النظام المدرسي المتكامل - ملف إدارة جداول الحصص والبرنامج الأسبوعي (schedule.js)
 * مستخرج من البرنامج المعتمد النهائي وتوزيع المباحث لعام 2027
 * ============================================================================
 */

const SCHOOL_TIMETABLE_DATA = {
    days: ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"],
    periodsCount: 7,

    // مصفوفة البرامج والحصص الخاصة بكل معلم حسب توزيعه المدرسي المعتمد
    teacherSchedules: {
        "خالد عبدالله محمد البشير": [
            { day: "الأحد", c1: "التربية الإسلامية", c2: "نشاط ديني", c3: "التربية الإسلامية", c4: "حصة حرة", c5: "التربية الإسلامية", c6: "استراحة", c7: "التربية الإسلامية" },
            { day: "الإثنين", c1: "حصة حرة", c2: "التربية الإسلامية", c3: "نشاط رياضي", c4: "التربية الإسلامية", c5: "التربية الإسلامية", c6: "التربية الإسلامية", c7: "إشراف" },
            { day: "الثلاثاء", c1: "التربية الإسلامية", c2: "التربية الإسلامية", c3: "التربية الإسلامية", c4: "حصة حرة", c5: "التربية الإسلامية", c6: "التربية الإسلامية", c7: "التربية الإسلامية" },
            { day: "الأربعاء", c1: "التربية الإسلامية", c2: "التربية الإسلامية", c3: "نشاط ثقافي", c4: "التربية الإسلامية", c5: "استراحة", c6: "التربية الإسلامية", c7: "التربية الإسلامية" },
            { day: "الخميس", c1: "التربية الإسلامية", c2: "مراجعة عامة", c3: "التربية الإسلامية", c4: "التربية الإسلامية", c5: "التربية الإسلامية", c6: "إشراف", c7: "التربية الإسلامية" }
        ],
        "مالك عبدالله محسن النويري": [
            { day: "الأحد", c1: "الرياضيات", c2: "حصة حرة", c3: "الرياضيات", c4: "نشاط رياضي", c5: "الرياضيات", c6: "استراحة", c7: "الرياضيات" },
            { day: "الإثنين", c1: "الرياضيات", c2: "الرياضيات", c3: "الرياضيات", c4: "الرياضيات", c5: "الرياضيات", c6: "الرياضيات", c7: "إشراف" },
            { day: "الثلاثاء", c1: "الرياضيات", c2: "الرياضيات", c3: "الرياضيات", c4: "حصة حرة", c5: "الرياضيات", c6: "الرياضيات", c7: "الرياضيات" },
            { day: "الأربعاء", c1: "الرياضيات", c2: "الرياضيات", c3: "نشاط علمي", c4: "الرياضيات", c5: "استراحة", c6: "الرياضيات", c7: "الرياضيات" },
            { day: "الخميس", c1: "الرياضيات", c2: "الرياضيات", c3: "الرياضيات", c4: "الرياضيات", c5: "الرياضيات", c6: "إشراف", c7: "الرياضيات" }
        ]
    },

    // دالة استرجاع جدول الحصص للمعلم بناءً على اسمه أو مبحثه
    getScheduleForTeacher: function(teacherName, subjectName, classesTaught) {
        if (this.teacherSchedules[teacherName]) {
            return this.teacherSchedules[teacherName];
        }

        // جدول افتراضي مبني على المبحث والصفوف المسندة في حال عدم وجود جدول مخصص بالاسم
        const primaryClass = (classesTaught && classesTaught.length > 0) ? classesTaught[0] : "الصف الأساسي";
        
        return [
            { day: "الأحد", c1: subjectName, c2: "حصة حرة / إشراف", c3: primaryClass, c4: "نشاط مدرسي", c5: subjectName, c6: "استراحة", c7: subjectName },
            { day: "الإثنين", c1: "حصة حرة", c2: subjectName, c3: "نشاط رياضي", c4: subjectName, c5: primaryClass, c6: subjectName, c7: "إشراف" },
            { day: "الثلاثاء", c1: subjectName, c2: primaryClass, c3: subjectName, c4: "حصة حرة", c5: subjectName, c6: primaryClass, c7: subjectName },
            { day: "الأربعاء", c1: primaryClass, c2: subjectName, c3: "نشاط ثقافي", c4: subjectName, c5: "استراحة", c6: subjectName, c7: primaryClass },
            { day: "الخميس", c1: subjectName, c2: "مراجعة عامة", c3: subjectName, c4: primaryClass, c5: subjectName, c6: "إشراف", c7: subjectName }
        ];
    },

    // دالة عرض وتعبئة الجدول في واجهة المعلم HTML
    renderScheduleTable: function(containerId, teacherName, subjectName, classesTaught) {
        const tbody = document.getElementById(containerId);
        if (!tbody) return;

        const scheduleRows = this.getScheduleForTeacher(teacherName, subjectName, classesTaught);

        tbody.innerHTML = scheduleRows.map(d => `
            <tr class="hover:bg-slate-50 transition">
                <td class="p-3.5 font-bold bg-indigo-50/50 text-indigo-950 border">${d.day}</td>
                <td class="p-3.5 border text-center"><span class="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-lg font-bold text-xs">${d.c1}</span></td>
                <td class="p-3.5 border text-center"><span class="text-slate-600 text-xs">${d.c2}</span></td>
                <td class="p-3.5 border text-center"><span class="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-lg font-bold text-xs">${d.c3}</span></td>
                <td class="p-3.5 border text-center"><span class="text-slate-600 text-xs">${d.c4}</span></td>
                <td class="p-3.5 border text-center"><span class="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-lg font-bold text-xs">${d.c5}</span></td>
                <td class="p-3.5 border text-center"><span class="text-slate-600 text-xs">${d.c6}</span></td>
                <td class="p-3.5 border text-center"><span class="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-lg font-bold text-xs">${d.c7}</span></td>
            </tr>
        `).join('');
    }
};
