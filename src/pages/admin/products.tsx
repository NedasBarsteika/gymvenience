// src/pages/admin/products.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

interface Product {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  coverImageUrl: string;
}

const ITEMS_PER_PAGE = 5;

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [form, setForm] = useState({
    name: "",
    category: "",
    quantity: 0,
    price: 0,
    coverImageUrl: ""
  });

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const endpoint = search
          ? `/products/search?search=${search}`
          : "/products/search";
        const response = await axios.get(`https://localhost:7296${endpoint}`);
        setProducts(response.data);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search]);

  const handleDelete = async (productId: string) => {
    await axios.delete(`https://localhost:7296/product/delete/${productId}`);
    setProducts((prev) => prev.filter((t) => t.id !== productId));
  };

  const handleSubmit = async () => {
    if (editProduct) {
      await axios.put(`https://localhost:7296/product/update/${editProduct.id}`, form);
    } else {
      await axios.post("https://localhost:7296/product/create", form);
    }
    setModalOpen(false);
    setEditProduct(null);
    setSearch("");
  };

  const openModal = (product?: Product) => {
    if (product) setEditProduct(product);
    else setEditProduct(null);
    setForm(product || { name: "", category: "", quantity: 0, price: 0, coverImageUrl: "" });
    setModalOpen(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === "price" || name === "quantity" ? Math.max(0, Number(value)) : value }));
  };

  const paginatedProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-grow p-4 max-w-screen-xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          Produktų administravimas
        </h1>

        <div className="flex flex-col md:flex-row gap-4 justify-center mb-6">
          <input
            type="text"
            placeholder="Ieškoti produktų..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border border-gray-500 rounded w-full md:w-1/2 h-12"
          />
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-4 h-12 rounded cursor-pointer"
            onClick={() => openModal()}
          >
            Pridėti produktą
          </button>
        </div>

        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : loading ? (
          <p className="text-center">Kraunama...</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left">Nuotrauka</th>
                    <th className="p-3 text-left">Pavadinimas</th>
                    <th className="p-3 text-left">Kategorija</th>
                    <th className="p-3 text-left">Kiekis</th>
                    <th className="p-3 text-left">Kaina</th>
                    <th className="p-3 text-left">Veiksmai</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedProducts.map((t) => (
                    <tr key={t.id} className="border-t">
                      <td className="p-3">
                        <img
                          src={t.coverImageUrl || ""}
                          className="w-12 h-12 object-cover rounded cursor-pointer"
                          onClick={() => setModalImage(t.coverImageUrl || "")}
                        />
                      </td>
                      <td className="p-3">{t.name}</td>
                      <td className="p-3">{t.category}</td>
                      <td className="p-3">{t.quantity}</td>
                      <td className="p-3">{t.price}</td>
                      <td className="p-3 space-x-2 flex">
                        <button
                          className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-white cursor-pointer"
                          onClick={() => openModal(t)}
                        >
                          Redaguoti
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white cursor-pointer"
                          onClick={() => handleDelete(t.id)}
                        >
                          Ištrinti
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center mt-4 space-x-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    className={`px-3 py-1 rounded ${
                      currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
                    } cursor-pointer`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </motion.div>

      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
          onClick={() => setModalImage(null)}
        >
          <img
            src={modalImage}
            alt="Product"
            className="max-w-full max-h-full"
          />
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-95 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96 space-y-4">
            <h2 className="text-xl font-bold mb-4">{editProduct ? "Redaguoti produktą" : "Naujas produktas"}</h2>

            <label>Pavadinimas:</label>
            <input name="name" value={form.name} onChange={handleFormChange} className="w-full p-2 border rounded" />
            <label>Kategorija:</label>
            <input name="category" value={form.category} onChange={handleFormChange} className="w-full p-2 border rounded" />
            <label>Kiekis:</label>
            <input name="quantity" type="number" value={form.quantity} onChange={handleFormChange} className="w-full p-2 border rounded" />
            <label>Kaina:</label>
            <input name="price" type="number" value={form.price} onChange={handleFormChange} className="w-full p-2 border rounded" />
            <label>Nuotraukos nuoroda:</label>
            <input name="coverImageUrl" value={form.coverImageUrl} onChange={handleFormChange} className="w-full p-2 border rounded" />

            <div className="flex justify-between pt-2">
              <button className="bg-gray-400 px-4 py-2 rounded text-white cursor-pointer" onClick={() => setModalOpen(false)}>Atšaukti</button>
              <button className="bg-blue-600 px-4 py-2 rounded text-white cursor-pointer" onClick={handleSubmit}>{editProduct ? "Atnaujinti" : "Sukurti"}</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
