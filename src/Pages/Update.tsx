import React, { useState, useEffect } from "react";
import Product from "./Products";
import Modal from "../Components/Modal";
import { initDB, getAllProducts } from '../Utilities/db';
import { Loading } from "../Utilities/Loading";

interface StoreItem {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}
const Update: React.FC = () => {
  const [storeItems, setStoreItems] = useState<StoreItem[]>([]);
  const [productCategory, setProductCategory] = useState<string>("");
  const [filteredData, setFilteredData] = useState<StoreItem[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect(() => {
  //   axios.get('https://fakestoreapi.com/products')
  //     .then(res => setStoreItems(res.data))
  //     .catch(error => { alert('Cannot find the result: ' + error.message); });
  //   if (productCategory === "") {
  //     setFilteredData(storeItems);
  //   }
  // }, [storeItems]);


  useEffect(() => {
    const fetchProducts = async () => {
      const db = await initDB();
      const productsFromDB = await getAllProducts(db);
      setStoreItems(productsFromDB);
      setFilteredData(productsFromDB);
    };

    fetchProducts();
  }, []);

  const handleAddNewProduct = () => {
    setIsModalOpen(true);
  };

  const handleFilteredChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    setProductCategory(selectedCategory);

    setFilteredData(storeItems.filter(item => item.category === selectedCategory));
  };


  return (
    <div>
      <Loading />
      <div className="relative flex justify-center my-6">
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="text-xl w-full max-w-lg pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
          placeholder="Search..."
        />
        {/* <svg className="absolute left-1 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg> */}
      </div>
      <div>
        <div className="text-center">
          <h1 className="p-4 justify-center bg-gradient-to-r from-black via-yellow-500 to-black bg-clip-text text-5xl font-extrabold text-transparent sm:text-5xl">UPDATE</h1>
        </div>
        <div className="pl-11 gap-9 md:w-1/2 xl:w-1/3 top-0 right-0 left-0 flex">
          <select value={productCategory} onChange={handleFilteredChange} className="w-full bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-300">
            <option value="">Category</option>
            <option value="men's clothing">Men</option>
            <option value="women's clothing">Women</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelry</option>
          </select>
          <button
            onClick={handleAddNewProduct}
            className="ml-4 w-full bg-yellow-300 hover:bg-white hover:text-yellow-500 text-black font-bold py-2 px-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
          >
            Add New Product
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-8 px-3">
        {filteredData.filter(item => {
          return search.toLowerCase() === "" ? item : item.title.toLowerCase().includes(search);
        }).map((datas: StoreItem) => {
          return (
            <Product key={datas.id} datas={datas} />
          );
        })}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
    </div>
  );
}

export default Update;
