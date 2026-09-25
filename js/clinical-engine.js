/**
 * ANESTHESIA & ICU MASTER WORKSTATION — CLINICAL ENGINE
 * Pure Mathematical & Clinical Decision Support Calculations
 */

const ClinicalEngine = {
  // 1. IDEAL & ADJUSTED BODY WEIGHT
  calcWeights(weight, heightCm, gender = 'male') {
    const w = parseFloat(weight) || 70;
    const h = parseFloat(heightCm) || 170;
    const heightInches = h / 2.54;
    const over5Ft = Math.max(0, heightInches - 60);

    let ibw = gender === 'male' ? 50 + 2.3 * over5Ft : 45.5 + 2.3 * over5Ft;
    ibw = Math.round(ibw * 10) / 10;

    const bmi = Math.round((w / Math.pow(h / 100, 2)) * 10) / 10;
    const abw = Math.round((ibw + 0.4 * (w - ibw)) * 10) / 10;
    const bsa = Math.round(0.007184 * Math.pow(w, 0.425) * Math.pow(h, 0.725) * 100) / 100;

    return { tbw: w, ibw, abw, bmi, bsa };
  },

  // 2. INDUCTION DRUG CALCULATIONS
  calcInductionDrugs(weight, heightCm, gender = 'male', ageYears = 40) {
    const w = parseFloat(weight) || 70;
    const weights = this.calcWeights(w, heightCm, gender);
    const useAbw = weights.bmi > 30 ? weights.abw : w;

    return {
      thiopental: Math.round(useAbw * 3.5),
      propofol: Math.round(useAbw * 2.5),
      etomidate: Math.round(useAbw * 0.2 * 1000) / 1000,
      ketamine: Math.round(useAbw * 1.5),
      fentanyl: Math.round(useAbw * 2.0)
    };
  },

  // 3. MAINTENANCE INFUSION CALCULATIONS
  calcMaintenanceInfusions(weight, heightCm, gender = 'male') {
    const w = parseFloat(weight) || 70;
    const weights = this.calcWeights(w, heightCm, gender);
    const useAbw = weights.bmi > 30 ? weights.abw : w;

    return {
      propofol_2mg_ml: Math.round((useAbw * 6 * 2) / 100),
      remifentanil_0_5mcg_kg_min: Math.round((useAbw * 0.5) / 2),
      dexmedetomidine_0_5mcg_kg_hr: Math.round((useAbw * 0.5) / 40)
    };
  },

  // 4. VASOPRESSOR CALCULATIONS
  calcVasopressors(weight, heightCm, gender = 'male') {
    const w = parseFloat(weight) || 70;
    const weights = this.calcWeights(w, heightCm, gender);
    const useWeight = weights.bmi > 30 ? weights.abw : w;

    const epiDose = useWeight * 0.1;
    const epiMl = (epiDose * 1000) / 80;

    const dopaDose = useWeight * 5;
    const dopaMl = (dopaDose * 1000) / 4000;

    const dobutDose = useWeight * 5;
    const dobutMl = (dobutDose * 1000) / 5000;

    return {
      epinephrine: {
        dose: epiDose,
        concentration: '80 mcg/ml (4mg in 50ml)',
        rate: Math.round(epiMl * 10) / 10
      },
      dopamine: {
        dose: dopaDose,
        concentration: '4000 mcg/ml (200mg in 50ml)',
        rate: Math.round(dopaMl * 10) / 10
      },
      dobutamine: {
        dose: dobutDose,
        concentration: '5000 mcg/ml (250mg in 50ml)',
        rate: Math.round(dobutMl * 10) / 10
      }
    };
  },

  // 5. VENTILATOR SETTINGS
  calcVentilatorSettings(weight, heightCm, gender = 'male') {
    const w = parseFloat(weight) || 70;
    const h = parseFloat(heightCm) || 170;
    const weights = this.calcWeights(w, h, gender);

    const tidVolume = Math.round(weights.ibw * 6.5);
    const rr = Math.round(weights.ibw * 0.1 + 8);
    const minVent = tidVolume * rr;
    const peep = 5;
    const pplat = Math.round((tidVolume * 20) / 1000 + peep);

    return {
      tidalVolume: tidVolume,
      respiratoryRate: rr,
      minuteVentilation: minVent,
      peep: peep,
      plateauPressure: pplat,
      inspiration: "I:E = 1:2"
    };
  },

  // 6. ANESTHETIC INDUCTION STRATEGY
  generateInductionPlan(weight, heightCm, gender = 'male', ageYears = 40, comorbidities = []) {
    const w = parseFloat(weight) || 70;
    const weights = this.calcWeights(w, heightCm, gender);
    const induction = this.calcInductionDrugs(w, heightCm, gender, ageYears);

    const isObese = weights.bmi > 30;
    const isElderly = ageYears > 65;
    const hasCVD = comorbidities.includes('cvd');
    const hasHypertension = comorbidities.includes('hypertension');

    let inductionStrategy = [];
    let specialPrecautions = [];
    let redAlerts = [];

    // Airway Assessment
    const airway = {
      mallampatiExpected: "Class II",
      cuffedETT: `${Math.round((weights.ibw * 0.1 + 1) * 10) / 10}`
    };

    // Maintenance Strategy
    let maintenanceStrategy = [];
    if (hasHypertension || hasCVD) {
      maintenanceStrategy.push({
        agent: 'Remifentanil',
        dose: `0.15 - 0.25 mcg/kg/min`,
        note: 'جرعة منخفضة لتجنب نقص الضغط'
      });
      specialPrecautions.push('مراقبة مستمرة للضغط والقلب');
    } else {
      maintenanceStrategy.push({
        agent: 'Sevoflurane',
        dose: `0.8 - 1.5 MAC`,
        note: 'تخدير استنشاقي معياري'
      });
    }

    // Select Hypnotic
    let chosenHypnotic = 'Propofol';
    let chosenHypnoticDose = induction.propofol;

    if (isElderly) {
      chosenHypnoticDose = Math.round(induction.propofol * 0.7);
      specialPrecautions.push('تقليل جرعة البروبوفول بسبب العمر المتقدم');
    }

    if (hasCVD) {
      chosenHypnotic = 'Etomidate';
      chosenHypnoticDose = induction.etomidate;
      specialPrecautions.push('استخدام الإتوميديت لتجنب الاكتئاب الدوري');
      redAlerts.push('⚠️ مراقبة الضغط والنبض عن كثب');
    }

    // Select Neuromuscular Blocker
    let chosenRelaxant = 'Atracurium';
    let chosenRelaxantDose = Math.round(w * 0.5);

    if (isObese) {
      chosenRelaxant = 'Succinylcholine';
      chosenRelaxantDose = Math.round(weights.abw * 1.0);
      specialPrecautions.push('مريض سمين: استخدام الوزن المعدل');
    }

    inductionStrategy.push({
      drug: chosenHypnotic,
      dose: chosenHypnoticDose,
      note: 'الحث التنويمي الأساسي'
    });

    inductionStrategy.push({
      drug: chosenRelaxant,
      dose: chosenRelaxantDose,
      note: 'الإرخاء العضلي للتنبيب'
    });

    inductionStrategy.push({
      drug: 'Fentanyl',
      dose: Math.round(w * 2.0),
      note: 'التسكين الأولي'
    });

    return {
      patientSummary: { weight: w, ibw: weights.ibw, bmi: weights.bmi, ettSize: airway.cuffedETT },
      redAlerts,
      inductionStrategy,
      maintenanceStrategy,
      airway,
      specialPrecautions
    };
  }
};

window.ClinicalEngine = ClinicalEngine;
