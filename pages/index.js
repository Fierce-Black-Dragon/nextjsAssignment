import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { Link } from "next/link";

export default function Home() {
  const [user, setUser] = useState({});
  const handleGetUser = async () => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title> Next App</title>
        <meta name="description" content="Next App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user ? (
        <>
          <p> Greeting {user?.name}</p>
          <strong>
            {" "}
            {user?.verified
              ? "Your Email is Verified"
              : "Your email is not verified"}
          </strong>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
