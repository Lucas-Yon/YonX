import { inspectRoutes } from "hono/dev";
import { HonoApp } from "@/HonoApp";
import { html } from "hono/html";

function ToolsRoutes() {
  return (
    <>
      {Bun.env.DEV && (
        <head class={"yo"}>
          <script src="/static/dev.js"></script>
          {html`
            <script>
              // No need to use dangerouslySetInnerHTML.
              // If you write it here, it will not be escaped.
            </script>
          `}
        </head>
      )}

      <div
        x-data="{
        bannerVisible: false,
        tableVisible: false,
        bannerVisibleAfter: 300,
        toggleTable() {
            this.tableVisible = !this.tableVisible;
        }
    }"
        x-show="bannerVisible"
        x-transition:enter="transition ease-out duration-500"
        x-transition:enter-start="translate-y-full"
        x-transition:enter-end="translate-y-0"
        x-transition:leave="transition ease-in duration-300"
        x-transition:leave-start="translate-y-0"
        x-transition:leave-end="translate-y-full"
        x-init="
        setTimeout(() => { bannerVisible = true }, bannerVisibleAfter);
    "
        className="fixed bottom-0 right-0 z-50 w-auto py-2 duration-300 ease-out bg-background shadow-sm sm:py-0 sm:h-10"
        x-cloak
      >
        <div className="flex items-center justify-between w-full h-full px-3 mx-auto max-w-7xl">
          <button
            {...{ "@click": "toggleTable()" }}
            className="flex items-center justify-center w-10 h-10 p-1.5 text-foreground rounded-full bg-muted"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="white"
              className="w-full h-full"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Table Section */}
        <div
          x-show="tableVisible"
          x-transition:enter="transition ease-out duration-500"
          x-transition:enter-start="translate-y-full"
          x-transition:enter-end="translate-y-0"
          x-transition:leave="transition ease-in duration-300"
          x-transition:leave-start="translate-y-0"
          x-transition:leave-end="translate-y-full"
          className="fixed bottom-0 left-0 w-full h-1/3  bg-card shadow-lg overflow-hidden" // Change border color for testing
        >
          <div className="p-4 border-4 ">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                Available Routes
              </h2>
              <button
                {...{ "@click": "tableVisible = false" }}
                className="text-foreground hover:text-destructive bg-muted size-10 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="white"
                  className="w-full h-full"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto max-h-48 mt-2">
              <table className="min-w-full bg-background border border-border">
                <thead>
                  <tr className="bg-muted">
                    <th className="px-4 py-2 text-left text-foreground">
                      Route
                    </th>
                    <th className="px-4 py-2 text-left text-foreground">
                      Method
                    </th>
                  </tr>
                </thead>
                <tbody x-data>
                  <template x-for="path in $store.dev.tree">
                    <tr>
                      <td
                        x-text="path.path"
                        className="px-4 py-2 border border-border text-foreground"
                      ></td>
                      <td
                        x-text="path.method"
                        className="px-4 py-2 border border-border text-foreground"
                      ></td>
                    </tr>
                  </template>
                  <tr>
                    <td className="px-4 py-2 border border-border text-foreground">
                      /api/feature
                    </td>
                    <td className="px-4 py-2 border border-border text-foreground">
                      GET
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-border text-foreground">
                      /api/users
                    </td>
                    <td className="px-4 py-2 border border-border text-foreground">
                      POST
                    </td>
                  </tr>
                  {/* Add more rows as needed */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>

    // <div class="overflow-x-auto">
    //   <table class="min-w-full bg-white border border-gray-300">
    //     <thead>
    //       <tr class="bg-gray-100">
    //         <th class="py-2 px-4 border-b">Path</th>
    //         <th class="py-2 px-4 border-b">Method</th>
    //         <th class="py-2 px-4 border-b">Name</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {routes.map((item, index) => (
    //         <tr key={index} class="hover:bg-gray-50">
    //           <td class="py-2 px-4 border-b">{item.path}</td>
    //           <td class="py-2 px-4 border-b">{item.method}</td>
    //           <td class="py-2 px-4 border-b">{item.name}</td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
  );
}

export default ToolsRoutes;
