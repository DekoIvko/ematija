import { useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BiShow, BiHide } from "react-icons/bi";
import { imageToBase64 } from "../../../utils/helpers";
import { Link } from "react-router-dom";
import { EHeaderNavItems } from "../../../enums/EHeaderNavItems";
import { useMutation } from "@tanstack/react-query";
import { RegisterUserService } from "../../../services/UsersService";
import { toast } from "react-hot-toast";
import { useErrorBoundary } from "react-error-boundary";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  image: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
  password: string;
};

const SignUpPage = () => {
  const { showBoundary } = useErrorBoundary();
  const [showPassword, setShowPassword] = useState(false);
  const [onSuccess, setOnSuccess] = useState<string>("");
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Inputs>();

  const registerUser = useMutation({
    mutationFn: RegisterUserService,
    onSuccess: (result: any) => {
      if (result?.status === 200) {
        setOnSuccess(result?.message);
        toast.success(result?.message);
      } else {
        toast.error(result?.message);
      }
    },
    onError(error: any) {
      showBoundary(error);
    },
  });

  const handleShowPassword = () => {
    setShowPassword((prevObj) => !prevObj);
  };

  const onSubmitBtn: SubmitHandler<Inputs> = async (data) => {
    try {
      console.log(data);
      await registerUser.mutateAsync(data);
    } catch (err: any) {
      showBoundary(err);
    }
  };

  console.log(getValues("image"));

  return (
    <div className="p-2 md:p-4">
      <div className="bg-gray-400 rounded w-full max-w-md flex flex-col p-4 shadow-xl mt-4 m-auto">
        {onSuccess ? (
          <div className="">
            <h2>Success!</h2>
            <p>Go to Login page</p>
            <Link
              className="text-red-600 underline hover:text-blue-400"
              to={EHeaderNavItems.login}
            >
              LogIn
            </Link>{" "}
          </div>
        ) : (
          <>
            <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative">
              {getValues("image") ? (
                <img
                  src={getValues("image")}
                  alt="profile"
                  className="w-full h-full"
                />
              ) : (
                <AiOutlineUserAdd className="text-6xl ml-2 pb-2" />
              )}
              <label htmlFor="profile-image">
                <div className="absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer">
                  <p className="text-sm text-white">Upload</p>
                </div>
                <input
                  type="file"
                  {...register("image", {
                    required: "Image is required",
                    onChange: async (e) => {
                      // custom function for upload image
                      const data = await imageToBase64(e.target.files[0]);
                      console.log(data);
                      return data;
                    },
                  })}
                  id="profile-image"
                  className="hidden"
                />
              </label>
              {errors.image && (
                <span className="text-red-600">{errors.image.message}</span>
              )}
            </div>
            <form
              onSubmit={handleSubmit(onSubmitBtn)}
              className="w-full flex flex-col"
            >
              <div className="card p-4">
                <div className="card-body flex flex-col gap-3">
                  <div className="flex flex-col">
                    <label htmlFor="username">Username</label>
                    <input
                      className="mt-1 mb-2 w-full bg-slate-200 p-1 px-2 py-1 rounded focus-within:outline-blue-400"
                      {...register("username", {
                        required: "Username is required",
                      })}
                      type="text"
                      name="username"
                      id="username"
                      placeholder="Please enter Username"
                    />
                    {errors.username && (
                      <span className="text-red-600">
                        {errors.username.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input
                      className="mt-1 mb-2 w-full bg-slate-200 p-1 px-2 py-1 rounded focus-within:outline-blue-400"
                      {...register("email", {
                        required: "Email is required",
                      })}
                      type="text"
                      name="email"
                      id="email"
                      placeholder="Please enter your email"
                    />
                    {errors.email && (
                      <span className="text-red-600">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      className="mt-1 mb-2 w-full bg-slate-200 p-1 px-2 py-1 rounded focus-within:outline-blue-400"
                      {...register("firstName", {
                        required: "First Name is required",
                      })}
                      type="text"
                      name="firstName"
                      id="firstName"
                      required
                      placeholder="Please enter your First Name"
                    />
                    {errors.firstName && (
                      <span className="text-red-600">
                        {errors.firstName.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      className="mt-1 mb-2 w-full bg-slate-200 p-1 px-2 py-1 rounded focus-within:outline-blue-400"
                      {...register("lastName", {
                        required: "Last Name is required",
                      })}
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder="Please enter your Last Name"
                    />
                    {errors.lastName && (
                      <span className="text-red-600">
                        {errors.lastName.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="birthDate">Birth Date</label>
                    <input
                      className="mt-1 mb-2 w-full bg-slate-200 p-1 px-2 py-1 rounded focus-within:outline-blue-400"
                      {...register("birthDate", {
                        required: "Birth Date is required",
                      })}
                      type="date"
                      name="birthDate"
                      id="birthDate"
                      placeholder="Please enter your Birth Date"
                    />
                    {errors.birthDate && (
                      <span className="text-red-600">
                        {errors.birthDate.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="gender">Gender</label>
                    <select
                      id="gender"
                      // name="gender"
                      value={getValues("gender")}
                      className="bg-slate-200 p-1 my-1 px-2 py-1 rounded focus-within:outline-blue-400"
                      {...register("gender", {
                        required: "Gender is required",
                      })}
                    >
                      <option defaultChecked value="">
                        Please select
                      </option>
                      <option value="male">Male</option>
                      <option value="Female">Female</option>
                      <option value="else">Else</option>
                    </select>
                    {errors.gender && (
                      <span className="text-red-600">
                        {errors.gender.message}
                      </span>
                    )}
                  </div>
                  <div className=" flex flex-col">
                    <label htmlFor="password">Password</label>
                    <div className="flex p-1 px-2 py-1 rounded mt-1 mb-2 bg-slate-200 focus-within:outline focus-within:outline-blue-300">
                      <input
                        className="bg-slate-200 w-full outline-none"
                        {...register("password", {
                          required: "Password is required",
                        })}
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        autoComplete="off"
                        required
                        placeholder="Please enter your password"
                      />
                      {errors.password && (
                        <span className="text-red-600">
                          {errors.password.message}
                        </span>
                      )}
                      <span
                        className="flex text-xl cursor-pointer"
                        onClick={handleShowPassword}
                      >
                        {showPassword ? <BiShow /> : <BiHide />}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3 justify-center">
                    <button
                      className="bg-red-500 hover:bg-red-800 text-white text-center py-2 px-6 rounded font-bold"
                      type="submit"
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <p className="text-left text-sm mt-3">
              Already have account ?{" "}
              <Link
                className="text-red-600 underline hover:text-red-800"
                to={EHeaderNavItems.login}
              >
                LogIn
              </Link>{" "}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;
