function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6">

      <h2 className="text-xl font-bold mb-8">
        Student Panel
      </h2>

      <ul className="space-y-4">
        <li>Dashboard</li>
        <li>Courses</li>
        <li>DSA</li>
        <li>Quiz</li>
        <li>Resume</li>
        <li>Interview</li>
        <li>Jobs</li>
      </ul>

    </aside>
  );
}

export default Sidebar;