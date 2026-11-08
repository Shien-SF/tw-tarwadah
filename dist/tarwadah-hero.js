import { T as S, s as $, c as k, d as E, r as z, w as A, a as M, l as a } from "./base-1e_lyEgl.js";
import { css as C, html as p } from "lit";
import { h as R, a as _ } from "./reference-motion-Z6GXbNVC.js";
const h = class h extends S {
  constructor() {
    super(...arguments), this.section = "hero", this.scrambles = [], this.noteAnimations = [];
  }
  startMotion() {
    var g, f, b;
    (g = this.stop) == null || g.call(this), (f = this.mediaEvents) == null || f.abort(), this.mediaEvents = new AbortController();
    const t = this.renderRoot.querySelector("video");
    let o = 0;
    (b = this.scaleSpring) == null || b.destroy(), this.noteAnimations.forEach((e) => e.stop()), this.noteAnimations = [], this.scaleSpring = k(1, (e) => this.style.setProperty("--hero-scale", String(e)), 500, 60);
    let s = 0, i = "up", d = 0;
    const m = this.renderRoot.querySelectorAll(".note,.accent");
    this.scrambles.forEach((e) => e()), this.scrambles = [], m.forEach((e) => {
      e.style.opacity = "1", delete e.dataset.direction, this.scrambles.push(E(e));
    });
    const x = () => {
      t.readyState >= 1 && !t.seeking && Math.abs(t.currentTime - o) > 1e-3 && (t.currentTime = o);
    };
    t.addEventListener("loadedmetadata", z, { signal: this.mediaEvents.signal }), t.addEventListener("seeked", x, { signal: this.mediaEvents.signal }), this.stop = A(this, () => {
      var v;
      const e = this.getBoundingClientRect(), w = Math.max(0, Math.min(1, -e.top / Math.max(1, innerHeight))), c = matchMedia("(prefers-reduced-motion: reduce)").matches;
      o = c ? 0 : R(-e.top, t.duration || 0), x(), (v = this.scaleSpring) == null || v.set(c ? 1 : _(-e.top, e.height)), this.style.setProperty("--media-pin", Math.max(0, -this.renderRoot.querySelector(".scene").getBoundingClientRect().top) + "px");
      const n = -e.top, u = n > s ? "down" : n < s ? "up" : i;
      u !== i && (i = u, d = n), Math.abs(n - d) > 4 && !c && m.forEach((l, y) => {
        l.dataset.direction !== i && (l.dataset.direction = i, this.noteAnimations.push(M(l, { opacity: i === "down" ? 0 : 1 }, { type: "spring", bounce: 0.2, duration: 1.2, delay: y * 0.2 })));
      }), s = n, this.dataset.motionProgress = w.toFixed(3);
    });
  }
  disconnectedCallback() {
    var t, o, s;
    (t = this.stop) == null || t.call(this), (o = this.mediaEvents) == null || o.abort(), (s = this.scaleSpring) == null || s.destroy(), this.noteAnimations.forEach((i) => i.stop()), this.scrambles.forEach((i) => i()), super.disconnectedCallback();
  }
  render() {
    const t = this.settings, o = this.actionHref(t.cta_target, t.cta_url), s = this.actionHref("highlights");
    return p`<section class="hero" aria-label=${a(t.title)}><div class="scene fallback">
      <video class="film" src=${t.video} poster=${t.poster} muted playsinline preload="metadata" aria-hidden="true"></video>
      <div class="content">
      <div class="bottom"><h2 class="display">${a(t.title)}</h2>${s ? p`<a class="mono scroll" href=${s} @click=${(i) => this.followAction(i, "highlights")}>${a(t.scroll_label)}</a>` : ""}<div class="action"><p class="mono">${a(t.description)}</p>${o ? p`<a class="button" href=${o} @click=${(i) => this.followAction(i, t.cta_target)}>${a(t.cta_label)}</a>` : ""}</div></div></div>
    </div><div class="float"><p class="mono note">${a(t.note)}</p><p class="mono accent">${a(t.accent_text)}</p></div></section>`;
  }
};
h.styles = [$, C`
    .hero{height:1750px;position:relative;padding-bottom:100px;overflow:clip}.float{position:absolute;inset:0;height:100svh;min-height:650px;pointer-events:none}.scene{position:sticky;top:0;height:100svh;min-height:650px;overflow:visible}.film{position:absolute;left:50%;top:50%;width:calc(100% - 164px);max-width:1276px;height:auto;aspect-ratio:1276/718;object-fit:contain;transform:translate(-50%,-50%) translateY(var(--media-pin,0px)) scale(var(--hero-scale,1))}.content{position:absolute;inset:0;max-width:1552px;margin:auto;}.note{position:absolute;top:27.2%;inset-inline-start:32.75%;width:180px;font-size:12px;line-height:1}.accent{position:absolute;top:41.4%;inset-inline-start:60.75%;width:180px;font-size:12px;line-height:1;color:var(--tw-accent)}.bottom{position:absolute;inset-inline:56px;bottom:64px;display:grid;grid-template-columns:1fr 74.27px 197px;align-items:end;gap:100px}h2.display{max-width:390px;font-size:56px;letter-spacing:-.05em;line-height:.9}.scroll{background:none;border:0;color:inherit;padding:0;text-align:start}.scroll,.action p,.action .button{font-family:'TW Roboto Mono',monospace;font-size:16px;line-height:1.2;letter-spacing:-.02em}.action{grid-column:3}.action p{margin-bottom:14px}.action .button{width:121px;height:44px;padding:12px 28px;border-radius:6px}.fallback{background:#000}
    @media(min-width:810px) and (max-width:1439px){h2.display{font-size:48px;max-width:335px}.bottom{gap:80px;grid-template-columns:1fr 70px 180px}.scroll,.action p,.action .button{font-size:14px}}
    @media(max-width:809px){.hero{height:1750px}.scene{height:100svh;min-height:670px}.film{width:185.385%;max-width:none;height:auto;left:50%;top:40.52%;transform:translate(-50%,-50%) translateY(var(--media-pin,0px)) scale(var(--hero-scale,1));object-fit:contain;object-position:center}.note{top:22.985%;inset-inline-start:13.59%;max-width:185px}.accent{top:30.57%;inset-inline-start:42.56%;white-space:nowrap}.bottom{inset-inline:20px;bottom:55px;display:block}.bottom h2{max-width:360px;font-size:56px;margin-bottom:30px}.action{display:block;margin-top:14px}.action p{font-size:12px;max-width:240px}.action .button{font-size:14px;width:auto;height:40px}.scroll{font-size:14px}}
  `];
let r = h;
typeof r < "u" && r.registerSallaComponent("salla-tarwadah-hero");
export {
  r as default
};
