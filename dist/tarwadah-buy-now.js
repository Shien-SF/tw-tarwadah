import { css as $, html as c } from "lit";
import { unsafeSVG as k } from "lit/directives/unsafe-svg.js";
import { a as x, s as S, b as z } from "./base-Bl3jPnIE.js";
import { state as f } from "lit/decorators.js";
import { T as q, s as _ } from "./product-DWdcWjWX.js";
const w = ['<svg viewBox="0 0 13.444 9" overflow="visible" id="svg-730092642_1072"><g><g><defs><path d="M 0 2.625 C 0 1.175 1.219 0 2.722 0 L 9.722 0 C 11.226 0 12.444 1.175 12.444 2.625 L 12.444 6.375 C 12.444 7.825 11.226 9 9.722 9 L 2.722 9 C 1.219 9 0 7.825 0 6.375 Z" id="svg-730092642_1072_a1016z"></path><clipPath id="svg-730092642_1072_a1017z"><use href="#svg-730092642_1072_a1016z"></use></clipPath></defs><use href="#svg-730092642_1072_a1016z" fill="transparent" clip-path="url(#svg-730092642_1072_a1017z)" stroke-width="2" stroke="var(--token-3fad9a8b-2fe2-4808-b3c9-7362126fd7a8, rgb(135, 135, 135))" stroke-linejoin="round" stroke-dasharray=""></use></g><path d="M 3.111 3.75 L 3.111 5.25 M 12.444 2.625 L 12.844 2.625 C 13.176 2.625 13.444 3.129 13.444 3.75 L 13.444 5.25 C 13.444 5.871 13.176 6.375 12.844 6.375 L 12.444 6.375" fill="transparent" stroke="var(--token-3fad9a8b-2fe2-4808-b3c9-7362126fd7a8, rgb(135, 135, 135))" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray=""></path></g></svg>', '<svg viewBox="0 0 12 8.667" overflow="visible" id="svg147747052_444"><path d="M 12 5.051 L 10.352 5.051 L 8.541 0 L 5.282 8.667 L 2.54 2.822 L 1.394 5.051 L 0 5.051" fill="transparent" stroke="var(--token-3fad9a8b-2fe2-4808-b3c9-7362126fd7a8, rgb(135, 135, 135))" stroke-linecap="square" stroke-miterlimit="10" stroke-dasharray=""></path></svg>', '<svg viewBox="0 0 11 12" overflow="visible" id="svg1456942237_1620"><g><path d="M 1.658 11.198 L 0.376 9.412 C -0.003 8.884 -0.103 8.196 0.11 7.577 L 0.202 7.31 C 0.328 6.943 0.64 6.678 1.014 6.621 C 1.388 6.564 1.761 6.724 1.986 7.037 L 4.338 10.312 C 4.563 10.624 4.602 11.039 4.439 11.39 C 4.276 11.741 3.938 11.97 3.56 11.986 L 3.286 11.998 C 2.648 12.026 2.038 11.727 1.658 11.198 Z M 9.341 11.198 L 10.624 9.412 C 11.003 8.884 11.103 8.196 10.89 7.577 L 10.798 7.31 C 10.671 6.943 10.359 6.679 9.986 6.622 C 9.612 6.565 9.239 6.724 9.014 7.037 L 6.662 10.312 C 6.437 10.624 6.398 11.039 6.561 11.39 C 6.724 11.74 7.062 11.97 7.439 11.986 L 7.715 11.998 C 8.353 12.026 8.962 11.727 9.342 11.198 Z" fill="transparent" stroke="var(--token-3fad9a8b-2fe2-4808-b3c9-7362126fd7a8, rgb(135, 135, 135))" stroke-linecap="round" stroke-miterlimit="10" stroke-dasharray=""></path><path d="M 0.368 6.987 C -0.249 4.748 0.572 2.352 2.419 1.008 C 4.265 -0.336 6.734 -0.336 8.58 1.008 C 10.426 2.352 11.248 4.748 10.63 6.987" fill="transparent" stroke="var(--token-3fad9a8b-2fe2-4808-b3c9-7362126fd7a8, rgb(135, 135, 135))" stroke-miterlimit="10" stroke-dasharray=""></path><path d="M 3.75 4.048 L 3.75 4.648 M 7.249 4.048 L 7.249 4.648 M 5.5 3.147 L 5.5 5.548" fill="transparent" stroke="var(--token-3fad9a8b-2fe2-4808-b3c9-7362126fd7a8, rgb(135, 135, 135))" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray=""></path></g></svg>'];
function C(b) {
  return k(w[b % w.length]);
}
var M = Object.defineProperty, g = (b, t, e, s) => {
  for (var o = void 0, r = b.length - 1, n; r >= 0; r--)
    (n = b[r]) && (o = n(t, e, o) || o);
  return o && M(t, e, o), o;
};
const y = class y extends q {
  constructor() {
    super(...arguments), this.section = "buy-now", this.selected = 0, this.quantity = 1, this.notice = !1, this.optionImage = "", this.activeSpec = 0, this.closingSpecs = !1, this.mountedProduct = 0, this.measureHeader = () => {
      const t = this.renderRoot.querySelector(".card"), e = this.renderRoot.querySelector(".description");
      t && e && t.style.setProperty("--header-bottom", `${e.getBoundingClientRect().bottom - t.getBoundingClientRect().top}px`);
    }, this.swipeStart = (t) => {
      this.productId || (this.slidePointer = { x: t.clientX, id: t.pointerId }, t.currentTarget.setPointerCapture(t.pointerId));
    }, this.swipeEnd = (t) => {
      if (!this.slidePointer) return;
      const e = t.clientX - this.slidePointer.x;
      this.slidePointer = void 0;
      const s = t.currentTarget.clientWidth;
      Math.abs(e) > s / 4 && (this.selected = Math.max(0, Math.min(this.settings.variants.length - 1, this.selected + (e < 0 ? 1 : -1))));
    };
  }
  get productImages() {
    var t, e, s;
    return [...new Set([(e = (t = this.productData) == null ? void 0 : t.image) == null ? void 0 : e.url, ...(((s = this.productData) == null ? void 0 : s.images) || []).map((o) => o.url), this.optionImage].filter(Boolean))];
  }
  slideTo() {
    var o, r, n;
    const t = this.renderRoot.querySelector(".slides");
    if (!t) return;
    const e = t.parentElement, s = this.productId ? Math.max(0, this.productImages.indexOf(this.optionImage || ((r = (o = this.productData) == null ? void 0 : o.image) == null ? void 0 : r.url) || this.productImages[0])) : Math.min(this.selected, Math.max(0, this.settings.variants.length - 1));
    if ((n = this.slideAnimation) == null || n.stop(), matchMedia("(prefers-reduced-motion: reduce)").matches) {
      t.style.transform = "translateX(" + -s * e.clientWidth + "px)";
      return;
    }
    this.slideAnimation = x(t, { x: -s * e.clientWidth }, { type: "spring", bounce: 0 });
  }
  updated(t) {
    var s;
    if (super.updated(t), (t.has("selected") || t.has("config") || t.has("optionImage") || t.has("productData")) && this.slideTo(), !this.resizeSlides) {
      const o = this.renderRoot.querySelector(".photo");
      o && (this.resizeSlides = new ResizeObserver(() => this.slideTo()), this.resizeSlides.observe(o));
    }
    if (!this.resizeHeader) {
      this.resizeHeader = new ResizeObserver(this.measureHeader);
      for (const o of this.renderRoot.querySelectorAll("h2:not(.spec-dialog h2),.description")) this.resizeHeader.observe(o);
    }
    this.measureHeader();
    const e = ((s = this.productData) == null ? void 0 : s.id) || 0;
    e !== this.mountedProduct && (this.optionImage = ""), (e !== this.mountedProduct || t.has("config")) && this.mountPurchase();
  }
  previewAdd() {
    var s, o, r, n, l;
    if (this.notice = !0, !document.body.dataset.tarwadahPreview) return;
    const t = (s = this.settings.variants) == null ? void 0 : s[this.selected], e = ((o = this.productData) == null ? void 0 : o.sale_price) ?? (typeof ((r = this.productData) == null ? void 0 : r.price) == "object" ? this.productData.price.amount : (n = this.productData) == null ? void 0 : n.price);
    this.dispatchEvent(new CustomEvent("tarwadah:preview-cart-add", { bubbles: !0, composed: !0, detail: {
      key: `${this.section}:${this.selected}`,
      name: this.productName,
      variant: (t == null ? void 0 : t.name) || "",
      image: (t == null ? void 0 : t.image) || "",
      quantity: this.quantity,
      price: e ?? Number(String(this.settings.price).replace(/[^0-9.]/g, "")),
      currency: ((l = this.productData) == null ? void 0 : l.currency) || (String(this.settings.price).includes("$") ? "USD" : "SAR")
    } }));
  }
  openSpecs() {
    var s;
    const t = this.renderRoot.querySelector(".spec-dialog");
    if (t.open) return;
    this.activeSpec = 0, this.closingSpecs = !1, t.classList.remove("closing"), t.style.removeProperty("opacity"), t.style.removeProperty("transform"), t.showModal(), this.releaseScroll = z(this);
    const e = document.querySelector(".tarwadah-cursor");
    e && t.append(e), (s = this.modalAnimation) == null || s.stop(), matchMedia("(prefers-reduced-motion: reduce)").matches || (this.modalAnimation = x(t, { opacity: [0, 1], y: [12, 0] }, { duration: 0.25, ease: [0.22, 1, 0.36, 1] }));
  }
  async closeSpecs() {
    var e;
    const t = this.renderRoot.querySelector(".spec-dialog");
    !t.open || this.closingSpecs || (this.closingSpecs = !0, (e = this.modalAnimation) == null || e.stop(), t.classList.add("closing"), matchMedia("(prefers-reduced-motion: reduce)").matches || (this.modalAnimation = x(t, { opacity: 0, y: 8 }, { duration: 0.18 }), await this.modalAnimation), t.close(), this.restoreCursor());
  }
  restoreCursor() {
    var e;
    const t = this.renderRoot.querySelector(".tarwadah-cursor");
    t && document.body.append(t), (e = this.releaseScroll) == null || e.call(this), this.releaseScroll = void 0, this.closingSpecs = !1;
  }
  mountPurchase() {
    var l, u, a;
    (l = this.purchaseForm) == null || l.remove(), this.purchaseForm = void 0, this.mountedProduct = ((u = this.productData) == null ? void 0 : u.id) || 0;
    const t = this.productData;
    if (!t || this.demoProduct) return;
    const e = document.createElement("form");
    e.slot = "purchase", e.className = "tw-native-purchase", e.method = "post", e.enctype = "multipart/form-data", e.addEventListener("submit", (i) => {
      i.preventDefault(), _().form.onSubmit("cart.addItem", i);
    });
    const s = document.createElement("input");
    if (s.type = "hidden", s.name = "id", s.value = String(t.id), e.append(s), (a = t.options) != null && a.length) {
      const i = document.createElement("salla-product-options");
      i.setAttribute("product-id", String(t.id)), i.options = t.options, i.addEventListener("changed", (p) => {
        var v;
        const h = (v = p.detail) == null ? void 0 : v.detail, m = h == null ? void 0 : h.image;
        this.optionImage = typeof m == "string" ? m : (m == null ? void 0 : m.url) || "";
      }), e.append(i);
    }
    const o = document.createElement("p");
    if (o.className = "tw-purchase-price", o.append(this.formattedPrice), this.formattedRegularPrice) {
      const i = document.createElement("del");
      i.textContent = this.formattedRegularPrice, o.append(i);
    }
    e.append(o);
    const r = document.createElement("div");
    if (r.className = "tw-purchase-actions", e.append(r), t.is_hidden_quantity) {
      const i = document.createElement("input");
      i.type = "hidden", i.name = "quantity", i.value = "1", r.append(i);
    } else {
      const i = document.createElement("salla-quantity-input");
      i.setAttribute("name", "quantity"), i.setAttribute("value", "1"), i.setAttribute("aria-label", this.settings.quantity_label), t.max_quantity && i.setAttribute("max", String(t.max_quantity)), r.append(i);
    }
    const n = document.createElement("salla-add-product-button");
    if (n.setAttribute("product-id", String(t.id)), n.setAttribute("product-status", t.status || "sale"), n.setAttribute("product-type", t.type || "product"), n.setAttribute("width", "wide"), n.setAttribute("type", "submit"), n.textContent = this.settings.cta_label, r.append(n), this.purchaseForm = e, this.append(e), !document.getElementById("tw-purchase-styles")) {
      const i = document.createElement("style");
      i.id = "tw-purchase-styles", i.textContent = `
      [data-section="buy-now"] .tw-native-purchase{display:block;color:inherit;margin-top:12px;--color-primary:#fff;--color-primary-reverse:#000}
      [data-section="buy-now"] .tw-purchase-price{font-family:'TW Roboto Mono',monospace;font-size:20px;line-height:26px;color:#8a8a8a;margin:12px 0 0}
      [data-section="buy-now"] .tw-purchase-price del{font-size:14px;margin-inline-start:8px}
      [data-section="buy-now"] .tw-purchase-actions{display:flex;gap:10px;align-items:stretch;margin-top:26.2px}
      [data-section="buy-now"] .tw-purchase-actions salla-add-product-button{flex:1;min-width:0;--color-primary:#fff;--color-primary-reverse:#000}
      [data-section="buy-now"] .tw-purchase-actions salla-add-product-button .s-button-element{min-height:44px;border-radius:4px;font-family:'TW Roboto Mono',monospace;font-size:16px;background:#fff;color:#000;border-color:#fff}
      [data-section="buy-now"] .tw-purchase-actions salla-add-product-button .s-button-element:hover{background:var(--tw-accent,#f17b0e);border-color:var(--tw-accent,#f17b0e)}
      [data-section="buy-now"] .tw-purchase-actions salla-quantity-input{width:109px;flex:0 0 109px;max-width:none;direction:ltr}
      [data-section="buy-now"] .tw-purchase-actions .s-quantity-input-container{height:44px;width:100%;background:#222;border:0;border-radius:5px;color:#7d7d7d}
      [data-section="buy-now"] .tw-purchase-actions .s-quantity-input-input{font-family:'TW Roboto Mono',monospace;color:#7d7d7d;background:transparent}
      [data-section="buy-now"] .tw-native-purchase salla-product-options{display:block;max-width:340px;font-family:'TW Roboto Mono',monospace}
      @media(max-width:809px){[data-section="buy-now"] .tw-purchase-actions{flex-direction:column;margin-top:24px}[data-section="buy-now"] .tw-purchase-actions salla-quantity-input{width:100%;flex:auto}[data-section="buy-now"] .tw-purchase-actions salla-add-product-button{flex:auto}[data-section="buy-now"] .tw-native-purchase salla-product-options{max-width:none}}
      `, document.head.append(i);
    }
  }
  disconnectedCallback() {
    var t, e, s, o, r, n;
    (t = this.modalAnimation) == null || t.stop(), (e = this.renderRoot.querySelector(".spec-dialog")) == null || e.close(), this.restoreCursor(), (s = this.slideAnimation) == null || s.stop(), (o = this.resizeSlides) == null || o.disconnect(), this.resizeSlides = void 0, (r = this.resizeHeader) == null || r.disconnect(), this.resizeHeader = void 0, (n = this.purchaseForm) == null || n.remove(), this.mountedProduct = 0, super.disconnectedCallback();
  }
  render() {
    var n, l, u;
    const t = this.settings, e = t.variants || [], s = e[Math.min(this.selected, Math.max(0, e.length - 1))], o = this.productData, r = this.productId ? this.optionImage || ((n = o == null ? void 0 : o.image) == null ? void 0 : n.url) || ((u = (l = o == null ? void 0 : o.images) == null ? void 0 : l[0]) == null ? void 0 : u.url) : s == null ? void 0 : s.image;
    return c`<section class="section wrap" aria-label=${this.productName}><div class=${`card ${this.productId ? "real-product" : ""}`}><div class="info"><h2>${this.productName}</h2><p class="description mono">${t.description}</p><div class="specs"><h3 class="mono"><button class="specs-toggle" @click=${this.openSpecs}>${t.specs_label}</button></h3><ul>${t.specs.map((a, i) => c`<li class="mono"><span class="spec-icon" aria-hidden="true">${C(i)}</span><span>${a.text}</span></li>`)}</ul></div>
      ${this.productId ? "" : c`<div class="swatches"><p class="mono">${t.color_label}</p><div class="colors">${e.map((a, i) => c`<button class="color mono" aria-pressed=${this.selected === i} @click=${() => this.selected = i}><span class="dot" style="--swatch:${a.color}"></span>${a.name}</button>`)}</div></div>`}
      ${this.productId ? "" : c`<p class="price mono">${this.formattedPrice} ${this.formattedRegularPrice ? c`<del style="font-size:14px;margin-inline-start:8px">${this.formattedRegularPrice}</del>` : ""}</p>`}<div class="native"><slot name="purchase"></slot></div>
      ${this.productLoading ? c`<p class="message mono" role="status">${t.loading_message}</p>` : ""}${this.productError ? c`<p class="message mono" role="alert">${t.error_message}</p>` : ""}
      ${this.productId ? "" : c`<div class="actions"><div class="quantity" aria-label=${t.quantity_label}><button aria-label=${this.ui.decrease} ?disabled=${this.quantity <= 1} @click=${() => this.quantity = Math.max(1, this.quantity - 1)}>−</button><output aria-live="polite">${this.quantity}</output><button aria-label=${this.ui.increase} @click=${() => this.quantity = Math.min(99, this.quantity + 1)}>+</button></div><button class="button" ?disabled=${this.productUnavailable || !this.isDemo} @click=${this.previewAdd}>${this.productUnavailable ? t.sold_out_label : t.cta_label}</button></div>${this.notice || !this.productId && !this.isDemo ? c`<p class="message mono" role="status">${this.demoProduct ? t.demo_message : t.preview_message}</p>` : ""}`}
    </div><div class="gallery"><figure class="photo" @pointerdown=${this.swipeStart} @pointerup=${this.swipeEnd} @pointercancel=${() => this.slidePointer = void 0}><div class="slides">${this.productId ? r ? this.productImages.map((a) => c`<div class="slide" aria-hidden=${a !== r}><img src=${a} alt=${this.productName} draggable="false"></div>`) : c`<p class="message mono">${t.loading_message}</p>` : e.map((a, i) => c`<div class="slide" aria-hidden=${i !== this.selected}><img src=${a.image} alt=${`${this.productName} — ${a.name}`} draggable="false"></div>`)}</div></figure></div></div><dialog class="spec-dialog" aria-label=${t.details_title} @close=${this.restoreCursor} @cancel=${(a) => {
      a.preventDefault(), this.closeSpecs();
    }} @click=${(a) => {
      if (a.target === a.currentTarget) {
        const i = a, p = a.currentTarget.getBoundingClientRect();
        (i.clientX < p.left || i.clientX > p.right || i.clientY < p.top || i.clientY > p.bottom) && this.closeSpecs();
      }
    }}><h2>${t.details_title}</h2>${(t.detailed_specs || []).map((a, i) => c`<div class="spec-group"><button class="spec-heading" aria-expanded=${this.activeSpec === i} aria-controls=${`spec-panel-${i}`} @click=${() => this.activeSpec = this.activeSpec === i ? -1 : i}>${a.title}<span class="spec-plus" aria-hidden="true"></span></button><div id=${`spec-panel-${i}`} class=${`spec-panel ${this.activeSpec === i ? "expanded" : ""}`} ?inert=${this.activeSpec !== i}><div class="spec-panel-inner"><div class="spec-body">${a.body.split(`
`).map((p) => {
      const h = p.split("|");
      return p ? h.length > 1 ? c`<div class="spec-row"><span>${h[0].trim()}</span><span>${h.slice(1).join("|").trim()}</span></div>` : c`<p>${p}</p>` : c`<div class="spec-gap"></div>`;
    })}</div></div></div></div>`)}<button class="spec-close" @click=${this.closeSpecs}>${t.close_label}</button></dialog></section>`;
  }
};
y.styles = [S, $`
    .section{padding-block:120px 100px}.card{position:relative;border:1px solid #ffffff20;border-radius:4px;background:#000;padding:39px;max-width:601px;margin:auto;min-height:384px}.info{display:flex;flex-direction:column}h2{font-family:'TW Instrument',serif;font-size:44px;letter-spacing:-.04em;font-weight:400;line-height:1.1;max-width:330px}.description{font-family:'TW Roboto Mono',monospace;font-size:16px;line-height:1.2;letter-spacing:-.02em;margin-top:2px;color:#7d7d7d}.specs{margin-top:22.2px;max-width:340px}.specs-toggle{background:none;border:0;padding:0;cursor:pointer;color:inherit;font:inherit;text-decoration:inherit}.specs h3{position:absolute;top:49.4px;inset-inline-end:40px;font-family:'TW Roboto Mono',monospace;font-size:16px;font-weight:400;text-decoration:underline;text-underline-offset:3px;color:#bfbfbf}.specs li{font-family:'TW Roboto Mono',monospace;color:#bbb;font-size:16px;letter-spacing:-.02em;line-height:19.2px;list-style:none;display:flex;gap:8px;align-items:center}.specs li+li{margin-top:8px}.spec-icon{display:grid;place-items:center}.spec-icon svg{width:14px;height:14px;overflow:visible}.spec-icon{width:16px;height:16px;flex:none;color:#bfbfbf}.specs ul{margin:0;padding:0}.swatches{margin-top:12px}.swatches>.mono{display:none}.colors{display:flex;gap:8px;flex-wrap:wrap}.color{border:0;color:#7d7d7d;background:none;padding:0 4px 0 0;font-family:'TW Roboto Mono',monospace;font-size:14px;line-height:19px;letter-spacing:0}.color[aria-pressed=true]{color:var(--tw-accent)}.dot{display:none}.price{font-family:'TW Roboto Mono',monospace;font-size:20px;line-height:26px;color:#8a8a8a;margin-block:12px 0}.gallery{position:absolute;inset-inline-end:39px;top:128.6px;width:147px}.photo{aspect-ratio:1;overflow:hidden;border:1px solid #ffffff12}.photo{touch-action:pan-y}.slides{display:flex;height:100%;will-change:transform;direction:ltr}.slide{width:100%;height:100%;flex:0 0 100%}.photo img{object-fit:contain;background:#000;user-select:none}.actions{display:flex;gap:10px;align-items:stretch;margin-top:26.2px}.quantity{display:flex;align-items:center;background:#222;border-radius:5px;color:#7d7d7d}.quantity{width:109px;justify-content:center;height:44px}.quantity button{background:none;color:inherit;border:0;padding:0;width:32px;height:44px;display:grid;place-items:center;font-size:20px}.quantity output{font-size:16px}.quantity output{min-width:20px;text-align:center;font-family:'TW Roboto Mono',monospace}.actions .button{flex:1;background:#fff;color:#000;font-family:'TW Roboto Mono',monospace;font-size:16px;border-radius:4px;padding:12px 20px;line-height:20px;height:44px}.actions .button:hover{background:var(--tw-accent)}.message{margin-top:16px;color:#bfbfbf;font-size:12px}.native{margin-top:0}::slotted(form){width:100%}
    @media(max-width:809px){.section{padding:120px 0 100px}.card{padding:39px;min-height:705px;max-width:100%}h2{font-size:44px;max-width:none}.description{font-size:16px;max-width:none}.specs{margin-top:290.4px;max-width:none}.specs-toggle{background:none;border:0;padding:0;cursor:pointer;color:inherit;font:inherit;text-decoration:inherit}.specs h3{position:absolute;top:123px;inset-inline-start:39px;inset-inline-end:auto;font-size:16px}.specs li{font-size:16px}.gallery{inset-inline-start:39px;inset-inline-end:auto;top:175px;width:200px}.specs ul{max-width:none;padding:0}.price{font-size:20px}.actions{margin-top:24px;flex-direction:column;gap:10px}.quantity{width:100%;justify-content:space-around;height:45px}.quantity button{height:45px;width:60px}.actions .button{font-size:16px;padding:11px 32px 12px;flex:none}.colors{gap:8px}.color{font-size:14px}}
    .card.real-product .gallery{top:calc(var(--header-bottom,110px) + 19px)}
    @media(max-width:809px){.card.real-product .gallery{top:calc(var(--header-bottom,109px) + 66px)}.card.real-product .specs h3{top:calc(var(--header-bottom,109px) + 14px)}}
    :host([dir=rtl]) .card{min-height:0}:host([dir=rtl]) .specs li{align-items:flex-start}

    .spec-dialog{background:transparent;color:inherit;border:0;padding:0;width:390px;max-width:calc(100vw - 40px);max-height:90svh;overflow:auto;scrollbar-width:none}.spec-dialog::backdrop{background:rgba(0,0,0,.8)}.spec-dialog h2{font-size:44px;text-align:center;max-width:none;margin-bottom:20px}.spec-group{border:1px solid #ffffff20;border-radius:4px;background:#000;margin-top:4px;padding:16px 17px}.spec-heading{font-family:'TW Instrument',serif;font-size:20px;line-height:24px;letter-spacing:-.04em;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:start;background:none;border:0;padding:0;color:inherit;width:100%}.spec-plus{position:relative;width:16px;height:16px;flex:none}.spec-plus::before,.spec-plus::after{content:'';position:absolute;inset:7px 1px auto;height:1px;background:#bfbfbf}.spec-plus::after{transform:rotate(90deg);transition:transform .3s ease}.spec-heading[aria-expanded=true] .spec-plus::after{transform:rotate(0)}.spec-panel{display:grid;grid-template-rows:0fr;transition:grid-template-rows .35s cubic-bezier(.22,1,.36,1)}.spec-panel.expanded{grid-template-rows:1fr}.spec-panel-inner{min-height:0;overflow:hidden}.spec-body{border-top:1px solid #ffffff10;margin-top:16px;padding-top:10px;display:flex;flex-direction:column;gap:4px}.spec-dialog.closing::backdrop{background:transparent}.spec-dialog::backdrop{transition:background .2s ease}.spec-heading:focus-visible,.spec-close:focus-visible{outline:1px solid var(--tw-accent);outline-offset:4px}@media(prefers-reduced-motion:reduce){.spec-panel,.spec-plus::after,.spec-dialog::backdrop{transition:none}}.spec-body p,.spec-row{font-family:'TW Roboto Mono',monospace;font-size:14px;line-height:19.6px;color:#bfbfbf}.spec-body p:first-child,.spec-body .spec-gap+p{color:#505050;font-size:16px;margin-bottom:4px}.spec-row{display:grid;grid-template-columns:1fr 1.15fr;gap:12px}.spec-gap{height:8px}.spec-close{display:block;margin:24px auto 0;background:none;border:0;color:#bfbfbf;text-decoration:underline;font-family:'TW Roboto Mono',monospace;font-size:16px;line-height:20px}.spec-close:hover{color:var(--tw-accent)}
  `];
let d = y;
g([
  f()
], d.prototype, "selected");
g([
  f()
], d.prototype, "quantity");
g([
  f()
], d.prototype, "notice");
g([
  f()
], d.prototype, "optionImage");
g([
  f()
], d.prototype, "activeSpec");
typeof d < "u" && d.registerSallaComponent("salla-tarwadah-buy-now");
export {
  d as default
};
