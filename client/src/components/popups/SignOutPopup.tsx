import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import { OverlayBackdrop } from "../ui/OverlayBackdrop";
import useOverlayManager from "../../hooks/useOverLay";
import { RootState } from "../../redux-store/Store";
import { closeSignOutPopup } from "../../redux-store/UISlice";
import { Button } from "../ui/Button";
import { AxiosInstense } from "../../services/AxiosInstance";
import toast from "react-hot-toast";
import axios from "axios";
const SignOutPopUp = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSignOutOpen } = useSelector((state: RootState) => state.ui);
  const { closeOnOutsideClick } = useOverlayManager(
    isSignOutOpen,
    closeSignOutPopup
  );
  const closePopup = () => {
    return dispatch(closeSignOutPopup());
  };
  const signOut = async () => {
    try {
      setLoading(true);
      const { data } = await AxiosInstense.post("/logout", {});
      console.log(data);

      setLoading(false);
      toast.success(data?.message);
      navigate("/");
      window.location.reload();
      dispatch(closeSignOutPopup());
    } catch (error) {
      console.log(error);
      toast.error(
        axios.isAxiosError(error)
          ? error?.response?.data?.message || error?.response?.data?.error
          : "Log Out Failed!"
      );
      setLoading(false);
    }
  };
  return (
    <>
      <OverlayBackdrop
        isOpen={isSignOutOpen}
        closeOnClick={closeOnOutsideClick}
        onClose={closePopup}
      >
        <div className="md:w-[40%] m-2 md:h-[40%] w-full h-[250px] rounded-xl bg-white drop-shadow-md flex justify-between p-4 sm:p-5 flex-col gap-4 z-50">
          <div className="absolute top-4 md:top-6 left-4 w-[35px] h-[35px] rounded-full leading-[35px] cursor-pointer bg-[#1e4243] text-center">
            <i className="fas fa-warning leading-[35px] text-[#469bbf]"></i>
          </div>
          <div className="mt-12">
            <h2 className="font-medium text-lg text-red-950">
              Sign Out From Ritik Essentaials.
            </h2>
            <p className="text-sm">
              Are you sure you whould like to sign out of your Ritik Essentaials
              account?
            </p>
          </div>
          <div className="flex items-center gap-2 justify-between ">
            <Button
              onClick={() => dispatch(closeSignOutPopup())}
              type="button"
              variant="secondary"
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="dark"
              onClick={signOut}
              disabled={loading}
              isLoading={loading}
              className="flex-1"
            >
              {loading ? <Loader style="border-2 border-black" /> : "Sign out"}
            </Button>
          </div>
        </div>
      </OverlayBackdrop>
    </>
  );
};
export default SignOutPopUp;
// onClick={() => dispatch(autoScrolling(false))}
