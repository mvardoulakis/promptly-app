/* ============================================================
   PROMPTLY — GenAI Clarity Assessment Logic & Scoring Engine
   ============================================================ */

'use strict';

/* ── Utilities ─────────────────────────────────────────────── */

function capitalize(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

/* ── Industries ────────────────────────────────────────────── */

const INDUSTRIES = [
  'Legal Services',
  'Financial Services',
  'Consulting & Advisory',
  'Marketing & Advertising',
  'Healthcare & Wellness',
  'Real Estate',
  'Retail & E-commerce',
  'Construction & Trades',
  'Education & Coaching',
  'Other'
];

/* ── Q1 Tool Options ────────────────────────────────────────── */

const TOOLS_OPTIONS = [
  'ChatGPT',
  'Claude (Anthropic)',
  'Microsoft Copilot',
  'Google Gemini',
  'Perplexity',
  'Midjourney or DALL-E',
  'GitHub Copilot',
  'Jasper, Copy.ai, or similar',
  'None yet',
  'Other'
];

/* ── Dimension Labels ───────────────────────────────────────── */

const DIMENSION_LABELS = {
  strategy:    ['Unclear',   'Forming',  'Developing', 'Defined',    'Strategic'],
  people:      ['Resistant', 'Cautious', 'Engaged',    'Capable',    'Empowered'],
  information: ['Scattered', 'Partial',  'Organised',  'Accessible', 'Embedded'],
  operations:  ['Stuck',     'Blocked',  'Moving',     'Flowing',    'Optimised']
};

function getDimensionLabel(dimension, score) {
  if (score <= 20) return DIMENSION_LABELS[dimension][0];
  if (score <= 40) return DIMENSION_LABELS[dimension][1];
  if (score <= 60) return DIMENSION_LABELS[dimension][2];
  if (score <= 80) return DIMENSION_LABELS[dimension][3];
  return DIMENSION_LABELS[dimension][4];
}

/* ── Stage Descriptions (badge description beneath stage name) */

const STAGE_DESCRIPTIONS = {
  Emerging:     "Most businesses are at this stage — and it makes complete sense. GenAI tools are moving fast and figuring out where they actually fit takes time. The businesses that get the most from them aren't the ones who moved first — they're the ones who got clear on where to focus before they did.",
  Momentum:     "You've made a real start — some things are working, some aren't, and GenAI probably feels more promising than practical right now. That gap between promise and traction is exactly what this stage is about closing.",
  Acceleration: "Your business has real GenAI clarity — you understand where the tools fit and you're starting to see what's possible. The question now is how to make that usage consistent, intentional, and genuinely embedded in how you work.",
  Mastery:      "This is a genuinely rare result. Your business has the strategic clarity, the information foundations, and the team readiness to use GenAI tools in ways most businesses can't yet. The opportunity isn't to start — it's to lead."
};

/* ── Phase B Teasers ────────────────────────────────────────── */

const PHASE_B_TEASERS = {
  Emerging:     "Your assessment has identified exactly where to focus before GenAI tools can deliver consistently for your business. The GenAI Strategy Report turns that diagnosis into a specific 90-day plan — the tools to start with, the workflows to build first, and the order to tackle them in so you're not wasting time or money moving in the wrong direction.",
  Momentum:     "You've made a real start — but your results show there are specific things creating friction that will limit how far your current efforts take you. The GenAI Strategy Report identifies exactly what those are and gives you a focused 90-day plan to close the gap between where you are and where GenAI starts delivering consistent value.",
  Acceleration: "Your business has real GenAI clarity — the question now is where to focus so that advantage compounds rather than plateaus. The GenAI Strategy Report takes your specific profile and builds a 90-day plan around the highest-leverage opportunities for a business at your stage.",
  Mastery:      "A Mastery result means your business is genuinely positioned to use GenAI in ways most businesses can't yet. The GenAI Strategy Report is built around that — not foundational advice you don't need, but a specific 90-day plan for directing your advantage deliberately so the gap between your business and the rest of your industry keeps widening."
};

/* ── Short Stage Diagnoses (Card 1 — YOUR DIAGNOSIS) ───────── */

const SHORT_DIAGNOSIS = {
  Emerging:     "Most businesses start here — and it's a perfectly valid place to be. The difference between here and the next stage isn't a big overhaul. It's a few focused changes that make GenAI tools actually useful day-to-day rather than occasional.",
  Momentum:     "Your business is moving and some things are already working. The next step is figuring out exactly where to focus so the effort you're already putting in starts compounding.",
  Acceleration: "You're past the starting line — your results show real GenAI clarity across most of what matters. The focus now is making sure your strongest areas are pulling the rest of the business forward.",
  Mastery:      "Your results put you in a small group of businesses that have genuinely built the conditions for GenAI to deliver. The question now is how deliberately you're directing that advantage."
};

/* ── Industry Insights (Card 2 — YOUR PROFILE) ─────────────── */

const INDUSTRY_INSIGHTS = {
  'Legal Services':          "In legal, the businesses pulling ahead aren't automating legal work — they're using GenAI to handle everything around it, so the people doing the actual work have more time to do it well.",
  'Financial Services':      "Financial services businesses are sitting on more usable data than almost any other industry — the gap between where you are and real GenAI value is almost always about structure and workflow, not ambition.",
  'Consulting & Advisory':   "For consulting businesses, GenAI's biggest immediate value isn't delivering work faster — it's capturing and reusing the thinking that currently lives only in senior people's heads.",
  'Marketing & Advertising': "Marketing businesses are often further ahead on GenAI tools than they realise — the challenge is usually that usage is individual and inconsistent rather than built into how the business delivers work.",
  'Healthcare & Wellness':   "In healthcare and wellness, the highest-value GenAI applications are rarely clinical — they're operational and administrative, freeing up the people with the expertise to use it where it matters most.",
  'Real Estate':             "Real estate businesses generate enormous amounts of information across every deal, client, and property — most of it never gets captured in a way that makes the next transaction easier or faster.",
  'Retail & E-commerce':     "For retail businesses, GenAI readiness comes down to one thing more than anything else: whether the data from day-to-day operations is clean, consistent, and actually being used.",
  'Construction & Trades':   "Construction and trades businesses are often dismissed as low-tech — but the operational and information challenges they face are exactly the kind GenAI tools are increasingly good at solving.",
  'Education & Coaching':    "Education and coaching businesses have something most industries don't — a naturally repeatable delivery model — and that repeatability is what makes GenAI unusually effective here when the foundations are right.",
  'Other':                   "Every business has its own version of the same underlying challenge — too much knowledge locked in people's heads, too many processes that depend on the right person being available, and not enough structured information to work with."
};

/* ── Blocker Acknowledgments (Card 3 — YOUR CONTEXT) ────────── */
/* Keyed by Q6 answer (1–5)                                      */

const BLOCKER_ACKNOWLEDGMENTS = {
  1: "Not knowing where to start with GenAI is the most common barrier — and it's entirely reasonable. The tools are genuinely confusing and most of the advice online is either too technical or too vague to be useful.",
  2: "Lack of time is the most honest answer most businesses give — and it's real. The businesses that make progress aren't the ones with more time, they're the ones who found a starting point small enough to fit into the time they have.",
  3: "Uncertainty about relevance is actually a sign of good judgment — most GenAI content is written for tech companies, not businesses like yours. The use cases that matter most for your industry are usually much simpler and more practical than the headlines suggest.",
  4: "Early GenAI experiments that don't deliver are almost always a targeting problem, not a technology problem. The tools work — but only when they're pointed at the right tasks with the right information to work from.",
  5: "You're in a strong position — no major blockers and active momentum. The opportunity now is making sure the effort you're putting in is directed at the highest-leverage opportunities rather than spreading too thin."
};

/* ── Benchmark Lines ────────────────────────────────────────── */

function getBenchmarkLine(stage, totalScore) {
  if (stage === 'Emerging') {
    return "Research consistently shows the majority of small and mid-sized businesses are at this stage — most are watching GenAI closely but haven't yet built the conditions to make it work reliably.";
  }
  if (stage === 'Momentum') {
    if (totalScore >= 48) {
      return "You're at the top of the Momentum stage — research suggests businesses at this point are closer to meaningful GenAI returns than they typically realise.";
    }
    return "Most research puts around 25–30% of SMBs at this stage — past the starting line but not yet seeing consistent returns from GenAI investment.";
  }
  if (stage === 'Acceleration') {
    return "Industry research suggests fewer than 20% of small and mid-sized businesses reach this stage — your business has built something most haven't.";
  }
  if (stage === 'Mastery') {
    return "Research consistently identifies fewer than 5% of businesses at this level of GenAI clarity — this is a genuinely rare result.";
  }
  return "Research consistently shows the majority of businesses are still in the early stages of GenAI clarity — your score puts your business ahead of where most are today.";
}

/* ── Storage Helpers ───────────────────────────────────────── */

function saveScoreData(data) {
  try {
    sessionStorage.setItem('promptly_scoreData', JSON.stringify(data));
  } catch(e) {
    console.warn('sessionStorage unavailable', e);
  }
}

function loadScoreData() {
  try {
    const raw = sessionStorage.getItem('promptly_scoreData');
    return raw ? JSON.parse(raw) : null;
  } catch(e) {
    return null;
  }
}

/* ── Q1 Scoring ─────────────────────────────────────────────── */

function scoreQ1(toolsUsed) {
  if (!toolsUsed || toolsUsed.length === 0) return 1;
  if (toolsUsed.length === 1 && toolsUsed[0] === 'None yet') return 1;
  // "Other" counts as 1 tool; filter out "None yet"
  const meaningfulTools = toolsUsed.filter(t => t !== 'None yet');
  if (meaningfulTools.length === 0) return 1;
  if (meaningfulTools.length <= 2)  return 2;
  if (meaningfulTools.length <= 4)  return 3;
  return 5;
}

/* ── Scoring Engine ─────────────────────────────────────────── */

// Q6 answer (1–5) → operations score value on 1–5 scale
const Q6_SCORE_MAP = [0, 1, 2, 2, 3, 5]; // index 1–5

function calculateScores(answers) {
  const q1score = answers.Q1score || scoreQ1(answers.toolsUsed);
  const q3      = answers.Q3 || 1;
  const q4      = answers.Q4 || 1;
  const q5      = answers.Q5 || 1;
  const q6raw   = answers.Q6 || 1;
  const q6score = Q6_SCORE_MAP[q6raw] || 1;
  const q7      = answers.Q7 || 1;

  // Convert 1–5 value to 0–100
  function to100(val) { return Math.round(((val - 1) / 4) * 100); }

  // Strategy: average of Q1score and Q3 → 0–100
  const strategyScore    = Math.round(((( q1score + q3) / 2) - 1) / 4 * 100);
  // People: average of Q4 and Q7 → 0–100
  const peopleScore      = Math.round((((q4 + q7) / 2) - 1) / 4 * 100);
  // Information: Q5 → 0–100
  const informationScore = to100(q5);
  // Operations: Q6 mapped score → 0–100
  const operationsScore  = to100(q6score);

  // Weighted total
  const rawTotal = Math.round(
    strategyScore    * 0.35 +
    peopleScore      * 0.25 +
    informationScore * 0.25 +
    operationsScore  * 0.15
  );

  // ── Pattern Rules ──────────────────────────────────────────
  // Rule 1: Strategy Floor — if Strategy < 25, cap score for stage assignment at 55
  let scoreForStage = rawTotal;
  if (strategyScore < 25) scoreForStage = Math.min(scoreForStage, 55);

  // Stage assignment
  let stage;
  if      (scoreForStage >= 79) stage = 'Mastery';
  else if (scoreForStage >= 56) stage = 'Acceleration';
  else if (scoreForStage >= 33) stage = 'Momentum';
  else                          stage = 'Emerging';

  // Rule 2: Information Cap — if Information < 40, drop one level
  if (informationScore < 40) {
    if      (stage === 'Mastery')       stage = 'Acceleration';
    else if (stage === 'Acceleration')  stage = 'Momentum';
    else if (stage === 'Momentum')      stage = 'Emerging';
    // Emerging stays Emerging
  }

  // Rule 3: Mastery Gate — requires Strategy ≥ 60 AND Information ≥ 60
  if (stage === 'Mastery' && (strategyScore < 60 || informationScore < 60)) {
    stage = 'Acceleration';
  }

  const dimensionScores = {
    strategy:    strategyScore,
    people:      peopleScore,
    information: informationScore,
    operations:  operationsScore
  };

  const dimEntries    = Object.entries(dimensionScores);
  const weakestEntry  = dimEntries.reduce((a, b) => a[1] < b[1] ? a : b);
  const strongestEntry = dimEntries.reduce((a, b) => a[1] > b[1] ? a : b);

  return {
    totalScore:         rawTotal,
    stage,
    dimensionScores,
    weakestDimension:   weakestEntry[0],
    weakestScore:       weakestEntry[1],
    strongestDimension: strongestEntry[0]
  };
}

/* ── Assessment Controller ─────────────────────────────────── */

(function initAssessment() {
  if (!document.getElementById('assessment-root')) return;

  const root         = document.getElementById('assessment-root');
  const progressFill = document.getElementById('progress-fill');
  const progressLbl  = document.getElementById('progress-label');

  const TOTAL_QUESTIONS = 8;

  let currentStep  = 0;  // 0–7 = Q1–Q8, 8 = email
  const answers    = { toolsUsed: [], Q1score: 1 };
  let industryOther = '';
  let toolsOther    = '';

  // Q3–Q7 definitions (radio questions, mapped by step index)
  const RADIO_QUESTIONS = {
    2: {
      id: 'Q3',
      text: 'How would you describe where your business is with GenAI tools right now?',
      options: [
        "We haven't started — it's on the radar but nothing has happened yet",
        "We've had a look — one or two of us have tried something but it hasn't gone anywhere",
        "We're experimenting — we use GenAI occasionally but it's not consistent",
        "We're building habits — GenAI is becoming part of how some of us work",
        "We're ahead of the curve — GenAI is genuinely embedded in how we operate"
      ]
    },
    3: {
      id: 'Q4',
      text: "When your business tries a new tool or a new way of working, what usually happens?",
      options: [
        "It rarely sticks — there's usually resistance and things go back to how they were",
        "It's hit and miss — some people get on board, others don't, and adoption is patchy",
        "It depends on the tool — if it's clearly useful, most people come around eventually",
        "We're generally open — new things tend to get adopted if someone champions them",
        "We embrace it — we're a team that likes finding better ways to work"
      ]
    },
    4: {
      id: 'Q5',
      text: "Think about the knowledge and information your business runs on — how accessible is it?",
      options: [
        "It mostly lives in people's heads — if a key person left, a lot would walk out with them",
        "Some things are written down but it's scattered — emails, notes, spreadsheets everywhere",
        "We have systems but they're inconsistent — some things are easy to find, others aren't",
        "Most of our important information is organised and reasonably easy to access",
        "Our information is well structured — we could brief a new tool or person quickly"
      ]
    },
    5: {
      id: 'Q6',
      text: "What's the biggest thing holding your business back from getting more value from GenAI tools?",
      options: [
        "We don't know where to start — it's overwhelming and unclear what's actually useful",
        "We don't have time — everyone is too busy to learn something new right now",
        "We're not sure it's relevant — we haven't seen a clear use case for our type of business",
        "We've tried but it hasn't delivered — early experiments haven't shown obvious value",
        "Nothing major — we're actively working on it and making progress"
      ]
    },
    6: {
      id: 'Q7',
      text: "Realistically — how much time could your business dedicate to embedding GenAI tools over the next 90 days?",
      options: [
        "Almost none — we're at capacity and can't take on anything new right now",
        "A little — maybe an hour or two a week if it's straightforward",
        "A reasonable amount — a few hours a week if we knew it was worth it",
        "Meaningful time — we have genuine capacity and motivation to make this happen",
        "As much as it takes — this is a real priority and we're ready to invest in it"
      ]
    }
  };

  function updateProgress() {
    const pct = Math.round((currentStep / TOTAL_QUESTIONS) * 100);
    if (progressFill) progressFill.style.width = pct + '%';
    if (progressLbl)  progressLbl.textContent  = pct + '% complete';
  }

  function renderStep(step) {
    updateProgress();
    if      (step === 0)            renderQ1();
    else if (step === 1)            renderQ2();
    else if (step >= 2 && step <= 6) renderRadio(step);
    else if (step === 7)            renderQ8();
    else                            renderEmail();
  }

  /* ── Q1: Multi-select tools ─────────────────────────────── */

  function renderQ1() {
    root.innerHTML = `
      <div class="question-wrap fade-in">
        <div class="container--narrow">
          <p class="question-counter">Question 1 of ${TOTAL_QUESTIONS}</p>
          <p class="question-text">Which of these GenAI tools has your business tried or used — even casually?</p>
          <p style="font-size:13px; color:var(--text-secondary); margin-bottom:16px; font-family:var(--font-body);">Select all that apply</p>
          <div class="answer-options" id="tools-grid">
            ${TOOLS_OPTIONS.map(tool => `
              <div class="answer-option${answers.toolsUsed.includes(tool) ? ' selected' : ''}"
                   data-tool="${tool}" tabindex="0">
                <span class="answer-option__radio"></span>
                <span class="answer-option__text">${tool}</span>
              </div>
            `).join('')}
          </div>
          <div id="other-tool-wrap" class="${answers.toolsUsed.includes('Other') ? '' : 'hidden'}" style="margin-top:8px;">
            <input class="input-field" type="text" id="tool-other-input"
                   placeholder="Which tool?" value="${toolsOther}" />
          </div>
          <div class="question-nav">
            <button class="btn btn--primary" id="btn-next" ${answers.toolsUsed.length === 0 ? 'disabled' : ''}>
              Next →
            </button>
          </div>
        </div>
      </div>
    `;

    root.querySelectorAll('.answer-option').forEach(el => {
      el.addEventListener('click', () => toggleTool(el.dataset.tool));
      el.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') toggleTool(el.dataset.tool);
      });
    });

    const otherInput = root.querySelector('#tool-other-input');
    if (otherInput) otherInput.addEventListener('input', e => { toolsOther = e.target.value; });

    root.querySelector('#btn-next').addEventListener('click', () => {
      if (answers.toolsUsed.length > 0) {
        answers.Q1score = scoreQ1(answers.toolsUsed);
        currentStep = 1;
        renderStep(1);
      }
    });
  }

  function toggleTool(tool) {
    if (tool === 'None yet') {
      answers.toolsUsed = answers.toolsUsed.includes('None yet') ? [] : ['None yet'];
    } else {
      answers.toolsUsed = answers.toolsUsed.filter(t => t !== 'None yet');
      const idx = answers.toolsUsed.indexOf(tool);
      if (idx > -1) answers.toolsUsed.splice(idx, 1);
      else          answers.toolsUsed.push(tool);
    }
    renderQ1();
  }

  /* ── Q2: Free text textarea ─────────────────────────────── */

  function renderQ2() {
    const currentVal = answers.Q2 || '';
    root.innerHTML = `
      <div class="question-wrap fade-in">
        <div class="container--narrow">
          <p class="question-counter">Question 2 of ${TOTAL_QUESTIONS}</p>
          <p class="question-text">In your own words — what's the one thing you'd most want a GenAI tool to help your business with?</p>
          <textarea class="input-field" id="genai-intent"
                    placeholder="e.g. writing proposals faster, answering customer questions, summarising meetings..."
                    rows="4"
                    style="resize:vertical; min-height:100px;">${currentVal}</textarea>
          <div class="question-nav">
            <button class="btn btn--ghost" id="btn-back">← Back</button>
            <button class="btn btn--primary" id="btn-next" ${currentVal.length >= 10 ? '' : 'disabled'}>
              Next →
            </button>
          </div>
        </div>
      </div>
    `;

    const textarea = root.querySelector('#genai-intent');
    const btnNext  = root.querySelector('#btn-next');
    textarea.addEventListener('input', e => {
      answers.Q2    = e.target.value;
      btnNext.disabled = e.target.value.length < 10;
    });

    btnNext.addEventListener('click', () => {
      if (answers.Q2 && answers.Q2.length >= 10) {
        currentStep = 2;
        renderStep(2);
      }
    });

    root.querySelector('#btn-back').addEventListener('click', () => {
      currentStep = 0;
      renderStep(0);
    });
  }

  /* ── Q3–Q7: Radio questions ─────────────────────────────── */

  function renderRadio(step) {
    const q             = RADIO_QUESTIONS[step];
    const qNum          = step + 1;   // step 2 → Q3, step 6 → Q7
    const currentAnswer = answers[q.id];

    root.innerHTML = `
      <div class="question-wrap fade-in">
        <div class="container--narrow">
          <p class="question-counter">Question ${qNum} of ${TOTAL_QUESTIONS}</p>
          <p class="question-text">${q.text}</p>
          <div class="answer-options" id="options-wrap">
            ${q.options.map((opt, i) => `
              <div class="answer-option${currentAnswer === i + 1 ? ' selected' : ''}"
                   data-value="${i + 1}"
                   role="radio"
                   aria-checked="${currentAnswer === i + 1}"
                   tabindex="0">
                <span class="answer-option__radio"></span>
                <span class="answer-option__text">${opt}</span>
              </div>
            `).join('')}
          </div>
          <div class="question-nav">
            <button class="btn btn--ghost" id="btn-back">← Back</button>
            <button class="btn btn--primary" id="btn-next" ${!currentAnswer ? 'disabled' : ''}>
              ${step === 6 ? 'Continue' : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    `;

    root.querySelectorAll('.answer-option').forEach(el => {
      el.addEventListener('click', () => {
        const val = parseInt(el.dataset.value);
        answers[q.id] = val;
        root.querySelectorAll('.answer-option').forEach(opt => {
          const sel = parseInt(opt.dataset.value) === val;
          opt.classList.toggle('selected', sel);
          opt.setAttribute('aria-checked', sel);
        });
        root.querySelector('#btn-next').disabled = false;
      });
      el.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') el.click();
      });
    });

    root.querySelector('#btn-next').addEventListener('click', () => {
      if (answers[q.id]) {
        currentStep = step + 1;
        renderStep(step + 1);
      }
    });

    root.querySelector('#btn-back').addEventListener('click', () => {
      currentStep = step - 1;
      renderStep(step - 1);
    });
  }

  /* ── Q8: Industry selector ──────────────────────────────── */

  function renderQ8() {
    const currentIndustry = answers.industry || null;
    root.innerHTML = `
      <div class="question-wrap fade-in">
        <div class="container--narrow">
          <p class="question-counter">Question 8 of ${TOTAL_QUESTIONS}</p>
          <p class="question-text">Last one — what industry are you in?</p>
          <div class="industry-grid" id="industry-grid">
            ${INDUSTRIES.map(ind => `
              <div class="industry-card${currentIndustry === ind ? ' selected' : ''}"
                   data-industry="${ind}"
                   role="radio"
                   aria-checked="${currentIndustry === ind}"
                   tabindex="0">
                ${ind}
              </div>
            `).join('')}
          </div>
          <div id="other-input-wrap" class="${currentIndustry === 'Other' ? '' : 'hidden'}" style="margin-top:12px;">
            <input class="input-field" type="text" id="industry-other"
                   placeholder="Tell us a bit about your business (optional)"
                   value="${industryOther}" />
          </div>
          <div class="question-nav">
            <button class="btn btn--ghost" id="btn-back">← Back</button>
            <button class="btn btn--primary" id="btn-next" ${!currentIndustry ? 'disabled' : ''}>Continue →</button>
          </div>
        </div>
      </div>
    `;

    root.querySelectorAll('.industry-card').forEach(el => {
      el.addEventListener('click', () => {
        answers.industry = el.dataset.industry;
        root.querySelectorAll('.industry-card').forEach(c => {
          c.classList.toggle('selected', c.dataset.industry === answers.industry);
          c.setAttribute('aria-checked', c.dataset.industry === answers.industry);
        });
        document.getElementById('other-input-wrap').classList.toggle('hidden', answers.industry !== 'Other');
        document.getElementById('btn-next').disabled = false;
      });
      el.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') el.click();
      });
    });

    const otherInput = root.querySelector('#industry-other');
    if (otherInput) otherInput.addEventListener('input', e => { industryOther = e.target.value; });

    root.querySelector('#btn-next').addEventListener('click', () => {
      if (answers.industry) {
        currentStep = 8;
        renderEmail();
      }
    });

    root.querySelector('#btn-back').addEventListener('click', () => {
      currentStep = 6;
      renderStep(6);
    });
  }

  /* ── Email capture ──────────────────────────────────────── */

  function renderEmail() {
    root.innerHTML = `
      <div class="question-wrap fade-in">
        <div class="container--narrow">
          <p class="question-counter">Almost there</p>
          <p class="question-text" style="font-size:1.4rem;">Want us to email you your results?</p>
          <div class="email-section" style="border-top:none; padding-top:0; margin-top:0;">
            <label class="input-label" for="email-input">Email address</label>
            <input class="input-field" type="email" id="email-input" placeholder="you@yourcompany.com" />
          </div>
          <div class="question-nav" style="margin-top:24px; flex-direction:column; align-items:flex-start; gap:16px;">
            <button class="btn btn--primary" id="btn-submit">See My GenAI Clarity Score →</button>
            <button class="skip-link" id="btn-skip">No thanks, just show me my score</button>
          </div>
        </div>
      </div>
    `;

    root.querySelector('#btn-submit').addEventListener('click', () => submitAssessment());
    root.querySelector('#btn-skip').addEventListener('click', () => submitAssessment(true));
  }

  /* ── Submit ─────────────────────────────────────────────── */

  function submitAssessment(skip = false) {
    const email = skip ? '' : (document.getElementById('email-input')?.value || '');

    if (!answers.Q1score) answers.Q1score = scoreQ1(answers.toolsUsed);
    const scoreResult = calculateScores(answers);

    const payload = {
      ...scoreResult,
      industry:         answers.industry || 'Other',
      industryOther,
      genaiIntent:      answers.Q2 || '',
      toolsUsed:        answers.toolsUsed || [],
      toolsOther,
      q6Answer:         answers.Q6 || 1,
      email,
      stageDescription: STAGE_DESCRIPTIONS[scoreResult.stage],
      phaseBTeaser:     PHASE_B_TEASERS[scoreResult.stage]
    };

    saveScoreData(payload);
    window.location.href = 'results.html';
  }

  // Kick off
  renderStep(0);
})();


