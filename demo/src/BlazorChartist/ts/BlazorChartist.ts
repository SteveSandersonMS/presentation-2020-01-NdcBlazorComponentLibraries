import * as Chartist from 'chartist';

export default class BlazorChartist {

    static createChart(options: BlazorChartistOptions) {
        var data = {
            // A labels array that can contain any sort of values
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            // Our series array that contains series objects or in this case series data arrays
            series: [
                [5, 2, 4, 2, 0]
            ]
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
    type: 'Bar' | 'Line';
}
