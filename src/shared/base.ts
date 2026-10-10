import { LitElement, css, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import defaults from './defaults.json';
import { language, localize, watchLanguage } from './locale';
import { useSmoothScroll, smoothTo } from './smooth-scroll';
import { useReferenceCursor } from './cursor';
import { revealContent } from './motion';

export type SectionName = keyof typeof defaults;
export type Config = Record<string, any>;

// Salla supplies its Lit registration hook in the storefront import map.
// The fallback lets the very same components run in the standalone local preview.
export class TarwadahElement extends LitElement {
  @property({ type: Object }) config: Config = {};
  protected section: SectionName = 'hero';
  private stopLanguage?:()=>void;
  private stopCursor?:()=>void;
  private stopScroll?:()=>void;
  private stopReveal?:()=>void;
  private connection=0;
  protected get settings(): Config { return localize({ ...defaults[this.section], ...this.config },language()); }
  protected get ui() {return language()==='ar'?{decrease:'تقليل الكمية',increase:'زيادة الكمية',pause:'إيقاف حركة الآراء',resume:'استئناف حركة الآراء'}:{decrease:'Decrease quantity',increase:'Increase quantity',pause:'Pause testimonials',resume:'Resume testimonials'};}

  static registerSallaComponent(name: string) {
    const register = (LitElement as typeof LitElement & { registerSallaComponent?: (name: string) => void }).registerSallaComponent;
    if (register) register.call(this, name);
    else if (!customElements.get(name)) customElements.define(name, this);
  }

  connectedCallback() {
    super.connectedCallback();
    const connection=++this.connection;
    this.dataset.section = this.section;
    this.stopCursor=useReferenceCursor();
    this.updateDirection();
    this.stopLanguage=watchLanguage(()=>{this.requestUpdate();this.updateComplete.then(()=>{if(this.isConnected)this.restartMotion();});});
    this.updateComplete.then(() => { if (this.isConnected&&connection===this.connection) {this.stopScroll=useSmoothScroll(this);this.restartMotion();} });
    if (!document.getElementById('tarwadah-fonts')) {
      const style = document.createElement('style');
      style.id = 'tarwadah-fonts';
      style.textContent = `
        @font-face{font-family:'TW Instrument';src:url('https://fonts.gstatic.com/s/instrumentserif/v5/jizBRFtNs2ka5fXjeivQ4LroWlx-2zcZj1bIkNo.woff2');font-display:swap}
        @font-face{font-family:'TW Mono';src:url('https://fonts.gstatic.com/s/fragmentmono/v6/4iCr6K5wfMRRjxp0DA6-2CLnB4NHhg.woff2');font-display:swap}
        @font-face{font-family:'TW Roboto Mono';src:url('https://fonts.gstatic.com/s/robotomono/v31/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_3vqPRu-5Ip2sSQ.woff2');font-display:swap}
        @font-face{font-family:'TW Satoshi';src:url('https://framerusercontent.com/third-party-assets/fontshare/wf/P2LQKHE6KA6ZP4AAGN72KDWMHH6ZH3TA/ZC32TK2P7FPS5GFTL46EU6KQJA24ZYDB/7AHDUZ4A7LFLVFUIFSARGIWCRQJHISQP.woff2');font-weight:400 700;font-display:swap}
      `;
      document.head.append(style);
    }
  }

  protected startMotion() {}
  private restartMotion(){this.startMotion();this.stopReveal?.();this.stopReveal=revealContent(this.renderRoot);}
  disconnectedCallback(){this.connection++;this.stopLanguage?.();this.stopCursor?.();this.stopScroll?.();this.stopReveal?.();super.disconnectedCallback();}

  protected updated(_changed: PropertyValues) {
    this.updateDirection();
    if (_changed.has('config')) this.restartMotion();
    const s = this.settings;
    this.style.setProperty('--tw-bg', s.background || '#000000');
    this.style.setProperty('--tw-ink', s.foreground || '#ffffff');
    this.style.setProperty('--tw-accent', s.accent || '#fc721b');
  }

  private updateDirection() {
    const s = this.settings;
    const text = [s.title, s.text, s.description, s.eyebrow,s.label,s.items?.[0]?.title].filter(Boolean).join(' ');
    // The dashboard language must not mirror an English reference layout.
    // Arabic merchant content still uses the theme's natural RTL flow.
    this.dir = /[\u0600-\u06ff]/.test(text) ? 'rtl' : 'ltr';
  }

  protected jump(target: string) {
    const id = target.replace(/^#/, '');
    const element = document.getElementById(id) || Array.from(document.querySelectorAll<TarwadahElement>('[data-section]')).find(e => e.dataset.section === id);
    if(element)smoothTo(element);
  }
}

export const sharedStyles = css`
  :host{display:block;color:var(--tw-ink,#fff);background:var(--tw-bg,#000);font-family:var(--tw-body-font,'TW Satoshi',var(--font-main,Arial)),sans-serif;box-sizing:border-box}
  *,*::before,*::after{box-sizing:border-box}h1,h2,h3,p,figure,blockquote{margin:0}button,a,input{font:inherit}button,a{-webkit-tap-highlight-color:transparent}button{cursor:pointer}a{color:inherit;text-decoration:none}button:disabled{cursor:not-allowed;opacity:.45}
  button:focus-visible,a:focus-visible,input:focus-visible,summary:focus-visible,video:focus-visible{outline:2px solid var(--tw-accent);outline-offset:5px}img,video{display:block;width:100%;max-width:100%}img{height:100%;object-fit:cover}.wrap{max-width:1552px;margin-inline:auto;padding-inline:56px}.mono{font-family:var(--tw-mono-font,'TW Mono',monospace);font-size:14px;line-height:1.4}.muted{color:#9b9b9b}.eyebrow{font-size:14px;font-weight:500;margin-bottom:30px}.display{font-family:var(--tw-display-font,'TW Instrument',Georgia),serif;font-weight:400;letter-spacing:-.065em;line-height:.93}.button{display:inline-flex;justify-content:center;align-items:center;gap:12px;background:var(--tw-ink);color:var(--tw-bg);border:0;border-radius:2px;padding:14px 28px;font-family:var(--tw-mono-font,'TW Mono',monospace);font-size:14px;transition:background .2s}.button:hover{background:var(--tw-accent);color:#000}
  :host([dir=rtl]) h1,:host([dir=rtl]) h2,:host([dir=rtl]) h3,:host([dir=rtl]) p,:host([dir=rtl]) button,:host([dir=rtl]) a,:host([dir=rtl]) li,:host([dir=rtl]) blockquote,:host([dir=rtl]) figcaption{font-family:var(--font-main,Tahoma),sans-serif;letter-spacing:0;line-height:1.5}
  :host([dir=rtl]) h1.display{font-size:44px;line-height:1.25}:host([dir=rtl]) .scroll{white-space:nowrap;font-size:14px}
  :host([dir=rtl]) .text{font-size:64px;line-height:1.2}
  @media(max-width:767px){.wrap{padding-inline:20px}.mono{font-size:12px}.eyebrow{margin-bottom:24px}:host([dir=rtl]) h1.display{font-size:36px}:host([dir=rtl]) .text{font-size:32px}}
  @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
`;
