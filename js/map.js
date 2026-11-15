(function () {
  function producerCountByStateId(stateId) {
    return window.TINA_CATALOG.producers.filter((p) => p.stateId === stateId).length;
  }

  function stateNameById(stateId) {
    const loc = window.MEXICO_MAP.locations.find((l) => l.id === stateId);
    return loc ? loc.name : stateId;
  }

  function initMap(container, { onStateClick } = {}) {
    if (!container || !window.MEXICO_MAP) return;

    const { viewBox, locations } = window.MEXICO_MAP;
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", viewBox);
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", "Mapa de México por estados");
    svg.id = "mexico-map-svg";

    const tooltip = document.createElement("div");
    tooltip.className = "map-tooltip";
    tooltip.setAttribute("role", "tooltip");
    container.querySelector(".map-wrapper")?.appendChild(tooltip);

    locations.forEach((loc) => {
      const count = producerCountByStateId(loc.id);
      const path = document.createElementNS(svgNS, "path");
      path.setAttribute("d", loc.path);
      path.classList.add("state");
      path.dataset.stateId = loc.id;
      path.dataset.stateName = loc.name;
      if (count > 0) {
        path.classList.add("has-producers");
        path.setAttribute("tabindex", "0");
        path.setAttribute("role", "button");
        path.setAttribute(
          "aria-label",
          `${loc.name}, ${count} productor${count === 1 ? "" : "es"}`
        );
      } else {
        path.setAttribute("aria-hidden", "true");
      }

      const showTooltip = (event) => {
        if (count === 0) return;
        const rect = container.querySelector(".map-wrapper").getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        tooltip.textContent = `${loc.name} · ${count} productor${count === 1 ? "" : "es"}`;
        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;
        tooltip.classList.add("is-visible");
      };

      const hideTooltip = () => tooltip.classList.remove("is-visible");

      const activate = () => {
        if (count === 0) return;
        if (typeof onStateClick === "function") onStateClick(loc.id, loc.name);
      };

      path.addEventListener("mouseenter", showTooltip);
      path.addEventListener("mousemove", showTooltip);
      path.addEventListener("mouseleave", hideTooltip);
      path.addEventListener("click", activate);
      path.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          activate();
        }
      });

      svg.appendChild(path);
    });

    const mapMount = container.querySelector("[data-map-mount]");
    if (mapMount) {
      mapMount.innerHTML = "";
      mapMount.appendChild(svg);
    }

    return {
      highlightState(stateId) {
        svg.querySelectorAll(".state").forEach((p) => p.classList.remove("is-focused"));
        const el = svg.querySelector(`[data-state-id="${stateId}"]`);
        if (el) el.classList.add("is-focused");
      }
    };
  }

  window.TinaMap = {
    initMap,
    producerCountByStateId,
    stateNameById
  };
})();