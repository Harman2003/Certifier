import { Triangle } from "react-loader-spinner";
import Lottie from "lottie-react";
import loading from "@/assets/loading.json"
const Loader = () => {
  return (
    // <Lottie animationData={loading} className="w-72 bg-green-500"/>
    <Triangle
      height="80"
      width="80"
      color="rgb(34,197,94)"
      ariaLabel="triangle-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};


export default Loader;
