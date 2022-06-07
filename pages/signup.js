import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import Styles from "../styles/SignUp.module.css";
import { useRouter } from "next/router";
import { Input } from "./../components/Input";
const signup = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    mobile_no: 0,
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
      const res = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (res) {
        router.push("/");
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
        Already have a account ?{" "}
        <Link href="/signin">
          <a>Sign in</a>
        </Link>
      </p>
      <form onSubmit={handleSubmit}>
        <Input
          name="Name"
          name2="name"
          type="text"
          handleChange={handleChange}
        />
        <Input
          name="Email"
          name2="email"
          type="text"
          handleChange={handleChange}
        />
        <Input
          name="Mobile No"
          name2="mobile_no"
          type="number"
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
          SIGN UP
        </button>
      </form>
    </div>
  );
};

export default signup;
