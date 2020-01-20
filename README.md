# Demo.BlazorChartist

This is a demonstration of a Blazor components package. It's not intended for actual use, because the feature set is very minimal. If you want to build a real 'chartist' package based on this, feel free to go ahead!

# Usage

1. In a Blazor Server or Blazor WebAssembly project, add a reference to the `Demo.BlazorChartist` package.

2. In your `_Imports.razor` file, add the following statements:

```razor
@using BlazorChartist
@using BlazorChartist.Data
```

3. In your `_Host.cshtml` (for Blazor Server) or `index.html` (for Blazor WebAssembly) file, add the following tags somewhere *before* the reference to the Blazor `.js` file:

```html
<link href="_content/Demo.BlazorChartist/chartist.min.css" rel="stylesheet" />
<script src="_content/Demo.BlazorChartist/BlazorChartist.js"></script>
```

You're now ready to use the package. For example, inside a `.razor` file, add:

```razor
<Chart Type="ChartType.Line" ShowArea="true" Labels="@(new[] { "Monday", "Tuesday", "Wednesday" })">
    <Series Values="@(new double[] { 15, 25, 17 })" />
    <Series Values="@(new double[] { 33, 6, 24 })" />
</Chart>

<Chart Type="ChartType.Bar" Labels="@(new[] { "Australia", "Egypt", "Paraguay", "Zambia" })">
    <Series Values="@(new double[] { 8500, 7280, 2940, 13310 })" />
</Chart>
```

# Notes

This is not intended to be a complete implementation of the Chartist API. The main focus is on demonstrating aspects of package creation.
