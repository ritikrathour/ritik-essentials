import { Link } from "react-router-dom";

const SocialLink = ({ to, icon }: { to: string; icon: any }) => {
  return (
    <>
      <Link
        to={to}
        className="bg-[#febd2f] w-[30px] h-[30px] hover:translate-y-[-10px] transition-all duration-300 rounded-[5px] text-[14px] flex justify-center items-center"
      >
        {icon}
      </Link>
    </>
  );
};
export default SocialLink;
