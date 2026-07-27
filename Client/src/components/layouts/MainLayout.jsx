import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function MainLayout({ children }) {
  return (
    <div>

      <Navbar />

      <div className="flex">

        <Sidebar />

        <main className="flex-1 p-8 bg-slate-100 min-h-screen">
          {children}
        </main>

      </div>

    </div>
  );
}

export default MainLayout;