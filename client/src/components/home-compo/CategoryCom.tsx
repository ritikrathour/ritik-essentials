import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ICategory } from "../../utils/Types/Product.types";

const CategoryCom: React.FC<any> = ({ icon, title, children }) => {
  const [isEnter, setIsEnter] = useState<boolean>(false);
  const handleMouseEnter = () => {
    setIsEnter(true);
  };
  const handleMouseLeave = () => {
    setIsEnter(false);
  };
  return (
    <>
      <li
        onMouseLeave={() => handleMouseLeave()}
        onMouseEnter={() => handleMouseEnter()}
        className="item flex justify-between item-center h-[35px] cursor-pointer hover:bg-[#febd2f] px-[4px] rounded transition-all"
      >
        <div className="flex items-center gap-3 ">
          <div className="w-[20px] h-[20px] text-center leading-[20px]">
            <i className={`fas ${icon} text-[14px]`} />
          </div>
          <span className="text-[14px] capitalize">{title}</span>
        </div>
        <div className="leading-[35px]">
          <i className="fas fa-chevron-right" />
        </div>
        {/* children  */}

        {isEnter && children && children.length > 0 && (
          <ul
            className={`child w-[200px] rounded-xl absolute z-50 bg-white text-[#173334] p-4 transition-all flex flex-col gap-1.5 ${
              isEnter ? "translate-x-[280px]" : "translate-x-[320px]"
            }`}
          >
            {children?.map((item: any) => {
              return (
                <Link to={""} key={item.id}>
                  <li className="text-[14px] hover:text-[#febd2f] capitalize relative z-50">
                    {item?.title}
                  </li>
                </Link>
              );
            })}
          </ul>
        )}
      </li>
    </>
  );
};
export default CategoryCom;
