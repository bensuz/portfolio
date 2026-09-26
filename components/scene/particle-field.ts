import * as THREE from "three";
import { HERO_VARIANT, SCAN_DIRECTION, buildHero } from "./hero-shape";

// One particle system that re-forms as the page scrolls:
// 0 exploded web page (hero) → 1 drifting field (work) → 2 four stacked layers (stack) → 3 wave horizon (contact).

const noise = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
  float n_=.142857142857;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;vec4 sh=-step(h,vec4(0.));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);m=m*m;
  return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uMorph;
uniform float uSize;
uniform float uPixelRatio;
uniform vec3 uMouse;
uniform float uMouseStrength;
uniform vec3 uHeroOffset;
uniform float uHeroScale;
uniform vec3 uScanDir;
uniform vec3 uStackOffset;
uniform float uStackScale;
uniform vec4 uLayerWeights;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
attribute vec3 aField;
attribute vec3 aStack;
attribute vec3 aWave;
attribute float aRandom;
attribute float aLayer;
attribute float aTone;
varying vec3 vColor;
varying float vAlpha;
${noise}
mat3 rotY(float a){float c=cos(a),s=sin(a);return mat3(c,0.,-s,0.,1.,0.,s,0.,c);}
mat3 rotX(float a){float c=cos(a),s=sin(a);return mat3(1.,0.,0.,0.,c,s,0.,-s,c);}
float stagger(float m){return smoothstep(0.,1.,clamp((m-aRandom*.35)/.65,0.,1.));}

