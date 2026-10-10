import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import assert from 'node:assert/strict';

const source=fs.readFileSync('src/shared/reference-motion.ts','utf8');
const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
const context={exports:{}};vm.runInNewContext(compiled,context);
const motion=context.exports;
const near=(actual,expected,tolerance=.00001)=>assert.ok(Math.abs(actual-expected)<tolerance,`${actual} differs from reference ${expected}`);
// These are DOM observations from the original site at 1440×1000 and 390×844.
near(motion.heroFrame(500,8),5.633802);
near(motion.heroFrame(710,8),8);
near(motion.heroScale(500,1750),.942824);
[100,200,-240].forEach((expected,i)=>near(motion.highlightTravel(2000)[i],expected));
[52.5,175,17.5].forEach((expected,i)=>near(motion.highlightTravel(1750,true)[i],expected));
const gallery=motion.galleryFrame(motion.targetProgress(523,1245,1000));
near(gallery[0].scale,.661165);near(gallery[0].x,-114.588, .001);
near(gallery[1].scale,1.40044);near(gallery[2].scale,.759735);
// Responsive Framer overrides keep a fixed scale throughout the scroll.
for(const progress of [0,.5,1]){
  motion.galleryFrame(progress,390).forEach(image=>near(image.scale,.5));
  motion.galleryFrame(progress,1024).forEach(image=>near(image.scale,.7));
}
const reviews=motion.reviewTravel(motion.targetProgress(0,1115.796875,1000));
near(reviews[0],-816.2276,.001);near(reviews[1],824.3002,.001);
assert.equal(motion.targetProgress(2000,1245,1000),0);
assert.equal(motion.targetProgress(-2000,1245,1000),1);
console.log('Motion checked against reference observations: hero scrub, desktop/mobile parallax, gallery transforms, opposing review rows and target boundaries.');
