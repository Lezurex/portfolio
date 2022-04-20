import Link from "next/link";
import { NavLink } from "./NavLink";

export const Navbar = () => {
  return (
    <>
      <nav className="flex justify-between items-center p-4">
        <div className="flex flex-col gap-1 group">
          <h1 className="text-3xl">Lenny Angst</h1>
          <div className="w-2/6 h-1 mt-1 bg-red-500 rounded group-hover:w-3/6 transition-all duration-700 ease-in-out" />
        </div>
        <ul>
          <li>
            <NavLink href={"/"}>Home</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};
