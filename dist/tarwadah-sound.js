import { T as f, s as u, w, a as b, l as a } from "./base-1e_lyEgl.js";
import { css as y, html as c } from "lit";
const n = class n extends f {
  constructor() {
    super(...arguments), this.section = "sound", this.colors = [];
  }
  startMotion() {
    var e;
    (e = this.stop) == null || e.call(this), this.colors.forEach((o) => o.stop()), this.colors = [];
    let t = -1;
    this.stop = w(this, () => {
      const o = this.renderRoot.querySelectorAll(".word"), l = matchMedia("(max-width:809px)").matches, h = this.getBoundingClientRect().top, p = l ? 47 : 362, i = matchMedia("(prefers-reduced-motion: reduce)").matches ? 6 : Math.max(0, Math.min(6, Math.floor((innerHeight - h - p) / 118) + 1));
      if (i === t) return;
      t = i;
      const d = o.length, m = [1, 6, 10, 12, 14, 21].map((s) => Math.round(s / 21 * d)), x = i ? m[i - 1] : 0;
      if (this.colors.forEach((s) => s.stop()), matchMedia("(prefers-reduced-motion: reduce)").matches) {
        o.forEach((s) => s.style.color = "var(--tw-ink)");
        return;
      }
      this.colors = Array.from(o).map((s, g) => b(s, { color: g < x ? "rgba(255,255,255,1)" : "rgba(255,255,255,.1)" }, { type: "spring", bounce: 0.2, duration: 1 })), this.dataset.motionStage = String(i);
    });
  }
  disconnectedCallback() {
    var t;
    (t = this.stop) == null || t.call(this), this.colors.forEach((e) => e.stop()), super.disconnectedCallback();
  }
  render() {
    const t = this.settings;
    return c`<section class="section wrap"><p class="eyebrow">${a(t.eyebrow)}</p><h2 class="text" aria-label=${a(t.text)}>${a(t.text).split(/(\s+)/).map((e) => /^\s+$/.test(e) ? e : c`<span class="word" aria-hidden="true">${e}</span>`)}</h2></section>`;
  }
};
n.styles = [u, y`
    .section{height:866px;padding-block:140px 166px;display:flex;flex-direction:column;align-items:center;text-align:center}.eyebrow{font-family:'TW Instrument',serif;font-size:20px;line-height:24px;letter-spacing:-.02em;margin:8px 0 42.8px;color:#bfbfbf}.text{max-width:662px;font-size:80px;font-weight:500;letter-spacing:-.05em;line-height:.925;white-space:pre-line}.word{color:rgba(255,255,255,.1)}.word.lit{color:var(--tw-ink)}
    @media(max-width:809px){.section{height:551px;padding-top:184px;padding-bottom:100px}.eyebrow{margin:0 0 0}.text{font-size:40px;line-height:.925;max-width:331px}}
  `];
let r = n;
typeof r < "u" && r.registerSallaComponent("salla-tarwadah-sound");
export {
  r as default
};
