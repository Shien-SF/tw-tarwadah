function G(a, s, M = 0.9) {
  const o = document.createElement("canvas");
  o.setAttribute("aria-hidden", "true"), Object.assign(o.style, { position: "absolute", inset: "0", width: "100%", height: "100%", pointerEvents: "none", opacity: "0" });
  const e = o.getContext("webgl", { alpha: !0, antialias: !1 });
  if (!e) return () => {
  };
  const S = "attribute vec2 position;varying vec2 uv;void main(){uv=position*.5+.5;gl_Position=vec4(position,0.,1.);}", D = `precision highp float;varying vec2 uv;uniform sampler2D photo;uniform vec2 cursor;uniform vec2 cover;uniform float power;
    void main(){vec2 p=uv*2.-1.;float intensity=clamp(power,0.,1.);float len=max(length(p),.000001);vec3 fish=vec3(p/len*sin(len*1.4*intensity),-cos(len*1.4*intensity));float rx=-(cursor.x-.5)*.3*3.14159265359;float ry=-(cursor.y-.5)*.2*3.14159265359;fish.xz=mat2(cos(rx),-sin(rx),sin(rx),cos(rx))*fish.xz;fish.yz=mat2(cos(ry),-sin(ry),sin(ry),cos(ry))*fish.yz;vec2 warped=mix(p,fish.xy,intensity);vec2 sampleUv=((warped+1.)*.5-.5)*cover+.5;sampleUv.y=1.-sampleUv.y;float brightness=1.+intensity*.15*(1.-smoothstep(1.6,2.,length(p)));gl_FragColor=vec4(texture2D(photo,sampleUv).rgb*brightness,1.);}`, g = (t, r) => {
    const i = e.createShader(t);
    return e.shaderSource(i, r), e.compileShader(i), i;
  }, n = e.createProgram(), p = g(e.VERTEX_SHADER, S), v = g(e.FRAGMENT_SHADER, D);
  if (e.attachShader(n, p), e.attachShader(n, v), e.linkProgram(n), !e.getProgramParameter(n, e.LINK_STATUS))
    return e.deleteProgram(n), e.deleteShader(p), e.deleteShader(v), () => {
    };
  e.useProgram(n);
  const A = e.createBuffer();
  e.bindBuffer(e.ARRAY_BUFFER, A), e.bufferData(e.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), e.STATIC_DRAW);
  const _ = e.getAttribLocation(n, "position");
  e.enableVertexAttribArray(_), e.vertexAttribPointer(_, 2, e.FLOAT, !1, 0, 0);
  const f = e.createTexture();
  e.bindTexture(e.TEXTURE_2D, f), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE);
  const X = e.getUniformLocation(n, "cursor"), F = e.getUniformLocation(n, "cover"), I = e.getUniformLocation(n, "power");
  let c = 0, B = M, d = 0.5, l = 0.5, h = 0.5, m = 0.5, E = !1, T = !1, x = "";
  const b = () => {
    if (c = 0, T || !E) return;
    d += (h - d) * 0.3, l += (m - l) * 0.3;
    const t = matchMedia("(prefers-reduced-motion: reduce)").matches;
    o.style.opacity = t ? "0" : "1", e.uniform2f(X, d, l), e.uniform1f(I, B), e.drawArrays(e.TRIANGLE_STRIP, 0, 4), Math.abs(h - d) + Math.abs(m - l) > 1e-4 && (c = requestAnimationFrame(b));
  }, R = () => {
    c || (c = requestAnimationFrame(b));
  }, U = () => {
    const t = a.getBoundingClientRect(), r = Math.min(devicePixelRatio || 1, 2);
    o.width = Math.max(1, Math.round(t.width * r)), o.height = Math.max(1, Math.round(t.height * r)), e.viewport(0, 0, o.width, o.height);
    const i = s.naturalWidth / s.naturalHeight, u = t.width / t.height;
    e.uniform2f(F, u < i ? u / i : 1, u > i ? i / u : 1), R();
  }, y = () => {
    const t = s.currentSrc || s.src;
    if (t === x) return;
    x = t;
    const r = new Image();
    r.crossOrigin = "anonymous", r.onload = () => {
      if (!(T || x !== t))
        try {
          e.bindTexture(e.TEXTURE_2D, f), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, r), E = !0, o.dataset.ready = "true", U();
        } catch {
          E = !1, o.style.opacity = "0";
        }
    }, r.src = t;
  }, w = (t) => {
    if (t.pointerType === "touch" || matchMedia("(pointer: coarse), (max-width:768px), (prefers-reduced-motion: reduce)").matches) return;
    const r = a.getBoundingClientRect();
    h = Math.max(0, Math.min(1, (t.clientX - r.left) / r.width)), m = 1 - Math.max(0, Math.min(1, (t.clientY - r.top) / r.height)), R();
  }, L = () => {
    h = 0.5, m = 0.5, R();
  };
  s.addEventListener("load", y), a.addEventListener("pointermove", w), a.addEventListener("pointerleave", L);
  const P = new ResizeObserver(U);
  return P.observe(a), a.append(o), s.complete && y(), () => {
    T = !0, cancelAnimationFrame(c), P.disconnect(), s.removeEventListener("load", y), a.removeEventListener("pointermove", w), a.removeEventListener("pointerleave", L), o.remove(), e.deleteTexture(f), e.deleteBuffer(A), e.deleteShader(p), e.deleteShader(v), e.deleteProgram(n);
  };
}
export {
  G as i
};
