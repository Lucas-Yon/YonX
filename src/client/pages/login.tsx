import Header from "@/client/header";
import app from "@/binding";
import { PasswordInput } from "@/components/ui/text_input";

app.get("/login", async (c) => {
  return await c.html(
    <Header>
      <PasswordInput />
      <div>ooo</div>

      {/* <div
            x-data="{
    query: new URLSearchParams(location.search).get('q')
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
              <a href="?q=another search">another search</a>,
              <a href="?q=">reset</a>
            </p>
          </div> */}
      <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form class="space-y-6" action="/api/auth/login" method="get">
            <PasswordInput />
            <div>
              <label
                for="email"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div class="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div class="flex w-full max-w-xs flex-col gap-1 text-neutral-600 dark:text-neutral-400">
                <label for="textInputDefault" class="w-fit pl-0.5 text-sm">
                  Name
                </label>
                <input
                  id="textInputDefault"
                  type="text"
                  class="w-full rounded-2xl bg-neutral-100 px-2 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:opacity-75 dark:bg-neutral-800/50 dark:focus-visible:outline-white"
                  name="name"
                  placeholder="Enter your name"
                  autocomplete="name"
                />
              </div>
              <div class="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div class="mt-6">
              <button
                type="submit"
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p class="mt-10 text-center  text-sm text-gray-500">
            Not a member?
            <a
              href="/register"
              class="font-semibold ml-2 leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </Header>
  );
});

export default app;
