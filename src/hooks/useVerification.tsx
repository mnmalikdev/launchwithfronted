import axios from "axios";
import { useEffect, useState } from "react";

const useVerification = (token: string) => {
  // add token as argument
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const API_BASE_URL = "http://localhost:3000/";

  useEffect(() => {
    const verifyUser = async () => {
      try {
        if (token) {
          const response = await axios.get(`${API_BASE_URL}auth/verifyUser?token=${token}`); // use the token value passed as argument
          console.log("RESPONSE ===>", response);
          setIsVerified(true);
        }
      } catch (err: any) {
        console.log("error msg==>", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    verifyUser();
  }, [token]); // add token as dependency of useEffect

  return { isVerified, isLoading, error };
};

export default useVerification;
