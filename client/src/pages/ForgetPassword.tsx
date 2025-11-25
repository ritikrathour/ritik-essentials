import { Link } from "react-router-dom";
import Input from "../components/Input";
import { useState } from "react";
import { validEmail } from "../utils/validation";
import { useOTP } from "../hooks/useOTP";

const ForgetPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setErrors] = useState<string>("");
  const { sendOTP, isOtpSending } = useOTP({ email });
  // handleChange
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  // handleForgetPassword
  const handleForgetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      setErrors("Email is required!");
      return;
    }
    if (!validEmail(email)) {
      setErrors("Please enter a valid email address.");
      return;
    }
    // use otp hook's send otp function
    sendOTP("/forget-password");
  };
  return (
    <>
      <section className="flex items-center justify-center gap-2 flex-col px-1">
        <h2 className="font-[600] text-[30px] sm:text-[42px] text-[#173334] text-center">
          Forget Password!
        </h2>
        <div className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] rounded-full border border-[#c4c4c4] overflow-hidden">
          <img src="../public/assets/forget-pass.png" alt="" />
        </div>
        <p className="text-center text-[14px]">
          Enter the registerd email address associated with your account.
        </p>
        <p className=" text-center text-[14px] text-[#939090]">
          We will email you 6 digit <span className="font-semibold">OTP</span>{" "}
          to rest your password.
        </p>
        <form
          onSubmit={(e) => handleForgetPassword(e)}
          className=" border border-[#c4c4c4] p-4 rounded-[5px] w-full max-w-[600px] flex flex-col gap-3 mt-2"
        >
          <div className="flex items-center">
            <Input
              name="email"
              required
              icon={<i className="fas fa-envelope" />}
              label="email"
              type="email"
              onchange={handleChange}
              placeholder="Enter Your registered Email"
              value={email}
              error={error}
            />
          </div>
          <div className="text-center rounded-[5px] w-full sm:w-[200px] sm:self-end-safe  overflow-hidden">
            <button
              disabled={isOtpSending}
              className="bg-[#febd2f] text-[16px] cursor-pointer text-[#173334] w-full  hover:bg-[#173334] transition-colors h-full py-2 sm:py-2.5 px-2 hover:text-[#febd2f]"
              type="submit"
            >
              {isOtpSending ? (
                <span>Sending OTP...</span>
              ) : (
                <>
                  Reset Password <i className="fas fa-arrow-right"></i>
                </>
              )}
            </button>
          </div>
        </form>
        <div className="flex justify-between w-full max-w-[600px]">
          <p className="text-[14px] mt-1">
            Back to{" "}
            <Link
              to="/login"
              className="text-[#febd2f] font-[600] hover:underline text-[14px] cursor-pointer"
            >
              LogIn
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};
export default ForgetPassword;
