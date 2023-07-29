import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// components
import PrimaryButton from "./PrimaryButton";
import Title from "./Title";
import InputForm from "./InputForm";

export default function SignupForm() {
  useEffect(() => {
    console.log(userData);
  });

  const [userData, setUserData] = useState({
    username: null,
    email: null,
    password: null,
  });

  const buttonHandlerFunction = () => {
    alert("Button Handled");
  };

  return (
    <div className="bg-slate-100 flex flex-col justify-center items-center w-[28rem] h-[32rem] mx-2 p-6 rounded-xl drop-shadow-2xl">
      <Title titleText={"Register"} />
      <form className="mt-3 flex flex-col w-full h-full justify-center items-center">
        <InputForm
          placeholder={"Username"}
          type={"text"}
          setValueHandler={setUserData}
          valuesToHandle={userData}
        />
        <InputForm
          placeholder={"Email"}
          type={"email"}
          setValueHandler={setUserData}
          valuesToHandle={userData}
        />
        <br />
        <InputForm
          placeholder={"Password"}
          type={"password"}
          setValueHandler={setUserData}
          valuesToHandle={userData}
        />

        <InputForm placeholder={"Password"} type={"password"} />
        <div className="w-full my-2">
          <input className="" type="checkbox" name="" id="" /> Show Password
        </div>
        <br />
        <PrimaryButton
          buttonHandlerFunction={buttonHandlerFunction}
          buttonText={"REGISTER"}
        />
        <br />
        <span className="w-full h-[1px] bg-slate-300"></span>
        <br />
        <div>
          Do you have an account? <Link to={"/login"}>Login</Link>
        </div>
      </form>
    </div>
  );
}
