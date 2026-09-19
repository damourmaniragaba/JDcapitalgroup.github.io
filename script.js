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
  grid.innerHTML = SERVICES.map((s, i) => `
    <div class="service-card reveal" style="transition-delay:${i * 60}ms">
      <span class="idx">${s.idx}</span>
      <h3>${s.title}</h3>
      <p>${s.desc}</p>
    </div>
  `).join("");
}

function renderAssets() {
  const grid = document.getElementById("asset-grid");
  grid.innerHTML = ASSET_TYPES.map((a, i) => `
    <div class="asset-card reveal" style="transition-delay:${(i % 5) * 60}ms">
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
    <span class="ticker-item">${t.label}: <b data-count="${t.value}">${t.value}</b></span>
  `).join("");
}

function renderInsights() {
  const grid = document.getElementById("insight-grid");
  grid.innerHTML = INSIGHTS.map((i, idx) => `
    <article class="insight-card reveal" style="transition-delay:${idx * 80}ms">
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
  wrap.innerHTML = PRINCIPLES.map((p, i) => `
    <div class="principle reveal" style="transition-delay:${i * 70}ms">
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

// ============================================================
// MOTION: scroll reveal, header state, scrollspy, count-up,
// back-to-top. All skipped/short-circuited for reduced motion.
// ============================================================

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// --- scroll reveal ---
const revealEls = document.querySelectorAll(".reveal");
if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealEls.forEach(el => el.classList.add("in-view"));
} else {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  revealEls.forEach(el => revealObserver.observe(el));
}

// --- sticky header shadow on scroll ---
const siteHeader = document.getElementById("site-header");
let lastScrollState = false;
function updateHeaderState() {
  const scrolled = window.scrollY > 8;
  if (scrolled !== lastScrollState) {
    siteHeader.classList.toggle("scrolled", scrolled);
    lastScrollState = scrolled;
  }
}
updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

// --- scrollspy: highlight nav link for section in view ---
const spySections = ["services", "assets", "insights", "approach", "contact"]
  .map(id => document.getElementById(id))
  .filter(Boolean);
const spyLinks = Array.from(navLinks.querySelectorAll('a[href^="#"]'));

if ("IntersectionObserver" in window && spySections.length) {
  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      spyLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
  spySections.forEach(section => spyObserver.observe(section));
}

// --- animated count-up for numeric ticker stats ---
function animateCount(el) {
  const raw = el.dataset.count;
  if (!/^\d+$/.test(raw)) return; // skip non-numeric values like "Kigali"
  const target = parseInt(raw, 10);
  const digits = raw.length;
  const duration = 1100;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * eased);
    el.textContent = String(value).padStart(digits, "0");
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const tickerEl = document.getElementById("ticker-inner");
if (tickerEl) {
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    // leave static values as rendered
  } else {
    const tickerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          tickerEl.querySelectorAll("[data-count]").forEach(animateCount);
          tickerObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    tickerObserver.observe(tickerEl);
  }
}

// --- back to top ---
const backToTop = document.getElementById("back-to-top");
if (backToTop) {
  function updateBackToTop() {
    backToTop.classList.toggle("show", window.scrollY > 500);
  }
  updateBackToTop();
  window.addEventListener("scroll", updateBackToTop, { passive: true });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });
}
