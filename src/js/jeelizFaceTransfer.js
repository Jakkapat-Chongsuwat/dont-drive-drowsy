/**
* Jeeliz Weboji - https://github.com/jeeliz/jeelizWeboji
*
* Copyright 2018 Jeeliz ( https://jeeliz.com )
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

var JEEFACETRANSFERAPI = (function () {
    function ia(b) { var d = new XMLHttpRequest; d.open("GET", a.Ta + a.save, !0); d.withCredentials = !1; d.onreadystatechange = function () { 4 === d.readyState && 200 === d.status && b(d.responseText) }; d.send() } function va() { for (var b = a.yb, d = Array(b), e = 0; e < b; ++e)d[e] = 0; return d } function ya(b, d, e) { b = Math.min(Math.max((e - b) / (d - b), 0), 1); return b * b * (3 - 2 * b) } function za(b, d, e) { return Math.min(Math.max((e - b) / (d - b), 0), 1) } function Ba(b, d, e, g) { return Math.pow(Math.min(Math.max((g - b) / (d - b), 0), 1), e) }
    function Da(b) { switch (b) { case "relu": return "gl_FragColor=max(vec4(0.,0.,0.,0.),gl_FragColor);"; case "elu": return "gl_FragColor=mix(exp(-abs(gl_FragColor))-vec4(1.,1.,1.,1.),gl_FragColor,step(0.,gl_FragColor));"; case "elu01": return "gl_FragColor=mix(0.1*exp(-abs(gl_FragColor))-vec4(0.1,0.1,0.1,0.1),gl_FragColor,step(0.,gl_FragColor));"; case "arctan": return "gl_FragColor=atan(3.14159265359*texture2D(u0,vUV))/3.14159265359;"; case "copy": return ""; default: return !1 } }
    function Ga(b, d) { var e = d % 8; return b[(d - e) / 8] >> 7 - e & 1 }
    function Ha(b) {
        var d = JSON.parse(b); b = d.ne; var e = d.nf, g = d.n, l = "undefined" === typeof btoa ? Buffer.from(d.data, "base64").toString("latin1") : atob(d.data), k = l.length, r; d = new Uint8Array(k); for (r = 0; r < k; ++r)d[r] = l.charCodeAt(r); l = new Float32Array(g); k = new Float32Array(e); r = b + e + 1; var m, n; for (m = 0; m < g; ++m) {
            var f = r * m; var u = 0 === Ga(d, f) ? 1 : -1; var t = f + 1; var z = 1, C = 0; for (n = t + b - 1; n >= t; --n)C += z * Ga(d, n), z *= 2; n = C; t = d; z = f + 1 + b; C = k; var N = 0, J = C.length; for (f = z; f < z + J; ++f)C[N] = Ga(t, f), ++N; for (f = t = 0; f < e; ++f)t += k[f] * Math.pow(2, -f -
                1); u = 0 === t && 0 === n ? 0 : u * (1 + t) * Math.pow(2, 1 + n - Math.pow(2, b - 1)); l[m] = u
        } return l
    }
    var v = function () {
        function b(h, w) { h = p.createShader(h); p.shaderSource(h, w); p.compileShader(h); return p.getShaderParameter(h, p.COMPILE_STATUS) ? h : !1 } function d(h, w) { h = b(p.VERTEX_SHADER, h); w = b(p.FRAGMENT_SHADER, w); var y = p.createProgram(); p.attachShader(y, h); p.attachShader(y, w); p.linkProgram(y); return y } function e(h) {
            void 0 === h.$ && (h.$ = "precision lowp float;attribute vec2 a0;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=a0*.5+vec2(.5,.5);}"); void 0 === h.ca && (h.ca = ["a0"]); void 0 === h.U && (h.U =
                [2]); if (void 0 === h.precision || "highp" === h.precision) h.precision = n; h.id = r++; void 0 !== h.Vc && h.Vc.forEach(function (y, aa) { h.c = h.c.replace(y, h.pa[aa]) }); h.Sa = 0; h.U.forEach(function (y) { h.Sa += 4 * y }); h.oa = d(h.$, "precision " + h.precision + " float;\n" + h.c); h.l = {}; h.f.forEach(function (y) { h.l[y] = p.getUniformLocation(h.oa, y) }); h.attributes = {}; h.V = []; h.ca.forEach(function (y) { var aa = p.getAttribLocation(h.oa, y); h.attributes[y] = aa; h.V.push(aa) }); if (h.h) {
                    p.useProgram(h.oa); k = h; l = h.id; for (var w in h.h) p.uniform1i(h.l[w],
                        h.h[w])
                } h.Md = !0
        } function g(h) { Ia.ad(F); l !== h.id && (F.S(), l = h.id, k = h, p.useProgram(h.oa), h.V.forEach(function (w) { 0 !== w && p.enableVertexAttribArray(w) })) } var l = -1, k = !1, r = 0, m = !1, n = "highp", f = ["u1"], u = ["u0"], t = { u1: 0 }, z = { u0: 0 }, C = { u1: 0, u2: 1 }, N = { u3: 0 }, J = {
            s0: { c: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}", f: f, h: t }, s1: { c: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}", f: f, h: t, precision: "lowp" }, s2: {
                c: "uniform sampler2D u1,u2;varying vec2 vv0;void main(){vec4 a=texture2D(u2,vv0),b=texture2D(u1,vv0);gl_FragColor=a*b;}",
                f: ["u1", "u2"], h: C
            }, s3: { c: "uniform sampler2D u1;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=a.r*f;}", f: f, h: t }, s4: { c: "uniform sampler2D u1,u2;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u2,vv0),b=texture2D(u1,vv0);gl_FragColor=a.a*b.r*f;}", f: ["u1", "mask"], h: C }, s5: { c: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vec2(1.-vv0.x,vv0.y));}", f: f, h: t }, s6: {
                c: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vec2(vv0.x,1.-vv0.y));}",
                f: f, h: t
            }, s7: { c: "uniform sampler2D u0;uniform float u4;varying vec2 vv0;void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=a*u4;}", f: ["u0", "u4"], h: z }, s8: { c: "uniform sampler2D u0;uniform float u4;varying vec2 vv0;const vec4 g=vec4(.25,.25,.25,.25),e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0);float b=dot(a*u4,g);gl_FragColor=b*e;}", f: ["u0", "u4"], h: z }, s9: {
                c: "uniform sampler2D u1;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){float a=.25*dot(e,texture2D(u1,vv0));gl_FragColor=a*e;}",
                f: f, h: t
            }, s10: { c: "uniform sampler2D u1,u5;uniform float u6;const vec4 f=vec4(1.,1.,1.,1.);varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0),b=texture2D(u5,vv0);gl_FragColor=mix(b,a,u6*f);}", f: ["u1", "u5", "u6"], h: { u1: 0, u5: 1 } }, s11: { c: "uniform sampler2D u1;uniform vec2 u7;varying vec2 vv0;void main(){gl_FragColor=.25*(texture2D(u1,vv0+u7)+texture2D(u1,vv0+u7*vec2(1.,-1.))+texture2D(u1,vv0+u7*vec2(-1.,-1.))+texture2D(u1,vv0+u7*vec2(-1.,1.)));}", f: ["u1", "u7"], h: t }, s12: {
                c: "uniform sampler2D u1;uniform vec4 u8;varying vec2 vv0;float g(float a,float b){a=floor(a)+.5;return floor(a/exp2(b));}float h(float a,float b){return floor(a*exp2(b)+.5);}float i(float a,float b){return mod(a,h(1.,b));}float e(float c,float a,float b){a=floor(a+.5),b=floor(b+.5);return i(g(c,a),b-a);}vec4 k(float a){if(a==0.)return vec4(0.,0.,0.,0.);float l=128.*step(a,0.);a=abs(a);float c=floor(log2(a)),m=c+127.,b=(a/exp2(c)-1.)*8388608.,d=m/2.,n=fract(d)*2.,o=floor(d),p=e(b,0.,8.),q=e(b,8.,16.),r=n*128.+e(b,16.,23.),j=l+o;return vec4(p,q,r,j)/255.;}void main(){float a=dot(texture2D(u1,vv0),u8);gl_FragColor=k(a);}",
                f: ["u1", "u8"], h: t
            }, s13: { c: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),b=e/(e+exp(-a));gl_FragColor=b;}", f: u, h: z }, s14: { c: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(0.,0.,0.,0.);void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=max(e,a);}", f: u, h: z }, s15: { c: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=mix(exp(-abs(a))-e,a,step(0.,a));}", f: u, h: z }, s16: {
                c: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),b=exp(-abs(a))-e;gl_FragColor=mix(.1*b,a,step(0.,a));}",
                f: u, h: z
            }, s17: { c: "uniform sampler2D u0,u6,u9;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),c=texture2D(u6,vv0),d=texture2D(u9,vv0),b=a/d;gl_FragColor=c*mix(exp(-abs(b))-f,b,step(0.,a));}", f: ["u0", "u6", "u9"], h: { u0: 0, u6: 1, u9: 2 } }, s18: { c: "uniform sampler2D u0;const float e=3.141593;varying vec2 vv0;void main(){gl_FragColor=atan(e*texture2D(u0,vv0))/e;}", f: u, h: z }, s19: {
                c: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.),g=vec4(.5,.5,.5,.5);void main(){vec4 a=texture2D(u0,vv0),b=log(e+a);gl_FragColor=b;}",
                f: u, h: z
            }, s20: { c: "uniform sampler2D u0;uniform float gain;varying vec2 vv0;void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=exp(a);}", f: ["u0", "u10"], h: z }, s21: { c: "uniform sampler2D u0,u11;uniform float u12;const vec2 f=vec2(.5,.5);const float g=1e-5;const vec4 h=vec4(1.,1.,1.,1.),i=vec4(0.,0.,0.,0.);varying vec2 vv0;void main(){vec4 a=texture2D(u11,f);float b=u12*u12;vec4 c=max(b*a,g*h);gl_FragColor=texture2D(u0,vv0)/c;}", f: ["u0", "u13", "u12"], h: { u0: 0, u13: 1 } }, s22: {
                c: "uniform sampler2D u1;uniform vec2 u14;varying vec2 vv0;void main(){float a=u14.x*u14.y;vec2 b=floor(vv0*a)/a,c=fract(vv0*a),d=floor(b*u14.y),g=floor(u14.x*fract(b*u14.y)),f=(g*u14.y+d)/a;gl_FragColor=texture2D(u1,f+c/a);}",
                f: ["u1", "u14"], h: t
            }, s23: { c: "uniform sampler2D u15,u16,u17;varying vec2 vv0;void main(){vec4 a=texture2D(u17,vv0);vec2 b=a.rg,c=a.ba;vec4 d=texture2D(u15,b),e=texture2D(u16,c);gl_FragColor=d*e;}", f: ["u15", "u16", "u17"], h: { u16: 0, u15: 1, u17: 2 } }, s24: { c: "uniform float u18;uniform sampler2D u15,u16;varying vec2 vv0;void main(){vec2 a=fract(vv0*u18);vec4 b=texture2D(u15,vv0),c=texture2D(u16,a);gl_FragColor=b*c;}", f: ["u16", "u15", "u18"], h: { u16: 0, u15: 1 } }, s25: {
                c: "uniform float u18;uniform sampler2D u15,u16,u19,u20,u21,u22;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.),g=vec4(1e-3,1e-3,1e-3,1e-3);void main(){vec2 i=vv0*u18,m=floor(i),c=i-m;vec4 n=texture2D(u15,vv0),d=texture2D(u16,c),a=texture2D(u22,vv0);a=a*255.;vec4 o=texture2D(u19,c),p=texture2D(u20,c),q=texture2D(u21,c),j=step(-g,-a),b=e-j,k=b*step(-e-g,-a);b*=e-k;vec4 h=b*step(-2.*e-g,-a);b*=e-h;vec4 l=b;d=j*d+k*o+h*p+l*q,gl_FragColor=n*d;}",
                f: "u15 u16 u18 u22 u19 u20 u21".split(" "), h: { u16: 0, u15: 1, u22: 3, u19: 4, u20: 5, u21: 6 }
            }, s26: {
                c: "uniform sampler2D u15,u16,u23;uniform float u18,u24,u25,u26;varying vec2 vv0;const vec2 j=vec2(1.,1.);void main(){vec2 a=floor(u24*vv0),g=u24*vv0-a;float b=u18/u24;vec2 c=floor(g*b),d=g*b-c,h=(a+d)/u24;float l=u24*u26/u18;vec2 m=l*c,i=(m+d*u25)/u26,e=step(i,j);vec4 n=texture2D(u15,h),o=texture2D(u16,i),p=n*o*e.x*e.y,k=texture2D(u23,h);gl_FragColor=p*u25*u25+k;}", f: "u15 u16 u18 u24 u25 u26 u23".split(" "), h: {
                    u16: 0,
                    u15: 1, u23: 2
                }
            }, s27: { c: "uniform sampler2D u15,u16;varying vec2 vv0;void main(){vec4 a=texture2D(u15,vv0),b=texture2D(u16,vv0);gl_FragColor=a*b;}", f: ["u15", "u16"], h: { u16: 0, u15: 1 } }, s28: { c: "uniform sampler2D u1,u23;uniform float u27;varying vec2 vv0;void main(){gl_FragColor=texture2D(u23,vv0)+u27*texture2D(u1,vv0);}", f: ["u1", "u23", "u27"], h: { u1: 0, u23: 1 } }, s29: {
                c: "varying vec2 vv0;uniform sampler2D u1;const vec4 g=vec4(1.,1.,1.,1.),e=vec4(.299,.587,.114,0.);void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=dot(a,e)*g;}",
                f: f, h: t, precision: "lowp"
            }, s30: { c: "varying vec2 vv0;uniform sampler2D u1;uniform float u28;const vec3 e=vec3(.299,.587,.114);void main(){vec3 a=texture2D(u1,vv0).rgb,b=texture2D(u1,vv0+vec2(0.,u28)).rgb,c=texture2D(u1,vv0+vec2(u28,u28)).rgb,d=texture2D(u1,vv0+vec2(u28,0.)).rgb;gl_FragColor=vec4(dot(a,e),dot(b,e),dot(c,e),dot(d,e));}", f: ["u1", "u28"], h: t, precision: "lowp" }, s31: {
                c: "varying vec2 vv0;uniform sampler2D u1;uniform float u28;const vec3 f=vec3(.299,.587,.114);void main(){vec3 a=texture2D(u1,vv0).rgb,b=texture2D(u1,vv0+vec2(0.,u28)).rgb,c=texture2D(u1,vv0+vec2(u28,u28)).rgb,d=texture2D(u1,vv0+vec2(u28,0.)).rgb;gl_FragColor=vec4(a.r,b.g,c.b,dot(d,f));}",
                f: ["u1", "u28"], h: t, precision: "lowp"
            }, s32: {
                c: "varying vec2 vv0;uniform sampler2D u1,u2;uniform float u29;const vec4 g=vec4(1.,1.,1.,1.);void main(){vec4 a=vec4(0.);a-=texture2D(u1,vec2(vv0.x-u29,vv0.y-u29))*1.,a-=texture2D(u1,vec2(vv0.x-u29,vv0.y))*2.,a-=texture2D(u1,vec2(vv0.x-u29,vv0.y+u29))*1.,a+=texture2D(u1,vec2(vv0.x+u29,vv0.y-u29))*1.,a+=texture2D(u1,vec2(vv0.x+u29,vv0.y))*2.,a+=texture2D(u1,vec2(vv0.x+u29,vv0.y+u29))*1.;vec4 b=vec4(0.);b-=texture2D(u1,vec2(vv0.x-u29,vv0.y-u29))*1.,b-=texture2D(u1,vec2(vv0.x,vv0.y-u29))*2.,b-=texture2D(u1,vec2(vv0.x+u29,vv0.y-u29))*1.,b+=texture2D(u1,vec2(vv0.x-u29,vv0.y+u29))*1.,b+=texture2D(u1,vec2(vv0.x,vv0.y+u29))*2.,b+=texture2D(u1,vec2(vv0.x+u29,vv0.y+u29))*1.;vec3 c=sqrt(a.rgb*a.rgb+b.rgb*b.rgb);vec4 e=vec4(c,texture2D(u1,vv0).a),f=texture2D(u2,vv0);gl_FragColor=f.a*e.r*g;}",
                f: ["u1", "u2", "u29"], h: C
            }, s33: { c: "varying vec2 vv0;uniform sampler2D u1,u2;uniform float u29;const vec4 j=vec4(1.,1.,1.,1.);const vec2 k=vec2(1.,1.);void main(){float i=0.;vec2 l=k*u29,b,c;float d,a,g=0.;for(float f=-4.;f<=4.;f+=1.)for(float e=-4.;e<=4.;e+=1.)b=vec2(f,e),d=length(b)/2.,a=exp(-d*d),c=vv0+l*b,a=1.,i+=a*texture2D(u1,c).r,g+=a;vec4 m=texture2D(u2,vv0);gl_FragColor=m.a*(texture2D(u1,c).r-i/g)*j;}", f: ["u1", "u2", "u29"], h: C }, s34: {
                c: "uniform sampler2D u3;uniform vec2 u7;varying vec2 vv0;vec4 e(vec4 a,vec4 b){vec4 c=step(a,b);return mix(a,b,c);}const vec2 h=vec2(.5,.5),i=vec2(1.,0.),j=vec2(0.,1.);void main(){vec2 a=vv0-u7*h;vec4 b=texture2D(u3,a),c=texture2D(u3,a+u7*i),d=texture2D(u3,a+u7*j),k=texture2D(u3,a+u7),l=e(b,c),g=e(d,k);gl_FragColor=e(l,g);}",
                f: ["u3", "u7"], h: N
            }, s35: { c: "uniform sampler2D u3;uniform vec2 u7;varying vec2 vv0;const vec2 j=vec2(1.,0.),k=vec2(0.,1.),l=vec2(2.,0.),m=vec2(0.,2.);vec4 e(vec4 a,vec4 b){vec4 c=step(a,b);return mix(a,b,c);}vec4 f(vec2 a){vec4 b=texture2D(u3,a),c=texture2D(u3,a+u7*j),d=texture2D(u3,a+u7*k),g=texture2D(u3,a+u7),i=e(b,c),h=e(d,g);return e(i,h);}void main(){vec2 a=vv0+u7*vec2(-.55,-1.05);vec4 b=f(a),c=f(a+u7*l),d=f(a+u7*2.),g=f(a+u7*m),i=e(b,c),h=e(d,g);gl_FragColor=e(i,h);}", f: ["u3", "u7"], h: N }, s36: {
                c: "uniform sampler2D u1;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=a*a;}",
                f: ["u1"], h: t, precision: "lowp"
            }, s37: { c: "uniform sampler2D u1;uniform vec2 u7;varying vec2 vv0;const vec4 g=vec4(1.,1.,1.,1.);const float d=15444.;void main(){vec4 a=1001./d*texture2D(u1,vv0-3.*u7)+2002./d*texture2D(u1,vv0-2.*u7)+3003./d*texture2D(u1,vv0-u7)+3432./d*texture2D(u1,vv0)+3003./d*texture2D(u1,vv0+u7)+2002./d*texture2D(u1,vv0+2.*u7)+1001./d*texture2D(u1,vv0+3.*u7);gl_FragColor=a;}", f: ["u7", "u1"], h: t, precision: "lowp" }, s38: {
                c: "uniform sampler2D u1,u30,u31;varying vec2 vv0;const vec4 g=vec4(1.,1.,1.,1.);const float h=.1;void main(){vec4 a=texture2D(u30,vv0),b=texture2D(u31,vv0),c=texture2D(u1,vv0),d=max(g*h,b-a*a),f=sqrt(d);gl_FragColor=(c-a)/f;}",
                f: ["u1", "u30", "u31"], h: { u1: 0, u30: 1, u31: 2 }
            }
        }, O = {
            s39: {
                c: "uniform float u18,u32;uniform sampler2D u15,u16,u23;varying vec2 vv0;const vec2 ZERO2=vec2(0.,0.),ONE2=vec2(1.,1.),HALF2=vec2(.5,.5),EPS2=vec2(1e-4,1e-4);void main(){vec4 sum=texture2D(u23,vv0);float toSparsity=1.1111;vec2 uvFrom,uvWeight,xyPatch=ZERO2,eps2=EPS2/u18,xyTo=floor(vv0*u18+eps2);float weightSize=toSparsity*u18;vec2 halfFromSparsity=ONE2*(toSparsity-1.)/2.;for(float patch_x=0.;patch_x<1.1111;patch_x+=1.){xyPatch.x=patch_x;for(float patch_y=0.;patch_y<1.1111;patch_y+=1.)xyPatch.y=patch_y,uvFrom=(xyTo+HALF2+u32*(xyPatch-halfFromSparsity))/u18,uvFrom+=step(uvFrom,-eps2),uvFrom-=step(ONE2-eps2,uvFrom),uvWeight=(xyTo*toSparsity+xyPatch+HALF2)/weightSize,sum+=texture2D(u15,uvWeight)*texture2D(u16,uvFrom);}gl_FragColor=sum,gl_FragColor*=2.2222;}",
                f: ["u18", "u15", "u16", "u23", "u32"], pa: ["1.1111", "gl_FragColor\\*=2.2222;"]
            }, s40: {
                c: "uniform float u18,u32,u26;uniform sampler2D u15,u16,u23;varying vec2 vv0;const vec2 ZERO2=vec2(0.,0.),ONE2=vec2(1.,1.),HALF2=vec2(.5,.5),EPS2=vec2(1e-4,1e-4);void main(){vec4 sum=texture2D(u23,vv0);float fromSparsity=1.1111,shrinkFactor=3.3333;vec2 uvFrom,uvWeight,xyFrom,xyPatchTo,xyPatch=ZERO2,xyShrink=ZERO2,eps2=EPS2/u26,xyTo=floor(vv0*u18+eps2);float weightSize=fromSparsity*u26;vec2 halfFromSparsity=ONE2*(fromSparsity-1.)/2.;float toSparsity=weightSize/u18;vec2 xyFrom0=xyTo*shrinkFactor;for(float patch_x=0.;patch_x<1.1111;patch_x+=1.){xyPatch.x=patch_x;for(float patch_y=0.;patch_y<1.1111;patch_y+=1.){xyPatch.y=patch_y;for(float shrink_x=0.;shrink_x<3.3333;shrink_x+=1.){xyShrink.x=shrink_x;for(float shrink_y=0.;shrink_y<3.3333;shrink_y+=1.)xyShrink.y=shrink_y,xyFrom=xyFrom0+xyShrink+shrinkFactor*u32*(xyPatch-halfFromSparsity),uvFrom=(xyFrom+HALF2)/u26,uvFrom+=step(uvFrom,-eps2),uvFrom-=step(ONE2-eps2,uvFrom),xyPatchTo=xyPatch*shrinkFactor+xyShrink,uvWeight=(xyTo*toSparsity+xyPatchTo+HALF2)/weightSize,sum+=texture2D(u15,uvWeight)*texture2D(u16,uvFrom);}}}gl_FragColor=sum,gl_FragColor*=2.2222;}",
                f: "u18 u26 u15 u16 u23 u32".split(" "), pa: ["1.1111", "gl_FragColor\\*=2.2222;", "3.3333"]
            }
        }, F = {
            Ja: function () { return m }, i: function () { if (!m) { n = "highp"; for (var h in J) e(J[h], h); v.set("s0"); p.enableVertexAttribArray(0); h = Ja.i(); m = !0; return h } }, Rb: function (h) { h.forEach(function (w) { F.Xa(w) }) }, Xa: function (h) { J[h.id] = h; e(h, h.id) }, nb: function (h, w, y) { w || (w = h); J[w] = Object.create(O[h]); O[h].pa && O[h].pa.forEach(function (aa, oa) { J[w].c = J[w].c.replace(new RegExp(aa, "g"), y[oa]) }); e(J[w], w) }, set: function (h) { g(J[h]) },
            lc: function (h) { return "undefined" !== typeof J[h] }, yd: function () { return k.vd }, S: function () { -1 !== l && (l = -1, k.V.forEach(function (h) { 0 !== h && p.disableVertexAttribArray(h) })) }, Pa: function () { var h = 0; k.V.forEach(function (w, y) { y = k.U[y]; p.vertexAttribPointer(w, y, p.FLOAT, !1, k.Sa, h); h += 4 * y }) }, ud: function () { p.enableVertexAttribArray(0) }, Qa: function () { p.vertexAttribPointer(k.V[0], 2, p.FLOAT, !1, 8, 0) }, Yd: function (h, w) { p.uniform1i(k.l[h], w) }, A: function (h, w) { p.uniform1f(k.l[h], w) }, I: function (h, w, y) {
                p.uniform2f(k.l[h],
                    w, y)
            }, Zd: function (h, w) { p.uniform2fv(k.l[h], w) }, $d: function (h, w) { p.uniform3fv(k.l[h], w) }, Ib: function (h, w, y, aa) { p.uniform3f(k.l[h], w, y, aa) }, Jb: function (h, w) { p.uniform4fv(k.l[h], w) }, ae: function (h, w) { p.uniformMatrix2fv(k.l[h], !1, w) }, be: function (h, w) { p.uniformMatrix3fv(k.l[h], !1, w) }, ce: function (h, w) { p.uniformMatrix4fv(k.l[h], !1, w) }, C: function (h, w) {
                F.set(h); w.forEach(function (y) {
                    switch (y.type) {
                        case "4f": p.uniform4fv(k.l[y.name], y.value); break; case "3f": p.uniform3fv(k.l[y.name], y.value); break; case "2f": p.uniform2fv(k.l[y.name],
                            y.value); break; case "1f": p.uniform1f(k.l[y.name], y.value); break; case "1i": p.uniform1i(k.l[y.name], y.value); break; case "mat2": p.uniformMatrix2fv(k.l[y.name], !1, y.value); break; case "mat3": p.uniformMatrix3fv(k.l[y.name], !1, y.value); break; case "mat4": p.uniformMatrix4fv(k.l[y.name], !1, y.value)
                    }
                })
            }, Fd: function () { return "lowp" }
        }; return F
    }(), p = !1, La = function () {
        function b(f) { console.log("ERROR in ContextFeedForward : ", f); return !1 } function d() {
            if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
                var f =
                    navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/); f = [parseInt(f[1], 10), parseInt(f[2], 10), parseInt(f[3] || 0, 10)]; return 12 === f[0] || 13 === f[0] ? !0 : !1
            } return /(Mac)/i.test(navigator.platform) && ((f = navigator.userAgent) ? (f = f.match(/Mac OS X (\d+)_(\d+)/), f = 3 > f.length ? !1 : [parseInt(f[1], 10), parseInt(f[2], 10)]) : f = !1, f && 10 === f[0] && 15 === f[1]) ? !0 : !1
        } var e = !1, g = !1, l = !1, k = !1, r = !0, m = !1, n = {
            s: function () { return e.width }, F: function () { return e.height }, ha: function () { return e }, xd: function () { return p }, m: function () { return r },
            flush: function () { p.flush() }, pc: function () { m || (m = new Uint8Array(e.width * e.height * 4)); p.readPixels(0, 0, e.width, e.height, p.RGBA, p.UNSIGNED_BYTE, m); return m }, Ad: function () { return e.toDataURL("image/jpeg") }, Bd: function () {
                E.D(); g || (g = document.createElement("canvas"), l = g.getContext("2d")); g.width = e.width; g.height = e.height; var f = n.pc(), u = l.createImageData(g.width, g.height), t, z, C = g.width, N = g.height, J = u.data; for (z = 0; z < N; ++z) {
                    var O = N - z - 1; for (t = 0; t < C; ++t) {
                        var F = 4 * (z * C + t); var h = 4 * (O * C + t); J[F] = f[h]; J[F + 1] = f[h +
                            1]; J[F + 2] = f[h + 2]; J[F + 3] = f[h + 3]
                    }
                } l.putImageData(u, 0, 0); return g.toDataURL("image/png")
            }, zd: function (f) { !g && f && (g = document.createElement("canvas"), l = g.getContext("2d")); var u = f ? g : document.createElement("canvas"); u.width = e.width; u.height = e.height; (f ? l : u.getContext("2d")).drawImage(e, 0, 0); return u }, i: function (f) {
                f.gb && !f.fa ? e = document.getElementById(f.gb) : f.fa && (e = f.fa); e || (e = document.createElement("canvas")); e.width = f && void 0 !== f.width ? f.width : 512; e.height = f && void 0 !== f.height ? f.height : 512; "undefined" ===
                    typeof f && (f = {}); void 0 === f.premultipliedAlpha && (f.premultipliedAlpha = !1); void 0 === f.Ia && (f.Ia = !0); void 0 === f.antialias && (f.antialias = !1); var u = { antialias: f.antialias, alpha: !0, preserveDrawingBuffer: !0, premultipliedAlpha: f.premultipliedAlpha, stencil: !1, depth: f.Ia }; d() || (p = e.getContext("webgl2", u)); p ? r = !0 : ((p = e.getContext("webgl", u)) || (p = e.getContext("experimental-webgl", u)), r = !1); if (!p) return b("WebGL is not enabled"); (k = p.getExtension("WEBGL_lose_context")) && e.addEventListener("webglcontextlost",
                        f.Pc, !1); if (!Ka.i()) return b("Not enough capabilities"); if (!Ka.Zb() && r) return b("Your configuration cannot process color buffer float"); p.clearColor(0, 0, 0, 0); p.disable(p.DEPTH_TEST); p.disable(p.BLEND); p.disable(p.DITHER); p.disable(p.STENCIL_TEST); p.GENERATE_MIPMAP_HINT && p.hint(p.GENERATE_MIPMAP_HINT, p.FASTEST); p.disable(p.SAMPLE_ALPHA_TO_COVERAGE); p.disable(p.SAMPLE_COVERAGE); return !0
            }, Ld: function () { if (!v.i()) return !1; p.depthFunc(p.LEQUAL); p.clearDepth(1); return !0 }
        }; return n
    }(), Ia = function () {
        var b =
            "undefined" === typeof v ? JEShaders : v; return { ad: function (d) { b !== d && (b.S(), b = d) }, Ja: function () { return b.Ja() }, Qa: function () { b.Qa() }, Pa: function () { b.Pa() }, S: function () { b.S() }, set: function (d) { b.set(d) } }
    }(), G = function () {
        var b, d, e = 0, g = -2, l = -2, k = !1, r = {
            reset: function () { l = g = -2 }, i: function () {
                k || (b = p.createBuffer(), p.bindBuffer(p.ARRAY_BUFFER, b), p.bufferData(p.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), p.STATIC_DRAW), d = p.createBuffer(), p.bindBuffer(p.ELEMENT_ARRAY_BUFFER, d), p.bufferData(p.ELEMENT_ARRAY_BUFFER,
                    new Uint16Array([0, 1, 2]), p.STATIC_DRAW), r.ya(), k = !0)
            }, a: function (m) {
                var n = e++, f = m.J ? m.J.length : 0, u = "undefined" === typeof m.mode ? p.STATIC_DRAW : m.mode, t = p.createBuffer(); p.bindBuffer(p.ARRAY_BUFFER, t); p.bufferData(p.ARRAY_BUFFER, m.Nb instanceof Float32Array ? m.Nb : new Float32Array(m.Nb), u); g = n; if (m.J) {
                    var z = p.createBuffer(); p.bindBuffer(p.ELEMENT_ARRAY_BUFFER, z); if (65536 > m.J.length) { var C = Uint16Array; var N = p.UNSIGNED_SHORT; var J = 2 } else C = Uint32Array, N = p.UNSIGNED_INT, J = 4; p.bufferData(p.ELEMENT_ARRAY_BUFFER,
                        m.J instanceof C ? m.J : new C(m.J), u); l = n
                } var O = { Yb: function (F) { g !== n && (p.bindBuffer(p.ARRAY_BUFFER, t), g = n); F && Ia.Pa() }, Wb: function () { l !== n && (p.bindBuffer(p.ELEMENT_ARRAY_BUFFER, z), l = n) }, bind: function (F) { O.Yb(F); O.Wb() }, sd: function () { p.drawElements(p.TRIANGLES, f, N, 0) }, td: function (F, h) { p.drawElements(p.TRIANGLES, F, N, h * J) }, remove: function () { p.deleteBuffer(t); m.J && p.deleteBuffer(z); O = null } }; return O
            }, ya: function () {
                -1 !== g && (p.bindBuffer(p.ARRAY_BUFFER, b), g = -1); -1 !== l && (p.bindBuffer(p.ELEMENT_ARRAY_BUFFER,
                    d), l = -1)
            }, g: function (m, n) { m && G.ya(); n && Ia.Qa(); p.drawElements(p.TRIANGLES, 3, p.UNSIGNED_SHORT, 0) }, oc: function () { p.deleteBuffer(b); p.deleteBuffer(d) }
        }; return r
    }(), E = function () {
        var b, d, e, g = !1, l = { o: -2, mc: 1 }; return {
            i: function () { if (!g) { b = p.createFramebuffer(); var k = Ka.m(); d = k && p.DRAW_FRAMEBUFFER ? p.DRAW_FRAMEBUFFER : p.FRAMEBUFFER; e = k && p.READ_FRAMEBUFFER ? p.READ_FRAMEBUFFER : p.FRAMEBUFFER; g = !0 } }, Dd: function () { return d }, Da: function () { return e }, O: function () { return p.FRAMEBUFFER }, Gd: function () { return l }, wd: function () { return b },
            a: function (k) {
                void 0 === k.ob && (k.ob = !1); var r = k.fd ? k.fd : !1, m = k.width, n = void 0 !== k.height ? k.height : k.width, f = b, u = !1, t = !1, z = 0; r && (m = m ? m : r.s(), n = n ? n : r.F()); var C = {
                    Gb: function () { t || (f = p.createFramebuffer(), t = !0, z = l.mc++) }, Qb: function () { C.Gb(); C.j(); u = p.createRenderbuffer(); p.bindRenderbuffer(p.RENDERBUFFER, u); p.renderbufferStorage(p.RENDERBUFFER, p.DEPTH_COMPONENT16, m, n); p.framebufferRenderbuffer(d, p.DEPTH_ATTACHMENT, p.RENDERBUFFER, u); p.clearDepth(1) }, bind: function (N, J) {
                        z !== l.o && (p.bindFramebuffer(d, f),
                            l.o = z); r && r.j(); J && p.viewport(0, 0, m, n); N && p.clear(p.COLOR_BUFFER_BIT | p.DEPTH_BUFFER_BIT)
                    }, md: function () { z !== l.o && (p.bindFramebuffer(d, f), l.o = z) }, clear: function () { p.clear(p.COLOR_BUFFER_BIT | p.DEPTH_BUFFER_BIT) }, pd: function () { p.clear(p.COLOR_BUFFER_BIT) }, qd: function () { p.clear(p.DEPTH_BUFFER_BIT) }, bd: function () { p.viewport(0, 0, m, n) }, j: function () { z !== l.o && (p.bindFramebuffer(d, f), l.o = z) }, rtt: function (N) { r = N; l.o !== z && (p.bindFramebuffer(p.FRAMEBUFFER, f), l.o = z); N.j() }, D: function () {
                        p.bindFramebuffer(d, null);
                        l.o = -1
                    }, resize: function (N, J) { m = N; n = J; u && (p.bindRenderbuffer(p.RENDERBUFFER, u), p.renderbufferStorage(p.RENDERBUFFER, p.DEPTH_COMPONENT16, m, n)) }, remove: function () { p.bindFramebuffer(d, f); p.framebufferTexture2D(d, p.COLOR_ATTACHMENT0, p.TEXTURE_2D, null, 0); u && p.framebufferRenderbuffer(d, p.DEPTH_ATTACHMENT, p.RENDERBUFFER, null); p.bindFramebuffer(d, null); p.deleteFramebuffer(f); u && p.deleteRenderbuffer(u); C = null }
                }; k.ob && C.Qb(); return C
            }, D: function () { p.bindFramebuffer(d, null); l.o = -1 }, hd: function () {
                p.bindFramebuffer(d,
                    null); p.clear(p.COLOR_BUFFER_BIT | p.DEPTH_BUFFER_BIT); p.viewport(0, 0, Ka.s(), Ka.F()); l.o = -1
            }, reset: function () { l.o = -2 }, H: function () { 0 !== l.o && (p.bindFramebuffer(d, b), l.o = 0) }, clear: function () { p.viewport(0, 0, Ka.s(), Ka.F()); p.clear(p.COLOR_BUFFER_BIT) }
        }
    }(), I = function () {
        function b(c) { p.bindTexture(p.TEXTURE_2D, c) } function d(c) {
            oa[0] = c; c = ta[0]; var B = c >> 16 & 32768, D = c >> 12 & 2047, Q = c >> 23 & 255; return 103 > Q ? B : 142 < Q ? B | 31744 | ((255 == Q ? 0 : 1) && c & 8388607) : 113 > Q ? (D |= 2048, B | (D >> 114 - Q) + (D >> 113 - Q & 1)) : B = (B | Q - 112 << 10 | D >> 1) + (D &
                1)
        } function e(c) { var B = new Uint16Array(c.length); c.forEach(function (D, Q) { B[Q] = d(D) }); return B } function g() { if (null !== na.Ea) return na.Ea; var c = k(e([1, 1, 1, 1])); return null === c ? !0 : na.Ea = c } function l() { if (null !== na.Fa) return na.Fa; var c = k(new Uint8Array([255, 255, 255, 255])); return null === c ? !0 : na.Fa = c } function k(c) {
            if (!Ia.Ja() || !N) return null; try { var B = p.getError(), D = W.a({ isFloat: !1, B: !0, array: c, width: 1 }); B = p.getError(); if (B !== p.NO_ERROR) return !1 } catch (Q) { return !1 } E.D(); p.viewport(0, 0, 1, 1); p.clearColor(0,
                0, 0, 0); p.clear(p.COLOR_BUFFER_BIT); Ia.set("s0"); D.bb(0); G.g(!1, !0); c = new Uint8Array(4); p.readPixels(0, 0, 1, 1, p.RGBA, p.UNSIGNED_BYTE, c); c = .9 < c[0]; D.remove(); E.H(); return c
        } var r = 0, m, n = 0, f, u = !1, t, z, C, N = !1, J = !1, O, F, h, w = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]], y = !1, aa = !1, oa = new Float32Array(1), ta = new Int32Array(oa.buffer), na = { Ea: null, Fa: null }, W = {
            i: function () {
                if (!N) {
                    z = [p.RGB, !1, p.RGB, p.RGBA]; C = [p.RGB, !1, p.RGB, p.RGBA]; m = [p.TEXTURE0, p.TEXTURE1, p.TEXTURE2, p.TEXTURE3, p.TEXTURE4, p.TEXTURE5, p.TEXTURE6, p.TEXTURE7];
                    y = "undefined" !== typeof JEContext; aa = "undefined" !== typeof Ka; y && JEContext.Sd() && m.push(p.TEXTURE8, p.TEXTURE9); f = [-1, -1, -1, -1, -1, -1, -1, -1]; t = [p.UNSIGNED_BYTE, p.FLOAT, p.FLOAT]; if (!u) { for (var c = new Float32Array(16384), B = 0; 16384 > B; ++B)c[B] = 2 * Math.random() - 1; u = { random: W.a({ isFloat: !0, isPot: !0, array: c, width: 64 }), Mb: W.a({ isFloat: !1, isPot: !0, width: 1, array: new Uint8Array([0, 0, 0, 0]) }) } } N = !0
                }
            }, yc: function () { W.jd() }, Jd: function () { return u.Mb }, jd: function () { t[1] = Ka.ia() }, Xc: function () {
                C = z = [p.RGBA, p.RGBA, p.RGBA,
                p.RGBA]
            }, Sc: function (c, B) { v.set("s1"); E.D(); var D = c.s(), Q = c.F(); p.viewport(0, 0, D, Q); c.b(0); G.g(!1, !1); p.readPixels(0, 0, D, Q, p.RGBA, p.UNSIGNED_BYTE, B) }, nc: function (c, B, D) {
                p.activeTexture(p.TEXTURE0); r = 0; var Q = p.createTexture(); b(Q); var X = Ka.m() && p.RGBA32F ? p.RGBA32F : p.FLOAT; B = B instanceof Float32Array ? B : new Float32Array(B); var Y = Math.log2(B.length); Y !== Math.floor(Y) && (p.texParameteri(p.TEXTURE_2D, p.TEXTURE_WRAP_S, p.CLAMP_TO_EDGE), p.texParameteri(p.TEXTURE_2D, p.TEXTURE_WRAP_T, p.CLAMP_TO_EDGE)); p.texParameteri(p.TEXTURE_2D,
                    p.TEXTURE_MAG_FILTER, p.NEAREST); p.texParameteri(p.TEXTURE_2D, p.TEXTURE_MIN_FILTER, p.NEAREST); p.pixelStorei(p.UNPACK_FLIP_Y_WEBGL, D); p.texImage2D(p.TEXTURE_2D, 0, p.RGBA, c.s(), c.F(), 0, p.RGBA, X, B); b(null); p.pixelStorei(p.UNPACK_FLIP_Y_WEBGL, !1); E.H(); v.set("s0"); c.u(); p.clearColor(0, 0, 0, 0); p.clear(p.COLOR_BUFFER_BIT); b(Q); G.g(!0, !1); p.deleteTexture(Q)
            }, a: function (c) {
                function B() {
                    b(ea); qa && p.pixelStorei(p.UNPACK_FLIP_Y_WEBGL, qa); c.isPot ? (p.texParameteri(p.TEXTURE_2D, p.TEXTURE_WRAP_S, c.qb ? p.MIRRORED_REPEAT :
                        p.REPEAT), p.texParameteri(p.TEXTURE_2D, p.TEXTURE_WRAP_T, c.K ? p.MIRRORED_REPEAT : p.REPEAT)) : (p.texParameteri(p.TEXTURE_2D, p.TEXTURE_WRAP_S, p.CLAMP_TO_EDGE), p.texParameteri(p.TEXTURE_2D, p.TEXTURE_WRAP_T, p.CLAMP_TO_EDGE)); c.la && "undefined" !== typeof JESETTINGS && p.texParameterf(p.TEXTURE_2D, JEContext.Cd().TEXTURE_MAX_ANISOTROPY_EXT, JESETTINGS.ld); p.texParameteri(p.TEXTURE_2D, p.TEXTURE_MAG_FILTER, c.isLinear ? p.LINEAR : p.NEAREST); c.isLinear ? p.texParameteri(p.TEXTURE_2D, p.TEXTURE_MIN_FILTER, c.isMipmap && !wa ? p.NEAREST_MIPMAP_LINEAR :
                            p.LINEAR) : p.texParameteri(p.TEXTURE_2D, p.TEXTURE_MIN_FILTER, c.isMipmap && !wa ? p.NEAREST_MIPMAP_NEAREST : p.NEAREST); ja = z[c.Z - 1]; fa = C[c.Z - 1]; ma = t[D]; if (Ka.m()) { var q = p.RGBA32F; ja === p.RGBA && ma === p.FLOAT && q && (fa = q); ja === p.RGB && ma === p.FLOAT && q && (fa = q, ja = p.RGBA) } if (c.B && !c.isFloat || c.isFloat && c.isMipmap && Ja.Bc()) (q = p.RGBA16F) && (fa = q), ma = Ka.ia(); c.tb && "undefined" !== typeof p.texStorage2D && (L = c.tb); c.rb && 4 === c.Z && (ja = JEContext.Hd()); if (c.v) p.texImage2D(p.TEXTURE_2D, 0, fa, ja, ma, c.v); else if (c.url) p.texImage2D(p.TEXTURE_2D,
                                0, fa, ja, ma, pa); else if (Z) { try { p.getError(), p.texImage2D(p.TEXTURE_2D, 0, fa, K, x, 0, ja, ma, Z), p.getError() !== p.NO_ERROR && (p.texImage2D(p.TEXTURE_2D, 0, fa, K, x, 0, ja, ma, null), p.getError() !== p.NO_ERROR && p.texImage2D(p.TEXTURE_2D, 0, p.RGBA, K, x, 0, p.RGBA, p.UNSIGNED_BYTE, null)) } catch (ba) { p.texImage2D(p.TEXTURE_2D, 0, fa, K, x, 0, ja, ma, null) } c.isKeepArray || (Z = null) } else p.texImage2D(p.TEXTURE_2D, 0, fa, K, x, 0, ja, ma, null); if (c.isMipmap) if (!wa && A) A.Ca(), ka = !0; else if (wa) {
                                    q = Math.log(Math.min(K, x)) / Math.log(2); var R; xa = Array(1 +
                                        q); xa[0] = ea; for (R = 1; R <= q; ++R) { var P = Math.pow(2, R); var H = K / P; P = x / P; var M = p.createTexture(); b(M); p.texParameteri(p.TEXTURE_2D, p.TEXTURE_MIN_FILTER, p.NEAREST); p.texParameteri(p.TEXTURE_2D, p.TEXTURE_MAG_FILTER, p.NEAREST); p.texImage2D(p.TEXTURE_2D, 0, fa, H, P, 0, ja, ma, null); b(null); xa[R] = M } ka = !0
                                } b(null); f[r] = -1; qa && p.pixelStorei(p.UNPACK_FLIP_Y_WEBGL, !1); T = !0; ca && A && (ca(A), ca = !1)
                } "undefined" === typeof c.isFloat && (c.isFloat = !1); "undefined" === typeof c.B && (c.B = !1); "undefined" === typeof c.isPot && (c.isPot = !0); "undefined" ===
                    typeof c.isLinear && (c.isLinear = !1); "undefined" === typeof c.isMipmap && (c.isMipmap = !1); "undefined" === typeof c.za && (c.za = !1); void 0 === c.la && (c.la = !1); void 0 === c.K && (c.K = !1); void 0 === c.qb && (c.qb = !1); void 0 === c.rb && (c.rb = !1); void 0 === c.Z && (c.Z = 4); void 0 === c.pb && (c.pb = !1); "undefined" === typeof c.isFlipY && (c.isFlipY = c.url || c.array ? !0 : !1); "undefined" === typeof c.isKeepArray && (c.isKeepArray = !1); c.data && (c.array = "string" === typeof c.data ? Ha(c.data) : c.isFloat ? new Float32Array(c.data) : new Uint8Array(c.data), c.isFlipY =
                        !1); var D = 0, Q = c.v ? !0 : !1, X = null, Y = null, da = !1, ra = null; c.isFloat && (c.B = !0); c.B && (D = 1); c.pb || Ka.m() || !c.isFloat || !aa || Ka.eb() || (c.isFloat = !1); c.isFloat && (D = 2); c.la && y && !JEContext.Nd() && (c.la = !1); var ea = p.createTexture(), ca = c.za, pa = null, Z = !1, K = 0, x = 0, T = !1, U = n++, S = !1, ha, ua, Ca, Aa, fa, ja, ma, qa = c.isFlipY, wa = c.B && c.isMipmap && "undefined" !== typeof Ja && !Ja.ac() ? !0 : !1, xa, L = -1, ka = !1; "undefined" !== typeof c.width && c.width && (K = c.width, x = "undefined" !== typeof c.height && c.height ? c.height : K); var A = {
                            get: function () { return ea },
                            s: function () { return K }, F: function () { return x }, Kd: function () { return c.url }, Od: function () { return c.isFloat }, Qd: function () { return c.B }, Rd: function () { return c.isLinear }, Ca: function () { p.generateMipmap(p.TEXTURE_2D) }, cb: function (q, R) { wa ? (q || (q = A.jb()), A.xa(R), b(xa[q]), f[R] = -1) : A.b(R) }, jb: function () { -1 === L && (L = Math.log(K) / Math.log(2)); return L }, ib: function (q) {
                                if (wa) {
                                    q || (q = A.jb()); v.set("s11"); A.xa(0); var R, P = K, H = x; for (R = 1; R <= q; ++R)P /= 2, H /= 2, v.I("u7", .25 / P, .25 / H), p.viewport(0, 0, P, H), b(xa[R - 1]), p.framebufferTexture2D(E.O(),
                                        p.COLOR_ATTACHMENT0, p.TEXTURE_2D, xa[R], 0), G.g(!1, 1 === R); f[0] = -1
                                } else A.Ca()
                            }, xa: function (q) { q !== r && (p.activeTexture(m[q]), r = q) }, b: function (q) { if (!T) return !1; A.xa(q); if (f[q] === U) return !1; b(ea); f[q] = U; return !0 }, bb: function (q) { p.activeTexture(m[q]); r = q; b(ea); f[q] = U }, j: function () { p.framebufferTexture2D(E.O(), p.COLOR_ATTACHMENT0, p.TEXTURE_2D, ea, 0) }, u: function () { p.viewport(0, 0, K, x); p.framebufferTexture2D(E.O(), p.COLOR_ATTACHMENT0, p.TEXTURE_2D, ea, 0) }, fe: function () {
                                p.framebufferTexture2D(E.O(), p.COLOR_ATTACHMENT0,
                                    p.TEXTURE_2D, null, 0)
                            }, resize: function (q, R) { K = q; x = R; B() }, clone: function (q) { q = W.a({ width: K, height: x, B: c.B, isFloat: c.isFloat, isLinear: c.isLinear, K: c.K, isFlipY: q ? !qa : qa, isPot: c.isPot }); Ia.set("s0"); E.H(); q.j(); p.viewport(0, 0, K, x); A.b(0); G.g(!0, !0); return q }, bd: function () { p.viewport(0, 0, K, x) }, remove: function () { p.deleteTexture(ea); A = null }, refresh: function () {
                                A.bb(0); qa && p.pixelStorei(p.UNPACK_FLIP_Y_WEBGL, !0); Q ? p.texImage2D(p.TEXTURE_2D, 0, fa, ja, p.UNSIGNED_BYTE, c.v) : p.texImage2D(p.TEXTURE_2D, 0, fa, K, x, 0, ja,
                                    ma, Z); qa && p.pixelStorei(p.UNPACK_FLIP_Y_WEBGL, !1)
                            }, fb: function () { var q = K * x * 4; ua = [new Uint8Array(q), new Uint8Array(q), new Uint8Array(q), new Uint8Array(q)]; ha = [new Float32Array(ua[0].buffer), new Float32Array(ua[1].buffer), new Float32Array(ua[2].buffer), new Float32Array(ua[3].buffer)]; Ca = new Uint8Array(4 * q); Aa = new Float32Array(Ca.buffer); S = !0 }, Oa: function () {
                                S || A.fb(); p.readPixels(0, 0, K, 4 * x, p.RGBA, p.UNSIGNED_BYTE, Ca); var q, R = K * x, P = 2 * R, H = 3 * R; for (q = 0; q < R; ++q)ha[0][q] = Aa[q], ha[1][q] = Aa[q + R], ha[2][q] = Aa[q +
                                    P], ha[3][q] = Aa[q + H]; return ha
                            }, Aa: function () { E.D(); v.set("s12"); A.b(0); for (var q = 0; 4 > q; ++q)p.viewport(0, x * q, K, x), v.Jb("u8", w[q]), G.g(!1, 0 === q) }, ge: function (q) {
                                var R = ma === t[0] && !l(); b(ea); qa && p.pixelStorei(p.UNPACK_FLIP_Y_WEBGL, qa); R ? (da || (X = document.createElement("canvas"), X.width = K, X.height = x, Y = X.getContext("2d"), ra = Y.createImageData(K, x), da = !0), ra.data.set(q), Y.putImageData(ra, 0, 0), p.texImage2D(p.TEXTURE_2D, 0, fa, ja, ma, X)) : p.texImage2D(p.TEXTURE_2D, 0, fa, K, x, 0, ja, ma, q); f[r] = U; qa && p.pixelStorei(p.UNPACK_FLIP_Y_WEBGL,
                                    !1)
                            }, he: function (q, R) { b(ea); p.pixelStorei(p.UNPACK_FLIP_Y_WEBGL, R); p.texImage2D(p.TEXTURE_2D, 0, fa, ja, ma, q); f[r] = U; R && p.pixelStorei(p.UNPACK_FLIP_Y_WEBGL, !1) }, Wd: function (q, R) {
                                var P = K * x, H = 4 * P; q = c.B ? q ? "RGBE" : "JSON" : "RGBA"; R && (q = R); R = Ka.m() && !1; switch (q) { case "RGBE": var M = "s41"; break; case "JSON": M = R ? "s0" : "s12"; break; case "RGBA": case "RGBAARRAY": M = "s6" }S || ("RGBA" === q || "RGBE" === q || "RGBAARRAY" === q ? (ua = new Uint8Array(H), S = !0) : "JSON" !== q || R || A.fb()); E.D(); v.set(M); A.b(0); if ("RGBA" === q || "RGBE" === q || "RGBAARRAY" ===
                                    q) { p.viewport(0, 0, K, x); G.g(!0, !0); p.readPixels(0, 0, K, x, p.RGBA, p.UNSIGNED_BYTE, ua); if ("RGBAARRAY" === q) return { data: ua }; J || (O = document.createElement("canvas"), F = O.getContext("2d"), J = !0); O.width = K; O.height = x; h = F.createImageData(K, x); h.data.set(ua); F.putImageData(h, 0, 0); var ba = O.toDataURL("image/png") } else if ("JSON" === q) if (R) ba = new Float32Array(P), p.viewport(0, 0, K, x), G.g(!0, !0), p.readPixels(0, 0, K, x, p.RGBA, p.FLOAT, ba); else {
                                        for (ba = 0; 4 > ba; ++ba)p.viewport(0, x * ba, K, x), v.Jb("u8", w[ba]), G.g(!ba, !ba); A.Oa(); ba =
                                            Array(P); for (M = 0; M < P; ++M)ba[4 * M] = ha[0][M], ba[4 * M + 1] = ha[1][M], ba[4 * M + 2] = ha[2][M], ba[4 * M + 3] = ha[3][M]
                                    } return { format: q, data: ba, width: K, height: x, isMirrorY: c.K, isFlipY: "RGBA" === q ? c.isFlipY : !c.isFlipY }
                            }
                        }; c.isMipmap && !wa && T && !ka && (A.Ca(), ka = !0); if (c.url) b(ea), p.texImage2D(p.TEXTURE_2D, 0, p.RGBA, 1, 1, 0, p.RGBA, p.UNSIGNED_BYTE, null), pa = new Image, pa.rd = "Anonymous", pa.crossOrigin = "Anonymous", pa.src = c.url, pa.onload = function () { K = pa.width; x = pa.height; B() }; else if (c.v) {
                            var la = function () {
                                K = void 0 !== c.v.videoWidth ? c.v.videoWidth :
                                    c.v.width; x = void 0 !== c.v.videoHeight ? c.v.videoHeight : c.v.height; K ? B() : setTimeout(la, 1)
                            }; la()
                        } else c.array ? (c.B && !c.isFloat ? c.array instanceof Uint16Array ? (Z = c.array, B()) : g() ? (Z = e(c.array), B()) : (B(), W.nc(A, c.array, qa)) : (Z = c.isFloat ? c.array instanceof Float32Array ? c.array : new Float32Array(c.array) : c.array instanceof Uint8Array ? c.array : new Uint8Array(c.array), B()), c.isKeepArray || (Z && Z !== c.array && (Z = null), delete c.array)) : B(); A.vc = A.s; ca && T && (ca(A), ca = !1); return A
            }, D: function (c) {
                c !== r && (p.activeTexture(m[c]),
                    r = c); f[c] = -1; b(null)
            }, nd: function (c) { u.random.b(c) }, reset: function () { for (var c = 0; c < m.length; ++c)f[c] = -1; r = -1 }, Vd: function () { r = -1 }, de: function () { for (var c = 0; c < m.length; ++c)W.D(c) }, oc: function () { u && (u.random.remove(), u.Mb.remove()) }, ee: function (c, B) {
                if ("RGBA" === c.format || "RGBE" === c.format) {
                    var D = new Image; D.src = c.data; D.onload = function () {
                        W.a({
                            K: c.isMirrorY, isFlipY: c.isFlipY, isFloat: !1, v: D, za: function (Q) {
                                if ("RGBA" === c.format) B(Q); else {
                                    var X = c.width, Y = c.height, da = W.a({
                                        K: c.isMirrorY, isFloat: !0, width: X,
                                        height: Y, isFlipY: c.isFlipY
                                    }); E.H(); p.viewport(0, 0, X, Y); v.set("s42"); da.j(); Q.b(0); G.g(!0, !0); W.D(0); B(da); p.flush(); setTimeout(Q.remove, 50)
                                }
                            }
                        })
                    }
                } else "JSON" === c.format ? B(W.a({ isFloat: !0, isFlipY: c.isFlipY, width: c.width, height: c.height, array: new Float32Array(c.data) })) : B(!1)
            }
        }; return W
    }(), Ma = {
        a: function (b) {
            var d = [I.a(b), I.a(b)], e = [d[1], d[0]], g = e, l = {
                Hb: function (k) { g[1].j(); g[0].b(k); l.Lb() }, Xd: function (k) { g[1].u(); g[0].b(k); l.Lb() }, Lb: function () { g = g === d ? e : d }, refresh: function () { g[0].refresh(); g[1].refresh() },
                b: function (k) { g[0].b(k) }, qc: function () { return g[0] }
            }; return l
        }
    }, Ka = function () {
        function b() { d = "undefined" === typeof La ? JEContext : La; e = !0 } var d, e = !1, g = !1, l = !1, k = !1, r = !1, m = !1, n = !1, f = !1, u = !1, t = !1, z = !1, C = !0, N = !0, J = !0, O = !1, F = "undefined" === typeof window ? {} : window, h = {
            i: function () { if (e) return !0; b(); h.hb(); h.Ba(); h.jc(); h.kc(); E.i(); I.i(); if (!h.ec()) return !1; G.i(); I.yc(); return !0 }, s: function () { e || b(); return d.s() }, F: function () { e || b(); return d.F() }, m: function () { e || b(); return d.m() }, jc: function () {
                z = (t = p.getExtension("EXT_color_buffer_float") ||
                    p.getExtension("WEBGL_color_buffer_float") || p.getExtension("OES_color_buffer_float")) ? !0 : !1; F.GL_EXT_COLORBUFFERFLOAT = t
            }, kc: function () { p.getExtension("EXT_color_buffer_half_float") || p.getExtension("WEBGL_color_buffer_half_float") || p.getExtension("OES_color_buffer_half_float") }, hb: function () {
                if (!g) {
                    this.m() || (l = p.getExtension("OES_texture_float") || p.getExtension("MOZ_OES_texture_float") || p.getExtension("WEBKIT_OES_texture_float"), r = (F.GL_EXT_FLOAT = l) ? !0 : !1); if (r || this.m()) k = p.getExtension("OES_texture_float_linear") ||
                        p.getExtension("MOZ_OES_texture_float_linear") || p.getExtension("WEBKIT_OES_texture_float_linear"), F.GL_EXT_FLOATLINEAR = k; g = !0
                }
            }, Ba: function () {
                if (!u) {
                    if (!this.m()) { if (m = p.getExtension("OES_texture_half_float") || p.getExtension("MOZ_OES_texture_half_float") || p.getExtension("WEBKIT_OES_texture_half_float")) O = m.HALF_FLOAT_OES, n = !0; !O && p.HALF_FLOAT && (O = p.HALF_FLOAT); !O && p.FLOAT && (O = p.FLOAT); F.GL_EXT_HALFFLOAT = m } if (n || this.m()) f = p.getExtension("OES_texture_half_float_linear") || p.getExtension("MOZ_OES_texture_half_float_linear") ||
                        p.getExtension("WEBKIT_OES_texture_half_float_linear"), F.GL_EXT_HALFFLOATLINEAR = f; u = !0
                }
            }, ia: function () { if (h.m()) return p.HALF_FLOAT; h.Ba(); return n ? O : p.FLOAT }, eb: function () { return C }, $b: function () { return N }, od: function () { return J }, Zb: function () { return z }, gc: function () {
                N = C = !0; var w = p.createFramebuffer(); p.bindFramebuffer(p.FRAMEBUFFER, w); var y = p.createTexture(); p.bindTexture(p.TEXTURE_2D, y); p.texParameteri(p.TEXTURE_2D, p.TEXTURE_MAG_FILTER, p.NEAREST); p.texParameteri(p.TEXTURE_2D, p.TEXTURE_MIN_FILTER,
                    p.NEAREST); p.texImage2D(p.TEXTURE_2D, 0, h.m() && p.RGBA32F ? p.RGBA32F : p.RGBA, 1, 1, 0, p.RGBA, p.FLOAT, null); p.framebufferTexture2D(E.O(), p.COLOR_ATTACHMENT0, p.TEXTURE_2D, y, 0); var aa = p.checkFramebufferStatus(E.Da()); aa !== p.FRAMEBUFFER_COMPLETE && (C = !1); p.texImage2D(p.TEXTURE_2D, 0, h.m() && p.RGBA16F ? p.RGBA16F : p.RGBA, 1, 1, 0, p.RGBA, h.ia(), null); p.framebufferTexture2D(E.O(), p.COLOR_ATTACHMENT0, p.TEXTURE_2D, y, 0); aa = p.checkFramebufferStatus(E.Da()); aa !== p.FRAMEBUFFER_COMPLETE && (N = !1); p.bindTexture(p.TEXTURE_2D, null);
                p.bindFramebuffer(p.FRAMEBUFFER, null); p.deleteTexture(y); p.deleteFramebuffer(w)
            }, fc: function () { var w = E.a({ width: 1 }); w.Gb(); var y = I.a({ width: 1, isFloat: !0, Z: 3 }); w.j(); y.j(); p.flush(); p.checkFramebufferStatus(E.Da()) !== p.FRAMEBUFFER_COMPLETE ? (I.Xc(), J = !1) : J = !0; w.remove(); y.remove() }, ec: function () { h.gc(); if (!C && !N) return !1; h.fc(); return !0 }
        }; return h
    }(), Ja = function () {
        function b(C, N, J, O) {
            p.texParameteri(p.TEXTURE_2D, p.TEXTURE_MIN_FILTER, O ? p.NEAREST_MIPMAP_NEAREST : p.LINEAR); try {
                var F = p.getError(); F !== p.NO_ERROR &&
                    console.log("GLERR in test_mipmapping() :", F); p.texImage2D(p.TEXTURE_2D, 0, C, 2, 2, 0, p.RGBA, N, J); F = p.getError(); if (F !== p.NO_ERROR) return !1
            } catch (h) { return !1 } O && p.generateMipmap(p.TEXTURE_2D); G.ya(); G.g(!1, !0); p.readPixels(0, 0, 1, 1, p.RGBA, p.UNSIGNED_BYTE, m); F = p.getError(); F === p.INVALID_OPERATION && "undefined" !== typeof p.PIXEL_PACK_BUFFER && (p.bindBuffer(p.PIXEL_PACK_BUFFER, null), p.readPixels(0, 0, 1, 1, p.RGBA, p.UNSIGNED_BYTE, m), F = p.getError()); return F !== p.NO_ERROR ? !1 : 0 !== m[0]
        } function d(C) {
            return Ka.eb() &&
                b(internalPixelFormat32f, p.FLOAT, new Float32Array(f), C) ? (k = l.Va, !0) : !1
        } function e(C) { return Ka.$b() ? b(t, Ka.ia(), new Uint16Array(f), C) || b(t, p.FLOAT, new Float32Array(f), C) ? (k = l.ta, !0) : !1 : !1 } var g = !1, l = { Va: 3, ta: 2, RGBA8: 0 }, k = l.RGBA8, r, m = new Uint8Array(4), n = [.8, 1, .8, 1], f = n.concat(n, n, n), u = !0, t, z = {
            i: function () {
                Ka.hb(); Ka.Ba(); t = p.RGBA; if (La.m()) { var C = p.RGBA16F; C && (t = C) } G.i(); E.reset(); E.D(); p.viewport(0, 0, 1, 1); v.set("s0"); g = !0; r = p.createTexture(); p.activeTexture(p.TEXTURE0); p.bindTexture(p.TEXTURE_2D,
                    r); p.texParameteri(p.TEXTURE_2D, p.TEXTURE_WRAP_S, p.REPEAT); p.texParameteri(p.TEXTURE_2D, p.TEXTURE_WRAP_T, p.REPEAT); p.texParameteri(p.TEXTURE_2D, p.TEXTURE_MAG_FILTER, p.NEAREST); if (e(!0) || d(!0)) return !0; u = !1; if (e(!1) || d(!1)) return !0; if (La.m()) { t = p.RGBA; if (e(!0) || d(!0)) return !0; u = !1; if (e(!1) || d(!1)) return !0 } return !1
            }, ac: function () { return u }, Ed: function () { return k }, Pd: function () { g || z.i(); return k === l.Va }, Bc: function () { g || z.i(); return k === l.ta }
        }; return z
    }(), Na = {
        a: function (b) {
            var d = I.a(b.alpha), e = I.a(b.beta);
            return { ic: function () { d.b(1); e.b(2) } }
        }
    }, Qa = { a: function (b) { var d = b.dd; d.index = b.index; d.L = b.L; d.parent = b.parent; switch (d.type) { case "input": b = Oa.a(d); break; default: b = Pa.a(d) }return b } }, Oa = {
        a: function (b) {
            "undefined" === typeof b.sift && (b.sift = !1); "undefined" === typeof b.DWT && (b.DWT = !1); "undefined" === typeof b.blur && (b.blur = !1); "undefined" === typeof b.siftOutWidth && (b.siftOutWidth = !1); "undefined" === typeof b.density && (b.density = 1); var d = !1; if (b.mask) {
                d = !0; a && void 0 !== a.Ub && (b.mask = a.Ub + b.mask); var e = I.a({
                    isFloat: !1,
                    url: b.mask
                })
            } var g = !1, l = "undefined" !== typeof b.preprocessing ? b.preprocessing : !1, k = !1, r = !1; b.sift ? Sift.i({ xc: p, fa: !1, width: b.size, Ud: b.siftOutWidth }) : b.DWT && DWT.i({ xc: p, fa: !1, width: b.size }); var m = !1; b.customInputShader && (m = "s43", v.Xa({ name: "_", id: m, c: b.customInputShader, f: ["uSource"], precision: "lowp" }), v.C(m, [{ type: "1i", name: "_", value: 0 }])); switch (l) {
                case "sobel": var n = "s32"; k = !0; break; case "meanNormalization": n = "s33"; k = !0; break; case "grayScale": n = "s29"; k = !1; break; case "grayScaleTilt": n = "s30"; r = !0;
                    k = !1; break; case "rgbGrayTilt": n = "s31"; r = !0; k = !1; break; case "copy": n = m ? m : "s0"; break; case "inputLightRegulation": n = m ? m : "s29"; Ra.i({ width: b.size, vb: b.nBlurPass, Ac: !1 }); g = !0; break; case "direct": case "none": n = !1; break; default: n = "s3"
            }r && v.C(n, [{ name: "u28", type: "1f", value: b.tilt }]); d && (n += "Mask"); if (b.blur) var f = I.a({ isFloat: !1, isPot: !1, width: b.size }); var u = I.a({ isFloat: !1, isPot: !1, width: b.size }), t = {
                s: function () { return b.sift ? Sift.Y() : b.size }, Y: function () { return t.s() }, tc: function () {
                    return b.sift ? Sift.ja() :
                        b.DWT ? DWT.ja() : g ? Ra.ja() : u
                }, w: function () { E.H(); b.blur && (f.u(), v.set("s44"), v.I("u7", 1 / b.size, 1 / b.size), G.g(!1, !0), f.b(0)); n && (v.set(n), k && v.A("u29", 1 / b.size), u.u(), d && e.b(1), G.g(!1, !1), u.b(0), g ? Ra.Na(u) : b.sift ? (v.S(), Sift.Na()) : b.DWT && (v.S(), DWT.Na(4))) }
            }; return t
        }
    }, Pa = {
        a: function (b) {
            "undefined" === typeof b.disableNormalize && (b.disableNormalize = !1); var d = [], e = [], g, l, k = !1, r, m = !0, n, f, u = b.isReorganize ? b.isReorganize : !1, t = b.kernelsNumber ? !0 : !1, z = b.dynPelu ? Na.a(b.dynPelu) : !1, C = z ? !0 : !1, N = { isEnabled: !1 },
                J; if ("softmax" === b.type) {
                    b.activation = "softmax"; b.size = Math.pow(2, Math.ceil(Math.log2(Math.sqrt(b.num_classes)))); b.sparsity = "undefined" !== typeof b.sparsity ? b.sparsity : b.L.Y(); b.gain = "undefined" !== typeof b.gain ? b.gain : 1; v.C("s20", [{ type: "1f", name: "u10", value: b.gain }]); var O = I.a({ isFloat: !0, isPot: !1, width: b.size }), F = I.a({ isFloat: !0, isPot: !1, width: b.size, isMipmap: !0 }); m = !1; var h = new Uint8Array(Math.pow(4 * b.size, 2)), w; for (w = 0; w < b.size * b.size; ++w) {
                        var y = w < b.num_classes ? 255 : 0; h[4 * w] = y; h[4 * w + 1] = y; h[4 * w +
                            2] = y; h[4 * w + 3] = y
                    } var aa = I.a({ isFloat: !1, isPot: !1, width: b.size, array: h })
                } else b.cost ? (b.sparsity = "undefined" !== typeof b.sparsity ? b.sparsity : b.L.Y(), m = !1) : "full" === b.connectivityUp && (b.sparsity = b.L.Y()); var oa = { elu: "s15", elu01: "s16", relu: "s14", arctan: "s18", sigmoid: "s13", copy: "s0", softplus: "s19", softmax: "s20", dynPelu: "s17" }[b.activation], ta = b.sparsity * b.sparsity, na = !1, W = b.size; if (b.maxPooling) {
                    switch (b.maxPooling.size) { case 2: var c = "s34"; break; case 4: c = "s35" }na = !0; W /= b.maxPooling.size; var B = I.a({
                        isFloat: !0,
                        isPot: !1, width: W
                    })
                } var D = void 0 !== b.Oc && b.Oc ? !0 : !1, Q = null, X = null, Y = null; D && (Q = "s45" + b.index.toString(), v.nb("s45", Q, [((b.normalization.n - 1) / 2).toFixed(1)]), v.C(Q, [{ type: "1i", name: "u1", value: 0 }, { type: "2f", name: "u7", value: [1 / b.size, 1 / b.size] }, { type: "1f", name: "u6", value: b.normalization.alpha }, { type: "1f", name: "u9", value: b.normalization.beta }, { type: "1f", name: "u33", value: b.normalization.k }]), X = I.a({ isFloat: !0, isPot: !0, width: b.size }), Y = I.a({ isFloat: !0, isPot: !0, width: b.size })); var da, ra, ea, ca; m && (ca = I.a({
                    isFloat: !0,
                    isPot: !1, width: b.size
                })); var pa = I.a(b.bias), Z, K = {
                    s: function () { return b.size }, Y: function () { return W }, kb: function () { return b.num_classes }, Xb: function (x) { J.b(x) }, Rc: function () { b.remap && b.remap.isEnabled && (N = { isEnabled: !0, Dc: I.a({ isFloat: !1, isFlipY: !1, array: new Uint8Array(b.remap.maskTexture.data), width: b.remap.maskTexture.width, isPot: !1 }), layers: b.remap.layers.map(function (x) { return b.parent.rc(x) }), depth: b.remap.depth }) }, Zc: function () {
                        switch (b.connectivityUp) {
                            case "gaussian": Z = Sa.a(b.connectivity);
                                break; case "direct": Z = Ta.a(b.connectivity); break; case "square": Z = Ua.a(b.connectivity); break; case "squareFast": Z = Va.a(b.connectivity, b.activation); break; case "full": Z = Wa.a(b.connectivity); break; case "conv": f = b.kernelsNumber, Z = Xa.a(b.connectivity), u && (n = I.a({ width: W, isFloat: !0, isFlipY: !1, isPot: !1 }))
                        }if (Z.M) { var x = b.size * b.sparsity; ra = Math.log(x / b.size) / Math.log(2); da = I.a({ isMipmap: !0, isFloat: !0, isPot: !0, width: x, tb: ra }); ea = I.a({ isFloat: !0, isPot: !0, width: b.size }) }
                    }, w: function (x, T) {
                        J = x; Z.M ? (da.u(), t &&
                            pa.b(2), Z.w(N), da.b(0), da.ib(ra), ea.u(), t ? v.set("s0") : (v.set("s28"), v.A("u27", ta), pa.b(1)), da.cb(ra, 0), G.g(!1, !1), v.set(oa), D ? X.j() : ca.j(), ea.b(0), C && z.ic(), G.g(!1, !1)) : (ca.u(), pa.b(1), Z.w()); D && (v.set(Q), Y.j(), X.b(0), G.g(!1, !1), v.set("s46"), v.A("u6", 1), ca.j(), Y.b(1), G.g(!1, !1)); if (m) return na ? (B.u(), ca.b(0), v.set(c), v.I("u7", 1 / b.size, 1 / b.size), G.g(!1, !1), T = B) : T = ca, T.b(0), u && (n.j(), v.set("s22"), v.I("u14", f, W / f), G.g(!1, !1), T = n, n.b(0)), T; if ("softmax" === b.type) {
                                v.set("s20"); ca.b(0); O.j(); G.g(!1, !1);
                                b.disableNormalize ? x = O : (v.set("s2"), O.b(0), aa.b(1), F.j(), G.g(!1, !1), v.set("s0"), l.u(), F.b(0), F.ib(!1), G.g(!1, !1), v.set("s21"), g.u(), F.cb(!1, 0), v.A("u12", ca.vc()), l.b(1), G.g(!1, !1), x = g); if (T) { switch (k) { case "cpuRGBAAvg": break; default: var U = K.Ab(x) }return U } return !1
                            } if (b.cost) { v.set("gpuRawAvg" === k ? "s8" : "s7"); T = ca; b.disableNormalize || (v.A("u4", 1 / b.size), g.u(), ca.b(0), G.g(!1, !1), T = g); switch (k) { case "cpuRGBA2Float": T.Aa(); U = K.Ab(T); r(U); break; case "gpuRawAvg": case "gpuRaw": T.b(0), r(T) }return !1 }
                    }, dc: function (x) {
                        x &&
                        "undefined" !== typeof x.zb && (k = x.zb, r = x.Qc); ca = I.a({ isFloat: !0, isPot: !0, isMipmap: "softmax" === b.type, width: b.size }); "softmax" === b.type && (l = I.a({ isFloat: !0, isPot: !0, width: 1 })); var T = 0, U = 0, S = "undefined" !== typeof b.num_classes && b.num_classes ? b.num_classes : b.size * b.size; for (x = 0; x < S; ++x)d.push(T + (b.size - 1 - U) * b.size), e.push([-1, -1, -1, -1]), ++T, T === b.size && (T = 0, ++U); b.disableNormalize || (g = I.a({ isFloat: !0, isPot: !0, width: b.size }))
                    }, Ab: function (x) {
                        x.Aa(); var T = x.Oa(); d.forEach(function (U, S) {
                            e[S][0] = T[0][U]; e[S][1] =
                                T[1][U]; e[S][2] = T[2][U]; e[S][3] = T[3][U]
                        }); return e
                    }
                }; b.L && K.Zc(b.L); return K
        }
    };
    function Ya() { var b = {}, d, e; b || (b = {}); this.rc = function (g) { return d[g] }; this.Wc = function (g) { var l = !1; d = g.map(function (k, r) { return l = k = Qa.a({ index: r, parent: this, dd: k, L: l }) }); e = d[d.length - 1]; d.forEach(function (k, r) { 0 !== r && k.Rc() }) }; this.w = function (g, l) { var k = l; d.forEach(function (r) { k = r.w(k, g) }); return k }; this.uc = function () { return e.s() }; this.ja = function () { return e.tc() }; this.Yc = function (g) { e.dc(g) }; this.kb = function () { return e.kb() } }
    var Ta = { a: function (b) { var d = I.a(b.weights); delete b.weights.data; return { M: !0, X: function () { return 1 }, wc: function () { return d }, w: function () { v.set("s27"); d.b(1); G.g(!1, !1) } } } }, Wa = { a: function (b) { var d = b.fromLayerSize, e = I.a(b.weights); return { M: !0, X: function () { return d }, w: function (g) { if (g.isEnabled) { v.set("s25"); g.Dc.b(3); var l, k = Math.min(g.layers.length, g.depth); for (l = 0; l < k; ++l)g.layers[l].Xb(4 + l) } else v.set("s24"); v.A("u18", b.toLayerSize); e.b(1); G.g(!1, !1) } } } }, Sa = {
        a: function (b) {
            var d = b.toSparsity * b.toLayerSize,
            e = d / b.fromLayerSize, g = I.a(b.weights); I.a({ width: d, isFloat: !0, array: new Float32Array(b.fromBindings), isPot: !0 }); var l = I.a({ width: d, isFloat: !0, array: new Float32Array(b.toBindings), isPot: !0 }); return { M: !0, X: function () { return e }, w: function () { v.set("s23"); g.b(1); l.b(2); G.g(!1, !0) } }
        }
    }, Ua = {
        a: function (b) {
            var d = b.fromLayerSize, e = b.toLayerSize, g = b.toSparsity, l = g * e, k = l / d, r = d / e, m, n, f, u, t = 0, z = 0, C = 0, N = Array(g * e * g * e * 4), J = Array(g * e * g * e * 4), O = Array(d * d); for (m = 0; m < O.length; ++m)O[m] = 0; var F = Math.floor(g / 2), h = .5 / e, w = .5 /
                d, y = .5 / l; for (m = 0; m < e; ++m)for (n = 0; n < e; ++n) {
                    var aa = Math.round(m * r); var oa = Math.round(n * r); var ta = m / e; var na = n / e; ta += h; na += h; for (f = 0; f < g; ++f)for (u = 0; u < g; ++u) {
                        var W = t / l; var c = z / l; var B = aa + f - F; var D = oa + u - F; 0 > B && (B += d); 0 > D && (D += d); B >= d && (B -= d); D >= d && (D -= d); var Q = B / d; var X = D / d; c = 1 - c - 1 / l; Q += w; X += w; W += y; c += y; var Y = m * g + f, da = n * g + u; da = e * g - da - 1; Y = da * e * g + Y; N[4 * Y] = W; N[4 * Y + 1] = c; N[4 * Y + 2] = Q; N[4 * Y + 3] = X; Q = O[D * d + B]++; X = Q % k; B = B * k + X; D = D * k + (Q - X) / k; D = d * k - 1 - D; D = D * d * k + B; J[4 * D] = W; J[4 * D + 1] = c; J[4 * D + 2] = ta; J[4 * D + 3] = na; ++t >= l && (t =
                            0, ++z); ++C
                    }
                } var ra = I.a(b.weights); I.a({ width: l, isFloat: !0, array: new Float32Array(J), isPot: !0 }); J = null; var ea = I.a({ width: l, isFloat: !0, array: new Float32Array(N), isPot: !0 }); N = null; return { M: !0, X: function () { return k }, w: function () { v.set("s23"); ra.b(1); ea.b(2); G.g(!1, !1) } }
        }
    }, Xa = {
        a: function (b) {
            var d = b.kernelsNumber, e = b.toSparsity, g = e * b.toLayerSize / b.fromLayerSize, l = I.a(b.weights); return {
                M: !0, X: function () { return g }, Id: function () { return e }, wc: function () { return l }, w: function () {
                    v.set("s26"); v.A("u24", d); v.A("u25",
                        e); v.A("u18", b.toLayerSize); v.A("u26", b.fromLayerSize); l.b(1); G.g(!1, !1)
                }
            }
        }
    }, Va = {
        a: function (b, d) {
            var e = b.fromLayerSize, g = b.toLayerSize, l = b.toSparsity, k = b.stride ? b.stride : 1, r = l * g / e, m = g < e, n = e / g, f = I.a(b.weights), u = "s47" + [e.toString(), g.toString(), l.toString(), k.toString(), d].join("_"); v.lc(u) || (b = Da(d), g = [{ type: "1f", name: "u18", value: g }, { type: "1f", name: "u32", value: k }], m && g.push({ type: "1f", name: "u26", value: e }), e = [(m ? r : l).toFixed(1), b], m && e.push(n.toFixed(1)), v.nb(m ? "s40" : "s39", u, e), v.C(u, g.concat([{
                type: "1i",
                name: "u16", value: 0
            }, { type: "1i", name: "u23", value: 1 }, { type: "1i", name: "u15", value: 3 }]))); return { M: !1, X: function () { return r }, w: function () { v.set(u); f.b(3); G.g(!1, !1) } }
        }
    }, Ra = function () {
        var b, d, e, g, l, k, r, m, n; return {
            i: function (f) { b = f.vb ? f.vb : 3; d = f.width ? f.width : 64; g = f.Ac ? !0 : !1; f = { isFloat: !1, width: d, isPot: !1, isFlipY: !1 }; l = I.a(f); k = I.a(f); r = I.a(f); m = I.a(f); n = I.a({ isFloat: !0, width: d, isPot: !1, isFlipY: !1 }); e = 1 / d }, Na: function (f) {
                v.set("s37"); for (var u = 0; u < b; ++u)l.j(), v.I("u7", e, 0), G.g(g, !1), k.j(), l.b(0), v.I("u7",
                    0, e), G.g(g, !1), k.b(0); v.set("s36"); m.j(); f.b(0); G.g(g); v.set("s37"); for (u = 0; u < b; ++u)r.j(), m.b(0), v.I("u7", e, 0), G.g(g, !1), m.j(), r.b(0), v.I("u7", 0, e), G.g(g, !1); v.set("s38"); n.j(); f.b(0); k.b(1); m.b(2); G.g(g, !1); n.b(0)
            }, ja: function () { return n }
        }
    }(); function Za(b, d) { b[d] = !0; b.setAttribute(d, "true") } function $a() { return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream }
    function ab() { var b = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/); return [parseInt(b[1], 10), parseInt(b[2], 10), parseInt(b[3] || 0, 10)] } function bb() { var b = navigator.userAgent.toLowerCase(); return -1 !== b.indexOf("safari") && -1 === b.indexOf("chrome") ? !0 : !1 } function cb() { return navigator.mediaDevices && navigator.mediaDevices.getUserMedia ? !0 : !1 }
    function db(b) {
        if (!b) return b; var d = !1; if (b.video) { var e = function (g) { var l = {}; "undefined" !== typeof g.min && (l.min = g.min); "undefined" !== typeof g.max && (l.max = g.max); "undefined" !== typeof g.ideal && (l.ideal = g.ideal); return l }; d = {}; "undefined" !== typeof b.video.width && (d.width = e(b.video.width)); "undefined" !== typeof b.video.height && (d.height = e(b.video.height)); "undefined" !== typeof b.video.facingMode && (d.facingMode = b.video.facingMode) } d = { audio: b.audio, video: d }; "undefined" !== typeof b.deviceId && (d.deviceId = b.deviceId);
        return d
    } function eb(b) { var d = b.video.width; b.video.width = b.video.height; b.video.height = d; return b }
    function fb(b) {
        function d(t) { return [480, 576, 640, 648, 720, 768, 800, 960, 1080, 1152, 1280, 1366, 1920].sort(function (z, C) { return Math.abs(z - t) - Math.abs(C - t) }) } function e(t) { var z = db(b); g.push(t(z)) } var g = []; if (!b || !b.video) return g; if (b.video.width && b.video.height) {
            if (b.video.width.ideal && b.video.height.ideal) for (var l = d(b.video.width.ideal).slice(0, 3), k = d(b.video.height.ideal).slice(0, 3), r = 0, m; r < l.length; ++r) {
                m = l[r]; for (var n = 0, f; n < k.length; ++n)if (f = k[n], m !== b.video.width.ideal || f !== b.video.height.ideal) {
                    var u =
                        Math.max(m, f) / Math.min(m, f); u < 4 / 3 - .1 || u > 16 / 9 + .1 || e(function (t) { t.video.width.ideal = m; t.video.height.ideal = f; return t })
                }
            } e(function (t) { return eb(t) })
        } b.video.width && b.video.height && (b.video.width.ideal && b.video.height.ideal && e(function (t) { delete t.video.width.ideal; delete t.video.height.ideal; return t }), e(function (t) { delete t.video.width; delete t.video.height; return t })); b.video.facingMode && (e(function (t) { delete t.video.facingMode; return t }), b.video.width && b.video.height && e(function (t) {
            eb(t); delete t.video.facingMode;
            return t
        })); g.push({ audio: b.audio, video: !0 }); return g
    } function gb(b) { try { var d = window.matchMedia("(orientation: portrait)").matches ? !0 : !1 } catch (g) { d = window.innerHeight > window.innerWidth } if (d && b && b.video) { d = b.video.width; var e = b.video.height; d && e && d.ideal && e.ideal && d.ideal > e.ideal && (b.video.height = d, b.video.width = e) } }
    function hb(b) { b.volume = 0; Za(b, "muted"); if (bb()) { if (1 === b.volume) { var d = function () { b.volume = 0; window.removeEventListener("mousemove", d, !1); window.removeEventListener("touchstart", d, !1) }; window.addEventListener("mousemove", d, !1); window.addEventListener("touchstart", d, !1) } setTimeout(function () { b.volume = 0; Za(b, "muted") }, 5) } }
    function ib(b, d, e, g) {
        function l(r) { k || (k = !0, e(r)) } var k = !1; navigator.mediaDevices.getUserMedia(g).then(function (r) {
            function m() {
                setTimeout(function () {
                    if (b.currentTime) {
                        var n = b.videoWidth, f = b.videoHeight; if (0 === n || 0 === f) l("VIDEO_NULLSIZE"); else {
                            n && (b.style.width = n.toString() + "px"); f && (b.style.height = f.toString() + "px"); n = { bc: null, cd: null, Gc: null }; try { var u = r.getVideoTracks()[0]; u && (n.Gc = u, n.bc = u.getCapabilities(), n.cd = u.getSettings()) } catch (t) { } bb() || $a() ? b.parentNode && null !== b.parentNode ? (k || d(b, r,
                                n), setTimeout(function () { b.play() }, 100)) : (document.body.appendChild(b), hb(b), k || d(b, r, n), setTimeout(function () { b.style.transform = "scale(0.0001,0.0001)"; b.style.position = "fixed"; b.style.bottom = "0px"; b.style.right = "0px"; hb(b); setTimeout(function () { b.play() }, 100) }, 80)) : k || d(b, r, n)
                        }
                    } else l("VIDEO_NOTSTARTED")
                }, 700)
            } "undefined" !== typeof b.srcObject ? b.srcObject = r : (b.src = window.URL.createObjectURL(r), b.videoStream = r); hb(b); b.addEventListener("loadeddata", function () {
                var n = b.play(); hb(b); "undefined" === typeof n ?
                    m() : n.then(function () { m() }).catch(function () { l("VIDEO_PLAYPROMISEREJECTED") })
            }, !1)
        }).catch(function (r) { l(r) })
    }
    function jb(b, d, e) {
        var g = cb() ? document.createElement("video") : !1; if (g) if (cb()) {
            if (e && e.video) { if ($a()) { var l = ab(); (12 > l[0] || 12 === l[0] && 2 > l[1]) && gb(e) } e.video.width && e.video.width.ideal && (g.style.width = e.video.width.ideal + "px"); e.video.height && e.video.height.ideal && (g.style.height = e.video.height.ideal + "px") } Za(g, "autoplay"); Za(g, "playsinline"); e && e.audio ? g.volume = 0 : Za(g, "muted"); ib(g, b, function () {
                function k(m) {
                    if (0 === m.length) d("INVALID_FALLBACKCONSTRAINS"); else {
                        var n = m.shift(); ib(g, b, function () { k(m) },
                            n)
                    }
                } var r = fb(e); k(r)
            }, e)
        } else d && d("MEDIASTREAMAPI_NOTFOUND"); else d && d("VIDEO_NOTPROVIDED")
    }
    var kb = function () { var b = 0, d, e, g, l; return { i: function (k, r) { b = k.length; d = r; e = k; g = new Float32Array(b); l = new Float32Array(b) }, sc: function () { return l }, ed: function (k, r, m) { k.forEach(function (n, f) { var u = Math.min(1, e[f] * m * (r + .33 * (1 - r))); n = u * n + (1 - u) * g[f]; g[f] = n; l[f] = d[f](n) }) } } }(), V = { T: [], va: !1, wa: !1, ua: !1, Wa: !1, ba: !0, aa: !1, ready: !1, initialized: !1 }, lb = { facingMode: "user", idealWidth: 320, idealHeight: 240, minWidth: 240, maxWidth: 1280, minHeight: 240, maxHeight: 1280 }, a = {
        save: "jeelizFaceTransferNNC.json",
        Ta: "../../", Tb: 0, ka: 64, width: 512, height: 512, Hc: .25, Ec: .7, Lc: 3, borderWidth: .4, W: .35, Mc: 5, Nc: 3, Ra: [.06, .08, .15], gd: 55, Ic: .6, Fc: 5.8, Pb: .75, Ob: 1, Ya: [.03, 1], kd: 20, da: .2, N: [30, 55], Ua: 3, Vb: 1 / 3.5, yb: 11, ub: 1, Jc: 1, Za: [.1, .01], Tc: [.4, -.7, -.4], Uc: [.3, 0, 0], Fb: [5, 7], hc: !1, R: [0, 7], ab: .001, $a: [Math.PI / 10, Math.PI / 6], Bb: [0, 6], Cb: [.1, .4], Db: [.009, .02], Eb: [.02, .04], La: 8, mb: [3, 7], lb: .05, Sb: [.2, .2, .15, .15, .15, .15, .2, .2, .15, .15, .2], Kc: [ya.bind(null, .05, .7), ya.bind(null, .05, .7), ya.bind(null, 0, .4), ya.bind(null, 0, .4), ya.bind(null,
            0, .6), ya.bind(null, 0, .6), za.bind(null, .1, .6), ya.bind(null, .1, .4), Ba.bind(null, .68, .77, 2), Ba.bind(null, .68, .77, 2), ya.bind(null, .15, .5)]
    }; V.get_nMorphs = function () { return a.yb }; var mb = !1, nb = !1;
    function ob() {
        var b, d, e, g, l, k, r, m, n, f, u; function t() { 1 === ++K && (kb.i(a.Sb, a.Kc), z(), V.ready = !0, V.T.forEach(function (L) { L() }), V.T.splice(0, V.T.length), C(), K = 0) } function z() {
            X = va(); Y = new Uint8Array(oa * oa * 4); V.get_morphTargetInfluences = function () { return X }; V.get_morphTargetInfluencesStabilized = function () { return kb.sc() }; V.set_morphUpdateCallback = function (L) { pa = L }; V.get_rotation = function () { return ra }; V.get_positionScale = function () {
                var L = D.Kb.qc(); L.Aa(); L = L.Oa(); Z[0] = 1 - L[1][0]; Z[1] = L[2][0]; Z[2] = L[3][0] *
                    ta[0]; return Z
            }; V.get_rotationStabilized = function () { return ca }; V.switch_sleep = function (L) { T !== x.qa || L ? T = L ? x.qa : x.ga_ : C() }; V.on_detect = function (L) { L(U.G); U.Ma.push(L) }; V.is_detected = function () { return U.G }; V.set_animateDelay = function (L) { h = L }
        } function C() { T !== x.ga_ && (T = x.ga_, S.timestamp = Date.now(), w && window.clearTimeout(w), y && window.cancelAnimationFrame(y), J()) } function N() { T !== x.qa && (w = setTimeout(J, h)) } function J() {
            var L = c.currentTime - wa; 0 > L && (wa = c.currentTime); 1E3 * L < a.kd || (B.refresh(), wa += L, v.set("s49"),
                E.H(), D.Ga.u(), B.b(0), G.g(!1, !0)); L = T === x.ga_ ? S.na : 1; for (var ka = 0; ka < L; ++ka) { var A = D, la = aa; v.set("s50"); E.H(); A.Ha.u(); A.Ga.b(0); A.ra.b(1); G.g(!1, !1); A.Ha.b(0); la.w(!1, A.Ha) } V.ba && (E.hd(), v.set("s5"), D.Ga.b(0), G.g(!1, !1), p.enable(p.BLEND), p.blendFunc(p.SRC_ALPHA, p.ONE), Q.b(0), G.g(!1, !1), p.disable(p.BLEND)); p.flush(); ka = Date.now(); A = ka - S.timestamp; S.timestamp = ka; S.wb = L / A; S.Ka = S.wb * a.da + S.Ka * (1 - a.da); S.xb = 1E3 / A; S.P = S.xb * a.da + S.P * (1 - a.da); S.P > a.N[1] ? (++S.na, S.P = (a.N[0] + a.N[1]) / 2) : S.P < a.N[0] && (S.na = Math.max(S.na -
                    1, a.Ua), S.P = (a.N[0] + a.N[1]) / 2); S.ea = a.Vb / Math.max(S.Ka, .001); T !== x.qa && (y = window.requestAnimationFrame(N))
        } var O, F, h = a.Tb, w = !1, y = !1, aa, oa, ta, na, W, c, B, D = {}, Q, X = !1, Y, da = [0, 0, 0], ra = [0, 0, 0], ea = [0, 0, 0], ca = [0, 0, 0], pa = !1, Z = [0, 0, 0], K = 0, x = { Cc: -2, qa: -1, ga_: 0 }, T = x.Cc, U = { ma: 0, G: !1, Ma: [] }, S = { timestamp: 0, wb: 0, Ka: 0, na: a.Ua, xb: 0, P: 0, ea: 1 }, ha = 1, ua = 1, Ca = 1, Aa = 1, fa = [0, 0, 0], ja = Date.now(), ma = new Float32Array(a.La), qa = 0, wa = 0, xa = {
            zc: function () {
                O = a.width; F = a.height; na = a.Hc; W = a.Ec; var L = O / a.ka; na *= L; W *= L; l = (1 - 2 * a.borderWidth) /
                    a.Mc; k = (1 - 2 * a.W) / a.Nc; r = (W - na) / a.Lc; m = a.borderWidth; n = a.W; f = 1 - a.borderWidth; u = 1 - a.W; b = 0; d = a.borderWidth; e = a.W; g = na; ta = [a.ka / O, a.ka / F]
            }, i: function (L) {
                function ka() { var P = A(a.mb[0], a.mb[1]); U.ma = a.lb * P + (1 - a.lb) * U.ma; .6 < U.ma && !U.G ? (U.Ma.forEach(function (H) { H(!0) }), U.G = !0) : .4 > U.ma && U.G && (U.Ma.forEach(function (H) { H(!1) }), U.G = !1) } function A(P, H) { P += oa * H; return (Y[4 * P] + Y[4 * P + 1] + Y[4 * P + 2] + Y[4 * P + 3]) / 1020 } function la() {
                    X.forEach(function (P, H) {
                        if (U.G) {
                            P = (a.ub + H) % oa; var M = a.Jc + Math.floor((a.ub + H) / oa); M = oa - 1 - M;
                            P = A(P, M); X[H] = P
                        } else X[H] = 0
                    })
                } function q(P) {
                    aa = new Ya; aa.Wc(P.layers); aa.Yc({
                        zb: "gpuRaw", Qc: function (H) {
                            var M = D; M.ra.Hb(1); p.viewport(0, 0, 1, 1); v.set("s51"); v.A("u47", ha); v.Ib("u39", d, e, g); v.Ib("u40", 1 * a.Ra[0], 1 * a.Ra[1], 1 * a.Ra[2]); G.g(!1, !1); 1 !== ++b % 2 && (g += r, g > W && (d += l, g = na, d > f && (d = m, e += k, e > u && (e = n)))); M.Kb.Hb(1); v.set("s53"); v.A("u47", ha); M.ra.b(0); G.g(!1, !1); I.Sc(H, Y); la(); if (!a.hc && U.G) for (H = 0; 3 > H; ++H)M = A(H + a.Fb[0], a.Fb[1]), M = (2 * M - 1) * a.Tc[H], M += a.Uc[H], da[H] = M; ka(); H = Date.now(); M = H - ja; var ba = A(a.Bb[0],
                                a.Bb[1]); Ca = za(a.Cb[0], a.Cb[1], ba); ba = A(a.R[0], a.R[1]); var Ea = A(a.R[0] + 1, a.R[1]), Fa = A(a.R[0] + 2, a.R[1]); ua = 1 - za(a.Eb[0], a.Eb[1], Math.sqrt(ba * ba + Ea * Ea + Fa * Fa) / M); ba = fa[0] - da[0]; Ea = fa[1] - da[1]; Fa = fa[2] - da[2]; M = Math.sqrt(ba * ba + Ea * Ea + Fa * Fa) / M; fa[0] = da[0]; fa[1] = da[1]; fa[2] = da[2]; Aa = 1 - za(a.Db[0], a.Db[1], M); ha = Ca * ua * Aa; ja = H; ma[qa] = ha; qa = (qa + 1) % a.La; for (H = 0; H < a.La; ++H)ha = Math.min(ma[H], ha); kb.ed(X, ha, S.ea); pa && pa(ha, S.ea); if (U.G) for (H = a.Za[1] * ha + a.Za[0] * (1 - ha), H *= S.ea, M = 0; 3 > M; ++M)ra[M] = H * da[M] + (1 - H) * ra[M],
                                    ca[M] = ra[M]; else H = Date.now(), ea[0] = a.$a[0] * Math.sin(H * a.ab), ea[1] = a.$a[1] * Math.cos(H * a.ab), ca[0] = ea[0], ca[1] = ea[1], ca[2] = ea[2]; H = D; E.H(); Q.u(); v.set("s52"); H.ra.b(0); G.g(!1, !1)
                        }
                    }); oa = aa.uc(); t()
                } c = L; B = I.a({ v: c, isPot: !1, isFloat: !1, isFlipY: !0 }); v.Rb([{
                    id: "s49", name: "_", $: "attribute vec2 a0;uniform vec2 u34,u35;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=u35+u34*a0;}", ca: ["a0"], U: [2], c: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}", f: ["u1", "u34",
                        "u35"], precision: "lowp"
                }, { id: "s50", name: "_", c: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}", $: "attribute vec2 a0;uniform sampler2D u36;uniform vec2 u37;const vec2 f=vec2(.25,.5),h=vec2(.75,.5),e=vec2(.5,.5);varying vec2 vv0;void main(){vec4 a=texture2D(u36,f);vec2 b=a.gb,c=a.a*u37,d=a0*.5+e;vv0=b+(d-e)*c,gl_Position=vec4(a0,0.,1.);}", ca: ["a0"], U: [2], f: ["u1", "u36", "u37"], precision: "lowp" }, {
                    id: "s51", name: "_", $: "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}",
                    c: "uniform sampler2D u38,u36;uniform vec3 u39,u40;uniform float u41,u42,u43,u44,u45,u46,u47;varying vec2 vv0;const vec4 e=vec4(.25,.25,.25,.25);void main(){vec4 g=texture2D(u38,vec2(.4375,.9375)),h=texture2D(u38,vec2(.5625,.9375)),a=texture2D(u36,vec2(.5,.5));float c=dot(g,e),i=dot(h,e);bool d=c>u44&&c>i+u45;d?a.r=2.:a.r>u43?a.r=0.:a.r>1.9&&(a.a>u42||a.a<u41)?a.r=0.:a.r>1.9?a.r+=1.:0.;if(a.r<.9)a.gba=u39,a.r=1.;else{float j=dot(e,texture2D(u38,vec2(.0625,.9375))),k=dot(e,texture2D(u38,vec2(.1875,.9375))),l=dot(e,texture2D(u38,vec2(.3125,.9375))),b;if(a.r>1.9)b=1.-u47;else b=1.,a.r=0.;float f=a.a*u46;a.gba+=vec3(j,k,l)*u40*b*f;}gl_FragColor=a;}",
                    f: "u38 u36 u39 u41 u42 u43 u44 u45 u40 u46 u47".split(" ")
                }, { id: "s52", name: "_", c: "uniform sampler2D u36;uniform vec3 u51;uniform vec2 u37;varying vec2 vv0;const vec2 i=vec2(1.,1.);void main(){vec4 g=texture2D(u36,vec2(.25,.5));vec2 h=g.gb;float j=g.a;vec2 a=j*u37,c=h+a,d=h;d-=a/2.,c-=a/2.;vec2 k=.5*(d+c),f=step(d,vv0)*step(vv0,c);float l=f.x*f.y;vec2 b=2.*abs(k-vv0)/a;b=pow(b,3.*i),gl_FragColor=vec4(l*u51*max(b.x,b.y),1.);}", f: ["u36", "u37", "u51"], precision: "lowp" }, {
                    id: "s53", name: "_", c: "uniform sampler2D u1,u5;uniform float u52,u53,u47;const vec4 f=vec4(1.,1.,1.,1.);varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0),b=texture2D(u5,vv0);float c=(1.-u47)*(u53-u52)+u52;gl_FragColor=mix(b,a,c*f);}",
                    f: ["u1", "u5", "u52", "u53", "u47"]
                }]); v.C("s50", [{ type: "1i", name: "u1", value: 0 }, { type: "1i", name: "u36", value: 1 }, { type: "2f", name: "u37", value: ta }]); v.C("s52", [{ type: "1i", name: "u36", value: 0 }, { type: "2f", name: "u37", value: ta }, { type: "3f", name: "u51", value: [0, .5, 1] }]); v.C("s51", [{ type: "1i", name: "u38", value: 0 }, { type: "1i", name: "u36", value: 1 }, { type: "1f", name: "u41", value: a.Ic }, { type: "1f", name: "u42", value: a.Fc }, { type: "1f", name: "u43", value: a.gd }, { type: "1f", name: "u44", value: a.Pb }, { type: "1f", name: "u45", value: a.Ob }, {
                    type: "1f",
                    name: "u46", value: ta[0]
                }]); v.C("s53", [{ type: "1i", name: "u1", value: 0 }, { type: "1i", name: "u5", value: 1 }, { type: "1f", name: "u52", value: a.Ya[0] }, { type: "1f", name: "u53", value: a.Ya[1] }]); Q = I.a({ isPot: !1, isFloat: !1, width: O, height: F }); var R = new Float32Array([0, a.borderWidth, a.W, 0]); (function (P) { P.Ga = I.a({ isPot: !1, Td: !0, isFloat: !1, width: O, height: F }); P.Ha = I.a({ isPot: !0, isFloat: !1, width: a.ka }); var H = { width: 1, height: 1, isFloat: !0, isPot: !1, array: R }; P.ra = Ma.a(H); P.Kb = Ma.a(H) })(D); nb ? q(nb) : ia(function (P) {
                    P = JSON.parse(P);
                    q(P)
                })
            }, $c: function (L, ka) { for (var A in L) "undefined" !== typeof ka[A] && (L[A] = ka[A]) }, cc: function (L) { V.va && V.va(); var ka = { video: { facingMode: { ideal: lb.facingMode }, width: { min: lb.minWidth, max: lb.maxWidth, ideal: lb.idealWidth }, height: { min: lb.minHeight, max: lb.maxHeight, ideal: lb.idealHeight } }, audio: V.Wa }; lb.deviceId && (constraints.deviceId = lb.deviceId); jb(function (A, la) { mb = la; V.wa && V.wa(); L(A) }, function () { window.sa && window.sa("WEBCAM_UNAVAILABLE") }, ka) }, sb: function (L, ka) {
                var A = L.videoWidth, la = L.videoHeight;
                La.ha().width = A; La.ha().height = la; a.width = A; a.height = la; xa.zc(); var q = [.5, .5]; la /= A; A = La.F() / La.s(); la > A ? 1 >= la ? q[0] *= la : q[1] /= la : (q[0] *= la, la = 1 / A, q[0] *= la, q[1] *= la); q[1] *= A; xa.i(L); v.C("s49", [{ type: "1i", name: "u1", value: 0 }, { type: "2f", name: "u34", value: q }, { type: "2f", name: "u35", value: [.5, .5] }]); ka && ka()
            }
        }; return xa
    } V.onLoad = function (b) { V.ready ? b() : V.T.push(b) }; V.set_audio = function (b) { V.Wa = b }; V.switch_displayVideo = function (b) { V.ba = b; V.aa && (V.aa.style.display = V.ba ? "block" : "none") };
    V.onWebcamAsk = function (b) { V.va = b }; V.onContextLost = function (b) { V.ua = b }; V.onWebcamGet = function (b) { V.wa = b }; V.set_size = function (b, d) { a.width = b; a.height = d }; V.get_size = function () { return { width: a.width, height: a.height } }; V.get_videoStream = function () { return mb }; V.get_cv = function () { return La.ha() }; V.set_color = function (b) { v.C("s52", [{ type: "3f", name: "u51", value: b }]) };
    V.init = function (b) {
        var d = ob(), e = b.callbackReady ? b.callbackReady : function (l) { console.log("ERR:", l) }, g = b.callbackReady ? b.callbackReady.bind(!1) : !1; if ("undefined" === typeof b.canvasId) e("NO_CANVASID"); else if (document.getElementById(b.canvasId)) if (V.initialized) e("ALREADY_INITIALIZED"); else {
            V.initialized = !0; window.sa = e ? function (l) { e(l); window.sa = !1 } : !1; b.NNCpath && (a.Ta = b.NNCpath); "undefined" !== typeof b.NNC && (nb = "string" === typeof b.NNC ? JSON.parse(b.NNC) : b.NNC); g && V.T.push(g); if (!La.i({
                gb: b.canvasId, width: a.width,
                height: a.height, debug: !1, Ia: !1, Pc: function () { V.ua && V.ua() }, premultipliedAlpha: !1
            })) return e("GL_INCOMPATIBLE"), !1; V.aa = La.ha(); V.ba || (V.aa.style.display = "none"); G.i(); E.i(); v.i(); I.i(); p.depthFunc(p.LEQUAL); p.clearDepth(1); b.videoSettings && b.videoSettings.videoElement ? d.sb(b.videoSettings.videoElement, !1) : (b.videoSettings && d.$c(lb, b.videoSettings), d.cc(function (l) { d.sb(l, !1) })); return !0
        } else e("INVALID_CANVASID")
    }; window.JEEFACETRANSFERAPI = V;
    ; return JEEFACETRANSFERAPI;
})();