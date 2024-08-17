// import { useSelector, useDispatch } from 'react-redux';
// import { RootState, AppDispatch } from '../app/store';
// import { closeCart, removeItem, updateItemQuantity } from '../features/cartSlice';
// import { useNavigate } from 'react-router-dom';


// const Cart = () => {

//   const dispatch: AppDispatch = useDispatch();
//   const navigate = useNavigate();
//   const cartItems = useSelector((state: RootState) => state.cart.items);
//   const isCartOpen = useSelector((state: RootState) => state.cart.isCartOpen);


//   const handleCheckout = () => {
//     navigate('/checkout');
//   };


//   const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

//   return (
//     isCartOpen && (
//     <div className="fixed right-0 top-0 h-full md:h-auto w-full md:w-auto lg:w-1/4 bg-yellow-50 text-black z-50 p-6 border-y-black overflow-y-auto shadow-lg max-h-[90vh] max-w-[60vh]">
//       <button
//         onClick={() => dispatch(closeCart())}
//         className="absolute top-4 right-4 text-3xl text-red-600 hover:text-red-800"
//       >
//         &times;
//       </button>
//       <h2 className="text-3xl font-bold mb-6 text-center justify-center mt-10">Cart ({cartItems.length})</h2>
//       <div>
//         {cartItems.length === 0 ? (
//           <p className="text-5xl font-serif text-black text-center">Your cart is empty.</p>
//         ) : (
//           <ul className="space-y-6">
//             {cartItems.map(item => (
//               <li key={item.id} className="flex items-center space-x-6 p-4 border-b border-gray-300">
//                 <img src={item.image} alt={item.name} className="w-32 h-32 rounded shadow-sm" />
//                 <div className="flex-1">
//                   <span className="block font-semibold text-lg">{item.name}</span>
//                   <span className="block text-2xl text-gray-700 font-bold">${item.price.toFixed(2)}</span>
//                   <div className="flex items-center mt-4 space-x-4">
//                     <button
//                       onClick={() => dispatch(updateItemQuantity({ id: item.id, quantity: item.quantity - 1 }))}
//                       className="bg-yellow-300 hover:bg-yellow-300 text-black px-4 font-bold py-2 rounded shadow"
//                     >
//                       -
//                     </button>
//                     <span className="mx-2 text-2xl font-bold">{item.quantity}</span>
//                     <button
//                       onClick={() => dispatch(updateItemQuantity({ id: item.id, quantity: item.quantity + 1 }))}
//                       className="bg-yellow-300 hover:bg-yellow-300 text-black px-4 py-2 font-bold rounded shadow"
//                     >
//                       +
//                     </button>
//                     <button
//                       onClick={() => dispatch(removeItem(item.id))}
//                       className="bg-red-500 hover:bg-red-600 text-black border-yellow-300 font-medium px-4 py-2 rounded shadow ml-4"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//       {cartItems.length > 0 && (
//         <div className="mt-6 text-center">
//           <h3 className="text-2xl font-bold">Total Price: ${totalPrice.toFixed(2)}</h3>
//           <button
//             onClick={handleCheckout}
//             className="mt-6 bg-green-500 text-white px-8 py-4 rounded-lg shadow-lg hover:bg-green-600 transition duration-300 transform hover:scale-105"
//           >
//             Checkout
//           </button>
//         </div>
//       )}
//     </div>
//   ));
// };

// export default Cart;

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { closeCart, removeItem, updateItemQuantity } from '../features/cartSlice';
import { useNavigate } from 'react-router-dom';


const Cart = () => {

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isCartOpen = useSelector((state: RootState) => state.cart.isCartOpen);

  console.log("sdz",cartItems)
  const handleCheckout = () => {
    navigate('/checkout');
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  return (
    isCartOpen && (
      <div
        className="fixed inset-0 w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] font-sans">
        <div className="w-full max-w-4xl bg-white shadow-lg relative ml-auto h-screen">
          <div className="overflow-auto p-6 h-[calc(100vh-135px)]">
            <div className="flex items-center gap-4 text-gray-800">
              <h3 className="text-2xl font-bold flex-1">Shopping cart</h3>
              <button onClick={() => dispatch(closeCart())}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 ml-2 cursor-pointer shrink-0 fill-black hover:fill-red-500"
                  viewBox="0 0 320.591 320.591"
                >
                  <path
                    d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                    data-original="#000000"
                  ></path>
                  <path
                    d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                    data-original="#000000"
                  ></path>
                </svg>
              </button>
            </div>
  
            <div className="space-y-4 mt-12">
              {cartItems.map((item) => (
                <div className="grid grid-cols-3 items-start gap-4 border border-yellow-300 rounded-3xl p-3">
                  <div className="col-span-2 flex items-start gap-4">
                    <div className="w-60 h-40 max-sm:w-24 max-sm:h-24 shrink-0  p-2 rounded-md">
                      <img
                        src={item.image}
                        className="w-full h-full object-contain"
                      />
                    </div>
  
                    <div className="flex flex-col">
                      <h3 className="text-2xl max-sm:text-sm font-bold text-gray-800">
                      {item.title}
                      </h3>
                      <p className="text-xs font-semibold text-gray-500 mt-0.5">
                        Size: MD
                      </p>
  
                      <button
                        type="button"
                        className="mt-6 text-xl font-semibold text-red-500  flex items-center gap-1 shrink-0"
                        onClick={() => dispatch(removeItem(item.id))}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 fill-current inline min-w-6"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                            data-original="#000000"
                          ></path>
                          <path
                            d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                            data-original="#000000"
                          ></path>
                        </svg>
                        REMOVE
                      </button>
                    </div>
                  </div>
  
                  <div className="ml-auto">
                    <h4 className="text-xl max-sm:text-base font-bold text-gray-800">
                      ${item.price}
                    </h4>
  
                    <button
                      type="button"
                      className="mt-6  flex items-center   border border-gray-300 text-gray-800 text-xl outline-none bg-transparent rounded-md"
                    >
                      <button className="p-3 hover:bg-gray-200 " onClick={() => {
                        if (item.quantity === 1) {
                          dispatch(removeItem(item.id));
                        } else {
                          dispatch(updateItemQuantity({ id: item.id, quantity: item.quantity - 1 }));
                        }
                      }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-2.5 fill-current min-w-4"
                          viewBox="0 0 124 124"
                        >
                          <path
                            d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                            data-original="#000000"
                          ></path>
                        </svg>
                      </button>

                      <span className="mx-3 font-bold">{item.quantity}</span>
                      <button  className = "p-3 hover:bg-gray-200" onClick={() => dispatch(updateItemQuantity({ id: item.id, quantity: item.quantity + 1 }))}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-2.5 fill-current min-w-4 "
                        viewBox="0 0 42 42"
                      >
                        <path
                          d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                          data-original="#000000"
                        ></path>
                      </svg>
                      </button>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="pr-11 py-11  absolute bottom-0 w-full border-t bg-white ">
          <ul className="text-gray-800 divide-y">
            <li className="flex flex-wrap gap-4 text-3xl font-bold">Subtotal <span className="ml-auto">${totalPrice.toFixed(2)}</span></li>
          </ul>
          <button type="button" className="mt-6 text-xl font-semibold px-6 py-3 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md tracking-wide" onClick={handleCheckout}>Make Payment</button>
        </div>
          </div>
        </div>
      </div>
    )
  );
  
};

export default Cart;





