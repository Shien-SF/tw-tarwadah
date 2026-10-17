import { T as d, s as h, o as u, c as f, w as g, l as r } from "./base-Dfz21CDO.js";
import { css as v, html as y } from "lit";
import { state as x } from "lit/decorators.js";
import { t as m } from "./reference-motion-Z6GXbNVC.js";
var b = Object.defineProperty, S = (l, t, s, i) => {
  for (var e = void 0, o = l.length - 1, n; o >= 0; o--)
    (n = l[o]) && (e = n(t, s, e) || e);
  return e && b(t, s, e), e;
};
const p = class p extends d {
  constructor() {
    super(...arguments), this.section = "video", this.playing = !1;
  }
  startMotion() {
    var s, i, e;
    (s = this.stop) == null || s.call(this), (i = this.stopScene) == null || i.call(this), (e = this.shutter) == null || e.destroy();
    const t = this.renderRoot.querySelector("video");
    this.stop = u(t), this.shutter = f(0, (o) => this.style.setProperty("--open", String(o)), 106, 50), this.stopScene = g(this, () => {
      var c;
      const o = this.getBoundingClientRect(), n = matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : m(o.top, o.height, innerHeight);
      (c = this.shutter) == null || c.set(n), this.dataset.revealProgress = n.toFixed(3);
    });
  }
  disconnectedCallback() {
    var t, s, i;
    (t = this.stop) == null || t.call(this), (s = this.stopScene) == null || s.call(this), (i = this.shutter) == null || i.destroy(), super.disconnectedCallback();
  }
  toggle() {
    const t = this.renderRoot.querySelector("video");
    t.paused ? t.play().catch(() => {
    }) : t.pause();
  }
  render() {
    const t = this.settings;
    return y`<section class="film" aria-label=${r(t.title)}><video src=${t.video} poster=${t.poster} muted playsinline loop preload="none" @play=${() => this.playing = !0} @pause=${() => this.playing = !1}></video><div class="overlay"></div><div class="shutter top"></div><div class="shutter bottom"></div><h2 class="caption">${r(t.title)}</h2><button class="play mono" @click=${this.toggle} aria-pressed=${this.playing}>${this.playing ? r(t.pause_label) : r(t.play_label)}</button></section>`;
  }
};
p.styles = [h, v`
    .film{position:relative;height:960px;overflow:hidden;padding-block:162px;background:#000}video{height:636px;object-fit:cover}.caption{position:absolute;inset-inline:0;top:50%;transform:translateY(-50%);text-align:center;font-family:'TW Roboto Mono',monospace;font-weight:400;font-size:14px;line-height:1.2;letter-spacing:-.02em;text-shadow:0 2px 20px #000}.play{position:absolute;inset-inline-end:56px;top:185px;border:1px solid #ffffff70;border-radius:30px;color:#fff;background:#0005;padding:12px 20px;font-size:12px;opacity:0;transition:opacity .2s}.film:hover .play,.play:focus-visible{opacity:1}.overlay{position:absolute;inset:162px 0;background:#0002;pointer-events:none}
    .shutter{position:absolute;inset-inline:0;height:270px;background:#000;pointer-events:none;z-index:1}.shutter.top{top:160px;transform:translateY(calc(-270px * var(--open,0)))}.shutter.bottom{bottom:160px;transform:translateY(calc(270px * var(--open,0)))}.caption,.play{z-index:2}
    @media(max-width:809px){.caption{padding-inline:20px}.play{inset-inline-end:20px;top:145px;opacity:1}}
  `];
let a = p;
S([
  x()
], a.prototype, "playing");
typeof a < "u" && a.registerSallaComponent("salla-tarwadah-video");
export {
  a as default
};
