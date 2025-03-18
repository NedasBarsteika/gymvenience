// src/App.tsx
import { CartProvider } from './context/CartContext';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './pages/home';
import ShopPage from './pages/shop';
import SignUpPage from './pages/signUp';
import LoginPage from './pages/login';
import TrainersPage from './pages/trainers';
import ProfilePage from './pages/profilePage';
import CheckoutPage from './pages/checkout';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/parduotuve" element={<ShopPage />} />
          <Route path="/treneriai" element={<TrainersPage />} />
          {/* <Route path="/treneriai/:trainerName" element={<TrainerPage />} /> */}
          <Route path="/profilis" element={<ProfilePage />} />

          <Route path="/registracija" element={<SignUpPage />} />
          <Route path="/prisijungimas" element={<LoginPage />} />
          <Route path="/Atsiskaitymas" element={<CheckoutPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
