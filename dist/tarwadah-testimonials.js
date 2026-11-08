import { T as l, s as c, c as d, w as h, l as o } from "./base-1e_lyEgl.js";
import { css as g, html as s } from "lit";
import { r as m, t as f } from "./reference-motion-Z6GXbNVC.js";
const r = class r extends l {
  constructor() {
    super(...arguments), this.section = "testimonials", this.channels = [];
  }
  startMotion() {
    var e;
    (e = this.stop) == null || e.call(this), this.channels.forEach((t) => t.destroy()), this.channels = [], this.renderRoot.querySelectorAll(".track").forEach((t, i) => this.channels.push(d(0, (n) => t.style.transform = "translateX(" + m(n)[i] + "px)", 160, 60))), this.stop = h(this, () => {
      const t = this.getBoundingClientRect(), i = matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : f(t.top, t.height, innerHeight);
      this.channels.forEach((n) => n.set(i)), this.dataset.motionProgress = i.toFixed(3);
    });
  }
  disconnectedCallback() {
    var e;
    (e = this.stop) == null || e.call(this), this.channels.forEach((t) => t.destroy()), super.disconnectedCallback();
  }
  render() {
    const e = this.settings, t = Math.ceil(e.items.length * 4 / 7);
    return s`<section class="section" aria-label=${o(e.eyebrow)}><header class="heading"><p class="eyebrow">${o(e.eyebrow)}</p><h2>${o(e.title)}</h2></header><div class="rows">${[e.items.slice(0, t), e.items.slice(t)].map((i, n) => s`<div class="viewport ${n ? "reverse" : ""}"><div class="track"><div style="display:flex;gap:24px">${i.map((p) => s`<figure class="quote"><svg class="quote-icon" aria-hidden="true" viewBox="0 0 20 14"><path d="M1.429 14H5.714L8.571 8.4V0H0V8.4H4.286ZM12.857 14H17.143L20 8.4V0H11.429V8.4H15.714Z" fill="currentColor"/></svg><blockquote>${o(p.quote)}</blockquote><figcaption>— ${o(p.author)}</figcaption></figure>`)}</div></div></div>`)}</div><p class="caption mono">${o(e.caption)}</p></section>`;
  }
};
r.styles = [c, g`
    .section{position:relative;padding-block:180px 160px;overflow:hidden}.heading{max-width:516px;margin:auto;text-align:center}.eyebrow{font-family:'TW Instrument',serif;font-size:20px;line-height:24px;letter-spacing:-.02em;margin-bottom:4px;color:#bfbfbf}h2{font-size:48px;letter-spacing:-.06em;line-height:1;font-weight:500}.rows{margin-block:32px;position:relative;height:568px}.viewport{position:absolute;top:33px;inset-inline:0;height:240px;overflow:hidden;direction:ltr;mask-image:linear-gradient(to right,transparent,#000 6%,#000 94%,transparent)}.track{display:flex;width:max-content;gap:24px;will-change:transform}.viewport.reverse{top:297px;display:flex;justify-content:flex-end}.reverse .track{margin-right:-27px}.quote{width:409px;height:240px;border:1px solid #ffffff20;border-radius:2px;padding:40px;display:flex;flex-direction:column;background:#000}.quote-icon{display:block;width:20px;height:14px;flex:none;margin-bottom:28px;color:var(--tw-accent)}.quote blockquote{font-family:'TW Roboto Mono',monospace;font-size:18px;letter-spacing:-.02em;line-height:1.4;color:#bfbfbf}.quote figcaption{font-family:'TW Instrument',serif;font-size:20px;line-height:24px;letter-spacing:-.02em;color:#bfbfbf;margin-top:32px}.caption{text-align:end;padding-inline:56px;color:#bbb;font-family:'TW Roboto Mono',monospace;font-size:14px}
    @media(max-width:809px){.section{padding-block:180px 168px}.heading{padding-inline:20px;max-width:390px}h2{font-size:32px}.caption{padding-inline:20px}}
    @media(prefers-reduced-motion:reduce){
      .section{padding-block:64px}.rows{height:auto;padding-inline:20px;max-width:1200px;margin-inline:auto;display:grid;gap:24px}
      .viewport,.viewport.reverse{position:static;display:block;height:auto;overflow:visible;mask-image:none}
      .track,.reverse .track{width:100%;margin:0;transform:none!important}
      .track>div{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))}
      .quote{width:100%;height:auto;min-height:220px}.quote blockquote{overflow-wrap:anywhere}
    }
    @media(prefers-reduced-motion:reduce) and (max-width:809px){.track>div{grid-template-columns:1fr}.quote{padding:28px}}
  `];
let a = r;
typeof a < "u" && a.registerSallaComponent("salla-tarwadah-testimonials");
export {
  a as default
};
