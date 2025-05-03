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
import SuccessPage   from './pages/successPage';
import CancelPage    from './pages/cancelPage';
import OrderPage from './pages/orders';
import SchedulePage from './pages/schedules';
import SchedulesEdit from './pages/schedulesEdit';
import AboutPage from './pages/about';
import TrainerPage from './pages/trainer';
import AdminPage from './pages/admin/admin';
import AdminRoute from './components/AdminRoute';
import AdminTrainersPage from './pages/admin/trainers';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/parduotuve" element={<ShopPage />} />
          <Route path="/treneriai" element={<TrainersPage />} />
          <Route path="/treneriai/:trainer/Name" element={<TrainerPage />} />

          <Route path="/apie" element={<AboutPage />} />

          <Route path="/profilis" element={<ProfilePage />} />
          <Route path="/profilis/uzsakymai" element={<OrderPage />} />
          <Route path="/profilis/vizitai" element={<SchedulePage />} />

          <Route path="/profilis/laikas" element={<SchedulesEdit />} />

          <Route path="/registracija" element={<SignUpPage />} />
          <Route path="/prisijungimas" element={<LoginPage />} />
          <Route path="/Atsiskaitymas" element={<CheckoutPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/cancel"  element={<CancelPage  />} />
          <Route path="/admin" element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          } />

          <Route path="/admin/treneriai" element={
            <AdminRoute>
              <AdminTrainersPage />
            </AdminRoute>
          } />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
