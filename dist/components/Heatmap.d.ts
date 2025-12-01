export interface Value {
    date: Date | string;
    count: number;
}
export interface Activity {
    count: number;
    colorIndex: number;
}
export type Activities = Map<string, Activity>;
export interface CalendarItem {
    date: Date;
    count?: number;
    colorIndex: number;
}
export type Calendar = CalendarItem[][];
export interface Month {
    value: number;
    index: number;
}
export interface Locale {
    months: string[];
    days: string[];
    on: string;
    less: string;
    more: string;
}
export type TooltipFormatter = (item: CalendarItem, unit: string) => string;
export type ColorScaleType = 'linear' | 'percentile' | 'logarithmic';
export declare class Heatmap {
    static readonly DEFAULT_RANGE_COLOR_LIGHT: string[];
    static readonly DEFAULT_RANGE_COLOR_DARK: string[];
    static readonly DEFAULT_LOCALE: Locale;
    static readonly DEFAULT_TOOLTIP_UNIT = "contributions";
    static readonly DAYS_IN_ONE_YEAR = 365;
    static readonly DAYS_IN_WEEK = 7;
    static readonly SQUARE_SIZE = 10;
    startDate: Date;
    endDate: Date;
    startWeekday: number;
    max: number;
    colorRange: string[];
    private _values;
    private _firstFullWeekOfMonths?;
    private _activities?;
    private _calendar?;
    colorScale: ColorScaleType;
    private _percentileThresholds?;
    constructor(endDate: Date | string, values: Value[], max?: number, colorRange?: string[], startWeekday?: number, colorScale?: ColorScaleType);
    set values(v: Value[]);
    get values(): Value[];
    get activities(): Activities;
    get weekCount(): number;
    get calendar(): Calendar;
    get firstFullWeekOfMonths(): Month[];
    getCountEmptyDaysAtStart(): number;
    getDayOfWeek(day: Date): number;
    getCountEmptyDaysAtEnd(): number;
    getDaysCount(): number;
    private shiftDate;
    private parseDate;
    private keyDayParser;
    private get percentileThresholds();
    getColorIndex(count?: number): number;
    private getLinearColorIndex;
    private getPercentileColorIndex;
    private getLogarithmicColorIndex;
}
