import { Triangle } from "react-loader-spinner";
import Lottie from "lottie-react";
import loading from "@/assets/loading.json"
const Loader = () => {
  return (
    // <Lottie animationData={loading} className="w-72"/>
    <Triangle
      height="80"
      width="80"
      color="rgb(29,78,216)"
      ariaLabel="triangle-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};


export default Loader;
