/* ============================================================
   PROMPTLY — Assessment Logic & Scoring Engine
   ============================================================ */

'use strict';

/* ── Question Definitions ──────────────────────────────────── */

const QUESTIONS = [
  {
    id: 'O1',
    dimension: 'operations',
    text: 'If a key person on your team was away for two weeks, how smoothly would your business keep running?',
    options: [
      'It would be very difficult — too much depends on that person',
      "We'd get by, but important things would slip or get delayed",
      'It would be manageable, but not without some stress and scrambling',
      "We'd handle it reasonably well — most things are documented or covered",
      'It would run smoothly — we have processes and backup in place'
    ]
  },
  {
    id: 'I1',
    dimension: 'information',
    text: 'When you need details about a customer, a job, or a project — how quickly can you actually find them?',
    options: [
      'It often takes a while — things are spread across emails, notes, and memory',
      'I can usually find what I need but it takes more effort than it should',
      'It depends — some things are easy to find, others aren\'t',
      'Most information is reasonably well organised and accessible',
      'Very quickly — we have a reliable system and information is easy to find'
    ]
  },
  {
    id: 'I2',
    dimension: 'information',
    text: 'How much of the knowledge about how your business runs is written down or recorded somewhere — rather than living only in people\'s heads?',
    options: [
      'Very little — most of it lives in people\'s heads',
      'Some things are documented, but most isn\'t',
      'A reasonable amount is written down, but there are big gaps',
      'Most of it is documented, with a few gaps',
      'Almost all of it — we\'ve made a real effort to capture how things work'
    ]
  },
  {
    id: 'I3',
    dimension: 'information',
    text: 'How complete and reliable is the information your business keeps track of day-to-day?',
    options: [
      'Not at all',
      'Not really',
      'Somewhat',
      'Mostly',
      'Completely'
    ]
  },
  {
    id: 'I4',
    dimension: 'information',
    text: 'When you need to make an important business decision, how available is the information you need?',
    options: [
      'I usually go on instinct — the information isn\'t really there',
      'I can piece something together, but it takes asking around',
      'I have some of what I need, but often wish I had more',
      'I usually have what I need, though it\'s not always perfectly organised',
      'It\'s readily available — I can make decisions with confidence'
    ]
  },
  {
    id: 'P1',
    dimension: 'people',
    text: 'When your business introduces a new tool or a new way of doing things, how do you and your team typically respond?',
    options: [
      'Resistant — new tools tend to get pushed back on and often don\'t stick',
      'Cautious — we\'re open to it but it takes time and usually needs a strong case',
      'Inconsistent — some people get on board quickly, others need more time and nudging',
      'Generally open — we\'re willing to try things and most people adapt reasonably well',
      'Enthusiastic — we enjoy finding better ways of working and adoption is usually smooth'
    ]
  },
  {
    id: 'P2',
    dimension: 'people',
    text: 'How comfortable is your team with the everyday digital tools your business already uses?',
    options: [
      'Not at all',
      'Not really',
      'Somewhat',
      'Mostly',
      'Completely'
    ]
  },
  {
    id: 'P3',
    dimension: 'people',
    text: 'How much time and energy does your team realistically have to try AI tools right now?',
    options: [
      'Not at all',
      'Not really',
      'Somewhat',
      'Mostly',
      'Completely'
    ]
  },
  {
    id: 'T1',
    dimension: 'technology',
    text: 'How well do the tools and software your business uses actually work together?',
    options: [
      'They don\'t really — everything is separate and there\'s a lot of manual work between them',
      'There\'s some connection but a lot of information still has to be moved manually',
      'Some tools connect well, others don\'t — it\'s patchy',
      'Most of our tools work together reasonably well',
      'Very well — our tools are well integrated and data flows between them reliably'
    ]
  },
  {
    id: 'T2',
    dimension: 'technology',
    text: 'How confident are you that your business handles customer and business data in a way that\'s secure and private?',
    options: [
      'Not confident — we haven\'t really thought about it',
      'Slightly confident — we do the basics but it\'s not something we manage actively',
      'Somewhat confident — we have some practices in place but know there are gaps',
      'Quite confident — we take data security seriously and have clear practices',
      'Very confident — we have strong, well-maintained data security and privacy practices'
    ]
  },
  {
    id: 'S1',
    dimension: 'strategy',
    text: 'How clearly can you describe the specific problem you\'d most want AI to solve in your business?',
    options: [
      'I can\'t — I\'m not sure what problem AI would solve for us',
      'Vaguely — I have a general sense but nothing specific',
      'Somewhat — I have an idea but it\'s not well defined',
      'Fairly clearly — I know the problem, though the solution isn\'t fully mapped out',
      'Very clearly — I can describe the problem and why solving it would matter'
    ]
  },
  {
    id: 'S2',
    dimension: 'strategy',
    text: 'How clear is your business on what it actually wants AI to do for it over the next year?',
    options: [
      'Not clear at all — we haven\'t really decided',
      'Slightly clear — there\'s a vague direction but nothing concrete',
      'Somewhat clear — we have a general idea but it\'s not defined',
      'Fairly clear — we have a direction and some specific goals',
      'Very clear — we have a defined vision for what AI should deliver'
    ]
  },
  {
    id: 'S3',
    dimension: 'strategy',
    text: 'How well does your business understand what AI can and can\'t realistically do for you?',
    options: [
      'Not well — our understanding is mostly based on what we\'ve seen in the news',
      'Slightly — we have a basic sense but a lot of uncertainty',
      'Somewhat — we understand the general idea but not how it applies to us specifically',
      'Fairly well — we have a solid understanding with some gaps',
      'Very well — we have a realistic, grounded view of AI\'s capabilities and limitations'
    ]
  },
  {
    id: 'S4',
    dimension: 'strategy',
    text: 'How much has your business experimented with or tested AI tools, even informally?',
    options: [
      'Not at all — we haven\'t tried anything yet',
      'Casually — one or two of us have tried something but it hasn\'t gone anywhere',
      'A little — we\'ve tested a few things but nothing has stuck or been adopted properly',
      'Meaningfully — we\'ve run some real trials and have a sense of what works',
      'Actively — AI tools are already part of how we work and we\'re building on that'
    ]
  }
];

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

