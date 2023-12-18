import { SetStateAction, useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BiShow, BiHide } from "react-icons/bi";
import { imageToBase64 } from "../../../utils/helpers";
import { Link } from "react-router-dom";
import { EHeaderNavItems } from "../../../enums/EHeaderNavItems";
import { useMutation } from "@tanstack/react-query";
import { RegisterUserService } from "../../../services/UsersService";
import { toast } from "react-hot-toast";
import { useErrorBoundary } from "react-error-boundary";
import { IUser } from "../../../interfaces/IUser";

const SignUpPage = () => {
  const { showBoundary } = useErrorBoundary();
  const [showPassword, setShowPassword] = useState(false);
  const [onSuccess, setOnSuccess] = useState<string>("");
  const [newUser, setNewUser] = useState<IUser>();
  //   const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
  //   const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const [errorMsg, setErrorMsg] = useState({
    usernameError: false,
    emailError: false,
    firstNameError: false,
    lastNameError: false,
    birthDateError: false,
    genderError: false,
    passwordError: false,
  });

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

  const handleUploadProfileImage = async (e: any) => {
    const data = await imageToBase64(e.target.files[0]);
    console.log(data);
    setNewUser((prev: any) => {
      return {
        ...prev,
        image: data,
      };
    });
  };

  const handleInputs = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewUser((prev: any) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const onSubmitBtn = async (e: any) => {
    e.preventDefault();
    try {
      if (validate()) {
        await registerUser.mutateAsync(newUser);
      }
    } catch (err: any) {
      showBoundary(err);
    }
  };

  const validate = () => {
    let result = true;
    if (newUser?.username.length === 0 || newUser?.username === null) {
      setErrorMsg((prevObj) => ({
        ...prevObj,
        usernameError: true,
      }));
      result = false;
    }
    if (newUser?.email.length === 0 || newUser?.email === null) {
      setErrorMsg((prevObj) => ({
        ...prevObj,
        emailError: true,
      }));
      result = false;
    }
    if (newUser?.firstName.length === 0 || newUser?.firstName === null) {
      setErrorMsg((prevObj) => ({
        ...prevObj,
        firstNameError: true,
      }));
      result = false;
    }
    if (newUser?.lastName.length === 0 || newUser?.lastName === null) {
      setErrorMsg((prevObj) => ({
        ...prevObj,
        lastNameError: true,
      }));
      result = false;
    }
    if (newUser?.birthDate.length === 0 || newUser?.birthDate === null) {
      setErrorMsg((prevObj) => ({
        ...prevObj,
        birthDateError: true,
      }));
      result = false;
    }
    if (newUser?.gender.length === 0 || newUser?.gender === null) {
      setErrorMsg((prevObj) => ({
        ...prevObj,
        genderError: true,
      }));
      result = false;
    }

    if (newUser?.password.length === 0 || newUser?.password === null) {
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
              {newUser?.image ? (
                <img
                  src={newUser?.image}
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
                    <label htmlFor="username">Username</label>
                    <input
                      className="mt-1 mb-2 w-full bg-slate-200 p-1 px-2 py-1 rounded focus-within:outline-blue-400"
                      type="text"
                      name="username"
                      id="username"
                      autoComplete="off"
                      required
                      placeholder="Please enter Username"
                      onChange={handleInputs}
                    />
                    {errorMsg?.usernameError && (
                      <div style={{ color: "red" }}>Please enter Username</div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input
                      className="mt-1 mb-2 w-full bg-slate-200 p-1 px-2 py-1 rounded focus-within:outline-blue-400"
                      type="text"
                      name="email"
                      id="email"
                      autoComplete="off"
                      required
                      placeholder="Please enter your email"
                      onChange={handleInputs}
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
                      className="mt-1 mb-2 w-full bg-slate-200 p-1 px-2 py-1 rounded focus-within:outline-blue-400"
                      type="text"
                      name="firstName"
                      id="firstName"
                      required
                      placeholder="Please enter your First Name"
                      onChange={handleInputs}
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
                      className="mt-1 mb-2 w-full bg-slate-200 p-1 px-2 py-1 rounded focus-within:outline-blue-400"
                      type="text"
                      name="lastName"
                      id="lastName"
                      required
                      placeholder="Please enter your Last Name"
                      onChange={handleInputs}
                    />
                    {errorMsg?.lastNameError && (
                      <div style={{ color: "red" }}>
                        Please enter your Last name
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="birthDate">Birth Date</label>
                    <input
                      className="mt-1 mb-2 w-full bg-slate-200 p-1 px-2 py-1 rounded focus-within:outline-blue-400"
                      type="date"
                      name="birthDate"
                      id="birthDate"
                      required
                      placeholder="Please enter your Birth Date"
                      onChange={handleInputs}
                    />
                    {errorMsg?.birthDateError && (
                      <div style={{ color: "red" }}>
                        Please enter your Birth Date
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="gender">Gender</label>
                    <select
                      id="gender"
                      name="gender"
                      onChange={handleInputs}
                      value={newUser?.gender}
                      className="bg-slate-200 p-1 my-1 p-1 px-2 py-1 rounded focus-within:outline-blue-400"
                    >
                      <option defaultChecked value="">
                        Please select
                      </option>
                      <option value="male">Male</option>
                      <option value="Female">Female</option>
                      <option value="else">Else</option>
                    </select>
                    {errorMsg?.genderError && (
                      <div style={{ color: "red" }}>
                        Please enter your Gender
                      </div>
                    )}
                  </div>
                  <div className=" flex flex-col">
                    <label htmlFor="password">Password</label>
                    <div className="flex p-1 px-2 py-1 rounded mt-1 mb-2 bg-slate-200 focus-within:outline focus-within:outline-blue-300">
                      <input
                        className="bg-slate-200 w-full outline-none"
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        autoComplete="off"
                        required
                        placeholder="Please enter your password"
                        onChange={handleInputs}
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
