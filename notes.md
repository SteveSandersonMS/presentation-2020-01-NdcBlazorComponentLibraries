# Pre-demo checklist

- Terminal
  - cd presentation-2020-01-NdcBlazorComponentLibraries
  - Ensure Git repo in clean state on `1-empty-solution`
  - rm -rf demo\src
  - rm -rf demo\samples
- VS:
  - Open `BlazorChartist.sln`
  - Add snippets (unhide `snippets` solution folder if needed)
  - Font size
  - Hide `snippets` solution folder
  - Check you can find the "New RCL" project template
- Powerpoint:
  - Slides opened
- Timer ready

--------------------------------------------------------------

Building a nice RCL

# Checkpoints

## Getting started ([1] Empty solution)

Starts with blank solution 
 - Create a new RCL in `src` called `BlazorChartist`
 - Explain "Support pages and views"

## With host projects ([2] With WebAssembly/Server sample projects)

Now has `WebAssemblySample` and `ServerSample`

 - See webassembly and server projects running
 - From `WebAssemblySample`, reference `BlazorChartist`
 - In `Index.cshtml`, add <BlazorChartist.Component1 /> - see it run
 - Update `_Imports.razor`
 - Now want to get CSS styles. In `index.html`, add:
   <link href="_content/BlazorChartist/styles.css" rel="stylesheet" />
   Need to restart app (unload and reload project) to see this take effect.

## With chartist.js/css ([3] With chartist files and empty Chart.razor)

Now has .js/.css files in wwwroot, and referenced from `index.html` and `_Host.cshtml`
The `BlazorChartist.js` file contains an init function with hardcoded data
Also has empty `Chart.razor`

- See it render
- See sources, including JS
- Call JS from `Chart.razor`:

    <div @ref="elem" class="ct-chart"></div>

    @inject IJSRuntime JS
    @code {
        ElementReference elem;

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                await JS.InvokeVoidAsync("BlazorChartist.createChart", elem);
            }
        }
    }

 - See how createChart is defined in BlazorChartist.js
 - That's the core pattern of rendering elements and performing JS interop with them.

## With user-specifiable data ([4] With chart data types)

- See new DTO types
- See new parameters on `Chart.razor`
- See how they are used in JS
- See that it now renders blank
- In `Index.razor`, define some data:

    @code {
        private static string[] labels = new[] { "Jan", "Feb", "Mar", "Apr", "May" };
        private static double[] oilPrices = new double[] { 51, 55, 68, 52, 51 };
        private static double[] trumpTweets = new double[] { 35, 19, 26, 68, 21 };

        private ChartData sampleData = new ChartData
        {
            Labels = labels,
            Series = new List<SeriesData>
            {
                new SeriesData { Name = "Crude oil price ($)", Data = oilPrices },
                new SeriesData { Name = "Trump tweets", Data = trumpTweets },
            }
        };
    }

- ... and use it:

    <Chart Type="ChartType.Bar" Data="@sampleData" />

    <Chart Type="ChartType.Line" Data="@sampleData" />

- Now want to move towards declaring the chart config in Razor syntax, not a C# object literal
- First let's move "labels" into a top-level parameter

    [Parameter] public IEnumerable<string> Labels { get; set; }

- ... and use it before call to updateChart:

    Data.Labels = Labels;

- ... then use it in `Index.razor` (pass Labels=@labels, and remove it from object literal)

## With series defined in Razor syntax ([5] With <Series> component)

- See `Index.razor` and how it now has `<Series>` in markup
- See how `Series.cs` implements this
- Try it: error
- Update `Chart.razor` to accept child content:

    [Parameter] public RenderFragment ChildContent { get; set; }

- ... and it cascade itself to those children (can go anywhere):

    <CascadingValue Value="@this">
        @ChildContent
    </CascadingValue>

- Recap: can now declare data either in C# procedural code, or in Razor syntax
- To show flexibility of Razor syntax, toggle a series:
  - In `Index.razor`, add `bool showTrumpTweets = true;`
  - `<input type="checkbox" @bind="showTrumpTweets" />`
  - Put `@if {showTrumpTweets}` around the trump tweets series
  - Point is, no need for a special API for this, nothing to document, obvious and flexible

- What if consumer wants to specify some other attrib?
    Add `title="Graph of oil vs tweets" style="background-color: lightyellow;"`
  - Fails
  - Add param:

    [Parameter(CaptureUnmatchedValues = true)]
    public Dictionary<string, object> ExtraAttributes { get; set; }

  - `@attributes="@ExtraAttributes"` - discuss adding before or after class

- What if consumer wants to know what the parameters mean?
 - Hover over <Series> and `Type` attributes - no info
 - Add XML docs to `Series` class:

 ```cs
    /// <summary>
    /// Adds a data series to the enclosing <see cref="Chart"/> component.
    /// </summary>
 ```

  - Also add to `Labels` property on `Chart.razor`:

  ```cs
    /// <summary>
    /// Specifies X-axis (catergory) labels.
    /// </summary>
  ```

  - Rebuild solution
  - Now see it take effect

- Verify compatibility with all rendering modes

 - Show in network tab you really are on WebAssembly right now
 - Start up the ServerSample project
 - Verify you're really running server-side
 - See the prerendered output
 - Describe requirements for compatibility:
   - To run on server, need all JS interop to be async
   - To support prerendering, need all JS interop to be on OnAfterRenderAsync
   ... we already meet these criteria, so it just works.

## With webpack build ([6] With webpack build)

- Currently our static assets system is weak
  - Having copy 3rd-party static files manually (and manually update them)
  - Have to write .js by hand (not TypeScript)
  - No bundling or minification
- So in most realistic cases you'd want a Webpack + TypeScript setup
- You may feel this is exactly what you're trying to avoid when using Blazor,
  but that's kind of the point. As a package author, you're taking on this
  pain so that your consumers don't have to. Having a webpack+typescript build
  system should only be part of how your package is produced, not how it's consumed.
- See how there's no `wwwroot` dir any more
- See how StaticAssets dir contains webpack config and TypeScript file
- Skim-read `StaticAssets.targets`
- Build and see it does NPM install and webpack build; see output
- Build again and see it's incremental

## With CI/CD pipeline ([7] With AzDO pipeline)

- Want validation on each commit and PRs, plus automatic release to NuGet.org
- Don't have to pay for this! Azure Devops free tier is enough if you don't need very long or parallel builds.
- See `azure-pipelines.yml`
- Go to `https://dev.azure.com/SteveSandersonMS/BlazorChartist`
  - I already created this project on Azure DevOps, but haven't added a build pipeline yet
- Pipelines, Create Pipeline
  - Code from GitHub
  - Pick `presentation-2020-01-NdcBlazorComponentLibraries` repo
  - Pick "Existing YAML file"
  - Pick `/demo/azure-pipeline.yml`
  - Run
- Edit
  - Triggers
  - PR validation
  - Disable `Make secrets available to builds of forks`
  - Save
- Go back and see the running pipeline
  - Hopefully it will be finishing about now
- See the step where it pushes to NuGet.org
  - Be sure it's the first time you did it today, otherwise it will fail due to clashing version number
- Look at list on `https://www.nuget.org/packages/Demo.BlazorChartist`
  - New version won't appear for 10 mins or so
