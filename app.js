// Cache invalidation: redeploy to force GitHub Pages CDN refresh — 2026-08-14
const trackExternalClick = (e, t) => {
  try {
    const m = {
      "Lemongrass Green Tea": "KT-8GBE-8MZG",
      "Blue Flower Green Tea": "BlueFlower-1",
      "Rum Green Tea": "RUM-1",
      "Spearmint Green Tea": "Spearmint",
      "Tulsi Green Tea": "MK-H5LY-IRK3",
      "Chamomile Green Tea": "Chamomile-1",
      "Whiskey Green Tea": "9E-23FO-LL8Q",
      "GABA Oolong Tea": "GABA",
      "Organic Green Tea": "Unflavoured-1",
      "Ginger Green Tea": "GINGER",
    };
    const s = m[e];
    if (s && typeof fbq !== "undefined") {
      fbq("track", "AddToCart", {
        content_ids: [s],
        content_type: "product",
        value: 499,
        currency: "INR",
      });
      fbq("track", "Purchase", {
        content_ids: [s],
        content_type: "product",
        value: 499,
        currency: "INR",
      });
    }
  } catch (err) {}
};
const {
  useState: useState,
  useEffect: useEffect,
  useRef: useRef,
  useCallback: useCallback,
} = React;
function useInView(e = 0.15) {
  const t = useRef(null),
    [a, n] = useState(!1);
  return (
    useEffect(() => {
      const a = t.current;
      if (!a) return;
      const o = new IntersectionObserver(
        ([e]) => {
          e.isIntersecting && (n(!0), o.disconnect());
        },
        { threshold: e },
      );
      return (o.observe(a), () => o.disconnect());
    }, [e]),
    [t, a]
  );
}
function useGsapReveal() {
  const e = useRef(null);
  return (
    useEffect(() => {
      const t = e.current;
      if (!t) return;
      const a = t.querySelectorAll("[data-gsap-reveal]");
      if (!a.length) return;
      const n = gsap.context(() => {
        gsap.from(a, {
          scrollTrigger: {
            trigger: t,
            start: "top 82%",
            end: "top 28%",
            scrub: 0.8,
          },
          y: 72,
          opacity: 0,
          stagger: 0.1,
        });
      }, t);
      return () => n.revert();
    }, []),
    e
  );
}
function AnimatedNumber({
  target: e,
  suffix: t = "",
  inView: a,
  duration: n = 1800,
}) {
  const [o, i] = useState(0);
  return (
    useEffect(() => {
      if (!a) return;
      const t = performance.now(),
        o = (a) => {
          const r = Math.min((a - t) / n, 1),
            l = 1 - Math.pow(1 - r, 3);
          (i(Math.round(l * e)), r < 1 && requestAnimationFrame(o));
        };
      requestAnimationFrame(o);
    }, [a, e, n]),
    React.createElement(React.Fragment, null, o + t)
  );
}
gsap.registerPlugin(ScrollTrigger);
const T = {
    teal: "#23412D",
    tealDark: "#15271B",
    tealMid: "#1E3626",
    tealLight: "#DCE6DF",
    gold: "#c9a84c",
    goldLight: "#f0e4c0",
    cream: "#F8F6F2",
    creamDark: "#F3EFE9",
    white: "#ffffff",
    text: "#1F2E24",
    textMuted: "#5C7064",
    border: "#E2DDD5",
  },
  ViewportCtx = React.createContext({ isMobile: !1, isTablet: !1 }),
  CartCtx = React.createContext({
    cart: [],
    addToCart: () => {},
    updateQty: () => {},
    clearCart: () => {},
  });
