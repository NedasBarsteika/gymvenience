// src/App.tsx
import { CartProvider } from './context/CartContext';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './pages/home';
import ShopPage from './pages/shop';
import SignUpPage from './pages/signUp';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/parduotuve" element={<ShopPage />} />
          <Route path="/registracija" element={<SignUpPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
