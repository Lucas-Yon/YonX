import { HonoApp } from "@/HonoApp";
import { Tab, Tabs, TabsContent, TabsList } from "../components/ui/tab";
import { Toast, Notification } from "../components/ui/toast";
import { ArchiveBox } from "@/components/Icons";
import ToolsRoutes from "@/yonx/dev";

const Hono = new HonoApp();

const Page = Hono.app.get("/component", async (c) => {
  return await c.render(
    <div>
      <ToolsRoutes />
      <ArchiveBox className="text-blue-600 size-18 " />
      <Notification />
      <Toast />
      <Tabs defaultTab={1} className="w-full max-w-sm">
        <TabsList className="grid-cols-3">
          <Tab index={1}>Account</Tab>
          <Tab index={2}>Password</Tab>
          <Tab index={3}>Password</Tab>
        </TabsList>
        <TabsContent index={1}>
          <div className="border rounded-lg shadow-sm bg-card text-neutral-900">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-lg font-semibold leading-none tracking-tight">
                Account
              </h3>
              <p className="text-sm text-neutral-500">
                Make changes to your account here. Click save when you're done.
              </p>
            </div>
            <div className="p-6 pt-0 space-y-2">
              <div className="space-y-1">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  for="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  id="name"
                  value="Yon luc"
                  className="flex w-full h-10 px-3 py-2 text-sm bg-white border rounded-md peer border-neutral-300 ring-offset-background placeholder:text-neutral-400 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div className="space-y-1">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  for="username"
                >
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Username"
                  id="username"
                  value="@yon"
                  className="flex w-full h-10 px-3 py-2 text-sm bg-white border rounded-md peer border-neutral-300 ring-offset-background placeholder:text-neutral-400 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>
            <div className="flex items-center p-6 pt-0">
              <button
                type="button"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium tracking-wide text-white transition-colors duration-200 rounded-md bg-neutral-950 hover:bg-neutral-900 focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 focus:shadow-outline focus:outline-none"
              >
                Save changes
              </button>
            </div>
          </div>
        </TabsContent>

        <TabsContent index={2}>
          <div className="border rounded-lg shadow-sm bg-card text-neutral-900">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-lg font-semibold leading-none tracking-tight">
                Password
              </h3>
              <p className="text-sm text-neutral-500">
                Change your password here. After saving, you'll be logged out.
              </p>
            </div>
            <div className="p-6 pt-0 space-y-2">
              <div className="space-y-1">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  for="current_password"
                >
                  Current Password
                </label>
                <input
                  type="password"
                  placeholder="Current Password"
                  id="current_password"
                  className="flex w-full h-10 px-3 py-2 text-sm bg-white border rounded-md peer border-neutral-300 ring-offset-background placeholder:text-neutral-400 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div className="space-y-1">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  for="new_password"
                >
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="New Password"
                  id="new_password"
                  className="flex w-full h-10 px-3 py-2 text-sm bg-white border rounded-md border-neutral-300 ring-offset-background placeholder:text-neutral-400 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>
            <div className="flex items-center p-6 pt-0">
              <button
                type="button"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium tracking-wide text-white transition-colors duration-200 rounded-md bg-neutral-950 hover:bg-neutral-900 focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 focus:shadow-outline focus:outline-none"
              >
                Save password
              </button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
});

export default Page;