function CartProvider({ children: e }) {
  const [t, a] = useState([]);
  return React.createElement(
    CartCtx.Provider,
    {
      value: {
        cart: t,
        addToCart: (e) => {
          try {
            const m = {
              "Lemongrass Green Tea": "KT-8GBE-8MZG",
              "Blue Flower Green Tea": "BlueFlower-1",
              "Rum Green Tea": "RUM-1",
              "Spearmint Green Tea": "Spearmint",
              "Tulsi Green Tea": "MK-H5LY-IRK3",
              "Chamomile Green Tea": "Chamomile-1",
              "Whiskey Green Tea": "9E-23FO-LL8Q",
              "GABA Oolong Tea": "GABA",
              "Organic Green Tea": "Unflavoured-1",
              "Ginger Green Tea": "GINGER",
            };
            const s = m[e.name];
            if (s && typeof fbq !== "undefined") {
              fbq("track", "AddToCart", {
                content_ids: [s],
                content_type: "product",
                value: e.price || 499,
                currency: "INR",
              });
            }
          } catch (err) {}
          a((t) =>
            t.find((t) => t.tea.name === e.name)
              ? t.map((t) =>
                  t.tea.name === e.name ? { ...t, qty: t.qty + 1 } : t,
                )
              : [...t, { tea: e, qty: 1 }],
          );
        },
        updateQty: (e, t) =>
          a((a) =>
            a
              .map((a) =>
                a.tea.name === e ? { ...a, qty: Math.max(0, a.qty + t) } : a,
              )
              .filter((e) => e.qty > 0),
          ),
        clearCart: () => a([]),
      },
    },
    e,
  );
}
function useCart() {
  return React.useContext(CartCtx);
}
const useViewport = () => React.useContext(ViewportCtx);
function ScrollProgress() {
  /* MWG: CSS animation-timeline:scroll() handles this natively in index.html.
     Only render the JS fallback if the CSS version is not supported. */
  const [e, t] = useState(0),
    [show, setShow] = useState(false);
  return (
    useEffect(() => {
      /* Check if CSS scroll-driven animations are supported */
      const cssSupported = CSS.supports("animation-timeline", "scroll()");
      if (cssSupported) return; /* CSS version active — skip JS version */
      setShow(true);
      const handler = () => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        t(total > 0 ? (window.scrollY / total) * 100 : 0);
      };
      window.addEventListener("scroll", handler, { passive: !0 });
      return () => window.removeEventListener("scroll", handler);
    }, []),
    show
      ? React.createElement(
          "div",
          {
            style: {
              position: "fixed",
              top: 0, left: 0, right: 0,
              height: 2, zIndex: 999,
              background: "rgba(0,0,0,0.08)",
            },
          },
          React.createElement("div", {
            style: {
              height: "100%",
              background: `linear-gradient(to right, ${T.gold}, ${T.teal})`,
              width: `${e}%`,
              transition: "width 80ms linear",
              borderRadius: "0 2px 2px 0",
            },
          }),
        )
      : null
  );
}
function CursorGlow() {
  /* Premium spring-lag gold cursor is handled natively in index.html.
     This component is intentionally disabled to avoid conflicts. */
  return null;
}
const WA_NUMBER = "919864245687";
const Icon = (props) => NevIcon(props);
function NevIcon({ name, size = 24, color = "currentColor", style = {} }) {
  const iconPaths = {
    "★": "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
    "☆": "M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.7 4.03 4.38.38-3.32 2.88 1 4.28L12 15.4z",
    "✓": "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z",
    "💬": "M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm0 4h8v-2H6v2zm0-8h12v2H6V5z",
    "🛍️": "M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h14v12z",
    "🛍": "M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h14v12z",
    "🌿": "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 21 3c-1 4-1.5 5.5-3.1 11.2A7 7 0 0 1 11 20z M9 13c1 0 2.5 1.5 2.5 2.5",
    "🍃": "M12 22c0-8 6-12 8-16-4 1-7 4-8 8 M12 22c0-6-4-9-6-12 3 1 5 3 6 6 M12 14v8",
    "🌱": "M12 22c0-8 6-12 8-16-4 1-7 4-8 8 M12 22c0-6-4-9-6-12 3 1 5 3 6 6 M12 14v8",
    "🌸": "M12 22c0-8 6-12 8-16-4 1-7 4-8 8 M12 22c0-6-4-9-6-12 3 1 5 3 6 6 M12 14v8",
    "⚡": "M13 2L3 14h9l-1 8 10-12h-9L13 2z",
    "📍": "M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z M12 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
    "🚀": "M1 3h15v13H1V3z M16 8h4l3 3v5h-7V8z M5.5 18.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z M18.5 18.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
    "🎯": "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M12 18c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6z M12 14c1.105 0 2-0.895 2-2s-0.895-2-2-2-2 0.895-2 2 0.895 2 2 2z",
    "🔥": "M8.5 14.5c0-1.38 2.5-3.88 2.5-3.88s-2.5-2.5-2.5-3.88c0-1.38.5-2 1-3 1.072 2.143.224 4.054-2 6 .5-2.5 2-4.9 4-6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 1 2.5 2.5z",
    "💧": "M12 22a7 7 0 0 0 7-7c0-4.3-7-13-7-13S5 10.7 5 15a7 7 0 0 0 7 7z",
    "😌": "M12 3c-1.2 3.1-3 5.9-5.3 8.3C4.4 13.7 3 16.5 3 19.5c0 1.4 1.1 2.5 2.5 2.5 2.5 0 5-1.5 6.5-4 1.5 2.5 4 4 6.5 4 1.4 0 2.5-1.1 2.5-2.5 0-3-1.4-5.8-3.7-8.2C15 8.9 13.2 6.1 12 3z",
    "🧘": "M12 3c-1.2 3.1-3 5.9-5.3 8.3C4.4 13.7 3 16.5 3 19.5c0 1.4 1.1 2.5 2.5 2.5 2.5 0 5-1.5 6.5-4 1.5 2.5 4 4 6.5 4 1.4 0 2.5-1.1 2.5-2.5 0-3-1.4-5.8-3.7-8.2C15 8.9 13.2 6.1 12 3z",
    "🦠": "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4",
    "🛡️": "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4",
    "✨": "M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 15.6l2.8-2.8M15.6 5.6l2.8-2.8",
    "🫐": "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M12 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z M8 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z M16 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z",
    "🧠": "M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-3.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2z M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-3.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2z",
    "😴": "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z",
    "🌈": "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M7.5 12a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z M11.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z M16.5 11a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z M15.5 16a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z",
    "🍹": "M19 3H5v4l3 11v2h8v-2l3-11V3z M8 11h8",
    "🥃": "M19 3H5v4l3 11v2h8v-2l3-11V3z M8 11h8",
    "⚖️": "M12 3v18 M12 21h10 M12 21H2 M5 7h14",
    "🧖": "M12 2a5 5 0 0 0-5 5v3a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5z M12 18v4 M4.93 19a10 10 0 0 1 14.14 0",
    "🧴": "M12 2a5 5 0 0 0-5 5v3a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5z M12 18v4 M4.93 19a10 10 0 0 1 14.14 0",
    "💨": "M9.59 4.59A2 2 0 1 1 11 8H2 M12.59 19.41A2 2 0 1 0 14 16H2 M17.73 11.73a2.5 2.5 0 1 1 1.77 4.27H2",
    "🔄": "M21.5 2v6h-6 M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67",
    "🫁": "M12 5v14 M12 5c-1.5-2.5-4-3-6.5-2A6.5 6.5 0 0 0 4 16c1 2 3.5 3 6.5 2.5V5z M12 5c1.5-2.5 4-3 6.5-2a6.5 6.5 0 0 1 2 11c-1 2-3.5 3-6.5 2.5V5z",
    "🫀": "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
    "❤️": "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
    "🩸": "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
    "🍽️": "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4",
    "💪": "M6.5 6.5l11 11 M21 21l-1-1 M3 3l1 1 M18 22l4-4 M2 6l4-4",
    "🧬": "M4.5 10.5c.5-3 3-5.5 6-6 M13.5 19.5c3-.5 5.5-3 6-6 M22 2l-8 8 M10 14l-8 8 M2 2l20 20",
    "🫚": "M12 3a3 3 0 0 0-3 3v4a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z M19 14h-2a3 3 0 0 0-3 3v2a3 3 0 0 0 6 0v-2c0-.55-.45-1-1-1z M7 14H5a3 3 0 0 0-3 3v2a3 3 0 0 0 6 0v-2c0-.55-.45-1-1-1z",
    "🩺": "M4.5 2v5a7.5 7.5 0 0 0 15 0V2 M12 14.5V22 M12 22a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
    "☕": "M17 8h1a4 4 0 1 1 0 8h-1 M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z M6 2v2 M10 2v2 M14 2v2",
    "🏨": "M3 21V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18 M9 21v-4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4 M7 6h2v2H7z M15 6h2v2h-2z M7 11h2v2H7z M15 11h2v2h-2z",
    "🎁": "M20 12v10H4V12 M2 7h20v5H2z M12 22V7 M12 7H7.5a2.5 2.5 0 0 1 0-5c3.5 0 4.5 5 4.5 5z M12 7h4.5a2.5 2.5 0 0 0 0-5c-3.5 0-4.5 5-4.5 5z",
    "🛒": "M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2z M20 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2z M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6",
    "🏥": "M18 21h4V8h-4z M2 21h4V8H2z M6 21h12V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v18z M10 9h4 M12 7v4",
    "📦": "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8z M12 22V12 M12 12L3.8 7.3 M12 12l8.2-4.7"
  };
  const path = iconPaths[name];
  if (!path) {
    return React.createElement("span", { style: { fontSize: size, ...style } }, name);
  }
  return React.createElement(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: color,
      strokeWidth: "1.75",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      style,
    },
    React.createElement("path", { d: path })
  );
}
function openWhatsApp(e = "") {
  try {
    const m = {
      "Lemongrass Green Tea": "KT-8GBE-8MZG",
      "Blue Flower Green Tea": "BlueFlower-1",
      "Rum Green Tea": "RUM-1",
      "Spearmint Green Tea": "Spearmint",
      "Tulsi Green Tea": "MK-H5LY-IRK3",
      "Chamomile Green Tea": "Chamomile-1",
      "Whiskey Green Tea": "9E-23FO-LL8Q",
      "GABA Oolong Tea": "GABA",
      "Organic Green Tea": "Unflavoured-1",
      "Ginger Green Tea": "GINGER",
    };
    const s = m[e];
    if (s && typeof fbq !== "undefined") {
      fbq("track", "AddToCart", {
        content_ids: [s],
        content_type: "product",
        value: 499,
        currency: "INR",
      });
      fbq("track", "Purchase", {
        content_ids: [s],
        content_type: "product",
        value: 499,
        currency: "INR",
      });
    }
  } catch (err) {}
  window.open(
    `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(e ? `Hi Nevisan! I would like to order *${e}* (MRP ₹499 · 50 gm). Please help me with the order details.` : "Hi Nevisan! I would like to order your tea. Please help me with the details.")}`,
    "_blank",
  );
}
function NevLogo({ size: e = 56 }) {
  return React.createElement("img", {
    src: "nevisan-logo.jpeg",
    alt: "Nevisan",
    style: {
      width: e,
      height: e,
      objectFit: "cover",
      borderRadius: 8,
      display: "block",
      mixBlendMode: "multiply",
    },
  });
}
function HamburgerIcon({ open: e }) {
  return React.createElement(
    "div",
    {
      style: {
        width: 24,
        height: 18,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "pointer",
      },
    },
    [0, 1, 2].map((t) =>
      React.createElement("span", {
        key: t,
        style: {
          display: "block",
          height: 2,
          background: T.white,
          borderRadius: 2,
          transformOrigin: "left center",
          transition:
            "transform 300ms ease, opacity 300ms ease, width 300ms ease",
          transform: e
            ? 0 === t
              ? "rotate(43deg) translateY(-1px)"
              : 2 === t
                ? "rotate(-43deg) translateY(1px)"
                : "scaleX(0)"
            : "none",
          opacity: e && 1 === t ? 0 : 1,
          width: e ? "100%" : 1 === t ? "75%" : "100%",
        },
      }),
    ),
  );
}
function Nav({ page: e, setPage: t }) {
  const a = [
      "Home",
      "Collection",
      "Our Story",
      "About",
      "Journal",
      "Wholesale",
      "Contact",
      "FAQ",
      "Quiz",
      "Testimonials",
      "Blog",
      "Locations",
      "Bangalore",
      "Chennai",
      "Delhi",
      "Hyderabad",
      "Jaipur",
      "Kolkata",
      "Mumbai",
      "Pune",
    ],
    const locationUrls = {
      "Bangalore": "/locations/tea-delivery-bangalore/",
      "Chennai": "/locations/tea-delivery-chennai/",
      "Delhi": "/locations/tea-delivery-delhi/",
      "Hyderabad": "/locations/tea-delivery-hyderabad/",
      "Jaipur": "/locations/tea-delivery-jaipur/",
      "Kolkata": "/locations/tea-delivery-kolkata/",
      "Mumbai": "/locations/tea-delivery-mumbai/",
      "Pune": "/locations/tea-delivery-pune/",
    },
    n = "Home" === e,
    [o, i] = useState(!1),
    [r, l] = useState(!1),
    { isMobile: s } = useViewport();
  (useEffect(() => {
    const e = () => i(window.scrollY > 60);
    return (
      window.addEventListener("scroll", e, { passive: !0 }),
      () => window.removeEventListener("scroll", e)
    );
  }, []),
    useEffect(() => {
      s || l(!1);
    }, [s]),
    useEffect(
      () => (
        (document.body.style.overflow = r ? "hidden" : ""),
        () => {
          document.body.style.overflow = "";
        }
      ),
      [r],
    ));
  const c = (e) => {
    const locations = ["Bangalore", "Chennai", "Delhi", "Hyderabad", "Jaipur", "Kolkata", "Mumbai", "Pune"];
    if (locations.includes(e)) {
      window.location.href = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, "") + "/locations/tea-delivery-" + e.toLowerCase() + "/";
    } else if ("FAQ" === e) {
      window.location.href = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, "") + "/faq/";
    } else if ("Quiz" === e) {
      window.location.href = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, "") + "/quiz/";
    } else if ("Testimonials" === e) {
      window.location.href = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, "") + "/testimonials.html";
    } else if ("Blog" === e) {
      window.location.href = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, "") + "/blog.html";
    } else {
      t(e);
      l(!1);
    }
  };
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      "nav",
      {
        style: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: n ? (o ? "rgba(21, 39, 27, 0.95)" : "transparent") : T.teal,
          backdropFilter: (n && o) || r ? "blur(16px)" : "none",
          transition: "background 400ms ease",
          borderBottom: n && o ? "1px solid rgba(255,255,255,0.08)" : "none",
        },
      },
      React.createElement(
        "div",
        {
          style: {
            maxWidth: 1200,
            margin: "0 auto",
            padding: s ? "0 20px" : "0 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 68,
          },
        },
        React.createElement(
          "div",
          {
            style: {
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 10,
            },
            onClick: () => c("Home"),
          },
          React.createElement(NevLogo, { size: 42 }),
          React.createElement(
            "span",
            {
              style: {
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: s ? 15 : 18,
                color: T.white,
                letterSpacing: "0.18em",
                fontWeight: 400,
              },
            },
            "NEVISAN",
          ),
        ),
        !s &&
          React.createElement(
            "div",
            { style: { display: "flex", gap: 20, alignItems: "center" } },
            a.map((t) => {
              if (locationUrls[t]) {
                return React.createElement(
                  "a",
                  {
                    key: t,
                    href: locationUrls[t],
                    style: {
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: 12,
                      fontWeight: 400,
                      color: "rgba(255,255,255,0.82)",
                      transition: "color 150ms",
                      padding: 0,
                      textDecoration: "none",
                    },
                    onMouseEnter: (a) => {
                      a.currentTarget.style.color = "#fff";
                    },
                    onMouseLeave: (a) => {
                      a.currentTarget.style.color = "rgba(255,255,255,0.82)";
                    },
                  },
                  t,
                );
              }
              if (t === "Locations") {
                return React.createElement(
                  "a",
                  {
                    key: t,
                    href: "/locations/",
                    style: {
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: 12,
                      fontWeight: 400,
                      color: "rgba(255,255,255,0.82)",
                      transition: "color 150ms",
                      padding: 0,
                      textDecoration: "none",
                    },
                    onMouseEnter: (a) => {
                      a.currentTarget.style.color = "#fff";
                    },
                    onMouseLeave: (a) => {
                      a.currentTarget.style.color = "rgba(255,255,255,0.82)";
                    },
                  },
                  t,
                );
              }
              return React.createElement(
                "button",
                {
                  key: t,
                  onClick: () => c(t),
                  style: {
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 12,
                    fontWeight: 400,
                    color: e === t ? T.gold : "rgba(255,255,255,0.82)",
                    transition: "color 150ms",
                    padding: 0,
                  },
                  onMouseEnter: (a) => {
                    e !== t && (a.currentTarget.style.color = "#fff");
                  },
                  onMouseLeave: (a) => {
                    e !== t &&
                      (a.currentTarget.style.color = "rgba(255,255,255,0.82)");
                  },
                },
                t,
              );
            }),
            React.createElement(
              "button",
              {
                onClick: () => c("Collection"),
                style: {
                  background: T.gold,
                  color: T.tealDark,
                  border: "none",
                  borderRadius: 9999,
                  padding: "9px 22px",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  transition: "transform 200ms, box-shadow 200ms",
                  boxShadow: "0 2px 12px rgba(201,168,76,0.3)",
                },
                onMouseEnter: (e) => {
                  ((e.currentTarget.style.transform = "scale(1.05)"),
                    (e.currentTarget.style.boxShadow =
                      "0 4px 20px rgba(201,168,76,0.5)"));
                },
                onMouseLeave: (e) => {
                  ((e.currentTarget.style.transform = "scale(1)"),
                    (e.currentTarget.style.boxShadow =
                      "0 2px 12px rgba(201,168,76,0.3)"));
                },
              },
              "Shop Now",
            ),
          ),
        s &&
          React.createElement(
            "div",
            { style: { display: "flex", alignItems: "center", gap: 16 } },
            React.createElement(
              "button",
              {
                onClick: () => openWhatsApp(),
                style: {
                  background: "#25D366",
                  color: "#fff",
                  border: "none",
                  borderRadius: 9999,
                  padding: "7px 14px",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'Plus Jakarta Sans'",
                },
              },
              "💬 Order",
            ),
            React.createElement(
              "button",
              {
                onClick: () => l((e) => !e),
                "aria-label": r ? "Close menu" : "Open menu",
                style: {
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 4,
                },
              },
              React.createElement(HamburgerIcon, { open: r }),
            ),
          ),
      ),
    ),
    s &&
      React.createElement(
        "div",
        {
          style: {
            position: "fixed",
            top: 68,
            left: 0,
            right: 0,
            height: 40,
            background: o ? "rgba(21, 39, 27, 0.96)" : "rgba(35, 65, 45, 0.98)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            backdropFilter: "blur(12px)",
            zIndex: 98,
            display: "flex",
            alignItems: "center",
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            padding: "0 16px",
            gap: 20,
          },
        },
        a.map((t) => {
          const isActive = e === t;
          if (locationUrls[t]) {
            return React.createElement(
              "a",
              {
                key: t,
                href: locationUrls[t],
                style: {
                  background: "none",
                  border: "none",
                  color: "rgba(255,255,255,0.65)",
                  fontFamily: "'Plus Jakarta Sans'",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  padding: "8px 0",
                  position: "relative",
                  transition: "color 200ms ease",
                  textDecoration: "none",
                },
              },
              t,
            );
          }
          if (t === "Locations") {
            return React.createElement(
              "a",
              {
                key: t,
                href: "/locations/",
                style: {
                  background: "none",
                  border: "none",
                  color: "rgba(255,255,255,0.65)",
                  fontFamily: "'Plus Jakarta Sans'",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  padding: "8px 0",
                  position: "relative",
                  transition: "color 200ms ease",
                  textDecoration: "none",
                },
              },
              t,
            );
          }
          return React.createElement(
            "button",
            {
              key: t,
              onClick: () => c(t),
              style: {
                background: "none",
                border: "none",
                color: isActive ? T.gold : "rgba(255,255,255,0.65)",
                fontFamily: "'Plus Jakarta Sans'",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                cursor: "pointer",
                padding: "8px 0",
                position: "relative",
                transition: "color 200ms ease",
              },
            },
            t,
            isActive &&
              React.createElement("div", {
                style: {
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: T.gold,
                  borderRadius: 1,
                },
              }),
          );
        }),
      ),
    s &&
      r &&
      React.createElement(
        "div",
        {
          style: {
            position: "fixed",
            inset: 0,
            zIndex: 99,
            background: T.tealDark,
            display: "flex",
            flexDirection: "column",
            paddingTop: 68,
            animation: "overlay-fade 0.25s ease both",
          },
        },
        React.createElement(
          "div",
          {
            style: {
              padding: "32px 28px",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            },
          },
          a.map((t, n) => {
            if (locationUrls[t]) {
              return React.createElement(
                "a",
                {
                  key: t,
                  href: locationUrls[t],
                  style: {
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: 28,
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.85)",
                    padding: "14px 0",
                    textDecoration: "none",
                    borderBottom:
                      n < a.length - 1
                        ? "1px solid rgba(255,255,255,0.08)"
                        : "none",
                    animation: `menu-open 0.3s ease ${0.06 * n}s both`,
                  },
                },
                t,
              );
            }
            if (t === "Locations") {
              return React.createElement(
                "a",
                {
                  key: t,
                  href: "/locations/",
                  style: {
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: 28,
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.85)",
                    padding: "14px 0",
                    textDecoration: "none",
                    borderBottom:
                      n < a.length - 1
                        ? "1px solid rgba(255,255,255,0.08)"
                        : "none",
                    animation: `menu-open 0.3s ease ${0.06 * n}s both`,
                  },
                },
                t,
              );
            }
            return React.createElement(
              "button",
              {
                key: t,
                onClick: () => c(t),
                style: {
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 28,
                  fontWeight: 400,
                  color: e === t ? T.gold : "rgba(255,255,255,0.85)",
                  padding: "14px 0",
                  borderBottom:
                    n < a.length - 1
                      ? "1px solid rgba(255,255,255,0.08)"
                      : "none",
                  animation: `menu-open 0.3s ease ${0.06 * n}s both`,
                },
              },
              t,
            );
          }),
          React.createElement(
            "div",
            {
              style: {
                marginTop: 32,
                animation: "menu-open 0.3s ease 0.35s both",
              },
            },
            React.createElement(
              RippleButton,
              {
                onClick: () => {
                  c("Collection");
                },
                style: {
                  width: "100%",
                  background: T.gold,
                  color: T.tealDark,
                  border: "none",
                  borderRadius: 9999,
                  padding: "16px",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "'Plus Jakarta Sans'",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                },
                hoverStyle: { filter: "brightness(1.05)" },
              },
              "Shop the Collection",
            ),
            React.createElement(
              "button",
              {
                onClick: () => openWhatsApp(),
                style: {
                  marginTop: 12,
                  width: "100%",
                  background: "#25D366",
                  color: "#fff",
                  border: "none",
                  borderRadius: 9999,
                  padding: "16px",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "'Plus Jakarta Sans'",
                },
              },
              "💬 Order on WhatsApp",
            ),
          ),
          React.createElement(
            "div",
            {
              style: {
                marginTop: 32,
                animation: "menu-open 0.3s ease 0.42s both",
              },
            },
            React.createElement(
              "div",
              {
                style: {
                  fontFamily: "'Plus Jakarta Sans'",
                  fontSize: 12,
                  color: "rgba(255,255,255,0.4)",
                  marginBottom: 8,
                },
              },
              "nevisan12@gmail.com",
            ),
            React.createElement(
              "div",
              {
                style: {
                  fontFamily: "'Plus Jakarta Sans'",
                  fontSize: 12,
                  color: "rgba(255,255,255,0.4)",
                },
              },
              "+91 98642 45687",
            ),
          ),
        ),
      ),
  );
}
function Ticker() {
  const e = [
      "PESTICIDE-FREE",
      "FSSAI APPROVED",
      "CAN BE STEEPED TWICE",
      "HANDCRAFTED IN ASSAM",
      "SINGLE ORIGIN",
      "PGS-INDIA ORGANIC",
      "MADE IN INDIA",
      "WHOLE LEAF",
    ],
    t = [...e, ...e];
  return React.createElement(
    "div",
    { style: { background: T.teal, overflow: "hidden", padding: "12px 0" } },
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          gap: 48,
          animation: "ticker 28s linear infinite",
          width: "max-content",
        },
      },
      t.map((e, t) =>
        React.createElement(
          "span",
          {
            key: t,
            style: {
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.12em",
              color: "rgba(255,255,255,0.9)",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              gap: 12,
            },
          },
          React.createElement(
            "span",
            { style: { color: T.gold, fontSize: 8 } },
            "●",
          ),
          e,
        ),
      ),
    ),
  );
}
function Hero({ setPage: e }) {
  const [t, a] = useState(!1),
    [n, o] = useInView(0.1),
    { isMobile: i } = useViewport(),
    r = useRef(null),
    l = useRef(null);
  return (
    useEffect(() => {
      const e = setTimeout(() => a(!0), 200);
      return () => clearTimeout(e);
    }, []),
    useEffect(() => {
      const e = r.current,
        t = l.current;
      if (!e || !t) return;
      const a = gsap.context(() => {
        gsap.to(t, {
          scrollTrigger: {
            trigger: e,
            start: "top top",
            end: "bottom top",
            scrub: !0,
          },
          scale: 1.5,
          opacity: 0,
          transformOrigin: "center center",
          ease: "none",
        });
      });
      return () => a.revert();
    }, []),
    React.createElement(
      "div",
      {
        ref: r,
        style: {
          position: "relative",
          height: "100vh",
          minHeight: 620,
          overflow: "hidden",
          background: T.tealDark,
        },
      },
      React.createElement(
        "div",
        {
          ref: l,
          style: {
            position: "absolute",
            inset: 0,
            zIndex: 0,
            overflow: "hidden",
          },
        },
        i
          ? React.createElement("img", {
              src: "hero-mobile.jpg?v=2",
              alt: "Nevisan tea garden in Golaghat Assam - single-origin whole-leaf tea",
              fetchpriority: "high",
              width: "800",
              height: "1200",
              style: {
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                filter: "saturate(1.1) brightness(0.78)",
              },
            })
          : React.createElement(
              "video",
              {
                autoPlay: !0,
                muted: !0,
                loop: !0,
                playsInline: !0,
                poster: "hero-bg.jpg",
                style: {
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "saturate(1.15) brightness(0.78)",
                },
              },
              React.createElement("source", {
                src: "tea-garden.mp4",
                type: "video/mp4",
              }),
              React.createElement("track", {
                kind: "captions",
                src: "captions.vtt",
                srcLang: "en",
                label: "English",
                default: !0,
              }),
            ),
      ),
      React.createElement("div", {
        style: {
          position: "absolute",
          inset: 0,
          zIndex: 3,
          background:
            "linear-gradient(to right, rgba(8,28,18,0.72) 0%, rgba(8,28,18,0.45) 40%, rgba(8,28,18,0.15) 70%, rgba(8,28,18,0.02) 100%)",
          pointerEvents: "none",
        },
      }),
      React.createElement("div", {
        style: {
          position: "absolute",
          inset: 0,
          zIndex: 3,
          background:
            "linear-gradient(to top, rgba(5,18,10,0.75) 0%, rgba(5,18,10,0.2) 22%, transparent 42%)",
          pointerEvents: "none",
        },
      }),
      React.createElement(
        "div",
        {
          style: {
            position: "relative",
            zIndex: 10,
            maxWidth: 1200,
            margin: "0 auto",
            padding: i ? "108px 22px 0" : "0 40px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          },
        },
        React.createElement(
          "div",
          { style: { maxWidth: i ? "100%" : 620 } },
          React.createElement(
            "div",
            {
              style: {
                fontFamily: "'Plus Jakarta Sans'",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.18em",
                color: T.gold,
                textTransform: "uppercase",
                marginBottom: 24,
                opacity: t ? 1 : 0,
                transform: t ? "translateY(0)" : "translateY(20px)",
                transition:
                  "opacity 0.7s ease-out 0.1s, transform 0.7s ease-out 0.1s",
                display: "flex",
                alignItems: "center",
                gap: 12,
              },
            },
            React.createElement("div", {
              style: { width: 32, height: 1, background: T.gold },
            }),
            "Single Origin · Golaghat, Assam",
            React.createElement("div", {
              style: { width: 32, height: 1, background: T.gold },
            }),
          ),
          React.createElement(
            "div",
            { style: { overflow: "hidden", marginBottom: 4 } },
            React.createElement(
              "h1",
              {
                style: {
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 400,
                  fontSize: "clamp(44px, 5.5vw, 78px)",
                  lineHeight: 1.08,
                  color: T.white,
                  opacity: t ? 1 : 0,
                  transform: t ? "translateY(0)" : "translateY(40px)",
                  transition:
                    "opacity 0.8s ease-out 0.25s, transform 0.8s ease-out 0.25s",
                },
              },
              "Tea as it was",
            ),
          ),
          React.createElement(
            "div",
            {
              style: {
                overflow: "hidden",
                marginBottom: 28,
                position: "relative",
                display: "inline-block",
              },
            },
            React.createElement(
              "h1",
              {
                style: {
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 400,
                  fontStyle: "italic",
                  fontSize: "clamp(44px, 5.5vw, 78px)",
                  lineHeight: 1.08,
                  color: T.gold,
                  opacity: t ? 1 : 0,
                  transform: t ? "translateY(0)" : "translateY(40px)",
                  transition:
                    "opacity 0.8s ease-out 0.45s, transform 0.8s ease-out 0.45s",
                  display: "block",
                  animation: t
                    ? "gold-pulse 4s ease-in-out 1.5s infinite"
                    : "none",
                },
              },
              "meant to grow.",
            ),
            React.createElement("div", {
              style: {
                position: "absolute",
                bottom: 6,
                left: 0,
                height: 2,
                background: `linear-gradient(to right, ${T.gold}, transparent)`,
                width: t ? "100%" : "0%",
                transition: "width 1.1s ease-out 1.1s",
              },
            }),
          ),
          React.createElement(
            "p",
            {
              style: {
                fontFamily: "'Plus Jakarta Sans'",
                fontSize: 17,
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.72)",
                maxWidth: 460,
                marginBottom: 44,
                opacity: t ? 1 : 0,
                transform: t ? "translateY(0)" : "translateY(24px)",
                transition:
                  "opacity 0.8s ease-out 0.65s, transform 0.8s ease-out 0.65s",
              },
            },
            "Ten teas. One garden in Golaghat, Assam. Whole leaf, nothing added, nothing hidden.",
          ),
          React.createElement(
            "div",
            {
              style: {
                display: "flex",
                gap: 16,
                flexWrap: "wrap",
                opacity: t ? 1 : 0,
                transform: t ? "translateY(0)" : "translateY(20px)",
                transition:
                  "opacity 0.8s ease-out 0.85s, transform 0.8s ease-out 0.85s",
              },
            },
            React.createElement(
              RippleButton,
              {
                onClick: () => e("Collection"),
                style: {
                  background: T.gold,
                  color: T.tealDark,
                  border: "none",
                  borderRadius: 9999,
                  padding: "15px 40px",
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'Plus Jakarta Sans'",
                  boxShadow: "0 4px 20px rgba(201,168,76,0.35)",
                },
                hoverStyle: {
                  transform: "scale(1.05)",
                  boxShadow: "0 8px 32px rgba(201,168,76,0.55)",
                },
              },
              "Explore Collection",
            ),
            React.createElement(
              "button",
              {
                onClick: () => e("Our Story"),
                style: {
                  background: "transparent",
                  color: T.white,
                  border: "1px solid rgba(255,255,255,0.35)",
                  borderRadius: 9999,
                  padding: "15px 36px",
                  fontSize: 15,
                  fontWeight: 400,
                  cursor: "pointer",
                  fontFamily: "'Plus Jakarta Sans'",
                  transition: "border-color 200ms, background 200ms",
                  backdropFilter: "blur(8px)",
                },
                onMouseEnter: (e) => {
                  ((e.currentTarget.style.borderColor =
                    "rgba(255,255,255,0.7)"),
                    (e.currentTarget.style.background =
                      "rgba(255,255,255,0.08)"));
                },
                onMouseLeave: (e) => {
                  ((e.currentTarget.style.borderColor =
                    "rgba(255,255,255,0.35)"),
                    (e.currentTarget.style.background = "transparent"));
                },
              },
              "Our Story",
            ),
          ),
          React.createElement(
            "div",
            {
              ref: n,
              style: {
                display: "flex",
                gap: i ? 28 : 40,
                marginTop: i ? 40 : 56,
                opacity: t ? 1 : 0,
                transition: "opacity 0.8s ease-out 1.1s",
              },
            },
            [
              { label: "Varieties", target: 10, suffix: "" },
              { label: "Origin", target: 1, suffix: "" },
              { label: "Organic", target: 100, suffix: "%" },
            ].map(({ label: e, target: a, suffix: n }) =>
              React.createElement(
                "div",
                { key: e, style: { textAlign: "left" } },
                React.createElement(
                  "div",
                  {
                    style: {
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: 32,
                      color: T.gold,
                      lineHeight: 1,
                      fontWeight: 400,
                    },
                  },
                  React.createElement(AnimatedNumber, {
                    target: a,
                    suffix: n,
                    inView: o && t,
                  }),
                ),
                React.createElement(
                  "div",
                  {
                    style: {
                      fontFamily: "'Plus Jakarta Sans'",
                      fontSize: 11,
                      color: "rgba(255,255,255,0.45)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginTop: 5,
                    },
                  },
                  e,
                ),
              ),
            ),
          ),
        ),
      ),
      React.createElement(
        "div",
        {
          style: {
            position: "absolute",
            bottom: 36,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            zIndex: 10,
          },
        },
        React.createElement("div", {
          style: {
            width: 1,
            height: 48,
            background:
              "linear-gradient(to bottom, transparent, rgba(255,255,255,0.4))",
            animation: "float 2.5s ease-in-out infinite",
          },
        }),
        React.createElement(
          "span",
          {
            style: {
              fontSize: 9,
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.14em",
              fontFamily: "'Plus Jakarta Sans'",
            },
          },
          "SCROLL",
        ),
      ),
    )
  );
}
function RippleButton({
  children: e,
  onClick: t,
  style: a = {},
  hoverStyle: n = {},
  className: sClass = "",
}) {
  const [o, i] = useState([]),
    [r, l] = useState(!1),
    s = useRef(null),
    c = {
      position: "relative",
      overflow: "hidden",
      transition: "transform 200ms ease, box-shadow 200ms ease",
      ...a,
      ...(r ? n : {}),
    };
  return React.createElement(
    "button",
    {
      ref: s,
      style: c,
      className: sClass,
      onClick: (e) => {
        const a = s.current.getBoundingClientRect(),
          n = e.clientX - a.left,
          o = e.clientY - a.top,
          r = Date.now();
        (i((e) => [...e, { x: n, y: o, id: r }]),
          setTimeout(() => i((e) => e.filter((e) => e.id !== r)), 600),
          t && t(e));
      },
      onMouseEnter: () => l(!0),
      onMouseLeave: () => l(!1),
    },
    e,
    o.map((e) =>
      React.createElement("span", {
        key: e.id,
        style: {
          position: "absolute",
          left: e.x - 20,
          top: e.y - 20,
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.35)",
          animation: "ripple-effect 0.6s ease-out forwards",
          pointerEvents: "none",
        },
      }),
    ),
  );
}
const TEAS = [
  {
    name: "Lemongrass Green Tea",
    short: "Your morning cup, but brighter. Whole-leaf Assam with lemongrass that actually settles your stomach and clears your head.",
    tags: ["DIGESTION", "METABOLISM"],
    bg: "#d4edd8",
    color: "#3a7a50",
    img: "teas/lemongrass.webp?v=2",
    price: 499,
    brew: "90°C · 2–3 min · Can steep twice",
    benefits: [
      {
        icon: "🌿",
        title: "Aids Digestion",
        desc: "Lemongrass eases the digestive tract — less bloating, fewer cramps, better mornings.",
      },
      {
        icon: "🔥",
        title: "Boosts Metabolism",
        desc: "Citral — the compound that gives lemongrass its smell — activates enzymes that help your body burn fat more efficiently.",
      },
      {
        icon: "💧",
        title: "Detoxifying",
        desc: "Gently flushes toxins without dehydrating you — a natural diuretic that actually leaves you feeling better.",
      },
      {
        icon: "😌",
        title: "Reduces Anxiety",
        desc: "Mild calming properties make this a good mid-afternoon cup when the day starts to feel too loud.",
      },
      {
        icon: "🦠",
        title: "Anti-microbial",
        desc: "Naturally antimicrobial — keeps gut flora healthier and builds resistance over time.",
      },
    ],
  },
  {
    name: "Blue Flower Green Tea",
    short: "It turns blue in the cup and purple when you add lemon. That's not a trick — butterfly pea petals are one of the most antioxidant-dense things you can drink.",
    tags: ["CALMING", "ANTIOXIDANT"],
    bg: "#c8dff0",
    color: "#2a5a8a",
    img: "teas/blue-flower.webp?v=2",
    price: 499,
    brew: "85°C · 2–3 min · No milk needed",
    benefits: [
      {
        icon: "🫐",
        title: "Rich in Antioxidants",
        desc: "Butterfly pea petals have some of the highest anthocyanin content of any plant — a serious antioxidant, not just a pretty colour.",
      },
      {
        icon: "🧠",
        title: "Enhances Brain Function",
        desc: "Shown to improve memory and focus without caffeine — so you get the clarity without the crash later.",
      },
      {
        icon: "✨",
        title: "Skin & Hair Health",
        desc: "Anthocyanins help your body produce more collagen — which shows up in your skin and hair over time.",
      },
      {
        icon: "😴",
        title: "Calming & Sleep-Supportive",
        desc: "Lightly calming — reduces cortisol and helps your body wind down without any side effects.",
      },
      {
        icon: "🌈",
        title: "Changes Colour with Lemon",
        desc: "Add a slice of lemon and it shifts from deep blue to purple-pink. Pure pH chemistry, no additives.",
      },
    ],
  },
  {
    name: "Rum Green Tea",
    short: "We tried 14 versions before this one was right. Warm sugarcane and oak, completely non-alcoholic. It tastes like an evening ritual should.",
    tags: ["NON-ALC", "EXOTIC"],
    bg: "#f5e9a0",
    color: "#8a6a10",
    img: "teas/rum.webp?v=2",
    price: 499,
    bestseller: !0,
    brew: "90°C · 3 min · Excellent hot or iced",
    benefits: [
      {
        icon: "🍹",
        title: "100% Non-Alcoholic",
        desc: "Everything that makes rum feel good in the evening — the warmth, the depth — without a drop of alcohol.",
      },
      {
        icon: "😊",
        title: "Mood Lifting",
        desc: "The warm spice profile genuinely triggers a relaxation response — it's not just placebo.",
      },
      {
        icon: "💚",
        title: "Green Tea Antioxidants",
        desc: "Underneath the rum character is whole-leaf Assam green tea, which means EGCG antioxidants in every cup.",
      },
      {
        icon: "🌿",
        title: "Natural Botanicals Only",
        desc: "The flavour is built from natural botanicals — no artificial additives, no shortcuts.",
      },
      {
        icon: "🔄",
        title: "Multi-Steep Value",
        desc: "Because it's whole leaf, you get a genuinely good second steep. Two cups from one serving.",
      },
    ],
  },
  {
    name: "Spearmint Green Tea",
    short: "Two cups a day, and most people notice a difference in their skin within a few weeks. Spearmint is one of the most clinically backed herbs for hormonal balance.",
    tags: ["HORMONAL", "SKIN"],
    bg: "#e8d4f0",
    color: "#6a3a8a",
    img: "teas/spearmint.webp?v=2",
    price: 499,
    brew: "85°C · 2 min · Light and refreshing",
    benefits: [
      {
        icon: "⚖️",
        title: "Hormonal Balance",
        desc: "Clinically shown to lower excess androgens — the mechanism behind its effect on hormonal skin and PCOS.",
      },
      {
        icon: "🧖",
        title: "Reduces Acne",
        desc: "When androgens drop, so does sebum production. That's why spearmint has such a consistent effect on hormonal acne.",
      },
      {
        icon: "💨",
        title: "Fresh Breath & Digestion",
        desc: "Calms the gut, eases nausea, and freshens breath — the kind of herb that does more than one thing well.",
      },
      {
        icon: "🧠",
        title: "Improves Memory",
        desc: "A study found spearmint extract improved working memory scores measurably after a few weeks of daily use.",
      },
      {
        icon: "🌸",
        title: "Anti-Inflammatory",
        desc: "High in rosmarinic acid, which reduces systemic inflammation — including joint discomfort.",
      },
    ],
  },
  {
    name: "Tulsi Green Tea",
    short: "Tulsi has been used as a stress herb for thousands of years. We pair it with Assam green tea because together they do something the separate ingredients can't manage alone.",
    tags: ["IMMUNITY", "STRESS"],
    bg: "#d4edd8",
    color: "#3a7a50",
    img: "teas/tulsi.webp?v=2",
    price: 499,
    brew: "90°C · 3–4 min · Best plain or with honey",
    benefits: [
      {
        icon: "🛡️",
        title: "Immunity Booster",
        desc: "Tulsi has been used as an immunity herb across Ayurvedic medicine for centuries. Modern research backs it up.",
      },
      {
        icon: "🧘",
        title: "Stress & Anxiety Relief",
        desc: "Measurably reduces cortisol — your body's main stress hormone — without making you drowsy.",
      },
      {
        icon: "🫁",
        title: "Respiratory Health",
        desc: "Opens airways, soothes sore throats, eases congestion. The cup most people reach for when the weather changes.",
      },
      {
        icon: "🩸",
        title: "Blood Sugar Support",
        desc: "Multiple clinical studies show Tulsi moderates post-meal blood sugar spikes — especially relevant for diabetics.",
      },
      {
        icon: "🌱",
        title: "Detox & Liver Health",
        desc: "Supports liver function and helps the body clear waste — a gentle, daily detox.",
      },
    ],
  },
  {
    name: "Chamomile Green Tea",
    short: "The one you drink an hour before bed. Chamomile and L-theanine don't knock you out — they just make the evening quieter.",
    tags: ["SLEEP", "CALMING"],
    bg: "#f5e9a0",
    color: "#8a6a10",
    img: "teas/chamomile.webp?v=2",
    price: 499,
    brew: "85°C · 4 min · Best before bed",
    benefits: [
      {
        icon: "😴",
        title: "Deep Sleep Aid",
        desc: "Chamomile contains apigenin — a compound that literally binds to the same brain receptors as sleep medication, just very gently.",
      },
      {
        icon: "😌",
        title: "Anxiety & Stress Relief",
        desc: "Clinically shown to reduce anxiety symptoms. It calms without the next-day fog.",
      },
      {
        icon: "🫀",
        title: "Heart Health",
        desc: "The antioxidants work on LDL cholesterol and cardiovascular health with sustained daily use.",
      },
      {
        icon: "🍽️",
        title: "Digestive Comfort",
        desc: "Calms stomach cramps and IBS symptoms. Best drunk about 30 minutes after eating.",
      },
      {
        icon: "🧴",
        title: "Skin Healing",
        desc: "Anti-inflammatory compounds reduce redness and eczema, and speed up the skin's natural healing.",
      },
    ],
  },
  {
    name: "Whiskey Green Tea",
    short: "Peat smoke and malt, no alcohol. Made for people who want something bold in the evening without paying for it the next morning.",
    tags: ["NON-ALC", "BOLD"],
    bg: "#e0d4c8",
    color: "#5a4030",
    img: "teas/whiskey.webp?v=2",
    price: 499,
    brew: "90°C · 3 min · Bold, best enjoyed slowly",
    benefits: [
      {
        icon: "🥃",
        title: "100% Non-Alcoholic",
        desc: "Peat, malt, and smoke — built entirely from natural botanicals. The character is real; the alcohol isn't.",
      },
      {
        icon: "💚",
        title: "Green Tea Antioxidants",
        desc: "The Assam green tea base delivers EGCG — one of the most studied antioxidants in nature.",
      },
      {
        icon: "🔥",
        title: "Metabolism Boost",
        desc: "Green tea catechins increase fat oxidation, which is why metabolic benefits show up consistently in research.",
      },
      {
        icon: "🧠",
        title: "Mental Alertness",
        desc: "The L-theanine and caffeine in green tea work together — you get focus, not jitters.",
      },
      {
        icon: "🌿",
        title: "All Natural",
        desc: "The smokiness comes from natural woody botanicals — no artificial flavouring, no shortcuts.",
      },
    ],
  },
  {
    name: "GABA Oolong Tea",
    short: "GABA is what your brain produces to calm itself down. This tea has measurably higher GABA content than regular oolong — the processing method is the reason.",
    tags: ["RELAXATION", "FOCUS"],
    bg: "#c0e0dc",
    color: "#1b7a82",
    img: "teas/gaba.webp?v=2",
    price: 499,
    brew: "85°C · 3 min · Nitrogen-anaerobic processed",
    benefits: [
      {
        icon: "🧘",
        title: "Deep Relaxation",
        desc: "GABA is the neurotransmitter your brain uses to slow down. The anaerobic processing concentrates it in the leaf.",
      },
      {
        icon: "🧠",
        title: "Mental Clarity",
        desc: "Reduces anxiety without making you foggy. You're calmer, but still sharp — which is a rare combination.",
      },
      {
        icon: "😴",
        title: "Better Sleep Quality",
        desc: "Higher GABA means faster sleep onset and deeper sleep stages — without the morning grogginess of supplements.",
      },
      {
        icon: "💪",
        title: "Muscle Recovery",
        desc: "GABA stimulates growth hormone release, which helps with muscle recovery after training.",
      },
      {
        icon: "❤️",
        title: "Blood Pressure Support",
        desc: "Studies in hypertensive patients show measurable blood pressure reductions with regular GABA oolong consumption.",
      },
    ],
  },
  {
    name: "Organic Green Tea",
    short: "Just the leaf. Nothing else. If you've only had green tea from a bag, this is what it actually tastes like when it's made properly.",
    tags: ["ORGANIC", "PURE"],
    bg: "#c8e8c0",
    color: "#2a6a2a",
    img: "teas/organic.webp?v=2",
    price: 499,
    badge: "ORGANIC",
    brew: "80°C · 2 min · Never boiling water",
    benefits: [
      {
        icon: "🌱",
        title: "PGS-India Certified Organic",
        desc: "Third-party verified, pesticide-free. PGS-India is a government-recognised certification, not a label you can just print.",
      },
      {
        icon: "⚡",
        title: "Clean, Sustained Energy",
        desc: "Whole-leaf caffeine combined with L-theanine gives you steady energy — the kind that doesn't drop off at 3pm.",
      },
      {
        icon: "🛡️",
        title: "Powerful Antioxidants",
        desc: "EGCG is one of the most researched compounds in nutrition. It fights free radicals, reduces inflammation, and supports long-term health.",
      },
      {
        icon: "🏃",
        title: "Fat Burning",
        desc: "Research puts fat oxidation increases at up to 17% with regular green tea consumption. Real numbers, not marketing.",
      },
      {
        icon: "🧬",
        title: "Anti-Ageing",
        desc: "The polyphenols in green tea protect DNA from oxidative damage — which is part of why it's linked to longevity.",
      },
    ],
  },
  {
    name: "Ginger Green Tea",
    short: "The one to reach for when something feels off, or when it's cold outside and you want something that warms you from the inside.",
    tags: ["IMMUNITY", "WARMING"],
    bg: "#fdf2e9",
    color: "#935116",
    img: "teas/ginger.webp?v=2",
    price: 499,
    badge: "IMMUNE BOOST",
    brew: "85°C · 2–3 min · Best warm",
    benefits: [
      {
        icon: "🫚",
        title: "Immune Booster",
        desc: "Gingerols and shogaols directly enhance white blood cell activity — your front-line immune defence.",
      },
      {
        icon: "🔥",
        title: "Soothing Warmth",
        desc: "Increases circulation to the extremities and soothes dry, scratchy throats faster than most things.",
      },
      {
        icon: "😌",
        title: "Stomach Settler",
        desc: "One of the most consistently effective natural remedies for nausea and motion sickness — backed by good research.",
      },
      {
        icon: "💪",
        title: "Anti-Inflammatory",
        desc: "Measurably reduces inflammatory markers — helpful for muscle soreness and joint pain.",
      },
      {
        icon: "🩺",
        title: "Cardio Health",
        desc: "Supports healthy blood sugar levels and helps keep blood vessels functioning well.",
      },
    ],
  },
];
function TeaSpecsAndShippingPanel({ tea: e }) {
  if (!e.specs) return null;
  const specItems = [];
  [
    { label: "Ingredients", value: e.specs.ingredients },
    { label: "Origin", value: "Golaghat, Assam (95m)" },
    { label: "Harvest", value: e.specs.harvest },
    { label: "Caffeine", value: e.specs.caffeine },
    { label: "Water Temp", value: e.specs.temp },
    { label: "Steep Time", value: e.specs.time },
    { label: "Infusions", value: e.specs.infusions },
    { label: "Palate", value: e.specs.profile },
  ].forEach(({ label, value }) => {
    specItems.push(React.createElement("dt", { key: `dt-${label}`, style: { fontWeight: 600, color: T.teal, margin: 0 } }, label));
    specItems.push(React.createElement("dd", { key: `dd-${label}`, style: { color: T.textMuted, margin: 0, paddingLeft: 4 } }, value));
  });
  return React.createElement(
    "div",
    {
      style: {
        background: "rgba(0,0,0,0.02)",
        border: "1px solid rgba(0,0,0,0.04)",
        padding: 8,
        borderRadius: 24,
        marginTop: 18,
        marginBottom: 20,
      }
    },
    React.createElement(
      "div",
      {
        style: {
          background: "#fff",
          border: "1px solid rgba(0,0,0,0.05)",
          borderRadius: 18,
          padding: 16,
          boxShadow: "inset 0 1px 1px rgba(255,255,255,0.9)",
        }
      },
      React.createElement(
        "dl",
        {
          style: {
            display: "grid",
            gridTemplateColumns: "110px 1fr",
            gap: "8px 12px",
            fontSize: 12.5,
            lineHeight: 1.45,
            margin: 0,
            paddingBottom: 16,
            borderBottom: `1px solid ${T.border}`,
          },
        },
        specItems
      ),
      React.createElement(
        "div",
        {
          style: {
            marginTop: 16,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            fontSize: 12,
            lineHeight: 1.45,
          },
        },
        [
          React.createElement(
            "div",
            { key: "ship", style: { display: "flex", alignItems: "center", gap: 8 } },
            React.createElement(
              "svg",
              { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "#C9A84C", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
              React.createElement("rect", { x: "1", y: "3", width: "15", height: "13" }),
              React.createElement("polygon", { points: "16 8 20 8 23 11 23 16 16 16 16 8" }),
              React.createElement("circle", { cx: "5.5", cy: "18.5", r: "2.5" }),
              React.createElement("circle", { cx: "18.5", cy: "18.5", r: "2.5" })
            ),
            React.createElement(
              "span",
              { style: { color: T.text, fontWeight: 600 } },
              "Free shipping across India — arrives in 3 to 5 business days"
            )
          ),
          React.createElement(
            "div",
            { key: "ret", style: { display: "flex", alignItems: "center", gap: 8 } },
            React.createElement(
              "svg",
              { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "#C9A84C", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
              React.createElement("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" })
            ),
            React.createElement(
              "span",
              { style: { color: T.text, fontWeight: 600 } },
              "If the seal is broken or the pack is damaged on arrival, we replace it. Just WhatsApp us within 48 hours."
            )
          )
        ]
      )
    )
  );
}
function TagChip({ label: e, color: t }) {
  return React.createElement(
    "span",
    {
      style: {
        fontFamily: "'Plus Jakarta Sans'",
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: "0.08em",
        color: t || T.teal,
        border: `1px solid ${t || T.teal}`,
        borderRadius: 9999,
        padding: "3px 10px",
      },
    },
    e,
  );
}
const TEA_PROFILES = {
  "GABA Oolong Tea": {
    palate: "Malty, Wild Honey, Baked Stone Fruit",
    brew: "90°C · 3-4 Mins · Up to 4 Infusions",
    badge: "Signature Reserve"
  },
  "Lemongrass Green Tea": {
    palate: "Crisp Citrus, Grassy, Mild Sweetness",
    brew: "80°C · 2 Mins · Up to 3 Infusions",
    badge: "Popular"
  },
  "Spearmint Green Tea": {
    palate: "Refreshing Mint, Brisk Green, Clean Finish",
    brew: "80°C · 2 Mins · Up to 3 Infusions",
    badge: "Hormonal Balance"
  },
  "Rum Green Tea": {
    palate: "Warm Spiced Rum, Sugarcane, Oak wood",
    brew: "80°C · 1.5-2 Mins · Up to 3 Infusions",
    badge: "Exotic Infusion"
  },
  "Whiskey Green Tea": {
    palate: "Oaky Smoke, Malt, Subtle Sweetness",
    brew: "80°C · 1.5-2 Mins · Up to 3 Infusions",
    badge: "Bold Reserve"
  },
  "Blue Flower Green Tea": {
    palate: "Cobalt Blue, Mild Floral, Earthy sweetness",
    brew: "85°C · 2 Mins · Up to 3 Infusions",
    badge: "Colour Magic"
  },
  "Tulsi Green Tea": {
    palate: "Spicy Tulsi, Herbaceous, Bready warmth",
    brew: "85°C · 2 Mins · Up to 3 Infusions",
    badge: "Immunity"
  },
  "Chamomile Green Tea": {
    palate: "Soothing Chamomile, Honeyed Apples, Floral",
    brew: "85°C · 3 Mins · Up to 3 Infusions",
    badge: "Stress Relief"
  },
  "Organic Green Tea": {
    palate: "Pure Vegetal, Umami, Clean Grassy notes",
    brew: "80°C · 2 Mins · Up to 3 Infusions",
    badge: "Estate Classic"
  },
  "Ginger Green Tea": {
    palate: "Spicy Ginger, Honeyed Warmth, Brisk Green",
    brew: "85°C · 2-3 Mins · Up to 3 Infusions",
    badge: "Warming Wellness"
  }
};
function TeaCard({ tea, onView, onImageClick, index = 0 }) {
  const e = tea;
  const t = onView;
  const a = onImageClick;
  const n = index;

  const { isMobile: mobile } = useViewport();
  const isFeatured = false;
  const isMidHorizontal = false;
  const [o, i] = useState(!1),
    [r, l] = useState(!1),
    [s, c] = useState({ x: 0, y: 0 }),
    [d, m] = useState(!1),
    [p, g] = useInView(0.1);

  const prof = TEA_PROFILES[e.name] || {
    palate: "Malty, Sweet, Smooth",
    brew: e.brew || "85°C · 2 Mins",
    badge: e.badge || "Organic Reserve"
  };
  const f = useCallback((e) => {
      if (!p.current) return;
      const t = p.current.getBoundingClientRect();
      c({
        x: 12 * ((e.clientX - t.left) / t.width - 0.5),
        y: -12 * ((e.clientY - t.top) / t.height - 0.5),
      });
    }, []);
  return React.createElement(
    "div",
    {
      ref: p,
      className: "card-hover-lift",
      onMouseEnter: () => i(!0),
      onMouseLeave: () => {
        (i(!1), c({ x: 0, y: 0 }));
      },
      onMouseMove: f,
      onTouchStart: () => l(!0),
      onTouchEnd: (e) => {
        l(!1);
      },
      onClick: () => {
        try {
          const m = {
            "Lemongrass Green Tea": "KT-8GBE-8MZG",
            "Blue Flower Green Tea": "BlueFlower-1",
            "Rum Green Tea": "RUM-1",
            "Spearmint Green Tea": "Spearmint",
            "Tulsi Green Tea": "MK-H5LY-IRK3",
            "Chamomile Green Tea": "Chamomile-1",
            "Whiskey Green Tea": "9E-23FO-LL8Q",
            "GABA Oolong Tea": "GABA",
            "Organic Green Tea": "Unflavoured-1",
            "Ginger Green Tea": "GINGER",
          };
          const s = m[e.name];
          if (s && typeof fbq !== "undefined") {
            fbq("track", "ViewContent", {
              content_ids: [s],
              content_type: "product",
              value: e.price || 499,
              currency: "INR",
            });
          }
        } catch (err) {}
        t(e);
      },
      style: {
        background: "#FAF9F6", // Warm cream outer bezel
        border: "1px solid rgba(27,122,130,0.06)",
        borderRadius: 24, // Outer Squircle radius
        padding: 6, // 6px Concentric Nesting Padding
        position: "relative",
        overflow: "hidden", // Prevent image overflow bleed
        boxShadow: o
          ? "0 20px 48px rgba(27,122,130,0.18), 0 4px 16px rgba(0,0,0,0.06)"
          : "0 2px 10px rgba(0,0,0,0.04)",
        transform: o
          ? `perspective(900px) rotateX(${s.y}deg) rotateY(${s.x}deg) translateY(-6px) scale(1.01)`
          : r
            ? "perspective(900px) scale(0.98)"
            : "perspective(900px) rotateX(0) rotateY(0) translateY(0) scale(1)",
        transition: o
          ? "box-shadow 250ms ease, transform 120ms ease"
          : "box-shadow 350ms ease, transform 350ms ease, opacity 0.6s ease-out, translate 0.6s ease-out",
        cursor: "pointer",
        opacity: g ? 1 : 0,
        translate: g ? "0 0" : "0 32px",
        transitionDelay: 0.07 * n + "s",
        gridColumn: (isFeatured || isMidHorizontal) ? "1 / -1" : "auto",
        display: "flex",
        flexDirection: "column", // Explicit column stacking
      },
    },
    React.createElement(
      "div",
      {
        style: {
          width: "100%",
          background: T.white, // Inner pure white container
          borderRadius: 18, // Inner concentric radius (24 - 6)
          overflow: "hidden",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)",
          border: o ? "1px solid rgba(201, 168, 76, 0.45)" : "1px solid rgba(0,0,0,0.04)",
          boxShadow: o ? "0 20px 48px -10px rgba(35,65,45,0.16), 0 0 20px rgba(201,168,76,0.12)" : "inset 0 1px 0 rgba(255,255,255,0.6)",
          display: "flex",
          flexDirection: "column", // Stacks children vertically naturally
          position: "relative",
          flex: 1, // Stretch to outer bezel height
        }
      },
    React.createElement(
      "div",
      {
        style: {
          background: e.bg || T.white, // Premium matching brand pastel background
          height: 220, // Clean, compact height
          minHeight: 220,
          overflow: "hidden",
          position: "relative",
          cursor: "zoom-in",
        },
        onClick: (t) => {
          (t.stopPropagation(), a && a(e.img, e.name));
        },
      },
      e.img
        ? React.createElement("img", {
            src: e.img,
            alt: `${e.name} - Nevisan whole-leaf tea from Golaghat Assam`,
            loading: "lazy",
            width: "400",
            height: "400",
            style: {
              width: "100%",
              height: "100%",
              objectFit: "contain",
              padding: "16px",
              boxSizing: "border-box",
              transform: o ? "scale(1.04)" : "scale(1)",
              transition: "transform 500ms ease",
            },
          })
        : React.createElement(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              },
            },
            React.createElement(NevIcon, { name: "🍃", size: 48, color: T.teal, style: { opacity: 0.7 } }),
          ),
      React.createElement("div", {
        style: {
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(15,63,69,0.35) 0%, transparent 60%)",
          opacity: o ? 1 : 0,
          transition: "opacity 300ms ease",
        },
      }),
      e.bestseller &&
        React.createElement(
          "div",
          {
            style: {
              position: "absolute",
              top: 12,
              right: 12,
              background: T.gold,
              color: T.tealDark,
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.08em",
              padding: "4px 10px",
              borderRadius: 9999,
              boxShadow: "0 2px 8px rgba(201,168,76,0.4)",
            },
          },
          React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 4 } }, React.createElement(NevIcon, { name: "★", size: 10, color: T.tealDark }), "BESTSELLER"),
        ),
      e.badge &&
        !e.bestseller &&
        React.createElement(
          "div",
          {
            style: {
              position: "absolute",
              top: 12,
              right: 12,
              background: "#2a6a2a",
              color: "#fff",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.08em",
              padding: "4px 10px",
              borderRadius: 9999,
            },
          },
          React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 4 } }, React.createElement(NevIcon, { name: "✓", size: 10, color: "#fff" }), e.badge),
        ),
    ),
    React.createElement(
      "div",
      {
        style: {
          padding: "20px 20px 20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flex: 1, // Grow to fill remaining space
          height: "auto",
        }
      },
      React.createElement(
        "span",
        {
          style: {
            fontFamily: "'Plus Jakarta Sans'",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.12em",
            color: T.gold,
            textTransform: "uppercase",
            marginBottom: 6,
            display: "block",
          },
        },
        prof.badge,
      ),
      React.createElement(
        "h3",
        {
          style: {
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 400,
            fontSize: (isFeatured || isMidHorizontal) ? 28 : 18,
            color: T.text,
            marginBottom: 8,
            lineHeight: 1.3,
          },
        },
        e.name,
      ),
      React.createElement(
        "p",
        {
          style: {
            fontFamily: "'Plus Jakarta Sans'",
            fontSize: 13,
            color: T.textMuted,
            lineHeight: 1.55,
            marginBottom: 14,
            minHeight: (isFeatured || isMidHorizontal) ? "auto" : 54,
          },
        },
        e.short,
      ),
      React.createElement(
        "div",
        {
          style: {
            borderTop: `1px solid ${T.border}`,
            borderBottom: `1px solid ${T.border}`,
            padding: "12px 0",
            margin: "14px 0",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          },
        },
        React.createElement(
          "div",
          { style: { display: "flex", fontSize: 12.5, lineHeight: 1.4 } },
          React.createElement("span", { style: { fontWeight: 600, width: 80, color: T.teal, flexShrink: 0 } }, "Palate:"),
          React.createElement("span", { style: { color: T.textMuted } }, prof.palate)
        ),
        React.createElement(
          "div",
          { style: { display: "flex", fontSize: 12.5, lineHeight: 1.4 } },
          React.createElement("span", { style: { fontWeight: 600, width: 80, color: T.teal, flexShrink: 0 } }, "Brewing:"),
          React.createElement("span", { style: { color: T.textMuted } }, prof.brew)
        )
      ),
      React.createElement(
        "div",
        { style: { borderTop: `1px solid ${T.border}`, paddingTop: 14 } },
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            },
          },
          React.createElement(
            "div",
            null,
            React.createElement(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginBottom: 2,
                },
              },
              React.createElement(
                "span",
                {
                  style: {
                    fontFamily: "'Plus Jakarta Sans'",
                    fontSize: 18,
                    fontWeight: 700,
                    color: T.teal,
                  },
                },
                "MRP ₹499",
              ),
              React.createElement(
                "span",
                {
                  style: {
                    fontFamily: "'Plus Jakarta Sans'",
                    fontSize: 11,
                    color: T.textMuted,
                  },
                },
                "· 50 gm",
              ),
            ),
          ),
          React.createElement(
            "div",
            {
              style: {
                display: "flex",
                gap: 8,
                marginBottom: 12,
                flexWrap: "wrap",
              },
            },
            React.createElement(
              "span",
              {
                style: {
                  background: "rgba(35,65,45,0.08)",
                  color: T.teal,
                  fontSize: 10,
                  fontWeight: 600,
                  padding: "3px 8px",
                  borderRadius: 4,
                  letterSpacing: "0.04em",
                },
              },
              "🌱 PGS-India Organic",
            ),
            React.createElement(
              "span",
              {
                style: {
                  background: "rgba(35,65,45,0.08)",
                  color: T.teal,
                  fontSize: 10,
                  fontWeight: 600,
                  padding: "3px 8px",
                  borderRadius: 4,
                  letterSpacing: "0.04em",
                },
              },
              "✅ FSSAI Certified",
            ),
          ),
          React.createElement(
            "button",
            {
              onClick: (a) => {
                (a.stopPropagation(), t(e));
              },
              style: {
                background: "transparent",
                color: T.teal,
                border: `1px solid ${T.teal}`,
                borderRadius: 8,
                padding: "7px 14px",
                fontSize: 11,
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "'Plus Jakarta Sans'",
                letterSpacing: "0.04em",
                transition: "transform 160ms var(--ease-out), background 200ms, border-color 200ms",
                boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
              },
              onMouseEnter: (e) => {
                e.currentTarget.style.background = "rgba(27,122,130,0.07)";
              },
              onMouseLeave: (e) => {
                e.currentTarget.style.background = "transparent";
              },
            },
            "Details",
          ),
        ),
        React.createElement(
          "div",
          { style: { position: "relative" } },
          React.createElement(
            "button",
            {
              onClick: (e) => {
                (e.stopPropagation(), m((e) => !e));
              },
              className: "group",
              style: {
                width: "100%",
                background: T.teal,
                color: "#fff",
                border: "none",
                borderRadius: 9999,
                padding: "6px 6px 6px 18px",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Plus Jakarta Sans'",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
                transition: "all 300ms cubic-bezier(0.32,0.72,0,1)",
              },
              onMouseEnter: (e) => {
                e.currentTarget.style.filter = "brightness(1.08)";
                e.currentTarget.style.transform = "translateY(-1px)";
              },
              onMouseLeave: (e) => {
                e.currentTarget.style.filter = "none";
                e.currentTarget.style.transform = "none";
              },
            },
            React.createElement("span", { style: { letterSpacing: "0.03em" } }, "Buy Now"),
            React.createElement(
              "div",
              {
                style: {
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 300ms cubic-bezier(0.32,0.72,0,1)",
                }
              },
              React.createElement(
                "svg",
                {
                  width: 14,
                  height: 14,
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: 2,
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  style: {
                    transform: d ? "rotate(90deg)" : "rotate(0deg)",
                    transition: "transform 300ms cubic-bezier(0.32,0.72,0,1)",
                  }
                },
                React.createElement("line", { x1: 7, y1: 17, x2: 17, y2: 7 }),
                React.createElement("polyline", { points: "7 7 17 7 17 17" })
              )
            ),
          ),
          d &&
            React.createElement("div", {
              onClick: (e) => {
                (e.stopPropagation(), m(!1));
              },
              style: { position: "fixed", inset: 0, zIndex: 49 },
            }),
          d &&
            React.createElement(
              "div",
              {
                onClick: (e) => e.stopPropagation(),
                style: {
                  position: "absolute",
                  bottom: "110%",
                  left: 0,
                  right: 0,
                  background: "#fff",
                  borderRadius: 14,
                  boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
                  border: `1px solid ${T.border}`,
                  overflow: "hidden",
                  zIndex: 50,
                  animation: "page-enter 0.18s ease both",
                },
              },
              React.createElement(
                "div",
                {
                  style: {
                    padding: "12px 16px 8px",
                    fontFamily: "'Plus Jakarta Sans'",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    color: T.textMuted,
                    textTransform: "uppercase",
                  },
                },
                "Choose where to buy",
              ),
              [
                {
                  label: "WhatsApp",
                  sub: "Direct from Nevisan · Fastest",
                  bg: "#25D366",
                  emoji: "💬",
                  action: () => {
                    (openWhatsApp(e.name), m(!1));
                  },
                },
                {
                  label: "Amazon",
                  sub: "amazon.in",
                  bg: "#FF9900",
                  emoji: "🛒",
                  action: () => {
                    trackExternalClick(e.name, "Amazon");
                    window.open(
                      "https://www.amazon.in/stores/NEVISAN/page/51CB39DB-29D6-4C38-8CC0-1D10087E5C8E?lp_asin=B0G38DJN2M&ref_=ast_bln",
                      "_blank",
                    );
                    m(!1);
                  },
                },
                {
                  label: "Flipkart",
                  sub: "flipkart.com",
                  bg: "#2874F0",
                  emoji: "🛍️",
                  action: () => {
                    trackExternalClick(e.name, "Flipkart");
                    window.open(
                      "https://www.flipkart.com/store/nevisan",
                      "_blank",
                    );
                    m(!1);
                  },
                },
              ].map((e) =>
                React.createElement(
                  "button",
                  {
                    key: e.label,
                    onClick: e.action,
                    style: {
                      width: "100%",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "12px 16px",
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      borderTop: `1px solid ${T.border}`,
                      transition: "background 150ms",
                      WebkitTapHighlightColor: "transparent",
                    },
                    onMouseEnter: (e) =>
                      (e.currentTarget.style.background = "#f5f5f5"),
                    onMouseLeave: (e) =>
                      (e.currentTarget.style.background = "none"),
                  },
                  React.createElement(
                    "div",
                    {
                      style: {
                        width: 36,
                        height: 36,
                        borderRadius: 9,
                        background: e.bg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 18,
                        flexShrink: 0,
                      },
                    },
                    e.emoji,
                  ),
                  React.createElement(
                    "div",
                    { style: { textAlign: "left" } },
                    React.createElement(
                      "div",
                      {
                        style: {
                          fontFamily: "'Plus Jakarta Sans'",
                          fontSize: 14,
                          fontWeight: 600,
                          color: T.text,
                        },
                      },
                      e.label,
                    ),
                    React.createElement(
                      "div",
                      {
                        style: {
                          fontFamily: "'Plus Jakarta Sans'",
                          fontSize: 11,
                          color: T.textMuted,
                        },
                      },
                      e.sub,
                    ),
                  ),
                  React.createElement(
                    "div",
                    {
                      style: {
                        marginLeft: "auto",
                        color: T.textMuted,
                        fontSize: 16,
                      },
                    },
                    "›",
                  ),
                ),
              ),
            ),
        ),
      ) // Close Inner Core
      ),
    ),
  );
}
function ImageLightbox({ img: e, name: t, onClose: a }) {
  return (
    useEffect(() => {
      const e = (e) => {
        "Escape" === e.key && a();
      };
      return (
        window.addEventListener("keydown", e),
        () => window.removeEventListener("keydown", e)
      );
    }, []),
    React.createElement(
      "div",
      {
        onClick: a,
        style: {
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.92)",
          zIndex: 500,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          animation: "overlay-fade 0.2s ease both",
          cursor: "zoom-out",
        },
      },
      React.createElement(
        "button",
        {
          onClick: a,
          "aria-label": "Close",
          style: {
            position: "absolute",
            top: 20,
            right: 20,
            background: "rgba(255,255,255,0.15)",
            border: "none",
            borderRadius: "50%",
            width: 44,
            height: 44,
            cursor: "pointer",
            fontSize: 20,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(4px)",
          },
        },
        "✕",
      ),
      React.createElement("img", {
        src: e,
        alt: t,
        onClick: (e) => e.stopPropagation(),
        style: {
          maxWidth: "90vw",
          maxHeight: "88vh",
          objectFit: "contain",
          borderRadius: 12,
          boxShadow: "0 32px 100px rgba(0,0,0,0.6)",
          animation: "page-enter 0.25s ease both",
        },
      }),
      React.createElement(
        "div",
        {
          style: {
            position: "absolute",
            bottom: 28,
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 16,
            color: "rgba(255,255,255,0.75)",
            pointerEvents: "none",
            whiteSpace: "nowrap",
          },
        },
        t,
      ),
    )
  );
}
function CollectionPage({}) {
  const [e, t] = useState(null),
    [a, n] = useState(null),
    [activeFilter, setActiveFilter] = useState("ALL"),
    { isMobile: o, isTablet: i } = useViewport(),
    r = o ? "1fr" : i ? "repeat(2, 1fr)" : "repeat(3, 1fr)";
  useEffect(() => {
    try {
      var __tea = new URLSearchParams(window.location.search).get("tea");
      if (__tea) {
        var __f =
          TEAS.find((x) => x.name === __tea) ||
          TEAS.find((x) => x.name.toLowerCase() === __tea.toLowerCase());
        if (__f) {
          t(__f);
          window.history.replaceState({}, "", window.location.pathname);
        }
      }
    } catch (__e) {}
  }, []);
  return React.createElement(
    "div",
    {
      style: {
        background: T.cream,
        minHeight: "100vh",
        animation: "page-enter 0.45s ease both",
      },
    },
    React.createElement(PageHero, {
      photo: PAGE_PHOTOS.collection,
      label: "The Collection",
      title: "Ten varieties, one origin",
      subtitle: "Every leaf from Golaghat — whole, unblended, handcrafted.",
    }),
    React.createElement(Ticker, null),
    React.createElement(
      "div",
      {
        style: {
          maxWidth: 1200,
          margin: "0 auto",
          padding: o ? "40px 20px" : "64px 32px",
        },
      },
      React.createElement(
        "div",
        { style: { textAlign: "center", marginBottom: o ? 36 : 56 } },
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              marginBottom: 16,
            },
          },
          React.createElement("div", {
            style: { height: 1, width: 60, background: T.gold },
          }),
          React.createElement(
            "span",
            {
              style: {
                fontFamily: "'Plus Jakarta Sans'",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.14em",
                color: T.teal,
                textTransform: "uppercase",
              },
            },
            "The Collection",
          ),
          React.createElement("div", {
            style: { height: 1, width: 60, background: T.gold },
          }),
        ),
        React.createElement(
          "h2",
          {
            style: {
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 400,
              fontSize: "clamp(28px, 4vw, 52px)",
              color: T.text,
              marginBottom: 16,
            },
          },
          "Ten varieties, one origin",
        ),
        React.createElement(
          "p",
          {
            style: {
              fontFamily: "'Plus Jakarta Sans'",
              fontSize: 15,
              color: T.textMuted,
              maxWidth: 480,
              margin: "0 auto",
            },
          },
          "Every leaf from Golaghat. Every blend intentional. Find yours.",
        ),
      ),
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: o ? 8 : 12,
            marginBottom: o ? 32 : 48,
          },
        },
        [
          { label: "All Blends", value: "ALL" },
          { label: "Estate Greens", value: "GREEN" },
          { label: "Wellness / Adaptogens", value: "WELLNESS" },
          { label: "Specialty Cures", value: "SPECIALTY" }
        ].map(filter => {
          const isSelected = activeFilter === filter.value;
          return React.createElement(
            "button",
            {
              key: filter.value,
              onClick: () => setActiveFilter(filter.value),
              style: {
                background: isSelected ? "#1F2E24" : "rgba(31, 46, 36, 0.04)",
                color: isSelected ? "#F8F6F2" : "#1F2E24",
                border: isSelected ? "1px solid #1F2E24" : "1px solid rgba(31, 46, 36, 0.1)",
                borderRadius: 9999,
                padding: o ? "6px 14px" : "8px 20px",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Plus Jakarta Sans'",
                transform: isSelected ? "scale(1.02)" : "scale(1)",
                transition: "all 200ms ease",
              }
            },
            filter.label
          );
        })
      ),
      React.createElement(
        "div",
        {
          style: { display: "grid", gridTemplateColumns: r, gap: o ? 16 : 36 },
        },
        TEAS.filter(tea => {
          if (activeFilter === "ALL") return true;
          if (activeFilter === "GREEN") return tea.name !== "GABA Oolong Tea";
          if (activeFilter === "WELLNESS") {
            return ["Lemongrass Green Tea", "Blue Flower Green Tea", "Spearmint Green Tea", "Tulsi Green Tea", "Chamomile Green Tea", "Ginger Green Tea"].includes(tea.name);
          }
          if (activeFilter === "SPECIALTY") {
            return ["GABA Oolong Tea", "Whiskey Green Tea", "Rum Green Tea"].includes(tea.name);
          }
          return true;
        }).map((e, a) =>
          React.createElement(TeaCard, {
            key: activeFilter + "-" + e.name,
            tea: e,
            onView: t,
            onImageClick: (e, t) => n({ img: e, name: t }),
            index: a,
          }),
        ),
      ),
    ),
    e &&
      ReactDOM.createPortal(
        React.createElement(
          "div",
          {
            style: {
              position: "fixed",
              inset: 0,
              background: "rgba(15,63,69,0.65)",
              zIndex: 200,
              display: "flex",
              alignItems: o ? "flex-end" : "center",
              justifyContent: "center",
              padding: o ? 0 : 24,
              backdropFilter: "blur(4px)",
              pointerEvents: "auto",
            },
            onClick: () => t(null),
          },
          React.createElement(
            "div",
            {
              style: {
                background: T.white,
                borderRadius: o ? "20px 20px 0 0" : 20,
                maxWidth: o ? "100%" : 500,
                width: "100%",
                maxHeight: o ? "88vh" : "90vh",
                overflowY: "auto",
                boxShadow: "0 -8px 40px rgba(0,0,0,0.25)",
                animation: o
                  ? "slide-up 0.3s ease both"
                  : "page-enter 0.3s ease both",
                pointerEvents: "auto",
              },
              onClick: (e) => e.stopPropagation(),
            },
            o &&
              React.createElement("div", {
                style: {
                  width: 40,
                  height: 4,
                  background: "#ddd",
                  borderRadius: 9999,
                  margin: "12px auto 0",
                },
              }),
            o
              ? React.createElement(
                  "div",
                  { style: { padding: "12px 16px 24px" } },
                  React.createElement(
                    "div",
                    { style: { display: "flex", gap: 14, marginBottom: 14 } },
                    React.createElement(
                      "div",
                      {
                        style: {
                          width: 110,
                          height: 110,
                          borderRadius: 14,
                          overflow: "hidden",
                          flexShrink: 0,
                          background: T.white,
                          border: "1px solid #eee",
                          position: "relative",
                        },
                      },
                      e.img
                        ? React.createElement("img", {
                            src: e.img,
                            alt: e.name,
                            loading: "lazy",
                            style: {
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                              padding: "8px",
                              boxSizing: "border-box",
                            },
                          })
                        : React.createElement(
                            "div",
                            {
                              style: {
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                height: "100%",
                              },
                            },
                            React.createElement(
                              "span",
                              { style: { fontSize: 40 } },
                              "🍃",
                            ),
                          ),
                    ),
                    React.createElement(
                      "div",
                      { style: { flex: 1, minWidth: 0 } },
                      React.createElement(
                        "h2",
                        {
                          style: {
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontWeight: 400,
                            fontSize: 17,
                            color: T.text,
                            marginBottom: 6,
                            lineHeight: 1.3,
                          },
                        },
                        e.name,
                      ),
                      React.createElement(
                        "div",
                        {
                          style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            marginBottom: 4,
                          },
                        },
                        React.createElement(
                          "span",
                          {
                            style: {
                              fontFamily: "'Plus Jakarta Sans'",
                              fontSize: 20,
                              fontWeight: 700,
                              color: T.teal,
                            },
                          },
                          "MRP ₹499",
                        ),
                        React.createElement(
                          "span",
                          {
                            style: {
                              fontFamily: "'Plus Jakarta Sans'",
                              fontSize: 11,
                              color: T.textMuted,
                            },
                          },
                          "· 50 gm",
                        ),
                      ),
                      e.bestseller &&
                        React.createElement(
                          "div",
                          {
                            style: {
                              display: "inline-block",
                              background: T.gold,
                              color: T.tealDark,
                              fontSize: 9,
                              fontWeight: 700,
                              padding: "3px 9px",
                              borderRadius: 9999,
                            },
                          },
                          React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 4 } }, React.createElement(NevIcon, { name: "★", size: 10, color: T.tealDark }), "BESTSELLER"),
                        ),
                    ),
                    React.createElement(
                      "button",
                      {
                        onClick: (e) => {
                          (e.stopPropagation(), t(null));
                        },
                        style: {
                          position: "absolute",
                          top: 14,
                          right: 14,
                          background: "rgba(0,0,0,0.08)",
                          border: "none",
                          borderRadius: "50%",
                          width: 30,
                          height: 30,
                          cursor: "pointer",
                          fontSize: 15,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: T.text,
                        },
                      },
                      "✕",
                    ),
                  ),
                  React.createElement(
                    "div",
                    {
                      style: {
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                        marginBottom: 16,
                      },
                    },
                    React.createElement(AddToCartBtn, {
                      tea: e,
                      onAdded: () => t(null),
                    }),
                    React.createElement(
                      RippleButton,
                      {
                        onClick: () => openWhatsApp(e.name),
                        style: {
                          width: "100%",
                          background: "#25D366",
                          color: "#fff",
                          border: "none",
                          borderRadius: 9999,
                          padding: "11px",
                          fontSize: 13,
                          fontWeight: 600,
                          cursor: "pointer",
                          fontFamily: "'Plus Jakarta Sans'",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 8,
                        },
                        hoverStyle: {
                          transform: "scale(1.02)",
                          filter: "brightness(1.05)",
                        },
                      },
                      React.createElement("span", null, "💬"),
                      " Order via WhatsApp",
                    ),
                    React.createElement(
                      "div",
                      {
                        style: {
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: 8,
                        },
                      },
                      React.createElement(
                        "button",
                        {
                          onClick: () => {
                            trackExternalClick(e.name, "Amazon");
                            window.open(
                              "https://www.amazon.in/stores/NEVISAN/page/51CB39DB-29D6-4C38-8CC0-1D10087E5C8E?lp_asin=B0G38DJN2M&ref_=ast_bln",
                              "_blank",
                            );
                          },
                          style: {
                            background: "#FF9900",
                            color: "#fff",
                            border: "none",
                            borderRadius: 9999,
                            padding: "9px",
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: "pointer",
                            fontFamily: "'Plus Jakarta Sans'",
                          },
                        },
                        "Amazon",
                      ),
                      React.createElement(
                        "button",
                        {
                          onClick: () => {
                            trackExternalClick(e.name, "Flipkart");
                            window.open(
                              "https://www.flipkart.com/store/nevisan",
                              "_blank",
                            );
                          },
                          style: {
                            background: "#2874F0",
                            color: "#fff",
                            border: "none",
                            borderRadius: 9999,
                            padding: "9px",
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: "pointer",
                            fontFamily: "'Plus Jakarta Sans'",
                          },
                        },
                        "Flipkart",
                      ),
                    ),
                  ),
                  React.createElement(
                    "div",
                    {
                      style: { borderTop: "1px solid #f0f0f0", paddingTop: 14 },
                    },
                    React.createElement(
                      "p",
                      {
                        style: {
                          fontFamily: "'Plus Jakarta Sans'",
                          fontSize: 13,
                          color: T.textMuted,
                          lineHeight: 1.6,
                          marginBottom: 12,
                        },
                      },
                      e.short,
                    ),
                      React.createElement(TeaSpecsAndShippingPanel, { tea: e }),
                    e.benefits &&
                      React.createElement(
                        "div",
                        { style: { marginBottom: 16 } },
                        React.createElement(
                          "div",
                          {
                            style: {
                              fontFamily: "'Plus Jakarta Sans'",
                              fontSize: 11,
                              letterSpacing: "0.13em",
                              color: T.teal,
                              textTransform: "uppercase",
                              fontWeight: 600,
                              marginBottom: 10,
                            },
                          },
                          "Key Benefits",
                        ),
                        e.benefits.map((e, t) =>
                          React.createElement(
                            "div",
                            {
                              key: t,
                              style: {
                                display: "flex",
                                gap: 10,
                                alignItems: "flex-start",
                                marginBottom: 8,
                              },
                            },
                            React.createElement(
                                "span",
                                {
                                  style: {
                                    lineHeight: 1,
                                    flexShrink: 0,
                                    marginTop: 1,
                                    display: "inline-flex",
                                    color: T.gold,
                                  },
                                },
                                React.createElement(NevIcon, { name: e.icon, size: 18, color: T.gold }),
                              ),
                            React.createElement(
                              "div",
                              null,
                              React.createElement(
                                "div",
                                {
                                  style: {
                                    fontFamily: "'Plus Jakarta Sans'",
                                    fontSize: 12,
                                    fontWeight: 600,
                                    color: T.text,
                                  },
                                },
                                e.title,
                              ),
                              React.createElement(
                                "div",
                                {
                                  style: {
                                    fontFamily: "'Plus Jakarta Sans'",
                                    fontSize: 11,
                                    color: T.textMuted,
                                    lineHeight: 1.5,
                                  },
                                },
                                e.desc,
                              ),
                            ),
                          ),
                        ),
                      ),
                    e.brew &&
                      React.createElement(
                        "div",
                        {
                          style: {
                            background: "rgba(27,122,130,0.07)",
                            borderRadius: 10,
                            padding: "10px 14px",
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                          },
                        },
                        React.createElement(
                          "span",
                          { style: { fontSize: 16 } },
                          "🍵",
                        ),
                        React.createElement(
                          "div",
                          null,
                          React.createElement(
                            "div",
                            {
                              style: {
                                fontFamily: "'Plus Jakarta Sans'",
                                fontSize: 10,
                                letterSpacing: "0.12em",
                                color: T.teal,
                                textTransform: "uppercase",
                                fontWeight: 600,
                                marginBottom: 2,
                              },
                            },
                            "Brewing Guide",
                          ),
                          React.createElement(
                            "div",
                            {
                              style: {
                                fontFamily: "'Plus Jakarta Sans'",
                                fontSize: 12,
                                color: T.textMuted,
                              },
                            },
                            e.brew,
                          ),
                        ),
                      ),
                  ),
                )
              : React.createElement(
                  React.Fragment,
                  null,
                  React.createElement(
                    "div",
                    {
                      style: {
                        height: 260,
                        overflow: "hidden",
                        position: "relative",
                        background: T.white,
                        borderBottom: "1px solid #eee",
                        cursor: "zoom-in",
                      },
                      onClick: (a) => {
                        (a.stopPropagation(),
                          t(null),
                          n({ img: e.img, name: e.name }));
                      },
                    },
                    e.img
                      ? React.createElement("img", {
                          src: e.img,
                          alt: e.name,
                          loading: "lazy",
                          style: {
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            padding: "16px",
                            boxSizing: "border-box",
                          },
                        })
                      : React.createElement(
                          "div",
                          {
                            style: {
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              height: "100%",
                            },
                          },
                          React.createElement(
                            "span",
                            { style: { fontSize: 72, opacity: 0.7 } },
                            "🍃",
                          ),
                        ),
                    React.createElement(
                      "button",
                      {
                        onClick: (e) => {
                          (e.stopPropagation(), t(null));
                        },
                        "aria-label": "Close",
                        style: {
                          position: "absolute",
                          top: 14,
                          right: 14,
                          background: "rgba(255,255,255,0.9)",
                          border: "none",
                          borderRadius: "50%",
                          width: 32,
                          height: 32,
                          cursor: "pointer",
                          fontSize: 16,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: T.text,
                          zIndex: 2,
                        },
                      },
                      "✕",
                    ),
                    e.bestseller &&
                      React.createElement(
                        "div",
                        {
                          style: {
                            position: "absolute",
                            top: 42,
                            left: 14,
                            background: T.gold,
                            color: T.tealDark,
                            fontSize: 9,
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            padding: "4px 10px",
                            borderRadius: 9999,
                          },
                        },
                        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 4 } }, React.createElement(NevIcon, { name: "★", size: 10, color: T.tealDark }), "BESTSELLER"),
                      ),
                  ),
                  React.createElement(
                    "div",
                    { style: { padding: "32px" } },
                    React.createElement(
                      "h2",
                      {
                        style: {
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontWeight: 400,
                          fontSize: 26,
                          color: T.text,
                          marginBottom: 6,
                        },
                      },
                      e.name,
                    ),
                    React.createElement(
                      "div",
                      {
                        style: {
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          marginBottom: 4,
                        },
                      },
                      React.createElement(
                        "span",
                        {
                          style: {
                            fontFamily: "'Plus Jakarta Sans'",
                            fontSize: 24,
                            fontWeight: 700,
                            color: T.teal,
                          },
                        },
                        "MRP ₹499",
                      ),
                      React.createElement(
                        "span",
                        {
                          style: {
                            fontFamily: "'Plus Jakarta Sans'",
                            fontSize: 11,
                            color: T.textMuted,
                          },
                        },
                        "· 50 gm",
                      ),
                    ),
                    React.createElement(
                      "p",
                      {
                        style: {
                          fontFamily: "'Plus Jakarta Sans'",
                          fontSize: 13,
                          color: T.textMuted,
                          lineHeight: 1.6,
                          marginBottom: 12,
                        },
                      },
                      e.short,
                    ),
                      React.createElement(TeaSpecsAndShippingPanel, { tea: e }),
                    React.createElement(
                      "div",
                      {
                        style: {
                          display: "flex",
                          flexDirection: "column",
                          gap: 8,
                          marginBottom: 20,
                        },
                      },
                      React.createElement(AddToCartBtn, { tea: e, onAdded: () => t(null) }),
                      React.createElement(
                        RippleButton,
                        {
                          onClick: () => openWhatsApp(e.name),
                          style: {
                            width: "100%",
                            background: "#25D366",
                            color: "#fff",
                            border: "none",
                            borderRadius: 9999,
                            padding: "13px",
                            fontSize: 14,
                            fontWeight: 600,
                            cursor: "pointer",
                            fontFamily: "'Plus Jakarta Sans'",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 8,
                          },
                          hoverStyle: {
                            transform: "scale(1.02)",
                            filter: "brightness(1.05)",
                          },
                        },
                        React.createElement("span", null, "💬"),
                        " Order via WhatsApp",
                      ),
                      React.createElement(
                        "div",
                        {
                          style: {
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 8,
                          },
                        },
                        React.createElement(
                          "button",
                          {
                            onClick: () => {
                              trackExternalClick(e.name, "Amazon");
                              window.open(
                                "https://www.amazon.in/stores/NEVISAN/page/51CB39DB-29D6-4C38-8CC0-1D10087E5C8E?lp_asin=B0G38DJN2M&ref_=ast_bln",
                                "_blank",
                              );
                            },
                            style: {
                              background: "#FF9900",
                              color: "#fff",
                              border: "none",
                              borderRadius: 9999,
                              padding: "11px",
                              fontSize: 13,
                              fontWeight: 600,
                              cursor: "pointer",
                              fontFamily: "'Plus Jakarta Sans'",
                            },
                          },
                          "Amazon",
                        ),
                        React.createElement(
                          "button",
                          {
                            onClick: () => {
                              trackExternalClick(e.name, "Flipkart");
                              window.open(
                                "https://www.flipkart.com/store/nevisan",
                                "_blank",
                              );
                            },
                            style: {
                              background: "#2874F0",
                              color: "#fff",
                              border: "none",
                              borderRadius: 9999,
                              padding: "11px",
                              fontSize: 13,
                              fontWeight: 600,
                              cursor: "pointer",
                              fontFamily: "'Plus Jakarta Sans'",
                            },
                          },
                          "Flipkart",
                        ),
                      ),
                    ),
                    React.createElement(
                      "div",
                      {
                        style: {
                          display: "flex",
                          gap: 8,
                          marginBottom: 16,
                          flexWrap: "wrap",
                        },
                      },
                      e.tags.map((t) =>
                        React.createElement(TagChip, {
                          key: t,
                          label: t,
                          color: e.color,
                        }),
                      ),
                    ),
                    e.benefits &&
                      React.createElement(
                        "div",
                        { style: { marginBottom: 20 } },
                        React.createElement(
                          "div",
                          {
                            style: {
                              fontFamily: "'Plus Jakarta Sans'",
                              fontSize: 11,
                              letterSpacing: "0.13em",
                              color: T.teal,
                              textTransform: "uppercase",
                              fontWeight: 600,
                              marginBottom: 12,
                            },
                          },
                          "Key Benefits",
                        ),
                        React.createElement(
                          "div",
                          {
                            style: {
                              display: "flex",
                              flexDirection: "column",
                              gap: 10,
                            },
                          },
                          e.benefits.map((e, t) =>
                            React.createElement(
                              "div",
                              {
                                key: t,
                                style: {
                                  display: "flex",
                                  gap: 12,
                                  alignItems: "flex-start",
                                },
                              },
                              React.createElement(
                                "span",
                                {
                                  style: {
                                    lineHeight: 1,
                                    flexShrink: 0,
                                    marginTop: 1,
                                    display: "inline-flex",
                                    color: T.gold,
                                  },
                                },
                                React.createElement(NevIcon, { name: e.icon, size: 18, color: T.gold }),
                              ),
                              React.createElement(
                                "div",
                                null,
                                React.createElement(
                                  "div",
                                  {
                                    style: {
                                      fontFamily: "'Plus Jakarta Sans'",
                                      fontSize: 13,
                                      fontWeight: 600,
                                      color: T.text,
                                      marginBottom: 2,
                                    },
                                  },
                                  e.title,
                                ),
                                React.createElement(
                                  "div",
                                  {
                                    style: {
                                      fontFamily: "'Plus Jakarta Sans'",
                                      fontSize: 12,
                                      color: T.textMuted,
                                      lineHeight: 1.55,
                                    },
                                  },
                                  e.desc,
                                ),
                              ),
                            ),
                          ),
                        ),
                      ),
                    e.brew &&
                      React.createElement(
                        "div",
                        {
                          style: {
                            background: "rgba(27,122,130,0.07)",
                            borderRadius: 10,
                            padding: "10px 14px",
                            marginBottom: 20,
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                          },
                        },
                        React.createElement(
                          "span",
                          { style: { fontSize: 16 } },
                          "🍵",
                        ),
                        React.createElement(
                          "div",
                          null,
                          React.createElement(
                            "div",
                            {
                              style: {
                                fontFamily: "'Plus Jakarta Sans'",
                                fontSize: 10,
                                letterSpacing: "0.12em",
                                color: T.teal,
                                textTransform: "uppercase",
                                fontWeight: 600,
                                marginBottom: 2,
                              },
                            },
                            "Brewing Guide",
                          ),
                          React.createElement(
                            "div",
                            {
                              style: {
                                fontFamily: "'Plus Jakarta Sans'",
                                fontSize: 12,
                                color: T.textMuted,
                              },
                            },
                            e.brew,
                          ),
                        ),
                      ),
                  ),
                ),
          ),
        ),
        document.body,
      ),
    a &&
      React.createElement(ImageLightbox, {
        img: a.img,
        name: a.name,
        onClose: () => n(null),
      }),
  );
}
function OriginSection() {
  const { isMobile: e } = useViewport(),
    [ref, inView] = useInView(0.12),
    [cardRef, cardVisible] = useInView(0.1);
  return React.createElement(
    "section",
    {
      ref,
      style: {
        background: T.tealDark,
        padding: e ? "72px 20px" : "110px 32px",
        position: "relative",
        overflow: "hidden",
      },
    },
    /* Decorative rings */
    React.createElement("div", { style: { position: "absolute", top: "-10%", right: "-8%", width: 420, height: 420, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.05)", pointerEvents: "none" } }),
    React.createElement("div", { style: { position: "absolute", bottom: "-15%", left: "-6%", width: 320, height: 320, borderRadius: "50%", border: "1px solid rgba(201,168,76,0.07)", pointerEvents: "none" } }),
    React.createElement(
      "div",
      { style: { maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: e ? "1fr" : "1fr 1fr", gap: e ? 48 : 80, alignItems: "center" } },
      /* LEFT — fact card */
      React.createElement(
        "div",
        {
          ref: cardRef,
          style: {
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 20,
            padding: e ? 28 : 36,
            opacity: cardVisible ? 1 : 0,
            transform: cardVisible ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
          },
        },
        /* Badge */
        React.createElement(
          "div",
          { style: { display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.35)", borderRadius: 9999, padding: "6px 16px", marginBottom: 24 } },
          React.createElement("span", { style: { width: 6, height: 6, borderRadius: "50%", background: T.gold, display: "inline-block" } }),
          React.createElement("span", { style: { fontFamily: "'Plus Jakarta Sans'", fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", color: T.gold, textTransform: "uppercase" } }, "Est. Golaghat · Assam"),
        ),
        /* Big number */
        React.createElement(
          "div",
          { style: { marginBottom: 8 } },
          React.createElement("span", { style: { fontFamily: "'Playfair Display', Georgia, serif", fontSize: e ? 64 : 80, fontWeight: 400, color: T.gold, lineHeight: 1 } }, "1"),
          React.createElement("span", { style: { fontFamily: "'Playfair Display', Georgia, serif", fontSize: e ? 32 : 40, fontWeight: 400, color: T.gold, verticalAlign: "super" } }, "st"),
        ),
        React.createElement("div", { style: { fontFamily: "'Plus Jakarta Sans'", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", marginBottom: 28 } }, "Harvest · Single Garden"),
        /* Fact grid */
        React.createElement(
          "div",
          { style: { display: "grid", gridTemplateColumns: e ? "1fr" : "1fr 1fr", gap: 12 } },
          [
            { label: "Certified", value: "PGS-India Organic", icon: "🌿" },
            { label: "Zero", value: "Pesticides Used", icon: "🚫" },
            { label: "Process", value: "Whole Leaf Only", icon: "🍃" },
            { label: "Pack Size", value: "50g · ₹499 MRP", icon: "📦" },
          ].map(({ label, value, icon }) =>
            React.createElement(
              "div",
              {
                key: label,
                style: { background: "rgba(255,255,255,0.06)", borderRadius: 12, padding: "16px 18px", border: "1px solid rgba(255,255,255,0.08)" },
              },
              React.createElement("div", { style: { fontFamily: "'Plus Jakarta Sans'", fontSize: 10, letterSpacing: "0.12em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: 4 } }, label),
              React.createElement("div", { style: { fontFamily: "'Plus Jakarta Sans'", fontSize: 14, fontWeight: 600, color: T.white } }, icon + " " + value),
            ),
          ),
        ),
      ),
      /* RIGHT — copy */
      React.createElement(
        "div",
        {
          style: {
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(28px)",
            transition: "opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s",
          },
        },
        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 16, marginBottom: 20 } },
          React.createElement("div", { style: { width: 40, height: 1, background: T.gold } }),
          React.createElement("span", { style: { fontFamily: "'Plus Jakarta Sans'", fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", color: T.gold, textTransform: "uppercase" } }, "The Origin"),
        ),
        React.createElement("h2", {
          style: { fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400, fontSize: "clamp(32px, 4vw, 52px)", color: T.white, lineHeight: 1.15, marginBottom: 12 },
        }, "Tea grown the way"),
        React.createElement("h2", {
          style: { fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400, fontStyle: "italic", fontSize: "clamp(32px, 4vw, 52px)", color: T.gold, lineHeight: 1.15, marginBottom: 28 },
        }, "nature intended"),
        React.createElement("p", {
          style: { fontFamily: "'Plus Jakarta Sans'", fontSize: 15, color: "rgba(255,255,255,0.72)", lineHeight: 1.75, marginBottom: 16 },
        }, "Nevisan is rooted in Golaghat — a single garden in Assam where the rain falls heavy, the soil stays rich, and nothing is rushed. We grow whole leaf, harvest by hand, and blend only what belongs together."),
        React.createElement("p", {
          style: { fontFamily: "'Plus Jakarta Sans'", fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, marginBottom: 32 },
        }, "No pesticides. No shortcuts. Every batch PGS-India certified. You taste the garden, not a factory."),
        /* Pill badges */
        React.createElement(
          "div",
          { style: { display: "flex", flexWrap: "wrap", gap: 10 } },
          ["🌱 Single Garden", "🍃 Whole Leaf", "🚫 No Pesticides", "📍 Golaghat, Assam", "✅ PGS Certified"].map((label) =>
            React.createElement(
              "span",
              {
                key: label,
                style: { fontFamily: "'Plus Jakarta Sans'", fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 9999, padding: "6px 14px" },
              },
              label,
            ),
          ),
        ),
      ),
    ),
  );
}
function BenefitsSection() {
  const { isMobile: e, isTablet: tab } = useViewport(),
    [ref, inView] = useInView(0.1);
  const benefits = [
    { icon: "🌿", title: "Nothing added. Nothing hidden.", desc: "PGS-India certified organic. No pesticides, no artificial flavouring, no blending across estates. What the garden produces is what goes in the pack." },
    { icon: "🍃", title: "Whole leaf, properly done", desc: "No dust, no fannings. The whole leaf holds its oils until you brew it — a smoother, more complex cup that holds up to a second steep." },
    { icon: "⚡", title: "Alert, not wired", desc: "Green tea delivers caffeine alongside L-theanine, which smooths the energy into something sustained. No cortisol spike, no 2pm crash." },
    { icon: "📍", title: "One garden. One address.", desc: "Every variety traces back to a single estate in Golaghat, Assam. You know exactly where your tea came from — no blending, no guessing." },
    { icon: "🚀", title: "No middlemen", desc: "Order on WhatsApp, Amazon, or Flipkart. Fresh stock, honest prices — we don't mark up to cover a distributor we don't have." },
    { icon: "🎯", title: "Ten teas, ten reasons", desc: "Digestion, calm, energy, sleep, hormonal health. Each variety was built around something specific — not just a flavour that sounded good." },
  ];
  return React.createElement(
    "section",
    {
      ref,
      style: { background: T.cream, padding: e ? "72px 20px" : "110px 32px" },
    },
    React.createElement(
      "div",
      { style: { maxWidth: 1100, margin: "0 auto" } },
      /* Header */
      React.createElement(
        "div",
        { style: { textAlign: "center", marginBottom: e ? 40 : 64 } },
        React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 16 } },
          React.createElement("div", { style: { width: 40, height: 1, background: T.teal } }),
          React.createElement("span", { style: { fontFamily: "'Plus Jakarta Sans'", fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", color: T.teal, textTransform: "uppercase" } }, "Why Nevisan"),
          React.createElement("div", { style: { width: 40, height: 1, background: T.teal } }),
        ),
        React.createElement("h2", {
          style: { fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400, fontSize: "clamp(30px, 4vw, 52px)", color: T.text, lineHeight: 1.15, marginBottom: 0 },
        }, "Tea that actually"),
        React.createElement("h2", {
          style: { fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400, fontStyle: "italic", fontSize: "clamp(30px, 4vw, 52px)", color: T.teal, lineHeight: 1.15 },
        }, "does something"),
      ),
      /* 6-card grid */
      React.createElement(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: e ? "1fr" : tab ? "repeat(2,1fr)" : "repeat(3,1fr)",
            gap: e ? 16 : 24,
          },
        },
        benefits.map(({ icon, title, desc }, idx) =>
          React.createElement(BenefitCard, { key: title, icon, title, desc, inView, idx }),
        ),
      ),
    ),
  );
}
function BenefitCard({ icon, title, desc, inView, idx }) {
  const [hov, setHov] = useState(false);
  return React.createElement(
    "div",
    {
      onMouseEnter: () => setHov(true),
      onMouseLeave: () => setHov(false),
      style: {
        background: T.white,
        borderRadius: 16,
        padding: "32px 28px",
        border: `1px solid ${hov ? "rgba(35,65,45,0.18)" : T.border}`,
        boxShadow: hov ? "0 12px 40px rgba(35,65,45,0.1)" : "0 2px 8px rgba(0,0,0,0.04)",
        transform: hov ? "translateY(-6px)" : inView ? "translateY(0)" : "translateY(20px)",
        opacity: inView ? 1 : 0,
        transition: `transform 0.4s var(--ease-out) ${idx * 60}ms, opacity 0.5s ease ${idx * 60}ms, box-shadow 250ms ease, border-color 200ms ease`,
      },
    },
    React.createElement("div", { style: { marginBottom: 16, display: "flex", color: T.gold } }, React.createElement(NevIcon, { name: icon, size: 36, color: T.gold })),
    React.createElement("h3", {
      style: { fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400, fontSize: 18, color: T.text, marginBottom: 10, lineHeight: 1.3 },
    }, title),
    React.createElement("p", {
      style: { fontFamily: "'Plus Jakarta Sans'", fontSize: 13, color: T.textMuted, lineHeight: 1.65 },
    }, desc),
  );
}
function BuyCard({ c: e, inView: t, index: a }) {
  const [n, o] = useState(!1);
  return React.createElement(
    "div",
    {
      style: {
        background: e.primary ? T.teal : T.white,
        borderRadius: 20,
        padding: "36px 28px",
        boxShadow: n
          ? e.primary
            ? "0 12px 48px rgba(27,122,130,0.35)"
            : "0 8px 32px rgba(0,0,0,0.12)"
          : "0 2px 12px rgba(0,0,0,0.06)",
        transform: n ? "translateY(-6px)" : "translateY(0)",
        transition: "transform 250ms var(--ease-out), box-shadow 250ms ease, opacity 250ms ease",
        position: "relative",
        overflow: "hidden",
        opacity: t ? 1 : 0,
        transitionDelay: 0.1 * a + "s",
      },
      onMouseEnter: () => o(!0),
      onMouseLeave: () => o(!1),
    },
    e.badge &&
      React.createElement(
        "div",
        {
          style: {
            position: "absolute",
            top: 16,
            right: 16,
            background: T.gold,
            color: T.tealDark,
            fontSize: 8,
            fontWeight: 700,
            letterSpacing: "0.1em",
            padding: "3px 8px",
            borderRadius: 9999,
          },
        },
        e.badge,
      ),
    React.createElement(
      "div",
      {
        style: {
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: e.primary ? "rgba(255,255,255,0.15)" : T.tealLight,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 26,
          margin: "0 auto 20px",
        },
      },
      e.icon,
    ),
    React.createElement(
      "h3",
      {
        style: {
          fontFamily: "'Playfair Display', Georgia, serif",
          fontWeight: 400,
          fontSize: 20,
          color: e.primary ? T.white : T.text,
          marginBottom: 10,
        },
      },
      e.name,
    ),
    React.createElement(
      "p",
      {
        style: {
          fontFamily: "'Plus Jakarta Sans'",
          fontSize: 13,
          color: e.primary ? "rgba(255,255,255,0.75)" : T.textMuted,
          marginBottom: 28,
          lineHeight: 1.55,
        },
      },
      e.desc,
    ),
    React.createElement(
      RippleButton,
      {
        onClick: e.action,
        style: {
          width: "100%",
          background: e.primary ? T.gold : "transparent",
          color: e.primary ? T.tealDark : T.teal,
          border: e.primary ? "none" : `1.5px solid ${T.teal}`,
          borderRadius: 9999,
          padding: "12px",
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "'Plus Jakarta Sans'",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        hoverStyle: { filter: "brightness(1.06)", transform: "scale(1.02)" },
      },
      e.cta,
    ),
  );
}
function WhereToBuy() {
  const [e, t] = useInView(0.1),
    a = [
      {
        name: "Order via WhatsApp",
        desc: "Direct from Nevisan · Freshest stock · Personal service",
        cta: "💬 Order on WhatsApp",
        icon: "🌿",
        action: () => openWhatsApp(),
        primary: !0,
        badge: "RECOMMENDED",
      },
      {
        name: "Amazon India",
        desc: "Fast delivery nationwide",
        cta: "Shop on Amazon",
        icon: "📦",
        action: () =>
          window.open(
            "https://www.amazon.in/stores/NEVISAN/page/51CB39DB-29D6-4C38-8CC0-1D10087E5C8E?lp_asin=B0G38DJN2M&ref_=ast_bln",
            "_blank",
          ),
        primary: !1,
      },
      {
        name: "Flipkart",
        desc: "Fast delivery · Easy checkout",
        cta: "Shop on Flipkart",
        icon: "🛍️",
        action: () =>
          window.open("https://www.flipkart.com/store/nevisan", "_blank"),
        primary: !1,
      },
    ],
    { isMobile: n } = useViewport();
  return React.createElement(
    "div",
    { style: { background: T.cream, padding: n ? "64px 20px" : "100px 32px" } },
    React.createElement(
      "div",
      { style: { maxWidth: 960, margin: "0 auto", textAlign: "center" } },
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            marginBottom: 16,
          },
        },
        React.createElement("div", {
          style: { height: 1, width: 60, background: T.gold },
        }),
        React.createElement(
          "span",
          {
            style: {
              fontFamily: "'Plus Jakarta Sans'",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.14em",
              color: T.teal,
              textTransform: "uppercase",
            },
          },
          "Where to Buy",
        ),
        React.createElement("div", {
          style: { height: 1, width: 60, background: T.gold },
        }),
      ),
      React.createElement(
        "h2",
        {
          style: {
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 400,
            fontSize: "clamp(24px, 3.5vw, 44px)",
            color: T.text,
            marginBottom: 12,
          },
        },
        "Available wherever you shop",
      ),
      React.createElement(
        "p",
        {
          style: {
            fontFamily: "'Plus Jakarta Sans'",
            fontSize: 15,
            color: T.textMuted,
            marginBottom: n ? 36 : 56,
          },
        },
        "Order directly via WhatsApp or find us on Amazon and Flipkart",
      ),
      React.createElement(
        "div",
        {
          ref: e,
          style: {
            display: "grid",
            gridTemplateColumns: n ? "1fr" : "repeat(3,1fr)",
            gap: n ? 16 : 24,
          },
        },
        a.map((e, a) =>
          React.createElement(BuyCard, {
            key: e.name,
            c: e,
            inView: t,
            index: a,
          }),
        ),
      ),
    ),
  );
}
function ReviewCard({ r: e, inView: t, index: a }) {
  const [n, o] = useState(!1);
  return React.createElement(
    "div",
    {
      onMouseEnter: () => o(!0),
      onMouseLeave: () => o(!1),
      style: {
        background: T.white,
        borderRadius: 16,
        padding: "32px 28px",
        boxShadow: n
          ? "0 8px 32px rgba(27,122,130,0.12)"
          : "0 2px 8px rgba(0,0,0,0.05)",
        transform: n ? "translateY(-4px)" : "translateY(0)",
        transition: "transform 250ms var(--ease-out), box-shadow 250ms ease, opacity 250ms ease",
        opacity: t ? 1 : 0,
        transitionDelay: 0.15 * a + "s",
      },
    },
    React.createElement(
      "div",
      { style: { display: "flex", gap: 2, marginBottom: 18 } },
      Array(e.rating)
        .fill(0)
        .map((e, t) =>
          React.createElement(
            Icon,
            { key: t, name: "★", size: 14, color: T.gold },
          ),
        ),
    ),
    React.createElement(
      "div",
      {
        style: {
          fontFamily: "'Playfair Display', Georgia, serif",
          fontStyle: "italic",
          fontSize: 15,
          color: T.text,
          lineHeight: 1.7,
          marginBottom: 24,
        },
      },
      '"',
      e.text,
      '"',
    ),
    React.createElement(
      "div",
      {
        style: {
          fontFamily: "'Plus Jakarta Sans'",
          fontSize: 13,
          fontWeight: 600,
          color: T.teal,
        },
      },
      e.name,
    ),
    React.createElement(
      "div",
      { style: { fontFamily: "'Plus Jakarta Sans'", fontSize: 12, color: T.textMuted } },
      e.loc,
    ),
  );
}
function StarRating({ value: e, onChange: t }) {
  const [a, n] = React.useState(0);
  return React.createElement(
    "div",
    { style: { display: "flex", gap: 4 } },
    [1, 2, 3, 4, 5].map((o) =>
      React.createElement(
        "span",
        {
          key: o,
          onMouseEnter: () => t && n(o),
          onMouseLeave: () => t && n(0),
          onClick: () => t && t(o),
          style: {
            fontSize: 28,
            cursor: t ? "pointer" : "default",
            color: o <= (a || e) ? "#f5a623" : "#ddd",
            transition: "color 120ms, transform 120ms",
            transform: o <= (a || e) ? "scale(1.15)" : "scale(1)",
            display: "inline-block",
          },
        },
        "★",
      ),
    ),
  );
}
function ReviewForm() {
  const { isMobile: e } = useViewport(),
    [t, a] = React.useState({
      name: "",
      loc: "",
      tea: "",
      rating: 0,
      text: "",
    }),
    [n, o] = React.useState(!1),
    [i, r] = React.useState(""),
    l = {
      width: "100%",
      padding: "11px 14px",
      border: "1.5px solid #e0dcd4",
      borderRadius: 10,
      fontFamily: "'Plus Jakarta Sans'",
      fontSize: 14,
      color: "#1a1a1a",
      background: "#fff",
      outline: "none",
      boxSizing: "border-box",
      transition: "border-color 200ms",
    };
  return n
    ? React.createElement(
        "div",
        { style: { textAlign: "center", padding: "48px 24px" } },
        React.createElement(
          "div",
          { style: { fontSize: 52, marginBottom: 16 } },
          "🙏",
        ),
        React.createElement(
          "h3",
          {
            style: {
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 400,
              fontSize: 24,
              color: "#1a1a1a",
              marginBottom: 10,
            },
          },
          "Thank you for your review!",
        ),
        React.createElement(
          "p",
          {
            style: {
              fontFamily: "'Plus Jakarta Sans'",
              fontSize: 14,
              color: "#666",
              lineHeight: 1.7,
              maxWidth: 360,
              margin: "0 auto 20px",
            },
          },
          "Your review has been sent to us on WhatsApp. We read every one and feature the best on this page.",
        ),
        React.createElement(
          "button",
          {
            onClick: () => {
              (o(!1), a({ name: "", loc: "", tea: "", rating: 0, text: "" }));
            },
            style: {
              background: "#1b7a82",
              color: "#fff",
              border: "none",
              borderRadius: 9999,
              padding: "10px 28px",
              cursor: "pointer",
              fontFamily: "'Plus Jakarta Sans'",
              fontSize: 13,
            },
          },
          "Write another review",
        ),
      )
    : React.createElement(
        "form",
        {
          onSubmit: (e) => {
            if ((e.preventDefault(), 0 === t.rating))
              return void r("Please select a star rating.");
            if (t.text.trim().length < 15)
              return void r(
                "Please write at least a sentence about your experience.",
              );
            r("");
            const a = "★".repeat(t.rating) + "☆".repeat(5 - t.rating);
            (window.open(
              `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`🌿 *New Nevisan Review*\n\n${a} ${t.rating}/5\n\n*Customer:* ${t.name}${t.loc ? ` (${t.loc})` : ""}\n*Tea:* ${t.tea || "Not specified"}\n\n*Review:*\n"${t.text}"\n\n_Submitted via nevisan.in_`)}`,
              "_blank",
            ),
              o(!0));
          },
          style: { padding: e ? "28px 20px" : "36px 40px" },
        },
        React.createElement(
          "h3",
          {
            style: {
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 400,
              fontSize: 22,
              color: "#1a1a1a",
              marginBottom: 6,
            },
          },
          "Share your experience",
        ),
        React.createElement(
          "p",
          {
            style: {
              fontFamily: "'Plus Jakarta Sans'",
              fontSize: 13,
              color: "#5f6f70",
              marginBottom: 24,
            },
          },
          "Your review goes directly to us and may be featured on this page.",
        ),
        React.createElement(
          "div",
          { style: { marginBottom: 20 } },
          React.createElement(
            "div",
            {
              style: {
                fontFamily: "'Plus Jakarta Sans'",
                fontSize: 11,
                letterSpacing: "0.1em",
                color: "#5f6f70",
                textTransform: "uppercase",
                marginBottom: 8,
              },
            },
            "Your Rating *",
          ),
          React.createElement(StarRating, {
            value: t.rating,
            onChange: (e) => a((t) => ({ ...t, rating: e })),
          }),
        ),
        React.createElement(
          "div",
          {
            style: {
              display: "grid",
              gridTemplateColumns: e ? "1fr" : "1fr 1fr",
              gap: 12,
              marginBottom: 12,
            },
          },
          React.createElement(
            "div",
            null,
            React.createElement(
              "label",
              {
                htmlFor: "wholesale-name",
                style: {
                  fontFamily: "'Plus Jakarta Sans'",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  color: "#5f6f70",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: 6,
                },
              },
              "Your Name *",
            ),
            React.createElement("input", {
              id: "wholesale-name",
              required: !0,
              style: l,
              placeholder: "e.g. Priya M.",
              value: t.name,
              onChange: (e) => a((t) => ({ ...t, name: e.target.value })),
              onFocus: (e) => (e.target.style.borderColor = "#1b7a82"),
              onBlur: (e) => (e.target.style.borderColor = "#e0dcd4"),
            }),
          ),
          React.createElement(
            "div",
            null,
            React.createElement(
              "label",
              {
                htmlFor: "wholesale-city",
                style: {
                  fontFamily: "'Plus Jakarta Sans'",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  color: "#5f6f70",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: 6,
                },
              },
              "City",
            ),
            React.createElement("input", {
              id: "wholesale-city",
              style: l,
              placeholder: "e.g. Mumbai",
              value: t.loc,
              onChange: (e) => a((t) => ({ ...t, loc: e.target.value })),
              onFocus: (e) => (e.target.style.borderColor = "#1b7a82"),
              onBlur: (e) => (e.target.style.borderColor = "#e0dcd4"),
            }),
          ),
        ),
        React.createElement(
          "div",
          { style: { marginBottom: 12 } },
          React.createElement(
            "label",
            {
              htmlFor: "wholesale-tea",
              style: {
                fontFamily: "'Plus Jakarta Sans'",
                fontSize: 11,
                letterSpacing: "0.1em",
                color: "#5f6f70",
                textTransform: "uppercase",
                display: "block",
                marginBottom: 6,
              },
            },
            "Which Tea?",
          ),
          React.createElement(
            "select",
            {
              id: "wholesale-tea",
              style: {
                ...l,
                appearance: "none",
                background:
                  "#fff url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23888' fill='none' stroke-width='1.5'/%3E%3C/svg%3E\") no-repeat right 14px center",
              },
              value: t.tea,
              onChange: (e) => a((t) => ({ ...t, tea: e.target.value })),
              onFocus: (e) => (e.target.style.borderColor = "#1b7a82"),
              onBlur: (e) => (e.target.style.borderColor = "#e0dcd4"),
            },
            React.createElement(
              "option",
              { value: "" },
              "Select a tea (optional)",
            ),
            TEAS.map((e) =>
              React.createElement(
                "option",
                { key: e.name, value: e.name },
                e.name,
              ),
            ),
          ),
        ),
        React.createElement(
          "div",
          { style: { marginBottom: 20 } },
          React.createElement(
            "label",
            {
              htmlFor: "wholesale-review",
              style: {
                fontFamily: "'Plus Jakarta Sans'",
                fontSize: 11,
                letterSpacing: "0.1em",
                color: "#5f6f70",
                textTransform: "uppercase",
                display: "block",
                marginBottom: 6,
              },
            },
            "Your Review *",
          ),
          React.createElement("textarea", {
            id: "wholesale-review",
            required: !0,
            rows: 4,
            style: { ...l, resize: "vertical" },
            placeholder:
              "What did you love about it? How does it taste? How do you drink it?",
            value: t.text,
            onChange: (e) => a((t) => ({ ...t, text: e.target.value })),
            onFocus: (e) => (e.target.style.borderColor = "#1b7a82"),
            onBlur: (e) => (e.target.style.borderColor = "#e0dcd4"),
          }),
        ),
        i &&
          React.createElement(
            "div",
            {
              style: {
                fontFamily: "'Plus Jakarta Sans'",
                fontSize: 13,
                color: "#e8312a",
                marginBottom: 14,
              },
            },
            "⚠ ",
            i,
          ),
        React.createElement(
          "button",
          {
            type: "submit",
            style: {
              width: "100%",
              background: "#1b7a82",
              color: "#fff",
              border: "none",
              borderRadius: 12,
              padding: "14px",
              cursor: "pointer",
              fontFamily: "'Plus Jakarta Sans'",
              fontSize: 14,
              fontWeight: 600,
              transition: "filter 200ms",
            },
            onMouseEnter: (e) =>
              (e.currentTarget.style.filter = "brightness(1.1)"),
            onMouseLeave: (e) => (e.currentTarget.style.filter = "none"),
          },
          "Submit Review via WhatsApp →",
        ),
        React.createElement(
          "p",
          {
            style: {
              fontFamily: "'Plus Jakarta Sans'",
              fontSize: 11,
              color: "#767676",
              textAlign: "center",
              marginTop: 10,
            },
          },
          "Your review opens WhatsApp pre-filled — just tap Send.",
        ),
      );
}
function Testimonials() {
  const [e, t] = useInView(0.1),
    a = useGsapReveal(),
    { isMobile: n, isTablet: o } = useViewport();
  return React.createElement(
    "div",
    {
      style: {
        background: T.creamDark,
        padding: n ? "64px 20px" : "100px 32px",
      },
    },
    React.createElement(
      "div",
      { style: { maxWidth: 1200, margin: "0 auto" } },
      React.createElement(
        "div",
        { ref: a, style: { textAlign: "center", marginBottom: n ? 36 : 56 } },
        React.createElement(
          "div",
          {
            "data-gsap-reveal": !0,
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              marginBottom: 16,
            },
          },
          React.createElement("div", {
            style: { height: 1, width: 60, background: T.gold },
          }),
          React.createElement(
            "span",
            {
              style: {
                fontFamily: "'Plus Jakarta Sans'",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.14em",
                color: T.teal,
                textTransform: "uppercase",
              },
            },
            "Guestbook",
          ),
          React.createElement("div", {
            style: { height: 1, width: 60, background: T.gold },
          }),
        ),
        React.createElement(
          "h2",
          {
            "data-gsap-reveal": !0,
            style: {
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 400,
              fontSize: "clamp(24px, 3.5vw, 44px)",
              color: T.text,
              marginBottom: 12,
            },
          },
          "The Guestbook",
        ),
        React.createElement(
          "p",
          {
            "data-gsap-reveal": !0,
            style: { fontFamily: "'Plus Jakarta Sans'", fontSize: 15, color: T.textMuted },
          },
          "Real reviews from people who actually drink the tea. We don't edit them.",
        ),
      ),
      React.createElement(
        "div",
        {
          ref: e,
          style: {
            display: "grid",
            gridTemplateColumns: n
              ? "1fr"
              : o
                ? "repeat(2,1fr)"
                : "repeat(3,1fr)",
            gap: n ? 16 : 28,
            marginBottom: n ? 48 : 72,
          },
        },
        [
          {
            text: "I\u2019ve tried many green teas, but this one really stands out. The aroma is fresh, and the taste is smooth without any bitterness. You can actually feel the natural flavour of the tea leaves, and it\u2019s perfect for both morning energy and evening relaxation. The best part \u2014 it can be steeped twice and still tastes great! Definitely worth the price.",
            name: "Uditijain",
            loc: "Verified Amazon Purchase \u2022 Flavour: Whiskey",
            rating: 5,
          },
          {
            text: "Awesome flavour.. it really do taste like rum.. all natural flavour.. no added sweeteners.. best product.. will surely will purchase more..",
            name: "Ridhi",
            loc: "Verified Amazon Purchase \u2022 Flavour: Exotic Rum",
            rating: 5,
          },
          {
            text: "Great taste, absolutely loved it! Can\u2019t wait to try all the delicious flavours and enjoy every single one of them soon!",
            name: "Chandraprakash Shyamsukha",
            loc: "Verified Amazon Purchase \u2022 Flavour: Lemongrass",
            rating: 5,
          },
          {
            text: "I'm very impressed with NEVISAN's Lemongrass Tea. It has a wonderfully fresh and zesty aroma right out of the package. The tea brews into a beautiful pale yellow and has a crisp, clean, and smooth citrus flavour. It's not bitter at all, just incredibly refreshing with a hint of natural sweetness. It's a fantastic, high-quality, caffeine-free tea. Highly recommended!",
            name: "Dinesh tiwari",
            loc: "Verified Amazon Purchase \u2022 Flavour: Lemongrass",
            rating: 5,
          },
          {
            text: "Tried different flavours...really enjoyed it\nHighly recommend buying the blue flower and lemongrass flavour.\nAssam tea at its best..great work team",
            name: "Amazon Customer",
            loc: "Verified Amazon Purchase \u2022 Flavour: Blue Flower",
            rating: 5,
          },
          {
            text: "Best green tea so far ...in spearmint flavour...From Nevisan",
            name: "Richa Jain",
            loc: "Verified Buyer \u2022 Flavour: Spearmint",
            rating: 5,
          },
        ].map((e, a) =>
          React.createElement(ReviewCard, {
            key: e.name,
            r: e,
            inView: t,
            index: a,
          }),
        ),
      ),
      React.createElement(
        "div",
        { style: { maxWidth: 680, margin: "0 auto" } },
        React.createElement(
          "div",
          { style: { textAlign: "center", marginBottom: 32 } },
          React.createElement(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
                marginBottom: 14,
              },
            },
            React.createElement("div", {
              style: { height: 1, width: 48, background: T.gold },
            }),
            React.createElement(
              "span",
              {
                style: {
                  fontFamily: "'Plus Jakarta Sans'",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  color: T.teal,
                  textTransform: "uppercase",
                },
              },
              "Share Yours",
            ),
            React.createElement("div", {
              style: { height: 1, width: 48, background: T.gold },
            }),
          ),
          React.createElement(
            "h3",
            {
              style: {
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 400,
                fontSize: "clamp(22px, 3vw, 34px)",
                color: T.text,
              },
            },
            "Tried Nevisan tea?",
          ),
        ),
        React.createElement(
          "div",
          {
            style: {
              background: T.white,
              borderRadius: 20,
              boxShadow: "0 4px 28px rgba(0,0,0,0.08)",
              overflow: "hidden",
            },
          },
          React.createElement(ReviewForm, null),
        ),
      ),
    ),
  );
}
function Footer({ setPage: e }) {
  const { isMobile: t } = useViewport();
  return React.createElement(
    "footer",
    {
      style: {
        background: T.tealDark,
        color: "rgba(255,255,255,0.8)",
        padding: t ? "48px 20px 28px" : "64px 32px 32px",
      },
    },
    React.createElement(
      "div",
      { style: { maxWidth: 1200, margin: "0 auto" } },
      React.createElement(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: t ? "1fr 1fr" : "2fr 1fr 1fr 1fr",
            gap: t ? 32 : 48,
            marginBottom: 40,
          },
        },
        React.createElement(
          "div",
          { style: { gridColumn: t ? "1 / -1" : "auto" } },
          React.createElement(NevLogo, { size: t ? 56 : 72 }),
          React.createElement(
            "p",
            {
              style: {
                fontFamily: "'Plus Jakarta Sans'",
                fontSize: 13,
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.55)",
                marginTop: 20,
                maxWidth: 280,
              },
            },
            "Packed with care in Guwahati.",
            React.createElement("br", null),
            "nevisan12@gmail.com · +91 98642 45687",
          ),
          React.createElement(
            "button",
            {
              onClick: () => openWhatsApp(),
              style: {
                marginTop: 16,
                background: "#25D366",
                color: "#fff",
                border: "none",
                borderRadius: 9999,
                padding: "9px 20px",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Plus Jakarta Sans'",
                display: "flex",
                alignItems: "center",
                gap: 6,
                transition: "filter 200ms",
              },
              onMouseEnter: (e) =>
                (e.currentTarget.style.filter = "brightness(1.1)"),
              onMouseLeave: (e) => (e.currentTarget.style.filter = "none"),
            },
            React.createElement("span", null, "💬"),
            " Order on WhatsApp",
          ),
          React.createElement(
            "div",
            {
              style: {
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginTop: 12,
              },
            },
            React.createElement(
              "div",
              {
                style: {
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: 6,
                  padding: "5px 12px",
                  fontFamily: "'Plus Jakarta Sans'",
                  fontSize: 10,
                  color: "rgba(255,255,255,0.4)",
                  letterSpacing: "0.06em",
                },
              },
              "FSSAI 10325001000313",
            ),
            React.createElement(
              "div",
              {
                style: {
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: 6,
                  padding: "5px 12px",
                  fontFamily: "'Plus Jakarta Sans'",
                  fontSize: 10,
                  color: "rgba(255,255,255,0.4)",
                  letterSpacing: "0.06em",
                },
              },
              "GSTIN 18AFAPJ8203P1Z7",
            ),
          ),
          React.createElement(
            "div",
            {
              style: {
                marginTop: 24,
                padding: "20px",
                background: "rgba(255,255,255,0.05)",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.1)",
              },
            },
            React.createElement(
              "div",
              {
                style: {
                  fontFamily: "'Plus Jakarta Sans'",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  color: T.gold,
                  textTransform: "uppercase",
                  marginBottom: 8,
                },
              },
              "Free Tea Brewing Guide",
            ),
            React.createElement(
              "p",
              {
                style: {
                  fontFamily: "'Plus Jakarta Sans'",
                  fontSize: 12,
                  color: "rgba(255,255,255,0.6)",
                  marginBottom: 12,
                  lineHeight: 1.5,
                },
              },
              "Sign up for our newsletter and get a free comprehensive tea brewing guide PDF delivered to your inbox.",
            ),
            React.createElement(
              "form",
              {
                onSubmit: (e) => {
                  e.preventDefault();
                  const email = e.target.email.value;
                  if (email) {
                    alert("Thank you for signing up! Your free Tea Brewing Guide will be sent to " + email);
                    e.target.reset();
                  }
                },
                style: {
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                },
              },
              React.createElement(
                "input",
                {
                  type: "email",
                  name: "email",
                  placeholder: "Your email address",
                  required: true,
                  style: {
                    flex: 1,
                    minWidth: 180,
                    padding: "10px 14px",
                    borderRadius: 8,
                    border: "1px solid rgba(255,255,255,0.2)",
                    background: "rgba(255,255,255,0.08)",
                    color: "#fff",
                    fontFamily: "'Plus Jakarta Sans'",
                    fontSize: 13,
                    outline: "none",
                  },
                },
              ),
              React.createElement(
                "button",
                {
                  type: "submit",
                  style: {
                    padding: "10px 20px",
                    borderRadius: 8,
                    border: "none",
                    background: T.gold,
                    color: T.tealDark,
                    fontFamily: "'Plus Jakarta Sans'",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                    letterSpacing: "0.04em",
                    transition: "filter 0.2s",
                  },
                  onMouseEnter: (e) =>
                    (e.currentTarget.style.filter = "brightness(1.1)"),
                  onMouseLeave: (e) =>
                    (e.currentTarget.style.filter = "none"),
                },
                "Get Free Guide",
              ),
            ),
          ),
        ),
        React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            {
              style: {
                fontFamily: "'Plus Jakarta Sans'",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.12em",
                color: T.gold,
                textTransform: "uppercase",
                marginBottom: 20,
              },
            },
            "Teas",
          ),
          [
            "Lemongrass",
            "Blue Flower",
            "Spearmint",
            "Chamomile",
            "Tulsi",
            "Rum",
            "Whiskey",
            "GABA Oolong",
            "Organic Green",
          ].map((t) =>
            React.createElement(
              "div",
              {
                key: t,
                onClick: () => e("Collection"),
                style: {
                  fontFamily: "'Plus Jakarta Sans'",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.55)",
                  marginBottom: 10,
                  cursor: "pointer",
                  transition: "color 150ms",
                },
                onMouseEnter: (e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.85)"),
                onMouseLeave: (e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.55)"),
              },
              t,
            ),
          ),
        ),
        React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            {
              style: {
                fontFamily: "'Plus Jakarta Sans'",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.12em",
                color: T.gold,
                textTransform: "uppercase",
                marginBottom: 20,
              },
            },
            "Company",
          ),
          [
            "About",
            "Certifications",
            "Journal",
            "Wholesale",
            "FAQ",
            "Quiz",
          ].map((t) =>
            React.createElement(
              "div",
              {
                key: t,
                onClick: () => {
                  "FAQ" === t
                    ? (window.location.href = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, "") + "/faq/")
                    : "Quiz" === t
                      ? (window.location.href = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, "") + "/quiz/")
                      : e(t);
                },
                style: {
                  fontFamily: "'Plus Jakarta Sans'",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.55)",
                  marginBottom: 10,
                  cursor: "pointer",
                  transition: "color 150ms",
                },
                onMouseEnter: (e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.85)"),
                onMouseLeave: (e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.55)"),
              },
              t,
            ),
          ),
        ),
        React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            {
              style: {
                fontFamily: "'Plus Jakarta Sans'",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.12em",
                color: T.gold,
                textTransform: "uppercase",
                marginBottom: 20,
              },
            },
            "Connect",
          ),
          [
            {
              label: "Instagram",
              url: "https://www.instagram.com/nevisan.tea/",
            },
            { label: "WhatsApp", url: `https://wa.me/${WA_NUMBER}` },
            {
              label: "Amazon Store",
              url: "https://www.amazon.in/stores/NEVISAN/page/51CB39DB-29D6-4C38-8CC0-1D10087E5C8E?lp_asin=B0G38DJN2M&ref_=ast_bln",
            },
            {
              label: "Flipkart",
              url: "https://www.flipkart.com/store/nevisan",
            },
          ].map(({ label: e, url: t }) =>
            React.createElement(
              "div",
              {
                key: e,
                onClick: () => window.open(t, "_blank"),
                style: {
                  fontFamily: "'Plus Jakarta Sans'",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.55)",
                  marginBottom: 10,
                  cursor: "pointer",
                  transition: "color 150ms",
                },
                onMouseEnter: (e) => (e.currentTarget.style.color = T.gold),
                onMouseLeave: (e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.55)"),
              },
              e,
            ),
          ),
        ),
      ),
      React.createElement(
        "div",
        {
          style: {
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: 24,
            display: "flex",
            flexDirection: t ? "column" : "row",
            justifyContent: "space-between",
            alignItems: t ? "flex-start" : "center",
            gap: t ? 12 : 0,
          },
        },
        React.createElement(
          "span",
          {
            style: {
              fontFamily: "'Plus Jakarta Sans'",
              fontSize: 12,
              color: "rgba(255,255,255,0.35)",
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexWrap: "wrap",
            },
          },
          React.createElement(
            "span",
            null,
            "\u00a9 2026 Nevisan Tea \u00b7 Mahabir Enterprise, Guwahati, Assam",
          ),
          React.createElement("span", null, "\u00b7"),
          React.createElement(
            "a",
            {
              href: "/llms.txt",
              style: {
                color: "rgba(255,255,255,0.45)",
                textDecoration: "none",
              },
            },
            "AI Directory",
          ),
        ),
        React.createElement(
          "div",
          { style: { display: "flex", gap: 8, flexWrap: "wrap" } },
          ["PGS ORGANIC", "FSSAI", "MADE IN INDIA"].map((e) =>
            React.createElement(
              "span",
              {
                key: e,
                style: {
                  fontFamily: "'Plus Jakarta Sans'",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  color: "rgba(255,255,255,0.4)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 4,
                  padding: "4px 10px",
                },
              },
              e,
            ),
          ),
        ),
      ),
    ),
  );
}
function CollectionSection({ setPage: e }) {
  const t = TEAS.slice(0, 3),
    a = useGsapReveal(),
    { isMobile: n, isTablet: o } = useViewport(),
    i = n ? "1fr" : o ? "repeat(2,1fr)" : "repeat(3,1fr)",
    [r, l] = useState(null);
  return React.createElement(
    "div",
    { style: { background: T.cream, padding: n ? "60px 20px" : "100px 32px" } },
    React.createElement(
      "div",
      { style: { maxWidth: 1200, margin: "0 auto" } },
      React.createElement(
        "a",
        {
          href: window.location.pathname.replace(/\/[^\/]*$/, "") + "/quiz/",
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
            background:
              "linear-gradient(135deg," + T.tealDark + "," + T.teal + ")",
            borderRadius: 16,
            padding: n ? "20px 22px" : "22px 32px",
            marginBottom: n ? 28 : 40,
            textDecoration: "none",
            boxShadow: "0 8px 28px rgba(15,63,69,0.18)",
            transition: "transform 200ms,box-shadow 200ms",
          },
          onMouseEnter: (e) => {
            ((e.currentTarget.style.transform = "translateY(-2px)"),
              (e.currentTarget.style.boxShadow =
                "0 12px 36px rgba(15,63,69,0.28)"));
          },
          onMouseLeave: (e) => {
            ((e.currentTarget.style.transform = "translateY(0)"),
              (e.currentTarget.style.boxShadow =
                "0 8px 28px rgba(15,63,69,0.18)"));
          },
        },
        React.createElement(
          "div",
          { style: { display: "flex", alignItems: "center", gap: 14 } },
          React.createElement(
            "span",
            { style: { fontSize: 30 } },
            "\uD83C\uDF75",
          ),
          React.createElement(
            "div",
            null,
            React.createElement(
              "div",
              {
                style: {
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: n ? 17 : 20,
                  color: T.white,
                  marginBottom: 2,
                },
              },
              "Not sure which tea is for you?",
            ),
            React.createElement(
              "div",
              {
                style: {
                  fontFamily: "'Plus Jakarta Sans'",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.75)",
                },
              },
              "Take our 2-minute quiz and find your perfect match.",
            ),
          ),
        ),
        React.createElement(
          "span",
          {
            style: {
              background: T.gold,
              color: T.tealDark,
              padding: "11px 24px",
              borderRadius: 9999,
              fontFamily: "'Plus Jakarta Sans'",
              fontSize: 14,
              fontWeight: 600,
              whiteSpace: "nowrap",
            },
          },
          "Take the Quiz \u2192",
        ),
      ),
      React.createElement(
        "div",
        {
          ref: a,
          style: {
            display: "flex",
            flexDirection: n ? "column" : "row",
            justifyContent: "space-between",
            alignItems: n ? "flex-start" : "flex-end",
            gap: n ? 16 : 0,
            marginBottom: n ? 32 : 48,
          },
        },
        React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            {
              "data-gsap-reveal": !0,
              style: {
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginBottom: 14,
              },
            },
            React.createElement("div", {
              style: { height: 1, width: 48, background: T.gold },
            }),
            React.createElement(
              "span",
              {
                style: {
                  fontFamily: "'Plus Jakarta Sans'",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  color: T.teal,
                  textTransform: "uppercase",
                },
              },
              "The Collection",
            ),
          ),
          React.createElement(
            "h2",
            {
              "data-gsap-reveal": !0,
              style: {
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 400,
                fontSize: "clamp(24px, 3.5vw, 46px)",
                color: T.text,
              },
            },
            "Nine varieties, one origin",
          ),
        ),
        React.createElement(
          "button",
          {
            "data-gsap-reveal": !0,
            onClick: () => e("Collection"),
            style: {
              background: "transparent",
              color: T.teal,
              border: `1.5px solid ${T.teal}`,
              borderRadius: 9999,
              padding: "10px 28px",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "'Plus Jakarta Sans'",
              whiteSpace: "nowrap",
              transition: "background 200ms, color 200ms",
              alignSelf: n ? "flex-start" : "auto",
            },
            onMouseEnter: (e) => {
              ((e.currentTarget.style.background = T.teal),
                (e.currentTarget.style.color = T.white));
            },
            onMouseLeave: (e) => {
              ((e.currentTarget.style.background = "transparent"),
                (e.currentTarget.style.color = T.teal));
            },
          },
          "View all →",
        ),
      ),
      React.createElement(
        "div",
        {
          style: { display: "grid", gridTemplateColumns: i, gap: n ? 16 : 24 },
        },
        t.map((e, t) =>
          React.createElement(TeaCard, {
            key: e.name,
            tea: e,
            onView: l,
            index: t,
          }),
        ),
      ),
    ),
    r &&
      ReactDOM.createPortal(
        React.createElement(
          "div",
          {
            style: {
              position: "fixed",
              inset: 0,
              background: "rgba(15,63,69,0.65)",
              zIndex: 200,
              display: "flex",
              alignItems: n ? "flex-end" : "center",
              justifyContent: "center",
              padding: n ? 0 : 24,
              backdropFilter: "blur(4px)",
              pointerEvents: "auto",
            },
            onClick: () => l(null),
          },
          React.createElement(
            "div",
            {
              style: {
                background: T.white,
                borderRadius: n ? "20px 20px 0 0" : 20,
                maxWidth: n ? "100%" : 500,
                width: "100%",
                maxHeight: n ? "88vh" : "90vh",
                overflowY: "auto",
                boxShadow: "0 -8px 40px rgba(0,0,0,0.25)",
                animation: n
                  ? "slide-up 0.3s ease both"
                  : "page-enter 0.3s ease both",
                pointerEvents: "auto",
              },
              onClick: (e) => e.stopPropagation(),
            },
            n &&
              React.createElement("div", {
                style: {
                  width: 40,
                  height: 4,
                  background: "#ddd",
                  borderRadius: 9999,
                  margin: "12px auto 0",
                },
              }),
            n
              ? React.createElement(
                  "div",
                  { style: { padding: "12px 16px 24px" } },
                  React.createElement(
                    "div",
                    {
                      style: {
                        display: "flex",
                        gap: 14,
                        marginBottom: 14,
                        position: "relative",
                      },
                    },
                    React.createElement(
                      "div",
                      {
                        style: {
                          width: 110,
                          height: 110,
                          borderRadius: 14,
                          overflow: "hidden",
                          flexShrink: 0,
                          background: T.white,
                          border: "1px solid #eee",
                          position: "relative",
                        },
                      },
                      r.img
                        ? React.createElement("img", {
                            src: r.img,
                            alt: r.name,
                            loading: "lazy",
                            style: {
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                              padding: "8px",
                              boxSizing: "border-box",
                            },
                          })
                        : React.createElement(
                            "div",
                            {
                              style: {
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                height: "100%",
                              },
                            },
                            React.createElement(
                              "span",
                              { style: { fontSize: 40 } },
                              "🍃",
                            ),
                          ),
                    ),
                    React.createElement(
                      "div",
                      { style: { flex: 1, minWidth: 0 } },
                      React.createElement(
                        "h2",
                        {
                          style: {
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontWeight: 400,
                            fontSize: 17,
                            color: T.text,
                            marginBottom: 6,
                            lineHeight: 1.3,
                          },
                        },
                        r.name,
                      ),
                      React.createElement(
                        "div",
                        {
                          style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            marginBottom: 4,
                          },
                        },
                        React.createElement(
                          "span",
                          {
                            style: {
                              fontFamily: "'Plus Jakarta Sans'",
                              fontSize: 20,
                              fontWeight: 700,
                              color: T.teal,
                            },
                          },
                          "MRP ₹499",
                        ),
                        React.createElement(
                          "span",
                          {
                            style: {
                              fontFamily: "'Plus Jakarta Sans'",
                              fontSize: 11,
                              color: T.textMuted,
                            },
                          },
                          "· 50 gm",
                        ),
                      ),
                      r.bestseller &&
                        React.createElement(
                          "div",
                          {
                            style: {
                              display: "inline-block",
                              background: T.gold,
                              color: T.tealDark,
                              fontSize: 9,
                              fontWeight: 700,
                              padding: "3px 9px",
                              borderRadius: 9999,
                            },
                          },
                          React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 4 } }, React.createElement(NevIcon, { name: "★", size: 10, color: T.tealDark }), "BESTSELLER"),
                        ),
                    ),
                    React.createElement(
                      "button",
                      {
                        onClick: (e) => {
                          (e.stopPropagation(), l(null));
                        },
                        style: {
                          position: "absolute",
                          top: 0,
                          right: 0,
                          background: "rgba(0,0,0,0.08)",
                          border: "none",
                          borderRadius: "50%",
                          width: 30,
                          height: 30,
                          cursor: "pointer",
                          fontSize: 15,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: T.text,
                        },
                      },
                      "✕",
                    ),
                  ),
                  React.createElement(
                    "div",
                    {
                      style: {
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                        marginBottom: 16,
                      },
                    },
                    React.createElement(AddToCartBtn, {
                      tea: r,
                      onAdded: () => l(null),
                    }),
                    React.createElement(
                      RippleButton,
                      {
                        onClick: () => openWhatsApp(r.name),
                        style: {
                          width: "100%",
                          background: "#25D366",
                          color: "#fff",
                          border: "none",
                          borderRadius: 9999,
                          padding: "11px",
                          fontSize: 13,
                          fontWeight: 600,
                          cursor: "pointer",
                          fontFamily: "'Plus Jakarta Sans'",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 8,
                        },
                        hoverStyle: {
                          transform: "scale(1.02)",
                          filter: "brightness(1.05)",
                        },
                      },
                      React.createElement("span", null, "💬"),
                      " Order via WhatsApp",
                    ),
                    React.createElement(
                      "div",
                      {
                        style: {
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: 8,
                        },
                      },
                      React.createElement(
                        "button",
                        {
                          onClick: () => {
                            trackExternalClick(e.name, "Amazon");
                            window.open(
                              "https://www.amazon.in/stores/NEVISAN/page/51CB39DB-29D6-4C38-8CC0-1D10087E5C8E?lp_asin=B0G38DJN2M&ref_=ast_bln",
                              "_blank",
                            );
                          },
                          style: {
                            background: "#FF9900",
                            color: "#fff",
                            border: "none",
                            borderRadius: 9999,
                            padding: "9px",
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: "pointer",
                            fontFamily: "'Plus Jakarta Sans'",
                          },
                        },
                        "Amazon",
                      ),
                      React.createElement(
                        "button",
                        {
                          onClick: () => {
                            trackExternalClick(e.name, "Flipkart");
                            window.open(
                              "https://www.flipkart.com/store/nevisan",
                              "_blank",
                            );
                          },
                          style: {
                            background: "#2874F0",
                            color: "#fff",
                            border: "none",
                            borderRadius: 9999,
                            padding: "9px",
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: "pointer",
                            fontFamily: "'Plus Jakarta Sans'",
                          },
                        },
                        "Flipkart",
                      ),
                    ),
                  ),
                  React.createElement(
                    "div",
                    {
                      style: { borderTop: "1px solid #f0f0f0", paddingTop: 14 },
                    },
                    React.createElement(
                      "p",
                      {
                        style: {
                          fontFamily: "'Plus Jakarta Sans'",
                          fontSize: 13,
                          color: T.textMuted,
                          lineHeight: 1.6,
                          marginBottom: 12,
                        },
                      },
                      r.short,
                    ),
                    r.benefits &&
                      React.createElement(
                        "div",
                        { style: { marginBottom: 16 } },
                        React.createElement(
                          "div",
                          {
                            style: {
                              fontFamily: "'Plus Jakarta Sans'",
                              fontSize: 11,
                              letterSpacing: "0.13em",
                              color: T.teal,
                              textTransform: "uppercase",
                              fontWeight: 600,
                              marginBottom: 10,
                            },
                          },
                          "Key Benefits",
                        ),
                        r.benefits.map((e, t) =>
                          React.createElement(
                            "div",
                            {
                              key: t,
                              style: {
                                display: "flex",
                                gap: 10,
                                alignItems: "flex-start",
                                marginBottom: 8,
                              },
                            },
                            React.createElement(
                                "span",
                                {
                                  style: {
                                    lineHeight: 1,
                                    flexShrink: 0,
                                    marginTop: 1,
                                    display: "inline-flex",
                                    color: T.gold,
                                  },
                                },
                                React.createElement(NevIcon, { name: e.icon, size: 18, color: T.gold }),
                              ),
                            React.createElement(
                              "div",
                              null,
                              React.createElement(
                                "div",
                                {
                                  style: {
                                    fontFamily: "'Plus Jakarta Sans'",
                                    fontSize: 12,
                                    fontWeight: 600,
                                    color: T.text,
                                  },
                                },
                                e.title,
                              ),
                              React.createElement(
                                "div",
                                {
                                  style: {
                                    fontFamily: "'Plus Jakarta Sans'",
                                    fontSize: 11,
                                    color: T.textMuted,
                                    lineHeight: 1.5,
                                  },
                                },
                                e.desc,
                              ),
                            ),
                          ),
                        ),
                      ),
                    r.brew &&
                      React.createElement(
                        "div",
                        {
                          style: {
                            background: "rgba(27,122,130,0.07)",
                            borderRadius: 10,
                            padding: "10px 14px",
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                          },
                        },
                        React.createElement(
                          "span",
                          { style: { fontSize: 16 } },
                          "🍵",
                        ),
                        React.createElement(
                          "div",
                          null,
                          React.createElement(
                            "div",
                            {
                              style: {
                                fontFamily: "'Plus Jakarta Sans'",
                                fontSize: 10,
                                letterSpacing: "0.12em",
                                color: T.teal,
                                textTransform: "uppercase",
                                fontWeight: 600,
                                marginBottom: 2,
                              },
                            },
                            "Brewing Guide",
                          ),
                          React.createElement(
                            "div",
                            {
                              style: {
                                fontFamily: "'Plus Jakarta Sans'",
                                fontSize: 12,
                                color: T.textMuted,
                              },
                            },
                            r.brew,
                          ),
                        ),
                      ),
                  ),
                )
              : React.createElement(
                  React.Fragment,
                  null,
                  React.createElement(
                    "div",
                    {
                      style: {
                        height: 260,
                        overflow: "hidden",
                        position: "relative",
                        background: T.white,
                        borderBottom: "1px solid #eee",
                      },
                    },
                    r.img
                      ? React.createElement("img", {
                          src: r.img,
                          alt: r.name,
                          loading: "lazy",
                          style: {
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            padding: "16px",
                            boxSizing: "border-box",
                          },
                        })
                      : React.createElement(
                          "div",
                          {
                            style: {
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              height: "100%",
                            },
                          },
                          React.createElement(
                            "span",
                            { style: { fontSize: 72, opacity: 0.7 } },
                            "🍃",
                          ),
                        ),
                    React.createElement(
                      "button",
                      {
                        onClick: (e) => {
                          (e.stopPropagation(), l(null));
                        },
                        "aria-label": "Close",
                        style: {
                          position: "absolute",
                          top: 14,
                          right: 14,
                          background: "rgba(255,255,255,0.9)",
                          border: "none",
                          borderRadius: "50%",
                          width: 32,
                          height: 32,
                          cursor: "pointer",
                          fontSize: 16,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: T.text,
                          zIndex: 2,
                        },
                      },
                      "✕",
                    ),
                    r.bestseller &&
                      React.createElement(
                        "div",
                        {
                          style: {
                            position: "absolute",
                            top: 42,
                            left: 14,
                            background: T.gold,
                            color: T.tealDark,
                            fontSize: 9,
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            padding: "4px 10px",
                            borderRadius: 9999,
                          },
                        },
                        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 4 } }, React.createElement(NevIcon, { name: "★", size: 10, color: T.tealDark }), "BESTSELLER"),
                      ),
                  ),
                  React.createElement(
                    "div",
                    { style: { padding: "32px" } },
                    React.createElement(
                      "h2",
                      {
                        style: {
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontWeight: 400,
                          fontSize: 26,
                          color: T.text,
                          marginBottom: 6,
                        },
                      },
                      r.name,
                    ),
                    React.createElement(
                      "div",
                      {
                        style: {
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          marginBottom: 4,
                        },
                      },
                      React.createElement(
                        "span",
                        {
                          style: {
                            fontFamily: "'Plus Jakarta Sans'",
                            fontSize: 24,
                            fontWeight: 700,
                            color: T.teal,
                          },
                        },
                        "MRP ₹499",
                      ),
                      React.createElement(
                        "span",
                        {
                          style: {
                            fontFamily: "'Plus Jakarta Sans'",
                            fontSize: 11,
                            color: T.textMuted,
                          },
                        },
                        "· 50 gm",
                      ),
                    ),
                    React.createElement(
                      "p",
                      {
                        style: {
                          fontFamily: "'Plus Jakarta Sans'",
                          fontSize: 13,
                          color: T.textMuted,
                          lineHeight: 1.6,
                          marginBottom: 12,
                        },
                      },
                      r.short,
                    ),
                    React.createElement(
                      "div",
                      {
                        style: {
                          display: "flex",
                          flexDirection: "column",
                          gap: 8,
                          marginBottom: 20,
                        },
                      },
                      React.createElement(
                        RippleButton,
                        {
                          onClick: () => openWhatsApp(r.name),
                          style: {
                            width: "100%",
                            background: "#25D366",
                            color: "#fff",
                            border: "none",
                            borderRadius: 9999,
                            padding: "13px",
                            fontSize: 14,
                            fontWeight: 600,
                            cursor: "pointer",
                            fontFamily: "'Plus Jakarta Sans'",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 8,
                          },
                          hoverStyle: {
                            transform: "scale(1.02)",
                            filter: "brightness(1.05)",
                          },
                        },
                        React.createElement("span", null, "💬"),
                        " Order via WhatsApp",
                      ),
                      React.createElement(
                        "div",
                        {
                          style: {
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 8,
                          },
                        },
                        React.createElement(
                          "button",
                          {
                            onClick: () => {
                              trackExternalClick(e.name, "Amazon");
                              window.open(
                                "https://www.amazon.in/stores/NEVISAN/page/51CB39DB-29D6-4C38-8CC0-1D10087E5C8E?lp_asin=B0G38DJN2M&ref_=ast_bln",
                                "_blank",
                              );
                            },
                            style: {
                              background: "#FF9900",
                              color: "#fff",
                              border: "none",
                              borderRadius: 9999,
                              padding: "11px",
                              fontSize: 13,
                              fontWeight: 600,
                              cursor: "pointer",
                              fontFamily: "'Plus Jakarta Sans'",
                            },
                          },
                          "Amazon",
                        ),
                        React.createElement(
                          "button",
                          {
                            onClick: () => {
                              trackExternalClick(e.name, "Flipkart");
                              window.open(
                                "https://www.flipkart.com/store/nevisan",
                                "_blank",
                              );
                            },
                            style: {
                              background: "#2874F0",
                              color: "#fff",
                              border: "none",
                              borderRadius: 9999,
                              padding: "11px",
                              fontSize: 13,
                              fontWeight: 600,
                              cursor: "pointer",
                              fontFamily: "'Plus Jakarta Sans'",
                            },
                          },
                          "Flipkart",
                        ),
                      ),
                    ),
                    r.benefits &&
                      React.createElement(
                        "div",
                        { style: { marginBottom: 20 } },
                        React.createElement(
                          "div",
                          {
                            style: {
                              fontFamily: "'Plus Jakarta Sans'",
                              fontSize: 11,
                              letterSpacing: "0.13em",
                              color: T.teal,
                              textTransform: "uppercase",
                              fontWeight: 600,
                              marginBottom: 12,
                            },
                          },
                          "Key Benefits",
                        ),
                        r.benefits.map((e, t) =>
                          React.createElement(
                            "div",
                            {
                              key: t,
                              style: {
                                display: "flex",
                                gap: 12,
                                alignItems: "flex-start",
                                marginBottom: 10,
                              },
                            },
                            React.createElement(
                                "span",
                                {
                                  style: {
                                    lineHeight: 1,
                                    flexShrink: 0,
                                    marginTop: 1,
                                    display: "inline-flex",
                                    color: T.gold,
                                  },
                                },
                                React.createElement(NevIcon, { name: e.icon, size: 18, color: T.gold }),
                              ),
                            React.createElement(
                              "div",
                              null,
                              React.createElement(
                                "div",
                                {
                                  style: {
                                    fontFamily: "'Plus Jakarta Sans'",
                                    fontSize: 13,
                                    fontWeight: 600,
                                    color: T.text,
                                    marginBottom: 2,
                                  },
                                },
                                e.title,
                              ),
                              React.createElement(
                                "div",
                                {
                                  style: {
                                    fontFamily: "'Plus Jakarta Sans'",
                                    fontSize: 12,
                                    color: T.textMuted,
                                    lineHeight: 1.55,
                                  },
                                },
                                e.desc,
                              ),
                            ),
                          ),
                        ),
                      ),
                    r.brew &&
                      React.createElement(
                        "div",
                        {
                          style: {
                            background: "rgba(27,122,130,0.07)",
                            borderRadius: 10,
                            padding: "10px 14px",
                            marginBottom: 20,
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                          },
                        },
                        React.createElement(
                          "span",
                          { style: { fontSize: 16 } },
                          "🍵",
                        ),
                        React.createElement(
                          "div",
                          null,
                          React.createElement(
                            "div",
                            {
                              style: {
                                fontFamily: "'Plus Jakarta Sans'",
                                fontSize: 10,
                                letterSpacing: "0.12em",
                                color: T.teal,
                                textTransform: "uppercase",
                                fontWeight: 600,
                                marginBottom: 2,
                              },
                            },
                            "Brewing Guide",
                          ),
                          React.createElement(
                            "div",
                            {
                              style: {
                                fontFamily: "'Plus Jakarta Sans'",
                                fontSize: 12,
                                color: T.textMuted,
                              },
                            },
                            r.brew,
                          ),
                        ),
                      ),
                  ),
                ),
          ),
        ),
        document.body,
      ),
  );
}
function InstagramReels() {
  const { isMobile: e } = useViewport();
  return React.createElement(
    "section",
    {
      style: {
        background: "#fff",
        padding: e ? "56px 0" : "80px 0",
        overflow: "hidden",
      },
    },
    React.createElement(
      "div",
      {
        style: {
          maxWidth: 1200,
          margin: "0 auto",
          padding: e ? "0 20px" : "0 40px",
        },
      },
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 36,
            flexWrap: "wrap",
            gap: 16,
          },
        },
        React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            {
              style: {
                fontFamily: "'Plus Jakarta Sans'",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.18em",
                color: T.teal,
                textTransform: "uppercase",
                marginBottom: 8,
              },
            },
            "From Our Garden",
          ),
          React.createElement(
            "h2",
            {
              style: {
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 400,
                fontSize: e ? 26 : 34,
                color: T.text,
                lineHeight: 1.2,
              },
            },
            "Watch us on Instagram",
          ),
        ),
        React.createElement(
          "a",
          {
            href: "https://www.instagram.com/nevisan.tea",
            target: "_blank",
            rel: "noopener noreferrer",
            style: {
              display: "flex",
              alignItems: "center",
              gap: 8,
              textDecoration: "none",
              background:
                "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
              color: "#fff",
              borderRadius: 9999,
              padding: "10px 20px",
              fontFamily: "'Plus Jakarta Sans'",
              fontSize: 13,
              fontWeight: 600,
            },
          },
          React.createElement(
            "svg",
            {
              width: "16",
              height: "16",
              viewBox: "0 0 24 24",
              fill: "currentColor",
            },
            React.createElement("path", {
              d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
            }),
          ),
          "@nevisan.tea",
        ),
      ),
      React.createElement(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: e ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
            gap: e ? 12 : 20,
          },
        },
        [
          {
            url: "https://www.instagram.com/reel/DYELcq4xsH7/",
            bg: "reel1.jpg.jpg",
          },
          {
            url: "https://www.instagram.com/reel/DXvomNwRm32/",
            bg: "reel2.jpg.jpg",
          },
          {
            url: "https://www.instagram.com/reel/DYRB_piR_vB/",
            bg: "reel3.jpg.jpg",
          },
          {
            url: "https://www.instagram.com/reel/DYGw0YQxn40/",
            bg: "reel4.jpg.jpg",
          },
        ].map((e, t) =>
          React.createElement(
            "a",
            {
              key: t,
              href: e.url,
              target: "_blank",
              rel: "noopener noreferrer",
              style: {
                textDecoration: "none",
                display: "block",
                borderRadius: 14,
                overflow: "hidden",
                position: "relative",
                aspectRatio: "9/16",
                boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                transition: "transform 250ms, box-shadow 250ms",
              },
              onMouseEnter: (e) => {
                ((e.currentTarget.style.transform = "translateY(-4px)"),
                  (e.currentTarget.style.boxShadow =
                    "0 12px 36px rgba(0,0,0,0.2)"));
              },
              onMouseLeave: (e) => {
                ((e.currentTarget.style.transform = "none"),
                  (e.currentTarget.style.boxShadow =
                    "0 4px 20px rgba(0,0,0,0.12)"));
              },
            },
            React.createElement("div", {
              style: {
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${e.bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              },
            }),
            React.createElement("div", {
              style: {
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.2) 100%)",
              },
            }),
            React.createElement(
              "div",
              {
                style: {
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                },
              },
              React.createElement(
                "div",
                {
                  style: {
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.22)",
                    backdropFilter: "blur(6px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1.5px solid rgba(255,255,255,0.5)",
                  },
                },
                React.createElement(
                  "svg",
                  {
                    width: "16",
                    height: "16",
                    viewBox: "0 0 24 24",
                    fill: "#fff",
                    style: { marginLeft: 2 },
                  },
                  React.createElement("path", { d: "M8 5v14l11-7z" }),
                ),
              ),
            ),
            React.createElement(
              "div",
              { style: { position: "absolute", top: 10, right: 10 } },
              React.createElement(
                "svg",
                {
                  width: "18",
                  height: "18",
                  viewBox: "0 0 24 24",
                  fill: "white",
                  opacity: "0.85",
                },
                React.createElement("path", {
                  d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
                }),
              ),
            ),
            React.createElement(
              "div",
              {
                style: {
                  position: "absolute",
                  bottom: 10,
                  left: 12,
                  right: 12,
                },
              },
              React.createElement(
                "div",
                {
                  style: {
                    fontFamily: "'Plus Jakarta Sans'",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    color: "rgba(255,255,255,0.7)",
                    textTransform: "uppercase",
                  },
                },
                "Reel",
              ),
              React.createElement(
                "div",
                {
                  style: {
                    fontFamily: "'Plus Jakarta Sans'",
                    fontSize: 11,
                    color: "#fff",
                    opacity: 0.9,
                  },
                },
                "@nevisan.tea",
              ),
            ),
          ),
        ),
      ),
    ),
  );
}
const ritualTeas = {
  oolong: {
    color: 'rgba(212, 101, 26, 0.8)',
    temp: 90,
    time: 3,
    steps: [
      { p: 0.15, text: "Pouring 90°C spring water... waking the GABA Oolong leaf." },
      { p: 0.40, text: "Top floral aromas dispersing... volatile essential oils rising." },
      { p: 0.70, text: "Malty amino-acids infusing, amino GABA compounds dissolving." },
      { p: 0.95, text: "Infusion complete. A rich honeyed amber oolong, ready to pour." }
    ]
  },
  green: {
    color: 'rgba(151, 191, 112, 0.65)',
    temp: 80,
    time: 2,
    steps: [
      { p: 0.15, text: "Pouring cool 80°C water to protect delicate green leaf layers." },
      { p: 0.40, text: "L-theanine dissolving... releasing sweet grassy elements." },
      { p: 0.70, text: "Chlorophyll and minerals balancing, zero bitterness extraction." },
      { p: 0.95, text: "Infusion complete. Bright, crisp vegetal green cup ready." }
    ]
  },
  black: {
    color: 'rgba(139, 34, 10, 0.85)',
    temp: 95,
    time: 4,
    steps: [
      { p: 0.15, text: "Pouring near-boiling 95°C water to break down rich Orthodox leaf cells." },
      { p: 0.40, text: "Deep maltiness extracting... heavy wood and cocoa notes rising." },
      { p: 0.70, text: "Tannins and bold body combining... rich rubescent color sets in." },
      { p: 0.95, text: "Infusion complete. Bold, full-bodied orthodox black tea." }
    ]
  },
  herbal: {
    color: 'rgba(235, 182, 60, 0.75)',
    temp: 100,
    time: 5,
    steps: [
      { p: 0.15, text: "Pouring boiling 100°C water... activating chamomile blossom oils." },
      { p: 0.40, text: "Honeyed apple fragrance expanding... soothing visual dispersion." },
      { p: 0.70, text: "Warm chamomile extracts and organic base blending fully." },
      { p: 0.95, text: "Infusion complete. A sunny, completely caffeine-free sleep ritual." }
    ]
  }
};
function HowToBrewSection() {
  const { isMobile: e } = useViewport();
  const [selectedTeaKey, setSelectedTeaKey] = useState('oolong');
  const [temp, setTemp] = useState(90);
  const [time, setTime] = useState(3);
  const [isBrewing, setIsBrewing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [swirlSpeed, setSwirlSpeed] = useState(1);
  const [bubbles, setBubbles] = useState([]);
  const [statusText, setStatusText] = useState("Ready to steep at 90°C for 3 Min");
  const steamCanvasRef = useRef(null);
  const config = ritualTeas[selectedTeaKey];
  useEffect(() => {
    if (!isBrewing) return;

    let animFrame;
    const start = Date.now();
    const duration = time * 4000;

    const spawnBubble = () => {
      const id = Math.random();
      const newBubble = {
        id,
        left: Math.random() * 130 + 10,
        size: Math.random() * 3 + 1.5,
        duration: Math.random() * 1.5 + 0.8
      };
      setBubbles(prev => [...prev, newBubble]);
      setTimeout(() => {
        setBubbles(prev => prev.filter(b => b.id !== id));
      }, (newBubble.duration + 0.5) * 1000);
    };
    const tick = () => {
      const elapsed = Date.now() - start;
      const currentProgress = Math.min(elapsed / duration, 1);

      setProgress(currentProgress);
      setSwirlSpeed(Math.max(0.08, 1 - currentProgress * 1.1));

      if (Math.random() > 0.92) {
        spawnBubble();
      }
      const matchedStep = config.steps.find((s, idx) => {
        const next = config.steps[idx + 1];
        return currentProgress >= s.p && (!next || currentProgress < next.p);
      });
      if (matchedStep) {
        setStatusText(matchedStep.text);
      }
      if (elapsed < duration) {
        animFrame = requestAnimationFrame(tick);
      } else {
        setIsBrewing(false);
        setStatusText("Infusion complete. Savor the untamed cup.");
      }
    };

    animFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrame);
  }, [isBrewing, selectedTeaKey, time]);
  useEffect(() => {
    const canvas = steamCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animFrame;
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);

    let particles = [];

    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      if (!isBrewing) return;

      const threshold = 1 - (temp - 70) / 60;
      if (Math.random() > Math.min(0.85, 0.4 + threshold)) {
        particles.push({
          x: w / 2 + (Math.random() - 0.5) * 110,
          y: h - 10,
          vx: (Math.random() - 0.5) * 0.35,
          vy: -(Math.random() * 0.65 + 0.35 + (temp - 70) * 0.01),
          r: Math.random() * 6 + 3,
          alpha: Math.random() * 0.16 + 0.08
        });
      }

      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.r += 0.07;
        p.alpha -= 0.003;

        if (p.alpha <= 0 || p.y < 0) {
          particles.splice(idx, 1);
          return;
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      animFrame = requestAnimationFrame(loop);
    };

    if (isBrewing) {
      loop();
    } else {
      ctx.clearRect(0, 0, w, h);
    }

    return () => cancelAnimationFrame(animFrame);
  }, [isBrewing, temp]);
  const selectRitualTea = (key) => {
    if (isBrewing) return;
    setSelectedTeaKey(key);
    const tc = ritualTeas[key];
    setTemp(tc.temp);
    setTime(tc.time);
    setProgress(0);
    setStatusText(`Ready to steep at ${tc.temp}°C for ${tc.time} Min`);
  };
  const startSteeping = () => {
    if (isBrewing) return;
    setProgress(0);
    setSwirlSpeed(1);
    setBubbles([]);
    setIsBrewing(true);
    setStatusText("Pouring water... waking the leaf.");
  };
  const liquidHeight = isBrewing ? 85 : (progress >= 1 ? 85 : 0);

  let liquidColor = 'transparent';
  if (isBrewing || progress >= 1) {
    if (progress <= 0.25) {
      liquidColor = 'rgba(255, 255, 255, 0.15)';
    } else {
      liquidColor = config.color;
    }
  }
  const leafElements = Array.from({ length: 8 }).map((_, idx) => {
    const timeFactor = Date.now() / (300 * swirlSpeed);
    const angle = timeFactor + idx * (Math.PI / 4);
    const leafScale = 0.2 + progress * 0.95;

    let left = 20 + idx * 16;
    let bottom = 10;
    let rot = 0;
    let trans = "all 1.5s ease-out";

    if (isBrewing) {
      if (swirlSpeed > 0.15) {
        left = Math.sin(angle) * 45 + 70;
        bottom = Math.cos(angle * 1.5) * 45 + 75;
        rot = angle * 60;
        trans = "none";
      } else {
        bottom = 10 + Math.sin(Date.now() / 1000 + idx) * 3;
        left = (15 + idx * 18) + Math.cos(Date.now() / 1500 + idx) * 2;
        rot = idx * 45 - 60 + Math.sin(Date.now() / 2000 + idx) * 5;
      }
    } else {
      bottom = 12;
      left = 15 + idx * 18;
      rot = idx * 40 - 80;
    }

    return React.createElement("div", {
      key: idx,
      className: "liquid-leaf",
      style: {
        left,
        bottom,
        transform: `rotate(${rot}deg) scale(${isBrewing ? leafScale : (progress >= 1 ? 1.15 : 0.2)})`,
        opacity: isBrewing ? 0.85 : (progress >= 1 ? 0.55 : 0),
        transition: trans
      }
    });
  });
  return React.createElement(
    "section",
    {
      id: "brew-ritual",
      style: {
        background: T.tealDark,
        padding: e ? "64px 20px" : "100px 32px",
        color: T.white,
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "inset 0 20px 40px rgba(0,0,0,0.15)"
      }
    },
    React.createElement(
      "div",
      { style: { maxWidth: 1100, margin: "0 auto" } },
      React.createElement(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: e ? "1fr" : "0.95fr 1.05fr",
            gap: e ? "48px" : "80px",
            alignItems: "center"
          }
        },
        React.createElement(
          "div",
          { style: { display: "flex", flexDirection: "column", gap: 36 } },
          React.createElement(
            "div",
            null,
            React.createElement(
              "div",
              { style: { display: "flex", alignItems: "center", gap: 16, marginBottom: 14 } },
              React.createElement("div", { style: { height: 1, width: 48, background: T.gold } }),
              React.createElement(
                "span",
                {
                  style: {
                    fontFamily: "'Plus Jakarta Sans'",
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    color: T.gold,
                    textTransform: "uppercase"
                  }
                },
                "Interactive Steeping"
              ),
              React.createElement("div", { style: { height: 1, width: 48, background: T.gold } })
            ),
            React.createElement(
              "h2",
              {
                style: {
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 400,
                  fontSize: "clamp(26px, 3.5vw, 44px)",
                  color: T.white,
                  marginBottom: 14
                }
              },
              "The Brewing Ritual"
            ),
            React.createElement(
              "p",
              {
                style: {
                  fontFamily: "'Plus Jakarta Sans'",
                  fontSize: 15,
                  color: T.tealLight,
                  lineHeight: 1.7
                }
              },
              "Experience the sensory transition of whole leaves unfolding in our custom brewing glass. Adjust parameters to unlock their volatile oils."
            )
          ),
          React.createElement(
            "div",
            {
              style: {
                display: "grid",
                gridTemplateColumns: e ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
                gap: 12
              }
            },
            ['oolong', 'green', 'black', 'herbal'].map((key) =>
              React.createElement(
                "button",
                {
                  key: key,
                  onClick: () => selectRitualTea(key),
                  disabled: isBrewing,
                  style: {
                    background: selectedTeaKey === key ? T.gold : "transparent",
                    border: `1px solid ${selectedTeaKey === key ? T.gold : "rgba(255,255,255,0.15)"}`,
                    color: selectedTeaKey === key ? T.tealDark : T.tealLight,
                    padding: "12px",
                    borderRadius: 8,
                    cursor: isBrewing ? "not-allowed" : "pointer",
                    fontSize: 13,
                    fontWeight: 600,
                    textTransform: "capitalize",
                    transition: "background-color 200ms ease, color 200ms ease, border-color 200ms ease",
                    fontFamily: "'Plus Jakarta Sans'"
                  }
                },
                key
              )
            )
          ),
          React.createElement(
            "div",
            { style: { display: "flex", flexDirection: "column", gap: 10 } },
            React.createElement(
              "div",
              { style: { display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 600 } },
              React.createElement("span", null, "Water Temperature"),
              React.createElement("span", { style: { color: T.gold } }, temp + "°C")
            ),
            React.createElement("input", {
              type: "range",
              min: 70,
              max: 100,
              value: temp,
              disabled: isBrewing,
              onChange: (x) => {
                setTemp(Number(x.target.value));
                setStatusText(`Ready to steep at ${x.target.value}°C for ${time} Min`);
              },
              style: {
                width: "100%",
                height: 4,
                background: "rgba(255,255,255,0.15)",
                borderRadius: 2,
                outline: "none",
                cursor: isBrewing ? "not-allowed" : "pointer"
              }
            })
          ),
          React.createElement(
            "div",
            { style: { display: "flex", flexDirection: "column", gap: 10 } },
            React.createElement(
              "div",
              { style: { display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 600 } },
              React.createElement("span", null, "Steeping Time"),
              React.createElement("span", { style: { color: T.gold } }, time + " Min")
            ),
            React.createElement("input", {
              type: "range",
              min: 1,
              max: 6,
              value: time,
              disabled: isBrewing,
              onChange: (x) => {
                setTime(Number(x.target.value));
                setStatusText(`Ready to steep at ${temp}°C for ${x.target.value} Min`);
              },
              style: {
                width: "100%",
                height: 4,
                background: "rgba(255,255,255,0.15)",
                borderRadius: 2,
                outline: "none",
                cursor: isBrewing ? "not-allowed" : "pointer"
              }
            })
          ),
          React.createElement(
            "div",
            null,
            React.createElement(
              "button",
              {
                onClick: startSteeping,
                disabled: isBrewing,
                style: {
                  background: isBrewing ? "rgba(255,255,255,0.1)" : T.gold,
                  color: isBrewing ? "rgba(255,255,255,0.3)" : T.tealDark,
                  border: "none",
                  padding: "16px 36px",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: isBrewing ? "not-allowed" : "pointer",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  transition: "background-color 200ms ease, color 200ms ease, transform 160ms var(--ease-out)",
                  fontFamily: "'Plus Jakarta Sans'"
                }
              },
              isBrewing ? "Steeping..." : "Start Infusion"
            )
          )
        ),
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0, 0, 0, 0.25)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              borderRadius: 16,
              padding: "48px 32px",
              boxShadow: "inset 0 4px 30px rgba(0,0,0,0.4)"
            }
          },
          React.createElement(
            "div",
            { style: { position: "relative", width: 170, height: 210 } },
            React.createElement("div", { className: "glass-mug-outline" }),
            React.createElement("div", { className: "glass-mug-inner-wall" }),
            React.createElement("div", { className: "glass-mug-handle" }),
            React.createElement("canvas", { ref: steamCanvasRef, id: "steam-canvas" }),
            React.createElement(
              "div",
              {
                id: "liquid-fill",
                className: "tea-liquid-fill",
                style: {
                  height: liquidHeight + '%',
                  backgroundColor: liquidColor
                }
              },
              leafElements,
              bubbles.map(b =>
                React.createElement("div", {
                  key: b.id,
                  className: "liquid-bubble",
                  style: {
                    left: b.left,
                    width: b.size,
                    height: b.size,
                    animation: `bubble-up ${b.duration}s ease-out forwards`
                  }
                })
              )
            )
          ),
          React.createElement(
            "div",
            {
              style: {
                textAlign: "center",
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "1.2rem",
                color: T.gold,
                marginTop: 32,
                minHeight: "3.5rem",
                maxWidth: 350,
                lineHeight: 1.4
              }
            },
            statusText
          )
        )
      )
    )
  );
}
function FAQSection() {
  const { isMobile: e } = useViewport(),
    [t, a] = useState(null);
  return React.createElement(
    "section",
    { style: { background: T.cream, padding: e ? "60px 20px" : "100px 32px" } },
    React.createElement(
      "div",
      { style: { maxWidth: 760, margin: "0 auto" } },
      React.createElement(
        "div",
        { style: { textAlign: "center", marginBottom: e ? 36 : 56 } },
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              marginBottom: 14,
            },
          },
          React.createElement("div", {
            style: { height: 1, width: 48, background: T.gold },
          }),
          React.createElement(
            "span",
            {
              style: {
                fontFamily: "'Plus Jakarta Sans'",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.14em",
                color: T.teal,
                textTransform: "uppercase",
              },
            },
            "Questions?",
          ),
          React.createElement("div", {
            style: { height: 1, width: 48, background: T.gold },
          }),
        ),
        React.createElement(
          "h2",
          {
            style: {
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 400,
              fontSize: "clamp(24px, 3.5vw, 42px)",
              color: T.text,
            },
          },
          "Things people usually ask",
        ),
      ),
      React.createElement(
        "div",
        { style: { display: "flex", flexDirection: "column", gap: 12 } },
        [
          {
            q: "Do you deliver across India?",
            a: "Yes — we deliver everywhere in India via Amazon and Flipkart. You can also order directly on WhatsApp if you want a more personal experience.",
          },
          {
            q: "How long does delivery take?",
            a: "Amazon and Flipkart orders take 3–5 business days. WhatsApp orders go out within 24 hours of confirmation.",
          },
          {
            q: "What is the shelf life of the tea?",
            a: "24 months from manufacture, stored cool and dry, out of direct sunlight. The seal keeps the leaf fresh — once opened, use within a few months for best flavour.",
          },
          {
            q: "Is your tea organic and chemical-free?",
            a: "Yes. Every batch carries PGS-India Organic Certification — a government-recognised verification, not a self-declared claim. Zero pesticides from field to pack.",
          },
          {
            q: "Can the tea be steeped more than once?",
            a: "Yes. Whole-leaf tea holds its oils through the first steep, so the second cup is genuinely worth having — not just coloured water.",
          },
          {
            q: "Do you offer bulk or wholesale orders?",
            a: "Yes. For cafes, hotels, offices, or gifting, WhatsApp us at +91 98642 45687. We'll sort out pricing and quantities directly.",
          },
          {
            q: "What is your return policy?",
            a: "Tea is consumable, so we can't accept returns on opened packs. But if your order arrives damaged, near expiry, or incorrect, WhatsApp us within 48 hours and we'll replace it — no questions, no forms.",
          },
        ].map((n, o) =>
          React.createElement(
            "div",
            {
              key: o,
              style: {
                background: "#fff",
                borderRadius: 14,
                overflow: "hidden",
                boxShadow:
                  t === o
                    ? "0 4px 24px rgba(0,0,0,0.08)"
                    : "0 1px 4px rgba(0,0,0,0.05)",
                transition: "box-shadow 0.2s ease",
              },
            },
            React.createElement(
              "button",
              {
                onClick: () => a(t === o ? null : o),
                style: {
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: e ? "16px 18px" : "20px 28px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  gap: 16,
                },
              },
              React.createElement(
                "span",
                {
                  style: {
                    fontFamily: "'Plus Jakarta Sans'",
                    fontSize: e ? 14 : 15,
                    fontWeight: 600,
                    color: T.text,
                    lineHeight: 1.4,
                  },
                },
                n.q,
              ),
              React.createElement(
                "span",
                {
                  style: {
                    fontSize: 18,
                    color: T.teal,
                    flexShrink: 0,
                    transition: "transform 0.25s ease",
                    transform: t === o ? "rotate(45deg)" : "rotate(0deg)",
                    display: "inline-block",
                  },
                },
                "+",
              ),
            ),
            t === o &&
              React.createElement(
                "div",
                { style: { padding: e ? "0 18px 18px" : "0 28px 24px" } },
                React.createElement("div", {
                  style: {
                    height: 1,
                    background: "#f0ede8",
                    marginBottom: e ? 14 : 18,
                  },
                }),
                React.createElement(
                  "p",
                  {
                    style: {
                      fontFamily: "'Plus Jakarta Sans'",
                      fontSize: e ? 13 : 14,
                      color: T.textMuted,
                      lineHeight: 1.7,
                      margin: 0,
                    },
                  },
                  n.a,
                ),
              ),
          ),
        ),
      ),
      React.createElement(
        "div",
        { style: { textAlign: "center", marginTop: 40 } },
        React.createElement(
          "p",
          {
            style: {
              fontFamily: "'Plus Jakarta Sans'",
              fontSize: 14,
              color: T.textMuted,
              marginBottom: 16,
            },
          },
          "Something else?",
        ),
        React.createElement(
          "a",
          {
            href: "https://wa.me/919864245687?text=Hi%20Nevisan!%20I%20have%20a%20question.",
            target: "_blank",
            rel: "noopener noreferrer",
            style: {
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#25D366",
              color: "#fff",
              borderRadius: 9999,
              padding: "12px 28px",
              fontFamily: "'Plus Jakarta Sans'",
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
            },
          },
          React.createElement(
            "svg",
            { width: "16", height: "16", viewBox: "0 0 24 24", fill: "#fff" },
            React.createElement("path", {
              d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z",
            }),
            React.createElement("path", {
              d: "M12 0C5.373 0 0 5.373 0 12c0 2.12.554 4.11 1.523 5.836L.057 23.643a.5.5 0 00.625.601l5.963-1.583A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.805 9.805 0 01-5.045-1.395l-.361-.214-3.741.993.984-3.648-.235-.374A9.808 9.808 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z",
            }),
          ),
          "Ask us on WhatsApp",
        ),
      ),
    ),
  );
}
function TrustBadges() {
  const { isMobile: e } = useViewport(),
    t = [
      {
        icon: React.createElement(
          "svg",
          {
            width: 16,
            height: 16,
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: T.gold,
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },
          React.createElement("path", {
            d: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 21 3c-1 4-1.5 5.5-3.1 11.2A7 7 0 0 1 11 20z",
          }),
          React.createElement("path", { d: "M9 13c1 0 2.5 1.5 2.5 2.5" }),
          React.createElement("path", { d: "M5 21l3-3" }),
        ),
        label: "PGS Organic Certified",
      },
      {
        icon: React.createElement(
          "svg",
          {
            width: 16,
            height: 16,
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: T.gold,
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },
          React.createElement("path", {
            d: "M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z",
          }),
          React.createElement("circle", { cx: 12, cy: 10, r: 3 }),
        ),
        label: "Single Origin, Golaghat",
      },
      {
        icon: React.createElement(
          "svg",
          {
            width: 16,
            height: 16,
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: T.gold,
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },
          React.createElement("path", {
            d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
          }),
          React.createElement("path", { d: "m9 12 2 2 4-4" }),
        ),
        label: "Chemical Free, Always",
      },
      {
        icon: React.createElement(
          "svg",
          {
            width: 16,
            height: 16,
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: T.gold,
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },
          React.createElement("path", {
            d: "M12 22c0-8 6-12 8-16-4 1-7 4-8 8",
          }),
          React.createElement("path", { d: "M12 22c0-6-4-9-6-12 3 1 5 3 6 6" }),
          React.createElement("path", { d: "M12 14v8" }),
        ),
        label: "100% Whole Leaf",
      },
      {
        icon: React.createElement(
          "svg",
          {
            width: 16,
            height: 16,
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: T.gold,
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },
          React.createElement("polygon", {
            points:
              "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",
          }),
        ),
        label: "4.8\u2605 Rated on Amazon",
      },
    ];
  return React.createElement(
    "div",
    {
      style: {
        background: "#faf8f5",
        borderBottom: "1.5px solid #e0d8cc",
        overflowX: "auto",
        WebkitOverflowScrolling: "touch",
      },
    },
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: e ? "flex-start" : "center",
          gap: 0,
          minWidth: "max-content",
          margin: "0 auto",
          padding: e ? "0 16px" : "0",
        },
      },
      t.map((a, n) =>
        React.createElement(
          "div",
          {
            key: n,
            style: {
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: e ? "14px 18px" : "16px 28px",
              borderRight: n < t.length - 1 ? "1.5px solid #e0d8cc" : "none",
              flexShrink: 0,
              transition: "background 0.25s ease",
            },
            onMouseEnter: (e) => {
              e.currentTarget.style.background = "#ffffff";
            },
            onMouseLeave: (e) => {
              e.currentTarget.style.background = "transparent";
            },
          },
          React.createElement(
            "span",
            { style: { display: "flex", alignItems: "center" } },
            a.icon,
          ),
          React.createElement(
            "span",
            {
              style: {
                fontFamily: "'Plus Jakarta Sans'",
                fontSize: e ? 12 : 13,
                fontWeight: 500,
                color: "#2a3a3b",
                whiteSpace: "nowrap",
                letterSpacing: "0.02em",
              },
            },
            a.label,
          ),
        ),
      ),
    ),
  );
}
function StatsSection() {
  const { isMobile: e } = useViewport(),
    [ref, inView] = useInView(0.15);
  const stats = [
    { value: 10, suffix: "", label: "Tea Varieties" },
    { value: 1, suffix: "", label: "Origin Garden" },
    { value: 100, suffix: "%", label: "Pesticide Free" },
    { value: 499, suffix: "₹", label: "MRP Per Pack", prefix: true },
  ];
  return React.createElement(
    "section",
    {
      ref,
      style: {
        background: T.tealDark,
        padding: e ? "80px 20px" : "120px 32px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      },
    },
    /* Gold particle dots */
    ...[...Array(14)].map((_, i) =>
      React.createElement("div", {
        key: i,
        style: {
          position: "absolute",
          width: i % 3 === 0 ? 4 : 2,
          height: i % 3 === 0 ? 4 : 2,
          borderRadius: "50%",
          background: T.gold,
          opacity: 0.25 + (i % 4) * 0.1,
          top: `${10 + (i * 6.2) % 80}%`,
          left: `${5 + (i * 7.3) % 90}%`,
          pointerEvents: "none",
          animation: `float ${2.5 + (i % 3)}s ease-in-out infinite alternate`,
          animationDelay: `${i * 0.3}s`,
        },
      }),
    ),
    React.createElement(
      "div",
      { style: { maxWidth: 900, margin: "0 auto", position: "relative" } },
      /* Label */
      React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 32 } },
        React.createElement("div", { style: { width: 40, height: 1, background: "rgba(201,168,76,0.5)" } }),
        React.createElement("span", { style: { fontFamily: "'Plus Jakarta Sans'", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", color: T.gold, textTransform: "uppercase" } }, "By the Numbers"),
        React.createElement("div", { style: { width: 40, height: 1, background: "rgba(201,168,76,0.5)" } }),
      ),
      /* Heading */
      React.createElement("h2", {
        style: { fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400, fontSize: "clamp(28px, 4.5vw, 58px)", color: T.white, lineHeight: 1.2, marginBottom: 8 },
      }, "Grown with ", React.createElement("em", { style: { color: T.gold, fontStyle: "italic" } }, "purpose.")),
      React.createElement("h2", {
        style: { fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400, fontSize: "clamp(28px, 4.5vw, 58px)", color: T.white, lineHeight: 1.2, marginBottom: 20 },
      }, "Delivered with care."),
      React.createElement("p", {
        style: { fontFamily: "'Plus Jakarta Sans'", fontSize: 15, color: "rgba(255,255,255,0.55)", maxWidth: 480, margin: "0 auto", lineHeight: 1.7, marginBottom: e ? 48 : 64 },
      }, "Every variety traces back to one place — one climate, one soil, one address in Golaghat that we can actually point to on a map."),
      /* Stats */
      React.createElement(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: e ? "repeat(2,1fr)" : "repeat(4,1fr)",
            gap: e ? 24 : 40,
          },
        },
        stats.map(({ value, suffix, label, prefix }, idx) =>
          React.createElement(
            "div",
            {
              key: label,
              style: {
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.6s ease ${idx * 120}ms, transform 0.6s ease ${idx * 120}ms`,
              },
            },
            React.createElement(
              "div",
              { style: { fontFamily: "'Playfair Display', Georgia, serif", fontSize: e ? 40 : 52, fontWeight: 400, color: T.gold, lineHeight: 1 } },
              prefix ? "₹" + value : value + suffix,
            ),
            React.createElement(
              "div",
              { style: { fontFamily: "'Plus Jakarta Sans'", fontSize: 12, fontWeight: 500, letterSpacing: "0.1em", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", marginTop: 8 } },
              label,
            ),
          ),
        ),
      ),
    ),
  );
}
function HomePage({ setPage: e }) {
  return React.createElement(
    "div",
    { style: { animation: "page-enter 0.4s ease both" } },
    React.createElement(Hero, { setPage: e }),
    React.createElement(Ticker, null),
    React.createElement(TrustBadges, null),
    React.createElement(CollectionSection, { setPage: e }),
    React.createElement(StatsSection, null),
    React.createElement(OriginSection, null),
    React.createElement(BenefitsSection, null),
    React.createElement(HowToBrewSection, null),
    React.createElement(WhereToBuy, null),
    React.createElement(Testimonials, null),
    React.createElement(InstagramReels, null),
    React.createElement(FAQSection, null),
    React.createElement(Footer, { setPage: e }),
  );
}
const PAGE_PHOTOS = {
  ourStory: "1.jpg",
  about: "2.jpg",
  collection: "3.jpg",
  journal: "4.jpg",
  wholesale: "5.jpg",
  certifications: "6.jpg",
  contact: "7.jpg",
};
function PageHero({ photo: e, label: t, title: a, subtitle: n }) {
  const { isMobile: o } = useViewport();
  return React.createElement(
    "div",
    {
      style: {
        position: "relative",
        height: o ? 300 : 420,
        overflow: "hidden",
        marginTop: o ? 108 : 68,
        backgroundColor: T.tealDark,
        backgroundImage: `url(${e})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      },
    },
    React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(to bottom, rgba(5,18,10,0.12) 0%, rgba(5,18,10,0.48) 100%)",
      },
    }),
    React.createElement(
      "div",
      {
        style: {
          position: "relative",
          zIndex: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: o ? "0 24px" : "0 48px",
        },
      },
      React.createElement(
        "div",
        {
          style: {
            fontFamily: "'Plus Jakarta Sans'",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.2em",
            color: T.gold,
            textTransform: "uppercase",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 12,
          },
        },
        React.createElement("div", {
          style: { width: 28, height: 1, background: T.gold },
        }),
        t,
        React.createElement("div", {
          style: { width: 28, height: 1, background: T.gold },
        }),
      ),
      React.createElement(
        "h1",
        {
          style: {
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 400,
            fontSize: "clamp(28px, 5vw, 58px)",
            color: "#fff",
            lineHeight: 1.15,
            marginBottom: n ? 16 : 0,
            animation: "page-enter 0.5s ease both",
          },
        },
        a,
      ),
      n &&
        React.createElement(
          "p",
          {
            style: {
              fontFamily: "'Plus Jakarta Sans'",
              fontSize: o ? 14 : 16,
              color: "rgba(255,255,255,0.72)",
              maxWidth: 500,
              lineHeight: 1.65,
            },
          },
          n,
        ),
    ),
  );
}
function OurStoryPage({ setPage: e }) {
  const { isMobile: o } = useViewport();
  return React.createElement(
    "div",
    { style: { animation: "page-enter 0.45s ease both" } },
    React.createElement(PageHero, {
      photo: PAGE_PHOTOS.ourStory,
      label: "Single Origin · Golaghat, Assam",
      title: "From one garden to your cup",
      subtitle:
        "Assam grows some of the finest tea in the world. Most of it leaves on export trucks. What stays behind usually ends up as dust. We decided that was a problem worth fixing.",
    }),
    React.createElement(OriginSection, null),
    React.createElement(
      "div",
      { style: { background: T.cream, padding: o ? "60px 20px" : "100px 32px" } },
      React.createElement(
        "div",
        { style: { maxWidth: 900, margin: "0 auto" } },
        React.createElement(
          "div",
          { style: { textAlign: "center", marginBottom: o ? 48 : 64 } },
          React.createElement(
            "span",
            {
              style: {
                fontFamily: "'Plus Jakarta Sans'",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.16em",
                color: T.gold,
                textTransform: "uppercase",
                display: "block",
                marginBottom: 12,
              },
            },
            "Our Sourcing & Craft"
          ),
          React.createElement(
            "h2",
            {
              style: {
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 400,
                fontSize: o ? 32 : 44,
                color: T.text,
                lineHeight: 1.25,
              },
            },
            "How the tea gets from Golaghat to your cup"
          )
        ),
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: o ? 48 : 64,
            },
          },
          [
            {
              num: "01",
              title: "The garden in Golaghat",
              desc: "Golaghat sits in the upper Brahmaputra valley — one of the few places on earth where the soil, rainfall, and daily temperature swings combine to produce tea with real complexity. We source from one processing house there, in small batches. That means what arrives at your door was made recently and handled carefully — not blended with four other estates or sitting in a warehouse.",
            },
            {
              num: "02",
              title: "Why tea bags taste the way they do",
              desc: "Open a standard tea bag and you'll find CTC — cut, torn, and curled leaf fragments, sometimes outright dust from the processing floor. It brews fast, it's often bitter, and you get one steep out of it before the flavour is gone. Whole leaf works differently. The oils stay in the leaf until you add hot water. That's why the cup is smoother, more layered, and worth going back to for a second steep.",
            },
            {
              num: "03",
              title: "Each blend starts with a reason",
              desc: "We don't blend for aesthetics. Every variety starts with a question: what does this person actually need? Spearmint for hormonal skin. GABA Oolong for an anxious mind. Chamomile for a restless night. Rum and Whiskey for the people who want a proper evening drink without the hangover. If an ingredient doesn't do something real, it doesn't go in.",
            },
          ].map((item, idx) =>
            React.createElement(
              "div",
              {
                key: idx,
                style: {
                  display: "grid",
                  gridTemplateColumns: o ? "1fr" : "80px 1fr",
                  gap: o ? 16 : 32,
                  alignItems: "start",
                  paddingBottom: o ? 24 : 32,
                  borderBottom: idx < 2 ? `1px solid ${T.border}` : "none",
                },
              },
              React.createElement(
                "span",
                {
                  style: {
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: 32,
                    color: T.gold,
                    fontWeight: 300,
                  },
                },
                item.num
              ),
              React.createElement(
                "div",
                null,
                React.createElement(
                  "h3",
                  {
                    style: {
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: 22,
                      color: T.text,
                      marginBottom: 12,
                      fontWeight: 400,
                    },
                  },
                  item.title
                ),
                React.createElement(
                  "p",
                  {
                    style: {
                      fontFamily: "'Plus Jakarta Sans'",
                      fontSize: 15,
                      color: T.textMuted,
                      lineHeight: 1.75,
                    },
                  },
                  item.desc
                )
              )
            )
          )
        )
      )
    ),
    React.createElement(Footer, { setPage: e }),
  );
}
const POSTS = [
  {
    title: "Why Your Tea Bag Is Lying to You",
    slug: "why-whole-leaf-tea-tastes-different",
    date: "August 2025",
    author: "Master Blender Uditi",
    readTime: "4 min read",
    tag: "CRAFT",
    relatedTeas: ["Organic Green Tea", "Lemongrass Green Tea"],
    excerpt:
      "Tear open a standard tea bag and you'll find dust, not tea. Here's what whole leaf actually means — and why it changes everything in your cup.",
    body: [
      "Go ahead, tear open a supermarket tea bag. That brown powder inside? That's CTC — Cut, Tear, Curl. It's an industrial method that shreds whole leaves into uniform granules sized for speed and colour, not flavour. You get a fast, dark brew. You do not get tea.",
      "A whole leaf is exactly what it sounds like: the leaf stayed intact through every step of processing. That matters because the parts that make tea interesting — the essential oils, the amino acids, the flavour compounds — are still locked inside the leaf structure. When you add hot water, they release slowly, fully, in layers.",
      "This is why you can steep a Nevisan tea two or even three times and get a different cup each time. The first steep is bright and aromatic. The second is softer, more rounded. The third has a subtle sweetness that catches you off guard. Tea drinkers in Japan and Taiwan have known about this for centuries. We're just catching up.",
      "When you buy whole leaf, you're paying for the full story of the plant — from the soil it grew in, to the hands that processed it, to the moment it opens in your cup. That's not a premium. That's just what tea is supposed to be."
    ]
  },
  {
    title: "What Actually Happens in Your Brain When You Drink GABA Tea",
    slug: "science-behind-gaba-tea",
    date: "September 2025",
    author: "Nevisan Botanical Team",
    readTime: "5 min read",
    tag: "WELLNESS",
    relatedTeas: ["GABA Oolong Tea", "Chamomile Green Tea"],
    excerpt:
      "GABA is your nervous system's off switch. Here's the unusual processing technique that coaxes oolong leaves into producing far more of it.",
    body: [
      "Most people feel something when they drink GABA Oolong — a quietness, a settling. It's not placebo. There's a real mechanism behind it, and it starts with a neurotransmitter your brain already makes called GABA, or gamma-aminobutyric acid.",
      "GABA is the primary signal your nervous system uses to slow things down. When your brain fires too fast — the anxious spiral, the 2am loop of thoughts — GABA is what eventually says: stop. Low GABA is linked to anxiety, poor sleep, and that particular kind of mental restlessness that makes it hard to sit still.",
      "Here's the interesting part: most teas contain almost no GABA. But in the 1980s, Japanese researchers discovered that when oolong leaves are sealed in a nitrogen-rich, oxygen-free environment during processing, the leaves undergo a specific chemical shift that multiplies their GABA content by 4 to 10 times. That's the anaerobic processing technique Nevisan uses.",
      "The result is a tea that calms without sedating. Chamomile will send you toward sleep. GABA Oolong lets you be still and present at the same time — good for reading, for a long conversation, for the hour before bed when you want to wind down without switching off entirely. Clinical studies have looked at it for blood pressure and sleep quality too, but honestly the simplest way to understand it is to brew a cup at 9pm and pay attention to what happens next."
    ]
  },
  {
    title: "The Tea Region Nobody Talks About (But Should)",
    slug: "golaghat-indias-hidden-tea-belt",
    date: "October 2025",
    author: "Single-Estate Origin Team",
    readTime: "4 min read",
    tag: "ORIGIN",
    relatedTeas: ["Organic Green Tea", "Tulsi Green Tea"],
    excerpt:
      "Everyone knows Darjeeling. Serious tea people know Golaghat — a small district in upper Assam that quietly produces some of the most complex tea in the world.",
    body: [
      "Ask someone to name an Indian tea region and they'll say Darjeeling. It's the obvious answer, the one on every premium label, backed by 150 years of marketing. But if you ask the people who actually spend their lives tasting tea — the buyers, the blenders, the obsessives — a different name comes up: Golaghat.",
      "Golaghat sits in the upper Brahmaputra valley in Assam, where the soil is a layered combination of red clay, river alluvium, and centuries of organic decomposition. The humidity rarely drops below 75%. The seasonal temperature swings are dramatic. For the tea plant, this is a form of constant gentle stress — and stressed plants respond by producing more of the complex compounds that create flavour. It's the same reason good wine grapes come from difficult terrain.",
      "Every Nevisan tea is sourced from a single estate in Golaghat. We say that a lot, but the implications are worth spelling out. Single-origin means you can trace exactly where the leaf came from — which garden, which season, which processing run. There are no blends quietly averaging out lesser-quality batches. What's in the pack is what grew in that specific place.",
      "Darjeeling is excellent. Golaghat is honest. That difference is why it's where Nevisan begins."
    ]
  },
  {
    title: "The Three Steeps: Getting More from Every Cup",
    slug: "how-to-get-three-steeps",
    date: "November 2025",
    author: "Nevisan Brewing Lab",
    readTime: "3 min read",
    tag: "BREWING",
    relatedTeas: ["Organic Green Tea", "GABA Oolong Tea"],
    excerpt:
      "If you're throwing away the leaves after one steep, you're throwing away the best part of the cup.",
    body: [
      "Most people steep their tea once and dump the leaves. With broken-leaf tea bags, that's fine — there's nothing left to give. With whole-leaf tea, you've barely started.",
      "Think of it this way: the first steep is the introduction. The second is the conversation. The third is when things get interesting.",
      "First steep — use the temperature on the pack (usually 80–90°C) and go for 2 to 3 minutes. This pull is the most aromatic, the brightest, the most characteristic of that particular tea. It's bold and clean.",
      "Second steep — drain the leaves completely, let them rest for about 60 seconds, then add fresh water at the same temperature. Steep for another 2 to 3 minutes. The cup will be softer. The edges round out. A lot of people find this one their favourite.",
      "Third steep — rest again, then extend the steep to 3 or 4 minutes. This is where the sweetness hides. It's subtle, almost surprising. Experienced tea drinkers often save this one for the evening.",
      "One thing not to do: don't squeeze or press the leaves when you're done. That releases bitterness that was never meant to be in the cup. Let the water do everything. The leaf will give you what it has."
    ]
  },
  {
    title: "14 Attempts. One Cup. The Story of Rum Green Tea.",
    slug: "rum-green-tea-how-we-made-it",
    date: "December 2025",
    author: "Master Blender Uditi",
    readTime: "5 min read",
    tag: "CRAFT",
    relatedTeas: ["Rum Green Tea", "Whiskey Green Tea"],
    excerpt:
      "No alcohol, no artificial flavouring. Just a question worth obsessing over: can a tea genuinely feel like a warm evening?",
    body: [
      "The question that started it was simple: can a tea feel like a warm evening without the alcohol? Not a mocktail — you still need a shaker and a setup for those. A tea. Something you brew in a cup, that genuinely evokes the character of aged rum.",
      "The challenge is that rum's complexity comes from barrel ageing. Years of contact with charred wood create hundreds of interacting compounds — vanillins, esters, caramel phenols — that no single botanical can replicate. So we didn't try to use a single botanical. We built a structure: a warm Assam green tea base, specific naturally sweet ingredients for the caramel mid-note, a herb for the warm etheric quality rum has, and a cold-infusion technique that lets everything integrate slowly without the bitterness that heat extraction produces.",
      "Attempts one through eight were too sweet. Nine and ten were sharp in the wrong way. Eleven had warmth but no depth. Twelve tasted like a dessert. Thirteen was genuinely close — the profile was almost right — but the finish dropped off.",
      "Attempt fourteen was the one. First sip: warming, slightly sweet. Mid-palate: herbal, with body. Finish: clean, with a mild spice that lingers. We've made no changes to the recipe since. Sometimes getting something right means being willing to try it fourteen times."
    ]
  },
  {
    title: "When to Drink Which Tea: A Practical Guide to Your Day",
    slug: "morning-vs-evening-teas",
    date: "January 2026",
    author: "Nevisan Wellness Team",
    readTime: "4 min read",
    tag: "WELLNESS",
    relatedTeas: ["Lemongrass Green Tea", "Chamomile Green Tea"],
    excerpt:
      "The compounds in each tea interact with your body differently depending on the time of day. Here's how to match what you drink to when you drink it.",
    body: [
      "Tea isn't one-size-fits-all, and not just because of taste. The active compounds in each variety — caffeine levels, specific polyphenols, adaptogens, amino acids — interact with your body differently depending on where you are in your daily rhythm.",
      "In the morning, from roughly 6am to noon, green tea is doing its best work. Organic Green Tea or Lemongrass Green delivers caffeine paired with L-theanine, which smooths out the alertness into something sustained and calm — no cortisol spike, no mid-morning crash. Lemongrass also helps with digestion after overnight fasting. If hormonal breakouts are something you're dealing with, Spearmint mid-morning is worth building into the routine.",
      "Afternoons are when Rum and Whiskey Green teas earn their place. The bold character suits the natural energy dip around 2pm, and the green tea base keeps your mind clear. Blue Flower is quieter but visually striking — a good choice for an afternoon pause that doesn't make you drowsy.",
      "Evenings call for either Chamomile or GABA Oolong, and the choice comes down to what you actually want. Chamomile is for winding down properly — it will move you toward sleep. GABA Oolong is for being calm and still present — good for reading, for creative work, for conversations you want to actually be in.",
      "Tulsi sits outside these categories. It's an adaptogen, meaning it responds to your body's state rather than imposing one. Morning, afternoon, evening — it works."
    ]
  },
  {
    title: "Spearmint Tea and Hormonal Skin: What the Research Shows",
    slug: "spearmint-tea-hormonal-balance-pcos",
    date: "February 2026",
    author: "Nevisan Research Team",
    readTime: "5 min read",
    tag: "HORMONAL HEALTH",
    relatedTeas: ["Spearmint Green Tea", "Tulsi Green Tea"],
    excerpt:
      "Two cups of spearmint tea a day reduced free testosterone levels in PCOS patients by a measurable margin. Here's the science behind why it works.",
    body: [
      "Hormonal acne is frustrating in a specific way — topical treatments address what's on the surface, but the cause is internal. Excess free testosterone signals sebaceous glands to overproduce oil. The breakout is just where that process becomes visible.",
      "A clinical trial published in Phytotherapy Research gave women with PCOS two cups of spearmint tea daily for 30 days. At the end, plasma free testosterone levels had fallen significantly. The mechanism is rosmarinic acid and polyphenols in spearmint inhibiting 5-alpha reductase — the enzyme that converts testosterone into DHT, the form that drives androgenic effects.",
      "Nevisan's Spearmint Green Tea combines organic Mentha spicata with whole-leaf Assam green. The spearmint delivers the anti-androgenic effect. The green tea adds EGCG catechins and L-theanine — compounds that support skin health from a different angle, reducing inflammation and cortisol-driven breakouts.",
      "The practical suggestion: two grams in 85°C water for two minutes every morning. Consistency matters more than quantity here. It's not a fast fix — hormonal cycles don't change overnight — but users who stick with it for four to six weeks typically notice a real difference in both skin clarity and cycle regularity."
    ]
  },
  {
    title: "Drinking Without Drinking: How We Recreated an Evening Spirit in a Cup of Tea",
    slug: "non-alcoholic-botanical-whiskey-rum-tea",
    date: "March 2026",
    author: "Master Blender Uditi",
    readTime: "6 min read",
    tag: "NON-ALCOHOLIC",
    relatedTeas: ["Whiskey Green Tea", "Rum Green Tea"],
    excerpt:
      "Toasted oak, peat aromatics, cold-extracted botanicals — here's how Nevisan built the texture and finish of aged spirits into a tea with zero alcohol.",
    body: [
      "The market for non-alcoholic drinks has changed in the last few years. People aren't giving up alcohol because they have to — they're choosing not to drink, and they want something worth drinking in its place. Fruit juice doesn't cut it at 9pm. Neither does sparkling water.",
      "The problem with recreating spirits in a non-alcoholic format is depth. Aged whiskey and rum get their character from years inside charred barrels. The wood breaks down slowly, donating vanillin, tannins, and specific smoky phenols that create the dry, complex finish you recognise. No amount of grape juice gets there.",
      "We approached it differently. Toasted oak wood and peat-smoke aromatics were cold-extracted into our whole-leaf Assam green tea base. Cold extraction preserves the aromatic compounds without releasing the bitter tannins that heat would pull out. Sugarcane botanicals added the caramel mid-note that rum carries. Whiskey got a different botanical profile — drier, with more wood-forward character.",
      "The result is 0.0% ABV, no sugar, no artificial additives. Brew it hot and drink it from a heavy glass. Or brew it strong, let it cool, and pour it over a large ice sphere with a twist of lemon. It's the most honest evening ritual we know of — all the texture and ritual of a dram, none of the morning aftermath."
    ]
  },
  {
    title: "The Blue Cup: What Butterfly Pea Flower Actually Does",
    slug: "butterfly-pea-flower-blue-tea-benefits",
    date: "April 2026",
    author: "Nevisan Botanical Team",
    readTime: "4 min read",
    tag: "WELLNESS",
    relatedTeas: ["Blue Flower Green Tea", "Chamomile Green Tea"],
    excerpt:
      "That vivid blue colour is real — no dye, no trickery. And behind the colour is a compound with genuine antioxidant and cognitive benefits.",
    body: [
      "The first time most people see Blue Flower tea, they assume there's a trick. No food colouring produces that particular shade of deep indigo naturally. But Clitoria ternatea — butterfly pea flower — does, through a class of pigments called anthocyanins that also happen to be among the most studied antioxidants in plant science.",
      "What makes the colour even more interesting is that it's pH-sensitive. Add a few drops of lemon juice and the blue shifts to purple, then to a warm pink depending on how acidic you go. It's genuinely one of the most visually alive drinks you can make at home, entirely through natural chemistry.",
      "Beyond the colour, the research is promising. Anthocyanins from butterfly pea have been studied for memory and cognitive function — there's early evidence they support acetylcholine signalling, which is the neurotransmitter involved in learning and recall. Some traditional Ayurvedic preparations used the plant specifically for mental clarity.",
      "Nevisan's Blue Flower Green Tea pairs the butterfly pea with whole-leaf Assam green, which adds L-theanine and EGCG to the antioxidant profile. The result tastes delicate — mildly floral, with the clean, grassy character of the green base underneath. Brew it without lemon first so you see the blue before it shifts. Then add a squeeze. That colour change alone is worth the cup."
    ]
  },
  {
    title: "Tulsi: The Adaptogen That Pays Attention",
    slug: "tulsi-holy-basil-adaptogen-benefits",
    date: "May 2026",
    author: "Nevisan Wellness Team",
    readTime: "5 min read",
    tag: "WELLNESS",
    relatedTeas: ["Tulsi Green Tea", "GABA Oolong Tea"],
    excerpt:
      "Tulsi doesn't pick a direction — it reads your body's state and responds to it. That's what makes an adaptogen different from every other functional ingredient.",
    body: [
      "Most functional teas work in one direction. Chamomile calms. Green tea energises. GABA Oolong quiets mental noise. Tulsi does something harder to categorise: it responds to what your body actually needs rather than pushing in a fixed direction.",
      "This is what the word adaptogen means in a technical sense. An adaptogenic herb modulates the stress-response system — primarily the HPA axis, which controls cortisol production — in a way that pulls towards balance rather than towards a specific state. High cortisol, tulsi helps bring it down. Low energy and mental fog, tulsi helps restore clarity. The same plant, different effects, depending on where your body starts.",
      "Tulsi — holy basil, Ocimum tenuiflorum — has been used in Ayurvedic medicine for thousands of years, but Western clinical research has started catching up. Studies have looked at it for reducing anxiety scores, improving memory and cognitive function, and supporting thyroid regulation. The active compounds include eugenol, rosmarinic acid, and ursolic acid, which work through multiple pathways rather than a single mechanism.",
      "In practice, this means Tulsi Green Tea is the most versatile cup in the Nevisan range. Morning, afternoon, evening — it works at all three. If you're in a season of high stress and your body is doing a lot, this is probably the tea to reach for most consistently."
    ]
  },
  {
    title: "Cold Brew: The Summer Method Nobody Tells You About",
    slug: "cold-brew-green-tea-guide",
    date: "June 2026",
    author: "Nevisan Brewing Lab",
    readTime: "4 min read",
    tag: "BREWING",
    relatedTeas: ["Organic Green Tea", "Blue Flower Green Tea"],
    excerpt:
      "Cold brewing whole-leaf tea overnight extracts all the flavour with almost none of the bitterness. It's also the laziest good cup of tea you'll ever make.",
    body: [
      "Here's the problem with hot-brewed green tea in summer: temperature control matters a lot, and most people overbrew it. Too hot, too long, and green tea turns bitter fast. Cold brew sidesteps the whole issue.",
      "The method is almost embarrassingly simple. Add 3 grams of whole-leaf tea per 250ml of cold filtered water. Drop it in a glass jar or pitcher. Put it in the fridge. Come back in 6 to 8 hours — or just leave it overnight. Pour it out and drink it.",
      "Cold water extracts differently from hot. It picks up the sweet and aromatic compounds first, while leaving behind a lot of the catechins and tannins that create bitterness and astringency in an overbrewed hot cup. The result is cleaner, lighter, and noticeably sweeter than the same tea brewed hot. First-timers usually don't believe it's the same tea.",
      "A few things worth knowing: cold brew is lower in caffeine than hot brew — roughly 30 to 40% less — so it's a gentler option if you're caffeine-sensitive or brewing an afternoon cup. It also keeps well. Refrigerated in a sealed jar, it stays good for two to three days, which means you can make a batch on Sunday night and have cold cups ready through Wednesday.",
      "Our Blue Flower green tea is particularly good cold-brewed — the anthocyanin colour stays vivid and the flavour becomes almost dessert-like. Organic Green is clean and almost savoury cold. Try both before settling on a favourite."
    ]
  }
];
function ArticleModal({ post: e, onClose: t, onViewTea: a }) {
  return (
    useEffect(() => {
      const e = (e) => {
        "Escape" === e.key && t();
      };
      return (
        window.addEventListener("keydown", e),
        (document.body.style.overflow = "hidden"),
        () => {
          (window.removeEventListener("keydown", e),
            (document.body.style.overflow = ""));
        }
      );
    }, []),
    ReactDOM.createPortal(
      React.createElement(
        "div",
        {
          onClick: t,
          style: {
            position: "fixed",
            inset: 0,
            background: "rgba(15,63,69,0.75)",
            zIndex: 400,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            backdropFilter: "blur(4px)",
            animation: "overlay-fade 0.2s ease both",
          },
        },
        React.createElement(
          "div",
          {
            onClick: (e) => e.stopPropagation(),
            style: {
              background: T.cream,
              borderRadius: 20,
              maxWidth: 680,
              width: "100%",
              maxHeight: "88vh",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 32px 100px rgba(0,0,0,0.35)",
              animation: "page-enter 0.3s ease both",
            },
          },
          React.createElement(
            "div",
            {
              style: {
                padding: "28px 32px 20px",
                borderBottom: `1px solid ${T.border}`,
                flexShrink: 0,
              },
            },
            React.createElement(
              "div",
              {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                },
              },
              React.createElement(
                "span",
                {
                  style: {
                    fontFamily: "'Plus Jakarta Sans'",
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    color: T.gold,
                    background: "rgba(201,168,76,0.12)",
                    padding: "4px 10px",
                    borderRadius: 9999,
                  },
                },
                e.tag,
              ),
              React.createElement(
                "button",
                {
                  onClick: t,
                  style: {
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 20,
                    color: T.textMuted,
                    padding: 4,
                  },
                },
                "✕",
              ),
            ),
            React.createElement(
              "h2",
              {
                style: {
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 400,
                  fontSize: 24,
                  color: T.text,
                  lineHeight: 1.3,
                  marginBottom: 6,
                },
              },
              e.title,
            ),
            React.createElement(
              "span",
              {
                style: {
                  fontFamily: "'Plus Jakarta Sans'",
                  fontSize: 12,
                  color: T.textMuted,
                },
              },
              e.date,
            ),
          ),
          React.createElement(
            "div",
            {
              style: {
                padding: "24px 32px 32px",
                overflowY: "auto",
                flex: 1,
                minHeight: 0,
              },
            },
            e.body.map((e, t) =>
              React.createElement(
                "p",
                {
                  key: t,
                  style: {
                    fontFamily: "'Plus Jakarta Sans'",
                    fontSize: 15,
                    color: T.text,
                    lineHeight: 1.8,
                    marginBottom: 18,
                  },
                },
                e,
              ),
            ),
            e.relatedTeas &&
              React.createElement(
                "div",
                {
                  style: {
                    marginTop: 24,
                    padding: 16,
                    background: "rgba(27,122,130,0.05)",
                    borderRadius: 12,
                    border: `1px dashed ${T.teal}`,
                  },
                },
                React.createElement(
                  "h4",
                  {
                    style: {
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: 13,
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      color: T.teal,
                      textTransform: "uppercase",
                      marginBottom: 10,
                    },
                  },
                  "Related & Recommended",
                ),
                React.createElement(
                  "div",
                  {
                    style: {
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                      fontSize: 13.5,
                    },
                  },
                  [
                    ...e.relatedTeas.map((name) => {
                      return React.createElement(
                        "div",
                        { key: name, style: { display: "flex", alignItems: "center", gap: 8 } },
                        React.createElement(
                          "svg",
                          { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: T.teal, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
                          React.createElement("path", { d: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-9 8.2z" }),
                          React.createElement("path", { d: "M9 22v-4" })
                        ),
                        React.createElement(
                          "a",
                          {
                            href: "#",
                            onClick: (evt) => {
                              evt.preventDefault();
                              const url = new URL(window.location.href);
                              url.searchParams.set("tea", name);
                              window.history.pushState({}, "", url.toString());
                              if (a) a("Collection");
                              t();
                            },
                            style: {
                              color: T.teal,
                              fontWeight: 600,
                              textDecoration: "underline",
                              cursor: "pointer",
                            },
                          },
                          `Shop ${name}`,
                        ),
                      );
                    }),
                    React.createElement(
                      "div",
                      { style: { display: "flex", alignItems: "center", gap: 8 } },
                      React.createElement(
                        "svg",
                        { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: T.teal, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
                        React.createElement("path", { d: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" }),
                        React.createElement("path", { d: "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" })
                      ),
                      React.createElement(
                        "a",
                        {
                          href: window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, "") + "/faq/",
                          target: "_blank",
                          style: {
                            color: T.teal,
                            fontWeight: 600,
                            textDecoration: "underline",
                          },
                        },
                        "Read our Brewing & FAQ Guide",
                      ),
                    ),
                  ],
                ),
              ),
            React.createElement(
              "div",
              {
                style: {
                  marginTop: 28,
                  paddingTop: 20,
                  borderTop: `1px solid ${T.border}`,
                  display: "flex",
                  gap: 12,
                },
              },
              React.createElement(
                "button",
                {
                  onClick: () => {
                    (openWhatsApp(), t());
                  },
                  style: {
                    background: "#25D366",
                    color: "#fff",
                    border: "none",
                    borderRadius: 9999,
                    padding: "10px 22px",
                    cursor: "pointer",
                    fontFamily: "'Plus Jakarta Sans'",
                    fontSize: 13,
                    fontWeight: 600,
                  },
                },
                "💬 Order Tea",
              ),
              React.createElement(
                "button",
                {
                  onClick: t,
                  style: {
                    background: "transparent",
                    color: T.teal,
                    border: `1.5px solid ${T.teal}`,
                    borderRadius: 9999,
                    padding: "10px 22px",
                    cursor: "pointer",
                    fontFamily: "'Plus Jakarta Sans'",
                    fontSize: 13,
                  },
                },
                "← Back to Journal",
              ),
            ),
          ),
        ),
      ),
      document.body,
    )
  );
}
function JournalPage({ setPage: e }) {
  const { isMobile: t } = useViewport(),
    [a, n] = useState(null);
  return React.createElement(
    "div",
    {
      style: {
        background: T.cream,
        minHeight: "100vh",
        animation: "page-enter 0.45s ease both",
      },
    },
    React.createElement(PageHero, {
      photo: PAGE_PHOTOS.journal,
      label: "The Nevisan Journal",
      title: "Stories from the garden",
      subtitle: "Craft, origin, wellness and brewing guides — everything tea.",
    }),
    React.createElement(
      "div",
      {
        style: {
          maxWidth: 1100,
          margin: "0 auto",
          padding: t ? "48px 20px 80px" : "64px 40px 100px",
        },
      },
      React.createElement("div", { style: { display: "none" } }),
      React.createElement(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: t ? "1fr" : "repeat(3, 1fr)",
            gap: t ? 20 : 28,
          },
        },
        POSTS.slice()
          .reverse()
          .map((e, t) =>
            React.createElement(
              "div",
              {
                key: t,
                onClick: () => n(e),
                style: {
                  background: T.white,
                  borderRadius: 16,
                  padding: "28px 24px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                  cursor: "pointer",
                  transition: "transform 200ms, box-shadow 200ms",
                },
                onMouseEnter: (e) => {
                  ((e.currentTarget.style.transform = "translateY(-4px)"),
                    (e.currentTarget.style.boxShadow =
                      "0 8px 28px rgba(0,0,0,0.10)"));
                },
                onMouseLeave: (e) => {
                  ((e.currentTarget.style.transform = "none"),
                    (e.currentTarget.style.boxShadow =
                      "0 2px 12px rgba(0,0,0,0.06)"));
                },
              },
              React.createElement(
                "div",
                {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 14,
                  },
                },
                React.createElement(
                  "span",
                  {
                    style: {
                      fontFamily: "'Plus Jakarta Sans'",
                      fontSize: 10,
                      letterSpacing: "0.14em",
                      color: T.gold,
                      background: "rgba(201,168,76,0.12)",
                      padding: "4px 10px",
                      borderRadius: 9999,
                    },
                  },
                  e.tag,
                ),
                React.createElement(
                  "span",
                  {
                    style: {
                      fontFamily: "'Plus Jakarta Sans'",
                      fontSize: 12,
                      color: T.textMuted,
                    },
                  },
                  e.date,
                ),
              ),
              React.createElement(
                "h3",
                {
                  style: {
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 400,
                    fontSize: 18,
                    color: T.text,
                    lineHeight: 1.4,
                    marginBottom: 12,
                  },
                },
                e.title,
              ),
              React.createElement(
                "p",
                {
                  style: {
                    fontFamily: "'Plus Jakarta Sans'",
                    fontSize: 13,
                    color: T.textMuted,
                    lineHeight: 1.7,
                  },
                },
                e.excerpt,
              ),
              React.createElement(
                "div",
                {
                  style: {
                    marginTop: 18,
                    fontFamily: "'Plus Jakarta Sans'",
                    fontSize: 12,
                    color: T.teal,
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                  },
                },
                React.createElement(
                  "a",
                  {
                    href: "/journal/" + e.slug,
                    onClick: (e) => {
                      e.stopPropagation();
                    },
                    style: { color: "inherit", textDecoration: "none" },
                  },
                  "Read more →",
                ),
              ),
            ),
          ),
      ),
    ),
    React.createElement(Footer, { setPage: e }),
    a && React.createElement(ArticleModal, { post: a, onClose: () => n(null), onViewTea: e }),
  );
}
function AboutPage({ setPage: e }) {
  const { isMobile: t } = useViewport();
  return React.createElement(
    "div",
    {
      style: {
        background: T.cream,
        minHeight: "100vh",
        animation: "page-enter 0.45s ease both",
      },
    },
    React.createElement(PageHero, {
      photo: PAGE_PHOTOS.about,
      label: "Our Story",
      title:
        "We grew up in Guwahati, next to some of the world's finest tea gardens. The tea at home was still bad.",
      subtitle: "That gap bothered us for years before we actually did something about it.",
    }),
    React.createElement(
      "div",
      {
        style: {
          maxWidth: 900,
          margin: "0 auto",
          padding: t ? "48px 20px 80px" : "64px 40px 100px",
        },
      },
      React.createElement("div", { style: { display: "none" } }),
      React.createElement(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: t ? "1fr" : "1fr 1fr",
            gap: 48,
            marginBottom: 64,
          },
        },
        React.createElement(
          "div",
          null,
          React.createElement(
            "h2",
            {
              style: {
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 400,
                fontSize: 24,
                color: T.text,
                marginBottom: 16,
              },
            },
            "Why we started",
          ),
          React.createElement(
            "p",
            {
              style: {
                fontFamily: "'Plus Jakarta Sans'",
                fontSize: 15,
                color: T.textMuted,
                lineHeight: 1.8,
                marginBottom: 16,
              },
            },
            "Growing up in Guwahati, we watched Assam's finest tea leave on export trucks. What came back — what we actually drank — was the dust and fragments left after the good stuff was taken. We drank it for years without questioning it. Then one day we did, and everything changed.",
          ),
          React.createElement(
            "p",
            {
              style: {
                fontFamily: "'Plus Jakarta Sans'",
                fontSize: 15,
                color: T.textMuted,
                lineHeight: 1.8,
              },
            },
            "That question took us to Golaghat. To a small processing house called Tailor Made Tea, where the leaf is handled the way it always should have been. One garden, whole leaves, nothing added. That's the entire model.",
          ),
        ),
        React.createElement(
          "div",
          { style: { gridColumn: "1 / -1" } },
          React.createElement(
            "h2",
            {
              style: {
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 400,
                fontSize: 24,
                color: T.text,
                marginBottom: 28,
                textAlign: "center",
              },
            },
            "What we actually do differently",
          ),
          React.createElement(
            "div",
            { className: "nev-bento" },
            React.createElement(
              "div",
              {
                className: "nev-bento-card nev-bento-card--forest nev-bento-large",
                style: { position: "relative", overflow: "hidden" },
              },
              React.createElement("div", {
                style: {
                  position: "absolute", inset: 0,
                  background: "radial-gradient(circle at 20% 80%, rgba(201,168,76,0.12) 0%, transparent 60%)",
                  pointerEvents: "none",
                },
              }),
              React.createElement("span", { className: "nev-bento-icon" }, String.fromCodePoint(0x1F331)),
              React.createElement("span", { className: "nev-bento-label", style: { color: "#C9A84C" } }, "Origin"),
              React.createElement(
                "h3",
                { className: "nev-bento-title", style: { fontSize: 28, color: "#F8F6F2" } },
                "One garden. Every variety."
              ),
              React.createElement(
                "p",
                { className: "nev-bento-desc", style: { fontSize: 15, color: "#F8F6F2", maxWidth: 320 } },
                "Everything comes from one garden in Golaghat. No blending across estates, no hiding origins. One terroir, expressed as clearly as we can manage."
              ),
              React.createElement(
                "div",
                {
                  className: "nev-bento-badge",
                  style: { background: "rgba(201,168,76,0.15)", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.25)" },
                },
                "Golaghat, Assam"
              )
            ),
            React.createElement(
              "div",
              { className: "nev-bento-card nev-bento-card--gold nev-bento-wide" },
              React.createElement("span", { className: "nev-bento-icon" }, String.fromCodePoint(0x1F343)),
              React.createElement("span", { className: "nev-bento-label", style: { color: "#C9A84C" } }, "Craft"),
              React.createElement(
                "h3",
                { className: "nev-bento-title", style: { fontSize: 20, color: "#F8F6F2" } },
                "Whole leaf only"
              ),
              React.createElement(
                "p",
                { className: "nev-bento-desc", style: { fontSize: 13, color: "#F8F6F2" } },
                "No CTC processing, no fannings, no dust. The whole leaf keeps its oils intact — which is why it brews properly and holds up to a second steep."
              )
            ),
            React.createElement(
              "div",
              { className: "nev-bento-card nev-bento-card--teal nev-bento-tall" },
              React.createElement("span", { className: "nev-bento-icon" }, String.fromCodePoint(0x2705)),
              React.createElement("span", { className: "nev-bento-label", style: { color: "#6EC6CA" } }, "Certified"),
              React.createElement(
                "h3",
                { className: "nev-bento-title", style: { fontSize: 20, color: "#F8F6F2" } },
                "PGS-India Organic"
              ),
              React.createElement(
                "p",
                { className: "nev-bento-desc", style: { fontSize: 13, color: "#F8F6F2" } },
                "Pesticide-free from soil to seal. PGS-India is a government-recognised certification with actual verification — not just something you print on a label."
              ),
              React.createElement(
                "div",
                {
                  className: "nev-bento-badge",
                  style: { background: "rgba(110,198,202,0.12)", color: "#6EC6CA", border: "1px solid rgba(110,198,202,0.2)" },
                },
                "FSSAI Certified too"
              )
            ),
            React.createElement(
              "div",
              {
                className: "nev-bento-card nev-bento-card--mist",
                style: { border: "1px solid rgba(31,46,36,0.12)" },
              },
              React.createElement("span", { className: "nev-bento-icon" }, String.fromCodePoint(0x1F52C)),
              React.createElement("span", { className: "nev-bento-label", style: { color: T.teal } }, "Safety"),
              React.createElement(
                "h3",
                { className: "nev-bento-title", style: { fontSize: 17, color: T.text } },
                "FSSAI Certified"
              ),
              React.createElement(
                "p",
                { className: "nev-bento-desc", style: { fontSize: 13, color: T.textMuted } },
                "Food safety compliant at every stage."
              )
            ),
            React.createElement(
              "div",
              {
                className: "nev-bento-card nev-bento-card--mist",
                style: { border: "1px solid rgba(201,168,76,0.12)" },
              },
              React.createElement("span", { className: "nev-bento-icon" }, String.fromCodePoint(0x1F4E6)),
              React.createElement("span", { className: "nev-bento-label", style: { color: T.gold } }, "Freshness"),
              React.createElement(
                "h3",
                { className: "nev-bento-title", style: { fontSize: 17, color: T.text } },
                "Small batch"
              ),
              React.createElement(
                "p",
                { className: "nev-bento-desc", style: { fontSize: 13, color: T.textMuted } },
                "Freshness guaranteed — we never hold old stock."
              )
            ),
            React.createElement(
              "div",
              {
                className: "nev-bento-card nev-bento-card--mist",
                style: { border: "1px solid rgba(31,46,36,0.1)" },
              },
              React.createElement("span", { className: "nev-bento-icon" }, String.fromCodePoint(0x1F4AC)),
              React.createElement("span", { className: "nev-bento-label", style: { color: T.teal } }, "Direct"),
              React.createElement(
                "h3",
                { className: "nev-bento-title", style: { fontSize: 17, color: T.text } },
                "No middlemen"
              ),
              React.createElement(
                "p",
                { className: "nev-bento-desc", style: { fontSize: 13, color: T.textMuted } },
                "Direct to consumer — fresher stock, real conversations."
              )
            )
          )
        ),
      ),
      React.createElement(
        "div",
        { style: { marginBottom: 64 } },
        React.createElement(
          "div",
          { style: { textAlign: "center", marginBottom: 48 } },
          React.createElement(
            "div",
            {
              style: {
                fontFamily: "'Plus Jakarta Sans'",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.18em",
                color: T.teal,
                textTransform: "uppercase",
                marginBottom: 12,
              },
            },
            "Our Origin Story",
          ),
          React.createElement(
            "h2",
            {
              style: {
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 400,
                fontSize: t ? 28 : 36,
                color: T.text,
                lineHeight: 1.2,
                marginBottom: 16,
              },
            },
            "Two people from Guwahati who wanted better tea",
          ),
          React.createElement(
            "p",
            {
              style: {
                fontFamily: "'Plus Jakarta Sans'",
                fontSize: 15,
                color: T.textMuted,
                lineHeight: 1.75,
                maxWidth: 560,
                margin: "0 auto",
              },
            },
            "Nevisan didn't start with a business plan. It started with a frustration we couldn't shake — why does the region that grows some of the world's finest tea produce tea that most people in India never actually taste in its real form?",
          ),
        ),
        React.createElement(
          "div",
          {
            style: {
              maxWidth: 620,
              margin: t ? "40px auto 8px" : "52px auto 8px",
              padding: t ? "28px 24px" : "40px 44px",
              background: T.white,
              borderRadius: 20,
              boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
              borderTop: "3px solid " + T.gold,
              textAlign: "left",
            },
          },
          React.createElement(
            "div",
            {
              style: {
                fontFamily: "'Plus Jakarta Sans'",
                fontSize: 11,
                letterSpacing: "0.16em",
                color: T.gold,
                textTransform: "uppercase",
                marginBottom: 16,
                textAlign: "center",
              },
            },
            "A note from the founders",
          ),
          React.createElement(
            "p",
            {
              style: {
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic",
                fontSize: t ? 16 : 18,
                lineHeight: 1.85,
                color: T.text,
                marginBottom: 20,
              },
            },
            "When we started Nevisan, we weren't trying to build a company. We just wanted to drink the tea that grows twenty minutes from where we grew up but somehow never made it into any shop we could find. So we went to Golaghat, met the growers, and started bringing back the whole leaf — the part that usually gets exported or blended away by the time it reaches anyone. Every tea we sell is one we drink at home. If something ever isn't right, message us on WhatsApp. One of us will reply — not a support team.",
          ),
          React.createElement(
            "div",
            {
              style: {
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic",
                fontSize: 15,
                color: T.textMuted,
                marginBottom: 6,
              },
            },
            "With love,",
          ),
          React.createElement(
            "div",
            {
              style: {
                fontFamily: "'Plus Jakarta Sans'",
                fontSize: 15,
                fontWeight: 600,
                color: T.teal,
              },
            },
            "Nishant & Uditi",
          ),
          React.createElement(
            "div",
            {
              style: {
                fontFamily: "'Plus Jakarta Sans'",
                fontSize: 12,
                color: T.textMuted,
                marginTop: 2,
              },
            },
            "Founders, Nevisan · Guwahati, Assam",
          ),
        ),
        React.createElement(
          "div",
          {
            style: {
              display: "grid",
              gridTemplateColumns: t ? "1fr" : "1fr 1fr",
              gap: t ? 24 : 40,
            },
          },
          [
            {
              initials: "NJ",
              name: "Nishant Jain",
              role: "Founder",
              bio: "Nishant grew up in Guwahati with some of India's best tea gardens nearby — and the tea at home was still mediocre. That gap nagged at him for years. Nevisan is what happened when he decided to close it.",
            },
            {
              initials: "UJ",
              name: "Uditi Jain",
              role: "Founder & Creative Director",
              bio: "Uditi thinks the experience of a thing matters as much as the thing itself. She shapes everything you see, read, and feel with Nevisan — so that the tea arrives in a way that feels considered, not just functional.",
            },
          ].map((e) =>
            React.createElement(
              "div",
              {
                key: e.name,
                style: {
                  background: T.white,
                  borderRadius: 20,
                  padding: t ? "28px 24px" : "36px 32px",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                },
              },
              React.createElement(
                "div",
                {
                  style: {
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${T.teal}, ${T.tealMid})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                    boxShadow: "0 4px 16px rgba(27,122,130,0.25)",
                  },
                },
                React.createElement(
                  "span",
                  {
                    style: {
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: 26,
                      color: "#fff",
                      fontWeight: 400,
                    },
                  },
                  e.initials,
                ),
              ),
              React.createElement(
                "div",
                {
                  style: {
                    fontFamily: "'Plus Jakarta Sans'",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    color: T.gold,
                    textTransform: "uppercase",
                    marginBottom: 6,
                  },
                },
                e.role,
              ),
              React.createElement(
                "h3",
                {
                  style: {
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 400,
                    fontSize: 22,
                    color: T.text,
                    marginBottom: 14,
                  },
                },
                e.name,
              ),
              React.createElement(
                "p",
                {
                  style: {
                    fontFamily: "'Plus Jakarta Sans'",
                    fontSize: 14,
                    color: T.textMuted,
                    lineHeight: 1.75,
                  },
                },
                e.bio,
              ),
            ),
          ),
        ),
      ),
      React.createElement(
        "div",
        {
          style: {
            background: T.teal,
            borderRadius: 20,
            padding: t ? "32px 24px" : "48px 56px",
            textAlign: "center",
          },
        },
        React.createElement(
          "h3",
          {
            style: {
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 400,
              fontSize: 28,
              color: "#fff",
              marginBottom: 16,
            },
          },
            "Still a small business. Still two people. Still answering our own WhatsApp.",
        ),
        React.createElement(
          "p",
          {
            style: {
              fontFamily: "'Plus Jakarta Sans'",
              fontSize: 15,
              color: "rgba(255,255,255,0.8)",
              lineHeight: 1.7,
              maxWidth: 540,
              margin: "0 auto 28px",
            },
          },
          "Mahabir Enterprise, Guwahati — that's the registered name. In practice it's a husband and wife who answer their own WhatsApp and pack their own orders. Every sale still feels personal to us. We want to keep it that way for as long as we can.",
        ),
        React.createElement(
          "button",
          {
            onClick: () => openWhatsApp(),
            style: {
              background: T.gold,
              color: T.tealDark,
              border: "none",
              borderRadius: 9999,
              padding: "13px 32px",
              cursor: "pointer",
              fontFamily: "'Plus Jakarta Sans'",
              fontSize: 14,
              fontWeight: 700,
            },
          },
          "💬 Say hello on WhatsApp",
        ),
      ),
    ),
    React.createElement(Footer, { setPage: e }),
  );
}
function CertificationsPage({ setPage: e }) {
  const { isMobile: t } = useViewport();
  return React.createElement(
    "div",
    {
      style: {
        background: T.cream,
        minHeight: "100vh",
        animation: "page-enter 0.45s ease both",
      },
    },
    React.createElement(PageHero, {
      photo: PAGE_PHOTOS.certifications,
      label: "Trust & Transparency",
      title: "Our Certifications",
      subtitle:
        "Every claim we make is backed by a third-party certification or verifiable standard.",
    }),
    React.createElement(
      "div",
      {
        style: {
          maxWidth: 900,
          margin: "0 auto",
          padding: t ? "48px 20px 80px" : "64px 40px 100px",
        },
      },
      React.createElement("div", { style: { display: "none" } }),
      React.createElement(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: t ? "1fr" : "repeat(2,1fr)",
            gap: 24,
          },
        },
        [
          {
            name: "FSSAI Certified",
            number: "FSSAI 10325001000313",
            icon: "\ud83c\udfdb",
            color: "#1b4f8a",
            desc: "Food Safety and Standards Authority of India. Nevisan meets all regulatory requirements for food safety, labelling and hygiene standards set by the Government of India.",
          },
          {
            name: "PGS-India Organic",
            number: "PGS Organic Certified",
            icon: "\ud83c\udf3f",
            color: "#2a6a2a",
            desc: "Participatory Guarantee System of India - a government-recognised organic certification. Guarantees our teas are grown without synthetic pesticides, chemical fertilisers or GMOs.",
          },
          {
            name: "GST Registered",
            number: "GSTIN 18AFAPJ8203P1Z7",
            icon: "\ud83d\udcbc",
            color: "#722f37",
            desc: "Registered under Goods and Services Tax, Government of India. Verifies Nevisan as a legally compliant tax-paying enterprise.",
          },
          {
            name: "Single Origin Verified",
            number: "Golaghat, Assam",
            icon: "\ud83d\udccd",
            color: "#8a4a10",
            desc: "Every Nevisan variety is sourced from a single garden in Golaghat, Assam. We provide complete traceability from leaf to pack - no blending, no substitution.",
          },
          {
            name: "Whole Leaf Standard",
            number: "No CTC \u2022 No Dust \u2022 No Fannings",
            icon: "\ud83c\udf43",
            color: "#1b7a82",
            desc: "All Nevisan teas use only whole or large-broken leaves. We do not use CTC (cut-tear-curl) processed tea, fannings, or dust in any product.",
          },
        ].map((e, t) =>
          React.createElement(
            "div",
            {
              key: t,
              style: {
                background: T.white,
                borderRadius: 16,
                padding: "28px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              },
            },
            React.createElement(
              "div",
              {
                style: {
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                  marginBottom: 14,
                },
              },
              React.createElement(
                "div",
                {
                  style: {
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: `${e.color}18`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    flexShrink: 0,
                  },
                },
                e.icon,
              ),
              React.createElement(
                "div",
                null,
                React.createElement(
                  "div",
                  {
                    style: {
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontWeight: 400,
                      fontSize: 18,
                      color: T.text,
                      marginBottom: 4,
                    },
                  },
                  e.name,
                ),
                React.createElement(
                  "div",
                  {
                    style: {
                      fontFamily: "'Plus Jakarta Sans'",
                      fontSize: 11,
                      color: e.color,
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                    },
                  },
                  e.number,
                ),
              ),
            ),
            React.createElement(
              "p",
              {
                style: {
                  fontFamily: "'Plus Jakarta Sans'",
                  fontSize: 13,
                  color: T.textMuted,
                  lineHeight: 1.7,
                },
              },
              e.desc,
            ),
          ),
        ),
      ),
    ),
    React.createElement(Footer, { setPage: e }),
  );
}
function WholesalePage({ setPage: e }) {
  const { isMobile: t } = useViewport(),
    [a, n] = React.useState({
      name: "",
      business: "",
      type: "",
      qty: "",
      message: "",
    });
  return React.createElement(
    "div",
    {
      style: {
        background: T.cream,
        minHeight: "100vh",
        animation: "page-enter 0.45s ease both",
      },
    },
    React.createElement(PageHero, {
      photo: PAGE_PHOTOS.wholesale,
      label: "Wholesale & Bulk",
      title: "Tea your customers will ask about",
      subtitle:
        "For cafes, hotels, retail stores, and corporate gifting. Single-origin whole-leaf tea that gives people a reason to come back.",
    }),
    React.createElement(
      "div",
      {
        style: {
          maxWidth: 1100,
          margin: "0 auto",
          padding: t ? "48px 20px 0" : "72px 32px 0",
        },
      },
      React.createElement(
        "div",
        { style: { textAlign: "center", marginBottom: t ? 32 : 48 } },
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              marginBottom: 14,
            },
          },
          React.createElement("div", {
            style: { height: 1, width: 48, background: T.gold },
          }),
          React.createElement(
            "span",
            {
              style: {
                fontFamily: "'Plus Jakarta Sans'",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.14em",
                color: T.teal,
                textTransform: "uppercase",
              },
            },
            "Who We Supply",
          ),
          React.createElement("div", {
            style: { height: 1, width: 48, background: T.gold },
          }),
        ),
        React.createElement(
          "h2",
          {
            style: {
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 400,
              fontSize: "clamp(24px, 3vw, 38px)",
              color: T.text,
            },
          },
          "Who we work with",
        ),
      ),
      React.createElement(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: t ? "1fr" : "repeat(3, 1fr)",
            gap: t ? 14 : 20,
            marginBottom: t ? 48 : 72,
          },
        },
        [
          {
            icon: "☕",
            title: "Cafes & Restaurants",
            desc: "A tea your regulars will ask about by name. Single-origin, whole-leaf, 50gm packs. Minimum 20–30 packs per variety.",
          },
          {
            icon: "🏨",
            title: "Hotels & Resorts",
            desc: "In-room and restaurant service. 50gm packs work for individual portions and look right on a tray.",
          },
          {
            icon: "🎁",
            title: "Corporate Gifting",
            desc: "Something people actually keep and use, not a gift that ends up in a drawer. Minimum 20 packs per order.",
          },
          {
            icon: "🛒",
            title: "Retail Stores",
            desc: "Stock that sells itself once customers taste it. Consistent supply, reasonable margins, no middlemen.",
          },
          {
            icon: "🏥",
            title: "Wellness Centres",
            desc: "Organic, functional teas that fit naturally into a wellness context. GABA, Chamomile, Tulsi \u2014 they belong here.",
          },
          {
            icon: "📦",
            title: "Online Resellers",
            desc: "Resell through your own channel. We handle fulfilment — you handle the relationship.",
          },
        ].map((e, t) =>
          React.createElement(
            "div",
            {
              key: t,
              style: {
                background: "#fff",
                borderRadius: 16,
                padding: "24px 22px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
              },
            },
            React.createElement(
              "div",
              { style: { marginBottom: 12, display: "flex", color: T.gold } },
              React.createElement(NevIcon, { name: e.icon, size: 32, color: T.gold }),
            ),
            React.createElement(
              "div",
              {
                style: {
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 400,
                  fontSize: 17,
                  color: T.text,
                  marginBottom: 8,
                },
              },
              e.title,
            ),
            React.createElement(
              "div",
              {
                style: {
                  fontFamily: "'Plus Jakarta Sans'",
                  fontSize: 13,
                  color: T.textMuted,
                  lineHeight: 1.65,
                },
              },
              e.desc,
            ),
          ),
        ),
      ),
    ),
    React.createElement(
      "div",
      { style: { background: "#fff", padding: t ? "48px 20px" : "72px 32px" } },
      React.createElement(
        "div",
        {
          style: {
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: t ? "1fr" : "1fr 1fr",
            gap: t ? 40 : 64,
            alignItems: "start",
          },
        },
        React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            {
              style: {
                fontFamily: "'Plus Jakarta Sans'",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.14em",
                color: T.teal,
                textTransform: "uppercase",
                marginBottom: 14,
              },
            },
            "What You Get",
          ),
          React.createElement(
            "h3",
            {
              style: {
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 400,
                fontSize: t ? 24 : 30,
                color: T.text,
                marginBottom: 24,
                lineHeight: 1.3,
              },
            },
            "Here's what's included.",
          ),
          React.createElement(
            "div",
            {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: 14,
                marginBottom: 36,
              },
            },
            [
              { icon: "✓", text: "Each pack is 50gm" },
              { icon: "✓", text: "Minimum order: 20–30 packs per variety" },
              { icon: "✓", text: "Pan-India delivery" },
              { icon: "✓", text: "Dedicated account manager" },
              { icon: "✓", text: "Response within 24 hours" },
              { icon: "✓", text: "PGS Organic certified supply" },
            ].map((e, t) =>
              React.createElement(
                "div",
                {
                  key: t,
                  style: { display: "flex", alignItems: "center", gap: 12 },
                },
                React.createElement(
                  "div",
                  {
                    style: {
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: T.teal,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    },
                  },
                  React.createElement(
                    "span",
                    { style: { color: "#fff", fontSize: 12, fontWeight: 700 } },
                    "✓",
                  ),
                ),
                React.createElement(
                  "span",
                  {
                    style: {
                      fontFamily: "'Plus Jakarta Sans'",
                      fontSize: 14,
                      color: T.text,
                    },
                  },
                  e.text,
                ),
              ),
            ),
          ),
          React.createElement(
            "div",
            {
              style: {
                background: T.cream,
                borderRadius: 14,
                padding: "20px 22px",
              },
            },
            React.createElement(
              "div",
              {
                style: {
                  fontFamily: "'Plus Jakarta Sans'",
                  fontSize: 12,
                  fontWeight: 600,
                  color: T.teal,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: 8,
                },
              },
              "Direct Contact",
            ),
            React.createElement(
              "div",
              {
                style: {
                  fontFamily: "'Plus Jakarta Sans'",
                  fontSize: 14,
                  color: T.textMuted,
                  lineHeight: 1.6,
                },
              },
              "Call or WhatsApp us directly at ",
              React.createElement(
                "strong",
                { style: { color: T.text } },
                "+91 98642 45687",
              ),
              ". We respond within 24 hours, every day.",
            ),
          ),
        ),
        React.createElement(
          "div",
          {
            style: {
              background: T.cream,
              borderRadius: 20,
              padding: t ? "28px 20px" : "36px 32px",
            },
          },
          React.createElement(
            "h3",
            {
              style: {
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 400,
                fontSize: 22,
                color: T.text,
                marginBottom: 6,
              },
            },
            "Send an Inquiry",
          ),
          React.createElement(
            "p",
            {
              style: {
                fontFamily: "'Plus Jakarta Sans'",
                fontSize: 13,
                color: T.textMuted,
                marginBottom: 24,
                lineHeight: 1.6,
              },
            },
            "Fill this in and we'll send pricing and availability directly on WhatsApp — usually within a few hours.",
          ),
          React.createElement(
            "div",
            { style: { display: "flex", flexDirection: "column", gap: 14 } },
            [
              { key: "name", label: "Your Name", placeholder: "Rahul Sharma" },
              {
                key: "business",
                label: "Business Name",
                placeholder: "The Green Café",
              },
              {
                key: "type",
                label: "Business Type",
                placeholder: "Café / Hotel / Retail / Gifting…",
              },
              {
                key: "qty",
                label: "Estimated Monthly Quantity",
                placeholder: "e.g. 20 packs, 50 packs (each 50gm)",
              },
            ].map((e) =>
              React.createElement(
                "div",
                { key: e.key },
                React.createElement(
                  "label",
                  {
                    style: {
                      fontFamily: "'Plus Jakarta Sans'",
                      fontSize: 11,
                      fontWeight: 600,
                      color: T.teal,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      display: "block",
                      marginBottom: 6,
                    },
                  },
                  e.label,
                ),
                React.createElement("input", {
                  value: a[e.key],
                  onChange: (t) =>
                    n((a) => ({ ...a, [e.key]: t.target.value })),
                  placeholder: e.placeholder,
                  style: {
                    width: "100%",
                    padding: "11px 14px",
                    borderRadius: 10,
                    border: "1.5px solid #e8e4de",
                    fontFamily: "'Plus Jakarta Sans'",
                    fontSize: 14,
                    color: T.text,
                    background: "#fff",
                    outline: "none",
                    boxSizing: "border-box",
                  },
                }),
              ),
            ),
            React.createElement(
              "div",
              null,
              React.createElement(
                "label",
                {
                  style: {
                    fontFamily: "'Plus Jakarta Sans'",
                    fontSize: 11,
                    fontWeight: 600,
                    color: T.teal,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    display: "block",
                    marginBottom: 6,
                  },
                },
                "Additional Requirements",
              ),
              React.createElement("textarea", {
                value: a.message,
                onChange: (e) => n((t) => ({ ...t, message: e.target.value })),
                placeholder:
                  "Custom packaging, specific varieties, delivery frequency…",
                rows: 3,
                style: {
                  width: "100%",
                  padding: "11px 14px",
                  borderRadius: 10,
                  border: "1.5px solid #e8e4de",
                  fontFamily: "'Plus Jakarta Sans'",
                  fontSize: 14,
                  color: T.text,
                  background: "#fff",
                  outline: "none",
                  resize: "vertical",
                  boxSizing: "border-box",
                },
              }),
            ),
            React.createElement(
              "button",
              {
                onClick: () => {
                  window.open(
                    `https://wa.me/919864245687?text=${encodeURIComponent(`Hi Nevisan! I'd like to inquire about wholesale/bulk ordering.\n\nName: ${a.name}\nBusiness: ${a.business}\nBusiness Type: ${a.type}\nEstimated Quantity: ${a.qty}\nMessage: ${a.message}`)}`,
                    "_blank",
                  );
                },
                style: {
                  width: "100%",
                  background: "#25D366",
                  color: "#fff",
                  border: "none",
                  borderRadius: 9999,
                  padding: "14px",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "'Plus Jakarta Sans'",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  marginTop: 4,
                },
              },
              React.createElement(
                "svg",
                {
                  width: "18",
                  height: "18",
                  viewBox: "0 0 24 24",
                  fill: "#fff",
                },
                React.createElement("path", {
                  d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z",
                }),
                React.createElement("path", {
                  d: "M12 0C5.373 0 0 5.373 0 12c0 2.12.554 4.11 1.523 5.836L.057 23.643a.5.5 0 00.625.601l5.963-1.583A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.805 9.805 0 01-5.045-1.395l-.361-.214-3.741.993.984-3.648-.235-.374A9.808 9.808 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z",
                }),
              ),
              "Send Inquiry via WhatsApp",
            ),
          ),
        ),
      ),
    ),
    React.createElement(Footer, { setPage: e }),
  );
}
function ContactPage({ setPage: e }) {
  const { isMobile: t } = useViewport(),
    [a, n] = React.useState({ name: "", email: "", message: "" }),
    [o, i] = React.useState(!1),
    r = {
      width: "100%",
      padding: "12px 16px",
      border: "1.5px solid #e0dcd4",
      borderRadius: 10,
      fontFamily: "'Plus Jakarta Sans'",
      fontSize: 14,
      color: T.text,
      background: T.white,
      outline: "none",
      boxSizing: "border-box",
      transition: "border-color 200ms",
    };
  return React.createElement(
    "div",
    {
      style: {
        background: T.cream,
        minHeight: "100vh",
        animation: "page-enter 0.45s ease both",
      },
    },
    React.createElement(PageHero, {
      photo: PAGE_PHOTOS.contact,
      label: "Get in Touch",
      title: "We'd love to hear from you",
      subtitle: "Orders, wholesale enquiries, or just a question about tea.",
    }),
    React.createElement(
      "div",
      {
        style: {
          maxWidth: 960,
          margin: "0 auto",
          padding: t ? "48px 20px 80px" : "64px 40px 100px",
        },
      },
      React.createElement("div", { style: { display: "none" } }),
      React.createElement(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: t ? "1fr" : "1fr 1fr",
            gap: t ? 32 : 48,
            alignItems: "start",
          },
        },
        React.createElement(
          "div",
          null,
          [
            {
              icon: "💬",
              label: "WhatsApp (fastest)",
              value: "+91 98642 45687",
              action: () => openWhatsApp(),
            },
            {
              icon: "📧",
              label: "Email",
              value: "nevisan12@gmail.com",
              action: () => window.open("mailto:nevisan12@gmail.com"),
            },
            {
              icon: "📍",
              label: "Address",
              value: "Mahabir Enterprise, Guwahati, Assam, India",
              action: null,
            },
            { icon: "🌐", label: "Website", value: "nevisan.in", action: null },
          ].map((e, t) =>
            React.createElement(
              "div",
              {
                key: t,
                onClick: e.action || void 0,
                style: {
                  display: "flex",
                  gap: 16,
                  alignItems: "flex-start",
                  marginBottom: 28,
                  cursor: e.action ? "pointer" : "default",
                },
              },
              React.createElement(
                "div",
                {
                  style: {
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "rgba(27,122,130,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    flexShrink: 0,
                  },
                },
                e.icon,
              ),
              React.createElement(
                "div",
                null,
                React.createElement(
                  "div",
                  {
                    style: {
                      fontFamily: "'Plus Jakarta Sans'",
                      fontSize: 11,
                      letterSpacing: "0.12em",
                      color: T.textMuted,
                      textTransform: "uppercase",
                      marginBottom: 4,
                    },
                  },
                  e.label,
                ),
                React.createElement(
                  "div",
                  {
                    style: {
                      fontFamily: "'Plus Jakarta Sans'",
                      fontSize: 15,
                      color: e.action ? T.teal : T.text,
                      fontWeight: e.action ? 500 : 400,
                    },
                  },
                  e.value,
                ),
              ),
            ),
          ),
          React.createElement(
            "div",
            {
              style: {
                marginTop: 8,
                padding: "20px 24px",
                background: T.teal,
                borderRadius: 14,
              },
            },
            React.createElement(
              "p",
              {
                style: {
                  fontFamily: "'Plus Jakarta Sans'",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.85)",
                  lineHeight: 1.7,
                  marginBottom: 14,
                },
              },
              "Fastest way to order or ask anything — WhatsApp us directly.",
            ),
            React.createElement(
              "button",
              {
                onClick: () => openWhatsApp(),
                style: {
                  background: "#25D366",
                  color: T.white,
                  border: "none",
                  borderRadius: 9999,
                  padding: "10px 24px",
                  cursor: "pointer",
                  fontFamily: "'Plus Jakarta Sans'",
                  fontSize: 13,
                  fontWeight: 600,
                },
              },
              "💬 Open WhatsApp",
            ),
          ),
        ),
        React.createElement(
          "div",
          {
            style: {
              background: T.white,
              borderRadius: 20,
              padding: t ? "28px 20px" : "36px 32px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
            },
          },
          o
            ? React.createElement(
                "div",
                { style: { textAlign: "center", padding: "40px 0" } },
                React.createElement(
                  "div",
                  { style: { fontSize: 48, marginBottom: 16 } },
                  "✅",
                ),
                React.createElement(
                  "h3",
                  {
                    style: {
                      fontFamily: "'Playfair Display'",
                      fontSize: 22,
                      color: T.text,
                      marginBottom: 10,
                    },
                  },
                  "Message sent!",
                ),
                React.createElement(
                  "p",
                  {
                    style: {
                      fontFamily: "'Plus Jakarta Sans'",
                      fontSize: 14,
                      color: T.textMuted,
                    },
                  },
                  "We've opened WhatsApp with your message. We'll reply within a few hours.",
                ),
                React.createElement(
                  "button",
                  {
                    onClick: () => i(!1),
                    style: {
                      marginTop: 20,
                      background: T.teal,
                      color: T.white,
                      border: "none",
                      borderRadius: 9999,
                      padding: "10px 28px",
                      cursor: "pointer",
                      fontFamily: "'Plus Jakarta Sans'",
                      fontSize: 13,
                    },
                  },
                  "Send another",
                ),
              )
            : React.createElement(
                "form",
                {
                  onSubmit: (e) => {
                    (e.preventDefault(),
                      window.open(
                        `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hi Nevisan! My name is ${a.name}. ${a.message} (Reply to: ${a.email})`)}`,
                        "_blank",
                      ),
                      i(!0));
                  },
                },
                React.createElement(
                  "h3",
                  {
                    style: {
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontWeight: 400,
                      fontSize: 22,
                      color: T.text,
                      marginBottom: 24,
                    },
                  },
                  "Send a message",
                ),
                React.createElement(
                  "div",
                  { style: { marginBottom: 16 } },
                  React.createElement(
                    "label",
                    {
                      style: {
                        fontFamily: "'Plus Jakarta Sans'",
                        fontSize: 12,
                        color: T.textMuted,
                        letterSpacing: "0.08em",
                        display: "block",
                        marginBottom: 6,
                      },
                    },
                    "YOUR NAME",
                  ),
                  React.createElement("input", {
                    required: !0,
                    style: r,
                    placeholder: "e.g. Priya Sharma",
                    value: a.name,
                    onChange: (e) => n((t) => ({ ...t, name: e.target.value })),
                    onFocus: (e) => (e.target.style.borderColor = T.teal),
                    onBlur: (e) => (e.target.style.borderColor = "#e0dcd4"),
                  }),
                ),
                React.createElement(
                  "div",
                  { style: { marginBottom: 16 } },
                  React.createElement(
                    "label",
                    {
                      style: {
                        fontFamily: "'Plus Jakarta Sans'",
                        fontSize: 12,
                        color: T.textMuted,
                        letterSpacing: "0.08em",
                        display: "block",
                        marginBottom: 6,
                      },
                    },
                    "EMAIL",
                  ),
                  React.createElement("input", {
                    required: !0,
                    type: "email",
                    style: r,
                    placeholder: "you@example.com",
                    value: a.email,
                    onChange: (e) =>
                      n((t) => ({ ...t, email: e.target.value })),
                    onFocus: (e) => (e.target.style.borderColor = T.teal),
                    onBlur: (e) => (e.target.style.borderColor = "#e0dcd4"),
                  }),
                ),
                React.createElement(
                  "div",
                  { style: { marginBottom: 24 } },
                  React.createElement(
                    "label",
                    {
                      style: {
                        fontFamily: "'Plus Jakarta Sans'",
                        fontSize: 12,
                        color: T.textMuted,
                        letterSpacing: "0.08em",
                        display: "block",
                        marginBottom: 6,
                      },
                    },
                    "MESSAGE",
                  ),
                  React.createElement("textarea", {
                    required: !0,
                    rows: 4,
                    style: { ...r, resize: "vertical" },
                    placeholder:
                      "I'd like to order / ask about wholesale / ...",
                    value: a.message,
                    onChange: (e) =>
                      n((t) => ({ ...t, message: e.target.value })),
                    onFocus: (e) => (e.target.style.borderColor = T.teal),
                    onBlur: (e) => (e.target.style.borderColor = "#e0dcd4"),
                  }),
                ),
                React.createElement(
                  "button",
                  {
                    type: "submit",
                    style: {
                      width: "100%",
                      background: T.teal,
                      color: T.white,
                      border: "none",
                      borderRadius: 12,
                      padding: "14px",
                      cursor: "pointer",
                      fontFamily: "'Plus Jakarta Sans'",
                      fontSize: 14,
                      fontWeight: 600,
                      transition: "filter 200ms",
                    },
                    onMouseEnter: (e) =>
                      (e.currentTarget.style.filter = "brightness(1.1)"),
                    onMouseLeave: (e) =>
                      (e.currentTarget.style.filter = "none"),
                  },
                  "Send via WhatsApp →",
                ),
              ),
        ),
      ),
    ),
    React.createElement(Footer, { setPage: e }),
  );
}
function App() {
  const [e, t] = useState(() => {
    if (typeof window === "undefined") return "Home";
    try {
      var __tea = new URLSearchParams(window.location.search).get("tea");
      if (__tea) return "Collection";
    } catch (__e) {}
    var h = window.location.hash;
    if (h === "#collection") return "Collection";
    if (h === "#our-story") return "Our Story";
    if (h === "#about") return "About";
    if (h === "#journal") return "Journal";
    if (h === "#contact") return "Contact";
    if (h === "#certifications") return "Certifications";
    if (h === "#wholesale") return "Wholesale";
    return "Home";
  }),
    [a, n] = useState("undefined" != typeof window ? window.innerWidth : 1200);
  
  useEffect(() => {
    const handleHash = () => {
      var h = window.location.hash;
      var pg = "Home";
      if (h === "#collection") pg = "Collection";
      else if (h === "#our-story") pg = "Our Story";
      else if (h === "#about") pg = "About";
      else if (h === "#journal") pg = "Journal";
      else if (h === "#contact") pg = "Contact";
      else if (h === "#certifications") pg = "Certifications";
      else if (h === "#wholesale") pg = "Wholesale";
      t(pg);
    };
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  useEffect(() => {
    const e = () => n(window.innerWidth);
    return (
      window.addEventListener("resize", e),
      () => window.removeEventListener("resize", e)
    );
  }, []);
  const o = { isMobile: a < 768, isTablet: a < 1024 },
    i = (pg) => {
      var hash = "#home";
      if (pg === "Collection") hash = "#collection";
      else if (pg === "Our Story") hash = "#our-story";
      else if (pg === "About") hash = "#about";
      else if (pg === "Journal") hash = "#journal";
      else if (pg === "Contact") hash = "#contact";
      else if (pg === "Certifications") hash = "#certifications";
      else if (pg === "Wholesale") hash = "#wholesale";
      
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (window.location.hash !== hash) {
        window.location.hash = hash;
      } else {
        t(pg);
      }
    };
  let r;
  return (
    (r =
      "Home" === e
        ? React.createElement(HomePage, { setPage: i })
        : "Collection" === e
          ? React.createElement(
              React.Fragment,
              null,
              React.createElement(CollectionPage, { setPage: i }),
              React.createElement(Footer, { setPage: i }),
            )
          : "Our Story" === e
            ? React.createElement(OurStoryPage, { setPage: i })
            : "About" === e
              ? React.createElement(AboutPage, { setPage: i })
              : "Journal" === e
                ? React.createElement(JournalPage, { setPage: i })
                : "Contact" === e
                  ? React.createElement(ContactPage, { setPage: i })
                  : "Certifications" === e
                    ? React.createElement(CertificationsPage, { setPage: i })
                    : "Wholesale" === e
                      ? React.createElement(WholesalePage, { setPage: i })
                      : React.createElement(HomePage, { setPage: i })),
    React.createElement(
      CartProvider,
      null,
      React.createElement(
        ViewportCtx.Provider,
        { value: o },
        React.createElement(ScrollProgress, null),
        React.createElement(CursorGlow, null),
        React.createElement(Nav, { page: e, setPage: i }),
        r,
        React.createElement(CartFAB, null),
        React.createElement(WhatsAppFAB, null),
      ),
    )
  );
}
function CartSheet({ onClose: e }) {
  const { cart: t, updateQty: a, clearCart: n } = useCart(),
    o = (useViewport(), t.reduce((e, t) => e + 499 * t.qty, 0)),
    i = t.reduce((e, t) => e + t.qty, 0);
  return ReactDOM.createPortal(
    React.createElement(
      "div",
      {
        style: {
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.55)",
          zIndex: 400,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
        },
        onClick: e,
      },
      React.createElement(
        "div",
        {
          style: {
            background: "#fff",
            borderRadius: "20px 20px 0 0",
            width: "100%",
            maxWidth: 500,
            maxHeight: "85vh",
            display: "flex",
            flexDirection: "column",
            animation: "slide-up 0.3s ease both",
          },
          onClick: (e) => e.stopPropagation(),
        },
        React.createElement(
          "div",
          {
            style: {
              padding: "14px 20px 12px",
              borderBottom: "1px solid #f0f0f0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexShrink: 0,
            },
          },
          React.createElement(
            "div",
            null,
            React.createElement(
              "h3",
              {
                style: {
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 400,
                  fontSize: 20,
                  color: T.text,
                  margin: 0,
                },
              },
              "Your Order",
            ),
            React.createElement(
              "div",
              {
                style: {
                  fontFamily: "'Plus Jakarta Sans'",
                  fontSize: 12,
                  color: T.textMuted,
                  marginTop: 2,
                },
              },
              i,
              " pack",
              1 !== i ? "s" : "",
              " · 50gm each",
            ),
          ),
          React.createElement(
            "button",
            {
              onClick: e,
              style: {
                background: "rgba(0,0,0,0.07)",
                border: "none",
                borderRadius: "50%",
                width: 32,
                height: 32,
                cursor: "pointer",
                fontSize: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
            },
            "✕",
          ),
        ),
        React.createElement(
          "div",
          { style: { overflowY: "auto", flex: 1, padding: "12px 20px" } },
          t.map((e) =>
            React.createElement(
              "div",
              {
                key: e.tea.name,
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 0",
                  borderBottom: "1px solid #f8f8f8",
                },
              },
              React.createElement(
                "div",
                {
                  style: {
                    width: 54,
                    height: 54,
                    borderRadius: 10,
                    overflow: "hidden",
                    background: T.white,
                    border: "1px solid #eee",
                    flexShrink: 0,
                  },
                },
                e.tea.img
                  ? React.createElement("img", {
                      src: e.tea.img,
                      alt: e.tea.name,
                      loading: "lazy",
                      style: {
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        padding: "4px",
                        boxSizing: "border-box",
                      },
                    })
                  : React.createElement(
                      "div",
                      {
                        style: {
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100%",
                          fontSize: 22,
                        },
                      },
                      "🍃",
                    ),
              ),
              React.createElement(
                "div",
                { style: { flex: 1, minWidth: 0 } },
                React.createElement(
                  "div",
                  {
                    style: {
                      fontFamily: "'Plus Jakarta Sans'",
                      fontSize: 13,
                      fontWeight: 600,
                      color: T.text,
                      marginBottom: 2,
                      lineHeight: 1.3,
                    },
                  },
                  e.tea.name,
                ),
                React.createElement(
                  "div",
                  {
                    style: {
                      fontFamily: "'Plus Jakarta Sans'",
                      fontSize: 13,
                      fontWeight: 700,
                      color: T.teal,
                    },
                  },
                  "₹",
                  275 * e.qty,
                ),
              ),
              React.createElement(
                "div",
                {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    flexShrink: 0,
                  },
                },
                React.createElement(
                  "button",
                  {
                    onClick: () => a(e.tea.name, -1),
                    style: {
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      border: `1.5px solid ${T.teal}`,
                      background: "none",
                      color: T.teal,
                      fontSize: 18,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      lineHeight: 1,
                    },
                  },
                  "−",
                ),
                React.createElement(
                  "span",
                  {
                    style: {
                      fontFamily: "'Plus Jakarta Sans'",
                      fontSize: 16,
                      fontWeight: 700,
                      color: T.text,
                      minWidth: 18,
                      textAlign: "center",
                    },
                  },
                  e.qty,
                ),
                React.createElement(
                  "button",
                  {
                    onClick: () => a(e.tea.name, 1),
                    style: {
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      background: T.teal,
                      border: "none",
                      color: "#fff",
                      fontSize: 18,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      lineHeight: 1,
                    },
                  },
                  "+",
                ),
              ),
            ),
          ),
        ),
        React.createElement(
          "div",
          {
            style: {
              padding: "16px 20px 28px",
              borderTop: "1px solid #f0f0f0",
              flexShrink: 0,
            },
          },
          React.createElement(
            "div",
            {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 14,
              },
            },
            React.createElement(
              "span",
              {
                style: {
                  fontFamily: "'Plus Jakarta Sans'",
                  fontSize: 14,
                  color: T.textMuted,
                },
              },
              "Total Amount",
            ),
            React.createElement(
              "span",
              {
                style: {
                  fontFamily: "'Plus Jakarta Sans'",
                  fontSize: 22,
                  fontWeight: 700,
                  color: T.teal,
                },
              },
              "₹",
              o,
            ),
          ),
          React.createElement(
            "button",
            {
              className: "shine-button",
              onClick: () => {
                try {
                  const m = {
                    "Lemongrass Green Tea": "KT-8GBE-8MZG",
                    "Blue Flower Green Tea": "BlueFlower-1",
                    "Rum Green Tea": "RUM-1",
                    "Spearmint Green Tea": "Spearmint",
                    "Tulsi Green Tea": "MK-H5LY-IRK3",
                    "Chamomile Green Tea": "Chamomile-1",
                    "Whiskey Green Tea": "9E-23FO-LL8Q",
                    "GABA Oolong Tea": "GABA",
                    "Organic Green Tea": "Unflavoured-1",
                    "Ginger Green Tea": "GINGER",
                  };
                  const skus = t
                    .map((item) => m[item.tea.name])
                    .filter(Boolean);
                  if (skus.length > 0 && typeof fbq !== "undefined") {
                    fbq("track", "Purchase", {
                      content_ids: skus,
                      content_type: "product",
                      value: o,
                      currency: "INR",
                    });
                  }
                } catch (err) {}
                const a = t
                  .map((e) => `• ${e.tea.name} x${e.qty} = ₹${275 * e.qty}`)
                  .join("\n");
                (window.open(
                  `https://wa.me/919864245687?text=${encodeURIComponent(`Hi Nevisan! I'd like to place an order:\n\n${a}\n\nTotal: ₹${o} (${i} packs × 50gm)\n\nPlease confirm my order and share delivery details.`)}`,
                  "_blank",
                ),
                  n(),
                  e());
              },
              style: {
                width: "100%",
                background: "#25D366",
                color: "#fff",
                border: "none",
                borderRadius: 9999,
                padding: "14px",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "'Plus Jakarta Sans'",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              },
            },
            React.createElement(
              "svg",
              { width: "18", height: "18", viewBox: "0 0 24 24", fill: "#fff" },
              React.createElement("path", {
                d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z",
              }),
              React.createElement("path", {
                d: "M12 0C5.373 0 0 5.373 0 12c0 2.12.554 4.11 1.523 5.836L.057 23.643a.5.5 0 00.625.601l5.963-1.583A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.805 9.805 0 01-5.045-1.395l-.361-.214-3.741.993.984-3.648-.235-.374A9.808 9.808 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z",
              }),
            ),
            "Place Order via WhatsApp",
          ),
        ),
      ),
    ),
    document.body,
  );
}
function CartFAB() {
  const { cart: e } = useCart(),
    [t, a] = useState(!1),
    n = e.reduce((e, t) => e + t.qty, 0);
  return 0 === n
    ? null
    : React.createElement(
        React.Fragment,
        null,
        React.createElement(
          "button",
          {
            onClick: () => a(!0),
            style: {
              position: "fixed",
              bottom: 90,
              right: 20,
              zIndex: 998,
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: T.teal,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 20px rgba(27,122,130,0.45)",
              border: "none",
              cursor: "pointer",
              fontSize: 22,
            },
          },
          "🛒",
          React.createElement(
            "div",
            {
              style: {
                position: "absolute",
                top: -4,
                right: -4,
                background: "#e8312a",
                color: "#fff",
                borderRadius: "50%",
                width: 22,
                height: 22,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 700,
                fontFamily: "'Plus Jakarta Sans'",
              },
            },
            n,
          ),
        ),
        t && React.createElement(CartSheet, { onClose: () => a(!1) }),
      );
}
function AddToCartBtn({ tea: e, onAdded: t }) {
  const { addToCart: a } = useCart(),
    [n, o] = useState(!1);
  return React.createElement(
    "button",
    {
      onClick: () => {
        (a(e), o(!0), setTimeout(() => o(!1), 1500), t && t());
      },
      style: {
        width: "100%",
        background: n ? T.teal : T.tealDark,
        color: "#fff",
        border: "none",
        borderRadius: 9999,
        padding: "13px",
        fontSize: 14,
        fontWeight: 700,
        cursor: "pointer",
        fontFamily: "'Plus Jakarta Sans'",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        transition: "background 0.2s",
      },
    },
    n ? "✓ Added to Cart!" : "🛒 Add to Cart",
  );
}
function WhatsAppFAB() {
  const [e, t] = useState(!1);
  return (
    useEffect(() => {
      const e = () => t(window.scrollY > 200);
      return (
        window.addEventListener("scroll", e, { passive: !0 }),
        () => window.removeEventListener("scroll", e)
      );
    }, []),
    React.createElement(
      "a",
      {
        href: "https://wa.me/919864245687?text=Hi%20Nevisan!%20I%27d%20like%20to%20order%20some%20tea.",
        target: "_blank",
        rel: "noopener noreferrer",
        style: {
          position: "fixed",
          bottom: 24,
          right: 20,
          zIndex: 999,
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "#25D366",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(37,211,102,0.5)",
          opacity: e ? 1 : 0,
          transform: e ? "scale(1)" : "scale(0.7)",
          transition: "opacity 0.25s ease, transform 0.25s ease",
          pointerEvents: e ? "auto" : "none",
          textDecoration: "none",
        },
        "aria-label": "Chat on WhatsApp",
      },
      React.createElement(
        "svg",
        { width: "28", height: "28", viewBox: "0 0 24 24", fill: "#fff" },
        React.createElement("path", {
          d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z",
        }),
        React.createElement("path", {
          d: "M12 0C5.373 0 0 5.373 0 12c0 2.12.554 4.11 1.523 5.836L.057 23.643a.5.5 0 00.625.601l5.963-1.583A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.805 9.805 0 01-5.045-1.395l-.361-.214-3.741.993.984-3.648-.235-.374A9.808 9.808 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z",
        }),
      ),
    )
  );
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Nevisan Error Boundary caught error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return React.createElement("div", { style: { padding: "80px 20px", textAlign: "center", fontFamily: "'Plus Jakarta Sans', sans-serif" } },
        React.createElement("h2", { style: { color: "#1F2E24", fontFamily: "'Playfair Display', serif", fontSize: 28, marginBottom: 12 } }, "Nevisan Tea"),
        React.createElement("p", { style: { color: "#5C7064", margin: "16px 0", fontSize: 15 } }, "An unexpected display issue occurred while rendering."),
        React.createElement("button", {
          onClick: () => window.location.reload(),
          style: { background: "#C9A84C", color: "#15271B", border: "none", padding: "12px 24px", borderRadius: 8, cursor: "pointer", fontWeight: 600 }
        }, "Reload Page")
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  React.createElement(ErrorBoundary, null, React.createElement(App, null)),
);
