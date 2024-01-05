import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const FormSkeletonLoader = () => {
  return (
    <div className="w-full h-full flex flex-col gap-2">
      <Skeleton className="h-8" />
      <div className="flex justify-between">
        <Skeleton className="w-72 h-8" />
        <Skeleton className="w-72 h-8" />
      </div>
      <div className="flex justify-between">
        <Skeleton className="w-72 h-8" />
        <Skeleton className="w-72 h-8" />
      </div>
      <Skeleton className="h-24" />
    </div>
  );
};

export default FormSkeletonLoader;
