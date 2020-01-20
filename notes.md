Building a nice RCL

 - starting from the template
 - passthrough attributes (e.g., css class)
 - ensuring compatibility with wasm and server
 - exposing components
   - referencing @using Microsoft.AspNetCore.Components.Web
 - adding static assets (e.g., build from typescript: https://docs.microsoft.com/en-us/aspnet/core/razor-pages/ui-class?view=aspnetcore-3.1&tabs=visual-studio#typescript-integration)
 - doing some nontrivial JS interop stuff
   (at least instance interop back to the component instance)
 - making sure you're compatible with prerendering
 - how to have nested child components that act as info for the parent, e.g.,
   <Map> <Marker /> <Marker /> </Map>
   using one of the techniques:
    - CascadingValue(this) from parent so children can call it on init/dispose
    - DOMMutationListener on JS side (advantage: you get to see where in the list newly-added items go)
      Beneficial only if ordering matters
 - making it linkable via MSBuild hack
 - unit testing
 - AzDO builds and automatic publishing with timestamped version
 - Routable components (but why it's not great to do)
 - Adding XML docs for params etc.
