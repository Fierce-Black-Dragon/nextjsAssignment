import React from "react";
import Styles from "../styles/SignUp.module.css";
export const Input = (props) => {
  return (
    <div className={Styles.input}>
      {" "}
      <label htmlFor="">{props.name} : </label>
      <input
        type={props.type}
        name={props.name2}
        id=""
        onChange={props.handleChange}
      />
    </div>
  );
};
