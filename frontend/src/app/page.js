export default function Home() {
  const features = [
    {
      title: "AI Resume Analysis",
      description: "Analyzes your resume's content and identifies areas for improvement.",
    },
    {
      title: "ATS Analysis",
      description: "Evaluates your resume's structure for Applicant Tracking Systems.",
    },
    {
      title: "Resume Scoring",
      description: "Provides measurable scores across key resume dimensions.",
    },
    {
      title: "AI Recommendations",
      description: "Delivers actionable feedback to strengthen your resume.",
    },
    {
      title: "Resume History",
      description: "Track and compare previous versions of your resume.",
    },
    {
      title: "Career Insights",
      description: "Get additional interpretation and context around your analysis.",
    },
  ];

  return (
    <main>
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-200">
        <div className="text-xl font-bold text-gray-900">ResumePilot AI</div>
        <div className="hidden md:flex gap-8 text-gray-600">
          <a href="#features" className="hover:text-gray-900">Features</a>
          <a href="#how-it-works" className="hover:text-gray-900">How It Works</a>
          <a href="#about" className="hover:text-gray-900">About</a>
        </div>
        <div className="flex gap-4">
          <button className="text-gray-600 hover:text-gray-900">Login</button>
          <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-8 py-24">
        <h1 className="text-5xl font-bold text-gray-900 max-w-2xl">
          Build a Resume That Gets Noticed.
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-xl">
          ResumePilot AI analyzes your resume, identifies areas for improvement,
          and gives you actionable recommendations to boost your ATS compatibility.
        </p>
        <div className="mt-8 flex gap-4">
          <button className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800">
            Analyze My Resume
          </button>
          <button className="border border-gray-300 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-50">
            Learn More
          </button>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-8 py-20 bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Everything You Need to Improve Your Resume
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white p-6 rounded-lg border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}