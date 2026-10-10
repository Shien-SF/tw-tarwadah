// Measured from MORAE's authored Framer targets, rather than guessed viewport curves.
export const clamp = (value:number) => Math.max(0,Math.min(1,value));
export const heroFrame = (travel:number,duration:number) => clamp(travel/710)*duration;
export const heroScale = (travel:number,height:number) => 1-.2*clamp(travel/Math.max(1,Math.round(height)-1));
// Framer offsets authored targets by one pixel and reads integer clientHeight.
export const targetProgress = (top:number,height:number,viewport:number,threshold=1) => clamp((viewport*threshold-top+1)/Math.max(1,Math.round(height)));
export const highlightTravel = (scroll:number,mobile=false) => [mobile?97:95,90,mobile?99:112].map(speed=>scroll*(1-speed/100));
export const galleryTargets = [{scale:.45,x:-186,y:131},{scale:1.65,x:136,y:167},{scale:.61,x:85,y:132}];
export const galleryFrame = (progress:number,width=1440) => galleryTargets.map(start=>({scale:width<=809?.5:width<=1199?.7:start.scale+(1-start.scale)*progress,x:start.x*(1-progress),y:start.y*(1-progress)}));
export const reviewTravel = (progress:number) => [-910*progress,919*progress];
