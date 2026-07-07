// ============================================================
// CONTENT DATA
// Edit these arrays to update site copy, no HTML editing needed.
// ============================================================

const SERVICES = [
  { idx: "01", title: "Capital Markets & Investment Sales", desc: "Sourcing, structuring and closing acquisitions, dispositions and recapitalizations for local and foreign capital." },
  { idx: "02", title: "Leasing & Tenant Representation", desc: "Landlord leasing strategy plus site selection and negotiation support for occupiers, across every asset type." },
  { idx: "03", title: "Valuation & Advisory", desc: "Independent valuations for lending, financial reporting, dispute resolution and transaction decisions." },
  { idx: "04", title: "Property & Asset Management", desc: "Day to day operations, facilities oversight and value add strategy that protects portfolio performance." },
  { idx: "05", title: "Research & Market Intelligence", desc: "Data led insight into Rwanda's commercial property market, built to support every decision above it." },
];

const ASSET_TYPES = [
  { n: "01", name: "Office" },
  { n: "02", name: "Retail" },
  { n: "03", name: "Industrial & Logistics" },
  { n: "04", name: "Multifamily & Residential" },
  { n: "05", name: "Hospitality" },
  { n: "06", name: "Mixed-Use" },
  { n: "07", name: "Land & Development" },
  { n: "08", name: "Healthcare & Life Sciences" },
  { n: "09", name: "Data Centers" },
  { n: "10", name: "Self-Storage" },
];

const TICKER = [
  { label: "Service lines", value: "05" },
  { label: "Asset types covered", value: "10" },
  { label: "Headquarters", value: "Kigali" },
  { label: "Coverage", value: "Rwanda-wide" },
  { label: "Founded", value: "2026" },
];

const INSIGHTS = [
  { eyebrow: "Capital Markets", title: "Where investor demand is heading in Kigali's office market", desc: "A look at how institutional and private capital are approaching Class A office assets this cycle." },
  { eyebrow: "Retail", title: "Kigali's retail pipeline and what it means for tenants", desc: "New mixed-use and retail developments are reshaping lease terms and anchor tenant strategy." },
  { eyebrow: "Industrial", title: "Logistics demand along Rwanda's trade corridors", desc: "Warehousing and distribution assets are drawing fresh attention as trade volumes grow." },
];

const PRINCIPLES = [
  { idx: "01", title: "Local market, institutional standard", desc: "Rwanda specific expertise delivered with the process discipline of global advisory practice." },
  { idx: "02", title: "One point of accountability", desc: "A single advisory team follows your asset from acquisition through leasing to ongoing management." },
  { idx: "03", title: "Independent advice", desc: "Valuation and advisory work stays independent of transaction incentives, so recommendations stay unbiased." },
  { idx: "04", title: "Built on research", desc: "Every recommendation is grounded in current data on Rwanda's commercial property market." },
];

// ============================================================
// RENDER
// ============================================================

function renderServices() {
  const grid = document.getElementById("service-grid");
  grid.innerHTML = SERVICES.map(s => `
    <div class="service-card">
      <span class="idx">${s.idx}</span>
      <h3>${s.title}</h3>
      <p>${s.desc}</p>
    </div>
  `).join("");
}

function renderAssets() {
  const grid = document.getElementById("asset-grid");
  grid.innerHTML = ASSET_TYPES.map(a => `
    <div class="asset-card">
      <span class="n">${a.n}</span>
      <h4>${a.name}</h4>
    </div>
  `).join("");

  const chips = document.getElementById("hero-chips");
  chips.innerHTML = ASSET_TYPES.map(a => `<span class="chip">${a.name}</span>`).join("");
}

function renderTicker() {
  const ticker = document.getElementById("ticker-inner");
  ticker.innerHTML = TICKER.map(t => `
    <span class="ticker-item">${t.label}: <b>${t.value}</b></span>
  `).join("");
}

function renderInsights() {
  const grid = document.getElementById("insight-grid");
  grid.innerHTML = INSIGHTS.map(i => `
    <article class="insight-card">
      <div class="insight-thumb"></div>
      <div class="insight-body">
        <span class="eyebrow">${i.eyebrow}</span>
        <h3>${i.title}</h3>
        <p>${i.desc}</p>
      </div>
    </article>
  `).join("");
}

function renderPrinciples() {
  const wrap = document.getElementById("principles");
  wrap.innerHTML = PRINCIPLES.map(p => `
    <div class="principle">
      <span class="idx">${p.idx}</span>
      <div><h4>${p.title}</h4><p>${p.desc}</p></div>
    </div>
  `).join("");
}

renderServices();
renderAssets();
renderTicker();
renderInsights();
renderPrinciples();

// ============================================================
// MOBILE NAV TOGGLE
// ============================================================

const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// ============================================================
// CONTACT FORM
// Sends directly to damourmaniragaba1@gmail.com via FormSubmit,
// no backend required, works on static hosting like GitHub Pages.
// NOTE: the first submission after deploying triggers a one-time
// confirmation email from FormSubmit to that inbox. It must be
// confirmed before real submissions start arriving.
// ============================================================

const form = document.getElementById("inquiry-form");
const successMsg = document.getElementById("form-success");
const errorMsg = document.getElementById("form-error");
const submitBtn = document.getElementById("submit-btn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  successMsg.classList.remove("show");
  errorMsg.classList.remove("show");
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  const payload = {
    name: form.name.value,
    email: form.email.value,
    service_requested: form.service.value,
    message: form.message.value,
    _subject: "New inquiry, JD Capital Group website",
    _template: "table",
  };

  try {
    const res = await fetch("https://formsubmit.co/ajax/damourmaniragaba1@gmail.com", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Request failed");
    form.reset();
    successMsg.classList.add("show");
  } catch (err) {
    errorMsg.classList.add("show");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Send inquiry";
  }
});
