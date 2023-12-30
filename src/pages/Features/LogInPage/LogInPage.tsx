import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BiShow, BiHide } from "react-icons/bi";
import { Link } from "react-router-dom";
import { EHeaderNavItems } from "../../../enums/EHeaderNavItems";
import { useErrorBoundary } from "react-error-boundary";
import { useMutation } from "@tanstack/react-query";
import { LoginUserService } from "../../../services/UsersService";
import { toast } from "react-hot-toast";
import { useUserAuthContext } from "../../../context/UserAuthContext";
import Cookies from "universal-cookie";

const LogInPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";
  const userAuth = useUserAuthContext();
  const { showBoundary } = useErrorBoundary();
  const cookies = new Cookies(null, { path: "/" });
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  // const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
  // const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const [errorMsg, setErrorMsg] = useState({
    emailError: false,
    passwordError: false,
  });

  const handleShowPassword = () => {
    setShowPassword((prevObj) => !prevObj);
  };

  const loginUser = useMutation({
    mutationFn: LoginUserService,
    onSuccess: async (result: any) => {
      console.log(result);
      if (result && result?.status === 200) {
        await userAuth.setUser(result?.data);
        cookies.set("token", result?.data.accessToken);
        localStorage.setItem("ematija-user", JSON.stringify(result?.data)); // add user in local storage
        toast.success(result?.message);
        navigate(from, { replace: true }); // if redirect to login page go back to previous page
      } else {
        toast.error(result?.data?.message);
      }
    },
    onError(error: any) {
      console.log(error);
      toast.error(error?.data);
    },
  });

  const loginDummyUser = async () => {
    // sign in with dummy user
    try {
      const authUser = {
        firstName: "",
        lastName: "",
        image: "",
        username: "atuny0",
        password: "9uQFF1Lh",
      };
      await userAuth.setUser(authUser);
      localStorage.setItem("ematija-user", JSON.stringify(authUser));
      navigate("/home");
    } catch (error: any) {
      console.log(error);
      toast.error(`${error?.data}`);
    }
  };

  const onSubmitBtn = async (e: any) => {
    // on login button
    e.preventDefault();
    try {
      if (validate()) {
        const authUser = {
          email: emailRef.current?.value,
          password: passwordRef.current?.value,
        };
        await loginUser.mutateAsync(authUser);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(`${error?.data}`);
    }
  };

  const validate = () => {
    // validation on inputs
    let result = true;
    if (
      emailRef.current?.value.length === 0 ||
      emailRef.current?.value === null
    ) {
      setErrorMsg((prevObj) => ({
        ...prevObj,
        usernameError: true,
      }));
      result = false;
    }

    if (
      passwordRef.current?.value.length === 0 ||
      passwordRef.current?.value === null
    ) {
      setErrorMsg((prevObj) => ({
        ...prevObj,
        passwordError: true,
      }));
      result = false;
    }
    return result;
  };

  return (
    <div className="p-2 md:p-4">
      <div className="bg-gray-400 rounded w-full max-w-md flex flex-col p-4 shadow-xl mt-4 m-auto">
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative">
          <AiOutlineUserAdd className="text-6xl ml-2 pb-2" />
        </div>
        <form onSubmit={onSubmitBtn} className="w-full flex flex-col">
          <div className="p-4">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col">
                <label htmlFor="email">Email</label>
                <input
                  ref={emailRef}
                  className="mt-1 mb-2 w-full bg-slate-200 p-1 px-2 py-1 rounded focus-within:outline-blue-400"
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Please enter your Email"
                />
                {errorMsg?.emailError && (
                  <div style={{ color: "red" }}>Please enter your Email</div>
                )}
              </div>
              <div className=" flex flex-col">
                <label htmlFor="password">Password</label>
                <div className="flex p-1 px-2 py-1 rounded mt-1 mb-2 bg-slate-200 focus-within:outline focus-within:outline-blue-300">
                  <input
                    ref={passwordRef}
                    className="bg-slate-200 w-full outline-none"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Please enter your password"
                  />
                  <span
                    className="flex text-xl cursor-pointer"
                    onClick={handleShowPassword}
                  >
                    {showPassword ? <BiShow /> : <BiHide />}
                  </span>
                </div>
                {errorMsg?.emailError && (
                  <div style={{ color: "red" }}>Please enter your password</div>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  className="bg-red-500 hover:bg-red-800 text-white text-center p-2 rounded font-bold"
                  type="submit"
                >
                  Login
                </button>
                <button
                  className="bg-red-500 hover:bg-red-800 text-white p-2 rounded font-bold"
                  type="button"
                  onClick={loginDummyUser}
                >
                  Log with dummy user
                </button>
              </div>
            </div>
          </div>
        </form>
        <p className="text-left text-sm mt-3">
          Don't have account ?{" "}
          <Link
            className="text-red-600 underline hover:text-red-800"
            to={EHeaderNavItems.signup}
          >
            SignUp
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default LogInPage;
