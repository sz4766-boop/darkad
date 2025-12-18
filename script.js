function $(sel) {
  return document.querySelector(sel);
}

function applyDayOfWeek() {
  const el = $("#dayMessage");
  if (!el) return;

  const day = new Date().getDay(); // 0=Sun ... 6=Sat
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const quotes = [
    "Rest is not stopping—it's refueling for what's next.",
    "Start today. Small beginnings create real momentum.",
    "Consistency beats intensity when it comes to progress.",
    "Halfway is still forward—keep going.",
    "Focus on what you can control, and you’ll grow stronger.",
    "Every step you repeat becomes part of your future.",
    "Celebrate yourself—you’ve earned it."
  ];

  let accent = "#0f766e";
  switch (day) {
    case 0: accent = "#16a34a"; break;
    case 1: accent = "#0f766e"; break;
    case 2: accent = "#f59e0b"; break;
    case 3: accent = "#a855f7"; break;
    case 4: accent = "#2563eb"; break;
    case 5: accent = "#ef4444"; break;
    case 6: accent = "#06b6d4"; break;
    default: accent = "#0f766e";
  }

  el.textContent = `${dayNames[day]} — ${quotes[day]}`;
  document.documentElement.style.setProperty("--accent", accent);
}

function updateLineHeight() {
  const slider = $("#lineHeightSlider");
  const out = $("#lineHeightValue");
  const target = $("#readingTarget");
  if (!slider || !out || !target) return;

  const v = slider.value;
  target.style.lineHeight = v;
  out.textContent = v;
}

function updateBoundaryExplorer() {
  const select = $("#boundarySelect");
  if (!select) return;

  const title = $("#boundaryTitle");
  const text = $("#boundaryText");
  const bullets = $("#boundaryBullets");
  const img = $("#boundaryImg");
  const caption = $("#boundaryCaption");

  const value = select.value;

  const map = {
    dungeon: {
      title: "Client boundary",
      text:
        "Treat the client as untrusted. Assume memory, packets, and rendering hooks can be modified. Validate critical state server-side and minimize client authority.",
      bullets: [
        "Server-authoritative movement / hit validation",
        "Signed/hashed integrity checks where appropriate",
        "Telemetry for anomaly detection (rate limits, impossible states)"
      ],
      img: { src: "images/dnd1.png", srcset: "images/dnd1.png 1x, images/1@2x.png 2x" },
      caption: "Wizard in dungeon."
    },
    combat: {
      title: "PVP",
      text:
        "Assume packets can be intercepted, replayed, delayed, or reordered. Use server-issued identifiers, short-lived tokens, and validate transitions using a state machine.",
      bullets: [
        "Nonces + sequence numbers to stop replay",
        "Rate limiting + backpressure on critical endpoints",
        "State-machine validation for cooldowns and actions"
      ],
      img: { src: "images/dnd2.png", srcset: "images/dnd2.png 1x, images/2@2x.png 2x" },
      caption: "Combat!!!"
    },
    loot: {
      title: "tab",
      text:
        "Your server is trusted but still must be hardened. Reduce attack surface, validate inputs, and implement logging/alerting. Plan for incident response and patch cycles.",
      bullets: [
        "Input validation and strict schemas",
        "Least-privilege services + secrets hygiene",
        "Monitoring, alerting, and incident playbooks"
      ],
      img: { src: "images/dnd3.png", srcset: "images/dnd3.png 1x, images/3@2x.png 2x" },
      caption: "Inventory."
    }
  };

  const data = map[value] || map.client;

  if (title) title.textContent = data.title;
  if (text) text.textContent = data.text;

  if (bullets) {
    bullets.innerHTML = "";
    data.bullets.forEach((b) => {
      const li = document.createElement("li");
      li.textContent = b;
      bullets.appendChild(li);
    });
  }

  if (img) {
    img.src = data.img.src;
    img.setAttribute("srcset", data.img.srcset);
  }
  if (caption) caption.textContent = data.caption;
}

function toggleFocusMode() {
  const btn = $("#focusBtn");
  const isOn = document.body.classList.toggle("focus-mode");
  if (btn) btn.setAttribute("aria-pressed", String(isOn));
}

function toggleMitigations() {
  const items = document.querySelectorAll(".mitigation");
  if (!items.length) return;

  items.forEach((p) => {
    const isHidden = p.hasAttribute("hidden");
    if (isHidden) p.removeAttribute("hidden");
    else p.setAttribute("hidden", "");
  });
}

function updateCharCount() {
  const textarea = $("#message");
  const counter = $("#charCount");
  if (!textarea || !counter) return;

  counter.textContent = String(textarea.value.length);
}

function handleContactSubmit(e) {
  e.preventDefault();
  const status = $("#formStatus");
  if (status) status.textContent = "Thanks! (Demo only) Your message was captured locally.";
}

function setYear() {
  const y = $("#year");
  if (y) y.textContent = String(new Date().getFullYear());
}

function init() {
  applyDayOfWeek();
  setYear();

  const slider = $("#lineHeightSlider");
  if (slider) slider.addEventListener("input", updateLineHeight);
  updateLineHeight();

  const focusBtn = $("#focusBtn");
  if (focusBtn) focusBtn.addEventListener("click", toggleFocusMode);

  const boundarySelect = $("#boundarySelect");
  if (boundarySelect) {
    boundarySelect.addEventListener("change", updateBoundaryExplorer);
    updateBoundaryExplorer();
  }

  const toggleBtn = $("#toggleMitigations");
  if (toggleBtn) toggleBtn.addEventListener("click", toggleMitigations);

  const textarea = $("#message");
  if (textarea) textarea.addEventListener("input", updateCharCount);
  updateCharCount();

  const form = $("#contactForm");
  if (form) {
    const action = form.getAttribute("action");
    if (!action) form.addEventListener("submit", handleContactSubmit);
  }
}

document.addEventListener("DOMContentLoaded", init);
