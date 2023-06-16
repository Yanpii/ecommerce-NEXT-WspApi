import axios from "axios";
import Link from "next/link";
import router from "next/router";
import { useState } from "react";
import { FcMenu } from "react-icons/fc";

export default function NavbarAdmin() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const logout = async () => {
    try {
      await axios.post("/api/login/logout");
      router.push("/login");
    } catch (error) {
      router.push("/login");
    }
  };

  const handleSettingsClick = () => {
    router.push("/dashboard/settings");
  };

  return (
    <>
      <nav className="shadow bg-[#34bb92] text-white mb-4">
        <div className="h-16 mx-auto px-5 flex items-center justify-between">
          <div className="flex items-center ">
            <img
              src="https://i.pinimg.com/564x/b4/d3/be/b4d3bee357246896cd509e9352e94f10.jpg"
              alt="Logo"
              className=" bg-cover bg-center rounded-full  w-12 h-12"
            />
            <span className="ml-2 text-lg font-bold">2Chance</span>
          </div>
          <ul
            id="drawer"
            role="menu"
            className="sm:gap-3 transition-left ease-[cubic-bezier(0.4, 0.0, 0.2, 1)] delay-150  sm:flex  flex flex-col cursor-pointer absolute min-h-screen -left-48 sm:static w-48 top-0 bg-white sm:shadow-none shadow-xl sm:bg-transparent sm:flex-row sm:w-auto sm:min-h-0 dark:bg-slate-900  "
          >
            <div className="sm:hidden p-6 mb-5 flex items-center justify-center"></div>
            <li className=" hover:transform hover:scale-105 dark:text-white font-bold text-sm p-3 cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-800 sm:p-0 sm:hover:bg-transparent text-gray-600 hover:text-primary transition-colors">
              <Link href="/dashboard">Inicio</Link>
            </li>
            <li className=" hover:transform hover:scale-105 dark:text-white font-bold text-sm p-3 cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-800 sm:p-0 sm:hover:bg-transparent text-gray-600 hover:text-primary transition-colors">
              <Link href="/products/new">Agregar producto</Link>
            </li>
          </ul>

          <div className="flex gap-3 items-center">
            <button
              onClick={toggleMenu}
              className="z-50 px-4 py-2 bg-cover bg-center rounded-full  text-white  w-12 h-12 font-bold transform transition-transform hover:scale-105"
            >
              <span className="text-3xl pr-5 ">
                <FcMenu />
              </span>
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow">
            <ul>
              <li
                className="py-2 px-4 hover:bg-gray-100 cursor-pointer text-black"
                onClick={handleSettingsClick}
              >
                Ajustes
              </li>
              <li
                onClick={() => logout()}
                className="py-2 px-4 hover:bg-gray-100 cursor-pointer text-black"
              >
                Cerrar sesión
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}
