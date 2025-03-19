// src/App.tsx
import { CartProvider } from './context/CartContext';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './pages/home';
import ShopPage from './pages/shop';
import SignUpPage from './pages/signUp';
import LoginPage from './pages/login';
import TrainersPage from './pages/trainers';
import ProfilePage from './pages/profile';
import CheckoutPage from './pages/checkout';
import OrderPage from './pages/orders';
import SchedulePage from './pages/schedules';

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
          <Route path="/profilis/uzsakymai" element={<OrderPage />} />
          <Route path="/profilis/vizitai" element={<SchedulePage />} />

          <Route path="/registracija" element={<SignUpPage />} />
          <Route path="/prisijungimas" element={<LoginPage />} />
          <Route path="/Atsiskaitymas" element={<CheckoutPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
