const l = (a) => Math.max(0, Math.min(1, a)), h = (a, e) => l(a / 710) * e, n = (a, e) => 1 - 0.2 * l(a / Math.max(1, Math.round(e) - 1)), o = (a, e, c, s = 1) => l((c * s - a + 1) / Math.max(1, Math.round(e))), x = (a, e = !1) => [e ? 97 : 95, 90, e ? 99 : 112].map((c) => a * (1 - c / 100)), t = [{ scale: 0.45, x: -186, y: 131 }, { scale: 1.65, x: 136, y: 167 }, { scale: 0.61, x: 85, y: 132 }], m = (a, e = 1440) => t.map((c) => ({ scale: e <= 809 ? 0.5 : e <= 1199 ? 0.7 : c.scale + (1 - c.scale) * a, x: c.x * (1 - a), y: c.y * (1 - a) })), r = (a) => [-910 * a, 919 * a];
export {
  n as a,
  x as b,
  m as g,
  h,
  r,
  o as t
};
