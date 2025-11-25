import { Link } from "react-router-dom";
import { ICardProps } from "../../utils/Types/Product.types";
import { Button } from "../ui/Button";
const Card = ({
  title,
  subtitle,
  description,
  btnText,
  style,
  image,
  icon,
  to,
}: ICardProps) => {
  return (
    <>
      <div className={`${style} card p-4 rounded-xl relative overflow-hidden`}>
        {/* bg image  */}
        <div
          style={{
            backgroundImage: `linear-gradient(to right, #173334, transparent),url('${image}')`,
          }}
          className="bg_image absolute w-full h-full left-0 top-0 -z-0"
        />
        <div className="relative z-10 flex flex-col justify-between h-full">
          <div>
            <p
              className={`${
                !subtitle && "hidden"
              } bg-white p-[4px] w-[150px] text-[12px] rounded-full text-center`}
            >
              {subtitle}
            </p>
            <h1
              className="text-2xl py-2.5 text-[#febd2f] font-bold capitalize"
              style={{ letterSpacing: "2px" }}
            >
              {`${title?.slice(0, 22)}...`}
            </h1>
            <p
              className="text-[14px] text-white"
              style={{ letterSpacing: "1px" }}
            >
              {`${description.slice(0, 80)}...`}
            </p>
          </div>
          <Link to={to || ""}>
            <Button
              type="button"
              className="mt-2 focus:ring-[#ffe3a8] w-[180px]"
              size="md"
              variant="glass"
            >
              {icon}
              <span className=" text-sm">{btnText}</span>
              <i className="fas fa-chevron-right"></i>
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};
export default Card;
