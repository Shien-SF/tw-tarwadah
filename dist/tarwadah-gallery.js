import { T as m, s as g, c as x, w as f, l } from "./base-1e_lyEgl.js";
import { css as w, html as c } from "lit";
import { i as u } from "./lens-C5UaEzuk.js";
import { t as b, g as y } from "./reference-motion-Z6GXbNVC.js";
const h = class h extends m {
  constructor() {
    super(...arguments), this.section = "gallery", this.lenses = [], this.channels = [];
  }
  startMotion() {
    var t;
    (t = this.stop) == null || t.call(this), this.channels.forEach((e) => e.destroy()), this.channels = [], this.lenses.forEach((e) => e()), this.lenses = [], this.renderRoot.querySelectorAll(".image").forEach((e, i) => {
      this.lenses.push(u(e, e.querySelector("img"), [0.8, 0.5, 0.6][i])), this.channels.push(x(0, (o) => {
        const s = y(o, innerWidth)[i], r = matchMedia("(max-width:809px)").matches, d = !r && matchMedia("(max-width:1199px)").matches, p = s.scale;
        e.style.transform = (r && i === 0 || d && i === 1 ? "translateX(-50%) " : "") + "translate(" + s.x + "px," + s.y + "px) scale(" + p + ")";
      }, 165, 80));
    }), this.stop = f(this, () => {
      const e = matchMedia("(prefers-reduced-motion: reduce)").matches, i = this.getBoundingClientRect(), o = e ? 1 : b(i.top, i.height, innerHeight);
      this.channels.forEach((s) => s.set(o)), this.dataset.motionProgress = o.toFixed(3);
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
h.styles = [g, w`
    .gallery{position:relative;height:1245px;max-width:1440px;margin:auto;padding:0 0 130px;overflow:visible}.images{position:relative;height:1115px;width:calc(100% - 254px);max-width:1186px;margin:auto}.image{position:absolute;overflow:hidden;border:1px solid #7d7d7d;will-change:transform}.image:nth-child(1){width:48.314%;aspect-ratio:573/376.453;bottom:9px;left:0}.image:nth-child(2){width:29.595%;aspect-ratio:351/508.016;left:28.583%;top:70px}.image:nth-child(3){width:35.076%;aspect-ratio:416/616;right:0;bottom:37px}
    @media(min-width:810px) and (max-width:1199px){.images{width:calc(100% - 100px)}}
    @media(max-width:809px){.gallery{height:1143px;overflow:hidden;padding:0}.images{width:1186px;height:1143px;left:50%;margin:0;transform:translateX(-50%)}.image:nth-child(1){width:573px;aspect-ratio:573/376.453;bottom:-44px;left:557.406px}.image:nth-child(2){width:351px;aspect-ratio:351/508.016;left:339px;top:70px}.image:nth-child(3){width:416px;aspect-ratio:416/616;left:461px;right:auto;bottom:157px}}
    @media(max-width:809px){
      .gallery{height:auto;padding-block:32px;overflow:visible}
      .images{position:static;inset:auto;width:100%;height:auto;transform:none;display:grid;gap:24px;padding-inline:20px}
      .images .image:nth-child(n){position:relative;inset:auto;width:100%;aspect-ratio:4/5;transform:none!important}
    }
  `];
let n = h;
typeof n < "u" && n.registerSallaComponent("salla-tarwadah-gallery");
export {
  n as default
};
