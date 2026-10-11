var Pi = Object.defineProperty;
var Li = (e, t, n) => t in e ? Pi(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var v = (e, t, n) => Li(e, typeof t != "symbol" ? t + "" : t, n);
import { css as Ii, LitElement as $e } from "lit";
import { property as Bi } from "lit/decorators.js";
function Wi(e, t) {
  e.indexOf(t) === -1 && e.push(t);
}
function fe(e, t) {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}
const G = (e, t, n) => n > t ? t : n < e ? e : n;
function jt(e, t) {
  return t ? `${e}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${t}` : e;
}
let ht = () => {
}, Y = () => {
};
var xn;
typeof process < "u" && ((xn = process.env) == null ? void 0 : xn.NODE_ENV) !== "production" && (ht = (e, t, n) => {
  !e && typeof console < "u" && console.warn(jt(t, n));
}, Y = (e, t, n) => {
  if (!e)
    throw new Error(jt(t, n));
});
const Z = {}, An = (e) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e), _i = (e) => typeof e == "object" && e !== null, En = (e) => /^0[^.\s]+$/u.test(e);
// @__NO_SIDE_EFFECTS__
function Vn(e) {
  let t;
  return () => (t === void 0 && (t = e()), t);
}
const dt = /* @__NO_SIDE_EFFECTS__ */ (e) => e, pe = (...e) => e.reduce((t, n) => (i) => n(t(i))), me = /* @__NO_SIDE_EFFECTS__ */ (e, t, n) => {
  const i = t - e;
  return i ? (n - e) / i : 1;
};
class Cn {
  constructor() {
    this.subscriptions = [];
  }
  add(t) {
    return Wi(this.subscriptions, t), () => fe(this.subscriptions, t);
  }
  notify(t, n, i) {
    const s = this.subscriptions.length;
    if (s)
      if (s === 1)
        this.subscriptions[0](t, n, i);
      else
        for (let r = 0; r < s; r++) {
          const o = this.subscriptions[r];
          o && o(t, n, i);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const P = /* @__NO_SIDE_EFFECTS__ */ (e) => e * 1e3, W = /* @__NO_SIDE_EFFECTS__ */ (e) => e / 1e3, Rn = /* @__NO_SIDE_EFFECTS__ */ (e, t) => t ? e * (1e3 / t) : 0, qe = /* @__PURE__ */ new Set();
function kn(e, t, n) {
  e || qe.has(t) || (console.warn(jt(t, n)), qe.add(t));
}
const zi = (e, t, n) => {
  const i = t - e;
  return ((n - e) % i + i) % i + e;
}, Dn = (e, t, n) => (((1 - 3 * n + 3 * t) * e + (3 * n - 6 * t)) * e + 3 * t) * e, Ki = 1e-7, Hi = 12;
function $i(e, t, n, i, s) {
  let r, o, a = 0;
  do
    o = t + (n - t) / 2, r = Dn(o, i, s) - e, r > 0 ? n = o : t = o;
  while (Math.abs(r) > Ki && ++a < Hi);
  return o;
}
// @__NO_SIDE_EFFECTS__
function Ct(e, t, n, i) {
  if (e === t && n === i)
    return dt;
  const s = (r) => $i(r, 0, 1, e, n);
  return (r) => r === 0 || r === 1 ? r : Dn(s(r), t, i);
}
const On = /* @__NO_SIDE_EFFECTS__ */ (e) => (t) => t <= 0.5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2, ge = /* @__NO_SIDE_EFFECTS__ */ (e) => (t) => 1 - e(1 - t), Fn = /* @__PURE__ */ Ct(0.33, 1.53, 0.69, 0.99), ye = /* @__PURE__ */ ge(Fn), Nn = /* @__PURE__ */ On(ye), Pn = (e) => e >= 1 ? 1 : (e *= 2) < 1 ? 0.5 * ye(e) : 0.5 * (2 - Math.pow(2, -10 * (e - 1))), be = (e) => 1 - Math.sin(Math.acos(e)), qi = /* @__PURE__ */ ge(be), Ln = /* @__PURE__ */ On(be), Yi = /* @__PURE__ */ Ct(0.42, 0, 1, 1), Ui = /* @__PURE__ */ Ct(0, 0, 0.58, 1), In = /* @__PURE__ */ Ct(0.42, 0, 0.58, 1), Bn = /* @__NO_SIDE_EFFECTS__ */ (e) => Array.isArray(e) && typeof e[0] != "number";
// @__NO_SIDE_EFFECTS__
function Wn(e, t) {
  return /* @__PURE__ */ Bn(e) ? e[zi(0, e.length, t)] : e;
}
const _n = /* @__NO_SIDE_EFFECTS__ */ (e) => Array.isArray(e) && typeof e[0] == "number", Ye = {
  linear: dt,
  easeIn: Yi,
  easeInOut: In,
  easeOut: Ui,
  circIn: be,
  circInOut: Ln,
  circOut: qi,
  backIn: ye,
  backInOut: Nn,
  backOut: Fn,
  anticipate: Pn
}, ji = (e) => typeof e == "string", Ue = (e) => {
  if (/* @__PURE__ */ _n(e)) {
    Y(e.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [t, n, i, s] = e;
    return /* @__PURE__ */ Ct(t, n, i, s);
  } else if (ji(e))
    return Y(Ye[e] !== void 0, `Invalid easing type '${e}'`, "invalid-easing-type"), Ye[e];
  return e;
}, Dt = [
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
function Xi(e) {
  let t = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set(), i = !1, s = !1;
  const r = /* @__PURE__ */ new WeakSet();
  let o = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function a(u) {
    r.has(u) && (l.schedule(u), e()), u(o);
  }
  const l = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (u, c = !1, h = !1) => {
      const p = h && i ? t : n;
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
      if (o = u, i) {
        s = !0;
        return;
      }
      i = !0;
      const c = t;
      t = n, n = c, t.forEach(a), t.clear(), i = !1, s && (s = !1, l.process(u));
    }
  };
  return l;
}
const Gi = 40;
function zn(e, t) {
  let n = !1, i = !0;
  const s = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, r = () => n = !0, o = Dt.reduce((T, S) => (T[S] = Xi(r), T), {}), { setup: a, read: l, resolveKeyframes: u, preUpdate: c, update: h, preRender: d, render: p, postRender: f } = o, m = () => {
    const T = Z.useManualTiming, S = T ? s.timestamp : performance.now();
    n = !1, T || (s.delta = i ? 1e3 / 60 : Math.max(Math.min(S - s.timestamp, Gi), 1)), s.timestamp = S, s.isProcessing = !0, a.process(s), l.process(s), u.process(s), c.process(s), h.process(s), d.process(s), p.process(s), f.process(s), s.isProcessing = !1, n && t && (i = !1, e(m));
  }, g = () => {
    n = !0, i = !0, s.isProcessing || e(m);
  };
  return { schedule: Dt.reduce((T, S) => {
    const M = o[S];
    return T[S] = (V, R = !1, A = !1) => (n || g(), M.schedule(V, R, A)), T;
  }, {}), cancel: (T) => {
    for (let S = 0; S < Dt.length; S++)
      o[Dt[S]].cancel(T);
  }, state: s, steps: o };
}
const { schedule: z, cancel: Xt, state: Pt } = /* @__PURE__ */ zn(typeof requestAnimationFrame < "u" ? requestAnimationFrame : dt, !0);
let Nt;
function Zi() {
  Nt = void 0;
}
const N = {
  now: () => (Nt === void 0 && N.set(Pt.isProcessing || Z.useManualTiming ? Pt.timestamp : performance.now()), Nt),
  set: (e) => {
    Nt = e, queueMicrotask(Zi);
  }
}, Kn = (e) => (t) => typeof t == "string" && t.startsWith(e), Hn = /* @__PURE__ */ Kn("--"), Qi = /* @__PURE__ */ Kn("var(--"), ve = (e) => Qi(e) ? Ji.test(e.split("/*")[0].trim()) : !1, Ji = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function je(e) {
  return typeof e != "string" ? !1 : e.split("/*")[0].includes("var(--");
}
const ft = {
  test: (e) => typeof e == "number",
  parse: parseFloat,
  transform: (e) => e
}, xt = {
  ...ft,
  transform: (e) => G(0, 1, e)
}, Ot = {
  ...ft,
  default: 1
}, Mt = (e) => Math.round(e * 1e5) / 1e5, we = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function ts(e) {
  return e == null;
}
const es = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, Se = (e, t) => (n) => !!(typeof n == "string" && es.test(n) && n.startsWith(e) || t && !ts(n) && Object.prototype.hasOwnProperty.call(n, t)), $n = (e, t, n) => (i) => {
  if (typeof i != "string")
    return i;
  const [s, r, o, a] = i.match(we);
  return {
    [e]: parseFloat(s),
    [t]: parseFloat(r),
    [n]: parseFloat(o),
    alpha: a !== void 0 ? parseFloat(a) : 1
  };
}, ns = (e) => G(0, 255, e), zt = {
  ...ft,
  transform: (e) => Math.round(ns(e))
}, tt = {
  test: /* @__PURE__ */ Se("rgb", "red"),
  parse: /* @__PURE__ */ $n("red", "green", "blue"),
  transform: ({ red: e, green: t, blue: n, alpha: i = 1 }) => "rgba(" + zt.transform(e) + ", " + zt.transform(t) + ", " + zt.transform(n) + ", " + Mt(xt.transform(i)) + ")"
};
function is(e) {
  let t = "", n = "", i = "", s = "";
  return e.length > 5 ? (t = e.substring(1, 3), n = e.substring(3, 5), i = e.substring(5, 7), s = e.substring(7, 9)) : (t = e.substring(1, 2), n = e.substring(2, 3), i = e.substring(3, 4), s = e.substring(4, 5), t += t, n += n, i += i, s += s), {
    red: parseInt(t, 16),
    green: parseInt(n, 16),
    blue: parseInt(i, 16),
    alpha: s ? parseInt(s, 16) / 255 : 1
  };
}
const Gt = {
  test: /* @__PURE__ */ Se("#"),
  parse: is,
  transform: tt.transform
}, Rt = /* @__NO_SIDE_EFFECTS__ */ (e) => ({
  test: (t) => typeof t == "string" && t.endsWith(e) && t.split(" ").length === 1,
  parse: parseFloat,
  transform: (t) => `${t}${e}`
}), q = /* @__PURE__ */ Rt("deg"), ct = /* @__PURE__ */ Rt("%"), b = /* @__PURE__ */ Rt("px"), ss = /* @__PURE__ */ Rt("vh"), rs = /* @__PURE__ */ Rt("vw"), Xe = {
  ...ct,
  parse: (e) => ct.parse(e) / 100,
  transform: (e) => ct.transform(e * 100)
}, ot = {
  test: /* @__PURE__ */ Se("hsl", "hue"),
  parse: /* @__PURE__ */ $n("hue", "saturation", "lightness"),
  transform: ({ hue: e, saturation: t, lightness: n, alpha: i = 1 }) => "hsla(" + Math.round(e) + ", " + ct.transform(Mt(t)) + ", " + ct.transform(Mt(n)) + ", " + Mt(xt.transform(i)) + ")"
}, D = {
  test: (e) => tt.test(e) || Gt.test(e) || ot.test(e),
  parse: (e) => tt.test(e) ? tt.parse(e) : ot.test(e) ? ot.parse(e) : Gt.parse(e),
  transform: (e) => typeof e == "string" ? e : e.hasOwnProperty("red") ? tt.transform(e) : ot.transform(e),
  getAnimatableNone: (e) => {
    const t = D.parse(e);
    return t.alpha = 0, D.transform(t);
  }
}, os = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function as(e) {
  var t, n;
  return isNaN(e) && typeof e == "string" && (((t = e.match(we)) == null ? void 0 : t.length) || 0) + (((n = e.match(os)) == null ? void 0 : n.length) || 0) > 0;
}
const qn = "number", Yn = "color", ls = "var", cs = "var(", Ge = "${}", us = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function ut(e) {
  const t = e.toString(), n = [], i = {
    color: [],
    number: [],
    var: []
  }, s = [];
  let r = 0;
  const a = t.replace(us, (l) => (D.test(l) ? (i.color.push(r), s.push(Yn), n.push(D.parse(l))) : l.startsWith(cs) ? (i.var.push(r), s.push(ls), n.push(l)) : (i.number.push(r), s.push(qn), n.push(parseFloat(l))), ++r, Ge)).split(Ge);
  return { values: n, split: a, indexes: i, types: s };
}
function hs(e) {
  return ut(e).values;
}
function Un({ split: e, types: t }) {
  const n = e.length;
  return (i) => {
    let s = "";
    for (let r = 0; r < n; r++)
      if (s += e[r], i[r] !== void 0) {
        const o = t[r];
        o === qn ? s += Mt(i[r]) : o === Yn ? s += D.transform(i[r]) : s += i[r];
      }
    return s;
  };
}
function ds(e) {
  return Un(ut(e));
}
const fs = (e) => typeof e == "number" ? 0 : D.test(e) ? D.getAnimatableNone(e) : e, ps = (e, t) => typeof e == "number" ? t != null && t.trim().endsWith("/") ? e : 0 : fs(e);
function ms(e) {
  const t = ut(e);
  return Un(t)(t.values.map((i, s) => ps(i, t.split[s])));
}
const _ = {
  test: as,
  parse: hs,
  createTransformer: ds,
  getAnimatableNone: ms
};
function Kt(e, t, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e;
}
function gs({ hue: e, saturation: t, lightness: n, alpha: i }) {
  e /= 360, t /= 100, n /= 100;
  let s = 0, r = 0, o = 0;
  if (!t)
    s = r = o = n;
  else {
    const a = n < 0.5 ? n * (1 + t) : n + t - n * t, l = 2 * n - a;
    s = Kt(l, a, e + 1 / 3), r = Kt(l, a, e), o = Kt(l, a, e - 1 / 3);
  }
  return {
    red: Math.round(s * 255),
    green: Math.round(r * 255),
    blue: Math.round(o * 255),
    alpha: i
  };
}
function Lt(e, t) {
  return (n) => n > 0 ? t : e;
}
const pt = (e, t, n) => e + (t - e) * n, Ht = (e, t, n) => {
  const i = e * e, s = n * (t * t - i) + i;
  return s < 0 ? 0 : Math.sqrt(s);
}, ys = [Gt, tt, ot], bs = (e) => ys.find((t) => t.test(e));
function Ze(e) {
  const t = bs(e);
  if (ht(!!t, `'${e}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !t)
    return !1;
  let n = t.parse(e);
  return t === ot && (n = gs(n)), n;
}
const Qe = (e, t) => {
  const n = Ze(e), i = Ze(t);
  if (!n || !i)
    return Lt(e, t);
  const s = { ...n };
  return (r) => (s.red = Ht(n.red, i.red, r), s.green = Ht(n.green, i.green, r), s.blue = Ht(n.blue, i.blue, r), s.alpha = pt(n.alpha, i.alpha, r), tt.transform(s));
}, Zt = /* @__PURE__ */ new Set(["none", "hidden"]);
function vs(e, t) {
  return Zt.has(e) ? (n) => n <= 0 ? e : t : (n) => n >= 1 ? t : e;
}
function ws(e, t) {
  return (n) => pt(e, t, n);
}
function Te(e) {
  return typeof e == "number" ? ws : typeof e == "string" ? ve(e) ? Lt : D.test(e) ? Qe : Ms : Array.isArray(e) ? jn : typeof e == "object" ? D.test(e) ? Qe : Ss : Lt;
}
function jn(e, t) {
  const n = [...e], i = n.length, s = e.map((r, o) => Te(r)(r, t[o]));
  return (r) => {
    for (let o = 0; o < i; o++)
      n[o] = s[o](r);
    return n;
  };
}
function Ss(e, t) {
  const n = { ...e, ...t }, i = {};
  for (const s in n)
    e[s] !== void 0 && t[s] !== void 0 && (i[s] = Te(e[s])(e[s], t[s]));
  return (s) => {
    for (const r in i)
      n[r] = i[r](s);
    return n;
  };
}
function Ts(e, t) {
  const n = [], i = { color: 0, var: 0, number: 0 };
  for (let s = 0; s < t.values.length; s++) {
    const r = t.types[s], o = e.indexes[r][i[r]], a = e.values[o] ?? 0;
    n[s] = a, i[r]++;
  }
  return n;
}
const Ms = (e, t) => {
  const n = _.createTransformer(t), i = ut(e), s = ut(t);
  return i.indexes.var.length === s.indexes.var.length && i.indexes.color.length === s.indexes.color.length && i.indexes.number.length >= s.indexes.number.length ? Zt.has(e) && !s.values.length || Zt.has(t) && !i.values.length ? vs(e, t) : pe(jn(Ts(i, s), s.values), n) : (ht(!0, `Complex values '${e}' and '${t}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), Lt(e, t));
};
function Xn(e, t, n) {
  return typeof e == "number" && typeof t == "number" && typeof n == "number" ? pt(e, t, n) : Te(e)(e, t);
}
const xs = (e) => {
  const t = ({ timestamp: n }) => e(n);
  return {
    start: (n = !0) => z.update(t, n),
    stop: () => Xt(t),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => Pt.isProcessing ? Pt.timestamp : N.now()
  };
}, Gn = (e, t, n = 10) => {
  let i = "";
  const s = Math.max(Math.round(t / n), 2);
  for (let r = 0; r < s; r++)
    i += Math.round(e(r / (s - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${i.substring(0, i.length - 2)})`;
}, It = 2e4;
function Me(e) {
  let t = 0;
  const n = 50;
  let i = e.next(t);
  for (; !i.done && t < It; )
    t += n, i = e.next(t);
  return t >= It ? 1 / 0 : t;
}
function Zn(e, t = 100, n) {
  const i = n({ ...e, keyframes: [0, t] }), s = Math.min(Me(i), It);
  return {
    type: "keyframes",
    ease: (r) => i.next(s * r).value / t,
    duration: /* @__PURE__ */ W(s)
  };
}
const k = {
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
function Qt(e, t) {
  return e * Math.sqrt(1 - t * t);
}
const As = 12;
function Es(e, t, n) {
  let i = n;
  for (let s = 1; s < As; s++)
    i = i - e(i) / t(i);
  return i;
}
const $t = 1e-3;
function Vs({ duration: e = k.duration, bounce: t = k.bounce, velocity: n = k.velocity, mass: i = k.mass }) {
  let s, r;
  ht(e <= /* @__PURE__ */ P(k.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let o = 1 - t;
  o = G(k.minDamping, k.maxDamping, o), e = G(k.minDuration, k.maxDuration, /* @__PURE__ */ W(e)), o < 1 ? (s = (u) => {
    const c = u * o, h = c * e, d = c - n, p = Qt(u, o), f = Math.exp(-h);
    return $t - d / p * f;
  }, r = (u) => {
    const h = u * o * e, d = h * n + n, p = Math.pow(o, 2) * Math.pow(u, 2) * e, f = Math.exp(-h), m = Qt(Math.pow(u, 2), o);
    return (-s(u) + $t > 0 ? -1 : 1) * ((d - p) * f) / m;
  }) : (s = (u) => {
    const c = Math.exp(-u * e), h = (u - n) * e + 1;
    return -$t + c * h;
  }, r = (u) => {
    const c = Math.exp(-u * e), h = (n - u) * (e * e);
    return c * h;
  });
  const a = 5 / e, l = Es(s, r, a);
  if (e = /* @__PURE__ */ P(e), isNaN(l))
    return {
      stiffness: k.stiffness,
      damping: k.damping,
      duration: e
    };
  {
    const u = Math.pow(l, 2) * i;
    return {
      stiffness: u,
      damping: o * 2 * Math.sqrt(i * u),
      duration: e
    };
  }
}
const Cs = ["duration", "bounce"], Rs = ["stiffness", "damping", "mass"];
function Je(e, t) {
  return t.some((n) => e[n] !== void 0);
}
function ks(e) {
  let t = {
    velocity: k.velocity,
    stiffness: k.stiffness,
    damping: k.damping,
    mass: k.mass,
    isResolvedFromDuration: !1,
    ...e
  };
  if (!Je(e, Rs) && Je(e, Cs))
    if (t.velocity = 0, e.visualDuration) {
      const n = e.visualDuration, i = 2 * Math.PI / (n * 1.2), s = i * i, r = 2 * G(0.05, 1, 1 - (e.bounce || 0)) * Math.sqrt(s);
      t = {
        ...t,
        mass: k.mass,
        stiffness: s,
        damping: r
      };
    } else {
      const n = Vs({ ...e, velocity: 0 });
      t = {
        ...t,
        ...n,
        mass: k.mass
      }, t.isResolvedFromDuration = !0;
    }
  return t;
}
function At(e = k.visualDuration, t = k.bounce) {
  const n = typeof e != "object" ? {
    visualDuration: e,
    keyframes: [0, 1],
    bounce: t
  } : e;
  let { restSpeed: i, restDelta: s } = n;
  const r = n.keyframes[0], o = n.keyframes[n.keyframes.length - 1], a = { done: !1, value: r }, { stiffness: l, damping: u, mass: c, duration: h, velocity: d, isResolvedFromDuration: p } = ks({
    ...n,
    velocity: -/* @__PURE__ */ W(n.velocity || 0)
  }), f = d || 0, m = u / (2 * Math.sqrt(l * c)), g = o - r, y = /* @__PURE__ */ W(Math.sqrt(l / c)), x = Math.abs(g) < 5;
  i || (i = x ? k.restSpeed.granular : k.restSpeed.default), s || (s = x ? k.restDelta.granular : k.restDelta.default);
  let T, S, M, V, R, A;
  if (m < 1)
    M = Qt(y, m), V = (f + m * y * g) / M, T = (w) => {
      const C = Math.exp(-m * y * w);
      return o - C * (V * Math.sin(M * w) + g * Math.cos(M * w));
    }, R = m * y * V + g * M, A = m * y * g - V * M, S = (w) => Math.exp(-m * y * w) * (R * Math.sin(M * w) + A * Math.cos(M * w));
  else if (m === 1) {
    T = (C) => o - Math.exp(-y * C) * (g + (f + y * g) * C);
    const w = f + y * g;
    S = (C) => Math.exp(-y * C) * (y * w * C - f);
  } else {
    const w = y * Math.sqrt(m * m - 1);
    T = (I) => {
      const K = Math.exp(-m * y * I), H = Math.min(w * I, 300);
      return o - K * ((f + m * y * g) * Math.sinh(H) + w * g * Math.cosh(H)) / w;
    };
    const C = (f + m * y * g) / w, L = m * y * C - g * w, F = m * y * g - C * w;
    S = (I) => {
      const K = Math.exp(-m * y * I), H = Math.min(w * I, 300);
      return K * (L * Math.sinh(H) + F * Math.cosh(H));
    };
  }
  const E = {
    calculatedDuration: p && h || null,
    velocity: (w) => /* @__PURE__ */ P(S(w)),
    next: (w) => {
      if (!p && m < 1) {
        const L = Math.exp(-m * y * w), F = Math.sin(M * w), I = Math.cos(M * w), K = o - L * (V * F + g * I), H = /* @__PURE__ */ P(L * (R * F + A * I));
        return a.done = Math.abs(H) <= i && Math.abs(o - K) <= s, a.value = a.done ? o : K, a;
      }
      const C = T(w);
      if (p)
        a.done = w >= h;
      else {
        const L = /* @__PURE__ */ P(S(w));
        a.done = Math.abs(L) <= i && Math.abs(o - C) <= s;
      }
      return a.value = a.done ? o : C, a;
    },
    toString: () => {
      const w = Math.min(Me(E), It), C = Gn((L) => E.next(w * L).value, w, 30);
      return w + "ms " + C;
    },
    toTransition: () => {
    }
  };
  return E;
}
At.applyToOptions = (e) => {
  const t = Zn(e, 100, At);
  return e.ease = t.ease, e.duration = /* @__PURE__ */ P(t.duration), e.type = "keyframes", e;
};
const Ds = 5;
function Qn(e, t, n) {
  const i = Math.max(t - Ds, 0);
  return /* @__PURE__ */ Rn(n - e(i), t - i);
}
function Jt({ keyframes: e, velocity: t = 0, power: n = 0.8, timeConstant: i = 325, bounceDamping: s = 10, bounceStiffness: r = 500, modifyTarget: o, min: a, max: l, restDelta: u = 0.5, restSpeed: c }) {
  const h = e[0], d = {
    done: !1,
    value: h
  }, p = (A) => a !== void 0 && A < a || l !== void 0 && A > l, f = (A) => a === void 0 ? l : l === void 0 || Math.abs(a - A) < Math.abs(l - A) ? a : l;
  let m = n * t;
  const g = h + m, y = o === void 0 ? g : o(g);
  y !== g && (m = y - h);
  const x = (A) => -m * Math.exp(-A / i), T = (A) => y + x(A), S = (A) => {
    const E = x(A), w = T(A);
    d.done = Math.abs(E) <= u, d.value = d.done ? y : w;
  };
  let M, V;
  const R = (A) => {
    p(d.value) && (M = A, V = At({
      keyframes: [d.value, f(d.value)],
      velocity: Qn(T, A, d.value),
      // TODO: This should be passing * 1000
      damping: s,
      stiffness: r,
      restDelta: u,
      restSpeed: c
    }));
  };
  return R(0), {
    calculatedDuration: null,
    next: (A) => {
      let E = !1;
      return !V && M === void 0 && (E = !0, S(A), R(A)), M !== void 0 && A >= M ? V.next(A - M) : (!E && S(A), d);
    }
  };
}
function Os(e, t, n) {
  const i = [], s = n || Z.mix || Xn, r = e.length - 1;
  for (let o = 0; o < r; o++) {
    let a = s(e[o], e[o + 1]);
    if (t) {
      const l = Array.isArray(t) ? t[o] || dt : t;
      a = pe(l, a);
    }
    i.push(a);
  }
  return i;
}
function Fs(e, t, { clamp: n = !0, ease: i, mixer: s } = {}) {
  const r = e.length;
  if (Y(r === t.length, "Both input and output ranges must be the same length", "range-length"), r === 1)
    return () => t[0];
  if (r === 2 && t[0] === t[1])
    return () => t[1];
  const o = e[0] === e[1];
  e[0] > e[r - 1] && (e = [...e].reverse(), t = [...t].reverse());
  const a = Os(t, i, s), l = a.length, u = (c) => {
    if (o && c < e[0])
      return t[0];
    let h = 0;
    if (l > 1)
      for (; h < e.length - 2 && !(c < e[h + 1]); h++)
        ;
    const d = /* @__PURE__ */ me(e[h], e[h + 1], c);
    return a[h](d);
  };
  return n ? (c) => u(G(e[0], e[r - 1], c)) : u;
}
function Jn(e, t) {
  const n = e[e.length - 1];
  for (let i = 1; i <= t; i++) {
    const s = /* @__PURE__ */ me(0, t, i);
    e.push(pt(n, 1, s));
  }
}
function ti(e) {
  const t = [0];
  return Jn(t, e.length - 1), t;
}
function Ns(e, t) {
  return e.map((n) => n * t);
}
function Ps(e, t) {
  return e.map(() => t || In).splice(0, e.length - 1);
}
function at({ duration: e = 300, keyframes: t, times: n, ease: i = "easeInOut" }) {
  const s = /* @__PURE__ */ Bn(i) ? i.map(Ue) : Ue(i), r = {
    done: !1,
    value: t[0]
  }, o = Ns(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    n && n.length === t.length ? n : ti(t),
    e
  ), a = Fs(o, t, {
    ease: Array.isArray(s) ? s : Ps(t, s)
  });
  return {
    calculatedDuration: e,
    next: (l) => (r.value = a(l), r.done = l >= e, r)
  };
}
const Ls = (e) => e !== null;
function _t(e, { repeat: t, repeatType: n = "loop" }, i, s = 1) {
  const r = e.filter(Ls), a = s < 0 || t && n !== "loop" && t % 2 === 1 ? 0 : r.length - 1;
  return !a || i === void 0 ? r[a] : i;
}
const Is = {
  decay: Jt,
  inertia: Jt,
  tween: at,
  keyframes: at,
  spring: At
};
function ei(e) {
  typeof e.type == "string" && (e.type = Is[e.type]);
}
class xe {
  constructor() {
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this._finished = new Promise((t) => {
      this.resolve = t;
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
  then(t, n) {
    return this.finished.then(t, n);
  }
}
const Bs = (e) => e / 100;
class Bt extends xe {
  constructor(t) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
      done: !1,
      value: void 0
    }, this.stop = () => {
      var i, s;
      const { motionValue: n } = this.options;
      n && n.updatedAt !== N.now() && this.tick(N.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), (s = (i = this.options).onStop) == null || s.call(i));
    }, this.options = t, this.initAnimation(), this.play(), t.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: t } = this;
    ei(t);
    const { type: n = at, repeat: i = 0, repeatDelay: s = 0, repeatType: r, velocity: o = 0 } = t;
    let { keyframes: a } = t;
    const l = n || at;
    process.env.NODE_ENV !== "production" && l !== at && Y(a.length <= 2, `Only two keyframes currently supported with spring and inertia animations. Trying to animate ${a}`, "spring-two-frames"), l !== at && typeof a[0] != "number" && (this.mixKeyframes = pe(Bs, Xn(a[0], a[1])), a = [0, 100]);
    const u = l({ ...t, keyframes: a });
    r === "mirror" && (this.mirroredGenerator = l({
      ...t,
      keyframes: [...a].reverse(),
      velocity: -o
    })), u.calculatedDuration === null && (u.calculatedDuration = Me(u));
    const { calculatedDuration: c } = u;
    this.calculatedDuration = c, this.resolvedDuration = c + s, this.totalDuration = this.resolvedDuration * (i + 1) - s, this.generator = u;
  }
  updateTime(t) {
    const n = Math.round(t - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = n;
  }
  tick(t, n = !1) {
    const { generator: i, totalDuration: s, mixKeyframes: r, mirroredGenerator: o, resolvedDuration: a, calculatedDuration: l } = this;
    if (this.startTime === null)
      return i.next(0);
    const { delay: u = 0, keyframes: c, repeat: h, repeatType: d, repeatDelay: p, type: f, onUpdate: m, finalKeyframe: g } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, t) : this.speed < 0 && (this.startTime = Math.min(t - s / this.speed, this.startTime)), n ? this.currentTime = t : this.updateTime(t);
    const y = this.currentTime - u * (this.playbackSpeed >= 0 ? 1 : -1), x = this.playbackSpeed >= 0 ? y < 0 : y > s;
    this.currentTime = Math.max(y, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = s);
    let T = this.currentTime, S = i;
    if (h) {
      const A = Math.min(this.currentTime, s) / a;
      let E = Math.floor(A), w = A % 1;
      !w && A >= 1 && (w = 1), w === 1 && E--, E = Math.min(E, h + 1), !!(E % 2) && (d === "reverse" ? (w = 1 - w, p && (w -= p / a)) : d === "mirror" && (S = o)), T = G(0, 1, w) * a;
    }
    let M;
    x ? (this.delayState.value = c[0], M = this.delayState) : M = S.next(T), r && !x && (M.value = r(M.value));
    let { done: V } = M;
    !x && l !== null && (V = this.playbackSpeed >= 0 ? this.currentTime >= s : this.currentTime <= 0);
    const R = this.holdTime === null && (this.state === "finished" || this.state === "running" && V);
    return R && f !== Jt && (M.value = _t(c, this.options, g, this.speed)), m && m(M.value), R && this.finish(), M;
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(t, n) {
    return this.finished.then(t, n);
  }
  get duration() {
    return /* @__PURE__ */ W(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: t = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ W(t);
  }
  get time() {
    return /* @__PURE__ */ W(this.currentTime);
  }
  set time(t) {
    t = /* @__PURE__ */ P(t), this.currentTime = t, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = t : this.driver && (this.startTime = this.driver.now() - t / this.playbackSpeed), this.driver ? this.driver.start(!1) : (this.startTime = 0, this.state = "paused", this.holdTime = t, this.tick(t));
  }
  /**
   * Returns the generator's velocity at the current time in units/second.
   * Uses the analytical derivative when available (springs), avoiding
   * the MotionValue's frame-dependent velocity estimation.
   */
  getGeneratorVelocity() {
    const t = this.currentTime;
    if (t <= 0)
      return this.options.velocity || 0;
    if (this.generator.velocity)
      return this.generator.velocity(t);
    const n = this.generator.next(t).value;
    return Qn((i) => this.generator.next(i).value, t, n);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(t) {
    const n = this.playbackSpeed !== t;
    n && this.driver && this.updateTime(N.now()), this.playbackSpeed = t, n && this.driver && (this.time = /* @__PURE__ */ W(this.currentTime));
  }
  play() {
    var s, r;
    if (this.isStopped)
      return;
    const { driver: t = xs, startTime: n } = this.options;
    this.driver || (this.driver = t((o) => this.tick(o))), (r = (s = this.options).onPlay) == null || r.call(s);
    const i = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = i) : this.holdTime !== null ? this.startTime = i - this.holdTime : this.startTime || (this.startTime = n ?? i), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(N.now()), this.holdTime = this.currentTime;
  }
  complete() {
    this.state !== "running" && this.play(), this.state = "finished", this.holdTime = null;
  }
  finish() {
    var t, n;
    this.notifyFinished(), this.teardown(), this.state = "finished", (n = (t = this.options).onComplete) == null || n.call(t);
  }
  cancel() {
    var t, n;
    this.holdTime = null, this.startTime = 0, this.tick(0), this.teardown(), (n = (t = this.options).onCancel) == null || n.call(t);
  }
  teardown() {
    this.state = "idle", this.stopDriver(), this.startTime = this.holdTime = null;
  }
  stopDriver() {
    this.driver && (this.driver.stop(), this.driver = void 0);
  }
  sample(t) {
    return this.startTime = 0, this.tick(t, !0);
  }
  attachTimeline(t) {
    var n;
    return this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear", this.initAnimation()), (n = this.driver) == null || n.stop(), t.observe(this);
  }
}
function Ws(e) {
  for (let t = 1; t < e.length; t++)
    e[t] ?? (e[t] = e[t - 1]);
}
const et = (e) => e * 180 / Math.PI, te = (e) => {
  const t = et(Math.atan2(e[1], e[0]));
  return ee(t);
}, _s = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (e) => (Math.abs(e[0]) + Math.abs(e[3])) / 2,
  rotate: te,
  rotateZ: te,
  skewX: (e) => et(Math.atan(e[1])),
  skewY: (e) => et(Math.atan(e[2])),
  skew: (e) => (Math.abs(e[1]) + Math.abs(e[2])) / 2
}, ee = (e) => (e = e % 360, e < 0 && (e += 360), e), tn = te, en = (e) => Math.sqrt(e[0] * e[0] + e[1] * e[1]), nn = (e) => Math.sqrt(e[4] * e[4] + e[5] * e[5]), zs = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: en,
  scaleY: nn,
  scale: (e) => (en(e) + nn(e)) / 2,
  rotateX: (e) => ee(et(Math.atan2(e[6], e[5]))),
  rotateY: (e) => ee(et(Math.atan2(-e[2], e[0]))),
  rotateZ: tn,
  rotate: tn,
  skewX: (e) => et(Math.atan(e[4])),
  skewY: (e) => et(Math.atan(e[1])),
  skew: (e) => (Math.abs(e[1]) + Math.abs(e[4])) / 2
};
function ne(e) {
  return e.includes("scale") ? 1 : 0;
}
function ie(e, t) {
  if (!e || e === "none")
    return ne(t);
  const n = e.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let i, s;
  if (n)
    i = zs, s = n;
  else {
    const a = e.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    i = _s, s = a;
  }
  if (!s)
    return ne(t);
  const r = i[t], o = s[1].split(",").map(Hs);
  return typeof r == "function" ? r(o) : o[r];
}
const Ks = (e, t) => {
  const { transform: n = "none" } = getComputedStyle(e);
  return ie(n, t);
};
function Hs(e) {
  return parseFloat(e.trim());
}
const mt = [
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
], gt = /* @__PURE__ */ new Set([...mt, "pathRotation"]), sn = (e) => e === ft || e === b, $s = /* @__PURE__ */ new Set(["x", "y", "z"]), qs = mt.filter((e) => !$s.has(e));
function Ys(e) {
  const t = [];
  return qs.forEach((n) => {
    const i = e.getValue(n);
    i !== void 0 && (t.push([n, i.get()]), i.set(n.startsWith("scale") ? 1 : 0));
  }), t;
}
const X = {
  // Dimensions
  width: ({ x: e }, { paddingLeft: t = "0", paddingRight: n = "0", boxSizing: i }) => {
    const s = e.max - e.min;
    return i === "border-box" ? s : s - parseFloat(t) - parseFloat(n);
  },
  height: ({ y: e }, { paddingTop: t = "0", paddingBottom: n = "0", boxSizing: i }) => {
    const s = e.max - e.min;
    return i === "border-box" ? s : s - parseFloat(t) - parseFloat(n);
  },
  top: (e, { top: t }) => parseFloat(t),
  left: (e, { left: t }) => parseFloat(t),
  bottom: ({ y: e }, { top: t }) => parseFloat(t) + (e.max - e.min),
  right: ({ x: e }, { left: t }) => parseFloat(t) + (e.max - e.min),
  // Transform
  x: (e, { transform: t }) => ie(t, "x"),
  y: (e, { transform: t }) => ie(t, "y")
};
X.translateX = X.x;
X.translateY = X.y;
const nt = /* @__PURE__ */ new Set();
let se = !1, re = !1, oe = !1;
function ni() {
  if (re) {
    const e = Array.from(nt).filter((i) => i.needsMeasurement), t = new Set(e.map((i) => i.element)), n = /* @__PURE__ */ new Map();
    t.forEach((i) => {
      const s = Ys(i);
      s.length && (n.set(i, s), i.render());
    }), e.forEach((i) => i.measureInitialState()), t.forEach((i) => {
      i.render();
      const s = n.get(i);
      s && s.forEach(([r, o]) => {
        var a;
        (a = i.getValue(r)) == null || a.set(o);
      });
    }), e.forEach((i) => i.measureEndState()), e.forEach((i) => {
      i.suspendedScrollY !== void 0 && window.scrollTo(0, i.suspendedScrollY);
    });
  }
  re = !1, se = !1, nt.forEach((e) => e.complete(oe)), nt.clear();
}
function ii() {
  nt.forEach((e) => {
    e.readKeyframes(), e.needsMeasurement && (re = !0);
  });
}
function Us() {
  oe = !0, ii(), ni(), oe = !1;
}
class Ae {
  constructor(t, n, i, s, r, o = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...t], this.onComplete = n, this.name = i, this.motionValue = s, this.element = r, this.isAsync = o;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (nt.add(this), se || (se = !0, z.read(ii), z.resolveKeyframes(ni))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: t, name: n, element: i, motionValue: s } = this;
    if (t[0] === null) {
      const r = s == null ? void 0 : s.get(), o = t[t.length - 1];
      if (r !== void 0)
        t[0] = r;
      else if (i && n) {
        const a = i.readValue(n, o);
        a != null && (t[0] = a);
      }
      t[0] === void 0 && (t[0] = o), s && r === void 0 && s.set(t[0]);
    }
    Ws(t);
  }
  setFinalKeyframe() {
  }
  measureInitialState() {
  }
  renderEndStyles() {
  }
  measureEndState() {
  }
  complete(t = !1) {
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, t), nt.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (nt.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const js = (e) => e.startsWith("--");
function si(e, t, n) {
  js(t) ? e.style.setProperty(t, n) : e.style[t] = n;
}
const Xs = {};
function ri(e, t) {
  const n = /* @__PURE__ */ Vn(e);
  return () => Xs[t] ?? n();
}
const Gs = /* @__PURE__ */ ri(() => window.ScrollTimeline !== void 0, "scrollTimeline"), oi = /* @__PURE__ */ ri(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), St = ([e, t, n, i]) => `cubic-bezier(${e}, ${t}, ${n}, ${i})`, rn = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ St([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ St([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ St([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ St([0.33, 1.53, 0.69, 0.99])
};
function ai(e, t) {
  if (e)
    return typeof e == "function" ? oi() ? Gn(e, t) : "ease-out" : /* @__PURE__ */ _n(e) ? St(e) : Array.isArray(e) ? e.map((n) => ai(n, t) || rn.easeOut) : rn[e];
}
function Zs(e, t, n, { delay: i = 0, duration: s = 300, repeat: r = 0, repeatType: o = "loop", ease: a = "easeOut", times: l } = {}, u = void 0) {
  const c = {
    [t]: n
  };
  l && (c.offset = l);
  const h = ai(a, s);
  Array.isArray(h) && (c.easing = h);
  const d = {
    delay: i,
    duration: s,
    easing: Array.isArray(h) ? "linear" : h,
    fill: "both",
    iterations: r + 1,
    direction: o === "reverse" ? "alternate" : "normal"
  };
  return u && (d.pseudoElement = u), e.animate(c, d);
}
function Ee(e) {
  return typeof e == "function" && "applyToOptions" in e;
}
function Qs({ type: e, ...t }) {
  return Ee(e) && oi() ? e.applyToOptions(t) : (t.duration ?? (t.duration = 300), t.ease ?? (t.ease = "easeOut"), t);
}
class li extends xe {
  constructor(t) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !t)
      return;
    const { element: n, name: i, keyframes: s, pseudoElement: r, allowFlatten: o = !1, finalKeyframe: a, onComplete: l } = t;
    this.isPseudoElement = !!r, this.allowFlatten = o, this.options = t, Y(typeof t.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const u = Qs(t);
    this.animation = Zs(n, i, s, u, r), u.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !r) {
        const c = _t(s, this.options, a, this.speed);
        this.updateMotionValue && this.updateMotionValue(c), si(n, i, c), this.animation.cancel();
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
    var t, n;
    (n = (t = this.animation).finish) == null || n.call(t);
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
    const { state: t } = this;
    t === "idle" || t === "finished" || (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel());
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
    var n, i, s;
    const t = (n = this.options) == null ? void 0 : n.element;
    !this.isPseudoElement && (t != null && t.isConnected) && ((s = (i = this.animation).commitStyles) == null || s.call(i));
  }
  get duration() {
    var n, i;
    const t = ((i = (n = this.animation.effect) == null ? void 0 : n.getComputedTiming) == null ? void 0 : i.call(n).duration) || 0;
    return /* @__PURE__ */ W(Number(t));
  }
  get iterationDuration() {
    const { delay: t = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ W(t);
  }
  get time() {
    return /* @__PURE__ */ W(Number(this.animation.currentTime) || 0);
  }
  set time(t) {
    const n = this.finishedTime !== null;
    this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ P(t), n && this.animation.pause();
  }
  /**
   * The playback speed of the animation.
   * 1 = normal speed, 2 = double speed, 0.5 = half speed.
   */
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(t) {
    t < 0 && (this.finishedTime = null), this.animation.playbackRate = t;
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return this.manualStartTime ?? Number(this.animation.startTime);
  }
  set startTime(t) {
    this.manualStartTime = this.animation.startTime = t;
  }
  /**
   * Attaches a timeline to the animation, for instance the `ScrollTimeline`.
   */
  attachTimeline({ timeline: t, rangeStart: n, rangeEnd: i, observe: s }) {
    var r;
    return this.allowFlatten && ((r = this.animation.effect) == null || r.updateTiming({ easing: "linear" })), this.animation.onfinish = null, t && Gs() ? (this.animation.timeline = t, n && (this.animation.rangeStart = n), i && (this.animation.rangeEnd = i), dt) : s(this);
  }
}
const ci = {
  anticipate: Pn,
  backInOut: Nn,
  circInOut: Ln
};
function Js(e) {
  return e in ci;
}
function tr(e) {
  typeof e.ease == "string" && Js(e.ease) && (e.ease = ci[e.ease]);
}
const qt = 10;
class er extends li {
  constructor(t) {
    tr(t), ei(t), super(t), t.startTime !== void 0 && t.autoplay !== !1 && (this.startTime = t.startTime), this.options = t;
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * Rather than read committed styles back out of the DOM, we can
   * create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to calculate velocity for any subsequent animation.
   */
  updateMotionValue(t) {
    const { motionValue: n, onUpdate: i, onComplete: s, element: r, ...o } = this.options;
    if (!n)
      return;
    if (t !== void 0) {
      n.set(t);
      return;
    }
    const a = new Bt({
      ...o,
      autoplay: !1
    }), l = Math.max(qt, N.now() - this.startTime), u = G(0, qt, l - qt), c = a.sample(l).value, { name: h } = this.options;
    r && h && si(r, h, c), n.setWithVelocity(a.sample(Math.max(0, l - u)).value, c, u), a.stop();
  }
}
const on = (e, t) => t === "zIndex" ? !1 : !!(typeof e == "number" || Array.isArray(e) || typeof e == "string" && // It's animatable if we have a string
(_.test(e) || e === "0") && // And it contains numbers and/or colors
!e.startsWith("url("));
function nr(e) {
  const t = e[0];
  if (e.length === 1)
    return !0;
  for (let n = 0; n < e.length; n++)
    if (e[n] !== t)
      return !0;
}
function ir(e, t, n, i) {
  const s = e[0];
  if (s === null)
    return !1;
  if (t === "display" || t === "visibility")
    return !0;
  const r = e[e.length - 1], o = on(s, t), a = on(r, t);
  return ht(o === a, `You are trying to animate ${t} from "${s}" to "${r}". "${o ? r : s}" is not an animatable value.`, "value-not-animatable"), !o || !a ? !1 : nr(e) || (n === "spring" || Ee(n)) && i;
}
function ae(e) {
  e.duration = 0, e.type = "keyframes";
}
const ui = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform",
  "backgroundColor"
]), sr = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function rr(e) {
  for (let t = 0; t < e.length; t++)
    if (typeof e[t] == "string" && sr.test(e[t]))
      return !0;
  return !1;
}
const or = /* @__PURE__ */ new Set([
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
]), ar = /* @__PURE__ */ Vn(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function lr(e) {
  var h;
  const { motionValue: t, name: n, repeatDelay: i, repeatType: s, damping: r, type: o, keyframes: a } = e, l = (h = t == null ? void 0 : t.owner) == null ? void 0 : h.current;
  if (!(l instanceof HTMLElement) && !(l instanceof SVGElement))
    return !1;
  const { onUpdate: u, transformTemplate: c } = t.owner.getProps();
  return ar() && n && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (ui.has(n) || or.has(n) && rr(a)) && (n !== "transform" || !c) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !u && !i && s !== "mirror" && r !== 0 && o !== "inertia";
}
const cr = 40;
class ur extends xe {
  constructor({ autoplay: t = !0, delay: n = 0, type: i = "keyframes", repeat: s = 0, repeatDelay: r = 0, repeatType: o = "loop", keyframes: a, name: l, motionValue: u, element: c, ...h }) {
    var f;
    super(), this.stop = () => {
      var m, g;
      this._animation && (this._animation.stop(), (m = this.stopTimeline) == null || m.call(this)), (g = this.keyframeResolver) == null || g.cancel();
    }, this.createdAt = N.now();
    const d = {
      autoplay: t,
      delay: n,
      type: i,
      repeat: s,
      repeatDelay: r,
      repeatType: o,
      name: l,
      motionValue: u,
      element: c,
      ...h
    }, p = (c == null ? void 0 : c.KeyframeResolver) || Ae;
    this.keyframeResolver = new p(a, (m, g, y) => this.onKeyframesResolved(m, g, d, !y), l, u, c), (f = this.keyframeResolver) == null || f.scheduleResolve();
  }
  onKeyframesResolved(t, n, i, s) {
    var y, x;
    this.keyframeResolver = void 0;
    const { name: r, type: o, velocity: a, delay: l, isHandoff: u, onUpdate: c } = i;
    this.resolvedAt = N.now();
    let h = !0;
    ir(t, r, o, a) || (h = !1, (Z.instantAnimations || !l) && (c == null || c(_t(t, i, n))), t[0] = t[t.length - 1], ae(i), i.repeat = 0);
    const p = {
      startTime: s ? this.resolvedAt ? this.resolvedAt - this.createdAt > cr ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: n,
      ...i,
      keyframes: t
    }, f = h && !u && lr(p), m = (x = (y = p.motionValue) == null ? void 0 : y.owner) == null ? void 0 : x.current;
    let g;
    if (f)
      try {
        g = new er({
          ...p,
          element: m
        });
      } catch {
        g = new Bt(p);
      }
    else
      g = new Bt(p);
    g.finished.then(() => {
      this.notifyFinished();
    }).catch(dt), this.pendingTimeline && (this.stopTimeline = g.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = g;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(t, n) {
    return this.finished.finally(t).then(() => {
    });
  }
  get animation() {
    var t;
    return this._animation || ((t = this.keyframeResolver) == null || t.resume(), Us()), this._animation;
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
  set time(t) {
    this.animation.time = t;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(t) {
    this.animation.speed = t;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(t) {
    return this._animation ? this.stopTimeline = this.animation.attachTimeline(t) : this.pendingTimeline = t, () => this.stop();
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
    var t;
    this._animation && this.animation.cancel(), (t = this.keyframeResolver) == null || t.cancel();
  }
}
class hr {
  constructor(t) {
    this.stop = () => this.runAll("stop"), this.animations = t.filter(Boolean);
  }
  get finished() {
    return Promise.all(this.animations.map((t) => t.finished));
  }
  /**
   * TODO: Filter out cancelled or stopped animations before returning
   */
  getAll(t) {
    return this.animations[0][t];
  }
  setAll(t, n) {
    for (let i = 0; i < this.animations.length; i++)
      this.animations[i][t] = n;
  }
  attachTimeline(t) {
    const n = this.animations.map((i) => i.attachTimeline(t));
    return () => {
      n.forEach((i, s) => {
        i && i(), this.animations[s].stop();
      });
    };
  }
  get time() {
    return this.getAll("time");
  }
  set time(t) {
    this.setAll("time", t);
  }
  get speed() {
    return this.getAll("speed");
  }
  set speed(t) {
    this.setAll("speed", t);
  }
  get state() {
    return this.getAll("state");
  }
  get startTime() {
    return this.getAll("startTime");
  }
  get duration() {
    return an(this.animations, "duration");
  }
  get iterationDuration() {
    return an(this.animations, "iterationDuration");
  }
  runAll(t) {
    this.animations.forEach((n) => n[t]());
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
function an(e, t) {
  let n = 0;
  for (let i = 0; i < e.length; i++) {
    const s = e[i][t];
    s !== null && s > n && (n = s);
  }
  return n;
}
class dr extends hr {
  then(t, n) {
    return this.finished.finally(t).then(() => {
    });
  }
}
const ln = 30, fr = (e) => !isNaN(parseFloat(e));
class pr {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(t, n = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (i) => {
      var r;
      const s = N.now();
      if (this.updatedAt !== s && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(i), this.current !== this.prev && ((r = this.events.change) == null || r.notify(this.current), this.dependents))
        for (const o of this.dependents)
          o.dirty();
    }, this.hasAnimated = !1, this.setCurrent(t), this.owner = n.owner;
  }
  setCurrent(t) {
    this.current = t, this.updatedAt = N.now(), this.canTrackVelocity === null && t !== void 0 && (this.canTrackVelocity = fr(this.current));
  }
  setPrevFrameValue(t = this.current) {
    this.prevFrameValue = t, this.prevUpdatedAt = this.updatedAt;
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
  onChange(t) {
    return process.env.NODE_ENV !== "production" && kn(!1, 'value.onChange(callback) is deprecated. Switch to value.on("change", callback).'), this.on("change", t);
  }
  on(t, n) {
    this.events[t] || (this.events[t] = new Cn());
    const i = this.events[t].add(n);
    return t === "change" ? () => {
      i(), z.read(() => {
        this.events.change.getSize() || this.stop();
      });
    } : i;
  }
  clearListeners() {
    for (const t in this.events)
      this.events[t].clear();
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   */
  attach(t, n) {
    this.passiveEffect = t, this.stopPassiveEffect = n;
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
  set(t) {
    this.passiveEffect ? this.passiveEffect(t, this.updateAndNotify) : this.updateAndNotify(t);
  }
  setWithVelocity(t, n, i) {
    this.set(n), this.prev = void 0, this.prevFrameValue = t, this.prevUpdatedAt = this.updatedAt - i;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(t, n = !0) {
    this.updateAndNotify(t), this.prev = t, this.prevUpdatedAt = this.prevFrameValue = void 0, n && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
  dirty() {
    var t;
    (t = this.events.change) == null || t.notify(this.current);
  }
  addDependent(t) {
    this.dependents || (this.dependents = /* @__PURE__ */ new Set()), this.dependents.add(t);
  }
  removeDependent(t) {
    this.dependents && this.dependents.delete(t);
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
    const t = N.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || t - this.updatedAt > ln)
      return 0;
    const n = Math.min(this.updatedAt - this.prevUpdatedAt, ln);
    return /* @__PURE__ */ Rn(parseFloat(this.current) - parseFloat(this.prevFrameValue), n);
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
  start(t) {
    return this.stop(), new Promise((n) => {
      this.hasAnimated = !0, this.animation = t(n), this.events.animationStart && this.events.animationStart.notify();
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
    var t, n;
    (t = this.dependents) == null || t.clear(), (n = this.events.destroy) == null || n.notify(), this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function it(e, t) {
  return new pr(e, t);
}
function hi(e, t) {
  if (e != null && e.inherit && t) {
    const { inherit: n, ...i } = e;
    return { ...t, ...i };
  }
  return e;
}
function di(e, t) {
  const n = (e == null ? void 0 : e[t]) ?? (e == null ? void 0 : e.default) ?? e;
  return n !== e ? hi(n, e) : n;
}
const mr = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, gr = (e) => ({
  type: "spring",
  stiffness: 550,
  damping: e === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), yr = {
  type: "keyframes",
  duration: 0.8
}, br = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, vr = (e, { keyframes: t }) => t.length > 2 ? yr : gt.has(e) ? e.startsWith("scale") ? gr(t[1]) : mr : br, wr = /* @__PURE__ */ new Set([
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
function Sr(e) {
  for (const t in e)
    if (!wr.has(t))
      return !0;
  return !1;
}
const fi = (e, t, n, i = {}, s, r) => (o) => {
  const a = di(i, e) || {}, l = a.delay || i.delay || 0;
  let { elapsed: u = 0 } = i;
  u = u - /* @__PURE__ */ P(l);
  const c = {
    keyframes: Array.isArray(n) ? n : [null, n],
    ease: "easeOut",
    velocity: t.getVelocity(),
    ...a,
    delay: -u,
    onUpdate: (d) => {
      t.set(d), a.onUpdate && a.onUpdate(d);
    },
    onComplete: () => {
      o(), a.onComplete && a.onComplete();
    },
    name: e,
    motionValue: t,
    element: r ? void 0 : s
  };
  Sr(a) || Object.assign(c, vr(e, c)), c.duration && (c.duration = /* @__PURE__ */ P(c.duration)), c.repeatDelay && (c.repeatDelay = /* @__PURE__ */ P(c.repeatDelay)), c.from !== void 0 && (c.keyframes[0] = c.from);
  let h = !1;
  if ((c.type === !1 || c.duration === 0 && !c.repeatDelay) && (ae(c), c.delay === 0 && (h = !0)), (Z.instantAnimations || Z.skipAnimations || s != null && s.shouldSkipAnimations || a.skipAnimations) && (h = !0, ae(c), c.delay = 0), c.allowFlatten = !a.type && !a.ease, h && !r && t.get() !== void 0) {
    const d = _t(c.keyframes, a);
    if (d !== void 0) {
      z.update(() => {
        c.onUpdate(d), c.onComplete();
      });
      return;
    }
  }
  return a.isSync ? new Bt(c) : new ur(c);
}, Tr = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function Mr(e) {
  const t = Tr.exec(e);
  if (!t)
    return [,];
  const [, n, i, s] = t;
  return [`--${n ?? i}`, s];
}
const xr = 4;
function pi(e, t, n = 1) {
  Y(n <= xr, `Max CSS variable fallback depth detected in property "${e}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [i, s] = Mr(e);
  if (!i)
    return;
  const r = window.getComputedStyle(t).getPropertyValue(i);
  if (r) {
    const o = r.trim();
    return An(o) ? parseFloat(o) : o;
  }
  return ve(s) ? pi(s, t, n + 1) : s;
}
function cn(e) {
  const t = [{}, {}];
  return e == null || e.values.forEach((n, i) => {
    t[0][i] = n.get(), t[1][i] = n.getVelocity();
  }), t;
}
function mi(e, t, n, i) {
  if (typeof t == "function") {
    const [s, r] = cn(i);
    t = t(n !== void 0 ? n : e.custom, s, r);
  }
  if (typeof t == "string" && (t = e.variants && e.variants[t]), typeof t == "function") {
    const [s, r] = cn(i);
    t = t(n !== void 0 ? n : e.custom, s, r);
  }
  return t;
}
function Ar(e, t, n) {
  const i = e.getProps();
  return mi(i, t, i.custom, e);
}
const gi = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...mt
]), Er = (e) => Array.isArray(e);
function Vr(e, t, n) {
  e.hasValue(t) ? e.getValue(t).set(n) : e.addValue(t, it(n));
}
function Cr(e) {
  return Er(e) ? e[e.length - 1] || 0 : e;
}
function Rr(e, t) {
  const n = Ar(e, t);
  let { transitionEnd: i = {}, transition: s = {}, ...r } = n || {};
  r = { ...r, ...i };
  for (const o in r) {
    const a = Cr(r[o]);
    Vr(e, o, a);
  }
}
const O = (e) => !!(e && e.getVelocity);
function kr(e) {
  return !!(O(e) && e.add);
}
function Dr(e, t) {
  const n = e.getValue("willChange");
  if (kr(n))
    return n.add(t);
  if (!n && Z.WillChange) {
    const i = new Z.WillChange("auto");
    e.addValue("willChange", i), i.add(t);
  }
}
function Ve(e) {
  return e.replace(/([A-Z])/g, (t) => `-${t.toLowerCase()}`);
}
const Or = "framerAppearId", Fr = "data-" + Ve(Or);
function Nr(e) {
  return e.props[Fr];
}
function Pr({ protectedKeys: e, needsAnimating: t }, n) {
  const i = e.hasOwnProperty(n) && t[n] !== !0;
  return t[n] = !1, i;
}
function Lr(e, t, { delay: n = 0, transitionOverride: i, type: s } = {}) {
  let { transition: r, transitionEnd: o, ...a } = t;
  const l = e.getDefaultTransition();
  r = r ? hi(r, l) : l;
  const u = r == null ? void 0 : r.reduceMotion, c = r == null ? void 0 : r.skipAnimations;
  i && (r = i);
  const h = [], d = s && e.animationState && e.animationState.getState()[s], p = r == null ? void 0 : r.path;
  p && p.animateVisualElement(e, a, r, n, h);
  for (const f in a) {
    const m = e.getValue(f, e.latestValues[f] ?? null), g = a[f];
    if (g === void 0 || d && Pr(d, f))
      continue;
    const y = {
      delay: n,
      ...di(r || {}, f)
    };
    c && (y.skipAnimations = !0);
    const x = m.get();
    if (x !== void 0 && !m.isAnimating() && !Array.isArray(g) && g === x && !y.velocity) {
      z.update(() => m.set(g));
      continue;
    }
    let T = !1;
    if (window.MotionHandoffAnimation) {
      const V = Nr(e);
      if (V) {
        const R = window.MotionHandoffAnimation(V, f, z);
        R !== null && (y.startTime = R, T = !0);
      }
    }
    Dr(e, f);
    const S = u ?? e.shouldReduceMotion;
    m.start(fi(f, m, g, S && gi.has(f) ? { type: !1 } : y, e, T));
    const M = m.animation;
    M && h.push(M);
  }
  if (o) {
    const f = () => z.update(() => {
      o && Rr(e, o);
    });
    h.length ? Promise.all(h).then(f) : f();
  }
  return h;
}
const Ir = {
  test: (e) => e === "auto",
  parse: (e) => e
}, yi = (e) => (t) => t.test(e), bi = [ft, b, ct, q, rs, ss, Ir], un = (e) => bi.find(yi(e));
function Br(e) {
  return typeof e == "number" ? e === 0 : e !== null ? e === "none" || e === "0" || En(e) : !0;
}
const Wr = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function _r(e) {
  const [t, n] = e.slice(0, -1).split("(");
  if (t === "drop-shadow")
    return e;
  const [i] = n.match(we) || [];
  if (!i)
    return e;
  const s = n.replace(i, "");
  let r = Wr.has(t) ? 1 : 0;
  return i !== n && (r *= 100), t + "(" + r + s + ")";
}
const zr = /\b([a-z-]*)\(.*?\)/gu, le = {
  ..._,
  getAnimatableNone: (e) => {
    const t = e.match(zr);
    return t ? t.map(_r).join(" ") : e;
  }
}, ce = {
  ..._,
  getAnimatableNone: (e) => {
    const t = _.parse(e);
    return _.createTransformer(e)(t.map((i) => typeof i == "number" ? 0 : typeof i == "object" ? { ...i, alpha: 1 } : i));
  }
}, hn = {
  ...ft,
  transform: Math.round
}, Kr = {
  rotate: q,
  /**
   * Internal channel for `transition.path` orientToPath. Composed onto
   * `rotate` at the transform-build sites so the user's `rotate` is
   * never read or overwritten. Not part of `transformPropOrder`.
   */
  pathRotation: q,
  rotateX: q,
  rotateY: q,
  rotateZ: q,
  scale: Ot,
  scaleX: Ot,
  scaleY: Ot,
  scaleZ: Ot,
  skew: q,
  skewX: q,
  skewY: q,
  distance: b,
  translateX: b,
  translateY: b,
  translateZ: b,
  x: b,
  y: b,
  z: b,
  perspective: b,
  transformPerspective: b,
  opacity: xt,
  originX: Xe,
  originY: Xe,
  originZ: b
}, Wt = {
  // Border props
  borderWidth: b,
  borderTopWidth: b,
  borderRightWidth: b,
  borderBottomWidth: b,
  borderLeftWidth: b,
  borderRadius: b,
  borderTopLeftRadius: b,
  borderTopRightRadius: b,
  borderBottomRightRadius: b,
  borderBottomLeftRadius: b,
  // Positioning props
  width: b,
  maxWidth: b,
  height: b,
  maxHeight: b,
  top: b,
  right: b,
  bottom: b,
  left: b,
  inset: b,
  insetBlock: b,
  insetBlockStart: b,
  insetBlockEnd: b,
  insetInline: b,
  insetInlineStart: b,
  insetInlineEnd: b,
  // Spacing props
  padding: b,
  paddingTop: b,
  paddingRight: b,
  paddingBottom: b,
  paddingLeft: b,
  paddingBlock: b,
  paddingBlockStart: b,
  paddingBlockEnd: b,
  paddingInline: b,
  paddingInlineStart: b,
  paddingInlineEnd: b,
  margin: b,
  marginTop: b,
  marginRight: b,
  marginBottom: b,
  marginLeft: b,
  marginBlock: b,
  marginBlockStart: b,
  marginBlockEnd: b,
  marginInline: b,
  marginInlineStart: b,
  marginInlineEnd: b,
  // Typography
  fontSize: b,
  // Misc
  backgroundPositionX: b,
  backgroundPositionY: b,
  ...Kr,
  zIndex: hn,
  // SVG
  fillOpacity: xt,
  strokeOpacity: xt,
  numOctaves: hn
}, Hr = {
  ...Wt,
  // Color props
  color: D,
  backgroundColor: D,
  outlineColor: D,
  fill: D,
  stroke: D,
  // Border props
  borderColor: D,
  borderTopColor: D,
  borderRightColor: D,
  borderBottomColor: D,
  borderLeftColor: D,
  filter: le,
  WebkitFilter: le,
  mask: ce,
  WebkitMask: ce
}, vi = (e) => Hr[e], $r = /* @__PURE__ */ new Set([le, ce]);
function wi(e, t) {
  let n = vi(e);
  return $r.has(n) || (n = _), n.getAnimatableNone ? n.getAnimatableNone(t) : void 0;
}
const qr = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function Yr(e, t, n) {
  let i = 0, s;
  for (; i < e.length && !s; ) {
    const r = e[i];
    typeof r == "string" && !qr.has(r) && ut(r).values.length && (s = e[i]), i++;
  }
  if (s && n)
    for (const r of t)
      e[r] = wi(n, s);
}
class Ur extends Ae {
  constructor(t, n, i, s, r) {
    super(t, n, i, s, r, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: t, element: n, name: i } = this;
    if (!n || !n.current)
      return;
    super.readKeyframes();
    for (let c = 0; c < t.length; c++) {
      let h = t[c];
      if (typeof h == "string" && (h = h.trim(), ve(h))) {
        const d = pi(h, n.current);
        d !== void 0 && (t[c] = d), c === t.length - 1 && (this.finalKeyframe = h);
      }
    }
    if (this.resolveNoneKeyframes(), !gi.has(i) || t.length !== 2)
      return;
    const [s, r] = t, o = un(s), a = un(r), l = je(s), u = je(r);
    if (l !== u && X[i]) {
      this.needsMeasurement = !0;
      return;
    }
    if (o !== a)
      if (sn(o) && sn(a))
        for (let c = 0; c < t.length; c++) {
          const h = t[c];
          typeof h == "string" && (t[c] = parseFloat(h));
        }
      else X[i] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: t, name: n } = this, i = [];
    for (let s = 0; s < t.length; s++)
      (t[s] === null || Br(t[s])) && i.push(s);
    i.length && Yr(t, i, n);
  }
  measureInitialState() {
    const { element: t, unresolvedKeyframes: n, name: i } = this;
    if (!t || !t.current)
      return;
    i === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = X[i](t.measureViewportBox(), window.getComputedStyle(t.current)), n[0] = this.measuredOrigin;
    const s = n[n.length - 1];
    s !== void 0 && t.getValue(i, s).jump(s, !1);
  }
  measureEndState() {
    var a;
    const { element: t, name: n, unresolvedKeyframes: i } = this;
    if (!t || !t.current)
      return;
    const s = t.getValue(n);
    s && s.jump(this.measuredOrigin, !1);
    const r = i.length - 1, o = i[r];
    i[r] = X[n](t.measureViewportBox(), window.getComputedStyle(t.current)), o !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = o), (a = this.removedTransforms) != null && a.length && this.removedTransforms.forEach(([l, u]) => {
      t.getValue(l).set(u);
    }), this.resolveNoneKeyframes();
  }
}
const jr = [
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomRightRadius",
  "borderBottomLeftRadius"
];
function Xr(e, t, n) {
  if (e == null)
    return [];
  if (e instanceof EventTarget)
    return [e];
  if (typeof e == "string") {
    let i = document;
    t && (i = t.current);
    const s = (n == null ? void 0 : n[e]) ?? i.querySelectorAll(e);
    return s ? Array.from(s) : [];
  }
  return Array.from(e).filter((i) => i != null);
}
const ue = (e, t) => t && typeof e == "number" ? t.transform(e) : e, { schedule: Gr } = /* @__PURE__ */ zn(queueMicrotask, !1);
function Si(e) {
  return _i(e) && "ownerSVGElement" in e;
}
function Zr(e) {
  return Si(e) && e.tagName === "svg";
}
const Qr = [...bi, D, _], Jr = (e) => Qr.find(yi(e)), dn = () => ({ min: 0, max: 0 }), Ce = () => ({
  x: dn(),
  y: dn()
}), Et = /* @__PURE__ */ new WeakMap();
function to(e) {
  return e !== null && typeof e == "object" && typeof e.start == "function";
}
function eo(e) {
  return typeof e == "string" || Array.isArray(e);
}
const no = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], io = ["initial", ...no];
function Ti(e) {
  return to(e.animate) || io.some((t) => eo(e[t]));
}
function so(e) {
  return !!(Ti(e) || e.variants);
}
function ro(e, t, n) {
  for (const i in t) {
    const s = t[i], r = n[i];
    if (O(s))
      e.addValue(i, s);
    else if (O(r))
      e.addValue(i, it(s, { owner: e }));
    else if (r !== s)
      if (e.hasValue(i)) {
        const o = e.getValue(i);
        o.liveStyle === !0 ? o.jump(s) : o.hasAnimated || o.set(s);
      } else {
        const o = e.getStaticValue(i);
        e.addValue(i, it(o !== void 0 ? o : s, { owner: e }));
      }
  }
  for (const i in n)
    t[i] === void 0 && e.removeValue(i);
  return t;
}
const he = { current: null }, Mi = { current: !1 }, oo = typeof window < "u";
function ao() {
  if (Mi.current = !0, !!oo)
    if (window.matchMedia) {
      const e = window.matchMedia("(prefers-reduced-motion)"), t = () => he.current = e.matches;
      e.addEventListener("change", t), t();
    } else
      he.current = !1;
}
const fn = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let pn = {};
class xi {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(t, n, i) {
    return {};
  }
  constructor({ parent: t, props: n, presenceContext: i, reducedMotionConfig: s, skipAnimations: r, blockInitialAnimation: o, visualState: a }, l = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Ae, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const p = N.now();
      this.renderScheduledAt < p && (this.renderScheduledAt = p, z.render(this.render, !1, !0));
    };
    const { latestValues: u, renderState: c } = a;
    this.latestValues = u, this.baseTarget = { ...u }, this.initialValues = n.initial ? { ...u } : {}, this.renderState = c, this.parent = t, this.props = n, this.presenceContext = i, this.depth = t ? t.depth + 1 : 0, this.reducedMotionConfig = s, this.skipAnimationsConfig = r, this.options = l, this.blockInitialAnimation = !!o, this.isControllingVariants = Ti(n), this.isVariantNode = so(n), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(t && t.current);
    const { willChange: h, ...d } = this.scrapeMotionValuesFromProps(n, {}, this);
    for (const p in d) {
      const f = d[p];
      u[p] !== void 0 && O(f) && f.set(u[p]);
    }
  }
  mount(t) {
    var n, i;
    if (this.hasBeenMounted)
      for (const s in this.initialValues)
        (n = this.values.get(s)) == null || n.jump(this.initialValues[s]), this.latestValues[s] = this.initialValues[s];
    this.current = t, Et.set(t, this), this.projection && !this.projection.instance && this.projection.mount(t), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((s, r) => this.bindToMotionValue(r, s)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (Mi.current || ao(), this.shouldReduceMotion = he.current), process.env.NODE_ENV !== "production" && kn(this.shouldReduceMotion !== !0, "You have Reduced Motion enabled on your device. Animations may not appear as expected.", "reduced-motion-disabled"), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, (i = this.parent) == null || i.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
  }
  unmount() {
    var t;
    this.projection && this.projection.unmount(), Xt(this.notifyUpdate), Xt(this.render), this.valueSubscriptions.forEach((n) => n()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), (t = this.parent) == null || t.removeChild(this);
    for (const n in this.events)
      this.events[n].clear();
    for (const n in this.features) {
      const i = this.features[n];
      i && (i.unmount(), i.isMounted = !1);
    }
    this.current = null;
  }
  addChild(t) {
    this.children.add(t), this.enteringChildren ?? (this.enteringChildren = /* @__PURE__ */ new Set()), this.enteringChildren.add(t);
  }
  removeChild(t) {
    this.children.delete(t), this.enteringChildren && this.enteringChildren.delete(t);
  }
  bindToMotionValue(t, n) {
    if (this.valueSubscriptions.has(t) && this.valueSubscriptions.get(t)(), n.accelerate && ui.has(t) && this.current instanceof HTMLElement) {
      const { factory: o, keyframes: a, times: l, ease: u, duration: c } = n.accelerate, h = new li({
        element: this.current,
        name: t,
        keyframes: a,
        times: l,
        ease: u,
        duration: /* @__PURE__ */ P(c)
      }), d = o(h);
      this.valueSubscriptions.set(t, () => {
        d(), h.cancel();
      });
      return;
    }
    const i = gt.has(t);
    i && this.onBindTransform && this.onBindTransform();
    const s = n.on("change", (o) => {
      this.latestValues[t] = o, this.props.onUpdate && z.preRender(this.notifyUpdate), i && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
    });
    let r;
    typeof window < "u" && window.MotionCheckAppearSync && (r = window.MotionCheckAppearSync(this, t, n)), this.valueSubscriptions.set(t, () => {
      s(), r && r();
    });
  }
  sortNodePosition(t) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== t.type ? 0 : this.sortInstanceNodePosition(this.current, t.current);
  }
  updateFeatures() {
    let t = "animation";
    for (t in pn) {
      const n = pn[t];
      if (!n)
        continue;
      const { isEnabled: i, Feature: s } = n;
      if (!this.features[t] && s && i(this.props) && (this.features[t] = new s(this)), this.features[t]) {
        const r = this.features[t];
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : Ce();
  }
  getStaticValue(t) {
    return this.latestValues[t];
  }
  setStaticValue(t, n) {
    this.latestValues[t] = n;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(t, n) {
    (t.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = t, this.prevPresenceContext = this.presenceContext, this.presenceContext = n;
    for (let i = 0; i < fn.length; i++) {
      const s = fn[i];
      this.propEventSubscriptions[s] && (this.propEventSubscriptions[s](), delete this.propEventSubscriptions[s]);
      const r = "on" + s, o = t[r];
      o && (this.propEventSubscriptions[s] = this.on(s, o));
    }
    this.prevMotionValues = ro(this, this.scrapeMotionValuesFromProps(t, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(t) {
    return this.props.variants ? this.props.variants[t] : void 0;
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
  addVariantChild(t) {
    const n = this.getClosestVariantNode();
    if (n)
      return n.variantChildren && n.variantChildren.add(t), () => n.variantChildren.delete(t);
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(t, n) {
    const i = this.values.get(t);
    n !== i && (i && this.removeValue(t), this.bindToMotionValue(t, n), this.values.set(t, n), this.latestValues[t] = n.get());
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(t) {
    this.values.delete(t);
    const n = this.valueSubscriptions.get(t);
    n && (n(), this.valueSubscriptions.delete(t)), delete this.latestValues[t], this.removeValueFromRenderState(t, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(t) {
    return this.values.has(t);
  }
  getValue(t, n) {
    if (this.props.values && this.props.values[t])
      return this.props.values[t];
    let i = this.values.get(t);
    return i === void 0 && n !== void 0 && (i = it(n === null ? void 0 : n, { owner: this }), this.addValue(t, i)), i;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(t, n) {
    let i = this.latestValues[t] !== void 0 || !this.current ? this.latestValues[t] : this.getBaseTargetFromProps(this.props, t) ?? this.readValueFromInstance(this.current, t, this.options);
    return i != null && (typeof i == "string" && (An(i) || En(i)) ? i = parseFloat(i) : !Jr(i) && _.test(n) && (i = wi(t, n)), this.setBaseTarget(t, O(i) ? i.get() : i)), O(i) ? i.get() : i;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(t, n) {
    this.baseTarget[t] = n;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(t) {
    var r;
    const { initial: n } = this.props;
    let i;
    if (typeof n == "string" || typeof n == "object") {
      const o = mi(this.props, n, (r = this.presenceContext) == null ? void 0 : r.custom);
      o && (i = o[t]);
    }
    if (n && i !== void 0)
      return i;
    const s = this.getBaseTargetFromProps(this.props, t);
    return s !== void 0 && !O(s) ? s : this.initialValues[t] !== void 0 && i === void 0 ? void 0 : this.baseTarget[t];
  }
  on(t, n) {
    return this.events[t] || (this.events[t] = new Cn()), this.events[t].add(n);
  }
  notify(t, ...n) {
    this.events[t] && this.events[t].notify(...n);
  }
  scheduleRenderMicrotask() {
    Gr.render(this.render);
  }
}
class Ai extends xi {
  constructor() {
    super(...arguments), this.KeyframeResolver = Ur;
  }
  sortInstanceNodePosition(t, n) {
    return t.compareDocumentPosition(n) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(t, n) {
    const i = t.style;
    return i ? i[n] : void 0;
  }
  removeValueFromRenderState(t, { vars: n, style: i }) {
    delete n[t], delete i[t];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: t } = this.props;
    O(t) && (this.childSubscription = t.on("change", (n) => {
      this.current && (this.current.textContent = `${n}`);
    }));
  }
}
function lo({ top: e, left: t, right: n, bottom: i }) {
  return {
    x: { min: t, max: n },
    y: { min: e, max: i }
  };
}
function co(e, t) {
  if (!t)
    return e;
  const n = t({ x: e.left, y: e.top }), i = t({ x: e.right, y: e.bottom });
  return {
    top: n.y,
    left: n.x,
    bottom: i.y,
    right: i.x
  };
}
function uo(e, t) {
  return lo(co(e.getBoundingClientRect(), t));
}
const ho = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, fo = mt.length;
function po(e, t, n) {
  let i = "", s = !0;
  for (let o = 0; o < fo; o++) {
    const a = mt[o], l = e[a];
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
      const c = ue(l, Wt[a]);
      if (!u) {
        s = !1;
        const h = ho[a] || a;
        i += `${h}(${c}) `;
      }
      n && (t[a] = c);
    }
  }
  const r = e.pathRotation;
  return r && (s = !1, i += `rotate(${ue(r, Wt.pathRotation)}) `), i = i.trim(), n ? i = n(t, s ? "" : i) : s && (i = "none"), i;
}
function Ei(e, t, n) {
  const { style: i, vars: s, transformOrigin: r } = e;
  let o = !1, a = !1;
  for (const l in t) {
    const u = t[l];
    if (gt.has(l)) {
      o = !0;
      continue;
    } else if (Hn(l)) {
      s[l] = u;
      continue;
    } else {
      const c = ue(u, Wt[l]);
      l.startsWith("origin") ? (a = !0, r[l] = c) : i[l] = c;
    }
  }
  if (t.transform || (o || n ? i.transform = po(t, e.transform, n) : i.transform && (i.transform = "none")), a) {
    const { originX: l = "50%", originY: u = "50%", originZ: c = 0 } = r;
    i.transformOrigin = `${l} ${u} ${c}`;
  }
}
function Vi(e, { style: t, vars: n }, i, s) {
  const r = e.style;
  let o;
  for (o in t)
    r[o] = t[o];
  s == null || s.applyProjectionStyles(r, i);
  for (o in n)
    r.setProperty(o, n[o]);
}
function mn(e, t) {
  return t.max === t.min ? 0 : e / (t.max - t.min) * 100;
}
const vt = {
  correct: (e, t) => {
    if (!t.target)
      return e;
    if (typeof e == "string")
      if (b.test(e))
        e = parseFloat(e);
      else
        return e;
    const n = mn(e, t.target.x), i = mn(e, t.target.y);
    return `${n}% ${i}%`;
  }
}, mo = {
  correct: (e, { treeScale: t, projectionDelta: n }) => {
    const i = e, s = _.parse(e);
    if (s.length > 5)
      return i;
    const r = _.createTransformer(e), o = typeof s[0] != "number" ? 1 : 0, a = n.x.scale * t.x, l = n.y.scale * t.y;
    s[0 + o] /= a, s[1 + o] /= l;
    const u = pt(a, l, 0.5);
    return typeof s[2 + o] == "number" && (s[2 + o] /= u), typeof s[3 + o] == "number" && (s[3 + o] /= u), r(s);
  }
}, go = {
  borderRadius: {
    ...vt,
    applyTo: [...jr]
  },
  borderTopLeftRadius: vt,
  borderTopRightRadius: vt,
  borderBottomLeftRadius: vt,
  borderBottomRightRadius: vt,
  boxShadow: mo
};
function yo(e, { layout: t, layoutId: n }) {
  return gt.has(e) || e.startsWith("origin") || (t || n !== void 0) && (!!go[e] || e === "opacity");
}
function Ci(e, t, n) {
  var o;
  const i = e.style, s = t == null ? void 0 : t.style, r = {};
  if (!i)
    return r;
  for (const a in i)
    (O(i[a]) || s && O(s[a]) || yo(a, e) || ((o = n == null ? void 0 : n.getValue(a)) == null ? void 0 : o.liveStyle) !== void 0) && (r[a] = i[a]);
  return r;
}
function bo(e) {
  return window.getComputedStyle(e);
}
class vo extends Ai {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = Vi;
  }
  mount(t) {
    Y(!!t.style, "motion.create() components must forward their ref to a HTML or SVG element", "custom-component-ref"), super.mount(t);
  }
  readValueFromInstance(t, n) {
    var i;
    if (gt.has(n))
      return (i = this.projection) != null && i.isProjecting ? ne(n) : Ks(t, n);
    {
      const s = bo(t), r = (Hn(n) ? s.getPropertyValue(n) : s[n]) || 0;
      return typeof r == "string" ? r.trim() : r;
    }
  }
  measureInstanceViewportBox(t, { transformPagePoint: n }) {
    return uo(t, n);
  }
  build(t, n, i) {
    Ei(t, n, i.transformTemplate);
  }
  scrapeMotionValuesFromProps(t, n, i) {
    return Ci(t, n, i);
  }
}
function wo(e, t) {
  return e in t;
}
class So extends xi {
  constructor() {
    super(...arguments), this.type = "object";
  }
  readValueFromInstance(t, n) {
    if (wo(n, t)) {
      const i = t[n];
      if (typeof i == "string" || typeof i == "number")
        return i;
    }
  }
  getBaseTargetFromProps() {
  }
  removeValueFromRenderState(t, n) {
    delete n.output[t];
  }
  measureInstanceViewportBox() {
    return Ce();
  }
  build(t, n) {
    Object.assign(t.output, n);
  }
  renderInstance(t, { output: n }) {
    Object.assign(t, n);
  }
  sortInstanceNodePosition() {
    return 0;
  }
}
const To = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, Mo = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function xo(e, t, n = 1, i = 0, s = !0) {
  e.pathLength = 1;
  const r = s ? To : Mo;
  e[r.offset] = `${-i}`, e[r.array] = `${t} ${n}`;
}
const Ao = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function Eo(e, {
  attrX: t,
  attrY: n,
  attrScale: i,
  pathLength: s,
  pathSpacing: r = 1,
  pathOffset: o = 0,
  // This is object creation, which we try to avoid per-frame.
  ...a
}, l, u, c) {
  if (Ei(e, a, u), l) {
    e.style.viewBox && (e.attrs.viewBox = e.style.viewBox);
    return;
  }
  e.attrs = e.style, e.style = {};
  const { attrs: h, style: d } = e;
  h.transform && (d.transform = h.transform, delete h.transform), (d.transform || h.transformOrigin) && (d.transformOrigin = h.transformOrigin ?? "50% 50%", delete h.transformOrigin), d.transform && (d.transformBox = (c == null ? void 0 : c.transformBox) ?? "fill-box", delete h.transformBox);
  for (const p of Ao)
    h[p] !== void 0 && (d[p] = h[p], delete h[p]);
  t !== void 0 && (h.x = t), n !== void 0 && (h.y = n), i !== void 0 && (h.scale = i), s !== void 0 && xo(h, s, r, o, !1);
}
const Ri = /* @__PURE__ */ new Set([
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
]), Vo = (e) => typeof e == "string" && e.toLowerCase() === "svg";
function Co(e, t, n, i) {
  Vi(e, t, void 0, i);
  for (const s in t.attrs)
    e.setAttribute(Ri.has(s) ? s : Ve(s), t.attrs[s]);
}
function Ro(e, t, n) {
  const i = Ci(e, t, n);
  for (const s in e)
    if (O(e[s]) || O(t[s])) {
      const r = mt.indexOf(s) !== -1 ? "attr" + s.charAt(0).toUpperCase() + s.substring(1) : s;
      i[r] = e[s];
    }
  return i;
}
class ko extends Ai {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = Ce;
  }
  getBaseTargetFromProps(t, n) {
    return t[n];
  }
  readValueFromInstance(t, n) {
    if (gt.has(n)) {
      const i = vi(n);
      return i && i.default || 0;
    }
    return n = Ri.has(n) ? n : Ve(n), t.getAttribute(n);
  }
  scrapeMotionValuesFromProps(t, n, i) {
    return Ro(t, n, i);
  }
  build(t, n, i) {
    Eo(t, n, this.isSVGTag, i.transformTemplate, i.style);
  }
  renderInstance(t, n, i, s) {
    Co(t, n, i, s);
  }
  mount(t) {
    this.isSVGTag = Vo(t.tagName), super.mount(t);
  }
}
function Do(e, t, n) {
  const i = O(e) ? e : it(e);
  return i.start(fi("", i, t, n)), i.animation;
}
function Re(e) {
  return typeof e == "object" && !Array.isArray(e);
}
function ki(e, t, n, i) {
  return e == null ? [] : typeof e == "string" && Re(t) ? Xr(e, n, i) : e instanceof NodeList ? Array.from(e) : Array.isArray(e) ? e.filter((s) => s != null) : [e];
}
function Oo(e, t, n) {
  return e * (t + 1) + n * t;
}
function gn(e, t, n, i) {
  return typeof t == "number" ? t : t.startsWith("-") || t.startsWith("+") ? Math.max(0, e + parseFloat(t)) : t === "<" ? n : t.startsWith("<") ? Math.max(0, n + parseFloat(t.slice(1))) : i.get(t) ?? e;
}
function Fo(e, t, n) {
  for (let i = 0; i < e.length; i++) {
    const s = e[i];
    s.at > t && s.at < n && (fe(e, s), i--);
  }
}
function No(e, t, n, i, s, r) {
  Fo(e, s, r);
  for (let o = 0; o < t.length; o++)
    e.push({
      value: t[o],
      at: pt(s, r, i[o]),
      easing: /* @__PURE__ */ Wn(n, o)
    });
}
function Po(e, t, n = 0) {
  const i = t + 1 + t * n;
  for (let s = 0; s < e.length; s++)
    e[s] = e[s] / i;
}
function Lo(e, t) {
  return e.at === t.at ? e.value === null ? 1 : t.value === null ? -1 : 0 : e.at - t.at;
}
const Io = "easeInOut", Yt = 20;
function Bo(e, { defaultTransition: t = {}, ...n } = {}, i, s) {
  const r = t.duration || 0.3, o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), l = {}, u = /* @__PURE__ */ new Map();
  let c = 0, h = 0, d = 0;
  for (let p = 0; p < e.length; p++) {
    const f = e[p];
    if (typeof f == "string") {
      u.set(f, h);
      continue;
    } else if (!Array.isArray(f)) {
      u.set(f.name, gn(h, f.at, c, u));
      continue;
    }
    let [m, g, y = {}] = f;
    y.at !== void 0 && (h = gn(h, y.at, c, u));
    let x = 0;
    const T = (S, M, V, R = 0, A = 0) => {
      const E = Wo(S), { delay: w = 0, times: C = ti(E), type: L = t.type || "keyframes", repeat: F, repeatType: I, repeatDelay: K = 0, ...H } = M;
      let { ease: $ = t.ease || "easeOut", duration: B } = M;
      const Oe = typeof w == "function" ? w(R, A) : w, Fe = E.length, Ne = Ee(L) ? L : s == null ? void 0 : s[L || "keyframes"];
      if (Fe <= 2 && Ne) {
        let st = 100;
        if (Fe === 2 && Ko(E)) {
          const yt = E[1] - E[0];
          st = Math.abs(yt);
        }
        const rt = {
          ...t,
          ...H
        };
        B !== void 0 && (rt.duration = /* @__PURE__ */ P(B));
        const kt = Zn(rt, st, Ne);
        $ = kt.ease, B = kt.duration;
      }
      B ?? (B = r);
      const Pe = h + Oe;
      C.length === 1 && C[0] === 0 && (C[1] = 1);
      const Le = C.length - E.length;
      if (Le > 0 && Jn(C, Le), E.length === 1 && E.unshift(null), F && ht(F < Yt, `Sequence segments can't repeat ${F} times — ignoring repeat option. Use a value below ${Yt} or apply repeat at the sequence level instead.`), F && F < Yt) {
        const st = B > 0 ? K / B : 0;
        B = Oo(B, F, K);
        const rt = [...E], kt = [...C];
        $ = Array.isArray($) ? [...$] : [$];
        const yt = [...$], Be = I === "reverse" || I === "mirror";
        let We = rt, _e = yt;
        Be && (We = [...rt].reverse(), I === "reverse" && (_e = [...yt].reverse().map((U) => typeof U == "function" ? /* @__PURE__ */ ge(U) : U)));
        for (let U = 0; U < F; U++) {
          const ze = Be && U % 2 === 0, Ke = ze ? We : rt, Ni = ze ? _e : yt, He = (U + 1) * (1 + st);
          st > 0 && (E.push(E[E.length - 1]), C.push(He), $.push("linear")), E.push(...Ke);
          for (let bt = 0; bt < Ke.length; bt++)
            C.push(kt[bt] + He), $.push(bt === 0 ? "linear" : /* @__PURE__ */ Wn(Ni, bt - 1));
        }
        Po(C, F, st);
      }
      const Ie = Pe + B;
      No(V, E, $, C, Pe, Ie), x = Math.max(Oe + B, x), d = Math.max(Ie, d);
    };
    if (O(m)) {
      const S = yn(m, a);
      T(g, y, bn("default", S));
    } else {
      const S = ki(m, g, i, l), M = S.length;
      for (let V = 0; V < M; V++) {
        g = g, y = y;
        const R = S[V], A = yn(R, a);
        for (const E in g)
          T(g[E], _o(y, E), bn(E, A), V, M);
      }
    }
    c = h, h += x;
  }
  return a.forEach((p, f) => {
    for (const m in p) {
      const g = p[m];
      g.sort(Lo);
      const y = [], x = [], T = [];
      for (let R = 0; R < g.length; R++) {
        const { at: A, value: E, easing: w } = g[R];
        y.push(E), x.push(/* @__PURE__ */ me(0, d, A)), T.push(w || "easeOut");
      }
      x[0] !== 0 && (x.unshift(0), y.unshift(y[0]), T.unshift(Io)), x[x.length - 1] !== 1 && (x.push(1), y.push(null)), o.has(f) || o.set(f, {
        keyframes: {},
        transition: {}
      });
      const S = o.get(f);
      S.keyframes[m] = y;
      const { type: M, ...V } = t;
      S.transition[m] = {
        ...V,
        duration: d,
        ease: T,
        times: x,
        ...n
      };
    }
  }), o;
}
function yn(e, t) {
  return !t.has(e) && t.set(e, {}), t.get(e);
}
function bn(e, t) {
  return t[e] || (t[e] = []), t[e];
}
function Wo(e) {
  return Array.isArray(e) ? e : [e];
}
function _o(e, t) {
  return e && e[t] ? {
    ...e,
    ...e[t]
  } : { ...e };
}
const zo = (e) => typeof e == "number", Ko = (e) => e.every(zo);
function Ho(e) {
  const t = {
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
  }, n = Si(e) && !Zr(e) ? new ko(t) : new vo(t);
  n.mount(e), Et.set(e, n);
}
function $o(e) {
  const t = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        output: {}
      },
      latestValues: {}
    }
  }, n = new So(t);
  n.mount(e), Et.set(e, n);
}
function qo(e, t) {
  return O(e) || typeof e == "number" || typeof e == "string" && !Re(t);
}
function Di(e, t, n, i) {
  const s = [];
  if (qo(e, t))
    s.push(Do(e, Re(t) && t.default || t, n && (n.default || n)));
  else {
    if (e == null)
      return s;
    const r = ki(e, t, i), o = r.length;
    Y(!!o, "No valid elements provided.", "no-valid-elements");
    for (let a = 0; a < o; a++) {
      const l = r[a], u = l instanceof Element ? Ho : $o;
      Et.has(l) || u(l);
      const c = Et.get(l), h = { ...n };
      "delay" in h && typeof h.delay == "function" && (h.delay = h.delay(a, o)), s.push(...Lr(c, { ...t, transition: h }, {}));
    }
  }
  return s;
}
function Yo(e, t, n) {
  const i = [], s = e.map((o) => {
    if (Array.isArray(o) && typeof o[0] == "function") {
      const a = o[0], l = it(0);
      return l.on("change", a), o.length === 1 ? [l, [0, 1]] : o.length === 2 ? [l, [0, 1], o[1]] : [l, o[1], o[2]];
    }
    return o;
  });
  return Bo(s, t, n, { spring: At }).forEach(({ keyframes: o, transition: a }, l) => {
    i.push(...Di(l, o, a));
  }), i;
}
function Uo(e) {
  return Array.isArray(e) && e.some(Array.isArray);
}
function jo(e = {}) {
  const { scope: t, reduceMotion: n, skipAnimations: i } = e;
  function s(r, o, a) {
    let l = [], u;
    const c = {};
    if (n !== void 0 && (c.reduceMotion = n), i !== void 0 && (c.skipAnimations = i), Uo(r)) {
      const { onComplete: d, ...p } = o || {};
      typeof d == "function" && (u = d), l = Yo(r, { ...c, ...p }, t);
    } else {
      const { onComplete: d, ...p } = a || {};
      typeof d == "function" && (u = d), l = Di(r, o, { ...c, ...p }, t);
    }
    const h = new dr(l);
    return u && h.finished.then(u), t && (t.animations.push(h), h.finished.then(() => {
      fe(t.animations, h);
    })), h;
  }
  return s;
}
const ke = jo();
var vn = "1.3.26";
function Oi(e, t, n) {
  return Math.max(e, Math.min(t, n));
}
function Xo(e, t, n) {
  return (1 - n) * e + n * t;
}
function Go(e, t, n, i) {
  return Xo(e, t, 1 - Math.exp(-n * i));
}
function Zo(e, t) {
  return (e % t + t) % t;
}
var Qo = class {
  constructor() {
    v(this, "isRunning", !1);
    v(this, "value", 0);
    v(this, "from", 0);
    v(this, "to", 0);
    v(this, "currentTime", 0);
    v(this, "lerp");
    v(this, "duration");
    v(this, "easing");
    v(this, "onUpdate");
  }
  /**
  * Advance the animation by the given delta time
  *
  * @param deltaTime - The time in seconds to advance the animation
  */
  advance(e) {
    var n;
    if (!this.isRunning) return;
    let t = !1;
    if (this.duration && this.easing) {
      this.currentTime += e;
      const i = Oi(0, this.currentTime / this.duration, 1);
      t = i >= 1;
      const s = t ? 1 : this.easing(i);
      this.value = this.from + (this.to - this.from) * s;
    } else this.lerp ? (this.value = Go(this.value, this.to, this.lerp * 60, e), Math.round(this.value) === Math.round(this.to) && (this.value = this.to, t = !0)) : (this.value = this.to, t = !0);
    t && this.stop(), (n = this.onUpdate) == null || n.call(this, this.value, t);
  }
  /** Stop the animation */
  stop() {
    this.isRunning = !1;
  }
  /**
  * Set up the animation from a starting value to an ending value
  * with optional parameters for lerping, duration, easing, and onUpdate callback
  *
  * @param from - The starting value
  * @param to - The ending value
  * @param options - Options for the animation
  */
  fromTo(e, t, { lerp: n, duration: i, easing: s, onStart: r, onUpdate: o }) {
    this.from = this.value = e, this.to = t, this.lerp = n, this.duration = i, this.easing = s, this.currentTime = 0, this.isRunning = !0, r == null || r(), this.onUpdate = o;
  }
};
function Jo(e, t) {
  let n;
  return function(...i) {
    clearTimeout(n), n = setTimeout(() => {
      n = void 0, e.apply(this, i);
    }, t);
  };
}
var ta = class {
  constructor(e, t, { autoResize: n = !0, debounce: i = 250 } = {}) {
    v(this, "width", 0);
    v(this, "height", 0);
    v(this, "scrollHeight", 0);
    v(this, "scrollWidth", 0);
    v(this, "debouncedResize");
    v(this, "wrapperResizeObserver");
    v(this, "contentResizeObserver");
    v(this, "resize", () => {
      this.onWrapperResize(), this.onContentResize();
    });
    v(this, "onWrapperResize", () => {
      this.wrapper instanceof Window ? (this.width = window.innerWidth, this.height = window.innerHeight) : (this.width = this.wrapper.clientWidth, this.height = this.wrapper.clientHeight);
    });
    v(this, "onContentResize", () => {
      this.wrapper instanceof Window ? (this.scrollHeight = this.content.scrollHeight, this.scrollWidth = this.content.scrollWidth) : (this.scrollHeight = this.wrapper.scrollHeight, this.scrollWidth = this.wrapper.scrollWidth);
    });
    this.wrapper = e, this.content = t, n && (this.debouncedResize = Jo(this.resize, i), this.wrapper instanceof Window ? window.addEventListener("resize", this.debouncedResize) : (this.wrapperResizeObserver = new ResizeObserver(this.debouncedResize), this.wrapperResizeObserver.observe(this.wrapper)), this.contentResizeObserver = new ResizeObserver(this.debouncedResize), this.contentResizeObserver.observe(this.content)), this.resize();
  }
  destroy() {
    var e, t;
    (e = this.wrapperResizeObserver) == null || e.disconnect(), (t = this.contentResizeObserver) == null || t.disconnect(), this.wrapper === window && this.debouncedResize && window.removeEventListener("resize", this.debouncedResize);
  }
  get limit() {
    return {
      x: this.scrollWidth - this.width,
      y: this.scrollHeight - this.height
    };
  }
}, Fi = class {
  constructor() {
    v(this, "events", {});
  }
  /**
  * Emit an event with the given data
  * @param event Event name
  * @param args Data to pass to the event handlers
  */
  emit(e, ...t) {
    var i;
    const n = this.events[e] || [];
    for (let s = 0, r = n.length; s < r; s++) (i = n[s]) == null || i.call(n, ...t);
  }
  /**
  * Add a callback to the event
  * @param event Event name
  * @param cb Callback function
  * @returns Unsubscribe function
  */
  on(e, t) {
    return this.events[e] ? this.events[e].push(t) : this.events[e] = [t], () => {
      var n;
      this.events[e] = (n = this.events[e]) == null ? void 0 : n.filter((i) => t !== i);
    };
  }
  /**
  * Remove a callback from the event
  * @param event Event name
  * @param callback Callback function
  */
  off(e, t) {
    var n;
    this.events[e] = (n = this.events[e]) == null ? void 0 : n.filter((i) => t !== i);
  }
  /**
  * Remove all event listeners and clean up
  */
  destroy() {
    this.events = {};
  }
};
const ea = 100 / 6, j = { passive: !1 };
function wn(e, t) {
  return e === 1 ? ea : e === 2 ? t : 1;
}
var na = class {
  constructor(e, t = {
    wheelMultiplier: 1,
    touchMultiplier: 1
  }) {
    v(this, "touchStart", {
      x: 0,
      y: 0
    });
    v(this, "lastDelta", {
      x: 0,
      y: 0
    });
    v(this, "window", {
      width: 0,
      height: 0
    });
    v(this, "emitter", new Fi());
    /**
    * Event handler for 'touchstart' event
    *
    * @param event Touch event
    */
    v(this, "onTouchStart", (e) => {
      const { clientX: t, clientY: n } = e.targetTouches ? e.targetTouches[0] : e;
      this.touchStart.x = t, this.touchStart.y = n, this.lastDelta = {
        x: 0,
        y: 0
      }, this.emitter.emit("scroll", {
        deltaX: 0,
        deltaY: 0,
        event: e
      });
    });
    /** Event handler for 'touchmove' event */
    v(this, "onTouchMove", (e) => {
      const { clientX: t, clientY: n } = e.targetTouches ? e.targetTouches[0] : e, i = -(t - this.touchStart.x) * this.options.touchMultiplier, s = -(n - this.touchStart.y) * this.options.touchMultiplier;
      this.touchStart.x = t, this.touchStart.y = n, this.lastDelta = {
        x: i,
        y: s
      }, this.emitter.emit("scroll", {
        deltaX: i,
        deltaY: s,
        event: e
      });
    });
    v(this, "onTouchEnd", (e) => {
      this.emitter.emit("scroll", {
        deltaX: this.lastDelta.x,
        deltaY: this.lastDelta.y,
        event: e
      });
    });
    /** Event handler for 'wheel' event */
    v(this, "onWheel", (e) => {
      let { deltaX: t, deltaY: n, deltaMode: i } = e;
      const s = wn(i, this.window.width), r = wn(i, this.window.height);
      t *= s, n *= r, t *= this.options.wheelMultiplier, n *= this.options.wheelMultiplier, this.emitter.emit("scroll", {
        deltaX: t,
        deltaY: n,
        event: e
      });
    });
    v(this, "onWindowResize", () => {
      this.window = {
        width: window.innerWidth,
        height: window.innerHeight
      };
    });
    this.element = e, this.options = t, window.addEventListener("resize", this.onWindowResize), this.onWindowResize(), this.element.addEventListener("wheel", this.onWheel, j), this.element.addEventListener("touchstart", this.onTouchStart, j), this.element.addEventListener("touchmove", this.onTouchMove, j), this.element.addEventListener("touchend", this.onTouchEnd, j);
  }
  /**
  * Add an event listener for the given event and callback
  *
  * @param event Event name
  * @param callback Callback function
  */
  on(e, t) {
    return this.emitter.on(e, t);
  }
  /** Remove all event listeners and clean up */
  destroy() {
    this.emitter.destroy(), window.removeEventListener("resize", this.onWindowResize), this.element.removeEventListener("wheel", this.onWheel, j), this.element.removeEventListener("touchstart", this.onTouchStart, j), this.element.removeEventListener("touchmove", this.onTouchMove, j), this.element.removeEventListener("touchend", this.onTouchEnd, j);
  }
};
const Sn = (e) => Math.min(1, 1.001 - 2 ** (-10 * e));
var ia = class {
  constructor({ wrapper: e = window, content: t = document.documentElement, eventsTarget: n = e, smoothWheel: i = !0, syncTouch: s = !1, syncTouchLerp: r = 0.075, touchInertiaExponent: o = 1.7, duration: a, easing: l, lerp: u = 0.1, infinite: c = !1, orientation: h = "vertical", gestureOrientation: d = h === "horizontal" ? "both" : "vertical", touchMultiplier: p = 1, wheelMultiplier: f = 1, autoResize: m = !0, prevent: g, virtualScroll: y, overscroll: x = !0, autoRaf: T = !1, anchors: S = !1, autoToggle: M = !1, allowNestedScroll: V = !1, __experimental__naiveDimensions: R = !1, naiveDimensions: A = R, stopInertiaOnNavigate: E = !1, respectReducedMotion: w = !0 } = {}) {
    v(this, "_isScrolling", !1);
    v(this, "_isStopped", !1);
    v(this, "_isLocked", !1);
    v(this, "_preventNextNativeScrollEvent", !1);
    v(this, "_resetVelocityTimeout", null);
    v(this, "_rafId", null);
    v(this, "_isDraggingSelection", !1);
    v(this, "reducedMotionMediaQuery", window.matchMedia("(prefers-reduced-motion: reduce)"));
    /**
    * Whether or not the user is touching the screen
    */
    v(this, "isTouching");
    /**
    * Whether or not the device is running iOS
    */
    v(this, "isIos");
    /**
    * The time in ms since the lenis instance was created
    */
    v(this, "time", 0);
    /**
    * User data that will be forwarded through the scroll event
    *
    * @example
    * lenis.scrollTo(100, {
    *   userData: {
    *     foo: 'bar'
    *   }
    * })
    */
    v(this, "userData", {});
    /**
    * The last velocity of the scroll
    */
    v(this, "lastVelocity", 0);
    /**
    * The current velocity of the scroll
    */
    v(this, "velocity", 0);
    /**
    * The direction of the scroll
    */
    v(this, "direction", 0);
    /**
    * The options passed to the lenis instance
    */
    v(this, "options");
    /**
    * The target scroll value
    */
    v(this, "targetScroll");
    /**
    * The animated scroll value
    */
    v(this, "animatedScroll");
    v(this, "animate", new Qo());
    v(this, "emitter", new Fi());
    v(this, "dimensions");
    v(this, "virtualScroll");
    v(this, "onScrollEnd", (e) => {
      e instanceof CustomEvent || (this.isScrolling === "smooth" || this.isScrolling === !1) && e.stopPropagation();
    });
    v(this, "dispatchScrollendEvent", () => {
      this.options.wrapper.dispatchEvent(new CustomEvent("scrollend", {
        bubbles: this.options.wrapper === window,
        detail: { lenisScrollEnd: !0 }
      }));
    });
    v(this, "onTransitionEnd", (e) => {
      var t;
      (t = e.propertyName) != null && t.includes("overflow") && e.target === this.rootElement && this.checkOverflow();
    });
    v(this, "onClick", (e) => {
      const t = e.composedPath().filter((i) => i instanceof HTMLAnchorElement && i.href).map((i) => new URL(i.href)), n = new URL(window.location.href);
      if (this.options.anchors) {
        const i = t.find((s) => n.host === s.host && n.pathname === s.pathname && s.hash);
        if (i) {
          const s = typeof this.options.anchors == "object" && this.options.anchors ? this.options.anchors : void 0, r = decodeURIComponent(i.hash);
          this.scrollTo(r, s);
          return;
        }
      }
      if (this.options.stopInertiaOnNavigate && t.some((i) => n.host === i.host && n.pathname !== i.pathname)) {
        this.reset();
        return;
      }
    });
    v(this, "onPointerDown", (e) => {
      e.button === 1 && this.reset();
    });
    v(this, "onVirtualScroll", (e) => {
      if (typeof this.options.virtualScroll == "function" && this.options.virtualScroll(e) === !1) return;
      const { deltaX: t, deltaY: n, event: i } = e;
      if (this.emitter.emit("virtual-scroll", {
        deltaX: t,
        deltaY: n,
        event: i
      }), i.ctrlKey || i.lenisStopPropagation) return;
      const s = i.type.includes("touch"), r = i.type.includes("wheel");
      if (s && this.isIos && (i.type === "touchstart" && (this._isDraggingSelection = this.isTouchOnSelectionHandle(i)), this._isDraggingSelection)) {
        i.type === "touchend" && (this._isDraggingSelection = !1);
        return;
      }
      this.isTouching = i.type === "touchstart" || i.type === "touchmove";
      const o = t === 0 && n === 0;
      if (this.options.syncTouch && s && i.type === "touchstart" && o && !this.isStopped && !this.isLocked) {
        this.reset();
        return;
      }
      const a = this.options.gestureOrientation === "vertical" && n === 0 || this.options.gestureOrientation === "horizontal" && t === 0;
      if (o || a) return;
      let l = i.composedPath();
      l = l.slice(0, l.indexOf(this.rootElement));
      const u = this.options.prevent, c = Math.abs(t) >= Math.abs(n) ? "horizontal" : "vertical";
      if (l.find((f) => {
        var m, g, y, x, T;
        return f instanceof HTMLElement && (typeof u == "function" && (u == null ? void 0 : u(f)) || ((m = f.hasAttribute) == null ? void 0 : m.call(f, "data-lenis-prevent")) || c === "vertical" && ((g = f.hasAttribute) == null ? void 0 : g.call(f, "data-lenis-prevent-vertical")) || c === "horizontal" && ((y = f.hasAttribute) == null ? void 0 : y.call(f, "data-lenis-prevent-horizontal")) || s && ((x = f.hasAttribute) == null ? void 0 : x.call(f, "data-lenis-prevent-touch")) || r && ((T = f.hasAttribute) == null ? void 0 : T.call(f, "data-lenis-prevent-wheel")) || this.options.allowNestedScroll && this.hasNestedScroll(f, {
          deltaX: t,
          deltaY: n
        }));
      })) return;
      if (this.isStopped || this.isLocked) {
        i.cancelable && i.preventDefault();
        return;
      }
      if (!(this.options.syncTouch && s || this.options.smoothWheel && r)) {
        this.isScrolling = "native", this.animate.stop(), i.lenisStopPropagation = !0;
        return;
      }
      let h = n;
      this.options.gestureOrientation === "both" ? h = Math.abs(n) > Math.abs(t) ? n : t : this.options.gestureOrientation === "horizontal" && (h = t), (!this.options.overscroll || this.options.infinite || this.options.wrapper !== window && this.limit > 0 && (this.animatedScroll > 0 && this.animatedScroll < this.limit || this.animatedScroll === 0 && n > 0 || this.animatedScroll === this.limit && n < 0)) && (i.lenisStopPropagation = !0), i.cancelable && i.preventDefault();
      const d = s && this.options.syncTouch, p = s && i.type === "touchend";
      p && (h = Math.sign(h) * Math.abs(this.velocity) ** this.options.touchInertiaExponent), this.scrollTo(this.targetScroll + h, {
        programmatic: !1,
        ...d ? { lerp: p ? this.options.syncTouchLerp : 1 } : {
          lerp: this.options.lerp,
          duration: this.options.duration,
          easing: this.options.easing
        }
      });
    });
    v(this, "onNativeScroll", () => {
      if (this._resetVelocityTimeout !== null && (clearTimeout(this._resetVelocityTimeout), this._resetVelocityTimeout = null), this._preventNextNativeScrollEvent) {
        this._preventNextNativeScrollEvent = !1;
        return;
      }
      if (this.isScrolling === !1 || this.isScrolling === "native") {
        const e = this.animatedScroll;
        this.animatedScroll = this.targetScroll = this.actualScroll, this.lastVelocity = this.velocity, this.velocity = this.animatedScroll - e, this.direction = Math.sign(this.animatedScroll - e), this.isStopped || (this.isScrolling = "native"), this.emit(), this.velocity !== 0 && (this._resetVelocityTimeout = setTimeout(() => {
          this.lastVelocity = this.velocity, this.velocity = 0, this.isScrolling = !1, this.emit();
        }, 400));
      }
    });
    /**
    * RequestAnimationFrame for lenis
    *
    * @param time The time in ms from an external clock like `requestAnimationFrame` or Tempus
    */
    v(this, "raf", (e) => {
      const t = e - (this.time || e);
      this.time = e, this.animate.advance(t * 1e-3), this.options.autoRaf && (this._rafId = requestAnimationFrame(this.raf));
    });
    window.lenisVersion = vn, window.lenis || (window.lenis = {}), window.lenis.version = vn, h === "horizontal" && (window.lenis.horizontal = !0), s === !0 && (window.lenis.touch = !0), this.isIos = /(iPad|iPhone|iPod)/g.test(navigator.userAgent), (!e || e === document.documentElement) && (e = window), typeof a == "number" && typeof l != "function" ? l = Sn : typeof l == "function" && typeof a != "number" && (a = 1), this.options = {
      wrapper: e,
      content: t,
      eventsTarget: n,
      smoothWheel: i,
      syncTouch: s,
      syncTouchLerp: r,
      touchInertiaExponent: o,
      duration: a,
      easing: l,
      lerp: u,
      infinite: c,
      gestureOrientation: d,
      orientation: h,
      touchMultiplier: p,
      wheelMultiplier: f,
      autoResize: m,
      prevent: g,
      virtualScroll: y,
      overscroll: x,
      autoRaf: T,
      anchors: S,
      autoToggle: M,
      allowNestedScroll: V,
      naiveDimensions: A,
      stopInertiaOnNavigate: E,
      respectReducedMotion: w
    }, this.dimensions = new ta(e, t, { autoResize: m }), this.updateClassName(), this.targetScroll = this.animatedScroll = this.actualScroll, this.options.wrapper.addEventListener("scroll", this.onNativeScroll), this.options.wrapper.addEventListener("scrollend", this.onScrollEnd, { capture: !0 }), (this.options.anchors || this.options.stopInertiaOnNavigate) && this.options.wrapper.addEventListener("click", this.onClick), this.options.wrapper.addEventListener("pointerdown", this.onPointerDown), this.virtualScroll = new na(n, {
      touchMultiplier: p,
      wheelMultiplier: f
    }), this.virtualScroll.on("scroll", this.onVirtualScroll), this.options.autoToggle && (this.checkOverflow(), this.rootElement.addEventListener("transitionend", this.onTransitionEnd)), this.options.autoRaf && (this._rafId = requestAnimationFrame(this.raf));
  }
  /**
  * Destroy the lenis instance, remove all event listeners and clean up the class name
  */
  destroy() {
    this.emitter.destroy(), this.options.wrapper.removeEventListener("scroll", this.onNativeScroll), this.options.wrapper.removeEventListener("scrollend", this.onScrollEnd, { capture: !0 }), this.options.wrapper.removeEventListener("pointerdown", this.onPointerDown), (this.options.anchors || this.options.stopInertiaOnNavigate) && this.options.wrapper.removeEventListener("click", this.onClick), this.virtualScroll.destroy(), this.dimensions.destroy(), this.cleanUpClassName(), this._rafId && cancelAnimationFrame(this._rafId);
  }
  on(e, t) {
    return this.emitter.on(e, t);
  }
  off(e, t) {
    return this.emitter.off(e, t);
  }
  get overflow() {
    const e = this.isHorizontal ? "overflow-x" : "overflow-y";
    return getComputedStyle(this.rootElement)[e];
  }
  checkOverflow() {
    ["hidden", "clip"].includes(this.overflow) ? this.internalStop() : this.internalStart();
  }
  setScroll(e) {
    this.isHorizontal ? this.options.wrapper.scrollTo({
      left: e,
      behavior: "instant"
    }) : this.options.wrapper.scrollTo({
      top: e,
      behavior: "instant"
    });
  }
  isTouchOnSelectionHandle(e) {
    const t = window.getSelection();
    if (!t || t.isCollapsed || t.rangeCount === 0) return !1;
    const n = e.targetTouches[0] ?? e.changedTouches[0];
    if (!n) return !1;
    const i = t.getRangeAt(0).getClientRects();
    if (i.length === 0) return !1;
    const s = i[0], r = i[i.length - 1], o = 40, a = Math.hypot(n.clientX - s.left, n.clientY - s.top) <= o, l = Math.hypot(n.clientX - r.right, n.clientY - r.bottom) <= o;
    return a || l;
  }
  /**
  * Force lenis to recalculate the dimensions
  */
  resize() {
    this.dimensions.resize(), this.animatedScroll = this.targetScroll = this.actualScroll, this.emit();
  }
  emit() {
    this.emitter.emit("scroll", this);
  }
  reset() {
    this.isLocked = !1, this.isScrolling = !1, this.animatedScroll = this.targetScroll = this.actualScroll, this.lastVelocity = this.velocity = 0, this.animate.stop();
  }
  /**
  * Start lenis scroll after it has been stopped
  */
  start() {
    if (this.isStopped) {
      if (this.options.autoToggle) {
        this.rootElement.style.removeProperty("overflow");
        return;
      }
      this.internalStart();
    }
  }
  internalStart() {
    this.isStopped && (this.reset(), this.isStopped = !1, this.emit());
  }
  /**
  * Stop lenis scroll
  */
  stop() {
    if (!this.isStopped) {
      if (this.options.autoToggle) {
        this.rootElement.style.setProperty("overflow", "clip");
        return;
      }
      this.internalStop();
    }
  }
  internalStop() {
    this.isStopped || (this.reset(), this.isStopped = !0, this.emit());
  }
  /**
  * Scroll to a target value
  *
  * @param target The target value to scroll to
  * @param options The options for the scroll
  *
  * @example
  * lenis.scrollTo(100, {
  *   offset: 100,
  *   duration: 1,
  *   easing: (t) => 1 - Math.cos((t * Math.PI) / 2),
  *   lerp: 0.1,
  *   onStart: () => {
  *     console.log('onStart')
  *   },
  *   onComplete: () => {
  *     console.log('onComplete')
  *   },
  * })
  */
  scrollTo(e, { offset: t = 0, immediate: n = !1, lock: i = !1, programmatic: s = !0, lerp: r = s ? this.options.lerp : void 0, duration: o = s ? this.options.duration : void 0, easing: a = s ? this.options.easing : void 0, onStart: l, onComplete: u, force: c = !1, userData: h } = {}) {
    if (this.prefersReducedMotion && (s ? n = !0 : (r = 1, o = void 0, a = void 0)), (this.isStopped || this.isLocked) && !c) return;
    let d = e, p = t;
    if (typeof d == "string" && [
      "top",
      "left",
      "start",
      "#"
    ].includes(d)) d = 0;
    else if (typeof d == "string" && [
      "bottom",
      "right",
      "end"
    ].includes(d)) d = this.limit;
    else {
      let f = null;
      if (typeof d == "string" ? (f = d.startsWith("#") ? document.getElementById(d.slice(1)) : document.querySelector(d), f || (d === "#top" ? d = 0 : console.warn("Lenis: Target not found", d))) : d instanceof HTMLElement && (d != null && d.nodeType) && (f = d), f) {
        if (this.options.wrapper !== window) {
          const S = this.rootElement.getBoundingClientRect();
          p -= this.isHorizontal ? S.left : S.top;
        }
        const m = f.getBoundingClientRect(), g = getComputedStyle(f), y = this.isHorizontal ? Number.parseFloat(g.scrollMarginLeft) : Number.parseFloat(g.scrollMarginTop), x = getComputedStyle(this.rootElement), T = this.isHorizontal ? Number.parseFloat(x.scrollPaddingLeft) : Number.parseFloat(x.scrollPaddingTop);
        d = (this.isHorizontal ? m.left : m.top) + this.animatedScroll - (Number.isNaN(y) ? 0 : y) - (Number.isNaN(T) ? 0 : T);
      }
    }
    if (typeof d == "number") {
      if (d += p, this.options.infinite) {
        if (s) {
          this.targetScroll = this.animatedScroll = this.scroll;
          const f = d - this.animatedScroll;
          f > this.limit / 2 ? d -= this.limit : f < -this.limit / 2 && (d += this.limit);
        }
      } else d = Oi(0, d, this.limit);
      if (d === this.targetScroll) {
        l == null || l(this), u == null || u(this);
        return;
      }
      if (this.userData = h ?? {}, n) {
        this.animatedScroll = this.targetScroll = d, this.setScroll(this.scroll), this.reset(), this.preventNextNativeScrollEvent(), this.emit(), u == null || u(this), this.userData = {}, requestAnimationFrame(() => {
          this.dispatchScrollendEvent();
        });
        return;
      }
      s || (this.targetScroll = d), typeof o == "number" && typeof a != "function" ? a = Sn : typeof a == "function" && typeof o != "number" && (o = 1), this.animate.fromTo(this.animatedScroll, d, {
        duration: o,
        easing: a,
        lerp: r,
        onStart: () => {
          i && (this.isLocked = !0), this.isScrolling = "smooth", l == null || l(this);
        },
        onUpdate: (f, m) => {
          this.isScrolling = "smooth", this.lastVelocity = this.velocity, this.velocity = f - this.animatedScroll, this.direction = Math.sign(this.velocity), this.animatedScroll = f, this.setScroll(this.scroll), s && (this.targetScroll = f), m || this.emit(), m && (this.reset(), this.emit(), u == null || u(this), this.userData = {}, requestAnimationFrame(() => {
            this.dispatchScrollendEvent();
          }), this.preventNextNativeScrollEvent());
        }
      });
    }
  }
  preventNextNativeScrollEvent() {
    this._preventNextNativeScrollEvent = !0, requestAnimationFrame(() => {
      this._preventNextNativeScrollEvent = !1;
    });
  }
  hasNestedScroll(e, { deltaX: t, deltaY: n }) {
    const i = Date.now();
    e._lenis || (e._lenis = {});
    const s = e._lenis;
    let r, o, a, l, u, c, h, d, p, f;
    if (i - (s.time ?? 0) > 2e3) {
      s.time = Date.now();
      const V = window.getComputedStyle(e);
      if (s.computedStyle = V, r = [
        "auto",
        "overlay",
        "scroll"
      ].includes(V.overflowX), o = [
        "auto",
        "overlay",
        "scroll"
      ].includes(V.overflowY), u = ["auto"].includes(V.overscrollBehaviorX), c = ["auto"].includes(V.overscrollBehaviorY), s.hasOverflowX = r, s.hasOverflowY = o, !(r || o)) return !1;
      h = e.scrollWidth, d = e.scrollHeight, p = e.clientWidth, f = e.clientHeight, a = h > p, l = d > f, s.isScrollableX = a, s.isScrollableY = l, s.scrollWidth = h, s.scrollHeight = d, s.clientWidth = p, s.clientHeight = f, s.hasOverscrollBehaviorX = u, s.hasOverscrollBehaviorY = c;
    } else
      a = s.isScrollableX, l = s.isScrollableY, r = s.hasOverflowX, o = s.hasOverflowY, h = s.scrollWidth, d = s.scrollHeight, p = s.clientWidth, f = s.clientHeight, u = s.hasOverscrollBehaviorX, c = s.hasOverscrollBehaviorY;
    if (!(r && a || o && l)) return !1;
    const m = Math.abs(t) >= Math.abs(n) ? "horizontal" : "vertical";
    let g, y, x, T, S, M;
    if (m === "horizontal")
      g = Math.round(e.scrollLeft), y = h - p, x = t, T = r, S = a, M = u;
    else if (m === "vertical")
      g = Math.round(e.scrollTop), y = d - f, x = n, T = o, S = l, M = c;
    else return !1;
    return !M && (g >= y || g <= 0) ? !0 : (x > 0 ? g < y : g > 0) && T && S;
  }
  /**
  * The root element on which lenis is instanced
  */
  get rootElement() {
    return this.options.wrapper === window ? document.documentElement : this.options.wrapper;
  }
  /**
  * The limit which is the maximum scroll value
  */
  get limit() {
    return this.options.naiveDimensions ? this.isHorizontal ? this.rootElement.scrollWidth - this.rootElement.clientWidth : this.rootElement.scrollHeight - this.rootElement.clientHeight : this.dimensions.limit[this.isHorizontal ? "x" : "y"];
  }
  /**
  * Whether or not the scroll is horizontal
  */
  get isHorizontal() {
    return this.options.orientation === "horizontal";
  }
  /**
  * The actual scroll value
  */
  get actualScroll() {
    const e = this.options.wrapper;
    return this.isHorizontal ? e.scrollX ?? e.scrollLeft : e.scrollY ?? e.scrollTop;
  }
  /**
  * The current scroll value
  */
  get scroll() {
    return this.options.infinite ? Zo(this.animatedScroll, this.limit) : this.animatedScroll;
  }
  /**
  * The progress of the scroll relative to the limit
  */
  get progress() {
    return this.limit === 0 ? 1 : this.scroll / this.limit;
  }
  /**
  * Current scroll state
  */
  get isScrolling() {
    return this._isScrolling;
  }
  set isScrolling(e) {
    this._isScrolling !== e && (this._isScrolling = e, this.updateClassName());
  }
  /**
  * Check if lenis is stopped
  */
  get isStopped() {
    return this._isStopped;
  }
  set isStopped(e) {
    this._isStopped !== e && (this._isStopped = e, this.updateClassName());
  }
  /**
  * Check if lenis is locked
  */
  get isLocked() {
    return this._isLocked;
  }
  set isLocked(e) {
    this._isLocked !== e && (this._isLocked = e, this.updateClassName());
  }
  /**
  * Check if lenis is smooth scrolling
  */
  get isSmooth() {
    return this.isScrolling === "smooth";
  }
  /**
  * Whether the user prefers reduced motion and lenis is honoring it (see `respectReducedMotion` option)
  */
  get prefersReducedMotion() {
    return this.options.respectReducedMotion && this.reducedMotionMediaQuery.matches;
  }
  /**
  * The class name applied to the wrapper element
  */
  get className() {
    let e = "lenis";
    return this.options.autoToggle && (e += " lenis-autoToggle"), this.isStopped && (e += " lenis-stopped"), this.isLocked && (e += " lenis-locked"), this.isScrolling && (e += " lenis-scrolling"), this.isScrolling === "smooth" && (e += " lenis-smooth"), e;
  }
  updateClassName() {
    this.cleanUpClassName(), this.className.split(" ").forEach((e) => {
      this.rootElement.classList.add(e);
    });
  }
  cleanUpClassName() {
    for (const e of Array.from(this.rootElement.classList)) (e === "lenis" || e.startsWith("lenis-")) && this.rootElement.classList.remove(e);
  }
};
const Tt = /* @__PURE__ */ new Set();
let Vt = 0;
function sa() {
  Vt = 0;
  const e = matchMedia("(prefers-reduced-motion: reduce)").matches;
  Tt.forEach((t) => {
    if (!t.visible) return;
    const n = t.element.getBoundingClientRect();
    t.update(e ? 1 : Math.max(0, Math.min(1, (innerHeight - n.top) / (innerHeight + n.height))));
  });
}
function J() {
  Vt || (Vt = requestAnimationFrame(sa));
}
function ra(e, t) {
  const n = { element: e, update: t, visible: !0 };
  Tt.size || (document.addEventListener("scroll", J, { passive: !0, capture: !0 }), addEventListener("resize", J)), Tt.add(n);
  const i = new IntersectionObserver((s) => {
    n.visible = s[0].isIntersecting, J();
  }, { rootMargin: "100px" });
  return i.observe(e), J(), () => {
    i.disconnect(), Tt.delete(n), Tt.size || (document.removeEventListener("scroll", J, !0), removeEventListener("resize", J), cancelAnimationFrame(Vt), Vt = 0);
  };
}
function Ut() {
  J();
}
function Aa(e) {
  for (let t = e.parentElement; t; t = t.parentElement) {
    if (/(auto|scroll)/.test(getComputedStyle(t).overflowY) && t.scrollHeight > t.clientHeight + 1) return t.scrollTop;
    if (t === document.body) break;
  }
  return scrollY;
}
function Ea(e, t, n, i) {
  const s = it(e);
  let r = e;
  const o = s.on("change", t);
  return t(e), { set(a) {
    Math.abs(a - r) < 1e-5 || (r = a, matchMedia("(prefers-reduced-motion: reduce)").matches ? s.jump(a) : ke(s, a, { type: "spring", stiffness: n, damping: i, mass: 1, restDelta: 1e-3 }));
  }, destroy() {
    o(), s.destroy();
  } };
}
function Va(e) {
  const t = e.textContent || "";
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {
  };
  const n = /[\u0600-\u06ff]/.test(t) ? "ابتثجحخدذرزسشصضطظعغفقكلمنهوي" : "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?~", i = document.createElement("span"), s = document.createElement("span");
  s.style.opacity = "0";
  const r = ke(0, 1, { delay: 1, duration: (t.length + 10) * 0.032, ease: "linear", onUpdate: (o) => {
    const a = Math.min(t.length, Math.floor(o * (t.length + 10))), l = Math.max(0, a - 10);
    i.textContent = Array.from(t.slice(l, a)).map((u, c) => n[(Math.floor(o * 997) + c * 17) % n.length]).join(""), s.textContent = t.slice(a), e.replaceChildren(document.createTextNode(t.slice(0, l)), i, s);
  }, onComplete: () => {
    e.textContent = t;
  } });
  return () => {
    r.stop(), e.textContent = t;
  };
}
function oa(e) {
  const t = e.host;
  if (!t) return () => {
  };
  const n = matchMedia("(prefers-reduced-motion: reduce)");
  if (n.matches) return () => {
  };
  const s = ({
    hero: [{ selector: ".bottom", y: 20, delay: 1 }],
    highlights: [{ selector: ".eyebrow", y: 20 }, { selector: "h2", y: 20, delay: 0.2 }, { selector: ".heading .mono", y: 20, delay: 0.4 }, { selector: ".card:nth-child(1)", y: 60, delay: 0.4, duration: 1.4 }, { selector: ".card:nth-child(2)", y: 60, delay: 0.5, duration: 1.4 }, { selector: ".card:nth-child(3)", y: 60, delay: 0.7, duration: 1.4 }, { selector: ".caption", y: 110 }],
    features: [{ selector: ".feature", opacity: 0.5, duration: 0.7, repeat: !0 }],
    video: [{ selector: ".caption", delay: 0.6, repeat: !0 }],
    testimonials: [{ selector: ".eyebrow", y: 20 }, { selector: "h2", y: 20, delay: 0.1 }, { selector: ".viewport:nth-child(1)", duration: 0.8, threshold: 1 }, { selector: ".viewport:nth-child(2)", delay: 0.2, duration: 0.8, threshold: 1 }, { selector: ".caption", y: 20, delay: 0.4 }],
    "buy-now": [{ selector: ".info h2", y: 20 }]
  }[t.dataset.section || ""] || []).flatMap((a) => Array.from(e.querySelectorAll(a.selector)).map((l) => ({ entry: a, element: l, played: !1, active: !1, animation: void 0 })));
  s.forEach(({ entry: a, element: l }) => {
    l.style.opacity = String(a.opacity ?? 0), a.y && (l.style.translate = "0 " + a.y + "px");
  });
  const r = ra(t, () => {
    s.forEach((a) => {
      var d;
      const { entry: l, element: u } = a, h = (t.dataset.section === "features" ? u : t).getBoundingClientRect().top <= innerHeight * (l.threshold ?? 0.5) + 1;
      h === a.active || !l.repeat && a.played || (a.active = h, h && (a.played = !0), (d = a.animation) == null || d.stop(), a.animation = ke(h ? 0 : 1, h ? 1 : 0, { type: t.dataset.section === "features" ? "keyframes" : "spring", bounce: 0.2, duration: l.duration ?? 1.2, delay: h ? l.delay ?? 0 : 0, ease: [0.92, 0.03, 0.56, 1], onUpdate: (p) => {
        u.style.opacity = String((l.opacity ?? 0) + (1 - (l.opacity ?? 0)) * p), l.y && (u.style.translate = "0 " + l.y * (1 - p) + "px");
      } }));
    });
  }), o = () => {
    r(), s.forEach(({ element: a, animation: l }) => {
      l == null || l.stop(), a.style.removeProperty("opacity"), a.style.removeProperty("translate");
    });
  };
  return n.addEventListener("change", o), () => {
    o(), n.removeEventListener("change", o);
  };
}
function Ca(e, t = !0) {
  const n = new IntersectionObserver((i) => {
    i[0].isIntersecting && t && !matchMedia("(prefers-reduced-motion: reduce)").matches ? e.play().catch(() => {
    }) : e.pause();
  });
  return n.observe(e), () => {
    n.disconnect(), e.pause();
  };
}
const lt = /* @__PURE__ */ new Map();
function De(e) {
  for (let t = e.parentElement; t; t = t.parentElement) {
    if (/(auto|scroll)/.test(getComputedStyle(t).overflowY) && t.scrollHeight > t.clientHeight + 1) return t;
    if (t === document.body) break;
  }
  return window;
}
function aa(e) {
  const t = De(e), n = matchMedia("(prefers-reduced-motion: reduce)");
  let i = !1;
  const s = () => {
    if (n.matches || i) return;
    let a = lt.get(t);
    if (!a) {
      const l = t === window ? window.lenis : void 0, u = l != null && l.scrollTo && (l != null && l.on) ? l : new ia({
        wrapper: t,
        content: t === window ? document.documentElement : t.firstElementChild || t,
        autoRaf: !0,
        duration: 1,
        smoothWheel: !0,
        syncTouch: !1,
        anchors: !0,
        prevent: (c) => !!c.closest("dialog,[data-lenis-prevent],salla-product-options,salla-quantity-input")
      });
      if (a = { lenis: u, count: 0, owned: !l }, lt.set(t, a), u.on("scroll", Ut), !document.getElementById("tarwadah-lenis-css")) {
        const c = document.createElement("style");
        c.id = "tarwadah-lenis-css", c.textContent = "html.lenis,html.lenis body{height:auto}.lenis.lenis-smooth{scroll-behavior:auto!important}.lenis.lenis-stopped{overflow:clip}.lenis [data-lenis-prevent]{overscroll-behavior:contain}", document.head.append(c);
      }
    }
    a.count++, i = !0, e.dataset.smoothScroll = "lenis";
  }, r = () => {
    if (!i) return;
    i = !1, delete e.dataset.smoothScroll;
    const a = lt.get(t);
    --a.count === 0 && (a.lenis.off("scroll", Ut), a.owned && a.lenis.destroy(), lt.delete(t));
  }, o = () => {
    n.matches ? r() : s(), Ut();
  };
  return s(), n.addEventListener("change", o), () => {
    n.removeEventListener("change", o), r();
  };
}
function la(e) {
  const t = lt.get(De(e));
  t && !matchMedia("(prefers-reduced-motion: reduce)").matches ? t.lenis.scrollTo(e, { duration: 1 }) : e.scrollIntoView({ behavior: "instant" });
}
function Ra(e) {
  const t = De(e), n = lt.get(t), i = t === window ? document.documentElement : t, s = i.style.overflow, r = n == null ? void 0 : n.lenis.isStopped;
  n == null || n.lenis.stop(), i.style.overflow = "hidden";
  let o = !1;
  return () => {
    o || (o = !0, i.style.overflow = s, n && !r && n.lenis.start());
  };
}
const ca = {
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
  scroll_label: {
    ar: "[اكتشف المزيد]",
    en: "[Explore more]"
  },
  video: "https://e.top4top.io/m_3935jsezk1.mp4",
  poster: "/demo-uploads/7939f541-c8d7-4ca8-a3b2-e42a01ad4451.png",
  background: "#000000",
  foreground: "#ffffff",
  accent: "#c3a468"
}, ua = {
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
}, ha = {
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
}, da = {
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
}, fa = {
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
}, pa = {
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
}, ma = {
  eyebrow: {
    ar: "آراء العملاء",
    en: "Testimonials"
  },
  title: {
    ar: "اسمعها ممن ينصتون بعمق.",
    en: "Hear it from those who listen deeply."
  },
  caption: {
    ar: "/ صُنعت بدقة. تُشحن حول العالم.",
    en: "/ Precision built. Ships globally."
  },
  items: [
    {
      quote: {
        ar: "كأن العالم تعلّم أخيرًا كيف يهمس.",
        en: "It feels like the world finally learned to whisper."
      },
      author: {
        ar: "نواه باتيل",
        en: "Noah Patel"
      }
    },
    {
      quote: {
        ar: "كل نغمة تبدو شخصية، كأنها تعرف من يستمع.",
        en: "Every note sounds personal, like it knows who’s listening."
      },
      author: {
        ar: "أميرة كولينز",
        en: "Amira Collins"
      }
    },
    {
      quote: {
        ar: "توقفت عن تفقد البطارية. تبدو وكأنها لا تنفد.",
        en: "I stopped checking the battery. It just never seems to die."
      },
      author: {
        ar: "لوكاس ماير",
        en: "Lucas Meyer"
      }
    },
    {
      quote: {
        ar: "التحكم باللمس طبيعي، كأن السماعة تقرأ أفكارك.",
        en: "Touch feels natural — almost like the headphones read your mind."
      },
      author: {
        ar: "إيلينا روسي",
        en: "Elena Rossi"
      }
    },
    {
      quote: {
        ar: "إلغاء الضوضاء لطيف لدرجة أنك تنسى أنه يعمل.",
        en: "Noise cancellation so gentle, you forget it’s working."
      },
      author: {
        ar: "ديفيد كيم",
        en: "David Kim"
      }
    },
    {
      quote: {
        ar: "كل نغمة تبدو شخصية، كأنها تعرف من يستمع.",
        en: "Every note sounds personal, like it knows who’s listening."
      },
      author: {
        ar: "ديفيد كيم",
        en: "David Kim"
      }
    },
    {
      quote: {
        ar: "كل نغمة تبدو شخصية، كأنها تعرف من يستمع.",
        en: "Every note sounds personal, like it knows who’s listening."
      },
      author: {
        ar: "ديفيد كيم",
        en: "David Kim"
      }
    },
    {
      quote: {
        ar: "كل نغمة تبدو شخصية، كأنها تعرف من يستمع.",
        en: "Every note sounds personal, like it knows who’s listening."
      },
      author: {
        ar: "ديفيد كيم",
        en: "David Kim"
      }
    },
    {
      quote: {
        ar: "لا تدرك كم من الضجيج تحمله حتى يختفي.",
        en: "You don’t realize how much chaos you carry until it takes it away."
      },
      author: {
        ar: "نواه ألفاريز",
        en: "Noah Alvarez"
      }
    },
    {
      quote: {
        ar: "كل لمسة وكل وقفة، كأنها تفهم كيف أتحرك وأستمع.",
        en: "Every touch, every pause — like it understands how I move and listen."
      },
      author: {
        ar: "مارا ينسن",
        en: "Mara Jensen"
      }
    },
    {
      quote: {
        ar: "التصميم لا يطلب الانتباه، لكنه يملك اللحظة بهدوء.",
        en: "The design doesn’t ask for attention, but it quietly owns the moment."
      },
      author: {
        ar: "دانيال كروغر",
        en: "Daniel Krüger"
      }
    },
    {
      quote: {
        ar: "ليس أعلى، بل أوضح. ذكّرني لماذا أحب الموسيقى.",
        en: "Not louder. Just clearer. It reminded me why I love music."
      },
      author: {
        ar: "آيا ناكامورا",
        en: "Aya Nakamura"
      }
    },
    {
      quote: {
        ar: "هناك جمال في أن تتوارى السماعة وتترك الصوت وحده حاضرًا.",
        en: "There’s something beautiful about how it disappears and lets the sound exist."
      },
      author: {
        ar: "إيثان موراليس",
        en: "Ethan Morales"
      }
    },
    {
      quote: {
        ar: "لكل صوت مساحة ليتنفس، كأن العالم يتوقف من أجل الموسيقى.",
        en: "Every sound has space to breathe — it’s like the world pauses just for the music."
      },
      author: {
        ar: "لينا هوفمان",
        en: "Lena Hoffmann"
      }
    }
  ],
  background: "#000000",
  foreground: "#ffffff",
  accent: "#fc721b"
}, ga = {
  hero: ca,
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
  highlights: ua,
  sound: ha,
  gallery: da,
  features: fa,
  video: pa,
  testimonials: ma,
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
Cardamom, pink pepper, patchouli, amber, oud notes, tonka bean.Listed Notes
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
          ar: `أبعاد السماعة
إلغاء ضوضاء متكيف لحظيًا

العمق
حتى 42 ديسيبل`,
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
function Tn() {
  if (typeof window < "u" && window.customComponentsRaw) {
    const e = localStorage.getItem("salla_demo_lang");
    if (e === "ar" || e === "en") return e;
  }
  return document.documentElement.lang.toLowerCase().startsWith("ar") ? "ar" : "en";
}
function de(e, t) {
  return Array.isArray(e) ? e.map((n) => de(n, t)) : !e || typeof e != "object" ? e : "ar" in e && "en" in e ? e[t] ?? e.en ?? e.ar : Object.fromEntries(Object.entries(e).map(([n, i]) => [n, de(i, t)]));
}
const Ft = /* @__PURE__ */ new Set();
let Q;
function ya(e) {
  return Ft.add(e), Q || (Q = new MutationObserver(() => Ft.forEach((t) => t())), Q.observe(document.documentElement, { attributes: !0, attributeFilter: ["lang"] })), () => {
    Ft.delete(e), Ft.size || (Q == null || Q.disconnect(), Q = void 0);
  };
}
let Mn = 0, wt;
function ba() {
  if (!Mn++) {
    const t = document.createElement("div");
    t.className = "tarwadah-cursor", t.setAttribute("aria-hidden", "true"), Object.assign(t.style, { position: "fixed", top: "0", left: "0", width: "12px", height: "13px", borderRadius: "999px", background: "#fc721b", pointerEvents: "none", zIndex: "2147483647", opacity: "0", willChange: "transform" }), document.body.append(t);
    const n = matchMedia("(min-width:810px) and (hover:hover) and (pointer:fine)"), i = matchMedia("(prefers-reduced-motion:reduce)");
    let s = 0, r = 0, o = 0, a = 0, l = 0, u = !1;
    const c = () => {
      l = 0;
      const f = i.matches ? 1 : 0.35;
      s += (o - s) * f, r += (a - r) * f, t.style.transform = `translate(${s}px,${r}px) translateY(-50%)`, Math.abs(o - s) + Math.abs(a - r) > 0.05 && (l = requestAnimationFrame(c));
    }, h = (f) => {
      !n.matches || f.pointerType === "touch" || (o = f.clientX + 12, a = f.clientY + 16, u || (s = o, r = a, u = !0), t.style.opacity = "1", l || (l = requestAnimationFrame(c)));
    }, d = () => {
      u = !1, t.style.opacity = "0";
    }, p = () => {
      n.matches || d();
    };
    document.addEventListener("pointermove", h, { passive: !0 }), document.documentElement.addEventListener("pointerleave", d), window.addEventListener("blur", d), n.addEventListener("change", p), wt = () => {
      cancelAnimationFrame(l), t.remove(), document.removeEventListener("pointermove", h), document.documentElement.removeEventListener("pointerleave", d), window.removeEventListener("blur", d), n.removeEventListener("change", p);
    };
  }
  let e = !1;
  return () => {
    e || (e = !0, --Mn || (wt == null || wt(), wt = void 0));
  };
}
var va = Object.defineProperty, wa = (e, t, n, i) => {
  for (var s = void 0, r = e.length - 1, o; r >= 0; r--)
    (o = e[r]) && (s = o(t, n, s) || s);
  return s && va(t, n, s), s;
};
class Sa extends $e {
  constructor() {
    super(...arguments), this.config = {}, this.section = "hero", this.connection = 0;
  }
  get settings() {
    return de({ ...ga[this.section], ...this.config }, Tn());
  }
  get ui() {
    return Tn() === "ar" ? { decrease: "تقليل الكمية", increase: "زيادة الكمية", pause: "إيقاف حركة الآراء", resume: "استئناف حركة الآراء" } : { decrease: "Decrease quantity", increase: "Increase quantity", pause: "Pause testimonials", resume: "Resume testimonials" };
  }
  static registerSallaComponent(t) {
    const n = $e.registerSallaComponent;
    n ? n.call(this, t) : customElements.get(t) || customElements.define(t, this);
  }
  connectedCallback() {
    super.connectedCallback();
    const t = ++this.connection;
    if (this.dataset.section = this.section, this.stopCursor = ba(), this.updateDirection(), this.stopLanguage = ya(() => {
      this.requestUpdate(), this.updateComplete.then(() => {
        this.isConnected && this.restartMotion();
      });
    }), this.updateComplete.then(() => {
      this.isConnected && t === this.connection && (this.stopScroll = aa(this), this.restartMotion());
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
    var t;
    this.startMotion(), (t = this.stopReveal) == null || t.call(this), this.stopReveal = oa(this.renderRoot);
  }
  disconnectedCallback() {
    var t, n, i, s;
    this.connection++, (t = this.stopLanguage) == null || t.call(this), (n = this.stopCursor) == null || n.call(this), (i = this.stopScroll) == null || i.call(this), (s = this.stopReveal) == null || s.call(this), super.disconnectedCallback();
  }
  updated(t) {
    this.updateDirection(), t.has("config") && this.restartMotion();
    const n = this.settings;
    this.style.setProperty("--tw-bg", n.background || "#000000"), this.style.setProperty("--tw-ink", n.foreground || "#ffffff"), this.style.setProperty("--tw-accent", n.accent || "#fc721b");
  }
  updateDirection() {
    var i, s;
    const t = this.settings, n = [t.title, t.text, t.description, t.eyebrow, t.label, (s = (i = t.items) == null ? void 0 : i[0]) == null ? void 0 : s.title].filter(Boolean).join(" ");
    this.dir = /[\u0600-\u06ff]/.test(n) ? "rtl" : "ltr";
  }
  jump(t) {
    const n = t.replace(/^#/, ""), i = document.getElementById(n) || Array.from(document.querySelectorAll("[data-section]")).find((s) => s.dataset.section === n);
    i && la(i);
  }
}
wa([
  Bi({ type: Object })
], Sa.prototype, "config");
const ka = Ii`
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
  Sa as T,
  ke as a,
  Ra as b,
  Ea as c,
  Va as d,
  Aa as e,
  Ca as o,
  Ut as r,
  ka as s,
  ra as w
};
