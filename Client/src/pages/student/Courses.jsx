import { BookOpen, Play, Clock, Star, CheckCircle2, ChevronRight } from "lucide-react";

function Courses() {
  const coursesList = [
    {
      id: 1,
      title: "Mastering System Design & Distributed Systems",
      instructor: "Dr. Aris Vance",
      category: "System Design",
      progress: 75,
      totalLessons: 24,
      completedLessons: 18,
      rating: 4.9,
      students: "3.2k enrolled",
      thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      title: "Complete Data Structures & Algorithms Blueprint",
      instructor: "Siddharth Rao",
      category: "DSA & Problem Solving",
      progress: 40,
      totalLessons: 45,
      completedLessons: 18,
      rating: 4.9,
      students: "8.5k enrolled",
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      title: "Full Stack Web Engineering with React & Node",
      instructor: "Elena Rostova",
      category: "Web Development",
      progress: 90,
      totalLessons: 30,
      completedLessons: 27,
      rating: 4.8,
      students: "5.1k enrolled",
      thumbnail: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">My Courses & Learning Tracks</h1>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Access your active courses, video lectures, coding assignments, and certificates.
          </p>
        </div>

        <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition shadow-xs">
          Browse Course Catalog
        </button>
      </div>

      {/* Courses List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {coursesList.map((course) => (
          <div key={course.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs hover:border-blue-200 transition flex flex-col justify-between">
            <div>
              <div className="h-40 bg-gray-100 relative overflow-hidden">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-white/90 text-blue-700 text-[11px] font-bold px-2.5 py-0.5 rounded-md shadow-xs">
                  {course.category}
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>{course.instructor}</span>
                  <span className="flex items-center gap-1 font-semibold text-amber-600">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    {course.rating}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2">
                  {course.title}
                </h3>

                <div className="mt-4">
                  <div className="flex justify-between text-xs font-medium text-gray-600 mb-1">
                    <span>Progress ({course.completedLessons}/{course.totalLessons} Lessons)</span>
                    <span className="font-semibold text-blue-600">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: `${course.progress}%` }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="px-5 pb-5 pt-2">
              <button className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-xs font-semibold transition cursor-pointer">
                <Play className="w-3.5 h-3.5 fill-blue-700" />
                <span>Continue Course</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
