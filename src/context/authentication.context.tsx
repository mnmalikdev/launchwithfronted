import useUpdateProfile from "@/hooks/useUpdateProfile";
import axios from "axios";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext({
  isLoading: true,
  isAuthenticated: false,
  email: "",
  userName: "",
  userId: "",
  role: "",
  error: null,
  handleLogin: (formdata: any) => {},
  handleLogout: () => {},
  updateAuthStateInContext: (newState: any) => {},
});

function AuthContextProvider({ children }: any) {
  const { fetchCurrentUserProfile } = useUpdateProfile();
  const redirect = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (formData: any) => {
    console.log("form data", formData);
    setError(null);
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/signin`,
        formData
      );
      console.log(response);
      if (response?.data?.tokens?.access_token) {
        window.localStorage.setItem(
          "access_token",
          response?.data?.tokens?.access_token
        );
        window.localStorage.setItem(
          "refresh_token",
          response?.data?.tokens?.refresh_token
        );
        window.localStorage.setItem(
          "user",
          JSON.stringify(response?.data?.user)
        );
        const userDetails = window.localStorage.getItem("user");
        if (userDetails) {
          const details = JSON.parse(userDetails);
          console.log("tokens", response?.data?.tokens);
          console.log("userdetails", userDetails);
          console.log("user detais", details);
          setUserId(details.userId);
          setUserName(details.userName);
          setEmail(details.email);
          setRole(details.role);
          setIsAuthenticated(true);
          setIsLoading(false);
          redirect.push("/profile/dashboard");
        }
        console.log("USER DETAILS ", userDetails);
      }
    } catch (error: any) {
      setError(error?.response?.data?.message);
      toast(error?.response?.data?.message);
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setUserId("");
    setUserName("");
    setEmail("");
    setRole("");
    window.localStorage.clear();
    setIsAuthenticated(false);
    redirect.push("/auth/signin");
  };

  useEffect(() => {
    fetchCurrentUserProfile().then((res) => {
      console.log("res==>contenxt-->", res);
      if (res) {
        setEmail(res?.email);
        setRole(res?.role);
        setUserId(res?.userId);
        setUserName(res.userName);
      }
    });
  }, []);

  const updateAuthStateInContext = (newState: any) => {
    // Update the state with the new values
    setUserId(newState.userId);
    setUserName(newState.userName);
    setEmail(newState.email);
    setRole(newState.role);
    setIsAuthenticated(newState.isAuthenticated);
    setIsLoading(newState.isLoading);
    setError(newState.error);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isAuthenticated,
        userId,
        email,
        userName,
        role,
        error,
        updateAuthStateInContext,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContextProvider;
