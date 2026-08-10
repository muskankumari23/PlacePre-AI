import { Briefcase, Search, ExternalLink, MapPin, DollarSign, Building } from "lucide-react";

function Jobs() {
  const jobsList = [
    {
      id: 1,
      title: "Frontend Software Engineer Intern",
      company: "Stripe",
      location: "Bengaluru, IN (Hybrid)",
      type: "Full-time Internship",
      salary: "₹65,000 / month",
      matchScore: 94,
      skills: ["React", "TypeScript", "Tailwind CSS"],
      applied: false,
    },
    {
      id: 2,
      title: "Associate Software Engineer - SDE 1",
      company: "Atlassian",
      location: "Remote / Bengaluru",
      type: "Full-time",
      salary: "₹18 - 22 LPA",
      matchScore: 89,
      skills: ["Java", "Data Structures", "Node.js"],
      applied: true,
    },
    {
      id: 3,
      title: "Graduate Backend Engineer",
      company: "Razorpay",
      location: "Gurugram, IN",
      type: "Full-time",
      salary: "₹16 - 20 LPA",
      matchScore: 85,
      skills: ["Node.js", "SQL", "Redis"],
      applied: false,
    },
    {
      id: 4,
      title: "Full Stack Engineer Candidate",
      company: "Swiggy",
      location: "Bengaluru, IN",
      type: "Full-time",
      salary: "₹15 - 18 LPA",
      matchScore: 82,
      skills: ["React", "Express", "MongoDB"],
      applied: false,
    },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Jobs & Placement Opportunities</h1>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Browse campus placements, internships, and entry-level SDE opportunities matching your skill profile.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search roles or companies..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-blue-600"
          />
        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {jobsList.map((job) => (
          <div
            key={job.id}
            className="bg-white border border-gray-200 hover:border-blue-200 rounded-2xl p-6 shadow-xs transition flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-2 min-w-0">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs shrink-0">
                  {job.company.charAt(0)}
                </span>
                <h2 className="text-base font-bold text-gray-900 truncate">{job.title}</h2>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  {job.matchScore}% Match
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-600 flex-wrap">
                <span className="font-semibold text-gray-800 flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-gray-400" />
                  {job.company}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  {job.location}
                </span>
                <span className="font-semibold text-blue-600">{job.salary}</span>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                {job.skills.map((sk) => (
                  <span key={sk} className="text-[11px] text-gray-600 bg-gray-100 px-2.5 py-0.5 rounded-md font-medium">
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {job.applied ? (
                <span className="px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold">
                  Applied ✓
                </span>
              ) : (
                <button className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition shadow-xs cursor-pointer">
                  <span>Apply Opportunity</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Jobs;
