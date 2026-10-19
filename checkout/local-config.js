// Local public configuration is loaded before checkout.js, never on the live domain.
if (["localhost", "127.0.0.1"].includes(location.hostname)) {
  window.nevisanLocalReady = new Promise(resolve => {
    const script = document.createElement("script");
    script.src = "config.local.js";
    script.onload = script.onerror = resolve;
    document.head.append(script);
  });
}
