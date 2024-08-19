import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
// import { useShoppingcart } from '../Context/Shoppingcartcontext';
import { addItem, removeItem, selectCartItemQuantity, updateItemQuantity } from '../features/cartSlice';
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect,useState } from "react";
import UpdateModal from "../Components/Update-Modal";
import { initDB, getAllProducts, deleteProduct } from '../Utilities/db';

interface ProductDetails {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

const SingleProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();                                  //Extracting productID from the URL parameters
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth0();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  // const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingcart();
  const cartQuantity = useSelector((state: RootState) => selectCartItemQuantity(state, product?.id || 0));


  // useEffect(() => {
  //   axios.get(`https://fakestoreapi.com/products/${id}`)
  //     .then(res => setProduct(res.data))
  //     .catch(error => {
  //       console.error('Error fetching product:', error);
  //       alert('Cannot find the result: ' + error.message);
  //     });
  // }, [id]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Fetch from IndexedDB
        const db = await initDB();
        const products = await getAllProducts(db);
        const foundProduct = products.find((p: any) => p.id == parseInt(id!));

        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          // Handle product not found
          alert('Product not found');
        }
      } catch (error) {
        alert('Failed to fetch product');
      }
    };

    fetchProduct();
  }, [id]);



  const handleUpdateProduct = (updatedProduct: ProductDetails) => {
    setProduct(updatedProduct);
    setIsModalOpen(false);
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch(addItem({
        ...product, quantity: 1,
      }));
    }
  };

  const handleRemoveToCart = () => {
    if (product) {
      // Retrieve the current quantity from the Redux store
      const currentQuantity = cartQuantity;
  
      if (currentQuantity > 1) {
        dispatch(updateItemQuantity({ id: product.id, quantity: currentQuantity - 1 }));
      } else {
        dispatch(removeItem(product.id));
      }
    }
  };
  

  const handleRemoveProduct = async () => {

    const db = await initDB();
    deleteProduct(db, product?.id)
    if(product){
      dispatch(removeItem(product.id));
    }
    navigate('/Update');
    alert("Product successfully removed");


    // if (product) {
    //   axios.delete(`https://fakestoreapi.com/products/${product.id}`)
    //     .then(() => {
    //       alert("Product has been successfully removed");
    //       console.log(product)
    //       navigate('/Update');
    //     })
    //     .catch(error => {
    //       console.error('Error removing product:', error);
    //       alert('Cannot remove the product: ' + error.message);
    //     });
    // }
  };

  const addReview = () => {
    const newReview = { rating, comment };
    setReviews([...reviews, newReview]);
    setRating(0);
    setComment("");
  };
  

  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [reviews, setReviews] = useState<{ rating: number; comment: string }[]>([]);

  if (!product) {
    return (
    <div  className="min-w-screen min-h-screen flex items-center justify-center">
    <div className=" flex justify-center items-center ">
      <div className="absolute animate-spin rounded-full h-40 w-40 border-t-4 border-b-4 border-purple-500"></div>
      <img src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"  className="rounded-full h-28 w-28" />
      </div>
      </div>
      // Loading...</div>;
    )
  }

  const isUserAuthorized = user?.email === 'sanilm4637@gmail.com';

  return (
    <div className="p-6 bg-white shadow-md rounded-md min-h-screen">
      <div className="flex">
        <img className="w-1/3 h-1/3 rounded-md " src={product.image} alt={product.title} />
        <div className="ml-6 w-1/2">
          <h1 className="text-4xl font-extrabold mb-4">{product.title}</h1>
          <p className="text-xl font-semibold text-gray-700 mb-2">${product.price}</p>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="flex items-center mb-4">
            {product.rating ? (
              <>
                <span className="text-yellow-400">
                  {Array.from({ length: 5 }, (_, i) => (
                    <svg key={i} className="w-5 h-5" fill={i < product.rating.rate ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </span>
                <span className="ml-2 text-gray-600">{product.rating.rate} ({product.rating.count} reviews)</span>
              </>
            ) : (
              <span className="text-gray-600">No ratings available</span>
            )}
          </div>
          <div className="mb-4">
            <button onClick={handleRemoveToCart} className="px-4 py-2 bg-gray-300 rounded-l hover:bg-gray-400">-</button>
            <span className="px-4 py-2 border-t border-b">{cartQuantity}</span>
            <button onClick={handleAddToCart} className="px-4 py-2 bg-gray-300 rounded-r hover:bg-gray-400">+</button>
          </div>
          <div className="flex flex-row gap-14">
            <button onClick={handleAddToCart} className="bg-yellow-500 text-white px-4 py-2  hover:bg-black hover:-translate-y-2 duration-300 rounded">Add to Cart</button>
            {isUserAuthorized && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-yellow-500 text-white px-4 py-2  hover:bg-black hover:-translate-y-2 duration-300 rounded"
              >
                Update
              </button>
            )}
          </div>
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-2">Reviews</h2>
            <ul className="mb-4">
              {reviews.map((review, index) => (
                <li key={index} className="border-b border-gray-300 py-2">
                  <div>Rating: {"⭐".repeat(review.rating)}</div>
                  <p>{review.comment}</p>
                </li>
              ))}
            </ul>
            <div className="mb-4">
              <label className="block mb-2">Rating:</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="border rounded px-2 py-1 w-full"
              >
                <option value="0">Select Rating</option>
                {[1, 2, 3, 4, 5].map((star) => (
                  <option key={star} value={star}>
                    {star} Star{star > 1 && "s"}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Comment:</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="border rounded w-full px-2 py-1"
                rows={4}
              />
            </div>
            <div className="flex gap-8">
              <button onClick={addReview} className="bg-yellow-500 hover:-translate-y-2 duration-300 hover:bg-black text-white px-4 py-2 rounded">
                Submit Review
              </button>
              {isUserAuthorized && (
                <button onClick={handleRemoveProduct} className="bg-red-700 hover:-translate-y-2 duration-300 drop-shadow-sm text-white px-4 py-2 shadow-lg rounded hover:shadow-slate-700">
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && product && (
        <UpdateModal
          product={product}
          onClose={() => setIsModalOpen(false)}
          onUpdateProduct={handleUpdateProduct}
        />
      )}
    </div>
  );
};

export default SingleProduct;



