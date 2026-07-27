import { useState } from "react";

function App() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
///////////////////////
  const validateForm = () => {
  let newErrors = {};

  if (!email.trim()) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    newErrors.email = "Enter a valid email";
  }

  if (!password.trim()) {
    newErrors.password = "Password is required";
  } else if (password.length < 8) {
    newErrors.password = "Password must be at least 8 characters";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
}; 
//////////////////////////
  const handleLogin = () => {
    if (validateForm()) {
      console.log("Email:", email);
      console.log("Password:", password);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-5 bg-slate-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          className="border p-3 rounded-lg w-full mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="border p-3 rounded-lg w-full mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-lg"
        >
          Login
        </button>
        <p className="text-sm text-gray-600 mt-4">
  Welcome, {email || "Guest"}
</p>

      </div>

    </div>
  );
}

export default App;