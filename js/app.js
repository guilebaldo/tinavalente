(function () {
  const catalog = () => window.TINA_CATALOG;

  function tone(seed) {
    const warm = [348, 356, 6, 16, 24, 338, 12, 32];
    let hash = 0;
    for (const char of String(seed)) hash = (hash * 33 + char.charCodeAt(0)) >>> 0;
    return warm[hash % warm.length];
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

  function enrichPiece(piece) {
    const producer = piece.producerId ? producerById(piece.producerId) : null;
    const isTina = piece.collection === "tina";
    return {
      ...piece,
      collection: piece.collection || "artesanos",
      authorshipType:
        piece.authorshipType ||
        (isTina ? "Diseño Tina Valente" : "Obra de maestra/o artesano"),
      artisanName: piece.artisanName || producer?.name || "Tina Valente",
      community: piece.community || producer?.community || "",
      stateName: piece.stateName || producer?.stateName || "",
      technique: piece.technique || producer?.craft || piece.materials,
      workHoursApprox: piece.workHoursApprox || "Por documentar"
    };
  }

  function allPieces() {
    return catalog().pieces.map(enrichPiece);
  }

  function piecesInCollection(collection) {
    return allPieces().filter((p) => p.collection === collection);
  }

  function piecesForProducer(producerId) {
    return allPieces().filter((p) => p.producerId === producerId && p.collection === "artesanos");
  }

  function experiencesForProducer(producerId) {
    return catalog().experiences.filter((e) => e.producerId === producerId);
  }

  function producersInState(stateId) {
    return catalog().producers.filter((p) => p.stateId === stateId);
  }

  function statesWithProducers() {
    const map = new Map();
    catalog().producers.forEach((producer) => {
      const current = map.get(producer.stateId) || {
        id: producer.stateId,
        name: producer.stateName,
        count: 0
      };
      current.count += 1;
      map.set(producer.stateId, current);
    });
    return [...map.values()];
  }

  function media(seed, alt) {
    return `
      <figure class="media" style="--tone:${tone(seed)}">
        <div class="weave" aria-hidden="true"></div>
        <p class="media__mark">${escapeHtml(alt)}</p>
        <figcaption class="image-caption">Imagen de ejemplo</figcaption>
      </figure>
    `;
  }

  function producerCard(producer) {
    const sample =
      producer.isExampleProfile !== false
        ? '<span class="badge badge--cochineal">Perfil de ejemplo</span>'
        : "";
    return `
      <article class="card reveal">
        <a class="card__link" href="#/productor/${producer.id}">
          ${media(producer.imageSeed, producer.name)}
          <div class="card__body">
            <p class="card__meta">${escapeHtml(producer.stateName)}</p>
            <h3 class="card__title">${escapeHtml(producer.name)}</h3>
            <p class="card__excerpt">${escapeHtml(producer.craft)}</p>
            ${sample}
          </div>
        </a>
      </article>
    `;
  }

  function authorshipBadge(type) {
    if (type === "Colaboración") return "badge badge--cochineal";
    if (type === "Diseño Tina Valente") return "badge badge--accent";
    return "badge";
  }

  function authorshipCard(piece) {
    return `
      <aside class="auth-card" aria-labelledby="auth-title">
        <h2 id="auth-title">Autoría</h2>
        <dl>
          <div><dt>Tipo</dt><dd><span class="${authorshipBadge(piece.authorshipType)}">${escapeHtml(piece.authorshipType)}</span></dd></div>
          <div><dt>Quién la hizo</dt><dd>${escapeHtml(piece.artisanName)}</dd></div>
          <div><dt>Comunidad</dt><dd>${escapeHtml(piece.community)}</dd></div>
          <div><dt>Estado</dt><dd>${escapeHtml(piece.stateName)}</dd></div>
          <div><dt>Técnica</dt><dd>${escapeHtml(piece.technique)}</dd></div>
          <div><dt>Tiempo aproximado</dt><dd>${escapeHtml(piece.workHoursApprox)}</dd></div>
        </dl>
      </aside>`;
  }

  function pieceCard(pieceRaw) {
    const piece = enrichPiece(pieceRaw);
    const sold = TinaStorage.isPieceSold(piece.id);
    return `
      <article class="card reveal">
        <a class="card__link" href="#/pieza/${piece.id}">
          ${media(piece.imageSeed, piece.title)}
          <div class="card__body">
            <p class="card__meta">${escapeHtml(piece.collection === "tina" ? "Colección Tina Valente" : "Maestras y maestros")}</p>
            <h3 class="card__title">${escapeHtml(piece.title)}</h3>
            <p class="card__artisan">${escapeHtml(piece.artisanName)} · ${escapeHtml(piece.stateName)}</p>
            <p class="card__price">${TinaCart.formatMXN(piece.priceMXN)}</p>
            ${sold ? '<span class="badge badge--sold">Vendida</span>' : `<span class="${authorshipBadge(piece.authorshipType)}">${escapeHtml(piece.authorshipType)}</span>`}
          </div>
        </a>
      </article>
    `;
  }

  function crumbs(items) {
    return `<p class="breadcrumb">${items
      .map((item, index) =>
        index === items.length - 1
          ? escapeHtml(item.label)
          : `<a href="${item.href}">${escapeHtml(item.label)}</a>`
      )
      .join(" / ")}</p>`;
  }

  function renderHome(root) {
    const featured = catalog().producers.filter((p) => p.featured);
    const states = statesWithProducers();
    const brand = catalog().brand;
    const tinaCount = piecesInCollection("tina").length;
    const artisanCount = piecesInCollection("artesanos").length;
    const expCount = catalog().experiences.length;
    root.innerHTML = `
      <section class="hero">
        <div class="hero__veil" aria-hidden="true"></div>
        <div class="hero__inner reveal">
          <p class="eyebrow">${escapeHtml(brand.legalName)}</p>
          <h1>${escapeHtml(brand.galleryPhrase)}</h1>
          <p class="lead">${escapeHtml(brand.purpose)}</p>
          <div class="btn-row">
            <a class="btn btn--primary" href="#mapa">Explorar el mapa</a>
            <a class="btn btn--secondary" href="#/coleccion-tina">Colección Tina Valente</a>
          </div>
        </div>
      </section>
      <section class="map-stage" id="mapa">
        <div class="container">
          <p class="eyebrow">Origen</p>
          <div class="split">
            <h2>México, taller por taller</h2>
            <p class="lead">Los estados en verde bosque tienen maestras y maestros en esta demo. El crédito al artesano va al frente en cada pieza.</p>
          </div>
          <div class="map-layout" data-map-root>
            <div class="map-wrapper">
              <div data-map-mount></div>
            </div>
            <aside class="map-panel" aria-label="Estados con productores">
              <h2>Aliados</h2>
              <p>${states.length} estados · ${catalog().producers.length} productores de ejemplo</p>
              ${states
                .map(
                  (state) => `
                <button type="button" class="state-chip" data-state-id="${state.id}">
                  ${escapeHtml(state.name)}
                  <em>${state.count}</em>
                </button>`
                )
                .join("")}
            </aside>
          </div>
          <div class="map-legend">
            <span><span class="legend-swatch legend-swatch--accent"></span>Con productores</span>
            <span><span class="legend-swatch legend-swatch--neutral"></span>Sin presencia en la demo</span>
          </div>
        </div>
      </section>
      <section class="band band--cream">
        <div class="container split">
          <div>
            <p class="eyebrow">La casa</p>
            <h2>Diseño propio y voz de maestras y maestros.</h2>
          </div>
          <div>
            <p class="lead">${escapeHtml(brand.tagline)}</p>
            <div class="stat-row">
              <div><strong>${tinaCount}</strong><span>Colección Tina</span></div>
              <div><strong>${artisanCount}</strong><span>Obra aliada</span></div>
              <div><strong>${expCount}</strong><span>Visitas a taller</span></div>
            </div>
          </div>
        </div>
      </section>
      <section class="band">
        <div class="container">
          <div class="section-head">
            <div>
              <p class="eyebrow">Destacados</p>
              <h2>Manos que sostienen el oficio</h2>
            </div>
            <a class="btn btn--secondary" href="#/experiencias">Ver experiencias</a>
          </div>
          <div class="grid grid--producers">${featured.map(producerCard).join("")}</div>
        </div>
      </section>
    `;

    const go = (stateId) => TinaRouter.navigate(`/estado/${stateId}`);
    TinaMap.initMap(root.querySelector("[data-map-root]"), { onStateClick: go });
    root.querySelectorAll(".state-chip").forEach((chip) => {
      chip.addEventListener("click", () => go(chip.dataset.stateId));
    });
  }

  function renderState(root, stateId) {
    const producers = producersInState(stateId);
    const stateName = producers[0]?.stateName || TinaMap.stateNameById(stateId) || stateId;
    if (!producers.length) {
      root.innerHTML = `
        <div class="container page-pad">
          ${crumbs([{ href: "#/", label: "Inicio" }, { label: "Estado" }])}
          <h1>Sin productores en esta demo</h1>
          <p class="lead">Este estado no forma parte del catálogo de ejemplo.</p>
          <a class="btn btn--primary" href="#/">Volver al mapa</a>
        </div>`;
      return;
    }
    root.innerHTML = `
      <div class="container page-pad">
        ${crumbs([{ href: "#/", label: "Inicio" }, { label: stateName }])}
        <p class="eyebrow">Estado</p>
        <h1>${escapeHtml(stateName)}</h1>
        <p class="lead">${producers.length} productor${producers.length === 1 ? "" : "es"} con oficio propio en esta propuesta.</p>
        <div class="grid grid--producers" style="margin-top:2.5rem">${producers.map(producerCard).join("")}</div>
      </div>`;
  }

  function renderProducer(root, producerId) {
    const producer = producerById(producerId);
    if (!producer) {
      root.innerHTML = `<div class="container page-pad"><h1>Productor no encontrado</h1><a href="#/">Inicio</a></div>`;
      return;
    }
    const pieces = piecesForProducer(producerId);
    const experiences = experiencesForProducer(producerId);
    root.innerHTML = `
      <div class="container page-pad">
        ${crumbs([
          { href: "#/", label: "Inicio" },
          { href: `#/estado/${producer.stateId}`, label: producer.stateName },
          { label: producer.name }
        ])}
        <div class="story-hero">
          ${media(producer.imageSeed, `Retrato de ejemplo de ${producer.name}`)}
          <div>
            <p class="eyebrow">${escapeHtml(producer.craft)}</p>
            ${producer.isExampleProfile !== false ? '<span class="badge badge--cochineal">Perfil de ejemplo</span>' : ""}
            <h1>${escapeHtml(producer.name)}</h1>
            <p class="story-kicker">${escapeHtml(producer.specialty)}</p>
            <ul class="meta-list">
              <li><span>Estado</span><a href="#/estado/${producer.stateId}">${escapeHtml(producer.stateName)}</a></li>
              <li><span>Comunidad</span>${escapeHtml(producer.community)}</li>
              <li><span>Oficio</span>${escapeHtml(producer.craft)}</li>
            </ul>
          </div>
        </div>
        <div class="prose">
          <p>${escapeHtml(producer.story)}</p>
        </div>
        <hr class="rule" />
        <div class="section-head">
          <div>
            <p class="eyebrow">Obra</p>
            <h2>Piezas únicas</h2>
          </div>
        </div>
        <div class="grid grid--pieces">${pieces.map(pieceCard).join("")}</div>
        <hr class="rule" />
        <div class="section-head">
          <div>
            <p class="eyebrow">El taller</p>
            <h2>Visitar a ${escapeHtml(producer.name.split(" ")[0])}</h2>
          </div>
        </div>
        <div class="exp-list">
          ${experiences.map((exp) => experienceCard(exp, { compact: true })).join("")}
        </div>
      </div>`;
    bindExperienceAdds(root);
  }

  function experienceCard(exp, { compact = false } = {}) {
    const producer = producerById(exp.producerId);
    return `
      <article class="exp-card">
        ${media(producer?.imageSeed || exp.id, exp.title, compact ? "" : "")}
        <div class="exp-card__body">
          <p class="card__meta">${escapeHtml(producer?.name || "")} · ${escapeHtml(producer?.stateName || "")}</p>
          <h3 class="card__title">${escapeHtml(exp.title)}</h3>
          <p>${escapeHtml(exp.description)}</p>
          <p class="card__excerpt">${escapeHtml(exp.location)}</p>
          <ul class="date-pills">${exp.dates.map((date) => `<li>${escapeHtml(date)}</li>`).join("")}</ul>
          <ul class="exp-facts">
            <li><strong>${exp.capacity}</strong>personas</li>
            <li><strong>${escapeHtml(exp.duration)}</strong>duración</li>
            <li><strong>${TinaCart.formatMXN(exp.priceMXN)}</strong>por persona</li>
          </ul>
          <label class="form-group">
            <span>Fecha de la visita</span>
            <select data-exp-select="${exp.id}" aria-label="Fecha para ${escapeHtml(exp.title)}">
              ${exp.dates.map((date, index) => `<option value="${index}">${escapeHtml(date)}</option>`).join("")}
            </select>
          </label>
          <button type="button" class="btn btn--primary" data-exp-add="${exp.id}">Reservar visita</button>
        </div>
      </article>`;
  }

  function bindExperienceAdds(root) {
    root.querySelectorAll("[data-exp-add]").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.dataset.expAdd;
        const select = root.querySelector(`[data-exp-select="${id}"]`);
        const dateIndex = Number.parseInt(select?.value || "0", 10);
        const result = TinaCart.addToCart("experience", id, { dateIndex });
        if (result.ok) button.textContent = "En el carrito";
        else if (result.reason === "duplicate") button.textContent = "Ya está reservada";
      });
    });
  }

  function renderPiece(root, pieceId) {
    const raw = catalog().pieces.find((item) => item.id === pieceId);
    if (!raw) {
      root.innerHTML = `<div class="container page-pad"><h1>Pieza no encontrada</h1></div>`;
      return;
    }
    const piece = enrichPiece(raw);
    const producer = piece.producerId ? producerById(piece.producerId) : null;
    const sold = TinaStorage.isPieceSold(piece.id);
    const collectionCrumb =
      piece.collection === "tina"
        ? { href: "#/coleccion-tina", label: "Colección Tina Valente" }
        : { href: "#/coleccion-artesanos", label: "Maestras y maestros" };
    const artisanLine =
      producer && piece.collection === "artesanos"
        ? `<tr><th>Artesana/o</th><td><a href="#/productor/${producer.id}">${escapeHtml(producer.name)}</a></td></tr>`
        : `<tr><th>Diseño</th><td>${escapeHtml(piece.artisanName)}</td></tr>`;
    root.innerHTML = `
      <div class="container page-pad">
        ${crumbs([
          { href: "#/", label: "Inicio" },
          collectionCrumb,
          { label: piece.title }
        ])}
        <div class="piece-hero">
          ${media(piece.imageSeed, piece.title)}
          <div class="piece-panel">
            <p class="eyebrow">${sold ? "Vendida" : escapeHtml(piece.artisanName)}</p>
            <h1>${escapeHtml(piece.title)}</h1>
            <p class="price-xl">${TinaCart.formatMXN(piece.priceMXN)}</p>
            <p><span class="${authorshipBadge(piece.authorshipType)}">${escapeHtml(piece.authorshipType)}</span></p>
            ${
              sold
                ? '<p class="notice">Esta pieza ya fue adquirida en la demostración y no vuelve al catálogo.</p>'
                : '<p class="notice">Existe una sola vez. Al completar el checkout de ejemplo quedará marcada como vendida.</p>'
            }
            <p>${escapeHtml(piece.story)}</p>
            <table class="spec-table">
              <tr><th>Materiales</th><td>${escapeHtml(piece.materials)}</td></tr>
              <tr><th>Medidas</th><td>${escapeHtml(piece.dimensions)}</td></tr>
              ${artisanLine}
              <tr><th>Comunidad</th><td>${escapeHtml(piece.community)}</td></tr>
              <tr><th>Estado</th><td>${escapeHtml(piece.stateName)}</td></tr>
            </table>
            <div class="btn-row">
              <button type="button" class="btn btn--primary" id="add-piece-btn" ${sold ? "disabled" : ""}>
                ${sold ? "No disponible" : "Agregar al carrito"}
              </button>
              <a class="btn btn--secondary" href="#/carrito">Ver carrito</a>
            </div>
          </div>
        </div>
        ${authorshipCard(piece)}
      </div>`;
    const button = root.querySelector("#add-piece-btn");
    if (button && !sold) {
      button.addEventListener("click", () => {
        const result = TinaCart.addToCart("piece", piece.id);
        if (result.ok) button.textContent = "Añadida al carrito";
        else if (result.reason === "duplicate") button.textContent = "Ya está en el carrito";
      });
    }
  }

  function renderCollectionTina(root) {
    const pieces = piecesInCollection("tina");
    root.innerHTML = `
      <div class="container page-pad">
        ${crumbs([{ href: "#/", label: "Inicio" }, { label: "Colección Tina Valente" }])}
        <p class="eyebrow">Diseño propio</p>
        <h1>Colección Tina Valente</h1>
        <p class="lead">Vestidos, sacos y rebozos prêt-à-porter. Piezas de ejemplo que muestran la línea de diseño de la casa, con autoría visible en cada ficha.</p>
        <div class="grid grid--pieces" style="margin-top:2.5rem">${pieces.map(pieceCard).join("")}</div>
      </div>`;
  }

  function renderCollectionArtisans(root) {
    const pieces = piecesInCollection("artesanos");
    root.innerHTML = `
      <div class="container page-pad">
        ${crumbs([{ href: "#/", label: "Inicio" }, { label: "Maestras y maestros" }])}
        <p class="eyebrow">Curaduría</p>
        <h1>Maestras y maestros artesanos</h1>
        <p class="lead">Obra de productores aliados. Los perfiles son ficticios y están marcados como ejemplo; el nombre de quien hizo cada pieza va al frente.</p>
        <div class="grid grid--pieces" style="margin-top:2.5rem">${pieces.map(pieceCard).join("")}</div>
      </div>`;
  }

  function renderExperiences(root) {
    root.innerHTML = `
      <div class="container page-pad">
        ${crumbs([{ href: "#/", label: "Inicio" }, { label: "Experiencias" }])}
        <p class="eyebrow">Talleres abiertos</p>
        <h1>Un día junto a quien crea.</h1>
        <p class="lead">Visitas con cupo reducido, fecha y precio de ejemplo. La reserva entra al carrito de la demostración; no confirma un lugar real.</p>
        <div class="exp-list" style="margin-top:2.5rem">
          ${catalog().experiences.map((exp) => experienceCard(exp)).join("")}
        </div>
      </div>`;
    bindExperienceAdds(root);
  }

  function renderCart(root) {
    const cart = TinaStorage.getCart();
    if (!cart.length) {
      root.innerHTML = `
        <div class="container page-pad empty">
          <p class="eyebrow">Carrito</p>
          <h1>Todavía vacío.</h1>
          <p class="lead">Elige una pieza única o una visita al taller. Nada de esto genera un cobro.</p>
          <div class="btn-row">
            <a class="btn btn--primary" href="#/">Explorar el mapa</a>
            <a class="btn btn--secondary" href="#/experiencias">Ver experiencias</a>
          </div>
        </div>`;
      return;
    }
    const lines = cart
      .map((line) => {
        const key = line.type === "experience" ? line.lineId : line.id;
        return `
          <article class="line">
            <div>
              <p class="line__kind">${line.type === "piece" ? "Pieza única" : `Visita · ${escapeHtml(line.date)}`}</p>
              <h2 class="line__title">${escapeHtml(line.title)}</h2>
            </div>
            <p class="line__price">${TinaCart.formatMXN(line.priceMXN)}</p>
            <button type="button" class="cart-remove" data-remove="${escapeHtml(key)}">Quitar</button>
          </article>`;
      })
      .join("");
    root.innerHTML = `
      <div class="container page-pad">
        <p class="eyebrow">Selección</p>
        <h1>Carrito</h1>
        <p class="notice">Demo: no se realizan cobros. Los precios son de ejemplo, en pesos mexicanos.</p>
        <div class="checkout-layout">
          <div>${lines}</div>
          <aside class="order-summary">
            <p class="eyebrow">Total</p>
            <p class="order-summary__total">${TinaCart.formatMXN(TinaCart.cartTotal())}</p>
            <p>${cart.length} ${cart.length === 1 ? "artículo" : "artículos"}</p>
            <div class="btn-row">
              <a class="btn btn--primary" href="#/checkout">Continuar</a>
              <a class="btn btn--secondary" href="#/">Seguir explorando</a>
            </div>
          </aside>
        </div>
      </div>`;
    root.querySelectorAll("[data-remove]").forEach((button) => {
      button.addEventListener("click", () => {
        TinaCart.removeFromCart(button.dataset.remove);
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
      <div class="container page-pad">
        <p class="eyebrow">Pedido de ejemplo</p>
        <h1>Checkout</h1>
        <p class="notice"><strong>Demo:</strong> no se realizan cobros ni se guardan datos reales. No ingrese datos de tarjeta.</p>
        <div class="checkout-layout">
          <form id="checkout-form" novalidate>
            <div class="form-group">
              <label for="nombre">Nombre completo</label>
              <input id="nombre" name="nombre" required autocomplete="name" placeholder="Ana Torres" />
            </div>
            <div class="form-group">
              <label for="email">Correo</label>
              <input id="email" name="email" type="email" required autocomplete="email" placeholder="ana@correo.com" />
            </div>
            <div class="form-group">
              <label for="ciudad">Ciudad</label>
              <input id="ciudad" name="ciudad" required autocomplete="address-level2" placeholder="Ciudad de México" />
            </div>
            <div class="form-group">
              <label for="notas">Nota para el productor</label>
              <textarea id="notas" name="notas" rows="4" placeholder="Un mensaje, una dedicatoria, una preferencia de entrega."></textarea>
            </div>
            <p class="form-hint">Al confirmar, las piezas únicas de este pedido quedan como «Vendida» en este navegador.</p>
            <button type="submit" class="btn btn--primary">Confirmar pedido de demostración</button>
          </form>
          <aside class="order-summary">
            <p class="eyebrow">Resumen</p>
            <ul class="summary-list">
              ${cart
                .map(
                  (line) =>
                    `<li><span>${escapeHtml(line.title)}</span><span>${TinaCart.formatMXN(line.priceMXN)}</span></li>`
                )
                .join("")}
            </ul>
            <p class="order-summary__total">${TinaCart.formatMXN(TinaCart.cartTotal())}</p>
          </aside>
        </div>
      </div>`;
    root.querySelector("#checkout-form").addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.currentTarget;
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
      <div class="container container--narrow page-pad">
        <div class="confirmation-box">
          <div class="icon" aria-hidden="true">✓</div>
          <p class="eyebrow">Pedido de demostración</p>
          <h1>Gracias.</h1>
          <p class="lead" style="margin-inline:auto">Las piezas únicas de este pedido ya aparecen como vendidas. No hubo cargo ni correo.</p>
          <div class="btn-row" style="justify-content:center">
            <a class="btn btn--primary" href="#/">Volver al inicio</a>
            <a class="btn btn--secondary" href="#/experiencias">Ver experiencias</a>
          </div>
        </div>
      </div>`;
  }

  function renderAbout(root) {
    const about = catalog().about;
    const brand = catalog().brand;
    const stores = catalog().stores || [];
    root.innerHTML = `
      <div class="container container--narrow page-pad">
        ${crumbs([{ href: "#/", label: "Inicio" }, { label: "Nosotros" }])}
        <p class="eyebrow">${escapeHtml(brand.legalName)}</p>
        <h1>${escapeHtml(about.title)}</h1>
        <p class="lead serif">${escapeHtml(about.galleryPhrase || brand.galleryPhrase)}</p>
        <div class="prose">
          ${about.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
        </div>
        <hr class="rule" />
        <h2>Tiendas físicas</h2>
        <ul class="store-list">
          ${stores
            .map(
              (store) =>
                `<li><strong>${escapeHtml(store.name)}</strong><span>${escapeHtml(store.address)}</span></li>`
            )
            .join("")}
        </ul>
        <div class="placeholder-note" role="note">
          <strong>Espacio de ejemplo</strong>
          <p>Aquí irá la transparencia de pago a artesanas y artesanos, certificados o sellos de origen, cuando existan datos verificables. Esta demo no muestra porcentajes ni certificaciones inventadas.</p>
        </div>
      </div>`;
  }

  const titles = {
    home: "Inicio",
    state: "Estado",
    producer: "Productor",
    piece: "Pieza",
    experiences: "Experiencias",
    cart: "Carrito",
    checkout: "Checkout",
    confirmation: "Confirmación",
    about: "Nosotros",
    collectionTina: "Colección Tina Valente",
    collectionArtisans: "Maestras y maestros"
  };

  const IN_PAGE_ANCHORS = new Set(["mapa"]);

  function scrollAfterRoute(route) {
    const hash = window.location.hash;
    const isSpaHash = hash.startsWith("#/") || hash === "#" || hash === "";
    const bareAnchor =
      hash.startsWith("#") && !hash.startsWith("#/") ? hash.slice(1).split("?")[0] : "";
    const useInPageAnchor = route.name === "home" && IN_PAGE_ANCHORS.has(bareAnchor);

    const scrollTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (useInPageAnchor) {
          const el = document.getElementById(bareAnchor);
          if (el) {
            const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            el.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
            return;
          }
        }
        if (isSpaHash || route.name !== "home") scrollTop();
      });
    });
  }

  function markNav(route) {
    const current = {
      home: "#/",
      collectionTina: "#/coleccion-tina",
      collectionArtisans: "#/coleccion-artesanos",
      experiences: "#/experiencias",
      about: "#/nosotros",
      cart: "#/carrito",
      checkout: "#/carrito"
    }[route.name];
    document.querySelectorAll(".site-nav a").forEach((link) => {
      if (current && link.getAttribute("href") === current) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }

  function render(route) {
    const root = document.getElementById("app");
    if (!root) return;
    document.title = `TINA VALENTE® — ${titles[route.name] || "Inicio"}`;
    markNav(route);
    switch (route.name) {
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
      case "collectionTina":
        renderCollectionTina(root);
        break;
      case "collectionArtisans":
        renderCollectionArtisans(root);
        break;
      default:
        renderHome(root);
    }
    root.focus({ preventScroll: true });
    scrollAfterRoute(route);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".site-nav");
    toggle?.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    });
    nav?.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle?.setAttribute("aria-expanded", "false");
      });
    });
    const header = document.querySelector(".site-header");
    const onScroll = () => header?.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("tina:sold-updated", () => {
      const route = TinaRouter.parse();
      if (route.name === "piece" || route.name === "producer" || route.name === "home") render(route);
    });
    TinaRouter.onRouteChange(render);
    TinaCart.updateCartBadge();
  });
})();