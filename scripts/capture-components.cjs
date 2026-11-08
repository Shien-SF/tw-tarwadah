// Run with: playwright-cli -s=malmah run-code --filename=scripts/capture-components.cjs
async page => {
  const names = ['hero','product-strip','highlights','sound','gallery','features','video','testimonials','buy-now'];
  const report = [];
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.emulateMedia({reducedMotion:'reduce'});
  for (const width of [1440,390,320]) {
    await page.setViewportSize({width,height:1000});
    for (const name of names) {
      await page.goto(`http://127.0.0.1:5173/?component=tarwadah-${name}&lang=ar&capture=1`, {waitUntil:'domcontentloaded'});
      await page.waitForSelector(`salla-tarwadah-${name}`);
      await page.evaluate(async name => {
        const element=document.querySelector(`salla-tarwadah-${name}`);
        if(name==='hero')element.config={...element.config,cta_url:'/products/demo'};
        if(name==='product-strip')element.config={...element.config,product_url:'/products/demo'};
        await element.updateComplete;
        await Promise.race([document.fonts.ready,new Promise(resolve=>setTimeout(resolve,4000))]);
        for(const image of element.shadowRoot.querySelectorAll('img'))image.loading='eager';
        await Promise.all([...element.shadowRoot.querySelectorAll('img')].map(image=>Promise.race([image.decode().catch(()=>{}),new Promise(resolve=>setTimeout(resolve,4000))])));
      },name);
      const dimensions=await page.evaluate(name=>{
        const element=document.querySelector(`salla-tarwadah-${name}`);
        return {pageOverflow:document.documentElement.scrollWidth>innerWidth,componentCount:document.querySelectorAll('[data-section]').length,images:[...element.shadowRoot.querySelectorAll('img')].map(image=>({src:image.getAttribute('src'),loaded:image.complete&&image.naturalWidth>0})),text:element.shadowRoot.textContent.replace(/\s+/g,' ').slice(-140)};
      },name);
      report.push({name,width,...dimensions});
      if(width!==320){
        await page.screenshot({path:`docs/screenshots/raw/tarwadah-${name}-${width===1440?'desktop':'mobile'}.png`,fullPage:true});
        if(name==='product-strip') await page.locator('.stage').screenshot({path:`docs/screenshots/raw/tarwadah-${name}-${width===1440?'desktop':'mobile'}-viewport.png`});
        else await page.screenshot({path:`docs/screenshots/raw/tarwadah-${name}-${width===1440?'desktop':'mobile'}-viewport.png`});
      }
    }
  }
  // Link fallback behavior must work without other bundle components.
  await page.goto('http://127.0.0.1:5173/?component=tarwadah-hero&capture=1');
  await page.evaluate(async()=>{const element=document.querySelector('salla-tarwadah-hero');element.config={...element.config,cta_url:'/products/demo'};await element.updateComplete;});
  const primary=page.locator('salla-tarwadah-hero').locator('a.button');
  if(await primary.getAttribute('href')!=='/products/demo')throw Error('Standalone hero fallback failed');
  await page.evaluate(async()=>{const element=document.querySelector('salla-tarwadah-hero');element.config={...element.config,cta_url:'javascript:alert(1)'};await element.updateComplete;});
  if(await primary.count())throw Error('Unsafe primary link rendered');
  await page.goto('http://127.0.0.1:5173/?component=tarwadah-product-strip&capture=1');
  await page.evaluate(async()=>{const element=document.querySelector('salla-tarwadah-product-strip');element.config={...element.config,product_url:'/products/demo'};await element.updateComplete;});
  if(await page.locator('salla-tarwadah-product-strip').locator('a.button').getAttribute('href')!=='/products/demo')throw Error('Standalone strip fallback failed');
  // Test two distinct product instances: neither may adopt its sibling's product.
  const independence=await page.evaluate(async()=>{
    const one=document.querySelector('salla-tarwadah-product-strip');
    const two=document.createElement('salla-tarwadah-product-strip');one.config={product:[{value:42}]};two.config={product:[]};document.querySelector('main').append(two);await Promise.all([one.updateComplete,two.updateComplete]);
    return [one.productId,two.productId];
  });
  if(independence.join(',')!=='42,0')throw Error('Product selection leaked between instances');
  for(const name of names){
    await page.goto(`http://127.0.0.1:5173/?component=tarwadah-${name}&lang=en&capture=1`);
    await page.locator(`salla-tarwadah-${name}`).waitFor();
    const direction=await page.locator(`salla-tarwadah-${name}`).getAttribute('dir');
    if(direction!=='ltr')throw Error(`English direction failed: ${name}`);
  }
  return {checked:report.length,failures:report.filter(item=>item.pageOverflow||item.componentCount!==1||item.images.some(image=>!image.loaded)),errors,independence};
}
