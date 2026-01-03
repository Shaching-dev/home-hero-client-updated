import { useContext } from "react";
import LoadingContext from "../LoadingContext/LoadingContext";

const useLoading = () => useContext(LoadingContext);
export default useLoading;
