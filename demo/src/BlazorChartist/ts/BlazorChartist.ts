import * as Chartist from 'chartist';

export default class BlazorChartist {

    static createChart(options: BlazorChartistOptions) {
        const data: Chartist.IChartistData = {
            labels: options.labels,
            series: options.series,
        };

        switch (options.type) {
            case 'Bar':
                new Chartist.Bar(options.elem, data);
                break;
            case 'Line':
                new Chartist.Line(options.elem, data);
                break;
        }
    }
}

interface BlazorChartistOptions {
    elem: Element,
    type: 'Bar' | 'Line',
    labels: string[],
    series: number[][],
}
