import Head from "next/head";
import Dashboard from "../components/dashboard";

export default function Home() {
  return (
    <>
      <Head>
        <title>Solar-Dash</title>
        <meta name="description" content="Solar-Dash" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="white" />
      </Head>
      <main className="flex min-h-screen flex-col items-center dark:bg-slate-900">
        <div className="container flex flex-col items-center justify-center gap-6 px-4 py-10 ">
          <Dashboard />
        </div>
      </main>
    </>
  );
}
