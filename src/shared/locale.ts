export type Language = 'ar' | 'en';
export function language(): Language {
  // The SDK changes its preview language through storage/config messages; the
  // iframe's HTML lang can remain Arabic while its rendered fields are English.
  if(typeof window!=='undefined'&&(window as any).customComponentsRaw){
    const demo=localStorage.getItem('salla_demo_lang');
    if(demo==='ar'||demo==='en')return demo;
  }
  return document.documentElement.lang.toLowerCase().startsWith('ar') ? 'ar' : 'en';
}
export function localize(value: any, lang: Language): any {
  if (Array.isArray(value)) return value.map(item => localize(item, lang));
  if (!value || typeof value !== 'object') return value;
  if ('ar' in value && 'en' in value) return value[lang] ?? value.en ?? value.ar;
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, localize(item, lang)]));
}
const listeners = new Set<() => void>();
let observer: MutationObserver | undefined;
export function watchLanguage(update: () => void) {
  listeners.add(update);
  if (!observer) {
    observer = new MutationObserver(() => listeners.forEach(listener => listener()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }
  return () => { listeners.delete(update); if (!listeners.size) { observer?.disconnect(); observer = undefined; } };
}
