import { useEffect } from "react";
import { useLocation } from "react-router";
import useLoading from "../../useLoading/useLoading/useLoading";

const RouteChangeListener = () => {
  const location = useLocation();
  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => setLoading(false), 300);

    return () => clearTimeout(timer);
  }, [location.pathname, setLoading]);

  return null;
};

export default RouteChangeListener;
