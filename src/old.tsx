import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { type FC, type PropsWithChildren } from "hono/jsx";
import { cssGenerator } from "../unocss/generate-css";
const app = new Hono();

const Layout = async (props: PropsWithChildren) => {
  console.time("generateCSS");
  const generatedCss = await cssGenerator.generate(`${props.children}`);
  console.timeEnd("generateCSS");
  return (
    <html>
      <head>
        <style>{generatedCss.css}</style>
        <script
          defer
          src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"
        ></script>
      </head>
      <body>{props.children}</body>
    </html>
  );
};
const Test = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Menu */}
      <nav className="bg-gray-800 text-white p-4">
        <ul className="flex space-x-4 justify-center">
          <li>
            <a
              href="#home"
              className="hover:text-green-400 transition duration-200"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="hover:text-green-400 transition duration-200"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#latest-posts"
              className="hover:text-green-400 transition duration-200"
            >
              Latest Posts
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="hover:text-green-400 transition duration-200"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex-grow flex justify-center items-center">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-lg text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to My Blog
          </h1>
          <p className="text-gray-600 mb-6">
            Discover amazing content on various topics, including technology,
            lifestyle, and more. Join me on this exciting journey!
          </p>
          <a
            href="#latest-posts"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Explore Posts
          </a>
        </div>
      </div>

      {/* Featured Post Section */}
      <section className="bg-gray-100 p-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">
          Featured Post
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-gray-700 mb-2">
            Understanding React Hooks
          </h3>
          <p className="text-gray-600 mb-4">
            Explore the powerful features of React hooks that allow you to
            manage state and side effects in functional components.
          </p>
          <a href="#read-more" className="text-green-600 hover:underline">
            Read more...
          </a>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section id="latest-posts" className="p-8 bg-white">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">
          Latest Posts
        </h2>
        <ul className="space-y-4">
          <li className="bg-gray-100 p-4 rounded-lg shadow">
            <h3 className="text-xl font-bold text-gray-700">
              The Future of Technology
            </h3>
            <p className="text-gray-600">
              An insightful look into the emerging trends that will shape our
              world in the coming years.
            </p>
            <a href="#post1" className="text-green-600 hover:underline">
              Read more...
            </a>
          </li>
          <li className="bg-gray-100 p-4 rounded-lg shadow">
            <h3 className="text-xl font-bold text-gray-700">
              Healthy Living Tips
            </h3>
            <p className="text-gray-600">
              Discover simple and effective ways to improve your health and
              well-being.
            </p>
            <a href="#post2" className="text-green-600 hover:underline">
              Read more...
            </a>
          </li>
          <li className="bg-gray-100 p-4 rounded-lg shadow">
            <h3 className="text-xl font-bold text-gray-700">
              Travel Diaries: Exploring Japan
            </h3>
            <p className="text-gray-600">
              Join me on my adventures as I explore the beautiful landscapes and
              rich culture of Japan.
            </p>
            <a href="#post3" className="text-green-600 hover:underline">
              Read more...
            </a>
          </li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p className="text-sm">&copy; 2024 My Blog. All rights reserved.</p>
        <p className="text-sm">
          Follow us on
          <a href="#twitter" className="text-green-400 hover:underline">
            {" "}
            Twitter
          </a>
          ,
          <a href="#facebook" className="text-green-400 hover:underline">
            {" "}
            Facebook
          </a>
          ,
          <a href="#instagram" className="text-green-400 hover:underline">
            {" "}
            Instagram
          </a>
        </p>
      </footer>
    </div>
  );
};

const Top: FC<{ messages: string[] }> = (props: { messages: string[] }) => {
  return (
    <>
      <h1 class={"bg-blue-400 text-red-200 text-sm"}>Hello Hono!</h1>
      <ul>
        {props.messages.map((message) => {
          return <li>{message}!!!</li>;
        })}
      </ul>
      <div
        class=""
        x-data="{ count: 0, text:''}"
        x-init="count = $refs.countme.value.length"
      >
        <textarea
          name="body"
          class="char-limiter"
          rows={3}
          maxlength={290}
          x-ref="countme"
          x-on:keyup="count = $refs.countme.value.length"
        ></textarea>
        <input
          x-ref="textme"
          x-on:keyup="text = $refs.textme.value"
          type="text"
        ></input>
        {["yolo", "yolo2", "yolo3"].map((item) => {
          return (
            <input
              x-ref={item}
              x-on:keyup="text = $refs.textme.value"
              type="text"
            ></input>
          );
        })}

        <div class="">
          <span x-html="count"></span> /
          <span x-html="$refs.countme.maxLength"></span>
        </div>
        <div class="">
          <span x-html="text"></span>
        </div>
      </div>
    </>
  );
};

