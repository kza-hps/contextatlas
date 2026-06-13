import { alias, coordinate, journey, pin, reference, workbenchEdges, workbenchLayers } from "./data.js";

const root = document.getElementById("root");
const logoSrc =
  "../../../design-references/ChatGPT%20Image%20Jun%2013,%202026,%2010_03_39%20AM%20(1).png";
let currentOpacity = 0.9;

function buildAtlasPin(data) {
  return buildAtlasPinLines(data).join("\n");
}

function buildAtlasPinLines(data) {
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

  return lines;
}

function buildCoordinatePacket() {
  return coordinate;
}

function RoleGlyph() {
  return `
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false" class="ca-journey__role-icon">
      <circle cx="12" cy="8" r="3.4" fill="none" stroke="currentColor" stroke-width="1.6" />
      <path d="M5 19.5a7 7 0 0 1 14 0" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
    </svg>
  `;
}

function CopyGlyph(className = "") {
  return `
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false" class="${className}">
      <rect x="8" y="8" width="10" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="1.8" />
      <path d="M6 16H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
    </svg>
  `;
}

function LocationGlyph(className = "") {
  return `
    <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" focusable="false" class="${className}">
      <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" stroke-width="1.7" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
    </svg>
  `;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getWorkbenchNodeId(layerId, groupLabel, value) {
  return `${layerId}::${groupLabel}::${value}`;
}

function renderJourneyHeader(opacity) {
  const pinPacket = buildAtlasPin(pin);
  const pinLines = buildAtlasPinLines(pin)
    .map((line, index) => `<span style="--line-index: ${index}">${escapeHtml(line)}</span>`)
    .join("");
  const activeIndex = journey.steps.findIndex((step) => step.id === journey.currentStepId);
  const steps = journey.steps
    .map((step, index) => {
      const state = index < activeIndex ? "done" : index === activeIndex ? "active" : "upcoming";
      const check =
        state === "active"
          ? '<svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true" focusable="false" class="ca-journey__step-check"><path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" /></svg>'
          : "";
      const role = step.id === "candidate" ? RoleGlyph() : "";
      const locator =
        state === "active"
          ? `
            <button type="button" class="ca-locator" id="copy-atlas-pin" aria-label="Copy Atlas Pin" aria-describedby="atlas-pin-panel">
              ${LocationGlyph("ca-locator__pin")}
              ${CopyGlyph("ca-locator__copy")}
            </button>
            <aside class="ca-pin-popover" id="atlas-pin-panel" role="status" aria-live="polite">
              <p>Atlas Pin copied - paste into Claude, Codex, ChatGPT, a PR, or support.</p>
              <pre>${pinLines}</pre>
            </aside>
          `
          : "";

      return `
        <li class="ca-journey__step is-${state}" ${state === "active" ? 'aria-current="step"' : ""}>
          ${check}
          ${role}
          <span class="ca-journey__step-label">${escapeHtml(step.label)}</span>
          ${locator}
        </li>
      `;
    })
    .join("");

  return `
    <header class="ca-journey" style="--atlas-opacity: ${opacity}" data-context-coordinate="${escapeHtml(journey.coordinate)}" aria-label="Journey position for ${escapeHtml(journey.alias)}">
      <div class="ca-journey__identity">
        <button type="button" class="ca-journey__logo" id="copy-coordinate" aria-label="Reveal and copy coordinate">
          <img src="${logoSrc}" alt="" />
        </button>
        <button type="button" class="ca-journey__coords" id="copy-coordinate-details" aria-label="Copy coordinate">
          <span class="ca-journey__coordinate">${escapeHtml(journey.coordinate)}</span>
          <span class="ca-journey__copy-coordinate">${CopyGlyph()}</span>
        </button>
      </div>

      <div class="ca-journey__center">
        <ol class="ca-journey__steps" aria-label="Journey path">${steps}</ol>
      </div>

      <div class="ca-journey__actions">
        <label class="ca-opacity" for="atlas-opacity">
          <span class="ca-opacity__label">Opacity</span>
          <input id="atlas-opacity" type="range" min="0" max="1" step="0.05" value="${opacity}" aria-label="Atlas overlay opacity" aria-orientation="vertical" />
        </label>
      </div>
    </header>
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

function renderDiagramNodes(layer, revealed) {
  const groups = layer.groups
    .map((group) => {
      const values = group.values
        .map((value) => {
          const nodeId = getWorkbenchNodeId(layer.id, group.label, value);
          return `<span class="ca-workbench__node" data-node-id="${escapeHtml(nodeId)}">${escapeHtml(value)}</span>`;
        })
        .join("");

      return `
        <div class="ca-workbench__node-group">
          <span class="ca-workbench__group-label">${escapeHtml(group.label)}</span>
          <span class="ca-workbench__nodes">${values}</span>
        </div>
      `;
    })
    .join("");

  return revealed ? groups : "";
}

function renderWorkbench(revealedDepth) {
  const depth = Math.max(0, Math.min(revealedDepth, workbenchLayers.length));
  const nextDepth = depth >= workbenchLayers.length ? 0 : depth + 1;
  const cta = depth === 0 ? "Pull L1" : depth >= workbenchLayers.length ? "Collapse" : `Pull ${workbenchLayers[depth].id}`;
  const layers = workbenchLayers
    .map((layer, index) => {
      const layerDepth = index + 1;
      const revealed = layerDepth <= depth;
      const state = revealed ? "is-revealed" : "is-compressed";

      return `
        <section class="ca-workbench__swimlane ${state}" data-layer="${escapeHtml(layer.id)}" style="--layer-index: ${index}">
          <button type="button" class="ca-workbench__lane-label" data-workbench-depth="${layerDepth}" aria-expanded="${revealed ? "true" : "false"}">
            <span class="ca-workbench__layer-id">${escapeHtml(layer.id)}</span>
            <span class="ca-workbench__layer-name">${escapeHtml(layer.name)}</span>
            <span class="ca-workbench__layer-audience">${escapeHtml(layer.audience)}</span>
          </button>
          <div class="ca-workbench__lane-canvas" aria-hidden="${revealed ? "false" : "true"}">
            ${renderDiagramNodes(layer, revealed)}
          </div>
        </section>
      `;
    })
    .join("");

  return `
    <section class="ca-workbench ${depth > 0 ? "is-open" : "is-collapsed"}" data-context-coordinate="${escapeHtml(coordinate)}" data-depth="${depth}" aria-label="L1-L5 Atlas Workbench">
      <button type="button" class="ca-workbench__handle" id="workbench-toggle" data-next-depth="${nextDepth}" aria-expanded="${depth > 0 ? "true" : "false"}" aria-controls="workbench-panel">
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
          ${escapeHtml(cta)}
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false" class="ca-workbench__chevron" data-open="${depth > 0 ? "true" : "false"}">
            <path d="M6 15l6-6 6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
      </button>

      <div id="workbench-panel" class="ca-workbench__panel" ${depth > 0 ? "" : "hidden"}>
        <p class="ca-workbench__inversion">
          Context inversion - pull one layer at a time, inspect only the evidence needed,
          and widen the map only when the visible lane is not enough.
        </p>
        <div class="ca-workbench__diagram" aria-label="Layered context swimlane diagram">
          <svg class="ca-workbench__connectors" aria-hidden="true">
            <defs>
              <marker id="ca-workbench-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z"></path>
              </marker>
            </defs>
          </svg>
          ${layers}
        </div>
      </div>
    </section>
  `;
}

function drawWorkbenchConnectors() {
  const diagram = document.querySelector(".ca-workbench__diagram");
  const svg = document.querySelector(".ca-workbench__connectors");

  if (!diagram || !svg) return;

  const diagramRect = diagram.getBoundingClientRect();
  svg.setAttribute("viewBox", `0 0 ${diagramRect.width} ${diagramRect.height}`);
  svg.setAttribute("width", String(diagramRect.width));
  svg.setAttribute("height", String(diagramRect.height));
  svg.querySelectorAll(".ca-workbench__connector").forEach((node) => node.remove());

  const nodeById = new Map(
    [...diagram.querySelectorAll("[data-node-id]")].map((node) => [node.dataset.nodeId, node]),
  );
  const revealedLayerIds = new Set(
    [...diagram.querySelectorAll(".ca-workbench__swimlane.is-revealed")].map((lane) => lane.dataset.layer),
  );

  const makePoint = (node, side) => {
    const rect = node.getBoundingClientRect();
    const x = side === "source" ? rect.left + rect.width / 2 : rect.left + rect.width / 2;
    const y = side === "source" ? rect.bottom : rect.top;
    return {
      x: x - diagramRect.left,
      y: y - diagramRect.top,
    };
  };

  workbenchEdges.forEach((edge, index) => {
    if (!revealedLayerIds.has(edge.from.layer) || !revealedLayerIds.has(edge.to.layer)) return;

    const source = nodeById.get(getWorkbenchNodeId(edge.from.layer, edge.from.group, edge.from.value));
    const target = nodeById.get(getWorkbenchNodeId(edge.to.layer, edge.to.group, edge.to.value));
    if (!source || !target) return;

    const start = makePoint(source, "source");
    const end = makePoint(target, "target");
    const deltaY = Math.max(34, Math.abs(end.y - start.y));
    const midY = start.y + deltaY * 0.48;
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("class", "ca-workbench__connector");
    path.setAttribute("d", `M ${start.x} ${start.y} C ${start.x} ${midY}, ${end.x} ${midY}, ${end.x} ${end.y}`);
    path.setAttribute("marker-end", "url(#ca-workbench-arrow)");
    path.style.setProperty("--edge-index", String(index));
    svg.appendChild(path);
  });
}

function render({ workbenchDepth = 0, opacity = currentOpacity } = {}) {
  currentOpacity = Number(opacity);

  root.innerHTML = `
    <div class="ca-app">
      <div class="ca-brandline">
        <span><strong>ContextAtlas</strong> - L0 Journey Header over a live VouchMe page</span>
        <span class="ca-brandline__hint">Map the context before the model guesses</span>
      </div>
      ${renderJourneyHeader(currentOpacity)}
      ${renderVouchBody()}
      ${renderWorkbench(workbenchDepth)}
    </div>
  `;

  document.getElementById("copy-atlas-pin")?.addEventListener("click", async (event) => {
    const text = buildAtlasPin(pin);
    try {
      await navigator.clipboard?.writeText(text);
    } catch {
      // Clipboard can reject on insecure origins or denied permissions. The
      // visible packet below remains selectable either way.
    }
    event.currentTarget.blur();
  });

  document.querySelectorAll("#copy-coordinate, #copy-coordinate-details").forEach((target) => target.addEventListener("click", async () => {
    try {
      await navigator.clipboard?.writeText(buildCoordinatePacket());
    } catch {
      // The coordinate remains visible on hover/focus if clipboard access is denied.
    }
    document.querySelector(".ca-journey__identity")?.classList.add("is-coordinate-copied");
  }));

  document.getElementById("workbench-toggle")?.addEventListener("click", () => {
    const nextDepth = Number(document.getElementById("workbench-toggle")?.dataset.nextDepth ?? 1);
    render({ workbenchDepth: nextDepth, opacity: currentOpacity });
  });

  document.querySelectorAll("[data-workbench-depth]").forEach((target) => {
    target.addEventListener("click", () => {
      render({ workbenchDepth: Number(target.dataset.workbenchDepth), opacity: currentOpacity });
    });
  });

  document.getElementById("atlas-opacity")?.addEventListener("input", (event) => {
    const nextOpacity = event.target.value;
    currentOpacity = Number(nextOpacity);
    document.querySelector(".ca-journey")?.style.setProperty("--atlas-opacity", nextOpacity);
  });

  requestAnimationFrame(() => {
    drawWorkbenchConnectors();
    requestAnimationFrame(drawWorkbenchConnectors);
  });
}

render();
