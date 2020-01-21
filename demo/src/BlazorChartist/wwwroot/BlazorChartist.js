var BlazorChartist = {

    createChart: function (elem, type) {
        var constructor = Chartist[type];
        elem.chart = new constructor(elem, { series: [] });
    },

    updateChart: function (elem, data) {
        elem.chart.update(data);
    }

};