app.get("/", async (c) => {
  const messages = ["Good Morning", "Good Evening", "Good Night"];
  console.log("path is", c.req.path);
  return c.html(
    <Layout>
      <Top messages={messages} />
    </Layout>
  );
});

app.get("/welcome", async (c) => {
  console.log("path is", c.req.path);
  return c.html(
    <Layout>
      <Test />
    </Layout>
  );
});

const LayoutTwo = async (props: PropsWithChildren) => {
  console.time("generateCSS");
  const generatedCss = await cssGenerator.generate(`${props.children}`);
  console.timeEnd("generateCSS");
  return (
    <html>
      <head>
        <style>{generatedCss.css}</style>
        <script
          defer
          src="https://cdn.jsdelivr.net/npm/@alpinejs/focus@3.x.x/dist/cdn.min.js"
        ></script>
        <script
          defer
          src="https://cdn.jsdelivr.net/npm/@alpinejs/sort@3.x.x/dist/cdn.min.js"
        ></script>
        <script
          defer
          src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"
        ></script>
        <script src="/static/store.js"></script>
      </head>
      <body>{props.children}</body>
    </html>
  );
};

app.get("/ts", async (c) => {
  return await c.html(<LayoutTwo> </LayoutTwo>);
});

app.get(
  "/static/*",
  serveStatic({
    root: "./",
    onNotFound: async (path, c) => {
      const newPath = path.replace("/dist/", "/dev/").replace(".js", ".ts");
      const transpiler = new Bun.Transpiler({
        loader: "ts",
      });
      console.log(path, newPath);
      const text = await Bun.file(newPath).text();
      const transpiled = await transpiler.transformSync(text);
      await Bun.write(path, transpiled);
      c.body(transpiled);
    },
    rewriteRequestPath: (path) => path.replace(/^\/static/, "/statics/dist"),
  })
);

app.get("test1", async (c) => {
  return await c.html(
    <LayoutTwo>
      <div
        x-data
        class="flex flex-col items-center justify-center h-screen bg-gray-100"
      >
        <div class="w-full max-w-xs text-center mb-6">
          <h1 class="text-2xl font-semibold text-gray-800 mb-4">
            <span x-text="$store.text.value"></span>
          </h1>
        </div>
        <div class="w-full max-w-xs mb-4">
          <input
            type="text"
            x-on:keyup="$store.text.updateLocalStorage($refs.textme.value)"
            x-ref="textme"
            placeholder="Enter text..."
            class="w-full p-3 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <a href="/test2">
          <button class="w-full p-3 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300">
            Go to test2
          </button>
        </a>
      </div>
    </LayoutTwo>
  );
});

