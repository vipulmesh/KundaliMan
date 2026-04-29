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
  { key: "spiritualGuidance", title: "Spiritual Guidance", icon: "fa-solid fa-star-and-crescent", type: "spiritual", grid: "fortune" },
  { key: "practicalAdvice", title: "Practical Advice", icon: "fa-solid fa-lightbulb", type: "text", grid: "fortune" },
  { key: "lifePatternInsight", title: "Life Pattern Insight", icon: "fa-solid fa-chart-line", type: "text", grid: "fortune" }
];

function reduceToDigit(value) {
  let num = value;
  while (num > 9) {
    num = String(num).split("").reduce((sum, n) => sum + Number(n), 0);
  }
  return num;
}

function calculateMulank(dateObj) {
  return reduceToDigit(dateObj.getDate());
}

function calculateBhagyank(dateStr) {
  const digits = dateStr.replaceAll("-", "").split("").map(Number);
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
        ${value.colors.map((c) => `<span class="pill">Color: ${escapeHtml(c)}</span>`).join("")}
        ${value.days.map((d) => `<span class="pill">Day: ${escapeHtml(d)}</span>`).join("")}
        ${value.numbers.map((n) => `<span class="pill">No: ${n}</span>`).join("")}
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
    <article class="insight-card ${section.featured ? "featured" : ""}" style="animation-delay:${index * 0.08}s">
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
    1: "Born Leader",
    2: "Harmonic Diplomat",
    3: "Creative Communicator",
    4: "Steady Architect",
    5: "Dynamic Explorer",
    6: "Heart-Centered Guardian",
    7: "Mystic Analyst",
    8: "Power Strategist",
    9: "Compassionate Visionary"
  };
  const suffixMap = {
    1: "with an Independent Core",
    2: "with a Gentle Intuition",
    3: "with a Joyful Voice",
    4: "with a Grounded Mind",
    5: "with a Free Spirit",
    6: "with a Nurturing Aura",
    7: "with a Reflective Soul",
    8: "with an Executive Drive",
    9: "with a Humanitarian Heart"
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
    <p class="watermark">Powered BY VIPUL SOFTWARES</p>
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

  numberSummary.textContent = `Mulank ${mulank} | Bhagyank ${bhagyank}`;
  combinedCard.innerHTML = `
    <h3><i class="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i> Combined Insight Engine</h3>
    <p>${escapeHtml(buildCombinedInsight(mulank, bhagyank))}</p>
  `;
  renderShareCard(name, mulank, bhagyank, merged);
}

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

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const dob = dobInput.value;
  if (!dob) return;

  const dobDate = new Date(dob);
  if (Number.isNaN(dobDate.getTime())) return;

  const name = nameInput.value || "Mystic Seeker";
  swapPanels(inputSection, loaderSection);

  setTimeout(() => {
    const mulank = calculateMulank(dobDate);
    const bhagyank = calculateBhagyank(dob);
    renderPredictions(name, mulank, bhagyank);
    swapPanels(loaderSection, resultSection);
  }, 1200);
});

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
    link.download = "numerology-aura-card.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  } finally {
    downloadBtn.disabled = false;
    downloadBtn.innerHTML = `<i class="fa-solid fa-download"></i> Download My Card`;
  }
});

resetBtn.addEventListener("click", () => {
  coreGrid.innerHTML = "";
  growthGrid.innerHTML = "";
  fortuneGrid.innerHTML = "";
  combinedCard.innerHTML = "";
  shareCard.innerHTML = "";
  numberSummary.textContent = "";
  nameInput.value = "";
  dobInput.value = "";
  swapPanels(resultSection, inputSection);
});
