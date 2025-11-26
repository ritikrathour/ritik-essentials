import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import toast from "react-hot-toast";
import { Role } from "../utils/constant";
import { IUser } from "../utils/Types/Auth.types";
import axios from "axios";
import { AxiosInstense } from "../services/AxiosInstance";
import { Button } from "../components/ui/Button";
import { useValidateAuthForm } from "../hooks/Validationhooks/useValidateAuthForm";
const Register = () => {
  const [formData, setFormData] = useState<IUser>({
    name: "",
    email: "",
    password: "",
  });
  const [role, setRole] = useState<string>("customer"); // default role
  const [loading, setLoading] = useState<boolean>(false);
  const { errors, setErrors, validate } = useValidateAuthForm({
    name: formData.name || "",
    email: formData.email,
    password: formData.password,
    type: "Register",
  });
  // handleChange
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[e.target.name];
        return newErrors;
      });
    }
  };
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // check validation
    if (!validate()) {
      return;
    }
    try {
      setLoading(true);
      const response = await AxiosInstense.post("/register", {
        ...formData,
        role: role,
      });
      setFormData({
        name: "",
        email: "",
        password: "",
      });
      toast.success(
        response?.data?.message ||
          "Registration successful. Please check your email to verify your account."
      );
      sessionStorage.setItem(
        "register_message",
        response?.data?.message ||
          "Registration successful. Please check your email to verify your account."
      );
      setLoading(false);
    } catch (error) {
      toast.error(
        axios.isAxiosError(error)
          ? error?.response?.data?.message || error?.response?.data?.error
          : "Registration failed"
      );
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <>
      <section className="flex items-center justify-center gap-2 flex-col px-2">
        <h2 className="font-[600] text-[35px] sm:text-[42px] text-[#173334]">
          Join Us Today!
        </h2>
        <form
          onSubmit={(e) => handleRegister(e)}
          className=" border border-[#c4c4c4] p-4 rounded-[5px] w-full max-w-[600px] flex flex-col gap-3"
        >
          <div className="flex items-center">
            <Input
              name="name"
              required
              value={formData.name}
              icon={<i className="fas fa-user" />}
              label="name"
              onchange={handleChange}
              type="text"
              placeholder="Full Name"
              error={errors.name}
            />
          </div>
          <div className="flex items-center">
            <Input
              name="email"
              required
              icon={<i className="fas fa-envelope" />}
              label="email"
              type="email"
              onchange={handleChange}
              placeholder="example@gmail.com"
              value={formData.email}
              error={errors.email}
            />
          </div>
          <div className="flex items-center">
            <Input
              name="password"
              required
              icon={<i className="fas fa-lock" />}
              label="password"
              type="password"
              onchange={handleChange}
              placeholder="Password"
              value={formData.password}
              error={errors.password}
              showPasswordToggle
            />
          </div>
          <div className="flex items-center gap-2 m-auto">
            {Role?.map((data) => {
              return (
                <div
                  onClick={() => setRole(data?.title)}
                  key={data?.id}
                  className={`${
                    role === data?.title ? "bg-gray-200" : ""
                  } border border-[#c4c4c4] rounded-full px-4 py-1 cursor-pointer hover:bg-gray-200 transition-colors`}
                >
                  <p className="text-[12px] font-bold">{data?.title}</p>
                </div>
              );
            })}
          </div>
          <div className="text-center rounded-[5px] w-full sm:w-[200px] sm:self-end-safe overflow-hidden">
            <Button className="w-full" isLoading={loading} type="submit">
              {loading ? (
                <span>Loading...</span>
              ) : (
                <>
                  Create <i className="fas fa-arrow-right text-sm"></i>
                </>
              )}
            </Button>
          </div>
        </form>
        <div className="w-full  max-w-[600px] flex flex-col items-center justify-center gap-2">
          <p className="text-[14px] mt-1 text-[#173334]">Or</p>
          <Button variant="dark" type="button" className="w-full sm:w-[400px]">
            <i className="fa-brands fa-google"></i>
            <span className="ml-2 text-sm">Register with Google</span>
          </Button>
        </div>
        <p className="text-[14px] mt-2">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#febd2f] font-[600] hover:underline text-[14px] cursor-pointer"
          >
            LogIn
          </Link>
        </p>
      </section>
    </>
  );
};
export default Register;
