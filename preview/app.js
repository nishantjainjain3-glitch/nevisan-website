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
    `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(e ? `Hi Nevisan! I would like to order *${e}* (MRP \u20b9499 \u00b7 50 gm). Please help me with the order details.` : "Hi Nevisan! I would like to order your tea. Please help me with the details.")}`,
    "_blank",
  );
}
function NevLogo({ size: e = 56 }) {
  return React.createElement("img", {
    src: "../nevisan-logo.jpeg",
    alt: "Nevisan",
    style: {
      width: e,
      height: e,
      objectFit: "cover",
      borderRadius: 8,
      display: "block",
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
function Nav({ page: e, setPage: t, openQuiz: q }) {
  const a = [
      "Home",
      "Collection",
      "Our Story",
      "About",
      "Wholesale",
      "Contact",
      "FAQ",
      "Quiz",
    ],
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
      ? (t("FAQ"), l(!1))
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
        style: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: o || r || !n ? "rgba(15,63,69,0.82)" : "transparent",
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
            { style: { display: "flex", gap: 32, alignItems: "center" } },
            a.map((t) =>
              React.createElement(
                "button",
                {
                  key: t,
                  onClick: () => c(t),
                  style: {
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
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
              ),
            ),
            React.createElement(
              "button",
              {
                onClick: q,
                style: {
                  background: "transparent",
                  color: T.gold,
                  border: "1px solid " + T.gold,
                  borderRadius: 9999,
                  padding: "9px 22px",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "\x27Inter\x27, sans-serif",
                  transition: "transform 200ms, box-shadow 200ms",
                  marginRight: 12
                }
              },
              "Tea Quiz"
            ),
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
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'Inter'",
                },
              },
              "\ud83d\udcac Order",
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
          a.map((t, n) =>
            React.createElement(
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
            ),
          ),
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
                  l(!1); q();
                },
                style: {
                  width: "100%",
                  background: "transparent",
                  color: T.white,
                  border: "1px solid rgba(255,255,255,0.4)",
                  borderRadius: 9999,
                  padding: "16px",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "\x27Inter\x27",
                  marginBottom: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                },
                hoverStyle: { background: "rgba(255,255,255,0.08)" }
              },
              "Find Your Blend (Quiz)"
            ),
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
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "'Inter'",
                },
              },
              "\ud83d\udcac Order on WhatsApp",
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
                  fontFamily: "'Inter'",
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
              fontFamily: "'Inter', sans-serif",
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
            "\u25cf",
          ),
          e,
        ),
      ),
    ),
  );
}
function Hero({ setPage }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { isMobile } = useViewport();
  const activeTea = TEAS[activeIndex];

  const handlePrev = () => {
    setActiveIndex(prev => (prev === 0 ? TEAS.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setActiveIndex(next => (next === TEAS.length - 1 ? 0 : next + 1));
  };

  return React.createElement("div", {
    style: {
      position: "relative",
      height: "100vh",
      minHeight: "750px",
      overflow: "hidden",
      background: "#0f3f45",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: "68px"
    }
  },
    React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        zIndex: 0,
        overflow: "hidden"
      }
    },
      React.createElement("video", {
        autoPlay: true,
        muted: true,
        loop: true,
        playsInline: true,
        poster: "../hero-bg.jpg",
        style: {
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "saturate(1.1) brightness(0.4)"
        }
      },
        React.createElement("source", { src: "../tea-garden.mp4", type: "video/mp4" })
      )
    ),
    React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        zIndex: 1,
        background: `radial-gradient(circle at center, ${activeTea.bg}22 0%, rgba(15, 63, 69, 0.88) 80%)`,
        transition: "background 0.8s ease",
        pointerEvents: "none"
      }
    }),
    React.createElement("div", {
      style: {
        position: "absolute",
        top: "35%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontFamily: "'PP Mondwest', 'Playfair Display', serif",
        fontSize: isMobile ? "12vw" : "15vw",
        color: "rgba(255, 255, 255, 0.04)",
        letterSpacing: "0.08em",
        whiteSpace: "nowrap",
        zIndex: 1,
        pointerEvents: "none",
        userSelect: "none"
      }
    }, "ASSAM TEA"),
    React.createElement("div", {
      style: {
        position: "relative",
        zIndex: 2,
        width: "100%",
        maxWidth: "1200px",
        height: isMobile ? "300px" : "380px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto",
        overflow: "visible"
      }
    },
      TEAS.map((tea, idx) => {
        let diff = idx - activeIndex;
        if (diff < -4) diff += TEAS.length;
        if (diff > 4) diff -= TEAS.length;

        const isCurrent = diff === 0;
        const isPrev = diff === -1;
        const isNext = diff === 1;
        const isFarPrev = diff === -2;
        const isFarNext = diff === 2;

        let opacity = 0;
        let scale = 0.5;
        let rotateY = 0;
        let translate = 0;
        let zIndex = 0;
        let filter = "blur(8px)";

        if (isCurrent) {
          opacity = 1;
          scale = isMobile ? 1.05 : 1.25;
          rotateY = 0;
          translate = 0;
          zIndex = 10;
          filter = "blur(0px)";
        } else if (isPrev) {
          opacity = 0.65;
          scale = isMobile ? 0.75 : 0.9;
          rotateY = 45;
          translate = isMobile ? -90 : -220;
          zIndex = 5;
          filter = "blur(2px)";
        } else if (isNext) {
          opacity = 0.65;
          scale = isMobile ? 0.75 : 0.9;
          rotateY = -45;
          translate = isMobile ? 90 : 220;
          zIndex = 5;
          filter = "blur(2px)";
        } else if (isFarPrev) {
          opacity = 0.25;
          scale = 0.65;
          rotateY = 60;
          translate = isMobile ? -150 : -380;
          zIndex = 2;
        } else if (isFarNext) {
          opacity = 0.25;
          scale = 0.65;
          rotateY = -60;
          translate = isMobile ? 150 : 380;
          zIndex = 2;
        }

        if (Math.abs(diff) > 2) return null;

        return React.createElement("div", {
          key: tea.name,
          onClick: () => { if (!isCurrent) setActiveIndex(idx); },
          style: {
            position: "absolute",
            width: isMobile ? "180px" : "240px",
            height: isMobile ? "180px" : "240px",
            cursor: isCurrent ? "default" : "pointer",
            transform: `translateX(${translate}px) scale(${scale}) rotateY(${rotateY}deg)`,
            opacity: opacity,
            zIndex: zIndex,
            transition: "all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)",
            filter: filter,
            transformStyle: "preserve-3d"
          }
        },
          React.createElement("div", {
            style: {
              width: "100%",
              height: "100%",
              borderRadius: "24px",
              background: `radial-gradient(circle at center, ${tea.bg} 0%, ${T.white} 100%)`,
              padding: "12px",
              boxShadow: isCurrent ? "0 30px 60px rgba(0,0,0,0.4)" : "0 10px 20px rgba(0,0,0,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `1.5px solid ${isCurrent ? T.gold : "rgba(255,255,255,0.15)"}`,
              transform: "translateZ(30px)"
            }
          },
            React.createElement("img", {
              src: tea.img,
              alt: tea.name,
              style: {
                width: "90%",
                height: "90%",
                objectFit: "contain",
                filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.15))"
              }
            })
          )
        );
      })
    ),
    React.createElement("div", {
      style: {
        position: "relative",
        zIndex: 3,
        display: "flex",
        gap: "24px",
        marginTop: "16px",
        marginBottom: "24px"
      }
    },
      React.createElement("button", {
        onClick: handlePrev,
        style: {
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          border: `1px solid ${T.gold}`,
          background: "rgba(15, 63, 69, 0.6)",
          color: T.white,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
          backdropFilter: "blur(4px)",
          transition: "transform 0.2s"
        },
        onMouseEnter: e => { e.currentTarget.style.transform = "scale(1.1)"; },
        onMouseLeave: e => { e.currentTarget.style.transform = "scale(1)"; }
      }, "\u2190"),
      React.createElement("button", {
        onClick: handleNext,
        style: {
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          border: `1px solid ${T.gold}`,
          background: "rgba(15, 63, 69, 0.6)",
          color: T.white,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
          backdropFilter: "blur(4px)",
          transition: "transform 0.2s"
        },
        onMouseEnter: e => { e.currentTarget.style.transform = "scale(1.1)"; },
        onMouseLeave: e => { e.currentTarget.style.transform = "scale(1)"; }
      }, "\u2192")
    ),
    React.createElement("div", {
      style: {
        position: "relative",
        zIndex: 3,
        textAlign: "center",
        maxWidth: "600px",
        width: "100%",
        padding: "0 24px",
        animation: "page-enter 0.5s ease both",
        color: T.white
      }
    },
      React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          marginBottom: "12px"
        }
      },
        activeTea.tags.map(t => React.createElement(TagChip, { key: t, label: t, color: T.gold }))
      ),
      React.createElement("h2", {
        style: {
          fontFamily: "'PP Mondwest', 'Playfair Display', serif",
          fontSize: isMobile ? "28px" : "38px",
          fontWeight: 600,
          color: T.gold,
          marginBottom: "12px",
          letterSpacing: "0.04em"
        }
      }, activeTea.name),
      React.createElement("p", {
        style: {
          fontFamily: "'PP Neue Montreal', 'Inter', sans-serif",
          fontSize: isMobile ? "14px" : "16px",
          color: "rgba(255, 255, 255, 0.8)",
          lineHeight: "1.6",
          marginBottom: "20px",
          minHeight: "48px"
        }
      }, activeTea.short),
      React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "center",
          gap: "16px",
          flexWrap: "wrap"
        }
      },
        React.createElement(RippleButton, {
          onClick: () => openWhatsApp(activeTea.name),
          className: "shine-button",
          style: {
            background: "#25D366",
            color: "#fff",
            border: "none",
            borderRadius: "9999px",
            padding: "12px 32px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "'Inter'",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0 4px 15px rgba(37,211,102,0.4)"
          }
        }, "\ud83d\udcac Order via WhatsApp (MRP \u20b9499)"),
        React.createElement("button", {
          onClick: () => setPage("Collection"),
          style: {
            background: "transparent",
            color: T.white,
            border: "1px solid rgba(255,255,255,0.4)",
            borderRadius: "9999px",
            padding: "12px 28px",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "'Inter'",
            transition: "all 0.2s"
          },
          onMouseEnter: e => {
            e.currentTarget.style.borderColor = T.gold;
            e.currentTarget.style.color = T.gold;
          },
          onMouseLeave: e => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
            e.currentTarget.style.color = T.white;
          }
        }, "Details")
      )
    )
  );
}function RippleButton({
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
    short:
      "The one we reach for first thing. Bright, lemony, and kind to your stomach.",
    tags: ["DIGESTION", "METABOLISM"],
    bg: "#d4edd8",
    color: "#3a7a50",
    img: "../teas/lemongrass.png?v=2",
    price: 499,
    brew: "90\u00b0C \u00b7 2\u20133 min \u00b7 Can steep twice",
    benefits: [
      {
        icon: "\ud83c\udf3f",
        title: "Aids Digestion",
        desc: "Lemongrass relaxes the digestive tract, reducing bloating, cramps and indigestion.",
      },
      {
        icon: "\ud83d\udd25",
        title: "Boosts Metabolism",
        desc: "Natural citral activates enzymes that enhance fat metabolism and support healthy weight.",
      },
      {
        icon: "\ud83d\udca7",
        title: "Detoxifying",
        desc: "Acts as a natural diuretic, flushing toxins while keeping you hydrated and refreshed.",
      },
      {
        icon: "\ud83d\ude0c",
        title: "Reduces Anxiety",
        desc: "Mild sedative properties calm the nervous system \u2014 perfect as a mid-day stress reliever.",
      },
      {
        icon: "\ud83e\udda0",
        title: "Anti-microbial",
        desc: "Naturally fights harmful bacteria and fungi, supporting gut health and immunity.",
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
    img: "../teas/blue-flower.png?v=2",
    price: 499,
    brew: "85\u00b0C \u00b7 2\u20133 min \u00b7 No milk needed",
    benefits: [
      {
        icon: "\ud83e\uded0",
        title: "Rich in Antioxidants",
        desc: "Butterfly pea flower is packed with anthocyanins \u2014 among the highest antioxidant content of any plant.",
      },
      {
        icon: "\ud83e\udde0",
        title: "Enhances Brain Function",
        desc: "Improves memory, focus and cognitive clarity. A natural nootropic without caffeine crash.",
      },
      {
        icon: "\u2728",
        title: "Skin & Hair Health",
        desc: "Anthocyanins boost collagen, reducing wrinkles and promoting stronger, shinier hair.",
      },
      {
        icon: "\ud83d\ude34",
        title: "Calming & Sleep-Supportive",
        desc: "Mildly sedative \u2014 reduces stress hormones and promotes deeper, more restful sleep.",
      },
      {
        icon: "\ud83c\udf08",
        title: "Changes Colour with Lemon",
        desc: "Add lemon and watch it turn from blue to pink \u2014 a stunning natural pH reaction.",
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
    img: "../teas/rum.png?v=2",
    price: 499,
    bestseller: !0,
    brew: "90\u00b0C \u00b7 3 min \u00b7 Excellent hot or iced",
    benefits: [
      {
        icon: "\ud83c\udf79",
        title: "100% Non-Alcoholic",
        desc: "All the warmth of aged rum \u2014 crafted entirely from natural botanicals. Zero alcohol.",
      },
      {
        icon: "\ud83d\ude0a",
        title: "Mood Lifting",
        desc: "Warm spice notes trigger feel-good responses, making it a perfect evening ritual.",
      },
      {
        icon: "\ud83d\udc9a",
        title: "Green Tea Antioxidants",
        desc: "Assam green tea base delivers EGCG antioxidants that protect cells and reduce inflammation.",
      },
      {
        icon: "\ud83c\udf3f",
        title: "Natural Botanicals Only",
        desc: "Flavour comes from a precise blend of natural herbs and spices \u2014 zero artificial additives.",
      },
      {
        icon: "\ud83d\udd04",
        title: "Multi-Steep Value",
        desc: "Whole leaf quality means 2\u20133 full-flavoured steeps from every single serving.",
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
    img: "../teas/spearmint.png?v=2",
    price: 499,
    brew: "85\u00b0C \u00b7 2 min \u00b7 Light and refreshing",
    benefits: [
      {
        icon: "\u2696\ufe0f",
        title: "Hormonal Balance",
        desc: "Proven anti-androgenic properties \u2014 helps regulate hormones, especially beneficial for PCOS.",
      },
      {
        icon: "\ud83e\uddd6",
        title: "Reduces Acne",
        desc: "By lowering excess androgens, spearmint naturally reduces hormonal breakouts and oily skin.",
      },
      {
        icon: "\ud83d\udca8",
        title: "Fresh Breath & Digestion",
        desc: "Soothes the gut, freshens breath and relieves nausea and IBS discomfort.",
      },
      {
        icon: "\ud83e\udde0",
        title: "Improves Memory",
        desc: "Spearmint extract improves working memory and alertness within weeks of regular use.",
      },
      {
        icon: "\ud83c\udf38",
        title: "Anti-Inflammatory",
        desc: "Rich in rosmarinic acid \u2014 reduces inflammation throughout the body, easing joint discomfort.",
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
    img: "../teas/tulsi.png?v=2",
    price: 499,
    brew: "90\u00b0C \u00b7 3\u20134 min \u00b7 Best plain or with honey",
    benefits: [
      {
        icon: "\ud83d\udee1\ufe0f",
        title: "Immunity Booster",
        desc: "Tulsi (Holy Basil) is a powerful adaptogen that strengthens immunity and fights pathogens.",
      },
      {
        icon: "\ud83e\uddd8",
        title: "Stress & Anxiety Relief",
        desc: "Reduces cortisol (stress hormone) and promotes calm focus \u2014 Ayurveda's go-to for mental balance.",
      },
      {
        icon: "\ud83e\udec1",
        title: "Respiratory Health",
        desc: "Opens airways, soothes sore throats and relieves congestion \u2014 especially helpful in season changes.",
      },
      {
        icon: "\ud83e\ude78",
        title: "Blood Sugar Support",
        desc: "Clinical studies show Tulsi helps moderate blood sugar spikes \u2014 beneficial for diabetics.",
      },
      {
        icon: "\ud83c\udf31",
        title: "Detox & Liver Health",
        desc: "Natural detoxifier that supports liver function and flushes toxins from the bloodstream.",
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
    img: "../teas/chamomile.png?v=2",
    price: 499,
    brew: "85\u00b0C \u00b7 4 min \u00b7 Best before bed",
    benefits: [
      {
        icon: "\ud83d\ude34",
        title: "Deep Sleep Aid",
        desc: "Chamomile contains apigenin \u2014 binds to sleep receptors in the brain, promoting restful sleep.",
      },
      {
        icon: "\ud83d\ude0c",
        title: "Anxiety & Stress Relief",
        desc: "Clinically shown to reduce anxiety disorder symptoms. Calm without drowsiness during the day.",
      },
      {
        icon: "\ud83e\udec0",
        title: "Heart Health",
        desc: "Antioxidants lower LDL cholesterol and protect against cardiovascular disease over time.",
      },
      {
        icon: "\ud83c\udf7d\ufe0f",
        title: "Digestive Comfort",
        desc: "Soothes stomach cramps, IBS, and indigestion. Ideal to drink 30 minutes after meals.",
      },
      {
        icon: "\ud83e\uddf4",
        title: "Skin Healing",
        desc: "Anti-inflammatory properties reduce redness, eczema and speed up natural skin healing.",
      },
    ],
  },
  {
    name: "Whiskey Green Tea",
    short: "Smoky, bold and grown-up. For whiskey nights, without the whiskey.",
    tags: ["NON-ALC", "BOLD"],
    bg: "#e0d4c8",
    color: "#5a4030",
    img: "../teas/whiskey.png?v=2",
    price: 499,
    brew: "90\u00b0C \u00b7 3 min \u00b7 Bold, best enjoyed slowly",
    benefits: [
      {
        icon: "\ud83e\udd43",
        title: "100% Non-Alcoholic",
        desc: "Captures the bold, smoky character of aged whiskey using natural botanicals \u2014 zero alcohol.",
      },
      {
        icon: "\ud83d\udc9a",
        title: "Green Tea Antioxidants",
        desc: "Assam green tea delivers EGCG \u2014 among the most potent antioxidants found in nature.",
      },
      {
        icon: "\ud83d\udd25",
        title: "Metabolism Boost",
        desc: "Green tea catechins speed up fat oxidation and support a healthy metabolism.",
      },
      {
        icon: "\ud83e\udde0",
        title: "Mental Alertness",
        desc: "L-theanine and caffeine produce calm, sustained focus without jitteriness or crash.",
      },
      {
        icon: "\ud83c\udf3f",
        title: "All Natural",
        desc: "Bold depth comes from a precise blend of natural woody botanicals \u2014 no artificial smoke.",
      },
    ],
  },
  {
    name: "GABA Oolong Tea",
    short: "Calm without the fog. The cup we keep close on the busy days.",
    tags: ["RELAXATION", "FOCUS"],
    bg: "#c0e0dc",
    color: "#1b7a82",
    img: "../teas/gaba.png?v=2",
    price: 499,
    brew: "85\u00b0C \u00b7 3 min \u00b7 Nitrogen-anaerobic processed",
    benefits: [
      {
        icon: "\ud83e\uddd8",
        title: "Deep Relaxation",
        desc: "GABA is the brain's calming neurotransmitter \u2014 naturally elevated through the fermentation process.",
      },
      {
        icon: "\ud83e\udde0",
        title: "Mental Clarity",
        desc: "Reduces anxiety without brain fog \u2014 promotes a clear, calm, focused state of mind.",
      },
      {
        icon: "\ud83d\ude34",
        title: "Better Sleep Quality",
        desc: "Higher GABA levels improve sleep onset and depth \u2014 without the grogginess of sleep aids.",
      },
      {
        icon: "\ud83d\udcaa",
        title: "Muscle Recovery",
        desc: "GABA supports HGH (human growth hormone) release, aiding muscle repair after exercise.",
      },
      {
        icon: "\u2764\ufe0f",
        title: "Blood Pressure Support",
        desc: "Studies show GABA oolong reduces blood pressure in hypertensive patients with regular use.",
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
    img: "../teas/organic.png?v=2",
    price: 499,
    badge: "ORGANIC",
    brew: "80\u00b0C \u00b7 2 min \u00b7 Never boiling water",
    benefits: [
      {
        icon: "\ud83c\udf31",
        title: "PGS-India Certified Organic",
        desc: "Verified pesticide-free by Participatory Guarantee System of India. Pure from soil to seal.",
      },
      {
        icon: "\u26a1",
        title: "Clean, Sustained Energy",
        desc: "Natural caffeine + L-theanine gives steady energy without jitters or afternoon crash.",
      },
      {
        icon: "\ud83d\udee1\ufe0f",
        title: "Powerful Antioxidants",
        desc: "EGCG catechins fight free radicals, reduce inflammation and protect against chronic disease.",
      },
      {
        icon: "\ud83c\udfc3",
        title: "Fat Burning",
        desc: "Boosts fat oxidation by up to 17% and improves athletic endurance when consumed regularly.",
      },
      {
        icon: "\ud83e\uddec",
        title: "Anti-Ageing",
        desc: "Polyphenols protect DNA from damage, slow cellular ageing and support long-term brain health.",
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
function TeaCard({tea:e,onView:t,onImageClick:a,index:n=0}){
  const[o,i]=useState(!1);
  const[r,l]=useState(!1);
  const[s,c]=useState({x:0,y:0});
  const[d,m]=useState(!1);
  const[p,g]=useInView(.1);
  const f=useCallback(e=>{
    if(!p.current)return;
    const t=p.current.getBoundingClientRect();
    c({x:12*((e.clientX-t.left)/t.width-.5),y:-12*((e.clientY-t.top)/t.height-.5)})
  },[]);
  return React.createElement("div",{
    ref:p,
    className:"card-hover-lift glass-panel",
    onMouseEnter:()=>i(!0),
    onMouseLeave:()=>{i(!1);c({x:0,y:0});m(!1)},
    onMouseMove:f,
    onTouchStart:()=>l(!0),
    onTouchEnd:()=>l(!1),
    onClick:()=>{
      try {
        const m={"Lemongrass Green Tea":"KT-8GBE-8MZG","Blue Flower Green Tea":"BlueFlower-1","Rum Green Tea":"RUM-1","Spearmint Green Tea":"Spearmint","Tulsi Green Tea":"MK-H5LY-IRK3","Chamomile Green Tea":"Chamomile-1","Whiskey Green Tea":"9E-23FO-LL8Q","GABA Oolong Tea":"GABA","Organic Green Tea":"Unflavoured-1"};
        const s=m[e.name];
        if(s&&typeof fbq!=="undefined"){fbq("track","ViewContent",{content_ids:[s],content_type:"product",value:499,currency:"INR"})}
      } catch(err){}
      t(e)
    },
    style:{
      borderRadius:20,
      overflow:"hidden",
      boxShadow:o?"0 24px 50px rgba(15,63,69,0.15)":"0 4px 12px rgba(15,63,69,0.03)",
      transform:o?`perspective(900px) rotateX(${s.y}deg) rotateY(${s.x}deg) translateY(-6px) scale(1.01)`:r?"perspective(900px) scale(0.97)":"perspective(900px) rotateX(0) rotateY(0) translateY(0) scale(1)",
      transition:o?"box-shadow 250ms ease, transform 120ms ease":"box-shadow 350ms ease, transform 350ms ease, opacity 0.6s ease-out, translate 0.6s ease-out",
      cursor:"pointer",
      opacity:g?1:0,
      translate:g?"0 0":"0 32px",
      transitionDelay:.05*n+"s",
      background:"rgba(255, 255, 255, 0.72)",
      backdropFilter:"blur(16px)",
      WebkitBackdropFilter:"blur(16px)",
      border:"1px solid rgba(201, 168, 76, 0.2)"
    }
  },
  React.createElement("div",{
    style:{
      background:`radial-gradient(circle at center, ${e.bg} 0%, ${T.white} 100%)`,
      height:220,
      overflow:"hidden",
      position:"relative",
      cursor:"zoom-in"
    },
    onClick:t=>{t.stopPropagation();a&&a(e.img,e.name)}
  },
    e.img?React.createElement("img",{
      className:"floating-product-img",
      src:e.img,
      alt:`${e.name} - Nevisan whole leaf tea from Golaghat Assam`,
      loading:"lazy",
      width:"400",
      height:"400",
      style:{width:"100%",height:"100%",objectFit:"contain",padding:"16px",transform:o?"scale(1.05)":"scale(1)",transition:"transform 500ms ease"}
    }):React.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",height:"100%"}},React.createElement("span",{style:{fontSize:48,opacity:.7}},"\ud83c\udf43")),
    e.bestseller&&React.createElement("div",{
      style:{
        position:"absolute",
        top:12,
        right:12,
        background:T.gold,
        color:T.tealDark,
        fontSize:9,
        fontWeight:700,
        letterSpacing:"0.08em",
        padding:"4px 10px",
        borderRadius:9999,
        boxShadow:"0 2px 8px rgba(201,168,76,0.4)"
      }
    },"\u2605 BESTSELLER"),
    e.badge&&!e.bestseller&&React.createElement("div",{
      style:{
        position:"absolute",
        top:12,
        right:12,
        background:"#2a6a2a",
        color:"#fff",
        fontSize:9,
        fontWeight:700,
        letterSpacing:"0.08em",
        padding:"4px 10px",
        borderRadius:9999
      }
    },"\u2713 "+e.badge)
  ),
  React.createElement("div",{style:{padding:"24px"}},
    React.createElement("h3",{
      style:{
        fontFamily:"'PP Mondwest', 'Playfair Display', serif",
        fontWeight:600,
        fontSize:20,
        color:T.tealDark,
        marginBottom:8,
        lineHeight:1.3
      }
    },e.name),
    React.createElement("p",{
      style:{
        fontFamily:"'PP Neue Montreal', 'Inter', sans-serif",
        fontSize:13.5,
        color:T.textMuted,
        lineHeight:1.6,
        marginBottom:16,
        minHeight:48
      }
    },e.short),
    React.createElement("div",{style:{display:"flex",gap:6,flexWrap:"wrap",marginBottom:16}},
      e.tags.map(t=>React.createElement(TagChip,{key:t,label:t,color:e.color}))
    ),
    React.createElement("div",{style:{borderTop:`1px solid ${T.border}`,paddingTop:16}},
      React.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}},
        React.createElement("div",null,
          React.createElement("div",{style:{display:"flex",alignItems:"center",gap:6}},
            React.createElement("span",{style:{fontFamily:"'Inter'",fontSize:18,fontWeight:700,color:T.teal}},"MRP \u20b9499"),
            React.createElement("span",{style:{fontFamily:"'Inter'",fontSize:11,color:T.textMuted}},"\u00b7 50 gm")
          )
        ),
        React.createElement("button",{
          onClick:a=>{a.stopPropagation();t(e)},
          style:{
            background:"transparent",
            color:T.teal,
            border:`1.5px solid ${T.teal}`,
            borderRadius:9999,
            padding:"6px 16px",
            fontSize:11,
            fontWeight:600,
            cursor:"pointer",
            fontFamily:"'Inter'",
            letterSpacing:"0.04em",
            transition:"all 200ms"
          },
          onMouseEnter:e=>{e.currentTarget.style.background=T.teal;e.currentTarget.style.color="#fff"},
          onMouseLeave:e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=T.teal}
        },"Details")
      ),
      React.createElement("div",{style:{position:"relative"}},
        React.createElement("button",{
          onClick:e=>{e.stopPropagation();m(e=>!e)},
          style:{
            width:"100%",
            background:T.tealDark,
            color:"#fff",
            border:"none",
            borderRadius:9999,
            padding:"12px",
            fontSize:13.5,
            fontWeight:600,
            cursor:"pointer",
            fontFamily:"'Inter'",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            gap:6,
            transition:"filter 200ms"
          },
          onMouseEnter:e=>e.currentTarget.style.filter="brightness(1.1)",
          onMouseLeave:e=>e.currentTarget.style.filter="none"
        },"Buy Now \u2192"),
        d&&React.createElement("div",{onClick:e=>{e.stopPropagation();m(!1)},style:{position:"fixed",inset:0,zIndex:49}}),
        d&&React.createElement("div",{
          onClick:e=>e.stopPropagation(),
          style:{
            position:"absolute",
            bottom:"115%",
            left:0,
            right:0,
            background:"rgba(255, 255, 255, 0.95)",
            backdropFilter:"blur(16px)",
            WebkitBackdropFilter:"blur(16px)",
            borderRadius:16,
            boxShadow:"0 12px 40px rgba(15,63,69,0.18)",
            border:`1px solid rgba(201, 168, 76, 0.3)`,
            overflow:"hidden",
            zIndex:50,
            animation:"page-enter 0.18s ease both"
          }
        },
          React.createElement("div",{style:{padding:"12px 16px 8px",fontFamily:"'Inter'",fontSize:10,fontWeight:700,letterSpacing:"0.12em",color:T.textMuted,textTransform:"uppercase"}},"Choose Marketplace"),
          [
            {label:"WhatsApp",sub:"Direct  Free Shipping",bg:"#25D366",emoji:"\ud83d\udcac",action:()=>{openWhatsApp(e.name);m(!1)}},
            {label:"Amazon Store",sub:"Free Prime Delivery",bg:"#FF9900",emoji:"\ud83d\uded2",action:()=>{window.open("https://www.amazon.in/stores/NEVISAN/page/51CB39DB-29D6-4C38-8CC0-1D10087E5C8E?lp_asin=B0G38DJN2M&ref_=ast_bln","_blank");m(!1)}},
            {label:"Flipkart Store",sub:"Secure Payment",bg:"#2874F0",emoji:"\ud83d\udc5c",action:()=>{window.open("https://www.flipkart.com/store/nevisan","_blank");m(!1)}}
          ].map(e=>React.createElement("button",{
            key:e.label,
            onClick:e.action,
            style:{
              width:"100%",
              background:"none",
              border:"none",
              cursor:"pointer",
              padding:"10px 16px",
              display:"flex",
              alignItems:"center",
              gap:12,
              borderTop:`1px solid ${T.border}`,
              transition:"background 150ms"
            },
            onMouseEnter:e=>e.currentTarget.style.background="rgba(27,122,130,0.05)",
            onMouseLeave:e=>e.currentTarget.style.background="none"
          },
            React.createElement("div",{style:{width:32,height:32,borderRadius:8,background:e.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,color:"#fff",flexShrink:0}},e.emoji),
            React.createElement("div",{style:{textAlign:"left"}},
              React.createElement("div",{style:{fontFamily:"'Inter'",fontSize:13,fontWeight:600,color:T.text}},e.label),
              React.createElement("div",{style:{fontFamily:"'Inter'",fontSize:10.5,color:T.textMuted}},e.sub)
            ),
            React.createElement("div",{style:{marginLeft:"auto",color:T.textMuted,fontSize:14}},"\u203a")
          ))
        )
      )
    )
  )
)
}function ImageLightbox({ img: e, name: t, onClose: a }) {
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
        "\u2715",
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
function CollectionPage({ setPage }) {
  const [activeTea, setActiveTea] = useState(null);
  const [lightboxImg, setLightboxImg] = useState(null);
  const { isMobile, isTablet } = useViewport();
  const cols = isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)";
  
  return React.createElement("div", {
    style: {
      background: T.cream,
      minHeight: "100vh",
      animation: "page-enter 0.5s cubic-bezier(0.16, 1, 0.3, 1) both"
    }
  },
    React.createElement(PageHero, {
      photo: PAGE_PHOTOS.collection,
      label: "The Collection",
      title: "Nine Varieties. One Garden.",
      subtitle: "Every single leaf harvested from Golaghat, Assam \u2014 whole, unblended, handcrafted."
    }),
    React.createElement(Ticker, null),
    React.createElement("div", {
      style: {
        maxWidth: "1200px",
        margin: "0 auto",
        padding: isMobile ? "48px 20px" : "80px 32px"
      }
    },
      React.createElement("div", {
        style: {
          textAlign: "center",
          marginBottom: isMobile ? "40px" : "64px"
        }
      },
        React.createElement("div", {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            marginBottom: "16px"
          }
        },
          React.createElement("div", { style: { height: 1, width: 60, background: T.gold } }),
          React.createElement("span", {
            style: {
              fontFamily: "'Inter'",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.14em",
              color: T.teal,
              textTransform: "uppercase"
            }
          }, "The Catalog"),
          React.createElement("div", { style: { height: 1, width: 60, background: T.gold } })
        ),
        React.createElement("h2", {
          style: {
            fontFamily: "'PP Mondwest', 'Playfair Display', serif",
            fontWeight: 500,
            fontSize: isMobile ? "32px" : "48px",
            color: T.tealDark,
            marginBottom: "16px"
          }
        }, "Explore the Range"),
        React.createElement("p", {
          style: {
            fontFamily: "'PP Neue Montreal', 'Inter', sans-serif",
            fontSize: "15px",
            color: T.textMuted,
            maxWidth: "500px",
            margin: "0 auto"
          }
        }, "Find the perfect blend for your ritual. Direct from our family garden to your cup.")
      ),
      React.createElement("div", {
        style: {
          display: "grid",
          gridTemplateColumns: cols,
          gap: isMobile ? "20px" : "32px"
        }
      },
        TEAS.map((tea, idx) =>
          React.createElement(TeaCard, {
            key: tea.name,
            tea: tea,
            onView: setActiveTea,
            onImageClick: (img, name) => setLightboxImg({ img, name }),
            index: idx
          })
        )
      )
    ),
    activeTea && ReactDOM.createPortal(
      React.createElement("div", {
        onClick: () => setActiveTea(null),
        style: {
          position: "fixed",
          inset: 0,
          background: "rgba(15, 63, 69, 0.75)",
          zIndex: 600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          backdropFilter: "blur(12px)",
          animation: "overlay-fade 0.25s ease both"
        }
      },
        React.createElement("div", {
          onClick: e => e.stopPropagation(),
          className: "glass-panel",
          style: {
            background: "rgba(255, 255, 255, 0.92)",
            borderRadius: "24px",
            padding: "32px",
            width: "100%",
            maxWidth: "520px",
            boxShadow: "0 30px 60px rgba(0,0,0,0.3)",
            border: `1.5px solid rgba(201,168,76,0.35)`,
            animation: "page-enter 0.3s cubic-bezier(0.16, 1, 0.3, 1) both",
            maxHeight: "90vh",
            overflowY: "auto"
          }
        },
          React.createElement("button", {
            onClick: () => setActiveTea(null),
            style: {
              position: "absolute",
              top: 20,
              right: 20,
              background: "rgba(0,0,0,0.05)",
              border: "none",
              borderRadius: "50%",
              width: 32,
              height: 32,
              cursor: "pointer",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10
            }
          }, "\u2715"),
          React.createElement("div", {
            style: {
              background: `radial-gradient(circle at center, ${activeTea.bg} 0%, ${T.white} 100%)`,
              height: "220px",
              borderRadius: "16px",
              overflow: "hidden",
              marginBottom: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }
          },
            React.createElement("img", {
              src: activeTea.img,
              alt: activeTea.name,
              style: { width: "80%", height: "80%", objectFit: "contain", filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.08))" }
            })
          ),
          React.createElement("div", {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
              gap: "16px",
              marginBottom: "12px"
            }
          },
            React.createElement("h2", {
              style: {
                fontFamily: "'PP Mondwest', 'Playfair Display', serif",
                fontSize: "28px",
                fontWeight: 600,
                color: T.tealDark
              }
            }, activeTea.name),
            React.createElement("span", {
              style: {
                fontFamily: "'Inter'",
                fontSize: "20px",
                fontWeight: 700,
                color: T.teal,
                whiteSpace: "nowrap"
              }
            }, "MRP \u20b9499")
          ),
          React.createElement("div", { style: { display: "flex", gap: "6px", marginBottom: "16px" } },
            activeTea.tags.map(t => React.createElement(TagChip, { key: t, label: t, color: activeTea.color }))
          ),
          React.createElement("p", {
            style: {
              fontFamily: "'PP Neue Montreal', 'Inter', sans-serif",
              fontSize: "14.5px",
              color: T.textMuted,
              lineHeight: "1.6",
              marginBottom: "20px"
            }
          }, activeTea.short),
          React.createElement("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
              marginBottom: "24px"
            }
          },
            React.createElement("div", {
              style: { background: "rgba(27,122,130,0.05)", border: "1px solid rgba(27,122,130,0.1)", borderRadius: "12px", padding: "12px" }
            },
              React.createElement("div", { style: { fontSize: "10px", fontWeight: 700, textTransform: "uppercase", color: T.teal, letterSpacing: "0.08em", marginBottom: "4px" } }, "\ud83c\udf75 Brewing Guide"),
              React.createElement("div", { style: { fontSize: "12.5px", fontWeight: 500, color: T.text } }, activeTea.brew)
            ),
            React.createElement("div", {
              style: { background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "12px", padding: "12px" }
            },
              React.createElement("div", { style: { fontSize: "10px", fontWeight: 700, textTransform: "uppercase", color: T.gold, letterSpacing: "0.08em", marginBottom: "4px" } }, "\ud83c\udf43 Yield"),
              React.createElement("div", { style: { fontSize: "12.5px", fontWeight: 500, color: T.text } }, "Steep twice \u00b7 40+ cups")
            )
          ),
          React.createElement("div", {
            style: { display: "flex", flexDirection: "column", gap: "10px" }
          },
            React.createElement(AddToCartBtn, { tea: activeTea, onAdded: () => setActiveTea(null) }),
            React.createElement("div", {
              style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }
            },
              React.createElement(RippleButton, {
                onClick: () => { openWhatsApp(activeTea.name); setActiveTea(null); },
                style: { background: "#25D366", color: "#fff", border: "none", borderRadius: "9999px", padding: "12px", fontSize: "13px", fontWeight: 600, fontFamily: "'Inter'", display: "flex", alignItems: "center", justifyValue: "center", justifyContent: "center", gap: "6px" }
              }, "\ud83d\udcac WhatsApp"),
              React.createElement("button", {
                onClick: () => { window.open("https://www.amazon.in/stores/NEVISAN/page/51CB39DB-29D6-4C38-8CC0-1D10087E5C8E?lp_asin=B0G38DJN2M&ref_=ast_bln", "_blank"); setActiveTea(null); },
                style: { background: "transparent", color: T.teal, border: `1.5px solid ${T.teal}`, borderRadius: "9999px", padding: "12px", fontSize: "13px", fontWeight: 600, fontFamily: "'Inter'", cursor: "pointer" }
              }, "Buy on Amazon")
            )
          )
        )
      ),
      document.body
    ),
    lightboxImg && React.createElement(ImageLightbox, {
      img: lightboxImg.img,
      name: lightboxImg.name,
      onClose: () => setLightboxImg(null)
    })
  );
}function PhilosophySection() {
  const { isMobile, isTablet } = useViewport();
  const list = [
    {
      icon: React.createElement("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"},React.createElement("path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}),React.createElement("path",{d:"M3 3v5h5"}),React.createElement("path",{d:"M12 7v5l4 2"})),
      title: "Steep twice, enjoy twice",
      desc: "Whole leaf quality means the second steep is as rich and aromatic as the first. Double the value, double the experience."
    },
    {
      icon: React.createElement("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"},React.createElement("path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"}),React.createElement("path",{d:"m9 12 2 2 4-4"})),
      title: "100% Chemical-Free",
      desc: "Grown under strict organic standards without synthetic pesticides or chemical fertilizers. PGS-India certified."
    },
    {
      icon: React.createElement("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"},React.createElement("path",{d:"M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"}),React.createElement("circle",{cx:"12",cy:"10",r:"3"})),
      title: "Single Origin (Golaghat)",
      desc: "Every single leaf is harvested from our exclusive garden in Upper Assam. Fully traceable, unblended, and consistent."
    },
    {
      icon: React.createElement("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"},React.createElement("path",{d:"M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"}),React.createElement("path",{d:"M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"}),React.createElement("path",{d:"M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"}),React.createElement("path",{d:"M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"})),
      title: "Handcrafted in Batches",
      desc: "Made using traditional small-batch techniques to preserve natural essential oils. Never mass-manufactured."
    }
  ];

  return React.createElement("section", {
    style: {
      background: T.teal,
      padding: isMobile ? "64px 20px" : "100px 32px",
      position: "relative",
      overflow: "hidden"
    }
  },
    React.createElement("div", {
      style: {
        position: "absolute",
        top: "-10%",
        left: "-5%",
        width: "400px",
        height: "400px",
        borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.06)",
        pointerEvents: "none"
      }
    }),
    React.createElement("div", {
      style: {
        position: "absolute",
        bottom: "-10%",
        right: "-5%",
        width: "350px",
        height: "350px",
        borderRadius: "50%",
        border: "1px solid rgba(201, 168, 76, 0.08)",
        pointerEvents: "none"
      }
    }),
    React.createElement("div", {
      style: {
        maxWidth: "1200px",
        margin: "0 auto",
        position: "relative",
        zIndex: 2
      }
    },
      React.createElement("div", {
        style: {
          textAlign: "center",
          marginBottom: isMobile ? "40px" : "64px"
        }
      },
        React.createElement("span", {
          style: {
            fontFamily: "'Inter'",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.15em",
            color: T.gold,
            textTransform: "uppercase",
            display: "block",
            marginBottom: "12px"
          }
        }, "Our Philosophy"),
        React.createElement("h2", {
          style: {
            fontFamily: "'PP Mondwest', 'Playfair Display', serif",
            fontSize: isMobile ? "32px" : "48px",
            fontWeight: 500,
            color: T.white,
            lineHeight: "1.2"
          }
        }, "Tea Crafted With Intention")
      ),
      React.createElement("div", {
        style: {
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
          gap: "24px"
        }
      },
        list.map((item, idx) =>
          React.createElement("div", {
            key: idx,
            className: "glass-dark-panel",
            style: {
              borderRadius: "20px",
              padding: "28px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              transition: "transform 0.3s ease, border-color 0.3s ease",
              cursor: "default"
            },
            onMouseEnter: e => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.borderColor = T.gold;
            },
            onMouseLeave: e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
            }
          },
            React.createElement("div", {
              style: {
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                color: T.gold
              }
            }, item.icon),
            React.createElement("h3", {
              style: {
                fontFamily: "'PP Mondwest', 'Playfair Display', serif",
                fontSize: "20px",
                fontWeight: 600,
                color: T.gold
              }
            }, item.title),
            React.createElement("p", {
              style: {
                fontFamily: "'PP Neue Montreal', 'Inter', sans-serif",
                fontSize: "13px",
                color: "rgba(255,255,255,0.65)",
                lineHeight: "1.5"
              }
            }, item.desc)
          )
        )
      )
    )
  );
}function BuyCard({ c: e, inView: t, index: a }) {
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
        transition: "all 300ms ease",
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
          fontFamily: "'Inter'",
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
        desc: "Direct from Nevisan \u00b7 Freshest stock \u00b7 Personal service",
        cta: "\ud83d\udcac Order on WhatsApp",
        icon: "\ud83c\udf3f",
        action: () => openWhatsApp(),
        primary: !0,
        badge: "RECOMMENDED",
      },
      {
        name: "Amazon India",
        desc: "Fast delivery nationwide",
        cta: "Shop on Amazon",
        icon: "\ud83d\udce6",
        action: () =>
          window.open(
            "https://www.amazon.in/stores/NEVISAN/page/51CB39DB-29D6-4C38-8CC0-1D10087E5C8E?lp_asin=B0G38DJN2M&ref_=ast_bln",
            "_blank",
          ),
        primary: !1,
      },
      {
        name: "Flipkart",
        desc: "Fast delivery \u00b7 Easy checkout",
        cta: "Shop on Flipkart",
        icon: "\ud83d\udecd\ufe0f",
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
            fontFamily: "'Inter'",
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
        transition: "all 300ms ease",
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
            "\u2605",
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
          fontFamily: "'Inter'",
          fontSize: 13,
          fontWeight: 600,
          color: T.teal,
        },
      },
      e.name,
    ),
    React.createElement(
      "div",
      { style: { fontFamily: "'Inter'", fontSize: 12, color: T.textMuted } },
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
        "\u2605",
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
          "\ud83d\ude4f",
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
              fontFamily: "'Inter'",
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
            const a = "\u2605".repeat(t.rating) + "\u2606".repeat(5 - t.rating);
            (window.open(
              `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`\ud83c\udf3f *New Nevisan Review*\n\n${a} ${t.rating}/5\n\n*Customer:* ${t.name}${t.loc ? ` (${t.loc})` : ""}\n*Tea:* ${t.tea || "Not specified"}\n\n*Review:*\n"${t.text}"\n\n_Submitted via nevisan.in_`)}`,
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
                fontFamily: "'Inter'",
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
                  fontFamily: "'Inter'",
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
                  fontFamily: "'Inter'",
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
                fontFamily: "'Inter'",
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
                fontFamily: "'Inter'",
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
                fontFamily: "'Inter'",
                fontSize: 13,
                color: "#e8312a",
                marginBottom: 14,
              },
            },
            "\u26a0 ",
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
              fontSize: 14,
              fontWeight: 600,
              transition: "filter 200ms",
            },
            onMouseEnter: (e) =>
              (e.currentTarget.style.filter = "brightness(1.1)"),
            onMouseLeave: (e) => (e.currentTarget.style.filter = "none"),
          },
          "Submit Review via WhatsApp \u2192",
        ),
        React.createElement(
          "p",
          {
            style: {
              fontFamily: "'Inter'",
              fontSize: 11,
              color: "#767676",
              textAlign: "center",
              marginTop: 10,
            },
          },
          "Your review opens WhatsApp pre-filled \u2014 just tap Send.",
        ),
      );
}
function Testimonials() {
  const { isMobile, isTablet } = useViewport();
  const reviews = [
    { text: "I\u2019ve tried many green teas, but this one really stands out. The aroma is fresh, and the taste is smooth without any bitterness. You can actually feel the natural flavor of the tea leaves, and it\u2019s perfect for both morning energy and evening relaxation. The best part \u2014 it can be steeped twice and still tastes great! Definitely worth the price.", name: "Uditijain", loc: "Verified Amazon Purchase \u2022 Flavor: Whiskey", rating: 5 },
    { text: "Awesome flavour.. it really do taste like rum.. all natural flavour.. no added sweeteners.. best product.. will surely will purchase more..", name: "Ridhi", loc: "Verified Amazon Purchase \u2022 Flavor: Exotic Rum", rating: 5 },
    { text: "Great taste, absolutely loved it! Can\u2019t wait to try all the delicious flavours and enjoy every single one of them soon!", name: "Chandraprakash Shyamsukha", loc: "Verified Amazon Purchase \u2022 Flavor: Lemongrass", rating: 5 },
    { text: "I'm very impressed with NEVISAN's Lemongrass Tea. It has a wonderfully fresh and zesty aroma right out of the package. The tea brews into a beautiful pale yellow and has a crisp, clean, and smooth citrus flavor. It's not bitter at all, just incredibly refreshing with a hint of natural sweetness. It's a fantastic, high-quality, caffeine-free tea. Highly recommended!", name: "Dinesh tiwari", loc: "Verified Amazon Purchase \u2022 Flavor: Lemongrass", rating: 5 },
    { text: "Tried different flavours...really enjoyed it\nHighly recommend buying the blue flower and lemongrass flavour.\nAssam tea at its best..great work team", name: "Amazon Customer", loc: "Verified Amazon Purchase \u2022 Flavor: Blue Flower", rating: 5 },
    { text: "Best green tea so far ...in spearmint flavour...From Nevisan", name: "Richa Jain", loc: "Verified Buyer \u2022 Flavor: Spearmint", rating: 5 }
  ];

  return React.createElement("section", {
    style: {
      background: T.creamDark,
      padding: isMobile ? "64px 20px" : "100px 32px",
      overflow: "hidden"
    }
  },
    React.createElement("div", {
      style: {
        maxWidth: "1200px",
        margin: "0 auto"
      }
    },
      React.createElement("div", {
        style: {
          textAlign: "center",
          marginBottom: isMobile ? "40px" : "64px"
        }
      },
        React.createElement("span", {
          style: {
            fontFamily: "'Inter'",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.14em",
            color: T.teal,
            textTransform: "uppercase",
            display: "block",
            marginBottom: "12px"
          }
        }, "Reviews"),
        React.createElement("h2", {
          style: {
            fontFamily: "'PP Mondwest', 'Playfair Display', serif",
            fontSize: isMobile ? "32px" : "48px",
            fontWeight: 500,
            color: T.tealDark,
            marginBottom: "12px"
          }
        }, "What People Are Saying"),
        React.createElement("p", {
          style: {
            fontFamily: "'PP Neue Montreal', 'Inter', sans-serif",
            fontSize: "16px",
            color: T.textMuted
          }
        }, "Real feedback from whole leaf tea lovers.")
      ),
      React.createElement("div", {
        style: {
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
          gap: "24px",
          marginBottom: "56px"
        }
      },
        reviews.map((r, i) =>
          React.createElement("div", {
            key: i,
            className: "glass-panel quote-container",
            style: {
              borderRadius: "20px",
              padding: "28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "20px",
              boxShadow: "0 8px 24px rgba(15, 63, 69, 0.04)"
            }
          },
            React.createElement("div", null,
              React.createElement("div", { style: { color: T.gold, fontSize: "14px", marginBottom: "12px" } }, "\u2605".repeat(r.rating)),
              React.createElement("p", {
                style: {
                  fontFamily: "'PP Neue Montreal', 'Inter', sans-serif",
                  fontSize: "14px",
                  color: T.text,
                  lineHeight: "1.6",
                  fontStyle: "italic"
                }
              }, `"${r.text}"`)
            ),
            React.createElement("div", {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }
            },
              React.createElement("span", {
                style: {
                  fontFamily: "'PP Mondwest', 'Playfair Display', serif",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: T.tealDark
                }
              }, r.name),
              React.createElement("span", {
                style: {
                  fontFamily: "'Inter'",
                  fontSize: "11px",
                  color: T.textMuted
                }
              }, r.loc)
            )
          )
        )
      ),
      React.createElement("div", {
        style: {
          maxWidth: "600px",
          margin: "0 auto",
          textAlign: "center"
        }
      },
        React.createElement("h3", {
          style: {
            fontFamily: "'PP Mondwest', 'Playfair Display', serif",
            fontSize: "24px",
            color: T.tealDark,
            marginBottom: "20px"
          }
        }, "Tried Nevisan tea?"),
        React.createElement("div", {
          style: {
            background: T.white,
            borderRadius: "24px",
            padding: "24px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            border: `1px solid ${T.border}`
          }
        },
          React.createElement(ReviewForm, null)
        )
      )
    )
  );
}function Footer({ setPage }) {
  const { isMobile } = useViewport();
  return React.createElement("footer", {
    style: {
      background: "#082023",
      color: "rgba(255,255,255,0.8)",
      padding: isMobile ? "64px 20px 32px" : "80px 32px 40px",
      position: "relative"
    }
  },
    React.createElement("div", {
      style: {
        maxWidth: "1200px",
        margin: "0 auto"
      }
    },
      React.createElement("div", {
        style: {
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "2fr 1.2fr 1.2fr 1.2fr",
          gap: isMobile ? "40px" : "48px",
          marginBottom: "56px"
        }
      },
        React.createElement("div", null,
          React.createElement(NevLogo, { size: 64 }),
          React.createElement("h3", {
            style: {
              fontFamily: "'PP Mondwest', 'Playfair Display', serif",
              fontSize: "22px",
              color: T.gold,
              marginTop: "16px",
              marginBottom: "12px",
              letterSpacing: "0.05em"
            }
          }, "NEVISAN"),
          React.createElement("p", {
            style: {
              fontFamily: "'PP Neue Montreal', 'Inter', sans-serif",
              fontSize: "13.5px",
              lineHeight: "1.7",
              color: "rgba(255,255,255,0.55)",
              maxWidth: "280px",
              marginBottom: "20px"
            }
          }, "Packed with absolute care in Guwahati, Assam. Direct from garden to cup."),
          React.createElement("div", {
            style: {
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginTop: "12px"
            }
          },
            React.createElement("div", {
              style: {
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "6px",
                padding: "5px 12px",
                fontFamily: "'Inter'",
                fontSize: "10px",
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.06em"
              }
            }, "FSSAI 10325001000313"),
            React.createElement("div", {
              style: {
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "6px",
                padding: "5px 12px",
                fontFamily: "'Inter'",
                fontSize: "10px",
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.06em"
              }
            }, "GSTIN 18AFAPJ8203P1Z7")
          )
        ),
        React.createElement("div", null,
          React.createElement("div", {
            style: {
              fontFamily: "'Inter'",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: T.gold,
              textTransform: "uppercase",
              marginBottom: "20px"
            }
          }, "Teas"),
          ["Lemongrass", "Blue Flower", "Spearmint", "Chamomile", "Tulsi", "Rum", "Whiskey", "GABA Oolong", "Organic Green"].map(t =>
            React.createElement("div", {
              key: t,
              onClick: () => setPage("Collection"),
              style: {
                fontFamily: "'Inter'",
                fontSize: "13px",
                color: "rgba(255,255,255,0.55)",
                marginBottom: "10px",
                cursor: "pointer",
                transition: "color 150ms"
              },
              onMouseEnter: e => { e.currentTarget.style.color = T.gold; },
              onMouseLeave: e => { e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }
            }, t)
          )
        ),
        React.createElement("div", null,
          React.createElement("div", {
            style: {
              fontFamily: "'Inter'",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: T.gold,
              textTransform: "uppercase",
              marginBottom: "20px"
            }
          }, "Company"),
          ["About", "Certifications", "Journal", "Wholesale", "FAQ"].map(t =>
            React.createElement("div", {
              key: t,
              onClick: () => setPage(t),
              style: {
                fontFamily: "'Inter'",
                fontSize: "13px",
                color: "rgba(255,255,255,0.55)",
                marginBottom: "10px",
                cursor: "pointer",
                transition: "color 150ms"
              },
              onMouseEnter: e => { e.currentTarget.style.color = T.gold; },
              onMouseLeave: e => { e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }
            }, t)
          )
        ),
        React.createElement("div", null,
          React.createElement("div", {
            style: {
              fontFamily: "'Inter'",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: T.gold,
              textTransform: "uppercase",
              marginBottom: "20px"
            }
          }, "Connect"),
          [{ label: "Instagram", url: "https://www.instagram.com/nevisan.tea/" }, { label: "WhatsApp Chat", url: `https://wa.me/${WA_NUMBER}` }, { label: "Amazon Store", url: "https://www.amazon.in/stores/NEVISAN/page/51CB39DB-29D6-4C38-8CC0-1D10087E5C8E" }, { label: "Flipkart Store", url: "https://www.flipkart.com/store/nevisan" }].map(link =>
            React.createElement("div", {
              key: link.label,
              onClick: () => window.open(link.url, "_blank"),
              style: {
                fontFamily: "'Inter'",
                fontSize: "13px",
                color: "rgba(255,255,255,0.55)",
                marginBottom: "10px",
                cursor: "pointer",
                transition: "color 150ms"
              },
              onMouseEnter: e => { e.currentTarget.style.color = T.gold; },
              onMouseLeave: e => { e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }
            }, link.label)
          )
        )
      ),
      React.createElement("div", {
        style: {
          borderTop: "1px solid rgba(255,255,255,0.08)",
          paddingTop: "24px",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "center",
          gap: isMobile ? "16px" : "0"
        }
      },
        React.createElement("span", {
          style: {
            fontFamily: "'Inter'",
            fontSize: "12px",
            color: "rgba(255,255,255,0.35)"
          }
        }, "\u00a9 2026 Nevisan Tea \u00b7 Mahabir Enterprise, Guwahati, Assam"),
        React.createElement("div", {
          style: {
            display: "flex",
            gap: "8px"
          }
        },
          ["PGS ORGANIC", "FSSAI", "MADE IN INDIA"].map(badge =>
            React.createElement("span", {
              key: badge,
              style: {
                fontFamily: "'Inter'",
                fontSize: "10px",
                fontWeight: 600,
                color: "rgba(255,255,255,0.4)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "4px",
                padding: "3px 8px"
              }
            }, badge)
          )
        )
      )
    )
  );
}function CollectionSection({ setPage }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [detailOpen, setDetailOpen] = useState(false);
  const { isMobile } = useViewport();
  const activeTea = TEAS[activeIndex];

  return React.createElement("section", {
    id: "collection-section",
    style: {
      background: T.cream,
      padding: isMobile ? "64px 20px" : "100px 32px",
      position: "relative",
      overflow: "hidden"
    }
  },
    React.createElement("div", {
      style: {
        position: "absolute",
        top: "-10%",
        right: "-5%",
        width: "350px",
        height: "350px",
        borderRadius: "50%",
        border: `1px solid ${T.border}`,
        opacity: 0.3,
        pointerEvents: "none"
      }
    }),
    React.createElement("div", {
      style: {
        maxWidth: "1200px",
        margin: "0 auto"
      }
    },
      React.createElement("div", {
        style: {
          textAlign: "center",
          marginBottom: isMobile ? "40px" : "64px"
        }
      },
        React.createElement("div", {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            marginBottom: "16px"
          }
        },
          React.createElement("div", { style: { height: 1, width: 60, background: T.gold } }),
          React.createElement("span", {
            style: {
              fontFamily: "'Inter'",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.14em",
              color: T.teal,
              textTransform: "uppercase"
            }
          }, "The Catalog"),
          React.createElement("div", { style: { height: 1, width: 60, background: T.gold } })
        ),
        React.createElement("h2", {
          style: {
            fontFamily: "'PP Mondwest', 'Playfair Display', serif",
            fontSize: isMobile ? "32px" : "48px",
            fontWeight: 500,
            color: T.tealDark,
            marginBottom: "16px"
          }
        }, "Nine Varieties. One Garden."),
        React.createElement("p", {
          style: {
            fontFamily: "'PP Neue Montreal', 'Inter', sans-serif",
            fontSize: "16px",
            color: T.textMuted,
            maxWidth: "520px",
            margin: "0 auto"
          }
        }, "Discover our chemical-free, whole-leaf specialty teas. Crafted by hand in Golaghat, Assam.")
      ),
      React.createElement("div", {
        style: {
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1.1fr 1.9fr",
          gap: isMobile ? "32px" : "48px",
          alignItems: "start"
        }
      },
        React.createElement("div", {
          style: {
            position: "sticky",
            top: "100px",
            display: "flex",
            flexDirection: "column",
            gap: "20px"
          }
        },
          React.createElement(SandTransitionImage, {
            src: activeTea.img,
            alt: activeTea.name,
            bg: `radial-gradient(circle at center, ${activeTea.bg} 0%, ${T.white} 100%)`,
            className: "floating-product-img",
            style: {
              height: isMobile ? "320px" : "440px",
              boxShadow: "0 20px 40px rgba(15, 63, 69, 0.08)",
              border: `1px solid ${T.border}`
            }
          }),
          React.createElement("div", {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }
          },
            React.createElement("div", null,
              React.createElement("span", {
                style: {
                  fontFamily: "'Inter'",
                  fontSize: "18px",
                  fontWeight: 700,
                  color: T.teal
                }
              }, "MRP \u20b9499"),
              React.createElement("span", {
                style: {
                  fontFamily: "'Inter'",
                  fontSize: "12px",
                  color: T.textMuted,
                  marginLeft: "6px"
                }
              }, "\u00b7 50 gm")
            ),
            activeTea.bestseller ? React.createElement("div", {
              style: {
                background: T.gold,
                color: T.tealDark,
                fontSize: "10px",
                fontWeight: 700,
                padding: "4px 12px",
                borderRadius: "9999px",
                letterSpacing: "0.05em"
              }
            }, "\u2605 BESTSELLER") : activeTea.badge ? React.createElement("div", {
              style: {
                background: "#2a6a2a",
                color: "#fff",
                fontSize: "10px",
                fontWeight: 700,
                padding: "4px 12px",
                borderRadius: "9999px",
                letterSpacing: "0.05em"
              }
            }, "\u2713 " + activeTea.badge) : null
          )
        ),
        React.createElement("div", {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "24px"
          }
        },
          React.createElement("div", {
            style: {
              display: "grid",
              gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
              gap: "10px"
            }
          },
            TEAS.map((tea, idx) => {
              const isActive = idx === activeIndex;
              return React.createElement("button", {
                key: tea.name,
                onClick: () => setActiveIndex(idx),
                style: {
                  background: isActive ? T.teal : T.white,
                  color: isActive ? T.white : T.text,
                  border: `1.5px solid ${isActive ? T.teal : T.border}`,
                  borderRadius: "14px",
                  padding: "12px 10px",
                  cursor: "pointer",
                  fontFamily: "'Inter'",
                  fontSize: "13px",
                  fontWeight: 600,
                  textAlign: "center",
                  boxShadow: isActive ? "0 8px 20px rgba(27, 122, 130, 0.25)" : "0 2px 6px rgba(0,0,0,0.03)",
                  transition: "all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)"
                },
                onMouseEnter: e => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = T.teal;
                    e.currentTarget.style.background = "rgba(27,122,130,0.03)";
                  }
                },
                onMouseLeave: e => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = T.border;
                    e.currentTarget.style.background = T.white;
                  }
                }
              }, tea.name.replace(" Green Tea", "").replace(" Tea", ""))
            })
          ),
          React.createElement("div", {
            className: "glass-panel",
            style: {
              borderRadius: "20px",
              padding: isMobile ? "20px" : "32px",
              display: "flex",
              flexDirection: "column",
              gap: "20px"
            }
          },
            React.createElement("div", {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }
            },
              React.createElement("h3", {
                style: {
                  fontFamily: "'PP Mondwest', 'Playfair Display', serif",
                  fontSize: isMobile ? "24px" : "30px",
                  fontWeight: 600,
                  color: T.tealDark
                }
              }, activeTea.name),
              React.createElement("div", {
                style: {
                  display: "flex",
                  gap: "6px"
                }
              },
                activeTea.tags.map(t => React.createElement(TagChip, { key: t, label: t, color: activeTea.color }))
              )
            ),
            React.createElement("p", {
              style: {
                fontFamily: "'PP Neue Montreal', 'Inter', sans-serif",
                fontSize: "14px",
                color: T.textMuted,
                lineHeight: "1.6"
              }
            }, activeTea.short),
            React.createElement("div", {
              style: {
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: "16px"
              }
            },
              React.createElement("div", {
                style: {
                  background: "rgba(27,122,130,0.05)",
                  border: `1px solid rgba(27,122,130,0.1)`,
                  borderRadius: "12px",
                  padding: "14px"
                }
              },
                React.createElement("div", {
                  style: {
                    fontFamily: "'Inter'",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    color: T.teal,
                    textTransform: "uppercase",
                    marginBottom: "6px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }
                }, "\ud83c\udf75 Brewing Guide"),
                React.createElement("div", {
                  style: {
                    fontFamily: "'Inter'",
                    fontSize: "13px",
                    color: T.text,
                    fontWeight: 500
                  }
                }, activeTea.brew.split(" \u00b7 ")[0] + " \u00b7 " + activeTea.brew.split(" \u00b7 ")[1])
              ),
              React.createElement("div", {
                style: {
                  background: "rgba(201,168,76,0.06)",
                  border: `1px solid rgba(201,168,76,0.15)`,
                  borderRadius: "12px",
                  padding: "14px"
                }
              },
                React.createElement("div", {
                  style: {
                    fontFamily: "'Inter'",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    color: T.gold,
                    textTransform: "uppercase",
                    marginBottom: "6px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }
                }, "\ud83c\udf43 Servings"),
                React.createElement("div", {
                  style: {
                    fontFamily: "'Inter'",
                    fontSize: "13px",
                    color: T.text,
                    fontWeight: 500
                  }
                }, "Steep twice \u00b7 50g makes 40+ cups")
              )
            ),
            React.createElement("div", null,
              React.createElement("div", {
                style: {
                  fontFamily: "'Inter'",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  color: T.teal,
                  textTransform: "uppercase",
                  marginBottom: "12px"
                }
              }, "Key Benefits"),
              React.createElement("div", {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px"
                }
              },
                activeTea.benefits.slice(0, 3).map((b, i) =>
                  React.createElement("div", {
                    key: i,
                    style: {
                      display: "flex",
                      alignItems: "start",
                      gap: "10px"
                    }
                  },
                    React.createElement("span", { style: { fontSize: "16px", marginTop: "2px" } }, b.icon),
                    React.createElement("div", null,
                      React.createElement("div", {
                        style: {
                          fontFamily: "'Inter'",
                          fontSize: "13px",
                          fontWeight: 600,
                          color: T.text
                        }
                      }, b.title),
                      React.createElement("div", {
                        style: {
                          fontFamily: "'Inter'",
                          fontSize: "12px",
                          color: T.textMuted,
                          lineHeight: "1.4"
                        }
                      }, b.desc)
                    )
                  )
                )
              )
            ),
            React.createElement("div", {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginTop: "10px"
              }
            },
              React.createElement(AddToCartBtn, { tea: activeTea }),
              React.createElement("div", {
                style: {
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px"
                }
              },
                React.createElement(RippleButton, {
                  onClick: () => openWhatsApp(activeTea.name),
                  style: {
                    background: "#25D366",
                    color: "#fff",
                    border: "none",
                    borderRadius: "9999px",
                    padding: "12px",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "'Inter'",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px"
                  }
                }, "\ud83d\udcac WhatsApp"),
                React.createElement("button", {
                  onClick: () => setDetailOpen(true),
                  style: {
                    background: "transparent",
                    color: T.teal,
                    border: `1.5px solid ${T.teal}`,
                    borderRadius: "9999px",
                    padding: "12px",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "'Inter'"
                  }
                }, "Buy Online \u2191")
              )
            )
          )
        )
      )
    ),
    detailOpen && ReactDOM.createPortal(
      React.createElement("div", {
        onClick: () => setDetailOpen(false),
        style: {
          position: "fixed",
          inset: 0,
          background: "rgba(15, 63, 69, 0.7)",
          zIndex: 600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          backdropFilter: "blur(8px)"
        }
      },
        React.createElement("div", {
          onClick: e => e.stopPropagation(),
          style: {
            background: T.white,
            borderRadius: "20px",
            padding: "24px",
            width: "100%",
            maxWidth: "400px",
            boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
            border: `1px solid ${T.border}`
          }
        },
          React.createElement("h4", {
            style: {
              fontFamily: "'PP Mondwest', 'Playfair Display', serif",
              fontSize: "20px",
              color: T.tealDark,
              marginBottom: "16px",
              textAlign: "center"
            }
          }, "Select Marketplace"),
          React.createElement("div", {
            style: { display: "flex", flexDirection: "column", gap: "10px" }
          },
            [{
              label: "Amazon Store",
              sub: "Free prime delivery",
              bg: "#FF9900",
              emoji: "\ud83d\uded2",
              url: "https://www.amazon.in/stores/NEVISAN/page/51CB39DB-29D6-4C38-8CC0-1D10087E5C8E?lp_asin=B0G38DJN2M&ref_=ast_bln"
            }, {
              label: "Flipkart Store",
              sub: "Secure payment",
              bg: "#2874F0",
              emoji: "\ud83d\udc5c",
              url: "https://www.flipkart.com/store/nevisan"
            }].map(opt =>
              React.createElement("button", {
                key: opt.label,
                onClick: () => { window.open(opt.url, "_blank"); setDetailOpen(false); },
                style: {
                  width: "100%",
                  background: "none",
                  border: `1px solid ${T.border}`,
                  borderRadius: "12px",
                  padding: "12px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  transition: "background 0.2s"
                },
                onMouseEnter: e => { e.currentTarget.style.background = "#f5f5f5"; },
                onMouseLeave: e => { e.currentTarget.style.background = "none"; }
              },
                React.createElement("div", {
                  style: {
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    background: opt.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                    color: "#fff"
                  }
                }, opt.emoji),
                React.createElement("div", { style: { textAlign: "left" } },
                  React.createElement("div", { style: { fontFamily: "'Inter'", fontSize: "14px", fontWeight: 600, color: T.text } }, opt.label),
                  React.createElement("div", { style: { fontFamily: "'Inter'", fontSize: "11px", color: T.textMuted } }, opt.sub)
                ),
                React.createElement("div", { style: { marginLeft: "auto", fontSize: "18px", color: T.textMuted } }, "\u203a")
              )
            )
          )
        )
      ),
      document.body
    )
  );
}function InstagramReels() {
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
              fontFamily: "'Inter'",
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
            bg: "../reel1.jpg.jpg",
          },
          {
            url: "https://www.instagram.com/reel/DXvomNwRm32/",
            bg: "../reel2.jpg.jpg",
          },
          {
            url: "https://www.instagram.com/reel/DYRB_piR_vB/",
            bg: "../reel3.jpg.jpg",
          },
          {
            url: "https://www.instagram.com/reel/DYGw0YQxn40/",
            bg: "../reel4.jpg.jpg",
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
                    fontFamily: "'Inter'",
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
      { p: 0.15, text: "Pouring 90\u00b0C spring water... waking the GABA Oolong leaf." },
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
      { p: 0.15, text: "Pouring cool 80\u00b0C water to protect delicate green leaf layers." },
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
      { p: 0.15, text: "Pouring near-boiling 95\u00b0C water to break down rich Orthodox leaf cells." },
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
      { p: 0.15, text: "Pouring boiling 100\u00b0C water... activating chamomile blossom oils." },
      { p: 0.40, text: "Honeyed apple fragrance expanding... soothing visual dispersion." },
      { p: 0.70, text: "Warm chamomile extracts and organic base blending fully." },
      { p: 0.95, text: "Infusion complete. A sunny, completely caffeine-free sleep ritual." }
    ]
  }
};

