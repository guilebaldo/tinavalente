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
    svg.setAttribute("aria-label", "Mapa de México. Los estados con productores se pueden seleccionar.");
    svg.id = "mexico-map-svg";

    const frame = container.querySelector(".map-wrapper") || container;
    const tooltip = document.createElement("div");
    tooltip.className = "map-tooltip";
    tooltip.setAttribute("role", "status");
    tooltip.innerHTML = "<strong></strong><span></span>";
    frame.appendChild(tooltip);

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    let activePath = null;

    function setActive(path) {
      if (activePath) activePath.classList.remove("is-active");
      activePath = path || null;
      if (activePath) activePath.classList.add("is-active");
      container.querySelectorAll(".state-chip").forEach((chip) => {
        chip.classList.toggle("is-active", chip.dataset.stateId === path?.dataset.stateId);
      });
    }

    function placeTooltip(event, name, count) {
      const wrap = frame.getBoundingClientRect();
      const pad = 96;
      const x = Math.min(Math.max(event.clientX - wrap.left, pad), wrap.width - pad);
      const y = Math.max(event.clientY - wrap.top, 36);
      tooltip.querySelector("strong").textContent = name;
      tooltip.querySelector("span").textContent =
        count === 1 ? "1 productor" : `${count} productores`;
      tooltip.style.left = `${x}px`;
      tooltip.style.top = `${y}px`;
      tooltip.classList.add("is-visible");
    }

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
        path.setAttribute("role", "link");
        path.setAttribute(
          "aria-label",
          `${loc.name}, ${count} productor${count === 1 ? "" : "es"}. Ver productores.`
        );
      } else {
        path.setAttribute("aria-hidden", "true");
      }

      const hide = () => tooltip.classList.remove("is-visible");
      const activate = () => {
        if (count === 0) return;
        setActive(path);
        if (typeof onStateClick === "function") onStateClick(loc.id, loc.name);
      };

      if (!coarse) {
        path.addEventListener("mouseenter", (event) => {
          if (count === 0) return;
          setActive(path);
          placeTooltip(event, loc.name, count);
        });
        path.addEventListener("mousemove", (event) => {
          if (count === 0) return;
          placeTooltip(event, loc.name, count);
        });
        path.addEventListener("mouseleave", () => {
          hide();
          setActive(null);
        });
      } else {
        path.addEventListener("pointerdown", () => {
          if (count === 0) return;
          setActive(path);
        });
      }

      path.addEventListener("click", activate);
      path.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activate();
        }
      });
      path.addEventListener("focus", () => {
        if (count === 0) return;
        setActive(path);
      });
      path.addEventListener("blur", () => setActive(null));

      svg.appendChild(path);
    });

    const mount = container.querySelector("[data-map-mount]");
    if (mount) {
      mount.replaceChildren(svg);
    }

    container.querySelectorAll(".state-chip").forEach((chip) => {
      chip.addEventListener("mouseenter", () => {
        const path = svg.querySelector(`[data-state-id="${chip.dataset.stateId}"]`);
        setActive(path);
      });
      chip.addEventListener("mouseleave", () => setActive(null));
      chip.addEventListener("focus", () => {
        const path = svg.querySelector(`[data-state-id="${chip.dataset.stateId}"]`);
        setActive(path);
      });
    });

    return {
      highlightState(stateId) {
        const path = svg.querySelector(`[data-state-id="${stateId}"]`);
        setActive(path);
      }
    };
  }

  window.TinaMap = { initMap, producerCountByStateId, stateNameById };
})();