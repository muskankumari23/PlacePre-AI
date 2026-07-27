function Navbar() {
  return (
    <nav className="bg-white shadow px-8 py-4 flex justify-between">
      <h1 className="text-2xl font-bold text-blue-600">
        PlacePrep AI
      </h1>

      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
        Login
      </button>
    </nav>
  );
}

export default Navbar;