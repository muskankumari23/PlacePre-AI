import Button from "../ui/Button";

function Hero() {
  return (
    <section className="min-h-[90vh] flex items-center justify-between px-20 bg-slate-50">

      {/* Left Content */}

      <div className="max-w-xl">

        <p className="text-blue-600 font-semibold mb-3">
          AI Powered Learning Platform
        </p>

        <h1 className="text-6xl font-bold leading-tight">

          Crack Your Dream Job

          <span className="text-blue-600">
            {" "}with PlacePrep AI
          </span>

        </h1>

        <p className="text-gray-600 mt-6 text-lg">

          Learn DSA, Practice Quizzes,
          Build ATS-Friendly Resume,
          Take AI Mock Interviews
          and Track Your Placement Journey
          in one platform.

        </p>

        <div className="flex gap-4 mt-8">

          <Button
            text="Get Started"
            variant="primary"
          />

          <Button
            text="Explore Courses"
            variant="success"
          />

        </div>

      </div>

      {/* Right Section */}

      <div>

        <img
          src="https://placehold.co/500x500"
          alt="Hero"
          className="rounded-xl"
        />

      </div>

    </section>
  );
}

export default Hero;