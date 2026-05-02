/* ===========================
   DARK / LIGHT MODE TOGGLE
=========================== */
const themeToggle = document.getElementById("themeToggle");
const htmlEl = document.documentElement;

function applyTheme(theme) {
  htmlEl.setAttribute("data-theme", theme);
  localStorage.setItem("km-theme", theme);
}

// Load saved theme
const savedTheme = localStorage.getItem("km-theme") || "dark";
applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const current = htmlEl.getAttribute("data-theme");
  applyTheme(current === "dark" ? "light" : "dark");
});

/* ===========================
   PAGE NAVIGATION
=========================== */
const homePage = document.getElementById("homePage");
const aboutPage = document.getElementById("aboutPage");
const compatPage = document.getElementById("compatPage");
const naamankPage = document.getElementById("naamankPage");

function showHome(e) {
  e.preventDefault();
  aboutPage.classList.remove("active");
  homePage.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showNaamank(e) {
  e.preventDefault();
  [homePage, aboutPage, compatPage].forEach(p => p.classList.remove("active"));
  naamankPage.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showCompat(e) {
  e.preventDefault();
  homePage.classList.remove("active");
  aboutPage.classList.remove("active");
  compatPage.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showAbout(e) {
  e.preventDefault();
  homePage.classList.remove("active");
  aboutPage.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ===========================
   PARTICLE CANVAS
=========================== */
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticles() {
  particles = [];
  const count = Math.floor((canvas.width * canvas.height) / 18000);
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.4,
      dx: (Math.random() - 0.5) * 0.25,
      dy: (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.5 ? "123,145,255" : "61,232,188"
    });
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const isDark = htmlEl.getAttribute("data-theme") === "dark";
  for (const p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${p.color},${isDark ? p.opacity : p.opacity * 0.5})`;
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  }
  requestAnimationFrame(animateParticles);
}

resizeCanvas();
createParticles();
animateParticles();

window.addEventListener("resize", () => {
  resizeCanvas();
  createParticles();
});

/* ===========================
   FORM ELEMENTS
=========================== */
const form = document.getElementById("numerologyForm");
const nameInput = document.getElementById("nameInput");
const dobInput = document.getElementById("dobInput");
const inputSection = document.getElementById("inputSection");
const loaderSection = document.getElementById("loaderSection");
const resultSection = document.getElementById("resultSection");
const numberSummary = document.getElementById("numberSummary");
const combinedCard = document.getElementById("combinedCard");
const coreGrid = document.getElementById("coreGrid");
const growthGrid = document.getElementById("growthGrid");
const fortuneGrid = document.getElementById("fortuneGrid");
const shareCard = document.getElementById("shareCard");
const downloadBtn = document.getElementById("downloadBtn");
const resetBtn = document.getElementById("resetBtn");
const resetBtnTop = document.getElementById("resetBtnTop");

/* ===========================
   NUMEROLOGY DATA
=========================== */
const predictionJson = {
  1: { personalityTraits: { strengths: ["Decisive", "Bold", "Independent"], weaknesses: ["Impatient", "Dominating", "Ego-sensitive"] }, careerGuidance: { bestFields: ["Leadership", "Startups", "Management", "Politics"], workStyle: "Performs best with autonomy and clear goals.", risks: "Can burn bridges by moving too fast or controlling too much." }, loveRelationships: { behavior: "Protective and expressive, prefers clarity over mixed signals.", compatibilityTendency: "Attracted to emotionally stable partners who respect individuality." }, financialBehavior: { saving: "Moderate saver when focused on a major goal.", spending: "Spends confidently on status and performance.", riskTaking: "High risk appetite in business ideas." }, lifeChallenges: "Balancing confidence with humility, and authority with empathy.", healthTendencies: "Prone to stress headaches and sleep imbalance during overwork cycles.", luckyElements: { colors: ["Gold", "Crimson"], days: ["Sunday", "Monday"], numbers: [1, 10, 19] }, spiritualGuidance: { deity: "Surya (Sun) for vitality and confidence.", practices: ["Sunrise gratitude", "Breath discipline", "Daily intention journaling"] }, practicalAdvice: "Lead with vision, but include others early to reduce resistance.", lifePatternInsight: "Early breakthroughs come fast; stable recognition grows when patience matures." },
  2: { personalityTraits: { strengths: ["Diplomatic", "Empathetic", "Intuitive"], weaknesses: ["Overthinking", "People-pleasing", "Mood fluctuation"] }, careerGuidance: { bestFields: ["Counseling", "HR", "Design", "Partnership roles"], workStyle: "Collaborative, detail-aware, and emotionally intelligent.", risks: "May delay decisions or avoid conflict too long." }, loveRelationships: { behavior: "Nurturing and emotionally present, seeks emotional security.", compatibilityTendency: "Compatible with grounded communicators and patient partners." }, financialBehavior: { saving: "Careful saver, usually values stability.", spending: "Spends on comfort and family needs.", riskTaking: "Low-to-moderate risk preference." }, lifeChallenges: "Building self-trust and speaking up without fear of disapproval.", healthTendencies: "Sensitive nervous system; benefits from rest rhythm and hydration.", luckyElements: { colors: ["White", "Sky Blue"], days: ["Monday", "Friday"], numbers: [2, 11, 20] }, spiritualGuidance: { deity: "Chandra (Moon) for emotional steadiness.", practices: ["Moonlight walking", "Reflective journaling", "Soft mantra meditation"] }, practicalAdvice: "Set one boundary per week and protect your energy consistently.", lifePatternInsight: "Growth is gradual but dependable; major rewards come through partnerships." },
  3: { personalityTraits: { strengths: ["Creative", "Charismatic", "Optimistic"], weaknesses: ["Scattered focus", "Impulsive speech", "Inconsistency"] }, careerGuidance: { bestFields: ["Media", "Teaching", "Marketing", "Content creation"], workStyle: "Performs with expression, storytelling, and audience engagement.", risks: "Loses momentum when routine and planning are weak." }, loveRelationships: { behavior: "Playful, romantic, and expressive with affection.", compatibilityTendency: "Thrives with partners who value communication and fun." }, financialBehavior: { saving: "Needs systems to save consistently.", spending: "Spends on lifestyle, travel, and experiences.", riskTaking: "Moderate risk, especially in creative ventures." }, lifeChallenges: "Turning talent into disciplined execution.", healthTendencies: "Energy spikes and crashes; benefits from sleep consistency.", luckyElements: { colors: ["Yellow", "Orange"], days: ["Thursday", "Sunday"], numbers: [3, 12, 21] }, spiritualGuidance: { deity: "Brihaspati (Jupiter) for wisdom and expansion.", practices: ["Gratitude recitation", "Skill practice blocks", "Mindful speaking"] }, practicalAdvice: "Choose one priority project and finish before opening new ideas.", lifePatternInsight: "Popularity rises early; long-term success appears after building structure." },
  4: { personalityTraits: { strengths: ["Reliable", "Disciplined", "Methodical"], weaknesses: ["Rigid", "Skeptical", "Workaholic"] }, careerGuidance: { bestFields: ["Engineering", "Operations", "Architecture", "Administration"], workStyle: "Strong in process, systems, and consistency.", risks: "Can resist innovation and miss timing in fast markets." }, loveRelationships: { behavior: "Loyal and serious, demonstrates love through responsibility.", compatibilityTendency: "Needs patient partners who appreciate dependability." }, financialBehavior: { saving: "Strong saver with practical long-term planning.", spending: "Conservative spender, values utility.", riskTaking: "Low risk tolerance unless data is strong." }, lifeChallenges: "Allowing flexibility and emotional openness.", healthTendencies: "Can accumulate stiffness and fatigue from repetitive routines.", luckyElements: { colors: ["Navy", "Earth Brown"], days: ["Saturday", "Sunday"], numbers: [4, 13, 22] }, spiritualGuidance: { deity: "Ganesha for obstacle-clearing and grounded wisdom.", practices: ["Daily declutter", "Steady walking", "Structured prayer routine"] }, practicalAdvice: "Plan deeply, but keep a weekly slot for experimentation.", lifePatternInsight: "Steady progress defines life; strongest gains appear in mid-life stability." },
  5: { personalityTraits: { strengths: ["Adaptable", "Energetic", "Persuasive"], weaknesses: ["Restless", "Commitment-avoidant", "Overstimulated"] }, careerGuidance: { bestFields: ["Sales", "Travel", "Business development", "Digital ventures"], workStyle: "Thrives in variety and high-interaction environments.", risks: "Inconsistency and risk-heavy decisions can create instability." }, loveRelationships: { behavior: "Magnetic and exciting, needs space and novelty.", compatibilityTendency: "Best with emotionally secure partners who avoid control dynamics." }, financialBehavior: { saving: "Can save in bursts; struggles with routine budgeting.", spending: "Enjoys spending on freedom and experiences.", riskTaking: "High risk appetite, especially short-term." }, lifeChallenges: "Building discipline without losing freedom.", healthTendencies: "Prone to stress from overload; needs digital and sensory breaks.", luckyElements: { colors: ["Green", "Turquoise"], days: ["Wednesday", "Friday"], numbers: [5, 14, 23] }, spiritualGuidance: { deity: "Vishnu for balance and centered movement.", practices: ["Breath reset breaks", "Digital detox windows", "Mindful travel"] }, practicalAdvice: "Use a 3-goal weekly system to direct your high energy.", lifePatternInsight: "Rapid shifts define your path; success spikes when focus matches opportunity." },
  6: { personalityTraits: { strengths: ["Caring", "Responsible", "Harmonizing"], weaknesses: ["Overgiving", "Control in care", "Emotional burden"] }, careerGuidance: { bestFields: ["Education", "Healthcare support", "Design", "Hospitality"], workStyle: "People-centered, quality-focused, and relationship-oriented.", risks: "May neglect own ambition while supporting everyone else." }, loveRelationships: { behavior: "Deeply devoted and family-driven.", compatibilityTendency: "Seeks emotionally mature partners with shared values." }, financialBehavior: { saving: "Strong planner for family security.", spending: "Spends thoughtfully on home, comfort, and quality.", riskTaking: "Moderate risk after careful thought." }, lifeChallenges: "Learning to receive support and setting healthy boundaries.", healthTendencies: "Can carry emotional stress physically; benefits from rest rituals.", luckyElements: { colors: ["Rose", "Cream"], days: ["Friday", "Monday"], numbers: [6, 15, 24] }, spiritualGuidance: { deity: "Lakshmi for harmony, abundance, and grace.", practices: ["Home altar routine", "Compassion meditation", "Boundary journaling"] }, practicalAdvice: "Prioritize one personal ambition every quarter, not just family goals.", lifePatternInsight: "Stability comes early; peak fulfillment appears through meaningful service and artistry." },
  7: { personalityTraits: { strengths: ["Insightful", "Analytical", "Spiritual"], weaknesses: ["Detached", "Secretive", "Perfectionist"] }, careerGuidance: { bestFields: ["Research", "Technology", "Writing", "Data analysis"], workStyle: "Deep work, strategy, and thoughtful problem-solving.", risks: "Can isolate too much and miss collaborative opportunities." }, loveRelationships: { behavior: "Private, loyal, and deeply selective.", compatibilityTendency: "Needs intellectually and emotionally mature partners." }, financialBehavior: { saving: "Conservative, strategic, long-view saver.", spending: "Minimalist spender with selective premium choices.", riskTaking: "Low risk unless conviction is very high." }, lifeChallenges: "Trusting others and expressing emotion openly.", healthTendencies: "Sensitive to mental fatigue; needs silence, sleep, and nature exposure.", luckyElements: { colors: ["Indigo", "Silver"], days: ["Monday", "Thursday"], numbers: [7, 16, 25] }, spiritualGuidance: { deity: "Shiva for stillness, awareness, and inner strength.", practices: ["Silent meditation", "Scripture reading", "Nature solitude"] }, practicalAdvice: "Translate your inner insight into one visible output each week.", lifePatternInsight: "Late but deep success; authority grows through wisdom and specialization." },
  8: { personalityTraits: { strengths: ["Strategic", "Resilient", "Executive"], weaknesses: ["Intense", "Work-driven", "Emotionally reserved"] }, careerGuidance: { bestFields: ["Finance", "Business leadership", "Law", "Large operations"], workStyle: "High ownership, long-horizon execution, and power management.", risks: "Can become overly transactional or burnout-prone." }, loveRelationships: { behavior: "Protective and committed, but may struggle with vulnerability.", compatibilityTendency: "Best with emotionally wise partners who respect ambition." }, financialBehavior: { saving: "Strong wealth planner with asset mindset.", spending: "Calculated spender, invests in quality and leverage.", riskTaking: "High strategic risk, usually with measurable returns." }, lifeChallenges: "Balancing achievement with emotional warmth.", healthTendencies: "Stress-load in shoulders/back; benefits from regular physical reset.", luckyElements: { colors: ["Charcoal", "Deep Purple"], days: ["Saturday", "Tuesday"], numbers: [8, 17, 26] }, spiritualGuidance: { deity: "Hanuman for disciplined strength and humility.", practices: ["Strength training", "Service acts", "Weekly silence hour"] }, practicalAdvice: "Schedule relationships with the same seriousness as business priorities.", lifePatternInsight: "Life has sharp highs and lows; strongest era often appears after perseverance cycles." },
  9: { personalityTraits: { strengths: ["Compassionate", "Visionary", "Generous"], weaknesses: ["Emotional drain", "Idealism", "Difficulty letting go"] }, careerGuidance: { bestFields: ["Healing", "NGO impact", "Arts", "Mentorship"], workStyle: "Purpose-driven, empathetic, and big-picture oriented.", risks: "Can overcommit and underprice value." }, loveRelationships: { behavior: "Deep-hearted and forgiving, seeks soulful connection.", compatibilityTendency: "Drawn to partners aligned with values and meaning." }, financialBehavior: { saving: "Needs intentional savings to avoid generosity-based leakage.", spending: "Spends on causes, people, and emotional commitments.", riskTaking: "Moderate risk if aligned with purpose." }, lifeChallenges: "Closing old chapters and preserving emotional boundaries.", healthTendencies: "Needs emotional decompression to prevent fatigue.", luckyElements: { colors: ["Maroon", "Royal Blue"], days: ["Tuesday", "Thursday"], numbers: [9, 18, 27] }, spiritualGuidance: { deity: "Durga for protection, courage, and compassionate power.", practices: ["Compassion meditation", "Forgiveness rituals", "Purpose journaling"] }, practicalAdvice: "Give wisely, but define non-negotiable limits for your time and money.", lifePatternInsight: "You evolve through endings and renewal; influence expands with emotional maturity." }
};

const sections = [
  { key: "personalityTraits", title: "Personality Traits", icon: "fa-solid fa-brain", type: "list", grid: "core" },
  { key: "careerGuidance", title: "Career Guidance", icon: "fa-solid fa-briefcase", type: "career", grid: "core", featured: true },
  { key: "loveRelationships", title: "Love & Relationships", icon: "fa-solid fa-heart", type: "love", grid: "core", featured: true },
  { key: "financialBehavior", title: "Financial Behavior", icon: "fa-solid fa-sack-dollar", type: "finance", grid: "growth" },
  { key: "lifeChallenges", title: "Life Challenges", icon: "fa-solid fa-mountain", type: "text", grid: "growth" },
  { key: "healthTendencies", title: "Health Tendencies", icon: "fa-solid fa-heart-pulse", type: "text", grid: "growth" },
  { key: "luckyElements", title: "Lucky Elements", icon: "fa-solid fa-clover", type: "luck", grid: "fortune" },
  { key: "spiritualGuidance", title: "Spiritual Guidance", icon: "fa-solid fa-om", type: "spiritual", grid: "fortune" },
  { key: "practicalAdvice", title: "Practical Advice", icon: "fa-solid fa-lightbulb", type: "text", grid: "fortune" },
  { key: "lifePatternInsight", title: "Life Pattern Insight", icon: "fa-solid fa-chart-line", type: "text", grid: "fortune" }
];

/* ===========================
   NUMEROLOGY FUNCTIONS
=========================== */
function reduceToDigit(value) {
  let num = parseInt(value, 10);
  if (!num || isNaN(num) || num < 1) return 0;
  while (num > 9) {
    num = String(num).split("").reduce((sum, n) => sum + Number(n), 0);
  }
  return num;
}

function calculateMulank(dateObj) {
  return reduceToDigit(dateObj.getDate());
}

function calculateBhagyank(dateStr) {
  if (!dateStr || typeof dateStr !== "string") return 0;
  const digits = dateStr.replace(/\D/g, "").split("").map(Number);
  if (!digits.length) return 0;
  return reduceToDigit(digits.reduce((acc, n) => acc + n, 0));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderList(items) {
  return `<ul class="insight-list">${items.map((it) => `<li>${escapeHtml(it)}</li>`).join("")}</ul>`;
}

function renderContent(section, value) {
  if (section.type === "list") {
    return `
      <p><strong>Strengths:</strong> ${escapeHtml(value.strengths.join(", "))}</p>
      <p><strong>Weaknesses:</strong> ${escapeHtml(value.weaknesses.join(", "))}</p>
    `;
  }
  if (section.type === "career") {
    return renderList([
      `Best Fields: ${value.bestFields.join(", ")}`,
      `Work Style: ${value.workStyle}`,
      `Risk: ${value.risks}`
    ]);
  }
  if (section.type === "love") {
    return renderList([
      `Behavior: ${value.behavior}`,
      `Compatibility: ${value.compatibilityTendency}`
    ]);
  }
  if (section.type === "finance") {
    return renderList([
      `Saving Style: ${value.saving}`,
      `Spending Pattern: ${value.spending}`,
      `Risk Profile: ${value.riskTaking}`
    ]);
  }
  if (section.type === "luck") {
    return `
      <div class="pill-wrap">
        ${value.colors.map((c) => `<span class="pill">🎨 ${escapeHtml(c)}</span>`).join("")}
        ${value.days.map((d) => `<span class="pill">📅 ${escapeHtml(d)}</span>`).join("")}
        ${value.numbers.map((n) => `<span class="pill">✦ ${n}</span>`).join("")}
      </div>
    `;
  }
  if (section.type === "spiritual") {
    return renderList([
      `Deity Focus: ${value.deity}`,
      `Practices: ${value.practices.join(", ")}`
    ]);
  }
  return `<p>${escapeHtml(value)}</p>`;
}

function createCardMarkup(section, value, index) {
  return `
    <article class="insight-card ${section.featured ? "featured" : ""}" style="animation-delay:${index * 0.09}s">
      <div class="title-row">
        <i class="${section.icon}" aria-hidden="true"></i>
        <h4>${section.title}</h4>
      </div>
      ${renderContent(section, value)}
    </article>
  `;
}

function getIdentityLine(mulank, bhagyank) {
  const identityMap = {
    1: "Born Leader", 2: "Harmonic Diplomat", 3: "Creative Communicator",
    4: "Steady Architect", 5: "Dynamic Explorer", 6: "Heart-Centered Guardian",
    7: "Mystic Analyst", 8: "Power Strategist", 9: "Compassionate Visionary"
  };
  const suffixMap = {
    1: "with an Independent Core", 2: "with a Gentle Intuition", 3: "with a Joyful Voice",
    4: "with a Grounded Mind", 5: "with a Free Spirit", 6: "with a Nurturing Aura",
    7: "with a Reflective Soul", 8: "with an Executive Drive", 9: "with a Humanitarian Heart"
  };
  return `${identityMap[mulank]} ${suffixMap[bhagyank]}`;
}

function buildCombinedInsight(mulank, bhagyank) {
  const m = predictionJson[mulank];
  const b = predictionJson[bhagyank];
  const openers = [
    "Your chart reveals a striking dual-current:",
    "A powerful pattern emerges from your numbers:",
    "Your numerology blend suggests this life script:"
  ];
  const bridges = [
    "This means your best progress happens when",
    "You move fastest in life when",
    "Your fortune strengthens most when"
  ];
  const timingHints = [
    "expect momentum after consistency becomes your habit.",
    "major wins tend to arrive once emotional balance meets disciplined action.",
    "you unlock long-term success when purpose and execution stay aligned."
  ];
  const opener = openers[(mulank + bhagyank) % openers.length];
  const bridge = bridges[(mulank * bhagyank) % bridges.length];
  const timing = timingHints[(mulank + bhagyank + 1) % timingHints.length];
  return `${opener} Mulank ${mulank} gives you ${m.personalityTraits.strengths[0].toLowerCase()} and ${m.personalityTraits.strengths[1].toLowerCase()} energy, while Bhagyank ${bhagyank} adds a life-path of ${b.lifePatternInsight.toLowerCase()} ${bridge} your ${m.careerGuidance.workStyle.toLowerCase()} and keep relationships rooted in ${b.loveRelationships.behavior.toLowerCase()}; ${timing}`;
}

function renderShareCard(name, mulank, bhagyank, merged) {
  const displayName = name?.trim() ? name.trim() : "Mystic Seeker";
  const luckyColor = merged.luckyElements.colors[0];
  const loveStyle = merged.loveRelationships.behavior;
  const careerLine = merged.careerGuidance.workStyle;
  const todayInsight = merged.practicalAdvice;
  const identity = getIdentityLine(mulank, bhagyank);

  shareCard.innerHTML = `
    <div class="share-top">
      <p class="eyebrow">Numerology Aura Card</p>
      <h4>${escapeHtml(displayName)}</h4>
      <p class="identity">${escapeHtml(identity)}</p>
    </div>
    <div class="share-numbers">
      <div class="share-badge">
        <p>Mulank</p>
        <p class="value">${mulank}</p>
      </div>
      <div class="share-badge">
        <p>Bhagyank</p>
        <p class="value">${bhagyank}</p>
      </div>
    </div>
    <div class="share-strip">
      <p class="label">Lucky Color</p>
      <p class="line">${escapeHtml(luckyColor)}</p>
    </div>
    <div class="share-strip">
      <p class="label">Love Style</p>
      <p class="line">${escapeHtml(loveStyle)}</p>
    </div>
    <div class="share-strip">
      <p class="label">Career Direction</p>
      <p class="line">${escapeHtml(careerLine)}</p>
    </div>
    <div class="today-insight">
      <p><strong>Today's Insight:</strong> ${escapeHtml(todayInsight)}</p>
    </div>
    <p class="watermark">Made with ♥ by Vipul Meshram · KundaliMan v2.0.0</p>
  `;
}

function mergeProfiles(mulank, bhagyank) {
  const m = predictionJson[mulank];
  const b = predictionJson[bhagyank];
  return {
    personalityTraits: {
      strengths: [...m.personalityTraits.strengths, ...b.personalityTraits.strengths.slice(0, 1)],
      weaknesses: [...m.personalityTraits.weaknesses, ...b.personalityTraits.weaknesses.slice(0, 1)]
    },
    careerGuidance: {
      bestFields: [...new Set([...m.careerGuidance.bestFields, ...b.careerGuidance.bestFields.slice(0, 2)])],
      workStyle: `${m.careerGuidance.workStyle} ${b.careerGuidance.workStyle}`,
      risks: `${m.careerGuidance.risks} ${b.careerGuidance.risks}`
    },
    loveRelationships: {
      behavior: `${m.loveRelationships.behavior} ${b.loveRelationships.behavior}`,
      compatibilityTendency: `${m.loveRelationships.compatibilityTendency} ${b.loveRelationships.compatibilityTendency}`
    },
    financialBehavior: {
      saving: `${m.financialBehavior.saving} ${b.financialBehavior.saving}`,
      spending: `${m.financialBehavior.spending} ${b.financialBehavior.spending}`,
      riskTaking: `${m.financialBehavior.riskTaking} ${b.financialBehavior.riskTaking}`
    },
    lifeChallenges: `${m.lifeChallenges} ${b.lifeChallenges}`,
    healthTendencies: `${m.healthTendencies} ${b.healthTendencies}`,
    luckyElements: {
      colors: [...new Set([...m.luckyElements.colors, ...b.luckyElements.colors])],
      days: [...new Set([...m.luckyElements.days, ...b.luckyElements.days])],
      numbers: [...new Set([...m.luckyElements.numbers, ...b.luckyElements.numbers])]
    },
    spiritualGuidance: {
      deity: `${m.spiritualGuidance.deity} Also honor ${b.spiritualGuidance.deity}`,
      practices: [...new Set([...m.spiritualGuidance.practices, ...b.spiritualGuidance.practices])]
    },
    practicalAdvice: `${m.practicalAdvice} ${b.practicalAdvice}`,
    lifePatternInsight: `${m.lifePatternInsight} ${b.lifePatternInsight}`
  };
}

function renderPredictions(name, mulank, bhagyank) {
  const merged = mergeProfiles(mulank, bhagyank);
  coreGrid.innerHTML = "";
  growthGrid.innerHTML = "";
  fortuneGrid.innerHTML = "";

  sections.forEach((section, index) => {
    const markup = createCardMarkup(section, merged[section.key], index);
    if (section.grid === "core") coreGrid.insertAdjacentHTML("beforeend", markup);
    if (section.grid === "growth") growthGrid.insertAdjacentHTML("beforeend", markup);
    if (section.grid === "fortune") fortuneGrid.insertAdjacentHTML("beforeend", markup);
  });

  numberSummary.textContent = `✦ Mulank ${mulank}  ·  Bhagyank ${bhagyank} ✦`;
  combinedCard.innerHTML = `
    <h3><i class="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i> Combined Insight Engine</h3>
    <p>${escapeHtml(buildCombinedInsight(mulank, bhagyank))}</p>
  `;
  renderShareCard(name, mulank, bhagyank, merged);
}

/* ===========================
   ANIMATED LOADER STEPS
=========================== */
function runLoaderSteps() {
  const steps = document.querySelectorAll(".step");
  steps.forEach(s => s.classList.remove("active"));
  steps[0].classList.add("active");
  setTimeout(() => {
    steps[0].classList.remove("active");
    steps[1].classList.add("active");
  }, 500);
  setTimeout(() => {
    steps[1].classList.remove("active");
    steps[2].classList.add("active");
  }, 950);
}

/* ===========================
   PANEL TRANSITIONS
=========================== */
function swapPanels(fromEl, toEl) {
  fromEl.classList.add("fade-out");
  setTimeout(() => {
    fromEl.classList.add("hidden");
    fromEl.classList.remove("fade-out");
    toEl.classList.remove("hidden");
    toEl.classList.add("fade-in");
    setTimeout(() => toEl.classList.remove("fade-in"), 450);
  }, 280);
}

/* ===========================
   FORM SUBMIT
=========================== */
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const dob = dobInput.value;
  if (!dob) return;
  const dobDate = new Date(dob);
  if (Number.isNaN(dobDate.getTime())) return;
  const name = nameInput.value || "Mystic Seeker";
  swapPanels(inputSection, loaderSection);
  runLoaderSteps();

  setTimeout(() => {
    const mulank = calculateMulank(dobDate);
    const bhagyank = calculateBhagyank(dob);
    renderPredictions(name, mulank, bhagyank);
    swapPanels(loaderSection, resultSection);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 1300);
});

/* ===========================
   DOWNLOAD CARD
=========================== */
downloadBtn.addEventListener("click", async () => {
  downloadBtn.disabled = true;
  downloadBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Preparing PNG...`;
  try {
    const canvas = await html2canvas(shareCard, {
      scale: 2,
      backgroundColor: null,
      useCORS: true
    });
    const link = document.createElement("a");
    link.download = "kundali-aura-card.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  } finally {
    downloadBtn.disabled = false;
    downloadBtn.innerHTML = `<i class="fa-solid fa-download"></i> Download My Card`;
  }
});

/* ===========================
   NAAMANK (NAME NUMBER)
=========================== */
const chaldeanMap = {
  A:1,I:1,J:1,Q:1,Y:1,
  B:2,K:2,R:2,
  C:3,G:3,L:3,S:3,
  D:4,M:4,T:4,
  E:5,H:5,N:5,X:5,
  U:6,V:6,W:6,
  O:7,Z:7,
  F:8,P:8
};

const naamankInsights = {
  1:"Born to lead — your name carries pioneering, independent solar energy.",
  2:"Your name vibrates with harmony, intuition, and quiet diplomatic power.",
  3:"Creative expression and joyful communication flow naturally from your name.",
  4:"Your name grounds you — stability, discipline, and structure are your gifts.",
  5:"Freedom, adaptability, and magnetic charm are encoded in your name.",
  6:"Your name radiates nurturing warmth, beauty, and a deep sense of duty.",
  7:"Wisdom, depth, and spiritual insight are woven into your name's frequency.",
  8:"Ambition and executive power pulse through your name — authority awaits.",
  9:"Your name carries compassion and visionary humanitarian energy."
};

function getNaamank(name) {
  const clean = (name || "").toUpperCase().replace(/[^A-Z]/g, "");
  if (!clean) return { naamank: null, insight: "Please enter a valid name with letters." };
  const total = clean.split("").reduce((sum, ch) => sum + (chaldeanMap[ch] || 0), 0);
  const naamank = reduceToDigit(total) || 9;
  return { naamank, insight: naamankInsights[naamank] };
}

const naamankForm = document.getElementById("naamankForm");
naamankForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("naamankInput").value.trim();
  if (!name) return;
  const { naamank, insight } = getNaamank(name);
  document.getElementById("naamankNum").textContent = naamank ?? "—";
  document.getElementById("naamankInsight").textContent = insight;
  document.getElementById("naamankResult").classList.remove("hidden");
  document.getElementById("naamankResult").scrollIntoView({ behavior: "smooth", block: "start" });
});

