import React from 'react';
import { useSelector, useDispatch } from 'react-redux';                                        // Import hooks from react-redux to interact with the Redux store.
import { RootState, AppDispatch } from '../app/store';
import { useNavigate } from 'react-router-dom';
import { addOrder, OrderItem } from '../features/orderSlice';
import { clearCart } from '../features/cartSlice';
import { useAuth0 } from '@auth0/auth0-react';

const CheckoutSuccess: React.FC = () => {


  const cartItems = useSelector((state: RootState) => state.cart.items); 
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useAuth0();
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    if (!user?.email) {
      console.error('User email is not available.');
      return;
    }

    const orderId = Date.now().toString();
  
    // Convert CartItem to OrderItem
    const orderitems = cartItems.map(item => ({
      ...item,
      id: item.id.toString(), // Ensure ID is a string if necessary
      orderid: orderId,
      email: user.email, // User email
    }));
  
    console.log("orderItems", orderitems);
  
    // Function to update local storage
    const updateLocalStorage = () => {
      return new Promise<void>((resolve, reject) => {
        try {
          // Retrieve existing orders from local storage
          const existingOrdersJson = localStorage.getItem('orders');
          const existingOrders: { orderId: string; orderitems: OrderItem[] }[] = existingOrdersJson ? JSON.parse(existingOrdersJson) : [];
  
          // Append new orders to existing orders
          const updatedOrders = [...existingOrders, { orderId, orderitems }];
  
          // Save updated orders to local storage
          localStorage.setItem('orders', JSON.stringify(updatedOrders));
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    };
  
    try {
      // Save order to Redux store
      dispatch(addOrder({ orderId, orderitems }));
  
      // Update local storage (asynchronously)
      await updateLocalStorage();
  
      // Clear the cart
      dispatch(clearCart());
  
      // Navigate to order confirmation page
      navigate(`/OrderConfirmation/${orderId}`, { state: { totalPrice } });
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };
  



  
  const handleNavigateToAbout = () => {
    navigate('/About')
  }




  return (
    <div><div className="relative mx-auto w-full bg-white">
    <div className="grid min-h-screen grid-cols-10">
      <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
        <div className="mx-auto w-full max-w-3xl">
          <h1 className="relative text-4xl font-bold text-gray-700 sm:text-3xl">Secure Checkout<span className="mt-2 block h-1 w-10 bg-teal-600 sm:w-20"></span></h1>
          <form action="" className="mt-10 flex flex-col space-y-4">
            <div><label className="text-xl font-bold text-gray-500">Email</label><input type="email" id="email" name="email" placeholder="john.capler@fang.com" className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" /></div>
            <div className="relative"><label className="text-xl font-bold text-gray-500">Card number</label><input type="text" id="card-number" name="card-number" placeholder="1234-5678-XXXX-XXXX" className="block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" /><img src="/images/uQUFIfCYVYcLK0qVJF5Yw.png" alt="" className="absolute bottom-3 right-3 max-h-4" /></div>
            <div>
              <p className="text-xl font-bold text-gray-500">Expiration date</p>
              <div className="mr-6 flex flex-wrap">
                <div className="my-1">
                  <label className="sr-only bg-red-300">Select expiration month</label>
                  <select name="month" id="month" className="cursor-pointer rounded border-gray-300 bg-gray-50 py-3 px-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500">
                    <option value="">Month</option>
                  </select>
                </div>
                <div className="my-1 ml-3 mr-6">
                  <label className="sr-only">Select expiration year</label>
                  <select name="year" id="year" className="cursor-pointer rounded border-gray-300 bg-gray-50 py-3 px-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500">
                    <option value="">Year</option>
                  </select>
                </div>
                <div className="relative my-1"><label  className="sr-only">Security code</label><input type="text" id="security-code" name="security-code" placeholder="Security code" className="block w-36 rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" /></div>
              </div>
            </div>
            <div><label className="sr-only">Card name</label><input type="text" id="card-name" name="card-name" placeholder="Name on the card" className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" /></div>
          </form>
          <p className="mt-10 text-center text-lg font-bold text-gray-500">By placing this order you agree to the <div onClick={handleNavigateToAbout} className="whitespace-nowrap text-teal-400 underline hover:text-teal-600">Terms and Conditions</div></p>
          <button type="submit" onClick={handlePlaceOrder} className="mt-4 inline-flex w-full items-center justify-center rounded bg-teal-600 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 sm:text-lg">Place Order</button>
        </div>
      </div>
      <div className="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
        <h2 className="sr-only">Order summary</h2>
        <div>
          <img src="https://images.unsplash.com/photo-1581318694548-0fb6e47fe59b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-teal-800 to-teal-400 opacity-95"></div>
        </div>
        <div className="relative">
          {cartItems.map((item) => (
            <ul className="space-y-5">
            <li className="flex justify-between">
              <div className="inline-flex">
              <div className="w-40 h-40 max-sm:w-24 max-sm:h-24 shrink-0  p-2 rounded-md">
                      <img
                        src={item.image}
                        className="w-full h-full"
                      />
                    </div>
                <div className="ml-3">
                  <p className="text-2xl font-extrabold text-white">{item.title}</p>
                  <p className="text-sm font-medium text-white text-opacity-80">offer-price</p>
                </div>
              </div>
              <p className="text-xl font-extrabold text-white">${item.price}</p>
            </li>
          </ul>))}
          <div className="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
          <div className="space-y-2">
            <p className="flex justify-between text-4xl font-extrabold text-white"><span>Total price:</span><span className='text-5xl'>${totalPrice.toFixed(2)}</span></p>
            <p className="flex justify-between text-xl font-medium text-white"><span>Vat: 10%</span><span>$55.00</span></p>
          </div>
        </div>
        <div className="relative mt-10 text-white">
          <h3 className="mb-5 text-2xl font-bold">Support</h3>
          <p className="text-lg font-bold">+01 653 235 211 <span className="font-light text-lg">(International)</span></p>
          <p className="mt-1 text-lg font-bold">sanilm@netstratum.com <span className="font-light text-lg">(Email)</span></p>
          <p className="mt-2 text-lg font-bold">Call us now for payment related issues</p>
        </div>
        <div className="relative mt-10 flex">
          <p className="flex flex-col"><span className="text-sm font-bold text-white">Money Back Guarantee</span><span className="text-xs font-medium text-white">within 30 days of purchase</span></p>
        </div>
      </div>
    </div>
  </div>
  </div>
  );
};

export default CheckoutSuccess;
