import { useEffect, useState } from "react";
import OTPInputBox from "../components/OTPInputBox";
import toast from "react-hot-toast";
import { Form, useNavigate, useParams } from "react-router-dom";
import { useOTP } from "../hooks/useOTP";
import OTPTimer from "../components/OTPTimer";
import { Button } from "../components/ui/Button";

const LoginOTP = () => {
  const otp_length = 6;
  const [ttl, setTtl] = useState<number>(30);
  const { email } = useParams<{ email: string }>();
  const [value, setValue] = useState(new Array(otp_length).fill(""));
  const isOtpComplete = value.every((digit) => digit !== "");
  const navigate = useNavigate();
  if (!email) {
    return toast.error("Email is required!");
  }
  // use otp hook
  const { VerifyOTP, ReSendOTP, isResending, isVerifying } = useOTP({
    email,
    otp: value,
    setTtl,
  });
  // handleVerifyOTP
  const handleVerifyOTP = () => {
    VerifyOTP("/verify-login-otp");
    navigate("/");
    window.location.reload();
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
      <form
        onSubmit={() => handleVerifyOTP()}
        className="text-center border border-[#c4c4c4] p-2 sm:p-4 rounded-[5px] w-full max-w-[600px]"
      >
        <div className="mb-16">
          <h2 className="text-[15px] md:text-3xl font-bold">Verify Login</h2>
          <p className="text-[14px] md:text-[16px]">
            Please enter the verification OTP we sent to
          </p>
          <p className="text-[14px] text-[#febd2f]">{email}</p>
        </div>
        <OTPInputBox otpvalue={value} setValue={setValue} />
        <Button
          className="w-full sm:w-[400px] my-2 h-full sm:py-2.5"
          variant="primary"
          isLoading={isVerifying}
          disabled={!isOtpComplete}
          type="submit"
        >
          <span className="ml-2 text-sm">
            {isVerifying ? "Verifying..." : "Verify OTP"}
          </span>
        </Button>
        <OTPTimer
          setTtl={setTtl}
          URI="/resend-otp"
          type="login"
          ReSendOTP={ReSendOTP}
          ttl={ttl}
          isResending={isResending}
        />
      </form>
    </section>
  );
};
export default LoginOTP;
