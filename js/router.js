(function () {
  function parseHash() {
    const hash = window.location.hash.replace(/^#\/?/, "") || "";
    const parts = hash.split("/").filter(Boolean);
    return { parts, raw: hash };
  }

  window.TinaRouter = {
    navigate(path) {
      const target = path.startsWith("#") ? path : `#/${path.replace(/^\//, "")}`;
      if (window.location.hash !== target) {
        window.location.hash = target;
      } else {
        window.dispatchEvent(new HashChangeEvent("hashchange"));
      }
    },
    parse() {
      const { parts } = parseHash();
      if (parts.length === 0) return { name: "home", params: {} };
      const [first, second] = parts;
      switch (first) {
        case "estado":
          return { name: "state", params: { stateId: second } };
        case "productor":
          return { name: "producer", params: { producerId: second } };
        case "pieza":
          return { name: "piece", params: { pieceId: second } };
        case "experiencias":
          return { name: "experiences", params: {} };
        case "carrito":
          return { name: "cart", params: {} };
        case "checkout":
          return { name: "checkout", params: {} };
        case "confirmacion":
          return { name: "confirmation", params: {} };
        case "nosotros":
          return { name: "about", params: {} };
        default:
          return { name: "home", params: {} };
      }
    },
    onRouteChange(handler) {
      const run = () => handler(window.TinaRouter.parse());
      window.addEventListener("hashchange", run);
      run();
    }
  };
})();