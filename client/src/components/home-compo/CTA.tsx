const CTA = () => {
  return (
    <>
      <ul className="grid grid-cols-2 md:grid-cols-4 justify-center gap-y-5 my-8 lg:w-[80%] m-auto">
        <li className="flex items-center gap-1 justify-center md:gap-4 lg:border-r border-gray-600">
          <div className="w-[35px] h-[35px] rounded-full bg-amber-100 text-center leading-[35px]">
            <i className="fas fa-bus text-[16px] sm:text-xl text-[#febd2f]"></i>
          </div>
          <div>
            <h4 className="text-[14px] md:text-[18px] lg:text-[20px] font-semibold">
              Free Delivery
            </h4>
            <p className="capitalize text-[12px]">To your Door</p>
          </div>
        </li>
        <li className="flex items-center gap-1 justify-center md:gap-4  lg:border-r border-gray-600">
          <div className="w-[35px] h-[35px] rounded-full bg-green-100 text-center leading-[35px]">
            <i className="fas fa-lock text-[16px] sm:text-xl text-green-400"></i>
          </div>
          <div>
            <h4 className="text-[14px] md:text-[18px] lg:text-[20px] font-semibold">
              Secure Payment
            </h4>
            <p className="capitalize text-[12px]">100% Secure Checkout</p>
          </div>
        </li>
        <li className="flex items-center gap-1 justify-center md:gap-4 lg:border-r border-gray-600">
          <div className="w-[35px] h-[35px] rounded-full bg-purple-100 text-center leading-[35px]">
            <i className="fas fa-home text-[16px] sm:text-xl text-purple-500"></i>
          </div>
          <div>
            <h4 className="text-[14px] md:text-[18px] lg:text-[20px] font-semibold">
              Available
            </h4>
            <p className="capitalize text-[12px]">Online Support</p>
          </div>
        </li>
        <li className="flex items-center gap-1 justify-center md:gap-4">
          <div className="w-[35px] h-[35px] rounded-full bg-red-100 text-center leading-[35px]">
            <i className="fas fa-phone text-[16px] sm:text-xl text-red-500"></i>
          </div>
          <div>
            <h4 className="text-[14px] md:text-[18px] lg:text-[20px] font-semibold">
              Best Price
            </h4>
            <p className="capitalize text-[12px]">Competative Pricing</p>
          </div>
        </li>
      </ul>
    </>
  );
};

export default CTA;