app.get("/ui", async (c) => {
  return await c.html(
    <LayoutTwo>
      <div
        x-data="{
        options: [
            {
                value: 'Aiden Walker',
                label: 'Aiden Walker',
                email: 'aiden.walker@example.com',
                img: 'https://res.cloudinary.com/ds8pgw1pf/image/upload/penguinui/component-assets/avatars/avatar-1.webp',
            },
            {
                value: 'Alex Martinez',
                label: 'Alex Martinez',
                email: 'alex.martinez@example.com',
                img: 'https://res.cloudinary.com/ds8pgw1pf/image/upload/penguinui/component-assets/avatars/avatar-6.webp',
            },
            {
                value: 'Ava Collins',
                label: 'Ava Collins',
                email: 'ava.collins@example.com',
                img: 'https://res.cloudinary.com/ds8pgw1pf/image/upload/penguinui/component-assets/avatars/avatar-8.webp',
            },
            {
                value: 'Bob Johnson',
                label: 'Bob Johnson',
                email: 'bob.johnson@example.com',
                img: 'https://res.cloudinary.com/ds8pgw1pf/image/upload/penguinui/component-assets/avatars/avatar-2.webp',
            },
            {
                value: 'Emily Rodriguez',
                label: 'Emily Rodriguez',
                email: 'emily.rodriguez@example.com',
                img: 'https://res.cloudinary.com/ds8pgw1pf/image/upload/penguinui/component-assets/avatars/avatar-5.webp',
            },
            {
                value: 'Emma Thompson',
                label: 'Emma Thompson',
                email: 'emma.thompson@example.com',
                img: 'https://res.cloudinary.com/ds8pgw1pf/image/upload/penguinui/component-assets/avatars/avatar-4.webp',
            },
            {
                value: 'Ethan Brown',
                label: 'Ethan Brown',
                email: 'ethan.brown@example.com',
                img: 'https://res.cloudinary.com/ds8pgw1pf/image/upload/penguinui/component-assets/avatars/avatar-9.webp',
            },
            {
                value: 'Isabella Davis',
                label: 'Isabella Davis',
                email: 'isabellea.davis@example.com',
                img: 'https://res.cloudinary.com/ds8pgw1pf/image/upload/penguinui/component-assets/avatars/avatar-3.webp',
            },
            {
                value: 'Noah Brooks',
                label: 'Noah Brooks',
                email: 'noah.brooks@example.com',
                img: 'https://res.cloudinary.com/ds8pgw1pf/image/upload/penguinui/component-assets/avatars/avatar-7.webp',
            },
        ],
        isOpen: false,
        openedWithKeyboard: false,
        selectedOption: null,
        setSelectedOption(option) {
            this.selectedOption = option
            this.isOpen = false
            this.openedWithKeyboard = false
            this.$refs.hiddenTextField.value = option.value
        },
        highlightFirstMatchingOption(pressedKey) {
            const option = this.options.find((item) =>
                item.label.toLowerCase().startsWith(pressedKey.toLowerCase()),
            )
            if (option) {
                const index = this.options.indexOf(option)
                const allOptions = document.querySelectorAll('.combobox-option')
                if (allOptions[index]) {
                    allOptions[index].focus()
                }
            }
        },
    }"
        class="w-full max-w-xs flex flex-col gap-1"
        x-on:keydown="highlightFirstMatchingOption($event.key)"
        {...{
          "x-on:keydown.esc.window":
            "isOpen = false, openedWithKeyboard = false",
        }}
      >
        <label
          for="user"
          class="w-fit pl-0.5 text-sm text-neutral-600 dark:text-neutral-300"
        >
          Share with
        </label>
        <div class="relative">
          <button
            type="button"
            role="combobox"
            class="inline-flex w-full items-center justify-between gap-2 whitespace-nowrap border-neutral-300 bg-neutral-50 px-4 py-2 text-sm font-medium capitalize tracking-wide text-neutral-600 transition hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:border-neutral-700 dark:bg-neutral-900/50 dark:text-neutral-300 dark:focus-visible:outline-white rounded-md border"
            aria-haspopup="listbox"
            aria-controls="usersList"
            x-on:click="isOpen = ! isOpen"
            {...{
              "x-on:keydown.down.prevent": "openedWithKeyboard = true",
              "x-on:keydown.enter.prevent": "openedWithKeyboard = true",
              "x-on:keydown.space.prevent": "openedWithKeyboard = true",
              "x-bind:aria-label":
                "selectedOption ? selectedOption.value : 'Please Select'",
            }}
            x-bind:aria-expanded="isOpen || openedWithKeyboard"
          >
            <span
              class="text-sm font-normal"
              x-text="selectedOption ? selectedOption.value : 'Please Select'"
            ></span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="size-5"
            >
              <path
                fill-rule="evenodd"
                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <input
            id="user"
            name="user"
            type="text"
            x-ref="hiddenTextField"
            hidden
          />
          <ul
            x-cloak
            x-show="isOpen || openedWithKeyboard"
            id="usersList"
            class="absolute z-10 left-0 top-11 flex max-h-44 w-full flex-col overflow-hidden overflow-y-auto border-neutral-300 bg-neutral-50 py-1.5 dark:border-neutral-700 dark:bg-neutral-900 rounded-md border"
            role="listbox"
            aria-label="users list"
            {...{
              "x-on:click.outside":
                "isOpen = false, openedWithKeyboard = false",
              "x-on:keydown.down.prevent": "$focus.wrap().next()",
              "x-on:keydown.up.prevent": "$focus.wrap().previous()",
            }}
            // x-transition
            x-trap="openedWithKeyboard"
          >
            <template x-for="(item, index) in options" x-bind:key="item.value">
              <li
                class="combobox-option inline-flex cursor-pointer justify-between items-center gap-6 bg-neutral-50 px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-900/5 hover:text-neutral-900 focus-visible:bg-neutral-900/5 focus-visible:text-neutral-900 focus-visible:outline-none dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-50/5 dark:hover:text-white dark:focus-visible:bg-neutral-50/10 dark:focus-visible:text-white"
                role="option"
                x-on:click="setSelectedOption(item)"
                {...{ "x-on:keydown.enter": "setSelectedOption(item)" }}
                x-bind:id="'option-' + index"
                tabindex={0}
              >
                <div class="flex items-center gap-2">
                  <img
                    class="size-8 rounded-full"
                    x-bind:src="item.img"
                    alt=""
                    aria-hidden="true"
                  />
                  <div class="flex flex-col">
                    <span
                      x-bind:class="selectedOption == item ? 'font-bold' : null"
                      x-text="item.label"
                    ></span>
                    <span class="text-xs" x-text="item.email"></span>
                    <span
                      class="sr-only"
                      x-text="selectedOption == item ? 'selected' : null"
                    ></span>
                  </div>
                </div>
                <svg
                  x-cloak
                  x-show="selectedOption == item"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  fill="none"
                  stroke-width="2"
                  class="size-4"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </LayoutTwo>
  );
});

