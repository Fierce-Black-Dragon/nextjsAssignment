import React from "react";
import { Input } from "./../components/Input";
import Link from "next/link";
import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import Styles from "../styles/SignUp.module.css";
import { useRouter } from "next/router";
const signin = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isSubmitting, setIsSubmitting] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [errors, setErrors] = useState({});
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  // eslint-disable-next-line react-hooks/rules-of-hooks

  const signup = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/signin", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (res.status != 400) {
        console.log(res);
        router.push("/");
      } else {
        alert(" wrong credentials");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!(form.email || form.mobile_no || form.name || form.password)) {
      alert("enter details");
    }
    setIsSubmitting(true);

    signup();
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={Styles.paper}>
      <h2>Sign In To Your Account</h2>
      <p>
        {" "}
        Dont have a account ?{" "}
        <Link className={Styles.link} href="/signup">
          Sign Up
        </Link>
      </p>
      <form onSubmit={handleSubmit}>
        <Input
          name="Email"
          name2="email"
          type="text"
          handleChange={handleChange}
        />
        <Input
          name="Password"
          name2="password"
          type="password"
          handleChange={handleChange}
        />

        <button className={Styles.button} type="submit">
          {" "}
          SIGN IN
        </button>
      </form>
    </div>
  );
};

export default signin;
