import FrontLayout from "@/client/layout/front_layout";
import { HonoApp } from "@/HonoApp";
import { EmailInput, PasswordInput } from "@/components/ui/text_input";
import { Script } from "@/scripts";

const Hono = new HonoApp();
// Hono.addMultipleMiddleware("/api/users/*", [
//   {
//     authAdapters: [""],
//     simpleCacheAdapters: [100000],
//   },
// ]);

const app = Hono.app.get("/login", async (c) => {
  // await Bun.sleep(1000);
  return await c.html(
    <FrontLayout>
      <div className="flex h-full min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-foreground">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            x-data="{
            error: new URLSearchParams(location.search).get('error') ?? '',
            email: new URLSearchParams(location.search).get('email') ?? ''
            }"
            className="space-y-6"
            action="/api/auth/login"
            method="get"
          >
            <div>
              <EmailInput />
            </div>

            <div>
              <PasswordInput />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-primary-foreground shadow-sm hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                Sign in
              </button>
            </div>
            <div
              class="relative w-full overflow-hidden rounded-none bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-300"
              role="alert"
              x-cloak
              x-show="error !== ''"
            >
              <div class="flex w-full items-center gap-2 bg-red-600/10 p-4">
                <div>
                  <h3 class="text-sm font-semibold text-red-600">
                    Invalid Email Address
                  </h3>
                  <p class="text-xs font-medium sm:text-sm">
                    The email address you entered is invalid. Please try again.
                  </p>
                </div>
              </div>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-muted-foreground">
            Not a member?
            <a
              href="/register"
              className="font-semibold ml-2 leading-6 text-primary hover:text-accent"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </FrontLayout>
  );
});

export default app;
