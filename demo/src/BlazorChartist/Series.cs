using BlazorChartist.Data;
using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;

namespace BlazorChartist
{
    /// <summary>
    /// Adds a data series to the enclosing <see cref="Chart"/> component.
    /// </summary>
    public class Series : ComponentBase, IDisposable
    {
        [CascadingParameter] public Chart OwnerChart { get; set; }

        [Parameter] public string Name { get; set; }

        /// <summary>
        /// Gets or sets the data values associated with the series.
        /// </summary>
        [Parameter] public IEnumerable<double> Values { get; set; }

        private readonly SeriesData data = new SeriesData();

        protected override void OnParametersSet()
        {
            data.Name = Name;
            data.Data = Values;
        }

        protected override void OnInitialized()
        {
            OwnerChart.Data.Series.Add(data);
        }

        void IDisposable.Dispose()
        {
            OwnerChart.Data.Series.Remove(data);
        }
    }
}