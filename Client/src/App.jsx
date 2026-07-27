import Button from "./components/ui/Button";
import { useState } from "react";

function App() {

 const [count, setCount] = useState(0);
  const handleLogin = () => {
    alert("Login Button Clicked");
  };

  const handleDelete = () => {
    alert("Delete Button Clicked");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-5">

      <h1 className="text-4xl font-bold">
        PlacePrep AI
      </h1>

      <Button
        text="Login"
        variant="primary"
        onClick={handleLogin}
      />

      <Button
        text="Save"
        variant="success"
        onClick={() => setCount(count + 1)}
      />
      Increase 
      <Button
        text="Delete"
        variant="danger"
        onClick={handleDelete}
      />

    </div>
  );
}

export default App;