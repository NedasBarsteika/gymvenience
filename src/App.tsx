import './App.css';
import { motion } from 'framer-motion';
import HomePage from './pages/home';
import ShopPage from './pages/shop';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/parduotuve" element={<ShopPage />} />
          </Routes>
        </Router>
      </motion.div>
    </div>
  );
}

export default App;