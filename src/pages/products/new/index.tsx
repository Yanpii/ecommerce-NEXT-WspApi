import { Product } from "@/interfaces/Product";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FiSave } from "react-icons/fi";
import { useRouter } from "next/router";
import Link from "next/link";

export default function NewProduct() {
  const router = useRouter();

  const [product, setProduct] = useState({
    title: "",
    description: "",
    image: "",
    price: 0,
    stock: 0,
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    stock: "",
  });

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const createProduct = async (product: Product) => {
    await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
  };

  const loadProduct = async (id: string) => {
    const res = await fetch("/api/products/" + id);
    const product = await res.json();
    setProduct({
      title: product.title,
      description: product.description,
      image: product.image,
      price: product.price,
      stock: product.stock,
    });
  };

  const updateProduct = async (id: string, product: Product) => {
    await fetch("/api/products/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formIsValid = true;

    // Validar campos vacíos
    if (product.title.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        title: "Por favor, ingresa un nombre.",
      }));
      formIsValid = false;
    }

    if (product.description.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        description: "Por favor, ingresa una descripción.",
      }));
      formIsValid = false;
    }

    if (product.image.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        image: "Por favor, ingresa una URL de imagen.",
      }));
      formIsValid = false;
    }

    if (product.price === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        price: "Por favor, ingresa un precio válido.",
      }));
      formIsValid = false;
    }

    if (product.stock === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        stock: "Por favor, ingresa un stock válido.",
      }));
      formIsValid = false;
    }

    if (formIsValid) {
      try {
        if (typeof router.query.id === "string") {
          updateProduct(router.query.id, product);
        } else {
          await createProduct(product);
        }
        router.push("/dashboard");
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (typeof router.query.id === "string") loadProduct(router.query.id);
  }, [router.query]);

  return (
    <div className="w-[100vw] h-[100vh] px-3 sm:px-5 flex items-center justify-center absolute">
      <form
        onSubmit={handleSubmit}
        className="w-full sm:w-1/2 lg:2/3 px-6 bg-gray-500 bg-opacity-20 bg-clip-padding backdrop-filter backdrop-blur-sm text-white z-50 py-4 rounded-lg"
      >
        <div className=" flex flex-col items-center">
          <img
            src="https://i.pinimg.com/564x/b4/d3/be/b4d3bee357246896cd509e9352e94f10.jpg"
            width="150"
            alt="logo"
            className=" bg-cover bg-center rounded-full w-20 h-20"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2  font-medium text-xs text-white">
            Nombre
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="bg-yellow-400 border border-gray-300 text-black text-xs  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5 bg-yellow-400 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={handleChange}
            value={product.title}
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title}</p>
          )}
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-xs font-medium text-white">
            Descripción
          </label>
          <input
            type="text"
            id="description"
            name="description"
            className="bg-yellow-400 border border-gray-300 text-black text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5  dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={handleChange}
            value={product.description}
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">{errors.description}</p>
          )}
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-xs font-medium text-white">
            Imagen URL
          </label>
          <input
            type="text"
            id="image"
            name="image"
            className="bg-yellow-400 border border-gray-300 text-black text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={handleChange}
            value={product.image}
          />
          {errors.image && (
            <p className="text-red-500 text-xs mt-1">{errors.image}</p>
          )}
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-xs font-medium text-white">
            Precio
          </label>
          <input
            type="number"
            id="price"
            name="price"
            className="bg-yellow-400 border border-gray-300 text-black text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={handleChange}
            value={product.price}
          />
          {errors.price && (
            <p className="text-red-500 text-xs mt-1">{errors.price}</p>
          )}
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-xs  font-medium text-white">
            Stock
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            className="bg-yellow-400 border border-gray-300 text-black text-xs  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={handleChange}
            value={product.stock}
          />
          {errors.stock && (
            <p className="text-red-500 text-xs mt-1">{errors.stock}</p>
          )}
        </div>

        <button
          type="submit"
          className=" transform transition-transform hover:scale-105 mt-4 md:mt-10 w-full flex justify-center text-sm md:text-xl bg-[#6eec7a] py-2 rounded-md font-bold mb-2"
        >
          <span className="text-3xl pr-5 ">
            <FiSave />
          </span>
          Aceptar
        </button>
        <Link
          href="/dashboard"
          className=" flex justify-center text-sm md:text-xl  font-medium transform transition-transform hover:scale-105"
        >
          Volver
        </Link>
      </form>
    </div>
  );
}
