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
  const [e, t] = useState(0);
  return (
    useEffect(() => {
      const e = () => {
        const e = document.documentElement.scrollHeight - window.innerHeight;
        t(e > 0 ? (window.scrollY / e) * 100 : 0);
      };
      return (
        window.addEventListener("scroll", e, { passive: !0 }),
        () => window.removeEventListener("scroll", e)
      );
    }, []),
    React.createElement(
      "div",
      {
        style: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          zIndex: 999,
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
  );
}
function CursorGlow() {
  const [e, t] = useState({ x: -400, y: -400 }),
    [a, n] = useState(!1);
  return (
    useEffect(() => {
      if (window.matchMedia("(hover: none)").matches) return;
      const e = (e) => {
        (t({ x: e.clientX, y: e.clientY }), n(!0));
      };
      return (
        window.addEventListener("mousemove", e, { passive: !0 }),
        () => window.removeEventListener("mousemove", e)
      );
    }, []),
    a
      ? React.createElement("div", {
          style: {
            position: "fixed",
            left: e.x - 220,
            top: e.y - 220,
            width: 440,
            height: 440,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(27,122,130,0.05) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 9998,
            transition: "left 200ms ease-out, top 200ms ease-out",
          },
        })
      : null
  );
}
const WA_NUMBER = "919864245687";
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
    src: "nevisan-logo.webp",
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
      "Wholesale",
      "Contact",
      "FAQ",
      "Quiz",
      "Locations",
    ]
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
    "FAQ" === e
      ? (window.location.href = "/faq")
      : "Quiz" === e
        ? (window.location.href = "/quiz")
        : (t(e), l(!1));
  };
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      "nav",
      {
        role: "navigation",
        "aria-label": "Main navigation",
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
                fontSize: s ? 16 : 18,
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
            { style: { display: "flex", gap: 32, alignItems: "center" } },
            a.map((t) => {
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
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 16,
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
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 16,
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
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'Inter', sans-serif",
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
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'Inter'",
                },
              },
              "💬 Order",
            ),
            React.createElement(
              "button",
              {
                onClick: () => l((e) => !e),
                "aria-label": r ? "Close menu" : "Open menu",
                "aria-expanded": r,
                "aria-controls": "mobile-menu",
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
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "'Inter'",
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
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "'Inter'",
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
                  fontFamily: "'Inter'",
                  fontSize: 16,
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
                  fontFamily: "'Inter'",
                  fontSize: 16,
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
              fontFamily: "'Inter', sans-serif",
              fontSize: 16,
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
            { style: { color: T.gold, fontSize: 12 } },
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
              src: "hero-mobile.webp?v=2",
              alt: "Nevisan tea garden in Golaghat Assam - single origin whole leaf tea",
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
                poster: "hero-bg.webp",
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
            padding: i ? "0 22px" : "0 40px",
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
                fontFamily: "'Inter'",
                fontSize: 16,
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
                fontFamily: "'Inter'",
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
            "Ten varieties, one origin. One garden in Golaghat, Assam. Whole leaf, chemical-free, steeped in nothing but intention.",
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
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'Inter'",
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
                  fontSize: 16,
                  fontWeight: 400,
                  cursor: "pointer",
                  fontFamily: "'Inter'",
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
                      fontFamily: "'Inter'",
                      fontSize: 16,
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
              fontSize: 16,
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.14em",
              fontFamily: "'Inter'",
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
const teaSlug = (name) => name.toLowerCase().replace(/\s+/g, "-");
const TEAS = [
  {
    name: "Lemongrass Green Tea",
    short:
      "The one we reach for first thing. Bright, lemony, and kind to your stomach.",
    tags: ["DIGESTION", "METABOLISM"],
    bg: "#d4edd8",
    color: "#3a7a50",
    img: "teas/lemongrass.webp?v=2",
    price: 499,
    brew: "90°C · 2–3 min · Can steep twice",
    benefits: [
      {
        icon: "🌿",
        title: "Digestive Comfort",
        desc: "Lemongrass is traditionally used to soothe the digestive tract and ease bloating.",
      },
      {
        icon: "🔥",
        title: "Metabolism Support",
        desc: "Natural citral in lemongrass may help support healthy metabolic function.",
      },
      {
        icon: "💧",
        title: "Hydrating & Refreshing",
        desc: "A naturally hydrating herbal tea with a bright, citrusy flavour.",
      },
      {
        icon: "😌",
        title: "Calming",
        desc: "Gentle and soothing — a pleasant mid-day cup to help you unwind.",
      },
      {
        icon: "🦠",
        title: "Gut-Friendly",
        desc: "Lemongrass has been used traditionally to support digestive wellness.",
      },
    ],
  },
  {
    name: "Blue Flower Green Tea",
    short:
      "Add a drop of lemon and watch it turn purple. Calming, antioxidant-rich, a little magic.",
    tags: ["CALMING", "ANTIOXIDANT"],
    bg: "#c8dff0",
    color: "#2a5a8a",
    img: "teas/blue-flower.webp?v=2",
    price: 499,
    brew: "85°C · 2–3 min · No milk needed",
    benefits: [
      {
        icon: "🫐",
        title: "Antioxidant-Rich",
        desc: "Butterfly pea flower contains anthocyanins, the same compounds found in blueberries.",
      },
      {
        icon: "🧠",
        title: "Calm Focus",
        desc: "A naturally caffeine-free option for moments when you want clarity without stimulation.",
      },
      {
        icon: "✨",
        title: "Vibrant & Fun",
        desc: "The colour-changing effect makes every cup a visual experience — add lemon for the surprise.",
      },
      {
        icon: "😴",
        title: "Soothing Evening Cup",
        desc: "A gentle, caffeine-free herbal tea perfect for winding down in the evening.",
      },
      {
        icon: "🌈",
        title: "Colour-Changing Fun",
        desc: "Add lemon and watch it shift from blue to purple — a natural pH reaction.",
      },
    ],
  },
  {
    name: "Rum Green Tea",
    short:
      "Took us 14 tries to get right. All the warmth of aged rum, zero alcohol.",
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
        desc: "All the warmth of aged rum — crafted entirely from natural botanicals. Zero alcohol.",
      },
      {
        icon: "😊",
        title: "Mood Lifting",
        desc: "Warm spice notes trigger feel-good responses, making it a perfect evening ritual.",
      },
      {
        icon: "💚",
        title: "Green Tea Antioxidants",
        desc: "Assam green tea base delivers EGCG antioxidants that protect cells and reduce inflammation.",
      },
      {
        icon: "🌿",
        title: "Natural Botanicals Only",
        desc: "Flavour comes from a precise blend of natural herbs and spices — zero artificial additives.",
      },
      {
        icon: "🔄",
        title: "Multi-Steep Value",
        desc: "Whole leaf quality means 2–3 full-flavoured steeps from every single serving.",
      },
    ],
  },
  {
    name: "Spearmint Green Tea",
    short:
      "Uditi drinks this one every day. Gentle on hormones, lovely for the skin.",
    tags: ["HORMONAL", "SKIN"],
    bg: "#e8d4f0",
    color: "#6a3a8a",
    img: "teas/spearmint.webp?v=2",
    price: 499,
    brew: "85°C · 2 min · Light and refreshing",
    benefits: [
      {
        icon: "⚖️",
        title: "Hormonal Wellness",
        desc: "A bright, cooling mint infusion with a clean, refreshing finish. Popular for its naturally uplifting character.",
      },
      {
        icon: "🧖",
        title: "Skin-Friendly",
        desc: "A gentle, refreshing tea that fits well into a holistic skincare routine.",
      },
      {
        icon: "💨",
        title: "Fresh & Soothing",
        desc: "Naturally refreshing — great for fresh breath and digestive comfort after meals.",
      },
      {
        icon: "🧠",
        title: "Mental Refreshment",
        desc: "The bright, minty flavour of spearmint is naturally uplifting and clarifying.",
      },
      {
        icon: "🌸",
        title: "Gentle & Soothing",
        desc: "Spearmint has been used for centuries as a calming, anti-inflammatory herb.",
      },
    ],
  },
  {
    name: "Tulsi Green Tea",
    short:
      "Holy basil and Assam green. What we brew when life gets a little much.",
    tags: ["IMMUNITY", "STRESS"],
    bg: "#d4edd8",
    color: "#3a7a50",
    img: "teas/tulsi.webp?v=2",
    price: 499,
    brew: "90°C · 3–4 min · Best plain or with honey",
    benefits: [
      {
        icon: "🛡️",
        title: "Immunity Support",
        desc: "Tulsi (Holy Basil) has a long history in Ayurvedic tradition. A warming, herbaceous infusion with a distinctive clove-like aroma.",
      },
      {
        icon: "🧘",
        title: "Stress & Calm",
        desc: "Tulsi is traditionally used to promote calm focus and mental balance.",
      },
      {
        icon: "🫁",
        title: "Respiratory Comfort",
        desc: "A soothing cup that many enjoy during seasonal changes for throat and chest comfort.",
      },
      {
        icon: "🩸",
        title: "Metabolic Wellness",
        desc: "Tulsi is traditionally used to support healthy blood sugar levels as part of a balanced lifestyle.",
      },
      {
        icon: "🌱",
        title: "Liver & Wellness",
        desc: "Tulsi has been used in Ayurvedic practice to support liver function and overall well-being.",
      },
    ],
  },
  {
    name: "Chamomile Green Tea",
    short:
      "Our wind-down cup. Soft, floral, and made for slow evenings and deeper sleep.",
    tags: ["SLEEP", "CALMING"],
    bg: "#f5e9a0",
    color: "#8a6a10",
    img: "teas/chamomile.webp?v=2",
    price: 499,
    brew: "85°C · 4 min · Best before bed",
    benefits: [
      {
        icon: "😴",
        title: "Relaxing Evening Tea",
        desc: "Chamomile is a time-honoured herb traditionally used to promote relaxation and restful sleep.",
      },
      {
        icon: "😌",
        title: "Calm & Gentle",
        desc: "A soothing, caffeine-free cup that helps you unwind without drowsiness during the day.",
      },
      {
        icon: "🫀",
        title: "Heart-Friendly",
        desc: "Chamomile contains antioxidants that may support cardiovascular wellness as part of a balanced diet.",
      },
      {
        icon: "🍽️",
        title: "Digestive Comfort",
        desc: "Traditionally used to soothe stomach discomfort and aid digestion after meals.",
      },
      {
        icon: "🧴",
        title: "Gentle on the Body",
        desc: "Chamomile's anti-inflammatory properties have been valued for centuries for skin and body comfort.",
      },
    ],
  },
  {
    name: "Whiskey Green Tea",
    short: "Smoky, bold and grown-up. For whiskey nights, without the whiskey.",
    tags: ["NON-ALC", "BOLD"],
    bg: "#e0d4c8",
    color: "#5a4030",
    img: "teas/whiskey.webp?v=2",
    price: 499,
    brew: "90°C · 3 min · Bold, best enjoyed slowly",
    benefits: [
      {
        icon: "🥃",
        title: "Zero Alcohol",
        desc: "All the bold, smoky warmth of aged whiskey — crafted entirely from natural botanicals.",
      },
      {
        icon: "💚",
        title: "Green Tea Antioxidants",
        desc: "Assam green tea delivers EGCG catechins, a natural antioxidant found in all green teas.",
      },
      {
        icon: "🔥",
        title: "Metabolism Support",
        desc: "Green tea catechins may help support healthy metabolic function as part of an active lifestyle.",
      },
      {
        icon: "🧠",
        title: "Calm Focus",
        desc: "L-theanine and caffeine together provide steady, composed energy without jitters.",
      },
      {
        icon: "🌿",
        title: "All Natural",
        desc: "Bold depth comes from a precise blend of natural woody botanicals — no artificial smoke.",
      },
    ],
  },
  {
    name: "GABA Oolong Tea",
    short: "Calm without the fog. The cup we keep close on the busy days.",
    tags: ["RELAXATION", "FOCUS"],
    bg: "#c0e0dc",
    color: "#1b7a82",
    img: "teas/gaba.webp?v=2",
    price: 499,
    brew: "85°C · 3 min · Nitrogen-anaerobic processed",
    benefits: [
      {
        icon: "🧘",
        title: "Calm & Relaxed",
        desc: "GABA is a naturally occurring neurotransmitter associated with relaxation and calm.",
      },
      {
        icon: "🧠",
        title: "Clear Mind",
        desc: "A balanced cup that supports a calm, focused state without overstimulation.",
      },
      {
        icon: "😴",
        title: "Evening Wind-Down",
        desc: "A naturally mellow tea perfect for transitioning into a restful evening.",
      },
      {
        icon: "💪",
        title: "Post-Workout Recovery",
        desc: "A soothing cup to enjoy after exercise as part of a balanced recovery routine.",
      },
      {
        icon: "❤️",
        title: "Heart Wellness",
        desc: "GABA oolong is traditionally enjoyed as part of a heart-healthy lifestyle.",
      },
    ],
  },
  {
    name: "Organic Green Tea",
    short:
      "Where it all began. Pure whole-leaf Assam green from our single garden in Golaghat.",
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
        desc: "Certified organic by the Participatory Guarantee System of India — grown without synthetic pesticides or chemicals.",
      },
      {
        icon: "⚡",
        title: "Gentle, Steady Energy",
        desc: "Natural caffeine paired with L-theanine provides a calm, focused lift without jitters.",
      },
      {
        icon: "🛡️",
        title: "Antioxidant-Rich",
        desc: "EGCG catechins are natural antioxidants that help protect cells from oxidative stress.",
      },
      {
        icon: "🏃",
        title: "Active Lifestyle Support",
        desc: "Green tea is a popular choice for those pursuing an active, health-conscious lifestyle.",
      },
      {
        icon: "🧬",
        title: "Long-Term Wellness",
        desc: "Rich in polyphenols that may support healthy ageing and cognitive function over time.",
      },
    ],
  },
  {
    name: "Ginger Green Tea",
    short:
      "Warming ginger blended with single-origin whole leaf green tea. Soothing, spicy, and perfect for immune support.",
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
        title: "Immune Support",
        desc: "Ginger has been used for centuries as a warming herb to support the body's natural defences.",
      },
      {
        icon: "🔥",
        title: "Warming & Comforting",
        desc: "A naturally warming cup that soothes the throat and comforts the body.",
      },
      {
        icon: "😌",
        title: "Digestive Comfort",
        desc: "Ginger is traditionally used to ease nausea, motion sickness, and digestive discomfort.",
      },
      {
        icon: "💪",
        title: "Anti-Inflammatory",
        desc: "Ginger contains compounds that may help reduce inflammation and ease muscle soreness.",
      },
      {
        icon: "🩺",
        title: "Metabolic Wellness",
        desc: "Ginger is traditionally used to support healthy blood sugar levels and vascular function.",
      },
    ],
  },
];
function TagChip({ label: e, color: t }) {
  return React.createElement(
    "span",
    {
      style: {
        fontFamily: "'Inter'",
        fontSize: 16,
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
function TeaCard({ tea: e, onView: t, onImageClick: a, index: n = 0 }) {
  const { isMobile: mobile } = useViewport();
  const isFeatured = (n === 0 || n === 5 || n === 9) && !mobile;
  const isMidHorizontal = (n === 3) && !mobile;
  const [o, i] = useState(!1),
    [r, l] = useState(!1),
    [s, c] = useState({ x: 0, y: 0 }),
    [d, m] = useState(!1),
    [p, g] = useInView(0.1);
  const profiles = {
    "GABA Oolong Tea": {
      palate: "Malty, Wild Honey, Baked Stone Fruit",
      brew: "85°C · 3 Mins · Up to 3 Infusions",
      badge: "Signature Reserve"
    },
    "Lemongrass Green Tea": {
      palate: "Crisp Citrus, Grassy, Mild Sweetness",
      brew: "90°C · 2–3 Mins · Can steep twice",
      badge: "Popular"
    },
    "Spearmint Green Tea": {
      palate: "Refreshing Mint, Brisk Green, Clean Finish",
      brew: "85°C · 2 Mins · Light and refreshing",
      badge: "Cooling Mint"
    },
    "Rum Green Tea": {
      palate: "Warm Spiced Rum, Sugarcane, Oak wood",
      brew: "90°C · 3 Mins · Excellent hot or iced",
      badge: "Exotic Infusion"
    },
    "Whiskey Green Tea": {
      palate: "Oaky Smoke, Malt, Subtle Sweetness",
      brew: "90°C · 3 Mins · Bold, best enjoyed slowly",
      badge: "Bold Reserve"
    },
    "Blue Flower Green Tea": {
      palate: "Cobalt Blue, Mild Floral, Earthy sweetness",
      brew: "85°C · 2–3 Mins · No milk needed",
      badge: "Color Magic"
    },
    "Tulsi Green Tea": {
      palate: "Spicy Tulsi, Herbaceous, Bready warmth",
      brew: "90°C · 3–4 Mins · Best plain or with honey",
      badge: "Ayurvedic Tradition"
    },
    "Chamomile Green Tea": {
      palate: "Soothing Chamomile, Honeyed Apples, Floral",
      brew: "85°C · 4 Mins · Best before bed",
      badge: "Stress Relief"
    },
    "Organic Green Tea": {
      palate: "Pure Vegetal, Umami, Clean Grassy notes",
      brew: "80°C · 2 Mins · Never boiling water",
      badge: "Estate Classic"
    },
    "Ginger Green Tea": {
      palate: "Spicy Ginger, Honeyed Warmth, Brisk Green",
      brew: "85°C · 2–3 Mins · Best warm",
      badge: "Warming Wellness"
    }
  };
  const prof = profiles[e.name] || {
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
      id: teaSlug(e.name),
      ref: p,
      className: "card-hover-lift",
      onMouseEnter: () => i(!0),
      onMouseLeave: () => {
        (i(!1), c({ x: 0, y: 0 }), m(!1));
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
        background: T.white,
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: o
          ? "0 20px 60px rgba(27,122,130,0.2), 0 4px 16px rgba(0,0,0,0.08)"
          : "0 2px 12px rgba(0,0,0,0.06)",
        transform: o
          ? `perspective(900px) rotateX(${s.y}deg) rotateY(${s.x}deg) translateY(-6px) scale(1.01)`
          : r
            ? "perspective(900px) scale(0.97)"
            : "perspective(900px) rotateX(0) rotateY(0) translateY(0) scale(1)",
        transition: o
          ? "box-shadow 250ms ease, transform 120ms ease"
          : "box-shadow 350ms ease, transform 350ms ease, opacity 0.6s ease-out, translate 0.6s ease-out",
        cursor: "pointer",
        opacity: g ? 1 : 0,
        translate: g ? "0 0" : "0 32px",
        transitionDelay: 0.07 * n + "s",
        gridColumn: (isFeatured || isMidHorizontal) ? "1 / -1" : "auto",
        display: (isFeatured || isMidHorizontal) ? "grid" : "block",
        gridTemplateColumns: isFeatured ? "1.2fr 0.8fr" : isMidHorizontal ? "0.8fr 1.2fr" : "none",
      },
    },
    React.createElement(
      "div",
      {
        style: {
          background: e.bg,
          height: (isFeatured || isMidHorizontal) ? "100%" : 200,
          minHeight: (isFeatured || isMidHorizontal) ? 340 : 200,
          overflow: "hidden",
          position: "relative",
          cursor: "zoom-in",
          order: isMidHorizontal ? 2 : 1,
        },
        onClick: (t) => {
          (t.stopPropagation(), a && a(e.img, e.name));
        },
      },
      e.img
        ? React.createElement("img", {
            src: e.img,
            alt: `${e.name} - Nevisan whole leaf tea from Golaghat Assam`,
            loading: "lazy",
            width: "400",
            height: "400",
            style: {
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: o ? "scale(1.07)" : "scale(1)",
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
            React.createElement(
              "span",
              { style: { fontSize: 48, opacity: 0.7 } },
              "🍃",
            ),
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
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: "0.08em",
              padding: "4px 10px",
              borderRadius: 9999,
              boxShadow: "0 2px 8px rgba(201,168,76,0.4)",
            },
          },
          "★ BESTSELLER",
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
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: "0.08em",
              padding: "4px 10px",
              borderRadius: 9999,
            },
          },
          "✓ ",
          e.badge,
        ),
    ),
    React.createElement(
      "div",
      {
        style: {
          padding: (isFeatured || isMidHorizontal) ? (mobile ? "20px" : "36px 40px") : "20px 20px 20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
          order: isMidHorizontal ? 1 : 2,
        }
      },
      React.createElement(
        "span",
        {
          style: {
            fontFamily: "'Inter'",
            fontSize: 16,
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
            fontFamily: "'Inter'",
            fontSize: 16,
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
          { style: { display: "flex", fontSize: 16, lineHeight: 1.4 } },
          React.createElement("span", { style: { fontWeight: 600, width: 80, color: T.teal, flexShrink: 0 } }, "Palate:"),
          React.createElement("span", { style: { color: T.textMuted } }, prof.palate)
        ),
        React.createElement(
          "div",
          { style: { display: "flex", fontSize: 16, lineHeight: 1.4 } },
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
                    fontFamily: "'Inter'",
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
                    fontFamily: "'Inter'",
                    fontSize: 16,
                    color: T.textMuted,
                  },
                },
                "· 50 gm",
              ),
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
                fontSize: 16,
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "'Inter'",
                letterSpacing: "0.04em",
                transition: "background 200ms",
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
              style: {
                width: "100%",
                background: T.teal,
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "11px",
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Inter'",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                transition: "filter 200ms",
              },
              onMouseEnter: (e) =>
                (e.currentTarget.style.filter = "brightness(1.1)"),
              onMouseLeave: (e) => (e.currentTarget.style.filter = "none"),
            },
            "Buy Now ↑",
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
                    fontFamily: "'Inter'",
                    fontSize: 16,
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
                          fontFamily: "'Inter'",
                          fontSize: 16,
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
                          fontFamily: "'Inter'",
                          fontSize: 16,
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
      id: "collection",
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
                fontFamily: "'Inter'",
                fontSize: 16,
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
              fontFamily: "'Inter'",
              fontSize: 16,
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
          { label: "All Teas", value: "ALL" },
          { label: "Green Teas", value: "GREEN" },
          { label: "Wellness", value: "WELLNESS" },
          { label: "Specialty Blends", value: "SPECIALTY" }
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
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Inter'",
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
          style: { display: "grid", gridTemplateColumns: r, gap: o ? 16 : 32 },
        },
        TEAS.filter(tea => {
          if (activeFilter === "ALL") return true;
          if (activeFilter === "GREEN") return tea.name !== "GABA Oolong Tea";
          if (activeFilter === "WELLNESS") {
            return ["Lemongrass Green Tea", "Blue Flower Green Tea", "Spearmint Green Tea", "Tulsi Green Tea", "Chamomile Green Tea", "Ginger Green Tea", "Organic Green Tea"].includes(tea.name);
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
              background: o ? "transparent" : "rgba(15,63,69,0.75)",
              zIndex: 200,
              display: "flex",
              alignItems: o ? "flex-end" : "center",
              justifyContent: "center",
              padding: o ? 0 : 24,
              backdropFilter: o ? "none" : "blur(4px)",
              pointerEvents: "none",
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
                          background: e.bg,
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
                              objectFit: "cover",
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
                              fontFamily: "'Inter'",
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
                              fontFamily: "'Inter'",
                              fontSize: 16,
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
                              fontSize: 16,
                              fontWeight: 700,
                              padding: "3px 9px",
                              borderRadius: 9999,
                            },
                          },
                          "★ BESTSELLER",
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
                          fontSize: 16,
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
                          fontSize: 16,
                          fontWeight: 600,
                          cursor: "pointer",
                          fontFamily: "'Inter'",
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
                            fontSize: 16,
                            fontWeight: 600,
                            cursor: "pointer",
                            fontFamily: "'Inter'",
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
                            fontSize: 16,
                            fontWeight: 600,
                            cursor: "pointer",
                            fontFamily: "'Inter'",
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
                          fontFamily: "'Inter'",
                          fontSize: 16,
                          color: T.textMuted,
                          lineHeight: 1.6,
                          marginBottom: 12,
                        },
                      },
                      e.short,
                    ),
                    e.benefits &&
                      React.createElement(
                        "div",
                        { style: { marginBottom: 16 } },
                        React.createElement(
                          "div",
                          {
                            style: {
                              fontFamily: "'Inter'",
                              fontSize: 16,
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
                                  fontSize: 16,
                                  lineHeight: 1,
                                  flexShrink: 0,
                                  marginTop: 1,
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
                                    fontFamily: "'Inter'",
                                    fontSize: 16,
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
                                    fontFamily: "'Inter'",
                                    fontSize: 16,
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
                                fontFamily: "'Inter'",
                                fontSize: 16,
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
                                fontFamily: "'Inter'",
                                fontSize: 16,
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
                        background: e.bg,
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
                            objectFit: "cover",
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
                            fontSize: 16,
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            padding: "4px 10px",
                            borderRadius: 9999,
                          },
                        },
                        "★ BESTSELLER",
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
                            fontFamily: "'Inter'",
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
                            fontFamily: "'Inter'",
                            fontSize: 16,
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
                          fontFamily: "'Inter'",
                          fontSize: 16,
                          color: T.textMuted,
                          lineHeight: 1.6,
                          marginBottom: 12,
                        },
                      },
                      e.short,
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
                          onClick: () => openWhatsApp(e.name),
                          style: {
                            width: "100%",
                            background: "#25D366",
                            color: "#fff",
                            border: "none",
                            borderRadius: 9999,
                            padding: "13px",
                            fontSize: 16,
                            fontWeight: 600,
                            cursor: "pointer",
                            fontFamily: "'Inter'",
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
                              fontSize: 16,
                              fontWeight: 600,
                              cursor: "pointer",
                              fontFamily: "'Inter'",
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
                              fontSize: 16,
                              fontWeight: 600,
                              cursor: "pointer",
                              fontFamily: "'Inter'",
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
                              fontFamily: "'Inter'",
                              fontSize: 16,
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
                                    fontSize: 18,
                                    lineHeight: 1,
                                    flexShrink: 0,
                                    marginTop: 1,
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
                                      fontFamily: "'Inter'",
                                      fontSize: 16,
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
                                      fontFamily: "'Inter'",
                                      fontSize: 16,
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
                                fontFamily: "'Inter'",
                                fontSize: 16,
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
                                fontFamily: "'Inter'",
                                fontSize: 16,
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
function PhilosophySection() {
  const e = useGsapReveal(),
    [t, a] = useInView(0.15),
    n = [
      {
        icon: React.createElement(
          "svg",
          {
            width: "20",
            height: "20",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "1.8",
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },
          React.createElement("path", {
            d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
          }),
          React.createElement("path", { d: "M3 3v5h5" }),
          React.createElement("path", { d: "M12 7v5l4 2" }),
        ),
        title: "Can be steeped twice",
        desc: "Whole leaf quality means the second steep is as rewarding as the first. Better value, richer taste.",
      },
      {
        icon: React.createElement(
          "svg",
          {
            width: "20",
            height: "20",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "1.8",
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },
          React.createElement("path", {
            d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
          }),
          React.createElement("path", { d: "m9 12 2 2 4-4" }),
        ),
        title: "Chemical-free, always",
        desc: "Pesticide-free from soil to seal. PGS-India organic certified. No exceptions.",
      },
      {
        icon: React.createElement(
          "svg",
          {
            width: "20",
            height: "20",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "1.8",
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },
          React.createElement("path", {
            d: "M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z",
          }),
          React.createElement("circle", { cx: "12", cy: "10", r: "3" }),
        ),
        title: "Single origin, Golaghat",
        desc: "Every variety from one region. Consistent quality. Traceable from garden to pack.",
      },
      {
        icon: React.createElement(
          "svg",
          {
            width: "20",
            height: "20",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "1.8",
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },
          React.createElement("path", {
            d: "M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0",
          }),
          React.createElement("path", {
            d: "M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2",
          }),
          React.createElement("path", {
            d: "M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8",
          }),
          React.createElement("path", {
            d: "M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15",
          }),
        ),
        title: "Handcrafted, not manufactured",
        desc: "Each batch made by Tailor Made Tea of Golaghat. Small batch, intentional process.",
      },
    ],
    { isMobile: o } = useViewport();
  return React.createElement(
    "div",
    {
      style: {
        background: T.teal,
        padding: o ? "64px 20px" : "100px 32px",
        position: "relative",
        overflow: "hidden",
      },
    },
    React.createElement("div", {
      style: {
        position: "absolute",
        top: "10%",
        left: "-5%",
        width: 400,
        height: 400,
        borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.08)",
        pointerEvents: "none",
      },
    }),
    React.createElement("div", {
      style: {
        position: "absolute",
        bottom: "-10%",
        right: "20%",
        width: 280,
        height: 280,
        borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.06)",
        pointerEvents: "none",
      },
    }),
    React.createElement("div", {
      style: {
        position: "absolute",
        top: "50%",
        right: "-5%",
        width: 320,
        height: 320,
        borderRadius: "50%",
        border: "1px solid rgba(201,168,76,0.08)",
        pointerEvents: "none",
      },
    }),
    React.createElement(
      "div",
      {
        style: {
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: o ? "1fr" : "1fr 1fr",
          gap: o ? 48 : 80,
          alignItems: "start",
        },
      },
      React.createElement(
        "div",
        { ref: e },
        React.createElement(
          "div",
          {
            "data-gsap-reveal": !0,
            style: {
              fontFamily: "'Inter'",
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: "0.16em",
              color: T.gold,
              textTransform: "uppercase",
              marginBottom: 20,
            },
          },
          "Our Philosophy",
        ),
        React.createElement(
          "h2",
          {
            "data-gsap-reveal": !0,
            style: {
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 400,
              fontSize: "clamp(36px, 4vw, 56px)",
              color: T.white,
              lineHeight: 1.15,
              marginBottom: 28,
            },
          },
          "You deserve to taste",
          React.createElement("br", null),
          "what Assam really grows",
        ),
        React.createElement(
          "p",
          {
            "data-gsap-reveal": !0,
            style: {
              fontFamily: "'Inter'",
              fontSize: 16,
              color: "rgba(255,255,255,0.72)",
              lineHeight: 1.75,
              marginBottom: 20,
            },
          },
          "Most people in India have drunk Assam tea their whole lives — and most of it has been broken leaves, dust, and blends made for volume, not flavour. We grew up here. We knew what the actual leaf tasted like. And we couldn't unsee the gap.",
        ),
        React.createElement(
          "p",
          {
            "data-gsap-reveal": !0,
            style: {
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              fontSize: 16,
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.65,
              marginBottom: 32,
            },
          },
          '"Every pack of Nevisan holds the same leaf that wealthy buyers in Japan and Europe have been paying a premium for. We just think you deserved to have it too."',
        ),
        React.createElement(
          "div",
          { style: { display: "flex", gap: 10, flexWrap: "wrap" } },
          [
            "PGS-INDIA ORGANIC",
            "FSSAI LICENSED",
            "FOOD SAFETY, ASSAM",
            "MADE IN INDIA",
          ].map((e) =>
            React.createElement(
              "span",
              {
                key: e,
                style: {
                  fontFamily: "'Inter'",
                  fontSize: 16,
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  color: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  borderRadius: 9999,
                  padding: "5px 12px",
                },
              },
              e,
            ),
          ),
        ),
      ),
      React.createElement(
        "div",
        {
          ref: t,
          style: { display: "flex", flexDirection: "column", gap: 16 },
        },
        n.map((e, t) =>
          React.createElement(
            "div",
            {
              key: e.title,
              style: {
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 14,
                padding: "24px 28px",
                display: "flex",
                gap: 20,
                alignItems: "flex-start",
                opacity: a ? 1 : 0,
                transform: a ? "translateX(0)" : "translateX(32px)",
                transition: `opacity 0.6s ease-out ${0.12 * t}s, transform 0.6s ease-out ${0.12 * t}s`,
                cursor: "default",
              },
              onMouseEnter: (e) => {
                ((e.currentTarget.style.background = "rgba(255,255,255,0.11)"),
                  (e.currentTarget.style.borderColor = "rgba(201,168,76,0.3)"));
              },
              onMouseLeave: (e) => {
                ((e.currentTarget.style.background = "rgba(255,255,255,0.07)"),
                  (e.currentTarget.style.borderColor =
                    "rgba(255,255,255,0.12)"));
              },
            },
            React.createElement(
              "div",
              {
                style: {
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "rgba(201,168,76,0.2)",
                  border: "1px solid rgba(201,168,76,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  color: T.gold,
                  fontSize: 16,
                  transition: "background 200ms",
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
                    fontSize: 17,
                    fontWeight: 400,
                    color: T.gold,
                    marginBottom: 6,
                  },
                },
                e.title,
              ),
              React.createElement(
                "div",
                {
                  style: {
                    fontFamily: "'Inter'",
                    fontSize: 16,
                    color: "rgba(255,255,255,0.65)",
                    lineHeight: 1.6,
                  },
                },
                e.desc,
              ),
            ),
          ),
        ),
      ),
    ),
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
            fontSize: 16,
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
          fontFamily: "'Inter'",
          fontSize: 16,
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
          fontSize: 16,
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "'Inter'",
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
              fontFamily: "'Inter'",
              fontSize: 16,
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
            fontFamily: "'Inter'",
            fontSize: 16,
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
            "span",
            { key: t, style: { color: T.gold, fontSize: 14 } },
            "★",
          ),
        ),
    ),
    React.createElement(
      "div",
      {
        style: {
          fontFamily: "'Playfair Display', Georgia, serif",
          fontStyle: "italic",
          fontSize: 16,
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
          fontFamily: "'Inter'",
          fontSize: 16,
          fontWeight: 600,
          color: T.teal,
        },
      },
      e.name,
    ),
    React.createElement(
      "div",
      { style: { fontFamily: "'Inter'", fontSize: 16, color: T.textMuted } },
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
      fontFamily: "'Inter'",
      fontSize: 16,
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
              fontFamily: "'Inter'",
              fontSize: 16,
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
              fontFamily: "'Inter'",
              fontSize: 16,
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
              fontFamily: "'Inter'",
              fontSize: 16,
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
                fontFamily: "'Inter'",
                fontSize: 16,
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
                  fontFamily: "'Inter'",
                  fontSize: 16,
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
                  fontFamily: "'Inter'",
                  fontSize: 16,
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
                fontFamily: "'Inter'",
                fontSize: 16,
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
                fontFamily: "'Inter'",
                fontSize: 16,
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
                fontFamily: "'Inter'",
                fontSize: 16,
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
              fontFamily: "'Inter'",
              fontSize: 16,
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
              fontFamily: "'Inter'",
              fontSize: 16,
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
                fontFamily: "'Inter'",
                fontSize: 16,
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
            style: { fontFamily: "'Inter'", fontSize: 16, color: T.textMuted },
          },
          "Sincere words from our community of tea drinkers. Direct and unedited reviews.",
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
            text: "I\u2019ve tried many green teas, but this one really stands out. The aroma is fresh, and the taste is smooth without any bitterness. You can actually feel the natural flavor of the tea leaves, and it\u2019s perfect for both morning energy and evening relaxation. The best part \u2014 it can be steeped twice and still tastes great! Definitely worth the price.",
            name: "Uditijain",
            loc: "Verified Amazon Purchase \u2022 Flavor: Whiskey",
            rating: 5,
          },
          {
            text: "Awesome flavour.. it really do taste like rum.. all natural flavour.. no added sweeteners.. best product.. will surely will purchase more..",
            name: "Ridhi",
            loc: "Verified Amazon Purchase \u2022 Flavor: Exotic Rum",
            rating: 5,
          },
          {
            text: "Great taste, absolutely loved it! Can\u2019t wait to try all the delicious flavours and enjoy every single one of them soon!",
            name: "Chandraprakash Shyamsukha",
            loc: "Verified Amazon Purchase \u2022 Flavor: Lemongrass",
            rating: 5,
          },
          {
            text: "I'm very impressed with NEVISAN's Lemongrass Tea. It has a wonderfully fresh and zesty aroma right out of the package. The tea brews into a beautiful pale yellow and has a crisp, clean, and smooth citrus flavor. It's not bitter at all, just incredibly refreshing with a hint of natural sweetness. It's a fantastic, high-quality, caffeine-free tea. Highly recommended!",
            name: "Dinesh tiwari",
            loc: "Verified Amazon Purchase \u2022 Flavor: Lemongrass",
            rating: 5,
          },
          {
            text: "Tried different flavours...really enjoyed it\nHighly recommend buying the blue flower and lemongrass flavour.\nAssam tea at its best..great work team",
            name: "Amazon Customer",
            loc: "Verified Amazon Purchase \u2022 Flavor: Blue Flower",
            rating: 5,
          },
          {
            text: "Best green tea so far ...in spearmint flavour...From Nevisan",
            name: "Richa Jain",
            loc: "Verified Buyer \u2022 Flavor: Spearmint",
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
                  fontFamily: "'Inter'",
                  fontSize: 16,
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
      role: "contentinfo",
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
                fontFamily: "'Inter'",
                fontSize: 16,
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
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Inter'",
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
                  fontFamily: "'Inter'",
                  fontSize: 16,
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
                  fontFamily: "'Inter'",
                  fontSize: 16,
                  color: "rgba(255,255,255,0.4)",
                  letterSpacing: "0.06em",
                },
              },
              "GSTIN 18AFAPJ8203P1Z7",
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
                fontFamily: "'Inter'",
                fontSize: 16,
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
                  fontFamily: "'Inter'",
                  fontSize: 16,
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
                fontFamily: "'Inter'",
                fontSize: 16,
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
                    ? (window.location.href = "/faq")
                    : "Quiz" === t
                      ? (window.location.href = "/quiz")
                      : e(t);
                },
                style: {
                  fontFamily: "'Inter'",
                  fontSize: 16,
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
                fontFamily: "'Inter'",
                fontSize: 16,
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
                  fontFamily: "'Inter'",
                  fontSize: 16,
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
              fontFamily: "'Inter'",
              fontSize: 16,
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
                  fontFamily: "'Inter'",
                  fontSize: 16,
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
          href: "/quiz",
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
                  fontFamily: "'Inter'",
                  fontSize: 16,
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
              fontFamily: "'Inter'",
              fontSize: 16,
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
                  fontFamily: "'Inter'",
                  fontSize: 16,
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
            "Ten varieties, one origin",
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
              fontSize: 16,
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "'Inter'",
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
              background: n ? "transparent" : "rgba(15,63,69,0.75)",
              zIndex: 200,
              display: "flex",
              alignItems: n ? "flex-end" : "center",
              justifyContent: "center",
              padding: n ? 0 : 24,
              backdropFilter: n ? "none" : "blur(4px)",
              pointerEvents: "none",
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
                          background: r.bg,
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
                              objectFit: "cover",
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
                              fontFamily: "'Inter'",
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
                              fontFamily: "'Inter'",
                              fontSize: 16,
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
                              fontSize: 16,
                              fontWeight: 700,
                              padding: "3px 9px",
                              borderRadius: 9999,
                            },
                          },
                          "★ BESTSELLER",
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
                          fontSize: 16,
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
                          fontSize: 16,
                          fontWeight: 600,
                          cursor: "pointer",
                          fontFamily: "'Inter'",
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
                            fontSize: 16,
                            fontWeight: 600,
                            cursor: "pointer",
                            fontFamily: "'Inter'",
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
                            fontSize: 16,
                            fontWeight: 600,
                            cursor: "pointer",
                            fontFamily: "'Inter'",
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
                          fontFamily: "'Inter'",
                          fontSize: 16,
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
                              fontFamily: "'Inter'",
                              fontSize: 16,
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
                                  fontSize: 16,
                                  lineHeight: 1,
                                  flexShrink: 0,
                                  marginTop: 1,
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
                                    fontFamily: "'Inter'",
                                    fontSize: 16,
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
                                    fontFamily: "'Inter'",
                                    fontSize: 16,
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
                                fontFamily: "'Inter'",
                                fontSize: 16,
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
                                fontFamily: "'Inter'",
                                fontSize: 16,
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
                        background: r.bg,
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
                            objectFit: "cover",
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
                            fontSize: 16,
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            padding: "4px 10px",
                            borderRadius: 9999,
                          },
                        },
                        "★ BESTSELLER",
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
                            fontFamily: "'Inter'",
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
                            fontFamily: "'Inter'",
                            fontSize: 16,
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
                          fontFamily: "'Inter'",
                          fontSize: 16,
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
                            fontSize: 16,
                            fontWeight: 600,
                            cursor: "pointer",
                            fontFamily: "'Inter'",
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
                              fontSize: 16,
                              fontWeight: 600,
                              cursor: "pointer",
                              fontFamily: "'Inter'",
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
                              fontSize: 16,
                              fontWeight: 600,
                              cursor: "pointer",
                              fontFamily: "'Inter'",
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
                              fontFamily: "'Inter'",
                              fontSize: 16,
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
                                  fontSize: 18,
                                  lineHeight: 1,
                                  flexShrink: 0,
                                  marginTop: 1,
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
                                    fontFamily: "'Inter'",
                                    fontSize: 16,
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
                                    fontFamily: "'Inter'",
                                    fontSize: 16,
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
                                fontFamily: "'Inter'",
                                fontSize: 16,
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
                                fontFamily: "'Inter'",
                                fontSize: 16,
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
                fontFamily: "'Inter'",
                fontSize: 16,
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
              fontFamily: "'Inter'",
              fontSize: 16,
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
            bg: "reel1.webp",
          },
          {
            url: "https://www.instagram.com/reel/DXvomNwRm32/",
            bg: "reel2.webp",
          },
          {
            url: "https://www.instagram.com/reel/DYRB_piR_vB/",
            bg: "reel3.webp",
          },
          {
            url: "https://www.instagram.com/reel/DYGw0YQxn40/",
            bg: "reel4.webp",
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
                    fontFamily: "'Inter'",
                    fontSize: 16,
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
                    fontFamily: "'Inter'",
                    fontSize: 16,
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
                    fontFamily: "'Inter'",
                    fontSize: 16,
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
                  fontFamily: "'Inter'",
                  fontSize: 16,
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
                gridTemplateColumns: "repeat(4, 1fr)",
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
                    fontSize: 16,
                    fontWeight: 600,
                    textTransform: "capitalize",
                    transition: "background-color 200ms ease, color 200ms ease, border-color 200ms ease",
                    fontFamily: "'Inter'"
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
              { style: { display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 600 } },
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
              { style: { display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 600 } },
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
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: isBrewing ? "not-allowed" : "pointer",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  transition: "background-color 200ms ease, color 200ms ease, transform 160ms var(--ease-out)",
                  fontFamily: "'Inter'"
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
                fontFamily: "'Inter'",
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: "0.14em",
                color: T.teal,
                textTransform: "uppercase",
              },
            },
            "Got Questions?",
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
          "Frequently Asked Questions",
        ),
      ),
      React.createElement(
        "div",
        { style: { display: "flex", flexDirection: "column", gap: 12 } },
        [
          {
            q: "Do you deliver across India?",
            a: "Yes! We deliver pan-India via Amazon and Flipkart. You can also order directly on WhatsApp for personal assistance.",
          },
          {
            q: "How long does delivery take?",
            a: "Amazon and Flipkart orders typically arrive in 3–5 business days. WhatsApp orders are dispatched within 24 hours.",
          },
          {
            q: "What is the shelf life of the tea?",
            a: "All Nevisan teas have a shelf life of 24 months from the date of manufacture when stored in a cool, dry place away from direct sunlight.",
          },
          {
            q: "Is your tea organic and chemical free?",
            a: "Yes. Every batch is PGS-India organic certified and grown without pesticides or chemicals. From soil to seal, we stand by that commitment.",
          },
          {
            q: "Can the tea be steeped more than once?",
            a: "Absolutely. Because we use 100% whole leaf tea, most of our varieties can be steeped twice — the second cup is just as rewarding.",
          },
          {
            q: "Do you offer bulk or wholesale orders?",
            a: "Yes! For bulk orders for hotels, cafes, offices or gifting, reach out to us directly on WhatsApp at +91 98642 45687.",
          },
          {
            q: "What is your return policy?",
            a: "As tea is a consumable product, all sales are final and non-returnable. However, if you receive a product that is near expiry, damaged, or incorrect, contact us on WhatsApp within 48 hours of delivery and we will replace it immediately.",
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
                    fontFamily: "'Inter'",
                    fontSize: 16,
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
                      fontFamily: "'Inter'",
                      fontSize: 16,
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
              fontFamily: "'Inter'",
              fontSize: 16,
              color: T.textMuted,
              marginBottom: 16,
            },
          },
          "Still have a question?",
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
              fontFamily: "'Inter'",
              fontSize: 16,
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
                fontFamily: "'Inter'",
                fontSize: 16,
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
function HomePage({ setPage: e }) {
  return React.createElement(
    "div",
    { style: { animation: "page-enter 0.4s ease both" } },
    React.createElement(Hero, { setPage: e }),
    React.createElement(Ticker, null),
    React.createElement(TrustBadges, null),
    React.createElement(CollectionSection, { setPage: e }),
    React.createElement(PhilosophySection, null),
    React.createElement(HowToBrewSection, null),
    React.createElement(WhereToBuy, null),
    React.createElement(Testimonials, null),
    React.createElement(InstagramReels, null),
    React.createElement(FAQSection, null),
    React.createElement(Footer, { setPage: e }),
  );
}
const PAGE_PHOTOS = {
  ourStory: "1.webp",
  about: "2.webp",
  collection: "3.webp",
  journal: "4.webp",
  wholesale: "5.webp",
  certifications: "6.webp",
  contact: "7.webp",
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
        marginTop: 68,
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
            fontFamily: "'Inter'",
            fontSize: 16,
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
              fontFamily: "'Inter'",
              fontSize: 16,
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
      title: "Where every leaf begins",
      subtitle:
        "We grew up next to the world's best tea gardens — and decided the rest of India should taste them too.",
    }),
    React.createElement(PhilosophySection, null),
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
                fontFamily: "'Inter'",
                fontSize: 16,
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
            "The Journey of the Perfect Leaf"
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
              title: "The Assam Sourcing (Golaghat)",
              desc: "Deep in the rolling hills of Golaghat, Assam, near the paths of the Brahmaputra River, grow our whole orthodox tea leaves. Sourced directly from our estate, every batch is handcrafted in small quantities to preserve the raw, whole-leaf character of single-origin Assam tea. We respect the soil, and in return, it gives us some of the boldest, most complex teas in the world.",
            },
            {
              num: "02",
              title: "The Antidote to 'Bitter Dust'",
              desc: "Most commercial green teas are made from leftover 'tea dust' swept from factory floors and packed into paper tea bags, resulting in a bitter, astringent cup. Nevisan is the antidote. We pack only whole, unbroken leaves that gently unfurl in hot water, releasing a naturally sweet, smooth flavor that can be steeped twice. No bitterness, just pure leaf.",
            },
            {
              num: "03",
              title: "The Alchemy of Flavor & Function",
              desc: "We believe wellness shouldn't taste boring. We take our clean orthodox tea and blend it with organic botanicals—like Spearmint to balance hormones, GABA Oolong to calm an overactive mind, and pure Chamomile to restore sleep. Then, we add a touch of gourmet sophistication—infusing our leaves with rich, warm, non-alcoholic notes of charred oak Whiskey and sugarcane Rum.",
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
                      fontFamily: "'Inter'",
                      fontSize: 16,
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
    title: "Why Whole Leaf Tea Tastes Different",
    slug: "why-whole-leaf-tea-tastes-different",
    date: "August 2025",
    tag: "CRAFT",
    excerpt:
      "Most commercial teas use broken leaves and dust — it brews fast but loses the complex flavour compounds locked in whole leaves.",
    body: [
      "Walk into any supermarket and pick up a tea bag. Tear it open. What you'll find is CTC — Cut, Tear, Curl — a method that reduces whole tea leaves into tiny granules optimised for speed and colour, not taste.",
      "Whole leaf tea is different in every way. The entire leaf is kept intact through processing, which means the essential oils, amino acids (especially L-theanine), and flavour compounds remain locked inside — releasing slowly and fully as the leaf unfurls in hot water.",
      "This is why Nevisan teas can be steeped two or three times. The first steep releases the brighter, more aromatic top notes. The second steep — after a minute of rest — brings out the deeper, more rounded body of the tea. By the third, you're getting the subtle, surprisingly sweet finish that tea drinkers in Japan and Taiwan have known about for centuries.",
      "When you buy whole leaf, you're not just buying tea. You're buying the full story of the leaf — from how it grew, to how it was processed, to what it becomes in your cup.",
    ],
  },
  {
    title: "The Science Behind GABA Tea",
    slug: "science-behind-gaba-tea",
    date: "September 2025",
    tag: "WELLNESS",
    excerpt:
      "GABA is your brain's natural calming signal. Here's how Nevisan's oolong leaves are processed to naturally amplify it.",
    body: [
      "GABA — gamma-aminobutyric acid — is the primary inhibitory neurotransmitter in your brain. In simple terms, it's the signal your nervous system sends to slow down, stop over-firing, and relax. Low GABA is associated with anxiety, poor sleep, and mental restlessness.",
      "Most teas contain very little GABA naturally. But when oolong tea leaves are exposed to nitrogen-rich, oxygen-free environments during processing (a technique developed in Japan in the 1980s), the leaves undergo a specific biochemical reaction that dramatically increases GABA content — often by 4 to 10 times.",
      "Nevisan's GABA Oolong is processed using this exact anaerobic method. The result is a tea that supports deep relaxation and mental clarity without sedation. Unlike chamomile (which promotes sleep), GABA tea allows you to be calm and focused simultaneously.",
      "Regular consumption has been studied for blood pressure reduction, improved sleep quality, and anxiety management — making it one of the most functionally potent teas in our collection.",
    ],
  },
  {
    title: "Golaghat: India's Hidden Tea Belt",
    slug: "golaghat-indias-hidden-tea-belt",
    date: "October 2025",
    tag: "ORIGIN",
    excerpt:
      "While Darjeeling gets the headlines, Golaghat in upper Assam quietly produces some of the boldest, most complex teas in the world.",
    body: [
      'Ask most people to name an Indian tea region and they\'ll say Darjeeling. The "Champagne of teas" has built an unmatched reputation over 150 years of marketing. But among tea professionals and serious drinkers, a different region commands deep respect: Golaghat, in upper Assam.',
      "Golaghat sits in the Brahmaputra valley, where the soil is a unique combination of red clay, alluvial deposits from the river, and centuries of decomposed organic matter. The humidity is extreme — averaging 80% year round — and the temperature swings between seasons create a plant under constant gentle stress, which forces it to develop complex defensive compounds that translate directly into flavour.",
      "Every Nevisan tea comes from a single garden in Golaghat. This matters because single-origin means traceability — you know exactly where your tea came from, who grew it, and how it was processed. There are no blends covering up lesser-quality leaves. What's in the pack is exactly what grew in that garden.",
      "This is the foundational commitment behind Nevisan: one origin, one standard, complete transparency.",
    ],
  },
  {
    title: "How to Get Three Steeps from One Serving",
    slug: "how-to-get-three-steeps",
    date: "November 2025",
    tag: "BREWING",
    excerpt:
      "Whole leaf teas open up with each steep. The first is bold, the second more rounded, the third surprisingly sweet.",
    body: [
      "One of the most common mistakes people make with whole leaf tea is throwing it away after the first steep. This is like eating only the crust of a sourdough loaf.",
      "Here's how to get the most from every serving of Nevisan tea:",
      'First Steep: Use water at the temperature specified on your tea (typically 80–90°C). Steep for 2–3 minutes. This releases the brightest, most aromatic compounds — the "top notes" of the tea. This is the boldest, most characteristic cup.',
      "Second Steep: Let the leaves rest for 60 seconds after draining. Add fresh water at the same temperature. Steep for 2–3 minutes. The body opens up further. You'll notice the cup is softer, more rounded — often more complex than the first.",
      "Third Steep: Rest again, then steep for 3–4 minutes. This is where the subtle sweetness lives. Many experienced drinkers consider this their favourite cup of the three.",
      "Pro tip: Don't squeeze or press the leaves — this releases bitterness. Let the water do the work.",
    ],
  },
  {
    title: "Rum Green Tea: How We Made It",
    slug: "rum-green-tea-how-we-made-it",
    date: "December 2025",
    tag: "CRAFT",
    excerpt:
      "No alcohol. No artificial flavour. Just 14 attempts and a precise cold-infusion technique using natural botanicals.",
    body: [
      "The idea came from a simple question: what if you could drink something that felt like a warm evening without the alcohol? Not a mocktail — those still require mixing and equipment. A tea. Something you could brew in a cup and that would genuinely evoke the character of aged rum.",
      "The challenge was that rum's complexity comes from barrel ageing — a process that creates hundreds of interacting chemical compounds over years. No single botanical can replicate that. So we built it from multiple elements: a warm Assam green base, naturally sweet botanicals for the caramel undertone, a specific herb for the warm etheric note, and a precise cold-infusion technique that allows the botanicals to integrate without the bitterness that heat extraction creates.",
      "Attempts 1 through 8 were too sweet. 9 and 10 were too sharp. 11 was close but lacked warmth. 12 tasted like dessert. 13 was almost right — but the finish wasn't there.",
      "Attempt 14 hit the balance. The first sip is warming and slightly sweet. The mid-palate opens up with the herbal depth. The finish is clean with a slight spice. We've made no changes since.",
    ],
  },
  {
    title: "Morning vs Evening Teas: A Simple Guide",
    slug: "morning-vs-evening-teas",
    date: "January 2026",
    tag: "WELLNESS",
    excerpt:
      "Lemongrass and Spearmint for mornings. Chamomile and GABA for evenings. Here's why each tea works best at certain times.",
    body: [
      "Not all teas are equal at all hours. The compounds in each variety interact differently with your body depending on where you are in your daily rhythm. Here's how to match your Nevisan tea to your time of day:",
      "Morning (6am – 12pm): Organic Green Tea or Lemongrass Green Tea. Both deliver clean caffeine combined with L-theanine — a calm, sustained alertness without the jittery edge of coffee. Lemongrass adds a bright, citrusy note that's refreshing after overnight fasting. Spearmint works well mid-morning for a cooling, minty pick-me-up.",
      "Afternoon (12pm – 5pm): Rum or Whiskey Green Tea. The bold character suits the afternoon energy dip, while the green tea base maintains mental alertness. Blue Flower is also excellent here — it's visually striking and mildly calming without making you sleepy.",
      "Evening (5pm – bedtime): Chamomile or GABA Oolong. Chamomile for those who want a gentle, floral cup to wind down. GABA Oolong for those who want to relax while staying mentally present — ideal for creative work or quiet reading.",
      "Tulsi works at any hour — its warm, herbaceous character makes it a versatile choice whether you need a gentle start to the day or a calming cup in the evening.",
    ],
  },
  {
    title:
      "Blue Butterfly Pea Flower Tea: What Makes It Turn Purple and Why It's Worth Drinking",
    slug: "blue-butterfly-pea-flower-tea",
    date: "February 2026",
    tag: "WELLNESS",
    excerpt:
      "Blue butterfly pea flower tea gets its colour from anthocyanins — natural pigments that give the tea its vivid blue hue and make it a visually striking addition to any cup.",
    body: [
      "Blue butterfly pea flower tea is made from the dried petals of Clitoria ternatea, a plant native to Southeast Asia and parts of India. The flowers produce a vivid cobalt-blue infusion unlike anything else in the plant world. When blended with green tea, as in Nevisan's Blue Flower Green, the result is a cup that's visually striking and nutritionally interesting — not just a novelty drink for social media.",
      "The blue colour comes from anthocyanins, a class of flavonoid antioxidants also found in blueberries and red cabbage. These pigments are pH-sensitive, which is why adding lemon juice to blue butterfly pea tea shifts it from blue to violet to pink. The science behind the colour change is simple acid-base chemistry — the anthocyanins acting as natural indicators responding to the acidity of the liquid.",
      "The anthocyanins in butterfly pea flower are the same class of pigments found in blueberries and red cabbage. These natural compounds give the tea its vivid colour and are part of what makes it nutritionally interesting. The flower also contains proanthocyanidins, which contribute to its antioxidant profile. Compared to many common herbal teas, butterfly pea flower offers a distinctive combination of visual appeal and natural compounds.",
      "When blue butterfly pea is paired with a light green tea base, you get the grassy, umami notes of green tea alongside the subtly earthy, almost woody flavour of the flower. The caffeine level stays moderate, making it suitable in the afternoon. Look for blends where the green tea is whole-leaf and the flower petals are actually visible — not ground into the blend and hiding in a bag.",
    ],
  },
  {
    title:
      "Spearmint Tea: A Refreshing Mint Infusion with a Rich History",
    slug: "spearmint-tea-refreshing-mint",
    date: "March 2026",
    tag: "WELLNESS",
    excerpt:
      "Spearmint tea is a bright, cooling mint infusion with a long history of use across cultures. Here's what makes it a distinctive and enjoyable cup.",
    body: [
      "Spearmint tea is one of the more popular herbal infusions worldwide, valued for its bright, cooling character and clean, refreshing finish. Unlike peppermint, spearmint is milder and sweeter, with lower menthol content that makes it gentler on the palate. When blended with green tea, as in Nevisan's Spearmint Green, the result is a cup that's both uplifting and smooth — the mint brightness balanced by the grassy depth of whole-leaf Assam green tea.",
      "Spearmint has been used for centuries across different cultures for its distinctive flavour and aromatic qualities. The essential oils in spearmint leaves, particularly carvone, give the tea its characteristic minty aroma and cooling sensation. These volatile compounds are best preserved in whole-leaf blends, where the leaves are cut rather than ground — allowing the oils to release gradually during steeping.",
      "Spearmint is different from peppermint — it's milder, sweeter, and lower in menthol. When blended with green tea, as in Nevisan's Spearmint Green, the result is a bright, cooling cup with a clean finish. The green tea adds antioxidants and L-theanine, making the combination genuinely refreshing rather than just pleasant.",
      "If you're exploring spearmint tea, consistency matters more than quantity. Two cups a day for several weeks is a good way to develop an appreciation for its flavour profile. Whole-leaf spearmint blended with real green tea is worth seeking out over fannings-based bags, where the volatile oils that carry most of spearmint's character have largely dissipated.",
      "Spearmint is different from peppermint — it's milder, sweeter, and lower in menthol. When blended with green tea, as in Nevisan's Spearmint Green, the result is a bright, cooling cup with a clean finish. The green tea adds antioxidants and L-theanine, making the combination genuinely useful rather than just pleasant.",
      "If you're exploring spearmint tea for hormonal reasons, consistency matters more than quantity. Two cups a day for several weeks is what the research used — not a single strong brew once in a while. Whole-leaf spearmint blended with real green tea is worth seeking out over fannings-based bags, where the volatile oils that carry most of spearmint's active compounds have largely dissipated.",
    ],
  },
  {
    title: "Tulsi Green Tea: A Warming Ayurvedic Blend with Single-Origin Assam Tea",
    slug: "tulsi-green-tea-ayurvedic-blend",
    date: "April 2026",
    tag: "WELLNESS",
    excerpt:
      "Tulsi, or holy basil, has a long history in Indian tradition — blended with Assam green tea, it creates a warming, herbaceous cup with a distinctive clove-like aroma.",
    body: [
      "Tulsi, known botanically as Ocimum tenuiflorum and commonly called holy basil, is one of the most revered plants in Indian tradition. It has been used in Ayurvedic practice for centuries, valued for its distinctive flavour and aromatic qualities. The plant contains eugenol, ursolic acid, and rosmarinic acid — compounds that contribute to its characteristic clove-like, slightly peppery aroma and warm, herbaceous taste.",
      "When tulsi is blended with green tea, the pairing is unusually well-suited. Green tea brings antioxidants, mild caffeine, and L-theanine. Tulsi adds its own set of natural compounds, along with a distinct clove-like, slightly peppery aroma. The flavour combination is warming without being heavy, and the herbaceous character of tulsi complements the calm focus that L-theanine supports.",
      "Nevisan's Tulsi Green uses whole holy basil leaves alongside Assam green tea, keeping the ratio balanced so neither ingredient overwhelms the other. The result is a cup that's both grounding and refreshing — the kind of tea that works well whether you're starting your morning or taking a quiet break in the afternoon. Brew at around 90°C for three to four minutes to get the full flavour from both ingredients.",
      "For anyone looking to reduce daily stimulant load while still supporting focus, tulsi green tea is a useful starting point. It has enough caffeine to be functional in the morning without the cortisol spike of coffee. It's also one of the few blends where the Indian heritage of the herb is fully intact — tulsi grown in India, paired with tea grown in India, brewed simply at around 80°C for two to three minutes.",
    ],
  },
  {
    title:
      "Chamomile Green Tea: Why This Evening Blend Works Better Than Either Alone",
    slug: "chamomile-green-tea-evening-blend",
    date: "May 2026",
    tag: "WELLNESS",
    excerpt:
      "Chamomile and green tea together offer something neither delivers alone — the calming properties of chamomile with the antioxidant depth of whole-leaf green tea.",
    body: [
      "Chamomile is one of the most widely consumed herbal teas in the world, usually drunk on its own before bed. Green tea is usually positioned as a morning drink. Pairing them sounds counterintuitive, but the combination works because green tea brewed at lower temperatures and shorter times keeps caffeine low while retaining its antioxidant content. Blended with chamomile, it creates an evening cup that does not sacrifice nutritional value just to be caffeine-light.",
      "The active compound in chamomile most associated with its calming effects is apigenin, a flavonoid that contributes to the tea's naturally soothing character. Chamomile has been used for centuries as a gentle evening infusion, and its floral, slightly sweet flavour makes it one of the most widely consumed herbal teas in the world. It is a well-loved herb with a long history of use as a calming evening cup.",
      "Green tea brings EGCG, the primary catechin in green tea and one of the most researched antioxidants in the food supply. L-theanine promotes alpha-wave activity in the brain — relaxed alertness rather than sedation. In the evening, both chamomile and L-theanine point in the same direction: calm without grogginess.",
      "Nevisan's Chamomile Green uses whole chamomile flowers alongside Assam green tea leaves. The brew is best kept around 75 to 80°C and steeped for no more than two minutes — chamomile can turn bitter if over-steeped, and green tea gets astringent above 90°C. Done right, the cup is floral, slightly sweet, and genuinely useful as part of a wind-down routine.",
    ],
  },
  {
    title:
      "Green Tea vs Coffee: The Caffeine Difference Nobody Explains Properly",
    slug: "green-tea-vs-coffee-caffeine",
    date: "May 2026",
    tag: "WELLNESS",
    excerpt:
      "Green tea has less caffeine than coffee, but L-theanine changes how your body processes it entirely — and that difference matters more than the number.",
    body: [
      "A standard cup of coffee contains roughly 80 to 120mg of caffeine. A cup of green tea contains between 20 and 50mg depending on variety, steeping time, and water temperature. On paper, coffee wins if you need a strong stimulant hit. But the comparison stops being straightforward once you factor in what else is in each cup. Coffee delivers caffeine in relative isolation. Green tea delivers caffeine alongside L-theanine, an amino acid that changes the experience significantly.",
      "L-theanine promotes relaxed alertness by increasing alpha-wave activity in the brain and moderating the excitatory effects of caffeine. Many people describe green tea as producing focus without the edge — concentration that does not tip into anxiety or jitteriness. Studies pairing caffeine and L-theanine have found improved attention and accuracy on cognitive tasks compared to caffeine alone. This is consistent across multiple controlled trials.",
      "For people who experience cortisol spikes with coffee — the mid-morning crash, afternoon slump, difficulty sleeping — green tea often behaves differently. The slower caffeine curve means less of a spike and less of a subsequent dip. Brewing single-origin whole-leaf tea, like Nevisan's Organic Green, gives you more control over caffeine content than a standardised tea bag does — lower temperature and shorter steeping time both reduce it further.",
      "The other variable people overlook is added sugar and milk. Most coffee consumption in India involves significant sugar and milk, which independently contributes to energy spikes and crashes. Green tea is most often drunk plain, which removes that variable. If the goal is sustained, clean energy without a 3pm crash, switching from coffee to a high-quality whole-leaf green tea is one of the most practical single changes you can make to a daily routine.",
    ],
  },
  {
    title:
      "How to Buy Real Green Tea in India: What to Look For and What to Avoid",
    slug: "how-to-buy-real-green-tea-india",
    date: "May 2026",
    tag: "CRAFT",
    excerpt:
      "Most green tea sold in India is low-grade CTC or artificially flavoured — here is how to tell the difference before you buy.",
    body: [
      'The Indian packaged tea market is dominated by CTC — Cut, Tear, Curl — a processing method designed for strong, fast-brewing chai. Some companies sell what they label as "green tea" using CTC-processed leaves that have been lightly dried rather than fully oxidised. The result looks like green tea on packaging, but the flavour, antioxidant content, and brewing behaviour are all different. If your green tea brews dark and bitter in under a minute, it is almost certainly CTC.',
      "Whole-leaf green tea should look like leaves, not uniform pellets or dust. When you open a packet of genuine whole-leaf tea, you should be able to identify the leaf structure — rolled, twisted, or flat depending on variety, but visibly leaf-like. Fresh green tea has a grassy, vegetal, sometimes floral aroma. If it smells of artificial flavouring or very little at all, the tea is either old or misrepresented.",
      'Single-origin matters for green tea more than most categories. A brand that specifies the garden, district, and harvest gives you information you can verify. A brand that says only "Himalayan green tea" or "premium Indian blend" is telling you nothing traceable. Nevisan sources exclusively from a single garden in Golaghat, Assam — one origin, one standard, no blending to cover inconsistency.',
      "Chemical-free cultivation is rarely disclosed but increasingly important. Most commercial Indian tea, including tea sold as green, is grown with synthetic pesticides. Whole-leaf, single-origin teas from smaller gardens are more likely to use minimal inputs — not because smaller gardens are automatically virtuous, but because the economics work differently when selling whole leaf at a premium. Ask brands directly: do they test for pesticide residues? Reluctance to answer is itself information.",
      "Finally, price is a rough signal. Genuinely good whole-leaf green tea is not cheap to produce. If you are buying green tea in India for under ₹200 for 100g, you are almost certainly not getting whole-leaf, single-origin, chemical-free tea regardless of what the packaging says. Hand-picking, careful processing, and proper storage all cost money. Brands that price accordingly are reflecting real cost of production, not overcharging.",
    ],
  },
];
function ArticleModal({ post: e, onClose: t }) {
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
          role: "dialog",
          "aria-modal": "true",
          "aria-label": "Article",
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
                    fontFamily: "'Inter'",
                    fontSize: 16,
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
                  "aria-label": "Close article",
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
                  fontFamily: "'Inter'",
                  fontSize: 16,
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
                    fontFamily: "'Inter'",
                    fontSize: 16,
                    color: T.text,
                    lineHeight: 1.8,
                    marginBottom: 18,
                  },
                },
                e,
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
                    fontFamily: "'Inter'",
                    fontSize: 16,
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
                    fontFamily: "'Inter'",
                    fontSize: 16,
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
                      fontFamily: "'Inter'",
                      fontSize: 16,
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
                      fontFamily: "'Inter'",
                      fontSize: 16,
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
                    fontFamily: "'Inter'",
                    fontSize: 16,
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
                    fontFamily: "'Inter'",
                    fontSize: 16,
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
    a && React.createElement(ArticleModal, { post: a, onClose: () => n(null) }),
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
        "We grew up next to the world's best tea. And drank mediocre tea anyway.",
      subtitle: "Until we decided to do something about it.",
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
            "Why Nevisan exists",
          ),
          React.createElement(
            "p",
            {
              style: {
                fontFamily: "'Inter'",
                fontSize: 16,
                color: T.textMuted,
                lineHeight: 1.8,
                marginBottom: 16,
              },
            },
            "Growing up in Guwahati, we watched Assam's most beautiful teas leave on trucks — only to return as broken dust inside someone else's brand. We drank that dust like everyone else. Until we stopped and asked: what does the actual leaf taste like?",
          ),
          React.createElement(
            "p",
            {
              style: {
                fontFamily: "'Inter'",
                fontSize: 16,
                color: T.textMuted,
                lineHeight: 1.8,
              },
            },
            "That question led us to Golaghat. To Tailor Made Tea — a small processing house that handles the leaf the way it deserves to be handled. One garden. Whole leaves. Nothing added. That's Nevisan.",
          ),
        ),
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
            "What makes us different",
          ),
          [
            {
              icon: "🌱",
              text: "Single origin — Golaghat, Assam, every variety",
            },
            {
              icon: "🍃",
              text: "Whole leaf only — no CTC, no fannings, no dust",
            },
            {
              icon: "✅",
              text: "PGS-India certified organic — pesticide-free from soil to seal",
            },
            { icon: "🔬", text: "FSSAI certified — food safety compliant" },
            { icon: "📦", text: "Small batch — freshness sealed in every pack" },
            {
              icon: "💬",
              text: "Direct to consumer — no middlemen, fresher stock",
            },
          ].map((e, t) =>
            React.createElement(
              "div",
              {
                key: t,
                style: {
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                  marginBottom: 14,
                },
              },
              React.createElement("span", { style: { fontSize: 18 } }, e.icon),
              React.createElement(
                "span",
                {
                  style: { fontFamily: "'Inter'", fontSize: 16, color: T.text },
                },
                e.text,
              ),
            ),
          ),
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
                fontFamily: "'Inter'",
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: "0.18em",
                color: T.teal,
                textTransform: "uppercase",
                marginBottom: 12,
              },
            },
            "The People Behind Nevisan",
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
            "Founded in 2025 by a husband & wife",
          ),
          React.createElement(
            "p",
            {
              style: {
                fontFamily: "'Inter'",
                fontSize: 16,
                color: T.textMuted,
                lineHeight: 1.75,
                maxWidth: 560,
                margin: "0 auto",
              },
            },
            "Nevisan didn't start with a business plan. It started with a frustration — and a question neither of us could stop asking: why does the world's best tea region produce tea that most Indians never actually taste?",
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
                fontFamily: "'Inter'",
                fontSize: 16,
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
            "When we started Nevisan, we weren't trying to build a tea company. We just wanted to drink the tea we grew up next to but could never actually find in a shop. So we went to the gardens in Golaghat ourselves, met the growers, and brought back the whole leaf, the good stuff that usually gets exported or blended away. Every tea we sell is one we drink at home, every single day. And if something is ever not right, message us on WhatsApp. A real person, one of us, will reply.",
          ),
          React.createElement(
            "div",
            {
              style: {
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic",
                fontSize: 16,
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
                fontFamily: "'Inter'",
                fontSize: 16,
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
                fontFamily: "'Inter'",
                fontSize: 16,
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
              bio: "Nishant grew up in Guwahati with tea gardens practically in his backyard — and somehow the tea at home was still mediocre. That contradiction never sat right with him. Nevisan is his answer to it: get the real leaf, and get it to the people who deserve it.",
            },
            {
              initials: "UJ",
              name: "Uditi Jain",
              role: "Founder & Creative Director",
              bio: "Uditi believes the way something feels matters as much as what it does. She shapes every part of what you experience with Nevisan — the words, the design, the moment you open the pack — so that drinking good tea also feels like a small, meaningful ritual.",
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
                    fontFamily: "'Inter'",
                    fontSize: 16,
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
                    fontFamily: "'Inter'",
                    fontSize: 16,
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
          "We're not a corporation. We're a family.",
        ),
        React.createElement(
          "p",
          {
            style: {
              fontFamily: "'Inter'",
              fontSize: 16,
              color: "rgba(255,255,255,0.8)",
              lineHeight: 1.7,
              maxWidth: 540,
              margin: "0 auto 28px",
            },
          },
          "Mahabir Enterprise, Guwahati — that's us. A husband, a wife, and a conviction that people across India deserve to taste what Assam's gardens are actually capable of. Every order we get still feels personal. We want it to stay that way.",
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
              fontFamily: "'Inter'",
              fontSize: 16,
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
                      fontFamily: "'Inter'",
                      fontSize: 16,
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
                  fontFamily: "'Inter'",
                  fontSize: 16,
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
      label: "For Businesses",
      title: "Wholesale & Bulk Orders",
      subtitle:
        "Premium single-origin Assam teas for cafés, hotels, gifting and retail — straight from Golaghat.",
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
                fontFamily: "'Inter'",
                fontSize: 16,
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
          "Built for businesses that value quality",
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
            title: "Cafés & Restaurants",
            desc: "Serve premium single-origin Assam tea on your menu. Each pack is 50gm — minimum order 20–30 packs.",
          },
          {
            icon: "🏨",
            title: "Hotels & Resorts",
            desc: "In-room and restaurant tea service. Each pack is 50gm, perfect for individual servings.",
          },
          {
            icon: "🎁",
            title: "Corporate Gifting",
            desc: "Curated tea gift sets for employees, clients and events. Minimum 20 packs per order.",
          },
          {
            icon: "🛒",
            title: "Retail Stores",
            desc: "Stock Nevisan in your store. Competitive margins and reliable, consistent supply.",
          },
          {
            icon: "🏥",
            title: "Wellness Centres",
            desc: "Herbal and green tea blends for spas, yoga studios and wellness retreats.",
          },
          {
            icon: "📦",
            title: "Online Resellers",
            desc: "Resell Nevisan through your own platform. Dropshipping and bulk fulfilment available.",
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
              { style: { fontSize: 30, marginBottom: 12 } },
              e.icon,
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
                  fontFamily: "'Inter'",
                  fontSize: 16,
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
                fontFamily: "'Inter'",
                fontSize: 16,
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
            "Simple, transparent and reliable",
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
                    { style: { color: "#fff", fontSize: 16, fontWeight: 700 } },
                    "✓",
                  ),
                ),
                React.createElement(
                  "span",
                  {
                    style: {
                      fontFamily: "'Inter'",
                      fontSize: 16,
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
                  fontFamily: "'Inter'",
                  fontSize: 16,
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
                  fontFamily: "'Inter'",
                  fontSize: 16,
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
                fontFamily: "'Inter'",
                fontSize: 16,
                color: T.textMuted,
                marginBottom: 24,
                lineHeight: 1.6,
              },
            },
            "Fill in the details below — we'll send you pricing and availability on WhatsApp.",
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
                      fontFamily: "'Inter'",
                      fontSize: 16,
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
                    fontFamily: "'Inter'",
                    fontSize: 16,
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
                    fontFamily: "'Inter'",
                    fontSize: 16,
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
                  fontFamily: "'Inter'",
                  fontSize: 16,
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
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "'Inter'",
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
      fontFamily: "'Inter'",
      fontSize: 16,
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
                      fontFamily: "'Inter'",
                      fontSize: 16,
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
                      fontFamily: "'Inter'",
                      fontSize: 16,
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
                  fontFamily: "'Inter'",
                  fontSize: 16,
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
                  fontFamily: "'Inter'",
                  fontSize: 16,
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
                      fontFamily: "'Inter'",
                      fontSize: 16,
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
                      fontFamily: "'Inter'",
                      fontSize: 16,
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
                        fontFamily: "'Inter'",
                        fontSize: 16,
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
                        fontFamily: "'Inter'",
                        fontSize: 16,
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
                        fontFamily: "'Inter'",
                        fontSize: 16,
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
                      fontFamily: "'Inter'",
                      fontSize: 16,
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
  const [e, t] = useState("Home"),
    [a, n] = useState("undefined" != typeof window ? window.innerWidth : 1200);
  useEffect(() => {
    try {
      var __tea = new URLSearchParams(window.location.search).get("tea");
      if (__tea) t("Collection");
    } catch (__e) {}
  }, []);
  useEffect(() => {
    const e = () => n(window.innerWidth);
    return (
      window.addEventListener("resize", e),
      () => window.removeEventListener("resize", e)
    );
  }, []);
  const o = { isMobile: a < 768, isTablet: a < 1024 },
    i = (e) => {
      (window.scrollTo({ top: 0, behavior: "smooth" }), t(e));
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
        React.createElement("a", { href: "#main-content", style: { position: "fixed", top: 0, left: 0, background: "#173020", color: "#fff", padding: "8px 16px", zIndex: 10000, textDecoration: "none", borderRadius: "0 0 8px 0", fontSize: 14, fontWeight: 600, fontFamily: "'Inter', sans-serif" } }, "Skip to main content"),
        React.createElement(ScrollProgress, { "aria-hidden": "true" }),
        React.createElement(CursorGlow, { "aria-hidden": "true" }),
        React.createElement(Nav, { page: e, setPage: i }),
        React.createElement("div", { role: "main", id: "main-content" }, r),
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
        role: "dialog",
        "aria-modal": "true",
        "aria-label": "Shopping cart",
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
                  fontFamily: "'Inter'",
                  fontSize: 16,
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
              "aria-label": "Close cart",
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
                    background: e.tea.bg,
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
                        objectFit: "cover",
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
                      fontFamily: "'Inter'",
                      fontSize: 16,
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
                      fontFamily: "'Inter'",
                      fontSize: 16,
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
                      fontFamily: "'Inter'",
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
                  fontFamily: "'Inter'",
                  fontSize: 16,
                  color: T.textMuted,
                },
              },
              "Total Amount",
            ),
            React.createElement(
              "span",
              {
                style: {
                  fontFamily: "'Inter'",
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
                fontSize: 16,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "'Inter'",
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
              "aria-live": "polite",
              "aria-atomic": "true",
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
                fontSize: 16,
                fontWeight: 700,
                fontFamily: "'Inter'",
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
        fontSize: 16,
        fontWeight: 700,
        cursor: "pointer",
        fontFamily: "'Inter'",
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
ReactDOM.createRoot(document.getElementById("root")).render(
  React.createElement(App, null),
);
