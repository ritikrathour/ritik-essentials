import { useEffect, useState } from "react";
import OTPInputBox from "../components/OTPInputBox";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useOTP } from "../hooks/useOTP";
import OTPTimer from "../components/OTPTimer";

const LoginOTP = () => {
  const otp_length = 6;
  const [ttl, setTtl] = useState<number>(300);
  const { email } = useParams<{ email: string }>();
  const [value, setValue] = useState(new Array(otp_length).fill(""));
  const isOtpComplete = value.every((digit) => digit !== "");
  if (!email) {
    return toast.error("Email is required!");
  }
  // use otp hook
  const { VerifyOTP, ReSendOTP, isResending, isVerifying } = useOTP({
    email,
    otp: value,
    setTtl,
    redirect: "/",
  });
  // handleVerifyOTP
  const handleVerifyOTP = () => {
    VerifyOTP("/verify-login-otp");
  };
  // timer count down for otp
  useEffect(() => {
    if (ttl <= 0) return;
    let id = setTimeout(() => {
      setTtl((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(id);
  }, [ttl]);

  return (
    <section className="min-h-[80vh] flex justify-center items-center px-1">
      <div className="text-center border border-[#c4c4c4] p-2 sm:p-4 rounded-[5px] w-full max-w-[600px]">
        <div className="mb-16">
          <h2 className="text-[15px] md:text-3xl font-bold">Verify Login</h2>
          <p className="text-[14px] md:text-[16px]">
            Please enter the verification OTP we sent to
          </p>
          <p className="text-[14px] text-[#febd2f]">{email}</p>
        </div>
        <OTPInputBox otpvalue={value} setValue={setValue} />
        <button
          className="w-full bg-[#febd2f] text-[16px] sm:w-[400px] rounded-[5px] py-2 md:text-[16px] my-2 cursor-pointer text-[#173334] hover:bg-[#173334] transition-colors h-full  sm:py-2.5 px-2 hover:text-[#febd2f ] hover:text-[#febd2f] disabled:cursor-not-allowed disabled:opacity-80 disabled:text-[#173334] disabled:bg-[#febd2f]"
          disabled={!isOtpComplete || isVerifying}
          onClick={
            () => handleVerifyOTP()
            // VerifyOTP("/verify-login-otp")
          }
          type="button"
        >
          <span className="ml-2 text-sm">
            {isVerifying ? "Verifying..." : "Verify OTP"}
          </span>
        </button>
        <OTPTimer
          setTtl={setTtl}
          URI="/resend-otp"
          type="login"
          ReSendOTP={ReSendOTP}
          ttl={ttl}
          isResending={isResending}
        />
      </div>
    </section>
  );
};
export default LoginOTP;
