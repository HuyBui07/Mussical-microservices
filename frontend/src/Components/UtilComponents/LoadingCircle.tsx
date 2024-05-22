import { ClipLoader } from "react-spinners";

const LoadingCircle = ({ color }: { color?: string }) => {
  return (
    <div className="flex justify-center items-center m-auto mt-10 mb-10">
      <ClipLoader color={color ? color : "black"} size={100} />
    </div>
  );
};

export default LoadingCircle;
