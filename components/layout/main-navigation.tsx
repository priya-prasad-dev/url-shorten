import Link from "next/link";
import classes from "./main-navigation.module.css";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>URL-SHORTEN</div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
