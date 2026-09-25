/**
 * ANESTHESIA & ICU MASTER WORKSTATION — CLINICAL DATA REPOSITORY
 * Structured Clinical Protocols, Pre-Op Assessment, Capnography Waveforms & Ventilator Modes
 */

const ClinicalData = {
  // 1. EMERGENCY CRISES PROTOCOLS (ACLS & Perioperative Disasters)
  crises: [
    {
      id: "cardiac_arrest_vf_pvt",
      title: "توقف القلب: الرجفان البطيني وتسارع البطين عديم النبض (VF / pVT)",
      type: "emergency",
      category: "ACLS",
      steps: [
        { num: 1, text: "صدمة فورية مزيلة للرجفان Defibrillation (Biphasic 200J أو Monophasic 360J)." },
        { num: 2, text: "استئناف الإنعاش القلبي الرئوي CPR عالي الجودة فوراً لمدة دقيقتين (100-120 ضغطة/دقيقة بعمق 5 سم)." },
        { num: 3, text: "إعطاء الأدرينالين Epinephrine 1 mg وريدياً بعد الصدمة الثانية، ويتكرر كل 3-5 دقائق." },
        { num: 4, text: "إعطاء أميودارون Amiodarone 300 mg وريدياً بعد الصدمة الثالثة (ثم جرعة ثانية 150 mg إذا استمر الرجفان)." },
        { num: 5, text: "البحث عن الأسباب القابلة للعكس وتصحيحها فوراً: 4H و 4T (نقص الأكسجة، نقص/فرط البوتاسيوم، حموضة، نقص حجم الدم، استرواح صدري موتر، اندحاس قلبي، سموم، انصمام رئوي)." }
      ]
    },
    {
      id: "anaphylaxis",
      title: "الصدمة التأقية الحادة في صالة العمليات (Anaphylaxis)",
      type: "emergency",
      category: "Critical Allergy",
      steps: [
        { num: 1, text: "إيقاف العامل المحفز فوراً (المضادات الحيوية، المرخيات العضلية، مشتقات الدم، مادة الكولوديون)." },
        { num: 2, text: "إيقاف الغازات الاستنشاقية فوراً وإعطاء أكسجين 100% FiO2 وطلب مساعدة فورية." },
        { num: 3, text: "الخط الأول المطلق: أدرينالين Epinephrine وريدي بجرعة titrated: 50-100 mcg IV bolus للبالغين في صالة العمليات (أو 0.5 mg IM في العضلة الفخذية الوحشية)." },
        { num: 4, text: "تحميل سوائل بلورية دافئة Crystalloids بسرعة فائقة: 1000 - 2000 ml IV بولس لمعالجة توسع الأوعية وتسريب البلازما." },
        { num: 5, text: "الخط الثاني (بعد استقرار الدوران): هيدروكورتيزون Hydrocortisone 200 mg IV ومضاد هستامين (Diphenhydramine 50 mg IV)." }
      ]
    },
    {
      id: "laryngospasm",
      title: "تشنج الحنجرة الحاد (Acute Laryngospasm)",
      type: "emergency",
      category: "Airway Emergency",
      steps: [
        { num: 1, text: "إيقاف أي تحفيز جراحي أو شفط في البلعوم فوراً، وإعطاء أكسجين 100%." },
        { num: 2, text: "تطبيق ضغط إيجابي مستمر CPAP بالقناع والبالون مع إحكام القفل الشديد على الوجه." },
        { num: 3, text: "تطبيق ضغط مؤلم في نقطة لارسون (Larson's Notch) خلف زاوية الفك مع مناورة دفع الفك Jaw Thrust للأمام بقوة." },
        { num: 4, text: "إذا استمر التشنج وهبط التشبع SpO2: إعطاء بروبوفول Propofol 0.5 mg/kg لكسر التشنج." },
        { num: 5, text: "إذا فشل البروبوفول أو حدث نقص أكسجة حرج: إعطاء سكسنيل كولين Succinylcholine 0.5 - 1.0 mg/kg IV مع أتروبين 0.5 mg." }
      ]
    },
    {
      id: "malignant_hyperthermia",
      title: "فرط الحرارة الخبيث (Malignant Hyperthermia Crisis)",
      type: "emergency",
      category: "Rare Anesthetic Crisis",
      steps: [
        { num: 1, text: "إيقاف جميع الغازات الاستنشاقية والسكسنيل كولين فوراً! إطفاء المبخرات وفصلها إن أمكن." },
        { num: 2, text: "فرط تهوية المريض بأكسجين نقي 100% بتدفق عالي جداً (> 10 L/min) لطرد غاز ثاني أكسيد الكربون المتراكم." },
        { num: 3, text: "إعطاء الدواء المنقذ للحياة: دانترولين Dantrolene بجرعة 2.5 mg/kg وريدياً سريعاً وتكرار الجرعة حتى استقرار المؤشرات (الحد الأقصى 10 mg/kg)." },
        { num: 4, text: "تبريد المريض الفعال: محاليل بلورية باردة وريدياً، كمادات ثلجية في الإبط والمغبنين، غسيل المعدة بمحلول بارد. إيقاف التبريد عند وصول الحرارة 38.5 مئوية لتجنب هبوط الحرارة." },
        { num: 5, text: "علاج فرط البوتاسيوم والحماض الاستقلابي: بيكربونات الصوديوم 1-2 mEq/kg، أنسولين نظامي 10 وحدات مع 50 ml جلوكوز 50%، وكلوريد الكالسيوم." }
      ]
    }
  ],

  // 2. PRE-OPERATIVE ASSESSMENT DATA
  preOpData: {
    airway: {
      mallampati: [
        { class: "Class I", view: "رؤية الحنك الرخو، اللهاة، البلعوم، والدعامات اللوزية بوضوح", risk: "تنبيب سهل متوقع" },
        { class: "Class II", view: "رؤية الحنك الرخو، اللهاة، وجزء من البلعوم", risk: "تنبيب سهل إلى متوسط" },
        { class: "Class III", view: "رؤية الحنك الرخو وقاعدة اللهاة فقط", risk: "تنبيب صعب متوقع (تجهيز منظار فيديو)" },
        { class: "Class IV", view: "رؤية الحنك الصلب فقط", risk: "تنبيب صعب جداً" }
      ]
    },

    asaStatus: [
      { code: "ASA I", title: "مريض سليم تماماً", desc: "لا يعاني من أي أمراض جهازية", strategy: "تخدير روتيني" },
      { code: "ASA II", title: "مريض يعاني من مرض جهازي خفيف", desc: "مرض مضبوط جيداً", strategy: "تخدير قياسي مع الحفاظ على الأدوية" },
      { code: "ASA III", title: "مريض يعاني من مرض جهازي شديد", desc: "مرض غير مضبوط", strategy: "تقييم قلبي رئوي معمق" },
      { code: "ASA IV", title: "مرض جهازي يشكل تهديداً مستمراً للحياة", desc: "احتشاء عضلة قلبية حديث", strategy: "تخدير حذر جداً" },
      { code: "ASA V", title: "مريض يحتضر", desc: "لا يُتوقع بقاؤه على قيد الحياة", strategy: "تخدير إنقاذي" }
    ],

    npoGuidelines: [
      { hours: "2 ساعة", items: "السوائل الصافية (ماء، شاي، قهوة سوداء)" },
      { hours: "4 ساعات", items: "حليب الأم" },
      { hours: "6 ساعات", items: "حليب الأطفال، حليب الأبقار" },
      { hours: "8 ساعات", items: "الوجبات الدسمة واللحوم المقلية" }
    ]
  },

  // 3. CAPNOGRAPHY WAVEFORMS
  capnography: [
    {
      id: "normal",
      nameAr: "الموجة الطبيعية",
      nameEn: "Normal Waveform",
      category: "Normal",
      etco2: "35 - 45 mmHg",
      description: "المظهر المستطيل القياسي ذو الأطوار الأربعة المتناسقة",
      causes: ["تهوية سنخية طبيعية وتروية رئوية متوازنة"],
      actions: ["الاستمرار في إعدادات التهوية الحالية"]
    },
    {
      id: "bronchospasm",
      nameAr: "تشنج القصبات (Shark-Fin)",
      nameEn: "Bronchospasm",
      category: "Airway Obstruction",
      etco2: "متفاوت",
      description: "انحناء تدريجي بطيء يعطي شكل زعنفة القرش",
      causes: ["تشنج قصبي حاد", "أزمة ربو نشطة"],
      actions: [
        "رفع تركيز غاز سيفوفلوران",
        "إعطاء سالبوتامول",
        "فحص مسار دارة التخدير"
      ]
    },
    {
      id: "esophageal_intubation",
      nameAr: "التنبيب الخاطئ في المريء",
      nameEn: "Esophageal Intubation",
      category: "Airway Emergency",
      etco2: "تلاشي سريع",
      description: "ظهور موجة صغيرة جداً ثم تلاشي سريع",
      causes: ["وضع الأنبوب في المريء"],
      actions: [
        "سحب الأنبوب فوراً",
        "التهوية بالقناع",
        "إعادة التنبيب باستخدام منظار الفيديو"
      ]
    }
  ],

  // 4. VENTILATOR MODES
  ventilatorModes: [
    {
      id: "vcv",
      nameAr: "نمط التحكم بالحجم",
      nameEn: "Volume Control (VCV)",
      type: "Mandatory Control",
      characteristics: "يضمن إيصال حجم جاري ثابت ومحدد",
      settings: [
        { param: "Tidal Volume (Vt)", standard: "6 - 8 ml/kg من الوزن المثالي" },
        { param: "Respiratory Rate (RR)", standard: "10 - 16 تنفس/دقيقة" },
        { param: "PEEP", standard: "5 - 8 cmH2O" },
        { param: "FiO2", standard: "0.40 - 0.60 (40-60%)" }
      ]
    }
  ]
};

window.ClinicalData = ClinicalData;
