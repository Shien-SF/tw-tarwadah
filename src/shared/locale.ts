export type Language = 'ar' | 'en';
export function language(): Language {
  // The SDK changes its preview language through storage/config messages; the
  // iframe's HTML lang can remain Arabic while its rendered fields are English.
  if(typeof window!=='undefined'&&(window as any).customComponentsRaw){
    const demo=localStorage.getItem('salla_demo_lang');
    if(demo==='ar'||demo==='en')return demo;
  }
  const sdk = typeof window !== 'undefined' ? ((window as any).salla || (window as any).Salla) : undefined;
  const current = sdk?.lang?.get?.() || (typeof document !== 'undefined' ? document.documentElement.lang : 'ar');
  return String(current).toLowerCase().startsWith('ar') ? 'ar' : 'en';
}
// Only scalar text may cross a text/attribute rendering boundary.
export function localizedString(value: unknown, lang: Language = language()): string {
  if (typeof value === 'string') return value;
  if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  if (!value || typeof value !== 'object' || Array.isArray(value)) return '';
  const translations = value as Record<string, unknown>;
  for (const key of [lang, 'en', 'ar']) {
    const text = translations[key];
    if (typeof text === 'string') return text;
    if (typeof text === 'number' && Number.isFinite(text)) return String(text);
  }
  return '';
}
export function localize(value: any, lang: Language): any {
  if (Array.isArray(value)) return value.map(item => localize(item, lang));
  if (!value || typeof value !== 'object') return value;
  if ('ar' in value || 'en' in value) return localizedString(value, lang);
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
