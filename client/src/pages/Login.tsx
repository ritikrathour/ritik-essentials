import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { useState } from "react";
import toast from "react-hot-toast";
import { IUser } from "../utils/Types/Auth.types";
import { AxiosInstense } from "../services/AxiosInstance";
import axios from "axios";
import { Button } from "../components/ui/Button";
import { useValidateAuthForm } from "../hooks/Validationhooks/useValidateAuthForm";

const Login = () => {
  const [formData, setFormData] = useState<IUser>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [logging, setLogging] = useState<boolean>(false);
  // handleChange
  const { errors, setErrors, validate } = useValidateAuthForm({
    email: formData.email,
    password: formData.password,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => {
        const newError = { ...prev };
        delete newError[e.target.name];
        return newError;
      });
    }
  };
  // handleLogin
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // validation
    if (!validate()) {
      return;
    }
    try {
      setLogging(true);
      const response = await AxiosInstense.post("/login", formData);
      toast.success(
        response?.data?.message ||
          "We sent OTP to your email. Please verify to complete login."
      );
      setLogging(false);
      navigate(`/login-otp-verify/${formData.email}`);
      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      toast.error(
        axios.isAxiosError(error)
          ? error?.response?.data?.message || error?.response?.data?.error
          : "Login failed"
      );
      setLogging(false);
    }
  };
  return (
    <>
      <section className="flex items-center justify-center gap-2 flex-col h-[100vh] px-1">
        <h2 className="font-[600] text-[35px] sm:text-[42px] text-[#173334]">
          Welcome Back
        </h2>
        <p className="text-[14px] text-center">
          For Demo credentials: test@gmail.com / password123
        </p>
        <form
          onSubmit={(e) => handleLogin(e)}
          className=" border border-[#c4c4c4] p-2 sm:p-4 rounded-[5px] w-full max-w-[600px] flex flex-col gap-3"
        >
          <div className="flex items-center">
            <Input
              name="email"
              required
              value={formData.email}
              icon={<i className="fas fa-user" />}
              label="email"
              onchange={handleChange}
              type="email"
              placeholder="Email"
              error={errors.email}
            />
          </div>
          <div className="flex items-center">
            <Input
              name="password"
              required
              value={formData.password}
              icon={<i className="fas fa-lock" />}
              label="password"
              onchange={handleChange}
              type="password"
              placeholder="Password"
              error={errors.password}
              showPasswordToggle={true}
            />
          </div>
          <div className="flex items-center justify-between ">
            <div className="flex gap-2 items-center">
              <input name="ckeckbox" id="checkbox" type="checkbox" />
              <label htmlFor="checkbox" className="text-sm cursor-pointer">
                Remember me
              </label>
            </div>
            <Link
              to="/forget-password"
              className="text-sm text-blue-500 hover:underline"
            >
              Forget Password?
            </Link>
          </div>
          <div className="text-center  rounded-[5px] w-full sm:w-[200px] sm:self-end-safe  overflow-hidden">
            <Button className="w-full" type="submit" isLoading={logging}>
              {logging ? (
                <span>logging...</span>
              ) : (
                <>
                  Login <i className="fas fa-arrow-right text-sm"></i>
                </>
              )}
            </Button>
          </div>
        </form>
        <div className="w-full max-w-[600px] flex flex-col items-center justify-center gap-2">
          <p className="text-[14px] mt-1 text-[#173334]">Or</p>
          <Button variant="dark" type="button" className="w-full sm:w-[400px]">
            <i className="fa-brands fa-google"></i>
            <span className="ml-2 text-sm">Login with Google</span>
          </Button>
        </div>
        <p className="text-[14px] mt-2">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-[#febd2f] font-[600] hover:underline text-[12px] md:text-[14px] cursor-pointer"
          >
            CREATE NEW ACCOUNT
          </Link>
        </p>
      </section>
    </>
  );
};
export default Login;
