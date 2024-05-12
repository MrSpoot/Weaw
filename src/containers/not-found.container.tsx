import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const NotFoundContainer: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/auth/login");
  }, []);

  return <div>Not Found</div>;
};

export default NotFoundContainer;
