// src/components/ProductCard.tsx
import React from 'react';

interface OrderDetailsProps {
    id: number;
    name: string;
    price: number;
    dateOrdered: string;
    dateFulfilled: string;
}

const OrderCard: React.FC<OrderDetailsProps> = ({ id, name, price, dateOrdered, dateFulfilled}) => {


    return (
        <div className="bg-white max-w-7/10 border-3 rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
            <h2 className="text-xl font-semibold mb-2 text-center">#{id}</h2>

            <div className="ml-5 mb-3">
                <p className="font-bold">{name}</p>
                <p className="font-bold">€{price}</p>
                <p>UŽSAKYMO DATA: {dateOrdered}</p>
                <p>PRISTATYMO DATA: {dateFulfilled}</p>
                <button className="mt-2 text-blue-500 font-semibold">Daugiau informacijos &gt;</button>
            </div>
        </div>
    );
};

export default OrderCard;