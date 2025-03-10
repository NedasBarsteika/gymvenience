// src/App.tsx
import { CartProvider } from './context/CartContext';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './pages/home';
import ShopPage from './pages/shop';
import SignUpPage from './pages/signUp';
import LoginPage from './pages/login';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/parduotuve" element={<ShopPage />} />

          <Route path="/registracija" element={<SignUpPage />} />
          <Route path="/prisijungimas" element={<LoginPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
