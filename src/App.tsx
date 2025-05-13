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
import SchedulePage from './pages/reservations';
import SchedulesEdit from './pages/schedulesEdit';
import AboutPage from './pages/about';
import TrainerPage from './pages/trainer';
import AdminPage from './pages/admin/admin';
import AdminRoute from './components/AdminRoute';
import AdminTrainersPage from './pages/admin/trainers';
import AdminProductsPage from './pages/admin/products';
import AdminReservationsPage from './pages/admin/reservations';
import AdminOrdersPage from './pages/admin/orders';
import AdminUsersPage from './pages/admin/users';
import HourlyRateEdit from './pages/hourlyRateEdit';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/parduotuve" element={<ShopPage />} />
          <Route path="/treneriai" element={<TrainersPage />} />
          <Route path="/treneriai/:trainerName" element={<TrainerPage />} />

          <Route path="/apie" element={<AboutPage />} />

          <Route path="/profilis" element={<ProfilePage />} />
          <Route path="/profilis/uzsakymai" element={<OrderPage />} />
          <Route path="/profilis/vizitai" element={<SchedulePage />} />

          <Route path="/profilis/laikas" element={<SchedulesEdit />} />
          <Route path="/profilis/kaina" element={<HourlyRateEdit />} />

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
          
          <Route path="/admin/produktai" element={
            <AdminRoute>
              <AdminProductsPage />
            </AdminRoute>
          } />
          
          <Route path="/admin/vizitai" element={
            <AdminRoute>
              <AdminReservationsPage />
            </AdminRoute>
          } />
          
          <Route path="/admin/uzsakymai" element={
            <AdminRoute>
              <AdminOrdersPage />
            </AdminRoute>
          } />
          
          <Route path="/admin/vartotojai" element={
            <AdminRoute>
              <AdminUsersPage />
            </AdminRoute>
          } />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
