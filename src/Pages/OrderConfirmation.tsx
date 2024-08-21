import { useDispatch, useSelector } from 'react-redux';                                        // Import hooks from react-redux to interact with the Redux store.
import { AppDispatch, RootState } from '../app/store';
import { removeOrder, selectOrders } from '../features/orderSlice';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const OrderConfirmation = () => {

    const orders = useSelector((state: RootState) => selectOrders(state));
    const dispatch = useDispatch<AppDispatch>();
    const { orderId } = useParams<{ orderId: string }>();
    const singleorder = orders.filter((order) => order.orderId === orderId);

    const location = useLocation();
    const { totalPrice } = location.state as { totalPrice: number };

    const handleRemoveOrder = (orderId: string) => {
        dispatch(removeOrder({ orderId }));
    }

    return (<>
        <section className="py-24 flex flex-col items-center ">
         {singleorder.map((order) => (<div className="w-full max-w-7xl px-4 md:px-5 lg-6 flex flex-col items-center">
                <h2 className="font-manrope font-extrabold text-6xl leading-10 text-black text-center">
                    Payment Successful
                </h2>
                <p className="mt-4 font-normal text-xl leading-8 text-gray-500 mb-11 text-center">Thanks for making a purchase
                    you can
                    check our order summary from below</p>
                <div className="main-box border border-gray-200 rounded-xl pt-8 px-8 max-w-4xl lg:max-w-full shadow-xl">
                    <div
                        className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
                        <div className="data">
                            <p className="font-semibold text-lg leading-7 text-black">Order Id: <span className="text-indigo-600 font-bold text-xl">#{order.orderId}</span></p>
                            <p className="font-semibold text-lg leading-7 text-black mt-4">Order Payment : <span className="text-gray-400 font-medium text-xl"> 18th march
                                2021</span></p>
                        </div>
                        <button
                            className="rounded-full py-3 px-7 font-semibold text-sm leading-7 text-white bg-indigo-600 max-lg:mt-5 shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400">Track
                            Your Order</button>
                    </div>
                    {order.orderitems.map((item) => (<div className="w-full px-3 min-[400px]:px-6">
                        <div className="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full">
                            <div className="img-box max-lg:w-full">
                                <img src={item.image} alt="image"
                                    className="aspect-square w-full sm:max-w-[200px] rounded-xl" />
                            </div>
                            <div className="flex flex-row items-center w-full ">
                                <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                                    <div className="flex items-center">
                                        <div className="">
                                            <h2 className="font-semibold text-2xl leading-8 text-black mb-3">
                                                {item.title}</h2>
                                            <p className="font-normal text-lg leading-8 text-gray-500 mb-3 ">
                                                By: Dust Studios</p>
                                            <div className="flex items-center ">
                                                <p
                                                    className="font-medium text-xl leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                                                    Size: <span className="text-gray-500">Large</span></p>
                                                <p className="font-medium text-xl leading-7 text-black ">Qty: <span
                                                    className="text-gray-500">{item.quantity}</span></p>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="grid grid-cols-5">
                                        <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                                            <div className="flex flex-row gap-3 lg:block">
                                                <p className="font-medium text-xl leading-7 text-black">price</p>
                                                <p className="lg:mt-4 font-medium text-xl leading-7 text-red-600">${item.price}</p>
                                            </div>
                                        </div>
                                        <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                                            <div className="flex gap-3 lg:block">
                                                <p className="font-medium text-xl leading-7 text-black">Status
                                                </p>
                                                <p
                                                    className="font-medium text-xl leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 bg-emerald-50 text-emerald-600">
                                                    Ready for Delivery</p>
                                            </div>

                                        </div>
                                        <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                                            <div className="flex gap-3 lg:block">
                                                <p className="font-medium text-xl whitespace-nowrap leading-6 text-black">
                                                    Expected Delivery Time</p>
                                                <p className="font-medium text-xl whitespace-nowrap leading-7 lg:mt-3 text-emerald-500">
                                                    23rd March 2021</p>
                                            </div>

                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>

                    </div>))}
                    <div className="w-full border-t border-gray-200 px-6 flex flex-col lg:flex-row items-center justify-between ">
                        <div className="flex flex-col sm:flex-row items-center max-lg:border-b border-gray-200">
                            <button
                                className="flex outline-0 py-6 sm:pr-6  sm:border-r border-gray-200 whitespace-nowrap gap-2 items-center justify-center font-bold group text-2xl text-black bg-white transition-all duration-500 hover:text-red-600"
                                onClick={() => handleRemoveOrder(order.orderId)}>
                                <svg className="stroke-black transition-all duration-500 group-hover:stroke-red-600" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
                                    fill="none">
                                    <path d="M5.5 5.5L16.5 16.5M16.5 5.5L5.5 16.5" stroke="" stroke-width="1.6"
                                        stroke-linecap="round" />
                                </svg>
                                Cancel Order
                            </button>
                            <p className="font-medium text-xl text-gray-900 pl-6 py-3 max-lg:text-center">Paid using Credit Card <span className="text-gray-500">ending with 8822</span></p>
                        </div>
                        <p className="font-extrabold text-3xl text-black py-6">Total Price: <span className="text-red-600
                        "> ${totalPrice.toFixed(2)}</span></p>
                    </div>

                </div>
            </div>))}
        </section>
    </>)
}


export default OrderConfirmation;