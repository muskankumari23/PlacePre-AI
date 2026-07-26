import Button from "../ui/Button";

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-10 py-5 shadow-sm bg-white">

      {/* Logo */}
      <h1 className="text-2xl font-bold text-blue-600">
        PlacePrep AI
      </h1>

      {/* Navigation Links */}
      <ul className="flex gap-8 text-gray-700 font-medium">

        <li className="cursor-pointer hover:text-blue-600">
          Courses
        </li>

        <li className="cursor-pointer hover:text-blue-600">
          DSA
        </li>

        <li className="cursor-pointer hover:text-blue-600">
          Quiz
        </li>

        <li className="cursor-pointer hover:text-blue-600">
          AI Interview
        </li>

        <li className="cursor-pointer hover:text-blue-600">
          Jobs
        </li>

      </ul>

      {/* Buttons */}
      <div className="flex gap-3">

        <Button
          text="Login"
          variant="primary"
        />

      </div>

    </nav>
  );
}

export default Navbar;