document.getElementById("naamankResetBtn").addEventListener("click", () => {
  document.getElementById("naamankForm").reset();
  document.getElementById("naamankResult").classList.add("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});


// Vedic number relation table: relations[a][b] = relation of a towards b
const compatRelations = {
  1:{1:"FRIEND",2:"NEUTRAL",3:"FRIEND",4:"NEUTRAL",5:"FRIEND",6:"ENEMY",7:"FRIEND",8:"NEUTRAL",9:"FRIEND"},
  2:{1:"NEUTRAL",2:"FRIEND",3:"FRIEND",4:"FRIEND",5:"NEUTRAL",6:"FRIEND",7:"FRIEND",8:"ENEMY",9:"FRIEND"},
  3:{1:"FRIEND",2:"FRIEND",3:"FRIEND",4:"NEUTRAL",5:"FRIEND",6:"FRIEND",7:"NEUTRAL",8:"FRIEND",9:"FRIEND"},
  4:{1:"NEUTRAL",2:"FRIEND",3:"NEUTRAL",4:"FRIEND",5:"FRIEND",6:"NEUTRAL",7:"FRIEND",8:"FRIEND",9:"ENEMY"},
  5:{1:"FRIEND",2:"NEUTRAL",3:"FRIEND",4:"FRIEND",5:"FRIEND",6:"NEUTRAL",7:"NEUTRAL",8:"FRIEND",9:"NEUTRAL"},
  6:{1:"ENEMY",2:"FRIEND",3:"FRIEND",4:"NEUTRAL",5:"NEUTRAL",6:"FRIEND",7:"NEUTRAL",8:"FRIEND",9:"FRIEND"},
  7:{1:"FRIEND",2:"FRIEND",3:"NEUTRAL",4:"FRIEND",5:"NEUTRAL",6:"NEUTRAL",7:"FRIEND",8:"NEUTRAL",9:"FRIEND"},
  8:{1:"NEUTRAL",2:"ENEMY",3:"FRIEND",4:"FRIEND",5:"FRIEND",6:"FRIEND",7:"NEUTRAL",8:"FRIEND",9:"NEUTRAL"},
  9:{1:"FRIEND",2:"FRIEND",3:"FRIEND",4:"ENEMY",5:"NEUTRAL",6:"FRIEND",7:"FRIEND",8:"NEUTRAL",9:"FRIEND"}
};

const relationScore = {FRIEND:40,NEUTRAL:25,ENEMY:10,HIGH:0,DEPENDS:20,KARMIC:30,"NO ENEMY":50};

function getLoveCompatibility(dob1, dob2) {
  const d1 = new Date(dob1), d2 = new Date(dob2);
  if (isNaN(d1) || isNaN(d2)) return null;
  const m1 = calculateMulank(d1), b1 = calculateBhagyank(dob1);
  const m2 = calculateMulank(d2), b2 = calculateBhagyank(dob2);

  const relAtoB = compatRelations[m1][m2];
  const relBtoA = compatRelations[m2][m1];
  const moolankScore = ((relationScore[relAtoB] || 25) + (relationScore[relBtoA] || 25)) / 2;

  let bhagyankBonus = 0;
  if (b1 === b2) bhagyankBonus = 20;
  else if (compatRelations[b1][b2] === "FRIEND" && compatRelations[b2][b1] === "FRIEND") bhagyankBonus = 10;

  const raw = moolankScore * 0.7 + bhagyankBonus * 0.3 + bhagyankBonus;
  const score = Math.min(100, Math.max(0, Math.round(raw)));

  const scoreLabel = score >= 80 ? "Soulmate Energy" : score >= 65 ? "Strong Bond" : score >= 50 ? "Compatible" : score >= 35 ? "Work Required" : "Challenging";
  const relLabel = `${relAtoB} ↔ ${relBtoA}`;

  const summaries = {
    "FRIEND↔FRIEND": "Both numbers see each other as allies — this pairing carries natural warmth and trust.",
    "FRIEND↔NEUTRAL": "One side feels more drawn in; balance grows when both invest equally.",
    "NEUTRAL↔FRIEND": "Steady mutual respect forms the base; affection deepens with time.",
    "NEUTRAL↔NEUTRAL": "A calm, practical connection — not fiery, but enduringly stable.",
    "FRIEND↔ENEMY": "Magnetic attraction exists, yet internal tension needs conscious management.",
    "ENEMY↔FRIEND": "Strong pull with underlying friction — awareness transforms this into growth.",
    "ENEMY↔ENEMY": "Both numbers clash at the core; deep patience and shared goals are essential.",
  };
  const summaryKey = `${relAtoB}↔${relBtoA}`;
  const summary = summaries[summaryKey] || `Mulank ${m1} and ${m2} carry a ${relLabel} dynamic — nuance and communication define this bond.`;

  const strengthPool = [
    "Shared drive creates momentum when goals align.",
    "Emotional intuition bridges gaps between your personalities.",
    "Natural respect forms a resilient foundation.",
    "Complementary energies make you stronger as a team.",
    "Deep curiosity about each other keeps the bond alive."
  ];
  const challengePool = [
    "Ego clashes can arise when both want to lead.",
    "Different emotional paces may cause timing mismatches.",
    "One may feel underappreciated without clear expression.",
    "Financial priorities may diverge over time.",
    "Independence needs may conflict with closeness."
  ];
  const tipPool = [
    "Schedule a weekly check-in to stay emotionally aligned.",
    "Celebrate small wins together to reinforce the bond.",
    "Respect each other's need for personal space.",
    "Communicate love languages explicitly — don't assume.",
    "Revisit shared goals every few months to stay in sync."
  ];

  const seed = m1 + m2 + b1 + b2;
  return {
    score, scoreLabel, relLabel, summary, m1, m2, b1, b2,
    strengths: [strengthPool[seed % strengthPool.length], strengthPool[(seed + 2) % strengthPool.length]],
    challenges: [challengePool[seed % challengePool.length], challengePool[(seed + 3) % challengePool.length]],
    tips: [tipPool[seed % tipPool.length], tipPool[(seed + 1) % tipPool.length], tipPool[(seed + 4) % tipPool.length]]
  };
}

function renderCompatResult(nameA, nameB, result) {
  const nA = nameA?.trim() || "Person A";
  const nB = nameB?.trim() || "Person B";
  const colorMap = { 80: "#3de8bc", 65: "#7b91ff", 50: "#ffb347", 35: "#d56bff", 0: "#ff6b6b" };
  const color = Object.keys(colorMap).reverse().find(k => result.score >= +k) || "0";
  const accent = colorMap[color];
  const circumference = 2 * Math.PI * 52;
  const dash = (result.score / 100) * circumference;

  document.getElementById("compatScoreRing").innerHTML = `
    <div class="score-ring-wrap">
      <svg width="130" height="130" viewBox="0 0 130 130">
        <circle cx="65" cy="65" r="52" fill="none" stroke="var(--card-border)" stroke-width="10"/>
        <circle cx="65" cy="65" r="52" fill="none" stroke="${accent}" stroke-width="10"
          stroke-dasharray="${dash} ${circumference}" stroke-dashoffset="${circumference / 4}"
          stroke-linecap="round" style="transition:stroke-dasharray 1s ease"/>
      </svg>
      <div class="score-center">
        <span class="score-num" style="color:${accent}">${result.score}</span>
        <span class="score-pct">/ 100</span>
      </div>
    </div>
    <div class="score-label" style="color:${accent}">${result.scoreLabel}</div>
    <div class="score-names">${escapeHtml(nA)} <i class="fa-solid fa-heart" style="color:${accent};font-size:.8em"></i> ${escapeHtml(nB)}</div>
    <div class="score-nums-row">
      <span class="score-num-chip">Mulank ${result.m1} ↔ ${result.m2}</span>
      <span class="score-num-chip">Bhagyank ${result.b1} ↔ ${result.b2}</span>
      <span class="score-num-chip">${result.relLabel}</span>
    </div>
  `;

  document.getElementById("compatCards").innerHTML = `
    <div class="compat-card">
      <div class="title-row"><i class="fa-solid fa-comment-dots"></i><h4>Summary</h4></div>
      <p>${escapeHtml(result.summary)}</p>
    </div>
    <div class="compat-card">
      <div class="title-row"><i class="fa-solid fa-star" style="color:#3de8bc"></i><h4>Strengths</h4></div>
      ${renderList(result.strengths)}
    </div>
    <div class="compat-card">
      <div class="title-row"><i class="fa-solid fa-triangle-exclamation" style="color:#ffb347"></i><h4>Challenges</h4></div>
      ${renderList(result.challenges)}
    </div>
    <div class="compat-card">
      <div class="title-row"><i class="fa-solid fa-lightbulb" style="color:#d56bff"></i><h4>Tips for Growth</h4></div>
      ${renderList(result.tips)}
    </div>
  `;

  document.getElementById("compatResult").classList.remove("hidden");
}

const compatForm = document.getElementById("compatForm");
compatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const dob1 = document.getElementById("dobA").value;
  const dob2 = document.getElementById("dobB").value;
  if (!dob1 || !dob2) return;
  const result = getLoveCompatibility(dob1, dob2);
  if (!result) return;
  renderCompatResult(document.getElementById("nameA").value, document.getElementById("nameB").value, result);
  document.getElementById("compatResult").scrollIntoView({ behavior: "smooth", block: "start" });
});

document.getElementById("compatResetBtn").addEventListener("click", () => {
  document.getElementById("compatForm").reset();
  document.getElementById("compatResult").classList.add("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});


function doReset() {
  coreGrid.innerHTML = "";
  growthGrid.innerHTML = "";
  fortuneGrid.innerHTML = "";
  combinedCard.innerHTML = "";
  shareCard.innerHTML = "";
  numberSummary.textContent = "";
  nameInput.value = "";
  dobInput.value = "";
  swapPanels(resultSection, inputSection);
}

resetBtn.addEventListener("click", doReset);
resetBtnTop.addEventListener("click", doReset);
