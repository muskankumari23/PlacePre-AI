import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <div className="bg-white w-[420px] rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center">
          Welcome Back 👋
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Login to continue your placement journey
        </p>

        <div className="mt-8 space-y-5">

          <Input
            placeholder="Enter Email"
          />

          <Input
            type="password"
            placeholder="Enter Password"
          />

          <Button
            text="Login"
            variant="primary"
          />

        </div>

      </div>

    </div>
  );
}

export default Login;