(function () {
  const CART_KEY = "tina_valente_cart_v1";
  const SOLD_KEY = "tina_valente_sold_pieces_v1";

  function read(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  window.TinaStorage = {
    getCart() {
      return read(CART_KEY, []);
    },
    setCart(items) {
      write(CART_KEY, items);
      window.dispatchEvent(new CustomEvent("tina:cart-updated"));
    },
  getSoldPieceIds() {
      return read(SOLD_KEY, []);
    },
    markPieceSold(pieceId) {
      const ids = new Set(read(SOLD_KEY, []));
      ids.add(pieceId);
      write(SOLD_KEY, [...ids]);
      window.dispatchEvent(new CustomEvent("tina:sold-updated"));
    },
    isPieceSold(pieceId) {
      return read(SOLD_KEY, []).includes(pieceId);
    }
  };
})();