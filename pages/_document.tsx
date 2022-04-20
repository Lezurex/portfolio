import { Head, Html, Main, NextScript } from "next/document";
import { Navbar } from "../components/Navbar";

export default function Document() {
  return (
    <Html>
      <Head />
      <body className="bg-gray-800 text-slate-100">
        <Navbar />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
