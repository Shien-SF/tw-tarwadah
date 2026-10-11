import { css as g, html as r } from "lit";
import { T as f, s as u, w as b, a as w } from "./base-Bl3jPnIE.js";
const n = class n extends f {
  constructor() {
    super(...arguments), this.section = "sound", this.colors = [];
  }
  startMotion() {
    var e;
    (e = this.stop) == null || e.call(this), this.colors.forEach((i) => i.stop()), this.colors = [];
    let t = -1;
    this.stop = b(this, () => {
      const i = this.renderRoot.querySelectorAll(".word"), c = matchMedia("(max-width:809px)").matches, l = this.getBoundingClientRect().top, p = c ? 47 : 362, s = matchMedia("(prefers-reduced-motion: reduce)").matches ? 6 : Math.max(0, Math.min(6, Math.floor((innerHeight - l - p) / 118) + 1));
      if (s === t) return;
      t = s;
      const h = i.length, d = [1, 6, 10, 12, 14, 21].map((o) => Math.round(o / 21 * h)), m = s ? d[s - 1] : 0;
      this.colors.forEach((o) => o.stop()), this.colors = Array.from(i).map((o, x) => w(o, { color: x < m ? "rgba(255,255,255,1)" : "rgba(255,255,255,.1)" }, { type: "spring", bounce: 0.2, duration: 1 })), this.dataset.motionStage = String(s);
    });
  }
  disconnectedCallback() {
    var t;
    (t = this.stop) == null || t.call(this), this.colors.forEach((e) => e.stop()), super.disconnectedCallback();
  }
  render() {
    const t = this.settings;
    return r`<section class="section wrap"><p class="eyebrow">${t.eyebrow}</p><h2 class="text" aria-label=${t.text}>${t.text.split(/(\s+)/).map((e) => /^\s+$/.test(e) ? e : r`<span class="word" aria-hidden="true">${e}</span>`)}</h2></section>`;
  }
};
n.styles = [u, g`
    .section{height:866px;padding-block:140px 166px;display:flex;flex-direction:column;align-items:center;text-align:center}.eyebrow{font-family:'TW Instrument',serif;font-size:20px;line-height:24px;letter-spacing:-.02em;margin:8px 0 42.8px;color:#bfbfbf}.text{max-width:662px;font-size:80px;font-weight:500;letter-spacing:-.05em;line-height:.925;white-space:pre-line}.word{color:rgba(255,255,255,.1)}.word.lit{color:var(--tw-ink)}
    @media(max-width:809px){.section{height:551px;padding-top:184px;padding-bottom:100px}.eyebrow{margin:0 0 0}.text{font-size:40px;line-height:.925;max-width:331px}}
  `];
let a = n;
typeof a < "u" && a.registerSallaComponent("salla-tarwadah-sound");
export {
  a as default
};
