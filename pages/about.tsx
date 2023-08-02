import { Fragment } from "react";
import Head from "next/head";

import About from "../components/about/about-page";

function AboutPage() {
  return (
    <Fragment>
      <Head>
        <title>About Us</title>
        <meta name="description" content="About Url Shortning" />
      </Head>
      <About />
    </Fragment>
  );
}

export default AboutPage;
