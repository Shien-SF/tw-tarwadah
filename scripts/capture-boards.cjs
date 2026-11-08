async page => {
  await page.setViewportSize({width:1600,height:1200});
  const names=['hero','product-strip','highlights','sound','gallery','features','video','testimonials','buy-now'];
  for(const name of names){
    await page.goto('http://127.0.0.1:5173/docs/screenshot-board.html?component=tarwadah-'+name);
    await page.evaluate(async()=>{await Promise.all([...document.images].map(image=>image.decode()));await document.fonts.ready;});
    await page.evaluate(()=>scrollTo(0,0));
    await page.waitForTimeout(300); // Let image-heavy boards finish rasterizing before export.
    await page.screenshot({path:'docs/screenshots/tarwadah-'+name+'.png'});
  }
  await page.goto('http://127.0.0.1:5173/docs/merchant-guide.html');
  const guide=await page.evaluate(()=>({headings:document.querySelectorAll('h2').length,images:document.images.length,fields:document.querySelectorAll('td').length/3}));
  await page.setViewportSize({width:390,height:844});
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
  return {screenshots:9,guide,mobileGuideOverflow:overflow};
}
