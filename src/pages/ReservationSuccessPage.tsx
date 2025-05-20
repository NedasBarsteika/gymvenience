import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface JwtPayload { exp: number; }

const isTokenExpired = (token: string): boolean => {
  try {
    const { exp } = jwtDecode<JwtPayload>(token);
    return Date.now() / 1000 >= exp;
  } catch {
    return true;
  }
};

export default function ReservationSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("session_id") || "";
  const [error, setError] = useState<string | null>(null);
  const didCallRef = useRef(false);

  useEffect(() => {
    // Prevent double‐invoke in React 18 Strict Mode
    if (didCallRef.current) return;
    didCallRef.current = true;

    const token = localStorage.getItem("authToken");
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("authToken");
      navigate("/prisijungimas", {
        state: { from: `/reservation-success?session_id=${sessionId}` },
      });
      return;
    }

    axios
      .post(
        "https://localhost:7296/api/payment/complete-reservation",
        { sessionId },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        // nothing further; success UI will show
      })
      .catch((err) => {
        console.error("Stripe completion error response:", err.response?.data);
        const respData = err.response?.data as any;
        const msg =
          respData?.error || respData?.message || "Serverio klaida. Bandykite vėliau.";
        setError(msg);
      });
  }, [sessionId, navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow p-6 flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white p-6 rounded shadow text-center">
          {error ? (
            <>
              <h1 className="text-2xl font-bold text-red-600 mb-4">Klaida</h1>
              <p className="mb-6">{error}</p>
              <button
                onClick={() =>
                  navigate("/prisijungimas", {
                    state: { from: `/reservation-success?session_id=${sessionId}` },
                  })
                }
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Prisijungti
              </button>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-4">Rezervacija sėkminga!</h1>
              <p className="mb-6">Jūsų laikas sėkmingai užrezervuotas.</p>
              <button
                onClick={() => navigate("/")}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Grįžti į pradžią
              </button>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
