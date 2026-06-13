import { alias, coordinate, journey, pin, reference, workbenchLayers } from "./data.js";

const root = document.getElementById("root");
const logoSrc =
  "../../../design-references/ChatGPT%20Image%20Jun%2013,%202026,%2010_03_39%20AM%20(1).png";
let currentOpacity = 0.9;

function buildAtlasPin(data) {
  const lines = ["ContextAtlas Pin", `Coordinate: ${data.coordinate}`];

  if (data.alias) lines.push(`Alias: ${data.alias}`);
  if (data.role) lines.push(`Role: ${data.role}`);
  if (data.journeyStage) lines.push(`Journey stage: ${data.journeyStage}`);
  if (data.route) lines.push(`Route: ${data.route}`);
  if (data.status) lines.push(`Status: ${data.status}`);
  if (data.label) lines.push(`Label: ${data.label}`);
  if (data.suggestedScope?.length) {
    lines.push(`Suggested scope: ${data.suggestedScope.join(", ")}`);
  }

  return lines.join("\n");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderJourneyHeader(opacity) {
  const activeIndex = journey.steps.findIndex((step) => step.id === journey.currentStepId);
  const steps = journey.steps
    .map((step, index) => {
      const state = index < activeIndex ? "done" : index === activeIndex ? "active" : "upcoming";
      const check =
        state === "active"
          ? '<svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true" focusable="false" class="ca-journey__step-check"><path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" /></svg>'
          : "";

      return `
        <li class="ca-journey__step is-${state}" ${state === "active" ? 'aria-current="step"' : ""}>
          ${check}
          <span class="ca-journey__step-label">${escapeHtml(step.label)}</span>
        </li>
      `;
    })
    .join("");

  return `
    <header class="ca-journey" style="--atlas-opacity: ${opacity}" data-context-coordinate="${escapeHtml(journey.coordinate)}" aria-label="Journey position for ${escapeHtml(journey.alias)}">
      <div class="ca-journey__identity">
        <span class="ca-journey__logo" aria-hidden="true">
          <img src="${logoSrc}" alt="" />
        </span>
        <span class="ca-journey__coords">
          <span class="ca-journey__coordinate">${escapeHtml(journey.coordinate)}</span>
          <span class="ca-journey__alias">${escapeHtml(journey.alias)}</span>
        </span>
      </div>

      <div class="ca-journey__center">
        <ol class="ca-journey__steps" aria-label="Journey path">${steps}</ol>
      </div>

      <div class="ca-journey__actions">
        <label class="ca-opacity" for="atlas-opacity">
          <span class="ca-opacity__label">Opacity</span>
          <input id="atlas-opacity" type="range" min="0.45" max="1" step="0.05" value="${opacity}" aria-label="Atlas overlay opacity" />
        </label>
        <button type="button" class="ca-pin-button" id="copy-atlas-pin" aria-live="polite">
          <span class="ca-pin-button__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="16" height="16" focusable="false">
              <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.6" />
              <circle cx="12" cy="12" r="2.5" fill="currentColor" />
              <path d="M12 1.5v4M12 18.5v4M1.5 12h4M18.5 12h4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
            </svg>
          </span>
          <span class="ca-pin-button__label">Copy Atlas Pin</span>
        </button>
      </div>
    </header>
  `;
}

function renderCopiedPanel(text) {
  if (!text) return "";

  return `
    <section class="vm-card ca-copied-panel" aria-live="polite">
      <p>Atlas Pin copied - paste into Claude, Codex, ChatGPT, a PR, or support.</p>
      <pre>${escapeHtml(text)}</pre>
    </section>
  `;
}

function renderVouchBody() {
  return `
    <div class="vm-hero">
      <h1 class="vm-hero__title">Vouch Completed</h1>
      <p class="vm-hero__subtitle">Your professional reference from ${escapeHtml(reference.refereeName)} is ready.</p>
    </div>

    <div class="vm-grid">
      <section class="vm-card vm-verified">
        <svg class="vm-verified__seal" viewBox="0 0 24 24" width="72" height="72" aria-hidden="true">
          <path d="M12 2l2.4 1.8 3 .2.2 3L19.4 9.6 21 12l-1.6 2.4-.6 2.8-3 .2L12 19.2 9.2 17.4l-3-.2-.6-2.8L4 12l1.6-2.4.6-2.8 3-.2L12 2z" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" />
          <path d="M8.6 12.2l2.4 2.4 4.4-4.8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span class="vm-card__chip">
          <span class="ca-journey__status-dot" aria-hidden="true"></span>
          Active
        </span>
        <h2 class="vm-verified__title">Reference Verified</h2>
        <p class="vm-verified__body">
          The structured reference questions have been securely answered and signed by your
          referee. This is now a reusable Vouch ID you can share with an employer.
        </p>
        <button type="button" class="vm-share-button">
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <circle cx="18" cy="5" r="2.4" fill="none" stroke="currentColor" stroke-width="1.8" />
            <circle cx="6" cy="12" r="2.4" fill="none" stroke="currentColor" stroke-width="1.8" />
            <circle cx="18" cy="19" r="2.4" fill="none" stroke="currentColor" stroke-width="1.8" />
            <path d="M8.1 10.9l7.8-4.6M8.1 13.1l7.8 4.6" stroke="currentColor" stroke-width="1.8" />
          </svg>
          Share with an employer
        </button>
      </section>

      <aside class="vm-card">
        <p class="vm-referee__label">Referee details</p>
        <div class="vm-referee__person">
          <span class="vm-referee__avatar">${escapeHtml(reference.refereeInitials)}</span>
          <span>
            <div class="vm-referee__name">${escapeHtml(reference.refereeName)}</div>
            <div class="vm-referee__role">${escapeHtml(reference.refereeRole)}</div>
          </span>
        </div>
        <dl class="vm-referee__meta">
          <div class="vm-referee__row">
            <dt>Completed</dt>
            <dd>${escapeHtml(reference.completedAt)}</dd>
          </div>
          <div class="vm-referee__row">
            <dt>Trust score</dt>
            <dd class="is-trust">${escapeHtml(reference.trustScore)}</dd>
          </div>
          <div class="vm-referee__row">
            <dt>Route</dt>
            <dd>${escapeHtml(pin.route)}</dd>
          </div>
        </dl>
      </aside>
    </div>
  `;
}

function renderWorkbench(open) {
  const layers = workbenchLayers
    .map((layer) => {
      const groups = layer.groups
        .map(
          (group) => `
            <div class="ca-workbench__group">
              <dt class="ca-workbench__group-label">${escapeHtml(group.label)}</dt>
              <dd class="ca-workbench__group-values">
                ${group.values.map((value) => `<code class="ca-workbench__chip">${escapeHtml(value)}</code>`).join("")}
              </dd>
            </div>
          `,
        )
        .join("");

      return `
        <article class="ca-workbench__layer" data-layer="${escapeHtml(layer.id)}">
          <header class="ca-workbench__layer-head">
            <span class="ca-workbench__layer-id">${escapeHtml(layer.id)}</span>
            <span class="ca-workbench__layer-name">${escapeHtml(layer.name)}</span>
            <span class="ca-workbench__layer-audience">${escapeHtml(layer.audience)}</span>
          </header>
          <dl class="ca-workbench__groups">${groups}</dl>
        </article>
      `;
    })
    .join("");

  return `
    <section class="ca-workbench ${open ? "is-open" : "is-collapsed"}" data-context-coordinate="${escapeHtml(coordinate)}" aria-label="L1-L5 Atlas Workbench">
      <button type="button" class="ca-workbench__handle" id="workbench-toggle" aria-expanded="${open ? "true" : "false"}" aria-controls="workbench-panel">
        <span class="ca-workbench__handle-grip" aria-hidden="true"></span>
        <span class="ca-workbench__handle-main">
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
            <path d="M12 3l9 5-9 5-9-5 9-5z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
            <path d="M3 13l9 5 9-5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" opacity="0.6" />
          </svg>
          <span class="ca-workbench__handle-title">L1-L5 Workbench</span>
          <span class="ca-workbench__handle-sub">Deeper context for <code>${escapeHtml(alias)}</code></span>
        </span>
        <span class="ca-workbench__handle-cta">
          ${open ? "Collapse" : "Open evidence"}
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false" class="ca-workbench__chevron" data-open="${open ? "true" : "false"}">
            <path d="M6 15l6-6 6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
      </button>

      <div id="workbench-panel" class="ca-workbench__panel" ${open ? "" : "hidden"}>
        <p class="ca-workbench__inversion">
          Context inversion - start from this coordinate, load only the mapped evidence below,
          and widen the search only if it is not enough.
        </p>
        <div class="ca-workbench__grid">${layers}</div>
      </div>
    </section>
  `;
}

function render({ copiedText = "", workbenchOpen = false, opacity = currentOpacity } = {}) {
  currentOpacity = Number(opacity);

  root.innerHTML = `
    <div class="ca-app">
      <div class="ca-brandline">
        <span><strong>ContextAtlas</strong> - L0 Journey Header over a live VouchMe page</span>
        <span class="ca-brandline__hint">Map the context before the model guesses</span>
      </div>
      ${renderJourneyHeader(currentOpacity)}
      ${renderCopiedPanel(copiedText)}
      ${renderVouchBody()}
      ${renderWorkbench(workbenchOpen)}
    </div>
  `;

  document.getElementById("copy-atlas-pin")?.addEventListener("click", async () => {
    const text = buildAtlasPin(pin);
    try {
      await navigator.clipboard?.writeText(text);
    } catch {
      // Clipboard can reject on insecure origins or denied permissions. The
      // visible packet below remains selectable either way.
    }

    render({ copiedText: text, workbenchOpen, opacity: currentOpacity });
    document.getElementById("copy-atlas-pin")?.classList.add("is-copied");
    document.querySelector(".ca-pin-button__label").textContent = "Copied";
  });

  document.getElementById("workbench-toggle")?.addEventListener("click", () => {
    render({ copiedText, workbenchOpen: !workbenchOpen, opacity: currentOpacity });
  });

  document.getElementById("atlas-opacity")?.addEventListener("input", (event) => {
    const nextOpacity = event.target.value;
    currentOpacity = Number(nextOpacity);
    document.querySelector(".ca-journey")?.style.setProperty("--atlas-opacity", nextOpacity);
  });
}

render();
