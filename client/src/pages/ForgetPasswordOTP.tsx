import { useState } from "react";
import OTPInputBox from "../components/OTPInputBox";
import { useParams } from "react-router-dom";
import { useOTP } from "../hooks/useOTP";
import toast from "react-hot-toast";
import Input from "../components/Input";
import { validPassword } from "../utils/validation";
import OTPTimer from "../components/OTPTimer";
import { IFormErrors } from "../utils/Types/Component.types";

const ForgetPasswordOTP = () => {
  const otp_length = 6;
  const { email } = useParams<{ email: string }>();
  const [value, setValue] = useState(new Array(otp_length).fill(""));
  const [ttl, setTtl] = useState<number>(30);
  const [newPass, setNewPass] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [errors, setErrors] = useState<IFormErrors>({});
  // check all fields are filled
  const isOtpComplete =
    value.every((digit) => digit !== "") &&
    newPass.trim().length !== 0 &&
    confirmPass.trim().length !== 0;
  // check new pasword and confirm password match
  const isMatch = newPass === confirmPass;
  if (!email) {
    return toast.error("email is required");
  }
  // use otp hook
  const { VerifyOTP, ReSendOTP, isResending, isVerifying } = useOTP({
    email,
    otp: value,
    setTtl,
    data: { newPass },
    redirect: "/login",
  });
  // handle verify otp
  const handleVerifyPassword = () => {
    if (!isMatch) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
      return;
    }
    // validate password
    if (newPass.length < 6) {
      setErrors((prev) => ({
        ...prev,
        newPass: "Password must be at least 6 characters",
      }));
      return;
    }
    if (!validPassword(newPass)) {
      setErrors((prev) => ({
        ...prev,
        newPass:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }));
      return;
    }
    setErrors({});
    VerifyOTP("/verify-forget-password");
  };
  return (
    <>
      <section className="h-[100vh] flex justify-center items-center">
        <div className="text-center border border-[#c4c4c4] p-2 sm:p-4 rounded-[5px] w-full max-w-[600px] px-1">
          <div className="mb-4">
            <h2 className="text-[18px] md:text-3xl font-bold">
              Forget Password Verification
            </h2>
            <p className="text-[12px] md:text-[16px] mt-1">
              Please enter the verification OTP we sent to
            </p>
            <p className="text-[14px] text-[#febd2f]">{email}</p>
          </div>
          <form action="" className="flex flex-col gap-4">
            <OTPInputBox otpvalue={value} setValue={setValue} />
            <div className="flex text-start">
              <Input
                name="new-password"
                required
                icon={<i className="fas fa-lock" />}
                label="new password"
                type="text"
                onchange={(e) => setNewPass(e.target.value)}
                placeholder="Enter new password"
                value={newPass}
                error={errors.newPass}
              />
            </div>
            <div className="flex text-start">
              <Input
                name="confirm-password"
                required
                icon={<i className="fas fa-lock" />}
                label="confirm password"
                type="password"
                onchange={(e) => setConfirmPass(e.target.value)}
                placeholder="Enter confirm password"
                value={confirmPass}
                showPasswordToggle={true}
                error={errors.confirmPassword}
              />
            </div>
          </form>
          <button
            className="w-full bg-[#febd2f] text-[16px] sm:w-[400px] rounded-[5px] py-2 md:text-[16px] my-2 cursor-pointer text-[#173334] hover:bg-[#173334] transition-colors h-full  sm:py-2.5 px-2 hover:text-[#febd2f ] hover:text-[#febd2f] disabled:cursor-not-allowed disabled:opacity-80 disabled:text-[#173334] disabled:bg-[#febd2f]"
            disabled={!isOtpComplete || !isMatch}
            onClick={() => handleVerifyPassword()}
            type="button"
          >
            <span className="ml-2 text-sm">
              {isVerifying ? "Verifying..." : "Verify OTP"}
            </span>
          </button>
          <OTPTimer
            setTtl={setTtl}
            URI="/resend-otp"
            type="forget-password"
            ReSendOTP={ReSendOTP}
            ttl={ttl}
            isResending={isResending}
          />
        </div>
      </section>
    </>
  );
};
export default ForgetPasswordOTP;
