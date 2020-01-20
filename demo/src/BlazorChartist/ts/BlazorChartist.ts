import * as Chartist from 'chartist';

export default class BlazorChartist {
    static createChart(options: AddChartOptions) {
        const data: Chartist.IChartistData = {
            labels: options.labels,
            series: [],
        };

        let chart: Chartist.IChartistBase<Chartist.IChartOptions>;
        switch (options.type) {
            case 'Bar':
                chart = new Chartist.Bar(options.elem, data);
                break;
            case 'Line':
                chart = new Chartist.Line(options.elem, data);
                break;
        }

        BlazorChartist.setChart(options.elem, chart);
    }

    static addSeries(elem: Element, id: string, values: number[]) {
        const chart = BlazorChartist.getChart(elem);
        const newSeriesData: Chartist.IChartistSeriesData = { meta: id, data: values };
        chart.data.series.push(newSeriesData as any);
        chart.update(chart.data);
    }

    private static getChart(elem: Element): Chartist.IChartistBase<Chartist.IChartOptions> {
        return elem['_chart'];
    }

    private static setChart(elem: Element, chart: Chartist.IChartistBase<Chartist.IChartOptions>) {
        elem['_chart'] = chart;
    }
}

interface AddChartOptions {
    elem: Element,
    type: 'Bar' | 'Line',
    labels: string[],
}
