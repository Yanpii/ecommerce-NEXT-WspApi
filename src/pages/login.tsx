import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

export default function LoginPage() {

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get("/api/token");
        if (response.status === 200) {
          router.push("/dashboard");
        }
      } catch (err) {
        // El token no existe o no es válido, no se redirige al dashboard
      }
    };

    checkSession();
  }, []); // El segundo parámetro [] indica que el efecto se ejecuta solo una vez al cargar la página


const router = useRouter();
const [error, setError] = useState<string | null>(null);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(null);
    try{
      const response = await axios.post("/api/login", credentials);
      if (response.status === 200) {
        router.push("/dashboard");
      }
    }catch(err){
      setError("Usuario o contraseña incorrectos");
    }

  };

 
  return (
    <div
      className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat"
    >
      <div className="rounded-xl bg-gray-500 bg-opacity-20 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
        <div className="text-black">
          <div className="mb-8 flex flex-col items-center">
            <img
              src="https://i.pinimg.com/564x/b4/d3/be/b4d3bee357246896cd509e9352e94f10.jpg"
              width="150"
              alt="logo"
              className=" bg-cover bg-center rounded-full"
            />
            <h1 className="mb-2 text-2xl text-white">2Chance</h1>
            <span className="text-white">
              Ingrese los datos de inicio de sesión
            </span>
          </div>
          <form onSubmit={handleSubmit} >
            <div className="mb-4 text-lg">
              <input
                className="rounded-3xl border-none bg-yellow-400  px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                type="text"
                name="username"
                onChange={handleChange}
                placeholder="Usuario"
              />
            </div>

            <div className="mb-4 text-lg">
              <input
                className="rounded-3xl border-none bg-yellow-400  px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="*********"
              />
            </div>
            <div className="mt-8 flex justify-center text-lg text-black">
              <button className="rounded-3xl bg-[#6eec7a]  px-10 py-2 text-white shadow-xl backdrop-blur-md transform transition-transform hover:scale-105 transition-colors duration-300 hover:bg-[#CBFF00] mb-5">
               Aceptar
              </button>
            </div>
            <Link href="/" className=" flex justify-center text-white md:text-xl  font-medium transform transition-transform hover:scale-105">
         Volver
        </Link>
            <div className="flex justify-center items-center">
            {error && <p className="text-red-500">{error}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
