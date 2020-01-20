using System.Collections.Generic;
using System.Linq;

namespace BlazorChartist
{
    public class SeriesData<T>
    {
        public string Name { get; set; }

        public IEnumerable<T> Values { get; set; } = Enumerable.Empty<T>();
    }
}
