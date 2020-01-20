import { IChartistBase, IChartOptions, IChartistData, Bar, Line, IChartistSeriesData } from 'chartist';

export default class BlazorChartist {
    static init(elem: Element, type: 'Bar' | 'Line') {
        const data: IChartistData = { series: [] };

        let chart: IChartistBase<IChartOptions>;
        switch (type) {
            case 'Bar':
                chart = new Bar(elem, data);
                break;
            case 'Line':
                chart = new Line(elem, data);
                break;
        }

        elem['_chart'] = chart;
    }

    static update(elem: Element, data: IChartistData) {
        elem['_chart'].update(data);
    }
}