/* ── Dimension Map & Weights ───────────────────────────────── */

const DIMENSION_MAP = {
  operations: ['O1'],
  information: ['I1', 'I2', 'I3', 'I4'],
  people:      ['P1', 'P2', 'P3'],
  technology:  ['T1', 'T2'],
  strategy:    ['S1', 'S2', 'S3', 'S4']
};

const WEIGHTS = {
  operations: 0.15,
  information: 0.25,
  people:      0.20,
  technology:  0.15,
  strategy:    0.25
};

/* ── Scoring Engine ────────────────────────────────────────── */

function calculateScores(answers) {
  // answers: { O1: 3, I1: 2, ... }  (values 1–5)
  const dimensionScores = {};

  for (const [dim, ids] of Object.entries(DIMENSION_MAP)) {
    const vals = ids.map(id => answers[id] || 1);
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
    dimensionScores[dim] = ((avg - 1) / 4) * 100;
  }

  // Weighted total
  let rawTotal = 0;
  for (const [dim, weight] of Object.entries(WEIGHTS)) {
    rawTotal += dimensionScores[dim] * weight;
  }

  // Pattern rules — affect stage assignment only
  let adjustedScore = rawTotal;

  const info = dimensionScores.information;
  const strat = dimensionScores.strategy;

  // Rule 1: Critical floor
  if (info < 25 || strat < 25) {
    adjustedScore = Math.min(adjustedScore, 55);
  }

  // Rule 2: High weight cap
  if (info < 40 || strat < 40) {
    adjustedScore = Math.max(adjustedScore - 15, 0);
  }

  // Stage assignment
  let stage;
  if (adjustedScore <= 32)      stage = 'Emerging';
  else if (adjustedScore <= 55) stage = 'Momentum';
  else if (adjustedScore <= 78) stage = 'Acceleration';
  else                          stage = 'Mastery';

  // Rule 3: Leader Gate
  if (stage === 'Mastery' && (info < 60 || strat < 60)) {
    stage = 'Acceleration';
  }

  // Profile flag
  const dimEntries = Object.entries(dimensionScores);
  const strongest = dimEntries.reduce((a, b) => a[1] > b[1] ? a : b)[0];
  const weakest   = dimEntries.reduce((a, b) => a[1] < b[1] ? a : b)[0];

  const profileFlag = `Your strongest dimension is ${capitalize(strongest)}. Your biggest opportunity is ${capitalize(weakest)}.`;

  return {
    totalScore: Math.round(rawTotal),
    stage,
    dimensionScores,
    profileFlag,
    weakestDimension: weakest,
    weakestScore: dimensionScores[weakest]
  };
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/* ── Narrative Assembly Engine ─────────────────────────────── */

const STAGE_OPENERS = {
  Emerging:     "Based on your answers, the biggest opportunity for your business isn't which AI tools to use — it's making sure the right foundations are in place so that when you do start, it actually works.",
  Momentum:     "Your assessment shows a business that's moving — but where you go from here depends a lot on which parts of your operation are carrying the load and which ones are creating drag.",
  Acceleration: "You're past the starting line — your assessment shows real readiness across most of what matters, and the focus now is making sure your strongest areas are pulling the rest of the business forward.",
  Mastery:      "Your results put you in a small group of businesses that have genuinely built the conditions for AI to deliver — the question now is how deliberately you're directing that advantage."
};

const INDUSTRY_INSIGHTS = {
  'Legal Services':          "In legal, the businesses pulling ahead aren't automating legal work — they're automating everything around it, so the people doing the actual work have more time to do it well.",
  'Financial Services':      "Financial services businesses are sitting on more usable data than almost any other industry — the gap between readiness and results here is almost always about structure, not ambition.",
  'Consulting & Advisory':   "For consulting businesses, AI's biggest immediate value isn't delivering work faster — it's capturing and reusing the thinking that currently lives only in senior people's heads.",
  'Marketing & Advertising': "Marketing businesses are often further ahead on AI tools than they realise — the challenge is usually that usage is patchy, individual, and disconnected from how the business actually delivers work.",
  'Healthcare & Wellness':   "In healthcare and wellness, the highest-value AI applications are rarely clinical — they're operational and administrative, and they free up the people with the expertise to use it where it matters most.",
  'Real Estate':             "Real estate businesses generate enormous amounts of information across every deal, client, and property — most of it never gets captured in a way that makes the next transaction easier.",
  'Retail & E-commerce':     "For retail businesses, GenAI clarity tends to come down to one thing more than anything else: whether the data from day-to-day operations is clean, consistent, and actually being used.",
  'Construction & Trades':   "Construction and trades businesses are often dismissed as low-tech — but the operational and information challenges they face are exactly the kind AI is increasingly good at solving.",
  'Education & Coaching':    "Education and coaching businesses have something most industries don't — a naturally repeatable delivery model — and that repeatability is what makes AI unusually effective here when the foundations are right.",
  'Other':                   "Every business has its own version of the same underlying challenge — too much knowledge locked in people's heads, too many processes that depend on the right person being available, and not enough structured information to make good decisions quickly."
};

const CHALLENGE_ACKNOWLEDGMENTS = {
  operations: "Operational consistency is one of those things that's easy to deprioritise when the business is busy — and most businesses only notice the gap when something goes wrong or a key person leaves.",
  information: "Scattered or hard-to-find information is the single most common reason AI implementations underdeliver — it's not a technology problem, it's a foundations problem, and it's entirely fixable.",
  people:      "Resistance or uncertainty around AI is almost never about capability — it's usually about trust, bandwidth, and not having seen it work for someone in a similar role yet.",
  technology:  "Disconnected tools are more common than most businesses realise — and the good news is that GenAI clarity doesn't require a technology overhaul, it requires knowing which gaps actually matter.",
  strategy:    "Most businesses that struggle with AI strategy aren't lacking ambition — they're trying to answer the wrong question. The right question isn't 'how do we use AI' it's 'what specific problem would change everything if we solved it'."
};

function getBenchmarkLine(stage, totalScore) {
  if (stage === 'Emerging') {
    if (totalScore <= 16) {
      return "Studies suggest fewer than one in five businesses has a clear AI strategy in place — so while your foundations are early, you're far from alone in starting here.";
    }
    return "Research consistently shows that the majority of small and mid-sized businesses are at this stage — most are watching AI closely but haven't yet built the conditions to make it work reliably.";
  }
  if (stage === 'Momentum') {
    if (totalScore >= 48) {
      return "You're at the top of the Momentum stage — research suggests businesses at this point are closer to meaningful AI returns than they typically realise.";
    }
    return "Most research puts around 25–30% of SMBs at this stage — past the starting line but not yet seeing consistent returns from AI investment.";
  }
  if (stage === 'Acceleration') {
    if (totalScore >= 70) {
      return "You're approaching the top of the Acceleration stage — research indicates businesses at this level are among the top 15% of SMBs for GenAI clarity globally.";
    }
    return "Industry research suggests fewer than 20% of small and mid-sized businesses reach this stage — your business has built something most haven't.";
  }
  if (stage === 'Mastery') {
    return "Research from McKinsey and Deloitte consistently identifies fewer than 5% of businesses at this level of GenAI clarity — this is a genuinely rare result.";
  }
  return "Across industries, research suggests the majority of businesses are still in the early stages of GenAI clarity — your score puts your business ahead of where most are today.";
}

function assembleNarrative(scoreResult, industry) {
  const { stage, weakestDimension, weakestScore, totalScore } = scoreResult;

  const opener    = STAGE_OPENERS[stage];
  const profileFl = scoreResult.profileFlag;
  const industryI = INDUSTRY_INSIGHTS[industry] || INDUSTRY_INSIGHTS['Other'];
  const benchmark = getBenchmarkLine(stage, totalScore);

  // Challenge acknowledgment: only if weakest score is band 1 or 2 (0–40)
  let challenge = '';
  if (weakestScore < 40) {
    challenge = CHALLENGE_ACKNOWLEDGMENTS[weakestDimension];
  }

  // Return both a flat string (for backwards compat) and a structured parts object
  const contextParts = [challenge, benchmark].filter(Boolean).join(' ');
  return {
    flat: `${opener} ${profileFl} ${industryI}${challenge ? ' ' + challenge : ''} ${benchmark}`,
    diagnosis: opener,
    profile:   `${profileFl} ${industryI}`,
    context:   contextParts
  };
}

/* ── Dimension Labels ──────────────────────────────────────── */

const DIMENSION_LABELS = {
  operations: ['Fragile', 'Inconsistent', 'Functional', 'Reliable', 'Systematic'],
  information: ['Scattered', 'Partial', 'Organised', 'Accessible', 'Embedded'],
  people:      ['Resistant', 'Cautious', 'Engaged', 'Capable', 'Empowered'],
  technology:  ['Disconnected', 'Basic', 'Capable', 'Integrated', 'Optimised'],
  strategy:    ['Unclear', 'Forming', 'Developing', 'Defined', 'Strategic']
};

function getDimensionLabel(dimension, score) {
  if (score <= 20)  return DIMENSION_LABELS[dimension][0];
  if (score <= 40)  return DIMENSION_LABELS[dimension][1];
  if (score <= 60)  return DIMENSION_LABELS[dimension][2];
  if (score <= 80)  return DIMENSION_LABELS[dimension][3];
  return DIMENSION_LABELS[dimension][4];
}

/* ── Stage Descriptions ────────────────────────────────────── */

const STAGE_DESCRIPTIONS = {
  Emerging:     "Most businesses are at this stage — and the honest reason is that AI moves fast and the foundations take time to build. The businesses that end up getting the most from AI aren't the ones who moved first. They're the ones who got the basics right before they did.",
  Momentum:     "You've made a real start — some things are working, some aren't, and AI probably feels more promising than practical right now. That gap between promise and traction is exactly what this stage is about closing.",
  Acceleration: "Your business has the foundations in place and you're starting to see what AI can actually do. The question at this stage isn't whether AI will work for you — it's where to focus so the gains compound rather than plateau.",
  Mastery:      "This is a genuinely rare result. Your business has the strategy, the information infrastructure, and the team readiness to use AI in ways most businesses can't yet. The opportunity here isn't to start — it's to lead."
};

/* ── Phase B Teaser Copy ───────────────────────────────────── */

const PHASE_B_TEASERS = {
  Emerging:     "Your assessment has identified exactly where your foundations need work before AI can deliver for your business. The GenAI Strategy Report turns that diagnosis into a specific 90-day plan — the tools to start with, the internal changes that will make the biggest difference, and the order to tackle them in so you're not wasting time or money moving in the wrong direction.",
  Momentum:     "You've made a real start — but your assessment shows there are specific areas creating drag that will limit how far your current efforts take you. The GenAI Strategy Report identifies exactly where that drag is coming from and gives you a focused 90-day plan to close the gap between where you are and where AI starts delivering consistent returns.",
  Acceleration: "Your business has real GenAI clarity — the question now is where to focus so that advantage compounds rather than plateaus. The GenAI Strategy Report takes your specific profile and builds a 90-day plan around the highest-leverage opportunities for a business at your stage — the ones most likely to produce results you can actually point to.",
  Mastery:      "A Mastery result means your business is genuinely positioned to use AI in ways most businesses can't yet. The GenAI Strategy Report is built around that — not foundational advice you don't need, but a specific 90-day plan for directing your advantage deliberately, so the gap between your business and the rest of your industry keeps widening."
};

/* ── Short Stage Diagnoses (results page insight cards) ────── */

const SHORT_DIAGNOSIS = {
  Emerging:     "Most businesses start here — and it's a perfectly valid place to be. The difference between here and the next stage isn't a big overhaul. It's a few focused changes that make AI actually useful day-to-day rather than occasional.",
  Momentum:     "Your business is moving and some things are already working. The next step is figuring out exactly where to focus so the effort you're already putting in starts compounding.",
  Acceleration: "You're past the starting line. Real readiness is in place across most of what matters — the focus now is compounding the gains rather than letting them plateau.",
  Mastery:      "You're in a small group that has genuinely built the conditions for AI to deliver. The opportunity isn't to start — it's to direct your advantage deliberately and widen the gap."
};

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

/* ── Assessment Controller ─────────────────────────────────── */

(function initAssessment() {
  // Only run on assessment.html
  if (!document.getElementById('assessment-root')) return;

  const root         = document.getElementById('assessment-root');
  const progressFill = document.getElementById('progress-fill');
  const progressLbl  = document.getElementById('progress-label');

  let currentStep = 0;  // 0 = Q1..13, 14 = industry, 15 = email
  const answers   = {};
  let industry    = null;
  let industryOther = '';

  const TOTAL_QUESTIONS = QUESTIONS.length;
  const TOTAL_STEPS     = TOTAL_QUESTIONS + 2; // + industry + email

  function updateProgress() {
    const answered = Object.keys(answers).length;
    const pct = Math.round((answered / TOTAL_QUESTIONS) * 100);
    if (progressFill) progressFill.style.width = pct + '%';
    if (progressLbl)  progressLbl.textContent = pct + '% complete';
  }

  function renderQuestion(index) {
    const q = QUESTIONS[index];
    updateProgress();

    root.innerHTML = `
      <div class="question-wrap fade-in">
        <div class="container--narrow">
          <p class="question-counter">Question ${index + 1} of ${TOTAL_QUESTIONS}</p>
          <p class="question-text">${q.text}</p>
          <div class="answer-options" id="options-wrap">
            ${q.options.map((opt, i) => `
              <div class="answer-option${answers[q.id] === i+1 ? ' selected' : ''}"
                   data-value="${i+1}"
                   role="radio"
                   aria-checked="${answers[q.id] === i+1}"
                   tabindex="0">
                <span class="answer-option__radio"></span>
                <span class="answer-option__text">${opt}</span>
              </div>
            `).join('')}
          </div>
          <div class="question-nav">
            ${index > 0 ? `<button class="btn btn--ghost" id="btn-back">← Back</button>` : ''}
            <button class="btn btn--primary" id="btn-next" ${!answers[q.id] ? 'disabled' : ''}>
              ${index === TOTAL_QUESTIONS - 1 ? 'Continue' : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    `;

    // Option click/keyboard handlers
    root.querySelectorAll('.answer-option').forEach(el => {
      el.addEventListener('click', () => selectAnswer(q.id, parseInt(el.dataset.value)));
      el.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') selectAnswer(q.id, parseInt(el.dataset.value));
      });
    });

    const btnNext = root.querySelector('#btn-next');
    const btnBack = root.querySelector('#btn-back');

    if (btnNext) btnNext.addEventListener('click', () => {
      if (answers[q.id]) {
        currentStep++;
        if (currentStep >= TOTAL_QUESTIONS) renderIndustry();
        else renderQuestion(currentStep);
      }
    });

    if (btnBack) btnBack.addEventListener('click', () => {
      currentStep--;
      renderQuestion(currentStep);
    });
  }

  function selectAnswer(qId, value) {
    answers[qId] = value;
    updateProgress();
    // Re-render options in-place
    root.querySelectorAll('.answer-option').forEach(el => {
      const sel = parseInt(el.dataset.value) === value;
      el.classList.toggle('selected', sel);
      el.setAttribute('aria-checked', sel);
    });
    const btnNext = root.querySelector('#btn-next');
    if (btnNext) btnNext.disabled = false;
  }

  function renderIndustry() {
    updateProgress();
    root.innerHTML = `
      <div class="question-wrap fade-in">
        <div class="container--narrow">
          <p class="question-counter">Almost there</p>
          <p class="question-text">One last thing — what industry are you in?</p>
          <div class="industry-grid" id="industry-grid">
            ${INDUSTRIES.map(ind => `
              <div class="industry-card${industry === ind ? ' selected' : ''}"
                   data-industry="${ind}"
                   role="radio"
                   aria-checked="${industry === ind}"
                   tabindex="0">
                ${ind}
              </div>
            `).join('')}
          </div>
          <div id="other-input-wrap" class="${industry === 'Other' ? '' : 'hidden'}" style="margin-top:12px;">
            <input class="input-field"
                   type="text"
                   id="industry-other"
                   placeholder="Tell us a bit about your business (optional)"
                   value="${industryOther}" />
          </div>
          <div class="question-nav">
            <button class="btn btn--ghost" id="btn-back">← Back</button>
            <button class="btn btn--primary" id="btn-next" ${!industry ? 'disabled' : ''}>Continue →</button>
          </div>
        </div>
      </div>
    `;

    root.querySelectorAll('.industry-card').forEach(el => {
      el.addEventListener('click', () => {
        industry = el.dataset.industry;
        root.querySelectorAll('.industry-card').forEach(c => {
          c.classList.toggle('selected', c.dataset.industry === industry);
          c.setAttribute('aria-checked', c.dataset.industry === industry);
        });
        document.getElementById('other-input-wrap').classList.toggle('hidden', industry !== 'Other');
        document.getElementById('btn-next').disabled = false;
      });
      el.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') el.click();
      });
    });

    const otherInput = root.querySelector('#industry-other');
    if (otherInput) otherInput.addEventListener('input', e => { industryOther = e.target.value; });

    root.querySelector('#btn-next').addEventListener('click', () => {
      if (industry) {
        currentStep = TOTAL_QUESTIONS + 1;
        renderEmail();
      }
    });
    root.querySelector('#btn-back').addEventListener('click', () => {
      currentStep = TOTAL_QUESTIONS - 1;
      renderQuestion(currentStep);
    });
  }

  function renderEmail() {
    root.innerHTML = `
      <div class="question-wrap fade-in">
        <div class="container--narrow">
          <p class="question-counter">One more thing</p>
          <p class="question-text" style="font-size:1.4rem;">Want us to email you your results?</p>
          <div class="email-section" style="border-top:none; padding-top:0; margin-top:0;">
            <label class="input-label" for="email-input">Email address</label>
            <input class="input-field" type="email" id="email-input" placeholder="you@yourcompany.com" />
          </div>
          <div class="question-nav" style="margin-top: 24px; flex-direction: column; align-items:flex-start; gap:16px;">
            <button class="btn btn--primary" id="btn-submit">See My Results →</button>
            <button class="skip-link" id="btn-skip">No thanks, just show me my score</button>
          </div>
        </div>
      </div>
    `;

    root.querySelector('#btn-submit').addEventListener('click', () => submitAssessment());
    root.querySelector('#btn-skip').addEventListener('click', () => submitAssessment(true));
  }

  function submitAssessment(skip = false) {
    const email = skip ? '' : (document.getElementById('email-input')?.value || '');

    // Run scoring engine
    const scoreResult   = calculateScores(answers);
    const narrativeParts = assembleNarrative(scoreResult, industry);

    const payload = {
      ...scoreResult,
      industry,
      industryOther,
      email,
      narrative:      narrativeParts.flat,
      narrativeParts: { diagnosis: narrativeParts.diagnosis, profile: narrativeParts.profile, context: narrativeParts.context },
      stageDescription: STAGE_DESCRIPTIONS[scoreResult.stage],
      phaseBTeaser:     PHASE_B_TEASERS[scoreResult.stage]
    };

    saveScoreData(payload);
    window.location.href = 'results.html';
  }

  // Kick off
  renderQuestion(0);
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