function HowToBrewSection() {
  const { isMobile } = useViewport();
  const steps = [
    { 
      num: "01", 
      title: "Heat Water", 
      desc: "Heat fresh water to 80\u00b0C\u201385\u00b0C. Avoid boiling as it burns green tea leaves.",
      icon: React.createElement("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: T.gold, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }, 
        React.createElement("path", { d: "M12 22a7 7 0 0 0 7-7c0-4.3-7-13-7-13S5 10.7 5 15a7 7 0 0 0 7 7z" })
      )
    },
    { 
      num: "02", 
      title: "Measure Tea", 
      desc: "Add 1 teaspoon (approx 2g) of whole leaf tea to your cup or teapot.",
      icon: React.createElement("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: T.gold, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }, 
        React.createElement("path", { d: "M12 22c0-8 6-12 8-16-4 1-7 4-8 8" }),
        React.createElement("path", { d: "M12 22c0-6-4-9-6-12 3 1 5 3 6 6" }),
        React.createElement("path", { d: "M12 14v8" })
      )
    },
    { 
      num: "03", 
      title: "Pour & Steep", 
      desc: "Pour hot water over leaves. Steep for exactly 2\u20133 minutes based on your preference.",
      icon: React.createElement("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: T.gold, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }, 
        React.createElement("circle", { cx: "12", cy: "12", r: "10" }),
        React.createElement("polyline", { points: "12 6 12 12 16 14" })
      )
    },
    { 
      num: "04", 
      title: "Strain & Sip", 
      desc: "Strain the liquor into your favorite cup. Enjoy the pristine flavor plain.",
      icon: React.createElement("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: T.gold, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }, 
        React.createElement("path", { d: "M18 8h1a4 4 0 0 1 0 8h-1" }),
        React.createElement("path", { d: "M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" }),
        React.createElement("path", { d: "M6 1v3" }),
        React.createElement("path", { d: "M10 1v3" }),
        React.createElement("path", { d: "M14 1v3" })
      )
    },
    { 
      num: "05", 
      title: "Steep Again", 
      desc: "Save the leaves! Nevisan whole leaves can be steeped a second time for another reward.",
      icon: React.createElement("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: T.gold, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }, 
        React.createElement("path", { d: "M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" })
      )
    }
  ];

  return React.createElement("section", {
    style: {
      background: T.white,
      padding: isMobile ? "64px 20px" : "100px 32px",
      position: "relative"
    }
  },
    React.createElement("div", {
      style: {
        maxWidth: "1200px",
        margin: "0 auto"
      }
    },
      React.createElement("div", {
        style: {
          textAlign: "center",
          marginBottom: isMobile ? "40px" : "64px"
        }
      },
        React.createElement("span", {
          style: {
            fontFamily: "'Inter'",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.14em",
            color: T.teal,
            textTransform: "uppercase",
            display: "block",
            marginBottom: "12px"
          }
        }, "The Ritual"),
        React.createElement("h2", {
          style: {
            fontFamily: "'PP Mondwest', 'Playfair Display', serif",
            fontSize: isMobile ? "32px" : "48px",
            fontWeight: 500,
            color: T.tealDark,
            marginBottom: "12px"
          }
        }, "How to Brew the Perfect Cup"),
        React.createElement("p", {
          style: {
            fontFamily: "'PP Neue Montreal', 'Inter', sans-serif",
            fontSize: "16px",
            color: T.textMuted
          }
        }, "Five simple steps to steeping premium whole-leaf tea.")
      ),
      React.createElement("div", {
        style: {
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(5, 1fr)",
          gap: "24px",
          position: "relative"
        }
      },
        !isMobile && React.createElement("div", {
          style: {
            position: "absolute",
            top: "52px",
            left: "10%",
            right: "10%",
            height: "1px",
            background: `linear-gradient(90deg, transparent, ${T.gold} 50%, transparent)`,
            opacity: 0.35,
            zIndex: 0
          }
        }),
        steps.map((step, index) =>
          React.createElement("div", {
            key: index,
            className: "brewing-ritual-card",
            style: {
              background: T.cream,
              borderRadius: "16px",
              padding: "28px 24px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              alignItems: "center",
              textAlign: "center",
              boxShadow: "0 4px 10px rgba(0,0,0,0.01)",
              position: "relative",
              zIndex: 1
            }
          },
            React.createElement("div", {
              style: {
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "#ffffff",
                border: `1.5px solid ${T.gold}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
              }
            }, step.icon),
            React.createElement("span", {
              style: {
                fontFamily: "'PP Mondwest', 'Playfair Display', serif",
                fontSize: "12px",
                fontWeight: "bold",
                color: T.gold,
                letterSpacing: "0.08em",
                textTransform: "uppercase"
              }
            }, "Step " + step.num),
            React.createElement("h3", {
              style: {
                fontFamily: "'PP Mondwest', 'Playfair Display', serif",
                fontSize: "18px",
                fontWeight: 600,
                color: T.tealDark
              }
            }, step.title),
            React.createElement("p", {
              style: {
                fontFamily: "'PP Neue Montreal', 'Inter', sans-serif",
                fontSize: "12.5px",
                color: T.textMuted,
                lineHeight: "1.5"
              }
            }, step.desc)
          )
        )
      )
    )
  );
}function FAQSection() {
  const { isMobile } = useViewport();
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqs = [
    { q: "Is Nevisan tea chemical-free and organic?", a: "Yes. Every single batch is verified pesticide-free and grown using natural composting. We hold PGS-India organic certification." },
    { q: "Can I steep these whole leaves twice?", a: "Absolutely! Because we use 100% whole leaf tea rather than tea dust, you can steep the leaves a second time. Rest the leaves for 60 seconds between steeps." },
    { q: "Do you deliver pan-India?", a: "Yes, we ship across India. You can purchase through our official Amazon and Flipkart store links, or order directly on WhatsApp for personal assistance." },
    { q: "How should I store Nevisan tea?", a: "Store in a cool, dry place inside our airtight packs. Keep away from direct sunlight, heat, and strong odors." }
  ];

  return React.createElement("section", {
    style: {
      background: T.cream,
      padding: isMobile ? "64px 20px" : "100px 32px"
    }
  },
    React.createElement("div", {
      style: {
        maxWidth: "760px",
        margin: "0 auto"
      }
    },
      React.createElement("div", {
        style: {
          textAlign: "center",
          marginBottom: isMobile ? "40px" : "64px"
        }
      },
        React.createElement("span", {
          style: {
            fontFamily: "'Inter'",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.14em",
            color: T.teal,
            textTransform: "uppercase",
            display: "block",
            marginBottom: "12px"
          }
        }, "Got Questions?"),
        React.createElement("h2", {
          style: {
            fontFamily: "'PP Mondwest', 'Playfair Display', serif",
            fontSize: isMobile ? "32px" : "48px",
            fontWeight: 500,
            color: T.tealDark
          }
        }, "Frequently Asked Questions")
      ),
      React.createElement("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: "12px"
        }
      },
        faqs.map((faq, index) => {
          const isExpanded = expandedIndex === index;
          return React.createElement("div", {
            key: index,
            style: {
              background: T.white,
              borderRadius: "16px",
              border: `1.5px solid ${isExpanded ? T.teal : T.border}`,
              overflow: "hidden",
              transition: "all 0.3s ease",
              boxShadow: isExpanded ? "0 10px 25px rgba(27,122,130,0.06)" : "none"
            }
          },
            React.createElement("button", {
              onClick: () => setExpandedIndex(isExpanded ? null : index),
              style: {
                width: "100%",
                background: "none",
                border: "none",
                padding: "20px 24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textAlign: "left",
                cursor: "pointer",
                fontFamily: "'PP Mondwest', 'Playfair Display', serif",
                fontSize: "17px",
                fontWeight: 600,
                color: T.tealDark
              }
            },
              React.createElement("span", null, faq.q),
              React.createElement("span", {
                style: {
                  fontSize: "20px",
                  color: T.gold,
                  transform: isExpanded ? "rotate(45deg)" : "rotate(0deg)",
                  transition: "transform 0.25s ease",
                  display: "inline-block"
                }
              }, "+")
            ),
            isExpanded && React.createElement("div", {
              style: {
                padding: "0 24px 20px 24px",
                fontFamily: "'PP Neue Montreal', 'Inter', sans-serif",
                fontSize: "14px",
                color: T.textMuted,
                lineHeight: "1.6",
                animation: "page-enter 0.25s ease both"
              }
            }, faq.a)
          );
        })
      )
    )
  );
}function TrustBadges() {
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
  ourStory: "../1.jpg",
  about: "../2.jpg",
  collection: "../3.jpg",
  journal: "../4.jpg",
  wholesale: "../5.jpg",
  certifications: "../6.jpg",
  contact: "../7.jpg",
};
function PageHero({ photo: e, label: t, title: a, subtitle: n }) {
  const { isMobile: o } = useViewport();
  return React.createElement(
    "div",
    {
      className: "page-hero-container",
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
              fontFamily: "'Inter'",
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
function OurStoryPage({ setPage }) {
  const { isMobile } = useViewport();
  return React.createElement("div", {
    style: { animation: "page-enter 0.5s cubic-bezier(0.16, 1, 0.3, 1) both" }
  },
    React.createElement(PageHero, {
      photo: PAGE_PHOTOS.ourStory,
      label: "Single Origin \u00b7 Golaghat, Assam",
      title: "Where Every Leaf Begins",
      subtitle: "We grew up next to the world's best tea gardens \u2014 and decided the rest of India should taste them too."
    }),
    React.createElement(PhilosophySection, null),
    React.createElement("div", {
      style: {
        background: T.cream,
        padding: isMobile ? "64px 20px" : "100px 32px",
        position: "relative"
      }
    },
      React.createElement("div", {
        style: {
          maxWidth: "720px",
          margin: "0 auto",
          textAlign: "center"
        }
      },
        React.createElement("div", {
          style: {
            fontFamily: "'Inter'",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.14em",
            color: T.gold,
            textTransform: "uppercase",
            marginBottom: "16px"
          }
        }, "The Journey"),
        React.createElement("h2", {
          style: {
            fontFamily: "'PP Mondwest', 'Playfair Display', serif",
            fontWeight: 500,
            fontSize: isMobile ? "28px" : "38px",
            color: T.tealDark,
            marginBottom: "24px",
            lineHeight: "1.3"
          }
        }, "The leaf that started it all"),
        React.createElement("p", {
          style: {
            fontFamily: "'PP Neue Montreal', 'Inter', sans-serif",
            fontSize: "16px",
            color: T.textMuted,
            lineHeight: "1.8",
            marginBottom: "20px"
          }
        }, "The question was simple: if Golaghat grows some of the world's finest tea, why does the tea in most Indian homes taste so ordinary? We didn't have a good answer. So we stopped waiting for one and went back to the garden \u2014 to bring the whole leaf, exactly as it grows, directly to you.")
      )
    ),
    React.createElement(Footer, { setPage })
  );
}function ArticleModal({post:e,onClose:t}){
  useEffect(()=>{
    const e=e=>{"Escape"===e.key&&t()};
    return window.addEventListener("keydown",e),document.body.style.overflow="hidden",()=>{window.removeEventListener("keydown",e),document.body.style.overflow=""}
  },[]);
  return ReactDOM.createPortal(
    React.createElement("div",{
      onClick:t,
      style:{position:"fixed",inset:0,background:"rgba(15,63,69,0.75)",zIndex:600,display:"flex",alignItems:"center",justifyContent:"center",padding:"20px",backdropFilter:"blur(12px)",animation:"overlay-fade 0.25s ease both"}
    },
      React.createElement("div",{
        onClick:e=>e.stopPropagation(),
        className:"glass-panel",
        style:{background:"rgba(255, 255, 255, 0.95)",border:"1.5px solid rgba(201, 168, 76, 0.35)",borderRadius:24,maxWidth:680,width:"100%",maxHeight:"88vh",display:"flex",flexDirection:"column",boxShadow:"0 32px 100px rgba(15,63,69,0.3)",animation:"page-enter 0.3s cubic-bezier(0.16, 1, 0.3, 1) both"}
      },
        React.createElement("div",{style:{padding:"32px 32px 20px",borderBottom:`1px solid ${T.border}`,flexShrink:0,position:"relative"}},
          React.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}},
            React.createElement("span",{style:{fontFamily:"'Inter'",fontSize:10,letterSpacing:"0.14em",color:T.gold,background:"rgba(201,168,76,0.12)",padding:"4px 10px",borderRadius:9999,fontWeight:700}},e.tag),
            React.createElement("button",{onClick:t,style:{background:"rgba(0,0,0,0.05)",border:"none",borderRadius:"50%",width:30,height:30,cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",color:T.textMuted}},"\u2715")
          ),
          React.createElement("h2",{style:{fontFamily:"'PP Mondwest', 'Playfair Display', serif",fontWeight:600,fontSize:26,color:T.tealDark,lineHeight:1.3,marginBottom:8}},e.title),
          React.createElement("span",{style:{fontFamily:"'Inter'",fontSize:12,color:T.textMuted}},e.date)
        ),
        React.createElement("div",{style:{padding:"32px",overflowY:"auto",flex:1,minHeight:0}},
          e.body.map((para,idx)=>React.createElement("p",{key:idx,style:{fontFamily:"'PP Neue Montreal', 'Inter', sans-serif",fontSize:15,color:T.text,lineHeight:1.75,marginBottom:20}},para)),
          React.createElement("div",{style:{marginTop:32,paddingTop:24,borderTop:`1px solid ${T.border}`,display:"flex",gap:12,flexWrap:"wrap"}},
            React.createElement(RippleButton,{
              onClick:()=>{openWhatsApp();t()},
              style:{background:"#25D366",color:"#fff",border:"none",borderRadius:"9999px",padding:"11px 24px",cursor:"pointer",fontFamily:"'Inter'",fontSize:13,fontWeight:600,display:"flex",alignItems:"center",gap:6}
            },"\ud83d\udcac Order Tea"),
            React.createElement("button",{
              onClick:t,
              style:{background:"transparent",color:T.teal,border:`1.5px solid ${T.teal}`,borderRadius:"9999px",padding:"11px 24px",cursor:"pointer",fontFamily:"'Inter'",fontSize:13,fontWeight:600}
            },"\u2190 Back to Journal")
          )
        )
      )
    ),
    document.body
  );
}function JournalPage({ setPage }) {
  const [activePost, setActivePost] = useState(null);
  const { isMobile, isTablet } = useViewport();
  const cols = isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)";
  
  return React.createElement("div", {
    style: {
      background: T.cream,
      minHeight: "100vh",
      animation: "page-enter 0.5s cubic-bezier(0.16, 1, 0.3, 1) both"
    }
  },
    React.createElement(PageHero, {
      photo: PAGE_PHOTOS.journal,
      label: "Nevisan Journal",
      title: "Stories from the Garden",
      subtitle: "Essays on tea science, adaptogens, sustainable farming, and brewing chemistry."
    }),
    React.createElement("div", {
      style: {
        maxWidth: "1200px",
        margin: "0 auto",
        padding: isMobile ? "48px 20px 80px" : "80px 32px 100px"
      }
    },
      React.createElement("div", {
        style: {
          display: "grid",
          gridTemplateColumns: cols,
          gap: isMobile ? "20px" : "32px"
        }
      },
        POSTS.map(p =>
          React.createElement("div", {
            key: p.slug,
            onClick: () => setActivePost(p),
            className: "glass-panel card-hover-lift",
            style: {
              background: "rgba(255, 255, 255, 0.6)",
              borderRadius: "20px",
              border: "1px solid rgba(201,168,76,0.25)",
              boxShadow: "0 4px 15px rgba(15,63,69,0.02)",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              transition: "all 300ms ease"
            },
            onMouseEnter: e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = T.gold; },
            onMouseLeave: e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.25)"; }
          },
            React.createElement("div", { style: { padding: "32px" } },
              React.createElement("div", {
                style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }
              },
                React.createElement("span", { style: { fontFamily: "'Inter'", fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: T.teal, textTransform: "uppercase" } }, p.tag),
                React.createElement("span", { style: { fontFamily: "'Inter'", fontSize: "11px", color: T.textMuted } }, p.date)
              ),
              React.createElement("h3", {
                style: {
                  fontFamily: "'PP Mondwest', 'Playfair Display', serif",
                  fontWeight: 600,
                  fontSize: "20px",
                  color: T.tealDark,
                  marginBottom: "12px",
                  lineHeight: "1.3"
                }
              }, p.title),
              React.createElement("p", {
                style: {
                  fontFamily: "'PP Neue Montreal', 'Inter', sans-serif",
                  fontSize: "13.5px",
                  color: T.textMuted,
                  lineHeight: "1.6"
                }
              }, p.excerpt)
            ),
            React.createElement("div", {
              style: {
                padding: "16px 32px 24px",
                borderTop: `1px solid ${T.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }
            },
              React.createElement("span", { style: { fontFamily: "'Inter'", fontSize: "12.5px", fontWeight: 600, color: T.teal } }, "Read Essay"),
              React.createElement("span", { style: { fontSize: "18px", color: T.gold } }, "\u2192")
            )
          )
        )
      )
    ),
    React.createElement(Footer, { setPage }),
    activePost && React.createElement(ArticleModal, { post: activePost, onClose: () => setActivePost(null) })
  );
}function AboutPage({ setPage }) {
  const { isMobile } = useViewport();
  const cols = isMobile ? "1fr" : "1fr 1fr";
  
  return React.createElement("div", {
    style: {
      background: T.cream,
      minHeight: "100vh",
      animation: "page-enter 0.5s cubic-bezier(0.16, 1, 0.3, 1) both"
    }
  },
    React.createElement(PageHero, {
      photo: PAGE_PHOTOS.about,
      label: "Our Story",
      title: "Grown Next to Greatness",
      subtitle: "We grew up in Guwahati next to the world's best tea. And drank mediocre dust anyway. Until we did something about it."
    }),
    React.createElement("div", {
      style: {
        maxWidth: "960px",
        margin: "0 auto",
        padding: isMobile ? "48px 20px" : "80px 32px"
      }
    },
      React.createElement("div", {
        style: {
          display: "grid",
          gridTemplateColumns: cols,
          gap: isMobile ? "32px" : "48px",
          marginBottom: "64px"
        }
      },
        React.createElement("div", null,
          React.createElement("h2", {
            style: {
              fontFamily: "'PP Mondwest', 'Playfair Display', serif",
              fontSize: "28px",
              color: T.tealDark,
              marginBottom: "16px",
              fontWeight: 600
            }
          }, "Why Nevisan Exists"),
          React.createElement("p", {
            style: {
              fontFamily: "'PP Neue Montreal', 'Inter', sans-serif",
              fontSize: "15px",
              color: T.textMuted,
              lineHeight: "1.8",
              marginBottom: "16px"
            }
          }, "Growing up in Assam, we watched the state's most beautiful teas leave on trucks \u2014 only to return as broken dust inside commercial tea bags. We drank that dust like everyone else. Until we stopped and asked: what does the actual whole leaf taste like?"),
          React.createElement("p", {
            style: {
              fontFamily: "'PP Neue Montreal', 'Inter', sans-serif",
              fontSize: "15px",
              color: T.textMuted,
              lineHeight: "1.8"
            }
          }, "That question led us back to the gardens of Golaghat. To Tailor Made Tea \u2014 a small processing house that handles the leaf with the patience it deserves. One garden. Whole leaves. Safe and chemical-free. That is Nevisan.")
        ),
        React.createElement("div", {
          className: "glass-panel",
          style: {
            padding: "32px",
            borderRadius: "20px",
            border: `1.5px solid rgba(201, 168, 76, 0.25)`,
            background: "rgba(255,255,255,0.4)"
          }
        },
          React.createElement("h2", {
            style: {
              fontFamily: "'PP Mondwest', 'Playfair Display', serif",
              fontSize: "24px",
              color: T.tealDark,
              marginBottom: "20px",
              fontWeight: 600
            }
          }, "The Nevisan Standards"),
          [
            { icon: "\ud83c\udf31", text: "Single origin \u2014 Golaghat, Assam" },
            { icon: "\ud83c\udf43", text: "Whole leaf only \u2014 zero CTC or dust" },
            { icon: "\u2713", text: "PGS Organic certified pesticide-free" },
            { icon: "\ud83d\udd2c", text: "FSSAI certified food safety standards" },
            { icon: "\ud83d\udce6", text: "Small batch crafted for freshness" }
          ].map((item, idx) =>
            React.createElement("div", {
              key: idx,
              style: { display: "flex", gap: "12px", alignItems: "center", marginBottom: "14px" }
            },
              React.createElement("span", { style: { fontSize: "18px", color: T.gold } }, item.icon),
              React.createElement("span", { style: { fontFamily: "'Inter'", fontSize: "14px", color: T.text, fontWeight: 500 } }, item.text)
            )
          )
        )
      ),
      React.createElement("div", { style: { marginBottom: "64px" } },
        React.createElement("div", {
          style: { textAlign: "center", marginBottom: "40px" }
        },
          React.createElement("span", {
            style: {
              fontFamily: "'Inter'",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              color: T.teal,
              textTransform: "uppercase",
              display: "block",
              marginBottom: "8px"
            }
          }, "Our Founders"),
          React.createElement("h2", {
            style: {
              fontFamily: "'PP Mondwest', 'Playfair Display', serif",
              fontSize: isMobile ? "28px" : "36px",
              color: T.tealDark,
              fontWeight: 500
            }
          }, "A Shared Conviction")
        ),
        React.createElement("div", {
          style: {
            display: "grid",
            gridTemplateColumns: cols,
            gap: isMobile ? "24px" : "40px"
          }
        },
          [
            {
              initials: "NJ",
              name: "Nishant Jain",
              role: "Founder",
              bio: "Nishant grew up in Guwahati with tea gardens practically in his backyard. When he realized most Indians never get to taste the actual high-quality leaves Assam exports, he started Nevisan to deliver it directly."
            },
            {
              initials: "UJ",
              name: "Uditi Jain",
              role: "Founder & Creative Director",
              bio: "Uditi believes that clean design and clear words shape the daily ritual of drinking tea. She directs the packaging, creative direction, and digital experience to make Nevisan a calm, sensory pause in your day."
            }
          ].map(f =>
            React.createElement("div", {
              key: f.name,
              className: "glass-panel",
              style: {
                borderRadius: "20px",
                padding: "36px 32px",
                textAlign: "center",
                border: `1px solid rgba(201, 168, 76, 0.25)`,
                background: "rgba(255,255,255,0.5)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }
            },
              React.createElement("div", {
                style: {
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${T.teal}, ${T.tealMid})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                  boxShadow: "0 8px 24px rgba(27,122,130,0.18)"
                }
              },
                React.createElement("span", { style: { fontFamily: "'PP Mondwest', serif", fontSize: 26, color: "#fff" } }, f.initials)
              ),
              React.createElement("span", { style: { fontFamily: "'Inter'", fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", color: T.gold, textTransform: "uppercase", marginBottom: 6 } }, f.role),
              React.createElement("h3", { style: { fontFamily: "'PP Mondwest', 'Playfair Display', serif", fontSize: "22px", color: T.tealDark, marginBottom: "12px", fontWeight: 600 } }, f.name),
              React.createElement("p", { style: { fontFamily: "'PP Neue Montreal', 'Inter', sans-serif", fontSize: "13.5px", color: T.textMuted, lineHeight: "1.7" } }, f.bio)
            )
          )
        )
      ),
      React.createElement("div", {
        style: {
          background: `linear-gradient(135deg, ${T.tealDark} 0%, #0a2f33 100%)`,
          borderRadius: "24px",
          padding: isMobile ? "32px 24px" : "48px 56px",
          textAlign: "center",
          boxShadow: "0 20px 40px rgba(15,63,69,0.2)"
        }
      },
        React.createElement("h3", {
          style: {
            fontFamily: "'PP Mondwest', 'Playfair Display', serif",
            fontSize: "30px",
            color: T.gold,
            marginBottom: "16px",
            fontWeight: 500
          }
        }, "A Family Garden Standard"),
        React.createElement("p", {
          style: {
            fontFamily: "'PP Neue Montreal', 'Inter', sans-serif",
            fontSize: "15px",
            color: "rgba(255,255,255,0.75)",
            lineHeight: "1.75",
            maxWidth: "540px",
            margin: "0 auto 28px"
          }
        }, "We are not a mass-production corporation. We harvest, pack, and ship in micro-batches directly from Guwahati. Every order is handled personally by us. We intend to keep it that way."),
        React.createElement(RippleButton, {
          onClick: () => openWhatsApp(),
          style: {
            background: T.gold,
            color: T.tealDark,
            border: "none",
            borderRadius: "9999px",
            padding: "14px 36px",
            fontSize: "14px",
            fontWeight: 700,
            fontFamily: "'Inter'",
            cursor: "pointer",
            boxShadow: "0 4px 15px rgba(201,168,76,0.3)"
          }
        }, "\ud83d\udcac Say Hello on WhatsApp")
      )
    ),
    React.createElement(Footer, { setPage })
  );
}function CertificationsPage({ setPage }) {
  const { isMobile, isTablet } = useViewport();
  const cols = isMobile ? "1fr" : "repeat(2, 1fr)";
  
  const certs = [
    { name: "FSSAI Licensed", number: "No. 10325001000313", icon: "\ud83c\udfdb\ufe0f", color: T.teal, desc: "Licensed under the Food Safety and Standards Authority of India. Nevisan complies with all government regulations for food safety, packaging, hygiene, and labeling." },
    { name: "PGS-India Organic", number: "PGS Organic Certified", icon: "\ud83c\udf3f", color: "#2a6a2a", desc: "Participatory Guarantee System of India organic certification. Verifies that our tea is cultivated organically without chemical fertilizers, synthetic pesticides, or GMO inputs." },
    { name: "Single Origin Traceability", number: "Golaghat, Assam", icon: "\ud83d\udccd", color: T.gold, desc: "100% single-origin verification. We do not blend leaves from multiple gardens or regions. Every leaf can be traced back to our exclusive garden in Golaghat." },
    { name: "Pure Whole Leaf Standard", number: "No Dust, No Fannings", icon: "\ud83c\udf43", color: T.tealMid, desc: "We utilize only whole leaf and large-broken leaf tea grades. No CTC processing dust, residues, or paper tea bags are ever used in Nevisan products." }
  ];

  return React.createElement("div", {
    style: {
      background: T.cream,
      minHeight: "100vh",
      animation: "page-enter 0.5s cubic-bezier(0.16, 1, 0.3, 1) both"
    }
  },
    React.createElement(PageHero, {
      photo: PAGE_PHOTOS.certifications,
      label: "Trust & Transparency",
      title: "Our Certifications",
      subtitle: "Every cup of tea we pack is backed by official standards and verified single-origin tracing."
    }),
    React.createElement("div", {
      style: {
        maxWidth: "960px",
        margin: "0 auto",
        padding: isMobile ? "48px 20px" : "80px 32px"
      }
    },
      React.createElement("div", {
        style: {
          display: "grid",
          gridTemplateColumns: cols,
          gap: "24px"
        }
      },
        certs.map((c, idx) =>
          React.createElement("div", {
            key: idx,
            className: "glass-panel",
            style: {
              background: "rgba(255,255,255,0.55)",
              borderRadius: "20px",
              padding: "32px",
              border: "1px solid rgba(201,168,76,0.25)",
              boxShadow: "0 10px 30px rgba(15,63,69,0.03)"
            }
          },
            React.createElement("div", {
              style: {
                display: "flex",
                gap: "16px",
                alignItems: "flex-start",
                marginBottom: "16px"
              }
            },
              React.createElement("div", {
                style: {
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: c.color + "15",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                  flexShrink: 0
                }
              }, c.icon),
              React.createElement("div", null,
                React.createElement("h3", {
                  style: {
                    fontFamily: "'PP Mondwest', 'Playfair Display', serif",
                    fontSize: "20px",
                    fontWeight: 600,
                    color: T.tealDark,
                    marginBottom: "4px"
                  }
                }, c.name),
                React.createElement("span", {
                  style: {
                    fontFamily: "'Inter'",
                    fontSize: "11px",
                    color: c.color,
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase"
                  }
                }, c.number)
              )
            ),
            React.createElement("p", {
              style: {
                fontFamily: "'PP Neue Montreal', 'Inter', sans-serif",
                fontSize: "13.5px",
                color: T.textMuted,
                lineHeight: "1.7"
              }
            }, c.desc)
          )
        )
      )
    ),
    React.createElement(Footer, { setPage })
  );
}function WholesalePage({ setPage }) {
  const { isMobile, isTablet } = useViewport();
  const [form, setForm] = useState({ name: "", business: "", type: "", qty: "", message: "" });
  const cols = isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)";
  
  const items = [
    { icon: "\u2615", title: "Caf\u00e9s & Bistros", desc: "Serve chemical-free single origin tea. Minimally processed to preserve natural taste." },
    { icon: "\ud83c\udfe8", title: "Luxury Hotels", desc: "In-room tea programs or high tea selections. Available in standard 50g packaging." },
    { icon: "\ud83c\udf81", title: "Bespoke Gifting", desc: "Premium wellness gift boxes for clients, events, and corporate milestones." },
    { icon: "\ud83d\uded2", title: "Specialty Retail", desc: "Stock Nevisan on your shelves. High margins and clean, editorial packaging aesthetics." },
    { icon: "\ud83e\uddd8", title: "Spas & Wellness", desc: "Calming herbal chamomile and oolong varieties for wellness centers and retreats." },
    { icon: "\ud83d\udce6", title: "Resellers & Platforms", desc: "Clean fulfillment and custom batch delivery options for online curators." }
  ];

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1.5px solid #e8e4de",
    fontFamily: "'Inter'",
    fontSize: "14px",
    color: T.text,
    background: "#fff",
    outline: "none",
    transition: "all 200ms ease"
  };

  return React.createElement("div", {
    style: {
      background: T.cream,
      minHeight: "100vh",
      animation: "page-enter 0.5s cubic-bezier(0.16, 1, 0.3, 1) both"
    }
  },
    React.createElement(PageHero, {
      photo: PAGE_PHOTOS.wholesale,
      label: "For Businesses",
      title: "Wholesale & Bulk Supply",
      subtitle: "Ultra-premium whole leaf teas for businesses that prioritize quality and clean origin tracing."
    }),
    React.createElement("div", {
      style: {
        maxWidth: "1100px",
        margin: "0 auto",
        padding: isMobile ? "48px 20px 0" : "80px 32px 0"
      }
    },
      React.createElement("div", { style: { textAlign: "center", marginBottom: "40px" } },
        React.createElement("div", { style: { display: "flex", alignItems: "center", justifyValue: "center", justifyContent: "center", gap: "16px", marginBottom: "14px" } },
          React.createElement("div", { style: { height: 1, width: 48, background: T.gold } }),
          React.createElement("span", { style: { fontFamily: "'Inter'", fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", color: T.teal, textTransform: "uppercase" } }, "Who We Work With"),
          React.createElement("div", { style: { height: 1, width: 48, background: T.gold } })
        ),
        React.createElement("h2", { style: { fontFamily: "'PP Mondwest', 'Playfair Display', serif", fontSize: "32px", color: T.tealDark, fontWeight: 500 } }, "Tea Programs of High Quality")
      ),
      React.createElement("div", {
        style: {
          display: "grid",
          gridTemplateColumns: cols,
          gap: "20px",
          marginBottom: "64px"
        }
      },
        items.map((it, idx) =>
          React.createElement("div", {
            key: idx,
            className: "glass-panel",
            style: {
              background: "rgba(255, 255, 255, 0.6)",
              borderRadius: "16px",
              padding: "28px 24px",
              border: "1px solid rgba(201,168,76,0.2)",
              boxShadow: "0 4px 15px rgba(15,63,69,0.02)"
            }
          },
            React.createElement("div", { style: { fontSize: "28px", marginBottom: "12px" } }, it.icon),
            React.createElement("h3", { style: { fontFamily: "'PP Mondwest', 'Playfair Display', serif", fontSize: "18px", color: T.tealDark, fontWeight: 600, marginBottom: "8px" } }, it.title),
            React.createElement("p", { style: { fontFamily: "'PP Neue Montreal', 'Inter', sans-serif", fontSize: "13px", color: T.textMuted, lineHeight: "1.6" } }, it.desc)
          )
        )
      )
    ),
    React.createElement("div", {
      style: {
        background: T.white,
        borderTop: `1px solid ${T.border}`,
        padding: isMobile ? "48px 20px" : "80px 32px"
      }
    },
      React.createElement("div", {
        style: {
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1.1fr 0.9fr",
          gap: isMobile ? "40px" : "64px",
          alignItems: "start"
        }
      },
        React.createElement("div", null,
          React.createElement("span", { style: { fontFamily: "'Inter'", fontSize: "11px", fontWeight: 700, color: T.teal, letterSpacing: "0.14em", textTransform: "uppercase", display: "block", marginBottom: "12px" } }, "Partnership Details"),
          React.createElement("h3", { style: { fontFamily: "'PP Mondwest', 'Playfair Display', serif", fontSize: "28px", color: T.tealDark, fontWeight: 500, marginBottom: "24px", lineHeight: "1.3" } }, "Transparent & Direct"),
          React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "14px", marginBottom: "32px" } },
            [
              { text: "Pack size: standard 50g sealed pouches" },
              { text: "Minimum wholesale order: 20-30 packs" },
              { text: "Fresh batch fulfillment direct from Guwahati" },
              { text: "Custom corporate gifting card sleeve options" }
            ].map((bullet, idx) =>
              React.createElement("div", { key: idx, style: { display: "flex", alignItems: "center", gap: "12px" } },
                React.createElement("div", { style: { width: 22, height: 22, borderRadius: "50%", background: T.teal, display: "flex", alignItems: "center", justifyValue: "center", justifyContent: "center", flexShrink: 0 } },
                  React.createElement("span", { style: { color: "#fff", fontSize: "11px", fontWeight: 700 } }, "\u2713")
                ),
                React.createElement("span", { style: { fontFamily: "'Inter'", fontSize: "14px", color: T.text, fontWeight: 500 } }, bullet.text)
              )
            )
          ),
          React.createElement("div", {
            className: "glass-panel",
            style: {
              padding: "24px",
              borderRadius: "16px",
              border: `1px solid rgba(27,122,130,0.15)`,
              background: "rgba(27,122,130,0.03)"
            }
          },
            React.createElement("div", { style: { fontFamily: "'Inter'", fontSize: "11px", fontWeight: 700, color: T.teal, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" } }, "WhatsApp Concierge"),
            React.createElement("p", { style: { fontFamily: "'Inter'", fontSize: "13.5px", color: T.textMuted, lineHeight: "1.6" } }, "For urgent bulk samples or specific pricing enquiries, contact us on WhatsApp at ",
              React.createElement("strong", { style: { color: T.tealDark } }, "+91 98642 45687"), ". We typically reply within a few hours."
            ))
        ),
        React.createElement("div", {
          className: "glass-panel",
          style: {
            padding: "36px 28px",
            borderRadius: "24px",
            background: "rgba(249, 246, 240, 0.72)",
            border: `1.5px solid rgba(201, 168, 76, 0.25)`,
            boxShadow: "0 15px 35px rgba(15,63,69,0.05)"
          }
        },
          React.createElement("h3", { style: { fontFamily: "'PP Mondwest', 'Playfair Display', serif", fontSize: "22px", color: T.tealDark, fontWeight: 600, marginBottom: "8px" } }, "Submit Bulk Request"),
          React.createElement("p", { style: { fontFamily: "'Inter'", fontSize: "13px", color: T.textMuted, marginBottom: "24px" } }, "Provide your details below to compile a WhatsApp bulk inquiry directly."),
          React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "16px" } },
            [
              { key: "name", label: "Your Name", placeholder: "e.g., Nishant Sharma" },
              { key: "business", label: "Business Name", placeholder: "e.g., The Roastery Cafe" },
              { key: "type", label: "Business Type", placeholder: "e.g., Cafe / Hotel / Corporate / Retail" },
              { key: "qty", label: "Est. Monthly packs (50g each)", placeholder: "e.g., 30 packs, 100 packs" }
            ].map(f =>
              React.createElement("div", { key: f.key },
                React.createElement("label", { style: { fontFamily: "'Inter'", fontSize: "10.5px", fontWeight: 700, color: T.teal, textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "6px" } }, f.label),
                React.createElement("input", {
                  style: inputStyle,
                  placeholder: f.placeholder,
                  value: form[f.key],
                  onChange: e => setForm({ ...form, [f.key]: e.target.value }),
                  onFocus: e => e.target.style.borderColor = T.teal,
                  onBlur: e => e.target.style.borderColor = "#e8e4de"
                })
              )
            ),
            React.createElement("div", null,
              React.createElement("label", { style: { fontFamily: "'Inter'", fontSize: "10.5px", fontWeight: 700, color: T.teal, textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "6px" } }, "Additional Notes"),
              React.createElement("textarea", {
                style: { ...inputStyle, resize: "vertical" },
                placeholder: "Special blends, packaging, delivery dates...",
                rows: 3,
                value: form.message,
                onChange: e => setForm({ ...form, message: e.target.value }),
                onFocus: e => e.target.style.borderColor = T.teal,
                onBlur: e => e.target.style.borderColor = "#e8e4de"
              })
            ),
            React.createElement("button", {
              onClick: () => {
                window.open(`https://wa.me/919864245687?text=${encodeURIComponent(`Hi Nevisan! I'd like to inquire about wholesale/bulk ordering.\n\nName: ${form.name}\nBusiness: ${form.business}\nType: ${form.type}\nQuantity: ${form.qty}\nMessage: ${form.message}`)}`, "_blank");
              },
              style: {
                width: "100%",
                background: "#25D366",
                color: "#fff",
                border: "none",
                borderRadius: "9999px",
                padding: "14px",
                fontSize: "14px",
                fontWeight: 700,
                fontFamily: "'Inter'",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                marginTop: "8px",
                boxShadow: "0 4px 15px rgba(37,211,102,0.3)"
              }
            }, "\ud83d\udcac Submit Wholesale Inquiry")
          )
        )
      )
    ),
    React.createElement(Footer, { setPage })
  );
}function ContactPage({ setPage }) {
  const { isMobile } = useViewport();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  
  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    border: "1.5px solid #e0dcd4",
    borderRadius: "10px",
    fontFamily: "'Inter'",
    fontSize: "14px",
    color: T.text,
    background: "#fff",
    outline: "none",
    transition: "all 200ms ease"
  };

  const details = [
    { icon: "\ud83d\udcac", label: "WhatsApp (Fastest)", value: "+91 98642 45687", action: () => openWhatsApp() },
    { icon: "\ud83d\udce7", label: "Email", value: "nevisan12@gmail.com", action: () => window.open("mailto:nevisan12@gmail.com") },
    { icon: "\ud83d\udccd", label: "Address", value: "Mahabir Enterprise, Guwahati, Assam, India", action: null }
  ];

  return React.createElement("div", {
    style: {
      background: T.cream,
      minHeight: "100vh",
      animation: "page-enter 0.5s cubic-bezier(0.16, 1, 0.3, 1) both"
    }
  },
    React.createElement(PageHero, {
      photo: PAGE_PHOTOS.contact,
      label: "Get in Touch",
      title: "We'd Love to Hear From You",
      subtitle: "Reach out for wholesale enquiries, order tracking, or garden updates."
    }),
    React.createElement("div", {
      style: {
        maxWidth: "960px",
        margin: "0 auto",
        padding: isMobile ? "48px 20px" : "80px 32px"
      }
    },
      React.createElement("div", {
        style: {
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1.1fr",
          gap: isMobile ? "32px" : "48px",
          alignItems: "start"
        }
      },
        React.createElement("div", null,
          React.createElement("span", { style: { fontFamily: "'Inter'", fontSize: "11px", fontWeight: 700, color: T.teal, letterSpacing: "0.14em", textTransform: "uppercase", display: "block", marginBottom: "16px" } }, "Contact Info"),
          details.map((d, idx) =>
            React.createElement("div", {
              key: idx,
              onClick: d.action || undefined,
              style: {
                display: "flex",
                gap: "16px",
                alignItems: "flex-start",
                marginBottom: "28px",
                cursor: d.action ? "pointer" : "default"
              }
            },
              React.createElement("div", {
                style: {
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: "rgba(27,122,130,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  color: T.teal,
                  flexShrink: 0
                }
              }, d.icon),
              React.createElement("div", null,
                React.createElement("div", { style: { fontFamily: "'Inter'", fontSize: "11px", letterSpacing: "0.12em", color: T.textMuted, textTransform: "uppercase", marginBottom: "4px" } }, d.label),
                React.createElement("div", { style: { fontFamily: "'Inter'", fontSize: "15px", color: d.action ? T.teal : T.text, fontWeight: d.action ? 600 : 400 } }, d.value)
              )
            )
          ),
          React.createElement("div", {
            className: "glass-panel",
            style: {
              padding: "24px",
              borderRadius: "16px",
              background: "rgba(15, 63, 69, 0.88)",
              color: "#fff",
              border: "none",
              boxShadow: "0 10px 25px rgba(15,63,69,0.12)"
            }
          },
            React.createElement("p", { style: { fontFamily: "'Inter'", fontSize: "13px", color: "rgba(255,255,255,0.8)", lineHeight: "1.65", marginBottom: "14px" } }, "Instant assistance is available via WhatsApp. Order placement takes less than 2 minutes."),
            React.createElement(RippleButton, {
              onClick: () => openWhatsApp(),
              style: { background: "#25D366", color: "#fff", border: "none", borderRadius: "9999px", padding: "10px 24px", cursor: "pointer", fontFamily: "'Inter'", fontSize: "13px", fontWeight: 700 }
            }, "\ud83d\udcac Open WhatsApp Chat")
          )
        ),
        React.createElement("div", {
          className: "glass-panel",
          style: {
            padding: "36px 28px",
            borderRadius: "24px",
            background: "rgba(255, 255, 255, 0.72)",
            border: `1.5px solid rgba(201, 168, 76, 0.25)`,
            boxShadow: "0 12px 35px rgba(15,63,69,0.05)"
          }
        },
          sent ? React.createElement("div", { style: { textAlign: "center", padding: "40px 0" } },
            React.createElement("div", { style: { fontSize: "48px", marginBottom: "16px" } }, "\u2709\ufe0f"),
            React.createElement("h3", { style: { fontFamily: "'PP Mondwest', 'Playfair Display', serif", fontSize: "24px", color: T.tealDark, marginBottom: "8px", fontWeight: 600 } }, "Message Compiled!"),
            React.createElement("p", { style: { fontFamily: "'Inter'", fontSize: "13.5px", color: T.textMuted, lineHeight: "1.6" } }, "We have compiled your message. Click to send it on WhatsApp now."),
            React.createElement("button", {
              onClick: () => setSent(false),
              style: { marginTop: "24px", background: T.teal, color: "#fff", border: "none", borderRadius: "9999px", padding: "10px 24px", cursor: "pointer", fontFamily: "'Inter'", fontSize: "13px", fontWeight: 600 }
            }, "Write Another")
          ) : React.createElement("form", {
            onSubmit: e => {
              e.preventDefault();
              window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hi Nevisan! My name is ${form.name}. ${form.message} (Email: ${form.email})`)}`, "_blank");
              setSent(true);
            }
          },
            React.createElement("h3", { style: { fontFamily: "'PP Mondwest', 'Playfair Display', serif", fontSize: "22px", color: T.tealDark, fontWeight: 600, marginBottom: "24px" } }, "Send a Message"),
            React.createElement("div", { style: { marginBottom: "16px" } },
              React.createElement("label", { style: { fontFamily: "'Inter'", fontSize: "11px", fontWeight: 700, color: T.teal, letterSpacing: "0.08em", display: "block", marginBottom: "6px" } }, "Your Name"),
              React.createElement("input", {
                required: true,
                style: inputStyle,
                placeholder: "e.g., Priya Sen",
                value: form.name,
                onChange: e => setForm({ ...form, name: e.target.value }),
                onFocus: e => e.target.style.borderColor = T.teal,
                onBlur: e => e.target.style.borderColor = "#e0dcd4"
              })
            ),
            React.createElement("div", { style: { marginBottom: "16px" } },
              React.createElement("label", { style: { fontFamily: "'Inter'", fontSize: "11px", fontWeight: 700, color: T.teal, letterSpacing: "0.08em", display: "block", marginBottom: "6px" } }, "Email Address"),
              React.createElement("input", {
                required: true,
                type: "email",
                style: inputStyle,
                placeholder: "you@example.com",
                value: form.email,
                onChange: e => setForm({ ...form, email: e.target.value }),
                onFocus: e => e.target.style.borderColor = T.teal,
                onBlur: e => e.target.style.borderColor = "#e0dcd4"
              })
            ),
            React.createElement("div", { style: { marginBottom: "24px" } },
              React.createElement("label", { style: { fontFamily: "'Inter'", fontSize: "11px", fontWeight: 700, color: T.teal, letterSpacing: "0.08em", display: "block", marginBottom: "6px" } }, "Message Details"),
              React.createElement("textarea", {
                required: true,
                style: { ...inputStyle, resize: "vertical" },
                rows: 4,
                placeholder: "Write your message here...",
                value: form.message,
                onChange: e => setForm({ ...form, message: e.target.value }),
                onFocus: e => e.target.style.borderColor = T.teal,
                onBlur: e => e.target.style.borderColor = "#e0dcd4"
              })
            ),
            React.createElement("button", {
              type: "submit",
              style: {
                width: "100%",
                background: T.tealDark,
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                padding: "14px",
                fontSize: "14px",
                fontWeight: 700,
                fontFamily: "'Inter'",
                cursor: "pointer",
                transition: "filter 200ms"
              },
              onMouseEnter: e => e.currentTarget.style.filter = "brightness(1.1)",
              onMouseLeave: e => e.currentTarget.style.filter = "none"
            }, "Submit Message via WhatsApp")
          )
        )
      )
    ),
    React.createElement(Footer, { setPage })
  );
}function App() {
  const [quizOpen, setQuizOpen] = useState(!1),
    [isLoading, setIsLoading] = useState(!0),
    [loadingCount, setLoadingCount] = useState(0),
    [loadingWordIndex, setLoadingWordIndex] = useState(0),
    [e, t] = useState("Home"),
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
  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroTexts = document.querySelectorAll(".page-hero-container h1, .page-hero-container p, .page-hero-container div, .hero-content-reveal");
      if (heroTexts.length > 0) {
        gsap.from(heroTexts, { y: 24, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" });
      }
      const sections = document.querySelectorAll("#active-page section, #active-page footer, #active-page .animated-section");
      sections.forEach(sec => {
        const anims = sec.querySelectorAll("[data-gsap-reveal], h2, h3, .grid > div, form, .glass-panel, .glass-dark-panel");
        if (anims.length > 0) {
          gsap.from(anims, { scrollTrigger: { trigger: sec, start: "top 88%", toggleActions: "play none none none" }, y: 28, opacity: 0, duration: 0.7, stagger: 0.08, ease: "power2.out", clearProps: "all" });
        }
      });
    });
    return () => ctx.revert();
  }, [e]);
  const o = { isMobile: a < 768, isTablet: a < 1024 },
    i = (e) => {
      (window.scrollTo({ top: 0, behavior: "smooth" }), t(e));
    };

