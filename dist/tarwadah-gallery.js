import { T as m, s as g, c as x, w as f, l } from "./base-Dfz21CDO.js";
import { css as w, html as c } from "lit";
import { i as u } from "./lens-C5UaEzuk.js";
import { t as b, g as y } from "./reference-motion-Z6GXbNVC.js";
const r = class r extends m {
  constructor() {
    super(...arguments), this.section = "gallery", this.lenses = [], this.channels = [];
  }
  startMotion() {
    var t;
    (t = this.stop) == null || t.call(this), this.channels.forEach((e) => e.destroy()), this.channels = [], this.lenses.forEach((e) => e()), this.lenses = [], this.renderRoot.querySelectorAll(".image").forEach((e, s) => {
      this.lenses.push(u(e, e.querySelector("img"), [0.8, 0.5, 0.6][s])), this.channels.push(x(0, (o) => {
        const i = y(o, innerWidth)[s], n = matchMedia("(max-width:809px)").matches, d = !n && matchMedia("(max-width:1199px)").matches, p = i.scale;
        e.style.transform = (n && s === 0 || d && s === 1 ? "translateX(-50%) " : "") + "translate(" + i.x + "px," + i.y + "px) scale(" + p + ")";
      }, 165, 80));
    }), this.stop = f(this, () => {
      const e = matchMedia("(prefers-reduced-motion: reduce)").matches, s = this.getBoundingClientRect(), o = e ? 1 : b(s.top, s.height, innerHeight);
      this.channels.forEach((i) => i.set(o)), this.dataset.motionProgress = o.toFixed(3);
    });
  }
  disconnectedCallback() {
    var a;
    (a = this.stop) == null || a.call(this), this.channels.forEach((t) => t.destroy()), this.lenses.forEach((t) => t()), super.disconnectedCallback();
  }
  render() {
    const a = this.settings;
    return c`<section class="gallery" aria-label=${l(a.label)}><div class="images">${a.images.map((t) => c`<figure class="image"><img src=${t.image} alt=${l(t.alt)} loading="lazy"></figure>`)}</div></section>`;
  }
};
r.styles = [g, w`
    .gallery{position:relative;height:1245px;max-width:1440px;margin:auto;padding:0 0 130px;overflow:visible}.images{position:relative;height:1115px;width:calc(100% - 254px);max-width:1186px;margin:auto}.image{position:absolute;overflow:hidden;border:1px solid #7d7d7d;will-change:transform}.image:nth-child(1){width:48.314%;aspect-ratio:573/376.453;bottom:9px;left:0}.image:nth-child(2){width:29.595%;aspect-ratio:351/508.016;left:28.583%;top:70px}.image:nth-child(3){width:35.076%;aspect-ratio:416/616;right:0;bottom:37px}
    @media(min-width:810px) and (max-width:1199px){.images{width:calc(100% - 100px)}}
    @media(max-width:809px){.gallery{height:1143px;overflow:hidden;padding:0}.images{width:1186px;height:1143px;left:50%;margin:0;transform:translateX(-50%)}.image:nth-child(1){width:573px;aspect-ratio:573/376.453;bottom:-44px;left:557.406px}.image:nth-child(2){width:351px;aspect-ratio:351/508.016;left:339px;top:70px}.image:nth-child(3){width:416px;aspect-ratio:416/616;left:461px;right:auto;bottom:157px}}

  `];
let h = r;
typeof h < "u" && h.registerSallaComponent("salla-tarwadah-gallery");
export {
  h as default
};
