import { FileText, CheckCircle2, Download, Edit3, Sparkles, FileCheck2 } from "lucide-react";

function Resume() {
  const resumeSections = [
    { name: "Personal & Contact Details", status: "Complete", score: "100%" },
    { name: "Education & Degree Highlights", status: "Complete", score: "100%" },
    { name: "Technical Skills & Competencies", status: "Complete", score: "95%" },
    { name: "Projects & GitHub Repository Links", status: "Complete", score: "90%" },
    { name: "Work Experience & Internships", status: "In Progress", score: "70%" },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">AI Resume Builder & ATS Scanner</h1>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Build ATS-compliant resumes tailored for top product & tech companies.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition shadow-xs cursor-pointer">
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ATS Score Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">ATS Score Breakdown</span>
            <div className="mt-4 text-center p-6 bg-blue-50/60 border border-blue-100 rounded-2xl">
              <p className="text-4xl font-extrabold text-blue-600">88 / 100</p>
              <p className="text-xs font-semibold text-blue-800 mt-1">Strong ATS Compatibility</p>
            </div>

            <div className="mt-6 space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">Action Verbs & Formatting</span>
                <span className="font-bold text-emerald-600">High</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Keyword Optimization</span>
                <span className="font-bold text-emerald-600">85% Match</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Quantified Impact</span>
                <span className="font-bold text-amber-600">Needs Metrics</span>
              </div>
            </div>
          </div>

          <button className="mt-6 w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-semibold transition cursor-pointer">
            Re-analyze with AI
          </button>
        </div>

        {/* Resume Content Sections */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 shadow-xs">
          <h2 className="text-base font-bold text-gray-900 mb-4">Resume Content Breakdown</h2>

          <div className="space-y-3">
            {resumeSections.map((sec, i) => (
              <div key={i} className="p-4 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <h3 className="text-xs font-bold text-gray-900">{sec.name}</h3>
                    <span className="text-[11px] text-gray-500">{sec.status}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-blue-600">{sec.score}</span>
                  <button className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-white rounded-md transition">
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resume;
