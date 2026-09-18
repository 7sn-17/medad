class MedadTranslationEngine {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
    }

    async translateTextsBatch(textList) {
        const prompt = `أنت مترجم محترف لألعاب الفيديو. قم بترجمة قائمة النصوص الإنجليزية التالية إلى اللغة العربية الفصحى بدقة عالية، مع الحفاظ على المتغيرات البرمجية وأكواد الألوان كما هي. أعد النتائج على شكل مصفوفة JSON نصية فقط: ${JSON.stringify(textList)}`;

        const response = await fetch(`${this.endpoint}?key=${this.apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error?.message || "خطأ في الاتصال بخادم Gemini");
        return JSON.parse(data.candidates[0].content.parts[0].text.replace(/```json/g, '').replace(/```/g, '').trim());
    }
}
window.MedadTranslationEngine = MedadTranslationEngine;