useEffect(() => {
  const words = ["Single Origin", "PGS-Organic", "Whole Leaf", "Assam Tea", "Nevisan"];
  const duration = 2000;
  const steps = 100;
  const stepTime = duration / steps;
  const timer = setInterval(() => {
    setLoadingCount(prev => {
      if (prev >= 100) {
        clearInterval(timer);
        setTimeout(() => { setIsLoading(false); }, 300);
        return 100;
      }
      const wordIdx = Math.floor((prev / 100) * words.length);
      setLoadingWordIndex(Math.min(wordIdx, words.length - 1));
      return prev + 1;
    });
  }, stepTime);
  return () => clearInterval(timer);
}, []);
useEffect(() => {
  if (window.matchMedia("(hover: none)").matches) return;
  let lastSpawn = 0;
  const onMove = (e) => {
    const now = Date.now();
    if (now - lastSpawn < 80) return;
    lastSpawn = now;
    const target = e.target;
    const isOverInteractive = target.closest("button, a, .card-hover-lift, footer");
    if (!isOverInteractive) return;
    const isSparkle = Math.random() > 0.6;
    const particle = document.createElement("div");
    particle.className = "leaf-particle";
    particle.style.left = e.clientX + "px";
    particle.style.top = e.clientY + "px";
    if (isSparkle) {
      particle.style.width = "12px";
      particle.style.height = "12px";
      particle.style.background = "radial-gradient(circle, #c9a84c 0%, transparent 70%)";
      particle.style.borderRadius = "50%";
    } else {
      const size = 12 + Math.random() * 12;
      particle.style.width = size + "px";
      particle.style.height = size + "px";
      particle.style.borderRadius = "0 50% 0 50%";
      particle.style.background = Math.random() > 0.3 ? "#1b7a82" : "#c9a84c";
      particle.style.transform = `rotate(${Math.random() * 360}deg)`;
    }
    document.body.appendChild(particle);
    setTimeout(() => {
      const angle = Math.random() * Math.PI * 2;
      const dist = 30 + Math.random() * 50;
      const tx = Math.cos(angle) * dist;
      const ty = 40 + Math.random() * 40;
      particle.style.transform += ` translate(${tx}px, ${ty}px) scale(0)`;
      particle.style.opacity = "0";
      setTimeout(() => { particle.remove(); }, 1000);
    }, 10);
  };
  window.addEventListener("mousemove", onMove, { passive: true });
  return () => window.removeEventListener("mousemove", onMove);
}, []);

  let r;
  if (isLoading) {
    return React.createElement("div", { className: "preloader-screen", style: { background: "#0f3f45", opacity: loadingCount === 100 ? 0 : 1, transition: "opacity 0.3s ease-in-out", fontFamily: "\x27PP Neue Montreal\x27, \x27Inter\x27, sans-serif" } }, React.createElement("div", { className: "preloader-words", style: { fontFamily: "\x27PP Mondwest\x27, \x27Playfair Display\x27, serif", color: T.gold, letterSpacing: "0.05em" } }, ["Single Origin", "PGS-Organic", "Whole Leaf", "Assam Tea", "Nevisan"][loadingWordIndex]), React.createElement("div", { className: "preloader-counter", style: { fontFamily: "\x27PP Mondwest\x27, \x27Playfair Display\x27, serif", color: T.white } }, String(loadingCount).padStart(3, "0")), React.createElement("div", { className: "preloader-bar", style: { width: `${loadingCount}%`, background: `linear-gradient(90deg, ${T.gold} 0%, ${T.teal} 100%)` } }));
  }
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
                      : "FAQ" === e
                        ? React.createElement(FAQPage, { setPage: i })
                        : React.createElement(HomePage, { setPage: i })),
    React.createElement(
      CartProvider,
      null,
      React.createElement(
        ViewportCtx.Provider,
        { value: o },
        React.createElement(ScrollProgress, null),
        React.createElement(CursorGlow, null),
        React.createElement(Nav, { page: e, setPage: i, openQuiz: () => setQuizOpen(!0) }),
        React.createElement("div", { id: "active-page", key: e }, r),
        quizOpen && React.createElement(TeaQuizModal, { onClose: () => setQuizOpen(!1) }),
        React.createElement(CartFAB, null),
        React.createElement(WhatsAppFAB, null),
        React.createElement(BottomFloatingNav, null),
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
                  fontFamily: "'Inter'",
                  fontSize: 12,
                  color: T.textMuted,
                  marginTop: 2,
                },
              },
              i,
              " pack",
              1 !== i ? "s" : "",
              " \u00b7 50gm each",
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
            "\u2715",
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
                      "\ud83c\udf43",
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
                      fontFamily: "'Inter'",
                      fontSize: 13,
                      fontWeight: 700,
                      color: T.teal,
                    },
                  },
                  "\u20b9",
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
                  "\u2212",
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
                  fontFamily: "'Inter'",
                  fontSize: 22,
                  fontWeight: 700,
                  color: T.teal,
                },
              },
              "\u20b9",
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
                  .map((e) => `\u2022 ${e.tea.name} x${e.qty} = \u20b9${275 * e.qty}`)
                  .join("\n");
                (window.open(
                  `https://wa.me/919864245687?text=${encodeURIComponent(`Hi Nevisan! I'd like to place an order:\n\n${a}\n\nTotal: \u20b9${o} (${i} packs \u00d7 50gm)\n\nPlease confirm my order and share delivery details.`)}`,
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
          "\ud83d\uded2",
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
        fontSize: 14,
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
    n ? "\u2713 Added to Cart!" : "\ud83d\uded2 Add to Cart",
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
function SandTransitionImage({ src, alt, bg, className, style }) {
  const [displaySrc, setDisplaySrc] = useState(src);
  const [prevSrc, setPrevSrc] = useState(null);

  useEffect(() => {
    if (src !== displaySrc) {
      setPrevSrc(displaySrc);
      setDisplaySrc(src);
      const timer = setTimeout(() => {
        setPrevSrc(null);
      }, 450);
      return () => clearTimeout(timer);
    }
  }, [src, displaySrc]);

  return React.createElement("div", {
    style: {
      width: "100%",
      height: "100%",
      position: "relative",
      background: bg,
      borderRadius: "16px",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background 0.5s ease",
      ...style
    }
  },
    React.createElement("style", null, `
      @keyframes crossFadeOut {
        0% { opacity: 1; transform: scale(1) translateY(0); }
        100% { opacity: 0; transform: scale(0.94) translateY(10px); }
      }
      @keyframes crossFadeIn {
        0% { opacity: 0; transform: scale(1.06) translateY(-10px); }
        100% { opacity: 1; transform: scale(1) translateY(0); }
      }
    `),
    prevSrc && React.createElement("img", {
      key: prevSrc + "-prev",
      src: prevSrc,
      alt: alt,
      className: className,
      style: {
        position: "absolute",
        width: "85%",
        height: "85%",
        objectFit: "contain",
        animation: "crossFadeOut 450ms cubic-bezier(0.25, 1, 0.5, 1) both",
        pointerEvents: "none"
      }
    }),
    React.createElement("img", {
      key: displaySrc + "-new",
      src: displaySrc,
      alt: alt,
      className: className,
      style: {
        position: prevSrc ? "absolute" : "relative",
        width: "85%",
        height: "85%",
        objectFit: "contain",
        animation: "crossFadeIn 450ms cubic-bezier(0.25, 1, 0.5, 1) both"
      }
    })
  );
}

function BottomFloatingNav() {
  const [visible, setVisible] = useState(false);
  const { isMobile } = useViewport();
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  if (!visible) return null;
  return React.createElement("div", {
    style: {
      position: "fixed",
      bottom: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "calc(100% - 40px)",
      maxWidth: "460px",
      zIndex: 499,
      background: "rgba(15, 63, 69, 0.88)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      border: "1px solid rgba(201, 168, 76, 0.3)",
      borderRadius: "9999px",
      padding: "8px 16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
      animation: "slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) both"
    }
  },
    React.createElement("div", {
      style: { display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" },
      onClick: () => window.scrollTo({ top: 0, behavior: "smooth" })
    },
      React.createElement(NevLogo, { size: 32 }),
      React.createElement("span", {
        style: {
          fontFamily: "'PP Mondwest', 'Playfair Display', serif",
          fontSize: "14px",
          color: T.white,
          letterSpacing: "0.1em"
        }
      }, "NEVISAN")
    ),
    React.createElement("button", {
      onClick: () => openWhatsApp(),
      style: {
        background: T.gold,
        color: T.tealDark,
        border: "none",
        borderRadius: "9999px",
        padding: "8px 16px",
        fontSize: "12px",
        fontWeight: 700,
        fontFamily: "'Inter'",
        cursor: "pointer",
        boxShadow: "0 2px 10px rgba(201,168,76,0.3)"
      }
    }, "\ud83d\udcac Order on WhatsApp")
  );
}

function TeaQuizModal({ onClose }) {
  const [step, setStep] = React.useState(1);
  const [answers, setAnswers] = React.useState({ time: "", goal: "", taste: "" });
  const [recommendation, setRecommendation] = React.useState(null);

  const handleAnswer = (key, value) => {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);
    if (step < 3) {
      setStep(step + 1);
    } else {
      let rec = "";
      if (updated.time === "Evening" || updated.goal === "Sleep") {
        rec = updated.taste === "Bold" ? "Whiskey Green Tea" : "Chamomile Green Tea";
      } else if (updated.time === "Morning" && updated.goal === "Metabolism") {
        rec = "Lemongrass Green Tea";
      } else if (updated.goal === "Hormonal") {
        rec = "Spearmint Green Tea";
      } else if (updated.taste === "Exotic") {
        rec = "Rum Green Tea";
      } else if (updated.goal === "Immunity") {
        rec = "Tulsi Green Tea";
      } else if (updated.taste === "Pure") {
        rec = "Organic Green Tea";
      } else if (updated.taste === "Floral") {
        rec = "Blue Flower Green Tea";
      } else {
        rec = "GABA Oolong Tea";
      }
      
      const teaObj = TEAS.find(t => t.name === rec) || TEAS[8];
      setRecommendation(teaObj);
      setStep(4);
    }
  };

  const steps = {
    1: {
      question: "When do you typically enjoy your tea?",
      key: "time",
      options: [
        { label: "Morning Energy \ud83c\udf05", value: "Morning" },
        { label: "Afternoon Focus \u26a1", value: "Afternoon" },
        { label: "Evening Calm \ud83c\udf19", value: "Evening" }
      ]
    },
    2: {
      question: "What is your main health or wellness focus?",
      key: "goal",
      options: [
        { label: "Metabolism & Immunity \ud83d\udee1\ufe0f", value: "Metabolism" },
        { label: "Hormonal Balance & Skin \ud83e\uddd6", value: "Hormonal" },
        { label: "Stress Relief & Anxiety \ud83e\uddd8", value: "Stress" },
        { label: "Relaxation & Deep Sleep \ud83d\ude34", value: "Sleep" }
      ]
    },
    3: {
      question: "What flavor notes do you prefer?",
      key: "taste",
      options: [
        { label: "Pure, clean & grassy \ud83c\udf43", value: "Pure" },
        { label: "Refreshing citrus or minty \ud83c\udf4b", value: "Citrus" },
        { label: "Warm, bold & unique \ud83e\udd43", value: "Bold" },
        { label: "Soothing & floral \ud83c\udf38", value: "Floral" }
      ]
    }
  };

  const currentStep = steps[step];

  return ReactDOM.createPortal(
    React.createElement("div", {
      style: {
        position: "fixed",
        inset: 0,
        background: "rgba(15, 63, 69, 0.75)",
        zIndex: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        backdropFilter: "blur(12px)",
        animation: "overlay-fade 0.25s ease both",
      },
      onClick: onClose
    },
    React.createElement("div", {
      style: {
        background: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(201, 168, 76, 0.3)",
        borderRadius: "24px",
        padding: "32px 24px",
        width: "100%",
        maxWidth: "460px",
        boxShadow: "0 24px 64px rgba(0,0,0,0.25)",
        animation: "page-enter 0.3s ease both",
        position: "relative"
      },
      onClick: e => e.stopPropagation()
    },
    React.createElement("button", {
      onClick: onClose,
      style: {
        position: "absolute",
        top: 20,
        right: 20,
        background: "rgba(0,0,0,0.05)",
        border: "none",
        borderRadius: "50%",
        width: 32,
        height: 32,
        cursor: "pointer",
        fontSize: "14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, "\u2715"),
    step < 4 ? React.createElement(React.Fragment, null,
      React.createElement("div", {
        style: {
          fontFamily: "'Inter'",
          fontSize: "10px",
          fontWeight: 700,
          color: T.teal,
          letterSpacing: "0.12em",
          marginBottom: "12px",
          textTransform: "uppercase"
        }
      }, "Step " + step + " of 3"),
      React.createElement("h2", {
        style: {
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "24px",
          color: T.text,
          marginBottom: "24px",
          lineHeight: "1.3"
        }
      }, currentStep ? currentStep.question : ""),
      React.createElement("div", {
        style: { display: "flex", flexDirection: "column", gap: "12px" }
      }, currentStep ? currentStep.options.map(opt =>
        React.createElement("button", {
          key: opt.value,
          onClick: () => handleAnswer(currentStep.key, opt.value),
          style: {
            background: "#fff",
            border: "1px solid " + T.border,
            borderRadius: "12px",
            padding: "16px",
            fontSize: "14px",
            fontFamily: "'Inter'",
            fontWeight: 500,
            color: T.text,
            textAlign: "left",
            cursor: "pointer",
            transition: "all 150ms ease",
            boxShadow: "0 2px 6px rgba(0,0,0,0.02)"
          },
          onMouseEnter: e => {
            e.currentTarget.style.borderColor = T.teal;
            e.currentTarget.style.background = "rgba(27, 122, 130, 0.04)";
          },
          onMouseLeave: e => {
            e.currentTarget.style.borderColor = T.border;
            e.currentTarget.style.background = "#fff";
          }
        }, opt.label)
      ) : null)
    ) : React.createElement(React.Fragment, null,
      React.createElement("div", {
        style: {
          fontFamily: "'Inter'",
          fontSize: "10px",
          fontWeight: 700,
          color: T.gold,
          letterSpacing: "0.12em",
          marginBottom: "8px",
          textTransform: "uppercase"
        }
      }, "Your Perfect Blend"),
      React.createElement("h2", {
        style: {
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "28px",
          color: T.text,
          marginBottom: "16px",
          lineHeight: "1.2"
        }
      }, recommendation ? recommendation.name : ""),
      React.createElement("div", {
        style: {
          background: recommendation ? recommendation.bg : "",
          borderRadius: "16px",
          height: "180px",
          overflow: "hidden",
          marginBottom: "20px"
        }
      },
        React.createElement("img", {
          src: recommendation ? recommendation.img : "",
          alt: recommendation ? recommendation.name : "",
          style: { width: "100%", height: "100%", objectFit: "cover" }
        })
      ),
      React.createElement("p", {
        style: {
          fontFamily: "'Inter'",
          fontSize: "14px",
          color: T.textMuted,
          lineHeight: "1.6",
          marginBottom: "24px"
        }
      }, recommendation ? recommendation.short : ""),
      React.createElement("div", {
        style: { display: "flex", flexDirection: "column", gap: "10px" }
      },
        React.createElement(RippleButton, {
          className: "shine-button",
          onClick: () => {
            if (recommendation) {
              openWhatsApp(recommendation.name);
            }
            onClose();
          },
          style: {
            width: "100%",
            background: "#25D366",
            color: "#fff",
            border: "none",
            borderRadius: "9999px",
            padding: "14px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "'Inter'",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px"
          }
        }, "\ud83d\udcac Order via WhatsApp (MRP \u20b9499)"),
        React.createElement("button", {
          onClick: () => {
            setStep(1);
            setAnswers({ time: "", goal: "", taste: "" });
            setRecommendation(null);
          },
          style: {
            background: "none",
            border: "none",
            color: T.teal,
            fontSize: "12px",
            fontFamily: "'Inter'",
            fontWeight: 500,
            cursor: "pointer",
            textDecoration: "underline"
          }
        }, "Retake Quiz")
      )
    )
    )
    )
    , document.body);
}

function FAQPage({setPage:e}){
  const {isMobile} = useViewport();
  return React.createElement("div",{style:{background:T.cream,minHeight:"100vh",animation:"page-enter 0.5s cubic-bezier(0.16, 1, 0.3, 1) both"}},
    React.createElement(PageHero,{photo:PAGE_PHOTOS.contact,label:"Help & Support",title:"Frequently Asked Questions",subtitle:"Find answers to common questions about our teas, delivery, and garden."}),
    React.createElement("div",{style:{maxWidth:800,margin:"0 auto",padding:isMobile?"48px 20px 80px":"64px 40px 100px"}},
      React.createElement(FAQSection,null)
    ),
    React.createElement(Footer,{setPage:e})
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  React.createElement(App, null),
);
