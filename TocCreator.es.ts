import { defineComponent as T, ref as d, onMounted as w, watch as $, openBlock as f, createElementBlock as m, createElementVNode as g, createTextVNode as B, normalizeClass as x, toDisplayString as y, withDirectives as k, Fragment as E, renderList as Y, vShow as M } from "vue";
function X(n, s) {
  let t = 0, o = n.length - 1;
  for (; t <= o; ) {
    let e = Math.floor((t + o) / 2);
    if (n[e] === s)
      return e;
    n[e] > s ? o = e - 1 : t = e + 1;
  }
  return o;
}
function C(n, s) {
  let t = !1, o, e;
  return function c(...r) {
    if (t) {
      o = r, e = this;
      return;
    }
    t = !0, n.apply(this, r), setTimeout(() => {
      t = !1, o.length && (c.apply(e, o), o = [], e = {});
    }, s);
  };
}
function b(n, s = n) {
  let t = !1, o = 0, e = 0, c, r;
  n.onpointerdown = (l) => {
    c = l.pageX, r = l.pageY, t = !0;
  };
  const a = C(function(l) {
    if (t) {
      let u = l.pageX - c, i = l.pageY - r;
      s.style.transform = `translate3d(${o + u}px,${e + i}px,0)`;
    }
  }, 100);
  document.onpointermove = a, document.onpointerup = (l) => {
    t && (o += l.pageX - c, e += l.pageY - r, s.style.transform = `translate3d(${o}px,${e}px,0)`), t = !1;
  };
}
const A = { class: "toc remove" }, I = { class: "dragBar" }, N = ["id", "onClick"], S = /* @__PURE__ */ T({
  __name: "TocCreator",
  props: {
    container: { default: "" },
    scrollTop: null
  },
  setup(n) {
    const s = n, t = d();
    let o = d(0);
    s.scrollTop ? o.value = s.scrollTop.value : window.addEventListener("scroll", function() {
      o.value = window.pageYOffset;
    }), w(() => {
      const c = document.getElementsByClassName("dragBar")[0], r = document.getElementsByClassName("toc")[0];
      b(c, r), t.value = Array.from(
        document.querySelectorAll(`${s.container} h2,h3,h4,h5,h6`)
      );
      const a = t.value.map(
        (i, h) => i.getBoundingClientRect().top
      );
      let l;
      const u = C((i) => {
        var v, _;
        const h = i + document.documentElement.clientHeight / 2, p = X(a, h);
        l !== p && ((v = document.querySelector(`#toc-${l}`)) == null || v.classList.toggle("toc-choosen"), (_ = document.querySelector(`#toc-${p}`)) == null || _.classList.toggle("toc-choosen"), l = p);
      }, 100);
      $(o, u);
    });
    const e = d(!1);
    return (c, r) => (f(), m("div", A, [
      g("button", I, [
        B(" = "),
        g("button", {
          onClick: r[0] || (r[0] = (a) => e.value = !e.value),
          class: x([e.value ? "collapse" : "expand"])
        }, y(e.value ? "⊼" : "⊽"), 3)
      ]),
      k(g("ul", null, [
        (f(!0), m(E, null, Y(t.value, (a, l) => (f(), m("li", {
          id: `toc-${l}`,
          class: x(`item-${a.tagName.charAt(1)}`),
          onClick: (u) => a.scrollIntoView({ behavior: "smooth", block: "center" })
        }, y(a.innerText), 11, N))), 256))
      ], 512), [
        [M, !e.value]
      ])
    ]));
  }
});
const L = (n, s) => {
  const t = n.__vccOpts || n;
  for (const [o, e] of s)
    t[o] = e;
  return t;
}, q = /* @__PURE__ */ L(S, [["__scopeId", "data-v-61373cfc"]]), V = {
  install: (n) => {
    n.component("TocCreator", q);
  }
};
export {
  q as TocCreator,
  V as default
};
