// src/components/Navbar.tsx
import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation()

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<{ name: string; surname: string } | null>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const handleSignOut = async () => {
    try {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setIsAuthenticated(false);
      setIsAdmin(false);
      localStorage.setItem("user", "");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
      const adminStatus = JSON.parse(localStorage.getItem("user") || '{}').isAdmin;
      if (adminStatus === true) {
        setIsAdmin(true);
      }
    }
  }, []);

  return (
    <nav className="bg-black border-gray-200 dark:bg-white-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="font-semibold block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent text-2xl"
        >
          Gymvenience
        </Link>
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div id="navbar-default" className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`}>
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-black-100 rounded-lg bg-black-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-black dark:bg-black-800 md:dark:bg-black-900 dark:border-gray-700">
            <li>
              <Link
                to="/parduotuve"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Parduotuvė
              </Link>
            </li>
            <li>
              <a
                href="/treneriai"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Treneriai
              </a>
            </li>
            <li>
              <a
                href="/kontaktai"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Kontaktai
              </a>
            </li>
            {isAuthenticated ? (
              <li className="relative">
                <button onClick={toggleDropdown} className="flex items-center space-x-1 focus:outline-none hover:cursor-pointer">
                  <img src="./Images/avatar.png" alt="Avatar" className="rounded-full w-7 h-7" />
                  <span className="text-white">&#9662;</span>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <div className="px-4 py-2 text-sm text-gray-700">{user?.name} {user?.surname}</div>
                    <Link to="/profilis" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profilis</Link>
                    {isAdmin && (
                      <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Admin puslapis</Link>
                    )}
                    <button onClick={handleSignOut} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 hover:cursor-pointer">Atsijungti</button>
                  </div>
                )}
                
              </li>
              
            ) : (
              <li className="relative">
                <button onClick={toggleDropdown} className="focus:outline-none hover:cursor-pointer">
                  <img src="./Images/avatar.png" alt="Avatar" className="rounded-full w-7 h-7" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <Link to="/prisijungimas" state={{ from: location.pathname }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Prisijungti</Link>
                  </div>
                )}
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
