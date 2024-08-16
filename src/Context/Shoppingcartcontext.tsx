// import { createContext, ReactNode, useContext, useEffect, useState } from "react";
// import Cart from "../Components/Cart";
// import { useAuth0 } from "@auth0/auth0-react";
// import { getAllProducts, initDB } from "../Utilities/db";

// type ShoppingcartproviderProps = {
//     children: ReactNode
// }

// type Product = {
//     id: number
//     name: string
//     price: number
//     image: string
// }

// type cartItem = {
//     id: number
//     quantity: number
// }

// type Shoppingcartcontext = {
//     openCart: () => void
//     closeCart: () => void
//     getItemQuantity: (id: number) => number
//     increaseCartQuantity: (id: number) => void
//     decreaseCartQuantity: (id: number) => void
//     removeFromCart: (id: number) => void
//     cartQuantity: number
//     cartItems: (cartItem & Product)[]
//     isOpen: boolean;
// }

// const Shoppingcartcontext = createContext({} as Shoppingcartcontext);

// export function useShoppingcart() {
//     return useContext(Shoppingcartcontext);
// }

// export function Shoppingcartprovider({ children }: ShoppingcartproviderProps) {
//     const [isOpen, setIsOpen] = useState(false);
//     const [cartItems, setCartItems] = useState<(cartItem & Product)[]>([]);

//     const cartQuantity = cartItems.length;
//     const {user, isAuthenticated} = useAuth0();
//     const openCart = () => {isAuthenticated ? setIsOpen(true) : alert("Login")}
//     const closeCart = () => setIsOpen(false);


    

//     //For getting the current cartitems from the localstorage
//     useEffect(() => {
//         if (user?.email) {
//           const storedCarts = localStorage.getItem('carts');
//           const carts = storedCarts ? JSON.parse(storedCarts) : {};
//           setCartItems(carts[user.email] || []);
//         }
//       }, [user?.email]);






//     //Update Local storage whenever the cart items change
//     useEffect(() => {
//         if(user?.email) {
//             const storedCarts = localStorage.getItem('carts');
//             const carts = storedCarts ? JSON.parse(storedCarts) : {};
//             carts[user.email]=cartItems; //Update the user's cart
//             localStorage.setItem('carts',JSON.stringify(carts)); //save all carts

//         }
//     }, [cartItems,user?.email]);




//     function getItemQuantity(id: number) {
//         return cartItems.find(item => item.id === id)?.quantity || 0;
//     }
    

//     // async function fetchProductById(id: number): Promise<Product | null> {
//     //     try {
//     //         const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
//     //         return response.data;
//     //     } catch (error) {
//     //         console.error('Error fetching product:', error);
//     //         return null;
//     //     }
//     // }

//     async function fetchProductById(id: number): Promise<Product | null> {
//         try {
//             const db = await initDB();
//             const products = await getAllProducts(db);
//             const foundProduct = products.find((p: any) => p.id == Number(id!));
//             if(foundProduct){
//                 return foundProduct;
//             }else{
//                 return null
//             }
//         } catch (error) {
//             console.error('Error fetching product:', error);
//             return null;
//         }
//     }

//     function increaseCartQuantity(id: number) {
//         fetchProductById(id).then(product => {
//             setCartItems(currItems => {
//                 const existingItem = currItems.find(item => item.id === id);
//                 if (existingItem == null && product) {
//                     return [...currItems, { ...product, id, quantity: 1 }];
//                 } else {
//                     return currItems.map(item => {
//                         if (item.id === id) {
//                             return { ...item, quantity: item.quantity + 1 };
//                         } else {
//                             return item;
//                         }
//                     });
//                 }
//             });
//         });
//     }

//     function decreaseCartQuantity(id: number) {
//         setCartItems(currItems => {
//             if (currItems.find(item => item.id === id)?.quantity === 1) {
//                 return currItems.filter(item => item.id !== id);
//             } else {
//                 return currItems.map(item => {
//                     if (item.id === id) {
//                         return { ...item, quantity: item.quantity - 1 };
//                     } else {
//                         return item;
//                     }
//                 });
//             }
//         });
//     }

//     function removeFromCart(id: number) {
//         setCartItems(currItems => currItems.filter(item => item.id !== id));
//     }

//     return (
//         <Shoppingcartcontext.Provider value={{ isOpen, getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, cartItems, cartQuantity, openCart, closeCart }}>
//             {children}
//             <Cart />
//         </Shoppingcartcontext.Provider>
//     );
// }


