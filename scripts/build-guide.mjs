import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
const bundle = JSON.parse(readFileSync('twilight-bundle.json', 'utf8'));
const catalog = JSON.parse(readFileSync('docs/components.json', 'utf8'));
const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fieldHelp = {
  title:'عنوان العنصر الظاهر للزائر. اجعله قصيرًا ومعبّرًا.', product_name:'اسم تجريبي يظهر قبل اختيار منتج؛ عند الربط يُستخدم اسم المنتج الحقيقي.',
  note:'نص داعم قصير أعلى المقدمة.', accent_text:'عبارة قصيرة بلون التمييز.', description:'وصف مختصر يشرح المنتج أو الفائدة.',
  cta_label:'النص الظاهر على الزر.', cta_target:'معرف قسم موجود في نفس الصفحة، بدون #؛ الرابط المستقل بديل عند غيابه.',
  cta_url:'رابط HTTPS أو مسار يبدأ بـ / داخل المتجر. يُستخدم إذا لم يوجد القسم المستهدف.',
  product_url:'رابط تفاصيل المنتج؛ عند غياب القسم المستهدف تكون له الأولوية على رابط المنتج القادم من سلة.',
  target:'معرف القسم المستهدف داخل الصفحة. لا يلزم إضافته عند استخدام رابط مستقل أو رابط منتج سلة.',
  scroll_label:'نص رابط المزيد؛ يظهر عندما يوجد عنصر أبرز تفاصيل المنتج في الصفحة.',
  video:'رابط HTTPS مباشر لملف فيديو قابل للتشغيل في المتصفح، وليس صفحة مشاركة أو تحميل.',
  poster:'صورة تظهر قبل تحميل الفيديو أو عند تعذر تشغيله.', image:'رابط صورة عامة عبر HTTPS؛ راجع اقتراحات الصور الخاصة بالعنصر.',
  intro_image:'الصورة المعروضة قبل بدء تسلسل المميزات.', images:'قائمة الصور. عدّل كل صورة ووصفها البديل.',
  items:'قائمة محتوى العنصر. أضف أو احذف أو رتّب العناصر من المحرر، ثم عدّل الحقول الداخلية أدناه.',
  alt:'وصف بديل يشرح الصورة لقارئ الشاشة، وليس اسم ملف الصورة.', eyebrow:'عنوان صغير يمهّد للمحتوى.', label:'وصف واضح للقسم ويساعد على التعرف عليه.',
  caption:'عبارة ختامية قصيرة.', text:'النص الأساسي؛ لا يحتاج إلى HTML.', quote:'رأي حقيقي مصرح بعرضه؛ استبدل النص التجريبي.', author:'اسم صاحب الرأي بموافقته.',
  price:'سعر للمعاينة فقط. عند ربط منتج يُستخدم سعره الحقيقي.', colors:'وصف ألوان تجريبي يُخفى عند ربط منتج حقيقي.',
  product:'اختر منتجًا فعليًا من متجرك؛ لا تكتب الرابط أو الاسم بدلًا من الاختيار.',
  specs:'المواصفات المختصرة التي تظهر في البطاقة.', specs_label:'عنوان المواصفات المختصرة.', color_label:'عنوان خيارات الألوان التجريبية.',
  quantity_label:'اسم حقل الكمية لقارئ الشاشة.', variants:'صور وأسماء ألوان تجريبية تُستخدم عند غياب ربط المنتج.', name:'اسم اللون التجريبي.', color:'لون عينة المعاينة.',
  detailed_specs:'مجموعات المواصفات داخل النافذة. عدّل عنوان ونص كل مجموعة.', body:'نص المواصفة؛ سطر جديد لكل بند. استخدم الصيغة: اسم البند | قيمته لعرض عمودين.',
  details_title:'عنوان نافذة المواصفات.', close_label:'نص إغلاق النافذة.', details_label:'نص فتح تفاصيل المواصفات.', detail_label:'نص رابط تفاصيل المنتج.',
  play_label:'نص زر تشغيل الفيديو.', pause_label:'نص زر إيقاف الفيديو.',
  preview_message:'رسالة توضّح أن الإضافة التجريبية لا تمثل شراءً فعليًا.', demo_message:'رسالة ضرورة اختيار منتج حقيقي قبل تفعيل الشراء على المتجر.', loading_message:'رسالة انتظار جلب المنتج.', error_message:'رسالة تعذر تحميل المنتج.',
  unavailable_message:'رسالة عدم توفر المنتج.', sold_out_label:'نص نفاد المخزون.', missing_product_message:'رسالة ضرورة اختيار منتج.',
  background:'لون خلفية العنصر فقط.', foreground:'لون النص. راجع التباين مع الخلفية.', accent:'لون التمييز والروابط وحالات التركيز.',
};
function rows(fields, parent = '') {
  return fields.flatMap(field => {
    const id = field.id.split('.').at(-1);
    const label = `${parent}${typeof field.label === 'string' ? field.label : field.label?.ar || id}`;
    return [[label, fieldHelp[id] || `إعداد «${label}»؛ عدّله ثم عاين أثره قبل الحفظ.`, field.multilanguage ? 'عربي / إنجليزي' : 'مشترك'], ...(field.fields ? rows(field.fields, `${label} ← `) : [])];
  });
}
const intro = `# ملمح — دليل الاستخدام\n\nمجموعة من تسعة عناصر مستقلة لعرض تفاصيل المنتجات. تضيف العناصر داخل ثيم متجرك؛ لا تتضمن صفحة هبوط أو هيدرًا أو فوترًا.\n\n## البدء\n\n1. ثبّت المجموعة على متجرك من واجهة سلة بعد إتاحتها لك.\n2. افتح تخصيص الثيم، ثم أضف العنصر المطلوب من قائمة العناصر. قد تختلف تسمية القوائم حسب الثيم.\n3. افتح إعدادات العنصر، واستبدل المحتوى التجريبي بمحتوى متجرك.\n4. عدّل النصوص لكل من AR وEN. الصور والفيديوهات والألوان ومعرّفات الأقسام مشتركة بين اللغتين.\n5. احفظ وعاين على الجوال والحاسوب، ثم تحقّق من الروابط والشراء قبل إظهار التغييرات للعملاء.\n\n## إعدادات مشتركة\n\n- يمكنك استخدام أي عنصر منفردًا، أو ترتيب عدة عناصر حسب حاجة متجرك. لا يوجد ترتيب إلزامي.\n- روابط الوسائط يجب أن تكون HTTPS عامة ودائمة. المسارات من جهازك أو localhost أو /demo-uploads/ لا تصلح للمتجر.\n- استخدم صورًا وفيديوهات تملك حقوق استخدامها. الصور والآراء الافتراضية للمعاينة ويجب استبدالها.\n- استعمل ألوانًا ذات تباين واضح. اتجاه النص يتكيف مع العربية والإنجليزية. العناصر تحترم تقليل الحركة في نظام الزائر.\n- اختيار المنتج مستقل لكل عنصر. إذا استخدمت الشريط وبطاقة الشراء لنفس المنتج، اختره في كل منهما صراحةً.\n- كل زر له قسم مستهدف ينتقل إليه إن وجد، ثم يستخدم الرابط المستقل عند غيابه. عند عدم توفر مقصد صالح يختفي رابط الإجراء.\n\n`;
let markdown = intro;
for (const item of catalog) {
  const component = bundle.components.find(c => c.name === item.name);
  markdown += `## ${item.title}\n\n${item.description}\n\n![تصميم ${item.title}](screenshots/${item.name}.png)\n\n### طريقة الاستخدام\n\n${item.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\n**الوسائط المناسبة:** ${item.media}\n\n**الاستخدام المستقل:** ${item.standalone}\n\n### الإعدادات\n\n| الحقل | طريقة الاستخدام | اللغة |\n| --- | --- | --- |\n${rows(component.fields).map(row => `| ${row.map(v => v.replaceAll('|', '／')).join(' | ')} |`).join('\n')}\n\n`;
}
markdown += `## حل المشكلات\n\n| المشكلة | الإجراء |\n| --- | --- |\n| الصورة لا تظهر | افتح رابط الصورة في نافذة خاصة وتأكد من HTTPS وأنه رابط الصورة نفسها. |\n| الفيديو لا يعمل | استخدم MP4 مباشرًا، واختبر الرابط دون تسجيل دخول، وراجع صورة الغلاف. |\n| زر المقدمة أو الشريط غير ظاهر | أضف رابطًا مستقلًا صالحًا، أو قسمًا موجودًا بالمعرف المحدد. الشريط يمكنه استخدام رابط منتج سلة بعد اختياره. |\n| بيانات المنتج لا تظهر | تأكد من اختيار منتج منشور ومتاح في كل عنصر، ثم جرّب تحديث المعاينة. |\n| الإضافة إلى السلة معطلة | اختر منتجًا فعليًا، واستكمل خياراته المطلوبة، وراجع المخزون والكمية. |\n| حركة العنصر متوقفة | تحقق من إعداد تقليل الحركة في الجهاز؛ التوقف في هذه الحالة مقصود. |\n| التعديل لا يظهر في اللغة الأخرى | عدّل نفس الحقل من تبويب اللغة الأخرى واحفظ. |\n\n## اختبار قبل النشر\n\nاختبر كل عنصر منفردًا في الثيم، العربية والإنجليزية، الجوال والحاسوب، لوحة المفاتيح وتقليل الحركة. لعنصر الشراء اختبر الخيارات المطلوبة والسعر والكمية والمخزون والإضافة إلى السلة. المعاينة المحلية لا تنفذ عملية شراء حقيقية.\n\n## الدعم\n\nالبريد: ${bundle.author_email}\n\nالموقع: ${bundle.support_url}\n\nعند طلب المساعدة أرسل اسم العنصر، خطوات إعادة المشكلة، المتصفح وحجم الشاشة، وصورة توضّح المشكلة. لا ترسل كلمات المرور أو مفاتيح المتجر.\n`;
mkdirSync('docs', {recursive:true}); writeFileSync('docs/merchant-guide.md', markdown);
// Small controlled Markdown renderer: authored text is escaped before markup.
let table = false;
const inline = value => escape(value).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
const html = markdown.split('\n').map(line => {
  if (line.startsWith('|')) {
    if (/^\|[\s:|-]+\|$/.test(line)) return '';
    const opening = !table; table = true;
    const cells = line.split('|').slice(1,-1).map(v => `<${opening?'th':'td'}>${inline(v.trim())}</${opening?'th':'td'}>`).join('');
    return `${opening?'<div class="table"><table>':''}<tr>${cells}</tr>`;
  }
  const end = table ? '</table></div>' : ''; table = false;
  if (!line.trim()) return end;
  const image = line.match(/^!\[(.*?)\]\((.*?)\)$/);
  if (image) return `${end}<figure><img loading="lazy" src="${escape(image[2])}" alt="${escape(image[1])}"><figcaption>${escape(image[1])} — محتوى تجريبي لتوضيح التصميم</figcaption></figure>`;
  const heading = line.match(/^(#{1,3}) (.*)$/);
  if (heading) return `${end}<h${heading[1].length}>${inline(heading[2])}</h${heading[1].length}>`;
  return `${end}<p>${inline(line)}</p>`;
}).join('\n');
writeFileSync('docs/merchant-guide.html', `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>ملمح — دليل الاستخدام</title><style>body{margin:0;background:#f4f3ef;color:#242424;font:16px/1.9 Tahoma,Arial,sans-serif}main{max-width:1060px;margin:auto;padding:40px 24px 100px}h1{font-size:38px}h2{border-top:2px solid #ddd;padding-top:32px;margin-top:64px}h3{margin-top:30px}figure{margin:24px 0}img{width:100%;height:auto;border:1px solid #ddd;border-radius:8px}figcaption{color:#555;font-size:13px}.table{overflow:auto}table{border-collapse:collapse;width:100%;background:#fff}td,th{text-align:right;border:1px solid #ddd;padding:12px;vertical-align:top}th{background:#e8e6df}p{margin:10px 0}@media print{body{background:#fff}h2{break-before:page}tr,figure{break-inside:avoid}main{padding:0}}</style></head><body><main>${html}</main></body></html>`);
console.log('Merchant guide generated: 9 components, every schema field, setup, media advice and troubleshooting.');
