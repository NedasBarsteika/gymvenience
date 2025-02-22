import { motion } from 'framer-motion'
import '../App.css'
import { useState } from 'react';

function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className='flex-grow'
      >
        {/* NAVBAR */}
        <nav className="bg-black border-gray-200 dark:bg-white-900">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a className="font-semibold block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent text-2xl" href="/">
              Gymvenience
            </a>
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
            <div
              id="navbar-default"
              className={`${isMenuOpen ? "block" : "hidden"
                } w-full md:block md:w-auto`}
            >
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-black-100 rounded-lg bg-black-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-black dark:bg-black-800 md:dark:bg-black-900 dark:border-gray-700">
                <li>
                  <a
                    href="#parduotuve"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Parduotuvė
                  </a>
                </li>
                <li>
                  <a
                    href="#treneriai"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Treneriai
                  </a>
                </li>
                <li>
                  <a
                    href="#kontaktai"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Kontaktai
                  </a>
                </li>
                <li>
                  <img
                    src="./Images/avatar.png"
                    alt="Avatar"
                    className="rounded-full w-7 h-7 hidden md:block"
                  />
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* HERO SECTION */}
        <section className="flex justify-center my-6 max-w-screen-xl mx-auto">
          <img src="./Images/example5.gif" alt="Fitness Banner" className="rounded-xl shadow-lg w-full" />
        </section>

        {/* CARDS SECTION */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-screen-xl mx-auto p-6">
          <a href="/parduotuve" className="p-6 border rounded-xl shadow-lg text-center hover:shadow-xl block bg-gray-100">
            <img src="./Images/protein.jpg" alt="Parduotuvė" className="mx-auto mb-4 h-55 object-cover" />
            <h2 className="text-xl font-bold text-black mt-10">Parduotuvė</h2>
          </a>
          <a href="/treneriai" className="p-6 border rounded-xl shadow-lg text-center hover:shadow-xl block bg-gray-100">
            <img src="./Images/trainer.jpg" alt="Treneriai" className="mx-auto mb-4 h-55 object-cover" />
            <h2 className="text-xl font-bold text-black mt-10">Treneriai</h2>
          </a>
          <a href="/kontaktai" className="p-6 border rounded-xl shadow-lg text-center hover:shadow-xl block bg-gray-100">
            <img src="./Images/phone.webp" alt="Kontaktai" className="mx-auto mb-4 h-55 object-cover" />
            <h2 className="text-xl font-bold text-black mt-10">Kontaktai</h2>
          </a>
        </section>
      </motion.div>

      {/* FOOTER */}
      <footer className='py-5 text-center bg-black text-white mt-auto'>
        <p>© 2025 Gymvenience - All Rights Reserved</p>
      </footer>
    </div>
  )
}

export default HomePage