void main(){
  // Hero: its layers drift apart and back together while it turns gently.
  float n=snoise(position*.8+uTime*.22);
  vec3 hero=position;
  hero.z*=1.+sin(uTime*.55)*.45;
  hero.xy+=vec2(snoise(position*1.7+uTime*.3),snoise(position*1.7+9.+uTime*.3))*.018;
  hero=rotX(-.1+sin(uTime*.21)*.07)*(rotY(-.5+sin(uTime*.17)*.22)*hero);
  hero=hero*uHeroScale+uHeroOffset;

  vec3 field=aField+vec3(sin(uTime*.12+aRandom*6.28),cos(uTime*.1+aRandom*9.),0.)*.35;

  vec3 stack=aStack;
  stack.y+=sin(uTime*.9+aLayer*1.3)*.035;
  stack=rotX(.62)*(rotY(uTime*.1+.6)*stack)*uStackScale+uStackOffset;

  vec3 wave=aWave;
  wave.y+=sin(wave.x*.55+uTime*.5)*.28+cos(wave.z*.8+uTime*.35)*.22;

  float m=uMorph;
  vec3 p;
  if(m<1.) p=mix(hero,field,stagger(m));
  else if(m<2.) p=mix(field,stack,stagger(m-1.));
  else p=mix(stack,wave,stagger(m-2.));

  vec4 world=modelMatrix*vec4(p,1.);
  vec2 d=world.xy-uMouse.xy;
  float force=smoothstep(1.5,0.,length(d))*uMouseStrength;
  world.xy+=normalize(d+.0001)*force*.5;
  vec4 mv=viewMatrix*world;
  gl_Position=projectionMatrix*mv;

  float stackAmt=clamp(1.-abs(m-2.),0.,1.);
  float lw=aLayer<.5?uLayerWeights.x:aLayer<1.5?uLayerWeights.y:aLayer<2.5?uLayerWeights.z:uLayerWeights.w;
  float emphasis=mix(1.,mix(.85,1.6,lw),stackAmt);
  float heroAmt=clamp(1.-m,0.,1.);
  // A soft pulse sweeps across the shape, like a CI run moving through the history.
  float scan=smoothstep(.22,0.,abs(dot(position,uScanDir)-(mod(uTime*.45,4.8)-2.4)))*heroAmt;
  emphasis*=1.+scan*.45;

  gl_PointSize=uSize*(.55+aRandom*.9)*emphasis*uPixelRatio*(10./-mv.z);

  vec3 base=mix(uColorA,uColorB,smoothstep(-1.8,1.8,p.y+n*.6));
  vec3 tone=aTone>1.5?uColorC:mix(uColorA,uColorB,aTone);
  base=mix(base,tone,heroAmt);
  vColor=aRandom>.94&&aTone<1.5?uColorC:base;
  vColor=mix(vColor,uColorB,scan*.5);
  vColor=mix(vColor,uColorB,lw*stackAmt*.6);
  float fieldAmt=clamp(1.-abs(m-1.),0.,1.);
  vAlpha=(.3+aRandom*.7)*mix(1.,mix(.5,1.,lw),stackAmt)*mix(1.,.6,fieldAmt)*(1.+scan*.6);
}`;

const fragmentShader = /* glsl */ `
uniform float uOpacity;
varying vec3 vColor;
varying float vAlpha;
void main(){
  float d=length(gl_PointCoord-.5);
  float a=pow(smoothstep(.5,0.,d),1.7);
  gl_FragColor=vec4(vColor,a*vAlpha*uOpacity);
}`;

function buildGeometry(count: number) {
  const hero = buildHero(count);
  const field = new Float32Array(count * 3);
  const stack = new Float32Array(count * 3);
  const wave = new Float32Array(count * 3);
  const random = new Float32Array(count);
  const layer = new Float32Array(count);

  const perLayer = Math.ceil(count / 4);
  const grid = Math.ceil(Math.sqrt(perLayer * 0.8));
  const waveCols = Math.ceil(Math.sqrt(count * 2.2));
  const waveRows = Math.ceil(count / waveCols);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const r = Math.random();
    random[i] = r;

    field[i3] = (Math.random() - 0.5) * 16;
    field[i3 + 1] = (Math.random() - 0.5) * 10;
    field[i3 + 2] = -Math.random() * 9 + 2;

    // Stack: four plates, a quarter of each drawn as a crisp outline.
    const l = i % 4;
    const k = Math.floor(i / 4);
    layer[i] = l;
    const size = 2.7;
    let u: number;
    let v: number;
    if (k % 4 === 0) {
      const t = Math.random() * 4;
      const side = Math.floor(t);
      const f = t - side;
      u = side === 0 ? f : side === 1 ? 1 : side === 2 ? 1 - f : 0;
      v = side === 0 ? 0 : side === 1 ? f : side === 2 ? 1 : 1 - f;
    } else {
      u = ((k % grid) + 0.5) / grid + (Math.random() - 0.5) * 0.012;
      v = (Math.floor(k / grid) % grid + 0.5) / grid + (Math.random() - 0.5) * 0.012;
    }
    stack[i3] = (u - 0.5) * size;
    stack[i3 + 1] = (1.5 - l) * 0.78;
    stack[i3 + 2] = (v - 0.5) * size;

    const col = i % waveCols;
    const row = Math.floor(i / waveCols);
    wave[i3] = (col / (waveCols - 1) - 0.5) * 18;
    wave[i3 + 1] = -2.3;
    wave[i3 + 2] = (row / (waveRows - 1)) * -10 + 3;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(hero.positions, 3));
  geometry.setAttribute("aTone", new THREE.BufferAttribute(hero.tones, 1));
  geometry.setAttribute("aField", new THREE.BufferAttribute(field, 3));
  geometry.setAttribute("aStack", new THREE.BufferAttribute(stack, 3));
  geometry.setAttribute("aWave", new THREE.BufferAttribute(wave, 3));
  geometry.setAttribute("aRandom", new THREE.BufferAttribute(random, 1));
  geometry.setAttribute("aLayer", new THREE.BufferAttribute(layer, 1));
  return geometry;
}

// Matches --max in globals.css.
const MAX_WIDTH = 1440;

const damp = (current: number, target: number, rate: number, dt: number) =>
  current + (target - current) * (1 - Math.exp(-rate * dt));

function docTop(el: Element | null) {
  return el ? el.getBoundingClientRect().top + window.scrollY : 0;
}

// Maps the viewport centre onto the morph timeline using the page's sections.
function scrollTarget(vh: number) {
  const hero = document.getElementById("top");
  const work = document.getElementById("work");
  const stack = document.getElementById("stack");
  const contact = document.getElementById("contact");
  if (!hero || !work || !stack || !contact) return 0;
  const stackTop = docTop(stack);
  const stackBottom = stackTop + stack.offsetHeight;
  const keys: [number, number][] = [
    [docTop(hero) + hero.offsetHeight * 0.5, 0],
    [docTop(work) + vh * 0.35, 1],
    [stackTop - vh * 0.15, 1],
    [stackTop + vh * 0.5, 2],
    [Math.max(stackTop + vh * 0.5, stackBottom - vh * 0.5), 2],
    [docTop(contact) + vh * 0.15, 3],
  ];
  const s = window.scrollY + vh * 0.5;
  if (s <= keys[0][0]) return 0;
  for (let i = 1; i < keys.length; i++) {
    const [k1, v1] = keys[i];
    const [k0, v0] = keys[i - 1];
    if (s <= k1) return k1 === k0 ? v1 : v0 + ((s - k0) / (k1 - k0)) * (v1 - v0);
  }
  return 3;
}

// True when a solid section fully covers the viewport, so drawing can pause.
function covered(vh: number) {
  const solids = document.querySelectorAll<HTMLElement>("[data-solid]");
  for (const el of Array.from(solids)) {
    const r = el.getBoundingClientRect();
    if (r.top <= 0 && r.bottom >= vh) return true;
  }
  return false;
}

export function createParticleField(canvas: HTMLCanvasElement, reducedMotion: boolean) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: false,
    powerPreference: "high-performance",
  });
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 10);
  const halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;

  const small = window.innerWidth < 900;
  const geometry = buildGeometry(small ? 4800 : 9600);
  const uniforms = {
    uTime: { value: reducedMotion ? 14 : 0 },
    uMorph: { value: reducedMotion ? 0 : 1 },
    uSize: { value: small ? 2.6 : 2.4 },
    uPixelRatio: { value: 1 },
    uMouse: { value: new THREE.Vector3(99, 99, 0) },
    uMouseStrength: { value: 0 },
    uHeroOffset: { value: new THREE.Vector3() },
    uHeroScale: { value: 1 },
    uScanDir: { value: new THREE.Vector3(...SCAN_DIRECTION[HERO_VARIANT]) },
    uStackOffset: { value: new THREE.Vector3() },
    uStackScale: { value: 1 },
    uLayerWeights: { value: new THREE.Vector4(1, 0, 0, 0) },
    uColorA: { value: new THREE.Color("#6c52ff") },
    uColorB: { value: new THREE.Color("#e9e3ff") },
    uColorC: { value: new THREE.Color("#ffb38a") },
    uOpacity: { value: reducedMotion ? 1 : 0 },
  };
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const points = new THREE.Points(geometry, material);
  points.frustumCulled = false;
  scene.add(points);

  let width = 0;
  let height = 0;
  let narrow = false;
  function resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    // Mobile browsers resize on toolbar show/hide; ignore small height-only changes.
    if (w === width && Math.abs(h - height) < 120) return;
    width = w;
    height = h;
    const dpr = Math.min(window.devicePixelRatio || 1, w < 900 ? 1.5 : 1.75);
    renderer.setPixelRatio(dpr);
    renderer.setSize(w, h, false);
    uniforms.uPixelRatio.value = dpr;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const wide = w >= 900;
    narrow = !wide;
    // Anchor the shapes to the 1440px content column, not the window edges.
    const column = Math.min(w, MAX_WIDTH);
    const columnX = (fraction: number) => ((((w - column) / 2 + column * fraction) / w) * 2 - 1) * halfH * camera.aspect;
    // On phones it sits in the gap between the status line and the headline.
    uniforms.uHeroOffset.value.set(wide ? columnX(0.735) : 0.2, wide ? 0.1 : 1.7, wide ? 0 : -1);
    // The page shape is 3.9 units wide; size it to ~38% of the content column.
    const columnWorld = (column / w) * 2 * halfH * camera.aspect;
    uniforms.uHeroScale.value = wide ? Math.min(1.1, (columnWorld * 0.38) / 3.9) : 0.47;
    uniforms.uStackOffset.value.set(wide ? columnX(0.74) : 0, wide ? 0.1 : 1.2, wide ? 0 : -2.5);
    uniforms.uStackScale.value = wide ? Math.min(1, columnWorld / 10) * 0.92 : 0.8;
  }
  resize();

  const pointer = { x: 0, y: 0, active: false };
  function onPointerMove(event: PointerEvent) {
    if (event.pointerType !== "mouse") return;
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    pointer.active = true;
  }
  function onPointerLeave() {
    pointer.active = false;
  }
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  document.documentElement.addEventListener("pointerleave", onPointerLeave);
  window.addEventListener("resize", resize);

  let last = performance.now();
  const weights = [1, 0, 0, 0];
  let stackEl: HTMLElement | null = null;

  renderer.setAnimationLoop(() => {
    const now = performance.now();
    const dt = Math.min((now - last) / 1000, 0.1);
    last = now;
    const vh = window.innerHeight;
    if (covered(vh)) return;

    const target = scrollTarget(vh);
    // On narrow screens the stack sits behind body copy, so let it recede.
    const stackAmt = Math.max(0, 1 - Math.abs(uniforms.uMorph.value - 2));
    const opacity = narrow ? 1 - stackAmt * 0.7 : 1;
    if (reducedMotion) {
      uniforms.uMorph.value = target;
      uniforms.uOpacity.value = opacity;
    } else {
      uniforms.uTime.value += dt;
      uniforms.uMorph.value = damp(uniforms.uMorph.value, target, 2.6, dt);
      uniforms.uOpacity.value = damp(uniforms.uOpacity.value, opacity, 1.4, dt);

      uniforms.uMouseStrength.value = damp(uniforms.uMouseStrength.value, pointer.active ? 1 : 0, 3, dt);
      const mouse = uniforms.uMouse.value;
      mouse.x = damp(mouse.x, pointer.x * halfH * camera.aspect, 6, dt);
      mouse.y = damp(mouse.y, pointer.y * halfH, 6, dt);
      points.rotation.y = damp(points.rotation.y, pointer.x * 0.12, 2, dt);
      points.rotation.x = damp(points.rotation.x, -pointer.y * 0.08, 2, dt);
    }

    stackEl ??= document.getElementById("stack");
    const active = Number(stackEl?.dataset.active ?? 0);
    for (let i = 0; i < 4; i++) {
      weights[i] = reducedMotion ? (i === active ? 1 : 0) : damp(weights[i], i === active ? 1 : 0, 5, dt);
    }
    uniforms.uLayerWeights.value.set(weights[0], weights[1], weights[2], weights[3]);

    renderer.render(scene, camera);
  });

  return () => {
    renderer.setAnimationLoop(null);
    window.removeEventListener("pointermove", onPointerMove);
    document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    window.removeEventListener("resize", resize);
    geometry.dispose();
    material.dispose();
    renderer.dispose();
  };
}
