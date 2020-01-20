using System.Collections.Generic;

namespace BlazorChartist.Data
{
    public class ChartData
    {
        public IEnumerable<string> Labels { get; set; }

        public List<SeriesData> Series { get; set; } = new List<SeriesData>();
    }
}
