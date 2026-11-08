import './components/tarwadah-hero';
import './components/tarwadah-product-strip';
import './components/tarwadah-highlights';
import './components/tarwadah-sound';
import './components/tarwadah-gallery';
import './components/tarwadah-features';
import './components/tarwadah-video';
import './components/tarwadah-testimonials';
import './components/tarwadah-buy-now';
import defaults from './shared/defaults.json';
import catalog from '../docs/components.json';
import { mergePreviewConfig } from './shared/preview-config';

document.body.dataset.tarwadahPreview = 'true';
const query = new URLSearchParams(location.search);
const lang = query.get('lang') === 'en' ? 'en' : 'ar';
document.documentElement.lang = lang;
document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
const style = document.createElement('style');
style.textContent = `body{margin:0;background:#101010;color:#fff;font:16px/1.7 Tahoma,Arial,sans-serif}*{box-sizing:border-box}a{color:inherit}header{padding:24px max(20px,calc((100vw - 1200px)/2));border-bottom:1px solid #333}h1{margin:0;font-size:30px}.catalog{max-width:1200px;margin:40px auto;padding:0 20px;display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px}.card{display:block;border:1px solid #444;padding:24px;text-decoration:none;border-radius:8px}.card:hover{border-color:#fc721b}.card h2{font-size:20px}.card p{color:#ccc}.stage{background:#000;overflow:clip;min-height:120px}a:focus-visible{outline:3px solid #fc721b;outline-offset:4px}.preview-note{margin:0;color:#bbb;font-size:13px}.toolbar{display:flex;gap:20px;flex-wrap:wrap}body[data-capture] header{display:none}`;
document.head.append(style);
const header = document.createElement('header');
const heading = document.createElement('h1');
heading.textContent = lang === 'ar' ? 'ملمح — العناصر المستقلة' : 'Malmah — standalone components';
header.append(heading);
const toolbar = document.createElement('nav'); toolbar.className = 'toolbar'; toolbar.setAttribute('aria-label', lang === 'ar' ? 'روابط المعاينة' : 'Preview navigation');
for (const [href, title] of [['/', 'جميع العناصر'], ['/editor.html', 'محرر الإعدادات'], ['/docs/merchant-guide.html', 'دليل الاستخدام'], [`?${new URLSearchParams({...Object.fromEntries(query), lang: lang === 'ar' ? 'en' : 'ar'})}`, lang === 'ar' ? 'English' : 'العربية']]) {
  const link = document.createElement('a'); link.href = href; link.textContent = title; toolbar.append(link);
}
header.append(toolbar); document.body.append(header);
const selected = catalog.find(item => item.name === query.get('component'));
if (selected) {
  document.title = `ملمح — ${selected.title}`;
  const note = document.createElement('p'); note.className = 'preview-note'; note.textContent = lang === 'ar' ? `${selected.title}: ${selected.description} — معاينة تجريبية لعنصر واحد؛ لا تمثل متجرًا فعليًا.` : `${selected.title_en}: ${selected.description_en} — isolated demo; not a live store.`; header.append(note);
  const stage = document.createElement('main'); stage.className = 'stage';
  const element = document.createElement(`salla-${selected.name}`);
  const section = selected.name.replace('tarwadah-', '') as keyof typeof defaults;
  (element as any).config = query.get('draft') === '1' ? mergePreviewConfig(defaults[section], localStorage.getItem(`form-builder::data_${selected.name}`)) : defaults[section];
  stage.append(element); document.body.append(stage);
} else {
  const main = document.createElement('main'); main.className = 'catalog';
  for (const item of catalog) {
    const link = document.createElement('a'); link.className = 'card'; link.href = `/?component=${item.name}&lang=${lang}`;
    const title = document.createElement('h2'); title.textContent = lang === 'ar' ? item.title : item.title_en;
    const text = document.createElement('p'); text.textContent = lang === 'ar' ? item.description : item.description_en;
    link.append(title, text); main.append(link);
  }
  document.body.append(main);
}
if (query.get('capture') === '1') document.body.dataset.capture = 'true';
