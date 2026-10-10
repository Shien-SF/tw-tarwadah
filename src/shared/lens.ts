/** Pointer-driven image lens, with the original image as the no-WebGL fallback. */
export function imageLens(figure: HTMLElement, image: HTMLImageElement, fishEyeIntensity=.9) {
  const canvas=document.createElement('canvas');canvas.setAttribute('aria-hidden','true');
  Object.assign(canvas.style,{position:'absolute',inset:'0',width:'100%',height:'100%',pointerEvents:'none',opacity:'0'});
  const gl=canvas.getContext('webgl',{alpha:true,antialias:false});
  if(!gl)return ()=>{};
  const vertex=`attribute vec2 position;varying vec2 uv;void main(){uv=position*.5+.5;gl_Position=vec4(position,0.,1.);}`;
  const fragment=`precision highp float;varying vec2 uv;uniform sampler2D photo;uniform vec2 cursor;uniform vec2 cover;uniform float power;
    void main(){vec2 p=uv*2.-1.;float intensity=clamp(power,0.,1.);float len=max(length(p),.000001);vec3 fish=vec3(p/len*sin(len*1.4*intensity),-cos(len*1.4*intensity));float rx=-(cursor.x-.5)*.3*3.14159265359;float ry=-(cursor.y-.5)*.2*3.14159265359;fish.xz=mat2(cos(rx),-sin(rx),sin(rx),cos(rx))*fish.xz;fish.yz=mat2(cos(ry),-sin(ry),sin(ry),cos(ry))*fish.yz;vec2 warped=mix(p,fish.xy,intensity);vec2 sampleUv=((warped+1.)*.5-.5)*cover+.5;sampleUv.y=1.-sampleUv.y;float brightness=1.+intensity*.15*(1.-smoothstep(1.6,2.,length(p)));gl_FragColor=vec4(texture2D(photo,sampleUv).rgb*brightness,1.);}`;
  const compile=(type:number,source:string)=>{const shader=gl.createShader(type)!;gl.shaderSource(shader,source);gl.compileShader(shader);return shader;};
  const program=gl.createProgram()!;
  const vs=compile(gl.VERTEX_SHADER,vertex),fs=compile(gl.FRAGMENT_SHADER,fragment);
  gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);
  if(!gl.getProgramParameter(program,gl.LINK_STATUS)){gl.deleteProgram(program);gl.deleteShader(vs);gl.deleteShader(fs);return ()=>{};}
  gl.useProgram(program);
  const buffer=gl.createBuffer()!;gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
  const position=gl.getAttribLocation(program,'position');gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
  const texture=gl.createTexture()!;gl.bindTexture(gl.TEXTURE_2D,texture);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
  const cursor=gl.getUniformLocation(program,'cursor'),cover=gl.getUniformLocation(program,'cover'),power=gl.getUniformLocation(program,'power');
  let frame=0,intensity=fishEyeIntensity,target=fishEyeIntensity,x=.5,y=.5,targetX=.5,targetY=.5,loaded=false,disposed=false,source='';
  const draw=()=>{frame=0;if(disposed||!loaded)return;x+=(targetX-x)*.3;y+=(targetY-y)*.3;const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;canvas.style.opacity=reduced?'0':'1';gl.uniform2f(cursor,x,y);gl.uniform1f(power,intensity);gl.drawArrays(gl.TRIANGLE_STRIP,0,4);if(Math.abs(targetX-x)+Math.abs(targetY-y)>.0001)frame=requestAnimationFrame(draw);};
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(draw);};
  const resize=()=>{const r=figure.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.max(1,Math.round(r.width*dpr));canvas.height=Math.max(1,Math.round(r.height*dpr));gl.viewport(0,0,canvas.width,canvas.height);const ratio=image.naturalWidth/image.naturalHeight,box=r.width/r.height;gl.uniform2f(cover,box<ratio?box/ratio:1,box>ratio?ratio/box:1);schedule();};
  const load=()=>{const next=image.currentSrc||image.src;if(next===source)return;source=next;const bitmap=new Image();bitmap.crossOrigin='anonymous';bitmap.onload=()=>{if(disposed||source!==next)return;try{gl.bindTexture(gl.TEXTURE_2D,texture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,bitmap);loaded=true;canvas.dataset.ready='true';resize();}catch{loaded=false;canvas.style.opacity='0';}};bitmap.src=next;};
  const move=(event:PointerEvent)=>{if(event.pointerType==='touch'||matchMedia('(pointer: coarse), (max-width:768px), (prefers-reduced-motion: reduce)').matches)return;const r=figure.getBoundingClientRect();targetX=Math.max(0,Math.min(1,(event.clientX-r.left)/r.width));targetY=1-Math.max(0,Math.min(1,(event.clientY-r.top)/r.height));schedule();};
  const leave=()=>{targetX=.5;targetY=.5;schedule();};
  image.addEventListener('load',load);figure.addEventListener('pointermove',move);figure.addEventListener('pointerleave',leave);
  const observer=new ResizeObserver(resize);observer.observe(figure);figure.append(canvas);if(image.complete)load();
  return ()=>{disposed=true;cancelAnimationFrame(frame);observer.disconnect();image.removeEventListener('load',load);figure.removeEventListener('pointermove',move);figure.removeEventListener('pointerleave',leave);canvas.remove();gl.deleteTexture(texture);gl.deleteBuffer(buffer);gl.deleteShader(vs);gl.deleteShader(fs);gl.deleteProgram(program);};
}
