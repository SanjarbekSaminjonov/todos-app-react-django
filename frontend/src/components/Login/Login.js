import React, { useState } from "react";
import classes from "./Login.module.css";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";

export default function Login({ setToken }) {
  const [values, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
  const [user, setUser] = useState("");
  const [pass2, setPass2] = useState("");
  const [fullName, setFullName] = useState("");
  const [lastname, setLastname] = useState("");
  const [err, setErr] = useState(false);
  const [signIn, setSignIn] = useState(false);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const getVal = (e) => {
    setUser(e.target.value);
  };

  const getVal1 = (e) => {
    setFullName(e.target.value);
  };

  const getVal2 = (e) => {
    setLastname(e.target.value);
  };

  const getSecondPass = (e) => {
    setPass2(e.target.value);
  };

  const registerHandler = async (dataJson, url) => {
    const body = {
      method: "POST",
      body: JSON.stringify(dataJson),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = fetch(url, body);
    const token = await response.then((res) => res.json());
    if (token["token"]) {
      localStorage.setItem("token", JSON.stringify(token["token"]));
      setToken(token["token"]);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (signIn) {
      if (
        fullName !== "" &&
        user !== "" &&
        values.password !== "" &&
        pass2 !== ""
      ) {
        if (pass2 !== values.password) {
          setErr(true);
        } else {
          const url =
            "/api/auth/register/";
          registerHandler(
            {
              username: user,
              password: values.password,
              first_name: fullName,
              last_name: lastname,
            },
            url
          );
          setUser("");
          setFullName("");
          setLastname("");
          setValues({ ...values, password: "" });
          setPass2("");
        }
      }
    } else {
      if (user !== "" && values.password !== "") {
        const url = "/api/auth/login/";
        registerHandler(
          {
            username: user,
            password: values.password,
          },
          url
        );
        setUser("");
        setFullName("");
        setLastname("");
        setValues({ ...values, password: "" });
        setPass2("");
      }
    }
  };

  return (
    <>
      <div className={classes.form__control}>
        <form onSubmit={submitHandler}>
          <div className={classes.btn_control}>
            <button
              onClick={() => setSignIn(false)}
              className={!signIn ? classes.active : ""}
            >
              Sig In
            </button>
            <button
              onClick={() => setSignIn(true)}
              className={signIn ? classes.active : ""}
            >
              Sign Up
            </button>
          </div>
          {signIn ? (
            <>
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <TextField
                  value={fullName}
                  onChange={getVal1}
                  className={classes.inp}
                  label="First name"
                  variant="outlined"
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <TextField
                  value={lastname}
                  onChange={getVal2}
                  className={classes.inp}
                  label="Last name"
                  variant="outlined"
                />
              </FormControl>
            </>
          ) : (
            ""
          )}
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <TextField
              value={user}
              onChange={getVal}
              className={classes.inp}
              label="Username"
              variant="outlined"
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel
              className={classes.inp}
              htmlFor="outlined-adornment-password"
            >
              Password
            </InputLabel>
            <OutlinedInput
              className={classes.inp}
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          {signIn ? (
            <>
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <InputLabel
                  className={classes.inp}
                  htmlFor="outlined-adornment-password"
                >
                  Re-type password
                </InputLabel>
                <OutlinedInput
                  className={classes.inp}
                  type={values.showPassword ? "text" : "password"}
                  value={pass2}
                  onChange={getSecondPass}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              {err ? "xato" : ""}
            </>
          ) : (
            ""
          )}
          <Button type="submit" className={classes.btn} variant="contained">
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}
