import { useState } from "react";
import { Product } from "src/interfaces/Product";
import { FcEditImage, FcFullTrash } from "react-icons/fc";
import { useRouter } from "next/router";

interface Props {
  products: Product[];
}

export default function TableProducts({ products }: Props) {
  const router = useRouter();
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  const handleDeleteClick = (productId: number) => {
    setSelectedProductId(productId);
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch('/api/products/' + id, {
        method: "DELETE",
      });
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table id="tableCart" className="min-w-full">
              <thead className="bg-[#6eec7a] border-b">
                <tr>
                  <th className="text-sm font-bold text-white px-6 py-4 text-left">
                    ID
                  </th>
                  <th className="text-sm font-bold text-white px-6 py-4 text-left">
                    IMAGEN
                  </th>
                  <th className="text-sm font-bold text-white px-6 py-4 text-left">
                    NOMBRE
                  </th>
                  <th className="text-sm font-bold text-white px-6 py-4 text-left">
                    DESCRIPCIÓN
                  </th>
                  <th className="text-sm font-bold text-white px-6 py-4 text-left">
                    PRECIO
                  </th>
                  <th className="text-sm font-bold text-white px-6 py-4 text-left">
                    STOCK
                  </th>
                  <th className="text-sm font-bold text-white px-6 py-4 text-left">
                    ELIMINAR / EDITAR
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr className="bg-green-200" key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-800">
                      {product.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-800">
                      <img
                        src={product.image}
                        alt="Product"
                        className="w-16 h-16 object-cover rounded-full"
                      />
                    </td>
                    <td className="text-sm text-black-900 font-bold px-6 py-4 whitespace-nowrap">
                      {product.title}
                    </td>
                    <td className="text-sm text-black-900 font-light px-6 py-4 whitespace-nowrap max-w-xs truncate">
                      {product.description}
                    </td>
                    <td className="text-sm text-black-900 font-bold px-6 py-4 whitespace-nowrap">
                      ${product.price.toLocaleString()}
                    </td>
                    <td className="text-sm text-black-900 font-bold px-6 py-4 whitespace-nowrap">
                      {product.stock}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <button
                        name="delete"
                        onClick={() =>
                          product.id && handleDeleteClick(product.id)
                        }
                        className="mr-4 py-2 px-4 text-white rounded-md transition-all duration-300 transform hover:scale-110"
                      >
                        <span className="text-3xl w-12 h-12">
                          <FcFullTrash />
                        </span>
                      </button>
                      <button
                        onClick={() =>
                          router.push(`/products/edit/${product.id}`)
                        }
                        className="py-2 px-4 text-white rounded-md transition-all duration-300 transform hover:scale-110"
                      >
                        <span className="text-3xl w-12 h-12">
                          <FcEditImage />
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Modal  */}
      {selectedProductId && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-64 p-4 rounded shadow">
            <h2 className="text-lg font-bold mb-2">Eliminar producto</h2>
            <p>
              ¿Estás seguro de que quieres eliminar el producto con ID{" "}
              {selectedProductId}?
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setSelectedProductId(null)}
                className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  handleDelete(selectedProductId);
                  setSelectedProductId(null);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
