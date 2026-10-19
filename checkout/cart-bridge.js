/* Load before app.js. Activation stays off until the backend and payment host are live. */
window.NEVISAN_CART_CHECKOUT = {
  enabled: false,
  url(cart) {
    if (!Array.isArray(cart) || !cart.length || cart.length > 10) throw new Error("Choose your teas first.");
    const items = cart.map(({tea, qty}) => {
      const handle = String(tea?.name || "").toLowerCase().replace(/^nevisan /, "").replace(/\s+/g, "-");
      const allowed = ["blue-flower-green-tea","chamomile-green-tea","gaba-oolong-tea","ginger-green-tea","lemongrass-green-tea","organic-green-tea","rum-green-tea","spearmint-green-tea","tulsi-green-tea","whiskey-green-tea"];
      if (!allowed.includes(handle) || !Number.isSafeInteger(qty) || qty < 1 || qty > 1000) throw new Error("Please review your packet quantities.");
      return {handle,quantity:qty};
    });
    // Carry handles and packet counts only. Medusa resolves prices and stock.
    return "/checkout/?items=" + encodeURIComponent(JSON.stringify(items));
  },
  open(cart) { window.location.assign(this.url(cart)); }
};
