
const NEVISAN_MARKETPLACE_MAP = {
  amazon: {
    "Spearmint Green Tea": "https://www.amazon.in/dp/B0GTR2GXW2",
    "GABA Oolong Tea": "https://www.amazon.in/dp/B0GTRBXKP8",
    "Organic Green Tea": "https://www.amazon.in/dp/B0FV2N83XD",
    "Blue Flower Green Tea": "https://www.amazon.in/dp/B0FTZ7KQ5B",
    "Lemongrass Green Tea": "https://www.amazon.in/dp/B0FSZSZ1ZM",
    "Tulsi Green Tea": "https://www.amazon.in/dp/B0FSZVRPSG",
    "Chamomile Green Tea": "https://www.amazon.in/dp/B0FV2QGRBM",
    "Whiskey Green Tea": "https://www.amazon.in/dp/B0FSZXVWXD",
    "Rum Green Tea": "https://www.amazon.in/dp/B0FV2QVGVL",
    "Ginger Green Tea": "https://www.amazon.in/dp/B0H6PZYPMP"
  },
  flipkart: {
    "Spearmint Green Tea": "https://www.flipkart.com/product/p/itme?pid=TEAHHYQNAYYQHF5P",
    "Chamomile Green Tea": "https://www.flipkart.com/product/p/itme?pid=TEAHK53HCGSRWHAH",
    "Rum Green Tea": "https://www.flipkart.com/product/p/itme?pid=TEAHK6GMGQAUZDZS",
    "Lemongrass Green Tea": "https://www.flipkart.com/product/p/itme?pid=TEAHHEGBGZ5XCXVZ",
    "Organic Green Tea": "https://www.flipkart.com/product/p/itme?pid=TEAHK63NTFXN8CGS",
    "GABA Oolong Tea": "https://www.flipkart.com/product/p/itme?pid=TEAHHXQAGVCGGGVF",
    "Blue Flower Green Tea": "https://www.flipkart.com/product/p/itme?pid=TEAHK2XFGHV2GRYA",
    "Tulsi Green Tea": "https://www.flipkart.com/product/p/itme?pid=TEAHK7GXBJDKC9XM",
    "Whiskey Green Tea": "https://www.flipkart.com/product/p/itme?pid=TEAHHEJ9YS493UA2",
    "Ginger Green Tea": "https://www.flipkart.com/product/p/itme?pid=TEAHZZMRQGGFAKPS"
  }
};
function getDirectAmazonUrl(name) {
  return NEVISAN_MARKETPLACE_MAP.amazon[name] || "https://www.amazon.in/stores/NEVISAN/page/51CB39DB-29D6-4C38-8CC0-1D10087E5C8E";
}
function getDirectFlipkartUrl(name) {
  return NEVISAN_MARKETPLACE_MAP.flipkart[name] || "https://www.flipkart.com/store/nevisan";
}

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
    if (s && typeof fbq === "function" && window.hasNevisanConsent?.()) {
      fbq("trackCustom", "MarketplaceOutboundClick", {
        content_name: e,
        content_ids: [s],
        content_type: "product",
        destination: t,
        value: 499,
        currency: "INR",
      });
      fbq("track", "InitiateCheckout", {
        content_name: e,
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
      if (typeof IntersectionObserver !== "function") { n(!0); return; }
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
      if (!t || typeof gsap === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const a = t.querySelectorAll("[data-gsap-reveal]");
      if (!a.length || typeof gsap === "undefined") return;
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
      let frame;
      const t = performance.now(),
        o = (a) => {
          const r = Math.min((a - t) / n, 1),
            l = 1 - Math.pow(1 - r, 3);
          (i(Math.round(l * e)), r < 1 && (frame = requestAnimationFrame(o)));
        };
      frame = requestAnimationFrame(o);
      return () => cancelAnimationFrame(frame);
    }, [a, e, n]),
    React.createElement(React.Fragment, null, o + t)
  );
}
if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
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
            if (s && typeof fbq === "function" && window.hasNevisanConsent?.()) {
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
    if (s && typeof fbq === "function" && window.hasNevisanConsent?.()) {
      fbq("track", "Contact", {
        content_name: e,
        content_ids: [s],
        content_type: "product",
        value: 499,
        currency: "INR",
      });
      fbq("track", "InitiateCheckout", {
        content_name: e,
        content_ids: [s],
        content_type: "product",
        value: 499,
        currency: "INR",
      });
    }
  } catch (err) {}
  window.open(
    `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(e ? `Hi Nevisan! I would like to order *${e}* (MRP ₹499 · 1 packet × 50g). Please confirm packet quantity, availability and delivery details.` : "Hi Nevisan! I would like to order your tea. Please help me with the details.")}`,
    "_blank", "noopener,noreferrer",
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
  // Essential clean desktop links (no clutter, no line wrapping)
      const desktopLinks = [
    { label: "Collection", id: "Collection" },
    { label: "Our Story", id: "Our Story" },
    { label: "★ Reviews", id: "Reviews", href: "/reviews/" },
    { label: "Tea Quiz", id: "Quiz", href: "/quiz/" },
    { label: "Wholesale", id: "Wholesale", href: "/bulk/" },
    { label: "Locations", id: "Locations", href: "/locations/" },
    { label: "FAQ", id: "FAQ", href: "/faq" },
    { label: "How to Brew", id: "How to Brew", href: "/how-to-brew/" },
  ];

  // Full links list for mobile drawer & navigation
  const a = [
    "Collection",
    "Our Story",
    "Reviews",
    "Tea Quiz",
    "How to Brew",
    "Wholesale",
    "About",
    "Contact",
    "FAQ",
    "Locations",
  ];

  const locationUrls = {
    "Bangalore": "/locations/tea-delivery-bangalore/",
    "Chennai": "/locations/tea-delivery-chennai/",
    "Delhi": "/locations/tea-delivery-delhi/",
    "Hyderabad": "/locations/tea-delivery-hyderabad/",
    "Jaipur": "/locations/tea-delivery-jaipur/",
    "Kolkata": "/locations/tea-delivery-kolkata/",
    "Mumbai": "/locations/tea-delivery-mumbai/",
    "Pune": "/locations/tea-delivery-pune/",
  };

  const n = "Home" === e;
  const [o, i] = useState(!1);
  const [r, l] = useState(!1);
  const { isMobile: s } = useViewport();

  useEffect(() => {
    const handleScroll = () => i(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: !0 });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    s || l(!1);
  }, [s]);

  useEffect(() => {
    document.body.style.overflow = r ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [r]);

  const c = (item) => {
    if (item === "Reviews") {
      window.location.href = "/reviews/";
    } else if (item === "FAQ") {
      window.location.href = "/faq";
    } else if (item === "Quiz" || item === "Tea Quiz") {
      window.location.href = "/quiz/";
    } else {
      t(item);
      l(!1);
    }
  };

  return React.createElement(React.Fragment, null,
    React.createElement(
      "nav",
      {
        role: "navigation",
        "aria-label": "Main navigation",
        className: "premium-nav",
        style: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: n ? (o ? "rgba(21, 39, 27, 0.96)" : "transparent") : T.teal,
          backdropFilter: (n && o) || r ? "blur(16px)" : "none",
          transition: "background 300ms ease, box-shadow 300ms ease",
          borderBottom: n && o ? "1px solid rgba(201,168,76,0.15)" : "none",
          boxShadow: n && o ? "0 4px 20px rgba(0,0,0,0.25)" : "none",
        },
      },
      React.createElement(
        "div",
        {
          style: {
            maxWidth: 1240,
            margin: "0 auto",
            padding: s ? "0 18px" : "0 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 72,
          },
        },
        /* Logo Brand Block */
        React.createElement(
          "a",
          {
            style: {
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 12,
              flexShrink: 0,
            },
            href: "/", "aria-label": "Nevisan home",
            onClick: event => { if (!event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) { event.preventDefault(); c("Home"); } },
          },
          React.createElement(NevLogo, { size: 40 }),
          React.createElement(
            "span",
            {
              style: {
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: s ? 17 : 20,
                color: T.white,
                letterSpacing: "0.18em",
                fontWeight: 700,
                whiteSpace: "nowrap",
              },
            },
            "NEVISAN",
          ),
        ),

        /* Clean Luxury Desktop Nav Links */
        !s &&
          React.createElement(
            "div",
            {
              style: {
                display: "flex",
                gap: 28,
                alignItems: "center",
              },
            },
            desktopLinks.map((item) => {
              if (item.href) {
                return React.createElement(
                  "a",
                  {
                    key: item.label,
                    href: item.href,
                    style: {
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: 14.5,
                      fontWeight: 500,
                      color: item.label.includes("★") ? "#D4AF37" : "rgba(255,255,255,0.85)",
                      textDecoration: "none",
                      whiteSpace: "nowrap",
                      transition: "color 150ms ease",
                      cursor: "pointer",
                      padding: "6px 0",
                    },
                    onMouseEnter: (e) => (e.currentTarget.style.color = "#FFFFFF"),
                    onMouseLeave: (e) => (e.currentTarget.style.color = item.label.includes("★") ? "#D4AF37" : "rgba(255,255,255,0.85)"),
                  },
                  item.label,
                );
              }
              return React.createElement(
                "button",
                {
                  key: item.label,
                  onClick: () => c(item.id),
                  style: {
                    background: "none",
                    border: "none",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 14.5,
                    fontWeight: 500,
                    color: e === item.id ? T.gold : "rgba(255,255,255,0.85)",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "color 150ms ease",
                    padding: "6px 0",
                  },
                  onMouseEnter: (evt) => {
                    if (e !== item.id) evt.currentTarget.style.color = "#FFFFFF";
                  },
                  onMouseLeave: (evt) => {
                    if (e !== item.id) evt.currentTarget.style.color = "rgba(255,255,255,0.85)";
                  },
                },
                item.label,
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
                  padding: "10px 22px",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  whiteSpace: "nowrap",
                  transition: "transform 200ms, box-shadow 200ms",
                  boxShadow: "0 2px 12px rgba(201,168,76,0.35)",
                  marginLeft: 6,
                },
                onMouseEnter: (e) => {
                  e.currentTarget.style.transform = "scale(1.04)";
                  e.currentTarget.style.boxShadow = "0 4px 18px rgba(201,168,76,0.55)";
                },
                onMouseLeave: (e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 2px 12px rgba(201,168,76,0.35)";
                },
              },
              "Shop Now",
            ),
          ),

        /* Mobile Header Actions (WhatsApp + Hamburger) */
        s &&
          React.createElement(
            "div",
            { style: { display: "flex", alignItems: "center", gap: 12 } },
            React.createElement(
              "button",
              {
                onClick: () => openWhatsApp(),
                style: {
                  background: "#25D366",
                  color: "#fff",
                  border: "none",
                  borderRadius: 9999,
                  padding: "8px 14px",
                  fontSize: 13.5,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'Plus Jakarta Sans'",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                },
              },
              "💬 Order",
            ),
            React.createElement(
              "button",
              {
                onClick: () => l((prev) => !prev),
                "aria-label": r ? "Close menu" : "Open menu",
                "aria-expanded": r,
                "aria-controls": "mobile-menu",
                style: {
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                },
              },
              React.createElement(HamburgerIcon, { open: r }),
            ),
          ),
      ),
    ),

    /* Mobile Drawer Menu */
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
            overflowY: "auto",
            animation: "overlay-fade 0.25s ease both",
          },
        },
        React.createElement(
          "div",
          {
            style: {
              padding: "24px 24px 40px",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            },
          },
          a.map((item, idx) => {
            if (item === "Reviews") {
              return React.createElement(
                "a",
                {
                  key: item,
                  href: "/reviews/",
                  style: {
                    textAlign: "left",
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: 24,
                    fontWeight: 400,
                    color: "#D4AF37",
                    padding: "12px 0",
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  },
                },
                React.createElement("span", { style: { color: "#C9A84C", fontSize: 18 } }, "★"),
                "Customer Reviews",
              );
            }
            if (item === "How to Brew") {
              return React.createElement("a", {key:item, href:"/how-to-brew/", style:{fontFamily:"'Playfair Display', Georgia, serif",fontSize:24,color:"rgba(255,255,255,0.9)",padding:"12px 0",textDecoration:"none",borderBottom:"1px solid rgba(255,255,255,0.08)"}}, "How to Brew");
            }
            if (item === "Tea Quiz") {
              return React.createElement(
                "a",
                {
                  key: item,
                  href: "/quiz/",
                  style: {
                    textAlign: "left",
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: 24,
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.9)",
                    padding: "12px 0",
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                  },
                },
                "Tea Finder Quiz",
              );
            }
            if (item === "FAQ") {
              return React.createElement(
                "a",
                {
                  key: item,
                  href: "/faq",
                  style: {
                    textAlign: "left",
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: 24,
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.9)",
                    padding: "12px 0",
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                  },
                },
                "FAQ & Brewing Guide",
              );
            }
            if (item === "Locations") {
              return React.createElement(
                "a",
                {
                  key: item,
                  href: "/locations/",
                  style: {
                    textAlign: "left",
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: 24,
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.9)",
                    padding: "12px 0",
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                  },
                },
                "Delivery & Locations",
              );
            }
            return React.createElement(
              "button",
              {
                key: item,
                onClick: () => c(item),
                style: {
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 24,
                  fontWeight: 400,
                  color: e === item ? "#D4AF37" : "rgba(255,255,255,0.9)",
                  padding: "12px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                },
              },
              item,
            );
          }),
          React.createElement(
            "div",
            { style: { marginTop: 28 } },
            React.createElement(
              "button",
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
                  padding: "15px",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "'Plus Jakarta Sans'",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                },
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
                  padding: "15px",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "'Plus Jakarta Sans'",
                },
              },
              "💬 Order on WhatsApp",
            ),
          ),
        ),
      ),
  );
}
function Ticker() {
  const e = [
      "PACKED IN GUWAHATI",
      "FSSAI LICENSED",
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
            { style: { color: T.gold, fontSize: 16 } },
            "●",
          ),
          e,
        ),
      ),
    ),
  );
}
function Hero({ setPage }) {
  return React.createElement(NevisanPremium.Hero, { setPage });
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
    "name": "Lemongrass Green Tea",
    "short": "Bright citrus with a gentle grassy finish.",
    "tags": [
      "WHOLE LEAF",
      "ASSAM"
    ],
    "bg": "#d4edd8",
    "color": "#3a7a50",
    "img": "teas/lemongrass-lifestyle.webp",
    "price": 499,
    "badge": "BRIGHT CITRUS",
    "brew": "90°C · 2–3 min · Can steep twice",
    "benefits": [
      {
        "icon": "🌿",
        "title": "Tasting character",
        "desc": "Bright citrus with a gentle grassy finish."
      },
      {
        "icon": "☕",
        "title": "Your brewing ritual",
        "desc": "Follow your pack’s brewing guide and adjust the strength to taste."
      },
      {
        "icon": "🍃",
        "title": "Whole-leaf tea",
        "desc": "Green and oolong teas naturally contain caffeine."
      }
    ]
  },
  {
    "name": "Blue Flower Green Tea",
    "short": "Delicate florals and a vivid blue cup.",
    "tags": [
      "WHOLE LEAF",
      "ASSAM"
    ],
    "bg": "#c8dff0",
    "color": "#2a5a8a",
    "img": "teas/blue-flower-lifestyle.webp",
    "price": 499,
    "badge": "BLUE BOTANICALS",
    "brew": "85°C · 2–3 min · No milk needed",
    "benefits": [
      {
        "icon": "🌿",
        "title": "Tasting character",
        "desc": "Delicate florals and a vivid blue cup."
      },
      {
        "icon": "☕",
        "title": "Your brewing ritual",
        "desc": "Follow your pack’s brewing guide and adjust the strength to taste."
      },
      {
        "icon": "🍃",
        "title": "Whole-leaf tea",
        "desc": "Green and oolong teas naturally contain caffeine."
      }
    ]
  },
  {
    "name": "Rum Green Tea",
    "short": "Sugarcane warmth, spices and oak notes.",
    "tags": [
      "WHOLE LEAF",
      "ASSAM"
    ],
    "bg": "#f5e9a0",
    "color": "#8a6a10",
    "img": "teas/rum-lifestyle.webp",
    "price": 499,
    "badge": "ZERO ALCOHOL",
    "bestseller": true,
    "brew": "90°C · 3 min · Excellent hot or iced",
    "benefits": [
      {
        "icon": "🌿",
        "title": "Tasting character",
        "desc": "Sugarcane warmth, spices and oak notes."
      },
      {
        "icon": "☕",
        "title": "Your brewing ritual",
        "desc": "Follow your pack’s brewing guide and adjust the strength to taste."
      },
      {
        "icon": "🍃",
        "title": "Whole-leaf tea",
        "desc": "Green and oolong teas naturally contain caffeine."
      }
    ]
  },
  {
    "name": "Spearmint Green Tea",
    "short": "Refreshing mint with a clean, bright finish.",
    "tags": [
      "WHOLE LEAF",
      "ASSAM"
    ],
    "bg": "#e8d4f0",
    "color": "#6a3a8a",
    "img": "teas/spearmint-lifestyle.webp",
    "price": 499,
    "badge": "COOL MINT",
    "brew": "85°C · 2 min · Light and refreshing",
    "benefits": [
      {
        "icon": "🌿",
        "title": "Tasting character",
        "desc": "Refreshing mint with a clean, bright finish."
      },
      {
        "icon": "☕",
        "title": "Your brewing ritual",
        "desc": "Follow your pack’s brewing guide and adjust the strength to taste."
      },
      {
        "icon": "🍃",
        "title": "Whole-leaf tea",
        "desc": "Green and oolong teas naturally contain caffeine."
      }
    ]
  },
  {
    "name": "Tulsi Green Tea",
    "short": "Herbaceous warmth with a fragrant tulsi note.",
    "tags": [
      "WHOLE LEAF",
      "ASSAM"
    ],
    "bg": "#d4edd8",
    "color": "#3a7a50",
    "img": "teas/tulsi-lifestyle.webp",
    "price": 499,
    "badge": "HERBAL AROMA",
    "brew": "90°C · 3–4 min · Best plain or with honey",
    "benefits": [
      {
        "icon": "🌿",
        "title": "Tasting character",
        "desc": "Herbaceous warmth with a fragrant tulsi note."
      },
      {
        "icon": "☕",
        "title": "Your brewing ritual",
        "desc": "Follow your pack’s brewing guide and adjust the strength to taste."
      },
      {
        "icon": "🍃",
        "title": "Whole-leaf tea",
        "desc": "Green and oolong teas naturally contain caffeine."
      }
    ]
  },
  {
    "name": "Chamomile Green Tea",
    "short": "Soft florals with honeyed apple notes.",
    "tags": [
      "WHOLE LEAF",
      "ASSAM"
    ],
    "bg": "#f5e9a0",
    "color": "#8a6a10",
    "img": "teas/chamomile-lifestyle.webp",
    "price": 499,
    "badge": "SOFT FLORAL",
    "brew": "85°C · 4 min · Soft floral cup",
    "benefits": [
      {
        "icon": "🌿",
        "title": "Tasting character",
        "desc": "Soft florals with honeyed apple notes."
      },
      {
        "icon": "☕",
        "title": "Your brewing ritual",
        "desc": "Follow your pack’s brewing guide and adjust the strength to taste."
      },
      {
        "icon": "🍃",
        "title": "Whole-leaf tea",
        "desc": "Green and oolong teas naturally contain caffeine."
      }
    ]
  },
  {
    "name": "Whiskey Green Tea",
    "short": "A bold cup with malt and smoky oak notes.",
    "tags": [
      "WHOLE LEAF",
      "ASSAM"
    ],
    "bg": "#e0d4c8",
    "color": "#5a4030",
    "img": "teas/whiskey-lifestyle.webp",
    "price": 499,
    "badge": "ZERO ALCOHOL",
    "brew": "90°C · 3 min · Bold, best enjoyed slowly",
    "benefits": [
      {
        "icon": "🌿",
        "title": "Tasting character",
        "desc": "A bold cup with malt and smoky oak notes."
      },
      {
        "icon": "☕",
        "title": "Your brewing ritual",
        "desc": "Follow your pack’s brewing guide and adjust the strength to taste."
      },
      {
        "icon": "🍃",
        "title": "Whole-leaf tea",
        "desc": "Green and oolong teas naturally contain caffeine."
      }
    ]
  },
  {
    "name": "GABA Oolong Tea",
    "short": "Toasty amber, stone fruit and smooth honey.",
    "tags": [
      "WHOLE LEAF",
      "ASSAM"
    ],
    "bg": "#c0e0dc",
    "color": "#1b7a82",
    "img": "teas/gaba-lifestyle.webp",
    "price": 499,
    "badge": "MELLOW OOLONG",
    "brew": "85°C · 3 min · Nitrogen-anaerobic processed",
    "benefits": [
      {
        "icon": "🌿",
        "title": "Tasting character",
        "desc": "Toasty amber, stone fruit and smooth honey."
      },
      {
        "icon": "☕",
        "title": "Your brewing ritual",
        "desc": "Follow your pack’s brewing guide and adjust the strength to taste."
      },
      {
        "icon": "🍃",
        "title": "Whole-leaf tea",
        "desc": "Green and oolong teas naturally contain caffeine."
      }
    ]
  },
  {
    "name": "Organic Green Tea",
    "short": "Fresh, grassy notes and whole-leaf character.",
    "tags": [
      "WHOLE LEAF",
      "ASSAM"
    ],
    "bg": "#c8e8c0",
    "color": "#2a6a2a",
    "img": "teas/organic-lifestyle.webp",
    "price": 499,
    "badge": "ORGANIC",
    "brew": "80°C · 2 min · Never boiling water",
    "benefits": [
      {
        "icon": "🌿",
        "title": "Tasting character",
        "desc": "Fresh, grassy notes and whole-leaf character."
      },
      {
        "icon": "☕",
        "title": "Your brewing ritual",
        "desc": "Follow your pack’s brewing guide and adjust the strength to taste."
      },
      {
        "icon": "🍃",
        "title": "Whole-leaf tea",
        "desc": "Green and oolong teas naturally contain caffeine."
      }
    ]
  },
  {
    "name": "Ginger Green Tea",
    "short": "Ginger warmth with a mellow green-tea finish.",
    "tags": [
      "WHOLE LEAF",
      "ASSAM"
    ],
    "bg": "#fdf2e9",
    "color": "#935116",
    "img": "teas/ginger-lifestyle.webp",
    "price": 499,
    "badge": "WARMING GINGER",
    "brew": "85°C · 2–3 min · Best warm",
    "benefits": [
      {
        "icon": "🌿",
        "title": "Tasting character",
        "desc": "Ginger warmth with a mellow green-tea finish."
      },
      {
        "icon": "☕",
        "title": "Your brewing ritual",
        "desc": "Follow your pack’s brewing guide and adjust the strength to taste."
      },
      {
        "icon": "🍃",
        "title": "Whole-leaf tea",
        "desc": "Green and oolong teas naturally contain caffeine."
      }
    ]
  }
];
function TagChip({ label: e, color: t }) {
  return React.createElement(
    "span",
    {
      style: {
        fontFamily: "'Plus Jakarta Sans'",
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

function BuyModal({ tea: e, onClose: t }) {
  const { isMobile: n } = useViewport();
  useEffect(() => {
    const e = (e) => "Escape" === e.key && t();
    return (
      window.addEventListener("keydown", e),
      () => window.removeEventListener("keydown", e)
    );
  }, [t]);
  return ReactDOM.createPortal(
    React.createElement(
      "div",
      {
        role: "dialog",
        "aria-modal": "true",
        "aria-label": `Buy ${e.name}`,
        onClick: (e) => {
          e.stopPropagation();
          t();
        },
        style: {
          position: "fixed",
          inset: 0,
          background: "rgba(15, 39, 27, 0.65)",
          backdropFilter: "blur(6px)",
          zIndex: 9999,
          display: "flex",
          alignItems: n ? "flex-end" : "center",
          justifyContent: "center",
          padding: n ? 0 : 20,
          animation: "overlay-fade 0.2s ease both",
        },
      },
      React.createElement(
        "div",
        {
          onClick: (e) => e.stopPropagation(),
          style: {
            background: "#ffffff",
            borderRadius: n ? "24px 24px 0 0" : 20,
            width: "100%",
            maxWidth: 460,
            padding: n ? "24px 20px 32px" : "28px 24px",
            boxShadow: "0 24px 60px rgba(0,0,0,0.3)",
            border: `1px solid ${T.border}`,
            animation: n ? "slide-up 0.25s ease both" : "page-enter 0.25s ease both",
          },
        },
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            },
          },
          React.createElement(
            "div",
            null,
            React.createElement(
              "span",
              {
                style: {
                  fontFamily: "'Plus Jakarta Sans'",
                  fontSize: 16,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  color: T.gold,
                  textTransform: "uppercase",
                },
              },
              "Choose where to buy",
            ),
            React.createElement(
              "h3",
              {
                style: {
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 22,
                  color: T.text,
                  margin: "4px 0 0",
                },
              },
              e.name,
            ),
          ),
          React.createElement(
            "button",
            {
              onClick: t,
              "aria-label": "Close",
              style: {
                background: "rgba(0,0,0,0.06)",
                border: "none",
                borderRadius: "50%",
                width: 34,
                height: 34,
                fontSize: 16,
                cursor: "pointer",
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
              gap: 10,
              marginTop: 14,
            },
          },
          React.createElement(
            "button",
            {
              onClick: () => {
                openWhatsApp(e.name);
                t();
              },
              style: {
                width: "100%",
                background: "#25D366",
                color: "#fff",
                border: "none",
                borderRadius: 12,
                padding: "14px 16px",
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 14,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                transition: "filter 0.2s",
              },
              onMouseEnter: (e) => (e.currentTarget.style.filter = "brightness(1.08)"),
              onMouseLeave: (e) => (e.currentTarget.style.filter = "none"),
            },
            React.createElement("span", { style: { fontSize: 22 } }, "💬"),
            React.createElement(
              "div",
              { style: { textAlign: "left", flex: 1 } },
              React.createElement(
                "div",
                { style: { fontWeight: 600, fontSize: 16 } },
                "Order Direct via WhatsApp",
              ),
              React.createElement(
                "div",
                { style: { fontSize: 13, opacity: 0.9, marginTop: 2 } },
                "Order enquiries and delivery details",
              ),
            ),
            React.createElement("span", { style: { fontSize: 20, fontWeight: 700 } }, "›"),
          ),
          React.createElement(
            "button",
            {
              onClick: () => {
                trackExternalClick(e.name, "Amazon");
                window.open(
                  getDirectAmazonUrl(e?.name || (typeof t !== 'undefined' && t?.name) || (typeof tea !== 'undefined' && tea?.name) || ""),
                  "_blank", "noopener,noreferrer",
                );
                t();
              },
              style: {
                width: "100%",
                background: "#FF9900",
                color: "#000",
                border: "none",
                borderRadius: 12,
                padding: "14px 16px",
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 14,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                transition: "filter 0.2s",
              },
              onMouseEnter: (e) => (e.currentTarget.style.filter = "brightness(1.08)"),
              onMouseLeave: (e) => (e.currentTarget.style.filter = "none"),
            },
            React.createElement("span", { style: { fontSize: 22 } }, "🛒"),
            React.createElement(
              "div",
              { style: { textAlign: "left", flex: 1 } },
              React.createElement(
                "div",
                { style: { fontWeight: 600, fontSize: 16 } },
                "Buy on Amazon India",
              ),
              React.createElement(
                "div",
                { style: { fontSize: 13, opacity: 0.8, marginTop: 2 } },
                "Check price, seller and delivery on Amazon",
              ),
            ),
            React.createElement("span", { style: { fontSize: 20, fontWeight: 700 } }, "›"),
          ),
          React.createElement(
            "button",
            {
              onClick: () => {
                trackExternalClick(e.name, "Flipkart");
                window.open(getDirectFlipkartUrl(e?.name || t?.name || ""), "_blank", "noopener,noreferrer");
                t();
              },
              style: {
                width: "100%",
                background: "#2874F0",
                color: "#fff",
                border: "none",
                borderRadius: 12,
                padding: "14px 16px",
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 14,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                transition: "filter 0.2s",
              },
              onMouseEnter: (e) => (e.currentTarget.style.filter = "brightness(1.08)"),
              onMouseLeave: (e) => (e.currentTarget.style.filter = "none"),
            },
            React.createElement("span", { style: { fontSize: 22 } }, "🛍️"),
            React.createElement(
              "div",
              { style: { textAlign: "left", flex: 1 } },
              React.createElement(
                "div",
                { style: { fontWeight: 600, fontSize: 16 } },
                "Buy on Flipkart",
              ),
              React.createElement(
                "div",
                { style: { fontSize: 13, opacity: 0.9, marginTop: 2 } },
                "Check price, seller and delivery on Flipkart",
              ),
            ),
            React.createElement("span", { style: { fontSize: 20, fontWeight: 700 } }, "›"),
          ),
        ),
      ),
    ),
    document.body,
  );
}


function TeaCard({ tea, onView, onImageClick }) {
  return React.createElement(NevisanPremium.TeaCard, { tea, onView, onImageClick, BuyModal });
}
function ImageLightbox({ img: e, name: t, onClose: a }) {
  return (
    useEffect(() => {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const e = (e) => {
        "Escape" === e.key && a();
      };
      return (
        window.addEventListener("keydown", e),
        () => { window.removeEventListener("keydown", e); document.body.style.overflow = previousOverflow; }
      );
    }, []),
    ReactDOM.createPortal(React.createElement(
      "div",
      {
        onClick: a,
        role: "dialog",
        "aria-modal": "true",
        "aria-label": "Image preview",
        style: {
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.92)",
          zIndex: 500,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px 24px 110px",
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
          maxHeight: "calc(100vh - 160px)",
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
            textAlign: "center",
            maxWidth: "90vw",
          },
        },
        React.createElement("span", { style: { display: "block", marginBottom: 8 } }, t),
        React.createElement("a", { href: `/products/${t.toLowerCase().replace(/\s+/g, "-")}/`, onClick: (event) => event.stopPropagation(), style: { color: "#fff", fontFamily: "Plus Jakarta Sans, Arial, sans-serif", fontSize: 14, display: "inline-block", padding: "8px 16px", border: "1px solid rgba(255,255,255,.5)", borderRadius: 3, textDecoration: "none" } }, "View product page \u2197"),
      ),
    ), document.body)
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
          TEAS.find((x) => x.name.toLowerCase() === __tea.toLowerCase() || teaSlug(x.name) === __tea.toLowerCase());
        if (__f) {
          t(__f);
          const url = new URL(window.location.href);
          url.searchParams.delete("tea");
          url.hash = "collection";
          window.history.replaceState({}, "", url.href);
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
      subtitle: "Whole-leaf Assam tea, with plain, floral, mint and spice flavours.",
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
          "Choose your flavour",
        ),
        React.createElement(
          "p",
          {
            style: {
              fontFamily: "'Plus Jakarta Sans'",
              fontSize: 16,
              color: T.textMuted,
              maxWidth: 480,
              margin: "0 auto",
            },
          },
          "Compare the tasting notes and choose a tea you would like to try.",
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
          { label: "Botanical Blends", value: "BOTANICAL" },
          { label: "Specialty Blends", value: "SPECIALTY" }
        ].map(filter => {
          const isSelected = activeFilter === filter.value;
          return React.createElement(
            "button",
            {
              key: filter.value,
              onClick: () => setActiveFilter(filter.value), "aria-pressed": isSelected,
              style: {
                background: isSelected ? "#1F2E24" : "rgba(31, 46, 36, 0.04)",
                color: isSelected ? "#F8F6F2" : "#1F2E24",
                border: isSelected ? "1px solid #1F2E24" : "1px solid rgba(31, 46, 36, 0.1)",
                borderRadius: 9999,
                padding: o ? "14px 14px" : "14px 20px",
                fontSize: 16,
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
          style: { display: "grid", gridTemplateColumns: r, gap: o ? 16 : 32 },
        },
        TEAS.filter(tea => {
          if (activeFilter === "ALL") return true;
          if (activeFilter === "GREEN") return tea.name !== "GABA Oolong Tea";
          if (activeFilter === "BOTANICAL") {
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
              role: "dialog",
              "aria-modal": "true",
              "aria-label": e.name,
              onKeyDown: (event) => {
                if (event.key === "Escape") { event.stopPropagation(); t(null); }
              },
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
            React.createElement("a", { href: `/products/${e.name.toLowerCase().replace(/\s+/g, "-")}/`, style: { display: "block", padding: "16px 20px", color: T.teal, fontWeight: 600 } }, "View full product page \u2197"),
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
                        "aria-label": "Close",
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
                              getDirectAmazonUrl(e?.name || (typeof t !== 'undefined' && t?.name) || (typeof tea !== 'undefined' && tea?.name) || ""),
                              "_blank", "noopener,noreferrer",
                            );
                          },
                          style: {
                            background: "#FF9900",
                            color: "#fff",
                            border: "none",
                            borderRadius: 9999,
                            padding: "14px",
                            fontSize: 16,
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
                              getDirectFlipkartUrl(e?.name || (typeof t !== "undefined" && t?.name) || (typeof tea !== "undefined" && tea?.name) || ""),
                              "_blank", "noopener,noreferrer",
                            );
                          },
                          style: {
                            background: "#2874F0",
                            color: "#fff",
                            border: "none",
                            borderRadius: 9999,
                            padding: "14px",
                            fontSize: 16,
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
                              fontFamily: "'Plus Jakarta Sans'",
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
                                    fontFamily: "'Plus Jakarta Sans'",
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
                                    fontFamily: "'Plus Jakarta Sans'",
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
                                fontFamily: "'Plus Jakarta Sans'",
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
                                fontFamily: "'Plus Jakarta Sans'",
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
                          fontFamily: "'Plus Jakarta Sans'",
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
                                getDirectAmazonUrl(e?.name || (typeof t !== 'undefined' && t?.name) || (typeof tea !== 'undefined' && tea?.name) || ""),
                                "_blank", "noopener,noreferrer",
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
                                getDirectFlipkartUrl(e?.name || (typeof t !== "undefined" && t?.name) || (typeof tea !== "undefined" && tea?.name) || ""),
                                "_blank", "noopener,noreferrer",
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
                                      fontFamily: "'Plus Jakarta Sans'",
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
                                      fontFamily: "'Plus Jakarta Sans'",
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
                                fontFamily: "'Plus Jakarta Sans'",
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
                                fontFamily: "'Plus Jakarta Sans'",
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
        desc: "Try a second steep in the same session. Taste as you go and stop when the cup is too light for you.",
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
        title: "Read the pack, know the tea",
        desc: "Check the ingredients, batch details and declarations on your pouch. Ask us if you need help reading them.",
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
        title: "Packed with care",
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
              fontFamily: "'Plus Jakarta Sans'",
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
              fontFamily: "'Plus Jakarta Sans'",
              fontSize: 16,
              color: "rgba(255,255,255,0.72)",
              lineHeight: 1.75,
              marginBottom: 20,
            },
          },
          "Nevisan brings whole-leaf tea from Golaghat, Assam, to your everyday cup. Start with the plain green tea, then explore the mint, floral and spiced blends to find what you enjoy.",
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
          'A cup, a strainer and a few minutes are enough. Good tea should be easy to make your own.',
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
                  fontFamily: "'Plus Jakarta Sans'",
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
                    fontFamily: "'Plus Jakarta Sans'",
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
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
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
          fontFamily: "'Plus Jakarta Sans'",
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
          background: e.primary ? T.gold : T.tealDark,
          color: e.primary ? T.tealDark : T.white,
          border: e.primary ? `1.5px solid ${T.gold}` : `1.5px solid ${T.gold}`,
          borderRadius: 9999,
          padding: "14px 20px",
          fontSize: 16,
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "'Plus Jakarta Sans'",
          display: "flex",
          marginTop: "auto",
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
        desc: "Order directly and ask us about your tea",
        cta: "💬 Order on WhatsApp",
        icon: "🌿",
        action: () => openWhatsApp(),
        primary: !0,
        badge: "RECOMMENDED",
      },
      {
        name: "Amazon India",
        desc: "Check delivery availability for your address",
        cta: "📦 Shop on Amazon",
        icon: "📦",
        action: () =>
          window.open(
            getDirectAmazonUrl(e?.name || (typeof t !== 'undefined' && t?.name) || (typeof tea !== 'undefined' && tea?.name) || ""),
            "_blank", "noopener,noreferrer",
          ),
        primary: !1,
      },
      {
        name: "Flipkart",
        desc: "See current stock and delivery details",
        cta: "🛍️ Shop on Flipkart",
        icon: "🛍️",
        action: () =>
          window.open(getDirectFlipkartUrl(e?.name || t?.name || ""), "_blank", "noopener,noreferrer"),
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
            fontFamily: "'Plus Jakarta Sans'",
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
            inView: t, index: a, }), ), ),
React.createElement("div", { style: { textAlign: "center", marginTop: 48, marginBottom: 32 } }, React.createElement("a", { href: "/reviews/", style: { display: "inline-flex", alignItems: "center", gap: 10, background: T.teal, color: T.white, border: `1.5px solid ${T.gold}`, borderRadius: 9999, padding: "14px 32px", fontFamily: "'Plus Jakarta Sans'", fontSize: 16, fontWeight: 600, textDecoration: "none", cursor: "pointer" } }, React.createElement("span", { style: { color: T.gold } }, "★"), "Explore marketplace feedback", React.createElement("span", null, "→"))),
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
            { key: t, style: { color: T.gold, fontSize: 16 } },
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
          fontFamily: "'Plus Jakarta Sans'",
          fontSize: 16,
          fontWeight: 600,
          color: T.teal,
        },
      },
      e.name,
    ),
    React.createElement(
      "div",
      { style: { fontFamily: "'Plus Jakarta Sans'", fontSize: 16, color: T.textMuted } },
      e.loc,
    ),
  );
}
function StarRating({ value: e, onChange: t }) {
  const [a, n] = React.useState(0);
  return React.createElement(
    "div",
    { role: "radiogroup", "aria-label": "Product rating", style: { display: "flex", gap: 8, alignItems: "center" } },
    [1, 2, 3, 4, 5].map((o) =>
      React.createElement(
        "button",
        {
          key: o,
          type: "button",
          role: "radio",
          "aria-checked": o <= (a || e),
          "aria-label": o + " out of 5 stars",
          onMouseEnter: () => t && n(o),
          onMouseLeave: () => t && n(0),
          onClick: () => t && t(o),
          style: {
            background: "none",
            border: "none",
            padding: "2px 4px",
            fontSize: 34,
            cursor: t ? "pointer" : "default",
            color: o <= (a || e) ? "#f5a623" : "rgba(201, 168, 76, 0.45)",
            textShadow: o <= (a || e) ? "0 0 8px rgba(245, 166, 35, 0.4)" : "none",
            transition: "color 120ms, transform 120ms, text-shadow 120ms",
            transform: o <= (a || e) ? "scale(1.2)" : "scale(1)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: 1,
          },
        },
        "★",
      ),
    ),
    React.createElement(
      "span",
      { style: { fontFamily: "'Plus Jakarta Sans'", fontSize: 13, color: "#5C7064", marginLeft: 8 } },
      (a || e) > 0 ? (a || e) + " of 5 stars" : "(Click to rate)"
    )
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
      fontSize: 16,
      color: "#1a1a1a",
      background: "#fff",
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
              fontFamily: "'Plus Jakarta Sans'",
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
              "_blank", "noopener,noreferrer",
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
                fontFamily: "'Plus Jakarta Sans'",
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
                  fontFamily: "'Plus Jakarta Sans'",
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
                  fontFamily: "'Plus Jakarta Sans'",
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
                fontFamily: "'Plus Jakarta Sans'",
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
                fontFamily: "'Plus Jakarta Sans'",
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
                fontFamily: "'Plus Jakarta Sans'",
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
              fontFamily: "'Plus Jakarta Sans'",
              fontSize: 16,
              fontWeight: 600,
              transition: "filter 200ms",
            },
            onMouseEnter: (e) =>
              (e.currentTarget.style.filter = "brightness(1.1)"),
            onMouseLeave: (e) => (e.currentTarget.style.filter = "none"),
          },
          "💬 Submit Review via WhatsApp →",
        ),
        React.createElement(
          "p",
          {
            style: {
              fontFamily: "'Plus Jakarta Sans'",
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
  return React.createElement("section", {className:"polish-review"},
    React.createElement("div", {className:"polish-review__inner"},
      React.createElement("div", null,
        React.createElement("p", {className:"lux-eyebrow",style:{color:"#7e6840"}}, "THE NEVISAN COMMUNITY"),
        React.createElement("h2", null, "Every cup has a story."),
        React.createElement("p", null, "Read current feedback on the marketplace where you shop, or share your own experience with Nevisan.")),
      React.createElement("div", {className:"polish-review__links"},
        React.createElement("a", {href:"/reviews/"}, "Explore tea notes & reviews ↗"),
        React.createElement("a", {href:"/quiz/"}, "Find your first cup ↗"))));
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
                fontFamily: "'Plus Jakarta Sans'",
                fontSize: 16,
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.7)",
                marginTop: 20,
                maxWidth: 280,
              },
            },
            "Packed with care in Guwahati.",
            React.createElement("br", null),
            "care@nevisan.in · +91 98642 45687",
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
                padding: "14px 20px",
                fontSize: 16,
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
                  fontSize: 16,
                  color: "rgba(255,255,255,0.6)",
                  letterSpacing: "0.06em",
                },
              },
              "FSSAI 10325001000313 (Marketer) · FSSAI 20321120000114 (Manufacturer)",
            ),
            React.createElement(
              "div",
              {
                style: {
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: 6,
                  padding: "5px 12px",
                  fontFamily: "'Plus Jakarta Sans'",
                  fontSize: 16,
                  color: "rgba(255,255,255,0.6)",
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
                fontFamily: "'Plus Jakarta Sans'",
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: "0.12em",
                color: "#D4AF37",
                textTransform: "uppercase",
                marginBottom: 20,
              },
            },
            "Collection",
          ),
                    [
            { label: "Spearmint", slug: "spearmint-green-tea" },
            { label: "Chamomile", slug: "chamomile-green-tea" },
            { label: "GABA Oolong", slug: "gaba-oolong-tea" },
            { label: "Lemongrass", slug: "lemongrass-green-tea" },
            { label: "Tulsi (Holy Basil)", slug: "tulsi-green-tea" },
            { label: "Blue Butterfly Pea", slug: "blue-flower-green-tea" },
            { label: "Spiced Rum (0.0%)", slug: "rum-green-tea" },
            { label: "Smoky Whiskey (0.0%)", slug: "whiskey-green-tea" },
            { label: "Ginger", slug: "ginger-green-tea" },
            { label: "Classic Organic", slug: "organic-green-tea" },
          ].map(({ label: t, slug: s }) =>
            React.createElement(
              "a",
              {
                key: t,
                href: `/products/${s}/`,
                style: {
                  fontFamily: "'Plus Jakarta Sans'",
                  fontSize: 16,
                  color: "rgba(255,255,255,0.55)",
                  marginBottom: 10,
                  display: "block",
                  textDecoration: "none",
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
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: "0.12em",
                color: "#D4AF37",
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
            "How to Brew",
            "Wholesale",
            "FAQ",
            "Quiz",
          ].map((t) =>
            React.createElement(
              "a",
              {
                key: t,
                href: ({About:"/#company",Certifications:"/#certifications",Journal:"/journal/","How to Brew":"/how-to-brew/",Wholesale:"/bulk/",FAQ:"/faq/",Quiz:"/quiz/"})[t],
                style: {
                  fontFamily: "'Plus Jakarta Sans'",
                  fontSize: 16,
                  color: "rgba(255,255,255,0.55)",
                  marginBottom: 10, display: "block", textDecoration: "none",
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
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: "0.12em",
                color: "#D4AF37",
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
              url: getDirectAmazonUrl(e?.name || (typeof t !== 'undefined' && t?.name) || (typeof tea !== 'undefined' && tea?.name) || ""),
            },
            {
              label: "Flipkart",
              url: "https://www.flipkart.com/store/nevisan",
            },
          ].map(({ label: e, url: t }) =>
            React.createElement(
              "a",
              {
                key: e,
                href: t, target: "_blank", rel: "noopener noreferrer",
                style: {
                  fontFamily: "'Plus Jakarta Sans'",
                  fontSize: 16,
                  color: "rgba(255,255,255,0.55)",
                  marginBottom: 10, display: "block", textDecoration: "none",
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
          React.createElement("span", null, "\u00b7"),
          React.createElement(
            "a",
            {
              href: "/terms-of-service.html",
              style: {
                color: "rgba(255,255,255,0.45)",
                textDecoration: "none",
              },
            },
            "Terms",
          ),
          React.createElement("span", null, "\u00b7"),
          React.createElement(
            "a",
            {
              href: "/privacy-policy.html",
              style: {
                color: "rgba(255,255,255,0.45)",
                textDecoration: "none",
              },
            },
            "Privacy",
          )
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
  const { isMobile: n } = useViewport(),
    [r, l] = useState(null),
    [activeLightbox, setActiveLightbox] = useState(null);
  const featured = ["GABA Oolong Tea", "Spearmint Green Tea", "Blue Flower Green Tea"].map(name => TEAS.find(tea => tea.name === name));
  return React.createElement(
    "section",
    { className: "lux-collection", id: "premium-collection", "aria-labelledby": "lux-collection-title" },
    React.createElement("div", { className: "lux-collection__inner" },
      React.createElement("div", { className: "lux-collection__header" },
        React.createElement("div", null,
          React.createElement("p", { className: "lux-eyebrow" }, "THE NEVISAN COLLECTION"),
          React.createElement("h2", { id: "lux-collection-title" }, "Find your next cup."),
          React.createElement("p", { className: "lux-collection__intro" }, "From a toasty oolong to refreshing mint and delicate florals. Every cup begins with whole Assam leaves.")
        ),
        React.createElement("button", { type: "button", className: "lux-collection__view-all", onClick: () => e("Collection") }, "Explore all ten teas ↗")
      ),
      React.createElement("div", { className: "lux-collection__grid" },
        featured.map(tea => React.createElement(TeaCard, { key: tea.name, tea, onView: l, onImageClick: (img, name) => setActiveLightbox({ img, name }) }))
      ),
      React.createElement("a", { className: "lux-collection__quiz", href: "/quiz/" }, "Looking for your first cup?", React.createElement("span", null, "Find your tea ↗"))
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
                        "aria-label": "Close",
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
                              getDirectAmazonUrl(e?.name || (typeof t !== 'undefined' && t?.name) || (typeof tea !== 'undefined' && tea?.name) || ""),
                              "_blank", "noopener,noreferrer",
                            );
                          },
                          style: {
                            background: "#FF9900",
                            color: "#fff",
                            border: "none",
                            borderRadius: 9999,
                            padding: "14px",
                            fontSize: 16,
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
                              getDirectFlipkartUrl(e?.name || (typeof t !== "undefined" && t?.name) || (typeof tea !== "undefined" && tea?.name) || ""),
                              "_blank", "noopener,noreferrer",
                            );
                          },
                          style: {
                            background: "#2874F0",
                            color: "#fff",
                            border: "none",
                            borderRadius: 9999,
                            padding: "14px",
                            fontSize: 16,
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
                              fontFamily: "'Plus Jakarta Sans'",
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
                                    fontFamily: "'Plus Jakarta Sans'",
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
                                    fontFamily: "'Plus Jakarta Sans'",
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
                                fontFamily: "'Plus Jakarta Sans'",
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
                                fontFamily: "'Plus Jakarta Sans'",
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
                          fontFamily: "'Plus Jakarta Sans'",
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
                                getDirectAmazonUrl(e?.name || (typeof t !== 'undefined' && t?.name) || (typeof tea !== 'undefined' && tea?.name) || ""),
                                "_blank", "noopener,noreferrer",
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
                                getDirectFlipkartUrl(e?.name || (typeof t !== "undefined" && t?.name) || (typeof tea !== "undefined" && tea?.name) || ""),
                                "_blank", "noopener,noreferrer",
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
                                    fontFamily: "'Plus Jakarta Sans'",
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
                                    fontFamily: "'Plus Jakarta Sans'",
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
                                fontFamily: "'Plus Jakarta Sans'",
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
                                fontFamily: "'Plus Jakarta Sans'",
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
                fontFamily: "'Plus Jakarta Sans'",
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
              fontFamily: "'Plus Jakarta Sans'",
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
                    fontFamily: "'Plus Jakarta Sans'",
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
                    fontFamily: "'Plus Jakarta Sans'",
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
      { p: 0.95, text: "Infusion complete. A sunny floral cup. This green-tea blend contains caffeine." }
    ]
  }
};

function HowToBrewSection() {
  return React.createElement(NevisanAtelier.ProductAtelier);
}
function FAQSection() {
  const { isMobile: e } = useViewport(),
    [t, a] = useState(null);
      const frontFaqs = [
  {
    "q": "What makes Nevisan whole-leaf tea distinctive?",
    "a": "Nevisan offers whole-leaf teas sourced from Golaghat, Assam, with botanical blends including lemongrass, spearmint, tulsi and chamomile. Explore each pack for its ingredients, origin and brewing instructions."
  },
  {
    "q": "Does Nevisan tea contain caffeine?",
    "a": "Blends containing green tea or oolong naturally contain caffeine. The amount in your cup varies with the leaves, serving size and preparation. Adding herbs or flowers does not make a green-tea blend caffeine-free."
  },
  {
    "q": "Where is Nevisan tea grown?",
    "a": "Our whole-leaf tea is sourced from Golaghat in Assam. Each blend pairs that tea with its own botanical ingredients or leaves it unblended for a classic cup."
  },
  {
    "q": "How do I brew whole-leaf green tea for the best taste?",
    "a": "Follow the temperature, leaf quantity and steeping time on your chosen pack. Avoid boiling water for green tea and adjust your steeping time to taste."
  },
  {
    "q": "Can I steep Nevisan whole-leaf tea more than once?",
    "a": "Yes, you can re-steep whole leaves with fresh hot water. The flavor changes between infusions; follow the pack instructions and adjust each steep to your preference."
  },
  {
    "q": "Which Nevisan tea variety suits my daily routine?",
    "a": "Choose Lemongrass for citrus notes, Spearmint for cool mint, Tulsi for herbal aroma, Chamomile for a floral cup, GABA Oolong for a mellow flavor, and Ginger for spice. Rum and Whiskey blends offer distinctive non-alcoholic flavors. Consider the caffeine content when choosing your serving time."
  }
];

  return React.createElement(
    "section",
    {
      id: "faq-section",
      style: { background: T.cream, padding: e ? "60px 20px" : "100px 32px" },
    },
    React.createElement(
      "div",
      { style: { maxWidth: 780, margin: "0 auto" } },
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
              marginBottom: 12,
            },
          },
          "Frequently Asked Questions",
        ),
        React.createElement(
          "p",
          {
            style: {
              fontFamily: "'Plus Jakarta Sans'",
              fontSize: 15,
              color: T.textMuted,
              maxWidth: 540,
              margin: "0 auto",
            },
          },
          "Answers about ingredients, brewing and placing an order.",
        ),
      ),
      React.createElement(
        "div",
        { style: { display: "flex", flexDirection: "column", gap: 12 } },
        frontFaqs.map((n, o) => {
          const isOpened = t === o;
          return React.createElement(
            "div",
            {
              key: o,
              style: {
                background: T.white,
                borderRadius: 14,
                border: `1px solid ${isOpened ? T.teal : T.border}`,
                overflow: "hidden",
                boxShadow: isOpened
                  ? "0 8px 24px rgba(21, 39, 27, 0.08)"
                  : "0 2px 8px rgba(0,0,0,0.03)",
                transition: "all 200ms ease",
              },
            },
            React.createElement(
              "button",
              {
                onClick: () => a(isOpened ? null : o),
                "aria-expanded": isOpened, "aria-controls": "home-faq-answer-" + o,
                style: {
                  width: "100%",
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  padding: e ? "16px 18px" : "20px 24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 16,
                  cursor: "pointer",
                  fontFamily: "'Plus Jakarta Sans'",
                },
              },
              React.createElement(
                "span",
                {
                  style: {
                    fontSize: e ? 15 : 16,
                    fontWeight: 600,
                    color: isOpened ? T.teal : T.text,
                    lineHeight: 1.4,
                  },
                },
                n.q,
              ),
              React.createElement(
                "span",
                {
                  style: {
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: isOpened ? T.teal : "rgba(21, 39, 27, 0.06)",
                    color: isOpened ? "#fff" : T.teal,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                    flexShrink: 0,
                    transform: isOpened ? "rotate(45deg)" : "rotate(0deg)",
                    transition: "transform 200ms ease, background 200ms ease",
                  },
                },
                "+",
              ),
            ),
            isOpened &&
              React.createElement(
                "div",
                { id: "home-faq-answer-" + o,
                  style: {
                    padding: e ? "0 18px 18px" : "0 24px 22px",
                    fontFamily: "'Plus Jakarta Sans'",
                    fontSize: 16,
                    color: T.textMuted,
                    lineHeight: 1.7,
                    borderTop: "1px solid #f0ede6",
                    paddingTop: 14,
                  },
                },
                n.a,
              ),
          );
        }),
      ),
      React.createElement(
        "div",
        {
          style: {
            textAlign: "center",
            marginTop: 44,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
          },
        },
        React.createElement(
          "a",
          {
            href: "/faq",
            style: {
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: T.teal,
              color: "#ffffff",
              borderRadius: 9999,
              padding: "14px 32px",
              fontFamily: "'Plus Jakarta Sans'",
              fontSize: 15,
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 4px 16px rgba(21, 39, 27, 0.2)",
              transition: "all 200ms ease",
            },
            onMouseEnter: (e) => {
              e.currentTarget.style.filter = "brightness(1.15)";
              e.currentTarget.style.transform = "translateY(-2px)";
            },
            onMouseLeave: (e) => {
              e.currentTarget.style.filter = "none";
              e.currentTarget.style.transform = "none";
            },
          },
          "See all 40 questions →",
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
              padding: "10px 22px",
              fontFamily: "'Plus Jakarta Sans'",
              fontSize: 13,
              fontWeight: 600,
              textDecoration: "none",
            },
          },
          "💬 Have a specific question? Ask on WhatsApp",
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
    React.createElement(NevisanPremium.OriginStrip, null),
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
            fontFamily: "'Plus Jakarta Sans'",
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
              fontFamily: "'Plus Jakarta Sans'",
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
        "Our tea begins in Golaghat, Assam. Explore the leaf, the blends and the way you like to brew.",
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
                fontFamily: "'Plus Jakarta Sans'",
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
            "From Golaghat to your cup"
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
              title: "Our Assam source",
              desc: "Our tea leaves come from Golaghat, Assam. That source is the starting point for the green tea and oolong in our collection. Nevisan is packed and marketed from Guwahati.",
            },
            {
              num: "02",
              title: "Room for the leaf to open",
              desc: "Whole leaves need room to brew. Use a roomy strainer, follow the guide on your pack and pour the tea off the leaves when it reaches the strength you like.",
            },
            {
              num: "03",
              title: "Choose the flavour you enjoy",
              desc: "We believe tea should be full of character. Our whole-leaf blends offer cool Spearmint, mellow GABA Oolong, soft Chamomile flowers, and bold, non-alcoholic Whiskey and Rum notes. Choose the flavor that fits your tea ritual.",
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
    "slug": "science-behind-gaba-tea",
    "title": "GABA Oolong Tea: Getting to Know the Cup",
    "excerpt": "Meet Nevisan GABA Oolong Tea: its toasty character, how to brew a first cup and what to look for in a second steep."
  },
  {
    "slug": "spearmint-tea-hormonal-balance",
    "title": "Getting to Know Spearmint Green Tea",
    "excerpt": "What spearmint brings to a green-tea blend, how the cup tastes and how to find a brew you enjoy."
  },
  {
    "slug": "best-spearmint-tea-for-pcos-in-india",
    "title": "Buying Spearmint Green Tea: Check the Ingredients",
    "excerpt": "Compare spearmint tea by its ingredients, pack size, source and brewing instructions before choosing a blend."
  },
  {
    "slug": "pcos-spearmint-tea-daily-routine",
    "title": "A Daily Spearmint Tea Ritual",
    "excerpt": "A simple way to make spearmint green tea part of your day, with room to adjust the strength to your taste."
  },
  {
    "slug": "best-chamomile-tea-for-sleep-in-india",
    "title": "Chamomile Green Tea: Choosing a Floral Cup",
    "excerpt": "Understand the difference between chamomile green tea and a pure chamomile infusion before buying."
  },
  {
    "slug": "chamomile-green-tea-evening-blend",
    "title": "Chamomile Green Tea: A Floral Tea Ritual",
    "excerpt": "Make a gentle floral cup of chamomile green tea and adjust it without losing the character of the leaf."
  },
  {
    "slug": "best-blue-tea-butterfly-pea-flower-india",
    "title": "Butterfly Pea Green Tea: A Buying Guide",
    "excerpt": "What to check when buying blue flower tea, from the green-tea base to serving size and colour."
  },
  {
    "slug": "blue-butterfly-pea-flower-tea",
    "title": "Butterfly Pea Green Tea: Colour and Taste",
    "excerpt": "Explore the blue flower blend as a drink: a mild floral cup, a green-tea base and a colour change with lemon."
  },
  {
    "slug": "tulsi-green-tea-adaptogen",
    "title": "Tulsi Green Tea: An Herbaceous Assam Blend",
    "excerpt": "Get to know tulsi green tea through its aroma, green-tea base and a straightforward first brew."
  },
  {
    "slug": "best-green-tea-for-weight-loss-in-india",
    "title": "Whole-Leaf Green Tea: A Practical Buying Guide",
    "excerpt": "Choose whole-leaf green tea by flavour, ingredients, pack size and brewing needs rather than a weight-loss promise."
  },
  {
    "slug": "best-green-tea-for-weight-loss-energy-sleep",
    "title": "Choose Your Green Tea by Taste and Routine",
    "excerpt": "Match green tea to the flavours and tea breaks you enjoy, with clear expectations about caffeine."
  },
  {
    "slug": "green-tea-health-benefits-complete-guide",
    "title": "Green Tea: Ingredients, Caffeine and Brewing",
    "excerpt": "A clear starting point for green tea: read the ingredients, understand caffeine and brew a cup to your taste."
  },
  {
    "slug": "green-tea-vs-coffee-caffeine",
    "title": "Green Tea and Coffee: Two Different Cups",
    "excerpt": "Compare the taste, preparation and caffeine expectations of green tea and coffee without relying on a fixed caffeine claim."
  },
  {
    "slug": "how-to-choose-right-tea-for-your-lifestyle",
    "title": "Choose Tea by Flavour and Routine",
    "excerpt": "A short guide to choosing between plain green tea, oolong, mint, floral and warming Nevisan blends."
  },
  {
    "slug": "morning-vs-evening-teas",
    "title": "Tea for Your Morning and Evening Rituals",
    "excerpt": "Choose a tea break around your taste and caffeine preferences, without assuming an evening blend is caffeine-free."
  },
  {
    "slug": "rum-green-tea-how-we-made-it",
    "title": "Rum Green Tea: A Warm, Spiced Cup",
    "excerpt": "Taste Nevisan Rum Green Tea as a spirit-inspired blend, with warm sugarcane, spice and oak notes."
  },
  {
    "slug": "non-alcoholic-botanical-whiskey-rum-tea",
    "title": "Whiskey and Rum Green Tea: Two Flavour Profiles",
    "excerpt": "Compare the smoky malt notes of Whiskey Green Tea with the warmer spice and sugarcane notes of Rum Green Tea."
  },
  {
    "slug": "why-whole-leaf-tea-tastes-different",
    "title": "Why Whole-Leaf Tea Tastes Different",
    "excerpt": "Notice how leaf size, brewing time and room to unfurl affect your whole-leaf tea."
  },
  {
    "slug": "why-we-dont-blend-across-gardens",
    "title": "Why We Choose Tea from Golaghat",
    "excerpt": "Why origin matters to Nevisan, and how to distinguish the source of a tea leaf from the ingredients in a blend."
  },
  {
    "slug": "golaghat-indias-hidden-tea-belt",
    "title": "Golaghat: Where Our Tea Begins",
    "excerpt": "Meet the Golaghat, Assam origin behind Nevisan’s green tea and oolong collection."
  },
  {
    "slug": "what-pgs-india-certification-means",
    "title": "What PGS-India Certification Means",
    "excerpt": "Understand PGS-India’s peer-appraisal approach and the details to check on an organic certificate."
  },
  {
    "slug": "organic-green-tea-vs-regular-green-tea",
    "title": "Organic and Other Green Teas: What to Compare",
    "excerpt": "Compare green teas through certification, ingredients, freshness and taste rather than assuming a label guarantees the better cup."
  },
  {
    "slug": "5-ways-to-tell-if-your-green-tea-is-adulterated",
    "title": "Five Checks Before You Buy Green Tea",
    "excerpt": "Check a green-tea pack’s ingredients, seal, dates, seller and documentation; taste alone cannot establish purity."
  },
  {
    "slug": "how-to-buy-real-green-tea-india",
    "title": "How to Buy Green Tea in India",
    "excerpt": "A practical checklist for buying green tea online: ingredients, source, weight, dates and seller details."
  },
  {
    "slug": "the-real-cost-of-cheap-tea-bags",
    "title": "Comparing the Cost of Tea per Cup",
    "excerpt": "Work out the cost of a tea serving from the pack weight and leaf amount, with a clear example for a 50g Nevisan pouch."
  },
  {
    "slug": "why-your-green-tea-tastes-bitter",
    "title": "Why Green Tea Tastes Bitter: Adjusting Your Brew",
    "excerpt": "Change time, temperature or leaf amount to find a green-tea brew that suits you."
  },
  {
    "slug": "how-to-store-green-tea-at-home",
    "title": "How to Store Green Tea at Home",
    "excerpt": "Keep dry tea sealed and away from moisture, heat, light and strong smells, using the date and instructions on your pack."
  },
  {
    "slug": "how-to-get-three-steeps",
    "title": "Getting More Than One Steep from Whole-Leaf Tea",
    "excerpt": "Try a second and third steep during the same tea session, adjusting by taste without promising a fixed number of cups."
  },
  {
    "slug": "art-of-tea-tasting-beginners-guide",
    "title": "Tea Tasting: A Guide for Your First Comparison",
    "excerpt": "Taste two teas side by side, notice aroma and texture, and keep notes you can use for the next brew."
  },
  {
    "slug": "assam-whole-leaf-tea-guide",
    "title": "A Guide to Assam Whole-Leaf Tea",
    "excerpt": "Understand leaf size, green tea and oolong, and how to start brewing Assam whole-leaf tea."
  },
  {
    "slug": "ultimate-guide-to-green-tea-in-india",
    "title": "Green Tea in India: From Pack to Cup",
    "excerpt": "A practical introduction to choosing, brewing and storing green tea, with a starting point in the Nevisan collection."
  },
  {
    "slug": "cold-brew-green-tea-guide",
    "title": "Cold-Brew Green Tea: A Small First Batch",
    "excerpt": "Try a small refrigerated batch of whole-leaf green tea and adjust the amount to suit your taste."
  },
  {
    "slug": "cold-brew-lemongrass-iced-tea",
    "title": "Lemongrass Iced Tea: A Small Cold Brew",
    "excerpt": "Make a small refrigerated lemongrass green-tea brew, then taste it plain or with a little lime."
  },
  {
    "slug": "blue-pea-lemon-mocktail-recipe",
    "title": "Blue Flower Tea with Lemon and Sparkling Water",
    "excerpt": "Make a blue flower green-tea drink with ice, lemon and sparkling water, tasting as you add the citrus."
  }
];
function JournalPage({setPage}) {
 return React.createElement("div", {className:"premium-site"},
  React.createElement(PageHero,{photo:PAGE_PHOTOS.journal,label:"THE NEVISAN JOURNAL",title:"Stories from leaf to cup",subtitle:"Origin, flavour and thoughtful brewing. Find a new way to enjoy your everyday tea."}),
  React.createElement("div",{className:"journal-wrapper",style:{paddingTop:48}},
   React.createElement("ul",{className:"post-list"},POSTS.map(post=>React.createElement("li",{className:"post-item",key:post.slug},
    React.createElement("a",{className:"post-link",href:"/journal/"+post.slug+"/"},React.createElement("h2",{className:"post-title"},post.title),React.createElement("p",{className:"post-excerpt"},post.excerpt),React.createElement("span",null,"Read the guide ↗")))))),
  React.createElement(Footer,{setPage}));
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
        "Whole-leaf Assam tea, packed with care in Guwahati.",
      subtitle: "Meet the collection and the people behind Nevisan.",
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
                fontFamily: "'Plus Jakarta Sans'",
                fontSize: 16,
                color: T.textMuted,
                lineHeight: 1.8,
                marginBottom: 16,
              },
            },
            "We want more people to enjoy the whole-leaf tea grown in Assam. Nevisan offers a plain green tea, a toasty oolong and blends with mint, flowers and warming spice notes.",
          ),
          React.createElement(
            "p",
            {
              style: {
                fontFamily: "'Plus Jakarta Sans'",
                fontSize: 16,
                color: T.textMuted,
                lineHeight: 1.8,
              },
            },
            "Our leaves come from Golaghat and our packs are marketed by Mahabir Enterprise in Guwahati. Each product page includes pack artwork, ingredients and brewing guidance so you can choose a tea with clear expectations.",
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
              text: "Organic declarations — see your pack and request current documents",
            },
            { icon: "🔬", text: "FSSAI licence details shown on the pack" },
            { icon: "📦", text: "Small batch — freshness sealed in every pack" },
            {
              icon: "💬",
              text: "Order directly through WhatsApp or choose a marketplace",
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
                  style: { fontFamily: "'Plus Jakarta Sans'", fontSize: 16, color: T.text },
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
                fontFamily: "'Plus Jakarta Sans'",
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
                fontFamily: "'Plus Jakarta Sans'",
                fontSize: 16,
                color: T.textMuted,
                lineHeight: 1.75,
                maxWidth: 560,
                margin: "0 auto",
              },
            },
            "Nevisan is based in Guwahati, with tea sourced from Golaghat. We built the collection around flavours we want customers to explore, from plain whole-leaf tea to mint, citrus and floral blends.",
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
            "Thank you for choosing Nevisan. Try the tea plain on your first brew, then adjust it to your taste. If you need help choosing a blend, reading a pack or sorting out an order, contact us on WhatsApp or at care@nevisan.in.",
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
                fontFamily: "'Plus Jakarta Sans'",
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
                fontFamily: "'Plus Jakarta Sans'",
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
              bio: "Nishant is a founder of Nevisan, based in Guwahati, Assam. For questions about the collection or an order, contact the Nevisan team.",
            },
            {
              initials: "UJ",
              name: "Uditi Jain",
              role: "Founder & Creative Director",
              bio: "Uditi is a founder and creative director of Nevisan. The collection pairs whole-leaf tea with a considered presentation, from the pouch to the product gallery.",
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
                    fontFamily: "'Plus Jakarta Sans'",
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
          "Talk to the Nevisan team",
        ),
        React.createElement(
          "p",
          {
            style: {
              fontFamily: "'Plus Jakarta Sans'",
              fontSize: 16,
              color: "rgba(255,255,255,0.8)",
              lineHeight: 1.7,
              maxWidth: 540,
              margin: "0 auto 28px",
            },
          },
          "Nevisan is marketed by Mahabir Enterprise in Guwahati. If you have a question about a tea, its packaging or an order, contact us directly. We can help you compare the blends and check the details before you buy.",
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
        "Read the licence details below. Contact us for current sourcing and certification documents for your pack.",
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
            name: "FSSAI licence details",
            number: "FSSAI 10325001000313 (Marketer) · FSSAI 20321120000114 (Manufacturer)",
            icon: "\ud83c\udfdb",
            color: "#1b4f8a",
            desc: "Marketer and manufacturer licence numbers are listed here and on the packaging. A licence number is not a product-specific laboratory report.",
          },
          {
            name: "PGS-India Organic",
            number: "PGS Organic Certified",
            icon: "\ud83c\udf3f",
            color: "#2a6a2a",
            desc: "PGS-India uses a participatory assurance process. Ask us for the current certificate and its product coverage before relying on a certification claim.",
          },
          {
            name: "GST Registered",
            number: "GSTIN 18AFAPJ8203P1Z7",
            icon: "\ud83d\udcbc",
            color: "#722f37",
            desc: "GST registration details for Mahabir Enterprise are available with your invoice and business documentation.",
          },
          {
            name: "Assam sourcing",
            number: "Golaghat, Assam",
            icon: "\ud83d\udccd",
            color: "#8a4a10",
            desc: "Our tea is sourced from Golaghat, Assam. Botanical and flavoured blends contain additional ingredients; check the declaration on your pack. Contact us for batch and sourcing documents.",
          },
          {
            name: "Whole-leaf tea",
            number: "No CTC \u2022 No Dust \u2022 No Fannings",
            icon: "\ud83c\udf43",
            color: "#1b7a82",
            desc: "The collection uses whole or large-broken tea leaves. The product galleries show the leaves and pack artwork so you can see what you are choosing.",
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
                  fontFamily: "'Plus Jakarta Sans'",
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
                fontFamily: "'Plus Jakarta Sans'",
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
            desc: "Serve premium single-origin Assam tea on your menu. Supplied in 50g packets. Tell us how many packets you need.",
          },
          {
            icon: "🏨",
            title: "Hotels & Resorts",
            desc: "In-room and restaurant tea service. Supplied in 50g packets for your tea service.",
          },
          {
            icon: "🎁",
            title: "Corporate Gifting",
            desc: "50g tea packets for employees, clients and corporate events. Share the number of packets and your preferred teas.",
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
                  fontFamily: "'Plus Jakarta Sans'",
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
                fontFamily: "'Plus Jakarta Sans'",
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
              { icon: "✓", text: "Each packet is 50g" },
              { icon: "✓", text: "Choose the number of packets you need" },
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
                      fontFamily: "'Plus Jakarta Sans'",
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
                  fontFamily: "'Plus Jakarta Sans'",
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
                  fontFamily: "'Plus Jakarta Sans'",
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
                fontFamily: "'Plus Jakarta Sans'",
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
                label: "Number of 50g Packets",
                placeholder: "e.g. 50",
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
                  type: e.key === "qty" ? "number" : "text",
                  min: e.key === "qty" ? 1 : undefined,
                  step: e.key === "qty" ? 1 : undefined,
                  value: a[e.key],
                  onChange: (t) =>
                    n((a) => ({ ...a, [e.key]: t.target.value })),
                  "aria-label": e.label,
                  placeholder: e.placeholder,
                  style: {
                    width: "100%",
                    padding: "11px 14px",
                    borderRadius: 10,
                    border: "1.5px solid #e8e4de",
                    fontFamily: "'Plus Jakarta Sans'",
                    fontSize: 16,
                    color: T.text,
                    background: "#fff",
                    boxSizing: "border-box",
                  },
                  onFocus: (e) => (e.target.style.borderColor = T.teal),
                  onBlur: (e) => (e.target.style.borderColor = "#e8e4de"),
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
                  "Preferred teas and packets per tea, delivery date and location…",
                rows: 3,
                style: {
                  width: "100%",
                  padding: "11px 14px",
                  borderRadius: 10,
                  border: "1.5px solid #e8e4de",
                  fontFamily: "'Plus Jakarta Sans'",
                  fontSize: 16,
                  color: T.text,
                  background: "#fff",
                  resize: "vertical",
                  boxSizing: "border-box",
                },
                onFocus: (e) => (e.target.style.borderColor = T.teal),
                onBlur: (e) => (e.target.style.borderColor = "#e8e4de"),
              }),
            ),
            React.createElement(
              "button",
              {
                onClick: () => {
                  if (!Number.isSafeInteger(Number(a.qty)) || Number(a.qty) < 1) {
                    window.alert("Enter a whole number of 50g packets (at least 1).");
                    return;
                  }
                  window.open(
                    `https://wa.me/919864245687?text=${encodeURIComponent(`Hi Nevisan! I'd like to inquire about wholesale/bulk ordering.\n\nName: ${a.name}\nBusiness: ${a.business}\nBusiness Type: ${a.type}\nQuantity: ${a.qty} packets × 50g each\nMessage: ${a.message}`)}`,
                    "_blank", "noopener,noreferrer",
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
      fontSize: 16,
      color: T.text,
      background: T.white,
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
              value: "care@nevisan.in",
              action: () => window.open("mailto:care@nevisan.in"),
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
              e.action ? "button" : "div",
              {
                key: t, type: e.action ? "button" : undefined,
                onClick: e.action || void 0,
                style: {
                  display: "flex",
                  gap: 16,
                  alignItems: "flex-start",
                  marginBottom: 28,
                  cursor: e.action ? "pointer" : "default", background: "none", border: "none", padding: 0, textAlign: "left", width: "100%",
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
                      fontFamily: "'Plus Jakarta Sans'",
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
                  fontFamily: "'Plus Jakarta Sans'",
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
                  fontFamily: "'Plus Jakarta Sans'",
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
                  "Your WhatsApp draft is ready",
                ),
                React.createElement(
                  "p",
                  {
                    style: {
                      fontFamily: "'Plus Jakarta Sans'",
                      fontSize: 16,
                      color: T.textMuted,
                    },
                  },
                  "Review your draft and press Send in WhatsApp to contact us. Opening the draft does not send your message.",
                ),
                React.createElement("a", { href: `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hi Nevisan! My name is ${a.name}. ${a.message} (Reply to: ${a.email})`)}`, target: "_blank", rel: "noopener noreferrer", style: { display: "block", marginTop: 18, color: T.teal } }, "Open your WhatsApp draft →"),
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
                      fontSize: 16,
                    },
                  },
                  "Return to the form",
                ),
              )
            : React.createElement(
                "form",
                {
                  onSubmit: (e) => {
                    (e.preventDefault(),
                      window.open(
                        `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hi Nevisan! My name is ${a.name}. ${a.message} (Reply to: ${a.email})`)}`,
                        "_blank", "noopener,noreferrer",
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
                    "aria-label": "Your name",
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
                    "aria-label": "Email",
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
                    "aria-label": "Message",
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

// ── COOKIE CONSENT BANNER (DPDP & GDPR COMPLIANT) ──
function CookieConsentBanner() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    let consent = null;
    try { consent = localStorage.getItem("nevisan_cookie_consent"); } catch (e) {}
    let timer;
    if (consent !== "accepted" && consent !== "declined") {
      timer = setTimeout(() => setVisible(true), 1200);
    }
    const hide = () => { clearTimeout(timer); setVisible(false); };
    window.addEventListener("nevisan-consent-change", hide);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("nevisan-consent-change", hide);
    };
  }, []);

  const handleConsent = (accepted) => {
    if (typeof window.updateNevisanConsent === "function") {
      window.updateNevisanConsent(accepted);
      setVisible(false);
    }
  };

  if (!visible) return null;

  return React.createElement(
    "div",
    {
      role: "region",
      "aria-label": "Cookie Consent",
      style: {
        position: "fixed",
        bottom: "20px",
        left: "20px",
        right: "20px",
        maxWidth: "480px",
        background: "#15271B",
        color: "#F8F6F2",
        padding: "18px 22px",
        borderRadius: "14px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
        zIndex: 99999,
        border: "1px solid rgba(201,168,76,0.3)",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: "13.5px",
        lineHeight: "1.5",
        animation: "fadeIn 0.3s ease"
      }
    },
    React.createElement(
      "p",
      { style: { margin: "0 0 12px 0", color: "#E0DDD5" } },
      "We use cookies to improve your browsing experience, analyze traffic, and support secure order processing in accordance with our ",
      React.createElement(
        "a",
        {
          href: "/privacy-policy.html",
          style: { color: "#C9A84C", textDecoration: "underline" }
        },
        "Privacy Policy"
      ),
      "."
    ),
    React.createElement(
      "div",
      { style: { display: "flex", gap: "10px", justifyContent: "flex-end" } },
      React.createElement(
        "button",
        {
          onClick: () => handleConsent(false),
          style: {
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.3)",
            color: "#fff",
            padding: "6px 14px",
            borderRadius: "6px",
            fontSize: "12.5px",
            cursor: "pointer"
          }
        },
        "Decline"
      ),
      React.createElement(
        "button",
        {
          onClick: () => handleConsent(true),
          style: {
            background: "#C9A84C",
            border: "none",
            color: "#15271B",
            fontWeight: "700",
            padding: "6px 16px",
            borderRadius: "6px",
            fontSize: "12.5px",
            cursor: "pointer"
          }
        },
        "Accept All"
      )
    )
  );
}

