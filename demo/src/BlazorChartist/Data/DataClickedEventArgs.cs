using System;
using System.Collections.Generic;
using System.Text;

namespace BlazorChartist.Data
{
    public class DataClickedEventArgs
    {
        public SeriesData Series { get; set; }

        public int EntryIndex { get; set; }
    }
}