app.get("/test2", async (c) => {
  return await c.html(
    <LayoutTwo>
      <div
        x-data
        class="flex flex-col items-center  justify-center h-screen bg-blue-500"
      >
        <div class="w-full max-w-xs text-center mb-6">
          <h1 class="text-2xl font-semibold text-gray-800 mb-4">
            <span x-text="$store.text.value"></span>
          </h1>
        </div>
        <div class="w-full max-w-xs mb-4">
          <input
            type="text"
            x-on:keyup="$store.text.updateLocalStorage($refs.textme.value)"
            x-ref="textme"
            placeholder="Enter text..."
            class="w-full p-3 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <a href="/test1">
          <button class="w-full p-3 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300">
            Go to test1
          </button>
        </a>
      </div>
    </LayoutTwo>
  );
});

app.get("/modal", async (c) => {
  return await c.html(
    <LayoutTwo>
      <div x-data="{modalIsOpen: false}">
        <button
          type="button"
          class="cursor-pointer whitespace-nowrap rounded-md bg-black px-4 py-2 text-center text-sm font-medium tracking-wide text-neutral-100 transition hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black active:opacity-100 active:outline-offset-0 dark:bg-white dark:text-black dark:focus-visible:outline-white"
          {...{ "@click": "modalIsOpen = true" }}
        >
          Open Modal
        </button>
        <div
          x-cloak
          x-show="modalIsOpen"
          class="fixed inset-0 z-30 flex items-end justify-center bg-black/20 p-4 pb-8 backdrop-blur-md sm:items-center lg:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="defaultModalTitle"
          {...{
            "x-transition.opacity.duration.200ms": "",
            "x-trap.inert.noscroll": "modalIsOpen",
            "@keydown.esc.window": "modalIsOpen = false",
            "@click.self": "modalIsOpen = false",
          }}
        >
          <div
            x-show="modalIsOpen"
            x-transition:enter="transition ease-out duration-200 delay-100 motion-reduce:transition-opacity"
            x-transition:enter-start="opacity-0 scale-50"
            x-transition:enter-end="opacity-100 scale-100"
            class="flex max-w-lg flex-col gap-4 overflow-hidden rounded-md border border-neutral-300 bg-white text-neutral-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300"
          >
            <div class="flex items-center justify-between border-b border-neutral-300 bg-neutral-50/60 p-4 dark:border-neutral-700 dark:bg-neutral-950/20">
              <h3
                id="defaultModalTitle"
                class="font-semibold tracking-wide text-neutral-900 dark:text-white"
              >
                Special Offer
              </h3>
              <button
                aria-label="close modal"
                {...{ "@click": "modalIsOpen = false" }}
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  stroke="currentColor"
                  fill="none"
                  class="w-5 h-5"
                  {...{
                    xmlns: "http://www.w3.org/2000/svg",
                    "stroke-width": "1.4",
                  }}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div class="px-4 py-8">
              <p>
                As a token of appreciation, we have an exclusive offer just for
                you. Upgrade your account now to unlock premium features and
                enjoy a seamless experience.
              </p>
            </div>
            <div class="flex flex-col-reverse justify-between gap-2 border-t border-neutral-300 bg-neutral-50/60 p-4 dark:border-neutral-700 dark:bg-neutral-950/20 sm:flex-row sm:items-center md:justify-end">
              <button
                type="button"
                class="cursor-pointer whitespace-nowrap rounded-md px-4 py-2 text-center text-sm font-medium tracking-wide text-neutral-600 transition hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black active:opacity-100 active:outline-offset-0 dark:text-neutral-300 dark:focus-visible:outline-white"
                {...{ "@click": "modalIsOpen = false" }}
              >
                Remind me later
              </button>
              <button
                type="button"
                class="cursor-pointer whitespace-nowrap rounded-md bg-black px-4 py-2 text-center text-sm font-medium tracking-wide text-neutral-100 transition hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black active:opacity-100 active:outline-offset-0 dark:bg-white dark:text-black dark:focus-visible:outline-white"
                {...{ "@click": "modalIsOpen = false" }}
              >
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </LayoutTwo>
  );
});

export default app;
