import { T as g, l as p } from "./base-Dfz21CDO.js";
import { state as d } from "lit/decorators.js";
function m(e) {
  const r = Array.isArray(e) ? e[0] : e, o = Number(typeof r == "object" && r !== null ? r.value ?? r.id : r);
  return Number.isSafeInteger(o) && o > 0 ? o : 0;
}
async function y(e, t) {
  var n;
  if (!((n = e == null ? void 0 : e.product) != null && n.getDetails)) throw new Error("Storefront SDK unavailable");
  e.onReady && await new Promise((a) => e.onReady(a));
  const o = (await e.product.getDetails(t, ["images"])).data;
  if (!(o != null && o.id)) throw new Error("Product unavailable");
  return o;
}
function w(e, t, r) {
  if (e != null && e.enabled)
    return { id: "demo-mock-product", name: t, status: e.status === "available" ? "sale" : "out", price: Number(e.price) || 0, regular_price: e.isOnSale ? Number(e.regularPrice) || 0 : Number(e.price) || 0, is_on_sale: !!e.isOnSale, currency: "SAR", image: r ? { url: r } : void 0 };
}
var v = Object.defineProperty, l = (e, t, r, o) => {
  for (var n = void 0, a = e.length - 1, i; a >= 0; a--)
    (i = e[a]) && (n = i(t, r, n) || n);
  return n && v(t, r, n), n;
};
function u() {
  return window.salla || window.Salla;
}
let s, f = 0;
function b() {
  return (!s || Date.now() > f) && (f = Date.now() + 1200, s = fetch("/__salla_demo/product-settings").then((e) => e.ok ? e.json() : null).catch(() => null)), s;
}
const c = /* @__PURE__ */ new Map();
async function D(e) {
  return c.has(e) || c.set(e, y(u(), e).catch((t) => {
    throw c.delete(e), t;
  })), c.get(e);
}
class h extends g {
  constructor() {
    super(...arguments), this.productLoading = !1, this.productError = !1, this.demoProduct = !1, this.requestedId = -1, this.selectedChanged = () => {
      this.requestedId !== this.productId && (this.requestedId = this.productId, this.loadProduct());
    }, this.generation = 0;
  }
  get settings() {
    const t = super.settings;
    return !Object.hasOwn(this.config, "product_name") && Object.hasOwn(this.config, "title") && (t.product_name = t.title), t;
  }
  get productName() {
    var t;
    return p(!this.demoProduct && ((t = this.productData) == null ? void 0 : t.name) || this.settings.product_name || this.settings.title);
  }
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("tarwadah:product-change", this.selectedChanged), this.isDemo && (this.demoTimer = setInterval(() => {
      this.productId || this.loadDemoProduct();
    }, 1500));
  }
  get isDemo() {
    return !!(window.customComponentsRaw || document.body.dataset.tarwadahPreview);
  }
  async loadDemoProduct() {
    var t, r;
    if (this.isDemo)
      try {
        const o = await b();
        if (!o || !this.isConnected || this.productId) return;
        const n = this.settings, a = w(o, n.product_name || n.title, n.image || ((r = (t = n.variants) == null ? void 0 : t[0]) == null ? void 0 : r.image));
        JSON.stringify(a) !== JSON.stringify(this.productData) && (this.demoProduct = !!a, this.productData = a);
      } catch {
      }
  }
  get productUnavailable() {
    var t, r;
    return ((t = this.productData) == null ? void 0 : t.status) === "out" || ((r = this.productData) == null ? void 0 : r.status) === "out-and-notify";
  }
  get productId() {
    const t = m(this.settings.product);
    if (t) return t;
    for (const r of document.querySelectorAll('[data-section="buy-now"],[data-section="product-strip"]'))
      if (r !== this) {
        const o = m(r.config.product);
        if (o) return o;
      }
    return 0;
  }
  updated(t) {
    super.updated(t), this.selectedChanged(), t.has("config") && (document.dispatchEvent(new Event("tarwadah:product-change")), this.productId || this.loadDemoProduct());
  }
  async loadProduct() {
    const t = ++this.generation, r = this.productId;
    if (this.demoProduct = !1, this.productData = void 0, this.productError = !1, this.productLoading = !!r, !r) {
      await this.loadDemoProduct();
      return;
    }
    try {
      const o = await D(r);
      t === this.generation && this.isConnected && (this.productData = o);
    } catch {
      t === this.generation && this.isConnected && (this.productError = !0);
    } finally {
      t === this.generation && this.isConnected && (this.productLoading = !1);
    }
  }
  get formattedPrice() {
    var a;
    const t = this.productData;
    if (!t) return this.productId ? "" : p(this.settings.price);
    const r = t.sale_price ?? (typeof t.price == "object" ? t.price.amount : t.price) ?? 0, o = u();
    if ((a = o == null ? void 0 : o.money) != null && a.format) return o.money.format(r);
    const n = (typeof t.price == "object" ? t.price.currency : t.currency) || "SAR";
    return new Intl.NumberFormat(document.documentElement.lang || "ar", { style: "currency", currency: n }).format(r);
  }
  get formattedRegularPrice() {
    var i;
    const t = this.productData, r = t == null ? void 0 : t.regular_price, o = (t == null ? void 0 : t.sale_price) ?? (typeof (t == null ? void 0 : t.price) == "object" ? t.price.amount : t == null ? void 0 : t.price) ?? 0;
    if (!(t != null && t.is_on_sale) || !r || r <= o) return "";
    const n = u();
    if ((i = n == null ? void 0 : n.money) != null && i.format) return n.money.format(r);
    const a = (typeof t.price == "object" ? t.price.currency : t.currency) || "SAR";
    return new Intl.NumberFormat(document.documentElement.lang || "ar", { style: "currency", currency: a }).format(r);
  }
  disconnectedCallback() {
    this.generation++, this.requestedId = -1, clearInterval(this.demoTimer), document.removeEventListener("tarwadah:product-change", this.selectedChanged), super.disconnectedCallback();
  }
}
l([
  d()
], h.prototype, "productData");
l([
  d()
], h.prototype, "productLoading");
l([
  d()
], h.prototype, "productError");
export {
  h as T,
  u as s
};
