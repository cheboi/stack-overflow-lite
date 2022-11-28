import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";

import "./styles/login.css";

function Login() {
  const [useremailReg, setUseremailReg] = useState("");
  const [userfirstname, setUserfirstname] = useState("");
  const [userlastname, setUserlastname] = useState("");
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [useremailLog, setUseremailLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  const register = async () => {
    try {
      const res = await axios({
        method: "POST",
        url: `http://localhost:3000/user/signup`,
        data: {
          email: useremailReg,
          first_name: userfirstname,
          last_name: userlastname,
          username: usernameReg,
          password: passwordReg,
        },
      });

      console.log(res.data);
      if (res.data.status === "success") console.log("Register succesfully");
    } catch (err) {
      console.log(`⛔⛔⛔: ${err.response.data.message}`);
    }
  };

  const login = async () => {
    try {
      // In the port of the server obviously
      const res = await axios({
        method: "POST",
        url: "http://localhost:3000/user/login",
        data: {
          useremail: useremailLog,
          password: passwordLog,
        },
      });

      console.log(res.data);
      if (res.data.status === "success") {
        console.log("Logged succesfully!");
        setLoginStatus(
          `Logged succesfully! Welcome back ${res.data.data.username}`
        );
      }
    } catch (err) {
      console.log(`⛔⛔⛔: ${err.response.data.message}`);
      setLoginStatus(err.response.data.message);
    }
  };

  const handlerRegister = (e) => {
    e.preventDefault();
    register();
    // setUsernameReg('');
    // setPasswordReg('');
  };

  const handlerLogin = (e) => {
    e.preventDefault();
    login();
  };
  return (
    <div className="App">
      <div className="registration">
        <h1>Registration</h1>
        <form>
        <label>Useremail</label>
          <input
            type="email"
            onChange={(e) => setUseremailReg(e.target.value)}
            value={useremailReg}
          />
          <label>Userfirstname</label>
          <input
            type="text"
            onChange={(e) => setUserfirstname(e.target.value)}
            value={userfirstname}
          /><label>Userlastname</label>
          <input
            type="text"
            onChange={(e) => setUserlastname(e.target.value)}
            value={userlastname}
          />
          <label>Username</label>
          <input
            type="text"
            onChange={(e) => setUsernameReg(e.target.value)}
            value={usernameReg}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPasswordReg(e.target.value)}
            value={passwordReg}
          />
          <button onClick={handlerRegister}>Register</button>
        </form>
      </div>
      <div className="login">
        <h1>Login</h1>
        <form>
          <label>UserEmail</label>
          <input
            type="email"
            placeholder="UserEmail..."
            onChange={(e) => setUseremailLog(e.target.value)}
            value={useremailLog}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password..."
            onChange={(e) => setPasswordLog(e.target.value)}
            value={passwordLog}
          />
          <button onClick={handlerLogin}>Log in</button>
        </form>
      </div>

      <h1>{loginStatus}</h1>
    </div>
  );
}

export default Login;