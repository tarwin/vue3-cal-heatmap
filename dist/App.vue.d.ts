declare const _default: import('vue').DefineComponent<{}, {}, {
    values: import('.').Value[];
    endDate: Date;
    picked: string;
    orientation: string;
}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
    CalendarHeatmap: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
        endDate: {
            required: true;
        };
        startWeekday: {
            type: NumberConstructor;
            default: number;
        };
        max: {
            type: NumberConstructor;
        };
        rangeColor: {
            type: import('vue').PropType<string[]>;
        };
        values: {
            type: import('vue').PropType<import('.').Value[]>;
            required: true;
        };
        locale: {
            type: import('vue').PropType<Partial<import('.').Locale>>;
        };
        tooltip: {
            type: BooleanConstructor;
            default: boolean;
        };
        tooltipUnit: {
            type: StringConstructor;
            default: string;
        };
        tooltipFormatter: {
            type: import('vue').PropType<import('.').TooltipFormatter>;
        };
        noDataText: {
            type: (StringConstructor | BooleanConstructor)[];
            default: null;
        };
        round: {
            type: NumberConstructor;
            default: number;
        };
        darkMode: BooleanConstructor;
        showLegend: {
            type: BooleanConstructor;
            default: boolean;
        };
        showWeekdays: {
            type: BooleanConstructor;
            default: boolean;
        };
        asDots: {
            type: BooleanConstructor;
            default: boolean;
        };
        dayClasses: {
            type: import('vue').PropType<string | string[]>;
            default: string;
        };
        colorScale: {
            type: import('vue').PropType<import('.').ColorScaleType>;
            default: string;
        };
    }>, {
        SQUARE_BORDER_SIZE: number;
        SQUARE_SIZE: number;
        DAYS_IN_WEEK: number;
        LEFT_SECTION_WIDTH: number;
        RIGHT_SECTION_WIDTH: number;
        TOP_SECTION_HEIGHT: number;
        BOTTOM_SECTION_HEIGHT: number;
        svg: import('vue').Ref<SVGElement | null, SVGElement | null>;
        heatmap: import('vue').Ref<{
            startDate: Date;
            endDate: Date;
            startWeekday: number;
            max: number;
            colorRange: string[];
            colorScale: import('.').ColorScaleType;
            values: {
                date: Date | string;
                count: number;
            }[];
            readonly activities: Map<string, {
                count: number;
                colorIndex: number;
            }> & Omit<import('.').Activities, keyof Map<any, any>>;
            readonly weekCount: number;
            readonly calendar: {
                date: Date;
                count?: number | undefined;
                colorIndex: number;
            }[][];
            readonly firstFullWeekOfMonths: {
                value: number;
                index: number;
            }[];
            getCountEmptyDaysAtStart: () => number;
            getDayOfWeek: (day: Date) => number;
            getCountEmptyDaysAtEnd: () => number;
            getDaysCount: () => number;
            getColorIndex: (count?: number) => number;
        }, import('.').Heatmap | {
            startDate: Date;
            endDate: Date;
            startWeekday: number;
            max: number;
            colorRange: string[];
            colorScale: import('.').ColorScaleType;
            values: {
                date: Date | string;
                count: number;
            }[];
            readonly activities: Map<string, {
                count: number;
                colorIndex: number;
            }> & Omit<import('.').Activities, keyof Map<any, any>>;
            readonly weekCount: number;
            readonly calendar: {
                date: Date;
                count?: number | undefined;
                colorIndex: number;
            }[][];
            readonly firstFullWeekOfMonths: {
                value: number;
                index: number;
            }[];
            getCountEmptyDaysAtStart: () => number;
            getDayOfWeek: (day: Date) => number;
            getCountEmptyDaysAtEnd: () => number;
            getDaysCount: () => number;
            getColorIndex: (count?: number) => number;
        }>;
        now: import('vue').Ref<Date, Date>;
        width: import('vue').Ref<number, number>;
        height: import('vue').Ref<number, number>;
        viewbox: import('vue').Ref<string, string>;
        daysLabelWrapperTransform: import('vue').Ref<string, string>;
        monthsLabelWrapperTransform: import('vue').Ref<string, string>;
        yearWrapperTransform: string;
        legendWrapperTransform: import('vue').Ref<string, string>;
        lo: import('vue').Ref<{
            months: string[];
            days: string[];
            on: string;
            less: string;
            more: string;
        }, import('.').Locale | {
            months: string[];
            days: string[];
            on: string;
            less: string;
            more: string;
        }>;
        legendViewbox: import('vue').Ref<string, string>;
        curRangeColor: import('vue').Ref<string[], string[]>;
        getWeekPosition: (index: number) => string;
        getDayPosition: (index: number) => string;
        getMonthLabelPosition: (month: import('.').Month) => {
            x: number;
            y: number;
        };
        initTippyLazy: (e: MouseEvent) => void;
        rounding: import('vue').Ref<number, number>;
        asDots: boolean;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "dayClick"[], "dayClick", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
        endDate: {
            required: true;
        };
        startWeekday: {
            type: NumberConstructor;
            default: number;
        };
        max: {
            type: NumberConstructor;
        };
        rangeColor: {
            type: import('vue').PropType<string[]>;
        };
        values: {
            type: import('vue').PropType<import('.').Value[]>;
            required: true;
        };
        locale: {
            type: import('vue').PropType<Partial<import('.').Locale>>;
        };
        tooltip: {
            type: BooleanConstructor;
            default: boolean;
        };
        tooltipUnit: {
            type: StringConstructor;
            default: string;
        };
        tooltipFormatter: {
            type: import('vue').PropType<import('.').TooltipFormatter>;
        };
        noDataText: {
            type: (StringConstructor | BooleanConstructor)[];
            default: null;
        };
        round: {
            type: NumberConstructor;
            default: number;
        };
        darkMode: BooleanConstructor;
        showLegend: {
            type: BooleanConstructor;
            default: boolean;
        };
        showWeekdays: {
            type: BooleanConstructor;
            default: boolean;
        };
        asDots: {
            type: BooleanConstructor;
            default: boolean;
        };
        dayClasses: {
            type: import('vue').PropType<string | string[]>;
            default: string;
        };
        colorScale: {
            type: import('vue').PropType<import('.').ColorScaleType>;
            default: string;
        };
    }>> & Readonly<{
        onDayClick?: ((...args: any[]) => any) | undefined;
    }>, {
        darkMode: boolean;
        startWeekday: number;
        tooltip: boolean;
        tooltipUnit: string;
        noDataText: string | boolean;
        round: number;
        showLegend: boolean;
        showWeekdays: boolean;
        asDots: boolean;
        dayClasses: string | string[];
        colorScale: import('.').ColorScaleType;
    }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    Vue3CalendarHeatmap: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
        endDate: {
            required: true;
        };
        startWeekday: {
            type: NumberConstructor;
            default: number;
        };
        max: {
            type: NumberConstructor;
        };
        rangeColor: {
            type: import('vue').PropType<string[]>;
        };
        values: {
            type: import('vue').PropType<import('.').Value[]>;
            required: true;
        };
        locale: {
            type: import('vue').PropType<Partial<import('.').Locale>>;
        };
        tooltip: {
            type: BooleanConstructor;
            default: boolean;
        };
        tooltipUnit: {
            type: StringConstructor;
            default: string;
        };
        tooltipFormatter: {
            type: import('vue').PropType<import('.').TooltipFormatter>;
        };
        noDataText: {
            type: (StringConstructor | BooleanConstructor)[];
            default: null;
        };
        round: {
            type: NumberConstructor;
            default: number;
        };
        darkMode: BooleanConstructor;
        showLegend: {
            type: BooleanConstructor;
            default: boolean;
        };
        showWeekdays: {
            type: BooleanConstructor;
            default: boolean;
        };
        asDots: {
            type: BooleanConstructor;
            default: boolean;
        };
        dayClasses: {
            type: import('vue').PropType<string | string[]>;
            default: string;
        };
        colorScale: {
            type: import('vue').PropType<import('.').ColorScaleType>;
            default: string;
        };
    }>, {
        SQUARE_BORDER_SIZE: number;
        SQUARE_SIZE: number;
        DAYS_IN_WEEK: number;
        LEFT_SECTION_WIDTH: number;
        RIGHT_SECTION_WIDTH: number;
        TOP_SECTION_HEIGHT: number;
        BOTTOM_SECTION_HEIGHT: number;
        svg: import('vue').Ref<SVGElement | null, SVGElement | null>;
        heatmap: import('vue').Ref<{
            startDate: Date;
            endDate: Date;
            startWeekday: number;
            max: number;
            colorRange: string[];
            colorScale: import('.').ColorScaleType;
            values: {
                date: Date | string;
                count: number;
            }[];
            readonly activities: Map<string, {
                count: number;
                colorIndex: number;
            }> & Omit<import('.').Activities, keyof Map<any, any>>;
            readonly weekCount: number;
            readonly calendar: {
                date: Date;
                count?: number | undefined;
                colorIndex: number;
            }[][];
            readonly firstFullWeekOfMonths: {
                value: number;
                index: number;
            }[];
            getCountEmptyDaysAtStart: () => number;
            getDayOfWeek: (day: Date) => number;
            getCountEmptyDaysAtEnd: () => number;
            getDaysCount: () => number;
            getColorIndex: (count?: number) => number;
        }, import('.').Heatmap | {
            startDate: Date;
            endDate: Date;
            startWeekday: number;
            max: number;
            colorRange: string[];
            colorScale: import('.').ColorScaleType;
            values: {
                date: Date | string;
                count: number;
            }[];
            readonly activities: Map<string, {
                count: number;
                colorIndex: number;
            }> & Omit<import('.').Activities, keyof Map<any, any>>;
            readonly weekCount: number;
            readonly calendar: {
                date: Date;
                count?: number | undefined;
                colorIndex: number;
            }[][];
            readonly firstFullWeekOfMonths: {
                value: number;
                index: number;
            }[];
            getCountEmptyDaysAtStart: () => number;
            getDayOfWeek: (day: Date) => number;
            getCountEmptyDaysAtEnd: () => number;
            getDaysCount: () => number;
            getColorIndex: (count?: number) => number;
        }>;
        now: import('vue').Ref<Date, Date>;
        width: import('vue').Ref<number, number>;
        height: import('vue').Ref<number, number>;
        viewbox: import('vue').Ref<string, string>;
        daysLabelWrapperTransform: import('vue').Ref<string, string>;
        monthsLabelWrapperTransform: import('vue').Ref<string, string>;
        yearWrapperTransform: string;
        legendWrapperTransform: import('vue').Ref<string, string>;
        lo: import('vue').Ref<{
            months: string[];
            days: string[];
            on: string;
            less: string;
            more: string;
        }, import('.').Locale | {
            months: string[];
            days: string[];
            on: string;
            less: string;
            more: string;
        }>;
        legendViewbox: import('vue').Ref<string, string>;
        curRangeColor: import('vue').Ref<string[], string[]>;
        getWeekPosition: (index: number) => string;
        getDayPosition: (index: number) => string;
        getMonthLabelPosition: (month: import('.').Month) => {
            x: number;
            y: number;
        };
        initTippyLazy: (e: MouseEvent) => void;
        rounding: import('vue').Ref<number, number>;
        asDots: boolean;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "dayClick"[], "dayClick", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
        endDate: {
            required: true;
        };
        startWeekday: {
            type: NumberConstructor;
            default: number;
        };
        max: {
            type: NumberConstructor;
        };
        rangeColor: {
            type: import('vue').PropType<string[]>;
        };
        values: {
            type: import('vue').PropType<import('.').Value[]>;
            required: true;
        };
        locale: {
            type: import('vue').PropType<Partial<import('.').Locale>>;
        };
        tooltip: {
            type: BooleanConstructor;
            default: boolean;
        };
        tooltipUnit: {
            type: StringConstructor;
            default: string;
        };
        tooltipFormatter: {
            type: import('vue').PropType<import('.').TooltipFormatter>;
        };
        noDataText: {
            type: (StringConstructor | BooleanConstructor)[];
            default: null;
        };
        round: {
            type: NumberConstructor;
            default: number;
        };
        darkMode: BooleanConstructor;
        showLegend: {
            type: BooleanConstructor;
            default: boolean;
        };
        showWeekdays: {
            type: BooleanConstructor;
            default: boolean;
        };
        asDots: {
            type: BooleanConstructor;
            default: boolean;
        };
        dayClasses: {
            type: import('vue').PropType<string | string[]>;
            default: string;
        };
        colorScale: {
            type: import('vue').PropType<import('.').ColorScaleType>;
            default: string;
        };
    }>> & Readonly<{
        onDayClick?: ((...args: any[]) => any) | undefined;
    }>, {
        darkMode: boolean;
        startWeekday: number;
        tooltip: boolean;
        tooltipUnit: string;
        noDataText: string | boolean;
        round: number;
        showLegend: boolean;
        showWeekdays: boolean;
        asDots: boolean;
        dayClasses: string | string[];
        colorScale: import('.').ColorScaleType;
    }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
