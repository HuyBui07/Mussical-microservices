import { ClipLoader } from "react-spinners";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
      <ClipLoader color="black" size={100} />
    </div>
  );
};

export default LoadingScreen;
