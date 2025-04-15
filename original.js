!function () {
  "use strict";
  {
    const t = crypto.subtle
      , s = 0
      , i = 1
      , h = 2
      , e = 3
      , n = 4
      , a = 5
      , r = 6
      , o = 7
      , c = 8
      , u = 9
      , l = 10
      , d = 11
      , w = 12
      , f = 13
      , m = 14
      , g = 15
      , p = 16
      , M = 17
      , v = 18
      , y = 19
      , b = 20
      , _ = 21
      , A = 22
      , C = 23
      , S = 24
      , T = 25
      , E = 26
      , x = 27
      , R = 28;
    let B = 0
      , L = [];
    function k(t) {
      return L[B][t]
    }
    let N, O, H, I = [], U = !0, D = !0, G = !1, F = !1, K = "", W = "", X = "", Y = 0, q = !1;
    class J {
      constructor() {
        this.t = [],
          this.t.length = 30
      }
      update() {
        let t = this.t.shift()
          , s = Date.now();
        return this.t.push(s),
          t ? 1e3 * this.t.length / (s - t) : 0
      }
    }
    class P {
      constructor(t) {
        this.i = 0,
          this.h = 0,
          this.o = new J,
          this.u = 0,
          this.l = this.m = t
      }
      start() {
        this.h || (this.h = Date.now())
      }
      pause() {
        this.h && (this.i += Date.now() - this.h,
          this.h = 0)
      }
      getTime() {
        return this.h ? Date.now() - this.h + this.i : this.i
      }
      p(t) {
        this.l = t
      }
      update() {
        this.u = this.o.update()
      }
      draw(t) {
        if (U) {
          const h = Math.floor(k(s) / 40);
          t.font = h + 'px "Consolas", monospace',
            t.textBaseline = "alphabetic";
          const e = t.measureText("M").actualBoundingBoxAscent
            , n = 1.4 * e
            , a = 2;
          let r = k(i) - k(M) - k(f) / 2 - 6 * n;
          t.fillStyle = "#ffffff99",
            t.fillRect(a, r, 13 * e, 4 * n + .4 * e),
            t.fillStyle = "rgba(0,0,0,1)",
            r += n,
            t.fillText("Life: " + Y, a + .4 * e, r),
            r += n,
            t.fillText("Block: " + this.l + " / " + this.m, a + .4 * e, r),
            r += n,
            t.fillText("Time: " + (this.getTime() / 1e3).toFixed(1), a + .4 * e, r),
            r += n,
            t.fillText("FPS: " + this.u.toFixed(0), a + .4 * e, r)
        }
      }
    }
    class j {
      constructor() {
        this.M = 0,
          this.v = 0,
          this._ = k(i) - k(M),
          this.A = k(w),
          this.C = k(f),
          this.S = k(g),
          this.T = k(p)
      }
      R() {
        return this.M
      }
      B() {
        return this.v
      }
      L() {
        return this._
      }
      k() {
        return this.A
      }
      N() {
        return this.C
      }
      draw(t) {
        t.fillStyle = this.S,
          t.fillRect(Math.floor(this.v - this.A / 2), Math.floor(this._ - this.C / 2), this.A, this.C),
          t.lineWidth = 1,
          t.strokeStyle = this.T,
          t.strokeRect(Math.floor(this.v - this.A / 2) + .5, Math.floor(this._ - this.C / 2) + .5, this.A - 1, this.C - 1)
      }
      moveTo(t) {
        this.M = this.v,
          this.v = t
      }
    }
    class z {
      constructor() {
        this.v = 0,
          this._ = 0,
          this.O = k(o),
          this.S = k(l),
          this.T = k(d)
      }
      B() {
        return this.v
      }
      L() {
        return this._
      }
      H() {
        return this.O
      }
      moveTo(t, s) {
        this.v = t,
          this._ = s
      }
      draw(t) {
        t.beginPath(),
          t.fillStyle = this.S,
          t.strokeStyle = this.T,
          t.arc(this.v, this._, this.O, 0, 2 * Math.PI),
          t.fill(),
          t.stroke()
      }
    }
    class V {
      constructor(t) {
        this.A = k(s),
          this.C = k(i),
          this.S = k(h),
          this.I = t
      }
      k() {
        return this.A
      }
      N() {
        return this.C
      }
      draw(t) {
        t.fillStyle = this.S,
          t.fillRect(0, 0, this.A, this.C),
          t.drawImage(this.I, 0, 0)
      }
    }
    class Q {
      constructor() {
        this.v = 0,
          this._ = k(i) - k(M) - k(f) / 2 - k(o),
          this.U = k(v),
          this.S = k(b),
          this.D = k(y),
          this.G = -45 * Math.PI / 180
      }
      B() {
        return this.v
      }
      L() {
        return this._
      }
      F() {
        return this.G
      }
      moveTo(t) {
        this.v = t
      }
      rotate(t) {
        this.G += this.D * t,
          this.G > -10 * Math.PI / 180 && (this.G = -10 * Math.PI / 180 * 2 - this.G,
            this.D = -Math.abs(this.D)),
          this.G < -170 * Math.PI / 180 && (this.G = -170 * Math.PI / 180 * 2 - this.G,
            this.D = Math.abs(this.D))
      }
      draw(t) {
        t.strokeStyle = this.S,
          t.beginPath(),
          t.moveTo(this.v, this._),
          t.lineTo(this.v + this.U * Math.cos(this.G), this._ + this.U * Math.sin(this.G)),
          t.stroke()
      }
    }
    class Z {
      constructor(t) {
        this.K = k(e),
          this.W = k(n),
          this.X = Math.floor((k(s) - k(a)) / k(e)),
          this.Y = Math.floor((k(i) - k(M) - k(f) / 2 - 2 * k(o) - 10 - k(r)) / k(n)),
          this.q = "rgba(255,255,255,0.7)",
          this.J = "rgba(0,0,0,0.3)",
          this.I = t,
          this.P = new Array,
          this.j = 0;
        let h = k(_);
        for (let t = 0; t < this.Y; ++t) {
          let s = new Array;
          for (let i = 0; i < this.X; ++i)
            this.j += s[i] = h[t] && h[t][i] || 0;
          this.P[t] = s
        }
      }
      reset() {
        this.j = 0;
        let t = k(_);
        for (let s = 0; s < this.Y; ++s)
          for (let i = 0; i < this.X; ++i)
            this.j += this.P[s][i] = t[s] && t[s][i] || 0
      }
      V() {
        return this.K
      }
      Z() {
        return this.W
      }
      $(t, s) {
        return this.P[t][s]
      }
      tt() {
        return this.j
      }
      st(t, s) {
        this.P[t][s] > 0 && (--this.P[t][s],
          --this.j)
      }
      it() {
        return this.X
      }
      ht() {
        return this.Y
      }
      draw(t) {
        const s = k(a)
          , i = k(r);
        for (let h = 0; h < this.Y; ++h)
          for (let e = 0; e < this.X; ++e)
            if (this.P[h][e] && (t.drawImage(this.I, s + e * this.K, i + h * this.W, this.K, this.W, s + e * this.K, i + h * this.W, this.K, this.W),
              D)) {
              const n = Math.max(1, (this.K + this.W) / 20)
                , a = n
                , r = s + e * this.K
                , o = i + h * this.W
                , c = r + this.K
                , u = o + this.W;
              t.fillStyle = this.J,
                t.beginPath(),
                t.moveTo(r, u),
                t.lineTo(c, u),
                t.lineTo(c, o),
                t.lineTo(c - n, o + a),
                t.lineTo(c - n, u - a),
                t.lineTo(r + n, u - a),
                t.closePath();
              for (let s = 0; s < this.P[h][e]; s++)
                t.fill();
              t.fillStyle = this.q,
                t.beginPath(),
                t.moveTo(c, o),
                t.lineTo(r, o),
                t.lineTo(r, u),
                t.lineTo(r + n, u - a),
                t.lineTo(r + n, o + a),
                t.lineTo(c - n, o + a),
                t.closePath();
              for (let s = 0; s < this.P[h][e]; s++)
                t.fill()
            }
      }
    }
    class $ {
      update(t, s, i, h, e, n) {
        return q
      }
      draw(t) {
        if (q) {
          t.fillStyle = "#ffffff80",
            t.fillRect(0, 0, k(s), k(i));
          const h = "Loading...";
          t.textBaseline = "alphabetic",
            t.fillStyle = "#000000",
            t.font = "italic bold " + Math.floor(k(s) / 24) + 'px "Arial", "Helvetica", sans-serif';
          let e = t.measureText(h);
          t.fillText(h, (k(s) - e.width) / 2, (k(i) + e.actualBoundingBoxAscent - e.actualBoundingBoxDescent) / 2)
        }
      }
    }
    class tt {
      constructor(t, s, i, h, e, n) {
        this.et = !1,
          this.nt = s,
          this.rt = i,
          this.ot = h,
          this.ct = e,
          this.ut = n,
          t.textBaseline = "alphabetic",
          t.font = i,
          this.lt = t.measureText("M").actualBoundingBoxAscent;
        const a = t.measureText(s);
        this.C = 2.6 * this.lt,
          this.dt = 1.8 * this.lt,
          this.A = a.width + 1.6 * this.lt,
          this.wt = .8 * this.lt
      }
      ft(t, s) {
        return t >= this.ot && t < this.ot + this.A && s >= this.ct && s < this.ct + this.C
      }
      k() {
        return this.A
      }
      N() {
        return this.C
      }
      update(t, s, i, h, e, n) {
        return this.et = this.ft(t, s),
          !e && this.et && i & ~h & 1 && this.ut(),
          this.et
      }
      draw(t) {
        t.textBaseline = "alphabetic",
          t.font = this.rt,
          t.beginPath(),
          t.roundRect(this.ot, this.ct, this.A, this.C, this.C / 8),
          t.closePath(),
          t.fillStyle = this.et ? "#ffeef4" : "#ffffff99",
          t.fill(),
          t.fillStyle = this.et ? "#f83366" : "#00000099",
          t.fillText(this.nt, this.ot + this.wt, this.ct + this.dt)
      }
    }
    class st extends tt {
      constructor(t, s, i, h, e, n, a) {
        super(t, s, i, h, e, n),
          this.wt += 1.2 * this.lt,
          this.A += 1.2 * this.lt,
          this.gt = a
      }
      draw(t) {
        super.draw(t),
          t.fillStyle = this.et ? "#f83366" : "#00000099",
          t.strokeStyle = this.et ? "#f83366" : "#00000099",
          t.lineWidth = 2,
          t.strokeRect(this.ot + this.wt - 1.3 * this.lt, this.ct + this.dt - this.lt, this.lt, this.lt),
          this.gt() && t.fillRect(this.ot + this.wt - 1.1 * this.lt, this.ct + this.dt - .8 * this.lt, .6 * this.lt, .6 * this.lt)
      }
    }
    class it {
      constructor(t) {
        this.Mt = !1,
          this.vt = !1;
        const i = "bold " + Math.floor(k(s) / 30) + 'px "Arial", "Helvetica", sans-serif'
          , h = k(s) / 80;
        let e = h;
        const n = h;
        this.yt = new tt(t, "⮞", i, e, n, (() => {
          this.Mt = !1
        }
        )),
          this.bt = new tt(t, "✖", i, e, n, (() => {
            this.Mt = !0
          }
          )),
          e += this.bt.k() + h,
          this._t = new st(t, "FULLSCREEN", i, e, n, (() => {
            F = !0
          }
          ), (() => !!document.fullscreenElement)),
          e += this._t.k() + h,
          this.At = new st(t, "SCORE", i, e, n, (() => {
            U = !U
          }
          ), (() => U)),
          e += this.At.k() + h,
          this.Ct = new st(t, "BLOCKS", i, e, n, (() => {
            D = !D
          }
          ), (() => D)),
          e += this.Ct.k() + h,
          this.St = new tt(t, "RESET", i, e, n, (() => {
            Y = 0,
              B = 0,
              G = !0
          }
          ))
      }
      update(t, s, i, h, e, n) {
        return this.vt = !1,
          this.Mt ? (this.vt = this.yt.update(t, s, i, h, e, n),
            e = this.vt || e) : (e = this.bt.update(t, s, i, h, e, n) || e,
              e = this._t.update(t, s, i, h, e, n) || e,
              e = this.At.update(t, s, i, h, e, n) || e,
              e = this.Ct.update(t, s, i, h, e, n) || e,
              e = this.St.update(t, s, i, h, e, n) || e),
          e
      }
      draw(t) {
        this.Mt ? this.vt && this.yt.draw(t) : (this.St.draw(t),
          this.Ct.draw(t),
          this.At.draw(t),
          this._t.draw(t),
          this.bt.draw(t))
      }
    }
    class ht {
      constructor(t, s, i, h, e, n) {
        this.Tt = 0,
          this.Et = null,
          this.xt = t,
          this.Rt = s,
          this.Bt = i,
          this.Lt = h,
          this.kt = e,
          this.Nt = k(c) * Math.cos(n),
          this.Ot = k(c) * Math.sin(n)
      }
      Ht(t, s, i, h) {
        return t * h - s * i
      }
      It(t, s, i, h, e, n, a, r) {
        let o = this.Ht(i - t, h - s, e - t, n - s)
          , c = this.Ht(i - t, h - s, a - t, r - s);
        if (o > 0 || c < 0 || o == c)
          return 1 / 0;
        let u = this.Ht(a - e, r - n, t - e, s - n)
          , l = this.Ht(a - e, r - n, i - e, h - n);
        return u < 0 && l < 0 || u > 0 && l > 0 || u == l ? 1 / 0 : u / (u - l)
      }
      Ut(t) {
        const s = k(u) * this.Tt + k(c)
          , i = (k(u) * (this.Tt + t) + k(c)) / s;
        this.Nt *= i,
          this.Ot *= i,
          this.Tt += t;
        const h = Math.sqrt(this.Nt * this.Nt + this.Ot * this.Ot)
          , e = this.Lt.B() - h
          , n = this.Lt.L() - h
          , o = this.Lt.B() + h
          , l = this.Lt.L() + h
          , d = k(a)
          , w = k(r)
          , f = this.Rt.V()
          , g = this.Rt.Z()
          , p = Math.max(0, Math.floor(e / f))
          , M = Math.min(this.Rt.it() - 1, Math.floor(o / f))
          , v = Math.max(0, Math.floor(n / g))
          , y = Math.min(this.Rt.ht() - 1, Math.floor(l / g));
        for (; ;) {
          const s = this.Lt.B()
            , i = this.Lt.L()
            , h = s + this.Nt * t
            , e = i + this.Ot * t;
          let n = 1 / 0
            , a = -1
            , r = -1
            , o = -1;
          const c = s - d
            , u = i - w
            , l = h - d
            , b = e - w;
          for (let t = v; t <= y; ++t)
            for (let s = p; s <= M; ++s) {
              if (0 == this.Rt.$(t, s))
                continue;
              const i = this.It(c, u, l, b, s * f, t * g, s * f, t * g + g);
              i < n && (n = i,
                a = t,
                r = s,
                o = 0);
              const h = this.It(c, u, l, b, s * f, t * g + g, s * f + f, t * g + g);
              h < n && (n = h,
                a = t,
                r = s,
                o = 1);
              const e = this.It(c, u, l, b, s * f + f, t * g + g, s * f + f, t * g);
              e < n && (n = e,
                a = t,
                r = s,
                o = 2);
              const d = this.It(c, u, l, b, s * f + f, t * g, s * f, t * g);
              d < n && (n = d,
                a = t,
                r = s,
                o = 3)
            }
          const _ = this.It(s, i, h, e, this.Bt.B() + this.Bt.k() / 2, this.Bt.L() - this.Bt.N() / 2 - this.Lt.H(), this.Bt.B() - this.Bt.k() / 2, this.Bt.L() - this.Bt.N() / 2 - this.Lt.H());
          _ < n && (n = _,
            a = -1,
            r = -1,
            o = 3);
          const A = this.It(s, i, h, e, 0, this.xt.N(), 0, 0);
          A < n && (n = A,
            a = -1,
            r = -1,
            o = 2);
          const C = this.It(s, i, h, e, 0, 0, this.xt.k(), 0);
          C < n && (n = C,
            a = -1,
            r = -1,
            o = 1);
          const S = this.It(s, i, h, e, this.xt.k(), 0, this.xt.k(), this.xt.N());
          if (S < n && (n = S,
            a = -1,
            r = -1,
            o = 0),
            !(n <= 1)) {
            this.Lt.moveTo(h, e);
            break
          }
          switch (-1 != a && this.Rt.st(a, r),
          this.Lt.moveTo(s + t * n * this.Nt, i + t * n * this.Ot),
          o) {
            case 0:
            case 2:
              this.Nt = -this.Nt;
              break;
            case 1:
            case 3:
              this.Ot = -this.Ot
          }
          if (3 === o && -1 === a) {
            const s = (this.Bt.B() - this.Bt.R()) / t;
            s > 0 ? s > this.Nt && (this.Nt += (s - this.Nt) * k(m)) : s < this.Nt && (this.Nt += (s - this.Nt) * k(m))
          }
        }
      }
      update(t, i, h, e, n, a) {
        const r = () => Y <= 0 ? "gameover" : this.Rt.tt() <= k(A) ? "clear" : "playing";
        return "clear" === r() ? (this.kt.pause(),
          this.Et = new at(this.xt, this.Rt, this.kt, "CLEAR", "", (() => (ut(),
            null))),
          !0) : this.Lt.L() > this.xt.N() ? (this.kt.pause(),
            Y--,
            "gameover" === r() ? (this.Et = new at(this.xt, this.Rt, this.kt, "GAME OVER", "", (() => {
              switch (k(E)) {
                case "allow":
                  return new at(this.xt, this.Rt, this.kt, "CLICK TO CONTINUE", "", (() => (Y = k(S) ? k(x) : k(C),
                    new nt(this.xt, this.Rt, this.Bt, this.Lt, this.kt))));
                case "deny":
                  return new at(this.xt, this.Rt, this.kt, "CLICK TO RESET", "", (() => (B = 0,
                    G = !0,
                    Y = 0,
                    null)));
                case "stage":
                  return new at(this.xt, this.Rt, this.kt, "CLICK TO RETRY", "", (() => (G = !0,
                    Y = k(S) ? k(x) : 0,
                    null)))
              }
            }
            )),
              !0) : (this.Et = new nt(this.xt, this.Rt, this.Bt, this.Lt, this.kt),
                !0)) : (t = Math.max(10, Math.min(k(s) - 10, t)),
                  this.Bt.moveTo(t),
                  this.Ut(a),
                  this.kt.p(this.Rt.tt()),
                  this.kt.update(),
                  !0)
      }
      draw(t) {
        this.xt.draw(t),
          this.Rt.draw(t),
          this.kt.draw(t),
          this.Bt.draw(t),
          this.Lt.draw(t)
      }
      Dt() {
        return this.Et
      }
    }
    class et {
      constructor(t, s, h, e, n) {
        this.Gt = new Q,
          this.Ft = k(i) - k(M) - k(f) / 2 - k(o),
          this.Et = null,
          this.xt = t,
          this.Rt = s,
          this.Bt = h,
          this.Lt = e,
          this.kt = n
      }
      update(t, h, e, n, a, r) {
        return !a && e & ~n & 1 && t >= 0 && t < k(s) && h >= 0 && h < k(i) ? (this.kt.start(),
          this.Et = new ht(this.xt, this.Rt, this.Bt, this.Lt, this.kt, this.Gt.F()),
          !0) : (t = Math.max(10, Math.min(k(s) - 10, t)),
            this.Bt.moveTo(t),
            this.Lt.moveTo(t, this.Ft),
            this.Gt.moveTo(t),
            this.Gt.rotate(r),
            this.kt.p(this.Rt.tt()),
            this.kt.update(),
            !0)
      }
      draw(t) {
        this.xt.draw(t),
          this.Rt.draw(t),
          this.kt.draw(t),
          this.Bt.draw(t),
          this.Lt.draw(t),
          this.Gt.draw(t)
      }
      Dt() {
        return this.Et
      }
    }
    class nt {
      constructor(t, s, i, h, e) {
        this.Et = null,
          this.xt = t,
          this.Rt = s,
          this.Bt = i,
          this.Lt = h,
          this.kt = e
      }
      update(t, h, e, n, a, r) {
        return !a && e & ~n & 1 && t >= 0 && t < k(s) && h >= 0 && h < k(i) ? (this.Et = new et(this.xt, this.Rt, this.Bt, this.Lt, this.kt),
          !0) : (t = Math.max(10, Math.min(k(s) - 10, t)),
            this.Bt.moveTo(t),
            this.Lt.moveTo(t, k(i) - k(M) - k(f) / 2 - k(o)),
            this.kt.p(this.Rt.tt()),
            this.kt.update(),
            !0)
      }
      draw(t) {
        this.xt.draw(t),
          this.Rt.draw(t),
          this.kt.draw(t),
          this.Bt.draw(t),
          this.Lt.draw(t)
      }
      Dt() {
        return this.Et
      }
    }
    class at {
      constructor(t, s, i, h, e, n) {
        this.Kt = !1,
          this.Et = null,
          this.xt = t,
          this.Rt = s,
          this.kt = i,
          this.Wt = h,
          this.Xt = e,
          this.Yt = n
      }
      update(t, h, e, n, a, r) {
        return !a && e & ~n & 1 && t >= 0 && t < k(s) && h >= 0 && h < k(i) && (this.Kt || (this.Et = this.Yt()),
          this.Kt = !this.Kt),
          this.kt.update(),
          !0
      }
      draw(t) {
        if (this.xt.draw(t),
          this.Rt.draw(t),
          this.kt.draw(t),
          !this.Kt) {
          t.fillStyle = "#ffffff80",
            t.fillRect(0, 0, k(s), k(i)),
            t.font = "italic bold " + Math.floor(k(s) / 12) + 'px "Arial", "Helvetica", sans-serif';
          let h = t.measureText(this.Wt);
          t.fillStyle = "rgb(255,0,0)",
            t.fillText(this.Wt, (k(s) - h.width) / 2, (k(i) + h.actualBoundingBoxAscent - h.actualBoundingBoxDescent) / 2),
            t.fillStyle = "rgb(255,255,255)",
            t.font = "bold 24px serif",
            h = t.measureText(this.Xt),
            t.fillText(this.Xt, (k(s) - h.width) / 2, k(i) / 2 + 30)
        }
      }
      Dt() {
        return this.Et
      }
    }
    class rt {
      constructor(t) {
        this.qt = 0,
          this.Jt = 0,
          this.buttons = 0,
          this.Pt = !1,
          document.addEventListener("touchmove", (t => {
            this.qt = t.touches[0].clientX,
              this.Jt = t.touches[0].clientY
          }
          )),
          document.addEventListener("touchstart", (t => {
            this.qt = t.touches[0].clientX,
              this.Jt = t.touches[0].clientY,
              this.Pt = !0
          }
          )),
          document.addEventListener("touchend", (t => {
            this.Pt = !1
          }
          )),
          document.addEventListener("mousemove", (t => {
            this.qt = t.clientX,
              this.Jt = t.clientY,
              this.buttons = t.buttons
          }
          )),
          document.addEventListener("mousedown", (t => {
            this.qt = t.clientX,
              this.Jt = t.clientY,
              this.buttons = t.buttons
          }
          )),
          document.addEventListener("mouseup", (t => {
            this.qt = t.clientX,
              this.Jt = t.clientY,
              this.buttons = t.buttons
          }
          )),
          t && (document.onselectstart = t => !1)
      }
    }
    class ot {
      constructor() {
        this.jt = null
      }
      start(t) {
        this.zt();
        let s = !1
          , i = 0;
        this.jt = () => {
          s = !0
        }
          ;
        let h = e => {
          s ? s = !1 : (i || (i = e),
            e > i + 1 && (t(Math.min(.1, (e - i) / 1e3)),
              i = e),
            requestAnimationFrame(h))
        }
          ;
        requestAnimationFrame(h)
      }
      zt() {
        this.jt && (this.jt(),
          this.jt = null)
      }
    }
    const ct = new ot;
    async function ut() {
      if (!q) {
        q = !0;
        try {
          if (K && !N && B + 1 >= L.length && (k(R) ? await _t() : await bt()),
            B + 1 < L.length)
            return B++,
              void (G = !0);
          let t = document.getElementById("div_clear");
          if (t.firstChild)
            return;
          document.fullscreenElement && document.exitFullscreen();
          let s = document.createElement("p");
          s.innerText = O,
            t.appendChild(s);
          for (let s of N) {
            let i = document.createElement("img");
            i.src = s;
            const h = new Promise((t => i.onload = t));
            let e = document.createElement("a");
            e.href = s,
              e.target = "_blank",
              e.appendChild(i),
              t.appendChild(e),
              t.appendChild(document.createElement("br")),
              await h
          }
          t.classList.remove("hidden"),
            window.scrollTo({
              top: t.offsetTop,
              behavior: "smooth"
            })
        } finally {
          q = !1
        }
      }
    }
    function lt(t) {
      return (new TextEncoder).encode(t)
    }
    function dt(t) {
      return (new TextDecoder).decode(t)
    }
    async function wt(s) {
      return new Uint8Array(await t.digest("SHA-256", lt(s)))
    }
    function ft(t) {
      let s = "";
      for (let i = 0; i < t.length; i++)
        s += ("0" + t[i].toString(16)).substr(-2);
      return s
    }
    function mt(t) {
      t = atob(t.replace(/-/g, "+").replace(/_/g, "/"));
      let s = new Uint8Array(t.length);
      for (let i = 0; i < s.length; i++)
        s[i] = t.charCodeAt(i);
      return s
    }
    async function gt(t) {
      return ft(await wt(t))
    }
    async function pt(t, s) {
      const i = s ? await gt(K + W + "/" + t) : t;
      if ("file:" === document.location.protocol) {
        const t = await new Promise((async t => {
          const s = document.createElement("script");
          window[i] = h => {
            delete window[i],
              s.remove(),
              t(h)
          }
            ,
            s.src = X + "/" + i + ".js",
            document.body.appendChild(s)
        }
        ))
          , s = await fetch(t);
        return new Uint8Array(await s.arrayBuffer())
      }
      {
        const t = await fetch(X + "/" + i + ".bin");
        return new Uint8Array(await t.arrayBuffer())
      }
    }
    async function Mt(s, i) {
      const h = i.subarray(0, i.length - 16)
        , e = i.subarray(i.length - 16)
        , n = new Uint8Array(await t.digest("SHA-256", i.subarray(0, i.length - 16)));
      for (let t = 0; t < 16; t++)
        e[t] = e[t] ^ n[t] ^ s[t];
      const a = await t.importKey("raw", e, {
        name: "AES-GCM"
      }, !1, ["encrypt", "decrypt"]);
      return await t.decrypt({
        name: "AES-GCM",
        iv: h.subarray(0, 12)
      }, a, h.subarray(12))
    }
    async function vt(t, s, i) {
      const h = await pt(s, i);
      return await Mt(t, h)
    }
    async function yt(t) {
      var s, i, h;
      const e = await wt(K + W)
        , n = mt(t)
        , a = JSON.parse(dt(await Mt(e, n)))
        , r = document.getElementById("a_author");
      if (r.innerText = a[2],
        r.href = a[3],
        document.getElementById("p_description").innerHTML = a[1].replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&apos;").replace(/"/g, "&quot;").replace(/\n/g, "<br />"),
        document.getElementById("h1_title").innerText = a[0],
        document.title = a[0] + " " + document.title,
        a[5]) {
        const t = document.createElement("span");
        t.innerText = "R-18",
          null === (s = document.getElementById("div_tags")) || void 0 === s || s.appendChild(t)
      }
      if (a[6]) {
        const t = document.createElement("span");
        t.innerText = "生成 AI",
          null === (i = document.getElementById("div_tags")) || void 0 === i || i.appendChild(t)
      }
      const o = (c = new Date(a[4])).getFullYear() + "-" + ("0" + (c.getMonth() + 1)).substr(-2) + "-" + ("0" + c.getDate()).substr(-2) + " " + ("0" + c.getHours()).substr(-2) + ":" + ("0" + c.getMinutes()).substr(-2);
      var c;
      null === (h = document.getElementById("div_time")) || void 0 === h || h.appendChild(document.createTextNode(o))
    }
    async function bt() {
      const t = L.length
        , s = await wt(K + W)
        , i = JSON.parse(dt(await vt(s, "stage" + t, !0)))
        , h = [await createImageBitmap(new Blob([await vt(s, "img_fg" + t, !0)])), await createImageBitmap(new Blob([await vt(s, "img_bg" + t, !0)]))];
      L[t] = i,
        I[t] = h
    }
    async function _t() {
      const t = await wt(K + W)
        , s = JSON.parse(dt(await vt(t, "clear" + L.length, !0)))
        , i = [];
      for (let h = 0; h < s[1]; h++)
        i.push(URL.createObjectURL(new Blob([await vt(t, "clear_image" + h, !0)], {
          type: "image/png"
        })));
      N = i,
        O = s[0]
    }
    function At(t, s, i) {
      K = t,
        W = s,
        X = i
    }
    function Ct(t, s, i, h) {
      I = t,
        L = s,
        O = i,
        N = h
    }
    async function St() {
      B = 0,
        L.length <= 0 && K && await bt()
    }
    function Tt() {
      let t = document.getElementById("canvas_game")
        , h = t.getContext("2d")
        , e = () => {
          t.width = k(s),
            t.height = k(i),
            k(S) ? 0 === B && (Y = k(T)) : Y = k(C);
          let h = new Z(I[B][0]);
          return new nt(new V(I[B][1]), h, new j, new z, new P(h.tt()))
        }
        , n = new $
        , a = new it(h)
        , r = e()
        , o = 0;
      ct.start((s => {
        G && (r = e(),
          a = new it(h),
          G = !1),
          F && (document.fullscreenElement ? document.exitFullscreen() : t.requestFullscreen(),
            F = !1);
        const i = t.getBoundingClientRect()
          , c = Math.min(i.height / t.height, i.width / t.width)
          , u = c * t.width
          , l = c * t.height
          , d = (i.width - u) / 2
          , w = (i.height - l) / 2
          , f = (H.qt - i.left - d) / c
          , m = (H.Jt - i.top - w) / c
          , g = H.buttons | (H.Pt ? 1 : 0);
        let p = !1;
        for (p = n.update(f, m, g, o, p, s) || p,
          p = a.update(f, m, g, o, p, s) || p; ;) {
          p = r.update(f, m, g, o, p, s) || p;
          const t = r.Dt();
          if (!t)
            break;
          r = t
        }
        r.draw(h),
          a.draw(h),
          n.draw(h),
          o = g
      }
      ))
    }
    window.addEventListener("load", (() => {
      H = new rt(!1);
      const t = window.bk_config;
      if (!t)
        return;
      const s = async () => {
        var i, h, e, n, a, r, o;
        if (t.hidden) {
          let a = "";
          location.hash && (a = location.hash.substr(1)),
            At(t.id, a, t.assetBase);
          try {
            await yt(t.meta)
          } catch (t) {
            return document.getElementById("form_password").addEventListener("submit", (() => {
              const t = document.getElementById("input_password").value;
              return t && (location.hash = "#" + t,
                s()),
                !1
            }
            )),
              null === (i = document.getElementById("div_main")) || void 0 === i || i.classList.add("hidden"),
              null === (h = document.getElementById("div_delete")) || void 0 === h || h.classList.add("hidden"),
              null === (e = document.getElementById("div_password")) || void 0 === e || e.classList.remove("hidden"),
              void (a && (null === (n = document.getElementById("div_password_alert")) || void 0 === n || n.classList.remove("hidden")))
          }
        } else
          At(t.id, "", t.assetBase);
        try {
          await St(),
            null === (a = document.getElementById("div_main")) || void 0 === a || a.classList.remove("hidden"),
            null === (r = document.getElementById("div_delete")) || void 0 === r || r.classList.remove("hidden"),
            null === (o = document.getElementById("div_password")) || void 0 === o || o.classList.add("hidden"),
            Tt()
        } catch (t) {
          alert("リソースの読み込みに失敗しました")
        }
      }
        ;
      s()
    }
    )),
      window.block = {
        setGameId: At,
        setGameData: Ct,
        initialize: St,
        run: Tt,
        shutdown: () => {
          ct.zt()
        }
      }
  }
}();
//# sourceMappingURL=play-block-e3a4bc6fdec18fa0d32247f479f6de26561e5b3e.js.map
