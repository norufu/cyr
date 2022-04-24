import { Link } from "@remix-run/react";

import { useOptionalUser } from "~/utils";
import styles from "~/styles/home.css";
export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export default function Index() {
  const user = useOptionalUser();
  return (
    <main className="flexCenter">
      <h1>Language Learning With Subtitles</h1>
      <div className="flexCenter">
        {user ? (<Link className="button" to="/study">Go study {user.email}</Link>) 
        : 
        (<>
        <div id = "buttonWrapper" className="flexCenter">
          <div id="top" className="flexCenter">
            <Link className="button" to="/join">Sign up</Link>
            <Link className="button" to="/login">Log In</Link>
          </div>
          <div id="bottom" className="flexCenter">
            <Link className="button studyButton" to="/study">Study as guest</Link>
          </div>
        </div>

        </>)}
        
      </div>

    </main>
  );
}
