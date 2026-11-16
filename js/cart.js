(function () {
  const catalog = () => window.TINA_CATALOG;

  function formatMXN(amount) {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      maximumFractionDigits: 0
    }).format(amount);
  }

  function findPiece(id) {
    return catalog().pieces.find((p) => p.id === id);
  }

  function findExperience(id) {
    return catalog().experiences.find((e) => e.id === id);
  }

  function cartCount() {
    return TinaStorage.getCart().reduce((sum, line) => sum + line.qty, 0);
  }

  function updateCartBadge() {
    const el = document.querySelector("[data-cart-count]");
    if (el) {
      const n = cartCount();
      el.textContent = String(n);
      el.hidden = n === 0;
    }
  }

  function addToCart(type, id, options = {}) {
    const cart = TinaStorage.getCart();
    if (type === "piece") {
      if (TinaStorage.isPieceSold(id)) return { ok: false, reason: "sold" };
      const piece = findPiece(id);
      if (!piece) return { ok: false, reason: "missing" };
      const exists = cart.some((l) => l.type === "piece" && l.id === id);
      if (exists) return { ok: false, reason: "duplicate" };
      cart.push({
        type: "piece",
        id: piece.id,
        title: piece.title,
        priceMXN: piece.priceMXN,
        qty: 1,
        producerId: piece.producerId
      });
    } else if (type === "experience") {
      const exp = findExperience(id);
      if (!exp) return { ok: false, reason: "missing" };
      const dateIndex = options.dateIndex ?? 0;
      const lineId = `${id}::${dateIndex}`;
      const exists = cart.some((l) => l.type === "experience" && l.lineId === lineId);
      if (exists) return { ok: false, reason: "duplicate" };
      cart.push({
        type: "experience",
        id: exp.id,
        lineId,
        title: exp.title,
        priceMXN: exp.priceMXN,
        qty: 1,
        producerId: exp.producerId,
        date: exp.dates[dateIndex] || exp.dates[0]
      });
    }
    TinaStorage.setCart(cart);
    updateCartBadge();
    return { ok: true };
  }

  function removeFromCart(lineId) {
    const cart = TinaStorage.getCart().filter((l) => {
      const key = l.type === "experience" ? l.lineId : l.id;
      return key !== lineId;
    });
    TinaStorage.setCart(cart);
    updateCartBadge();
  }

  function cartTotal() {
    return TinaStorage.getCart().reduce((sum, l) => sum + l.priceMXN * l.qty, 0);
  }

  function completeCheckout() {
    const cart = TinaStorage.getCart();
    cart.filter((l) => l.type === "piece").forEach((l) => TinaStorage.markPieceSold(l.id));
    TinaStorage.setCart([]);
    updateCartBadge();
  }

  window.TinaCart = {
    formatMXN,
    cartCount,
    updateCartBadge,
    addToCart,
    removeFromCart,
    cartTotal,
    completeCheckout
  };

  window.addEventListener("tina:cart-updated", updateCartBadge);
  document.addEventListener("DOMContentLoaded", updateCartBadge);
})();