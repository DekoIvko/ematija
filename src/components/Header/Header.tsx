import { useState } from "react";
import mkFlag from "../../imgs/MKFlag.png";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { MdModeNight, MdOutlineModeNight } from "react-icons/md";
import { EHeaderNavItems } from "../../enums/EHeaderNavItems";
import useRefreshToken from "../../hooks/useRefreshToken";
import { useUserAuthContext } from "../../context/UserAuthContext";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { changeAppTheme } from "../../store/appSettingsSlice";

const Header = () => {
  const refreshToken = useRefreshToken();
  const location = useLocation();
  const userAuth = useUserAuthContext();
  const [showMenu, setShowMenu] = useState(false);
  const appSettings = useAppSelector((state) => state.appSettings);
  const dispatch = useAppDispatch();

  const onChangeAppTheme = (theme: string) => {
    dispatch(changeAppTheme(theme));
  };

  const handleShowMenu = () => {
    setShowMenu((prevObj) => !prevObj);
  };

  const onLogOut = () => {
    localStorage.removeItem("ematija-user");
    userAuth.setUser(null);
    window.location.reload();
  };

  const refresh = () => {
    refreshToken();
  };

  return (
    <header
      className={`fixed w-full h-16 z-50 ${
        appSettings.appTheme === "dark"
          ? "text-slate-200 bg-gray-800"
          : "text-slate-800 bg-gray-200"
      }`}
    >
      <div className="flex items-center h-full">
        <div className="header-context">
          <div className="company-logo p-1 w-16 h-16">
            <a href="/home" className="">
              <img src={mkFlag} alt="Macedonian flag" className="w-full" />
            </a>
          </div>
        </div>
        <nav className="w-full h-full">
          <ul className="flex justify-center items-center gap-10 h-full">
            <li
              className={`flex items-center ${
                location.pathname === "/home"
                  ? "border-slate-200 border-b-[3px]"
                  : ""
              } h-full`}
            >
              <NavLink to={EHeaderNavItems.home} className={``}>
                <div className="flex gap-2 justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    fill="currentColor"
                    className="bi bi-house"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z" />
                  </svg>
                  <span>Home</span>
                </div>
              </NavLink>
            </li>
            <li
              className={`flex items-center h-full ${
                location.pathname === "/profile"
                  ? "border-slate-200 border-b-[3px]"
                  : ""
              }`}
            >
              <NavLink to={EHeaderNavItems.profile}>
                <div className="flex gap-2 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    fill="currentColor"
                    className="bi bi-person"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                  </svg>
                  <span>Profile</span>
                </div>
              </NavLink>
            </li>
            <li
              className={`flex items-center ${
                location.pathname === "/products"
                  ? "border-slate-200 border-b-[3px]"
                  : ""
              } h-full`}
            >
              <NavLink to={EHeaderNavItems.products}>
                <div className="flex gap-2 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    fill="currentColor"
                    className="bi bi-shop"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z" />
                  </svg>
                  <span>Products</span>
                </div>
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="flex text-slate-600 px-2 w-min-[40px]">
          <div className="flex m-1 w-12 h-12 items-center justify-center">
            {appSettings.appTheme === "dark" ? (
              <MdOutlineModeNight
                className="w-6 h-6 cursor-pointer"
                onClick={() => onChangeAppTheme("light")}
              />
            ) : (
              <MdModeNight
                className="w-6 h-6 cursor-pointer"
                onClick={() => onChangeAppTheme("dark")}
              />
            )}
          </div>
          <div
            className="text-3xl cursor-pointer overflow-hidden drop-shadow-md"
            onClick={handleShowMenu}
          >
            {userAuth?.user?.image ? (
              <img
                src={userAuth?.user?.image}
                alt="profile"
                className="w-12 h-12 rounded-full"
              />
            ) : (
              <FaUserAlt />
            )}
          </div>
          {showMenu && (
            <div className="absolute right-2 top-16 bg-white py-2 px-2 shadow drop-shadow-md flex flex-col">
              {!userAuth?.user ? (
                <Link
                  to={EHeaderNavItems.login}
                  className="px-2 py-1 hover:bg-slate-200"
                >
                  LogIn
                </Link>
              ) : (
                <>
                  <p
                    className="px-2 py-1  hover:bg-slate-200 cursor-pointer"
                    onClick={onLogOut}
                  >
                    Log Out
                  </p>
                  <button className="p-2" onClick={refresh}>
                    Refresh
                  </button>
                </>
              )}
              <nav className="text-base md:text-lg flex flex-col md:hidden">
                <Link
                  className="px-2 py-1  hover:bg-slate-200"
                  to={EHeaderNavItems.home}
                >
                  Home
                </Link>
                <Link
                  className="px-2 py-1  hover:bg-slate-200"
                  to={EHeaderNavItems.profile}
                >
                  Profile
                </Link>
                <Link
                  className="px-2 py-1  hover:bg-slate-200"
                  to={EHeaderNavItems.products}
                >
                  Products
                </Link>
                <button className="p-2" onClick={refresh}>
                  Refresh
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
