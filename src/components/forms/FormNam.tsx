import { FiSave } from "react-icons/fi";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

type Admin = {
  id: number;
  username: string;
};


export default function FormNam() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [admin, setAdmin] = useState<Admin | null>(null); 
  const router = useRouter();
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const id = '1';
        const response = await fetch(`/api/admin/${id}`);
        if (response.ok) {
          const data = await response.json();
          setAdmin(data);
        } else {
          throw new Error('Admin not found');
        }
      } catch (error) {
        console.error(error);
        // Manejar el estado de error
      }
    };

    fetchAdmin();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

// Validar que el campo username no esté vacío y tenga al menos 5 caracteres
if (username.trim() === '' || username.length < 5) {
  setErrorMessage("El nombre de usuario debe tener al menos 5 caracteres");
  return;
}

    try {
      const response = await axios.put("/api/admin/1", {
        username,
        password,
      });
      if (response.status === 200) {
        router.push("/login");
      }
    } catch (error: any) {
      console.error(error);

      if (error.response && error.response.status === 401) {
        setErrorMessage("Contraseña incorrecta");
      } else {
        setErrorMessage("Error en el servidor");
      }
    }
  };

  return (
    <div className="justify-center items-center">
       <p className="text-right">Nombre de usuario actual: {admin?.username ?? 'N/A'}</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 text-lg">
          <label>Nuevo nombre de usuario</label>
          <input
            className="rounded-3xl w-full border-none bg-yellow-400 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
            type="text"
            name="username"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4 text-lg">
          <label>Contraseña</label>
          <input
            className="rounded-3xl w-full border-none bg-yellow-400 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
            type="password"
            name="password"
            placeholder="*********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}
        </div>
        <div className="justify-center items-center">
          <button
            type="submit"
            className="transform transition-transform hover:scale-105 mt-4 md:mt-10 w-full flex justify-center text-sm md:text-xl bg-[#6eec7a] py-2 rounded-md font-bold mb-2"
          >
            <span className="text-3xl pr-5 ">
              <FiSave />
            </span>
            Aceptar
          </button>
        </div>
      </form>
    </div>
  );
}
