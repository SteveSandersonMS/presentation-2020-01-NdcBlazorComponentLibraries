import * as Chartist from 'chartist';
import { IChartistBase, IChartOptions } from 'chartist';

export default class BlazorChartist {
    static init(component: any, elem: Element, type: 'Bar' | 'Line' | 'Pie') {
        const constructor = Chartist[type];
        const chart: IChartistBase<IChartOptions> = new constructor(elem, { series: [] });
        elem['_chart'] = chart;

        chart.on('draw', data => {
            if (data.type === 'point' || data.type === 'bar') {
                data.element._node.addEventListener('click', () => {
                    component.invokeMethodAsync('OnSeriesEntryClicked', data.seriesIndex, data.index);
                });
            }
        });
    }

    static update(elem: Element, data: Chartist.IChartistData, options: Chartist.IChartOptions) {
        elem['_chart'].update(data, options);
    }
}
