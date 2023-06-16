import { Product } from "src/interfaces/Product";
import { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import React from "react";
import ButtonCart from "../button/ButtonCart";
import { FcInfo } from "react-icons/fc";

interface Props {
  products: Product[];
}
type Phone = {
  id: number;
  number: number;
};

function ProductList({ products }: Props) {
  let [cart, setCart] = useState<Product[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [phone, setPhone] = useState<Phone | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const handleInfoClick = (productId: number) => {
    setSelectedProductId(productId);
  };

  // cantidades de los items
  const [cantidades, setCantidades] = useState<Array<number | undefined>>([]);

  const handleCantidadChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newCantidades = [...cantidades];
    const cantidad = parseInt(event.target.value);
    newCantidades[index] = cantidad;
    setCantidades(newCantidades);

    const newErrors = [...errors];
    if (cantidad < 1) {
      newErrors[index] = "La cantidad debe ser mayor o igual a 1.";
    } else {
      newErrors[index] = "";
    }
    setErrors(newErrors);
  };

  const totalPrice = React.useMemo(
    () =>
      cart.reduce((sum, product, index) => {
        const cantidad = cantidades[index] ?? 1;
        return sum + product.price * cantidad;
      }, 0),
    [cart, cantidades]
  );

  const text = React.useMemo(
    () =>
      cart
        .reduce(
          (message, product, index) =>
            message.concat(
              ` | ${product.title} - $${product.price}${
                cantidades[index] !== undefined
                  ? ` - (${cantidades[index]})`
                  : ""
              }`
            ),
          ""
        )
        .concat(` | TOTAL: $${totalPrice}`),
    [cart, totalPrice]
  );

  function handleAddToCart(product: Product) {
    setCart((cart) => cart.concat(product));
  }

  const handleRemoveFromCart = (productId: number) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
  };

  const isProductInCart = (product: Product) => {
    return cart.some((item) => item.id === product.id);
  };

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

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center">
        {Boolean(cart.length) && <ButtonCart></ButtonCart>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="flex items-center justify-center">
            <div className="w-full max-w-md mx-auto rounded-3xl bg-[#a0aec0] bg-opacity-20 overflow-hidden">
              <div className="max-w-md mx-auto">
                <div
                  className="h-[236px]"
                  style={{
                    backgroundImage: `url(${product.image}) `,
                    backgroundSize: "100% 100%",
                  }}
                ></div>
                <div className="p-4 sm:p-6">
                  <p className="float-right text-white mb-1">
                    Stock: {product.stock}
                  </p>
                  <p className="font-bold text-yellow-400 text-[22px] leading-7 mb-1">
                    {product.title}
                  </p>

                  <div className="flex flex-row">
                    <p className="text-[17px] font-bold text-[#0FB478]">
                      ${product.price.toLocaleString()}
                    </p>
                  </div>
                  <p className="text-white font-[15px] mt-6 max-w-xs truncate">
                    {product.description}
                  </p>
                  <span
                    onClick={() => product.id && handleInfoClick(product.id)}
                    className="text-2xl float-right transform transition-transform hover:scale-110"
                  >
                    <FcInfo />
                  </span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={isProductInCart(product)}
                    className={`text-white block mt-10 w-full px-4 py-3 font-bold tracking-wide text-center capitalize transition-colors duration-300 transform transition-transform hover:scale-105 bg-[#6eec7a] rounded-[14px] hover:bg-[#CBFF00] focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-80 ${
                      cart.some((item) => item.id === product.id)
                        ? "disabled-button"
                        : ""
                    }`}
                  >
                    AGREGAR AL CARRITO
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {Boolean(cart.length) && (
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table id="tableCart" className="min-w-full">
                  <thead className="bg-[#6eec7a]">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        NOMBRE
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        DESCRIPCIÓN
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        PRECIO
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Cantidad
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Eliminar
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((product, index) => (
                      <tr className="bg-gray-100 border-b" key={product.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {product.id}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {product.title}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap max-w-xs truncate">
                          {product.description}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          ${product.price.toLocaleString()}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <input
                            type="number"
                            min={1}
                            onChange={(event) =>
                              handleCantidadChange(index, event)
                            }
                          />
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() =>
                              product.id && handleRemoveFromCart(product.id)
                            }
                            className="flex items-center justify-center px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-full focus:outline-none"
                          >
                            <AiFillCloseCircle />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="w-full ">
                    {errors.length > 0 && (
                      <div className="flex justify-center my-2">
                        <div className="my-2 mx-auto">
                          {errors.map((error, index) => (
                            <p key={index} className="text-red-500">
                              {error}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                    {!errors.some((error) => error !== "") && (
                      <div className="flex justify-center">
                        <a
                          href={`https://wa.me/+569${
                            phone?.number
                          }?text=${encodeURIComponent(text)}`}
                        >
                          <button className="mb-4 mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transform transition-transform hover:scale-110">
                            ENVIAR PEDIDO
                          </button>
                        </a>
                      </div>
                    )}
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}

      {selectedProductId && (
        <div className="fixed inset-0 flex items-center justify-center  ">
          {products.map(
            (product) =>
              // Agrega la condición para mostrar el product.title solo si el product.id es igual a selectedProductId
              product.id === selectedProductId && (
                <div
                  className="bg-gray-900 bg-opacity-80 w-64 p-4 rounded shadow"
                  key={product.id}
                >
                  <div className="flex justify-center">
                    <img
                      src="https://i.pinimg.com/564x/b4/d3/be/b4d3bee357246896cd509e9352e94f10.jpg"
                      width="150"
                      alt="logo"
                      className=" bg-cover bg-center w-16 h-16 rounded-full mb-2"
                    />
                  </div>
                  <div className="flex justify-center">
                    <h2 className="text-lg font-bold  text-white">
                      {product.title}
                    </h2>
                  </div>
                  <p className=" text-yellow-500 ">ID: {product.id}</p>
                  <textarea
                    value={product.description}
                    className="text-black font-bold w-full h-[200px] bg-green-100 mt-2"
                  ></textarea>

                  <div className="flex justify-center mt-4">
                    <button
                      onClick={() => setSelectedProductId(null)}
                      className=" px-4 py-2 bg-[#6eec7a] text-white rounded-md hover:bg-[#CBFF00] transform transition-transform hover:scale-110"
                    >
                      Salir
                    </button>
                  </div>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
}

export default ProductList;
