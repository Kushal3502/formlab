import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Share2, BarChart3 } from "lucide-react";
import LoginButton from "@/components/LoginButton";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen ">
      <main className="flex-1">
        <section className="w-full h-screen flex justify-center items-center">
          <div className="container">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-8">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  <span className="text-rose-600 ">C</span>
                  reate, <span className="text-rose-600 ">S</span>
                  hare, <span className="text-rose-600 ">A</span>
                  nalyze <br />
                  <span className="">Forms with Ease</span>
                </h1>

                <p className="mx-auto max-w-[700px] md:text-xl">
                  Build powerful forms, gather responses, and gain insights all
                  in one place. Login with Google and start creating in minutes.
                </p>
              </div>
              <div className="space-x-4 flex">
                <LoginButton>
                  Get Started <ArrowRight className=" h-4 w-4" />
                </LoginButton>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Powerful Features
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center border px-4 py-6 rounded-xl shadow-xl bg-rose-100 dark:bg-zinc-800">
                <CheckCircle className="h-12 w-12 text-rose-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Easy Form Creation</h3>
                <p>
                  Build custom forms with our intuitive drag-and-drop interface.
                </p>
              </div>
              <div className="flex flex-col items-center text-center border px-4 py-6 rounded-xl shadow-xl bg-rose-100 dark:bg-zinc-800">
                <Share2 className="h-12 w-12 text-rose-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Seamless Sharing</h3>
                <p>
                  Share your forms with a simple link and collect responses
                  instantly.
                </p>
              </div>
              <div className="flex flex-col items-center text-center border px-4 py-6 rounded-xl shadow-xl bg-rose-100 dark:bg-zinc-800">
                <BarChart3 className="h-12 w-12 text-rose-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Detailed Analytics</h3>
                <p>
                  Gain insights from responses with our powerful analytics
                  tools.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-8 sm:py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4 text-center lg:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-5xl">
                  See Your Forms in Action
                </h2>
                <p className="text-base md:text-xl max-w-[600px] mx-auto lg:mx-0">
                  Create beautiful, responsive forms that work on any device.
                  Our real-time preview lets you see exactly how your form will
                  look to respondents.
                </p>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/Screenshot (3).png"
                  alt="FormFlow app preview"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl w-full max-w-[500px] object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              What Our Users Say
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col p-6 rounded-lg border bg-rose-100 dark:bg-zinc-800">
                <p className="mb-4">
                  &quot;FormLab has revolutionized how we collect data.
                  It&apos;s so easy to use!&quot;
                </p>
                <p className="font-semibold">- Sarah K., Marketing Manager</p>
              </div>
              <div className="flex flex-col p-6 rounded-lg border bg-rose-100 dark:bg-zinc-800">
                <p className="mb-4">
                  &quot;The analytics feature is a game-changer. We can make
                  decisions faster than ever.&quot;
                </p>
                <p className="font-semibold">- John D., Research Analyst</p>
              </div>
              <div className="flex flex-col p-6 rounded-lg border bg-rose-100 dark:bg-zinc-800">
                <p className="mb-4">
                  &quot;Google login makes it so convenient. I&apos;m creating
                  forms in no time!&quot;
                </p>
                <p className="font-semibold">- Emily R., Event Coordinator</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-rose-400 to-lavender-400 rounded-3xl overflow-hidden">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Transform Your Form Creation?
                </h2>
                <p className="mx-auto max-w-[600px] md:text-xl">
                  Join thousands of users who are already creating, sharing, and
                  analyzing forms with ease.
                </p>
              </div>
              <LoginButton>Get Started for Free</LoginButton>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs">© 2025 FormLab. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
