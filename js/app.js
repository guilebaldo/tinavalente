(function () {
  const catalog = () => window.TINA_CATALOG;

  function imgUrl(seed, w = 800, h = 1000) {
    return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function producerById(id) {
    return catalog().producers.find((p) => p.id === id);
  }

  function pieceById(id) {
    return catalog().pieces.find((p) => p.id === id);
  }

  function experienceById(id) {
    return catalog().experiences.find((e) => e.id === id);
  }

  function piecesForProducer(producerId) {
    return catalog().pieces.filter((p) => p.producerId === producerId);
  }

  function experiencesForProducer(producerId) {
    return catalog().experiences.filter((e) => e.producerId === producerId);
  }

  function producersInState(stateId) {
    return catalog().producers.filter((p) => p.stateId === stateId);
  }

  function imageBlock(seed, alt, className = "card__image") {
    return `
      <img class="${className}" src="${imgUrl(seed)}" alt="${escapeHtml(alt)} — imagen de ejemplo" loading="lazy" width="800" height="1000" />
      <p class="image-caption">Imagen de ejemplo — no representa la pieza real.</p>
    `;
  }

  function producerCard(producer) {
    return `
      <article class="card">
        <a class="card__link" href="#/productor/${producer.id}">
          ${imageBlock(producer.imageSeed, producer.name)}
          <div class="card__body">
            <p class="card__meta">${escapeHtml(producer.stateName)} · ${escapeHtml(producer.craft)}</p>
            <h3 class="card__title">${escapeHtml(producer.name)}</h3>
            <p>${escapeHtml(producer.specialty)}</p>
          </div>
        </a>
      </article>
    `;
  }

  function pieceCard(piece) {
    const sold = TinaStorage.isPieceSold(piece.id);
    const producer = producerById(piece.producerId);
    return `
      <article class="card">
        <a class="card__link" href="#/pieza/${piece.id}">
          ${imageBlock(piece.imageSeed, piece.title)}
          <div class="card__body">
            <p class="card__meta">${escapeHtml(producer?.name || "")}</p>
            <h3 class="card__title">${escapeHtml(piece.title)}</h3>
            <p class="card__price">${TinaCart.formatMXN(piece.priceMXN)}</p>
            ${sold ? '<span class="badge badge--sold">Vendida</span>' : '<span class="badge badge--accent">Pieza única</span>'}
          </div>
        </a>
      </article>
    `;
  }

  let mapController = null;

  function renderHome(root) {
    const featured = catalog().producers.filter((p) => p.featured);
    root.innerHTML = `
      <section class="map-section container">
        <p class="eyebrow">Explora por origen</p>
        <h1>Hecho a mano, estado por estado</h1>
        <p class="lead">Tina Valente conecta piezas únicas con las personas que las crean. Pasa el cursor por el mapa y haz clic en un estado con productores para conocer sus talleres.</p>
        <div class="map-wrapper" data-map-root>
          <div data-map-mount aria-live="polite"></div>
        </div>
        <div class="map-legend">
          <span><span class="legend-swatch legend-swatch--accent"></span>Estados con productores aliados</span>
          <span><span class="legend-swatch legend-swatch--neutral"></span>Otros estados</span>
          <span>Mapa: <a href="https://github.com/VictorCazanave/svg-maps" target="_blank" rel="noopener noreferrer">@svg-maps/mexico</a> (CC BY 4.0)</span>
        </div>
      </section>
      <section class="container section-spacer">
        <p class="eyebrow">Introducción</p>
        <h2>Una boutique de historias, no de inventario</h2>
        <p class="lead">${escapeHtml(catalog().brand.tagline)}. Cada pieza es irrepetible; cuando se vende, se honra el tiempo que le tomó a su creadora o creador.</p>
      </section>
      <section class="container section-spacer">
        <p class="eyebrow">Productores destacados</p>
        <h2>Manos que sostienen el oficio</h2>
        <div class="grid grid--producers">${featured.map(producerCard).join("")}</div>
        <p style="margin-top:2rem"><a href="#/experiencias">Ver experiencias en talleres →</a></p>
      </section>
    `;

    mapController = TinaMap.initMap(root.querySelector("[data-map-root]"), {
      onStateClick(stateId) {
        TinaRouter.navigate(`/estado/${stateId}`);
      }
    });
  }

  function renderState(root, stateId) {
    const producers = producersInState(stateId);
    const stateName =
      producers[0]?.stateName || TinaMap.stateNameById(stateId) || stateId;
    if (!producers.length) {
      root.innerHTML = `
        <div class="container">
          <p class="breadcrumb"><a href="#/">Inicio</a></p>
          <h1>Sin productores en esta demo</h1>
          <p class="lead">El estado seleccionado no forma parte del catálogo de ejemplo.</p>
          <a class="btn btn--secondary" href="#/">Volver al mapa</a>
        </div>
      `;
      return;
    }
    root.innerHTML = `
      <div class="container">
        <p class="breadcrumb"><a href="#/">Inicio</a> / ${escapeHtml(stateName)}</p>
        <h1>${escapeHtml(stateName)}</h1>
        <p class="lead">${producers.length} productor${producers.length === 1 ? "" : "es"} en esta demostración.</p>
        <div class="grid grid--producers" style="margin-top:2rem">${producers.map(producerCard).join("")}</div>
      </div>
    `;
  }

  function renderProducer(root, producerId) {
    const producer = producerById(producerId);
    if (!producer) {
      root.innerHTML = `<div class="container"><h1>Productor no encontrado</h1><a href="#/">Inicio</a></div>`;
      return;
    }
    const pieces = piecesForProducer(producerId);
    const exps = experiencesForProducer(producerId);
    root.innerHTML = `
      <div class="container">
        <p class="breadcrumb">
          <a href="#/">Inicio</a> /
          <a href="#/estado/${producer.stateId}">${escapeHtml(producer.stateName)}</a> /
          ${escapeHtml(producer.name)}
        </p>
        <div class="producer-header">
          <div>
            ${imageBlock(producer.imageSeed, producer.name)}
          </div>
          <div>
            <p class="eyebrow">${escapeHtml(producer.craft)}</p>
            <h1>${escapeHtml(producer.name)}</h1>
            <p><strong>Comunidad:</strong> ${escapeHtml(producer.community)}</p>
            <p>${escapeHtml(producer.story)}</p>
          </div>
        </div>
        <section>
          <h2>Piezas únicas</h2>
          <div class="grid grid--pieces">${pieces.map(pieceCard).join("")}</div>
        </section>
        <section class="section-spacer">
          <h2>Experiencias en el taller</h2>
          ${exps
            .map(
              (exp) => `
            <article class="card" style="margin-bottom:1rem;padding:1.5rem">
              <h3 class="card__title">${escapeHtml(exp.title)}</h3>
              <p>${escapeHtml(exp.description)}</p>
              <ul class="experience-dates">${exp.dates.map((d) => `<li>${escapeHtml(d)}</li>`).join("")}</ul>
              <p>Cupo: ${exp.capacity} · Duración: ${escapeHtml(exp.duration)} · ${TinaCart.formatMXN(exp.priceMXN)}</p>
              <div class="btn-row">
                <a class="btn btn--secondary" href="#/experiencias">Reservar desde experiencias</a>
                <button type="button" class="btn btn--primary" data-add-exp="${exp.id}">Agregar al carrito (1ª fecha)</button>
              </div>
            </article>
          `
            )
            .join("")}
        </section>
      </div>
    `;
    root.querySelectorAll("[data-add-exp]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const res = TinaCart.addToCart("experience", btn.dataset.addExp, { dateIndex: 0 });
        if (res.ok) btn.textContent = "Añadido al carrito";
      });
    });
  }

  function renderPiece(root, pieceId) {
    const piece = pieceById(pieceId);
    if (!piece) {
      root.innerHTML = `<div class="container"><h1>Pieza no encontrada</h1></div>`;
      return;
    }
    const producer = producerById(piece.producerId);
    const sold = TinaStorage.isPieceSold(piece.id);
    root.innerHTML = `
      <div class="container">
        <p class="breadcrumb">
          <a href="#/">Inicio</a> /
          <a href="#/productor/${producer?.id}">${escapeHtml(producer?.name || "")}</a> /
          Pieza
        </p>
        <div class="piece-hero">
          <div class="piece-gallery">
            ${imageBlock(piece.imageSeed, piece.title, "card__image")}
          </div>
          <div>
            <p class="eyebrow">Pieza única</p>
            <h1>${escapeHtml(piece.title)}</h1>
            <p class="card__price" style="font-size:1.5rem">${TinaCart.formatMXN(piece.priceMXN)}</p>
            ${sold ? '<p><span class="badge badge--sold">Vendida</span> Esta pieza ya fue adquirida en la demo.</p>' : '<p><span class="badge badge--accent">Disponible</span></p>'}
            <p>${escapeHtml(piece.story)}</p>
            <p><strong>Materiales:</strong> ${escapeHtml(piece.materials)}<br />
            <strong>Dimensiones:</strong> ${escapeHtml(piece.dimensions)}</p>
            <p>Productor: <a href="#/productor/${producer?.id}">${escapeHtml(producer?.name || "")}</a> · ${escapeHtml(producer?.stateName || "")}</p>
            <div class="btn-row">
              <button type="button" class="btn btn--primary" id="add-piece-btn" ${sold ? "disabled" : ""}>
                ${sold ? "No disponible" : "Agregar al carrito"}
              </button>
              <a class="btn btn--secondary" href="#/carrito">Ver carrito</a>
            </div>
          </div>
        </div>
      </div>
    `;
    const btn = root.querySelector("#add-piece-btn");
    if (btn && !sold) {
      btn.addEventListener("click", () => {
        const res = TinaCart.addToCart("piece", piece.id);
        if (res.ok) btn.textContent = "Añadida al carrito";
        else if (res.reason === "duplicate") btn.textContent = "Ya está en el carrito";
      });
    }
  }

  function renderExperiences(root) {
    const all = catalog().experiences;
    root.innerHTML = `
      <div class="container">
        <p class="breadcrumb"><a href="#/">Inicio</a> / Experiencias</p>
        <h1>Visitas a talleres</h1>
        <p class="lead">Reserva una experiencia guiada con los productores. Selecciona fecha al agregar al carrito (primera fecha disponible por defecto).</p>
        ${all
          .map((exp) => {
            const producer = producerById(exp.producerId);
            return `
          <article class="card" style="margin-bottom:1.5rem;padding:1.5rem">
            <p class="card__meta">${escapeHtml(producer?.stateName || "")} · ${escapeHtml(producer?.name || "")}</p>
            <h3 class="card__title">${escapeHtml(exp.title)}</h3>
            <p>${escapeHtml(exp.description)}</p>
            <p><strong>Lugar:</strong> ${escapeHtml(exp.location)}</p>
            <label class="form-group">
              Fecha
              <select data-exp-select="${exp.id}">
                ${exp.dates.map((d, i) => `<option value="${i}">${escapeHtml(d)}</option>`).join("")}
              </select>
            </label>
            <p>Cupo máximo: ${exp.capacity} · ${escapeHtml(exp.duration)} · <strong>${TinaCart.formatMXN(exp.priceMXN)}</strong></p>
            <button type="button" class="btn btn--primary" data-exp-add="${exp.id}">Reservar (demo)</button>
          </article>
        `;
          })
          .join("")}
      </div>
    `;
    root.querySelectorAll("[data-exp-add]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.expAdd;
        const select = root.querySelector(`[data-exp-select="${id}"]`);
        const dateIndex = parseInt(select?.value || "0", 10);
        const res = TinaCart.addToCart("experience", id, { dateIndex });
        if (res.ok) btn.textContent = "En el carrito";
      });
    });
  }

  function renderCart(root) {
    const cart = TinaStorage.getCart();
    if (!cart.length) {
      root.innerHTML = `
        <div class="container container--narrow">
          <h1>Carrito</h1>
          <p class="lead">Tu carrito está vacío.</p>
          <a class="btn btn--primary" href="#/">Explorar el mapa</a>
        </div>
      `;
      return;
    }
    const rows = cart
      .map((line) => {
        const key = line.type === "experience" ? line.lineId : line.id;
        const extra = line.type === "experience" ? ` · ${escapeHtml(line.date)}` : "";
        return `
        <tr>
          <td>${line.type === "piece" ? "Pieza" : "Experiencia"}${extra}<br /><strong>${escapeHtml(line.title)}</strong></td>
          <td>${TinaCart.formatMXN(line.priceMXN)}</td>
          <td><button type="button" class="cart-remove" data-remove="${escapeHtml(key)}">Quitar</button></td>
        </tr>
      `;
      })
      .join("");
    root.innerHTML = `
      <div class="container">
        <h1>Carrito</h1>
        <p class="form-hint">Demo: no se realizan cobros. Los precios son de ejemplo en MXN.</p>
        <div class="checkout-layout" style="margin-top:2rem">
          <table class="cart-table">
            <thead><tr><th>Artículo</th><th>Precio</th><th></th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
          <div class="order-summary">
            <p class="eyebrow">Total</p>
            <p class="order-summary__total">${TinaCart.formatMXN(TinaCart.cartTotal())}</p>
            <div class="btn-row">
              <a class="btn btn--primary" href="#/checkout">Ir al checkout</a>
              <a class="btn btn--secondary" href="#/">Seguir explorando</a>
            </div>
          </div>
        </div>
      </div>
    `;
    root.querySelectorAll("[data-remove]").forEach((btn) => {
      btn.addEventListener("click", () => {
        TinaCart.removeFromCart(btn.dataset.remove);
        renderCart(root);
      });
    });
  }

  function renderCheckout(root) {
    const cart = TinaStorage.getCart();
    if (!cart.length) {
      TinaRouter.navigate("/carrito");
      return;
    }
    root.innerHTML = `
      <div class="container">
        <h1>Checkout (simulado)</h1>
        <p class="form-hint"><strong>Demo:</strong> no se realizan cobros ni se guardan datos reales. No ingrese datos bancarios.</p>
        <div class="checkout-layout" style="margin-top:2rem">
          <form id="checkout-form" novalidate>
            <div class="form-group">
              <label for="nombre">Nombre completo</label>
              <input id="nombre" name="nombre" required placeholder="Ejemplo: Ana Torres" autocomplete="name" />
            </div>
            <div class="form-group">
              <label for="email">Correo</label>
              <input id="email" name="email" type="email" required placeholder="demo@correo.com" autocomplete="email" />
            </div>
            <div class="form-group">
              <label for="ciudad">Ciudad</label>
              <input id="ciudad" name="ciudad" required placeholder="Ciudad de México" />
            </div>
            <div class="form-group">
              <label for="notas">Notas para el productor (opcional)</label>
              <textarea id="notas" name="notas" rows="3" placeholder="Mensaje de regalo, preferencia de envío, etc."></textarea>
            </div>
            <p class="form-hint">Al confirmar, las piezas únicas quedarán marcadas como «Vendida» en este navegador.</p>
            <button type="submit" class="btn btn--primary">Confirmar pedido de demostración</button>
          </form>
          <div class="order-summary">
            <p class="eyebrow">Resumen</p>
            <ul style="padding-left:1.2rem">
              ${cart.map((l) => `<li>${escapeHtml(l.title)} — ${TinaCart.formatMXN(l.priceMXN)}</li>`).join("")}
            </ul>
            <p class="order-summary__total">${TinaCart.formatMXN(TinaCart.cartTotal())}</p>
          </div>
        </div>
      </div>
    `;
    root.querySelector("#checkout-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const form = e.target;
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      TinaCart.completeCheckout();
      TinaRouter.navigate("/confirmacion");
    });
  }

  function renderConfirmation(root) {
    root.innerHTML = `
      <div class="container container--narrow">
        <div class="confirmation-box">
          <div class="icon" aria-hidden="true">✓</div>
          <h1>¡Gracias!</h1>
          <p class="lead">Tu pedido de demostración fue registrado. Las piezas únicas compradas ahora aparecen como vendidas.</p>
          <p class="form-hint">No se envió ningún correo ni cargo. Tina Valente usará un proceso real de pago en producción.</p>
          <div class="btn-row" style="justify-content:center">
            <a class="btn btn--primary" href="#/">Volver al inicio</a>
            <a class="btn btn--secondary" href="#/experiencias">Explorar más experiencias</a>
          </div>
        </div>
      </div>
    `;
  }

  function renderAbout(root) {
    const about = catalog().about;
    root.innerHTML = `
      <div class="container container--narrow">
        <p class="breadcrumb"><a href="#/">Inicio</a> / Nosotros</p>
        <h1>${escapeHtml(about.title)}</h1>
        ${about.paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join("")}
        <p class="form-hint" style="margin-top:2rem">Propuesta comercial por Guru Software Studio · Contenido ficticio para fines de demostración.</p>
      </div>
    `;
  }

  function render(route) {
    const root = document.getElementById("app");
    if (!root) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = `Tina Valente — ${route.name}`;

    switch (route.name) {
      case "home":
        renderHome(root);
        break;
      case "state":
        renderState(root, route.params.stateId);
        break;
      case "producer":
        renderProducer(root, route.params.producerId);
        break;
      case "piece":
        renderPiece(root, route.params.pieceId);
        break;
      case "experiences":
        renderExperiences(root);
        break;
      case "cart":
        renderCart(root);
        break;
      case "checkout":
        renderCheckout(root);
        break;
      case "confirmation":
        renderConfirmation(root);
        break;
      case "about":
        renderAbout(root);
        break;
      default:
        renderHome(root);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".site-nav");
    toggle?.addEventListener("click", () => {
      const open = nav?.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav?.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => nav.classList.remove("is-open"));
    });

    window.addEventListener("tina:sold-updated", () => {
      const route = TinaRouter.parse();
      if (route.name === "piece" || route.name === "home") render(route);
    });

    TinaRouter.onRouteChange(render);
    TinaCart.updateCartBadge();
  });
})();