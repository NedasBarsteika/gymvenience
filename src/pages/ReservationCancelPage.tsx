import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ReservationCancelPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow p-6 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-6 rounded shadow text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Mokėjimas atšauktas
          </h1>
          <p className="mb-6">Mokėjimas nebuvo įvykdytas.</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-600 text-white rounded mr-2"
          >
            Bandykite dar kartą
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Grįžti į pradžią
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
