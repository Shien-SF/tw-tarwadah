import { css as w, html as y } from "lit";
import { h as k, a as E } from "./reference-motion-Z6GXbNVC.js";
import { T as S, s as $, c as z, d as M, r as A, w as C, a as R } from "./base-Bl3jPnIE.js";
const l = class l extends S {
  constructor() {
    super(...arguments), this.section = "hero", this.scrambles = [], this.noteAnimations = [];
  }
  startMotion() {
    var m, x, g;
    (m = this.stop) == null || m.call(this), (x = this.mediaEvents) == null || x.abort(), this.mediaEvents = new AbortController();
    const t = this.renderRoot.querySelector("video");
    let s = 0;
    (g = this.scaleSpring) == null || g.destroy(), this.noteAnimations.forEach((e) => e.stop()), this.noteAnimations = [], this.scaleSpring = z(1, (e) => this.style.setProperty("--hero-scale", String(e)), 500, 60);
    let o = 0, i = "up", p = 0;
    const h = this.renderRoot.querySelectorAll(".note,.accent");
    this.scrambles.forEach((e) => e()), this.scrambles = [], h.forEach((e) => {
      e.style.opacity = "1", delete e.dataset.direction, this.scrambles.push(M(e));
    });
    const d = () => {
      t.readyState >= 1 && !t.seeking && Math.abs(t.currentTime - s) > 1e-3 && (t.currentTime = s);
    };
    t.addEventListener("loadedmetadata", A, { signal: this.mediaEvents.signal }), t.addEventListener("seeked", d, { signal: this.mediaEvents.signal }), this.stop = C(this, () => {
      var u;
      const e = this.getBoundingClientRect(), f = Math.max(0, Math.min(1, -e.top / Math.max(1, innerHeight))), r = matchMedia("(prefers-reduced-motion: reduce)").matches;
      s = r ? 0 : k(-e.top, t.duration || 0), d(), (u = this.scaleSpring) == null || u.set(r ? 1 : E(-e.top, e.height)), this.style.setProperty("--media-pin", Math.max(0, -this.renderRoot.querySelector(".scene").getBoundingClientRect().top) + "px");
      const a = -e.top, b = a > o ? "down" : a < o ? "up" : i;
      b !== i && (i = b, p = a), Math.abs(a - p) > 4 && !r && h.forEach((c, v) => {
        c.dataset.direction !== i && (c.dataset.direction = i, this.noteAnimations.push(R(c, { opacity: i === "down" ? 0 : 1 }, { type: "spring", bounce: 0.2, duration: 1.2, delay: v * 0.2 })));
      }), o = a, this.dataset.motionProgress = f.toFixed(3);
    });
  }
  disconnectedCallback() {
    var t, s, o;
    (t = this.stop) == null || t.call(this), (s = this.mediaEvents) == null || s.abort(), (o = this.scaleSpring) == null || o.destroy(), this.noteAnimations.forEach((i) => i.stop()), this.scrambles.forEach((i) => i()), super.disconnectedCallback();
  }
  render() {
    const t = this.settings;
    return y`<section class="hero" aria-label=${t.title}><div class="scene fallback">
      <video class="film" src=${t.video} poster=${t.poster} muted playsinline preload="auto" aria-hidden="true"></video>
      <div class="content">
      <div class="bottom"><h1 class="display">${t.title}</h1><button class="mono scroll" @click=${() => this.jump("highlights")}>${t.scroll_label}</button><div class="action"><p class="mono">${t.description}</p><button class="button" @click=${() => this.jump(t.cta_target)}>${t.cta_label}</button></div></div></div>
    </div><div class="float"><p class="mono note">${t.note}</p><p class="mono accent">${t.accent_text}</p></div></section>`;
  }
};
l.styles = [$, w`
    .hero{height:1750px;position:relative;padding-bottom:100px;overflow:clip}.float{position:absolute;inset:0;height:100svh;min-height:650px;pointer-events:none}.scene{position:sticky;top:0;height:100svh;min-height:650px;overflow:visible}.film{position:absolute;left:50%;top:50%;width:calc(100% - 164px);max-width:1276px;height:auto;aspect-ratio:1276/718;object-fit:contain;transform:translate(-50%,-50%) translateY(var(--media-pin,0px)) scale(var(--hero-scale,1))}.content{position:absolute;inset:0;max-width:1552px;margin:auto;}.note{position:absolute;top:27.2%;inset-inline-start:32.75%;width:180px;font-size:12px;line-height:1}.accent{position:absolute;top:41.4%;inset-inline-start:60.75%;width:180px;font-size:12px;line-height:1;color:var(--tw-accent)}.bottom{position:absolute;inset-inline:56px;bottom:64px;display:grid;grid-template-columns:1fr 74.27px 197px;align-items:end;gap:100px}h1.display{max-width:390px;font-size:56px;letter-spacing:-.05em;line-height:.9}.scroll{background:none;border:0;color:inherit;padding:0;text-align:start}.scroll,.action p,.action .button{font-family:'TW Roboto Mono',monospace;font-size:16px;line-height:1.2;letter-spacing:-.02em}.action p{margin-bottom:14px}.action .button{width:121px;height:44px;padding:12px 28px;border-radius:6px}.fallback{background:#000}
    @media(min-width:810px) and (max-width:1439px){h1.display{font-size:48px;max-width:335px}.bottom{gap:80px;grid-template-columns:1fr 70px 180px}.scroll,.action p,.action .button{font-size:14px}}
    @media(max-width:809px){.hero{height:1750px}.scene{height:100svh;min-height:670px}.film{width:185.385%;max-width:none;height:auto;left:50%;top:40.52%;transform:translate(-50%,-50%) translateY(var(--media-pin,0px)) scale(var(--hero-scale,1));object-fit:contain;object-position:center}.note{top:22.985%;inset-inline-start:13.59%;max-width:185px}.accent{top:30.57%;inset-inline-start:42.56%;white-space:nowrap}.bottom{inset-inline:20px;bottom:55px;display:block}.bottom h1{max-width:360px;font-size:56px;margin-bottom:30px}.action{display:block;margin-top:14px}.action p{font-size:12px;max-width:240px}.action .button{font-size:14px;width:auto;height:40px}.scroll{font-size:14px}}
  `];
let n = l;
typeof n < "u" && n.registerSallaComponent("salla-tarwadah-hero");
export {
  n as default
};
