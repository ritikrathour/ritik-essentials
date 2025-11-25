import { Loader2 } from "lucide-react";
import React from "react";
type LoaderProps = {
  style?: string; // Optional string for additional class names
};
const Loader: React.FC<LoaderProps> = ({ style }) => {
  return (
    <>
      <div className={`${style} flex justify-center items-center`}>
        <Loader2 className="animate-spin" />
      </div>
    </>
  );
};
export default Loader;
