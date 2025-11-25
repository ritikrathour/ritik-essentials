import React, { memo, useEffect } from "react";
import { formatTime } from "../utils/constant";
import { IOTPTimerProps } from "../utils/Types/Otp.types";

const OTPTimer: React.FC<IOTPTimerProps> = memo(
  ({ ReSendOTP, ttl, setTtl, isResending, URI, type }) => {
    // timer count down for otp
    useEffect(() => {
      if (ttl <= 0) return;

      const id = setInterval(() => {
        setTtl((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      return () => clearInterval(id);
    }, [ttl, setTtl]);

    return (
      <>
        {ttl !== 0 && (
          <p className="text-[14px]">OTP expires in {formatTime(ttl)}</p>
        )}
        <p className="text-[14px] mt-2">
          Didn't receive the OTP?{" "}
          <button
            onClick={() => ReSendOTP(URI, type)}
            type="button"
            disabled={ttl !== 0 || isResending}
            className="text-[#febd2f] font-[600] disabled:cursor-not-allowed hover:underline cursor-pointer text-[12px] md:text-[14px]"
          >
            {isResending ? "Sending..." : "Resend OTP"}
          </button>
        </p>
      </>
    );
  }
);
export default OTPTimer;
