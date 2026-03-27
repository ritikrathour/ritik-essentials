import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Send } from "lucide-react";
import { AxiosInstense } from "../services/AxiosInstance";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../components/ui/Button";
import { useSelector } from "react-redux";
import { RootState } from "../redux-store/Store";
import axios from "axios";
const VerifyEmail = () => {
  const navigate = useNavigate();
  const verifyTokenURI = useSelector((state: RootState) => state.user.token);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const verifyEmail = async () => {
    setIsVerifying(true);
    try {
      const { data } = await AxiosInstense.get(
        `/verify-email/?token=${verifyTokenURI!}`,
        { withCredentials: true },
      );
      toast.success(
        data.response?.data?.message || "Email verified successfully!",
      );
      sessionStorage.removeItem("register_message");
      setIsVerifying(false);
      navigate("/"); // redirect to home
      window.location.reload();
    } catch (error: any) {
      console.log(error);
      toast.error(
        axios.isAxiosError(error)
          ? error?.response?.data?.message || error?.response?.data?.error
          : "Invalid or expired verification link.",
      );
      setIsVerifying(false);
      navigate("/");
    }
  };
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-2">
      <div className="bg-white/40 backdrop-blur-lg rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-4 items-center">
          <div className="w-16 h-16 bg-[#febd2f]  text-white flex items-center justify-center rounded-full text-3xl font-bold shadow-md">
            <Send size={30} />
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Verify Your Email
        </h1>

        <p className="text-gray-600 text-sm mb-6">
          We’ve sent a verification link to your registered email. Please click
          the link to verify your account.
        </p>

        <div className="flex flex-col gap-3">
          <Button
            type="button"
            isLoading={isVerifying}
            onClick={() => verifyEmail()}
          >
            {isVerifying ? "Verifying..." : "Please Click here to Verify."}
          </Button>
          <p className="text-[14px] mt-2">
            Back to home?{" "}
            <Link
              to="/"
              className="text-[#febd2f]  font-[600] hover:underline text-[14px] cursor-pointer"
            >
              Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
