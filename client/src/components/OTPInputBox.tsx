import React, { useEffect, useRef } from "react";

const OTPInputBox = ({
  otpvalue,
  setValue,
}: {
  otpvalue: string[];
  setValue: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const otp_input_ref: any = useRef([]);
  // handleChange
  const handleChange = (e: any, i: number) => {
    if (isNaN(e.target.value)) return;
    const newValue = e.target.value.trim();
    setValue((prev) => {
      const newArr = [...prev];
      newArr[i] = newValue.slice(-1);
      return newArr;
    });
    // move the focus forward
    newValue && otp_input_ref.current[i + 1]?.focus();
  };
  // handleKeyDown for backword
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (!(e.target as HTMLInputElement).value && e.key === "Backspace") {
      otp_input_ref.current[index - 1]?.focus();
    }
  };
  // 0th index auto foucs
  useEffect(() => {
    otp_input_ref.current[0]?.focus();
  }, []);

  return (
    <>
      <div className="flex justify-center items-center gap-2 md:gap-4">
        {otpvalue?.map((otp, i) => {
          return (
            <input
              value={otp}
              key={i}
              ref={(val) => (otp_input_ref.current[i] = val)}
              className={`border focus-visible:border-[#febd2f] border-[#173334] w-[35px] h-[35px] rounded-[4px] text-center`}
              type="text"
              maxLength={1}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
            />
          );
        })}
      </div>
    </>
  );
};
export default OTPInputBox;
