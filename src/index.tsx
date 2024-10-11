import { Hono } from "hono";
import { type FC, type PropsWithChildren } from "hono/jsx";
import { cssGenerator } from "../unocss/generate-css";
import Yolo from "./test";

const app = new Hono();

const Layout = async (props: PropsWithChildren) => {
  console.time("generateCSS");
  const Content = props.children;
  const generatedCss = await cssGenerator.generate(`${Content}`);
  console.log(generatedCss.css);
  console.timeEnd("generateCSS");
  return (
    <html>
      <style>{generatedCss.css}</style>
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
    </>
  );
};

app.get("/", async (c) => {
  const messages = ["Good Morning", "Good Evening", "Good Night"];
  return c.html(
    <Layout>
      <Top messages={messages} />
    </Layout>
  );
});

app.get("/welcome", async (c) => {
  return c.html(
    <Layout>
      <Test />
    </Layout>
  );
});

app.get("/test", async (c) => {
  return c.html(
    <Layout>
      <Yolo />
    </Layout>
  );
});

export default app;
