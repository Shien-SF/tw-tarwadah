import { s as l, w as c, l as a } from "./base-Dfz21CDO.js";
import { css as d, html as s } from "lit";
import { T as f } from "./product-Bdh5p2nb.js";
const r = class r extends f {
  constructor() {
    super(...arguments), this.section = "product-strip";
  }
  startMotion() {
    var t;
    (t = this.stop) == null || t.call(this), this.stop = c(document.body, () => {
      const o = document.querySelector('[data-section="hero"]'), i = document.querySelector('[data-section="buy-now"]'), e = !o || o.getBoundingClientRect().top < -Math.min(800, innerHeight * 0.8) && (!i || i.getBoundingClientRect().top > innerHeight * 0.65);
      this.classList.toggle("floating", !!o), this.classList.toggle("visible", e), this.inert = !e, this.setAttribute("aria-hidden", String(!e));
    });
  }
  disconnectedCallback() {
    var t;
    (t = this.stop) == null || t.call(this), super.disconnectedCallback();
  }
  render() {
    var e;
    const t = this.settings, o = this.productData, i = this.productId ? (e = o == null ? void 0 : o.image) == null ? void 0 : e.url : t.image;
    return s`<aside class="section" aria-label=${this.productName}><div class="bar">${i ? s`<img class="image" src=${i} alt=${this.productName} loading="lazy">` : ""}<div><h2>${this.productName}</h2>${this.productId ? "" : s`<p class="mono colors">${a(t.colors)}</p>`}</div><div class="price"><p class="mono">${this.formattedPrice}</p><a class="mono details" href="#${t.target}" @click=${(p) => {
      p.preventDefault(), this.jump(t.target);
    }}>${a(t.detail_label)}</a></div><button class="button" aria-label=${a(t.cta_label)} @click=${() => this.jump(t.target)}><span>${a(t.cta_label)}</span><svg class="down-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 4v16m-6-6 6 6 6-6"/></svg></button></div></aside>`;
  }
};
r.styles = [l, d`
    :host{position:relative;z-index:20}:host(.floating){position:fixed;bottom:20px;left:50%;transform:translateX(-50%);width:min(743px,calc(100% - 40px));background:transparent;opacity:0;pointer-events:none;transition:opacity .25s}:host(.floating.visible){opacity:1;pointer-events:auto}.bar{max-width:743px;margin:0 auto;display:flex;align-items:center;gap:24px;background:#101010e6;backdrop-filter:blur(20px);border:1px solid #ffffff0a;border-radius:4px;padding:18px 28px 18px 20px}.image{width:48px;height:48px;border:1px solid #ffffff18}h2{font-family:'TW Instrument',serif;font-size:20px;font-weight:400;line-height:24px;letter-spacing:-.02em;margin-bottom:2px;white-space:nowrap}.colors{color:var(--tw-accent);font-family:'TW Roboto Mono',monospace;font-size:14px;line-height:19px;white-space:nowrap}.price{margin-inline-start:auto;text-align:end}.price p{font-family:'TW Roboto Mono',monospace;font-size:16px;color:#7d7d7d;line-height:19px;margin-bottom:2px}.details{font-family:'TW Roboto Mono',monospace;font-size:16px;text-decoration:underline;text-underline-offset:3px;color:#bfbfbf;white-space:nowrap}.button{background:#252525;color:#bfbfbf;font-family:'TW Roboto Mono',monospace;padding:12px 28px;font-size:16px;border:1px solid #ffffff0a;border-radius:4px;white-space:nowrap}.down-arrow{display:none}.section{padding:0}
    @media(max-width:809px){:host(.floating){width:calc(100% - 40px);bottom:calc(16px + env(safe-area-inset-bottom,0px))}.bar{gap:12px;padding:12px 20px;height:77px}.image{width:45px;height:48px}h2{font-size:20px}.colors{font-size:14px}.price{display:none}.button,.button:hover{margin-inline-start:auto;font-size:0;padding:0;width:36px;height:36px;flex:0 0 36px;background:transparent;color:#bfbfbf;border:0;display:grid;place-items:center}.button span{display:none}.button .down-arrow{display:block;width:22px;height:22px;flex:none}.section{padding:0}}
  `];
let n = r;
typeof n < "u" && n.registerSallaComponent("salla-tarwadah-product-strip");
export {
  n as default
};
