import Link from "next/link";
import Styles from "../styles/Navbar.module.css";
import { useEffect } from "react";
import { useState } from "react";

const Navbar = () => {
  const [user, setUser] = useState({});
  const handleGetUser = async () => {
    const res = await fetch("http://localhost:3000/api/userD");
    const { data } = await res.json();

    localStorage.setItem("profile", JSON.stringify(data[0]));
    console.log(data[0]);
    setUser(data[0]);
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  return (
    <nav className={Styles.navbar}>
      <Link href="/">
        <a className="navbar-brand">Home</a>
      </Link>
      <div>
        <Link href="/signin">
          <a className="signin">{user ? "" : "Sign in"}</a>
        </Link>
        <Link href="/signup">
          <a className="create">{user ? "Logged in" : "Sign up"} </a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
