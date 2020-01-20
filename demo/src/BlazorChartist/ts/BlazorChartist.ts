import * as Chartist from 'chartist';

export default class BlazorChartist {
    static init(elem: Element, type: 'Bar' | 'Line' | 'Pie') {
        const constructor = Chartist[type];
        elem['_chart'] = new constructor(elem, { series: [] });
    }

    static update(elem: Element, data: Chartist.IChartistData, options: Chartist.IChartOptions) {
        //data.series = (data.series[0] as any).data;
        elem['_chart'].update(data, options);
    }
}
