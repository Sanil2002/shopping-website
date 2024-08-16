import { useState, useEffect } from 'react';

interface ProductData {         // Defining a TypeScript interface `ProductData` that describes the shape of the data this hook will manage.
  symbol: string;               // `symbol` is a string representing the product symbol (e.g., a stock or cryptocurrency symbol).
  price: number;                // `price` is a number representing the current price of the product.
}

const useProductData = (): ProductData[] => {                           //THe Custom-hook
  const [ProductData, setProductData] = useState<ProductData[]>([]);

  useEffect(() => {
    const socket = new WebSocket('wss://stream.binance.com:9443/ws/!ticker@arr');

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const updatedData = message.map((data: any) => ({
        symbol: data.s,
        price: parseFloat(data.c),
      }));
      setProductData(updatedData);
      
    };

    socket.onerror = (error) => {                         
      console.error('WebSocket error:', error);           
    };

    return () => {                                        // Cleaning up the WebSocket connection when the component using this hook unmounts.
      socket.close();                                     // This prevents memory leaks and ensures the connection is properly closed.
    };
  }, []);                                        // The empty dependency array `[]` ensures this effect runs only once when the component mounts.

  return ProductData;
  
  
};

export default useProductData;
