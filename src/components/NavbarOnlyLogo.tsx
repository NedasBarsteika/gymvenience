// src/components/NavbarOnlyLogo.tsx
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-black border-gray-200 dark:bg-white-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="font-semibold block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent text-2xl"
        >
          Gymvenience
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