const NEVISAN_PAGE_ROUTES = { Home: "", Collection: "collection", "Our Story": "our-story", About: "company", Journal: "journal", Contact: "contact", Certifications: "certifications", Wholesale: "wholesale" };
function getNevisanPageFromUrl(href) {
  try {
    const url = new URL(href, "https://nevisan.in/");
    if (url.searchParams.get("tea")) return "Collection";
    const route = (url.searchParams.get("page") || decodeURIComponent(url.hash.slice(1))).toLowerCase();
    if (route === "about") return "Our Story";
    return Object.keys(NEVISAN_PAGE_ROUTES).find(page => NEVISAN_PAGE_ROUTES[page] === route || page.toLowerCase() === route) || "Home";
  } catch (_) { return "Home"; }
}
function App() {
  const [e, t] = useState(() => getNevisanPageFromUrl(window.location.href)),
    [a, n] = useState("undefined" != typeof window ? window.innerWidth : 1200);
  useEffect(() => {
    const syncPage = () => {
      const page = getNevisanPageFromUrl(window.location.href);
      if (page === "Journal") { window.location.replace("/journal/"); return; }
      t(page);
    };
    syncPage();
    window.addEventListener("popstate", syncPage);
    window.addEventListener("hashchange", syncPage);
    return () => {
      window.removeEventListener("popstate", syncPage);
      window.removeEventListener("hashchange", syncPage);
    };
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
      if (e === "Journal") { window.location.assign("/journal/"); return; }
      const url = new URL(window.location.href);
      url.searchParams.delete("tea");
      url.searchParams.delete("page");
      url.hash = NEVISAN_PAGE_ROUTES[e] || "";
      if (url.href !== window.location.href) window.history.pushState({}, "", url.href);
      t(e);
      window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
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
        React.createElement(ScrollProgress, { "aria-hidden": "true" }),
        React.createElement(CursorGlow, { "aria-hidden": "true" }),
        React.createElement(Nav, { page: e, setPage: i }),
        React.createElement("main", { id: "main-content" }, r),
        React.createElement(CookieConsentBanner, null),
        React.createElement(CartFAB, null),
        React.createElement(WhatsAppFAB, null),
      ),
    )
  );
}
function CartSheet({ onClose: e }) {
  const { cart: t, updateQty: a, clearCart: n } = useCart(),
    o = (useViewport(), t.reduce((e, t) => e + (t.tea.price || 499) * t.qty, 0)),
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
                  fontFamily: "'Plus Jakarta Sans'",
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
                      fontFamily: "'Plus Jakarta Sans'",
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
                      fontFamily: "'Plus Jakarta Sans'",
                      fontSize: 16,
                      fontWeight: 700,
                      color: T.teal,
                    },
                  },
                  "₹",
                  (e.tea.price || 499) * e.qty,
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
                  if (skus.length > 0 && typeof fbq === "function" && window.hasNevisanConsent?.()) {
                    fbq("track", "InitiateCheckout", {
                      content_ids: skus,
                      content_type: "product",
                      num_items: i,
                      value: o,
                      currency: "INR",
                    });
                    fbq("trackCustom", "WhatsAppOrderClick", {
                      content_ids: skus,
                      num_items: i,
                      value: o,
                      currency: "INR",
                    });
                  }
                } catch (err) {}
                const a = t
                  .map((e) => `• ${e.tea.name} x${e.qty} = ₹${(e.tea.price || 499) * e.qty}`)
                  .join("\n");
                (window.open(
                  `https://wa.me/919864245687?text=${encodeURIComponent(`Hi Nevisan! I'd like to place an order:\n\n${a}\n\nTotal: ₹${o} (${i} packs × 50gm)\n\nPlease confirm my order and share delivery details.`)}`,
                  "_blank", "noopener,noreferrer",
                ),
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
            "aria-label": "Open shopping cart",
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
        fontSize: 16,
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
ReactDOM.createRoot(document.getElementById("root")).render(
  React.createElement(App, null),
);
