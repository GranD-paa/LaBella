"use client";

import { useEffect, useRef } from "react";

/**
 * صحنهٔ هیرو — «افق جمله‌ها»
 * ---------------------------------------------------------------------------
 * ردیف‌هایی از واژه که تا افق عقب می‌روند. هر ردیف یک جمله است و هر بلوک یک
 * کلمه. چند ثانیه یک‌بار موجی از میان ردیف‌ها می‌گذرد و هرجا می‌رسد کلمه‌ها
 * روشن می‌شوند — همان لحظه‌ای که یک جملهٔ بیگانه ناگهان معنا پیدا می‌کند.
 *
 * چرا WebGL خام و بدون three.js:
 *   three حدود ۷۰۰ کیلوبایت است و اینجا فقط سه فراخوانی رسم داریم. کل کار با
 *   دو تابع ماتریس و یک برنامهٔ شیدر انجام می‌شود، پس صفحهٔ فرود سبک می‌ماند و
 *   LCP دست‌نخورده. این تنها دلیلی است که ارزش نوشتن دستی شیدر را دارد.
 *
 * قاعده‌های این فایل:
 *   • هیچ داده‌ای هر فریم از CPU به GPU نمی‌رود. جای هر بلوک در شیدر رأس ساخته
 *     می‌شود و هر نمونه فقط دو عدد شناسه دارد (instancing).
 *   • رنگ‌ها از توکن‌های CSS خوانده می‌شوند تا با برند یکی بمانند.
 *   • با «کاهش حرکت» یک قاب ساکن رسم می‌شود و حلقه اصلاً روشن نمی‌شود.
 *   • بدون WebGL هیچ اتفاقی نمی‌افتد؛ شفق CSS پشت سرش صفحه را نگه می‌دارد.
 */

/** ماتریس تصویر پرسپکتیو، ستونی — همان چیدمانی که WebGL انتظار دارد. */
function perspective(fovDeg: number, aspect: number, near: number, far: number) {
  const f = 1 / Math.tan((fovDeg * Math.PI) / 360);
  const nf = 1 / (near - far);
  // prettier-ignore
  return new Float32Array([
    f / aspect, 0, 0,                       0,
    0,          f, 0,                       0,
    0,          0, (far + near) * nf,      -1,
    0,          0, 2 * far * near * nf,     0,
  ]);
}

/** جابه‌جایی ساده روی سه محور. دوربین هیچ‌وقت نمی‌چرخد، پس همین کافی است. */
function translation(x: number, y: number, z: number) {
  // prettier-ignore
  return new Float32Array([
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    x, y, z, 1,
  ]);
}

/** رنگ CSS را به سه عدد ۰ تا ۱ تبدیل می‌کند تا مستقیم به شیدر برود. */
function readColor(variable: string, fallback: [number, number, number]) {
  if (typeof window === "undefined") return fallback;

  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim();
  if (!raw) return fallback;

  // توکن‌های برند به شکل «H S% L%» ذخیره شده‌اند، نه hex.
  const [h, s, l] = raw.split(/\s+/).map((part) => Number.parseFloat(part));
  if ([h, s, l].some(Number.isNaN)) return fallback;

  const sat = s / 100;
  const lig = l / 100;
  const c = (1 - Math.abs(2 * lig - 1)) * sat;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lig - c / 2;

  const table: [number, number, number][] = [
    [c, x, 0], [x, c, 0], [0, c, x],
    [0, x, c], [x, 0, c], [c, 0, x],
  ];
  const [r, g, b] = table[Math.floor(h / 60) % 6];
  return [r + m, g + m, b + m] as [number, number, number];
}

