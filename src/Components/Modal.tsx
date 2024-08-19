
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProducts, initDB } from '../Utilities/db';
import { validateProductForm } from '../Utilities/ValidateProductForm';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose}) => {
  const [id,setId] = useState<string>('')
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<string>('');
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const numericPrice = price === '' ? 0 : Number(price);
    const numericId = id === '' ? 0 : Number(id)

    const newProduct = {
      id: numericId,
      title,
      price: numericPrice,
      description,
      image,
      category,
    };

    const isValid = validateProductForm(newProduct);
     
     
    if(!isValid){
      console.log("isvalid",isValid);
      return;
    }

    // try {
    //   await axios.post('https://fakestoreapi.com/products', newProduct);
    //   onClose();
    //   alert("New product added succesfully");
    //   console.log(newProduct);
    //   navigate('/Update')
    // } catch (error) {
    //   alert('Failed to add product');
    // }

    const db = await initDB();
        await addProducts(db, [newProduct]);
        onClose();
        navigate("/Store");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Id</label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Price</label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Category</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-300 text-black py-2 px-4 rounded-lg mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-yellow-300 hover:bg-yellow-400 text-black py-2 px-4 rounded-lg"
              onClick={handleSubmit}
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;


