import Link from "next/link";

interface Props {
  href: string;
  children: string;
}

export const NavLink = ({ href, children }: Props) => {
  return (
    <Link href={href} className="text-xl hover:text-red-500 transition">
      {children}
    </Link>
  );
};
