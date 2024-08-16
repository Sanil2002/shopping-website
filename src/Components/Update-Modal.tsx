import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProducts, initDB } from "../Utilities/db";

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

interface UpdateModalProps {
  product: ProductDetails;
  onClose: () => void;
  onUpdateProduct: (updatedProduct: ProductDetails) => void;
}

const UpdateModal: React.FC<UpdateModalProps> = ({ product, onClose}) => {
  const [ id,setId] = useState(product.id);
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);
  const [category, setCategory] = useState(product.category);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(product.image);
  const navigate=useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);
    if (file) {
      const filePreview = URL.createObjectURL(file);
      setPreview(filePreview);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProduct = {
      ...product,
      id,
      title,
      price,
      description,
      category,
      image: selectedFile ? preview : product.image,
    };

    // axios.patch(`https://fakestoreapi.com/products/${product.id}`, updatedProduct)
    //   .then(res => {
    //     onUpdateProduct(res.data);
    //     alert('Product Updated');
    //     console.log("id:",product.id,",title:",product.title,",category:",product.category)
    //     navigate('/Update')
    //   })
    //   .catch(error => {
    //     alert('Failed to update product: ' + error.message);
    //   });
    const db = await initDB();
    await addProducts(db, [updatedProduct]);
    onClose();
    console.log("id:",product.id,",title:",product.title,",category:",product.category)
    navigate("/Store");

  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full relative z-50">
        <h2 className="text-2xl font-bold mb-4">Update Product</h2>
        <form onSubmit={handleUpdate}>
        <div className="mb-4">
            <label className="block text-xl font-bold mb-2">Id</label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              value={id}
              onChange={(e) => setId(Number(e.target.value))}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-xl font-bold mb-2">Title</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-xl font-bold mb-2">Price</label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-xl font-bold mb-2">Description</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col items-center mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mb-4"
            />
            {preview && (
              <div>
                <img
                  src={preview}
                  alt="Selected"
                  className="h-40 object-contain rounded-lg"
                />
              </div>
            )}
            {selectedFile && <p>File name: {selectedFile.name}</p>}
          </div>
          <div className="mb-4">
          <label className="block text-xl font-bold mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="">Category</option>
              <option value="men's clothing">Men</option>
              <option value="women's clothing">Ladies</option>
              <option value="electronics">Electronics</option>
              <option value="jewelery">Jewelery</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-yellow-300 hover:bg-yellow-400 text-black py-2 px-4 rounded-lg"
              onSubmit={handleUpdate}
            >
              Update Product
            </button>
            <button
              type="button"
              className="ml-2 bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded-lg"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