/* ── Results Controller ────────────────────────────────────── */

(function initResults() {
  if (!document.getElementById('results-root')) return;

  const data = loadScoreData();
  if (!data) {
    document.getElementById('results-root').innerHTML =
      `<div class="container--narrow" style="padding:80px 0; text-align:center;">
        <p>No results found. <a href="assessment.html">Take the assessment</a>.</p>
      </div>`;
    return;
  }

  renderResults(data);
})();

/* ── Results Rendering ─────────────────────────────────────── */

function renderResults(data) {
  const {
    totalScore, stage, dimensionScores,
    stageDescription, phaseBTeaser, industry,
    weakestDimension, weakestScore,
    toolsUsed, toolsOther, q6Answer
  } = data;

  const root     = document.getElementById('results-root');
  const dimNames = ['strategy', 'people', 'information', 'operations'];

  // ── Profile card ──────────────────────────────────────────
  const dimEntries    = Object.entries(dimensionScores);
  const strongest     = dimEntries.reduce((a, b) => a[1] > b[1] ? a : b)[0];
  const weakest       = weakestDimension || dimEntries.reduce((a, b) => a[1] < b[1] ? a : b)[0];
  const maxDimScore   = Math.max(...dimEntries.map(e => e[1]));
  const minDimScore   = Math.min(...dimEntries.map(e => e[1]));

  const profileHTML = (maxDimScore - minDimScore) <= 5
    ? `Your dimensions are evenly balanced — no single area is dramatically stronger or weaker than the others.`
    : `Your strongest area is <strong>${capitalize(strongest)}</strong>. Your biggest opportunity is <strong>${capitalize(weakest)}</strong>.`;

  const industryInsight = INDUSTRY_INSIGHTS[industry] || INDUSTRY_INSIGHTS['Other'];

  // Tools sentence — if any meaningful tools selected
  const meaningfulTools = (toolsUsed || [])
    .filter(t => t !== 'None yet')
    .map(t => (t === 'Other' && toolsOther) ? toolsOther : t)
    .filter(t => t !== 'Other');
  const toolsSentence = meaningfulTools.length > 0
    ? `You're already working with ${meaningfulTools.join(', ')} — the opportunity is making that usage more consistent and intentional.`
    : '';

  // ── Context card ──────────────────────────────────────────
  const blockerText = BLOCKER_ACKNOWLEDGMENTS[q6Answer || 1] || '';
  const contextText = blockerText + ' ' + getBenchmarkLine(stage, totalScore);

  const checkSVG = `<svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true"><path d="M1 4l3 3 5-6" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  root.innerHTML = `
    <div class="results-page">

      <!-- Section 1: Hero -->
      <section class="r-section fade-up" style="animation-delay:0s; text-align:center;">
        <div class="dial-wrap" style="margin-bottom:16px;">
          ${buildDial(totalScore)}
        </div>
        <span class="results-stage-badge">
          <span class="stage-badge__dot"></span>
          ${stage.toUpperCase()}
        </span>
        <h1 class="results-stage-name">${stage}</h1>
        <p class="results-stage-desc">${stageDescription}</p>
      </section>

      <div class="results-divider"></div>

      <!-- Section 2: Dimensions -->
      <section class="r-section fade-up" style="animation-delay:0.15s;">
        <p class="r-section-label">YOUR FOUR DIMENSIONS</p>
        <div class="results-dim-grid">
          ${dimNames.map(dim => buildDimensionCard(dim, dimensionScores[dim])).join('')}
        </div>
      </section>

      <div class="results-divider"></div>

      <!-- Section 3: Insight cards -->
      <section class="r-section fade-up" style="animation-delay:0.3s;">
        <p class="r-section-label">WHAT THIS MEANS FOR YOUR GENAI JOURNEY</p>
        <div class="insight-cards">

          <!-- Card 1: Diagnosis -->
          <div class="insight-card">
            <div class="insight-card__icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="6.5" stroke="#6F61EF" stroke-width="1.5"/>
                <circle cx="8" cy="8" r="2" fill="#6F61EF"/>
                <line x1="8" y1="1.5"  x2="8" y2="3.5"   stroke="#6F61EF" stroke-width="1.5" stroke-linecap="round"/>
                <line x1="8" y1="12.5" x2="8" y2="14.5"  stroke="#6F61EF" stroke-width="1.5" stroke-linecap="round"/>
                <line x1="1.5" y1="8"  x2="3.5"  y2="8"  stroke="#6F61EF" stroke-width="1.5" stroke-linecap="round"/>
                <line x1="12.5" y1="8" x2="14.5" y2="8"  stroke="#6F61EF" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>
            <div class="insight-card__body">
              <p class="insight-card__label">YOUR DIAGNOSIS</p>
              <p class="insight-card__text">${SHORT_DIAGNOSIS[stage]}</p>
            </div>
          </div>

          <!-- Card 2: Profile -->
          <div class="insight-card">
            <div class="insight-card__icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <polyline points="1,12 5,7 9,9 15,3" stroke="#6F61EF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                <circle cx="5"  cy="7" r="1.5" fill="#6F61EF"/>
                <circle cx="9"  cy="9" r="1.5" fill="#6F61EF"/>
                <circle cx="15" cy="3" r="1.5" fill="#6F61EF"/>
              </svg>
            </div>
            <div class="insight-card__body">
              <p class="insight-card__label">YOUR PROFILE</p>
              <p class="insight-card__text">${profileHTML}</p>
              <p class="insight-card__sub">${industryInsight}</p>
              ${toolsSentence ? `<p class="insight-card__sub">${toolsSentence}</p>` : ''}
            </div>
          </div>

          <!-- Card 3: Context -->
          <div class="insight-card">
            <div class="insight-card__icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="6.5" cy="6.5" r="4.5" stroke="#6F61EF" stroke-width="1.5"/>
                <line x1="10" y1="10" x2="14.5" y2="14.5" stroke="#6F61EF" stroke-width="1.75" stroke-linecap="round"/>
              </svg>
            </div>
            <div class="insight-card__body">
              <p class="insight-card__label">YOUR CONTEXT</p>
              <p class="insight-card__text">${contextText}</p>
            </div>
          </div>

        </div>
      </section>

      <div class="results-divider"></div>

      <!-- Section 4: CTA -->
      <section class="r-section fade-up" style="animation-delay:0.45s;">
        <div class="results-cta-card">
          <span class="cta-tag">GENAI STRATEGY REPORT</span>
          <h2 class="cta-title">Turn your diagnosis into a 90-day plan</h2>
          <p class="cta-teaser">${phaseBTeaser}</p>
          <ul class="cta-checklist">
            <li><span class="cta-check">${checkSVG}</span>A personalised 90-day GenAI action plan built around your specific answers</li>
            <li><span class="cta-check">${checkSVG}</span>The GenAI tools most relevant to your industry, workflows, and goals</li>
            <li><span class="cta-check">${checkSVG}</span>A plan built around what you told us you want to achieve</li>
            <li><span class="cta-check">${checkSVG}</span>Your single most important next step — within 7 days</li>
          </ul>
          <button class="btn-cta-full" id="btn-buy" onclick="handleBuyClick()">
            Get My GenAI Strategy Report — $97
          </button>
          <p class="cta-note">One-time purchase. Delivered as a PDF within minutes of payment.</p>
        </div>
      </section>

    </div>
  `;

  // Animate dimension progress bars after paint
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.querySelectorAll('.results-dim-bar-fill').forEach(el => {
        el.style.width = el.dataset.target + '%';
      });
    });
  });
}

/* ── Dial Builder ──────────────────────────────────────────── */

function buildDial(score) {
  const R  = 70;
  const CX = 90, CY = 90;
  const startAngle = -210;
  const totalAngle = 240;

  function polarToXY(angle, r) {
    const rad = (angle * Math.PI) / 180;
    return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
  }

  const bgStart    = polarToXY(startAngle, R);
  const bgEnd      = polarToXY(startAngle + totalAngle, R);
  const bgLargeArc = totalAngle > 180 ? 1 : 0;

  return `
    <svg class="dial-svg" width="180" height="180" viewBox="0 0 180 180" aria-label="Score: ${score} out of 100">
      <defs>
        <linearGradient id="dialGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stop-color="#6F61EF"/>
          <stop offset="100%" stop-color="#10b981"/>
        </linearGradient>
      </defs>
      <!-- Track -->
      <path
        d="M ${bgStart.x} ${bgStart.y} A ${R} ${R} 0 ${bgLargeArc} 1 ${bgEnd.x} ${bgEnd.y}"
        fill="none" stroke="#e5e7eb" stroke-width="10" stroke-linecap="round"
      />
      <!-- Fill (full arc path; dashoffset masks to proportional score) -->
      <path
        id="dial-fill"
        d="M ${bgStart.x} ${bgStart.y} A ${R} ${R} 0 ${bgLargeArc} 1 ${bgEnd.x} ${bgEnd.y}"
        fill="none" stroke="url(#dialGrad)" stroke-width="10" stroke-linecap="round"
        style="stroke-dasharray: 1000; stroke-dashoffset: 1000; transition: stroke-dashoffset 1.2s ease 0.3s;"
      />
      <!-- Score number (count-up animation via id=dial-score-text) -->
      <text x="${CX}" y="${CY + 4}" text-anchor="middle"
            font-family="DM Mono, monospace" font-size="52" font-weight="500"
            fill="#1a1a2e" id="dial-score-text">0</text>
      <text x="${CX}" y="${CY + 22}" text-anchor="middle"
            font-family="DM Mono, monospace" font-size="12"
            fill="#6b7280">out of 100</text>
    </svg>
  `;
}

/* ── Dimension Card Builder ────────────────────────────────── */

function buildDimensionCard(dim, score) {
  const pct    = Math.round(score);
  const label  = getDimensionLabel(dim, pct);
  const dimCap = dim.charAt(0).toUpperCase() + dim.slice(1);
  return `
    <div class="results-dim-card">
      <div class="results-dim-name">${dimCap}</div>
      <div class="results-dim-row">
        <span class="results-dim-score">${pct}</span>
        <span class="results-dim-label">${label}</span>
      </div>
      <div class="results-dim-bar-track">
        <div class="results-dim-bar-fill" style="width:0%" data-target="${pct}"></div>
      </div>
    </div>
  `;
}

/* ── Dial & Score Animation ────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('results-root')) return;

  setTimeout(() => {
    const data = loadScoreData();
    if (!data) return;
    const score = data.totalScore;

    // Animate dial fill
    const dialFill = document.getElementById('dial-fill');
    if (dialFill) {
      const len = dialFill.getTotalLength ? dialFill.getTotalLength() : 400;
      dialFill.style.strokeDasharray  = len;
      dialFill.style.strokeDashoffset = len;
      requestAnimationFrame(() => {
        dialFill.style.strokeDashoffset = len - (score / 100) * len;
      });
    }

    // Count-up score number
    const scoreText = document.getElementById('dial-score-text');
    if (scoreText) {
      let start = 0;
      const duration = 1200;
      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased    = 1 - Math.pow(1 - progress, 3);
        scoreText.textContent = Math.round(eased * score);
        if (progress < 1) requestAnimationFrame(step);
      };
      setTimeout(() => requestAnimationFrame(step), 300);
    }
  }, 100);
});

/* ── Buy / Share Handlers ──────────────────────────────────── */

async function handleBuyClick() {
  const data = loadScoreData();
  if (!data) return;

  const btn = document.getElementById('btn-buy');
  if (btn) {
    btn.disabled    = true;
    btn.textContent = 'Redirecting to checkout…';
  }

  try {
    const res  = await fetch('/api/create-checkout', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ scoreData: data })
    });
    const json = await res.json();
    if (json.url) {
      // Persist scoreData so strategy.html can recover it after Stripe redirect
      saveScoreData(data);
      window.location.href = json.url;
    } else {
      throw new Error('No checkout URL returned');
    }
  } catch (err) {
    console.error(err);
    if (btn) {
      btn.disabled    = false;
      btn.textContent = 'Get My GenAI Strategy Report — $97';
    }
    alert('Something went wrong. Please try again.');
  }
}

function copyResultsLink() {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    alert('Link copied to clipboard!');
  }).catch(() => {
    prompt('Copy this link:', url);
  });
}

function shareToLinkedIn() {
  const data  = loadScoreData();
  const score = data ? data.totalScore : '—';
  const stage = data ? data.stage : '';
  const text  = encodeURIComponent(`I scored ${score}/100 (${stage}) on the Promptly GenAI Clarity Assessment. Find out where your business stands: ${window.location.origin}/index.html`);
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}&summary=${text}`, '_blank');
}
