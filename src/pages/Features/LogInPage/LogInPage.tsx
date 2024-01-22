import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BiShow, BiHide } from "react-icons/bi";
import { Link } from "react-router-dom";
import { EHeaderNavItems } from "../../../enums/EHeaderNavItems";
import { useMutation } from "@tanstack/react-query";
import { LoginUserService } from "../../../services/UsersService";
import { toast } from "react-hot-toast";
import { useUserAuthContext } from "../../../context/UserAuthContext";
import Cookies from "universal-cookie";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

const LogInPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userAuth = useUserAuthContext();
  const from = location.state?.from?.pathname || "/home";
  const cookies = new Cookies(null, { path: "/" });
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const handleShowPassword = () => {
    setShowPassword((prevObj) => !prevObj);
  };

  const loginUser = useMutation({
    mutationFn: LoginUserService,
    onSuccess: async (result: any) => {
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

  const onSubmitBtn: SubmitHandler<Inputs> = async (data) => {
    try {
      const authUser = {
        email: data.email,
        password: data.password,
      };
      await loginUser.mutateAsync(authUser);
    } catch (error: any) {
      console.log(error);
      toast.error(`${error?.data}`);
    }
  };

  return (
    <div className="p-2 md:p-4">
      <div className="bg-gray-400 rounded w-full max-w-md flex flex-col p-4 shadow-xl mt-4 m-auto">
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative">
          <AiOutlineUserAdd className="text-6xl ml-2 pb-2" />
        </div>
        <form
          onSubmit={handleSubmit(onSubmitBtn)}
          className="w-full flex flex-col"
        >
          <div className="p-4">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col">
                <label htmlFor="email">Email</label>
                <input
                  className="mt-1 mb-2 w-full bg-slate-200 p-1 px-2 py-1 rounded focus-within:outline-blue-400"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Please enter your Email"
                />
                {errors.email && (
                  <span className="text-red-600">{errors.email.message}</span>
                )}
              </div>
              <div className=" flex flex-col">
                <label htmlFor="password">Password</label>
                <div className="flex p-1 px-2 py-1 rounded mt-1 mb-2 bg-slate-200 focus-within:outline focus-within:outline-blue-300">
                  <input
                    className="bg-slate-200 w-full outline-none"
                    {...register("password", {
                      required: "Password is required!",
                      // pattern: {
                      //   value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                      //   message: "Invalid email address",
                      // },
                    })}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Please enter your password"
                  />
                  <span
                    className="flex text-xl cursor-pointer"
                    onClick={handleShowPassword}
                  >
                    {showPassword ? <BiShow /> : <BiHide />}
                  </span>
                </div>
                {errors.password && (
                  <span className="text-red-600">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  className="bg-red-500 hover:bg-red-800 text-white text-center p-2 rounded font-bold"
                  type="submit"
                >
                  Login
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
