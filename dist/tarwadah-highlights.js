import { T as c, s as l, w as h, e as d, l as e } from "./base-Dfz21CDO.js";
import { css as x, html as s } from "lit";
import { i as m } from "./lens-C5UaEzuk.js";
import { b as f } from "./reference-motion-Z6GXbNVC.js";
const o = class o extends c {
  constructor() {
    super(...arguments), this.section = "highlights", this.cleanup = [];
  }
  startMotion() {
    this.cleanup.forEach((t) => t()), this.cleanup = [], this.renderRoot.querySelectorAll(".card").forEach((t) => this.cleanup.push(m(t, t.querySelector("img")))), this.cleanup.push(h(this, () => {
      const t = matchMedia("(prefers-reduced-motion: reduce)").matches, i = d(this), a = f(i, matchMedia("(max-width:809px)").matches);
      this.renderRoot.querySelector(".caption").style.transform = "translateY(" + (t ? 0 : -i * 0.07) + "px)", this.renderRoot.querySelectorAll(".card").forEach((r, p) => r.style.setProperty("--offset", (t ? 0 : a[p]) + "px"));
    }));
  }
  disconnectedCallback() {
    this.cleanup.forEach((t) => t()), super.disconnectedCallback();
  }
  render() {
    const t = this.settings;
    return s`<section class="section wrap" aria-label=${e(t.eyebrow)}><header class="heading"><p class="eyebrow">${e(t.eyebrow)}</p><h2>${e(t.title)}</h2><p class="mono">${e(t.description)}</p></header><div class="cards">${t.items.map((i) => s`<figure class="card"><img src=${i.image} alt=${e(i.title)} loading="lazy"><p>${e(i.title)}</p></figure>`)}<p class="caption mono">${e(t.caption)}</p></div></section>`;
  }
};
o.styles = [l, x`
    .section{height:907px;padding-top:130px;position:relative}.heading{text-align:center;max-width:264px;margin:auto}.eyebrow{font-family:'TW Instrument',serif;font-size:20px;line-height:24px;letter-spacing:-.02em;margin-bottom:4px;color:#bfbfbf}h2{font-size:36px;font-weight:500;letter-spacing:-.06em;line-height:1}.heading .mono{font-family:'TW Roboto Mono',monospace;font-size:16px;line-height:1.2;letter-spacing:-.02em;margin-top:24px;color:#bfbfbf}.cards{position:absolute;inset:0;max-width:1040px;margin:auto;pointer-events:none}.card{position:absolute;width:254px;height:362px;overflow:hidden;background:#080808;pointer-events:auto;transform:translateY(var(--offset,0px))}.card p{position:absolute;z-index:2;bottom:16px;inset-inline:16px;font-size:20px;font-weight:500;line-height:1.2;letter-spacing:-.06em;text-shadow:0 2px 8px #000}.card:nth-child(1){inset-inline-start:0;top:221.89px}.card:nth-child(2){inset-inline-start:calc(50% - 127px);top:295.23px}.card:nth-child(3){inset-inline-end:0;top:400.14px}.caption{position:absolute;inset-inline-end:46px;top:773.203px;color:#bfbfbf;font-family:'TW Roboto Mono',monospace;font-size:14px;letter-spacing:-.02em}
    @media(min-width:810px) and (max-width:1199px){.cards{max-width:calc(100% - 100px)}.card{width:220px;height:314px}.card:nth-child(2){inset-inline-start:calc(50% - 110px)}h2{font-size:28px}}
    @media(max-width:809px){.section{height:1187px;padding-top:130px;overflow:hidden}.heading{max-width:264px}h2{font-size:28px}.cards{max-width:390px}.card:nth-child(1){inset-inline-start:-41px;top:571px}.card:nth-child(2){inset-inline-start:calc(50% - 127px);top:140.984px}.card:nth-child(3){inset-inline-end:-41px;top:694px}.caption{inset-inline-end:20px;top:1053.203px}.card p{font-size:19px}}
    @media(max-width:809px){:host([dir="rtl"]) .section{height:1242px}:host([dir="rtl"]) .card:nth-child(1){top:626px}:host([dir="rtl"]) .card:nth-child(2){top:195.984px}:host([dir="rtl"]) .card:nth-child(3){top:749px}:host([dir="rtl"]) .caption{top:1108.203px}}
  `];
let n = o;
typeof n < "u" && n.registerSallaComponent("salla-tarwadah-highlights");
export {
  n as default
};