const VERTEX = /* glsl */ `
  attribute vec2 aCorner;   // گوشه‌های یک مربع واحد، ۰ تا ۱
  attribute vec2 aCell;     // شمارهٔ ردیف و شمارهٔ کلمه در ردیف
  attribute float aWidth;   // طول کلمه — از پیش قید شده تا هر جمله ریتم خودش را داشته باشد

  uniform mat4 uProjection;
  uniform mat4 uView;
  uniform float uTime;
  uniform float uRows;
  uniform float uWave;      // جای موج فهمیدن، از دور به نزدیک

  varying float vGlow;      // چقدر این کلمه «فهمیده» شده
  varying float vFade;      // محو شدن در افق
  varying vec2  vCorner;

  void main() {
    float row = aCell.y;

    // ردیف‌ها آرام به سمت دوربین می‌آیند و در انتها دوباره ته صف می‌روند، پس
    // حرکت بی‌پایان است بدون اینکه چیزی دوباره ساخته شود.
    float depth = mod(row - uTime * 0.5, uRows);

    float z = -depth * 0.92 - 1.6;
    float x = aCell.x * 0.30;
    // The rows lie on a floor the camera looks across, not on a wall facing
    // it. That is the whole difference between "a field of text receding" and
    // "bars stacked over the headline".
    float y = -0.95;

    // موج وقتی از یک ردیف رد می‌شود آن را روشن می‌کند و بعد رها.
    float distance = abs(depth - uWave);
    vGlow = exp(-distance * distance * 0.55);

    // هرچه دورتر، کم‌رنگ‌تر — چیزی نباید ناگهان از افق ظاهر شود.
    vFade = 1.0 - smoothstep(uRows * 0.45, uRows * 0.95, depth);

    // کلمه‌های روشن‌شده کمی بالا می‌آیند، مثل جمله‌ای که جا می‌افتد.
    y += vGlow * 0.035;

    vec2 size = vec2(aWidth * 0.30, 0.030);
    vec3 position = vec3(x + aCorner.x * size.x, y + aCorner.y * size.y, z);

    vCorner = aCorner;
    gl_Position = uProjection * uView * vec4(position, 1.0);
  }
`;

const FRAGMENT = /* glsl */ `
  precision mediump float;

  uniform vec3 uInk;     // رنگ کلمهٔ خوانده‌نشده
  uniform vec3 uAccent;  // رنگ کلمهٔ فهمیده‌شده

  varying float vGlow;
  varying float vFade;
  varying vec2  vCorner;

  void main() {
    // گوشه‌های گرد، بدون هندسهٔ اضافه: فاصله تا لبه در فضای خود بلوک.
    vec2 centred = abs(vCorner - 0.5) * 2.0;
    float edge = max(centred.x, centred.y);
    float shape = 1.0 - smoothstep(0.82, 1.0, edge);

    vec3 colour = mix(uInk, uAccent, vGlow);
    float alpha = shape * vFade * (0.10 + vGlow * 0.62);

    // ترکیب پیش‌ضرب‌شده تا روی زمینهٔ تیره بدرخشد و لبه‌ها هاله نگیرند.
    gl_FragColor = vec4(colour * alpha, alpha);
  }
`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

