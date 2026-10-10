import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import type { Plugin } from 'vite';
import { createDemoHTML } from '@salla.sa/twilight-bundles/vite-plugins/demo';

// Keep the official SDK editor, but generate its two HTML entry points on demand.
// This avoids its malformed Windows /@fs paths and closeBundle() deleting the
// running dev server's temporary pages when another process builds the bundle.
export function tarwadahDemoPages(): Plugin {
  return {
    name: 'tarwadah-sdk-demo-pages',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const pathname = req.url?.split('?')[0];
        if(pathname?.startsWith('/demo-uploads/')){
          const name=pathname.slice('/demo-uploads/'.length);
          if(!/^[a-f0-9-]{36}\.(png|jpg|gif|webp)$/.test(name)){res.statusCode=404;return res.end();}
          if(req.method!=='GET'&&req.method!=='HEAD'){res.statusCode=405;return res.end();}
          try{
            const bytes=await readFile(resolve(server.config.root,'public/demo-uploads',name));
            const extension=name.split('.').pop()!;
            res.setHeader('Content-Type',`image/${extension==='jpg'?'jpeg':extension}`);
            res.setHeader('X-Content-Type-Options','nosniff');
            res.setHeader('Cache-Control','public, max-age=31536000, immutable');
            res.end(req.method==='HEAD'?undefined:bytes);
          }catch{res.statusCode=404;res.end();}
          return;
        }
        if (pathname === '/__tarwadah/uploads') {
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          const fail=(status:number,message:string)=>{res.statusCode=status;res.end(JSON.stringify({status,success:false,message}));};
          if(req.method!=='POST'){res.setHeader('Allow','POST');return fail(405,'Use POST to upload an image.');}
          const limit=10*1024*1024;
          try{
            const chunks:Buffer[]=[];let size=0;
            for await(const chunk of req){const data=Buffer.from(chunk);size+=data.length;if(size>limit+65536)return fail(413,'حجم الصورة يتجاوز 10 ميجابايت.');chunks.push(data);}
            const request=new Request('http://localhost/__tarwadah/uploads',{method:'POST',headers:{'Content-Type':req.headers['content-type']||''},body:new Uint8Array(Buffer.concat(chunks))});
            const form=await request.formData();const file=form.get('file');
            if(!file||typeof file==='string'||!file.size)return fail(400,'اختر صورة للرفع.');
            if(file.size>limit)return fail(413,'حجم الصورة يتجاوز 10 ميجابايت.');
            const bytes=Buffer.from(await file.arrayBuffer());
            const extension=bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))?'png':bytes[0]===255&&bytes[1]===216&&bytes[2]===255?'jpg':/^GIF8[79]a$/.test(bytes.subarray(0,6).toString())?'gif':bytes.subarray(0,4).toString()==='RIFF'&&bytes.subarray(8,12).toString()==='WEBP'?'webp':null;
            if(!extension)return fail(415,'استخدم صورة PNG أو JPEG أو GIF أو WebP.');
            const filename=`${randomUUID()}.${extension}`;
            const directory=resolve(server.config.root,'public/demo-uploads');
            await mkdir(directory,{recursive:true});await writeFile(resolve(directory,filename),bytes,{flag:'wx'});
            res.end(JSON.stringify({status:200,success:true,data:{url:`/demo-uploads/${filename}`}}));
          }catch{return fail(400,'تعذّر رفع الصورة. أعد اختيار الملف وحاول مجددًا.');}
          return;
        }
        if (pathname === '/node_modules/@salla.sa/twilight-bundles/dist/vite-plugins/_demo.js') {
          // SDK 0.1.63 shows an empty card when no customization has been saved,
          // even when every field already has a default. Fall back at its read
          // boundary, without writing over the merchant's saved configuration.
          const source = readFileSync(resolve(server.config.root, 'node_modules/@salla.sa/twilight-bundles/dist/vite-plugins/_demo.js'), 'utf8');
          const original = 'if (!t)\n      return "";\n    let a;';
          const replacement = `if (!t) {
      const fields = window.customComponentsRaw?.[e]?.fields || [];
      const defaults = Object.fromEntries(fields.map(field => [field.id, field.value]));
      return this.htmlSafeString(JSON.stringify(this.prepareDataForRendering(defaults)));
    }
    let a;`;
          if (!source.includes(original)) return next(new Error('The SDK default-data adapter needs updating for this SDK version.'));
          res.setHeader('Content-Type', 'text/javascript; charset=utf-8');
          const labels = JSON.stringify({ 'tarwadah-morae': 'ترواده — الصفحة الكاملة', 'tarwadah-compact': 'ترواده — الصفحة المختصرة' });
          const adapted = source.replace(original, replacement).replace('src="./preview.html"', 'src="/node_modules/.salla-temp/preview.html"')
            .replace('upload-url="${window.formBuilderMockUrl}/uploader"', 'upload-url="/__tarwadah/uploads"')
            .replace('<span class="visibility-item-name">${t.name}</span>', '<span class="visibility-item-name">${t.rawComponent?.title || window.customComponentsRaw?.[t.name]?.title || t.name}</span>')
            .replace('`${(n = window.customComponentsRaw[e]) == null ? void 0 : n.title} - ${e}`', '`${(n = window.customComponentsRaw[e]) == null ? void 0 : n.title}`')
            .replace('buildSwitcherContent(e, t, a) {', `buildSwitcherContent(e, t, a) {
    if (a !== undefined) { const category=t; t=(${labels})[a] || a; a=category; }`)
            .replace('a.textContent = h ? h.name : r || s.templateSwitcherPlaceholder;', `a.textContent = (${labels})[r] || r || s.templateSwitcherPlaceholder;`);
          return res.end(adapted);
        }
        if (pathname !== '/editor.html' && pathname !== '/node_modules/.salla-temp/index.html' && pathname !== '/node_modules/.salla-temp/preview.html') return next();
        try {
          const bundle = JSON.parse(readFileSync(resolve(server.config.root, 'twilight-bundle.json'), 'utf8'));
          const components = bundle.components.map((component: any, order: number) => ({
            name: component.name,
            path: resolve(server.config.root, 'src/components', component.name, 'index.ts'),
            url: `/src/components/${component.name}/index.ts`,
            rawComponent: component,
            schema: JSON.stringify([...component.fields, { id: 'twilight-bundles-component-name', type: 'string', format: 'hidden', value: component.name }]),
            order,
          }));
          let html = createDemoHTML(components, {
            grid: { columns: 'repeat(1, 1fr)', gap: '0', minWidth: '300px' },
            css: 'body{background:#000} .component-container{margin:0;padding:0} .components-grid{overflow:visible!important;gap:0!important;padding:0!important} salla-demo-component-card{display:block} .component-card{margin:0!important;padding:0!important}', js: '',
            formbuilder: { languages: ['ar', 'en'], defaultLanguage: 'ar' },
            twilightBundles: bundle,
          }, pathname === '/editor.html' || pathname.endsWith('/index.html') ? 'shell' : 'preview');
          if (pathname === '/editor.html') html = html.replace(/src="preview\.html/g, 'src="/node_modules/.salla-temp/preview.html');
          for (const component of bundle.components) {
            html = html.replaceAll(`<span class="visibility-item-name">${component.name}</span>`, `<span class="visibility-item-name">${component.title}</span>`);
          }
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end(await server.transformIndexHtml(pathname, html));
        } catch (error) { next(error as Error); }
      });
    },
  };
}
