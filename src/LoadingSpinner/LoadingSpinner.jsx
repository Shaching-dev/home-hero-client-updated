import { ClipLoader, HashLoader } from "react-spinners";

const LoadingSpinner = ({
  loading = true,
  size = 100,
  color = "#3b82f6",
  message = "Loading...",
}) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40">
      <HashLoader
        className="animate-spin"
        size={size}
        loading={loading}
        color={color}
      />
      <span className="text-primary text-lg font-semibold mt-4">{message}</span>
    </div>
  );
};

export default LoadingSpinner;
