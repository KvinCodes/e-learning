import React, { useState, useEffect } from "react";
import axios from "axios";

const EditProduct = ({ idEdit, setShowModal, getAllProducts }) => {
  const [productData, setProductData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",



  });

  const [loading, setLoading] = useState(false);
  //para cambiar la contraseña
  const [password, setPassword] = useState("");

  const apiUrl = "http://localhost/products/api.php";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/productos/${idEdit}`);
      setProductData(res.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${apiUrl}/productos/${idEdit}`, productData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setShowModal(false);
      getAllProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  useEffect(() => {
    if (idEdit) {
      fetchProduct();
    }
  }, [idEdit]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-40">
      <h2 className="text-2xl font-bold text-center mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="nombre"
            value={productData.nombre}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            name="precio"
            value={productData.precio}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="descripcion"
            value={productData.descripcion}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
