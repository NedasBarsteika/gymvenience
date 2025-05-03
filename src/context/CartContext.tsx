import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';

/* ---------- Types ---------- */
export interface CartItem {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  coverImageUrl: string;
  quantity: number;
}

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  decrementFromCart: (id: number) => void;
  incrementFromCart: (id: number) => void;
  setQuantityInCart: (id: number, newQty: number) => void;
  clearCart: () => void;
}

/* ---------- Helpers ---------- */
const CART_KEY = 'cart';

const loadCart = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
};

/* ---------- Context ---------- */
const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // 1. initialise from localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(loadCart);

  // 2. persist every update
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  /* ---------- CRUD ---------- */
  const addToCart = (item: CartItem) =>
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i,
        );
      }
      return [...prev, item];
    });

  const removeFromCart = (id: number) =>
    setCartItems((prev) => prev.filter((i) => i.id !== id));

  const decrementFromCart = (id: number) =>
    setCartItems((prev) =>
      prev.reduce<CartItem[]>((acc, item) => {
        if (item.id === id) {
          if (item.quantity > 1) acc.push({ ...item, quantity: item.quantity - 1 });
          // if quantity was 1 → remove item
        } else {
          acc.push(item);
        }
        return acc;
      }, []),
    );

  const incrementFromCart = (id: number) =>
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );

  const setQuantityInCart = (id: number, newQty: number) => {
    if (newQty < 1) newQty = 1;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item,
      ),
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        decrementFromCart,
        incrementFromCart,
        setQuantityInCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
