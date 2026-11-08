import { css as As, LitElement as Wt } from "lit";
import { property as Vs } from "lit/decorators.js";
function ze() {
  var n, s;
  if (typeof window < "u" && window.customComponentsRaw) {
    const i = localStorage.getItem("salla_demo_lang");
    if (i === "ar" || i === "en") return i;
  }
  const t = typeof window < "u" ? window.salla || window.Salla : void 0, e = ((s = (n = t == null ? void 0 : t.lang) == null ? void 0 : n.get) == null ? void 0 : s.call(n)) || (typeof document < "u" ? document.documentElement.lang : "ar");
  return String(e).toLowerCase().startsWith("ar") ? "ar" : "en";
}
function Cs(t, e = ze()) {
  if (typeof t == "string") return t;
  if (typeof t == "number" && Number.isFinite(t)) return String(t);
  if (!t || typeof t != "object" || Array.isArray(t)) return "";
  const n = t;
  for (const s of [e, "en", "ar"]) {
    const i = n[s];
    if (typeof i == "string") return i;
    if (typeof i == "number" && Number.isFinite(i)) return String(i);
  }
  return "";
}
function je(t, e) {
  return Array.isArray(t) ? t.map((n) => je(n, e)) : !t || typeof t != "object" ? t : "ar" in t || "en" in t ? Cs(t, e) : Object.fromEntries(Object.entries(t).map(([n, s]) => [n, je(s, e)]));
}
const Ce = /* @__PURE__ */ new Set();
let X;
function Fs(t) {
  return Ce.add(t), X || (X = new MutationObserver(() => Ce.forEach((e) => e())), X.observe(document.documentElement, { attributes: !0, attributeFilter: ["lang"] })), () => {
    Ce.delete(t), Ce.size || (X == null || X.disconnect(), X = void 0);
  };
}
function Ds(t, e) {
  t.indexOf(e) === -1 && t.push(e);
}
function ct(t, e) {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}
const H = (t, e, n) => n > e ? e : n < t ? t : n;
function Ue(t, e) {
  return e ? `${t}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${e}` : t;
}
let le = () => {
}, U = () => {
};
var pn;
typeof process < "u" && ((pn = process.env) == null ? void 0 : pn.NODE_ENV) !== "production" && (le = (t, e, n) => {
  !t && typeof console < "u" && console.warn(Ue(e, n));
}, U = (t, e, n) => {
  if (!t)
    throw new Error(Ue(e, n));
});
const Y = {}, mn = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t), Es = (t) => typeof t == "object" && t !== null, gn = (t) => /^0[^.\s]+$/u.test(t);
// @__NO_SIDE_EFFECTS__
function yn(t) {
  let e;
  return () => (e === void 0 && (e = t()), e);
}
const ce = /* @__NO_SIDE_EFFECTS__ */ (t) => t, ut = (...t) => t.reduce((e, n) => (s) => n(e(s))), ft = /* @__NO_SIDE_EFFECTS__ */ (t, e, n) => {
  const s = e - t;
  return s ? (n - t) / s : 1;
};
class bn {
  constructor() {
    this.subscriptions = [];
  }
  add(e) {
    return Ds(this.subscriptions, e), () => ct(this.subscriptions, e);
  }
  notify(e, n, s) {
    const i = this.subscriptions.length;
    if (i)
      if (i === 1)
        this.subscriptions[0](e, n, s);
      else
        for (let r = 0; r < i; r++) {
          const o = this.subscriptions[r];
          o && o(e, n, s);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const P = /* @__NO_SIDE_EFFECTS__ */ (t) => t * 1e3, K = /* @__NO_SIDE_EFFECTS__ */ (t) => t / 1e3, Tn = /* @__NO_SIDE_EFFECTS__ */ (t, e) => e ? t * (1e3 / e) : 0, _t = /* @__PURE__ */ new Set();
function vn(t, e, n) {
  t || _t.has(e) || (console.warn(Ue(e, n)), _t.add(e));
}
const Rs = (t, e, n) => {
  const s = e - t;
  return ((n - t) % s + s) % s + t;
}, wn = (t, e, n) => (((1 - 3 * n + 3 * e) * t + (3 * n - 6 * e)) * t + 3 * e) * t, ks = 1e-7, Os = 12;
function Ps(t, e, n, s, i) {
  let r, o, a = 0;
  do
    o = e + (n - e) / 2, r = wn(o, s, i) - t, r > 0 ? n = o : e = o;
  while (Math.abs(r) > ks && ++a < Os);
  return o;
}
// @__NO_SIDE_EFFECTS__
function Me(t, e, n, s) {
  if (t === e && n === s)
    return ce;
  const i = (r) => Ps(r, 0, 1, t, n);
  return (r) => r === 0 || r === 1 ? r : wn(i(r), e, s);
}
const Sn = /* @__NO_SIDE_EFFECTS__ */ (t) => (e) => e <= 0.5 ? t(2 * e) / 2 : (2 - t(2 * (1 - e))) / 2, dt = /* @__NO_SIDE_EFFECTS__ */ (t) => (e) => 1 - t(1 - e), xn = /* @__PURE__ */ Me(0.33, 1.53, 0.69, 0.99), ht = /* @__PURE__ */ dt(xn), Mn = /* @__PURE__ */ Sn(ht), An = (t) => t >= 1 ? 1 : (t *= 2) < 1 ? 0.5 * ht(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))), pt = (t) => 1 - Math.sin(Math.acos(t)), Is = /* @__PURE__ */ dt(pt), Vn = /* @__PURE__ */ Sn(pt), Bs = /* @__PURE__ */ Me(0.42, 0, 1, 1), Ns = /* @__PURE__ */ Me(0, 0, 0.58, 1), Cn = /* @__PURE__ */ Me(0.42, 0, 0.58, 1), Fn = /* @__NO_SIDE_EFFECTS__ */ (t) => Array.isArray(t) && typeof t[0] != "number";
// @__NO_SIDE_EFFECTS__
function Dn(t, e) {
  return /* @__PURE__ */ Fn(t) ? t[Rs(0, t.length, e)] : t;
}
const En = /* @__NO_SIDE_EFFECTS__ */ (t) => Array.isArray(t) && typeof t[0] == "number", Lt = {
  linear: ce,
  easeIn: Bs,
  easeInOut: Cn,
  easeOut: Ns,
  circIn: pt,
  circInOut: Vn,
  circOut: Is,
  backIn: ht,
  backInOut: Mn,
  backOut: xn,
  anticipate: An
}, Ks = (t) => typeof t == "string", $t = (t) => {
  if (/* @__PURE__ */ En(t)) {
    U(t.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [e, n, s, i] = t;
    return /* @__PURE__ */ Me(e, n, s, i);
  } else if (Ks(t))
    return U(Lt[t] !== void 0, `Invalid easing type '${t}'`, "invalid-easing-type"), Lt[t];
  return t;
}, Fe = [
  "setup",
  // Compute
  "read",
  // Read
  "resolveKeyframes",
  // Write/Read/Write/Read
  "preUpdate",
  // Compute
  "update",
  // Compute
  "preRender",
  // Compute
  "render",
  // Write
  "postRender"
  // Compute
];
function Ws(t) {
  let e = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set(), s = !1, i = !1;
  const r = /* @__PURE__ */ new WeakSet();
  let o = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function a(u) {
    r.has(u) && (l.schedule(u), t()), u(o);
  }
  const l = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (u, c = !1, f = !1) => {
      const p = f && s ? e : n;
      return c && r.add(u), p.add(u), u;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (u) => {
      n.delete(u), r.delete(u);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (u) => {
      if (o = u, s) {
        i = !0;
        return;
      }
      s = !0;
      const c = e;
      e = n, n = c, e.forEach(a), e.clear(), s = !1, i && (i = !1, l.process(u));
    }
  };
  return l;
}
const _s = 40;
function Rn(t, e) {
  let n = !1, s = !0;
  const i = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, r = () => n = !0, o = Fe.reduce((M, S) => (M[S] = Ws(r), M), {}), { setup: a, read: l, resolveKeyframes: u, preUpdate: c, update: f, preRender: d, render: p, postRender: b } = o, m = () => {
    const M = Y.useManualTiming, S = M ? i.timestamp : performance.now();
    n = !1, M || (i.delta = s ? 1e3 / 60 : Math.max(Math.min(S - i.timestamp, _s), 1)), i.timestamp = S, i.isProcessing = !0, a.process(i), l.process(i), u.process(i), c.process(i), f.process(i), d.process(i), p.process(i), b.process(i), i.isProcessing = !1, n && e && (s = !1, t(m));
  }, g = () => {
    n = !0, s = !0, i.isProcessing || t(m);
  };
  return { schedule: Fe.reduce((M, S) => {
    const v = o[S];
    return M[S] = (C, D = !1, w = !1) => (n || g(), v.schedule(C, D, w)), M;
  }, {}), cancel: (M) => {
    for (let S = 0; S < Fe.length; S++)
      o[Fe[S]].cancel(M);
  }, state: i, steps: o };
}
const { schedule: _, cancel: Ge, state: Re } = /* @__PURE__ */ Rn(typeof requestAnimationFrame < "u" ? requestAnimationFrame : ce, !0);
let Ee;
function Ls() {
  Ee = void 0;
}
const O = {
  now: () => (Ee === void 0 && O.set(Re.isProcessing || Y.useManualTiming ? Re.timestamp : performance.now()), Ee),
  set: (t) => {
    Ee = t, queueMicrotask(Ls);
  }
}, kn = (t) => (e) => typeof e == "string" && e.startsWith(t), On = /* @__PURE__ */ kn("--"), $s = /* @__PURE__ */ kn("var(--"), mt = (t) => $s(t) ? zs.test(t.split("/*")[0].trim()) : !1, zs = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function zt(t) {
  return typeof t != "string" ? !1 : t.split("/*")[0].includes("var(--");
}
const ue = {
  test: (t) => typeof t == "number",
  parse: parseFloat,
  transform: (t) => t
}, ve = {
  ...ue,
  transform: (t) => H(0, 1, t)
}, De = {
  ...ue,
  default: 1
}, Te = (t) => Math.round(t * 1e5) / 1e5, gt = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function js(t) {
  return t == null;
}
const Us = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, yt = (t, e) => (n) => !!(typeof n == "string" && Us.test(n) && n.startsWith(t) || e && !js(n) && Object.prototype.hasOwnProperty.call(n, e)), Pn = (t, e, n) => (s) => {
  if (typeof s != "string")
    return s;
  const [i, r, o, a] = s.match(gt);
  return {
    [t]: parseFloat(i),
    [e]: parseFloat(r),
    [n]: parseFloat(o),
    alpha: a !== void 0 ? parseFloat(a) : 1
  };
}, Gs = (t) => H(0, 255, t), Ne = {
  ...ue,
  transform: (t) => Math.round(Gs(t))
}, Q = {
  test: /* @__PURE__ */ yt("rgb", "red"),
  parse: /* @__PURE__ */ Pn("red", "green", "blue"),
  transform: ({ red: t, green: e, blue: n, alpha: s = 1 }) => "rgba(" + Ne.transform(t) + ", " + Ne.transform(e) + ", " + Ne.transform(n) + ", " + Te(ve.transform(s)) + ")"
};
function qs(t) {
  let e = "", n = "", s = "", i = "";
  return t.length > 5 ? (e = t.substring(1, 3), n = t.substring(3, 5), s = t.substring(5, 7), i = t.substring(7, 9)) : (e = t.substring(1, 2), n = t.substring(2, 3), s = t.substring(3, 4), i = t.substring(4, 5), e += e, n += n, s += s, i += i), {
    red: parseInt(e, 16),
    green: parseInt(n, 16),
    blue: parseInt(s, 16),
    alpha: i ? parseInt(i, 16) / 255 : 1
  };
}
const qe = {
  test: /* @__PURE__ */ yt("#"),
  parse: qs,
  transform: Q.transform
}, Ae = /* @__NO_SIDE_EFFECTS__ */ (t) => ({
  test: (e) => typeof e == "string" && e.endsWith(t) && e.split(" ").length === 1,
  parse: parseFloat,
  transform: (e) => `${e}${t}`
}), j = /* @__PURE__ */ Ae("deg"), oe = /* @__PURE__ */ Ae("%"), h = /* @__PURE__ */ Ae("px"), Hs = /* @__PURE__ */ Ae("vh"), Ys = /* @__PURE__ */ Ae("vw"), jt = {
  ...oe,
  parse: (t) => oe.parse(t) / 100,
  transform: (t) => oe.transform(t * 100)
}, ie = {
  test: /* @__PURE__ */ yt("hsl", "hue"),
  parse: /* @__PURE__ */ Pn("hue", "saturation", "lightness"),
  transform: ({ hue: t, saturation: e, lightness: n, alpha: s = 1 }) => "hsla(" + Math.round(t) + ", " + oe.transform(Te(e)) + ", " + oe.transform(Te(n)) + ", " + Te(ve.transform(s)) + ")"
}, E = {
  test: (t) => Q.test(t) || qe.test(t) || ie.test(t),
  parse: (t) => Q.test(t) ? Q.parse(t) : ie.test(t) ? ie.parse(t) : qe.parse(t),
  transform: (t) => typeof t == "string" ? t : t.hasOwnProperty("red") ? Q.transform(t) : ie.transform(t),
  getAnimatableNone: (t) => {
    const e = E.parse(t);
    return e.alpha = 0, E.transform(e);
  }
}, Xs = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function Zs(t) {
  var e, n;
  return isNaN(t) && typeof t == "string" && (((e = t.match(gt)) == null ? void 0 : e.length) || 0) + (((n = t.match(Xs)) == null ? void 0 : n.length) || 0) > 0;
}
const In = "number", Bn = "color", Qs = "var", Js = "var(", Ut = "${}", ei = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function ae(t) {
  const e = t.toString(), n = [], s = {
    color: [],
    number: [],
    var: []
  }, i = [];
  let r = 0;
  const a = e.replace(ei, (l) => (E.test(l) ? (s.color.push(r), i.push(Bn), n.push(E.parse(l))) : l.startsWith(Js) ? (s.var.push(r), i.push(Qs), n.push(l)) : (s.number.push(r), i.push(In), n.push(parseFloat(l))), ++r, Ut)).split(Ut);
  return { values: n, split: a, indexes: s, types: i };
}
function ti(t) {
  return ae(t).values;
}
function Nn({ split: t, types: e }) {
  const n = t.length;
  return (s) => {
    let i = "";
    for (let r = 0; r < n; r++)
      if (i += t[r], s[r] !== void 0) {
        const o = e[r];
        o === In ? i += Te(s[r]) : o === Bn ? i += E.transform(s[r]) : i += s[r];
      }
    return i;
  };
}
function ni(t) {
  return Nn(ae(t));
}
const si = (t) => typeof t == "number" ? 0 : E.test(t) ? E.getAnimatableNone(t) : t, ii = (t, e) => typeof t == "number" ? e != null && e.trim().endsWith("/") ? t : 0 : si(t);
function ri(t) {
  const e = ae(t);
  return Nn(e)(e.values.map((s, i) => ii(s, e.split[i])));
}
const W = {
  test: Zs,
  parse: ti,
  createTransformer: ni,
  getAnimatableNone: ri
};
function Ke(t, e, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + (e - t) * 6 * n : n < 1 / 2 ? e : n < 2 / 3 ? t + (e - t) * (2 / 3 - n) * 6 : t;
}
function oi({ hue: t, saturation: e, lightness: n, alpha: s }) {
  t /= 360, e /= 100, n /= 100;
  let i = 0, r = 0, o = 0;
  if (!e)
    i = r = o = n;
  else {
    const a = n < 0.5 ? n * (1 + e) : n + e - n * e, l = 2 * n - a;
    i = Ke(l, a, t + 1 / 3), r = Ke(l, a, t), o = Ke(l, a, t - 1 / 3);
  }
  return {
    red: Math.round(i * 255),
    green: Math.round(r * 255),
    blue: Math.round(o * 255),
    alpha: s
  };
}
function ke(t, e) {
  return (n) => n > 0 ? e : t;
}
const fe = (t, e, n) => t + (e - t) * n, We = (t, e, n) => {
  const s = t * t, i = n * (e * e - s) + s;
  return i < 0 ? 0 : Math.sqrt(i);
}, ai = [qe, Q, ie], li = (t) => ai.find((e) => e.test(t));
function Gt(t) {
  const e = li(t);
  if (le(!!e, `'${t}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !e)
    return !1;
  let n = e.parse(t);
  return e === ie && (n = oi(n)), n;
}
const qt = (t, e) => {
  const n = Gt(t), s = Gt(e);
  if (!n || !s)
    return ke(t, e);
  const i = { ...n };
  return (r) => (i.red = We(n.red, s.red, r), i.green = We(n.green, s.green, r), i.blue = We(n.blue, s.blue, r), i.alpha = fe(n.alpha, s.alpha, r), Q.transform(i));
}, He = /* @__PURE__ */ new Set(["none", "hidden"]);
function ci(t, e) {
  return He.has(t) ? (n) => n <= 0 ? t : e : (n) => n >= 1 ? e : t;
}
function ui(t, e) {
  return (n) => fe(t, e, n);
}
function bt(t) {
  return typeof t == "number" ? ui : typeof t == "string" ? mt(t) ? ke : E.test(t) ? qt : hi : Array.isArray(t) ? Kn : typeof t == "object" ? E.test(t) ? qt : fi : ke;
}
function Kn(t, e) {
  const n = [...t], s = n.length, i = t.map((r, o) => bt(r)(r, e[o]));
  return (r) => {
    for (let o = 0; o < s; o++)
      n[o] = i[o](r);
    return n;
  };
}
function fi(t, e) {
  const n = { ...t, ...e }, s = {};
  for (const i in n)
    t[i] !== void 0 && e[i] !== void 0 && (s[i] = bt(t[i])(t[i], e[i]));
  return (i) => {
    for (const r in s)
      n[r] = s[r](i);
    return n;
  };
}
function di(t, e) {
  const n = [], s = { color: 0, var: 0, number: 0 };
  for (let i = 0; i < e.values.length; i++) {
    const r = e.types[i], o = t.indexes[r][s[r]], a = t.values[o] ?? 0;
    n[i] = a, s[r]++;
  }
  return n;
}
const hi = (t, e) => {
  const n = W.createTransformer(e), s = ae(t), i = ae(e);
  return s.indexes.var.length === i.indexes.var.length && s.indexes.color.length === i.indexes.color.length && s.indexes.number.length >= i.indexes.number.length ? He.has(t) && !i.values.length || He.has(e) && !s.values.length ? ci(t, e) : ut(Kn(di(s, i), i.values), n) : (le(!0, `Complex values '${t}' and '${e}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), ke(t, e));
};
function Wn(t, e, n) {
  return typeof t == "number" && typeof e == "number" && typeof n == "number" ? fe(t, e, n) : bt(t)(t, e);
}
const pi = (t) => {
  const e = ({ timestamp: n }) => t(n);
  return {
    start: (n = !0) => _.update(e, n),
    stop: () => Ge(e),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => Re.isProcessing ? Re.timestamp : O.now()
  };
}, _n = (t, e, n = 10) => {
  let s = "";
  const i = Math.max(Math.round(e / n), 2);
  for (let r = 0; r < i; r++)
    s += Math.round(t(r / (i - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${s.substring(0, s.length - 2)})`;
}, Oe = 2e4;
function Tt(t) {
  let e = 0;
  const n = 50;
  let s = t.next(e);
  for (; !s.done && e < Oe; )
    e += n, s = t.next(e);
  return e >= Oe ? 1 / 0 : e;
}
function Ln(t, e = 100, n) {
  const s = n({ ...t, keyframes: [0, e] }), i = Math.min(Tt(s), Oe);
  return {
    type: "keyframes",
    ease: (r) => s.next(i * r).value / e,
    duration: /* @__PURE__ */ K(i)
  };
}
const F = {
  // Default spring physics
  stiffness: 100,
  damping: 10,
  mass: 1,
  velocity: 0,
  // Default duration/bounce-based options
  duration: 800,
  // in ms
  bounce: 0.3,
  visualDuration: 0.3,
  // in seconds
  // Rest thresholds
  restSpeed: {
    granular: 0.01,
    default: 2
  },
  restDelta: {
    granular: 5e-3,
    default: 0.5
  },
  // Limits
  minDuration: 0.01,
  // in seconds
  maxDuration: 10,
  // in seconds
  minDamping: 0.05,
  maxDamping: 1
};
function Ye(t, e) {
  return t * Math.sqrt(1 - e * e);
}
const mi = 12;
function gi(t, e, n) {
  let s = n;
  for (let i = 1; i < mi; i++)
    s = s - t(s) / e(s);
  return s;
}
const _e = 1e-3;
function yi({ duration: t = F.duration, bounce: e = F.bounce, velocity: n = F.velocity, mass: s = F.mass }) {
  let i, r;
  le(t <= /* @__PURE__ */ P(F.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let o = 1 - e;
  o = H(F.minDamping, F.maxDamping, o), t = H(F.minDuration, F.maxDuration, /* @__PURE__ */ K(t)), o < 1 ? (i = (u) => {
    const c = u * o, f = c * t, d = c - n, p = Ye(u, o), b = Math.exp(-f);
    return _e - d / p * b;
  }, r = (u) => {
    const f = u * o * t, d = f * n + n, p = Math.pow(o, 2) * Math.pow(u, 2) * t, b = Math.exp(-f), m = Ye(Math.pow(u, 2), o);
    return (-i(u) + _e > 0 ? -1 : 1) * ((d - p) * b) / m;
  }) : (i = (u) => {
    const c = Math.exp(-u * t), f = (u - n) * t + 1;
    return -_e + c * f;
  }, r = (u) => {
    const c = Math.exp(-u * t), f = (n - u) * (t * t);
    return c * f;
  });
  const a = 5 / t, l = gi(i, r, a);
  if (t = /* @__PURE__ */ P(t), isNaN(l))
    return {
      stiffness: F.stiffness,
      damping: F.damping,
      duration: t
    };
  {
    const u = Math.pow(l, 2) * s;
    return {
      stiffness: u,
      damping: o * 2 * Math.sqrt(s * u),
      duration: t
    };
  }
}
const bi = ["duration", "bounce"], Ti = ["stiffness", "damping", "mass"];
function Ht(t, e) {
  return e.some((n) => t[n] !== void 0);
}
function vi(t) {
  let e = {
    velocity: F.velocity,
    stiffness: F.stiffness,
    damping: F.damping,
    mass: F.mass,
    isResolvedFromDuration: !1,
    ...t
  };
  if (!Ht(t, Ti) && Ht(t, bi))
    if (e.velocity = 0, t.visualDuration) {
      const n = t.visualDuration, s = 2 * Math.PI / (n * 1.2), i = s * s, r = 2 * H(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(i);
      e = {
        ...e,
        mass: F.mass,
        stiffness: i,
        damping: r
      };
    } else {
      const n = yi({ ...t, velocity: 0 });
      e = {
        ...e,
        ...n,
        mass: F.mass
      }, e.isResolvedFromDuration = !0;
    }
  return e;
}
function we(t = F.visualDuration, e = F.bounce) {
  const n = typeof t != "object" ? {
    visualDuration: t,
    keyframes: [0, 1],
    bounce: e
  } : t;
  let { restSpeed: s, restDelta: i } = n;
  const r = n.keyframes[0], o = n.keyframes[n.keyframes.length - 1], a = { done: !1, value: r }, { stiffness: l, damping: u, mass: c, duration: f, velocity: d, isResolvedFromDuration: p } = vi({
    ...n,
    velocity: -/* @__PURE__ */ K(n.velocity || 0)
  }), b = d || 0, m = u / (2 * Math.sqrt(l * c)), g = o - r, y = /* @__PURE__ */ K(Math.sqrt(l / c)), A = Math.abs(g) < 5;
  s || (s = A ? F.restSpeed.granular : F.restSpeed.default), i || (i = A ? F.restDelta.granular : F.restDelta.default);
  let M, S, v, C, D, w;
  if (m < 1)
    v = Ye(y, m), C = (b + m * y * g) / v, M = (T) => {
      const V = Math.exp(-m * y * T);
      return o - V * (C * Math.sin(v * T) + g * Math.cos(v * T));
    }, D = m * y * C + g * v, w = m * y * g - C * v, S = (T) => Math.exp(-m * y * T) * (D * Math.sin(v * T) + w * Math.cos(v * T));
  else if (m === 1) {
    M = (V) => o - Math.exp(-y * V) * (g + (b + y * g) * V);
    const T = b + y * g;
    S = (V) => Math.exp(-y * V) * (y * T * V - b);
  } else {
    const T = y * Math.sqrt(m * m - 1);
    M = (B) => {
      const L = Math.exp(-m * y * B), $ = Math.min(T * B, 300);
      return o - L * ((b + m * y * g) * Math.sinh($) + T * g * Math.cosh($)) / T;
    };
    const V = (b + m * y * g) / T, I = m * y * V - g * T, k = m * y * g - V * T;
    S = (B) => {
      const L = Math.exp(-m * y * B), $ = Math.min(T * B, 300);
      return L * (I * Math.sinh($) + k * Math.cosh($));
    };
  }
  const x = {
    calculatedDuration: p && f || null,
    velocity: (T) => /* @__PURE__ */ P(S(T)),
    next: (T) => {
      if (!p && m < 1) {
        const I = Math.exp(-m * y * T), k = Math.sin(v * T), B = Math.cos(v * T), L = o - I * (C * k + g * B), $ = /* @__PURE__ */ P(I * (D * k + w * B));
        return a.done = Math.abs($) <= s && Math.abs(o - L) <= i, a.value = a.done ? o : L, a;
      }
      const V = M(T);
      if (p)
        a.done = T >= f;
      else {
        const I = /* @__PURE__ */ P(S(T));
        a.done = Math.abs(I) <= s && Math.abs(o - V) <= i;
      }
      return a.value = a.done ? o : V, a;
    },
    toString: () => {
      const T = Math.min(Tt(x), Oe), V = _n((I) => x.next(T * I).value, T, 30);
      return T + "ms " + V;
    },
    toTransition: () => {
    }
  };
  return x;
}
we.applyToOptions = (t) => {
  const e = Ln(t, 100, we);
  return t.ease = e.ease, t.duration = /* @__PURE__ */ P(e.duration), t.type = "keyframes", t;
};
const wi = 5;
function $n(t, e, n) {
  const s = Math.max(e - wi, 0);
  return /* @__PURE__ */ Tn(n - t(s), e - s);
}
function Xe({ keyframes: t, velocity: e = 0, power: n = 0.8, timeConstant: s = 325, bounceDamping: i = 10, bounceStiffness: r = 500, modifyTarget: o, min: a, max: l, restDelta: u = 0.5, restSpeed: c }) {
  const f = t[0], d = {
    done: !1,
    value: f
  }, p = (w) => a !== void 0 && w < a || l !== void 0 && w > l, b = (w) => a === void 0 ? l : l === void 0 || Math.abs(a - w) < Math.abs(l - w) ? a : l;
  let m = n * e;
  const g = f + m, y = o === void 0 ? g : o(g);
  y !== g && (m = y - f);
  const A = (w) => -m * Math.exp(-w / s), M = (w) => y + A(w), S = (w) => {
    const x = A(w), T = M(w);
    d.done = Math.abs(x) <= u, d.value = d.done ? y : T;
  };
  let v, C;
  const D = (w) => {
    p(d.value) && (v = w, C = we({
      keyframes: [d.value, b(d.value)],
      velocity: $n(M, w, d.value),
      // TODO: This should be passing * 1000
      damping: i,
      stiffness: r,
      restDelta: u,
      restSpeed: c
    }));
  };
  return D(0), {
    calculatedDuration: null,
    next: (w) => {
      let x = !1;
      return !C && v === void 0 && (x = !0, S(w), D(w)), v !== void 0 && w >= v ? C.next(w - v) : (!x && S(w), d);
    }
  };
}
function Si(t, e, n) {
  const s = [], i = n || Y.mix || Wn, r = t.length - 1;
  for (let o = 0; o < r; o++) {
    let a = i(t[o], t[o + 1]);
    if (e) {
      const l = Array.isArray(e) ? e[o] || ce : e;
      a = ut(l, a);
    }
    s.push(a);
  }
  return s;
}
function xi(t, e, { clamp: n = !0, ease: s, mixer: i } = {}) {
  const r = t.length;
  if (U(r === e.length, "Both input and output ranges must be the same length", "range-length"), r === 1)
    return () => e[0];
  if (r === 2 && e[0] === e[1])
    return () => e[1];
  const o = t[0] === t[1];
  t[0] > t[r - 1] && (t = [...t].reverse(), e = [...e].reverse());
  const a = Si(e, s, i), l = a.length, u = (c) => {
    if (o && c < t[0])
      return e[0];
    let f = 0;
    if (l > 1)
      for (; f < t.length - 2 && !(c < t[f + 1]); f++)
        ;
    const d = /* @__PURE__ */ ft(t[f], t[f + 1], c);
    return a[f](d);
  };
  return n ? (c) => u(H(t[0], t[r - 1], c)) : u;
}
function zn(t, e) {
  const n = t[t.length - 1];
  for (let s = 1; s <= e; s++) {
    const i = /* @__PURE__ */ ft(0, e, s);
    t.push(fe(n, 1, i));
  }
}
function jn(t) {
  const e = [0];
  return zn(e, t.length - 1), e;
}
function Mi(t, e) {
  return t.map((n) => n * e);
}
function Ai(t, e) {
  return t.map(() => e || Cn).splice(0, t.length - 1);
}
function re({ duration: t = 300, keyframes: e, times: n, ease: s = "easeInOut" }) {
  const i = /* @__PURE__ */ Fn(s) ? s.map($t) : $t(s), r = {
    done: !1,
    value: e[0]
  }, o = Mi(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    n && n.length === e.length ? n : jn(e),
    t
  ), a = xi(o, e, {
    ease: Array.isArray(i) ? i : Ai(e, i)
  });
  return {
    calculatedDuration: t,
    next: (l) => (r.value = a(l), r.done = l >= t, r)
  };
}
const Vi = (t) => t !== null;
function Be(t, { repeat: e, repeatType: n = "loop" }, s, i = 1) {
  const r = t.filter(Vi), a = i < 0 || e && n !== "loop" && e % 2 === 1 ? 0 : r.length - 1;
  return !a || s === void 0 ? r[a] : s;
}
const Ci = {
  decay: Xe,
  inertia: Xe,
  tween: re,
  keyframes: re,
  spring: we
};
function Un(t) {
  typeof t.type == "string" && (t.type = Ci[t.type]);
}
class vt {
  constructor() {
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this._finished = new Promise((e) => {
      this.resolve = e;
    });
  }
  notifyFinished() {
    this.resolve();
  }
  /**
   * Allows the animation to be awaited.
   *
   * @deprecated Use `finished` instead.
   */
  then(e, n) {
    return this.finished.then(e, n);
  }
}
const Fi = (t) => t / 100;
class Pe extends vt {
  constructor(e) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
      done: !1,
      value: void 0
    }, this.stop = () => {
      var s, i;
      const { motionValue: n } = this.options;
      n && n.updatedAt !== O.now() && this.tick(O.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), (i = (s = this.options).onStop) == null || i.call(s));
    }, this.options = e, this.initAnimation(), this.play(), e.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: e } = this;
    Un(e);
    const { type: n = re, repeat: s = 0, repeatDelay: i = 0, repeatType: r, velocity: o = 0 } = e;
    let { keyframes: a } = e;
    const l = n || re;
    process.env.NODE_ENV !== "production" && l !== re && U(a.length <= 2, `Only two keyframes currently supported with spring and inertia animations. Trying to animate ${a}`, "spring-two-frames"), l !== re && typeof a[0] != "number" && (this.mixKeyframes = ut(Fi, Wn(a[0], a[1])), a = [0, 100]);
    const u = l({ ...e, keyframes: a });
    r === "mirror" && (this.mirroredGenerator = l({
      ...e,
      keyframes: [...a].reverse(),
      velocity: -o
    })), u.calculatedDuration === null && (u.calculatedDuration = Tt(u));
    const { calculatedDuration: c } = u;
    this.calculatedDuration = c, this.resolvedDuration = c + i, this.totalDuration = this.resolvedDuration * (s + 1) - i, this.generator = u;
  }
  updateTime(e) {
    const n = Math.round(e - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = n;
  }
  tick(e, n = !1) {
    const { generator: s, totalDuration: i, mixKeyframes: r, mirroredGenerator: o, resolvedDuration: a, calculatedDuration: l } = this;
    if (this.startTime === null)
      return s.next(0);
    const { delay: u = 0, keyframes: c, repeat: f, repeatType: d, repeatDelay: p, type: b, onUpdate: m, finalKeyframe: g } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, e) : this.speed < 0 && (this.startTime = Math.min(e - i / this.speed, this.startTime)), n ? this.currentTime = e : this.updateTime(e);
    const y = this.currentTime - u * (this.playbackSpeed >= 0 ? 1 : -1), A = this.playbackSpeed >= 0 ? y < 0 : y > i;
    this.currentTime = Math.max(y, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = i);
    let M = this.currentTime, S = s;
    if (f) {
      const w = Math.min(this.currentTime, i) / a;
      let x = Math.floor(w), T = w % 1;
      !T && w >= 1 && (T = 1), T === 1 && x--, x = Math.min(x, f + 1), !!(x % 2) && (d === "reverse" ? (T = 1 - T, p && (T -= p / a)) : d === "mirror" && (S = o)), M = H(0, 1, T) * a;
    }
    let v;
    A ? (this.delayState.value = c[0], v = this.delayState) : v = S.next(M), r && !A && (v.value = r(v.value));
    let { done: C } = v;
    !A && l !== null && (C = this.playbackSpeed >= 0 ? this.currentTime >= i : this.currentTime <= 0);
    const D = this.holdTime === null && (this.state === "finished" || this.state === "running" && C);
    return D && b !== Xe && (v.value = Be(c, this.options, g, this.speed)), m && m(v.value), D && this.finish(), v;
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(e, n) {
    return this.finished.then(e, n);
  }
  get duration() {
    return /* @__PURE__ */ K(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: e = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ K(e);
  }
  get time() {
    return /* @__PURE__ */ K(this.currentTime);
  }
  set time(e) {
    e = /* @__PURE__ */ P(e), this.currentTime = e, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = e : this.driver && (this.startTime = this.driver.now() - e / this.playbackSpeed), this.driver ? this.driver.start(!1) : (this.startTime = 0, this.state = "paused", this.holdTime = e, this.tick(e));
  }
  /**
   * Returns the generator's velocity at the current time in units/second.
   * Uses the analytical derivative when available (springs), avoiding
   * the MotionValue's frame-dependent velocity estimation.
   */
  getGeneratorVelocity() {
    const e = this.currentTime;
    if (e <= 0)
      return this.options.velocity || 0;
    if (this.generator.velocity)
      return this.generator.velocity(e);
    const n = this.generator.next(e).value;
    return $n((s) => this.generator.next(s).value, e, n);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(e) {
    const n = this.playbackSpeed !== e;
    n && this.driver && this.updateTime(O.now()), this.playbackSpeed = e, n && this.driver && (this.time = /* @__PURE__ */ K(this.currentTime));
  }
  play() {
    var i, r;
    if (this.isStopped)
      return;
    const { driver: e = pi, startTime: n } = this.options;
    this.driver || (this.driver = e((o) => this.tick(o))), (r = (i = this.options).onPlay) == null || r.call(i);
    const s = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = s) : this.holdTime !== null ? this.startTime = s - this.holdTime : this.startTime || (this.startTime = n ?? s), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(O.now()), this.holdTime = this.currentTime;
  }
  complete() {
    this.state !== "running" && this.play(), this.state = "finished", this.holdTime = null;
  }
  finish() {
    var e, n;
    this.notifyFinished(), this.teardown(), this.state = "finished", (n = (e = this.options).onComplete) == null || n.call(e);
  }
  cancel() {
    var e, n;
    this.holdTime = null, this.startTime = 0, this.tick(0), this.teardown(), (n = (e = this.options).onCancel) == null || n.call(e);
  }
  teardown() {
    this.state = "idle", this.stopDriver(), this.startTime = this.holdTime = null;
  }
  stopDriver() {
    this.driver && (this.driver.stop(), this.driver = void 0);
  }
  sample(e) {
    return this.startTime = 0, this.tick(e, !0);
  }
  attachTimeline(e) {
    var n;
    return this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear", this.initAnimation()), (n = this.driver) == null || n.stop(), e.observe(this);
  }
}
function Di(t) {
  for (let e = 1; e < t.length; e++)
    t[e] ?? (t[e] = t[e - 1]);
}
const J = (t) => t * 180 / Math.PI, Ze = (t) => {
  const e = J(Math.atan2(t[1], t[0]));
  return Qe(e);
}, Ei = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (t) => (Math.abs(t[0]) + Math.abs(t[3])) / 2,
  rotate: Ze,
  rotateZ: Ze,
  skewX: (t) => J(Math.atan(t[1])),
  skewY: (t) => J(Math.atan(t[2])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[2])) / 2
}, Qe = (t) => (t = t % 360, t < 0 && (t += 360), t), Yt = Ze, Xt = (t) => Math.sqrt(t[0] * t[0] + t[1] * t[1]), Zt = (t) => Math.sqrt(t[4] * t[4] + t[5] * t[5]), Ri = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: Xt,
  scaleY: Zt,
  scale: (t) => (Xt(t) + Zt(t)) / 2,
  rotateX: (t) => Qe(J(Math.atan2(t[6], t[5]))),
  rotateY: (t) => Qe(J(Math.atan2(-t[2], t[0]))),
  rotateZ: Yt,
  rotate: Yt,
  skewX: (t) => J(Math.atan(t[4])),
  skewY: (t) => J(Math.atan(t[1])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[4])) / 2
};
function Je(t) {
  return t.includes("scale") ? 1 : 0;
}
function et(t, e) {
  if (!t || t === "none")
    return Je(e);
  const n = t.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let s, i;
  if (n)
    s = Ri, i = n;
  else {
    const a = t.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    s = Ei, i = a;
  }
  if (!i)
    return Je(e);
  const r = s[e], o = i[1].split(",").map(Oi);
  return typeof r == "function" ? r(o) : o[r];
}
const ki = (t, e) => {
  const { transform: n = "none" } = getComputedStyle(t);
  return et(n, e);
};
function Oi(t) {
  return parseFloat(t.trim());
}
const de = [
  "transformPerspective",
  "x",
  "y",
  "z",
  "translateX",
  "translateY",
  "translateZ",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "skew",
  "skewX",
  "skewY"
], he = /* @__PURE__ */ new Set([...de, "pathRotation"]), Qt = (t) => t === ue || t === h, Pi = /* @__PURE__ */ new Set(["x", "y", "z"]), Ii = de.filter((t) => !Pi.has(t));
function Bi(t) {
  const e = [];
  return Ii.forEach((n) => {
    const s = t.getValue(n);
    s !== void 0 && (e.push([n, s.get()]), s.set(n.startsWith("scale") ? 1 : 0));
  }), e;
}
const q = {
  // Dimensions
  width: ({ x: t }, { paddingLeft: e = "0", paddingRight: n = "0", boxSizing: s }) => {
    const i = t.max - t.min;
    return s === "border-box" ? i : i - parseFloat(e) - parseFloat(n);
  },
  height: ({ y: t }, { paddingTop: e = "0", paddingBottom: n = "0", boxSizing: s }) => {
    const i = t.max - t.min;
    return s === "border-box" ? i : i - parseFloat(e) - parseFloat(n);
  },
  top: (t, { top: e }) => parseFloat(e),
  left: (t, { left: e }) => parseFloat(e),
  bottom: ({ y: t }, { top: e }) => parseFloat(e) + (t.max - t.min),
  right: ({ x: t }, { left: e }) => parseFloat(e) + (t.max - t.min),
  // Transform
  x: (t, { transform: e }) => et(e, "x"),
  y: (t, { transform: e }) => et(e, "y")
};
q.translateX = q.x;
q.translateY = q.y;
const ee = /* @__PURE__ */ new Set();
let tt = !1, nt = !1, st = !1;
function Gn() {
  if (nt) {
    const t = Array.from(ee).filter((s) => s.needsMeasurement), e = new Set(t.map((s) => s.element)), n = /* @__PURE__ */ new Map();
    e.forEach((s) => {
      const i = Bi(s);
      i.length && (n.set(s, i), s.render());
    }), t.forEach((s) => s.measureInitialState()), e.forEach((s) => {
      s.render();
      const i = n.get(s);
      i && i.forEach(([r, o]) => {
        var a;
        (a = s.getValue(r)) == null || a.set(o);
      });
    }), t.forEach((s) => s.measureEndState()), t.forEach((s) => {
      s.suspendedScrollY !== void 0 && window.scrollTo(0, s.suspendedScrollY);
    });
  }
  nt = !1, tt = !1, ee.forEach((t) => t.complete(st)), ee.clear();
}
function qn() {
  ee.forEach((t) => {
    t.readKeyframes(), t.needsMeasurement && (nt = !0);
  });
}
function Ni() {
  st = !0, qn(), Gn(), st = !1;
}
class wt {
  constructor(e, n, s, i, r, o = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...e], this.onComplete = n, this.name = s, this.motionValue = i, this.element = r, this.isAsync = o;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (ee.add(this), tt || (tt = !0, _.read(qn), _.resolveKeyframes(Gn))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: e, name: n, element: s, motionValue: i } = this;
    if (e[0] === null) {
      const r = i == null ? void 0 : i.get(), o = e[e.length - 1];
      if (r !== void 0)
        e[0] = r;
      else if (s && n) {
        const a = s.readValue(n, o);
        a != null && (e[0] = a);
      }
      e[0] === void 0 && (e[0] = o), i && r === void 0 && i.set(e[0]);
    }
    Di(e);
  }
  setFinalKeyframe() {
  }
  measureInitialState() {
  }
  renderEndStyles() {
  }
  measureEndState() {
  }
  complete(e = !1) {
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, e), ee.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (ee.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const Ki = (t) => t.startsWith("--");
function Hn(t, e, n) {
  Ki(e) ? t.style.setProperty(e, n) : t.style[e] = n;
}
const Wi = {};
function Yn(t, e) {
  const n = /* @__PURE__ */ yn(t);
  return () => Wi[e] ?? n();
}
const _i = /* @__PURE__ */ Yn(() => window.ScrollTimeline !== void 0, "scrollTimeline"), Xn = /* @__PURE__ */ Yn(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), ye = ([t, e, n, s]) => `cubic-bezier(${t}, ${e}, ${n}, ${s})`, Jt = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ ye([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ ye([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ ye([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ ye([0.33, 1.53, 0.69, 0.99])
};
function Zn(t, e) {
  if (t)
    return typeof t == "function" ? Xn() ? _n(t, e) : "ease-out" : /* @__PURE__ */ En(t) ? ye(t) : Array.isArray(t) ? t.map((n) => Zn(n, e) || Jt.easeOut) : Jt[t];
}
function Li(t, e, n, { delay: s = 0, duration: i = 300, repeat: r = 0, repeatType: o = "loop", ease: a = "easeOut", times: l } = {}, u = void 0) {
  const c = {
    [e]: n
  };
  l && (c.offset = l);
  const f = Zn(a, i);
  Array.isArray(f) && (c.easing = f);
  const d = {
    delay: s,
    duration: i,
    easing: Array.isArray(f) ? "linear" : f,
    fill: "both",
    iterations: r + 1,
    direction: o === "reverse" ? "alternate" : "normal"
  };
  return u && (d.pseudoElement = u), t.animate(c, d);
}
function St(t) {
  return typeof t == "function" && "applyToOptions" in t;
}
function $i({ type: t, ...e }) {
  return St(t) && Xn() ? t.applyToOptions(e) : (e.duration ?? (e.duration = 300), e.ease ?? (e.ease = "easeOut"), e);
}
class Qn extends vt {
  constructor(e) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !e)
      return;
    const { element: n, name: s, keyframes: i, pseudoElement: r, allowFlatten: o = !1, finalKeyframe: a, onComplete: l } = e;
    this.isPseudoElement = !!r, this.allowFlatten = o, this.options = e, U(typeof e.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const u = $i(e);
    this.animation = Li(n, s, i, u, r), u.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !r) {
        const c = Be(i, this.options, a, this.speed);
        this.updateMotionValue && this.updateMotionValue(c), Hn(n, s, c), this.animation.cancel();
      }
      l == null || l(), this.notifyFinished();
    };
  }
  play() {
    this.isStopped || (this.manualStartTime = null, this.animation.play(), this.state === "finished" && this.updateFinished());
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    var e, n;
    (n = (e = this.animation).finish) == null || n.call(e);
  }
  cancel() {
    try {
      this.animation.cancel();
    } catch {
    }
  }
  stop() {
    if (this.isStopped)
      return;
    this.isStopped = !0;
    const { state: e } = this;
    e === "idle" || e === "finished" || (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel());
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * In this method, we commit styles back to the DOM before cancelling
   * the animation.
   *
   * This is designed to be overridden by NativeAnimationExtended, which
   * will create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to also correctly calculate velocity for any subsequent animation
   * while deferring the commit until the next animation frame.
   */
  commitStyles() {
    var n, s, i;
    const e = (n = this.options) == null ? void 0 : n.element;
    !this.isPseudoElement && (e != null && e.isConnected) && ((i = (s = this.animation).commitStyles) == null || i.call(s));
  }
  get duration() {
    var n, s;
    const e = ((s = (n = this.animation.effect) == null ? void 0 : n.getComputedTiming) == null ? void 0 : s.call(n).duration) || 0;
    return /* @__PURE__ */ K(Number(e));
  }
  get iterationDuration() {
    const { delay: e = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ K(e);
  }
  get time() {
    return /* @__PURE__ */ K(Number(this.animation.currentTime) || 0);
  }
  set time(e) {
    const n = this.finishedTime !== null;
    this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ P(e), n && this.animation.pause();
  }
  /**
   * The playback speed of the animation.
   * 1 = normal speed, 2 = double speed, 0.5 = half speed.
   */
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(e) {
    e < 0 && (this.finishedTime = null), this.animation.playbackRate = e;
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return this.manualStartTime ?? Number(this.animation.startTime);
  }
  set startTime(e) {
    this.manualStartTime = this.animation.startTime = e;
  }
  /**
   * Attaches a timeline to the animation, for instance the `ScrollTimeline`.
   */
  attachTimeline({ timeline: e, rangeStart: n, rangeEnd: s, observe: i }) {
    var r;
    return this.allowFlatten && ((r = this.animation.effect) == null || r.updateTiming({ easing: "linear" })), this.animation.onfinish = null, e && _i() ? (this.animation.timeline = e, n && (this.animation.rangeStart = n), s && (this.animation.rangeEnd = s), ce) : i(this);
  }
}
const Jn = {
  anticipate: An,
  backInOut: Mn,
  circInOut: Vn
};
function zi(t) {
  return t in Jn;
}
function ji(t) {
  typeof t.ease == "string" && zi(t.ease) && (t.ease = Jn[t.ease]);
}
const Le = 10;
class Ui extends Qn {
  constructor(e) {
    ji(e), Un(e), super(e), e.startTime !== void 0 && e.autoplay !== !1 && (this.startTime = e.startTime), this.options = e;
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * Rather than read committed styles back out of the DOM, we can
   * create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to calculate velocity for any subsequent animation.
   */
  updateMotionValue(e) {
    const { motionValue: n, onUpdate: s, onComplete: i, element: r, ...o } = this.options;
    if (!n)
      return;
    if (e !== void 0) {
      n.set(e);
      return;
    }
    const a = new Pe({
      ...o,
      autoplay: !1
    }), l = Math.max(Le, O.now() - this.startTime), u = H(0, Le, l - Le), c = a.sample(l).value, { name: f } = this.options;
    r && f && Hn(r, f, c), n.setWithVelocity(a.sample(Math.max(0, l - u)).value, c, u), a.stop();
  }
}
const en = (t, e) => e === "zIndex" ? !1 : !!(typeof t == "number" || Array.isArray(t) || typeof t == "string" && // It's animatable if we have a string
(W.test(t) || t === "0") && // And it contains numbers and/or colors
!t.startsWith("url("));
function Gi(t) {
  const e = t[0];
  if (t.length === 1)
    return !0;
  for (let n = 0; n < t.length; n++)
    if (t[n] !== e)
      return !0;
}
function qi(t, e, n, s) {
  const i = t[0];
  if (i === null)
    return !1;
  if (e === "display" || e === "visibility")
    return !0;
  const r = t[t.length - 1], o = en(i, e), a = en(r, e);
  return le(o === a, `You are trying to animate ${e} from "${i}" to "${r}". "${o ? r : i}" is not an animatable value.`, "value-not-animatable"), !o || !a ? !1 : Gi(t) || (n === "spring" || St(n)) && s;
}
function it(t) {
  t.duration = 0, t.type = "keyframes";
}
const es = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform",
  "backgroundColor"
]), Hi = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function Yi(t) {
  for (let e = 0; e < t.length; e++)
    if (typeof t[e] == "string" && Hi.test(t[e]))
      return !0;
  return !1;
}
const Xi = /* @__PURE__ */ new Set([
  "color",
  "backgroundColor",
  "outlineColor",
  "fill",
  "stroke",
  "borderColor",
  "borderTopColor",
  "borderRightColor",
  "borderBottomColor",
  "borderLeftColor"
]), Zi = /* @__PURE__ */ yn(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function Qi(t) {
  var f;
  const { motionValue: e, name: n, repeatDelay: s, repeatType: i, damping: r, type: o, keyframes: a } = t, l = (f = e == null ? void 0 : e.owner) == null ? void 0 : f.current;
  if (!(l instanceof HTMLElement) && !(l instanceof SVGElement))
    return !1;
  const { onUpdate: u, transformTemplate: c } = e.owner.getProps();
  return Zi() && n && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (es.has(n) || Xi.has(n) && Yi(a)) && (n !== "transform" || !c) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !u && !s && i !== "mirror" && r !== 0 && o !== "inertia";
}
const Ji = 40;
class er extends vt {
  constructor({ autoplay: e = !0, delay: n = 0, type: s = "keyframes", repeat: i = 0, repeatDelay: r = 0, repeatType: o = "loop", keyframes: a, name: l, motionValue: u, element: c, ...f }) {
    var b;
    super(), this.stop = () => {
      var m, g;
      this._animation && (this._animation.stop(), (m = this.stopTimeline) == null || m.call(this)), (g = this.keyframeResolver) == null || g.cancel();
    }, this.createdAt = O.now();
    const d = {
      autoplay: e,
      delay: n,
      type: s,
      repeat: i,
      repeatDelay: r,
      repeatType: o,
      name: l,
      motionValue: u,
      element: c,
      ...f
    }, p = (c == null ? void 0 : c.KeyframeResolver) || wt;
    this.keyframeResolver = new p(a, (m, g, y) => this.onKeyframesResolved(m, g, d, !y), l, u, c), (b = this.keyframeResolver) == null || b.scheduleResolve();
  }
  onKeyframesResolved(e, n, s, i) {
    var y, A;
    this.keyframeResolver = void 0;
    const { name: r, type: o, velocity: a, delay: l, isHandoff: u, onUpdate: c } = s;
    this.resolvedAt = O.now();
    let f = !0;
    qi(e, r, o, a) || (f = !1, (Y.instantAnimations || !l) && (c == null || c(Be(e, s, n))), e[0] = e[e.length - 1], it(s), s.repeat = 0);
    const p = {
      startTime: i ? this.resolvedAt ? this.resolvedAt - this.createdAt > Ji ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: n,
      ...s,
      keyframes: e
    }, b = f && !u && Qi(p), m = (A = (y = p.motionValue) == null ? void 0 : y.owner) == null ? void 0 : A.current;
    let g;
    if (b)
      try {
        g = new Ui({
          ...p,
          element: m
        });
      } catch {
        g = new Pe(p);
      }
    else
      g = new Pe(p);
    g.finished.then(() => {
      this.notifyFinished();
    }).catch(ce), this.pendingTimeline && (this.stopTimeline = g.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = g;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(e, n) {
    return this.finished.finally(e).then(() => {
    });
  }
  get animation() {
    var e;
    return this._animation || ((e = this.keyframeResolver) == null || e.resume(), Ni()), this._animation;
  }
  get duration() {
    return this.animation.duration;
  }
  get iterationDuration() {
    return this.animation.iterationDuration;
  }
  get time() {
    return this.animation.time;
  }
  set time(e) {
    this.animation.time = e;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(e) {
    this.animation.speed = e;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(e) {
    return this._animation ? this.stopTimeline = this.animation.attachTimeline(e) : this.pendingTimeline = e, () => this.stop();
  }
  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.complete();
  }
  cancel() {
    var e;
    this._animation && this.animation.cancel(), (e = this.keyframeResolver) == null || e.cancel();
  }
}
class tr {
  constructor(e) {
    this.stop = () => this.runAll("stop"), this.animations = e.filter(Boolean);
  }
  get finished() {
    return Promise.all(this.animations.map((e) => e.finished));
  }
  /**
   * TODO: Filter out cancelled or stopped animations before returning
   */
  getAll(e) {
    return this.animations[0][e];
  }
  setAll(e, n) {
    for (let s = 0; s < this.animations.length; s++)
      this.animations[s][e] = n;
  }
  attachTimeline(e) {
    const n = this.animations.map((s) => s.attachTimeline(e));
    return () => {
      n.forEach((s, i) => {
        s && s(), this.animations[i].stop();
      });
    };
  }
  get time() {
    return this.getAll("time");
  }
  set time(e) {
    this.setAll("time", e);
  }
  get speed() {
    return this.getAll("speed");
  }
  set speed(e) {
    this.setAll("speed", e);
  }
  get state() {
    return this.getAll("state");
  }
  get startTime() {
    return this.getAll("startTime");
  }
  get duration() {
    return tn(this.animations, "duration");
  }
  get iterationDuration() {
    return tn(this.animations, "iterationDuration");
  }
  runAll(e) {
    this.animations.forEach((n) => n[e]());
  }
  play() {
    this.runAll("play");
  }
  pause() {
    this.runAll("pause");
  }
  cancel() {
    this.runAll("cancel");
  }
  complete() {
    this.runAll("complete");
  }
}
function tn(t, e) {
  let n = 0;
  for (let s = 0; s < t.length; s++) {
    const i = t[s][e];
    i !== null && i > n && (n = i);
  }
  return n;
}
class nr extends tr {
  then(e, n) {
    return this.finished.finally(e).then(() => {
    });
  }
}
const nn = 30, sr = (t) => !isNaN(parseFloat(t));
class ir {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(e, n = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (s) => {
      var r;
      const i = O.now();
      if (this.updatedAt !== i && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(s), this.current !== this.prev && ((r = this.events.change) == null || r.notify(this.current), this.dependents))
        for (const o of this.dependents)
          o.dirty();
    }, this.hasAnimated = !1, this.setCurrent(e), this.owner = n.owner;
  }
  setCurrent(e) {
    this.current = e, this.updatedAt = O.now(), this.canTrackVelocity === null && e !== void 0 && (this.canTrackVelocity = sr(this.current));
  }
  setPrevFrameValue(e = this.current) {
    this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt;
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   *
   * When calling `onChange` inside a React component, it should be wrapped with the
   * `useEffect` hook. As it returns an unsubscribe function, this should be returned
   * from the `useEffect` function to ensure you don't add duplicate subscribers..
   *
   * ```jsx
   * export const MyComponent = () => {
   *   const x = useMotionValue(0)
   *   const y = useMotionValue(0)
   *   const opacity = useMotionValue(1)
   *
   *   useEffect(() => {
   *     function updateOpacity() {
   *       const maxXY = Math.max(x.get(), y.get())
   *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
   *       opacity.set(newOpacity)
   *     }
   *
   *     const unsubscribeX = x.on("change", updateOpacity)
   *     const unsubscribeY = y.on("change", updateOpacity)
   *
   *     return () => {
   *       unsubscribeX()
   *       unsubscribeY()
   *     }
   *   }, [])
   *
   *   return <motion.div style={{ x }} />
   * }
   * ```
   *
   * @param subscriber - A function that receives the latest value.
   * @returns A function that, when called, will cancel this subscription.
   *
   * @deprecated
   */
  onChange(e) {
    return process.env.NODE_ENV !== "production" && vn(!1, 'value.onChange(callback) is deprecated. Switch to value.on("change", callback).'), this.on("change", e);
  }
  on(e, n) {
    this.events[e] || (this.events[e] = new bn());
    const s = this.events[e].add(n);
    return e === "change" ? () => {
      s(), _.read(() => {
        this.events.change.getSize() || this.stop();
      });
    } : s;
  }
  clearListeners() {
    for (const e in this.events)
      this.events[e].clear();
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   */
  attach(e, n) {
    this.passiveEffect = e, this.stopPassiveEffect = n;
  }
  /**
   * Sets the state of the `MotionValue`.
   *
   * @remarks
   *
   * ```jsx
   * const x = useMotionValue(0)
   * x.set(10)
   * ```
   *
   * @param latest - Latest value to set.
   * @param render - Whether to notify render subscribers. Defaults to `true`
   *
   * @public
   */
  set(e) {
    this.passiveEffect ? this.passiveEffect(e, this.updateAndNotify) : this.updateAndNotify(e);
  }
  setWithVelocity(e, n, s) {
    this.set(n), this.prev = void 0, this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt - s;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(e, n = !0) {
    this.updateAndNotify(e), this.prev = e, this.prevUpdatedAt = this.prevFrameValue = void 0, n && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
  dirty() {
    var e;
    (e = this.events.change) == null || e.notify(this.current);
  }
  addDependent(e) {
    this.dependents || (this.dependents = /* @__PURE__ */ new Set()), this.dependents.add(e);
  }
  removeDependent(e) {
    this.dependents && this.dependents.delete(e);
  }
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   *
   * @public
   */
  get() {
    return this.current;
  }
  /**
   * @public
   */
  getPrevious() {
    return this.prev;
  }
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   *
   * @public
   */
  getVelocity() {
    const e = O.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || e - this.updatedAt > nn)
      return 0;
    const n = Math.min(this.updatedAt - this.prevUpdatedAt, nn);
    return /* @__PURE__ */ Tn(parseFloat(this.current) - parseFloat(this.prevFrameValue), n);
  }
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   *
   * ```jsx
   * value.start()
   * ```
   *
   * @param animation - A function that starts the provided animation
   */
  start(e) {
    return this.stop(), new Promise((n) => {
      this.hasAnimated = !0, this.animation = e(n), this.events.animationStart && this.events.animationStart.notify();
    }).then(() => {
      this.events.animationComplete && this.events.animationComplete.notify(), this.clearAnimation();
    });
  }
  /**
   * Stop the currently active animation.
   *
   * @public
   */
  stop() {
    this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()), this.clearAnimation();
  }
  /**
   * Returns `true` if this value is currently animating.
   *
   * @public
   */
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   *
   * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
   * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
   * created a `MotionValue` via the `motionValue` function.
   *
   * @public
   */
  destroy() {
    var e, n;
    (e = this.dependents) == null || e.clear(), (n = this.events.destroy) == null || n.notify(), this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function te(t, e) {
  return new ir(t, e);
}
function ts(t, e) {
  if (t != null && t.inherit && e) {
    const { inherit: n, ...s } = t;
    return { ...e, ...s };
  }
  return t;
}
function ns(t, e) {
  const n = (t == null ? void 0 : t[e]) ?? (t == null ? void 0 : t.default) ?? t;
  return n !== t ? ts(n, t) : n;
}
const rr = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, or = (t) => ({
  type: "spring",
  stiffness: 550,
  damping: t === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), ar = {
  type: "keyframes",
  duration: 0.8
}, lr = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, cr = (t, { keyframes: e }) => e.length > 2 ? ar : he.has(t) ? t.startsWith("scale") ? or(e[1]) : rr : lr, ur = /* @__PURE__ */ new Set([
  "when",
  "delay",
  "delayChildren",
  "staggerChildren",
  "staggerDirection",
  "repeat",
  "repeatType",
  "repeatDelay",
  "from",
  "elapsed"
]);
function fr(t) {
  for (const e in t)
    if (!ur.has(e))
      return !0;
  return !1;
}
const ss = (t, e, n, s = {}, i, r) => (o) => {
  const a = ns(s, t) || {}, l = a.delay || s.delay || 0;
  let { elapsed: u = 0 } = s;
  u = u - /* @__PURE__ */ P(l);
  const c = {
    keyframes: Array.isArray(n) ? n : [null, n],
    ease: "easeOut",
    velocity: e.getVelocity(),
    ...a,
    delay: -u,
    onUpdate: (d) => {
      e.set(d), a.onUpdate && a.onUpdate(d);
    },
    onComplete: () => {
      o(), a.onComplete && a.onComplete();
    },
    name: t,
    motionValue: e,
    element: r ? void 0 : i
  };
  fr(a) || Object.assign(c, cr(t, c)), c.duration && (c.duration = /* @__PURE__ */ P(c.duration)), c.repeatDelay && (c.repeatDelay = /* @__PURE__ */ P(c.repeatDelay)), c.from !== void 0 && (c.keyframes[0] = c.from);
  let f = !1;
  if ((c.type === !1 || c.duration === 0 && !c.repeatDelay) && (it(c), c.delay === 0 && (f = !0)), (Y.instantAnimations || Y.skipAnimations || i != null && i.shouldSkipAnimations || a.skipAnimations) && (f = !0, it(c), c.delay = 0), c.allowFlatten = !a.type && !a.ease, f && !r && e.get() !== void 0) {
    const d = Be(c.keyframes, a);
    if (d !== void 0) {
      _.update(() => {
        c.onUpdate(d), c.onComplete();
      });
      return;
    }
  }
  return a.isSync ? new Pe(c) : new er(c);
}, dr = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function hr(t) {
  const e = dr.exec(t);
  if (!e)
    return [,];
  const [, n, s, i] = e;
  return [`--${n ?? s}`, i];
}
const pr = 4;
function is(t, e, n = 1) {
  U(n <= pr, `Max CSS variable fallback depth detected in property "${t}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [s, i] = hr(t);
  if (!s)
    return;
  const r = window.getComputedStyle(e).getPropertyValue(s);
  if (r) {
    const o = r.trim();
    return mn(o) ? parseFloat(o) : o;
  }
  return mt(i) ? is(i, e, n + 1) : i;
}
function sn(t) {
  const e = [{}, {}];
  return t == null || t.values.forEach((n, s) => {
    e[0][s] = n.get(), e[1][s] = n.getVelocity();
  }), e;
}
function rs(t, e, n, s) {
  if (typeof e == "function") {
    const [i, r] = sn(s);
    e = e(n !== void 0 ? n : t.custom, i, r);
  }
  if (typeof e == "string" && (e = t.variants && t.variants[e]), typeof e == "function") {
    const [i, r] = sn(s);
    e = e(n !== void 0 ? n : t.custom, i, r);
  }
  return e;
}
function mr(t, e, n) {
  const s = t.getProps();
  return rs(s, e, s.custom, t);
}
const os = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...de
]), gr = (t) => Array.isArray(t);
function yr(t, e, n) {
  t.hasValue(e) ? t.getValue(e).set(n) : t.addValue(e, te(n));
}
function br(t) {
  return gr(t) ? t[t.length - 1] || 0 : t;
}
function Tr(t, e) {
  const n = mr(t, e);
  let { transitionEnd: s = {}, transition: i = {}, ...r } = n || {};
  r = { ...r, ...s };
  for (const o in r) {
    const a = br(r[o]);
    yr(t, o, a);
  }
}
const R = (t) => !!(t && t.getVelocity);
function vr(t) {
  return !!(R(t) && t.add);
}
function wr(t, e) {
  const n = t.getValue("willChange");
  if (vr(n))
    return n.add(e);
  if (!n && Y.WillChange) {
    const s = new Y.WillChange("auto");
    t.addValue("willChange", s), s.add(e);
  }
}
function xt(t) {
  return t.replace(/([A-Z])/g, (e) => `-${e.toLowerCase()}`);
}
const Sr = "framerAppearId", xr = "data-" + xt(Sr);
function Mr(t) {
  return t.props[xr];
}
function Ar({ protectedKeys: t, needsAnimating: e }, n) {
  const s = t.hasOwnProperty(n) && e[n] !== !0;
  return e[n] = !1, s;
}
function Vr(t, e, { delay: n = 0, transitionOverride: s, type: i } = {}) {
  let { transition: r, transitionEnd: o, ...a } = e;
  const l = t.getDefaultTransition();
  r = r ? ts(r, l) : l;
  const u = r == null ? void 0 : r.reduceMotion, c = r == null ? void 0 : r.skipAnimations;
  s && (r = s);
  const f = [], d = i && t.animationState && t.animationState.getState()[i], p = r == null ? void 0 : r.path;
  p && p.animateVisualElement(t, a, r, n, f);
  for (const b in a) {
    const m = t.getValue(b, t.latestValues[b] ?? null), g = a[b];
    if (g === void 0 || d && Ar(d, b))
      continue;
    const y = {
      delay: n,
      ...ns(r || {}, b)
    };
    c && (y.skipAnimations = !0);
    const A = m.get();
    if (A !== void 0 && !m.isAnimating() && !Array.isArray(g) && g === A && !y.velocity) {
      _.update(() => m.set(g));
      continue;
    }
    let M = !1;
    if (window.MotionHandoffAnimation) {
      const C = Mr(t);
      if (C) {
        const D = window.MotionHandoffAnimation(C, b, _);
        D !== null && (y.startTime = D, M = !0);
      }
    }
    wr(t, b);
    const S = u ?? t.shouldReduceMotion;
    m.start(ss(b, m, g, S && os.has(b) ? { type: !1 } : y, t, M));
    const v = m.animation;
    v && f.push(v);
  }
  if (o) {
    const b = () => _.update(() => {
      o && Tr(t, o);
    });
    f.length ? Promise.all(f).then(b) : b();
  }
  return f;
}
const Cr = {
  test: (t) => t === "auto",
  parse: (t) => t
}, as = (t) => (e) => e.test(t), ls = [ue, h, oe, j, Ys, Hs, Cr], rn = (t) => ls.find(as(t));
function Fr(t) {
  return typeof t == "number" ? t === 0 : t !== null ? t === "none" || t === "0" || gn(t) : !0;
}
const Dr = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function Er(t) {
  const [e, n] = t.slice(0, -1).split("(");
  if (e === "drop-shadow")
    return t;
  const [s] = n.match(gt) || [];
  if (!s)
    return t;
  const i = n.replace(s, "");
  let r = Dr.has(e) ? 1 : 0;
  return s !== n && (r *= 100), e + "(" + r + i + ")";
}
const Rr = /\b([a-z-]*)\(.*?\)/gu, rt = {
  ...W,
  getAnimatableNone: (t) => {
    const e = t.match(Rr);
    return e ? e.map(Er).join(" ") : t;
  }
}, ot = {
  ...W,
  getAnimatableNone: (t) => {
    const e = W.parse(t);
    return W.createTransformer(t)(e.map((s) => typeof s == "number" ? 0 : typeof s == "object" ? { ...s, alpha: 1 } : s));
  }
}, on = {
  ...ue,
  transform: Math.round
}, kr = {
  rotate: j,
  /**
   * Internal channel for `transition.path` orientToPath. Composed onto
   * `rotate` at the transform-build sites so the user's `rotate` is
   * never read or overwritten. Not part of `transformPropOrder`.
   */
  pathRotation: j,
  rotateX: j,
  rotateY: j,
  rotateZ: j,
  scale: De,
  scaleX: De,
  scaleY: De,
  scaleZ: De,
  skew: j,
  skewX: j,
  skewY: j,
  distance: h,
  translateX: h,
  translateY: h,
  translateZ: h,
  x: h,
  y: h,
  z: h,
  perspective: h,
  transformPerspective: h,
  opacity: ve,
  originX: jt,
  originY: jt,
  originZ: h
}, Ie = {
  // Border props
  borderWidth: h,
  borderTopWidth: h,
  borderRightWidth: h,
  borderBottomWidth: h,
  borderLeftWidth: h,
  borderRadius: h,
  borderTopLeftRadius: h,
  borderTopRightRadius: h,
  borderBottomRightRadius: h,
  borderBottomLeftRadius: h,
  // Positioning props
  width: h,
  maxWidth: h,
  height: h,
  maxHeight: h,
  top: h,
  right: h,
  bottom: h,
  left: h,
  inset: h,
  insetBlock: h,
  insetBlockStart: h,
  insetBlockEnd: h,
  insetInline: h,
  insetInlineStart: h,
  insetInlineEnd: h,
  // Spacing props
  padding: h,
  paddingTop: h,
  paddingRight: h,
  paddingBottom: h,
  paddingLeft: h,
  paddingBlock: h,
  paddingBlockStart: h,
  paddingBlockEnd: h,
  paddingInline: h,
  paddingInlineStart: h,
  paddingInlineEnd: h,
  margin: h,
  marginTop: h,
  marginRight: h,
  marginBottom: h,
  marginLeft: h,
  marginBlock: h,
  marginBlockStart: h,
  marginBlockEnd: h,
  marginInline: h,
  marginInlineStart: h,
  marginInlineEnd: h,
  // Typography
  fontSize: h,
  // Misc
  backgroundPositionX: h,
  backgroundPositionY: h,
  ...kr,
  zIndex: on,
  // SVG
  fillOpacity: ve,
  strokeOpacity: ve,
  numOctaves: on
}, Or = {
  ...Ie,
  // Color props
  color: E,
  backgroundColor: E,
  outlineColor: E,
  fill: E,
  stroke: E,
  // Border props
  borderColor: E,
  borderTopColor: E,
  borderRightColor: E,
  borderBottomColor: E,
  borderLeftColor: E,
  filter: rt,
  WebkitFilter: rt,
  mask: ot,
  WebkitMask: ot
}, cs = (t) => Or[t], Pr = /* @__PURE__ */ new Set([rt, ot]);
function us(t, e) {
  let n = cs(t);
  return Pr.has(n) || (n = W), n.getAnimatableNone ? n.getAnimatableNone(e) : void 0;
}
const Ir = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function Br(t, e, n) {
  let s = 0, i;
  for (; s < t.length && !i; ) {
    const r = t[s];
    typeof r == "string" && !Ir.has(r) && ae(r).values.length && (i = t[s]), s++;
  }
  if (i && n)
    for (const r of e)
      t[r] = us(n, i);
}
class Nr extends wt {
  constructor(e, n, s, i, r) {
    super(e, n, s, i, r, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: e, element: n, name: s } = this;
    if (!n || !n.current)
      return;
    super.readKeyframes();
    for (let c = 0; c < e.length; c++) {
      let f = e[c];
      if (typeof f == "string" && (f = f.trim(), mt(f))) {
        const d = is(f, n.current);
        d !== void 0 && (e[c] = d), c === e.length - 1 && (this.finalKeyframe = f);
      }
    }
    if (this.resolveNoneKeyframes(), !os.has(s) || e.length !== 2)
      return;
    const [i, r] = e, o = rn(i), a = rn(r), l = zt(i), u = zt(r);
    if (l !== u && q[s]) {
      this.needsMeasurement = !0;
      return;
    }
    if (o !== a)
      if (Qt(o) && Qt(a))
        for (let c = 0; c < e.length; c++) {
          const f = e[c];
          typeof f == "string" && (e[c] = parseFloat(f));
        }
      else q[s] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: e, name: n } = this, s = [];
    for (let i = 0; i < e.length; i++)
      (e[i] === null || Fr(e[i])) && s.push(i);
    s.length && Br(e, s, n);
  }
  measureInitialState() {
    const { element: e, unresolvedKeyframes: n, name: s } = this;
    if (!e || !e.current)
      return;
    s === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = q[s](e.measureViewportBox(), window.getComputedStyle(e.current)), n[0] = this.measuredOrigin;
    const i = n[n.length - 1];
    i !== void 0 && e.getValue(s, i).jump(i, !1);
  }
  measureEndState() {
    var a;
    const { element: e, name: n, unresolvedKeyframes: s } = this;
    if (!e || !e.current)
      return;
    const i = e.getValue(n);
    i && i.jump(this.measuredOrigin, !1);
    const r = s.length - 1, o = s[r];
    s[r] = q[n](e.measureViewportBox(), window.getComputedStyle(e.current)), o !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = o), (a = this.removedTransforms) != null && a.length && this.removedTransforms.forEach(([l, u]) => {
      e.getValue(l).set(u);
    }), this.resolveNoneKeyframes();
  }
}
const Kr = [
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomRightRadius",
  "borderBottomLeftRadius"
];
function Wr(t, e, n) {
  if (t == null)
    return [];
  if (t instanceof EventTarget)
    return [t];
  if (typeof t == "string") {
    let s = document;
    e && (s = e.current);
    const i = (n == null ? void 0 : n[t]) ?? s.querySelectorAll(t);
    return i ? Array.from(i) : [];
  }
  return Array.from(t).filter((s) => s != null);
}
const at = (t, e) => e && typeof t == "number" ? e.transform(t) : t, { schedule: _r } = /* @__PURE__ */ Rn(queueMicrotask, !1);
function fs(t) {
  return Es(t) && "ownerSVGElement" in t;
}
function Lr(t) {
  return fs(t) && t.tagName === "svg";
}
const $r = [...ls, E, W], zr = (t) => $r.find(as(t)), an = () => ({ min: 0, max: 0 }), Mt = () => ({
  x: an(),
  y: an()
}), Se = /* @__PURE__ */ new WeakMap();
function jr(t) {
  return t !== null && typeof t == "object" && typeof t.start == "function";
}
function Ur(t) {
  return typeof t == "string" || Array.isArray(t);
}
const Gr = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], qr = ["initial", ...Gr];
function ds(t) {
  return jr(t.animate) || qr.some((e) => Ur(t[e]));
}
function Hr(t) {
  return !!(ds(t) || t.variants);
}
function Yr(t, e, n) {
  for (const s in e) {
    const i = e[s], r = n[s];
    if (R(i))
      t.addValue(s, i);
    else if (R(r))
      t.addValue(s, te(i, { owner: t }));
    else if (r !== i)
      if (t.hasValue(s)) {
        const o = t.getValue(s);
        o.liveStyle === !0 ? o.jump(i) : o.hasAnimated || o.set(i);
      } else {
        const o = t.getStaticValue(s);
        t.addValue(s, te(o !== void 0 ? o : i, { owner: t }));
      }
  }
  for (const s in n)
    e[s] === void 0 && t.removeValue(s);
  return e;
}
const lt = { current: null }, hs = { current: !1 }, Xr = typeof window < "u";
function Zr() {
  if (hs.current = !0, !!Xr)
    if (window.matchMedia) {
      const t = window.matchMedia("(prefers-reduced-motion)"), e = () => lt.current = t.matches;
      t.addEventListener("change", e), e();
    } else
      lt.current = !1;
}
const ln = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let cn = {};
class ps {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(e, n, s) {
    return {};
  }
  constructor({ parent: e, props: n, presenceContext: s, reducedMotionConfig: i, skipAnimations: r, blockInitialAnimation: o, visualState: a }, l = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = wt, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const p = O.now();
      this.renderScheduledAt < p && (this.renderScheduledAt = p, _.render(this.render, !1, !0));
    };
    const { latestValues: u, renderState: c } = a;
    this.latestValues = u, this.baseTarget = { ...u }, this.initialValues = n.initial ? { ...u } : {}, this.renderState = c, this.parent = e, this.props = n, this.presenceContext = s, this.depth = e ? e.depth + 1 : 0, this.reducedMotionConfig = i, this.skipAnimationsConfig = r, this.options = l, this.blockInitialAnimation = !!o, this.isControllingVariants = ds(n), this.isVariantNode = Hr(n), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(e && e.current);
    const { willChange: f, ...d } = this.scrapeMotionValuesFromProps(n, {}, this);
    for (const p in d) {
      const b = d[p];
      u[p] !== void 0 && R(b) && b.set(u[p]);
    }
  }
  mount(e) {
    var n, s;
    if (this.hasBeenMounted)
      for (const i in this.initialValues)
        (n = this.values.get(i)) == null || n.jump(this.initialValues[i]), this.latestValues[i] = this.initialValues[i];
    this.current = e, Se.set(e, this), this.projection && !this.projection.instance && this.projection.mount(e), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((i, r) => this.bindToMotionValue(r, i)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (hs.current || Zr(), this.shouldReduceMotion = lt.current), process.env.NODE_ENV !== "production" && vn(this.shouldReduceMotion !== !0, "You have Reduced Motion enabled on your device. Animations may not appear as expected.", "reduced-motion-disabled"), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, (s = this.parent) == null || s.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
  }
  unmount() {
    var e;
    this.projection && this.projection.unmount(), Ge(this.notifyUpdate), Ge(this.render), this.valueSubscriptions.forEach((n) => n()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), (e = this.parent) == null || e.removeChild(this);
    for (const n in this.events)
      this.events[n].clear();
    for (const n in this.features) {
      const s = this.features[n];
      s && (s.unmount(), s.isMounted = !1);
    }
    this.current = null;
  }
  addChild(e) {
    this.children.add(e), this.enteringChildren ?? (this.enteringChildren = /* @__PURE__ */ new Set()), this.enteringChildren.add(e);
  }
  removeChild(e) {
    this.children.delete(e), this.enteringChildren && this.enteringChildren.delete(e);
  }
  bindToMotionValue(e, n) {
    if (this.valueSubscriptions.has(e) && this.valueSubscriptions.get(e)(), n.accelerate && es.has(e) && this.current instanceof HTMLElement) {
      const { factory: o, keyframes: a, times: l, ease: u, duration: c } = n.accelerate, f = new Qn({
        element: this.current,
        name: e,
        keyframes: a,
        times: l,
        ease: u,
        duration: /* @__PURE__ */ P(c)
      }), d = o(f);
      this.valueSubscriptions.set(e, () => {
        d(), f.cancel();
      });
      return;
    }
    const s = he.has(e);
    s && this.onBindTransform && this.onBindTransform();
    const i = n.on("change", (o) => {
      this.latestValues[e] = o, this.props.onUpdate && _.preRender(this.notifyUpdate), s && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
    });
    let r;
    typeof window < "u" && window.MotionCheckAppearSync && (r = window.MotionCheckAppearSync(this, e, n)), this.valueSubscriptions.set(e, () => {
      i(), r && r();
    });
  }
  sortNodePosition(e) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== e.type ? 0 : this.sortInstanceNodePosition(this.current, e.current);
  }
  updateFeatures() {
    let e = "animation";
    for (e in cn) {
      const n = cn[e];
      if (!n)
        continue;
      const { isEnabled: s, Feature: i } = n;
      if (!this.features[e] && i && s(this.props) && (this.features[e] = new i(this)), this.features[e]) {
        const r = this.features[e];
        r.isMounted ? r.update() : (r.mount(), r.isMounted = !0);
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  /**
   * Measure the current viewport box with or without transforms.
   * Only measures axis-aligned boxes, rotate and skew must be manually
   * removed with a re-render to work.
   */
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : Mt();
  }
  getStaticValue(e) {
    return this.latestValues[e];
  }
  setStaticValue(e, n) {
    this.latestValues[e] = n;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(e, n) {
    (e.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = e, this.prevPresenceContext = this.presenceContext, this.presenceContext = n;
    for (let s = 0; s < ln.length; s++) {
      const i = ln[s];
      this.propEventSubscriptions[i] && (this.propEventSubscriptions[i](), delete this.propEventSubscriptions[i]);
      const r = "on" + i, o = e[r];
      o && (this.propEventSubscriptions[i] = this.on(i, o));
    }
    this.prevMotionValues = Yr(this, this.scrapeMotionValuesFromProps(e, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(e) {
    return this.props.variants ? this.props.variants[e] : void 0;
  }
  /**
   * Returns the defined default transition on this component.
   */
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  /**
   * Add a child visual element to our set of children.
   */
  addVariantChild(e) {
    const n = this.getClosestVariantNode();
    if (n)
      return n.variantChildren && n.variantChildren.add(e), () => n.variantChildren.delete(e);
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(e, n) {
    const s = this.values.get(e);
    n !== s && (s && this.removeValue(e), this.bindToMotionValue(e, n), this.values.set(e, n), this.latestValues[e] = n.get());
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(e) {
    this.values.delete(e);
    const n = this.valueSubscriptions.get(e);
    n && (n(), this.valueSubscriptions.delete(e)), delete this.latestValues[e], this.removeValueFromRenderState(e, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(e) {
    return this.values.has(e);
  }
  getValue(e, n) {
    if (this.props.values && this.props.values[e])
      return this.props.values[e];
    let s = this.values.get(e);
    return s === void 0 && n !== void 0 && (s = te(n === null ? void 0 : n, { owner: this }), this.addValue(e, s)), s;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(e, n) {
    let s = this.latestValues[e] !== void 0 || !this.current ? this.latestValues[e] : this.getBaseTargetFromProps(this.props, e) ?? this.readValueFromInstance(this.current, e, this.options);
    return s != null && (typeof s == "string" && (mn(s) || gn(s)) ? s = parseFloat(s) : !zr(s) && W.test(n) && (s = us(e, n)), this.setBaseTarget(e, R(s) ? s.get() : s)), R(s) ? s.get() : s;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(e, n) {
    this.baseTarget[e] = n;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(e) {
    var r;
    const { initial: n } = this.props;
    let s;
    if (typeof n == "string" || typeof n == "object") {
      const o = rs(this.props, n, (r = this.presenceContext) == null ? void 0 : r.custom);
      o && (s = o[e]);
    }
    if (n && s !== void 0)
      return s;
    const i = this.getBaseTargetFromProps(this.props, e);
    return i !== void 0 && !R(i) ? i : this.initialValues[e] !== void 0 && s === void 0 ? void 0 : this.baseTarget[e];
  }
  on(e, n) {
    return this.events[e] || (this.events[e] = new bn()), this.events[e].add(n);
  }
  notify(e, ...n) {
    this.events[e] && this.events[e].notify(...n);
  }
  scheduleRenderMicrotask() {
    _r.render(this.render);
  }
}
class ms extends ps {
  constructor() {
    super(...arguments), this.KeyframeResolver = Nr;
  }
  sortInstanceNodePosition(e, n) {
    return e.compareDocumentPosition(n) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(e, n) {
    const s = e.style;
    return s ? s[n] : void 0;
  }
  removeValueFromRenderState(e, { vars: n, style: s }) {
    delete n[e], delete s[e];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: e } = this.props;
    R(e) && (this.childSubscription = e.on("change", (n) => {
      this.current && (this.current.textContent = `${n}`);
    }));
  }
}
function Qr({ top: t, left: e, right: n, bottom: s }) {
  return {
    x: { min: e, max: n },
    y: { min: t, max: s }
  };
}
function Jr(t, e) {
  if (!e)
    return t;
  const n = e({ x: t.left, y: t.top }), s = e({ x: t.right, y: t.bottom });
  return {
    top: n.y,
    left: n.x,
    bottom: s.y,
    right: s.x
  };
}
function eo(t, e) {
  return Qr(Jr(t.getBoundingClientRect(), e));
}
const to = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, no = de.length;
function so(t, e, n) {
  let s = "", i = !0;
  for (let o = 0; o < no; o++) {
    const a = de[o], l = t[a];
    if (l === void 0)
      continue;
    let u = !0;
    if (typeof l == "number")
      u = l === (a.startsWith("scale") ? 1 : 0);
    else {
      const c = parseFloat(l);
      u = a.startsWith("scale") ? c === 1 : c === 0;
    }
    if (!u || n) {
      const c = at(l, Ie[a]);
      if (!u) {
        i = !1;
        const f = to[a] || a;
        s += `${f}(${c}) `;
      }
      n && (e[a] = c);
    }
  }
  const r = t.pathRotation;
  return r && (i = !1, s += `rotate(${at(r, Ie.pathRotation)}) `), s = s.trim(), n ? s = n(e, i ? "" : s) : i && (s = "none"), s;
}
function gs(t, e, n) {
  const { style: s, vars: i, transformOrigin: r } = t;
  let o = !1, a = !1;
  for (const l in e) {
    const u = e[l];
    if (he.has(l)) {
      o = !0;
      continue;
    } else if (On(l)) {
      i[l] = u;
      continue;
    } else {
      const c = at(u, Ie[l]);
      l.startsWith("origin") ? (a = !0, r[l] = c) : s[l] = c;
    }
  }
  if (e.transform || (o || n ? s.transform = so(e, t.transform, n) : s.transform && (s.transform = "none")), a) {
    const { originX: l = "50%", originY: u = "50%", originZ: c = 0 } = r;
    s.transformOrigin = `${l} ${u} ${c}`;
  }
}
function ys(t, { style: e, vars: n }, s, i) {
  const r = t.style;
  let o;
  for (o in e)
    r[o] = e[o];
  i == null || i.applyProjectionStyles(r, s);
  for (o in n)
    r.setProperty(o, n[o]);
}
function un(t, e) {
  return e.max === e.min ? 0 : t / (e.max - e.min) * 100;
}
const ge = {
  correct: (t, e) => {
    if (!e.target)
      return t;
    if (typeof t == "string")
      if (h.test(t))
        t = parseFloat(t);
      else
        return t;
    const n = un(t, e.target.x), s = un(t, e.target.y);
    return `${n}% ${s}%`;
  }
}, io = {
  correct: (t, { treeScale: e, projectionDelta: n }) => {
    const s = t, i = W.parse(t);
    if (i.length > 5)
      return s;
    const r = W.createTransformer(t), o = typeof i[0] != "number" ? 1 : 0, a = n.x.scale * e.x, l = n.y.scale * e.y;
    i[0 + o] /= a, i[1 + o] /= l;
    const u = fe(a, l, 0.5);
    return typeof i[2 + o] == "number" && (i[2 + o] /= u), typeof i[3 + o] == "number" && (i[3 + o] /= u), r(i);
  }
}, ro = {
  borderRadius: {
    ...ge,
    applyTo: [...Kr]
  },
  borderTopLeftRadius: ge,
  borderTopRightRadius: ge,
  borderBottomLeftRadius: ge,
  borderBottomRightRadius: ge,
  boxShadow: io
};
function oo(t, { layout: e, layoutId: n }) {
  return he.has(t) || t.startsWith("origin") || (e || n !== void 0) && (!!ro[t] || t === "opacity");
}
function bs(t, e, n) {
  var o;
  const s = t.style, i = e == null ? void 0 : e.style, r = {};
  if (!s)
    return r;
  for (const a in s)
    (R(s[a]) || i && R(i[a]) || oo(a, t) || ((o = n == null ? void 0 : n.getValue(a)) == null ? void 0 : o.liveStyle) !== void 0) && (r[a] = s[a]);
  return r;
}
function ao(t) {
  return window.getComputedStyle(t);
}
class lo extends ms {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = ys;
  }
  mount(e) {
    U(!!e.style, "motion.create() components must forward their ref to a HTML or SVG element", "custom-component-ref"), super.mount(e);
  }
  readValueFromInstance(e, n) {
    var s;
    if (he.has(n))
      return (s = this.projection) != null && s.isProjecting ? Je(n) : ki(e, n);
    {
      const i = ao(e), r = (On(n) ? i.getPropertyValue(n) : i[n]) || 0;
      return typeof r == "string" ? r.trim() : r;
    }
  }
  measureInstanceViewportBox(e, { transformPagePoint: n }) {
    return eo(e, n);
  }
  build(e, n, s) {
    gs(e, n, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(e, n, s) {
    return bs(e, n, s);
  }
}
function co(t, e) {
  return t in e;
}
class uo extends ps {
  constructor() {
    super(...arguments), this.type = "object";
  }
  readValueFromInstance(e, n) {
    if (co(n, e)) {
      const s = e[n];
      if (typeof s == "string" || typeof s == "number")
        return s;
    }
  }
  getBaseTargetFromProps() {
  }
  removeValueFromRenderState(e, n) {
    delete n.output[e];
  }
  measureInstanceViewportBox() {
    return Mt();
  }
  build(e, n) {
    Object.assign(e.output, n);
  }
  renderInstance(e, { output: n }) {
    Object.assign(e, n);
  }
  sortInstanceNodePosition() {
    return 0;
  }
}
const fo = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, ho = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function po(t, e, n = 1, s = 0, i = !0) {
  t.pathLength = 1;
  const r = i ? fo : ho;
  t[r.offset] = `${-s}`, t[r.array] = `${e} ${n}`;
}
const mo = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function go(t, {
  attrX: e,
  attrY: n,
  attrScale: s,
  pathLength: i,
  pathSpacing: r = 1,
  pathOffset: o = 0,
  // This is object creation, which we try to avoid per-frame.
  ...a
}, l, u, c) {
  if (gs(t, a, u), l) {
    t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
    return;
  }
  t.attrs = t.style, t.style = {};
  const { attrs: f, style: d } = t;
  f.transform && (d.transform = f.transform, delete f.transform), (d.transform || f.transformOrigin) && (d.transformOrigin = f.transformOrigin ?? "50% 50%", delete f.transformOrigin), d.transform && (d.transformBox = (c == null ? void 0 : c.transformBox) ?? "fill-box", delete f.transformBox);
  for (const p of mo)
    f[p] !== void 0 && (d[p] = f[p], delete f[p]);
  e !== void 0 && (f.x = e), n !== void 0 && (f.y = n), s !== void 0 && (f.scale = s), i !== void 0 && po(f, i, r, o, !1);
}
const Ts = /* @__PURE__ */ new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust"
]), yo = (t) => typeof t == "string" && t.toLowerCase() === "svg";
function bo(t, e, n, s) {
  ys(t, e, void 0, s);
  for (const i in e.attrs)
    t.setAttribute(Ts.has(i) ? i : xt(i), e.attrs[i]);
}
function To(t, e, n) {
  const s = bs(t, e, n);
  for (const i in t)
    if (R(t[i]) || R(e[i])) {
      const r = de.indexOf(i) !== -1 ? "attr" + i.charAt(0).toUpperCase() + i.substring(1) : i;
      s[r] = t[i];
    }
  return s;
}
class vo extends ms {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = Mt;
  }
  getBaseTargetFromProps(e, n) {
    return e[n];
  }
  readValueFromInstance(e, n) {
    if (he.has(n)) {
      const s = cs(n);
      return s && s.default || 0;
    }
    return n = Ts.has(n) ? n : xt(n), e.getAttribute(n);
  }
  scrapeMotionValuesFromProps(e, n, s) {
    return To(e, n, s);
  }
  build(e, n, s) {
    go(e, n, this.isSVGTag, s.transformTemplate, s.style);
  }
  renderInstance(e, n, s, i) {
    bo(e, n, s, i);
  }
  mount(e) {
    this.isSVGTag = yo(e.tagName), super.mount(e);
  }
}
function wo(t, e, n) {
  const s = R(t) ? t : te(t);
  return s.start(ss("", s, e, n)), s.animation;
}
function At(t) {
  return typeof t == "object" && !Array.isArray(t);
}
function vs(t, e, n, s) {
  return t == null ? [] : typeof t == "string" && At(e) ? Wr(t, n, s) : t instanceof NodeList ? Array.from(t) : Array.isArray(t) ? t.filter((i) => i != null) : [t];
}
function So(t, e, n) {
  return t * (e + 1) + n * e;
}
function fn(t, e, n, s) {
  return typeof e == "number" ? e : e.startsWith("-") || e.startsWith("+") ? Math.max(0, t + parseFloat(e)) : e === "<" ? n : e.startsWith("<") ? Math.max(0, n + parseFloat(e.slice(1))) : s.get(e) ?? t;
}
function xo(t, e, n) {
  for (let s = 0; s < t.length; s++) {
    const i = t[s];
    i.at > e && i.at < n && (ct(t, i), s--);
  }
}
function Mo(t, e, n, s, i, r) {
  xo(t, i, r);
  for (let o = 0; o < e.length; o++)
    t.push({
      value: e[o],
      at: fe(i, r, s[o]),
      easing: /* @__PURE__ */ Dn(n, o)
    });
}
function Ao(t, e, n = 0) {
  const s = e + 1 + e * n;
  for (let i = 0; i < t.length; i++)
    t[i] = t[i] / s;
}
function Vo(t, e) {
  return t.at === e.at ? t.value === null ? 1 : e.value === null ? -1 : 0 : t.at - e.at;
}
const Co = "easeInOut", $e = 20;
function Fo(t, { defaultTransition: e = {}, ...n } = {}, s, i) {
  const r = e.duration || 0.3, o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), l = {}, u = /* @__PURE__ */ new Map();
  let c = 0, f = 0, d = 0;
  for (let p = 0; p < t.length; p++) {
    const b = t[p];
    if (typeof b == "string") {
      u.set(b, f);
      continue;
    } else if (!Array.isArray(b)) {
      u.set(b.name, fn(f, b.at, c, u));
      continue;
    }
    let [m, g, y = {}] = b;
    y.at !== void 0 && (f = fn(f, y.at, c, u));
    let A = 0;
    const M = (S, v, C, D = 0, w = 0) => {
      const x = Do(S), { delay: T = 0, times: V = jn(x), type: I = e.type || "keyframes", repeat: k, repeatType: B, repeatDelay: L = 0, ...$ } = v;
      let { ease: z = e.ease || "easeOut", duration: N } = v;
      const Ct = typeof T == "function" ? T(D, w) : T, Ft = x.length, Dt = St(I) ? I : i == null ? void 0 : i[I || "keyframes"];
      if (Ft <= 2 && Dt) {
        let ne = 100;
        if (Ft === 2 && ko(x)) {
          const pe = x[1] - x[0];
          ne = Math.abs(pe);
        }
        const se = {
          ...e,
          ...$
        };
        N !== void 0 && (se.duration = /* @__PURE__ */ P(N));
        const Ve = Ln(se, ne, Dt);
        z = Ve.ease, N = Ve.duration;
      }
      N ?? (N = r);
      const Et = f + Ct;
      V.length === 1 && V[0] === 0 && (V[1] = 1);
      const Rt = V.length - x.length;
      if (Rt > 0 && zn(V, Rt), x.length === 1 && x.unshift(null), k && le(k < $e, `Sequence segments can't repeat ${k} times — ignoring repeat option. Use a value below ${$e} or apply repeat at the sequence level instead.`), k && k < $e) {
        const ne = N > 0 ? L / N : 0;
        N = So(N, k, L);
        const se = [...x], Ve = [...V];
        z = Array.isArray(z) ? [...z] : [z];
        const pe = [...z], Ot = B === "reverse" || B === "mirror";
        let Pt = se, It = pe;
        Ot && (Pt = [...se].reverse(), B === "reverse" && (It = [...pe].reverse().map((G) => typeof G == "function" ? /* @__PURE__ */ dt(G) : G)));
        for (let G = 0; G < k; G++) {
          const Bt = Ot && G % 2 === 0, Nt = Bt ? Pt : se, Ms = Bt ? It : pe, Kt = (G + 1) * (1 + ne);
          ne > 0 && (x.push(x[x.length - 1]), V.push(Kt), z.push("linear")), x.push(...Nt);
          for (let me = 0; me < Nt.length; me++)
            V.push(Ve[me] + Kt), z.push(me === 0 ? "linear" : /* @__PURE__ */ Dn(Ms, me - 1));
        }
        Ao(V, k, ne);
      }
      const kt = Et + N;
      Mo(C, x, z, V, Et, kt), A = Math.max(Ct + N, A), d = Math.max(kt, d);
    };
    if (R(m)) {
      const S = dn(m, a);
      M(g, y, hn("default", S));
    } else {
      const S = vs(m, g, s, l), v = S.length;
      for (let C = 0; C < v; C++) {
        g = g, y = y;
        const D = S[C], w = dn(D, a);
        for (const x in g)
          M(g[x], Eo(y, x), hn(x, w), C, v);
      }
    }
    c = f, f += A;
  }
  return a.forEach((p, b) => {
    for (const m in p) {
      const g = p[m];
      g.sort(Vo);
      const y = [], A = [], M = [];
      for (let D = 0; D < g.length; D++) {
        const { at: w, value: x, easing: T } = g[D];
        y.push(x), A.push(/* @__PURE__ */ ft(0, d, w)), M.push(T || "easeOut");
      }
      A[0] !== 0 && (A.unshift(0), y.unshift(y[0]), M.unshift(Co)), A[A.length - 1] !== 1 && (A.push(1), y.push(null)), o.has(b) || o.set(b, {
        keyframes: {},
        transition: {}
      });
      const S = o.get(b);
      S.keyframes[m] = y;
      const { type: v, ...C } = e;
      S.transition[m] = {
        ...C,
        duration: d,
        ease: M,
        times: A,
        ...n
      };
    }
  }), o;
}
function dn(t, e) {
  return !e.has(t) && e.set(t, {}), e.get(t);
}
function hn(t, e) {
  return e[t] || (e[t] = []), e[t];
}
function Do(t) {
  return Array.isArray(t) ? t : [t];
}
function Eo(t, e) {
  return t && t[e] ? {
    ...t,
    ...t[e]
  } : { ...t };
}
const Ro = (t) => typeof t == "number", ko = (t) => t.every(Ro);
function Oo(t) {
  const e = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        transform: {},
        transformOrigin: {},
        style: {},
        vars: {},
        attrs: {}
      },
      latestValues: {}
    }
  }, n = fs(t) && !Lr(t) ? new vo(e) : new lo(e);
  n.mount(t), Se.set(t, n);
}
function Po(t) {
  const e = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        output: {}
      },
      latestValues: {}
    }
  }, n = new uo(e);
  n.mount(t), Se.set(t, n);
}
function Io(t, e) {
  return R(t) || typeof t == "number" || typeof t == "string" && !At(e);
}
function ws(t, e, n, s) {
  const i = [];
  if (Io(t, e))
    i.push(wo(t, At(e) && e.default || e, n && (n.default || n)));
  else {
    if (t == null)
      return i;
    const r = vs(t, e, s), o = r.length;
    U(!!o, "No valid elements provided.", "no-valid-elements");
    for (let a = 0; a < o; a++) {
      const l = r[a], u = l instanceof Element ? Oo : Po;
      Se.has(l) || u(l);
      const c = Se.get(l), f = { ...n };
      "delay" in f && typeof f.delay == "function" && (f.delay = f.delay(a, o)), i.push(...Vr(c, { ...e, transition: f }, {}));
    }
  }
  return i;
}
function Bo(t, e, n) {
  const s = [], i = t.map((o) => {
    if (Array.isArray(o) && typeof o[0] == "function") {
      const a = o[0], l = te(0);
      return l.on("change", a), o.length === 1 ? [l, [0, 1]] : o.length === 2 ? [l, [0, 1], o[1]] : [l, o[1], o[2]];
    }
    return o;
  });
  return Fo(i, e, n, { spring: we }).forEach(({ keyframes: o, transition: a }, l) => {
    s.push(...ws(l, o, a));
  }), s;
}
function No(t) {
  return Array.isArray(t) && t.some(Array.isArray);
}
function Ko(t = {}) {
  const { scope: e, reduceMotion: n, skipAnimations: s } = t;
  function i(r, o, a) {
    let l = [], u;
    const c = {};
    if (n !== void 0 && (c.reduceMotion = n), s !== void 0 && (c.skipAnimations = s), No(r)) {
      const { onComplete: d, ...p } = o || {};
      typeof d == "function" && (u = d), l = Bo(r, { ...c, ...p }, e);
    } else {
      const { onComplete: d, ...p } = a || {};
      typeof d == "function" && (u = d), l = ws(r, o, { ...c, ...p }, e);
    }
    const f = new nr(l);
    return u && f.finished.then(u), e && (e.animations.push(f), f.finished.then(() => {
      ct(e.animations, f);
    })), f;
  }
  return i;
}
const Vt = Ko(), be = /* @__PURE__ */ new Set();
let xe = 0;
function Wo() {
  xe = 0;
  const t = matchMedia("(prefers-reduced-motion: reduce)").matches;
  be.forEach((e) => {
    if (!e.visible) return;
    const n = e.element.getBoundingClientRect();
    e.update(t ? 1 : Math.max(0, Math.min(1, (innerHeight - n.top) / (innerHeight + n.height))));
  });
}
function Z() {
  xe || (xe = requestAnimationFrame(Wo));
}
function _o(t, e) {
  const n = { element: t, update: e, visible: !0 };
  be.size || (document.addEventListener("scroll", Z, { passive: !0, capture: !0 }), addEventListener("resize", Z)), be.add(n);
  const s = new IntersectionObserver((i) => {
    n.visible = i[0].isIntersecting, Z();
  }, { rootMargin: "100px" });
  return s.observe(t), Z(), () => {
    s.disconnect(), be.delete(n), be.size || (document.removeEventListener("scroll", Z, !0), removeEventListener("resize", Z), cancelAnimationFrame(xe), xe = 0);
  };
}
function sa() {
  Z();
}
function ia(t) {
  for (let e = t.parentElement; e; e = e.parentElement) {
    if (/(auto|scroll)/.test(getComputedStyle(e).overflowY) && e.scrollHeight > e.clientHeight + 1) return e.scrollTop;
    if (e === document.body) break;
  }
  return scrollY;
}
function ra(t, e, n, s) {
  const i = te(t);
  let r = t;
  const o = i.on("change", e);
  return e(t), { set(a) {
    Math.abs(a - r) < 1e-5 || (r = a, matchMedia("(prefers-reduced-motion: reduce)").matches ? i.jump(a) : Vt(i, a, { type: "spring", stiffness: n, damping: s, mass: 1, restDelta: 1e-3 }));
  }, destroy() {
    o(), i.destroy();
  } };
}
function oa(t) {
  const e = Array.from(t.childNodes).find((u) => u.nodeType === Node.TEXT_NODE);
  if (!e) return () => {
  };
  const n = e.data;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {
  };
  const s = /[\u0600-\u06ff]/.test(n) ? "ابتثجحخدذرزسشصضطظعغفقكلمنهوي" : "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?~", i = document.createElement("span"), r = document.createElement("span");
  r.style.opacity = "0";
  let o = n;
  const a = () => {
    i.remove(), r.remove(), e.data === o && (e.data = n);
  }, l = Vt(0, 1, { delay: 1, duration: (n.length + 10) * 0.032, ease: "linear", onUpdate: (u) => {
    if (e.data !== o) {
      i.remove(), r.remove();
      return;
    }
    const c = Math.min(n.length, Math.floor(u * (n.length + 10))), f = Math.max(0, c - 10);
    i.textContent = Array.from(n.slice(f, c)).map((d, p) => s[(Math.floor(u * 997) + p * 17) % s.length]).join(""), r.textContent = n.slice(c), o = n.slice(0, f), e.data = o, e.after(i, r);
  }, onComplete: a });
  return () => {
    l.stop(), a();
  };
}
function Lo(t) {
  const e = t.host;
  if (!e) return () => {
  };
  const n = matchMedia("(prefers-reduced-motion: reduce)");
  if (n.matches) return () => {
  };
  const i = ({
    hero: [{ selector: ".bottom", y: 20, delay: 1 }],
    highlights: [{ selector: ".eyebrow", y: 20 }, { selector: "h2", y: 20, delay: 0.2 }, { selector: ".heading .mono", y: 20, delay: 0.4 }, { selector: ".card:nth-child(1)", y: 60, delay: 0.4, duration: 1.4 }, { selector: ".card:nth-child(2)", y: 60, delay: 0.5, duration: 1.4 }, { selector: ".card:nth-child(3)", y: 60, delay: 0.7, duration: 1.4 }, { selector: ".caption", y: 110 }],
    features: [{ selector: ".feature", opacity: 0.5, duration: 0.7, repeat: !0 }],
    video: [{ selector: ".caption", delay: 0.6, repeat: !0 }],
    testimonials: [{ selector: ".eyebrow", y: 20 }, { selector: "h2", y: 20, delay: 0.1 }, { selector: ".viewport:nth-child(1)", duration: 0.8, threshold: 1 }, { selector: ".viewport:nth-child(2)", delay: 0.2, duration: 0.8, threshold: 1 }, { selector: ".caption", y: 20, delay: 0.4 }],
    "buy-now": [{ selector: ".info h2", y: 20 }]
  }[e.dataset.section || ""] || []).flatMap((a) => Array.from(t.querySelectorAll(a.selector)).map((l) => ({ entry: a, element: l, played: !1, active: !1, animation: void 0 })));
  i.forEach(({ entry: a, element: l }) => {
    l.style.opacity = String(a.opacity ?? 0), a.y && (l.style.translate = "0 " + a.y + "px");
  });
  const r = _o(e, () => {
    i.forEach((a) => {
      var d;
      const { entry: l, element: u } = a, f = (e.dataset.section === "features" ? u : e).getBoundingClientRect().top <= innerHeight * (l.threshold ?? 0.5) + 1;
      f === a.active || !l.repeat && a.played || (a.active = f, f && (a.played = !0), (d = a.animation) == null || d.stop(), a.animation = Vt(f ? 0 : 1, f ? 1 : 0, { type: e.dataset.section === "features" ? "keyframes" : "spring", bounce: 0.2, duration: l.duration ?? 1.2, delay: f ? l.delay ?? 0 : 0, ease: [0.92, 0.03, 0.56, 1], onUpdate: (p) => {
        u.style.opacity = String((l.opacity ?? 0) + (1 - (l.opacity ?? 0)) * p), l.y && (u.style.translate = "0 " + l.y * (1 - p) + "px");
      } }));
    });
  }), o = () => {
    r(), i.forEach(({ element: a, animation: l }) => {
      l == null || l.stop(), a.style.removeProperty("opacity"), a.style.removeProperty("translate");
    });
  };
  return n.addEventListener("change", o), () => {
    o(), n.removeEventListener("change", o);
  };
}
function aa(t, e = !0) {
  const n = new IntersectionObserver((s) => {
    s[0].isIntersecting && e && !matchMedia("(prefers-reduced-motion: reduce)").matches ? t.play().catch(() => {
    }) : t.pause();
  });
  return n.observe(t), () => {
    n.disconnect(), t.pause();
  };
}
const Ss = /* @__PURE__ */ new Map();
function xs(t) {
  for (let e = t.parentElement; e; e = e.parentElement) {
    if (/(auto|scroll)/.test(getComputedStyle(e).overflowY) && e.scrollHeight > e.clientHeight + 1) return e;
    if (e === document.body) break;
  }
  return window;
}
function $o(t) {
  const e = Ss.get(xs(t));
  e && !matchMedia("(prefers-reduced-motion: reduce)").matches ? e.lenis.scrollTo(t, { duration: 1 }) : t.scrollIntoView({ behavior: "instant" });
}
function la(t) {
  const e = xs(t), n = Ss.get(e), s = e === window ? document.documentElement : e, i = s.style.overflow, r = n == null ? void 0 : n.lenis.isStopped;
  n == null || n.lenis.stop(), s.style.overflow = "hidden";
  let o = !1;
  return () => {
    o || (o = !0, s.style.overflow = i, n && !r && n.lenis.start());
  };
}
const zo = {
  title: {
    ar: "حضور يسبق الكلمات.",
    en: "A presence before words."
  },
  note: {
    ar: "توم فورد أود وود — توقيعك العطري.",
    en: "TOM FORD Oud Wood — your scent signature."
  },
  accent_text: {
    ar: "أثر لا يُنسى",
    en: "An unforgettable impression"
  },
  description: {
    ar: "اجعل للحظة توقيعًا، ولحضورك حكاية.",
    en: "Give the moment a signature. Give your presence a story."
  },
  cta_label: {
    ar: "اكتشف أود وود",
    en: "Discover Oud Wood"
  },
  cta_target: "buy-now",
  cta_url: "",
  scroll_label: {
    ar: "[اكتشف المزيد]",
    en: "[Explore more]"
  },
  video: "https://e.top4top.io/m_3935jsezk1.mp4",
  poster: "/demo-uploads/7939f541-c8d7-4ca8-a3b2-e42a01ad4451.png",
  background: "#000000",
  foreground: "#ffffff",
  accent: "#c3a468"
}, jo = {
  eyebrow: {
    ar: "تفاصيل أود وود",
    en: "Highlights"
  },
  title: {
    ar: "زجاج شفاف. لون جريء. تجربة نقية.",
    en: "Transparent glass. Bold color. Pure experience."
  },
  description: {
    ar: "من أول نظرة إلى آخر لمسة، تفاصيل تكمل حكاية العطر.",
    en: "Focused details that showcase MORAE’s precision, material clarity, and intentional design."
  },
  caption: {
    ar: "® التفاصيل تصنع التوقيع.",
    en: "® Details define the signature."
  },
  items: [
    {
      title: {
        ar: "الزجاجة",
        en: "The Bottle"
      },
      image: "/demo-uploads/642fc598-c8e6-4fff-9e42-ceb256a8aa5f.png"
    },
    {
      title: {
        ar: "تفاصيل الغطاء",
        en: "The Cap Details"
      },
      image: "/demo-uploads/b6687bad-5847-44ef-857a-64e145a84bb6.png"
    },
    {
      title: {
        ar: "توقيع توم فورد",
        en: "The TOM FORD Signature"
      },
      image: "/demo-uploads/ed1a2c68-e232-4a76-80c8-533248b397ab.png"
    }
  ],
  background: "#000000",
  foreground: "#ffffff",
  accent: "#c3a468"
}, Uo = {
  eyebrow: {
    ar: "توقيعك العطري",
    en: "Your Scent Signature"
  },
  text: {
    ar: `بعض اللحظات تبقى في الذاكرة.
امنحها توقيعك الخاص.`,
    en: `Some moments stay with you.
Give them your own signature.`
  },
  background: "#000000",
  foreground: "#ffffff",
  accent: "#c3a468"
}, Go = {
  label: {
    ar: "أود وود من كل زاوية",
    en: "Oud Wood From Every Angle"
  },
  images: [
    {
      image: "/demo-uploads/84bbbbb3-d0bf-40fb-bf7a-d0af7787fa91.png",
      alt: {
        ar: "زجاجة توم فورد أود وود من الأمام",
        en: "Front view of the TOM FORD Oud Wood bottle"
      }
    },
    {
      image: "/demo-uploads/5d0074f2-86f6-480d-9114-7a295751f5aa.png",
      alt: {
        ar: "تفاصيل غطاء زجاجة توم فورد أود وود",
        en: "Close-up of the TOM FORD Oud Wood bottle cap"
      }
    },
    {
      image: "/demo-uploads/8e9a359e-bf1c-43ec-8f9e-77e69a3ef873.png",
      alt: {
        ar: "زجاجة توم فورد أود وود مع عبوتها",
        en: "TOM FORD Oud Wood bottle with its packaging"
      }
    }
  ],
  background: "#000000",
  foreground: "#ffffff",
  accent: "#c3a468"
}, qo = {
  label: {
    ar: "ملامح العطر",
    en: "Technical features"
  },
  intro_image: "/demo-uploads/dc1c0642-07c9-44b4-af0b-7c1a9659a307.png",
  items: [
    {
      title: {
        ar: "الهيل",
        en: "Cardamom"
      },
      description: {
        ar: "لمسة من التوابل تفتح باب الحكاية.",
        en: "A touch of spice sets the story in motion."
      },
      image: "/demo-uploads/9557a3ce-4d4e-4e57-b1f6-1f1420c6502e.png"
    },
    {
      title: {
        ar: "نوتات العود",
        en: "Oud Notes"
      },
      description: {
        ar: "الطابع الخشبي الذي يحمل اسم أود وود.",
        en: "The woody character behind the Oud Wood name."
      },
      image: "/demo-uploads/c5213d52-ebe9-4a94-8ebc-057501ca9ddb.png"
    },
    {
      title: {
        ar: "الباتشولي",
        en: "Patchouli"
      },
      description: {
        ar: "بعد آخر في تركيبة تستحق الاكتشاف.",
        en: "Another dimension in a composition worth discovering."
      },
      image: "/demo-uploads/5b95f644-d4df-442b-80dc-ab7841e0146a.png"
    },
    {
      title: {
        ar: "العنبر",
        en: "Amber"
      },
      description: {
        ar: "دفء يكمل ملامح التجربة.",
        en: "Warmth that completes the experience."
      },
      image: "/demo-uploads/0f43dc27-adf0-429d-a6d8-18b49c1bbc92.png"
    },
    {
      title: {
        ar: "حبوب التونكا",
        en: "Tonka Bean"
      },
      description: {
        ar: "تفصيلة أخيرة في توقيع أود وود.",
        en: "A final detail in the Oud Wood signature."
      },
      image: "/demo-uploads/1376e40c-820c-4021-894d-65f0bd945a82.png"
    }
  ],
  background: "#000000",
  foreground: "#ffffff",
  accent: "#a78d5b"
}, Ho = {
  title: {
    ar: "شاهد التفاصيل عن قرب",
    en: "Moments That Matter"
  },
  video: "https://h.top4top.io/m_3935a93zl1.mp4",
  poster: "/demo-uploads/4469ce55-adb7-4a21-a684-d3e1f10c184b.png",
  play_label: {
    ar: "تشغيل الفيديو",
    en: "Play film"
  },
  pause_label: {
    ar: "إيقاف الفيديو",
    en: "Pause film"
  },
  background: "#000000",
  foreground: "#ffffff",
  accent: "#c3a468"
}, Yo = {
  eyebrow: {
    ar: "آراء العملاء",
    en: "Testimonials"
  },
  title: {
    ar: "مساحة لآراء عملائك.",
    en: "A place for your customer stories."
  },
  caption: {
    ar: "آراء توضيحية فقط — استبدلها بآراء حقيقية قبل النشر.",
    en: "Illustrative examples only — replace with real customer testimonials before publishing."
  },
  items: [
    {
      quote: {
        ar: "مثال: الصور وضّحت لي تفاصيل المنتج.",
        en: "Example: The photos helped me understand the product details."
      },
      author: {
        ar: "عميل تجريبي 1",
        en: "Sample customer 1"
      }
    },
    {
      quote: {
        ar: "مثال: تجربة الطلب كانت سهلة.",
        en: "Example: Ordering was straightforward."
      },
      author: {
        ar: "عميل تجريبي 2",
        en: "Sample customer 2"
      }
    },
    {
      quote: {
        ar: "مثال: وصل المنتج بتغليف مرتب.",
        en: "Example: The product arrived neatly packaged."
      },
      author: {
        ar: "عميل تجريبي 3",
        en: "Sample customer 3"
      }
    },
    {
      quote: {
        ar: "مثال: وجدت المواصفات التي أبحث عنها.",
        en: "Example: I found the specifications I needed."
      },
      author: {
        ar: "عميل تجريبي 4",
        en: "Sample customer 4"
      }
    },
    {
      quote: {
        ar: "مثال: خدمة العملاء أجابت عن استفساري.",
        en: "Example: Customer support answered my question."
      },
      author: {
        ar: "عميل تجريبي 5",
        en: "Sample customer 5"
      }
    },
    {
      quote: {
        ar: "مثال: المنتج مناسب لاحتياجي.",
        en: "Example: The product suited my needs."
      },
      author: {
        ar: "عميل تجريبي 6",
        en: "Sample customer 6"
      }
    }
  ],
  background: "#000000",
  foreground: "#ffffff",
  accent: "#fc721b"
}, Xo = {
  hero: zo,
  "product-strip": {
    product_name: {
      ar: "توم فورد أود وود",
      en: "TOM FORD Oud Wood"
    },
    detail_label: {
      ar: "اكتشف التفاصيل",
      en: "Explore Details"
    },
    cta_label: {
      ar: "أضف إلى السلة",
      en: "ADD TO CART"
    },
    target: "buy-now",
    product_url: "",
    image: "/demo-uploads/6eb5ff53-91b4-4bda-aa50-6bde7b3cac8b.png",
    price: {
      ar: "259.00 $",
      en: "$259.00"
    },
    colors: {
      ar: "50 مل · أو دو بارفان",
      en: "50 ml · Eau de Parfumر"
    },
    product: [],
    background: "#000000",
    foreground: "#ffffff",
    accent: "#c3a468"
  },
  highlights: jo,
  sound: Uo,
  gallery: Go,
  features: qo,
  video: Ho,
  testimonials: Yo,
  "buy-now": {
    product_name: {
      ar: "توم فورد أود وود",
      en: "TOM FORD Oud Wood"
    },
    description: {
      ar: "أو دو بارفان · 50 مل",
      en: "Eau de Parfum · 50 ml"
    },
    specs_label: {
      ar: "تفاصيل العطر",
      en: "Fragrance Details"
    },
    specs: [
      {
        text: {
          ar: "توم فورد أود وود",
          en: "TOM FORD Oud Wood"
        }
      },
      {
        text: {
          ar: "أو دو بارفان",
          en: "Eau de Parfum"
        }
      },
      {
        text: {
          ar: "الحجم: 50 ملر",
          en: "Size: 50 ml"
        }
      }
    ],
    color_label: {
      ar: "الحجم",
      en: "Size"
    },
    price: {
      ar: "259.00 $",
      en: "$259.00"
    },
    cta_label: {
      ar: "أضف إلى السلة",
      en: "ADD TO CART"
    },
    quantity_label: {
      ar: "الكمية",
      en: "Quantity"
    },
    preview_message: {
      ar: "اختر منتج العطر من سلة لتفعيل الشراء.",
      en: "Select the fragrance product from Salla to enable purchases."
    },
    loading_message: {
      ar: "جارٍ تحميل العطر…",
      en: "Loading fragrance…"
    },
    error_message: {
      ar: "تعذّر تحميل العطر. يرجى المحاولة مجددًا.",
      en: "Unable to load the fragrance. Please try again."
    },
    product: [],
    variants: [
      {
        name: {
          ar: "30 مل",
          en: "30 ml"
        },
        color: "#c3a468",
        image: "/demo-uploads/71108eb8-529a-4519-8257-2c33b9b5ca8a.png"
      },
      {
        name: {
          ar: "50 مل",
          en: "50 ml"
        },
        color: "#9e9e9e",
        image: "/demo-uploads/121ba416-79ee-4c42-8947-5c593bbf5ec2.png"
      },
      {
        name: {
          ar: "100 مل",
          en: "100 ml"
        },
        color: "#282828",
        image: "/demo-uploads/c1ecd4dd-909f-4aab-a906-6ca92cec37c0.png"
      }
    ],
    background: "#000000",
    foreground: "#ffffff",
    accent: "#c3a468",
    details_title: {
      ar: "تفاصيل أود وود",
      en: "Oud Wood Details"
    },
    close_label: {
      ar: "إغلاق",
      en: "Close"
    },
    detailed_specs: [
      {
        title: {
          ar: "بيانات العطر",
          en: "Fragrance Information"
        },
        body: {
          ar: `العلامة التجارية | توم فورد
اسم العطر | أود وود
التركيز | أو دو بارفان
الحجم | 50 مل`,
          en: `Brand | TOM FORD
Fragrance | Oud Wood
Concentration | Eau de Parfum
Size | 50 ml`
        }
      },
      {
        title: {
          ar: "النوتات العطرية",
          en: "Fragrance Notes"
        },
        body: {
          ar: `النوتات المعلنة
الهيل، الفلفل الوردي، الباتشولي، العنبر، نوتات العود، حبوب التونكا.`,
          en: `Listed Notes
Cardamom, pink pepper, patchouli, amber, oud notes, tonka bean.`
        }
      },
      {
        title: {
          ar: "طريقة الاستخدام",
          en: "How to Use"
        },
        body: {
          ar: `الاستخدام
رش مرة أو مرتين على بشرة نظيفة في المواضع المرغوبة.

بعد الاستخدام
لا تفرك العطر على البشرة.`,
          en: `Application
Apply one or two sprays to clean skin on the desired areas.

After Application
Avoid rubbing the fragrance into the skin.`
        }
      },
      {
        title: {
          ar: "معلومات الشراء",
          en: "Purchase Information"
        },
        body: {
          ar: `السعر والتوفر
تُعرض البيانات الحالية من المنتج المرتبط في المتجر.

الشحن والاسترجاع
تسري سياسات المتجر المعروضة قبل إتمام الطلب.`,
          en: `Price and Availability
Current details are provided by the linked store product.

Shipping and Returns
The store policies shown before checkout apply.`
        }
      }
    ],
    demo_message: {
      ar: "معاينة تطوير بمنتج وهمي؛ لم تتم إضافة منتج إلى سلة متجر حقيقي.",
      en: "Development preview with a mock product; nothing was added to a real store cart."
    },
    sold_out_label: {
      ar: "نفدت الكمية",
      en: "Sold out"
    }
  }
};
function Zo(t) {
  if (typeof t != "string") return "";
  const e = t.trim();
  if (!e || /[\u0000-\u0020\\]/.test(e) || e.startsWith("//")) return "";
  if (e.startsWith("/") || e.startsWith("#")) return e;
  try {
    const n = new URL(e);
    return n.protocol === "https:" && !n.username && !n.password ? n.href : "";
  } catch {
    return "";
  }
}
var Qo = Object.defineProperty, Jo = (t, e, n, s) => {
  for (var i = void 0, r = t.length - 1, o; r >= 0; r--)
    (o = t[r]) && (i = o(e, n, i) || i);
  return i && Qo(e, n, i), i;
};
class ea extends Wt {
  constructor() {
    super(...arguments), this.config = {}, this.section = "hero", this.connection = 0;
  }
  get settings() {
    return je({ ...Xo[this.section], ...this.config }, ze());
  }
  get ui() {
    return ze() === "ar" ? { decrease: "تقليل الكمية", increase: "زيادة الكمية", pause: "إيقاف حركة الآراء", resume: "استئناف حركة الآراء" } : { decrease: "Decrease quantity", increase: "Increase quantity", pause: "Pause testimonials", resume: "Resume testimonials" };
  }
  static registerSallaComponent(e) {
    const n = Wt.registerSallaComponent;
    n ? n.call(this, e) : customElements.get(e) || customElements.define(e, this);
  }
  connectedCallback() {
    super.connectedCallback();
    const e = ++this.connection;
    if (this.dataset.section = this.section, this.updateDirection(), this.stopLanguage = Fs(() => {
      this.requestUpdate(), this.updateComplete.then(() => {
        this.isConnected && this.restartMotion();
      });
    }), this.updateComplete.then(() => {
      this.isConnected && e === this.connection && this.restartMotion();
    }), !document.getElementById("tarwadah-fonts")) {
      const n = document.createElement("style");
      n.id = "tarwadah-fonts", n.textContent = `
        @font-face{font-family:'TW Instrument';src:url('https://fonts.gstatic.com/s/instrumentserif/v5/jizBRFtNs2ka5fXjeivQ4LroWlx-2zcZj1bIkNo.woff2');font-display:swap}
        @font-face{font-family:'TW Mono';src:url('https://fonts.gstatic.com/s/fragmentmono/v6/4iCr6K5wfMRRjxp0DA6-2CLnB4NHhg.woff2');font-display:swap}
        @font-face{font-family:'TW Roboto Mono';src:url('https://fonts.gstatic.com/s/robotomono/v31/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_3vqPRu-5Ip2sSQ.woff2');font-display:swap}
        @font-face{font-family:'TW Satoshi';src:url('https://framerusercontent.com/third-party-assets/fontshare/wf/P2LQKHE6KA6ZP4AAGN72KDWMHH6ZH3TA/ZC32TK2P7FPS5GFTL46EU6KQJA24ZYDB/7AHDUZ4A7LFLVFUIFSARGIWCRQJHISQP.woff2');font-weight:400 700;font-display:swap}
      `, document.head.append(n);
    }
  }
  startMotion() {
  }
  restartMotion() {
    var e;
    this.startMotion(), (e = this.stopReveal) == null || e.call(this), this.stopReveal = Lo(this.renderRoot);
  }
  disconnectedCallback() {
    var e, n, s, i;
    this.connection++, (e = this.stopLanguage) == null || e.call(this), (n = this.stopCursor) == null || n.call(this), (s = this.stopScroll) == null || s.call(this), (i = this.stopReveal) == null || i.call(this), super.disconnectedCallback();
  }
  updated(e) {
    this.updateDirection(), e.has("config") && this.restartMotion();
    const n = this.settings;
    this.style.setProperty("--tw-bg", n.background || "#000000"), this.style.setProperty("--tw-ink", n.foreground || "#ffffff"), this.style.setProperty("--tw-accent", n.accent || "#fc721b");
  }
  updateDirection() {
    var s, i;
    const e = this.settings, n = [e.title, e.text, e.description, e.eyebrow, e.label, (i = (s = e.items) == null ? void 0 : s[0]) == null ? void 0 : i.title].filter(Boolean).join(" ");
    this.dir = /[\u0600-\u06ff]/.test(n) ? "rtl" : "ltr";
  }
  targetElement(e) {
    if (typeof e != "string" || !e.trim()) return;
    const n = e.trim().replace(/^#/, "");
    return document.getElementById(n) || Array.from(document.querySelectorAll("[data-section]")).find((s) => s.dataset.section === n);
  }
  actionHref(e, n = "") {
    const s = this.targetElement(e);
    return s ? (s.id || (s.id = `malmah-${crypto.randomUUID()}`), `#${s.id}`) : Zo(n);
  }
  followAction(e, n) {
    const s = this.targetElement(n);
    s && (e.preventDefault(), $o(s));
  }
}
Jo([
  Vs({ type: Object })
], ea.prototype, "config");
const ca = As`
  :host{display:block;color:var(--tw-ink,#fff);background:var(--tw-bg,#000);font-family:var(--tw-body-font,'TW Satoshi',var(--font-main,Arial)),sans-serif;box-sizing:border-box}
  *,*::before,*::after{box-sizing:border-box}h1,h2,h3,p,figure,blockquote{margin:0}button,a,input{font:inherit}button,a{-webkit-tap-highlight-color:transparent}button{cursor:pointer}a{color:inherit;text-decoration:none}button:disabled{cursor:not-allowed;opacity:.45}
  button:focus-visible,a:focus-visible,input:focus-visible,summary:focus-visible,video:focus-visible{outline:2px solid var(--tw-accent);outline-offset:5px}img,video{display:block;width:100%;max-width:100%}img{height:100%;object-fit:cover}.wrap{max-width:1552px;margin-inline:auto;padding-inline:56px}.mono{font-family:var(--tw-mono-font,'TW Mono',monospace);font-size:14px;line-height:1.4}.muted{color:#9b9b9b}.eyebrow{font-size:14px;font-weight:500;margin-bottom:30px}.display{font-family:var(--tw-display-font,'TW Instrument',Georgia),serif;font-weight:400;letter-spacing:-.065em;line-height:.93}.button{display:inline-flex;justify-content:center;align-items:center;gap:12px;background:var(--tw-ink);color:var(--tw-bg);border:0;border-radius:2px;padding:14px 28px;font-family:var(--tw-mono-font,'TW Mono',monospace);font-size:14px;transition:background .2s}.button:hover{background:var(--tw-accent);color:#000}
  :host([dir=rtl]) h1,:host([dir=rtl]) h2,:host([dir=rtl]) h3,:host([dir=rtl]) p,:host([dir=rtl]) button,:host([dir=rtl]) a,:host([dir=rtl]) li,:host([dir=rtl]) blockquote,:host([dir=rtl]) figcaption{font-family:var(--font-main,Tahoma),sans-serif;letter-spacing:0;line-height:1.5}
  :host([dir=rtl]) h1.display{font-size:44px;line-height:1.25}:host([dir=rtl]) .scroll{white-space:nowrap;font-size:14px}
  :host([dir=rtl]) .text{font-size:64px;line-height:1.2}
  @media(max-width:767px){.wrap{padding-inline:20px}.mono{font-size:12px}.eyebrow{margin-bottom:24px}:host([dir=rtl]) h1.display{font-size:36px}:host([dir=rtl]) .text{font-size:32px}}
  @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
`;
export {
  ea as T,
  Vt as a,
  la as b,
  ra as c,
  oa as d,
  ia as e,
  Cs as l,
  aa as o,
  sa as r,
  ca as s,
  _o as w
};
