import Image from "next/image";
import React from "react";
import classes from "./about-page.module.css";

const About = () => {
  return (
    <div className={classes.container}>
      <div className={classes.imgcontainer}>
        <Image src="/url.png" alt="logo" width={250} height={250} />
      </div>
      <div className={classes.about}>
        <h5>About Us</h5>
        <span className={classes.highlight}>Welcome</span> to my{" "}
        <span className={classes.highlight}>Url-Shortening</span> PWA
        (Progressive Web App). Here you can enter any URL and a new short URL
        will be generated which is convenient for you to keep on track. PWA
        basically means that you can install this web app into your system as
        well as on your mobile devices, just like a mobile app and it also works
        in offline mode.
      </div>
    </div>
  );
};

export default About;
