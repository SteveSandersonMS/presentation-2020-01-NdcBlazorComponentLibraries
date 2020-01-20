﻿using System.Collections.Generic;
using System.Linq;

namespace BlazorChartist.Data
{
    public class SeriesData
    {
        public string Name { get; set; }

        public IEnumerable<double> Data { get; set; } = Enumerable.Empty<double>();
    }
}
