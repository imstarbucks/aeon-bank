import { MultipleStepsForm } from "@/components/login/multiple-steps-form";

const LoginPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center px-12 text-black">
      <div className="w-4/5 max-w-xl rounded-md bg-white p-8 shadow-md lg:w-2/5 lg:min-w-48">
        <h2 className="mb-8 text-4xl font-bold">Login</h2>
        <MultipleStepsForm />
      </div>
    </div>
  );
};

export default LoginPage;
