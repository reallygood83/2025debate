import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-700 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Debate Tutor</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="/" className="hover:underline">Home</Link></li>
              <li><Link href="#features" className="hover:underline">Features</Link></li>
              <li><Link href="#about" className="hover:underline">About</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6 text-blue-800">Your AI Debate Preparation Assistant</h2>
            <p className="text-xl mb-10 max-w-3xl mx-auto text-gray-600">
              Enhance your debate skills with personalized feedback, research assistance, and practice scenarios.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300">
              Get Started
            </button>
          </div>
        </section>

        <section id="features" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-3 text-blue-700">AI Feedback</h3>
                <p className="text-gray-600">Receive instant feedback on your arguments, delivery, and rebuttals.</p>
              </div>
              <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-3 text-blue-700">Research Assistant</h3>
                <p className="text-gray-600">Access curated resources and data to strengthen your arguments.</p>
              </div>
              <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-3 text-blue-700">Practice Scenarios</h3>
                <p className="text-gray-600">Test your skills with various debate topics and formats.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">About Debate Tutor</h2>
            <p className="text-lg max-w-3xl mx-auto text-gray-600">
              Debate Tutor was created to help students, professionals, and debate enthusiasts improve their skills
              through AI-powered coaching and personalized feedback.
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Debate Tutor. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
