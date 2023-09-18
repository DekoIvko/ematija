import React, { useContext, useEffect, useRef, useState } from "react";
import { StateContext } from "../../../store/store";
import AuthService from "../../../services/AuthService";
import { useNavigate } from "react-router";

const LogInPage = () => {
  const usenavigate = useNavigate();
  const { dispatch } = useContext(StateContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const inputUsername = useRef<HTMLInputElement>(null);
  const [errorMsg, setErrorMsg] = useState({
    usernameError: false,
    passwordError: false,
  });

  useEffect(() => {
    if (inputUsername.current) {
      inputUsername.current.focus();
    }
  }, [inputUsername]);

  const loginDummyUser = async () => {
    const authUser = await AuthService({
      username: "atuny0",
      password: "9uQFF1Lh",
    });

    dispatch({ type: "setLogedUser", payload: authUser });
    localStorage.setItem("ematija-user", JSON.stringify(authUser));
    usenavigate("/home");
  };

  const onSubmitBtn = async (e: any) => {
    e.preventDefault();
    if (validate()) {
      const authUser = await AuthService({
        username: username,
        password: password,
      });
      dispatch({ type: "setLogedUser", payload: authUser });
      localStorage.setItem("ematija-user", JSON.stringify(authUser));
      usenavigate("/home");
    }
  };

  const validate = () => {
    let result = true;
    if (username.length === 0 || username === null) {
      setErrorMsg((prevObj) => ({
        ...prevObj,
        usernameError: true,
      }));
      result = false;
    }

    if (password.length === 0 || password === null) {
      setErrorMsg((prevObj) => ({
        ...prevObj,
        passwordError: true,
      }));
      result = false;
    }
    return result;
  };

  return (
    <div className="container login-page d-flex">
      <div className="d-flex flex-column">
        <form onSubmit={onSubmitBtn}>
          <div className="card p-4">
            <div className="card-title">
              <h3>Login in</h3>
            </div>
            <div className="card-body d-flex flex-column gap-3">
              <div className="form-group d-flex flex-column">
                <label htmlFor="username"></label>
                <input
                  ref={inputUsername}
                  className="form-control"
                  type="text"
                  placeholder="Please enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {errorMsg.usernameError && (
                  <div style={{ color: "red" }}>Please enter your username</div>
                )}
              </div>
              <div className="form-group d-flex flex-column">
                <label htmlFor="username"></label>
                <input
                  className="form-control"
                  type="password"
                  placeholder="Please enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errorMsg.usernameError && (
                  <div style={{ color: "red" }}>Please enter your password</div>
                )}
              </div>
              <div className="card-b d-flex flex-row gap-3">
                <button className="btn btn-primary" type="submit">
                  Login In
                </button>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={loginDummyUser}
                >
                  Log with dummy user :)
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogInPage;
