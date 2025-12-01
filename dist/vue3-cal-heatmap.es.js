var re = Object.defineProperty;
var se = (e, t, a) => t in e ? re(e, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : e[t] = a;
var i = (e, t, a) => se(e, typeof t != "symbol" ? t + "" : t, a);
import { defineComponent as oe, ref as _, toRefs as le, watch as A, toRef as Y, nextTick as ie, onMounted as he, onBeforeUnmount as ue, createElementBlock as d, openBlock as c, normalizeClass as x, createCommentVNode as O, createElementVNode as v, Fragment as D, renderList as k, toDisplayString as w, normalizeStyle as P, renderSlot as W } from "vue";
import de, { createSingleton as ce } from "tippy.js";
const u = class u {
  constructor(t, a, r, o = u.DEFAULT_RANGE_COLOR_LIGHT, h = 0, l = "linear") {
    i(this, "startDate");
    i(this, "endDate");
    i(this, "startWeekday");
    i(this, "max");
    i(this, "colorRange");
    i(this, "_values");
    i(this, "_firstFullWeekOfMonths");
    i(this, "_activities");
    i(this, "_calendar");
    i(this, "colorScale");
    i(this, "_percentileThresholds");
    this.endDate = this.parseDate(t), this.max = r || Math.ceil(Math.max(...a.map((g) => g.count)) / 5 * 4), this.startWeekday = h, this.colorRange = o, this.colorScale = l, this.startDate = this.shiftDate(t, -u.DAYS_IN_ONE_YEAR), this._values = a;
  }
  set values(t) {
    this.max = Math.ceil(Math.max(...t.map((a) => a.count)) / 5 * 4), this._values = t, this._firstFullWeekOfMonths = void 0, this._calendar = void 0, this._activities = void 0, this._percentileThresholds = void 0;
  }
  get values() {
    return this._values;
  }
  get activities() {
    if (!this._activities) {
      this._activities = /* @__PURE__ */ new Map();
      for (let t = 0, a = this.values.length; t < a; t++)
        this._activities.set(this.keyDayParser(this.values[t].date), {
          count: this.values[t].count,
          colorIndex: this.getColorIndex(this.values[t].count)
        });
    }
    return this._activities;
  }
  get weekCount() {
    return this.getDaysCount() / u.DAYS_IN_WEEK;
  }
  get calendar() {
    if (!this._calendar) {
      let t = this.shiftDate(
        this.startDate,
        -this.getCountEmptyDaysAtStart()
      );
      t = new Date(t.getFullYear(), t.getMonth(), t.getDate()), this._calendar = new Array(this.weekCount);
      for (let a = 0, r = this._calendar.length; a < r; a++) {
        this._calendar[a] = new Array(u.DAYS_IN_WEEK);
        for (let o = 0; o < u.DAYS_IN_WEEK; o++) {
          const h = this.activities.get(this.keyDayParser(t));
          this._calendar[a][o] = {
            date: new Date(t.valueOf()),
            count: h ? h.count : void 0,
            colorIndex: h ? h.colorIndex : 0
          }, t.setDate(t.getDate() + 1);
        }
      }
    }
    return this._calendar;
  }
  get firstFullWeekOfMonths() {
    if (!this._firstFullWeekOfMonths) {
      const t = this.calendar;
      this._firstFullWeekOfMonths = [];
      for (let a = 1, r = t.length; a < r; a++) {
        const o = t[a - 1][0].date, h = t[a][0].date;
        (o.getFullYear() < h.getFullYear() || o.getMonth() < h.getMonth()) && this._firstFullWeekOfMonths.push({
          value: h.getMonth(),
          index: a
        });
      }
    }
    return this._firstFullWeekOfMonths;
  }
  getCountEmptyDaysAtStart() {
    return this.startDate.getDay();
  }
  getDayOfWeek(t) {
    return (t.getDay() - this.startWeekday + u.DAYS_IN_WEEK) % u.DAYS_IN_WEEK;
  }
  getCountEmptyDaysAtEnd() {
    return u.DAYS_IN_WEEK - 1 - this.endDate.getDay();
  }
  getDaysCount() {
    return u.DAYS_IN_ONE_YEAR + 1 + this.getCountEmptyDaysAtStart() + this.getCountEmptyDaysAtEnd();
  }
  shiftDate(t, a) {
    const r = new Date(t);
    return r.setDate(r.getDate() + a), r;
  }
  parseDate(t) {
    return t instanceof Date ? t : new Date(t);
  }
  keyDayParser(t) {
    const a = this.parseDate(t);
    return String(a.getFullYear()) + String(a.getMonth()).padStart(2, "0") + String(a.getDate()).padStart(2, "0");
  }
  get percentileThresholds() {
    if (!this._percentileThresholds) {
      const t = this._values.map((r) => r.count).filter((r) => r > 0).sort((r, o) => r - o);
      if (t.length === 0)
        return this._percentileThresholds = [], this._percentileThresholds;
      const a = this.colorRange.length - 1;
      this._percentileThresholds = [];
      for (let r = 1; r < a; r++) {
        const o = r / a, h = Math.floor(o * t.length);
        this._percentileThresholds.push(t[Math.min(h, t.length - 1)]);
      }
    }
    return this._percentileThresholds;
  }
  // getColorIndex(count?: number) {
  //   if (count === null || count === undefined) {
  //     return 0;
  //   } else if (count <= 0) {
  //     return 1;
  // 	} else if (count >= this.max) { // TODO max range exclusive flag
  // 		return this.colorRange.length - 1;
  //   } else {
  //     // Old way of calculating colorIndex
  //     // return Math.ceil(((count * 100) / this.max) * 0.03) + 1;
  //     const percentage = ((count * 100) / this.max)  / 100;
  //     const colorIndex = Math.floor(percentage * (this.colorRange.length - 2)) + 1;
  //     return colorIndex;
  //   }
  // }
  getColorIndex(t) {
    if (t == null)
      return 0;
    if (t <= 0)
      return 1;
    if (t >= this.max)
      return this.colorRange.length - 1;
    switch (this.colorScale) {
      case "percentile":
        return this.getPercentileColorIndex(t);
      case "logarithmic":
        return this.getLogarithmicColorIndex(t);
      default:
        return this.getLinearColorIndex(t);
    }
  }
  getLinearColorIndex(t) {
    const a = t / this.max;
    return Math.floor(a * (this.colorRange.length - 2)) + 1;
  }
  getPercentileColorIndex(t) {
    const a = this.percentileThresholds;
    if (a.length === 0) return 1;
    for (let r = 0; r < a.length; r++)
      if (t <= a[r])
        return r + 1;
    return this.colorRange.length - 1;
  }
  getLogarithmicColorIndex(t) {
    const a = Math.log(t + 1), r = Math.log(this.max + 1), o = a / r;
    return Math.floor(o * (this.colorRange.length - 2)) + 1;
  }
};
i(u, "DEFAULT_RANGE_COLOR_LIGHT", [
  "#ebedf0",
  "#dae2ef",
  "#c0ddf9",
  "#73b3f3",
  "#3886e1",
  "#17459e"
]), i(u, "DEFAULT_RANGE_COLOR_DARK", [
  "#1f1f22",
  "#1e334a",
  "#1d466c",
  "#1d5689",
  "#1d69ac",
  "#1B95D1"
]), // other color candidates
// static readonly DEFAULT_RANGE_COLOR_LIGHT = [ '#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39' ];
// static readonly DEFAULT_RANGE_COLOR_DARK  = [ '#161b22', '#0e4429', '#006d32', '#26a641', '#39d353' ];
// static readonly DEFAULT_RANGE_COLOR_DARK    = [ '#011526', '#012E40', '#025959', '#02735E', '#038C65' ];
// static readonly DEFAULT_RANGE_COLOR_DARK    = [ '#161b22', '#015958', '#008F8C', '#0CABA8', '#0FC2C0' ];
// static readonly DEFAULT_RANGE_COLOR_DARK    = [ '#012030', '#13678A', '#45C4B0', '#9AEBA3', '#DAFDBA' ];
i(u, "DEFAULT_LOCALE", {
  months: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  on: "on",
  less: "Less",
  more: "More"
}), i(u, "DEFAULT_TOOLTIP_UNIT", "contributions"), i(u, "DAYS_IN_ONE_YEAR", 365), i(u, "DAYS_IN_WEEK", 7), i(u, "SQUARE_SIZE", 10);
let s = u;
const _e = /* @__PURE__ */ oe({
  name: "CalendarHeatmap",
  props: {
    endDate: {
      required: !0
    },
    startWeekday: {
      type: Number,
      default: 0
      // 0 for Sunday, 1 for Monday, etc.
    },
    max: {
      type: Number
    },
    rangeColor: {
      type: Array
    },
    values: {
      type: Array,
      required: !0
    },
    locale: {
      type: Object
    },
    tooltip: {
      type: Boolean,
      default: !0
    },
    tooltipUnit: {
      type: String,
      default: s.DEFAULT_TOOLTIP_UNIT
    },
    tooltipFormatter: {
      type: Function
    },
    noDataText: {
      type: [Boolean, String],
      default: null
    },
    round: {
      type: Number,
      default: 0
    },
    darkMode: Boolean,
    showLegend: {
      type: Boolean,
      default: !0
    },
    showWeekdays: {
      type: Boolean,
      default: !0
    },
    asDots: {
      type: Boolean,
      default: !1
    },
    dayClasses: {
      type: [String, Array],
      default: ""
    },
    colorScale: {
      type: String,
      default: "linear"
    }
  },
  emits: ["dayClick"],
  setup(e) {
    const t = s.SQUARE_SIZE / 5, a = s.SQUARE_SIZE + t, r = e.showWeekdays ? Math.ceil(s.SQUARE_SIZE * 2.5) : 0, o = a * 3, h = s.SQUARE_SIZE + s.SQUARE_SIZE / 2, l = s.SQUARE_SIZE + s.SQUARE_SIZE / 2, g = `translate(${r}, ${h})`, I = _(null), R = _(/* @__PURE__ */ new Date()), S = _(
      new s(
        e.endDate,
        e.values,
        e.max,
        e.rangeColor,
        e.startWeekday,
        e.colorScale
      )
    ), C = _(0), L = _(0), N = _("0 0 0 0"), F = _("0 0 0 0"), $ = _(""), b = _(""), Q = _(""), m = _({}), T = _(
      e.rangeColor || (e.darkMode ? s.DEFAULT_RANGE_COLOR_DARK : s.DEFAULT_RANGE_COLOR_LIGHT)
    ), K = s.DAYS_IN_WEEK, Z = _(e.round);
    e.asDots && (Z.value = 20);
    const { values: H, tooltipUnit: z, tooltipFormatter: V, noDataText: q, max: J, locale: j } = le(e), f = /* @__PURE__ */ new Map();
    let y;
    function B() {
      f.clear(), y ? y.setInstances(Array.from(f.values())) : y = ce(Array.from(f.values()), {
        overrides: [],
        moveTransition: "transform 0.1s ease-out",
        allowHTML: !0
      });
    }
    function X(n) {
      if (e.tooltip) {
        if (n.count !== void 0)
          return e.tooltipFormatter ? e.tooltipFormatter(n, e.tooltipUnit) : `<b>${n.count} ${e.tooltipUnit}</b> ${m.value.on} ${m.value.months[n.date.getMonth()]} ${n.date.getDate()}, ${n.date.getFullYear()}`;
        if (e.noDataText)
          return `${e.noDataText}`;
        if (e.noDataText !== !1)
          return `<b>No ${e.tooltipUnit}</b> ${m.value.on} ${m.value.months[n.date.getMonth()]} ${n.date.getDate()}, ${n.date.getFullYear()}`;
      }
    }
    function ee(n) {
      return `translate(${n * a}, 0)`;
    }
    function te(n) {
      return `translate(0, ${n * a})`;
    }
    function ae(n) {
      return {
        x: a * (n.index - 1),
        y: a - t
      };
    }
    A(
      [Y(e, "rangeColor"), Y(e, "darkMode")],
      ([n, E]) => {
        T.value = n || (E ? s.DEFAULT_RANGE_COLOR_DARK : s.DEFAULT_RANGE_COLOR_LIGHT);
      }
    ), C.value = r + a * S.value.weekCount + t, L.value = h + a * s.DAYS_IN_WEEK, $.value = `translate(0, ${h})`, b.value = `translate(${r}, 0)`, A([C, L], ([n, E]) => N.value = ` 0 0 ${n} ${E}`, {
      immediate: !0
    }), A(
      [C, L, T],
      ([n, E, p]) => {
        Q.value = `translate(${n - a * p.length - 30}, ${E - l})`;
      },
      { immediate: !0 }
    ), A(
      j,
      (n) => m.value = n ? { ...s.DEFAULT_LOCALE, ...n } : s.DEFAULT_LOCALE,
      { immediate: !0 }
    ), A(
      T,
      (n) => F.value = `0 0 ${s.SQUARE_SIZE * (n.length + 1)} ${s.SQUARE_SIZE}`,
      { immediate: !0 }
    ), A(
      [H, z, V, q, J, T],
      () => {
        S.value = new s(
          e.endDate,
          e.values,
          e.max
        ), f.forEach((n) => n.destroy()), ie(B);
      }
    ), he(B), ue(() => {
      y == null || y.destroy(), f.forEach((n) => n.destroy());
    });
    function ne(n) {
      if (y && n.target && n.target.classList.contains("vch__day__square") && n.target.dataset.weekIndex !== void 0 && n.target.dataset.dayIndex !== void 0) {
        const E = Number(n.target.dataset.weekIndex), p = Number(n.target.dataset.dayIndex);
        if (!isNaN(E) && !isNaN(p)) {
          const U = X(
            S.value.calendar[E][p]
          );
          if (U && S.value.calendar[E][p].count) {
            const M = f.get(n.target);
            M ? M.setContent(U) : M || (f.set(
              n.target,
              de(n.target, { content: U })
            ), y.setInstances(Array.from(f.values())));
          }
        }
      }
    }
    return {
      SQUARE_BORDER_SIZE: t,
      SQUARE_SIZE: a,
      DAYS_IN_WEEK: K,
      LEFT_SECTION_WIDTH: r,
      RIGHT_SECTION_WIDTH: o,
      TOP_SECTION_HEIGHT: h,
      BOTTOM_SECTION_HEIGHT: l,
      svg: I,
      heatmap: S,
      now: R,
      width: C,
      height: L,
      viewbox: N,
      daysLabelWrapperTransform: $,
      monthsLabelWrapperTransform: b,
      yearWrapperTransform: g,
      legendWrapperTransform: Q,
      lo: m,
      legendViewbox: F,
      curRangeColor: T,
      getWeekPosition: ee,
      getDayPosition: te,
      getMonthLabelPosition: ae,
      initTippyLazy: ne,
      rounding: Z,
      asDots: e.asDots
    };
  }
}), ge = (e, t) => {
  const a = e.__vccOpts || e;
  for (const [r, o] of t)
    a[r] = o;
  return a;
}, Ee = ["viewBox"], fe = ["transform"], ye = ["x", "y"], ve = ["transform"], De = ["y"], Se = ["transform"], me = ["transform"], Ae = ["rx", "ry", "transform", "width", "height", "data-week-index", "data-day-index", "onClick"], Ie = {
  key: 0,
  class: "vch__legend"
}, Re = { class: "vch__legend-left" }, Te = { class: "vch__legend-right" }, pe = { class: "vch__legend" }, ke = ["viewBox", "height"], Ce = { class: "vch__legend__wrapper" }, Le = ["rx", "ry", "width", "height", "x"];
function Oe(e, t, a, r, o, h) {
  return c(), d("div", {
    class: x({ vch__container: !0, "dark-mode": e.darkMode })
  }, [
    (c(), d("svg", {
      class: "vch__wrapper",
      ref: "svg",
      viewBox: e.viewbox
    }, [
      v("g", {
        class: "vch__months__labels__wrapper",
        transform: e.monthsLabelWrapperTransform
      }, [
        (c(!0), d(D, null, k(e.heatmap.firstFullWeekOfMonths, (l, g) => (c(), d("text", {
          class: "vch__month__label",
          key: g,
          x: e.getMonthLabelPosition(l).x,
          y: e.getMonthLabelPosition(l).y
        }, w(e.lo.months[l.value]), 9, ye))), 128))
      ], 8, fe),
      e.showWeekdays ? (c(), d("g", {
        key: 0,
        class: "vch__days__labels__wrapper",
        transform: e.daysLabelWrapperTransform
      }, [
        (c(), d(D, null, k([0, 1, 2, 3, 4, 5, 6], (l) => (c(), d(D, null, [
          (l + e.startWeekday) % 2 == 1 ? (c(), d("text", {
            class: "vch__day__label",
            key: l,
            x: 0,
            y: e.SQUARE_SIZE - e.SQUARE_BORDER_SIZE + e.SQUARE_SIZE * l
          }, w(e.lo.days[(l + e.startWeekday) % e.DAYS_IN_WEEK]), 9, De)) : O("", !0)
        ], 64))), 64))
      ], 8, ve)) : O("", !0),
      v("g", {
        class: "vch__year__wrapper",
        transform: e.yearWrapperTransform,
        onMouseover: t[0] || (t[0] = (...l) => e.initTippyLazy && e.initTippyLazy(...l))
      }, [
        (c(!0), d(D, null, k(e.heatmap.calendar, (l, g) => (c(), d("g", {
          class: "vch__month__wrapper",
          key: g,
          transform: e.getWeekPosition(g)
        }, [
          (c(!0), d(D, null, k(l, (I, R) => (c(), d(D, { key: R }, [
            I.date < e.now ? (c(), d("rect", {
              key: 0,
              class: x(["vch__day__square", e.dayClasses]),
              rx: e.rounding,
              ry: e.rounding,
              transform: e.getDayPosition(R),
              width: e.SQUARE_SIZE - e.SQUARE_BORDER_SIZE,
              height: e.SQUARE_SIZE - e.SQUARE_BORDER_SIZE,
              style: P({ fill: e.curRangeColor[I.colorIndex] }),
              "data-week-index": g,
              "data-day-index": R,
              onClick: (S) => e.$emit("dayClick", I)
            }, null, 14, Ae)) : O("", !0)
          ], 64))), 128))
        ], 8, me))), 128))
      ], 40, Se)
    ], 8, Ee)),
    e.showLegend ? (c(), d("div", Ie, [
      W(e.$slots, "legend", {}, () => [
        v("div", Re, [
          W(e.$slots, "vch__legend-left")
        ]),
        v("div", Te, [
          W(e.$slots, "legend-right", {}, () => [
            v("div", pe, [
              v("div", null, w(e.lo.less), 1),
              (c(), d("svg", {
                class: "vch__external-legend-wrapper",
                viewBox: e.legendViewbox,
                height: e.SQUARE_SIZE - e.SQUARE_BORDER_SIZE
              }, [
                v("g", Ce, [
                  (c(!0), d(D, null, k(e.curRangeColor, (l, g) => (c(), d("rect", {
                    key: g,
                    rx: e.rounding,
                    ry: e.rounding,
                    style: P({ fill: l }),
                    width: e.SQUARE_SIZE - e.SQUARE_BORDER_SIZE,
                    height: e.SQUARE_SIZE - e.SQUARE_BORDER_SIZE,
                    x: e.SQUARE_SIZE * g
                  }, null, 12, Le))), 128))
                ])
              ], 8, ke)),
              v("div", null, w(e.lo.more), 1)
            ])
          ])
        ])
      ])
    ])) : O("", !0)
  ], 2);
}
const G = /* @__PURE__ */ ge(_e, [["render", Oe]]);
function we(e) {
  e.component(G.name, G);
}
const Ne = { install: we };
export {
  G as CalendarHeatmap,
  s as Heatmap,
  Ne as default
};
//# sourceMappingURL=vue3-cal-heatmap.es.js.map
