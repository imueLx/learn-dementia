import Link from "next/link";
import { FaBrain, FaQuestionCircle } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <main className="bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-white">
        {/* Hero Section */}
        <header className="bg-blue-600 text-white dark:bg-blue-800 text-center py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-extrabold">Understanding Dementia</h1>
            <p className="mt-6 text-lg leading-relaxed">
              Learn about dementia and explore your cognitive health today. Take
              the first step towards better understanding and early detection.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/assessment">
                <button
                  className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 flex items-center transition"
                  aria-label="Take the Assesment Test"
                >
                  <FaQuestionCircle className="mr-2 text-lg" /> Take the
                  Assesment Test
                </button>
              </Link>
              <Link href="/learn">
                <button
                  className="bg-blue-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 flex items-center transition"
                  aria-label="Learn about Dementia"
                >
                  <FaBrain className="mr-2 text-lg" /> What is Dementia?
                </button>
              </Link>
            </div>
          </div>
        </header>

        {/* About Dementia Section */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold">What is Dementia?</h2>
            <p className="mt-6 text-lg leading-relaxed">
              Dementia is a general term for a decline in mental ability severe
              enough to interfere with daily life. It is not a single disease
              but a range of conditions affecting memory, thinking, and social
              abilities.
            </p>
            <div className="mt-8">
              <Link href="/learn">
                <button
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 transition"
                  aria-label="Learn more about Dementia"
                >
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Symptoms Section */}
        <section className="py-16 bg-gray-100 px-6 dark:bg-gray-800 dark:text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold">Do I Have Symptoms?</h2>
            <p className="mt-6 text-lg leading-relaxed">
              Experiencing memory issues or difficulty focusing? Early detection
              can make a big difference. Explore common symptoms to understand
              your condition better.
            </p>
            <div className="mt-8">
              <Link href="/learn#symptoms">
                <button
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 transition"
                  aria-label="Explore Symptoms"
                >
                  Explore Symptoms
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Early Detection Section */}
        <section className="py-16 px-6 dark:text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold">Why Early Detection Matters</h2>
            <p className="mt-6 text-lg leading-relaxed">
              Early intervention can help manage symptoms and improve quality of
              life. Get informed and take the first step today.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-gray-100 px-6 dark:bg-gray-800 dark:text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold">Contact Us</h2>
            <p className="mt-6 text-lg leading-relaxed">
              Reach out to us at{" "}
              <a
                href="mailto:contact@dementiatest.com"
                className="text-blue-600 underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition"
              >
                contact@dementiatest.com
              </a>
              . We're here to help with any questions or support you need.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
