import { T as y, s as S, c as k, d as E, r as z, w as $, a as M, l as s } from "./base-Dfz21CDO.js";
import { css as A, html as C } from "lit";
import { h as R, a as j } from "./reference-motion-Z6GXbNVC.js";
const p = class p extends y {
  constructor() {
    super(...arguments), this.section = "hero", this.scrambles = [], this.noteAnimations = [];
  }
  startMotion() {
    var x, g, b;
    (x = this.stop) == null || x.call(this), (g = this.mediaEvents) == null || g.abort(), this.mediaEvents = new AbortController();
    const t = this.renderRoot.querySelector("video");
    let o = 0;
    (b = this.scaleSpring) == null || b.destroy(), this.noteAnimations.forEach((e) => e.stop()), this.noteAnimations = [], this.scaleSpring = k(1, (e) => this.style.setProperty("--hero-scale", String(e)), 500, 60);
    let a = 0, i = "up", h = 0;
    const d = this.renderRoot.querySelectorAll(".note,.accent");
    this.scrambles.forEach((e) => e()), this.scrambles = [], d.forEach((e) => {
      e.style.opacity = "1", delete e.dataset.direction, this.scrambles.push(E(e));
    });
    const m = () => {
      t.readyState >= 1 && !t.seeking && Math.abs(t.currentTime - o) > 1e-3 && (t.currentTime = o);
    };
    t.addEventListener("loadedmetadata", z, { signal: this.mediaEvents.signal }), t.addEventListener("seeked", m, { signal: this.mediaEvents.signal }), this.stop = $(this, () => {
      var f;
      const e = this.getBoundingClientRect(), v = Math.max(0, Math.min(1, -e.top / Math.max(1, innerHeight))), l = matchMedia("(prefers-reduced-motion: reduce)").matches;
      o = l ? 0 : R(-e.top, t.duration || 0), m(), (f = this.scaleSpring) == null || f.set(l ? 1 : j(-e.top, e.height)), this.style.setProperty("--media-pin", Math.max(0, -this.renderRoot.querySelector(".scene").getBoundingClientRect().top) + "px");
      const n = -e.top, u = n > a ? "down" : n < a ? "up" : i;
      u !== i && (i = u, h = n), Math.abs(n - h) > 4 && !l && d.forEach((c, w) => {
        c.dataset.direction !== i && (c.dataset.direction = i, this.noteAnimations.push(M(c, { opacity: i === "down" ? 0 : 1 }, { type: "spring", bounce: 0.2, duration: 1.2, delay: w * 0.2 })));
      }), a = n, this.dataset.motionProgress = v.toFixed(3);
    });
  }
  disconnectedCallback() {
    var t, o, a;
    (t = this.stop) == null || t.call(this), (o = this.mediaEvents) == null || o.abort(), (a = this.scaleSpring) == null || a.destroy(), this.noteAnimations.forEach((i) => i.stop()), this.scrambles.forEach((i) => i()), super.disconnectedCallback();
  }
  render() {
    const t = this.settings;
    return C`<section class="hero" aria-label=${s(t.title)}><div class="scene fallback">
      <video class="film" src=${t.video} poster=${t.poster} muted playsinline preload="auto" aria-hidden="true"></video>
      <div class="content">
      <div class="bottom"><h1 class="display">${s(t.title)}</h1><button class="mono scroll" @click=${() => this.jump("highlights")}>${s(t.scroll_label)}</button><div class="action"><p class="mono">${s(t.description)}</p><button class="button" @click=${() => this.jump(t.cta_target)}>${s(t.cta_label)}</button></div></div></div>
    </div><div class="float"><p class="mono note">${s(t.note)}</p><p class="mono accent">${s(t.accent_text)}</p></div></section>`;
  }
};
p.styles = [S, A`
    .hero{height:1750px;position:relative;padding-bottom:100px;overflow:clip}.float{position:absolute;inset:0;height:100svh;min-height:650px;pointer-events:none}.scene{position:sticky;top:0;height:100svh;min-height:650px;overflow:visible}.film{position:absolute;left:50%;top:50%;width:calc(100% - 164px);max-width:1276px;height:auto;aspect-ratio:1276/718;object-fit:contain;transform:translate(-50%,-50%) translateY(var(--media-pin,0px)) scale(var(--hero-scale,1))}.content{position:absolute;inset:0;max-width:1552px;margin:auto;}.note{position:absolute;top:27.2%;inset-inline-start:32.75%;width:180px;font-size:12px;line-height:1}.accent{position:absolute;top:41.4%;inset-inline-start:60.75%;width:180px;font-size:12px;line-height:1;color:var(--tw-accent)}.bottom{position:absolute;inset-inline:56px;bottom:64px;display:grid;grid-template-columns:1fr 74.27px 197px;align-items:end;gap:100px}h1.display{max-width:390px;font-size:56px;letter-spacing:-.05em;line-height:.9}.scroll{background:none;border:0;color:inherit;padding:0;text-align:start}.scroll,.action p,.action .button{font-family:'TW Roboto Mono',monospace;font-size:16px;line-height:1.2;letter-spacing:-.02em}.action p{margin-bottom:14px}.action .button{width:121px;height:44px;padding:12px 28px;border-radius:6px}.fallback{background:#000}
    @media(min-width:810px) and (max-width:1439px){h1.display{font-size:48px;max-width:335px}.bottom{gap:80px;grid-template-columns:1fr 70px 180px}.scroll,.action p,.action .button{font-size:14px}}
    @media(max-width:809px){.hero{height:1750px}.scene{height:100svh;min-height:670px}.film{width:185.385%;max-width:none;height:auto;left:50%;top:40.52%;transform:translate(-50%,-50%) translateY(var(--media-pin,0px)) scale(var(--hero-scale,1));object-fit:contain;object-position:center}.note{top:22.985%;inset-inline-start:13.59%;max-width:185px}.accent{top:30.57%;inset-inline-start:42.56%;white-space:nowrap}.bottom{inset-inline:20px;bottom:55px;display:block}.bottom h1{max-width:360px;font-size:56px;margin-bottom:30px}.action{display:block;margin-top:14px}.action p{font-size:12px;max-width:240px}.action .button{font-size:14px;width:auto;height:40px}.scroll{font-size:14px}}
  `];
let r = p;
typeof r < "u" && r.registerSallaComponent("salla-tarwadah-hero");
export {
  r as default
};
