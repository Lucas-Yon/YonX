function Page() {
  return (
    <>
      <div class="flex flex-col min-h-screen">
        <header class="bg-primary text-primary-foreground py-6 px-4 md:px-8">
          <div class="container mx-auto flex justify-between items-center">
            <a class="text-2xl font-bold" href="#">
              Ettarra Coffee House
            </a>
            <nav class="hidden md:flex items-center space-x-6">
              <a class="hover:underline" href="#">
                Events
              </a>
              <a class="hover:underline" href="#">
                About
              </a>
              <a class="hover:underline" href="#">
                Contact
              </a>
            </nav>
            <button class="items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 hidden md:inline-flex">
              Book Now
            </button>
          </div>
        </header>
        <main class="flex-1">
          <section class="bg-[url('/hero-bg.jpg')] bg-cover bg-center py-32 px-4 md:px-8">
            <div class="container mx-auto max-w-3xl text-center space-y-6">
              <h1 class="text-4xl font-bold text-primary-foreground">
                Discover Extraordinary Dining Experiences
              </h1>
              <p class="text-lg text-primary-foreground">
                Ettarra Coffee House invites you to explore our captivating
                supper club events, where culinary artistry and immersive themes
                come together for an unforgettable dining experience.
              </p>
              <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                Book Now
              </button>
            </div>
          </section>
          <section class="py-16 px-4 md:px-8">
            <div class="container mx-auto">
              <div class="flex flex-col md:flex-row items-center justify-between mb-8">
                <h2 class="text-3xl font-bold">Featured Events</h2>
                <a class="text-primary hover:underline" href="#">
                  View All Events
                </a>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <div
                  class="rounded-lg border bg-card text-card-foreground shadow-sm"
                  data-v0-t="card"
                >
                  <img
                    src="/placeholder.svg"
                    alt="Event 1"
                    width="400"
                    height="300"
                    class="rounded-t-lg"
                    style="aspect-ratio:400/300;object-fit:cover"
                  />
                  <div class="p-4 space-y-2">
                    <h3 class="text-xl font-bold">Enchanted Forest Supper</h3>
                    <p class="text-muted-foreground">June 15, 2023 | 7:00 PM</p>
                    <p>
                      Immerse yourself in a magical forest setting as you
                      indulge in a multi-course culinary adventure.
                    </p>
                    <a class="text-primary" href="#">
                      Learn More
                    </a>
                  </div>
                </div>
                <div
                  class="rounded-lg border bg-card text-card-foreground shadow-sm"
                  data-v0-t="card"
                >
                  <img
                    src="/placeholder.svg"
                    alt="Event 2"
                    width="400"
                    height="300"
                    class="rounded-t-lg"
                    style="aspect-ratio:400/300;object-fit:cover"
                  />
                  <div class="p-4 space-y-2">
                    <h3 class="text-xl font-bold">Masquerade Ball Supper</h3>
                    <p class="text-muted-foreground">July 20, 2023 | 8:00 PM</p>
                    <p>
                      Don your finest attire and join us for a night of mystery,
                      elegance, and exceptional cuisine.
                    </p>
                    <a class="text-primary" href="#">
                      Learn More
                    </a>
                  </div>
                </div>
                <div
                  class="rounded-lg border bg-card text-card-foreground shadow-sm"
                  data-v0-t="card"
                >
                  <img
                    src="/placeholder.svg"
                    alt="Event 3"
                    width="400"
                    height="300"
                    class="rounded-t-lg"
                    style="aspect-ratio:400/300;object-fit:cover"
                  />
                  <div class="p-4 space-y-2">
                    <h3 class="text-xl font-bold">Roaring 20s Supper Club</h3>
                    <p class="text-muted-foreground">
                      August 10, 2023 | 7:30 PM
                    </p>
                    <p>
                      Step back in time and experience the glamour and
                      excitement of the Roaring 20s with our themed supper club.
                    </p>
                    <a class="text-primary" href="#">
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class="bg-muted py-16 px-4 md:px-8">
            <div class="container mx-auto">
              <div class="flex flex-col md:flex-row items-center justify-between mb-8">
                <h2 class="text-3xl font-bold">About Ettarra Coffee House</h2>
                <a class="text-primary hover:underline" href="#">
                  Learn More
                </a>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <img
                    src="/placeholder.svg"
                    alt="About Ettarra Coffee House"
                    width="600"
                    height="400"
                    class="rounded-lg"
                    style="aspect-ratio:600/400;object-fit:cover"
                  />
                </div>
                <div class="space-y-4">
                  <p>
                    Ettarra Coffee House is a beloved local institution that has
                    been serving the community for over a decade. What started
                    as a cozy neighborhood cafe has evolved into a vibrant hub
                    of culinary creativity and community engagement.
                  </p>
                  <p>
                    In addition to our renowned coffee and pastries, we now host
                    a series of themed supper club events that transport guests
                    to enchanting worlds of flavor and atmosphere. Our talented
                    chefs and event designers work tirelessly to curate
                    unforgettable dining experiences that celebrate the art of
                    food, community, and storytelling.
                  </p>
                  <p>
                    Whether you're a seasoned foodie or simply looking for a
                    unique and memorable night out, we invite you to join us at
                    Ettarra Coffee House and discover the magic of our supper
                    club events.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section class="py-16 px-4 md:px-8">
            <div class="container mx-auto">
              <h2 class="text-3xl font-bold mb-8">What Our Guests Say</h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <div
                  class="rounded-lg border bg-card text-card-foreground shadow-sm"
                  data-v0-t="card"
                >
                  <div class="p-4 space-y-4">
                    <div class="flex items-center space-x-4">
                      <span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                        <span class="flex h-full w-full items-center justify-center rounded-full bg-muted">
                          JD
                        </span>
                      </span>
                      <div>
                        <h3 class="text-lg font-bold">John Doe</h3>
                        <p class="text-muted-foreground">Foodie Enthusiast</p>
                      </div>
                    </div>
                    <blockquote>
                      "The Enchanted Forest Supper was a truly magical\n
                      experience. The attention to detail, the flavors, and
                      the\n ambiance were all exceptional. I can't wait to
                      attend\n another event at Ettarra Coffee House."
                    </blockquote>
                  </div>
                </div>
                <div
                  class="rounded-lg border bg-card text-card-foreground shadow-sm"
                  data-v0-t="card"
                >
                  <div class="p-4 space-y-4">
                    <div class="flex items-center space-x-4">
                      <span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                        <span class="flex h-full w-full items-center justify-center rounded-full bg-muted">
                          SA
                        </span>
                      </span>
                      <div>
                        <h3 class="text-lg font-bold">Sarah Anderson</h3>
                        <p class="text-muted-foreground">Event Enthusiast</p>
                      </div>
                    </div>
                    <blockquote>
                      "The Masquerade Ball Supper was an unforgettable
                      experience.\n The attention to detail, the delicious food,
                      and the\n immersive atmosphere made it a night to
                      remember. I highly\n recommend Ettarra Coffee House's
                      supper club events."
                    </blockquote>
                  </div>
                </div>
                <div
                  class="rounded-lg border bg-card text-card-foreground shadow-sm"
                  data-v0-t="card"
                >
                  <div class="p-4 space-y-4">
                    <div class="flex items-center space-x-4">
                      <span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                        <span class="flex h-full w-full items-center justify-center rounded-full bg-muted">
                          LM
                        </span>
                      </span>
                      <div>
                        <h3 class="text-lg font-bold">Lisa Martinez</h3>
                        <p class="text-muted-foreground">
                          Supper Club Enthusiast
                        </p>
                      </div>
                    </div>
                    <blockquote>
                      "The Roaring 20s Supper Club event at Ettarra Coffee
                      House\n was an absolute delight. The attention to detail,
                      the\n delicious food, and the lively atmosphere
                      transported me\n back in time. I can't wait to attend
                      their next themed\n event."
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer class="bg-primary text-primary-foreground py-8 px-4 md:px-8">
          <div class="container mx-auto flex flex-col md:flex-row items-center justify-between">
            <div class="mb-4 md:mb-0">
              <a class="text-2xl font-bold" href="#">
                Ettarra Coffee House
              </a>
            </div>
            <nav class="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <a class="hover:underline" href="#">
                Events
              </a>
              <a class="hover:underline" href="#">
                About
              </a>
              <a class="hover:underline" href="#">
                Contact
              </a>
              <a class="hover:underline" href="#">
                Calendar
              </a>
            </nav>
            <div class="flex items-center space-x-4">
              <a class="text-primary-foreground hover:underline" href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="h-6 w-6"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a class="text-primary-foreground hover:underline" href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="h-6 w-6"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
              <a class="text-primary-foreground hover:underline" href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="h-6 w-6"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Page;
