import { json } from "@remix-run/node";
import { Link, Form, Outlet, useLoaderData, } from "@remix-run/react";

// import { requireUserId } from "~/session.server";
import { useOptionalUser } from "~/utils";

import styles from "~/styles/study.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export default function StudyPage() {
  const data = useLoaderData();
  const user = useOptionalUser();

  return (
    <div className="flex h-full min-h-screen flex-col ">
        <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold">
          <Link to="."></Link>
        </h1>
        {user ? (
        <Form action="/logout" method="post">
          <button
            type="submit"
            className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
          >
            Logout
          </button>
        </Form>
        ) : (        
        <Form action="/login" method="post">
          <button
            type="submit"
            className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
          >
            Login
          </button>
        </Form>)}
      </header>
      <main className="flex h-full bg-white content-center">
        <div className="flex-1 content-center">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
