import { useState } from "react";
import { FiSave } from "react-icons/fi";
import axios from "axios";
import { useRouter } from "next/router";

export default function FormCon() {
  const [newPassword, setNewPassword] = useState("");
  const [repPassword, setRepPassword] = useState("");
  const [actPassword, setActPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Validar que los campos no estén vacíos
    if (!newPassword || !repPassword || !actPassword) {
      setError("Todos los campos son requeridos");
      return;
    }

    // Validar que la nueva contraseña tenga al menos 6 caracteres
    if (newPassword.length < 6) {
      setError("La nueva contraseña debe tener al menos 6 caracteres");
      return;
    }

    // Validar que la nueva contraseña y repetir contraseña sean iguales
    if (newPassword !== repPassword) {
      setError("La nueva contraseña y repetir contraseña no coinciden");
      return;
    }

    // Validar la contraseña actual del usuario con id igual a 1
    const userId = 1; // ID del usuario a consultar en la base de datos

    try {
      // Hacer una solicitud a la API para verificar la contraseña actual del usuario
      const response = await axios.get(`/api/admin/${userId}`);
      const currentPasswordFromDB = response.data.password;

      if (actPassword !== currentPasswordFromDB) {
        setError("La contraseña actual no es correcta");
        return;
      }

      // Actualizar la contraseña en la base de datos
      await axios.put(`/api/admin/password/${userId}`, {
        password: newPassword,
      });

      // Resetear los campos y errores después de enviar el formulario
      setNewPassword("");
      setRepPassword("");
      setActPassword("");
      setError("");

      if (response.status === 200) {
        router.push("/login");
      }
    } catch (error) {
      setError("Error al verificar la contraseña actual");
    }
  };

  return (
    <div className="justify-center items-center">
      <form>
        <div className="mb-4 text-lg">
          <label>Nueva contraseña</label>
          <input
            className="rounded-3xl w-full border-none bg-yellow-400  px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="*********"
          />
        </div>
        <div className="mb-4 text-lg">
          <label>Repetir contraseña</label>
          <input
            className="rounded-3xl w-full border-none bg-yellow-400  px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
            type="password"
            name="repPassword"
            value={repPassword}
            onChange={(e) => setRepPassword(e.target.value)}
            placeholder="*********"
          />
        </div>
        <div className="mb-4 text-lg">
          <label>Contraseña actual</label>
          <input
            className="rounded-3xl w-full border-none bg-yellow-400  px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
            type="password"
            name="actPassword"
            value={actPassword}
            onChange={(e) => setActPassword(e.target.value)}
            placeholder="*********"
          />
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="justify-center items-center">
          <button
            type="submit"
            onClick={handleSubmit}
            className="transform transition-transform hover:scale-105 mt-4 md:mt-10 w-full flex justify-center text-sm md:text-xl bg-[#6eec7a] py-2 rounded-md font-bold mb-2"
          >
            <span className="text-3xl pr-5">
              <FiSave />
            </span>
            Aceptar
          </button>
        </div>
      </form>
    </div>
  );
}