function renderResults(data) {
  const {
    totalScore, stage, dimensionScores, narrativeParts,
    stageDescription, phaseBTeaser, industry,
    weakestDimension, weakestScore
  } = data;

  const root     = document.getElementById('results-root');
  const dimNames = ['operations', 'information', 'people', 'technology', 'strategy'];

  // Resolve strongest / weakest
  const dimEntries = Object.entries(dimensionScores);
  const strongest  = dimEntries.reduce((a, b) => a[1] > b[1] ? a : b)[0];
  const weakest    = weakestDimension || dimEntries.reduce((a, b) => a[1] < b[1] ? a : b)[0];
  const weakScore  = weakestScore !== undefined ? weakestScore : dimensionScores[weakest];

  const industryInsight = INDUSTRY_INSIGHTS[industry] || INDUSTRY_INSIGHTS['Other'];

  // Profile card text — bold strongest/weakest in purple
  // Edge case: if all dimensions within 5 points, report balance instead
  const maxDimScore = Math.max(...dimEntries.map(e => e[1]));
  const minDimScore = Math.min(...dimEntries.map(e => e[1]));
  const profileHTML = (maxDimScore - minDimScore) <= 5
    ? `Your dimensions are evenly balanced — no single area is dramatically stronger or weaker than the others.`
    : `<strong>${capitalize(strongest)}</strong> is your strongest area. <strong>${capitalize(weakest)}</strong> is where you have the most to gain — and it's the dimension that will unlock everything else.`;

  // Context card text — challenge (if weak) + benchmark, ≤2 sentences
  let contextText = '';
  if (weakScore < 40 && CHALLENGE_ACKNOWLEDGMENTS[weakest]) {
    contextText = CHALLENGE_ACKNOWLEDGMENTS[weakest] + ' ';
  }
  contextText += getBenchmarkLine(stage, totalScore);

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
        <p class="r-section-label">YOUR FIVE DIMENSIONS</p>
        <div class="results-dim-grid">
          ${dimNames.map((dim, i) => buildDimensionCard(dim, dimensionScores[dim], i === 4)).join('')}
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
                <circle cx="5" cy="7"  r="1.5" fill="#6F61EF"/>
                <circle cx="9" cy="9"  r="1.5" fill="#6F61EF"/>
                <circle cx="15" cy="3" r="1.5" fill="#6F61EF"/>
              </svg>
            </div>
            <div class="insight-card__body">
              <p class="insight-card__label">YOUR PROFILE</p>
              <p class="insight-card__text">${profileHTML}</p>
              <p class="insight-card__sub">${industryInsight}</p>
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
          <span class="cta-tag">AI STRATEGY REPORT</span>
          <h2 class="cta-title">Turn your diagnosis into a 90-day plan</h2>
          <p class="cta-teaser">${phaseBTeaser}</p>
          <ul class="cta-checklist">
            <li><span class="cta-check">${checkSVG}</span>A personalised 90-day action plan across 3 phases</li>
            <li><span class="cta-check">${checkSVG}</span>The 5–7 AI tools most relevant to your industry and stage</li>
            <li><span class="cta-check">${checkSVG}</span>The risks and failure modes to avoid at your stage</li>
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

function buildDial(score) {
  const R = 70;
  const CX = 90, CY = 90;
  const startAngle = -210;
  const totalAngle = 240;
  const endAngle   = startAngle + (score / 100) * totalAngle;

  function polarToXY(angle, r) {
    const rad = (angle * Math.PI) / 180;
    return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
  }

  const bgStart = polarToXY(startAngle, R);
  const bgEnd   = polarToXY(startAngle + totalAngle, R);
  const fgEnd   = polarToXY(endAngle, R);

  const bgLargeArc = totalAngle > 180 ? 1 : 0;
  const fgLargeArc = (score / 100) * totalAngle > 180 ? 1 : 0;

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
      <!-- Score number (animated count-up via JS targeting id=dial-score-text) -->
      <text x="${CX}" y="${CY + 4}" text-anchor="middle"
            font-family="DM Mono, monospace" font-size="52" font-weight="500"
            fill="#1a1a2e" id="dial-score-text">0</text>
      <text x="${CX}" y="${CY + 22}" text-anchor="middle"
            font-family="DM Mono, monospace" font-size="12"
            fill="#6b7280">out of 100</text>
    </svg>
  `;
}

function buildDimensionCard(dim, score, isLast) {
  const pct    = Math.round(score);
  const label  = getDimensionLabel(dim, pct);
  const dimCap = dim.charAt(0).toUpperCase() + dim.slice(1);
  return `
    <div class="results-dim-card${isLast ? ' results-dim-card--full' : ''}">
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

// Animate dial after render
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
      dialFill.style.strokeDasharray = len;
      dialFill.style.strokeDashoffset = len;
      // Trigger animation
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
        const eased = 1 - Math.pow(1 - progress, 3);
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
    btn.disabled = true;
    btn.textContent = 'Redirecting to checkout…';
  }

  try {
    const res = await fetch('/api/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scoreData: data })
    });
    const json = await res.json();
    if (json.url) {
      // Persist scoreData to sessionStorage so strategy.html can recover it
      // after the Stripe redirect (URL `data` param can get truncated/encoded)
      saveScoreData(data);
      window.location.href = json.url;
    } else {
      throw new Error('No checkout URL returned');
    }
  } catch (err) {
    console.error(err);
    if (btn) {
      btn.disabled = false;
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
  const data = loadScoreData();
  const score = data ? data.totalScore : '—';
  const stage = data ? data.stage : '';
  const text = encodeURIComponent(`I scored ${score}/100 (${stage}) on the Promptly GenAI Clarity Assessment. Find out where your business stands: ${window.location.origin}/index.html`);
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}&summary=${text}`, '_blank');
}
