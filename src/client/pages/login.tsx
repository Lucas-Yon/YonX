import FrontLayout from "@/client/layout/front_layout";
import binding from "@/binding";
import { PasswordInput } from "@/components/ui/text_input";

const app = binding().get("/login", async (c) => {
  return await c.html(
    <FrontLayout>
      <div>ooo</div>

      <div
        x-data="{
    query: new URLSearchParams(location.search).get('error')
  }"
      >
        <h3>Read Query Parameter Demo</h3>
        <p class="mb-2">
          location.search: "<span x-text="location.search"></span>"
        </p>
        <p>
          Param "q" (from URL): "<span x-text="query"></span>"
        </p>
        <p>
          Some sample links with "q" in the URL:
          <a href="?q=my search">my search</a>,
          <a href="?q=another search">another search</a>,<a href="?q=">reset</a>
        </p>
      </div>
      <div className="flex h-full min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-foreground">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="/api/auth/login" method="get">
            {/* <PasswordInput /> */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-foreground"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-foreground shadow-sm ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
              </div>
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
          </form>

          <p className="mt-10 text-center text-sm text-muted-foreground">
            Not a member?
            <a
              href="/register"
              className="font-semibold ml-2 leading-6 text-primary hover:text-accent"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </FrontLayout>
  );
});

export default app;
