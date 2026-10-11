import { css as l, html as s } from "lit";
import { T as p, s as c, c as h, w as d } from "./base-Bl3jPnIE.js";
import { r as f, t as g } from "./reference-motion-Z6GXbNVC.js";
const a = class a extends p {
  constructor() {
    super(...arguments), this.section = "testimonials", this.channels = [];
  }
  startMotion() {
    var e;
    (e = this.stop) == null || e.call(this), this.channels.forEach((t) => t.destroy()), this.channels = [], this.renderRoot.querySelectorAll(".track").forEach((t, i) => this.channels.push(h(0, (o) => t.style.transform = "translateX(" + f(o)[i] + "px)", 160, 60))), this.stop = d(this, () => {
      const t = this.getBoundingClientRect(), i = matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : g(t.top, t.height, innerHeight);
      this.channels.forEach((o) => o.set(i)), this.dataset.motionProgress = i.toFixed(3);
    });
  }
  disconnectedCallback() {
    var e;
    (e = this.stop) == null || e.call(this), this.channels.forEach((t) => t.destroy()), super.disconnectedCallback();
  }
  render() {
    const e = this.settings, t = Math.ceil(e.items.length * 4 / 7);
    return s`<section class="section" aria-label=${e.eyebrow}><header class="heading"><p class="eyebrow">${e.eyebrow}</p><h2>${e.title}</h2></header><div class="rows">${[e.items.slice(0, t), e.items.slice(t)].map((i, o) => s`<div class="viewport ${o ? "reverse" : ""}"><div class="track"><div style="display:flex;gap:24px">${i.map((r) => s`<figure class="quote"><svg class="quote-icon" aria-hidden="true" viewBox="0 0 20 14"><path d="M1.429 14H5.714L8.571 8.4V0H0V8.4H4.286ZM12.857 14H17.143L20 8.4V0H11.429V8.4H15.714Z" fill="currentColor"/></svg><blockquote>${r.quote}</blockquote><figcaption>— ${r.author}</figcaption></figure>`)}</div></div></div>`)}</div><p class="caption mono">${e.caption}</p></section>`;
  }
};
a.styles = [c, l`
    .section{position:relative;padding-block:180px 160px;overflow:hidden}.heading{max-width:516px;margin:auto;text-align:center}.eyebrow{font-family:'TW Instrument',serif;font-size:20px;line-height:24px;letter-spacing:-.02em;margin-bottom:4px;color:#bfbfbf}h2{font-size:48px;letter-spacing:-.06em;line-height:1;font-weight:500}.rows{margin-block:32px;position:relative;height:568px}.viewport{position:absolute;top:33px;inset-inline:0;height:240px;overflow:hidden;direction:ltr;mask-image:linear-gradient(to right,transparent,#000 6%,#000 94%,transparent)}.track{display:flex;width:max-content;gap:24px;will-change:transform}.viewport.reverse{top:297px;display:flex;justify-content:flex-end}.reverse .track{margin-right:-27px}.quote{width:409px;height:240px;border:1px solid #ffffff20;border-radius:2px;padding:40px;display:flex;flex-direction:column;background:#000}.quote-icon{display:block;width:20px;height:14px;flex:none;margin-bottom:28px;color:var(--tw-accent)}.quote blockquote{font-family:'TW Roboto Mono',monospace;font-size:18px;letter-spacing:-.02em;line-height:1.4;color:#bfbfbf}.quote figcaption{font-family:'TW Instrument',serif;font-size:20px;line-height:24px;letter-spacing:-.02em;color:#bfbfbf;margin-top:32px}.caption{text-align:end;padding-inline:56px;color:#bbb;font-family:'TW Roboto Mono',monospace;font-size:14px}
    @media(max-width:809px){.section{padding-block:180px 168px}.heading{padding-inline:20px;max-width:390px}h2{font-size:32px}.caption{padding-inline:20px}}
  `];
let n = a;
typeof n < "u" && n.registerSallaComponent("salla-tarwadah-testimonials");
export {
  n as default
};
