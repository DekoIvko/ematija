import { useRef, useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BiShow, BiHide } from "react-icons/bi";
import { imageToBase64 } from "../../../utils/helpers";
import { Link } from "react-router-dom";
import { EHeaderNavItems } from "../../../enums/EHeaderNavItems";
import { useMutation } from "@tanstack/react-query";
import { RegisterUserService } from "../../../services/UsersService";
import { toast } from "react-hot-toast";
import { useErrorBoundary } from "react-error-boundary";

const SignUpPage = () => {
  const { showBoundary } = useErrorBoundary();
  const [showPassword, setShowPassword] = useState(false);
  const [image, setImage] = useState<any>("");
  const [onSuccess, setOnSuccess] = useState<string>("");

  const emailRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);

  //   const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
  //   const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const [errorMsg, setErrorMsg] = useState({
    emailError: false,
    firstNameError: false,
    lastNameError: false,
    passwordError: false,
  });

  const registerUser = useMutation({
    mutationFn: RegisterUserService,
    onSuccess: (result, variables) => {
      if (result?.status === 200) {
        setOnSuccess(result?.message);
      }
      toast(result?.message);
    },
    onError(error, context) {
      showBoundary(error);
    },
  });

  const handleShowPassword = () => {
    setShowPassword((prevObj) => !prevObj);
  };

  const handleUploadProfileImage = async (e: any) => {
    const data = await imageToBase64(e.target.files[0]);
    setImage(data);
  };

  const onSubmitBtn = async (e: any) => {
    e.preventDefault();
    try {
      if (validate()) {
        const authUser = {
          email: emailRef.current?.value,
          firstName: firstNameRef.current?.value,
          lastName: lastNameRef.current?.value,
          password: passwordRef.current?.value,
          image,
        };
        await registerUser.mutateAsync(authUser);
      }
    } catch (err: any) {
      // showBoundary(err);
    }
  };

  const validate = () => {
    let result = true;
    if (
      emailRef.current?.value.length === 0 ||
      emailRef.current?.value === null
    ) {
      setErrorMsg((prevObj) => ({
        ...prevObj,
        emailError: true,
      }));
      result = false;
    }
    if (
      firstNameRef.current?.value.length === 0 ||
      firstNameRef.current?.value === null
    ) {
      setErrorMsg((prevObj) => ({
        ...prevObj,
        firstNameError: true,
      }));
      result = false;
    }
    if (
      lastNameRef.current?.value.length === 0 ||
      lastNameRef.current?.value === null
    ) {
      setErrorMsg((prevObj) => ({
        ...prevObj,
        lastNameError: true,
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
      <div className="w-full max-w-md bg-white-900 flex flex-col p-4 shadow-xl mt-4 m-auto">
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
              {image ? (
                <img src={image} alt="profile" className="w-full h-full" />
              ) : (
                <AiOutlineUserAdd className="text-6xl ml-2 pb-2" />
              )}
              <label htmlFor="profile-image">
                <div className="absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer">
                  <p className="text-sm text-white">Upload</p>
                </div>
                <input
                  type="file"
                  id="profile-image"
                  className="hidden"
                  onChange={handleUploadProfileImage}
                />
              </label>
            </div>
            <form onSubmit={onSubmitBtn} className="w-full flex flex-col">
              <div className="card p-4">
                <div className="card-body flex flex-col gap-3">
                  <div className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input
                      ref={emailRef}
                      className="mt-1 mb-2 w-full bg-slate-200 p-1 px-2 py-1 rounded focus-within:outline-blue-400"
                      type="text"
                      name="email"
                      id="email"
                      autoComplete="off"
                      required
                      placeholder="Please enter your email"
                    />
                    {errorMsg?.emailError && (
                      <div style={{ color: "red" }}>
                        Please enter your Email
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      ref={firstNameRef}
                      className="mt-1 mb-2 w-full bg-slate-200 p-1 px-2 py-1 rounded focus-within:outline-blue-400"
                      type="text"
                      name="firstName"
                      id="firstName"
                      required
                      placeholder="Please enter your First Name"
                    />
                    {errorMsg?.firstNameError && (
                      <div style={{ color: "red" }}>
                        Please enter your First Name
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      ref={lastNameRef}
                      className="mt-1 mb-2 w-full bg-slate-200 p-1 px-2 py-1 rounded focus-within:outline-blue-400"
                      type="text"
                      name="lastName"
                      id="lastName"
                      required
                      placeholder="Please enter your Last Name"
                    />
                    {errorMsg?.lastNameError && (
                      <div style={{ color: "red" }}>
                        Please enter your Last name
                      </div>
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
                        autoComplete="off"
                        required
                        placeholder="Please enter your password"
                      />
                      <span
                        className="flex text-xl cursor-pointer"
                        onClick={handleShowPassword}
                      >
                        {showPassword ? <BiShow /> : <BiHide />}
                      </span>
                    </div>
                    {errorMsg.passwordError && (
                      <div style={{ color: "red" }}>
                        Please enter your password
                      </div>
                    )}
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
