import { css as y, html as p } from "lit";
import { T as w, s as b, w as v, a as u } from "./base-Bl3jPnIE.js";
const l = class l extends w {
  constructor() {
    super(...arguments), this.section = "features", this.photoAnimations = [];
  }
  updated(t) {
    super.updated(t), this.style.setProperty("--feature-count", String(this.settings.items.length));
  }
  startMotion() {
    var e, r;
    (e = this.stop) == null || e.call(this), (r = this.widthAnimation) == null || r.stop(), this.photoAnimations.forEach((c) => c.stop()), this.photoAnimations = [];
    let t, i = -1;
    this.stop = v(this, () => {
      var m;
      const f = this.renderRoot.querySelector(".layout").getBoundingClientRect().top;
      this.style.setProperty("--intro-width", this.getBoundingClientRect().width + "px");
      const n = matchMedia("(max-width:1199px)").matches || f + 518 <= innerHeight, d = this.renderRoot.querySelector(".photos");
      if (n !== t) {
        const a = t === void 0;
        t = n, (m = this.widthAnimation) == null || m.stop(), a || matchMedia("(prefers-reduced-motion: reduce)").matches ? d.style.width = n ? "50%" : "100%" : this.widthAnimation = u(d, { width: n ? "50%" : "100%" }, { duration: 1.2, ease: [0.61, 0, 0.56, 1] });
      }
      let s = 0;
      if (this.renderRoot.querySelectorAll(".feature").forEach((a, o) => {
        a.getBoundingClientRect().top < innerHeight * 0.5 && (s = o + 1);
      }), s !== i) {
        this.photoAnimations.forEach((o) => o.stop());
        const a = i === -1;
        i = s, this.photoAnimations = [], this.renderRoot.querySelectorAll(".photos img").forEach((o, x) => {
          const g = x <= s ? "inset(0% 0 0)" : "inset(100% 0 0)";
          a || matchMedia("(prefers-reduced-motion: reduce)").matches ? o.style.clipPath = g : this.photoAnimations.push(u(o, { clipPath: g }, { duration: 1, ease: [0.44, 0, 0.56, 1] }));
        });
      }
      this.dataset.activeImage = String(s);
    });
  }
  disconnectedCallback() {
    var t, i;
    (t = this.stop) == null || t.call(this), (i = this.widthAnimation) == null || i.stop(), this.photoAnimations.forEach((e) => e.stop()), super.disconnectedCallback();
  }
  render() {
    const t = this.settings;
    return p`<section class="section" aria-label=${t.label}><figure class="intro"><img src=${t.intro_image} alt=${t.label} loading="lazy"></figure><div class="layout"><div class="photos" aria-hidden="true"><img class="active" src=${t.intro_image} alt="" loading="lazy">${t.items.map((i) => p`<img src=${i.image} alt="" loading="lazy">`)}</div><div class="texts">${t.items.map((i, e) => p`<article class="feature" data-index=${e}><p class="number mono">[${e + 1}]</p><h2>/ ${i.title}</h2><p class="description mono">${i.description}</p><img class="mobile-image" src=${i.image} alt=${i.title} loading="lazy"></article>`)}</div></div></section>`;
  }
};
l.styles = [b, y`
    .section{padding-top:130px}.layout{position:relative;height:calc(1327px + var(--feature-count,5)*620px - 132px)}.texts{position:absolute;inset-inline-start:61.32%;top:1327px;width:38.68%;z-index:1}.feature{height:620px;display:flex;flex-direction:column;padding-top:0px}.number{margin-bottom:16px;color:var(--tw-accent);font-family:'TW Roboto Mono',monospace;font-size:18px;line-height:1.4}h2{font-family:'TW Instrument',serif;font-size:44px;font-weight:400;letter-spacing:-.04em;line-height:1.1;max-width:301px}.description{font-family:'TW Roboto Mono',monospace;font-size:16px;line-height:1.2;letter-spacing:-.02em;max-width:301px;margin-top:16px;color:#bfbfbf}.photos{height:100svh;position:sticky;top:0;width:var(--photo-width,100%);overflow:hidden}.photos img{position:absolute;inset:-12px 0 auto;height:calc(100% + 24px);object-fit:cover;opacity:1;clip-path:inset(100% 0 0)}.photos img:first-child{clip-path:inset(0% 0 0);width:var(--intro-width,100%);max-width:none}.photos img:nth-child(3){top:-16px;height:calc(100% + 32px)}.photos img:nth-child(4){top:-17.5px;height:calc(100% + 35px)}.photos img:nth-child(5){top:-15.5px;height:calc(100% + 31px)}.intro,.mobile-image{display:none}
    @media(max-width:809px){.section{padding-block:150px 100px;height:auto}.intro,.photos,.mobile-image{display:none}.layout{height:auto;padding-inline:20px}.texts{position:static;width:100%}.feature{min-height:419.625px;padding-top:0}.feature:last-child{height:auto;min-height:0}h2{font-size:44px}.description{max-width:301px;font-size:16px}.number{margin-bottom:16px}}
  `];
let h = l;
typeof h < "u" && h.registerSallaComponent("salla-tarwadah-features");
export {
  h as default
};
