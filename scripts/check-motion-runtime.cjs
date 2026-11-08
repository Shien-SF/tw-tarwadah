async page => {
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  const names=['hero','product-strip','highlights','sound','gallery','features','video','testimonials','buy-now'];
  const report=[];
  await page.emulateMedia({reducedMotion:'no-preference'});
  for(const width of [1440,390]){
    await page.setViewportSize({width,height:900});
    for(const name of names){
      await page.goto(`http://127.0.0.1:5173/?component=tarwadah-${name}&lang=ar&capture=1`);
      await page.locator(`salla-tarwadah-${name}`).waitFor();
      for(const progress of [0,.5,1])await page.evaluate(async progress=>{scrollTo(0,(document.documentElement.scrollHeight-innerHeight)*progress);await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));},progress);
      report.push({name,width,...await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,invalidTransforms:[...document.querySelector('[data-section]').shadowRoot.querySelectorAll('[style]')].some(el=>/NaN|Infinity/.test(el.getAttribute('style')))}))});
    }
  }
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('http://127.0.0.1:5173/?component=tarwadah-buy-now');
  const host=page.locator('salla-tarwadah-buy-now');
  const toggle=host.locator('.specs-toggle');await toggle.focus();await page.keyboard.press('Enter');
  const opened=await host.locator('dialog').evaluate(dialog=>dialog.open);
  await page.keyboard.press('Escape');
  const closed=await host.locator('dialog').evaluate(dialog=>!dialog.open);
  const restored=await toggle.evaluate(button=>button.getRootNode().activeElement===button);
  return {normalMotionCases:report.length,failures:report.filter(item=>item.overflow||item.invalidTransforms),errors,keyboardDialog:{opened,closed,focusRestored:restored}};
}
