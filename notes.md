Building a nice RCL

Flow
 - starting from the template
   - existing solution containing both server and wasm projects
   - just "file->new" a RCL
   - show how components and static assets can be exposed
   - see them work on both server and wasm projects
 - very basic chartist wrapper
   - add their .js and .css files directly to wwwroot
   - simple <Chart> component that renders a graph when you pass it a complete data structure
   - add <Series> as child component with <CascadingValue Value=this>
 - switch to a TypeScript + webpack build
   - set up incremental build
   - see bundling and minification in prod builds
 - make it compatible with prerendering (move JS interop into afterrender)
 - more advanced JS interop for instance callbacks, remember to dispose
 - passthrough attributes for more flexibility
 - XML docs?
 - add azdo build
