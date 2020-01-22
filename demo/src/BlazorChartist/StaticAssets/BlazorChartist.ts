import * as Chartist from 'chartist';
import { IChartistBase, IChartOptions } from 'chartist';

export default class BlazorChartist {
    static createChart(elem: Element, type: 'Bar' | 'Line' | 'Pie') {
        const constructor = Chartist[type];
        const chart: IChartistBase<IChartOptions> = new constructor(elem, { series: [] });
        elem['_chart'] = chart;
    }

    static updateChart(elem: Element, data: Chartist.IChartistData, options: Chartist.IChartOptions) {
        elem['_chart'].update(data, options);
    }
}
