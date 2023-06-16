import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FiSave } from "react-icons/fi";

type Phone = {
  id: number;
  number: number;
};

export default function FormTel() {
  const router = useRouter();
  const [phone, setPhone] = useState<Phone | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhone = async () => {
      try {
        const id = "1";
        const response = await fetch(`/api/phone/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPhone(data);
        } else {
          throw new Error("Phone not found");
        }
      } catch (error) {
        console.error(error);
        // Manejar el estado de error
      }
    };

    fetchPhone();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const number = event.currentTarget.phone.value;

    // Validar que el número no esté vacío y tenga entre 9 caracteres como mínimo y máximo
    if (!number || number.length < 9 || number.length > 9) {
      setError("El teléfono debe tener 9 caracteres");
      return;
    }
    try {
      const number = event.currentTarget.phone.value;
      const response = await fetch(`/api/phone/1`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ number }),
      });

      if (response.ok) {
        const data = await response.json();
        setPhone(data);
        console.log("Teléfono actualizado:", data);
      } else {
        throw new Error("Error al actualizar el teléfono");
      }
    } catch (error) {
      console.error(error);
      // Manejar el estado de error
    }
  };

  return (
    <div className="justify-center items-center">
      <div>
        <p className="text-right">Numero actual: {phone?.number ?? "N/A"}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 text-lg">
          <label htmlFor="phone">Nuevo teléfono</label>
          <input
            id="phone"
            className="rounded-3xl w-full border-none bg-yellow-400 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
            type="number"
            name="phone"
            placeholder="912345678"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <div className="justify-center items-center">
          <button
            type="submit"
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