export function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = (canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      premultipliedAlpha: true,
      powerPreference: "low-power",
    }) ?? null) as WebGLRenderingContext | null;
    if (!gl) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const instanced = gl.getExtension("ANGLE_instanced_arrays");
    if (!instanced) return;

    // ---------------------------------------------------------------- program
    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT));
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      // یک هیرو بدون انیمیشن بهتر از یک خطای کنسول روی صفحهٔ فرود است.
      return;
    }
    gl.useProgram(program);

    // ----------------------------------------------------------------- شکل‌ها
    const ROWS = 34;
    const WORDS_PER_ROW = 13;

    const corners = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]);
    const cornerBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cornerBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, corners, gl.STATIC_DRAW);

    const cells: number[] = [];
    const widths: number[] = [];

    for (let row = 0; row < ROWS; row += 1) {
      // هر ردیف تعداد کلمهٔ خودش را دارد، وگرنه شبکه می‌شود نه جمله.
      const count = 6 + Math.floor(Math.random() * (WORDS_PER_ROW - 6));

      // طول کلمه‌ها از یک توزیع کج می‌آید: چند کلمهٔ بلند میان کوتاه‌ها، که
      // ریتم نوشتار واقعی است نه بلوک‌های هم‌اندازه.
      const rowWidths: number[] = [];
      for (let word = 0; word < count; word += 1) {
        rowWidths.push(0.6 + Math.random() * Math.random() * 2.8);
      }

      // ردیف را حول محور خودش می‌چینیم، وگرنه همهٔ جمله‌ها از یک لبه شروع
      // می‌شوند و صحنه به‌جای متن، جدول به نظر می‌رسد.
      const total = rowWidths.reduce((sum, w) => sum + w + 0.5, -0.5);
      let cursor = -total / 2;

      for (const width of rowWidths) {
        cells.push(cursor + width / 2, row);
        widths.push(width);
        cursor += width + 0.5;
      }
    }

    const instanceCount = widths.length;

    const cellBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cellBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cells), gl.STATIC_DRAW);

    const widthBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, widthBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(widths), gl.STATIC_DRAW);

    const aCorner = gl.getAttribLocation(program, "aCorner");
    const aCell = gl.getAttribLocation(program, "aCell");
    const aWidth = gl.getAttribLocation(program, "aWidth");

    gl.bindBuffer(gl.ARRAY_BUFFER, cornerBuffer);
    gl.enableVertexAttribArray(aCorner);
    gl.vertexAttribPointer(aCorner, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, cellBuffer);
    gl.enableVertexAttribArray(aCell);
    gl.vertexAttribPointer(aCell, 2, gl.FLOAT, false, 0, 0);
    instanced.vertexAttribDivisorANGLE(aCell, 1);

    gl.bindBuffer(gl.ARRAY_BUFFER, widthBuffer);
    gl.enableVertexAttribArray(aWidth);
    gl.vertexAttribPointer(aWidth, 1, gl.FLOAT, false, 0, 0);
    instanced.vertexAttribDivisorANGLE(aWidth, 1);

    // --------------------------------------------------------------- uniforms
    const uProjection = gl.getUniformLocation(program, "uProjection");
    const uView = gl.getUniformLocation(program, "uView");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uRows = gl.getUniformLocation(program, "uRows");
    const uWave = gl.getUniformLocation(program, "uWave");
    const uInk = gl.getUniformLocation(program, "uInk");
    const uAccent = gl.getUniformLocation(program, "uAccent");

    gl.uniform1f(uRows, ROWS);
    gl.uniform3fv(uInk, readColor("--muted-foreground", [0.6, 0.55, 0.72]));
    gl.uniform3fv(uAccent, readColor("--primary", [0.98, 0.75, 0.14]));
    // دوربین کمی بالای کف می‌ایستد تا ردیف‌ها تا افق باز شوند.
    gl.uniformMatrix4fv(uView, false, translation(0, -0.32, 0));

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    function resize() {
      const ratio = Math.min(window.devicePixelRatio, 1.75);
      const width = Math.floor(canvas!.clientWidth * ratio);
      const height = Math.floor(canvas!.clientHeight * ratio);
      if (width === 0 || height === 0) return;

      if (canvas!.width !== width || canvas!.height !== height) {
        canvas!.width = width;
        canvas!.height = height;
      }
      gl!.viewport(0, 0, width, height);
      gl!.uniformMatrix4fv(
        uProjection,
        false,
        perspective(46, width / height, 0.1, 60)
      );
    }
    resize();
    window.addEventListener("resize", resize);

    function draw(time: number, wave: number) {
      gl!.clearColor(0, 0, 0, 0);
      gl!.clear(gl!.COLOR_BUFFER_BIT);
      gl!.uniform1f(uTime, time);
      gl!.uniform1f(uWave, wave);
      instanced!.drawArraysInstancedANGLE(gl!.TRIANGLE_STRIP, 0, 4, instanceCount);
    }

    if (reduceMotion) {
      // یک قاب ساکن با موج وسط صحنه — ترکیب‌بندی حفظ می‌شود، حرکت نه.
      draw(0, ROWS * 0.4);
      return () => window.removeEventListener("resize", resize);
    }

    let frame = 0;
    let visible = true;
    const start = performance.now();

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { rootMargin: "80px" }
    );
    observer.observe(canvas);

    function tick(now: number) {
      frame = requestAnimationFrame(tick);
      if (!visible) return;

      const elapsed = (now - start) / 1000;
      // موج هر ۹ ثانیه یک‌بار از ته صحنه تا جلو می‌آید.
      const wave = ROWS - ((elapsed * 3.4) % (ROWS + 8));
      draw(elapsed, wave);
    }
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      gl.deleteBuffer(cornerBuffer);
      gl.deleteBuffer(cellBuffer);
      gl.deleteBuffer(widthBuffer);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
