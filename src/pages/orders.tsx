// src/pages/orders.tsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import OrderCard from '../components/OrderCard';
import { motion } from "framer-motion";

const products = [
    { id: 3214, name: 'Proteino milteliai', price: 20.00, dateOrdered: "2025/03/08 13:38", dateFulfilled: "2025/03/12 15:23", },
    { id: 5342, name: 'Sporto pirštinės', price: 15.99, dateOrdered: "2025/02/18 11:35", dateFulfilled: "2025/02/22 10:45", },
    { id: 4315, name: 'Fitneso apyrankė', price: 49.99, dateOrdered: "2025/03/10 09:11", dateFulfilled: "2025/03/16 18:54", },
];

function OrderPage() {

    return (
        <>
            <title>Gymvenience | Užsakymai</title>

            <div className="flex flex-col min-h-screen relative">
                <Navbar />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className=""
                >
                    <div className="w-full p-5">
                        <h1 className="text-center font-bold mb-4 text-[50px]">MANO UŽSAKYMAI</h1>
                        <p className="text-left mb-4 ml-10 text-[30px] border-b-2 w-3/10">UŽSAKYMŲ ISTORIJA</p>
                    </div>

                    <section id="shop" className="w-full pt-4 pl-10 min-h-screen gap-3 flex flex-col justify-left overflow-auto">
                        {products.map(product => (
                            <OrderCard key={product.id} {...product} />
                        ))}
                    </section>
                </motion.div>

                <Footer />
            </div>
        </>

    );

}
export default OrderPage;