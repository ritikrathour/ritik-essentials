import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const CreateProductBtn = () => {
  return (
    <Link to="create-product">
      <button className="lg:hidden fixed right-2 bottom-2 w-10 h-10 bg-orange-500 hover:bg-orange-600 text-white  rounded-full z-40 flex items-center justify-center">
        <Plus className="w-5 h-5" />
      </button>
    </Link>
  );
};
export default CreateProductBtn;
