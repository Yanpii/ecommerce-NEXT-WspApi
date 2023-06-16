import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="bg-[#34bb92] rounded-lg shadow m-3">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-white sm:text-center ">
            © 2023 Yanpi . All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li className=" hover:transform hover:scale-105  font-medium text-sm p-3 cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-800 sm:p-0 sm:hover:bg-transparent text-white hover:text-primary transition-colors">
              <Link href="/login">Admin</Link>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}
